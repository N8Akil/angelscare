'use server'

import { revalidatePath } from 'next/cache'
import * as XLSX from 'xlsx'
import { getCurrentAdmin } from '@/lib/auth'
import { query, queryOne } from '@/lib/db'

export async function importContacts(formData: FormData): Promise<{ success: boolean; count?: number; error?: string }> {
    try {
        const admin = await getCurrentAdmin()
        if (!admin) {
            return { success: false, error: 'Unauthorized' }
        }

        const file = formData.get('file') as File
        if (!file) {
            return { success: false, error: 'No file provided' }
        }

        const buffer = await file.arrayBuffer()
        const workbook = XLSX.read(buffer)
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const rows: any[] = XLSX.utils.sheet_to_json(sheet)

        if (rows.length === 0) {
            return { success: false, error: 'Spreadsheet is empty' }
        }

        let importedCount = 0

        // Begin transaction (implicitly handled by separate queries for now, ideally single transaction)
        // We will loop and insert. For bulk efficiency we could construct a large INSERT, but loop is safer for validation context.
        for (const row of rows) {
            // Map common column names to DB fields
            // Supporting variations like "First Name", "first_name", "FirstName"
            const firstName = row['First Name'] || row['first_name'] || row['FirstName'] || ''
            const lastName = row['Last Name'] || row['last_name'] || row['LastName'] || ''
            const email = row['Email'] || row['email'] || null
            const phone = row['Phone'] || row['phone'] || null
            const type = (row['Type'] || row['type'] || 'client').toLowerCase()

            if (!firstName || !lastName) continue; // Skip invalid rows

            await query(
                `INSERT INTO contacts (first_name, last_name, email, phone, type, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
             ON CONFLICT (email) DO NOTHING`, // Simple de-dupe strategy on email if unique constraint exists.
                // Note: User didn't specify unique constraint, but it's good practice. 
                // If no unique constraint, this will just insert duplicates.
                [firstName, lastName, email, phone, type]
            )
            importedCount++
        }

        await query(
            `INSERT INTO admin_audit_log (admin_id, action, entity_type, details)
         VALUES ($1, $2, $3, $4)`,
            [admin.id, 'import', 'contact', JSON.stringify({ filename: file.name, count: importedCount })]
        )

        revalidatePath('/admin/contacts')
        return { success: true, count: importedCount }

    } catch (error) {
        console.error('Import error:', error)
        return { success: false, error: 'Failed to process file. Ensure it is a valid Excel or CSV.' }
    }
}

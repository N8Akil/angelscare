"use client"

import { useRouter } from "next/navigation"
import { Filter } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ContactTypeFilterProps {
    currentType?: string
    currentSearch?: string
}

export function ContactTypeFilter({ currentType, currentSearch }: ContactTypeFilterProps) {
    const router = useRouter()

    function handleChange(value: string) {
        const params = new URLSearchParams()
        if (value && value !== 'all') {
            params.set('type', value)
        }
        if (currentSearch) {
            params.set('search', currentSearch)
        }
        const queryString = params.toString()
        router.push(`/contacts${queryString ? `?${queryString}` : ''}`)
    }

    return (
        <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={currentType || 'all'} onValueChange={handleChange}>
                <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="client">Clients</SelectItem>
                    <SelectItem value="vendor">Vendors</SelectItem>
                    <SelectItem value="referral_source">Referral Sources</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

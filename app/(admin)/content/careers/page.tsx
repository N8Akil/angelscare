import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { getJobPostings } from "@/lib/actions/jobs"
import { JobDialog } from "@/components/content/job-dialog"
import { JobActions } from "@/components/content/job-actions"

export default async function CareersPage() {
    const { jobs } = await getJobPostings(1, 100)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Careers</h1>
                <JobDialog />
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Expires</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No job postings found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell>
                                        <Badge variant={job.is_active ? "default" : "secondary"}>
                                            {job.is_active ? "Active" : "Closed"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell className="capitalize">{job.employment_type}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.expires_at ? new Date(job.expires_at).toLocaleDateString() : "Never"}</TableCell>
                                    <TableCell className="text-right">
                                        <JobActions job={job} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

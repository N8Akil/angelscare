import { Briefcase } from "lucide-react"
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
import { Card } from "@/components/ui/card"

import { getJobPostings } from "@/lib/actions/jobs"
import { JobDialog } from "@/components/content/job-dialog"
import { JobActions } from "@/components/content/job-actions"

export default async function CareersPage() {
    const { jobs } = await getJobPostings(1, 100)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-navy tracking-tight">Careers</h1>
                    <p className="text-text-muted mt-1">Post open listings and manage job applications.</p>
                </div>
                <div className="shadow-md shadow-navy/20 rounded-full">
                    <JobDialog />
                </div>
            </div>

            <Card className="border-none shadow-md shadow-navy/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-navy/5 hover:bg-navy/5 border-navy/10">
                            <TableHead className="w-[100px] font-bold text-navy">Status</TableHead>
                            <TableHead className="font-bold text-navy">Title</TableHead>
                            <TableHead className="font-bold text-navy">Type</TableHead>
                            <TableHead className="font-bold text-navy">Location</TableHead>
                            <TableHead className="font-bold text-navy">Expires</TableHead>
                            <TableHead className="text-right font-bold text-navy">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="rounded-full bg-navy/5 p-4 mb-2">
                                            <Briefcase className="h-8 w-8 text-navy/40" />
                                        </div>
                                        <p className="font-medium text-navy">No job postings found</p>
                                        <p className="text-sm text-text-muted">Create a listing to attract new talent.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobs.map((job) => (
                                <TableRow key={job.id} className="hover:bg-navy/5 border-navy/10 transition-colors">
                                    <TableCell>
                                        <Badge variant={job.is_active ? "default" : "secondary"} className={job.is_active ? "bg-navy hover:bg-navy/90" : "bg-bg-base text-navy/60"}>
                                            {job.is_active ? "Active" : "Closed"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium text-navy">{job.title}</TableCell>
                                    <TableCell className="capitalize text-navy/80">{job.employment_type}</TableCell>
                                    <TableCell className="text-navy/80">{job.location}</TableCell>
                                    <TableCell className="text-navy/60">{job.expires_at ? new Date(job.expires_at).toLocaleDateString() : "Never"}</TableCell>
                                    <TableCell className="text-right">
                                        <JobActions job={job} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

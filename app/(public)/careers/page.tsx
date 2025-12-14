import Link from "next/link"
import { MapPin, Clock, Briefcase } from "lucide-react"
import { getActiveJobPostings } from "@/lib/actions/jobs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function CareersPage() {
    const jobs = await getActiveJobPostings()

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-muted/30 py-24 text-center">
                <div className="container px-4">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">Join Our Team</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We are looking for compassionate caregivers to help us provide exceptional care to our community.
                    </p>
                </div>
            </div>

            <div className="container px-4 py-12 max-w-5xl">
                <h2 className="text-2xl font-bold mb-8">Open Positions</h2>

                {jobs.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-muted/10">
                        <p className="text-muted-foreground">No current openings. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <Card key={job.id} className="transition-all hover:shadow-md">
                                <CardHeader>
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                        <div>
                                            <CardTitle className="text-xl text-primary">{job.title}</CardTitle>
                                            <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Briefcase className="h-4 w-4" />
                                                    <span className="capitalize">{job.employment_type}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{job.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>Posted: {new Date(job.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="w-fit">Open</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
                                    {job.requirements && (
                                        <div className="bg-muted/30 p-4 rounded-md">
                                            <h4 className="font-semibold mb-2 text-sm">Requirements:</h4>
                                            <p className="text-sm text-muted-foreground whitespace-pre-line">{job.requirements}</p>
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <Button asChild>
                                        <Link href="/contact?subject=Job Application">Apply Now</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

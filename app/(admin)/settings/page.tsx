import { User, Settings, Shield, Bell, Lock, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-display font-bold text-navy tracking-tight">Settings</h1>
                <p className="text-text-muted mt-1">Manage your account preferences and system configurations.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-[250px_1fr]">
                {/* Sidebar Navigation (Mock) */}
                <nav className="flex flex-col gap-2">
                    <Button variant="ghost" className="justify-start bg-navy/5 text-navy font-semibold hover:bg-navy/10 hover:text-navy">
                        <User className="mr-2 h-4 w-4" />
                        General
                    </Button>
                    <Button variant="ghost" className="justify-start text-text-muted hover:bg-navy/5 hover:text-navy">
                        <Lock className="mr-2 h-4 w-4" />
                        Security
                    </Button>
                    <Button variant="ghost" className="justify-start text-text-muted hover:bg-navy/5 hover:text-navy">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </Button>
                    <Button variant="ghost" className="justify-start text-text-muted hover:bg-navy/5 hover:text-navy">
                        <Globe className="mr-2 h-4 w-4" />
                        Site Configuration
                    </Button>
                </nav>

                {/* Content Area */}
                <div className="space-y-6">
                    {/* Profile Section */}
                    <Card className="border-none shadow-md shadow-navy/5">
                        <CardHeader>
                            <CardTitle className="text-navy flex items-center gap-2">
                                <User className="h-5 w-5 text-gold" />
                                Profile Information
                            </CardTitle>
                            <CardDescription>Update your personal details and contact preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-navy font-semibold">First Name</Label>
                                    <Input defaultValue="Admin" className="bg-bg-base/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-navy font-semibold">Last Name</Label>
                                    <Input defaultValue="User" className="bg-bg-base/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-navy font-semibold">Email Address</Label>
                                <Input defaultValue="admin@angelscare-homehealth.com" className="bg-bg-base/50" />
                            </div>
                        </CardContent>
                        <div className="p-6 border-t border-navy/5 bg-navy/5 flex justify-end rounded-b-xl">
                            <Button className="bg-navy hover:bg-navy/90 text-white rounded-full shadow-md shadow-navy/10">
                                Save Changes
                            </Button>
                        </div>
                    </Card>

                    {/* Site Preferences */}
                    <Card className="border-none shadow-md shadow-navy/5">
                        <CardHeader>
                            <CardTitle className="text-navy flex items-center gap-2">
                                <Settings className="h-5 w-5 text-gold" />
                                System Preferences
                            </CardTitle>
                            <CardDescription>Configure global system behavior.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold text-navy">Maintenance Mode</Label>
                                    <p className="text-sm text-text-muted">Temporarily disable the public website.</p>
                                </div>
                                <Switch />
                            </div>
                            <Separator className="bg-navy/5" />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold text-navy">New User Registration</Label>
                                    <p className="text-sm text-text-muted">Allow new staff to register accounts.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                        <div className="p-6 border-t border-navy/5 bg-navy/5 flex justify-end rounded-b-xl">
                            <Button className="bg-navy hover:bg-navy/90 text-white rounded-full shadow-md shadow-navy/10">
                                Save Preferences
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

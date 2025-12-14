import { ContactForm } from "@/components/forms/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata = {
    title: "Contact Us | Angel's Care Home Health",
    description: "Get in touch with Angel's Care Home Health Services in St. Louis. Call us at (314) 381-0321 or send a message.",
}

export default function ContactPage() {
    return (
        <div className="container px-4 md:px-6 py-12 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl mb-6">Get in Touch</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Our team is here to answer your questions and help you find the right care solution.
                        Fill out the form, and we&apos;ll get back to you as soon as possible.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary/10 rounded-full">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Phone</h3>
                                <p className="text-muted-foreground">Mon-Fri 8:00 AM - 4:00 PM</p>
                                <a href="tel:3143810321" className="text-primary font-bold text-xl hover:underline">(314) 381-0321</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary/10 rounded-full">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Office</h3>
                                <address className="text-muted-foreground not-italic">
                                    23 N Oaks Plz #245<br />
                                    Saint Louis, MO 63121
                                </address>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary/10 rounded-full">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Email</h3>
                                <a href="mailto:info@angelscare-homehealth.com" className="text-primary hover:underline">info@angelscare-homehealth.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-muted/30 p-6 md:p-8 rounded-xl border">
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}

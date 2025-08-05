
'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col gap-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Subscriptions</h1>
            <p className="text-muted-foreground">Manage your subscription and billing details with Stripe.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the Pro Plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-6 rounded-lg bg-primary/5 border border-primary/20">
                    <div>
                        <h3 className="text-2xl font-bold font-headline text-primary">Pro Plan</h3>
                        <p className="text-muted-foreground">Billed at $99/month</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">$99.00</p>
                        <p className="text-sm text-muted-foreground">Next payment on July 31, 2024</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Your plan includes:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>Unlimited Job and Customer management</span>
                        </li>
                         <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>Technician and Inventory tracking</span>
                        </li>
                         <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>AI-powered messaging features</span>
                        </li>
                         <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>Stripe integration for billing</span>
                        </li>
                    </ul>
                </div>

                <Button>Manage Subscription in Stripe</Button>
            </CardContent>
        </Card>

    </div>
  );
}

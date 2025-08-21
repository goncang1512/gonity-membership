"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import PricingSubscribe from "@/src/components/layouts/home-page/pricing-subscribe";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">
              Unlock Your Business Potential with Our Platform
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              A powerful SaaS solution designed to streamline your operations,
              drive growth, and empower your team.
            </p>
            <Button size="lg">Get Started</Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12">
            Features Built for Your Success
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seamless API Integration</CardTitle>
              </CardHeader>
              <CardContent>
                Effortlessly connect with our platform using our powerful and
                secure API, enabling seamless workflows.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Powerful Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                Gain deep insights into your business, customers, and operations
                with intuitive data visualization.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Automated Billing & Payments</CardTitle>
              </CardHeader>
              <CardContent>
                Streamline your financial operations with automatic billing,
                secure payment processing, and subscription management.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-12">
              What Our Customers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  “Our business has seen incredible growth since integrating
                  this platform. It’s easy to use and the analytics are
                  game-changing!”
                  <div className="mt-4 font-semibold">Sarah Johnson</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  “The API integration was a breeze, and now we’re able to
                  automate so much of our workflow. Highly recommended!”
                  <div className="mt-4 font-semibold">David Lee</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  “A subscription billing tool that’s transformed our
                  operations. Fast, reliable, and efficient.”
                  <div className="mt-4 font-semibold">Amanda Perez</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <PricingSubscribe />
        </section>

        {/* Footer */}
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          © 2025 Your Company. All rights reserved.
        </footer>
      </div>
    </>
  );
}

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Button } from "@/src/components/ui/button";
import { Check, CreditCard, Wallet, Landmark } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        Complete Your Subscription
      </h1>

      <div className="w-full max-w-2xl space-y-6">
        {/* Subscription Summary */}
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Subscription Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">
                  Premium Monthly Plan
                </p>
                <p className="text-sm text-gray-500">per month</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    Access to all premium features
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    Unlimited projects and storage
                  </li>
                </ul>
              </div>
              <p className="text-lg font-bold text-blue-600">$19.99</p>
            </div>
          </CardContent>
        </Card>

        {/* User Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Your Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="card" className="space-y-3">
              <Label
                htmlFor="card"
                className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span>Credit/Debit Card</span>
                </div>
              </Label>
              <Label
                htmlFor="wallet"
                className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Wallet className="h-5 w-5 text-gray-600" />
                  <span>E-Wallet (PayPal, Apple Pay)</span>
                </div>
              </Label>
              <Label
                htmlFor="bank"
                className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="bank" id="bank" />
                  <Landmark className="h-5 w-5 text-gray-600" />
                  <span>Bank Transfer</span>
                </div>
              </Label>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Total + CTA */}
        <Card className="border-blue-100">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <p className="text-gray-500 text-sm">Total to Pay</p>
              <p className="text-2xl font-bold text-blue-700">$19.99</p>
            </div>
            <Button
              size="lg"
              className="px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-md hover:opacity-90"
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

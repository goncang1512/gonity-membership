"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg" // Ganti dengan path logo kamu
            alt="Logo"
            width={30}
            height={30}
          />
          <span className="font-bold text-lg text-blue-600">logo</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-blue-600">
            Home
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-blue-600">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-blue-600">
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 hover:text-blue-600"
          >
            Testimonials
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-gray-600 hover:text-blue-600 text-sm font-medium"
          >
            Sign In
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Get Started Free
          </Button>
        </div>
      </div>
    </header>
  );
}

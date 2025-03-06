import { Link } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Cabo Guide
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/adventures">
            <a className="text-gray-600 hover:text-gray-900">Adventures</a>
          </Link>
          <Link href="/stays">
            <a className="text-gray-600 hover:text-gray-900">Stays</a>
          </Link>
          <Link href="/eats">
            <a className="text-gray-600 hover:text-gray-900">Eats</a>
          </Link>
          <Button>Book Now</Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/adventures">
                <a className="text-lg">Adventures</a>
              </Link>
              <Link href="/stays">
                <a className="text-lg">Stays</a>
              </Link>
              <Link href="/eats">
                <a className="text-lg">Eats</a>
              </Link>
              <Button className="w-full">Book Now</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

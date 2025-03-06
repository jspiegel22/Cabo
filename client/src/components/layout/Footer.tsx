import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Cabo Guide</h3>
            <p className="text-gray-600">
              Your ultimate guide to Los Cabos, Mexico
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link href="/adventures">
                <a className="text-gray-600 hover:text-gray-900">Adventures</a>
              </Link>
              <Link href="/stays">
                <a className="text-gray-600 hover:text-gray-900">Stays</a>
              </Link>
              <Link href="/eats">
                <a className="text-gray-600 hover:text-gray-900">Eats</a>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="flex flex-col gap-2">
              <Link href="/wedding">
                <a className="text-gray-600 hover:text-gray-900">Wedding Planning</a>
              </Link>
              <Link href="/concierge">
                <a className="text-gray-600 hover:text-gray-900">Concierge</a>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:info@caboguide.com" className="text-gray-600 hover:text-gray-900">
                info@caboguide.com
              </a>
              <a href="tel:+1234567890" className="text-gray-600 hover:text-gray-900">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Cabo Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

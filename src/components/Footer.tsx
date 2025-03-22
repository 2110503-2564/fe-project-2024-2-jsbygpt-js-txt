import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ExclusiveCars Rental</h3>
            <p className="text-gray-400">
              Luxury vehicles for your premium experience. Choose from our extensive fleet of high-end cars.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors duration-300">Login</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-white transition-colors duration-300">Register</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Discord</h3>
            <p className="text-gray-400">
              _snezh21<br />
              n330
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
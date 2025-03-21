import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-black mb-4">Venue Not Found</h2>
            <p className="text-lg text-gray-600 mb-6">The venue you're looking for doesn't exist or has been removed.</p>
            <Link 
                href="/venue" 
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Return to Venues
            </Link>
        </div>
    );
} 
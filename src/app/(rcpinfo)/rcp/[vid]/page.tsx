import Image from 'next/image';
import { notFound } from 'next/navigation';
import getRcp from '@/libs/getRcp';

export default async function VenueDetail({ params }: { params: { vid: string } }) {
    const rcpJson = await getRcp(params.vid);
    const rcp = rcpJson.data;
    if (!rcp) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left side - Image */}
                    <div className="relative h-[400px] w-full">
                        {/* <Image 
                            src={venue.picture} 
                            alt={venue.name}
                            fill
                            className="rounded-lg object-cover"
                            priority
                        /> */}
                    </div>

                    {/* Right side - Venue Details */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h1 className="text-3xl font-bold text-black mb-6">
                            {rcp.name}
                        </h1>
                        <div className="space-y-4 text-lg text-black">
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">ที่อยู่:</span>
                                <span>{rcp.address}</span>
                            </div>
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">เขต/อำเภอ:</span>
                                <span>{rcp.district}</span>
                            </div>
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">จังหวัด:</span>
                                <span>{rcp.province}</span>
                            </div>
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">รหัสไปรษณีย์:</span>
                                <span>{rcp.postalcode}</span>
                            </div>
                            <div className="grid grid-cols-[120px,1fr]">
                                <span className="font-semibold">เบอร์โทร:</span>
                                <span>{rcp.tel}</span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

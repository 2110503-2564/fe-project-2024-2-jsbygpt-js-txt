import { Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import getVenues from '@/libs/getRcps';
import RcpCatalog from '@/components/RcpCatalog';

export default async function Rcp() {
    const venueData = await getVenues();
    
    return (
        <main className="text-center p-5">
            <Suspense fallback={<LinearProgress />}>
                <RcpCatalog rcpJson ={venueData} />
            </Suspense>
        </main>
    );
}
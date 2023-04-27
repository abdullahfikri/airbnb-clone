'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { SafeListing, SafeReservation, SafeUser } from '../types';

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

interface TripsClientProps {
    listings: SafeListing[];
    currentUser: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({ currentUser, listings }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .delete(`/api/listings/${id}`)
                .then(() => {
                    toast.success('Listing deleted');
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.error);
                })
                .finally(() => {
                    setDeletingId('');
                });
        },
        [router]
    );

    return (
        <Container>
            <Heading
                title="Trips"
                subtitle={`Where you've been and where you're going`}
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disable={deletingId === listing.id}
                        actionLabel="Delete Property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};
export default TripsClient;

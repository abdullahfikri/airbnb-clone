import { Nunito } from 'next/font/google';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';

import getCurrentUser from './actions/getCurrentUser';

import SearchModal from './components/modals/SearchModal';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clone',
};

const font = Nunito({
    subsets: ['latin'],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <SearchModal />
                    <RegisterModal />
                    <LoginModal />
                    <RentModal />
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                <div className="pb-20 pt-28">{children}</div>
            </body>
        </html>
    );
}

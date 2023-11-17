import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// css
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// components
import IndexNavBar from '@/components/navigation/IndexNavbar';

export const metadata: Metadata = {
    title: 'RobDroneGo',
    description: 'dashboard for RobDroneGo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <IndexNavBar />
                {children}
            </body>
        </html>
    );
}

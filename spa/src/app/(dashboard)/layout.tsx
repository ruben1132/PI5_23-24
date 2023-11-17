import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// css
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// components
import Navigation from '../../components/navigation/Navigation';
import Notification from '../../components/notification/Notification';

// Auth context
import { AuthProvider } from '../../util/AuthContext';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'dashboard for RobDroneGo',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <AuthProvider>
            <Navigation>
                <Notification />
                {children}
            </Navigation>
        </AuthProvider>
    );
}

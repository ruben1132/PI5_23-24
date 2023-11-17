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
import { AuthProvider } from '../../context/AuthContext';

// Private route
import PrivateRoute from '@/privateRoute/DashboardRoute';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'dashboard for RobDroneGo',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html>
            <body>
                <AuthProvider>
                    <PrivateRoute>
                        <Navigation>
                            <Notification />
                            {children}
                        </Navigation>
                    </PrivateRoute>
                </AuthProvider>
            </body>
        </html>
    );
}

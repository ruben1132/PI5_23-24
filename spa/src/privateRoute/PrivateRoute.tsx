"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    // Check if the user is authenticated
    if (!user) {
        // Redirect to the login page if the user is not authenticated
        router.push('/login');
        return null; // Prevent rendering the component until the redirect is complete
    }

    // Render the component if the user is authenticated
    return <>{children}</>;
};

export default PrivateRoute;

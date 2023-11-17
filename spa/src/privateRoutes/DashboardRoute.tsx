'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function DashboardRoute({ children }: PrivateRouteProps) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // check if the user is authenticated
        if (!user) {
            // redirect to the login page if the user is not authenticated
            router.push('/login');
            return; // prevent rendering the component until the redirect is complete
        }
    }, []);

    // render the component if the user is authenticated
    return <>{children}</>;
}

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from '@/models/User';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();

    // get token from cookie
    const cookie = request.cookies.get(config.tokenName);
    const token = cookie?.value;

    url.pathname = '/login';

    // if no token redirect to login
    if (!token) {
        return NextResponse.redirect(url);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return null;

    try {
        const user = jwt.verify(token, jwtSecret) as User;

        // if user role is not admin and is trying to access admin routes
        if (user.role !== config.userRole.ADMIN && config.adminRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
        }

        // if user role is not utente and is trying to access utente routes
        if (user.role !== config.userRole.UTENTE && config.utenteRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
        }

        // if user role is not gestor frota and is trying to access gestor frota routes
        if (user.role !== config.userRole.GESTOR_FROTA && config.gestorFrotaRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
        }

        // if user role is not gestor campus and is trying to access gestor campus routes
        if (user.role === config.userRole.GESTOR_CAMPUS && config.gestorCampusRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(url);
    }
}

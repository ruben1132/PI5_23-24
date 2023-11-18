import { NextRequest, NextResponse } from 'next/server';
import conf from '../config';
import { User } from '@/models/User';
import axios from 'axios';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();
    url.pathname = '/login';

    try {
        const response = await axios({
            method: 'GET',
            withCredentials: true,
            url: conf.authAPI.baseUrl + conf.authAPI.routes.sesion,
        });

        if (!response.data) return NextResponse.redirect(url);

        const user = response.data as User;

        if (!user) {
            return NextResponse.redirect(url);
        }

        // if user is logged in and is trying to access auth routes
        if (user && conf.authRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
        }

        // if user role is not admin and is trying to access admin routes
        if (user.role.name !== conf.userRole.ADMIN && conf.adminRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
        }

        // if user role is not utente and is trying to access utente routes
        if (user.role.name !== conf.userRole.UTENTE && conf.utenteRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
        }

        // if user role is not gestor frota and is trying to access gestor frota routes
        if (user.role.name !== conf.userRole.GESTOR_FROTA && conf.gestorFrotaRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
        }

        // if user role is not gestor campus and is trying to access gestor campus routes
        if (user.role.name === conf.userRole.GESTOR_CAMPUS && conf.gestorCampusRoutes.includes(pathname)) {
            return NextResponse.redirect(url);
        }

        return NextResponse.next(); // Continue to the next Middleware or route handler
    } catch (error: any) {
        
        // if (conf.nullRoutes.includes(pathname) || conf.authRoutes.includes(pathname)) {
            
        //     return NextResponse.next();
        // }

        // return NextResponse.redirect(url);
    }
}

// this lets all the assets load
export const config = {
    // matcher: '/:lng*'
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
  }

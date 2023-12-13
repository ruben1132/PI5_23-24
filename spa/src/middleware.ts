import { NextRequest, NextResponse } from 'next/server';
import conf from '../config';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();
    url.pathname = '/login';

    try {
        const currentUser = request.cookies.get(conf.cookieName)?.value;

        if (!currentUser) {
            if (conf.authRoutes.includes(pathname) || conf.nullRoutes.includes(pathname)) {
                return NextResponse.next(); // Continue to the next Middleware or route handler
            }
            return NextResponse.redirect(url);
        }

        // set the cookie in the request headers
        const headers = new Headers({
            Authorization: `Bearer ${currentUser}`,
            Cookie: `${conf.cookieName}=${currentUser}; HttpOnly; Secure; SameSite=None; Path=/`,
        });

        const response = await fetch(conf.authAPI.baseUrl + conf.authAPI.routes.session, {
            headers,
            credentials: 'include',
            method: 'GET',
        });

        const user = await response.json();

        if (!user?.id) {
            if (conf.authRoutes.includes(pathname) || conf.nullRoutes.includes(pathname)) {
                return NextResponse.next(); // Continue to the next Middleware or route handler
            }
            return NextResponse.redirect(url);
        }

        // if user is logged in and is trying to access auth routes
        if (user && conf.authRoutes.includes(pathname)) {
            url.pathname = '/dashboard';
            return NextResponse.redirect(url);
        }

        // if user role is admin and is trying to access admin routes
        if (user.role.name === conf.userRole.ADMIN && conf.adminRoutes.includes(pathname)) {
            return NextResponse.next(); // Continue to the next Middleware or route handler
        }

        // if user role is utente and is trying to access utente routes
        if (user.role.name === conf.userRole.UTENTE && conf.utenteRoutes.includes(pathname)) {
            return NextResponse.next(); // Continue to the next Middleware or route handler
        }

        // if user role is gestor frota and is trying to access gestor frota routes
        if (user.role.name === conf.userRole.GESTOR_FROTA && conf.gestorFrotaRoutes.includes(pathname)) {
            return NextResponse.next(); // Continue to the next Middleware or route handler
        }

        // if user role is gestor campus and is trying to access gestor campus routes
        if (user.role.name === conf.userRole.GESTOR_CAMPUS && conf.gestorCampusRoutes.includes(pathname)) {
            return NextResponse.next(); // Continue to the next Middleware or route handler
        }

        // if user role is gestor tarefas and is trying to access gestor campus routes
        if (user.role.name === conf.userRole.GESTOR_TAREFAS && conf.gestorTarefasRoutes.includes(pathname)) {
            return NextResponse.next(); // Continue to the next Middleware or route handler
        }

        // public routes
        if (conf.nullRoutes.includes(pathname)) {
            return NextResponse.next(); // Continue to the next Middleware or route handler
        }

        return NextResponse.redirect(url);
    } catch (error: any) {
        if (conf.authRoutes.includes(pathname)) {
            return NextResponse.next(); // Continue to the next Middleware or route handler
        }
        // return NextResponse.redirect(url);
    }
}

// this lets all the assets load
export const config = {
    // matcher: '/:lng*'
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|admin|_next/static|_next/image|_ipx|assets|favicon.ico|public|v3d|images).*)',
    ],
};

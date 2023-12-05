const userRole = {
    ADMIN: 'admin',
    GESTOR_FROTA: 'gestor frota',
    GESTOR_CAMPUS: 'gestor campus',
    UTENTE: 'utente',
};

export default {
    userRole,

    dashboardBaseRoute: 'dashboard/',
    routes: [
        {
            routeName: 'buildings',
            displayName: 'Buildings',
            permissions: [userRole.GESTOR_CAMPUS],
        },
        {
            routeName: 'floors',
            displayName: 'Floors',
            permissions: [userRole.GESTOR_CAMPUS],
        },
        {
            routeName: 'passages',
            displayName: 'Passages',
            permissions: [userRole.GESTOR_CAMPUS],
        },
        {
            routeName: 'robots',
            displayName: 'Robots',
            permissions: [userRole.GESTOR_FROTA],
        },
        {
            routeName: 'robottypes',
            displayName: 'Robot Types',
            permissions: [userRole.GESTOR_FROTA],
        },
        {
           routeName: "tasks",
           displayName: "Tasks",
           permissions: [userRole.GESTOR_FROTA ],
        },
        {
            routeName: 'tasktypes',
            displayName: 'Task Types',
            permissions: [userRole.GESTOR_FROTA],
        },
        {
            routeName: 'users',
            displayName: 'Users',
            permissions: [userRole.ADMIN],
        },
        // {
        //   routeName: "floormaps",
        //   displayName: "Floor Maps" ,
        //   permissions: [userRole.GESTOR_CAMPUS],
        // },
        {
            routeName: 'roles',
            displayName: 'Roles',
            permissions: [userRole.ADMIN],
        },
        {
            routeName: 'elevators',
            displayName: 'Elevators',
            permissions: [userRole.GESTOR_CAMPUS],
        },
        {
            routeName: 'rooms',
            displayName: 'Rooms',
            permissions: [userRole.GESTOR_CAMPUS],
        },
        {
            routeName: 'v3d',
            displayName: '3D Viewer',
            permissions: [userRole.UTENTE, userRole.GESTOR_FROTA],
        },
        {
            routeName: 'profile',
            displayName: 'Profile',
            permissions: [userRole.UTENTE, userRole.GESTOR_FROTA, userRole.GESTOR_CAMPUS, userRole.ADMIN],
        },
        
    ],

    mgiAPI: {
        baseUrl: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_MGI_API_URL : 'http://localhost:2225/api/',
        routes: {
            buildings: 'buildings/',
            floors: 'floors/',
            passages: 'passages/',
            robots: 'robots',
            robottypes: 'robottypes/',
            tasks: 'tasks/',
            tasktypes: 'tasktypes/',
            users: 'users/',
            floormaps: 'floormaps/',
            floormapsWithFloor: 'floormaps/floofb36dabf-ab7d-4152-8ecc-c3c180004447r/',
            roles: 'roles/',
            elevators: 'elevators/',
            rooms: 'rooms/',
            users: 'users/',
            signup: 'auth/signup',
            login: 'auth/login',
            logout: 'auth/logout',
            session: 'auth/session',
            planning: 'planning/',
            planningFindPath: 'planning/findpath',
           
        },
    },

    authAPI: {
        baseUrl: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_AUTH_API_URL : 'http://localhost:2225/api/auth/',
        routes: {
            login: 'login/',
            logout: 'logout/',
            signin: 'signin/',
            session: 'session/',
        },
    },

    tokenName: 'robdronego:token',

    nullRoutes: ['/', '/aboutus', '/termsandconditions'],

    authRoutes: ['/login', '/signin'],

    utenteRoutes: ['/dashboard', '/dashboard/v3d', '/dashboard/tasks', '/dashboard/profile'],

    adminRoutes: ['/dashboard', '/dashboard/roles', '/dashboard/users', '/dashboard/profile'],

    gestorFrotaRoutes: [
        '/dashboard',
        '/dashboard/v3d',
        '/dashboard/tasks',
        '/dashboard/robottypes',
        '/dashboard/tasktypes',
        '/dashboard/tasktypes',
        '/dashboard/robots',
        '/dashboard/profile'
    ],

    gestorCampusRoutes: [
        '/dashboard',
        '/dashboard/buildings',
        '/dashboard/elevators',
        '/dashboard/floors',
        '/dashboard/passages',
        '/dashboard/rooms',
        '/dashboard/tasks',
        '/dashboard/profile'
    ],
    

    cookieName: 'mgiAPI:authCookie',
};

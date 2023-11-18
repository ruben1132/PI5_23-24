export default {
    dashboardBaseRoute: 'dashboard/',
    routes: [
        {
            routeName: 'buildings',
            displayName: 'Buildings',
        },
        {
            routeName: 'floors',
            displayName: 'Floors',
        },
        {
            routeName: 'passages',
            displayName: 'Passages',
        },
        {
            routeName: 'robots',
            displayName: 'Robots',
        },
        {
            routeName: 'robottypes',
            displayName: 'Robot Types',
        },
        // {
        //   routeName: "tasks",
        //   displayName: "Tasks",
        // },
        {
            routeName: 'tasktypes',
            displayName: 'Task Types',
        },
        {
            routeName: 'users',
            displayName: 'Users',
        },
        // {
        //   routeName: "floormaps",
        //   displayName: "Floor Maps" ,
        // },
        {
            routeName: 'roles',
            displayName: 'Roles',
        },
        {
            routeName: 'elevators',
            displayName: 'Elevators',
        },
        {
            routeName: 'rooms',
            displayName: 'Rooms',
        },
        {
            routeName: 'v3d',
            displayName: '3D Viewer',
        },
    ],

    mgiAPI: {
        baseUrl: process.env.NODE_ENV === 'production' ? process.env.MGI_API_URL : 'http://localhost:4000/api/',
        routes: {
            buildings: 'buildings/',
            floors: 'floors/',
            passages: 'passages/',
            robots: 'robots/',
            robottypes: 'robottypes/',
            tasks: 'tasks/',
            tasktypes: 'tasktypes/',
            users: 'users/',
            floormaps: 'floormaps/',
            floormapsWithFloor: 'floormaps/floor/',
            roles: 'roles/',
            elevators: 'elevators/',
            rooms: 'rooms/',
            users: 'users/',
            signup: 'auth/signup',
            login: 'auth/login',
            logout: 'auth/logout',
            session: 'auth/session',
        },
    },

    authAPI: {
        baseUrl: process.env.NODE_ENV === 'production' ? process.env.AUTH_API_URL : 'http://localhost:4000/auth/',
        routes: {
            login: 'login/',
            logout: 'logout/',
            signin: 'signin/',
            sesion: 'session/',
        },
    },

    tokenName: 'robdronego:token',

    userRole: {
        ADMIN: 'admin',
        GESTOR_FROTA: 'gestor frota',
        GESTOR_CAMPUS: 'gestor campus',
        UTENTE: 'utente',
    },

    nullRoutes: ['/', '/aboutus', '/termsandconditions'],

    authRoutes: ['/login', '/signin'],

    utenteRoutes: ['/dashboard', '/dashboard/v3d', '/dashboard/taks'],

    adminRoutes: ['/dashboard/roles', '/dashboard/users'],

    gestorFrotaRoutes: [
        '/dashboard',
        '/dashboard/v3d',
        '/dashboard/taks',
        '/dashboard/robottypes',
        '/dashboard/tasktypes',
        '/dashboard/tasktypes',
        '/dashboard/robots',
    ],

    gestorCampusRoutes: [
        '/dashboard',
        '/dashboard/buildings',
        '/dashboard/elevators',
        '/dashboard/floors',
        '/dashboard/passages',
        '/dashboard/rooms',
    ],
};

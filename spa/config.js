export default {
    dashboardBaseRoute: 'dashboard/',
    routes: [
        {
            routeName: 'buildings',
            displayName: 'Buildings',
            permissions: ['gestor campus'],
        },
        {
            routeName: 'floors',
            displayName: 'Floors',
            permissions: ['gestor campus'],
        },
        {
            routeName: 'passages',
            displayName: 'Passages',
            permissions: ['gestor campus'],
        },
        {
            routeName: 'robots',
            displayName: 'Robots',
            permissions: ['gestor frota'],
        },
        {
            routeName: 'robottypes',
            displayName: 'Robot Types',
            permissions: ['gestor frota'],
        },
        // {
        //   routeName: "tasks",
        //   displayName: "Tasks",
        //   permissions: ["utente"],
        // },
        {
            routeName: 'tasktypes',
            displayName: 'Task Types',
            permissions: ['gestor frota'],
        },
        // {
        //   routeName: "users",
        //   displayName: "Users",
        //   permissions: ["admin"],
        // },
        // {
        //   routeName: "floormaps",
        //   displayName: "Floor Maps" ,
        //   permissions: ["gestor campus"]
        // },
        {
            routeName: 'roles',
            displayName: 'Roles',
            permissions: ['admin'],
        },
        {
            routeName: 'elevators',
            displayName: 'Elevators',
            permissions: ['gestor campus'],
        },
        {
            routeName: 'rooms',
            displayName: 'Rooms',
            permissions: ['gestor campus'],
        },
        {
            routeName: 'v3d',
            displayName: '3D Viewer',
            permissions: ['gestor campus', 'gestor frota'],
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
        },
    },

    authAPI: {
        baseUrl: process.env.NODE_ENV === 'production' ? process.env.AUTH_API_URL : 'http://localhost:4000/auth/',
        routes: {
            login: 'login/',
            logout: 'logout/',
            register: 'register/',
            refresh: 'refresh/',
        },
    },

    tokenName: 'robdronego:token',

    userRole: {
        ADMIN: 'admin',
        GESTOR_FROTA: 'gestor frota',
        GESTOR_CAMPUS: 'gestor campus',
        UTENTE: 'utente',
    },

    utenteRoutes: ['/dashboard/v3d', '/dashboard/taks'],

    adminRoutes: ['/dashboard/roles/', '/dashboard/users/'],

    gestorFrotaRoutes: [
        ...utenteRoutes,
        '/dashboard/robottypes/',
        '/dashboard/tasktypes/',
        '/dashboard/tasktypes/',
        '/dashboard/robots/',
    ],

    gestorCampusRoutes: [
        '/dashboard/buildings/',
        '/dashboard/elevators/',
        '/dashboard/floors/',
        '/dashboard/passages/',
        '/dashboard/rooms/',
    ],
};

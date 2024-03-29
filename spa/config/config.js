export const userRole = {
    ADMIN: 'admin',
    GESTOR_FROTA: 'gestor frota',
    GESTOR_CAMPUS: 'gestor campus',
    UTENTE: 'utente',
    GESTOR_TAREFAS: 'gestor tarefas',
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
            routeName: 'tasks',
            displayName: 'Tasks',
            permissions: [userRole.GESTOR_TAREFAS, userRole.UTENTE],
        },
        {
            routeName: 'tasktypes',
            displayName: 'Task Types',
            permissions: [userRole.GESTOR_TAREFAS],
        },
        {
            routeName: 'taskplanning',
            displayName: 'Task Planning',
            permissions: [userRole.GESTOR_TAREFAS],
        },
        {
            routeName: 'roles',
            displayName: 'Roles',
            permissions: [userRole.ADMIN],
        },
        {
            routeName: 'users',
            displayName: 'Users',
            permissions: [userRole.ADMIN],
        },
        {
            routeName: 'sysusers',
            displayName: 'System Users',
            permissions: [userRole.ADMIN],
        },
        // {
        //   routeName: "floormaps",
        //   displayName: "Floor Maps" ,
        //   permissions: [userRole.GESTOR_CAMPUS],
        // },
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
            permissions: [userRole.GESTOR_FROTA, userRole.GESTOR_CAMPUS, userRole.GESTOR_TAREFAS],
        },
        {
            routeName: 'profile',
            displayName: 'Profile',
            permissions: [...Object.values(userRole)],
        },
    ],

    statesArray: ['all', 'pending', 'approved', 'rejected'],
    states: {
        ALL: 'all',
        PENDING: 'pending',
        APPROVED: 'approved',
        REJECTED: 'rejected',
    },

    mgiAPI: {
        baseUrl:
            process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_MGI_API_URL : 'http://localhost:2225/api/',
        routes: {
            buildings: 'buildings/',
            floors: 'floors/',
            floorsByCode: 'floors/code/',
            passages: 'passages/',
            robots: 'robots',
            robottypes: 'robottypes/',
            tasktypes: 'tasktypes/',
            users: 'users/',
            floormaps: 'floormaps/',
            elevators: 'elevators/',
            rooms: 'rooms/',
            roomsByName: 'rooms/name/',
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
        baseUrl:
            process.env.NODE_ENV === 'production'
                ? process.env.NEXT_PUBLIC_AUTH_API_URL
                : 'http://localhost:5095/api/auth/',
        routes: {
            login: 'login/',
            logout: 'logout/',
            signup: 'signup/',
            session: 'session/',
        },
    },

    mptAPI: {
        baseUrl:
            process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_MPT_API_URL : 'http://localhost:5095/api/',
        routes: {
            plannings: 'plannings/',
            usersmain: 'users/',
            userprofile: 'users/profile',
            userdata: 'users/allInfo',
            users: 'users?isSysUser=false',
            sysusers: 'users?isSysUser=true',
            tasks: 'tasks',
            tasksOnlyPickupDelivery: 'tasks?type=PickupDelivery',
            tasksOnlySurveillance: 'tasks?type=Surveillance',
            tasksapproved: 'tasks?isApproved=approved',
            mytasks: '/my',
            taskSurveillance: 'tasks/surveillance',
            taskPickupdelivery: 'tasks/pickupdelivery',
            roles: 'roles/',
            sysroles: 'roles?isSysRole=true',
        },
    },

    tokenName: 'robdronego:token',

    nullRoutes: ['/', '/aboutus', '/termsandconditions'],

    authRoutes: ['/login', '/signup'],

    utenteRoutes: ['/dashboard', '/dashboard/tasks', '/dashboard/profile'],

    adminRoutes: ['/dashboard', '/dashboard/roles', '/dashboard/users', '/dashboard/sysusers', '/dashboard/profile'],

    gestorFrotaRoutes: [
        '/dashboard',
        '/dashboard/v3d',
        '/dashboard/robottypes',
        '/dashboard/robots',
        '/dashboard/profile',
    ],

    gestorCampusRoutes: [
        '/dashboard',
        '/dashboard/v3d',
        '/dashboard/buildings',
        '/dashboard/elevators',
        '/dashboard/floors',
        '/dashboard/passages',
        '/dashboard/rooms',
        '/dashboard/tasks',
        '/dashboard/profile',
    ],

    gestorTarefasRoutes: [
        '/dashboard',
        '/dashboard/v3d',
        '/dashboard/tasks',
        '/dashboard/tasktypes',
        '/dashboard/taskplanning',
        '/dashboard/profile',
    ],

    cookieName: 'robdronego_authCookie',

    emailDomain: 'isep.ipp.pt',
};

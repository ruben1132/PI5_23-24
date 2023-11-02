export default {
  routes: [
    {
      routeName: "buildings",
      displayName: "Buildings",
      permissions: ["gestor campus"],
    },
    {
      routeName: "floors",
      displayName: "Floors",
      permissions: ["gestor campus"],
    },
    {
      routeName: "passages",
      displayName: "Passages",
      permissions: ["gestor campus"],
    },
    {
      routeName: "robots",
      displayName: "Robots",
      permissions: ["gestor frota"],
    },
    {
      routeName: "robottypes",
      displayName: "Robot Types",
      permissions: ["gestor frota"],
    },
    {
      routeName: "tasks",
      displayName: "Tasks",
      permissions: ["utente"],
    },
    {
      routeName: "tasktypes",
      displayName: "Task Types",
      permissions: ["gestor frota"],
    },
    {
      routeName: "users",
      displayName: "Users",
      permissions: ["admin"],
    },
    // { routeName: "floormaps", displayName: "Floor Maps" , permissions: ["gestor campus"]},
    {
      routeName: "roles",
      displayName: "Roles",
      permissions: ["admin"],
    },
    {
      routeName: "elevators",
      displayName: "Elevators",
      permissions: ["gestor campus"],
    },
  ],

  mgiAPI: {
    baseUrl: "http://localhost:4000/api/",
    routes: {
      buildings: "buildings/",
      floors: "floors/",
      passages: "passages/",
      robots: "robots/",
      robottypes: "robottypes/",
      tasks: "tasks/",
      tasktypes: "tasktypes/",
      users: "users/",
      floormaps: "floormaps/",
      roles: "roles/",
      elevators: "elevators/",
    },
  },
};

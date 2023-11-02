export default {
  types: [
    { routeName: "buildings", displayName: "Buildings"},
    { routeName: "floors", displayName: "Floors" },
    { routeName: "passages", displayName: "Passages" },
    { routeName: "robots", displayName: "Robots" },
    { routeName: "robottypes", displayName: "Robot Types" },
    { routeName: "tasks", displayName: "Tasks" },
    { routeName: "tasktypes", displayName: "Task Types" },
    { routeName: "users", displayName: "Users" },
    // { routeName: "floormaps", displayName: "Floor Maps" },
    { routeName: "roles", displayName: "Roles" },
    { routeName: "elevators", displayName: "Elevators" },
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

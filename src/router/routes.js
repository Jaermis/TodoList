const routes = [
  {
    path: "/onboarding",
    name: "onboarding",
    redirect: {
      name: "or-numbers",
    },
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "elements",
        name: "elements",
        component: () => import("../pages/Elements.vue"),
      },
      {
        path: "my-page",
        name: "my-page",
        component: () => import("../pages/MyPage/MyPage.vue"),
      },
      {
        path: "upload-file",
        name: "upload-file",
        component: () => import("../pages/MyPage/UploadFile/ImportFile.vue"),
      },
      {
        path: "",
        name: "main",
        component: () => import("../pages/Main.vue"),
        children: [
          {
            path: "add-user/:id?",
            name: "add-user",
            component: () => import("../pages/UserManagement/AddUser.vue"),
          },
          {
            path: "users",
            name: "users",
            component: () => import("../pages/UserManagement/Users.vue"),
          },
          {
            path: "or-numbers",
            name: "or-numbers",
            component: () => import("../pages/ORNumbers/ORNumbers.vue"),
          },
          {
            path: "add-or-numbers/:id?",
            name: "add-or-numbers",
            component: () => import("../pages/ORNumbers/AddORNumbers.vue"),
          },
          {
            path: "view-or-numbers/:id?",
            name: "view-or-numbers",
            component: () => import("../pages/ORNumbers/ViewORNumbers.vue"),
          },
          {
            path: "add-new-range/:id?",
            name: "add-new-range",
            component: () => import("../pages/ORNumbers/AddNewRange.vue"),
          },
          {
            path: "todo-list",
            name: "todo-list",
            component: () => import("../pages/Onboarding/TodoList.vue"),
          },
          {
            path: "create-todo",
            name: "create-todo",
            component: () => import("../pages/Onboarding/CreateTodoList.vue"),
          },
          {
            path: "update-todo/:id?",
            name: "update-todo",
            component: () => import("../pages/Onboarding/UpdateTodoList.vue"),
          },
          {
            path: "table-exercise",
            name: "table-exercise",
            component: () => import("../pages/TableExercise/ORNumbers.vue"),
          },
          {
            path: "view-or/:id?",
            name: "view-or",
            component: () => import("../pages/TableExercise/ViewORNumbers.vue"),
          },
          {
            path: "create-or",
            name: "create-or",
            component: () => import("../pages/TableExercise/AddORNumbers.vue"),
          },
          {
            path: "update-or/:id?",
            name: "update-or",
            component: () => import("../pages/TableExercise/AddORNumbers.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/Error404.vue"),
  },
];

export default routes;

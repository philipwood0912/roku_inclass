// import the login component first (actually all components here, but we're starting with login)
import LoginComponent from "./components/LoginComponent.js"

(() => {
  let router = new VueRouter({
    // set routes
    routes: [
      { path: '/', redirect: { name: "login" } },
      { path: '/login', name: "login", component: LoginComponent },
    ]
  });

  const vm = new Vue({

    data: {
      authenticated: false,
      administrator: false,

      mockAccount: {
        username: "user",
        password: "password"
      },

      user: [],

      //currentUser: {},
    },

    created: function () {
      // do a localstorage session check and set authenticated to true if the session still exists
      // if the cached user exists, then just navigate to their user home page

      // the localstorage session will persist until logout
    },

    methods: {
      setAuthenticated(status, data) {
        // authentication sent through login component
        // checks for valid user
        // so set the authenticated property to true, and also store the user
        this.authenticated = status;
        this.administrator = parseInt(data.isadmin);
        this.user = data;
      },

      logout() {
        // delete local session

        // push user back to login page
        this.$router.push({ path: "/login" });
        this.authenticated = false;
      }
    },

    router: router
  }).$mount("#app");

  router.beforeEach((to, from, next) => {
    console.log("router guard fired");
    if(vm.authenticated == false){
      next("/login");
    } else {
      next();
    }
  })
})();
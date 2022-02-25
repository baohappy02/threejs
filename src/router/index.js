import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes";

const routerHistory = createWebHistory();

const router = createRouter({
	history: routerHistory,
	routes: routes,
	scrollBehavior() {
		document.getElementById("app").scrollIntoView();
	},
});

const isString = x => Object.prototype.toString.call(x) === "[object String]";

router.beforeEach((to, from, next) => {
	let token = localStorage.getItem("token");

	let isAuthenticated = isString(token) && token !== "null" && token !== "undefined";

	if (token === "undefined" || token === "null") {
		localStorage.removeItem("token");
	}

	if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
		next({ name: "Home" });
	} else {
		next();
	}
});

export default router;

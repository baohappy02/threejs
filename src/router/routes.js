const HomePage = () => import(/* webpackChunkName: "HomePage" */ "@/view/Home/Home.vue");

const routes = [
	{
		path: "/:catchAll(.*)",
		redirect: "/explore",
	},
	{
		path: "/",
		name: "HomePage",
		component: HomePage,
		meta: { requireAuth: false },
	},
];

export default routes;

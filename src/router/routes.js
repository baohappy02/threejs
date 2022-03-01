const HomePage = () => import(/* webpackChunkName: "HomePage" */ "@/view/Home/Home.vue");
const PortalEffPage = () => import(/* webpackChunkName: "HomePage" */ "@/view/Home/PortalEffect.vue");

const routes = [
	{
		path: "/:catchAll(.*)",
		redirect: "/portal",
	},
	{
		path: "/",
		name: "HomePage",
		component: HomePage,
		meta: { requireAuth: false },
	},
	{
		path: "/portal",
		name: "PortalEffPage",
		component: PortalEffPage,
		meta: { requireAuth: false },
	},
];

export default routes;

import Home from "../components/home/Home";

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/home',
        component: Home,
        exact: true
    }
]

export default routes;
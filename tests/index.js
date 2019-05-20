const makeRouteFunc = (text) => () => document.querySelector('.text').innerText = text;

const router = new Router({
	basename: `${window.location.protocol}//${window.location.host}/tests`,
	useRouterTag: true,
	routes: [
		new Route('/settings', makeRouteFunc('Settings page')),
		new Route('/results', makeRouteFunc('Results page')),
		new Route('/help', makeRouteFunc('Help page')),
		new Route('/', makeRouteFunc('Home page')),
	],
});
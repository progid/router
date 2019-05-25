
const makeRouteFunc = (text) => ({ path }) => {
	document.querySelector('.text').innerText = text;
	if (path === '/help') {
		router.addRoute(new Route('/br', makeRouteFunc('Best Recs')))
	}
}

const router = new Router({
	basename: `${window.location.protocol}//${window.location.host}/tests`,
	useRouterTag: true,
	routes: [
		new Route('/settings', makeRouteFunc('Settings page')),
		new Route('/results', makeRouteFunc('Results page')),
		new Route('/help', makeRouteFunc('Help page')),
		new Route('/', makeRouteFunc('Home page')),
		new Route(makeRouteFunc('404 not found'))
	],
});
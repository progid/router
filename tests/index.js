import Router from '../router.js';
import Route from '../route.js';
import View from '../View.js';
import ViewsBundledRoute from '../ViewsBundledRoute.js';

const makeRouteFunc = (text) => ({ path }) => {
	document.querySelector('.text').innerText = text;
	if (path === '/help') {
		router.addRoute(new Route('/br', makeRouteFunc('Best Recs')))
		router.addRoute(new Route('/', makeRouteFunc('Home2 Recs')), true)
	}
}

const router = new Router({
	basename: `${window.location.protocol}//${window.location.host}/tests`,
	useRouterTag: true,
	routes: [
		new Route('/settings', makeRouteFunc('Settings page')),
		new Route('/game', () => View.load('./out.json').then(r => (new View(r['game.html'], {})).show())),
		new Route('/help', makeRouteFunc('Help page')),
		new Route('/', makeRouteFunc('Home page')),
		new Route(makeRouteFunc('404 not found'))
	],
});

function init() {
	window.z = new ViewsBundledRoute('/settings', makeRouteFunc('Settings page'));
	const paths = {
		'/': 'root',
		'/settings': 'settings',
		'/game': 'game',
		'/br': 'br',
		'/help': 'help',
	};
	return Object.keys(paths).map(item => 
		document.querySelector(`#${paths[item]}`)
			.addEventListener('click', () => router.push(item), false)
	);
};

init();
import Router from '../router.js';
import Route from '../route.js';
import View from '../View.js';
import LazyView from '../lazyview.js';
import ViewsBundledRoute from '../ViewsBundledRoute.js';
import LazyViewsBundledRoute from '../LazyViewsBundledRoute.js';

const makeRouteFunc = (text) => ({ path }) => {
	document.body.innerHTML = path;
	if (path === '/help') {
		router.addRoute(new Route('/br', makeRouteFunc('Best Recs')))
		router.addRoute(new Route('/', makeRouteFunc('Home2 Recs')), true)
	}
}

View.load('./out.json').then(r => {
	router.addRoute(new ViewsBundledRoute('/game', r['game.html'], {}));
});


const router = new Router({
	basename: `${window.location.protocol}//${window.location.host}/tests`,
	useRouterTag: true,
	routes: [
		new Route('/settings', makeRouteFunc('Settings page')),
		new LazyViewsBundledRoute('/rezults', 'http://0.0.0.0:3000/tests/results.json', {}),
		new Route('/help', makeRouteFunc('Help page')),
		new Route('/', makeRouteFunc('Home page')),
		new Route(makeRouteFunc('404 not found'))
	],
});

window.xxx = router;

function init() {
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

window.onload = init;
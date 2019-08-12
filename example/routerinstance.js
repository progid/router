import Router from '../router.js';
import Route from '../route.js';
import View from '../View.js';
import LazyView from '../lazyview.js';
import ViewsBundledRoute from '../ViewsBundledRoute.js';
import LazyViewsBundledRoute from '../LazyViewsBundledRoute.js';

const router = new Router({
	basename: 'http://0.0.0.0:3000/example',
	useRouterTag: true,
	routes: [
		new LazyViewsBundledRoute('/earth', 'http://0.0.0.0:3000/example/earth/code.json', {}),
		new LazyViewsBundledRoute('/water', 'http://0.0.0.0:3000/example/water/code.json', {}),
		new LazyViewsBundledRoute('/air', 'http://0.0.0.0:3000/example/air/code.json', {}),
		new LazyViewsBundledRoute('/fire', 'http://0.0.0.0:3000/example/fire/code.json', {}),
		new LazyViewsBundledRoute('/', 'http://0.0.0.0:3000/example/list/code.json', {}),
		new Route(() => document.body.innerHTML = '<h1>404 Not Found</h1>'),
	],
});

export default router;
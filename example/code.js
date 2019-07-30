import Router from '../router.js';
import Route from '../route.js';
import View from '../View.js';
import LazyView from '../lazyview.js';
import ViewsBundledRoute from '../ViewsBundledRoute.js';
import LazyViewsBundledRoute from '../LazyViewsBundledRoute.js';

window.onload = () => {
	const router = new Router({
		basename: 'http://0.0.0.0:3000/example',
		useRouterTag: true,
		routes: [
			new LazyViewsBundledRoute('/earth', 'http://0.0.0.0:3000/example/earth/code.json', {}),
			new LazyViewsBundledRoute('/water', 'http://0.0.0.0:3000/example/water/code.json', {}),
			new LazyViewsBundledRoute('/air', 'http://0.0.0.0:3000/example/air/code.json', {}),
			new LazyViewsBundledRoute('/fire', 'http://0.0.0.0:3000/example/fire/code.json', {}),
			// new Route(makeRouteFunc('404 not found'))
		],
	});
	
	const earthButton = document.querySelector('.menu .item.earth');
	const waterButton = document.querySelector('.menu .item.water');
	const airButton = document.querySelector('.menu .item.air');
	const fireButton = document.querySelector('.menu .item.fire');

	earthButton.addEventListener('click', () => router.push('/earth'), false);
	waterButton.addEventListener('click', () => router.push('/water'), false);
	airButton.addEventListener('click', () => router.push('/air'), false);
	fireButton.addEventListener('click', () => router.push('/fire'), false);
}
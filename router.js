/*

new Router({
	basename: [string],
	routes: [array],
	useRouterTag: [bool | string(tagname)],
})

{
	'/start': Router
}

*/

class Router {
	constructor(o) {
		const { routes, basename, useRouterTag } = o;
		this._routes = new Map();
		this._basename = basename || '/';
		this._useRouterTag = useRouterTag || false;
		this._tagName = useRouterTag instanceof String ? useRouterTag : 'router-connected-link';
		console.log(basename)
		routes.forEach(item => this.addRoute(item));
		this.open(window.location.href.replace(basename, ''))
		window.addEventListener('popstate', () => this.open(window.location.href.replace(basename, '')), true);
	}

	addRoute(route) {
		return this._routes.has(route.path)
			? null
			: this._routes.set(route.path, route);
	}
	
	push(path) {

	}

	getRoute(path) {
		return this._routes.has(path)
			? this._routes.get(path)
			: null;
	}

	willEnterOnRoute(path) {
		const currentRoute = this.getRoute(path);
		console.log(currentRoute)
		return currentRoute.willOpen();
	}

	open(path) {
		this.willEnterOnRoute(path)
	}

};
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

		routes.forEach(item => this.addRoute(item));
		this.open(window.location.href.replace(basename, ''))
		window.addEventListener('popstate', () => this.open(window.location.href.replace(basename, '')), false);
	}

	addRoute(route) {
		return this._routes.has(route.path)
			? null
			: this._routes.set(route.path, route);
	}
	
	registerPopstateHandler(callback, bubbling) {
		return window.addEventListener('popstate', callback, bubbling || false);
	}

	removePopstateHandler(handler, bubbling) {
		return window.removeEventListener('popstate', handler, bubbling || false);
	}

	push(state, title, path) {

		const routepath = state || path;

		if(this.currentRoute && this.currentRoute.path === routepath) {
			return null;
		}
		console.log(routepath, this.currentRoute.path)
		this.open(routepath);
		const onlyPath = state instanceof String;
		return onlyPath
			? window.history.pushState(null, null, this._basename+routepath)
			: window.history.pushState(state, title, this._basename+routepath);
	}

	replace(state, title, path) {
		this.open(path);
		window.history.replaceState(state, title, path);
	}

	getRoute(path) {
		return this._routes.has(path)
			? this._routes.get(path)
			: null;
	}

	open(path) {
		this.previousRoute = this.currentRoute;
		this.willLeaveFromRoute()
		this.currentRoute = this.getRoute(path);
		this.willEnterOnRoute()
	}

	willEnterOnRoute() {
		return this.currentRoute.willOpen();
	}

	willLeaveFromRoute(path) {
		return this.previousRoute
			? this.previousRoute.willClose()
			: null;
	}

};
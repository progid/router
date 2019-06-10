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
		this._popstateHandlerLink = this.registerPopstateHandler(() => this.open(window.location.href.replace(basename, '')));

		routes.forEach(item => this.addRoute(item));
		this.open(window.location.href.replace(basename, ''));
	}

	addRoute(route, override=false) {
		return this._routes.has(route.path) && !override
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
		this.open(routepath);
		const onlyPath = state instanceof String;
		return onlyPath
			? window.history.pushState(null, null, this._basename+routepath)
			: window.history.pushState(state, title, this._basename+routepath);
	}

	replace(state, title, path) {
		const routepath = state || path;
		if(this.currentRoute && this.currentRoute.path === routepath) {
			return null;
		}
		this.open(routepath);
		const onlyPath = state instanceof String;
		return onlyPath
			? window.history.replaceState(null, null, this._basename+routepath)
			: window.history.replaceState(state, title, this._basename+routepath);
	}

	getRoute(path) {
		return this._routes.has(path)
			? this._routes.get(path)
			: this._routes.has('?404')
				? this._routes.get('?404')
				: null;
	}

	open(path) {
		this.previousRoute = this.currentRoute;
		this.willLeaveFromRoute();
		this.currentRoute = this.getRoute(path);
		this.willEnterOnRoute();
		return true;
	}

	willEnterOnRoute() {
		return this.currentRoute
			? this.currentRoute.willOpen()
			: null;
	}

	willLeaveFromRoute(path) {
		return this.previousRoute
			? this.previousRoute.willClose()
			: null;
	}

};

export default Router;
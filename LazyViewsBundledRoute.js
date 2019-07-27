import LazyView from './LazyView.js';

class LazyViewsBundledRoute {
	constructor(path, view, data) {
		if(typeof(path) === 'string') {
			this.path = path || '?404';
			if(typeof(view) === 'object' && view instanceof LazyView) {
				this.view = view;
			}
			else if(typeof(view) === 'string') {
				this.view = new LazyView(view, data);
			}
		}
		else if(typeof(path) === 'object' && path instanceof LazyView) {
			this.path = '?404';
			this.view = path;
		}
		else if(typeof(path) === 'object') {
			if('path' in path || 'view' in path) {
				this.path = path.path || '?404'
				this.view = path.view instanceof LazyView ? path.view : new LazyView(path.view, path.data);
			}
			else if('body' in path || 'head' in path) {
				this.path = '?404';
				this.view = new LazyView(path, view || {});
			}
		}

		this.setOpenCallback(() => this.view.show());
		this.setCloseCallback(() => this.view.hide());
	}

	setOpenCallback(cb) {
		this.openCB = cb || this.openCB;
		return this;
	}

	setCloseCallback(cb) {
		this.closeCB = cb || this.closeCB;
		return this;
	}

	willOpen() {
		return this.openCB
			? this.openCB(this)
			: null;
	}

	willClose() {
		return this.closeCB
			? this.closeCB(this)
			: null;
	}
}

export default LazyViewsBundledRoute;
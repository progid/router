import View from './View.js';

class ViewsBundledRoute {
	constructor(path, view, data) {
		if(typeof(path) === 'string') {
			this.path = path || '?404';
			if(typeof(view) === 'object' && view instanceof View) {
				this.view = view;
			}
			else if(typeof(view) === 'object') {
				this.view = new View(view, data);
			}
		}
		else if(typeof(path) === 'object' && path instanceof View) {
			this.path = '?404';
			this.view = path;
		}
		else if(typeof(path) === 'object') {
			if('path' in path || 'view' in path) {
				this.path = path.path || '?404';
				this.view = path.view instanceof View ? path.view : new View(path.view, path.data);
			}
			else if('body' in path || 'head' in path) {
				this.path = '?404';
				this.view = new View(path, view || {});
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

export default ViewsBundledRoute;
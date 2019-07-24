import View from './view.js';

class LazyView {
	constructor(path, data) {
		this.viewPath = path;
		this.viewData = data;
		this.loaded = false;
		this.view = null;
	}

	setLoaded(_loaded) {
		this.loaded = _loaded;
	}

	createView(data) {
		this.view = data ? new View(data, this.viewData) : this.view;
		this.setLoaded(true);

		return this.view;
	}

	loadViewData() {
		return View.load(this.viewPath)
			.then(responce => createView(responce.data))
			.catch(err => console.log('View load error, ' + err));
	}

	show() {
		this.loadViewData();
		return this.loaded
			? this.view.show();
			: null;
	};

	hide() {
		return this.loaded
			? this.view.hide();
			: null;
	}
};

export default LazyView;
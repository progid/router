import View from './view.js';

class LazyView {
	constructor(path, data) {
		this.viewPath = path;
		this.viewData = data;
		this.view = null;
	}

	createView(data) {
		this.view = data ? new View(data, this.viewData) : this.view;
		return this.view;
	}

	loadViewData() {
		return View.load(this.viewPath)
			.then(response => createView(response.data))
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
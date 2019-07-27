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
		const promise = new Promise((res, rej) => 
			this.view
				? res(this.view)
				: View.load(this.viewPath)
					.then(data => res(this.createView(data)))
					.catch(err => rej(err))
		);
		return promise;
	}

	show() {
		return this.loadViewData()
			.then(() => this.view.show());
	};

	hide() {
		return this.view && this.view.hide();
	}
};

export default LazyView;
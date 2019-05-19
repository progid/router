class Route {
	constructor(path, cb) {
		this.path = path;
		this.cb = cb;
	}

	willOpen() {
		return this.cb();
	}
}
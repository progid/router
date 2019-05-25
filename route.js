class Route {
	constructor(path, openCB, closeCB) {
		this.path = path;
		this.openCB = openCB;
		this.closeCB = closeCB;
	}

	willOpen() {
		return this.openCB(this);
	}
	willClose() {
		return this.closeCB
			? this.closeCB(this)
			: null;
	}
}
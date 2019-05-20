class Route {
	constructor(path, cb, controlledClosing) {
		this.path = path;
		this.cb = cb;
		this.controlledClosing = controlledClosing || false;
		this.canIClose = !this.controlledClosing
	}
	close() {
		this.canIClose = true;
	}
	willOpen() {
		return this.cb();
	}
	willClose() {
		console.log(this.path + ' will be closed');

	}
}
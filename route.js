class Route {
	constructor(path, openCB, closeCB) {
		if(typeof(path) === 'string') {
			this.path = path || '?404';
			this.openCB = openCB || null;
			this.closeCB = closeCB || null;
		}
		if(typeof(path) === 'function') {
			this.path = '?404';
			this.openCB = path;
			this.closeCB = closeCB || openCB;
		}
		if(typeof(path) === 'object') {
			this.path = path.path || '?404';
			this.openCB = o.onOpen || null;
			this.closeCB = o.onClose || null;
		}
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
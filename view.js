class View {

	static load = path => fetch(path)
		.then(res => res.json())
		.catch(err => err);

	buildTag(tags, isBinded=true) {
		return tags
			.map(({ tag, attrs, content }) => {
				const tagNode = document.createElement(tag);
				if(isBinded) {
					tagNode.setAttribute('data-router-binded', '');
				}
				if(content) {
					tagNode.appendChild(
						document.createTextNode(content)
					);
				}
				Object.keys(attrs || {})
					.forEach((key) => tagNode.setAttribute(key, attrs[key]));
				return tagNode;
			})
			.reduce((acc, item) => {
				acc.appendChild(item);
				return acc;
			}, document.createDocumentFragment());
	};

	buildBodySection(section) {
		const tagname = 'body';
		const newSectionNode = document.createElement(tagname);
		const { attributes } = document[tagname];

		const scripts = this.buildTag(section.scripts);
		const styles = this.buildTag(section.styles);

		newSectionNode.innerHTML = section.content ? section.content : document[tagname].innerHTML;
		Array.prototype.forEach.call(
			attributes,
			({ name, value }) => newSectionNode.setAttribute(name, value),
		);
		newSectionNode.appendChild(styles);
		newSectionNode.appendChild(scripts);

		return newSectionNode;
	};

	buildHeadSection(section) {
		const scripts = this.buildTag(section.scripts);
		const styles = this.buildTag(section.styles);

		styles.appendChild(scripts);

		return styles;
	};

	rebuildBody() {
		return document.body.parentNode
			.replaceChild(this.body.cloneNode(true), document.body);
	}

	rebuildHead(head) {
		return document.head
			.appendChild(this.head.cloneNode(true));
	}
	
	destructHead() {
		return document.head
			.querySelectorAll('[data-router-binded]')
			.forEach(node => node.remove());
	}

	constructor(view, data) {
		this.body = this.buildBodySection(view.body);
		this.head = this.buildHeadSection(view.head);
	};

	show() {
		this.rebuildHead();
		this.rebuildBody();
	};

	hide() {
		console.log('destructed')
		// this.destructBody(document.head);
		this.destructHead(document.head);
	}
};

export default View;
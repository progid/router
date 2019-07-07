class View {

	static load = path => fetch(path)
		.then(res => res.json())
		.catch(err => err);

	buildTag(tags) {
		return tags
			.map(({ tag, attrs, content }) => {
				const tagNode = document.createElement(tag);
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

		this.headTags = {
			scriptsFragment: scripts,
			scripts: scripts.querySelectorAll('*'),
			styles: styles.querySelectorAll('*'),
			stylesFragment: styles,
		}
		console.log(this.headTags)
		window.fdf = {scripts, styles};

		// newSectionNode.innerHTML = section.content ? section.content : document[tagname].innerHTML;
		// Array.prototype.forEach.call(
		// 	attributes,
		// 	({ name, value }) => newSectionNode.setAttribute(name, value),
		// );
		// newSectionNode.appendChild(styles);
		// newSectionNode.appendChild(scripts);

		// return newSectionNode;
	};

	rebuildBody() {
		return document.body.parentNode.replaceChild(this.body.cloneNode(true), document.body);
	}

	rebuildHead(head) {
		document.head.appendChild(this.headTags.stylesFragment.cloneNode(true));
		document.head.appendChild(this.headTags.scriptsFragment.cloneNode(true));
	}

	destructBody() {
		this.headBody.querySelectorAll('*')
			.forEach(node => node.remove());
	}
	
	destructHead() {
		this.headTags.scripts
			.forEach(node => node.remove());
		this.headTags.styles
			.forEach(node => node.remove());
	}

	constructor(view, data) {
		this.headTags = null;
		this.body = this.buildBodySection(view.body);
		this.head = this.buildHeadSection(view.head);
		// this.view = view;

		// this.bodyTags = null;
		// this.headTags = null;
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
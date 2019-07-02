const ROUTER_ELEMENTS_CLASS = '_router_f7e6c5ecfc4796_tag';

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

	buildBodySection(tagname, section) {
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

	buildHeadSection(tagname, section) {
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

	rebuildHead(head) {

	}

	rebuildBody(body) {
		return body.parentNode.replaceChild(this.body, body);
	}

	constructor(view, data) {
		this.body = this.buildBodySection(view.body);
		this.head = this.buildHeadSection(view.head);
	};

	show() {
		this.rebuildHead(document.head, ROUTER_ELEMENTS_CLASS);
		this.rebuildBody(document.body, ROUTER_ELEMENTS_CLASS);
	};

	hide() {
		this.destructBody(document.head, ROUTER_ELEMENTS_CLASS);
		this.destructHead(document.head, ROUTER_ELEMENTS_CLASS);
	}
};

export default View;
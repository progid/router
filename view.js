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
						document.createTextNode(tag, content)
					);
				}
				Object.keys(attrs)
					.forEach((key) => tagNode.setAttribute(key, attrs[key]));
				return tagNode;
			})
			.reduce((acc, item) => {
				acc.appendChild(item);
				return acc;
			}, document.createDocumentFragment());
	};

	buildSection(tagname, section) {
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

	constructor(view, data) {
		this.body = this.buildSection('body', view.body);
		this.head = this.buildSection('head', view.head);
	};

	show() {
		document.body.parentNode.replaceChild(this.body, document.body);
		document.head.parentNode.replaceChild(this.head, document.head);
	};
};

export default View;
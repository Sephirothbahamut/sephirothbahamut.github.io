
document.write('<meta charset="UTF-8">');
document.write('<meta name="keywords" content=""');
document.write('<meta name="author" content="Michael Marchesan">');
document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');
// Title and favicon
document.write('<title>Michael Marchesan</title>');
document.write('<link rel="shortcut icon" href="#">');

/* ---- MATHJAX3 CONFIG ---- */
MathJax = {
	tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
	svg: { fontCache: 'global' }
};

document.write('<script id="MathJax-script" src="scripts/MathJax3-svg.min.js"></script>');

// Imports colors for our theme, and different highlightjs themes
const dark_theme = window.location.search.indexOf('?dark') === 0;

if (dark_theme)
{
	document.write('<link rel="stylesheet" href="./styles/highlight/vs2015.min.css" type="text/css" />');
	document.write('<link rel="stylesheet" href="./styles/dark.css" type="text/css" />');
}
else
{
	document.write('<link rel="stylesheet" href="./styles/highlight/vs.min.css" type="text/css" />');
	document.write('<link rel="stylesheet" href="./styles/light.css" type="text/css" />');
};

// Base stylesheet
document.write('<link rel="stylesheet" href="./styles/base.css" type="text/css" />');

// Setup highlightjs
document.write('<script src="scripts/highlight/highlight.min.js"></script>');
document.write('<script>hljs.highlightAll();</script>');

const theme_str = dark_theme ? "?dark" : "";

function spawn_tab(label, address)
{
	let tmp = document.createElement("a");
	let destination = address + ".html" + theme_str;
	tmp.setAttribute("href", destination);
	tmp.innerHTML = label;
	tmp.classList.add("tablink");
	tmp.style.width = "22%";
	if (window.location.href.indexOf(address) >= 0) {
		tmp.classList.add("current");
	}
	//TODO if destination == current location, add "current" too
	return tmp;
}

///////////////////////////////////////////////////////////////////// TOGGLES

document.write(`
<style>
	.toggle_label_open::before{
		content: "▼"
	}
	.toggle_label_closed::before{
		content: "►"
	}
</style>
`)

class toggle_button extends HTMLElement
{
	constructor()
	{
		super();
		this.toggle_content = null;
	}
}

class toggle_content extends HTMLElement {}

class toggle_area extends HTMLDivElement {
	constructor() {
		super();
		this.toggle_button = null;
		this.toggle_content = null;
	}
}

function init_button(button) {
	button.style.cursor = "pointer";

	//Get the first child recursively until you reach a leaf
	button.label = button;
	while (true) {
		var tmp = button.label.firstElementChild;
		if (tmp === null) { break; }
		else { button.label = tmp; }
	}
	button.label.classList.add("toggle_label_open");

	button.onclick = () => {
		button.toggle_content.style.display = button.toggle_content.style.display === "none" ? "block" : "none";

		if (button.toggle_content.style.display === "none")
		{
			button.label.classList.remove("toggle_label_open");
			button.label.classList.add   ("toggle_label_closed");
		}
		else
		{
			button.label.classList.remove("toggle_label_closed");
			button.label.classList.add   ("toggle_label_open");
		}
	}
	button.onclick();
}

function get_child_by_tag(source, tag)
{
	for (let i = 0; i < source.children.length; i++)
	{
		if (source.children[i].nodeName == tag.toUpperCase()) { return source.children[i]; }
	}
}

function init_area(area)
{
	area.toggle_button  = get_child_by_tag(area, "toggle-button");
	area.toggle_content = get_child_by_tag(area, "toggle-content");
	area.toggle_button.toggle_content = area.toggle_content;
	init_button(area.toggle_button);
}
customElements.define("toggle-area",    toggle_area,     { extends: "div"});
customElements.define("toggle-button",  toggle_button,   { });
customElements.define("toggle-content", toggle_content, {});

////////////////////////////////////


window.onload = () => {
	//tabs
	let tabs = document.getElementById("tabs");

	tabs.appendChild(spawn_tab("🏠&#xFE0E; Home", "index"));
	tabs.appendChild(spawn_tab("Projects", "projects"));
	tabs.appendChild(spawn_tab("Contacts", "contacts"));

	let theme_tab = document.createElement("a");
	theme_tab.setAttribute("href", dark_theme ? "?" : "?dark");
	theme_tab.innerHTML = "⬤&#xFE0E; " + (dark_theme ? "Light" : "Dark") + " Theme";
	theme_tab.classList.add("tablink");
	theme_tab.style.width = (100 / 4) + "%";

	tabs.appendChild(theme_tab);


	//toggles
	const toggle_areas = document.getElementsByTagName("toggle-area");
	//for (toggle_area in toggle_areas) { init_area(toggle_area); }
	for (i = 0; i < toggle_areas.length; i++) { init_area(toggle_areas[i]); }
};
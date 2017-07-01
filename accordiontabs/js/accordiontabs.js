function TabList(elementRoleTabList) {
	const map = new WeakMap();

	const tablist = this;

	tablist.element = elementRoleTabList;
	/*Object.assign(tablist, TabList.DEFAULTS, {
		multiselectable: elementRoleTabList
		.getAttribute('aria-multiselectable') || false
	});*/

	tablist.multiselectable = ("true" === elementRoleTabList
			.getAttribute('aria-multiselectable'));

	Array.prototype.forEach.call(
		elementRoleTabList.querySelectorAll("[role=tab]"),
		function (tabElement) {
			const tab = new Tab(tabElement);

			if (tab.getExpanded()) {
				tablist.expandedTab = tab;
			}

			map.set(tab.element, tab);

			Array.prototype.push.call(tablist, tab);
		}
	);

	if (!tablist.expandedTab) {
		tablist.expandedTab = tablist[0];
		tablist[0].setExpanded(true);
	}

	tablist.element.addEventListener("click", function (e) {
		const targetTab = e.target.closest("[role=tab]");
		const selectedTab = map.get(targetTab) || tablist[0];		
		console.log(selectedTab.getExpanded(), !selectedTab.getExpanded());
		
		if (tablist.multiselectable) {
			selectedTab.setExpanded(
				!selectedTab.getExpanded()
			);
			return;
		}
			
		

		tablist.expandedTab.setExpanded(false);

		tablist.expandedTab = selectedTab;

		tablist.expandedTab.setExpanded(true);
	}, false);

	tablist.element.addEventListener('keydown', function (e) {
		//38|40|27|13|32
		console.log(e.target, e.keyCode);
		// 1. DOSTAC SIE DO RODZICA -> ELEMENT ARTICLE
		const articleElement = e.target.closest("article");
		/*// 2. Wybrac i sprawdzic index elementu article
		const index = Array.prototype.indexOf.call(
			elementRoleTabList.children,
			articleElement
		);*/
		switch(e.keyCode) {
		case 38:
			const prev = articleElement.previousElementSibling;
			if (prev) {
				prev.firstElementChild.focus();
			} 			
			/*if (0 === index) {
				return;
			}
			elementRoleTabList.children[index - 1]
				.firstElementChild
				.focus();
			console.log(articleElement, index);*/
			break;
		case 40:
			const next = articleElement.nextElementSibling;
			if (next) {
				next.firstElementChild.focus();
			} 
			/*if ((elementRoleTabList.children.length - 1) === index) {
				return;
			}
			elementRoleTabList.children[index + 1]
				.firstElementChild
				.focus();
			console.log(articleElement, index);*/
			break;
		case 13:
		case 32:
			//console.log(document.activeElement);
			document.activeElement.click();
			break;
		case 27:
			document.activeElement.blur();
			break;
		}
	}, false);
}

TabList.DEFAULTS = {
	multiselectable: false
};

function Tab(elementRoleTab) {
	const tab = this;
	tab.element = elementRoleTab;
	tab.controls = new TabPanel(
		document.getElementById(tab.element.getAttribute("aria-controls"))
	);
	elementRoleTab.addEventListener("focus", function () {
		tab.setSelected(true);
	}, false);

	elementRoleTab.addEventListener("blur", function () {
		tab.setSelected(false);
	}, false);

	/*elementRoleTab.addEventListener('keydown', function (e) {
		//38|40|27|13|32
		console.log(e.keyCode);
		switch(e.keyCode) {
		case 38:

			break;
		case 40:
			break;
		case 13:
		case 32:
			break;
		case 27:
			break;
		}
	}, false);*/
}

Tab.prototype = {
	getExpanded: function () {
		return "true" === this.element.getAttribute("aria-expanded");
	},
	setExpanded: function (value) {
		const tab = this;
		const actionName = value ? 'show' : 'hide';

		tab.element.setAttribute("aria-expanded", value);

		tab.controls[actionName]();
	},
	setSelected: function (value) {
		const tab = this;

		tab.element.setAttribute("aria-selected", value);
		tab.element.tabIndex = value ? 1 : -1;
	},
	getSelected: function () {
		const tab = this;
		return "true" === tab.element.
			getAttribute("aria-selected");
	}
}





function TabPanel(elementRoleTabPanel) {
	this.element = elementRoleTabPanel;
}

TabPanel.prototype = {
	show: function () {
		this.element.hidden = false;
		this.element.setAttribute("aria-hidden", false);
	},
	hide: function () {
		this.element.hidden = true;
		this.element.setAttribute("aria-hidden", true);
	}
}

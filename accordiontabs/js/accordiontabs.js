function TabList(elementRoleTabList) {
	const map = new WeakMap();

	const tablist = this;

	tablist.element = elementRoleTabList;

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
		tablist.expandedTab.setExpanded(false);

		const targetTab = e.target.closest("[role=tab]");

		if (targetTab) {
			tablist.expandedTab = map.get(targetTab);
		} else {
			tablist.expandedTab = tablist[0];
		}

		tablist.expandedTab.setExpanded(true);
	}, false);
}

function Tab(elementRoleTab) {
	const tab = this;
	tab.element = elementRoleTab;
	tab.controls = new TabPanel(
		document.getElementById(tab.element.getAttribute("aria-controls"))
	);

	elementRoleTab.addEventListener('keydown|keypress|keyup', function (e) {
		console.log(e.keyCode)
	}, false);
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

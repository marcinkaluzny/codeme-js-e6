function TabList(elementRoleTabList) {
	const map = new WeakMap();

	const tablist = this;

	tablist.element = elementRoleTabList;

	Array.prototype.forEach.call(
		elementRoleTabList.querySelectorAll("[role=tab]"),
		function (tabElement) {
			const tab = new Tab(tabElement);

			if (tab.getSelected()) {
				tablist.selectedTab = tab;
			}

			map.set(tab.element, tab);

			Array.prototype.push.call(tablist, tab);
		}
	);

	if (!tablist.selectedTab) {
		tablist.selectedTab = tablist[0];
		tablist[0].setSelected(true);
	}

	tablist.element.addEventListener("click", function (e) {
		tablist.selectedTab.setSelected(false);

		tablist.selectedTab = map.get(e.target);
		
		//const index = Array.prototype.indexOf.call(tablist.element.children, e.target);

		/*if (0 <= index) {
			tablist.selectedTab = tablist[index];
		}*/

	}, false);
}

function Tab(elementRoleTab) {
	const tab = this;
	tab.element = elementRoleTab;
	tab.controls = new TabPanel(
		document.getElementById(tab.element.getAttribute("aria-controls"))
	);

	tab.element.addEventListener("click", function (e) {
		tab.setSelected(true);
	}, false);
}

Tab.prototype = {
	getSelected: function () {
		return "true" === this.element.getAttribute("aria-selected");
	},
	setSelected: function (value) {
		const tab = this;
		const actionName = value ? 'show' : 'hide';

		tab.element.setAttribute("aria-selected", value);

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

window.tablist = new TabList(document.body.querySelector("[role=tablist]"));

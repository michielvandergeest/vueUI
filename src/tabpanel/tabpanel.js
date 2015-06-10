/**
 * VueUI
 * Tabpanel component
 */
var VueUiTabpanel = Vue.extend({
	template: '\
		<div class="tabpanel">\
			<div class="tabpanel-labels">\
				<ul>\
					<li v-repeat="tab: tabs" v-class="active: tab.active" v-on="click: activateTab(tab)">\
						<label>{{tab.title}}</label>\
						<span class="close-tab" v-on="click: removeTab(tab, $event)" v-show="tab.closeable">x</span>\
					</li>\
				</ul>\
			</div>\
			<div class="tabpanel-tabscontainer">\
				<content></content>\
			</div>\
		</div>',
	replace: true,
	data: function() {
		return {
			tabs: [],
		}
	},
	ready: function()
	{

		this._transCpnts.forEach(function(tab) {
			this.tabs.push(tab);
		}.bind(this));

		if(this.tabs[0])
		{
			this.tabs[0].activate();
		}
	},
	methods:
	{
		deactiveAllTabs: function()
		{
			this.tabs.forEach(function(tab) {
				tab.deactivate();
			});
		},
		activateTab: function(tab) {
			tab.activate();
		},
		removeTab: function(tab, e) {
			e.preventDefault();

			if(tab.active)
			{
				// if there are more tabs
				if(this.tabs.length > 1)
				{
					var index = false;

					// locate index of the tab in the this.tabs array
					for(var i = 0; i < this.tabs.length; i++)
					{
						if(this.tabs[i] === tab)
						{
							index = i;
							break;
						}
					}

					// It's not the first tab, so activate the tab before it
					if(index > 0)
					{
						this.activateTab(this.tabs[index - 1]);
					}
					// It's the first tab, so activate the second tab (index = 1)
					else
					{
						this.activateTab(this.tabs[1]);
					}

				}
			}

			// Finally remove the tab
			tab.remove();
			this.tabs.$remove(tab);
		}
	}

});

/**
 * VueUI
 * Tab component
 */
var VueUiTab = Vue.extend({
	template: '<div class="tab" v-class="active: active"><content></content></div>',
	replace: true,
	paramAttributes: ['title', 'closeable'],
	data: function() {
		return {
			title: '',
			active: false,
		}
	},
	methods: {
		activate: function()
		{
			this._host.deactiveAllTabs();
			this.active = true;
		},
		deactivate: function()
		{
			this.active = false;
		},
		remove: function() {
			this.$destroy(true);
		}
	}
});

Vue.component('vue-ui-tabpanel', VueUiTabpanel);
Vue.component('vue-ui-tab', VueUiTab);

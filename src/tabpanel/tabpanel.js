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
	paramAttributes: ['title'],
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
		}
	}
});

Vue.component('vue-ui-tabpanel', VueUiTabpanel);
Vue.component('vue-ui-tab', VueUiTab);

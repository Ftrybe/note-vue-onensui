import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import 'v-calendar/lib/v-calendar.min.css';
import './assets/theme/index.scss'
import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import VueOnsen from 'vue-onsenui';
import VCalendar from 'v-calendar';
import AppNavigator from './app-navigator.vue';
import Toolbar from './partials/toolbar.vue';
import VueTouch from 'vue-touch';
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueOnsen);
Vue.use(VCalendar, {
    firstDayOfWeek: 2,  // Monday
});
Vue.use(VueTouch,{name: 'v-touch'});
Vue.component('v-toolbar', Toolbar);
new Vue({
    store,
    render: h => h(AppNavigator),
    beforeCreate() {
        // this.$ons.disableAutoStyling();
        // Shortcut for Material Design
        this.$ons.disableAutoStyling();
        Vue.prototype.md = this.$ons.platform.isAndroid();
        // Set iPhoneX flag based on URL
        if (window.location.search.match(/iphonex/i)) {
            document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
            document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
        }
    }
}).$mount('#app');

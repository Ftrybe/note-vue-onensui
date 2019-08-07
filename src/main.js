import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import 'v-calendar/lib/v-calendar.min.css';
import './main.css';
import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import VueOnsen from 'vue-onsenui';
import VCalendar from 'v-calendar';
import axios from 'axios';
import AppNavigator from "./AppNavigator";
import CustomToolbar from './partials/CustomToolbar';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueOnsen);
Vue.use(VCalendar, {
    firstDayOfWeek: 2,  // Monday
});
Vue.prototype.$axios = axios;

Vue.component('custom-toolbar', CustomToolbar);
new Vue({
    store,
    render: h => h(AppNavigator),
    beforeCreate() {
        // this.$ons.disableAutoStyling();
        // Shortcut for Material Design
        Vue.prototype.md = this.$ons.platform.isAndroid();
        // Set iPhoneX flag based on URL
        if (window.location.search.match(/iphonex/i)) {
            document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
            document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
        }
    }
}).$mount('#app');

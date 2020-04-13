import { Onsenui } from "vue-onsenui";

declare module "vue/types/vue" {
    interface Vue {
      $ons: Onsenui;
    }
}
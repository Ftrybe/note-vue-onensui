import { Onsenui } from "vue-onsenui";
import Http  from "@/core/interceptors/http.interceptor";
import { AxiosInstance } from "axios";

declare module "vue/types/vue" {
    interface Vue {
      $ons: Onsenui;
    }
}
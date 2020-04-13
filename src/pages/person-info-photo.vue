<template>
    <v-ons-page>
        <v-toolbar v-bind="toolbarInfo">
            <div slot="right"></div>
        </v-toolbar>
        <div class="cropper">
            <vue-cropper
                :img="data"
                ref="cropper"
                :can-move-box="false"
                :can-move="true"
                :fixed-box="true"
                :auto-crop="true"
                :center-box="true"
                :original="false"
                :info="false"
                :outputSize="0.1"
                :enlarge="0.32"
                :auto-crop-width="'200px'"
                :auto-crop-height="'200px'"
            ></vue-cropper>
        </div>
        <div class="footer" @click="save">确定</div>
    </v-ons-page>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import { VueCropper } from "vue-cropper";
import FileService from "../core/services/file.service";
import { FileDto } from "../core/models/sys/file.dto";
import  UserService from '../core/services/user.service';
import { UserDTO } from '../core/models/sys/user.dto';
import { UserModule } from '../store/modules/user';
import { NavigatorModule } from '@/store/modules/navigator';

@Component({
    components: {
        VueCropper
    }
})
export default class PersonInfoPhotoPage extends Vue {
    @Prop() toolbarInfo!: any;

    @Prop() data?: string;

    $refs!: { cropper: JSX.ElementClass };

    save() {
        (this.$refs.cropper as any).getCropData(async (data: any) => {
            const file = new FileDto();
            file.data = data;
            file.dataType = "base64";
            file.bucketName = "profile";
            FileService.save(file).then(async rsp => {
				const user = new UserDTO();
				user.photo = rsp.data.data.imageUrl;
				await UserService.update(user);
				UserModule.getCurrentInfo();
				NavigatorModule.pop();
			});
        });
    }
}
</script>
<style scoped lang='scss'>
.cropper {
    width: 100%;
    height: 100%;
}
.footer {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 48px;
    line-height: 48px;
    width: 100%;
    padding-right: 16px;
    text-align: right;
    background-color: #fff;
}
.vue-cropper {
    background: #6f6f6f;
}
::v-deep .cropper-view-box {
    outline: none;
    box-shadow: 0 0 2px 1px #39f;
    border-radius: 8px;
    .cropper-face {
        border-radius: 8px;
    }
}
</style>
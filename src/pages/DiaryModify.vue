<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo">
            <div slot="right">
                <v-ons-icon icon="md-check" color="#0076ff"></v-ons-icon>
            </div>
        </custom-toolbar>

        <v-ons-list>

            <!--            <div class="list-item__title">标题</div>-->
            <v-ons-list-header>标题</v-ons-list-header>
            <v-ons-list-item>
                <div class="center">
                    <v-ons-input placeholder="请输入标题" float
                                 v-model="name"
                    >
                    </v-ons-input>
                </div>
            </v-ons-list-item>

            <!--            <div class="list-item__title">标题</div>-->
            <v-ons-list-header>内容</v-ons-list-header>
            <v-ons-list-item>
                <textarea class="textarea textarea--transparent w-100" rows="6" placeholder="textarea "></textarea>
            </v-ons-list-item>

            <!--              <div class="list-item__title">标题</div>-->
            <v-ons-list-header>时间</v-ons-list-header>
        </v-ons-list>
            <v-date-picker
                    v-model='date'
            ></v-date-picker>
    </v-ons-page>
</template>

<script>
    export default {
        data() {
            return {
                 name: 'text',
                date: new Date()
            }
        }
    }
</script>

<style scoped>
    .list-item__title{
        padding:8px 16px;
        font-size: 14px;
        color: #444444;
    }
</style>

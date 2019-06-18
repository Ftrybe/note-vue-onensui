<template>
    <v-ons-page>
        <v-ons-list>
            <time-line></time-line>
            <time-line></time-line>
            <time-line></time-line>
        </v-ons-list>
        <v-ons-fab
                position="bottom right"
                :visible="fabVisible"
        >
            <v-ons-icon icon="md-edit"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>
</template>

<script>
    import TimeLine from "../partials/TimeLine";

    export default {
        components: {TimeLine},
        data() {
            return {
                fabVisible: true
            };
        }
    }
</script>

<style scoped>

</style>

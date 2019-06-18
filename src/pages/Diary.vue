<template>
    <v-ons-page>

        <v-ons-fab
                position="bottom right"
                :visible="fabVisible"
        >
            <v-ons-icon icon="md-edit"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>
</template>

<script>
    export default {
        data() {
            return {
                fabVisible: true
            };
        }
    }
</script>

<style scoped>

</style>

<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                drawer: false // Hide mobile side menu by default
            };
        }

    }
</script>


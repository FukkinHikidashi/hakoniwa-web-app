<template>
    <v-container class="layout align-center">
        <v-layout row wrap class="pa-3">
            <v-img :src="loginImage"/>

            <v-flex xs12 class="mt-5"><!-- mtでmargin-topの幅を決められる-->
                <h1 color="info">
                    HAKONIWA
                </h1>
                <v-text-field
                v-model="email"
            label="メールアドレス"
            box
            background-color="black"
            dark
            color="white" />
            
            <v-text-field
                v-model="pw"
            label="Pasword"
            box
            background-color="black"
            dark
            color="white" />
            <v-btn color="primary" depressed>ログイン</v-btn>
            </v-flex>

        </v-layout>


    </v-container>
</template>

<script>
export default {
    layout:"login",
    data(){
        return {
            loginImage: require("@/static/login.jpg")
        }
    }
}
</script>


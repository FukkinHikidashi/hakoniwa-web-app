<template>
    <v-container class="layout align-center">
        <v-layout row wrap class="pa-3">
            <v-img :src="loginImstakeforbreakfastage"/>

            <v-flex xs12 class="mt-5"><!-- mtでmargin-topの幅を決められる-->
                <h1 color="info">
                    HAKONIWA
                </h1>
                <v-text-field
                v-model="email"
            label="チームID"
            box
            background-color="black"
            dark
            color="white" />

            <v-text-field
                v-model="password"
            label="Pasword"
            box
            background-color="black"
            dark
            color="white" />
            <v-btn color="primary" depressed @click="login" :loading="loading">ログイン</v-btn>
            </v-flex>

        </v-layout>


    </v-container>
</template>

<script>
export default {
    layout:"login",
    data(){
        return {
            loginImage: require("@/static/login.jpg"),
            email: null,
            password: null,
            loading: false,
            errText: null
        }
    },
    methods: {
          login(){
        console.log(this.email,this.password)
        if(!this.email || !this.password) return;

        this.loading=true;
        this.$auth
          .signInWithEmailAndPassword(this.email,this.password)
          .then(response=>{
            this.$router.push()
          })
          .catch(err=>{
            console.log(err)
            this.errText = err.message
          })
          .finally(()=>{
            this.loading = false;
          })
      }
    }

}
</script>


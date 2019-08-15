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
                label="チームID"
                background-color="black"
                dark
                color="white" />

            <v-text-field
                v-model="pw"
                label="Password"
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
            email: "",
            pw: "",
            loading: false,
            errText: null
        }
    },
    methods: {
          login(){
        //console.log(this.email,this.password)
        if(!this.email || !this.pw) return;

        this.loading=true;
        this.$auth
          .signInWithEmailAndPassword(this.email,this.pw)
          .then(response=>{
            this.$router.push("/")
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


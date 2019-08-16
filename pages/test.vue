<template>
<!-- firebase登録用にとりあえず作ったやつをおいておく場所-->
    <v-btn @click="createTeamData()">create</v-btn>
</template>

<script>
export default {
    layout: 'login',
    data(){
        return{
            teamData: {}

        }
    },
    methods:{
        createTeamData(){
            this.$firestore.collection("Team").doc("backup").get()
            .then(doc => {
                this.$firestore.collection("Team").doc("xxxxxxxxxxxxxx").set(doc.data())
            })
        }

    }
}
</script>
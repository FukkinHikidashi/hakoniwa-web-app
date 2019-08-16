<template>
<!-- firebase登録用にとりあえず作ったやつをおいておく場所-->
    <v-btn @click="createTeamData()">create</v-btn>
</template>

<script>
export default {
    data(){
        return{
            teamData: {}

        }
    },
    methods:{
        createTeamData(){
            this.$firestore.collection("Team").doc("teamXX").get()
            .then(doc => {
                this.$firestore.collection("Team").doc("wPenfOmOi4Y8ibxERyqzLU63TTe2").set(doc.data())
            })
        }

    }
}
</script>
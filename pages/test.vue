<template>
<div>
<!-- firebase登録用にとりあえず作ったやつをおいておく場所-->
    <v-btn @click="createTeamData()">create</v-btn>

    <v-img src="https://firebasestorage.googleapis.com/v0/b/hakoniwa-190818.appspot.com/o/1567023462324?alt=media&token=a992e9ff-8d07-430c-ad79-fc35d694ef45"></v-img>
</div>
</template>

<script>
export default {
    layout: 'login',
    data(){
        return{
            teamData: {},
            img:""

        }
    },
    methods:{
        async createTeamData(){
            this.$firestore.collection("Team").doc("backup").get()
            .then(doc => {

                this.$firestore.collection("Team").doc("wPenfOmOi4Y8ibxERyqzLU63TTe2").set(doc.data())
            })
        }

    }
}
</script>
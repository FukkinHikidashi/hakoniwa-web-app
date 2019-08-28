<template>
<div>
<!-- firebase登録用にとりあえず作ったやつをおいておく場所-->
    <v-btn @click="createTeamData()">create</v-btn>

    <v-img src="https://firebasestorage.googleapis.com/v0/b/hakoniwa-190818.appspot.com/o/1566808031512?alt=media&token=9e839c96-6f67-42e1-b565-f5f5db2a25bf"></v-img>
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
<template>
<div>

</div>
</template>

<script>
export default {
    layout: "login",
    async beforeCreate(){
        await this.$firestore.collection("mainMissionAnswer").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.mainMissionAnswers.push(doc.data())
            })
        })
        await console.log({mainMissionAnswers:this.mainMissionAnswers})

    },
    data(){
        return {
        mainMissionAnswers:[],
        subStoryAnswers:[],


        }
    },
    methods:{
        acceptMissionAnswer(){

        },
        denyMissionAnswer(){

        },
        sendMessageToAll(){

        },
        sendMessageToTeam(uid){

        },
        showAllMissionsAlreadyAcceptedIncluded(){

        },
        renew(){

        }
        

    },
    computed:{

    }
}
</script>
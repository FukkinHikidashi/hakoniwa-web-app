<template>
<div>
    <h3>承認画面</h3>
    <v-tabs
    v-model="tab"
    background-color="light-blue lighten-5"
    >
        <v-layout justify-space-around>
            <v-tab>メイン</v-tab>
            <v-tab>サブ</v-tab>
        </v-layout>
    </v-tabs>

    <v-tabs-items v-model="tab">

    <v-tab-item>
    <div v-for="el in mainMissionAnswers" :key="el.key">
        <v-container class="background-color: grey lighten-1">
            <v-card @click="nowCardDialog(el)" :color="el.color">
                <v-container>
                <v-layout>
                    <v-flex xs7>
                        <h3 style="text-decoration: underline">{{ el.team }}チーム</h3>
                        id:{{el.id}}<br>
                        mission:{{el.text}}<br>


                    </v-flex>
                    <v-flex xs5>
                        <v-container>
                        <div v-if="el.answerType === 'text'">
                            回答：{{ el.answer }}
                        </div>
                        <div v-if="el.answerType === 'photo'">
                            <v-img :src="el.answer" aspect-ratio="1"></v-img>
                        </div>
                        </v-container>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card>
        </v-container>
        <v-dialog v-model="dialog">
            <v-container class="background-color: grey lighten-4">
                <v-layout row wrap class="mb-3 dialog">
                    <v-container>
                    ミッション：{{nowCard.text}}
                        <div v-if="nowCard.answerType === 'text'">
                            回答：{{ nowCard.answer }}
                        </div>
                        <div v-if="nowCard.answerType === 'photo'">
                            <v-img :src="nowCard.answer" width="80vw"></v-img>
                        </div>
                    </v-container>
                </v-layout>
            <v-layout justify-space-around>
                <v-btn color="primary"
                @click="acceptMainMissionAnswer()"
                :loading="loading"
                :disabled="disabled">承認</v-btn>
                <v-btn color="secondary"
                @click="denyMainMissionAnswer()"
                :disabled="disabled"
                :loading="loading">却下</v-btn>
            </v-layout>
            </v-container>
        </v-dialog>
    </div>
    </v-tab-item>

    <v-tab-item>
        ここにサブの提出一覧を入れる
    </v-tab-item>
    </v-tabs-items>

</div>
</template>

<script>
export default {
    layout: "login",
    async beforeCreate(){
        await this.$firestore.collection("mainMissionAnswer")
        .where("clear", "<=", 4)  //承認したもののclearを5にすることで非表示＋いざとなったときに表示可にする
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.mainMissionAnswers.push({...doc.data(),docId: doc.id,color:"grey lighten-3"})
            })
        })

        await this.mainMissionAnswers.sort((a, b) => {
            return (a.key > b.key ? 1 : -1)
        })
        await console.log({mainMissionAnswers:this.mainMissionAnswers})

    },
    data(){
        return {
        dialog: false,
        disabled: false,
        tab:null,
        loading:false,
        mainMissionAnswers:[],
        nowCard:{},
        subStoryAnswers:[],

        }
    },
    methods:{
        //cardをクリックするときの関数で、dataにクリックしたカードのデータを貼って、そこからdialogを読み込む
        nowCardDialog(el){
            this.nowCard = el
            this.dialog = true


        },
        async acceptMainMissionAnswer(){
            this.loading = await true
            this.disabled = await true
            const uid = await this.nowCard.uid
            const docId = await this.nowCard.docId
            const firestore = this.$firestore
            const score = await this.nowCard.nowStage*10
            const key = await this.nowCard.key
            const id = await this.nowCard.id
            //mainMissionAnswerのcollectionにまず情報更新
            await firestore.doc(`mainMissionAnswer/${docId}`).update({clear: 5})
            await console.log("done")

            //点数の追加
            await firestore.doc(`Team/${uid}`).get()
            .then(doc => {
                const nowScore = doc.data().point
                nowScore.mainPoint = nowScore.mainPoint*1 + score
                firestore.doc(`Team/${uid}`).update({point: nowScore})
                console.log({nowScore})
            })


            //team側へのclearの更新
            await firestore.doc(`Team/${uid}`).get()
            .then(doc => {
                const renewedData = doc.data().mainMission.map( x => {
                    if(x.id === id){
                        return {id:id, clear: 2}
                    }else{
                        return x
                    }

                })
                firestore.doc(`Team/${uid}`).update({mainMission: renewedData})
            })


            this.nowCard.color = await "black"
            await this.mainMissionAnswers.map(x => {
                if(x.key === this.nowCard.key){ return this.nowCard }else{ return x }
            })
            this.loading = await false
            this.disabled = await false
            this.dialog = await false

        },
        async denyMainMissionAnswer(){

            this.loading = await true
            this.disabled = await true
            const uid = await this.nowCard.uid
            const docId = await this.nowCard.docId
            const firestore = this.$firestore
            const score = await this.nowCard.nowStage*10
            const key = await this.nowCard.key
            const id = await this.nowCard.id
            //mainMissionAnswerのcollectionにまず情報更新
            await firestore.doc(`mainMissionAnswer/${docId}`).update({clear: 6})
            await console.log("done")

            //team側へのclearの更新
            await firestore.doc(`Team/${uid}`).get()
            .then(doc => {
                const renewedData = doc.data().mainMission.map( x => {
                    if(x.id === id){
                        return {id:id, clear: 3}
                    }else{
                        return x
                    }

                })
                firestore.doc(`Team/${uid}`).update({mainMission: renewedData})
            })


            this.nowCard.color = await "black"
            await this.mainMissionAnswers.map(x => {
                if(x.key === this.nowCard.key){ return this.nowCard }else{ return x }
            })
            this.loading = await false
            this.disabled = await false
            this.dialog = await false


        },
        acceptSubStoryAnswer(){

        },
        denySubStoryAnswer(){

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


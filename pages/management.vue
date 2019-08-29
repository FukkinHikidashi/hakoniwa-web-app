<template>
<div>
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
        <v-container>
            <v-card @click="nowCardDialog(el)">
                <v-container>
                <v-layout>
                    <v-flex xs7>
                        <h3>{{ el.team }}チーム</h3>
                        id:{{el.id}}<br>
                        mission:{{el.text}}<br>


                    </v-flex>
                    <v-flex xs5>
                        <div v-if="el.answerType === 'text'">
                            回答：{{ el.answer }}
                        </div>
                        <div v-if="el.answerType === 'photo'">
                            <v-img :src="el.answer" aspect-ratio="1"></v-img>
                        </div>
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
                <v-btn color="primary">承認</v-btn>
                <v-btn color="secondary">却下</v-btn>
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
                this.mainMissionAnswers.push(doc.data())
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
        tab:null,
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


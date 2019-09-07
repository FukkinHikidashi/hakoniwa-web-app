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
      <div div style="margin-top:10px;padding-bottom:10px;width:96vw; margin-left:auto;margin-right:auto;">
        <div style="border:solid 2px rgb(91,192,222,0.5)">
          <p>クイズスタートトリガー</p>
          <v-text-field
              v-model="quizNum1"
              label="番号入力"
              placeholder="数字1桁のみ"
          ></v-text-field>
          <v-btn @click="startQuiz()">クイズスタート</v-btn>
        </div>

        <div style="border:solid 2px rgb(91,192,222,0.5)">
          <p>クイズ時間切れ</p>
            <v-text-field
                v-model="quizNum2"
                label="番号入力"
                placeholder="数字1桁のみ"
            ></v-text-field>
            <v-btn @click="expireQuiz()">クイズ時間切れ</v-btn>
        </div>

        <div style="border:solid 2px rgb(91,192,222,0.5)">
          <p>クイズ正解or不正解</p>
            <v-text-field
                v-model="team"
                label="チームアルファベット"
                placeholder="英字1文字のみ"
            ></v-text-field>
            <v-text-field
                v-model="quizNum3"
                label="番号入力"
                placeholder="数字1桁のみ"
            ></v-text-field>
            <v-btn @click="acceptQuiz(10)">承認</v-btn>
            <v-btn @click="denyQuiz()">却下</v-btn>
        </div>

        <div style="border:solid 2px rgb(91,192,222,0.5)">
        <p>Aチーム合計{{subStroyPoint.A}}点</p>
        <p>{{AStatus}}</p>
        <p>Bチーム合計{{subStroyPoint.B}}点</p>
        <p>{{BStatus}}</p>
        <v-btn @click="getStatus()">取得</v-btn>
        </div>
      </div>
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
//ここからsubStory用



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
        subStories:{},
        subStroyPoint:{},
        quizNum1:"",
        quizNum2:"",
        quizNum3:"",
        team:"",
        uid:"",
        quizStatus:["未開放","回答中","正解","時間切れ"],
        AStatus:[],
        BStatus:[],
        Qnum:"",
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
        startQuizMethod(uid){
          var quizNumText = "quiz" + this.quizNum1
          this.$firestore.doc(`Team/${uid}`).get()
            .then(doc => {
              const nowScore = doc.data().subStory
              if(nowScore[quizNumText]["clear"]==0){
                nowScore[quizNumText]["clear"] = 1
                nowScore.caution.cautionOpened = true
                nowScore.caution.cautionMess ="サブストーリが進みました"
                this.$firestore.doc(`Team/${uid}`).update({subStory: nowScore})
              }
            })
        },
        startQuiz(){
          this.startQuizMethod("dOz1WsyLrJZ0CaCDnA0bcKKZ6Wc2")
          this.startQuizMethod("wPenfOmOi4Y8ibxERyqzLU63TTe2")
          this.startQuizMethod("Nv7y16tkN8NYdjYP6cup3Q4IW363")
        },

        expireQuizMethod(uid){
          var quizNumText = "quiz" + this.quizNum2
          this.$firestore.doc(`Team/${uid}`).get()
            .then(doc => {
              const nowScore = doc.data().subStory
              if(nowScore[quizNumText]["clear"]==1){
                nowScore[quizNumText]["clear"] = 3
                nowScore.caution.cautionOpened = true
                nowScore.caution.cautionMess ="時間切れのクイズがあります…。"
                this.$firestore.doc(`Team/${uid}`).update({subStory: nowScore})
              }
            })
        },
        expireQuiz(){
          this.expireQuizMethod("dOz1WsyLrJZ0CaCDnA0bcKKZ6Wc2")
          this.expireQuizMethod("wPenfOmOi4Y8ibxERyqzLU63TTe2")
          this.expireQuizMethod("Nv7y16tkN8NYdjYP6cup3Q4IW363")
        },
        acceptQuiz(score){
          if(this.team=="A"){
              this.uid="Nv7y16tkN8NYdjYP6cup3Q4IW363"
          }else if(this.team=="B"){
              this.uid="wPenfOmOi4Y8ibxERyqzLU63TTe2"
          }else{
              this.uid=""
          }
          var quizNumText = "quiz" + this.quizNum3
          this.$firestore.doc(`Team/${this.uid}`).get()
            .then(doc => {
              const nowScore = doc.data().subStory
              if(nowScore[quizNumText]["clear"]==1){
                nowScore[quizNumText]["clear"] = 2
                nowScore.caution.cautionOpened = true
                nowScore.mainPoint = nowScore.mainPoint*1 + score
                nowScore.caution.cautionMess = nowScore.caution.cautionMess +"クイズ"+this.quizNum3+"に正解しました。"
                this.$firestore.doc(`Team/${this.uid}`).update({subStory: nowScore})
              }
            })
        },
        getStatus(){
          var uid = "wPenfOmOi4Y8ibxERyqzLU63TTe2"
          this.$firestore.doc(`Team/${uid}`).get()
          .then(doc=>{
            this.team =  doc.data().team
            this.subStories[this.team] = doc.data().subStory
            this.subStroyPoint[this.team] =  doc.data().point.subPoint
          })
          uid = "Nv7y16tkN8NYdjYP6cup3Q4IW363"
          this.$firestore.doc(`Team/${uid}`).get()
          .then(doc=>{
            this.team =  doc.data().team
          this.subStories["A"] = doc.data().subStory
            this.subStroyPoint["A"] =  doc.data().point.subPoint
          })
          console.log(this.$auth.currentUser.uid)

          for(this.Qnum in this.subStories.A){
            this.AStatus[this.Qnum]=this.quizStatus[this.subStories.A[this.Qnum].clear]
            //console.log(subStories.A[Qnum].clear)

          }
          console.log(this.AStatus)
          for(this.Qnum in this.subStories.B){
            this.BStatus[this.Qnum]=this.quizStatus[this.subStories.B[this.Qnum].clear]
            //console.log(subStories.B[Qnum].clear)

          }
          console.log(this.BStatus)

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


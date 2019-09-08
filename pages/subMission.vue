<template>
  <div style="margin-top:10px;padding-bottom:10px;width:96vw; margin-left:auto;margin-right:auto;">
    <div >
      <div style="background-color:rgb(91,192,222,0.5);width:30%;text-align:center">
        <h3>ストーリー</h3>
      </div>
      <div style="margin-top:5px;margin-bottom:10px;border:solid 2px rgb(91,192,222,0.5)">
        <p v-if="quiz1Clear==0">comming soon</p>
        <p v-if="quiz1Clear >= 1 ">ここは宝が眠る謎の塔の見える町。トレジャーハントに出かける前夜、町の酒場で英気を養うあなたたちに不思議な依頼が舞い込みました。</p>
        <p v-if="quiz1Clear >= 1 ">※クイズに挑戦してもらったキーワードをもとに女の子に会いに行こう！<br>
                                クイズに正解するとポイントをゲットできるぞ！※</p>

      </div>
    </div>


    <v-dialog v-model="cautionOpened" style="padding-bottom:10px">
      <v-card align="center" >
      <div  style="padding:50px" align="center"><h3>{{cautionMess}}</h3></div>
      <v-btn  @click="cautionClose()" ><h4>確認しました。</h4></v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="answerResOpen">
      <v-card  >
      <div style="padding:50px" align="center"><h3>{{answerResComment}}</h3></div>
      </v-card>
    </v-dialog>

    <div style="background-color:rgb(91,192,222,0.5);width:30%;text-align:center">
        <h3>クイズ</h3>
    </div>

    <v-expansion-panels
      v-model="panel"
      multiple
      style="margin-top:5px"
    >
<!-- Question1 -->
      <v-expansion-panel v-if="quiz1Clear >= 1 " style="border:solid 2px rgb(91,192,222,0.5)">
        <div style="background-color:rgb(91,192,222,0.5)">1.町の酒場での不思議な依頼</div>
        <v-expansion-panel-header style="border-bottom:solid 1px rgb(70,70,70,0.5)">
          <div style="width:30% "><p v-if="quiz1Clear==1">回答中</p>
                                  <p v-if="quiz1Clear==2">正解</p>
                                  <p v-if="quiz1Clear==3">時間ぎれ</p></div>
          <div style="width:70%"><p v-if="quiz1Clear >= 2">獲得キーワード：魚</p></div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <v-flex>
            <h4>~ストーリー~</h4>
            <p>―君たちは始まるトレージャーバトルを前に酒場で酒盛りをしている。―</p>
            <p>酒場の店主「やあ元気かい？お前らに預かりもんだぞ。」店主はそう笑いながら１枚の紙を差し出してきた。</p>
            </v-flex>
          </div>
          <h4>~問題~</h4>
          <div>
            <v-img :src="question01Image" width="80vw"/>
          </div>
          <div>
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-if="quiz1Clear==1"
            v-model="answerText1"
            label="解答欄"
            placeholder="答えを入力"
          ></v-text-field>
          </v-col>
          <v-btn
            v-if="quiz1Clear==1"
            color="green" large right
            @click="submitQ1Text()"
          >
          送信
        </v-btn>
        </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
<!-- Question2 -->

      <v-expansion-panel v-if="quiz2Clear >= 1 " style="border:solid 2px rgb(91,192,222,0.5)">
        <div style="background-color:rgb(91,192,222,0.5)">2.依頼主の女の子</div>
        <v-expansion-panel-header style="border-bottom:solid 1px rgb(70,70,70,0.5)">
          <div style="width:30% "><p v-if="quiz2Clear==1">回答中</p>
                                  <p v-if="quiz2Clear==2">正解</p>
                                  <p v-if="quiz2Clear==3">時間ぎれ</p></div>
          <div style="width:70%"><p v-if="quiz2Clear >= 2">獲得キーワード：く</p></div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <v-flex>
            <h4>~ストーリー~</h4>
            <p v-if="quiz1Clear==3">酒場の店主「ちと時間が足りなかったか。…ん？誰からかって？そりゃ…。」</p>
            <p v-if="quiz1Clear==2">酒場の店主「おう、いとも簡単に解くなんてすげーじゃねーか！…ん？誰からかって？そりゃ…。」</p>
            <p>女の子「私です！皆さん！」奥からひょこっと女の子が顔を出している。</p>
            <p>女の子「もう１問遊びましょう！」</p>
            </v-flex>
          </div>
          <h4>~問題~</h4>
          <div>
            <v-img :src="question02Image" width="80vw"/>
          </div>
          <div>
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-if="quiz2Clear==1"
            v-model="answerText2"
            label="解答欄"
            placeholder="答えを入力"
          ></v-text-field>
          </v-col>
          <v-btn
            v-if="quiz2Clear==1"
            color="green" large right
            @click="submitQ2Text()"
          >
          送信
        </v-btn>
        </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
<!-- Question3 -->

      <v-expansion-panel v-if="quiz3Clear >= 1 " style="border:solid 2px rgb(91,192,222,0.5)">
        <div style="background-color:rgb(91,192,222,0.5)">3.会いたがってる女の子</div>
        <v-expansion-panel-header style="border-bottom:solid 1px rgb(70,70,70,0.5)">
          <div style="width:30% "><p v-if="quiz3Clear==1">回答中</p>
                                  <p v-if="quiz3Clear==2">正解</p>
                                  <p v-if="quiz3Clear==3">時間ぎれ</p></div>
          <div style="width:70%"><p v-if="quiz3Clear >= 2">獲得キーワード：少</p></div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <v-flex>
            <h4>~ストーリー~</h4>
            <p v-if="quiz2Clear==3">女の子「ちょっと難しかったですか？でも折角なのでもっと遊びましょう！明日ある場所で待っているので私を探し出してみてください。</p>
            <p v-if="quiz2Clear==2">女の子「本当に凄いですね！折角なのでもっと遊びませんか？ある場所で待っているので私を探し出してみてください。</p>
            <p>どこにいるかは最初にお渡しした紙を見ればきっとわかると思います。</p>
            <p>すぐに来ていただけるのも嬉しいですが、宝物を見つけてからでもいいですよ。」</p>
            </v-flex>
          </div>
          <h4>~問題~</h4>
          <div>
            <v-img :src="question03Image" width="80vw"/>
          </div>
          <div>
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-if="quiz3Clear==1"
            v-model="answerText3"
            label="解答欄"
            placeholder="答えを入力"
          ></v-text-field>
          </v-col>
          <v-btn
            v-if="quiz3Clear==1"
            color="green" large right
            @click="submitQ3Text()"
          >
          送信
        </v-btn>
        </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
<!-- Question4 -->

      <v-expansion-panel v-if="quiz4Clear >= 1 " style="border:solid 2px rgb(91,192,222,0.5)">
        <div style="background-color:rgb(91,192,222,0.5)">4.宝探し中のお知らせ</div>
        <v-expansion-panel-header style="border-bottom:solid 1px rgb(70,70,70,0.5)">
          <div style="width:30% "><p v-if="quiz4Clear==1">回答中</p>
                                  <p v-if="quiz4Clear==2">正解</p>
                                  <p v-if="quiz4Clear==3">時間ぎれ</p></div>
          <div style="width:70%"><p v-if="quiz4Clear >= 2">獲得キーワード：京</p></div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <v-flex>
            <h4>~ストーリー~</h4>
            <p>―夜が明け、君たちは宝を目指して進んでいる。するとどこからか手紙が来た。あの女の子だ。―</p>
            <p>手紙「こんにちは。ヒントが足りないといけないので、今回はなぞなぞをご用意致しました。</p>
            <p>宝物はみつかりましたか？見つかったならお願いしたいことがあるんですが…。</p>
            </v-flex>
          </div>
          <h4>~問題~</h4>
          <div>
            <v-img :src="question04Image" width="80vw"/>
          </div>
          <div>
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-if="quiz4Clear==1"
            v-model="answerText4"
            label="解答欄"
            placeholder="答えを入力"
          ></v-text-field>
          </v-col>
          <v-btn color="green" large right
            @click="submitQ4Text()"
            v-if="quiz4Clear==1"
          >
          送信
        </v-btn>
        </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

<!-- Question5 -->

      <v-expansion-panel v-if="quiz5Clear >= 1 " style="border:solid 2px rgb(91,192,222,0.5)">
        <div style="background-color:rgb(91,192,222,0.5)">5.本当の依頼</div>
        <v-expansion-panel-header style="border-bottom:solid 1px rgb(70,70,70,0.5)">
          <div style="width:30% "><p v-if="quiz5Clear==1">回答中</p>
                                  <p v-if="quiz5Clear==2">正解</p>
                                  <p v-if="quiz5Clear==3">時間ぎれ</p></div>
          <div style="width:70%"><p v-if="quiz5Clear >= 2">獲得キーワード：止</p></div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <v-flex>
            <h4>~ストーリー~</h4>
            <p>―少し遅れてまた手紙が届く。先程の手紙の続きのようだ。―</p>
            <p>手紙「すぐにでもお会い出来れば嬉しいのですが、もし宝物を見つけた後でお会いできるなら、</p>
            <p>『宝物と並ぶ幻の食べ物』も持ってきていただけませんか？</p>
            <p>宝探しで大忙しかも知れませんが、お礼ははずみますよ！」</p>
            </v-flex>
          </div>
          <h4>~問題~</h4>
          <div>
            <v-img :src="question05Image" width="80vw"/>
          </div>
          <div>
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-if="quiz5Clear==1"
            v-model="answerText5"
            label="解答欄"
            placeholder="答えを入力"
          ></v-text-field>
          </v-col>
          <v-btn
            v-if="quiz5Clear==1"
            color="green" large right
            @click="submitQ5Text()">
          送信
        </v-btn>
        </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script>

  export default {
    beforeCreate(){
      this.loading = true

//collectionから取るとうまく行かないのでquiz1-5でそれぞれ取っちゃう(ここから)
      this.$firestore.doc(`Substory/quiz1`).get()
        .then(doc=>{
          this.substoryQ1Answer=doc.data().answer
        });

      this.$firestore.doc(`Substory/quiz2`).get()
        .then(doc=>{
          this.substoryQ2Answer=doc.data().answer
        });

      this.$firestore.doc(`Substory/quiz3`).get()
        .then(doc=>{
          this.substoryQ3Answer=doc.data().answer
        });

      this.$firestore.doc(`Substory/quiz4`).get()
        .then(doc=>{
          this.quiz4Title = doc.data().title
        });

      this.$firestore.doc(`Substory/quiz5`).get()
        .then(doc=>{
          this.quiz5Title = doc.data().title
        });

//collectionから取るとうまく行かないのでquiz1-5でそれぞれ取っちゃう(ここまで)
      const uid = this.$auth.currentUser.uid
      this.$firestore.doc(`Team/${uid}`).get()
        .then(doc=>{
          this.teamStatus = doc.data()
          this.quiz1Clear = doc.data().subStory.quiz1.clear
          this.quiz2Clear = doc.data().subStory.quiz2.clear
          this.quiz3Clear = doc.data().subStory.quiz3.clear
          this.quiz4Clear = doc.data().subStory.quiz4.clear
          this.quiz5Clear = doc.data().subStory.quiz5.clear
          this.team = doc.data().team
          this.cautionOpened = doc.data().subStory.caution.cautionOpened
          this.cautionMess = doc.data().subStory.caution.cautionMess

        });
       console.log(this.quiz4Title)
       console.log(this.team)
       console.log(this.answerText4)

    },

     data(){
        return {
        hoge:null,
        panel: [],
        loading:false,
        substoryDatas:[],
        teamStatus:[],
        substoryQuiz1:[],
        substoryQuiz2:[],
        substoryQuiz3:[],
        substoryQuiz4:[],
        substoryQuiz5:[],
        substoryQ1Answer:[],
        substoryQ2Answer:[],
        substoryQ3Answer:[],
        quiz1Clear:null,
        quiz2Clear:null,
        quiz3Clear:null,
        quiz4Clear:null,
        quiz5Clear:null,
        question01Image: require("@/static/SubstoryQ1.jpg"),
        question02Image: require("@/static/SubstoryQ2.jpg"),
        question03Image: require("@/static/SubstoryQ3.jpg"),
        question04Image: require("@/static/SubstoryQ4.jpg"),
        question05Image: require("@/static/SubstoryQ5.jpg"),
        answerText1: "",
        answerText2: "",
        answerText3: "",
        answerText4: "",
        answerText5: "",
        nowDisplayMission: null,
        submitData:{},
        testUid:"",
        cautionOpened:"",
        cautionMess:"",
        answerResOpen:false,
        answerResComment:"",


        }

    },
    methods:{
    uid(){
      console.log(this.$auth.currentUser.uid)
    },
    /*get(){
      const uid = this.uid()
      this.hoge = null;
      this.$firestore.doc(`users/${uid}`)
        .get()
        .then(doc=>{
          this.hoge = doc.data()
        })
    },*/

      test(){
        const uid = this.$auth.currentUser.uid
        this.$firestore.doc(`Team/${uid}`).get()
          .then(doc => {
              const nowScore = doc.data().subStory
              nowScore.caution.cautionOpened = true
              nowScore.caution.cautionMess ="サブストーリが進みました!"
              this.$firestore.doc(`Team/${uid}`).update({subStory: nowScore})
        })
      },
      cautionClose(){
        const uid = this.$auth.currentUser.uid
        this.$firestore.doc(`Team/${uid}`).get()
          .then(doc => {
              const nowScore = doc.data().subStory
              nowScore.caution.cautionMess = ""
              nowScore.caution.cautionOpened = false
              this.cautionOpened = false
              this.$firestore.doc(`Team/${uid}`).update({subStory: nowScore})
          })

      },

      submitQ1Text(){
      //this.request.name = this.answerText
      var arr =  this.substoryQ1Answer;
      console.log(this.answerResComment)
          if (arr.indexOf(this.answerText1) >= 0){
            this.answerResComment = "正解！10ptゲット！"
            this.addPoints(10)
            this.statusCrrect("quiz1")
            this.quiz1Clear=2
          }
          if (arr.indexOf(this.answerText1) == -1){
            this.answerResComment = "不正解！"
          }
            this.answerResOpen=!this.answerResOpen
            console.log(this.answerResComment)
      },
      submitQ2Text(){
      //this.request.name = this.answerText
      var arr =  this.substoryQ2Answer;
          if (arr.indexOf(this.answerText2) >= 0){
            this.answerResComment = "正解！10ptゲット！"
            this.addPoints(10)
            this.statusCrrect("quiz2")
            this.quiz2Clear=2
          }
          if (arr.indexOf(this.answerText2) == -1){
            this.answerResComment = "不正解！"
          }
            this.answerResOpen=!this.answerResOpen
      },
      submitQ3Text(){
      //this.request.name = this.answerText
      var arr =  this.substoryQ3Answer;
          if (arr.indexOf(this.answerText3) >= 0){
            this.answerResComment = "正解！10ptゲット！"
            this.addPoints(10)
            this.statusCrrect("quiz3")
            this.quiz3Clear=2
          }
          if (arr.indexOf(this.answerText3) == -1){
            this.answerResComment = "不正解！"
          }
            this.answerResOpen=!this.answerResOpen
      },
      submitQ4Text(){
      //this.request.name = this.answerText
        this.$firestore.collection('subStoryAnswer').add({
          question:this.quiz4Title,
          team:this.team,
          quizNum:4,
          answerText:this.answerText4,
          submitTime:new Date().getTime()
        })
        this.answerResComment = "回答を送りました"
        this.answerResOpen=!this.answerResOpen
      },
      submitQ5Text(){
      //this.request.name = this.answerText
        this.$firestore.collection('subStoryAnswer').add({
          question:this.quiz5Title,
          team:this.team,
          quizNum:5,
          answerText:this.answerText5,
          submitTime:new Date().getTime()
        })
        this.answerResComment = "回答を送りました"
        this.answerResOpen=!this.answerResOpen
      },
      addPoints(score){
          const uid = this.$auth.currentUser.uid
          this.$firestore.doc(`Team/${uid}`).get()
            .then(doc => {
                const nowScore = doc.data().point
                nowScore.subPoint = nowScore.subPoint*1+score
                this.$firestore.doc(`Team/${uid}`).update({point: nowScore})
            })

      },
      statusCrrect(quizNum){
          const uid = this.$auth.currentUser.uid
          this.$firestore.doc(`Team/${uid}`).get()
            .then(doc => {
                const nowScore = doc.data().subStory
                nowScore[quizNum]["clear"] = 2
                this.$firestore.doc(`Team/${uid}`).update({subStory: nowScore})
            })
      }



    }
  }
</script>

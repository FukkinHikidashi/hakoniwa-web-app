<template>
  <div style="margin-top:10px;width:96vw; margin-left:auto;margin-right:auto;">
    <div >
      <div style="background-color:rgb(91,192,222,0.5);width:30%;text-align:center">
        <h3>ストーリー</h3>
      </div>
      <div style="margin-top:5px;margin-bottom:10px;border:solid 2px rgb(91,192,222,0.5)">
        <p v-if="quiz1Clear==0">comming soon</p>
        <p v-if="quiz1Clear!=0">ここは宝が眠る謎の塔の見える町。トレジャーハントに出かける前夜、町の酒場で英気を養うあなたたちに不思議な依頼が舞い込みました。</p>
        <p v-if="quiz1Clear!=0">※クイズに挑戦してもらったキーワードをもとに女の子に会いに行こう！<br>
                                クイズに正解するとポイントをゲットできるぞ！※</p>

      </div>
    </div>

    <v-dialog v-model="cautionOpen" @click="test()">
      <v-card  >
      <div style="padding:50px" align="center"><h3>サブストーリーが<br>更新されました。</h3></div>
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
      <v-expansion-panel v-if="quiz1Clear!=0" style="border:solid 2px rgb(91,192,222,0.5)">
        <div style="background-color:rgb(91,192,222,0.5)">町の酒場での不思議な依頼</div>
        <v-expansion-panel-header style="border-bottom:solid 1px rgb(70,70,70,0.5)">
          <div style="width:30% "><p v-if="quiz1Clear==1">未回答</p>
                                  <p v-if="quiz1Clear==2">正解</p>
                                  <p v-if="quiz1Clear==3">不正解</p></div>
          <div style="width:70%"><p v-if="quiz1Clear >= 2">獲得キーワード：魚</p></div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <v-flex>
            <p>ストーリー</p>
            <p>―君たちは始まるトレージャーバトルを前に酒場で酒盛りをしている。―</p>
            <p>酒場の店主「やあ元気かい？お前らに預かりもんだぞ。」店主はそう笑いながら１枚の紙を差し出してきた。</p>
            {{answerText}}
            </v-flex>
          </div>
          <p>問題</p>
          <div>
            <!--<v-img :src="question01Image"
          />-->
          </div>
          <div>
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="answerText"
            label="解答欄"
            placeholder="答えを入力"
          ></v-text-field>
          </v-col>
          <v-btn color="green" large right
          @click="addTeam()">
          送信
        </v-btn>
        </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <div>2.#########</div>
        <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <div>3.#########</div>
        <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <div>4.#########</div>
        <v-expansion-panel-header>Panel 4</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <div>5.#########</div>
        <v-expansion-panel-header>Panel 5</v-expansion-panel-header>
        <v-expansion-panel-content>
          Some content
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
          this.quiz1Title = doc.data().title
          console.log(this.quiz1Title)
        });

      this.$firestore.doc(`Substory/quiz2`).get()
        .then(doc=>{
          this.substoryQuiz2 = doc.data()
        });

      this.$firestore.doc(`Substory/quiz3`).get()
        .then(doc=>{
          this.substoryQuiz3 = doc.data()
        });

      this.$firestore.doc(`Substory/quiz4`).get()
        .then(doc=>{
          this.substoryQuiz4 = doc.data()
        });

      this.$firestore.doc(`Substory/quiz5`).get()
        .then(doc=>{
          this.substoryQuiz5 = doc.data()
        });

//collectionから取るとうまく行かないのでquiz1-5でそれぞれ取っちゃう(ここまで)
      const uid = "teamXX"
      this.$firestore.doc(`Team/${uid}`).get()
        .then(doc=>{
          this.teamStatus = doc.data()
          this.quiz1Clear = doc.data().subStory.quiz1.clear
          this.quiz2Clear = doc.data().subStory.quiz2.clear
          this.quiz3Clear = doc.data().subStory.quiz3.clear
          this.quiz4Clear = doc.data().subStory.quiz4.clear
          this.quiz5Clear = doc.data().subStory.quiz5.clear
          this.team = doc.data().team
          this.cautionOpen = doc.data().subStory.caution

        });

    },

     data(){
        return {
        hoge:null,
        panel: [0, 1, 2, 3],
        loading:false,
        substoryDatas:[],
        teamStatus:[],
        substoryQuiz1:[],
        substoryQuiz2:[],
        substoryQuiz3:[],
        substoryQuiz4:[],
        substoryQuiz5:[],
        quiz1Clear:null,
        quiz2Clear:null,
        quiz3Clear:null,
        quiz4Clear:null,
        quiz5Clear:null,
        question01Image: require("@/static/Substory01.jpg"),
        question02Image: require("@/static/Substory02.jpg"),
        question03Image: require("@/static/Substory03.jpg"),
        question04Image: require("@/static/Substory04.jpg"),
        question05Image: require("@/static/Substory05.jpg"),
        answerText: "",
        nowDisplayMission: null,
        submitData:{},
        testUid:"",
        cautionOpen:"",
        cautionText:"",
        }

    },
    methods:{
    uid(){
      return this.$auth.currentUser.uid
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
        console.log("uid")
      },
      closeCaution(){
        const uid = "teamXX"
        this.$firestore.doc(`Team/${uid}`).set({
          test:"first"
      })
      },
      submitQ1Text(){
      //this.request.name = this.answerText
      this.$firestore.collection('subStoryAnswer').add({
          question:this.quiz1Title,
          quizNum:1,
          answerText:this.answerText,
          submitTime:new Date().getTime()
      })
      },

      addTeam(){
        const uid = "teamXX"
        this.$firestore.doc(`Team/${uid}`).set({
          finTime:"",
          gameStart:false,
          status:0,
          startTime:"",
          limitTime:"",
          logs:[0],
          mainMission:{
            0:{
              clear:"",
              id:""
            },
            1:{
              clear:"",
              id:""
            },
            2:{
              clear:"",
              id:""
            },
            3:{
              clear:"",
              id:""
            },
            4:{
              clear:"",
              id:""
            },
            5:{
              clear:"",
              id:""
            },
            6:{
              clear:"",
              id:""
            },
            7:{
              clear:"",
              id:""
            },
            8:{
              clear:"",
              id:""
            },
            9:{
              clear:"",
              id:""
            },
            10:{
              clear:"",
              id:""
            },
            11:{
              clear:"",
              id:""
            },
            12:{
              clear:"",
              id:""
            },
            13:{
              clear:"",
              id:""
            },
            14:{
              clear:"",
              id:""
            },
            15:{
              clear:"",
              id:""
            },
            16:{
              clear:"",
              id:""
            },
            17:{
              clear:"",
              id:""
            },
            18:{
              clear:"",
              id:""
            },
            19:{
              clear:"",
              id:""
            },
            20:{
              clear:"",
              id:""
            },
            21:{
              clear:"",
              id:""
            },
            22:{
              clear:"",
              id:""
            },
            23:{
              clear:"",
              id:""
            },
            24:{
              clear:"",
              id:""
            },
            25:{
              clear:"",
              id:""
            },
            26:{
              clear:"",
              id:""
            },
            27:{
              clear:"",
              id:""
            },
            28:{
              clear:"",
              id:""
            },
            29:{
              clear:"",
              id:""
            },
          },
          nowStage:"",
          photos:{},
          point:{
            eventPoint:0,
            mainPoint:0,
            subPoint:0,
            totalPoint:0,
          },
          subStory:{
            quiz1:{
              clear:1,
              delieryTime:0,
              recentAnswer:""
            },
            quiz2:{
              clear:0,
              delieryTime:0,
              recentAnswer:""
            },
            quiz3:{
              clear:0,
              delieryTime:0,
              recentAnswer:""
            },
            quiz4:{
              clear:0,
              delieryTime:0,
              recentAnswer:""
            },
            quiz5:{
              clear:0,
              delieryTime:0,
              recentAnswer:""
            },
          }
        })
      }
    }
  }
</script>

<template>
<div>
<v-card class="mt-3 mb-3 justify-center" width="40%" tile flat>
  <h3>合計得点：{{ score }}pt</h3>
</v-card>


        <v-tabs
        v-model="tab"
        background-color="light-blue lighten-5"
        hide-slider
        >
        <v-layout justify-space-around>
            <v-tab @click="tabClick()">1階</v-tab>
            <v-tab @click="tabClick()">2階</v-tab>
            <v-tab @click="tabClick()">3階</v-tab>
            <v-tab @click="tabClick()">4階</v-tab>
        </v-layout>
        </v-tabs>

<v-tabs-items
v-model="tab">


<v-tab-item>
  <!--ビンゴカード　上ほどステージが進む -->
  <v-card color="light-blue lighten-4" flat>

  <v-container v-if="nowStage >= 1">
      <v-layout justify-center wrap width="100vw">
      <div v-for="data in stage1" :key="data.id">
      <v-card width="22vw" height="22vw" tile
      :color="cardColor[data.clear]"
      @click="displayMssionChange(data)"
      >{{ cardText[data.clear] }}</v-card>

      </div>
      </v-layout> 
  </v-container>
  </v-card>

</v-tab-item>

<v-tab-item>
    <v-card color="light-blue lighten-4" flat>
    <v-container v-if="nowStage >= 2">
      <v-layout justify-center wrap width="100vw">
      <div v-for="data in stage2" :key="data.id">
      <v-card width="30vw" height="30vw" tile
      :color="cardColor[data.clear]"
      @click="displayMssionChange(data)"
      >{{ cardText[data.clear] }}</v-card>

      </div>
      </v-layout>
  </v-container>
  <v-container v-else>
    前の階をクリアしよう！
  </v-container>
      </v-card>

</v-tab-item>

<v-tab-item>
    <v-card color="light-blue lighten-4" flat>
    <v-container v-if="nowStage >= 3">
      <v-layout justify-center wrap width="100vw">
      <div v-for="data in stage3" :key="data.id">
      <v-card width="40vw" height="40vw" tile
      :color="cardColor[data.clear]"
      @click="displayMssionChange(data)"
      >{{ cardText[data.clear] }}</v-card>

      </div>
      </v-layout>
  </v-container>
  <v-container v-else>
    前の階をクリアしよう！
  </v-container>
      </v-card>

</v-tab-item>


<v-tab-item>
  <v-card color="light-blue lighten-4" flat>
  <v-container v-if="nowStage === 4">
      <v-layout justify-center wrap width="100vw">
      <div v-for="data in stage4" :key="data.id">
      <v-card width="40vw" height="40vw" tile
      :color="cardColor[data.clear]"
      @click="displayMssionChange(data)"
      >{{ cardText[data.clear] }}</v-card>

      </div>
      </v-layout>
      </v-container>
  <v-container v-else>
    前の階をクリアしよう！
  </v-container>
    </v-card>

</v-tab-item>

</v-tabs-items>

    <v-card color="warning" class="ma-2 align-center justify-center pa-1" style="height: 10vh">
      <p>{{nowDisplayText}}</p>
    </v-card>

    <div v-show="bottonShow">
    <v-card color="green" class="ma-2 align-center justify-center pa-1">
      <p>報告方法：{{ answerTypeExplain }}</p>

    </v-card>
  <v-layout style="margin: 10px">
    <v-spacer />
  <div v-if="answerTypeExplain　=== '写真をアップロード'">
    <v-btn color="green" large>
    アップロード
    </v-btn>
  </div>
  <div v-if="answerTypeExplain　=== 'テキストを入力'">
  <v-btn color="green" large>
    入力
  </v-btn>
  </div>
  </v-layout>
    </div>


  
</div>
</template>

<script>
  export default{
    async beforeCreate(){
      await this.$firestore.collection("Mission").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.missionDatas.push(doc.data())

        })
        console.log(this.missionDatasmissionDatas)
      })
      
      const uid = this.$auth.currentUser.uid
      await this.$firestore.doc(`Team/${uid}`)
        .get()
        .then(doc=>{
          this.team = doc.data().team
          this.nowStage = doc.data().nowStage*1
          this.score = doc.data().point.totalPoint
          this.stage1Missions = doc.data().mainMission.stage1
          this.stage2Missions = doc.data().mainMission.stage2
          this.stage3Missions = doc.data().mainMission.stage3
          this.stage4Missions = doc.data().mainMission.stage4
      })

      const stage1 = await this.stage1Missions.map(missionData => {
        const mission = this.missionDatas.filter(e => e.id == missionData.id)[0]
        mission.clear = missionData.clear
        return mission
      })
      this.stage1 =  await stage1
      await console.log({stage1})

      const stage2 = await this.stage2Missions.map(missionData => {
        const mission = this.missionDatas.filter(e => e.id == missionData.id)[0]
        mission.clear = missionData.clear
        return mission
      })
      this.stage2 =  await stage2
      await console.log({stage2})

      const stage3 = await this.stage3Missions.map(missionData => {
        const mission = this.missionDatas.filter(e => e.id == missionData.id)[0]
        mission.clear = missionData.clear
        return mission
      })
      this.stage3 =  await stage3
      await console.log({stage3})

      const stage4 = await this.stage4Missions.map(missionData => {
        const mission = this.missionDatas.filter(e => e.id == missionData.id)[0]
        console.log({mission})
        mission.clear = missionData.clear
        return mission
      })
      this.stage4 =  await stage4
      await console.log({stage4})
      


    },
    data() {
      return{
        team: "",
        dialog: false,
        nowStage: null,
        tab: null,
        score: null,
        nowDisplayText: "ビンゴのマスをタップしてください！",
        answerTypeExplain:"",
        bottonShow: false,
        cardText: ["未回答","承認待ち","クリア"],
        cardColor:["white","amber lighten-4","amber accent-3"],
        missionDatas: [],
        stage1:[],
        stage2:[],
        stage3:[],
        stage4:[]


      }
    },
    computed:{
      //nowStageの数字がtabの数字より小さいとき、報告方法と報告ボタンを出さない

    },
    methods: {
      displayMssionChange(x){
        this.nowDisplayText = x.text

        if(x.answerType === "photo" ){
          this.answerTypeExplain = "写真をアップロード"
        }

        if(x.answerType === "text"){
          this.answerTypeExplain = "テキストを入力"
        }

      },

      async tabClick(){
        await console.log(this.tab)
        await console.log(this.tab)
        
        if(this.nowStage - 1 > this.tab){
          this.bottonShow = false
        }else{
          this.bottonShow = true
        }


        

      }
    }
    }
  

</script>

<style>

h2 {
  text-align: center
}

</style>
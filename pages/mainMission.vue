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
      <div v-for="el in stage1" :key="el.id">
      <v-card width="22vw" height="22vw" tile
      :color="cardColor[el.clear]"
      @click="displayMssionChange(el)"
      >{{ cardText[el.clear] }}</v-card>

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
  <div v-if="answerTypeExplain　=== 'テキストを入力して送信'">
    <v-text-field
    v-model="text4Submit"
    label="答えを入力"
    color="white"
    width="100%" />
  <v-btn color="green" large right
  @click="submitText()">
    送信
  </v-btn>
  </div>
  </v-layout>
    </div>
  
  <v-dialog v-model="dialog">
    <v-card>
      <v-container>
      <v-layout column wrap justify-center align-center>
      <h2>ビンゴ！</h2>
      <v-btn color="primary"
      center
      @click="toNext()">次の階へ進む！</v-btn>
      </v-layout>
      </v-container>
    </v-card>
  </v-dialog>


  
</div>
</template>

<script>
function bingoCheck(reveal){

const rowBingo = reveal.map(row=>row.every(n=>n));

const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
const columnBingo = transpose(reveal).map(row=>row.every(n=>n));
/*
const revealX = [reveal.map((row,i)=>row[i]),reveal.map((row,i,R)=>row[R.length-i-1])]
const xBingo = revealX.map(row=>row.every(n=>n))
*/

console.log(rowBingo,columnBingo/*,xBingo*/)
return (rowBingo.indexOf(true) >= 0  || columnBingo.indexOf(true) >= 0)

}
  export default{
    async beforeCreate(){
      await this.$firestore.collection("Mission").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.missionDatas.push(doc.data())

        })
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

      const stage1 = await this.stage1Missions.map(missionData1 => {
        const mission1 = this.missionDatas.filter(e1 => e1.id == missionData1.id)[0]
        mission1.clear = missionData1.clear
        return mission1
      })
      this.stage1 =  await stage1
      await console.log({stage1})

      const stage2 = await this.stage2Missions.map(missionData2 => {
        const mission2 = this.missionDatas.filter(e2 => e2.id == missionData2.id)[0]
        mission2.clear = missionData2.clear
        return mission2
      })
      this.stage2 =  await stage2
      await console.log({stage2})

      const stage3 = await this.stage3Missions.map(missionData3 => {
        const mission3 = this.missionDatas.filter(e3 => e3.id == missionData3.id)[0]
        mission3.clear = missionData3.clear
        return mission3
      })
      this.stage3 =  await stage3
      await console.log({stage3})

      const stage4 = await this.stage4Missions.map(missionData4 => {
        const mission4 = this.missionDatas.filter(e4 => e4.id == missionData4.id)[0]
        mission4.clear = missionData4.clear
        return mission4
      })
      this.stage4 =  await stage4
      await console.log({stage4})
      
      
      if(await this.nowStage === 1){
        const clearCheckAry = await stage1.map(mission => {
          return (mission.clear === 2)
        })
        await console.log(clearCheckAry)

        this.reveal = await [
          clearCheckAry.slice(0,4),
          clearCheckAry.slice(4,8),
          clearCheckAry.slice(8,12),
          clearCheckAry.slice(12,16)
        ]
        await console.log(this.reveal)
        this.cleared = await bingoCheck(this.reveal)
      }
      if(await this.nowStage === 2){
          const clearCheckAry = await stage2.map(mission => {
          return (mission.clear === 2)
        })
        await console.log(clearCheckAry)
        this.reveal = await [
          clearCheckAry.slice(0,3),
          clearCheckAry.slice(3,6),
          clearCheckAry.slice(6,9)
          ]
        this.cleared = await bingoCheck(this.reveal)
      }
      if(await this.nowStage === 3){
          const clearCheckAry = await stage3.map(mission => {
          return (mission.clear === 2)
        })
        await console.log(clearCheckAry)
        this.reveal = await [
          clearCheckAry.slice(0,2),
          clearCheckAry.slice(2,4)
          ]
        this.cleared = await bingoCheck(this.reveal)
      }
      if(await this.nowStage === 4){
          const clearCheckAry = await stage4.map(mission => {
          return (mission.clear === 2)
        })
        await console.log(clearCheckAry)
        this.reveal = await clearCheckAry
        this.cleared = await clearCheckAry[0]
      }
      
      await console.log({cleared:this.cleared})

      if(await this.cleared === true){
        this.dialog =  await true
        await this.$firestore.doc(`Team/${uid}`).update({nowStage: this.nowStage + 1})
      }

      this.tab = await this.nowStage - 1
      
    },
    data() {
      return{
        team: "",
        dialog: false,
        nowStage: null,
        tab: null,
        score: null,
        nowDisplayMission: null,
        nowDisplayText: "ビンゴのマスをタップしてください！",
        answerTypeExplain:"",
        bottonShow: true,
        cardText: ["未回答","承認待ち","クリア"],
        cardColor:["white","amber lighten-4","amber accent-3"],
        missionDatas: [],
        stage1:[],
        stage2:[],
        stage3:[],
        stage4:[],
        reveal:[],
        text4Submit: "",
        cleared: false


      }
    },
    computed:{

    },
    methods: {
      displayMssionChange(x){
        this.nowDisplayMission = x
        this.nowDisplayText = x.text

        console.log(this.nowDisplayMission)

        if(x.answerType === "photo" ){
          this.answerTypeExplain = "写真をアップロード"
        }

        if(x.answerType === "text"){
          this.answerTypeExplain = "テキストを入力して送信"
        }
      
      },
      async toNext(){
        this.nowStage = await this.nowStage  + 1
        this.dialog = await false
        this.tab = await this.nowStage  - 1
      },

      async tabClick(){
        await console.log(this.tab)
        await console.log(this.tab)
        
        if(this.nowStage - 1 > this.tab){
          this.bottonShow = false
        }else{
          this.bottonShow = true
        }

      },
      async submitText(){
        const submitData = await this.nowDisplayMission
        submitData.answer = await this.text4Submit
        submitData.team = await this.team
        submitData.uid = await this.$auth.currentUser.uid
        submitData.key = await new Date().getTime()
        await this.$firestore.collection("mainMissionAnswer").add(submitData)
        /*承認待ちにする
        await this.$firestore.doc(`Team/${this.$auth.currentUser.uid}`)
        .update() */

      }
    }
    }
  

</script>

<style>

h2 {
  text-align: center
}

</style>
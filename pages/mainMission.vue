<template>
<div>
<v-container>
  <v-layout>
    <v-spacer />
  <h2 style="text-align: right">得点：{{ score }}pt</h2>
  </v-layout>
</v-container>



        <v-tabs
        v-model="tab"
        background-color="light-blue lighten-5"
        hide-slider
        >
        <v-layout justify-space-around>
            <v-tab @click="tabClick()"><h3>1F</h3></v-tab>
            <v-tab @click="tabClick()"><h3>2F</h3></v-tab>
            <v-tab @click="tabClick()"><h3>3F</h3></v-tab>
            <v-tab @click="tabClick()"><h3>4F</h3></v-tab>
        </v-layout>
        </v-tabs>

<v-tabs-items
v-model="tab">


<v-tab-item>
  <v-card color="light-blue lighten-4" flat>

  <v-container v-if="nowStage >= 1">
      <v-layout justify-center wrap width="100vw">
      <div v-for="(el,num) in stage1" :key="el.id">
      <v-card width="22vw" height="22vw" tile
      :color="cardColor[el.clear]"
      @click="displayMssionChange(el)"
      style="text-align: center"
      >
      <div v-if="cardText[el.clear]">
      <br>{{ cardText[el.clear] }}</div>
      <div v-else><br>{{num + 1}}</div></v-card>

      </div>
      </v-layout>
  </v-container>
  </v-card>

</v-tab-item>

<v-tab-item>
    <v-card color="light-blue lighten-4" flat>
    <v-container v-if="nowStage >= 2">
      <v-layout justify-center wrap width="100vw">
      <div v-for="(data,num) in stage2" :key="data.id">
      <v-card width="30vw" height="30vw" tile
      :color="cardColor[data.clear]"
      @click="displayMssionChange(data)"
      style="text-align: center"
      >
      <div v-if="cardText[data.clear]">
      <br>{{ cardText[data.clear] }}</div>
      <div v-else><br><br>{{num + 1}}</div></v-card>

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
      <div v-for="(data,num) in stage3" :key="data.id">
      <v-card width="45vw" height="45vw" tile
      :color="cardColor[data.clear]"
      @click="displayMssionChange(data)"
      style="text-align: center"
      >
      <div v-if="cardText[data.clear]">
      <br>{{ cardText[data.clear] }}</div>
      <div v-else><br><br><br>{{num + 1}}</div></v-card>

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
  <v-container v-if="nowStage === 4 || nowStage === 5">
      <v-layout justify-center wrap width="100vw">
      <div v-for="data in stage4" :key="data.id">
      <v-card width="50vw" height="50vw" tile
      :color="cardColor[data.clear]"
      @click="displayMssionChange(data)"
      style="text-align: center"
      >
      <div v-if="cardText[data.clear]">
      <br>{{ cardText[data.clear] }}</div>
      <div v-else><br><br><br>最終ミッション！</div></v-card>

      </div>
      </v-layout>
      </v-container>
  <v-container v-else>
    前の階をクリアしよう！
  </v-container>
    </v-card>

</v-tab-item>

</v-tabs-items>

    <v-card color="amber lighten-3" class="ma-2 align-center justify-center pa-1" style="height: 20vh"
    @click="photoDialog=true">
      <p>{{nowDisplayText}}</p>
    </v-card>

  <div v-if="nowStage <= 3">
    <div v-if="nowDisplayMission.photoUrl">
      <v-dialog v-model="photoDialog">
    <v-card>
      <v-container>
      <v-layout column wrap justify-center align-center>
      ミッション画像
        <v-img class="mb-3" :src="nowDisplayMission.photoUrl" />
        <v-btn @click="photoDialog=false" color="primary">戻る</v-btn>
      </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
    </div>
  </div>
  <div v-if="nowStage >= 4 && tab ===3">
    <v-dialog v-model="photoDialog">
      <v-card>
      <v-container>
      <v-layout column wrap justify-center align-center>
      <v-carousel class="mb-3">
    <v-carousel-item v-for="(item,i) in photoPreviedWhenBingo" :src="item" :key="i"></v-carousel-item>
  </v-carousel>
        <v-btn @click="photoDialog=false" color="primary">戻る</v-btn>
      </v-layout>
      </v-container>
    </v-card>
    </v-dialog>
  </div>

    <div v-show="bottonShow">
    <v-card color="amber lighten-1" class="ma-2 align-center justify-center pa-1">
      <p>報告方法：{{ answerTypeExplain }}</p>

    </v-card>
  <v-layout style="margin: 10px">
  <div v-if="answerTypeExplain　=== '写真をアップロード'">
    <upload-btn
                :fileChangedCallback="uploadFile()"
                color="deep-orange darken-4"
                title="写真を選択"
                class="mb-3"
              ></upload-btn>{{confirmText}}
  <div>
<v-btn
                color="primary"
                :disabled="!baseImg"
                @click="sendToFirestorage()"
                :loading="loading"
              >アップロード</v-btn>
  </div>
  </div>
  <div v-if="answerTypeExplain　=== 'テキストを入力して送信'">
    <v-text-field
    v-model="text4Submit"
    label="答えを入力"
    color="white"
    width="100%" />
  <v-btn color="green" large right
  :disabled="!text4Submit"
  :loading="loading"
  @click="submitText()">
    送信
  </v-btn>
  {{this.confirmText}}
  </div>
  </v-layout>
    </div>

  <v-dialog v-model="dialog">
    <v-card>
      <v-container>
      <v-layout column wrap justify-center align-center>
      <h2>ビンゴ！</h2>
      <v-img class="mb-3" :src="photoPreviedWhenBingo[nowStage - 1]"/>
      <v-btn color="primary"
      center
      large
      @click="toNext()">次の階へ進む！</v-btn>
      </v-layout>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog v-model="last">
    <v-card>
    <v-container>
        <p>次の場所に宝箱はあります</p>
        <p>・【なんば駅】 が最寄りです！</p>
        <p>・【アートパーク】 と呼ばれています！</p>
        <p>・【シカゴギャラリー】 とも呼ばれています！</p>
        <p>※サポートスタッフがいますので安心してください。</p>
        <v-img src="https://drive.google.com/uc?export=view&id=1KR-k-R8-JW-qxo5puSk7ZMBKcpgS9U8t" />
    </v-container>    
    </v-card>
  </v-dialog>




</div>
</template>

<script>
import UploadBtn from "@/components/UploadBtn";
import { async } from 'q';

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
          this.score = doc.data().point.mainPoint
          this.missionStatus = doc.data().mainMission
          this.stage1Missions = this.missionStatus.slice(0,16)
          this.stage2Missions = this.missionStatus.slice(16,25)
          this.stage3Missions = this.missionStatus.slice(25,29)
          this.stage4Missions = this.missionStatus.slice(29,30)
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
        this.bottonShow = await false
        await this.$firestore.doc(`Team/${uid}`).update({nowStage: this.nowStage + 1})
      }

      this.tab = await this.nowStage - 1

      if(this.nowStage === 5){
        this.last = true
      }

    },
    components: { UploadBtn },
    data() {
      return{
        loading:false,
        team: "",
        dialog: false,
        photoDialog: false,
        last: false,
        nowStage: null,
        tab: null,
        score: null,
        nowDisplayMission: {},
        nowDisplayText: "ビンゴのマスをタップしてください！",
        answerTypeExplain:"",
        bottonShow: true,
        cardText: [false,"Check","Clear","Retry"],
        cardColor:["white","amber lighten-4","amber accent-3","deep-purple lighten-3"],
        missionDatas: [],
        missionStatus: [],
        stage1:[],
        stage2:[],
        stage3:[],
        stage4:[],
        reveal:[],
        text4Submit: "",
        cleared: false,
        basePixelMax: "",
        baseImg: "",
        confirmText: "",
        url:"",
        photoPreviedWhenBingo:
        ["https://drive.google.com/uc?export=view&id=13jM6q1xFU_cYd7zNnzFtXwpyKnYmaSVO",
        "https://drive.google.com/uc?export=view&id=1ykeObc5uNRc8ronqEW-J7KVIffksdFXi",
        "https://drive.google.com/uc?export=view&id=1DgD2MIYA1NsxWXqkKqFTejT0niGoXjSB"
        ]



      }
    },
    computed:{

    },
    methods: {
      displayMssionChange(x){
        this.confirmText = ""
        this.baseImg = ""
        this.text4Submit = ""
        this.nowDisplayMission = x
        this.nowDisplayText = x.text

        console.log(this.nowDisplayMission)

        //クリアしていたら回答ボタンを表示しない
        if(this.nowDisplayMission.clear === 2){
          this.bottonShow = false
        }else{
          if(this.nowStage - 1 > this.tab){
            this.bottonShow = false
          }else{
          this.bottonShow = true
          }
        }

        if(this.cleared === true){
          this.bottonShow = false
        }

        if(x.answerType === "photo" ){
          this.answerTypeExplain = "写真をアップロード"
        }

        if(x.answerType === "text"){
          this.answerTypeExplain = "テキストを入力して送信"
        }
        console.log(this.nowDisplayMission.id)

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
        this.loading = await true
        const submitData = await this.nowDisplayMission
        submitData.answer = await this.text4Submit
        submitData.team = await this.team
        submitData.uid = await this.$auth.currentUser.uid
        submitData.nowStage = await this.nowStage
        submitData.key = await new Date().getTime()
        const renewedStatus = await this.missionStatus
        const firestore = await this.$firestore
        await firestore.collection("mainMissionAnswer").add(submitData)

        const renew = await renewedStatus.map(eachStatus => {
          if(eachStatus.id === submitData.id){
            return {id: eachStatus.id, clear: 1}
          }else{
            return eachStatus
          }
        })
        await firestore.doc(`Team/${submitData.uid}`).update({mainMission: renew})

        await console.log("done") 
        this.confirmText = await "送信完了！"
        this.loading = await false
        this.text4Submit = await ""
        

      },
      uploadFile() {
      return async file => {
        if (!file) {
          return;
        }

        const reader = new FileReader();
        reader.onload = ({ target: { result } }) => {
          const image = new Image();
          image.src = result;
          image.onload = () => {
            // resize
            const { naturalWidth, naturalHeight } = image;
            console.log({ naturalWidth, naturalHeight });
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = naturalWidth;
            canvas.height = naturalHeight;
            ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight);
            result = canvas.toDataURL();
            this.baseImg = result;
            console.log({ uploaded: result });
          };
        };
        reader.readAsDataURL(file);
        this.confirmText = "選択OK！"
      };
    },
    async sendToFirestorage(){
      this.loading = await true
      const pathTime = await new Date().getTime().toString()
      const ref = await this.$storage.ref().child(pathTime)
      const imageDataUrl = await this.baseImg
            console.log({imageDataUrl})
      const submitData =  await this.nowDisplayMission
      submitData.team =  await this.team
      submitData.uid =  await this.$auth.currentUser.uid
      submitData.nowStage = await this.nowStage
      const firestore = await this.$firestore
      const renewedStatus = await this.missionStatus


      await ref.putString(imageDataUrl, 'data_url').then(function(snapshot) {
  console.log('Uploaded a data_url string!');
}).catch(err=>{
            console.log(err)
            this.errText = err.message
            this.confirmText = "アップロード失敗…"
          })
          .finally(()=>{
            this.confirmText = "アップロード完了！"
            this.loading = false;
          })
      await ref.getDownloadURL().then(async function(url) {
        await console.log({url})

        submitData.answer =  url
        submitData.key =  new Date().getTime()
        await firestore.collection("mainMissionAnswer").add(submitData)

  })

        const renew = await renewedStatus.map(eachStatus => {
          if(eachStatus.id === submitData.id){
            return {id: eachStatus.id, clear: 1}
          }else{
            return eachStatus
          }
        })
        await firestore.doc(`Team/${submitData.uid}`).update({mainMission: renew})

        await console.log("done") 
        this.baseImg = await ""

    }
    }
    }


</script>

<style>

h2 {
  text-align: center
}

</style>
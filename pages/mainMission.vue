<template>
<div>
<v-card class="mt-3 mb-3 justify-center" width="40%" tile flat>
  <h3>合計得点：100pt</h3>
</v-card>


        <v-tabs
        v-model="tab"
        background-color="light-blue lighten-5"
        hide-slider
        >
        <v-layout justify-space-around>
            <v-tab>1階</v-tab>
            <v-tab>2階</v-tab>
            <v-tab>3階</v-tab>
            <v-tab>4階</v-tab>
        </v-layout>
        </v-tabs>

<v-tabs-items
v-model="tab">


<v-tab-item>
  <!--ビンゴカード　上ほどステージが進む -->
  <v-card color="light-blue lighten-4" flat>

  <v-container v-if="nowStage >= 1">
      <v-layout justify-center wrap width="100vw">
      <v-card width="22vw" height="22vw" tile>1</v-card>
      <v-card width="22vw" height="22vw" tile>2</v-card>
      <v-card width="22vw" height="22vw" tile>3</v-card>
      <v-card width="22vw" height="22vw" tile>4</v-card>
      
      <v-card width="22vw" height="22vw" tile>5</v-card>
      <v-card width="22vw" height="22vw" tile>6</v-card>
      <v-card width="22vw" height="22vw" tile>7</v-card>
      <v-card width="22vw" height="22vw" tile>8</v-card>

      <v-card width="22vw" height="22vw" tile>9</v-card>
      <v-card width="22vw" height="22vw" tile>10</v-card>
      <v-card width="22vw" height="22vw" tile>11</v-card>
      <v-card width="22vw" height="22vw" tile>12</v-card>

      <v-card width="22vw" height="22vw" tile>13</v-card>
      <v-card width="22vw" height="22vw" tile>14</v-card>
      <v-card width="22vw" height="22vw" tile>15</v-card>
      <v-card width="22vw" height="22vw" tile>16</v-card>
      
      </v-layout> 
  </v-container>
  </v-card>

</v-tab-item>

<v-tab-item>
    <v-card color="light-blue lighten-4" flat>
    <v-container v-if="nowStage >= 2">
      <v-layout justify-center wrap width="100vw">
      <v-card width="30vw" height="30vw" tile>1</v-card>
      <v-card width="30vw" height="30vw" tile>2</v-card>
      
      <v-card width="30vw" height="30vw" tile>3</v-card>
      <v-card width="30vw" height="30vw" tile>4</v-card>
      <v-card width="30vw" height="30vw" tile>5</v-card>
      <v-card width="30vw" height="30vw" tile>6</v-card>
      
      <v-card width="30vw" height="30vw" tile>7</v-card>
      <v-card width="30vw" height="30vw" tile>8</v-card>
      <v-card width="30vw" height="30vw" tile>9</v-card>
      </v-layout>
  </v-container>
  <v-container v-else>
    まだだよ
  </v-container>
      </v-card>

</v-tab-item>

<v-tab-item>
<!--  <v-card color="light-blue lighten-4" flat>
  <v-container v-if="nowStage >= 3">
      <v-layout justify-center wrap width="100vw">
      <v-card
      width="40vw" height="40vw"
      tile
      @click="displayMssionChange(1)"
      :color="missionDatas[0].status"
      >1
        <p v-if="missionDatas[0].status=='yellow'">クリア</p>
        <p v-if="missionDatas[0].status=='grey'">承認待ち</p>
      </v-card>
      <v-card
      width="40vw" height="40vw"
      tile
      @click="displayMssionChange(2)"
      :color="missionDatas[1].status"
      >2
        <p v-if="missionDatas[1].status=='yellow'">クリア</p>
        <p v-if="missionDatas[1].status=='grey'">承認待ち</p>
      </v-card>
      
      <v-card width="40vw" height="40vw" tile>3</v-card>
      <v-card width="40vw" height="40vw" tile>4</v-card>
      </v-layout>
  </v-container>
  <v-container v-else>
    まだだよ
  </v-container>
      </v-card>-->

</v-tab-item>


<v-tab-item>
  <v-card color="light-blue lighten-4" flat>
  <v-container v-if="nowStage === 4">
      <v-layout justify-center wrap width="100vw">
      <v-card width="50vw" height="50vw" tile>1</v-card>

      </v-layout>
      </v-container>
  <v-container v-else>
    まだだよ
  </v-container>
    </v-card>

</v-tab-item>

</v-tabs-items>

    <v-card color="warning" class="ma-2 align-center justify-center pa-1" style="height: 10vh">
      <p>{{nowDisplayText}}</p>
    </v-card>

  <v-dialog v-model="dialog">
    <v-card>
    ここに回答ボタンを設置
    </v-card>
    </v-dialog>
  
    <v-card color="green" class="ma-2 align-center justify-center pa-1">
      <p>報告方法：画像をアップロードしてください</p>

    </v-card>
  <v-layout style="margin: 10px">
    <v-spacer />
  <v-btn color="green">
    報告
  </v-btn>
  </v-layout>


  
</div>
</template>

<script>
  export default{
    beforeCreate(){
      this.$firestore.collection("Mission").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.missionDatas.push(doc.data())
      console.log(this.missionDatas)

      

        })
      })
      console.log("aaa")
    },
    data() {
      return{
        dialog: false,
        nowStage: 3,
        tab: null,
        displayMission: 1,
        nowDisplayText: "aaa",
        missionDatas: [],
        stage1Missions:[],
        stage2Missions:[],
        stage3Missions:[],
        stage4Missions:[]


      }
    },
    methods: {
      displayMssionChange(x){
        this.nowDisplayText = this.missionDatas[x - 1].text
        console.log(this.nowDisplayText)
      }
    }
    }
  

</script>

<style>

h2 {
  text-align: center
}

</style>
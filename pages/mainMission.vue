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
  <v-card color="light-blue lighten-4" flat>
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
      </v-card>

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
    data() {
      return{
        dialog: false,
        nowStage: 3,
        tab: null,
        displayMission: 1,
        nowDisplayText: "aaa",
        missionDatas: [
          {
            id: 1,
            title: "mission1",
            text: "犬の写真をとる！",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1, // num
            status: "grey"
          },{
            id: 2,
            title: "mission2",
            text: "千成ひょうたんの写真をとる！",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1, // num
            status: "yellow"
          },{
            id: 3,
            title: "mission3",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1, // num
            status: ""
          },{
            id: 4,
            title: "mission4",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 5,
            title: "mission5",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 6,
            title: "mission6",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 7,
            title: "mission7",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 8,
            title: "mission8",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 9,
            title: "mission9",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 10,
            title: "mission10",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 11,
            title: "mission11",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 12,
            title: "mission12",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 13,
            title: "mission13",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 14,
            title: "mission14",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 15,
            title: "mission15",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 16,
            title: "mission16",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          }
        ]

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
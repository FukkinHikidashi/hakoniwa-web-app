<template>
<div>
  <h2>メインミッション</h2>


  <!--ビンゴカード　上ほどステージが進む -->
  <v-container v-if="nowStage === 4">
    {{missionDatas[0].text}}
  </v-container>

  <v-container v-if="nowStage === 3">
      <v-layout justify-center wrap width="100vw">
      <v-card width="20vh" height="20vh" tile>1</v-card>
      <v-card width="20vh" height="20vh" tile>2</v-card>

      <v-card width="20vh" height="20vh" tile>3</v-card>
      <v-card width="20vh" height="20vh" tile>4</v-card>
      </v-layout>
  </v-container>

  <v-container v-if="nowStage === 2">
    bbb
  </v-container>

  <v-container v-if="nowStage === 1">
    ccc
  </v-container>

  <v-container>
    <v-card color="warning" class="ma-2 align-center justify-center" style="height: 10vh"
    @click="dialog = true">
      <p>ここにミッションの内容を表示</p>
    <v-layout>
  </v-layout>
    </v-card>
  </v-container>

  <v-dialog v-model="dialog">
    <v-card>
    ここに回答ボタンを設置
    </v-card>
    </v-dialog>


  
</div>
</template>

<script>
  export default{
    data() {
      return{
        dialog: false,
        nowStage: 3,
        missionDatas: [
          {
            id: 1,
            title: "mission1",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 2,
            title: "mission2",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
          },{
            id: 3,
            title: "mission3",
            text: "ここに問題文",
            photoUrl: "https://app-senbonknock.com/wp-content/uploads/2019/05/icon.png",
            answerType: "text", // ["text", "photo"]
            missionType: "eachPoint", // ["eachPoint", "everywhere", "quiz"]
            difficulty: 1 // num
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
    }
    }
  

</script>

<style>

h2 {
  text-align: center
}

</style>
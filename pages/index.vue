<template>
<div>

<v-btn>
  ストーリー
</v-btn>

<v-btn style="margin-right: 5vw">
  遊び方
</v-btn>

<v-btn>総得点：100点</v-btn>

<v-container class="mt-5">
  <h3>メインミッション</h3>
  <v-card class="mb-5" to="/mainMission/">
    <v-layout>
    <v-flex xs5>
      <v-img src="https://images.unsplash.com/photo-1560013764-b45ee3b3d786?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
      aspect-ratio="1" />
    </v-flex>
    <v-flex xs7>
    aaa
    </v-flex>
    </v-layout>
  </v-card>

  <h3>サブストーリー</h3>
  <v-card class="mb-5"  to="/subMission/">
    <v-layout>
    <v-flex xs5>
      <v-img src="https://images.unsplash.com/photo-1549315311-697952be6cce?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
      aspect-ratio="1" />
    </v-flex>
    <v-flex xs7>
    bbb
    </v-flex>
    </v-layout>
  </v-card>

  <h3>イベント</h3>
  <v-card class="mb-5">
    <v-layout>
    <v-flex xs5>
      <v-img src="https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
      aspect-ratio="1" />
    </v-flex>
    <v-flex xs7>
    ccc
    </v-flex>
    </v-layout>
  </v-card>
</v-container>
</div>
</template>

<script>
export default {

}
</script>

<style>

.point {
  text-align: right;

}
</style>

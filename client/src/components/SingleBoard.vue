<template>
  <v-card>
    <v-card-media
      height="200px"
      :src="board.background"
    ></v-card-media>
    <v-card-title primary-title>
      <div class="headline">{{board.name}}</div>
    </v-card-title>
    <v-card-actions>
      <v-btn color="primary" :to="{ name: 'board', params: { id: board._id } }">Go</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['board'],
};
</script>


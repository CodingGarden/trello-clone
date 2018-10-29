<template>
  <v-layout justify-content align-center>
    <h3>{{user.displayName}}</h3>
    <v-avatar
      :size="40"
      color="grey lighten-4"
    >
      <img :src="user.imageUrl" alt="avatar">
      <div class="></div>
    </v-avatar>
  </v-layout>
</template>

<script>
export default {
  props: ['user'],
};
</script>


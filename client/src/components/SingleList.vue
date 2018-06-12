<template>
  <v-card
    @dragover="setDroppingList($event, list)"
    :class="{
      'green lighten-4': droppingList == list
    }">
    <v-card-title primary-title>
      <v-layout column>
        <v-flex xs12>
          <div class="headline">{{list.name}}</div>
        </v-flex>
        <v-flex xs12
          v-if="cardsByListId[list._id]"
          v-for="card in cardsByListId[list._id]"
          :key="card._id"
          class="pa-1">
          <v-card draggable="true" @dragstart="startDraggingCard(card)" @dragend="dropCard()">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs12>
                  <div>
                    <div class="headline">{{card.title}}</div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions>
      <create-card
        :user="user"
        :createActivity="createActivity"
        :listId="list._id"
        :boardId="$route.params.id">
      </create-card>
    </v-card-actions>
  </v-card>
</template>

<script>
import CreateCard from '@/components/CreateCard';

export default {
  props: [
    'list',
    'setDroppingList',
    'droppingList',
    'cardsByListId',
    'startDraggingCard',
    'dropCard',
    'createActivity',
    'user',
  ],
  components: {
    CreateCard,
  },
};
</script>

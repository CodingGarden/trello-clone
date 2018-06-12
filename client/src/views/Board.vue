<template>
  <v-container fluid>
      <v-layout>
        <v-flex xs10>
          <v-layout row wrap>
            <v-flex xs12 v-if="boardsError">
              <v-alert :value="boardsError" type="error">
                {{boardsError.message}}
              </v-alert>
            </v-flex>
            <v-progress-circular
              v-if="loadingBoard || loadingLists"
              :size="70"
              :width="7"
              indeterminate
              color="primary">
            </v-progress-circular>
            <v-flex xs12 v-if="!boardsError">
              <v-layout row wrap>
                <v-flex xs12>
                  <h2 v-if="board">{{board.name}}</h2>
                </v-flex>
                <v-flex v-if="!loadingLists" sm3 v-for="list in lists" :key="list._id" pa-2>
                  <single-list
                    :list="list"
                    :setDroppingList="onSetDroppingList"
                    :droppingList="droppingList"
                    :cardsByListId="cardsByListId"
                    :startDraggingCard="startDraggingCard"
                    :dropCard="dropCard"
                    :createActivity="createActivity"
                    :user="user ? user.user : {}"
                  ></single-list>
                </v-flex>
                <new-list-form
                  :creatingList="creatingList"
                  :createList="createList"
                ></new-list-form>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs2>
          <activities :activitiesByDate="activitiesByDate"></activities>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import Activities from '@/components/Activities';
import SingleList from '@/components/SingleList';
import NewListForm from '@/components/NewListForm';

export default {
  name: 'board',
  components: {
    Activities,
    SingleList,
    NewListForm,
  },
  data: () => ({
    activitiesOpen: true,
    board: {},
  }),
  mounted() {
    this.getBoard(this.$route.params.id);

    this.findLists({
      query: {
        boardId: this.$route.params.id,
      },
    });

    this.findCards({
      query: {
        boardId: this.$route.params.id,
      },
    });

    this.findActivities({
      query: {
        boardId: this.$route.params.id,
      },
    });
  },
  methods: {
    ...mapMutations('board', ['setDroppingList', 'setDraggingCard']),
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    ...mapActions('cards', { findCards: 'find' }),
    ...mapActions('activities', { findActivities: 'find' }),
    async createList(list) {
      const { List } = this.$FeathersVuex;
      list.boardId = this.$route.params.id;
      const newList = new List(list);
      await newList.save();
      await this.createActivity(`**${this.user.user.displayName}** created list **${list.name}**`);
    },
    async createActivity(text) {
      const { Activity } = this.$FeathersVuex;
      const activity = new Activity();
      activity.text = text;
      activity.boardId = this.$route.params.id;
      activity.userId = this.user.userId;
      await activity.save();
    },
    startDraggingCard(card) {
      console.log('started dragging...', card);
      this.setDraggingCard(card);
    },
    onSetDroppingList(event, list) {
      event.preventDefault();
      this.setDroppingList(list);
    },
    async dropCard() {
      if (this.droppingList) {
        if (this.draggingCard.listId !== this.droppingList._id) {
          const fromList = this.lists.find(list => list._id === this.draggingCard.listId);
          const toList = this.lists.find(list => list._id === this.droppingList._id);
          this.draggingCard.listId = this.droppingList._id;
          await this.draggingCard.save();
          this.createActivity(`**${this.user.user.displayName}** moved card **${this.draggingCard.title}** from **${fromList.name}** to **${toList.name}**`);
        }
      }
      this.setDroppingList(null);
      this.setDraggingCard(null);
    },
  },
  computed: {
    ...mapState('board', ['droppingList', 'draggingCard']),
    ...mapState('auth', { user: 'payload' }),
    ...mapState('boards', {
      loadingBoard: 'isGetPending',
      boardsError: 'errorOnGet',
    }),
    ...mapState('lists', {
      loadingLists: 'isFindPending',
      creatingList: 'isCreatePending',
      listsError: 'errorOnfind',
    }),
    ...mapState('cards', {
      cardsError: 'errorOnfind',
    }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    ...mapGetters('activities', { findActivitiesInStore: 'find' }),
    activities() {
      return this.findActivitiesInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
    cards() {
      return this.findCardsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || [];
        byId[card.listId].push(card);
        return byId;
      }, {});
    },
    activitiesByDate() {
      return this.activities.slice().reverse();
    },
  },
};
</script>

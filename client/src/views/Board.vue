<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center wrap>
        <v-progress-circular
          v-if="loadingBoard || loadingLists"
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-circular>
        <v-flex xs12>
          <h2 v-if="board">{{board.name}}</h2>
        </v-flex>
        <v-flex v-if="!loadingLists" sm3 v-for="list in lists" :key="list._id" pa-2>
          <v-card>
            <v-card-title primary-title>
              <div class="headline">{{list.name}}</div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex sm3 pa-2>
          <v-card>
            <v-card-title primary-title style="flex-direction: column;">
              <div class="headline">Create List</div>
              <div>
                <v-form
                  v-if="!creatingList"
                  v-model="validList"
                  @submit.prevent="createList"
                  @keydown.prevent.enter>
                  <v-text-field
                    v-model="list.name"
                    :rules="notEmptyRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-btn type="submit" :disabled="!validList">Create list</v-btn>
                </v-form>
                <v-progress-circular
                  v-if="creatingList"
                  :size="70"
                  :width="7"
                  indeterminate
                  color="primary">
                </v-progress-circular>                
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'board',
  data: () => ({
    board: {},
    validList: false,
    list: {
      name: '',
      order: 0,
      archived: false,
    },
    notEmptyRules: [(value) => !!value || 'Cannot be empty.'],
  }),
  mounted() {    
    this.getBoard(this.$route.params.id)
      .then(response => {
        this.board = response.data || response;
      });

    this.findLists({
      query: {
        boardId: this.$route.params.id
      }
    }).then(response => {
        const lists = response.data || response;
      });
  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' } ),
    ...mapActions('lists', { findLists: 'find' } ),
    createList() {
      if (this.validList) {        
        const { List } = this.$FeathersVuex;
        this.list.boardId = this.$route.params.id;
        const list = new List(this.list);
        list.save();
        this.list = {
          name: '',
          order: 0,
          archived: false,
        }
      }
    },
  },
  computed: {
    ...mapState('boards', {
      loadingBoard: 'isGetPending',
    }),
    ...mapState('lists', {
      loadingLists: 'isFindPending',
      creatingList: 'isCreatePending',
    }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        }
      }).data;
    }
  },
};
</script>

<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center wrap>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-circular>
        <v-flex v-if="!loading" sm3 v-for="board in boards" :key="board._id" pa-2>
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
        </v-flex>
        <v-flex sm3 pa-2>
          <v-card>
            <v-card-title primary-title style="flex-direction: column;">
              <div class="headline">Create Board</div>
              <div>
                <v-form
                  v-if="!creating"
                  v-model="valid"
                  @submit.prevent="createBoard"
                  @keydown.prevent.enter>
                  <v-text-field
                    v-model="board.name"
                    :rules="notEmptyRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="board.background"
                    :rules="notEmptyRules"
                    label="Background"
                    required
                  ></v-text-field>
                  <v-btn type="submit" :disabled="!valid">Create</v-btn>
                </v-form>
                <v-progress-circular
                  v-if="creating"
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
  name: 'boards',
  data: () => ({
    valid: false,
    board: {
      name: '',
      background: '',
    },
    notEmptyRules: [(value) => !!value || 'Cannot be empty.'],
  }),
  mounted() {
    this.findBoards({ query: {} })
      .then(response => {
        const boards = response.data || response;
      });
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' } ),
    createBoard() {
      if (this.valid) {
        const { Board } = this.$FeathersVuex;
        const board = new Board(this.board);
        board.save();
        this.board = {
          name: '',
          background: '',
        }
      }
    },
  },
  computed: {
    ...mapState('boards', {
      loading: 'isFindPending',
      creating: 'isCreatePending',
    }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards () {
      return this.findBoardsInStore({ query: {} }).data
    }
  },
};
</script>

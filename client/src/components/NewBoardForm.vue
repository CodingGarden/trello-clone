<template>
  <v-flex sm3 pa-2>
    <v-card>
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create Board</div>
        <div>
          <v-form
            v-if="!creating"
            v-model="valid"
            @submit.prevent="onCreateBoard"
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
</template>

<script>
import { notEmptyRules } from '@/validators';

export default {
  props: ['creating', 'createBoard'],
  data: () => ({
    valid: false,
    board: {
      name: '',
      background: '',
    },
    notEmptyRules,
  }),
  methods: {
    async onCreateBoard() {
      if (this.valid) {
        await this.createBoard(this.board);
        this.board = {
          name: '',
          background: '',
        };
      }
    },
  },
};
</script>


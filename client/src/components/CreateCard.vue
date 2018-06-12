<template>
  <v-flex sm12 pa-2>
    <v-card>
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create Card</div>
        <div>
          <v-form
            v-if="!creatingCard"
            v-model="validCard"
            @submit.prevent="createCard"
            @keydown.prevent.enter>
            <v-text-field
              v-model="card.title"
              :rules="notEmptyRules"
              label="Title"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!validCard">Create Card</v-btn>
          </v-form>
          <v-progress-circular
            v-if="creatingCard"
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
  name: 'create-card',
  props: ['listId', 'boardId', 'createActivity', 'user'],
  data: () => ({
    creatingCard: false,
    validCard: false,
    card: {
      title: '',
      members: [],
    },
    notEmptyRules,
  }),
  methods: {
    async createCard() {
      if (this.validCard) {
        const { Card } = this.$FeathersVuex;
        this.card.boardId = this.boardId;
        this.card.listId = this.listId;
        const card = new Card(this.card);
        this.creatingCard = true;
        await card.save();
        this.creatingCard = false;
        this.card = {
          title: '',
          members: [],
        };
        this.createActivity(`**${this.user.displayName}** created card **${card.title}**`);
      }
    },
  },
};
</script>

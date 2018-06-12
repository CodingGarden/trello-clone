<template>
  <v-flex sm3 pa-2>
    <v-card>
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create List</div>
        <div>
          <v-form
            v-if="!creatingList"
            v-model="validList"
            @submit.prevent="onCreateList"
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
</template>

<script>
import { notEmptyRules } from '@/validators';

export default {
  props: ['creatingList', 'createList'],
  data: () => ({
    validList: false,
    list: {
      name: '',
      order: 0,
      archived: false,
    },
    notEmptyRules,
  }),
  methods: {
    async onCreateList() {
      if (this.validList) {
        await this.createList(this.list);
        this.list = {
          name: '',
          order: 0,
          archived: false,
        };
      }
    },
  },
};
</script>

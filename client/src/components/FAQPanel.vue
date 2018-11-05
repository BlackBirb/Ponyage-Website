<template>
  <v-expansion-panel popout focusable>
    <v-expansion-panel-content v-for="q of questions" :key="q.id" class="card-bg">
      <div slot="header">{{ q.question }}</div>
      <v-card v-if="q.image" class="card-bg px-3">
        <v-layout wrap>
          <v-flex xs8 mb-2>
            {{ q.answer }}
          </v-flex>
          <v-flex xs4>
            <img class="fix-image" :src="q.image" :alt="q.id">
          </v-flex>
        </v-layout>
      </v-card>
      <v-card v-else class="card-bg px-3 pb-2">
        <v-flex xs12 mb-2>
          {{ q.answer }}
        </v-flex>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'FAQPanel',
  props: [ 'questions' ]
}
</script>

<style>

</style>

<template>
  <v-flex xs12 sm6 md4 mb-4>
    <v-card hover :href="$store.getters.discordURL" target="_blank" class="card-bg">
      <v-card-media height="100px">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 text-xs-center>
              <v-icon class="card-icon grey--text text--lighten-2">
                {{ job.icon }}
              </v-icon>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-title class="pa-0 px-3">
        <v-flex xs12>
          <h1 class="headline mb-1">{{ job.title }}</h1>
          <span class="grey--text text--lighten-2">
            {{ job.content }}
          </span>
        </v-flex>
      </v-card-title>
      <v-card-actions>
        <v-flex xs12 text-xs-center pa-0 card-button-move>
          <v-btn color="secondary" large>contact</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'RecruitingCard',
  props: [ 'job' ]
}
</script>

<style>
.card-button-move > * {
  transform: translateY(20px);
}
.card-icon {
  font-size: 64px !important;
}
</style>

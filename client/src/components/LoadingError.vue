<template>
  <v-layout column text-xs-center>
    <v-progress-linear :size="100" :value="100" color="error" />
    <h1 class="display-3">Error {{ rand(emoji) }}</h1>
    <h1 class="display-1">{{ rand(messages) }}</h1>
  </v-layout>
</template>

<script>
export default {
  name: 'loading-error',
  data () {
    return {
      emoji: [
        ':<',
        ':C',
        ':(',
        '.v.',
        ';_;'
      ],
      messages: [
        'Ooof',
        'Something broke',
        'No data for us',
        'Server responded with error',
        'Couldn\'t load news',
        'News bork!'
      ]
    }
  },
  methods: {
    rand (arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    }
  }
}
</script>

<style>

</style>

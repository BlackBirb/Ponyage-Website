<template>
  <v-content>
    <v-container fill-height>
      <v-layout justify-center align-center column>
        <h1 :class="[ 'display-4', rand(colors)+'--text' ]">404</h1>
        <h1 class="display-2 py-3">{{ rand(messages) }}</h1>
        <v-btn to="/" color="primary" large>Take me home!</v-btn>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'e-404',
  data () {
    return {
      messages: [
        'You poor thing, are you lost?',
        'Nothing here',
        'Need some help?',
        'What are you doing here?!',
        'You shouldn\'t be here',
        'This thing doesn\'t exists',
        'Sorry but nothing is here'
      ],
      colors: [
        'red',
        'deep-orange',
        'orange',
        'amber',
        'yellow'
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

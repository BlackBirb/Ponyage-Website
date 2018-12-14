<template>
  <v-content>
    <v-container>
      <v-layout navMargin>
        <v-flex xs8 sm10>
          <h1 class="display-1">
            {{ $store.state.username }}
          </h1>
          <span class="grey--text">Dashboard</span>
        </v-flex>
        <v-flex xs4 sm2>
          <v-btn
            @click="logout"
            outline
            color="error"
          >
            Logout
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout :class="[ $route.path.endsWith('dashboard') ? 'navMargin' : '', 'justify-center', 'wrap' ]">
        <h1 v-if="$route.path.endsWith('dashboard')">
          Where do you want to go?
        </h1>
        <v-flex xs12 text-xs-center>
          <v-btn
            v-for="path of paths"
            :key="path.name"
            outline
            :class="[ $route.path.endsWith('dashboard') ? 'v-btn--large' : 'dashboard-menu-btn' ]"
            active-class="accent--text v-btn--active"
            :to="'/dashboard/'+path.path"
          >
          {{ path.name }}
          </v-btn>
        </v-flex>
      </v-layout>
      <router-view></router-view>
    </v-container>
  </v-content>
</template>

<script>
import AddArticle from './AddArticle'

export default {
  name: 'dashboard',
  data () {
    return {
      paths: [
        { name: 'Article', path: 'article' },
        { name: 'Version file', path: 'version' }
      ]
    }
  },
  components: {
    AddArticle
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
    }
  }
}
</script>

<style>
.dialog-end {
  cursor: pointer;
}
.v-btn.v-btn--outline.dashboard-menu-btn {
  margin: 0;
  border-radius: 2px 2px 0 0;
  border: none;
  border-bottom: 1px solid;
}
</style>

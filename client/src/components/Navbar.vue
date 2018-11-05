<template>
  <v-toolbar v-if="!$vuetify.breakpoint.smAndDown" class="transparent" :height="navHeight" @mouseover="changeSize(true)" @mouseout="changeSize(false)" flat fixed dense scroll-off-screen>
    <v-toolbar-title class="mr-2">PonyAge</v-toolbar-title>
    <v-btn v-for="route of routes" :key="route.path" :to="route.path" flat> {{ route.title }}</v-btn>
    <v-spacer />
    <v-toolbar-items>
      <v-layout px-4 align-center>
        <span class="grey--text"> Server status: </span>
        <div :class="[ 'nav-server-status-icon', statusClass ]" />
        {{ statusText() }}
      </v-layout>
    </v-toolbar-items>
    <v-btn v-if="$store.state.logged" to="/dashboard" color="grey lighten-3" outline>
      {{ $store.state.username }}
    </v-btn>
  </v-toolbar>
  <v-toolbar v-else>
    <v-btn icon class="hidden-xs-only" to="/">
      <v-icon>home</v-icon>
    </v-btn>
    <v-toolbar-title>PonyAge</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items v-if="!$vuetify.breakpoint.xsOnly">
      <v-layout px-4 align-center>
        <span class="grey--text"> Server status: </span>
        <div :class="[ 'nav-server-status-icon', statusClass ]" />
        {{ statusText() }}
      </v-layout>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-layout px-4 align-center>
        <span class="grey--text"> Status: </span>
        <div :class="[ 'nav-server-status-icon', statusClass ]" />
        {{ statusText(true) }}
      </v-layout>
    </v-toolbar-items>
    <v-menu>
      <v-btn icon slot="activator">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="route of routes" :key="route.path" @click="$router.push(route.path)">
          <v-list-tile-title>{{ route.title }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="$store.state.logged" @click="$router.push('/dashboard')">
          Dashboard
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      navHeight: 36,
      routes: [
        { path: '/', title: 'Home' },
        { path: '/news', title: 'News' },
        { path: '/download', title: 'Download' },
        { path: '/faq', title: 'FAQ' },
        { path: '/credits', title: 'Credits' },
        { path: '/recruiting', title: 'Recruiting' }
      ]
    }
  },
  computed: {
    statusClass () {
      const { serverStatus } = this.$store.state
      if (serverStatus === 'loading') return 'accent'
      else if (serverStatus === null) return 'error'
      return 'success'
    }
  },
  methods: {
    changeSize (expand) {
      if (expand) this.navHeight = 48
      else this.navHeight = 36
    },
    statusText (smoll = false) {
      const { serverStatus } = this.$store.state
      if (serverStatus === null) return smoll ? 'OFF' : 'Offline'
      if (serverStatus === 'loading') return 'Loading'
      if (smoll) return serverStatus + ' 🐎'
      // eslint-disable-next-line eqeqeq
      return serverStatus + ` pon${serverStatus == 1 ? 'y' : 'ies'} online`
    }
  }
}
</script>

<style>
.v-toolbar__content {
  transition: .2s cubic-bezier(.4,0,.2,1);
}

.nav-server-status-icon {
  background-color: #ff5252;
  padding: .8vh;
  margin: 0px 5px;
  border-radius: 100%;
}

</style>

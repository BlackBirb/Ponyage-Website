<template>
  <div id="app">
    <v-app dark>
      <NavBar />
      <router-view v-if="!errored"/>
      <v-content v-else>
        <v-container fill-height center justify-center column>
          <h1 class="display-4 error--text">Error</h1>
          <h1 class="display-1">Oh no!</h1>
          <h2 class="display-2 my-2">
            There was an error with loading page data :c
          </h2>
          <h3 class="display-1">Our dragons are fixing this already! Please be patient</h3>
          <v-btn @click="ignoreError" class="mt-5" large color="error">
            Show me empty website anyways!
            <v-icon right>block</v-icon>
          </v-btn>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    errored () {
      return this.$store.state.dataErrored
    }
  },
  methods: {
    ignoreError () {
      this.$store.commit('dataErrored', false)
    }
  }
}
</script>

<style>
a {
  color: inherit;
  text-decoration: inherit;
}

.mouse-default {
  cursor: default !important;
}

.application.theme--dark {
  background-color: #34393a !important;
}

.full-height {
  height: 100%;
}

.column {
  flex-direction: column;
}

.navMargin {
  margin-top: 32px;
}

.register-link {
  font-size: 14px !important;
  font-weight: 500;
  color: white !important;
  opacity: .5;
}
.register-link:hover {
  opacity: 1;
}

.fix-image {
  object-fit: contain;
  max-width: 100%;
}

.card-bg {
  background-color: #383d3e !important;
}

.n-color, .pagination__item, .pagination__navigation  {
  background-color: #34363a !important;
}

.n-header {
  background-image: url('@/../assets/logoPlz.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 30%;
}

.capitalize {
  text-transform: capitalize;
}

</style>

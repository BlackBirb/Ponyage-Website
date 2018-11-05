<template>
  <v-footer height="auto" :absolute="absolute">
    <v-layout wrap>
      <v-flex xs12 text-xs-center py-2 class="footer-color">
        © {{ year }}
      </v-flex>
      <v-flex xs6 sm3 d-flex v-for="contact of contacts" :key="contact.id" class="footer-color">
        <v-btn :href="contact.url" target="_blank" flat>
          <v-icon v-if="contact.icon">{{ contact.icon }}</v-icon>
          <span class="ml-2">{{ contact.title }}</span>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'b-footer',
  props: {
    'absolute': {
      type: Boolean,
      default: true
    }
  },
  computed: {
    year () {
      const start = 2018
      const now = new Date().getFullYear()
      if (start === now) return now + ' Pony Age'
      return `${start} - ${now} ${start > now ? 'Are you a time traveler?!' : 'PonyAge'}`
    },
    contacts () {
      return this.$store.state.contact
    }
  }
}
</script>

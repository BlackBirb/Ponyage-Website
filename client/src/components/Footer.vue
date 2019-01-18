<template>
  <v-footer height="auto" color="primary lighten-1" :absolute="absolute" :class="absolute ? '' : 'relative mt-3'">
    <customBorder type="footer" />
    <v-layout wrap text-xs-center justify-center>
      <v-felx xs12 class="my-3">
        <v-btn
          v-for="contact of $store.state.contact" :key="contact.title"
          large flat
          :href="contact.url" target="_blank"
        >
          <v-icon v-if="contact.icon" size="46">{{ contact.icon }}</v-icon>
          <span class="ml-3">{{ contact.title }}</span>
        </v-btn>
      </v-felx>
      <v-flex xs12>
        <h5 class="body-1">© {{ year }}</h5>
        <p class="caption grey--text text--lighten-1">
          Designed by Szymon "SiMonk0" Furjan. Build with
          <v-icon color="red" size="14">favorite</v-icon>
          by BlackBird
        </p>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
import customBorder from '@/components/CustomBorder'

export default {
  name: 'b-footer',
  props: {
    'absolute': {
      type: Boolean,
      default: true
    }
  },
  components: {
    customBorder
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

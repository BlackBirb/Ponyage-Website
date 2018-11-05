<template>
  <v-content>
    <v-container>
      <v-layout navMargin wrap>
        <v-flex xs12 text-xs-center mt-3>
          <h1 class="my-4 font-weight-black">Frequently Asked Questions</h1>
        </v-flex>
        <v-flex xs12 pa-2>
          <FAQPanel :questions="questions"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import FAQPanel from '@/components/FAQPanel'

export default {
  name: 'faq',
  computed: {
    questions () {
      return this.$store.state.faq
    }
  },
  components: {
    FAQPanel
  }
}
</script>

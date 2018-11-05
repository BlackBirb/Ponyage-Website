<template>
  <v-content>
    <v-container navMargin my-5>
      <v-layout wrap>
        <b-load-error v-if="errored" />
        <v-progress-linear v-else-if="!loaded" :size="100" :width="7" indeterminate color="accent" class="mb-4" />
        <b-article v-else :article="article" :withButton="false" />
      </v-layout>
    </v-container>
    <b-footer :absolute="true"/>
  </v-content>
</template>

<script>
import footer from '@/components/Footer'
import article from '@/components/Article'
import loadError from '@/components/LoadingError'

export default {
  name: 'singeArticle',
  props: [ 'id' ],
  mounted () {
    if (!this.loaded) this.$store.dispatch('loadArticles')
  },
  updated () {
    if (this.loaded && !this.article) return this.$router.replace('/404')
  },
  computed: {
    articles () {
      return this.$store.state.articles
    },
    loaded () {
      return this.articles.length > 0 && !this.errored
    },
    errored () {
      return this.$store.state.articlesErrored
    },
    article () {
      // I know it should be === but types doesn't match
      // eslint-disable-next-line eqeqeq
      return this.articles.find(a => a.id == this.id)
    }
  },
  components: {
    'b-footer': footer,
    'b-article': article,
    'b-load-error': loadError
  }
}
</script>

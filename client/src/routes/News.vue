<template>
  <v-content>
    <v-container my-5 column navMargin align-center>
      <b-load-error v-if="errored" />
      <v-layout v-else-if="!loaded" align-center column justify-center>
        <v-progress-linear :size="100" :width="7" indeterminate color="accent" class="mb-4" />
      </v-layout>
      <v-layout wrap v-else>
        <b-article v-for="article of articles" :key="article.id" :article="article" @delete="removeArticle" withLink />
        <v-flex xs12 text-xs-center>
          <v-pagination v-if="maxPages > 1" :total-visible="9" :length="maxPages" v-model="page" prev-icon="chevron_left" next-icon="chevron_right" />
        </v-flex>
      </v-layout>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="320"
      >
        <v-card v-if="loading || error || success" class="card-bg">
          <v-card-text v-if="loading">
            <v-flex align-center d-flex>
              <v-icon size="32" class="mr-3" right dark>cloud_upload</v-icon>
              <span class="subheading">Our dragons are carrying your request to server</span>
            </v-flex>
            <v-progress-linear
              indeterminate
              color="primary"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
          <v-card-text v-else-if="error">
            <span class="subheading error--text">{{ error }}</span>
          </v-card-text>
          <v-card-text v-else>
            <span class="display-1 success--text">Success!</span>
          </v-card-text>
          <v-card-actions v-if="!loading">
            <v-spacer></v-spacer>
            <v-btn
              :color="error ? 'error' : 'success'"
              flat
              outline
              @click="closeDialog"
            >Ok</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else class="card-bg">
          <v-card-title class="headline" v-if="toRemove">
            Are you sure you want to delete article {{ toRemove.id }}?
          </v-card-title>
          <v-card-text v-if="toRemove">
            <span v-if="toRemove.title">
              It's titled: {{ toRemove.title }}
            </span>
            <span v-else-if="toRemove.content">
              It has description: {{ toRemove.content }}
            </span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              outline
              @click="dialog = false"
            >Nevermind</v-btn>
            <v-btn
              color="error"
              flat
              outline
              @click="remove"
            >Yes!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <b-footer :absolute="false"/>
  </v-content>
</template>

<script>
import footer from '@/components/Footer'
import article from '@/components/Article'
import loadError from '@/components/LoadingError'

export default {
  name: 'news',
  data () {
    return {
      newsPerPage: 6,
      page: 1,
      dialog: false,
      toRemove: null,
      loading: false,
      error: null,
      success: false
    }
  },
  mounted () {
    if (!this.loaded) this.$store.dispatch('loadArticles')
  },
  methods: {
    removeArticle (article) {
      console.log(article)
      this.loading = false
      this.error = null
      this.success = false
      this.dialog = true
      this.toRemove = article
    },
    remove () {
      this.loading = true
      this.$store.dispatch('removeArticle', { id: this.toRemove.id, token: this.$store.state.token })
        .then(res => {
          this.loading = false
          this.success = true
        })
        .catch(err => {
          this.loading = false
          this.error = 'Oh no! An error! ' + err.message
        })
    },
    closeDialog () {
      this.dialog = false
    }
  },
  computed: {
    articles () {
      let page = this.newsPerPage * this.page - 6
      let res = this.$store.state.articles.slice(page, page + this.newsPerPage)
      if (res.length > 0) return res
    },
    loaded () {
      return this.$store.state.articles.length > 0 && !this.errored
    },
    errored () {
      return this.$store.state.articlesErrored
    },
    maxPages () {
      return Math.ceil(this.$store.state.articles.length / 6)
    }
  },
  components: {
    'b-footer': footer,
    'b-article': article,
    'b-load-error': loadError
  }
}
</script>

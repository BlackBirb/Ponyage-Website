<template>
  <v-flex xs12 sm10 offset-sm1 md8 offset-md2 elevation-5 mb-4 transparent>
    <v-card class="card-bg">
      <v-btn
        v-if="$store.state.logged && withButton"
        absolute
        dark
        fab
        top
        right
        small
        @click="onDelete"
        color="error"
      >
        <v-icon>delete</v-icon>
      </v-btn>
      <v-flex v-if="article.title" mx-3 pt-3 xs12 @click="goToArticle()" :class="{ 'article-title': withLink }">
        <span class="headline">{{ article.title }}</span>
      </v-flex>
      <v-card-title>
        <a v-if="article.thumbnail && article.image" :href="article.image">
          <img class="fix-image mb-3 article-image" alt="article image" :src="article.thumbnail">
        </a>
        <img v-else-if="article.image" class="fix-image mb-3 article-image" :src="article.image" alt="article image">
        <div v-if="article.content" class="flex xs12">
          <p v-for="( line, id ) of getLines()" :key="id" class="ma-1" >
            {{ line }}
          </p>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn icon><v-icon class="red--text">favorite</v-icon></v-btn>
        <v-btn icon :href="shareTwitter()" target="_blank">
          <v-icon class="light-blue--text">fab fa-twitter</v-icon>
        </v-btn>
        <v-spacer />
        <div class="mr-4 grey--text">{{ date }}</div>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'b-article',
  props: {
    article: Object,
    withLink: Boolean,
    withButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    date () {
      return this.article.date
    }
  },
  methods: {
    onDelete () {
      this.$emit('delete', this.article)
    },
    getLines () {
      return this.article.content.split('\n')
    },
    shareTwitter () {
      const text = this.article.title + '\n'
      const url = window.location.origin + '/article/' + this.article.id
      return `http://twitter.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    },
    goToArticle () {
      if (this.withLink)
        this.$router.push({ name: 'article', params: { id: this.article.id } })
    }
  }
}
</script>

<style>
.article-title {
  cursor: pointer;
}
.article-image {
  max-height: 480px;
}
</style>

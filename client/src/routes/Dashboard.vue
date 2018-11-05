<template>
  <v-content>
    <v-container>
      <v-layout navMargin wrap>
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
      <v-dialog
        v-model="dialog"
        width="320"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text v-if="isLoading">
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
          <v-card-text v-else-if="error" @click="dialog = false" class="dialog-end align-center d-flex">
            <v-icon size="46" class="mr-3" color="error">clear</v-icon>
            <span class="subheading">{{ error }}</span>
          </v-card-text>
          <v-card-text v-else @click="dialog = false" class="dialog-end align-center d-flex">
            <v-icon size="48" class="mr-3">done_all</v-icon>
            <span class="headline">Article saved!</span>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-layout mt-4 align-center justify-center column>
        <h1>Add new article</h1>
        <v-form
          ref="form"
          class="pa-3 pt-4 card-bg article-form"
        >
          <v-text-field
            box
            v-model="title"
            color="secondary"
            counter="64"
            label="Title"
            style="min-height: 96px"
            type="text"
          ></v-text-field>
          <v-textarea
            v-model="desc"
            box
            name="input-7-4"
            label="Description"
            color="secondary"
            counter="3072"
          ></v-textarea>

          <v-checkbox
            v-model="isImage"
            color="secondary"
          >
            <template slot="label">Add image</template>
          </v-checkbox>

          <v-layout v-if="isImage" wrap>
            <ImageUpload v-model="image" name="Pick Image" />
            <ImageUpload v-model="thumbnail" name="Pick Thumbnail" />
          </v-layout>

          <v-checkbox
            :disabled="true"
            color="primary"
          >
            <template slot="label">
              I agree to the&nbsp;
              <a href="#">Terms of Service</a>
              &nbsp;and&nbsp;
              <a href="#">Privacy Policy</a>
            </template>
          </v-checkbox>

          <v-flex v-if="error" class="error--text text-xs-center subheading">
            {{ error }}
          </v-flex>

          <v-card-actions>
            <v-btn
              flat
              @click="$refs.form.reset()"
            >
              Clear
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              @click="submit"
              :disabled="isLoading"
              :loading="isLoading"
              color="primary"
              depressed
            >Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import ImageUpload from '@/components/ImageUpload'
import * as api from '@/api'

export default {
  name: 'dashboard',
  data () {
    return {
      title: '',
      desc: '',
      isImage: false,
      image: null,
      thumbnail: null,
      isLoading: false,
      error: null,
      dialog: false
    }
  },
  components: {
    ImageUpload
  },
  methods: {
    clearForm () {
      this.$refs.form.reset()
      this.image = null
      this.thumbnail = null
    },
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
    },
    async submit () {
      this.isLoading = true
      const data = new FormData()
      if (this.title && this.title.length > 0)
        data.append('title', this.title)
      if (this.desc && this.desc.length > 0)
        data.append('description', this.desc)
      if (this.image)
        data.append('image', this.image)
      if (this.thumbnail)
        data.append('thumbnail', this.thumbnail)

      try {
        this.dialog = true
        this.isLoading = true
        const article = await api.addArticle(data, this.$store.state.token)

        await this.$store.dispatch('addArticle', article)

        this.clearForm()
        this.isLoading = false
      } catch (err) {
        console.error(err)
        this.error = err.message
        this.isLoading = false
      }
    }
  }
}
</script>

<style>
.dialog-end {
  cursor: pointer;
}
</style>

<template>
  <section>
    <v-dialog v-model="dialog" width="320">
      <v-card color="primary" dark>
        <v-card-text v-if="isLoading">
          <v-flex align-center d-flex>
            <v-icon size="32" class="mr-3" right dark>cloud_upload</v-icon>
            <span class="subheading">Our dragons are carrying your request to server</span>
          </v-flex>
          <v-progress-linear indeterminate color="primary" class="mb-0"></v-progress-linear>
        </v-card-text>
        <v-card-text
          v-else-if="error"
          @click="dialog = false"
          class="dialog-end align-center d-flex"
        >
          <v-icon size="46" class="mr-3" color="error">clear</v-icon>
          <span class="subheading">{{ error }}</span>
        </v-card-text>
        <v-card-text v-else @click="dialog = false" class="dialog-end align-center d-flex">
          <v-icon size="48" class="mr-3">done_all</v-icon>
          <span class="headline">New versions are saved!</span>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-layout mt-4 align-center justify-center column>
      <h1 class="mb-2">Edit version file</h1>
      <v-btn
        flat
        href="/api/version"
      >
        Go to versions file
      </v-btn>

      <v-progress-circular v-if="!loaded" :size="100" :width="9" indeterminate color="accent" class="mt-4" />
      <v-flex v-else-if="loaded === 'error'">
        <h1 class="error--text display-1">Someone ate our version file and I can't load it!</h1>
      </v-flex>
      <v-form v-else ref="form" class="pa-3 card-bg article-form">
        <v-layout
          v-for="version of versionFileArray" :key="version.arch"
          row wrap
          mb-4 pa-2
          elevation-2
          style="position: relative"
        >
          <v-flex xs12>
            <span class="body">Arch</span>
            <h1 class="display-1 mb-1">{{ version.arch }}</h1>
            <v-btn
              style="top: -12px"
              absolute
              dark
              fab
              right
              small
              @click="deleteArch(version.arch)"
              color="error"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs6 sm2>
            <v-text-field
              box
              color="secondary"
              label="DB Version"
              type="text"
              @input="updateValue(version.arch, 'DBVersion', $event)"
              :placeholder="version.DBVersion"
            />
          </v-flex>
          <v-flex xs12 sm10 pl-1>
            <v-text-field
              box
              color="secondary"
              label="DB MD5"
              type="text"
              @input="updateValue(version.arch, 'DBMD5', $event)"
              :placeholder="version.DBMD5"
            />
          </v-flex>
          <v-flex xs6 sm2>
            <v-text-field
              box
              color="secondary"
              label="Game version"
              type="text"
              @input="updateValue(version.arch, 'GameVersion', $event)"
              :placeholder="version.GameVersion"
            />
          </v-flex>
          <v-flex xs12 sm10 pl-1>
            <v-text-field
              box
              color="secondary"
              label="Game MD5"
              type="text"
              @input="updateValue(version.arch, 'GameMD5', $event)"
              :placeholder="version.GameMD5"
            />
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              box
              color="secondary"
              label="Update URL"
              type="text"
              @input="updateValue(version.arch, 'UpdateURL', $event)"
              :placeholder="version.UpdateURL"
            />
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12>
            <h1 class="mt-4">Add new arch</h1>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field
              color="secondary"
              label="Name"
              type="text"
              v-model="newArchName"
            />
          </v-flex>
          <v-flex xs12 sm2 md1>
            <v-btn
              @click="addArch($refs.newArch)"
              color="primary"
              depressed
            >
              Add
            </v-btn>
          </v-flex>
        </v-layout>
        <v-flex>
          <v-btn
            flat
            color="error"
            @click="undoButton"
          >
            Undo
          </v-btn>
          <v-btn
            @click="submit"
            color="success"
            depressed
          >
            Save
          </v-btn>
        </v-flex>
      </v-form>
    </v-layout>

    <v-snackbar
        v-model="snack"
        color="primary"
        right bottom
        :timeout="3000"
      >
        Don't forget to save your changes!
        <v-btn
          dark
          flat
          @click="snack = false"
        >
          Yes I know!
        </v-btn>
      </v-snackbar>
  </section>
</template>

<script>
export default {
  data () {
    return {
      loaded: this.$store.getters.versionFileLoaded,
      updated: {},
      newArchName: '',

      snack: false, // if you're reading this you have a free snack from me!
      isLoading: false,
      error: null,
      dialog: false
    }
  },
  computed: {
    versionFileArray () {
      return Object.keys(this.updated).map(key => {
        return Object.assign({}, this.updated[key], { arch: key })
      })
    }
  },
  methods: {
    updateValue (arch, key, value) {
      if (!value || value.length < 1)
        value = this.$store.state.versionFile[arch] ? this.$store.state.versionFile[arch][key] : ''

      this.$set(this.updated[arch], key, value)
    },
    cloneStroeState () {
      if (this.$store.getters.versionFileLoaded !== true) return
      const cloned = {}
      for (const arch of Object.keys(this.$store.state.versionFile)) {
        cloned[arch] = Object.assign({}, this.$store.state.versionFile[arch])
      }
      this.updated = cloned
    },
    submit () {
      this.dialog = true
      this.isLoading = true
      this.$store.dispatch('updateVersionFile', { token: this.$store.state.token, data: this.updated })
        .then(() => {
          this.cloneStroeState()
          this.$refs.form.reset()
          this.isLoading = false
        })
        .catch(err => {
          console.error(err)
          this.error = err.message
          this.isLoading = false
        })
    },
    undoButton () {
      this.$refs.form.reset()
      this.cloneStroeState()
    },
    addArch () {
      if (this.newArchName.length < 1) return
      this.$set(this.updated, this.newArchName, {})
      this.newArchName = ''
      this.snack = true
    },
    deleteArch (arch) {
      if (this.updated.hasOwnProperty(arch))
        this.$delete(this.updated, arch)
      this.snack = true
    }
  },
  mounted () {
    if (!this.loaded) {
      this.$store.dispatch('loadVersionFile')
        .then(() => {
          this.cloneStroeState()
          this.loaded = this.$store.getters.versionFileLoaded
        })
        .catch(() => {
          this.cloneStroeState() // because
          this.loaded = this.$store.getters.versionFileLoaded
        })
    } else {
      this.cloneStroeState()
    }
  }
}
</script>

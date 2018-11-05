<template>
  <v-flex xs6>
    <v-flex xs12 mb-1 d-inline-flex style="width: 100%">
      <v-btn
      color="secondary"
      large
      @click="$refs.file.click()"
    > {{ $props.name }} </v-btn>
    </v-flex>
    <input
      type="file"
      ref="file"
      style="display: none;"
      accept="image/*"
      @change="selectFile"
    />
    <v-flex v-if="file && url" class="file-preview-container" text-xs-center>
      <img class="fix-image file-preview" :src="url" alt="uploadedFilePreview">
    </v-flex>
    <v-flex v-if="file" text-xs-center file-name-holder>
      {{ file.name }}
    </v-flex>
  </v-flex>
</template>

<script>
export default {
  props: [ 'name' ],
  data () {
    return {
      file: null,
      url: null
    }
  },
  methods: {
    selectFile () {
      this.file = this.$refs.file.files[0]
      const fileReader = new FileReader()
      fileReader.addEventListener('load', evn => {
        this.url = evn.target.result
      })
      fileReader.readAsDataURL(this.file)
      this.$emit('input', this.file)
    }
  }
}
</script>

<style>
.file-name-holder {
  max-width: 100%;
  word-break: break-all;
}
.file-preview {
  max-height: 120px;
  max-width: 120px;
  margin: auto;
}
</style>

<template>
  <v-content v-if="true">
    <v-container fill-height column>
      <v-layout v-if="downloadable === null || !downloadable" column align-center justify-center>
        <h1 class="display-2 text-xs-center">The game is not available for download right now</h1>
        <h3 class="display-3"> Sorry :c </h3>
        <v-btn disabled class="btn-huge">Download</v-btn>
      </v-layout>
      <v-layout v-else column align-center justify-center mt-5>
        <h1 class="display-2 text-xs-center mb-3">Download the game and join us!</h1>
        <section style="width: 75%;">
          <v-flex align-start>
            <div v-for="(name, i) of Object.keys(downloadable)" :key="i">
              <span class="name-fixed capitalize headline">{{ name }}:</span>
              <v-btn
                 v-for="(type, i) of Object.keys(downloadable[name])" :key="i"
                large color="primary" :href="downloadable[name][type]" target="_blank">{{ type }}</v-btn>
            </div>
          </v-flex>
        </section>
        <section style="width: 90%" class="grey--text text--lighten-2 mt-5">
          <v-flex align-start="">
            <h1 class="body-2">How to start playing:</h1>
            <p v-for="(step, i) of steps" :key="i" class="mb-0">
              <span class="body-2">{{ i+1 }}.</span> <span v-html="step" />
            </p>
          </v-flex>
        </section>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'download',
  computed: {
    downloadable () {
      return this.$store.state.downloadable
    },
    steps () {
      return [
        'Download the game for your operating system',
        'Unpack what you just downloaded, it\'s a rar file so you need 7zip or winrar to open it.',
        'Run <kbd>Ponyage.exe</kbd>',
        '<u>Don\'t</u> select <kbd>Local Connect</kbd> it has to be <u>unchecked</u> for the game to work',
        'To create account type login and password you want and press <kbd>Create&Login</kbd> button<br />It\'s not instant so you might need to wait few seconds',
        'Log in with your login and password using the same <kbd>Create&Login</kbd> button',
        'Choose colors and manes for your character',
        'Pick what perks you want, you can have up to 14 perks and value must be less or equal to 0',
        'Press <kbd>Enter</kbd>',
        'Enjoy booping other ponies!',
        'If you still have questions ask on our discord'
      ]
    }
  }
}
</script>

<style>
.btn-huge {
  height: 48px !important;
  font-size: 26px !important;
  border-radius: 5px !important;
}
.name-fixed {
  display: inline-block;
  width: 100px;
  text-align: right;
}
</style>

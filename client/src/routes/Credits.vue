<template>
  <v-content v-if="true">
    <v-container navMargin>
      <v-layout column pb-5>
        <v-flex xs12 my-5 text-xs-center>
          <h1 class="display-2 font-weight-black">PonyAge: Chronicles</h1>
          <h1 class="display-1">Contributors</h1>
          <span class="grey--text">aka. Everypony that made this game become a real thing</span>
        </v-flex>
        <v-card
          v-for="user of contributors" :key="user.id"
          class="mt-2 mb-2 card-bg mouse-default" hover
        >
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-card-media
                :src="user.icon"
                :height="iconSize + 'px'"
                :style="{ width: iconSize + 'px'}"
                class="image-icon"
                contain
              />
              <v-flex>
                <v-flex>
                  <div class="headline">
                    <span>{{ user.name }}</span>
                    <span v-if="user.discriminator" class="grey--text">#{{ user.discriminator }}</span>
                  </div>
                  <div v-if="user.role" class="body-1 ml-2 grey--text">{{ user.role }}</div>
                  <div v-if="user.desc" class="ml-3">
                    <p v-for="(line, i) of getLines(user.desc)" :key="i" class="ma-0">
                      {{ line }}
                    </p>
                  </div>
                </v-flex>
                <v-flex v-if="user.contact" py-0>
                  <v-btn v-for="contact of user.contact" :key="contact.name" :href="contact.url" target="_blank" icon>
                    <v-icon :class="contact.color !== 'white' ? [ `${contact.color}--text` ] : null">{{ contact.name }}</v-icon>
                  </v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <h1 class="display-1 mt-2">And everypony that was playing during tests!</h1>
        <span>If you want to help out even more check out <router-link to="/recruiting">Recruiting</router-link> page!</span>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'info',
  computed: {
    contributors () {
      return this.$store.state.contributors
    },
    contacts () {
      return this.$store.state.contact
    },
    iconSize () {
      if (this.$vuetify.breakpoint.xsOnly) return 90
      if (this.$vuetify.breakpoint.smOnly) return 120
      return 150
    }
  },
  methods: {
    getLines (text) {
      // really?
      return text.split('\n')
    }
  }
}

</script>

<style>
.image-icon {
  border-radius: 100%;
  flex-shrink: 0;
}
</style>

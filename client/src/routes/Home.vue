<template>
  <v-content>
    <section>
      <v-jumbotron class="jumbotron_shadow" :src="require('@/assets/bg.jpg')" :height="windowHeight + 'px'">
        <v-container fill-height>
          <v-layout :class="{
            'align-center': true,
            'wrap': true,
            'justify-end': $vuetify.breakpoint.mdAndUp,
            'justify-center': $vuetify.breakpoint.smOnly
          }">
            <v-flex v-if="$store.state.homeVideo" xs12 md6 xl4 offset-xl2 px-1>
              <iframe class="heck-you" :src="$store.state.homeVideo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </v-flex>
            <v-flex xs12 sm8 md5 offset-md1 xl4 offset-xl2 elevation-5 pa-3 text-xs-center home-card>
              <h1 :class="{
                  'display-3': $vuetify.breakpoint.smAndUp,
                  'display-2': $vuetify.breakpoint.xsOnly
                }">
                PonyAge
              </h1>
              <div :class="
                $vuetify.breakpoint.mdAndUp
                  ? [ 'title', 'font-weight-regular', 'my-3' ]
                  : [ 'header my-3' ]
                ">
                A seamless 2D MMORPG about colorful horses
              </div>
              <v-btn to="/download" color="primary">Play now!</v-btn>
              <v-btn :href="$store.getters.discordURL" target="_blank" color="primary">
                <v-icon class="mr-2">
                  fab fa-discord
                </v-icon>
                Join our Discord
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </section>
    <section>
      <v-layout home-content-card pt-5 mb-1 column text-xs-center>
        <h2 class="flex display-1 mb-1">
          PonyAge!
        </h2>
        <p>Quick Info:</p>
      </v-layout>

      <v-layout v-for="(content, i) in contents" :key="content.id" home-content-card wrap py-4 px-2>
        <v-flex :class="genClass(i)">
          <h3 class="headline mb-3">
            {{ content.title }}
          </h3><p>
          {{ content.content }}</p>
        </v-flex>
        <v-flex :class="genClass(i, true)">
          <img :src="content.image" class="fix-image home-image" alt="ImageExample" height="250px">
        </v-flex>
      </v-layout>
    </section>
    <b-footer :absolute="false" />
  </v-content>
</template>

<script>
import footer from '@/components/Footer'

export default {
  name: 'Home',
  data () {
    return {
      windowHeight: window.innerHeight,
      contents: [
        {
          id: 1,
          title: 'The game!',
          content: 'Explore the world in a true MMORPG environment as your own character. Meet other players and group up against threats and foes.',
          image: require('@/assets/Home1.png')
        },
        {
          id: 2,
          title: 'The grind!',
          content: 'Collect resources and complete tasks to craft your own gear. Or sell them to other players who need them more. Learn new spells, upgrade them for your own unique set of abilities!',
          image: require('@/assets/Home2.png')
        },
        {
          id: 3,
          title: 'The PvP!',
          content: 'Prove yourself in the pvp arena, and prepare yourself for the 1v1 tournament! Both skill and determination will have a valuable impact.',
          image: require('@/assets/Home3.png')
        },
        {
          id: 4,
          title: 'Fret the bosses',
          content: 'Some say that they were buffed to broken state... Be sure to team up before tackling them.',
          image: require('@/assets/Home4.png')
        }
      ]
    }
  },
  methods: {
    genClass (index, image = false) {
      return [ 'xs12', 'sm6', 'md5', 'px-1' ].concat(
        (!(index % 2) + image) === 1
          ? [ 'offset-md1', 'order-sm1' ]
          : 'order-sm2'
      )
    }
  },
  components: {
    'b-footer': footer
  }
}
</script>

<style>

.heck-you {
  object-fit: contain;
  width: 100%;
  height: 300px;
}

.jumbotron_shadow .v-jumbotron__background {
  box-shadow:
    inset 0 -6px 6px -3px rgba(0,0,0,.2),
    inset 0 -10px 14px 1px rgba(0,0,0,.14),
    inset 0 -4px 18px 3px rgba(0,0,0,.12),
    inset 0 -3px 0px 0 #a18647,
    inset 0 -6px 0px 0 #ffd776
    !important;
}

.footer-color {
  background-color: #252a2b;
}

.homeText {
  max-width: 400px;
  text-align: right;
  margin: 10px 0px;
}

.homeText-xs {
  max-width: 100%;
  text-align: center;
}

.home-card {
  background-color: rgba(22, 31, 38, .75);
  border-radius: 5px;
}

.home-card-color {
  background-color: rgba(0,0,0,.12) !important;
}

.v-jumbotron__image {
  min-height: 100%;
}

.home-content-card:nth-child(odd) {
  background-color: transparent !important;
}

.home-content-card:nth-child(even) {
  background-color: #363b3c !important;
}

.home-image {
  border-radius: 2px;
}

</style>

<template>
  <v-content>
    <section>
      <v-parallax :src="require('@/assets/bg.jpg')" :height="windowHeight">
        <v-layout fill-height justify-center align-center class="lightbox">
          <v-img
            :src="require('@/assets/PonyAge-Chronicles-Logo.png')"
            :height="$vuetify.breakpoint.xlOnly ? '640px' : $vuetify.breakpoint.mdAndUp ? '416px' : $vuetify.breakpoint.xsOnly ? '256px' : '384px'"
            contain
            class="floating"
          />
        </v-layout>
      </v-parallax>

      <v-jumbotron v-if="false" class="jumbotron_shadow" :src="require('@/assets/bg.jpg')" :height="windowHeight + 'px'">
        <v-container fill-height>
          <v-layout :class="{
            'align-center': true,
            'wrap': true,
            'justify-end': $vuetify.breakpoint.mdAndUp,
            'justify-center': $vuetify.breakpoint.smOnly
          }">
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
              <v-btn to="/download" color="buttons">Play now!</v-btn>
              <v-btn :href="$store.getters.discordURL" target="_blank" color="buttons">
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
    <section class="relative">
      <customBorder :flipped="false" position="top"/>
      <v-layout justify-center py-5>
        <v-flex v-if="$store.state.homeVideo" xs12 md6 xl3 px-1>
          <iframe class="heck-you" :src="$store.state.homeVideo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </v-flex>
      </v-layout>
      <v-layout v-for="(content, i) in contents" :key="content.id" home-content-card wrap py-4 px-2>
        <v-flex :class="genClass(i)">
          <v-flex xs8 offset-xs2>
            <h3 class="display-1 mb-5 grey--text text--darken-1 uppercase">
              {{ content.title }}
            </h3>
            <p class="subheading">
              {{ content.content }}
            </p>
          </v-flex>
        </v-flex>
        <v-flex :class="genClass(i, true)">
          <v-img :src="content.image" alt="Game Image" class="home-image" height="250px" contain />
        </v-flex>
      </v-layout>
    </section>
    <b-footer :absolute="false" />
  </v-content>
</template>

<script>
import footer from '@/components/Footer'
import customBorder from '@/components/CustomBorder'

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
          image: require('@/assets/NewHome1.png')
        },
        {
          id: 2,
          title: 'The grind!',
          content: 'Collect resources and complete tasks to craft your own gear. Or sell them to other players who need them more. Learn new spells, upgrade them for your own unique set of abilities!',
          image: require('@/assets/NewHome1.png')
        },
        {
          id: 3,
          title: 'The PvP!',
          content: 'Prove yourself in the pvp arena, and prepare yourself for the 1v1 tournament! Both skill and determination will have a valuable impact.',
          image: require('@/assets/NewHome1.png')
        },
        {
          id: 4,
          title: 'Fret the bosses',
          content: 'Some say that they were buffed to broken state... Be sure to team up before tackling them.',
          image: require('@/assets/NewHome1.png')
        }
      ]
    }
  },
  methods: {
    genClass (index, image = false) {
      return [ 'xs12', 'sm6', 'md5', 'px-5', 'text-xs-center' ].concat(
        (!(index % 2) + image) === 1
          ? [ 'offset-md1', 'order-sm1', 'text-md-right' ]
          : [ 'order-sm2', 'text-md-left' ]
      )
    }
  },
  components: {
    customBorder,
    'b-footer': footer
  }
}
</script>

<style>

.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}

@keyframes floating {
  0% {
    transform: translateY(-5px) rotate(0.0001deg);
  }
  25% {
    transform: translateY(2px) rotate(0.0001deg);
  }
  50% {
    transform: translateY(-4px) rotate(0.0001deg);
  }
  75% {
    transform: translateY(0px) rotate(0.0001deg);
  }
  100% {
    transform: translateY(-5px) rotate(0.0001deg);
  }
}

.floating {
  animation: floating 15s ease-in-out infinite;
}

.heck-you {
  object-fit: contain;
  width: 100%;
  height: 300px;
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

.home-content-card:nth-child(even) {
  background-color: transparent !important;
}

.home-content-card:nth-child(odd) {
  background-color: #00000010 !important;
}
</style>

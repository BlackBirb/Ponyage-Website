<template>
  <v-content>
    <v-container>
      <v-layout navMargin wrap>
        <v-flex xs12 text-xs-center help-text>
          <h1 class="display-2 font-weight-black">We need your help!</h1>
          <p class="grey--text text--lighten-1">Here's the list of who could be useful</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-xl>
      <v-layout layout row wrap justify-center>
        <RecruitingCard v-for="(job, i) of jobs" :key="i" :job="job"/>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import RecruitingCard from '@/components/RecruitingCard'
export default {
  name: 'RecruitingPage',
  data () {
    return {
      jobs: [{
        title: '2D Animator',
        icon: 'local_movies',
        content: 'The stronghold of how game look. The creatures need to be drawn and animated. Knowledge in UI design would be a huge plus. Program of use doesn\'t matter as long as you can export spritesheets or arrays of pngs.'
      }, {
        title: '2D Artist',
        icon: 'brush',
        content: 'Even if you aren\'t good with animating - game could always use icons, manes, environment designs. '
      }, {
        title: 'Level designer',
        icon: 'insert_photo',
        content: 'Having someone who can focus on making scene look as fancy as possible with limited resources is always useful. Experience with unity is a must here.'
      }, {
        title: 'Sound designer',
        icon: 'volume_up',
        content: 'A proper sound designer will know the reason why he\'s needed the moment he enters the game.'
      }]
    }
  },
  components: {
    RecruitingCard
  }
}
</script>

<style>
.help-text {
  margin-top: 96px;
}
</style>

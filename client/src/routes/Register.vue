<template>
  <v-content v-if="true">
    <v-container fill-height>
      <v-layout column align-center justify-center>
        <h1 class="display-2">{{ randMessage }}</h1>
        <h1 v-if="error" class="display-1 error--text">{{ error }}</h1>
        <v-progress-circular v-if="loading"
          :size="50"
          :width="5"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <form style="min-width: 350px;">
          <v-text-field v-model="user.username" :rules="loginRules" label="Login"/>
          <v-text-field type="password" v-model="user.password" :rules="passwordRules" label="Password"/>
          <v-text-field v-model="user.token" :rules="tokenRules" label="Magical Token"/>
        </form>
        <v-btn color="secondary" @click="register">Register</v-btn>
        <span>
          <router-link to="/login" class="register-link">
            Log in if you have an account!
          </router-link>
        </span>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      windowHeight: window.innerHeight,
      error: null,
      loading: false,
      messages: [
        'Don\'t forget to say hi!',
        'Welcome!',
        'Register',
        'Type your things and join us!',
        'Join the dark side!'
      ],
      user: {
        username: '',
        password: '',
        token: ''
      },
      loginRules: [ v => !!v || 'Login is required' ],
      passwordRules: [ v => !!v || 'Password is required' ],
      tokenRules: [ v => !!v || 'This is required!' ]
    }
  },
  methods: {
    register () {
      if (this.error) this.error = null
      if (this.user.username.length < 1) return
      this.loading = true
      this.$store.dispatch('register', this.user)
        .then(data => {
          this.loading = false
          this.$router.push('/dashboard')
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
    }
  },
  computed: {
    randMessage () {
      return this.messages[Math.floor(Math.random() * this.messages.length)]
    }
  }
}
</script>

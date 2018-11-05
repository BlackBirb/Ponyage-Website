<template>
  <v-content>
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
        <form style="min-width: 350px;" @keydown="onKeydown">
          <v-text-field v-model="user.username" :rules="loginRules" label="Login"/>
          <v-text-field type="password" v-model="user.password" :rules="passwordRules" label="Password"/>
        </form>
        <v-btn color="secondary" @click="login">Login</v-btn>
        <span>
          <router-link to="/register" class="register-link">Or join us!</router-link>
        </span>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      windowHeight: window.innerHeight,
      error: null,
      loading: false,
      messages: [
        'Please log in',
        'Sign in to your account',
        'Welcome back!',
        'Hi again'
      ],
      user: {
        username: '',
        password: ''
      },
      loginRules: [ v => !!v || 'Login is required' ],
      passwordRules: [ v => !!v || 'Password is required' ]
    }
  },
  methods: {
    login () {
      if (this.error) this.error = null
      if (this.user.username.length < 1) return
      this.loading = true
      this.$store.dispatch('login', this.user)
        .then(data => {
          this.loading = false
          this.$router.push('/dashboard')
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
    },
    onKeydown (evn) {
      if (evn.keyCode === 13) this.login()
    }
  },
  computed: {
    randMessage () {
      return this.messages[Math.floor(Math.random() * this.messages.length)]
    }
  }
}
</script>

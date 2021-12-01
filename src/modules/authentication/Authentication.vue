<template>
  <v-dialog :value="true" persistent max-width="600px" min-width="300px">
    <v-tabs v-model="tab" show-arrows background-color="black" icons-and-text dark grow>
      <v-tabs-slider color="grey" />
      <v-tab v-for="i in tabs" :key="i.name">
        <v-icon large>{{ i.icon }}</v-icon>
        <div class="caption py-1">{{ i.name }}</div>
      </v-tab>
      <v-tab-item v-for="(type, i) in ['Login', 'Register']" :key="i">
        <v-card class="px-4">
          <v-card-text>
            <v-row>
              <v-col class="px-4 py-8">
                <v-row>
                  <v-text-field
                    v-model="username"
                    label="Username"
                    :error="$v.username.$dirty && $v.username.$invalid"
                    @blur="$v.username.$touch()"
                  />
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    :error="$v.password.$dirty && $v.password.$invalid"
                    @blur="$v.password.$touch()"
                  />
                </v-row>
                <v-row>
                  <v-btn x-large block :disabled="!valid" color="purple" @click="validate">
                    {{ type }}
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Authentication',
  data() {
    return {
      tab: 0,
      tabs: [
        {
          name: 'Login',
          icon: 'mdi-account',
        },
        {
          name: 'Register',
          icon: 'mdi-account-outline',
        }
      ],
      username: null,
      password: null,
    }
  },
  computed: {
    valid: ({ $v }) => !$v.$invalid,
  },
  validations() {
    return {
      username: { required },
      password: { required },
    }
  },
  methods: {
    async validate() {
      const { tab, username, password } = this
      const userData = { username, password }
      let success
      if (tab === 0) {
        success = await this.$store.dispatch('authentication/signIn', userData)
        if (success) this.$router.replace({ path: '/home' })
      }
      if (tab === 1) {
        success = await this.$store.dispatch('authentication/signUp', userData)
        if (success) this.tab = 0
      }
    }
  }
}
</script>

<template>
  <q-page class="flex column">
    <div class="flex flex-center q-ma-lg">
      <img src="data:image/png;base64,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" class="q-ma-md img" alt="logo">
    </div>
    <div class="column flex-center">
      <q-form @submit="signUp" class="column">
    <q-input
      outlined
      standout="text-grey-5"
      v-model="user.userName"
      :label="$t('EnterUsername')"
      style="width: 350px"
      v-model.trim="user.userName"
      lazy-rules
      :rules="[ val => !!val || $t('pleaseEnterUsername'),
                        val => $v.user.userName.minLength || $t('shortNameError'),
                        val => $v.user.userName.alphaNum || $t('alphaNumError')]"
    />
    <inputs :user="user"/>
      <q-btn
        rounded
        class="q-mb-sm q-py-xs"
        color="light-blue"
        icon-right="login"
        no-caps
        type="submit"
        :label="$t('signUp')"/>
      </q-form>
    </div>
    <div class="text-weight-thin" style="text-align: center">{{ $t('bySigningIn') }}<br>
      <a  style="color: #c10015">{{ $t('termsLink') }}</a>
      {{ $t('and') }} <a  style="color: #C10015">{{ $t('privacyLink') }}</a>.
    </div>
    <q-separator size="1px" color="dark q-my-sm"/>
    <div class="flex-center flex">{{ $t('hasAccount') }}</div>
    <div class="flex flex-center">
      <q-btn no-caps flat @click="pushToLoginPage">{{ $t('login') }}</q-btn>
    </div>
    <div class="flex flex-center">
    </div>
  </q-page>
</template>

<script>
import Inputs from "components/Inputs/InputsLogin&Register";
import {alphaNum, minLength} from "vuelidate/lib/validators";
import {mapActions} from "vuex";

export default {
  name: "RegisterPage",
  components: {Inputs},
  data() {
    return {
      user: {
        userName: '',
        email: '',
        password: '',
      },
    }
  },
  methods : {
    ...mapActions('user', ['passwordRegister']),
    pushToLoginPage() {
      this.$router.push({name: 'login'});
    },
    signUp() {
      this.passwordRegister(this.user).then(() => {
        this.$router.push(`/Vacations`);
      })
    },
  },
  validations: {
    user: {
      userName: {
        alphaNum,
        minLength: minLength(2)
      },
    }
  }
}
</script>

<style scoped>

</style>

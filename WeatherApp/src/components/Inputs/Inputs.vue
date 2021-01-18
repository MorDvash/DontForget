<template>
<div>
  <q-input
    outlined
    standout="text-grey-5"
    v-model="user.email"
    :label="$t('enterEmail')"
    type="email"
    style="width: 350px"
    @input="$v.user.email.$touch"
    lazy-rules
    :rules="[ val => !!val || $t('pleaseEnterEmail'),
                        val => $v.user.email.email || $t('emailIsInvalid')]">

    <template v-slot:append>
      <q-icon name="mail"/>
    </template>
  </q-input>
  <q-input
    outlined
    standout="text-grey-5"
    v-model="user.password"
    style="width: 350px"
    :label="$t('enterPassword')"
    :type="isPwd ? 'password' : 'text'"
    @input="$v.user.password.$touch"
    lazy-rules
    :rules="[ val => !!val || $t('pleaseEnterPassword'),
                        val => $v.user.password.alphaNum || $t('alphaNumError'),
                        val => $v.user.password.minLength || $t('shortPasswordError')]">
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</div>
</template>

<script>
import {alphaNum, email, minLength} from 'vuelidate/lib/validators';

export default {
  name: "Inputs",
  props : ['user'],
  data(){
    return{
      data :{},
      isPwd: true,
    }
  },
  validations: {
    user: {
      email: {
        email
      },
      password: {
        alphaNum,
        minLength: minLength(6)
      },
    }
  }
}
</script>

<style scoped>

</style>

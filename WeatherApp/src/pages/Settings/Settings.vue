<template>
  <q-page class="flex column backGroundApp">
    <div class="q-pa-md q-gutter-sm">
      <change-lang-button/>
      <br>
      <q-btn color="white" text-color="black" label="click" @click="logOut"/>
        log out
    </div>
  </q-page>
</template>

<script>
import {mapActions} from "vuex";
import ChangeLangButton from "components/ChangeLangButton/ChangeLangButton";

export default {
  name: "Settings",
  components: {ChangeLangButton},
  data() {
    return {}
  },
  methods: {
    ...mapActions("user" , ['signOut']),
    logOut(){
      const self = this
      this.signOut().then(() =>{
        self.$router.push({name: 'login'})
      })
    }
  }
}

</script>

<style scoped>

</style>

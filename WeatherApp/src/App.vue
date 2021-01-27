<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'App',
  computed : {
    ...mapState('user', ['settings']),
  },
  methods :{
    ...mapActions('user', ['getFromLocalStorage'])
  },
  created() {
    this.getFromLocalStorage('settings')
    this.getFromLocalStorage('user')
    this.getFromLocalStorage('mainLayOut')
    this.getFromLocalStorage('TaskFotter')
  }
}
</script>


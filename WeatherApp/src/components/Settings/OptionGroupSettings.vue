<template>
  <div>
    <q-option-group
      v-model="group"
      :options="options"
      color="primary"
    />
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "OptionGroupSettings",
  props:['options'],
  data(){
    return{

    }
  },
  computed: {
    ...mapState('user', ['settings']),
    ...mapState('vacations', ['vacation']),
    group: {
      get(){
        return this.settings.lang
      },
      set(options){
        this.changeLang(options)
        this.$i18n.locale = options;
        import('quasar/lang/' + options).then(lang => {
          this.$q.lang.set(lang.default)
          this.$router.push({name : 'sky-check' , params:{id:`${this.vacation.vacationID}`}})
        })
      }
    }
  },
  methods:{
    ...mapActions('user' , ['changeLang'])
  }
}
</script>

<style scoped>

</style>

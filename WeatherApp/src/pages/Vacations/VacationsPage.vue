<template>
  <q-page class="flex column backGroundApp">
    <h3 class="text-center text-white">{{ $t('vacationsList') }}</h3>
    <q-list
      v-if="vacations.length > 0"
      bordered separator class="q-ma-md">
      <div v-for="vacation in vacations">
      <slide-item :vacation="vacation"/>
        <q-separator/>
      </div>
    </q-list>
    <q-btn round size="lg"
           class="absolute-bottom-left q-ma-xs"
           icon="fas fa-plus"
           color="primary" @click="addVaction = true" />
    <q-dialog v-model="addVaction">
      <dailog-task/>
    </q-dialog>

  </q-page>
</template>

<script>
import DailogTask from "components/VacationsComponents/DailogTask";
import {mapActions, mapGetters, mapMutations ,mapState} from "vuex";
import SlideItem from "components/VacationsComponents/SlideItem";


export default {
  name: "VacationsPage",
  components: {SlideItem, DailogTask},
  data(){
    return{
      addVaction: false

    }
  },
  created() {
    this.$i18n.locale = this.settings.lang
    import('quasar/lang/' + this.settings.lang).then(lang => {
      this.$q.lang.set(lang.default)
    })
    if (this.vacations.length === 0) {
      this.$q.loading.show()
      this.getVacations().then(() =>{
        this.$q.loading.hide()
      })
    }
    if (this.mainLayOut){
      this.insertMainLayOut()
    }
  },
  computed : {
    ...mapGetters('vacations', ['vacations']),
    ...mapState('user', ['mainLayOut' , 'settings']),
  },
  methods: {
    ...mapActions('vacations', ['getVacations']),
    ...mapMutations("user" , ['insertMainLayOut']),
  },


}
</script>

<style scoped>

</style>

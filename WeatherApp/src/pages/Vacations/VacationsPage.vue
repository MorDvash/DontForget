<template>
  <q-page class="flex column backGroundApp">
    <h3 class="text-center text-white">{{ $t('vacationsList') }}</h3>
    <q-list
      v-if="vacations.length > 0"
       separator class="q-ma-md">
      <div v-for="vacation in vacations">
      <slide-item :vacation="vacation"/>
        <q-separator/>
      </div>
    </q-list>
    <div class="absolute-bottom">
      <div class="col">
    <q-btn round size="lg"
           class="relative-position q-ma-xs "
           icon="fas fa-plus"
           color="primary" @click="addVaction = true" />
    <q-dialog v-model="addVaction">
      <dailog-task/>
    </q-dialog>
      </div>
      <div class="col">
<search-bar :input-data="inputData"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import DailogTask from "components/VacationsComponents/DailogTask";
import {mapActions, mapGetters, mapMutations ,mapState} from "vuex";
import SlideItem from "components/VacationsComponents/SlideItem";
import SearchBar from "components/Inputs/SearchBar";


export default {
  name: "VacationsPage",
  components: {SearchBar, SlideItem, DailogTask},
  data(){
    return{
      addVaction: false,
      inputData: {
        bgColor: 'bg-primary text-white col',
        icon: 'search',
        label: this.$t('search'),
        function: 'search',
        color: 'white',
        labelColor: 'white'
      },
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
    this.resetStateTask()
  },
  computed : {
    ...mapGetters('vacations', ['vacations']),
    ...mapState('user', ['mainLayOut' , 'settings']),
  },
  methods: {
    ...mapActions('vacations', ['getVacations']),
    ...mapMutations("user" , ['insertMainLayOut']),
    ...mapMutations("vacations" , ['resetStateTask']),
  },


}
</script>

<style scoped>

</style>

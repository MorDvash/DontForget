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
import {mapActions, mapGetters, mapMutations} from "vuex";
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
    if (this.vacations.length === 0) {
      this.$q.loading.show()
      this.getVacations().then(() =>{
        this.$q.loading.hide()
      })
    }
    if (this.mainLayOut){
      this.insertMainLayOut(this.mainLayOut)
    }
  },
  computed : {
    ...mapGetters('vacations', ['vacations']),
    ...mapGetters('user', ['mainLayOut']),
  },
  methods: {
    ...mapActions('vacations', ['getVacations']),
    ...mapMutations("user" , ['insertMainLayOut']),
  }

}
</script>

<style scoped>

</style>

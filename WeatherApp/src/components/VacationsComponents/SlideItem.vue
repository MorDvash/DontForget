<template>
  <q-slide-item
    @left="onLeft"
    @right="onRight"
    left-color="red"
    right-color="primary">
    <template v-slot:left>
      <div class="row items-center">
        <q-icon left name="delete"/>
        {{ $t('delete') }}
      </div>
    </template>
    <template v-slot:right>
      <div class="row items-center">
        {{ $t('goTo') }}
        <q-icon v-if="settings.lang === 'en-us'" right name="fas fa-arrow-right"/>
        <q-icon v-else right name="fas fa-arrow-left"/>
      </div>
    </template>

    <q-item>
      <q-item-section avatar>
        <q-icon color="primary" name="place"/>
      </q-item-section>
      <q-item-section> {{ vacation.placeName }}</q-item-section>
      <q-item-section> {{ vacation.rangeDate.from | niceDate }}-{{ vacation.rangeDate.to | niceDate }}</q-item-section>
    </q-item>
  </q-slide-item>

</template>

<script>
import {mapActions, mapGetters , mapMutations} from "vuex";
import {date} from "quasar";

export default {
  name: "SlideItem",
  props: ['vacation'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters('user', ['settings' , 'mainLayOut']),
    ...mapGetters('vacations', ['vacations']),

  },
  methods: {
    ...mapActions('vacations', ['deleteVacation']),
    ...mapMutations("vacations" , ['setVacation']),
    ...mapMutations("user" , ['insertMainLayOut']),
    onLeft({reset}) {
      this.$q.dialog({
        title: this.$t('alert'),
        message: this.$t('sure'),
        cancel: true,
      }).onOk(() => {
        this.$q.notify({
          message:this.$t('deleted'),
          icon: 'delete',
          color: 'red',
        })
        this.deleteVacation(this.vacation.vacationID)
        this.finalize(reset)
      }).onCancel(() => {
        this.finalize(reset)
      })
    },

    onRight() {
      this.insertMainLayOut()
      this.setVacation(this.vacation)
        this.$router.push({name : 'sky-check' , params:{id:`${this.vacation.vacationID}`}}).catch(()=>{});
    },
    finalize(reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 300)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  filters:{
    niceDate(value){
      return date.formatDate(value , 'DD/MM/YY')
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <q-page class="flex column backGroundApp">
    <h3 class="text-center text-white"> {{ $t('CheckList') }}</h3>
    <div v-for="list in lists" class="row">
      <q-btn class="q-my-md"
             color="primary"
             :icon="list.icon"
             :label="list.title"
             @click="goToTaks(list.key , list.query)"
      />
    </div>
  </q-page>
</template>

<script>
import {mapState ,mapActions} from "vuex";

export default {
  name: "TodoList",
  data() {
    return {
      lists: [
        {
          title: this.$t('SkiEquipment'),
          key: 'SkiEquipment',
          icon: 'fas fa-snowboarding',
          query:this.$t('SkiEquipment')
        },
        {
          title: this.$t('clothing'),
          key: 'clothing',
          icon: 'fas fa-tshirt',
          query:this.$t('clothing')
        },
        {
          title: this.$t('BathroomUtensils'),
          key: 'BathroomUtensils',
          icon: 'fas fa-sink',
          query:this.$t('BathroomUtensils')
        },
        {
          title: this.$t('general'),
          key: 'general',
          icon: 'settings_ethernet',
          query:this.$t('general'),
        },
        {
          title: this.$t('FlightEquipment'),
          key: 'FlightEquipment',
          icon: 'flight_takeoff',
          query:this.$t('FlightEquipment'),
        },
      ]
    }
  },
  created(){
    if(this.mainLayOut === false)
    this.fotterStatus('mainLayOut')
  },
  computed: {
    ...mapState('vacations', ['vacation']),
    ...mapState('user', ['mainLayOut']),
  },
  methods: {
    ...mapActions('user',['fotterStatus']),
    goToTaks(key , query) {
      this.$router.push({ name : 'task' ,
        params:{ id : this.$route.params.id , key : key} ,
        query: { sort : query} })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

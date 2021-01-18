<template>
  <q-page class="flex column backGroundApp">
    <h3 class="text-center text-white"> {{ $t('CheckList') }}</h3>
    <div v-for="list in lists" class="row">
      <q-btn class="q-my-md"
             color="primary"
             :icon="list.icon"
             :label="list.title"
             @click="goToTaks(list.key)"
      />
    </div>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TodoList",
  data() {
    return {
      lists: [
        {
          title: this.$t('SkiEquipment'),
          key: 'SkiEquipment',
          icon: 'fas fa-snowboarding',
        },
        {
          title: this.$t('clothing'),
          key: 'clothing',
          icon: 'fas fa-tshirt',
        },
        {
          title: this.$t('BathroomUtensils'),
          key: 'BathroomUtensils',
          icon: 'fas fa-sink',
        },
        {
          title: this.$t('general'),
          key: 'general',
          icon: 'settings_ethernet',
        },
        {
          title: this.$t('FlightEquipment'),
          key: 'FlightEquipment',
          icon: 'flight_takeoff',
        },
      ]
    }
  },

  computed: {
    ...mapGetters('vacations', ['vacation']),
  },
  methods: {
    goToTaks(key) {
      this.$router.push(`${this.vacation.vacationID}/tasks/${key}`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <q-footer
            bordered class="bg-white text-primary ">
    <addTask />
    <q-tabs
      no-caps
      dense
      class="bg-grey-2 text-primary"
      bg-grey-2 text-primary
    >
      <q-btn
        class="col"
        v-for="link in essentialLinks"
        :key="link.key"
        :icon="link.icon"
        @click="goto(link.link)"
      />
    </q-tabs>
  </q-footer>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import addTask from "components/Inputs/addTask";

export default {
  name: "LayOutForMobile",
  components: {addTask},
  data() {
    return {
      essentialLinks: [
        {
          title: this.$t('skyList'),
          caption: '',
          key: 'sky',
          icon: 'fas fa-list-ul',
          link: `/sky-check`
        },
        {
          title: this.$t('Weather'),
          caption: '',
          key: 'weather',
          icon: 'fas fa-cloud-sun',
          link: `/weather`
        },
        {
          title: this.$t('Setting'),
          caption: '',
          key: 'Settings',
          icon: 'settings',
          link: '/setting'
        },
      ],
    }
  },
  computed: {
    ...mapState('vacations' , ['vacation']),
    },
    methods:{
      goto(link){
        this.$router.push(`${link}/${this.vacation.vacationID}`)
      }
    }
}
</script>

<style scoped>

</style>

<template>
  <q-input v-if="TaskFotter"
           class="bg-primary text-white"
           color="white"
           label-color="white"
           clearable
           rounded
           outlined
           v-model="searcField"
           :label="$t('search')"
           @keyup.esc="searcField = ''"
  >
    <template v-slot:append>
      <q-icon
        name="search"
        color="white"
        class="cursor-pointer"/>
    </template>
  </q-input>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import InputText from "components/Inputs/InputText";

export default {
  name: "SearchBar",
  components: {InputText},
  data(){
    return{}
  },
  computed:{
    ...mapGetters('user', ['TaskFotter']),
    ...mapState('vacations', ['search']),
    searcField : {
      get(){
       return  this.search
      },
      set(value){
        this.instertSearch(value)
      }
    }
  },
  methods:{
    ...mapMutations('vacations', ['instertSearch']),
  }
}
</script>

<style scoped>

</style>

<template>
  <q-input :class="inputData.bgColor"
           :color="inputData.color"
           :label-color="inputData.labelColor"
           clearable
           rounded
           outlined
           v-model="searcField"
           :label="inputData.label"
           @keyup.esc="searcField = ''"
  >
    <template v-slot:append>
      <q-icon
        :name="inputData.icon"
        :color="inputData.color"

        class="cursor-pointer"/>
    </template>
  </q-input>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import InputText from "components/Inputs/InputText";

export default {
  name: "SearchBar",
  props:['inputData'],
  components: {InputText},
  data(){
    return{}
  },
  computed:{
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

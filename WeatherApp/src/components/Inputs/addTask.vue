<template>
  <q-form @submit="action">
<input-text :inputData="inputData" :task-fotter="TaskFotter"/>
  </q-form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import InputText from "components/Inputs/InputText";

export default {
  name: "InputModolari",
  components: {InputText},
  data(){
    return{
      inputData: {
        input: '' ,
        bgColor: 'bg-grey-2 text-primary',
        icon: 'add',
        label: this.$t('addTasks'),
        color: 'primary',
        labelColor: 'primary'
      },
    }
  },
  computed:{
    ...mapGetters('user', ['TaskFotter']),
  },
  methods: {
    ...mapActions('vacations', ["addTaskAction"]),
    action(){
          this.$q.loading.show()
          this.addTaskAction({nameTask : this.inputData.input , nameTasks: this.$route.params}).then(() =>{
            debugger
            this.inputData.input = ''
            this.$q.loading.hide()
        })
      }
    },
}
</script>

<style scoped>

</style>

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
      this.$q.notify({
        message:this.$t('addTask'),
        icon: 'done',
        color: 'primary',
        timeout:'1000'
      })
          this.addTaskAction({nameTask : this.inputData.input , nameTasks: this.$route.params}).then(() =>{
            this.inputData.input = ''
        })
      }
    },
}
</script>

<style scoped>

</style>

<template>
  <q-btn
    @click.stop="deleted(task)"
    flat round
    color="red"
    icon="delete"/>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "DeleteBtn",
  props:['task'],
  data(){
    return{}
  },
  methods:{
    ...mapActions('vacations', ['deleteTask']),
    deleted(task) {
      this.$q.dialog({
        title: this.$t('deletethisTask'),
        message: this.$t('areYouSure'),
        cancel: true,
        position: 'bottom'
      }).onOk(() => {
        this.$q.notify({
          message:this.$t('deletedTask'),
          icon: 'delete',
          color: 'red',
          timeout:'1000'
        })
        this.deleteTask({
          task: task,
          nameTasks: this.$route.params, nameCompleted: this.$route.query
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

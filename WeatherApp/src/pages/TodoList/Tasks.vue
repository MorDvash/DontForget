<template>
  <q-page>
    <CheckBox :tasks="tasks" @deleteTa="updateTask($event)"/>
  </q-page>
</template>

<script>
import CheckBox from "components/Tasks/CheckBox";
import {mapActions} from "vuex";

export default {
  name: "Tasks",
  components: {CheckBox},
  data() {
    return {
      tasks:{}
    }
  },
  created() {
    this.$q.loading.show()
   this.getTasks(this.$route.params).then((result) =>{
     this.tasks = result
     this.$q.loading.hide()
   })
  },
  methods: {
    ...mapActions('vacations', ['getTasks']),
    updateTask(e){
      this.tasks = e
    }
  }
}
</script>

<style scoped>

</style>

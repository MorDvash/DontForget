<template>
  <q-page class="flex column backGroundApp">
    <q-tabs
      v-model="tab"
      active-color="white"
      class="bg-primary text-grey-5 shadow-2 flex column"
      align="justify"
      :breakpoint="0"
    >
      <q-tab no-caps name="Tasks" :label="$t('Tasks')"/>
      <q-tab no-caps name="Completed Tasks" :label="$t('CompletedTasks')"/>
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="Tasks">
        <CheckBox :tasks="tasks"
                  :TaskFotterInput="complete"
                  :complete="complete"
                  transition="complete"
                 />
      </q-tab-panel>

      <q-tab-panel name="Completed Tasks">
        <CheckBox :tasks="completedTask"
                  transition="tasks"
                 />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import CheckBox from "components/Tasks/CheckBox";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import DailogTask from "components/VacationsComponents/DailogTask";

export default {
  name: "Tasks",
  components: {DailogTask, CheckBox},
  data() {
    return {
      tab: 'Tasks',
      taskName: this.$route.params.key,
      complete:true,
      tempTasks: {},
    }
  },
  beforeDestroy() {
    this.insertAddTask()
    this.updateTasks({taskCompleted: this.tempTasks, params: this.$route.params, taskName: this.taskName})
  },
  created() {
    this.insertAddTask()
    this.$q.loading.show()
    this.getTasks({params: this.$route.params, tasksCompleted: this.$route.query})
      .then((result) => {
        this.tempTasks = result
        this.$q.loading.hide()
      })
  },
  computed :{
    ...mapGetters('vacations', ['tasksTodo','tasksCompleted']),
    tasks(){
      return this.tasksTodo(this.$route.params)
    },
    completedTask(){
      return this.tasksCompleted(this.$route.params)
    }
  },
  methods: {
    ...mapMutations('user',['insertAddTask']),
    ...mapActions('vacations', ['getTasks', 'updateTasks']),
  }
}
</script>

<style scoped>
.q-tab-panel {
  padding: 0px;
}
</style>

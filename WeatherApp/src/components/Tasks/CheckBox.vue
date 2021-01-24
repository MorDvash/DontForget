<template>
  <q-page class="flex column backGroundApp">
<!--    <edit-task @trunToFalse="d" :popup="popup" style="display: none"/>-->
    <banner :title="title"/>
    <SearchBar/>
    <transition
      appear
      enter-active-class="animated fadeInLeftBig"
    >
    <banner class="q-mt-lg" v-if="tasks.length === 0 && complete && !search" :title="Completed"/>
    <banner class="q-mt-lg" v-if="tasks.length === 0 && search" :title="noSearch"/>
    </transition>

    <q-list class="text-white" separator bordered>
      <q-item
        v-for="task in tasks"
        :key="task.taskID"
        @click="taskTransition(task)"
        clickable
        v-ripple>
        <q-item-section side top>
          <q-checkbox
            class="no-pointer-events"
            :value="task.completed"/>
        </q-item-section>
        <!--        v-touch-hold:1000.mouse="edit(task)"-->
        <q-item-section>
          <q-item-label :class="{'text-strikethrough' : task.completed}">
            {{ task.nameTask }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <delete-btn :task="task"/>
        </q-item-section>
      </q-item>
    </q-list>

  </q-page>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import Banner from "components/Banner/Banner";
import SearchBar from "components/Inputs/SearchBar";
import EditTask from "components/Tasks/EditTask";
import DeleteBtn from "components/Tasks/DeleteBtn";

export default {
  name: "Task",
  components: {DeleteBtn, EditTask, SearchBar, Banner},
  props: ['tasks', 'complete', 'transition', 'TaskFotterInput'],
  data() {
    return {
      popup: {
        status: false
      },
      title: {
        msg: this.$route.query.sort,
        bgColor: 'bg-primary'
      },
      Completed: {
        msg: this.$t('noTasks'),
        bgColor: 'bg-green',
        icon: 'check'
      },
      noSearch: {
        msg: this.$t('noSearch'),
        bgColor: 'bg-grey-8',
        icon: 'error'
      }
    }
  },
  computed: {
    ...mapGetters('user', ['TaskFotter']),
    ...mapState('vacations', ['search'])
  },
  methods: {
    ...mapActions('vacations', ['deleteTask', 'completedTask',]),
    ...mapMutations('vacations', ['editTask']),
    d() {
      this.popup = false
    },
    edit(task) {
      this.popup.task = task
      this.popup.status = true
    },
    taskTransition(task) {
      this.completedTask({
        transition: this.transition,
        task: task,
        nameTasks: this.$route.params,
        nameCompleted: this.$route.query
      })
    },
  },
}
</script>

<style scoped>

</style>

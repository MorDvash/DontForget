<template>
  <q-page class="flex column backGroundApp">
    <div class="q-pa-md ">
      <q-list class="text-white" separator bordered >
        <q-item-label class="text-white" header>{{ $route.params.key }}</q-item-label>
        <q-item
          v-for="task in tasks"
          :key="task.taskID"
          @click="completed(task)"
          clickable
          v-ripple >
          <q-item-section side top>
            <q-checkbox
              class="no-pointer-events"
              :value="task.completed" />
          </q-item-section>

          <q-item-section>
            <q-item-label :class="{'text-strikethrough' : task.completed}">
              {{ task.nameTask}}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              @click.stop="deleted(task)"
              flat round
              color="red"
              icon="delete" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "Task",
  props :['tasks'],
  data() {
    return {
      right: false
    }
  },

  methods: {
    ...mapMutations('vacations' , ['taskCompleted']),
    ...mapActions('vacations' , ['deleteTask']),
    completed(task){
      this.taskCompleted({ task : task , nameTasks : this.$route.params.key})
    },
    deleted(task){
      this.deleteTask({ task : task , nameTasks : this.$route.params.key}).then((result) =>{
        this.$emit('deleteTa' , result)
      })
    }
  },
}
</script>

<style scoped>

</style>

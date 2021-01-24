import firebaseApi from "src/middleware/firebaseApi";
import firestoreRefs from "src/middleware/firesoreRefs";
import { uid } from 'quasar'

export default {

  InsertVacation: async ({commit}, vacation) => {
    const vacationInfo = await firebaseApi.createNewVacation(vacation)
    commit('setVacations', vacationInfo.data)
  },
  getVacations: async ({commit, rootState}) => {
    const colVactions = await firebaseApi.getDocument(firestoreRefs.vacationsRef(rootState.user.user.uid))
    colVactions.forEach(doc => {
      const vacation = {...doc.data()};
      commit('setVacations', vacation)
    })
  },
  deleteVacation: async ({commit}, vacationId) => {
    commit('deleteVacation', vacationId)
    await firebaseApi.DeleteVacationFunction(vacationId)
  },
  getTasks: async ({commit, rootState, state}, data) => {
    if (state[data.params.key].length === 0) {
      const colTasks = await firebaseApi.getDocument(firestoreRefs.tasksRef(data.params, rootState.user.user.uid))
      colTasks.forEach(doc => {
        const tasks = {...doc.data()};
        commit('setTasks',{tasks: tasks, nameTask: data.params.key})
      })
    }
    return state[data.params.key]
  },
  deleteTask: async ({commit, state, rootState}, data) => {
    firebaseApi.deleteDocument(firestoreRefs.taskRef(data, rootState.user.user.uid))
    await commit('deleteTask', data)
  },
  completedTask: async ({commit, state , rootState}, data) => {
    switch (data.transition) {
      case 'complete' : {
        await commit('taskCompleted', data)
     break
      }
      case 'tasks':{
          await commit('taskUnCompleted', data)
          firebaseApi.updateDocument(firestoreRefs.taskRef(data, rootState.user.user.uid), data.task)
        break
      }
    }
  },
  updateTasks: async ({commit}, completedTasks) => {
    await firebaseApi.updateTasks(completedTasks)
  },
    addTaskAction: async ({commit,rootState} , taskData) =>{
      let id = uid()
      const task = {
        nameTask : taskData.nameTask,
        taskID : id,
        completed : false
      }
      taskData.task = task
       firebaseApi.setDocument(firestoreRefs.taskRef(taskData, rootState.user.user.uid) , task)
      commit('instertTask' , taskData)
    }
}

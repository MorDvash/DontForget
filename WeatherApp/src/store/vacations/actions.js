import firebaseApi from "src/middleware/firebaseApi";
import firestoreRefs from "src/middleware/firesoreRefs";
import {uid} from 'quasar'

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
    if (state[data.key].length === 0) {
      let arryTask = []
      const colTasks = await firebaseApi.getDocument(firestoreRefs.taskRef(data, rootState.user.user.uid))
      colTasks.forEach(doc => {
        const tasks = {...doc.data()};
        arryTask.push(tasks)
        commit('setTasks', {tasks: tasks, nameTask: data.key})
      })
      return arryTask
    } else {
      return state[data.key]
    }
  },
  deleteTask : async ({commit , state} , data) =>{
   await commit('deleteTask' , data)
    return await state[data.nameTasks]
  }
}

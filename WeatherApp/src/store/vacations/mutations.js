import Vue from 'vue'

export default {
  setVacations: (state, vacation) => {
    state.vacations.push(vacation)
  },
  setTasks: (state, { tasks ,nameTask}) => {
    state[nameTask].push(tasks)
  },
  deleteVacation : (state, vacationId) => {
    const index = state.vacations.findIndex(p => p.vacationID === vacationId)
    Vue.delete(state.vacations , index)
},
  setVacation: (state, vacation) => {
    state.vacation = vacation
  },
  taskCompleted: (state , {task , nameTasks}) =>{
    const index = state[nameTasks].findIndex(p => p.taskID === task.taskID)
    state[nameTasks][index].completed = true
  },
  deleteTask : (state , data) =>{
    const index = state[data.nameTasks].findIndex(p => p.taskID === data.task.taskID)
    Vue.delete(state[data.nameTasks] , index)
  }
}

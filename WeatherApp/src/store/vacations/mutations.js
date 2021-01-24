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
    const index = state[nameTasks.key].findIndex(p => p.taskID === task.taskID)
    state[nameTasks.key][index].completed = true
  },
  taskUnCompleted: (state , {task , nameTasks}) =>{
    const index = state[nameTasks.key].findIndex(p => p.taskID === task.taskID)
    state[nameTasks.key][index].completed = false
  },
  deleteTask : (state , data) =>{
    let index = state[data.nameTasks.key].findIndex(p => p.taskID === data.task.taskID)
    Vue.delete(state[data.nameTasks.key] , index)
  },
  instertTask: (state, taskData) => {
    state[taskData.nameTasks.key].push(taskData.task)
  },
  instertSearch: (state, search) => {state.search = search},
  editTask: (state, search) => {state.addTask = search},

}

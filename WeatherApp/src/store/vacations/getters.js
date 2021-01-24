export default {
  vacations : (state) =>{
    return state.vacations
  },
  vacation : (state) =>{
    return state.vacation
  },
  tasks : (state) =>{
    return state.tasks
  },
  tasksFiltered: (state) => (data) => {
    let tasksFiltered = []
    if (state.search) {
      state[data.key].filter(task => {
         let taskNameLowerCase = task.nameTask.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered.push(task)
        }
      })
      return tasksFiltered
    }
    return state[data.key]
  },
  tasksTodo: (state , getters) => (data) => {
    let tasksFiltered = getters.tasksFiltered(data)
    return tasksFiltered.filter(task => !task.completed)
  },
  tasksCompleted: (state) => (data) => {
    return state[data.key].filter(task => task.completed)
  }

}

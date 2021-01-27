export default {
  vacationsFiltered: (state) =>{
    let tasksFiltered = []
    if (state.search) {
      state.vacations.filter(vacation => {
        let taskNameLowerCase = vacation.placeName.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered.push(vacation)
        }
      })
      return tasksFiltered
    }
    return state.vacations
  },
  vacations : (state , getters) =>{
    let tasksFiltered = getters.vacationsFiltered
    return tasksFiltered
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

export default {
  insertState (state , userInfo) {
    for (const key in userInfo) {
      if (userInfo.hasOwnProperty(key)) {
        for (const key2 in userInfo[key]) {
          if (userInfo[key].hasOwnProperty(key2))
            state[key][key2] = userInfo[key][key2];
        }
      }
    }
  },
  insertMainLayOut: (state) => state.mainLayOut= !state.mainLayOut,
  insertAddTask: (state) => state.TaskFotter= !state.TaskFotter,
}

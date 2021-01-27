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
  insertFotterStatus: (state , stateName) => {
    state[stateName] = !state[stateName]
  },
  changeLang:(state , lang) => state.settings.lang = lang,
  insertStateFronLocalStorage:(state , data) => Object.assign(state[data.stateName] , data.value)
}

export default function reducer (state, action) {
  switch (action.type){
    case "TEAM": {
      return Object.assign({}, state, {selectedTeam: action.data})
    }

    default: {
      return state
    }
  }
}

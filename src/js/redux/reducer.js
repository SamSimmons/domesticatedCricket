export default function reducer (state, action) {
  switch (action.type){
    case "CHANGE_TEAM": {
      return Object.assign({}, state, {selectedTeam: action.data})
    }

    case "CHANGE_PLAYER": {
      return Object.assign({}, state, {selectedPlayer: action.name})
    }

    default: {
      return state
    }
  }
}

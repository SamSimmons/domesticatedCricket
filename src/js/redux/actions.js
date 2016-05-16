export function changeTeam(data) {
  return {
    type: "CHANGE_TEAM",
    data
  }
}

export function changePlayer(name) {
  return {
    type: "CHANGE_PLAYER",
    name
  }
}

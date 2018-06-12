const state = {
  droppingList: null,
  draggingCard: null,
};

const mutations = {
  setDroppingList: (state, droppingList) => state.droppingList = droppingList,
  setDraggingCard: (state, draggingCard) => state.draggingCard = draggingCard,
};

export default {
  namespaced: true,
  state,
  mutations,
};

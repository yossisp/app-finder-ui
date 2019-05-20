const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    console.log(`serializedState=${serializedState}`);
  } catch (err) {
    console.error(err);
  }
};

export {
  loadState,
  saveState
};

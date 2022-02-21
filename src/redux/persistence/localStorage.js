/******* Provides the getter and setter function for the localstorage - persisted values ********/

export const loadState = () => {
  //Load from local storage
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  //save to local storage
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};

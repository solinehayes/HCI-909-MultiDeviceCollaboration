const initialState = {
  postits: [], // List of post-its to draw
  index: 1, // Next available post-it id
  copied: false, // If the post-it already created before connection were copied to the new connected device
};

export const modifyPostit = (state = initialState, action) => {
  /***
    Function that modifies the post-it list state according to the action type
  ***/
  let nextState;
  switch (action.type) {
    case 'ADD_POSTIT':
      // Add a new post-it (the action's value) to the list and increment the index
      if (state.postits.findIndex((item) => item.id == action.value.id) == -1) {
        nextState = {
          ...state,
          postits: [...state.postits, action.value],
          index: state.index + 1,
        };
      }
      return nextState || state;

    case 'MOVE_POSTIT':
      // Move a post-it :
      // Create a new post-it with the new position values
      // Remove the old post-it from the list and add the new one
      const postitIndex_m = state.postits.findIndex(
        (item) => item.id === action.value.id,
      );
      const postit_m = state.postits[postitIndex_m];
      const newPostIt_m = {
        id: action.value.id,
        text: postit_m.text,
        topPos: action.value.topPos,
        leftPos: action.value.leftPos,
        squareSize: postit_m.squareSize,
        color: postit_m.color,
      };
      nextState = {
        ...state,
        postits: [
          ...state.postits.filter((item, index) => index != postitIndex_m),
          newPostIt_m,
        ],
      };
      return nextState || state;

    case 'RESIZE_POSTIT':
      // Resize a post-it :
      // Create a new post-it with the new size value
      // Remove the old post-it from the list and add the new one
      const postitIndex_r = state.postits.findIndex(
        (item) => item.id === action.value.id,
      );
      const postit_r = state.postits[postitIndex_r];
      const newPostIt_r = {
        id: postit_r.id,
        text: postit_r.text,
        topPos: postit_r.topPos,
        leftPos: postit_r.leftPos,
        squareSize: action.value.newSquareSize,
        color: postit_r.color,
      };
      nextState = {
        ...state,
        postits: [
          ...state.postits.filter((item, index) => index != postitIndex_r),
          newPostIt_r,
        ],
      };
      return nextState || state;

    case 'CHANGE_TEXT':
      // Change a post-it's text :
      // Create a new post-it with the new text value
      // Remove the old post-it from the list and add the new one
      const postitIndex_t = state.postits.findIndex(
        (item) => item.id === action.value.id,
      );
      const postit_t = state.postits[postitIndex_t];
      const newPostIt_t = {
        id: action.value.id,
        text: action.value.newText,
        topPos: postit_t.topPos,
        leftPos: postit_t.leftPos,
        squareSize: postit_t.squareSize,
        color: postit_t.color,
      };
      nextState = {
        ...state,
        postits: [
          ...state.postits.filter((item, index) => index != postitIndex_t),
          newPostIt_t,
        ],
      };
      return nextState || state;
    case 'REMOVE_LAST':
      // Remove last list element
      nextState = {
        ...state,
        postits: state.postits.slice(0, state.postits.length - 1),
      };
      return nextState || state;

    case 'SET_COPIED_TRUE':
      nextState = {
        ...state,
        copied: true,
      };
      return nextState || state;

    default:
      return state;
  }
};

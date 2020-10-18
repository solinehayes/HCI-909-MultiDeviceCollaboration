import {theme} from '../../../theme';

// Deuxième post it pour le test
const initialState = {postits: [], index: 1, copied: false};

export const modifyPostit = (state = initialState, action) => {
  let nextState;
  switch(action.type){
    case 'ADD_POSTIT':
      if (state.postits.findIndex(item=>item.id == action.value.id)==-1){
        nextState = {
          ...state,
          postits : [...state.postits, action.value],
          index : state.index+1
        };
      }
      return nextState || state;

    case 'MOVE_POSTIT':
      const postitIndex_m = state.postits.findIndex(item=>item.id === action.value.id);
      // Récupérer les propriétés du post it à bouger
      const postit_m = state.postits[postitIndex_m];
      // Supprimer le post it et en créer un nouveau
      const newPostIt_m = {id: action.value.id, text: postit_m.text, topPos: action.value.topPos, leftPos: action.value.leftPos, squareSize : postit_m.squareSize, color: postit_m.color};
      nextState = {
        ...state,
        postits: [...state.postits.filter((item, index) => index!=postitIndex_m), newPostIt_m]
      };
      return nextState || state;

    case 'RESIZE_POSTIT':
      const postitIndex_r = state.postits.findIndex(item=>item.id === action.value.id);
      // Récupérer les propriétés du post it à redimensionner
      const postit_r = state.postits[postitIndex_r];
      // Supprimer le post it et en créer un nouveau
      const newPostIt_r = {id: postit_r.id, text: postit_r.text, topPos: postit_r.topPos, leftPos: postit_r.leftPos, squareSize : action.value.newSquareSize, color: postit_r.color};
      nextState = {
        ...state,
        postits: [...state.postits.filter((item, index) => index!=postitIndex_r), newPostIt_r]
      };
      return nextState || state;

    case 'CHANGE_TEXT':
      const postitIndex_t = state.postits.findIndex(item=>item.id === action.value.id);
      // Récupérer les propriétés du post it dont on change le texte
      const postit_t = state.postits[postitIndex_t];
      // Supprimer le post it et en créer un nouveau
      const newPostIt_t = {id: action.value.id, text: action.value.newText, topPos: postit_t.topPos, leftPos: postit_t.leftPos, squareSize : postit_t.squareSize, color: postit_t.color};
      nextState = {
        ...state,
        postits: [...state.postits.filter((item, index) => index!=postitIndex_t), newPostIt_t]
      };
      return nextState || state;
    case 'REMOVE_LAST':
        nextState = {
          ...state,
          postits: state.postits.slice(0, state.postits.length-1)
        };
    return nextState || state;

    case 'SET_COPIED_TRUE':
      nextState = {
        ...state,
        copied: true
      };
      return nextState || state;

    default:
      return state;
  }
};
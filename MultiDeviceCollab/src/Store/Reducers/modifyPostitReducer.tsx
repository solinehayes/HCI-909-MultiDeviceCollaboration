import {theme} from '../../../theme';

// Deuxième post it pour le test
const initialState = {postits: [{id: 1, text: 'post-it 1', topPos: 100, leftPos: 100, squareSize: 100, color: theme.postItColors[0]},
                                {id: -1, text: 'post-it 1 bis', topPos: 100, leftPos: -260, squareSize: 100, color: theme.postItColors[0]}]};

export const modifyPostit = (state = initialState, action) => {
  let nextState;
  switch(action.type){
    case 'ADD_POSTIT':
      nextState = {
        ...state,
        postits : [...state.postits, action.value]
      };
      return nextState || state;
    case 'MOVE_POSTIT':
      const postitIndex_m = state.postits.findIndex(item=>item.id === action.value.id);
      // Récupérer les propriétés du post it à bouger
      const postit_m = state.postits[postitIndex_m];
      const newTopPos = action.value.newTopPos;
      const newLeftPos = action.value.newLeftPos;
      // Supprimer le post it et en créer un nouveau
      const newPostIt_m = {id: action.value.id, text: postit_m.text, topPos: newTopPos, leftPos: newLeftPos, squareSize : postit_m.squareSize, color: postit_m.color};
      nextState = {
        ...state,
        postits: [...state.postits.filter((item, index) => index!=postitIndex_m), newPostIt_m]
      };
      return nextState || state;
    case 'RESIZE_POSTIT':
      const postitIndex_r = state.postits.findIndex(item=>item.id === action.value.id);
      // Récupérer les propriétés du post it à redimensionner
      const postit_r = state.postits[postitIndex_r];
      const newSquareSize = postit_r.squareSize*action.value.resizeFactor;
      // Supprimer le post it et en créer un nouveau
      const newPostIt_r = {id: postit_r.id, text: postit_r.text, topPos: postit_r.topPos, leftPos: postit_r.leftPos, squareSize : newSquareSize, color: postit_r.color};
      nextState = {
        ...state,
        postits: [...state.postits.filter((item, index) => index!=postitIndex_r), newPostIt_r]
      };
      return nextState || state;
    default:
      return state;
  }
};

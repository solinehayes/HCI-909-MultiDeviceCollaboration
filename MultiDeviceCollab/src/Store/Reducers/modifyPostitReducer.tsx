import {theme} from '../../../theme';

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
      const postitIndex = state.postits.findIndex(item=>item.id === action.value.id);
      // Récupérer les propriétés du post it à bouger
      const postit = state.postits[postitIndex];
      const id = action.value.id;
      const text = postit.text;
      const newTopPos = postit.topPos + action.value.moveTop;
      const newLeftPos= postit.leftPos + action.value.moveLeft;
      const squareSize = postit.squareSize;
      const color = postit.color;
      // Supprimer le post it et en créer un nouveau
      const newPostIt = {id: id, text: text, topPos: newTopPos, leftPos: newLeftPos, squareSize : squareSize, color: color};
      nextState = {
        ...state,
        postits: [...state.postits.filter((item, index) => index!=postitIndex), newPostIt]
      };
      return nextState || state;
    default:
      return state;
  }
};

import produce from 'immer';

const INITIAL_STATE = {
  id: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.id = action.payload.id;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.id = null;
        break;
      }
      default:
    }
  });
}

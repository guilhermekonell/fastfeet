import produce from 'immer';

const INITIAL_STATE = {
  deliveryman: {},
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.deliveryman = action.payload.deliveryman;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.deliveryman = {};
        break;
      }
      default:
    }
  });
}

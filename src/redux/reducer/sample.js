import { ADD_RECORD , DELETE_RECORD, UPDATE_RECORD, PER_PAGE} from "../actionTypes";

const initialState = {
  users: [],
  perpage:10
};

const record = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECORD: {

      initialState.users.unshift(action.payload);
      return {
        ...initialState,
      };
    }
    case DELETE_RECORD: {
      const delrecord = initialState.users.filter(ele => ele.userId !== action.payload.userId);
      initialState.users = delrecord;
      return {
        ...initialState,
      };
    }
    case UPDATE_RECORD: {
      const rowIndex = initialState.users.findIndex(ele => ele.userId === action.payload.user.userId);
      initialState.users[rowIndex] = action.payload.user;
      return {
        ...initialState,
      };
    }
    case PER_PAGE: {
      initialState.perpage = action.payload.perpage;
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }

  }
};

export default record;
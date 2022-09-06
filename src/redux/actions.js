import { ADD_RECORD , DELETE_RECORD , UPDATE_RECORD, PER_PAGE} from "./actionTypes";


let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_RECORD,
  payload: {
    id: ++nextTodoId,
    ...content
  },
});

export const delTodo = content => ({
  type: DELETE_RECORD,
  payload: {
    userId:content
  }
});

export const updateTodo = content => ({
  type: UPDATE_RECORD,
  payload: {
    user : content
  },
});

  export const pageTodo = content => ({
    type: PER_PAGE,
    payload: {
      perpage : content
    }
});
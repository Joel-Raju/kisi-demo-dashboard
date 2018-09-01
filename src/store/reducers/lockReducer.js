import { 
  FETCHING_LOCKS_SUCCESS,
  FETCHING_LOCKS_IN_PROGRESS,
  FETCHING_LOCKS_FAILED,
  ADD_TO_UNLOCK_QUEUE,
  REMOVE_FROM_UNLOCK_QUEUE,
  UPDATE_LOCK_ITEM,
} from '../actionTypes';

const INITIAL_STATE = {
  locksList: [],
  fetchingLocks: {
    success: false,
    error: false, 
    inProgress: false,
  },
  unlockQueue: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case FETCHING_LOCKS_SUCCESS: 
      return {...state, locksList: action.payload, 
        fetchingLocks: { 
          success: true,
          error: false,
          inProgress: false, 
        } 
      };

    case FETCHING_LOCKS_IN_PROGRESS:
      return {
        ...state, 
        fetchingLocks: { 
          success: false,
          error: false,
          inProgress: true,
        }
      };

    case FETCHING_LOCKS_FAILED:
      return {
        ...state, 
        fetchingLocks: {
          success: false,
          error: true,
          inProgress: false,
        }
      };

    case UPDATE_LOCK_ITEM:
      return { ...state, 
        locksList: state.locksList.map(lock => {
          if (lock.id === action.payload.lock.id) {
            return action.payload.lock;
          }
          return lock;
        })
      };

    case ADD_TO_UNLOCK_QUEUE:
      return { ...state,
        unlockQueue: { ...state.unlockQueue, [action.payload.lockId]: action.payload.status }
      };

    case REMOVE_FROM_UNLOCK_QUEUE:
      return { ...state,
        unlockQueue: { ...state.unlockQueue, [action.payload.lockId]: undefined }
      };
    
    default: 
      return state;
  }
}
import Kisi from 'kisi-client';
import {
  FETCHING_LOCKS_SUCCESS,
  FETCHING_LOCKS_FAILED,
  FETCHING_LOCKS_IN_PROGRESS,
  ADD_TO_UNLOCK_QUEUE,
  REMOVE_FROM_UNLOCK_QUEUE,
  UPDATE_LOCK_ITEM,
} from '../actionTypes';
import { 
  UNLOCK_IN_PROGRESS, 
  UNLOCK_FAILED,
  UNLOCK_SUCCESS,
} from '../constants';

const kisiClient = new Kisi();
kisiClient.setLoginSecret('94c2056abb993b570517f2d3a89c9b5a');

const setLocks = locks => ({
  type: FETCHING_LOCKS_SUCCESS,
  payload: locks,
});

const fetchingLocksFailed = () => ({
  type: FETCHING_LOCKS_FAILED,
});

const fetchingLocksInProgress = () => ({
  type: FETCHING_LOCKS_IN_PROGRESS,
});

const addToUnlockQueue = (id, status) => ({
  type: ADD_TO_UNLOCK_QUEUE,
  payload: {lockId: id, status },
});

const onUnlockSuccess = (id) => ({
  type: REMOVE_FROM_UNLOCK_QUEUE,
  payload: { lockId: id },
});

const updateLockItem = lock => ({
  type: UPDATE_LOCK_ITEM, 
  payload: {lock}
});

const getLocks = () => async (dispatch) => {
  dispatch(fetchingLocksInProgress());
  try {
    const { data: locks } = await kisiClient.get('locks');
    dispatch(setLocks(locks));
  } catch(error) {
    dispatch(fetchingLocksFailed());
  }
};

const getLockById = (id) => async (dispatch) => {
  try {
    const lock = await kisiClient.get(`locks/${id}`);
    dispatch(updateLockItem(lock));
  } catch(error) {
    console.error(error);
  }
};

const unlockLockById = (id) => async(dispatch, getState) => {
  const unlockStatus = getState().lockReducer.unlockQueue[id];
  if (unlockStatus && unlockStatus === UNLOCK_IN_PROGRESS) {
    return;
  }

  dispatch(addToUnlockQueue(id, UNLOCK_IN_PROGRESS));

  try {
    const response = await kisiClient.post(`locks/${id}/unlock`);
    dispatch(getLockById(id));
    dispatch(addToUnlockQueue(id, UNLOCK_SUCCESS));
  } catch(error) {
    dispatch(addToUnlockQueue(id, UNLOCK_FAILED));
  }
};

export {
  getLocks,
  unlockLockById,
};
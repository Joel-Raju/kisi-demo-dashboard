import { createSelector } from 'reselect';


const getLocks = state => state.locksList; 

const getUnlockQueue = state => state.unlockQueue;

const getLockGridForRender = createSelector(getLocks, getUnlockQueue, 
  (locks, unlockQueue) => {
    const locksToRender = [];
    locks.forEach(lock => {
      const lockItem = {
        id: lock.id,
        name: lock.name,
        unlocked: lock.unlocked ? 'Unlocked' : 'Locked',
        unlock_status: unlockQueue[lock.id] || null,
      };
      locksToRender.push(lockItem);
    });

    return locksToRender;
});

export {
  getLockGridForRender,
};
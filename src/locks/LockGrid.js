import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  unlockSuccess: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  unlockInProgress: {
    color: '#ffeb3b',
    fontWeight: 'bold',
  },
  unlockFailed: {
    color :'#ff1744',
    fontWeight: 'bold',
  }
});


const getUnlockStatusDisplayText = unlockStatus => {
  if (unlockStatus === 1) {
    return 'Unlocking ...';
  } else if (unlockStatus === 2) {
    return 'Unlock Failed ...';
  } else if (unlockStatus === 3) {
    return 'Unlock Success ...';
  }
};

const getStatusClassName = unlockStatus => {
  if (unlockStatus === 1) {
    return 'unlockInProgress';
  } else if (unlockStatus === 2) {
    return 'unlockFailed';
  } else if (unlockStatus === 3) {
    return 'unlockSuccess';
  }
}

const LockGrid = (props) => {
  const { lockList, unlockHandler, classes } = props;
  return(
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell># No</TableCell>
            <TableCell>Lock Name</TableCell>
            <TableCell>Locked Status</TableCell>
            <TableCell>Lock Action</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lockList.map((lock, index) => {
            return (
              <TableRow key={lock.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{lock.name}</TableCell>
                <TableCell>{lock.unlocked}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => unlockHandler(lock.id)} disabled={lock.unlock_status === 1}>Unlock</Button>
                </TableCell>
                <TableCell className={classes[getStatusClassName(lock.unlock_status)]}>
                  { getUnlockStatusDisplayText(lock.unlock_status) }
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  ); 
};

LockGrid.propTypes = {
  lockList: PropTypes.array.isRequired,
  unlockHandler: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LockGrid);

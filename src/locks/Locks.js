import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getLocks, unlockLockById } from '../store/actions/lockActions';
import LockGrid from './LockGrid';
import { getLockGridForRender } from '../store/selectors.js'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
  }
});


class Locks extends Component {

  constructor(props) {
    super(props);
    this.renderLockGrid = this.renderLockGrid.bind(this);
    this.unlockHandler = this.unlockHandler.bind(this);
  }

  componentDidMount() {
    const { getLocks } = this.props;
    getLocks();
  }

  unlockHandler(id) {
    const { unlockLockById } = this.props;
    unlockLockById(id);
  }

  renderLockGrid(locks) {
    return(
      <LockGrid 
        lockList={locks}
        unlockHandler={this.unlockHandler} />
    );
  }

  render() {
    const { locks, classes } = this.props;
    const { inProgress, error } = this.props.fetchingLocks;
    if (inProgress) {
      <div>
        <CircularProgress size={100} color="secondary" />
      </div>
    }

    if (error) {
      return <div>Something bad happened :-( </div>
    }

    if (locks && locks.length) {
      return(
        <div className={classes.root}>
          <h3 className={classes.title}>Locks</h3>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={10}>
              {this.renderLockGrid(locks)}
            </Grid>
          </Grid>
        </div>
      );
    }

    return <div>nothing to see here</div>
  }
}


const mapStateToProps = (state) => {
  const { lockReducer } = state;
  const { fetchingLocks } = lockReducer;
  return { locks: getLockGridForRender(lockReducer), fetchingLocks };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getLocks,
  unlockLockById,
}, dispatch); 

export default 
compose(withStyles(styles), withRouter, connect(mapStateToProps, mapDispatchToProps))(Locks);

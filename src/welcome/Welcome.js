import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: 150,
    padding: 100,
  },
  button: {
    marginTop: 100,
  },
  welcome: {
    marginTop: 50,
  }
});

const Welcome = (props) => {
  const { classes } = props;
  return(
    <div className={classes.root}>
      <Grid container justify={'center'} alignItems={'center'}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <img src="https://global-uploads.webflow.com/5a06fcae4056cc00011eebfc/5a6ef2c37123420001cb1322_kisi.svg" />
            <div className={classes.welcome}>Hi Joel, welcome to your KISI dashboard.</div>
            <Link to="/locks" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" className={classes.button} color="primary">
                View Locks
              </Button>
            </Link>  
          </Paper>
        </Grid>
      </Grid>
    </div>  
  );
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);

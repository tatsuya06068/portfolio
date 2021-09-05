import React from 'react';
import Link from 'next/link'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(() => 
  createStyles({
    fullList: {
      width: 250
    },
    item: {
      textAlign: 'center',
      fontWeight: 'bold',
      '&:hover' :{
        cursor: 'pointer',
        
      }
    },
    menuItem:{
      marginTop: 40,
      marginBottom: 50,
      
      '&:hover':{
        '& $span':{
          textDecorationLine:'underline',
          cursor: 'pointer'
        },
    },
    }
    
  }),
);

const Menu : React.FC  = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, top: open });
  };

  const hrefAssign = (item:string) => {
    
    switch (item) {
      case 'Skill' :
        return '/skill'
        break;
      case 'Work':
        return '/work'
        break;
      case 'Inquery':
        return '/inqury'
        break;
      default:
        return  "/"
      
    }
  }

  const list = () => (
    <Grid 
      container
      direction="column"
      alignItems="center"
    >
    <div
      className = {classes.fullList}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Grid item>
      <div onClick = {toggleDrawer(false)} className={classes.item}>
        <span>Close</span>
        <br />
        <ArrowDropUpIcon fontSize="large" />
      </div>
      </Grid>
      <List >
        {['Home', 'Skill', 'Work', 'Inquery'].map((text) => (
          <div key={text} className={classes.item + ' ' + classes.menuItem}>
            <Link href={hrefAssign(text)}>
              <span onClick={toggleDrawer(false)}> 
                {text}
              </span>
            </Link>
          </div>
        ))}
      </List>

    </div>
    </ Grid>
  );

  return (
    <div>
      <div>
        <Grid 
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <div onClick={toggleDrawer(true)} className={classes.item}>
            <span>Menu</span>
            <br />
            <ArrowDropDownIcon fontSize="large" />
          </div> 
        </Grid>
        <Drawer anchor='top' open={state['top']}>
          {list()}
        </Drawer>
      </ div>
      <Divider />
    </div>
  );
}

export default  Menu;
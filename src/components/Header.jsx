import React from 'react'
import { AppBar,Toolbar,Typography,Box } from '@material-ui/core'
import {makeStyles } from '@material-ui/core/styles';
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from "@material-ui/core/IconButton";

const styles = makeStyles((theme) => ({
  title: {
    display:'none',
    [theme.breakpoints.up('sm')]: {
      display:'block',
      marginRight:'20px',
    },
  },
  search: {
    marginLeft:'auto',
  },
  toolbar: {
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

  },
  box: {
    display:'flex',
    alignItems:'center',
  },
  button:{
    marginRight:'10px',
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  }
}));

export default function Header({geoCoder,setTheme,theme}) {
    const classes=styles();
    const icon = theme ? <Brightness3Icon />:<Brightness7Icon />;

    return (
        <AppBar position='sticky'>
            <Toolbar className={classes.toolbar}>
            <Box display='flex' className={classes.box}>
              <div className={classes.heading}>
                <Typography variant='h5' className={classes.title}>
                    Travel Companion
                </Typography>
              </div>
              </Box>
                <Box display='flex' className={classes.box}>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="mode"
                  onClick={() => setTheme(!theme)}
                  className={classes.button}
                >
                {icon}
                </IconButton>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="mode"
                  target="_blank" href="https://github.com/mrprince88/TravelCompanion"
                  className={classes.button}
                >
                <GitHubIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Explore new places
                </Typography>
                  <div ref={geoCoder} className={classes.search}/>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
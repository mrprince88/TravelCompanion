import React,{useState,useEffect,createRef} from 'react'
import { CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select,IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import PlaceDetails from './PlaceDetails';
import SearchIcon from '@material-ui/icons/Search';

const styles=makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '30px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: '25px',
    height: 'calc(100vh - 60px)'
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height:'73vh',
    overflow: 'auto',
  },
  searchBar: {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  },
  search:{
    marginLeft:'40px'
  }
}));

export default function List({places,placeClicked,isLoading,setType,type,rating,setRating,setSearch}) {
    const classes=styles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
      setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4">Hotels, Restaurants & Attractions around you</Typography>
            <div className={classes.searchBar}>
              <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=>setType(e.target.value)}>
                    <MenuItem value='hotels'>Hotels</MenuItem>
                    <MenuItem value='restaurants'>Restaurants</MenuItem>
                    <MenuItem value='attractions'>Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <MenuItem value="0">All</MenuItem>
                    <MenuItem value="3">Above 3.0</MenuItem>
                    <MenuItem value="4.0">Above 4.0</MenuItem>
                    <MenuItem value="4.5">Above 4.5</MenuItem>
                </Select>
            </FormControl>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="mode"
              className={classes.search}
              onClick={()=>setSearch(true)}
            >
              <SearchIcon/>
            </IconButton>
            </div>
            {isLoading ? (
              <div className={classes.loading}>
                <CircularProgress size="5rem" color="secondary" />
              </div>
              ) : (
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place,i)=>(
                    <Grid ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails
                        place={place}
                        selected={Number(placeClicked)===i}
                        refProp={elRefs[i]}
                        />
                    </Grid>
                ))}
            </Grid>)}
        </div>
    )
}

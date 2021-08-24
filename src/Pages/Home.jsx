import React,{useRef,useState,useEffect} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import { CssBaseline,Grid } from '@material-ui/core';
import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';
import {getPlacesData,getWeatherData} from '../api';
import { LabelImportantRounded } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from "@material-ui/core/styles";


export default function Home() {
    const [bounds,setBounds]=useState({});
    const [places,setPlaces]=useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [type,setType]=useState('restaurants');
    const [rating,setRating]=useState("0");

    const [weatherData, setWeatherData] = useState([]);
    const [placeClicked, setPlaceClicked] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [theme, setTheme] = useState(false);
    const appliedTheme = createTheme(theme ? light : dark);

    const [coords, setCoords] = useState({});
    const [search,setSearch] = useState(false);

    useEffect(() => {
        const filtered = places?.filter((place) => Number(place.rating) > rating);
    
        setFilteredPlaces(filtered);
      }, [rating]);

    useEffect(()=>{
        setIsLoading(true)

        getWeatherData(coords.lat,coords.lng)
        .then((data) => {
          setWeatherData(data?.list);
        })

        getPlacesData({sw:bounds._sw,ne:bounds._ne,type:type})
            .then((data)=>{
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setRating('0');
                setIsLoading(false);
                setSearch(false)
            })
        },[search])

    const geocoderContainerRef = useRef();

    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseline/>
            <Header geoCoder={geocoderContainerRef} setTheme={setTheme} theme={theme}/>
            <Grid container spacing={1} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        placeClicked={placeClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        setSearch={setSearch}
                    />
                </Grid>
                <Grid item xs={12} md={8} style={{paddingLeft:'0',paddingRight:'0',paddingBottom:'0',height: 'calc(100vh - 60px)'}}>
                    <Map
                        geoCoder={geocoderContainerRef}
                        setBounds={setBounds}
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        setPlaceClicked={setPlaceClicked}
                        theme={theme}
                        search={search}
                        weatherData={weatherData}
                        setCoords={setCoords}
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export const light = {
    palette: {
      type: "light"
    }
  };
  export const dark = {
    palette: {
      type: "dark",
      primary: {
        main:"#333"
      }
    }
  };
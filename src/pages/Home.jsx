import React, { useRef, useState, useEffect,useLayoutEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';
import { getPlacesData, getWeatherData } from '../api';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from "@material-ui/core/styles";


export default function Home() {

  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState("0");
  const [weatherData, setWeatherData] = useState([]);
  const [placeClicked, setPlaceClicked] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [theme, setTheme] = useState(false);
  const appliedTheme = createTheme(theme ? light : dark);
  const [search, setSearch] = useState(false);

  const mapRef=useRef();
  const geocoderContainerRef = useRef();

  useEffect(async() => {
    if(search) {
    setIsLoading(true);

    const map=mapRef.current.getMap();
    const {_sw,_ne}=map.getBounds();
    const {lat,lng}=map.getCenter();
    
    getWeatherData(lng,lat)
    .then(data => {
      setWeatherData(data?.list);
    })

    getPlacesData(_sw,_ne,type)
        .then(data=>{
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            const filtered = data?.filter((place) => place.rating && Number(place.rating) > rating);
            setFilteredPlaces(filtered);
            setIsLoading(false);
            setSearch(false);
        })
    }
  }, [search])

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating]);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Header geoCoder={geocoderContainerRef} setTheme={setTheme} theme={theme} />
      <Grid container spacing={1} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces}
            placeClicked={placeClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            setSearch={setSearch}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ paddingTop: '5px', height: 'calc(100vh - 60px)' }}>
          <Map
            mapRef={mapRef}
            geoCoder={geocoderContainerRef}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setPlaceClicked={setPlaceClicked}
            theme={theme}
            weatherData={weatherData}
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
      main: "#333"
    }
  }
};
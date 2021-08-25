import React, { useState, useRef, useCallback,useEffect } from 'react'
import ReactMapGL,{GeolocateControl,NavigationControl,Marker}  from 'react-map-gl'
import { Paper, Typography,useMediaQuery} from '@material-ui/core'
import Geocoder from 'react-map-gl-geocoder'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'
import { makeStyles } from '@material-ui/core/styles';
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const styles = makeStyles({
  paper: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '110px',
  },
  markerContainer: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex:1,
    '&:hover':{
      zIndex:'2'
    }
  },
  pointer: {
    cursor: 'pointer',
  },
});

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  
export default function Map({geoCoder,setBounds,places,setPlaceClicked,theme,search,weatherData,setCoords}) {

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    width:100,
    height:100,
    zoom: 14,
  });

  const mapRef = useRef();
  const classes = styles();
  const matches = useMediaQuery('(min-width:600px)');

  const handleViewportChange = useCallback(
    (newViewport) =>  {
        setViewport(newViewport);
    },
    []
  );
  
  useEffect(()=>{
    if(search) {
      setCoords({lat:viewport.latitude,lng:viewport.longitude})
      setBounds(mapRef.current.getMap().getBounds());
    }
  },[search])

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  const placesMarkers = places?.map(
    (place,i) => (
        <Marker
        key={i}
        latitude={Number(place.latitude)}
        longitude={Number(place.longitude)}
        className={classes.markerContainer}
        onClick={()=>setPlaceClicked(i)}
        > {!matches
          ? <LocationOnOutlinedIcon color="primary" fontSize="large" /> 
          : (
            <Paper elevation={3} className={classes.paper}>
              <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                <img
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
            )}
        </Marker>
        )
      )

  const weatherMarkers = weatherData?.map(
    (data,i) => (
        <Marker
        key={i}
        latitude={Number(data.coord.lat)}
        longitude={Number(data.coord.lon)}
        >
        <img alt="weather" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
        </Marker>
    )
  )

  return (
      <ReactMapGL
        mapStyle={!theme ? process.env.REACT_APP_MAPBOX_DARK:process.env.REACT_APP_MAPBOX_LIGHT }
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geoCoder}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
        <GeolocateControl
        style={{
          bottom:140,
          right:20
        }}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto
        />
        <NavigationControl
        style={{
          right: 20,
          bottom: 40
        }} />
        {placesMarkers}
        {weatherMarkers}
      </ReactMapGL>
  );
};
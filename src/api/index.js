import axios from "axios";

  
export const getPlacesData = async(sw,ne,type)=>{
  const URL=`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
    try {
      if(sw && ne) {
        const {data:{data}}=await axios.get(URL,{
          params: {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
          }
      });
      console.log(data+" "+sw.lat+" "+sw.lng)
       return data;
    }
  }
    catch(error) {
        console.log(error);
    }
}

export const getWeatherData = async (lng,lat) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
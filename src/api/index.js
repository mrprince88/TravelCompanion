import axios from "axios";

  
export const getPlacesData = async({sw,ne,type})=>{
  const URL=`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
    try {
        const {data:{data}}=await axios.get(URL,{
          params: {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': '20b2216360msh81d549903ec7d65p154eadjsn0f8e0e02a4b9'
          }
      });
        return data;
    }
    catch(error) {
        console.log(error);
    }
}

export const getWeatherData = async (lat,lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-key': '20b2216360msh81d549903ec7d65p154eadjsn0f8e0e02a4b9',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
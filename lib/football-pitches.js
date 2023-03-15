import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});


const getUrlForFootballPitches = (latlong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

const getListOfFootballPitchPhotos = async () => {
    const photos = await unsplash.search.getPhotos({
        query: 'football pitch',
        page: 1,
        perPage: 30,
    });
    const unsplashResults = photos.response?.results || [];

    return unsplashResults.map((result) => result.urls["small"]);
}


export const fetchFootballPitches = async (
    latLong = "62.89468290278217%2C27.670797369226392",
    limit = 6,
) => {
    const photos = await getListOfFootballPitchPhotos();
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: process.env.
        NEXT_PUBLIC_FOURSQUARE_API_KEY,
        }
    };
    
    const response = await fetch(
        getUrlForFootballPitches(latLong,"football", limit), 
        options
    );
    const data = await response.json();
    return data.results.map((result, idx) => {
        return {
            ...result,
            id: result.fsq_id,
            imgUrl: photos.length > 0 ? photos[idx] : null,
        }
    })
     
    //  .catch(err => console.error(err));
}

// kuopio 62.89468290278217%2C27.670797369226392
// helsinki 60.16659357269315%2C24.94185568376828
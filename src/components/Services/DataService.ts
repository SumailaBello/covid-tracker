import axios, {AxiosRequestConfig} from 'axios';

/** gets list of provinces in a given country */
export const getProvinces = async (isoCode: string)=> {
    // const headers = { 'Authorization': `Client-ID Y70ExMiTIaCUD95m3IQBLDid9S65s6UQGa-QuevV5UY`};
    const headers = { 
        'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com',
        'x-rapidapi-key': '4b6f5c4549msh8f5828e81d1f17ep1d21cfjsn8859d9b754f8'
    };
    const options: AxiosRequestConfig = {
        headers: headers,
        params: {iso: isoCode},
    };
    // let response
    const res = await axios.get('https://covid-19-statistics.p.rapidapi.com/provinces', options);
    return res;
}

/**get covid stats by state/province*/
export const getStat = async (state: string)=> {
    const headers = { 
        'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com',
        'x-rapidapi-key': '4b6f5c4549msh8f5828e81d1f17ep1d21cfjsn8859d9b754f8'
    };
    const options: AxiosRequestConfig = {
        headers: headers,
        params: {region_province: state},
    };
    // let response
    const res = await axios.get('https://covid-19-statistics.p.rapidapi.com/reports', options);
    return res;
}

export default getProvinces;
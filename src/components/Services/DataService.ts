import axios, {AxiosRequestConfig} from 'axios';

/** gets list of provinces in a given country */
export const getProvinces = async (isoCode: string)=> {
    const headers = {
        "x-api-key": "bzShtIxdeQ4MeypyViSPz5uVNptWniJB8eQphg0K"
    };
    const options: AxiosRequestConfig = {
        headers: headers,
        params: {iso: isoCode},
    };
    // let response
    const res = await axios.get('https://sumailabellor.korconnect.io/rapidapi/provinces', options);
    return res;
}

/**get covid stats by state/province*/
export const getStat = async (state: string)=> {
    const headers = {
        "x-api-key": "bzShtIxdeQ4MeypyViSPz5uVNptWniJB8eQphg0K"
    };
    const options: AxiosRequestConfig = {
        headers: headers,
        params: {region_province: state},
    };
    // let response
    const res = await axios.get('https://sumailabellor.korconnect.io/rapidapi/reports', options);
    return res;
}

// get list of countries
export const getCountries = async ()=> {
    // let response
    const res = await axios.get('https://restcountries.com/v3.1/all');
    return res;
}

export default getProvinces;
import { action, makeObservable, observable, runInAction } from 'mobx';
import {getProvinces, getCountries} from '../Services/DataService';

class Store {
    countries: Array<any> = [];
    states: Array<any> = [];
    error: boolean = false;
    selectedCountry: any = null;
    alertMsg: string = "";
    showAlert: boolean = false; //used to display alert message
    constructor() {
        makeObservable(this, {
            states: observable,
            error: observable,
            countries: observable,
            selectedCountry: observable,
            alertMsg: observable,
            showAlert: observable,
            filterStates: action,
            sortCountries: action,
            toggleAlert: action,
            // searchStates: action,
        });
    }

    toggleAlert = (msg: string, show: boolean)=> {
        this.alertMsg = msg;
        this.showAlert = show;
        setTimeout(()=> {

        }, 5000)
    }

    // get provinces
    getProvinces = (isoCode: string)=> {
        runInAction(()=> {
            this.error = false;
        })
        getProvinces(isoCode).then(res => {
            const provinces = res.data.data;
            // console.log(provinces);
            this.filterStates(provinces);
        }, error => {
            // console.log(error);
            runInAction(()=> {
                this.error = true;
            })
            // alert("Unable to load data")
        })
    }

    // filters province array to remove unnecessary data by returning only valid states to be rendered on map instead of over 200 provinces returned by api. This improves map rendering performance
    filterStates = (provinces: Array<any>)=> {
        const states = provinces.filter((province: any)=> !province.province.includes('County') && province.lat && province.long && !province.province.includes('Grand Princess') && !province.province.includes('Diamond Princess') && !province.province.includes('New Mexico') && !province.province.includes('Puerto Rico') && province.province !== 'US' && !province.province.includes(',') ) //states also don't usually include comma in their names 
        this.states = states;
        // console.log(states);
    }

    getCountries = ()=> {
        getCountries().then(res => {
            // console.log(res.data);
            const countries = res.data;
            this.sortCountries(countries);
            // this.countries = res.data;
        }).then(error=> console.log(error))
    }

    sortCountries = (countries: Array<any>)=> {
        let sorted;
        sorted = countries.sort((countryA: any, countryB: any)=> {
            if(countryA.name.common < countryB.name.common) {
                return -1;
            }

            else if (countryA.name.common > countryB.name.common ) {
                return 1;
            }
            return 0 //no sorting
        })
        this.countries = sorted;
    }

    // select country
    selectCountry = (country: any)=> {
        runInAction(()=> {
            this.selectedCountry = country;
        })
    }

}

export default Store;

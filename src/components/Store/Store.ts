import { action, makeObservable, observable, runInAction } from 'mobx';
import {getProvinces} from '../Services/DataService';

class Store {
    states: Array<any> = [];
    error: boolean = false;
    constructor() {
        makeObservable(this, {
            states: observable,
            error: observable,
            filterStates: action,
            // searchStates: action,
        });
    }

    // get provinces
    getProvinces = (isoCode: string)=> {
        runInAction(()=> {
            this.error = false;
        })
        getProvinces(isoCode).then(res => {
            const provinces = res.data.data;
            console.log(provinces);
            this.filterStates(provinces);
        }, error => {
            console.log(error);
            runInAction(()=> {
                this.error = true;
            })
            alert("Unable to load data")
        })
    }

    // filters province array to remove unnecessary data by returning only valid states to be rendered on map instead of over 200 provinces returned by api. This improves map rendering performance
    filterStates = (provinces: Array<any>)=> {
        const states = provinces.filter((province: any)=> !province.province.includes('County') && province.lat && province.long && !province.province.includes('Grand Princess') && !province.province.includes('Diamond Princess') && !province.province.includes('New Mexico') && !province.province.includes('Puerto Rico') && province.province !== 'US' && !province.province.includes(',') ) //states also don't usually include comma in their names 
        this.states = states;
        console.log(states);
    }

    // get covid statistic for a given state
    // getStats = (state: string)=> {
    //     console.log(state)
    //     getStat(state).then(res => {
    //         const stat = res.data.data;
    //         console.log(stat);
    //     }, error => {
    //         console.log(error);
    //         runInAction(()=> {
    //             this.error = true;
    //         })
    //         alert("Unable to load data");
    //     })
    // }

}

export default Store;

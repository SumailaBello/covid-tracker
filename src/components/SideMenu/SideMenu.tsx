import React from 'react';
import { slide as SlideMenu } from 'react-burger-menu';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Search, ChevronRight, XCircle, ChevronLeft } from 'react-feather';
import './SideMenu.css'
import { observer, inject } from "mobx-react";
import { getStat } from '../Services/DataService';
import Spinner from 'react-bootstrap/esm/Spinner';

interface Props {
    isOpen: boolean,
    toggle: (value: boolean)=> void,
    outerContainerId: string,
    store?: any,
}
const SideMenu: React.FC<Props> = inject('store')(observer((props)=> {
    const isMenuOpen = (state: any)=> {
        return state.isOpen;
    };
    // props.store.getCountries();

    const [stateList, setList] = React.useState([])
    const [selectedState, setSelectedState]: any = React.useState(null)
    // const [selectedCountry, setSelectedCountry]: any = React.useState(null)
    React.useEffect(() => {
        setList(props.store.states);
    }, [props.store.states])

    // search through the states list
    const search = (event: any)=> {
        const query = event.target.value.toLowerCase();
        const List = props.store.states
        if(query) {
            let result = List.filter((state: any)=> state.province.toLowerCase().includes(query));
            setList(result);
            // console.log(result)
        }
        else {
            setList(props.store.states);
        }
    } 

    // selects a single state from the list of state
    const selectState = (state: any)=> {
        setSelectedState(state);
        loadStat(state.povince)
    }

    // sets state stats
    const [stat, setStat]: any = React.useState(null);
    const loadStat = (stateName: string)=> {
        getStat(stateName).then(res => {
            const stat = res.data.data;
            // console.log(stat);
            setStat(stat[0])
        }, error => {
            props.store.toggleAlert("Unable to load data", true);
            // alert("Unable to load data");
        })
    }

    /**resets state selection and stat data */
    const resetSelection = ()=> {
        setStat(null);
        setSelectedState(null);
    }

    const handleCountrySelect = (event: any)=> {
        const country = JSON.parse(event.target.value);
        // setSelectedCountry(country);
        props.store.selectCountry(country);
    }

    return (
        // <div style= {{height: '100%', width: '30%'}}>
        <SlideMenu left isOpen={props.isOpen} width={ '30%' } onClose={()=>props.toggle(false)} className = "bg-light menu-style" outerContainerId={props.outerContainerId} onOpen={ ()=>props.toggle(true) } onStateChange={ isMenuOpen }>
            <div className="menu-inner container-fluid p-3" >
                <select name="countries" placeholder="Select country" onChange={handleCountrySelect} defaultValue="" id="select-country">
                    <option value="" disabled>Select country</option>
                    {props.store.countries.map((country: any, index: number) => (
                        <option key={index} value={JSON.stringify(country)}>{country.name.common}</option>
                    ))}
                </select>
                <hr className="w-100" color="grey" />
                {selectedState ? (
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <Button variant="outline-dark" onClick = {resetSelection} size="sm">
                                        <ChevronLeft size={30} color="grey" />
                                    </Button>
                                </div>
                                <div className="col-6">
                                    <h5 className="h5">{selectedState.province}</h5>
                                </div>
                                <div className="col">
                                <h6 className="h6">ISO: {selectedState.iso}</h6>
                                </div>
                            </div>
                            <hr className="bg-dark" />
                            {stat ? (
                                <div>
                                    <h5 className="h5">COVID-19 Stats</h5>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="h6 text-danger">Total Cases:</h6>
                                        </div>
                                        <div className="col">
                                            <strong>{new Intl.NumberFormat('en-US').format(stat.confirmed)}</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="h6 text-warning">Active Cases:</h6>
                                        </div>
                                        <div className="col">
                                            <strong>{new Intl.NumberFormat('en-US').format(stat.active)}</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="h6 text-success">Recovered:</h6>
                                        </div>
                                        <div className="col">
                                            <strong>{new Intl.NumberFormat('en-US').format(stat.recovered)}</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="h6 text-muted">Death:</h6>
                                        </div>
                                        <div className="col">
                                            <strong>{new Intl.NumberFormat('en-US').format(stat.deaths)}</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="h6 text-dark">Confirmed Difference:</h6>
                                        </div>
                                        <div className="col">
                                            <strong>{new Intl.NumberFormat('en-US').format(stat.confirmed_diff)}</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="h6 text-drkr">Active Difference:</h6>
                                        </div>
                                        <div className="col">
                                            <strong>{new Intl.NumberFormat('en-US').format(stat.active_diff)}</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="h6 text-dark">Death Difference:</h6>
                                        </div>
                                        <div className="col">
                                            <strong>{new Intl.NumberFormat('en-US').format(stat.deaths_diff)}</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="h6 text-danger">Fatality Rate:</h6>
                                        </div>
                                        <div className="col">
                                            <strong>{stat.fatality_rate}%</strong>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <h6 className="h5 text-muted">Last Update:</h6>
                                        </div>
                                        <div className="col text-muted">
                                            <strong>{stat.last_update}</strong>
                                        </div>
                                    </div>
                                    <hr className="bg-dark" />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Spinner animation="grow" color="secondary" size="sm" />
                                </div>
                                
                                )}
                            <h5 className="h5">Location</h5>
                            <div className="row">
                                <div className="col">
                                    <h6 className="h6 text-muted">Latitude:</h6>
                                </div>
                                <div className="col">
                                    {selectedState.lat}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h6 className="h6 text-muted">Longitude:</h6>
                                </div>
                                <div className="col">
                                    {selectedState.long}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><Search /></InputGroup.Text>
                            <FormControl
                            placeholder="Search states"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            // onKeyUp = {search}
                            onChange = {search}
                            />
                        </InputGroup>
                    <div className="row">
                        <div className="col">
                            <h5 className="h5">States</h5>
                            <hr className="bg-dark" />
                            {stateList.length > 0 ? (
                                <>
                                    {stateList.map((state: any, index: number)=> {
                                        return (
                                            <div className="row list" key={index} onClick={()=>selectState(state) }>
                                                <div className="col-10">
                                                    <h6 className="h6 text-muted">{state.province ? state.province : "Unknown Province"}</h6>
                                                </div>
                                                <div className="col-2">
                                                    <ChevronRight color='lightgrey' className="mb-2" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            ) : (
                                <div className="row list">
                                    <div className="col">
                                        <h6 className="h6 text-muted">No Data</h6>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    </>
                )}
            </div>
        </SlideMenu>
        // </div>
    )
}))


export default SideMenu


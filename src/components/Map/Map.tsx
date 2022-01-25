import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import CustomMarker from './CustomMarker';
import { observer, inject } from "mobx-react"; 

interface center {
    lat: number,
    lng: number,
}

interface Props {
    center?: center,
    zoom?: any,
    list?: [],
    store?: any;
    // customMarkerComponent: React.ReactNode
}
const MainApp: React.FC<Props> = inject('store')(observer((props)=> {
    const defaultProps = {
        center: {
          lat:  37.09024,
          lng:  -95.712891
        },
        zoom: 7
    };
    const [mapProps, setMapProps] = useState({
        center: {
        lat:  37.09024,
        lng:  -95.712891
        },
        zoom: 7
    })
    // console.log(props.store.provinces)

    const handleApiLoaded = (map: any, maps: any)=> {
        console.log(map);
        console.log(maps);
    }

    React.useEffect(()=> {
        // const center = props.store.selectedCountry.latlng;
        console.log(props.store.selectedCountry)
        if (props.store.selectedCountry) {
            setMapProps({
                center: {
                    lat:  props.store.selectedCountry.latlng[0],
                    lng:  props.store.selectedCountry.latlng[1]
                },
                zoom: 7
                    
            })
            props.store.getProvinces(props.store.selectedCountry.cca3);
        }
    }, [props.store.selectedCountry])

    React.useEffect(()=> {
        props.store.getCountries();
        props.store.getProvinces('USA');
    }, [])

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ 
                key: 'AIzaSyCUfGRjkRG9pBXCobu8lphHw3qv0OMR0-M', language: 'en',
                // region: 'us',
                libraries:['places'], 
            }}
            // yesIWantToUseGoogleMapApiInternals
            defaultCenter={defaultProps.center}
            center= {props.center ? props.center : mapProps.center}
            defaultZoom={props.zoom ? props.zoom : mapProps.zoom}
            minZoom = {mapProps.zoom}
            onGoogleApiLoaded={({ map, maps }: any) => handleApiLoaded(map, maps)}
            yesIWantToUseGoogleMapApiInternals={true}
            >
                {props.store.states.map((state: any, index: number) => (
                    <CustomMarker key={index} state={state} lat={state.lat} lng={state.long} />
                ))}
            </GoogleMapReact>
        </div>
    )
}))

export default MainApp

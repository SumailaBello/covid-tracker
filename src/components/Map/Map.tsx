import React from 'react';
import GoogleMapReact from 'google-map-react';
import CustomMarker from './CustomMarker';
import { observer, inject } from "mobx-react"; 
import { List, AutoSizer } from "react-virtualized";

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
    // console.log(props.store.provinces)

    const handleApiLoaded = (map: any, maps: any)=> {
        console.log(map);
        console.log(maps);
    }

    React.useEffect(()=> {
        props.store.getProvinces('USA');
    }, [])

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ 
                key: 'AIzaSyCUfGRjkRG9pBXCobu8lphHw3qv0OMR0-M', language: 'en',
                region: 'us',
                libraries:['places'], 
            }}
            // yesIWantToUseGoogleMapApiInternals
            defaultCenter={props.center ? props.center : defaultProps.center}
            center= {props.center ? props.center : defaultProps.center}
            defaultZoom={props.zoom ? props.zoom : defaultProps.zoom}
            minZoom = {defaultProps.zoom}
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

import React from 'react';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Popover from 'react-bootstrap/esm/Popover';
import './CustomMarker.css';
import { observer, inject } from "mobx-react";
import { getStat } from '../Services/DataService';
import Spinner from 'react-bootstrap/esm/Spinner';

interface Props {
    state: any,
    lat: number,
    lng: number,
    key: any,
    store?: any,
}
export const CustomMarker: React.FC<Props> = inject('store')(observer((props) => {

    const [stats, setData]: any = React.useState();
    React.useEffect(()=> {
        let mounted: boolean = true;
        // loadStats(props.state.province);
        getStat(props.state.province).then(res => {
            const stat = res.data.data;
            // console.log(stat);
            // setData(stat[0])
            if(mounted) {
                finalize(stat[0])
            }
        }, error => {
            console.log(error);
            alert("Unable to load data");
        })
        return (()=> {
            mounted = false;
        })
    }, [])

    const finalize = (data: any)=> {
        setData(data)
    }

    return (
        <OverlayTrigger
        trigger={["hover", "focus"]}
        key={props.key}
        placement="top"
        overlay={
          <Popover id={`popover${props.key}`} style = {{width: '200px', marginBottom: 0}}>
            <Popover.Header as="h3">
                {props.state.province}
                {stats ? (<p className="text-danger"><strong>Total Cases: </strong> {new Intl.NumberFormat('en-US').format(stats?.confirmed)} </p> ) : (null)}
            </Popover.Header>
            {stats ? (
                <Popover.Body>
                    <div style={{display: 'flex'}}>
                        <strong style={{flex: 6}} className="text-warning"> Active Cases: </strong>
                        <span style={{flex: 4}}>{new Intl.NumberFormat('en-US').format(stats?.active)}</span>
                    </div>
                    <div style={{display: 'flex'}}>
                        <strong style={{flex: 6}} className="text-success">Recovered: </strong> 
                        <span style={{flex: 4}}> {new Intl.NumberFormat('en-US').format(stats?.recovered)}</span>
                    </div>
                    <div style={{display: 'flex'}}>
                        <strong style={{flex: 6}} className="text-muted">Deaths: </strong> 
                        <span style={{flex: 4}}>{new Intl.NumberFormat('en-US').format(stats?.deaths)}</span> 
                    </div>
                </Popover.Body>
            ) : (
                <Popover.Body className="text-center">
                    <Spinner animation="grow" size="sm" />
                </Popover.Body>
            )}
            
          </Popover>
        }
      >
        <strong className = "marker h6 bg-danger text-light">
            {props.state.province ? props.state.province : 'Unavailable'}
        </strong>
      </OverlayTrigger>
    )
}))

export default CustomMarker;

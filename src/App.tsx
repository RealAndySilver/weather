// import { useState } from "react";
import { NavBar } from './components/NavBar';
import { useEffect, useMemo, useState } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { GeoJsonLayer, ArcLayer, ScatterplotLayer } from 'deck.gl';
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import './App.css';
import { WeatherCard } from './components/WeatherCard';
import { GoogleMapsAPI } from './secrets/Apis';
import { getWeather } from './utilities/APICallers';

function DeckGLOverlay(props) {
    const map = useMap();
    const overlay = useMemo(() => new DeckOverlay(props));

    useEffect(() => {
        if (map) {
            overlay.setMap(map);
            return () => overlay.setMap(null);
        }
        return undefined;
    }, [map]);

    overlay.setProps(props);
    return null;
}

const INITIAL_VIEW_STATE = {
    longitude: -80.83200558162271,
    latitude: 35.41737548546202,
    zoom: 13,
    pitch: 0,
    bearing: 0
};
const dataGL = [
    {
        sourcePosition: [-81, 35],
        targetPosition: [-80.83200558162271, 35.41737548546202]
    }
];
const layerSC = [
    new ScatterplotLayer({
        id: 'bart-stations',
        data: [
            {
                name: 'Colma',
                passengers: 4214,
                coordinates: [-122.466233, 37.684638]
            },
            {
                name: 'Civic Center',
                passengers: 24798,
                coordinates: [-122.413756, 37.779528]
            }
        ],
        stroked: false,
        filled: true,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.passengers),
        getFillColor: [255, 200, 0]
    })
];
export default function App() {
    const [array, setArray] = useState([]);
    const [weatherData, setWeatherData] = useState();
    const [liveWord, setLiveWord] = useState<string>();
    const layers = [new LineLayer({ id: 'line-layer', dataGL })];
    const items = [
        {
            title: 'Home',
            url: '#Home',
            onClickHandler: (name: string) => {
                console.log(`Clicked ${name}`);
            }
        },
        {
            title: 'About',
            url: '#About',
            onClickHandler: (name: string) => {
                console.log(`Clicked ${name}`);
            }
        },
        {
            title: 'Contact',
            url: '#Contact',
            onClickHandler: (name: string) => {
                console.log(`Clicked ${name}`);
            }
        }
    ];

    const getWeatherResponse = async (lat?: number, lon?: number) => {
        const data = await getWeather(lat, lon);
        setWeatherData(data);
    };

    const showWeather = () => {
        if (weatherData) {
            return (
                <WeatherCard
                    data={weatherData}
                    onClickHandler={() => setWeatherData(undefined)}
                />
            );
        }
    };

    return (
        <>
            <NavBar
                items={items}
                searchOnClickHandler={(search) => {
                    // eslint-disable-next-line
                    // @ts-expect-error
                    setArray([search, ...array]);
                    search = '';
                    // getWeather();
                }}
                searchOnChangeHandler={(e) => {
                    setLiveWord(e.target.value);
                }}
            >
                Wazzaaaa
            </NavBar>
            <h1>{liveWord}</h1>
            <div className="container text-center">
                <div className="row align-items-start">
                    <div
                        className="col"
                        style={{ width: '100%', height: '500px' }}
                    >
                        <DeckGL
                            initialViewState={INITIAL_VIEW_STATE}
                            controller={true}
                            layers={layerSC}
                        >
                            <APIProvider apiKey={GoogleMapsAPI.key}>
                                <Map
                                    defaultCenter={{
                                        lat: 35.41737548546202,
                                        lng: -80.83200558162271
                                    }}
                                    mapId={GoogleMapsAPI.mapId}
                                    defaultZoom={12}
                                    streetViewControl={false}
                                    mapTypeControl={false}
                                    fullscreenControl={false}
                                    zoomControl={false}
                                    onClick={async ({ detail }) => {
                                        await getWeatherResponse(
                                            detail?.latLng?.lat,
                                            detail?.latLng?.lng
                                        );
                                    }}
                                ></Map>
                            </APIProvider>
                        </DeckGL>
                    </div>
                    <div className="col">{showWeather()}</div>
                </div>
            </div>
        </>
    );
}

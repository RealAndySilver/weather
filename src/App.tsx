// import { useState } from "react";
import { NavBar } from './components/NavBar';
import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { WeatherCard } from './components/WeatherCard';

const api = {
    key: 'd84c0557be4a7d0cf1563dba29dfa3b0',
    base: 'https://api.openweathermap.org/data/3.0/onecall?'
};

function App() {
    const [array, setArray] = useState<string[]>([]);
    const [weatherData, setWeatherData] = useState<any>();
    const [liveWord, setLiveWord] = useState<string>();
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

    const getWeather = async () => {
        const url = `${api.base}lat=33.44&lon=-94.04&exclude=hourly&appid=${api.key}`;
        const { data } = await axios.get(url);
        console.log(`Getting data`);
        setWeatherData(data);
    };

    const showWeather = () => {
        if (weatherData) {
            return <WeatherCard data={weatherData} />;
        }
    };

    return (
        <>
            <NavBar
                items={items}
                searchOnClickHandler={(search) => {
                    setArray([search, ...array]);
                    search = '';
                    getWeather();
                }}
                searchOnChangeHandler={(e) => {
                    setLiveWord(e.target.value);
                }}
            >
                Wazzaaaa
            </NavBar>
            <h1>{liveWord}</h1>
            <div>{showWeather()}</div>
        </>
    );
}

export default App;

import { useState } from 'react';
import { WeatherType } from '../types/WeatherTypes';

interface WeatherCardProps {
    data: WeatherType;
}
const transformKey = (key: string) => {
    const arr = key
        .split('_')
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
    const result = arr.reduce((acc, curr) => {
        return `${acc.charAt(0).toUpperCase()}${acc.slice(1)} ${curr
            .charAt(0)
            .toUpperCase()}${curr.slice(1)}`;
    });
    return result;
};
export const WeatherCard = ({ data }: WeatherCardProps) => {
    const [currentData] = useState<WeatherType['current']>(data.current);
    const [currentKeys] = useState<string[]>(Object.keys(data.current));
    // console.log(`Current keys: ${JSON.stringify(currentData['dt'], null, 2)}`)
    // const date = new Date(current.dt);

    return (
        <div className="row">
            {currentKeys.map((key: string, index: number) => {
                return (
                    <div
                        className="card text-bg-dark mb-3"
                        style={{ maxWidth: '18rem', margin: '10px' }}
                        key={index}
                    >
                        <div className="card-header">{data['timezone']}</div>
                        <div className="card-body">
                            <h5 className="card-title">Lat:{data.lat} / Lon:{data.lon}</h5>
                            <p className="card-text">
                                {transformKey(key)}: {`${currentData[key]}`}
                            </p>
                        </div>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => {
                                // onClickHandler(index);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

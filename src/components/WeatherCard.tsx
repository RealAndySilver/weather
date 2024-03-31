import { useState } from 'react';
import { WeatherType } from '../types/WeatherTypes';
import { processDate, transformKey } from '../utilities/Processors';

interface WeatherCardProps {
    data: WeatherType;
    onClickHandler: () => void;
}
export const WeatherCard = ({ data, onClickHandler }: WeatherCardProps) => {
    const currentData = data.current;
    const currentKeys = Object.keys(currentData);
    return (
        <>
            <div
                className="card mb-3 text-bg-info text-start"
                style={{ width: '100%', opacity: '0.9'}}
            >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`https://openweathermap.org/img/wn/${currentData.weather[0]?.icon}@2x.png`}
                            className="img-fluid rounded-start"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{data.reverse.city}</h5>
                            {currentKeys.map((key: string) => {
                                return (
                                    <li className="list-group-item">
                                        <small className="text-body-secondary">
                                            {key !== 'dt'
                                                ? `${transformKey(key)}: `
                                                : ''}{' '}
                                            {`${
                                                key === 'dt' ||
                                                key === 'sunset' ||
                                                key === 'sunrise'
                                                    ? processDate(
                                                          currentData[key]
                                                      )
                                                    : // eslint-disable-next-line
                                                      // @ts-ignore
                                                      currentData[key]
                                            }`}
                                        </small>
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                        onClickHandler();
                    }}
                >
                    Close
                </button>
            </div>
        </>
    );
};

import React from "react";
import styled from "styled-components";
import useGeoLocation from "./hooks/useGeoLocation.jsx";

function Weather() {
    // 오늘 날짜
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let weekday = week[now.getDay()];
    // 현재 위치(좌표값)
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 60, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        maximumAge: 1000 * 3600 * 24, // 24 hour
    };
    const {location: currentLocation, error: currentError} = useGeoLocation(geolocationOptions);
    // location.latitude, location.longitude

    // 날씨 api
    const key = import.meta.env.VITE_WEATHER_API_KEY; //vite는 process 아닌 import.meta 사용
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0';


    return (
        <WeatherStyle>
            <div className="date">{year}년 {month}월 {day}일 {weekday}요일</div>
            <div className="weather_data">
                <div className="weather_area">대구</div>
                <div className="weather_figure">
                    <div className="weather_degrees">5℃</div>
                    <div className="weather_wind">2m/s</div>
                </div>
                <div className="weather_icon">
                    <span className="material-symbols-rounded">cloud</span>
                </div>
            </div>
        </WeatherStyle>
    )
}

const WeatherStyle = styled.div`
    margin-left: 10%;
    font-weight: 700;
    padding: 30px;
    .date {
        color: var(--main-blue05);
        font-size: 15px;
        margin-bottom: 20px;
    }
    .weather_data {
        color: var(--main-blue03);
        font-size: 24px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        > div {
            margin: 0 10px;
        }
    }
    .weather_figure {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .weather_icon span {
        font-size: 40px;
    }
`

export default Weather;
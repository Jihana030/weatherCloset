import React from "react";
import styled from "styled-components";
const WeatherStyle = styled.div`
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
    }
    .weather_figure {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .weather_icon {
        font-size: 40px;
    }
`
function Weather() {
    return (
        <WeatherStyle>
            <div className="date">2025년 01월 31일</div>
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

export default Weather;
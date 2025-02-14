import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import useDfsXyConv from "./hooks/useDfsXyConv.jsx";

function Weather() {
    const [weatherArea1, setWeatherArea1] = useState('');
    const [weatherArea2, setWeatherArea2] = useState('');
    // 오늘 날짜
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let weekday = week[now.getDay()];

    let hour = ('0' + now.getHours()).slice(-2);
    let minute = ('0' + (now.getMinutes() - 30)).slice(-2);
    if(now.getMinutes() < 30) {
        hour = ('0' + (now.getHours() - 1)).slice(-2);
        minute = ('0' + (now.getMinutes() + 30)).slice(-2);
    }

    // 현재 위치(좌표값)(위도(y) latitude, 경도(x) longitude)
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [xPosition, setXPosition] = useState('');
    const [yPosition, setYPosition] = useState('');
    let rs;
    window.navigator.geolocation.getCurrentPosition(success, error)
    console.log(rs);
    function success(e) {
        // setLatitude(e.coords.latitude)
        // setLongitude(e.coords.longitude)
        setLatitude(35.908607)
        setLongitude(128.608271)
        // 기상청 격자값으로 변환
        rs = useDfsXyConv("toXY", latitude, longitude);
        console.log(rs);
        setXPosition(rs.x);
        setYPosition(rs.y);
    }
    function error(e) {
        return;
    }

    // 위도, 경도로 현재 위치 찾기(kakao api)
    const kakaoKey = import.meta.env.VITE_KAKAO_API_KEY;
    let kakaoAddrUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;
    async function addrData(url="", data={}){
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Authorization': `KakaoAK ${kakaoKey}`,
                'content-type': 'application/json'
            },
        });
        return response.json();
    }
    addrData(kakaoAddrUrl).then(data => {
        setWeatherArea1(data.documents[0].address.region_1depth_name);
        setWeatherArea2(data.documents[0].address.region_2depth_name);
    })

    // 날씨 api
    const weatherKey = import.meta.env.VITE_WEATHER_API_KEY; //vite는 process 아닌 import.meta 사용
    const endPoint = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    let weatherUrl = `${endPoint}?serviceKey=${weatherKey}&numOfRows=10&pageNo=1&base_date=${year}${month}${day}&base_time=${hour}${minute}&nx=${xPosition}&ny=${yPosition}`;
    const [degrees, setDegrees] = useState('10');
    const [windSpeed, setWindSpeed] = useState('2');
    const [sky, setSky] = useState('');
    const [rain, setRain] = useState('');
    fetch(weatherUrl)
        .then(res => res.text())
        .then(str=>new DOMParser().parseFromString(str,'application/xml'))
        .then(xml=>{
            const itemsTag = xml.getElementsByTagName('items');
            const items = itemsTag[0].childNodes;
            items.forEach(item=>{
                let category = item.querySelector('category');
                if(category.textContent === 'T1H' ){
                    let obsrValue = item.querySelector('obsrValue').textContent;
                    if( 900 > parseInt(obsrValue) > -900){
                        setDegrees(obsrValue + '℃');
                    } else {
                        setDegrees('알 수 없음');
                    }
                } else if (category.textContent === 'WSD' ){
                    let obsrValue = item.querySelector('obsrValue').textContent;
                    if( 900 > parseInt(obsrValue) > -900){
                        setWindSpeed(obsrValue + 'm/s');
                    } else {
                        setDegrees('알 수 없음');
                    }
                } else if (category.textContent === 'SKY' ){
                    let obsrValue = item.querySelector('obsrValue').textContent;
                    setSky(obsrValue);
                } else if (category.textContent === 'PTY' ){
                    let obsrValue = item.querySelector('obsrValue').textContent;
                    setRain(obsrValue);
                }
            })
        })

    return (
        <WeatherStyle>
            <div className="date">{year}년 {month}월 {day}일 {weekday}요일 {hour}시</div>
            <div className="weather_data">
                <div className="weather_area">{weatherArea1} {weatherArea2}</div>
                <div className="weather_figure">
                    <div className="weather_degrees">{degrees}</div>
                    <div className="weather_wind">{windSpeed}</div>
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
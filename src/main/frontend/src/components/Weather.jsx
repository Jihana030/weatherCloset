import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";

function Weather() {
    // 오늘 날짜
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let weekday = week[now.getDay()];

    const nowHour = now.getHours();
    let hour;
    if(5 > nowHour >= 2){
        hour = '02';
    } else if (8 > nowHour >= 5){
        hour = '05';
    } else if (11 > nowHour >= 8){
        hour = '08';
    } else if (14 > nowHour >= 11){
        hour = '11';
    } else if (17 > nowHour >= 14){
        hour = '14';
    } else if (20 > nowHour >= 17){
        hour = '17';
    } else if (23 > nowHour >= 20){
        hour = '20';
    } else {
        hour = '23';
    }
    const nowMinute = now.getMinutes();
    let minute;
    if (nowMinute >= 10) {
        minute = '10';
    } else {
        minute = '00';
    }

    // 현재 위치(좌표값)(위도(y) latitude, 경도(x) longitude)
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    window.addEventListener('load', e => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(success, error)
        }
    })
    function success(e) {
        setLatitude(e.coords.latitude)
        setLongitude(e.coords.longitude)
    }
    function error(e) {}

    // 위도, 경도로 현재 위치 찾기(kakao api) - https여야해서, 서버가 없는 지금 이걸..
    const kakaoKey = import.meta.env.VITE_KAKAO_API_KEY;
    let kakaoUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;
    async function positionData(url="", data={}){
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Authorization': `KakaoAK ${kakaoKey}`,
                'content-type': 'application/json'
            },
        });
        return response.json();
    }
    positionData(kakaoUrl).then(data => {
        console.log(data);
    })

    // 날씨 api
    const weatherKey = import.meta.env.VITE_WEATHER_API_KEY; //vite는 process 아닌 import.meta 사용
    const endPoint = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    let weatherUrl = `${endPoint}?serviceKey=${weatherKey}&numOfRows=10&pageNo=1&base_date=${year}${month}${day}&base_time=${hour}${minute}&nx=${longitude}&ny=${latitude}`;
    const [degrees, setDegrees] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    fetch(weatherUrl)
        .then(res => res.text())
        .then(str=>new DOMParser().parseFromString(str,'application/xml'))
        .then(xml=>{
            const itemsTag = xml.getElementsByTagName('items');
            const items = itemsTag[0];
            // items.forEach(item=>{
            //     if(item.getElementsByTagName('category').innerText ){}
            // })
            console.log(xml)
        //     category WSD(풍속), TMP(1시간 기온), SKY(하늘상태), 값이
        })

    return (
        <WeatherStyle>
            <div className="date">{year}년 {month}월 {day}일 {weekday}요일 {hour}시</div>
            <div className="weather_data">
                <div className="weather_area">대구</div>
                <div className="weather_figure">
                    <div className="weather_degrees">{degrees}℃</div>
                    <div className="weather_wind">{windSpeed}m/s</div>
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
import React, {useEffect, useState} from "react";
import styled from "styled-components";

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
        setLatitude(Math.floor(e.coords.latitude))
        setLongitude(Math.floor(e.coords.longitude))
    }
    function error(e) {}

    // 위도, 경도로 현재 위치 찾기(kakao api)


    // 날씨 api
    const key = import.meta.env.VITE_WEATHER_API_KEY; //vite는 process 아닌 import.meta 사용
    const endPoint = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    let url = `${endPoint}?serviceKey=${key}&numOfRows=10&pageNo=1&base_date=${year}${month}${day}&base_time=${hour}${minute}&nx=${longitude}&ny=${latitude}`;
    const [degrees, setDegrees] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    fetch(url)
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
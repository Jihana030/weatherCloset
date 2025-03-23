import React, {Suspense, useState} from "react";
import styled from "styled-components";
import useDfsXyConv from "./hooks/useDfsXyConv.jsx";
import Loading from "./Loading.jsx";

function Weather() {
    // 위치 주소
    const [weatherArea1, setWeatherArea1] = useState('');
    const [weatherArea2, setWeatherArea2] = useState('');
    // 현재 위치(좌표값)(위도(y) latitude, 경도(x) longitude)
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [xPosition, setXPosition] = useState('');
    const [yPosition, setYPosition] = useState('');
    let rs;
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
    // 날씨 api
    const weatherKey = import.meta.env.VITE_WEATHER_API_KEY; //vite는 process 아닌 import.meta 사용
    const endPoint = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    let weatherUrl = `${endPoint}?serviceKey=${weatherKey}&numOfRows=10&pageNo=1&base_date=${year}${month}${day}&base_time=${hour}${minute}&nx=${xPosition}&ny=${yPosition}`;
    const [degrees, setDegrees] = useState('10℃');
    const [windSpeed, setWindSpeed] = useState('2m/s');
    const [sky, setSky] = useState(1);
    const [rain, setRain] = useState(1);
    const [icon, setIcon] = useState('sunny');

    function positionSuccess(e) {
        setLatitude(e.coords.latitude)
        setLongitude(e.coords.longitude)
        // setLatitude(35.908607)
        // setLongitude(128.608271)
        // 기상청 격자값으로 변환
        rs = useDfsXyConv("toXY", latitude, longitude);
        setXPosition(rs.x);
        setYPosition(rs.y);
    }
    function positionError(e) {
        return;
    }

    window.navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
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

    //날씨api
    async function weatherData(url=""){
        const [response] = await Promise.all([fetch(url)]);
        return response;
    }
    weatherData(weatherUrl)
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
    // weather cloud, sunny rainy partlyCloudyDay weatherSnowy
    // 하늘 1 : 맑음, 3 : 구름많음, 4 : 흐림
    // 강수 0 : 없음, 1 : 비, 2 : 비/눈, 3 : 눈, 5 : 빗방울, 6 : 빗방울/눈날림, 7 : 눈날림
    if(sky === 1 && rain === 0) {
        setIcon('sunny')
    } else if(sky === 3 && rain === 0) {
        setIcon('partly_cloudy_day');
    } else if(sky === 4 && rain === 0) {
        setIcon('cloud');
    } else if(sky === 4 && (rain === 1 || rain === 2 || rain === 5 || rain === 6)) {
        setIcon('rainy');
    } else if (sky === 4 && (rain === 3 || rain === 7)) {
        setIcon('weather_snowy');
    }

    return (
        <Suspense fallback={<Loading/>}>
            <WeatherStyle>
                <div className="date">{year}년 {month}월 {day}일 {weekday}요일 {hour}시 기준</div>
                <div className="weather_data">
                    <div className="weather_area">{weatherArea1} {weatherArea2}</div>
                    <div className="weather_figure">
                        <div className="weather_degrees">{degrees}</div>
                        <div className="weather_wind">{windSpeed}</div>
                    </div>
                    <div className="weather_icon">
                        <span className="material-symbols-rounded">{icon}</span>
                    </div>
                </div>
            </WeatherStyle>
        </Suspense>
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
        font-weight: 700;
    }
`

export default Weather;
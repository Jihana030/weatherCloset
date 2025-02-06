import React, {useEffect, useState} from "react";

function useGeoLocation(options = {}) {
    const [location, setLocation] = useState();
    const [error, setError] = useState();

    const handleSuccess = (pos) =>{
        const {latitude, longitude} = pos.coords;
        setLocation({
            latitude,
            longitude,
        })
    }
    const handleError = (error) => {
        setError(error.message);
    }

    useEffect(() => {
        const {geolocation} = navigator;

        if(!geolocation) {
            setError("위치를 찾을 수 없습니다.");
            return;
        }
        // api 호출
        geolocation.getCurrentPosition(handleSuccess, handleError, options);
    }, [options]);

    // 성공시 현재 위도와 경도를, 에러 발생 시 에러 메세지를.
    return {location, error};

}

export default useGeoLocation;
import { useState, useEffect } from 'react';
function Clk() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(function () {
        const intervalId = setInterval(function () {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return function () {
            clearInterval(intervalId);
            <p>Time: {time}</p>
        }
    })
}
export default Clk;
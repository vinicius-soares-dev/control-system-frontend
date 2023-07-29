import { useState, useEffect } from "react";
import "../../assets/styles/countdown.css";

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(5 * 60); 

    useEffect(() => {
        const timer = setInterval(() => {
            if(timeLeft > 0) {
                setTimeLeft((prevState) => prevState -1 );
            }


        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    useEffect(() => {
        if(timeLeft === 0) {
            localStorage.removeItem("Token JWT:");
            window.location.href = "/";
        }
    },[timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}: ${remainingSeconds.toString().padStart(2, '0')}`;
        
    };

    return (
        <div className="section-countdown">
            <h3 className="tittle-countdown">Sua sessão expira em: {formatTime(timeLeft)}</h3>
        </div>
    )
};

export default CountdownTimer;
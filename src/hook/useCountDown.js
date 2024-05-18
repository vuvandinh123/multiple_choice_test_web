import { useEffect, useState } from "react";

export default function useCoutDown({ duration, startTime, onCountdownEnd }) {
    const [remainingTime, setRemainingTime] = useState(duration * 60);
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Math.floor((Date.now() - startTime) / 1000);
            const timeLeft = Math.max(duration * 60 - currentTime, 0);
            setRemainingTime(timeLeft);
            if (timeLeft === 0) {
                clearInterval(interval);
                onCountdownEnd();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, duration, onCountdownEnd]);

    const displayTime = () => {
        const mins = Math.floor(remainingTime / 60);
        const secs = remainingTime % 60;
        const display = `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
        return { display, mins, secs };
    };
    return {
        ...displayTime(),
    }
}
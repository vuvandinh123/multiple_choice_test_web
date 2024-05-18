import { useEffect } from "react";
import { scrollWithOffset } from "../utils";
import { useLocation } from "react-router-dom";
export default function useScrollElement() {
    const location = useLocation();
    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const questionElement = document.querySelector(hash);
            if (questionElement) {
                scrollWithOffset(questionElement, 90);
            }
        }
    }, [location.hash]);
}
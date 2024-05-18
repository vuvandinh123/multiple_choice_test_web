/* eslint-disable react/prop-types */
import { useCoutDown } from "../../hook";
import Cookies from "js-cookie";
const CountdownTimer = ({ duration, onCountdownEnd }) => {
  const startTime = Cookies.get("quizStartTime");
  const { display, mins } = useCoutDown({
    startTime:Number(startTime),
    duration,
    onCountdownEnd,
  });
  return (
    <span className="flex gap-2 justify-end">
      Thời gian:{" "}
      <span
        className={`block w-10 font-bold text-end ${
          mins === 0 ? "text-red-500" : ""
        }`}
      >
        {display}
      </span>
    </span>
  );
};

export default CountdownTimer;

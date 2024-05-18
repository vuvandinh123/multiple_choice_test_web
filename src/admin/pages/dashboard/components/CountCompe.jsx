import { useEffect, useState } from "react";
import { countCompetition } from "../../../../service/competitionService";
import { handleError } from "../../../../utils";

const CountCompe = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await countCompetition();
        setData(res);
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <p className="text-3xl text-center font-bold">{data?.data}</p>
      <p className="text-center uppercase mt-5">
        Số bài thi đang được hiển thị
      </p>
    </div>
  );
};

export default CountCompe;

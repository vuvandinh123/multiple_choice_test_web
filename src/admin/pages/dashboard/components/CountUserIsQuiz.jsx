import { useEffect, useState } from "react";
import { countUserIsQuiz } from "../../../../service/userService";

const CountUserIsQuiz = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await countUserIsQuiz();
      setData(res.data);
    };
    fetchApi();
  }, []);
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <p className="text-3xl text-center font-bold">{data}</p>
      <p className="text-center uppercase mt-5">Số người đang thi</p>
    </div>
  );
};

export default CountUserIsQuiz;

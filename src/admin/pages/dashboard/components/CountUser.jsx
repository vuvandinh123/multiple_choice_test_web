/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { countUser } from "../../../../service/userService";
import { handleError } from "../../../../utils";

const CountUser = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await countUser();
        setData(res.data);
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <p className="text-3xl text-center font-bold">{data}</p>
      <p className="text-center uppercase mt-5">Tổng số thí sinh đã tham gia</p>
    </div>
  );
};

export default CountUser;

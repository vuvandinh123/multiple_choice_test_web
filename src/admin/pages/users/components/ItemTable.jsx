/* eslint-disable react/prop-types */

import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { secToMin } from "../../../../utils";
import { VscEye } from "react-icons/vsc";

const ItemTable = ({
  data,
  handleDelete,
  loading,
  setLoading,
  listId,
  setListId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-3 py-4 w-3">
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox-8"
            data-ripple-dark="true"
          >
            <input
              type="checkbox"
              value={data.id}
              checked={listId.includes(data.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setListId([...listId, data.id]);
                } else {
                  setListId(listId.filter((item) => item !== data.id));
                }
              }}
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox-8"
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </label>
        </div>
      </td>
      <td className="px-6 py-4">
        <Link to={`/admin/danh-sach-thi-sinh/${data.id}`}>{data?.name}</Link>
      </td>
      <td className="px-6 py-4">
        {Number(data?.status) ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            Hoàn thành
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Đang thi
          </span>
        )}
      </td>
      <td className="px-6 py-4">{data?.compe_name}</td>
      <td className="px-6 py-4">
        {moment(data?.start_time).format("HH:mm DD/MM/YYYY")}
      </td>
      <td className="px-6 py-4">{secToMin(data?.time)}</td>
      <td className="px-6 py-4">
        {data?.correct} / {data?.count_quesion}
      </td>
      <td className="px-6 py-4">{data.rank2}</td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <Link
            to={`/admin/danh-sach-thi-sinh/${data.id}`}
            className="hover:text-green-500 transition-all"
            onClick={() => setIsOpen(true)}
          >
            <VscEye size={24}></VscEye>
          </Link>
          <button
            type="button"
            className="cursor-pointer hover:text-red-500 transition-all"
            onClick={() => handleDelete(data.id)}
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemTable;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ExportJSON from "../../../components/ExportToJson";
import UploadFile from "../../../components/UploadFile";
import { getAllQuesionsByCategoryAdmin } from "../../../../service/categoryService";

const PreviewJson = ({ data, isOpen, setIsOpen, setJsonData, item }) => {
  const [jsonPreview, setJsonPreview] = useState(data);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllQuesionsByCategoryAdmin(item.id);
      if (res) {
        const newJson = res.data.questions.map((item) => ({
          questionText: item.questionText,
          answers: item.answers.map((item) => ({
            value: item.value,
            is_correct: item.is_correct,
          })),
        }));
        setJsonData(newJson);
      }
    };
    if (isOpen) {
      fetchApi();
    }
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      setJsonPreview(data);
    }
  }, [data, isOpen]);
  return (
    <div>
      <div
        className={`fixed w-screen  bg-black bg-opacity-25 z-[41] ${
          isOpen ? "visible" : "invisible"
        }`}
      ></div>
      <div
        className={` fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   z-50 transition-all duration-300  ${
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible opacity-0 scale-50"
        }`}
      >
        <div
          role="alert"
          className="container mx-auto mt-10 w-full lg:w-[1000px] max-w-full md:w-2/3 "
        >
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <h1 className="text-gray-800 text-xl font-lg font-bold tracking-normal leading-tight mb-4">
              data.json
            </h1>
            <div className="h-[400px] bg-gray-700 rounded-md border text-green-400 p-3 w-full overflow-auto">
              <pre>{JSON.stringify(jsonPreview, null, 2)}</pre>
            </div>
            <UploadFile setJsonData={setJsonPreview}></UploadFile>
            <div className="flex mt-5 items-center justify-between w-full">
              <div>
                <ExportJSON data={data}></ExportJSON>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setJsonData(null);
                  }}
                  type="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                >
                  Hủy
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setJsonData(jsonPreview);
                  }}
                  type="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                >
                  Lưu
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              aria-label="close modal"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewJson;

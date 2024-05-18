/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import { CgClose } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import ItemTable from "./components/ItemTable";
import toast from "react-hot-toast";
// import ModalNew from "./components/ModalNew";
import {
  deleteUser,
  deleteUserMultiple,
  getAllUser,
} from "../../../service/userService";
import { getAllCompetition } from "../../../service/competitionService";
import Xport from "./components/Xport";
import { handleError } from "../../../utils";
const ListUser = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [compe, setCompe] = useState([]);
  const [listId, setListId] = useState([]);
  const checkRef = useRef(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 1,
    totalPage: 1,
  });
  const [filter, setFilter] = useState({
    search: "",
    status: "All",
    orderBy: "newToOld",
    page: 1,
    limit: 5,
    compe_id: "All",
  });
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllCompetition({ limit: 1000 });
        setCompe(res.data.data);
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllUser(filter);
        setData(res.data.data);
        setPagination(res.pagination);
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    };
    fetchApi();
  }, [
    filter.status,
    filter.page,
    filter.limit,
    filter.search,
    loading,
    filter.compe_id,
    filter.orderBy,
  ]);
  const handleChangeSearch = _.debounce((q) => {
    setFilter({ ...filter, search: q });
  }, 500);
  const handlePageClick = (data) => {
    setFilter({ ...filter, page: data.selected + 1 });
  };
  useEffect(() => {
    handleChangeSearch(search);
  }, [search]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      `Bạn muốn xoá người dùng này nếu xóa tất cả dữ liệu liên quan sẽ bị xóa!`
    );
    if (!confirm) {
      return null;
    }
    setLoading(true);
    const res = await deleteUser(id);
    if (res.status === 200) {
      toast.success("Xoa thanh cong");
    }
    setLoading(false);
  };
  useEffect(() => {
    checkRef.current.checked = false;
  }, [filter.page]);
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      const arr = data.map((item) => item.id);
      const n = arr.filter((item) => !listId.includes(item));
      setListId([...listId, ...n]);
    } else {
      const arr = data.map((item) => item.id);
      const n = listId.filter((item) => !arr.includes(item));
      setListId(n);
    }
  };
  const handleDeleteMultiple = async () => {
    if (listId.length === 0) {
      toast.error("Chọn để xoá");
      return;
    }
    const confirm = window.confirm(
      `Bạn muốn xoá ${listId.length} người dùng này nếu xóa tất cả dữ liệu liên quan sẽ bị xóa!`
    );
    if (!confirm) {
      return null;
    }
    setLoading(true);
    const res = await deleteUserMultiple({ ids: listId });
    if (res.status === 200) {
      toast.success("Xoa thanh cong");
      setListId([]);
      checkRef.current.checked = false;
    }
    setLoading(false);
  };
  const handleLoading = () => {
    window.location.reload();
  }
  return (
    <div>
      {/* component */}
      <div className="bg-white rounded-lg p-5 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg">Danh sách các thí sinh</h3>
          <Xport data={data} />
          <button onClick={handleLoading} className="bg-pink-500 text-white px-3 py-1 rounded-lg">Làm mới</button>
        </div>
        <div className="flex justify-center gap-2 items-center">
          {filter.compe_id !== "All" && (
            <div>
              <select
                name=""
                onChange={(e) =>
                  setFilter({ ...filter, orderBy: e.target.value })
                }
                className="px-3 bg-white border outline-blue-500 border-gray-200 py-1 rounded-md"
                id=""
              >
                <option disabled selected value="">
                  Sắp xếp
                </option>
                <option value="newToOld">Mới nhất</option>
                <option value="oldToNew">Cũ nhất</option>
                <option value="correctDesc">Điểm cao đến thấp</option>
                <option value="correctAsc">Điểm thấp đến cao</option>
                <option value="timeDesc">Thời gian làm bài nhanh</option>
                <option value="timeAndCorrectDesc">
                  Làm nhanh và điểm cao
                </option>
              </select>
            </div>
          )}

          <div>
            <select
              name=""
              onChange={(e) =>
                setFilter({ ...filter, compe_id: e.target.value })
              }
              className="px-3 w-[200px] bg-white border outline-blue-500 border-gray-200 py-1 rounded-md"
              id=""
            >
              <option selected disabled value="">
                Cuộc thi
              </option>
              <option value="All">Tất cả</option>
              {compe.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name=""
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-3 bg-white border outline-blue-500 border-gray-200 py-1 rounded-md"
              id=""
            >
              <option selected disabled value="">
                Trạng thái
              </option>
              <option value="All">Tất cả</option>
              <option value="0">Đang thi</option>
              <option value="1">Đã hoàn thành</option>
            </select>
          </div>
          <div>
            <select
              name=""
              onChange={(e) => setFilter({ ...filter, limit: e.target.value })}
              className="px-3 bg-white border outline-blue-500 border-gray-200 py-1 rounded-md"
              id=""
            >
              <option selected disabled value="">
                Hiển thị
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="500">500</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              onChange={handleSearch}
              value={search}
              placeholder="Tìm kiếm ..."
              className="px-3 outline-blue-500 border border-gray-200 py-1 rounded-md"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 hover:bg-gray-100 p-1 rounded-md">
              {filter.search !== "" ? (
                <CgClose
                  className="text-gray-500"
                  onClick={() => setSearch("")}
                />
              ) : (
                <BiSearch className="text-gray-500" />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border bg-white border-gray-200 shadow-md mt-3">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-4 font-medium text-gray-900">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="checkbox-8"
                    data-ripple-dark="true"
                  >
                    <input
                      type="checkbox"
                      ref={checkRef}
                      onChange={handleCheckAll}
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
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Họ và tên
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tên cuộc thi
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Thời gian bắt đầu
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Thời gian làm
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Số điểm đạt được
              </th>
              {filter.compe_id !== "All" && (
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Xếp hạng
                </th>
              )}

              <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {data?.map((item) => (
              <ItemTable
                key={item.id}
                loading={loading}
                setLoading={setLoading}
                setListId={setListId}
                listId={listId}
                handleDelete={handleDelete}
                data={item}
              />
            ))}
            {data?.length === 0 && (
              <>
                <tr className="text-center">
                  <td colSpan={7} className="px-6 py-4">
                    Chưa có người thi
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <hr />
        <div className="flex gap-5 items-center">
          <ReactPaginate
            className="flex items-center gap- ms-3 my-3 "
            pageLinkClassName="block"
            activeClassName="bg-blue-500 text-white"
            pageClassName="cursor-pointer flex items-center justify-center w-8 h-8  hover:bg-blue-500  border border-l-0 border-blue-500 hover:text-white"
            nextClassName="cursor-pointer block  w-8 h-8 flex items-center justify-center  hover:bg-blue-500 border border-blue-500 hover:text-white rounded-e-lg"
            previousClassName="cursor-pointer rounded-s-lg  w-8 h-8 flex items-center justify-center  hover:bg-blue-500  border border-blue-500 hover:!text-white"
            breakLabel="..."
            nextLabel={<FcNext></FcNext>}
            onPageChange={handlePageClick}
            breakClassName="cursor-pointer block w-8 h-8 flex items-center justify-center  hover:bg-blue-500  border border-blue-500 hover:text-white"
            pageRangeDisplayed={2}
            pageCount={pagination?.totalPage}
            previousLabel={<FcPrevious></FcPrevious>}
            renderOnZeroPageCount={null}
          />
          <button
            onClick={handleDeleteMultiple}
            className="bg-red-500  font-bold text-white px-3 py-1 rounded-md"
          >
            Xóa {listId.length > 0 && "(" + listId.length + ")"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListUser;

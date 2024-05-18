/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategory,
} from "../../../service/categoryService";
import { FcNext, FcPrevious } from "react-icons/fc";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import { CgClose } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import ItemTable from "./components/ItemTable";
import toast from "react-hot-toast";
import ModalNew from "./components/ModalNew";
const ListCategory = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 1,
    totalPage: 1,
  });
  const [filter, setFilter] = useState({
    search: "",
    is_active: "All",
    page: 1,
    limit: 5,
  });
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllCategory(filter);
      setData(res.data.data);
      setPagination(res.pagination);
    };
    fetchApi();
  }, [filter.is_active, filter.page, filter.limit, filter.search, loading]);
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
      "Bạn muốn xoá cuộc thi này nếu xóa tất cả dữ liệu liên quan sẽ bị xóa!"
    );
    if (!confirm) {
      return null;
    }
    setLoading(true);
    try {
      const res = await deleteCategory(id);
      if (res.status === 200) {
        toast.success("Xoa thanh cong");
      }
    } catch (error) {
      toast.error("Xóa thật bại");
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div>
      {/* component */}
      <div className="bg-white rounded-lg p-5 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg">Danh sách các chủ đề thi</h3>
          <ModalNew loading={loading} setLoading={setLoading}></ModalNew>
        </div>
        <div className="flex justify-center gap-2 items-center">
          <div>
            <select
              name=""
              onChange={(e) =>
                setFilter({ ...filter, is_active: e.target.value })
              }
              className="px-3 bg-white border outline-blue-500 border-gray-200 py-1 rounded-md"
              id=""
            >
              <option disabled value="">
                Trạng thái
              </option>
              <option value="All">Tất cả</option>
              <option value="1">Hoạt động</option>
              <option value="0">Không hoat động</option>
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
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tên chủ đề
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Ngày tạo
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {data?.map((item) => (
              <ItemTable
                key={item.id}
                loading={loading}
                setLoading={setLoading}
                handleDelete={handleDelete}
                data={item}
              />
            ))}
            {data?.length === 0 && (
              <>
                <tr className="text-center">
                  <td colSpan={7} className="px-6 py-4">
                    Chưa có dữ liệu
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <hr />
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
      </div>
    </div>
  );
};

export default ListCategory;

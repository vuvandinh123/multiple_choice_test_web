import { Outlet } from "react-router-dom";
import Header from "./admin/Header";
import SiderBar from "./admin/SiderBar";
import { useApiCall } from "../hook";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { toast } from "react-hot-toast";
import { checkToken } from "../service/accountService";
const LayoutAdmin = () => {
  useEffect(() => {
    if (!Cookie.get("accessToken")) {
      window.location.href = "/admin/login";
    } else {
      try {
        const fetchApi = async () => {
          const res = await checkToken();
          if (res) {
            // Cookie.set("accessToken", res.token);
            // Cookie.set("userId", res.id);
            // // window.location.href = "/admin";
          }
        };
        fetchApi();
      } catch (error) {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      }
    }
  }, []);
  return (
    <div className="">
      <Header></Header>
      <div className="grid grid-cols-12 gap-3 px-4">
        <div className="lg:col-span-1 col-span-12 ">
          <SiderBar></SiderBar>
        </div>
        <div className="col-span-12 lg:col-span-11">
          <Outlet></Outlet>
        </div>
      </div>
      <p className="text-gray-500 text-center mb-5">Copyright © 2024 Vu Dinh</p>
    </div>
  );
};

export default LayoutAdmin;

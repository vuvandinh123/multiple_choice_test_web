/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookie from "js-cookie";
import { checkToken } from "../../service/accountService";
import toast from "react-hot-toast";
const LayoutAdmin = ({ children }) => {
  useEffect(() => {
    try {
      const fetchApi = async () => {
        try {
          await checkToken();
        } catch (error) {
          if (error.response.status === 401) {
            window.location.href = "/admin/login";
          }
        }
      };
      fetchApi();
    } catch (error) {
      toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
    }
  }, [window.location.pathname]);
  return (
    <div>
      <Header></Header>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default LayoutAdmin;

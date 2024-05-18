import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AccountLogin, checkToken } from "../../../service/accountService";
import { toast } from "react-hot-toast";
const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    const checkData = async () => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        try {
          const res = await checkToken();
          if (res) {
            window.location.href = "/admin";
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginApi = async () => {
      try {
        const res = await AccountLogin(data);
        if (res?.token) {
          Cookies.set("accessToken", res.token, { expires: 1 });
          Cookies.set("adminId", res.id, { expires: 1 });
          Cookies.set(
            "user",
            JSON.stringify({ email: res.email, name: res.name, id: res.id }),
            { expires: 1 }
          );
          window.location.href = "/admin";
        }
      } catch (error) {
        console.log(error);
        toast.error("Tài khoản hoặc mật khẩu không đúng");
      }
    };
    loginApi();
  };
  return (
    <div>
      <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <form
          onSubmit={handleSubmit}
          className="relative py-3 sm:w-96 mx-auto text-center"
        >
          <span className="text-2xl uppercase font-light ">
            Đăng nhập vào trang quản trị
          </span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-pink-400 rounded-t-md" />
            <div className="px-8 py-6 ">
              <label className="block font-semibold">
                Tên đăng nhập hoặc email{" "}
              </label>
              <input
                type="text"
                placeholder="Tên tài khoản hoặc email"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-pink-500 focus:ring-1 rounded-md"
              />
              <label className="block mt-3 font-semibold"> Mật khẩu</label>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-pink-500 focus:ring-1 rounded-md"
              />
              <div className="flex justify-between items-baseline">
                <button
                  type="submit"
                  className="mt-4 bg-pink-500 text-white py-2 px-6 rounded-md hover:bg-pink-600 "
                >
                  Đăng nhập
                </button>
                <a
                  onClick={() => {
                    alert("Chức năng đang phát triển");
                  }}
                  href="#"
                  className="text-sm hover:underline"
                >
                  Quên mật khẩu
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

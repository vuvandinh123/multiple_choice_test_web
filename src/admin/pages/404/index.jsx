import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="font-semibold text-red-600 text-[100px]">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Không tìm thấy trang
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              href="#"
              className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Về trang chủ
            </Link>
            <a
              href="emailto:vuvandinh203@gmail.com"
              className="text-sm font-semibold text-gray-900"
            >
              Hỗ trợ <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page404;

import { utils, writeFileXLSX } from "xlsx";
import { secToMin } from "../../../../utils";

const Xport = ({ data }) => {
  async function xport() {
    /* fetch JSON data and parse */
    const raw_data = data;

    /* flatten objects */
    const rows = raw_data.map((row, index) => ({
      index: index + 1,
      id: row.id,
      name: row.name,
      union_name: row.union_name,
      compe_name: row.compe_name,
      start_time: row.start_time,
      end_time: row.end_time,
      time: ((row) => {
        return secToMin(row.time ?? 0);
      })(row),
      sec: ((row) => {
        return row.time ?? 0;
      })(row),
      forecast: row?.forecast,
      correct: row.correct,
      count_quesion: row.count_quesion,
    }));

    /* generate worksheet and workbook */
    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Dates");

    /* fix headers */
    utils.sheet_add_aoa(
      worksheet,
      [
        [
          "STT",
          "Id",
          "Name",
          "Công đoàn",
          "Bài thi",
          "Thời gian bắt đầu",
          "Thời gian kết thúc",
          "Thời gian làm bài (phút)",
          "Thời gian làm bài (giây)",
          "Dự đoán",
          "Đúng",
          "Số lượng câu hỏi",
        ],
      ],
      { origin: "A1" }
    );

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet["!cols"] = [{ wch: max_width }];

    /* create an XLSX file and try to save to Presidents.xlsx */
    writeFileXLSX(workbook, "data.xlsx");
  }

  return (
    <button
      className="hover:bg-blue-500 text-white bg-blue-400 px-3 py-1 rounded-md "
      onClick={xport}
    >
      Xuất dữ liệu
    </button>
  );
};

export default Xport;

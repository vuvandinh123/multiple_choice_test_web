import toast from "react-hot-toast";

export const scrollWithOffset = (element, offset) => {
  const offsetPosition =
    element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
export const formathDate = (timestampString) => {
  const timestampDate = new Date(timestampString);

  // Lấy giá trị ngày, giờ và phút từ timestampDate
  const year = timestampDate.getFullYear();
  const month = (`0${timestampDate.getMonth() + 1}`).slice(-2); // Thêm '0' phía trước nếu số tháng có một chữ số
  const day = (`0${timestampDate.getDate()}`).slice(-2); // Thêm '0' phía trước nếu số ngày có một chữ số
  const hour = (`0${timestampDate.getHours()}`).slice(-2); // Thêm '0' phía trước nếu số giờ có một chữ số
  const minute = (`0${timestampDate.getMinutes()}`).slice(-2); // Thêm '0' phía trước nếu số phút có một chữ số

  // Định dạng thành chuỗi đủ dài để sử dụng trong input "datetime-local"
  const formattedDateTime = `${year}-${month}-${day}T${hour}:${minute}`;
  return formattedDateTime;
}
export const formathDate2 = (inputDateTime) => {
  const date = new Date(inputDateTime);

  // Lấy các thành phần của thời gian từ đối tượng Date
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  const hour = (`0${date.getHours()}`).slice(-2);
  const minute = (`0${date.getMinutes()}`).slice(-2);

  // Tạo chuỗi định dạng "yyyy-mm-dd hh:mm:ss"
  const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:00`;
  return formattedDateTime;
}
export const formathTime = (startTimeString, endTimeString) => {
  const startTime = new Date(startTimeString);
  const endTime = new Date(endTimeString);
  const timeDiff = endTime.getTime() - startTime.getTime();
  const totalSeconds = Math.round(timeDiff / 1000);
  const minutesWorked = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  if (minutesWorked >= 30) {
    return minutesWorked + ":" + "00";
  }
  return minutesWorked + ":" + remainingSeconds;
}
export const secToMin = (sec) => {
  const minutes = Math.floor(sec / 60);
  const remainingSeconds = sec % 60;
  return minutes + " Phút " + remainingSeconds + " Giây ";
}
export function validateJSONStructure(jsonData) {
  // Kiểm tra xem có phải là một mảng không
  if (!Array.isArray(jsonData)) {
    return false;
  }

  // Kiểm tra từng phần tử trong mảng
  for (let item of jsonData) {
    // Kiểm tra xem mỗi phần tử có các trường 'questionText' và 'answers' không
    if (!('questionText' in item) || !('answers' in item)) {
      return false;
    }

    // Kiểm tra trường 'answers' có phải là một mảng không
    if (!Array.isArray(item.answers)) {
      return false;
    }

    // Kiểm tra từng phần tử trong mảng 'answers'
    for (let answer of item.answers) {
      // Kiểm tra xem mỗi phần tử trong 'answers' có các trường 'value' và 'is_correct' không
      if (!('value' in answer) || !('is_correct' in answer)) {
        return false;
      }

      // Kiểm tra trường 'is_correct' có phải là một số 0 hoặc 1 không
      if (typeof answer.is_correct !== 'number' || (answer.is_correct !== 0 && answer.is_correct !== 1)) {
        return false;
      }
    }
  }

  // Nếu không có lỗi, trả về true
  return true;
}
export function checkWhitespace(inputString) {
  var whitespaceRegex = /\s/;
  return whitespaceRegex.test(inputString);
}
export function allFieldsNotEmpty(obj) {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      return false;
    }
  }
  return true; // Nếu tất cả các trường đều khác rỗng, trả về true
}
export function handleError(error) {
  if (error.response.status === 401) {
    toast.error(error.response.data.message);
    window.location.href = "/admin/login";
  }
  toast.error("Đã xảy ra lỗi vui lòng liên hệ đẩ đ̣c hỗ trợ !");
}

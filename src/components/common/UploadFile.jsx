/* eslint-disable react/prop-types */

export default function UploadFile({ setJsonData }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          setJsonData(data);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error("Invalid file type. Please select a JSON file.");
    }
  };

  return (
    <input
      accept=".json"
      onChange={handleFileChange}
      type="file"
      className="mb-5 p-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
      name=""
      id=""
    />
  );
}

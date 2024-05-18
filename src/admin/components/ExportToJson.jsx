/* eslint-disable react/prop-types */

const ExportJSON = ({ data }) => {
  const exportToJsonFile = (jsonData) => {
    let dataStr = JSON.stringify(jsonData);
    let dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    let exportFileDefaultName = "data.json";

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <button
      type="button"
      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
      onClick={() => exportToJsonFile(data)}
    >
      Export JSON
    </button>
  );
};

export default ExportJSON;

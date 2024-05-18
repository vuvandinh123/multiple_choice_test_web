/* eslint-disable react/prop-types */
import CountdownTimer from "../../../components/common/CountDown";
const Header = ({ answers, data, category, onCountdownEnd }) => {
  return (
    <div className="max-w-full z-10 shadow-lg fixed top-0 left-0 right-0 bg-white mx-auto my-auto px-5 lg:py-3 pt-3">
      <div className="text-center font-bold lg:hidden">
        {category?.name}
      </div>
      <div className="bg-white w-[900px] max-w-full mx-auto p-3 flex justify-between items-center">
        <span>
          {Object.keys(answers).length}/{data?.length}
        </span>
        <span className="uppercase font-bold hidden lg:block">
          {category?.name}
        </span>
        {category?.duration ? (
          <CountdownTimer
            onCountdownEnd={onCountdownEnd}
            duration={category?.duration}
          ></CountdownTimer>
        ) : (
          <>00:00</>
        )}
      </div>
    </div>
  );
};

export default Header;

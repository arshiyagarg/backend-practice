import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Lottie animationData={loadingAnimation} loop={true} style={{ width: 120, height: 120 }} />
    </div>
  );
};

export default Spinner;

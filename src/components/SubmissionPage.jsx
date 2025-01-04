import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const SubmissionPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full text-center p-8 shadow-md bg-white rounded-lg">
          <NavLink
            to="/home"
            className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          >
            Go Back
          </NavLink>
          <h2 className="text-2xl font-semibold mb-4">Submission Page</h2>
          <h3 className="text-gray-500">Invoice Submitted Successfully</h3>
        </div>
      </div>
    </>
  );
};

export default SubmissionPage;

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data from localStorage
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-gray-600">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-white text-2xl font-bold">Edstruments</span>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="text-white px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

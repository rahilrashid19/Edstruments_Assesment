import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import InvoicePage from "./components/InvoicePage";
import InvoiceDetails from "./components/InvoiceDetails";
import Comments from "./components/Comments";
import SubmissionPage from "./components/SubmissionPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/invoice-page" element={<InvoicePage />} />
        <Route path="/invoice-details" element={<InvoiceDetails />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/submissionPage" element={<SubmissionPage />} />
      </Routes>
    </div>
  );
};

export default App;

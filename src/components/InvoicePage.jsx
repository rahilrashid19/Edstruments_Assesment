import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowLeft, Upload } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const InvoicePage = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    vendor: Yup.string().required("Vendor is required"),
    invoiceNumber: Yup.string().required("Invoice number is required"),
    invoiceDate: Yup.date().required("Invoice date is required"),
    totalAmount: Yup.number()
      .required("Total amount is required")
      .positive("Amount must be positive"),
    paymentTerms: Yup.string().required("Payment terms are required"),
    invoiceDueDate: Yup.date().required("Due date is required"),
    glPostDate: Yup.date().required("GL post date is required"),
    invoiceDescription: Yup.string().required(
      "Invoice description is required"
    ),
    lineAmount: Yup.number()
      .required("Line amount is required")
      .positive("Amount must be positive"),
    department: Yup.string().required("Department is required"),
    account: Yup.string().required("Account is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Description is required"),
    comments: Yup.string(),
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log("Selected files:", files);
    }
  };

  const formik = useFormik({
    initialValues: {
      vendor: "",
      invoiceNumber: "",
      invoiceDate: "",
      totalAmount: "",
      paymentTerms: "",
      invoiceDueDate: "",
      glPostDate: "",
      invoiceDescription: "",
      lineAmount: "",
      department: "",
      account: "",
      location: "",
      description: "",
      comments: "",
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("invoiceData", JSON.stringify(values));
      navigate("/submissionPage");
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("invoiceData");
    if (savedData) {
      formik.setValues(JSON.parse(savedData));
    }
  }, []);

  // Helper function to display error message
  // eslint-disable-next-line react/prop-types
  const ErrorMessage = ({ name }) =>
    formik.touched[name] && formik.errors[name] ? (
      <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
    ) : null;

  // Helper function for input fields
  const inputClassName = (fieldName) => `
    w-full border p-2 rounded
    ${
      formik.touched[fieldName] && formik.errors[fieldName]
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    }
  `;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="max-w-6xl mx-auto border rounded-md bg-white">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-6 justify-between">
            <button
              type="button"
              className="flex items-center gap-2 mb-4 sm:mb-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Create New Invoice
            </button>
            <div className="w-full sm:w-[40%] flex flex-col sm:flex-row justify-around items-center sm:mr-[30%]">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-700"
                }
              >
                Vendor Details
              </NavLink>
              <NavLink
                to="/invoice-details"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-700"
                }
              >
                Invoice Details
              </NavLink>
              <NavLink
                to="/comments"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-700"
                }
              >
                Comments
              </NavLink>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 p-6">
            <div className="md:w-1/3">
              <div className="text-center border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col justify-between">
                <div>
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Upload Your Invoice
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    To auto complete fields and save time
                  </p>
                </div>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="flex items-center gap-2 mx-auto mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
                  >
                    <Upload className="w-4 h-4" />
                    Choose File
                  </button>
                  <p className="text-xs text-gray-400 mt-2">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="grid gap-8">
                {/* Vendor Details */}
                <div>
                  <h1 className="text-3xl font-semibold mb-4">
                    Vendor Details
                  </h1>
                  <div className="grid gap-4">
                    <div>
                      <label className="text-lg" htmlFor="vendor">
                        Vendor Information
                      </label>
                      <select
                        id="vendor"
                        name="vendor"
                        {...formik.getFieldProps("vendor")}
                        className={inputClassName("vendor")}
                      >
                        <option value="">Select vendor...</option>
                        <option value="vendor1">Vendor 1</option>
                        <option value="vendor2">Vendor 2</option>
                        <option value="vendor3">Vendor 3</option>
                      </select>
                      <ErrorMessage name="vendor" />
                    </div>
                  </div>
                </div>

                {/* Invoice Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Invoice Details
                  </h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="invoiceNumber">Invoice Number</label>
                        <input
                          id="invoiceNumber"
                          type="text"
                          {...formik.getFieldProps("invoiceNumber")}
                          className={inputClassName("invoiceNumber")}
                          placeholder="Enter invoice number"
                        />
                        <ErrorMessage name="invoiceNumber" />
                      </div>
                      <div>
                        <label htmlFor="invoiceDate">Invoice Date</label>
                        <input
                          id="invoiceDate"
                          type="date"
                          {...formik.getFieldProps("invoiceDate")}
                          className={inputClassName("invoiceDate")}
                        />
                        <ErrorMessage name="invoiceDate" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="totalAmount">Total Amount</label>
                        <input
                          id="totalAmount"
                          type="number"
                          {...formik.getFieldProps("totalAmount")}
                          className={inputClassName("totalAmount")}
                          placeholder="Enter Total Amount"
                        />
                        <ErrorMessage name="totalAmount" />
                      </div>
                      <div>
                        <label htmlFor="paymentTerms">Payment Terms</label>
                        <select
                          id="paymentTerms"
                          {...formik.getFieldProps("paymentTerms")}
                          className={inputClassName("paymentTerms")}
                        >
                          <option value="">Select terms...</option>
                          <option value="net30">Net 30</option>
                          <option value="net60">Net 60</option>
                        </select>
                        <ErrorMessage name="paymentTerms" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="invoiceDueDate">Invoice Due Date</label>
                        <input
                          id="invoiceDueDate"
                          type="date"
                          {...formik.getFieldProps("invoiceDueDate")}
                          className={inputClassName("invoiceDueDate")}
                        />
                        <ErrorMessage name="invoiceDueDate" />
                      </div>
                      <div>
                        <label htmlFor="glPostDate">GL Post Date</label>
                        <input
                          id="glPostDate"
                          type="date"
                          {...formik.getFieldProps("glPostDate")}
                          className={inputClassName("glPostDate")}
                        />
                        <ErrorMessage name="glPostDate" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="invoiceDescription">
                        Invoice Description
                      </label>
                      <input
                        id="invoiceDescription"
                        type="text"
                        {...formik.getFieldProps("invoiceDescription")}
                        className={inputClassName("invoiceDescription")}
                        placeholder="Enter Invoice description"
                      />
                      <ErrorMessage name="invoiceDescription" />
                    </div>
                  </div>
                </div>

                {/* Expense Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Expense Details
                  </h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="lineAmount">Line Amount</label>
                        <input
                          id="lineAmount"
                          type="number"
                          {...formik.getFieldProps("lineAmount")}
                          className={inputClassName("lineAmount")}
                          placeholder="$0.00"
                        />
                        <ErrorMessage name="lineAmount" />
                      </div>
                      <div>
                        <label htmlFor="department">Department</label>
                        <select
                          id="department"
                          {...formik.getFieldProps("department")}
                          className={inputClassName("department")}
                        >
                          <option value="">Select department...</option>
                          <option value="dept1">Department 1</option>
                          <option value="dept2">Department 2</option>
                          <option value="dept3">Department 3</option>
                        </select>
                        <ErrorMessage name="department" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="account">Account</label>
                        <select
                          id="account"
                          {...formik.getFieldProps("account")}
                          className={inputClassName("account")}
                        >
                          <option value="">Select Account...</option>
                          <option value="account1">Account 1</option>
                          <option value="account2">Account 2</option>
                          <option value="account3">Account 3</option>
                        </select>
                        <ErrorMessage name="account" />
                      </div>
                      <div>
                        <label htmlFor="location">Location</label>
                        <select
                          id="location"
                          {...formik.getFieldProps("location")}
                          className={inputClassName("location")}
                        >
                          <option value="">Select Location...</option>
                          <option value="location1">Location 1</option>
                          <option value="location2">Location 2</option>
                          <option value="location3">Location 3</option>
                        </select>
                        <ErrorMessage name="location" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description">Description</label>
                      <input
                        id="description"
                        type="text"
                        {...formik.getFieldProps("description")}
                        className={inputClassName("description")}
                        placeholder="Enter description"
                      />
                      <ErrorMessage name="description" />
                    </div>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Comments</h2>
                  <textarea
                    id="comments"
                    {...formik.getFieldProps("comments")}
                    className={inputClassName("comments")}
                    placeholder="Add a comment you would like to tag to this invoice"
                    rows="4"
                  ></textarea>
                  <ErrorMessage name="comments" />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4">
                  <button type="button" className="border px-4 py-2 rounded">
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Submit & Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoicePage;

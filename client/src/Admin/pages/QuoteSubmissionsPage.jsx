import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getQuoteSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from "../services/submissionService";
import SubmissionDetailModal from "../components/submission/SubmissionDetailModal"; // Assuming modal is styled
import {
  FiFileText,
  FiEye,
  FiCheckCircle,
  FiTrash2,
  FiAlertCircle,
} from "react-icons/fi";

const QuoteSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data } = await getQuoteSubmissions();
      setSubmissions(data);
    } catch (err) {
      toast.error("Failed to fetch quote requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id) => {
    const promise = updateSubmissionStatus("quote", id, "Responded");
    toast.promise(promise, {
      loading: "Updating status...",
      success: "Marked as responded!",
      error: "Could not update status.",
    });
    try {
      await promise;
      fetchSubmissions(); // Refresh the list
    } catch (err) {
      // Toast handles the error message
    }
  };

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this quote request?")) {
  //     const promise = deleteSubmission("quote", id);
  //     toast.promise(promise, {
  //       loading: "Deleting request...",
  //       success: "Quote request deleted.",
  //       error: "Could not delete request.",
  //     });
  //     try {
  //       await promise;
  //       setSubmissions(submissions.filter((sub) => sub._id !== id));
  //     } catch (err) {
  //       // Toast handles the error message
  //     }
  //   }
  // };

  const handleDelete = async (id) => {
    // --- UPDATED: Using a custom modal confirmation instead of window.confirm ---
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4">
          <span className="font-semibold">
            Are you sure you want to delete this?
          </span>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const promise = deleteSubmission("quote", id);
                await toast.promise(promise, {
                  loading: "Deleting request...",
                  success: "Quote request deleted.",
                  error: "Could not delete request.",
                });
                setSubmissions(submissions.filter((sub) => sub._id !== id));
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 4000, // Keep the toast open longer for user action
      }
    );
  };

  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === "New"
          ? "bg-blue-100 text-blue-800"
          : "bg-green-100 text-green-800"
      }`}
    >
      {status}
    </span>
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <FiFileText className="mr-3 text-indigo-600" />
            Quote Requests
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Review and manage all project quote requests.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading quote requests...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
            <FiAlertCircle className="mx-auto text-4xl text-slate-400 mb-2" />
            <h3 className="font-semibold">No Quote Requests Yet</h3>
            <p className="text-slate-500 text-sm">
              New requests will appear here when submitted.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Date",
                    "Name",
                    "Project Type",
                    "Location",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {submissions.map((sub) => (
                  <tr
                    key={sub._id}
                    className="hover:bg-slate-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {sub.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {sub.projectType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {sub.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={sub.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                          onClick={() => handleViewDetails(sub)}
                          className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                          <FiEye className="mr-1.5" />
                          View
                        </button>
                        {sub.status === "New" && (
                          <button
                            onClick={() => handleUpdateStatus(sub._id)}
                            className="flex items-center text-sm text-green-600 hover:text-green-800 font-semibold"
                          >
                            <FiCheckCircle className="mr-1.5" />
                            Respond
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(sub._id)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* The modal is rendered here but its presentation is controlled by its own internal styles */}
      {selectedSubmission && (
        <SubmissionDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          submission={selectedSubmission}
        />
      )}
    </>
  );
};

export default QuoteSubmissionsPage;

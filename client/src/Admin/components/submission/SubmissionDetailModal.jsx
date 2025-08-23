import React from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiType,
  FiMapPin,
  FiMessageSquare,
  FiPaperclip,
  FiClipboard,
} from "react-icons/fi";

const SubmissionDetailModal = ({ isOpen, onClose, submission }) => {
  if (!isOpen || !submission) return null;

  // A helper component to keep the layout consistent and clean
  const DetailItem = ({ icon, label, children }) => (
    <div className="flex items-start py-3">
      <div className="flex-shrink-0 w-8 text-slate-400">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <div className="text-base text-slate-800 mt-1">{children}</div>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blur bg-opacity-60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-white border border-2 border-slate-500 shadow-2xl m-4 animate-scaleIn flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center">
            <FiClipboard className="mr-3 text-indigo-600" />
            Submission Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow overflow-y-auto max-h-[70vh]">
          <div className="divide-y divide-slate-200">
            <DetailItem icon={<FiUser size={20} />} label="Name">
              {submission.name}
            </DetailItem>
            <DetailItem icon={<FiMail size={20} />} label="Email">
              <a
                href={`mailto:${submission.email}`}
                className="text-indigo-600 hover:underline"
              >
                {submission.email}
              </a>
            </DetailItem>
            <DetailItem icon={<FiPhone size={20} />} label="Phone">
              {submission.phone || (
                <span className="text-slate-400">Not Provided</span>
              )}
            </DetailItem>

            {/* Fields specific to Quotes */}
            {submission.projectType && (
              <DetailItem icon={<FiType size={20} />} label="Project Type">
                {submission.projectType}
              </DetailItem>
            )}
            {submission.location && (
              <DetailItem icon={<FiMapPin size={20} />} label="Location">
                {submission.location}
              </DetailItem>
            )}
            {submission.message && (
              <DetailItem icon={<FiMessageSquare size={20} />} label="Message">
                <p className="whitespace-pre-wrap">{submission.message}</p>
              </DetailItem>
            )}
            {submission.fileUrl && (
              <DetailItem
                icon={<FiPaperclip size={20} />}
                label="Attached File"
              >
                <a
                  href={submission.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 font-medium hover:underline"
                >
                  View File
                </a>
              </DetailItem>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 bg-slate-50 p-4 border-t border-slate-200 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailModal;

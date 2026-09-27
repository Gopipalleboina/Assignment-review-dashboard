import { useEffect } from 'react';
import {CheckCircle2, X } from 'lucide-react';


function ConfirmModal({ isOpen, assignment, onClose, onConfirm }) {
  // Listen for Escape key to close modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !assignment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full p-6 sm:p-8 z-10 transition-all transform scale-100 animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 rounded-lg p-1 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Close confirmation dialog"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="flex-1 pr-4">
            <h3
              id="confirm-modal-title"
              className="text-lg sm:text-xl font-bold text-gray-900 leading-snug"
            >
              Have you already submitted your assignment?
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Please double check that your work has been uploaded to the designated Google Drive folder before confirming.
            </p>
          </div>
        </div>

        
        <div className="mt-5 p-4 bg-gray-50/80 rounded-xl border border-gray-100 text-sm">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Target Assignment
          </div>
          <div className="font-semibold text-gray-800 text-base mt-0.5">
            {assignment.title}
          </div>
          <div className="text-xs text-blue-600 font-medium mt-1">
            Subject: {assignment.subject}
          </div>
        </div>

       
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(assignment.id)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Yes, I Have Submitted
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;

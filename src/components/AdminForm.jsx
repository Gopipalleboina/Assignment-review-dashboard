import { useState } from 'react';
import { PlusCircle, Link as LinkIcon, Calendar, BookOpen, FileText } from 'lucide-react';


function AdminForm({ onAddAssignment }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!title.trim()) {
      setError('Please provide an assignment title.');
      return;
    }
    if (!subject.trim()) {
      setError('Please provide a subject name.');
      return;
    }
    if (!dueDate) {
      setError('Please pick a due date for the assignment.');
      return;
    }
    if (!driveLink.trim()) {
      setError('Please provide a Google Drive link for assignment materials.');
      return;
    }

    // Call creation handler
    onAddAssignment({
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
      driveLink: driveLink.trim()
    });

    // Reset form
    setTitle('');
    setSubject('');
    setDueDate('');
    setDriveLink('');
    setSuccessMsg('Assignment created and published successfully!');

    // Dismiss success toast after 3 seconds
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          Create New Assignment
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Add coursework details and link resource materials for enrolled students.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
          <span className="font-semibold text-xs uppercase px-2 py-0.5 bg-red-100 rounded">Error</span>
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <span className="font-semibold text-xs uppercase px-2 py-0.5 bg-emerald-100 rounded">Success</span>
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Assignment Title */}
          <div>
            <label
              htmlFor="assignment-title"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
            >
              Assignment Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FileText className="w-4 h-4" />
              </div>
              <input
                id="assignment-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Build an Interactive Dashboard"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="assignment-subject"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <input
                id="assignment-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Frontend Engineering"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Due Date */}
          <div>
            <label
              htmlFor="assignment-due-date"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
            >
              Due Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                id="assignment-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          {/* Google Drive Link */}
          <div>
            <label
              htmlFor="assignment-drive-link"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
            >
              Google Drive Link <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input
                id="assignment-drive-link"
                type="url"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <PlusCircle className="w-4 h-4" />
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
}
export default AdminForm;

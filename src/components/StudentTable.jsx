import { CheckCircle2, Clock, ExternalLink, Calendar, Trash2, RotateCcw } from 'lucide-react';

function StudentTable({ assignments, onToggleStatus, onDeleteAssignment }) {
  if (!assignments || assignments.length === 0) {
    return (
      <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mx-auto mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-gray-800">No Assignments Found</h4>
        <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
          Create your first assignment above to populate the overview table.
        </p>
      </div>
    );
  }

  // Format date helper
  const formatDate = (dateStr) => {
    try {
      if (!dateStr) return 'N/A';
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-7 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Student Submissions Overview
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Monitor submission status and student progress across all active assignments.
          </p>
        </div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 self-start sm:self-auto">
          {assignments.length} Total Coursework
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              <th scope="col" className="py-4 px-6">Assignment</th>
              <th scope="col" className="py-4 px-6">Due Date</th>
              <th scope="col" className="py-4 px-6">Materials</th>
              <th scope="col" className="py-4 px-6">Status</th>
              <th scope="col" className="py-4 px-6 min-w-[160px]">Progress</th>
              <th scope="col" className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {assignments.map((assignment) => {
              const isSubmitted = assignment.status === 'Submitted';
              const progress = isSubmitted ? 100 : (assignment.progress || 0);

              return (
                <tr key={assignment.id} className="hover:bg-gray-50/60 transition-colors">
                  {/* Assignment Title & Subject */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900 leading-snug">
                      {assignment.title}
                    </div>
                    <div className="text-xs font-medium text-blue-600 mt-0.5">
                      {assignment.subject}
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="py-4 px-6 whitespace-nowrap text-xs text-gray-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{formatDate(assignment.dueDate)}</span>
                    </div>
                  </td>

                  {/* Google Drive Link */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {assignment.driveLink ? (
                      <a
                        href={assignment.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                        title={assignment.driveLink}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                        Drive Folder
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 italic">None</span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {isSubmitted ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Submitted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Progress Bar */}
                  <td className="py-4 px-6">
                    <div className="w-full space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-gray-500">{isSubmitted ? 'Completed' : 'Pending'}</span>
                        <span className="font-mono tabular-nums text-gray-700">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isSubmitted ? 'bg-emerald-500' : progress > 0 ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {onToggleStatus && (
                        <button
                          type="button"
                          onClick={() => onToggleStatus(assignment.id)}
                          className="px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors inline-flex items-center gap-1"
                          title="Toggle Status"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Toggle</span>
                        </button>
                      )}

                      {onDeleteAssignment && (
                        <button
                          type="button"
                          onClick={() => onDeleteAssignment(assignment.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                          title="Delete Assignment"
                          aria-label={`Delete ${assignment.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default StudentTable;

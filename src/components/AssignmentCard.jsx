import React from 'react';
import { Calendar, ExternalLink, CheckCircle2, Clock } from 'lucide-react';


function AssignmentCard({ assignment, onMarkSubmitted }) {
  const isSubmitted = assignment.status === 'Submitted';
  const progressPercent = isSubmitted ? 100 : (assignment.progress || 0);

  // Format date nicely (e.g. Oct 12, 2026)
  const formattedDate = (() => {
    try {
      if (!assignment.dueDate) return 'No due date';
      const parts = assignment.dueDate.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      return assignment.dueDate;
    } catch {
      return assignment.dueDate;
    }
  })();

  return (
    <div className="bg-white rounded-2xl md:rounded-[22px] border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden group">
      {/* Top row: Subject & Status badge */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100/60">
            {assignment.subject || 'General'}
          </span>

          {/* Status Badge */}
          {isSubmitted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Submitted
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Pending
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {assignment.title}
        </h3>

        {/* Metadata info: Due date & Google Drive Link */}
        <div className="mt-4 pt-4 border-t border-gray-100/80 space-y-2.5 text-sm text-gray-600">
          {/* Due date */}
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-xs sm:text-sm font-medium">
              Due: <span className="text-gray-800 font-semibold">{formattedDate}</span>
            </span>
          </div>

          {/* Google Drive Link */}
          {assignment.driveLink ? (
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-500 shrink-0" />
              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 truncate max-w-full"
                title={assignment.driveLink}
              >
                Google Drive Materials
              </a>
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic">No drive link provided</div>
          )}
        </div>
      </div>

      {/* Bottom section: Progress bar & Action Button */}
      <div className="mt-6 pt-4 border-t border-gray-100/80 space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-1.5">
            <span>Progress</span>
            <span className="font-mono tabular-nums text-gray-700">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isSubmitted ? 'bg-emerald-500' : progressPercent > 0 ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Button: Large blue button / Disabled submitted button */}
        {isSubmitted ? (
          <button
            type="button"
            disabled
            className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gray-100 text-gray-400 border border-gray-200/90 cursor-not-allowed flex items-center justify-center gap-2 select-none shadow-none"
            aria-disabled="true"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Submitted
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onMarkSubmitted(assignment)}
            className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Mark as Submitted
          </button>
        )}
      </div>
    </div>
  );
}
export default AssignmentCard;

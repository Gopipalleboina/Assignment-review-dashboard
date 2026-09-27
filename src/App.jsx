import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import StatsCard from './components/StatsCard.jsx';
import AssignmentCard from './components/AssignmentCard.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import AdminForm from './components/AdminForm.jsx';
import StudentTable from './components/StudentTable.jsx';
import { initialAssignments } from './data/assignments.js';
import { FileText, CheckCircle2, Clock, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'joineazy_assignments_v1';

function App() {
  
  const [role, setRole] = useState('student');

 
  const [assignments, setAssignments] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error reading localStorage:', err);
    }
    return initialAssignments;
  });

  
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
    } catch (err) {
      console.error('Error writing to localStorage:', err);
    }
  }, [assignments]);

 
  const totalCount = assignments.length;
  const completedCount = assignments.filter((a) => a.status === 'Submitted').length;
  const pendingCount = assignments.filter((a) => a.status === 'Pending').length;

  
  const handleInitiateSubmit = (assignment) => {
    setSelectedAssignment(assignment);
    setConfirmModalOpen(true);
  };

  const handleConfirmSubmit = (assignmentId) => {
    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id === assignmentId) {
          return {
            ...item,
            status: 'Submitted',
            progress: 100,
            submittedAt: new Date().toISOString()
          };
        }
        return item;
      })
    );
    setConfirmModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleCloseModal = () => {
    setConfirmModalOpen(false);
    setSelectedAssignment(null);
  };

 
  const handleAddAssignment = (newAssignmentData) => {
    const newAssignment = {
      id: `assign-${Date.now()}`,
      title: newAssignmentData.title,
      subject: newAssignmentData.subject,
      dueDate: newAssignmentData.dueDate,
      driveLink: newAssignmentData.driveLink,
      status: 'Pending',
      progress: 0,
      submittedAt: null
    };
    setAssignments((prev) => [newAssignment, ...prev]);
  };

  const handleToggleStatus = (assignmentId) => {
    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id === assignmentId) {
          const isSubmitted = item.status === 'Submitted';
          return {
            ...item,
            status: isSubmitted ? 'Pending' : 'Submitted',
            progress: isSubmitted ? 0 : 100,
            submittedAt: isSubmitted ? null : new Date().toISOString()
          };
        }
        return item;
      })
    );
  };

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments((prev) => prev.filter((item) => item.id !== assignmentId));
    }
  };

  const handleResetSampleData = () => {
    if (window.confirm('Reset all assignments back to default sample data?')) {
      setAssignments(initialAssignments);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAssignments));
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 py-8 sm:py-10 md:py-14 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">

       
        <Header />

        
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="inline-flex p-1.5 bg-white border border-gray-200/90 rounded-full shadow-xs">
            
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                role === 'student'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Student
            </button>

           
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                role === 'admin'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Admin
            </button>
          </div>
          <p className="text-xs text-gray-600 font-medium">
            Currently viewing as <span className="text-blue-700 font-semibold capitalize">{role}</span>
          </p>
        </div>

       
        <section aria-label="Dashboard Statistics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <StatsCard
              label="Assignments"
              value={totalCount}
              tag="Total coursework"
              icon={<FileText className="w-5 h-5" />}
            />
            <StatsCard
              label="Completed"
              value={completedCount}
              tag="Submitted"
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            />
            <StatsCard
              label="Pending"
              value={pendingCount}
              tag="Action required"
              icon={<Clock className="w-5 h-5 text-amber-600" />}
            />
          </div>
        </section>

        
        {role === 'student' ? (
         
          <section className="space-y-6 animate-in fade-in duration-200" aria-label="Student Coursework">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
                  Available Assignments
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  Access drive resources, finish your submissions, and mark tasks as complete.
                </p>
              </div>

              {/* Reset Data Helper */}
              <button
                type="button"
                onClick={handleResetSampleData}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors self-start sm:self-auto cursor-pointer"
                title="Reset to default assignments"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Sample Data
              </button>
            </div>

            {/* Assignments Grid */}
            {assignments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onMarkSubmitted={handleInitiateSubmit}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No Assignments Available</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  You have no pending assignments right now. Switch to the Admin view to create new coursework.
                </p>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    Go to Admin Dashboard
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          
          <section className="space-y-8 animate-in fade-in duration-200" aria-label="Admin Management">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
                  Admin Dashboard
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  Create new coursework and monitor student submission progress across classes.
                </p>
              </div>

             
              <button
                type="button"
                onClick={handleResetSampleData}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors self-start sm:self-auto cursor-pointer"
                title="Reset to default assignments"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Sample Data
              </button>
            </div>

            
            <AdminForm onAddAssignment={handleAddAssignment} />

          
            <StudentTable
              assignments={assignments}
              onToggleStatus={handleToggleStatus}
              onDeleteAssignment={handleDeleteAssignment}
            />
          </section>
        )}

        
        <footer className="pt-8 pb-4 text-center border-t border-gray-200/80">
          <p className="text-xs text-gray-400">
            Joineazy Frontend Internship Assignment &middot; Assignment & Review Dashboard
          </p>
        </footer>

      </div>

      
      <ConfirmModal
        isOpen={confirmModalOpen}
        assignment={selectedAssignment}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
}
export default App;
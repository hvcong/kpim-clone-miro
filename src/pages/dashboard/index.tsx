import DashboardContent from '@/components/dashboard/DashboardContent';
import Sidebar from '@/components/dashboard/Sidebar';
import RequireAuth from '@/components/requireAuth';
import TemplateModal from '@/components/templateModal/TemplateModal';

type Props = {};

function DashBoard({}: Props) {
  return (
    <div className="w-screen h-screen flex bg-gray-200 space-x-4 text-sm">
      <Sidebar />
      <DashboardContent />
    </div>
  );
}

export default RequireAuth(DashBoard);

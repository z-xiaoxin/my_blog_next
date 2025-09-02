import AdminLayoutMenu from "@/components/admin/layoutMenu";
import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <div className="w-full flex-grow flex flex-col">
      <div className="w-full h-10 bg-primary-color"></div>
      <div className="flex-grow flex">
        <AdminLayoutMenu />
        <div className="flex-grow bg-secondary-bg p-2">
          <div className="w-full h-full rounded bg-primary-bg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

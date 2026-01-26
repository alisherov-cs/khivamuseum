import { Outlet } from "react-router";

export default function LayoutLogin() {
    return (
        <div className="bg-bgcolor flex flex-col flex-1 py-8 min-h-section">
            <div className="container flex-1 flex flex-col justify-center items-center">
                <div className="card bg-bgcolor-secondary! w-full max-w-[400px] p-6 rounded-xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

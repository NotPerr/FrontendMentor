import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="bg-lightBg dark:bg-darkBg dark:text-darkText min-h-screen ">
      <Header />
      <main className="px-3 ">
        <Outlet />
      </main>
    </div>
  );
}

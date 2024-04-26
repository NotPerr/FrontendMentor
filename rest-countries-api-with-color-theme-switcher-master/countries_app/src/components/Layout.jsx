import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="dark:bg-black dark:text-white">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

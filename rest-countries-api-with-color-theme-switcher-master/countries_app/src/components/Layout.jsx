import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="dark:bg-darkBg dark:text-darkText min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

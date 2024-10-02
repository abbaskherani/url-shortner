import Header from "@/components/header";
import {Outlet} from "react-router-dom";

```
/**
 * Renders the main application layout
 * @returns {JSX.Element} The rendered application layout
 */

```const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
       Made by Abbas Kherani
      </div>
    </div>
  );
};

export default AppLayout;

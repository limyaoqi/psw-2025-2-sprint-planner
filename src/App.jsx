import * as React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: 16 }}>
        <Outlet />
      </div>
    </div>
  );
}

import * as React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import * as S from "./style";

export default function App() {
  return (
    <S.Root>
      <Navbar />
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Root>
  );
}

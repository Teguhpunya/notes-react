import React from "react";
import { Route, Routes } from "react-router-dom";
import ArchivePage from "../pages/ArchivePage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import MissingPage from "../pages/MissingPage";
import NewPage from "../pages/NewPage";

export default function AppRoutes() {
  const home = "/notes-react";

  return (
    <main>
      <Routes>
        <Route path={`${home}`} element={<HomePage />} />
        <Route path={`${home}/detail/:id`} element={<DetailPage />} />
        <Route path={`${home}/archive`} element={<ArchivePage />} />
        <Route path={`${home}/new`} element={<NewPage />} />
        <Route path={`${home}/*`} element={<MissingPage />} />
        <Route path={`/*`} element={<MissingPage />} />
      </Routes>
    </main>
  );
}

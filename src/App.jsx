import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AiPolicyPage from "./pages/AiPolicyPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import FinderPage from "./pages/FinderPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import PlantPage from "./pages/PlantPage.jsx";
import SavedPlantsPage from "./pages/SavedPlantsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="finder" element={<FinderPage />} />
          <Route path="saved-plants" element={<SavedPlantsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="ai-policy" element={<AiPolicyPage />} />
          <Route path="flowers" element={<CategoryPage type="flower" />} />
          <Route path="plants" element={<CategoryPage type="plant" />} />
          <Route path="plants/:slug" element={<PlantPage />} />
          <Route path=":legacySlug" element={<PlantPage legacy />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

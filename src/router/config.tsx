import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import JournalPage from "../pages/journal/page";
import ArticleDetailPage from "../pages/journal/ArticleDetail";
import TheTablePage from "../pages/the-table/page";
import DishDetailPage from "../pages/the-table/DishDetail";
import CommunityPage from "../pages/community/page";
import AboutPage from "../pages/about/page";
import FounderPage from "../pages/founder/page";
import GalleryPage from "../pages/gallery/page";
import VisitPage from "../pages/visit/page";
import AdminPage from "../pages/admin/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/journal",
    element: <JournalPage />,
  },
  {
    path: "/journal/:slug",
    element: <ArticleDetailPage />,
  },
  {
    path: "/the-table",
    element: <TheTablePage />,
  },
  {
    path: "/dish/:slug",
    element: <DishDetailPage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/founder",
    element: <FounderPage />,
  },
  {
    path: "/gallery",
    element: <GalleryPage />,
  },
  {
    path: "/visit",
    element: <VisitPage />,
  },
  {
    path: "/admin/*",
    element: <AdminPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
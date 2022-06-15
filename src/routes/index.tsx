import { lazy } from "react";
import HeaderMenusContent from "../pages/HeaderTopMenus/HeaderMenusContent";

const Home = lazy(() => import("../pages/Home"));
const Filter = lazy(() => import("../pages/Filter"));
const ProductView = lazy(() => import("../pages/ProductView"));
const HeaderTopMenus = lazy(() => import("../pages/HeaderTopMenus"));
const SearchResult = lazy(() => import("../pages/SearchResult"));
const Favorites = lazy(() => import("../pages/Favorites"));
const ProductComparison = lazy(() => import("../pages/ProductComparison"));

const Profile = lazy(() => import("../pages/Profile"));
const ProfileInfoBody = lazy(() => import("../pages/Profile/ProfileInfoBody"));
const PersonalData = lazy(() => import("../pages/Profile/PersonalData"));

const Checkout = lazy(() => import("../pages/Checkout"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));


const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "category/:category_slug",
    element: <Filter />,
  },
  {
    path: "search",
    element: <SearchResult />,
  },
  {
    path: "product/detail/:product_id",
    element: <ProductView />,
  },
  {
    path: "page",
    element: <HeaderTopMenus />,
    children: [
      {
        path: ":page_slug",
        element: <HeaderMenusContent />
      }
    ]
  },
  {
    path: "favorites",
    element: <Favorites />
  },
  {
    path: "balance",
    element: <ProductComparison />
  },
  {
    path: "profile",
    element: <Profile />,
    children:
      [
        {
          index: true,
          element: <ProfileInfoBody />
        },
        {
          path: "personal-data",
          element: <PersonalData />
        }
      ]
  },
  {
    path: "checkout",
    element: <Checkout />
  },
  {
    path: "*",
    element: <PageNotFound />
  }

]

export default routes;

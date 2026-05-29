import { createBrowserRouter } from "react-router-dom";
import { Splash } from "./pages/Splash";
import { LoginPage } from "./pages/login/LoginPage"; // 새로 만들 로그인 페이지
import { AgreementPage } from "./pages/agree/AgreementPage"; // 새로 만들 약관동의 페이지
import { AgreementStep1 } from "./pages/agree/AgreementStep1";
import { HomePage } from "./pages/home/HomePage";
import { DeliveryPage } from "./pages/delivery/DeliveryPage";
import { LifeCareDetailPage } from "./pages/lifecare/LifeCareDetailPage";
import { MyPageDetailPage } from "./pages/mypage/MyPageDetailPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Splash />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/agree",
      element: <AgreementPage />,
    },
    {
      path: "/agree1",
      element: <AgreementStep1 />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/delivery",
      element: <DeliveryPage />,
    },
    {
      path: "/lifecare/:type",
      element: <LifeCareDetailPage />,
    },
    {
      path: "/mypage/detail/:menu",
      element: <MyPageDetailPage />,
    },
  ],
  {
    basename: "/your-watc",
  },
);

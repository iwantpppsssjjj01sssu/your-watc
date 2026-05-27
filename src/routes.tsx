import { createBrowserRouter } from "react-router-dom";
import { Splash } from "./pages/Splash";
import { LoginPage } from "./pages/login/LoginPage"; // 새로 만들 로그인 페이지
import { AgreementPage } from "./pages/agree/AgreementPage"; // 새로 만들 약관동의 페이지
import { AgreementStep1 } from "./pages/agree/AgreementStep1";
import { AgreementStep2 } from "./pages/agree/AgreementStep2";
import { AgreementStep3 } from "./pages/agree/AgreementStep3";
import { HomePage } from "./pages/home/HomePage";
import { DeliveryPage } from "./pages/delivery/DeliveryPage";
import { LifeCareDetailPage } from "./pages/lifecare/LifeCareDetailPage";
import { MyPageDetailPage } from "./pages/mypage/MyPageDetailPage";

export const router = createBrowserRouter([
  {
    path: "/", // 앱 처음 켜면 스플래시 실행
    element: <Splash />,
  },
  {
    path: "/login", // 스플래시 끝나고 도착할 로그인 화면
    element: <LoginPage />,
  },
  {
    path: "/agree", // 로그인 버튼 누르면 이동할 약관동의 화면
    element: <AgreementPage />,
  },
  {
    path: "/agree1",
    element: <AgreementStep1 />,
  },
  {
    path: "/agree2",
    element: <AgreementStep2 />,
  },
  {
    path: "/agree3",
    element: <AgreementStep3 />,
  },
  {
    path: "/home", // 약관동의 후 최종 도착할 메인 홈화면
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
]);


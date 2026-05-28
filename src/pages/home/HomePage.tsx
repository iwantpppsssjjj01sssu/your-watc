import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomePage.css";

import i1Img from "../../asset/img/i1.png";
import e1Img from "../../asset/img/e1.png"; // 3D Blue Sweater
import j1Img from "../../asset/img/j1.png"; // 3D Laundry Basket on Stool
import k1Img from "../../asset/img/k1.png";
import k11Img from "../../asset/img/k1-1.png"; // 3D Smartphone Hand
import l1Img from "../../asset/img/l1.png"; // 3D Glass Metallic Ring
import m1Img from "../../asset/img/m1.png"; // 3D Community Scene
import o1Img from "../../asset/img/o1.png"; // Bedding Duvet Photo
import r1Img from "../../asset/img/r1.png";

import rvBeddingImg from "../../asset/img/rv_bedding.png";
import rvShirtsImg from "../../asset/img/rv_shirts.png";
import rvOuterImg from "../../asset/img/rv_outer.png";
import rvShoesImg from "../../asset/img/rv_shoes.png";
import rvBagImg from "../../asset/img/rv_bag.png";

import a1Img from "../../asset/img/a1.png";
import b1Img from "../../asset/img/b1.png";
import c1Img from "../../asset/img/c1.png";
import d1Img from "../../asset/img/d1.png";
import p1Img from "../../asset/img/p1.png";
import q1Img from "../../asset/img/q1.png";

import { BottomNav } from "../../components/BottomNav";

function LifeCardIcon({ type }: { type: "yarn" | "coat" | "shirt" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="life_card_svg"
      aria-hidden="true"
      fill="#2563eb"
      stroke="#2563eb"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "22px", height: "22px" }}
    >
      {type === "yarn" && <circle cx="12" cy="12" r="9" fill="#2563eb" />}
      {type === "coat" && (
        <path
          d="M6 21h12a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-1.5V9a4.5 4.5 0 0 0-9 0v4H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z"
          fill="#2563eb"
        />
      )}
      {type === "shirt" && (
        <path
          d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4h6v2H9V7Zm0 4h6v2H9v-2Z"
          fill="#2563eb"
        />
      )}
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="status_alert_svg"
      fill="#ef4444"
      stroke="#ef4444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 22h20L12 2Z" fill="#ef4444" />
      <path d="M12 9v5" stroke="#ffffff" strokeWidth="2.2" />
      <circle cx="12" cy="17" r="1.2" fill="#ffffff" stroke="none" />
    </svg>
  );
}

function SafeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="status_safe_svg"
      fill="#10b981"
      stroke="#10b981"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" fill="#10b981" />
      <path d="M9 11l2 2 4-4" stroke="#ffffff" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "home" | "reserve" | "delivery" | "care" | "mypage"
  >("home");
  const [selectedTag, setSelectedTag] = useState<string>("전체");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);

  // --- Profile Edit Modal States (Interactive Dialog Form) ---
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>("하은");
  const [profilePhone, setProfilePhone] = useState<string>("010-9876-5432");
  const [profileAddress, setProfileAddress] = useState<string>(
    "서울특별시 서초구 반포동 왓씨타워 410호",
  );
  const [profileEntry, setProfileEntry] =
    useState<string>("공동현관 비밀번호: #1234*");
  const [profileRequest, setProfileRequest] = useState<string>("문 앞 보관");
  const [requestOptionsOpen, setRequestOptionsOpen] = useState<boolean>(false);
  const deliveryRequestOptions = [
    "문 앞 보관",
    "경비실 보관",
    "직접 수령",
    "무인 택배함",
  ];

  // --- Care Tab Interactive States ---
  const [clothName, setClothName] = useState<string>("");
  const [clothCategory, setClothCategory] = useState<string>("상의");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [registeredClothes, setRegisteredClothes] = useState<any[]>([
    {
      name: "나의 아끼는 구스 코트",
      category: "아우터",
      materials: ["울", "합성섬유"],
      photo: true,
    },
  ]);
  const [wearCount, setWearCount] = useState<number>(4);
  const [targetCycle, setTargetCycle] = useState<number>(5);
  const [alertEnabled, setAlertEnabled] = useState<boolean>(true);
  const [personalOption, setPersonalOption] =
    useState<string>("실크 전용 보호제");
  // -----------------------------------

  // --- Reservation Detail Page States ---
  const [showReserveDetail, setShowReserveDetail] = useState<boolean>(false);
  const [showAiGuideDetail, setShowAiGuideDetail] = useState<boolean>(false);
  const [simulatingScan, setSimulatingScan] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<boolean>(false);
  const [selectedScanPreset, setSelectedScanPreset] = useState<string>("shirt");
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [selectedLaundryType, setSelectedLaundryType] =
    useState<string>("일반 빨래"); // "일반 빨래" | "관리 의류" | "이불/리빙/기타"
  const [selectedLaundryOption, setSelectedLaundryOption] =
    useState<string>("일반"); // "일반" | "친환경" | "알러지 케어" | "살균"
  const [reserveAddress, setReserveAddress] = useState<string>(
    "서울특별시 서초구 반포동 왓씨타워 410호",
  );
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [deliveryType, setDeliveryType] = useState<string>("새벽배송"); // "새벽배송" | "일반배송"
  const [reserveDate, setReserveDate] = useState<string>("5월 9일 목요일");
  const [reserveTime, setReserveTime] = useState<string>("2-4 PM 오후");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);
  const [riderType, setRiderType] = useState<string>("신속 배송"); // "신속 배송" | "하루 배송"
  const [ironingOption, setIroningOption] = useState<string>("기본 (스팀)"); // "기본 (스팀)" | "고급 (칼주름)" | "신청 안 함"
  const [collectionSpot, setCollectionSpot] =
    useState<string>("공동현관 문 앞"); // "공동현관 문 앞" | "경비실 위탁" | "택배함 보관"

  // --- GPS Tracking Live States ---
  const [gpsCoords, setGpsCoords] = useState({
    lat: 37.501534,
    lng: 127.039211,
  });
  // const [gpsConnected] = useState(true);
  const [etaMinutes, setEtaMinutes] = useState(8);
  const [trackingActive, setTrackingActive] = useState(true);
  const [satellites, setSatellites] = useState(11);

  useEffect(() => {
    let interval: any;
    if (trackingActive) {
      interval = setInterval(() => {
        setGpsCoords((prev) => ({
          lat: Number((prev.lat + (Math.random() - 0.5) * 0.000038).toFixed(6)),
          lng: Number((prev.lng + (Math.random() - 0.5) * 0.000038).toFixed(6)),
        }));
        setSatellites((prev) => {
          const change =
            Math.random() > 0.75 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          const next = prev + change;
          return next >= 9 && next <= 14 ? next : prev;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [trackingActive]);

  useEffect(() => {
    let interval: any;
    if (trackingActive) {
      interval = setInterval(() => {
        setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 12));
      }, 40000);
    }
    return () => clearInterval(interval);
  }, [trackingActive]);

  // Trigger temporary toast feedback on action
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requestedTab = params.get("tab");
    if (
      requestedTab === "home" ||
      requestedTab === "reserve" ||
      requestedTab === "delivery" ||
      requestedTab === "care" ||
      requestedTab === "mypage"
    ) {
      setActiveTab(requestedTab);
    }
  }, [location.search]);

  const startScanningSimulation = () => {
    setSimulatingScan(true);
    setScanResult(false);
    setScanProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setSimulatingScan(false);
        setScanResult(true);
        triggerToast("🎉 AI 스캔 분석이 완료되었습니다!");
      }
    }, 150);
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCapturedPhotoUrl(url);

      setSimulatingScan(true);
      setScanResult(false);
      setScanProgress(0);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setScanProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setSimulatingScan(false);
          setScanResult(true);
          triggerToast("🎉 AI 실제 의류 분석이 완료되었습니다!");
        }
      }, 150);
    }
  };

  const handleAction = (actionName: string) => {
    if (
      actionName === "진행 상세 현황" ||
      actionName === "세탁 상황 자세히 보기" ||
      actionName === "세탁 상황 자세히 보기"
    ) {
      setActiveTab("delivery");
      triggerToast("🚚 실시간 수거·배송 상태 대시보드로 이동합니다.");
    } else if (actionName === "예상 배송 시간 조회") {
      setActiveTab("delivery");
      triggerToast("🕒 예상 배송 시간 및 라이더 정보를 조회합니다.");
    } else if (actionName === "60초 세탁 신청" || actionName === "예약하기") {
      setActiveTab("reserve");
      setShowReserveDetail(true);
      triggerToast("✨ 60초 신속 세탁 예약을 시작합니다!");
    } else if (actionName === "AI 세탁 가이드") {
      setActiveTab("reserve");
      setShowAiGuideDetail(true);
      triggerToast("📸 AI 세탁 가이드 스캐너를 작동합니다.");
    } else if (actionName === "수거배송 상세조회") {
      navigate("/delivery");
      triggerToast("📡 하드웨어 GPS 연결 상세 지도로 이동합니다.");
    } else if (actionName === "계절별 관리 팁") {
      navigate("/lifecare/season");
      triggerToast("🍂 계절별 섬세 섬유 관리 가이드로 이동합니다.");
    } else if (actionName === "의류 수명 관리 팁") {
      navigate("/lifecare/life");
      triggerToast("🌱 친환경 에코 수명 주기 팁으로 이동합니다.");
    } else if (actionName === "셔츠 전용 팁") {
      navigate("/lifecare/shirt");
      triggerToast("👔 셔츠 깃/소매 오염 클리닝 가이드로 이동합니다.");
    } else if (
      actionName === "5월 이력 상세" ||
      actionName === "4월 이력 상세" ||
      actionName === "이용 내역"
    ) {
      navigate("/mypage/detail/history");
      triggerToast("📁 주문 이력 및 세탁 내역서로 이동합니다.");
    } else if (actionName === "가격표" || actionName === "세탁 종류 안내") {
      setActiveTab("reserve");
      setShowReserveDetail(true);
      triggerToast("🏷️ 가격 명세가 포함된 상세 예약 페이지로 이동합니다.");
    } else {
      triggerToast(`✨ [${actionName}] 서비스 페이지로 안내합니다.`);
    }
  };

  // 리뷰 데이터 매핑 (한 섹션 안에서 모든 이미지들이 중복 없이 서로 다르게 분배)
  const reviewsData: Record<string, Array<any>> = {
    의류: [
      {
        stars: "★★★★★",
        user: "깔끔러버님",
        date: "26.05.02",
        body: `셔츠 칼라 찌든 때가 감쪽같이 사라졌어요! 세탁소 오고 가는 시간 아껴서 집 앞 수거배송 받는게 이렇게 편리한 줄 이제야 알았습니다.`,
        img: rvShirtsImg,
        tags: ["셔츠크리닝", "수거배송"],
      },
      {
        stars: "★★★★★",
        user: "빨래고수님",
        date: "26.05.20",
        body: `겨울 롱코트 두 벌과 패딩 맡겼는데 보풀 제거 서비스까지 꼼꼼히 챙겨서 돌려주셨네요. 세탁 품질과 포장 상태가 대기업 서비스 이상입니다.`,
        img: rvOuterImg,
        tags: ["프리미엄케어", "아우터"],
      },
      {
        stars: "★★★★★",
        user: "스타일러",
        date: "26.05.15",
        body: `실크 블라우스 세탁을 집에서 하다가 망친 적이 있어서 맡겨봤는데 정말 새 옷처럼 실크 특유의 윤기가 살아서 돌아왔어요. 아주 만족합니다.`,
        img: a1Img,
        tags: ["실크블라우스", "드라이클리닝"],
      },
      {
        stars: "★★★★★",
        user: "패션피플",
        date: "26.05.10",
        body: `버버리 트렌치코트 오염이 심해서 걱정했는데 얼룩덜룩한 국물 때까지 깨끗하게 제거되고 스팀 서비스로 핏까지 완벽하게 잡아줬어요!`,
        img: b1Img,
        tags: ["명품케어", "트렌치코트"],
      },
      {
        stars: "★★★★★",
        user: "데일리웨어",
        date: "26.05.08",
        body: `기본 슬랙스 바지 주름이 매번 칼처럼 잡혀서 옵니다. 출근할 때 매번 다림질 안 해도 돼서 아침 출근 준비 시간이 10분이나 단축되었어요.`,
        img: a1Img,
        tags: ["바지주름", "다림질"],
      },
      {
        stars: "★★★★★",
        user: "니트마니아",
        date: "26.05.03",
        body: `캐시미어 가디건 세탁 후 줄어들거나 털 뭉침 없이 보송보송하게 배송되었어요. 니트 전용 중성 세제로 부드럽게 세탁해주시는 게 느껴지네요.`,
        img: l1Img,
        tags: ["캐시미어니트", "중성세제"],
      },
      {
        stars: "★★★★★",
        user: "정장핏",
        date: "26.04.28",
        body: `중요한 미팅이 있어서 서둘러 수트를 드라이클리닝 맡겼는데, 지정된 시간에 정확히 오고 포장도 습기 방지 커버로 정성스럽게 싸여서 왔어요.`,
        img: q1Img,
        tags: ["비즈니스수트", "커버포장"],
      },
    ],
    신발: [
      {
        stars: "★★★★★",
        user: "스니커즈왕",
        date: "26.03.10",
        body: `신발 세탁 품질이 좋아서 자주 맡겨요. 찌든 때가 싹 빠져서 원래의 새하얀 신발 색감이 완전히 살아났습니다. 가죽 상한 데도 전혀 없네요.`,
        img: rvShoesImg,
        tags: ["스니커즈", "백색가죽"],
      },
      {
        stars: "★★★★★",
        user: "조깅러",
        date: "26.05.18",
        body: `진흙투성이가 된 런닝화를 맡겼는데, 메쉬 틈새 사이에 박혀 있던 흙먼지까지 강력하고 깨끗하게 흡입 세탁해주셔서 새 신발 신는 느낌이에요!`,
        img: c1Img,
        tags: ["런닝화", "흙먼지제거"],
      },
      {
        stars: "★★★★★",
        user: "힐러버",
        date: "26.05.14",
        body: `세탁하기 까다로운 고급 스웨이드 로퍼를 맡겼는데 결이 다 상하지 않고 자연스럽게 스웨이드 질감을 살려서 클리닝해 주셨네요. 진정한 장인입니다.`,
        img: d1Img,
        tags: ["스웨이드로퍼", "질감복원"],
      },
      {
        stars: "★★★★★",
        user: "등산매니아",
        date: "26.05.09",
        body: `등산 다니면서 끈적한 송진 가루와 흙으로 엉망이 된 등산화 방수 기능 손상 없이 프리미엄 클리닝 완료! 아웃도어 의류/신발은 역시 전문 세탁이 답이네요.`,
        img: p1Img,
        tags: ["아웃도어화", "방수보존"],
      },
      {
        stars: "★★★★★",
        user: "가죽구두",
        date: "26.05.05",
        body: `신사용 가죽 구두를 맡겼더니 세탁 후 가죽 영양 크림 코팅 and 에센스 칠까지 섬세하게 발라서 보내주셨습니다. 반짝반짝 광택이 예술이에요.`,
        img: r1Img,
        tags: ["정장구두", "영양코팅"],
      },
      {
        stars: "★★★★★",
        user: "캔버스매니아",
        date: "26.04.30",
        body: `하얀색 캔버스 단화에 커피를 쏟아서 버려야 하나 고민했는데, 얼룩 자국 하나 남기지 않고 말끔하게 표백 세탁해 주셨습니다. 왓씨 최고예요!`,
        img: a1Img,
        tags: ["캔버스화", "얼룩제거"],
      },
      {
        stars: "★★★★★",
        user: "키즈맘",
        date: "26.04.25",
        body: `아이들이 놀이터에서 흙모래를 잔뜩 묻혀 온 아동 운동화들 한꺼번에 보냈는데, 신발 안쪽 깊은 곳까지 멸균 소독 살균이 잘 되어 냄새가 싹 사라졌습니다.`,
        img: b1Img,
        tags: ["아동운동화", "살균소독"],
      },
    ],
    침구: [
      {
        stars: "★★★★★",
        user: "행복이님",
        date: "26.04.15",
        body: `맡기까지 제가 원했던 게 다 담겨서 좋았어요. 처음으로 산 비싼 새 이불이라 걱정했는데, 어디하나 망가진 곳 없이 폭신하게 와서 만족해요.`,
        img: rvBeddingImg,
        tags: ["일반이불", "새이불케어"],
      },
      {
        stars: "★★★★★",
        user: "꿀잠러",
        date: "26.05.19",
        body: `겨우내 덮었던 두꺼운 거위털 구스 이불을 맡겼는데, 거위털 쏠림이나 숨 죽음 전혀 없이 방방하고 보송보송하게 부풀려서 가져다주셨습니다. 향기도 너무 좋아요!`,
        img: o1Img,
        tags: ["구스이불", "다운복원"],
      },
      {
        stars: "★★★★★",
        user: "뽀송조아",
        date: "26.05.13",
        body: `두꺼운 극세사 침구 세탁 건조가 집에서는 도저히 불가능했는데 왓씨 덕분에 살균 고온 건조까지 완벽하게 끝마치고 아기 솜털처럼 부드럽게 세탁되었습니다.`,
        img: d1Img,
        tags: ["극세사이불", "고온살균"],
      },
      {
        stars: "★★★★★",
        user: "신혼부부",
        date: "26.05.11",
        body: `호텔식 올 화이트 침구 세트를 클리닝 맡겼더니 눈부실 정도로 하얗고 뽀송하게 다림질되어 배송받았습니다. 마치 오성급 호텔에 체크인한 기분이에요.`,
        img: c1Img,
        tags: ["호텔식침구", "오성급화이트"],
      },
      {
        stars: "★★★★★",
        user: "베개베개",
        date: "26.05.07",
        body: `기능성 라텍스 및 솜 베개 커버와 솜 자체를 세탁 건조했는데 솜 뭉침이 1도 없고 땀 냄새와 노란 찌든 오염이 마술처럼 지워졌습니다.`,
        img: b1Img,
        tags: ["기능성베개", "땀오염표백"],
      },
      {
        stars: "★★★★★",
        user: "토퍼매니아",
        date: "26.05.04",
        body: `메모리폼 침대 토퍼 겉 커버 세탁을 신청했는데, 탈착 시 보이지 않던 안감 얼룩까지 꼼꼼히 체크해 주시고 중성 세제로 아주 정성껏 세탁되어 왔네요.`,
        img: a1Img,
        tags: ["토퍼커버", "중성케어"],
      },
      {
        stars: "★★★★★",
        user: "효도빨래",
        date: "26.04.29",
        body: `부모님 댁에 있는 묵직한 전통 솜 한실 이불을 대행 수거해서 맡겼는데 묵은 냄새를 완벽 탈취해주시고 깃과 자수를 하나하나 원형 보존하여 세탁해 주셨습니다.`,
        img: q1Img,
        tags: ["한실이불", "탈취완료"],
      },
    ],
    생활빨래: [
      {
        stars: "★★★★★",
        user: "생활의달인",
        date: "26.05.02",
        body: `수거배송이 약속된 요일과 시간에 단 1분도 오차 없이 정확히 와서 놀랐습니다. 봉투에 툭 던져두면 다음날 칼배송되니 빨래 해방입니다!`,
        img: rvShirtsImg,
        tags: ["비대면수거", "칼배송"],
      },
      {
        stars: "★★★★★",
        user: "1인가구",
        date: "26.05.17",
        body: `원룸에 살아서 빨래 널 공간도 부족하고 눅눅한 냄새가 걱정이었는데, 왓씨에 3단 빨래 바구니째 맡기면 당일 오후에 산들바람 향이 솔솔 나는 뽀송한 상태로 문 앞에 안착해요.`,
        img: rvBeddingImg,
        tags: ["원룸빨래", "실내건조해방"],
      },
      {
        stars: "★★★★★",
        user: "워킹맘",
        date: "26.05.12",
        body: `매일매일 쏟아져 나오는 아기 옷, 가제 수건, 내의들을 일일이 삶고 건조하기 벅찼는데 유기농 유아 전용 세제 옵션을 제공해 주셔서 맘 놓고 삶음 빨래 대행하고 있습니다.`,
        img: l1Img,
        tags: ["아기옷세탁", "유기농세제"],
      },
      {
        stars: "★★★★★",
        user: "수건부자",
        date: "26.05.10",
        body: `집에서 빨면 뻣뻣해지고 쿰쿰해지던 수건들이 왓씨 세탁만 거치면 촘촘한 올이 한올 한올 살아나서 엄청 도톰하고 부드러워져요. 타월 관리는 이만한 곳이 없습니다.`,
        img: o1Img,
        tags: ["호텔타월", "올복원기술"],
      },
      {
        stars: "★★★★★",
        user: "주말빨래방",
        date: "26.05.06",
        body: `주말마다 2-3시간씩 코인 빨래방 지키고 앉아있는 시간이 너무 아까웠는데 그 시간에 가족들과 브런치 먹고 취미 생활할 수 있어서 행복합니다. 돈값 그 이상이에요.`,
        img: i1Img,
        tags: ["코인빨래안녕", "시간절약"],
      },
      {
        stars: "★★★★★",
        user: "헬스매니아",
        date: "26.05.02",
        body: `땀이 많이 배어 기능성 원단이 상하기 쉬운 피트니스 전용 의류와 등산복 세탁을 매번 안심하고 진행합니다. 땀 전용 기능성 아웃도어 전용 런드리 짱입니다.`,
        img: p1Img,
        tags: ["기능성웨어", "스포츠런드리"],
      },
      {
        stars: "★★★★★",
        user: "미니멀리스트",
        date: "26.04.27",
        body: `빨래통 비우기부터 개기까지의 노동을 손가락 터치 1번으로 위탁하니 집안일 스트레스가 90% 줄었습니다. 옷 정리도 칼각으로 접혀서 와서 바로 서랍에 쏙 넣네요.`,
        img: b1Img,
        tags: ["칼각접기", "노동비우기"],
      },
    ],
    패션잡화: [
      {
        stars: "★★★★★",
        user: "패션러",
        date: "26.02.20",
        body: `실크 머플러와 악세서리 가공 처리가 만족스러워요. 모 혼방 목도리의 거칠거칠한 결이 에센스 트리트먼트로 부드럽게 돌아와서 착용감이 매우 좋아졌습니다.`,
        img: rvBagImg,
        tags: ["머플러", "가공처리"],
      },
      {
        stars: "★★★★★",
        user: "모자매니아",
        date: "26.05.16",
        body: `아끼던 뉴에라 볼캡 모자가 이마 땀 얼룩과 화장품 때로 누렇게 오염됐고 챙 형태가 흐물해졌는데, 챙 보형틀 스팀 성형을 통해 새 모자 챙 핏으로 단단하게 복원해 주셨어요!`,
        img: rvOuterImg,
        tags: ["볼캡스팀", "땀얼룩제거"],
      },
      {
        stars: "★★★★★",
        user: "가죽벨트",
        date: "26.05.12",
        body: `고급 소가죽 클래식 벨트의 테두리 유약(기리메)이 벗겨지고 갈라져서 슬펐는데 가죽 케어 전문 옵션으로 깔끔하게 메우고 검은색 오염까지 싹 지워주셨습니다.`,
        img: q1Img,
        tags: ["가죽벨트", "복원케어"],
      },
      {
        stars: "★★★★★",
        user: "실크스카프",
        date: "26.05.09",
        body: `에르메스 실크 스카프의 얇은 섬유 한 결 한 결을 우아하게 살려서 단 하나도 미어짐 없이 다림질 성형 코팅되어 배송받았습니다. 실크 케어는 여기가 명가입니다.`,
        img: p1Img,
        tags: ["실크스카프", "명품스카프"],
      },
      {
        stars: "★★★★★",
        user: "지갑컬렉터",
        date: "26.05.05",
        body: `손때와 기름 오염이 심하던 베이지색 가죽 지갑 클리닝을 맡겼는데, 염색 코팅 복원을 한 듯 아주 선명하고 산뜻한 본래의 스킨 컬러가 다시 나왔습니다.`,
        img: m1Img,
        tags: ["가죽지갑", "지갑클리닝"],
      },
      {
        stars: "★★★★★",
        user: "넥타이핏",
        date: "26.04.29",
        body: `매일 매는 양복 실크 넥타이들의 구겨진 매듭 부위 스팀 프레싱 가공으로 아주 납작하고 단정하게 정렬되었습니다. 직장인 가성비 만족도가 최고입니다.`,
        img: a1Img,
        tags: ["실크넥타이", "스팀프레싱"],
      },
      {
        stars: "★★★★★",
        user: "겨울준비",
        date: "26.04.24",
        body: `캐시미어 100% 겨울 목도리 보관 전 마지막 클리닝 완료! 보풀도 하나하나 털깎이 빗으로 손질해주셔서 너무 기분 좋게 옷장에 들여놓을 수 있게 되었습니다.`,
        img: r1Img,
        tags: ["보풀손질", "목도리클리닝"],
      },
    ],
    가방: [
      {
        stars: "★★★★★",
        user: "가방마니아",
        date: "26.03.05",
        body: `가방 세탁 후 모양이 무너지지 않고 원형 그대로 빵빵하게 각이 잘 살아있고, 천연 가죽 부위가 딱딱해지지 않고 아주 쫀득하고 부드럽게 스팀 복원됐어요.`,
        img: rvBagImg,
        tags: ["가죽가방", "가방각복원"],
      },
      {
        stars: "★★★★★",
        user: "명품백러버",
        date: "26.05.18",
        body: `샤넬 클래식 백 캔버스 원단 오염 부위 부분 부분 붓 터치 클리닝 정밀 복원 완료! 명품 가방 전용 케어실이 따로 있다고 들어서 믿고 맡겼는데 돈 아깝지 않네요.`,
        img: m1Img,
        tags: ["명품가방", "정밀캔버스케어"],
      },
      {
        stars: "★★★★★",
        user: "백팩러",
        date: "26.05.15",
        body: `프라다 나일론 백팩 지퍼 틈새의 누적 먼지와 버클 금속 부위 얼룩 제거가 잘 되어 은은한 매트 블랙 특유의 원단 광택이 다시 세련되게 올라와서 신나요.`,
        img: q1Img,
        tags: ["나일론백팩", "원단광택복원"],
      },
      {
        stars: "★★★★★",
        user: "에코프렌들리",
        date: "26.05.11",
        body: `때가 꼬질꼬질 타서 버리기 직전이었던 면 100% 흰색 디자이너 에코백 황변 때와 손잡이 찌든 때를 완전 뽀얗고 산뜻하게 하이 화이트 표백 세탁해 주셨어요!`,
        img: p1Img,
        tags: ["에코백표백", "황변제거"],
      },
      {
        stars: "★★★★★",
        user: "여행자",
        date: "26.05.08",
        body: `가죽 클러치 백 모서리 까진 부분 가죽 필러 약재 성형과 염색까지 세심하게 서비스 해주셔서 정말 감사드립니다. 스크래치가 감쪽같이 티 나지 않게 되었습니다.`,
        img: o1Img,
        tags: ["가죽클러치", "필러코팅염색"],
      },
      {
        stars: "★★★★★",
        user: "숄더백조아",
        date: "26.05.04",
        body: `숄더 토트백 바닥면 징 주변 금속 녹슬기 시작하던 부위를 특수 약품으로 환원 청소해주시고 바닥 천 이물질 오염도 물때 자국 없이 깨끗하게 흡입 탈수 완료되었습니다.`,
        img: b1Img,
        tags: ["금속케어", "토트백바닥"],
      },
      {
        stars: "★★★★★",
        user: "지갑앤백",
        date: "26.04.26",
        body: `귀여운 파스텔 핑크 미니 크로스백 화장품 파운데이션 가루 흘려서 엉망진창이었는데 안감 내피를 다 들어내서 아주 깨끗하게 수성 드라이 런드리 복원되었습니다.`,
        img: a1Img,
        tags: ["미니크로스", "화장품얼룩"],
      },
    ],
    리빙: [
      {
        stars: "★★★★★",
        user: "집꾸미기",
        date: "26.04.01",
        body: `거실 암막 커튼과 데코 쿠션을 맡겼는데, 촉감도 아주 찰랑거리고 부드러워졌고 미세먼지가 다 빨려 들어가서 방 안의 공기 자체가 맑아진 느낌이 들어요.`,
        img: rvBeddingImg,
        tags: ["암막커튼", "미세먼지스팀"],
      },
      {
        stars: "★★★★★",
        user: "인테리어러",
        date: "26.05.19",
        body: `가벼운 린넨 커튼 빨았더니 집에서 빨면 쭈글쭈글해지던 것이 왓씨 대형 플랫 프레싱으로 넓고 팽팽하게 펴져서 배송받자마자 걸었더니 주름 핏이 기가 막힙니다.`,
        img: o1Img,
        tags: ["린넨커튼", "플랫프레싱"],
      },
      {
        stars: "★★★★★",
        user: "소파러버",
        date: "26.05.14",
        body: `소파 위의 대형 패브릭 패드 세탁 건조가 너무 부드럽고 풍성하게 잘 되었어요. 몸에 닿는 촉감이 완전히 실크 패드처럼 부드러워서 아이가 매일 부비적댑니다.`,
        img: c1Img,
        tags: ["소파패드", "촉감복원"],
      },
      {
        stars: "★★★★★",
        user: "식탁매트",
        date: "26.05.10",
        body: `파스타 소스와 커피 자국으로 얼룩덜룩했던 패브릭 식탁 러너와 키친매트를 맡겼는데, 색감이 죽지 않고 얼룩 때만 귀신같이 탈색시켜 깨끗하게 배송되었습니다.`,
        img: d1Img,
        tags: ["식탁러너", "얼룩표백"],
      },
      {
        stars: "★★★★★",
        user: "캠핑러",
        date: "26.05.06",
        body: `야외 캠핑에서 불 그을림 탄 냄새와 기름때 범벅이 된 캠핑 체어 및 캔버스 스킨 커버 탈취 살균 세탁! 묵은 캠핑 냄새가 싹 날아가고 보송한 풀잎 향만 가득해요.`,
        img: p1Img,
        tags: ["캠핑커버", "탄내제거"],
      },
      {
        stars: "★★★★★",
        user: "러그매니아",
        date: "26.05.01",
        body: `거실 원형 러그 틈새에 박힌 과자 부스러기와 머리카락들이 진공 고압 초강력 세척으로 완전 멸균 청소되어 왔습니다. 발로 밟을 때 기분 좋은 탄성이 느껴져요.`,
        img: b1Img,
        tags: ["원형러그", "고압세척"],
      },
      {
        stars: "★★★★★",
        user: "계절맞이",
        date: "26.04.28",
        body: `집안 분위기 전환을 위해 대형 창 커튼 4장을 한꺼번에 수거 의뢰했는데 무거운 부피임에도 왓씨 도어가드가 집 문 앞까지 들어주고 가져다주어 손가락 하나 안 아팠습니다.`,
        img: a1Img,
        tags: ["대형커튼", "도어가드배송"],
      },
    ],
    펫용품: [
      {
        stars: "★★★★★",
        user: "펫집사",
        date: "26.04.18",
        body: `강아지 침구와 헝겊 장난감들의 묵은 찌든 냄새와 강아지 털들이 99% 완벽히 제거되어 왔습니다. 친환경 세제라 댕댕이가 물고 뜯어도 맘이 너무 놓여요.`,
        img: rvBeddingImg,
        tags: ["애견이불", "친환경펫런드리"],
      },
      {
        stars: "★★★★★",
        user: "댕댕이맘",
        date: "26.05.17",
        body: `강아지가 오줌 실수를 해서 얼룩진 대형 마약방석 세탁을 집에서는 감당 못했는데 특수 펫 살균 세탁 코스로 흔적 자국과 오줌 암모니아 향 완벽히 탈취 청소 완료!`,
        img: o1Img,
        tags: ["마약방석", "암모니아탈취"],
      },
      {
        stars: "★★★★★",
        user: "집사일기",
        date: "26.05.13",
        body: `캣타워용 양모 스크래치 패드와 숨집 내부 패브릭 발판 털들을 정교하게 솔질 세탁해 주셨습니다. 고양이 털뭉치 날림 없이 정밀하게 스팀 세탁이 되어 최고예요.`,
        img: c1Img,
        tags: ["캣타워패드", "정밀털제거"],
      },
      {
        stars: "★★★★★",
        user: "댕댕패션",
        date: "26.05.11",
        body: `귀여운 강아지 패딩과 패브릭 산책용 네임택 옷들을 세탁했는데, 아기 옷처럼 부드럽고 피부 자극 없는 중성 오가닉 향으로 배송되어 산책할 때 애기가 너무 편안해합니다.`,
        img: d1Img,
        tags: ["반려견의류", "피부무자극"],
      },
      {
        stars: "★★★★★",
        user: "펫하우스",
        date: "26.05.07",
        body: `켄넬용 쿠션과 야외 펫 매트의 흙발 자국과 쿰쿰한 야외 펫 냄새를 말끔하고 청량한 향기로 세탁하고 초고온 스팀 살균까지 마쳐 안심하고 켄넬에 다시 깔아주었네요.`,
        img: rvShirtsImg,
        tags: ["켄넬매트", "초고온스팀"],
      },
      {
        stars: "★★★★★",
        user: "냥이조아",
        date: "26.05.03",
        body: `고양이들이 꾹꾹이하며 노는 패브릭 숨구멍 방석 세탁! 솜이 고르게 분산되어 볼륨이 풍성하게 살아났고, 왓씨 특유의 깨끗한 포장으로 털 날림 없이 안전하게 왔습니다.`,
        img: p1Img,
        tags: ["고양이쿠션", "볼륨복원"],
      },
      {
        stars: "★★★★★",
        user: "산책러",
        date: "26.04.25",
        body: `산책 중 하네스와 리쉬줄 오염이 심해서 세탁 코스로 의뢰했는데 리드줄 섬유의 탄력을 고스란히 살리고 금속 고리 버클 부분 윤활 크리닝까지 완료해 주셨네요. 감동입니다.`,
        img: r1Img,
        tags: ["하네스세탁", "리드줄케어"],
      },
    ],
    기타: [
      {
        stars: "★★★★★",
        user: "다용도러",
        date: "26.05.08",
        body: `여행용 패브릭 트래블 파우치와 비니 모자들도 부드럽게 세탁되어 기대 이상입니다. 파우치 안의 쏟아진 샴푸 자국까지 말끔하게 날아갔어요.`,
        img: rvBagImg,
        tags: ["파우치클리닝", "모자세탁"],
      },
      {
        stars: "★★★★★",
        user: "유모차세탁",
        date: "26.05.16",
        body: `아이 유모차 바스켓 천 커버와 분리형 패브릭 차양막을 통째로 맡겼는데 황사 가루와 주스 쏟은 오염이 다 빠져서 정말 개운합니다. 유모차용 베이비 런드리도 인정해요!`,
        img: m1Img,
        tags: ["유모차시트", "베이비클리닝"],
      },
      {
        stars: "★★★★★",
        user: "골프러버",
        date: "26.05.12",
        body: `골프 보스턴 백 내부의 신발 냄새와 먼지 구덩이 오염 세탁 클리닝! 외형 가죽 스킨 주름도 다림질 펴주시고 하드 쉐입 원형 유지까지 섬세하게 관리해 주셨습니다.`,
        img: q1Img,
        tags: ["골프백케어", "각성형복원"],
      },
      {
        stars: "★★★★★",
        user: "여행러",
        date: "26.05.09",
        body: `수하물 수송 중 쓸림과 검은 기름때로 난리가 난 명품 캐리어 겉 천 커버와 내부 안감 드라이 세탁! 껌 자국까지 특수 헤라 약품으로 완전 제거 완료되었습니다.`,
        img: p1Img,
        tags: ["캐리어커버", "기름오염제거"],
      },
      {
        stars: "★★★★★",
        user: "아기엄마",
        date: "26.05.05",
        body: `차량용 아기 카시트 겉 커버와 헤드레스트 솜 패드 세탁을 신청했습니다. 유아 피부 저자극 특수 아토 세제와 진드기 고온 멸균 분사 가공으로 쾌적 그 자체입니다.`,
        img: a1Img,
        tags: ["카시트커버", "아토세제멸균"],
      },
      {
        stars: "★★★★★",
        user: "모자조아",
        date: "26.04.30",
        body: `울 100% 뜨개질 털비니와 니트 모자를 세탁했는데 실 풀림이나 보풀 발생 1개도 없이 아주 쫀쫀하게 섬유 탄성을 살려 수축 방지 클리닝 완수되었습니다.`,
        img: b1Img,
        tags: ["털비니", "수축방지케어"],
      },
      {
        stars: "★★★★★",
        user: "요가마니아",
        date: "26.04.24",
        body: `매일 땀 흘리며 사용하는 요가 매트 대형 타월과 명상용 두꺼운 패브릭 방석 세탁! 땀 전용 고농축 시트러스 향 살균으로 매일 수련할 때 맑은 향이 올라와 집중이 잘 돼요.`,
        img: r1Img,
        tags: ["요가매트타월", "시트러스살균"],
      },
    ],
  };

  // --- Swappable Review Filter Tags Array ---
  const reviewTags = [
    "전체",
    "의류",
    "신발",
    "침구",
    "생활빨래",
    "패션잡화",
    "가방",
    "리빙",
    "펫용품",
    "기타",
  ];

  const getReviewsForTag = (tag: string) => {
    if (tag === "전체") {
      // flatten all
      return Object.values(reviewsData).flat();
    }
    return reviewsData[tag] || [];
  };

  return (
    <div className="home_container">
      {/* ---------------------------------------------------- */}
      {/* [1. HOME VIEW - First Photo Circular Progress Dashboard] */}
      {/* ---------------------------------------------------- */}
      {activeTab === "home" && (
        <>
          {/* 상단 타이틀 영역 */}
          <header className="home_header">
            <h1 className="home_greeting_title">반가워요!</h1>
            <p className="home_subtitle_text">
              당신을 위한 스마트 케어, 왓씨입니다.
            </p>
          </header>

          {/* 중앙 세탁 진행 현황 카드 (66% 진행 중 원형 진행률) */}
          <section className="home_dashboard">
            <div
              className="home_summary_card"
              onClick={() => handleAction("진행 상세 현황")}
            >
              <h2 className="home_card_main_text">
                세탁{" "}
                <span className="blue_percent">
                  <span className="digit digit-1">6</span>
                  <span className="digit digit-2">6</span>
                  <span className="percent-char">%</span>
                </span>{" "}
                진행 중
              </h2>

              {/* [SVG 둥근 그라데이션 원형 프로그레스 링 & 정중앙 정렬 세탁물 그래픽] */}
              <div className="home_circle_container">
                <svg className="home_circle_svg" viewBox="0 0 170 170">
                  <defs>
                    <linearGradient
                      id="gaugeGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#5EA2FF" />
                      <stop offset="100%" stopColor="#2F62F5" />
                    </linearGradient>
                    {/* Sparkle effect for premium feel */}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* 배경 원형 (light gray) */}
                  <circle
                    cx="85"
                    cy="85"
                    r="70"
                    stroke="#f0f3f7"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  {/* 진행도 링 (66%) - 더 두꺼운 stroke로 입체감 */}
                  <circle
                    cx="85"
                    cy="85"
                    r="70"
                    className="home_circle_svg_progress"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="439.8"
                    strokeDashoffset={439.8 * (1 - 0.66)}
                    strokeLinecap="round"
                    transform="rotate(-90 85 85)"
                    filter="url(#glow)"
                  />
                  {/* Sparkle dots (3개의 작은 별) */}
                  <circle
                    cx="130"
                    cy="50"
                    r="2.5"
                    fill="#5EA2FF"
                    opacity="0.6"
                    filter="url(#glow)"
                  />
                  <circle
                    cx="145"
                    cy="85"
                    r="1.8"
                    fill="#2F62F5"
                    opacity="0.5"
                    filter="url(#glow)"
                  />
                  <circle
                    cx="60"
                    cy="140"
                    r="2"
                    fill="#5EA2FF"
                    opacity="0.55"
                    filter="url(#glow)"
                  />
                </svg>
                {/* Innermost: b1 image */}
                <img
                  src={b1Img}
                  alt="가장 안쪽 명품 코트"
                  className="home_circle_image_inner"
                />
                {/* Subtle light shine effect around image */}
                <div className="home_circle_shine_effect"></div>
              </div>

              {/* [그 아래 파란색 세탁 상세 보러가기 / 연한 회색 배송시간 보러가기 버튼 스택] */}
              <div className="home_card_btn_stack">
                <button
                  className="home_card_btn_primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("세탁 상황 자세히 보기");
                  }}
                >
                  세탁 상황 자세히 보러가기
                </button>
                <button
                  className="home_card_btn_secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction("예상 배송 시간 조회");
                  }}
                >
                  예상 배송 시간 보러가기
                </button>
              </div>
            </div>
          </section>

          {/* 2개의 퀵서비스 카드 (60초 세탁 신청 & 왓씨 이용방법) */}
          <section className="home_columns_section">
            <div
              className="home_col_card_blue"
              onClick={() => handleAction("60초 세탁 신청")}
            >
              <div className="home_col_title_row">
                <span className="home_col_title_large">60초</span>
                <span className="home_col_title_large">세탁 신청</span>
              </div>
              <img
                src={j1Img}
                alt="3D 세탁 바구니"
                className="home_col_image home_col_image--clock"
              />
            </div>

            <div
              className="home_col_card_white"
              onClick={() => handleAction("왓씨 이용방법")}
            >
              <div className="home_col_title_row">
                <span className="home_col_title_large">왓씨</span>
                <span className="home_col_title_large">이용방법</span>
              </div>
              <svg
                viewBox="0 0 120 120"
                className="home_col_image home_col_image--search"
              >
                {/* Glow behind the magnifying glass */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="url(#lensGlow)"
                  opacity="0.4"
                />

                {/* Realistic 3D Handle */}
                <rect
                  x="74"
                  y="74"
                  width="12"
                  height="38"
                  rx="6"
                  transform="rotate(-45 80 93)"
                  fill="url(#handle3D)"
                  filter="url(#shadow)"
                />
                <rect
                  x="78"
                  y="78"
                  width="4"
                  height="26"
                  rx="2"
                  transform="rotate(-45 80 93)"
                  fill="rgba(255,255,255,0.4)"
                />

                {/* Metallic Ring (Frame) */}
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  fill="none"
                  stroke="url(#ring3D)"
                  strokeWidth="6"
                  filter="url(#shadow)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="1.5"
                />

                {/* Glass Lens with gloss and semi-transparent blue tint */}
                <circle cx="50" cy="50" r="29" fill="url(#glassLens)" />
                <circle
                  cx="42"
                  cy="42"
                  r="22"
                  fill="none"
                  stroke="url(#innerGlow)"
                  strokeWidth="3"
                  opacity="0.8"
                />

                {/* Reflection Highlight */}
                <path
                  d="M30 40 A 20 20 0 0 1 60 30"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />

                <defs>
                  <filter
                    id="shadow"
                    x="-10%"
                    y="-10%"
                    width="130%"
                    height="130%"
                  >
                    <feDropShadow
                      dx="2"
                      dy="5"
                      stdDeviation="4"
                      floodOpacity="0.15"
                    />
                  </filter>
                  <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="handle3D" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="ring3D" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="35%" stopColor="#60a5fa" />
                    <stop offset="70%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="glassLens" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(219, 234, 254, 0.4)" />
                    <stop offset="100%" stopColor="rgba(147, 197, 253, 0.1)" />
                  </linearGradient>
                  <linearGradient id="innerGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </section>

          {/* 중간 서브 메뉴 카드 2단 배치 (가격표 & 세탁 종류 안내) */}
          <section className="home_sub_columns_section">
            <button
              className="home_sub_col_card"
              onClick={() => handleAction("가격표")}
            >
              가격표
            </button>
            <button
              className="home_sub_col_card"
              onClick={() => handleAction("세탁 종류 안내")}
            >
              세탁 종류 안내
            </button>
          </section>

          {/* 하단 AI 세탁 가이드 배너 (Full-width) */}
          <section className="home_guide_full_section">
            <div
              className="home_guide_banner"
              onClick={() => handleAction("AI 세탁 가이드")}
            >
              <div className="home_guide_left">
                <img
                  src={k1Img}
                  alt="3D 스마트폰 손"
                  className="home_guide_hand_img"
                />
              </div>
              <div className="home_guide_right">
                <h3 className="home_guide_title">AI 세탁 가이드</h3>
                <p className="home_guide_desc">
                  사진을 찍어서 옷에 맞는
                  <br />
                  세탁법을 간편하게 확인해보세요
                </p>
              </div>
            </div>
          </section>

          {/* 실제 고객 리뷰 영역 [가로 스크롤 Swiper UI 로 변경] */}
          <section className="home_reviews_section">
            <div className="home_review_header_row">
              <h3 className="home_review_title">실제 고객 리뷰</h3>
              <button
                className="home_review_more"
                onClick={() => handleAction("리뷰 전체 보기")}
              >
                전체보기&gt;
              </button>
            </div>

            {/* Categories scroll area */}
            <div className="home_review_tags_container">
              {reviewTags.map((tag) => (
                <button
                  key={tag}
                  className={`home_tag_pill ${selectedTag === tag ? "home_tag_pill--active" : ""}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* [가로 터치 스크롤 Swiper 카드 슬라이더] */}
            <div className="home_review_swiper_container">
              {getReviewsForTag(selectedTag).map((rv, idx) => (
                <div
                  className="home_review_slide_card"
                  key={`${rv.user}-${idx}`}
                  onClick={() => setSelectedReview(rv)}
                >
                  <div className="home_review_card_top">
                    <div className="home_review_stars_row">
                      <span className="home_review_stars">{rv.stars}</span>
                      <span className="home_review_user">{rv.user}</span>
                    </div>
                    <span className="home_review_date">{rv.date}</span>
                  </div>
                  <p className="home_review_body">{rv.body}</p>
                  <div className="home_review_img_wrapper">
                    <img
                      src={rv.img}
                      alt={`${rv.user} 리뷰 이미지`}
                      className="home_review_duvet_img"
                    />
                  </div>
                  <div className="home_review_tags_bottom">
                    {rv.tags.map((t: string) => (
                      <span className="home_review_bottom_tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 왓씨 세탁 커뮤니티 배너 */}
          <section className="home_community_section">
            <div
              className="home_community_banner"
              onClick={() => handleAction("세탁 커뮤니티")}
            >
              <div className="home_community_left">
                <span className="home_community_label">왓씨 세탁 커뮤니티</span>
                <h4 className="home_community_title_1">혼자 고민하지 말고,</h4>
                <h4 className="home_community_title_2">함께 해결해보세요.</h4>

                <div className="home_community_dots" aria-hidden="true">
                  <span className="home_dot home_dot--active" />
                  <span className="home_dot" />
                  <span className="home_dot" />
                  <span className="home_dot" />
                </div>
              </div>
              <div className="home_community_right">
                <img
                  src={m1Img}
                  alt="세탁용품 3D 캐릭터 피규어"
                  className="home_community_3d_img"
                />
              </div>
            </div>
          </section>
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* [2. RESERVE VIEW - Second Photo Blue Reservation Page]  */}
      {/* ---------------------------------------------------- */}
      {activeTab === "reserve" && (
        <>
          {showReserveDetail ? (
            <div className="reserve_detail_wrapper">
              {/* 고정 헤더 */}
              <header className="reserve_detail_header">
                <button
                  type="button"
                  className="reserve_detail_back_btn"
                  onClick={() => setShowReserveDetail(false)}
                  aria-label="뒤로가기"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h1 className="reserve_detail_header_title">세탁 예약하기</h1>
                <div style={{ width: 24 }} />
              </header>

              {/* 스크롤 본문 */}
              <div className="reserve_detail_content">
                {/* 1. 세탁 종류 선택 */}
                <section className="reserve_detail_section">
                  <h2 className="reserve_section_title">
                    세탁 종류를 선택해주세요
                  </h2>
                  <div className="laundry_type_list">
                    {[
                      {
                        id: "일반 빨래",
                        title: "일반 빨래",
                        desc: "기본 세탁, 일상 의류, 타올 및 일상 생활 빨래",
                        priceText: "기본 19,000원",
                        img: rvShirtsImg,
                      },
                      {
                        id: "관리 의류",
                        title: "관리 의류",
                        desc: "드라이클리닝, 아우터, 실크, 정장 등 고급 섬세 세탁",
                        priceText: "기본 25,000원",
                        img: rvOuterImg,
                      },
                      {
                        id: "이불/리빙/기타",
                        title: "이불/리빙/기타",
                        desc: "이불, 침구류, 커튼 등 부피가 큰 생활 리빙 케어",
                        priceText: "기본 30,000원",
                        img: rvBeddingImg,
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className={`laundry_type_card ${selectedLaundryType === item.id ? "active" : ""}`}
                        onClick={() => setSelectedLaundryType(item.id)}
                      >
                        <div className="laundry_type_left">
                          <div className="laundry_type_icon_circle">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="laundry_type_3d_icon"
                            />
                          </div>
                          <div className="laundry_type_info">
                            <h3 className="laundry_type_title">{item.title}</h3>
                            <p className="laundry_type_desc">{item.desc}</p>
                          </div>
                        </div>
                        <div className="laundry_type_right">
                          <span className="laundry_type_price">
                            {item.priceText}
                          </span>
                          <div className="laundry_type_radio">
                            <div className="laundry_type_radio_inner" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 2. 세탁 옵션 선택 */}
                <section className="reserve_detail_section">
                  <h2 className="reserve_section_title">
                    세탁 옵션을 선택해주세요
                  </h2>
                  <div className="laundry_option_grid">
                    {[
                      { id: "일반", label: "일반", surcharge: "+0원" },
                      { id: "친환경", label: "친환경", surcharge: "+2,000원" },
                      {
                        id: "알러지 케어",
                        label: "알러지",
                        surcharge: "+3,000원",
                      },
                      { id: "살균", label: "살균", surcharge: "+4,000원" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`laundry_option_btn ${selectedLaundryOption === opt.id ? "active" : ""}`}
                        onClick={() => setSelectedLaundryOption(opt.id)}
                      >
                        <span className="laundry_option_label">
                          {opt.label}
                        </span>
                        <span className="laundry_option_surcharge">
                          {opt.surcharge}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* 3. 배송 정보 */}
                <section className="reserve_detail_section">
                  <h2 className="reserve_section_title">배송 정보</h2>
                  <div className="reserve_address_card">
                    <div className="address_row">
                      <div className="address_icon_container">
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="address_body">
                        {isEditingAddress ? (
                          <input
                            type="text"
                            value={reserveAddress}
                            onChange={(e) => setReserveAddress(e.target.value)}
                            onBlur={() => setIsEditingAddress(false)}
                            className="address_input"
                            autoFocus
                          />
                        ) : (
                          <span className="address_text">{reserveAddress}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="address_edit_btn"
                        onClick={() => setIsEditingAddress(!isEditingAddress)}
                      >
                        {isEditingAddress ? "완료" : "수정"}
                      </button>
                    </div>

                    <div className="delivery_toggle_row">
                      <button
                        type="button"
                        className={`delivery_toggle_btn ${deliveryType === "새벽배송" ? "active" : ""}`}
                        onClick={() => setDeliveryType("새벽배송")}
                      >
                        새벽배송 (실시간 맵)
                      </button>
                      <button
                        type="button"
                        className={`delivery_toggle_btn ${deliveryType === "일반배송" ? "active" : ""}`}
                        onClick={() => setDeliveryType("일반배송")}
                      >
                        일반 배송 (일 배송)
                      </button>
                    </div>

                    <div className="datetime_picker_row">
                      <div
                        className="picker_box"
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                      >
                        <div className="picker_label_row">
                          <span className="picker_title">날짜</span>
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="2.5"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <span className="picker_value">{reserveDate}</span>

                        {isDatePickerOpen && (
                          <div className="inline_picker_dropdown">
                            {[
                              "5월 9일 목요일",
                              "5월 10일 금요일",
                              "5월 11일 토요일",
                              "5월 12일 일요일",
                            ].map((d) => (
                              <div
                                key={d}
                                className={`dropdown_item ${reserveDate === d ? "selected" : ""}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReserveDate(d);
                                  setIsDatePickerOpen(false);
                                }}
                              >
                                {d}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div
                        className="picker_box"
                        onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
                      >
                        <div className="picker_label_row">
                          <span className="picker_title">시간</span>
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                        <span className="picker_value">{reserveTime}</span>

                        {isTimePickerOpen && (
                          <div className="inline_picker_dropdown">
                            {[
                              "10-12 AM 오전",
                              "12-2 PM 오후",
                              "2-4 PM 오후",
                              "4-6 PM 오후",
                              "7-9 PM 저녁",
                            ].map((t) => (
                              <div
                                key={t}
                                className={`dropdown_item ${reserveTime === t ? "selected" : ""}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReserveTime(t);
                                  setIsTimePickerOpen(false);
                                }}
                              >
                                {t}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="info_badge_alert">
                      <div className="alert_info_icon">i</div>
                      <span className="alert_info_text">
                        지금 예약하시면 가장 빠른 시간에 수거와 배송이
                        예약됩니다. (기본 24시간 이내 수거/배송)
                      </span>
                    </div>
                  </div>
                </section>

                {/* 4. 예상 가격 명세서 */}
                <section className="reserve_detail_section">
                  <h2 className="reserve_section_title">예상 가격</h2>
                  <div className="price_breakdown_card">
                    <div className="price_row">
                      <span className="price_label">기본가</span>
                      <span className="price_val">
                        {(selectedLaundryType === "일반 빨래"
                          ? 19000
                          : selectedLaundryType === "관리 의류"
                            ? 25000
                            : 30000
                        ).toLocaleString()}
                        원
                      </span>
                    </div>
                    <div className="price_row">
                      <span className="price_label">
                        추가 서비스 (
                        {selectedLaundryOption === "일반"
                          ? "없음"
                          : selectedLaundryOption}
                        {ironingOption !== "신청 안 함"
                          ? `, 다림질: ${ironingOption.split(" ")[0]}`
                          : ""}
                        )
                      </span>
                      <span className="price_val">
                        +
                        {(
                          (selectedLaundryOption === "친환경"
                            ? 2000
                            : selectedLaundryOption === "알러지 케어"
                              ? 3000
                              : selectedLaundryOption === "살균"
                                ? 4000
                                : 0) +
                          (ironingOption === "기본 (스팀)"
                            ? 2000
                            : ironingOption === "고급 (칼주름)"
                              ? 4000
                              : 0) +
                          (riderType === "신속 배송" ? 1000 : 0)
                        ).toLocaleString()}
                        원
                      </span>
                    </div>
                    <div className="price_divider" />
                    <div className="price_row total">
                      <span className="price_label_total">총 결제 금액</span>
                      <span className="price_val_total">
                        {(
                          (selectedLaundryType === "일반 빨래"
                            ? 19000
                            : selectedLaundryType === "관리 의류"
                              ? 25000
                              : 30000) +
                          (selectedLaundryOption === "친환경"
                            ? 2000
                            : selectedLaundryOption === "알러지 케어"
                              ? 3000
                              : selectedLaundryOption === "살균"
                                ? 4000
                                : 0) +
                          (ironingOption === "기본 (스팀)"
                            ? 2000
                            : ironingOption === "고급 (칼주름)"
                              ? 4000
                              : 0) +
                          (riderType === "신속 배송" ? 1000 : 0)
                        ).toLocaleString()}
                        원
                      </span>
                    </div>

                    <div className="price_disclaimer_box">
                      <div className="disclaimer_icon">⚠️</div>
                      <span className="disclaimer_text">
                        실제 수거 후 측정된 세탁물 분량 및 오염도에 따라 최종
                        결제 금액이 달라질 수 있습니다.
                      </span>
                    </div>
                  </div>
                </section>

                {/* 5. 라이더 배정 */}
                <section className="reserve_detail_section">
                  <h2 className="reserve_section_title">라이더 배정</h2>
                  <div className="rider_assignment_grid">
                    {[
                      {
                        id: "신속 배송",
                        title: "신속 배송",
                        desc: "가장 빠르게 수거 및 당일 특급 완료 (+1,000원)",
                        riderImg: j1Img,
                      },
                      {
                        id: "하루 배송",
                        title: "하루 배송",
                        desc: "24시간 이내 차분히 수거 및 문 앞 안심 배송 (+0원)",
                        riderImg: e1Img,
                      },
                    ].map((r) => (
                      <div
                        key={r.id}
                        className={`rider_assign_card ${riderType === r.id ? "active" : ""}`}
                        onClick={() => setRiderType(r.id)}
                      >
                        <div className="rider_assign_circle">
                          <img
                            src={r.riderImg}
                            alt={r.title}
                            className="rider_assign_3d_img"
                          />
                        </div>
                        <h3 className="rider_assign_title">{r.title}</h3>
                        <p className="rider_assign_desc">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 6. 다림질 서비스 */}
                <section className="reserve_detail_section">
                  <h2 className="reserve_section_title">다림질 서비스</h2>
                  <div className="triple_option_grid">
                    {[
                      {
                        id: "기본 (스팀)",
                        label: "기본 (스팀)",
                        desc: "기본 구김 방지 스팀 (+2,000원)",
                      },
                      {
                        id: "고급 (칼주름)",
                        label: "고급 (칼주름)",
                        desc: "바지/셔츠 각 잡힌 칼주름 (+4,000원)",
                      },
                      {
                        id: "신청 안 함",
                        label: "신청 안 함",
                        desc: "자연 건조 후 포장 (+0원)",
                      },
                    ].map((iron) => (
                      <div
                        key={iron.id}
                        className={`triple_option_card ${ironingOption === iron.id ? "active" : ""}`}
                        onClick={() => setIroningOption(iron.id)}
                      >
                        <div className="triple_option_avatar_circle">
                          <div className="inner_avatar_placeholder" />
                        </div>
                        <h3 className="triple_option_title">{iron.label}</h3>
                        <p className="triple_option_desc">{iron.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 7. 수거 장소 설정 */}
                <section
                  className="reserve_detail_section"
                  style={{ marginBottom: "100px" }}
                >
                  <h2 className="reserve_section_title">수거 장소 설정</h2>
                  <div className="triple_option_grid">
                    {[
                      {
                        id: "공동현관 문 앞",
                        label: "공동현관 앞",
                        desc: "비밀번호 필수 입력",
                      },
                      {
                        id: "경비실 위탁",
                        label: "경비실 위탁",
                        desc: "경비 부재 시 문 앞 수거",
                      },
                      {
                        id: "택배함 보관",
                        label: "택배함 보관",
                        desc: "함 번호/비번 기록 필요",
                      },
                    ].map((spot) => (
                      <div
                        key={spot.id}
                        className={`triple_option_card ${collectionSpot === spot.id ? "active" : ""}`}
                        onClick={() => setCollectionSpot(spot.id)}
                      >
                        <div className="triple_option_avatar_circle">
                          <div className="inner_avatar_placeholder" />
                        </div>
                        <h3 className="triple_option_title">{spot.label}</h3>
                        <p className="triple_option_desc">{spot.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* 하단 결제 및 예약 확정 버튼 */}
              <div className="reserve_bottom_action_bar">
                <button
                  type="button"
                  className="reserve_complete_btn"
                  onClick={() => {
                    setShowReserveDetail(false);
                    setActiveTab("delivery");
                    triggerToast(
                      "🎉 세탁 예약이 완료되었습니다! 실시간 수거 배송 트래킹이 시작됩니다.",
                    );
                  }}
                >
                  예약 완료
                </button>
              </div>
            </div>
          ) : showAiGuideDetail ? (
            <div className="ai_guide_detail_wrapper">
              {/* 실제 카메라 구동을 위한 숨김 인풋 */}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                style={{ display: "none" }}
                onChange={handleCameraCapture}
              />

              <header className="ai_guide_detail_header">
                <button
                  type="button"
                  className="ai_guide_detail_back_btn"
                  onClick={() => {
                    setShowAiGuideDetail(false);
                    setScanResult(false);
                    setScanProgress(0);
                    setCapturedPhotoUrl(null);
                  }}
                  aria-label="뒤로가기"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h1 className="ai_guide_detail_header_title">
                  AI 세탁 스캐너 가이드
                </h1>
                <div style={{ width: 40 }} />
              </header>

              <div className="ai_guide_detail_content">
                {/* 1. 소개 정보 */}
                <section className="ai_guide_intro_section">
                  <div className="ai_guide_intro_badge">
                    AI VISION SMART SCAN
                  </div>
                  <h2 className="ai_guide_intro_title">
                    찍으면 알 수 있는 최적의 세탁법
                  </h2>
                  <p className="ai_guide_intro_desc">
                    세탁물의 특징이나 섬유 결이 잘 보이도록 촬영해 보세요.
                    <br />
                    AI가 원단 성분을 정밀 분석하여 완벽한 케어 코스를
                    제안합니다.
                  </p>
                </section>

                {/* 2. 이용 방법 단계 */}
                <section className="ai_guide_steps_section">
                  <h3 className="ai_guide_section_title">이용 방법</h3>
                  <div className="ai_guide_steps_grid">
                    <div className="ai_guide_step_card">
                      <div className="step_number">01</div>
                      <h4 className="step_title">의류 촬영</h4>
                      <p className="step_desc">
                        카메라 뷰 파인더 내에 옷이 들어오도록 초점을 잡습니다.
                      </p>
                    </div>
                    <div className="ai_guide_step_card">
                      <div className="step_number">02</div>
                      <h4 className="step_title">실시간 스캔</h4>
                      <p className="step_desc">
                        AI가 섬유 짜임새와 의류 고유 코드를 정교히 판별합니다.
                      </p>
                    </div>
                    <div className="ai_guide_step_card">
                      <div className="step_number">03</div>
                      <h4 className="step_title">맞춤형 코스 제안</h4>
                      <p className="step_desc">
                        건조기 온도, 스팀 시간 등 완벽한 케어 설정을 추천
                        받습니다.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. 카메라 기능 시뮬레이션 */}
                <section className="ai_guide_scanner_section">
                  <h3 className="ai_guide_section_title">
                    AI 스캐너 직접 체험해보기
                  </h3>

                  {/* 스캐너 기기 프레임 */}
                  <div className="ai_scanner_viewport">
                    {simulatingScan ? (
                      <div className="scanner_scanning_overlay">
                        <div className="scanning_laser_line" />
                        <div className="scanning_loader_box">
                          <span className="scanning_loader_text">
                            AI 섬유 구조 해독 중...
                          </span>
                          <div className="scanning_progress_bar_bg">
                            <div
                              className="scanning_progress_fill"
                              style={{ width: `${scanProgress}%` }}
                            />
                          </div>
                          <span className="scanning_percentage">
                            {scanProgress}%
                          </span>
                        </div>
                      </div>
                    ) : scanResult ? (
                      <div className="scanner_result_overlay">
                        <div className="result_badge">분석 완료</div>

                        {capturedPhotoUrl && (
                          <div className="scanner_captured_preview">
                            <img
                              src={capturedPhotoUrl}
                              alt="분석된 의류"
                              className="result_captured_img"
                            />
                          </div>
                        )}

                        <h4 className="result_cloth_name">
                          {capturedPhotoUrl
                            ? "🔍 스캔된 실제 의류 성분 분석"
                            : selectedScanPreset === "shirt"
                              ? "👔 100% 면 화이트 드레스 셔츠"
                              : selectedScanPreset === "coat"
                                ? "🧥 캐시미어 혼방 도톰 가을 코트"
                                : "🛏️ 거위털 극세사 솜이불"}
                        </h4>

                        <div className="result_specs">
                          <div className="spec_row">
                            <span>소재 판정</span>
                            <strong>
                              {capturedPhotoUrl
                                ? "천연 섬유 혼합 감지"
                                : "권장 섬유 표준"}
                            </strong>
                          </div>
                          <div className="spec_row">
                            <span>권장 온도</span>
                            <strong>30°C 미온수 마일드</strong>
                          </div>
                          <div className="spec_row">
                            <span>건조 방식</span>
                            <strong>단독 저온 텀블러 회전</strong>
                          </div>
                          <div className="spec_row">
                            <span>추천 코스</span>
                            <strong className="blue_bold">
                              왓씨 안심 에코 런드리
                            </strong>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="scanner_reset_btn"
                          onClick={() => {
                            setScanResult(false);
                            setScanProgress(0);
                            setCapturedPhotoUrl(null);
                          }}
                        >
                          다시 촬영하기
                        </button>
                      </div>
                    ) : (
                      <div className="scanner_camera_feed">
                        {/* Preset preview background image */}
                        <div className="camera_feed_bg_sim">
                          {capturedPhotoUrl ? (
                            <img
                              src={capturedPhotoUrl}
                              alt="실물 촬영"
                              className="sim_feed_img"
                            />
                          ) : (
                            <>
                              {selectedScanPreset === "shirt" && (
                                <img
                                  src={rvShirtsImg}
                                  alt="셔츠 실물"
                                  className="sim_feed_img"
                                />
                              )}
                              {selectedScanPreset === "coat" && (
                                <img
                                  src={rvOuterImg}
                                  alt="코트 실물"
                                  className="sim_feed_img"
                                />
                              )}
                              {selectedScanPreset === "bedding" && (
                                <img
                                  src={rvBeddingImg}
                                  alt="이불 실물"
                                  className="sim_feed_img"
                                />
                              )}
                            </>
                          )}
                        </div>

                        <div className="camera_focus_target" />
                        <div className="camera_status_tag">
                          📡 AI LENS CONNECTED
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 프리셋 선택 조작판 */}
                  {!simulatingScan && !scanResult && (
                    <div className="ai_scanner_preset_selector">
                      <span className="selector_label">
                        촬영할 의류 품목 선택:
                      </span>
                      <div className="preset_buttons">
                        {[
                          { id: "shirt", label: "👔 드레스 셔츠" },
                          { id: "coat", label: "🧥 겨울 코트" },
                          { id: "bedding", label: "🛏️ 극세사 이불" },
                        ].map((btn) => (
                          <button
                            key={btn.id}
                            type="button"
                            className={`preset_select_btn ${selectedScanPreset === btn.id ? "active" : ""}`}
                            onClick={() => setSelectedScanPreset(btn.id)}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 촬영/셔터 버튼 */}
                  {!simulatingScan && !scanResult && (
                    <div className="shutter_control_row">
                      <button
                        type="button"
                        className="ai_shutter_btn"
                        onClick={() => cameraInputRef.current?.click()}
                      >
                        <div className="shutter_inner_circle" />
                      </button>
                      <span className="shutter_action_text">
                        셔터를 눌러 실제 카메라 작동
                      </span>
                    </div>
                  )}
                </section>
              </div>
            </div>
          ) : (
            <>
              {/* 상단 파란색 몰입형 헤더 (오늘 세탁 맡기기) */}
              <header className="reserve_header">
                {/* Sparkles decoration */}
                <div className="reserve_sparkles">
                  <svg
                    className="sparkle sparkle-1"
                    viewBox="0 0 24 24"
                    fill="#ffffff"
                  >
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                  </svg>
                  <svg
                    className="sparkle sparkle-2"
                    viewBox="0 0 24 24"
                    fill="#ffffff"
                  >
                    <path d="M8 0L9.6 6.4L16 8L9.6 9.6L8 16L6.4 9.6L0 8L6.4 6.4Z" />
                  </svg>
                </div>

                <div className="reserve_header_content_box">
                  <h1 className="reserve_header_title">오늘 세탁 맡기기</h1>
                  <p className="reserve_header_desc">
                    널부러진 빨래 걱정은 이제 그만.
                    <br />
                    60초 예약으로 다음 날 바로 깨끗하게!
                  </p>
                </div>
              </header>

              {/* 헤더 아래 예약하기 버튼 */}
              <section className="reserve_wire_section">
                <button
                  type="button"
                  className="reserve_wire_btn"
                  onClick={() => setShowReserveDetail(true)}
                >
                  예약하기
                </button>
              </section>

              {/* 중앙 3D 일러스트 이미지 단독 배치 (가득 차게 키움) */}
              <section className="reserve_basket_container">
                <img
                  src={m1Img}
                  alt="3D 세탁 일러스트"
                  className="reserve_m1_large_img"
                />
              </section>

              {/* 하단 가로형 AI 세탁 가이드 배너 (오른쪽에 k11Img) */}
              <section
                className="reserve_guide_banner"
                onClick={() => handleAction("AI 세탁 가이드")}
              >
                <div className="reserve_guide_left">
                  <span className="reserve_guide_badge">NEW</span>
                  <h3 className="reserve_guide_title">AI 세탁 가이드</h3>
                  <p className="reserve_guide_desc">
                    사진을 찍어서 최적의 세탁법을
                    <br />
                    스마트하게 확인해보세요.
                  </p>
                </div>
                <div className="reserve_guide_right">
                  <img
                    src={k11Img}
                    alt="AI 세탁 가이드"
                    className="reserve_guide_hand_img"
                  />
                </div>
                <div className="reserve_guide_chevron_box">
                  <div className="reserve_guide_chevron">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* [3. PLACEHOLDER VIEWS - Other Tabs]                  */}
      {/* ---------------------------------------------------- */}
      {/* ---------------------------------------------------- */}
      {/* [3. DELIVERY VIEW - 실시간 수거·배송 현황]           */}
      {/* ---------------------------------------------------- */}
      {activeTab === "delivery" && (
        <div className="delivery_view_container">
          <header className="home_delivery_header">
            <button
              type="button"
              className="home_delivery_back_btn"
              onClick={() => setActiveTab("home")}
              aria-label="뒤로가기"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="home_delivery_title_group">
              <h1 className="home_delivery_title">수거 · 배송 현황</h1>
              <p className="home_delivery_subtitle">
                소중한 세탁물의 실시간 이동 경로입니다.
              </p>
            </div>
            <div style={{ width: 40 }} />
          </header>

          {/* 실시간 상태 요약 카드 */}
          <section className="delivery_status_section">
            <div
              className="delivery_status_card"
              onClick={() => handleAction("수거배송 상세조회")}
            >
              <div className="delivery_status_top">
                <span className="delivery_status_badge">배송 출발</span>
                <span className="delivery_invoice">운송장 8311-9C94</span>
              </div>
              <h2 className="delivery_status_main">오늘 밤 11시 도착 예정</h2>
              <p className="delivery_status_desc">
                배송 마스터가 문 앞 안심 배송을 위해 이동 중입니다.
              </p>

              <div className="delivery_progress_line_wrapper">
                <div className="delivery_progress_fill" />
                <div
                  className="delivery_progress_dot delivery_progress_dot--active"
                  style={{ left: "0%" }}
                />
                <div
                  className="delivery_progress_dot delivery_progress_dot--active"
                  style={{ left: "33%" }}
                />
                <div
                  className="delivery_progress_dot delivery_progress_dot--active"
                  style={{ left: "66%" }}
                />
                <div
                  className="delivery_progress_dot delivery_progress_dot--pending"
                  style={{ left: "100%" }}
                />
              </div>
              <div className="delivery_progress_labels">
                <span>수거신청</span>
                <span>수거완료</span>
                <span>세탁완료</span>
                <span className="highlight_step">배송중</span>
              </div>
            </div>
          </section>

          {/* 실시간 GPS 위치 확인 대시보드 */}
          <section className="delivery_gps_section">
            <div className="delivery_gps_card">
              <div className="delivery_gps_card_header">
                <div className="gps_header_title_group">
                  <span className="gps_section_badge">GPS LIVE CONNECTED</span>
                  <h3 className="gps_card_title">실시간 수거 · 배송 경로</h3>
                </div>
                <button
                  type="button"
                  className={`gps_toggle_btn ${trackingActive ? "gps_toggle_btn--active" : ""}`}
                  onClick={() => setTrackingActive(!trackingActive)}
                  aria-label={
                    trackingActive ? "GPS 추적 일시정지" : "GPS 추적 시작"
                  }
                >
                  <span
                    className={`gps_pulse_dot ${trackingActive ? "gps_pulse_dot--active" : "gps_pulse_dot--inactive"}`}
                  />
                  <span>{trackingActive ? "추적 중" : "추적 정지"}</span>
                </button>
              </div>

              {/* 실시간 vector map */}
              <div className="delivery_gps_map_container">
                <svg
                  className="delivery_gps_vector_map"
                  viewBox="0 0 358 220"
                  width="100%"
                  height="220"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Map Background Grids */}
                  <rect width="358" height="220" fill="#f8fafc" rx="24" />

                  {/* Subtle Grid Lines */}
                  <g opacity="0.3" stroke="#e2e8f0" strokeWidth="0.5">
                    <line x1="0" y1="40" x2="358" y2="40" />
                    <line x1="0" y1="80" x2="358" y2="80" />
                    <line x1="0" y1="120" x2="358" y2="120" />
                    <line x1="0" y1="160" x2="358" y2="160" />
                    <line x1="0" y1="200" x2="358" y2="200" />

                    <line x1="60" y1="0" x2="60" y2="220" />
                    <line x1="120" y1="0" x2="120" y2="220" />
                    <line x1="180" y1="0" x2="180" y2="220" />
                    <line x1="240" y1="0" x2="240" y2="220" />
                    <line x1="300" y1="0" x2="300" y2="220" />
                  </g>

                  {/* Green park zones */}
                  <path
                    d="M -10 170 Q 50 160, 90 200 T 150 230 L -10 230 Z"
                    fill="#f0fdf4"
                    stroke="#dcfce7"
                    strokeWidth="1"
                  />
                  <path
                    d="M 220 -10 Q 270 30, 310 -10 Z"
                    fill="#f0fdf4"
                    stroke="#dcfce7"
                    strokeWidth="1"
                  />

                  {/* Blue Han-river ribbon */}
                  <path
                    d="M -10 90 Q 80 115, 180 90 T 370 85 L 370 120 Q 280 125, 180 125 T -10 120 Z"
                    fill="#f0f9ff"
                    stroke="#e0f2fe"
                    strokeWidth="1"
                  />
                  <text
                    x="130"
                    y="112"
                    fill="#bae6fd"
                    fontSize="8"
                    fontWeight="700"
                    fontFamily="var(--font-pretendard)"
                    letterSpacing="1"
                  >
                    HAN RIVER
                  </text>

                  {/* Decorative Local Roads */}
                  <g
                    stroke="#ffffff"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.9"
                  >
                    <line x1="75" y1="0" x2="75" y2="220" />
                    <line x1="275" y1="0" x2="275" y2="220" />
                    <line x1="0" y1="55" x2="358" y2="55" />
                    <line x1="0" y1="165" x2="358" y2="165" />
                  </g>

                  {/* Inner Road Lines */}
                  <g
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    strokeLinecap="round"
                    opacity="0.6"
                  >
                    <line x1="75" y1="0" x2="75" y2="220" />
                    <line x1="275" y1="0" x2="275" y2="220" />
                    <line x1="0" y1="55" x2="358" y2="55" />
                    <line x1="0" y1="165" x2="358" y2="165" />
                  </g>

                  {/* Main Curved Delivery Transit Route (Underlay Grey Road) */}
                  <path
                    d="M 40 145 C 90 145, 120 65, 175 65 C 230 65, 260 145, 315 145"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* Animated Glowing Neon Line on top of the main path */}
                  <path
                    d="M 40 145 C 90 145, 120 65, 175 65 C 230 65, 260 145, 315 145"
                    fill="none"
                    className={`delivery_neon_glowing_path ${trackingActive ? "delivery_neon_glowing_path--active" : ""}`}
                    stroke="url(#neon-route-grad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  {/* SVG gradients */}
                  <defs>
                    <linearGradient
                      id="neon-route-grad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                      <stop
                        offset="100%"
                        stopColor="#2563eb"
                        stopOpacity="0.9"
                      />
                    </linearGradient>
                  </defs>

                  {/* Landmarks Labels */}
                  <g transform="translate(45, 122)">
                    <rect
                      x="-35"
                      y="-12"
                      width="70"
                      height="18"
                      rx="5"
                      fill="#334155"
                    />
                    <text
                      x="0"
                      y="1"
                      fill="#ffffff"
                      fontSize="8"
                      fontWeight="800"
                      textAnchor="middle"
                      fontFamily="var(--font-pretendard)"
                    >
                      스마트 팩토리
                    </text>
                  </g>

                  <g transform="translate(315, 122)">
                    <rect
                      x="-22"
                      y="-12"
                      width="44"
                      height="18"
                      rx="5"
                      fill="#2563eb"
                    />
                    <text
                      x="0"
                      y="1"
                      fill="#ffffff"
                      fontSize="8"
                      fontWeight="800"
                      textAnchor="middle"
                      fontFamily="var(--font-pretendard)"
                    >
                      우리집
                    </text>
                  </g>

                  {/* Markers pins */}
                  {/* Start Marker */}
                  <circle
                    cx="40"
                    cy="145"
                    r="7"
                    fill="#64748b"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle cx="40" cy="145" r="3" fill="#ffffff" />

                  {/* End Marker (Pulsing User Home) */}
                  <g transform="translate(315, 145)">
                    <circle
                      cx="0"
                      cy="0"
                      r="14"
                      className="gps_map_home_pulse"
                      fill="#2563eb"
                      opacity="0.2"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="7"
                      fill="#2563eb"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Gliding Rider vehicle rendered directly in SVG for bulletproof scaling! */}
                  <g
                    className={`gps_delivery_rider_glider ${trackingActive ? "gps_delivery_rider_glider--active" : ""}`}
                  >
                    {/* Ring aura pulse */}
                    <circle
                      cx="0"
                      cy="0"
                      r="13"
                      className="gps_rider_glow_pulse"
                      fill="#3b82f6"
                      opacity="0.3"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="7"
                      fill="#2563eb"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  </g>
                </svg>

                {/* Floating Glassmorphic Telemetry Monitor Panel */}
                <div className="gps_telemetry_glass_panel">
                  <div className="telemetry_row">
                    <div className="telemetry_item">
                      <span className="tele_label">위도(Latitude)</span>
                      <strong className="tele_val font_mono">
                        {gpsCoords.lat.toFixed(6)}°
                      </strong>
                    </div>
                    <div className="telemetry_item">
                      <span className="tele_label">경도(Longitude)</span>
                      <strong className="tele_val font_mono">
                        {gpsCoords.lng.toFixed(6)}°
                      </strong>
                    </div>
                  </div>

                  <div className="telemetry_divider" />

                  <div className="telemetry_row">
                    <div className="telemetry_item">
                      <span className="tele_label">위성 연결</span>
                      <strong className="tele_val highlight_green">
                        {satellites} 수신중
                      </strong>
                    </div>
                    <div className="telemetry_item">
                      <span className="tele_label">이동 속도</span>
                      <strong className="tele_val">24 km/h</strong>
                    </div>
                    <div className="telemetry_item">
                      <span className="tele_label">도착 예정</span>
                      <strong className="tele_val highlight_blue">
                        약 {etaMinutes}분
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accuracy check footer info */}
              <div className="gps_accuracy_info_footer">
                <svg
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="gps_info_icon"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>실시간 GPS 위성 신호 강도 정상 (수신 상태 양호)</span>
              </div>
            </div>
          </section>

          {/* 배송 히스토리 타임라인 */}
          <section className="delivery_timeline_section">
            <h3 className="delivery_section_title">타임라인 상세</h3>
            <div className="delivery_timeline_list">
              <div className="delivery_timeline_item delivery_timeline_item--active">
                <div className="delivery_time_col">
                  <span className="deliv_date">05.27</span>
                  <span className="deliv_time">10:15</span>
                </div>
                <div className="delivery_dot_col">
                  <div className="deliv_timeline_dot deliv_timeline_dot--active-pulse" />
                  <div className="deliv_timeline_line" />
                </div>
                <div className="delivery_content_col">
                  <h4 className="deliv_step_title">배송 출발 및 마스터 매칭</h4>
                  <p className="deliv_step_desc">
                    소중한 세탁물을 안전하게 안심팩 포장하여 배송 마스터님이 문
                    앞 배달을 개시했습니다.
                  </p>
                </div>
              </div>

              <div className="delivery_timeline_item delivery_timeline_item--done">
                <div className="delivery_time_col">
                  <span className="deliv_date">05.27</span>
                  <span className="deliv_time">02:30</span>
                </div>
                <div className="delivery_dot_col">
                  <div className="deliv_timeline_dot" />
                  <div className="deliv_timeline_line" />
                </div>
                <div className="delivery_content_col">
                  <h4 className="deliv_step_title">
                    전문 안심 살균 및 건조 완료
                  </h4>
                  <p className="deliv_step_desc">
                    저온 스팀 살균 세탁 공정과 고온 열풍 회전 건조 케어를
                    안전하게 완료했습니다.
                  </p>
                </div>
              </div>

              <div className="delivery_timeline_item delivery_timeline_item--done">
                <div className="delivery_time_col">
                  <span className="deliv_date">05.26</span>
                  <span className="deliv_time">22:00</span>
                </div>
                <div className="delivery_dot_col">
                  <div className="deliv_timeline_dot" />
                  <div className="deliv_timeline_line" />
                </div>
                <div className="delivery_content_col">
                  <h4 className="deliv_step_title">스마트 팩토리 수거 입고</h4>
                  <p className="deliv_step_desc">
                    왓씨 스마트 허브에 입고되어 정밀 오염 원단 분류 및 살균 준비
                    단계에 진입했습니다.
                  </p>
                </div>
              </div>

              <div className="delivery_timeline_item delivery_timeline_item--done">
                <div className="delivery_time_col">
                  <span className="deliv_date">05.26</span>
                  <span className="deliv_time">18:40</span>
                </div>
                <div className="delivery_dot_col">
                  <div className="deliv_timeline_dot" />
                </div>
                <div className="delivery_content_col">
                  <h4 className="deliv_step_title">문 앞 비대면 수거 완료</h4>
                  <p className="deliv_step_desc">
                    안심 수거백이 지정하신 수거 장소(문 앞)에서 정상적으로
                    비대면 수거 완료되었습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 수령 정보 카드 */}
          <section className="delivery_info_section">
            <div className="delivery_info_card">
              <h4 className="deliv_info_title">수거 · 배송 정보</h4>
              <div className="deliv_info_row">
                <span className="deliv_info_label">배송 주소</span>
                <span className="deliv_info_val">
                  서울특별시 강남구 테헤란로 왓씨하우스 302호
                </span>
              </div>
              <div className="deliv_info_row">
                <span className="deliv_info_label">수거 장소</span>
                <span className="deliv_info_val">문 앞 (비대면 안심 수거)</span>
              </div>
              <div className="deliv_info_row">
                <span className="deliv_info_label">공동현관 출입키</span>
                <span className="deliv_info_val">
                  종벨 1234 호출 후 공동현관 진입
                </span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* [4. CARE VIEW - 스마트 의류 케어 가이드]              */}
      {/* ---------------------------------------------------- */}
      {activeTab === "care" && (
        <div className="care_view_container">
          <header className="care_header">
            <button
              type="button"
              className="care_back_button"
              onClick={() => navigate("/home?tab=home")}
              aria-label="홈으로 돌아가기"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h1 className="care_title">의류 케어 매니저</h1>
            <div className="care_header_right_spacer" />
          </header>

          {/* [1. 의류 등록 & 소재 분석] */}
          <section className="care_register_section">
            <div className="care_interactive_form">
              <h3 className="care_section_title">스마트 의류 등록</h3>

              <div className="form_group">
                <label className="form_label">의류 이름/종류</label>
                <input
                  type="text"
                  className="form_input"
                  placeholder="예: 최애 캐시미어 가디건"
                  value={clothName}
                  onChange={(e) => setClothName(e.target.value)}
                />
              </div>

              <div className="form_group">
                <label className="form_label">의류 카테고리 선택</label>
                <div className="category_selector">
                  {["상의", "하의", "아우터", "이불/리빙"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`cat_btn ${clothCategory === cat ? "cat_btn--active" : ""}`}
                      onClick={() => setClothCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form_group">
                <label className="form_label">소재 성분 선택 (중복 가능)</label>
                <div className="material_selector">
                  {["면", "울", "실크", "합성섬유"].map((mat) => {
                    const isSelected = selectedMaterials.includes(mat);
                    return (
                      <button
                        key={mat}
                        type="button"
                        className={`mat_btn ${isSelected ? "mat_btn--active" : ""}`}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedMaterials(
                              selectedMaterials.filter((m) => m !== mat),
                            );
                          } else {
                            setSelectedMaterials([...selectedMaterials, mat]);
                          }
                        }}
                      >
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form_group">
                <label className="form_label">사진 업로드</label>
                <div className="photo_upload_row">
                  <button
                    type="button"
                    className={`photo_btn ${hasPhoto ? "photo_btn--uploaded" : ""}`}
                    onClick={() => {
                      setHasPhoto(!hasPhoto);
                      triggerToast(
                        hasPhoto
                          ? "📸 사진 업로드가 취소되었습니다."
                          : "📸 가상 사진 업로드 완료!",
                      );
                    }}
                  >
                    {hasPhoto ? "✅ 업로드 완료" : "📸 사진 선택하기"}
                  </button>
                  <span className="photo_hint">
                    라벨이나 옷 사진을 올려주세요
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="form_submit_btn"
                onClick={() => {
                  if (!clothName.trim()) {
                    triggerToast("⚠️ 의류 이름을 입력해 주세요!");
                    return;
                  }
                  if (selectedMaterials.length === 0) {
                    triggerToast("⚠️ 최소 하나 이상의 소재를 선택해 주세요!");
                    return;
                  }
                  const newCloth = {
                    name: clothName,
                    category: clothCategory,
                    materials: selectedMaterials,
                    photo: hasPhoto,
                  };
                  setRegisteredClothes([newCloth, ...registeredClothes]);
                  setClothName("");
                  setSelectedMaterials([]);
                  setHasPhoto(false);
                  triggerToast(
                    "✨ 새 의류가 성공적으로 등록 및 분석되었습니다!",
                  );
                }}
              >
                의류 등록 및 AI 소재 분석하기
              </button>
            </div>

            {/* [2. 소재 분석 결과 디스플레이] */}
            <div className="care_analysis_widget">
              <h3 className="care_widget_title">실시간 AI 소재 분석</h3>
              {registeredClothes.length === 0 ? (
                <p className="no_data_hint">
                  등록된 의류가 없습니다. 위 폼에서 의류를 등록해 주세요!
                </p>
              ) : (
                <div className="care_analysis_scroll">
                  {registeredClothes.map((cloth, idx) => {
                    // 소재에 따른 가상 세탁방법 및 주의사항 도출
                    let laundryGuide = "일반 세탁 권장 (찬물 세탁)";
                    let warningGuide = "손상 주의 (올 풀림 경고)";

                    if (cloth.materials.includes("실크")) {
                      laundryGuide = "손세탁 절대 권장 (중성세제 사용)";
                      warningGuide = "변색 주의 & 손상 주의";
                    } else if (cloth.materials.includes("울")) {
                      laundryGuide = "드라이클리닝 필수 권장";
                      warningGuide = "수축 주의 (온수 금지)";
                    } else if (
                      cloth.materials.includes("합성섬유") &&
                      cloth.materials.includes("면")
                    ) {
                      laundryGuide = "일반 세탁 (세탁기 표준코스 가능)";
                      warningGuide = "변색 주의 (단독 세탁)";
                    } else if (cloth.materials.includes("합성섬유")) {
                      laundryGuide = "일반 세탁 및 건조기 사용 제어";
                      warningGuide = "손상 주의 (고온 열풍 피함)";
                    }

                    return (
                      <div key={idx} className="analysis_result_card">
                        <div className="analysis_card_header">
                          <span className="anal_badge">{cloth.category}</span>
                          <span className="anal_name">{cloth.name}</span>
                        </div>
                        <div className="anal_details">
                          <div className="anal_row">
                            <span className="anal_lbl">분석 소재</span>
                            <span className="anal_val font_bold">
                              {cloth.materials.join(" + ")}
                            </span>
                          </div>
                          <div className="anal_row">
                            <span className="anal_lbl">세탁 방법 안내</span>
                            <span className="anal_val text_blue font_bold">
                              {laundryGuide}
                            </span>
                          </div>
                          <div className="anal_row">
                            <span className="anal_lbl">주의사항 안내</span>
                            <span className="anal_val text_red font_bold">
                              ⚠️ {warningGuide}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* [3. 세탁 주기 관리] */}
          <section className="care_cycle_section">
            <h3 className="care_section_title">세탁 주기 관리</h3>
            <div className="care_cycle_interactive_card">
              <div className="cycle_header_row">
                <span className="cycle_remind_title">세탁 필요 알림</span>
                <button
                  className={`toggle_alert_btn ${alertEnabled ? "active" : ""}`}
                  onClick={() => {
                    setAlertEnabled(!alertEnabled);
                    triggerToast(
                      alertEnabled
                        ? "🔔 세탁 리마인더 알림을 껐습니다."
                        : "🔔 세탁 리마인더 알림이 활성화되었습니다!",
                    );
                  }}
                >
                  {alertEnabled ? "알림 On" : "알림 Off"}
                </button>
              </div>

              {/* 착용 횟수 제어 시뮬레이터 */}
              <div className="cycle_simulation_control">
                <div className="sim_text_row">
                  <span>착용 횟수</span>
                  <span className="font_bold highlight_blue">
                    {wearCount}회 착용
                  </span>
                </div>
                <div className="sim_btn_row">
                  <button
                    type="button"
                    className="sim_btn"
                    onClick={() => {
                      if (wearCount > 0) setWearCount(wearCount - 1);
                    }}
                  >
                    - 1회 착용
                  </button>
                  <button
                    type="button"
                    className="sim_btn"
                    onClick={() => setWearCount(wearCount + 1)}
                  >
                    + 1회 착용
                  </button>
                </div>
              </div>

              {/* 주기 설정 슬라이더 */}
              <div className="cycle_slider_group">
                <div className="slider_label_row">
                  <span>설정 세탁 주기</span>
                  <span className="font_bold">
                    {targetCycle}회 착용 후 세탁
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  className="cycle_range_input"
                  value={targetCycle}
                  onChange={(e) => setTargetCycle(parseInt(e.target.value))}
                />
              </div>

              {/* 세탁 필요 알림 위젯 */}
              {wearCount >= targetCycle && alertEnabled ? (
                <div className="cycle_alert_banner">
                  <span className="alert_icon">
                    <AlertIcon />
                  </span>
                  <div className="alert_content">
                    <h4 className="alert_title">세탁이 대단히 시급합니다!</h4>
                    <p className="alert_desc">
                      설정하신 세탁 주기({targetCycle}회)를 초과하여 원단
                      손상이나 위생 균 번식이 우려됩니다.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="cycle_safe_banner">
                  <span className="safe_icon">
                    <SafeIcon />
                  </span>
                  <p className="safe_desc">
                    세탁 주기 상태 양호. {targetCycle - wearCount}회 더 착용한
                    뒤 세탁하셔도 안전합니다.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* [4. 세탁 추천 및 예약 연결] */}
          <section className="care_recommend_section">
            <h3 className="care_section_title">맞춤형 세탁 추천</h3>
            <div className="care_recommend_interactive_card">
              <div className="rec_badge_row">
                <span className="rec_tag_ai">AI 기반 맞춤 세탁 추천</span>
              </div>
              <h4 className="rec_course_title">
                안심 저온 마일드 스팀 드라이 코스
              </h4>
              <p className="rec_course_desc">
                등록하신 의류 정보의 소재(실크/울 혼방) 비율을 정밀 분석하여,
                원단 수축을 방지하고 칼주름을 보존시키는 왓씨 안심 특수 공정을
                AI가 자동 추천해 드립니다.
              </p>

              {/* 개인화 옵션 추천 */}
              <div className="rec_personal_options">
                <span className="rec_option_lbl">개인화 추천 옵션</span>
                <div className="option_selectors">
                  {[
                    "알러지 케어 추가",
                    "실크 전용 보호제",
                    "초미세 정전기 예방",
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`opt_btn ${personalOption === opt ? "opt_btn--active" : ""}`}
                      onClick={() => {
                        setPersonalOption(opt);
                        triggerToast(
                          `✨ [${opt}] 옵션이 맞춤 세탁에 임시 반영되었습니다.`,
                        );
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 즉시 세탁 예약 연결 */}
              <button
                type="button"
                className="reserve_link_btn"
                onClick={() => {
                  setActiveTab("reserve");
                  triggerToast(
                    "🧭 세탁 예약 페이지로 연결되었습니다. 즉시 예약을 개시하세요!",
                  );
                }}
              >
                추천 코스로 예약 연결하기 ➡️
              </button>
            </div>
          </section>

          {/* [5. 라이프케어 (보관방법 안내)] */}
          <section className="care_lifecare_section">
            <h3 className="care_section_title">라이프케어 보관법 안내</h3>
            <div className="care_lifecare_grid">
              <div
                className="care_lifecare_card"
                onClick={() => navigate("/lifecare/yarn")}
                style={{ cursor: "pointer" }}
              >
                <div className="life_card_header">
                  <span className="life_card_icon">
                    <LifeCardIcon type="yarn" />
                  </span>
                  <h4 className="life_card_title">니트 보관</h4>
                </div>
                <p className="life_card_desc">
                  옷걸이에 걸면 늘어나므로, 느슨하게 말아서 한지나 제습 시트와
                  함께 보관하세요.
                </p>
              </div>

              <div
                className="care_lifecare_card"
                onClick={() => navigate("/lifecare/coat")}
                style={{ cursor: "pointer" }}
              >
                <div className="life_card_header">
                  <span className="life_card_icon">
                    <LifeCardIcon type="coat" />
                  </span>
                  <h4 className="life_card_title">코트 보관</h4>
                </div>
                <p className="life_card_desc">
                  안심 통풍 정장 커버를 씌우고 그늘진 상온에 보관해 어깨 선
                  뒤틀림을 예방하세요.
                </p>
              </div>

              <div
                className="care_lifecare_card"
                onClick={() => navigate("/lifecare/shirt")}
                style={{ cursor: "pointer" }}
              >
                <div className="life_card_header">
                  <span className="life_card_icon">
                    <LifeCardIcon type="shirt" />
                  </span>
                  <h4 className="life_card_title">셔츠 관리</h4>
                </div>
                <p className="life_card_desc">
                  깃을 완전히 세우고 의류 간 3cm 간격을 확보하여 옷장 내부
                  통기성을 보장하세요.
                </p>
              </div>
            </div>
          </section>

          {/* [6. 관리 팁 제공] */}
          <section className="care_tips_section">
            <h3 className="care_section_title">유용한 의류 관리 팁</h3>
            <div className="care_tips_accordion">
              <div
                className="care_tip_card"
                onClick={() => handleAction("계절별 관리 팁")}
              >
                <h4 className="tip_card_title">계절별 관리</h4>
                <p className="tip_card_desc">
                  황사와 미세먼지가 가득한 환절기에는 안심 털기 후 가벼운 살균
                  스프레이 소독을 일상화하세요.
                </p>
              </div>
              <div
                className="care_tip_card"
                onClick={() => handleAction("의류 수명 관리 팁")}
              >
                <h4 className="tip_card_title">의류 수명 관리</h4>
                <p className="tip_card_desc">
                  단추를 모두 채우고 뒤집어서 울코스로 세탁망에 세탁하는 것이
                  옷감 보풀 수명을 3배 늘리는 비결입니다.
                </p>
              </div>
              <div
                className="care_tip_card"
                onClick={() => handleAction("셔츠 전용 팁")}
              >
                <h4 className="tip_card_title">셔츠 깃 관리</h4>
                <p className="tip_card_desc">
                  목 깃 얼룩은 왓씨 특수 오염팩을 쓰거나 세탁 전 가벼운 식초
                  희석수를 분무해 주면 황변을 안전하게 방지합니다.
                </p>
              </div>
            </div>
          </section>

          {/* [7. 세탁 이력 관리] */}
          <section className="care_history_section">
            <h3 className="care_section_title">세탁 이력 관리</h3>
            <div className="care_history_card">
              <div className="history_summary_row">
                <div className="history_summary_box">
                  <span className="hist_lbl">누적 세탁 횟수</span>
                  <span className="hist_val font_bold highlight_blue">
                    24회
                  </span>
                </div>
                <div className="history_divider" />
                <div className="history_summary_box">
                  <span className="hist_lbl">의류 등록 개수</span>
                  <span className="hist_val font_bold">
                    {registeredClothes.length}벌
                  </span>
                </div>
              </div>

              <div className="care_history_list">
                <div
                  className="care_history_item"
                  onClick={() => handleAction("5월 이력 상세")}
                >
                  <div className="hist_left">
                    <span className="hist_date">05.27</span>
                    <span className="hist_category">아우터 · 가죽</span>
                  </div>
                  <div className="hist_right">
                    <span className="hist_cloth_desc">
                      구스다운 아웃도어 패딩 외 1벌
                    </span>
                    <span className="hist_status_done">배송출발</span>
                  </div>
                </div>

                <div
                  className="care_history_item"
                  onClick={() => handleAction("4월 이력 상세")}
                >
                  <div className="hist_left">
                    <span className="hist_date">05.14</span>
                    <span className="hist_category">일반 세탁</span>
                  </div>
                  <div className="hist_right">
                    <span className="hist_cloth_desc">
                      안심 생활빨래 안심팩 1회
                    </span>
                    <span className="hist_status_finish">완료</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* [5. MYPAGE VIEW - 마이페이지]                         */}
      {/* ---------------------------------------------------- */}
      {activeTab === "mypage" && (
        <div className="mypage_view_container">
          {/* 동적 이름 연동 타이틀 */}
          <header className="mypage_header">
            <h1 className="mypage_title">{profileName}님의 WatC</h1>
          </header>

          {/* 2열 배치 상단 카드 그리드 */}
          <section className="mypage_top_cards_grid">
            {/* 왼쪽 파란색 프로필 카드 [i1Img 이미지 탑재 및 +버튼 상세 설정 모달 연결] */}
            <div
              className="mypage_profile_blue_card"
              onClick={() => setShowProfileModal(true)}
              style={{ cursor: "pointer" }}
            >
              <div className="mypage_profile_img_wrapper">
                <img
                  src={i1Img} // a1Img 대신 i1Img 탑재 완료
                  alt="프로필 이미지"
                  className="mypage_profile_character"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <div
                  className="mypage_profile_plus_btn"
                  aria-hidden="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileModal(true);
                  }}
                >
                  +
                </div>
              </div>
            </div>

            {/* 오른쪽 점수 카드 */}
            <div
              className="mypage_score_card"
              onClick={() => navigate("/mypage/detail/point-history")}
            >
              <div className="mypage_gauge_container">
                <svg className="mypage_gauge_svg" viewBox="0 0 100 50">
                  {/* Gauge Background path (semi-circle) */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Active Blue Gauge path (semi-circle) */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray="125.66"
                    strokeDashoffset="31.41" /* 80% filled to match standard arc style in Figma */
                  />
                </svg>
                {/* 왓씨 코인 오버레이 (r1Img) */}
                <div className="mypage_gauge_coins">
                  <img
                    src={r1Img}
                    alt="왓씨 코인 1"
                    className="mypage_gauge_coin coin_1"
                  />
                  <img
                    src={r1Img}
                    alt="왓씨 코인 2"
                    className="mypage_gauge_coin coin_2"
                  />
                </div>
              </div>
              <span className="mypage_score_val">800점</span>
            </div>
          </section>

          {/* 지갑 포인트/쿠폰 보유 정보 카드 */}
          <section className="mypage_wallet_section">
            <div className="mypage_wallet_card">
              <div className="mypage_wallet_column">
                <span className="mypage_wallet_label">포인트</span>
                <span className="mypage_wallet_val">30원</span>
                <div className="mypage_wallet_btn_row">
                  <button
                    className="mypage_w_btn mypage_w_btn--gray"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/mypage/detail/point-history");
                    }}
                  >
                    보유
                  </button>
                  <button
                    className="mypage_w_btn mypage_w_btn--blue"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerToast(
                        "🎁 안심 포인트 선물 서비스는 현재 정식 준비 중입니다!",
                      );
                    }}
                  >
                    선물
                  </button>
                </div>
              </div>

              <div className="mypage_wallet_vertical_line" />

              <div className="mypage_wallet_column">
                <span className="mypage_wallet_label">쿠폰</span>
                <span className="mypage_wallet_val">2장</span>
                <div className="mypage_wallet_btn_row">
                  <button
                    className="mypage_w_btn mypage_w_btn--gray"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/mypage/detail/coupons");
                    }}
                  >
                    보유
                  </button>
                  <button
                    className="mypage_w_btn mypage_w_btn--blue"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerToast(
                        "🎁 안심 쿠폰 선물 서비스는 현재 정식 준비 중입니다!",
                      );
                    }}
                  >
                    선물
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 마이페이지 세분화된 메뉴 리스트 */}
          <section className="mypage_menu_section">
            <div className="mypage_menu_group">
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/active-orders")}
              >
                <span>진행 중 주문</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/washing-rules")}
              >
                <span>세탁 이용수칙</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
            </div>

            <div className="mypage_menu_group">
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/price-basic")}
              >
                <span>기본 가격표</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/price-category")}
              >
                <span>세탁 종류별 요금</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/price-additional")}
              >
                <span>추가 요금 기준</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
            </div>

            <div className="mypage_menu_group">
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/care-guide")}
              >
                <span>의류 관리 및 라이프케어</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/alert-settings")}
              >
                <span>재세탁 알림</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/care-guide")}
              >
                <span>관리 팁 제공</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
            </div>

            <div className="mypage_menu_group">
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/invite-friend")}
              >
                <span>친구 초대</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/attendance-check")}
              >
                <span>왓씨 출석체크</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/notices")}
              >
                <span>공지사항</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
              <div
                className="mypage_menu_item"
                onClick={() => navigate("/mypage/detail/customer-center")}
              >
                <span>고객센터</span>
                <span className="mypage_arrow">&gt;</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 공통 하단 네비게이션 탭 바 */}
      {!showReserveDetail && <BottomNav />}

      {/* [프로필 상세 설정 커스텀 대화형 모달 창] */}
      {showProfileModal && (
        <div className="profile_modal_overlay" style={styles.modalOverlay}>
          <div
            className="profile_modal_content"
            style={{
              ...styles.modalContent,
              display: "flex",
              flexDirection: "column",
              maxHeight: "80vh",
              boxSizing: "border-box",
              padding: "20px 20px 16px",
            }}
          >
            <h3
              className="profile_modal_title"
              style={{
                ...styles.modalTitle,
                marginTop: 0,
                marginBottom: "16px",
                flexShrink: 0,
              }}
            >
              👤 프로필 상세 설정
            </h3>

            {/* 입력 필드 스크롤 콘텐츠 영역 */}
            <div
              className="profile_modal_scroll_content"
              style={{
                flex: 1,
                overflowY: "auto",
                textAlign: "left",
                paddingRight: "4px",
                marginBottom: "12px",
              }}
            >
              <div className="profile_form_group" style={styles.formGroup}>
                <label className="profile_form_label" style={styles.formLabel}>
                  이름
                </label>
                <input
                  type="text"
                  className="profile_form_input"
                  style={styles.formInput}
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </div>

              <div className="profile_form_group" style={styles.formGroup}>
                <label className="profile_form_label" style={styles.formLabel}>
                  연락처
                </label>
                <input
                  type="text"
                  className="profile_form_input"
                  style={styles.formInput}
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                />
              </div>

              <div className="profile_form_group" style={styles.formGroup}>
                <label className="profile_form_label" style={styles.formLabel}>
                  배송 주소
                </label>
                <textarea
                  className="profile_form_input"
                  style={{ ...styles.formInput, ...styles.formTextarea }}
                  value={profileAddress}
                  onChange={(e) => setProfileAddress(e.target.value)}
                />
              </div>

              {/* 신규: 공동현관 출입 방법 */}
              <div className="profile_form_group" style={styles.formGroup}>
                <label className="profile_form_label" style={styles.formLabel}>
                  공동현관 출입 방법
                </label>
                <input
                  type="text"
                  className="profile_form_input"
                  style={styles.formInput}
                  placeholder="예: 공동현관 비밀번호 #1234* 또는 자유 출입"
                  value={profileEntry}
                  onChange={(e) => setProfileEntry(e.target.value)}
                />
              </div>

              {/* 신규: 기본 배송 요청사항 */}
              <div className="profile_form_group" style={styles.formGroup}>
                <label className="profile_form_label" style={styles.formLabel}>
                  기본 배송 요청사항
                </label>
                <div
                  className={`profile_request_dropdown${requestOptionsOpen ? " open" : ""}`}
                  tabIndex={0}
                  role="button"
                  onClick={() => setRequestOptionsOpen((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setRequestOptionsOpen((prev) => !prev);
                    }
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setRequestOptionsOpen(false);
                    }
                  }}
                >
                  <div className="profile_request_trigger">
                    <span className="profile_request_value">
                      {profileRequest}
                    </span>
                    <span
                      className="profile_request_chevron"
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </div>
                  <div
                    className="profile_request_options"
                    aria-hidden={!requestOptionsOpen}
                  >
                    {deliveryRequestOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`profile_request_option${option === profileRequest ? " selected" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setProfileRequest(option);
                          setRequestOptionsOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="profile_modal_buttons"
              style={{ ...styles.modalButtons, marginTop: 0, flexShrink: 0 }}
            >
              <button
                type="button"
                className="profile_modal_btn profile_modal_btn--cancel"
                style={styles.modalNoBtn}
                onClick={() => setShowProfileModal(false)}
              >
                닫기
              </button>
              <button
                type="button"
                className="profile_modal_btn profile_modal_btn--save"
                style={styles.modalYesBtn}
                onClick={() => {
                  setShowProfileModal(false);
                  triggerToast("👤 프로필 상세 설정이 저장되었습니다!");
                }}
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* [고객 리뷰 상세 모달창 - Glassmorphic Detail Pop-up] */}
      {selectedReview && (
        <div
          className="review_detail_modal_overlay"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="review_detail_modal_content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="review_modal_header">
              <div className="review_modal_user_info">
                <div className="review_modal_avatar">
                  {selectedReview.user.charAt(0)}
                </div>
                <div>
                  <h4 className="review_modal_username">
                    {selectedReview.user}
                  </h4>
                  <div className="review_modal_stars_row">
                    <span className="review_modal_stars">
                      {selectedReview.stars}
                    </span>
                    <span className="review_modal_date">
                      {selectedReview.date}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="review_modal_close_btn"
                onClick={() => setSelectedReview(null)}
                aria-label="닫기"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="review_modal_body">
              {selectedReview.img && (
                <div className="review_modal_img_wrapper">
                  <img
                    src={selectedReview.img}
                    alt={`${selectedReview.user} 리뷰 상세 이미지`}
                    className="review_modal_detail_img"
                  />
                </div>
              )}

              <div className="review_modal_text_wrapper">
                <p className="review_modal_body_text">{selectedReview.body}</p>
              </div>

              {selectedReview.tags && selectedReview.tags.length > 0 && (
                <div className="review_modal_tags">
                  {selectedReview.tags.map((t: string) => (
                    <span className="review_modal_tag_pill" key={t}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="review_modal_footer">
              <button
                className="review_modal_action_btn"
                onClick={() => setSelectedReview(null)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 알림창 */}

      {/* 토스트 알림창 */}
      <div className={`home_toast ${toastMessage ? "show" : ""}`} role="status">
        {toastMessage}
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modalContent: {
    width: "300px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "24px 20px",
    textAlign: "center" as const,
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.15)",
    fontFamily: "var(--font-pretendard)",
  },
  modalTitle: {
    fontSize: "16px",
    color: "#1E293B",
    fontWeight: "700",
    marginBottom: "16px",
  },
  formGroup: {
    marginBottom: "14px",
    textAlign: "left" as const,
  },
  formLabel: {
    fontSize: "11px",
    color: "#64748B",
    fontWeight: "600",
    marginBottom: "5px",
    display: "block",
  },
  formInput: {
    width: "100%",
    height: "40px",
    backgroundColor: "#F8FAFC",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    padding: "0 12px",
    fontSize: "14px",
    color: "#1E293B",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "var(--font-pretendard)",
  },
  formTextarea: {
    height: "64px",
    padding: "8px 12px",
    resize: "none" as const,
  },
  modalButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  modalNoBtn: {
    flex: 1,
    height: "42px",
    backgroundColor: "#F1F5F9",
    color: "#64748B",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "var(--font-pretendard)",
  },
  modalYesBtn: {
    flex: 1,
    height: "42px",
    backgroundColor: "#2563EB",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "var(--font-pretendard)",
  },
};

// Home.tsx 내부 함수 추가
const handleCameraShutter = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // 카메라 연결 후 캔버스에 그리는 로직
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();
    // 이후 캔버스 캡처 로직을 추가
  } catch (err) {
    alert("카메라 권한이 필요합니다.");
  }
};

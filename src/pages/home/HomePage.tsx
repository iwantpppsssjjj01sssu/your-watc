import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomePage.css";

import i1Img from "../../asset/img/i1.png";
import e1Img from "../../asset/img/e1.png"; // 3D Blue Sweater
import j1Img from "../../asset/img/j1.png"; // 3D Laundry Basket on Stool
import k1Img from "../../asset/img/k1.png"; // 3D Smart Phone Illustration
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

import riderJinwooImg from "../../asset/img/rider_jinwoo.png";

import a1Img from "../../asset/img/a1.png";
import b1Img from "../../asset/img/b1.png";
import c1Img from "../../asset/img/c1.png";
import d1Img from "../../asset/img/d1.png";
import p1Img from "../../asset/img/p1.png";
import q1Img from "../../asset/img/q1.png";

import { BottomNav } from "../../components/BottomNav";

// ── 커뮤니티 카드 정의 ──
const COMMUNITY_CARDS = [
  {
    key: "community",
    theme: "blue",
    label: "왓씨 세탁 커뮤니티",
    title1: "세탁 경험을 빠르게 공유하고",
    title2: "솔루션을 찾아보세요.",
    tags: ["#옷관리팁", "#얼룩제거", "#세탁노하우"],
  },
  {
    key: "tips",
    theme: "mint",
    label: "세탁 노하우",
    title1: "내 옷을 더 오래,",
    title2: "더 예쁘게 관리하는 법",
    tags: ["#울소재", "#손세탁", "#드라이"],
  },
  {
    key: "popular",
    theme: "purple",
    label: "이번 주 인기 토픽",
    title1: "가장 많이 공유된",
    title2: "세탁 이야기 모아보기",
    tags: ["#주간인기", "#베스트팁", "#추천글"],
  },
] as const;


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
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [allReviewsTag, setAllReviewsTag] = useState<string>("전체");
  const [showCommunityDetail, setShowCommunityDetail] = useState<string | null>(null);

  // 커뮤니티 캐러셀 드래그 refs
  const communityTrackRef = useRef<HTMLDivElement>(null);
  const communityXRef = useRef<number>(0);
  const communityDraggingRef = useRef<boolean>(false);
  const communityDragStartRef = useRef<{ x: number; tx: number }>({ x: 0, tx: 0 });
  const communityClickBlockRef = useRef<boolean>(false);
  const [writeReviewStars, setWriteReviewStars] = useState<number>(0);
  const [writeReviewText, setWriteReviewText] = useState<string>("");
  const [writeReviewSubmitted, setWriteReviewSubmitted] = useState<boolean>(false);

  // --- Profile Edit Modal States (Interactive Dialog Form) ---
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [selectedTempImg, setSelectedTempImg] = useState<string>(i1Img);

  // --- Gift Modal States (Point & Coupon Gift flow) ---
  const [showGiftModal, setShowGiftModal] = useState<boolean>(false);
  const [giftType, setGiftType] = useState<"point" | "coupon">("point");
  const [userPoints, setUserPoints] = useState<number>(3000); // Default 3,000P
  const [userCoupons, setUserCoupons] = useState<number>(2); // Default 2 coupons
  const [giftAmount, setGiftAmount] = useState<string>("1000"); // Point gift amount
  const [giftCouponCount, setGiftCouponCount] = useState<number>(1); // Coupon gift count
  const [giftRecipient, setGiftRecipient] = useState<string>("");
  const [giftMethod, setGiftMethod] = useState<"kakao" | "watc" | null>(null);
  const [showKakaoSim, setShowKakaoSim] = useState<boolean>(false);
  const [showWatcSim, setShowWatcSim] = useState<boolean>(false);
  const [receivedGiftCount, setReceivedGiftCount] = useState<number>(0);
  const [showReceiveSuccess, setShowReceiveSuccess] = useState<boolean>(false);

  const handleGiftReceive = () => {
    setReceivedGiftCount((prev) => prev + 1);
    setShowReceiveSuccess(true);
    setTimeout(() => {
      setShowReceiveSuccess(false);
      setShowGiftModal(false);
      setGiftMethod(null);
      setGiftRecipient("");
    }, 2000);
  };

  // --- Point Detail & Mini Game States ---
  const [showPointDetail, setShowPointDetail] = useState<boolean>(false);
  const [showPricingDetail, setShowPricingDetail] = useState<boolean>(false);
  const [pricingTab, setPricingTab] = useState<"clothing" | "shoes" | "bedding" | "extra">("clothing");
  const [showActiveOrderDetail, setShowActiveOrderDetail] = useState<boolean>(false);
  const [showLaundryHistory, setShowLaundryHistory] = useState<boolean>(false);
  const [showUsageGuide, setShowUsageGuide] = useState<boolean>(false);
  const usageGuideScrollRef = useRef<HTMLDivElement>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<null | {
    date: string; category: string; desc: string;
    status: string; statusColor: string; price: string;
  }>(null);
  const [totalScore, setTotalScore] = useState<number>(800);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameTimeLeft, setGameTimeLeft] = useState<number>(15);
  const [gameEarned, setGameEarned] = useState<number>(0);
  const [gameDone, setGameDone] = useState<boolean>(false);
  const [bubbleStates, setBubbleStates] = useState<boolean[]>(Array(9).fill(false));

  // --- Circular Progress Stage States ---
  const [circleProgress, setCircleProgress] = useState<number>(0);
  const [typewriterFinished] = useState<boolean>(true);

  const [profileName, setProfileName] = useState<string>("세나");
  const [profilePhone, setProfilePhone] = useState<string>("010-9876-5432");
  const [profileAddress, setProfileAddress] = useState<string>(
    "서울특별시 서초구 반포동 왓씨타워 410호",
  );
  const [currentProfileImg, setCurrentProfileImg] = useState<string>(i1Img);
  const profileImgInputRef = useRef<HTMLInputElement>(null);
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
  const [showReserveConfirm, setShowReserveConfirm] = useState<boolean>(false);
  const [showOrderReceived, setShowOrderReceived] = useState<boolean>(false);
  const [reserveFrom, setReserveFrom] = useState<string | null>(null); // 어디서 왔는지 추적
  const [showAiGuideDetail, setShowAiGuideDetail] = useState<boolean>(false);
  const [simulatingScan, setSimulatingScan] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<boolean>(false);
  const [selectedScanPreset, setSelectedScanPreset] = useState<string>("shirt");
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  const [aiAnalysisError, setAiAnalysisError] = useState<boolean>(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [selectedLaundryType, setSelectedLaundryType] =
    useState<string>("일반 빨래"); // "일반 빨래" | "관리 의류" | "이불/리빙/기타"
  const [selectedLaundryOptions, setSelectedLaundryOptions] =
    useState<string[]>(["일반"]);
  const [selectedScent, setSelectedScent] = useState<string>("무향");
  const [reserveAddress, setReserveAddress] = useState<string>(
    "서울특별시 서초구 반포동 왓씨타워 410호",
  );
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [deliveryType, setDeliveryType] = useState<string>("새벽배송"); // "새벽배송" | "일반배송"

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [visibleSections, setVisibleSections] = useState<boolean[]>(
    Array(7).fill(false),
  );
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(1);
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
  const [showGpsDetail, setShowGpsDetail] = useState(false);
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
      }, 8000);
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
    const from = params.get("from");
    if (
      requestedTab === "home" ||
      requestedTab === "reserve" ||
      requestedTab === "delivery" ||
      requestedTab === "care" ||
      requestedTab === "mypage"
    ) {
      setActiveTab(requestedTab);
      if (from) setReserveFrom(from);
    }
  }, [location.search]);

  // 모든 탭 이동 및 페이지 전환 시 최상단 스크롤 리셋
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeTab, location.pathname, location.search]);

  useEffect(() => {
    if (activeTab === "home") {
      setVisibleSections(Array(7).fill(false));
      setHasScrolled(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "home") return;

    const handleScroll = () => {
      if (window.scrollY > 5 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((prev) => {
          const next = [...prev];
          entries.forEach((entry) => {
            const index = Number(
              entry.target.getAttribute("data-section-index"),
            );
            if (entry.isIntersecting && !next[index]) {
              if (index < 2 || hasScrolled) {
                next[index] = true;
              }
            }
          });
          return next;
        });
      },
      { threshold: 0.1 },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab, hasScrolled]);



  // --- 이용방법 오버레이 열릴 때 내부 스크롤 최상단 리셋 ---
  useEffect(() => {
    if (showUsageGuide && usageGuideScrollRef.current) {
      usageGuideScrollRef.current.scrollTop = 0;
    }
  }, [showUsageGuide]);

  // --- 커뮤니티 캐러셀 자동 스크롤 (RAF) ---
  useEffect(() => {
    if (activeTab !== "home") return;
    const CARD_SET_WIDTH = 810; // 3장 × (258px + 12px gap) = 810px
    const SPEED = 0.45;
    let raf: number;
    const tick = () => {
      if (!communityDraggingRef.current) {
        communityXRef.current -= SPEED;
        if (communityXRef.current <= -CARD_SET_WIDTH) {
          communityXRef.current += CARD_SET_WIDTH;
        }
        if (communityTrackRef.current) {
          communityTrackRef.current.style.transform = `translateX(${communityXRef.current}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeTab]);

  // --- Two-stage Circular & Numerical progress animation effect ---
  useEffect(() => {
    if (activeTab === "home") {
      if (!typewriterFinished) {
        setProgressPercent(1);
        setCircleProgress(0);
        return;
      }

      setProgressPercent(1);
      setCircleProgress(0);

      const endNum = 66;
      const duration = 1200; // 숫자 + 링 동시 1.2초
      const startTime = performance.now();
      let animationFrameId: number;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setProgressPercent(Math.floor(1 + (endNum - 1) * eased));
        setCircleProgress(eased * endNum);

        if (t < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setProgressPercent(endNum);
          setCircleProgress(endNum);
        }
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [activeTab, typewriterFinished]);

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setCapturedPhotoUrl(previewUrl);
    setSimulatingScan(true);
    setScanResult(false);
    setScanProgress(0);
    setAiAnalysisResult(null);
    setAiAnalysisError(false);

    // base64로 변환 → AI API 전송
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;

      // 진행률 애니메이션 (API 응답 전까지 0→85% 천천히 진행)
      let prog = 0;
      const progressInterval = window.setInterval(() => {
        prog += prog < 60 ? 3 : prog < 80 ? 1 : 0.3;
        setScanProgress(Math.min(Math.round(prog), 85));
      }, 120);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content:
                  "첨부된 의류 사진을 분석해주세요. 다음 항목을 순서대로 알려주세요:\n1. 소재 추정 (육안 및 색상 기준)\n2. 권장 세탁 온도\n3. 건조 방법\n4. 주의사항\n5. 추천 왓씨 케어 코스",
                attachments: [
                  {
                    type: file.type || "image/jpeg",
                    dataUrl,
                    name: file.name || "clothing.jpg",
                    size: file.size,
                  },
                ],
              },
            ],
          }),
        });

        clearInterval(progressInterval);

        if (res.ok) {
          const data = await res.json();
          const text: string =
            data.answer || data.message?.content || "";
          setAiAnalysisResult(text.trim());
        } else {
          setAiAnalysisError(true);
        }
      } catch {
        clearInterval(progressInterval);
        setAiAnalysisError(true);
      }

      setScanProgress(100);
      setTimeout(() => {
        setSimulatingScan(false);
        setScanResult(true);
        triggerToast("✨ AI 의류 소재 분석이 완료되었습니다!");
      }, 400);
    };
    reader.readAsDataURL(file);
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
    } else if (actionName === "60초 세탁 신청" || actionName === "예약하기") {
      setActiveTab("reserve");
      setShowReserveDetail(true);
      triggerToast("✨ 60초 신속 세탁 예약을 시작합니다!");
    } else if (actionName === "AI 세탁 가이드") {
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
      setPricingTab("clothing");
      setShowPricingDetail(true);
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
        img: rvShirtsImg,
        tags: ["실크블라우스", "드라이클리닝"],
      },
      {
        stars: "★★★★★",
        user: "패션피플",
        date: "26.05.10",
        body: `버버리 트렌치코트 오염이 심해서 걱정했는데 얼룩덜룩한 국물 때까지 깨끗하게 제거되고 스팀 서비스로 핏까지 완벽하게 잡아줬어요!`,
        img: rvOuterImg,
        tags: ["명품케어", "트렌치코트"],
      },
      {
        stars: "★★★★★",
        user: "데일리웨어",
        date: "26.05.08",
        body: `기본 슬랙스 바지 주름이 매번 칼처럼 잡혀서 옵니다. 출근할 때 매번 다림질 안 해도 돼서 아침 출근 준비 시간이 10분이나 단축되었어요.`,
        img: rvShirtsImg,
        tags: ["바지주름", "다림질"],
      },
      {
        stars: "★★★★★",
        user: "니트마니아",
        date: "26.05.03",
        body: `캐시미어 가디건 세탁 후 줄어들거나 털 뭉침 없이 보송보송하게 배송되었어요. 니트 전용 중성 세제로 부드럽게 세탁해주시는 게 느껴지네요.`,
        img: rvOuterImg,
        tags: ["캐시미어니트", "중성세제"],
      },
      {
        stars: "★★★★★",
        user: "정장핏",
        date: "26.04.28",
        body: `중요한 미팅이 있어서 서둘러 수트를 드라이클리닝 맡겼는데, 지정된 시간에 정확히 오고 포장도 습기 방지 커버로 정성스럽게 싸여서 왔어요.`,
        img: rvOuterImg,
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
        img: rvShoesImg,
        tags: ["런닝화", "흙먼지제거"],
      },
      {
        stars: "★★★★★",
        user: "힐러버",
        date: "26.05.14",
        body: `세탁하기 까다로운 고급 스웨이드 로퍼를 맡겼는데 결이 다 상하지 않고 자연스럽게 스웨이드 질감을 살려서 클리닝해 주셨네요. 진정한 장인입니다.`,
        img: rvShoesImg,
        tags: ["스웨이드로퍼", "질감복원"],
      },
      {
        stars: "★★★★★",
        user: "등산매니아",
        date: "26.05.09",
        body: `등산 다니면서 끈적한 송진 가루와 흙으로 엉망이 된 등산화 방수 기능 손상 없이 프리미엄 클리닝 완료!`,
        img: rvShoesImg,
        tags: ["아웃도어화", "방수보존"],
      },
      {
        stars: "★★★★★",
        user: "가죽구두",
        date: "26.05.05",
        body: `신사용 가죽 구두를 맡겼더니 세탁 후 가죽 영양 크림 코팅까지 섬세하게 발라서 보내주셨습니다. 반짝반짝 광택이 예술이에요.`,
        img: rvShoesImg,
        tags: ["정장구두", "영양코팅"],
      },
      {
        stars: "★★★★★",
        user: "캔버스매니아",
        date: "26.04.30",
        body: `하얀색 캔버스 단화에 커피를 쏟아서 버려야 하나 고민했는데, 얼룩 자국 하나 남기지 않고 말끔하게 표백 세탁해 주셨습니다.`,
        img: rvShoesImg,
        tags: ["캔버스화", "얼룩제거"],
      },
      {
        stars: "★★★★★",
        user: "키즈맘",
        date: "26.04.25",
        body: `아이들이 놀이터에서 흙모래를 잔뜩 묻혀 온 아동 운동화들 한꺼번에 보냈는데, 신발 안쪽 깊은 곳까지 멸균 소독 살균이 잘 되어 냄새가 싹 사라졌습니다.`,
        img: rvShoesImg,
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
        img: rvBeddingImg,
        tags: ["극세사이불", "고온살균"],
      },
      {
        stars: "★★★★★",
        user: "신혼부부",
        date: "26.05.11",
        body: `호텔식 올 화이트 침구 세트를 클리닝 맡겼더니 눈부실 정도로 하얗고 뽀송하게 다림질되어 배송받았습니다.`,
        img: rvBeddingImg,
        tags: ["호텔식침구", "오성급화이트"],
      },
      {
        stars: "★★★★★",
        user: "베개베개",
        date: "26.05.07",
        body: `기능성 라텍스 및 솜 베개 커버와 솜 자체를 세탁 건조했는데 솜 뭉침이 1도 없고 땀 냄새와 노란 찌든 오염이 마술처럼 지워졌습니다.`,
        img: rvBeddingImg,
        tags: ["기능성베개", "땀오염표백"],
      },
      {
        stars: "★★★★★",
        user: "토퍼매니아",
        date: "26.05.04",
        body: `메모리폼 침대 토퍼 겉 커버 세탁을 신청했는데, 안감 얼룩까지 꼼꼼히 체크해 주시고 중성 세제로 정성껏 세탁되어 왔네요.`,
        img: rvBeddingImg,
        tags: ["토퍼커버", "중성케어"],
      },
      {
        stars: "★★★★★",
        user: "효도빨래",
        date: "26.04.29",
        body: `부모님 댁에 있는 묵직한 전통 솜 한실 이불을 대행 수거해서 맡겼는데 묵은 냄새를 완벽 탈취해주시고 원형 보존하여 세탁해 주셨습니다.`,
        img: o1Img,
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
        img: rvShirtsImg,
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
        img: rvBagImg,
        tags: ["볼캡스팀", "땀얼룩제거"],
      },
      {
        stars: "★★★★★",
        user: "가죽벨트",
        date: "26.05.12",
        body: `고급 소가죽 클래식 벨트의 테두리 유약(기리메)이 벗겨지고 갈라져서 슬펐는데 가죽 케어 전문 옵션으로 깔끔하게 메우고 검은색 오염까지 싹 지워주셨습니다.`,
        img: rvBagImg,
        tags: ["가죽벨트", "복원케어"],
      },
      {
        stars: "★★★★★",
        user: "실크스카프",
        date: "26.05.09",
        body: `에르메스 실크 스카프의 얇은 섬유 한 결 한 결을 우아하게 살려서 단 하나도 미어짐 없이 다림질 성형 코팅되어 배송받았습니다. 실크 케어는 여기가 명가입니다.`,
        img: rvBagImg,
        tags: ["실크스카프", "명품스카프"],
      },
      {
        stars: "★★★★★",
        user: "지갑컬렉터",
        date: "26.05.05",
        body: `손때와 기름 오염이 심하던 베이지색 가죽 지갑 클리닝을 맡겼는데, 염색 코팅 복원을 한 듯 아주 선명하고 산뜻한 본래의 스킨 컬러가 다시 나왔습니다.`,
        img: rvBagImg,
        tags: ["가죽지갑", "지갑클리닝"],
      },
      {
        stars: "★★★★★",
        user: "넥타이핏",
        date: "26.04.29",
        body: `매일 매는 양복 실크 넥타이들의 구겨진 매듭 부위 스팀 프레싱 가공으로 아주 납작하고 단정하게 정렬되었습니다. 직장인 가성비 만족도가 최고입니다.`,
        img: rvBagImg,
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

  const isReserveLanding =
    activeTab === "reserve" && !showReserveDetail && !showAiGuideDetail;

  return (
    <div
      className="homepage_layout"
      style={{ width: "100%", minHeight: "100dvh", backgroundColor: "#ffffff" }}
    >
      <div
        className="home_container"
        style={
          isReserveLanding
            ? {
                height:
                  "calc(100dvh - 96px - env(safe-area-inset-bottom, 0px))",
                minHeight: "0",
                overflow: "hidden",
                paddingBottom: "20px",
              }
            : undefined
        }
      >
        {/* ===================================================== */}
        {/* 예약 접수 현황 페이지                                 */}
        {/* ===================================================== */}
        {showOrderReceived && (
          <div className="active_order_overlay">
            <header className="active_order_header">
              <button type="button" className="premium_back_btn"
                onClick={() => { setShowOrderReceived(false); setShowReserveDetail(false); setActiveTab("home"); }}
                aria-label="홈으로">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <h1 className="active_order_header_title">수거·배송 현황</h1>
              <div style={{ width: 42 }} />
            </header>

            <div className="active_order_scroll">
              {/* 접수 히어로 */}
              <div style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", padding: "28px 20px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                  📋
                </div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.5px" }}>예약이 접수되었어요!</h2>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>수거 마스터가 곧 배정될 예정입니다</p>
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: 8 }}>예약번호 WTC-20260601-0527</span>
              </div>

              {/* 진행 단계 */}
              <div className="aod_section">
                <h3 className="aod_section_title">주문 진행 단계</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 16 }}>
                  {[
                    { emoji: "✅", step: "예약 접수",    desc: "예약이 정상 접수되었습니다",              status: "done",    time: "방금 전" },
                    { emoji: "🔍", step: "마스터 배정",  desc: "수거 담당 마스터가 배정됩니다",          status: "current", time: "곧 완료 예정" },
                    { emoji: "🚪", step: "수거 예정",    desc: `${reserveDate} ${reserveTime} 문 앞 방문`, status: "pending", time: reserveDate },
                    { emoji: "🧺", step: "세탁·케어",    desc: "전문 세탁 공장에서 정밀 케어",           status: "pending", time: "수거 당일" },
                    { emoji: "🏠", step: "배달 완료",    desc: "깨끗하게 포장하여 문 앞 배달",           status: "pending", time: "수거 다음날" },
                  ].map((s, i, arr) => (
                    <div key={i} style={{ display: "flex", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid #f8fafc" : "none" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, background: s.status === "done" ? "#dcfce7" : s.status === "current" ? "#eff6ff" : "#f8fafc" }}>
                        {s.emoji}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: s.status === "current" ? "#2563eb" : s.status === "done" ? "#16a34a" : "#94a3b8" }}>{s.step}</span>
                          <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{s.time}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 11.5, color: "#64748b", lineHeight: 1.45 }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 예약 요약 */}
              <div className="aod_section">
                <h3 className="aod_section_title">예약 요약</h3>
                <div className="aod_info_card">
                  {[
                    { label: "수거 예정일", val: `${reserveDate}  ${reserveTime}` },
                    { label: "세탁 종류",   val: selectedLaundryType },
                    { label: "세탁 옵션",   val: selectedLaundryOptions.join(", ") },
                    { label: "수거 장소",   val: collectionSpot },
                    { label: "배달 주소",   val: reserveAddress },
                  ].map((row, i) => (
                    <div key={i} className="aod_info_row">
                      <span className="aod_info_label">{row.label}</span>
                      <span className="aod_info_val">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 안내 박스 */}
              <div className="aod_section">
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 14, padding: "14px 16px" }}>
                  <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 800, color: "#15803d" }}>💡 알림 안내</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
                    마스터 배정 완료 시 앱 알림으로 안내드립니다.<br />
                    수거 당일 방문 30분 전 사전 알림이 발송됩니다.
                  </p>
                </div>
              </div>

              {/* 버튼 */}
              <div className="aod_actions">
                <button type="button" className="aod_btn_secondary"
                  onClick={() => { setShowOrderReceived(false); setShowReserveDetail(false); setActiveTab("home"); }}>
                  홈으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* 예약 완료 확인 오버레이                               */}
        {/* ===================================================== */}
        {showReserveConfirm && (
          <div className="reserve_confirm_overlay">
            {/* 상단 성공 히어로 */}
            <div className="rc_hero">
              <div className="rc_check_circle">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="rc_title">예약이 완료되었습니다!</h1>
              <p className="rc_sub">아래 예약 정보를 확인해주세요</p>
              <span className="rc_order_num">예약번호 WTC-20260601-{Math.floor(Math.random()*9000+1000)}</span>
            </div>

            <div className="rc_body">
              {/* 예약 정보 */}
              <div className="rc_section">
                <h3 className="rc_section_title">📋 예약 정보</h3>
                <div className="rc_info_card">
                  {[
                    { label: "예약 일시",   val: `2026.06.01  ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}` },
                    { label: "수거 예정",   val: `${reserveDate}  ${reserveTime}` },
                    { label: "세탁 종류",   val: selectedLaundryType },
                    { label: "세탁 옵션",   val: selectedLaundryOptions.join(", ") },
                    { label: "수거 장소",   val: collectionSpot },
                    { label: "배달 주소",   val: reserveAddress },
                  ].map((row, i) => (
                    <div key={i} className="rc_info_row">
                      <span className="rc_info_label">{row.label}</span>
                      <span className="rc_info_val">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 배송 일정 */}
              <div className="rc_section">
                <h3 className="rc_section_title">📅 배송 일정 (예상)</h3>
                <div className="rc_timeline">
                  {[
                    { dot: "pickup",  emoji: "🚪", step: "수거",   date: `${reserveDate}`, time: reserveTime,     desc: "담당 마스터가 문 앞에서 수거" },
                    { dot: "wash",   emoji: "🧺", step: "세탁",   date: "수거 당일 내",  time: "팩토리 케어",   desc: "스마트 팩토리 전문 세탁 케어" },
                    { dot: "done",   emoji: "🏠", step: "배달",   date: "수거 다음날",   time: "오후 중",       desc: "세탁 완료 후 문 앞 안전 배달" },
                  ].map((s, i) => (
                    <div key={i} className="rc_timeline_item">
                      <div className={`rc_tl_dot rc_tl_dot--${s.dot}`}>{s.emoji}</div>
                      <div className="rc_tl_content">
                        <div className="rc_tl_top">
                          <span className="rc_tl_step">{s.step}</span>
                          <span className="rc_tl_date">{s.date} · {s.time}</span>
                        </div>
                        <p className="rc_tl_desc">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 담당 기사 */}
              <div className="rc_section">
                <h3 className="rc_section_title">👤 담당 마스터</h3>
                <div className="rc_rider_grid">
                  <div className="rc_rider_card">
                    <span className="rc_rider_role">수거 담당</span>
                    <img src={riderJinwooImg} alt="수거 기사" className="rc_rider_avatar" />
                    <span className="rc_rider_name">김진우 마스터</span>
                    <span className="rc_rider_rating">⭐ 4.98</span>
                  </div>
                  <div className="rc_rider_card">
                    <span className="rc_rider_role">배달 담당</span>
                    <img src={riderJinwooImg} alt="배달 기사" className="rc_rider_avatar" />
                    <span className="rc_rider_name">최윤서 마스터</span>
                    <span className="rc_rider_rating">⭐ 5.0</span>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="rc_actions">
                <button
                  type="button"
                  className="rc_btn_primary"
                  onClick={() => {
                    setShowReserveConfirm(false);
                    setShowReserveDetail(false);
                    setActiveTab("delivery");
                  }}
                >
                  수거·배송 현황 보기
                </button>
                <button
                  type="button"
                  className="rc_btn_secondary"
                  onClick={() => {
                    setShowReserveConfirm(false);
                    setShowReserveDetail(false);
                    setActiveTab("home");
                  }}
                >
                  홈으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* 리뷰 전체보기 상세 페이지 (고정 오버레이)            */}
        {/* ===================================================== */}
        {showAllReviews && (
          <div className="review_all_overlay">
            {/* 고정 헤더 */}
            <header className="review_all_header">
              <button
                type="button"
                className="premium_back_btn"
                onClick={() => setShowAllReviews(false)}
                aria-label="뒤로가기"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <h1 className="review_all_title">고객 리뷰</h1>
              <div style={{ width: 42 }} />
            </header>

            <div className="review_all_content">
              {/* 요약 통계 */}
              <div className="review_all_stats_box">
                <div className="review_stat_score_col">
                  <span className="review_stat_avg">5.0</span>
                  <span className="review_stat_outof">/ 5.0</span>
                </div>
                <div className="review_stat_detail_col">
                  <span className="review_stat_stars">★★★★★</span>
                  <span className="review_stat_count">
                    총 {Object.values(reviewsData).flat().length}개 리뷰
                  </span>
                  <div className="review_stat_bars">
                    {[5,4,3,2,1].map(n => (
                      <div key={n} className="review_bar_row">
                        <span className="review_bar_label">{n}점</span>
                        <div className="review_bar_track">
                          <div
                            className="review_bar_fill"
                            style={{ width: n === 5 ? "100%" : "0%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 카테고리 필터 */}
              <div className="review_all_tag_bar">
                {reviewTags.map((tag) => (
                  <button
                    key={tag}
                    className={`home_tag_pill ${allReviewsTag === tag ? "home_tag_pill--active" : ""}`}
                    onClick={() => setAllReviewsTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* 리뷰 목록 */}
              <div className="review_all_list">
                {getReviewsForTag(allReviewsTag).map((rv, idx) => (
                  <div key={`all-${rv.user}-${idx}`} className="review_all_card">
                    <div className="review_all_card_top">
                      <div className="review_all_user_row">
                        <span className="review_all_stars">{rv.stars}</span>
                        <span className="review_all_user">{rv.user}</span>
                      </div>
                      <span className="review_all_date">{rv.date}</span>
                    </div>
                    <p className="review_all_body">{rv.body}</p>
                    <img
                      src={rv.img}
                      alt={`${rv.user} 리뷰 이미지`}
                      className="review_all_img"
                    />
                    <div className="review_all_tags">
                      {rv.tags.map((t: string) => (
                        <span key={t} className="review_all_tag">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* 왓씨 이용방법 상세 오버레이                            */}
        {/* ===================================================== */}
        {showUsageGuide && (
          <div className="active_order_overlay" key="usage-guide-overlay">
            <header className="active_order_header">
              <button type="button" className="premium_back_btn" onClick={() => { setShowUsageGuide(false); window.scrollTo({ top: 0, behavior: "instant" }); }} aria-label="뒤로가기">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <h1 className="active_order_header_title">왓씨 이용방법</h1>
              <div style={{ width: 42 }} />
            </header>

            <div className="active_order_scroll" ref={usageGuideScrollRef}>
              {/* 히어로 */}
              <div style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", padding: "32px 20px 28px", textAlign: "center" }}>
                <p style={{ margin: "0 0 8px", fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>스마트 세탁 케어 서비스</p>
                <h2 style={{ margin: "0 0 12px", fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>왓씨(WatC)</h2>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>수거부터 배달까지 한 번에,<br/>문 앞에서 시작되는 프리미엄 세탁 경험</p>
              </div>

              {/* 이용 단계 */}
              <div className="aod_section">
                <h3 className="aod_section_title">이용 방법 (4단계)</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { step: "01", emoji: "📱", title: "앱에서 예약",       desc: "세탁 종류·옵션·수거 날짜를 선택하고 60초 만에 예약 완료" },
                    { step: "02", emoji: "🚪", title: "문 앞 수거",        desc: "담당 마스터가 지정 시간에 방문해 안심팩에 포장 후 수거" },
                    { step: "03", emoji: "🧺", title: "전문 세탁 케어",    desc: "소재별 전용 세제·온도·코스로 스마트 팩토리에서 정밀 케어" },
                    { step: "04", emoji: "🏠", title: "문 앞 배달",        desc: "세탁 완료 후 깔끔히 포장해 문 앞으로 안전하게 배달" },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "16px 16px" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 22 }}>{s.emoji}</span>
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color: "#2563eb", background: "#eff6ff", padding: "2px 7px", borderRadius: 6 }}>STEP {s.step}</span>
                          <span style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>{s.title}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 12.5, color: "#64748b", lineHeight: 1.55 }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 서비스 특징 */}
              <div className="aod_section">
                <h3 className="aod_section_title">왓씨만의 특징</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { emoji: "🌿", title: "친환경 세제",   desc: "자연 유래 성분만 사용" },
                    { emoji: "🔬", title: "AI 소재 분석",  desc: "사진 찍으면 최적 코스 추천" },
                    { emoji: "📡", title: "실시간 GPS",     desc: "수거·배달 경로 실시간 확인" },
                    { emoji: "🛡️", title: "안심 보장",     desc: "분실·손상 시 100% 보상" },
                    { emoji: "⚡", title: "당일 배달",      desc: "급행 신청 시 당일 완료" },
                    { emoji: "♻️", title: "포인트 적립",    desc: "이용마다 왓씨 포인트 적립" },
                  ].map((f, i) => (
                    <div key={i} style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 14, padding: "14px 12px", textAlign: "center" }}>
                      <span style={{ fontSize: 26 }}>{f.emoji}</span>
                      <p style={{ margin: "8px 0 4px", fontSize: 12.5, fontWeight: 800, color: "#1e293b" }}>{f.title}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#64748b", lineHeight: 1.4 }}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 요금 안내 */}
              <div className="aod_section">
                <h3 className="aod_section_title">요금 안내</h3>
                <div className="aod_info_card">
                  {[
                    { label: "일반 빨래",  val: "19,000원~" },
                    { label: "관리 의류",  val: "25,000원~" },
                    { label: "침구류",     val: "30,000원~" },
                    { label: "수거·배달비", val: "2,900원 (3만원↑ 무료)" },
                    { label: "급행 서비스", val: "+30% 추가" },
                  ].map((row, i) => (
                    <div key={i} className="aod_info_row">
                      <span className="aod_info_label">{row.label}</span>
                      <span className="aod_info_val">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="aod_section">
                <h3 className="aod_section_title">자주 묻는 질문</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { q: "수거 가능한 시간대는?",          a: "오전 7시 ~ 오후 10시 사이 원하는 시간대를 선택할 수 있어요." },
                    { q: "세탁 완료까지 얼마나 걸리나요?", a: "기본 당일 ~ 익일 배달. 급행 신청 시 동일 날 배달 가능해요." },
                    { q: "의류가 손상되면 어떻게 되나요?", a: "전액 보상 제도를 운영합니다. 고객센터로 연락해 주세요." },
                    { q: "최소 주문 금액이 있나요?",        a: "최소 주문 금액은 없으나, 수거·배달비 2,900원이 부과됩니다." },
                  ].map((faq, i) => (
                    <div key={i} style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 14, padding: "14px 16px" }}>
                      <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 800, color: "#0f172a" }}>Q. {faq.q}</p>
                      <p style={{ margin: 0, fontSize: 12.5, color: "#475569", lineHeight: 1.55 }}>A. {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="aod_actions">
                <button type="button" className="aod_btn_primary" onClick={() => { setShowUsageGuide(false); handleAction("예약하기"); }}>
                  지금 바로 예약하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* 세탁 이력 항목 상세 오버레이                           */}
        {/* ===================================================== */}
        {selectedHistoryItem && (() => {
          const item = selectedHistoryItem;
          const detailMap: Record<string, {
            items: { name: string; type: string; qty: number; price: string }[];
            rider: string; riderRating: string;
            pickup: string; deliver: string;
            options: string[]; note: string;
          }> = {
            "05.27": {
              items: [
                { name: "구스다운 아웃도어 패딩", type: "드라이클리닝", qty: 1, price: "22,900원" },
              ],
              rider: "김진우 마스터", riderRating: "4.98",
              pickup: "05.27  02:10", deliver: "05.27  10:30",
              options: ["살균", "고급향 마감"],
              note: "털 뭉침 없이 완벽히 복원",
            },
            "05.14": {
              items: [
                { name: "생활빨래 안심팩", type: "기본 세탁", qty: 1, price: "19,000원" },
              ],
              rider: "최윤서 마스터", riderRating: "5.0",
              pickup: "05.14  09:00", deliver: "05.14  18:40",
              options: ["친환경"],
              note: "청결 완료, 향기 매우 좋음",
            },
            "04.29": {
              items: [
                { name: "캐시미어 가디건", type: "울/캐시미어 케어", qty: 1, price: "15,900원" },
                { name: "울 코트",        type: "드라이클리닝",    qty: 1, price: "15,900원" },
              ],
              rider: "박진우 마스터", riderRating: "4.8",
              pickup: "04.29  10:00", deliver: "04.30  09:20",
              options: ["울/캐시미어", "보풀 제거"],
              note: "섬세 소재 전용 세탁 완료",
            },
            "04.11": {
              items: [
                { name: "구스다운 이불 (더블)", type: "구스다운 케어", qty: 1, price: "59,900원" },
              ],
              rider: "김진우 마스터", riderRating: "4.98",
              pickup: "04.11  08:30", deliver: "04.11  19:00",
              options: ["살균", "다운 복원"],
              note: "다운 볼륨 완전 복원, 냄새 제거",
            },
            "03.28": {
              items: [
                { name: "스웨이드 로퍼", type: "프리미엄 신발 클리닝", qty: 1, price: "24,900원" },
                { name: "운동화",        type: "일반 신발 클리닝",    qty: 1, price: "9,900원" },
              ],
              rider: "최윤서 마스터", riderRating: "5.0",
              pickup: "03.28  11:00", deliver: "03.28  20:30",
              options: ["질감 복원"],
              note: "스웨이드 결 살아있음",
            },
            "03.12": {
              items: [
                { name: "생활빨래 안심팩", type: "기본 세탁", qty: 1, price: "19,000원" },
              ],
              rider: "박진우 마스터", riderRating: "4.8",
              pickup: "03.12  09:30", deliver: "03.12  18:00",
              options: ["일반"],
              note: "정상 완료",
            },
          };
          const detail = detailMap[item.date] ?? {
            items: [{ name: item.desc, type: item.category, qty: 1, price: item.price }],
            rider: "담당 마스터", riderRating: "4.9",
            pickup: item.date, deliver: item.date,
            options: ["기본"], note: "-",
          };
          const totalPrice = detail.items.reduce((sum, it) => {
            return sum + parseInt(it.price.replace(/[^0-9]/g, ""));
          }, 0);

          return (
            <div className="active_order_overlay">
              <header className="active_order_header">
                <button type="button" className="premium_back_btn" onClick={() => setSelectedHistoryItem(null)} aria-label="뒤로가기">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h1 className="active_order_header_title">세탁 이력 상세</h1>
                <div style={{ width: 42 }} />
              </header>

              <div className="active_order_scroll">
                {/* 상태 히어로 */}
                <div style={{
                  background: item.statusColor === "#2563eb"
                    ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                    : "linear-gradient(135deg, #16a34a, #15803d)",
                  padding: "22px 20px", color: "#fff",
                }}>
                  <p style={{ margin: "0 0 4px", fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{item.date} · {item.category}</p>
                  <p style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 900, letterSpacing: "-0.5px" }}>{item.desc}</p>
                  <span style={{ fontSize: 11, fontWeight: 800, background: "rgba(255,255,255,0.2)", padding: "3px 10px", borderRadius: 8 }}>{item.status}</span>
                </div>

                {/* 세탁 품목 */}
                <div className="aod_section">
                  <h3 className="aod_section_title">세탁 품목</h3>
                  <div className="aod_items_list">
                    {detail.items.map((it, i) => (
                      <div key={i} className="aod_item_row">
                        <div className="aod_item_info">
                          <p className="aod_item_name">{it.name}</p>
                          <p className="aod_item_type">{it.type} · {it.qty}벌</p>
                        </div>
                        <span className="aod_item_price">{it.price}</span>
                      </div>
                    ))}
                    <div className="aod_item_total_row">
                      <span>총 결제금액</span>
                      <strong>{totalPrice.toLocaleString()}원</strong>
                    </div>
                  </div>
                </div>

                {/* 선택 옵션 */}
                <div className="aod_section">
                  <h3 className="aod_section_title">세탁 옵션</h3>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {detail.options.map(opt => (
                      <span key={opt} style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", background: "#eff6ff", padding: "5px 12px", borderRadius: 8 }}>{opt}</span>
                    ))}
                  </div>
                </div>

                {/* 수거·배달 정보 */}
                <div className="aod_section">
                  <h3 className="aod_section_title">수거 · 배달 정보</h3>
                  <div className="aod_info_card">
                    {[
                      { label: "수거 시각",  val: detail.pickup },
                      { label: "배달 시각",  val: detail.deliver },
                      { label: "담당 라이더", val: `${detail.rider} ⭐ ${detail.riderRating}` },
                      { label: "배달지",     val: "반포동 왓씨타워 410호" },
                    ].map((row, i) => (
                      <div key={i} className="aod_info_row">
                        <span className="aod_info_label">{row.label}</span>
                        <span className="aod_info_val">{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 세탁소 메모 */}
                <div className="aod_section">
                  <h3 className="aod_section_title">세탁소 완료 메모</h3>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: "14px 16px" }}>
                    <p style={{ margin: 0, fontSize: 13, color: "#334155", lineHeight: 1.6 }}>💬 {detail.note}</p>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="aod_actions">
                  <button type="button" className="aod_btn_secondary" onClick={() => triggerToast("재세탁 신청을 접수합니다.")}>재세탁 신청하기</button>
                  <button type="button" className="aod_btn_secondary" onClick={() => { setShowLaundryHistory(true); setSelectedHistoryItem(null); }}>목록으로 돌아가기</button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ===================================================== */}
        {/* 세탁 이력 관리 상세 오버레이                           */}
        {/* ===================================================== */}
        {showLaundryHistory && (
          <div className="active_order_overlay">
            <header className="active_order_header">
              <button type="button" className="premium_back_btn" onClick={() => setShowLaundryHistory(false)} aria-label="뒤로가기">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <h1 className="active_order_header_title">세탁 이력 관리</h1>
              <div style={{ width: 42 }} />
            </header>

            <div className="active_order_scroll">
              {/* 요약 통계 */}
              <div style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", padding: "22px 20px", display: "flex", gap: 20, alignItems: "center" }}>
                {[
                  { label: "누적 세탁 횟수", val: "24회" },
                  { label: "이번 달", val: "3회" },
                  { label: "등록 의류", val: `${registeredClothes.length}벌` },
                ].map((s, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <p style={{ margin: "0 0 4px", fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{s.label}</p>
                    <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#ffffff", letterSpacing: "-1px" }}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* 이력 목록 */}
              <div className="aod_section">
                <h3 className="aod_section_title">전체 이력</h3>
                <div className="aod_items_list">
                  {[
                    { date: "05.27", category: "아우터 · 가죽", desc: "구스다운 아웃도어 패딩 외 1벌", status: "배송출발", statusColor: "#2563eb", price: "22,900원" },
                    { date: "05.14", category: "일반 세탁",     desc: "안심 생활빨래 안심팩 1회",     status: "완료",    statusColor: "#16a34a", price: "19,000원" },
                    { date: "04.29", category: "관리 의류",     desc: "캐시미어 가디건, 울 코트",    status: "완료",    statusColor: "#16a34a", price: "31,800원" },
                    { date: "04.11", category: "침구류",        desc: "구스다운 이불 (더블)",        status: "완료",    statusColor: "#16a34a", price: "59,900원" },
                    { date: "03.28", category: "신발",          desc: "스웨이드 로퍼, 운동화",      status: "완료",    statusColor: "#16a34a", price: "34,800원" },
                    { date: "03.12", category: "일반 세탁",     desc: "안심 생활빨래 안심팩 1회",    status: "완료",    statusColor: "#16a34a", price: "19,000원" },
                  ].map((item, i) => (
                    <div key={i} className="aod_item_row" style={{ cursor: "pointer" }} onClick={() => setSelectedHistoryItem(item)}>
                      <div className="aod_item_info">
                        <p className="aod_item_name">{item.desc}</p>
                        <p className="aod_item_type">{item.date} · {item.category}</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: item.statusColor, background: item.statusColor === "#2563eb" ? "#eff6ff" : "#f0fdf4", padding: "2px 8px", borderRadius: 6 }}>{item.status}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 월별 통계 */}
              <div className="aod_section">
                <h3 className="aod_section_title">월별 이용 현황</h3>
                <div className="aod_info_card">
                  {[
                    { month: "5월", count: "3회", amount: "41,900원" },
                    { month: "4월", count: "2회", amount: "91,700원" },
                    { month: "3월", count: "2회", amount: "53,800원" },
                    { month: "2월", count: "1회", amount: "19,000원" },
                  ].map((m, i) => (
                    <div key={i} className="aod_info_row">
                      <span className="aod_info_label">{m.month}</span>
                      <span style={{ fontSize: 13, color: "#64748b" }}>{m.count}</span>
                      <span className="aod_info_val">{m.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* 진행 중인 주문 상세 오버레이                           */}
        {/* ===================================================== */}
        {showActiveOrderDetail && (
          <div className="active_order_overlay">
            <header className="active_order_header">
              <button type="button" className="premium_back_btn" onClick={() => setShowActiveOrderDetail(false)} aria-label="뒤로가기">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <h1 className="active_order_header_title">진행 중인 주문</h1>
              <div style={{ width: 42 }} />
            </header>

            <div className="active_order_scroll">
              {/* 주문 요약 히어로 */}
              <div className="aod_hero">
                <div className="aod_hero_left">
                  <span className="aod_hero_label">현재 진행 단계</span>
                  <p className="aod_hero_stage">🌀 건조 중</p>
                  <span className="aod_hero_order_num">WTC-20260527-8311</span>
                </div>
                <div className="aod_hero_right">
                  <div className="aod_hero_pct_ring_wrap">
                    <svg viewBox="0 0 64 64" className="aod_hero_ring">
                      <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" />
                      <circle cx="32" cy="32" r="26" fill="none" stroke="#ffffff" strokeWidth="6"
                        strokeDasharray="163.36" strokeDashoffset="81.68"
                        strokeLinecap="round" transform="rotate(-90 32 32)" />
                    </svg>
                    <span className="aod_hero_pct">50%</span>
                  </div>
                </div>
              </div>

              {/* 5단계 상세 타임라인 */}
              <div className="aod_section">
                <h3 className="aod_section_title">세탁 · 배송 진행 현황</h3>
                <div className="aod_timeline">
                  {[
                    { emoji: "📦", label: "수거 완료",  status: "done",    time: "05.27  02:30", desc: "안심팩 포장 후 세탁 공장 입고" },
                    { emoji: "🫧", label: "세탁 완료",  status: "done",    time: "05.27  08:15", desc: "저온 스팀 정밀 세탁 완료" },
                    { emoji: "🌀", label: "건조 중",    status: "current", time: null,           desc: "고온 열풍 정밀 건조 진행 중 · 약 40분 소요" },
                    { emoji: "🔍", label: "검수 완료",  status: "pending", time: null,           desc: "전문 검수팀 품질 검사 예정" },
                    { emoji: "🚚", label: "배송 출발",  status: "pending", time: null,           desc: "배송 마스터 배정 및 문 앞 배달" },
                  ].map((step, i, arr) => (
                    <div key={i} className="aod_timeline_item">
                      <div className="aod_tl_track">
                        <div className={`aod_tl_dot aod_tl_dot--${step.status}`}>
                          {step.status === "done" && (
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="none">
                              <polyline points="3,8 6.5,11.5 13,4.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {step.status === "current" && <div className="aod_tl_dot_inner" />}
                        </div>
                        {i < arr.length - 1 && <div className={`aod_tl_line aod_tl_line--${step.status}`} />}
                      </div>
                      <div className={`aod_tl_card aod_tl_card--${step.status}`}>
                        <div className="aod_tl_card_top">
                          <span className="aod_tl_emoji">{step.emoji}</span>
                          <div className="aod_tl_info">
                            <div className="aod_tl_name_row">
                              <span className="aod_tl_name">{step.label}</span>
                              <span className={`aod_tl_badge aod_tl_badge--${step.status}`}>
                                {step.status === "done" ? "완료" : step.status === "current" ? "진행 중" : "대기"}
                              </span>
                            </div>
                            <p className="aod_tl_desc">{step.desc}</p>
                            {step.time && <span className="aod_tl_time">{step.time}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주문 품목 */}
              <div className="aod_section">
                <h3 className="aod_section_title">세탁 품목</h3>
                <div className="aod_items_list">
                  {[
                    { name: "아우터 코트", type: "드라이클리닝", qty: 1, price: "19,900원" },
                    { name: "드레스 셔츠", type: "기본 세탁",    qty: 2, price: "4,900원 × 2" },
                  ].map((item, i) => (
                    <div key={i} className="aod_item_row">
                      <div className="aod_item_info">
                        <p className="aod_item_name">{item.name}</p>
                        <p className="aod_item_type">{item.type} · {item.qty}벌</p>
                      </div>
                      <span className="aod_item_price">{item.price}</span>
                    </div>
                  ))}
                  <div className="aod_item_total_row">
                    <span>총 결제금액</span>
                    <strong>29,700원</strong>
                  </div>
                </div>
              </div>

              {/* 배송 정보 */}
              <div className="aod_section">
                <h3 className="aod_section_title">배송 정보</h3>
                <div className="aod_info_card">
                  {[
                    { label: "배달지",    val: "반포동 왓씨타워 410호" },
                    { label: "수거 방식", val: "문 앞 수거" },
                    { label: "도착 예정", val: "오늘 저녁 11시 (예정)" },
                    { label: "담당 라이더", val: "김진우 마스터 · ⭐ 4.98" },
                  ].map((row, i) => (
                    <div key={i} className="aod_info_row">
                      <span className="aod_info_label">{row.label}</span>
                      <span className="aod_info_val">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 하단 액션 버튼 */}
              <div className="aod_actions">
                <button type="button" className="aod_btn_primary" onClick={() => { setShowActiveOrderDetail(false); setActiveTab("delivery"); }}>
                  실시간 배송 현황 보기
                </button>
                <button type="button" className="aod_btn_secondary" onClick={() => triggerToast("고객센터로 연결합니다.")}>
                  문의하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* 세탁 종류별 요금표 오버레이                            */}
        {/* ===================================================== */}
        {showPricingDetail && (() => {
          type PricingTab = "clothing" | "shoes" | "bedding" | "extra";
          const tabs: { key: PricingTab; label: string; emoji: string }[] = [
            { key: "clothing", label: "의류",   emoji: "👔" },
            { key: "shoes",    label: "신발",   emoji: "👟" },
            { key: "bedding",  label: "침구류", emoji: "🛏️" },
            { key: "extra",    label: "추가요금", emoji: "➕" },
          ];

          const pricingData: Record<PricingTab, { columns: string[]; rows: (string | number)[][]; note?: string }> = {
            clothing: {
              columns: ["품목", "기본 세탁", "드라이클리닝", "스팀 케어"],
              rows: [
                ["셔츠 · 블라우스",  "4,900원",  "8,900원", "6,900원"],
                ["바지 · 슬랙스",    "5,900원",  "9,900원", "7,900원"],
                ["원피스 · 스커트",  "7,900원", "12,900원", "9,900원"],
                ["코트 · 자켓",     "12,900원", "19,900원","15,900원"],
                ["패딩 · 점퍼",     "14,900원", "22,900원","17,900원"],
                ["정장 상하의",     "19,900원", "29,900원","24,900원"],
                ["니트 · 스웨터",    "6,900원", "10,900원", "8,900원"],
                ["실크 · 린넨",      "8,900원", "14,900원","11,900원"],
              ],
            },
            shoes: {
              columns: ["품목", "일반 클리닝", "프리미엄", "명품 케어"],
              rows: [
                ["운동화 · 스니커즈", "12,900원", "19,900원", "—"],
                ["구두 · 로퍼",       "15,900원", "24,900원", "34,900원"],
                ["부츠",             "18,900원", "28,900원", "39,900원"],
                ["슬리퍼 · 샌들",     "9,900원", "14,900원", "—"],
                ["아동화",            "8,900원", "12,900원", "—"],
              ],
              note: "* 명품 케어는 Hermès · Chanel · Louis Vuitton 등 하이엔드 브랜드에 한해 적용됩니다.",
            },
            bedding: {
              columns: ["품목", "일반 세탁", "구스다운", "살균 케어"],
              rows: [
                ["이불 (싱글)",       "19,900원", "39,900원", "29,900원"],
                ["이불 (더블)",       "29,900원", "59,900원", "39,900원"],
                ["이불 (킹)",         "39,900원", "79,900원", "49,900원"],
                ["베개 (1개)",         "9,900원", "15,900원", "12,900원"],
                ["토퍼 커버",         "24,900원",        "—", "34,900원"],
                ["러그 · 카펫 (소)", "29,900원",        "—", "39,900원"],
              ],
              note: "* 이불류 무게에 따라 추가 요금이 부과될 수 있습니다. (기준 무게: 싱글 3kg / 더블 5kg)",
            },
            extra: {
              columns: ["항목", "적용 기준", "추가 금액"],
              rows: [
                ["급행 배송",         "당일 처리",          "+30%"],
                ["보풀 제거",         "개당 적용",        "+2,000원"],
                ["얼룩 전처리",       "부위당 적용",      "+3,000원"],
                ["스팀 다림질",       "개당 적용",        "+2,500원"],
                ["고급 향 마감",      "선택 적용",        "+2,000원"],
                ["안심팩 포장",       "기본 제공",              "무료"],
                ["무게 초과",         "1kg 당",          "+3,000원"],
                ["명품 라벨 검수",    "브랜드 확인 시",    "+5,000원"],
              ],
            },
          };

          const current = pricingData[pricingTab];

          return (
            <div className="pricing_overlay" key="pricing-overlay">
              <header className="pricing_header">
                <button type="button" className="premium_back_btn" onClick={() => setShowPricingDetail(false)} aria-label="뒤로가기">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h1 className="pricing_header_title">세탁 종류별 요금</h1>
                <div style={{ width: 42 }} />
              </header>

              {/* 탭 */}
              <div className="pricing_tab_bar">
                {tabs.map(t => (
                  <button
                    key={t.key}
                    type="button"
                    className={`pricing_tab_btn ${pricingTab === t.key ? "pricing_tab_btn--active" : ""}`}
                    onClick={() => setPricingTab(t.key)}
                  >
                    <span>{t.emoji}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="pricing_scroll" key={pricingTab}>
                {/* 안내 배너 */}
                <div className="pricing_banner">
                  <span className="pricing_banner_emoji">
                    {tabs.find(t => t.key === pricingTab)?.emoji}
                  </span>
                  <div>
                    <p className="pricing_banner_title">{tabs.find(t => t.key === pricingTab)?.label} 세탁 요금</p>
                    <p className="pricing_banner_sub">VAT 포함 · 수거배송비 별도 (기본 2,900원)</p>
                  </div>
                </div>

                {/* 요금 테이블 */}
                <div className="pricing_table_wrap">
                  <table className="pricing_table">
                    <thead>
                      <tr>
                        {current.columns.map((col, ci) => (
                          <th key={ci} className={ci === 0 ? "pricing_th pricing_th--item" : "pricing_th"}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {current.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? "pricing_tr" : "pricing_tr pricing_tr--alt"}>
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={
                                ci === 0
                                  ? "pricing_td pricing_td--label"
                                  : cell === "—"
                                    ? "pricing_td pricing_td--na"
                                    : cell === "무료"
                                      ? "pricing_td pricing_td--free"
                                      : "pricing_td pricing_td--price"
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 주석 */}
                {current.note && (
                  <p className="pricing_note">{current.note}</p>
                )}

                {/* 하단 안내 */}
                <div className="pricing_footer_box">
                  <p className="pricing_footer_title">💡 요금 안내</p>
                  <ul className="pricing_footer_list">
                    <li>모든 가격은 <strong>VAT 포함</strong> 기준입니다.</li>
                    <li>수거·배송비 <strong>2,900원</strong>이 별도 청구됩니다.</li>
                    <li>3만원 이상 주문 시 <strong>배송비 무료</strong>입니다.</li>
                    <li>실제 요금은 소재·상태에 따라 변동될 수 있습니다.</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ===================================================== */}
        {/* ===================================================== */}
        {/* 포인트 상세 & 미니게임 오버레이                        */}
        {/* ===================================================== */}
        {showPointDetail && (() => {
          const pointHistory = [
            { label: "세탁 서비스 이용 완료", date: "2026.05.27", amount: 100, icon: "🧺" },
            { label: "고객 리뷰 작성", date: "2026.05.25", amount: 50, icon: "✍️" },
            { label: "친구 초대 성공", date: "2026.05.20", amount: 200, icon: "👥" },
            { label: "첫 이용 보너스", date: "2026.05.15", amount: 300, icon: "🎁" },
            { label: "AI 소재 분석 이용", date: "2026.05.10", amount: 50, icon: "🔬" },
            { label: "출석 체크 (7일 연속)", date: "2026.05.07", amount: 100, icon: "📅" },
          ];
          const earnMethods = [
            { label: "세탁 서비스 이용", reward: "+100P", icon: "🧺", desc: "매 이용 시마다 적립" },
            { label: "리뷰 작성", reward: "+50P", icon: "✍️", desc: "이용 후 리뷰 남기기" },
            { label: "친구 초대", reward: "+200P", icon: "👥", desc: "링크로 친구 초대 성공 시" },
            { label: "AI 소재 분석", reward: "+30P", icon: "🔬", desc: "하루 1회 한정" },
            { label: "출석 체크", reward: "+10P", icon: "📅", desc: "매일 앱 방문 시" },
            { label: "버블 게임", reward: "+최대 90P", icon: "🫧", desc: "하루 1회 미니게임" },
          ];

          const startGame = () => {
            setGameActive(true);
            setGameEarned(0);
            setGameDone(false);
            setGameTimeLeft(15);
            // 버블 랜덤 표시
            const interval = window.setInterval(() => {
              setBubbleStates(() => Array(9).fill(null).map(() => Math.random() > 0.45));
            }, 700);
            // 타이머
            let t = 15;
            const countdown = window.setInterval(() => {
              t -= 1;
              setGameTimeLeft(t);
              if (t <= 0) {
                clearInterval(countdown);
                clearInterval(interval);
                setBubbleStates(Array(9).fill(false));
                setGameActive(false);
                setGameDone(true);
                setTotalScore(prev => prev + gameEarned);
              }
            }, 1000);
          };

          const popBubble = (idx: number) => {
            if (!gameActive || !bubbleStates[idx]) return;
            setBubbleStates(prev => { const n = [...prev]; n[idx] = false; return n; });
            setGameEarned(prev => prev + 10);
          };

          return (
            <div className="point_detail_overlay">
              {/* 헤더 */}
              <header className="point_detail_header">
                <button type="button" className="premium_back_btn" onClick={() => { setShowPointDetail(false); setGameActive(false); setGameDone(false); }} aria-label="뒤로가기">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h1 className="point_detail_title">왓씨 포인트</h1>
                <div style={{ width: 42 }} />
              </header>

              <div className="point_detail_scroll">
                {/* 현재 포인트 배지 */}
                <div className="point_hero_box">
                  <p className="point_hero_label">현재 보유 포인트</p>
                  <div className="point_hero_score">{totalScore.toLocaleString()}<span className="point_hero_unit">점</span></div>
                  <div className="point_hero_bar_track">
                    <div className="point_hero_bar_fill" style={{ width: `${Math.min((totalScore / 1000) * 100, 100)}%` }} />
                  </div>
                  <p className="point_hero_next">다음 등급까지 {Math.max(0, 1000 - totalScore)}점 남음 · 실버 → 골드</p>
                </div>

                {/* 적립 내역 */}
                <div className="point_section">
                  <h3 className="point_section_title">적립 내역</h3>
                  <div className="point_history_list">
                    {pointHistory.map((h, i) => (
                      <div key={i} className="point_history_item">
                        <span className="point_history_icon">{h.icon}</span>
                        <div className="point_history_info">
                          <p className="point_history_label">{h.label}</p>
                          <p className="point_history_date">{h.date}</p>
                        </div>
                        <span className="point_history_amount">+{h.amount}P</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 포인트 획득 방법 */}
                <div className="point_section">
                  <h3 className="point_section_title">포인트 더 모으기</h3>
                  <div className="point_earn_grid">
                    {earnMethods.map((m, i) => (
                      <div key={i} className="point_earn_card" onClick={() => triggerToast(`${m.label} 기능으로 이동합니다!`)}>
                        <span className="point_earn_icon">{m.icon}</span>
                        <p className="point_earn_label">{m.label}</p>
                        <p className="point_earn_desc">{m.desc}</p>
                        <span className="point_earn_reward">{m.reward}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 버블 팝 미니게임 */}
                <div className="point_section">
                  <h3 className="point_section_title">🫧 버블 팝 미니게임</h3>
                  <p className="point_game_desc">15초 안에 버블을 최대한 많이 터뜨리세요! 버블 1개 = 10P</p>

                  {gameDone ? (
                    <div className="point_game_result">
                      <p className="point_game_result_emoji">🎉</p>
                      <p className="point_game_result_score">+{gameEarned}P 획득!</p>
                      <p className="point_game_result_sub">총 {totalScore.toLocaleString()}점 보유 중</p>
                      <button className="point_game_replay_btn" onClick={startGame}>다시 하기</button>
                    </div>
                  ) : gameActive ? (
                    <div className="point_game_area">
                      <div className="point_game_hud">
                        <span className="point_game_timer">⏱ {gameTimeLeft}초</span>
                        <span className="point_game_earned">+{gameEarned}P</span>
                      </div>
                      <div className="point_bubble_grid">
                        {bubbleStates.map((visible, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`point_bubble ${visible ? "point_bubble--visible" : ""}`}
                            onClick={() => popBubble(idx)}
                          >
                            🫧
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button className="point_game_start_btn" onClick={startGame}>
                      게임 시작하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* 커뮤니티 상세 페이지 (고정 오버레이)                 */}
        {/* ===================================================== */}
        {showCommunityDetail && (() => {
          const card = COMMUNITY_CARDS.find(c => c.key === showCommunityDetail)!;
          const imgMap: Record<string, string> = { community: d1Img, tips: e1Img, popular: m1Img };
          const posts: Record<string, Array<{ title: string; author: string; date: string; excerpt: string; img: string; likes: number; comments: number; tags: string[] }>> = {
            community: [
              { title: "겨울 패딩 세탁 후 보풀 없애는 꿀팁 공유합니다!", author: "따뜻한봄날", date: "2026.05.28", excerpt: "드라이 후에 부드러운 브러시로 결대로 쓸어주면 보풀이 싹 사라집니다. 처음엔 반신반의했는데 진짜 효과 있어요.", img: b1Img, likes: 124, comments: 38, tags: ["#패딩세탁", "#보풀제거"] },
              { title: "아이 교복 흰 셔츠, 찌든 때 100% 제거 성공 후기", author: "깔끔맘", date: "2026.05.25", excerpt: "과탄산소다 + 베이킹소다 1:1 비율로 미지근한 물에 담가두고 2시간 후 세탁하면 새 셔츠처럼 됩니다!", img: a1Img, likes: 89, comments: 22, tags: ["#교복관리", "#흰셔츠"] },
              { title: "청바지 색 빠짐 없이 세탁하는 방법 정리", author: "데님러버", date: "2026.05.22", excerpt: "처음엔 소금물에 30분 담갔다가 세탁기 '울/섬세' 코스로. 뒤집어서 세탁하는 건 기본입니다.", img: q1Img, likes: 67, comments: 15, tags: ["#청바지", "#색빠짐방지"] },
              { title: "명품 가방 집에서 세탁하다 망친 후기...", author: "반성중", date: "2026.05.18", excerpt: "절대 집에서 물세탁 하지 마세요. 가죽 핸들 부분이 뒤틀렸어요. 왓씨 같은 전문 서비스에 맡기는 게 답입니다.", img: c1Img, likes: 201, comments: 76, tags: ["#명품케어", "#타산지석"] },
            ],
            tips: [
              { title: "울 소재 옷, 절대 드라이어 넣으면 안 되는 이유", author: "패션피플", date: "2026.05.27", excerpt: "울은 열과 마찰에 약해 드라이어 1번에 반 사이즈씩 줄어들 수 있어요. 반드시 자연 건조, 그늘에서!", img: l1Img, likes: 156, comments: 45, tags: ["#울소재", "#드라이어주의"] },
              { title: "세탁 표시 기호 완벽 해석 가이드 (저장해두세요)", author: "세탁마스터", date: "2026.05.24", excerpt: "△=표백가능, ○=드럼건조가능, 🅟=드라이클리닝. 이것만 알아도 세탁 실수 90% 줄일 수 있어요.", img: a1Img, likes: 203, comments: 89, tags: ["#세탁기호", "#세탁가이드"] },
              { title: "손세탁 vs 세탁기, 옷감별 최적 선택법", author: "옷지킴이", date: "2026.05.20", excerpt: "실크·캐시미어는 손세탁, 면·폴리에스터는 세탁기. 중간 소재는 세탁기 울코스가 정답입니다.", img: b1Img, likes: 94, comments: 31, tags: ["#손세탁", "#세탁기선택"] },
              { title: "세제 너무 많이 쓰면 오히려 독? 적정 사용량 공유", author: "환경지킴이", date: "2026.05.16", excerpt: "세제가 많으면 헹굼이 부족해 섬유에 잔류하고 피부 트러블을 유발합니다. 표준의 2/3만 써도 충분해요.", img: c1Img, likes: 77, comments: 19, tags: ["#세제량", "#친환경세탁"] },
            ],
            popular: [
              { title: "이번주 1등! 캐시미어 니트 세탁 완전 후기 🏆", author: "니트마니아", date: "2026.05.28", excerpt: "왓씨 캐시미어 전용 코스 써봤는데 줄어들거나 뭉침 없이 폭신폭신하게 돌아왔어요. 진짜 최고입니다!!", img: l1Img, likes: 312, comments: 102, tags: ["#캐시미어", "#주간1위"] },
              { title: "왓씨 이용 1년 후기 — 진짜 솔직하게 씁니다", author: "장기유저", date: "2026.05.26", excerpt: "처음엔 반신반의했는데 지금은 세탁소 완전 안 가요. 수거가 편리하고 품질도 꾸준히 좋습니다. 다만 가끔 배송이...", img: q1Img, likes: 289, comments: 95, tags: ["#왓씨후기", "#솔직리뷰"] },
              { title: "세탁소 vs 왓씨 가격 완전 비교분석 (표 있음)", author: "꼼꼼분석러", date: "2026.05.23", excerpt: "셔츠 기준 동네세탁소 4,000원 vs 왓씨 3,800원+수거배송 포함. 품질도 왓씨가 더 좋았습니다.", img: a1Img, likes: 178, comments: 67, tags: ["#가격비교", "#데이터분석"] },
              { title: "이불 세탁 완전 실패담... 집 세탁기로는 무리였어요", author: "실패의고수", date: "2026.05.19", excerpt: "구스다운 이불을 가정용 세탁기에 넣었더니 솜 뭉침이 심하게 생겼어요. 이건 진짜 전문 업체에 맡겨야 해요.", img: b1Img, likes: 145, comments: 53, tags: ["#이불세탁", "#실패후기"] },
            ],
          };
          const currentPosts = posts[showCommunityDetail] ?? [];
          return (
            <div className="community_detail_overlay">
              <header className="community_detail_header">
                <button type="button" className="premium_back_btn" onClick={() => setShowCommunityDetail(null)} aria-label="뒤로가기">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h1 className="community_detail_title">{card.label}</h1>
                <div style={{ width: 42 }} />
              </header>
              <div className="community_detail_scroll">
                {/* 카테고리 배너 */}
                <div className={`community_detail_banner home_community_banner--${card.theme}`}>
                  <div className="home_community_left">
                    <span className={`home_community_label home_community_label--${card.theme}`}>{card.label}</span>
                    <h4 className="home_community_title_1">{card.title1}</h4>
                    <h4 className="home_community_title_2">{card.title2}</h4>
                    <div className="home_review_tags_bottom">
                      {card.tags.map((t: string) => <span key={t} className={`home_review_bottom_tag home_review_bottom_tag--${card.theme}`}>{t}</span>)}
                    </div>
                  </div>
                  <div className="home_community_right">
                    <img src={imgMap[card.key]} alt={card.label} className="home_community_3d_img" />
                  </div>
                </div>
                {/* 게시글 목록 */}
                <div className="community_post_list">
                  {currentPosts.map((post, idx) => (
                    <div key={idx} className="community_post_item" onClick={() => triggerToast(`"${post.title}" 게시글로 이동합니다.`)}>
                      <img src={post.img} alt={post.title} className="community_post_thumb" />
                      <div className="community_post_body">
                        <p className="community_post_title">{post.title}</p>
                        <p className="community_post_meta">{post.author} · {post.date}</p>
                        <p className="community_post_excerpt">{post.excerpt}</p>
                        <div className="community_post_tags">
                          {post.tags.map(t => <span key={t} className="community_post_tag">{t}</span>)}
                        </div>
                        <div className="community_post_footer">
                          <span className="community_post_stat">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            {post.likes}
                          </span>
                          <span className="community_post_stat">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ---------------------------------------------------- */}
        {/* [1. HOME VIEW - First Photo Circular Progress Dashboard] */}
        {/* ---------------------------------------------------- */}
        {activeTab === "home" && (
          <>
            {/* 상단 타이틀 영역 */}
            <header
              ref={(el) => {
                sectionRefs.current[0] = el;
              }}
              data-section-index="0"
              className={`home_header home_fade_section stagger-0 ${
                visibleSections[0] ? "visible" : ""
              }`}
            >
              <h1 className="home_greeting_title">반가워요!</h1>
              <p className="home_subtitle_text">
                당신을 위한 스마트 케어, <span>왓씨</span>입니다.
              </p>
            </header>

            <div
              className={`homepage_delayed_sections ${typewriterFinished ? "sections_reveal" : "sections_hidden"}`}
            >
              {/* 중앙 세탁 진행 현황 카드 (66% 진행 중 원형 진행률) */}
              <section
                ref={(el) => {
                  sectionRefs.current[1] = el;
                }}
                data-section-index="1"
                className={`home_dashboard home_fade_section stagger-1 ${
                  visibleSections[1] ? "visible" : ""
                }`}
              >
                <div
                  className="home_summary_card"
                  onClick={() => handleAction("진행 상세 현황")}
                >
                  <h2 className="home_card_main_text">
                    세탁{" "}
                    <span className="blue_percent dynamic_count_active">
                      <span className="digit">{progressPercent}</span>
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
                          <feGaussianBlur
                            stdDeviation="1.5"
                            result="coloredBlur"
                          />
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
                        strokeDashoffset={439.8 * (1 - circleProgress / 100)}
                        strokeLinecap="round"
                        transform="rotate(-90 85 85)"
                      />
                      {/* Sparkle dots (3개의 작은 별) */}
                      <circle
                        cx="130"
                        cy="50"
                        r="2.5"
                        fill="#5EA2FF"
                        opacity="0.6"
                      />
                      <circle
                        cx="145"
                        cy="85"
                        r="1.8"
                        fill="#2F62F5"
                        opacity="0.5"
                      />
                      <circle
                        cx="60"
                        cy="140"
                        r="2"
                        fill="#5EA2FF"
                        opacity="0.55"
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
              <section
                ref={(el) => {
                  sectionRefs.current[2] = el;
                }}
                data-section-index="2"
                className={`home_columns_section home_fade_section ${!hasScrolled ? "stagger-2" : "stagger-scroll-2"} ${
                  visibleSections[2] ? "visible" : ""
                }`}
              >
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
                  onClick={() => setShowUsageGuide(true)}
                >
                  <div className="home_col_title_row">
                    <span className="home_col_title_large">왓씨</span>
                    <span className="home_col_title_large">이용방법</span>
                  </div>
                  <img
                    src={l1Img}
                    alt="왓씨 이용방법 이미지"
                    className="home_col_image home_col_image--ring"
                  />
                </div>
              </section>

              {/* 중간 서브 메뉴 카드 2단 배치 (가격표 & 세탁 종류 안내) */}
              <section
                ref={(el) => {
                  sectionRefs.current[3] = el;
                }}
                data-section-index="3"
                className={`home_sub_columns_section home_fade_section ${!hasScrolled ? "stagger-3" : "stagger-scroll-3"} ${
                  visibleSections[3] ? "visible" : ""
                }`}
              >
                {/* 가격표 카드 */}
                <div
                  className="home_info_card home_info_card--amber"
                  onClick={() => handleAction("가격표")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="home_info_card_text">
                    <span className="home_info_card_badge">PRICE</span>
                    <p className="home_info_card_title">가격표</p>
                    <p className="home_info_card_sub">합리적인 요금 확인</p>
                  </div>
                  <img src={p1Img} alt="가격표" className="home_info_card_img home_info_card_img--price" />
                </div>

                {/* 세탁 종류 안내 카드 */}
                <div
                  className="home_info_card home_info_card--teal"
                  onClick={() => handleAction("세탁 종류 안내")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="home_info_card_text">
                    <span className="home_info_card_badge">GUIDE</span>
                    <p className="home_info_card_title">세탁 종류<br />안내</p>
                    <p className="home_info_card_sub">의류별 케어 가이드</p>
                  </div>
                  {/* 3D 와이셔츠 SVG 일러스트 */}
                  {/* 3D 와이셔츠 SVG 일러스트 */}
                  <svg
                    className="home_info_card_img home_info_card_img--guide"
                    viewBox="0 0 100 130"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="shirtBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#dbeafe" />
                      </linearGradient>
                      <linearGradient id="shirtShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.3" />
                      </linearGradient>
                      <filter id="shirtSoft">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#1d4ed8" floodOpacity="0.18" />
                      </filter>
                    </defs>
                    {/* 몸통 — 더 길게 */}
                    <path d="M18 38 L18 122 L82 122 L82 38 L65 28 L50 34 L35 28 Z" fill="url(#shirtBody)" filter="url(#shirtSoft)" />
                    {/* 왼쪽 소매 — 길게 */}
                    <path d="M18 38 L2 28 L4 62 L18 65 Z" fill="#dbeafe" />
                    {/* 오른쪽 소매 — 길게 */}
                    <path d="M82 38 L98 28 L96 62 L82 65 Z" fill="#dbeafe" />
                    {/* 그림자 (왼쪽 패널) */}
                    <path d="M18 38 L18 122 L50 122 L50 34 Z" fill="url(#shirtShadow)" />
                    {/* 왼쪽 칼라 */}
                    <path d="M35 28 L50 34 L50 48 L38 36 Z" fill="#93c5fd" />
                    {/* 오른쪽 칼라 */}
                    <path d="M65 28 L50 34 L50 48 L62 36 Z" fill="#bfdbfe" />
                    {/* 칼라 테두리 */}
                    <path d="M35 28 L50 48 L65 28" fill="none" stroke="#60a5fa" strokeWidth="1" />
                    {/* 단추 4개 */}
                    <circle cx="50" cy="58" r="2" fill="#93c5fd" />
                    <circle cx="50" cy="70" r="2" fill="#93c5fd" />
                    <circle cx="50" cy="82" r="2" fill="#93c5fd" />
                    <circle cx="50" cy="94" r="2" fill="#93c5fd" />
                    {/* 버튼홀 선 */}
                    <line x1="50" y1="48" x2="50" y2="122" stroke="#93c5fd" strokeWidth="0.7" strokeDasharray="2 2" />
                    {/* 소매 커프스 왼쪽 */}
                    <rect x="3" y="58" width="7" height="6" rx="2" fill="#93c5fd" />
                    {/* 소매 커프스 오른쪽 */}
                    <rect x="90" y="58" width="7" height="6" rx="2" fill="#93c5fd" />
                    {/* 밑단 */}
                    <rect x="18" y="119" width="64" height="3" rx="1.5" fill="#93c5fd" opacity="0.5" />
                  </svg>
                </div>
              </section>

              {/* 하단 AI 세탁 가이드 배너 (Full-width) */}
              <section
                ref={(el) => {
                  sectionRefs.current[4] = el;
                }}
                data-section-index="4"
                className={`home_guide_full_section home_fade_section ${!hasScrolled ? "stagger-4" : "stagger-scroll-4"} ${
                  visibleSections[4] ? "visible" : ""
                }`}
              >
                <div
                  className="home_guide_banner"
                  onClick={() => handleAction("AI 세탁 가이드")}
                >
                  <div className="home_guide_left">
                    <img
                      src={k1Img}
                      alt="AI 세탁 가이드"
                      className="home_guide_k1_img"
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
              <section
                ref={(el) => {
                  sectionRefs.current[5] = el;
                }}
                data-section-index="5"
                className={`home_reviews_section home_fade_section ${!hasScrolled ? "stagger-5" : "stagger-scroll-5"} ${
                  visibleSections[5] ? "visible" : ""
                }`}
              >
                <div className="home_review_header_row">
                  <h3 className="home_review_title">실제 고객 리뷰</h3>
                  <button
                    className="home_review_more"
                    onClick={() => { setAllReviewsTag("전체"); setShowAllReviews(true); }}
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

                {/* 리뷰 작성 영역 */}
                <div className="home_write_review_box">
                  {writeReviewSubmitted ? (
                    <div className="home_write_review_success">
                      <span className="home_write_review_success_icon">✓</span>
                      <p className="home_write_review_success_text">
                        리뷰가 등록되었어요!<br />소중한 경험을 공유해주셔서 감사합니다.
                      </p>
                      <button
                        className="home_write_review_again_btn"
                        onClick={() => {
                          setWriteReviewSubmitted(false);
                          setWriteReviewStars(0);
                          setWriteReviewText("");
                        }}
                      >
                        다시 작성하기
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="home_write_review_header">
                        <span className="home_write_review_label">리뷰 남기기</span>
                        <p className="home_write_review_sub">세탁 서비스 경험을 공유해주세요</p>
                      </div>

                      {/* 별점 선택 */}
                      <div className="home_write_star_row">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`home_write_star_btn ${s <= writeReviewStars ? "home_write_star_btn--on" : ""}`}
                            onClick={() => setWriteReviewStars(s)}
                            aria-label={`별점 ${s}점`}
                          >
                            ★
                          </button>
                        ))}
                        {writeReviewStars > 0 && (
                          <span className="home_write_star_label">
                            {["", "별로예요", "아쉬워요", "보통이에요", "좋아요", "최고예요"][writeReviewStars]}
                          </span>
                        )}
                      </div>

                      {/* 텍스트 입력 */}
                      <textarea
                        className="home_write_review_textarea"
                        placeholder="어떤 점이 좋으셨나요? 솔직한 후기가 다른 고객에게 큰 도움이 됩니다."
                        value={writeReviewText}
                        onChange={(e) => setWriteReviewText(e.target.value)}
                        maxLength={300}
                        rows={3}
                      />
                      <div className="home_write_review_char_count">
                        {writeReviewText.length} / 300
                      </div>

                      {/* 등록 버튼 */}
                      <button
                        type="button"
                        className={`home_write_review_submit ${writeReviewStars > 0 && writeReviewText.trim().length > 0 ? "home_write_review_submit--active" : ""}`}
                        disabled={writeReviewStars === 0 || writeReviewText.trim().length === 0}
                        onClick={() => {
                          setWriteReviewSubmitted(true);
                          triggerToast("리뷰가 등록되었습니다!");
                        }}
                      >
                        리뷰 등록하기
                      </button>
                    </>
                  )}
                </div>
              </section>

              {/* 왓씨 세탁 커뮤니티 — 드래그 가능 가로 캐러셀 */}
              <section
                className="home_community_section"
                onMouseLeave={() => { communityDraggingRef.current = false; if (communityTrackRef.current) communityTrackRef.current.classList.remove("home_community_track--dragging"); }}
                onMouseUp={() => { communityDraggingRef.current = false; if (communityTrackRef.current) communityTrackRef.current.classList.remove("home_community_track--dragging"); }}
                onMouseMove={(e) => {
                  if (!communityDraggingRef.current) return;
                  const delta = e.clientX - communityDragStartRef.current.x;
                  if (Math.abs(delta) > 4) communityClickBlockRef.current = true;
                  let nx = communityDragStartRef.current.tx + delta;
                  const SET = 810;
                  if (nx > 0) nx -= SET;
                  if (nx < -SET) nx += SET;
                  communityXRef.current = nx;
                  if (communityTrackRef.current) communityTrackRef.current.style.transform = `translateX(${nx}px)`;
                }}
              >
                <div
                  ref={communityTrackRef}
                  className="home_community_track"
                  onMouseDown={(e) => {
                    communityDraggingRef.current = true;
                    communityClickBlockRef.current = false;
                    communityDragStartRef.current = { x: e.clientX, tx: communityXRef.current };
                    communityTrackRef.current?.classList.add("home_community_track--dragging");
                    e.preventDefault();
                  }}
                  onTouchStart={(e) => {
                    communityDraggingRef.current = true;
                    communityClickBlockRef.current = false;
                    communityDragStartRef.current = { x: e.touches[0].clientX, tx: communityXRef.current };
                  }}
                  onTouchMove={(e) => {
                    if (!communityDraggingRef.current) return;
                    const delta = e.touches[0].clientX - communityDragStartRef.current.x;
                    if (Math.abs(delta) > 4) communityClickBlockRef.current = true;
                    let nx = communityDragStartRef.current.tx + delta;
                    const SET = 810;
                    if (nx > 0) nx -= SET;
                    if (nx < -SET) nx += SET;
                    communityXRef.current = nx;
                    if (communityTrackRef.current) communityTrackRef.current.style.transform = `translateX(${nx}px)`;
                  }}
                  onTouchEnd={() => { communityDraggingRef.current = false; }}
                >
                  {([...COMMUNITY_CARDS, ...COMMUNITY_CARDS] as typeof COMMUNITY_CARDS[number][]).map((card, i) => {
                    const imgMap: Record<string, string> = { community: d1Img, tips: e1Img, popular: m1Img };
                    return (
                      <div
                        key={i}
                        className={`home_community_banner home_community_banner--${card.theme}`}
                        aria-hidden={i >= 3}
                        onClick={() => {
                          if (!communityClickBlockRef.current) {
                            setShowCommunityDetail(card.key);
                          }
                        }}
                      >
                        <div className="home_community_left">
                          <span className={`home_community_label home_community_label--${card.theme}`}>{card.label}</span>
                          <h4 className="home_community_title_1">{card.title1}</h4>
                          <h4 className="home_community_title_2">{card.title2}</h4>
                          <div className="home_review_tags_bottom">
                            {card.tags.map((tag: string) => (
                              <span key={tag} className={`home_review_bottom_tag home_review_bottom_tag--${card.theme}`}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="home_community_right">
                          <img src={imgMap[card.key]} alt={card.label} className="home_community_3d_img" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
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
                    className="premium_back_btn"
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
                  <div style={{ width: 42 }} />
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
                              <h3 className="laundry_type_title">
                                {item.title}
                              </h3>
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
                    <p className="reserve_section_sub">중복 선택 가능합니다</p>
                    <div className="laundry_option_grid laundry_option_grid--3col">
                      {[
                        { id: "일반",       emoji: "🧺", label: "일반",       surcharge: "+0원",     desc: "기본 세탁" },
                        { id: "친환경",     emoji: "🌿", label: "친환경",     surcharge: "+2,000원", desc: "자연 유래 세제" },
                        { id: "알러지 케어",emoji: "🤧", label: "알러지 케어",surcharge: "+3,000원", desc: "저자극 성분" },
                        { id: "살균",       emoji: "🦠", label: "살균",       surcharge: "+4,000원", desc: "99.9% 항균" },
                        { id: "울/캐시미어",emoji: "🧶", label: "울/캐시미어",surcharge: "+5,000원", desc: "섬세 소재 전용" },
                        { id: "프리미엄",   emoji: "✨", label: "프리미엄",   surcharge: "+6,000원", desc: "명품 케어 코스" },
                      ].map((opt) => {
                        const isOn = selectedLaundryOptions.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={`laundry_option_btn laundry_option_btn--rich ${isOn ? "active" : ""}`}
                            onClick={() =>
                              setSelectedLaundryOptions((prev) =>
                                isOn
                                  ? prev.filter((v) => v !== opt.id)
                                  : [...prev, opt.id]
                              )
                            }
                          >
                            {isOn && <span className="laundry_option_check">✓</span>}
                            <span className="laundry_option_emoji">{opt.emoji}</span>
                            <span className="laundry_option_label">{opt.label}</span>
                            <span className="laundry_option_desc">{opt.desc}</span>
                            <span className="laundry_option_surcharge">{opt.surcharge}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {/* 2-1. 향 선택 — 팔레트 리디자인 */}
                  {(() => {
                    const scents = [
                      { id: "무향",       emoji: "🌫️", label: "무향",       desc: "향 없음 · 기본",          surcharge: "+0원",     bg: "#f1f5f9", ring: "#94a3b8",  dot: "#64748b" },
                      { id: "라벤더",     emoji: "💜",  label: "라벤더",     desc: "편안한 플로럴",            surcharge: "+1,000원", bg: "#ede9fe", ring: "#7c3aed",  dot: "#6d28d9" },
                      { id: "시트러스",   emoji: "🍋",  label: "시트러스",   desc: "상큼한 과일향",            surcharge: "+1,000원", bg: "#fef9c3", ring: "#ca8a04",  dot: "#a16207" },
                      { id: "오션 브리즈",emoji: "🌊",  label: "오션",       desc: "청량한 바다향",            surcharge: "+1,000원", bg: "#e0f2fe", ring: "#0284c7",  dot: "#0369a1" },
                      { id: "로즈",       emoji: "🌹",  label: "로즈",       desc: "고급스러운 장미향",        surcharge: "+1,500원", bg: "#fce7f3", ring: "#db2777",  dot: "#be185d" },
                      { id: "머스크",     emoji: "🤍",  label: "머스크",     desc: "포근하고 따뜻한 향",       surcharge: "+1,500원", bg: "#fef3c7", ring: "#d97706",  dot: "#b45309" },
                    ];
                    const active = scents.find(s => s.id === selectedScent) ?? scents[0];
                    return (
                      <section className="reserve_detail_section">
                        <h2 className="reserve_section_title">향을 선택해주세요</h2>

                        {/* 선택된 향 프리뷰 카드 */}
                        <div className="scent_preview_card" style={{ background: `linear-gradient(135deg, ${active.bg}, white)`, borderColor: active.ring + "55" }}>
                          <span className="scent_preview_emoji">{active.emoji}</span>
                          <div className="scent_preview_info">
                            <span className="scent_preview_name">{active.label}</span>
                            <span className="scent_preview_desc">{active.desc}</span>
                          </div>
                          <span className="scent_preview_price" style={{ color: active.dot, background: active.bg }}>{active.surcharge}</span>
                        </div>

                        {/* 팔레트 그리드 */}
                        <div className="scent_palette_grid">
                          {scents.map((s) => {
                            const isOn = selectedScent === s.id;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                className={`scent_palette_btn ${isOn ? "scent_palette_btn--active" : ""}`}
                                onClick={() => setSelectedScent(s.id)}
                                style={isOn ? { boxShadow: `0 0 0 3px ${s.ring}`, background: s.bg } : {}}
                              >
                                <div
                                  className="scent_bubble"
                                  style={{ background: s.bg, border: `2px solid ${isOn ? s.ring : s.bg}` }}
                                >
                                  <span className="scent_bubble_emoji">{s.emoji}</span>
                                  {isOn && <span className="scent_bubble_check" style={{ background: s.dot }}>✓</span>}
                                </div>
                                <span className="scent_bubble_label" style={isOn ? { color: s.dot, fontWeight: 800 } : {}}>{s.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })()}

                  {/* 3. 배송 정보 */}
                  <section className="reserve_detail_section">
                    <h2 className="reserve_section_title">배송 정보</h2>
                    <div className="reserve_address_card">

                      {/* 주소 표시 / 편집 영역 */}
                      {isEditingAddress ? (
                        /* ── 편집 모드 ── */
                        <div className="address_edit_form">
                          <label className="address_edit_label">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            배달 주소
                          </label>
                          <input
                            type="text"
                            value={reserveAddress}
                            onChange={(e) => setReserveAddress(e.target.value)}
                            className="address_edit_input"
                            autoFocus
                            placeholder="도로명 주소를 입력해주세요"
                          />

                          <label className="address_edit_label" style={{ marginTop: 14 }}>수거 장소</label>
                          <div className="address_spot_grid">
                            {["공동현관 문 앞", "경비실 위탁", "택배함 보관", "직접 전달"].map((spot) => (
                              <button
                                key={spot}
                                type="button"
                                className={`address_spot_btn ${collectionSpot === spot ? "active" : ""}`}
                                onClick={() => setCollectionSpot(spot)}
                              >
                                {spot === "공동현관 문 앞" && "🚪 "}
                                {spot === "경비실 위탁"   && "🏢 "}
                                {spot === "택배함 보관"   && "📦 "}
                                {spot === "직접 전달"     && "🤝 "}
                                {spot}
                              </button>
                            ))}
                          </div>

                          <div className="address_edit_actions">
                            <button
                              type="button"
                              className="address_action_btn address_action_btn--cancel"
                              onClick={() => setIsEditingAddress(false)}
                            >취소</button>
                            <button
                              type="button"
                              className="address_action_btn address_action_btn--save"
                              onClick={() => setIsEditingAddress(false)}
                            >저장하기</button>
                          </div>
                        </div>
                      ) : (
                        /* ── 보기 모드 ── */
                        <div className="address_view_row">
                          <div className="address_view_left">
                            <div className="address_view_icon">
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                              </svg>
                            </div>
                            <div className="address_view_info">
                              <span className="address_view_main">{reserveAddress}</span>
                              <span className="address_view_spot">{collectionSpot}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="address_edit_trigger"
                            onClick={() => setIsEditingAddress(true)}
                          >
                            수정
                          </button>
                        </div>
                      )}

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
                          {selectedLaundryOptions.length === 0 || (selectedLaundryOptions.length === 1 && selectedLaundryOptions[0] === "일반") ? "없음" : selectedLaundryOptions.filter(v => v !== "일반").join(", ")}
                          {ironingOption !== "신청 안 함"
                            ? `, 다림질: ${ironingOption.split(" ")[0]}`
                            : ""}
                          )
                        </span>
                        <span className="price_val">
                          +
                          {(
                            ((selectedLaundryOptions.includes("친환경") ? 2000 : 0) + (selectedLaundryOptions.includes("알러지 케어") ? 3000 : 0) + (selectedLaundryOptions.includes("살균") ? 4000 : 0) + (selectedLaundryOptions.includes("울/캐시미어") ? 5000 : 0) + (selectedLaundryOptions.includes("프리미엄") ? 6000 : 0)) +
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
                            ((selectedLaundryOptions.includes("친환경") ? 2000 : 0) + (selectedLaundryOptions.includes("알러지 케어") ? 3000 : 0) + (selectedLaundryOptions.includes("살균") ? 4000 : 0) + (selectedLaundryOptions.includes("울/캐시미어") ? 5000 : 0) + (selectedLaundryOptions.includes("프리미엄") ? 6000 : 0)) +
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
                    onClick={() => setShowReserveConfirm(true)}
                  >
                    예약 완료
                  </button>
                </div>

                {/* 예약 완료 확인 오버레이 — 상세 페이지 위에 렌더링 */}
                {showReserveConfirm && (
                  <div className="reserve_confirm_overlay">
                    <div className="rc_hero">
                      <div className="rc_check_circle">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h1 className="rc_title">예약이 완료되었습니다!</h1>
                      <p className="rc_sub">아래 예약 정보를 확인해주세요</p>
                      <span className="rc_order_num">예약번호 WTC-20260601-{Math.floor(Math.random() * 9000 + 1000)}</span>
                    </div>
                    <div className="rc_body">
                      <div className="rc_section">
                        <h3 className="rc_section_title">📋 예약 정보</h3>
                        <div className="rc_info_card">
                          {[
                            { label: "예약 일시",  val: `2026.06.01  ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}` },
                            { label: "수거 예정",  val: `${reserveDate}  ${reserveTime}` },
                            { label: "세탁 종류",  val: selectedLaundryType },
                            { label: "세탁 옵션",  val: selectedLaundryOptions.join(", ") },
                            { label: "수거 장소",  val: collectionSpot },
                            { label: "배달 주소",  val: reserveAddress },
                          ].map((row, i) => (
                            <div key={i} className="rc_info_row">
                              <span className="rc_info_label">{row.label}</span>
                              <span className="rc_info_val">{row.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rc_section">
                        <h3 className="rc_section_title">📅 배송 일정 (예상)</h3>
                        <div className="rc_timeline">
                          {[
                            { dot: "pickup", emoji: "🚪", step: "수거", date: `${reserveDate}`, time: reserveTime, desc: "담당 마스터가 문 앞에서 수거" },
                            { dot: "wash",   emoji: "🧺", step: "세탁", date: "수거 당일 내",   time: "팩토리 케어", desc: "스마트 팩토리 전문 세탁 케어" },
                            { dot: "done",   emoji: "🏠", step: "배달", date: "수거 다음날",    time: "오후 중",     desc: "세탁 완료 후 문 앞 안전 배달" },
                          ].map((s, i) => (
                            <div key={i} className="rc_timeline_item">
                              <div className={`rc_tl_dot rc_tl_dot--${s.dot}`}>{s.emoji}</div>
                              <div className="rc_tl_content">
                                <div className="rc_tl_top">
                                  <span className="rc_tl_step">{s.step}</span>
                                  <span className="rc_tl_date">{s.date} · {s.time}</span>
                                </div>
                                <p className="rc_tl_desc">{s.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rc_section">
                        <h3 className="rc_section_title">👤 담당 마스터</h3>
                        <div className="rc_rider_grid">
                          <div className="rc_rider_card">
                            <span className="rc_rider_role">수거 담당</span>
                            <img src={riderJinwooImg} alt="수거 기사" className="rc_rider_avatar" />
                            <span className="rc_rider_name">김진우 마스터</span>
                            <span className="rc_rider_rating">⭐ 4.98</span>
                          </div>
                          <div className="rc_rider_card">
                            <span className="rc_rider_role">배달 담당</span>
                            <img src={riderJinwooImg} alt="배달 기사" className="rc_rider_avatar" />
                            <span className="rc_rider_name">최윤서 마스터</span>
                            <span className="rc_rider_rating">⭐ 5.0</span>
                          </div>
                        </div>
                      </div>
                      <div className="rc_actions">
                        <button type="button" className="rc_btn_primary"
                          onClick={() => { setShowReserveConfirm(false); setShowOrderReceived(true); }}>
                          수거·배송 현황 보기
                        </button>
                        <button type="button" className="rc_btn_secondary"
                          onClick={() => { setShowReserveConfirm(false); setShowReserveDetail(false); setActiveTab("home"); }}>
                          홈으로 돌아가기
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                    className="premium_back_btn"
                    onClick={() => {
                      setShowAiGuideDetail(false);
                      setActiveTab("home");
                      setScanResult(false);
                      setScanProgress(0);
                      setCapturedPhotoUrl(null);
                      setAiAnalysisResult(null);
                      setAiAnalysisError(false);
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
                  <div style={{ width: 42 }} />
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
                              {scanProgress < 30
                                ? "이미지 업로드 중..."
                                : scanProgress < 60
                                  ? "AI 소재 패턴 분석 중..."
                                  : scanProgress < 85
                                    ? "세탁 케어 코스 도출 중..."
                                    : "결과 생성 중..."}
                            </span>
                            <div className="scanning_progress_bar_bg">
                              <div
                                className="scanning_progress_fill"
                                style={{ width: `${scanProgress}%`, transition: "width 0.3s ease" }}
                              />
                            </div>
                            <span className="scanning_percentage">
                              {scanProgress}%
                            </span>
                          </div>
                        </div>
                      ) : scanResult ? (
                        <div className="scanner_result_overlay">
                          <div className={`result_badge ${aiAnalysisResult ? "result_badge--ai" : ""}`}>
                            {aiAnalysisResult ? "✦ AI 실제 분석 완료" : "분석 완료"}
                          </div>

                          {/* 촬영한 실제 사진 */}
                          {capturedPhotoUrl && (
                            <div className="scanner_captured_preview">
                              <img
                                src={capturedPhotoUrl}
                                alt="분석된 의류"
                                className="result_captured_img"
                              />
                            </div>
                          )}

                          {/* ── AI 실제 응답 ── */}
                          {aiAnalysisResult ? (
                            <div className="ai_real_result_box">
                              <p className="ai_real_result_label">
                                <span className="ai_real_result_badge">Gemini AI</span>
                                실제 분석 결과
                              </p>
                              <div className="ai_real_result_text">
                                {aiAnalysisResult.split("\n").map((line, i) =>
                                  line.trim() ? (
                                    <p key={i} className={line.startsWith("**") || /^\d+\./.test(line) ? "ai_result_section" : "ai_result_line"}>
                                      {line.replace(/\*\*/g, "")}
                                    </p>
                                  ) : <br key={i} />
                                )}
                              </div>
                            </div>
                          ) : (
                            /* ── 폴백: 시뮬레이션 결과 ── */
                            <>
                              <h4 className="result_cloth_name">
                                {capturedPhotoUrl
                                  ? "🔍 의류 성분 분석 결과"
                                  : selectedScanPreset === "shirt"
                                    ? "👔 100% 면 화이트 드레스 셔츠"
                                    : selectedScanPreset === "coat"
                                      ? "🧥 캐시미어 혼방 가을 코트"
                                      : "🛏️ 거위털 극세사 솜이불"}
                              </h4>
                              {aiAnalysisError && (
                                <p className="ai_fallback_notice">
                                  ※ AI 서버 미연결 — 기본 분석 결과입니다
                                </p>
                              )}
                              <div className="result_specs">
                                <div className="spec_row"><span>소재 판정</span><strong>천연 섬유 혼합 감지</strong></div>
                                <div className="spec_row"><span>권장 온도</span><strong>30°C 미온수 마일드</strong></div>
                                <div className="spec_row"><span>건조 방식</span><strong>단독 저온 텀블러 회전</strong></div>
                                <div className="spec_row"><span>추천 코스</span><strong className="blue_bold">왓씨 안심 에코 런드리</strong></div>
                              </div>
                            </>
                          )}

                          <button
                            type="button"
                            className="scanner_reset_btn"
                            onClick={() => {
                              setScanResult(false);
                              setScanProgress(0);
                              setCapturedPhotoUrl(null);
                              setAiAnalysisResult(null);
                              setAiAnalysisError(false);
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
                          셔터를 눌러 사진 촬영 → AI 즉시 분석
                        </span>
                      </div>
                    )}
                  </section>
                </div>
              </div>
            ) : (
              <>
                {/* 이전 페이지 뒤로가기 버튼 (mypage 상세에서 진입 시) */}
                {reserveFrom && (
                  <div style={{ padding: "12px 20px 0", background: "#ffffff" }}>
                    <button
                      type="button"
                      className="premium_back_btn"
                      onClick={() => {
                        navigate(`/mypage/detail/${reserveFrom}`);
                        setReserveFrom(null);
                      }}
                      aria-label="이전 페이지로"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                  </div>
                )}

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
                className="premium_back_btn"
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
              <div style={{ width: 42 }} />
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
                    <span className="gps_section_badge">
                      GPS LIVE CONNECTED
                    </span>
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
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="50%"
                          stopColor="#60a5fa"
                          stopOpacity="1"
                        />
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

                {/* Accuracy check footer + 상세보기 토글 */}
                <div
                  className="gps_accuracy_info_footer gps_accuracy_info_footer--clickable"
                  onClick={() => setShowGpsDetail((v) => !v)}
                  role="button"
                  tabIndex={0}
                >
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
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      marginLeft: "auto",
                      transition: "transform 0.3s ease",
                      transform: showGpsDetail ? "rotate(180deg)" : "rotate(0deg)",
                      flexShrink: 0,
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {/* 상세 정보 드로어 */}
                {showGpsDetail && (
                  <div className="gps_detail_drawer">
                    {/* 라이더 정보 */}
                    <div className="gps_detail_section">
                      <p className="gps_detail_label">담당 라이더</p>
                      <div className="gps_rider_row">
                        <img
                          src={riderJinwooImg}
                          alt="라이더 진우"
                          className="gps_rider_avatar"
                        />
                        <div className="gps_rider_info">
                          <strong className="gps_rider_name">김진우 마스터</strong>
                          <span className="gps_rider_meta">⭐ 4.98 · 배달 3,214건</span>
                          <span className="gps_rider_vehicle">왓씨 전용 오토바이 · 안심팩 장착</span>
                        </div>
                      </div>
                    </div>

                    <div className="gps_detail_divider" />

                    {/* 경로 상세 */}
                    <div className="gps_detail_section">
                      <p className="gps_detail_label">배송 경로</p>
                      <div className="gps_route_list">
                        <div className="gps_route_item">
                          <span className="gps_route_dot gps_route_dot--start" />
                          <div>
                            <p className="gps_route_place">세탁 공장</p>
                            <p className="gps_route_addr">서울 반포동 왓씨 케어센터</p>
                          </div>
                        </div>
                        <div className="gps_route_line" />
                        <div className="gps_route_item">
                          <span className="gps_route_dot gps_route_dot--current" />
                          <div>
                            <p className="gps_route_place">현재 위치</p>
                            <p className="gps_route_addr">서초대로 158 인근 이동 중</p>
                          </div>
                        </div>
                        <div className="gps_route_line" />
                        <div className="gps_route_item">
                          <span className="gps_route_dot gps_route_dot--end" />
                          <div>
                            <p className="gps_route_place">도착지 (우리집)</p>
                            <p className="gps_route_addr">반포동 왓씨타워 410호</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="gps_detail_divider" />

                    {/* 실시간 수치 */}
                    <div className="gps_detail_section">
                      <p className="gps_detail_label">실시간 현황</p>
                      <div className="gps_detail_stats">
                        <div className="gps_stat_item">
                          <span className="gps_stat_label">이동 속도</span>
                          <strong className="gps_stat_val">24 km/h</strong>
                        </div>
                        <div className="gps_stat_item">
                          <span className="gps_stat_label">위성 수신</span>
                          <strong className="gps_stat_val gps_stat_val--green">{satellites}개</strong>
                        </div>
                        <div className="gps_stat_item">
                          <span className="gps_stat_label">GPS 정확도</span>
                          <strong className="gps_stat_val gps_stat_val--green">±2m</strong>
                        </div>
                        <div className="gps_stat_item">
                          <span className="gps_stat_label">도착 예정</span>
                          <strong className="gps_stat_val gps_stat_val--blue">약 {etaMinutes}분</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                    <h4 className="deliv_step_title">
                      배송 출발 및 마스터 매칭
                    </h4>
                    <p className="deliv_step_desc">
                      소중한 세탁물을 안전하게 안심팩 포장하여 배송 마스터님이
                      문 앞 배달을 개시했습니다.
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
                    <h4 className="deliv_step_title">
                      스마트 팩토리 수거 입고
                    </h4>
                    <p className="deliv_step_desc">
                      왓씨 스마트 허브에 입고되어 정밀 오염 원단 분류 및 살균
                      준비 단계에 진입했습니다.
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
                  <span className="deliv_info_val">
                    문 앞 (비대면 안심 수거)
                  </span>
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
                className="premium_back_btn"
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
                  <label className="form_label">
                    소재 성분 선택 (중복 가능)
                  </label>
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

                {/* 착용 횟수 — 슬라이더로 직접 조절 */}
                <div className="cycle_slider_group">
                  <div className="slider_label_row">
                    <span>현재 착용 횟수</span>
                    <span className="font_bold highlight_blue">
                      {wearCount} / {targetCycle}회
                    </span>
                  </div>
                  {/* 진행 게이지 */}
                  <div className="cycle_progress_track">
                    <div
                      className={`cycle_progress_fill ${wearCount >= targetCycle ? "cycle_progress_fill--over" : ""}`}
                      style={{ width: `${Math.min((wearCount / targetCycle) * 100, 100)}%` }}
                    />
                    {[...Array(targetCycle - 1)].map((_, i) => (
                      <div
                        key={i}
                        className="cycle_progress_tick"
                        style={{ left: `${((i + 1) / targetCycle) * 100}%` }}
                      />
                    ))}
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.max(targetCycle, wearCount, 10)}
                    className="cycle_range_input"
                    value={wearCount}
                    onChange={(e) => setWearCount(parseInt(e.target.value))}
                  />
                  <div className="sim_btn_row">
                    <button
                      type="button"
                      className="sim_btn"
                      onClick={() => { if (wearCount > 0) setWearCount(wearCount - 1); }}
                    >
                      − 1회
                    </button>
                    <button
                      type="button"
                      className="sim_btn"
                      onClick={() => setWearCount(wearCount + 1)}
                    >
                      + 1회
                    </button>
                  </div>
                </div>

                {/* 세탁 주기 설정 */}
                <div className="cycle_target_row">
                  <span className="cycle_target_label">설정 세탁 주기</span>
                  <div className="cycle_target_controls">
                    <button
                      type="button"
                      className="cycle_target_btn"
                      onClick={() => setTargetCycle(Math.max(2, targetCycle - 1))}
                    >−</button>
                    <span className="cycle_target_value">{targetCycle}회마다 세탁</span>
                    <button
                      type="button"
                      className="cycle_target_btn"
                      onClick={() => setTargetCycle(Math.min(20, targetCycle + 1))}
                    >+</button>
                  </div>
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
              <div className="care_history_header_row">
                <h3 className="care_section_title" style={{ margin: 0 }}>세탁 이력 관리</h3>
                <button
                  type="button"
                  className="mypage_active_order_all_btn"
                  onClick={() => setShowLaundryHistory(true)}
                >
                  전체보기
                </button>
              </div>
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
                    onClick={() => setShowLaundryHistory(true)}
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
                    onClick={() => setShowLaundryHistory(true)}
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
              <button
                type="button"
                className="premium_back_btn"
                onClick={() => {
                  setActiveTab("home");
                  navigate("/home?tab=home");
                }}
                aria-label="홈으로 이동"
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
              <h1 className="mypage_title">{profileName}님의 WatC</h1>
              <div className="mypage_header_right_spacer" />
            </header>

            {/* 2열 배치 상단 카드 그리드 */}
            <section className="mypage_top_cards_grid">
              {/* 왼쪽 파란색 프로필 카드 [i1Img 이미지 탑재 및 +버튼 상세 설정 모달 연결] */}
              <div
                className="mypage_profile_blue_card"
                onClick={() => {
                  setSelectedTempImg(currentProfileImg);
                  setShowProfileModal(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="mypage_profile_img_wrapper">
                  <img
                    src={currentProfileImg}
                    alt="프로필 이미지"
                    className="mypage_profile_character"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div
                    className="mypage_profile_plus_btn"
                    aria-hidden="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowProfileModal(true);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 오른쪽 점수 카드 — 리디자인 */}
              <div
                className="mypage_score_card"
                onClick={() => setShowPointDetail(true)}
              >
                {/* 배경 장식 원 */}
                <div className="score_deco_circle score_deco_circle--1" />
                <div className="score_deco_circle score_deco_circle--2" />

                {/* 상단: 라벨 + 등급 배지 */}
                <div className="score_top_row">
                  <span className="score_top_label">왓씨 포인트</span>
                  <span className="score_tier_badge">🥈 실버</span>
                </div>

                {/* 메인 점수 */}
                <div className="score_main_row">
                  <span className="score_number">{totalScore.toLocaleString()}</span>
                  <span className="score_unit">점</span>
                </div>

                {/* 다음 등급 진행바 */}
                <div className="score_progress_wrap">
                  <div className="score_progress_track">
                    <div
                      className="score_progress_fill"
                      style={{ width: `${Math.min((totalScore / 1000) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="score_next_label">🏆 골드까지 {Math.max(0, 1000 - totalScore)}점</span>
                </div>
              </div>
            </section>

            {/* 지갑 포인트/쿠폰 보유 정보 카드 */}
            <section className="mypage_wallet_section">
              <div className="mypage_wallet_card">
                <div className="mypage_wallet_column">
                  <span className="mypage_wallet_label">포인트</span>
                  <span className="mypage_wallet_val">
                    {userPoints.toLocaleString()}P
                  </span>
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
                        setGiftType("point");
                        setGiftMethod(null);
                        setGiftRecipient("");
                        setGiftAmount("1000");
                        setShowGiftModal(true);
                      }}
                    >
                      선물
                    </button>
                  </div>
                </div>

                <div className="mypage_wallet_vertical_line" />

                <div className="mypage_wallet_column">
                  <span className="mypage_wallet_label">쿠폰</span>
                  <span className="mypage_wallet_val">{userCoupons}장</span>
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
                        setGiftType("coupon");
                        setGiftMethod(null);
                        setGiftRecipient("");
                        setGiftCouponCount(1);
                        setShowGiftModal(true);
                      }}
                    >
                      선물
                    </button>
                  </div>
                </div>

                {receivedGiftCount > 0 && (
                  <>
                    <div className="mypage_wallet_vertical_line" />
                    <div className="mypage_wallet_column">
                      <span className="mypage_wallet_label">받은 선물</span>
                      <span className="mypage_wallet_val received_gift_val">
                        {receivedGiftCount}개
                      </span>
                      <div className="mypage_wallet_btn_row">
                        <span className="received_gift_new_badge">NEW</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* 진행 중인 주문 카드 */}
            <section className="mypage_active_order_section">
              <div className="mypage_active_order_header_row">
                <h3 className="mypage_active_order_title">진행 중인 주문</h3>
                <button
                  type="button"
                  className="mypage_active_order_all_btn"
                  onClick={() => setShowActiveOrderDetail(true)}
                >
                  전체보기
                </button>
              </div>

              <div className="mypage_active_order_card" onClick={() => setActiveTab("delivery")} role="button" tabIndex={0}>
                {/* 주문번호 + 상태 배지 */}
                <div className="mao_top_row">
                  <span className="mao_order_num">주문번호 WTC-20260527-8311</span>
                  <span className="mao_status_badge mao_status_badge--drying">건조 중</span>
                </div>

                {/* 5단계 스테퍼 */}
                <div className="mao_stepper">
                  {[
                    { label: "수거", done: true },
                    { label: "세탁", done: true },
                    { label: "건조", done: false, current: true },
                    { label: "검수", done: false },
                    { label: "배송", done: false },
                  ].map((s, i, arr) => (
                    <div key={i} className="mao_stepper_item">
                      <div className={`mao_dot ${s.done ? "mao_dot--done" : s.current ? "mao_dot--current" : "mao_dot--pending"}`}>
                        {s.done && (
                          <svg viewBox="0 0 16 16" width="9" height="9" fill="none">
                            <polyline points="3,8 6.5,11.5 13,4.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className={`mao_step_label ${s.current ? "mao_step_label--current" : s.done ? "mao_step_label--done" : ""}`}>{s.label}</span>
                      {i < arr.length - 1 && (
                        <div className={`mao_connector ${s.done ? "mao_connector--done" : ""}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* 진행률 바 */}
                <div className="mao_progress_track">
                  <div className="mao_progress_fill" style={{ width: "50%" }} />
                </div>

                {/* 세탁 품목 + 예상 도착 */}
                <div className="mao_info_row">
                  <div className="mao_items">
                    <span className="mao_items_label">세탁 품목</span>
                    <span className="mao_items_val">아우터 코트 1건 · 셔츠 2건</span>
                  </div>
                  <div className="mao_eta">
                    <span className="mao_eta_label">도착 예정</span>
                    <span className="mao_eta_val">오늘 저녁 11시</span>
                  </div>
                </div>

                {/* CTA */}
                <button type="button" className="mao_cta_btn" onClick={(e) => { e.stopPropagation(); setActiveTab("delivery"); }}>
                  실시간 배송 현황 보기
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </section>

            {/* 마이페이지 세분화된 메뉴 리스트 */}
            <section className="mypage_menu_section">
              <div className="mypage_menu_group">
                <div
                  className="mypage_menu_item"
                  onClick={() => setShowActiveOrderDetail(true)}
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
                  onClick={() => { setPricingTab("clothing"); setShowPricingDetail(true); }}
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
      </div>

      {/* 공통 하단 네비게이션 탭 바 */}
      {!showReserveDetail && <BottomNav />}

      {/* [프로필 상세 설정 커스텀 대화형 모달 창] */}
      {showProfileModal && (
        <div
          className="profile_modal_overlay"
          style={styles.modalOverlay}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
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
            {/* 숨김 파일 input */}
            <input
              type="file"
              accept="image/*"
              ref={profileImgInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setSelectedTempImg(url);
                }
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexShrink: 0 }}>
              {/* 클릭 가능한 프로필 사진 */}
              <div
                onClick={() => profileImgInputRef.current?.click()}
                style={{ position: "relative", width: 52, height: 52, flexShrink: 0, cursor: "pointer" }}
              >
                <img
                  src={selectedTempImg}
                  alt="프로필 사진"
                  style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "rgba(0,0,0,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="profile_modal_title" style={{ ...styles.modalTitle, margin: 0 }}>
                  👤 프로필 상세 설정
                </h3>
                <p style={{ fontSize: 11, color: "#94a3b8", margin: "3px 0 0", fontWeight: 500 }}>사진을 눌러 변경할 수 있어요</p>
              </div>
            </div>

            {/* 입력 필드 스크롤 콘텐츠 영역 */}
            <div
              className="profile_modal_scroll_content"
              style={{
                flex: 1,
                overflowY: "auto",
                textAlign: "left",
                paddingRight: "4px",
                marginBottom: "12px",
                overscrollBehavior: "contain",
              }}
              onWheel={(e) => e.stopPropagation()}
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

              {/* 프로필 사진 수정하기 */}
              <div className="profile_form_group" style={{ ...styles.formGroup, marginBottom: 0 }}>
                <label className="profile_form_label" style={styles.formLabel}>
                  프로필 사진
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={selectedTempImg}
                    alt="현재 프로필"
                    style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0", flexShrink: 0 }}
                  />
                  <button
                    type="button"
                    onClick={() => profileImgInputRef.current?.click()}
                    style={{
                      flex: 1, height: 44, border: "1.5px dashed #cbd5e1",
                      borderRadius: 12, background: "#f8fafc",
                      color: "#2563eb", fontSize: 13, fontWeight: 700,
                      cursor: "pointer", fontFamily: "var(--font-pretendard)",
                    }}
                  >
                    📷 사진 변경하기
                  </button>
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
                  setCurrentProfileImg(selectedTempImg);
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
      <div className={`home_toast ${toastMessage ? "show" : ""}`} role="status">
        {toastMessage}
      </div>

      {/* 🎁 마이페이지 안심 포인트 & 쿠폰 선물하기 모달 (카카오톡 및 WatC 사내 송금) */}
      {showGiftModal && (
        <div
          className="gift_modal_overlay"
          onClick={() => setShowGiftModal(false)}
        >
          <div
            className="gift_modal_card animate_scale_up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 수령 완료 오버레이 */}
            {showReceiveSuccess && (
              <div className="receive_success_overlay">
                <div className="receive_success_icon">✓</div>
                <p className="receive_success_title">수령되었습니다!</p>
                <p className="receive_success_sub">받은 선물 {receivedGiftCount}개</p>
              </div>
            )}

            <div className="gift_modal_header">
              <h2>
                {giftType === "point"
                  ? "🎁 안심 포인트 선물"
                  : "🎁 안심 쿠폰 선물"}
              </h2>
              <button
                type="button"
                className="gift_modal_close_btn"
                onClick={() => setShowGiftModal(false)}
                aria-label="닫기"
              >
                &times;
              </button>
            </div>

            {!giftMethod ? (
              /* 단계 1: 선물 수단 선택 */
              <div className="gift_modal_body">
                <p className="gift_modal_desc">
                  나의 잔여 보유량:{" "}
                  <strong>
                    {giftType === "point"
                      ? `${userPoints.toLocaleString()}P`
                      : `${userCoupons}장`}
                  </strong>
                </p>
                <div className="gift_method_selector">
                  <button
                    type="button"
                    className="gift_method_btn gift_method_btn--kakao"
                    onClick={() => {
                      setGiftMethod("kakao");
                      setGiftRecipient("");
                    }}
                  >
                    <div className="gift_method_icon_circle kakao_bg">💬</div>
                    <div className="gift_method_text">
                      <span className="gift_method_title">
                        카카오톡 선물 링크 생성
                      </span>
                      <span className="gift_method_subtitle">
                        친구에게 카카오톡 대화방으로 선물 수령 카드를
                        발송합니다.
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="gift_method_btn gift_method_btn--watc"
                    onClick={() => {
                      setGiftMethod("watc");
                      setGiftRecipient("");
                    }}
                  >
                    <div className="gift_method_icon_circle watc_bg">💙</div>
                    <div className="gift_method_text">
                      <span className="gift_method_title">
                        WatC 회원에게 직접 양도
                      </span>
                      <span className="gift_method_subtitle">
                        연락처 혹은 WatC 회원 ID로 보유 재화를 즉시 송금합니다.
                      </span>
                    </div>
                  </button>

                  {/* 선물하기 안내 */}
                  <div className="gift_info_box">
                    <p className="gift_info_title">🎁 선물하기란?</p>
                    <ul className="gift_info_list">
                      <li>나의 <strong>안심 포인트</strong> 또는 <strong>세탁 쿠폰</strong>을 다른 사람에게 보낼 수 있는 기능입니다.</li>
                      <li><strong>카카오톡</strong>으로는 링크 형태의 선물 카드를 발송하며, 수령인이 링크를 열면 자동으로 적립됩니다.</li>
                      <li><strong>WatC 직접 양도</strong>는 상대방의 전화번호 또는 WatC 회원 ID를 입력하면 즉시 이전됩니다.</li>
                      <li>한 번 전송된 선물은 <strong>취소가 불가</strong>하니 수령인 정보를 꼭 확인해 주세요.</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : giftMethod === "kakao" ? (
              /* 단계 2: 카카오톡 선물 카드 세부 설정 */
              <div className="gift_modal_body">
                <h3 className="gift_section_subtitle">
                  카카오톡 선물 카드 데코레이션
                </h3>

                {giftType === "point" ? (
                  <div className="gift_input_group">
                    <label className="gift_label">보낼 안심 포인트</label>
                    <div className="gift_amount_preset">
                      {["500", "1000", "2000", "3000"].map((amt) => {
                        const numericAmt = parseInt(amt);
                        const disabled = userPoints < numericAmt;
                        return (
                          <button
                            key={amt}
                            type="button"
                            className={`gift_amt_btn ${giftAmount === amt ? "active" : ""}`}
                            disabled={disabled}
                            onClick={() => setGiftAmount(amt)}
                          >
                            {numericAmt.toLocaleString()}P
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="gift_input_group">
                    <div className="gift_coupon_label_row">
                      <label className="gift_label">보낼 쿠폰 수량</label>
                      <span className="gift_coupon_stock">보유 {userCoupons}장</span>
                    </div>
                    <div className="gift_coupon_stepper">
                      <button
                        type="button"
                        className="gift_coupon_step_btn"
                        onClick={() => setGiftCouponCount(c => Math.max(1, c - 1))}
                        disabled={giftCouponCount <= 1}
                      >−</button>
                      <input
                        type="number"
                        className="gift_coupon_step_input"
                        min={1}
                        max={userCoupons}
                        value={giftCouponCount}
                        onChange={(e) => {
                          const v = parseInt(e.target.value) || 1;
                          setGiftCouponCount(Math.min(Math.max(1, v), userCoupons));
                        }}
                      />
                      <button
                        type="button"
                        className="gift_coupon_step_btn"
                        onClick={() => setGiftCouponCount(c => Math.min(userCoupons, c + 1))}
                        disabled={giftCouponCount >= userCoupons}
                      >+</button>
                    </div>
                    {giftCouponCount > userCoupons && (
                      <p className="gift_coupon_warn">보유 수량({userCoupons}장)을 초과했습니다.</p>
                    )}
                  </div>
                )}

                <div className="gift_input_group">
                  <label className="gift_label">받는 친구 성함/닉네임</label>
                  <input
                    type="text"
                    className="gift_text_input"
                    placeholder="예: 지훈, 세나 (공란 시 '친구'로 표시)"
                    value={giftRecipient}
                    onChange={(e) => setGiftRecipient(e.target.value)}
                  />
                </div>

                {/* 카카오톡 공유 카드 미리보기 */}
                <div className="gift_preview_container">
                  <span className="preview_label">카카오톡 카드 미리보기</span>
                  <div className="kakao_preview_card">
                    <div className="kakao_preview_header">
                      <span className="kakao_app_logo">WatC</span>
                      <span className="kakao_badge">선물</span>
                    </div>
                    <div className="kakao_preview_body">
                      <h4 className="kakao_preview_title">
                        🎁 {giftRecipient.trim() ? giftRecipient.trim() : "친구"}님! {profileName}님이 보낸 세탁선물이 도착했어요
                      </h4>
                      <p className="kakao_preview_desc">
                        {giftType === "point"
                          ? `안심 포인트 ${parseInt(giftAmount).toLocaleString()}P`
                          : `안심 세탁 쿠폰 ${giftCouponCount}장`}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="kakao_preview_action"
                      onClick={handleGiftReceive}
                    >
                      WatC 앱에서 안심 수령하기
                    </button>
                  </div>
                </div>

                <div className="gift_action_buttons">
                  <button
                    type="button"
                    className="gift_btn_back"
                    onClick={() => setGiftMethod(null)}
                  >
                    이전으로
                  </button>
                  <button
                    type="button"
                    className="gift_btn_confirm gift_btn_confirm--kakao"
                    onClick={() => {
                      const cost =
                        giftType === "point"
                          ? parseInt(giftAmount)
                          : giftCouponCount;
                      if (giftType === "point" && userPoints < cost) {
                        triggerToast("⚠️ 보유하신 포인트가 부족합니다.");
                        return;
                      }
                      if (giftType === "coupon" && userCoupons < cost) {
                        triggerToast("⚠️ 보유하신 쿠폰 수량이 부족합니다.");
                        return;
                      }

                      // 차감 처리
                      if (giftType === "point") {
                        setUserPoints((prev) => prev - cost);
                      } else {
                        setUserCoupons((prev) => prev - cost);
                      }

                      setShowKakaoSim(true);
                    }}
                  >
                    카카오톡으로 카드 전송
                  </button>
                </div>
              </div>
            ) : (
              /* 단계 2: WatC 직접 회원 양도 설정 */
              <div className="gift_modal_body">
                <h3 className="gift_section_subtitle">
                  WatC 회원 즉시 다이렉트 송금
                </h3>

                <div className="gift_input_group">
                  <label className="gift_label">받는 회원 연락처 혹은 ID</label>
                  <input
                    type="text"
                    className="gift_text_input"
                    placeholder="연락처(010-XXXX-XXXX) 또는 ID 입력"
                    value={giftRecipient}
                    onChange={(e) => setGiftRecipient(e.target.value)}
                  />
                </div>

                {giftType === "point" ? (
                  <div className="gift_input_group">
                    <label className="gift_label">보낼 안심 포인트</label>
                    <div className="gift_amount_preset">
                      {["500", "1000", "2000", "3000"].map((amt) => {
                        const numericAmt = parseInt(amt);
                        const disabled = userPoints < numericAmt;
                        return (
                          <button
                            key={amt}
                            type="button"
                            className={`gift_amt_btn ${giftAmount === amt ? "active" : ""}`}
                            disabled={disabled}
                            onClick={() => setGiftAmount(amt)}
                          >
                            {numericAmt.toLocaleString()}P
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="gift_input_group">
                    <div className="gift_coupon_label_row">
                      <label className="gift_label">보낼 쿠폰 수량</label>
                      <span className="gift_coupon_stock">보유 {userCoupons}장</span>
                    </div>
                    <div className="gift_coupon_stepper">
                      <button
                        type="button"
                        className="gift_coupon_step_btn"
                        onClick={() => setGiftCouponCount(c => Math.max(1, c - 1))}
                        disabled={giftCouponCount <= 1}
                      >−</button>
                      <input
                        type="number"
                        className="gift_coupon_step_input"
                        min={1}
                        max={userCoupons}
                        value={giftCouponCount}
                        onChange={(e) => {
                          const v = parseInt(e.target.value) || 1;
                          setGiftCouponCount(Math.min(Math.max(1, v), userCoupons));
                        }}
                      />
                      <button
                        type="button"
                        className="gift_coupon_step_btn"
                        onClick={() => setGiftCouponCount(c => Math.min(userCoupons, c + 1))}
                        disabled={giftCouponCount >= userCoupons}
                      >+</button>
                    </div>
                    {giftCouponCount > userCoupons && (
                      <p className="gift_coupon_warn">보유 수량({userCoupons}장)을 초과했습니다.</p>
                    )}
                  </div>
                )}

                <div className="gift_action_buttons">
                  <button
                    type="button"
                    className="gift_btn_back"
                    onClick={() => setGiftMethod(null)}
                  >
                    이전으로
                  </button>
                  <button
                    type="button"
                    className="gift_btn_confirm gift_btn_confirm--watc"
                    onClick={() => {
                      if (!giftRecipient.trim()) {
                        triggerToast(
                          "⚠️ 받는 친구의 연락처 혹은 ID를 입력해주세요.",
                        );
                        return;
                      }
                      const cost =
                        giftType === "point"
                          ? parseInt(giftAmount)
                          : giftCouponCount;
                      if (giftType === "point" && userPoints < cost) {
                        triggerToast("⚠️ 보유하신 포인트가 부족합니다.");
                        return;
                      }
                      if (giftType === "coupon" && userCoupons < cost) {
                        triggerToast("⚠️ 보유하신 쿠폰 수량이 부족합니다.");
                        return;
                      }

                      // 차감 처리
                      if (giftType === "point") {
                        setUserPoints((prev) => prev - cost);
                      } else {
                        setUserCoupons((prev) => prev - cost);
                      }

                      setShowWatcSim(true);
                    }}
                  >
                    보유 재화 즉시 양도
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 💬 카카오톡 공유 시뮬레이터 오버레이 */}
          {showKakaoSim && (
            <div
              className="gift_sim_overlay animate_fade_in"
              onClick={() => {
                setShowKakaoSim(false);
                setShowGiftModal(false);
                setGiftMethod(null);
                setGiftRecipient("");
                triggerToast(
                  "🎉 카카오톡 공유 선물이 대화방으로 완벽히 전송되었습니다!",
                );
              }}
            >
              <div
                className="gift_sim_card kakao_theme"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="gift_sim_header kakao_bar">
                  <span>카카오톡 친구에게 전송 완료</span>
                </div>
                <div className="gift_sim_body">
                  <div className="kakao_success_icon">💬</div>
                  <p className="gift_sim_main_txt">
                    선물 카카오톡 링크 전송 완료!
                  </p>
                  <div className="gift_sim_balloon">
                    <div className="balloon_top">
                      🎁 WatC 안심 세탁 케어 선물
                    </div>
                    <div className="balloon_mid">
                      {profileName}님이 보낸 실속 선물 코드를 확인해보세요.
                      <br />
                      <strong>
                        {giftType === "point"
                          ? `안심 포인트 ${parseInt(giftAmount).toLocaleString()}P`
                          : `안심 세탁 쿠폰 ${giftCouponCount}장`}
                      </strong>
                    </div>
                    <div className="balloon_bottom">WatC 앱 열고 수령하기</div>
                  </div>
                  <p className="gift_sim_tip">
                    화면을 탭하시면 마이페이지로 돌아갑니다.
                  </p>
                  <button
                    type="button"
                    className="gift_sim_confirm_btn kakao_btn_color"
                    onClick={() => {
                      setShowKakaoSim(false);
                      setShowGiftModal(false);
                      setGiftMethod(null);
                      setGiftRecipient("");
                      triggerToast(
                        "🎉 카카오톡 공유 선물이 대화방으로 완벽히 전송되었습니다!",
                      );
                    }}
                  >
                    대화방으로 돌아가기
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 💙 WatC 직접 송금/양도 시뮬레이터 오버레이 */}
          {showWatcSim && (
            <div
              className="gift_sim_overlay animate_fade_in"
              onClick={() => {
                setShowWatcSim(false);
                setShowGiftModal(false);
                setGiftMethod(null);
                setGiftRecipient("");
                triggerToast(
                  `🎉 ${giftRecipient ? giftRecipient : "친구"}님께 다이렉트 송금이 정상 처리되었습니다!`,
                );
              }}
            >
              <div
                className="gift_sim_card watc_theme"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="gift_sim_header watc_bar">
                  <span>WatC 안심 직통 송금</span>
                </div>
                <div className="gift_sim_body">
                  <div className="watc_success_icon">✓</div>
                  <p className="gift_sim_main_txt">
                    즉시 양도가 완료되었습니다!
                  </p>

                  <div className="gift_sim_rec_table">
                    <div className="table_row">
                      <span className="row_lbl">수취인 연락처/ID:</span>
                      <strong className="row_val">{giftRecipient}</strong>
                    </div>
                    <div className="table_row">
                      <span className="row_lbl">송금 내역:</span>
                      <strong className="row_val">
                        {giftType === "point"
                          ? `안심 포인트 ${parseInt(giftAmount).toLocaleString()}P`
                          : `안심 세탁 쿠폰 ${giftCouponCount}장`}
                      </strong>
                    </div>
                    <div className="table_row">
                      <span className="row_lbl">송출인 잔여 보유량:</span>
                      <strong className="row_val">
                        {giftType === "point"
                          ? `${userPoints.toLocaleString()}P`
                          : `${userCoupons}장`}
                      </strong>
                    </div>
                  </div>

                  <p className="gift_sim_tip">
                    화면을 탭하시면 마이페이지로 돌아갑니다.
                  </p>
                  <button
                    type="button"
                    className="gift_sim_confirm_btn watc_btn_color"
                    onClick={() => {
                      setShowWatcSim(false);
                      setShowGiftModal(false);
                      setGiftMethod(null);
                      setGiftRecipient("");
                      triggerToast(
                        `🎉 ${giftRecipient ? giftRecipient : "친구"}님께 다이렉트 송금이 정상 처리되었습니다!`,
                      );
                    }}
                  >
                    확인 및 닫기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
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

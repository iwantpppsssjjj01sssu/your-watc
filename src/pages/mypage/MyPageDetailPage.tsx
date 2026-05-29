import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MyPageDetailPage.css";

// SVG 일러스트레이터들
function EcoIllustration() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="menu_svg_illustration"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ecoGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d1fae5" />
          <stop offset="100%" stopColor="#a7f3d0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#ecoGrad)" />
      <path
        d="M 50 25 C 65 25, 75 40, 70 55 C 65 70, 50 75, 50 75 C 50 75, 50 70, 45 60 C 40 50, 35 25, 50 25 Z"
        fill="#059669"
        opacity="0.9"
      />
      <path
        d="M 50 75 L 50 35"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 50 55 L 62 48"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 50 63 L 42 57"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 3D 영수증 및 안심 체크 마크 일러스트 (피그마급 입체 SVG)
function TransparentPriceIllustration() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="menu_svg_illustration"
      aria-hidden="true"
      style={{ width: "110px", height: "110px", marginBottom: "6px" }}
    >
      <defs>
        <linearGradient id="receiptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
        <linearGradient id="blueBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="checkGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="shieldBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter
          id="illustrationShadow"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="6"
            floodColor="#1e3a8a"
            floodOpacity="0.12"
          />
        </filter>
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="3"
            floodColor="#000000"
            floodOpacity="0.1"
          />
        </filter>
      </defs>

      <ellipse cx="60" cy="98" rx="35" ry="10" fill="#dbeafe" opacity="0.6" />
      <ellipse
        cx="60"
        cy="95"
        rx="30"
        ry="8"
        fill="url(#blueBaseGrad)"
        filter="url(#illustrationShadow)"
      />
      <path
        d="M 30 95 L 30 99 C 30 103, 90 103, 90 99 L 90 95 Z"
        fill="#1d4ed8"
      />

      <g filter="url(#illustrationShadow)">
        <path
          d="M 42 22 
                 C 42 22, 78 18, 78 22 
                 L 82 86 
                 C 82 86, 75 90, 68 86
                 C 61 82, 54 88, 48 86 
                 C 42 84, 38 88, 38 86 Z"
          fill="url(#receiptGrad)"
        />
        <rect
          x="48"
          y="28"
          width="24"
          height="4"
          rx="2"
          fill="#cbd5e1"
          opacity="0.5"
        />
        <line
          x1="48"
          y1="40"
          x2="72"
          y2="40"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="48"
          y1="48"
          x2="66"
          y2="48"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="48"
          y1="56"
          x2="70"
          y2="56"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="M 48 68 L 52 76 L 56 68 M 50 71 L 54 71 M 50 73 L 54 73"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="60"
          y1="74"
          x2="72"
          y2="74"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      <path
        d="M 24 35 L 26 40 L 31 41 L 26 42 L 24 47 L 22 42 L 17 41 L 22 40 Z"
        fill="#60a5fa"
        opacity="0.8"
      />
      <path
        d="M 94 48 L 95 51 L 98 52 L 95 53 L 94 56 L 93 53 L 90 52 L 93 51 Z"
        fill="#93c5fd"
        opacity="0.9"
      />

      <circle
        cx="58"
        cy="85"
        r="9"
        fill="url(#checkGreenGrad)"
        filter="url(#badgeShadow)"
      />
      <path
        d="M 54 85 L 57 88 L 63 82"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <g filter="url(#badgeShadow)">
        <path
          d="M 80 48 C 80 48, 86 46, 92 48 C 92 56, 86 62, 86 62 C 86 62, 80 56, 80 48 Z"
          fill="url(#shieldBlueGrad)"
        />
        <path
          d="M 83 54 L 85 56 L 89 52"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

// 카테고리별 정교한 파란색 라인 아이콘 모음
function LaundryTShirtIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z" />
      <path d="M12 5v2" strokeWidth="2.5" />
      <path d="M6 8 L9 8 L10 11 L14 11 L15 8 L18 8 L21 11 L19 14 L17 14 L17 21 L7 21 L7 14 L5 14 Z" />
    </svg>
  );
}

function DressShirtIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3 L12 7 L18 3" />
      <path d="M4 3 L20 3 L20 21 L4 21 Z" />
      <path d="M12 7 L12 21" strokeDasharray="2 2" />
      <circle cx="12" cy="11" r="1.2" fill="#2563eb" stroke="none" />
      <circle cx="12" cy="15" r="1.2" fill="#2563eb" stroke="none" />
    </svg>
  );
}

function PantsLineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3 L18 3 L20 21 L13 21 L12 9 L11 21 L4 21 Z" />
      <line
        x1="8"
        y1="3"
        x2="8"
        y2="9"
        strokeWidth="1.5"
        strokeDasharray="2 1"
      />
      <line
        x1="16"
        y1="3"
        x2="16"
        y2="9"
        strokeWidth="1.5"
        strokeDasharray="2 1"
      />
    </svg>
  );
}

function ShoesLineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 14 C 3 14, 5 7, 10 7 C 12 7, 13 9, 15 11 L 21 13 L 21 17 C 21 18, 19 19, 18 19 L 4 19 C 3 19, 3 17, 3 14 Z" />
      <path d="M3 17 L21 17" />
      <line x1="9" y1="10" x2="11" y2="12" />
      <line x1="11" y1="9" x2="13" y2="11" />
    </svg>
  );
}

function BlanketLineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 12 C 8 8, 16 16, 21 12" />
      <path d="M7 5 L7 19" strokeDasharray="3 3" />
      <path d="M17 5 L17 19" strokeDasharray="3 3" />
    </svg>
  );
}

function ShieldCheckLineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="#2563eb"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 11l2 2 4-4" />
    </svg>
  );
}

function CategoryIllustration() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="menu_svg_illustration"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="catGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#catGrad)" />
      <rect
        x="28"
        y="28"
        width="44"
        height="44"
        rx="8"
        fill="none"
        stroke="#d97706"
        strokeWidth="3"
      />
      <line
        x1="28"
        y1="50"
        x2="72"
        y2="50"
        stroke="#d97706"
        strokeWidth="2.5"
      />
      <circle cx="50" cy="39" r="3" fill="#b45309" />
      <circle cx="50" cy="61" r="3" fill="#b45309" />
    </svg>
  );
}

function AlertIllustration() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="menu_svg_illustration"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="alertGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="100%" stopColor="#fed7aa" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#alertGrad)" />
      <polygon
        points="50,22 80,74 20,74"
        fill="#ea580c"
        stroke="#ea580c"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="48.5" y="42" width="3" height="18" rx="1.5" fill="#ffffff" />
      <circle cx="50" cy="66" r="2.5" fill="#ffffff" />
    </svg>
  );
}

function DeliveryIllustration() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="menu_svg_illustration"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" fill="#eff6ff" />
      {/* 가상 트럭 모형 */}
      <path d="M25 40 h35 v25 h-35 z" fill="#3b82f6" />
      <path d="M60 47 h15 l8 10 v8 h-23 z" fill="#60a5fa" />
      <circle cx="36" cy="67" r="6" fill="#1e293b" />
      <circle cx="68" cy="67" r="6" fill="#1e293b" />
      <path d="M63 51 h8 l3 5 h-11 z" fill="#ffffff" />
    </svg>
  );
}

function GiftIllustration() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="menu_svg_illustration"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" fill="#fff1f2" />
      {/* 선물상자 */}
      <rect x="28" y="42" width="44" height="34" rx="4" fill="#f43f5e" />
      <rect x="25" y="32" width="50" height="10" rx="3" fill="#fda4af" />
      <path d="M46 42 h8 v34 h-8 z" fill="#fde047" />
      <path d="M28 54 h44 v8 h-44 z" fill="#fde047" />
    </svg>
  );
}

function CalendarIllustration() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="menu_svg_illustration"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" fill="#fef9c3" />
      {/* 달력 모양 */}
      <rect
        x="30"
        y="30"
        width="40"
        height="42"
        rx="6"
        fill="#ffffff"
        stroke="#ca8a04"
        strokeWidth="3.5"
      />
      <rect x="30" y="30" width="40" height="10" fill="#eab308" />
      <circle cx="40" cy="48" r="2.5" fill="#ca8a04" />
      <circle cx="50" cy="48" r="2.5" fill="#ca8a04" />
      <circle cx="60" cy="48" r="2.5" fill="#ca8a04" />
      <circle cx="40" cy="58" r="2.5" fill="#ca8a04" />
      <circle cx="50" cy="58" r="2.5" fill="#eab308" />{" "}
      {/* 오늘 날짜 별표 느낌 */}
    </svg>
  );
}

interface AccordionItem {
  name: string;
  price: string;
  desc?: string;
}

interface AccordionGroup {
  categoryName: string;
  items: AccordionItem[];
}

export function MyPageDetailPage() {
  const { menu } = useParams<{ menu: string }>();
  const navigate = useNavigate();

  // 페이지 진입 시 스크롤을 최상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [menu]);

  // 1. 토스트 알림창 상태
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // 2. 자가 의류관리 체크리스트 상태
  const [checklist, setChecklist] = useState([
    {
      id: 1,
      text: "세탁 라벨(물세탁/드라이 기호)을 항상 먼저 체크한다.",
      checked: false,
    },
    {
      id: 2,
      text: "흰 옷과 색깔 옷은 세탁 시 무조건 분류하여 세탁한다.",
      checked: false,
    },
    {
      id: 3,
      text: "지퍼가 달린 아우터는 반드시 지퍼를 채우고 세탁한다.",
      checked: false,
    },
    {
      id: 4,
      text: "니트나 스웨터는 세탁 망에 넣고 울코스로 빤다.",
      checked: false,
    },
    {
      id: 5,
      text: "탈수 직후 축축한 셔츠는 바로 털어서 옷걸이에 넌다.",
      checked: false,
    },
  ]);

  // 3. 알림 토글 스위치 상태
  const [notiService, setNotiService] = useState<boolean>(true);
  const [notiStatus, setNotiStatus] = useState<boolean>(true);
  const [notiMarketing, setNotiMarketing] = useState<boolean>(false);
  const [notiSafe, setNotiSafe] = useState<boolean>(true);

  // 5. 출석체크 상태 (가상 달력형 7일 챌린지)
  const [attendance, setAttendance] = useState<boolean[]>([
    true,
    true,
    true,
    false,
    false,
    false,
    false,
  ]);
  const handleAttendanceClick = (idx: number) => {
    if (idx !== 3) {
      triggerToast("💡 오늘(4일차) 출석 도장을 클릭해 주세요!");
      return;
    }
    if (attendance[idx]) {
      triggerToast("🌟 이미 오늘 출석이 완료되었습니다!");
      return;
    }
    const newAtt = [...attendance];
    newAtt[idx] = true;
    setAttendance(newAtt);
    triggerToast("🎉 출석 완료! 안심 포인트 50P 적립!");
  };

  // 6. 아코디언 상태
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(0);

  // FAQ 아코디언 상태
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const currentMenu = menu || "price-basic";

  const handleBack = () => {
    navigate("/home?tab=mypage");
  };

  const toggleCheck = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const toggleAccordion = (idx: number) => {
    setOpenAccordionIdx(openAccordionIdx === idx ? null : idx);
  };

  // 아코디언 데이터 (세탁 종류별 요금)
  const categoryPrices: AccordionGroup[] = [
    {
      categoryName: "🧥 아우터 (Outerwear)",
      items: [
        {
          name: "롱패딩 / 헤비 다운",
          price: "18,900원",
          desc: "구스/덕다운 숨을 살려주는 복원 건조 코스 포함",
        },
        { name: "숏패딩 / 웰론 다운", price: "14,900원" },
        {
          name: "코트 (울/캐시미어)",
          price: "15,900원",
          desc: "기모 정돈 및 부직포 안전 안심 백 커버 제공",
        },
        {
          name: "가죽 / 모피 자켓",
          price: "29,000원 ~",
          desc: "전문 특수 가죽 기계 케어 코스 적용",
        },
        { name: "트렌치코트 / 자켓", price: "10,900원" },
      ],
    },
    {
      categoryName: "👕 상의 (Tops)",
      items: [
        {
          name: "일반 셔츠 / 블라우스",
          price: "2,500원",
          desc: "고온 칼각 카라 입체 프레스 성형 마감",
        },
        { name: "티셔츠 / 피케 셔츠", price: "4,000원" },
        {
          name: "니트 / 스웨터 / 가디건",
          price: "6,900원",
          desc: "저온 안심 볼륨 가드 및 특수 울세제 세탁",
        },
        { name: "후드티 / 맨투맨", price: "5,500원" },
      ],
    },
    {
      categoryName: "👖 하의 (Bottoms)",
      items: [
        {
          name: "정장 바지 / 슬랙스",
          price: "4,500원",
          desc: "중앙 칼주름 복원 다림질 포함",
        },
        {
          name: "청바지 / 데님 팬츠",
          price: "5,000원",
          desc: "물빠짐 방지 뒤집기 특수 케어 세탁",
        },
        { name: "스커트 / 면바지", price: "4,800원" },
      ],
    },
    {
      categoryName: "🛏️ 침구 / 생활빨래",
      items: [
        {
          name: "이불 세탁 (싱글/더블)",
          price: "15,000원",
          desc: "대용량 드럼 에어 살균 코스로 집먼지 진드기 소멸",
        },
        { name: "겨울 극세사 이불", price: "19,000원" },
        {
          name: "일반 생활빨래 1팩 (M)",
          price: "9,900원",
          desc: "일반 일상 의류 약 4kg 내외 맞춤 탈수/살균",
        },
        {
          name: "일반 생활빨래 1팩 (L)",
          price: "14,900원",
          desc: "대용량 일상 의류 약 7kg 내외 일괄 세탁",
        },
      ],
    },
  ];

  return (
    <div className="mypagedetail_wrapper">
      <div className="mypagedetail_container">
        {/* 상단 고정 투명 백드롭 헤더 */}
        <header className="menu_detail_header">
          <button
            type="button"
            className="premium_back_btn"
            onClick={handleBack}
            aria-label="마이페이지로 돌아가기"
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
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <span className="menu_header_title">
            {currentMenu === "care-guide" && "라이프케어 안내"}
            {currentMenu === "price-basic" && "기본 가격 정책"}
            {currentMenu === "price-category" && "의류 종류별 요금"}
            {currentMenu === "price-additional" && "추가 요금 기준"}
            {currentMenu === "active-orders" && "주문 현황"}
            {currentMenu === "washing-rules" && "세탁 이용수칙"}
            {currentMenu === "alert-settings" && "알림 설정"}
            {currentMenu === "invite-friend" && "친구 초대"}
            {currentMenu === "attendance-check" && "왓씨 출석체크"}
            {currentMenu === "notices" && "공지사항"}
            {currentMenu === "customer-center" && "안심 고객센터"}
            {currentMenu === "point-history" && "주문 & 포인트 내역"}
            {currentMenu === "coupons" && "나의 쿠폰함"}
          </span>
          <div style={{ width: "42px" }} />
        </header>

        {/* 1. 의류 관리 및 라이프케어 상세 뷰 */}
        {currentMenu === "care-guide" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <EcoIllustration />
              <span
                className="menu_hero_badge"
                style={{
                  color: "#1e40af",
                  backgroundColor: "rgba(37, 99, 235, 0.12)",
                }}
              >
                Eco-Care Guide
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1e3a8a" }}>
                의류 수명 극대화 비결
              </h1>
              <p className="menu_hero_subtitle">
                친환경 클리닝과 보관법을 활용해 아끼는 옷을 새 옷처럼 오래
                입으세요.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">
                💡 세탁 전 필수 3대 체크사항
              </h2>
              <div className="eco_card_stack">
                <div className="eco_info_card">
                  <div className="eco_card_num">01</div>
                  <div className="eco_card_txt">
                    <h4>케어라벨 기호 정독하기</h4>
                    <p>
                      의류 안쪽 라벨의 물세탁 가능 여부 및 드라이클리닝 전용
                      마크를 반드시 확인해야 열 수축과 섬유 변색을 막습니다.
                    </p>
                  </div>
                </div>
                <div className="eco_info_card">
                  <div className="eco_card_num">02</div>
                  <div className="eco_card_txt">
                    <h4>지퍼와 주머니 완전 단속</h4>
                    <p>
                      열려 있는 주머니 속 동전이나 오픈된 메탈 지퍼 이빨은 세탁
                      중 다른 의류의 올을 뜯기게 하므로, 반드시 잠그고 뒤집어서
                      세탁망에 넣으세요.
                    </p>
                  </div>
                </div>
                <div className="eco_info_card">
                  <div className="eco_card_num">03</div>
                  <div className="eco_card_txt">
                    <h4>염색성 이염 대비 분류배조</h4>
                    <p>
                      짙은 청바지, 붉은 계열 니트는 100% 물빠짐이 생깁니다. 흰
                      의류와 파스텔톤 의류는 철저히 이중 분할해 빠는 습관을
                      가져보세요.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="body_section_title" style={{ marginTop: "28px" }}>
                📋 나의 의류 관리 점수 테스트
              </h2>
              <div className="checklist_box">
                <p className="checklist_hint">
                  평소 나의 세탁/보관 습관을 클릭해 체크해 보세요!
                </p>
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`checklist_item ${item.checked ? "checked" : ""}`}
                    onClick={() => toggleCheck(item.id)}
                  >
                    <span className="check_indicator">
                      {item.checked ? "✓" : ""}
                    </span>
                    <span className="check_text">{item.text}</span>
                  </button>
                ))}
                <div className="checklist_result">
                  <span className="result_badge">결과 판정</span>
                  <span className="result_txt">
                    {checklist.filter((c) => c.checked).length >= 4
                      ? "🏆 완벽한 의류 수호자! 상위 5% 프로 세탁러입니다."
                      : checklist.filter((c) => c.checked).length >= 2
                        ? "⭐ 양호한 관리 수준! 조금만 더 세밀하게 챙겨보세요."
                        : "⚠️ 관리가 시급합니다! 왓씨의 케어 서비스를 적극 활용해 보세요."}
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. 기본 가격표 상세 뷰 */}
        {currentMenu === "price-basic" && (
          <div className="menu_detail_content animate_fade_in">
            {/* 둥근 카드 형태의 히어로 영역 */}
            <div className="price_hero_card_container">
              <section className="menu_hero_box price_hero_box_custom">
                <TransparentPriceIllustration />
                <span className="menu_hero_badge price_badge_custom">
                  Transparent Price
                </span>
                <h1 className="menu_hero_title price_title_custom">
                  왓씨 안심 기본 요금표
                </h1>
                <p className="menu_hero_subtitle price_subtitle_custom">
                  숨겨진 요금 없이 투명하게 제공되는 정찰제 세탁 표준 가격을
                  확인하세요.
                </p>
              </section>
            </div>

            <section className="menu_section_body price_body_custom">
              <h2 className="body_section_title price_body_title_custom">
                <span className="title_emoji">📦</span> 생활빨래 및 단품 패키지
                가격
              </h2>
              <p className="table_desc_info price_body_desc_custom">
                일상 의류 및 기본적인 침구 류의 투명 표준 세탁 정찰제입니다.
              </p>

              {/* 피그마급 라운드 카드 테이블 리스트 */}
              <div className="price_table_card_wrapper">
                {/* 헤더 바 */}
                <div className="price_table_header_row">
                  <div className="header_col col_service">서비스 항목</div>
                  <div className="header_col col_volume">용량 / 구분</div>
                  <div className="header_col col_price">표준 가격</div>
                </div>

                {/* 리스트 아이템 행들 */}
                <div className="price_table_list_items">
                  <div className="price_item_row">
                    <div className="item_col col_service">
                      <div className="item_icon_circle">
                        <LaundryTShirtIcon />
                      </div>
                      <span className="item_service_name">
                        생활빨래 프리미엄 (M)
                      </span>
                    </div>
                    <div className="item_col col_volume">
                      일상 캐주얼 약 4kg
                    </div>
                    <div className="item_col col_price">9,900원</div>
                  </div>

                  <div className="price_item_row">
                    <div className="item_col col_service">
                      <div className="item_icon_circle">
                        <LaundryTShirtIcon />
                      </div>
                      <span className="item_service_name">
                        생활빨래 프리미엄 (L)
                      </span>
                    </div>
                    <div className="item_col col_volume">
                      일상 캐주얼 약 7kg
                    </div>
                    <div className="item_col col_price">14,900원</div>
                  </div>

                  <div className="price_item_row">
                    <div className="item_col col_service">
                      <div className="item_icon_circle">
                        <DressShirtIcon />
                      </div>
                      <span className="item_service_name">
                        베이직 드레스 와이셔츠
                      </span>
                    </div>
                    <div className="item_col col_volume">
                      단품 (기계 다림질 포함)
                    </div>
                    <div className="item_col col_price">2,500원</div>
                  </div>

                  <div className="price_item_row">
                    <div className="item_col col_service">
                      <div className="item_icon_circle">
                        <PantsLineIcon />
                      </div>
                      <span className="item_service_name">
                        비즈니스 슬랙스 / 정장바지
                      </span>
                    </div>
                    <div className="item_col col_volume">
                      단품 (칼주름 세팅)
                    </div>
                    <div className="item_col col_price">4,500원</div>
                  </div>

                  <div className="price_item_row">
                    <div className="item_col col_service">
                      <div className="item_icon_circle">
                        <ShoesLineIcon />
                      </div>
                      <span className="item_service_name">
                        프리미엄 슈즈 / 스니커즈
                      </span>
                    </div>
                    <div className="item_col col_volume">
                      켤레 당 (탈취 코팅)
                    </div>
                    <div className="item_col col_price">6,000원</div>
                  </div>

                  <div className="price_item_row">
                    <div className="item_col col_service">
                      <div className="item_icon_circle">
                        <BlanketLineIcon />
                      </div>
                      <span className="item_service_name">
                        싱글 안심 이불 클리닝
                      </span>
                    </div>
                    <div className="item_col col_volume">
                      이불 1채 당 (살균 건조)
                    </div>
                    <div className="item_col col_price">15,000원</div>
                  </div>
                </div>
              </div>

              {/* 하단 안심 배너 */}
              <div className="price_flat_info_banner">
                <div className="flat_banner_icon_circle">
                  <ShieldCheckLineIcon />
                </div>
                <div className="flat_banner_text_block">
                  <h4 className="flat_banner_main_title">
                    모든 가격은 정찰제로 추가 요금이 발생하지 않습니다.
                  </h4>
                  <p className="flat_banner_sub_desc">
                    서비스 관련 문의는 고객센터를 이용해 주세요.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 3. 세탁 종류별 요금 (아코디언 형태) */}
        {currentMenu === "price-category" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <CategoryIllustration />
              <span
                className="menu_hero_badge"
                style={{
                  color: "#1e40af",
                  backgroundColor: "rgba(37, 99, 235, 0.12)",
                }}
              >
                Interactive Table
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1e3a8a" }}>
                의류 종류별 세분 요금표
              </h1>
              <p className="menu_hero_subtitle">
                아래 각 카테고리를 탭하시면 해당 의류 품목별 전문 세탁 단품
                가격이 유려하게 열립니다.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">
                💡 카테고리별 아코디언 요금표
              </h2>

              <div className="accordion_wrapper">
                {categoryPrices.map((group, groupIdx) => {
                  const isOpen = openAccordionIdx === groupIdx;
                  return (
                    <div
                      key={groupIdx}
                      className={`accordion_card ${isOpen ? "open" : ""}`}
                    >
                      <button
                        type="button"
                        className="accordion_header_btn"
                        onClick={() => toggleAccordion(groupIdx)}
                      >
                        <span className="accordion_title_text">
                          {group.categoryName}
                        </span>
                        <span className="accordion_arrow_icon">
                          {isOpen ? "▲" : "▼"}
                        </span>
                      </button>

                      <div className="accordion_body_content">
                        {group.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="accordion_price_row">
                            <div className="item_desc_cell">
                              <span className="item_name">{item.name}</span>
                              {item.desc && (
                                <span className="item_subdesc">
                                  {item.desc}
                                </span>
                              )}
                            </div>
                            <span className="item_price">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="accordion_footer_tip">
                <p>
                  ※ 요금표에 명시되어 있지 않은 특수 소재 및 잡화 부류는 전문
                  검수관이 실물을 확인한 후 앱 내 알림을 통해 합리적인 실측
                  가격을 개별 고지해 드립니다.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* 4. 추가 요금 기준 상세 뷰 */}
        {currentMenu === "price-additional" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <AlertIllustration />
              <span
                className="menu_hero_badge"
                style={{
                  color: "#1e40af",
                  backgroundColor: "rgba(37, 99, 235, 0.12)",
                }}
              >
                Additional Standards
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1e3a8a" }}>
                추가 요금 & 보상 안심 기준
              </h1>
              <p className="menu_hero_subtitle">
                오염이나 가공 요구사항에 따른 합리적인 추가 기준과 분실/훼손 시
                보상 배상 보증 규칙을 알립니다.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">
                ⚠️ 특수 오염 및 특수 가공 가산금 기준
              </h2>
              <div className="additional_cards_list">
                <div className="add_info_card">
                  <div
                    className="add_card_badge"
                    style={{ backgroundColor: "#dbeafe", color: "#2563eb" }}
                  >
                    오염 가산
                  </div>
                  <h4 className="add_card_title">
                    찌든 때 / 황변 / 볼펜 자국 복원 케어
                  </h4>
                  <p className="add_card_desc">
                    일반 세탁으로 제거되지 않는 깃 때, 커피, 피지 얼룩, 누런
                    황변 등을 특수 효소 및 옥시 딥클린 특수 기술로 제거할 경우{" "}
                    <strong>품목 당 3,000원 ~ 8,000원</strong>의 복원 요금이
                    추가됩니다.
                  </p>
                </div>

                <div className="add_info_card">
                  <div
                    className="add_card_badge"
                    style={{ backgroundColor: "#e0f2fe", color: "#0369a1" }}
                  >
                    프리미엄 가공
                  </div>
                  <h4 className="add_card_title">
                    방수 코팅 / 실크 유연 정밀 가공
                  </h4>
                  <p className="add_card_desc">
                    스키복이나 기능성 자켓의 고유 방수막 복원 코팅, 실크 및 실크
                    혼방 셔츠의 윤택 보존 가공 요구 시{" "}
                    <strong>품목 당 5,000원</strong>의 스페셜 앰플 가공 코팅
                    금액이 추가됩니다.
                  </p>
                </div>

                <div className="add_info_card">
                  <div
                    className="add_card_badge"
                    style={{ backgroundColor: "#f3e8ff", color: "#6b21a8" }}
                  >
                    초고속 패스
                  </div>
                  <h4 className="add_card_title">
                    당일 에어 급행 배송 서비스 옵션
                  </h4>
                  <p className="add_card_desc">
                    수거 후 세탁을 당일 18시간 안에 번개처럼 완료해 집 앞으로
                    재배송하는 긴급 급행 옵션을 활성화할 경우{" "}
                    <strong>주문 전체 건 당 4,900원</strong>의 소액 배송
                    가산금이 부과됩니다.
                  </p>
                </div>
              </div>

              <h2 className="body_section_title" style={{ marginTop: "28px" }}>
                🛡️ 안심 파손 및 분실 배상제도
              </h2>
              <div className="compensation_policy_box">
                <div className="policy_step">
                  <span className="policy_step_indicator">1</span>
                  <div className="policy_step_txt">
                    <h4>정밀한 수거 검수 기록 보존</h4>
                    <p>
                      수거 즉시 고화질 카메라로 옷의 원상태 사진을 찍고 옷장에
                      업로드하여, 고객이 모르던 기존 해짐/올 트임 상태 데이터
                      기록을 안심 보관합니다.
                    </p>
                  </div>
                </div>
                <div className="policy_step">
                  <span className="policy_step_indicator">2</span>
                  <div className="policy_step_txt">
                    <h4>소비자 피해 배상 규정 100% 준수</h4>
                    <p>
                      세탁 도중 자사 과실로 훼손/이염 및 분실 시, 한국소비자원의
                      세탁 배상 등가 기준법을 엄격히 적용하여 신속하게
                      피해액(의류 구매액 비례 감가상각)을 현금 변상해 드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 5. 진행 중 주문 상세 뷰 */}
        {currentMenu === "active-orders" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <DeliveryIllustration />
              <span
                className="menu_hero_badge"
                style={{
                  color: "#2563eb",
                  backgroundColor: "rgba(37, 99, 235, 0.12)",
                }}
              >
                Live Status
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1e3a8a" }}>
                진행 중인 나의 세탁 현황
              </h1>
              <p className="menu_hero_subtitle">
                고객님이 맡기신 소중한 의류가 현재 어느 과정에 있는지 실시간
                모니터링합니다.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">🚚 세탁 안심 진행 마일스톤</h2>

              <div className="order_timeline">
                <div className="timeline_item completed">
                  <div className="timeline_circle">✓</div>
                  <div className="timeline_info">
                    <h4>단계 1. 수거 완료 및 안심 입고</h4>
                    <p className="timeline_time">2026.05.27 09:30 입고됨</p>
                    <p className="timeline_desc">
                      지정 문 앞 수거봉투가 검수 센터에 안전하게 인계 및
                      도달했습니다.
                    </p>
                  </div>
                </div>

                <div className="timeline_item active">
                  <div className="timeline_circle">2</div>
                  <div className="timeline_info">
                    <h4>단계 2. 정밀 분류 및 단독 프리미엄 세탁 중</h4>
                    <p className="timeline_time">현재 진행 단계</p>
                    <p className="timeline_desc">
                      케어라벨 기호 분류 검수가 완료되어 왓씨 프리미엄 저온 스팀
                      드럼에서 세탁 중입니다.
                    </p>
                  </div>
                </div>

                <div className="timeline_item">
                  <div className="timeline_circle">3</div>
                  <div className="timeline_info">
                    <h4>단계 3. 솜털 살리기 특수 열풍 건조</h4>
                    <p className="timeline_time">대기 중</p>
                    <p className="timeline_desc">
                      섬유 공기 수분 배출을 위해 무빙 행거와 복원 건조기에서
                      가공 예정입니다.
                    </p>
                  </div>
                </div>

                <div className="timeline_item">
                  <div className="timeline_circle">4</div>
                  <div className="timeline_info">
                    <h4>단계 4. 칼주름 다림질 & 클린 안심 패킹</h4>
                    <p className="timeline_time">대기 중</p>
                    <p className="timeline_desc">
                      깃과 실루엣의 칼각 입체 프레스 가공 후 프리미엄 부직포
                      백에 씌워 포장합니다.
                    </p>
                  </div>
                </div>

                <div className="timeline_item">
                  <div className="timeline_circle">5</div>
                  <div className="timeline_info">
                    <h4>단계 5. 새벽 비대면 안심 배송 출발</h4>
                    <p className="timeline_time">배송 예정</p>
                    <p className="timeline_desc">
                      포장 완료된 의류들이 새벽 안심 크루를 통해 문 앞으로
                      배달될 예정입니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 6. 세탁 이용수칙 상세 뷰 */}
        {currentMenu === "washing-rules" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <EcoIllustration />
              <span
                className="menu_hero_badge"
                style={{
                  color: "#1e40af",
                  backgroundColor: "rgba(37, 99, 235, 0.12)",
                }}
              >
                Clean Rules
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1e3a8a" }}>
                왓씨 안심 세탁 이용수칙
              </h1>
              <p className="menu_hero_subtitle">
                깨끗하고 신속한 세탁이 진행될 수 있도록 아래 이용수칙을 꼭
                준수해 주세요.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">⚠️ 고객 안심 배출 수칙</h2>
              <div className="rules_box">
                <div className="rule_card">
                  <h4>1. 주머니 속 잔여품을 꼭 비워주세요!</h4>
                  <p>
                    주머니에 남겨진 무선 이어폰, 카드, 립스틱 등은 섬유 오염 및
                    기기 훼손의 직접적인 원인이 됩니다. 배출 전 주머니 속을
                    꼼꼼히 확인해 주세요.
                  </p>
                </div>

                <div className="rule_card">
                  <h4>2. 젖은 세탁물 배출을 금합니다</h4>
                  <p>
                    비가 오거나 물에 완전히 젖어 축축한 세탁물을 밀폐 비닐팩에
                    넣어 배출하면, 수거 이동 기간 중 곰팡이가 피어 복원이
                    불가능해질 수 있습니다.
                  </p>
                </div>

                <div className="rule_card">
                  <h4>3. 세탁 불가 품목을 확인해 주세요</h4>
                  <p>
                    동물 배설물이 묻은 세탁물, 충전재가 다 터져 흘러내리는
                    솜이불, 솜 인형 등 위생 및 기계 훼손 우려가 극도로 큰 특수
                    품목은 수거가 반려될 수 있습니다.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 7. 알림 설정 상세 뷰 (가상 토글스위치 4종 구현) */}
        {currentMenu === "alert-settings" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <div
                className="menu_svg_illustration"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "56px" }}>🔔</span>
              </div>
              <span
                className="menu_hero_badge"
                style={{
                  color: "#1e40af",
                  backgroundColor: "rgba(37, 99, 235, 0.12)",
                }}
              >
                Notification
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1e3a8a" }}>
                실시간 알림 및 수신 제어
              </h1>
              <p className="menu_hero_subtitle">
                수거 현황 및 할인 혜택, 재세탁 보증 알림 채널 수신 여부를 직접
                통제하세요.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">
                🔔 카테고리별 실시간 토글 설정
              </h2>

              <div className="toggle_list">
                <div className="toggle_row_item">
                  <div className="toggle_txt">
                    <h4>수거 및 배송 안심 알림</h4>
                    <p>
                      수거 완료 알림, 세탁소 입고 사진, 문 앞 새벽배송 도착 완료
                      메시지를 실시간 카카오 알림톡으로 전송합니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`toggle_switch ${notiService ? "active" : ""}`}
                    onClick={() => {
                      setNotiService(!notiService);
                      triggerToast(
                        `수거/배송 알림이 ${!notiService ? "켜졌습니다" : "꺼졌습니다"}.`,
                      );
                    }}
                  >
                    <span className="toggle_ball"></span>
                  </button>
                </div>

                <div className="toggle_row_item">
                  <div className="toggle_txt">
                    <h4>실시간 세탁 진행 현황 업데이트</h4>
                    <p>
                      '세탁 중', '건조 및 프레스 가공 중', '포장 완료' 등 상세
                      세탁 단계별 실시간 공정 상태를 알려드립니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`toggle_switch ${notiStatus ? "active" : ""}`}
                    onClick={() => {
                      setNotiStatus(!notiStatus);
                      triggerToast(
                        `진행현황 알림이 ${!notiStatus ? "켜졌습니다" : "꺼졌습니다"}.`,
                      );
                    }}
                  >
                    <span className="toggle_ball"></span>
                  </button>
                </div>

                <div className="toggle_row_item">
                  <div className="toggle_txt">
                    <h4>재세탁 안심 신청 기한 알림</h4>
                    <p>
                      배송 완료 후 '24시간 안심 재세탁 보증' 신청이 가능한 유효
                      기한 3시간 전에 모바일 푸시 리마인드를 보냅니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`toggle_switch ${notiSafe ? "active" : ""}`}
                    onClick={() => {
                      setNotiSafe(!notiSafe);
                      triggerToast(
                        `재세탁 보증 알림이 ${!notiSafe ? "켜졌습니다" : "꺼졌습니다"}.`,
                      );
                    }}
                  >
                    <span className="toggle_ball"></span>
                  </button>
                </div>

                <div className="toggle_row_item">
                  <div className="toggle_txt">
                    <h4>마케팅 쿠폰 및 게릴라 이벤트</h4>
                    <p>
                      장마철 뽀송 런드리 특가 기습 쿠폰, 친구초대 5,000P 획득
                      챌린지 등 보너스 혜택 정보를 수신합니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`toggle_switch ${notiMarketing ? "active" : ""}`}
                    onClick={() => {
                      setNotiMarketing(!notiMarketing);
                      triggerToast(
                        `마케팅 혜택 알림이 ${!notiMarketing ? "켜졌습니다" : "꺼졌습니다"}.`,
                      );
                    }}
                  >
                    <span className="toggle_ball"></span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 8. 친구 초대 상세 뷰 (복사 기능) */}
        {currentMenu === "invite-friend" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
              }}
            >
              <GiftIllustration />
              <span
                className="menu_hero_badge"
                style={{
                  color: "#1d4ed8",
                  backgroundColor: "rgba(59, 130, 246, 0.16)",
                }}
              >
                Invite Benefit
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1d4ed8" }}>
                친구 초대하고 5,000P 받기
              </h1>
              <p className="menu_hero_subtitle" style={{ color: "#334155" }}>
                초대한 친구가 첫 주문을 완료하면 친구와 나 모두에게 왓씨
                5,000P가 즉시 적립됩니다!
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">🎁 나의 전용 초대 코드</h2>

              <div className="invite_code_box">
                <span className="invite_code_lbl">초대 코드</span>
                <div className="invite_code_row">
                  <span className="invite_code_val">WATC-LOVE-HAEUN</span>
                  <button
                    type="button"
                    className="invite_copy_btn"
                    onClick={() => {
                      navigator.clipboard.writeText("WATC-LOVE-HAEUN");
                      triggerToast("📋 초대 코드가 클립보드에 복사되었습니다!");
                    }}
                  >
                    코드 복사
                  </button>
                </div>
              </div>

              <div className="invite_guide_card">
                <h4>포인트 지급 3단계 여정</h4>
                <div className="invite_step_grid">
                  <div className="invite_step_cell">
                    <span className="step_num">1</span>
                    <p>내 코드를 친구에게 공유</p>
                  </div>
                  <div className="invite_step_cell">
                    <span className="step_num">2</span>
                    <p>친구가 회원가입 시 내 코드 입력</p>
                  </div>
                  <div className="invite_step_cell">
                    <span className="step_num">3</span>
                    <p>친구가 첫 세탁 완료 시 양방향 5,000P 지급</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 9. 왓씨 출석체크 상세 뷰 (가상 캘린더 인터랙션) */}
        {currentMenu === "attendance-check" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <CalendarIllustration />
              <span
                className="menu_hero_badge"
                style={{
                  color: "#1e40af",
                  backgroundColor: "rgba(37, 99, 235, 0.12)",
                }}
              >
                Daily Check-In
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1e3a8a" }}>
                매일 매일 출석체크 챌린지
              </h1>
              <p className="menu_hero_subtitle">
                매일 하루 한 번 도장을 찍으면 50P, 7일 연속 성공 시 500P 추가
                보너스 적립!
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">📅 이번 주 출석 스탬프 판</h2>

              <div className="stamp_grid">
                {attendance.map((attended, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`stamp_cell ${idx === 3 && !attended ? "today" : ""} ${attended ? "attended" : ""}`}
                    onClick={() => handleAttendanceClick(idx)}
                  >
                    <span className="stamp_day">{idx + 1}일차</span>
                    <div className="stamp_circle">
                      {attended ? "🌟" : " stamp "}
                    </div>
                    <span className="stamp_pts">
                      {idx === 6 ? "+500P" : "+50P"}
                    </span>
                  </button>
                ))}
              </div>

              <div className="attendance_status_card">
                <h4>나의 출석 적립 현황</h4>
                <p>
                  이번 주 총 <strong>3일</strong> 출석 도장을 완료하여 총{" "}
                  <strong>150포인트</strong>를 보너스로 획득하셨습니다!
                  4일차(오늘) 도장을 콕 터치해 보세요.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* 10. 공지사항 상세 뷰 */}
        {currentMenu === "notices" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <div
                className="menu_svg_illustration"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "56px" }}>📢</span>
              </div>
              <span
                className="menu_hero_badge"
                style={{
                  color: "#1e40af",
                  backgroundColor: "rgba(37, 99, 235, 0.12)",
                }}
              >
                WatC Notice
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1e3a8a" }}>
                왓씨 안심 공지사항
              </h1>
              <p className="menu_hero_subtitle">
                안심 세탁 표준을 정립하는 왓씨의 소식과 서비스 개편 안내를
                신속히 알립니다.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">📢 최신 소식 및 공지목록</h2>

              <div className="notices_stack">
                <div className="notice_item_card">
                  <div className="notice_card_header">
                    <span className="notice_label system">시스템</span>
                    <span className="notice_date">2026.05.27</span>
                  </div>
                  <h4 className="notice_card_title">
                    정기 데이터 백업 서버 이중화 점검 안내 (06/02)
                  </h4>
                  <p className="notice_card_desc">
                    고객님의 안심 수거 실측 사진 데이터 보존력을 영구화하기 위해
                    6월 2일 새벽 2시부터 4시까지 약 2시간 동안 서버 백업 안정화
                    점검을 진행합니다. 이 기간 중에는 세탁 임시 신청이
                    불가능하오니 양해 바랍니다.
                  </p>
                </div>

                <div className="notice_item_card">
                  <div className="notice_card_header">
                    <span className="notice_label event">이벤트</span>
                    <span className="notice_date">2026.05.20</span>
                  </div>
                  <h4 className="notice_card_title">
                    장마철 뽀송뽀송 기습 15% 런드리 할인 쿠폰 배포
                  </h4>
                  <p className="notice_card_desc">
                    장마철 축축하고 꿉꿉한 생활의류들을 새 옷처럼 드라이할 수
                    있도록, 마이페이지 쿠폰함에 안심 '15% 생활의류 세탁 전용
                    할인 쿠폰'이 발급 완료되었습니다. 유효기한을 확인해 기한 내
                    뽀송한 혜택을 챙기세요!
                  </p>
                </div>

                <div className="notice_item_card">
                  <div className="notice_card_header">
                    <span className="notice_label system">신설</span>
                    <span className="notice_date">2026.05.10</span>
                  </div>
                  <h4 className="notice_card_title">
                    24시간 재세탁 안심 보증 100% 안심제 신규 도입
                  </h4>
                  <p className="notice_card_desc">
                    배송 도착 후 세탁 불량이나 잔여 얼룩에 대한 보완을 1초 만에
                    무료 신청할 수 있는 안심 보상 보증 시스템이 정식
                    도입되었습니다. 배송 완료 알림 톡 하단 또는 앱 내 현황에서
                    간편 신청이 가능합니다.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 11. 고객센터 상세 뷰 (FAQ 5종 접이식 아코디언) */}
        {currentMenu === "customer-center" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #f0fdfa, #ccfbf1)",
              }}
            >
              <div
                className="menu_svg_illustration"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "56px" }}>💬</span>
              </div>
              <span
                className="menu_hero_badge"
                style={{
                  color: "#0d9488",
                  backgroundColor: "rgba(13, 148, 136, 0.12)",
                }}
              >
                Customer Help
              </span>
              <h1 className="menu_hero_title" style={{ color: "#115e59" }}>
                1:1 안심 고객행복센터
              </h1>
              <p className="menu_hero_subtitle">
                세탁 품질에 관한 궁금증, 안심 보상 청구 등 모든 의문을 신속하게
                해소해 드립니다.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">💡 자주 묻는 안심 FAQ</h2>

              <div className="faq_stack">
                {[
                  {
                    q: "Q. 세탁물이 파손되거나 타인 의류가 섞여서 오면 보상은 어떻게 받나요?",
                    a: "왓씨는 입고 즉시 모든 섬유의 카메라 정밀 검수 대조 데이터를 확보합니다. 자사 포장/배송 오류나 세탁 과실이 증명될 경우, 소비자 규정에 비례한 상각 평가액을 100% 현금 변상 처리해 드립니다.",
                  },
                  {
                    q: "Q. 세탁 봉투를 수거 전 문 앞에 두었는데 도난당하면 어떡하나요?",
                    a: "배출 완료 알림 등록 후 수거팀 도착 전에 발생한 분실에 대해선, 문 앞 사진 및 빌라 보안 카메라 기록을 대조하여 고객 과실이 없을 시 왓씨 안심 분실 긴급 지원 포인트(최대 5만 원 권)를 배정 보상해 드립니다.",
                  },
                  {
                    q: "Q. 세탁물 배송 완료 도착 사진을 수신했는데 문 앞에 옷이 없어요.",
                    a: "안심 배송 크루가 간혹 호수나 층수를 혼동하여 배치하였을 우려가 있습니다. 즉시 카카오 알림톡의 연결망이나 고객센터 채널로 말씀해 주시면 배송 담당자가 30분 내 실측 장소를 확인하여 신속 배치합니다.",
                  },
                  {
                    q: "Q. 공동현관 비밀번호가 변경되었는데 어떻게 수정해야 하나요?",
                    a: "마이페이지 상단의 '프로필 상세 설정(또는 + 버튼)'을 누르시면 언제든지 기본 배송 주소 하단의 공동현관 출입 비밀번호를 정정하실 수 있으며, 다음 번 수거/배송 시 즉각 연동됩니다.",
                  },
                ].map((faq, faqIdx) => {
                  const isFaqOpen = openFaqIdx === faqIdx;
                  return (
                    <div
                      key={faqIdx}
                      className={`faq_item ${isFaqOpen ? "open" : ""}`}
                    >
                      <button
                        type="button"
                        className="faq_header_btn"
                        onClick={() => setOpenFaqIdx(isFaqOpen ? null : faqIdx)}
                      >
                        <span>{faq.q}</span>
                        <span className="faq_indicator_icon">
                          {isFaqOpen ? "▲" : "▼"}
                        </span>
                      </button>
                      <div className="faq_body_content">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cscenter_quick_link">
                <h4>직접 1:1 안심 상담 연결망</h4>
                <p>
                  답변을 찾지 못하셨다면 언제든 편하게 아래 1:1 고객센터 버튼을
                  통해 24시간 실시간 전문 상담원에게 말씀해 주세요.
                </p>
                <div className="cscenter_btn_row">
                  <button
                    className="cscenter_btn kakao"
                    onClick={() =>
                      triggerToast(
                        "💬 카카오톡 안심 상담 연결망으로 접속합니다.",
                      )
                    }
                  >
                    카카오 1:1 챗방 연결
                  </button>
                  <button
                    className="cscenter_btn call"
                    onClick={() =>
                      triggerToast(
                        "📞 왓씨 안심콜(1644-1234)로 자동 전화 발신됩니다.",
                      )
                    }
                  >
                    안심 긴급 유선 연결
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 12. 포인트 & 주문 히스토리 상세 뷰 (point-history) */}
        {currentMenu === "point-history" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <div
                className="menu_svg_illustration"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "56px" }}>🪙</span>
              </div>
              <span
                className="menu_hero_badge"
                style={{
                  color: "#2563eb",
                  backgroundColor: "rgba(37, 99, 235, 0.12)",
                }}
              >
                Point History
              </span>
              <h1 className="menu_hero_title" style={{ color: "#1e3a8a" }}>
                주문 및 포인트 이용 내역
              </h1>
              <p className="menu_hero_subtitle">
                고객님이 이용하신 세탁 내역과 적립/사용된 안심 보너스 포인트를
                투명히 알립니다.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">
                📦 나의 안심 포인트 적립 내역
              </h2>

              <div className="point_history_list">
                <div className="point_history_card">
                  <div className="point_card_header">
                    <span className="point_date">2026.05.27</span>
                    <span className="point_val type_earn">+50P</span>
                  </div>
                  <h4>매일 출석체크 챌린지 4일차 보너스</h4>
                  <p>안심 출석체크 스탬프 판 누적 적립 성공</p>
                </div>

                <div className="point_history_card">
                  <div className="point_card_header">
                    <span className="point_date">2026.05.20</span>
                    <span className="point_val type_earn">+100P</span>
                  </div>
                  <h4>생활빨래 프리미엄 M팩 클리닝 완료 보너스</h4>
                  <p>주문 번호: #WT-20260520-001 보상 적립</p>
                </div>

                <div className="point_history_card">
                  <div className="point_card_header">
                    <span className="point_date">2026.05.12</span>
                    <span className="point_val type_earn">+5,000P</span>
                  </div>
                  <h4>친구 초대 이벤트 친구 첫 가입 변환 성공</h4>
                  <p>친구 추천 아이디: WATC-FRIEND-LOVE 보너스</p>
                </div>

                <div className="point_history_card">
                  <div className="point_card_header">
                    <span className="point_date">2026.04.15</span>
                    <span className="point_val type_use">-2,000P</span>
                  </div>
                  <h4>와이셔츠 단품 칼각 드레스 프레스 세탁 차감</h4>
                  <p>주문 할인 결제 포인트 사용 처리 완료</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 13. 쿠폰함 상세 뷰 (coupons) */}
        {currentMenu === "coupons" && (
          <div className="menu_detail_content animate_fade_in">
            <section
              className="menu_hero_box"
              style={{
                background: "linear-gradient(135deg, #fff1f2, #ffe4e6)",
              }}
            >
              <div
                className="menu_svg_illustration"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "56px" }}>🎟️</span>
              </div>
              <span
                className="menu_hero_badge"
                style={{
                  color: "#e11d48",
                  backgroundColor: "rgba(244, 63, 94, 0.12)",
                }}
              >
                My Coupons
              </span>
              <h1 className="menu_hero_title" style={{ color: "#9f1239" }}>
                나의 보증 쿠폰함
              </h1>
              <p className="menu_hero_subtitle">
                고객님이 세탁 예약 결제 시 바로 사용할 수 있는 왓씨 쿠폰
                리스트입니다.
              </p>
            </section>

            <section className="menu_section_body">
              <h2 className="body_section_title">🎟️ 보유 중인 쿠폰 2장</h2>

              <div className="coupons_list">
                <div className="coupon_card_item">
                  <div className="coupon_dashed_divider"></div>
                  <div className="coupon_body">
                    <span className="coupon_benefit">3,000원 할인</span>
                    <h4 className="coupon_name">
                      신규 가입 안심 무료 세탁 쿠폰
                    </h4>
                    <p className="coupon_exp">사용 기한: 2026.06.30 까지</p>
                  </div>
                  <button
                    className="coupon_use_now_btn"
                    onClick={() => {
                      navigate("/home?tab=reserve");
                      triggerToast(
                        "🎟️ 안심 신규 쿠폰이 결제창에 자동 적용 배정됩니다!",
                      );
                    }}
                  >
                    사용
                  </button>
                </div>

                <div className="coupon_card_item">
                  <div className="coupon_dashed_divider"></div>
                  <div className="coupon_body">
                    <span className="coupon_benefit">10% OFF</span>
                    <h4 className="coupon_name">
                      장마철 뽀송뽀송 생활빨래 기습 할인
                    </h4>
                    <p className="coupon_exp">사용 기한: 2026.06.15 까지</p>
                  </div>
                  <button
                    className="coupon_use_now_btn"
                    onClick={() => {
                      navigate("/home?tab=reserve");
                      triggerToast(
                        "🎟️ 10% OFF 쿠폰이 결제창에 자동 적용 배정됩니다!",
                      );
                    }}
                  >
                    사용
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 안전 스크롤 하단 빈 공간 패딩 */}
        <div style={{ height: "100px" }} />

        {/* 하단 공통 예약 유도 그라데이션 플로팅 액션바 */}
        <div className="mypagedetail_floating_action_bar">
          <button
            type="button"
            className={`mypagedetail_cta_btn ${currentMenu === "invite-friend" ? "is-subtle" : ""}`}
            onClick={() => navigate("/home?tab=reserve")}
            style={{
              background:
                currentMenu === "invite-friend"
                  ? "rgba(59, 130, 246, 0.12)"
                  : currentMenu === "care-guide"
                    ? "linear-gradient(135deg, #059669, #0284c7)"
                    : currentMenu === "price-basic"
                      ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                      : currentMenu === "price-category"
                        ? "linear-gradient(135deg, #d97706, #b45309)"
                        : currentMenu === "active-orders"
                          ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
                          : currentMenu === "washing-rules"
                            ? "linear-gradient(135deg, #10b981, #059669)"
                            : currentMenu === "alert-settings"
                              ? "linear-gradient(135deg, #7c3aed, #5b21b6)"
                              : currentMenu === "attendance-check"
                                ? "linear-gradient(135deg, #eab308, #ca8a04)"
                                : currentMenu === "notices"
                                  ? "linear-gradient(135deg, #475569, #334155)"
                                  : currentMenu === "customer-center"
                                    ? "linear-gradient(135deg, #0d9488, #115e59)"
                                    : currentMenu === "point-history"
                                      ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                                      : currentMenu === "coupons"
                                        ? "linear-gradient(135deg, #e11d48, #9f1239)"
                                        : "linear-gradient(135deg, #ea580c, #c2410c)",
              color: currentMenu === "invite-friend" ? "#1e3a8a" : "#ffffff",
              border: currentMenu === "invite-friend" ? "1px solid rgba(59, 130, 246, 0.24)" : "none",
              padding: currentMenu === "invite-friend" ? "12px 16px" : "16px 18px",
              fontSize: currentMenu === "invite-friend" ? "13px" : "14px",
            }}
          >
            <span>✨ 왓씨 프리미엄 안심 세탁 예약하기</span>
          </button>
        </div>

        {/* 가상 모바일 토스트 알림창 */}
        <div
          className={`detail_toast ${toastMessage ? "show" : ""}`}
          role="status"
        >
          {toastMessage}
        </div>
      </div>
    </div>
  );
}

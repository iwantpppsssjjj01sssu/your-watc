import { useState, useEffect } from "react";
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

  const handleAction = (actionName: string) => {
    triggerToast(`✨ [${actionName}] 서비스 페이지로 이동합니다!`);
  };

  const reviewTags = ["전체", "의류", "신발", "침구", "생활빨래", "패션잡화"];

  // 리뷰 데이터 매핑 (간단 샘플 데이터)
  const reviewsData: Record<string, Array<any>> = {
    전체: [
      {
        stars: "★★★★★",
        user: "행복이님",
        date: "26.04.15",
        body: `맡기까지 제가 원했던 게 다 담겨서 좋았어요. 처음으로 산 비싼 새 이불이라 걱정했는데, 어디하나 망가진 곳 없이 와서 매우 만족해요.`,
        img: o1Img,
        tags: ["일반이불", "새 심플이요"],
      },
      {
        stars: "★★★★★",
        user: "깔끔러버님",
        date: "26.05.02",
        body: `셔츠 칼라 찌든 때가 감쪽같이 사라졌어요! 세탁소 오고 가는 시간 아껴서 집 앞 수거배송 받는게 이렇게 편리한 줄 이제야 알았습니다.`,
        img: l1Img,
        tags: ["셔츠크리닝", "수거배송"],
      },
      {
        stars: "★★★★★",
        user: "빨래고수님",
        date: "26.05.20",
        body: `겨울 롱코트 두 벌과 패딩 맡겼는데 보풀 제거 서비스까지 꼼꼼히 챙겨서 돌려주셨네요. 세탁 품질과 포장 상태가 대기업 서비스 이상입니다.`,
        img: k1Img,
        tags: ["프리미엄케어", "아우터"],
      },
    ],
    의류: [
      {
        stars: "★★★★★",
        user: "깔끔러버님",
        date: "26.05.02",
        body: `셔츠 칼라 찌든 때가 감쪽같이 사라졌어요!`,
        img: l1Img,
        tags: ["셔츠크리닝"],
      },
      {
        stars: "★★★★★",
        user: "빨래고수님",
        date: "26.05.20",
        body: `겨울 롱코트 두 벌과 패딩 맡겼는데 보풀 제거 서비스까지 꼼꼼히 챙겨서 돌려주셨어요.`,
        img: k1Img,
        tags: ["아우터"],
      },
    ],
    신발: [
      {
        stars: "★★★★★",
        user: "스니커즈왕",
        date: "26.03.10",
        body: `신발 세탁 품질이 좋아서 자주 맡겨요. 색감 살아났습니다.`,
        img: r1Img,
        tags: ["스니커즈"],
      },
    ],
    침구: [
      {
        stars: "★★★★★",
        user: "행복이님",
        date: "26.04.15",
        body: `처음으로 산 비싼 새 이불이라 걱정했는데, 어디하나 망가진 곳 없이 와서 매우 만족해요.`,
        img: o1Img,
        tags: ["일반이불"],
      },
    ],
    생활빨래: [
      {
        stars: "★★★★★",
        user: "깔끔러버님",
        date: "26.05.02",
        body: `수거배송이 빠르고 편리합니다.`,
        img: l1Img,
        tags: ["수거배송"],
      },
    ],
    패션잡화: [
      {
        stars: "★★★★★",
        user: "패션러",
        date: "26.02.20",
        body: `가방과 악세서리 관리가 만족스러워요.`,
        img: m1Img,
        tags: ["가방"],
      },
    ],
  };

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
                세탁 <span className="blue_percent">66%</span> 진행 중
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
                {/* Premium Sweater image in center */}
                <img
                  src={e1Img}
                  alt="세탁할 파란 스웨터"
                  className="home_circle_image_with_bg"
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
              <div className="home_col_image home_col_image--flat">
                <svg
                  viewBox="0 0 24 24"
                  width="88"
                  height="88"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V7z" />
                  <path d="M7 8h10v6H7z" />
                </svg>
              </div>
            </div>
          </section>

          {/* 카테고리 버튼 (3열) */}
          <section className="home_types_section">
            <div className="home_laundry_row">
              <button
                className="type_card"
                onClick={() => handleAction("일반세탁 안내")}
              >
                <svg
                  className="type_icon_svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 7h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7z" />
                  <path d="M9 7v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
                <div className="type_label">의류</div>
              </button>

              <button
                className="type_card"
                onClick={() => handleAction("침구세탁 안내")}
              >
                <svg
                  className="type_icon_svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M7 10h10" />
                </svg>
                <div className="type_label">침구</div>
              </button>

              <button
                className="type_card"
                onClick={() => handleAction("아우터케어 안내")}
              >
                <svg
                  className="type_icon_svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 21v-7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7" />
                  <path d="M12 3v4" />
                </svg>
                <div className="type_label">아우터</div>
              </button>
            </div>
          </section>

          {/* 대표 가격표 - Full width card */}
          <section className="home_price_full">
            <div className="home_price_card home_price_card--full">
              <h4 className="price_card_title">대표 가격표</h4>
              <div className="price_row">
                <span className="price_item">셔츠</span>
                <span className="price_val">5,900원</span>
              </div>
              <div className="price_row">
                <span className="price_item">이불(일반)</span>
                <span className="price_val">22,000원</span>
              </div>
              <div className="price_row">
                <span className="price_item">아우터(코트)</span>
                <span className="price_val">18,000원</span>
              </div>
            </div>
          </section>

          {/* AI 세탁 가이드 가로형 배너 */}
          <section className="home_guide_section">
            <div
              className="home_guide_banner"
              onClick={() => handleAction("AI 세탁 가이드")}
            >
              <div className="home_guide_left">
                <img
                  src={k1Img}
                  alt="AI 세탁 가이드"
                  className="home_guide_hand_img"
                />
              </div>
              <div className="home_guide_right">
                <h3 className="home_guide_title">AI 세탁 가이드</h3>
                <p className="home_guide_desc">
                  사진을 찍어서 옷에 맞는 <br></br>세탁법을~확인해보세요
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
          {/* 상단 파란색 몰입형 헤더 (오늘 세탁 맡기기) */}
          <header className="reserve_header">
            <span className="reserve_hero_badge">Smart Wet-Cleaning</span>
            <h1 className="reserve_header_title">오늘 세탁 맡기기</h1>
            <p className="reserve_header_desc">
              널부러진 빨래 걱정은 이제 그만.<br />
              60초 예약으로 다음 날 바로 깨끗하게!
            </p>
          </header>

          {/* 예약하기 버튼 - Hero 아래 걸쳐지는 Pill 구조 */}
          <section className="reserve_btn_container">
            <button
              className="reserve_main_btn"
              onClick={() => handleAction("세탁 예약하기")}
            >
              지금 세탁 예약하기
            </button>
          </section>

          {/* 중앙 3D 브랜드 오브젝트 일러스트 (e1Img - 3D Blue Sweater) */}
          <section className="reserve_basket_container">
            <div className="reserve_basket_glow" aria-hidden="true" />
            <img
              src={e1Img}
              alt="3D 세탁 서비스 예약"
              className="reserve_basket_img"
            />
          </section>

          {/* 하단 가로형 AI 세탁 가이드 배너 (오른쪽에 k11Img) */}
          <section
            className="reserve_guide_banner"
            onClick={() => handleAction("AI 세탁 가이드")}
          >
            <div className="reserve_guide_left">
              <h3 className="reserve_guide_title">AI 세탁 가이드</h3>
              <p className="reserve_guide_desc">
                사진을 찍어서 최적의 세탁법을 스마트하게 확인해보세요.
              </p>
            </div>
            <div className="reserve_guide_right">
              <img
                src={k11Img}
                alt="AI 세탁 가이드"
                className="reserve_guide_hand_img"
              />
            </div>
          </section>
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
          <header className="delivery_header">
            <h1 className="delivery_title">수거 · 배송 현황</h1>
            <p className="delivery_subtitle">
              소중한 세탁물의 실시간 이동 경로입니다.
            </p>
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
            <h1 className="care_title">의류 케어 매니저</h1>
            <p className="care_subtitle">
              의류 등록, AI 소재 분석부터 주기 관리 및 맞춤 라이프케어
            </p>
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
      <BottomNav />

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

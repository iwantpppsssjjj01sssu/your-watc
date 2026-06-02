import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeliveryPage.css";
import { BottomNav } from "../../components/BottomNav";

// --- Rider Avatar Images ---
import riderMinsuImg from "../../asset/img/rider_minsu.png";
import riderJinwooImg from "../../asset/img/rider_jinwoo.png";
import riderYunseoImg from "../../asset/img/rider_yunseo.png";

export function DeliveryPage() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
    accuracy: number;
  } | null>(null);
  const [trackingState, setTrackingState] = useState<
    "idle" | "requesting" | "tracking" | "error"
  >("idle");
  const [geoError, setGeoError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  // --- GPS Tracking Live Simulation States ---
  const [simCoords, setSimCoords] = useState({
    lat: 37.501534,
    lng: 127.039211,
  });
  const [trackingActive] = useState(true);
  const [satellites, setSatellites] = useState(11);
  const [etaMinutes, setEtaMinutes] = useState(10);

  // --- Premium Swappable Riders Database & State ---
  const ridersList = [
    {
      id: 1,
      name: "김민수",
      rating: "4.9",
      contact: "010-1234-5678",
      eta: "10분 내 도착 예정",
      bio: "안전 신속 배송 전문 마스터",
      img: riderMinsuImg,
    },
    {
      id: 2,
      name: "박진우",
      rating: "4.8",
      contact: "010-5678-1234",
      eta: "15분 내 도착 예정",
      bio: "정성 친절 배송 전문 마스터",
      img: riderJinwooImg,
    },
    {
      id: 3,
      name: "최윤서",
      rating: "5.0",
      contact: "010-9876-5432",
      eta: "8분 내 도착 예정",
      bio: "섬세 의류 케어 안심 마스터",
      img: riderYunseoImg,
    },
  ];

  const [selectedRiderIndex, setSelectedRiderIndex] = useState(0);
  const [showRiderModal, setShowRiderModal] = useState(false);
  const currentRider = ridersList[selectedRiderIndex];
  const [expandedStep, setExpandedStep] = useState<number | null>(2); // 현재 단계 기본 열림
  const [receiptToast, setReceiptToast] = useState(false);
  const [notiImminent, setNotiImminent] = useState(true); // 도착 임박 알림
  const [notiComplete, setNotiComplete] = useState(true); // 도착 완료 알림
  const progressPct = 33;

  const showReceiptToast = () => {
    setReceiptToast(true);
    setTimeout(() => setReceiptToast(false), 2800);
  };

  useEffect(() => {
    let interval: any;
    if (trackingActive) {
      interval = setInterval(() => {
        setSimCoords((prev) => ({
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

  const handleLocationSuccess = (geo: GeolocationPosition) => {
    setPosition({
      lat: Number(geo.coords.latitude.toFixed(6)),
      lng: Number(geo.coords.longitude.toFixed(6)),
      accuracy: Number(geo.coords.accuracy.toFixed(1)),
    });
    setTrackingState("tracking");
    setGeoError(null);
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    setGeoError(error.message);
    setTrackingState("error");
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setGeoError("GPS를 지원하지 않는 기기입니다.");
      setTrackingState("error");
      return;
    }

    setTrackingState("requesting");
    const id = navigator.geolocation.watchPosition(
      handleLocationSuccess,
      handleLocationError,
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 15000,
      },
    );
    setWatchId(id);
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // 페이지 진입 시 최상단 스크롤 리셋
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div
      className={`delivery_container page-enter${!showContent ? " delivery_container--hero" : ""}`}
    >
      <header className="delivery_header">
        <button
          type="button"
          className="premium_back_btn"
          onClick={() => {
            if (showContent) {
              setShowContent(false);
            } else {
              navigate(-1);
            }
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="delivery_title">수거·배송 현황</h1>
        <div className="delivery_header_right_spacer" />
      </header>

      <div className="delivery_content">
        {/* ── 캐릭터 히어로 섹션 — OK 전에만 노출 ── */}
        {!showContent && (
          <div className="delivery_hero_section">
            <div className="delivery_hero_char_wrap">
              <img
                src={riderYunseoImg}
                alt="수거 마스터"
                className="delivery_hero_char_img"
              />
            </div>
            <div className="delivery_hero_bubble">
              <p className="delivery_hero_bubble_text">
                수거 요청이나 예약 정보를
                <br />
                확인하시겠어요?
              </p>
            </div>
            <button
              type="button"
              className="delivery_hero_ok_btn"
              onClick={() => setShowContent(true)}
            >
              OK
            </button>
          </div>
        )}

        {showContent && (
          <>
            <p className="delivery_content_subtitle">
              수거 요청 접수 · 예약 정보 확인
            </p>

            {/* 예약 정보 확인 카드 */}
            <div className="rsv_info_card">
              <div className="rsv_info_top">
                <span className="rsv_info_badge">예약 완료</span>
                <span className="rsv_info_ordernum">WTC-8311-9C94</span>
              </div>
              <div className="rsv_today_row">
                <span className="rsv_today_badge">05.27 (월) 주문 접수</span>
                <span className="rsv_today_desc">
                  현재 배송 진행 중 · 오늘 밤 도착 예정
                </span>
              </div>
              <h2 className="rsv_info_title">예약 정보 확인</h2>
              <div className="rsv_info_grid">
                <div className="rsv_info_cell">
                  <span className="rsv_info_label">예약일</span>
                  <strong className="rsv_info_val">05.27 (월)</strong>
                </div>
                <div className="rsv_info_cell">
                  <span className="rsv_info_label">세탁 종류</span>
                  <strong className="rsv_info_val">아우터 · 가죽</strong>
                </div>
                <div className="rsv_info_cell">
                  <span className="rsv_info_label">수거 장소</span>
                  <strong className="rsv_info_val">공동현관 문 앞</strong>
                </div>
                <div className="rsv_info_cell">
                  <span className="rsv_info_label">배달 주소</span>
                  <strong className="rsv_info_val">반포동 410호</strong>
                </div>
              </div>
              <div className="rsv_info_status">
                <span className="rsv_status_dot" />
                <span className="rsv_status_text">
                  배송 출발 · 오늘 밤 11시 도착 예정
                </span>
              </div>
            </div>

            <section className="delivery_section">
              <div className="delivery_section_header">
                <div>
                  <p className="delivery_section_label">라이더 배정</p>
                  <h2 className="delivery_section_title">라이더 정보 확인</h2>
                </div>
                <div className="delivery_badge_group">
                  <span className="delivery_status_badge">배정 완료</span>
                  <button
                    type="button"
                    className="delivery_rider_change_btn"
                    onClick={() => setShowRiderModal(true)}
                  >
                    바꾸기
                  </button>
                </div>
              </div>

              <div className="delivery_rider_card">
                <div className="delivery_rider_avatar_container">
                  <img
                    src={currentRider.img}
                    alt={`${currentRider.name} 마스터 프로필`}
                    className="delivery_rider_avatar_img"
                  />
                  <div className="delivery_rider_avatar_glow" />
                </div>

                <div className="delivery_rider_info">
                  <div className="rider_header_row">
                    <h3 className="delivery_rider_name">
                      {currentRider.name} 마스터
                    </h3>
                    <span className="delivery_rider_rating">
                      ★ {currentRider.rating}
                    </span>
                  </div>

                  <div className="delivery_rider_eta_badge">
                    <span className="eta_icon">🕒</span>
                    <span className="eta_text">{currentRider.eta}</span>
                  </div>

                  <p className="delivery_rider_bio">"{currentRider.bio}"</p>

                  <div className="rider_contact_row">
                    <a
                      href={`tel:${currentRider.contact}`}
                      className="rider_contact_call_btn"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>전화하기</span>
                    </a>
                    <span className="delivery_rider_contact_txt">
                      {currentRider.contact}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="delivery_section">
              <div className="delivery_section_header">
                <div>
                  <p className="delivery_section_label">수거 진행</p>
                  <h2 className="delivery_section_title">
                    실시간 위치 확인부터 인증까지
                  </h2>
                </div>
              </div>

              <div className="delivery_grid">
                <article className="delivery_card delivery_card--map">
                  {/* 배송 경로 안내 */}
                  <div className="gps_prev_order_banner">
                    <span className="gps_prev_order_icon">🚚</span>
                    <div className="gps_prev_order_text">
                      <strong>05.27 접수 주문 · 현재 배송 이동 중</strong>
                      <span>
                        어제(06.01) 16:45 배송 마스터가 출발했습니다. 오늘 밤
                        11시 도착 예정이며 스마트 팩토리 → 우리집 경로로 이동
                        중입니다.
                      </span>
                    </div>
                  </div>

                  <div className="delivery_gps_card_header">
                    <div className="gps_header_title_group">
                      <span
                        className={`gps_section_badge ${position ? "gps_section_badge--real" : ""}`}
                      >
                        {position
                          ? "REAL-TIME HARDWARE GPS CONNECTED"
                          : "GPS LIVE CONNECTED"}
                      </span>
                      <h3 className="gps_card_title">
                        실시간 수거 · 배송 경로
                      </h3>
                      <p className="gps_delivery_status_msg">
                        세나님이 05월 27일에 시킨 배송물이 배달되고 있어요 🚚
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`delivery_location_button ${trackingState === "requesting" ? "delivery_location_button--requesting" : ""} ${position ? "delivery_location_button--connected" : ""}`}
                      onClick={startTracking}
                      disabled={trackingState === "requesting"}
                    >
                      <span
                        className={`gps_pulse_dot ${trackingState === "tracking" ? "gps_pulse_dot--active" : "gps_pulse_dot--inactive"}`}
                      />
                      <span>
                        {trackingState === "idle" && "기기 GPS 연결"}
                        {trackingState === "requesting" && "연결 요청중..."}
                        {trackingState === "tracking" && "GPS 수신 완료"}
                        {trackingState === "error" && "재연결 시도"}
                      </span>
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
                        className="delivery_neon_glowing_path delivery_neon_glowing_path--active"
                        stroke="url(#neon-route-grad-2)"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />

                      {/* SVG gradients */}
                      <defs>
                        <linearGradient
                          id="neon-route-grad-2"
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
                      <g className="gps_delivery_rider_glider gps_delivery_rider_glider--active">
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

                      {/* Hardware Real GPS Pin Overlay - If permission granted */}
                      {position && (
                        <g transform="translate(180, 110)">
                          <circle
                            cx="0"
                            cy="0"
                            r="16"
                            className="gps_real_position_pulse"
                            fill="#10b981"
                            opacity="0.25"
                          />
                          <circle
                            cx="0"
                            cy="0"
                            r="8"
                            fill="#10b981"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <path
                            d="M-4 -4 L4 4 M4 -4 L-4 4"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                        </g>
                      )}
                    </svg>

                    {/* Floating Glassmorphic Telemetry Monitor Panel */}
                    <div className="gps_telemetry_glass_panel">
                      <div className="telemetry_row">
                        <div className="telemetry_item">
                          <span className="tele_label">위도(Latitude)</span>
                          <strong className="tele_val font_mono">
                            {position
                              ? position.lat.toFixed(6)
                              : simCoords.lat.toFixed(6)}
                            °
                          </strong>
                        </div>
                        <div className="telemetry_item">
                          <span className="tele_label">경도(Longitude)</span>
                          <strong className="tele_val font_mono">
                            {position
                              ? position.lng.toFixed(6)
                              : simCoords.lng.toFixed(6)}
                            °
                          </strong>
                        </div>
                      </div>

                      <div className="telemetry_divider" />

                      <div className="telemetry_row">
                        <div className="telemetry_item">
                          <span className="tele_label">위성 수신</span>
                          <strong className="tele_val highlight_green">
                            {position
                              ? "14 SAT (실제)"
                              : `${satellites} 수신중`}
                          </strong>
                        </div>
                        <div className="telemetry_item">
                          <span className="tele_label">위치 정확도</span>
                          <strong className="tele_val">
                            {position
                              ? `±${position.accuracy}m (정밀)`
                              : "±1.6m (예측)"}
                          </strong>
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

                  {/* Accuracy check footer info / error warning */}
                  {progressPct < 66 ? (
                    <div className="gps_accuracy_info_footer gps_accuracy_info_footer--warning">
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                      <span>
                        실시간 GPS 위성 신호 감도 정상 (수신 상태 양호)
                      </span>
                    </div>
                  ) : geoError ? (
                    <div className="gps_accuracy_info_footer gps_accuracy_info_footer--error">
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      <span>
                        기기 GPS 수신 지연: {geoError} (시뮬레이션 모드로 지속
                        트래킹 가능)
                      </span>
                    </div>
                  ) : (
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
                      <span>
                        {position
                          ? "사용자 실시간 Geolocation 위치 신호 동기화 성공 (안정)"
                          : "실시간 GPS 위성 신호 감도 정상 (수신 상태 양호)"}
                      </span>
                    </div>
                  )}
                </article>

                {/* 도착 정보 카드 */}
                <article className="arrival_info_card">
                  {/* 상단: 레이블만 */}
                  <div className="arrival_top_row">
                    <div className="arrival_label_group">
                      <span className="arrival_section_label">
                        ARRIVAL INFO
                      </span>
                      <h3 className="arrival_title">도착 정보</h3>
                    </div>
                  </div>

                  {/* 진행 바 */}
                  <div className="arrival_progress_wrap">
                    <div className="arrival_progress_track">
                      <div className="arrival_progress_fill" />
                      <div className="arrival_progress_dot" />
                    </div>
                    <div className="arrival_progress_labels">
                      <span>세탁 공장 출발</span>
                      <div className="arrival_progress_center">
                        <span className="arrival_progress_now">
                          현재 이동 중
                        </span>
                        <span className="arrival_eta_inline">
                          🕐 약 {etaMinutes}분 후 도착
                        </span>
                      </div>
                      <span>우리집</span>
                    </div>
                  </div>

                  {/* 도착지 주소 */}
                  <div className="arrival_address_row">
                    <div className="arrival_address_icon_wrap">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="arrival_address_label">배달지</p>
                      <p className="arrival_address_text">
                        반포동 왓씨타워 410호
                      </p>
                    </div>
                  </div>

                  {/* 알림 상태 배지 */}
                  <div className="arrival_noti_row">
                    <button
                      type="button"
                      className={`arrival_noti_item ${notiImminent ? "arrival_noti_item--on" : "arrival_noti_item--off"}`}
                      onClick={() => setNotiImminent((v) => !v)}
                    >
                      <span
                        className={`arrival_noti_dot ${notiImminent ? "" : "arrival_noti_dot--off"}`}
                      />
                      <span>도착 임박 알림</span>
                      <span
                        className={`arrival_noti_status ${notiImminent ? "" : "arrival_noti_status--off"}`}
                      >
                        {notiImminent ? "ON" : "OFF"}
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`arrival_noti_item ${notiComplete ? "arrival_noti_item--on" : "arrival_noti_item--off"}`}
                      onClick={() => setNotiComplete((v) => !v)}
                    >
                      <span
                        className={`arrival_noti_dot ${notiComplete ? "" : "arrival_noti_dot--off"}`}
                      />
                      <span>도착 완료 알림</span>
                      <span
                        className={`arrival_noti_status ${notiComplete ? "" : "arrival_noti_status--off"}`}
                      >
                        {notiComplete ? "ON" : "OFF"}
                      </span>
                    </button>
                  </div>
                </article>

                {/* 수거 방식 진행 */}
                <article className="collection_method_card">
                  {/* 헤더 */}
                  <div className="collection_header">
                    <div>
                      <span className="collection_section_label">
                        COLLECTION METHOD
                      </span>
                      <h3 className="collection_title">수거 방식 진행</h3>
                    </div>
                    <span className="collection_done_badge">
                      <svg
                        viewBox="0 0 24 24"
                        width="11"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      수거 완료
                    </span>
                  </div>

                  {/* 선택된 방식 강조 카드 */}
                  <div className="collection_selected_card">
                    <div className="collection_selected_icon_wrap">
                      <span className="collection_selected_icon">🚪</span>
                    </div>
                    <div className="collection_selected_info">
                      <p className="collection_selected_label">
                        현재 선택된 수거 방식
                      </p>
                      <p className="collection_selected_name">문 앞 수거</p>
                      <p className="collection_selected_desc">
                        공동현관 문 앞에서 직접 수거합니다
                      </p>
                    </div>
                    <div className="collection_check_circle">
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>

                  {/* 다른 옵션들 */}
                  <div className="collection_options_grid">
                    {[
                      {
                        icon: "🏢",
                        label: "경비실 수거",
                        desc: "경비실에 맡기기",
                      },
                      {
                        icon: "📦",
                        label: "택배함 수거",
                        desc: "무인 택배함 이용",
                      },
                      {
                        icon: "🤝",
                        label: "직접 전달",
                        desc: "마스터와 직접 만남",
                      },
                    ].map((opt) => (
                      <div key={opt.label} className="collection_option_item">
                        <span className="collection_option_icon">
                          {opt.icon}
                        </span>
                        <span className="collection_option_label">
                          {opt.label}
                        </span>
                        <span className="collection_option_desc">
                          {opt.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="delivery_card">
                  <h3>수거 인증</h3>
                  <p>수거 완료 사진, 수거 완료 확인</p>
                  <button className="delivery_confirm_button">
                    수거 완료 확인
                  </button>
                </article>
              </div>
            </section>

            {/* ── 통합 진행 타임라인 ── */}
            {(() => {
              const stages = [
                {
                  id: 0,
                  status: "done" as const,
                  label: "수거 완료",
                  time: "05.30  09:30",
                  desc: "안심팩 밀봉 포장 및 세탁 공장 입고",
                  details: [
                    "수거 마스터 도어픽업 완료",
                    "안심팩 이중 밀봉 포장",
                    "세탁 공장 안전 이송 완료",
                  ],
                  emoji: "🧺",
                },
                {
                  id: 1,
                  status: "done" as const,
                  label: "세탁 완료",
                  time: "05.30  14:00",
                  desc: "프리미엄 저온 스팀 세탁 케어 완료",
                  details: [
                    "소재별 전용 중성 세제 적용",
                    "40°C 저온 스팀 정밀 세탁",
                    "섬유 보호 마감 처리",
                  ],
                  emoji: "✨",
                },
                {
                  id: 2,
                  status: "done" as const,
                  label: "건조 완료",
                  time: "05.31  10:00",
                  desc: "뽀송뽀송 완벽 살균 열풍 건조 완료",
                  details: [
                    "60°C 고온 열풍 완벽 건조 완료",
                    "섬유 손상 및 수축 방지 완료",
                    "살균 드라이 완료",
                  ],
                  emoji: "🌀",
                },
                {
                  id: 3,
                  status: "done" as const,
                  label: "검수 완료",
                  time: "05.31  16:00",
                  desc: "전문 검수팀 오염 및 손상 감지 3단계 합격 완료",
                  details: [
                    "3단계 정밀 품질 검수 합격 완료",
                    "친환경 항균 기능 포장재 적용",
                    "배송 준비 완료",
                  ],
                  emoji: "🔍",
                },
                {
                  id: 4,
                  status: "current" as const,
                  label: "배송 중",
                  time: "06.01  16:45",
                  desc: "배송 마스터 배정 완료 및 우리집으로 배송 이동 중",
                  details: [
                    "배송 마스터 매칭: 최윤서 마스터",
                    "실시간 하드웨어 GPS 경로 연동 중",
                    "배송완료까지 약 10분 남음",
                  ],
                  emoji: "🚚",
                },
                {
                  id: 5,
                  status: "pending" as const,
                  label: "수령 완료",
                  time: null,
                  desc: "배달 완료 및 수령 확인",
                  details: [
                    "도어 앞 배달 완료 예정",
                    "수령 확인 사진 및 알림 발송 예정",
                    "세탁 서비스 최종 완료 예정",
                  ],
                  emoji: "🏠",
                },
              ];

              const doneCount = stages.filter(
                (s) => s.status === "done",
              ).length;
              const progressPct = Math.round((doneCount / stages.length) * 100);
              const currentStage = stages.find((s) => s.status === "current");

              return (
                <section className="laundry_stage_section">
                  {/* 헤더 + 진행률 */}
                  <div className="laundry_stage_top">
                    <div>
                      <p className="delivery_section_label">주문 진행 현황</p>
                      <h2 className="laundry_stage_main_title">
                        세탁 · 배송 스테이지
                      </h2>
                      {currentStage && (
                        <p className="laundry_stage_current_desc">
                          현재 <strong>{currentStage.label}</strong> 단계입니다
                        </p>
                      )}
                    </div>
                    <div className="laundry_pct_badge">
                      <svg viewBox="0 0 36 36" className="laundry_pct_ring">
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="3.5"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="3.5"
                          strokeDasharray={`${progressPct * 0.88} 88`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <span className="laundry_pct_num">{progressPct}%</span>
                    </div>
                  </div>

                  {/* 타임라인 */}
                  <div className="laundry_timeline">
                    {stages.map((stage, idx) => {
                      const isExpanded = expandedStep === stage.id;
                      const isLast = idx === stages.length - 1;
                      return (
                        <div
                          key={stage.id}
                          className={`laundry_step laundry_step--${stage.status}`}
                        >
                          {/* 왼쪽: 도트 + 연결선 */}
                          <div className="laundry_step_track">
                            <div
                              className={`laundry_dot laundry_dot--${stage.status}`}
                            >
                              {stage.status === "done" && (
                                <svg
                                  viewBox="0 0 16 16"
                                  width="14"
                                  height="14"
                                  fill="none"
                                >
                                  <polyline
                                    points="3,8 6.5,11.5 13,4.5"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                              {stage.status === "current" && (
                                <div className="laundry_dot_pulse_inner" />
                              )}
                              {stage.status === "pending" && (
                                <span className="laundry_dot_num">
                                  {idx + 1}
                                </span>
                              )}
                            </div>
                            {!isLast && (
                              <div
                                className={`laundry_connector laundry_connector--${stage.status}`}
                              />
                            )}
                          </div>

                          {/* 오른쪽: 내용 카드 */}
                          <div
                            className={`laundry_step_card laundry_step_card--${stage.status} ${isExpanded ? "laundry_step_card--open" : ""}`}
                            onClick={() =>
                              setExpandedStep(isExpanded ? null : stage.id)
                            }
                            role="button"
                            tabIndex={0}
                          >
                            <div className="laundry_card_row">
                              <span className="laundry_card_emoji">
                                {stage.emoji}
                              </span>
                              <div className="laundry_card_info">
                                <div className="laundry_card_title_row">
                                  <span className="laundry_card_name">
                                    {stage.label}
                                  </span>
                                  <span
                                    className={`laundry_badge laundry_badge--${stage.status}`}
                                  >
                                    {stage.status === "done" && "완료"}
                                    {stage.status === "current" && "진행 중"}
                                    {stage.status === "pending" && "예정"}
                                  </span>
                                </div>
                                <p className="laundry_card_desc">
                                  {stage.desc}
                                </p>
                                {stage.time && (
                                  <span className="laundry_card_time">
                                    {stage.time}
                                  </span>
                                )}
                              </div>
                              <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                className={`laundry_chevron ${isExpanded ? "laundry_chevron--open" : ""}`}
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </div>

                            {/* 확장 상세 */}
                            {isExpanded && (
                              <div className="laundry_detail">
                                {stage.details.map((d, i) => (
                                  <div key={i} className="laundry_detail_row">
                                    <span
                                      className={`laundry_detail_dot laundry_detail_dot--${stage.status}`}
                                    />
                                    <span className="laundry_detail_text">
                                      {d}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })()}

            {/* 배송 단계 확인 */}
            <section className="dstep_section">
              <p className="dstep_section_label">배송 진행</p>
              <h2 className="dstep_section_title">배송 단계 확인</h2>
              <div className="dstep_track_v2">
                {[
                  {
                    icon: "🫧",
                    label: "세탁 완료",
                    sub: "05.30  14:00",
                    status: "done",
                  },
                  {
                    icon: "🌀",
                    label: "건조 완료",
                    sub: "05.31  10:00",
                    status: "done",
                  },
                  {
                    icon: "🚀",
                    label: "배송 출발",
                    sub: "어제 16:45",
                    status: "current",
                  },
                  {
                    icon: "🏠",
                    label: "문 앞 배달",
                    sub: "오늘 밤 11시",
                    status: "pending",
                  },
                ].map((step, i, arr) => (
                  <div key={i} className="dstep_v2_item">
                    {/* 아이콘 + 커넥터 행 */}
                    <div className="dstep_v2_icon_row">
                      <div
                        className={`dstep_v2_circle dstep_v2_circle--${step.status}`}
                      >
                        <span className="dstep_v2_icon">{step.icon}</span>
                        {step.status === "current" && (
                          <span className="dstep_v2_pulse" />
                        )}
                      </div>
                      {i < arr.length - 1 && (
                        <div
                          className={`dstep_v2_line ${step.status === "done" ? "dstep_v2_line--done" : ""}`}
                        />
                      )}
                    </div>
                    {/* 레이블 */}
                    <p
                      className={`dstep_v2_label dstep_v2_label--${step.status}`}
                    >
                      {step.label}
                    </p>
                    <p className="dstep_v2_sub">{step.sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 수령 확인 */}
            <section className="rcv_section">
              <div className="rcv_card">
                {/* 헤더 */}
                <div className="rcv_header">
                  <div className="rcv_icon_box">
                    <svg
                      viewBox="0 0 24 24"
                      width="26"
                      height="26"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="rcv_header_text">
                    <span className="rcv_last_step">LAST STEP</span>
                    <h3 className="rcv_title">수령 확인</h3>
                  </div>
                  <span className="rcv_status_badge">대기 중</span>
                </div>

                {/* 스텝 리스트 */}
                <div className="rcv_steps_card">
                  {[
                    {
                      num: "01",
                      icon: "🔔",
                      text: "배송 완료 알림 수신",
                      desc: "앱 푸시 알림 및 문자로 안내됩니다",
                    },
                    {
                      num: "02",
                      icon: "📦",
                      text: "문 앞에서 세탁물 수령",
                      desc: "안심팩 포장 상태를 확인해 주세요",
                    },
                    {
                      num: "03",
                      icon: "✅",
                      text: "수령 확인 버튼 클릭",
                      desc: "확인 시 포인트 100P가 자동 적립됩니다",
                    },
                  ].map((s, i) => (
                    <div key={i} className="rcv_step_row">
                      <div className="rcv_step_left">
                        <span className="rcv_step_num">{s.num}</span>
                        {i < 2 && <div className="rcv_step_line" />}
                      </div>
                      <div className="rcv_step_body">
                        <span className="rcv_step_icon">{s.icon}</span>
                        <div>
                          <p className="rcv_step_text">{s.text}</p>
                          <p className="rcv_step_desc">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {receiptToast && (
                  <div className="receipt_toast">
                    <span className="receipt_toast_icon">🚚</span>
                    <div>
                      <p className="receipt_toast_title">
                        아직 배송이 완료되지 않았어요
                      </p>
                      <p className="receipt_toast_desc">
                        배달 완료 후 수령 확인이 가능합니다
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="rcv_confirm_btn"
                  onClick={showReceiptToast}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  수령 확인하기
                </button>
                <p className="rcv_notice">
                  배송 완료 후 수령 확인 버튼이 활성화됩니다.
                </p>
              </div>
            </section>
          </>
        )}
      </div>

      {/* 라이더 변경 모달 (Glassmorphic Slide-up Sheet) */}
      {showRiderModal && (
        <div
          className="rider_select_modal_overlay"
          onClick={() => setShowRiderModal(false)}
        >
          <div
            className="rider_select_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rider_modal_header">
              <div className="rider_modal_handle" />
              <h3 className="rider_modal_title">배송 마스터 변경</h3>
              <p className="rider_modal_subtitle">
                소중한 의류 세탁물을 더욱 정성껏 케어해 드릴 마스터를 선택하실
                수 있습니다.
              </p>
            </div>
            <div className="rider_select_list">
              {ridersList.map((rider, idx) => (
                <div
                  key={rider.id}
                  className={`rider_select_item ${idx === selectedRiderIndex ? "rider_select_item--active" : ""}`}
                  onClick={() => {
                    setSelectedRiderIndex(idx);
                    setShowRiderModal(false);
                  }}
                >
                  <div className="rider_select_avatar_wrap">
                    <img
                      src={rider.img}
                      alt={`${rider.name} 마스터`}
                      className="rider_select_avatar_img"
                    />
                    {idx === selectedRiderIndex && (
                      <span className="rider_select_check_badge">✓</span>
                    )}
                  </div>
                  <div className="rider_select_info">
                    <div className="rider_select_name_row">
                      <strong className="rider_select_name">
                        {rider.name} 마스터
                      </strong>
                      <span className="rider_select_rating">
                        ★ {rider.rating}
                      </span>
                    </div>
                    <p className="rider_select_bio">{rider.bio}</p>
                    <span className="rider_select_eta">{rider.eta}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="rider_modal_close_btn"
              onClick={() => setShowRiderModal(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 공통 하단 네비게이션 탭 바 */}
      <BottomNav />
    </div>
  );
}

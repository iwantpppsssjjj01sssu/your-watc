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
  const [distanceToHome, setDistanceToHome] = useState(2380);
  const [trafficDelay, setTrafficDelay] = useState<string | null>(null);

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

  useEffect(() => {
    if (!trackingActive) return;
    const interval = setInterval(() => {
      setDistanceToHome((prev) => {
        if (prev <= 80) return 2380;
        return prev - (8 + Math.floor(Math.random() * 7));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [trackingActive]);

  useEffect(() => {
    if (!trackingActive) return;
    const delayMessages = [
      "반포대로 신호등 대기 중 · 약 2분 지연",
      "서초대로 교차로 신호 대기 · 약 1분 지연",
      "강남대로 신호등 대기 중 · 약 2분 지연",
      "서초대로·동작대로 교차 신호 · 약 3분 지연",
    ];
    let hideTimer: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      if (Math.random() < 0.45) {
        const msg = delayMessages[Math.floor(Math.random() * delayMessages.length)];
        setTrafficDelay(msg);
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => setTrafficDelay(null), 5000);
      }
    }, 20000);
    const initialTimer = setTimeout(() => {
      setTrafficDelay(delayMessages[0]);
      hideTimer = setTimeout(() => setTrafficDelay(null), 5000);
    }, 8000);
    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
      clearTimeout(initialTimer);
    };
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

  const getCurrentRoad = (dist: number): string => {
    if (dist > 1800) return "동작대로";
    if (dist > 800) return "서초대로";
    if (dist > 200) return "강남대로";
    return "반포동 골목길";
  };

  const getLocationDesc = (dist: number): string => {
    if (dist > 1800) return "동작대로 경유 이동 중";
    if (dist > 800) return "서초대로 경유 이동 중";
    if (dist > 400) return "강남대로 진입 완료";
    if (dist > 200) return "반포동 인근 진입";
    return "우리 동네 도착 임박";
  };

  const getEtaTime = (): string => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + etaMinutes);
    const h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "오후" : "오전";
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${ampm} ${h12}:${m}`;
  };

  const deliveryProgressPct = Math.min(
    100,
    Math.round(((2380 - distanceToHome) / 2380) * 100),
  );

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
          <div className="delivery_content_reveal">
            {/* 예약 정보 확인 */}
            <h2 className="laundry_stage_main_title" style={{ marginBottom: 12 }}>예약 정보 확인</h2>
            <div className="rsv_info_card">
              <div className="rsv_today_row">
                <span className="rsv_today_badge">05.27 (월) 주문 접수</span>
              </div>
              <span className="rsv_today_desc">
                현재 배송 진행 중 · 오늘 밤 도착 예정
              </span>
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


            {/* 세탁 배송 스테이지 */}
            <section className="laundry_stage_section">
              <div className="laundry_stage_top">
                <div>
                  <h2 className="laundry_stage_main_title">세탁 · 배송 스테이지</h2>
                </div>
              </div>

              <div className="laundry_timeline">
                {/* 현재 단계: 배송 중 — 항상 맨 위 표시 */}
                <div className="laundry_step laundry_step--current">
                  <div className="laundry_step_track">
                    <div className="laundry_dot laundry_dot--current">
                      <div className="laundry_dot_pulse_inner" />
                    </div>
                    {expandedStep === -1 && <div className="laundry_connector laundry_connector--current" />}
                  </div>
                  <div className="laundry_step_card laundry_step_card--current laundry_step_card--open">
                    <div className="laundry_card_row">
                      <span className="laundry_card_emoji">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                        </svg>
                      </span>
                      <div className="laundry_card_info">
                        <div className="laundry_card_title_row">
                          <span className="laundry_card_name">배송 중</span>
                          <span className="laundry_badge laundry_badge--current">진행 중</span>
                        </div>
                        <p className="laundry_card_desc">배송 마스터 배정 완료 및 우리집으로 배송 이동 중</p>
                        <span className="laundry_card_time">06.01  16:45</span>
                      </div>
                    </div>
                    <div className="laundry_detail">
                      {["배송 마스터 매칭: 최윤서 마스터", "실시간 하드웨어 GPS 경로 연동 중", "배송완료까지 약 10분 남음"].map((d, i) => (
                        <div key={i} className="laundry_detail_row">
                          <span className="laundry_detail_dot laundry_detail_dot--current" />
                          <span className="laundry_detail_text">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 펼치기 버튼 — rcv_steps_card 스타일 */}
                <div style={{ marginLeft: 36, marginBottom: 8 }}>
                  <button
                    type="button"
                    onClick={() => setExpandedStep(expandedStep === -1 ? null : -1)}
                    style={{
                      width: "100%", background: "#ffffff", border: "none",
                      borderRadius: 16, padding: "14px 16px",
                      display: "flex", alignItems: "center", gap: 14,
                      cursor: "pointer", textAlign: "left",
                      boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: expandedStep === -1 ? "#eff6ff" : "#f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                        stroke={expandedStep === -1 ? "#2563eb" : "#64748b"}
                        strokeWidth="2.5" strokeLinecap="round"
                        style={{ transform: expandedStep === -1 ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: expandedStep === -1 ? "#2563eb" : "#334155" }}>
                        {expandedStep === -1 ? "이전 단계 접기" : "이전 단계 펼치기"}
                      </p>
                      <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
                        {expandedStep === -1 ? "수거·세탁·건조·검수 완료 단계" : "수거부터 검수까지 완료된 단계 보기"}
                      </p>
                    </div>
                  </button>
                </div>

                {/* 이전 완료 단계들 — 펼치기 클릭 시 표시 */}
                {expandedStep === -1 && [
                  { label: "수거 완료", time: "05.30  09:30", desc: "안심팩 밀봉 포장 및 세탁 공장 입고",
                    details: ["수거 마스터 도어픽업 완료", "안심팩 이중 밀봉 포장", "세탁 공장 안전 이송 완료"],
                    num: "1" },
                  { label: "세탁 완료", time: "05.30  14:00", desc: "프리미엄 저온 스팀 세탁 케어 완료",
                    details: ["소재별 전용 중성 세제 적용", "40°C 저온 스팀 정밀 세탁", "섬유 보호 마감 처리"],
                    num: "2" },
                  { label: "건조 완료", time: "05.31  10:00", desc: "뽀송뽀송 완벽 살균 열풍 건조 완료",
                    details: ["60°C 고온 열풍 완벽 건조", "섬유 손상 및 수축 방지", "살균 드라이 완료"],
                    num: "3" },
                  { label: "검수 완료", time: "05.31  16:00", desc: "전문 검수팀 오염 및 손상 감지 3단계 합격 완료",
                    details: ["3단계 정밀 품질 검수 합격", "친환경 항균 기능 포장재 적용", "배송 준비 완료"],
                    num: "4" },
                ].map((stage, idx, arr) => (
                  <div key={idx} className="laundry_step laundry_step--done">
                    <div className="laundry_step_track">
                      <div className="laundry_dot laundry_dot--done">
                        <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                          <polyline points="3,8 6.5,11.5 13,4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {idx < arr.length - 1 && <div className="laundry_connector laundry_connector--done" />}
                    </div>
                    <div className="laundry_step_card laundry_step_card--done">
                      <div className="laundry_card_row">
                        <span className="laundry_card_emoji">
                          <span style={{ display:"flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:"50%",background:"#eff6ff",fontSize:11,fontWeight:800,color:"#2563eb" }}>{stage.num}</span>
                        </span>
                        <div className="laundry_card_info">
                          <div className="laundry_card_title_row">
                            <span className="laundry_card_name">{stage.label}</span>
                            <span className="laundry_badge laundry_badge--done">완료</span>
                          </div>
                          <p className="laundry_card_desc">{stage.desc}</p>
                          <span className="laundry_card_time">{stage.time}</span>
                        </div>
                      </div>
                      <div className="laundry_detail">
                        {stage.details.map((d, i) => (
                          <div key={i} className="laundry_detail_row">
                            <span className="laundry_detail_dot laundry_detail_dot--done" />
                            <span className="laundry_detail_text">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* 예정: 수령 완료 — 펼치기 시에만 표시 */}
                {expandedStep === -1 && (
                <div className="laundry_step laundry_step--pending">
                  <div className="laundry_step_track">
                    <div className="laundry_dot laundry_dot--pending">
                      <span className="laundry_dot_num">6</span>
                    </div>
                  </div>
                  <div className="laundry_step_card laundry_step_card--pending">
                    <div className="laundry_card_row">
                      <span className="laundry_card_emoji">
                        <span style={{ display:"flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:"50%",background:"#f1f5f9",fontSize:11,fontWeight:800,color:"#94a3b8" }}>6</span>
                      </span>
                      <div className="laundry_card_info">
                        <div className="laundry_card_title_row">
                          <span className="laundry_card_name">수령 완료</span>
                          <span className="laundry_badge laundry_badge--pending">예정</span>
                        </div>
                        <p className="laundry_card_desc">배달 완료 및 수령 확인</p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </section>

            {/* 수령 확인 */}
            <section className="rcv_section">
              <h2 className="laundry_stage_main_title" style={{ marginBottom: 12 }}>수령 확인</h2>
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
                  <span className="rcv_status_badge">대기 중</span>
                </div>

                {/* 스텝 리스트 */}
                <div className="rcv_steps_card">
                  {[
                    {
                      num: "01",
                      icon: (
                        <svg viewBox="0 0 24 24" width="22" height="22">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9z" fill="#60a5fa"/>
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      ),
                      text: "배송 완료 알림 수신",
                      desc: "앱 푸시 알림 및 문자로 안내됩니다",
                    },
                    {
                      num: "02",
                      icon: (
                        <svg viewBox="0 0 24 24" width="22" height="22">
                          <rect x="1" y="3" width="22" height="5" rx="1" fill="#60a5fa"/>
                          <path d="M3 8v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8z" fill="#60a5fa"/>
                          <line x1="10" y1="13" x2="14" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      ),
                      text: "문 앞에서 세탁물 수령",
                      desc: "안심팩 포장 상태를 확인해 주세요",
                    },
                    {
                      num: "03",
                      icon: (
                        <svg viewBox="0 0 24 24" width="22" height="22">
                          <circle cx="12" cy="12" r="10" fill="#60a5fa"/>
                          <polyline points="7 12 10.5 15.5 17 9" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ),
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
          </div>
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

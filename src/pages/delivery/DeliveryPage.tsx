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
  const [simCoords, setSimCoords] = useState({ lat: 37.501534, lng: 127.039211 });
  const [trackingActive] = useState(true);
  const [satellites, setSatellites] = useState(11);
  const [etaMinutes, setEtaMinutes] = useState(8);

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


  useEffect(() => {
    let interval: any;
    if (trackingActive) {
      interval = setInterval(() => {
        setSimCoords(prev => ({
          lat: Number((prev.lat + (Math.random() - 0.5) * 0.000038).toFixed(6)),
          lng: Number((prev.lng + (Math.random() - 0.5) * 0.000038).toFixed(6)),
        }));
        setSatellites(prev => {
          const change = Math.random() > 0.75 ? (Math.random() > 0.5 ? 1 : -1) : 0;
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
        setEtaMinutes(prev => (prev > 1 ? prev - 1 : 12));
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
    <div className="delivery_container">
      <header className="delivery_header">
        <button
          type="button"
          className="delivery_back_button"
          onClick={() => navigate(-1)}
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
        <p className="delivery_content_subtitle">
          수거 요청 접수 · 예약 정보 확인
        </p>

        <section className="delivery_summary_cards">
          <div className="delivery_summary_card delivery_summary_card--active">
            <p className="delivery_summary_label">수거 요청 접수</p>
            <strong>예약 정보 확인</strong>
          </div>
          <div className="delivery_summary_card">
            <p className="delivery_summary_label">라이더 배정</p>
            <p>라이더 정보 확인</p>
          </div>
        </section>

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
                <h3 className="delivery_rider_name">{currentRider.name} 마스터</h3>
                <span className="delivery_rider_rating">★ {currentRider.rating}</span>
              </div>
              
              <div className="delivery_rider_eta_badge">
                <span className="eta_icon">🕒</span>
                <span className="eta_text">{currentRider.eta}</span>
              </div>

              <p className="delivery_rider_bio">"{currentRider.bio}"</p>
              
              <div className="rider_contact_row">
                <a href={`tel:${currentRider.contact}`} className="rider_contact_call_btn">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>전화하기</span>
                </a>
                <span className="delivery_rider_contact_txt">{currentRider.contact}</span>
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
              <div className="delivery_gps_card_header">
                <div className="gps_header_title_group">
                  <span className={`gps_section_badge ${position ? "gps_section_badge--real" : ""}`}>
                    {position ? "REAL-TIME HARDWARE GPS CONNECTED" : "GPS LIVE CONNECTED"}
                  </span>
                  <h3 className="gps_card_title">실시간 수거 · 배송 경로</h3>
                </div>
                <button
                  type="button"
                  className={`delivery_location_button ${trackingState === "requesting" ? "delivery_location_button--requesting" : ""} ${position ? "delivery_location_button--connected" : ""}`}
                  onClick={startTracking}
                  disabled={trackingState === "requesting"}
                >
                  <span className={`gps_pulse_dot ${trackingState === "tracking" ? "gps_pulse_dot--active" : "gps_pulse_dot--inactive"}`} />
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
                <svg className="delivery_gps_vector_map" viewBox="0 0 358 220" width="100%" height="220" xmlns="http://www.w3.org/2000/svg">
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
                  <path d="M -10 170 Q 50 160, 90 200 T 150 230 L -10 230 Z" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="1" />
                  <path d="M 220 -10 Q 270 30, 310 -10 Z" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="1" />
                  
                  {/* Blue Han-river ribbon */}
                  <path d="M -10 90 Q 80 115, 180 90 T 370 85 L 370 120 Q 280 125, 180 125 T -10 120 Z" fill="#f0f9ff" stroke="#e0f2fe" strokeWidth="1" />
                  <text x="130" y="112" fill="#bae6fd" fontSize="8" fontWeight="700" fontFamily="var(--font-pretendard)" letterSpacing="1">HAN RIVER</text>
                  
                  {/* Decorative Local Roads */}
                  <g stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.9">
                    <line x1="75" y1="0" x2="75" y2="220" />
                    <line x1="275" y1="0" x2="275" y2="220" />
                    <line x1="0" y1="55" x2="358" y2="55" />
                    <line x1="0" y1="165" x2="358" y2="165" />
                  </g>
                  
                  {/* Inner Road Lines */}
                  <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" strokeLinecap="round" opacity="0.6">
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
                    <linearGradient id="neon-route-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Landmarks Labels */}
                  <g transform="translate(45, 122)">
                    <rect x="-35" y="-12" width="70" height="18" rx="5" fill="#334155" />
                    <text x="0" y="1" fill="#ffffff" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="var(--font-pretendard)">스마트 팩토리</text>
                  </g>
                  
                  <g transform="translate(315, 122)">
                    <rect x="-22" y="-12" width="44" height="18" rx="5" fill="#2563eb" />
                    <text x="0" y="1" fill="#ffffff" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="var(--font-pretendard)">우리집</text>
                  </g>

                  {/* Markers pins */}
                  {/* Start Marker */}
                  <circle cx="40" cy="145" r="7" fill="#64748b" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="40" cy="145" r="3" fill="#ffffff" />
                  
                  {/* End Marker (Pulsing User Home) */}
                  <g transform="translate(315, 145)">
                    <circle cx="0" cy="0" r="14" className="gps_map_home_pulse" fill="#2563eb" opacity="0.2" />
                    <circle cx="0" cy="0" r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Gliding Rider vehicle rendered directly in SVG for bulletproof scaling! */}
                  <g className="gps_delivery_rider_glider gps_delivery_rider_glider--active">
                    {/* Ring aura pulse */}
                    <circle cx="0" cy="0" r="13" className="gps_rider_glow_pulse" fill="#3b82f6" opacity="0.3" />
                    <circle cx="0" cy="0" r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                  </g>

                  {/* Hardware Real GPS Pin Overlay - If permission granted */}
                  {position && (
                    <g transform="translate(180, 110)">
                      <circle cx="0" cy="0" r="16" className="gps_real_position_pulse" fill="#10b981" opacity="0.25" />
                      <circle cx="0" cy="0" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                      <path d="M-4 -4 L4 4 M4 -4 L-4 4" stroke="#ffffff" strokeWidth="1.5" />
                    </g>
                  )}
                </svg>

                {/* Floating Glassmorphic Telemetry Monitor Panel */}
                <div className="gps_telemetry_glass_panel">
                  <div className="telemetry_row">
                    <div className="telemetry_item">
                      <span className="tele_label">위도(Latitude)</span>
                      <strong className="tele_val font_mono">
                        {position ? position.lat.toFixed(6) : simCoords.lat.toFixed(6)}°
                      </strong>
                    </div>
                    <div className="telemetry_item">
                      <span className="tele_label">경도(Longitude)</span>
                      <strong className="tele_val font_mono">
                        {position ? position.lng.toFixed(6) : simCoords.lng.toFixed(6)}°
                      </strong>
                    </div>
                  </div>
                  
                  <div className="telemetry_divider" />
                  
                  <div className="telemetry_row">
                    <div className="telemetry_item">
                      <span className="tele_label">위성 수신</span>
                      <strong className="tele_val highlight_green">
                        {position ? "14 SAT (실제)" : `${satellites} 수신중`}
                      </strong>
                    </div>
                    <div className="telemetry_item">
                      <span className="tele_label">위치 정확도</span>
                      <strong className="tele_val">
                        {position ? `±${position.accuracy}m (정밀)` : "±1.6m (예측)"}
                      </strong>
                    </div>
                    <div className="telemetry_item">
                      <span className="tele_label">도착 예정</span>
                      <strong className="tele_val highlight_blue">약 {etaMinutes}분</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accuracy check footer info / error warning */}
              {geoError ? (
                <div className="gps_accuracy_info_footer gps_accuracy_info_footer--error">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span>기기 GPS 수신 지연: {geoError} (시뮬레이션 모드로 지속 트래킹 가능)</span>
                </div>
              ) : (
                <div className="gps_accuracy_info_footer">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="gps_info_icon">
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

            <article className="delivery_card">
              <h3>도착 정보</h3>
              <ul className="delivery_list">
                <li>도착 임박 알림</li>
                <li>도착 완료 알림</li>
              </ul>
            </article>

            <article className="delivery_card">
              <h3>수거 방식 진행</h3>
              <div className="delivery_pill_group">
                <span className="delivery_pill">문 앞 수거</span>
                <span className="delivery_pill">경비실 수거</span>
                <span className="delivery_pill">택배함 수거</span>
                <span className="delivery_pill">직접 전달</span>
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

        <section className="delivery_status_section">
          <div className="delivery_section_header">
            <div>
              <p className="delivery_section_label">세탁 진행 상태</p>
              <h2 className="delivery_section_title">현재 세탁 스테이지</h2>
            </div>
          </div>

          <div className="delivery_step_list">
            <div className="delivery_step_item delivery_step_item--active">
              세탁 접수
            </div>
            <div className="delivery_step_item delivery_step_item--active">
              세탁 중
            </div>
            <div className="delivery_step_item">건조 중</div>
            <div className="delivery_step_item">검수 완료</div>
          </div>
        </section>

        <section className="delivery_status_section">
          <div className="delivery_section_header">
            <div>
              <p className="delivery_section_label">배송 진행</p>
              <h2 className="delivery_section_title">배송 단계 확인</h2>
            </div>
          </div>

          <div className="delivery_action_list">
            <div className="delivery_action_card">
              <p className="delivery_action_label">배송 출발</p>
              <strong>출발 준비 완료</strong>
            </div>
            <div className="delivery_action_card">
              <p className="delivery_action_label">실시간 위치 확인</p>
              <strong>경로를 따라 위치 확인 가능</strong>
            </div>
            <div className="delivery_action_card">
              <p className="delivery_action_label">배송 예상 시간 안내</p>
              <strong>약 25분 후 도착 예정</strong>
            </div>
          </div>
        </section>

        <section className="delivery_status_section delivery_status_section--final">
          <div className="delivery_section_header">
            <div>
              <p className="delivery_section_label">배송 완료</p>
              <h2 className="delivery_section_title">수령 확인</h2>
            </div>
          </div>

          <div className="delivery_completion_card">
            <p>배송 완료 알림</p>
            <p>수령 확인</p>
          </div>
        </section>
      </div>

      {/* 라이더 변경 모달 (Glassmorphic Slide-up Sheet) */}
      {showRiderModal && (
        <div className="rider_select_modal_overlay" onClick={() => setShowRiderModal(false)}>
          <div className="rider_select_modal" onClick={(e) => e.stopPropagation()}>
            <div className="rider_modal_header">
              <div className="rider_modal_handle" />
              <h3 className="rider_modal_title">배송 마스터 변경</h3>
              <p className="rider_modal_subtitle">
                소중한 의류 세탁물을 더욱 정성껏 케어해 드릴 마스터를 선택하실 수 있습니다.
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
                    <img src={rider.img} alt={`${rider.name} 마스터`} className="rider_select_avatar_img" />
                    {idx === selectedRiderIndex && (
                      <span className="rider_select_check_badge">✓</span>
                    )}
                  </div>
                  <div className="rider_select_info">
                    <div className="rider_select_name_row">
                      <strong className="rider_select_name">{rider.name} 마스터</strong>
                      <span className="rider_select_rating">★ {rider.rating}</span>
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


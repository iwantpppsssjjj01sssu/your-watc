import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import f1Img from "../asset/img/f1.png";
import watcLogoImg from "../asset/img/watc_logo.png";
import a1Img from "../asset/img/a1.png";
import h1Img from "../asset/img/h1.png";

export function Splash() {
  const navigate = useNavigate();

  const initialBubbles = useMemo(() => {
    const positions = [12, 28, 46, 64, 82];
    return positions.map((left, index) => ({
      id: index,
      size: 22 + (index % 3) * 6,
      left,
      top: 42 + index * 5,
      delay: index * 0.12,
      duration: 1.4 + index * 0.05,
      type: index % 3,
    }));
  }, []);

  // Animation phases:
  // 0: 초기 버블 채우기 (5개 버블 표시)
  // 1: f1 이미지 + watC 로고 노출
  // 2: 블루 커버 + WASHTHESEE 텍스트 스크롤
  // 3: WASHTHEC 모핑
  // 4: WATC 완성 및 최종 브랜드 화면
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const bubbleTimer = setTimeout(() => setPhase(1), 1800);
    const imageTimer = setTimeout(() => setPhase(2), 3800);
    const textAnimTimer = setTimeout(() => setPhase(3), 5600);
    const morphTimer = setTimeout(() => setPhase(4), 7600);
    const navTimer = setTimeout(() => {
      navigate("/login");
    }, 11800);

    return () => {
      clearTimeout(bubbleTimer);
      clearTimeout(imageTimer);
      clearTimeout(textAnimTimer);
      clearTimeout(morphTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  const handleSkip = () => {
    navigate("/login");
  };

  // 각 Phase별로 렌더링할 텍스트 스플릿 연산
  const getWordLetters = () => {
    if (phase === 2) {
      return "WASHTHESEE".split("").map((c, i) => ({
        char: c,
        isW: c === "W",
        isSuffix: i >= 7, // "SEE" 마킹
        keep: c === "W" || c === "A" || c === "T", // W, A, T만 살아남음
      }));
    }
    if (phase === 3 || phase === 4) {
      return "WASHTHEC".split("").map((c) => ({
        char: c,
        isW: c === "W",
        isSuffix: false,
        keep: c === "W" || c === "A" || c === "T" || c === "C",
      }));
    }
    // Phase 5: "WATC"
    return "WATC".split("").map((c) => ({
      char: c,
      isW: c === "W",
      isSuffix: false,
      keep: true,
    }));
  };

  return (
    <div style={styles.container}>
      <style>{`
        /* --- 로고 컨테이너 세로 스택 정렬 --- */
        .splash_logo_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        /* --- f1 이미지 드롭다운 애니메이션 --- */
        .splash_f1_img {
          animation: imageDrop 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          width: 80px;
          height: auto;
          z-index: 2;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.08));
        }

        /* --- watC 로고 페이드인 애니메이션 --- */
        .splash_watc_logo {
          width: 130px;
          height: auto;
          opacity: 0;
          animation: logoFadeIn 1.0s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;
          z-index: 2;
        }

        @keyframes logoFadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes imageDrop {
          0% { transform: translateY(-80vh) scale(0.6); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* --- 블루 커버 리퀴드 웨이브 트랜지션 --- */
        .blue_cover_layer {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%);
          z-index: 10;
          transform: translateY(100%);
          border-top-left-radius: 50% 18vw;
          border-top-right-radius: 50% 18vw;
          transition: transform 1.45s cubic-bezier(0.22, 1, 0.36, 1), border-radius 1.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.1s ease;
        }

        .blue_cover_layer.active {
          transform: translateY(0);
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }

        /* --- [화려한 트랜지션] 웜홀 페이드 아웃 & 발광 폭발 --- */
        .blue_cover_layer.fade-out {
          transform: scale(1.03) translateY(-20px);
          opacity: 0;
          filter: blur(0px) brightness(1);
          border-bottom-left-radius: 120px;
          border-bottom-right-radius: 120px;
          transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.95s ease;
          pointer-events: none;
        }

        /* --- 텍스트 정중앙 배치 정렬 래퍼 --- */
        .text_wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          z-index: 15;
          transition: opacity 0.34s ease;
        }

        .text_wrapper.fade-out-text {
          opacity: 0;
        }

        /* --- 개별 글자가 들어가는 기본 박스 스타일 --- */
        .scroll_letter_box {
          display: inline-block;
          overflow: hidden;
          height: 54px;
          position: relative;
          width: 32px;
          text-align: center;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .scroll_letter_box.wide-w {
          width: 46px;
        }

        /* --- 방향별 위아래 교차 스크롤 등장 애니메이션 --- */
        .scroll_letter {
          display: inline-block;
          font-family: var(--font-pretendard);
          font-size: 42px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.5px;
          text-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          opacity: 0;
        }

        .scroll_letter.scroll-up.animate {
          animation: letterScrollUp 1.0s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes letterScrollUp {
          0% { transform: translateY(105%) rotateX(-60deg); opacity: 0; filter: blur(3px); }
          100% { transform: translateY(0) rotateX(0deg); opacity: 1; filter: blur(0); }
        }

        .scroll_letter.scroll-down.animate {
          animation: letterScrollDown 1.0s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes letterScrollDown {
          0% { transform: translateY(-105%) rotateX(60deg); opacity: 0; filter: blur(3px); }
          100% { transform: translateY(0) rotateX(0deg); opacity: 1; filter: blur(0); }
        }

        /* --- [자라란 모션] W-A-T-C 글자들이 한 글자씩 입체적으로 연속 팝업 --- */
        .text_wrapper.watc-active .scroll_letter.zararan {
          animation: letterZararan 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important;
          opacity: 0;
        }

        @keyframes letterZararan {
          0% { opacity: 0; transform: scale(0.6) translateY(12px); filter: brightness(0.5) blur(2px); }
          50% { opacity: 0.8; transform: scale(1.22) translateY(-4px); filter: brightness(1.6) drop-shadow(0 0 15px rgba(255,255,255,0.9)); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: brightness(1) blur(0); }
        }

        /* --- 고급스러운 피날레 펄싱 글로우 애니메이션 --- */
        .text_wrapper.pulsing {
          animation: textPulse 2.4s ease-in-out infinite alternate;
        }

        @keyframes textPulse {
          0% { filter: drop-shadow(0 0 8px rgba(255,255,255,0.3)) drop-shadow(0 0 12px rgba(147,197,253,0.2)); transform: scale(1); }
          100% { filter: drop-shadow(0 0 16px rgba(255,255,255,0.6)) drop-shadow(0 0 24px rgba(147,197,253,0.5)); transform: scale(1.02); }
        }

        /* --- [2번 페이지] 흰 배경 + C 로고 + 하강 버블 스타일 --- */
        .brand_c_content_container {
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 15;
        }

        .brand_c1_img {
          width: 140px;
          height: auto;
          object-fit: contain;
          opacity: 0;
          transform: scale(0.72) translateY(5px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .brand_c1_img.reveal {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .initial_bubble_container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 12;
        }

        .initial_bubble {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          box-shadow: inset 0 0 16px rgba(255,255,255,0.75);
          animation: initialBubbleRise 1.5s ease-in-out forwards;
        }

        .initial_bubble.bubble_type_0 {
          background: radial-gradient(circle at 35% 35%, rgba(37, 99, 235, 0.35) 0%, rgba(37, 99, 235, 0.08) 70%, transparent 100%);
          border: 1px solid rgba(37, 99, 235, 0.25);
        }

        .initial_bubble.bubble_type_1 {
          background: radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.22) 0%, rgba(37, 99, 235, 0.06) 80%, transparent 100%);
          border: 1px solid rgba(37, 99, 235, 0.18);
        }

        .initial_bubble.bubble_type_2 {
          background: radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.4) 0%, rgba(240, 246, 255, 0.2) 40%, transparent 100%);
          border: 1px solid rgba(37, 99, 235, 0.3);
        }

        @keyframes initialBubbleRise {
          0% { transform: translateY(28px) scale(0.44); opacity: 0; }
          25% { opacity: 0.85; transform: translateY(2px) scale(0.98); }
          60% { opacity: 0.72; transform: translateY(-16px) scale(1.04); }
          100% { transform: translateY(-38px) scale(0.92); opacity: 0; }
        }

        /* --- [1번 페이지] 브랜드 강화 화면 [로고 및 본문 축소/하향, Slogan 줄임/상향] --- */
        .brand_content_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          animation: none;
          width: 100%;
          max-width: 420px;
          padding: 24px;
          box-sizing: border-box;
        }

        @keyframes brandContentReveal {
          0% { opacity: 0; transform: scale(1.3) translateY(40px); filter: blur(10px) brightness(0.7); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0) brightness(1); }
        }

        .brand_a1_img {
          width: clamp(200px, 60vw, 240px); /* [피드백 적용] 살짝 줄이고 */
          height: auto;
          object-fit: contain;
          animation: gentleFloat 4s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(15, 23, 42, 0.08));
        }

        .brand_h1_img {
          width: clamp(190px, 50vw, 220px);
          height: auto;
          object-fit: contain;
          opacity: 0;
          animation: brandFadeIn 0.8s ease 0.45s forwards;
          margin-top: 16px;
        }

        .brand_slogan {
          font-size: clamp(18px, 5vw, 20px);
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          letter-spacing: -0.4px;
          opacity: 0;
          animation: brandFadeIn 1.0s ease 0.65s forwards;
          text-align: center;
          word-break: keep-all;
          line-height: 1.5;
          margin-top: -10px;
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(22px); } /* [피드백 적용] 아래로 내려오게 함 */
          50% { transform: translateY(14px); }
        }

        @keyframes brandFadeIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* SKIP BUTTON */}
      <button style={styles.skipButton} onClick={handleSkip}>
        Skip
      </button>

      {/* PHASE 0: 초기 버블 채우기 */}
      <div style={styles.baseScreen}>
        {phase === 0 && (
          <div className="initial_bubble_container">
            {initialBubbles.map((bubble) => (
              <div
                key={`initial-bubble-${bubble.id}`}
                className={`initial_bubble bubble_type_${bubble.type}`}
                style={{
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  left: `${bubble.left}%`,
                  top: `${bubble.top}%`,
                  animationDelay: `${bubble.delay}s`,
                  animationDuration: `${bubble.duration}s`,
                }}
              />
            ))}
          </div>
        )}
        {phase >= 1 && phase < 4 && (
          <div className="splash_logo_container">
            <img
              src={f1Img}
              alt="f1 Laundry Service"
              className="splash_f1_img"
            />
            <img
              src={watcLogoImg}
              alt="watC Logo"
              className="splash_watc_logo"
            />
          </div>
        )}
      </div>

      {/* PHASE 2 ~ 3: 블루 스크린 및 타이포 모션 */}
      <div
        className={`blue_cover_layer ${phase >= 2 && phase < 4 ? "active" : ""} ${phase === 4 ? "fade-out" : ""}`}
      >
        {phase >= 2 && phase < 4 && (
          <div style={styles.textContainer}>
            <div
              key={`text-phase-${phase === 2 ? "see" : "c"}`}
              className={`text_wrapper 
                ${phase >= 3 ? "morphing-active" : ""} 
                ${phase >= 4 ? "watc-active" : ""} 
                ${phase === 3 ? "pulsing" : ""}
              `}
            >
              {getWordLetters().map((item, idx) => {
                const isEven = idx % 2 === 0;

                // 박스 클래스명 동적 할당
                let boxClass = "scroll_letter_box";
                if (item.isW) boxClass += " wide-w";
                if (item.isSuffix) boxClass += " suffix-letter";

                // 자라란 애니메이션 클래스 & 지연 스타일 할당
                let letterClass = "scroll_letter";
                let customStyle = {};
                if (phase >= 4) {
                  letterClass += " zararan animate";
                  let delay = 0;
                  if (idx === 0) delay = 0.0;
                  else if (idx === 1) delay = 0.15;
                  else if (idx === 2)
                    delay = 0.3; // T
                  else if (idx === 3) delay = 0.45; // C
                  customStyle = { animationDelay: `${delay}s` };
                } else {
                  letterClass += ` ${isEven ? "scroll-up" : "scroll-down"} animate`;
                  customStyle = { animationDelay: `${idx * 0.08}s` };
                }

                return (
                  <span key={`letter-${idx}`} className={boxClass}>
                    <span className={letterClass} style={customStyle}>
                      {item.char}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* PHASE 4: 최종 브랜드 화면 (흰 배경, a1.png, h1.png, Slogan) */}
      {phase === 4 && (
        <div
          style={styles.brandScreen}
          onClick={() => navigate("/home")}
          role="button"
          tabIndex={0}
        >
          <div className="brand_content_container">
            <img
              src={a1Img}
              alt="watC Service Illustration"
              className="brand_a1_img"
            />
            <img
              src={h1Img}
              alt="watC Brand Identity"
              className="brand_h1_img"
            />
            <p className="brand_slogan">더 스마트하고 완벽한 세탁 경험</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "100%",
    height: "100vh",
    margin: "0",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    overflow: "hidden",
    fontFamily: "var(--font-pretendard)",
  },
  skipButton: {
    position: "absolute" as const,
    top: "30px",
    right: "25px",
    padding: "8px 18px",
    backgroundColor: "rgba(15, 23, 42, 0.08)",
    backdropFilter: "blur(4px)",
    color: "#475569",
    border: "none",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--font-pretendard)",
    zIndex: 99999,
    whiteSpace: "nowrap" as const,
  },
  baseScreen: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed" as const,
    top: 0,
    left: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "#ffffff",
    zIndex: 1,
  },
  textContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute" as const,
    top: 0,
    left: 0,
  },
  cScreen: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed" as const,
    top: 0,
    left: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "#ffffff",
    zIndex: 6,
  },
  brandScreen: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed" as const,
    top: 0,
    left: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "#ffffff",
    zIndex: 7, // C logo screen is zIndex 6, so brandScreen sits on top when active
  },
};

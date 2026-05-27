import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import f1Img from "../asset/img/f1.png";

export function Splash() {
  const navigate = useNavigate();

  // Animation Phase State
  // 0: 초기 상태 - f1 세탁 이미지가 위에서 아래로 떨어짐 (0.0s ~ 1.2s)
  // 1: 파란색 배경 레이어가 아래에서 위로 화면을 덮음 (1.2s ~ 2.0s)
  // 2: "WASHTHESEE" 문자들이 교차하며 스크롤되어 나타남 (2.0s ~ 3.2s)
  // 3: 모핑 시작! 빈 공간이 수축하며 우측에 숨겨진 흰색 "C"가 등장 -> "WASHTHEC" 완성 (3.2s ~ 4.2s)
  // 4: "WASHTHEC"가 완성된 상태로 은은한 글로우 효과와 함께 유지 (4.2s ~ 5.0s)
  // 5: 최종 연출! "S, H, E"가 사라지면서 글자들이 자석처럼 쫀쫀하게 모여 "WATC" 완성! (5.0s ~ 6.2s)
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const blueCoverTimer = setTimeout(() => setPhase(1), 1200);
    const textAnimTimer = setTimeout(() => setPhase(2), 2000);
    const morphTimer = setTimeout(() => setPhase(3), 3200);
    const completeTimer = setTimeout(() => setPhase(4), 4200);
    const watcTimer = setTimeout(() => setPhase(5), 5000);
    const navTimer = setTimeout(() => {
      navigate("/login");
    }, 6500);

    return () => {
      clearTimeout(blueCoverTimer);
      clearTimeout(textAnimTimer);
      clearTimeout(morphTimer);
      clearTimeout(completeTimer);
      clearTimeout(watcTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  const handleSkip = () => {
    navigate("/login");
  };

  // WASHTHESEE 텍스트 구조 정의 (keep: true인 글자만 마지막에 WATC로 남음)
  const letters = [
    { char: "W", keep: true, isW: true }, // W는 별도 너비 확보를 위해 마킹
    { char: "A", keep: true },
    { char: "S", keep: false },
    { char: "H", keep: false },
    { char: "T", keep: true },
    { char: "H", keep: false },
    { char: "E", keep: false },
    { char: "S", keep: false, isSuffix: true },
    { char: "E", keep: false, isSuffix: true },
    { char: "E", keep: false, isSuffix: true },
  ];

  return (
    <div style={styles.container}>
      <style>{`
        /* --- f1 이미지 드롭다운 애니메이션 --- */
        .splash_f1_img {
          animation: imageDrop 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          width: 72px; 
          height: auto;
          z-index: 2;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.06));
        }

        @keyframes imageDrop {
          0% { transform: translateY(-80vh) scale(0.6); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* --- 블루 커버 레이어 트랜지션 --- */
        .blue_cover_layer {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          padding: 0;
          margin: 0;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%);
          z-index: 5;
          transform: translateY(100%);
          transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .blue_cover_layer.active {
          transform: translateY(0);
        }

        /* --- 텍스트 정중앙 배치 정렬 래퍼 --- */
        .text_wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          z-index: 10;
        }

        /* --- [기능 교정] 개별 글자가 들어가는 기본 박스 스타일 --- */
        .scroll_letter_box {
          display: inline-block;
          overflow: hidden;
          height: 54px;
          position: relative;
          width: 32px; /* 일반 알파벳 너비 수치 최적화 */
          text-align: center;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* [W 잘림 버그 해결] 가로 폭이 넓은 'W' 전용 박스 너비 강제 확장 */
        .scroll_letter_box.wide-w {
          width: 46px;
        }

        /* Phase 3에서 "SEE" 접미사가 한 번 숨겨질 때의 모션 정의 */
        .text_wrapper.morphing-active .suffix-letter {
          width: 0px;
          opacity: 0;
          transform: scale(0.5);
          filter: blur(6px);
          pointer-events: none;
        }

        /* [최종 연출] Phase 5 단계에서 S, H, E 글자들을 부피 0으로 압축하여 완전히 제거 */
        .text_wrapper.watc-active .shrink-letter {
          width: 0px;
          opacity: 0;
          transform: scale(0.5);
          filter: blur(4px);
          pointer-events: none;
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
          animation: letterScrollUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes letterScrollUp {
          0% { transform: translateY(105%) rotateX(-60deg); opacity: 0; filter: blur(3px); }
          100% { transform: translateY(0) rotateX(0deg); opacity: 1; filter: blur(0); }
        }

        .scroll_letter.scroll-down.animate {
          animation: letterScrollDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes letterScrollDown {
          0% { transform: translateY(-105%) rotateX(60deg); opacity: 0; filter: blur(3px); }
          100% { transform: translateY(0) rotateX(0deg); opacity: 1; filter: blur(0); }
        }

        /* --- 최종 모핑 타겟: 순백색 "C" 박스 세팅 --- */
        .morph_c_box {
          display: inline-block;
          overflow: hidden;
          height: 54px;
          width: 0;
          opacity: 0;
          transform: scale(0.4); 
          filter: blur(6px);
          transition: all 0.85s cubic-bezier(0.25, 1, 0.5, 1);
          margin-left: 0;
          will-change: transform, opacity;
        }

        /* Phase 3 이상일 때 C가 정해진 크기로 부드럽게 확장 등장 */
        .text_wrapper.morphing-active .morph_c_box {
          width: 32px; 
          opacity: 1;
          filter: blur(0);
          transform: scale(1);
          margin-left: 4px; 
        }

        /* Phase 5 단계에서 자간 여백을 밀착시켜 "WATC" 오리지널 비율 완성 */
        .text_wrapper.watc-active .morph_c_box {
          margin-left: 4px;
        }

        .morph_c_letter {
          display: inline-block;
          font-family: var(--font-pretendard);
          font-size: 42px;
          font-weight: 900;
          color: #ffffff;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        /* --- 고급스러운 피날레 펄싱 글로우 애니메이션 --- */
        .text_wrapper.pulsing {
          animation: textPulse 2.0s ease-in-out infinite alternate;
        }

        @keyframes textPulse {
          0% { filter: drop-shadow(0 0 8px rgba(255,255,255,0.3)) drop-shadow(0 0 12px rgba(147,197,253,0.2)); transform: scale(1); }
          100% { filter: drop-shadow(0 0 16px rgba(255,255,255,0.6)) drop-shadow(0 0 24px rgba(147,197,253,0.5)); transform: scale(1.02); }
        }
      `}</style>

      {/* SKIP BUTTON */}
      <button style={styles.skipButton} onClick={handleSkip}>
        Skip
      </button>

      {/* PHASE 0 & 1: 하얀색 초기 배경 및 f1 이미지 낙하 */}
      <div style={styles.baseScreen}>
        {phase < 2 && (
          <img src={f1Img} alt="f1 Laundry Service" className="splash_f1_img" />
        )}
      </div>

      {/* PHASE 1 ~ 5: 블루 스크린 및 정밀 타이포 모션 적용 레이어 */}
      <div className={`blue_cover_layer ${phase >= 1 ? "active" : ""}`}>
        {phase >= 2 && (
          <div style={styles.textContainer}>
            <div
              className={`text_wrapper 
                ${phase >= 3 ? "morphing-active" : ""} 
                ${phase >= 5 ? "watc-active" : ""} 
                ${phase === 4 || phase === 5 ? "pulsing" : ""}
              `}
            >
              {/* 단일 letters 배열 매핑으로 글자 누락 현상 완벽 방지 */}
              {letters.map((item, idx) => {
                const isEven = idx % 2 === 0;

                // 박스 클래스명 동적 할당 (W 잘림 처리 및 S,H,E 처리 목적)
                let boxClass = "scroll_letter_box";
                if (item.isW) boxClass += " wide-w";
                if (item.isSuffix) boxClass += " suffix-letter";
                if (!item.keep && !item.isSuffix) boxClass += " shrink-letter";

                return (
                  <span key={`letter-${idx}`} className={boxClass}>
                    <span
                      className={`scroll_letter ${isEven ? "scroll-up" : "scroll-down"} animate`}
                      style={{ animationDelay: `${idx * 0.07}s` }}
                    >
                      {item.char}
                    </span>
                  </span>
                );
              })}

              {/* 최종 모핑 목적지인 순백색 'C' 앰블럼 상자 */}
              <span className="morph_c_box">
                <span className="morph_c_letter">C</span>
              </span>
            </div>
          </div>
        )}
      </div>
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
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute" as const,
    top: 0,
    left: 0,
  },
};

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import f1Img from "../asset/img/f1.png";
import watcLogoImg from "../asset/img/watc_logo.png";
import a1Img from "../asset/img/a1.png";
import h1Img from "../asset/img/h1.png";

export function Splash() {
  const navigate = useNavigate();

  const isInIframe = useMemo(
    () => typeof window !== "undefined" && window.self !== window.top,
    [],
  );

  const containerStyle = {
    ...styles.container,
    ...(isInIframe
      ? {
          height: "100%",
          minHeight: "100%",
          position: "relative" as const,
        }
      : {}),
  };

  const getScreenStyle = (baseStyle: any) => ({
    ...baseStyle,
    ...(isInIframe
      ? {
          position: "absolute" as const,
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
        }
      : {}),
  });

  // Animation phases:
  // 0: 초기 버블 WC 로고
  // 1: f1 이미지 + watC 로고 노출
  // 2: 블루 커버 + WASHTHESEE 텍스트 스크롤
  // 3: WASHTHEC 모핑
  // 4: WATC (대문자, 자라란 팝업)
  // 5: WatC (브랜드 케이스, 자라란 팝업)
  // 6: 최종 브랜드 화면
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const bubbleTimer   = setTimeout(() => setPhase(1), 2200);
    const imageTimer    = setTimeout(() => setPhase(2), 4200);
    // WASHTHESEE → WASHTHEC: 약간 여유를 두고 전환
    const textAnimTimer = setTimeout(() => setPhase(3), 6400);
    // Phase 4(WATC 재등장) 제거 — collapse 결과가 곧 WATC이므로 중복 불필요
    // WATC가 충분히 보인 후(약 2.2초) 브랜드 화면으로 전환
    const brandTimer    = setTimeout(() => setPhase(6), 10800);
    const navTimer      = setTimeout(() => navigate("/login"), 15000);

    return () => {
      clearTimeout(bubbleTimer);
      clearTimeout(imageTimer);
      clearTimeout(textAnimTimer);
      clearTimeout(brandTimer);
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
        isSuffix: i >= 7,
        keep: c === "W" || c === "A" || c === "T",
      }));
    }
    if (phase === 3) {
      return "WASHTHEC".split("").map((c) => ({
        char: c,
        isW: c === "W",
        isSuffix: false,
        keep: c === "W" || c === "A" || c === "T" || c === "C",
      }));
    }
    if (phase === 4) {
      return "WATC".split("").map((c) => ({
        char: c,
        isW: c === "W",
        isSuffix: false,
        keep: true,
      }));
    }
    return [];
  };

  return (
    <div className="page-enter" style={containerStyle}>
      {isInIframe && (
        <style>{`
          .blue_cover_layer {
            position: absolute !important;
          }
        `}</style>
      )}
      <style>{`
        /* ════════════════════════════════════════
           SKIP 버튼 — 어떤 배경에서도 잘 보이는 글래스 캡슐
           ════════════════════════════════════════ */
        .skip_btn {
          position: fixed;
          top: 28px;
          right: 22px;
          z-index: 99999;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px 8px 14px;
          border-radius: 999px;
          font-size: 12.5px;
          font-weight: 700;
          font-family: var(--font-pretendard);
          letter-spacing: 0.1px;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          position: fixed;
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.22s ease,
                      background 0.22s ease;
        }

        .skip_btn::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: linear-gradient(105deg,
            transparent 35%,
            rgba(255,255,255,0.18) 50%,
            transparent 65%
          );
          animation: skipShimmer 5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes skipShimmer {
          0%   { transform: translateX(-120%); opacity: 0; }
          15%  { opacity: 1; }
          45%  { transform: translateX(220%); opacity: 0; }
          100% { transform: translateX(220%); opacity: 0; }
        }

        .skip_btn:active {
          transform: scale(0.95);
        }

        /* ── 밝은 배경 모드 (phase 0·1·6: 흰 배경) ── */
        .skip_btn--light {
          background: rgba(15, 23, 42, 0.07);
          border: 1.5px solid rgba(15, 23, 42, 0.15);
          color: #334155;
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06),
                      inset 0 1px 0 rgba(255,255,255,0.6);
        }

        .skip_btn--light:hover {
          background: rgba(15, 23, 42, 0.11);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.10),
                      inset 0 1px 0 rgba(255,255,255,0.6);
        }

        /* ── 어두운 배경 모드 (phase 2~5: 파란 배경) ── */
        .skip_btn--dark {
          background: rgba(255, 255, 255, 0.13);
          border: 1.5px solid rgba(255, 255, 255, 0.28);
          color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(14px);
          box-shadow: 0 2px 14px rgba(37, 99, 235, 0.18),
                      0 0 0 0 rgba(147,197,253,0),
                      inset 0 1px 0 rgba(255,255,255,0.18);
          animation: skipPulse 3.8s ease-in-out infinite,
                     skipGlow  4s ease-in-out infinite alternate;
        }

        @keyframes skipPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.018); }
        }

        @keyframes skipGlow {
          0%   { box-shadow: 0 2px 10px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.15); }
          100% { box-shadow: 0 2px 22px rgba(147,197,253,0.45), 0 0 28px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.25); }
        }

        .skip_btn--dark:hover {
          background: rgba(255, 255, 255, 0.20);
          animation: none;
          transform: scale(1.03);
        }

        .skip_btn_arrow {
          width: 13px;
          height: 13px;
          opacity: 0.72;
          flex-shrink: 0;
        }

        /* --- 로고 컨테이너 세로 스택 정렬 --- */
        .splash_logo_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        /* --- f1 이미지 모프 등장 애니메이션 --- */
        .splash_f1_img {
          animation: imageDrop 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
          width: 80px;
          height: auto;
          z-index: 2;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.08));
          margin-top: 60px;
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
          0%   { clip-path: inset(0 100% 0 0); opacity: 0; filter: blur(6px); }
          20%  { opacity: 1; filter: blur(2px); }
          80%  { clip-path: inset(0 2% 0 0); filter: blur(0); }
          100% { clip-path: inset(0 0% 0 0); opacity: 1; filter: blur(0); }
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

        .scroll_letter_box.collapse-letter {
          animation: collapseLetter 0.75s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          /* WASHTHEC가 충분히 보인 후 천천히 사라지도록 딜레이 확보 */
          animation-delay: 1.4s;
        }

        @keyframes collapseLetter {
          0%   { width: 32px; opacity: 1; filter: blur(0); }
          40%  { opacity: 0.4; filter: blur(1px); }
          100% { width: 0px; opacity: 0; padding: 0; margin: 0; pointer-events: none; filter: blur(2px); }
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

        /* --- [자라란 모션] WATC 글자 팝업 (phase 4) --- */
        .text_wrapper.watc-active .scroll_letter.zararan {
          animation: letterZararan 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important;
          opacity: 0;
        }

        @keyframes letterZararan {
          0%   { opacity: 0; transform: scale(0.6) translateY(12px);  filter: brightness(0.5) blur(2px); }
          50%  { opacity: 0.8; transform: scale(1.22) translateY(-4px); filter: brightness(1.6) drop-shadow(0 0 15px rgba(255,255,255,0.9)); }
          100% { opacity: 1; transform: scale(1) translateY(0);        filter: brightness(1) blur(0); }
        }



        /* --- 피날레 펄싱 글로우 — collapse 완료(~2.2s) 후 WATC가 빛나도록 딜레이 적용 --- */
        .text_wrapper.pulsing {
          animation: textPulse 2.6s ease-in-out infinite alternate;
          animation-delay: 2.2s;
        }

        @keyframes textPulse {
          0%   { filter: drop-shadow(0 0 6px rgba(255,255,255,0.25)) drop-shadow(0 0 10px rgba(147,197,253,0.15)); transform: scale(1); }
          100% { filter: drop-shadow(0 0 18px rgba(255,255,255,0.65)) drop-shadow(0 0 28px rgba(147,197,253,0.5)); transform: scale(1.015); }
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

        /* --- Phase 0: WC 버블 상승 컨테이너 --- */
        .splash_3d_container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #ffffff;
          z-index: 100;
          opacity: 1;
          transform: scale(1);
          transition: opacity 1.6s cubic-bezier(0.25, 1, 0.5, 1), transform 1.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .splash_3d_container.fade-out {
          opacity: 0;
          transform: scale(1.03);
          pointer-events: none;
        }

        /* 비누방울 */
        .splash_ambient_bubble {
          position: absolute;
          border-radius: 50%;
          /* start extremely faint: near‑white with a whisper of blue */
          background: radial-gradient(circle at 35% 30%,
            rgba(255,255,255,0.97) 0%,
            rgba(210,225,255,0.20) 28%,
            rgba(190,215,255,0.12) 55%,
            rgba(220,200,255,0.08) 78%,
            rgba(200,240,255,0.05) 100%
          );
          border: 1px solid rgba(180,200,255,0.08);
          /* subtle initial glow, will intensify via animation */
          box-shadow:
            inset -3px -3px 8px rgba(255,255,255,0.30),
            inset 2px 2px 6px rgba(160,185,255,0.10),
            0 3px 12px rgba(120,150,255,0.04);
          opacity: 0.05; /* very low visibility on entry */
          animation: ambientBubbleAppear 2s ease-out forwards, ambientBubbleFloat 2.5s ease-in-out forwards;
          pointer-events: none;
          z-index: 2;
        }

        @keyframes ambientBubbleFloat {
          0%   { transform: translateY(0) scale(1); opacity: 0.80; }
          35%  { opacity: 0.70; }
          72%  { opacity: 0.50; }
          100% { transform: translateY(-16vh) scale(0.9); opacity: 0; }
        }

        @keyframes ambientBubbleAppear {
          0%   { opacity: 0.05; }
          30%  { opacity: 0.40; }
          60%  { opacity: 0.70; }
          100% { opacity: 0.80; }
        }

        .splash_c_morph_bubble {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 112px;
          height: 112px;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.84);
          background: radial-gradient(circle at 34% 28%,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(219, 234, 254, 0.62) 38%,
            rgba(147, 197, 253, 0.25) 68%,
            rgba(191, 219, 254, 0.18) 100%
          );
          border: 2px solid rgba(147, 197, 253, 0.48);
          box-shadow:
            inset -8px -10px 24px rgba(255, 255, 255, 0.86),
            inset 7px 8px 18px rgba(96, 165, 250, 0.22),
            0 18px 48px rgba(59, 130, 246, 0.13);
          animation: cBubbleMorph 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          z-index: 5;
        }

        .splash_c_morph_bubble::before {
          content: "";
          position: absolute;
          top: 20px;
          left: 24px;
          width: 24px;
          height: 13px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.78);
          filter: blur(0.2px);
          transform: rotate(-24deg);
          animation: cBubbleShine 2.2s ease forwards;
        }

        @keyframes cBubbleMorph {
          0% {
            opacity: 0.28;
            transform: translate(-50%, -50%) scale(0.84);
          }
          45% {
            opacity: 0.86;
            transform: translate(-50%, -50%) scale(1);
          }
          68% {
            opacity: 1;
            background: radial-gradient(circle at 34% 28%,
              rgba(255, 255, 255, 0.9) 0%,
              rgba(219, 234, 254, 0.48) 42%,
              rgba(147, 197, 253, 0.18) 72%
            );
            border: 3px solid rgba(37, 99, 235, 0.42);
            border-right-color: rgba(37, 99, 235, 0.42);
          }
          100% {
            width: 98px;
            height: 98px;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            background: transparent;
            border: 12px solid #2563eb;
            border-right-color: transparent;
            box-shadow:
              0 18px 44px rgba(37, 99, 235, 0.16),
              inset 0 0 12px rgba(255, 255, 255, 0.58);
          }
        }

        @keyframes cBubbleShine {
          0%, 58% { opacity: 0.76; }
          100% { opacity: 0; transform: rotate(-24deg) translateY(-8px); }
        }

        @keyframes gentleFloat3D {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-9px) scale(1.012); }
        }

        @keyframes bubbleFormLetter {
          0%   { opacity: 0;    transform: scale(0.1);  filter: blur(4px); }
          12%  { opacity: 0.92; transform: scale(1.1);  filter: blur(0); }
          80%  { opacity: 0.88; transform: scale(1);    filter: blur(0); }
          100% { opacity: 0;    transform: scale(0.5) translateY(-20px); filter: blur(3px); }
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
          font-family: var(--font-pretendard);
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

      {/* SKIP BUTTON — 배경에 따라 light/dark 모드 자동 전환 */}
      <button
        className={`skip_btn ${phase >= 2 && phase < 6 ? "skip_btn--dark" : "skip_btn--light"}`}
        onClick={handleSkip}
        aria-label="스킵"
      >
        <svg
          className="skip_btn_arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" opacity="0.8"/>
        </svg>
        Skip
      </button>

      {/* PHASE 0: 3D 홀로그램 버블 스플래시 */}
      <div style={getScreenStyle(styles.baseScreen)}>
        {phase <= 1 && (
          <div
            className={`splash_3d_container ${phase === 1 ? "fade-out" : ""}`}
          >
            {/* 비눗방울 30개 — 위로 올라가다 사라짐 */}
            {[
              {
                size: 28,
                left: "8%",
                dur: "2.25s",
                delay: "0.00s",
                top: "26%",
              },
              {
                size: 16,
                left: "18%",
                dur: "2.45s",
                delay: "0.12s",
                top: "56%",
              },
              {
                size: 38,
                left: "28%",
                dur: "2.30s",
                delay: "0.05s",
                top: "78%",
              },
              {
                size: 22,
                left: "39%",
                dur: "2.55s",
                delay: "0.18s",
                top: "34%",
              },
              {
                size: 46,
                left: "52%",
                dur: "2.35s",
                delay: "0.08s",
                top: "70%",
              },
              {
                size: 14,
                left: "64%",
                dur: "2.50s",
                delay: "0.20s",
                top: "22%",
              },
              {
                size: 32,
                left: "73%",
                dur: "2.28s",
                delay: "0.10s",
                top: "48%",
              },
              {
                size: 18,
                left: "84%",
                dur: "2.48s",
                delay: "0.16s",
                top: "82%",
              },
              {
                size: 40,
                left: "92%",
                dur: "2.38s",
                delay: "0.04s",
                top: "38%",
              },
              {
                size: 20,
                left: "12%",
                dur: "2.62s",
                delay: "0.24s",
                top: "86%",
              },
              {
                size: 34,
                left: "58%",
                dur: "2.42s",
                delay: "0.14s",
                top: "12%",
              },
              {
                size: 24,
                left: "88%",
                dur: "2.58s",
                delay: "0.22s",
                top: "64%",
              },
            ].map((b, i) => (
              <div
                key={`bbl-${i}`}
                className="splash_ambient_bubble"
                style={{
                  width: b.size,
                  height: b.size,
                  left: b.left,
                  top: b.top,
                  animationDuration: b.dur,
                  animationDelay: b.delay,
                }}
              />
            ))}
            <div className="splash_c_morph_bubble" aria-hidden="true" />
          </div>
        )}
        {phase >= 1 && phase < 6 && (
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

      {/* PHASE 2 ~ 5: 블루 스크린 및 타이포 모션 */}
      <div
        className={`blue_cover_layer ${phase >= 2 && phase < 6 ? "active" : ""} ${phase === 6 ? "fade-out" : ""}`}
      >
        {phase >= 2 && phase < 6 && (
          <div style={getScreenStyle(styles.textContainer)}>
            <div
              key={`text-phase-${phase}`}
              className={`text_wrapper
                ${phase >= 3 ? "morphing-active" : ""}
                ${phase === 3 ? "pulsing" : ""}
              `}
            >
              {getWordLetters().map((item, idx) => {
                const isEven = idx % 2 === 0;

                let boxClass = "scroll_letter_box";
                if (item.isW) boxClass += " wide-w";
                if (item.isSuffix) boxClass += " suffix-letter";
                // phase 3: 불필요 글자는 collapse (WATC만 남음)
                if (phase === 3 && !item.keep) boxClass += " collapse-letter";

                const letterClass =
                  `scroll_letter ${isEven ? "scroll-up" : "scroll-down"} animate`;
                const customStyle = { animationDelay: `${idx * 0.08}s` };

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

      {/* PHASE 6: 최종 브랜드 화면 (흰 배경, a1.png, h1.png, Slogan) */}
      {phase === 6 && (
        <div
          style={getScreenStyle(styles.brandScreen)}
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

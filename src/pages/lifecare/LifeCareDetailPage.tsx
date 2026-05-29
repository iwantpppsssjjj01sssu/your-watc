import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./LifeCareDetailPage.css";
import { ResponsiveIframe } from "../../components/ResponsiveIframe";

// SVG 일러스트레이션 컴포넌트들
function KnitIllustration() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="care_svg_illustration"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="knitGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#knitGrad)" />
      {/* 니트 실 뭉치 느낌의 라인들 */}
      <path
        d="M 40 40 C 50 30, 70 30, 80 40 C 90 50, 90 70, 80 80 C 70 90, 50 90, 40 80 C 30 70, 30 50, 40 40 Z"
        fill="none"
        stroke="#d97706"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 48 48 C 55 42, 65 42, 72 48 C 78 54, 78 66, 72 72 C 65 78, 55 78, 48 72 C 42 66, 42 54, 48 48 Z"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* 뜨개질 바늘 */}
      <line
        x1="30"
        y1="90"
        x2="75"
        y2="45"
        stroke="#78350f"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="75" cy="45" r="4" fill="#78350f" />
      <line
        x1="90"
        y1="90"
        x2="45"
        y2="45"
        stroke="#78350f"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="45" cy="45" r="4" fill="#78350f" />
    </svg>
  );
}

function CoatIllustration() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="care_svg_illustration"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="coatGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#coatGrad)" />
      {/* 옷걸이와 코트 실루엣 */}
      <path
        d="M 40 45 L 60 32 L 80 45 M 60 32 L 60 25 C 60 20, 65 20, 65 25"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 35 48 C 45 48, 50 52, 60 52 C 70 52, 75 48, 85 48 L 90 95 L 30 95 Z"
        fill="#2563eb"
        opacity="0.9"
      />
      <path
        d="M 52 52 L 52 95 M 68 52 L 68 95"
        fill="none"
        stroke="#1d4ed8"
        strokeWidth="2"
      />
      {/* 깃 */}
      <path
        d="M 45 48 L 60 65 L 75 48"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShirtIllustration() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="care_svg_illustration"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="shirtGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#shirtGrad)" />
      {/* 셔츠 실루엣 */}
      <path
        d="M 30 45 L 45 40 L 60 45 L 75 40 L 90 45 L 85 95 L 35 95 Z"
        fill="#0284c7"
        opacity="0.9"
      />
      {/* 카라(깃) */}
      <path
        d="M 45 40 L 60 55 L 75 40 L 68 35 L 60 40 L 52 35 Z"
        fill="#0369a1"
      />
      {/* 단추 라인 및 단추 */}
      <line x1="60" y1="55" x2="60" y2="95" stroke="#ffffff" strokeWidth="2" />
      <circle cx="60" cy="65" r="2.5" fill="#ffffff" />
      <circle cx="60" cy="78" r="2.5" fill="#ffffff" />
      <circle cx="60" cy="90" r="2.5" fill="#ffffff" />
    </svg>
  );
}

interface GuideContent {
  title: string;
  subtitle: string;
  illustration: React.ReactNode;
  primaryColor: string;
  accentBg: string;
  badgeText: string;
  tips: Array<{
    title: string;
    desc: string;
    subTip: string;
  }>;
  watcOption: {
    title: string;
    desc: string;
    badge: string;
  };
  quiz: {
    question: string;
    options: string[];
    answerIdx: number;
    explanation: string;
  };
}

const GUIDE_DATA: Record<string, GuideContent> = {
  yarn: {
    title: "니트(Knitwear) 보관법",
    subtitle: "늘어나기 쉬운 겨울 니트를 새 옷처럼 보관",
    illustration: <KnitIllustration />,
    primaryColor: "#d97706",
    accentBg: "rgba(217, 119, 6, 0.08)",
    badgeText: "늘어남 방지 / 정전기 차단",
    tips: [
      {
        title: "1. 느슨하게 접어서 수납하기",
        desc: "니트를 일반 옷걸이에 걸어두면 중력에 의해 어깨가 변형되고 기장이 많이 늘어납니다. 반으로 가볍게 접고 3등분으로 눕혀서 옷장에 안착 수납하세요.",
        subTip:
          "💡 두꺼운 니트는 아래쪽에, 가볍고 섬세한 니트는 위쪽에 쌓아 올리는 것이 눌림 방지에 좋습니다.",
      },
      {
        title: "2. 제습 한지 시트 대치",
        desc: "수납 시 니트 사이에 습기 제거용 제습 시트나 얇은 종이(한지)를 끼워두면, 정전기 발생을 방지하고 눅눅한 냄새 및 섬유 곰팡이 침착을 원천 차단합니다.",
        subTip:
          "💡 천연 한지는 화학 방습제보다 섬유 통기성을 유지하는 데 훨씬 탁월합니다.",
      },
      {
        title: "3. 보풀 제거와 마일드 에이징",
        desc: "이미 보풀이 뭉친 니트는 절대 억지로 잡아뜯지 마세요. 보풀 제거기로 표면을 가볍게 정돈하고 저온 스팀으로 섬유 공극을 다시 살려준 후 보관해야 수명이 늘어납니다.",
        subTip:
          "💡 왓씨만의 전용 클리닝 코스로 섬유 유연성과 핏 복원을 동시에 해결할 수 있습니다.",
      },
    ],
    watcOption: {
      title: "🧶 안심 마일드 저온 스팀 코스",
      desc: "왓씨만의 울/실크 특화 마일드 런드리로 니트의 죽은 볼륨감을 탱글탱글하게 복원하고 표면 보풀을 정교하게 다듬어 최상의 컨디션으로 안심 진공 패킹해 드립니다.",
      badge: "니트 보존 보증제 적용",
    },
    quiz: {
      question: "니트를 옷장에 보관할 때 가장 추천하는 올바른 수납 방법은?",
      options: [
        "일반 플라스틱 세탁 옷걸이에 가지런히 걸어두기",
        "돌돌 부드럽게 말거나 한지와 함께 차곡차곡 눕혀 보관",
        "공기를 완전히 빨아들여 납작하게 압축 팩에 보관",
      ],
      answerIdx: 1,
      explanation:
        "정답입니다! 니트는 옷걸이에 걸면 흘러내리고, 압축 팩에 보관하면 고유의 포근한 섬유 공기층이 완전히 뭉개져 거칠어집니다. 한지와 함께 부드럽게 접어 눕히는 것이 최고의 보관 비법입니다. 🌟",
    },
  },
  coat: {
    title: "울/코트(Coat) 케어 가이드",
    subtitle: "무거운 어깨 핏 변형과 외부 미세먼지 완벽 차단",
    illustration: <CoatIllustration />,
    primaryColor: "#2563eb",
    accentBg: "rgba(37, 99, 235, 0.08)",
    badgeText: "어깨 핏 보호 / 천연 울 가드",
    tips: [
      {
        title: "1. 전용 입체/도톰 옷걸이 활용",
        desc: "무거운 코트는 깃 끝이 두텁고 입체적으로 둥글게 지탱되는 원목 전용 옷걸이를 사용해야 오랜 보관 중에도 어깨 패드와 실루엣이 내려앉는 꺾임 손상을 방지합니다.",
        subTip:
          "💡 철사 옷걸이는 코트 무게를 견디지 못하고 어깨 부위에 영구적인 뿔 자국을 남깁니다.",
      },
      {
        title: "2. 부직포 안심 통풍 가방 씌우기",
        desc: "비닐 밀폐 커버는 섬유 내부의 잔여 수분 배출을 막아 곰팡이를 생기게 합니다. 바람이 자유롭게 통하는 왓씨 부직포 가방 커버를 씌워 통풍성을 극대화하세요.",
        subTip:
          "💡 드라이클리닝 후 비닐은 반드시 벗기고, 반나절 환기 후 부직포 커버로 갈아 끼우셔야 안전합니다.",
      },
      {
        title: "3. 습도 조절과 옷장 여유 배정",
        desc: "천연 캐시미어와 울 코트는 고온 다습에 매우 취약합니다. 옷끼리 꽉 끼어있지 않도록 최소 5cm 이상의 간격을 배정하고, 장마철에는 습도 관리에 유의하세요.",
        subTip:
          "💡 옷장 안 바닥에 숯이나 신문지를 넣어두면 최고의 천연 제습 효과를 볼 수 있습니다.",
      },
    ],
    watcOption: {
      title: "🧥 캐시미어 홈 케어 실크코팅",
      desc: "프리미엄 퍼/울 전용 살균 에어 샤워 공정을 거쳐, 섬유의 윤기와 볼륨감을 살려주는 미세 실크 앰플 코팅막을 씌운 뒤 최고급 통풍 가방에 씌워 수거/배송해 드립니다.",
      badge: "럭셔리 전용 라인 적용",
    },
    quiz: {
      question:
        "세탁소에서 드라이클리닝 후 씌워준 비닐 커버, 그대로 보관해야 할까요?",
      options: [
        "먼지가 안 쌓이도록 무조건 비닐 커버째로 영구 보관한다",
        "비닐은 바로 벗겨 잔여 휘발 성분을 날린 뒤 부직포 커버로 교체 보관한다",
        "비닐 밑부분을 살짝 가위로 자른 뒤 보관한다",
      ],
      answerIdx: 1,
      explanation:
        "정답입니다! 드라이클리닝 비닐 커버는 휘발성 유기 용제가 갇혀 옷감을 상하게 하고 습기를 모아 곰팡이를 번식시킵니다. 꼭 비닐을 벗겨 그늘에서 하루 말린 후 바람이 통하는 부직포 커버로 갈아 끼워 주세요! 🌟",
    },
  },
  shirt: {
    title: "셔츠(Shirts) 안심 관리 규칙",
    subtitle: "목 카라 깃 변형과 주변의 누런 황변/얼룩 차단",
    illustration: <ShirtIllustration />,
    primaryColor: "#0284c7",
    accentBg: "rgba(2, 132, 199, 0.08)",
    badgeText: "카라 각 수호 / 깃 황변 방지",
    tips: [
      {
        title: "1. 카라(깃)는 세우고 단추 채우기",
        desc: "셔츠를 보관할 때는 첫 번째 맨 위 단추와 중간 단추를 채운 뒤, 목 카라(깃)를 수직으로 빳빳하게 올린 상태로 보관하세요. 그래야 옷장에 압착되어 깃이 뭉개지는 것을 방지합니다.",
        subTip:
          "💡 카라 내부의 플라스틱 카라 스테이(깃 지지대)가 있다면 빼놓지 말고 유지하는 것이 최상입니다.",
      },
      {
        title: "2. 3cm 안심 유격 공간 배치",
        desc: "걸이 봉에 셔츠를 빽빽하게 밀착시키면 섬유 마찰로 인해 옷장에 걸어만 두어도 구김이 생깁니다. 손가락 두 개 너비인 최소 3cm 유격 공간을 유지하며 걸어주세요.",
        subTip:
          "💡 여유로운 배치는 공기 흐름을 원활하게 해 습기 안착을 크게 방지합니다.",
      },
      {
        title: "3. 다림 스팀 방출 후 보관",
        desc: "스팀 다림질 직후에는 섬유 조직 사이에 뜨거운 수증기가 가득 차 있습니다. 이 상태 그대로 옷장에 수납하면 칼주름이 뭉개지고 눅눅함으로 인해 얼룩이 고착됩니다. 최소 30분 환기 후 넣어주세요.",
        subTip:
          "💡 완전히 식고 건조된 셔츠만이 최상의 빳빳함을 오랫동안 보존할 수 있습니다.",
      },
    ],
    watcOption: {
      title: "👔 옥시 황변 방지 파워 딥클린",
      desc: "피지 얼룩으로 찌든 목 깃과 소매 끝 부위를 특수 정밀 효소 처리하여 깊은 때를 빼내고, 다리미 칼주름 압축 성형을 통해 새 셔츠를 받은 듯한 칼각 피팅을 보증합니다.",
      badge: "12단계 카라 프레스 완비",
    },
    quiz: {
      question:
        "스팀 다림질을 끝낸 반듯한 셔츠, 언제 옷장에 넣어야 가장 좋을까요?",
      options: [
        "열기가 날아가기 전에 칼주름 상태 그대로 옷장에 1초 만에 바로 넣는다",
        "자연바람에 통기 시켜 열기와 내부 습기를 최소 30분 완전히 뺀 뒤 넣는다",
        "셔츠를 돌돌 구겨서 습기가 찬 상태로 서랍장에 넣는다",
      ],
      answerIdx: 1,
      explanation:
        "정답입니다! 뜨거운 다림질 습기를 머금은 채 곧장 밀폐 옷장으로 가면, 구김이 더 세게 굳어질 뿐만 아니라 섬유 손상과 냄새의 원인이 됩니다. 충분히 식히는 ‘에이징 시간’ 30분이 필수입니다! 🌟",
    },
  },
};

export function LifeCareDetailPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  // 페이지 진입 시 스크롤을 최상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  // 타입 예외 처리 및 데이터 바인딩
  const currentType = type && GUIDE_DATA[type] ? type : "yarn";
  const content = GUIDE_DATA[currentType];

  // 퀴즈 관련 상태
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState<boolean | null>(null);

  // 뒤로가기 핸들러
  const handleBack = () => {
    navigate("/home?tab=care");
  };

  // 퀴즈 정답 제출 핸들러
  const handleOptionClick = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizIdx(idx);
  };

  const handleQuizSubmit = () => {
    if (selectedQuizIdx === null || quizSubmitted) return;
    const isCorrect = selectedQuizIdx === content.quiz.answerIdx;
    setQuizIsCorrect(isCorrect);
    setQuizSubmitted(true);
  };

  const handleQuizReset = () => {
    setSelectedQuizIdx(null);
    setQuizSubmitted(false);
    setQuizIsCorrect(null);
  };

  return (
    <div className="lifecare_detail_wrapper">
      <div className="lifecare_detail_container">
        {/* 상단 블러 고정 헤더 */}
        <header className="detail_blur_header">
          <button
            type="button"
            className="detail_back_btn"
            onClick={handleBack}
            aria-label="의류관리 탭으로 돌아가기"
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
          <span className="detail_header_title">스마트 보관 백과</span>
          <div style={{ width: "24px" }}></div> {/* 우측 밸런스용 빈 공간 */}
        </header>

        {/* 상단 히어로 비주얼 배너 영역 */}
        <section
          className="detail_hero_section"
          style={{ borderBottomColor: content.primaryColor }}
        >
          <div className="hero_visual_container">{content.illustration}</div>
          <div className="hero_text_container">
            <span
              className="hero_badge"
              style={{
                backgroundColor: content.accentBg,
                color: content.primaryColor,
              }}
            >
              {content.badgeText}
            </span>
            <h1 className="hero_title" style={{ color: "#0f172a" }}>
              {content.title}
            </h1>
            <p className="hero_subtitle">{content.subtitle}</p>
          </div>
        </section>

        {/* 3대 핵심 비법 카드형 섹션 */}
        <section className="detail_tips_section">
          <h2 className="section_title">
            <span
              className="section_title_indicator"
              style={{ backgroundColor: content.primaryColor }}
            ></span>
            전문가 전수 3대 보관 비책
          </h2>

          <div className="tips_cards_container">
            {content.tips.map((tip, idx) => (
              <div key={idx} className="tip_card">
                <h3 className="tip_card_title" style={{ color: "#1e293b" }}>
                  {tip.title}
                </h3>
                <p className="tip_card_desc">{tip.desc}</p>
                <div
                  className="tip_card_subtip"
                  style={{
                    backgroundColor: content.accentBg,
                    borderLeftColor: content.primaryColor,
                  }}
                >
                  <p
                    className="tip_card_subtip_text"
                    style={{ color: "#475569" }}
                  >
                    {tip.subTip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 왓씨 보관 연계 추천 서비스 배너 */}
        <section
          className="detail_watc_banner"
          style={{ borderLeftColor: content.primaryColor }}
        >
          <span
            className="watc_banner_tag"
            style={{ backgroundColor: content.primaryColor }}
          >
            왓씨 특화 솔루션
          </span>
          <h3 className="watc_banner_title">{content.watcOption.title}</h3>
          <p className="watc_banner_desc">{content.watcOption.desc}</p>
          <div className="watc_banner_footer">
            <span
              className="watc_banner_badge"
              style={{
                color: content.primaryColor,
                backgroundColor: content.accentBg,
              }}
            >
              {content.watcOption.badge}
            </span>
          </div>
        </section>

        {/* 스마트 케어 시뮬레이터 iframe 섹션 */}
        <section className="detail_iframe_section">
          <h2 className="section_title">
            <span
              className="section_title_indicator"
              style={{ backgroundColor: content.primaryColor }}
            ></span>
            실시간 스마트 케어 시뮬레이터
          </h2>
          <div className="iframe_card_container">
            <p className="iframe_card_desc">
              아래 왓씨(WatC) 스마트 케어 시뮬레이터 인터랙티브 웹뷰를 통해 맞춤형 세탁 온도 및 스팀 처리를 실시간으로 실험해 보고 의류 가이드를 조회해 보세요.
            </p>
            <div className="iframe_embed_wrapper">
              <ResponsiveIframe
                src="https://example.com"
                title="스마트 케어 시뮬레이터"
              />
            </div>
          </div>
        </section>

        {/* 인터랙티브 마이크로 퀴즈 섹션 */}
        <section className="detail_quiz_section">
          <div className="quiz_card">
            <div className="quiz_header">
              <span className="quiz_icon">💡</span>
              <span className="quiz_badge">보관 상식 퀴즈</span>
            </div>

            <h3 className="quiz_question">{content.quiz.question}</h3>

            <div className="quiz_options">
              {content.quiz.options.map((option, idx) => {
                let optionClass = "quiz_option_btn";
                if (selectedQuizIdx === idx) optionClass += " selected";
                if (quizSubmitted) {
                  if (idx === content.quiz.answerIdx) {
                    optionClass += " correct";
                  } else if (selectedQuizIdx === idx) {
                    optionClass += " incorrect";
                  }
                  optionClass += " disabled";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={optionClass}
                    onClick={() => handleOptionClick(idx)}
                    disabled={quizSubmitted}
                  >
                    <span className="option_indicator">
                      {idx === 0 && "A"}
                      {idx === 1 && "B"}
                      {idx === 2 && "C"}
                    </span>
                    <span className="option_text">{option}</span>
                  </button>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button
                type="button"
                className="quiz_submit_btn"
                onClick={handleQuizSubmit}
                disabled={selectedQuizIdx === null}
                style={{
                  backgroundColor:
                    selectedQuizIdx === null ? "#cbd5e1" : content.primaryColor,
                }}
              >
                정답 제출하고 해설 확인
              </button>
            ) : (
              <div className="quiz_result_container animate_fade_in">
                <div
                  className={`quiz_result_banner ${quizIsCorrect ? "correct" : "incorrect"}`}
                >
                  {quizIsCorrect ? (
                    <h4>🎉 완벽해요! 정답을 맞히셨어요!</h4>
                  ) : (
                    <h4>😢 아쉽네요! 오답입니다.</h4>
                  )}
                </div>
                <p className="quiz_explanation">{content.quiz.explanation}</p>
                <button
                  type="button"
                  className="quiz_retry_btn"
                  onClick={handleQuizReset}
                  style={{
                    color: content.primaryColor,
                    borderColor: content.primaryColor,
                  }}
                >
                  다시 풀어보기
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 안전 스크롤 패딩 */}
        <div style={{ height: "100px" }} />

        {/* 하단 고정 예약 유도 플로팅 액션바 */}
        <div className="detail_floating_action_bar">
          <button
            type="button"
            className="detail_cta_btn"
            onClick={() => navigate("/home?tab=reserve")}
            style={{
              background: `linear-gradient(135deg, ${content.primaryColor}, #1e3a8a)`,
              boxShadow: `0 8px 20px -6px ${content.primaryColor}`,
            }}
          >
            <span className="cta_icon">🌟</span>
            <span>이 보관법 적용하여 왓씨 케어 예약하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/BackButton";

export function AgreementPage() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState({
    all: false,
    item1: false,
    item2: false,
  });
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | null>(
    null,
  );

  const handleAllCheck = () => {
    const next = !checks.all;
    setChecks({ all: next, item1: next, item2: next });
  };

  const handleItemCheck = (name: "item1" | "item2") => {
    setChecks((previous) => {
      const next = { ...previous, [name]: !previous[name] };
      next.all = next.item1 && next.item2;
      return next;
    });
  };

  const handleOpenDetail = (
    e: MouseEvent<HTMLButtonElement>,
    type: "terms" | "privacy",
  ) => {
    e.stopPropagation();
    setActiveModal(type);
  };

  const handleComplete = () => {
    if (checks.item1 && checks.item2) {
      navigate("/agree1");
    } else {
      alert("모든 필수 항목에 동의해 주세요.");
    }
  };

  return (
    <div id="agreement-page-root" style={styles.container}>
      <style>{`body:has(#agreement-page-root) { padding-left: 0 !important; padding-right: 0 !important; }`}</style>

      {/* 히어로 영역 */}
      <div style={styles.heroSection}>
        <BackButton />
        <div style={styles.heroBackground} />
      </div>

      {/* 본문 영역 */}
      <div style={styles.contentSection}>
        <div style={styles.titleGroup}>
          <h1 style={styles.title}>
            왓씨 서비스
            <br />
            <span style={styles.titleHighlight}>시작해볼까요?</span>
          </h1>
          <p style={styles.subtitle}>
            더 편리한 세탁 경험을 위해
            <br />
            서비스 이용 약관에 동의해주세요.
          </p>
        </div>

        <section style={styles.agreementCard}>
          <button
            type="button"
            style={styles.totalAgreement}
            onClick={handleAllCheck}
          >
            <div
              style={{
                ...styles.statusDot,
                backgroundColor: checks.all ? "#EFF6FF" : "#F2F5FB",
                borderColor: checks.all ? "#DBEAFE" : "#D8E1EE",
                color: "#2563EB",
              }}
            >
              {checks.all ? "✓" : ""}
            </div>
            <div style={styles.totalTextGroup}>
              <span style={styles.totalTitle}>전체 동의</span>
              <span style={styles.totalCaption}>
                필수 약관 및 개인정보 수집에 동의합니다
              </span>
            </div>
          </button>

          <div style={styles.cardDivider} />

          <div style={styles.agreementList}>
            <div
              style={styles.agreementItem}
              onClick={() => handleItemCheck("item1")}
            >
              <div
                style={{
                  ...styles.statusDot,
                  backgroundColor: checks.item1 ? "#EFF6FF" : "#F2F5FB",
                  borderColor: checks.item1 ? "#DBEAFE" : "#D8E1EE",
                  color: "#2563EB",
                }}
              >
                {checks.item1 ? "✓" : ""}
              </div>
              <div style={styles.itemTextGroup}>
                <span style={styles.itemTitle}>[필수] 이용약관 동의</span>
              </div>
              <button
                type="button"
                style={styles.detailButton}
                onClick={(e) => handleOpenDetail(e, "terms")}
              >
                <span style={styles.chevron}>›</span>
              </button>
            </div>
            <div
              style={styles.agreementItem}
              onClick={() => handleItemCheck("item2")}
            >
              <div
                style={{
                  ...styles.statusDot,
                  backgroundColor: checks.item2 ? "#EFF6FF" : "#F2F5FB",
                  borderColor: checks.item2 ? "#DBEAFE" : "#D8E1EE",
                  color: "#2563EB",
                }}
              >
                {checks.item2 ? "✓" : ""}
              </div>
              <div style={styles.itemTextGroup}>
                <span style={styles.itemTitle}>
                  [필수] 개인정보 수집 및 이용 동의
                </span>
              </div>
              <button
                type="button"
                style={styles.detailButton}
                onClick={(e) => handleOpenDetail(e, "privacy")}
              >
                <span style={styles.chevron}>›</span>
              </button>
            </div>
          </div>
        </section>

        {/* 동의 버튼 */}
        <button
          type="button"
          style={{
            ...styles.actionButton,
            opacity: checks.item1 && checks.item2 ? 1 : 0.58,
            pointerEvents: checks.item1 && checks.item2 ? "auto" : "none",
            backgroundImage:
              checks.item1 && checks.item2
                ? "linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)"
                : "linear-gradient(90deg, #C1D4F4 0%, #D4DBE6 100%)",
          }}
          onClick={handleComplete}
        >
          동의하고 시작하기
        </button>
      </div>

      {activeModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {activeModal === "terms"
                  ? "서비스 이용약관"
                  : "개인정보 수집 및 이용 동의"}
              </h3>
              <button
                type="button"
                style={styles.modalCloseBtn}
                onClick={() => setActiveModal(null)}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              {activeModal === "terms" ? (
                <div style={styles.modalText}>
                  <h4 style={styles.modalSubTitle}>제 1 조 (목적)</h4>
                  <p style={{ margin: "0 0 8px 0" }}>
                    본 약관은 왓씨(WatC)가 제공하는 모바일 앱 서비스 및 스마트
                    비대면 세탁 대시보드(이하 "서비스")의 이용과 관련하여 회사와
                    회원 간의 권리, 의무 및 책임 사항, 기타 필요한 사항을
                    규정함을 목적으로 합니다.
                  </p>
                  <h4 style={styles.modalSubTitle}>제 2 조 (용어의 정의)</h4>
                  <p style={{ margin: "0 0 8px 0" }}>
                    1. "회사"라 함은 스마트 런드리 플랫폼 WatC를 운영하는 주체를
                    말합니다.
                    <br />
                    2. "회원"이라 함은 약관에 동의하고 서비스를 이용하는 고객을
                    말합니다.
                    <br />
                    3. "세탁물"이라 함은 회원이 서비스를 통해 수거 및 의류
                    케어를 의뢰한 모든 의류 품목을 의미합니다.
                  </p>
                  <h4 style={styles.modalSubTitle}>
                    제 3 조 (서비스의 제공 및 변경)
                  </h4>
                  <p style={{ margin: "0 0 8px 0" }}>
                    회사는 연중무휴 24시간 실시간 GPS 매핑 기반 수거·배송 상태
                    대시보드 연동, AI 스마트 의류 진단 렌즈 기능, 맞춤 의류 케어
                    추천 서비스를 제공합니다. 불가피한 기술적 사정 시 사전 공지
                    후 점검이 이루어집니다.
                  </p>
                  <h4 style={styles.modalSubTitle}>
                    제 4 조 (보상 정책 및 책임 제한)
                  </h4>
                  <p style={{ margin: "0 0 8px 0" }}>
                    회사는 회원의 소중한 의류가 손상되거나 분실된 경우, 별도로
                    규정된 왓씨의 케어 안심 보상 기준에 의거하여 정밀 심사 후
                    정밀 보상을 진행합니다.
                  </p>
                </div>
              ) : (
                <div style={styles.modalText}>
                  <h4 style={styles.modalSubTitle}>
                    1. 수집하는 개인정보 항목
                  </h4>
                  <p style={{ margin: "0 0 8px 0" }}>
                    - 필수항목: 이름, 이메일 주소, 로그인 식별 정보,
                    연락처(휴대전화 번호), 배송지 주소(공동현관 비밀번호 포함),
                    GPS 실시간 위치 정보(수거배송 서비스 이용 시)
                    <br />- 선택항목: 기기 식별자, 소셜 로그인 토큰 정보
                  </p>
                  <h4 style={styles.modalSubTitle}>
                    2. 개인정보의 수집 및 이용 목적
                  </h4>
                  <p style={{ margin: "0 0 8px 0" }}>
                    - 스마트 비대면 세탁 의뢰 및 60초 예약 프로세스 이행
                    <br />- 실시간 라이브 수거·배송 GPS 차량 매핑 및 라이더 배정
                    안내
                    <br />- AI 스마트 스캐너 분석 데이터 매칭 및 맞춤 의류관리
                    팁 제공
                  </p>
                  <h4 style={styles.modalSubTitle}>
                    3. 개인정보의 보유 및 이용 기간
                  </h4>
                  <p style={{ margin: "0 0 8px 0" }}>
                    - <strong>회원 탈퇴 시 즉시 파기</strong>
                    <br />- 단, 전자상거래 등에서의 소비자보호에 관한 법률 등
                    관계 법령의 규정에 의하여 보존할 필요가 있는 경우 법정 기간
                    동안 안전하게 보관합니다.
                  </p>
                  <h4 style={styles.modalSubTitle}>
                    4. 동의 거부 권리 및 불이익
                  </h4>
                  <p style={{ margin: "0 0 8px 0" }}>
                    회원은 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다.
                    단, 필수 정보 수집 동의 거부 시 왓씨 스마트 예약 및 수거배송
                    배정 서비스를 이용하실 수 없습니다.
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              style={styles.modalConfirmBtn}
              onClick={() => setActiveModal(null)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, any> = {
  container: {
    width: "100%",
    maxWidth: "min(880px, 100%)",
    minHeight: "100vh",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    padding: 0,
    boxSizing: "border-box",
  },
  heroSection: {
    position: "relative",
    width: "100%",
    height: "160px",
    background:
      "linear-gradient(180deg, #EFF6FF 0%, #DDEBFF 46%, #F8FBFF 100%)",
  },
  contentSection: {
    padding: "20px 16px 24px 16px",
    marginTop: "-24px",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    boxSizing: "border-box",
    flex: 1, // push button to bottom of screen
  },
  titleGroup: { display: "flex", flexDirection: "column", gap: "2px" },
  title: {
    fontSize: "34px",
    fontWeight: 700,
    color: "#0F172A",
    margin: 0,
    lineHeight: "1.05",
  },
  titleHighlight: { color: "#2563EB" },
  subtitle: {
    margin: "12px 0 0 0",
    fontSize: "20px",
    color: "rgba(71, 85, 105, 0.9)",
  },
  agreementCard: {
    padding: "18px",
    borderRadius: "28px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  totalAgreement: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px 0",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    textAlign: "left" as const,
  },
  statusDot: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #D8E1EE",
  },
  totalTextGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left" as const,
  },
  totalTitle: { fontSize: "19px", fontWeight: 800, color: "#0F172A" }, // fixed invisible text color
  totalCaption: { fontSize: "12px", color: "#64748B" },
  cardDivider: { height: "1px", backgroundColor: "#E2E8F0" },
  agreementList: { display: "flex", flexDirection: "column", gap: "10px" },
  agreementItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "10px 0",
    cursor: "pointer",
  },
  itemTitle: { fontSize: "14px", fontWeight: 600, color: "#0F172A" }, // fixed invisible text color
  detailButton: {
    border: "none",
    background: "transparent",
    marginLeft: "auto",
    cursor: "pointer",
  },
  chevron: { fontSize: "20px", color: "#94A3B8" },
  actionButton: {
    width: "100%",
    height: "56px", // match LoginPage btn height
    borderRadius: "14px", // match LoginPage btn border-radius
    border: "none",
    color: "#ffffff",
    fontSize: "16px", // match LoginPage btn font-size
    fontWeight: 800,
    cursor: "pointer",
    marginTop: "auto", // Pushes the button to the bottom!
    boxShadow: "0 10px 24px rgba(37,99,235,0.18)",
  },
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modalContent: {
    width: "min(480px, 90%)",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column" as const,
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.15)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  modalTitle: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#0F172A",
    margin: 0,
  },
  modalCloseBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    color: "#94A3B8",
    cursor: "pointer",
    padding: "0 4px",
    lineHeight: 1,
  },
  modalBody: {
    maxHeight: "300px",
    overflowY: "auto" as const,
    textAlign: "left" as const,
    marginBottom: "20px",
    paddingRight: "6px",
  },
  modalText: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#475569",
  },
  modalSubTitle: {
    fontSize: "13.5px",
    fontWeight: 700,
    color: "#1E293B",
    margin: "12px 0 6px",
  },
  modalConfirmBtn: {
    height: "48px",
    backgroundColor: "#2563EB",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
    boxShadow: "0 6px 16px rgba(37, 99, 235, 0.16)",
  },
};

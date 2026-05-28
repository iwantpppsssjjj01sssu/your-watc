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
          <span style={styles.actionArrow}>›</span>
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, any> = {
  container: {
    width: "100%",
    maxWidth: "390px",
    minHeight: "100vh",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  heroSection: {
    position: "relative",
    width: "100%",
    height: "160px",
    background:
      "linear-gradient(180deg, #EFF6FF 0%, #DDEBFF 46%, #F8FBFF 100%)",
  },
  contentSection: {
    padding: "20px 24px",
    marginTop: "-40px",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  titleGroup: { display: "flex", flexDirection: "column", gap: "2px" },
  title: {
    fontSize: "34px",
    fontWeight: 700,
    color: "#0F172A",
    margin: 0,
    lineHeight: "1.2",
  },
  titleHighlight: { color: "#2563EB" },
  subtitle: {
    marginTop: "12px",
    fontSize: "20px",
    color: "rgba(71, 85, 105, 0.9)",
    margin: 0,
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
  },
  statusDot: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
  },
  totalTextGroup: { display: "flex", flexDirection: "column" },
  totalTitle: { fontSize: "16px", fontWeight: 700 },
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
  itemTitle: { fontSize: "14px", fontWeight: 600 },
  detailButton: {
    border: "none",
    background: "transparent",
    marginLeft: "auto",
    cursor: "pointer",
  },
  chevron: { fontSize: "20px", color: "#94A3B8" },
  actionButton: {
    width: "100%",
    height: "58px",
    borderRadius: "20px",
    border: "none",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: 800,
    cursor: "pointer",
  },
};

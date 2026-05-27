import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backImg from "../../asset/img/back.png";

export function AgreementPage() {
  const navigate = useNavigate();

  // 체크박스 상태 관리
  const [checks, setChecks] = useState({
    all: false,
    item1: false,
    item2: false,
  });

  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | null>(
    null,
  );

  const handleAllCheck = () => {
    const newState = !checks.all;
    setChecks({ all: newState, item1: newState, item2: newState });
  };

  const handleItemCheck = (name: "item1" | "item2") => {
    setChecks((prev) => {
      const newState = { ...prev, [name]: !prev[name] };
      newState.all = newState.item1 && newState.item2;
      return newState;
    });
  };

  const handleOpenDetail = (e: React.MouseEvent, type: "terms" | "privacy") => {
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
      <style>{`
        body:has(#agreement-page-root) {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
      `}</style>
      
      {/* 상단 파스텔 배너 영역 */}
      <div style={styles.topImageSection}>
        <button
          style={styles.backButton}
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
        >
          <img src={backImg} alt="뒤로가기" style={styles.backButtonImage} />
        </button>
        <span style={styles.bannerShapeLarge} aria-hidden="true" />
        <span style={styles.bannerShapeMedium} aria-hidden="true" />
        <span style={styles.bannerShapeSmall} aria-hidden="true" />
        <span style={styles.bannerShapeTiny} aria-hidden="true" />
      </div>

      <div style={styles.contentSection}>
        <div style={styles.titleGroup}>
          <h1 style={styles.title}>왓씨 서비스 이용을 위해</h1>
          <h1 style={styles.title}>약관에 동의해 주세요.</h1>
        </div>

        {/* 체크 리스트 영역 */}
        <div style={styles.checkList}>
          {/* 전체 동의 */}
          <div style={styles.allCheckWrapper} onClick={handleAllCheck}>
            <div
              style={{
                ...styles.checkCircle,
                backgroundColor: checks.all ? "#3B82F6" : "#E0E0E0",
              }}
            >
              <span style={styles.checkMark}>✓</span>
            </div>
            <span style={styles.allCheckLabel}>전체 동의</span>
          </div>

          <div style={styles.divider} />

          {/* 필수 항목 1 */}
          <div
            style={styles.checkItem}
            onClick={() => handleItemCheck("item1")}
          >
            <div
              style={{
                ...styles.checkCircleSmall,
                backgroundColor: checks.item1 ? "#3B82F6" : "#E0E0E0",
              }}
            >
              <span style={styles.checkMarkSmall}>✓</span>
            </div>
            {/* 글자색을 완전한 검정색(#000000)으로 고정했습니다 */}
            <span style={styles.checkLabel}>[필수] 이용약관 동의</span>
            <span
              style={styles.arrowIcon}
              onClick={(e) => handleOpenDetail(e, "terms")}
            >
              ›
            </span>
          </div>

          {/* 필수 항목 2 */}
          <div
            style={styles.checkItem}
            onClick={() => handleItemCheck("item2")}
          >
            <div
              style={{
                ...styles.checkCircleSmall,
                backgroundColor: checks.item2 ? "#3B82F6" : "#E0E0E0",
              }}
            >
              <span style={styles.checkMarkSmall}>✓</span>
            </div>
            {/* 글자색을 완전한 검정색(#000000)으로 고정했습니다 */}
            <span style={styles.checkLabel}>
              [필수] 개인정보 수집 및 이용 동의
            </span>
            <span
              style={styles.arrowIcon}
              onClick={(e) => handleOpenDetail(e, "privacy")}
            >
              ›
            </span>
          </div>
        </div>
      </div>

      <button
        style={{
          ...styles.bottomBtn,
          backgroundColor: checks.item1 && checks.item2 ? "#2563EB" : "#CBD5E1",
        }}
        onClick={handleComplete}
      >
        동의하고 가입하기
      </button>

      {/* 약관 상세 팝업창 (모달) */}
      {activeModal && (
        <div style={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {activeModal === "terms"
                  ? "이용약관"
                  : "개인정보 수집 및 이용 동의"}
              </h2>
              <button
                style={styles.closeBtn}
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalBody}>
              {activeModal === "terms" ? (
                <p style={styles.modalText}>
                  제1조(목적)
                  <br />
                  <br />
                  본 약관은 왓씨(이하 "회사"라 함)가 제공하는 스마트 의류관리 및
                  세탁 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및
                  책임사항을 규정함을 목적으로 합니다.
                  <br />
                  <br />
                  제2조(정의)
                  <br />
                  1. "서비스"란 회사가 회원에게 제공하는 세탁, 수거, 배송 및
                  관련 부가서비스를 의미합니다.
                  <br />
                  2. "회원"이란 본 약관에 동의하고 서비스를 이용하는 고객을
                  말합니다.
                </p>
              ) : (
                <p style={styles.modalText}>
                  1. 수집하는 개인정보의 항목
                  <br />
                  <br />
                  회사는 서비스 제공을 위해 아래와 같은 최소한의 개인정보를
                  수집하고 있습니다.
                  <br />
                  - 필수항목: 이름, 연락처, 주소, 이메일, 결제정보
                  <br />
                  <br />
                  2. 개인정보 수집 및 이용 목적
                  <br />
                  - 서비스 제공 및 계약의 이행(세탁물 수거 및 배송)
                  <br />- 회원 관리 및 고객 상담
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 아이폰 12 Pro 사이즈(390px) 기준 스타일
const styles = {
  container: {
    width: "100%",
    maxWidth: "390px",
    minHeight: "100vh",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column" as const,
    position: "relative" as const,
    overflow: "hidden",
    fontFamily: "var(--font-pretendard)",
  },
  topImageSection: {
    width: "100%",
    height: "228px",
    flexShrink: 0,
    position: "relative" as const,
    overflow: "hidden",
    background: "#60A5FA",
  },
  backButton: {
    position: "absolute" as const,
    top: "18px",
    left: "18px",
    zIndex: 2,
    width: "40px",
    height: "40px",
    border: "none",
    backgroundColor: "transparent",
    color: "#FFFFFF",
    cursor: "pointer",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  backButtonImage: {
    width: "20px",
    height: "20px",
    objectFit: "contain" as const,
  },
  bannerShapeLarge: {
    position: "absolute" as const,
    top: "-50px",
    right: "-42px",
    width: "174px",
    height: "174px",
    borderRadius: "50%",
    border: "1px solid rgba(255, 255, 255, 0.58)",
    background:
      "radial-gradient(circle at 32% 24%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.5) 25%, rgba(219, 237, 255, 0.3) 60%, rgba(254, 226, 243, 0.22) 100%)",
    filter: "blur(1.5px)",
  },
  bannerShapeMedium: {
    position: "absolute" as const,
    bottom: "-42px",
    left: "-34px",
    width: "128px",
    height: "128px",
    borderRadius: "50%",
    border: "1px solid rgba(255, 255, 255, 0.56)",
    background:
      "radial-gradient(circle at 38% 30%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.48) 29%, rgba(252, 226, 242, 0.3) 66%, rgba(215, 236, 255, 0.23) 100%)",
    filter: "blur(1px)",
  },
  bannerShapeSmall: {
    position: "absolute" as const,
    top: "46px",
    left: "54px",
    width: "66px",
    height: "66px",
    borderRadius: "50%",
    border: "1px solid rgba(255, 255, 255, 0.62)",
    background:
      "radial-gradient(circle at 28% 22%, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.5) 28%, rgba(214, 235, 255, 0.32) 66%, rgba(253, 225, 241, 0.22) 100%)",
    filter: "blur(1px)",
  },
  bannerShapeTiny: {
    position: "absolute" as const,
    right: "93px",
    bottom: "40px",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "1px solid rgba(255, 255, 255, 0.64)",
    background:
      "radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.52) 35%, rgba(220, 238, 255, 0.28) 66%, rgba(253, 224, 240, 0.22) 100%)",
    filter: "blur(0.75px)",
  },
  contentSection: { padding: "32px 32px", flex: 1 },
  titleGroup: { marginBottom: "24px" },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
    lineHeight: "1.4",
    margin: 0,
  },
  checkList: { display: "flex", flexDirection: "column" as const, gap: "3px" },
  allCheckWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "4px 0",
    cursor: "pointer",
  },
  allCheckLabel: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000000",
    marginLeft: "12px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#E5E7EB",
    width: "100%",
    margin: "3px 0",
  },
  checkItem: {
    display: "flex",
    alignItems: "center",
    padding: "4px 0",
    cursor: "pointer",
  },
  checkCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.2s",
  },
  checkCircleSmall: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "12px",
    transition: "background-color 0.2s",
  },
  checkMark: { color: "white", fontSize: "18px", fontWeight: "bold" },
  checkMarkSmall: { color: "white", fontSize: "14px", fontWeight: "bold" },

  // 텍스트가 절대 안 보이거나 날아가지 않도록 진한 검정색(#000000)으로 고정
  checkLabel: {
    flex: 1,
    fontSize: "15px",
    color: "#000000",
    fontWeight: "500",
  },

  arrowIcon: {
    color: "#9CA3AF",
    fontSize: "24px",
    fontWeight: "300",
    padding: "0 10px",
    cursor: "pointer",
  },
  bottomBtn: {
    width: "calc(100% - 64px)",
    height: "56px",
    margin: "0 32px 32px 32px",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  modalOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    width: "85%",
    maxHeight: "70vh",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column" as const,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #F3F4F6",
  },
  modalTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: 0,
    color: "#111827",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#9CA3AF",
    cursor: "pointer",
  },
  modalBody: { padding: "20px", overflowY: "auto" as const },
  modalText: {
    fontSize: "13px",
    color: "#4B5563",
    lineHeight: "1.6",
    margin: 0,
  },
};

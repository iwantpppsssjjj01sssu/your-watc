import { useState } from "react";
import { useNavigate } from "react-router-dom";
import appleIcon from "../../asset/img/apple.png";
import googleIcon from "../../asset/img/google.png";
import kakaoIcon from "../../asset/img/kakaotalk.png";
import naverIcon from "../../asset/img/naver.png";
import watcLogo from "../../asset/img/watc_logo.png";

// 더미 계정 정보
const DUMMY_EMAIL = "watcTheLover410*";
const DUMMY_PASSWORD = "password01"; // 10자리

function UserIcon() {
  return (
    <svg
      style={styles.iconGraphic}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      style={styles.iconGraphic}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm6 4v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      style={styles.iconGraphic}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.75"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <div style={styles.spinnerContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.spinnerText}>소셜 계정 정보를 가져오는 중...</p>
    </div>
  );
}

interface SocialPermissionModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function SocialPermissionModal({
  onConfirm,
  onCancel,
}: SocialPermissionModalProps) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <p style={styles.modalTitle}>당신의 정보 허용하시겠습니까?</p>
        <div style={styles.modalButtons}>
          <button style={styles.modalNoBtn} onClick={onCancel}>
            아니요
          </button>
          <button style={styles.modalYesBtn} onClick={onConfirm}>
            예
          </button>
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);

  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

  const handleAutoFillDummy = () => {
    setEmail(DUMMY_EMAIL);
    setPassword(DUMMY_PASSWORD);
  };

  const handleLogin = () => {
    if (!isFormValid || email !== DUMMY_EMAIL || password !== DUMMY_PASSWORD) {
      alert("아이디와 비밀번호를 확인해 주세요");
      return;
    }
    navigate("/agree");
  };

  const triggerSocialLogin = () => {
    setShowSocialModal(true);
  };

  const handleSocialConfirm = async () => {
    setShowSocialModal(false);
    setShowLoadingSpinner(true);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setShowLoadingSpinner(false);
    setIsLoading(false);

    alert("로그인 성공!");
    navigate("/agree");
  };

  const handleSocialCancel = () => {
    setShowSocialModal(false);
  };

  return (
    <div id="login-page-root" style={styles.container}>
      <style>{`
        body:has(#login-page-root) {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
      `}</style>
      {/* [가로 풀 배너 교정 핵심 위치]
        부모의 padding 여백을 상쇄하는 음수 마진(-20px)과 폭 확장을 적용하여
        양옆이 완전히 꽉 찬 시원한 파란 배너 레이아웃을 구현했습니다.
      */}
      <div style={styles.topSection}>
        <div style={styles.bgCircle1}></div>
        <div style={styles.bgCircle2}></div>
        <img src={watcLogo} alt="WatC" style={styles.logo} />
      </div>

      {/* 하단 폼 입력 영역 */}
      <div style={styles.bottomSection}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>EMAIL OR USERNAME</label>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>
              <UserIcon />
            </span>
            <input
              style={styles.input}
              type="text"
              placeholder="아이디를 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <div style={styles.passwordHeader}>
            <label style={styles.label}>PASSWORD</label>
            <span style={styles.forgotPassword}>비밀번호를 잊으셨나요?</span>
          </div>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>
              <LockIcon />
            </span>
            <input
              style={styles.input}
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span style={styles.eyeIcon}>
              <EyeIcon />
            </span>
          </div>
        </div>

        <button
          style={{
            ...styles.mainLoginBtn,
            backgroundColor: "#2563EB",
            cursor: "pointer",
          }}
          onClick={handleLogin}
        >
          로그인
        </button>

        <div style={styles.demoHintRow}>
          <span style={styles.demoHint}>테스트 계정 안내</span>
          <button
            className="yes-btn-hover"
            style={styles.yesBtn}
            onClick={handleAutoFillDummy}
          >
            예
          </button>
        </div>

        <div style={styles.dividerContainer}>
          <div style={styles.line}></div>
          <span style={styles.dividerText}>다른 서비스 계정으로 로그인</span>
          <div style={styles.line}></div>
        </div>

        <div style={styles.socialGrid}>
          <button
            style={styles.socialBtn}
            onClick={triggerSocialLogin}
            disabled={isLoading}
          >
            <img
              src={kakaoIcon}
              alt=""
              aria-hidden="true"
              style={styles.socialIcon}
            />
            카카오톡
          </button>
          <button
            style={styles.socialBtn}
            onClick={triggerSocialLogin}
            disabled={isLoading}
          >
            <img
              src={naverIcon}
              alt=""
              aria-hidden="true"
              style={styles.socialIcon}
            />
            네이버
          </button>
          <button
            style={styles.socialBtn}
            onClick={triggerSocialLogin}
            disabled={isLoading}
          >
            <img
              src={googleIcon}
              alt=""
              aria-hidden="true"
              style={styles.socialIcon}
            />
            구글
          </button>
          <button
            style={styles.socialBtn}
            onClick={triggerSocialLogin}
            disabled={isLoading}
          >
            <img
              src={appleIcon}
              alt=""
              aria-hidden="true"
              style={styles.socialIcon}
            />
            Apple
          </button>
        </div>

        <div style={styles.signupContainer}>
          <span style={styles.signupText}>계정이 없으신가요? </span>
          <span style={styles.signupLink}>회원가입</span>
        </div>
      </div>

      {showSocialModal && (
        <SocialPermissionModal
          onConfirm={handleSocialConfirm}
          onCancel={handleSocialCancel}
        />
      )}

      {showLoadingSpinner && <LoadingSpinner />}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "390px",
    minHeight: "100vh",
    margin: "0 auto",
    backgroundColor: "var(--color-white)",
    position: "relative" as const,
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    fontFamily: "var(--font-pretendard)",
    color: "var(--color-black)",
    padding: "0 32px",
    boxSizing: "border-box" as const,
  },
  // 음수 마진 기법으로 양옆 레이아웃 여백을 완전히 뚫어버리는 튜닝
  topSection: {
    height: "22vh",
    marginLeft: "-32px",
    marginRight: "-32px",
    width: "calc(100% + 64px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as const,
    background: "linear-gradient(180deg, #2563EB 0%, #3B82F6 100%)",
  },
  bgCircle1: {
    position: "absolute" as const,
    width: "200px",
    height: "200px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "50%",
    top: "-50px",
    right: "-50px",
  },
  bgCircle2: {
    position: "absolute" as const,
    width: "150px",
    height: "150px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "50%",
    bottom: "20px",
    left: "-50px",
  },
  logo: {
    display: "block",
    width: "100px",
    maxWidth: "42%",
    height: "auto",
    zIndex: 2,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "60px 0px 24px 0px",
    display: "flex",
    flexDirection: "column" as const,
  },
  inputGroup: { marginBottom: "16px" },
  passwordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: "8px",
    display: "block",
  },
  forgotPassword: {
    fontSize: "12px",
    color: "#3B82F6",
    cursor: "pointer",
    marginBottom: "8px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F8FAFB",
    borderRadius: "14px",
    padding: "0 14px",
    height: "52px",
    border: "1px solid #EEF2FF",
  },
  icon: {
    color: "#9CA3AF",
    marginRight: "10px",
    width: "18px",
    height: "18px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  eyeIcon: {
    color: "#9CA3AF",
    marginLeft: "10px",
    cursor: "pointer",
    width: "18px",
    height: "18px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconGraphic: { display: "block", width: "18px", height: "18px" },
  input: {
    flex: 1,
    border: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    color: "#0F172A",
    outline: "none",
    fontFamily: "var(--font-pretendard)",
  },
  mainLoginBtn: {
    width: "100%",
    height: "56px",
    backgroundColor: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: 800,
    cursor: "pointer",
    marginTop: "14px",
    marginBottom: "28px",
    boxShadow: "0 10px 24px rgba(37,99,235,0.18)",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  line: { flex: 1, height: "1px", backgroundColor: "#E5E7EB" },
  dividerText: { margin: "0 15px", fontSize: "12px", color: "#9CA3AF" },
  socialGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "40px",
  },
  socialBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "48px",
    backgroundColor: "white",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    cursor: "pointer",
  },
  socialIcon: {
    display: "block",
    width: "24px",
    height: "24px",
    marginRight: "8px",
    objectFit: "contain" as const,
    flexShrink: 0,
  },
  signupContainer: {
    textAlign: "center" as const,
    marginTop: "auto",
    paddingBottom: "10px",
    fontSize: "13px",
  },
  signupText: { color: "#6B7280" },
  signupLink: { color: "#374151", fontWeight: "bold", cursor: "pointer" },
  demoHintRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "20px",
    gap: "6px",
  },
  demoHint: { fontSize: "14px", color: "#2563EB" },
  yesBtn: {
    backgroundColor: "transparent",
    color: "#2563EB",
    border: "none",
    fontSize: "14px",
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
  },
  spinnerContainer: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: "4px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
  spinnerText: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center" as const,
  },
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContent: {
    width: "300px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "24px 20px",
    textAlign: "center" as const,
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.15)",
  },
  modalTitle: {
    fontSize: "15px",
    color: "#1E293B",
    fontWeight: "700",
    marginBottom: "20px",
  },
  modalButtons: { display: "flex", gap: "10px" },
  modalNoBtn: {
    flex: 1,
    height: "44px",
    backgroundColor: "#F1F5F9",
    color: "#64748B",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  modalYesBtn: {
    flex: 1,
    height: "44px",
    backgroundColor: "#2563EB",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },
};

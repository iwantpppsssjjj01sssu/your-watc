import { useNavigate } from "react-router-dom";
import backImg from "../asset/img/back.png";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      style={styles.backButton}
      type="button"
      aria-label="뒤로가기"
      onClick={() => navigate(-1)}
    >
      <img src={backImg} alt="뒤로가기" style={styles.backButtonImage} />
    </button>
  );
}

const styles = {
  backButton: {
    position: "absolute" as const,
    top: "18px",
    left: "18px",
    zIndex: 12,
    width: "42px",
    height: "42px",
    border: "1px solid rgba(255, 255, 255, 0.45)",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(14px)",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    boxSizing: "border-box" as const,
    transition: "transform 0.22s ease, background-color 0.22s ease",
  },
  backButtonImage: {
    width: "20px",
    height: "20px",
    objectFit: "contain" as const,
  },
};

import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="premium_back_btn"
      style={{
        position: "absolute",
        top: "18px",
        left: "18px",
        zIndex: 110,
      }}
      type="button"
      aria-label="뒤로가기"
      onClick={() => navigate(-1)}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}

import type { ComponentType } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Bottom Tab Bar Navigation Icons (Using the premium home screen line icons)
function NavHomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="home_tab_icon"
      viewBox="0 0 24 24"
      fill={active ? "#2563eb" : "none"}
      stroke={active ? "#2563eb" : "#94a3b8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "24px", height: "24px" }}
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" fill="none" />
      <path d="M3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" fill="none" />
      <path
        d="M3 9a1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0 1.5 1.5 0 0 0 3 0"
        fill={active ? "#2563eb" : "#94a3b8"}
      />
    </svg>
  );
}

function NavReserveIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="home_tab_icon"
      viewBox="0 0 24 24"
      fill={active ? "#2563eb" : "none"}
      stroke={active ? "#2563eb" : "#94a3b8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "24px", height: "24px" }}
    >
      <path d="M6 20V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" />
      <path d="M16 6a4 4 0 0 0-8 0" fill="none" />
      <circle
        cx="17"
        cy="17"
        r="4.5"
        fill={active ? "#ffffff" : "#f8fafc"}
        stroke={active ? "#2563eb" : "#94a3b8"}
        strokeWidth="1.5"
      />
      <path
        d="M15.5 17l1 1 2-2"
        fill="none"
        stroke={active ? "#2563eb" : "#94a3b8"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function NavDeliveryIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="home_tab_icon"
      viewBox="0 0 24 24"
      fill={active ? "#2563eb" : "none"}
      stroke={active ? "#2563eb" : "#94a3b8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "24px", height: "24px" }}
    >
      <circle cx="9" cy="21" r="1.5" fill={active ? "#2563eb" : "#94a3b8"} />
      <circle cx="20" cy="21" r="1.5" fill={active ? "#2563eb" : "#94a3b8"} />
      <path
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        fill="none"
      />
    </svg>
  );
}

function NavCareIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="home_tab_icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#2563eb" : "#94a3b8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "24px", height: "24px" }}
    >
      <path d="M12 7a3 3 0 1 0-3-3M12 7L2 14.5a1.5 1.5 0 0 0 .5 2.5h19a1.5 1.5 0 0 0 .5-2.5L12 7Z" />
    </svg>
  );
}

function NavMyIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="home_tab_icon"
      viewBox="0 0 24 24"
      fill={active ? "#2563eb" : "none"}
      stroke={active ? "#2563eb" : "#94a3b8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "24px", height: "24px" }}
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current active tab based on router pathname and query parameter
  const activeTab = (() => {
    if (location.pathname === "/delivery") return "delivery";
    if (location.pathname === "/home") {
      const params = new URLSearchParams(location.search);
      const tab = params.get("tab");
      if (
        tab === "home" ||
        tab === "reserve" ||
        tab === "delivery" ||
        tab === "care" ||
        tab === "mypage"
      ) {
        return tab;
      }
    }
    return "home"; // Default active tab is home
  })();

  const handleTabClick = (
    tab: "home" | "reserve" | "delivery" | "care" | "mypage",
  ) => {
    if (tab === "delivery") {
      navigate("/delivery");
    } else {
      navigate(`/home?tab=${tab}`);
    }
  };

  const renderTab = (
    tab: "home" | "reserve" | "delivery" | "care" | "mypage",
    Icon: ComponentType<{ active: boolean }>,
    label: string,
  ) => {
    const isActive = activeTab === tab;
    return (
      <button
        type="button"
        className={`home_tab_item ${isActive ? "home_tab_item--active" : ""}`}
        onClick={() => handleTabClick(tab)}
        style={styles.btnOverride}
      >
        <div className="home_tab_fill">
          <Icon active={true} />
          <span className="home_tab_label">{label}</span>
        </div>
        <div className="home_tab_content">
          <Icon active={false} />
          <span className="home_tab_label">{label}</span>
        </div>
        {isActive && <span className="home_tab_indicator" aria-hidden="true" />}
      </button>
    );
  };

  return (
    <nav
      className="home_tab_bar"
      aria-label="하단 네비게이션"
      style={styles.navOverride}
    >
      {renderTab("home", NavHomeIcon, "홈")}
      {renderTab("reserve", NavReserveIcon, "예약")}
      {renderTab("delivery", NavDeliveryIcon, "수거·배송")}
      {renderTab("care", NavCareIcon, "의류관리")}
      {renderTab("mypage", NavMyIcon, "MY")}
    </nav>
  );
}

const styles = {
  navOverride: {
    position: "fixed" as const,
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "390px",
    height: "80px",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1000,
    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.03)",
    boxSizing: "border-box" as const,
    padding: "0 8px",
  },
  btnOverride: {
    background: "none",
    border: "none",
    padding: "6px 0",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    cursor: "pointer",
    position: "relative" as const,
    outline: "none",
    height: "100%",
    boxSizing: "border-box" as const,
  },
};

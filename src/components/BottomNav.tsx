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
      fill="none"
      stroke={active ? "#2563eb" : "#94a3b8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "24px", height: "24px" }}
    >
      {active && (
        <polygon
          points="6.5,6 22.5,6 19.8,14.4 9.2,14.4"
          fill="#2563eb"
          stroke="#2563eb"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      )}
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
  const color = active ? "#2563eb" : "#94a3b8";
  const innerHangerColor = active ? "#ffffff" : "#f1f5f9";
  return (
    <svg
      className="home_tab_icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "24px", height: "24px" }}
    >
      <g>
        {/* Hanger hook emerging from shirt neck */}
        <path
          d="M12 7a3 3 0 1 0-3-3"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        {/* Premium T-shirt draped on the hanger (Always filled) */}
        <path
          d="M 6 8.5 L 2 11 L 4.5 15 L 7.5 13.5 L 7.5 21 L 16.5 21 L 16.5 13.5 L 19.5 15 L 22 11 L 18 8.5 C 17.5 8.7 15 9.5 12 9.5 C 9 9.5 6.5 8.7 6 8.5 Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Hanger body lines visible inside the T-shirt */}
        <path
          d="M12 8.2 L6 12 H18 Z"
          fill="none"
          stroke={innerHangerColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </g>
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
    maxWidth: "min(880px, 100%)",
    height: "calc(96px + env(safe-area-inset-bottom, 0px))",

    backgroundColor: "#ffffff",

    borderTop: "1px solid #e2e8f0",

    boxShadow: "0 -4px 16px rgba(15, 23, 42, 0.08)",

    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",

    padding: "10px 8px env(safe-area-inset-bottom, 0px)",
  },
  btnOverride: {
    background: "none",
    border: "none",
    padding: "0",

    display: "flex",
    flexDirection: "column" as const,

    alignItems: "center",

    justifyContent: "flex-start", // center → flex-start

    flex: 1,
    height: "100%",
  },
};

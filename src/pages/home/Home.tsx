import { useState } from "react";

export function Home() {
  const [activeTab, setActiveTab] = useState<string>("home");

  // 실시간 이용 현황 가상 데이터
  const laundryStatus = {
    step: 2, // 1: 수거완료, 2: 세탁중, 3: 건조중, 4: 배송시작
    stepName: "스마트 세탁 중",
    desc: "하은님의 소중한 의류를 깨끗하게 케어하고 있어요.",
    eta: "오늘 저녁 7시 도착 예정",
  };

  return (
    <div style={styles.container}>
      <style>{`
        /* 클릭 시 쫀득하게 반응하는 UI 피드백 모션 */
        .action_card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .action_card:active {
          transform: scale(0.98);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .tab_item {
          transition: color 0.2s ease, transform 0.1s ease;
        }
        .tab_item:active {
          transform: scale(0.95);
        }
        .avatar_glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
        }
      `}</style>

      {/* HEADER BAR */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>왓씨</h1>
        <button style={styles.notifyButton}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
      </header>

      {/* SCROLLABLE MAIN CONTENT */}
      <main style={styles.mainContent}>
        {/* USER PROFILE CARD */}
        <section style={styles.profileCard}>
          <div style={styles.profileInfo}>
            <div className="avatar_glow" style={styles.avatar}>
              <span style={styles.avatarText}>H</span>
            </div>
            <div>
              <h2 style={styles.userName}>Haeun Park</h2>
              <p style={styles.userSub}>Premium Membership</p>
            </div>
          </div>
          <div style={styles.pointsBadge}>
            <span style={styles.pointsValue}>2,450</span>
            <span style={styles.pointsLabel}> P</span>
          </div>
        </section>

        {/* LIVE LAUNDRY STATUS TRACKER */}
        <section style={styles.statusSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>실시간 이용 현황</h3>
            <span style={styles.etaText}>{laundryStatus.eta}</span>
          </div>

          <div style={styles.statusBox}>
            <div style={styles.statusTitleRow}>
              <span style={styles.statusHighlight}>
                {laundryStatus.stepName}
              </span>
              <span style={styles.stepIndicator}>
                Step {laundryStatus.step}/4
              </span>
            </div>
            <p style={styles.statusDesc}>{laundryStatus.desc}</p>

            {/* PROGRESS BAR */}
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${(laundryStatus.step / 4) * 100}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS GRID */}
        <section style={styles.gridSection}>
          <h3 style={styles.sectionTitle}>원터치 세탁 신청</h3>
          <div style={styles.grid}>
            <div className="action_card" style={styles.card}>
              <div
                style={{
                  ...styles.cardIconBox,
                  backgroundColor: "rgba(29, 78, 216, 0.15)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span style={styles.cardTitle}>일반 세탁</span>
              <span style={styles.cardSub}>생활 빨래 · 이불</span>
            </div>

            <div className="action_card" style={styles.card}>
              <div
                style={{
                  ...styles.cardIconBox,
                  backgroundColor: "rgba(236, 72, 153, 0.15)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2"
                >
                  <path d="M20.37 4.63a2.12 2.12 0 0 0-3 0l-7 7a2.13 2.13 0 0 0-.5 1l-1 4 4-1a2.11 2.11 0 0 0 1-.5l7-7a2.12 2.12 0 0 0 0-3z" />
                </svg>
              </div>
              <span style={styles.cardTitle}>드라이클리닝</span>
              <span style={styles.cardSub}>정장 · 코트 · 패딩</span>
            </div>

            <div className="action_card" style={styles.card}>
              <div
                style={{
                  ...styles.cardIconBox,
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span style={styles.cardTitle}>프리미엄 슈즈</span>
              <span style={styles.cardSub}>운동화 · 명품 구두</span>
            </div>

            <div className="action_card" style={styles.card}>
              <div
                style={{
                  ...styles.cardIconBox,
                  backgroundColor: "rgba(234, 179, 8, 0.15)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <span style={styles.cardTitle}>24h 당일배송</span>
              <span style={styles.cardSub}>초고속 밤샘 세탁</span>
            </div>
          </div>
        </section>
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <nav style={styles.bottomNav}>
        <button
          className="tab_item"
          style={{
            ...styles.navItem,
            color: activeTab === "home" ? "#38bdf8" : "#94a3b8",
          }}
          onClick={() => setActiveTab("home")}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <span style={styles.navLabel}>홈</span>
        </button>

        <button
          className="tab_item"
          style={{
            ...styles.navItem,
            color: activeTab === "history" ? "#38bdf8" : "#94a3b8",
          }}
          onClick={() => setActiveTab("history")}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span style={styles.navLabel}>이용내역</span>
        </button>

        <button
          className="tab_item"
          style={{
            ...styles.navItem,
            color: activeTab === "mypage" ? "#38bdf8" : "#94a3b8",
          }}
          onClick={() => setActiveTab("mypage")}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span style={styles.navLabel}>마이</span>
        </button>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "100%",
    height: "100vh",
    backgroundColor: "#0f172a", // 스튜디오 무드의 시크한 딥블루(다크 실버) 배경
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    position: "relative" as const,
    fontFamily: "var(--font-pretendard), -apple-system, sans-serif",
  },
  header: {
    width: "100%",
    padding: "20px 20px 16px 20px",
    display: "flex",
    justifyContent: "space-between" as any,
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  headerTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 900,
    color: "#ffffff",
    letterSpacing: "-0.5px",
  },
  notifyButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "20px 20px 100px 20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  profileCard: {
    width: "100%",
    padding: "20px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #1e293b 0%, #111827 100%)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    display: "flex",
    justifyContent: "space-between" as any,
    alignItems: "center",
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#1d4ed8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: 700,
  },
  userName: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#ffffff",
    margin: 0,
  },
  userSub: {
    fontSize: "12px",
    color: "#94a3b8",
    margin: "4px 0 0 0",
  },
  pointsBadge: {
    textAlign: "right" as const,
  },
  pointsValue: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#38bdf8",
  },
  pointsLabel: {
    fontSize: "13px",
    color: "#94a3b8",
  },
  statusSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between" as any,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#f1f5f9",
    margin: 0,
  },
  etaText: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#f43f5e",
  },
  statusBox: {
    width: "100%",
    padding: "20px",
    borderRadius: "16px",
    backgroundColor: "#1e293b",
    border: "1px solid rgba(255, 255, 255, 0.04)",
  },
  statusTitleRow: {
    display: "flex",
    justifyContent: "space-between" as any,
    alignItems: "center",
    marginBottom: "8px",
  },
  statusHighlight: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#ffffff",
  },
  stepIndicator: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#38bdf8",
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    padding: "3px 8px",
    borderRadius: "10px",
  },
  statusDesc: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: "0 0 16px 0",
    lineHeight: "1.4",
  },
  progressTrack: {
    width: "100%",
    height: "6px",
    backgroundColor: "#0f172a",
    borderRadius: "3px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #1d4ed8 0%, #38bdf8 100%)",
    borderRadius: "3px",
    transition: "width 0.5s ease-in-out",
  },
  gridSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  card: {
    backgroundColor: "#1e293b",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "16px",
    padding: "18px",
    display: "flex",
    flexDirection: "column" as const,
    cursor: "pointer",
  },
  cardIconBox: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#ffffff",
  },
  cardSub: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "4px",
  },
  bottomNav: {
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "76px",
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(16px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: "10px",
    zIndex: 9999,
  },
  navItem: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "5px",
    padding: "6px 20px",
  },
  navLabel: {
    fontSize: "11px",
    fontWeight: 600,
  },
};

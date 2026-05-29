import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgreementStepLayout } from "./AgreementStepShared";
import r1Img from "../../asset/img/r1.png";

const benefits = ["서비스 진행 상황", "이벤트 알림", "불필요한 광고 방지"];

export function AgreementStep1() {
  const navigate = useNavigate();

  // 각 항목의 체크 여부를 저장하는 상태 (처음에는 모두 false = 비활성화 회색)
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({
    "서비스 진행 상황": false,
    "이벤트 알림": false,
    "불필요한 광고 방지": false,
  });

  // 모달 노출 상태 추가
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showAttSuccess, setShowAttSuccess] = useState(false);

  // 모든 항목이 선택되었는지 여부
  const allSelected = benefits.every((benefit) => selectedItems[benefit]);

  // 최소 하나 이상 선택되었는지 여부
  const hasSelected = benefits.some((benefit) => selectedItems[benefit]);

  // 개별 토글
  const handleToggle = (benefit: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [benefit]: !prev[benefit],
    }));
  };

  // 전체 선택 / 해제
  const handleAllToggle = () => {
    const targetState = !allSelected;
    const nextState = { ...selectedItems };
    benefits.forEach((benefit) => {
      nextState[benefit] = targetState;
    });
    setSelectedItems(nextState);
  };

  return (
    <AgreementStepLayout
      onBack={() => navigate(-1)}
      onContinue={() => setShowTrackingModal(true)}
      continueDisabled={!hasSelected}
      continueEmphasized={hasSelected}
      title={
        <>
          더 스마트한
          <br />
          <span className="agreement_step_title_highlight">세탁 경험</span>을
          위해
        </>
      }
      overlay={
        <>
          {showTrackingModal && (
            <>
              <div className="agreement_step_overlay" aria-hidden="true" />
              <section
                className="agreement_step_alert"
                role="dialog"
                aria-modal="true"
                aria-labelledby="tracking-alert-title"
              >
                <div className="agreement_step_alert_body">
                  <div className="agreement_step_alert_icon" aria-hidden="true">
                    {r1Img ? (
                      <img src={r1Img} alt="앱 추적 권한 아이콘" />
                    ) : (
                      "W"
                    )}
                  </div>
                  <h2
                    className="agreement_step_alert_title"
                    id="tracking-alert-title"
                  >
                    고객님께 꼭 맞는 세탁 경험을 위해
                    <br />
                    일부 활동 정보 접근 권한이 필요해요
                  </h2>
                  <p className="agreement_step_alert_text">
                    취향에 맞는 세탁 추천과 혜택을 받을 수 있어요
                  </p>
                </div>
                <div className="agreement_step_alert_actions">
                  <button
                    className="agreement_step_alert_button"
                    type="button"
                    onClick={() => navigate("/home")}
                  >
                    지금은 괜찮아요
                  </button>
                  <button
                    className="agreement_step_alert_button agreement_step_alert_button--allow"
                    type="button"
                    onClick={() => {
                      setShowTrackingModal(false);
                      setShowAttSuccess(true);
                    }}
                  >
                    맞춤 서비스 받기
                  </button>
                </div>
              </section>
            </>
          )}

          {showAttSuccess && (
            <>
              <div className="att_success_overlay" aria-hidden="true" />
              <section
                className="att_success_toast"
                role="status"
                onClick={() => navigate("/home")}
              >
                <span className="att_success_icon" aria-hidden="true">
                  ✨
                </span>
                <p className="att_success_text">
                  맞춤 서비스가 설정되었어요!
                  <br />
                  좋은 세탁 경험되세요.
                </p>
              </section>
            </>
          )}
        </>
      }
    >
      <p className="agreement_step_supporting">
        필요한 소식만 편하게 받아보세요.
      </p>

      <div className="agreement_step_card">
        {/* 전체 선택 버튼 */}
        <div className="agreement_step_all_select" onClick={handleAllToggle}>
          <span
            className={`agreement_step_benefit_check ${
              allSelected ? "agreement_step_benefit_check--active" : ""
            }`}
            aria-hidden="true"
          />
          <span className="agreement_step_all_select_text">전체 선택</span>
        </div>

        <div className="agreement_step_divider" />

        <ul className="agreement_step_benefits">
          {benefits.map((benefit) => {
            const isActive = selectedItems[benefit];
            return (
              <li
                className="agreement_step_benefit"
                key={benefit}
                onClick={() => handleToggle(benefit)}
              >
                <span
                  className={`agreement_step_benefit_check ${
                    isActive ? "agreement_step_benefit_check--active" : ""
                  }`}
                  aria-hidden="true"
                />
                {benefit}
              </li>
            );
          })}
        </ul>
      </div>
    </AgreementStepLayout>
  );
}

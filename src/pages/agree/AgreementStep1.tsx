import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgreementStepLayout } from "./AgreementStepShared";

const benefits = ["서비스 진행 상황", "이벤트 알림", "불필요한 광고 방지"];

export function AgreementStep1() {
  const navigate = useNavigate();

  // 각 항목의 체크 여부를 저장하는 상태 (처음에는 모두 false = 비활성화 회색)
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({
    "서비스 진행 상황": false,
    "이벤트 알림": false,
    "불필요한 광고 방지": false,
  });

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
      onContinue={() => navigate("/agree2")}
      continueDisabled={!hasSelected}
      continueEmphasized={hasSelected}
      title={
        <>
          더 스마트한
          <br />
          <span className="agreement_step_title_highlight">세탁 경험</span>을 위해
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

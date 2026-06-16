import { useNavigate } from "react-router-dom";
import { AgreementStepLayout, TrackingChoice } from "./AgreementStepShared";
import r1Img from "../../asset/img/r1.png";

export function AgreementStep3() {
  const navigate = useNavigate();

  return (
    <AgreementStepLayout
      onBack={() => navigate(-1)}
      onContinue={() => undefined}
      continueDisabled
      lead={<TrackingChoice lead value="allow" />}
      overlay={
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
                {r1Img ? <img src={r1Img} alt="앱 추적 권한 아이콘" /> : "W"}
              </div>
              <h2
                className="agreement_step_alert_title"
                id="tracking-alert-title"
              >
                고객님께 꼭 맞는 세탁 경험을 위해<br />
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
                onClick={() => navigate("/home")}
              >
                맞춤 서비스 받기
              </button>
            </div>
          </section>
        </>
      }
    >
      <p className="agreement_step_supporting">
        다음 화면에서 <strong>허용</strong>을 선택해 주세요.
      </p>
    </AgreementStepLayout>
  );
}

import type { ReactNode } from "react";
import "./AgreementSteps.css";
import backImg from "../../asset/img/back.png";

type AgreementStepLayoutProps = {
  children: ReactNode;
  lead?: ReactNode;
  onBack: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueEmphasized?: boolean;
  overlay?: ReactNode;
  showBanner?: boolean; // 상단 파란 버블 배너 노출 여부
};

export type TrackingPermission = "deny" | "allow";

export function BubbleBanner() {
  return (
    <div className="agreement_step_banner" aria-hidden="true">
      <span className="agreement_step_bubble agreement_step_bubble--large" />
      <span className="agreement_step_bubble agreement_step_bubble--medium" />
      <span className="agreement_step_bubble agreement_step_bubble--small" />
      <span className="agreement_step_bubble agreement_step_bubble--tiny" />
    </div>
  );
}

export function AgreementStepLayout({
  children,
  lead,
  onBack,
  onContinue,
  continueDisabled = false,
  continueEmphasized = false,
  overlay,
  showBanner = true, // 기본값은 true
}: AgreementStepLayoutProps) {
  return (
    <main className={`agreement_step_page ${!showBanner ? "agreement_step_page--nobanner" : ""}`}>
      {showBanner && (
        <button
          className="agreement_step_back"
          type="button"
          aria-label="뒤로가기"
          onClick={onBack}
        >
          <img src={backImg} alt="뒤로가기" />
        </button>
      )}
      {showBanner && <BubbleBanner />}
      <section className="agreement_step_body">
        {lead}
        <h1 className="agreement_step_title">
          더 스마트한 세탁 경험을 위해
        </h1>
        {children}
      </section>
      <button
        className={`agreement_step_continue${continueEmphasized ? " agreement_step_continue--emphasized" : ""}`}
        type="button"
        onClick={onContinue}
        disabled={continueDisabled}
      >
        계속하기
      </button>
      {overlay}
    </main>
  );
}

type TrackingChoiceProps = {
  lead?: boolean;
  value?: TrackingPermission;
  onChange?: (permission: TrackingPermission) => void;
};

export function TrackingChoice({
  lead = false,
  value = "allow",
  onChange,
}: TrackingChoiceProps) {
  return (
    <div
      className={`agreement_step_choice${lead ? " agreement_step_choice--lead" : ""}`}
    >
      <span className="agreement_step_choice_label">앱 추적 권한 설정</span>
      <div className="agreement_step_choice_switch" aria-label="추적 권한 선택">
        <button
          className={`agreement_step_choice_option${value === "deny" ? " agreement_step_choice_option--selected" : ""}`}
          type="button"
          aria-pressed={value === "deny"}
          onClick={() => onChange?.("deny")}
          disabled={!onChange}
        >
          앱에 추적 금지 요청
        </button>
        <button
          className={`agreement_step_choice_option${value === "allow" ? " agreement_step_choice_option--selected" : ""}`}
          type="button"
          aria-pressed={value === "allow"}
          onClick={() => onChange?.("allow")}
          disabled={!onChange}
        >
          {value === "allow" ? (
            <span className="agreement_step_choice_dot" aria-hidden="true" />
          ) : null}
          허용
        </button>
      </div>
    </div>
  );
}

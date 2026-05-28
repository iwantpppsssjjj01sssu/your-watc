import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AgreementStepLayout,
  type TrackingPermission,
} from "./AgreementStepShared";
import agreeIcon from "../../asset/img/agree_icon.png";
import eventIcon from "../../asset/img/event_icon.png";
import nosoundIcon from "../../asset/img/nosound_icon.png";

export function AgreementStep2() {
  const navigate = useNavigate();
  const [trackingPermission, setTrackingPermission] =
    useState<TrackingPermission>("allow");

  return (
    <AgreementStepLayout
      title={"맞춤형 서비스 제공을 위해 허용을 눌러주세요"}
      onBack={() => navigate(-1)}
      onContinue={() => navigate("/agree3")}
      continueEmphasized={true} // 시안처럼 언제나 강조된 꽉 찬 파란색 버튼 상태 유지
      showBanner={false} // [피그마 시안 반영] 파란색 버블 배너 없는 화이트 배경 모드 작동
    >
      {/* [1. iOS ATT 추적 권한 선택 커스텀 회색 카드] */}
      <div className="att_card_container">
        <button
          className={`att_card_row att_card_row--top ${
            trackingPermission === "deny" ? "att_card_row--selected" : ""
          }`}
          onClick={() => setTrackingPermission("deny")}
          type="button"
        >
          {trackingPermission === "deny" && (
            <span className="att_check_icon">✓</span>
          )}
          앱에 추적 금지 요청
        </button>
        <button
          className={`att_card_row ${
            trackingPermission === "allow" ? "att_card_row--selected" : ""
          }`}
          onClick={() => setTrackingPermission("allow")}
          type="button"
        >
          {trackingPermission === "allow" && (
            <span className="att_check_icon">✓</span>
          )}
          허용
        </button>
      </div>

      {/* [2. 고정된 혜택 정보 안내 파란 라인 아이콘 리스트] */}
      <ul className="benefit_info_list">
        <li className="benefit_info_item">
          <div className="benefit_info_circle" aria-hidden="true">
            <img
              src={agreeIcon}
              alt=""
              style={{
                width: "32px",
                height: "32px",
                objectFit: "contain" as const,
              }}
            />
          </div>
          <span className="benefit_info_text">
            서비스 진행 상황을 알려드려요
          </span>
        </li>

        <li className="benefit_info_item">
          <div className="benefit_info_circle" aria-hidden="true">
            <img
              src={eventIcon}
              alt=""
              style={{
                width: "32px",
                height: "32px",
                objectFit: "contain" as const,
              }}
            />
          </div>
          <span className="benefit_info_text">
            맞춤형 할인, 이벤트 정보를 알려드려요
          </span>
        </li>

        <li className="benefit_info_item">
          <div className="benefit_info_circle" aria-hidden="true">
            <img
              src={nosoundIcon}
              alt=""
              style={{
                width: "32px",
                height: "32px",
                objectFit: "contain" as const,
              }}
            />
          </div>
          <span className="benefit_info_text">
            불필요한 광고 알림을 제한할 수 있어요
          </span>
        </li>
      </ul>

      {/* [3. 하단 법적/정책적 가이드 설명 텍스트] */}
      <p className="agreement_bottom_legal_text">
        사용자 정보는 애플 정책 기반 개인화된 광고 제공 목적으로만 사용되며,
        허용 상태는 설정 메뉴에서 언제든지 변경할 수 있습니다.
      </p>
    </AgreementStepLayout>
  );
}

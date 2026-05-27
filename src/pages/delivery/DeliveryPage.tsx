import { useNavigate } from "react-router-dom";
import "./DeliveryPage.css";
import { BottomNav } from "../../components/BottomNav";

export function DeliveryPage() {
  const navigate = useNavigate();

  return (
    <div className="delivery_container">
      <header className="delivery_header">
        <button
          type="button"
          className="delivery_back_button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="delivery_title">수거·배송 현황</h1>
        <div className="delivery_header_right_spacer" />
      </header>

      <div className="delivery_content">
        <p className="delivery_content_subtitle">수거 요청 접수 · 예약 정보 확인</p>

        <section className="delivery_summary_cards">
          <div className="delivery_summary_card delivery_summary_card--active">
            <p className="delivery_summary_label">수거 요청 접수</p>
            <strong>예약 정보 확인</strong>
          </div>
          <div className="delivery_summary_card">
            <p className="delivery_summary_label">라이더 배정</p>
            <p>라이더 정보 확인</p>
          </div>
        </section>

        <section className="delivery_section">
          <div className="delivery_section_header">
            <div>
              <p className="delivery_section_label">라이더 배정</p>
              <h2 className="delivery_section_title">라이더 정보 확인</h2>
            </div>
            <span className="delivery_status_badge">배정 완료</span>
          </div>

          <div className="delivery_rider_card">
            <div className="delivery_rider_info">
              <p className="delivery_rider_name">이름: 김민수</p>
              <p className="delivery_rider_rating">평점: ★ 4.9</p>
              <p className="delivery_rider_contact">연락처: 010-1234-5678</p>
              <p className="delivery_rider_eta">예상 도착 정보: 10분 내 도착</p>
            </div>
            <div className="delivery_rider_avatar" aria-hidden="true">
              <span>라이더</span>
            </div>
          </div>
        </section>

        <section className="delivery_section">
          <div className="delivery_section_header">
            <div>
              <p className="delivery_section_label">수거 진행</p>
              <h2 className="delivery_section_title">
                실시간 위치 확인부터 인증까지
              </h2>
            </div>
          </div>

          <div className="delivery_grid">
            <article className="delivery_card">
              <h3>실시간 위치 확인</h3>
              <p>지도 기반 위치 표시, 이동 경로 확인</p>
              <div className="delivery_map_box">
                <div className="delivery_map_path" />
                <span className="delivery_map_pin delivery_map_pin--start">
                  출발
                </span>
                <span className="delivery_map_pin delivery_map_pin--end">
                  도착
                </span>
              </div>
            </article>

            <article className="delivery_card">
              <h3>도착 정보</h3>
              <ul className="delivery_list">
                <li>도착 임박 알림</li>
                <li>도착 완료 알림</li>
              </ul>
            </article>

            <article className="delivery_card">
              <h3>수거 방식 진행</h3>
              <div className="delivery_pill_group">
                <span className="delivery_pill">문 앞 수거</span>
                <span className="delivery_pill">경비실 수거</span>
                <span className="delivery_pill">택배함 수거</span>
                <span className="delivery_pill">직접 전달</span>
              </div>
            </article>

            <article className="delivery_card">
              <h3>수거 인증</h3>
              <p>수거 완료 사진, 수거 완료 확인</p>
              <button className="delivery_confirm_button">수거 완료 확인</button>
            </article>
          </div>
        </section>

        <section className="delivery_status_section">
          <div className="delivery_section_header">
            <div>
              <p className="delivery_section_label">세탁 진행 상태</p>
              <h2 className="delivery_section_title">현재 세탁 스테이지</h2>
            </div>
          </div>

          <div className="delivery_step_list">
            <div className="delivery_step_item delivery_step_item--active">
              세탁 접수
            </div>
            <div className="delivery_step_item delivery_step_item--active">
              세탁 중
            </div>
            <div className="delivery_step_item">건조 중</div>
            <div className="delivery_step_item">검수 완료</div>
          </div>
        </section>

        <section className="delivery_status_section">
          <div className="delivery_section_header">
            <div>
              <p className="delivery_section_label">배송 진행</p>
              <h2 className="delivery_section_title">배송 단계 확인</h2>
            </div>
          </div>

          <div className="delivery_action_list">
            <div className="delivery_action_card">
              <p className="delivery_action_label">배송 출발</p>
              <strong>출발 준비 완료</strong>
            </div>
            <div className="delivery_action_card">
              <p className="delivery_action_label">실시간 위치 확인</p>
              <strong>경로를 따라 위치 확인 가능</strong>
            </div>
            <div className="delivery_action_card">
              <p className="delivery_action_label">배송 예상 시간 안내</p>
              <strong>약 25분 후 도착 예정</strong>
            </div>
          </div>
        </section>

        <section className="delivery_status_section delivery_status_section--final">
          <div className="delivery_section_header">
            <div>
              <p className="delivery_section_label">배송 완료</p>
              <h2 className="delivery_section_title">수령 확인</h2>
            </div>
          </div>

          <div className="delivery_completion_card">
            <p>배송 완료 알림</p>
            <p>수령 확인</p>
          </div>
        </section>
      </div>

      {/* 공통 하단 네비게이션 탭 바 */}
      <BottomNav />
    </div>
  );
}

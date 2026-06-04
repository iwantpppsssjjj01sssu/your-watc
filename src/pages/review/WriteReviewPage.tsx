import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "../../components/BottomNav";
import "./WriteReviewPage.css";

import reviewGuuseImg from "../../asset/img/review_guuse.png";
import reviewOuterImg from "../../asset/img/review-outer.png";
import reviewBlackBagImg from "../../asset/img/review_black_bag.png";
import reviewCashmereImg from "../../asset/img/review-cashmere.png";
import reviewSuitImg from "../../asset/img/review-suit.png";
import reviewSneakersImg from "../../asset/img/review-sneakers.png";

const purchasedOrders = [
  { id: 1, name: "구스 다운 이불", category: "이불·침구", date: "2026.05.19 완료", img: reviewGuuseImg },
  { id: 2, name: "아우터 코트", category: "아우터·패딩", date: "2026.05.27 완료", img: reviewOuterImg },
  { id: 3, name: "숄더 토트백", category: "가방·잡화", date: "2026.05.04 완료", img: reviewBlackBagImg },
  { id: 4, name: "캐시미어 니트", category: "니트·스웨터", date: "2026.04.28 완료", img: reviewCashmereImg },
  { id: 5, name: "정장 슈트", category: "정장·비즈니스", date: "2026.04.15 완료", img: reviewSuitImg },
  { id: 6, name: "운동화 2켤레", category: "신발", date: "2026.04.08 완료", img: reviewSneakersImg },
];

const starLabels = ["", "별로예요", "아쉬워요", "보통이에요", "좋아요", "최고예요"];

type Step = "picker" | "form" | "done";

export function WriteReviewPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("picker");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<(typeof purchasedOrders)[0] | null>(null);
  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");

  const handleConfirmProduct = () => {
    const order = purchasedOrders.find((o) => o.id === selectedId);
    if (order) {
      setSelectedProduct(order);
      setStep("form");
    }
  };

  const handleSubmit = () => {
    setStep("done");
  };

  const handleReset = () => {
    setSelectedId(null);
    setSelectedProduct(null);
    setStars(0);
    setText("");
    setStep("picker");
  };

  return (
    <div className="wr_page">
      {/* 헤더 */}
      <header className="wr_header">
        <button
          type="button"
          className="wr_back_btn"
          onClick={() => (step === "form" ? setStep("picker") : navigate(-1))}
          aria-label="뒤로"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="wr_header_title">리뷰 쓰기</h1>
      </header>

      <div className="wr_body">
        {/* ── STEP 1: 상품 선택 ── */}
        {step === "picker" && (
          <>
            <div className="wr_section_head">
              <p className="wr_section_title">어떤 상품을 리뷰하시겠어요?</p>
              <p className="wr_section_sub">세탁 완료된 항목에만 리뷰를 남길 수 있어요</p>
            </div>

            <div className="wr_product_list">
              {purchasedOrders.map((order) => {
                const isSelected = selectedId === order.id;
                return (
                  <button
                    key={order.id}
                    type="button"
                    className={`wr_product_item ${isSelected ? "wr_product_item--on" : ""}`}
                    onClick={() => setSelectedId(isSelected ? null : order.id)}
                  >
                    <img src={order.img} alt={order.name} className="wr_product_img" />
                    <div className="wr_product_info">
                      <span className="wr_product_name">{order.name}</span>
                      <span className="wr_product_category">{order.category}</span>
                      <span className="wr_product_date">{order.date}</span>
                    </div>
                    <span className={`wr_product_check ${isSelected ? "wr_product_check--on" : ""}`}>
                      {isSelected ? (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="wr_bottom_bar">
              <button
                type="button"
                className={`wr_confirm_btn ${selectedId ? "wr_confirm_btn--on" : ""}`}
                disabled={!selectedId}
                onClick={handleConfirmProduct}
              >
                {selectedId ? "이 상품으로 리뷰 쓰기" : "상품을 선택해주세요"}
              </button>
            </div>
          </>
        )}

        {/* ── STEP 2: 리뷰 작성 ── */}
        {step === "form" && selectedProduct && (
          <>
            {/* 선택 상품 칩 */}
            <div className="wr_selected_chip">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="wr_chip_img" />
              <div className="wr_chip_info">
                <span className="wr_chip_name">{selectedProduct.name}</span>
                <span className="wr_chip_date">{selectedProduct.date}</span>
              </div>
              <button type="button" className="wr_chip_change" onClick={() => setStep("picker")}>
                변경
              </button>
            </div>

            {/* 별점 */}
            <div className="wr_star_section">
              <p className="wr_star_label">별점을 선택해주세요</p>
              <div className="wr_star_row">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`wr_star_btn ${s <= stars ? "wr_star_btn--on" : ""}`}
                    onClick={() => setStars(s)}
                    aria-label={`별점 ${s}점`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {stars > 0 && <p className="wr_star_text">{starLabels[stars]}</p>}
            </div>

            {/* 텍스트 */}
            <div className="wr_text_section">
              <p className="wr_text_label">상세 후기를 남겨주세요</p>
              <textarea
                className="wr_textarea"
                placeholder="어떤 점이 좋으셨나요? 솔직한 후기가 다른 고객에게 큰 도움이 됩니다."
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={300}
                rows={5}
              />
              <p className="wr_char_count">{text.length} / 300</p>
            </div>

            <div className="wr_bottom_bar">
              <button
                type="button"
                className={`wr_confirm_btn ${stars > 0 && text.trim().length > 0 ? "wr_confirm_btn--on" : ""}`}
                disabled={stars === 0 || text.trim().length === 0}
                onClick={handleSubmit}
              >
                리뷰 등록하기
              </button>
            </div>
          </>
        )}

        {/* ── STEP 3: 완료 ── */}
        {step === "done" && (
          <div className="wr_done">
            <div className="wr_done_icon">✓</div>
            <p className="wr_done_title">리뷰가 등록되었어요!</p>
            <p className="wr_done_sub">소중한 경험을 공유해주셔서 감사합니다.</p>
            <button type="button" className="wr_done_btn wr_done_btn--sub" onClick={handleReset}>
              다른 상품 리뷰하기
            </button>
            <button type="button" className="wr_done_btn wr_done_btn--main" onClick={() => navigate("/home")}>
              홈으로 돌아가기
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

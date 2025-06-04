import React from "react";
import "./ReviewPage.css";

const ReviewPage = () => {
  return (
    <div className="review-page">
      <h2 className="review-heading">Happy Customers</h2>
      <div className="review-grid">
        <div className="review-card">
          <img
            src="ganggang.jpg"
            alt="Happy Customer 1"
            className="review-image"
          />
          <p className="review-text">
            "Wallah jag e nöjd! Snabb leverans också."
          </p>
        </div>
        <div className="review-card">
          <img
            src="dannygang.jpg"
            alt="Happy Customer 2"
            className="review-image"
          />
          <p className="review-text">
            "Skönt att de tar cash, Kushen var naaaajs!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

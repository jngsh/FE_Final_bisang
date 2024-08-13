import { useEffect, useState } from "react";
import Slider from "rc-slider";

export default function FilterAll() {
  const [price, setPrice] = useState([0, 100000]);

  const handleOnChange = (value) => {
    setPrice(value);
  };

  return (
    <>
      <div className="accordion" id="price-filters">
        <div className="accordion-item mb-4">
          <h5 className="accordion-header mb-2" id="accordion-heading-price">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-price"
              aria-expanded="true"
              aria-controls="accordion-filter-price"
            >
              가격
              <svg className="accordion-button__icon" viewBox="0 0 14 14">
                <g aria-hidden="true" stroke="none" fillRule="evenodd">
                  <path
                    className="svg-path-vertical"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                  <path
                    className="svg-path-horizontal"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                </g>
              </svg>
            </button>
          </h5>
          <div
            id="accordion-filter-price"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-price"
            data-bs-parent="#price-filters"
          >
            <Slider
              range
              formatLabel={() => ``}
              max={500000}
              min={0}
              defaultValue={price}
              onChange={(value) => handleOnChange(value)}
              id="slider"
            />
            <div className="price-range__info d-flex align-items-center mt-2">
              <div className="me-auto">
                <span className="text-secondary">최소 금액: </span>
                <span className="price-range__min">{price[0]}원</span>
              </div>
              <div>
                <span className="text-secondary">최대 금액: </span>
                <span className="price-range__max">{price[1]}원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

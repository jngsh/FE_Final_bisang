export default function Star(stars = 5) {
  return (
    <>
      {[...Array(stars), 1, 1, 1, 1].map((elm2, i2) => (
        <svg
          key={i2}
          // className="review-star"
          className="review-star-empty"
          viewBox="0 0 9 9"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.0172 0.313075L2.91869 2.64013L0.460942 3.0145C0.0201949 3.08129 -0.15644 3.64899 0.163185 3.97415L1.94131 5.78447L1.52075 8.34177C1.44505 8.80402 1.91103 9.15026 2.30131 8.93408L4.5 7.72661L6.69869 8.93408C7.08897 9.14851 7.55495 8.80402 7.47925 8.34177L7.05869 5.78447L8.83682 3.97415C9.15644 3.64899 8.97981 3.08129 8.53906 3.0145L6.08131 2.64013L4.9828 0.313075C4.78598 -0.101718 4.2157 -0.10699 4.0172 0.313075Z"></path>
        </svg>
      ))}
    </>
  );
}

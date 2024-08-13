// 제품 상세페이지 Description 적는 곳
// 418개 제품 다 넣기 힘들 것 같고 몇 개만 DB에 LongDescription 컬럼 추가해서 넣어야되나??
const Description = (props, { product1 }) => {
  // console.log("props", props);
  // console.log("props.product1", props.product1);

  const { productDescription = 'No description available' } = props.product1 || {};

  return (
    <div className="product-single__description">
      <h3 className="block-title mb-4">
        <b>설명</b>
      </h3>
      <p className="content">
        {productDescription}<br></br>
      </p>
    </div>
  );
};

export default Description;

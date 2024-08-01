// 제품 상세페이지 Description 적는 곳
// 418개 제품 다 넣기 힘들 것 같고 몇 개만 DB에 LongDescription 컬럼 추가해서 넣어야되나??
const Description = (props, {product1}) => {
  console.log("props",props);
  console.log("props.product1",props.product1);

  const { productDescription = 'No description available' } = props.product1 || {};
  

  

  return (
    <div className="product-single__description">
      <h3 className="block-title mb-4">
        <b>설명</b>
      </h3>
      <p className="content">
      {productDescription}<br></br>
        쉬바 참치와 연어 파우치는 고양이의 까다로운 입맛을 만족시키기 위해 신선하고 고급스러운 최상의 원료로 제조되었습니다.
        인공 색소, 인공 감미료, 방부제를 사용하지 않았으며, 고양이의 식욕을 불러 일으키는 섬세하고 매력적인 맛과 향을 제공하고,
        조리 직후의 신선함을 고양이에게 그대로 전달하기 위해 완벽한 밀봉 과정을 거치는 수퍼 프리미엄 캣 푸드입니다.
        직사광선이 닿는 장소, 해충이 있는 장소 등을 피하시고, 서늘하고 건조한 장소에 보관하시기 바랍니다.
        변질의 우려가 있으니, 개봉 후 가급적 빨리 급여하시길 권합니다. 개봉할 때는 손이 다칠 우려가 있으니 주의합니다.
      </p>
      <h3 className="block-title mb-4">
        <b>권장급여방법</b>
      </h3>
      <p className="content">
        <ul className="list text-list">
          <li>몸무게 1kg~2kg : 하루에 1.5~3파우치 급여</li>
          <li>몸무게 2kg~4kg : 하루에 3~6파우치 급여</li>
          <li>몸무게 4kg~6kg : 하루에 6~9파우치 급여</li>
          급여량은 반려묘의 종류, 연령, 생활환경에 따라 차이가 날 수 있습니다.
        </ul>
      </p>
    </div>
  );
};

export default Description;

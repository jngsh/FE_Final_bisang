import { useTranslation } from 'react-i18next';

export function HeroData() {
  const { t } = useTranslation();
  const pattern = "/assets/images/homeimages/hero/pattern.png";

  return [
    {
      id: 1,
      backgroundColor: "#ffffff",
      imageUrl: pattern,
      imgUrl2: "/assets/images/homeimages/hero/dogandcat1.jpg",
      alt: "Pattern",
      title: "PETER PET",
      subtitle1: t('subtitle1'),
      subtitle2: t('peterpet'),
    },
    {
      id: 2,
      backgroundColor: "#fdcba6",
      imageUrl: pattern,
      imgUrl2: "/assets/images/homeimages/hero/dogandcat2.jpg",
      alt: "Pattern",
      title: "PETER PET",
      subtitle1: t('subtitle2'),
      subtitle2: t('peterpet'),
    },
    {
      id: 3,
      backgroundColor: "#a1e2d9",
      imageUrl: pattern,
      imgUrl2: "/assets/images/homeimages/hero/dogandcat3.png",
      alt: "Pattern",
      title: "PETER PET",
      subtitle1: t('subtitle3'),
      subtitle2: t('peterpet'),
    }
  ];
}

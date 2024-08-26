import { useTranslation } from 'react-i18next';

export function HeroData() {
  const { t } = useTranslation();
  const pattern = "/assets/images/homeimages/hero/pattern.png";

  return [
    {
      id: 1,
      backgroundColor: "#b0d49b",
      imageUrl: pattern,
      imgUrl2: "/assets/images/homeimages/hero/dogandcat1.png",
      alt: "Pattern",
      title: "PETER PET",
      subtitle1: t('subtitle1'),
      subtitle2: t('everyday'),
    },
    {
      id: 2,
      backgroundColor: "#ffc0cb",
      imageUrl: pattern,
      imgUrl2: "/assets/images/homeimages/hero/dogandcat2.png",
      alt: "Pattern",
      title: "PETER PET",
      subtitle1: t('subtitle2'),
      subtitle2: t('everyday'),
    },
    {
      id: 3,
      backgroundColor: "#add8e6",
      imageUrl: pattern,
      imgUrl2: "/assets/images/homeimages/hero/dogandcat3.png",
      alt: "Pattern",
      title: "PETER PET",
      subtitle1: t('subtitle3'),
      subtitle2: t('everyday'),
    }
  ];
}

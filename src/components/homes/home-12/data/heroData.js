import { useTranslation } from 'react-i18next';
import dogAndCat1 from '../images/dogandcat1.jpeg';
import dogAndCat2 from '../images/dogandcat2.png';
import dogAndCat3 from '../images/dogandcat3.png';

export function HeroData() {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      backgroundColor: "#f5e6e0",
      imageUrl: dogAndCat1,
      // imgUrl2: dogAndCat1,
      alt: "Pattern",
      title: "",
      subtitle1: t('subtitle1'),
      subtitle2: t('everyday'),
    },
    {
      id: 2,
      backgroundColor: "#f5e6e0",
      imageUrl: dogAndCat2,
      // imgUrl2: dogAndCat2,
      alt: "Pattern",
      title: "",
      subtitle1: t('subtitle2'),
      subtitle2: t('everyday'),
    },
    {
      id: 3,
      backgroundColor: "#f5e6e0",
      imageUrl: dogAndCat3,
      // imgUrl2: dogAndCat3,
      alt: "Pattern",
      title: "",
      subtitle1: t('subtitle3'),
      subtitle2: t('everyday'),
    }
  ];
}

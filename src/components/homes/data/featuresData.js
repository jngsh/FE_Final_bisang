import { useTranslation } from 'react-i18next';

export function FeaturesData() {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      icon: "#icon_shipping",
      title: t('featuresCartTitle'),
      content: t('featuresCartContent'),
    },
    {
      id: 2,
      icon: "#icon_headphone",
      title: t('featuresPaymentTitle'),
      content: t('featuresPaymentContent'),
    },
    {
      id: 3,
      icon: "#icon_shield",
      title: t('featuresShippingTitle'),
      content: t('featuresShippingContent'),
    },
    {
      id: 4,
      icon: "#icon_gift",
      title: t('featuresPetTitle'),
      content: t('featuresPetContent'),
    }
  ];
}
import { useTranslation } from 'react-i18next';

export function FeaturesData() {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      icon: "#icon_shipping",
      title: t('features_cart_title'),
      content: t('features_cart_content'),
    },
    {
      id: 2,
      icon: "#icon_headphone",
      title: t('features_payment_title'),
      content: t('features_payment_content'),
    },
    {
      id: 3,
      icon: "#icon_shield",
      title: t('features_shipping_title'),
      content: t('features_shipping_content'),
    },
    {
      id: 4,
      icon: "#icon_gift",
      title: t('features_pet_title'),
      content: t('features_pet_content'),
    }
  ];
}
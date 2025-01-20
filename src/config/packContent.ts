import { useTranslation } from 'react-i18next';

export const getPackContent = () => {
  const { t } = useTranslation();
  
  return {
    packDuo: {
      title: t('packs.duo.title'),
      description: t('packs.duo.description'),
      price: 299,
      maxItems: 2,
      allowedTypes: ['chemises'],
      image: '/Menu/Pack duo.png'
    },
    packTrio: {
      title: t('packs.trio.title'),
      description: t('packs.trio.description'),
      price: 399,
      maxItems: 3,
      allowedTypes: ['chemises'],
      image: '/Menu/Pack trio.png'
    },
    packQuatro: {
      title: t('packs.quatro.title'),
      description: t('packs.quatro.description'),
      price: 499,
      maxItems: 4,
      allowedTypes: ['chemises'],
      image: '/Menu/Pack quatro.png'
    },
    packCostume: {
      title: t('packs.costume.title'),
      description: t('packs.costume.description'),
      price: 899,
      maxItems: 2,
      allowedTypes: ['costumes', 'chemises'],
      requiredTypes: {
        costumes: 1,
        chemises: 1
      },
      image: '/Menu/Pack costume.png'
    },
    packMariage: {
      title: t('packs.mariage.title'),
      description: t('packs.mariage.description'),
      price: 1299,
      maxItems: 3,
      allowedTypes: ['costumes', 'chemises'],
      requiredTypes: {
        costumes: 1,
        chemises: 2
      },
      image: '/Menu/Pack mariage.png'
    }
  };
};
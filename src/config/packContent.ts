import { useTranslation } from 'react-i18next';

interface PackContent {
  title: string;
  description: string;
  images: string[];
  videoUrl: string;
}

const getPackImages = (packType: string): string[] => {
  switch (packType) {
    case 'Pack Prestige':
      return ["/Prestige/1.png", "/Prestige/2.jpg", "/Prestige/3.jpg"];
    case 'Pack Premium':
      return ["/Premium/1.png", "/Premium/2.png", "/Premium/3.png"];
    case 'Pack Trio':
      return ["/Trio/1.png", "/Trio/2.png", "/Trio/3.png"];
    case 'Pack Duo':
      return ["/packduo.png"];
    case 'Pack Mini Duo':
      return ["/Packduomini2.png"];
    default:
      return ["https://placehold.co/600x400/67000D/ffffff?text=Pack+Image"];
  }
};

const getPackVideo = (packType: string): string => {
  switch (packType) {
    case 'Pack Prestige':
      return "/Prestige/video.mp4";
    case 'Pack Premium':
      return "/Premium/video.mp4";
    case 'Pack Trio':
      return "/Trio/video.mp4";
    default:
      return "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  }
};

export const getPackContent = (packType: string): PackContent => {
  const { t } = useTranslation();
  
  const packKey = packType.toLowerCase()
    .replace('pack ', '')
    .replace(' ', '')
    .replace('-', '');

  return {
    title: t(`packs.${packKey}.title`),
    description: t(`packs.${packKey}.description`),
    images: getPackImages(packType),
    videoUrl: getPackVideo(packType)
  };
};
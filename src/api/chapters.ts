import axios from 'axios';
import { SeasonsResponse, ChaptersResponse } from '@/types/chapters';

export const fetchSeasons = async () => {
  console.log('Fetching seasons...');
  const response = await axios.get<SeasonsResponse>('https://plateform.draminesaid.com/app/get_saisons.php');
  console.log('Seasons fetched:', response.data);
  return response.data;
};

export const fetchChapters = async () => {
  console.log('Fetching chapters...');
  const response = await axios.get<ChaptersResponse>('https://plateform.draminesaid.com/app/get_chapters.php');
  console.log('Chapters fetched:', response.data);
  return response.data;
};
import axios from 'axios';

export const addSeason = async (name: string, photo: string) => {
  console.log('Adding season:', { name, photo });
  const response = await axios.post('https://plateform.draminesaid.com/app/add_saison.php', {
    name_saison: name,
    photo_saison: photo // Now we're sending a default photo value
  });
  console.log('Season added:', response.data);
  return response.data;
};

export const addChapter = async (seasonId: string, name: string, photo: string) => {
  console.log('Adding chapter:', { seasonId, name, photo });
  const response = await axios.post('https://plateform.draminesaid.com/app/add_chapter.php', {
    id_saison: seasonId,
    name_chapter: name,
    photo_chapter: photo
  });
  console.log('Chapter added:', response.data);
  return response.data;
};
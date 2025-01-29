export interface Season {
  id_saison: string;
  name_saison: string;
  photo_saison: string;
}

export interface Chapter {
  id_chapter: string;
  id_saison: string;
  name_chapter: string;
  photo_chapter: string;
}

export interface SeasonsResponse {
  success: boolean;
  saisons: Season[];
}

export interface ChaptersResponse {
  success: boolean;
  chapters: Chapter[];
}
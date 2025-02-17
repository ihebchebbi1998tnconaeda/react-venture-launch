
export interface Season {
  id_saison: string;
  name_saison: string;
  photo_saison: string;
  havechapters_saisons: string;
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

export interface Video {
  id_video: string;
  saison: string;
  cat_video: string;
  name_video: string;
  descri_video: string;
  url_video: string;
  url_thumbnail: string;
  created_at: string;
}

export interface VideosResponse {
  success: boolean;
  videos: Video[];
}


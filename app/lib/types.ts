// File: lib/types.ts

/**
 * Это то, что возвращает Directus, когда вы запрашиваете *.directus_files_id.*
 */
export interface DirectusFile {
  id: string;
  url: string;
  title: string;
  description: string | null;
  type: string;
  filesize: number;
  alt_text: string | null;
  // остальные поля Directus-а можно тоже добавить, если нужны
}

/**
 * Обёртка, которую Directus даёт для images и cover:
 *  - для M2M images — массив таких обёрток
 *  - для single cover — один такой объект
 */
export interface FileWrapper {
  directus_files_id: DirectusFile;
}

/**
 * Сырой тип статьи из Directus, до преобразования
 */
export interface DirectusArticle {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  published_date?: string;
  meta_title?: string;
  meta_description?: string;
  section?: string;
  author?: string;

  // M2M-массив изображений
  images?: FileWrapper[];
  // Одиночный файл cover
  cover?: FileWrapper;

  // Дополнительные поля для раздела "legends"
  fio?: string;
  nickname?: string;
  birthdate?: string;
  birthplace?: string;
  residence?: string;
  nationality?: string;
  status?: string;
  crowned_date?: string;
  crowned_place?: string;
}

/**
 * Наш внутренний тип картинки, уже с безопасными `string | undefined`
 */
export interface File {
  id: string;
  url: string;
  title?: string;
  description?: string;
  type?: string;
  size?: number;
  alt_text?: string;
}

/**
 * Итоговый Article, которым оперирует приложение
 */
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  contentHtml: string;
  meta_title?: string;
  meta_description?: string;
  section?: string;
  author?: string;

  images: File[];
  cover: File | null;

  // Опциональные поля для раздела "legends"
  fio?: string;
  nickname?: string;
  birthdate?: string;
  birthplace?: string;
  residence?: string;
  nationality?: string;
  status?: string;
  crowned_date?: string;
  crowned_place?: string;
}

// Тип-обёртка для ответа Directus
export type DirectusResponse<T> = {
  data: T[];
  // Можно добавить другие поля, если нужны (например, meta)
};

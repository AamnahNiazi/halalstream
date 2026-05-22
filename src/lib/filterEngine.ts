export interface YouTubeSearchItem {
  id: {
    videoId?: string;
  };
  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    thumbnails: {
      high?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      default?: {
        url: string;
      };
    };
    publishedAt: string;
  };
}

export interface SafeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

export const BLACKLIST_TERMS: string[] = [
  "dance",
  "club",
  "dating",
  "explicit",
  "gambling",
  "vulgar",
  "xxx",
  "18+",
  "casino",
  "drugs",
];

export function sanitizeQuery(query: string): string {
  return query
    .trim()
    .replace(/[^\w\s]/gi, "")
    .slice(0, 100);
}

export function enhanceQuery(query: string): string {
  const clean = sanitizeQuery(query).toLowerCase();

  // Dawat-e-Islami
  if (
    clean.includes("dawat") ||
    clean.includes("dawateislami")
  ) {
    return `${clean} Islamic Bayan`;
  }

  // Naat / Nasheed
  if (
    clean.includes("naat") ||
    clean.includes("nasheed")
  ) {
    return `${clean} Islamic Nasheed`;
  }

  // Quran
  if (clean.includes("quran")) {
    return `${clean} Quran Recitation`;
  }

  // Kids
  if (clean.includes("kids")) {
    return `${clean} Islamic Kids`;
  }

  // General
  return `${clean} Islam`;
}

export function containsBlacklistedTerms(
  text: string
): boolean {
  const lower = text.toLowerCase();

  return BLACKLIST_TERMS.some((term) =>
    lower.includes(term.toLowerCase())
  );
}

export function filterSafeVideos(
  items: YouTubeSearchItem[]
): SafeVideo[] {
  return items
    .filter((item) => {
      const title = item.snippet.title;
      const description =
        item.snippet.description;

      const blocked =
        containsBlacklistedTerms(title) ||
        containsBlacklistedTerms(description);

      return !blocked;
    })
    .map((item) => ({
      videoId: item.id.videoId || "",
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url ||
        item.snippet.thumbnails.default?.url ||
        "",
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }))
    .filter(
      (video) => video.videoId.length > 0
    );
}
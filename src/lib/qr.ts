export function getMapEmbedUrl(mapUrl: string, fallbackQuery?: string): string {
  try {
    const url = new URL(mapUrl);
    const query =
      url.searchParams.get("q") ??
      url.searchParams.get("query") ??
      fallbackQuery ??
      mapUrl;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  } catch {
    return `https://maps.google.com/maps?q=${encodeURIComponent(fallbackQuery ?? mapUrl)}&output=embed`;
  }
}

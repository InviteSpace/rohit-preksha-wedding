export function getMapEmbedUrl(mapUrl: string): string {
  try {
    const url = new URL(mapUrl);
    const query = url.searchParams.get("q") ?? mapUrl;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  } catch {
    return `https://maps.google.com/maps?q=${encodeURIComponent(mapUrl)}&output=embed`;
  }
}

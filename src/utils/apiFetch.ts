export const apiFetch = (url: string, options?: RequestInit) => {
  const isClient = process.title === "browser";
  if (!isClient && url && url.startsWith("/"))
    url = process.env.NEXT_PUBLIC_SITE_URL + url;
  return fetch(url, options);
};

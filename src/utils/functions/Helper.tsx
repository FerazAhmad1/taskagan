const ENDPOINTS: Record<string, string> = {
  author: "/search/authors.json",
  subject: "/search/subjects.json",
  inside: "/search/inside.json",
  text: "/search/inside.json",
  lists: "/search/lists.json",
};

export function buildSearchUrl(filter: string, query: string, page = 1) {
  const q = query.trim();
  if (!q) {
    const base =
      filter === "title" || filter === "all"
        ? "/search.json"
        : ENDPOINTS[filter] || "/search.json";
    return `https://openlibrary.org${base}?q=&mode=everything&page=${page}`;
  }

  if (filter === "title") {
    // Title → title:"query"
    const searchTerm = `title:"${q}"`;
    const encoded = encodeURIComponent(searchTerm).replace(/%20/g, "+");
    return `https://openlibrary.org/search.json?q=${encoded}&mode=everything&page=${page}`;
  }

  if (filter === "all") {
    // All → plain query in /search.json
    const encoded = encodeURIComponent(q).replace(/%20/g, "+");
    return `https://openlibrary.org/search.json?q=${encoded}&mode=everything&page=${page}`;
  }

  // Authors / Subjects / Inside / Lists
  const base = ENDPOINTS[filter] || "/search.json";
  const encoded = encodeURIComponent(q).replace(/%20/g, "+");
  return `https://openlibrary.org${base}?q=${encoded}&mode=everything&page=${page}`;
}

import axios from "axios";

export const getWikiSummary = async (country) => {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(country)}`;

    const res = await axios.get(url);

    const data = res.data;

    if (!data) return null;

    return {
      title: data.title || country,
      extract: data.extract || "",
      url: data.content_urls?.desktop?.page || ""
    };
  } catch {
    return null;
  }
};

export const getWikiTopics = async (country) => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=${encodeURIComponent(country)}`;

    const res = await axios.get(url);

    const pages = res.data?.query?.pages || {};

    const page = Object.values(pages)[0];

    if (!page) return null;

    return {
      title: page.title || country,
      extract: page.extract || ""
    };
  } catch {
    return null;
  }
};
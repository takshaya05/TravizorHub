import axios from "axios";
import cheerio from "cheerio";

export const scrapePage = async (url, selector) => {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const results = [];

    $(selector).each((_, el) => {
      const text = $(el).text().trim();

      if (text) {
        results.push(text);
      }
    });

    return results;
  } catch {
    return [];
  }
};

export const scrapeMultiple = async (sources, selector) => {
  const all = [];

  for (const url of sources || []) {
    const data = await scrapePage(url, selector);

    all.push(...data);
  }

  return all;
};
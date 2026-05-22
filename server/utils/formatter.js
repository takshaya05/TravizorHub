export const formatAdvisory = (data) => {
  if (!data || typeof data !== "object") {
    return {};
  }

  const formatted = {};

  Object.keys(data).forEach((key) => {
    formatted[key] = String(data[key] || "")
      .replace(/\s+/g, " ")
      .trim();
  });

  return formatted;
};

export const formatComparison = (rows) => {
  if (!Array.isArray(rows)) {
    return [];
  }

  return rows.map((r) => ({
    topic: r.topic || "",
    home: String(r.home || "").trim(),
    dest: String(r.dest || "").trim()
  }));
};

export const cleanText = (text) => {
  if (!text) return "";

  return String(text)
    .replace(/\s+/g, " ")
    .trim();
};
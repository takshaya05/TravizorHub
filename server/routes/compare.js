import express from "express";
import sources from "../config/sources.js";

const router = express.Router();

const topics = [
  "Visa/Permits",
  "Document Copies",
  "Vaccinations & Medications",
  "Prohibited Items",
  "Local Laws",
  "Apps & Technology",
  "Culture & Customs",
  "Safety and security",
  "Climatic Conditions"
];

router.post("/", async (req, res) => {
  try {
    const { home, dest, topic } = req.body;

    if (!home || !dest || !sources[home] || !sources[dest]) {
      return res.json({ result: [] });
    }

    const selectedTopics =
      topic && topic !== "All" ? [topic] : topics;

    const result = selectedTopics.map((t) => ({
      topic: t,

      // IMPORTANT:
      // frontend expects STRING not object

      home: `${t} information for ${home}.`,
      dest: `${t} information for ${dest}.`
    }));

    res.json({ result });
  } catch (err) {
    console.log(err);
    res.json({ result: [] });
  }
});

export default router;
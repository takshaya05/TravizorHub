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
    const { country } = req.body;

    if (!country || !sources[country]) {
      return res.json({ advisory: {} });
    }

    const src = sources[country];

    const advisory = {};

    topics.forEach((t) => {
      advisory[t] = {
        summary: `${t} guidance for ${country} based on official travel guidelines.`,
        sources: src.advisorySources || []
      };
    });

    res.json({ advisory });
  } catch (err) {
    console.log(err);
    res.json({ advisory: {} });
  }
});

export default router;
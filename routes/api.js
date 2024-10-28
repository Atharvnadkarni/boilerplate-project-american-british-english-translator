"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;
    if (!Object.keys(req.body).includes("text") || !Object.keys(req.body).includes("text"))
      return res.json({ error: "Required field(s) missing" });

    if (text == "") return res.json({ error: "No text to translate" });

    switch (locale) {
      case "american-to-british":
        if (translator.americanToBritish(text) == text) {
          return res.json({
            text,
            translation: "Everything looks good to me!",
          });
        }
        return res.json({
          text,
          translation: translator.americanToBritish(text),
        });
      case "british-to-american":
        if (translator.britishToAmerican(text) == text) {
          return res.json({
            text,
            translation: "Everything looks good to me!",
          });
        }
        return res.json({
          text,
          translation: translator.britishToAmerican(text),
        });
      default:
        return res.json({ error: "Invalid value for locale field" });
    }
  });
};

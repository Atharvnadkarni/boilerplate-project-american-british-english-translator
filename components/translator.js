const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class TranslateHelper {
  translateObjCapitalization(original) {
    const capitalization = [];
  }

  getKeyByValue(object, value) {
    return Object.keys(object).filter((key) => object[key] === value);
  }
}

class Translator {
  americanToBritish(original) {
    let translation = original;
    translation = translation[0].toUpperCase() + translation.slice(1);

    const wordRegex = new RegExp(Object.keys(americanOnly).join("|"), "i");
    const word = (wordRegex.exec(translation) ?? { 0: "     " })[0];
    translation = translation.replace(
      wordRegex,
      `<span class="highlight">${americanOnly[word.toLowerCase()]}</span>`
    );
    const titleRegex = new RegExp(
      Object.keys(americanToBritishTitles).join("|").replace(/\./g, "."),
      "i"
    );
    const { 0: title } = titleRegex.exec(translation) ?? ["     "];
    const britishTitleLowercase =
      americanToBritishTitles[title.toLowerCase()] ?? "   ";
    const britishTitle =
      britishTitleLowercase[0].toUpperCase() +
      britishTitleLowercase.slice(1).toLowerCase();
    translation = translation.replace(
      titleRegex,
      `<span class="highlight">${britishTitle}</span>`
    );
    const spellingRegex = new RegExp(
      `\\b(${Object.keys(americanToBritishSpelling).join("|")})\\b`,
      "i"
    );
    console.log(spellingRegex.exec(translation));
    const american = (spellingRegex.exec(translation) ?? { 0: "null" })[0];
    console.log(american);
    translation = translation.replace(
      spellingRegex,
      `<span class="highlight">${
        americanToBritishSpelling[american.toLowerCase()]
      }</span>`
    );
    const regexTime = /(?<hour>\d{1,2}):(?<minute>\d\d)/;
    console.log(regexTime);
    const {
      index,
      groups: { hour, minute },
      0: time,
    } = regexTime.exec(translation) ?? {
      index: 0,
      groups: { hour: "     ", minute: "     " },
      0: "     ",
    };
    translation = translation.replace(
      regexTime,
      `<span class="highlight">${hour}.${minute}</span>`
    );
    return translation;
  }
  britishToAmerican(original) {
    let translation = original;
    translation = translation[0].toUpperCase() + translation.slice(1);

    const wordRegex = new RegExp(Object.keys(britishOnly).join("|"), "i");
    const word = wordRegex.exec(translation) ?? { 0: "     " };
    translation = translation.replace(
      wordRegex,
      `<span class="highlight">${britishOnly[word[0].toLowerCase()]}</span>`
    );
    const titleRegex = new RegExp(
      Object.values(americanToBritishTitles).join("|"),
      "i"
    );
    console.log(title);
    const { 0: title } = titleRegex.exec(translation) ?? ["     "];
    console.log(TranslateHelper.prototype
      .getKeyByValue(americanToBritishTitles, title.toLowerCase()))
    const americanTitle =
      TranslateHelper.prototype
        .getKeyByValue(americanToBritishTitles, title.toLowerCase())[0][0]
        .toUpperCase() +
      TranslateHelper.prototype
        .getKeyByValue(americanToBritishTitles, title.toLowerCase())[0]
        .slice(1)
        .toLowerCase();
    translation = translation.replace(
      titleRegex,
      `<span class="highlight">${americanTitle}</span>`
    );
    const spellingRegex = new RegExp(
      `\\b(${Object.values(americanToBritishSpelling).join("|")})\\b`,
      "i"
    );
    const british = (spellingRegex.exec(translation) ?? ["     "])[0];
    translation = translation.replace(
      spellingRegex,
      `<span class="highlight">${TranslateHelper.prototype.getKeyByValue(
        americanToBritishSpelling,
        british.toLowerCase()
      )}</span>`
    );
    const regexTime = /(?<hour>\d{1,2})\.(?<minute>\d\d)/;
    const {
      index,
      groups: { hour, minute },
      0: time,
    } = regexTime.exec(translation) ?? {
      index: 0,
      groups: { hour: "     ", minute: "     " },
      0: "     ",
    };
    translation = translation.replace(
      regexTime,
      `<span class="highlight">${hour}:${minute}</span>`
    );
    return translation;
  }
}

const trans = new Translator();
console.log(
  trans.britishToAmerican(
    "Johanne"
  )
);

module.exports = Translator;

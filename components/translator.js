const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  br_to_am(sentence) {
    const words = sentence.split();
    const translated_sentence = [];
    for (const word of words) {
      if (word in britishOnly) {
        translated_sentence.push(britishOnly[word]);
      } else if (Object.values(americanToBritishSpelling).includes(word)) {
        translated_sentence.push(
          Object.keys(americanToBritishSpelling).find((am) =>
            americanToBritishSpelling[am]
          ),
        );
      } else if (Object.values(americanToBritishTitles).includes(word)) {
        translated_sentence.push(
          Object.keys(americanToBritishTitles).find((am) =>
            americanToBritishTitles[am]
          ),
        );
      } else {
        translated_sentence.push(word);
      }
    }
    return translated_sentence.join("");
  }
  am_to_br(sentence) {
    const words = sentence.split();
    const translated_sentence = [];
    for (const word of words) {
      if (word in americanOnly) {
        translated_sentence.push(americanOnly[word]);
      } else if (word in americanToBritishSpelling) {
        translated_sentence.push(americanToBritishSpelling[word]);
      } else if (word in americanToBritishTitles) {
        translated_sentence.push(americanToBritishTitles[word]);
      } else {
        translated_sentence.push(word);
      }
    }
    return translated_sentence.join("");
  }
}

module.exports = Translator;

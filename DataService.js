function convertToJson(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Bad response!");
  }
}

const baseUrl = "./glossary.json"; // In case you were wondering, this is the path to the data

export default class DataService {
  constructor() {}
  /** Gets content from json file */
  getContent(url) {
    return fetch(url)
      .then(convertToJson)
      .then((data) => {
        // console.log(data);
        return data;
      });
  }

  /** Returns data filtered */
  async getByChapter(content, chapterNum) {
    // Only grab the objects that have the given chapterNum
    const filtered = content.filter((item) => item.chapter === chapterNum);
    const sorted = _.sortBy(filtered, "term"); // Sort the objects alphabetically by the term name
    return sorted;
  }

  async getAllTerms(content) {
    let terms = content.map((element) => element.term);
    return terms;
  }
}

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

  /** Returns data filtered by a specific chapter */
  getByChapter(content, chapterNum) {
    // Only grab the objects that have the given chapterNum
    const filtered = content.filter((item) => item.chapter === chapterNum);
    const sorted = _.sortBy(filtered, "term"); // Sort the objects alphabetically by the term name
    return sorted;
  }

  getAllTerms(content) {
    let terms = content.map((element) => element.term);
    return terms;
  }

  searchData(content, query) {
    query = query.toLowerCase();
    const result = content.filter((element) => {
      return element.term.toLowerCase().indexOf(query) >= 0;
    });
    console.log(result);
    return result;
  }
}

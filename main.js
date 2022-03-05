import DataService from "./dataService.js";
const myDataService = new DataService();
const url = "./glossary.json";
const numChapters = 5;
const content = await myDataService.getContent(url);

async function buildGlossary(content, numChapters) {
  for (let i = 0; i <= numChapters; i++) {
    // Divide the glossary into sections based on chapter
    const data = await myDataService.getByChapter(content, i);
    const chapterName = getChapterName(i); // Get the correct name based on the chapter number
    const glossary = document.querySelector(".glossary"); // Select the HTML element that will contain the glossary
    let chapterSection = `<h3>${chapterName}</h3> <dl>`;
    data.forEach((element) => {
      // Create a new <dt> for each term
      chapterSection += `<dt>${element.term}</dt> <dd>${element.definition}</dd>`;
    });
    chapterSection += `</dl>`;
    glossary.innerHTML += chapterSection;
  }
}

function getChapterName(chapterNum) {
  switch (chapterNum) {
    case 0:
      return "Supplemental Material: DC Electric Circuits & Electronic Measuring Equipment";
      break;
    case 1:
      return "Chapter 1: Introduction to Computers";
      break;
    case 2:
      return "Chapter 2: Bits, Data Types, and Operations";
      break;
    case 3:
      return "Chapter 3: Digital Logic Structures";
      break;
    case 4:
      return "Chapter 4: von Neumann Model";
      break;
    case 5:
      return "Chapters 5-9: Programming";
      break;
    default:
      return "Well, ya broke something...";
      break;
  }
}

buildGlossary(content, numChapters);
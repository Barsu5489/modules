import uuid from "uuid";
import moment from "moment";

import { renderNotes, getSavedNotes, saveNotes } from "./notes2-functions";
let notes = getSavedNotes();

const filters = {
  searchText: ""
};

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", function(e) {
  const id = uuid();
  const timestamp = moment().valueOf();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp
  });

  saveNotes(notes);
  location.assign(`edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", function(e) {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});
// document.querySelector('#name-form').addEventListener('submit', function(e){
//     e.preventDefault();
//     console.log(e.target.elements.firstName.value);
//     e.target.elements.firstName.value = ''
// })

document.querySelector("#filter-by").addEventListener("change", function(e) {
  console.log(e.target.value);
});

// const data = notes.filter(function(note){
//     return note.title.toLowerCase().includes
//     (filters.searchText.toLowerCase())
// })
// console.log(data)

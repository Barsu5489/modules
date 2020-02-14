import moment from "moment";
import {
  removeNotes,
  getSavedNotes,
  saveNotes,
  generateLastEdited
} from "./notes2-functions";
const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeNote = document.querySelector("#remove-note");
const dateElement = document.querySelector("#lastEdited");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(function(note) {
  return note.id === noteId;
});
if (note === undefined) {
  location.assign("/index.html");
}
titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);
titleElement.addEventListener("input", function(e) {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});
bodyElement.addEventListener("input", function(event) {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});
removeNote.addEventListener("click", function(event) {
  removeNotes(note.id);
  savedNotes(notes);
  location.assign("/index.html");
});
window.addEventListener("storage", function(event) {
  if (event.key === "notes") {
    notes = JSON.parse(event.newValue);
    note = notes.find(function(note) {
      return note.id === noteid;
    });
    if (note === undefined) {
      this.location.assign("/index.html");
    }
    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});
// removeElement.addEventListener("click", function(e) {
//   removeNote(note.noteId);
//   saveNotes(notes);
//   location.assign("/index.html");
// });

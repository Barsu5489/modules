// read existing notes from local storage
import moment from "moment";
export const getSavedNotes = function() {
  const notesJSON = localStorage.getItem("notes");
  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

//save notes to localStorage
export const saveNotes = function(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};
//remove a note from the list
export const removeNotes = function(id) {
  const noteIndex = notes.findIndex(function(note) {
    return note.id === id;
  });
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};
//generate the DOM structure for a note
export const generateNoteDOM = function(note) {
  const noteEL = document.createElement("div");
  const textEL = document.createElement("a");
  const button = document.createElement("button");

  //setup the remove note button
  button.textContent = "x";
  noteEL.appendChild(button);
  button.addEventListener("click", function() {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });
  if (note.title.length > 0) {
    textEL.textContent = note.title;
  } else {
    textEL.textContent = "unnamed note";
  }
  textEL.setAttribute("href", `/edit.html#${note.id}`);
  noteEL.appendChild(textEL);
  return noteEL;
};
//render notes
export const renderNotes = function(notes, filters) {
  //decleraring a parameter on the variable

  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";

  filteredNotes.forEach(function(note) {
    const noteEL = generateNoteDOM(note);
    document.querySelector("#notes").appendChild(noteEL);
  });
};

//generate the last edited message
export const generateLastEdited = function(timestamp) {
  return `last edited ${moment(timestamp).fromNow}`;
};

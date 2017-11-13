const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    decribe : 'Title of Note',
    demand : true,
    alias : 't'
};

const bodyOptions = {
    decribe : 'Body of the note',
    demand : true,
    alias : 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title : titleOptions,
    body : bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title : titleOptions
  })
  .command('remove', 'Remove a note', {
    title : titleOptions
  })
  .help()
  .argv
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('--------------------');
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('--------------------');
    console.log('Note title taken');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach ((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('--------------------');
    console.log('Note Found!!');
    notes.logNote(note);
  } else {
    console.log('--------------------');
    console.log('Note not Found!');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log('--------------------');
  console.log(message);
} else {
  console.log('--------------------');
  console.log('Command not recognized');
}

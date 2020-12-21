const { argv } = require('yargs');
const yargs = require('yargs');
const notes = require("./notes.js");

yargs.command({
    command:"add",
    describe:"Add notes",
    builder:{
        title:{
            describe:"New Note",
            demandOption:true,
            type:"string"
        },
        body:{
            describe:"Body of the note",
            demandOption:true,
            type:"string" 
        }
    },
    handler: function(argv){
        notes.addNote(argv.title,argv.body);
    }
});


yargs.command({
    command:"remove",
    describe:"Remove notes",
    builder:{
        title:{
            type:"string",
            demandOption:true,
            describe:"title of the note to be removed"
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command:"read",
    describe:"read notes",
    builder:{
        title:{
            demandOption:true
        }
    },
    handler: function(argv){
        notes.getNote(argv.title);
    }
});

yargs.command({
    command:"list",
    describe:"Reading a note",
    handler:notes.listNotes
});

yargs.parse();
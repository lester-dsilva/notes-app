const fs = require('fs');
const chalk = require('chalk');

function addNote(sTitle,sBody){
    let aNotes = loadNotes();

    let iIndex = aNotes.findIndex(function(item){
        return sTitle === item.title;
    });

    if(iIndex > -1)
        console.log(chalk.red("title already exists"));
    else{
        aNotes.push({
            title:sTitle,
            body:sBody
        });
        saveNotes(aNotes);
    }
        
}

function loadNotes(){
    try{
        let dataBuffer = fs.readFileSync("notes.json");
        return JSON.parse(dataBuffer.toString());
    }catch(e){
        return [];
    }
}

function saveNotes(aNotes){
    fs.writeFileSync("notes.json",JSON.stringify(aNotes));
}


function removeNote(title){
    let aNotes = loadNotes();
    let iInitLength = aNotes.length;
    aNotes = aNotes.filter(function(item){
        return item.title !== title;
    });
    
    saveNotes(aNotes);

    if(iInitLength === aNotes.length)
        console.log(chalk.red.inverse("Not removed"));
    else
    console.log(chalk.green.inverse("Note removed"));
}

function listNotes(){
    var aNotes = loadNotes();
    console.log(chalk.blue.inverse("Your Notes"));
    aNotes.forEach(element => {
        console.log(chalk.green(element.title));
    });
}

function getNote(title){
    const aNotes = loadNotes();
    const note = aNotes.find(note=>note.title === title);
    if(note)
        console.log(note.title+" - "+note.body);
    else
        console.log(chalk.red("could not find the note"));
}

module.exports = {
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    getNote:getNote
}
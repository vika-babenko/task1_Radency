// Sample notes data (prepopulated)
let notesData = [
    {
        creationTime: "01/08/2023",
        noteContent: "This is a task note.",
        noteCategory: "Task"
    },
    {
        creationTime: "02/08/2023",
        noteContent: "I had a random thought.",
        noteCategory: "Random Thought"
    },
    // Add more sample notes here
];

// Helper function to display the notes and archived notes in the tables
function displayNotesInTable(notesArray, tableId, isArchived) {
    const tableContainer = document.getElementById(tableId);
    let tableHTML = `<table><tr><th>Time of Creation</th><th>Note Content</th><th>Note Category</th><th>Dates Mentioned</th></tr>`;
    notesArray.forEach((note, index) => {
        const datesMentioned = extractDatesFromNoteContent(note.noteContent).join(", ");
        tableHTML += `<tr>
            <td>${note.creationTime}</td>
            <td>${note.noteContent}</td>
            <td>${note.noteCategory}</td>
            <td>${datesMentioned}</td>
            <td><button onclick="archiveNote(${index}, ${isArchived})">${isArchived ? 'Unarchive' : 'Archive'}</button></td>
        </tr>`;
    });
    tableHTML += "</table>";
    tableContainer.innerHTML = tableHTML;
}

// Helper function to extract dates from the note content
function extractDatesFromNoteContent(noteContent) {
    const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    return noteContent.match(datePattern) || [];
}

// Function to add a new note
function addNote() {
    const creationTime = document.getElementById("creationTime").value;
    const noteContent = document.getElementById("noteContent").value;
    const noteCategory = document.getElementById("noteCategory").value;

    // Add the new note to the notesData array
    notesData.push({ creationTime, noteContent, noteCategory });

    // Refresh the notes and archived notes tables
    displayNotesInTable(notesData, "notesTable", false);
    displayNotesInTable(notesData.filter(note => note.isArchived), "archivedNotesTable", true);

    // Refresh the summary table
    updateSummaryTable();
}

// Function to archive or unarchive a note
function archiveNote(index, isArchived) {
    notesData[index].isArchived = !isArchived;
    displayNotesInTable(notesData, "notesTable", false);
    displayNotesInTable(notesData.filter(note => note.isArchived), "archivedNotesTable", true);
    updateSummaryTable();
}

// Function to update the summary table
function updateSummaryTable() {
    const summaryData = {
        Task: { active: 0, archived: 0 },
        'Random Thought': { active: 0, archived: 0 },
        Idea: { active: 0, archived: 0 }
    };

    notesData.forEach(note => {
        const category = note.noteCategory;
        if (note.isArchived) {
            summaryData[category].archived++;
        } else {
            summaryData[category].active++;
        }
    });

    // Update the summary table cells
    document.getElementById('taskActiveCount').textContent = summaryData.Task.active;
    document.getElementById('taskArchivedCount').textContent = summaryData.Task.archived;
    document.getElementById('randomThoughtActiveCount').textContent = summaryData['Random Thought'].active;
    document.getElementById('randomThoughtArchivedCount').textContent = summaryData['Random Thought'].archived;
    document.getElementById('ideaActiveCount').textContent = summaryData.Idea.active;
    document.getElementById('ideaArchivedCount').textContent = summaryData.Idea.archived;
}

// Event listener to add a new note when the "Add Note" button is clicked
document.getElementById("addNoteButton").addEventListener("click", addNote);

// Initial rendering of notes and summary tables
displayNotesInTable(notesData, "notesTable", false);
displayNotesInTable(notesData.filter(note => note.isArchived), "archivedNotesTable", true);
updateSummaryTable();

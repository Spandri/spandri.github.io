



let data = []; // Array zur Speicherung der Nutzerdaten
let passwordModal = document.getElementById("passwordModal");
let closeButton = document.getElementsByClassName("close")[0];

// Funktion zum Absenden des Formulars
function submitForm() {
  let form = document.getElementById("form");
  let vorname = form.elements["vorname"].value;
  let nachname = form.elements["nachname"].value;
  let gemeinschaft = form.elements["gemeinschaft"].value;
  let groesse = form.elements["groesse"].value;
  let pullovergroesse = form.elements["pullovergroesse"].value;

  // Überprüfen, ob Vorname und Nachname eingegeben wurden
  if (vorname.trim() === "" || nachname.trim() === "") {
    alert("Bitte Vorname und Nachname eingeben.");
    return;
  }

  let savedData = localStorage.getItem('userData');
  if (savedData) {
    data = JSON.parse(savedData);
  }

  // Nutzerdaten in Array speichern
  data.push({
    vorname: vorname,
    nachname: nachname,
    gemeinschaft: gemeinschaft,
    groesse: groesse,
    pullovergroesse: pullovergroesse
  });

  // Save data to localStorage
  localStorage.setItem('userData', JSON.stringify(data));
  // Formular zurücksetzen
  form.reset();
}

// Funktion zum Anzeigen der Tabelle
function showTable() {
  let passwordModal = document.getElementById("passwordModal");

  // Passwort-Abfrage anzeigen
    let password = prompt("Bitte das Passwort eingeben, um die Tabelle anzuzeigen.");
    if (password !== "WJT") {
      alert("Falsches Passwort.");
      return;
    }
      let tableContainer = document.getElementById("tableContainer");
  tableContainer.style.display = "block";
  
      
    
  

}


  
 





function closePasswordModal() {
  passwordModal.style.display = "none";
}

// Event-Listener für den "x" Button
closeButton.addEventListener("click", closePasswordModal);

function downloadData() {
  const wb = XLSX.utils.book_new();
  wb.SheetNames.push("Data");

  const ws = XLSX.utils.json_to_sheet(data);
  wb.Sheets["Data"] = ws;
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    "data.xlsx"
  );
} //fertig


let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetData);

function resetData() {
  let password = prompt("Bitte das Passwort eingeben, um die Tabelle zurückzusetzen.");
  if (password !== "WJT") {
    alert("Falsches Passwort.");
    return;
  }

  if (confirm("Möchten Sie wirklich alle Daten löschen und die Tabelle zurücksetzen?")) {
    // Daten aus localStorage löschen
    localStorage.removeItem('userData');

    // Tabelle leeren
    let tableBody = document.getElementById("table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    // Daten-Array leeren
    data = [];

    // Erfolgsmeldung anzeigen
    alert("Die Tabelle wurde erfolgreich zurückgesetzt.");
  }
}




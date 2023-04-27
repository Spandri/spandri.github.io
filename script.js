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

	// Nutzerdaten in Array speichern
	data.push({
		vorname: vorname,
		nachname: nachname,
        gemeinschaft: gemeinschaft,
		groesse: groesse,
        pullovergroesse: pullovergroesse
	});

	// Formular zurücksetzen
	form.reset();
}

// Funktion zum Anzeigen der Tabelle
function showTable() {
	let passwordModal = document.getElementById("passwordModal");

	// Passwort-Abfrage anzeigen
	passwordModal.style.display = "block";
}

// Funktion zum Überprüfen des Passworts
function checkPassword() {
    let password = document.getElementById("password").value;

    // Passwort überprüfen
    if (password !== "WJT") {
        let error = document.getElementById("error");
        error.classList.remove("hidden");
        document.getElementById("password").value = ""; // Passwortfeld leeren
        return;
    }

    // Passwort-Abfrage schließen
    let passwordModal = document.getElementById("passwordModal");
    passwordModal.style.display = "none";

    // Tabelle anzeigen
    let tableContainer = document.getElementById("tableContainer");
    tableContainer.style.display = "block";

    // Tabelle mit Nutzerdaten füllen
    let tableBody = document.getElementById("table").getElementsByTagName("tbody")[0];

    // Zuvor eingefügte Daten löschen
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Neue Daten in Tabelle einfügen
    for (let i = 0; i < data.length; i++) {
        let row = tableBody.insertRow(i);
        let vornameCell = row.insertCell(0);
        let nachnameCell = row.insertCell(1);
        let gemeinschaftCell = row.insertCell(2);
        let groesseCell = row.insertCell(3);
        let pullovergroesseCell = row.insertCell(4);
        vornameCell.innerHTML = data[i].vorname;
        nachnameCell.innerHTML = data[i].nachname;
        gemeinschaftCell.innerHTML = data[i].gemeinschaft;
        groesseCell.innerHTML = data[i].groesse;
        pullovergroesseCell.innerHTML = data[i].pullovergroesse;
    }
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
  }
  
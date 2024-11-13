const validUsername = "admin";
const validPassword = "admin";
document.addEventListener("DOMContentLoaded", function() {
    
    displayRecords();
});

// Function to validate inputs
function validateInputs(username, email, password) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !email || !password) {
        alert("All fields are required.");
        return false;
    }
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    return true;
}

// Login function
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username === validUsername && password === validPassword) {
       
        document.getElementById("login-container").style.display = "none";
        document.getElementById("records-container").style.display = "block";
        displayRecords(); 
    } else {
        alert("Invalid username or password.");
    }
}

// Display records in the table
function displayRecords() {
    const recordsTableBody = document.querySelector("#records-table tbody");
    const userRecords = JSON.parse(localStorage.getItem("users")) || [];

    recordsTableBody.innerHTML = ""; // Clear existing records

    userRecords.forEach((record, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.username}</td>
            <td>${record.email}</td>
            <td>${record.password}</td>
            <td>
                <div class="actions-container">
                    <button class="edit" onclick="editRecord(${index})">Edit</button>
                    <button class="delete" onclick="deleteRecord(${index})">Delete</button>
                </div>
            </td>
        `;
        recordsTableBody.appendChild(row);
    });
}


// Function to delete all records
function deleteAllRecords() {
    const confirmation = confirm("Are you sure you want to delete all records?");
    if (confirmation) {
        localStorage.removeItem("users");
        displayRecords(); 
        alert("All records have been deleted.");
    }
}

// Function to search records
function searchRecords() {
    const query = document.querySelector("#search").value.toLowerCase();
    const recordsTableBody = document.querySelector("#records-table tbody");
    const userRecords = JSON.parse(localStorage.getItem("users")) || [];

    recordsTableBody.innerHTML = ""; 

    userRecords.forEach((record, index) => {
        if (
            record.username.toLowerCase().includes(query) || 
            record.email.toLowerCase().includes(query)
        ) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${record.username}</td>
                <td>${record.email}</td>
                <td>${record.password}</td>
                <td>
                    <div class="actions-container">
                        <button class="edit" onclick="editRecord(${index})">Edit</button>
                        <button class="delete" onclick="deleteRecord(${index})">Delete</button>
                    </div>
                </td>
            `;
            recordsTableBody.appendChild(row);
        }
    });

    if (recordsTableBody.innerHTML === "") {
        const row = recordsTableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 4; 
        cell.textContent = "No records found.";
        cell.style.textAlign = "center";
    }
}


// Function to edit a record
let editingIndex = null; 

function editRecord(index) {
    const userRecords = JSON.parse(localStorage.getItem("users")) || [];
    const record = userRecords[index];

    // Set the fields to editable inputs
    const recordsTableBody = document.querySelector("#records-table tbody");
    recordsTableBody.innerHTML = "";

    userRecords.forEach((rec, idx) => {
        const row = document.createElement("tr");
        if (idx === index) {
            // Create input fields for editing
            row.innerHTML = `
                <td><input type="text" id="edit-username" value="${rec.username}" /></td>
                <td><input type="email" id="edit-email" value="${rec.email}" /></td>
                <td><input type="password" id="edit-password" value="${rec.password}" /></td>
                <td>
                    <button onclick="saveRecord(${index})">Save</button>
                    <button onclick="cancelEdit()">Cancel</button>
                </td>
            `;
        } else {
            row.innerHTML = `
                <td>${rec.username}</td>
                <td>${rec.email}</td>
                <td>${rec.password}</td>
                <td>
                    <div class="actions-container">
                        <button class="edit" onclick="editRecord(${idx})">Edit</button>
                        <button class="delete" onclick="deleteRecord(${idx})">Delete</button>
                    </div>
                </td>
            `;
        }
        recordsTableBody.appendChild(row);
    });
}

function saveRecord(index) {
    const userRecords = JSON.parse(localStorage.getItem("users")) || [];

    const updatedRecord = {
        username: document.querySelector("#edit-username").value,
        email: document.querySelector("#edit-email").value,
        password: document.querySelector("#edit-password").value,
    };

    userRecords[index] = updatedRecord; 
    localStorage.setItem("users", JSON.stringify(userRecords));

    displayRecords(); 
}

function cancelEdit() {
    displayRecords();
}

// Function to delete a record
function deleteRecord(index) {
    const userRecords = JSON.parse(localStorage.getItem("users")) || [];
    userRecords.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(userRecords));
    displayRecords();
}

function logout() {
    document.getElementById("records-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("login-username").value = '';
    document.getElementById("login-password").value = '';
}


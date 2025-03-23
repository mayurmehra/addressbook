document.addEventListener('DOMContentLoaded', function() {
    // Method to capture the form data and send to server
    const getaddresses = function(){
        fetch("/addresses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            // Clear the table body before appending new data
            const tbody = document.getElementById("address-body");
            tbody.innerHTML = '';

            // Appending data to the table
            data.forEach(add => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${add.firstname}</td>
                    <td>${add.lastname}</td>
                    <td>${add.email}</td>
                    <td>${add.phone}</td>
                    <td>${add.address1}</td>
                    <td>${add.address2}</td>
                    <td>${add.city}</td>
                    <td>${add.state}</td>
                    <td>${add.zip}</td>
                `;
                row.addEventListener('click', () => populateForm(add));
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    const save = function (ev) {
        ev.preventDefault();

        const form = document.getElementById("form");
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        fetch("/addresses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error(`Returned response status code: ${response.status}`);
            }
        })
        .then(data => {
            form.reset();
            document.getElementById("deleteButton").disabled = true; // Disable delete button after saving
            getaddresses(); // Refresh the table after saving
        })
        .catch(error => console.error('Error:', error));
    }

    const deleteAddress = function () {
        const id = document.getElementById("inputId").value;
        if (!id) return;

        fetch(`/addresses/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("form").reset();
                document.getElementById("deleteButton").disabled = true; // Disable delete button after deleting
                getaddresses(); // Refresh the table after deleting
            } else {
                throw new Error(`Returned response status code: ${response.status}`);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    const populateForm = function (address) {
        document.getElementById("inputId").value = address.id;
        document.getElementById("inputFirstName").value = address.firstname;
        document.getElementById("inputLastName").value = address.lastname;
        document.getElementById("inputEmail").value = address.email;
        document.getElementById("inputPhone").value = address.phone;
        document.getElementById("inputAddress1").value = address.address1;
        document.getElementById("inputAddress2").value = address.address2;
        document.getElementById("inputCity").value = address.city;
        document.getElementById("inputState").value = address.state;
        document.getElementById("inputZip").value = address.zip;
        document.getElementById("deleteButton").disabled = false; // Enable delete button when a record is populated
    }

    // Script execution starts here
    getaddresses();

    document.getElementById("form").addEventListener('submit', save);
    document.getElementById("deleteButton").addEventListener('click', deleteAddress);
});
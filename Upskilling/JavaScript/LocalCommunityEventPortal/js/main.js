/* ----------------------------------
   Page Load
----------------------------------- */

window.onload = function () {

    alert(
        "Welcome to the Cultural Fest Community Portal"
    );

    loadEvents();

    loadEventsUsingPromise();

};

/* ----------------------------------
   Display Events
----------------------------------- */

function displayEvents(
    eventsList = eventCatalog
) {

    const eventsContainer =
        document.querySelector("#eventsContainer");

    eventsContainer.innerHTML = "";

    eventsList.forEach(eventItem => {

        const {
            eventId,
            title,
            category,
            location,
            eventDate,
            availableSeats
        } = eventItem;

        const eventCard =
            document.createElement("div");

        eventCard.className = "event-card";

        eventCard.innerHTML = `
            <h3>${title}</h3>

            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Seats Available:</strong> ${availableSeats}</p>

            <button onclick="registerUser(${eventId})">
                Register
            </button>
        `;

        eventsContainer.appendChild(eventCard);

    });

}

/* ----------------------------------
   Category Filter
----------------------------------- */

document.getElementById("eventCategory")
.addEventListener("change", function () {

    const filteredEvents =
        eventCatalog.filter(
            eventObj =>
                this.value === "All" ||
                eventObj.category === this.value
        );

    displayEvents(filteredEvents);

});

/* ----------------------------------
   Search Events
----------------------------------- */

document.getElementById("searchInput")
.addEventListener("keydown", function () {

    const keyword = this.value.toLowerCase();

    const results =
        searchEvents(events =>
            events.filter(
                e =>
                    e.title.toLowerCase().includes(keyword)
            )
        );

    displayEvents(results);

});

/* ----------------------------------
   Registration Form
----------------------------------- */

document.getElementById("registrationForm")
.addEventListener("submit", function (event) {

    event.preventDefault();

    const participantName =
        this.elements["userName"].value;

    const participantEmail =
        this.elements["userEmail"].value;

    const selectedEvent =
        this.elements["selectedEvent"].value;

    const messageBox =
        document.getElementById("message");

    if (
        !participantName.trim() ||
        !participantEmail.trim() ||
        !selectedEvent.trim()
    ) {

        messageBox.style.color = "red";
        messageBox.innerText = "Please fill all fields.";
        return;

    }

    messageBox.style.color = "#f39c12";
    messageBox.innerText = "Submitting registration...";

    const registrationPayload = {
        participantName,
        participantEmail,
        selectedEvent
    };

    setTimeout(() => {

        submitRegistration(registrationPayload)

        .then(() => {

            const selectedEventObject =
                eventCatalog.find(
                    e => e.title === selectedEvent
                );

            if (
                selectedEventObject &&
                selectedEventObject.availableSeats > 0
            ) {

                selectedEventObject.availableSeats--;

                updateRegistrationCount();

                displayEvents();

            }

            messageBox.style.color = "green";
            messageBox.innerText = "Registration Successful!";

            this.reset();

        })

        .catch(() => {

            messageBox.style.color = "red";
            messageBox.innerText = "Registration Failed.";

        });

    }, 2000);

});
console.log("Welcome to the Cultural Fest Community Portal");

/* -----------------------------
   Event Class
------------------------------ */

class CulturalEvent {

    constructor(
        eventId,
        title,
        category,
        location,
        eventDate,
        availableSeats
    ) {

        this.eventId = eventId;
        this.title = title;
        this.category = category;
        this.location = location;
        this.eventDate = eventDate;
        this.availableSeats = availableSeats;

    }

}

/* -----------------------------
   Prototype Method
------------------------------ */

CulturalEvent.prototype.checkAvailability = function () {

    return this.availableSeats > 0;

};

/* -----------------------------
   Main Event Array
------------------------------ */

let eventCatalog = [];

/* -----------------------------
   Add Event Function
------------------------------ */

function addEvent(eventObject) {

    eventCatalog.push(eventObject);

}

/* -----------------------------
   Closure Example
------------------------------ */

function createRegistrationTracker() {

    let registrationCount = 0;

    return function () {

        registrationCount++;

        console.log(
            `Total Registrations: ${registrationCount}`
        );

        return registrationCount;

    };

}

const updateRegistrationCount =
    createRegistrationTracker();

/* -----------------------------
   Register User Function
------------------------------ */

function registerUser(eventId) {

    try {

        const selectedEvent =
            eventCatalog.find(
                currentEvent =>
                    currentEvent.eventId === eventId
            );

        if (!selectedEvent) {

            throw new Error(
                "Selected event not found."
            );

        }

        if (
            selectedEvent.availableSeats <= 0
        ) {

            throw new Error(
                "No seats available for this event."
            );

        }

        document.getElementById(
            "selectedEvent"
        ).value =
            selectedEvent.title;

        document
            .getElementById(
                "registrationForm"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }

    catch (error) {

        alert(error.message);

        console.error(error);

    }

}

/* -----------------------------
   Category Filter
------------------------------ */

function filterEventsByCategory(
    selectedCategory
) {

    return eventCatalog.filter(
        eventItem =>
            selectedCategory === "All" ||
            eventItem.category === selectedCategory
    );

}

/* -----------------------------
   Callback-Based Search
------------------------------ */

function searchEvents(
    callbackFunction
) {

    return callbackFunction(
        eventCatalog
    );

}
/* ----------------------------------
   Load Events Using Async / Await
----------------------------------- */

async function loadEvents() {

    try {

        const response = await fetch("data/events.json");

        const eventData = await response.json();

        eventData.forEach(eventItem => {

            const {
                id,
                title,
                category,
                location,
                eventDate,
                availableSeats
            } = eventItem;

            addEvent(
                new CulturalEvent(
                    id,
                    title,
                    category,
                    location,
                    eventDate,
                    availableSeats
                )
            );
        });

        console.log("First Event Details");

        Object.entries(eventData[0]).forEach(
            ([key, value]) => {

                console.log(`${key} : ${value}`);

            }
        );

        displayEvents();

    }
    catch (error) {

        console.error(
            "Error loading event data:",
            error
        );

    }

}

/* ----------------------------------
   Promise Example Using then/catch
----------------------------------- */

function loadEventsUsingPromise() {

    fetch("data/events.json")

        .then(response => response.json())

        .then(data => {

            console.log(
                "Promise Data Loaded"
            );

            console.log(data);

        })

        .catch(error => {

            console.error(
                "Promise Error:",
                error
            );

        });

}

/* ----------------------------------
   Registration API
----------------------------------- */

function submitRegistration(
    registrationData
) {

    console.log(
        "Sending Registration Data..."
    );

    return fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(
                registrationData
            )
        }
    )

    .then(response =>
        response.json()
    )

    .then(result => {

        console.log(
            "Server Response:"
        );

        console.log(result);

        return result;

    })

    .catch(error => {

        console.error(
            "Registration Error:",
            error
        );

        throw error;

    });

}
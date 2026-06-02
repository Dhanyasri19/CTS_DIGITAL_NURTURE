$(document).ready(function () {

    console.log(
        "jQuery Loaded Successfully"
    );

    /* -----------------------------
       Register Button Click
    ------------------------------ */

    $("#registerBtn").click(
        function () {

            $("#eventsContainer")
                .fadeOut(300)
                .fadeIn(300);

        }
    );

    /* -----------------------------
       Highlight Search Box
    ------------------------------ */

    $("#searchInput").focus(
        function () {

            $(this).css(
                "background-color",
                "#fff8dc"
            );

        }
    );

    $("#searchInput").blur(
        function () {

            $(this).css(
                "background-color",
                "#ffffff"
            );

        }
    );

    /* -----------------------------
       Category Change Animation
    ------------------------------ */

    $("#eventCategory").change(
        function () {

            $("#eventsContainer")
                .hide()
                .fadeIn(500);

        }
    );

});
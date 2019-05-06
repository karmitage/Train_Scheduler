$(document).ready(function () {

    // Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyA4nYXQFK7plq6Kez0nyAcMXAPdGXZzfyY",
        authDomain: "trainscheduler-6f148.firebaseapp.com",
        databaseURL: "https://trainscheduler-6f148.firebaseio.com",
        projectId: "trainscheduler-6f148",
        storageBucket: "trainscheduler-6f148.appspot.com",
        messagingSenderId: "627083201383",
        appId: "1:627083201383:web:76d833fdcc69a8a0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database.
    var database = firebase.database();

    // Capture inputs and store them into variables
    var name = '';
    var destination = '';
    var time = '';
    var frequency = 0;
    var timeFormat = 'HHmm' //specifies formatting for military time

    $("#search").on("click", function (event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();

        // Capture user inputs and store them in variables
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        time = $("#time").val().trim();
        frequency = $("#frequency").val().trim();

        // Console log each of the user inputs to confirm we are receiving them
        console.log(name);
        console.log(destination);
        console.log(time);
        console.log(frequency);

        //this captures the "time" field input (which is a string) & stores it in 
        //the format specified by the "timeFormat" variable and displays it in that format
        //if we wanted, we could store it in one format and display it in another. but we're not going to do that.
        time = moment(time, timeFormat).format(timeFormat);


        // push data to our db
        database.ref().push({
            "name": name,
            "destination": destination,
            "time": time,
            "frequency": frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function (snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        // Console.logging data
        console.log(sv.name);
        console.log(sv.destination);
        console.log(sv.time);
        console.log(sv.frequency);

        //initialize variables for calculated display values
        var nextArrival = '';
        var minutesAway = 0;


        //populate HTML elements
        var row = $("<tr>");
        var rowHeader = $("<th scope='row'>");
        row.append(rowHeader);

        rowHeader.text(sv.name);

        var col1 = $("<td id='destination'>");
        var col2 = $("<td id='frequency'>");
        var col3 = $("<td id='next-arrival'>");
        var col4 = $("<td id='minutes-away'>");


        rowHeader.text(sv.name);
        col1.text(sv.destination);
        col2.text(sv.frequency);
        col3.text(nextArrival);
        col4.text(minutesAway);


        row.append(col1);
        row.append(col2);
        row.append(col3);
        row.append(col4);

        $("#displayResults").append(row);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});
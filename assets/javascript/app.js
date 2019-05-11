$(document).ready(function () {

    //Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyA4nYXQFK7plq6Kez0nyAcMXAPdGXZzfyY",
        authDomain: "trainscheduler-6f148.firebaseapp.com",
        databaseURL: "https://trainscheduler-6f148.firebaseio.com",
        projectId: "trainscheduler-6f148",
        storageBucket: "trainscheduler-6f148.appspot.com",
        messagingSenderId: "627083201383",
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
    var timeFormat = 'HH:mm' //specifies formatting for military time

    $("#addTrain").on("click", function (event) {
        // prevent page from refreshing when form tries to submit itself
        //event.preventDefault();

        // Capture user inputs and store them in variables
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        time = $("#time").val().trim();
        frequency = $("#frequency").val().trim();


        //this captures the "time" field input (which is a string) & stores it in 
        //the format specified by the "timeFormat" variable and displays it in that format
        //if we wanted, we could store it in one format and display it in another. but we're not going to do that.
        time = moment(time, timeFormat).format(timeFormat);


        // push data to db
        database.ref().push({
            name: name,
            destination: destination,
            time: time,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function (snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        //initialize variables for calculated display values
        var nextArrival = moment();
        var minutesAway = 0;

        //determine minutes away and arrival time
        var firstTimeConverted = moment(sv.time, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // Time apart (remainder)
        var remainder = diffTime % sv.frequency;
        // Minutes Until Train
        minutesAway = sv.frequency - remainder;
        // Next Train
        nextArrival = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextArrival).format(timeFormat);

        //populate HTML elements
        var row = $("<tr>");
        var rowHeader = $("<th scope='row'>");
        row.append(rowHeader);

        rowHeader.text(sv.name);

        var col1 = $("<td id='displayDestination'>");
        var col2 = $("<td id='displayFrequencyrequency'>");
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

        // Handle errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});
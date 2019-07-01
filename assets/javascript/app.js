// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCC58IrzGRvdMdX-fFC2bJGxWprrL56BlQ",
    authDomain: "train-time-54410.firebaseapp.com",
    databaseURL: "https://train-time-54410.firebaseio.com",
    projectId: "train-time-54410",
    storageBucket: "",
    messagingSenderId: "363211733854",
    appId: "1:363211733854:web:ac50010e0c1ee709"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.database();

//  When the submit button is clicked...
//  everything the user has filled out in the form will be pushed to firebase as an object
$("#submit-button").on("click", function (e) {
    e.preventDefault();

    var name = $("#train-name-input").val();
    var destination = $("#destination-input").val();
    var time = $("#first-time-input").val();
    var frequency = $("#frequency-input").val();

    var train = {
        name,
        destination,
        time,
        frequency
    };
    database.ref().push(train);
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");

})

//  Adds latest train submitted to the Current Train Schedule

database.ref().on("child_added", function (trainSnapshot) {
    // console.log(trainSnapshot);

    var snapName = trainSnapshot.val().name;
    var snapDest = trainSnapshot.val().destination;
    var snapTime = trainSnapshot.val().time;
    var snapFreq = trainSnapshot.val().frequency;
    var nextArrival = 0;
    var minutesAway = 0;

    // console.log(snapName);
    // console.log(snapDest);
    // console.log(snapTime);
    // console.log(snapFreq);

    //  Calculates Next arrival / Minutes away, takes in first time and frequency
    function calcTime(firstTime, frequency) {

        //  Find out what time it currently is (set var currentTime)
        var currentTime = moment().format("HH:mm");
        // console.log("current time: " + currentTime);
        var timeFormatted = moment(firstTime, "HH:mm");

        console.log("timeFormatted: " + timeFormatted);
        console.log("currentTime: " + currentTime);



        while (timeFormatted < currentTime) {
            var timeFormatted = moment(timeFormatted).add(frequency, "mm").format("HH:mm");
        }
        console.log("while: " + timeFormatted);

        nextArrival = timeFormatted;
        console.log("nextarrival: " + nextArrival);
        
        // minutesAway = moment(nextArrival, "HH:mm").subtract(currentTime, "HH:mm").format("m");
        // console.log(minutesAway);

        minutesAway = nextArrival.fromNow();
        console.log("minutes away: " + minutesAway);

        // if (addedTime > currentTime) {
        //     console.log("next arrival: " + addedTime);
        //     afterCurrentTime = true;
        // } else {
        //     console.log("failed");
        // }

        //  Add frequency amount to firstTime until the the time is greater than the currentTime

    }
    calcTime(snapTime, snapFreq);


    //  Appends rows to table with firebase data including new snapshot
    var newRow = $("<tr>").append(
        $("<td>").text(snapName),
        $("<td>").text(snapDest),
        $("<td>").text(snapFreq),
        $("<td>").text(nextArrival),
        // $("<td>").text(minutesAway),

    );

    $("#train-table > tbody").append(newRow);
})



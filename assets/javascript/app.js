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


$("#submit-button").on("click", function (e) {
    e.preventDefault();

    var name = $("#train-name-input").val();
    var destination = $("#destination-input").val();
    var time = $("#first-time-input").val();
    var frequency = $("#frequency-input").val();

    var train = database.ref().set({
        name,
        destination,
        time,
        frequency
    })
    database.ref().push(train);


})


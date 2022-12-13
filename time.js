

function runSpeechRecognition() {

    var output = document.getElementById("output");

    var action = document.getElementById("action");

    var response = document.getElementById("response");


    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();


    recognition.onstart = function () {
        action.innerHTML = "<small>listening, please speak...</small>";
    };

    recognition.onspeechend = function () {
        action.innerHTML = "<small>stopped listening, hope you are done...</small>";
        recognition.stop();
    }
 

     
    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";
        output.classList.remove("hide");
        read(transcript)
    };

    
    recognition.start();
   
    function read(transcript) {
        var todayHours = "";
        var todayMinutes = "";
        // Create an object:
        var commands = {
            timecommand: 'time',
        };

        if (transcript.includes(commands.timecommand)) {
            var today = new Date();
            todayHours = today.getHours();
            var ampm = todayHours >= 12 ? 'pm' : 'am';
            todayMinutes = today.getMinutes();
            if (todayHours.toString().length == 1) todayHours = "0" + todayHours
            if (todayMinutes.toString().length == 1) todayMinutes = "0" + todayMinutes
            response.innerHTML = 'It is ' + todayHours + ":" + todayMinutes + " " + ampm + " right now";

        }
        else {
            response.innerHTML = 'Please say another valid word';
        }

        var msg = response.innerHTML;
        var speech = new SpeechSynthesisUtterance();
        speech.lang = "en-US";

        speech.text = msg;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);

        response.classList.remove("hide");
        runSpeechRecognition();
    }
    
}
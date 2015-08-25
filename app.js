//function getBedTimes converts wake up time into a number, then generates ideal bed times

function getBedTimes() {

  var wakeTotal = parseInt(wakeUp.hours) + parseFloat(wakeUp.minutes / 60); //wakeTotal puts wake up time in terms of a number 

  for (var i = 2; i < 8; i += 1) { //for loop subtracts 1.5 hrs from total wakeTotal 

    var bedTotal = (wakeTotal - (i * 1.5));

    var bedTimes = {
      hours: Math.floor(bedTotal),
      minutes: (bedTotal - Math.floor(bedTotal)) * 60,
      amPm: wakeUp.amPm
    }

    if (bedTimes.amPm == "AM" && bedTimes.hours <= 0) { //adds AM & PM properties to bed time objects
      bedTimes.amPm = "PM";
    } else if (bedTimes.amPm == "PM" && bedTimes.hours <= 0) {
      bedTimes.amPm = "AM";
    }

    if (bedTimes.hours <= 0) { //adjusts negative numbers
      bedTimes.hours += 12;
    };

    if (bedTimes.minutes == 0) {
      bedTimes.minutes = "00"; //formats 00 correctly
    }

    $("#bedtime").append("<p>" + bedTimes.hours + ":" + bedTimes.minutes + " " + bedTimes.amPm + "</p>"); //appends to #bedtime div

  }
}

$("#secondary-content").hide();

var wakeUp = {};
$("#wakeup").submit(function() {
  wakeUp.hours = $("#hours").val(); //retrieves values of form for getBedTimes function
  wakeUp.minutes = $("#minutes").val();
  wakeUp.amPm = $("#am_pm").val();

  event.preventDefault();

  $("#bedtime").html("");
  $("#secondary-content").show();
  getBedTimes();

});
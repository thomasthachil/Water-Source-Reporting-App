var arrLat = [];
var arrLong = [];

(function($){
  $(function(){
    $('select').material_select();
    $('#loginSubmit').click(function() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        loadJSON("./data/users.json", function(response) {
            var data = JSON.parse(response);
            console.log(data);
            var userData = data[username];
            console.log(data[username].password);
            if (username ==='' || password ==='') {
                alert("Please fill all fields...!!!!!!");
                return false;
            } else if (userData == null) {
                alert("Could not find user");
                return false;
            } else if (data[username].password != password) {
                alert("Password is incorrect");
                return false;
            }
            else {
                var foundUser = username;
                sessionStorage.setItem('user', 'foundUser');
                window.location.href = "home.html";
            }
        });
    });
    loadJSON('./data/waterReports.json', function(response) {
        response = JSON.parse(response);
        for (var key in response) {
            var location = response[key].location;
            var llat = response[key].llat;
            var llong = response[key].llong;
            var user = response[key].user;
            var date = response[key].date;
            var waterCondition = response[key].waterCondition;
            var waterType = response[key].waterType;
            var appendString = '<tr><td>' + location + '</td><td>'+ llat +'</td><td>'+ llong +'</td><td>' + user + '</td><td>'+ date + '</td><td>' + waterCondition + '</td><td>' + waterType + '</td></tr>';
            $('#waterAvailability').append(appendString);
            if (document.getElementById('waterAvailability')) {
                arrLat.push(llat);
                arrLong.push(llong);
                initMap();
            }

        }
    });
    loadJSON('./data/purityReports.json', function(response) {
        response = JSON.parse(response);
        for (var key in response) {
            var location = response[key].location;
            var llat = response[key].llat;
            var llong = response[key].llong;
            var user = response[key].user;
            var date = response[key].date;
            var waterCondition = response[key].waterCondition;
            var contaminantPPM = response[key].contaminantPPM;
            var virusPPM = response[key].virusPPM;
            var appendString = '<tr><td>' + location + '</td><td>'+ llat +'</td><td>'+ llong +'</td><td>' + user + '</td><td>' +  date + '</td><td>'+ waterCondition + '</td><td>' + contaminantPPM + '</td><td>' + virusPPM + '</td></tr>';
            $('#waterPurity').append(appendString);
            console.log
            if (document.getElementById('waterPurity')) {
                arrLat.push(llat);
                arrLong.push(llong);
                setTimeout(initMap, 2000)
                //initMap();
            }
        }
    });

}); // end of document ready

  function loadJSON(file, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
    }

}(jQuery)); // end of jQuery name space

function initMap() {
  var start = new google.maps.LatLng(34.1252504, -84.2617087);

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: start
  });
  console.log(arrLat.length);
  for (var i = 0; i < arrLat.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(arrLat[i], arrLong[i]),
        map: map,
        title: 'Hello World!'
      });
  }

}

(function($){
  $(function(){

    var data;
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

})(jQuery); // end of jQuery name space

function get_covid() {
  const { PythonShell } = require("python-shell");
  var path = require("path");

  var city = document.getElementById("city").value;
  document.getElementById("city").value = "";

  var options = {
    scriptPath: path.join(__dirname, "/python/"),
    args: [city],
  };

  var covid19 = new PythonShell("covid19.py", options);
  document.getElementById("result").innerHTML = result;
  covid19.on("message", function (message) {
    swal.fire(message, "Confrimed Cases");
  });
}

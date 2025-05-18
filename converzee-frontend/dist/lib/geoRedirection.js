function leadEngarge_geo_Redirection(onSuccess) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      onSuccess(xhttp.responseText);
    }
  };
  xhttp.open("GET", "https://ipapi.co/json/", true);
  xhttp.send();
}
// leadEngarge_geo_Redirection(leadEngarge_geo_Redirect_OnSuccess);
// function leadEngarge_geo_Redirect_OnSuccess(json) {
//   var details = JSON.parse(json);
//   var regx = new RegExp(details.country_name, "gi");
//   counties.forEach(element => {
//     if (element.country.match(regx)) {
//       console.log("------->", element);
//     }
//   });
//   details.country_name;
// }
// var counties = [
//   { country: "India", url: "google.com" },
//   { country: "US", url: "f.com" },
//   { country: "UK", url: "a.com" },
//   { country: "NEW ZELAND", url: "b.com" },
//   { country: "Poland", url: "c.com" }
// ];

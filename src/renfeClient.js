function getTravels(from, to, day, month, year) {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    let uri = `https://renfeparser.herokuapp.com/${from}/${to}/${year}-${month}-${day}`;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        return resolve(JSON.parse(xhttp.responseText));
      }
      if (this.readyState == 4 && this.status !== 200) {
        return reject(this.status);
      }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
  });
}

export default getTravels;

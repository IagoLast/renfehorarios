function getTravels(from, to, day, month, year) {
  const uri = `https://renfeparser.herokuapp.com/${from}/${to}/${year}-${month}-${day}`;
  return fetch(uri).then(response => response.json());
}

export default getTravels;

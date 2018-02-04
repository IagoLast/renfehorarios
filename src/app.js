import getTravels from './renfeClient.js';
import autoComplete from './autocomplete.js';
import stations from './stations.js';

export default class App {
  constructor() {
    this._dateInput = document.querySelector('input[name="date"]');
    this._fromInput = document.querySelector('input[name="from"]');
    this._toInput = document.querySelector('input[name="to"]');
    this._searchButton = document.querySelector('input[name="search"]');
    this._table = document.querySelector('table');
    this._timetable = document.querySelector('tbody');
    this._spinner = document.querySelector('.spinner');
  }

  init() {
    this._populateSelects(stations);
    let today = new Date();
    this._dateInput.value = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    this._searchButton.addEventListener('click', this.onSearch.bind(this));
  }

  onSearch() {
    let [day, month, year] = this._dateInput.value.split('/');
    let from = stations[this._fromInput.value];
    let to = stations[this._toInput.value];
    this.sendRequest(from, to, day, month, year);
  }


  sendRequest(from, to, day, month, year) {
    this._table.style.display = 'none';
    this._spinner.style.display = 'block';

    getTravels(from, to, day, month, year)
      .then(travels => {
        this._timetable.innerHTML = travels.map(this.createRow).join('');
        this._spinner.style.display = 'none';
        this._table.style.display = 'table';
        this._table.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      })
      .catch(console.error);
  }

  createRow(travel) {
    return `<tr><td>${travel.train}</td><td>${travel.departure}</td><td>${travel.arrival}</td><td>${travel.price}</td></tr>`;
  }

  showSpinner() {
    this._spinner.style.display = 'block';
  }

  hideSpinner() {
    this._spinner.style.display = 'none';
  }

  _populateSelects(stations) {
    let stationsData = {};
    let stationsArray = [];

    for (let station in stations) {
      stationsArray.push(station);
      stationsData[station] = stations[station];
    }


    this._newAutocomplete('input[name="from"]', stationsArray);
    this._newAutocomplete('input[name="to"]', stationsArray);
  }

  _newAutocomplete(selector, stationsArray) {
    return new autoComplete({
      selector,
      minChars: 1,
      source: (term, suggest) => {
        let suggestions = [];
        for (let i = 0; i < stationsArray.length; i++) {
          if (stationsArray[i].toLowerCase().includes(term.toLowerCase())) {
            suggestions.push(stationsArray[i]);
          }
        }
        suggest(suggestions);
      },
    });
  }
}

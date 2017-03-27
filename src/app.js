import getTravels from './renfeClient.js';

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
    let today = new Date();
    this._dateInput.value = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
    this._searchButton.addEventListener('click', this.onSearch.bind(this));
  }

  onSearch() {
    let [day, month, year] = this._dateInput.value.split('/');
    let from = document.querySelector(`#stations option[value="${this._fromInput.value}"]`).dataset.id;
    let to = document.querySelector(`#stations option[value="${this._toInput.value}"]`).dataset.id;
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
}

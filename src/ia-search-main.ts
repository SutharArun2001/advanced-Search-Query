import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import advancedSearchQuery from "advanced-search-query";

@customElement("ia-search-main")
export class IaSearchMain extends LitElement {

  @property({ type: String }) title = "Hey there";
  @property({ type: String }) query = "";
  @property({ type: String }) searchQuery = '';

  @property({ type: Array }) parasedQuery = [];

  @property({ type: Object }) parasedQueryToPck = {};

  @property()
  year = ["1940", "1941", "1942", "1943", "1944", "1945", "1946", "1947", "1948", "1949", "1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];

  @property()
  months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  @property()
  date = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

  @property()
  searchField = ["name", "creator", "title", "description", "collection", "date", "date range"];

  @property()
  searchOption = [["contains", "true"], ["is not contains", "false"]];


  // @query(".add-field") private addFieldButton!: HTMLButtonElement;
  // @query('#input-search') private inputSearchField!: HTMLInputElement;
  @query('#queryForm') private myForm!: HTMLFormElement;
  @query("#search-field-container") private searchContainer!: HTMLElement;
  @query("#search-btn-submit") private formSubmitBtn!: HTMLElement;
  // private deleteFieldButton!: HTMLElement;

  constructor() {
    super();
    this.parasedQuery = [];
    this.query = '';
    this.searchQuery = this.query;
  }

  firstUpdated() {
    this.searchQuery = this.query;
    this.getKeyValue();
    // this.addDateRangeSearchField();
    // this.inputSearchField.value = this.query;
    // this.myForm.onsubmit = this.submitForm
    // this.addSearchField();
    // this.deleteFieldButton.onclick = this.deleteSearchField;
    // this.addFieldButton.onclick = this.addSearchField;
    // const textArea = this.shadowRoot.getElementById(this.textAreaId);
    // textArea.focus();

  }

  formSubmit() {
    this.setSearchQuery();
    let query = encodeURIComponent(this.searchQuery);
    console.log(this.searchQuery)
    console.log(query)
    window.location.href = `search?query=${query}`

    // var form = document.createElement("form");
    // form.method = "get";
    // form.action = "";
    // var search = document.createElement("input");
    // search.defaultValue=`${query}`;
    // search.name="query";
    // form.appendChild(search);
    // console.error(form.submit())
    // form.submit();

  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--iaux-search-widget-text-color, #000);
      width: 700px;
      margin: 0 auto;
      background: white;
      border-radius: 10px;
    }
    * {
      box-sizing: border-box;
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
    }

    #input-search {
      width: 90%;
    }
    #search-btn {
      padding: 10px;
      background: #009cff;
      border: none;
      border-radius: 3px;
      color: #fff;
      margin: 5px;
    }

    .search-field .term {
      width: 20%;
    }
    .search-field .condition {
      width: 20%;
    }
    .search-field .value {
      width: 40%;
    }
    .search-field .action {
      display: inline-block;
      width: 10%;
    }

    /* Full-width input fields */
    input[type="text"],
    input[type="password"],
    input[type="checkbox"],
    select {
      padding: 10px;
      margin: 5px;
      display: inline-block;
      border: none;
      background: #f1f1f1;
      // box-shadow: 2px 3px 10px #101010;
      }

    input[type="text"]:focus,
    input[type="password"]:focus {
      background-color: #ddd;
      outline: none;
    }

    hr {
      border: 1px solid #f1f1f1;
      margin-bottom: 25px;
    }

    /* Set a style for all buttons */
    button {
      background-color: #04aa6d;
      color: white;
      padding: 10px;
      margin: 5px;
      border: none;
      cursor: pointer;
      opacity: 0.9;
    }
    button.cancel-btn {
      color: white;
      padding: 5px;
      margin: 5px;
      border: none;
      cursor: pointer;
      opacity: 0.9;
    }
    .btn-section {
      text-align: right;
    }
    button:hover {
      opacity: 1;
    }
    .search-fields{
      display: flex;
      justify-content:space-between
    }

    .search-fields .range{
      display:flex;
      align-items:center;
    }
    .search-fields .range select{
      max-width:80px;
    }
    .search-fields .range h3{
      margin:0;
    }

    /* Extra styles for the cancel button */
    .cancelbtn {
      padding: 14px 20px;
      background-color: #f44336;
    }

    /* Float cancel and signup buttons and add an equal width */
    .cancelbtn,
    .signupbtn {
      float: left;
      width: 50%;
    }

    /* Add padding to container elements */
    .container {
      padding: 16px;
    }

    /* Clear floats */
    .clearfix::after {
      content: "";
      clear: both;
      display: table;
    }

    /* Change styles for cancel button and signup button on extra small screens */
    @media screen and (max-width: 300px) {
      .cancelbtn,
      .signupbtn {
        width: 100%;
      }
    }
  `;

  /**
   * to Delete field from html and from search input box
   * @param field | fields
   */
  deleteSearchField(field: HTMLElement) {
    console.log("delete Field")
    // var searchString = this.parasedQuery.join(' ').toString();
    // console.log(searchString);
    // this.parasedQueryToPck = advancedSearchQuery(searchString);
    // console.log(this.parasedQueryToPck);
    // let select_condition = (field.querySelector('.select-condition') as HTMLSelectElement).value;
    // let keyword = (field.querySelector('.select-field') as HTMLSelectElement).value;
    // keyword = (select_condition == 'false') ? '-' + keyword : keyword
    // let value = (field.querySelector('input') as HTMLInputElement).value;
    // console.log(this.inputSearchField.value)
    // console.log(this.parasedQueryToPck.removeKeyword(keyword,value).toString());
    // this.inputSearchField.value = this.parasedQueryToPck.removeKeyword(keyword, value).toString().replace(' ', ' AND ');
    field.remove();
    this.setSearchQuery();
  }

  /**
   * To append options in select Field select box
   * @param {string} key - select option if key has value 
   * @returns {HTMLOptionElement}
   */
  addSearchFieldOption(key?: string) {
    return this.searchField
      .map(
        item =>
          `<option value="${item}" ${key === item ? 'selected' : ''}>${item}</option>`
      );
  }

  /**
   * To append options in condition select box
   * @param {string} isNegated - select option if keyword has value
   * @returns {HTMLOptionElement}
   */
  addSearchFieldCondition(isNegated?: string) {
    return this.searchOption
      .map(
        item =>
          `<option value="${item[1]}" ${item[1] === isNegated ? 'selected' : ''}>${item[0]}</option>`
      );
  }

  /**
  * function get to set fields according to url
  */
  getKeyValue() {
    console.log(`query= ` + this.query);
    var arr = this.query.split(/AND|OR/);
    console.log(arr[0] === '');
    if (arr[0] === '') {
      this.addSearchField();
    } else {
      arr.map(
        (data) => {
          let str = data.split(':');
          let key: string = str[0].trim();
          let isNegated: string = key[0] === '-' ? 'false' : 'true';
          let value = str[1].trim().replace(/[[\]"'()/]/g,'');
          console.log(value)
          key = key.replace('-', '');
          if (this.searchField.includes(key)) {
            if (key === 'date') {
              if (/TO/.test(value)) {
                console.log(value);
                this.addDateRangeSearchField(value);
              } else {
                this.addDateSearchField(value);
              }
            } else {
              this.addSearchField(key,isNegated,value)
            }
          }
        })
    }
  }

  /**
   * function for set value of fields
   */
  setSearchQuery() {
    // this.getKeyValue()
    this.parasedQuery = [];
    var selectFields = this.searchContainer.querySelectorAll(".search-fields");
    selectFields.forEach(
      (element) => {
        let select_field = (element.querySelector('.select-field') as HTMLInputElement).value;
        let select_value = element.querySelector('input')?.value;

        if (select_field === "none" || select_value === "") {
        } else {
          if (select_field === 'date') {
            
            const year = (element.querySelector('.select-year') as HTMLInputElement).value;
            const month = (element.querySelector('.select-month') as HTMLInputElement).value;
            const date = (element.querySelector('.select-date') as HTMLInputElement).value;

            if (
              year === "none" || 
              month === "none" || 
              date === "none"
            ) {
              return null;
            } else {
              var searchQToShow = `date:${year}-${month}-${date}`;
            }
            // console.log(searchQToShow);
          } else if (select_field === 'date range') {

            const yearFrom = (element.querySelector('.select-year-from') as HTMLInputElement).value;
            const monthFrom = (element.querySelector('.select-month-from') as HTMLInputElement).value;
            const dateFrom = (element.querySelector('.select-date-from') as HTMLInputElement).value;
            const yearTo = (element.querySelector('.select-year-to') as HTMLInputElement).value;
            const monthTo = (element.querySelector('.select-month-to') as HTMLInputElement).value;
            const dateTo = (element.querySelector('.select-date-to') as HTMLInputElement).value;

            if (
              yearFrom === "none" || 
              monthFrom === "none" || 
              dateFrom === "none" || 
              yearTo === "none" || 
              monthTo === "none" || 
              dateTo === "none"
            ) {
              return null;
            } else {
              var searchQToShow = `date:[${yearFrom}-${monthFrom}-${dateFrom} TO ${yearTo}-${monthTo}-${dateTo}]`;
            }
          } else {
            const select_condition = (element.querySelector('.select-condition') as HTMLInputElement).value;
            var searchQToShow = `${(select_condition === 'false') ? '-' + select_field : select_field}:(${select_value})`;
            this.parasedQuery.push(searchQToShow);
            console.log("sss")
            console.log(this.parasedQuery);
          }
          // this.inputSearchField.value = this.parasedQuery.join(' AND ');
          this.searchQuery = this.parasedQuery.join(' AND ')
        }
      });
    var searchString = this.parasedQuery.join(' AND ').toString();
    console.log(searchString);
    this.parasedQueryToPck = advancedSearchQuery(searchString);
    console.log(this.parasedQuery);

  }

  

  /**
   * to add event onChange | onClick
   * @param field - add on change events
   */
  setEventListeners(field: HTMLElement) {
    field.querySelector(".select-field")?.addEventListener("change", () => {
      if ((field.querySelector('.select-field') as HTMLInputElement).value === 'date') {
        console.log(field)
        this.addDateSearchField();
        this.deleteSearchField(field);
      } else if ((field.querySelector('.select-field') as HTMLInputElement).value === 'date range') {
        this.deleteSearchField(field);
        this.addDateRangeSearchField();
      } else {
        // this.deleteSearchField(field);
        // this.addSearchField();
      }
    });

    field.querySelector(".delete-field")?.addEventListener("click", () => {
      this.deleteSearchField(field);
    });

    field.querySelector(".add-field")?.addEventListener("click", () => {
      this.addSearchField();
    });
  }

  /**
   * get list of year 
   * @param {string} value - select option if value match with item
   * @returns {HTMLOptionElement}
   */
  getYears(value?: string){
    return this.year
      .map(
        (item) =>
          `<option value="${item}" ${value?.trim() === item ? 'selected' : ''}>${item}</option>`
      );
  }
  
  /**
   * get list of month 
   * @param {string} value - select option if value match with item
   * @returns {HTMLOptionElement}
   */
  getMonths(value?: String) {
    return this.months
      .map(
        (item) =>
          `<option value="${item}" ${value?.trim() === item ? 'selected' : ''}>${item}</option>`
      );
  }

  /**
   * get list of Dates 
   * @param {string} value - select option if value match with item
   * @returns {HTMLOptionElement} 
   * 
   */
  getDates(value?: String) {
    console.log(value)
    return this.date
      .map(
        (item) =>
          `<option value="${item}" ${value?.trim() === item ? 'selected' : ''}>${item}</option>`
      );
  }

  /**
   * add new fields
   * @param {string} key - select field value 
   * @param {string} isNegated - select condition field contain/is not contain
   * @param {string} value - input field text
   * @returns {HTMLElement}
   */
  addSearchField(key?: string, isNegated?: string,value?: string): HTMLElement {
    console.log("adding Fields")
    const field = document.createElement("div");
    field.classList.add("search-fields");
    field.innerHTML = `<div>
      <select class="select-field" >
        ${this.addSearchFieldOption(key)}
      </select>
      <select class="select-condition">
        ${this.addSearchFieldCondition(isNegated)}
      </select>
      <input type="text" class="searchValue" value="${value ? value :''}" placeholder="Please enter search query" />
    </div>
    ${this.actionButton}
    `;

    // to add onChange Evnents
    this.searchContainer?.appendChild(field);

    console.log(field)
    this.setEventListeners(field)

    return field;
  }

  /**
   * add date fields
   * @param {string} value - contain year-month-date 
   */
  addDateSearchField(value: String = '') {
    let splitValue = value.split('-');
    let key = 'date';
    const field = document.createElement("div");
    field.classList.add("search-fields");
    field.innerHTML = `<div>
      <select class="select-field" >
        ${this.addSearchFieldOption(key)}
      </select>
      <select class="select-year" id="year" name="year">
        <option value="none">year</option>
        ${this.getYears(splitValue[0])}
      </select>
      <select class="select-month" id="month" name="month">
        <option value="none">month</option>
        ${this.getMonths(splitValue[1])}
      </select>
      <select class="select-date" id="date" name="date">
        <option value="none">date</option>
        ${this.getDates(splitValue[2])}
      </select>
      </div>
      ${this.actionButton}
    `;
    console.log(field)
    this.searchContainer?.appendChild(field);

    // to add onChange Evnents
    this.setEventListeners(field);

    return field;
  }

  /**
   * add date search field with range
   * @param {string} value - contain date range
   * @returns {HTMLElement}
   */
  addDateRangeSearchField(value: String = ''): HTMLElement {
    const [from , to] = value.split('TO');
    let yearFrom, monthFrom, dateFrom = '';
    let yearTo, monthTo, dateTo = '';

    if (from !== '') {
      let DateFrom = from.split('-');
      let DateTo = to.split('-');
      [yearFrom, monthFrom, dateFrom] = [DateFrom[0], DateFrom[1], DateFrom[2]];
      [yearTo, monthTo, dateTo] = [DateTo[0], DateTo[1], DateTo[2]];
    }
    const key = 'date range'
    const field = document.createElement("div");
    field.classList.add("search-fields");
    field.innerHTML = `<div class="range">
      <select class="select-field" >
        ${this.addSearchFieldOption(key)}
      </select>
      <select class="select-year-from" id="yearFrom" name="yearFrom">
        <option value="none">year</option>
        ${this.getYears(yearFrom)}
      </select>
      <select class="select-month-from" id="monthFrom" name="monthFrom">
        <option value="none">month</option>
        ${this.getMonths(monthFrom)}
      </select>
      <select class="select-date-from" id="dateFrom" name="dateFrom">
        <option value="none">date</option>
        ${this.getDates(dateFrom)}
      </select>
      <h3>TO</h3>
      <select class="select-year-to" id="yearTo" name="yearTo">
        <option value="none">year</option>
        ${this.getYears(yearTo)}
      </select>
      <select class="select-month-to" id="monthTos" name="monthTos">
        <option value="none">month</option>
        ${this.getMonths(monthTo)}
      </select>
      <select class="select-date-to" id="dateTo" name="dateTo">
        <option value="none">date</option>
        ${this.getDates(dateTo)}
      </select>
    </div>
      ${this.actionButton}
    `;
    console.log(field)
    this.searchContainer?.appendChild(field);

    // to add  Evnents
    this.setEventListeners(field);

    return field;
  }

  get actionButton(){
    return `<div>
    <button class="add-field">&#43;</button>
    <button class="delete-field">Delete</button>
    </div>`;
  }

  render() {
    // <form action="" id="queryForm" method="get">
    //   <input type="text" name ="query" id="input-search" placeholder="Please enter search query"/>
    //   <button type="submit">Apply</button>
    // </form>
    // <select class="select-field" ><option value="none">Select field</option>
    // ${this.addSearchFieldOption()}
    // </select>
    // <select class="form-select" id="year" name="year">
    //   <option value="none">year</option>
    //   ${this.getYears}
    // </select>
    // <select class="form-select" id="month" name="month">
    //   <option value="none">month</option>
    //   ${this.getMonths}
    // </select>
    // <select class="form-select" id="day" name="day">
    //   <option value="">day</option>
    //   ${this.getDates}
    // </select>
    // ${this.addDateSearchField()} 
    return html`
    <div id="search-field-container">
      <h1>Select fields</h1>
    </div>
    <div class="btn-section">
      <button class="cancel-btn">Cancel</button>
      <button  id="search-btn" @click="${this.formSubmit}">Apply</button>
    </div>
    `;
  }
}

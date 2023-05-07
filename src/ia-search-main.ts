import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import advancedSearchQuery from "advanced-search-query";

@customElement("ia-search-main")
export class IaSearchMain extends LitElement {
  @property({ type: String }) title = "Hey there";

  @property({ type: String }) query = "";

  @property({ type: Array }) parasedQuery = [];

  @property({ type: Object }) parasedQueryToPck = {};


  @property({ type: Array })
  AllKeyValues = []

  @property()
  searchField = ["name", "creator", "title", "description"];

  @property()
  searchOption = [["contains" ,"true"], ["is not contains", "false"]];


  // @query(".add-field") private addFieldButton!: HTMLButtonElement;
  @query('#input-search') private inputSearchField!: HTMLInputElement;
  @query("#search-field-container") private searchContainer!: HTMLElement;
  // private deleteFieldButton!: HTMLElement;

  constructor() {
    super();
    this.parasedQuery = [];
    this.query = '';
    this.AllKeyValues = [];
  }

  firstUpdated() {
    this.getKeyValue()
    // this.inputSearchField.value = this.query;
    // this.addSearchField();
    // this.deleteFieldButton.onclick = this.deleteSearchField;
    // this.addFieldButton.onclick = this.addSearchField;
    // const textArea = this.shadowRoot.getElementById(this.textAreaId);
    // textArea.focus();

  }

  getKeyValue() {
    console.log(this.query);
    var arr = this.query.split(/AND|OR/);
    arr.map((data) => {
      let str = data.split(':');
      let key : String = str[0].trim();
      let isNegated = key[0] === '-' ? 'false' :'true';
      key = key.replace('-', '');
      let value = str[1].trim().slice(1, -1);
      const field = document.createElement("div");
      field.classList.add("search-fields");
      field.innerHTML = `
      <select id="select-field" ><option>Select field</option>
        ${this.addSearchFieldOption(key)}
      </select>
      <select id="select-condition"><option>Select condition</option>
        ${this.addSearchFieldCondition(isNegated)}
      </select>
      <input type="text" value="${value}" placeholder="Please enter search query" />
      <button class="add-field">&#43;</button>
      <button class="delete-field">Delete</button>
    `;

      this.searchContainer?.appendChild(field);

      field.querySelector(".delete-field")?.addEventListener("click", () => {
            this.deleteSearchField(field);
          });
      
          field.querySelector(".add-field")?.addEventListener("click", () => {
            this.addSearchField();
          });
      return `<li>${key} : ${value} ${isNegated}</li>`;


    })
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
      width: 70%;
    }
    #search-btn {
      padding: 10px;
      background: #009cff;
      border: none;
      border-radius: 3px;
      color: #fff;
      margin: 5px;
      float: right;
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
      padding: 5px;
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
   * @param field
   */
  deleteSearchField(field: HTMLElement) {

    var searchString = this.parasedQuery.join(' ').toString();
    this.parasedQueryToPck = advancedSearchQuery(searchString);
    console.log(field)
    let keyword = (field.querySelector('#select-field') as HTMLSelectElement).value;
    let value = (field.querySelector('input') as HTMLInputElement).value;
    let select_condition = (field.querySelector('#select-condition') as HTMLSelectElement).value;

    keyword = (select_condition == 'is not contains') ? '-' + keyword : keyword
    // console.log(`value:- ` + keyword);
    // console.log(`value:- ` + value);
    this.inputSearchField.value = this.parasedQueryToPck.removeKeyword(keyword, value).toString()

    field.remove();
  }

  /**
   * To append options in select Field select box
   * @returns {string}
   */
  addSearchFieldOption(key :String): string {
    var options = "";
    if (key) {
      this.searchField.map(
        (item) => (options += `<option value="${item}" ${key === item ? 'selected' : ''}>${item}</option>`)
      );
    } else {
      this.searchField.map(
        (item) => (options += `<option value="${item}">${item}</option>`)
      );
    }
    return options;
  }

  /**
   * To append options in condition select box
   * @returns {string}
   */
  addSearchFieldCondition(isNegated): string {
    console.log(" condition is " + isNegated)
    var options = "";
    if (isNegated) {
      this.searchOption.map(
        (item ) => (
          options += `<option value="${item[1]}" ${item[1] === isNegated ? 'selected' : ''}>${item[0]}</option>`
          )
      );
    } else {
      this.searchOption.map(
        (item) => (options += `<option value="${item[1]}">${item[0]}</option>`)
      );
    }
    return options;
  }

  setSearchQuery() {
    // this.getKeyValue()

    this.parasedQuery = [];
    var searchContainers = this.searchContainer.querySelectorAll(".search-fields");
    searchContainers.forEach((element) => {
      let select_field = (element.querySelector('#select-field') as HTMLInputElement).value;
      let select_condition = (element.querySelector('#select-condition') as HTMLInputElement).value;
      let select_value = element.querySelector('input')?.value;

      console.log(select_field)
      console.log(select_condition)
      console.log(select_value)

      // if (select_field === "none" || select_condition == "none" || select_value == "") {
      // } else {
      //   const searchQToShow = `${(select_condition == 'is not contains') ? '-' + select_field : select_field}:${select_value}`;
      //   this.parasedQuery.push(searchQToShow);
      //   this.inputSearchField.value = this.parasedQuery.join(' ');
      // }
    });
    // console.log(this.searchQuery);
    var searchString = this.parasedQuery.join(' ').toString();
    // console.log(searchString);
    this.parasedQueryToPck = advancedSearchQuery(searchString);
    // const typ = advancedSearchQuery('to:me -from:joe@mixmax.com foobar1 -foobar2');
    // const typ = advancedSearchQuery('creator:aa -name:ss ');
    // console.log("getTexts")
    // console.log(this.parasedQueryToPck.getTexts());
    // console.log("toObject")
    // console.log(this.parasedQueryToPck.toObject());
    // console.log("getText")
    // console.log(this.parasedQueryToPck.getText());
    // console.log("toString")
    // console.log(this.parasedQueryToPck.toString());
    // console.log("getKeywords")
    // console.log(this.parasedQueryToPck.getKeywords());
    // console.log("removeKeywords")
    // console.log(this.parasedQueryToPck.removeKeyword('creator','aa').toString());

    // console.log(this.parasedQueryToPck.getKeywords());
    // console.log(this.parasedQueryToPck.toString());
    // console.log(this.parasedQueryToPck.toString());
  }

  // addSearchField() {

  //   const field = document.createElement("div");
  //   field.classList.add("search-fields");
  //   field.innerHTML = `
  //     <select id="select-field" ><option>Select field</option>
  //       ${this.addSearchFieldOption()}
  //     </select>
  //     <select id="select-condition"><option>Select condition</option>
  //       ${this.addSearchFieldCondition()}
  //     </select>
  //     <input type="text" placeholder="Please enter search query" />
  //     <button class="add-field">&#43;</button>
  //     <button class="delete-field">Delete</button>
  //   `;

  //   this.searchContainer?.appendChild(field);

  //   field.querySelector(".delete-field")?.addEventListener("click", () => {
  //     this.deleteSearchField(field);
  //   });

  //   field.querySelector(".add-field")?.addEventListener("click", () => {
  //     this.addSearchField();
  //   });
  // }
  addSearchField() {
    const field = document.createElement("div");
    field.classList.add("search-fields");
    field.innerHTML = `
      <select id="select-field" ><option>Select field</option>
        ${this.addSearchFieldOption()}
      </select>
      <select id="select-condition"><option>Select condition</option>
        ${this.addSearchFieldCondition()}
      </select>
      <input type="text" placeholder="Please enter search query" />
      <button class="add-field">&#43;</button>
      <button class="delete-field">Delete</button>
    `;

    this.searchContainer?.appendChild(field);

    field.querySelector(".delete-field")?.addEventListener("click", () => {
      this.deleteSearchField(field);
    });

    field.querySelector(".add-field")?.addEventListener("click", () => {
      this.addSearchField();
    });
  }

  render() {

    // ${  this.AllKeyValues.map((keys,value) => {
    //   console.log(keys);
    //   console.log(value);
    //   <label>
    //   <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
    //   </label>

    //     <select id="select-field"><option value='none'>Select field</option>
    //       ${this.searchField.map((item) => html`<option value="${item}">${item}</option>`)}
    //     </select>
    //     <select id="select-condition"><option value='none' >Select condition</option>
    //     ${this.searchOption.map((item) => html`<option value="${item}">${item}</option>`)}
    //     </select>
    //     <input type="text" placeholder="Please enter search query" />
    //     <button @click=${this.addSearchField} class ="add-field">&#43;</button>
    //     <button class="delete-field">Delete</button>
    //   </div>
    // `;
    // })}
    return html`
    <div id="search-field-container">
        <h1>Select fields</h1>
    </div>
    <div class="btn-section">
      <button class="cancel-btn">Cancel</button>
      <button  id="search-btn" @click="${this.setSearchQuery}">Apply</button>
    </div>

    `;
  }
}

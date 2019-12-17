/*jshint esversion: 6 */
/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
   set Global variables to store the listItem which will be manipulated
   set the number of shown listItems(students) per page
*/
const listItems = document.getElementsByClassName('student-item cf');
const shownStudent = 10;
// store the names for the search function
const listName = document.getElementsByTagName('h3');

// create search bar
const divHeader = document.getElementsByClassName("page-header cf")[0];

const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';

const input = document.createElement('input');
input.setAttribute("placeholder", "Search for students...");

const button = document.createElement('button');
button.textContent = 'Search';
searchDiv.appendChild(input);
searchDiv.appendChild(button);
divHeader.appendChild(searchDiv);



/* search function, looks if the input is in the list Item, removes inital list
 and add a results list
 */
const search = (input, listName) => {
  const parentDiv = document.querySelector('.page');
  const paginationDiv = document.querySelector('.pagination');
  const h2 = document.getElementsByTagName('h2')[0];
  let resultsArray = [];


  for (let i = 0; i < listName.length; i++) {
    listItems[i].style.display = 'none';

    if (input.value.length != 0 && listName[i].textContent.toLowerCase().includes(input.value.toLowerCase())) {
      listItems[i].style.display = '';
      resultsArray.push(listItems[i]);
    }
    // test condition if the search was failed and show no results message on screen
    if (resultsArray.length === 0) {
      h2.textContent = 'no results are found';
    } else {
      h2.textContent = 'students';
    }
  }

  // remove the inital div what was made by the first call of appendPageLinks function
  parentDiv.removeChild(paginationDiv);
  // call the functions to show search results an append links
  showPage(resultsArray, 1);
  appendPageLinks(resultsArray);

};




  //showPage creates list to hide every list item, except 10, depending on the Page link

const showPage = (list, page) => {

  let startIndex = (page * shownStudent) - shownStudent;
  let endIndex = page * shownStudent;

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = '';

    } else {
      list[i].style.display = 'none';

    }
  }
};



/* appendPageLinks takes a list an an argument and adds Page Links to the bottom, also adds an eventListener
 to every link to navigate through the list*/

const appendPageLinks = (list) => {
  const firstDiv = document.getElementsByClassName('page')[0];
  // list_length/shown_Students to calculate the amount of linkButtons, always rounded up to show the rest of the list in the last linkButton
  let buttonNumber = Math.ceil(list.length / shownStudent);
  // create the div and the ul to store the list elements
  const div = document.createElement('div');
  div.className = 'pagination';
  const ul = document.createElement('ul');

  //create the li and the link element, depending on the list length and add it to the ul
  for (let i = 0; i < buttonNumber; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute("href", "#");
    //set the link name, the first is 1 instead of 0 (+1)
    a.textContent = i + 1;
    if (i === 0) {
      a.className = 'active';
    }
    li.appendChild(a);
    ul.appendChild(li);
  }
  div.appendChild(ul);
  //add the new div to parent div
  firstDiv.appendChild(div);

  // add an eventListener to every a element
  let a = document.getElementsByTagName('a');
  for (let i = 0; i < a.length; i++) {

    a[i].addEventListener('click', (event) => {
      let pageNumber = event.target.textContent;
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('active');
      }
      event.target.className = 'active';
      //call showPage function to show the items/page we have selected
      showPage(listItems, pageNumber);
    });
  }
};

// event listener on button to call search function

button.addEventListener('click', (event) => {
  event.preventDefault();
  search(input, listName);
});
// event listener on the searchfield to call search function
input.addEventListener('keyup', () =>{
  search(input, listName);

});


// initiate the program, to see the first 10 List entries and append the Page-Links to listItems
appendPageLinks(listItems);
showPage(listItems, 1);

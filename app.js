import { search } from "./Functions-Folder/Search-Methods/searching.js";
import { divFrameworkThreeLevelsOfTreeCreator, domFrameWorkClassAdder } from "./Functions-Folder/DOM-Manipulation/transactionDOM.js";

const classListArrayTransaction = ['transaction', 'user-initials', 'transaction-information-wrapper', 'reciever-and-payee', 'transaction-description'];
const transactionParent = document.querySelector('#transaction-list');
const searchDOM = document.querySelector('.search-fixed input');

document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    fetchTransactionAndSetUpDOM();
    document.addEventListener('change',(e)=>{
        e.preventDefault();
        search(transactionParent,e.target.value);
    })
});


//recieves name as an argument and returns initials
function getInitials(payorName) {
    //now make this string into an array
    const arrPayorName = payorName.split(" ");
    //make empty array to put in first letter of first and last name
    let arrayOfLetters = [];
    arrPayorName.forEach((word) => {
        arrayOfLetters.push(word.charAt(0));
    })
    const initials = arrayOfLetters.join("");
    return initials;
}

//this function is specifically designed for transaction DOM 
//the 3 args are proeprties of the transaction response.
function setUpTransactionDOM(payor, recipient, description) {
    let nodeFramework = divFrameworkThreeLevelsOfTreeCreator(2, 0, 2);
    let domWithClass = domFrameWorkClassAdder(nodeFramework, classListArrayTransaction);

    let h3initials = document.createElement('h3');
    let h3Parent = domWithClass.querySelector('.user-initials');
    h3initials.textContent = getInitials(payor);
    h3Parent.appendChild(h3initials);

    let thisPersonPaidWho = document.createElement('h4');
    let thisPersonPaidWhoParent = domWithClass.querySelector('.reciever-and-payee');
    thisPersonPaidWho.textContent = `${payor} Paid ${recipient}`;
    thisPersonPaidWhoParent.appendChild(thisPersonPaidWho);

    let descriptionOfTransaction = document.createElement('h4');
    let descriptionParent = domWithClass.querySelector('.transaction-description');
    descriptionOfTransaction.textContent = description;
    descriptionParent.appendChild(descriptionOfTransaction);

    //sets atribute here...
    domWithClass.setAttribute("payor",payor);
    domWithClass.setAttribute("recipient",recipient);

    transactionParent.appendChild(domWithClass);
    return domWithClass;
}

function fetchTransactionAndSetUpDOM(){
    const baseURL = 'http://localhost:3000/transactions';
    const result = fetch(baseURL)
    .then(response => response.json())
    .then((data) => {
        data.forEach((element) => {
            const {payor,recipient,description} = element;
            setUpTransactionDOM(payor,recipient,description);
        })
    })
    .catch((error) => {
        console.log(error);
    });

    return result;
}







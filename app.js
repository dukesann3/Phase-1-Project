import { search } from "./Functions-Folder/Search-Methods/searching.js";
import { divFrameworkThreeLevelsOfTreeCreator, domFrameWorkClassAdder } from "./Functions-Folder/DOM-Manipulation/transactionDOM.js";
import { postSubmitalInformation } from "./Functions-Folder/Fetching/transactionFetch.js";
import { addOptionsFromFetchedValue } from "./Functions-Folder/Fetching/manipulatingFetchedData.js";
import { changeAddUserBalance, fetchSpecificUserNameBalance, getInitials } from "./Functions-Folder/Fetching/manipulatingFetchedData.js";

/*------------ DOM selectors --------------------------------------------------------------------------------------------*/

const classListArrayTransaction = ['transaction', 'user-initials', 'transaction-information-wrapper', 'reciever-and-payee', 'transaction-description'];
const transactionParent = document.querySelector('#transaction-list');
const searchDOM = document.querySelector('#search-fixed input');
const payDOM = document.querySelector('#search-fixed button');
const popUpDOM = document.querySelector('.pay-form');
const everythingExceptForm = document.querySelectorAll('div:not(.pop-up-indicator)');
const exitFormDOM = document.querySelector('.pop-up-indicator h5');
const optionsDOM = document.querySelector('.reciever-name');
const paymentAmountDOM = popUpDOM.querySelector('input[type=text]');
const textAreaDOM = popUpDOM.querySelector('textarea');
const formSubmitalDOM = popUpDOM.querySelector('input[type=submit]');
const userBalanceView = document.querySelector('.user-balance-info');
const userInitialDOMBalanceView = document.querySelector('.user-initials');
const userBalanceExitSign = userBalanceView.querySelector('h6');
const userBalanceText = userBalanceView.querySelector('span');
const addFundsButton = document.querySelector('#search-fixed button:last-of-type');
const addFundsDOM = document.querySelector('.add-funds-form');
const addFundsExit = addFundsDOM.querySelector('.pop-up-indicator h5');
const addFundsSubmital = addFundsDOM.querySelector('input[type=submit]');
const addFundsAmount = addFundsDOM.querySelector('input[type=text]');

/*---------------Event Listeners---------------------------------------------------------------------------------------------*/

//triggers when DOM first loads
document.addEventListener('DOMContentLoaded', async function (e) {
    e.preventDefault();
    //fetches transactions from database and parses them into DOM
    fetchTransactionAndSetUpDOM();

    //filters transaction list per user input in search field
    searchDOM.addEventListener('input', (e) => {
        e.preventDefault();
        search(transactionParent, e.target.value);
    });

    //when pay button is clicked, popup DOM will appear and blurs out everything except for itself
    payDOM.addEventListener('click', (e) => {
        e.preventDefault();
        popUpDOM.classList.remove('hide');
        popUpDOM.setAttribute('id', 'pop-up');
        everythingExceptForm.forEach((element) => {
            //blurs everything except for form initials div
            if (element.classList.contains('initials') || element.hasAttribute('isDropDownMenu')) {
                return;
            }
            element.style = "filter: blur(10px);";
        });
    });

    //when exit button is clicked, it exits out of pay form
    exitFormDOM.addEventListener('click', () => { hidePopUp() });

    //when funds button is clicked, a popup DOM will appear and blurs everything except for itself
    addFundsButton.addEventListener('click', (e) => {
        e.preventDefault();
        addFundsDOM.classList.remove('hide');
        addFundsDOM.setAttribute('id', 'pop-up');
        everythingExceptForm.forEach((element) => {
            //blurs everything except for form initials div
            if (element.classList.contains('initials') || element.hasAttribute('isDropDownMenu')) {
                return;
            }
            element.style = "filter: blur(10px);";
        });
    });

    //when exit button is clicked, it exits out of funds form
    addFundsExit.addEventListener('click', () => { addFundsHidePopUp() });

    //Inside of pay form, it will have options for recievers for your money.
    //Fetches the user's friends from the database and puts names as options in <select> field
    optionsDOM.addEventListener('click', addOptionsFromFetchedValue(optionsDOM, 'User', 'Name'));

    //Inside of pay form, it will have a payment field. This code makes sure that the amount
    //is not 0 or NaN.
    paymentAmountDOM.addEventListener('click', function (e) {
        e.target.addEventListener('input', function (e) {
            if (e.target.value && isNaN(e.target.value)) {
                alert('need a number for payment amount');
                //deletes NaN value from input area
                e.target.value = '';
            }
        })
    });

    //Inside of pay form, it will have a description text area. It makes sure that the description
    //is not blank
    textAreaDOM.addEventListener('blur', function (e) {
        if (!e.target.value) {
            alert('need a description for payment');
        }
    });

    //This is for payment form submital. If form is filled out completely, it will post this transaction information
    //onto the json-server transaction database. And it will also give a PATCH request to update the user's balance from
    //json-server's users database.
    formSubmitalDOM.addEventListener('click', async function (e) {
        e.preventDefault();
        if (isFormIsGoodToSubmit(optionsDOM.value, paymentAmountDOM.value, textAreaDOM.value)) {
            let postedData = await postSubmitalInformation('User Name', optionsDOM.value, parseInt(paymentAmountDOM.value, 10), textAreaDOM.value);
            if (postedData) {
                const { payor, recipient, description } = postedData;
                setUpTransactionDOM(payor, recipient, description);
                await changeAddUserBalance('User', 'Name', parseInt(paymentAmountDOM.value, 10), (a, b) => { return a - b; });
                let recArr = recipient.split(" ");
                await changeAddUserBalance(recArr[0], recArr[1], parseInt(paymentAmountDOM.value, 10), (a, b) => { return a + b; });
                paymentAmountDOM.value = '';
                textAreaDOM.value = '';
                alert('Transaction Successful');
                hidePopUp();
            }
        }
        else {
            alert('Need to Fill Out Entire Form');
        }
    });

    //This is for funds submital. If the payment amount is not NaN or not a 0, it will go ahead and
    //do a PATCH request to update the user's balance from json-server's users database
    addFundsSubmital.addEventListener('click', async function (e) {
        e.preventDefault();
        if (!addFundsAmount.value) {
            alert('Need to Fill Out Form Properly');
            return;
        }
        await changeAddUserBalance('User', 'Name', parseInt(addFundsAmount.value, 10), (a, b) => { return a + b });
        addFundsAmount.value = '';
        alert('Added Funds Successfully');
        addFundsHidePopUp();
    });

    addFundsDOM.addEventListener('click', function (e) {
        e.target.addEventListener('input', function (e) {
            if (e.target.value && isNaN(e.target.value)) {
                e.target.value = '';
                alert('need a number for payment amount');
                //deletes NaN value from input area
            }
        })
    });

    //When the initals 'circle' on the top right of the screen is hovered, it will trigger a mini popup
    //that will reveal the user's name and the user's balance. The user's balance is fetched through a 
    //GET request from json-server's users database.
    userInitialDOMBalanceView.addEventListener('mouseover', async function (e) {
        e.preventDefault();
        userBalanceView.classList.remove('hide');
        userBalanceText.textContent = `User Balance: $${await fetchSpecificUserNameBalance('User Name')}`;
        userBalanceExitSign.addEventListener('click', function (e) {
            e.preventDefault();
            userBalanceView.classList.add('hide');
        });
    });
});

/*---------------Support Functions---------------------------------------------------------------------------------------------*/



//this function is specifically designed for transaction DOM 
//the 3 args are proeprties of the transaction response.
//This function will create each individual transaction element on HTML and CSS.
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
    domWithClass.setAttribute("payor", payor);
    domWithClass.setAttribute("recipient", recipient);

    transactionParent.appendChild(domWithClass);
    return domWithClass;
}

//This function will fetch all transactions from json-server's transaction database,
//and it will perform setUpTransactionDOM for each individual transactions and puts them
//into the DOM.
function fetchTransactionAndSetUpDOM() {
    const baseURL = 'http://localhost:3000/transactions';
    const result = fetch(baseURL)
        .then(response => response.json())
        .then((data) => {
            data.forEach((element) => {
                const { payor, recipient, description } = element;
                setUpTransactionDOM(payor, recipient, description);
            })
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
}

//This returns if the payment submital form is good to complete and everything is filled out
function isFormIsGoodToSubmit(recipientInfo, paymentAmount, description) {
    if (recipientInfo && paymentAmount && description) {
        return true;
    }
    return false;
}

//This hides or exits out of the pop-up for the payment screen.
function hidePopUp() {
    popUpDOM.classList.add('hide');
    popUpDOM.removeAttribute('id');
    everythingExceptForm.forEach((element) => {
        element.style = "filter: none;";
    });
}

//This hides or exits out of the pop-up for the add funds screen.
function addFundsHidePopUp() {
    addFundsDOM.classList.add('hide');
    addFundsDOM.removeAttribute('id');
    everythingExceptForm.forEach((element) => {
        element.style = "filter: none;";
    });
}
























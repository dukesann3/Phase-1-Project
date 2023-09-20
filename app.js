import { search } from "./Functions-Folder/Search-Methods/searching.js";
import { divFrameworkThreeLevelsOfTreeCreator, domFrameWorkClassAdder } from "./Functions-Folder/DOM-Manipulation/transactionDOM.js";
import { postSubmitalInformation } from "./Functions-Folder/Fetching/transactionFetch.js";
import { addOptionsFromFetchedValue } from "./Functions-Folder/Fetching/manipulatingFetchedData.js";
import { changeAddUserBalance, fetchSpecificUserNameBalance, getInitials } from "./Functions-Folder/Fetching/manipulatingFetchedData.js";

const classListArrayTransaction = ['transaction', 'user-initials', 'transaction-information-wrapper', 'reciever-and-payee', 'transaction-description'];
const transactionParent = document.querySelector('#transaction-list');
const searchDOM = document.querySelector('#search-fixed input');
const payDOM = document.querySelector('#search-fixed button');
const popUpDOM = document.querySelector('.pop-up-indicator');
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

document.addEventListener('DOMContentLoaded', async function (e) {
    e.preventDefault();
    fetchTransactionAndSetUpDOM();
    //subject to change... Cannot get it to update 'change'
    searchDOM.addEventListener('input', (e) => {
        e.preventDefault();
        search(transactionParent, e.target.value);
    });
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
    exitFormDOM.addEventListener('click', () => { hidePopUp() });
    optionsDOM.addEventListener('click', addOptionsFromFetchedValue(optionsDOM, 'User', 'Name'));
    paymentAmountDOM.addEventListener('click', function (e) {
        e.target.addEventListener('input', function (e) {
            if (e.target.value && isNaN(e.target.value)) {
                alert('need a number for payment amount');
                //deletes NaN value from input area
                e.target.value = '';
            }
        })
    });
    textAreaDOM.addEventListener('blur', function (e) {
        if (!e.target.value) {
            alert('need a description for payment');
        }
    });
    formSubmitalDOM.addEventListener('click', async function (e) {
        e.preventDefault();
        if (isFormIsGoodToSubmit(optionsDOM.value, paymentAmountDOM.value, textAreaDOM.value)) {
            let postedData = await postSubmitalInformation('User Name', optionsDOM.value, parseInt(paymentAmountDOM.value, 10), textAreaDOM.value);
            if (postedData) {
                const { payor, recipient, description } = postedData;
                setUpTransactionDOM(payor, recipient, description);
                await changeAddUserBalance('User', 'Name', parseInt(paymentAmountDOM.value, 10), (a, b) => { return a - b; });
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
    domWithClass.setAttribute("payor", payor);
    domWithClass.setAttribute("recipient", recipient);

    transactionParent.appendChild(domWithClass);
    return domWithClass;
}

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

function isFormIsGoodToSubmit(recipientInfo, paymentAmount, description) {
    if (recipientInfo && paymentAmount && description) {
        return true;
    }
    return false;
}

function hidePopUp() {
    popUpDOM.classList.add('hide');
    popUpDOM.removeAttribute('id');
    everythingExceptForm.forEach((element) => {
        element.style = "filter: none;";
    });
}
























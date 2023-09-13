import { getTransaction } from "/Functions-Folder/Fetching/transactionFetch.js";
import { divFrameworkThreeLevelsOfTreeCreator,domFrameWorkClassAdder} from "./Functions-Folder/DOM-Manipulation/transactionDOM.js";

const classListArrayTransaction = ['transaction','user-initials','transaction-information-wrapper','reciever-and-payee','transaction-description'];
const transactionParent = document.querySelector('#transaction-list');

document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    let nodeFramework = divFrameworkThreeLevelsOfTreeCreator(2,0,2);
    let domWithClass = domFrameWorkClassAdder(nodeFramework,classListArrayTransaction);
    transactionParent.appendChild(domWithClass);
    const testTrans = {
        payor: 'Anna Nakamura'
    };
    getInitials(testTrans);
    getTransaction();
});


//assuming transactionData is one data set within the array
//works!
//put one object per getInitials
function getInitials(transactionData){
    const payorName = transactionData.payor;
    //now make this string into an array
    const arrPayorName = payorName.split(" ");
    //make empty array to put in first letter of first and last name
    let arrayOfLetters = [];
    arrPayorName.forEach((word) => {
        arrayOfLetters.push(word.charAt(0));
    })
    const initials = arrayOfLetters.join("");
    console.log(initials);
    return initials;
}





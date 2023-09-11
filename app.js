import { getTransaction } from "/Functions-Folder/Fetching/transactionFetch.js";
import { divFrameworkThreeLevelsOfTreeCreator, divFrameWorkMaker, domFrameWorkClassAdder, iter } from "./Functions-Folder/DOM-Manipulation/transactionDOM.js";

const classListArrayTransaction = ['transaction','user-initials','transaction-information-wrapper','reciever-and-payee','transaction-description'];
const transactionParent = document.querySelector('#transaction-list');

document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    let nodeFramework = divFrameworkThreeLevelsOfTreeCreator(2,1,2);
    let domWithClass = domFrameWorkClassAdder(nodeFramework,classListArrayTransaction);
    transactionParent.appendChild(domWithClass);
    getTransaction();
});

/*
tester functions:
    const nodeList = divFrameWorkChildAdder(3)
    nodeList.childNodes[0].classList.add('bruh');
    console.log(nodeList);
*/
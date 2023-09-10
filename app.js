import { getTransaction } from "/Functions-Folder/Fetching/transactionFetch.js";
import { divFrameworkThreeLevelsOfTreeCreator, divFrameWorkMaker, domFrameWorkClassAdder } from "./Functions-Folder/DOM-Manipulation/transactionDOM.js";

document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    console.log(divFrameworkThreeLevelsOfTreeCreator(2,3,5));
    divFrameWorkMaker();
    domFrameWorkClassAdder(divFrameworkThreeLevelsOfTreeCreator(2,3,5),[1,2]);
    getTransaction();
});

/*
tester functions:
    const nodeList = divFrameWorkChildAdder(3)
    nodeList.childNodes[0].classList.add('bruh');
    console.log(nodeList);
*/
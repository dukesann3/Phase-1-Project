import { getTransaction } from "/Functions-Folder/Fetching/transactionFetch.js";
import { divFrameworkThreeLevelsOfTreeCreator, divFrameWorkMaker, domFrameWorkClassAdder, iter } from "./Functions-Folder/DOM-Manipulation/transactionDOM.js";

document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    console.log(divFrameworkThreeLevelsOfTreeCreator(2,3,5));
    divFrameWorkMaker();
    const newdom = divFrameworkThreeLevelsOfTreeCreator(2,3,5);
    domFrameWorkClassAdder(newdom,[1,2]);
    console.log(iter(newdom));
    getTransaction();
});

/*
tester functions:
    const nodeList = divFrameWorkChildAdder(3)
    nodeList.childNodes[0].classList.add('bruh');
    console.log(nodeList);
*/
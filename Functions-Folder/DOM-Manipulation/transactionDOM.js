//returns all div html for transaction DOM from fetched data
/*
what it returns:
GRAND PARENT -
            |
            |----> PARENT 1 - 
            |               |
            |               |----> CHILD 1
            |
            |----> PARENT 2 -
                            |
                            |----> CHILD 2
                            |----> CHILD 3    
*/

//creates a number of divs nested in each other
export function divFrameWorkMaker(quantityOfChildren,parentDOM=undefined) {
    if(!parentDOM){
        parentDOM = document.createElement('div');
    }
    for (let i = 0; i < quantityOfChildren; i++) {
        let child = document.createElement('div');
        parentDOM.appendChild(child);
    }
    return parentDOM;
}

//able to add quantity of parent and number of children for corresponding parent. Quantity of children must be in order
export function divFrameworkThreeLevelsOfTreeCreator(quantityOfParent, ...quantityOfChildN) {
    let origin;
    origin = divFrameWorkMaker(quantityOfParent);
    for (let i=0; i<quantityOfParent; i++) {
        divFrameWorkMaker(quantityOfChildN[i],origin.children[i]);    
    }
    return origin;
}

//Note that the returning array does not contain the parent element. Or does it?
export function iter(itemToFlatten,flattenedArr=[]){
    //if domelement.children exists, then go ahead and loop through it
    if(itemToFlatten.children){
        //loops through domelement.children
        for(const childNodes of itemToFlatten.children){
            flattenedArr.push(childNodes);
            //goes through another iter, but retains the memory of the past iteration by inputting flattenedArr
            iter(childNodes,flattenedArr);
        }
    }
    return flattenedArr;
}

//adds classes for each div included. Must be in order
export function domFrameWorkClassAdder(domElement, classArray){
    console.log(domElement);
    if(!domElement || !classArray || domElement.children.length !== classArray.length){
        console.log('Need both values AND have same amount of DOM elements as class array');
        return;
    }
    let domElementArr = [];
    for(const childNodes of domElement.children){
        domElementArr.push(childNodes);
    }
    console.log(domElementArr);
}


export function returnsTransactionDOMFramework() {
    let transaction, userInitials, transactionInformationWrapper, recieverAndPayee, transactionDescription;

    transaction = createAndAddClass('div', 'transaction');
    userInitials = createAndAddClass('div', 'user-initials');
    transaction.appendChild(userInitials);
    transactionInformationWrapper = createAndAddClass('div', 'transaction-information-wrapper');
    transaction.appendChild(transactionInformationWrapper);
    recieverAndPayee = createAndAddClass('div', 'reciever-and-payee');
    transactionInformationWrapper.appendChild(recieverAndPayee);
    transactionDescription = createAndAddClass('div', 'transaction-description');
    transactionInformationWrapper.appendChild(transactionDescription);

    const returnObject = {
        transaction: transaction,
        userInitials: userInitials,
        transactionInformationWrapper: transactionInformationWrapper,
        recieverAndPayee: recieverAndPayee,
        transactionDescription: transactionDescription
    }
    return returnObject;
}




//adds both DOM, class, and style
function createAndAddClass(domType, className) {
    let newDom;
    newDom = document.createElement(domType);
    newDom.classList.add(className);
    return newDom;
}


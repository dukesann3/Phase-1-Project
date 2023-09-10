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
//adds classes for each div included. Must be in order
export function domFrameWorkClassAdder(DOMelement, classArray){
    if(!DOMelement || !classArray || DOMelement.children.length !== classArray.length){
        console.log('Need both values AND have same amount of DOM elements as class array');
        return;
    }
    for(let i=0; i<classArray.length; i++){
        console.log(DOMelement.children[i]);
    }
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


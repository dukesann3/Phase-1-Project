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

//creates a div with one parent and takes the quantity of children as an argument
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

//makes new DOM with one single parent (enclosing) gets quantity of children out of the "origin" parent.
//The children can also have children. The second argument calls for the quantity of children from its parents.
//e.g. divFrameworkThreeLevelsOfTreeCreator(2,6,9)...
//the example above will mean it will have one "grand" parent, 2 parents, and [6 children for first parent, 9 children for second parent].
export function divFrameworkThreeLevelsOfTreeCreator(quantityOfParent, ...quantityOfChildN) {
    let origin;
    origin = divFrameWorkMaker(quantityOfParent);
    for (let i=0; i<quantityOfParent; i++) {
        divFrameWorkMaker(quantityOfChildN[i],origin.children[i]);    
    }
    return origin;
}

//this will iterate through a node element (not a node list).
//e.g. <div> <div> <div></div> </div> </div>
//it will return all divs inside of the enclosing div in an array.
//the caveat is that it does not return the parent (enclosing).
/*
    What is happening in the function is... 
    If children exists in a node element, it will loop through all the children and pushes them in an array called flattenedArr.
    flattenedArr is undefined as first usually. It will populate as it goes.
    As it is looping through the children arr, it pushes in flattenedArr
    It will then call itself back again to see if there is anything inside of the DOM child as well.
    It essentially goes through another loop until it DOM child has no more DOM child of its own.
    Then, it will loop again back to its original level if DOM child has no more DOm child of its own.
    And note that iter in the loop contains flattenedArr as a second argument. This will keep the memory of its iterations so 
    the memory of the array does not go away.
*/
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

//takes a DOM element as an argument and array of class names.
//uses iter to flatten the node element and use unshift and get the 'origin' parent node and place it in the beginning of the array.
//it will iterate through the array of nodes and it will add class names in the order of the array indexes.
export function domFrameWorkClassAdder(domElement, classArray){
    if(!domElement || !classArray){
        console.log('Need both values AND have same amount of DOM elements as class array');
        return;
    }
    let i = 0;
    let domArray = iter(domElement);
    //adds parent node at the beginning of the array
    domArray.unshift(domElement.childNodes[0].parentElement);
    for(const element of domArray){
        element.classList.add(classArray[i]);
        i++;
    }
    return domElement;
}

















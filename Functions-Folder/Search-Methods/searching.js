
/*
    list looks like this:
    transaction-list DOM ---> transaction1, transaction2,...
*/

//parses through list
export function search(domList,keyword){
    //I want to make sure that the search results are ordered
    //need to flatten node element
    let newArr = Array.from(domList.children);
    let trimmedKeyword = keyword.replaceAll(' ','');
    let lowercasedTrimmedKeyword = trimmedKeyword.toLowerCase();

    let results = newArr.filter((node) => {
        //concat payor and reciever name together no spaces
        let payorAndReciever = node.getAttribute("payor") + node.getAttribute("recipient");
        //make lowercase payor and reciever name as well as input.
        let trimmedString = payorAndReciever.toLowerCase().replaceAll(' ','');
        let isInsideArr = trimmedString.includes(lowercasedTrimmedKeyword);
        if(isInsideArr){
            //couldn't use class list because transaction class took precedence over the hide class.
            node.removeAttribute('style');
        }
        else if(!isInsideArr && keyword.length!==0){
            //removes style in html if not included in array
            node.style.display = 'none';
        }

        return isInsideArr;
    });
    return results;
}
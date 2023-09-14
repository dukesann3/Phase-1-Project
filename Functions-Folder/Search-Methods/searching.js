
/*
    list looks like this:
    transaction-list DOM ---> transaction1, transaction2,...
*/

//parses through list
export function search(domList,keyword){
    //I want to make sure that the search results are ordered per date.
    //need to flatten node element
    let newArr = Array.from(domList.children);
    let trimmedKeyword = keyword.replaceAll(' ','');
    let lowercasedTrimmedKeyword = trimmedKeyword.toLowerCase();
    console.log(lowercasedTrimmedKeyword);

    let results = newArr.filter((node) => {
        //concat payor and reciever name together no spaces
        console.log(node);
        let payorAndReciever = node.getAttribute("payor") + node.getAttribute("recipient");
        //make lowercase payor and reciever name as well as input.
        let trimmedString = payorAndReciever.toLowerCase().replaceAll(' ','');
        console.log(trimmedString);
        let isInsideArr = trimmedString.includes(trimmedKeyword);
        return isInsideArr;
    });

    console.log(results);
    return results;
}
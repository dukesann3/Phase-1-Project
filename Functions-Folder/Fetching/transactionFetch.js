
//ended up not using this
export function getTransaction(){
    const baseURL = 'http://localhost:3000/transactions';
    const transactions = fetch(baseURL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.log(error);
        alert('can\'t connect');
    })

    return transactions;
}

//ended up not using this either
//abstracted getTransactionData
export function getTransactionData(callback){
    const baseURL = 'http://localhost:3000/transactions';
    const result = fetch(baseURL)
    .then(response => response.json())
    .then(data => callback(data))
    .catch((error) => {
        console.log(error);
    });

    return result;
}


//trying to loop thru fetched data until I find a certain object or array.
/*
    "transactions": [
        {
            "id": 1,
            "payor": "Jessica Johnson",
            "payor-id": "jfqO52Je2B2AWdJjCnjw",
            "recipient": "Houston McMaster",
            "recipient-id": "N8GTpnfYF6rNucC1y8XW",
            "pay-amount": 230,
            "description": "Nice dinner and wine"
        },...
*/
//this is assuming I am in each element in a fetched array.
//and finding the correct property-key values
/*
export function loopingThruFetchedData(data,property){
    if(!Array.isArray(data) && typeof data === 'object'){
        for(let element in data){
            if(element === property){
                return data[property];
            }
        }
    }

    console.log('Cannot find property value');
    return `cannot find property in object`;
}
*/





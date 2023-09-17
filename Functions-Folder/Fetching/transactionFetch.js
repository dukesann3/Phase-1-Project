
//ended up not using this
export function getTransaction() {
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
export function getTransactionData(callback) {
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

export async function transactionRecieverName() {
    return fetch('http://localhost:3000/users')
        .then((response) => {
            return response.json();
        })
}

/*
POST REQUEST EXAMPLE

fetch("https://jsonplaceholder.typicode.com/todos", {
  method: "POST",
  body: JSON.stringify({
    userId: 1,
    title: "Fix my bugs",
    completed: false
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});

*/

/*
    What is included in json-server trasnaction list?

        "payor": "Jessica Johnson",
        "recipient": "Houston McMaster",
        "pay_amount": 230,
        "description": "Nice dinner and wine"
*/

export async function postSubmitalInformation(payor,recipient,pay_amount,description) {
    const body = {
        payor: payor,
        recipient: recipient,
        pay_amount: pay_amount,
        description: description
    }

    return fetch('http://localhost:3000/transactions', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        return response.json();
    })


}





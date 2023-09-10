
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

//abstracted getTransactionData
export function getTransactionData(transactionOrUsers, callback){
    const baseURL = 'http://localhost:3000/transactions';
    const fullURL = baseURL + '/' + transactionOrUsers;
    const result = fetch(fullURL)
    .then(response => response.json())
    .then(data => callback(data))
    .catch((error) => {
        console.log(error);
    });

    return result;
}



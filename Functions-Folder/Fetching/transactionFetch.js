//imports users using fetch function
export async function getUsers() {
    return fetch('http://localhost:3000/users')
        .then((response) => {
            return response.json();
        })
}

//imports transactions using fetch function
export async function getTransactions(){
    return fetch('http://localhost:3000/transactions')
    .then((response) => {
        return response.json();
    })
}

//posts transaction information
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

//manipulates user balance when paying from paying form
export async function patchUserInfo(originalPrice,addPrice,userid,callback){
    //can be either subtraction or addition
    const newPrice = callback(originalPrice,addPrice);
    let requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_balance: newPrice
        })
    };
    return fetch(`http://localhost:3000/users/${userid}`,requestOptions)
    .then((response) => {
        return response.json();
    });
}





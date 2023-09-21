import { patchUserInfo, getUsers } from "./transactionFetch.js";
import { addOptionsValue } from "../DOM-Manipulation/optionsAddingUser.js";

//manipulates user balance from payment submital form
export async function changeAddUserBalance(firstName, lastName, addValue, callback) {
    let putValue;
    let userInfo = await getUsers();
    let selectedUser = userInfo.find((element) => {
        if (element.first_name === firstName && element.last_name === lastName) {
            return true;
        }
    })
    console.log(selectedUser);
    if (!selectedUser) {
        alert('user does not exist');
        return;
    }
    const { user_balance, id } = selectedUser;
    putValue = await patchUserInfo(parseInt(user_balance, 10), addValue, id, callback);
    console.log(putValue);
    return putValue;
}

export async function fetchSpecificUserNameBalance(username) {
    let users = await getUsers();
    const returnObj = users.find((user) => {
        let { first_name, last_name } = user;
        let combinedName = first_name + ' ' + last_name;
        if (username === combinedName) {
            return true;
        }
    });
    if (returnObj) {
        const { user_balance } = returnObj;
        console.log(user_balance);
        return user_balance;
    }
    else {
        console.log('This user is not registered in the database');
        return;
    }
}

//recieves name as an argument and returns initials
export function getInitials(payorName) {
    //now make this string into an array
    const arrPayorName = payorName.split(" ");
    //make empty array to put in first letter of first and last name
    let arrayOfLetters = [];
    arrPayorName.forEach((word) => {
        arrayOfLetters.push(word.charAt(0));
    })
    const initials = arrayOfLetters.join("");
    return initials;
}

//adds user to options in payment form.
export async function addOptionsFromFetchedValue(parentDOM, firstNameOmit, lastNameOmit) {
    let result = await getUsers();
    let potentialRecieverNamesArr = [];
    result.forEach((object) => {
        let { first_name, last_name } = object;
        if (first_name === firstNameOmit && last_name === lastNameOmit) {
            //skips omitted users
            //in other words this is used to not display the actual user's name
            return;
        }
        let displayName = first_name + ' ' + last_name;
        potentialRecieverNamesArr.push(displayName);
    })
    addOptionsValue(parentDOM, potentialRecieverNamesArr);
    console.log(potentialRecieverNamesArr);
    return potentialRecieverNamesArr;
}
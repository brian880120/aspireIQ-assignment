import { v4 as uuidv4 } from 'uuid';
import emails from '../data/emails.json';

// function to generate email list from json file
const generateEmailList = () => {
    return emails.map(item => {
        return {
            id: uuidv4(),
            value: item,
        };
    });
};

const emailList = generateEmailList();

// mock API for autocomplete dropdown
// get all emails which start with users input
const searchEmail = (prefix) => {
    const result = prefix ?
        emailList.filter(email => {
            return email.value.startsWith(prefix);
        }) : [];

    return new Promise((resolve) => {
        resolve({ result });
    });
};

/*
Mock API to find an email which fully match users input.
If a user don't choose any suggestion from autocomplete dropdown,
we use this function to check whether users input is valid
*/
const findFullMatchEmailByValue = (email) => {
    const result = emailList.find(item => {
        return item.value === email;
    });

    return new Promise(resolve => {
        resolve(result);
    });
};

export {
    searchEmail,
    findFullMatchEmailByValue,
};

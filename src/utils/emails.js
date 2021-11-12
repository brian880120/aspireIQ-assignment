import { v4 as uuidv4 } from 'uuid';
import emails from '../data/emails.json';

const generateEmailList = () => {
    return emails.map(item => {
        return {
            id: uuidv4(),
            value: item,
        };
    });
};

const emailList = generateEmailList();

const searchEmail = (prefix) => {
    const result = prefix ?
        emailList.filter(email => {
            return email.value.startsWith(prefix);
        }) : [];

    return new Promise((resolve) => {
        resolve({ result });
    });
};

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

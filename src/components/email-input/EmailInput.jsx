import React, { useCallback, useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from '../../utils/debounce';
import { findFullMatchEmailByValue, searchEmail } from '../../utils/emails';
import TypeaheadResult from '../typeahead/typeahead-result/TypeaheadResult';
import EmailTagList from './email-tag-list/EmailTagList';
import './EmailInput.css';

const EmailInput = () => {
    /*
        All state variables
        emailTags: array to hold all emails tag that selected by users
        inputValue: string to hold current value in the input field
        typeaheadResults: array to hold all suggested email addresses by calling MOCK API
        focusIdx: to support arrow up and arrow down key when typeahead dropdown is available,
                  we use focusIdx to save current focused index typeahead item
    */
    const [emailTags, setEmailTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [typeaheadResults, setTypeaheadResults] = useState([]);
    const [focusIdx, setFocusIdx] = useState(-1);

    // a ref bind to input field to support input focus
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    /*
        function to handle user add item to emailTags.
        this function will be triggered by:
            1. user click on typeahead item
            2. user press enter or tab key
        input value and typeahead result will be clear after an item added to tag list,
        and input field will be focused
    */
    const addToEmailTags = useCallback((item) => {
        setEmailTags((currentEmails) => {
            // check if users try to add duplicate email to the list
            const isDuplicateItem = currentEmails.findIndex(email => email.id === item.id) !== -1;
            return isDuplicateItem ?
                currentEmails :
                currentEmails.concat(item);
        });
        setInputValue(() => {
            return '';
        });
        setTypeaheadResults(() => {
            return [];
        });
        inputRef.current.focus();
    }, []);

    /*
        function to handle delete item from email tag list
        NOTE:
            1. Same to addToEmailTags, useCallback is required here,
               because we pass this function to children component.
               Without useCallback, React.memo that apply to children component will be useless,
               because this function will have new reference on every render
            2. use functional updater to update state, this helps to remove unnecessary dependencies for useCallback
    */
    const deleteFromEmailTags = useCallback((id) => {
        setEmailTags((currentValue) => {
            return currentValue.filter(item => {
                return item.id !== id;
            });
        });
    }, []);

    // function to handle user input. applied a debounce function here
    // to avoid MOCK API request on every key stroke
    const onInputChange = (e) => {
        setFocusIdx(-1);
        setInputValue(e.target.value);

        debounce(() => {
            const inputValue = e.target.value;
            searchEmail(inputValue).then(res => {
                const result = res.result;
                setTypeaheadResults(result);
            });
        }, 500)();
    };

    /*
        function bind to input keyDown
        38 -> key arrow up
        40 -> key arrow down
        13 -> key enter
        9  -> key tab
    */
    const onInputKeyDown = (e) => {
        switch (e.keyCode) {
            case 38:
                e.preventDefault();
                setFocusIdx((v) => {
                    return v === 0 ? typeaheadResults.length - 1 : v - 1;
                });
                break;
            case 40:
                e.preventDefault();
                setFocusIdx((v) => {
                   return v === typeaheadResults.length - 1 ? 0 : v + 1;
                });
                break;
            case 13:
            case 9:
                e.preventDefault();
                // empty user input check
                if (!e.target.value) {
                    return;
                }

                // if focus index is not -1, means user start to use arrow up or arrow down key to choose
                // an item from autocomplete list. Press 'enter' or 'tab' in this case means we are safe
                // to add this item to email tag list
                if (focusIdx !== -1) {
                    addToEmailTags({
                        ...typeaheadResults[focusIdx],
                        isValid: true,
                    });
                } else {
                    // if focus index is -1, means user don't want to take any suggestion from the autocomplete list
                    // in this case, we have 2 possibilities:
                    // 1. users input fully match an email address in our record
                    // 2. users input is an invalid email address
                    const inputValue = e.target.value;
                    findFullMatchEmailByValue(inputValue).then(res => {
                        if (res === undefined) {
                            addToEmailTags({
                                id: uuidv4(),
                                value: inputValue,
                                isValid: false,
                            });
                        } else {
                            addToEmailTags({
                                ...res,
                                isValid: true,
                            });
                        }
                    });
                }
                break;
            default:
               return;
        }
    };

    return (
        <div>
            <div className="email_input">
                <EmailTagList emailTags={emailTags} deleteFromEmailTags={deleteFromEmailTags} />
                <input
                    type="text"
                    ref={inputRef}
                    className="input_area"
                    placeholder="Enter recipients..."
                    value={inputValue}
                    onChange={onInputChange}
                    onKeyDown={onInputKeyDown}
                />
            </div>
            <TypeaheadResult results={typeaheadResults} focusIdx={focusIdx} addToEmailTags={addToEmailTags} />
        </div>
    );
};

export default EmailInput;

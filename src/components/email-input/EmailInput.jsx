import React, { useCallback, useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from '../../utils/debounce';
import { findFullMatchEmailByValue, searchEmail } from '../../utils/emails';
import TypeaheadResult from '../typeahead/typeahead-result/TypeaheadResult';
import EmailTagList from './email-tag-list/EmailTagList';
import './EmailInput.css';

const EmailInput = () => {
    const [emailTags, setEmailTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [typeaheadResults, setTypeaheadResults] = useState([]);
    const [focusIdx, setFocusIdx] = useState(-1);

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const addToEmailTags = useCallback((item) => {
        setEmailTags((currentEmails) => {
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

    const deleteFromEmailTags = useCallback((id) => {
        setEmailTags((currentValue) => {
            return currentValue.filter(item => {
                return item.id !== id;
            });
        });
    }, []);

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

    const onInputKeyDown = (e) => {
        switch (e.keyCode) {
            case 38:
                setFocusIdx((v) => {
                    return v === 0 ? typeaheadResults.length - 1 : v - 1;
                });
                break;
            case 40:
                setFocusIdx((v) => {
                   return v === typeaheadResults.length - 1 ? 0 : v + 1;
                });
                break;
            case 13:
            case 9:
                e.preventDefault();
                if (!e.target.value) {
                    return;
                }

                if (focusIdx !== -1) {
                    addToEmailTags({
                        ...typeaheadResults[focusIdx],
                        isValid: true,
                    });
                } else {
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

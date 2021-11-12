import React from 'react';
import EmailTag from '../email-tag/EmailTag';
import './EmailTagList.css';

const EmailTagList = ({ emailTags, deleteFromEmailTags }) => {
    return (
        <div className="tags_list">
            {
                emailTags.map(item => {
                    return (
                        <EmailTag
                            key={item.id}
                            value={item.value}
                            id={item.id}
                            isValid={item.isValid}
                            deleteFromEmailTags={deleteFromEmailTags}
                        />
                    );
                })
            }
        </div>
    );
};

export default EmailTagList;

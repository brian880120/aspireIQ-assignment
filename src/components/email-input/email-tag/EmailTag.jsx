import React from 'react';
import './EmailTag.css';

const EmailTag = React.memo(({ value, id, isValid, deleteFromEmailTags }) => {
    const onClick = () => {
        deleteFromEmailTags(id);
    };

    const className = isValid ? 'tag_item' : 'tag_item tag_item--error';
    const errorIconClassName = isValid ? 'error_icon--hidden' : 'error_icon exclamation';

    return (
        <div className={className}>
            {value}
            <span className="delete_tag_icon" onClick={onClick}>˟</span>
            <span className={errorIconClassName}></span>
        </div>
    );
});

export default EmailTag;

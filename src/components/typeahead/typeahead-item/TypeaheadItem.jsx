import React from "react";
import './TypeaheadItem.css';

const TypeaheadItem = React.memo(({ value, id, isOnFocus, addToEmailTags }) => {
    const onClick = () => {
        addToEmailTags({
            id,
            value,
            isValid: true,
        });
    };

    const className = isOnFocus ? 'typeahead_item typeahed_item--focus' : 'typeahead_item';

    return (
        <div className={className} onClick={onClick}>
            {value}
        </div>
    );
});

export default TypeaheadItem;

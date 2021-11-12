import React from "react";
import TypeaheadItem from "../typeahead-item/TypeaheadItem";
import './TypeaheadResult.css';

const TypeaheadResult = ({ results, focusIdx, addToEmailTags }) => {
    return (
        <div className="typeahead_result">
            {results.map((item, idx) => {
                return (
                    <TypeaheadItem
                        key={idx}
                        id={item.id}
                        value={item.value}
                        addToEmailTags={addToEmailTags}
                        isOnFocus={idx === focusIdx}
                    />
                );
            })}
        </div>
    );
};

export default TypeaheadResult;

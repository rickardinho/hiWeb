import React from 'react';
import classnames from 'classnames';

const Message = ({ text, extraClass }) => {

    let classes = classnames(`message ten columns offset-by-one ${extraClass}`);

    return  (

        <div className="row">
            <div className={ classes }>
                { text }
            </div>
        </div>
    );
};

export default Message;

import React from 'react';

function Success({ message }) {
    return (
        <div className="alert alert-success" role="alert">
            <p className='mt-5' style={{height:'2px'}}>{message}</p>
        </div>
    );
}

export default Success;

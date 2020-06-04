import React from 'react';
import Radium from 'radium';


const UserOutput = (props) => {
    return (
        <div className="mt-4">
            <div className="row justify-content-center">
                <div className="">
                    <p className={props.color}>
                    {props.name} {props.children}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Radium(UserOutput);



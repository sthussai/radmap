import React from 'react';
import Radium, { StyleRoot } from 'radium';

const UserInput = (props) => {
    let inputStyle = {
        color: "green",
        ':hover': {backgroundColor:'lightgrey'},
        '@media (max-width: 400px)':{color: "red"}
    }
    return (
    <StyleRoot>    
        <div className="mt-4">
            <div className="row justify-content-center">
                <div className="">
                        <label>{props.label}</label>
                        <input className="w3-input" style={inputStyle}  type="text" onChange={props.change} value={props.name} />
                </div>
            </div>
        </div>
    </StyleRoot>    
    );
}

export default Radium(UserInput);



import React from 'react';
import ReactDOM from 'react-dom';


const Test = (props) => {
    return (
        <div className="mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div onClick={props.click}  className="card-header">Testing That React is Working</div>
                         <div className="card-body">I am {props.name} and I am {props.age} years old</div>
                        <p  className="container w3-text-red">{props.children}</p>
                        <input type="text" onChange={props.change} value={props.name} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;



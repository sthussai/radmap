import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Test from './Test.js';

const Example = (props) => {

const [personsState, setPersonsState] = useState({
    persons: [
        { name : 'Task', age: 29},
        { name : 'Jas', age: 22, hobby: 'Playing'},
        { name : 'Sash', age: 28}
    ],
    otherState: "Some other state"
});

const [otherState, setOtherState ] = useState('Second State');

const switchNameHandler = () => {

    setPersonsState({
    persons:[
        { name : 'Taskheer', age: 39},
        { name : 'Jas', age: 32, hobby: 'Playing'},
        { name : 'Sash', age: 38}
    ]})
}
    console.log(personsState);
    console.log(otherState);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Reacts Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                        <button onClick={switchNameHandler}>Switch Names</button>
                    </div>
                </div>
            </div>
        <Test name={personsState.persons[1].name} age={personsState.persons[1].age}> {personsState.persons[1].hobby} </Test>
        <Test name={personsState.persons[0].name} age={personsState.persons[0].age} />
    
        
        </div>
        
    );
}
    


export default Example;

if (document.getElementById('React')) {
    ReactDOM.render(<Example />, document.getElementById('React'));
}

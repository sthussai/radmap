import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Test from './Test.js';
import Radium, { StyleRoot } from 'radium';

class Example extends Component {

state = {
    persons: [
        { name : 'Task', age: 29},
        { name : 'Jas', age: 22, hobby: 'Playing'},
        { name : 'Sash', age: 28}
    ],
    otherState: "Some other state"
}    

switchNameHandler = (newName) => {
    this.setState({persons:[
        { name : newName, age: 39},
        { name : 'Jas', age: 32, hobby: 'Playing'},
        { name : 'Sash', age: 38}
    ]})
}

nameChangeHandler = (event) => {
    this.setState({persons:[
        { name : 'Tast', age: 39},
        { name : event.target.value , age: 32, hobby: 'Playing'},
        { name : 'Sash', age: 38}
    ]})
}

render(){

    const style = {
        backgroundColor : 'LightBlue',
        padding : '10px',
        ':hover' : {
            padding:"13px",
            color: 'green'}
    }

    return (
        <StyleRoot>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Reacts Example Component</div>

                        <div className="card-body">I'm an example component!</div>
{/* can be inefficient */}
<button style={style} onHover={console.log(style)}
onClick={()=> this.switchNameHandler('Tasky')}>Switch Names</button>
                    </div>
                </div>
            </div>
{/* This way is better */}
        <Test name={this.state.persons[0].name} 
        age={this.state.persons[0].age} 
        click={this.switchNameHandler.bind(this, 'Maxxy')}  />
        
        
        
        <Test name={this.state.persons[1].name}
        change={this.nameChangeHandler} 
        age={this.state.persons[1].age}> 
        {this.state.persons[1].hobby} </Test>
    
        
        </div>
        </StyleRoot>
    );
}
    
}

export default Radium(Example);

if (document.getElementById('React')) {
    ReactDOM.render(<Example />, document.getElementById('React'));
}

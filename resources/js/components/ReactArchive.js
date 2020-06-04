import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Radium, { StyleRoot } from 'radium';
import UserOutput from './UserOutput.js';
import UserInput from './UserInput.js';
import style from './style.css';


class ReactElement extends Component {

state = {
    first : {id:'01', name:'Taskeer', age: 28},
    style : {color:'Red', padding:'15px'},
    persons: [
        {id:'01', name : 'Task', age: 29},
    ],
    showResult: false,
}    

toggleShowResult = () => {
    const doesShow = this.state.showResult;
    this.setState({showResult: !doesShow});
}

switchColorHandler = (event) => {this.setState({style:{
    color:event.target.value, padding:this.state.style.padding}})}
changePaddingHandler = (event) => {this.setState({style:{color:this.state.style.color,
    padding:event.target.value}})}

/* Everything is rerendered in this function every time this component state or prop is changed */
render(){
console.log(this.state.style)
    const style = {
        backgroundColor : this.state.style.color,
        padding : this.state.style.padding,
        ':hover': {backgroundColor:'lightgrey'},
         '@media (max-width: 600px) and (min-width: 450px)':{width:'80%', margin:'auto'} 
    }

    let style2 = {
        backgroundColor : 'pink',
        padding: "10px",
        ':hover': {backgroundColor:'purple'},
        '@media (max-width: 600px)':{ marginTop:'20px'} 
    }


let btnClasses=["w3-button", "w3-center", "w3-green"];

let resultsDiv = null;
if(this.state.showResult === true){
     resultsDiv =   <div key='1' style={style} className="row justify-content-center">                
    <UserOutput  name={this.state.first.name}> Is {this.state.first.age}</UserOutput>        
</div>;
} else { resultsDiv = <p>Results Div is hidden</p>;}

    return (
        <StyleRoot>
        <div className="container">
            {resultsDiv}
                <UserOutput name="Color" color={this.state.style.color}> {this.state.style.color}</UserOutput>
                <UserInput label="Div Color:" name={this.state.style.color} change={this.switchColorHandler} ></UserInput>
                <UserInput label="Div Padding:" name={this.state.style.padding} change={this.changePaddingHandler} ></UserInput>
                <button onClick={this.toggleShowResult} className ={btnClasses.join(' ')}>
                    {this.state.showResult===true ? "Hide" : "Show"}</button> <br></br>  

                <button key='2' style={style.btn} >Test</button>        
        </div>
        </StyleRoot>
    );
}
    
}

export default ReactElement;

if (document.getElementById('ReactAssignment')) {
    ReactDOM.render(<ReactElement />, document.getElementById('ReactAssignment'));
}

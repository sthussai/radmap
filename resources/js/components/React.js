import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UserOutput from './UserOutput.js';
import './test.module.css';
import axios from 'axios';

class ReactElement extends Component {

state = {
    first : {id:'01', name:'Taskeer', age: 28},
    style : {color:'Red', padding:'15px'},
    persons: [
        {id:'01', name : 'Task', age: 29},
    ],
    showResult: false,
    posts: [],
}    

componentDidMount(){
    axios.get('http://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(json => console.log(json))
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
/*     const posts = this.state.posts.map(post => {
        return <UserOutput key={post.id} name={post.title} />
    }); */

    const style = {
        backgroundColor : this.state.style.color,
        padding : this.state.style.padding,
    }

    let style2 = {
        backgroundColor : 'pink',
        padding: "10px",
        ':hover': {backgroundColor:'purple'},
        '@media (maxWidth: 600px)':{ marginTop:'20px'} 
    }



let btnClasses=["w3-button", "w3-center", "w3-green"];

let resultsDiv = null;

if(this.state.showResult === true){
     resultsDiv =   <div key='1' style={style} className="row justify-content-center">                
    <UserOutput  name={this.state.first.name}> Is {this.state.first.age}</UserOutput>        
</div>;
} else { resultsDiv = <p>Results Div is hidden</p>;}



    return (
        <div className="container">
            {resultsDiv}
                <UserOutput name="Color" color={this.state.style.color}> {this.state.style.color}</UserOutput>
                    <button onClick={this.toggleShowResult} className ={btnClasses.join(' ')}>
                    {this.state.showResult===true ? "Hide" : "Show"}</button> <br></br>  

                    <button styleName="btn" >Test</button>
            {/* {posts} */}                            
        </div>
    );
}
    
}

export default ReactElement;

if (document.getElementById('ReactAssignment')) {
    ReactDOM.render(<ReactElement />, document.getElementById('ReactAssignment'));
}

import { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
            this.state({hasError: true, errorMessage: error});
        }

    render(){
        if (this.state.hasError){
        return <h3>{this.state.errorMessage}</h3>
        } else {
            return this.props.children;
        }
    }

}
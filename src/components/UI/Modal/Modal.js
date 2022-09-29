import React, { Component } from "react";
import classes from './Modal.module.css';
import Aux from "../../../containers/hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {

    shouldComponentUpdate = (nextProps, nextState) =>{
        return nextProps.show !== this.props.show || 
            nextProps.children !== this.props.children;
    }

    render() {
        const cssClasses = [classes.modal, this.props.show ? classes.open : classes.close]
        return (
        <Aux>
        <Backdrop clicked={this.props.clicked}/>
        <div className={cssClasses.join(' ')}>
                {this.props.children}
            </div>
        </Aux>
    );
    }
    
}

export default Modal;
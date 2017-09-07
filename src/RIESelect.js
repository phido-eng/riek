import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RIEStatefulBase from './RIEStatefulBase';

export default class RIESelect extends RIEStatefulBase {
    static propTypes = {
        options: PropTypes.array.isRequired,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
      disabled: false,
    };

    finishEditing = () => {
        // get the object from options that matches user selected value
        const newValue = this.props.options.find(function(option) {
            return option.id === ReactDOM.findDOMNode(this.refs.input).value;
        }, this);
        this.doValidations(newValue);
        if(!this.state.invalid && this.props.value !== newValue) {
            this.commit(newValue);
        }
        this.cancelEditing();
    };

    renderEditingComponent = () => {
        const optionNodes = this.props.options.map(function(option) {
            return <option value={option.id} key={option.id}>{option.text}</option>
        });

        return <select disabled={(this.props.disabled)}
                       value={this.props.value.id}
                       className={this.makeClassString()}
                       onChange={this.finishEditing}
                       onBlur={this.cancelEditing}
                       ref="input"
                       onKeyDown={this.keyDown}
                       {...this.props.editProps}>{optionNodes}</select>
    };

    renderNormalComponent = () => {
        return <span
            tabIndex="0"
            className={this.makeClassString()}
            onFocus={this.startEditing}
            onClick={this.startEditing}
            {...this.props.defaultProps}>{(!!this.state.newValue) ? this.state.newValue.text : this.props.value.text}</span>;
    };
}

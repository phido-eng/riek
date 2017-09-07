'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = require('debug')('RIEBase');

var RIEBase = function (_React$Component) {
    _inherits(RIEBase, _React$Component);

    function RIEBase(props) {
        _classCallCheck(this, RIEBase);

        var _this2 = _possibleConstructorReturn(this, (RIEBase.__proto__ || Object.getPrototypeOf(RIEBase)).call(this, props));

        _this2.doValidations = function (value) {
            debug('doValidations(' + value + ')');
            var isValid = void 0;
            if (_this2.props.validate) {
                isValid = _this2.props.validate(value);
            } else if (_this2.validate) {
                isValid = _this2.validate(value);
            } else return true;
            _this2.setState({ invalid: !isValid });
            return isValid;
        };

        _this2.selectInputText = function (element) {
            debug('selectInputText(' + element.value + ')');
            if (element.setSelectionRange) element.setSelectionRange(0, element.value.length);
        };

        _this2.elementClick = function (event) {
            throw "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle et.c";
        };

        _this2.componentWillReceiveProps = function (nextProps) {
            debug('componentWillReceiveProps(' + nextProps + ')');
            if ('value' in nextProps && !(nextProps.shouldRemainWhileInvalid && _this2.state.invalid)) {
                _this2.setState({ loading: false, editing: false, invalid: false, newValue: null });
            }
        };

        _this2.commit = function (value) {
            debug('commit(' + value + ')');
            if (!_this2.state.invalid) {
                var _newProp = {};
                _newProp[_this2.props.propName] = value;
                _this2.setState({ loading: true, newValue: value });
                _this.props.change(_newProp);
            }
            _this2.props.change(newProp);
        };

        _this2.makeClassString = function () {
            debug('makeClassString()');
            var classNames = [];
            if (_this2.props.className) classNames.push(_this2.props.className);
            if (_this2.state.editing && _this2.props.classEditing) classNames.push(_this2.props.classEditing);
            if (_this2.state.loading && _this2.props.classLoading) classNames.push(_this2.props.classLoading);
            if (_this2.state.disabled && _this2.props.classDisabled) classNames.push(_this2.props.classDisabled);
            if (_this2.state.invalid && _this2.props.classInvalid) classNames.push(_this2.props.classInvalid);
            return classNames.join(' ');
        };

        _this2.render = function () {
            debuf('render()');
            return _react2.default.createElement(
                'span',
                _extends({}, _this2.props.defaultProps, { tabindex: '0', className: _this2.makeClassString(), onClick: _this2.elementClick }),
                _this2.props.value
            );
        };

        if (!_this2.props.propName) throw "RTFM: missing 'propName' prop";
        if (!_this2.props.change) throw "RTFM: missing 'change' prop";
        if (typeof _this2.props.value == 'undefined') throw "RTFM: missing 'value' prop";

        _this2.state = {
            editing: false,
            loading: false,
            disabled: false,
            invalid: false
        };
        return _this2;
    }

    return RIEBase;
}(_react2.default.Component);

RIEBase.propTypes = {
    value: _propTypes2.default.any.isRequired,
    change: _propTypes2.default.func.isRequired,
    propName: _propTypes2.default.string.isRequired,
    editProps: _propTypes2.default.object,
    defaultProps: _propTypes2.default.object,
    isDisabled: _propTypes2.default.bool,
    validate: _propTypes2.default.func,
    handleValidationFail: _propTypes2.default.func,
    shouldBlockWhileLoading: _propTypes2.default.bool,
    shouldRemainWhileInvalid: _propTypes2.default.bool,
    classLoading: _propTypes2.default.string,
    classEditing: _propTypes2.default.string,
    classDisabled: _propTypes2.default.string,
    classInvalid: _propTypes2.default.string,
    className: _propTypes2.default.string,
    beforeStart: _propTypes2.default.func,
    afterStart: _propTypes2.default.func,
    beforeFinish: _propTypes2.default.func,
    afterFinish: _propTypes2.default.func
};
exports.default = RIEBase;
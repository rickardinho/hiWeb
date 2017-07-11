import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../actions/auth.js';
import Login from '../components/login.jsx';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        login: () => {
            dispatch(userLogin());
        }
    };
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;

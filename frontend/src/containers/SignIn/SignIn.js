import React from 'react';
import {Redirect} from "react-router";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import get from 'lodash/get';
import {withRouter} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {appRouter} from '../../service/router-service';

import * as Enum from './enum';

import AppConfig from "../../config/app-config-service";
import {userService} from '../../service/user-service';

import connect from './SignIn.connect';
import styles from './SignIn.styles';

class SignIn extends React.PureComponent{
    componentWillUnmount() {
        this.props.actions.signInPageDown();
    }

    componentDidMount() {
        const splittedUrl = this.props.location.pathname.split('/');

        if (splittedUrl.length === 4){
            userService.setToken(splittedUrl[2]);
            userService.setRefreshToken(splittedUrl[3]);
            this.props.layoutActions.setAuthTrue();
        }
    }

    changeLogin = (e) => {
        this.props.actions.signInChangeField({destination: Enum.USERNAME_FIELD, value: get(e, 'target.value', '')})
    };

    changePassword = (e) => {
        this.props.actions.signInChangeField({destination: Enum.PASSWORD_FIELD, value: get(e, 'target.value', '')})
    };

    clickButtonHandler = () => {
        this.props.actions.signIn();
    };

    handleKeyPress = (event) => {
        const {disableButton} = this.props;

        if (event.charCode === 13 && !disableButton) {
            this.props.actions.signIn();
        }
    }

    render() {
        const {classes, disableButton, auth} = this.props;

        if (auth) return <Redirect to={appRouter.getEducationPlanRoute()} />;

        return(
            <div className={classes.root}
                 onKeyPress={this.handleKeyPress}
            >
                <div className={classes.form}>
                    <div className={classes.tabs}>
                        <Typography className={classes.activeTab}>
                            Вход
                        </Typography>
                        <Link to={appRouter.getSignUpRoute}>
                            <Typography>
                                Регистрация
                            </Typography>
                        </Link>
                    </div>

                    <TextField label="Логин"
                               className={classes.textField}
                               onChange={this.changeLogin}
                    />
                    <TextField label="Пароль"
                               className={classes.textField}
                               type="password"
                               onChange={this.changePassword}
                    />
                    <Button color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={disableButton}
                            onClick={this.clickButtonHandler}
                    >
                        Войти
                    </Button>

                    <div className={classes.noAccount}>
                        <a href="https://op.itmo.ru/api/cas-redirect/"
                              className={classes.link}
                        >
                            <Button color="primary"
                                    variant="outlined"
                                    className={classes.button}
                            >
                                Войти через ИСУ
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    disableButton: PropTypes.bool,
    auth: PropTypes.bool,
};

export default withRouter(withStyles(styles)(connect(SignIn)));
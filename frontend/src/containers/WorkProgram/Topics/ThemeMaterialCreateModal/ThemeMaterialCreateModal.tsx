import React from 'react';
import get from "lodash/get";
import {shallowEqual} from "recompose";

import {ThemeCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import {fields} from '../../enum';

import connect from './ThemeMaterialCreateModal.connect';
import styles from './ThemeMaterialCreateModal.styles';

class ThemeMaterialCreateModal extends React.PureComponent<ThemeCreateModalProps> {
    state = {
        id: null,
        topicId: null,
        title: '',
        url: ''
    };

    componentDidUpdate(prevProps: Readonly<ThemeCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {data} = this.props;

        if (!shallowEqual(data, prevProps.data)){
            this.setState({
                ...data
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog(fields.ADD_NEW_MATERIAL_TO_TOPIC);
    }

    handleSave = () => {
        if (this.state.id){
            this.props.actions.updateTopicMaterial(this.state);
        } else {
            this.props.actions.addTopicMaterial(this.state);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        this.setState({
            [field]: get(e, 'target.value')
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {title, url, id} = this.state;

        const disableButton = title.length === 0 || url.length === 0;

        const isEditMode = Boolean(id);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} материал</DialogTitle>
                <DialogContent>
                    <TextField label="Название материала *"
                               onChange={this.saveField('title')}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={title}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="URL материала *"
                               onChange={this.saveField('url')}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={url}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            disabled={disableButton}
                            color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(ThemeMaterialCreateModal));

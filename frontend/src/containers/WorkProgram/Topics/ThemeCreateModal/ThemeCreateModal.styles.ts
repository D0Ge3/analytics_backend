import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    input: {
        marginBottom: '30px',
        width: '550px'
    },
    selector: {
        width: '550px'
    },
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        padding: 20,
    },
    courseSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '90px !important'
        }
    },
    sectionSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(13px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '57px !important'
        },
        marginBottom: '30px',
    },
    link: {
        marginRight: 'auto',
        textDecoration: 'none',
        color: theme.palette.primary.main,
    }
});
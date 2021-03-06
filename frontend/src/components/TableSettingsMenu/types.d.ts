import {WithStyles} from "@material-ui/core";
import styles from "./TableSettingsMenu.styles";

export interface TableSettingsMenuProps extends WithStyles<typeof styles> {
    handleCloseMenu: Function;
    handleOpenMenu: Function;
    anchorEl: any;
    menuItems: Array<{
        link?: string;
        text?: string;
        icon?: React.ReactElement;
        handleClickItem?: Function;
    }>
}
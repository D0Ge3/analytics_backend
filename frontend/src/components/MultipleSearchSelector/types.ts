import {WithStyles} from "@material-ui/core";
import styles from "./MultipleSearchSelector.styles";
import {ReactText} from "react";

export interface MultipleSearchSelectorProps extends WithStyles<typeof styles> {
    changeSearchText: Function;
    changeItem: Function;
    label: string;
    value: string;
    list: SelectorListType;
}

export type SelectorListType = Array<SelectorItemType>;

export type SelectorItemType = {
    label: string;
    value: ReactText;
}
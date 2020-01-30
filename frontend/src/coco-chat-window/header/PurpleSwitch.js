import {Switch, withStyles} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";

export const PurpleSwitch = withStyles({
    switchBase: {
        color: "#fff",
        "&$checked": {
            color: purple[500]
        },
        "&$checked + $track": {
            backgroundColor: purple[500]
        }
    },
    checked: {},
    track: {}
})(Switch);

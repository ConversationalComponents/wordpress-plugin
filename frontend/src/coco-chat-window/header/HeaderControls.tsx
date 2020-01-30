import React, {useState, useEffect} from "react";
import {autorun} from "mobx";
import {PurpleSwitch} from "./PurpleSwitch";
import {FormControlLabel} from "@material-ui/core";

export const HeaderControl = (p: {state: {isShowingJson: boolean; isVoice: boolean}}) => {
    const [isShowJsonOn, setIsShowJsonOn] = useState(p.state.isShowingJson);
    useEffect(() => autorun(() => setIsShowJsonOn(p.state.isShowingJson)), []);
    const [isVoiceOn, setIsVoiceOn] = useState(p.state.isVoice);
    useEffect(() => autorun(() => setIsVoiceOn(p.state.isVoice)), []);

    return (
        <div style={{display: "flex"}}>
            <FormControlLabel
                control={
                    <PurpleSwitch
                        checked={isShowJsonOn}
                        onChange={() => (p.state.isShowingJson = !p.state.isShowingJson)}
                    />
                }
                label="Dev Mode"
            />
            <FormControlLabel
                control={<PurpleSwitch checked={isVoiceOn} onChange={() => (p.state.isVoice = !p.state.isVoice)} />}
                label="Voice"
            />
        </div>
    );
};

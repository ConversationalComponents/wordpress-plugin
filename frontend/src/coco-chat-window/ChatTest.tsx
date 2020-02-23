import React, {useState, useEffect} from "react";
import {CoCoChatWindow} from "./CoCoChatWindow";

export const ChatTest = (p: {humanId: string}) => {
    const [componentId, setComponentId] = useState(p.humanId);
    useEffect(() => setComponentId(p.humanId), [p.humanId]);

    return (
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center"}}>
            <div
                style={{
                    height: "100%",
                    width: "420px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                <CoCoChatWindow
                    human_id_or_url={componentId}
                    name={componentId}
                    bot_greeting="Hi, I'll be your bot today"
                />
            </div>
        </div>
    );
};

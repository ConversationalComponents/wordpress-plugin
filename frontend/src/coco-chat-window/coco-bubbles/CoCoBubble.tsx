import React, {useState, useEffect} from "react";
import {ShowJsonButton} from "./ShowJsonButton";
import {autorun} from "mobx";
import {BubbleParams} from "../types";
import {ChatBubbleParams} from "@conversationalcomponents/chat-window/types";
import {ChatBubble} from "@conversationalcomponents/chat-window";

export const CoCoBubble = (p: ChatBubbleParams) => {
    const [isShowingCodeButton, setIsShowingCodeButton] = useState(
        !p.entry.isUser && !p.entry.isLoading && p.bubbleExtraParams && p.bubbleExtraParams.isShowingJson
    );
    useEffect(
        () =>
            autorun(() =>
                setIsShowingCodeButton(
                    !p.entry.isUser && !p.entry.isLoading && p.bubbleExtraParams && p.bubbleExtraParams.isShowingJson
                )
            ),
        []
    );
    const [paramsOut, setParamsOut] = useState<BubbleParams[]>([]);

    useEffect(
        () =>
            autorun(() =>
                setParamsOut(
                    !p.entry.isUser && !p.entry.isLoading && p.bubbleExtraParams
                        ? [
                              ...p.bubbleExtraParams.params.filter(
                                  (param: BubbleParams) => param.messageId === p.entry.id
                              )
                          ]
                        : []
                )
            ),
        []
    );
    return (
        <>
            <ChatBubble
                {...{
                    entry: p.entry,
                    endElement: isShowingCodeButton ? (
                        <ShowJsonButton
                            onClick={() => {
                                p.bubbleExtraParams &&
                                    p.bubbleExtraParams.showDetails &&
                                    p.bubbleExtraParams.showDetails(p.entry.id);
                            }}
                        />
                    ) : (
                        undefined
                    )
                }}
            />
            {paramsOut.map(param => (
                <p key={param.id} style={{margin: "0px", marginLeft: "52px", padding: 0}}>
                    <span style={{color: "#9c27b0"}}>{param.name}:</span>
                    <span style={{color: "#01A6E0"}}>{param.value}</span>
                </p>
            ))}
        </>
    );
};

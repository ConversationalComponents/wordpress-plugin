import React from "react";
import {LoadingStep} from "./LoadingStep";

const Loading: React.FC<{className?: string}> = ({className}) => (
    <span className={className}>
        <LoadingStep delay="0s">.</LoadingStep>
        <LoadingStep delay=".2s">.</LoadingStep>
        <LoadingStep delay=".4s">.</LoadingStep>
    </span>
);

export default Loading;

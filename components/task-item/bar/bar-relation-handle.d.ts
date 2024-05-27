import React from "react";
declare type BarRelationHandleProps = {
    x: number;
    y: number;
    radius: number;
    isRelationDrawMode: boolean;
    onMouseDown: (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => void;
};
export declare const BarRelationHandle: React.FC<BarRelationHandleProps>;
export {};

import { BarTask } from "./bar-task";
export declare type BarMoveAction = "progress" | "end" | "start" | "move";
export declare type GanttContentMoveAction = "mouseenter" | "mouseleave" | "delete" | "dblclick" | "click" | "select" | "" | BarMoveAction;
export declare type GanttEvent = {
    changedTask?: BarTask;
    changedTasks?: BarTask[];
    originalSelectedTask?: BarTask;
    action: GanttContentMoveAction;
};
export declare type RelationMoveTarget = "startOfTask" | "endOfTask";
export declare type GanttRelationEvent = {
    target: RelationMoveTarget;
    task: BarTask;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};

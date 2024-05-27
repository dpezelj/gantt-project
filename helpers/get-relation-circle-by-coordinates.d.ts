import { BarTask } from "../types/bar-task";
import { RelationMoveTarget } from "../types/gantt-task-actions";
export declare const getRelationCircleByCoordinates: (svgP: DOMPoint, tasks: BarTask[], taskHalfHeight: number, relationCircleOffset: number, relationCircleRadius: number, rtl: boolean) => [BarTask, RelationMoveTarget] | null;

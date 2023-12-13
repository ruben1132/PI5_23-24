export interface IPlanningDTO {
    totalCost: number;
    path: string[];
    movements: {
        x: number;
        y: number;
    }[]
}
export interface IIron {
    increaseTemperature(): void;
    decreaseTemperature(): void;
    handleSteamer(): void;
    getSteamerOn(): boolean;
    getWaterLevel(): number;
    addWater(): void;
}

import { IDevice } from '../device/types';
export interface IIron extends IDevice {
    increaseTemperature(): void;
    decreaseTemperature(): void;
    handleSteamer(): void;
    getSteamerOn(): boolean;
    getWaterLevel(): number;
    addWater(): void;
}

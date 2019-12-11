import { IDevice } from '../device/types';

export interface IronInterface extends IDevice {
    increaseTemperature(): void;
    decreaseTemperature(): void;
    handleSteamer(): void;
    getSteamerOn(): boolean;
    getWaterLevel(): number;
    addWater(): void;
}

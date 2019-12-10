import { DeviceInterface } from '../device/types';

export interface IronInterface extends DeviceInterface {
    increaseTemperature(): void;
    decreaseTemperature(): void;
    handleSteamer(): void;
    getSteamerOn(): boolean;
    getWaterLevel(): number;
    addWater(): void
}

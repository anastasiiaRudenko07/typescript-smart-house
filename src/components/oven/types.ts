import { IDevice } from '../device/types';

export interface OvenInterface extends IDevice {
    off(): void;
    setTemperature(temperature: number): void;
    getTimer(): number;
    setTimer(time: number): void;
    handleLamp(): void;
    getLampOn(): boolean;
    getCurrentMode(): string;
    nextMode(): void;
    previousMode(): void;
    run(): void;
    runMode(): void;
}

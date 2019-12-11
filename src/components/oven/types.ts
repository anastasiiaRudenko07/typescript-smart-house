import { IDevice } from '../device/types';

export enum Modes {
    standart = 'standart',
    grill = 'grill',
    defrosting = 'defrosting',
}

export interface OvenInterface extends IDevice {
    off(): void;
    setTemperature(temperature: number): void;
    getTimer(): number;
    setTimer(time: number): void;
    handleLamp(): void;
    getLampOn(): boolean;
    getModesList(): string[];
    getCurrentMode(): string;
    switchMode(mode: keyof typeof Modes): void;
    run(): void;
    runMode(): void;
}

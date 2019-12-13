import { IDevice } from '../device/types';

export enum Modes {
    STANDART = 'STANDART',
    GRILL = 'GRILL',
    DEFROSTING = 'DEFROSTING',
}

export interface IOven extends IDevice {
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
    runMode(mode: keyof typeof Modes): void;
}

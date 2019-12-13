import { Device } from '../device/device';
import { IOven, Modes } from './types';
import * as constants from './constants';

const modesValues = new Map();
modesValues.set(Modes.STANDART, {
    temperature: constants.TEMPERATURE_STANDART_MODE,
    timer: constants.TIMER_STANDART_MODE,
});

modesValues.set(Modes.GRILL, {
    temperature: constants.TEMPERATURE_GRILL_MODE,
    timer: constants.TIMER_GRILL_MODE,
});

modesValues.set(Modes.DEFROSTING, {
    temperature: constants.TEMPERATURE_DEFROSTING_MODE,
    timer: constants.TIMER_DEFROSTING_MODE,
});

export class Oven extends Device implements IOven {
    protected temperatureMax: number = constants.TEMPERATURE_MAX;
    protected timer: number = 0; /*in milliseconds */
    protected timerMin: number = constants.TIMER_MIN;
    protected timerMax: number = constants.TIMER_MAX;
    protected lampOn: boolean = false;
    protected modes: string[] = Object.keys(Modes);
    protected currentMode: keyof typeof Modes = Modes.STANDART;
    protected isReady: boolean = false;

    constructor(name: string) {
        super(name);
    }

    public off(): void {
        super.off();
        this.isReady = false;
    }

    public setTemperature(temperature: number): void {
        if (
            temperature > this.temperatureMin &&
            temperature <= this.temperatureMax
        ) {
            this.temperature = temperature;
        }
    }

    public getTimer(): number {
        return this.timer;
    }

    public setTimer(time: number): void {
        if (time >= this.timerMin && time <= this.timerMax) {
            this.timer = time;
        }
    }

    public handleLamp(): void {
        this.lampOn = !this.lampOn;
    }

    public getLampOn(): boolean {
        return this.lampOn;
    }

    public getModesList(): string[] {
        return this.modes;
    }

    public getCurrentMode(): string {
        return this.currentMode;
    }

    public switchMode(mode: keyof typeof Modes): void {
        this.currentMode = mode;
    }

    public run(): void {
        if (this.state && this.temperature && this.timer) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, this.timer);
            }).then(() => {
                this.isReady = true;
            });
        }
    }

    public runMode(mode: keyof typeof Modes): void {
        const modeSettings = modesValues.get(mode);

        this.temperature = modeSettings.temperature;
        this.timer = modeSettings.timer;
        this.run();
    }
}

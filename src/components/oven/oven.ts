import { Device } from '../device/device';
import { IOven, Modes } from './types';

const TIMER_STANDART_MODE = 1800000; /*30 min*/
const TIMER_GRILL_MODE = 2400000; /*40 min*/
const TIMER_DEFROSTING_MODE = 1800000; /*30 min*/
const TIMER_DEFAULT = 600000; /*10 min*/

const TEMPERATURE_STANDART_MODE = 180;
const TEMPERATURE_GRILL_MODE = 200;
const TEMPERATURE_DEFROSTING_MODE = 30;
const TEMPERATURE_DEFAULT = 150;

export class Oven extends Device implements IOven {
    protected temperatureMin: number = 0; /*degrees celsius*/
    protected temperatureMax: number = 250;
    protected timer: number = 0; /*in milliseconds */
    protected timerMin: number = 1;
    protected timerMax: number = 7200000; /*2 hours*/
    protected lampOn: boolean = false;
    protected modes: string[] = Object.keys(Modes);
    protected currentMode: keyof typeof Modes = Modes.standart;
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
    public runMode(): void {
        switch (this.currentMode) {
            case Modes.standart:
                this.temperature = TEMPERATURE_STANDART_MODE;
                this.timer = TIMER_STANDART_MODE;
                this.run();
                break;
            case Modes.grill:
                this.temperature = TEMPERATURE_GRILL_MODE;
                this.timer = TIMER_GRILL_MODE;
                this.run();
                break;
            case Modes.defrosting:
                this.temperature = TEMPERATURE_DEFROSTING_MODE;
                this.timer = TIMER_DEFROSTING_MODE;
                this.run();
                break;
            default:
                this.temperature = TEMPERATURE_DEFAULT;
                this.timer = TIMER_DEFAULT;
                this.run();
                break;
        }
    }
}

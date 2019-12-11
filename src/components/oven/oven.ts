import { Device } from '../device/device';
import { OvenInterface } from './types';

enum Modes {
    standart = 'standart',
    grill = 'grill',
    defrosting = 'defrosting',
}

const TIMER_STANDART_MODE = 1800000; /*30 min*/
const TIMER_GRILL_MODE = 2400000; /*40 min*/
const TIMER_DEFROSTING_MODE = 1800000; /*30 min*/
const TIMER_DEFAULT = 600000; /*10 min*/

const TEMPERATURE_STANDART_MODE = 180;
const TEMPERATURE_GRILL_MODE = 200;
const TEMPERATURE_DEFROSTING_MODE = 30;
const TEMPERATURE_DEFAULT = 150;

export class Oven extends Device implements OvenInterface {
    protected temperatureMin: number = 0; /*degrees celsius*/
    protected temperatureMax: number = 250;
    protected timer: number = 0; /*in milliseconds */
    protected timerMin: number = 1;
    protected timerMax: number = 7200000; /*2 hours*/
    protected lampOn: boolean = false;
    protected modes: string[] = Object.values(Modes);
    protected currentMode: string = Modes.standart;
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

    public getCurrentMode(): string {
        return this.currentMode;
    }
    public nextMode(): void {
        const indexCurrentMode = this.modes.indexOf(this.currentMode);

        if (indexCurrentMode === this.modes.length - 1) {
            this.currentMode = this.modes[0];
        } else {
            this.currentMode = this.modes[indexCurrentMode + 1];
        }
    }
    public previousMode(): void {
        const indexCurrentMode = this.modes.indexOf(this.currentMode);

        if (indexCurrentMode === 0) {
            this.currentMode = this.modes[this.modes.length - 1];
        } else {
            this.currentMode = this.modes[indexCurrentMode - 1];
        }
    }
    public run(): void {
        if (this.temperature && this.timer) {
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

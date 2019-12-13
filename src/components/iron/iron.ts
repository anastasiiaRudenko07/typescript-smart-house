import { Device } from '../device/device';
import { IIron } from './types';

export class Iron extends Device implements IIron {
    protected steamerOn: boolean = false;
    protected waterLevel: number = 0;
    protected waterLevelMax: number = 3;

    constructor(name: string, temperature: number, steamerOn: boolean) {
        super(name);
        this.temperature = temperature;
        this.steamerOn = steamerOn;
    }

    public increaseTemperature(): void {
        if (this.temperature >= this.temperatureMax) {
            return;
        }
        this.temperature = ++this.temperature;
    }

    public decreaseTemperature(): void {
        if (this.temperature <= this.temperatureMin) {
            return;
        }
        this.temperature = --this.temperature;
    }

    public handleSteamer(): void {
        this.steamerOn = !this.steamerOn;
    }

    public getSteamerOn(): boolean {
        return this.steamerOn;
    }

    public getWaterLevel(): number {
        return this.waterLevel;
    }

    public addWater(): void {
        if (this.waterLevel < this.waterLevelMax) {
            this.waterLevel++;
        }
    }
}

import { IDevice } from './types';

export class Device implements IDevice {
    protected name: string = '';
    protected state: boolean = false;
    protected temperature: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    public on(): void {
        this.state = true;
    }
    public off(): void {
        this.state = false;
    }
    public getState(): boolean {
        return this.state;
    }
    public getName(): string {
        return this.name;
    }
    public getTemperature(): number {
        return this.temperature;
    }
}

export interface IDevice {
    on(): void;
    off(): void;
    getState(): boolean;
    getName(): string;
    getTemperature(): number;
}

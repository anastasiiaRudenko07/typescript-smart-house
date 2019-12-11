export interface DeviceInterface {
    on(): void;
    off(): void;
    getState(): boolean;
    getName(): string;
    getTemperature(): number;
}

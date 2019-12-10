export interface DeviceInterface {
    name: string;
    on(): void;
    off(): void;
    getState(): boolean;
    getName(): string;
    getTemperature(): number;
  }
  
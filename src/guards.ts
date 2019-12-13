import { IDevice } from './components/device/types';
import { IOven } from './components/oven/types';
import { IIron } from './components/iron/types';

export function isIOven(device: IDevice): device is IOven {
    return (device as IOven).setTemperature !== undefined;
}

export function isIronInterface(device: IDevice): device is IIron {
    return (device as IIron).handleSteamer !== undefined;
}

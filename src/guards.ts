import { DeviceInterface } from './components/device/types';
import { OvenInterface } from './components/oven/types';
import { IronInterface } from './components/iron/types';

export function isOvenInterface(
    device: DeviceInterface
): device is OvenInterface {
    return (device as OvenInterface).setTemperature !== undefined;
}

export function isIronInterface(
    device: DeviceInterface
): device is IronInterface {
    return (device as IronInterface).handleSteamer !== undefined;
}

import { DeviceInterface } from '../device/types';

export default class SmartHouse {
protected name: string;
protected devicesList: Map<number, DeviceInterface>;

constructor(name: string) {
    this.name = name;
    this.devicesList = new Map();
}

public getName(): string {
    return this.name;
}
public setName(name: string): void {
    if (name.length > 0) {
        this.name = name;
    }
}

private generateId(): number {
    return Math.floor(Math.random() * 100000000 + 1);
}

public addDevice(device: DeviceInterface): void {
    const id = this.generateId();
    this.devicesList.set(id, device);
}
public getDevicesList(): string[] {
    const list = [];
    
    for (let item of this.devicesList.values()) {
        list.push(item.name);
    }

    return list;
}
public getIdOfDevice(device: DeviceInterface): number | undefined {
    const foundSet = [...this.devicesList.entries()].find(([, value]) => {
        return value === device;
    });

    return foundSet ? foundSet[0] : undefined
}

public getDeviceById(id: number): DeviceInterface | undefined {
    return this.devicesList.get(id);
}
public deleteDeviceById(id: number): void {
    this.devicesList.delete(id);
}
public deleteAllDevices(): void {
    this.devicesList.clear();
}
public onAllDevices(): void {
    this.devicesList.forEach((value) => {
        value.on();
    })
}
public offAllDevices(): void {
    this.devicesList.forEach((value) => {
        value.off();
    })
}
}

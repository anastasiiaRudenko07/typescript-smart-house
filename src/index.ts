import SmartHouse from './components/smart_house/smart_house';
import { Iron } from './components/iron/iron';
import { Oven } from './components/oven/oven';
import { isIronInterface, isOvenInterface } from './guards';

const iron = new Iron('iron', 1, true);
const oven = new Oven('oven');

const house = new SmartHouse('smart house');
house.addDevice(iron);
house.addDevice(oven);

const deviceID = house.getIdOfDevice(oven)!;
const recievedDevice = house.getDeviceById(deviceID)!;

if (isOvenInterface(recievedDevice)) {
    recievedDevice.nextMode();

    console.log(recievedDevice.getCurrentMode());
} else if (isIronInterface(recievedDevice)) {
    //...
}

console.log(house);

import { Device } from '../device/device';
import { OvenInterface } from './types';

export class Oven extends Device implements OvenInterface {
    protected temperatureMin: number = 0; /*degrees celsius*/
    protected temperatureMax: number = 250;
    protected timer: number = 0; /*in milliseconds */
    protected timerMin: number = 1;
    protected timerMax: number = 7200000; /*2 hours*/
    protected lampOn: boolean = false;
    protected modes: string[] = ["standart", "grill", "defrosting"];
    protected currentMode: string = "standart";
    protected isReady: boolean = false;

    constructor(name: string) {
        super(name);
    }

    public off(): void {
        super.off();
        this.isReady = false;
    }
    
    public setTemperature(temperature: number): void {
        if (temperature > this.temperatureMin && temperature <= this.temperatureMax) {
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
  
        if (indexCurrentMode  === this.modes.length - 1) {
          this.currentMode = this.modes[0];
        } else {
          this.currentMode = this.modes[indexCurrentMode + 1];        
        }
      }
    public previousMode(): void {
        const indexCurrentMode = this.modes.indexOf(this.currentMode);
  
        if (indexCurrentMode  === 0) {
          this.currentMode = this.modes[this.modes.length - 1];
        } else {
          this.currentMode = this.modes[indexCurrentMode - 1]; 
        }
    }
    public run(): void {
        if(this.temperature && this.timer) {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, this.timer);
          }).then(() => {
            this.isReady = true;
          });
        }
      }
    public runMode(): void {
        switch(this.currentMode) {
          case "standart": 
            this.temperature = 180;
            this.timer = 1800000; /*30 min*/
            this.run();
            break;
          case "grill": 
            this.temperature = 200;
            this.timer = 2400000; /*40 min*/
            this.run();
            break;
          case "defrosting": 
            this.temperature = 30;
            this.timer = 1800000; /*30 min*/
            this.run();
            break;
          default:
            this.temperature = 150;
            this.timer = 600000; /*10 min*/
            this.run();
            break;
        }
    }
}

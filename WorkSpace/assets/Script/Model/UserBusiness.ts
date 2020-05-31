import { StaticBusiness } from "./StaticBusiness";
import { GameDataController } from "../Controller/GameDataController";

export enum UserBusinessState
{
    None,
    Ready,
    Play,
    BeginBusiness,
    EndBusiness,
}

export class UserBusiness
{
    
    private _data: StaticBusiness;
    
    public get data() : StaticBusiness {
        return this._data;
    }

    
    public get durationTime() : number {
        return this._data.DurationSecTime * 1000;
    }

    
    public get outputMoney() : number {
        let upgradeEffect:number = (true == this.upgrade) ?this._data.UpgradeEffect : 1;
        return this._data.Output * this.amount * upgradeEffect;
    }
    
    state: UserBusinessState = UserBusinessState.None;
    upgrade: boolean = false;
    amount: number = 0;
    hireManager: boolean = false;
    remainSecTime: number = 0;
    beginTimeStamp: number = 0;

    private _key:string;

    constructor(myData: StaticBusiness) 
    {
        this._data = myData;
        this._key = 'UserBusiness_' + this._data.Index;
        this.DoInit();
    }

    private DoInit()
    {
        this.state = UserBusinessState.None;
        this.upgrade = false;
        this.amount = 0;
        this.hireManager = false;
        this.remainSecTime = 0;
        this.beginTimeStamp = 0;
    }

    public ClearSaveData() 
    {
        cc.sys.localStorage.removeItem(this._key);
    }

    public Save() 
    {
        cc.sys.localStorage.setItem(this._key, JSON.stringify(this));
    }

    public Load()
    {
        let loadData = JSON.parse(cc.sys.localStorage.getItem(this._key));
        if (null != loadData)
        {
            this.state = loadData.state;
            this.upgrade = loadData.upgrade;
            this.amount = loadData.amount;
            this.hireManager = loadData.hireManager;
            this.beginTimeStamp = loadData.beginTimeStamp;

            if (UserBusinessState.BeginBusiness == this.state)
            {
                // Calculate time and money
                let elapsedTime:number = Date.now() - loadData.beginTimeStamp;
                let cycleCount:number = Math.floor(elapsedTime / this.durationTime);

                // if one more cycle count, Add UserMoney.
                if (1 <= cycleCount)
                {
                    if (true == this.hireManager)
                    {
                        GameDataController.instance.AddUserMoney(cycleCount * this.outputMoney);
                        this.state = UserBusinessState.BeginBusiness;
                        this.beginTimeStamp = Date.now() - (elapsedTime % this.durationTime);
                    }
                    else
                    {
                        GameDataController.instance.AddUserMoney(this.outputMoney);
                        this.state = UserBusinessState.Play;
                    }
                }
            }
        }
        else if (null == loadData && 1 == this._data.Index)
        {
            this.DoFirstUserBusiness();
        }
    }

    private DoFirstUserBusiness()
    {
        this.state = UserBusinessState.Play;
        this.amount = 1;
    }

    public Reset() 
    {
        this.ClearSaveData();
        this.DoInit();
        if (1 == this._data.Index)
        {
            this.DoFirstUserBusiness();
        }
        this.Save();
    }
}
import { StaticBusiness } from "../Model/StaticBusiness";
import { StaticManager } from "../Model/StaticManager";
import { UserBusiness } from "../Model/UserBusiness";

export class GameDataController
{
    private static _instance: GameDataController;
    
    public static get instance(): GameDataController {
    
    	if (!GameDataController._instance) {
        	GameDataController._instance = new GameDataController();
        }
        
        return GameDataController._instance;
    }

    private _staticBusinessDatas: { [Index:number] : StaticBusiness } = null;
    private _staticManagerDatas: { [Index:number] : StaticManager } = null;

    private _userBusinessDatas: Array<UserBusiness> = null;
    
    public get userBusinessDatas() : Array<UserBusiness> {
        return this._userBusinessDatas;
    }

    private _userMoney:number = 0;
    
    public get userMoney() : number {
        return this._userMoney;
    }
    
    private _maxBusinessCount:number;
    
    public get maxBusinessCount() : number 
    {
        return this._maxBusinessCount;
    }
    
    private _key:string = 'UserMoney';

    public AddStaticBusinessDatas(myStaticBusinessDatas: { [Index: number]: StaticBusiness }) 
    {
        this._staticBusinessDatas = myStaticBusinessDatas;
    }

    public AddStaticManagerDatas(myStaticManagerDatas: { [Index: number]: StaticManager }) 
    {
        this._staticManagerDatas = myStaticManagerDatas;
    }

    public GetUserBusinessDatasByIndex(myIndex: number): UserBusiness 
    {
        for (let index = 0; index < this._userBusinessDatas.length; index++) 
        {
            const element:UserBusiness = this._userBusinessDatas[index];
            
            if (element.data.Index == myIndex)
            {
                return element;
            }
        }
        
        return null;
        
    }

    public MaxBusinessCount(myBusinessMaxCount: number) 
    {
        this._maxBusinessCount = myBusinessMaxCount;
    }

    public GetManager(myIndex: number): StaticManager 
    {
        return this._staticManagerDatas[myIndex];
    }

    public AddUserMoney(myAddMoney:number)
    {
        this._userMoney += myAddMoney;
        this.DoSaveUserMoney();
    }

    public RemoveUserMoney(myRemoveMoney:number) : boolean
    {
        if (this._userMoney < myRemoveMoney)
        {
            return false;
        }

        this._userMoney -= myRemoveMoney;
        this.DoSaveUserMoney();
        return true;
    }
    
    private DoSaveUserMoney()
    {
        cc.sys.localStorage.setItem(this._key, this._userMoney);
    }

    public SaveBusines(myUserBusiness: UserBusiness) 
    {
        myUserBusiness.Save();
    }


    public Init()
    {
        this.DoInit();
        
        this.DoLoad();
    }

    private DoInit()
    {
        this._userMoney = 0;

        if (null == this._userBusinessDatas)
        {
            this._userBusinessDatas = new Array<UserBusiness>();
        }

        for (let index = 1; index <= this._maxBusinessCount; index++) {
            let userBusiness:UserBusiness = new UserBusiness(this._staticBusinessDatas[index]);
            this._userBusinessDatas.push(userBusiness);
        }
    }

    public Reset()
    {
        this.DoClearSaveData();

        this._userMoney = 0;
        this.DoSaveUserMoney();

        for (let index = 0; index < this._userBusinessDatas.length; index++) 
        {
            const element = this._userBusinessDatas[index];
            element.Reset();
        }

    }

    private DoLoad() 
    {
        let loadUserMoney:number = cc.sys.localStorage.getItem(this._key);
        if (null != loadUserMoney)
        {
            this._userMoney = Number(loadUserMoney);
        }

        this.DoSaveUserMoney();

        for (let index = 0; index < this._userBusinessDatas.length; index++) 
        {
            const element = this._userBusinessDatas[index];
            element.Load();
            element.Save();
        }

    }
    
    // For Test And Reset Game!
    private DoClearSaveData()
    {
        cc.sys.localStorage.removeItem(this._key);

        for (let index = 0; index < this._userBusinessDatas.length; index++) 
        {
            const element = this._userBusinessDatas[index];
            element.ClearSaveData();
            
        }
    }
}
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UserBusiness, UserBusinessState } from "../Model/UserBusiness";
import { StaticManager } from "../Model/StaticManager";
import { GameDataController } from "../Controller/GameDataController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Business extends cc.Component {
    @property(cc.Button)
    businessButton: cc.Button = null;
    @property(cc.Label)
    businessName: cc.Label = null;
    @property(cc.Label)
    amount: cc.Label = null;

    @property(cc.Button)
    managerButton: cc.Button = null;
    @property(cc.Label)
    managerName: cc.Label = null;
    @property(cc.Label)
    managerPriceLabel: cc.Label = null;

    @property(cc.Button)
    buyButton: cc.Button = null;
    @property(cc.Label)
    priceLabel: cc.Label = null;

    @property(cc.Label)
    outputMoneyLabel: cc.Label = null;

    @property(cc.Button)
    upgradeButton: cc.Button = null;
    @property(cc.Label)
    upgradePriceLabel: cc.Label = null;
    
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;
    @property(cc.Label)
    durationLabel: cc.Label = null;

    private _data:UserBusiness = null;
    private _managerData:StaticManager = null;
    private _isSkipUpdate: boolean = true;
    
    public Init(myUserBusiness:UserBusiness) 
    {
        this._data = myUserBusiness;
        this._managerData = GameDataController.instance.GetManager(this._data.data.Index);
        this.businessName.string = this._data.data.Name;
        this.priceLabel.string = 'Buy x1 $' + this._data.data.Price.toString();
        this.managerName.string = this._managerData.Name;

        this.DoInit();
    }
    
    private DoInit()
    {
        this._isSkipUpdate = true;
        this.DoUpdateBusinessButton();
        this.DoUpdateHireButton();
        this.DoUpdateUpgradeButton();
        this.DoUpdateValue();
        this.DoSetState(this._data.state);

    }

    public Reset() 
    {
        this.DoInit();
    }

    private DoUpdateBusinessButton()
    {
        this.businessButton.enabled = !this._data.hireManager;
    }
    
    private DoUpdateHireButton()
    {
        this.managerButton.enabled = !this._data.hireManager;
        this.managerPriceLabel.string = (false == this._data.hireManager) ? 'Hire $' + this._managerData.Price.toString() : 'Hired!';
    }
    
    private DoUpdateValue()
    {
        this.amount.string = 'x' + this._data.amount.toString();
        this.outputMoneyLabel.string = '$' + this._data.outputMoney;
    }
    private DoSetState(myState: UserBusinessState) 
    {
        this.DoUpdateHireButton();
        this.DoUpdateUpgradeButton();

        switch(myState)
        {
            case UserBusinessState.None:
                {
                    this._isSkipUpdate = true;
                    this.buyButton.enabled = true;
                    this.DoUpdateRemainTime(0);
                    this.DoTimeProgress(0);
                }
                break;
            case UserBusinessState.Ready:
                {
                    this._isSkipUpdate = true;
                    this.buyButton.enabled = true;
                    this.DoUpdateRemainTime(0);
                    this.DoTimeProgress(0);
                }
                break;
            case UserBusinessState.Play:
                {
                    this._isSkipUpdate = true;
                    this.DoUpdateBusinessButton();
                    this.buyButton.enabled = true;

                    this.DoUpdateRemainTime(0);
                    this.DoTimeProgress(0);
                }
                break;
            case UserBusinessState.BeginBusiness:
                {
                    this._isSkipUpdate = false;
                    this.businessButton.enabled = false;

                    this.buyButton.enabled = true;
                    

                }
                break;
            case UserBusinessState.EndBusiness:
                {
                    cc.log('UserBusinessState.EndBusiness ' + this._data.outputMoney);
                    GameDataController.instance.AddUserMoney(this._data.outputMoney);
                    this.DoUpdateValue();
                    this._data.state = UserBusinessState.Play;
                    this.DoSetState(this._data.state);
                    this.DoSave();
                }
                break;
        }
    }

    public OnClickBusiness()
    {
        if (0 == this._data.amount) return;
        this.DoBunisess();
    }

    private DoBunisess()
    {
        this._data.state = UserBusinessState.BeginBusiness;
        this._data.beginTimeStamp = Date.now();
        this.DoSetState(this._data.state);

        this.DoSave();
    }

    private DoSave()
    {
        GameDataController.instance.SaveBusines(this._data);
    }

    public OnClickBuy()
    {
        if (false == GameDataController.instance.RemoveUserMoney(this._data.data.Price)) return;

        this._data.amount++;
        this.DoUpdateBusinessButton();
        this.DoUpdateValue();
        this.DoSave();
    }

    public OnClickHireManager()
    {
        if (0 == this._data.amount) return;
        if (false == GameDataController.instance.RemoveUserMoney(this._managerData.Price)) return;

        this._data.hireManager = true;
        this.DoUpdateHireButton();

        if (UserBusinessState.Play == this._data.state)
        {
            this.DoBunisess();
        }
        else
        {
            this.DoSave();
        }

    }

    public OnClickUpgrade()
    {
        if (false == GameDataController.instance.RemoveUserMoney(this._data.data.UpgradePrice)) return;

        this._data.upgrade = true;
        this.DoUpdateUpgradeButton();
        this.DoUpdateValue();
        this.DoSave();
    }
    
    private DoUpdateUpgradeButton()
    {
        this.upgradeButton.enabled = !this._data.upgrade;

        this.upgradePriceLabel.string = (false == this._data.upgrade) ? 'Upgrade $' + this._data.data.UpgradePrice.toString() : 'Upgrade!';
    }

    private DoUpdateRemainTime(myRemainTime:number)
    {
        let reminaSecTime:number = Math.max(0, this._data.durationTime - myRemainTime) * 0.001;
        let sec:number = Math.ceil(reminaSecTime % 60);
        let remainMin:number = Math.floor(reminaSecTime / 60);
        let min:number = Math.ceil(remainMin % 60);
        let hour:number = Math.floor(remainMin / 60);
        this.durationLabel.string = hour.toString() + ':' + min.toString() + ':' + sec.toString();
    }

    private DoTimeProgress(myProgress:number)
    {
        this.progressBar.progress = myProgress;
    }

    update (dt) 
    {
        if (true == this._isSkipUpdate) return;

        let remainTime:number = Date.now() - this._data.beginTimeStamp;
        if (this._data.durationTime <= remainTime)
        {
            this._data.state = UserBusinessState.EndBusiness;
            this.DoSetState(this._data.state);

            if (true == this._data.hireManager)
            {
                this.DoBunisess();
            }
        }

        this.DoUpdateRemainTime(remainTime);
        this.DoTimeProgress(remainTime / this._data.durationTime);
    }
}

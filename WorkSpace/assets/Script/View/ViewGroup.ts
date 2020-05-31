// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Business from "./Business";
import { UserBusiness } from "../Model/UserBusiness";
import { GameDataController } from "../Controller/GameDataController";
import GameController from "../Controller/GameController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewGroup extends cc.Component {
    
    @property(cc.Label)
    userMoney: cc.Label = null;
    @property(Business)
    businesses: Business[] = [];

    public Init()
    {
        for (let index = 0; index < this.businesses.length; index++) 
        {
            const businessView = this.businesses[index];
            
            let dataIndex:number = index + 1;
            let userBusiness:UserBusiness = GameDataController.instance.GetUserBusinessDatasByIndex(dataIndex);
            if (null == userBusiness)
            {
                businessView.node.active = false;
                continue;
            }
            businessView.node.active = true;
            businessView.Init(userBusiness);
        }
    }

    private DoReset()
    {
        for (let index = 0; index < this.businesses.length; index++) 
        {
            const businessView = this.businesses[index];
            businessView.Reset();
        }
    }

    public OnClickReset()
    {
        GameDataController.instance.Reset();
        this.DoReset();
    }

    update (dt) 
    {
        this.userMoney.string = '$' + GameDataController.instance.userMoney;
    }
}

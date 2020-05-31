// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { StaticBusiness } from "../Model/StaticBusiness";
import { GameDataController } from "./GameDataController";
import { StaticManager } from "../Model/StaticManager";


export class StaticDataLoader
{
    public Load(myCallBackCompleteLoadStaticDatas: Function ) 
    {
        cc.loader.loadRes('Data/StaticData', cc.JsonAsset, function( err, res)
            {
                let staticBusinessDatas: { [Index:number] : StaticBusiness } = {};
                let businessDatas:Array<StaticBusiness> = res.json.Business;
                for (let index = 0; index < businessDatas.length; index++) 
                {
                    const data = businessDatas[index];

                    staticBusinessDatas[data.Index] = data;
                }

                GameDataController.instance.MaxBusinessCount(businessDatas.length);
                GameDataController.instance.AddStaticBusinessDatas(staticBusinessDatas);

                let staticManagerDatas: { [Index:number] : StaticManager } = {};
                let managerDatas:Array<StaticBusiness> = res.json.Manager;
                for (let index = 0; index < managerDatas.length; index++) 
                {
                    const data = managerDatas[index];

                    staticManagerDatas[data.Index] = data;
                }

                GameDataController.instance.AddStaticManagerDatas(staticManagerDatas);

                if (null != myCallBackCompleteLoadStaticDatas)
                {
                    myCallBackCompleteLoadStaticDatas();
                }
                
            }
        );
    }
}

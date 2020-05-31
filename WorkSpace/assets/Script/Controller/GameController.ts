// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ViewGroup from "../View/ViewGroup";
import { StaticDataLoader } from "./StaticDataLoader";
import { GameDataController } from "./GameDataController";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
    private static _instance: GameController;
    
    public static get instance(): GameController {
    
    	if (!GameController._instance) {
        	GameController._instance = new GameController();
        }
        
        return GameController._instance;
    }

    
    @property(ViewGroup)
    viewGroup: ViewGroup = null;


    start () 
    {
        let staticDataLoader:StaticDataLoader = new StaticDataLoader();
        staticDataLoader.Load(()=>{
            GameDataController.instance.Init();
            this.viewGroup.Init();
        });
        
    }
}

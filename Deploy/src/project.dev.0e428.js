window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Business: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "138980uyKhGV7gjMDEHAmU/", "Business");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UserBusiness_1 = require("../Model/UserBusiness");
    var GameDataController_1 = require("../Controller/GameDataController");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Business = function(_super) {
      __extends(Business, _super);
      function Business() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.businessButton = null;
        _this.businessName = null;
        _this.amount = null;
        _this.managerButton = null;
        _this.managerName = null;
        _this.managerPriceLabel = null;
        _this.buyButton = null;
        _this.priceLabel = null;
        _this.outputMoneyLabel = null;
        _this.upgradeButton = null;
        _this.upgradePriceLabel = null;
        _this.progressBar = null;
        _this.durationLabel = null;
        _this._data = null;
        _this._managerData = null;
        _this._isSkipUpdate = true;
        return _this;
      }
      Business.prototype.Init = function(myUserBusiness) {
        this._data = myUserBusiness;
        this._managerData = GameDataController_1.GameDataController.instance.GetManager(this._data.data.Index);
        this.businessName.string = this._data.data.Name;
        this.priceLabel.string = "Buy x1 $" + this._data.data.Price.toString();
        this.managerName.string = this._managerData.Name;
        this.DoInit();
      };
      Business.prototype.DoInit = function() {
        this._isSkipUpdate = true;
        this.DoUpdateBusinessButton();
        this.DoUpdateHireButton();
        this.DoUpdateUpgradeButton();
        this.DoUpdateValue();
        this.DoSetState(this._data.state);
      };
      Business.prototype.Reset = function() {
        this.DoInit();
      };
      Business.prototype.DoUpdateBusinessButton = function() {
        this.businessButton.enabled = !this._data.hireManager;
      };
      Business.prototype.DoUpdateHireButton = function() {
        this.managerButton.enabled = !this._data.hireManager;
        this.managerPriceLabel.string = false == this._data.hireManager ? "Hire $" + this._managerData.Price.toString() : "Hired!";
      };
      Business.prototype.DoUpdateValue = function() {
        this.amount.string = "x" + this._data.amount.toString();
        this.outputMoneyLabel.string = "$" + this._data.outputMoney;
      };
      Business.prototype.DoSetState = function(myState) {
        this.DoUpdateHireButton();
        this.DoUpdateUpgradeButton();
        switch (myState) {
         case UserBusiness_1.UserBusinessState.None:
         case UserBusiness_1.UserBusinessState.Ready:
          this._isSkipUpdate = true;
          this.buyButton.enabled = true;
          this.DoUpdateRemainTime(0);
          this.DoTimeProgress(0);
          break;

         case UserBusiness_1.UserBusinessState.Play:
          this._isSkipUpdate = true;
          this.DoUpdateBusinessButton();
          this.buyButton.enabled = true;
          this.DoUpdateRemainTime(0);
          this.DoTimeProgress(0);
          break;

         case UserBusiness_1.UserBusinessState.BeginBusiness:
          this._isSkipUpdate = false;
          this.businessButton.enabled = false;
          this.buyButton.enabled = true;
          break;

         case UserBusiness_1.UserBusinessState.EndBusiness:
          cc.log("UserBusinessState.EndBusiness " + this._data.outputMoney);
          GameDataController_1.GameDataController.instance.AddUserMoney(this._data.outputMoney);
          this.DoUpdateValue();
          this._data.state = UserBusiness_1.UserBusinessState.Play;
          this.DoSetState(this._data.state);
          this.DoSave();
        }
      };
      Business.prototype.OnClickBusiness = function() {
        if (0 == this._data.amount) return;
        this.DoBunisess();
      };
      Business.prototype.DoBunisess = function() {
        this._data.state = UserBusiness_1.UserBusinessState.BeginBusiness;
        this._data.beginTimeStamp = Date.now();
        this.DoSetState(this._data.state);
        this.DoSave();
      };
      Business.prototype.DoSave = function() {
        GameDataController_1.GameDataController.instance.SaveBusines(this._data);
      };
      Business.prototype.OnClickBuy = function() {
        if (false == GameDataController_1.GameDataController.instance.RemoveUserMoney(this._data.data.Price)) return;
        this._data.amount++;
        this.DoUpdateBusinessButton();
        this.DoUpdateValue();
        this.DoSave();
      };
      Business.prototype.OnClickHireManager = function() {
        if (0 == this._data.amount) return;
        if (false == GameDataController_1.GameDataController.instance.RemoveUserMoney(this._managerData.Price)) return;
        this._data.hireManager = true;
        this.DoUpdateHireButton();
        UserBusiness_1.UserBusinessState.Play == this._data.state ? this.DoBunisess() : this.DoSave();
      };
      Business.prototype.OnClickUpgrade = function() {
        if (false == GameDataController_1.GameDataController.instance.RemoveUserMoney(this._data.data.UpgradePrice)) return;
        this._data.upgrade = true;
        this.DoUpdateUpgradeButton();
        this.DoUpdateValue();
        this.DoSave();
      };
      Business.prototype.DoUpdateUpgradeButton = function() {
        this.upgradeButton.enabled = !this._data.upgrade;
        this.upgradePriceLabel.string = false == this._data.upgrade ? "Upgrade $" + this._data.data.UpgradePrice.toString() : "Upgrade!";
      };
      Business.prototype.DoUpdateRemainTime = function(myRemainTime) {
        var reminaSecTime = .001 * Math.max(0, this._data.durationTime - myRemainTime);
        var sec = Math.ceil(reminaSecTime % 60);
        var remainMin = Math.floor(reminaSecTime / 60);
        var min = Math.ceil(remainMin % 60);
        var hour = Math.floor(remainMin / 60);
        this.durationLabel.string = hour.toString() + ":" + min.toString() + ":" + sec.toString();
      };
      Business.prototype.DoTimeProgress = function(myProgress) {
        this.progressBar.progress = myProgress;
      };
      Business.prototype.update = function(dt) {
        if (true == this._isSkipUpdate) return;
        var remainTime = Date.now() - this._data.beginTimeStamp;
        if (this._data.durationTime <= remainTime) {
          this._data.state = UserBusiness_1.UserBusinessState.EndBusiness;
          this.DoSetState(this._data.state);
          true == this._data.hireManager && this.DoBunisess();
        }
        this.DoUpdateRemainTime(remainTime);
        this.DoTimeProgress(remainTime / this._data.durationTime);
      };
      __decorate([ property(cc.Button) ], Business.prototype, "businessButton", void 0);
      __decorate([ property(cc.Label) ], Business.prototype, "businessName", void 0);
      __decorate([ property(cc.Label) ], Business.prototype, "amount", void 0);
      __decorate([ property(cc.Button) ], Business.prototype, "managerButton", void 0);
      __decorate([ property(cc.Label) ], Business.prototype, "managerName", void 0);
      __decorate([ property(cc.Label) ], Business.prototype, "managerPriceLabel", void 0);
      __decorate([ property(cc.Button) ], Business.prototype, "buyButton", void 0);
      __decorate([ property(cc.Label) ], Business.prototype, "priceLabel", void 0);
      __decorate([ property(cc.Label) ], Business.prototype, "outputMoneyLabel", void 0);
      __decorate([ property(cc.Button) ], Business.prototype, "upgradeButton", void 0);
      __decorate([ property(cc.Label) ], Business.prototype, "upgradePriceLabel", void 0);
      __decorate([ property(cc.ProgressBar) ], Business.prototype, "progressBar", void 0);
      __decorate([ property(cc.Label) ], Business.prototype, "durationLabel", void 0);
      Business = __decorate([ ccclass ], Business);
      return Business;
    }(cc.Component);
    exports.default = Business;
    cc._RF.pop();
  }, {
    "../Controller/GameDataController": "GameDataController",
    "../Model/UserBusiness": "UserBusiness"
  } ],
  GameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cfe69M+XQZO1Zcwh39Cukic", "GameController");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ViewGroup_1 = require("../View/ViewGroup");
    var StaticDataLoader_1 = require("./StaticDataLoader");
    var GameDataController_1 = require("./GameDataController");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameController = function(_super) {
      __extends(GameController, _super);
      function GameController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.viewGroup = null;
        return _this;
      }
      GameController_1 = GameController;
      Object.defineProperty(GameController, "instance", {
        get: function() {
          GameController_1._instance || (GameController_1._instance = new GameController_1());
          return GameController_1._instance;
        },
        enumerable: true,
        configurable: true
      });
      GameController.prototype.start = function() {
        var _this = this;
        var staticDataLoader = new StaticDataLoader_1.StaticDataLoader();
        staticDataLoader.Load(function() {
          GameDataController_1.GameDataController.instance.Init();
          _this.viewGroup.Init();
        });
      };
      var GameController_1;
      __decorate([ property(ViewGroup_1.default) ], GameController.prototype, "viewGroup", void 0);
      GameController = GameController_1 = __decorate([ ccclass ], GameController);
      return GameController;
    }(cc.Component);
    exports.default = GameController;
    cc._RF.pop();
  }, {
    "../View/ViewGroup": "ViewGroup",
    "./GameDataController": "GameDataController",
    "./StaticDataLoader": "StaticDataLoader"
  } ],
  GameDataController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "44981sOfHxEEYs3egMBsWDl", "GameDataController");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UserBusiness_1 = require("../Model/UserBusiness");
    var GameDataController = function() {
      function GameDataController() {
        this._staticBusinessDatas = null;
        this._staticManagerDatas = null;
        this._userBusinessDatas = null;
        this._userMoney = 0;
        this._key = "UserMoney";
      }
      Object.defineProperty(GameDataController, "instance", {
        get: function() {
          GameDataController._instance || (GameDataController._instance = new GameDataController());
          return GameDataController._instance;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(GameDataController.prototype, "userBusinessDatas", {
        get: function() {
          return this._userBusinessDatas;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(GameDataController.prototype, "userMoney", {
        get: function() {
          return this._userMoney;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(GameDataController.prototype, "maxBusinessCount", {
        get: function() {
          return this._maxBusinessCount;
        },
        enumerable: true,
        configurable: true
      });
      GameDataController.prototype.AddStaticBusinessDatas = function(myStaticBusinessDatas) {
        this._staticBusinessDatas = myStaticBusinessDatas;
      };
      GameDataController.prototype.AddStaticManagerDatas = function(myStaticManagerDatas) {
        this._staticManagerDatas = myStaticManagerDatas;
      };
      GameDataController.prototype.GetUserBusinessDatasByIndex = function(myIndex) {
        for (var index = 0; index < this._userBusinessDatas.length; index++) {
          var element = this._userBusinessDatas[index];
          if (element.data.Index == myIndex) return element;
        }
        return null;
      };
      GameDataController.prototype.MaxBusinessCount = function(myBusinessMaxCount) {
        this._maxBusinessCount = myBusinessMaxCount;
      };
      GameDataController.prototype.GetManager = function(myIndex) {
        return this._staticManagerDatas[myIndex];
      };
      GameDataController.prototype.AddUserMoney = function(myAddMoney) {
        this._userMoney += myAddMoney;
        this.DoSaveUserMoney();
      };
      GameDataController.prototype.RemoveUserMoney = function(myRemoveMoney) {
        if (this._userMoney < myRemoveMoney) return false;
        this._userMoney -= myRemoveMoney;
        this.DoSaveUserMoney();
        return true;
      };
      GameDataController.prototype.DoSaveUserMoney = function() {
        cc.sys.localStorage.setItem(this._key, this._userMoney);
      };
      GameDataController.prototype.SaveBusines = function(myUserBusiness) {
        myUserBusiness.Save();
      };
      GameDataController.prototype.Init = function() {
        this.DoInit();
        this.DoLoad();
      };
      GameDataController.prototype.DoInit = function() {
        this._userMoney = 0;
        null == this._userBusinessDatas && (this._userBusinessDatas = new Array());
        for (var index = 1; index <= this._maxBusinessCount; index++) {
          var userBusiness = new UserBusiness_1.UserBusiness(this._staticBusinessDatas[index]);
          this._userBusinessDatas.push(userBusiness);
        }
      };
      GameDataController.prototype.Reset = function() {
        this.DoClearSaveData();
        this._userMoney = 0;
        this.DoSaveUserMoney();
        for (var index = 0; index < this._userBusinessDatas.length; index++) {
          var element = this._userBusinessDatas[index];
          element.Reset();
        }
      };
      GameDataController.prototype.DoLoad = function() {
        var loadUserMoney = cc.sys.localStorage.getItem(this._key);
        null != loadUserMoney && (this._userMoney = Number(loadUserMoney));
        this.DoSaveUserMoney();
        for (var index = 0; index < this._userBusinessDatas.length; index++) {
          var element = this._userBusinessDatas[index];
          element.Load();
          element.Save();
        }
      };
      GameDataController.prototype.DoClearSaveData = function() {
        cc.sys.localStorage.removeItem(this._key);
        for (var index = 0; index < this._userBusinessDatas.length; index++) {
          var element = this._userBusinessDatas[index];
          element.ClearSaveData();
        }
      };
      return GameDataController;
    }();
    exports.GameDataController = GameDataController;
    cc._RF.pop();
  }, {
    "../Model/UserBusiness": "UserBusiness"
  } ],
  StaticBusiness: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "90408zm2DVLH7QZBpkEy5S6", "StaticBusiness");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StaticBusiness = function() {
      function StaticBusiness() {}
      return StaticBusiness;
    }();
    exports.StaticBusiness = StaticBusiness;
    cc._RF.pop();
  }, {} ],
  StaticDataLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a885aEmZrRKVZrkYLX9qMoR", "StaticDataLoader");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataController_1 = require("./GameDataController");
    var StaticDataLoader = function() {
      function StaticDataLoader() {}
      StaticDataLoader.prototype.Load = function(myCallBackCompleteLoadStaticDatas) {
        var url = cc.url.raw("resources/Data/StaticData.json");
        cc.log(url);
        cc.loader.loadRes("Data/StaticData", cc.JsonAsset, function(err, res) {
          var staticBusinessDatas = {};
          var businessDatas = res.json.Business;
          for (var index = 0; index < businessDatas.length; index++) {
            var data = businessDatas[index];
            staticBusinessDatas[data.Index] = data;
          }
          GameDataController_1.GameDataController.instance.MaxBusinessCount(businessDatas.length);
          GameDataController_1.GameDataController.instance.AddStaticBusinessDatas(staticBusinessDatas);
          var staticManagerDatas = {};
          var managerDatas = res.json.Manager;
          for (var index = 0; index < managerDatas.length; index++) {
            var data = managerDatas[index];
            staticManagerDatas[data.Index] = data;
          }
          GameDataController_1.GameDataController.instance.AddStaticManagerDatas(staticManagerDatas);
          null != myCallBackCompleteLoadStaticDatas && myCallBackCompleteLoadStaticDatas();
        });
      };
      return StaticDataLoader;
    }();
    exports.StaticDataLoader = StaticDataLoader;
    cc._RF.pop();
  }, {
    "./GameDataController": "GameDataController"
  } ],
  StaticManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "734e1q+FtdCaK2dYLxCTSy3", "StaticManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StaticManager = function() {
      function StaticManager() {}
      return StaticManager;
    }();
    exports.StaticManager = StaticManager;
    cc._RF.pop();
  }, {} ],
  UserBusiness: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "15c12nvYjtDNZdKFIqRoY4j", "UserBusiness");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataController_1 = require("../Controller/GameDataController");
    var UserBusinessState;
    (function(UserBusinessState) {
      UserBusinessState[UserBusinessState["None"] = 0] = "None";
      UserBusinessState[UserBusinessState["Ready"] = 1] = "Ready";
      UserBusinessState[UserBusinessState["Play"] = 2] = "Play";
      UserBusinessState[UserBusinessState["BeginBusiness"] = 3] = "BeginBusiness";
      UserBusinessState[UserBusinessState["EndBusiness"] = 4] = "EndBusiness";
    })(UserBusinessState = exports.UserBusinessState || (exports.UserBusinessState = {}));
    var UserBusiness = function() {
      function UserBusiness(myData) {
        this.state = UserBusinessState.None;
        this.upgrade = false;
        this.amount = 0;
        this.hireManager = false;
        this.remainSecTime = 0;
        this.beginTimeStamp = 0;
        this._data = myData;
        this._key = "UserBusiness_" + this._data.Index;
        this.DoInit();
      }
      Object.defineProperty(UserBusiness.prototype, "data", {
        get: function() {
          return this._data;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(UserBusiness.prototype, "durationTime", {
        get: function() {
          return 1e3 * this._data.DurationSecTime;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(UserBusiness.prototype, "outputMoney", {
        get: function() {
          var upgradeEffect = true == this.upgrade ? this._data.UpgradeEffect : 1;
          return this._data.Output * this.amount * upgradeEffect;
        },
        enumerable: true,
        configurable: true
      });
      UserBusiness.prototype.DoInit = function() {
        this.state = UserBusinessState.None;
        this.upgrade = false;
        this.amount = 0;
        this.hireManager = false;
        this.remainSecTime = 0;
        this.beginTimeStamp = 0;
      };
      UserBusiness.prototype.ClearSaveData = function() {
        cc.sys.localStorage.removeItem(this._key);
      };
      UserBusiness.prototype.Save = function() {
        cc.sys.localStorage.setItem(this._key, JSON.stringify(this));
      };
      UserBusiness.prototype.Load = function() {
        var loadData = JSON.parse(cc.sys.localStorage.getItem(this._key));
        if (null != loadData) {
          this.state = loadData.state;
          this.upgrade = loadData.upgrade;
          this.amount = loadData.amount;
          this.hireManager = loadData.hireManager;
          this.beginTimeStamp = loadData.beginTimeStamp;
          if (UserBusinessState.BeginBusiness == this.state) {
            var elapsedTime = Date.now() - loadData.beginTimeStamp;
            var cycleCount = Math.floor(elapsedTime / this.durationTime);
            if (1 <= cycleCount) if (true == this.hireManager) {
              GameDataController_1.GameDataController.instance.AddUserMoney(cycleCount * this.outputMoney);
              this.state = UserBusinessState.BeginBusiness;
              this.beginTimeStamp = Date.now() - elapsedTime % this.durationTime;
            } else {
              GameDataController_1.GameDataController.instance.AddUserMoney(this.outputMoney);
              this.state = UserBusinessState.Play;
            }
          }
        } else null == loadData && 1 == this._data.Index && this.DoFirstUserBusiness();
      };
      UserBusiness.prototype.DoFirstUserBusiness = function() {
        this.state = UserBusinessState.Play;
        this.amount = 1;
      };
      UserBusiness.prototype.Reset = function() {
        this.ClearSaveData();
        this.DoInit();
        1 == this._data.Index && this.DoFirstUserBusiness();
        this.Save();
      };
      return UserBusiness;
    }();
    exports.UserBusiness = UserBusiness;
    cc._RF.pop();
  }, {
    "../Controller/GameDataController": "GameDataController"
  } ],
  ViewGroup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "07cefNCnBZAMrsiYlGX3WZU", "ViewGroup");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Business_1 = require("./Business");
    var GameDataController_1 = require("../Controller/GameDataController");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ViewGroup = function(_super) {
      __extends(ViewGroup, _super);
      function ViewGroup() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.userMoney = null;
        _this.businesses = [];
        return _this;
      }
      ViewGroup.prototype.Init = function() {
        for (var index = 0; index < this.businesses.length; index++) {
          var businessView = this.businesses[index];
          var dataIndex = index + 1;
          var userBusiness = GameDataController_1.GameDataController.instance.GetUserBusinessDatasByIndex(dataIndex);
          if (null == userBusiness) {
            businessView.node.active = false;
            continue;
          }
          businessView.node.active = true;
          businessView.Init(userBusiness);
        }
      };
      ViewGroup.prototype.DoReset = function() {
        for (var index = 0; index < this.businesses.length; index++) {
          var businessView = this.businesses[index];
          businessView.Reset();
        }
      };
      ViewGroup.prototype.OnClickReset = function() {
        GameDataController_1.GameDataController.instance.Reset();
        this.DoReset();
      };
      ViewGroup.prototype.update = function(dt) {
        this.userMoney.string = "$" + GameDataController_1.GameDataController.instance.userMoney;
      };
      __decorate([ property(cc.Label) ], ViewGroup.prototype, "userMoney", void 0);
      __decorate([ property(Business_1.default) ], ViewGroup.prototype, "businesses", void 0);
      ViewGroup = __decorate([ ccclass ], ViewGroup);
      return ViewGroup;
    }(cc.Component);
    exports.default = ViewGroup;
    cc._RF.pop();
  }, {
    "../Controller/GameDataController": "GameDataController",
    "./Business": "Business"
  } ]
}, {}, [ "GameController", "GameDataController", "StaticDataLoader", "StaticBusiness", "StaticManager", "UserBusiness", "Business", "ViewGroup" ]);
//# sourceMappingURL=project.dev.js.map

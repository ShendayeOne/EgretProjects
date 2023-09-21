class Main extends egret.DisplayObjectContainer {
    private initButton: egret.TextField;
    private loginButton: egret.TextField;
    private payButton: egret.TextField;


    // 构造函数
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            console.log("应用进入后台");
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            console.log("应用进入前台");
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    // 异步地加载资源并创建游戏场
    private async runGame() {
        await this.loadResource()
        this.createGameScene();
    }

    // 异步加载游戏资源
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);

        // 首先创建按钮
        this.loginButton = new egret.TextField();
        this.loginButton.text = "登录";
        this.loginButton.textAlign = egret.HorizontalAlign.CENTER; // 设置文本水平居中
        this.loginButton.verticalAlign = egret.VerticalAlign.MIDDLE; // 设置文本垂直居中
        this.loginButton.width = 200; // 设置文本字段宽度
        this.loginButton.height = 50; // 设置文本字段高度
        this.loginButton.touchEnabled = true;
        this.loginButton.backgroundColor = 0xFFFACD ; 
        this.loginButton.textColor = 0xFFFFF0; 
        this.loginButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLoginButtonClick, this);
        this.addChild(this.loginButton);
        
        // 计算文本字段位置，使其在舞台中居中
        this.loginButton.x = (this.stage.stageWidth - this.loginButton.width) / 2;
        this.loginButton.y = (this.stage.stageHeight - this.loginButton.height) / 2;
        
        this.initButton = new egret.TextField();
        this.initButton.text = "初始化";
        this.initButton.touchEnabled = true;
        // this.initButton.backgroundColor = 0xFFFFF0 // 白色
        // this.initButton.textColor = 0x000000; // 字体颜色也设置为白色
        this.initButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInitButtonClick, this);
        // 计算初始化按钮的位置，使其在登录按钮上方 100 像素
        this.initButton.x = (this.stage.stageWidth - this.initButton.width) / 2;
        this.initButton.y = this.loginButton.y - 100;
        this.addChild(this.initButton);
        
        this.payButton = new egret.TextField();
        this.payButton.text = "支付";
        this.payButton.touchEnabled = true;
        // this.payButton.backgroundColor = 0xFFFFF0; // 白色
        // this.payButton.textColor = 0x000000; // 字体颜色也设置为白色
        this.payButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPayButtonClick, this);
        // 计算支付按钮的位置，使其在登录按钮下方 100 像素
        this.payButton.x = (this.stage.stageWidth - this.payButton.width) / 2;
        this.payButton.y = this.loginButton.y + 100;
        this.addChild(this.payButton);

    }

    private onInitButtonClick(e: egret.TouchEvent) {
        console.log("初始化按钮被点击");
        // 在这里执行初始化操作
        
    }
    
    private onLoginButtonClick(e: egret.TouchEvent) {
        console.log("登录按钮被点击");
        // 在这里执行登录操作
        this.gamelogin();
    }

    private gamelogin(){
        console.log("Sign-in");
        // qg.gameLoginWithReal({
        //     forceLogin:1,
        //     appid:"103***5",
        //     success:function(data){ 
        //         // 登录成功后，可以存储帐号信息。             
        //         console.log(" game login with real success:" + JSON.stringify(data));
        //     },
        //     fail:function(data,code){
        //         console.log("game login with real fail:" + data + ", code:" + code);
        //         //根据状态码处理游戏的逻辑。
        //         //状态码为7004或者2012，表示玩家取消登录。
        //         //此时，建议返回游戏界面，可以让玩家重新进行登录操作。
        //         if(code ==7004||code ==2012){
        //             console.log("玩家取消登录，返回游戏界面让玩家重新登录。")
        //         }
        //         //状态码为7021表示玩家取消实名认证。
        //         //在中国大陆的情况下，此时需要禁止玩家进入游戏。
        //         if(code ==7021){
        //             console.log("The player has canceled identity verification. Forbid the player from entering the game.")
        //         }
        //     }
        // });
    }
    
    private onPayButtonClick(e: egret.TouchEvent) {
        console.log("支付按钮被点击");
        // 在这里执行支付操作
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
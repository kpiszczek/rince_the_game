var rince = {
    screens: {},
    settings: {
        fps: 60,
        speed: 3,
        rows: 12,
        cols: 20,
        baseScore: 0,
        numEnemyTypes: 1
    },
    images: {},
    controls: {
        KEY_UP: "Up",
        KEY_DOWN: "Down",
        KEY_LEFT: "Left",
        KEY_RIGHT: "Right",
        KEY_W: "Up",
        KEY_A: "Left",
        KEY_S: "Down",
        KEY_D: "Right",
        KEY_SPACE: "SpecialAction",
        KEY_ESC: "Exit",
        KEY_M: "Mute"
    }
};


window.addEventListener("load", function(){
    
    var numPreload = 0,
        numLoaded = 0,
        playerProto = document.getElementById("player-proto"),
        rect = playerProto.getBoundingClientRect();

    rince.settings.cellSize = rect.width;
    
    yepnope.addPrefix("loader", function(resource){
        var isImage = /.+.(jpg|png|gif)$/i.test(resource.url);
        resource.noexec = isImage;
        numPreload++;
        resource.autoCallback = function(e) {
            numLoaded++;
            if (isImage){
                var image = new Image();
                image.src = resource.url;
                rince.images[resource.url] = image;
            }
        };
        return resource;
    });
    
    function getLoadProgress(){
        if (numPreload > 0){
            return numLoaded/numPreload;
        } else {
            return 0;
        }
    }
    
    Modernizr.load([
        {
            load: [
                "scripts/requestAnimationFrame.js",
                "scripts/easeljs-0.6.0.min.js",
                "scripts/sizzle.js",
                "scripts/dom.js",
                "loader!images/background" + rince.settings.cellSize + ".png",
                "scripts/game.js"
            ]
                /*"scripts/screen.splash.js",
                "scripts/screen.main-menu.js",
                "scripts/level.js"
            ],
            
            complete: function(){
                //console.log("załadowano pliki!");
                rince.game.showScreen("splash-screen");
            }*/
        },{
            test: Modernizr.standalone,
            yep: "scripts/screen.splash.js",
            nope: "scripts/screen.install.js",
            complete: function(){
                rince.game.setup();
                if (Modernizr.standalone){
                    rince.game.showScreen("splash-screen", getLoadProgress);
                } else {
                    rince.game.showScreen("install-screen");
                }
            }
        },{
            test: Modernizr.localstorage,
            yep: 'scripts/storage.js',
            nope: 'scripts/storage.cookie.js'
        }
    ]);
    
    if (Modernizr.standalone){
        Modernizr.load([
            {
                load: [      
                    "loader!images/landscape" + rince.settings.cellSize + ".png",
                    "loader!images/clouds" + rince.settings.cellSize + ".png",
                    "loader!images/rincesprite" + rince.settings.cellSize + ".png",     
                    "loader!images/tree" + rince.settings.cellSize + ".png",   
                    "loader!images/2flowersprite" + rince.settings.cellSize + ".png",
                    "loader!images/landscapeXXXX" + rince.settings.cellSize + ".png",
                    "loader!images/hedgehog" + rince.settings.cellSize + ".png",
                    "loader!images/budger" + rince.settings.cellSize + ".png",
                    "loader!images/cabbage" + rince.settings.cellSize + ".png",
                    "loader!images/stone" + rince.settings.cellSize + ".png",
                    "loader!images/bush" + rince.settings.cellSize + ".png",
                    "loader!images/cangaroo" + rince.settings.cellSize + ".png",
                    "loader!images/lizzard" + rince.settings.cellSize + ".png",
                    "loader!images/sheep" + rince.settings.cellSize + ".png",
                    "loader!images/dropbear" + rince.settings.cellSize + ".png",
                    "loader!images/heroin" + rince.settings.cellSize + ".png",
                    "loader!images/errol" + rince.settings.cellSize + ".png",
                    "loader!images/bumerang" + rince.settings.cellSize + ".png",
                    "loader!images/menu" + rince.settings.cellSize + ".png",
                    "loader!images/mute" + rince.settings.cellSize + ".png",
                    "loader!images/potato" + rince.settings.cellSize + ".png",
                    "loader!scripts/utils.js",
                    "loader!scripts/audio.js",         
                    "loader!scripts/input.js",
                    "loader!scripts/buttons.js",
                    "loader!scripts/player.js",
                    "loader!scripts/obstacle.js",
                    "loader!scripts/monster.js",
                    "loader!scripts/item.js",
                    "loader!scripts/boss.js",
                    "loader!scripts/levels.prototype.js",
                    "loader!scripts/levels.sto-lat.js",
                    "loader!scripts/levels.xxxx.js",
                    "loader!scripts/levels.manager.js",
                    "loader!scripts/level.js",
                    "loader!scripts/display.canvas.js",
                    "loader!scripts/screen.main-menu.js",
                    "loader!scripts/screen.choose.js",
                    "loader!scripts/screen.credits.js",
                    "loader!scripts/screen.next.js",
                    "loader!scripts/screen.game.js"                                     
                ]
            }
        ]);
    }
    
}, false);

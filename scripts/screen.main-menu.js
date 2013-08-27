rince.screens["main-menu"] = (function(){
    var dom = rince.dom,
        game = rince.game,
        display = rince.display,
        $ = dom.$,
        firstRun = true;
    
    function setup(){
        dom.bind("#main-menu ul.menu", "click", function(e){     
            if (e.target.nodeName.toLowerCase() === "button"){
                var action = e.target.getAttribute("name");
                if (action == "choose-screen") {
                    $("#level-select")[0].style.display = "block";
                }
                if (action == "game-screen") {
                    rince.levels.setLevel(1);
                }
                game.showScreen(action);
            }
        });
    }
    
    function run(){
        if (firstRun){
            setup();
            firstRun = false;
        } else {
            display.kill();
        }
    }
    
    return {
        run: run
    };
    
})();

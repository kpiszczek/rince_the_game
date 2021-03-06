rince.level_prototype = (function() {
	function Level() {

		if (!(this instanceof Level)) {
			return new Level();
		}

        this.name = "";

        this.obstacle_types = [];
        this.item_types = [];
        this.monster_types = [];

        this.boss = {};

        this.needed_potatoes = 0;

        this.landscape = new Image();
        this.sky = new Image();
	}

    var Monster = rince.monster.Monster;
    var Obstacle = rince.obstacle.Obstacle;
    var Item = rince.item.Item;
    var Boss = rince.boss.Boss;

    var rows = rince.settings.rows;
    var cols = rince.settings.cols;
    var cellSize = rince.settings.cellSize;

	Level.prototype.spawnObstacles = function () {
        var obstacles = [],
            obstacle,
            o;

        for (var i = 0; i < this.obstacle_types.length; i++){
            o = this.obstacle_types[i];
            if (o.probability > Math.random()){
                obstacle = new Obstacle(o.name, o.image, o.w, o.h, o.x, o.y, o.hitAction);
                obstacles.push(obstacle);
                obstacle.y = Math.floor(
                    Math.random()*(0.75*rows*cellSize - (o.h - o.y)) + 0.25*rows*cellSize
                );
            }
        }
        return obstacles;
    };

    Level.prototype.spawnItems = function() {
        var items = [],
            item,
            i;

        for (var j = 0; j < this.item_types.length; j++){
            i = this.item_types[j];
            if (i.probability > Math.random()){
                item = new Item(i.name, i.image, i.w, i.h, i.x, i.y, i.hitAction);
                items.push(item);
                item.y = Math.floor(
                    Math.random()*(0.75*rows*cellSize - (i.h - i.y)) + 0.25*rows*cellSize
                );
            }
        }
        return items;
    };

    Level.prototype.spawnMonsters = function() {
        var monsters = [],
            monster,
            m;

        for (var i = 0; i < this.monster_types.length; i++) {
            m = this.monster_types[i];
            if (m.probability > Math.random()){
                monster = new Monster(m.name, m.image, m.w, m.h, m.x, m.y, m.animName, 
                        m.monsterAnimations, m.hitAction, m.tickAction, m.hitArea);
                monsters.push(monster);
                monster.y = Math.floor(
                    Math.random()*(0.75*rows*cellSize - (m.h - m.y)) + 0.25*rows*cellSize
                );
            }
        }

        return monsters;
    };

    Level.prototype.spawnBoss = function() {
        var boss = this.boss;
        var b = new Boss(boss.name, boss.image, boss.w, boss.h, boss.x, boss.y, boss.animName,
                        boss.bossAnimations, boss.hitAction, boss.tickAction, boss.hitArea);
        b.y = Math.random()*210 + 100;
        return b;
    };

    return {
        Level: Level
    };
})();
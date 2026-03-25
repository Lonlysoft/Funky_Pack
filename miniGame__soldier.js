class Enemy extends Being {
	constructor(arg, coords){
		super(arg.name, arg.age, 4, 8, arg.height, arg.width, arg.dept, arg.htmlSrc, arg.animations);
		
	}
}

const Soldier = {
	enemyAmount: 10,
	Scene: Scenery,
	player: null,
	bullets: [],
	map: null,
	started: false,
	enemyArr: [],
	enemies: {
		0: {
			name: "guard01",
			age: 22,
			width: TILE_SIZE*0.5,
			height: TILE_SIZE*1.8,
			dept: TILE_SIZE*0.5
		},
		1: {
			name: "guard02",
			HP: 300,
			width: TILE_SIZE*0.5,
			height: TILE_SIZE*1.65,
			dept: TILE_SIZE*0.5
		}
	},
	UI: {
		inGameUI: body.querySelector("#dynamicPlacement"),
		hpBar: null,
		isHere: false,
		start(entity){
			if(!this.isHere){
				this.hpBar = document.createElement("progress");
				this.hpBar.classList.add("absolute");
				this.hpBar.classList.add("soldier_hpBar");
				this.inGameUI.appendChild(this.hpBar);
				this.isHere = true;
			}
		},
		update(){
			
		},
		end(){
			if(this.isHere){
				this.hpBar.remove();
				this.hpBar = null;
				this.isHere = false;
			}
		}
	},
	updateEnemy(){
		for(let i = 0; i < this.currentEnemyArr.length; i++){
			this.currentEnemyArr.update();
		}
	},
	start(entity){
		this.player = entity
		for(let i = 0; i < this.enemyAmount; i++){
			this.enemyArr.push(
				new Enemy(this.enemies[random(0, this.enemies.length)],
					{
						x: random(0, this.map.width),
						z: random(0, this.map.height)
					}
				)
			);
		}
	},
	loop(entity){
		if(!this.Scene.hasDeclaired){
			this.Scene.declair(this, this.levelNumber, SOLDIER_MAPS, null, null);
			this.start(entity);
			this.UI.start();
			
		}
		this.UI.update();
		Ctrl.action(this.player, "soldier");
		this.collisions.main(this.player)
	}
}
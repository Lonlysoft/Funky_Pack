//codigo dos INIMIGOS E NPCs

const arrayDeEntidade = [];

class NonPlayableChar extends Being{
	constructor(name, age, height, width, dept, weight, coords, dialogs, pathArr, HTMLsrc, aniamations){
		super(name, age*10, age/2, age/2, height, width, dept, HTMLsrc, animations);
		this.dialog = dialogs;
		this.dimensoes = {w: largura, h: altura, p: profundidade};
		this.peso = peso;
		this.flagCoords = {x: coords[0], y: coords[2], z: coords[1]}
		this.boxCol = new Box(coords[0], coords[2], coords[1], this.dimensoes.w, this.dimensoes.h, this.dimensoes.p);
		pol = 1;
		this.behaviorArr = pathArr;
	}
	desenhar(){
		ctx.fillRect(this.pontoCentral[0], this.pontoCentral[1], this.boxCol.w , this.boxCol.h);
	}
	talk(){
		UI.drawDialogue(this.dialog);
	}
	update(){
		if(coords != null){
			scriptedBehavior(this, this.behaviorArr);
		}
	}
	draw(){
		
	}
}

const BehaviorList = {
	linearX: function(entity){
		entity.andar("x");
		entity.rayCast = (entity.pol == -1) ? entity.boxCol.x : entity.boxCol.x + entity.boxCol.w;
		if(mapaAtual.relevoGrid[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.rayCast, TILE_SIZE)] != mapaAtual.relevoGrid[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.WorldPos.x, TILE_SIZE)]){
			entity.pol *= -1;
		}
	},
	linearZ: function(entity){
		entity.andar("z");
		entity.rayCast = (entity.pol == 1) ? entity.boxCol.z : entity.boxCol.z+entity.boxCol.p;
		if(mapaAtual.relevoGrid[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.rayCast, TILE_SIZE)] != mapaAtual.relevoGrid[WorldToGrid(entity.WorldPos.z, TILE_SIZE)][WorldToGrid(entity.WorldPos.x, TILE_SIZE)]){
			entity.pol *= -1;
		}
	},
	nothing: function(){
		
	},
	goToX: function(entity){
		entity.walk("x");
	},
	goToZ: function(entity){
		entity.walk("Z");
	}
	
}

//ele pega um array e checa se ele chegou. s
function scriptedBehavior(entity, objectBehav){
	switch(objectBehav.arr[objectBehav.index][0]){
		case "goToX": case "goToY":
			if(objectBehav.arr[objectBehav.index][1] < entity.WorldPos.x){
				entity.pol = 1;
				BehaviorList[objectBehav.arr[objectBehav.index][0]](entity);
			} else if(objectBehav.arr[objectBehav.index][1] > entity.WorldPos.x){
				entity.pol = -1;
				BehaviorList[objectBehav.arr[objectBehav.index][0]](entity);
			}
			if(objectBehav.arr[objectBehav.index][1] >= entity.WorldPos.x + 10 && objectBehav.arr[objectBehav.index][1] <= entity.WorldPos.x - 10){
				objectBehav.index++;
			}
		break;
		case "stopAndWait":
			entity.parar();
			if(Relogio.hora == Relogio.converterParaHorario(objectBehav.arr[objectBehav.index][1]).hora){
				objectBehav.index++;
			}
		break;
		case "talk":
			UI.dialogo(objectBehav.arr[objectBehav.index][1]);
			if(UI.isDialogoDismissed){
				objectBehav.index++;
			}
		break;
	}
}

//INIMIGOS DESSE JOGO, usando um array para carregá-los na classe posteriormente

//NPCs relevantes;
const NPCS = [
	//nome, altura, largura, profundidade, dialogs, pathArr, coords
	["bumb", TILE_SIZE, TILE_SIZE, TILE_SIZE, 0, ["serve pra fazer um negócio que eu não vou conseguir.", "disponível pra amanhã a noite"], [["goToX", 20], ["goToZ", 40], ["goToX", 30]]],
	['Nukko', TILE_SIZE+4, TILE_SIZE*2, TILE_SIZE+4, 0, ["goto", ]]
	
];

//NPCs irrelevantes;
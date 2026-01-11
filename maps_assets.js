

async function loadMap(mapName){
	try {
		const response = await fetch('src/assets/'+mapName+'.json');
		if (!response.ok) {
			throw new Error(`Erro HTTP: ${response.status}`);
		}
		const dados = await response.json();
		//console.log('Dados carregados:', dados);
		return dados;
	} catch (error) {
		//console.error('Erro ao carregar JSON:', error);
	}
}

const MAPS = {
	testRoom: {},
	testRoom2: {},
	testRoom3: {}
}

loadMap("TestRoom").then(
	mapData => {
		MAPS.testRoom = mapData;
	}
);
const CONTROLS_LAND_HEIGHT = 80;
const CONTROLS_PORT_HEIGHT = 40;

const ControlsButtons = {
	buttonsLandscapeParameters: {
		west: {
			x: 10,
			y: controls_canvas.height - 160,
			w: 80,
			h: CONTROLS_LAND_HEIGHT,
			show: true,
			ID: 3
		},//⬅
		up: {
			x: 90,
			y: controls_canvas.height- 240,
			w: 80,
			h: CONTROLS_LAND_HEIGHT,
			show: true,
			ID: 0
		},//⬆
		east: {
			x: 170,
			y: controls_canvas.height - 160,
			w: 80,
			h: CONTROLS_LAND_HEIGHT,
			show: true,
			ID: 1
		},//➡ 2
		down: {
			x: 90, y: controls_canvas.height - 80, w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 2
		},//⬇ 3
		
		southwest: {
			x: 10, y: controls_canvas.height - 80, w: 80, h: CONTROLS_LAND_HEIGHT, show: false
		},//↙ 4
		southeast: {
			x: 170, y: controls_canvas.height - 80, w: 80, h: CONTROLS_LAND_HEIGHT, show: false
		},//↘ 5
		northeast: {
			x: 170, y: controls_canvas.height - 240, w: 80, h: CONTROLS_LAND_HEIGHT,
			show: false
		},//↗ 6
		northwest: {
			x: 10, y: controls_canvas.height - 240, w: 80, h: CONTROLS_LAND_HEIGHT, show: false
		},//↖ 7
		//botao
		B: {
			x: controls_canvas.width - 170,
			y: controls_canvas.height-80,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 6
		},//B 8
		Y: {
			x:controls_canvas.width - 250,
			y: controls_canvas.height-160,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 4
		},//Y 9
		A: {
			x:controls_canvas.width - 90,
			y: controls_canvas.height-160,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 5
		},//A 10
		X: {
			x:controls_canvas.width - 170,
			y: controls_canvas.height- 240, 
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 7
		},//x 14
		//triggers
		select: {
			x:controls_canvas.width/2 - 90,
			y: 25, w: CONTROLS_LAND_HEIGHT, h: 80, show: true, ID: 11
		},//select 11
		zed: {
			x:controls_canvas.width - 180,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 14
		},//z 12
		start: {
			x:controls_canvas.width/2 + 10,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 10},//start 13
		
		look: {
			x: 16, y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true, ID: 8
		}, //L 15
		
		run: {
			ID: 14,
			y: controls_canvas.height/10*0.5,
			x:controls_canvas.width - 90,
			w: 80, h: CONTROLS_LAND_HEIGHT, show: true
		},
	},
	buttonsPortraitParameters: {
		west: {
			x: 10,
			y: controls_canvas.height - CONTROLS_PORT_HEIGHT*2 -20,
			w: 80,
			h: CONTROLS_PORT_HEIGHT,
			show: true,
			ID: 3
		},//⬅
		up: {
			x: 90,
			y: controls_canvas.height- CONTROLS_PORT_HEIGHT*3 -20,
			w: 80,
			h: CONTROLS_PORT_HEIGHT,
			show: true,
			ID: 0
		},//⬆
		east: {
			x: 170,
			y: controls_canvas.height - CONTROLS_PORT_HEIGHT*2 -20,
			w: 80,
			h: CONTROLS_PORT_HEIGHT,
			show: true,
			ID: 1
		},//➡ 2
		down: {
			x: 90, y: controls_canvas.height - CONTROLS_PORT_HEIGHT - 20, w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 2
		},//⬇ 3
		
		southwest: {
			x: 10, y: controls_canvas.height - CONTROLS_PORT_HEIGHT -20, w: 80, h: CONTROLS_PORT_HEIGHT, show: false
		},//↙ 4
		southeast: {
			x: 170, y: controls_canvas.height - CONTROLS_PORT_HEIGHT -20, w: 80, h: CONTROLS_PORT_HEIGHT, show: false
		},//↘ 5
		northeast: {
			x: 170, y: controls_canvas.height - CONTROLS_PORT_HEIGHT*3 -20, w: 80, h: CONTROLS_PORT_HEIGHT,
			show: false
		},//↗ 6
		northwest: {
			x: 10, y: controls_canvas.height - CONTROLS_PORT_HEIGHT*3 -20, w: 80, h: CONTROLS_PORT_HEIGHT, show: false
		},//↖ 7
		//botao
		B: {
			x: controls_canvas.width - 170,
			y: controls_canvas.height - CONTROLS_PORT_HEIGHT -20,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 6
		},//B 8
		Y: {
			x:controls_canvas.width - 250,
			y: controls_canvas.height- CONTROLS_PORT_HEIGHT*2 -20,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 4
		},//Y 9
		A: {
			x:controls_canvas.width - 90,
			y: controls_canvas.height- CONTROLS_PORT_HEIGHT*2 -20,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 5
		},//A 10
		X: {
			x:controls_canvas.width - 170,
			y: controls_canvas.height- CONTROLS_PORT_HEIGHT*3 -20, 
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 7
		},//x 14
		//triggers
		select: {
			x:controls_canvas.width/2 - 90,
			y: 25, w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 11
		},//select 11
		zed: {
			x:controls_canvas.width - 180,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 12
		},//z 12
		start: {
			x:controls_canvas.width/2 + 10,
			y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 10},//start 13
		
		run: {
			ID: 9,
			y: controls_canvas.height/10*0.5,
			x: controls_canvas.width - 90,
			w: 80, h: CONTROLS_PORT_HEIGHT, show:true
		},
		
		look: {
			x: 16, y: controls_canvas.height/10*0.5,
			w: 80, h: CONTROLS_PORT_HEIGHT, show: true, ID: 8
		}//L 15
	}
};
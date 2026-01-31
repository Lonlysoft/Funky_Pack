class AudioController{
	constructor(){
		this.ctx = new window.AudioContext();
		this.mscGain = this.ctx.createGain();
		this.sfxGain = this.ctx.createGain();
		this.mscGain.connect(this.ctx.destination);
		this.sfxGain.connect(this.ctx.destination);
		this.buffers = {};
	}
	play(name, loop = true){
		if(!this.buffers[name]){
			console.warn('song name: ' + name + ' not found!');
			return;
		}
		const source = this.ctx.createBufferSource();
		source.buffer = this.buffers[name];
		source.loop = loop;
		source.connect(this.mscGain);
		source.start(0);
		this.currentMusic = source;
	}
	musicVolume(value){
		this.mscGain.gain.value = value
	}
	sfxVolume(value){
		this.sfxGain.gain.value = value
	}
	sfx(name){
		if(!this.buffers[name]){
			console.warn('song name: ' + name + ' not found!');
			return;
		}
		const source = this.ctx.createBufferSource();
		source.buffer = this.buffers[name];
		source.connect(this.mscGain);
		source.playbackRate.value = 0.8 + Math.random()*0.4;
		source.start(0);
	}
	stopMusic(){
		if(this.currentMusic){
			this.currentMusic.stop();
			this.currentMusic = null;
		}
	}
	async loadSound(name, url){
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = await this.ctx.decodeAudioData(arrayBuffer);
		return buffer;
	}
	load(name, url){
		this.loadSound(name, url).then(
			(buffer) => {
				this.buffers[name] = buffer;
			}
		)
	}
}


const Music = {
	Controller: new AudioController(),
	currentMusic: null,
	songList: ["title"],
	songPath: {
		//ident: "src/msc/Lonlysoft_ident.mp3",
		title: "src/msc/FunkyPack_Title.mp3"
	},
	sfxList: ["select", "confirm"],
	sfxPath: {
		select: "src/sfx/select_arrow.m4a",
		confirm: "src/sfx/confirm_arrow.m4a"
	},
	play(name, loop = true){
		this.Controller.play(name, loop);
		this.currentMusic = name;
	},
	sfx(name){
		this.Controller.sfx(name);
	},
	stop(){
		this.Controller.stopMusic();
	},
	init(){
		for(let i = 0; i < this.songList.length; i++){
			this.Controller.load(this.songList[i], this.songPath[this.songList[i]]);
		}
		for(let i = 0; i < this.sfxList.length; i++){
			this.Controller.load(this.sfxList[i], this.sfxPath[this.sfxList[i]]);
		}
		this.Controller.musicVolume(1.0);
		this.Controller.sfxVolume(1.0);
	},
}

Music.init();
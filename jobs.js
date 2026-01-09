class Job{
	constructor(jobObj){
		this.horary = jobObj.horary;
		this.name = jobObj.name;
		this.momentTo = jobObj.momentTo;
	}
}

const week = ['sun', "mon", "tue", "wed", 'thu', 'fri', 'sat'];

const Schedule = {
	matrix: null,
	availableJobs:
	add(entity, job){
		entity.jobs.push(new Job(job));
		for(let i = 0; i < job.horary.length; i++){
			if(job.horary[i]){
				for(let j = 0; j < job.horary[i].length; j++){
					this.matrix[i][j] = {name: job.name, id: entity.jobs.length-1};
				}
			}
		}
	},
	remove(entity, job){
		
	},
	read(){
		
	},
	find(){
		
	}
	create(){
		//create an empty matrix; this might happen whenever it's a new game, 
		const dayMomentsLength = 9;
		const weekLength = 7;
		this.matrix = createMatrixWithSomething(dayMomentsLength, weekLength, null);
	}
}

const jobTemplate = {
	//this means that the job only happens on mondays from morning to evening.
	horary: {
		mon: [2, 3, 4, 5],
	},
	name: "", //a text that shows the job name
	momentTo: "", //a string that indicates which room in game it needs to teleport
}
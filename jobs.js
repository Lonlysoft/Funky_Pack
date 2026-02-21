class Job{
	constructor(jobObj){
		this.horary = jobObj.horary;
		this.name = jobObj.name;
		this.momentTo = jobObj.momentTo;
	}
}

const week = ['sun', "mon", "tue", "wed", 'thu', 'fri', 'sat'];

const Schedule = {
	matrix: {},
	availableJobs: [],
	isListDOMhere: false,
	add(entity, job){
		entity.jobs.push(job);
		for(let i = 0; i < week.length; i++){
			if(job.horary[week[i]]){
				for(let j = 0; j < job.horary[week[i]].length; j++){
					this.matrix[week[i]] = job.name;
				}
			}
		}
	},
	aquireJob(job){
		this.availableJobs.push(new Job(job));
	},
	remove(entity, job){
		//when you're fired
		entity.jobs = entity.jobs.filter((jobValue)=>{
			return jobValue.name != job.name
		})
		for(let i = 0; i < week.length; i++){
			if(job.horary[week[i]]){
				for(let j = 0; j < job.horary[week[i]].length; j++){
					this.matrix[week[i]] = "";
				}
			}
		}
	},
	create(){
		//create an empty matrix; this might happen whenever it's a new game, 
		const dayMomentsLength = 9;
		const weekLength = 7;
		for(let i = 0; i < weekLength; i++){
			this.matrix[week[i]] = "";
		}
	}
}

Schedule.aquireJob(
	{
		name: "restaurant waiter",
		horary: Waiter.info.horary,
		momentTo: "waiter"
	}
);

Schedule.create();

const jobTemplate = {
	//this means that the job only happens on mondays from morning to evening.
	horary: {
		mon: [2, 3, 4, 5],
	},
	name: "", //a text that shows the job name
	momentTo: "", //a string that indicates which room in game it needs to teleport
}
class Trigger{
	constructor(objectConstructor){
		this.name = objectConstructor.name;
		this.category = objectConstructor.category;
		this.type = objectConstructor.type;
		this.action = objectConstructor.action;
	}
}

var TRIGGERS = [
	null,
	{
		name: "house",
		category: "teleport",
		type: "passive",
	}
]
function PreferenceAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	var options	= {
			name:"org.daslampe.smscounter",
			version: 1,
			replace: false 
		};

	
	this.db = new Mojo.Depot(options, this.dbConnectionSuccess, this.dbConnectionFailure);
}

PreferenceAssistant.prototype.setup = function() {
	/* configure integer widget for startday setting */
	this.StartDayAttr = {
		label: 'Counter reset',
		modelProperty:    'value',
		min: 1,
		max: 28
	};
	this.StartDayModel = { value: '1' };
	this.controller.setupWidget("startday", this.StartDayAttr, this.StartDayModel);
	
	this.controller.listen('startday', Mojo.Event.propertyChange, this.ChangeStartDay.bindAsEventListener(this));

	this.FetchPrefValue();
};

PreferenceAssistant.prototype.FetchPrefValue = function() {
	var result	= this.db.simpleGet("startday", this.SetStartDay.bind(this), this.SetDefaultStartDay.bind(this));
};

PreferenceAssistant.prototype.SetStartDay = function(result) {
	if (result === null)
	{
		this.SetDefaultStartDay();
	}
	else
	{
		this.StartDayModel.value = result;
		this.controller.modelChanged(this.StartDayModel);
	}		
};

PreferenceAssistant.prototype.SetDefaultStartDay = function(result) {
	this.StartDayModel.value = "1";
	this.controller.modelChanged(this.StartDayModel);
	this.db.simpleAdd("startday", "1", this.dbConnectionSuccess, this.dbConnectionFailure);
};

PreferenceAssistant.prototype.ChangeStartDay = function() {
	this.db.simpleAdd("startday", this.StartDayModel.value, this.dbConnectionSuccess, this.dbConnectionFailure);
};


PreferenceAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

PreferenceAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

PreferenceAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening("startday", Mojo.Event.propertyChange, this.ChangeStartDay);
};

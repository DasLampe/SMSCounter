function MainAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

MainAssistant.prototype.setup = function() {
	this.appMenuModel = {
            visible: true,
            items: [
                { label: "Über...", command: 'do-about' },
                { label: "Einstellung", command: 'do-preference' }
            ]
        };
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, this.appMenuModel);

	this.ShowStat("/media/internal/.app-storage/org.daslampe.smscounter/smscounter.json");
};

MainAssistant.prototype.ShowStat = function(file)
{
	request = new Ajax.Request(file, {
		requestHeaders: {Accept: 'application/json'},
		method: 'get',
		onComplete: {},
		onSuccess: this.DisplayStat.bind(this)
	});
}

MainAssistant.prototype.DisplayStat = function(transport) {
	var json	= transport.responseText.evalJSON('true');

	this.controller.get('smsDay').update(json.countDay);
	this.controller.get('smsMonth').update(json.countMonth);
	this.controller.get('smsAll').update(json.countAll);
	this.controller.get('lastUpdate').update(json.lastUpdate);
}


MainAssistant.prototype.handleCommand = function(event) {
	this.controller=Mojo.Controller.stageController.activeScene();
	if(event.type == Mojo.Event.command) {
            switch (event.command) {
            case 'do-about':
            	this.controller.stageController.pushScene({name:"showabout",transition:Mojo.Transition.crossFade} );
            	break;
            case 'do-preference':
            	this.controller.stageController.pushScene({name:"preference",transition:Mojo.Transition.crossFade} );
            	break;
            }
	}
}

MainAssistant.prototype.handleButtonPress = function(event) {
}

MainAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

MainAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

MainAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
};

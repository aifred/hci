// Class used to track experiment
class ExperimentTracker {
	constructor() {
		this.trials = [];
		this.attempt = 0;
		this.trial = null;
		this.attempt = null;
		this.menuType = null;
		this.menuDepth = null;
		this.menuBreadth = null;
		this.targetItem = null;
		this.selectedItem = null;
		this.startTime = null;
		this.endTime = null;
		this.participant = null;
		this.trialFile = null;
		this.isMobile = false;
	}
	
	resetTimers(){
		this.startTime = null;
		this.endTime = null;
		this.timePerSelection = [];
	}

	startTimer() {
		this.startTime = Date.now();
	}

	recordSelectedItem(selectedItem) {
		this.selectedItem = selectedItem;
		this.stopTimer();
	}

	stopTimer() {
		this.endTime = Date.now();
		var avgPerSelection = (this.endTime - this.startTime)/1000/this.menuDepth;
		this.trials.push([this.participant, this.trial, this.attempt, this.menuType, this.menuDepth, this.menuBreadth, this.targetItem, this.selectedItem, this.startTime, this.endTime, avgPerSelection])
		this.resetTimers();
		this.attempt++;

	}

	newTrial() {
		this.attempt = 1;
	}

	toCsv() {
		var csvFile = "Participant ID,Trial,Attempt,Menu Type,Menu Depth,Menu Breadth,Target Item,Selected Item,Start Time, End Time,Average Effort Per Selection (ms)\n";
		for (var i = 0; i < this.trials.length; i++) {
			csvFile += this.trials[i].join(',');
			csvFile += "\n";
		}

		var hiddenLink = document.createElement('a');
		hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
		hiddenLink.target = '_blank';
		var deviceType = this.isMobile ? 'mobile' : 'browser';
		hiddenLink.download = this.participant + '_' + deviceType + '_' + this.trailFile + '_experiment.csv';
		document.body.appendChild(hiddenLink);
		hiddenLink.click();
	}

    setParticipantName(name) {
        this.participant = name;
    }

    setTrialFile(trialNum) {
        this.trailFile = trialNum;
    }

    setIsMobile(isMobile) {
        this.isMobile = isMobile;
    }
}
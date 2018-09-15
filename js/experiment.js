'use strict';

// Location of data files
const trial1File = "./data/experiments_1.csv"
const trial2File = "./data/experiments_2.csv"
const trial3File = "./data/experiments_3.csv"
const trial4File = "./data/experiments_4.csv"
const trial5File = "./data/experiments_5.csv"
const trial6File = "./data/experiments_6.csv"
const menuL1File = "./data/menu_depth_1_4.csv"
const menuL2File = "./data/menu_depth_2_4.csv"
const menuL3File = "./data/menu_depth_3_4.csv"
const menuL1B6File = "./data/menu_depth_1_6.csv"
const menuL2B6File = "./data/menu_depth_2_6.csv"
const menuL3B6File = "./data/menu_depth_3_6.csv"
const menuL1B8File = "./data/menu_depth_1_8.csv"
const menuL2B8File = "./data/menu_depth_2_8.csv"
const menuL3B8File = "./data/menu_depth_3_8.csv"

// Global variables
var menu;
var trialsData = [];
var numTrials = 0;
var currentTrial = 1;
var markingMenuL1 = [];
var markingMenuL2 = [];
var markingMenuL3 = [];
var markingMenuL1B6 = [];
var markingMenuL2B6 = [];
var markingMenuL3B6 = [];
var markingMenuL1B8 = [];
var markingMenuL2B8 = [];
var markingMenuL3B8 = [];
var radialMenuTree = null;
var radialMenuL1 = [];
var radialMenuL2 = [];
var radialMenuL3 = [];
var radialMenuL1B6 = [];
var radialMenuL2B6 = [];
var radialMenuL3B6 = [];
var radialMenuL1B8 = [];
var radialMenuL2B8 = [];
var radialMenuL3B8 = [];
var tracker = new ExperimentTracker();
var markingMenuSubscription = null;
var radialMenuSvg = null;


// Load CSV files from data and return text
function getData(relativePath) {
  return  $.ajax({
        type: "GET",
        url: relativePath,
        dataType: "text"
    });
}

$(document).ready(function() {
  // Initialize the plugin
  $('#my_popup').popup({
    escape: false,
    blur: false
  });
  $('#my_popup').popup('show');

  var form = $('#popupForm');
  var formError = $('span.error');
  form.bind('submit', function(event){
    event.preventDefault();
    updateName();
  });
});

function updateName() {
  tracker.setParticipantName($('#participantName').val());
  tracker.setTrialFile($('#trailData').val());

  $('#my_popup').popup('hide');
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
      tracker.setIsMobile(true);
  }

  initExperiment();
}

// Loads the CSV data files on page load and store it to global variables
function initExperiment() {
	// Get Trails
	var trialDatas = [trial1File, trial2File, trial3File, trial4File, trial5File, trial6File];
	var trialDataPromise = getData(trialDatas[tracker.trailFile-1]);

    trialDataPromise.done(function (data) {
        var records = data.split("\n");
        numTrials = records.length - 1;
        for (var i = 1; i <= numTrials; i++) {
            var cells = records[i].split(",");
            var menuType = cells[0].trim();
            var menuDepth = cells[1].trim();
            var menuBreadth = cells[2].trim();
            var targetItem = cells[3].trim();
            trialsData[i] = {
                'Menu Type': menuType,
                'Menu Depth': menuDepth,
                'Menu Breadth': menuBreadth,
                'Target Item': targetItem
            };
        }

        $.when(
            getData(menuL1File).done((data) => {
                markingMenuL1 = formatMarkingMenuData(data);
                radialMenuL1 = formatRadialMenuData(data);
            }),
            getData(menuL2File).done((data) => {
                markingMenuL2 = formatMarkingMenuData(data);
                radialMenuL2 = formatRadialMenuData(data);
            }),
            getData(menuL3File).done((data) => {
                markingMenuL3 = formatMarkingMenuData(data);
                radialMenuL3 = formatRadialMenuData(data);
            }),
            getData(menuL1B6File).done((data) => {
                markingMenuL1B6 = formatMarkingMenuData(data);
                radialMenuL1B6 = formatRadialMenuData(data);
            }),
            getData(menuL2B6File).done((data) => {
                markingMenuL2B6 = formatMarkingMenuData(data);
                radialMenuL2B6 = formatRadialMenuData(data);
            }),
            getData(menuL3B6File).done((data) => {
                markingMenuL3B6 = formatMarkingMenuData(data);
                radialMenuL3B6 = formatRadialMenuData(data);
            }),
            getData(menuL1B8File).done((data) => {
                markingMenuL1B8 = formatMarkingMenuData(data);
                radialMenuL1B8 = formatRadialMenuData(data);
            }),
            getData(menuL2B8File).done((data) => {
                markingMenuL2B8 = formatMarkingMenuData(data);
                radialMenuL2B8 = formatRadialMenuData(data);
            }),
            getData(menuL3B8File).done((data) => {
                markingMenuL3B8 = formatMarkingMenuData(data);
                radialMenuL3B8 = formatRadialMenuData(data);
            })
        )
        .then(function() {
            //Start the first trial
            nextTrial();
        });
    });
}

// Wrapper around nextTrial() to prevent click events while loading menus
function loadNextTrial(e){
	e.preventDefault();
//	nextTrial();
	var selectedItem = $('#selectedItem').text();
	var targetItem = $('#targetItem').text();
	if (selectedItem.length == 0 || targetItem.length == 0) {
        alert("Please select a item.");
    } else {
        var targetItemArray = targetItem.split("->");
        if (selectedItem.trim() === targetItemArray[targetItemArray.length-1].trim()) {
            nextTrial();
        } else {
            alert("Selected item not equals target item.");
        }
    }
}

// Move to next trai and record events
function nextTrial() {

	
	if (currentTrial <= numTrials) {

		var menuType = trialsData[currentTrial]['Menu Type'];
		var menuDepth = trialsData[currentTrial]['Menu Depth'];
		var menuBreadth = parseInt(trialsData[currentTrial]['Menu Breadth']);
		var targetItem = trialsData[currentTrial]['Target Item'];

		document.getElementById("trialNumber").innerHTML = String(currentTrial) + "/" + String(numTrials);
		document.getElementById("menuType").innerHTML = menuType;
		document.getElementById("menuDepth").innerHTML = menuDepth;
		document.getElementById("menuBreadth").innerHTML = menuBreadth;
		document.getElementById("targetItem").innerHTML = targetItem;
		document.getElementById("selectedItem").innerHTML = "&nbsp;";

		tracker.newTrial();
		tracker.trial = currentTrial;
		tracker.menuType = menuType;
		tracker.menuDepth = menuDepth;
		tracker.menuBreadth = menuBreadth;
		tracker.targetItem = targetItem;

		if (menuType === "Marking") {
				
			initializeMarkingMenu();

			if(menuDepth == 1){
			    switch (menuBreadth) {
			        case 4:
			            menu = MarkingMenu(markingMenuL1, document.getElementById('marking-menu-container'));
			            break;
			        case 6:
			            menu = MarkingMenu(markingMenuL1B6, document.getElementById('marking-menu-container'));
			            break;
			        case 8:
			            menu = MarkingMenu(markingMenuL1B8, document.getElementById('marking-menu-container'));
			            break;
			        default:
			            console.log("No such menu breadth found.");
			    }
			} else if(menuDepth == 2){
			    switch (menuBreadth) {
                    case 4:
                        menu = MarkingMenu(markingMenuL2, document.getElementById('marking-menu-container'), {notifySteps:true});
                        break;
                    case 6:
                        menu = MarkingMenu(markingMenuL2B6, document.getElementById('marking-menu-container'), {notifySteps:true});
                        break;
                    case 8:
                        menu = MarkingMenu(markingMenuL2B8, document.getElementById('marking-menu-container'), {notifySteps:true});
                        break;
                    default:
                        console.log("No such menu breadth found.");
                }
			} else if(menuDepth == 3){
			    switch (menuBreadth) {
                    case 4:
                        menu = MarkingMenu(markingMenuL3, document.getElementById('marking-menu-container'));
                        break;
                    case 6:
                        menu = MarkingMenu(markingMenuL3B6, document.getElementById('marking-menu-container'));
                        break;
                    case 8:
                        menu = MarkingMenu(markingMenuL3B8, document.getElementById('marking-menu-container'));
                        break;
                    default:
                        console.log("No such menu breadth found.");
                }
			}

			markingMenuSubscription = menu.subscribe((selection) => markingMenuOnSelect(selection));
		} else if (menuType === "Radial") {
			initializeRadialMenu();			
			if (menuDepth == 1){
			    switch (menuBreadth) {
                    case 4:
                        menu = createRadialMenu(radialMenuL1);
                        break;
                    case 6:
                        menu = createRadialMenu(radialMenuL1B6);
                        break;
                    case 8:
                        menu = createRadialMenu(radialMenuL1B8);
                        break;
                    default:
                        console.log("No such menu breadth found.");
                }
			} else if(menuDepth == 2){
				switch (menuBreadth) {
                    case 4:
                        menu = createRadialMenu(radialMenuL2);
                        break;
                    case 6:
                        menu = createRadialMenu(radialMenuL2B6);
                        break;
                    case 8:
                        menu = createRadialMenu(radialMenuL2B8);
                        break;
                    default:
                        console.log("No such menu breadth found.");
                }
			} else if(menuDepth == 3){
				switch (menuBreadth) {
                    case 4:
                        menu = createRadialMenu(radialMenuL3);
                        break;
                    case 6:
                        menu = createRadialMenu(radialMenuL3B6);
                        break;
                    case 8:
                        menu = createRadialMenu(radialMenuL3B8);
                        break;
                    default:
                        console.log("No such menu breadth found.");
                }
			}
		}

		currentTrial++;
	} else {
		
	    var nextButton = document.getElementById("nextButton");
	    nextButton.innerHTML = "Done";
		tracker.toCsv();
	}
}

/*Functions related to MarkingMenu*/

// Reconstructs marking menu container
function initializeMarkingMenu(){
	//Unload Radial Menu
	var radialMenuContainer = document.getElementById('radial-menu-container');
	if(radialMenuContainer != null){
		radialMenuContainer.parentNode.removeChild(radialMenuContainer);
	}
	
	// Load Marking Menu
	var interactionContainer = document.getElementById('interaction-container');
	if (markingMenuSubscription != null) {
		markingMenuSubscription.unsubscribe();
	}
	var markingMenuContainer = document.getElementById('marking-menu-container');
	if(markingMenuContainer == null){
		interactionContainer.innerHTML += "<div id=\"marking-menu-container\" style=\"height:100%;width:100%\" onmousedown=\"markingMenuOnMouseDown()\" oncontextmenu=\"preventRightClick(event)\"></div>";
	}
}

//Formats csv menu data in the structure accepted by radial menu
// Assumes menu csv is sorted by Id and Parent both Ascending
function formatMarkingMenuData(data) {
	var records = data.split("\n");
	var numRecords = records.length;
	var menuItems = {}

	// Parse through the records and create individual menu items
	for (var i = 1; i < numRecords; i++) {
		var items = records[i].split(',');
		var id = items[0].trim();
		var label = items[2].trim();
		menuItems[id] = {
			'name': label,
			'children': []
		};
	}

	for (var i = numRecords - 1; i >= 1; i--) {
		var items = records[i].split(',');
		var id = items[0].trim();
		var parent = items[1].trim();
		if (parent === '0') {
			continue;
		} else {
			var children = menuItems[parent]['children'];
			children.push(menuItems[id]);
			delete menuItems[id]
			menuItems[parent]['children'] = children;
		}
	}

	var menuItemsList = [];
	for (var key in menuItems) {
		menuItemsList.push(menuItems[key]);
	}

	return menuItemsList;
}

// Function to start tracking timer on mouse down
function markingMenuOnMouseDown(){
	tracker.startTimer();
}

//Function to start tracking timer on mouse down
function markingMenuOnSelect(selectedItem){
    if (selectedItem.type === undefined) {
        tracker.recordSelectedItem(selectedItem.name);
        document.getElementById("selectedItem").innerHTML = selectedItem.name;
    } else {
        if (selectedItem.type === 'select') {
            var selection = selectedItem.selection;
            tracker.recordSelectedItem(selection.name);
            document.getElementById("selectedItem").innerHTML = selection.name;
        }
    }
}

function preventRightClick(e){
	e.preventDefault();
}


/*Functions related to RadialMenu*/

// Reconstructs radial menu container
function initializeRadialMenu(){
	
	// Unload Marking Menu
	if (markingMenuSubscription != null) {
		markingMenuSubscription.unsubscribe();
	}
	var markingMenuContainer = document.getElementById('marking-menu-container');
	if(markingMenuContainer!=null){
		markingMenuContainer.parentNode.removeChild(markingMenuContainer);
	}

	// Reload Radial Menu
	var interactionContainer = document.getElementById('interaction-container');
	var radialMenuContainer = document.getElementById('radial-menu-container');
	if(radialMenuContainer == null){
		interactionContainer.innerHTML += "<div id=\"radial-menu-container\" style=\"height:100%;width:100%\" oncontextmenu=\"toggleRadialMenu(event)\"></div>";
	}

	$("#radial-menu-container").pressure({
	    startDeepPress: function(event) {
	        toggleRadialMenu(event);
	    }
	});
}

// Create radial menu svg element
function createRadialMenu(radialMenuL){
	
    var radialmenuElement = document.getElementById('radialmenu');
    if(radialmenuElement != null){
    	radialmenuElement.parentNode.removeChild(radialmenuElement);
    }

	var w = window.innerWidth;
	var h = window.innerHeight;
	var radialMenuSvgElement = document.getElementById('radial-menu-svg');
	if (radialMenuSvgElement != null){
		radialMenuSvgElement.parentNode.removeChild(radialMenuSvgElement);
	}
	radialMenuSvg = d3.select("#radial-menu-container").append("svg").attr("width", w).attr("height", h).attr("id","radial-menu-svg");
	radialMenuTree = radialMenuL;
	return radialMenuSvg;
}

// Toggle radial menu on right click
function toggleRadialMenu(e) {
	var event;
	if (e instanceof TouchEvent) {
	    event = e.targetTouches[0];
	} else {
	    event = e;
	}
	if(tracker.startTime == null){
		if(radialMenuTree != null){
				menu = module.exports(radialMenuTree, {
					x: event.clientX,
					y: event.clientY
				}, radialMenuSvg);
		
			// Start timing once menu appears
			tracker.startTimer();
		}
	}else{
		// Record previous item
		tracker.recordSelectedItem(null);
		
		if(radialMenuTree != null){
			menu = module.exports(radialMenuTree, {
				x: event.clientX,
				y: event.clientY
			}, radialMenuSvg);
	
		// Start timing once menu appears
		tracker.startTimer();
		}
	}
	if (!(e instanceof TouchEvent)) {
        event.preventDefault();
    }

}

//Callback for radialmenu when a leaf node is selected
function radialMenuOnSelect() {
    tracker.recordSelectedItem(this.id);
    var radialmenu = document.getElementById('radialmenu');
    radialmenu.parentNode.removeChild(radialmenu);

    document.getElementById("selectedItem").innerHTML = this.id;
}

//Formats csv menu data in the structure accepted by radial menu
// Assumes menu csv is sorted by Id and Parent both Ascending
function formatRadialMenuData(data) {

	var records = data.split("\n");
	var numRecords = records.length;
	var menuItems = {}

	// Parse through the records and create individual menu items
	for (var i = 1; i < numRecords; i++) {
		var items = records[i].split(',');
		var id = items[0].trim();
		var label = items[2].trim();
		menuItems[id] = {
			'id': label,
			'fill': "#39d",
			'name': label,
			'_children': []
		};
	}

	for (var i = numRecords - 1; i >= 1; i--) {
		var items = records[i].split(',');
		var id = items[0].trim();
		var parent = items[1].trim();
		if (parent === '0') {
			continue;
		} else {
			var _children = menuItems[parent]['_children'];
			if(menuItems[id]['_children'].length == 0){
				menuItems[id]['callback'] = radialMenuOnSelect;
			}
			_children.push(menuItems[id]);
			delete menuItems[id];
			menuItems[parent]['_children'] = _children;
		}
	}


	var menuItemsList = [];
	for (var key in menuItems) {
		if (menuItems[key]['_children'].length == 0){
			delete menuItems[key]['_children'];
			menuItems[key]['callback'] = radialMenuOnSelect;
		} else{
			delete menuItems[key]['callback'];
		}
		menuItemsList.push(menuItems[key]);
	}

	return {
		'_children': menuItemsList
	};

}

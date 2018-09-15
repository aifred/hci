# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.0.1 - 2018-09-08
### Added
- This CHANGELOG file to hopefully serve as an evolving example of a
  standardized open source project CHANGELOG.
- Added [Pressure](https://pressurejs.com/) library for reading guestures on tablets (particulary iPads). This is used 
  to solve the problem with opening the radial menu as a context menu on Apple tablets.
- Added [jQuery Popup Overlay](http://dev.vast.com/jquery-popup-overlay/) library for rendering the popup menu when the
  page loads to request for user name and experiment number to start the experiment. This same information will be used
  in the resulting csv. 
- Native HTML5 form validation for the popup fields.
- Added ability to identify the device type to determine if a test is done on browser or mobile device.
- Added "Menu Breadth" as one of the IV.
- Validation to the "Next" button so that only when a selected item matches the target item, will the participant be 
  able to go to the next trial.

### Changed
- Changed the initExperiment() trigger to start only after name and trial sample to use have been provided instead of 
  on <body> load.
- Filename of the result csv to contain participant's name, the experiment dataset number and the device type.
- Added participant name and average time taken to perform selection per depth into the result csv.
- Changed the presentation of "Please Select" field to cater for menu depth selection. 
- Resize state container to show "Please Select" field bigger to accommodate long instructions. Removed use of `.cellnext`
  style and `flex-basis:100%` for remaining cells.
- Changed the loading of data from CSV to use promises, prevent race conditions from crashing the experiment. 


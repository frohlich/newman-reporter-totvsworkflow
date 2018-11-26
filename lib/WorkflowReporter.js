var fs = require('fs'),
    xml2js = require('xml2js'),
    WorkflowReporter;

    WorkflowReporter = function (emitter, reporterOptions, collectionRunOptions) {
      //console.log(emitter, reporterOptions, collectionRunOptions);
      // emitter is is an event emitter that triggers the following events: https://github.com/postmanlabs/newman#newmanrunevents
      // reporterOptions is an object of the reporter specific options. See usage examples below for more details.
      // collectionRunOptions is an object of all the collection run options: https://github.com/postmanlabs/newman#newmanrunoptions-object--callback-function--run-eventemitter
      var obj = {name: "Super", Surname: "Man", age: 23}; 
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(obj);

      fs.writeFile('message.txt', xml, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
  };

  module.exports = WorkflowReporter;
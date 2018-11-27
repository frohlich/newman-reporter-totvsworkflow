var _ = require('lodash'),
    builder = require('xmlbuilder'),
    WorkflowReporter;

    WorkflowReporter = function (emitter, reporterOptions, collectionRunOptions) {
        emitter.on('beforeDone', function () {
            var collectionName = _.get(emitter, 'summary.collection.name'),
                executions = _.get(this, 'summary.run.executions'),
                root,
                cache,
                casoTesteNode,
                xmlString;
    

            if (!executions) {
                return;
            }

            console.log("DADOS:");
            //console.log("executions:", executions);

            root = builder.create("Results")
                    .ele("CasoTeste").att("name", collectionName)
                        .ele("Cenarios");

            _.forEach(executions, (request, key, collection) => {                
                let assertions = request.assertions;                
                root = root.ele("Cenario").att("name", request.item.name);
                _.forEach(assertions, (assert) => {
                    console.log("assertion", assert);
                    root = root.ele("Execution")
                        .att("name", assert.assertion)
                        .att("startTime", "")
                        .att("endTime", "")
                        .att("outcome", "")
                        .att("computer", "")
                        .up();
                });
                root = root.up();
            });

            root = root.end({ pretty: true});

            console.log("XML:::::::::::::");
            console.log(root);
            console.log("XML:::::::::::::");
            /*
            //console.log("root", builderXml, builderXml.create);

            // root = builderXml.create('Results', { version: '1.0', encoding: 'UTF-8' });

            
            
            //root.att('name', collection.name);
            //root.att('tests', _.get(newman, 'summary.run.stats.tests.total', 'unknown'));

            cache = _.transform(report, function (accumulator, execution) {
                accumulator[execution.id] = accumulator[execution.id] || [];
                accumulator[execution.id].push(execution);
            }, {});

            console.log(cache);
            console.log("summary", _.get(emitter, 'summary.run.stats.tests.total', 'unknown'));*/
        });
  };

  module.exports = WorkflowReporter;
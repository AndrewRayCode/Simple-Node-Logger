var sys = require('util'),
    logLevels = ['info', 'warn', 'error', 'silent'],
    permissions = {},
    logger = module.exports,
    // Shell color escape codes
    escr ="",
    reset = escr+'[0m',
    // Color array matches logLevels array, starting from 'error'
    colors = {
        error: escr+'[31m',
        warn: escr+'[33m',
        info: escr+'[34m'
    },
    savedLevel;

function canLog(test) {
    // If our log level has changed, build a new permissions cache
    if(savedLevel !== logger.level) {
        savedLevel = logger.level;
        var index = logLevels.indexOf(logger.level);
        for (var x = 0, level; level = logLevels[x]; x++) {
            permissions[level] = (x >= index);
        }
    }
    return permissions[test];
}

// Create a funciton for each level except silent
for(var x = 0, l = logLevels.length - 1; x < l; x++) {
    (function(logLevel) {
        logger[logLevel] = function() {
            // Can we log at this level?
            if(!canLog(logLevel)) {
                return;
            }
            var args = Array.prototype.slice.call(arguments), 
                l = args.length,
                context = logger.sync ?
                    process[logLevel === 'error' || logLevel === 'warn' ? 'stderr' : 'stdout'] :
                    console[logLevel],
                func = logger.sync ? context.write : context;

            // Auto inspect each object passed in
            while(l--) {
                if(args[l] && typeof args[l] == 'object' && args[l].toString() == '[object Object]') {
                    args[l] = sys.inspect(args[l], false, true, !!this.color);
                }
            }
            func.call(context, (logger.color ? (colors[logLevel] || '') + logLevel.toUpperCase() + reset :
                logLevel.toUpperCase()) + ': ' +args.join(' ') + (logger.sync ? '\n' : ''));
        };
    })(logLevels[x]);
}

// Default to colorful warn
logger.level = 'warn';
logger.color = true;
logger.sync = true;

## Simple Node Logger

A logger which colorizes output, auto-inspects objects, and correctly writes to stdout or stderror.
Can be marked as sync (blockingly writes to stdout/err) or async (uses console.log, not synchronous).

### Install:
    npm install simple-logger

### Usage:
    var log = require('simple-logger')

    // Info
    log.info('An informational message!');
    log.warn('A warning!');
    log.error('An error!');

### Options

    log.level
        Set the log level. Anything below the level will not be outputted

        Values: 'error', 'warn', 'info', 'silent'
        Default: 'warn'

    log.sync
        Whether or not to synchronously ouput to stdout/err. Essentially this
        flag switches between console.log and process.stdout.write.

        Default: true

    log.color
        Prints colorful output, and colorizes auto-inspected objects

        Default: true


### Fun Facts:
Log multiple objects in one call!

    log.warn('hello', [1,2,3]);
    May 15:22:33 - WARN: hello 1,2,3

Objects are auto-inspected

    log.warn({foo: 'bar', duck: 'pie'});
    27 May 15:22:53 - WARN: { foo: 'bar', duck: 'pie' }
 
### Neato: 
![Screenshot of colorful logger output](http://andrewray.me/stuff/log-colors.png)

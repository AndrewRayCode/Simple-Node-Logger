## Simple Node Logger

A logger which colorizes output, auto-inspects objects, and correctly writes to stdout or stderror.
Can be marked as sync (blockingly writes to stdout/err) or async (uses console.log, not synchronous).

Why use `sync` vs `async`? Sync gaurantees the call will be outputted. If using `async` and your Node program
crashes unexpectedly, the `console.log` commands may not be executed. I have not done any speed benchmarkings
between the two, though. Disclaimin' that.

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
    WARN: hello 1,2,3

Objects are auto-inspected

    log.warn({foo: 'bar', duck: 'pie'});
    WARN: { foo: 'bar', duck: 'pie' }
 
###: License: 
Simple-Node-Logger is placed in the public domain (http://creativecommons.org/publicdomain/zero/1.0/). 

### Neato: 
![Screenshot of colorful logger output](http://andrewray.me/stuff/log-colors.png)

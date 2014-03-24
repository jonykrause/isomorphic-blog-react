var staticDir = './public';
var logFilePath = './log.log';

// Development
exports.development = function(app, express) {
  app.locals.pretty = true;
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
  app.use(express['static'](staticDir));
};

// Production
exports.production = function(app, express) {
  var oneYear = 31557600000;
  var logFile = fs.createWriteStream(logFilePath, { flags: 'w' });
  app.use(express.compress());
  app.use(express.logger({ stream: logFile }, 'dev'));
  app.use(express['static'](staticDir, { maxAge: oneYear}));
};


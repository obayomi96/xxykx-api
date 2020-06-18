"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _debug = _interopRequireDefault(require("debug"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const log = (0, _debug.default)('dev');
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 4000;
app.use((0, _cors.default)());
app.use((0, _morgan.default)('dev'));
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use(_express.default.static(_path.default.join(__dirname, 'public')));

if (isProduction) {
  app.use((0, _errorhandler.default)());
}

app.get('/', (req, res) => res.status(301).redirect('/api/v1'));
app.use('/api/v1', _routes.default);
app.use('*', (req, res) => res.status(404).json({
  status: res.statusCode,
  error: 'Resource not found. Double check the url and try again'
}));
app.use((err, req, res, next) => {
  if (!isProduction) log(err.stack);
  if (res.headersSent) return next(err);
  return res.status(err.status || 500).json({
    status: res.statusCode,
    error: isProduction ? 'Internal server error' : err.message
  });
});
app.listen(port, () => {
  log(`Running on port ${port}`);
});
var _default = app;
exports.default = _default;
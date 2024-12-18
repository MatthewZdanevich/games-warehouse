(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* ---------- LOGGER ---------- */

const pino = require('pino');
const dayjs = require('dayjs');

const logger = pino({
    level: 'debug',
    browser: {
        asObject: true
    },
    timestamp: () => `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
});

module.exports = logger;
},{"dayjs":2,"pino":3}],2:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e()}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));
},{}],3:[function(require,module,exports){
'use strict'

const format = require('quick-format-unescaped')

module.exports = pino

const _console = pfGlobalThisOrFallback().console || {}
const stdSerializers = {
  mapHttpRequest: mock,
  mapHttpResponse: mock,
  wrapRequestSerializer: passthrough,
  wrapResponseSerializer: passthrough,
  wrapErrorSerializer: passthrough,
  req: mock,
  res: mock,
  err: asErrValue,
  errWithCause: asErrValue
}
function levelToValue (level, logger) {
  return level === 'silent'
    ? Infinity
    : logger.levels.values[level]
}
const baseLogFunctionSymbol = Symbol('pino.logFuncs')
const hierarchySymbol = Symbol('pino.hierarchy')

const logFallbackMap = {
  error: 'log',
  fatal: 'error',
  warn: 'error',
  info: 'log',
  debug: 'log',
  trace: 'log'
}

function appendChildLogger (parentLogger, childLogger) {
  const newEntry = {
    logger: childLogger,
    parent: parentLogger[hierarchySymbol]
  }
  childLogger[hierarchySymbol] = newEntry
}

function setupBaseLogFunctions (logger, levels, proto) {
  const logFunctions = {}
  levels.forEach(level => {
    logFunctions[level] = proto[level] ? proto[level] : (_console[level] || _console[logFallbackMap[level] || 'log'] || noop)
  })
  logger[baseLogFunctionSymbol] = logFunctions
}

function shouldSerialize (serialize, serializers) {
  if (Array.isArray(serialize)) {
    const hasToFilter = serialize.filter(function (k) {
      return k !== '!stdSerializers.err'
    })
    return hasToFilter
  } else if (serialize === true) {
    return Object.keys(serializers)
  }

  return false
}

function pino (opts) {
  opts = opts || {}
  opts.browser = opts.browser || {}

  const transmit = opts.browser.transmit
  if (transmit && typeof transmit.send !== 'function') { throw Error('pino: transmit option must have a send function') }

  const proto = opts.browser.write || _console
  if (opts.browser.write) opts.browser.asObject = true
  const serializers = opts.serializers || {}
  const serialize = shouldSerialize(opts.browser.serialize, serializers)
  let stdErrSerialize = opts.browser.serialize

  if (
    Array.isArray(opts.browser.serialize) &&
    opts.browser.serialize.indexOf('!stdSerializers.err') > -1
  ) stdErrSerialize = false

  const customLevels = Object.keys(opts.customLevels || {})
  const levels = ['error', 'fatal', 'warn', 'info', 'debug', 'trace'].concat(customLevels)

  if (typeof proto === 'function') {
    levels.forEach(function (level) {
      proto[level] = proto
    })
  }
  if (opts.enabled === false || opts.browser.disabled) opts.level = 'silent'
  const level = opts.level || 'info'
  const logger = Object.create(proto)
  if (!logger.log) logger.log = noop

  setupBaseLogFunctions(logger, levels, proto)
  // setup root hierarchy entry
  appendChildLogger({}, logger)

  Object.defineProperty(logger, 'levelVal', {
    get: getLevelVal
  })
  Object.defineProperty(logger, 'level', {
    get: getLevel,
    set: setLevel
  })

  const setOpts = {
    transmit,
    serialize,
    asObject: opts.browser.asObject,
    formatters: opts.browser.formatters,
    levels,
    timestamp: getTimeFunction(opts),
    messageKey: opts.messageKey || 'msg',
    onChild: opts.onChild || noop
  }
  logger.levels = getLevels(opts)
  logger.level = level

  logger.setMaxListeners = logger.getMaxListeners =
  logger.emit = logger.addListener = logger.on =
  logger.prependListener = logger.once =
  logger.prependOnceListener = logger.removeListener =
  logger.removeAllListeners = logger.listeners =
  logger.listenerCount = logger.eventNames =
  logger.write = logger.flush = noop
  logger.serializers = serializers
  logger._serialize = serialize
  logger._stdErrSerialize = stdErrSerialize
  logger.child = function (...args) { return child.call(this, setOpts, ...args) }

  if (transmit) logger._logEvent = createLogEventShape()

  function getLevelVal () {
    return levelToValue(this.level, this)
  }

  function getLevel () {
    return this._level
  }
  function setLevel (level) {
    if (level !== 'silent' && !this.levels.values[level]) {
      throw Error('unknown level ' + level)
    }
    this._level = level

    set(this, setOpts, logger, 'error') // <-- must stay first
    set(this, setOpts, logger, 'fatal')
    set(this, setOpts, logger, 'warn')
    set(this, setOpts, logger, 'info')
    set(this, setOpts, logger, 'debug')
    set(this, setOpts, logger, 'trace')

    customLevels.forEach((level) => {
      set(this, setOpts, logger, level)
    })
  }

  function child (setOpts, bindings, childOptions) {
    if (!bindings) {
      throw new Error('missing bindings for child Pino')
    }
    childOptions = childOptions || {}
    if (serialize && bindings.serializers) {
      childOptions.serializers = bindings.serializers
    }
    const childOptionsSerializers = childOptions.serializers
    if (serialize && childOptionsSerializers) {
      var childSerializers = Object.assign({}, serializers, childOptionsSerializers)
      var childSerialize = opts.browser.serialize === true
        ? Object.keys(childSerializers)
        : serialize
      delete bindings.serializers
      applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize)
    }
    function Child (parent) {
      this._childLevel = (parent._childLevel | 0) + 1

      // make sure bindings are available in the `set` function
      this.bindings = bindings

      if (childSerializers) {
        this.serializers = childSerializers
        this._serialize = childSerialize
      }
      if (transmit) {
        this._logEvent = createLogEventShape(
          [].concat(parent._logEvent.bindings, bindings)
        )
      }
    }
    Child.prototype = this
    const newLogger = new Child(this)

    // must happen before the level is assigned
    appendChildLogger(this, newLogger)
    newLogger.child = function (...args) { return child.call(this, setOpts, ...args) }
    // required to actually initialize the logger functions for any given child
    newLogger.level = childOptions.level || this.level // allow level to be set by childOptions
    setOpts.onChild(newLogger)

    return newLogger
  }
  return logger
}

function getLevels (opts) {
  const customLevels = opts.customLevels || {}

  const values = Object.assign({}, pino.levels.values, customLevels)
  const labels = Object.assign({}, pino.levels.labels, invertObject(customLevels))

  return {
    values,
    labels
  }
}

function invertObject (obj) {
  const inverted = {}
  Object.keys(obj).forEach(function (key) {
    inverted[obj[key]] = key
  })
  return inverted
}

pino.levels = {
  values: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  labels: {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal'
  }
}

pino.stdSerializers = stdSerializers
pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime })

function getBindingChain (logger) {
  const bindings = []
  if (logger.bindings) {
    bindings.push(logger.bindings)
  }

  // traverse up the tree to get all bindings
  let hierarchy = logger[hierarchySymbol]
  while (hierarchy.parent) {
    hierarchy = hierarchy.parent
    if (hierarchy.logger.bindings) {
      bindings.push(hierarchy.logger.bindings)
    }
  }

  return bindings.reverse()
}

function set (self, opts, rootLogger, level) {
  // override the current log functions with either `noop` or the base log function
  Object.defineProperty(self, level, {
    value: (levelToValue(self.level, rootLogger) > levelToValue(level, rootLogger)
      ? noop
      : rootLogger[baseLogFunctionSymbol][level]),
    writable: true,
    enumerable: true,
    configurable: true
  })

  if (self[level] === noop) {
    if (!opts.transmit) return

    const transmitLevel = opts.transmit.level || self.level
    const transmitValue = levelToValue(transmitLevel, rootLogger)
    const methodValue = levelToValue(level, rootLogger)
    if (methodValue < transmitValue) return
  }

  // make sure the log format is correct
  self[level] = createWrap(self, opts, rootLogger, level)

  // prepend bindings if it is not the root logger
  const bindings = getBindingChain(self)
  if (bindings.length === 0) {
    // early exit in case for rootLogger
    return
  }
  self[level] = prependBindingsInArguments(bindings, self[level])
}

function prependBindingsInArguments (bindings, logFunc) {
  return function () {
    return logFunc.apply(this, [...bindings, ...arguments])
  }
}

function createWrap (self, opts, rootLogger, level) {
  return (function (write) {
    return function LOG () {
      const ts = opts.timestamp()
      const args = new Array(arguments.length)
      const proto = (Object.getPrototypeOf && Object.getPrototypeOf(this) === _console) ? _console : this
      for (var i = 0; i < args.length; i++) args[i] = arguments[i]

      var argsIsSerialized = false
      if (opts.serialize) {
        applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize)
        argsIsSerialized = true
      }
      if (opts.asObject || opts.formatters) {
        write.call(proto, asObject(this, level, args, ts, opts))
      } else write.apply(proto, args)

      if (opts.transmit) {
        const transmitLevel = opts.transmit.level || self._level
        const transmitValue = levelToValue(transmitLevel, rootLogger)
        const methodValue = levelToValue(level, rootLogger)
        if (methodValue < transmitValue) return
        transmit(this, {
          ts,
          methodLevel: level,
          methodValue,
          transmitLevel,
          transmitValue: rootLogger.levels.values[opts.transmit.level || self._level],
          send: opts.transmit.send,
          val: levelToValue(self._level, rootLogger)
        }, args, argsIsSerialized)
      }
    }
  })(self[baseLogFunctionSymbol][level])
}

function asObject (logger, level, args, ts, opts) {
  const {
    level: levelFormatter,
    log: logObjectFormatter = (obj) => obj
  } = opts.formatters || {}
  const argsCloned = args.slice()
  let msg = argsCloned[0]
  const logObject = {}
  if (ts) {
    logObject.time = ts
  }

  if (levelFormatter) {
    const formattedLevel = levelFormatter(level, logger.levels.values[level])
    Object.assign(logObject, formattedLevel)
  } else {
    logObject.level = logger.levels.values[level]
  }

  let lvl = (logger._childLevel | 0) + 1
  if (lvl < 1) lvl = 1
  // deliberate, catching objects, arrays
  if (msg !== null && typeof msg === 'object') {
    while (lvl-- && typeof argsCloned[0] === 'object') {
      Object.assign(logObject, argsCloned.shift())
    }
    msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : undefined
  } else if (typeof msg === 'string') msg = format(argsCloned.shift(), argsCloned)
  if (msg !== undefined) logObject[opts.messageKey] = msg

  const formattedLogObject = logObjectFormatter(logObject)
  return formattedLogObject
}

function applySerializers (args, serialize, serializers, stdErrSerialize) {
  for (const i in args) {
    if (stdErrSerialize && args[i] instanceof Error) {
      args[i] = pino.stdSerializers.err(args[i])
    } else if (typeof args[i] === 'object' && !Array.isArray(args[i]) && serialize) {
      for (const k in args[i]) {
        if (serialize.indexOf(k) > -1 && k in serializers) {
          args[i][k] = serializers[k](args[i][k])
        }
      }
    }
  }
}

function transmit (logger, opts, args, argsIsSerialized = false) {
  const send = opts.send
  const ts = opts.ts
  const methodLevel = opts.methodLevel
  const methodValue = opts.methodValue
  const val = opts.val
  const bindings = logger._logEvent.bindings

  if (!argsIsSerialized) {
    applySerializers(
      args,
      logger._serialize || Object.keys(logger.serializers),
      logger.serializers,
      logger._stdErrSerialize === undefined ? true : logger._stdErrSerialize
    )
  }

  logger._logEvent.ts = ts
  logger._logEvent.messages = args.filter(function (arg) {
    // bindings can only be objects, so reference equality check via indexOf is fine
    return bindings.indexOf(arg) === -1
  })

  logger._logEvent.level.label = methodLevel
  logger._logEvent.level.value = methodValue

  send(methodLevel, logger._logEvent, val)

  logger._logEvent = createLogEventShape(bindings)
}

function createLogEventShape (bindings) {
  return {
    ts: 0,
    messages: [],
    bindings: bindings || [],
    level: { label: '', value: 0 }
  }
}

function asErrValue (err) {
  const obj = {
    type: err.constructor.name,
    msg: err.message,
    stack: err.stack
  }
  for (const key in err) {
    if (obj[key] === undefined) {
      obj[key] = err[key]
    }
  }
  return obj
}

function getTimeFunction (opts) {
  if (typeof opts.timestamp === 'function') {
    return opts.timestamp
  }
  if (opts.timestamp === false) {
    return nullTime
  }
  return epochTime
}

function mock () { return {} }
function passthrough (a) { return a }
function noop () {}

function nullTime () { return false }
function epochTime () { return Date.now() }
function unixTime () { return Math.round(Date.now() / 1000.0) }
function isoTime () { return new Date(Date.now()).toISOString() } // using Date.now() for testability

/* eslint-disable */
/* istanbul ignore next */
function pfGlobalThisOrFallback () {
  function defd (o) { return typeof o !== 'undefined' && o }
  try {
    if (typeof globalThis !== 'undefined') return globalThis
    Object.defineProperty(Object.prototype, 'globalThis', {
      get: function () {
        delete Object.prototype.globalThis
        return (this.globalThis = this)
      },
      configurable: true
    })
    return globalThis
  } catch (e) {
    return defd(self) || defd(window) || defd(this) || {}
  }
}
/* eslint-enable */

module.exports.default = pino
module.exports.pino = pino

},{"quick-format-unescaped":4}],4:[function(require,module,exports){
'use strict'
function tryStringify (o) {
  try { return JSON.stringify(o) } catch(e) { return '"[Circular]"' }
}

module.exports = format

function format(f, args, opts) {
  var ss = (opts && opts.stringify) || tryStringify
  var offset = 1
  if (typeof f === 'object' && f !== null) {
    var len = args.length + offset
    if (len === 1) return f
    var objects = new Array(len)
    objects[0] = ss(f)
    for (var index = 1; index < len; index++) {
      objects[index] = ss(args[index])
    }
    return objects.join(' ')
  }
  if (typeof f !== 'string') {
    return f
  }
  var argLen = args.length
  if (argLen === 0) return f
  var str = ''
  var a = 1 - offset
  var lastPos = -1
  var flen = (f && f.length) || 0
  for (var i = 0; i < flen;) {
    if (f.charCodeAt(i) === 37 && i + 1 < flen) {
      lastPos = lastPos > -1 ? lastPos : 0
      switch (f.charCodeAt(i + 1)) {
        case 100: // 'd'
        case 102: // 'f'
          if (a >= argLen)
            break
          if (args[a] == null)  break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += Number(args[a])
          lastPos = i + 2
          i++
          break
        case 105: // 'i'
          if (a >= argLen)
            break
          if (args[a] == null)  break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += Math.floor(Number(args[a]))
          lastPos = i + 2
          i++
          break
        case 79: // 'O'
        case 111: // 'o'
        case 106: // 'j'
          if (a >= argLen)
            break
          if (args[a] === undefined) break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          var type = typeof args[a]
          if (type === 'string') {
            str += '\'' + args[a] + '\''
            lastPos = i + 2
            i++
            break
          }
          if (type === 'function') {
            str += args[a].name || '<anonymous>'
            lastPos = i + 2
            i++
            break
          }
          str += ss(args[a])
          lastPos = i + 2
          i++
          break
        case 115: // 's'
          if (a >= argLen)
            break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += String(args[a])
          lastPos = i + 2
          i++
          break
        case 37: // '%'
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += '%'
          lastPos = i + 2
          i++
          a--
          break
      }
      ++a
    }
    ++i
  }
  if (lastPos === -1)
    return f
  else if (lastPos < flen) {
    str += f.slice(lastPos)
  }

  return str
}

},{}],5:[function(require,module,exports){
/* ---------- CONSTANTS ---------- */

const configuration = {
    rows: 20,
    columns: 10,
    names: ["I", "J", "L", "O", "S", "T", "Z"],
    matrices: {
        "I": [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        "J": [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        "L": [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        "O": [
            [1, 1],
            [1, 1]
        ],
        "S": [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        "T": [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        "Z": [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]
    }
}

module.exports = configuration;
},{}],6:[function(require,module,exports){
/* ---------- GRID ---------- */

const logger = require('../../logger.js');
const configuration = require('./constants.js');

class Grid {

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = Array(configuration.rows).fill().map(() => Array(configuration.columns).fill(0));
        this.cells = document.querySelectorAll("#grid>div");
        logger.info(`The ${rows} by ${columns} grid was created`);
    }

    isMovable(tetramino) {
        return tetramino.matrix.every((row, rowIndex) => {
            return row.every((cell, columnIndex) => {
                if (!cell) return true;
    
                const newRow = tetramino.row + rowIndex;
                const newColumn = tetramino.column + columnIndex;
    
                return (
                    newRow < this.rows &&
                    newColumn >= 0 &&
                    newColumn < this.columns &&
                    (newRow < 0 ? true : this.matrix[newRow][newColumn] === 0)
                );
            });
        });
    }

    isPlaceable(tetramino) {
        return tetramino.matrix.every((row, rowIndex) => {
            return row.every((cell, columnIndex) => {
                if (!cell) return true;
                return (!(tetramino.row + rowIndex < 0));
            });
        });
    }

    placeTetramino(tetramino, gameOver) {
        if (!this.isPlaceable(tetramino)) {
            logger.info(`Unable to place the tetramino "${tetramino.name}"`);
            return gameOver();
        }

        tetramino.matrix.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell) {
                    this.matrix[tetramino.row + rowIndex][tetramino.column + columnIndex] = tetramino.name; 
                }
            });
        });

        logger.debug({ gridMatrix: this.matrix });
        logger.info(`Tetramino "${tetramino.name}" was placed on the grid`);
    
        this.clearFullLines();
    }

    clearFullLines() {
        this.matrix.forEach((row, rowIndex) => {
            if (!row.includes(0)) {
                this.matrix.splice(rowIndex, 1);
                this.matrix.unshift(new Array(10).fill(0));

                logger.debug({ deletedLineIndex: rowIndex });
                logger.debug({ gridMatrix: this.matrix });
                logger.info("One line has been cleared");
            }
        })
    }
}

module.exports = Grid;
},{"../../logger.js":1,"./constants.js":5}],7:[function(require,module,exports){
/* ---------- MAIN SCRIPT ---------- */

const logger = require('../../logger.js');
const Tetris = require('./tetris.js');
const configuration = require('./constants.js');

logger.info("Starting Tetris");

const tetris = new Tetris(configuration);
tetris.startGame();
},{"../../logger.js":1,"./constants.js":5,"./tetris.js":9}],8:[function(require,module,exports){
/* ---------- TETRAMINO ---------- */

const logger = require('../../logger.js');

class Tetramino {

    constructor(name, matrix) {
        this.name = name;
        this.matrix = matrix;
        this.row = -3;
        this.column = 3;
        logger.info(`A new tetramino has been created: "${name}"`);
    }

    rotate() {
        logger.debug({ originaMatrix: this.matrix });
        
        this.matrix = this.matrix[0].map((_, colIndex) =>
            this.matrix.map(row => row[colIndex]).reverse()
        );

        logger.debug({ invertedMatrix: this.matrix });
        logger.info("Tetramino was rotated");
    }

}

module.exports = Tetramino;
},{"../../logger.js":1}],9:[function(require,module,exports){
/* ---------- TETRIS ---------- */

const logger = require('../../logger.js')
const Grid = require('./grid.js');
const Tetramino = require('./tetramino.js');
const configuration = require('./constants.js');

class Tetris {

    constructor(configuration) {
        this.rows = configuration.rows;
        this.columns = configuration.columns;
        this.names = configuration.names;
        this.matrices = configuration.matrices;

        this.tetramino = undefined;
        this.grid = undefined;

        this.timeoutId = undefined;
        this.requestId = undefined;

        logger.info(`The object of a Tetris game with a ${this.rows} x ${this.columns} configuration was created`);
    }

    // TETRAMINO LOGIC

    generateTetramino() {
        const name = this.names[Math.floor(Math.random() * this.names.length)];
        const matrix = this.matrices[name];
        this.tetramino = new Tetramino(name, matrix);
    }

    moveTetramino(direction) {
        const { row, column } = this.tetramino;

        switch(direction) {
            case "down":
                this.tetramino.row++;
                logger.info("Moving the tetramino down");
                break;
            case "right":
                this.tetramino.column++;
                logger.info("Moving the tetramino right");
                break;
            case "left":
                this.tetramino.column--;
                logger.info("Moving the tetramino left");
                break;
        }
    
        if (!this.grid.isMovable(this.tetramino)) {
            logger.info("Movement is blocked");
            this.tetramino.row = (direction === "down" ? row : this.tetramino.row);
            this.tetramino.column = (direction !== "down" ? column : this.tetramino.column);
            
            if (direction === "down") {
                logger.info("Tetramino has reached the lower limit");
                this.grid.placeTetramino(this.tetramino, this.stopGame);
                this.generateTetramino();
            }
        }
    
        this.renderGrid();
        this.renderTetramino();
    
        if (direction === "down") {
            this.stopLoop();
            this.startLoop();
        }
    }

    rotateTetramino() {
        const originalMatrix = this.tetramino.matrix;
        this.tetramino.rotate();
    
        if (!this.grid.isMovable(this.tetramino)) {
            this.tetramino.matrix = originalMatrix;
            logger.info("Rotation is not possible");
            logger.info("Tetramino is back to his original position");
        }
    
        this.renderGrid();
        this.renderTetramino();
    }

    // RENDER LOGIC

    renderTetramino() {
        this.tetramino.matrix.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell && this.tetramino.row + rowIndex >= 0) {
                    const index = (this.tetramino.row + rowIndex) * this.columns + (this.tetramino.column + columnIndex);
                    this.grid.cells[index].classList.add(this.tetramino.name);
                }
            });
        });
    }

    renderGrid() {
        this.grid.cells.forEach(cell => cell.removeAttribute("class"));
        this.grid.matrix.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell) {
                    const index = rowIndex * this.columns + columnIndex;
                    this.grid.cells[index].classList.add(cell);
                }
            })
        })
    }

    // LOOP LOGIC

    startLoop() {
        this.timeoutId = setTimeout(() => {
            this.requestId = requestAnimationFrame(() => this.moveTetramino("down"));
        }, 600);
    }

    stopLoop() {
        cancelAnimationFrame(this.requestId);
        clearTimeout(this.timeoutId);
    }

    // GAME LOGIC

    startGame() {
        logger.info("The game is up and running");

        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "ArrowUp": this.rotateTetramino(); break;
                case "ArrowDown": this.moveTetramino("down"); break;
                case "ArrowLeft": this.moveTetramino("left"); break;
                case "ArrowRight": this.moveTetramino("right"); break;
            }
        });

        this.grid = new Grid(this.rows, this.columns);
        this.generateTetramino();
        this.renderGrid();
        this.renderTetramino();

        this.startLoop();
    }

    stopGame() {
        logger.info("The game is over");
        alert("Game over");
        location.reload();
    }

}

module.exports = Tetris;
},{"../../logger.js":1,"./constants.js":5,"./grid.js":6,"./tetramino.js":8}]},{},[7]);

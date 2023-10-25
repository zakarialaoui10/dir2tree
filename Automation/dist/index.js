var $7d1341245baded19$exports = {};
// shim for using process in browser
var $7d1341245baded19$var$process = $7d1341245baded19$exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var $7d1341245baded19$var$cachedSetTimeout;
var $7d1341245baded19$var$cachedClearTimeout;
function $7d1341245baded19$var$defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function $7d1341245baded19$var$defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") $7d1341245baded19$var$cachedSetTimeout = setTimeout;
        else $7d1341245baded19$var$cachedSetTimeout = $7d1341245baded19$var$defaultSetTimout;
    } catch (e) {
        $7d1341245baded19$var$cachedSetTimeout = $7d1341245baded19$var$defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") $7d1341245baded19$var$cachedClearTimeout = clearTimeout;
        else $7d1341245baded19$var$cachedClearTimeout = $7d1341245baded19$var$defaultClearTimeout;
    } catch (e) {
        $7d1341245baded19$var$cachedClearTimeout = $7d1341245baded19$var$defaultClearTimeout;
    }
})();
function $7d1341245baded19$var$runTimeout(fun) {
    if ($7d1341245baded19$var$cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if (($7d1341245baded19$var$cachedSetTimeout === $7d1341245baded19$var$defaultSetTimout || !$7d1341245baded19$var$cachedSetTimeout) && setTimeout) {
        $7d1341245baded19$var$cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $7d1341245baded19$var$cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return $7d1341245baded19$var$cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return $7d1341245baded19$var$cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function $7d1341245baded19$var$runClearTimeout(marker) {
    if ($7d1341245baded19$var$cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if (($7d1341245baded19$var$cachedClearTimeout === $7d1341245baded19$var$defaultClearTimeout || !$7d1341245baded19$var$cachedClearTimeout) && clearTimeout) {
        $7d1341245baded19$var$cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $7d1341245baded19$var$cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return $7d1341245baded19$var$cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return $7d1341245baded19$var$cachedClearTimeout.call(this, marker);
        }
    }
}
var $7d1341245baded19$var$queue = [];
var $7d1341245baded19$var$draining = false;
var $7d1341245baded19$var$currentQueue;
var $7d1341245baded19$var$queueIndex = -1;
function $7d1341245baded19$var$cleanUpNextTick() {
    if (!$7d1341245baded19$var$draining || !$7d1341245baded19$var$currentQueue) return;
    $7d1341245baded19$var$draining = false;
    if ($7d1341245baded19$var$currentQueue.length) $7d1341245baded19$var$queue = $7d1341245baded19$var$currentQueue.concat($7d1341245baded19$var$queue);
    else $7d1341245baded19$var$queueIndex = -1;
    if ($7d1341245baded19$var$queue.length) $7d1341245baded19$var$drainQueue();
}
function $7d1341245baded19$var$drainQueue() {
    if ($7d1341245baded19$var$draining) return;
    var timeout = $7d1341245baded19$var$runTimeout($7d1341245baded19$var$cleanUpNextTick);
    $7d1341245baded19$var$draining = true;
    var len = $7d1341245baded19$var$queue.length;
    while(len){
        $7d1341245baded19$var$currentQueue = $7d1341245baded19$var$queue;
        $7d1341245baded19$var$queue = [];
        while(++$7d1341245baded19$var$queueIndex < len)if ($7d1341245baded19$var$currentQueue) $7d1341245baded19$var$currentQueue[$7d1341245baded19$var$queueIndex].run();
        $7d1341245baded19$var$queueIndex = -1;
        len = $7d1341245baded19$var$queue.length;
    }
    $7d1341245baded19$var$currentQueue = null;
    $7d1341245baded19$var$draining = false;
    $7d1341245baded19$var$runClearTimeout(timeout);
}
$7d1341245baded19$var$process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    $7d1341245baded19$var$queue.push(new $7d1341245baded19$var$Item(fun, args));
    if ($7d1341245baded19$var$queue.length === 1 && !$7d1341245baded19$var$draining) $7d1341245baded19$var$runTimeout($7d1341245baded19$var$drainQueue);
};
// v8 likes predictible objects
function $7d1341245baded19$var$Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
$7d1341245baded19$var$Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
$7d1341245baded19$var$process.title = "browser";
$7d1341245baded19$var$process.browser = true;
$7d1341245baded19$var$process.env = {};
$7d1341245baded19$var$process.argv = [];
$7d1341245baded19$var$process.version = ""; // empty string to avoid regexp issues
$7d1341245baded19$var$process.versions = {};
function $7d1341245baded19$var$noop() {}
$7d1341245baded19$var$process.on = $7d1341245baded19$var$noop;
$7d1341245baded19$var$process.addListener = $7d1341245baded19$var$noop;
$7d1341245baded19$var$process.once = $7d1341245baded19$var$noop;
$7d1341245baded19$var$process.off = $7d1341245baded19$var$noop;
$7d1341245baded19$var$process.removeListener = $7d1341245baded19$var$noop;
$7d1341245baded19$var$process.removeAllListeners = $7d1341245baded19$var$noop;
$7d1341245baded19$var$process.emit = $7d1341245baded19$var$noop;
$7d1341245baded19$var$process.prependListener = $7d1341245baded19$var$noop;
$7d1341245baded19$var$process.prependOnceListener = $7d1341245baded19$var$noop;
$7d1341245baded19$var$process.listeners = function(name) {
    return [];
};
$7d1341245baded19$var$process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
$7d1341245baded19$var$process.cwd = function() {
    return "/";
};
$7d1341245baded19$var$process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
$7d1341245baded19$var$process.umask = function() {
    return 0;
};


var $c1b234cf9fbd8bad$exports = {};
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";
function $c1b234cf9fbd8bad$var$assertPath(path) {
    if (typeof path !== "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
}
// Resolves . and .. elements in a path with directory names
function $c1b234cf9fbd8bad$var$normalizeStringPosix(path, allowAboveRoot) {
    var res = "";
    var lastSegmentLength = 0;
    var lastSlash = -1;
    var dots = 0;
    var code;
    for(var i = 0; i <= path.length; ++i){
        if (i < path.length) code = path.charCodeAt(i);
        else if (code === 47 /*/*/ ) break;
        else code = 47 /*/*/ ;
        if (code === 47 /*/*/ ) {
            if (lastSlash === i - 1 || dots === 1) ;
            else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/  || res.charCodeAt(res.length - 2) !== 46 /*.*/ ) {
                    if (res.length > 2) {
                        var lastSlashIndex = res.lastIndexOf("/");
                        if (lastSlashIndex !== res.length - 1) {
                            if (lastSlashIndex === -1) {
                                res = "";
                                lastSegmentLength = 0;
                            } else {
                                res = res.slice(0, lastSlashIndex);
                                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                            }
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += "/..";
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += "/" + path.slice(lastSlash + 1, i);
                else res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 /*.*/  && dots !== -1) ++dots;
        else dots = -1;
    }
    return res;
}
function $c1b234cf9fbd8bad$var$_format(sep, pathObject) {
    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base;
    if (dir === pathObject.root) return dir + base;
    return dir + sep + base;
}
var $c1b234cf9fbd8bad$var$posix = {
    // path.resolve([from ...], to)
    resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for(var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--){
            var path;
            if (i >= 0) path = arguments[i];
            else {
                if (cwd === undefined) cwd = $7d1341245baded19$exports.cwd();
                path = cwd;
            }
            $c1b234cf9fbd8bad$var$assertPath(path);
            // Skip empty entries
            if (path.length === 0) continue;
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/ ;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = $c1b234cf9fbd8bad$var$normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
            if (resolvedPath.length > 0) return "/" + resolvedPath;
            else return "/";
        } else if (resolvedPath.length > 0) return resolvedPath;
        else return ".";
    },
    normalize: function normalize(path) {
        $c1b234cf9fbd8bad$var$assertPath(path);
        if (path.length === 0) return ".";
        var isAbsolute = path.charCodeAt(0) === 47 /*/*/ ;
        var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/ ;
        // Normalize the path
        path = $c1b234cf9fbd8bad$var$normalizeStringPosix(path, !isAbsolute);
        if (path.length === 0 && !isAbsolute) path = ".";
        if (path.length > 0 && trailingSeparator) path += "/";
        if (isAbsolute) return "/" + path;
        return path;
    },
    isAbsolute: function isAbsolute(path) {
        $c1b234cf9fbd8bad$var$assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === 47 /*/*/ ;
    },
    join: function join() {
        if (arguments.length === 0) return ".";
        var joined;
        for(var i = 0; i < arguments.length; ++i){
            var arg = arguments[i];
            $c1b234cf9fbd8bad$var$assertPath(arg);
            if (arg.length > 0) {
                if (joined === undefined) joined = arg;
                else joined += "/" + arg;
            }
        }
        if (joined === undefined) return ".";
        return $c1b234cf9fbd8bad$var$posix.normalize(joined);
    },
    relative: function relative(from, to) {
        $c1b234cf9fbd8bad$var$assertPath(from);
        $c1b234cf9fbd8bad$var$assertPath(to);
        if (from === to) return "";
        from = $c1b234cf9fbd8bad$var$posix.resolve(from);
        to = $c1b234cf9fbd8bad$var$posix.resolve(to);
        if (from === to) return "";
        // Trim any leading backslashes
        var fromStart = 1;
        for(; fromStart < from.length; ++fromStart){
            if (from.charCodeAt(fromStart) !== 47 /*/*/ ) break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        var toStart = 1;
        for(; toStart < to.length; ++toStart){
            if (to.charCodeAt(toStart) !== 47 /*/*/ ) break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for(; i <= length; ++i){
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === 47 /*/*/ ) // We get here if `from` is the exact base path for `to`.
                    // For example: from='/foo/bar'; to='/foo/bar/baz'
                    return to.slice(toStart + i + 1);
                    else if (i === 0) // We get here if `from` is the root
                    // For example: from='/'; to='/foo'
                    return to.slice(toStart + i);
                } else if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === 47 /*/*/ ) // We get here if `to` is the exact base path for `from`.
                    // For example: from='/foo/bar/baz'; to='/foo/bar'
                    lastCommonSep = i;
                    else if (i === 0) // We get here if `to` is the root.
                    // For example: from='/foo'; to='/'
                    lastCommonSep = 0;
                }
                break;
            }
            var fromCode = from.charCodeAt(fromStart + i);
            var toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode) break;
            else if (fromCode === 47 /*/*/ ) lastCommonSep = i;
        }
        var out = "";
        // Generate the relative path based on the path difference between `to`
        // and `from`
        for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i)if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/ ) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
        else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === 47 /*/*/ ) ++toStart;
            return to.slice(toStart);
        }
    },
    _makeLong: function _makeLong(path) {
        return path;
    },
    dirname: function dirname(path) {
        $c1b234cf9fbd8bad$var$assertPath(path);
        if (path.length === 0) return ".";
        var code = path.charCodeAt(0);
        var hasRoot = code === 47 /*/*/ ;
        var end = -1;
        var matchedSlash = true;
        for(var i = path.length - 1; i >= 1; --i){
            code = path.charCodeAt(i);
            if (code === 47 /*/*/ ) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            } else // We saw the first non-path separator
            matchedSlash = false;
        }
        if (end === -1) return hasRoot ? "/" : ".";
        if (hasRoot && end === 1) return "//";
        return path.slice(0, end);
    },
    basename: function basename(path, ext) {
        if (ext !== undefined && typeof ext !== "string") throw new TypeError('"ext" argument must be a string');
        $c1b234cf9fbd8bad$var$assertPath(path);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path) return "";
            var extIdx = ext.length - 1;
            var firstNonSlashEnd = -1;
            for(i = path.length - 1; i >= 0; --i){
                var code = path.charCodeAt(i);
                if (code === 47 /*/*/ ) // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                } else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) // We matched the extension, so mark this as the end of our path
                            // component
                            end = i;
                        } else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end) end = firstNonSlashEnd;
            else if (end === -1) end = path.length;
            return path.slice(start, end);
        } else {
            for(i = path.length - 1; i >= 0; --i){
                if (path.charCodeAt(i) === 47 /*/*/ ) // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                } else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1) return "";
            return path.slice(start, end);
        }
    },
    extname: function extname(path) {
        $c1b234cf9fbd8bad$var$assertPath(path);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        var preDotState = 0;
        for(var i = path.length - 1; i >= 0; --i){
            var code = path.charCodeAt(i);
            if (code === 47 /*/*/ ) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === 46 /*.*/ ) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return "";
        return path.slice(startDot, end);
    },
    format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        return $c1b234cf9fbd8bad$var$_format("/", pathObject);
    },
    parse: function parse(path) {
        $c1b234cf9fbd8bad$var$assertPath(path);
        var ret = {
            root: "",
            dir: "",
            base: "",
            ext: "",
            name: ""
        };
        if (path.length === 0) return ret;
        var code = path.charCodeAt(0);
        var isAbsolute = code === 47 /*/*/ ;
        var start;
        if (isAbsolute) {
            ret.root = "/";
            start = 1;
        } else start = 0;
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        var preDotState = 0;
        // Get non-dir info
        for(; i >= start; --i){
            code = path.charCodeAt(i);
            if (code === 47 /*/*/ ) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === 46 /*.*/ ) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            if (end !== -1) {
                if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);
                else ret.base = ret.name = path.slice(startPart, end);
            }
        } else {
            if (startPart === 0 && isAbsolute) {
                ret.name = path.slice(1, startDot);
                ret.base = path.slice(1, end);
            } else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
            }
            ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute) ret.dir = "/";
        return ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
};
$c1b234cf9fbd8bad$var$posix.posix = $c1b234cf9fbd8bad$var$posix;
$c1b234cf9fbd8bad$exports = $c1b234cf9fbd8bad$var$posix;


var $4689e476d2940772$exports = {};
var $dc16d1b62e696a52$exports = {};
"use strict";



var $4e3aa413eb514583$exports = {};
/*
Developped by zakaria elaloui
Github : https://github.com/zakarialaoui10
*/ function $4e3aa413eb514583$var$flat_obj(obj, depth = Infinity, separator = ".", replacement = "_") {
    const result = {};
    let i = 0;
    function recurse(current, path = []) {
        if (i === depth) {
            Object.assign(result, current);
            return;
        }
        for(const key in current){
            const value = current[key];
            const newPath = [
                ...path,
                key
            ];
            if (typeof value === "object" && !Array.isArray(value)) recurse(value, newPath);
            else {
                const flatKey = newPath.join(separator).replace(new RegExp(`\\${separator}`, "g"), replacement);
                result[flatKey] = value;
            }
            i++;
        }
    }
    recurse(obj);
    return result;
}
const $4e3aa413eb514583$var$mapfun = (fun, { skip: skip = [], key: key = false, value: value = true } = {}, ...X)=>{
    const Y = X.map((x)=>{
        if (typeof skip === "string" || [
            null,
            undefined
        ].includes(skip)) skip = [
            skip
        ];
        const skipPrimitives = [];
        const skipObjects = [];
        skip.forEach((element)=>typeof element === "object" && element !== null ? skipObjects.push(element) : skipPrimitives.push(element));
        if (skipPrimitives.includes(typeof x) || skipPrimitives.includes(x)) return x;
        if (skipObjects.some((n)=>x instanceof n)) return x;
        if (x === null) return fun(null);
        if ([
            "number",
            "string",
            "boolean",
            "bigint",
            "undefined"
        ].includes(typeof x)) return fun(x);
        if (typeof x === "symbol") throw new Error("symbols are not supported yet !");
        if (x instanceof Array) return x.map((n)=>$4e3aa413eb514583$var$mapfun(fun, {}, n));
        if (ArrayBuffer.isView(x)) return Array.from(x).map((n)=>fun(n));
        if (x instanceof Set) return new Set($4e3aa413eb514583$var$mapfun(fun, {}, ...[
            ...x
        ]));
        if (x instanceof WeakSet) throw new Error("WeakSets not supported yet !");
        if (x instanceof WeakMap) throw new Error("WeakMaps not supported yet !");
        if (x instanceof Map) return new Map([
            ...x
        ].map((n)=>{
            return [
                key ? $4e3aa413eb514583$var$mapfun(fun, {}, n[0]) : n[0],
                value ? $4e3aa413eb514583$var$mapfun(fun, {}, n[1]) : n[1]
            ];
        }));
        if (x instanceof Object) return Object.fromEntries(Object.entries(x).map(([KEY, VALUE])=>[
                key ? $4e3aa413eb514583$var$mapfun(fun, {}, KEY) : KEY,
                value ? $4e3aa413eb514583$var$mapfun(fun, {}, VALUE) : VALUE
            ]));
        else throw new Error("Uncategorised data");
    });
    return Y.length === 1 ? Y[0] : Y;
};
$4e3aa413eb514583$exports = {
    mapfun: $4e3aa413eb514583$var$mapfun,
    flat_obj: $4e3aa413eb514583$var$flat_obj
};


var $4689e476d2940772$require$mapfun = $4e3aa413eb514583$exports.mapfun;
var $4689e476d2940772$require$flat_obj = $4e3aa413eb514583$exports.flat_obj;
var $11c37dfd1d22855c$exports = {};

function $11c37dfd1d22855c$var$should_skip_file(filePath) {
    const normalizedPath = $c1b234cf9fbd8bad$exports.normalize(filePath);
    if (this?.options?.skip?.folder?.includes($c1b234cf9fbd8bad$exports.basename(normalizedPath)) || this?.options?.skip?.file?.includes($c1b234cf9fbd8bad$exports.basename(normalizedPath)) || this?.options?.skip?.extension?.includes($c1b234cf9fbd8bad$exports.extname(normalizedPath).slice(1))) return true;
    return false;
}
function $11c37dfd1d22855c$var$should_skip_folder(filePath) {
    if (typeof filePath !== "string") return false;
    const normalizedPath = $c1b234cf9fbd8bad$exports.normalize(filePath);
    if (this?.options?.skipFolder?.includes($c1b234cf9fbd8bad$exports.basename(normalizedPath))) return true;
    return false;
}
$11c37dfd1d22855c$exports = {
    should_skip_file: $11c37dfd1d22855c$var$should_skip_file,
    should_skip_folder: $11c37dfd1d22855c$var$should_skip_folder
};


var $4689e476d2940772$require$should_skip_file = $11c37dfd1d22855c$exports.should_skip_file;
var $4689e476d2940772$require$should_skip_folder = $11c37dfd1d22855c$exports.should_skip_folder;
var $3c7e371106a14038$exports = {};


var $3be09a6c38638de4$exports = {};


function $3be09a6c38638de4$var$is_directory(filePath) {
    return $dc16d1b62e696a52$exports.statSync(filePath).isDirectory();
}
function $3be09a6c38638de4$var$add_to_tree(key, value) {
    const keys = key.split($c1b234cf9fbd8bad$exports.sep);
    const lastKeyIndex = keys.length - 1;
    keys.reduce((subtree, currentKey, index)=>{
        if (!subtree[currentKey]) subtree[currentKey] = index === lastKeyIndex ? value : {};
        return subtree[currentKey];
    }, this.tree);
}
$3be09a6c38638de4$exports = {
    is_directory: $3be09a6c38638de4$var$is_directory,
    add_to_tree: $3be09a6c38638de4$var$add_to_tree
};


var $3c7e371106a14038$require$is_directory = $3be09a6c38638de4$exports.is_directory;
function $3c7e371106a14038$var$sort_files(files, order = 1) {
    return files.sort((a, b)=>{
        const filePathA = $c1b234cf9fbd8bad$exports.join(this.root, a);
        const filePathB = $c1b234cf9fbd8bad$exports.join(this.root, b);
        // Check if either of the files is a directory and handle accordingly
        const isDirectoryA = $3c7e371106a14038$require$is_directory(filePathA);
        const isDirectoryB = $3c7e371106a14038$require$is_directory(filePathB);
        if (isDirectoryA && !isDirectoryB) return -1; // Directories come before files
        else if (!isDirectoryA && isDirectoryB) return 1; // Files come after directories
        if (isDirectoryA && isDirectoryB) return a.localeCompare(b); // Sort directories by name
        // If both are files, perform the sorting based on your criteria
        const statsA = $dc16d1b62e696a52$exports.statSync(filePathA);
        const statsB = $dc16d1b62e696a52$exports.statSync(filePathB);
        const extensionA = $c1b234cf9fbd8bad$exports.extname(filePathA).slice(1);
        const extensionB = $c1b234cf9fbd8bad$exports.extname(filePathB).slice(1);
        const linesA = $dc16d1b62e696a52$exports.readFileSync(filePathA, "utf8").split("\n").length;
        const linesB = $dc16d1b62e696a52$exports.readFileSync(filePathB, "utf8").split("\n").length;
        // Customize sorting based on sortBy option (name, size, created, modified, extension, lines, path, etc.)
        switch(this.sortBy.toLowerCase()){
            case "name":
                return order * a.localeCompare(b);
            case "size":
                return order * (statsA.size - statsB.size);
            case "created":
                return order * (statsA.birthtime - statsB.birthtime);
            case "modified":
                return order * (statsA.mtime.getTime() - statsB.mtime.getTime());
            case "extension":
                return order * extensionA.localeCompare(extensionB);
            case "lines":
                return order * (linesA - linesB);
            case "path":
                return order * filePathB.localeCompare(filePathA);
            default:
                return 0;
        }
    });
}
$3c7e371106a14038$exports = {
    sort_files: $3c7e371106a14038$var$sort_files
};


var $4689e476d2940772$require$sort_files = $3c7e371106a14038$exports.sort_files;
var $09c9632d2fd03952$exports = {};


var $09c9632d2fd03952$require$is_directory = $3be09a6c38638de4$exports.is_directory;

var $09c9632d2fd03952$require$should_skip_file = $11c37dfd1d22855c$exports.should_skip_file;
function $09c9632d2fd03952$var$filter_files(files) {
    return files.filter((file)=>{
        if ($09c9632d2fd03952$require$is_directory($c1b234cf9fbd8bad$exports.join(this.root, file))) return true; // Skip directories
        const filePath = $c1b234cf9fbd8bad$exports.join(this.root, file);
        const shouldSkip = $09c9632d2fd03952$require$should_skip_file.call(this, filePath);
        return !shouldSkip;
    });
}
$09c9632d2fd03952$exports = {
    filter_files: $09c9632d2fd03952$var$filter_files
};


var $4689e476d2940772$require$filter_files = $09c9632d2fd03952$exports.filter_files;

var $4689e476d2940772$require$add_to_tree = $3be09a6c38638de4$exports.add_to_tree;
var $9ebef2c1b6a31312$exports = {};

function $9ebef2c1b6a31312$var$file_metadata(filePath) {
    const stats = $dc16d1b62e696a52$exports.statSync(filePath);
    const metadata = {
        created: stats.birthtime,
        modified: stats.mtime,
        permissions: stats.mode
    };
    return metadata;
}
$9ebef2c1b6a31312$exports = {
    file_metadata: $9ebef2c1b6a31312$var$file_metadata
};


var $4689e476d2940772$require$file_metadata = $9ebef2c1b6a31312$exports.file_metadata;
class $4689e476d2940772$var$Dir2Tree {
    constructor(root, options = {}, callbacks = {}){
        this.root = root;
        this.options = options;
        this.callbacks = callbacks;
        this.tree = {};
        this.sortBy = options.sortBy || "name";
        this.generate();
    }
    generate() {
        const stats = $dc16d1b62e696a52$exports.statSync(this.root);
        if (!stats.isDirectory()) return null;
        const files = $dc16d1b62e696a52$exports.readdirSync(this.root);
        const FILTRED_FILES = $4689e476d2940772$require$filter_files.call(this, files);
        const SORTED_FILES = $4689e476d2940772$require$sort_files.call(this, FILTRED_FILES);
        SORTED_FILES.forEach((file)=>{
            const filePath = $c1b234cf9fbd8bad$exports.join(this.root, file);
            if ($4689e476d2940772$require$should_skip_folder.call(this, file)) return;
            const fileStats = $dc16d1b62e696a52$exports.statSync(filePath);
            if (fileStats.isDirectory()) {
                const subDirectory = new $4689e476d2940772$var$Dir2Tree(filePath, this.options, this.callbacks);
                Object.assign(this.tree, {
                    [$c1b234cf9fbd8bad$exports.basename(filePath)]: subDirectory.tree
                });
                return this;
            }
            const fileName = $c1b234cf9fbd8bad$exports.parse(file).name;
            if ($4689e476d2940772$require$should_skip_file.call(this, filePath)) return;
            if (this.options?.fileContent) this.addFileInfo(filePath, fileName);
        });
        //this.tree=tree;
        return this.tree;
    }
    addFileInfo(filePath, fileName) {
        const content = $dc16d1b62e696a52$exports.readFileSync(filePath, "utf8");
        const fileInfo = {};
        const stats = {};
        const fullName = $c1b234cf9fbd8bad$exports.basename(filePath);
        const [name, extension] = fullName.split(".");
        const length = $dc16d1b62e696a52$exports.statSync(filePath).size;
        const lines = content.split("\n").length;
        const metadata = $4689e476d2940772$require$file_metadata.call(this, filePath);
        if (this.options?.fileContent) Object.assign(fileInfo, {
            content: content
        });
        if (this.options?.fileExtension) Object.assign(fileInfo, {
            extension: extension
        });
        if (this.options?.fileName) Object.assign(fileInfo, {
            name: name
        });
        Object.assign(stats, {
            length: length
        });
        Object.assign(stats, {
            size: length / 1024
        });
        Object.assign(stats, {
            lines: lines
        });
        Object.assign(fileInfo, {
            stats: stats
        });
        Object.assign(fileInfo, {
            metadata: metadata
        });
        this?.callbacks?.map((n)=>n(filePath, fileInfo));
        $4689e476d2940772$require$add_to_tree.call(this, fileName + "_" + extension, fileInfo);
    }
    write(Target, filename) {
        const jsonTree = JSON.stringify(this.tree, null, 2); // Pretty-print the JSON
        const filePath = $c1b234cf9fbd8bad$exports.join(Target, filename); // Construct the file path
        $dc16d1b62e696a52$exports.writeFileSync(filePath, jsonTree, "utf8");
        console.log(`Tree written to ${filePath}`);
        return this;
    }
    flat(depth = 1, separator = "_") {
        this.tree = $4689e476d2940772$require$flat_obj(this.tree, depth, separator);
        return this;
    }
    reduce() {
        return this;
    }
    sort() {
        return this;
    }
    filter() {
        return this;
    }
    map(callback, options = {}) {
        this.tree = $4689e476d2940772$require$mapfun(callback, options, this.tree);
        return this;
    }
}
const $4689e476d2940772$var$dir2tree = (root, options, callbacks = [])=>new $4689e476d2940772$var$Dir2Tree(root, options, callbacks);
$4689e476d2940772$exports = $4689e476d2940772$var$dir2tree;


const $85a97f174adb3515$var$ROOT = $c1b234cf9fbd8bad$exports.join($7d1341245baded19$exports.cwd(), ".", "Articles");
const $85a97f174adb3515$var$TARGET = $c1b234cf9fbd8bad$exports.join($7d1341245baded19$exports.cwd(), "Target");
console.log({
    ROOT: $85a97f174adb3515$var$ROOT,
    TARGET: $85a97f174adb3515$var$TARGET
});
const $85a97f174adb3515$var$MyTree = $4689e476d2940772$exports($85a97f174adb3515$var$ROOT, {
    fileContent: true,
    sortBy: "extension",
    skipFile: [
        "ger.md"
    ],
    skipFolder: [
        "to be skipped"
    ],
    skipExtension: [
        "sd"
    ]
});
console.log($85a97f174adb3515$var$MyTree.tree);
$85a97f174adb3515$var$MyTree.write($7d1341245baded19$exports.cwd(), "generated.json");



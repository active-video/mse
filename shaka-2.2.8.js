var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.isDef = function (a) {
    return void 0 !== a
};
goog.exportPath_ = function (a, b, c) {
    a = a.split(".");
    c = c || goog.global;
    a[0] in c || !c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
};
goog.define = function (a, b) {
    var c = b;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
    goog.exportPath_(a, c)
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !0;
goog.provide = function (a) {
    if (!COMPILED) {
        if (goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
        delete goog.implicitNamespaces_[a];
        for (var b = a; (b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) goog.implicitNamespaces_[b] = !0
    }
    goog.exportPath_(a)
};
goog.forwardDeclare = function (a) {
};
COMPILED || (goog.isProvided_ = function (a) {
    return !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a))
}, goog.implicitNamespaces_ = {});
goog.getObjectByName = function (a, b) {
    for (var c = a.split("."), d = b || goog.global, e; e = c.shift();) if (goog.isDefAndNotNull(d[e])) d = d[e]; else return null;
    return d
};
goog.globalize = function (a, b) {
    var c = b || goog.global, d;
    for (d in a) c[d] = a[d]
};
goog.addDependency = function (a, b, c) {
    if (goog.DEPENDENCIES_ENABLED) {
        var d;
        a = a.replace(/\\/g, "/");
        for (var e = goog.dependencies_, f = 0; d = b[f]; f++) e.nameToPath[d] = a;
        for (d = 0; b = c[d]; d++) a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0
    }
};
goog.ENABLE_DEBUG_LOADER = !1;
goog.logToConsole_ = function (a) {
    goog.global.console && goog.global.console.error(a)
};
goog.require = function (a) {
    if (!COMPILED) {
        if (goog.isProvided_(a)) return null;
        if (goog.ENABLE_DEBUG_LOADER) {
            var b = goog.getPathFromDeps_(a);
            if (b) return goog.included_[b] = !0, goog.writeScripts_(), null
        }
        a = "goog.require could not find: " + a;
        goog.logToConsole_(a);
        throw Error(a);
    }
};
goog.basePath = "";
goog.global.CLOSURE_NO_DEPS = !0;
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED && (goog.included_ = {}, goog.dependencies_ = {
    nameToPath: {},
    requires: {},
    visited: {},
    written: {}
}, goog.inHtmlDocument_ = function () {
    var a = goog.global.document;
    return "undefined" != typeof a && "write" in a
}, goog.findBasePath_ = function () {
    if (goog.global.CLOSURE_BASE_PATH) goog.basePath = goog.global.CLOSURE_BASE_PATH; else if (goog.inHtmlDocument_()) for (var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1; 0 <= b; --b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if ("base.js" ==
            c.substr(d - 7, 7)) {
            goog.basePath = c.substr(0, d - 7);
            break
        }
    }
}, goog.importScript_ = function (a, b) {
    (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0)
}, goog.writeScriptTag_ = function (a, b) {
    if (goog.inHtmlDocument_()) {
        var c = goog.global.document;
        if ("complete" == c.readyState) {
            if (/\bdeps.js$/.test(a)) return !1;
            throw Error('Cannot write "' + a + '" after document load');
        }
        void 0 === b ? c.write('<script type="text/javascript" src="' + a + '">\x3c/script>') : c.write('<script type="text/javascript">' +
            b + "\x3c/script>");
        return !0
    }
    return !1
}, goog.writeScripts_ = function () {
    function a(e) {
        if (!(e in d.written)) {
            if (!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) for (var f in d.requires[e]) if (!goog.isProvided_(f)) if (f in d.nameToPath) a(d.nameToPath[f]); else throw Error("Undefined nameToPath for " + f);
            e in c || (c[e] = !0, b.push(e))
        }
    }

    var b = [], c = {}, d = goog.dependencies_;
    for (f in goog.included_) d.written[f] || a(f);
    for (var e = 0; e < b.length; e++) {
        var f = b[e];
        goog.dependencies_.written[f] = !0
    }
    for (e = 0; e < b.length; e++) (f =
        b[e]) && goog.importScript_(goog.basePath + f)
}, goog.getPathFromDeps_ = function (a) {
    return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.isDefAndNotNull = function (a) {
    return null != a
};
goog.isString = function (a) {
    return "string" == typeof a
};
goog.exportSymbol = function (a, b, c) {
    goog.exportPath_(a, b, c)
};
goog.exportProperty = function (a, b, c) {
    a[b] = c
};
goog.inherits = function (a, b) {
    function c() {
    }

    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function (a, c, f) {
        var d = Array.prototype.slice.call(arguments, 2);
        return b.prototype[c].apply(a, d)
    }
};
COMPILED || (goog.global.COMPILED = COMPILED);
/*

 Copyright 2016 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = !0;
goog.asserts.assert = function () {
};
goog.asserts.patchAssert_ = function () {
    var a = console.assert;
    a ? a.bind || (console.assert = function () {
        a.apply(console, arguments)
    }) : console.assert = function () {
    }
};
goog.asserts.ENABLE_ASSERTS && (goog.asserts.patchAssert_(), goog.asserts.assert = console.assert.bind(console));
var shaka = {abr: {}};
shaka.abr.Ewma = function (a) {
    goog.asserts.assert(0 < a, "expected halfLife to be positive");
    this.alpha_ = Math.exp(Math.log(.5) / a);
    this.totalWeight_ = this.estimate_ = 0
};
shaka.abr.Ewma.prototype.sample = function (a, b) {
    var c = Math.pow(this.alpha_, a), c = b * (1 - c) + c * this.estimate_;
    isNaN(c) || (this.estimate_ = c, this.totalWeight_ += a)
};
shaka.abr.Ewma.prototype.getEstimate = function () {
    return this.estimate_ / (1 - Math.pow(this.alpha_, this.totalWeight_))
};
shaka.abr.EwmaBandwidthEstimator = function () {
    this.fast_ = new shaka.abr.Ewma(2);
    this.slow_ = new shaka.abr.Ewma(5);
    this.bytesSampled_ = 0;
    this.minTotalBytes_ = 128E3;
    this.minBytes_ = 16E3
};
shaka.abr.EwmaBandwidthEstimator.prototype.sample = function (a, b) {
    if (!(b < this.minBytes_)) {
        var c = 8E3 * b / a, d = a / 1E3;
        this.bytesSampled_ += b;
        this.fast_.sample(d, c);
        this.slow_.sample(d, c)
    }
};
shaka.abr.EwmaBandwidthEstimator.prototype.getBandwidthEstimate = function (a) {
    return this.bytesSampled_ < this.minTotalBytes_ ? a : Math.min(this.fast_.getEstimate(), this.slow_.getEstimate())
};
shaka.abr.EwmaBandwidthEstimator.prototype.hasGoodEstimate = function () {
    return this.bytesSampled_ >= this.minTotalBytes_
};
shaka.log = {};
shaka.log.Level = {NONE: 0, ERROR: 1, WARNING: 2, INFO: 3, DEBUG: 4, V1: 5, V2: 6};
shaka.log.MAX_LOG_LEVEL = 4;
shaka.log.alwaysWarn = function () {
};
shaka.log.error = function () {
};
shaka.log.warning = function () {
};
shaka.log.info = function () {
};
shaka.log.debug = function () {
};
shaka.log.v1 = function () {
};
shaka.log.v2 = function () {
};
window.console && window.console.log.bind && (shaka.log.alwaysWarn = console.warn.bind(console), goog.DEBUG ? (shaka.log.setLevel = function (a) {
        var b = function () {
        }, c = shaka.log, d = shaka.log.Level;
        shaka.log.currentLevel = a;
        c.error = a >= d.ERROR ? console.error.bind(console) : b;
        c.warning = a >= d.WARNING ? console.warn.bind(console) : b;
        c.info = a >= d.INFO ? console.info.bind(console) : b;
        c.debug = a >= d.DEBUG ? console.log.bind(console) : b;
        c.v1 = a >= d.V1 ? console.debug.bind(console) : b;
        c.v2 = a >= d.V2 ? console.debug.bind(console) : b
    }, shaka.log.setLevel(shaka.log.MAX_LOG_LEVEL)) :
    (shaka.log.MAX_LOG_LEVEL >= shaka.log.Level.ERROR && (shaka.log.error = console.error.bind(console)), shaka.log.MAX_LOG_LEVEL >= shaka.log.Level.WARNING && (shaka.log.warning = console.warn.bind(console)), shaka.log.MAX_LOG_LEVEL >= shaka.log.Level.INFO && (shaka.log.info = console.info.bind(console)), shaka.log.MAX_LOG_LEVEL >= shaka.log.Level.DEBUG && (shaka.log.debug = console.log.bind(console)), shaka.log.MAX_LOG_LEVEL >= shaka.log.Level.V1 && (shaka.log.v1 = console.debug.bind(console)), shaka.log.MAX_LOG_LEVEL >= shaka.log.Level.V2 &&
    (shaka.log.v2 = console.debug.bind(console))));
shaka.util = {};
shaka.util.Error = function (a, b, c, d) {
    this.severity = a;
    this.category = b;
    this.code = c;
    this.data = Array.prototype.slice.call(arguments, 3);
    this.handled = !1;
    if (goog.DEBUG) {
        var e = "UNKNOWN", f = "UNKNOWN", g;
        for (g in shaka.util.Error.Category) shaka.util.Error.Category[g] == this.category && (e = g);
        for (g in shaka.util.Error.Code) shaka.util.Error.Code[g] == this.code && (f = g);
        this.message = "Shaka Error " + e + "." + f + " (" + this.data.toString() + ")";
        try {
            throw Error(this.message);
        } catch (h) {
            this.stack = h.stack
        }
    }
};
goog.exportSymbol("shaka.util.Error", shaka.util.Error);
shaka.util.Error.prototype.toString = function () {
    return "shaka.util.Error " + JSON.stringify(this, null, "  ")
};
shaka.util.Error.Severity = {RECOVERABLE: 1, CRITICAL: 2};
goog.exportProperty(shaka.util.Error, "Severity", shaka.util.Error.Severity);
shaka.util.Error.Category = {
    NETWORK: 1,
    TEXT: 2,
    MEDIA: 3,
    MANIFEST: 4,
    STREAMING: 5,
    DRM: 6,
    PLAYER: 7,
    CAST: 8,
    STORAGE: 9
};
goog.exportProperty(shaka.util.Error, "Category", shaka.util.Error.Category);
shaka.util.Error.Code = {
    UNSUPPORTED_SCHEME: 1E3,
    BAD_HTTP_STATUS: 1001,
    HTTP_ERROR: 1002,
    TIMEOUT: 1003,
    MALFORMED_DATA_URI: 1004,
    UNKNOWN_DATA_URI_ENCODING: 1005,
    REQUEST_FILTER_ERROR: 1006,
    RESPONSE_FILTER_ERROR: 1007,
    INVALID_TEXT_HEADER: 2E3,
    INVALID_TEXT_CUE: 2001,
    UNABLE_TO_DETECT_ENCODING: 2003,
    BAD_ENCODING: 2004,
    INVALID_XML: 2005,
    INVALID_MP4_TTML: 2007,
    INVALID_MP4_VTT: 2008,
    BUFFER_READ_OUT_OF_BOUNDS: 3E3,
    JS_INTEGER_OVERFLOW: 3001,
    EBML_OVERFLOW: 3002,
    EBML_BAD_FLOATING_POINT_SIZE: 3003,
    MP4_SIDX_WRONG_BOX_TYPE: 3004,
    MP4_SIDX_INVALID_TIMESCALE: 3005,
    MP4_SIDX_TYPE_NOT_SUPPORTED: 3006,
    WEBM_CUES_ELEMENT_MISSING: 3007,
    WEBM_EBML_HEADER_ELEMENT_MISSING: 3008,
    WEBM_SEGMENT_ELEMENT_MISSING: 3009,
    WEBM_INFO_ELEMENT_MISSING: 3010,
    WEBM_DURATION_ELEMENT_MISSING: 3011,
    WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING: 3012,
    WEBM_CUE_TIME_ELEMENT_MISSING: 3013,
    MEDIA_SOURCE_OPERATION_FAILED: 3014,
    MEDIA_SOURCE_OPERATION_THREW: 3015,
    VIDEO_ERROR: 3016,
    QUOTA_EXCEEDED_ERROR: 3017,
    UNABLE_TO_GUESS_MANIFEST_TYPE: 4E3,
    DASH_INVALID_XML: 4001,
    DASH_NO_SEGMENT_INFO: 4002,
    DASH_EMPTY_ADAPTATION_SET: 4003,
    DASH_EMPTY_PERIOD: 4004,
    DASH_WEBM_MISSING_INIT: 4005,
    DASH_UNSUPPORTED_CONTAINER: 4006,
    DASH_PSSH_BAD_ENCODING: 4007,
    DASH_NO_COMMON_KEY_SYSTEM: 4008,
    DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED: 4009,
    DASH_CONFLICTING_KEY_IDS: 4010,
    UNPLAYABLE_PERIOD: 4011,
    RESTRICTIONS_CANNOT_BE_MET: 4012,
    NO_PERIODS: 4014,
    HLS_PLAYLIST_HEADER_MISSING: 4015,
    INVALID_HLS_TAG: 4016,
    HLS_INVALID_PLAYLIST_HIERARCHY: 4017,
    DASH_DUPLICATE_REPRESENTATION_ID: 4018,
    HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND: 4020,
    HLS_COULD_NOT_GUESS_MIME_TYPE: 4021,
    HLS_MASTER_PLAYLIST_NOT_PROVIDED: 4022,
    HLS_REQUIRED_ATTRIBUTE_MISSING: 4023,
    HLS_REQUIRED_TAG_MISSING: 4024,
    HLS_COULD_NOT_GUESS_CODECS: 4025,
    HLS_KEYFORMATS_NOT_SUPPORTED: 4026,
    DASH_UNSUPPORTED_XLINK_ACTUATE: 4027,
    DASH_XLINK_DEPTH_LIMIT: 4028,
    HLS_LIVE_CONTENT_NOT_SUPPORTED: 4029,
    INVALID_STREAMS_CHOSEN: 5005,
    NO_RECOGNIZED_KEY_SYSTEMS: 6E3,
    REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE: 6001,
    FAILED_TO_CREATE_CDM: 6002,
    FAILED_TO_ATTACH_TO_VIDEO: 6003,
    INVALID_SERVER_CERTIFICATE: 6004,
    FAILED_TO_CREATE_SESSION: 6005,
    FAILED_TO_GENERATE_LICENSE_REQUEST: 6006,
    LICENSE_REQUEST_FAILED: 6007,
    LICENSE_RESPONSE_REJECTED: 6008,
    ENCRYPTED_CONTENT_WITHOUT_DRM_INFO: 6010,
    NO_LICENSE_SERVER_GIVEN: 6012,
    OFFLINE_SESSION_REMOVED: 6013,
    EXPIRED: 6014,
    LOAD_INTERRUPTED: 7E3,
    CAST_API_UNAVAILABLE: 8E3,
    NO_CAST_RECEIVERS: 8001,
    ALREADY_CASTING: 8002,
    UNEXPECTED_CAST_ERROR: 8003,
    CAST_CANCELED_BY_USER: 8004,
    CAST_CONNECTION_TIMED_OUT: 8005,
    CAST_RECEIVER_APP_UNAVAILABLE: 8006,
    STORAGE_NOT_SUPPORTED: 9E3,
    INDEXED_DB_ERROR: 9001,
    OPERATION_ABORTED: 9002,
    REQUESTED_ITEM_NOT_FOUND: 9003,
    MALFORMED_OFFLINE_URI: 9004,
    CANNOT_STORE_LIVE_OFFLINE: 9005,
    STORE_ALREADY_IN_PROGRESS: 9006,
    NO_INIT_DATA_FOR_OFFLINE: 9007,
    LOCAL_PLAYER_INSTANCE_REQUIRED: 9008,
    CONTENT_UNSUPPORTED_BY_BROWSER: 9009
};
goog.exportProperty(shaka.util.Error, "Code", shaka.util.Error.Code);
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.splitRe_ = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
goog.uri.utils.ComponentIndex = {SCHEME: 1, USER_INFO: 2, DOMAIN: 3, PORT: 4, PATH: 5, QUERY_DATA: 6, FRAGMENT: 7};
goog.uri.utils.split = function (a) {
    return a.match(goog.uri.utils.splitRe_)
};
goog.Uri = function (a) {
    var b;
    a instanceof goog.Uri ? (this.setScheme(a.getScheme()), this.setUserInfo(a.getUserInfo()), this.setDomain(a.getDomain()), this.setPort(a.getPort()), this.setPath(a.getPath()), this.setQueryData(a.getQueryData().clone()), this.setFragment(a.getFragment())) : a && (b = goog.uri.utils.split(String(a))) ? (this.setScheme(b[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo(b[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0), this.setDomain(b[goog.uri.utils.ComponentIndex.DOMAIN] ||
        "", !0), this.setPort(b[goog.uri.utils.ComponentIndex.PORT]), this.setPath(b[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData(b[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(b[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : this.queryData_ = new goog.Uri.QueryData(null, null)
};
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.toString = function () {
    var a = [], b = this.getScheme();
    b && a.push(goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), ":");
    if (b = this.getDomain()) {
        a.push("//");
        var c = this.getUserInfo();
        c && a.push(goog.Uri.encodeSpecialChars_(c, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), "@");
        a.push(goog.Uri.removeDoubleEncoding_(encodeURIComponent(b)));
        b = this.getPort();
        null != b && a.push(":", String(b))
    }
    if (b = this.getPath()) this.hasDomain() && "/" != b.charAt(0) && a.push("/"), a.push(goog.Uri.encodeSpecialChars_(b,
        "/" == b.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_, !0));
    (b = this.getEncodedQuery()) && a.push("?", b);
    (b = this.getFragment()) && a.push("#", goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInFragment_));
    return a.join("")
};
goog.Uri.prototype.resolve = function (a) {
    var b = this.clone();
    "data" === b.scheme_ && (b = new goog.Uri);
    var c = a.hasScheme();
    c ? b.setScheme(a.getScheme()) : c = a.hasUserInfo();
    c ? b.setUserInfo(a.getUserInfo()) : c = a.hasDomain();
    c ? b.setDomain(a.getDomain()) : c = a.hasPort();
    var d = a.getPath();
    if (c) b.setPort(a.getPort()); else if (c = a.hasPath()) {
        if ("/" != d.charAt(0)) if (this.hasDomain() && !this.hasPath()) d = "/" + d; else {
            var e = b.getPath().lastIndexOf("/");
            -1 != e && (d = b.getPath().substr(0, e + 1) + d)
        }
        d = goog.Uri.removeDotSegments(d)
    }
    c ?
        b.setPath(d) : c = a.hasQuery();
    c ? b.setQueryData(a.getQueryData().clone()) : c = a.hasFragment();
    c && b.setFragment(a.getFragment());
    return b
};
goog.Uri.prototype.clone = function () {
    return new goog.Uri(this)
};
goog.Uri.prototype.getScheme = function () {
    return this.scheme_
};
goog.Uri.prototype.setScheme = function (a, b) {
    if (this.scheme_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a) this.scheme_ = this.scheme_.replace(/:$/, "");
    return this
};
goog.Uri.prototype.hasScheme = function () {
    return !!this.scheme_
};
goog.Uri.prototype.getUserInfo = function () {
    return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function (a, b) {
    this.userInfo_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
    return this
};
goog.Uri.prototype.hasUserInfo = function () {
    return !!this.userInfo_
};
goog.Uri.prototype.getDomain = function () {
    return this.domain_
};
goog.Uri.prototype.setDomain = function (a, b) {
    this.domain_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a;
    return this
};
goog.Uri.prototype.hasDomain = function () {
    return !!this.domain_
};
goog.Uri.prototype.getPort = function () {
    return this.port_
};
goog.Uri.prototype.setPort = function (a) {
    if (a) {
        a = Number(a);
        if (isNaN(a) || 0 > a) throw Error("Bad port number " + a);
        this.port_ = a
    } else this.port_ = null;
    return this
};
goog.Uri.prototype.hasPort = function () {
    return null != this.port_
};
goog.Uri.prototype.getPath = function () {
    return this.path_
};
goog.Uri.prototype.setPath = function (a, b) {
    this.path_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a;
    return this
};
goog.Uri.prototype.hasPath = function () {
    return !!this.path_
};
goog.Uri.prototype.hasQuery = function () {
    return "" !== this.queryData_.toString()
};
goog.Uri.prototype.setQueryData = function (a, b) {
    a instanceof goog.Uri.QueryData ? this.queryData_ = a : (b || (a = goog.Uri.encodeSpecialChars_(a, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(a, null));
    return this
};
goog.Uri.prototype.getEncodedQuery = function () {
    return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function () {
    return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function () {
    return this.queryData_
};
goog.Uri.prototype.getFragment = function () {
    return this.fragment_
};
goog.Uri.prototype.setFragment = function (a, b) {
    this.fragment_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
    return this
};
goog.Uri.prototype.hasFragment = function () {
    return !!this.fragment_
};
goog.Uri.removeDotSegments = function (a) {
    if (".." == a || "." == a) return "";
    if (-1 == a.indexOf("./") && -1 == a.indexOf("/.")) return a;
    var b = 0 == a.lastIndexOf("/", 0);
    a = a.split("/");
    for (var c = [], d = 0; d < a.length;) {
        var e = a[d++];
        "." == e ? b && d == a.length && c.push("") : ".." == e ? ((1 < c.length || 1 == c.length && "" != c[0]) && c.pop(), b && d == a.length && c.push("")) : (c.push(e), b = !0)
    }
    return c.join("/")
};
goog.Uri.decodeOrEmpty_ = function (a, b) {
    return a ? b ? decodeURI(a) : decodeURIComponent(a) : ""
};
goog.Uri.encodeSpecialChars_ = function (a, b, c) {
    return goog.isString(a) ? (a = encodeURI(a).replace(b, goog.Uri.encodeChar_), c && (a = goog.Uri.removeDoubleEncoding_(a)), a) : null
};
goog.Uri.encodeChar_ = function (a) {
    a = a.charCodeAt(0);
    return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
};
goog.Uri.removeDoubleEncoding_ = function (a) {
    return a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.QueryData = function (a, b) {
    this.encodedQuery_ = a || null
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function () {
    if (!this.keyMap_ && (this.keyMap_ = {}, this.count_ = 0, this.encodedQuery_)) for (var a = this.encodedQuery_.split("&"), b = 0; b < a.length; b++) {
        var c = a[b].indexOf("="), d = null;
        if (0 <= c) {
            var e = a[b].substring(0, c);
            d = a[b].substring(c + 1)
        } else e = a[b];
        e = decodeURIComponent(e.replace(/\+/g, " "));
        d = d || "";
        this.add(e, decodeURIComponent(d.replace(/\+/g, " ")))
    }
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.prototype.getCount = function () {
    this.ensureKeyMapInitialized_();
    return this.count_
};
goog.Uri.QueryData.prototype.add = function (a, b) {
    this.ensureKeyMapInitialized_();
    this.encodedQuery_ = null;
    var c = this.keyMap_.hasOwnProperty(a) && this.keyMap_[a];
    c || (this.keyMap_[a] = c = []);
    c.push(b);
    this.count_++;
    return this
};
goog.Uri.QueryData.prototype.toString = function () {
    if (this.encodedQuery_) return this.encodedQuery_;
    if (!this.keyMap_) return "";
    var a = [], b;
    for (b in this.keyMap_) for (var c = encodeURIComponent(b), d = this.keyMap_[b], e = 0; e < d.length; e++) {
        var f = c;
        "" !== d[e] && (f += "=" + encodeURIComponent(d[e]));
        a.push(f)
    }
    return this.encodedQuery_ = a.join("&")
};
goog.Uri.QueryData.prototype.toDecodedString = function () {
    return goog.Uri.decodeOrEmpty_(this.toString())
};
goog.Uri.QueryData.prototype.clone = function () {
    var a = new goog.Uri.QueryData;
    a.encodedQuery_ = this.encodedQuery_;
    if (this.keyMap_) {
        var b = {}, c;
        for (c in this.keyMap_) b[c] = this.keyMap_[c].concat();
        a.keyMap_ = b;
        a.count_ = this.count_
    }
    return a
};
shaka.util.PublicPromise = function () {
    var a, b, c = new Promise(function (c, e) {
        a = c;
        b = e
    });
    c.resolve = a;
    c.reject = b;
    return c
};
shaka.net = {};
shaka.net.Backoff = function (a, b, c) {
    var d = shaka.net.Backoff.defaultRetryParameters();
    this.maxAttempts_ = null == a.maxAttempts ? d.maxAttempts : a.maxAttempts;
    goog.asserts.assert(1 <= this.maxAttempts_, "maxAttempts should be >= 1");
    this.baseDelay_ = null == a.baseDelay ? d.baseDelay : a.baseDelay;
    goog.asserts.assert(0 <= this.baseDelay_, "baseDelay should be >= 0");
    this.fuzzFactor_ = null == a.fuzzFactor ? d.fuzzFactor : a.fuzzFactor;
    goog.asserts.assert(0 <= this.fuzzFactor_, "fuzzFactor should be >= 0");
    this.backoffFactor_ = null ==
    a.backoffFactor ? d.backoffFactor : a.backoffFactor;
    goog.asserts.assert(0 <= this.backoffFactor_, "backoffFactor should be >= 0");
    this.numAttempts_ = 0;
    this.nextUnfuzzedDelay_ = this.baseDelay_;
    this.autoReset_ = b || !1;
    this.isCanceled_ = c || null;
    this.autoReset_ && (goog.asserts.assert(2 <= this.maxAttempts_, "maxAttempts must be >= 2 for autoReset == true"), this.numAttempts_ = 1)
};
shaka.net.Backoff.prototype.attempt = function () {
    if (this.numAttempts_ >= this.maxAttempts_) if (this.autoReset_) this.reset_(); else return Promise.reject();
    var a = new shaka.util.PublicPromise;
    if (this.numAttempts_) {
        var b = shaka.net.Backoff.fuzz_(this.nextUnfuzzedDelay_, this.fuzzFactor_);
        this.cancelableTimeout_(a.resolve, b);
        this.nextUnfuzzedDelay_ *= this.backoffFactor_
    } else goog.asserts.assert(!this.autoReset_, "Failed to delay with auto-reset!"), a.resolve();
    this.numAttempts_++;
    return a
};
shaka.net.Backoff.defaultRetryParameters = function () {
    return {maxAttempts: 2, baseDelay: 1E3, backoffFactor: 2, fuzzFactor: .5, timeout: 0}
};
shaka.net.Backoff.fuzz_ = function (a, b) {
    return a * (1 + (2 * Math.random() - 1) * b)
};
shaka.net.Backoff.prototype.reset_ = function () {
    goog.asserts.assert(this.autoReset_, "Should only be used for auto-reset!");
    this.numAttempts_ = 1;
    this.nextUnfuzzedDelay_ = this.baseDelay_
};
shaka.net.Backoff.prototype.cancelableTimeout_ = function (a, b) {
    if (this.isCanceled_) if (this.isCanceled_() || 0 == b) a(); else {
        var c = Math.min(200, b);
        shaka.net.Backoff.setTimeout_(function () {
            this.cancelableTimeout_(a, b - c)
        }.bind(this), c)
    } else shaka.net.Backoff.setTimeout_(a, b)
};
shaka.net.Backoff.setTimeout_ = function (a, b) {
    return window.setTimeout(a, b)
};
shaka.util.ConfigUtils = {};
shaka.util.ConfigUtils.mergeConfigObjects = function (a, b, c, d, e) {
    goog.asserts.assert(a, "Destination config must not be null!");
    var f = e in d, g;
    for (g in b) {
        var h = e + "." + g, k = f ? d[e] : c[g];
        f || g in a ? void 0 === b[g] ? void 0 === k || f ? delete a[g] : a[g] = k : k.constructor == Object && b[g] && b[g].constructor == Object ? (a[g] || (goog.asserts.assert(f, "Null destination without ignoreKeys!"), a[g] = k), shaka.util.ConfigUtils.mergeConfigObjects(a[g], b[g], k, d, h)) : typeof b[g] != typeof k || null == b[g] || b[g].constructor != k.constructor ? shaka.log.error("Invalid config, wrong type for " +
            h) : ("function" == typeof a[g] && a[g].length != b[g].length && shaka.log.warning("Invalid config, wrong number of arguments for " + h), a[g] = b[g]) : shaka.log.error("Invalid config, unrecognized key " + h)
    }
};
shaka.util.ConfigUtils.cloneObject = function (a) {
    var b = [], c = function (a) {
        switch (typeof a) {
            case "undefined":
            case "boolean":
            case "number":
            case "string":
            case "symbol":
            case "function":
                return a;
            default:
                if (!a) return a;
                if (0 <= b.indexOf(a)) return null;
                var d = a.constructor == Array;
                if (a.constructor != Object && !d) return null;
                b.push(a);
                var f = d ? [] : {}, g;
                for (g in a) f[g] = c(a[g]);
                d && (f.length = a.length);
                return f
        }
    };
    return c(a)
};
shaka.util.Functional = {};
shaka.util.Functional.createFallbackPromiseChain = function (a, b) {
    return a.reduce(function (a, b, e) {
        return b["catch"](a.bind(null, e))
    }.bind(null, b), Promise.reject())
};
shaka.util.Functional.collapseArrays = function (a, b) {
    return a.concat(b)
};
shaka.util.Functional.noop = function () {
};
shaka.util.Functional.isNotNull = function (a) {
    return null != a
};
shaka.util.Functional.isNotDuplicate = function (a, b, c) {
    return c.indexOf(a) == b
};
shaka.util.IDestroyable = function () {
};
shaka.util.IDestroyable.prototype.destroy = function () {
};
shaka.net.NetworkingEngine = function (a) {
    this.destroyed_ = !1;
    this.requests_ = [];
    this.requestFilters_ = [];
    this.responseFilters_ = [];
    this.onSegmentDownloaded_ = a || null
};
goog.exportSymbol("shaka.net.NetworkingEngine", shaka.net.NetworkingEngine);
shaka.net.NetworkingEngine.RequestType = {MANIFEST: 0, SEGMENT: 1, LICENSE: 2, APP: 3};
goog.exportProperty(shaka.net.NetworkingEngine, "RequestType", shaka.net.NetworkingEngine.RequestType);
shaka.net.NetworkingEngine.schemes_ = {};
shaka.net.NetworkingEngine.registerScheme = function (a, b) {
    shaka.net.NetworkingEngine.schemes_[a] = b
};
goog.exportProperty(shaka.net.NetworkingEngine, "registerScheme", shaka.net.NetworkingEngine.registerScheme);
shaka.net.NetworkingEngine.unregisterScheme = function (a) {
    delete shaka.net.NetworkingEngine.schemes_[a]
};
goog.exportProperty(shaka.net.NetworkingEngine, "unregisterScheme", shaka.net.NetworkingEngine.unregisterScheme);
shaka.net.NetworkingEngine.prototype.registerRequestFilter = function (a) {
    this.requestFilters_.push(a)
};
goog.exportProperty(shaka.net.NetworkingEngine.prototype, "registerRequestFilter", shaka.net.NetworkingEngine.prototype.registerRequestFilter);
shaka.net.NetworkingEngine.prototype.unregisterRequestFilter = function (a) {
    var b = this.requestFilters_;
    a = b.indexOf(a);
    0 <= a && b.splice(a, 1)
};
goog.exportProperty(shaka.net.NetworkingEngine.prototype, "unregisterRequestFilter", shaka.net.NetworkingEngine.prototype.unregisterRequestFilter);
shaka.net.NetworkingEngine.prototype.clearAllRequestFilters = function () {
    this.requestFilters_ = []
};
goog.exportProperty(shaka.net.NetworkingEngine.prototype, "clearAllRequestFilters", shaka.net.NetworkingEngine.prototype.clearAllRequestFilters);
shaka.net.NetworkingEngine.prototype.registerResponseFilter = function (a) {
    this.responseFilters_.push(a)
};
goog.exportProperty(shaka.net.NetworkingEngine.prototype, "registerResponseFilter", shaka.net.NetworkingEngine.prototype.registerResponseFilter);
shaka.net.NetworkingEngine.prototype.unregisterResponseFilter = function (a) {
    var b = this.responseFilters_;
    a = b.indexOf(a);
    0 <= a && b.splice(a, 1)
};
goog.exportProperty(shaka.net.NetworkingEngine.prototype, "unregisterResponseFilter", shaka.net.NetworkingEngine.prototype.unregisterResponseFilter);
shaka.net.NetworkingEngine.prototype.clearAllResponseFilters = function () {
    this.responseFilters_ = []
};
goog.exportProperty(shaka.net.NetworkingEngine.prototype, "clearAllResponseFilters", shaka.net.NetworkingEngine.prototype.clearAllResponseFilters);
shaka.net.NetworkingEngine.defaultRetryParameters = shaka.net.Backoff.defaultRetryParameters;
shaka.net.NetworkingEngine.makeRequest = function (a, b) {
    return {uris: a, method: "GET", body: null, headers: {}, allowCrossSiteCredentials: !1, retryParameters: b}
};
shaka.net.NetworkingEngine.prototype.destroy = function () {
    var a = shaka.util.Functional;
    this.destroyed_ = !0;
    this.requestFilters_ = [];
    this.responseFilters_ = [];
    for (var b = [], c = 0; c < this.requests_.length; ++c) b.push(this.requests_[c]["catch"](a.noop));
    return Promise.all(b)
};
goog.exportProperty(shaka.net.NetworkingEngine.prototype, "destroy", shaka.net.NetworkingEngine.prototype.destroy);
shaka.net.NetworkingEngine.prototype.request = function (a, b, c) {
    var d = c || function () {
        return !1
    }, e = shaka.util.ConfigUtils.cloneObject;
    if (this.destroyed_) return Promise.reject();
    goog.asserts.assert(b.uris && b.uris.length, "Request without URIs!");
    b.method = b.method || "GET";
    b.headers = b.headers || {};
    b.retryParameters = b.retryParameters ? e(b.retryParameters) : shaka.net.NetworkingEngine.defaultRetryParameters();
    b.uris = e(b.uris);
    var f = Date.now(), g = Promise.resolve();
    this.requestFilters_.forEach(function (c) {
        g = g.then(c.bind(null,
            a, b))
    });
    g = g["catch"](function (a) {
        throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.REQUEST_FILTER_ERROR, a);
    });
    g = g.then(function () {
        var e = Date.now() - f, g = new shaka.net.Backoff(b.retryParameters, !1, c);
        return g.attempt().then(function () {
            return this.send_(a, b, g, 0, e, d)
        }.bind(this))
    }.bind(this));
    this.requests_.push(g);
    return g.then(function (b) {
        0 <= this.requests_.indexOf(g) && this.requests_.splice(this.requests_.indexOf(g), 1);
        if (this.onSegmentDownloaded_ &&
            !b.fromCache && a == shaka.net.NetworkingEngine.RequestType.SEGMENT) this.onSegmentDownloaded_(b.timeMs, b.data.byteLength);
        return b
    }.bind(this))["catch"](function (a) {
        a && (goog.asserts.assert(a instanceof shaka.util.Error, "Wrong error type"), a.severity = shaka.util.Error.Severity.CRITICAL);
        0 <= this.requests_.indexOf(g) && this.requests_.splice(this.requests_.indexOf(g), 1);
        return Promise.reject(a)
    }.bind(this))
};
goog.exportProperty(shaka.net.NetworkingEngine.prototype, "request", shaka.net.NetworkingEngine.prototype.request);
shaka.net.NetworkingEngine.prototype.send_ = function (a, b, c, d, e, f) {
    if (this.destroyed_ || f()) return Promise.reject();
    var g = new goog.Uri(b.uris[d]), h = g.getScheme();
    h || (h = shaka.net.NetworkingEngine.getLocationProtocol_(), goog.asserts.assert(":" == h[h.length - 1], "location.protocol expected to end with a colon!"), h = h.slice(0, -1), g.setScheme(h), b.uris[d] = g.toString());
    h = shaka.net.NetworkingEngine.schemes_[h];
    if (!h) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.NETWORK,
        shaka.util.Error.Code.UNSUPPORTED_SCHEME, g));
    var k = Date.now();
    return h(b.uris[d], b, a).then(function (b) {
        void 0 == b.timeMs && (b.timeMs = Date.now() - k);
        var c = Date.now(), d = Promise.resolve();
        this.responseFilters_.forEach(function (c) {
            d = d.then(function () {
                return Promise.resolve(c(a, b))
            }.bind(this))
        }.bind(this));
        d = d["catch"](function (a) {
            var b = shaka.util.Error.Severity.CRITICAL;
            a instanceof shaka.util.Error && (b = a.severity);
            throw new shaka.util.Error(b, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.RESPONSE_FILTER_ERROR,
                a);
        });
        return d.then(function () {
            b.timeMs += Date.now() - c;
            b.timeMs += e;
            return b
        })
    }.bind(this))["catch"](function (g) {
        if (g && g.severity == shaka.util.Error.Severity.RECOVERABLE) return d = (d + 1) % b.uris.length, f() ? Promise.reject() : c.attempt().then(function () {
            return this.send_(a, b, c, d, e, f)
        }.bind(this), function () {
            throw g;
        });
        throw g;
    }.bind(this))
};
shaka.net.NetworkingEngine.getLocationProtocol_ = function () {
    return location.protocol
};
shaka.util.ArrayUtils = {};
shaka.util.ArrayUtils.removeDuplicates = function (a, b) {
    for (var c = [], d = 0; d < a.length; ++d) {
        for (var e = !1, f = 0; f < c.length && !(e = b ? b(a[d], c[f]) : a[d] === c[f]); ++f) ;
        e || c.push(a[d])
    }
    return c
};
shaka.util.ArrayUtils.indexOf = function (a, b, c) {
    for (var d = 0; d < a.length; ++d) if (c(a[d], b)) return d;
    return -1
};
shaka.util.ArrayUtils.remove = function (a, b) {
    var c = a.indexOf(b);
    -1 < c && a.splice(c, 1)
};
shaka.util.MultiMap = function () {
    this.map_ = {}
};
shaka.util.MultiMap.prototype.push = function (a, b) {
    this.map_.hasOwnProperty(a) ? this.map_[a].push(b) : this.map_[a] = [b]
};
shaka.util.MultiMap.prototype.get = function (a) {
    return (a = this.map_[a]) ? a.slice() : null
};
shaka.util.MultiMap.prototype.getAll = function () {
    var a = [], b;
    for (b in this.map_) a.push.apply(a, this.map_[b]);
    return a
};
shaka.util.MultiMap.prototype.remove = function (a, b) {
    var c = this.map_[a];
    if (c) for (var d = 0; d < c.length; ++d) c[d] == b && (c.splice(d, 1), --d)
};
shaka.util.MultiMap.prototype.clear = function () {
    this.map_ = {}
};
shaka.util.EventManager = function () {
    this.bindingMap_ = new shaka.util.MultiMap
};
shaka.util.EventManager.prototype.destroy = function () {
    this.removeAll();
    this.bindingMap_ = null;
    return Promise.resolve()
};
shaka.util.EventManager.prototype.listen = function (a, b, c) {
    this.bindingMap_ && (a = new shaka.util.EventManager.Binding_(a, b, c), this.bindingMap_.push(b, a))
};
shaka.util.EventManager.prototype.listenOnce = function (a, b, c) {
    this.listen(a, b, function (d) {
        this.unlisten(a, b);
        c(d)
    }.bind(this))
};
shaka.util.EventManager.prototype.unlisten = function (a, b) {
    if (this.bindingMap_) for (var c = this.bindingMap_.get(b) || [], d = 0; d < c.length; ++d) {
        var e = c[d];
        e.target == a && (e.unlisten(), this.bindingMap_.remove(b, e))
    }
};
shaka.util.EventManager.prototype.removeAll = function () {
    if (this.bindingMap_) {
        for (var a = this.bindingMap_.getAll(), b = 0; b < a.length; ++b) a[b].unlisten();
        this.bindingMap_.clear()
    }
};
shaka.util.EventManager.Binding_ = function (a, b, c) {
    this.target = a;
    this.type = b;
    this.listener = c;
    this.target.addEventListener(b, c, !1)
};
shaka.util.EventManager.Binding_.prototype.unlisten = function () {
    goog.asserts.assert(this.target, "Missing target");
    this.target.removeEventListener(this.type, this.listener, !1);
    this.listener = this.target = null
};
shaka.util.FakeEvent = function (a, b) {
    var c = b || {}, d;
    for (d in c) this[d] = c[d];
    this.defaultPrevented = this.cancelable = this.bubbles = !1;
    this.timeStamp = window.performance && window.performance.now ? window.performance.now() : Date.now();
    this.type = a;
    this.isTrusted = !1;
    this.target = this.currentTarget = null;
    this.stopped = !1
};
shaka.util.FakeEvent.prototype.preventDefault = function () {
    this.cancelable && (this.defaultPrevented = !0)
};
shaka.util.FakeEvent.prototype.stopImmediatePropagation = function () {
    this.stopped = !0
};
shaka.util.FakeEvent.prototype.stopPropagation = function () {
};
shaka.util.ManifestParserUtils = {};
shaka.util.ManifestParserUtils.resolveUris = function (a, b) {
    var c = shaka.util.Functional;
    if (0 == b.length) return a;
    var d = b.map(function (a) {
        return new goog.Uri(a)
    });
    return a.map(function (a) {
        return new goog.Uri(a)
    }).map(function (a) {
        return d.map(a.resolve.bind(a))
    }).reduce(c.collapseArrays, []).map(function (a) {
        return a.toString()
    })
};
shaka.util.ManifestParserUtils.createDrmInfo = function (a, b) {
    return {
        keySystem: a,
        licenseServerUri: "",
        distinctiveIdentifierRequired: !1,
        persistentStateRequired: !1,
        audioRobustness: "",
        videoRobustness: "",
        serverCertificate: null,
        initData: b || [],
        keyIds: []
    }
};
shaka.util.ManifestParserUtils.ContentType = {VIDEO: "video", AUDIO: "audio", TEXT: "text", APPLICATION: "application"};
shaka.util.ManifestParserUtils.TextStreamKind = {SUBTITLE: "subtitle", CLOSED_CAPTION: "caption"};
shaka.util.ManifestParserUtils.GAP_OVERLAP_TOLERANCE_SECONDS = 1 / 15;
shaka.util.MapUtils = {};
shaka.util.MapUtils.empty = function (a) {
    return !a || 0 == Object.keys(a).length
};
shaka.util.MapUtils.values = function (a) {
    return Object.keys(a).map(function (b) {
        return a[b]
    })
};
shaka.util.MapUtils.map = function (a, b) {
    return Object.keys(a).reduce(function (c, d) {
        c[d] = b(a[d], d);
        return c
    }, {})
};
shaka.util.MapUtils.every = function (a, b) {
    return Object.keys(a).every(function (c) {
        return b(c, a[c])
    })
};
shaka.util.MapUtils.forEach = function (a, b) {
    Object.keys(a).forEach(function (c) {
        b(c, a[c])
    })
};
shaka.util.MimeUtils = {};
shaka.util.MimeUtils.getFullType = function (a, b) {
    var c = a;
    b && (c += '; codecs="' + b + '"');
    return c
};
shaka.util.MimeUtils.getExtendedType = function (a) {
    var b = a.mimeType, c;
    for (c in shaka.util.MimeUtils.EXTENDED_MIME_PARAMETERS_) {
        var d = a[c], e = shaka.util.MimeUtils.EXTENDED_MIME_PARAMETERS_[c];
        d && (b += "; " + e + '="' + d + '"')
    }
    return b
};
shaka.util.MimeUtils.EXTENDED_MIME_PARAMETERS_ = {
    codecs: "codecs",
    frameRate: "framerate",
    bandwidth: "bitrate",
    width: "width",
    height: "height",
    channelsCount: "channels"
};
shaka.util.StringUtils = {};
shaka.util.StringUtils.fromUTF8 = function (a) {
    if (!a) return "";
    a = new Uint8Array(a);
    239 == a[0] && 187 == a[1] && 191 == a[2] && (a = a.subarray(3));
    a = shaka.util.StringUtils.fromCharCode_(a);
    a = escape(a);
    try {
        return decodeURIComponent(a)
    } catch (b) {
        throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.BAD_ENCODING);
    }
};
goog.exportSymbol("shaka.util.StringUtils.fromUTF8", shaka.util.StringUtils.fromUTF8);
shaka.util.StringUtils.fromUTF16 = function (a, b, c) {
    if (!a) return "";
    if (!c && 0 != a.byteLength % 2) throw shaka.log.error("Data has an incorrect length, must be even."), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.BAD_ENCODING);
    if (a instanceof ArrayBuffer) var d = a; else c = new Uint8Array(a.byteLength), c.set(new Uint8Array(a)), d = c.buffer;
    a = Math.floor(a.byteLength / 2);
    c = new Uint16Array(a);
    d = new DataView(d);
    for (var e = 0; e < a; e++) c[e] = d.getUint16(2 * e, b);
    return shaka.util.StringUtils.fromCharCode_(c)
};
goog.exportSymbol("shaka.util.StringUtils.fromUTF16", shaka.util.StringUtils.fromUTF16);
shaka.util.StringUtils.fromBytesAutoDetect = function (a) {
    var b = shaka.util.StringUtils, c = new Uint8Array(a);
    if (239 == c[0] && 187 == c[1] && 191 == c[2]) return b.fromUTF8(c);
    if (254 == c[0] && 255 == c[1]) return b.fromUTF16(c.subarray(2), !1);
    if (255 == c[0] && 254 == c[1]) return b.fromUTF16(c.subarray(2), !0);
    var d = function (a, b) {
        return a.byteLength <= b || 32 <= a[b] && 126 >= a[b]
    }.bind(null, c);
    shaka.log.debug("Unable to find byte-order-mark, making an educated guess.");
    if (0 == c[0] && 0 == c[2]) return b.fromUTF16(a, !1);
    if (0 == c[1] && 0 == c[3]) return b.fromUTF16(a,
        !0);
    if (d(0) && d(1) && d(2) && d(3)) return b.fromUTF8(a);
    throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.UNABLE_TO_DETECT_ENCODING);
};
goog.exportSymbol("shaka.util.StringUtils.fromBytesAutoDetect", shaka.util.StringUtils.fromBytesAutoDetect);
shaka.util.StringUtils.toUTF8 = function (a) {
    a = encodeURIComponent(a);
    a = unescape(a);
    for (var b = new Uint8Array(a.length), c = 0; c < a.length; ++c) b[c] = a.charCodeAt(c);
    return b.buffer
};
goog.exportSymbol("shaka.util.StringUtils.toUTF8", shaka.util.StringUtils.toUTF8);
shaka.util.StringUtils.fromCharCode_ = function (a) {
    for (var b = "", c = 0; c < a.length; c += 16E3) var d = a.subarray(c, c + 16E3), b = b + String.fromCharCode.apply(null, d);
    return b
};
shaka.util.Timer = function (a) {
    this.id_ = null;
    this.callback_ = function () {
        this.id_ = null;
        a()
    }.bind(this)
};
shaka.util.Timer.prototype.cancel = function () {
    null != this.id_ && (clearTimeout(this.id_), this.id_ = null)
};
shaka.util.Timer.prototype.schedule = function (a) {
    this.cancel();
    this.id_ = setTimeout(this.callback_, 1E3 * a)
};
shaka.util.Timer.prototype.scheduleRepeated = function (a) {
    this.cancel();
    var b = function () {
        this.callback_();
        this.id_ = setTimeout(b, 1E3 * a)
    }.bind(this);
    this.id_ = setTimeout(b, 1E3 * a)
};
shaka.util.Uint8ArrayUtils = {};
shaka.util.Uint8ArrayUtils.toBase64 = function (a, b) {
    var c = String.fromCharCode.apply(null, a), d = void 0 == b ? !0 : b,
        c = window.btoa(c).replace(/\+/g, "-").replace(/\//g, "_");
    return d ? c : c.replace(/=*$/, "")
};
goog.exportSymbol("shaka.util.Uint8ArrayUtils.toBase64", shaka.util.Uint8ArrayUtils.toBase64);
shaka.util.Uint8ArrayUtils.fromBase64 = function (a) {
    a = window.atob(a.replace(/-/g, "+").replace(/_/g, "/"));
    for (var b = new Uint8Array(a.length), c = 0; c < a.length; ++c) b[c] = a.charCodeAt(c);
    return b
};
goog.exportSymbol("shaka.util.Uint8ArrayUtils.fromBase64", shaka.util.Uint8ArrayUtils.fromBase64);
shaka.util.Uint8ArrayUtils.fromHex = function (a) {
    for (var b = new Uint8Array(a.length / 2), c = 0; c < a.length; c += 2) b[c / 2] = window.parseInt(a.substr(c, 2), 16);
    return b
};
goog.exportSymbol("shaka.util.Uint8ArrayUtils.fromHex", shaka.util.Uint8ArrayUtils.fromHex);
shaka.util.Uint8ArrayUtils.toHex = function (a) {
    for (var b = "", c = 0; c < a.length; ++c) {
        var d = a[c].toString(16);
        1 == d.length && (d = "0" + d);
        b += d
    }
    return b
};
goog.exportSymbol("shaka.util.Uint8ArrayUtils.toHex", shaka.util.Uint8ArrayUtils.toHex);
shaka.util.Uint8ArrayUtils.equal = function (a, b) {
    if (!a && !b) return !0;
    if (!a || !b || a.length != b.length) return !1;
    for (var c = 0; c < a.length; ++c) if (a[c] != b[c]) return !1;
    return !0
};
goog.exportSymbol("shaka.util.Uint8ArrayUtils.equal", shaka.util.Uint8ArrayUtils.equal);
shaka.util.Uint8ArrayUtils.concat = function (a) {
    for (var b = 0, c = 0; c < arguments.length; ++c) b += arguments[c].length;
    for (var b = new Uint8Array(b), d = 0, c = 0; c < arguments.length; ++c) b.set(arguments[c], d), d += arguments[c].length;
    return b
};
goog.exportSymbol("shaka.util.Uint8ArrayUtils.concat", shaka.util.Uint8ArrayUtils.concat);
shaka.media = {};
shaka.media.DrmEngine = function (a) {
    this.playerInterface_ = a;
    this.video_ = this.mediaKeys_ = this.supportedTypes_ = null;
    this.initialized_ = !1;
    this.currentDrmInfo_ = null;
    this.eventManager_ = new shaka.util.EventManager;
    this.activeSessions_ = [];
    this.offlineSessionIds_ = [];
    this.allSessionsLoaded_ = new shaka.util.PublicPromise;
    this.config_ = null;
    this.onError_ = function (b) {
        this.allSessionsLoaded_.reject(b);
        a.onError(b)
    }.bind(this);
    this.keyStatusByKeyId_ = {};
    this.keyStatusTimer_ = new shaka.util.Timer(this.processKeyStatusChanges_.bind(this));
    this.isOffline_ =
        this.destroyed_ = !1;
    this.mediaKeyMessageEvents_ = [];
    this.initialRequestsSent_ = !1;
    this.expirationTimer_ = new shaka.util.Timer(this.pollExpiration_.bind(this));
    this.expirationTimer_.scheduleRepeated(1);
    this.allSessionsLoaded_["catch"](function () {
    })
};
shaka.media.DrmEngine.prototype.destroy = function () {
    var a = shaka.util.Functional;
    this.destroyed_ = !0;
    var b = [];
    this.activeSessions_.forEach(function (c) {
        c = c.session.close()["catch"](a.noop);
        var d = new Promise(function (a) {
            setTimeout(a, 1E3)
        });
        b.push(Promise.race([c, d]))
    });
    this.allSessionsLoaded_.reject();
    this.eventManager_ && b.push(this.eventManager_.destroy());
    this.video_ && (goog.asserts.assert(!this.video_.src, "video src must be removed first!"), b.push(this.video_.setMediaKeys(null)["catch"](a.noop)));
    this.expirationTimer_ &&
    (this.expirationTimer_.cancel(), this.expirationTimer_ = null);
    this.keyStatusTimer_ && (this.keyStatusTimer_.cancel(), this.keyStatusTimer_ = null);
    this.eventManager_ = this.video_ = this.mediaKeys_ = this.supportedTypes_ = this.currentDrmInfo_ = null;
    this.activeSessions_ = [];
    this.offlineSessionIds_ = [];
    this.playerInterface_ = this.onError_ = this.config_ = null;
    return Promise.all(b)
};
shaka.media.DrmEngine.prototype.configure = function (a) {
    this.config_ = a
};
shaka.media.DrmEngine.prototype.init = function (a, b) {
    goog.asserts.assert(this.config_, "DrmEngine configure() must be called before init()!");
    var c = {}, d = [];
    this.isOffline_ = b;
    this.offlineSessionIds_ = a.offlineSessionIds;
    this.prepareMediaKeyConfigs_(a, b || 0 < a.offlineSessionIds.length, c, d);
    return d.length ? this.queryMediaKeys_(c, d) : (this.initialized_ = !0, Promise.resolve())
};
shaka.media.DrmEngine.prototype.attach = function (a) {
    if (!this.mediaKeys_) return this.eventManager_.listenOnce(a, "encrypted", function (a) {
        this.onError_(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.ENCRYPTED_CONTENT_WITHOUT_DRM_INFO))
    }.bind(this)), Promise.resolve();
    this.video_ = a;
    this.eventManager_.listenOnce(this.video_, "play", this.onPlay_.bind(this));
    a = this.video_.setMediaKeys(this.mediaKeys_);
    a = a["catch"](function (a) {
        return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
            shaka.util.Error.Category.DRM, shaka.util.Error.Code.FAILED_TO_ATTACH_TO_VIDEO, a.message))
    });
    var b = null;
    this.currentDrmInfo_.serverCertificate && this.currentDrmInfo_.serverCertificate.length && (b = this.mediaKeys_.setServerCertificate(this.currentDrmInfo_.serverCertificate).then(function (a) {
        a || shaka.log.warning("Server certificates are not supported by the key system.  The server certificate has been ignored.")
    })["catch"](function (a) {
        return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
            shaka.util.Error.Category.DRM, shaka.util.Error.Code.INVALID_SERVER_CERTIFICATE, a.message))
    }));
    return Promise.all([a, b]).then(function () {
        if (this.destroyed_) return Promise.reject();
        this.createOrLoad();
        if (!this.currentDrmInfo_.initData.length && !this.offlineSessionIds_.length) {
            var a = this.onEncrypted_.bind(this);
            this.eventManager_.listen(this.video_, "encrypted", a)
        }
    }.bind(this))["catch"](function (a) {
        return this.destroyed_ ? Promise.resolve() : Promise.reject(a)
    }.bind(this))
};
shaka.media.DrmEngine.prototype.removeSessions = function (a) {
    goog.asserts.assert(this.mediaKeys_ || !a.length, "Must call init() before removeSessions");
    return Promise.all(a.map(function (a) {
        return this.loadOfflineSession_(a).then(function (a) {
            if (a) {
                for (var b = new shaka.util.PublicPromise, c = 0; c < this.activeSessions_.length; c++) if (this.activeSessions_[c].session == a) {
                    this.activeSessions_[c].updatePromise = b;
                    break
                }
                return Promise.all([a.remove(), b])
            }
        }.bind(this))
    }.bind(this)))
};
shaka.media.DrmEngine.prototype.createOrLoad = function () {
    var a = this.currentDrmInfo_ ? this.currentDrmInfo_.initData : [];
    a.forEach(function (a) {
        this.createTemporarySession_(a.initDataType, a.initData)
    }.bind(this));
    this.offlineSessionIds_.forEach(function (a) {
        this.loadOfflineSession_(a)
    }.bind(this));
    a.length || this.offlineSessionIds_.length || this.allSessionsLoaded_.resolve();
    return this.allSessionsLoaded_
};
shaka.media.DrmEngine.prototype.initialized = function () {
    return this.initialized_
};
shaka.media.DrmEngine.prototype.keySystem = function () {
    return this.currentDrmInfo_ ? this.currentDrmInfo_.keySystem : ""
};
shaka.media.DrmEngine.prototype.getSupportedTypes = function () {
    return this.supportedTypes_
};
shaka.media.DrmEngine.prototype.getSessionIds = function () {
    return this.activeSessions_.map(function (a) {
        return a.session.sessionId
    })
};
shaka.media.DrmEngine.prototype.getExpiration = function () {
    var a = this.activeSessions_.map(function (a) {
        a = a.session.expiration;
        return isNaN(a) ? Infinity : a
    });
    return Math.min.apply(Math, a)
};
shaka.media.DrmEngine.prototype.getDrmInfo = function () {
    return this.currentDrmInfo_
};
shaka.media.DrmEngine.prototype.prepareMediaKeyConfigs_ = function (a, b, c, d) {
    var e = this.configureClearKey_();
    a.periods.forEach(function (a) {
        a.variants.forEach(function (a) {
            e && (a.drmInfos = [e]);
            a.drmInfos.forEach(function (e) {
                this.fillInDrmInfoDefaults_(e);
                window.cast && window.cast.__platform__ && "com.microsoft.playready" == e.keySystem && (e.keySystem = "com.chromecast.playready");
                var f = c[e.keySystem];
                f || (f = {
                    audioCapabilities: [],
                    videoCapabilities: [],
                    distinctiveIdentifier: "optional",
                    persistentState: b ? "required" :
                        "optional",
                    sessionTypes: [b ? "persistent-license" : "temporary"],
                    label: e.keySystem,
                    drmInfos: []
                }, c[e.keySystem] = f, d.push(e.keySystem));
                f.drmInfos.push(e);
                e.distinctiveIdentifierRequired && (f.distinctiveIdentifier = "required");
                e.persistentStateRequired && (f.persistentState = "required");
                var g = [];
                a.video && g.push(a.video);
                a.audio && g.push(a.audio);
                g.forEach(function (a) {
                    var b = shaka.util.ManifestParserUtils.ContentType,
                        c = a.type == b.VIDEO ? f.videoCapabilities : f.audioCapabilities,
                        b = (a.type == b.VIDEO ? e.videoRobustness :
                            e.audioRobustness) || "";
                    a = shaka.util.MimeUtils.getFullType(a.mimeType, a.codecs);
                    c.push({robustness: b, contentType: a})
                }.bind(this))
            }.bind(this))
        }.bind(this))
    }.bind(this))
};
shaka.media.DrmEngine.prototype.queryMediaKeys_ = function (a, b) {
    if (1 == b.length && "" == b[0]) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.NO_RECOGNIZED_KEY_SYSTEMS));
    var c = new shaka.util.PublicPromise, d = c;
    [!0, !1].forEach(function (c) {
        b.forEach(function (b) {
            var e = a[b];
            e.drmInfos.some(function (a) {
                return !!a.licenseServerUri
            }) == c && (0 == e.audioCapabilities.length && delete e.audioCapabilities, 0 == e.videoCapabilities.length && delete e.videoCapabilities,
                d = d["catch"](function () {
                    return this.destroyed_ ? Promise.reject() : navigator.requestMediaKeySystemAccess(b, [e])
                }.bind(this)))
        }.bind(this))
    }.bind(this));
    d = d["catch"](function () {
        return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE))
    });
    d = d.then(function (b) {
        if (this.destroyed_) return Promise.reject();
        var c = 0 <= navigator.userAgent.indexOf("Edge/"), d = b.getConfiguration();
        this.supportedTypes_ =
            (d.audioCapabilities || []).concat(d.videoCapabilities || []).map(function (a) {
                return a.contentType
            });
        c && (this.supportedTypes_ = null);
        goog.asserts.assert(!this.supportedTypes_ || this.supportedTypes_.length, "We should get at least one supported MIME type");
        c = a[b.keySystem];
        this.createCurrentDrmInfo_(b.keySystem, c, c.drmInfos);
        return this.currentDrmInfo_.licenseServerUri ? b.createMediaKeys() : Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.NO_LICENSE_SERVER_GIVEN))
    }.bind(this)).then(function (a) {
        if (this.destroyed_) return Promise.reject();
        this.mediaKeys_ = a;
        this.initialized_ = !0
    }.bind(this))["catch"](function (a) {
        if (this.destroyed_) return Promise.resolve();
        this.supportedTypes_ = this.currentDrmInfo_ = null;
        return a instanceof shaka.util.Error ? Promise.reject(a) : Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.FAILED_TO_CREATE_CDM, a.message))
    }.bind(this));
    c.reject();
    return d
};
shaka.media.DrmEngine.prototype.fillInDrmInfoDefaults_ = function (a) {
    var b = a.keySystem;
    if (b) {
        if (!a.licenseServerUri) {
            var c = this.config_.servers[b];
            c ? a.licenseServerUri = c : shaka.log.error("No license server configured for " + b)
        }
        a.keyIds || (a.keyIds = []);
        if (b = this.config_.advanced[b]) a.distinctiveIdentifierRequired || (a.distinctiveIdentifierRequired = b.distinctiveIdentifierRequired), a.persistentStateRequired || (a.persistentStateRequired = b.persistentStateRequired), a.videoRobustness || (a.videoRobustness = b.videoRobustness),
        a.audioRobustness || (a.audioRobustness = b.audioRobustness), a.serverCertificate || (a.serverCertificate = b.serverCertificate)
    }
};
shaka.media.DrmEngine.prototype.configureClearKey_ = function () {
    if (shaka.util.MapUtils.empty(this.config_.clearKeys)) return null;
    var a = shaka.util.StringUtils, b = shaka.util.Uint8ArrayUtils, c = [], d = [], e;
    for (e in this.config_.clearKeys) {
        var f = this.config_.clearKeys[e], g = b.fromHex(e), f = b.fromHex(f),
            g = {kty: "oct", kid: b.toBase64(g, !1), k: b.toBase64(f, !1)};
        c.push(g);
        d.push(g.kid)
    }
    b = JSON.stringify({keys: c});
    d = JSON.stringify({kids: d});
    a = [{initData: new Uint8Array(a.toUTF8(d)), initDataType: "keyids"}];
    return {
        keySystem: "org.w3.clearkey",
        licenseServerUri: "data:application/json;base64," + window.btoa(b),
        distinctiveIdentifierRequired: !1,
        persistentStateRequired: !1,
        audioRobustness: "",
        videoRobustness: "",
        serverCertificate: null,
        initData: a,
        keyIds: []
    }
};
shaka.media.DrmEngine.prototype.createCurrentDrmInfo_ = function (a, b, c) {
    var d = [], e = [], f = [], g = [];
    this.processDrmInfos_(c, d, e, f, g);
    1 < e.length && shaka.log.warning("Multiple unique server certificates found! Only the first will be used.");
    1 < d.length && shaka.log.warning("Multiple unique license server URIs found! Only the first will be used.");
    this.currentDrmInfo_ = {
        keySystem: a,
        licenseServerUri: d[0],
        distinctiveIdentifierRequired: "required" == b.distinctiveIdentifier,
        persistentStateRequired: "required" == b.persistentState,
        audioRobustness: b.audioCapabilities ? b.audioCapabilities[0].robustness : "",
        videoRobustness: b.videoCapabilities ? b.videoCapabilities[0].robustness : "",
        serverCertificate: e[0],
        initData: f,
        keyIds: g
    }
};
shaka.media.DrmEngine.prototype.processDrmInfos_ = function (a, b, c, d, e) {
    function f(a, b) {
        return a.keyId && a.keyId == b.keyId ? !0 : a.initDataType == b.initDataType && shaka.util.Uint8ArrayUtils.equal(a.initData, b.initData)
    }

    a.forEach(function (a) {
        var g = shaka.util.ArrayUtils, k = shaka.util.Uint8ArrayUtils;
        -1 == b.indexOf(a.licenseServerUri) && b.push(a.licenseServerUri);
        a.serverCertificate && -1 == g.indexOf(c, a.serverCertificate, k.equal) && c.push(a.serverCertificate);
        a.initData && a.initData.forEach(function (a) {
            -1 == g.indexOf(d,
                a, f) && d.push(a)
        });
        if (a.keyIds) for (k = 0; k < a.keyIds.length; ++k) -1 == e.indexOf(a.keyIds[k]) && e.push(a.keyIds[k])
    })
};
shaka.media.DrmEngine.prototype.onEncrypted_ = function (a) {
    for (var b = shaka.util.Uint8ArrayUtils, c = new Uint8Array(a.initData), d = 0; d < this.activeSessions_.length; ++d) if (b.equal(c, this.activeSessions_[d].initData)) {
        shaka.log.debug("Ignoring duplicate init data.");
        return
    }
    this.createTemporarySession_(a.initDataType, c)
};
shaka.media.DrmEngine.prototype.loadOfflineSession_ = function (a) {
    try {
        var b = this.mediaKeys_.createSession("persistent-license")
    } catch (d) {
        return a = new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.FAILED_TO_CREATE_SESSION, d.message), this.onError_(a), Promise.reject(a)
    }
    this.eventManager_.listen(b, "message", this.onSessionMessage_.bind(this));
    this.eventManager_.listen(b, "keystatuseschange", this.onKeyStatusesChange_.bind(this));
    var c = {
        initData: null,
        session: b, loaded: !1, oldExpiration: Infinity, updatePromise: null
    };
    this.activeSessions_.push(c);
    return b.load(a).then(function (a) {
            if (!this.destroyed_) {
                if (a) return c.loaded = !0, this.activeSessions_.every(function (a) {
                    return a.loaded
                }) && this.allSessionsLoaded_.resolve(), b;
                a = this.activeSessions_.indexOf(c);
                goog.asserts.assert(0 <= a, "Session must be in the array");
                this.activeSessions_.splice(a, 1);
                this.onError_(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.OFFLINE_SESSION_REMOVED))
            }
        }.bind(this),
        function (a) {
            if (!this.destroyed_) {
                var b = this.activeSessions_.indexOf(c);
                goog.asserts.assert(0 <= b, "Session must be in the array");
                this.activeSessions_.splice(b, 1);
                this.onError_(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.FAILED_TO_CREATE_SESSION, a.message))
            }
        }.bind(this))
};
shaka.media.DrmEngine.prototype.createTemporarySession_ = function (a, b) {
    try {
        var c = this.isOffline_ ? this.mediaKeys_.createSession("persistent-license") : this.mediaKeys_.createSession()
    } catch (d) {
        this.onError_(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.FAILED_TO_CREATE_SESSION, d.message));
        return
    }
    this.eventManager_.listen(c, "message", this.onSessionMessage_.bind(this));
    this.eventManager_.listen(c, "keystatuseschange", this.onKeyStatusesChange_.bind(this));
    this.activeSessions_.push({initData: b, session: c, loaded: !1, oldExpiration: Infinity, updatePromise: null});
    c.generateRequest(a, b.buffer)["catch"](function (a) {
        if (!this.destroyed_) {
            for (var b = 0; b < this.activeSessions_.length; ++b) if (this.activeSessions_[b].session == c) {
                this.activeSessions_.splice(b, 1);
                break
            }
            this.onError_(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.FAILED_TO_GENERATE_LICENSE_REQUEST, a.message))
        }
    }.bind(this))
};
shaka.media.DrmEngine.prototype.onSessionMessage_ = function (a) {
    this.delayLicenseRequest_() ? this.mediaKeyMessageEvents_.push(a) : this.sendLicenseRequest_(a)
};
shaka.media.DrmEngine.prototype.delayLicenseRequest_ = function () {
    return this.config_.delayLicenseRequestUntilPlayed && this.video_.paused && !this.initialRequestsSent_
};
shaka.media.DrmEngine.prototype.sendLicenseRequest_ = function (a) {
    for (var b = a.target, c, d = 0; d < this.activeSessions_.length; d++) if (this.activeSessions_[d].session == b) {
        c = this.activeSessions_[d];
        break
    }
    var d = shaka.net.NetworkingEngine.RequestType.LICENSE,
        e = shaka.net.NetworkingEngine.makeRequest([this.currentDrmInfo_.licenseServerUri], this.config_.retryParameters);
    e.body = a.message;
    e.method = "POST";
    "com.microsoft.playready" != this.currentDrmInfo_.keySystem && "com.chromecast.playready" != this.currentDrmInfo_.keySystem ||
    this.unpackPlayReadyRequest_(e);
    this.playerInterface_.netEngine.request(d, e).then(function (a) {
        return this.destroyed_ ? Promise.reject() : b.update(a.data).then(function () {
            var a = new shaka.util.FakeEvent("drmsessionupdate");
            this.playerInterface_.onEvent(a);
            c && (c.updatePromise && c.updatePromise.resolve(), setTimeout(function () {
                c.loaded = !0;
                this.activeSessions_.every(function (a) {
                    return a.loaded
                }) && this.allSessionsLoaded_.resolve()
            }.bind(this), 5E3))
        }.bind(this))
    }.bind(this), function (a) {
        if (this.destroyed_) return Promise.resolve();
        goog.asserts.assert(a instanceof shaka.util.Error, "Wrong NetworkingEngine error type!");
        a = new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.LICENSE_REQUEST_FAILED, a);
        this.onError_(a);
        c && c.updatePromise && c.updatePromise.reject(a)
    }.bind(this))["catch"](function (a) {
        if (this.destroyed_) return Promise.resolve();
        a = new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.LICENSE_RESPONSE_REJECTED,
            a.message);
        this.onError_(a);
        c && c.updatePromise && c.updatePromise.reject(a)
    }.bind(this))
};
shaka.media.DrmEngine.prototype.unpackPlayReadyRequest_ = function (a) {
    var b = shaka.util.StringUtils.fromUTF16(a.body, !0, !0);
    if (-1 == b.indexOf("PlayReadyKeyMessage")) shaka.log.debug("PlayReady request is already unwrapped."), a.headers["Content-Type"] = "text/xml; charset=utf-8"; else {
        shaka.log.debug("Unwrapping PlayReady request.");
        for (var b = (new DOMParser).parseFromString(b, "application/xml"), c = b.getElementsByTagName("HttpHeader"), d = 0; d < c.length; ++d) {
            var e = c[d].querySelector("name"), f = c[d].querySelector("value");
            goog.asserts.assert(e && f, "Malformed PlayReady headers!");
            a.headers[e.textContent] = f.textContent
        }
        b = b.querySelector("Challenge");
        goog.asserts.assert(b, "Malformed PlayReady challenge!");
        goog.asserts.assert("base64encoded" == b.getAttribute("encoding"), "Unexpected PlayReady challenge encoding!");
        a.body = shaka.util.Uint8ArrayUtils.fromBase64(b.textContent).buffer
    }
};
shaka.media.DrmEngine.prototype.onKeyStatusesChange_ = function (a) {
    a = a.target;
    var b;
    for (b = 0; b < this.activeSessions_.length && this.activeSessions_[b].session != a; ++b) ;
    goog.asserts.assert(b < this.activeSessions_.length, "Key status change for inactive session!");
    if (b != this.activeSessions_.length) {
        var c = !1;
        a.keyStatuses.forEach(function (a, d) {
            if ("string" == typeof d) {
                var e = d;
                d = a;
                a = e
            }
            if ("com.microsoft.playready" == this.currentDrmInfo_.keySystem && 16 == d.byteLength) {
                var e = new DataView(d), f = e.getUint32(0, !0), k = e.getUint16(4,
                    !0), l = e.getUint16(6, !0);
                e.setUint32(0, f, !1);
                e.setUint16(4, k, !1);
                e.setUint16(6, l, !1)
            }
            "com.microsoft.playready" == this.currentDrmInfo_.keySystem && "status-pending" == a && (a = "usable");
            "status-pending" != a && (this.activeSessions_[b].loaded = !0, this.activeSessions_.every(function (a) {
                return a.loaded
            }) && this.allSessionsLoaded_.resolve());
            "expired" == a && (c = !0);
            e = shaka.util.Uint8ArrayUtils.toHex(new Uint8Array(d));
            this.keyStatusByKeyId_[e] = a
        }.bind(this));
        var d = a.expiration - Date.now();
        (0 > d || c && 1E3 > d) && !this.activeSessions_[b].updatePromise &&
        (shaka.log.debug("Session has expired", a), this.activeSessions_.splice(b, 1), a.close());
        this.keyStatusTimer_.schedule(.5)
    }
};
shaka.media.DrmEngine.prototype.processKeyStatusChanges_ = function () {
    function a(a, b) {
        return "expired" == b
    }

    var b = shaka.util.MapUtils;
    if (!b.empty(this.keyStatusByKeyId_) && b.every(this.keyStatusByKeyId_, a)) this.onError_(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.DRM, shaka.util.Error.Code.EXPIRED));
    this.playerInterface_.onKeyStatus(this.keyStatusByKeyId_)
};
shaka.media.DrmEngine.isBrowserSupported = function () {
    return !!window.MediaKeys && !!window.navigator && !!window.navigator.requestMediaKeySystemAccess && !!window.MediaKeySystemAccess && !!window.MediaKeySystemAccess.prototype.getConfiguration
};
shaka.media.DrmEngine.probeSupport = function () {
    goog.asserts.assert(shaka.media.DrmEngine.isBrowserSupported(), "Must have basic EME support");
    var a = [], b = [{contentType: 'video/mp4; codecs="avc1.42E01E"'}, {contentType: 'video/webm; codecs="vp8"'}],
        c = [{
            videoCapabilities: b,
            persistentState: "required",
            sessionTypes: ["persistent-license"]
        }, {videoCapabilities: b}], d = {};
    "org.w3.clearkey com.widevine.alpha com.apple.fps.2_0 com.apple.fps.1_0 com.apple.fps com.adobe.primetime".split(" ").forEach(function (b) {
        var e =
            navigator.requestMediaKeySystemAccess(b, c).then(function (a) {
                var c = a.getConfiguration().sessionTypes, c = c ? 0 <= c.indexOf("persistent-license") : !1;
                0 <= navigator.userAgent.indexOf("Tizen 3") && (c = !1);
                d[b] = {persistentState: c};
                return a.createMediaKeys()
            })["catch"](function () {
                d[b] = null
            });
        a.push(e)
    });
    return Promise.all(a).then(function () {
        return d
    })
};
shaka.media.DrmEngine.prototype.onPlay_ = function () {
    for (var a = 0; a < this.mediaKeyMessageEvents_.length; a++) this.sendLicenseRequest_(this.mediaKeyMessageEvents_[a]);
    this.initialRequestsSent_ = !0;
    this.mediaKeyMessageEvents_ = []
};
shaka.media.DrmEngine.prototype.isSupportedByKeySystem = function (a) {
    var b = this.keySystem();
    return 0 == a.drmInfos.length || a.drmInfos.some(function (a) {
        return a.keySystem == b
    })
};
shaka.media.DrmEngine.areDrmCompatible = function (a, b) {
    return a.length && b.length ? 0 < shaka.media.DrmEngine.getCommonDrmInfos(a, b).length : !0
};
shaka.media.DrmEngine.getCommonDrmInfos = function (a, b) {
    if (!a.length) return b;
    if (!b.length) return a;
    for (var c = [], d = 0; d < a.length; d++) for (var e = 0; e < b.length; e++) if (a[d].keySystem == b[e].keySystem) {
        var f = a[d], e = b[e], g = [], g = g.concat(f.initData || []), g = g.concat(e.initData || []), h = [],
            h = h.concat(f.keyIds), h = h.concat(e.keyIds);
        c.push({
            keySystem: f.keySystem,
            licenseServerUri: f.licenseServerUri || e.licenseServerUri,
            distinctiveIdentifierRequired: f.distinctiveIdentifierRequired || e.distinctiveIdentifierRequired,
            persistentStateRequired: f.persistentStateRequired ||
            e.persistentStateRequired,
            videoRobustness: f.videoRobustness || e.videoRobustness,
            audioRobustness: f.audioRobustness || e.audioRobustness,
            serverCertificate: f.serverCertificate || e.serverCertificate,
            initData: g,
            keyIds: h
        });
        break
    }
    return c
};
shaka.media.DrmEngine.prototype.pollExpiration_ = function () {
    this.activeSessions_.forEach(function (a) {
        var b = a.oldExpiration, c = a.session.expiration;
        isNaN(c) && (c = Infinity);
        c != b && (this.playerInterface_.onExpirationUpdated(a.session.sessionId, c), a.oldExpiration = c)
    }.bind(this))
};
shaka.media.TimeRangesUtils = {};
shaka.media.TimeRangesUtils.bufferStart = function (a) {
    return !a || 1 == a.length && 1E-6 > a.end(0) - a.start(0) ? null : 1 == a.length && 0 > a.start(0) ? 0 : a.length ? a.start(0) : null
};
shaka.media.TimeRangesUtils.bufferEnd = function (a) {
    return !a || 1 == a.length && 1E-6 > a.end(0) - a.start(0) ? null : a.length ? a.end(a.length - 1) : null
};
shaka.media.TimeRangesUtils.isBuffered = function (a, b) {
    return !a || !a.length || 1 == a.length && 1E-6 > a.end(0) - a.start(0) ? !1 : b >= a.start(0) && b <= a.end(a.length - 1)
};
shaka.media.TimeRangesUtils.bufferedAheadOf = function (a, b) {
    if (!a || !a.length || 1 == a.length && 1E-6 > a.end(0) - a.start(0)) return 0;
    for (var c = 0, d = a.length - 1; 0 <= d && a.end(d) > b; --d) c += a.end(d) - Math.max(a.start(d), b);
    return c
};
shaka.media.TimeRangesUtils.getGapIndex = function (a, b) {
    if (!a || !a.length || 1 == a.length && 1E-6 > a.end(0) - a.start(0)) return null;
    var c = .1;
    /(Edge\/|Trident\/|Tizen)/.test(navigator.userAgent) && (c = .5);
    for (var d = 0; d < a.length; d++) if (a.start(d) > b && (0 == d || a.end(d - 1) - b <= c)) return d;
    return null
};
shaka.media.TimeRangesUtils.getBufferedInfo = function (a) {
    if (!a) return [];
    for (var b = [], c = 0; c < a.length; c++) b.push({start: a.start(c), end: a.end(c)});
    return b
};
shaka.text = {};
shaka.text.TextEngine = function (a) {
    this.parser_ = null;
    this.displayer_ = a;
    this.appendWindowStart_ = this.timestampOffset_ = 0;
    this.appendWindowEnd_ = Infinity;
    this.bufferEnd_ = this.bufferStart_ = null
};
shaka.text.TextEngine.parserMap_ = {};
shaka.text.TextEngine.registerParser = function (a, b) {
    0 == b.length ? shaka.text.TextEngine.parserMap_[a] = b : (shaka.log.alwaysWarn("The use of stateless text parsers is deprecated."), shaka.text.TextEngine.parserMap_[a] = shaka.text.TextEngine.TextParserWrapper_.bind(null, b))
};
goog.exportSymbol("shaka.text.TextEngine.registerParser", shaka.text.TextEngine.registerParser);
shaka.text.TextEngine.unregisterParser = function (a) {
    delete shaka.text.TextEngine.parserMap_[a]
};
goog.exportSymbol("shaka.text.TextEngine.unregisterParser", shaka.text.TextEngine.unregisterParser);
shaka.text.TextEngine.isTypeSupported = function (a) {
    return !!shaka.text.TextEngine.parserMap_[a]
};
shaka.text.TextEngine.prototype.destroy = function () {
    this.displayer_ = this.parser_ = null;
    return Promise.resolve()
};
shaka.text.TextEngine.prototype.setDisplayer = function (a) {
    this.displayer_ = a
};
goog.exportProperty(shaka.text.TextEngine.prototype, "setDisplayer", shaka.text.TextEngine.prototype.setDisplayer);
shaka.text.TextEngine.prototype.initParser = function (a) {
    a = shaka.text.TextEngine.parserMap_[a];
    goog.asserts.assert(a, "Text type negotiation should have happened already");
    this.parser_ = new a
};
shaka.text.TextEngine.prototype.appendBuffer = function (a, b, c) {
    goog.asserts.assert(this.parser_, "The parser should already be initialized");
    return Promise.resolve().then(function () {
        if (this.parser_ && this.displayer_) if (null == b || null == c) this.parser_.parseInit(a); else {
            var d = this.parser_.parseMedia(a, {
                periodStart: this.timestampOffset_,
                segmentStart: b,
                segmentEnd: c
            }).filter(function (a) {
                return a.startTime >= this.appendWindowStart_ && a.startTime < this.appendWindowEnd_
            }.bind(this));
            this.displayer_.append(d);
            null ==
            this.bufferStart_ ? this.bufferStart_ = Math.max(b, this.appendWindowStart_) : goog.asserts.assert(1 >= b - this.bufferEnd_, "There should not be a gap in text references >1s");
            this.bufferEnd_ = Math.min(c, this.appendWindowEnd_)
        }
    }.bind(this))
};
shaka.text.TextEngine.prototype.remove = function (a, b) {
    return Promise.resolve().then(function () {
        this.displayer_ && this.displayer_.remove(a, b) && (null == this.bufferStart_ ? goog.asserts.assert(null == this.bufferEnd_, "end must be null if start is null") : (goog.asserts.assert(null != this.bufferEnd_, "end must be non-null if start is non-null"), b <= this.bufferStart_ || a >= this.bufferEnd_ || (a <= this.bufferStart_ && b >= this.bufferEnd_ ? this.bufferStart_ = this.bufferEnd_ = null : a <= this.bufferStart_ && b < this.bufferEnd_ ? this.bufferStart_ =
            b : a > this.bufferStart_ && b >= this.bufferEnd_ ? this.bufferEnd_ = a : goog.asserts.assert(!1, "removal from the middle is not supported by TextEngine"))))
    }.bind(this))
};
shaka.text.TextEngine.prototype.setTimestampOffset = function (a) {
    this.timestampOffset_ = a
};
shaka.text.TextEngine.prototype.setAppendWindow = function (a, b) {
    this.appendWindowStart_ = a;
    this.appendWindowEnd_ = b
};
shaka.text.TextEngine.prototype.bufferStart = function () {
    return this.bufferStart_
};
shaka.text.TextEngine.prototype.bufferEnd = function () {
    return this.bufferEnd_
};
shaka.text.TextEngine.prototype.isBuffered = function (a) {
    return a >= this.bufferStart_ && a < this.bufferEnd_
};
shaka.text.TextEngine.prototype.bufferedAheadOf = function (a) {
    if (null == this.bufferEnd_ || this.bufferEnd_ < a) return 0;
    goog.asserts.assert(null != this.bufferStart_, "start should not be null if end is not null");
    return this.bufferEnd_ - Math.max(a, this.bufferStart_)
};
shaka.text.TextEngine.TextParserWrapper_ = function (a) {
    this.parser = a
};
shaka.text.TextEngine.TextParserWrapper_.prototype.parseInit = function (a) {
    this.parser(a, 0, null, null)
};
shaka.text.TextEngine.TextParserWrapper_.prototype.parseMedia = function (a, b) {
    return this.parser(a, b.periodStart, b.segmentStart, b.segmentEnd)
};
shaka.media.MediaSourceEngine = function (a, b, c) {
    goog.asserts.assert("open" == b.readyState, "The MediaSource should be in the 'open' state.");
    this.video_ = a;
    this.mediaSource_ = b;
    this.textDisplayer_ = c;
    this.sourceBuffers_ = {};
    this.textEngine_ = null;
    this.queues_ = {};
    this.eventManager_ = new shaka.util.EventManager;
    this.destroyed_ = !1
};
shaka.media.MediaSourceEngine.isStreamSupported = function (a) {
    var b = shaka.util.MimeUtils.getFullType(a.mimeType, a.codecs);
    a = shaka.util.MimeUtils.getExtendedType(a);
    return shaka.text.TextEngine.isTypeSupported(b) || MediaSource.isTypeSupported(a)
};
shaka.media.MediaSourceEngine.isBrowserSupported = function () {
    return !!window.MediaSource && !!MediaSource.isTypeSupported
};
shaka.media.MediaSourceEngine.probeSupport = function () {
    goog.asserts.assert(shaka.media.MediaSourceEngine.isBrowserSupported(), "Requires basic support");
    var a = {};
    'video/mp4; codecs="avc1.42E01E",video/mp4; codecs="avc3.42E01E",video/mp4; codecs="hev1.1.6.L93.90",video/mp4; codecs="hvc1.1.6.L93.90",video/mp4; codecs="hev1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="hvc1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="vp9",video/mp4; codecs="vp09.00.10.08",audio/mp4; codecs="mp4a.40.2",audio/mp4; codecs="ac-3",audio/mp4; codecs="ec-3",audio/mp4; codecs="opus",audio/mp4; codecs="flac",video/webm; codecs="vp8",video/webm; codecs="vp9",video/webm; codecs="av1",audio/webm; codecs="vorbis",audio/webm; codecs="opus",video/mp2t; codecs="avc1.42E01E",video/mp2t; codecs="avc3.42E01E",video/mp2t; codecs="hvc1.1.6.L93.90",video/mp2t; codecs="mp4a.40.2",video/mp2t; codecs="ac-3",video/mp2t; codecs="ec-3",video/mp2t; codecs="mp4a.40.2",text/vtt,application/mp4; codecs="wvtt",application/ttml+xml,application/mp4; codecs="stpp"'.split(",").forEach(function (b) {
        a[b] =
            shaka.text.TextEngine.isTypeSupported(b) || MediaSource.isTypeSupported(b);
        var c = b.split(";")[0];
        a[c] = a[c] || a[b]
    });
    return a
};
shaka.media.MediaSourceEngine.prototype.destroy = function () {
    var a = shaka.util.Functional;
    this.destroyed_ = !0;
    var b = [], c;
    for (c in this.queues_) {
        var d = this.queues_[c], e = d[0];
        this.queues_[c] = d.slice(0, 1);
        e && b.push(e.p["catch"](a.noop));
        for (e = 1; e < d.length; ++e) d[e].p["catch"](a.noop), d[e].p.reject()
    }
    this.textEngine_ && b.push(this.textEngine_.destroy());
    return Promise.all(b).then(function () {
        this.eventManager_.destroy();
        this.textDisplayer_ = this.textEngine_ = this.mediaSource_ = this.video_ = this.eventManager_ = null;
        this.sourceBuffers_ = {};
        if (goog.DEBUG) for (var a in this.queues_) goog.asserts.assert(0 == this.queues_[a].length, a + " queue should be empty after destroy!");
        this.queues_ = {}
    }.bind(this))
};
shaka.media.MediaSourceEngine.prototype.init = function (a) {
    var b = shaka.util.ManifestParserUtils.ContentType, c;
    for (c in a) {
        var d = a[c];
        goog.asserts.assert(shaka.media.MediaSourceEngine.isStreamSupported(d), "Type negotiation should happen before MediaSourceEngine.init!");
        d = shaka.util.MimeUtils.getFullType(d.mimeType, d.codecs);
        c == b.TEXT ? this.reinitText(d) : (d = this.mediaSource_.addSourceBuffer(d), this.eventManager_.listen(d, "error", this.onError_.bind(this, c)), this.eventManager_.listen(d, "updateend", this.onUpdateEnd_.bind(this,
            c)), this.sourceBuffers_[c] = d, this.queues_[c] = [])
    }
};
shaka.media.MediaSourceEngine.prototype.reinitText = function (a) {
    this.textEngine_ || (this.textEngine_ = new shaka.text.TextEngine(this.textDisplayer_));
    this.textEngine_.initParser(a)
};
shaka.media.MediaSourceEngine.prototype.bufferStart = function (a) {
    return a == shaka.util.ManifestParserUtils.ContentType.TEXT ? this.textEngine_.bufferStart() : shaka.media.TimeRangesUtils.bufferStart(this.getBuffered_(a))
};
shaka.media.MediaSourceEngine.prototype.bufferEnd = function (a) {
    return a == shaka.util.ManifestParserUtils.ContentType.TEXT ? this.textEngine_.bufferEnd() : shaka.media.TimeRangesUtils.bufferEnd(this.getBuffered_(a))
};
shaka.media.MediaSourceEngine.prototype.isBuffered = function (a, b) {
    if (a == shaka.util.ManifestParserUtils.ContentType.TEXT) return this.textEngine_.isBuffered(b);
    var c = this.getBuffered_(a);
    return shaka.media.TimeRangesUtils.isBuffered(c, b)
};
shaka.media.MediaSourceEngine.prototype.bufferedAheadOf = function (a, b) {
    if (a == shaka.util.ManifestParserUtils.ContentType.TEXT) return this.textEngine_.bufferedAheadOf(b);
    var c = this.getBuffered_(a);
    return shaka.media.TimeRangesUtils.bufferedAheadOf(c, b)
};
shaka.media.MediaSourceEngine.prototype.getBufferedInfo = function () {
    var a = shaka.util.ManifestParserUtils.ContentType, b = shaka.media.TimeRangesUtils.getBufferedInfo;
    var c = this.textEngine_ && null != this.textEngine_.bufferStart() ? [{
        start: this.textEngine_.bufferStart(),
        end: this.textEngine_.bufferEnd()
    }] : [];
    return {
        total: b(this.video_.buffered),
        audio: b(this.getBuffered_(a.AUDIO)),
        video: b(this.getBuffered_(a.VIDEO)),
        text: c
    }
};
shaka.media.MediaSourceEngine.prototype.getBuffered_ = function (a) {
    try {
        return this.sourceBuffers_[a].buffered
    } catch (b) {
        return a in this.sourceBuffers_ && shaka.log.error("failed to get buffered range for " + a, b), null
    }
};
shaka.media.MediaSourceEngine.prototype.appendBuffer = function (a, b, c, d) {
    return a == shaka.util.ManifestParserUtils.ContentType.TEXT ? this.textEngine_.appendBuffer(b, c, d) : this.enqueueOperation_(a, this.append_.bind(this, a, b))
};
shaka.media.MediaSourceEngine.prototype.remove = function (a, b, c) {
    goog.asserts.assert(c < Number.MAX_VALUE, "remove() with MAX_VALUE or Infinity is not IE-compatible!");
    return a == shaka.util.ManifestParserUtils.ContentType.TEXT ? this.textEngine_.remove(b, c) : this.enqueueOperation_(a, this.remove_.bind(this, a, b, c))
};
shaka.media.MediaSourceEngine.prototype.clear = function (a) {
    return a == shaka.util.ManifestParserUtils.ContentType.TEXT ? this.textEngine_.remove(0, Infinity) : this.enqueueOperation_(a, this.remove_.bind(this, a, 0, this.mediaSource_.duration))
};
shaka.media.MediaSourceEngine.prototype.flush = function (a) {
    return a == shaka.util.ManifestParserUtils.ContentType.TEXT ? Promise.resolve() : this.enqueueOperation_(a, this.flush_.bind(this, a))
};
shaka.media.MediaSourceEngine.prototype.setStreamProperties = function (a, b, c, d) {
    return a == shaka.util.ManifestParserUtils.ContentType.TEXT ? (this.textEngine_.setTimestampOffset(b), this.textEngine_.setAppendWindow(c, d), Promise.resolve()) : Promise.all([this.enqueueOperation_(a, this.abort_.bind(this, a)), this.enqueueOperation_(a, this.setTimestampOffset_.bind(this, a, b)), this.enqueueOperation_(a, this.setAppendWindow_.bind(this, a, c, d))])
};
shaka.media.MediaSourceEngine.prototype.endOfStream = function (a) {
    return this.enqueueBlockingOperation_(function () {
        a ? this.mediaSource_.endOfStream(a) : this.mediaSource_.endOfStream()
    }.bind(this))
};
shaka.media.MediaSourceEngine.prototype.setDuration = function (a) {
    goog.asserts.assert(isNaN(this.mediaSource_.duration) || this.mediaSource_.duration <= a, "duration cannot decrease: " + this.mediaSource_.duration + " -> " + a);
    return this.enqueueBlockingOperation_(function () {
        this.mediaSource_.duration = a
    }.bind(this))
};
shaka.media.MediaSourceEngine.prototype.getDuration = function () {
    return this.mediaSource_.duration
};
shaka.media.MediaSourceEngine.prototype.append_ = function (a, b) {
    this.sourceBuffers_[a].appendBuffer(b)
};
shaka.media.MediaSourceEngine.prototype.remove_ = function (a, b, c) {
    if (c <= b) this.onUpdateEnd_(a); else this.sourceBuffers_[a].remove(b, c)
};
shaka.media.MediaSourceEngine.prototype.abort_ = function (a) {
    var b = this.sourceBuffers_[a].appendWindowStart, c = this.sourceBuffers_[a].appendWindowEnd;
    this.sourceBuffers_[a].abort();
    this.sourceBuffers_[a].appendWindowStart = b;
    this.sourceBuffers_[a].appendWindowEnd = c;
    this.onUpdateEnd_(a)
};
shaka.media.MediaSourceEngine.prototype.flush_ = function (a) {
    goog.asserts.assert(0 == this.video_.buffered.length, "MediaSourceEngine.flush_ should only be used after clearing all data!");
    this.video_.currentTime -= .001;
    this.onUpdateEnd_(a)
};
shaka.media.MediaSourceEngine.prototype.setTimestampOffset_ = function (a, b) {
    this.sourceBuffers_[a].timestampOffset = b;
    this.onUpdateEnd_(a)
};
shaka.media.MediaSourceEngine.prototype.setAppendWindow_ = function (a, b, c) {
    this.sourceBuffers_[a].appendWindowStart = 0;
    this.sourceBuffers_[a].appendWindowEnd = c;
    this.sourceBuffers_[a].appendWindowStart = b;
    this.onUpdateEnd_(a)
};
shaka.media.MediaSourceEngine.prototype.onError_ = function (a, b) {
    var c = this.queues_[a][0];
    goog.asserts.assert(c, "Spurious error event!");
    goog.asserts.assert(!this.sourceBuffers_[a].updating, "SourceBuffer should not be updating on error!");
    c.p.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.MEDIA_SOURCE_OPERATION_FAILED, this.video_.error ? this.video_.error.code : 0))
};
shaka.media.MediaSourceEngine.prototype.onUpdateEnd_ = function (a) {
    var b = this.queues_[a][0];
    goog.asserts.assert(b, "Spurious updateend event!");
    b && (goog.asserts.assert(!this.sourceBuffers_[a].updating, "SourceBuffer should not be updating on updateend!"), b.p.resolve(), this.popFromQueue_(a))
};
shaka.media.MediaSourceEngine.prototype.enqueueOperation_ = function (a, b) {
    if (this.destroyed_) return Promise.reject();
    var c = {start: b, p: new shaka.util.PublicPromise};
    this.queues_[a].push(c);
    if (1 == this.queues_[a].length) try {
        c.start()
    } catch (d) {
        "QuotaExceededError" == d.name ? c.p.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.QUOTA_EXCEEDED_ERROR, a)) : c.p.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA,
            shaka.util.Error.Code.MEDIA_SOURCE_OPERATION_THREW, d)), this.popFromQueue_(a)
    }
    return c.p
};
shaka.media.MediaSourceEngine.prototype.enqueueBlockingOperation_ = function (a) {
    if (this.destroyed_) return Promise.reject();
    var b = [], c;
    for (c in this.sourceBuffers_) {
        var d = new shaka.util.PublicPromise, e = {
            start: function (a) {
                a.resolve()
            }.bind(null, d), p: d
        };
        this.queues_[c].push(e);
        b.push(d);
        1 == this.queues_[c].length && e.start()
    }
    return Promise.all(b).then(function () {
        if (goog.DEBUG) for (var b in this.sourceBuffers_) goog.asserts.assert(0 == this.sourceBuffers_[b].updating, "SourceBuffers should not be updating after a blocking op!");
        try {
            a()
        } catch (h) {
            var c = Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.MEDIA_SOURCE_OPERATION_THREW, h))
        }
        for (b in this.sourceBuffers_) this.popFromQueue_(b);
        return c
    }.bind(this), function () {
        goog.asserts.assert(this.destroyed_, "Should be destroyed by now");
        if (goog.DEBUG) for (var a in this.sourceBuffers_) this.queues_[a].length && (goog.asserts.assert(1 == this.queues_[a].length, "Should be at most one item in queue!"), goog.asserts.assert(-1 !=
            b.indexOf(this.queues_[a][0].p), "The item in queue should be one of our waiters!"), this.queues_[a].shift());
        return Promise.reject()
    }.bind(this))
};
shaka.media.MediaSourceEngine.prototype.popFromQueue_ = function (a) {
    this.queues_[a].shift();
    var b = this.queues_[a][0];
    if (b) try {
        b.start()
    } catch (c) {
        b.p.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.MEDIA_SOURCE_OPERATION_THREW, c)), this.popFromQueue_(a)
    }
};
shaka.util.LanguageUtils = {};
shaka.util.LanguageUtils.match = function (a, b, c) {
    var d = shaka.util.LanguageUtils;
    goog.asserts.assert(b == d.normalize(b), "Language pref should be normalized first");
    goog.asserts.assert(c == d.normalize(c), "Language candidate should be normalized first");
    return c == b || a >= shaka.util.LanguageUtils.MatchType.BASE_LANGUAGE_OKAY && c == b.split("-")[0] || a >= shaka.util.LanguageUtils.MatchType.OTHER_SUB_LANGUAGE_OKAY && c.split("-")[0] == b.split("-")[0] ? !0 : !1
};
shaka.util.LanguageUtils.MatchType = {EXACT: 0, BASE_LANGUAGE_OKAY: 1, OTHER_SUB_LANGUAGE_OKAY: 2};
shaka.util.LanguageUtils.normalize = function (a) {
    a = a.toLowerCase().split("-");
    var b = shaka.util.LanguageUtils.isoMap_[a[0]];
    b && (a[0] = b);
    return a.join("-")
};
shaka.util.LanguageUtils.isoMap_ = {
    aar: "aa",
    abk: "ab",
    afr: "af",
    aka: "ak",
    alb: "sq",
    amh: "am",
    ara: "ar",
    arg: "an",
    arm: "hy",
    asm: "as",
    ava: "av",
    ave: "ae",
    aym: "ay",
    aze: "az",
    bak: "ba",
    bam: "bm",
    baq: "eu",
    bel: "be",
    ben: "bn",
    bih: "bh",
    bis: "bi",
    bod: "bo",
    bos: "bs",
    bre: "br",
    bul: "bg",
    bur: "my",
    cat: "ca",
    ces: "cs",
    cha: "ch",
    che: "ce",
    chi: "zh",
    chu: "cu",
    chv: "cv",
    cor: "kw",
    cos: "co",
    cre: "cr",
    cym: "cy",
    cze: "cs",
    dan: "da",
    deu: "de",
    div: "dv",
    dut: "nl",
    dzo: "dz",
    ell: "el",
    eng: "en",
    epo: "eo",
    est: "et",
    eus: "eu",
    ewe: "ee",
    fao: "fo",
    fas: "fa",
    fij: "fj",
    fin: "fi",
    fra: "fr",
    fre: "fr",
    fry: "fy",
    ful: "ff",
    geo: "ka",
    ger: "de",
    gla: "gd",
    gle: "ga",
    glg: "gl",
    glv: "gv",
    gre: "el",
    grn: "gn",
    guj: "gu",
    hat: "ht",
    hau: "ha",
    heb: "he",
    her: "hz",
    hin: "hi",
    hmo: "ho",
    hrv: "hr",
    hun: "hu",
    hye: "hy",
    ibo: "ig",
    ice: "is",
    ido: "io",
    iii: "ii",
    iku: "iu",
    ile: "ie",
    ina: "ia",
    ind: "id",
    ipk: "ik",
    isl: "is",
    ita: "it",
    jav: "jv",
    jpn: "ja",
    kal: "kl",
    kan: "kn",
    kas: "ks",
    kat: "ka",
    kau: "kr",
    kaz: "kk",
    khm: "km",
    kik: "ki",
    kin: "rw",
    kir: "ky",
    kom: "kv",
    kon: "kg",
    kor: "ko",
    kua: "kj",
    kur: "ku",
    lao: "lo",
    lat: "la",
    lav: "lv",
    lim: "li",
    lin: "ln",
    lit: "lt",
    ltz: "lb",
    lub: "lu",
    lug: "lg",
    mac: "mk",
    mah: "mh",
    mal: "ml",
    mao: "mi",
    mar: "mr",
    may: "ms",
    mkd: "mk",
    mlg: "mg",
    mlt: "mt",
    mon: "mn",
    mri: "mi",
    msa: "ms",
    mya: "my",
    nau: "na",
    nav: "nv",
    nbl: "nr",
    nde: "nd",
    ndo: "ng",
    nep: "ne",
    nld: "nl",
    nno: "nn",
    nob: "nb",
    nor: "no",
    nya: "ny",
    oci: "oc",
    oji: "oj",
    ori: "or",
    orm: "om",
    oss: "os",
    pan: "pa",
    per: "fa",
    pli: "pi",
    pol: "pl",
    por: "pt",
    pus: "ps",
    que: "qu",
    roh: "rm",
    ron: "ro",
    rum: "ro",
    run: "rn",
    rus: "ru",
    sag: "sg",
    san: "sa",
    sin: "si",
    slk: "sk",
    slo: "sk",
    slv: "sl",
    sme: "se",
    smo: "sm",
    sna: "sn",
    snd: "sd",
    som: "so",
    sot: "st",
    spa: "es",
    sqi: "sq",
    srd: "sc",
    srp: "sr",
    ssw: "ss",
    sun: "su",
    swa: "sw",
    swe: "sv",
    tah: "ty",
    tam: "ta",
    tat: "tt",
    tel: "te",
    tgk: "tg",
    tgl: "tl",
    tha: "th",
    tib: "bo",
    tir: "ti",
    ton: "to",
    tsn: "tn",
    tso: "ts",
    tuk: "tk",
    tur: "tr",
    twi: "tw",
    uig: "ug",
    ukr: "uk",
    urd: "ur",
    uzb: "uz",
    ven: "ve",
    vie: "vi",
    vol: "vo",
    wel: "cy",
    wln: "wa",
    wol: "wo",
    xho: "xh",
    yid: "yi",
    yor: "yo",
    zha: "za",
    zho: "zh",
    zul: "zu"
};
shaka.util.StreamUtils = {};
shaka.util.StreamUtils.meetsRestrictions = function (a, b, c) {
    var d = a.video;
    return d && (d.width < b.minWidth || d.width > b.maxWidth || d.width > c.width || d.height < b.minHeight || d.height > b.maxHeight || d.height > c.height || d.width * d.height < b.minPixels || d.width * d.height > b.maxPixels) || a.bandwidth < b.minBandwidth || a.bandwidth > b.maxBandwidth ? !1 : !0
};
shaka.util.StreamUtils.applyRestrictions = function (a, b, c) {
    var d = !1;
    a.variants.forEach(function (a) {
        var e = a.allowedByApplication;
        a.allowedByApplication = shaka.util.StreamUtils.meetsRestrictions(a, b, c);
        e != a.allowedByApplication && (d = !0)
    });
    return d
};
shaka.util.StreamUtils.filterNewPeriod = function (a, b, c) {
    var d = shaka.util.StreamUtils, e = shaka.util.ManifestParserUtils.ContentType, f = b[e.VIDEO], e = b[e.AUDIO];
    for (b = 0; b < c.variants.length; ++b) {
        var g = c.variants[b];
        d.variantIsCompatible_(g, a, e, f) || (shaka.log.debug("Dropping Variant (not compatible with key system, platform, or active Variant)", g), c.variants.splice(b, 1), --b)
    }
    for (b = 0; b < c.textStreams.length; ++b) a = c.textStreams[b], d = shaka.util.MimeUtils.getFullType(a.mimeType, a.codecs), shaka.text.TextEngine.isTypeSupported(d) ||
    (shaka.log.debug("Dropping text stream. Is not supported by the platform.", a), c.textStreams.splice(b, 1), --b)
};
shaka.util.StreamUtils.streamIsCompatible_ = function (a, b, c) {
    if (!a) return !0;
    goog.asserts.assert(a.type != shaka.util.ManifestParserUtils.ContentType.TEXT, "Should not be called on a text stream!");
    var d = null;
    b && b.initialized() && (d = b.getSupportedTypes());
    b = shaka.util.MimeUtils.getFullType(a.mimeType, a.codecs);
    return !shaka.media.MediaSourceEngine.isStreamSupported(a) || d && a.encrypted && 0 > d.indexOf(b) || c && (a.mimeType != c.mimeType || a.codecs.split(".")[0] != c.codecs.split(".")[0]) ? !1 : !0
};
shaka.util.StreamUtils.variantIsCompatible_ = function (a, b, c, d) {
    var e = shaka.util.StreamUtils;
    return b && b.initialized() && !b.isSupportedByKeySystem(a) ? !1 : e.streamIsCompatible_(a.audio, b, c) && e.streamIsCompatible_(a.video, b, d)
};
shaka.util.StreamUtils.getVariantTracks = function (a, b, c) {
    var d = null;
    return shaka.util.StreamUtils.getPlayableVariants(a.variants).map(function (a) {
        var e = a.video && a.audio ? c == a.video.id && b == a.audio.id : a.video && c == a.video.id || a.audio && b == a.audio.id;
        var g = "";
        a.video && (g += a.video.codecs);
        a.audio && ("" != g && (g += ", "), g += a.audio.codecs, d = a.audio.label);
        var h = a.audio ? a.audio.codecs : null, k = a.video ? a.video.codecs : null, l = null;
        a.video ? l = a.video.mimeType : a.audio && (l = a.audio.mimeType);
        var m = null;
        a.audio ? m = a.audio.kind :
            a.video && (m = a.video.kind);
        var n = shaka.util.ArrayUtils.removeDuplicates((a.audio ? a.audio.roles : []).concat(a.video ? a.video.roles : []));
        return {
            id: a.id,
            active: e,
            type: "variant",
            bandwidth: a.bandwidth,
            language: a.language,
            label: d,
            kind: m || null,
            width: a.video ? a.video.width : null,
            height: a.video ? a.video.height : null,
            frameRate: a.video ? a.video.frameRate : void 0,
            mimeType: l,
            codecs: g,
            audioCodec: h,
            videoCodec: k,
            primary: a.primary,
            roles: n,
            videoId: a.video ? a.video.id : null,
            audioId: a.audio ? a.audio.id : null,
            channelsCount: a.audio ?
                a.audio.channelsCount : null,
            audioBandwidth: a.audio && a.audio.bandwidth ? a.audio.bandwidth : null,
            videoBandwidth: a.video && a.video.bandwidth ? a.video.bandwidth : null
        }
    })
};
shaka.util.StreamUtils.getTextTracks = function (a, b) {
    var c = shaka.util.ManifestParserUtils.ContentType;
    return a.textStreams.map(function (a) {
        return {
            id: a.id,
            active: b == a.id,
            type: c.TEXT,
            language: a.language,
            label: a.label,
            kind: a.kind,
            mimeType: a.mimeType,
            codecs: a.codecs || null,
            audioCodec: null,
            videoCodec: null,
            primary: a.primary,
            roles: a.roles,
            channelsCount: null,
            audioBandwidth: null,
            videoBandwidth: null
        }
    })
};
shaka.util.StreamUtils.findVariantForTrack = function (a, b) {
    for (var c = 0; c < a.variants.length; c++) if (a.variants[c].id == b.id) return a.variants[c];
    return null
};
shaka.util.StreamUtils.findTextStreamForTrack = function (a, b) {
    for (var c = 0; c < a.textStreams.length; c++) if (a.textStreams[c].id == b.id) return a.textStreams[c];
    return null
};
shaka.util.StreamUtils.isPlayable = function (a) {
    return a.allowedByApplication && a.allowedByKeySystem
};
shaka.util.StreamUtils.getPlayableVariants = function (a) {
    return a.filter(function (a) {
        return shaka.util.StreamUtils.isPlayable(a)
    })
};
shaka.util.StreamUtils.filterVariantsByLanguageAndRole = function (a, b, c, d) {
    var e = shaka.util.LanguageUtils, f = shaka.util.ManifestParserUtils.ContentType,
        g = shaka.util.StreamUtils.getPlayableVariants(a.variants), h = g.filter(function (a) {
            return a.primary
        });
    h.length || (h = g);
    var k = h.length ? h[0].language : "", h = h.filter(function (a) {
        return a.language == k
    });
    if (b) {
        var l = e.normalize(b);
        [e.MatchType.OTHER_SUB_LANGUAGE_OKAY, e.MatchType.BASE_LANGUAGE_OKAY, e.MatchType.EXACT].forEach(function (a) {
            var b = !1;
            g.forEach(function (c) {
                l =
                    e.normalize(l);
                var g = e.normalize(c.language);
                e.match(a, l, g) && (b ? h.push(c) : (h = [c], b = !0), d && (d[f.AUDIO] = !0))
            })
        })
    }
    if (c) {
        a = shaka.util.StreamUtils.filterVariantsByRole_(h, c);
        if (a.length) return a;
        shaka.log.warning("No exact match for the variant role could be found.")
    }
    a = h.map(function (a) {
        return (a.audio ? a.audio.roles : []).concat(a.video ? a.video.roles : [])
    }).reduce(shaka.util.Functional.collapseArrays, []);
    return a.length ? shaka.util.StreamUtils.filterVariantsByRole_(h, a[0]) : h
};
shaka.util.StreamUtils.filterTextStreamsByLanguageAndRole = function (a, b, c, d) {
    var e = shaka.util.LanguageUtils, f = shaka.util.ManifestParserUtils.ContentType, g = a.textStreams,
        h = g.filter(function (a) {
            return a.primary
        });
    h.length || (h = g);
    var k = h.length ? h[0].language : "", h = h.filter(function (a) {
        return a.language == k
    });
    if (b) {
        var l = e.normalize(b);
        [e.MatchType.OTHER_SUB_LANGUAGE_OKAY, e.MatchType.BASE_LANGUAGE_OKAY, e.MatchType.EXACT].forEach(function (a) {
            var b = !1;
            g.forEach(function (c) {
                var g = e.normalize(c.language);
                e.match(a,
                    l, g) && (b ? h.push(c) : (h = [c], b = !0), d && (d[f.TEXT] = !0))
            })
        })
    }
    if (c) {
        a = shaka.util.StreamUtils.filterTextStreamsByRole_(h, c);
        if (a.length) return a;
        shaka.log.warning("No exact match for the text role could be found.")
    }
    a = h.map(function (a) {
        return a.roles
    }).reduce(shaka.util.Functional.collapseArrays, []);
    return a.length ? shaka.util.StreamUtils.filterTextStreamsByRole_(h, a[0]) : h
};
shaka.util.StreamUtils.filterVariantsByRole_ = function (a, b) {
    return a.filter(function (a) {
        return a.audio && 0 <= a.audio.roles.indexOf(b) || a.video && 0 <= a.video.roles.indexOf(b)
    })
};
shaka.util.StreamUtils.filterTextStreamsByRole_ = function (a, b) {
    return a.filter(function (a) {
        return 0 <= a.roles.indexOf(b)
    })
};
shaka.util.StreamUtils.getVariantByStreams = function (a, b, c) {
    for (var d = 0; d < c.length; d++) if (c[d].audio == a && c[d].video == b) return c[d];
    return null
};
shaka.util.StreamUtils.getVariantByStreamIds = function (a, b, c) {
    function d(a, b) {
        return null == a ? null == b : b.id == a
    }

    for (var e = 0; e < c.length; e++) if (d(a, c[e].audio) && d(b, c[e].video)) return c[e];
    return null
};
shaka.util.StreamUtils.findPeriodContainingTime = function (a, b) {
    for (var c = shaka.util.ManifestParserUtils.GAP_OVERLAP_TOLERANCE_SECONDS, d = a.periods.length - 1; 0 < d; --d) if (b + c >= a.periods[d].startTime) return d;
    return 0
};
shaka.util.StreamUtils.findPeriodContainingStream = function (a, b) {
    for (var c = shaka.util.ManifestParserUtils.ContentType, d = 0; d < a.periods.length; ++d) {
        var e = a.periods[d];
        if (b.type == c.TEXT) for (var f = 0; f < e.textStreams.length; ++f) {
            if (e.textStreams[f] == b) return d
        } else for (f = 0; f < e.variants.length; ++f) {
            var g = e.variants[f];
            if (g.audio == b || g.video == b || g.video && g.video.trickModeVideo == b) return d
        }
    }
    return -1
};
shaka.util.StreamUtils.findPeriodContainingVariant = function (a, b) {
    for (var c = 0; c < a.periods.length; ++c) for (var d = a.periods[c], e = 0; e < d.variants.length; ++e) if (d.variants[e] == b) return c;
    return -1
};
shaka.util.StreamUtils.getRebufferingGoal = function (a, b, c) {
    return c * Math.max(a.minBufferTime || 0, b.rebufferingGoal)
};
shaka.abr.SimpleAbrManager = function () {
    this.switch_ = null;
    this.enabled_ = !1;
    this.bandwidthEstimator_ = new shaka.abr.EwmaBandwidthEstimator;
    this.variants_ = [];
    this.startupComplete_ = !1;
    this.config_ = this.lastTimeChosenMs_ = null
};
goog.exportSymbol("shaka.abr.SimpleAbrManager", shaka.abr.SimpleAbrManager);
shaka.abr.SimpleAbrManager.prototype.stop = function () {
    this.switch_ = null;
    this.enabled_ = !1;
    this.variants_ = [];
    this.lastTimeChosenMs_ = null
};
goog.exportProperty(shaka.abr.SimpleAbrManager.prototype, "stop", shaka.abr.SimpleAbrManager.prototype.stop);
shaka.abr.SimpleAbrManager.prototype.init = function (a) {
    this.switch_ = a
};
goog.exportProperty(shaka.abr.SimpleAbrManager.prototype, "init", shaka.abr.SimpleAbrManager.prototype.init);
shaka.abr.SimpleAbrManager.prototype.chooseVariant = function () {
    var a = shaka.abr.SimpleAbrManager.filterAndSortVariants_(this.config_.restrictions, this.variants_),
        b = this.bandwidthEstimator_.getBandwidthEstimate(this.config_.defaultBandwidthEstimate);
    if (this.variants_.length && !a.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.RESTRICTIONS_CANNOT_BE_MET);
    for (var c = a[0] || null, d = 0; d < a.length; ++d) {
        var e = a[d], f = e.bandwidth / this.config_.bandwidthDowngradeTarget,
            g = (a[d + 1] || {bandwidth: Infinity}).bandwidth / this.config_.bandwidthUpgradeTarget;
        shaka.log.v2("Bandwidth ranges:", (e.bandwidth / 1E6).toFixed(3), (f / 1E6).toFixed(3), (g / 1E6).toFixed(3));
        b >= f && b <= g && (c = e)
    }
    this.lastTimeChosenMs_ = Date.now();
    return c
};
goog.exportProperty(shaka.abr.SimpleAbrManager.prototype, "chooseVariant", shaka.abr.SimpleAbrManager.prototype.chooseVariant);
shaka.abr.SimpleAbrManager.prototype.enable = function () {
    this.enabled_ = !0
};
goog.exportProperty(shaka.abr.SimpleAbrManager.prototype, "enable", shaka.abr.SimpleAbrManager.prototype.enable);
shaka.abr.SimpleAbrManager.prototype.disable = function () {
    this.enabled_ = !1
};
goog.exportProperty(shaka.abr.SimpleAbrManager.prototype, "disable", shaka.abr.SimpleAbrManager.prototype.disable);
shaka.abr.SimpleAbrManager.prototype.segmentDownloaded = function (a, b) {
    shaka.log.v2("Segment downloaded:", "deltaTimeMs=" + a, "numBytes=" + b, "lastTimeChosenMs=" + this.lastTimeChosenMs_, "enabled=" + this.enabled_);
    goog.asserts.assert(0 <= a, "expected a non-negative duration");
    this.bandwidthEstimator_.sample(a, b);
    null != this.lastTimeChosenMs_ && this.enabled_ && this.suggestStreams_()
};
goog.exportProperty(shaka.abr.SimpleAbrManager.prototype, "segmentDownloaded", shaka.abr.SimpleAbrManager.prototype.segmentDownloaded);
shaka.abr.SimpleAbrManager.prototype.getBandwidthEstimate = function () {
    return this.bandwidthEstimator_.getBandwidthEstimate(this.config_.defaultBandwidthEstimate)
};
goog.exportProperty(shaka.abr.SimpleAbrManager.prototype, "getBandwidthEstimate", shaka.abr.SimpleAbrManager.prototype.getBandwidthEstimate);
shaka.abr.SimpleAbrManager.prototype.setVariants = function (a) {
    this.variants_ = a
};
goog.exportProperty(shaka.abr.SimpleAbrManager.prototype, "setVariants", shaka.abr.SimpleAbrManager.prototype.setVariants);
shaka.abr.SimpleAbrManager.prototype.configure = function (a) {
    this.config_ = a
};
goog.exportProperty(shaka.abr.SimpleAbrManager.prototype, "configure", shaka.abr.SimpleAbrManager.prototype.configure);
shaka.abr.SimpleAbrManager.prototype.suggestStreams_ = function () {
    shaka.log.v2("Suggesting Streams...");
    goog.asserts.assert(null != this.lastTimeChosenMs_, "lastTimeChosenMs_ should not be null");
    if (!this.startupComplete_) {
        if (!this.bandwidthEstimator_.hasGoodEstimate()) {
            shaka.log.v2("Still waiting for a good estimate...");
            return
        }
        this.startupComplete_ = !0
    } else if (Date.now() - this.lastTimeChosenMs_ < 1E3 * this.config_.switchInterval) {
        shaka.log.v2("Still within switch interval...");
        return
    }
    var a = this.chooseVariant(),
        b = this.bandwidthEstimator_.getBandwidthEstimate(this.config_.defaultBandwidthEstimate);
    shaka.log.debug("Calling switch_(), bandwidth=" + Math.round(b / 1E3) + " kbps");
    this.switch_(a)
};
shaka.abr.SimpleAbrManager.filterAndSortVariants_ = function (a, b) {
    return b.filter(function (b) {
        return shaka.util.StreamUtils.meetsRestrictions(b, a, {width: Infinity, height: Infinity})
    }).sort(function (a, b) {
        return a.bandwidth - b.bandwidth
    })
};
shaka.cast = {};
shaka.cast.CastUtils = {};
shaka.cast.CastUtils.VideoEvents = "ended play playing pause pausing ratechange seeked seeking timeupdate volumechange".split(" ");
shaka.cast.CastUtils.VideoAttributes = "buffered currentTime duration ended loop muted paused playbackRate seeking videoHeight videoWidth volume".split(" ");
shaka.cast.CastUtils.VideoInitStateAttributes = ["loop", "playbackRate"];
shaka.cast.CastUtils.VideoVoidMethods = ["pause", "play"];
shaka.cast.CastUtils.PlayerEvents = "adaptation buffering emsg error loading streaming texttrackvisibility timelineregionadded timelineregionenter timelineregionexit trackschanged unloading".split(" ");
shaka.cast.CastUtils.PlayerGetterMethods = "drmInfo getAudioLanguages getBufferedInfo getConfiguration getExpiration getManifest getManifestUri getPlaybackRate getTextLanguages getTextTracks getStats getVariantTracks isAudioOnly isBuffering isInProgress isLive isTextTrackVisible keySystem seekRange".split(" ");
shaka.cast.CastUtils.PlayerGetterMethodsThatRequireLive = ["getPlayheadTimeAsDate", "getPresentationStartTimeAsDate"];
shaka.cast.CastUtils.PlayerInitState = [["getConfiguration", "configure"]];
shaka.cast.CastUtils.PlayerInitAfterLoadState = [["isTextTrackVisible", "setTextTrackVisibility"]];
shaka.cast.CastUtils.PlayerVoidMethods = "addTextTrack cancelTrickPlay configure resetConfiguration retryStreaming selectAudioLanguage selectTextLanguage selectTextTrack selectVariantTrack setTextTrackVisibility trickPlay".split(" ");
shaka.cast.CastUtils.PlayerPromiseMethods = ["load", "unload"];
shaka.cast.CastUtils.SHAKA_MESSAGE_NAMESPACE = "urn:x-cast:com.google.shaka.v2";
shaka.cast.CastUtils.GENERIC_MESSAGE_NAMESPACE = "urn:x-cast:com.google.cast.media";
shaka.cast.CastUtils.serialize = function (a) {
    return JSON.stringify(a, function (a, c) {
        if ("manager" != a && "function" != typeof c) {
            if (c instanceof Event || c instanceof shaka.util.FakeEvent) {
                var b = {}, e;
                for (e in c) {
                    var f = c[e];
                    f && "object" == typeof f ? "detail" == e && (b[e] = f) : e in Event || (b[e] = f)
                }
                return b
            }
            return c instanceof TimeRanges ? shaka.cast.CastUtils.unpackTimeRanges_(c) : "number" == typeof c ? isNaN(c) ? "NaN" : isFinite(c) ? c : 0 > c ? "-Infinity" : "Infinity" : c
        }
    })
};
shaka.cast.CastUtils.deserialize = function (a) {
    return JSON.parse(a, function (a, c) {
        return "NaN" == c ? NaN : "-Infinity" == c ? -Infinity : "Infinity" == c ? Infinity : c && "object" == typeof c && "TimeRanges" == c.__type__ ? shaka.cast.CastUtils.simulateTimeRanges_(c) : c
    })
};
shaka.cast.CastUtils.unpackTimeRanges_ = function (a) {
    for (var b = {
        __type__: "TimeRanges",
        length: a.length,
        start: [],
        end: []
    }, c = 0; c < a.length; ++c) b.start.push(a.start(c)), b.end.push(a.end(c));
    return b
};
shaka.cast.CastUtils.simulateTimeRanges_ = function (a) {
    return {
        length: a.length, start: function (b) {
            return a.start[b]
        }, end: function (b) {
            return a.end[b]
        }
    }
};
shaka.cast.CastSender = function (a, b, c, d, e, f) {
    this.receiverAppId_ = a;
    this.onStatusChanged_ = b;
    this.onFirstCastStateUpdate_ = c;
    this.hasJoinedExistingSession_ = !1;
    this.onRemoteEvent_ = d;
    this.onResumeLocal_ = e;
    this.onInitStateRequired_ = f;
    this.isCasting_ = this.apiReady_ = !1;
    this.receiverName_ = "";
    this.appData_ = null;
    this.onConnectionStatusChangedBound_ = this.onConnectionStatusChanged_.bind(this);
    this.onMessageReceivedBound_ = this.onMessageReceived_.bind(this);
    this.cachedProperties_ = {video: {}, player: {}};
    this.nextAsyncCallId_ =
        0;
    this.asyncCallPromises_ = {};
    this.castPromise_ = null
};
shaka.cast.CastSender.hasReceivers_ = !1;
shaka.cast.CastSender.session_ = null;
shaka.cast.CastSender.prototype.destroy = function () {
    this.rejectAllPromises_();
    shaka.cast.CastSender.session_ && this.removeListeners_();
    this.onResumeLocal_ = this.onRemoteEvent_ = this.onStatusChanged_ = null;
    this.isCasting_ = this.apiReady_ = !1;
    this.onMessageReceivedBound_ = this.onConnectionStatusChangedBound_ = this.castPromise_ = this.asyncCallPromises_ = this.cachedProperties_ = this.appData_ = null;
    return Promise.resolve()
};
shaka.cast.CastSender.prototype.apiReady = function () {
    return this.apiReady_
};
shaka.cast.CastSender.prototype.hasReceivers = function () {
    return shaka.cast.CastSender.hasReceivers_
};
shaka.cast.CastSender.prototype.isCasting = function () {
    return this.isCasting_
};
shaka.cast.CastSender.prototype.receiverName = function () {
    return this.receiverName_
};
shaka.cast.CastSender.prototype.hasRemoteProperties = function () {
    return 0 != Object.keys(this.cachedProperties_.video).length
};
shaka.cast.CastSender.prototype.init = function () {
    if (window.chrome && chrome.cast && chrome.cast.isAvailable) {
        delete window.__onGCastApiAvailable;
        this.apiReady_ = !0;
        this.onStatusChanged_();
        var a = new chrome.cast.SessionRequest(this.receiverAppId_),
            a = new chrome.cast.ApiConfig(a, this.onExistingSessionJoined_.bind(this), this.onReceiverStatusChanged_.bind(this), "origin_scoped");
        chrome.cast.initialize(a, function () {
            shaka.log.debug("CastSender: init")
        }, function (a) {
            shaka.log.error("CastSender: init error", a)
        });
        shaka.cast.CastSender.hasReceivers_ &&
        setTimeout(this.onStatusChanged_.bind(this), 20);
        (a = shaka.cast.CastSender.session_) && a.status != chrome.cast.SessionStatus.STOPPED ? (shaka.log.debug("CastSender: re-using existing connection"), this.onExistingSessionJoined_(a)) : shaka.cast.CastSender.session_ = null
    } else window.__onGCastApiAvailable = function (a) {
        a && this.init()
    }.bind(this)
};
shaka.cast.CastSender.prototype.setAppData = function (a) {
    this.appData_ = a;
    this.isCasting_ && this.sendMessage_({type: "appData", appData: this.appData_})
};
shaka.cast.CastSender.prototype.cast = function (a) {
    if (!this.apiReady_) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.CAST, shaka.util.Error.Code.CAST_API_UNAVAILABLE));
    if (!shaka.cast.CastSender.hasReceivers_) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.CAST, shaka.util.Error.Code.NO_CAST_RECEIVERS));
    if (this.isCasting_) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE,
        shaka.util.Error.Category.CAST, shaka.util.Error.Code.ALREADY_CASTING));
    this.castPromise_ = new shaka.util.PublicPromise;
    chrome.cast.requestSession(this.onSessionInitiated_.bind(this, a), this.onConnectionError_.bind(this));
    return this.castPromise_
};
shaka.cast.CastSender.prototype.showDisconnectDialog = function () {
    if (this.isCasting_) {
        var a = this.onInitStateRequired_();
        chrome.cast.requestSession(this.onSessionInitiated_.bind(this, a), this.onConnectionError_.bind(this))
    }
};
shaka.cast.CastSender.prototype.forceDisconnect = function () {
    this.isCasting_ && (this.rejectAllPromises_(), shaka.cast.CastSender.session_ && (this.removeListeners_(), shaka.cast.CastSender.session_.stop(function () {
    }, function () {
    }), shaka.cast.CastSender.session_ = null))
};
shaka.cast.CastSender.prototype.get = function (a, b) {
    goog.asserts.assert("video" == a || "player" == a, "Unexpected target name");
    var c = shaka.cast.CastUtils;
    if ("video" == a) {
        if (0 <= c.VideoVoidMethods.indexOf(b)) return this.remoteCall_.bind(this, a, b)
    } else if ("player" == a) {
        if (0 <= c.PlayerGetterMethodsThatRequireLive.indexOf(b)) {
            var d = this.get("player", "isLive")();
            goog.asserts.assert(d, b + " should be called on a live stream!");
            if (!d) return function () {
            }
        }
        if (0 <= c.PlayerVoidMethods.indexOf(b)) return this.remoteCall_.bind(this,
            a, b);
        if (0 <= c.PlayerPromiseMethods.indexOf(b)) return this.remoteAsyncCall_.bind(this, a, b);
        if (0 <= c.PlayerGetterMethods.indexOf(b)) return this.propertyGetter_.bind(this, a, b)
    }
    return this.propertyGetter_(a, b)
};
shaka.cast.CastSender.prototype.set = function (a, b, c) {
    goog.asserts.assert("video" == a || "player" == a, "Unexpected target name");
    this.cachedProperties_[a][b] = c;
    this.sendMessage_({type: "set", targetName: a, property: b, value: c})
};
shaka.cast.CastSender.prototype.onSessionInitiated_ = function (a, b) {
    shaka.log.debug("CastSender: onSessionInitiated");
    this.onSessionCreated_(b);
    this.sendMessage_({type: "init", initState: a, appData: this.appData_});
    this.castPromise_.resolve()
};
shaka.cast.CastSender.prototype.onConnectionError_ = function (a) {
    var b = shaka.util.Error.Code.UNEXPECTED_CAST_ERROR;
    switch (a.code) {
        case "cancel":
            b = shaka.util.Error.Code.CAST_CANCELED_BY_USER;
            break;
        case "timeout":
            b = shaka.util.Error.Code.CAST_CONNECTION_TIMED_OUT;
            break;
        case "receiver_unavailable":
            b = shaka.util.Error.Code.CAST_RECEIVER_APP_UNAVAILABLE
    }
    this.castPromise_.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.CAST, b, a))
};
shaka.cast.CastSender.prototype.propertyGetter_ = function (a, b) {
    goog.asserts.assert("video" == a || "player" == a, "Unexpected target name");
    return this.cachedProperties_[a][b]
};
shaka.cast.CastSender.prototype.remoteCall_ = function (a, b) {
    goog.asserts.assert("video" == a || "player" == a, "Unexpected target name");
    var c = Array.prototype.slice.call(arguments, 2);
    this.sendMessage_({type: "call", targetName: a, methodName: b, args: c})
};
shaka.cast.CastSender.prototype.remoteAsyncCall_ = function (a, b) {
    goog.asserts.assert("video" == a || "player" == a, "Unexpected target name");
    var c = Array.prototype.slice.call(arguments, 2), d = new shaka.util.PublicPromise,
        e = this.nextAsyncCallId_.toString();
    this.nextAsyncCallId_++;
    this.asyncCallPromises_[e] = d;
    this.sendMessage_({type: "asyncCall", targetName: a, methodName: b, args: c, id: e});
    return d
};
shaka.cast.CastSender.prototype.onExistingSessionJoined_ = function (a) {
    shaka.log.debug("CastSender: onExistingSessionJoined");
    var b = this.onInitStateRequired_();
    this.castPromise_ = new shaka.util.PublicPromise;
    this.hasJoinedExistingSession_ = !0;
    this.onSessionInitiated_(b, a)
};
shaka.cast.CastSender.prototype.onReceiverStatusChanged_ = function (a) {
    shaka.log.debug("CastSender: receiver status", a);
    shaka.cast.CastSender.hasReceivers_ = "available" == a;
    this.onStatusChanged_()
};
shaka.cast.CastSender.prototype.onSessionCreated_ = function (a) {
    shaka.cast.CastSender.session_ = a;
    a.addUpdateListener(this.onConnectionStatusChangedBound_);
    a.addMessageListener(shaka.cast.CastUtils.SHAKA_MESSAGE_NAMESPACE, this.onMessageReceivedBound_);
    this.onConnectionStatusChanged_()
};
shaka.cast.CastSender.prototype.removeListeners_ = function () {
    var a = shaka.cast.CastSender.session_;
    a.removeUpdateListener(this.onConnectionStatusChangedBound_);
    a.removeMessageListener(shaka.cast.CastUtils.SHAKA_MESSAGE_NAMESPACE, this.onMessageReceivedBound_)
};
shaka.cast.CastSender.prototype.onConnectionStatusChanged_ = function () {
    var a = shaka.cast.CastSender.session_ ? "connected" == shaka.cast.CastSender.session_.status : !1;
    shaka.log.debug("CastSender: connection status", a);
    if (this.isCasting_ && !a) {
        this.onResumeLocal_();
        for (var b in this.cachedProperties_) this.cachedProperties_[b] = {};
        this.rejectAllPromises_()
    }
    this.receiverName_ = (this.isCasting_ = a) ? shaka.cast.CastSender.session_.receiver.friendlyName : "";
    this.onStatusChanged_()
};
shaka.cast.CastSender.prototype.rejectAllPromises_ = function () {
    for (var a in this.asyncCallPromises_) {
        var b = this.asyncCallPromises_[a];
        delete this.asyncCallPromises_[a];
        b.reject(new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.PLAYER, shaka.util.Error.Code.LOAD_INTERRUPTED))
    }
};
shaka.cast.CastSender.prototype.onMessageReceived_ = function (a, b) {
    var c = shaka.cast.CastUtils.deserialize(b);
    shaka.log.v2("CastSender: message", c);
    switch (c.type) {
        case "event":
            var d = c.targetName, e = c.event, e = new shaka.util.FakeEvent(e.type, e);
            this.onRemoteEvent_(d, e);
            break;
        case "update":
            e = c.update;
            for (d in e) {
                var c = this.cachedProperties_[d] || {};
                for (f in e[d]) c[f] = e[d][f]
            }
            this.hasJoinedExistingSession_ && (this.onFirstCastStateUpdate_(), this.hasJoinedExistingSession_ = !1);
            break;
        case "asyncComplete":
            d = c.id;
            var f = c.error;
            c = this.asyncCallPromises_[d];
            delete this.asyncCallPromises_[d];
            goog.asserts.assert(c, "Unexpected async id");
            if (c) if (f) {
                d = new shaka.util.Error(f.severity, f.category, f.code);
                for (e in f) d[e] = f[e];
                c.reject(d)
            } else c.resolve()
    }
};
shaka.cast.CastSender.prototype.sendMessage_ = function (a) {
    a = shaka.cast.CastUtils.serialize(a);
    shaka.cast.CastSender.session_.sendMessage(shaka.cast.CastUtils.SHAKA_MESSAGE_NAMESPACE, a, function () {
    }, shaka.log.error)
};
shaka.util.FakeEventTarget = function () {
    this.listeners_ = new shaka.util.MultiMap;
    this.dispatchTarget = this
};
shaka.util.FakeEventTarget.prototype.addEventListener = function (a, b, c) {
    this.listeners_.push(a, b)
};
shaka.util.FakeEventTarget.prototype.removeEventListener = function (a, b, c) {
    this.listeners_.remove(a, b)
};
shaka.util.FakeEventTarget.prototype.dispatchEvent = function (a) {
    goog.asserts.assert(a instanceof shaka.util.FakeEvent, "FakeEventTarget can only dispatch FakeEvents!");
    for (var b = this.listeners_.get(a.type) || [], c = 0; c < b.length; ++c) {
        a.target = this.dispatchTarget;
        a.currentTarget = this.dispatchTarget;
        var d = b[c];
        try {
            d.handleEvent ? d.handleEvent(a) : d.call(this, a)
        } catch (e) {
            shaka.log.error("Uncaught exception in event handler", e)
        }
        if (a.stopped) break
    }
    return a.defaultPrevented
};
shaka.cast.CastProxy = function (a, b, c) {
    shaka.util.FakeEventTarget.call(this);
    this.localVideo_ = a;
    this.localPlayer_ = b;
    this.eventManager_ = this.playerEventTarget_ = this.videoEventTarget_ = this.playerProxy_ = this.videoProxy_ = null;
    this.sender_ = new shaka.cast.CastSender(c, this.onCastStatusChanged_.bind(this), this.onFirstCastStateUpdate_.bind(this), this.onRemoteEvent_.bind(this), this.onResumeLocal_.bind(this), this.getInitState_.bind(this));
    this.init_()
};
goog.inherits(shaka.cast.CastProxy, shaka.util.FakeEventTarget);
goog.exportSymbol("shaka.cast.CastProxy", shaka.cast.CastProxy);
shaka.cast.CastProxy.prototype.destroy = function (a) {
    a && this.sender_ && this.sender_.forceDisconnect();
    a = [this.eventManager_ ? this.eventManager_.destroy() : null, this.localPlayer_ ? this.localPlayer_.destroy() : null, this.sender_ ? this.sender_.destroy() : null];
    this.sender_ = this.eventManager_ = this.playerProxy_ = this.videoProxy_ = this.localPlayer_ = this.localVideo_ = null;
    return Promise.all(a)
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "destroy", shaka.cast.CastProxy.prototype.destroy);
shaka.cast.CastProxy.prototype.getVideo = function () {
    return this.videoProxy_
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "getVideo", shaka.cast.CastProxy.prototype.getVideo);
shaka.cast.CastProxy.prototype.getPlayer = function () {
    return this.playerProxy_
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "getPlayer", shaka.cast.CastProxy.prototype.getPlayer);
shaka.cast.CastProxy.prototype.canCast = function () {
    return this.sender_ ? this.sender_.apiReady() && this.sender_.hasReceivers() : !1
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "canCast", shaka.cast.CastProxy.prototype.canCast);
shaka.cast.CastProxy.prototype.isCasting = function () {
    return this.sender_ ? this.sender_.isCasting() : !1
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "isCasting", shaka.cast.CastProxy.prototype.isCasting);
shaka.cast.CastProxy.prototype.receiverName = function () {
    return this.sender_ ? this.sender_.receiverName() : ""
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "receiverName", shaka.cast.CastProxy.prototype.receiverName);
shaka.cast.CastProxy.prototype.cast = function () {
    var a = this.getInitState_();
    return this.sender_.cast(a).then(function () {
        return this.localPlayer_.unload()
    }.bind(this))
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "cast", shaka.cast.CastProxy.prototype.cast);
shaka.cast.CastProxy.prototype.setAppData = function (a) {
    this.sender_.setAppData(a)
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "setAppData", shaka.cast.CastProxy.prototype.setAppData);
shaka.cast.CastProxy.prototype.suggestDisconnect = function () {
    this.sender_.showDisconnectDialog()
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "suggestDisconnect", shaka.cast.CastProxy.prototype.suggestDisconnect);
shaka.cast.CastProxy.prototype.forceDisconnect = function () {
    this.sender_.forceDisconnect()
};
goog.exportProperty(shaka.cast.CastProxy.prototype, "forceDisconnect", shaka.cast.CastProxy.prototype.forceDisconnect);
shaka.cast.CastProxy.prototype.init_ = function () {
    this.sender_.init();
    this.eventManager_ = new shaka.util.EventManager;
    shaka.cast.CastUtils.VideoEvents.forEach(function (a) {
        this.eventManager_.listen(this.localVideo_, a, this.videoProxyLocalEvent_.bind(this))
    }.bind(this));
    shaka.cast.CastUtils.PlayerEvents.forEach(function (a) {
        this.eventManager_.listen(this.localPlayer_, a, this.playerProxyLocalEvent_.bind(this))
    }.bind(this));
    this.videoProxy_ = {};
    for (var a in this.localVideo_) Object.defineProperty(this.videoProxy_,
        a, {
            configurable: !1,
            enumerable: !0,
            get: this.videoProxyGet_.bind(this, a),
            set: this.videoProxySet_.bind(this, a)
        });
    this.playerProxy_ = {};
    for (a in this.localPlayer_) Object.defineProperty(this.playerProxy_, a, {
        configurable: !1,
        enumerable: !0,
        get: this.playerProxyGet_.bind(this, a)
    });
    this.videoEventTarget_ = new shaka.util.FakeEventTarget;
    this.videoEventTarget_.dispatchTarget = this.videoProxy_;
    this.playerEventTarget_ = new shaka.util.FakeEventTarget;
    this.playerEventTarget_.dispatchTarget = this.playerProxy_
};
shaka.cast.CastProxy.prototype.getInitState_ = function () {
    var a = {video: {}, player: {}, playerAfterLoad: {}, manifest: this.localPlayer_.getManifestUri(), startTime: null};
    this.localVideo_.pause();
    shaka.cast.CastUtils.VideoInitStateAttributes.forEach(function (b) {
        a.video[b] = this.localVideo_[b]
    }.bind(this));
    this.localVideo_.ended || (a.startTime = this.localVideo_.currentTime);
    shaka.cast.CastUtils.PlayerInitState.forEach(function (b) {
        var c = b[1];
        b = this.localPlayer_[b[0]]();
        a.player[c] = b
    }.bind(this));
    shaka.cast.CastUtils.PlayerInitAfterLoadState.forEach(function (b) {
        var c =
            b[1];
        b = this.localPlayer_[b[0]]();
        a.playerAfterLoad[c] = b
    }.bind(this));
    return a
};
shaka.cast.CastProxy.prototype.onCastStatusChanged_ = function () {
    var a = new shaka.util.FakeEvent("caststatuschanged");
    this.dispatchEvent(a)
};
shaka.cast.CastProxy.prototype.onFirstCastStateUpdate_ = function () {
    var a = new shaka.util.FakeEvent(this.videoProxy_.paused ? "pause" : "play");
    this.videoEventTarget_.dispatchEvent(a)
};
shaka.cast.CastProxy.prototype.onResumeLocal_ = function () {
    shaka.cast.CastUtils.PlayerInitState.forEach(function (a) {
        var b = a[1];
        a = this.sender_.get("player", a[0])();
        this.localPlayer_[b](a)
    }.bind(this));
    var a = this.sender_.get("player", "getManifestUri")(), b = this.sender_.get("video", "ended"),
        c = Promise.resolve(), d = this.localVideo_.autoplay, e = null;
    b || (e = this.sender_.get("video", "currentTime"));
    a && (this.localVideo_.autoplay = !1, c = this.localPlayer_.load(a, e), c["catch"](function (a) {
        goog.asserts.assert(a instanceof
            shaka.util.Error, "Wrong error type!");
        a = new shaka.util.FakeEvent("error", {detail: a});
        this.localPlayer_.dispatchEvent(a)
    }.bind(this)));
    var f = {};
    shaka.cast.CastUtils.VideoInitStateAttributes.forEach(function (a) {
        f[a] = this.sender_.get("video", a)
    }.bind(this));
    c.then(function () {
        shaka.cast.CastUtils.VideoInitStateAttributes.forEach(function (a) {
            this.localVideo_[a] = f[a]
        }.bind(this));
        shaka.cast.CastUtils.PlayerInitAfterLoadState.forEach(function (a) {
            var b = a[1];
            a = this.sender_.get("player", a[0])();
            this.localPlayer_[b](a)
        }.bind(this));
        this.localVideo_.autoplay = d;
        a && this.localVideo_.play()
    }.bind(this))
};
shaka.cast.CastProxy.prototype.videoProxyGet_ = function (a) {
    if ("addEventListener" == a) return this.videoEventTarget_.addEventListener.bind(this.videoEventTarget_);
    if ("removeEventListener" == a) return this.videoEventTarget_.removeEventListener.bind(this.videoEventTarget_);
    if (this.sender_.isCasting() && !this.sender_.hasRemoteProperties()) {
        var b = this.localVideo_[a];
        if ("function" != typeof b) return b
    }
    return this.sender_.isCasting() ? this.sender_.get("video", a) : (b = this.localVideo_[a], "function" == typeof b && (b = b.bind(this.localVideo_)),
        b)
};
shaka.cast.CastProxy.prototype.videoProxySet_ = function (a, b) {
    this.sender_.isCasting() ? this.sender_.set("video", a, b) : this.localVideo_[a] = b
};
shaka.cast.CastProxy.prototype.videoProxyLocalEvent_ = function (a) {
    this.sender_.isCasting() || (a = new shaka.util.FakeEvent(a.type, a), this.videoEventTarget_.dispatchEvent(a))
};
shaka.cast.CastProxy.prototype.playerProxyGet_ = function (a) {
    return "addEventListener" == a ? this.playerEventTarget_.addEventListener.bind(this.playerEventTarget_) : "removeEventListener" == a ? this.playerEventTarget_.removeEventListener.bind(this.playerEventTarget_) : "getMediaElement" == a ? function () {
        return this.videoProxy_
    }.bind(this) : "getNetworkingEngine" == a ? (this.sender_.isCasting() && shaka.log.warning("NOTE: getNetworkingEngine() is always local!"), this.localPlayer_.getNetworkingEngine.bind(this.localPlayer_)) :
        this.sender_.isCasting() && !this.sender_.hasRemoteProperties() && 0 <= shaka.cast.CastUtils.PlayerGetterMethods.indexOf(a) || !this.sender_.isCasting() ? (a = this.localPlayer_[a], goog.asserts.assert("function" == typeof a, "only methods on Player"), a.bind(this.localPlayer_)) : this.sender_.get("player", a)
};
shaka.cast.CastProxy.prototype.playerProxyLocalEvent_ = function (a) {
    this.sender_.isCasting() || this.playerEventTarget_.dispatchEvent(a)
};
shaka.cast.CastProxy.prototype.onRemoteEvent_ = function (a, b) {
    goog.asserts.assert(this.sender_.isCasting(), "Should only receive remote events while casting");
    this.sender_.isCasting() && ("video" == a ? this.videoEventTarget_.dispatchEvent(b) : "player" == a && this.playerEventTarget_.dispatchEvent(b))
};
shaka.cast.CastReceiver = function (a, b, c, d) {
    shaka.util.FakeEventTarget.call(this);
    this.video_ = a;
    this.player_ = b;
    this.targets_ = {video: a, player: b};
    this.appDataCallback_ = c || function () {
    };
    this.opt_contentIdCallback_ = d || function (a) {
        return a
    };
    this.isConnected_ = !1;
    this.isIdle_ = !0;
    this.pollTimerId_ = this.genericBus_ = this.shakaBus_ = null;
    this.init_()
};
goog.inherits(shaka.cast.CastReceiver, shaka.util.FakeEventTarget);
goog.exportSymbol("shaka.cast.CastReceiver", shaka.cast.CastReceiver);
shaka.cast.CastReceiver.prototype.isConnected = function () {
    return this.isConnected_
};
goog.exportProperty(shaka.cast.CastReceiver.prototype, "isConnected", shaka.cast.CastReceiver.prototype.isConnected);
shaka.cast.CastReceiver.prototype.isIdle = function () {
    return this.isIdle_
};
goog.exportProperty(shaka.cast.CastReceiver.prototype, "isIdle", shaka.cast.CastReceiver.prototype.isIdle);
shaka.cast.CastReceiver.prototype.destroy = function () {
    var a = this.player_ ? this.player_.destroy() : Promise.resolve();
    null != this.pollTimerId_ && window.clearTimeout(this.pollTimerId_);
    this.appDataCallback_ = this.targets_ = this.player_ = this.video_ = null;
    this.isConnected_ = !1;
    this.isIdle_ = !0;
    this.pollTimerId_ = this.genericBus_ = this.shakaBus_ = null;
    return a.then(function () {
        cast.receiver.CastReceiverManager.getInstance().stop()
    })
};
goog.exportProperty(shaka.cast.CastReceiver.prototype, "destroy", shaka.cast.CastReceiver.prototype.destroy);
shaka.cast.CastReceiver.prototype.init_ = function () {
    var a = cast.receiver.CastReceiverManager.getInstance();
    a.onSenderConnected = this.onSendersChanged_.bind(this);
    a.onSenderDisconnected = this.onSendersChanged_.bind(this);
    a.onSystemVolumeChanged = this.fakeVolumeChangeEvent_.bind(this);
    this.genericBus_ = a.getCastMessageBus(shaka.cast.CastUtils.GENERIC_MESSAGE_NAMESPACE);
    this.genericBus_.onMessage = this.onGenericMessage_.bind(this);
    this.shakaBus_ = a.getCastMessageBus(shaka.cast.CastUtils.SHAKA_MESSAGE_NAMESPACE);
    this.shakaBus_.onMessage = this.onShakaMessage_.bind(this);
    goog.DEBUG ? 0 <= navigator.userAgent.indexOf("CrKey") && a.start() : a.start();
    shaka.cast.CastUtils.VideoEvents.forEach(function (a) {
        this.video_.addEventListener(a, this.proxyEvent_.bind(this, "video"))
    }.bind(this));
    shaka.cast.CastUtils.PlayerEvents.forEach(function (a) {
        this.player_.addEventListener(a, this.proxyEvent_.bind(this, "player"))
    }.bind(this));
    cast.__platform__ && cast.__platform__.canDisplayType('video/mp4; codecs="avc1.640028"; width=3840; height=2160') ?
        this.player_.setMaxHardwareResolution(3840, 2160) : this.player_.setMaxHardwareResolution(1920, 1080);
    this.player_.addEventListener("loading", function () {
        this.isIdle_ = !1;
        this.onCastStatusChanged_()
    }.bind(this));
    this.video_.addEventListener("playing", function () {
        this.isIdle_ = !1;
        this.onCastStatusChanged_()
    }.bind(this));
    this.video_.addEventListener("pause", function () {
        this.onCastStatusChanged_()
    }.bind(this));
    this.player_.addEventListener("unloading", function () {
        this.isIdle_ = !0;
        this.onCastStatusChanged_()
    }.bind(this));
    this.video_.addEventListener("ended", function () {
        window.setTimeout(function () {
            this.video_ && this.video_.ended && (this.isIdle_ = !0, this.onCastStatusChanged_())
        }.bind(this), 5E3)
    }.bind(this))
};
shaka.cast.CastReceiver.prototype.onSendersChanged_ = function () {
    this.isConnected_ = 0 != cast.receiver.CastReceiverManager.getInstance().getSenders().length;
    this.onCastStatusChanged_()
};
shaka.cast.CastReceiver.prototype.onCastStatusChanged_ = function () {
    Promise.resolve().then(function () {
        var a = new shaka.util.FakeEvent("caststatuschanged");
        this.dispatchEvent(a);
        this.sendMediaStatus_(0)
    }.bind(this))
};
shaka.cast.CastReceiver.prototype.initState_ = function (a, b) {
    for (var c in a.player) this.player_[c](a.player[c]);
    this.appDataCallback_(b);
    c = Promise.resolve();
    var d = this.video_.autoplay;
    a.manifest && (this.video_.autoplay = !1, c = this.player_.load(a.manifest, a.startTime), c["catch"](function (a) {
        goog.asserts.assert(a instanceof shaka.util.Error, "Wrong error type!");
        a = new shaka.util.FakeEvent("error", {detail: a});
        this.player_.dispatchEvent(a)
    }.bind(this)));
    c.then(function () {
        var b;
        for (b in a.video) {
            var c = a.video[b];
            this.video_[b] = c
        }
        for (b in a.playerAfterLoad) c = a.playerAfterLoad[b], this.player_[b](c);
        this.video_.autoplay = d;
        a.manifest && (this.video_.play(), this.sendMediaStatus_(0))
    }.bind(this))
};
shaka.cast.CastReceiver.prototype.proxyEvent_ = function (a, b) {
    this.player_ && (this.pollAttributes_(), this.sendMessage_({
        type: "event",
        targetName: a,
        event: b
    }, this.shakaBus_))
};
shaka.cast.CastReceiver.prototype.pollAttributes_ = function () {
    null != this.pollTimerId_ && window.clearTimeout(this.pollTimerId_);
    this.pollTimerId_ = window.setTimeout(this.pollAttributes_.bind(this), 500);
    var a = {video: {}, player: {}};
    shaka.cast.CastUtils.VideoAttributes.forEach(function (b) {
        a.video[b] = this.video_[b]
    }.bind(this));
    var b = shaka.cast.CastUtils.PlayerGetterMethods;
    this.player_.isLive() && (b = b.concat(shaka.cast.CastUtils.PlayerGetterMethodsThatRequireLive));
    b.forEach(function (b) {
        a.player[b] = this.player_[b]()
    }.bind(this));
    if (b = cast.receiver.CastReceiverManager.getInstance().getSystemVolume()) a.video.volume = b.level, a.video.muted = b.muted;
    this.sendMessage_({type: "update", update: a}, this.shakaBus_)
};
shaka.cast.CastReceiver.prototype.fakeVolumeChangeEvent_ = function () {
    var a = cast.receiver.CastReceiverManager.getInstance().getSystemVolume();
    goog.asserts.assert(a, "System volume should not be null!");
    a && this.sendMessage_({type: "update", update: {video: {volume: a.level, muted: a.muted}}}, this.shakaBus_);
    this.sendMessage_({type: "event", targetName: "video", event: {type: "volumechange"}}, this.shakaBus_)
};
shaka.cast.CastReceiver.prototype.onShakaMessage_ = function (a) {
    var b = shaka.cast.CastUtils.deserialize(a.data);
    shaka.log.debug("CastReceiver: message", b);
    switch (b.type) {
        case "init":
            this.initState_(b.initState, b.appData);
            this.pollAttributes_();
            break;
        case "appData":
            this.appDataCallback_(b.appData);
            break;
        case "set":
            var c = b.targetName, d = b.property, e = b.value;
            if ("video" == c) if (b = cast.receiver.CastReceiverManager.getInstance(), "volume" == d) {
                b.setSystemVolumeLevel(e);
                break
            } else if ("muted" == d) {
                b.setSystemVolumeMuted(e);
                break
            }
            this.targets_[c][d] = e;
            break;
        case "call":
            c = b.targetName;
            d = b.methodName;
            e = b.args;
            c = this.targets_[c];
            c[d].apply(c, e);
            break;
        case "asyncCall":
            c = b.targetName, d = b.methodName, e = b.args, b = b.id, a = a.senderId, c = this.targets_[c], c[d].apply(c, e).then(this.sendAsyncComplete_.bind(this, a, b, null), this.sendAsyncComplete_.bind(this, a, b))
    }
};
shaka.cast.CastReceiver.prototype.onGenericMessage_ = function (a) {
    var b = shaka.cast.CastUtils.deserialize(a.data);
    shaka.log.debug("CastReceiver: message", b);
    switch (b.type) {
        case "PLAY":
            this.video_.play();
            this.sendMediaStatus_(0);
            break;
        case "PAUSE":
            this.video_.pause();
            this.sendMediaStatus_(0);
            break;
        case "SEEK":
            a = b.currentTime;
            var c = b.resumeState;
            null != a && (this.video_.currentTime = Number(a));
            c && "PLAYBACK_START" == c ? (this.video_.play(), this.sendMediaStatus_(0)) : c && "PLAYBACK_PAUSE" == c && (this.video_.pause(),
                this.sendMediaStatus_(0));
            break;
        case "STOP":
            this.player_.unload().then(function () {
                this.sendMediaStatus_(0)
            }.bind(this));
            break;
        case "GET_STATUS":
            this.sendMediaStatus_(Number(b.requestId));
            break;
        case "VOLUME":
            c = b.volume;
            a = c.level;
            var c = c.muted, d = this.video_.volume, e = this.video_.muted;
            null != a && (this.video_.volume = Number(a));
            null != c && (this.video_.muted = c);
            d == this.video_.volume && e == this.video_.muted || this.sendMediaStatus_(0);
            break;
        case "LOAD":
            c = b.media.contentId;
            a = b.currentTime;
            var f = this.opt_contentIdCallback_(c);
            this.video_.autoplay = !0;
            this.player_.load(f, a).then(function () {
                var a = {contentId: f, streamType: this.player_.isLive() ? "LIVE" : "BUFFERED", contentType: ""};
                this.sendMediaStatus_(0, a)
            }.bind(this))["catch"](function (a) {
                var c = "LOAD_FAILED";
                a.category == shaka.util.Error.Category.PLAYER && a.code == shaka.util.Error.Code.LOAD_INTERRUPTED && (c = "LOAD_CANCELLED");
                this.sendMessage_({requestId: Number(b.requestId), type: c}, this.genericBus_)
            }.bind(this));
            break;
        default:
            shaka.log.warning("Unrecognized message type from the generic Chromecast controller!",
                b.type), this.sendMessage_({
                requestId: Number(b.requestId),
                type: "INVALID_REQUEST",
                reason: "INVALID_COMMAND"
            }, this.genericBus_)
    }
};
shaka.cast.CastReceiver.prototype.sendAsyncComplete_ = function (a, b, c) {
    this.sendMessage_({type: "asyncComplete", id: b, error: c}, this.shakaBus_, a)
};
shaka.cast.CastReceiver.prototype.sendMessage_ = function (a, b, c) {
    this.isConnected_ && (a = shaka.cast.CastUtils.serialize(a), c ? b.getCastChannel(c).send(a) : b.broadcast(a))
};
shaka.cast.CastReceiver.prototype.getPlayState_ = function () {
    var a = shaka.cast.CastReceiver.PLAY_STATE;
    return this.isIdle_ ? a.IDLE : this.player_.isBuffering() ? a.BUFFERING : this.video_.paused ? a.PAUSED : a.PLAYING
};
shaka.cast.CastReceiver.prototype.sendMediaStatus_ = function (a, b) {
    var c = {
        mediaSessionId: 0,
        playbackRate: this.video_.playbackRate,
        playerState: this.getPlayState_(),
        currentTime: this.video_.currentTime,
        supportedMediaCommands: 15,
        volume: {level: this.video_.volume, muted: this.video_.muted}
    };
    b && (c.media = b);
    this.sendMessage_({requestId: a, type: "MEDIA_STATUS", status: [c]}, this.genericBus_)
};
shaka.cast.CastReceiver.PLAY_STATE = {IDLE: "IDLE", PLAYING: "PLAYING", BUFFERING: "BUFFERING", PAUSED: "PAUSED"};
shaka.util.XmlUtils = {};
shaka.util.XmlUtils.findChild = function (a, b) {
    var c = shaka.util.XmlUtils.findChildren(a, b);
    return 1 != c.length ? null : c[0]
};
shaka.util.XmlUtils.findChildren = function (a, b) {
    return Array.prototype.filter.call(a.childNodes, function (a) {
        goog.asserts.assert(a.tagName != b || a instanceof Element, "child element should be an Element");
        return a.tagName == b
    })
};
shaka.util.XmlUtils.getContents = function (a) {
    var b = a.firstChild;
    return b && b.nodeType == Node.TEXT_NODE ? a.textContent.trim() : null
};
shaka.util.XmlUtils.parseAttr = function (a, b, c, d) {
    var e = null;
    a = a.getAttribute(b);
    null != a && (e = c(a));
    return null == e ? void 0 != d ? d : null : e
};
shaka.util.XmlUtils.parseDate = function (a) {
    if (!a) return null;
    /^\d+\-\d+\-\d+T\d+:\d+:\d+(\.\d+)?$/.test(a) && (a += "Z");
    a = Date.parse(a);
    return isNaN(a) ? null : Math.floor(a / 1E3)
};
shaka.util.XmlUtils.parseDuration = function (a) {
    if (!a) return null;
    var b = /^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$/.exec(a);
    if (!b) return shaka.log.warning("Invalid duration string:", a), null;
    a = 31536E3 * Number(b[1] || null) + 2592E3 * Number(b[2] || null) + 86400 * Number(b[3] || null) + 3600 * Number(b[4] || null) + 60 * Number(b[5] || null) + Number(b[6] || null);
    return isFinite(a) ? a : null
};
shaka.util.XmlUtils.parseRange = function (a) {
    var b = /([0-9]+)-([0-9]+)/.exec(a);
    if (!b) return null;
    a = Number(b[1]);
    if (!isFinite(a)) return null;
    b = Number(b[2]);
    return isFinite(b) ? {start: a, end: b} : null
};
shaka.util.XmlUtils.parseInt = function (a) {
    a = Number(a);
    return 0 === a % 1 ? a : null
};
shaka.util.XmlUtils.parsePositiveInt = function (a) {
    a = Number(a);
    return 0 === a % 1 && 0 < a ? a : null
};
shaka.util.XmlUtils.parseNonNegativeInt = function (a) {
    a = Number(a);
    return 0 === a % 1 && 0 <= a ? a : null
};
shaka.util.XmlUtils.parseFloat = function (a) {
    a = Number(a);
    return isNaN(a) ? null : a
};
shaka.util.XmlUtils.evalDivision = function (a) {
    var b;
    a = (b = a.match(/^(\d+)\/(\d+)$/)) ? Number(b[1] / b[2]) : Number(a);
    return isNaN(a) ? null : a
};
shaka.dash = {};
shaka.dash.ContentProtection = {};
shaka.dash.ContentProtection.defaultKeySystems_ = {
    "urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b": "org.w3.clearkey",
    "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed": "com.widevine.alpha",
    "urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95": "com.microsoft.playready",
    "urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb": "com.adobe.primetime"
};
shaka.dash.ContentProtection.MP4Protection_ = "urn:mpeg:dash:mp4protection:2011";
shaka.dash.ContentProtection.parseFromAdaptationSet = function (a, b, c) {
    var d = shaka.dash.ContentProtection, e = shaka.util.Functional, f = shaka.util.MapUtils,
        g = shaka.util.ManifestParserUtils;
    a = d.parseElements_(a);
    var h = null, k = [], l = [], m = a.map(function (a) {
        return a.keyId
    }).filter(e.isNotNull);
    if (m.length && 1 < m.filter(e.isNotDuplicate).length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_CONFLICTING_KEY_IDS);
    c || (l = a.filter(function (a) {
        return a.schemeUri ==
        d.MP4Protection_ ? (goog.asserts.assert(!a.init || a.init.length, "Init data must be null or non-empty."), h = a.init || h, !1) : !0
    }), l.length && (k = d.convertElements_(h, b, l), 0 == k.length && (k = [g.createDrmInfo("", h)])));
    !a.length || !c && l.length || (k = f.values(d.defaultKeySystems_).map(function (a) {
        return g.createDrmInfo(a, h)
    }));
    var n = m[0] || null;
    n && k.forEach(function (a) {
        a.initData.forEach(function (a) {
            a.keyId = n
        })
    });
    return {defaultKeyId: n, defaultInit: h, drmInfos: k, firstRepresentation: !0}
};
shaka.dash.ContentProtection.parseFromRepresentation = function (a, b, c, d) {
    var e = shaka.dash.ContentProtection.parseFromAdaptationSet(a, b, d);
    if (c.firstRepresentation) {
        a = 1 == c.drmInfos.length && !c.drmInfos[0].keySystem;
        b = 0 == e.drmInfos.length;
        if (0 == c.drmInfos.length || a && !b) c.drmInfos = e.drmInfos;
        c.firstRepresentation = !1
    } else if (0 < e.drmInfos.length && (c.drmInfos = c.drmInfos.filter(function (a) {
            return e.drmInfos.some(function (b) {
                return b.keySystem == a.keySystem
            })
        }), 0 == c.drmInfos.length)) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
        shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_COMMON_KEY_SYSTEM);
    return e.defaultKeyId || c.defaultKeyId
};
shaka.dash.ContentProtection.convertElements_ = function (a, b, c) {
    var d = shaka.util.Functional;
    return c.map(function (c) {
        var d = shaka.util.ManifestParserUtils, e = shaka.dash.ContentProtection.defaultKeySystems_[c.schemeUri];
        if (e) return goog.asserts.assert(!c.init || c.init.length, "Init data must be null or non-empty."), [d.createDrmInfo(e, c.init || a)];
        goog.asserts.assert(b, "ContentProtection callback is required");
        return b(c.node) || []
    }).reduce(d.collapseArrays, [])
};
shaka.dash.ContentProtection.parseElements_ = function (a) {
    var b = shaka.util.Functional;
    return a.map(function (a) {
        var b = a.getAttribute("schemeIdUri"), c = a.getAttribute("cenc:default_KID"),
            f = shaka.util.XmlUtils.findChildren(a, "cenc:pssh").map(shaka.util.XmlUtils.getContents);
        if (!b) return shaka.log.error("Missing required schemeIdUri attribute on", "ContentProtection element", a), null;
        b = b.toLowerCase();
        if (c && (c = c.replace(/-/g, "").toLowerCase(), 0 <= c.indexOf(" "))) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
            shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED);
        var g = [];
        try {
            g = f.map(function (a) {
                return {initDataType: "cenc", initData: shaka.util.Uint8ArrayUtils.fromBase64(a), keyId: null}
            })
        } catch (h) {
            throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_PSSH_BAD_ENCODING);
        }
        return {node: a, schemeUri: b, keyId: c, init: 0 < g.length ? g : null}
    }).filter(b.isNotNull)
};
shaka.dash.MpdUtils = {};
shaka.dash.MpdUtils.fillUriTemplate = function (a, b, c, d, e) {
    null != e && (goog.asserts.assert(.2 > Math.abs(e - Math.round(e)), "Calculated $Time$ values must be close to integers!"), e = Math.round(e));
    var f = {RepresentationID: b, Number: c, Bandwidth: d, Time: e};
    return a.replace(/\$(RepresentationID|Number|Bandwidth|Time)?(?:%0([0-9]+)d)?\$/g, function (b, c, d) {
        if ("$$" == b) return "$";
        var e = f[c];
        goog.asserts.assert(void 0 !== e, "Unrecognized identifier");
        if (null == e) return shaka.log.warning("URL template does not have an available substitution for identifier", '"' +
            c + '":', a), b;
        "RepresentationID" == c && d && (shaka.log.warning("URL template should not contain a width specifier for identifier", '"RepresentationID":', a), d = void 0);
        b = e.toString();
        d = window.parseInt(d, 10) || 1;
        return Array(Math.max(0, d - b.length) + 1).join("0") + b
    })
};
shaka.dash.MpdUtils.createTimeline = function (a, b, c, d) {
    goog.asserts.assert(0 < b && Infinity > b, "timescale must be a positive, finite integer");
    goog.asserts.assert(0 < d, "period duration must be a positive integer");
    var e = shaka.util.XmlUtils;
    a = e.findChildren(a, "S");
    for (var f = [], g = 0, h = 0; h < a.length; ++h) {
        var k = a[h], l = e.parseAttr(k, "t", e.parseNonNegativeInt), m = e.parseAttr(k, "d", e.parseNonNegativeInt),
            n = e.parseAttr(k, "r", e.parseInt);
        null != l && (l -= c);
        if (!m) {
            shaka.log.warning('"S" element must have a duration:', 'ignoring the remaining "S" elements.',
                k);
            break
        }
        l = null != l ? l : g;
        n = n || 0;
        if (0 > n) if (h + 1 < a.length) {
            n = e.parseAttr(a[h + 1], "t", e.parseNonNegativeInt);
            if (null == n) {
                shaka.log.warning('"S" element cannot have a negative repeat', 'if the next "S" element does not have a valid start time:', 'ignoring the remaining "S" elements.', k);
                break
            } else if (l >= n) {
                shaka.log.warning('"S" element cannot have a negative repeat', 'if its start time exceeds the next "S" element\'s start time:', 'ignoring the remaining "S" elements.', k);
                break
            }
            n = Math.ceil((n - l) / m) - 1
        } else {
            if (Infinity ==
                d) {
                shaka.log.warning('The last "S" element cannot have a negative repeat', "if the Period has an infinite duration:", 'ignoring the last "S" element.', k);
                break
            } else if (l / b >= d) {
                shaka.log.warning('The last "S" element cannot have a negative repeat', "if its start time exceeds the Period's duration:", 'igoring the last "S" element.', k);
                break
            }
            n = Math.ceil((d * b - l) / m) - 1
        }
        0 < f.length && l != g && (Math.abs((l - g) / b) >= shaka.util.ManifestParserUtils.GAP_OVERLAP_TOLERANCE_SECONDS && shaka.log.warning("SegmentTimeline contains a large gap/overlap:",
            "the content may have errors in it.", k), f[f.length - 1].end = l / b);
        for (k = 0; k <= n; ++k) g = l + m, f.push({start: l / b, end: g / b, unscaledStart: l}), l = g
    }
    return f
};
shaka.dash.MpdUtils.parseSegmentInfo = function (a, b) {
    goog.asserts.assert(b(a.representation), "There must be at least one element of the given type.");
    var c = shaka.dash.MpdUtils, d = shaka.util.XmlUtils, e = c.inheritAttribute(a, b, "timescale"), f = 1;
    e && (f = d.parsePositiveInt(e) || 1);
    e = c.inheritAttribute(a, b, "duration");
    (e = d.parsePositiveInt(e || "")) && (e /= f);
    var g = c.inheritAttribute(a, b, "startNumber"),
        h = Number(c.inheritAttribute(a, b, "presentationTimeOffset")) || 0, d = d.parseNonNegativeInt(g || "");
    if (null == g || null == d) d =
        1;
    var g = c.inheritChild(a, b, "SegmentTimeline"), k = null;
    g && (k = c.createTimeline(g, f, h, a.periodInfo.duration || Infinity));
    return {
        timescale: f,
        segmentDuration: e,
        startNumber: d,
        scaledPresentationTimeOffset: h / f || 0,
        unscaledPresentationTimeOffset: h,
        timeline: k
    }
};
shaka.dash.MpdUtils.inheritAttribute = function (a, b, c) {
    var d = shaka.util.Functional;
    goog.asserts.assert(b(a.representation), "There must be at least one element of the given type");
    return [b(a.representation), b(a.adaptationSet), b(a.period)].filter(d.isNotNull).map(function (a) {
        return a.getAttribute(c)
    }).reduce(function (a, b) {
        return a || b
    })
};
shaka.dash.MpdUtils.inheritChild = function (a, b, c) {
    var d = shaka.util.Functional;
    goog.asserts.assert(b(a.representation), "There must be at least one element of the given type");
    a = [b(a.representation), b(a.adaptationSet), b(a.period)].filter(d.isNotNull);
    var e = shaka.util.XmlUtils;
    return a.map(function (a) {
        return e.findChild(a, c)
    }).reduce(function (a, b) {
        return a || b
    })
};
shaka.dash.MpdUtils.parseXml = function (a, b) {
    var c = new DOMParser;
    try {
        var d = shaka.util.StringUtils.fromUTF8(a);
        var e = c.parseFromString(d, "text/xml")
    } catch (g) {
    }
    if (e && e.documentElement.tagName == b) var f = e.documentElement;
    return f && 0 < f.getElementsByTagName("parsererror").length ? null : f
};
shaka.dash.MpdUtils.handleXlinkInElement_ = function (a, b, c, d, e, f) {
    for (var g = shaka.dash.MpdUtils, h = shaka.util.Error, k = shaka.util.ManifestParserUtils, l = a.getAttribute("xlink:href"), m = a.getAttribute("xlink:actuate") || "onRequest", n = 0; n < a.attributes.length; n++) {
        var p = a.attributes[n].nodeName;
        -1 != p.indexOf("xlink:") && (a.removeAttribute(p), --n)
    }
    if (5 <= f) return Promise.reject(new h(h.Severity.CRITICAL, h.Category.MANIFEST, h.Code.DASH_XLINK_DEPTH_LIMIT));
    if ("onLoad" != m) return Promise.reject(new h(h.Severity.CRITICAL,
        h.Category.MANIFEST, h.Code.DASH_UNSUPPORTED_XLINK_ACTUATE));
    var r = k.resolveUris([d], [l]);
    d = shaka.net.NetworkingEngine.RequestType.MANIFEST;
    k = shaka.net.NetworkingEngine.makeRequest(r, b);
    return e.request(d, k).then(function (d) {
        d = g.parseXml(d.data, a.tagName);
        if (!d) return Promise.reject(new h(h.Severity.CRITICAL, h.Category.MANIFEST, h.Code.DASH_INVALID_XML, l));
        for (; a.childNodes.length;) a.removeChild(a.childNodes[0]);
        for (; d.childNodes.length;) {
            var k = d.childNodes[0];
            d.removeChild(k);
            a.appendChild(k)
        }
        for (k =
                 0; k < d.attributes.length; k++) {
            var m = d.attributes[k].nodeName, n = d.getAttribute(m);
            a.setAttribute(m, n)
        }
        return shaka.dash.MpdUtils.processXlinks(a, b, c, r[0], e, f + 1)
    }.bind(a))
};
shaka.dash.MpdUtils.processXlinks = function (a, b, c, d, e, f) {
    var g = shaka.dash.MpdUtils;
    f = f || 0;
    if (a.getAttribute("xlink:href")) {
        var h = g.handleXlinkInElement_(a, b, c, d, e, f);
        c && (h = h["catch"](function () {
            return g.processXlinks(a, b, c, d, e, f)
        }));
        return h
    }
    for (h = 0; h < a.childNodes.length; h++) {
        var k = a.childNodes[h];
        k instanceof Element && "urn:mpeg:dash:resolve-to-zero:2013" == k.getAttribute("xlink:href") && (a.removeChild(k), --h)
    }
    for (var l = [], h = 0; h < a.childNodes.length; h++) k = a.childNodes[h], k.nodeType == Node.ELEMENT_NODE &&
    (k = shaka.dash.MpdUtils.processXlinks(k, b, c, d, e, f), l.push(k));
    return Promise.all(l).then(function () {
        return a
    })
};
shaka.media.InitSegmentReference = function (a, b, c) {
    this.getUris = a;
    this.startByte = b;
    this.endByte = c
};
goog.exportSymbol("shaka.media.InitSegmentReference", shaka.media.InitSegmentReference);
shaka.media.SegmentReference = function (a, b, c, d, e, f) {
    goog.asserts.assert(b < c, "startTime must be less than endTime");
    goog.asserts.assert(e < f || null == f, "startByte must be < endByte");
    this.position = a;
    this.startTime = b;
    this.endTime = c;
    this.getUris = d;
    this.startByte = e;
    this.endByte = f
};
goog.exportSymbol("shaka.media.SegmentReference", shaka.media.SegmentReference);
shaka.util.DataViewReader = function (a, b) {
    this.dataView_ = a;
    this.littleEndian_ = b == shaka.util.DataViewReader.Endianness.LITTLE_ENDIAN;
    this.position_ = 0
};
goog.exportSymbol("shaka.util.DataViewReader", shaka.util.DataViewReader);
shaka.util.DataViewReader.Endianness = {BIG_ENDIAN: 0, LITTLE_ENDIAN: 1};
goog.exportProperty(shaka.util.DataViewReader, "Endianness", shaka.util.DataViewReader.Endianness);
shaka.util.DataViewReader.prototype.hasMoreData = function () {
    return this.position_ < this.dataView_.byteLength
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "hasMoreData", shaka.util.DataViewReader.prototype.hasMoreData);
shaka.util.DataViewReader.prototype.getPosition = function () {
    return this.position_
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "getPosition", shaka.util.DataViewReader.prototype.getPosition);
shaka.util.DataViewReader.prototype.getLength = function () {
    return this.dataView_.byteLength
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "getLength", shaka.util.DataViewReader.prototype.getLength);
shaka.util.DataViewReader.prototype.readUint8 = function () {
    try {
        var a = this.dataView_.getUint8(this.position_)
    } catch (b) {
        this.throwOutOfBounds_()
    }
    this.position_ += 1;
    return a
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "readUint8", shaka.util.DataViewReader.prototype.readUint8);
shaka.util.DataViewReader.prototype.readUint16 = function () {
    try {
        var a = this.dataView_.getUint16(this.position_, this.littleEndian_)
    } catch (b) {
        this.throwOutOfBounds_()
    }
    this.position_ += 2;
    return a
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "readUint16", shaka.util.DataViewReader.prototype.readUint16);
shaka.util.DataViewReader.prototype.readUint32 = function () {
    try {
        var a = this.dataView_.getUint32(this.position_, this.littleEndian_)
    } catch (b) {
        this.throwOutOfBounds_()
    }
    this.position_ += 4;
    return a
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "readUint32", shaka.util.DataViewReader.prototype.readUint32);
shaka.util.DataViewReader.prototype.readInt32 = function () {
    try {
        var a = this.dataView_.getInt32(this.position_, this.littleEndian_)
    } catch (b) {
        this.throwOutOfBounds_()
    }
    this.position_ += 4;
    return a
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "readInt32", shaka.util.DataViewReader.prototype.readInt32);
shaka.util.DataViewReader.prototype.readUint64 = function () {
    try {
        if (this.littleEndian_) {
            var a = this.dataView_.getUint32(this.position_, !0);
            var b = this.dataView_.getUint32(this.position_ + 4, !0)
        } else b = this.dataView_.getUint32(this.position_, !1), a = this.dataView_.getUint32(this.position_ + 4, !1)
    } catch (c) {
        this.throwOutOfBounds_()
    }
    if (2097151 < b) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.JS_INTEGER_OVERFLOW);
    this.position_ += 8;
    return b * Math.pow(2,
        32) + a
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "readUint64", shaka.util.DataViewReader.prototype.readUint64);
shaka.util.DataViewReader.prototype.readBytes = function (a) {
    goog.asserts.assert(0 < a, "Bad call to DataViewReader.readBytes");
    this.position_ + a > this.dataView_.byteLength && this.throwOutOfBounds_();
    var b = this.createDataSlice_(this.position_, this.position_ + a);
    this.position_ += a;
    return new Uint8Array(b)
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "readBytes", shaka.util.DataViewReader.prototype.readBytes);
shaka.util.DataViewReader.prototype.skip = function (a) {
    goog.asserts.assert(0 <= a, "Bad call to DataViewReader.skip");
    this.position_ + a > this.dataView_.byteLength && this.throwOutOfBounds_();
    this.position_ += a
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "skip", shaka.util.DataViewReader.prototype.skip);
shaka.util.DataViewReader.prototype.readTerminatedString = function () {
    for (var a = this.position_; this.hasMoreData() && 0 != this.dataView_.getUint8(this.position_);) this.position_ += 1;
    a = this.createDataSlice_(a, this.position_);
    this.position_ += 1;
    return shaka.util.StringUtils.fromUTF8(a)
};
goog.exportProperty(shaka.util.DataViewReader.prototype, "readTerminatedString", shaka.util.DataViewReader.prototype.readTerminatedString);
shaka.util.DataViewReader.prototype.throwOutOfBounds_ = function () {
    throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.BUFFER_READ_OUT_OF_BOUNDS);
};
shaka.util.DataViewReader.prototype.createDataSlice_ = function (a, b) {
    goog.asserts.assert(b >= a, "Cannot have end < start");
    goog.asserts.assert(0 == this.dataView_.byteOffset, "Doesn't support sub-buffer views");
    var c = new Uint8Array(b - a);
    c.set(new Uint8Array(this.dataView_.buffer, a, b - a));
    return c.buffer
};
shaka.util.Mp4Parser = function () {
    this.headers_ = [];
    this.boxDefinitions_ = []
};
goog.exportSymbol("shaka.util.Mp4Parser", shaka.util.Mp4Parser);
shaka.util.Mp4Parser.BoxType_ = {BASIC_BOX: 0, FULL_BOX: 1};
shaka.util.Mp4Parser.prototype.box = function (a, b) {
    var c = shaka.util.Mp4Parser.typeFromString_(a);
    this.headers_[c] = shaka.util.Mp4Parser.BoxType_.BASIC_BOX;
    this.boxDefinitions_[c] = b;
    return this
};
goog.exportProperty(shaka.util.Mp4Parser.prototype, "box", shaka.util.Mp4Parser.prototype.box);
shaka.util.Mp4Parser.prototype.fullBox = function (a, b) {
    var c = shaka.util.Mp4Parser.typeFromString_(a);
    this.headers_[c] = shaka.util.Mp4Parser.BoxType_.FULL_BOX;
    this.boxDefinitions_[c] = b;
    return this
};
goog.exportProperty(shaka.util.Mp4Parser.prototype, "fullBox", shaka.util.Mp4Parser.prototype.fullBox);
shaka.util.Mp4Parser.prototype.parse = function (a) {
    for (a = new shaka.util.DataViewReader(new DataView(a), shaka.util.DataViewReader.Endianness.BIG_ENDIAN); a.hasMoreData();) this.parseNext(0, a)
};
goog.exportProperty(shaka.util.Mp4Parser.prototype, "parse", shaka.util.Mp4Parser.prototype.parse);
shaka.util.Mp4Parser.prototype.parseNext = function (a, b) {
    var c = b.getPosition(), d = b.readUint32(), e = b.readUint32();
    switch (d) {
        case 0:
            d = b.getLength() - c;
            break;
        case 1:
            d = b.readUint64()
    }
    var f = this.boxDefinitions_[e];
    if (f) {
        var g = null, h = null;
        this.headers_[e] == shaka.util.Mp4Parser.BoxType_.FULL_BOX && (h = b.readUint32(), g = h >>> 24, h &= 16777215);
        e = c + d - b.getPosition();
        e = 0 < e ? b.readBytes(e).buffer : new ArrayBuffer(0);
        e = new shaka.util.DataViewReader(new DataView(e), shaka.util.DataViewReader.Endianness.BIG_ENDIAN);
        f({
            parser: this,
            version: g, flags: h, reader: e, size: d, start: c + a
        })
    } else b.skip(c + d - b.getPosition())
};
goog.exportProperty(shaka.util.Mp4Parser.prototype, "parseNext", shaka.util.Mp4Parser.prototype.parseNext);
shaka.util.Mp4Parser.children = function (a) {
    for (; a.reader.hasMoreData();) a.parser.parseNext(a.start, a.reader)
};
goog.exportProperty(shaka.util.Mp4Parser, "children", shaka.util.Mp4Parser.children);
shaka.util.Mp4Parser.sampleDescription = function (a) {
    for (var b = a.reader.readUint32(); 0 < b; --b) a.parser.parseNext(a.start, a.reader)
};
goog.exportProperty(shaka.util.Mp4Parser, "sampleDescription", shaka.util.Mp4Parser.sampleDescription);
shaka.util.Mp4Parser.allData = function (a) {
    return function (b) {
        var c = b.reader.getLength() - b.reader.getPosition();
        a(b.reader.readBytes(c))
    }
};
goog.exportProperty(shaka.util.Mp4Parser, "allData", shaka.util.Mp4Parser.allData);
shaka.util.Mp4Parser.typeFromString_ = function (a) {
    goog.asserts.assert(4 == a.length, "Mp4 box names must be 4 characters long");
    for (var b = 0, c = 0; c < a.length; c++) b = b << 8 | a.charCodeAt(c);
    return b
};
shaka.media.Mp4SegmentIndexParser = function (a, b, c, d) {
    var e = shaka.media.Mp4SegmentIndexParser, f, g = (new shaka.util.Mp4Parser).fullBox("sidx", function (a) {
        f = e.parseSIDX_(b, d, c, a)
    });
    a && g.parse(a);
    if (f) return f;
    shaka.log.error('Invalid box type, expected "sidx".');
    throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.MP4_SIDX_WRONG_BOX_TYPE);
};
shaka.media.Mp4SegmentIndexParser.parseSIDX_ = function (a, b, c, d) {
    goog.asserts.assert(null != d.version, "SIDX is a full box and should have a valid version.");
    var e = [];
    d.reader.skip(4);
    var f = d.reader.readUint32();
    if (0 == f) throw shaka.log.error("Invalid timescale."), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.MP4_SIDX_INVALID_TIMESCALE);
    if (0 == d.version) {
        var g = d.reader.readUint32();
        var h = d.reader.readUint32()
    } else g = d.reader.readUint64(), h =
        d.reader.readUint64();
    d.reader.skip(2);
    var k = d.reader.readUint16();
    a = a + d.size + h;
    for (h = 0; h < k; h++) {
        var l = d.reader.readUint32(), m = (l & 2147483648) >>> 31, l = l & 2147483647, n = d.reader.readUint32();
        d.reader.skip(4);
        if (1 == m) throw shaka.log.error("Heirarchical SIDXs are not supported."), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.MP4_SIDX_TYPE_NOT_SUPPORTED);
        e.push(new shaka.media.SegmentReference(e.length, g / f - b, (g + n) / f - b, function () {
                return c
            }, a,
            a + l - 1));
        g += n;
        a += l
    }
    return e
};
shaka.media.SegmentIndex = function (a) {
    goog.DEBUG && shaka.media.SegmentIndex.assertCorrectReferences_(a);
    this.references_ = a
};
goog.exportSymbol("shaka.media.SegmentIndex", shaka.media.SegmentIndex);
shaka.media.SegmentIndex.prototype.destroy = function () {
    this.references_ = null;
    return Promise.resolve()
};
goog.exportProperty(shaka.media.SegmentIndex.prototype, "destroy", shaka.media.SegmentIndex.prototype.destroy);
shaka.media.SegmentIndex.prototype.find = function (a) {
    for (var b = this.references_.length - 1; 0 <= b; --b) {
        var c = this.references_[b];
        if (a >= c.startTime && a < c.endTime) return c.position
    }
    return this.references_.length && a < this.references_[0].startTime ? this.references_[0].position : null
};
goog.exportProperty(shaka.media.SegmentIndex.prototype, "find", shaka.media.SegmentIndex.prototype.find);
shaka.media.SegmentIndex.prototype.get = function (a) {
    if (0 == this.references_.length) return null;
    a -= this.references_[0].position;
    return 0 > a || a >= this.references_.length ? null : this.references_[a]
};
goog.exportProperty(shaka.media.SegmentIndex.prototype, "get", shaka.media.SegmentIndex.prototype.get);
shaka.media.SegmentIndex.prototype.merge = function (a) {
    var b;
    goog.DEBUG && shaka.media.SegmentIndex.assertCorrectReferences_(a);
    for (var c = [], d = b = 0; b < this.references_.length && d < a.length;) {
        var e = this.references_[b];
        var f = a[d];
        e.startTime < f.startTime ? (c.push(e), b++) : (e.startTime > f.startTime ? 0 == b ? c.push(f) : shaka.log.warning("Refusing to rewrite original references on update!") : (.1 < Math.abs(e.endTime - f.endTime) ? (goog.asserts.assert(f.endTime > e.endTime && b == this.references_.length - 1 && d == a.length - 1, "This should be an update of the last segment in a period"),
            f = new shaka.media.SegmentReference(e.position, f.startTime, f.endTime, f.getUris, f.startByte, f.endByte), c.push(f)) : c.push(e), b++), d++)
    }
    for (; b < this.references_.length;) c.push(this.references_[b++]);
    if (c.length) for (b = c[c.length - 1].position + 1; d < a.length;) f = a[d++], f = new shaka.media.SegmentReference(b++, f.startTime, f.endTime, f.getUris, f.startByte, f.endByte), c.push(f); else c = a;
    goog.DEBUG && shaka.media.SegmentIndex.assertCorrectReferences_(c);
    this.references_ = c
};
goog.exportProperty(shaka.media.SegmentIndex.prototype, "merge", shaka.media.SegmentIndex.prototype.merge);
shaka.media.SegmentIndex.prototype.evict = function (a) {
    for (var b = 0; b < this.references_.length && !(this.references_[b].endTime > a); ++b) ;
    this.references_.splice(0, b)
};
goog.exportProperty(shaka.media.SegmentIndex.prototype, "evict", shaka.media.SegmentIndex.prototype.evict);
shaka.media.SegmentIndex.prototype.fit = function (a) {
    var b = shaka.util.ManifestParserUtils.GAP_OVERLAP_TOLERANCE_SECONDS;
    goog.asserts.assert(null != a, "Period duration must be known for static content!");
    for (goog.asserts.assert(Infinity != a, "Period duration must be finite for static content!"); this.references_.length;) {
        var c = this.references_[this.references_.length - 1];
        if (c.startTime >= a) this.references_.pop(); else break
    }
    for (; this.references_.length;) if (c = this.references_[0], 0 >= c.endTime) this.references_.shift();
    else break;
    0 != this.references_.length && (c = this.references_[0], c.startTime < b && (this.references_[0] = new shaka.media.SegmentReference(c.position, 0, c.endTime, c.getUris, c.startByte, c.endByte)), c = this.references_[this.references_.length - 1], this.references_[this.references_.length - 1] = new shaka.media.SegmentReference(c.position, c.startTime, a, c.getUris, c.startByte, c.endByte))
};
goog.DEBUG && (shaka.media.SegmentIndex.assertCorrectReferences_ = function (a) {
    goog.asserts.assert(a.every(function (b, c) {
        if (0 == c) return !0;
        var d = a[c - 1];
        return b.position != d.position + 1 ? !1 : d.startTime < b.startTime ? !0 : d.startTime > b.startTime ? !1 : d.endTime <= b.endTime ? !0 : !1
    }), "SegmentReferences are incorrect")
});
shaka.util.EbmlParser = function (a) {
    this.dataView_ = a;
    this.reader_ = new shaka.util.DataViewReader(a, shaka.util.DataViewReader.Endianness.BIG_ENDIAN);
    shaka.util.EbmlParser.DYNAMIC_SIZES || (shaka.util.EbmlParser.DYNAMIC_SIZES = [new Uint8Array([255]), new Uint8Array([127, 255]), new Uint8Array([63, 255, 255]), new Uint8Array([31, 255, 255, 255]), new Uint8Array([15, 255, 255, 255, 255]), new Uint8Array([7, 255, 255, 255, 255, 255]), new Uint8Array([3, 255, 255, 255, 255, 255, 255]), new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255])])
};
shaka.util.EbmlParser.prototype.hasMoreData = function () {
    return this.reader_.hasMoreData()
};
shaka.util.EbmlParser.prototype.parseElement = function () {
    var a = this.parseId_(), b = this.parseVint_(),
        b = shaka.util.EbmlParser.isDynamicSizeValue_(b) ? this.dataView_.byteLength - this.reader_.getPosition() : shaka.util.EbmlParser.getVintValue_(b),
        b = this.reader_.getPosition() + b <= this.dataView_.byteLength ? b : this.dataView_.byteLength - this.reader_.getPosition(),
        c = new DataView(this.dataView_.buffer, this.dataView_.byteOffset + this.reader_.getPosition(), b);
    this.reader_.skip(b);
    return new shaka.util.EbmlElement(a, c)
};
shaka.util.EbmlParser.prototype.parseId_ = function () {
    var a = this.parseVint_();
    if (7 < a.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.EBML_OVERFLOW);
    for (var b = 0, c = 0; c < a.length; c++) b = 256 * b + a[c];
    return b
};
shaka.util.EbmlParser.prototype.parseVint_ = function () {
    var a = this.reader_.readUint8(), b;
    for (b = 1; 8 >= b && !(a & 1 << 8 - b); b++) ;
    if (8 < b) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.EBML_OVERFLOW);
    var c = new Uint8Array(b);
    c[0] = a;
    for (a = 1; a < b; a++) c[a] = this.reader_.readUint8();
    return c
};
shaka.util.EbmlParser.getVintValue_ = function (a) {
    if (8 == a.length && a[1] & 224) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.JS_INTEGER_OVERFLOW);
    for (var b = a[0] & (1 << 8 - a.length) - 1, c = 1; c < a.length; c++) b = 256 * b + a[c];
    return b
};
shaka.util.EbmlParser.isDynamicSizeValue_ = function (a) {
    for (var b = shaka.util.EbmlParser, c = shaka.util.Uint8ArrayUtils.equal, d = 0; d < b.DYNAMIC_SIZES.length; d++) if (c(a, b.DYNAMIC_SIZES[d])) return !0;
    return !1
};
shaka.util.EbmlElement = function (a, b) {
    this.id = a;
    this.dataView_ = b
};
shaka.util.EbmlElement.prototype.getOffset = function () {
    return this.dataView_.byteOffset
};
shaka.util.EbmlElement.prototype.createParser = function () {
    return new shaka.util.EbmlParser(this.dataView_)
};
shaka.util.EbmlElement.prototype.getUint = function () {
    if (8 < this.dataView_.byteLength) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.EBML_OVERFLOW);
    if (8 == this.dataView_.byteLength && this.dataView_.getUint8(0) & 224) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.JS_INTEGER_OVERFLOW);
    for (var a = 0, b = 0; b < this.dataView_.byteLength; b++) var c = this.dataView_.getUint8(b), a = 256 *
        a + c;
    return a
};
shaka.util.EbmlElement.prototype.getFloat = function () {
    if (4 == this.dataView_.byteLength) return this.dataView_.getFloat32(0);
    if (8 == this.dataView_.byteLength) return this.dataView_.getFloat64(0);
    throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.EBML_BAD_FLOATING_POINT_SIZE);
};
shaka.media.WebmSegmentIndexParser = function () {
};
shaka.media.WebmSegmentIndexParser.EBML_ID = 440786851;
shaka.media.WebmSegmentIndexParser.SEGMENT_ID = 408125543;
shaka.media.WebmSegmentIndexParser.INFO_ID = 357149030;
shaka.media.WebmSegmentIndexParser.TIMECODE_SCALE_ID = 2807729;
shaka.media.WebmSegmentIndexParser.DURATION_ID = 17545;
shaka.media.WebmSegmentIndexParser.CUES_ID = 475249515;
shaka.media.WebmSegmentIndexParser.CUE_POINT_ID = 187;
shaka.media.WebmSegmentIndexParser.CUE_TIME_ID = 179;
shaka.media.WebmSegmentIndexParser.CUE_TRACK_POSITIONS_ID = 183;
shaka.media.WebmSegmentIndexParser.CUE_CLUSTER_POSITION = 241;
shaka.media.WebmSegmentIndexParser.prototype.parse = function (a, b, c, d) {
    b = this.parseWebmContainer_(b);
    a = (new shaka.util.EbmlParser(new DataView(a))).parseElement();
    if (a.id != shaka.media.WebmSegmentIndexParser.CUES_ID) throw shaka.log.error("Not a Cues element."), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.WEBM_CUES_ELEMENT_MISSING);
    return this.parseCues_(a, b.segmentOffset, b.timecodeScale, b.duration, c, d)
};
shaka.media.WebmSegmentIndexParser.prototype.parseWebmContainer_ = function (a) {
    a = new shaka.util.EbmlParser(new DataView(a));
    if (a.parseElement().id != shaka.media.WebmSegmentIndexParser.EBML_ID) throw shaka.log.error("Not an EBML element."), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.WEBM_EBML_HEADER_ELEMENT_MISSING);
    var b = a.parseElement();
    if (b.id != shaka.media.WebmSegmentIndexParser.SEGMENT_ID) throw shaka.log.error("Not a Segment element."),
        new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.WEBM_SEGMENT_ELEMENT_MISSING);
    a = b.getOffset();
    b = this.parseSegment_(b);
    return {segmentOffset: a, timecodeScale: b.timecodeScale, duration: b.duration}
};
shaka.media.WebmSegmentIndexParser.prototype.parseSegment_ = function (a) {
    a = a.createParser();
    for (var b = null; a.hasMoreData();) {
        var c = a.parseElement();
        if (c.id == shaka.media.WebmSegmentIndexParser.INFO_ID) {
            b = c;
            break
        }
    }
    if (!b) throw shaka.log.error("Not an Info element."), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.WEBM_INFO_ELEMENT_MISSING);
    return this.parseInfo_(b)
};
shaka.media.WebmSegmentIndexParser.prototype.parseInfo_ = function (a) {
    var b = a.createParser(), c = 1E6;
    for (a = null; b.hasMoreData();) {
        var d = b.parseElement();
        d.id == shaka.media.WebmSegmentIndexParser.TIMECODE_SCALE_ID ? c = d.getUint() : d.id == shaka.media.WebmSegmentIndexParser.DURATION_ID && (a = d.getFloat())
    }
    if (null == a) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.WEBM_DURATION_ELEMENT_MISSING);
    b = c / 1E9;
    return {timecodeScale: b, duration: a * b}
};
shaka.media.WebmSegmentIndexParser.prototype.parseCues_ = function (a, b, c, d, e, f) {
    var g = [], h = function () {
        return e
    };
    a = a.createParser();
    for (var k = null, l = null; a.hasMoreData();) {
        var m = a.parseElement();
        if (m.id == shaka.media.WebmSegmentIndexParser.CUE_POINT_ID) {
            var n = this.parseCuePoint_(m);
            n && (m = c * n.unscaledTime, n = b + n.relativeOffset, null != k && (goog.asserts.assert(null != l, "last offset cannot be null"), g.push(new shaka.media.SegmentReference(g.length, k - f, m - f, h, l, n - 1))), k = m, l = n)
        }
    }
    null != k && (goog.asserts.assert(null !=
        l, "last offset cannot be null"), g.push(new shaka.media.SegmentReference(g.length, k - f, d - f, h, l, null)));
    return g
};
shaka.media.WebmSegmentIndexParser.prototype.parseCuePoint_ = function (a) {
    var b = a.createParser();
    a = b.parseElement();
    if (a.id != shaka.media.WebmSegmentIndexParser.CUE_TIME_ID) throw shaka.log.warning("Not a CueTime element."), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.WEBM_CUE_TIME_ELEMENT_MISSING);
    a = a.getUint();
    b = b.parseElement();
    if (b.id != shaka.media.WebmSegmentIndexParser.CUE_TRACK_POSITIONS_ID) throw shaka.log.warning("Not a CueTrackPositions element."),
        new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING);
    for (var b = b.createParser(), c = 0; b.hasMoreData();) {
        var d = b.parseElement();
        if (d.id == shaka.media.WebmSegmentIndexParser.CUE_CLUSTER_POSITION) {
            c = d.getUint();
            break
        }
    }
    return {unscaledTime: a, relativeOffset: c}
};
shaka.dash.SegmentBase = {};
shaka.dash.SegmentBase.createInitSegment = function (a, b) {
    var c = shaka.util.XmlUtils, d = shaka.util.ManifestParserUtils,
        e = shaka.dash.MpdUtils.inheritChild(a, b, "Initialization");
    if (!e) return null;
    var f = a.representation.baseUris, g = e.getAttribute("sourceURL");
    g && (f = d.resolveUris(a.representation.baseUris, [g]));
    d = 0;
    g = null;
    if (c = c.parseAttr(e, "range", c.parseRange)) d = c.start, g = c.end;
    return new shaka.media.InitSegmentReference(function () {
        return f
    }, d, g)
};
shaka.dash.SegmentBase.createStream = function (a, b) {
    goog.asserts.assert(a.representation.segmentBase, "Should only be called with SegmentBase");
    var c = shaka.dash.MpdUtils, d = shaka.dash.SegmentBase, e = shaka.util.XmlUtils,
        f = Number(c.inheritAttribute(a, d.fromInheritance_, "presentationTimeOffset")) || 0,
        c = c.inheritAttribute(a, d.fromInheritance_, "timescale"), g = 1;
    c && (g = e.parsePositiveInt(c) || 1);
    e = f / g || 0;
    f = d.createInitSegment(a, d.fromInheritance_);
    d = d.createSegmentIndex_(a, b, f, e);
    return {
        createSegmentIndex: d.createSegmentIndex,
        findSegmentPosition: d.findSegmentPosition,
        getSegmentReference: d.getSegmentReference,
        initSegmentReference: f,
        scaledPresentationTimeOffset: e
    }
};
shaka.dash.SegmentBase.createSegmentIndexFromUris = function (a, b, c, d, e, f, g, h) {
    var k = a.presentationTimeline, l = !a.dynamic || !a.periodInfo.isLastPeriod, m = a.periodInfo.start,
        n = a.periodInfo.duration, p = b, r = null;
    return {
        createSegmentIndex: function () {
            var a = [p(d, e, f), "webm" == g ? p(c.getUris(), c.startByte, c.endByte) : null];
            p = null;
            return Promise.all(a).then(function (a) {
                var b = a[0];
                a = a[1] || null;
                "mp4" == g ? b = shaka.media.Mp4SegmentIndexParser(b, e, d, h) : (goog.asserts.assert(a, "WebM requires init data"), b = (new shaka.media.WebmSegmentIndexParser).parse(b,
                    a, d, h));
                k.notifySegments(m, b);
                goog.asserts.assert(!r, "Should not call createSegmentIndex twice");
                r = new shaka.media.SegmentIndex(b);
                l && r.fit(n)
            })
        }, findSegmentPosition: function (a) {
            goog.asserts.assert(r, "Must call createSegmentIndex first");
            return r.find(a)
        }, getSegmentReference: function (a) {
            goog.asserts.assert(r, "Must call createSegmentIndex first");
            return r.get(a)
        }
    }
};
shaka.dash.SegmentBase.fromInheritance_ = function (a) {
    return a.segmentBase
};
shaka.dash.SegmentBase.createSegmentIndex_ = function (a, b, c, d) {
    var e = shaka.dash.MpdUtils, f = shaka.dash.SegmentBase, g = shaka.util.XmlUtils,
        h = shaka.util.ManifestParserUtils, k = shaka.util.ManifestParserUtils.ContentType,
        l = a.representation.contentType, m = a.representation.mimeType.split("/")[1];
    if (l != k.TEXT && "mp4" != m && "webm" != m) throw shaka.log.error("SegmentBase specifies an unsupported container type.", a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST,
        shaka.util.Error.Code.DASH_UNSUPPORTED_CONTAINER);
    if ("webm" == m && !c) throw shaka.log.error("SegmentBase does not contain sufficient segment information:", "the SegmentBase uses a WebM container,", "but does not contain an Initialization element.", a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_WEBM_MISSING_INIT);
    k = e.inheritChild(a, f.fromInheritance_, "RepresentationIndex");
    f = e.inheritAttribute(a, f.fromInheritance_,
        "indexRange");
    e = a.representation.baseUris;
    f = g.parseRange(f || "");
    k && ((l = k.getAttribute("sourceURL")) && (e = h.resolveUris(a.representation.baseUris, [l])), f = g.parseAttr(k, "range", g.parseRange, f));
    if (!f) throw shaka.log.error("SegmentBase does not contain sufficient segment information:", "the SegmentBase does not contain @indexRange", "or a RepresentationIndex element.", a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    return shaka.dash.SegmentBase.createSegmentIndexFromUris(a, b, c, e, f.start, f.end, m, d)
};
shaka.dash.SegmentList = {};
shaka.dash.SegmentList.createStream = function (a, b) {
    goog.asserts.assert(a.representation.segmentList, "Should only be called with SegmentList");
    var c = shaka.dash.SegmentList, d = shaka.dash.SegmentBase.createInitSegment(a, c.fromInheritance_),
        e = c.parseSegmentListInfo_(a);
    c.checkSegmentListInfo_(a, e);
    var f = null, g = null;
    a.period.id && a.representation.id && (g = a.period.id + "," + a.representation.id, f = b[g]);
    c = c.createSegmentReferences_(a.periodInfo.duration, e.startNumber, a.representation.baseUris, e);
    f ? (f.merge(c), g =
        a.presentationTimeline.getSegmentAvailabilityStart(), f.evict(g - a.periodInfo.start)) : (a.presentationTimeline.notifySegments(a.periodInfo.start, c), f = new shaka.media.SegmentIndex(c), g && a.dynamic && (b[g] = f));
    a.dynamic && a.periodInfo.isLastPeriod || f.fit(a.periodInfo.duration);
    return {
        createSegmentIndex: Promise.resolve.bind(Promise),
        findSegmentPosition: f.find.bind(f),
        getSegmentReference: f.get.bind(f),
        initSegmentReference: d,
        scaledPresentationTimeOffset: e.scaledPresentationTimeOffset
    }
};
shaka.dash.SegmentList.fromInheritance_ = function (a) {
    return a.segmentList
};
shaka.dash.SegmentList.parseSegmentListInfo_ = function (a) {
    var b = shaka.dash.SegmentList, c = shaka.dash.MpdUtils, d = b.parseMediaSegments_(a);
    a = c.parseSegmentInfo(a, b.fromInheritance_);
    b = a.startNumber;
    0 == b && (shaka.log.warning("SegmentList@startNumber must be > 0"), b = 1);
    c = 0;
    a.segmentDuration ? c = a.segmentDuration * (b - 1) : a.timeline && 0 < a.timeline.length && (c = a.timeline[0].start);
    return {
        segmentDuration: a.segmentDuration,
        startTime: c,
        startNumber: b,
        scaledPresentationTimeOffset: a.scaledPresentationTimeOffset,
        timeline: a.timeline,
        mediaSegments: d
    }
};
shaka.dash.SegmentList.checkSegmentListInfo_ = function (a, b) {
    if (!b.segmentDuration && !b.timeline && 1 < b.mediaSegments.length) throw shaka.log.warning("SegmentList does not contain sufficient segment information:", "the SegmentList specifies multiple segments,", "but does not specify a segment duration or timeline.", a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    if (!b.segmentDuration && !a.periodInfo.duration &&
        !b.timeline && 1 == b.mediaSegments.length) throw shaka.log.warning("SegmentList does not contain sufficient segment information:", "the SegmentList specifies one segment,", "but does not specify a segment duration, period duration,", "or timeline.", a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    if (b.timeline && 0 == b.timeline.length) throw shaka.log.warning("SegmentList does not contain sufficient segment information:",
        "the SegmentList has an empty timeline.", a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
};
shaka.dash.SegmentList.createSegmentReferences_ = function (a, b, c, d) {
    var e = shaka.util.ManifestParserUtils, f = d.mediaSegments.length;
    d.timeline && d.timeline.length != d.mediaSegments.length && (f = Math.min(d.timeline.length, d.mediaSegments.length), shaka.log.warning("The number of items in the segment timeline and the number of segment", "URLs do not match, truncating", d.mediaSegments.length, "to", f));
    for (var g = [], h = d.startTime, k = 0; k < f; k++) {
        var l = d.mediaSegments[k], m = e.resolveUris(c, [l.mediaUri]);
        if (null != d.segmentDuration) var n =
            h + d.segmentDuration; else d.timeline ? n = d.timeline[k].end : (goog.asserts.assert(1 == d.mediaSegments.length && a, "There should only be one segment with a Period duration."), n = h + a);
        m = function (a) {
            return a
        }.bind(null, m);
        g.push(new shaka.media.SegmentReference(k + b, h, n, m, l.start, l.end));
        h = n
    }
    return g
};
shaka.dash.SegmentList.parseMediaSegments_ = function (a) {
    var b = [a.representation.segmentList, a.adaptationSet.segmentList, a.period.segmentList].filter(shaka.util.Functional.isNotNull),
        c = shaka.util.XmlUtils;
    return b.map(function (a) {
        return c.findChildren(a, "SegmentURL")
    }).reduce(function (a, b) {
        return 0 < a.length ? a : b
    }).map(function (b) {
        b.getAttribute("indexRange") && !a.indexRangeWarningGiven && (a.indexRangeWarningGiven = !0, shaka.log.warning("We do not support the SegmentURL@indexRange attribute on SegmentList.  We only use the SegmentList@duration attribute or SegmentTimeline, which must be accurate."));
        var d = b.getAttribute("media");
        b = c.parseAttr(b, "mediaRange", c.parseRange, {start: 0, end: null});
        return {mediaUri: d, start: b.start, end: b.end}
    })
};
shaka.dash.SegmentTemplate = {};
shaka.dash.SegmentTemplate.createStream = function (a, b, c, d) {
    goog.asserts.assert(a.representation.segmentTemplate, "Should only be called with SegmentTemplate");
    var e = shaka.dash.SegmentTemplate, f = e.createInitSegment_(a), g = e.parseSegmentTemplateInfo_(a);
    e.checkSegmentTemplateInfo_(a, g);
    g.indexTemplate ? a = e.createFromIndexTemplate_(a, b, f, g) : g.segmentDuration ? (d || a.presentationTimeline.notifyMaxSegmentDuration(g.segmentDuration), a = e.createFromDuration_(a, g)) : (d = b = null, a.period.id && a.representation.id && (d =
        a.period.id + "," + a.representation.id, b = c[d]), e = e.createFromTimeline_(a, g), b ? (b.merge(e), c = a.presentationTimeline.getSegmentAvailabilityStart(), b.evict(c - a.periodInfo.start)) : (a.presentationTimeline.notifySegments(a.periodInfo.start, e), b = new shaka.media.SegmentIndex(e), d && a.dynamic && (c[d] = b)), a.dynamic && a.periodInfo.isLastPeriod || b.fit(a.periodInfo.duration), a = {
        createSegmentIndex: Promise.resolve.bind(Promise),
        findSegmentPosition: b.find.bind(b),
        getSegmentReference: b.get.bind(b)
    });
    return {
        createSegmentIndex: a.createSegmentIndex,
        findSegmentPosition: a.findSegmentPosition,
        getSegmentReference: a.getSegmentReference,
        initSegmentReference: f,
        scaledPresentationTimeOffset: g.scaledPresentationTimeOffset
    }
};
shaka.dash.SegmentTemplate.fromInheritance_ = function (a) {
    return a.segmentTemplate
};
shaka.dash.SegmentTemplate.parseSegmentTemplateInfo_ = function (a) {
    var b = shaka.dash.SegmentTemplate, c = shaka.dash.MpdUtils, d = c.parseSegmentInfo(a, b.fromInheritance_),
        e = c.inheritAttribute(a, b.fromInheritance_, "media");
    a = c.inheritAttribute(a, b.fromInheritance_, "index");
    return {
        segmentDuration: d.segmentDuration,
        timescale: d.timescale,
        startNumber: d.startNumber,
        scaledPresentationTimeOffset: d.scaledPresentationTimeOffset,
        unscaledPresentationTimeOffset: d.unscaledPresentationTimeOffset,
        timeline: d.timeline,
        mediaTemplate: e,
        indexTemplate: a
    }
};
shaka.dash.SegmentTemplate.checkSegmentTemplateInfo_ = function (a, b) {
    var c = 0 + (b.indexTemplate ? 1 : 0);
    c += b.timeline ? 1 : 0;
    c += b.segmentDuration ? 1 : 0;
    if (0 == c) throw shaka.log.error("SegmentTemplate does not contain any segment information:", "the SegmentTemplate must contain either an index URL template", "a SegmentTimeline, or a segment duration.", a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    1 != c && (shaka.log.warning("SegmentTemplate containes multiple segment information sources:",
        "the SegmentTemplate should only contain an index URL template,", "a SegmentTimeline or a segment duration.", a.representation), b.indexTemplate ? (shaka.log.info("Using the index URL template by default."), b.timeline = null) : (goog.asserts.assert(b.timeline, "There should be a timeline"), shaka.log.info("Using the SegmentTimeline by default.")), b.segmentDuration = null);
    if (!b.indexTemplate && !b.mediaTemplate) throw shaka.log.error("SegmentTemplate does not contain sufficient segment information:", "the SegmentTemplate's media URL template is missing.",
        a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
};
shaka.dash.SegmentTemplate.createFromIndexTemplate_ = function (a, b, c, d) {
    var e = shaka.dash.MpdUtils, f = shaka.util.ManifestParserUtils, g = a.representation.mimeType.split("/")[1];
    if ("mp4" != g && "webm" != g) throw shaka.log.error("SegmentTemplate specifies an unsupported container type.", a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_UNSUPPORTED_CONTAINER);
    if ("webm" == g && !c) throw shaka.log.error("SegmentTemplate does not contain sufficient segment information:",
        "the SegmentTemplate uses a WebM container,", "but does not contain an initialization URL template.", a.representation), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_WEBM_MISSING_INIT);
    goog.asserts.assert(d.indexTemplate, "must be using index template");
    e = e.fillUriTemplate(d.indexTemplate, a.representation.id, null, a.bandwidth || null, null);
    f = f.resolveUris(a.representation.baseUris, [e]);
    return shaka.dash.SegmentBase.createSegmentIndexFromUris(a,
        b, c, f, 0, null, g, d.scaledPresentationTimeOffset)
};
shaka.dash.SegmentTemplate.createFromDuration_ = function (a, b) {
    goog.asserts.assert(b.mediaTemplate, "There should be a media template with duration");
    var c = shaka.dash.MpdUtils, d = shaka.util.ManifestParserUtils, e = a.periodInfo.duration, f = b.segmentDuration,
        g = b.startNumber, h = b.timescale, k = b.mediaTemplate, l = a.bandwidth || null, m = a.representation.id,
        n = a.representation.baseUris;
    return {
        createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function (a) {
            return 0 > a || e && a >= e ? null : Math.floor(a / f)
        }, getSegmentReference: function (a) {
            var b =
                a * f;
            return 0 > b || e && b >= e ? null : new shaka.media.SegmentReference(a, b, b + f, function () {
                var e = c.fillUriTemplate(k, m, a + g, l, b * h);
                return d.resolveUris(n, [e])
            }, 0, null)
        }
    }
};
shaka.dash.SegmentTemplate.createFromTimeline_ = function (a, b) {
    goog.asserts.assert(b.mediaTemplate, "There should be a media template with a timeline");
    for (var c = shaka.dash.MpdUtils, d = shaka.util.ManifestParserUtils, e = [], f = 0; f < b.timeline.length; f++) {
        var g = b.timeline[f].start, h = b.timeline[f].end, k = f + b.startNumber, l = function (a, b, e, f, g, h) {
            a = c.fillUriTemplate(a, b, g, e, h);
            return d.resolveUris(f, [a]).map(function (a) {
                return a.toString()
            })
        }.bind(null, b.mediaTemplate, a.representation.id, a.bandwidth || null, a.representation.baseUris,
            k, b.timeline[f].unscaledStart + b.unscaledPresentationTimeOffset);
        e.push(new shaka.media.SegmentReference(k, g, h, l, 0, null))
    }
    return e
};
shaka.dash.SegmentTemplate.createInitSegment_ = function (a) {
    var b = shaka.dash.MpdUtils, c = shaka.util.ManifestParserUtils,
        d = b.inheritAttribute(a, shaka.dash.SegmentTemplate.fromInheritance_, "initialization");
    if (!d) return null;
    var e = a.representation.id, f = a.bandwidth || null, g = a.representation.baseUris;
    return new shaka.media.InitSegmentReference(function () {
        goog.asserts.assert(d, "Should have returned earler");
        var a = b.fillUriTemplate(d, e, null, f, null);
        return c.resolveUris(g, [a])
    }, 0, null)
};
shaka.media.ManifestParser = {};
shaka.media.ManifestParser.parsersByMime = {};
shaka.media.ManifestParser.parsersByExtension = {};
shaka.media.ManifestParser.registerParserByExtension = function (a, b) {
    shaka.media.ManifestParser.parsersByExtension[a] = b
};
goog.exportSymbol("shaka.media.ManifestParser.registerParserByExtension", shaka.media.ManifestParser.registerParserByExtension);
shaka.media.ManifestParser.registerParserByMime = function (a, b) {
    shaka.media.ManifestParser.parsersByMime[a] = b
};
goog.exportSymbol("shaka.media.ManifestParser.registerParserByMime", shaka.media.ManifestParser.registerParserByMime);
shaka.media.ManifestParser.probeSupport = function () {
    var a = {}, b;
    for (b in shaka.media.ManifestParser.parsersByMime) a[b] = !0;
    for (b in shaka.media.ManifestParser.parsersByExtension) a[b] = !0;
    ["application/dash+xml", "application/x-mpegurl", "application/vnd.apple.mpegurl", "application/vnd.ms-sstr+xml"].forEach(function (b) {
        a[b] = !!shaka.media.ManifestParser.parsersByMime[b]
    });
    ["mpd", "m3u8", "ism"].forEach(function (b) {
        a[b] = !!shaka.media.ManifestParser.parsersByExtension[b]
    });
    return a
};
shaka.media.ManifestParser.getFactory = function (a, b, c, d) {
    var e = d;
    if (!e && (d = (new goog.Uri(a)).getPath().split("/").pop().split("."), 1 < d.length)) {
        var f = d.pop().toLowerCase();
        e = shaka.media.ManifestParser.parsersByExtension[f]
    }
    if (e) return Promise.resolve(e);
    c = shaka.net.NetworkingEngine.makeRequest([a], c);
    c.method = "HEAD";
    return b.request(shaka.net.NetworkingEngine.RequestType.MANIFEST, c).then(function (b) {
        (b = b.headers["content-type"]) && (b = b.toLowerCase());
        e = shaka.media.ManifestParser.parsersByMime[b];
        return e ?
            e : (shaka.log.error("Unable to guess manifest type by file extension or by MIME type.", f, b), Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.UNABLE_TO_GUESS_MANIFEST_TYPE, a)))
    }, function (a) {
        goog.asserts.assert(a instanceof shaka.util.Error, "Incorrect error type");
        shaka.log.error("HEAD request to guess manifest type failed!", a);
        a.severity = shaka.util.Error.Severity.CRITICAL;
        return Promise.reject(a)
    })
};
shaka.media.PresentationTimeline = function (a, b) {
    this.presentationStartTime_ = a;
    this.presentationDelay_ = b;
    this.segmentAvailabilityDuration_ = this.duration_ = Infinity;
    this.maxSegmentDuration_ = 1;
    this.clockOffset_ = 0;
    this.static_ = !0;
    this.segmentAvailabilityStart_ = 0
};
goog.exportSymbol("shaka.media.PresentationTimeline", shaka.media.PresentationTimeline);
shaka.media.PresentationTimeline.prototype.getDuration = function () {
    return this.duration_
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "getDuration", shaka.media.PresentationTimeline.prototype.getDuration);
shaka.media.PresentationTimeline.prototype.setDuration = function (a) {
    goog.asserts.assert(0 < a, "duration must be > 0");
    this.duration_ = a
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "setDuration", shaka.media.PresentationTimeline.prototype.setDuration);
shaka.media.PresentationTimeline.prototype.getPresentationStartTime = function () {
    return this.presentationStartTime_
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "getPresentationStartTime", shaka.media.PresentationTimeline.prototype.getPresentationStartTime);
shaka.media.PresentationTimeline.prototype.setClockOffset = function (a) {
    this.clockOffset_ = a
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "setClockOffset", shaka.media.PresentationTimeline.prototype.setClockOffset);
shaka.media.PresentationTimeline.prototype.setStatic = function (a) {
    this.static_ = a
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "setStatic", shaka.media.PresentationTimeline.prototype.setStatic);
shaka.media.PresentationTimeline.prototype.getSegmentAvailabilityDuration = function () {
    return this.segmentAvailabilityDuration_
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "getSegmentAvailabilityDuration", shaka.media.PresentationTimeline.prototype.getSegmentAvailabilityDuration);
shaka.media.PresentationTimeline.prototype.setSegmentAvailabilityDuration = function (a) {
    goog.asserts.assert(0 <= a, "segmentAvailabilityDuration must be >= 0");
    this.segmentAvailabilityDuration_ = a
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "setSegmentAvailabilityDuration", shaka.media.PresentationTimeline.prototype.setSegmentAvailabilityDuration);
shaka.media.PresentationTimeline.prototype.setDelay = function (a) {
    goog.asserts.assert(0 <= a, "delay must be >= 0");
    this.presentationDelay_ = a
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "setDelay", shaka.media.PresentationTimeline.prototype.setDelay);
shaka.media.PresentationTimeline.prototype.notifySegments = function (a, b) {
    0 != b.length && (this.maxSegmentDuration_ = b.reduce(function (a, b) {
        return Math.max(a, b.endTime - b.startTime)
    }, this.maxSegmentDuration_), shaka.log.v1("notifySegments:", "maxSegmentDuration=" + this.maxSegmentDuration_))
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "notifySegments", shaka.media.PresentationTimeline.prototype.notifySegments);
shaka.media.PresentationTimeline.prototype.notifyMaxSegmentDuration = function (a) {
    this.maxSegmentDuration_ = Math.max(this.maxSegmentDuration_, a);
    shaka.log.v1("notifyNewSegmentDuration:", "maxSegmentDuration=" + this.maxSegmentDuration_)
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "notifyMaxSegmentDuration", shaka.media.PresentationTimeline.prototype.notifyMaxSegmentDuration);
shaka.media.PresentationTimeline.prototype.isLive = function () {
    return Infinity == this.duration_ && !this.static_
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "isLive", shaka.media.PresentationTimeline.prototype.isLive);
shaka.media.PresentationTimeline.prototype.isInProgress = function () {
    return Infinity != this.duration_ && !this.static_
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "isInProgress", shaka.media.PresentationTimeline.prototype.isInProgress);
shaka.media.PresentationTimeline.prototype.getSegmentAvailabilityStart = function () {
    return this.getSafeAvailabilityStart(0)
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "getSegmentAvailabilityStart", shaka.media.PresentationTimeline.prototype.getSegmentAvailabilityStart);
shaka.media.PresentationTimeline.prototype.getSafeAvailabilityStart = function (a) {
    if (Infinity == this.segmentAvailabilityDuration_) return this.segmentAvailabilityStart_;
    var b = this.getSegmentAvailabilityEnd();
    return Math.max(this.segmentAvailabilityStart_, Math.min(b - this.segmentAvailabilityDuration_ + a, b))
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "getSafeAvailabilityStart", shaka.media.PresentationTimeline.prototype.getSafeAvailabilityStart);
shaka.media.PresentationTimeline.prototype.setAvailabilityStart = function (a) {
    this.segmentAvailabilityStart_ = a
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "setAvailabilityStart", shaka.media.PresentationTimeline.prototype.setAvailabilityStart);
shaka.media.PresentationTimeline.prototype.getSegmentAvailabilityEnd = function () {
    return this.isLive() || this.isInProgress() ? Math.min(this.getLiveEdge_(), this.duration_) : this.duration_
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "getSegmentAvailabilityEnd", shaka.media.PresentationTimeline.prototype.getSegmentAvailabilityEnd);
shaka.media.PresentationTimeline.prototype.getSeekRangeEnd = function () {
    var a = this.isLive() || this.isInProgress() ? this.presentationDelay_ : 0;
    return Math.max(0, this.getSegmentAvailabilityEnd() - a)
};
goog.exportProperty(shaka.media.PresentationTimeline.prototype, "getSeekRangeEnd", shaka.media.PresentationTimeline.prototype.getSeekRangeEnd);
shaka.media.PresentationTimeline.prototype.getLiveEdge_ = function () {
    goog.asserts.assert(null != this.presentationStartTime_, "Cannot compute timeline live edge without start time");
    var a = (Date.now() + this.clockOffset_) / 1E3;
    return Math.max(0, a - this.maxSegmentDuration_ - this.presentationStartTime_)
};
goog.DEBUG && (shaka.media.PresentationTimeline.prototype.assertIsValid = function () {
    this.isLive() ? goog.asserts.assert(null != this.presentationStartTime_, "Detected as live stream, but does not match our model of live!") : this.isInProgress() ? goog.asserts.assert(null != this.presentationStartTime_ && Infinity == this.segmentAvailabilityDuration_, "Detected as IPR stream, but does not match our model of IPR!") : goog.asserts.assert(Infinity == this.segmentAvailabilityDuration_ && Infinity != this.duration_ && this.static_,
        "Detected as VOD stream, but does not match our model of VOD!")
});
shaka.dash.DashParser = function () {
    this.playerInterface_ = this.config_ = null;
    this.manifestUris_ = [];
    this.manifest_ = null;
    this.periodIds_ = [];
    this.globalId_ = 1;
    this.segmentIndexMap_ = {};
    this.updatePeriod_ = 0;
    this.updateTimer_ = null
};
goog.exportSymbol("shaka.dash.DashParser", shaka.dash.DashParser);
shaka.dash.DashParser.MIN_UPDATE_PERIOD_ = 3;
shaka.dash.DashParser.DEFAULT_SUGGESTED_PRESENTATION_DELAY_ = 10;
shaka.dash.DashParser.prototype.configure = function (a) {
    goog.asserts.assert(null != a.dash, "DashManifestConfiguration should not be null!");
    this.config_ = a
};
shaka.dash.DashParser.prototype.start = function (a, b) {
    goog.asserts.assert(this.config_, "Must call configure() before start()!");
    this.manifestUris_ = [a];
    this.playerInterface_ = b;
    return this.requestManifest_().then(function () {
        this.playerInterface_ && this.setUpdateTimer_(0);
        return this.manifest_
    }.bind(this))
};
shaka.dash.DashParser.prototype.stop = function () {
    this.config_ = this.playerInterface_ = null;
    this.manifestUris_ = [];
    this.manifest_ = null;
    this.periodIds_ = [];
    this.segmentIndexMap_ = {};
    null != this.updateTimer_ && (window.clearTimeout(this.updateTimer_), this.updateTimer_ = null);
    return Promise.resolve()
};
shaka.dash.DashParser.prototype.update = function () {
    this.requestManifest_()["catch"](function (a) {
        if (this.playerInterface_) this.playerInterface_.onError(a)
    }.bind(this))
};
shaka.dash.DashParser.prototype.onExpirationUpdated = function (a, b) {
};
shaka.dash.DashParser.prototype.requestManifest_ = function () {
    var a = shaka.net.NetworkingEngine.RequestType.MANIFEST,
        b = shaka.net.NetworkingEngine.makeRequest(this.manifestUris_, this.config_.retryParameters),
        c = this.playerInterface_.networkingEngine, d = function () {
            return !this.playerInterface_
        }.bind(this);
    return c.request(a, b, d).then(function (a) {
        if (this.playerInterface_) return this.parseManifest_(a.data, a.uri)
    }.bind(this))
};
shaka.dash.DashParser.prototype.parseManifest_ = function (a, b) {
    var c = shaka.util.Error, d = shaka.dash.MpdUtils, e = d.parseXml(a, "MPD");
    if (!e) throw new c(c.Severity.CRITICAL, c.Category.MANIFEST, c.Code.DASH_INVALID_XML, b);
    return d.processXlinks(e, this.config_.retryParameters, this.config_.dash.xlinkFailGracefully, b, this.playerInterface_.networkingEngine).then(function (a) {
        return this.processManifest_(a, b)
    }.bind(this))
};
shaka.dash.DashParser.prototype.processManifest_ = function (a, b) {
    var c = shaka.util.Functional, d = shaka.util.XmlUtils, e = shaka.util.ManifestParserUtils, f = [b],
        c = d.findChildren(a, "Location").map(d.getContents).filter(c.isNotNull);
    0 < c.length && (f = this.manifestUris_ = c);
    var c = d.findChildren(a, "BaseURL").map(d.getContents), e = e.resolveUris(f, c),
        g = d.parseAttr(a, "minBufferTime", d.parseDuration);
    this.updatePeriod_ = d.parseAttr(a, "minimumUpdatePeriod", d.parseDuration, -1);
    var h = d.parseAttr(a, "availabilityStartTime",
        d.parseDate), f = d.parseAttr(a, "timeShiftBufferDepth", d.parseDuration),
        k = d.parseAttr(a, "suggestedPresentationDelay", d.parseDuration),
        c = d.parseAttr(a, "maxSegmentDuration", d.parseDuration), l = a.getAttribute("type") || "static";
    if (this.manifest_) var m = this.manifest_.presentationTimeline; else {
        var n = Math.max(shaka.dash.DashParser.DEFAULT_SUGGESTED_PRESENTATION_DELAY_, 1.5 * g);
        m = new shaka.media.PresentationTimeline(h, null != k ? k : n)
    }
    var h = this.parsePeriods_({
        dynamic: "static" != l, presentationTimeline: m, period: null,
        periodInfo: null, adaptationSet: null, representation: null, bandwidth: 0, indexRangeWarningGiven: !1
    }, e, a), k = h.duration, p = h.periods;
    m.setStatic("static" == l);
    "static" != l && h.durationDerivedFromPeriods || m.setDuration(k || Infinity);
    m.setSegmentAvailabilityDuration(null != f ? f : Infinity);
    m.notifyMaxSegmentDuration(c || 1);
    goog.DEBUG && m.assertIsValid();
    if (this.manifest_) return Promise.resolve();
    d = d.findChildren(a, "UTCTiming");
    f = m.isLive();
    return this.parseUtcTiming_(e, d, f).then(function (a) {
        this.playerInterface_ && (m.setClockOffset(a),
            this.manifest_ = {presentationTimeline: m, periods: p, offlineSessionIds: [], minBufferTime: g || 0})
    }.bind(this))
};
shaka.dash.DashParser.prototype.parsePeriods_ = function (a, b, c) {
    var d = shaka.util.XmlUtils, e = d.parseAttr(c, "mediaPresentationDuration", d.parseDuration), f = [], g = 0;
    c = d.findChildren(c, "Period");
    for (var h = 0; h < c.length; h++) {
        var k = c[h], g = d.parseAttr(k, "start", d.parseDuration, g), l = d.parseAttr(k, "duration", d.parseDuration),
            m = null;
        if (h != c.length - 1) {
            var n = d.parseAttr(c[h + 1], "start", d.parseDuration);
            null != n && (m = n - g)
        } else null != e && (m = e - g);
        n = shaka.util.ManifestParserUtils.GAP_OVERLAP_TOLERANCE_SECONDS;
        m && l && Math.abs(m -
            l) > n && shaka.log.warning("There is a gap/overlap between Periods", k);
        null == m && (m = l);
        k = this.parsePeriod_(a, b, {start: g, duration: m, node: k, isLastPeriod: null == m || h == c.length - 1});
        f.push(k);
        l = a.period.id;
        -1 == this.periodIds_.indexOf(l) && (this.periodIds_.push(l), this.manifest_ && (this.playerInterface_.filterNewPeriod(k), this.manifest_.periods.push(k)));
        if (null == m) {
            h != c.length - 1 && shaka.log.warning("Skipping Period", h + 1, "and any subsequent Periods:", "Period", h + 1, "does not have a valid start time.", f[h + 1]);
            g = null;
            break
        }
        g += m
    }
    null == this.manifest_ && this.playerInterface_.filterAllPeriods(f);
    return null != e ? (g != e && shaka.log.warning("@mediaPresentationDuration does not match the total duration of all", "Periods."), {
        periods: f,
        duration: e,
        durationDerivedFromPeriods: !1
    }) : {periods: f, duration: g, durationDerivedFromPeriods: !0}
};
shaka.dash.DashParser.prototype.parsePeriod_ = function (a, b, c) {
    var d = shaka.util.Functional, e = shaka.util.XmlUtils, f = shaka.util.ManifestParserUtils.ContentType;
    a.period = this.createFrame_(c.node, null, b);
    a.periodInfo = c;
    a.period.id || (shaka.log.info("No Period ID given for Period with start time " + c.start + ",  Assigning a default"), a.period.id = "__shaka_period_" + c.start);
    e.findChildren(c.node, "EventStream").forEach(this.parseEventStream_.bind(this, c.start, c.duration));
    b = e.findChildren(c.node, "AdaptationSet").map(this.parseAdaptationSet_.bind(this,
        a)).filter(d.isNotNull);
    e = b.map(function (a) {
        return a.representationIds
    }).reduce(d.collapseArrays, []);
    d = e.filter(d.isNotDuplicate);
    if (a.dynamic && e.length != d.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_DUPLICATE_REPRESENTATION_ID);
    var g = b.filter(function (a) {
        return !a.trickModeFor
    });
    b.filter(function (a) {
        return a.trickModeFor
    }).forEach(function (a) {
        var b = a.streams[0], c = a.trickModeFor;
        g.forEach(function (a) {
            a.id == c && a.streams.forEach(function (a) {
                a.trickModeVideo =
                    b
            })
        })
    });
    b = this.getSetsOfType_(g, f.VIDEO);
    e = this.getSetsOfType_(g, f.AUDIO);
    if (!b.length && !e.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_EMPTY_PERIOD);
    e.length || (e = [null]);
    b.length || (b = [null]);
    a = [];
    for (d = 0; d < e.length; d++) for (var h = 0; h < b.length; h++) this.createVariants_(e[d], b[h], a);
    f = this.getSetsOfType_(g, f.TEXT);
    b = [];
    for (d = 0; d < f.length; d++) b.push.apply(b, f[d].streams);
    return {startTime: c.start, textStreams: b, variants: a}
};
shaka.dash.DashParser.prototype.getSetsOfType_ = function (a, b) {
    return a.filter(function (a) {
        return a.contentType == b
    })
};
shaka.dash.DashParser.prototype.createVariants_ = function (a, b, c) {
    var d = shaka.util.ManifestParserUtils.ContentType;
    goog.asserts.assert(!a || a.contentType == d.AUDIO, "Audio parameter mismatch!");
    goog.asserts.assert(!b || b.contentType == d.VIDEO, "Video parameter mismatch!");
    if (a || b) if (a && b) {
        if (d = shaka.media.DrmEngine, d.areDrmCompatible(a.drmInfos, b.drmInfos)) for (var e = d.getCommonDrmInfos(a.drmInfos, b.drmInfos), d = 0; d < a.streams.length; d++) for (var f = 0; f < b.streams.length; f++) {
            var g = (b.streams[f].bandwidth || 0) +
                (a.streams[d].bandwidth || 0);
            g = {
                id: this.globalId_++,
                language: a.language,
                primary: a.main || b.main,
                audio: a.streams[d],
                video: b.streams[f],
                bandwidth: g,
                drmInfos: e,
                allowedByApplication: !0,
                allowedByKeySystem: !0
            };
            c.push(g)
        }
    } else for (e = a || b, d = 0; d < e.streams.length; d++) g = e.streams[d].bandwidth || 0, g = {
        id: this.globalId_++,
        language: e.language || "und",
        primary: e.main,
        audio: a ? e.streams[d] : null,
        video: b ? e.streams[d] : null,
        bandwidth: g,
        drmInfos: e.drmInfos,
        allowedByApplication: !0,
        allowedByKeySystem: !0
    }, c.push(g)
};
shaka.dash.DashParser.prototype.parseAdaptationSet_ = function (a, b) {
    var c = shaka.util.XmlUtils, d = shaka.util.Functional, e = shaka.util.ManifestParserUtils, f = e.ContentType;
    a.adaptationSet = this.createFrame_(b, a.period, null);
    var g = !1, h = c.findChildren(b, "Role"), d = h.map(function (a) {
        return a.getAttribute("value")
    }).filter(d.isNotNull), k = void 0;
    a.adaptationSet.contentType == e.ContentType.TEXT && (k = e.TextStreamKind.SUBTITLE);
    for (e = 0; e < h.length; e++) {
        var l = h[e].getAttribute("schemeIdUri");
        if (null == l || "urn:mpeg:dash:role:2011" ==
            l) switch (l = h[e].getAttribute("value"), l) {
            case "main":
                g = !0;
                break;
            case "caption":
            case "subtitle":
                k = l
        }
    }
    var m = null, n = !1;
    c.findChildren(b, "EssentialProperty").forEach(function (a) {
        "http://dashif.org/guidelines/trickmode" == a.getAttribute("schemeIdUri") ? m = a.getAttribute("value") : n = !0
    });
    if (n) return null;
    var h = c.findChildren(b, "ContentProtection"),
        p = shaka.dash.ContentProtection.parseFromAdaptationSet(h, this.config_.dash.customScheme, this.config_.dash.ignoreDrmInfo),
        h = shaka.util.LanguageUtils.normalize(b.getAttribute("lang") ||
            "und"), e = b.getAttribute("label"), c = c.findChildren(b, "Representation"),
        d = c.map(this.parseRepresentation_.bind(this, a, p, k, h, e, g, d)).filter(function (a) {
            return !!a
        });
    if (0 == d.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_EMPTY_ADAPTATION_SET);
    a.adaptationSet.contentType && a.adaptationSet.contentType != f.APPLICATION || (a.adaptationSet.contentType = shaka.dash.DashParser.guessContentType_(d[0].mimeType, d[0].codecs), d.forEach(function (b) {
        b.type =
            a.adaptationSet.contentType
    }));
    d.forEach(function (a) {
        p.drmInfos.forEach(function (b) {
            a.keyId && b.keyIds.push(a.keyId)
        })
    });
    f = c.map(function (a) {
        return a.getAttribute("id")
    }).filter(shaka.util.Functional.isNotNull);
    return {
        id: a.adaptationSet.id || "__fake__" + this.globalId_++,
        contentType: a.adaptationSet.contentType,
        language: h,
        main: g,
        streams: d,
        drmInfos: p.drmInfos,
        trickModeFor: m,
        representationIds: f
    }
};
shaka.dash.DashParser.prototype.parseRepresentation_ = function (a, b, c, d, e, f, g, h) {
    var k = shaka.util.XmlUtils, l = shaka.util.ManifestParserUtils.ContentType;
    a.representation = this.createFrame_(h, a.adaptationSet, null);
    if (!this.verifyRepresentation_(a.representation)) return shaka.log.warning("Skipping Representation", a.representation), null;
    a.bandwidth = k.parseAttr(h, "bandwidth", k.parsePositiveInt) || 0;
    var m = this.requestInitSegment_.bind(this);
    if (a.representation.segmentBase) l = shaka.dash.SegmentBase.createStream(a,
        m); else if (a.representation.segmentList) l = shaka.dash.SegmentList.createStream(a, this.segmentIndexMap_); else if (a.representation.segmentTemplate) l = shaka.dash.SegmentTemplate.createStream(a, m, this.segmentIndexMap_, !!this.manifest_); else {
        goog.asserts.assert(a.representation.contentType == l.TEXT || a.representation.contentType == l.APPLICATION, "Must have Segment* with non-text streams.");
        var n = a.representation.baseUris, p = a.periodInfo.duration || 0, l = {
            createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function (a) {
                return 0 <=
                a && a < p ? 1 : null
            }, getSegmentReference: function (a) {
                return 1 != a ? null : new shaka.media.SegmentReference(1, 0, p, function () {
                    return n
                }, 0, null)
            }, initSegmentReference: null, scaledPresentationTimeOffset: 0
        }
    }
    h = k.findChildren(h, "ContentProtection");
    h = shaka.dash.ContentProtection.parseFromRepresentation(h, this.config_.dash.customScheme, b, this.config_.dash.ignoreDrmInfo);
    return {
        id: this.globalId_++,
        createSegmentIndex: l.createSegmentIndex,
        findSegmentPosition: l.findSegmentPosition,
        getSegmentReference: l.getSegmentReference,
        initSegmentReference: l.initSegmentReference,
        presentationTimeOffset: l.scaledPresentationTimeOffset,
        mimeType: a.representation.mimeType,
        codecs: a.representation.codecs,
        frameRate: a.representation.frameRate,
        bandwidth: a.bandwidth,
        width: a.representation.width,
        height: a.representation.height,
        kind: c,
        encrypted: 0 < b.drmInfos.length,
        keyId: h,
        language: d,
        label: e,
        type: a.adaptationSet.contentType,
        primary: f,
        trickModeVideo: null,
        containsEmsgBoxes: a.representation.containsEmsgBoxes,
        roles: g,
        channelsCount: a.representation.numChannels
    }
};
shaka.dash.DashParser.prototype.onUpdate_ = function () {
    goog.asserts.assert(this.updateTimer_, "Should only be called by timer");
    goog.asserts.assert(0 <= this.updatePeriod_, "There should be an update period");
    shaka.log.info("Updating manifest...");
    this.updateTimer_ = null;
    var a = Date.now();
    this.requestManifest_().then(function () {
        if (this.playerInterface_) {
            var b = Date.now();
            this.setUpdateTimer_((b - a) / 1E3)
        }
    }.bind(this))["catch"](function (a) {
        goog.asserts.assert(a instanceof shaka.util.Error, "Should only receive a Shaka error");
        this.playerInterface_ && (a.severity = shaka.util.Error.Severity.RECOVERABLE, this.playerInterface_.onError(a), this.setUpdateTimer_(0))
    }.bind(this))
};
shaka.dash.DashParser.prototype.setUpdateTimer_ = function (a) {
    if (!(0 > this.updatePeriod_)) {
        goog.asserts.assert(null == this.updateTimer_, "Timer should not be already set");
        a = Math.max(Math.max(shaka.dash.DashParser.MIN_UPDATE_PERIOD_, this.updatePeriod_) - a, 0);
        shaka.log.debug("updateInterval", a);
        var b = this.onUpdate_.bind(this);
        this.updateTimer_ = window.setTimeout(b, 1E3 * a)
    }
};
shaka.dash.DashParser.prototype.createFrame_ = function (a, b, c) {
    goog.asserts.assert(b || c, "Must provide either parent or baseUris");
    var d = shaka.util.ManifestParserUtils, e = shaka.util.XmlUtils;
    b = b || {contentType: "", mimeType: "", codecs: "", containsEmsgBoxes: !1, frameRate: void 0, numChannels: null};
    c = c || b.baseUris;
    var f = e.parseNonNegativeInt, g = e.evalDivision, h = e.findChildren(a, "BaseURL").map(e.getContents),
        k = a.getAttribute("contentType") || b.contentType, l = a.getAttribute("mimeType") || b.mimeType,
        m = a.getAttribute("codecs") ||
            b.codecs, g = e.parseAttr(a, "frameRate", g) || b.frameRate,
        n = !!e.findChildren(a, "InbandEventStream").length, p = e.findChildren(a, "AudioChannelConfiguration"),
        p = this.parseAudioChannels_(p) || b.numChannels;
    k || (k = shaka.dash.DashParser.guessContentType_(l, m));
    return {
        baseUris: d.resolveUris(c, h),
        segmentBase: e.findChild(a, "SegmentBase") || b.segmentBase,
        segmentList: e.findChild(a, "SegmentList") || b.segmentList,
        segmentTemplate: e.findChild(a, "SegmentTemplate") || b.segmentTemplate,
        width: e.parseAttr(a, "width", f) || b.width,
        height: e.parseAttr(a, "height", f) || b.height,
        contentType: k,
        mimeType: l,
        codecs: m,
        frameRate: g,
        containsEmsgBoxes: n || b.containsEmsgBoxes,
        id: a.getAttribute("id"),
        numChannels: p
    }
};
shaka.dash.DashParser.prototype.parseAudioChannels_ = function (a) {
    for (var b = 0; b < a.length; ++b) {
        var c = a[b], d = c.getAttribute("schemeIdUri");
        if (d && (c = c.getAttribute("value"))) switch (d) {
            case "urn:mpeg:dash:outputChannelPositionList:2012":
                return c.trim().split(/ +/).length;
            case "urn:mpeg:dash:23003:3:audio_channel_configuration:2011":
            case "urn:dts:dash:audio_channel_configuration:2012":
                var e = parseInt(c, 10);
                if (!e) {
                    shaka.log.warning("Channel parsing failure! Ignoring scheme and value", d, c);
                    continue
                }
                return e;
            case "tag:dolby.com,2014:dash:audio_channel_configuration:2011":
            case "urn:dolby:dash:audio_channel_configuration:2011":
                e = parseInt(c, 16);
                if (!e) {
                    shaka.log.warning("Channel parsing failure! Ignoring scheme and value", d, c);
                    continue
                }
                for (a = 0; e;) e & 1 && ++a, e >>= 1;
                return a;
            default:
                shaka.log.warning("Unrecognized audio channel scheme:", d, c)
        }
    }
    return null
};
shaka.dash.DashParser.prototype.verifyRepresentation_ = function (a) {
    var b = shaka.util.ManifestParserUtils.ContentType;
    var c = 0 + (a.segmentBase ? 1 : 0);
    c += a.segmentList ? 1 : 0;
    c += a.segmentTemplate ? 1 : 0;
    if (0 == c) {
        if (a.contentType == b.TEXT || a.contentType == b.APPLICATION) return !0;
        shaka.log.warning("Representation does not contain a segment information source:", "the Representation must contain one of SegmentBase, SegmentList,", 'SegmentTemplate, or explicitly indicate that it is "text".', a);
        return !1
    }
    1 != c && (shaka.log.warning("Representation contains multiple segment information sources:",
        "the Representation should only contain one of SegmentBase,", "SegmentList, or SegmentTemplate.", a), a.segmentBase ? (shaka.log.info("Using SegmentBase by default."), a.segmentList = null) : (goog.asserts.assert(a.segmentList, "There should be a SegmentList"), shaka.log.info("Using SegmentList by default.")), a.segmentTemplate = null);
    return !0
};
shaka.dash.DashParser.prototype.requestForTiming_ = function (a, b, c) {
    a = shaka.util.ManifestParserUtils.resolveUris(a, [b]);
    a = shaka.net.NetworkingEngine.makeRequest(a, this.config_.retryParameters);
    a.method = c;
    return this.playerInterface_.networkingEngine.request(shaka.net.NetworkingEngine.RequestType.MANIFEST, a).then(function (a) {
        if ("HEAD" == c) {
            if (!a.headers || !a.headers.date) return 0;
            a = a.headers.date
        } else a = shaka.util.StringUtils.fromUTF8(a.data);
        a = Date.parse(a);
        return isNaN(a) ? 0 : a - Date.now()
    })
};
shaka.dash.DashParser.prototype.parseUtcTiming_ = function (a, b, c) {
    b = b.map(function (a) {
        return {scheme: a.getAttribute("schemeIdUri"), value: a.getAttribute("value")}
    });
    var d = this.config_.dash.clockSyncUri;
    c && !b.length && d && b.push({scheme: "urn:mpeg:dash:utc:http-head:2014", value: d});
    return shaka.util.Functional.createFallbackPromiseChain(b, function (b) {
        var c = b.scheme;
        b = b.value;
        switch (c) {
            case "urn:mpeg:dash:utc:http-head:2014":
            case "urn:mpeg:dash:utc:http-head:2012":
                return this.requestForTiming_(a, b, "HEAD");
            case "urn:mpeg:dash:utc:http-xsdate:2014":
            case "urn:mpeg:dash:utc:http-iso:2014":
            case "urn:mpeg:dash:utc:http-xsdate:2012":
            case "urn:mpeg:dash:utc:http-iso:2012":
                return this.requestForTiming_(a, b, "GET");
            case "urn:mpeg:dash:utc:direct:2014":
            case "urn:mpeg:dash:utc:direct:2012":
                return c = Date.parse(b), isNaN(c) ? 0 : c - Date.now();
            case "urn:mpeg:dash:utc:http-ntp:2014":
            case "urn:mpeg:dash:utc:ntp:2014":
            case "urn:mpeg:dash:utc:sntp:2014":
                return shaka.log.warning("NTP UTCTiming scheme is not supported"), Promise.reject();
            default:
                return shaka.log.warning("Unrecognized scheme in UTCTiming element", c), Promise.reject()
        }
    }.bind(this))["catch"](function () {
        c && shaka.log.warning("A UTCTiming element should always be given in live manifests! This content may not play on clients with bad clocks!");
        return 0
    })
};
shaka.dash.DashParser.prototype.parseEventStream_ = function (a, b, c) {
    var d = shaka.util.XmlUtils, e = d.parseNonNegativeInt, f = c.getAttribute("schemeIdUri") || "",
        g = c.getAttribute("value") || "", h = d.parseAttr(c, "timescale", e) || 1;
    d.findChildren(c, "Event").forEach(function (c) {
        var k = d.parseAttr(c, "presentationTime", e) || 0, m = d.parseAttr(c, "duration", e) || 0, k = k / h + a,
            m = k + m / h;
        null != b && (k = Math.min(k, a + b), m = Math.min(m, a + b));
        c = {schemeIdUri: f, value: g, startTime: k, endTime: m, id: c.getAttribute("id") || "", eventElement: c};
        this.playerInterface_.onTimelineRegionAdded(c)
    }.bind(this))
};
shaka.dash.DashParser.prototype.requestInitSegment_ = function (a, b, c) {
    var d = shaka.net.NetworkingEngine.RequestType.SEGMENT;
    a = shaka.net.NetworkingEngine.makeRequest(a, this.config_.retryParameters);
    null != b && (a.headers.Range = "bytes=" + b + "-" + (null != c ? c : ""));
    return this.playerInterface_.networkingEngine.request(d, a).then(function (a) {
        return a.data
    })
};
shaka.dash.DashParser.guessContentType_ = function (a, b) {
    var c = shaka.util.MimeUtils.getFullType(a, b);
    return shaka.text.TextEngine.isTypeSupported(c) ? shaka.util.ManifestParserUtils.ContentType.TEXT : a.split("/")[0]
};
shaka.media.ManifestParser.registerParserByExtension("mpd", shaka.dash.DashParser);
shaka.media.ManifestParser.registerParserByMime("application/dash+xml", shaka.dash.DashParser);
shaka.hls = {};
shaka.hls.Playlist = function (a, b, c, d) {
    this.uri = a;
    this.type = b;
    this.tags = c;
    this.segments = d || null
};
shaka.hls.PlaylistType = {MASTER: 0, MEDIA: 1};
shaka.hls.Tag = function (a, b, c, d) {
    goog.asserts.assert(0 == c.length && d || 0 < c.length && !d || 0 == c.length && !d, "Tags can only take the form (1) <NAME>:<VALUE> (2) <NAME>:<ATTRIBUTE_LIST>  (3) <NAME>");
    this.id = a;
    this.name = b;
    this.attributes = c;
    this.value = d || null
};
shaka.hls.Tag.prototype.toString = function () {
    var a = function (a) {
        return a.name + '="' + a.value + '"'
    };
    return this.value ? "#" + this.name + ":" + this.value : 0 < this.attributes.length ? "#" + this.name + ":" + this.attributes.map(a).join(",") : "#" + this.name
};
shaka.hls.Attribute = function (a, b) {
    this.name = a;
    this.value = b
};
shaka.hls.Tag.prototype.addAttribute = function (a) {
    this.attributes.push(a)
};
shaka.hls.Tag.prototype.getAttribute = function (a) {
    var b = this.attributes.filter(function (b) {
        return b.name == a
    });
    goog.asserts.assert(2 > b.length, "A tag should not have multiple attributes with the same name!");
    return b.length ? b[0] : null
};
shaka.hls.Tag.prototype.getAttributeValue = function (a, b) {
    var c = b || null, d = this.getAttribute(a);
    return d ? d.value : c
};
shaka.hls.Segment = function (a, b) {
    this.tags = b;
    this.uri = a
};
shaka.hls.Utils = {};
shaka.hls.Utils.filterTagsByName = function (a, b) {
    return a.filter(function (a) {
        return a.name == b
    })
};
shaka.hls.Utils.getFirstTagWithName = function (a, b) {
    var c = shaka.hls.Utils.filterTagsByName(a, b);
    return c.length ? c[0] : null
};
shaka.hls.Utils.findMediaTags = function (a, b, c) {
    return a.filter(function (a) {
        var d = a.getAttribute("TYPE");
        a = a.getAttribute("GROUP-ID");
        return d.value == b && a.value == c
    })
};
shaka.hls.Utils.constructAbsoluteUri = function (a, b) {
    return shaka.util.ManifestParserUtils.resolveUris([a], [b])[0]
};
shaka.hls.Utils.isComment = function (a) {
    return /^#(?!EXT)/m.test(a)
};
shaka.util.TextParser = function (a) {
    this.data_ = a;
    this.position_ = 0
};
shaka.util.TextParser.prototype.atEnd = function () {
    return this.position_ == this.data_.length
};
shaka.util.TextParser.prototype.readLine = function () {
    return this.readRegexReturnCapture_(/(.*?)(\n|$)/gm, 1)
};
shaka.util.TextParser.prototype.readWord = function () {
    return this.readRegexReturnCapture_(/[^ \t\n]*/gm, 0)
};
shaka.util.TextParser.prototype.skipWhitespace = function () {
    this.readRegex(/[ \t]+/gm)
};
shaka.util.TextParser.prototype.readRegex = function (a) {
    a = this.indexOf_(a);
    if (this.atEnd() || null == a || a.position != this.position_) return null;
    this.position_ += a.length;
    return a.results
};
shaka.util.TextParser.prototype.readRegexReturnCapture_ = function (a, b) {
    if (this.atEnd()) return null;
    var c = this.readRegex(a);
    return c ? c[b] : null
};
shaka.util.TextParser.prototype.indexOf_ = function (a) {
    goog.asserts.assert(a.global, "global flag should be set");
    a.lastIndex = this.position_;
    a = a.exec(this.data_);
    return null == a ? null : {position: a.index, length: a[0].length, results: a}
};
shaka.hls.ManifestTextParser = function () {
    this.globalId_ = 0
};
shaka.hls.ManifestTextParser.prototype.parsePlaylist = function (a, b) {
    var c = shaka.util.StringUtils.fromUTF8(a), c = c.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n").trim(), d = c.split(/\n+/m);
    if (!/^#EXTM3U($|[ \t\n])/m.test(d[0])) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_PLAYLIST_HEADER_MISSING);
    for (var c = shaka.hls.PlaylistType.MASTER, e = [], f = 1; f < d.length;) if (shaka.hls.Utils.isComment(d[f])) f += 1; else {
        var g = this.parseTag_(d[f]);
        if (0 <= shaka.hls.ManifestTextParser.MEDIA_PLAYLIST_TAGS.indexOf(g.name)) c =
            shaka.hls.PlaylistType.MEDIA; else if (0 <= shaka.hls.ManifestTextParser.SEGMENT_TAGS.indexOf(g.name)) {
            if (c != shaka.hls.PlaylistType.MEDIA) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_INVALID_PLAYLIST_HIERARCHY);
            d = d.splice(f, d.length - f);
            d = this.parseSegments_(d, e);
            return new shaka.hls.Playlist(b, c, e, d)
        }
        e.push(g);
        f += 1;
        if ("EXT-X-STREAM-INF" == g.name) {
            var h = new shaka.hls.Attribute("URI", d[f]);
            g.addAttribute(h);
            f += 1
        }
    }
    return new shaka.hls.Playlist(b,
        c, e)
};
shaka.hls.ManifestTextParser.prototype.parseSegments_ = function (a, b) {
    var c = [], d = [];
    a.forEach(function (a) {
        /^(#EXT)/.test(a) ? (a = this.parseTag_(a), 0 <= shaka.hls.ManifestTextParser.MEDIA_PLAYLIST_TAGS.indexOf(a.name) ? b.push(a) : d.push(a)) : shaka.hls.Utils.isComment(a) || (a = a.trim(), a = new shaka.hls.Segment(a, d), c.push(a), d = [])
    }.bind(this));
    return c
};
shaka.hls.ManifestTextParser.prototype.parseTag_ = function (a) {
    return shaka.hls.ManifestTextParser.parseTag(this.globalId_++, a)
};
shaka.hls.ManifestTextParser.parseTag = function (a, b) {
    var c = b.match(/^#(EXT[^:]*)(?::(.*))?$/);
    if (!c) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.INVALID_HLS_TAG);
    var d = c[1], e = c[2], c = [];
    if (e && 0 <= e.indexOf("=")) for (var e = new shaka.util.TextParser(e), f, g = /([^=]+)=(?:"([^"]*)"|([^",]*))(?:,|$)/g; f = e.readRegex(g);) f = new shaka.hls.Attribute(f[1], f[2] || f[3]), c.push(f); else if (e) return new shaka.hls.Tag(a, d, c, e);
    return new shaka.hls.Tag(a,
        d, c)
};
shaka.hls.ManifestTextParser.MEDIA_PLAYLIST_TAGS = "EXT-X-TARGETDURATION EXT-X-MEDIA-SEQUENCE EXT-X-DISCONTINUITY-SEQUENCE EXT-X-PLAYLIST-TYPE EXT-X-MAP EXT-X-I-FRAMES-ONLY EXT-X-ENDLIST".split(" ");
shaka.hls.ManifestTextParser.SEGMENT_TAGS = "EXTINF EXT-X-BYTERANGE EXT-X-DISCONTINUITY EXT-X-PROGRAM-DATE-TIME EXT-X-KEY EXT-X-DATERANGE".split(" ");
shaka.net.DataUriPlugin = function (a, b) {
    return new Promise(function (b, d) {
        var c = shaka.net.DataUriPlugin.parse(a);
        b({uri: a, data: c.data, headers: {"content-type": c.contentType}})
    })
};
goog.exportSymbol("shaka.net.DataUriPlugin", shaka.net.DataUriPlugin);
shaka.net.DataUriPlugin.parse = function (a) {
    var b = a.split(":");
    if (2 > b.length || "data" != b[0]) throw shaka.log.error("Bad data URI, failed to parse scheme"), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.MALFORMED_DATA_URI, a);
    b = b.slice(1).join(":").split(",");
    if (2 > b.length) throw shaka.log.error("Bad data URI, failed to extract encoding and MIME type"), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.NETWORK,
        shaka.util.Error.Code.MALFORMED_DATA_URI, a);
    var c = b[0], b = window.decodeURIComponent(b.slice(1).join(",")), c = c.split(";"), d = null;
    1 < c.length && (d = c[1]);
    if ("base64" == d) a = shaka.util.Uint8ArrayUtils.fromBase64(b).buffer; else {
        if (d) throw shaka.log.error("Bad data URI, unknown encoding"), new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.UNKNOWN_DATA_URI_ENCODING, a);
        a = shaka.util.StringUtils.toUTF8(b)
    }
    return {data: a, contentType: c[0]}
};
shaka.net.NetworkingEngine.registerScheme("data", shaka.net.DataUriPlugin);
shaka.hls.HlsParser = function () {
    this.config_ = this.playerInterface_ = null;
    this.globalId_ = 1;
    this.mediaTagsToStreamInfosMap_ = {};
    this.urisToVariantsMap_ = {};
    this.streamsToIndexMap_ = {};
    this.uriToStreamInfosMap_ = {};
    this.presentationTimeline_ = null;
    this.manifestUri_ = "";
    this.manifestTextParser_ = new shaka.hls.ManifestTextParser;
    this.updateTimer_ = this.updatePeriod_ = null;
    this.isLive_ = !1;
    this.manifest_ = null;
    this.maxTargetDuration_ = 0
};
goog.exportSymbol("shaka.hls.HlsParser", shaka.hls.HlsParser);
shaka.hls.HlsParser.prototype.configure = function (a) {
    this.config_ = a
};
shaka.hls.HlsParser.prototype.start = function (a, b) {
    goog.asserts.assert(this.config_, "Must call configure() before start()!");
    this.playerInterface_ = b;
    this.manifestUri_ = a;
    return this.requestManifest_(a).then(function (b) {
        return this.parseManifest_(b.data, a).then(function () {
            this.setUpdateTimer_(this.updatePeriod_);
            return this.manifest_
        }.bind(this))
    }.bind(this))
};
shaka.hls.HlsParser.prototype.stop = function () {
    this.config_ = this.playerInterface_ = null;
    this.mediaTagsToStreamInfosMap_ = {};
    this.urisToVariantsMap_ = {};
    this.manifest_ = null;
    return Promise.resolve()
};
shaka.hls.HlsParser.prototype.update = function () {
    if (this.isLive_) {
        for (var a = [], b = Object.keys(this.uriToStreamInfosMap_), c = 0; c < b.length; c++) {
            var d = b[c];
            a.push(this.updateStream_(this.uriToStreamInfosMap_[d], d))
        }
        return Promise.all(a)
    }
};
shaka.hls.HlsParser.prototype.updateStream_ = function (a, b) {
    this.requestManifest_(b).then(function (b) {
        var c = shaka.hls.Utils;
        b = this.manifestTextParser_.parsePlaylist(b.data, b.uri);
        if (b.type != shaka.hls.PlaylistType.MEDIA) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_INVALID_PLAYLIST_HIERARCHY);
        var e = c.getFirstTagWithName(b.tags, "EXT-X-MEDIA-SEQUENCE"),
            e = this.createSegments_(b, e ? Number(e.value) : 0), e = this.adjustSegments_(e, a.lastSegmentSeen);
        a.segmentIndex.merge(e);
        e.length && (a.lastSegmentSeen = e[e.length - 1]);
        c.getFirstTagWithName(b.tags, "EXT-X-ENDLIST") && (goog.asserts.assert(null != a.lastSegmentSeen, "Should not be null!"), c = a.lastSegmentSeen.endTime, this.setLive_(!1), this.presentationTimeline_.setDuration(c))
    }.bind(this))
};
shaka.hls.HlsParser.prototype.adjustSegments_ = function (a, b) {
    for (var c = [], d = b.endTime, e = 0; e < a.length; e++) {
        var f = a[e];
        if (f.position > b.position) {
            var g = f.endTime - f.startTime, h = d, k = d + g, d = d + g,
                f = new shaka.media.SegmentReference(f.position, h, k, f.getUris, f.startByte, f.endByte);
            c.push(f)
        }
    }
    return c
};
shaka.hls.HlsParser.prototype.onExpirationUpdated = function (a, b) {
};
shaka.hls.HlsParser.prototype.parseManifest_ = function (a, b) {
    var c = this.manifestTextParser_.parsePlaylist(a, b);
    if (c.type != shaka.hls.PlaylistType.MASTER) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_MASTER_PLAYLIST_NOT_PROVIDED);
    return this.createPeriod_(c).then(function (a) {
        this.playerInterface_.filterAllPeriods([a]);
        this.isLive_ && this.presentationTimeline_.setDelay(3 * this.maxTargetDuration_);
        goog.asserts.assert(null != this.presentationTimeline_,
            "presentationTimeline should already be created!");
        this.manifest_ = {
            presentationTimeline: this.presentationTimeline_,
            periods: [a],
            offlineSessionIds: [],
            minBufferTime: 0
        }
    }.bind(this))
};
shaka.hls.HlsParser.prototype.createPeriod_ = function (a) {
    var b = shaka.hls.Utils, c = shaka.util.Functional, d = a.tags,
        e = b.filterTagsByName(a.tags, "EXT-X-MEDIA").filter(function (a) {
            return "SUBTITLES" == shaka.hls.HlsParser.getRequiredAttributeValue_(a, "TYPE")
        }.bind(this)).map(function (b) {
            return this.createTextStream_(b, a)
        }.bind(this));
    return Promise.all(e).then(function (e) {
        var f = b.filterTagsByName(d, "EXT-X-STREAM-INF").map(function (b) {
            return this.createVariantsForTag_(b, a)
        }.bind(this));
        return Promise.all(f).then(function (a) {
            a =
                a.reduce(c.collapseArrays, []);
            this.isLive_ || this.fitSegments_(a);
            return {startTime: 0, variants: a, textStreams: e}
        }.bind(this))
    }.bind(this))
};
shaka.hls.HlsParser.prototype.createVariantsForTag_ = function (a, b) {
    goog.asserts.assert("EXT-X-STREAM-INF" == a.name, "Should only be called on variant tags!");
    var c = shaka.util.ManifestParserUtils.ContentType, d = shaka.hls.HlsParser, e = shaka.hls.Utils,
        f = a.getAttributeValue("CODECS", "avc1.42E01E,mp4a.40.2").split(","), g = a.getAttribute("RESOLUTION"),
        h = null, k = null, l = a.getAttributeValue("FRAME-RATE"),
        m = Number(d.getRequiredAttributeValue_(a, "BANDWIDTH"));
    if (g) var n = g.value.split("x"), h = n[0], k = n[1];
    var p = this.getTimeOffset_(b),
        n = e.filterTagsByName(b.tags, "EXT-X-MEDIA"), r = a.getAttributeValue("AUDIO"),
        q = a.getAttributeValue("VIDEO");
    goog.asserts.assert(null == r || null == q, "Unexpected: both video and audio described by media tags!");
    r ? n = e.findMediaTags(n, "AUDIO", r) : q && (n = e.findMediaTags(n, "VIDEO", q));
    var t = this.guessCodecsSafe_(c.TEXT, f);
    if (t) {
        var w = a.getAttributeValue("SUBTITLES");
        w && (e = e.findMediaTags(n, "SUBTITLES", w), goog.asserts.assert(1 == e.length, "Exactly one text tag expected!"), e.length && (this.mediaTagsToStreamInfosMap_[e[0].id].stream.codecs =
            t));
        f.splice(f.indexOf(t), 1)
    }
    var e = n.map(function (a) {
        return this.createStreamInfoFromMediaTag_(a, f, p)
    }.bind(this)), u = [], v = [];
    return Promise.all(e).then(function (b) {
        r ? u = b : q && (v = b);
        shaka.log.debug("Guessing stream type for", a.toString());
        if (u.length || v.length) if (u.length) if (d.getRequiredAttributeValue_(a, "URI") == u[0].relativeUri) {
            shaka.log.debug("Guessing audio-only.");
            b = c.AUDIO;
            var e = !0
        } else shaka.log.debug("Guessing video."), b = c.VIDEO; else goog.asserts.assert(v.length, "No video streams!  This should have been handled already!"),
            shaka.log.debug("Guessing audio."), b = c.AUDIO; else e = !1, 1 == f.length ? (b = this.guessCodecsSafe_(c.VIDEO, f), g || l || b ? (shaka.log.debug("Guessing video-only."), b = c.VIDEO) : (shaka.log.debug("Guessing audio-only."), b = c.AUDIO)) : (shaka.log.debug("Guessing multiplexed audio+video."), b = c.VIDEO, f = [f.join(",")]);
        goog.asserts.assert(b, "Type should have been set by now!");
        return e ? Promise.resolve() : this.createStreamInfoFromVariantTag_(a, f, b, p)
    }.bind(this)).then(function (a) {
        a && (a.stream.type == c.AUDIO ? u = [a] : v = [a]);
        goog.asserts.assert(v ||
            u, "We should have created a stream!");
        return this.createVariants_(u, v, m, h, k, l)
    }.bind(this))
};
shaka.hls.HlsParser.prototype.createVariants_ = function (a, b, c, d, e, f) {
    var g = shaka.media.DrmEngine;
    b.forEach(function (a) {
        this.addVideoAttributes_(a.stream, d, e, f)
    }.bind(this));
    a.length || (a = [null]);
    b.length || (b = [null]);
    for (var h = [], k = 0; k < a.length; k++) for (var l = 0; l < b.length; l++) {
        var m = a[k] ? a[k].stream : null, n = b[l] ? b[l].stream : null, p = a[k] ? a[k].drmInfos : null,
            r = b[l] ? b[l].drmInfos : null;
        if (m && n) if (g.areDrmCompatible(p, r)) var q = g.getCommonDrmInfos(p, r); else {
            shaka.log.warning("Incompatible DRM info in HLS variant.  Skipping.");
            continue
        } else m ? q = p : n && (q = r);
        p = (b[k] ? b[k].relativeUri : "") + " - " + (a[k] ? a[k].relativeUri : "");
        this.urisToVariantsMap_[p] ? shaka.log.debug("Skipping variant which only differs in text streams.") : (m = this.createVariant_(m, n, c, q), h.push(m), this.urisToVariantsMap_[p] = m)
    }
    return h
};
shaka.hls.HlsParser.prototype.createVariant_ = function (a, b, c, d) {
    var e = shaka.util.ManifestParserUtils.ContentType;
    goog.asserts.assert(!a || a.type == e.AUDIO, "Audio parameter mismatch!");
    goog.asserts.assert(!b || b.type == e.VIDEO, "Video parameter mismatch!");
    return {
        id: this.globalId_++,
        language: a ? a.language : "und",
        primary: !!a && a.primary || !!b && b.primary,
        audio: a,
        video: b,
        bandwidth: c,
        drmInfos: d,
        allowedByApplication: !0,
        allowedByKeySystem: !0
    }
};
shaka.hls.HlsParser.prototype.createTextStream_ = function (a, b) {
    goog.asserts.assert("EXT-X-MEDIA" == a.name, "Should only be called on media tags!");
    var c = shaka.hls.HlsParser.getRequiredAttributeValue_(a, "TYPE");
    goog.asserts.assert("SUBTITLES" == c, 'Should only be called on tags with TYPE="SUBTITLES"!');
    c = this.getTimeOffset_(b);
    return this.createStreamInfoFromMediaTag_(a, [], c).then(function (a) {
        return a.stream
    })
};
shaka.hls.HlsParser.prototype.createStreamInfoFromMediaTag_ = function (a, b, c) {
    goog.asserts.assert("EXT-X-MEDIA" == a.name, "Should only be called on media tags!");
    if (this.mediaTagsToStreamInfosMap_[a.id]) return Promise.resolve().then(function () {
        return this.mediaTagsToStreamInfosMap_[a.id]
    }.bind(this));
    var d = shaka.hls.HlsParser, e = d.getRequiredAttributeValue_(a, "TYPE").toLowerCase(),
        f = shaka.util.ManifestParserUtils.ContentType;
    "subtitles" == e && (e = f.TEXT);
    var f = shaka.util.LanguageUtils.normalize(a.getAttributeValue("LANGUAGE",
        "und")), g = a.getAttributeValue("NAME"), h = a.getAttribute("DEFAULT"), k = a.getAttribute("AUTOSELECT"),
        l = a.getAttributeValue("CHANNELS"), l = "audio" == e ? this.getChannelsCount_(l) : null,
        m = d.getRequiredAttributeValue_(a, "URI"), m = shaka.hls.Utils.constructAbsoluteUri(this.manifestUri_, m);
    return this.createStreamInfo_(m, b, e, c, f, !!h || !!k, g, l).then(function (b) {
        this.mediaTagsToStreamInfosMap_[a.id] = b;
        return this.uriToStreamInfosMap_[m] = b
    }.bind(this))
};
shaka.hls.HlsParser.prototype.getChannelsCount_ = function (a) {
    if (!a) return null;
    a = a.split("/")[0];
    return parseInt(a, 10)
};
shaka.hls.HlsParser.prototype.createStreamInfoFromVariantTag_ = function (a, b, c, d) {
    goog.asserts.assert("EXT-X-STREAM-INF" == a.name, "Should only be called on media tags!");
    var e = shaka.hls.HlsParser.getRequiredAttributeValue_(a, "URI"),
        e = shaka.hls.Utils.constructAbsoluteUri(this.manifestUri_, e);
    return this.createStreamInfo_(e, b, c, d, "und", !1, null, null).then(function (a) {
        return this.uriToStreamInfosMap_[e] = a
    }.bind(this))
};
shaka.hls.HlsParser.prototype.createStreamInfo_ = function (a, b, c, d, e, f, g, h) {
    var k = shaka.hls.Utils, l = shaka.util.ManifestParserUtils.ContentType, m = shaka.hls.HlsParser, n = a;
    a = k.constructAbsoluteUri(this.manifestUri_, a);
    return this.requestManifest_(a).then(function (a) {
        a = this.manifestTextParser_.parsePlaylist(a.data, a.uri);
        if (a.type != shaka.hls.PlaylistType.MEDIA) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_INVALID_PLAYLIST_HIERARCHY);
        goog.asserts.assert(null != a.segments, "Media playlist should have segments!");
        var p = k.getFirstTagWithName(a.tags, "EXT-X-MEDIA-SEQUENCE"),
            q = this.createSegments_(a, p ? Number(p.value) : 0), t = new shaka.media.SegmentIndex(q);
        this.setPresentationType_(a);
        this.presentationTimeline_ || this.createPresentationTimeline_(q[q.length - 1].endTime);
        d = this.getTimeOffset_(a) || d;
        var w = null;
        c != l.TEXT && (w = this.createInitSegmentReference_(a));
        this.presentationTimeline_.notifySegments(0, q);
        if (!this.isLive_) {
            var p = q[q.length -
            1].endTime - q[0].startTime, u = this.presentationTimeline_.getDuration();
            (Infinity == u || u < p) && this.presentationTimeline_.setDuration(p)
        }
        var v = this.guessCodecs_(c, b), A = void 0, p = shaka.util.ManifestParserUtils;
        c == p.ContentType.TEXT && (A = p.TextStreamKind.SUBTITLE);
        var x = [];
        a.segments.forEach(function (a) {
            a = k.filterTagsByName(a.tags, "EXT-X-KEY");
            x.push.apply(x, a)
        });
        var y = !1, z = [], B = null;
        x.forEach(function (a) {
            if ("NONE" != m.getRequiredAttributeValue_(a, "METHOD")) {
                y = !0;
                var b = m.getRequiredAttributeValue_(a, "KEYFORMAT"),
                    c = shaka.hls.HlsParser.KEYFORMATS_TO_DRM_PARSERS_[b];
                (a = c ? c(a) : null) ? (a.keyIds.length && (B = a.keyIds[0]), z.push(a)) : shaka.log.warning("Unsupported HLS KEYFORMAT", b)
            }
        });
        if (y && !z.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_KEYFORMATS_NOT_SUPPORTED);
        return this.guessMimeType_(c, v, q[0].getUris()[0]).then(function (a) {
            a = {
                id: this.globalId_++,
                createSegmentIndex: Promise.resolve.bind(Promise),
                findSegmentPosition: t.find.bind(t),
                getSegmentReference: t.get.bind(t),
                initSegmentReference: w,
                presentationTimeOffset: d || 0,
                mimeType: a,
                codecs: v,
                kind: A,
                encrypted: y,
                keyId: B,
                language: e,
                label: g || null,
                type: c,
                primary: f,
                trickModeVideo: null,
                containsEmsgBoxes: !1,
                frameRate: void 0,
                width: void 0,
                height: void 0,
                bandwidth: void 0,
                roles: [],
                channelsCount: h
            };
            this.streamsToIndexMap_[a.id] = t;
            return {stream: a, segmentIndex: t, drmInfos: z, relativeUri: n, lastSegmentSeen: q[q.length - 1]}
        }.bind(this))
    }.bind(this))
};
shaka.hls.HlsParser.prototype.setPresentationType_ = function (a) {
    var b = shaka.hls.Utils, c = b.getFirstTagWithName(a.tags, "EXT-X-PLAYLIST-TYPE");
    if (b.getFirstTagWithName(a.tags, "EXT-X-ENDLIST") || c && "VOD" == c.value) this.setLive_(!1); else if (c) a = this.getRequiredTag_(a.tags, "EXT-X-TARGETDURATION"), a = Number(a.value), this.updatePeriod_ ? this.updatePeriod_ > a && (this.updatePeriod_ = a) : (this.setLive_(!0), this.updatePeriod_ = a), this.maxTargetDuration_ = Math.max(a, this.maxTargetDuration_); else throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
        shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_LIVE_CONTENT_NOT_SUPPORTED);
};
shaka.hls.HlsParser.prototype.createPresentationTimeline_ = function (a) {
    var b = null, c = 0;
    this.isLive_ && (b = Date.now() / 1E3 - a, c = 3 * this.maxTargetDuration_);
    this.presentationTimeline_ = new shaka.media.PresentationTimeline(b, c);
    this.presentationTimeline_.setStatic(!this.isLive_)
};
shaka.hls.HlsParser.prototype.createInitSegmentReference_ = function (a) {
    var b = shaka.hls.Utils, c = b.filterTagsByName(a.tags, "EXT-X-MAP");
    if (!c.length) return null;
    if (1 < c.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND);
    var c = c[0], d = shaka.hls.HlsParser.getRequiredAttributeValue_(c, "URI"), e = b.constructAbsoluteUri(a.uri, d);
    a = 0;
    b = null;
    if (c = c.getAttributeValue("BYTERANGE")) a = c.split("@"), c = Number(a[0]),
        a = Number(a[1]), b = a + c - 1;
    return new shaka.media.InitSegmentReference(function () {
        return [e]
    }, a, b)
};
shaka.hls.HlsParser.prototype.createSegments_ = function (a, b) {
    var c = a.segments, d = [];
    c.forEach(function (e) {
        var f = shaka.hls.Utils, g = e.tags, h = f.constructAbsoluteUri(a.uri, e.uri),
            k = this.getRequiredTag_(g, "EXTINF").value.split(","), l = Number(k[0]), k = c.indexOf(e);
        e = 0 == k ? 0 : d[k - 1].endTime;
        var l = e + l, m = 0, n = null;
        if (f = f.getFirstTagWithName(g, "EXT-X-BYTERANGE")) g = f.value.split("@"), f = Number(g[0]), m = g[1] ? Number(g[1]) : d[k - 1].endByte + 1, n = m + f - 1, k == c.length - 1 && (n = null);
        d.push(new shaka.media.SegmentReference(b + k, e, l,
            function () {
                return [h]
            }, m, n))
    }.bind(this));
    return d
};
shaka.hls.HlsParser.prototype.fitSegments_ = function (a) {
    a.forEach(function (a) {
        var b = this.presentationTimeline_.getDuration(), d = a.video;
        a = a.audio;
        d && this.streamsToIndexMap_[d.id] && this.streamsToIndexMap_[d.id].fit(b);
        a && this.streamsToIndexMap_[a.id] && this.streamsToIndexMap_[a.id].fit(b)
    }.bind(this))
};
shaka.hls.HlsParser.prototype.guessCodecsSafe_ = function (a, b) {
    for (var c = shaka.util.ManifestParserUtils.ContentType, d = shaka.hls.HlsParser.CODEC_REGEXPS_BY_CONTENT_TYPE_[a], e = 0; e < d.length; e++) for (var f = 0; f < b.length; f++) if (d[e].test(b[f].trim())) return b[f].trim();
    return a == c.TEXT ? "" : null
};
shaka.hls.HlsParser.prototype.guessCodecs_ = function (a, b) {
    if (1 == b.length) return b[0];
    var c = this.guessCodecsSafe_(a, b);
    if (null != c) return c;
    throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_COULD_NOT_GUESS_CODECS, b);
};
shaka.hls.HlsParser.prototype.guessMimeType_ = function (a, b, c) {
    var d = shaka.util.ManifestParserUtils.ContentType, e = shaka.hls.HlsParser, f = c.split("."), g = f[f.length - 1];
    if (e = e.EXTENSION_MAP_BY_CONTENT_TYPE_[a][g]) return Promise.resolve(e);
    if (a == d.TEXT) return b && "vtt" != b ? Promise.resolve("application/mp4") : Promise.resolve("text/vtt");
    a = shaka.net.NetworkingEngine.makeRequest([c], this.config_.retryParameters);
    a.method = "HEAD";
    return this.playerInterface_.networkingEngine.request(shaka.net.NetworkingEngine.RequestType.SEGMENT,
        a).then(function (a) {
        a = a.headers["content-type"];
        if (!a) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_COULD_NOT_GUESS_MIME_TYPE, g);
        return a.split(";")[0]
    })
};
shaka.hls.HlsParser.prototype.getTimeOffset_ = function (a) {
    return (a = shaka.hls.Utils.getFirstTagWithName(a.tags, "EXT-X-START")) ? Number(shaka.hls.HlsParser.getRequiredAttributeValue_(a, "TIME-OFFSET")) : this.config_.hls.defaultTimeOffset
};
shaka.hls.HlsParser.getRequiredAttributeValue_ = function (a, b) {
    var c = a.getAttribute(b);
    if (!c) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_REQUIRED_ATTRIBUTE_MISSING, b);
    return c.value
};
shaka.hls.HlsParser.prototype.getRequiredTag_ = function (a, b) {
    var c = shaka.hls.Utils.getFirstTagWithName(a, b);
    if (!c) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_REQUIRED_TAG_MISSING, b);
    return c
};
shaka.hls.HlsParser.prototype.addVideoAttributes_ = function (a, b, c, d) {
    a && (a.width = Number(b) || void 0, a.height = Number(c) || void 0, a.frameRate = Number(d) || void 0)
};
shaka.hls.HlsParser.prototype.requestManifest_ = function (a) {
    var b = shaka.net.NetworkingEngine.RequestType.MANIFEST;
    a = shaka.net.NetworkingEngine.makeRequest([a], this.config_.retryParameters);
    var c = this.playerInterface_.networkingEngine, d = function () {
        return !this.playerInterface_
    }.bind(this);
    return c.request(b, a, d)
};
shaka.hls.HlsParser.VIDEO_CODEC_REGEXPS_ = [/^avc/, /^hev/, /^hvc/, /^vp0?[89]/, /^av1$/];
shaka.hls.HlsParser.AUDIO_CODEC_REGEXPS_ = [/^vorbis$/, /^opus$/, /^flac$/, /^mp4a/, /^[ae]c-3$/];
shaka.hls.HlsParser.TEXT_CODEC_REGEXPS_ = [/^vtt$/, /^wvtt/, /^stpp/];
shaka.hls.HlsParser.CODEC_REGEXPS_BY_CONTENT_TYPE_ = {
    audio: shaka.hls.HlsParser.AUDIO_CODEC_REGEXPS_,
    video: shaka.hls.HlsParser.VIDEO_CODEC_REGEXPS_,
    text: shaka.hls.HlsParser.TEXT_CODEC_REGEXPS_
};
shaka.hls.HlsParser.AUDIO_EXTENSIONS_TO_MIME_TYPES_ = {
    mp4: "audio/mp4",
    m4s: "audio/mp4",
    m4i: "audio/mp4",
    m4a: "audio/mp4",
    ts: "video/mp2t"
};
shaka.hls.HlsParser.VIDEO_EXTENSIONS_TO_MIME_TYPES_ = {
    mp4: "video/mp4",
    m4s: "video/mp4",
    m4i: "video/mp4",
    m4v: "video/mp4",
    ts: "video/mp2t"
};
shaka.hls.HlsParser.TEXT_EXTENSIONS_TO_MIME_TYPES_ = {
    mp4: "application/mp4",
    m4s: "application/mp4",
    m4i: "application/mp4",
    vtt: "text/vtt",
    ttml: "application/ttml+xml"
};
shaka.hls.HlsParser.EXTENSION_MAP_BY_CONTENT_TYPE_ = {
    audio: shaka.hls.HlsParser.AUDIO_EXTENSIONS_TO_MIME_TYPES_,
    video: shaka.hls.HlsParser.VIDEO_EXTENSIONS_TO_MIME_TYPES_,
    text: shaka.hls.HlsParser.TEXT_EXTENSIONS_TO_MIME_TYPES_
};
shaka.hls.HlsParser.widevineDrmParser_ = function (a) {
    var b = shaka.hls.HlsParser, c = b.getRequiredAttributeValue_(a, "METHOD");
    if ("SAMPLE-AES-CENC" != c) return shaka.log.error("Widevine in HLS is only supported with SAMPLE-AES-CENC, not", c), null;
    b = b.getRequiredAttributeValue_(a, "URI");
    b = shaka.net.DataUriPlugin.parse(b);
    b = new Uint8Array(b.data);
    b = shaka.util.ManifestParserUtils.createDrmInfo("com.widevine.alpha", [{initDataType: "cenc", initData: b}]);
    if (a = a.getAttributeValue("KEYID")) goog.asserts.assert("0x" ==
        a.substr(0, 2), "Incorrect KEYID format!"), b.keyIds = [a.substr(2).toLowerCase()];
    return b
};
shaka.hls.HlsParser.prototype.onUpdate_ = function () {
    goog.asserts.assert(this.updateTimer_, "Should only be called by timer");
    goog.asserts.assert(null != this.updatePeriod_, "There should be an update period");
    shaka.log.info("Updating manifest...");
    this.playerInterface_ && (this.updateTimer_ = null, this.update().then(function () {
        this.setUpdateTimer_(this.updatePeriod_)
    }.bind(this))["catch"](function (a) {
        goog.asserts.assert(a instanceof shaka.util.Error, "Should only receive a Shaka error");
        this.playerInterface_ &&
        (a.severity = shaka.util.Error.Severity.RECOVERABLE, this.playerInterface_.onError(a), this.setUpdateTimer_(0))
    }.bind(this)))
};
shaka.hls.HlsParser.prototype.setUpdateTimer_ = function (a) {
    if (null != this.updatePeriod_ && null != a) {
        goog.asserts.assert(null == this.updateTimer_, "Timer should not be already set");
        var b = this.onUpdate_.bind(this);
        this.updateTimer_ = window.setTimeout(b, 1E3 * a)
    }
};
shaka.hls.HlsParser.prototype.setLive_ = function (a) {
    this.isLive_ = a;
    this.presentationTimeline_ && this.presentationTimeline_.setStatic(!a);
    a || null == this.updateTimer_ || (window.clearTimeout(this.updateTimer_), this.updatePeriod_ = this.updateTimer_ = null)
};
shaka.hls.HlsParser.KEYFORMATS_TO_DRM_PARSERS_ = {"urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed": shaka.hls.HlsParser.widevineDrmParser_};
shaka.media.ManifestParser.registerParserByExtension("m3u8", shaka.hls.HlsParser);
shaka.media.ManifestParser.registerParserByMime("application/x-mpegurl", shaka.hls.HlsParser);
shaka.media.ManifestParser.registerParserByMime("application/vnd.apple.mpegurl", shaka.hls.HlsParser);
shaka.media.Playhead = function (a, b, c, d, e, f) {
    this.video_ = a;
    this.manifest_ = b;
    this.config_ = c;
    this.startTime_ = null == d ? null : this.clampSeekToDuration_(d);
    this.onSeek_ = e;
    this.onEvent_ = f;
    this.eventManager_ = new shaka.util.EventManager;
    this.buffering_ = !1;
    this.playbackRate_ = 1;
    this.gapJumpTimer_ = this.trickPlayTimer_ = null;
    this.earlySeekTimer_ = new shaka.util.Timer(this.onEarlySeek_.bind(this));
    this.prevReadyState_ = a.readyState;
    this.didFireLargeGap_ = !1;
    this.stallPlayheadTime_ = this.stallWallTime_ = -1;
    this.hadSegmentAppended_ =
        this.stallCorrected_ = !1;
    if (0 < a.readyState) this.onLoadedMetadata_(); else this.eventManager_.listenOnce(a, "loadedmetadata", this.onLoadedMetadata_.bind(this)), this.eventManager_.listen(a, "timeupdate", function () {
        this.earlySeekTimer_.schedule(.1)
    }.bind(this));
    b = this.onPollGapJump_.bind(this);
    this.eventManager_.listen(a, "ratechange", this.onRateChange_.bind(this));
    this.eventManager_.listen(a, "waiting", b);
    this.gapJumpTimer_ = new shaka.util.Timer(b);
    this.gapJumpTimer_.scheduleRepeated(.25)
};
shaka.media.Playhead.prototype.destroy = function () {
    var a = this.eventManager_.destroy();
    this.eventManager_ = null;
    null != this.trickPlayTimer_ && (this.trickPlayTimer_.cancel(), this.trickPlayTimer_ = null);
    null != this.gapJumpTimer_ && (this.gapJumpTimer_.cancel(), this.gapJumpTimer_ = null);
    null != this.earlySeekTimer_ && (this.earlySeekTimer_.cancel(), this.earlySeekTimer_ = null);
    this.onEvent_ = this.onSeek_ = this.config_ = this.manifest_ = this.video_ = null;
    return a
};
shaka.media.Playhead.prototype.setStartTime = function (a) {
    0 < this.video_.readyState ? this.video_.currentTime = this.clampTime_(a) : this.startTime_ = a
};
shaka.media.Playhead.prototype.clampSeekToDuration_ = function (a) {
    var b = this.manifest_.presentationTimeline.getDuration();
    return a >= b ? (goog.asserts.assert(0 <= this.config_.durationBackoff, "Duration backoff must be non-negative!"), b - this.config_.durationBackoff) : a
};
shaka.media.Playhead.prototype.getTime = function () {
    return 0 < this.video_.readyState ? this.video_.paused ? this.video_.currentTime : this.clampTime_(this.video_.currentTime) : this.getStartTime_()
};
shaka.media.Playhead.prototype.getStartTime_ = function () {
    if (null != this.startTime_) return this.clampTime_(this.startTime_);
    var a = this.manifest_.presentationTimeline;
    a = Infinity > a.getDuration() ? a.getSegmentAvailabilityStart() : a.getSeekRangeEnd();
    this.startTime_ = this.clampSeekToDuration_(a);
    return a
};
shaka.media.Playhead.prototype.setBuffering = function (a) {
    a != this.buffering_ && (this.buffering_ = a, this.setPlaybackRate(this.playbackRate_))
};
shaka.media.Playhead.prototype.getPlaybackRate = function () {
    return this.playbackRate_
};
shaka.media.Playhead.prototype.setPlaybackRate = function (a) {
    null != this.trickPlayTimer_ && (this.trickPlayTimer_.cancel(), this.trickPlayTimer_ = null);
    this.playbackRate_ = a;
    this.video_.playbackRate = this.buffering_ || 0 > a ? 0 : a;
    if (!this.buffering_ && 0 > a) {
        var b = function () {
            this.video_.currentTime += a / 4
        }.bind(this);
        this.trickPlayTimer_ = new shaka.util.Timer(b);
        this.trickPlayTimer_.scheduleRepeated(.25)
    }
};
shaka.media.Playhead.prototype.onSegmentAppended = function () {
    this.hadSegmentAppended_ = !0;
    this.onPollGapJump_()
};
shaka.media.Playhead.prototype.onRateChange_ = function () {
    var a = this.buffering_ || 0 > this.playbackRate_ ? 0 : this.playbackRate_;
    this.video_.playbackRate && this.video_.playbackRate != a && (shaka.log.debug("Video playback rate changed to", this.video_.playbackRate), this.setPlaybackRate(this.video_.playbackRate))
};
shaka.media.Playhead.prototype.onLoadedMetadata_ = function () {
    var a = this.getStartTime_();
    this.eventManager_.unlisten(this.video_, "timeupdate");
    this.earlySeekTimer_.cancel();
    .001 > Math.abs(this.video_.currentTime - a) ? (this.eventManager_.listen(this.video_, "seeking", this.onSeeking_.bind(this)), this.eventManager_.listen(this.video_, "playing", this.onPlaying_.bind(this))) : (this.eventManager_.listenOnce(this.video_, "seeking", this.onSeekingToStartTime_.bind(this)), this.video_.currentTime = a)
};
shaka.media.Playhead.prototype.onSeekingToStartTime_ = function () {
    goog.asserts.assert(0 < this.video_.readyState, "readyState should be greater than 0");
    this.eventManager_.listen(this.video_, "seeking", this.onSeeking_.bind(this));
    this.eventManager_.listen(this.video_, "playing", this.onPlaying_.bind(this))
};
shaka.media.Playhead.prototype.onPollGapJump_ = function () {
    if (0 != this.video_.readyState && !this.video_.paused) {
        this.video_.readyState != this.prevReadyState_ && (this.didFireLargeGap_ = !1, this.prevReadyState_ = this.video_.readyState);
        var a = this.config_.smallGapLimit, b = this.video_.currentTime, c = this.video_.buffered,
            d = this.manifest_.presentationTimeline.getSegmentAvailabilityStart();
        if (b < d) c = this.reposition_(b), shaka.log.info("Jumping forward " + (c - b) + " seconds to catch up with the availability window."), this.movePlayhead_(b,
            c); else if (d = shaka.media.TimeRangesUtils.getGapIndex(c, b), null == d) {
            if (3 > this.video_.readyState && 0 < this.video_.playbackRate) if (this.stallPlayheadTime_ != b) this.stallPlayheadTime_ = b, this.stallWallTime_ = Date.now(), this.stallCorrected_ = !1; else if (!this.stallCorrected_ && this.stallWallTime_ < Date.now() - 1E3) for (d = 0; d < c.length; d++) if (b >= c.start(d) && b < c.end(d) - .5) {
                shaka.log.debug("Flushing media pipeline due to stall inside buffered range");
                this.video_.currentTime += .1;
                this.stallPlayheadTime_ = this.video_.currentTime;
                this.stallCorrected_ = !0;
                break
            }
        } else if (0 != d || this.hadSegmentAppended_) {
            var e = c.start(d), f = this.manifest_.presentationTimeline.getSeekRangeEnd();
            if (!(e >= f)) {
                var f = e - b, a = f <= a, g = !1;
                if (!a && !this.didFireLargeGap_) {
                    this.didFireLargeGap_ = !0;
                    var h = new shaka.util.FakeEvent("largegap", {currentTime: b, gapSize: f});
                    h.cancelable = !0;
                    this.onEvent_(h);
                    this.config_.jumpLargeGaps && !h.defaultPrevented ? g = !0 : shaka.log.info("Ignoring large gap at", b)
                }
                if (a || g) 0 == d ? shaka.log.info("Jumping forward", f, "seconds because of gap before start time of",
                    e) : shaka.log.info("Jumping forward", f, "seconds because of gap starting at", c.end(d - 1), "and ending at", e), this.movePlayhead_(b, e)
            }
        }
    }
};
shaka.media.Playhead.prototype.onEarlySeek_ = function () {
    goog.asserts.assert(0 == this.video_.readyState, "readyState should be 0 for early seeking");
    var a = this.video_.currentTime, b = this.reposition_(a);
    shaka.log.v1("Early seek to", a, "remapped to", b);
    this.startTime_ = b
};
shaka.media.Playhead.prototype.onSeeking_ = function () {
    goog.asserts.assert(0 < this.video_.readyState, "readyState should be greater than 0");
    this.hadSegmentAppended_ = !1;
    var a = this.video_.currentTime, b = this.reposition_(a);
    .001 < Math.abs(b - a) ? this.movePlayhead_(a, b) : (shaka.log.v1("Seek to " + a), this.didFireLargeGap_ = !1, this.onSeek_())
};
shaka.media.Playhead.prototype.onPlaying_ = function () {
    goog.asserts.assert(0 < this.video_.readyState, "readyState should be greater than 0");
    var a = this.video_.currentTime, b = this.reposition_(a);
    .001 < Math.abs(b - a) && this.movePlayhead_(a, b)
};
shaka.media.Playhead.prototype.reposition_ = function (a) {
    goog.asserts.assert(this.manifest_ && this.config_, "Must not be destroyed");
    var b = shaka.media.TimeRangesUtils.isBuffered.bind(null, this.video_.buffered),
        c = shaka.util.StreamUtils.getRebufferingGoal(this.manifest_, this.config_, 1),
        d = this.manifest_.presentationTimeline, e = d.getSafeAvailabilityStart(0), f = d.getSegmentAvailabilityEnd(),
        g = d.getDuration(), h = d.getSafeAvailabilityStart(c), k = d.getSafeAvailabilityStart(5),
        c = d.getSafeAvailabilityStart(c + 5);
    if (a >=
        g) return shaka.log.v1("Playhead past duration."), this.clampSeekToDuration_(a);
    if (a > f) return shaka.log.v1("Playhead past end."), f;
    if (a < e) {
        if (b(k)) return shaka.log.v1("Playhead before start & start is buffered"), k;
        shaka.log.v1("Playhead before start & start is unbuffered");
        return c
    }
    if (a >= h || b(a)) return shaka.log.v1("Playhead in safe region or in buffered region."), a;
    shaka.log.v1("Playhead outside safe region & in unbuffered region.");
    return c
};
shaka.media.Playhead.prototype.movePlayhead_ = function (a, b) {
    shaka.log.debug("Moving playhead...", "currentTime=" + a, "targetTime=" + b);
    this.video_.currentTime = b;
    var c = 0, d = function () {
        !this.video_ || 10 <= c++ || this.video_.currentTime != a || (this.video_.currentTime = b, setTimeout(d, 100))
    }.bind(this);
    setTimeout(d, 100)
};
shaka.media.Playhead.prototype.clampTime_ = function (a) {
    var b = this.manifest_.presentationTimeline.getSegmentAvailabilityStart();
    if (a < b) return b;
    b = this.manifest_.presentationTimeline.getSegmentAvailabilityEnd();
    return a > b ? b : a
};
shaka.media.PlayheadObserver = function (a, b, c, d, e, f, g) {
    this.video_ = a;
    this.mediaSource_ = b;
    this.manifest_ = c;
    this.config_ = d;
    this.onBuffering_ = e;
    this.onEvent_ = f;
    this.onChangePeriod_ = g;
    this.timelineRegions_ = [];
    this.eventManager_ = new shaka.util.EventManager;
    this.buffering_ = !1;
    this.curPeriodIndex_ = -1;
    this.watchdogTimer_ = null;
    this.startWatchdogTimer_()
};
shaka.media.PlayheadObserver.UNDERFLOW_THRESHOLD_ = .5;
shaka.media.PlayheadObserver.RegionLocation_ = {FUTURE_REGION: 1, INSIDE: 2, PAST_REGION: 3};
shaka.media.PlayheadObserver.prototype.destroy = function () {
    var a = this.eventManager_ ? this.eventManager_.destroy() : Promise.resolve();
    this.eventManager_ = null;
    this.cancelWatchdogTimer_();
    this.onChangePeriod_ = this.onEvent_ = this.onBuffering_ = this.config_ = this.manifest_ = this.mediaSource_ = this.video_ = null;
    this.timelineRegions_ = [];
    return a
};
shaka.media.PlayheadObserver.prototype.seeked = function () {
    this.timelineRegions_.forEach(this.updateTimelineRegion_.bind(this, !0))
};
shaka.media.PlayheadObserver.prototype.addTimelineRegion = function (a) {
    if (!this.timelineRegions_.some(function (b) {
            return b.info.schemeIdUri == a.schemeIdUri && b.info.startTime == a.startTime && b.info.endTime == a.endTime
        })) {
        var b = {info: a, status: shaka.media.PlayheadObserver.RegionLocation_.FUTURE_REGION};
        this.timelineRegions_.push(b);
        var c = shaka.media.PlayheadObserver.cloneTimelineInfo_,
            c = new shaka.util.FakeEvent("timelineregionadded", {detail: c(a)});
        this.onEvent_(c);
        this.updateTimelineRegion_(!0, b)
    }
};
shaka.media.PlayheadObserver.cloneTimelineInfo_ = function (a) {
    var b = shaka.util.ConfigUtils.cloneObject(a);
    b.eventElement = a.eventElement;
    return b
};
shaka.media.PlayheadObserver.prototype.updateTimelineRegion_ = function (a, b) {
    var c = shaka.media.PlayheadObserver.RegionLocation_, d = shaka.media.PlayheadObserver.cloneTimelineInfo_,
        e = b.info.startTime > this.video_.currentTime ? c.FUTURE_REGION : b.info.endTime < this.video_.currentTime ? c.PAST_REGION : c.INSIDE,
        f = b.status == c.INSIDE, c = e == c.INSIDE;
    if (e != b.status) {
        if (!a || f || c) {
            if (!f) this.onEvent_(new shaka.util.FakeEvent("timelineregionenter", {detail: d(b.info)}));
            if (!c) this.onEvent_(new shaka.util.FakeEvent("timelineregionexit",
                {detail: d(b.info)}))
        }
        b.status = e
    }
};
shaka.media.PlayheadObserver.prototype.startWatchdogTimer_ = function () {
    this.cancelWatchdogTimer_();
    this.watchdogTimer_ = window.setTimeout(this.onWatchdogTimer_.bind(this), 250)
};
shaka.media.PlayheadObserver.prototype.cancelWatchdogTimer_ = function () {
    this.watchdogTimer_ && (window.clearTimeout(this.watchdogTimer_), this.watchdogTimer_ = null)
};
shaka.media.PlayheadObserver.prototype.onWatchdogTimer_ = function () {
    this.watchdogTimer_ = null;
    this.startWatchdogTimer_();
    goog.asserts.assert(this.manifest_ && this.config_, "Must not be destroyed");
    var a = shaka.util.StreamUtils.findPeriodContainingTime(this.manifest_, this.video_.currentTime);
    if (a != this.curPeriodIndex_) {
        if (-1 != this.curPeriodIndex_) this.onChangePeriod_();
        this.curPeriodIndex_ = a
    }
    var a = shaka.media.TimeRangesUtils.bufferedAheadOf(this.video_.buffered, this.video_.currentTime),
        b = shaka.media.TimeRangesUtils.bufferEnd(this.video_.buffered),
        c = shaka.media.PlayheadObserver.UNDERFLOW_THRESHOLD_, d = this.manifest_.presentationTimeline,
        e = d.getSegmentAvailabilityEnd(), b = d.isLive() && b >= e, d = "ended" == this.mediaSource_.readyState,
        b = b || this.video_.ended || d;
    this.buffering_ ? (c = shaka.util.StreamUtils.getRebufferingGoal(this.manifest_, this.config_, 1), (b || a >= c) && this.setBuffering_(!1)) : !b && a < c && this.setBuffering_(!0);
    this.timelineRegions_.forEach(this.updateTimelineRegion_.bind(this, !1))
};
shaka.media.PlayheadObserver.prototype.setBuffering_ = function (a) {
    a != this.buffering_ && (this.buffering_ = a, this.onBuffering_(a))
};
shaka.media.StreamingEngine = function (a, b) {
    this.playerInterface_ = b;
    this.manifest_ = a;
    this.config_ = null;
    this.bufferingGoalScale_ = 1;
    this.setupPeriodPromise_ = Promise.resolve();
    this.canSwitchPeriod_ = [];
    this.canSwitchStream_ = {};
    this.mediaStates_ = {};
    this.startupComplete_ = !1;
    this.failureCallbackBackoff_ = null;
    this.destroyed_ = this.fatalError_ = !1
};
shaka.media.StreamingEngine.prototype.MIN_BUFFER_LENGTH = 2;
shaka.media.StreamingEngine.prototype.destroy = function () {
    for (var a in this.mediaStates_) this.cancelUpdate_(this.mediaStates_[a]);
    this.config_ = this.mediaStates_ = this.canSwitchStream_ = this.canSwitchPeriod_ = this.setupPeriodPromise_ = this.manifest_ = this.playerInterface_ = null;
    this.destroyed_ = !0;
    return Promise.resolve()
};
shaka.media.StreamingEngine.prototype.configure = function (a) {
    this.config_ = a;
    this.failureCallbackBackoff_ = new shaka.net.Backoff({
        maxAttempts: Math.max(a.retryParameters.maxAttempts, 2),
        baseDelay: a.retryParameters.baseDelay,
        backoffFactor: a.retryParameters.backoffFactor,
        fuzzFactor: a.retryParameters.fuzzFactor,
        timeout: 0
    }, !0)
};
shaka.media.StreamingEngine.prototype.init = function () {
    goog.asserts.assert(this.config_, "StreamingEngine configure() must be called before init()!");
    var a = this.playerInterface_.playhead.getTime(), a = this.findPeriodContainingTime_(a),
        a = this.playerInterface_.onChooseStreams(this.manifest_.periods[a]);
    return a.variant || a.text ? this.initStreams_(a).then(function () {
        shaka.log.debug("init: completed initial Stream setup");
        this.playerInterface_ && this.playerInterface_.onInitialStreamsSetup && (shaka.log.v1("init: calling onInitialStreamsSetup()..."),
            this.playerInterface_.onInitialStreamsSetup())
    }.bind(this)) : (shaka.log.error("init: no Streams chosen"), Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STREAMING, shaka.util.Error.Code.INVALID_STREAMS_CHOSEN)))
};
shaka.media.StreamingEngine.prototype.getCurrentPeriod = function () {
    var a = this.playerInterface_.playhead.getTime(), a = this.findPeriodContainingTime_(a);
    return this.manifest_.periods[a]
};
shaka.media.StreamingEngine.prototype.getActivePeriod = function () {
    goog.asserts.assert(this.mediaStates_, "Must be initialized");
    var a = shaka.util.ManifestParserUtils.ContentType;
    return (a = this.mediaStates_[a.VIDEO] || this.mediaStates_[a.AUDIO]) ? this.manifest_.periods[a.needPeriodIndex] : null
};
shaka.media.StreamingEngine.prototype.getActiveStreams = function () {
    goog.asserts.assert(this.mediaStates_, "Must be initialized");
    return shaka.util.MapUtils.map(this.mediaStates_, function (a) {
        return a.restoreStreamAfterTrickPlay || a.stream
    })
};
shaka.media.StreamingEngine.prototype.notifyNewTextStream = function (a) {
    return this.initStreams_({text: a})
};
shaka.media.StreamingEngine.prototype.setTrickPlay = function (a) {
    var b = this.mediaStates_[shaka.util.ManifestParserUtils.ContentType.VIDEO];
    if (b) {
        var c = b.stream;
        if (c) if (shaka.log.debug("setTrickPlay", a), a) {
            var d = c.trickModeVideo;
            d && (a = b.restoreStreamAfterTrickPlay, a || (shaka.log.debug("Engaging trick mode stream", d), this.switchInternal_(d, !1), b.restoreStreamAfterTrickPlay = c))
        } else if (a = b.restoreStreamAfterTrickPlay) shaka.log.debug("Restoring non-trick-mode stream", a), b.restoreStreamAfterTrickPlay = null,
            this.switchInternal_(a, !0)
    }
};
shaka.media.StreamingEngine.prototype.switchVariant = function (a, b) {
    a.video && this.switchInternal_(a.video, b);
    a.audio && this.switchInternal_(a.audio, b)
};
shaka.media.StreamingEngine.prototype.switchTextStream = function (a) {
    goog.asserts.assert(a && "text" == a.type, "Wrong stream type passed to switchTextStream!");
    this.switchInternal_(a, !0)
};
shaka.media.StreamingEngine.prototype.switchInternal_ = function (a, b) {
    var c = shaka.util.ManifestParserUtils.ContentType;
    var d = this.mediaStates_[a.type];
    if (!d && a.type == c.TEXT && this.config_.ignoreTextStreamFailures) this.notifyNewTextStream(a); else if (goog.asserts.assert(d, "switch: expected mediaState to exist"), d) {
        var e = this.findPeriodContainingStream_(a);
        if (b && e != d.needPeriodIndex) shaka.log.debug("switch: switching to stream in another Period; clearing buffer and changing Periods"), this.clearAllBuffers_();
        else {
            d.restoreStreamAfterTrickPlay && (shaka.log.debug("switch during trick play mode", a), a.trickModeVideo ? (d.restoreStreamAfterTrickPlay = a, a = a.trickModeVideo, shaka.log.debug("switch found trick play stream", a)) : (d.restoreStreamAfterTrickPlay = null, shaka.log.debug("switch found no special trick play stream")));
            var f = this.canSwitchPeriod_[e];
            goog.asserts.assert(f && f.resolved, "switch: expected Period " + e + " to be ready");
            f && f.resolved && (f = this.canSwitchStream_[a.id], goog.asserts.assert(f && f.resolved, "switch: expected Stream " +
                a.id + " to be ready"), f && f.resolved && (d.stream == a ? (c = shaka.media.StreamingEngine.logPrefix_(d), shaka.log.debug("switch: Stream " + c + " already active")) : (a.type == c.TEXT && (c = shaka.util.MimeUtils.getFullType(a.mimeType, a.codecs), this.playerInterface_.mediaSourceEngine.reinitText(c)), d.stream = a, d.needInitSegment = !0, c = shaka.media.StreamingEngine.logPrefix_(d), shaka.log.debug("switch: switching to Stream " + c), b && (d.clearingBuffer ? d.waitingToFlushBuffer = !0 : d.performingUpdate ? (d.waitingToClearBuffer = !0, d.waitingToFlushBuffer =
                !0) : (this.cancelUpdate_(d), this.clearBuffer_(d, !0))))))
        }
    }
};
shaka.media.StreamingEngine.prototype.seeked = function () {
    goog.asserts.assert(this.mediaStates_, "Must not be destroyed");
    var a = this.playerInterface_.playhead.getTime();
    Object.keys(this.mediaStates_).every(function (b) {
        return this.playerInterface_.mediaSourceEngine.isBuffered(b, a)
    }.bind(this)) ? shaka.log.debug("(all): seeked: buffered seek: playheadTime=" + a) : (shaka.log.debug("(all): seeked: unbuffered seek: clearing all buffers"), this.clearAllBuffers_())
};
shaka.media.StreamingEngine.prototype.clearAllBuffers_ = function () {
    for (var a in this.mediaStates_) {
        var b = this.mediaStates_[a], c = shaka.media.StreamingEngine.logPrefix_(b);
        b.clearingBuffer ? shaka.log.debug(c, "clear: already clearing the buffer") : b.waitingToClearBuffer ? shaka.log.debug(c, "clear: already waiting") : b.performingUpdate ? (shaka.log.debug(c, "clear: currently updating"), b.waitingToClearBuffer = !0) : null == this.playerInterface_.mediaSourceEngine.bufferStart(a) ? (shaka.log.debug(c, "clear: nothing buffered"),
        null == b.updateTimer && this.scheduleUpdate_(b, 0)) : (shaka.log.debug(c, "clear: handling right now"), this.cancelUpdate_(b), this.clearBuffer_(b, !1))
    }
};
shaka.media.StreamingEngine.prototype.initStreams_ = function (a, b) {
    goog.asserts.assert(this.config_, "StreamingEngine configure() must be called before init()!");
    var c = this.playerInterface_.playhead.getTime(), d = this.findPeriodContainingTime_(c),
        c = shaka.util.ManifestParserUtils.ContentType, e = {}, f = [];
    a.variant && a.variant.audio && (e[c.AUDIO] = a.variant.audio, f.push(a.variant.audio));
    a.variant && a.variant.video && (e[c.VIDEO] = a.variant.video, f.push(a.variant.video));
    a.text && (e[c.TEXT] = a.text, f.push(a.text));
    this.playerInterface_.mediaSourceEngine.init(e);
    this.setDuration_();
    return this.setupStreams_(f).then(function () {
        if (!this.destroyed_) for (var a in e) {
            var c = e[a];
            this.mediaStates_[a] || (this.mediaStates_[a] = {
                stream: c,
                type: a,
                lastStream: null,
                lastSegmentReference: null,
                restoreStreamAfterTrickPlay: null,
                needInitSegment: !0,
                needPeriodIndex: d,
                endOfStream: !1,
                performingUpdate: !1,
                updateTimer: null,
                waitingToClearBuffer: !1,
                waitingToFlushBuffer: !1,
                clearingBuffer: !1,
                recovering: !1,
                hasError: !1,
                resumeAt: b || 0
            }, this.scheduleUpdate_(this.mediaStates_[a],
                0))
        }
    }.bind(this))
};
shaka.media.StreamingEngine.prototype.setupPeriod_ = function (a) {
    var b = shaka.util.Functional, c = this.canSwitchPeriod_[a];
    if (c) return shaka.log.debug("(all) Period " + a + " is being or has been set up"), goog.asserts.assert(c.promise, "promise must not be null"), c.promise;
    shaka.log.debug("(all) setting up Period " + a);
    c = {promise: new shaka.util.PublicPromise, resolved: !1};
    this.canSwitchPeriod_[a] = c;
    var d = this.manifest_.periods[a].variants.map(function (a) {
        var b = [];
        a.audio && b.push(a.audio);
        a.video && b.push(a.video);
        a.video && a.video.trickModeVideo && b.push(a.video.trickModeVideo);
        return b
    }).reduce(b.collapseArrays, []).filter(b.isNotDuplicate);
    d.push.apply(d, this.manifest_.periods[a].textStreams);
    this.setupPeriodPromise_ = this.setupPeriodPromise_.then(function () {
        if (!this.destroyed_) return this.setupStreams_(d)
    }.bind(this)).then(function () {
        this.destroyed_ || (this.canSwitchPeriod_[a].promise.resolve(), this.canSwitchPeriod_[a].resolved = !0, shaka.log.v1("(all) setup Period " + a))
    }.bind(this))["catch"](function (b) {
        this.destroyed_ ||
        (this.canSwitchPeriod_[a].promise.reject(), delete this.canSwitchPeriod_[a], shaka.log.warning("(all) failed to setup Period " + a), this.playerInterface_.onError(b))
    }.bind(this));
    return c.promise
};
shaka.media.StreamingEngine.prototype.setupStreams_ = function (a) {
    var b = a.map(function (a) {
        return a.id
    }).filter(shaka.util.Functional.isNotDuplicate);
    goog.asserts.assert(b.length == a.length, "streams should have unique ids");
    for (var b = [], c = 0; c < a.length; ++c) {
        var d = a[c];
        var e = this.canSwitchStream_[d.id];
        e ? (shaka.log.debug("(all) Stream " + d.id + " is being or has been set up"), b.push(e.promise)) : (shaka.log.v1("(all) setting up Stream " + d.id), this.canSwitchStream_[d.id] = {
            promise: new shaka.util.PublicPromise,
            resolved: !1
        }, b.push(d.createSegmentIndex()))
    }
    return Promise.all(b).then(function () {
        if (!this.destroyed_) for (var b = 0; b < a.length; ++b) {
            var c = a[b], d = this.canSwitchStream_[c.id];
            d.resolved || (d.promise.resolve(), d.resolved = !0, shaka.log.v1("(all) setup Stream " + c.id))
        }
    }.bind(this))["catch"](function (a) {
        if (!this.destroyed_) return this.canSwitchStream_[d.id].promise.reject(), delete this.canSwitchStream_[d.id], Promise.reject(a)
    }.bind(this))
};
shaka.media.StreamingEngine.prototype.setDuration_ = function () {
    var a = this.manifest_.presentationTimeline.getDuration();
    Infinity > a ? this.playerInterface_.mediaSourceEngine.setDuration(a) : this.playerInterface_.mediaSourceEngine.setDuration(Math.pow(2, 32))
};
shaka.media.StreamingEngine.prototype.onUpdate_ = function (a) {
    var b = shaka.util.MapUtils;
    if (!this.destroyed_) {
        var c = shaka.media.StreamingEngine.logPrefix_(a);
        goog.asserts.assert(!a.performingUpdate && null != a.updateTimer, c + " unexpected call to onUpdate_()");
        if (!a.performingUpdate && null != a.updateTimer && (goog.asserts.assert(!a.clearingBuffer, c + " onUpdate_() should not be called when clearing the buffer"), !a.clearingBuffer)) if (a.updateTimer = null, a.waitingToClearBuffer) shaka.log.debug(c, "skipping update and clearing the buffer"),
            this.clearBuffer_(a, a.waitingToFlushBuffer); else {
            try {
                var d = this.update_(a);
                null != d && (this.scheduleUpdate_(a, d), a.hasError = !1)
            } catch (e) {
                this.handleStreamingError_(e);
                return
            }
            goog.asserts.assert(this.mediaStates_, "must not be destroyed");
            b = b.values(this.mediaStates_);
            this.handlePeriodTransition_(a);
            b.every(function (a) {
                return a.endOfStream
            }) && (shaka.log.v1(c, "calling endOfStream()..."), this.playerInterface_.mediaSourceEngine.endOfStream().then(function () {
                var a = this.playerInterface_.mediaSourceEngine.getDuration();
                this.manifest_.presentationTimeline.setDuration(a)
            }.bind(this)))
        }
    }
};
shaka.media.StreamingEngine.prototype.update_ = function (a) {
    var b = shaka.media.StreamingEngine.logPrefix_(a), c = this.playerInterface_.playhead.getTime(),
        d = this.getTimeNeeded_(a, c);
    shaka.log.v2(b, "timeNeeded=" + d);
    var e = this.findPeriodContainingStream_(a.stream), f = this.findPeriodContainingTime_(d),
        g = this.playerInterface_.mediaSourceEngine.bufferedAheadOf(a.type, c);
    shaka.log.v2(b, "update_:", "playheadTime=" + c, "bufferedAhead=" + g);
    var h = this.getBufferingGoal_();
    if (d >= this.manifest_.presentationTimeline.getDuration()) return shaka.log.debug(b,
        "buffered to end of presentation"), a.endOfStream = !0, null;
    a.endOfStream = !1;
    a.needPeriodIndex = f;
    if (f != e) return shaka.log.debug(b, "need Period " + f, "playheadTime=" + c, "timeNeeded=" + d, "currentPeriodIndex=" + e), null;
    if (g >= h) return shaka.log.v2(b, "buffering goal met"), .5;
    b = this.playerInterface_.mediaSourceEngine.bufferEnd(a.type);
    b = this.getSegmentReferenceNeeded_(a, c, b, e);
    if (!b) return 1;
    a.resumeAt = 0;
    this.fetchAndAppend_(a, c, e, b);
    return null
};
shaka.media.StreamingEngine.prototype.getBufferingGoal_ = function () {
    goog.asserts.assert(this.manifest_, "manifest_ should not be null");
    goog.asserts.assert(this.config_, "config_ should not be null");
    var a = shaka.util.StreamUtils.getRebufferingGoal(this.manifest_, this.config_, this.bufferingGoalScale_);
    return Math.max(a, this.bufferingGoalScale_ * this.config_.bufferingGoal)
};
shaka.media.StreamingEngine.prototype.getTimeNeeded_ = function (a, b) {
    if (!a.lastStream || !a.lastSegmentReference) return Math.max(b, a.resumeAt);
    var c = this.findPeriodContainingStream_(a.lastStream);
    return this.manifest_.periods[c].startTime + a.lastSegmentReference.endTime
};
shaka.media.StreamingEngine.prototype.getSegmentReferenceNeeded_ = function (a, b, c, d) {
    var e = shaka.media.StreamingEngine.logPrefix_(a);
    if (a.lastSegmentReference && a.stream == a.lastStream) return b = a.lastSegmentReference.position + 1, shaka.log.v2(e, "next position known:", "position=" + b), this.getSegmentReferenceIfAvailable_(a, d, b);
    a.lastSegmentReference ? (goog.asserts.assert(a.lastStream, "lastStream should not be null"), shaka.log.v1(e, "next position unknown: another Stream buffered"), b = this.findPeriodContainingStream_(a.lastStream),
        b = this.lookupSegmentPosition_(a, this.manifest_.periods[b].startTime + a.lastSegmentReference.endTime, d)) : (goog.asserts.assert(!a.lastStream, "lastStream should be null"), shaka.log.v1(e, "next position unknown: nothing buffered"), b = this.lookupSegmentPosition_(a, c || b, d));
    if (null == b) return null;
    e = null;
    null == c && (e = this.getSegmentReferenceIfAvailable_(a, d, Math.max(0, b - 1)));
    return e || this.getSegmentReferenceIfAvailable_(a, d, b)
};
shaka.media.StreamingEngine.prototype.lookupSegmentPosition_ = function (a, b, c) {
    var d = shaka.media.StreamingEngine.logPrefix_(a);
    c = this.manifest_.periods[c];
    shaka.log.debug(d, "looking up segment:", "presentationTime=" + b, "currentPeriod.startTime=" + c.startTime);
    b = Math.max(0, b - c.startTime);
    a = a.stream.findSegmentPosition(b);
    null == a && shaka.log.warning(d, "cannot find segment:", "currentPeriod.startTime=" + c.startTime, "lookupTime=" + b);
    return a
};
shaka.media.StreamingEngine.prototype.getSegmentReferenceIfAvailable_ = function (a, b, c) {
    var d = shaka.media.StreamingEngine.logPrefix_(a);
    b = this.manifest_.periods[b];
    a = a.stream.getSegmentReference(c);
    if (!a) return shaka.log.v1(d, "segment does not exist:", "currentPeriod.startTime=" + b.startTime, "position=" + c), null;
    var e = this.manifest_.presentationTimeline;
    c = e.getSegmentAvailabilityStart();
    e = e.getSegmentAvailabilityEnd();
    return b.startTime + a.endTime < c || b.startTime + a.startTime > e ? (shaka.log.v2(d, "segment is not available:",
        "currentPeriod.startTime=" + b.startTime, "reference.startTime=" + a.startTime, "reference.endTime=" + a.endTime, "availabilityStart=" + c, "availabilityEnd=" + e), null) : a
};
shaka.media.StreamingEngine.prototype.fetchAndAppend_ = function (a, b, c, d) {
    var e = shaka.media.StreamingEngine.logPrefix_(a), f = shaka.util.ManifestParserUtils.ContentType,
        g = this.manifest_.periods[c];
    shaka.log.v1(e, "fetchAndAppend_:", "playheadTime=" + b, "currentPeriod.startTime=" + g.startTime, "reference.position=" + d.position, "reference.startTime=" + d.startTime, "reference.endTime=" + d.endTime);
    var h = a.stream, k = this.manifest_.presentationTimeline.getDuration(), l = this.manifest_.periods[c + 1],
        m = g.startTime, k = l ? l.startTime :
        k;
    goog.asserts.assert(d.startTime <= k, e + " segment should start before append window end");
    c = this.initSourceBuffer_(a, c, m, k);
    a.performingUpdate = !0;
    a.needInitSegment = !1;
    shaka.log.v2(e, "fetching segment");
    m = this.fetch_(d);
    Promise.all([c, m]).then(function (c) {
        if (!this.destroyed_ && !this.fatalError_) return this.append_(a, b, g, h, d, c[1])
    }.bind(this)).then(function () {
        if (!this.destroyed_ && !this.fatalError_) {
            a.performingUpdate = !1;
            a.recovering = !1;
            if (!a.waitingToClearBuffer) this.playerInterface_.onSegmentAppended();
            this.scheduleUpdate_(a, 0);
            this.handleStartup_(a, h);
            shaka.log.v1(e, "finished fetch and append")
        }
    }.bind(this))["catch"](function (b) {
        this.destroyed_ || this.fatalError_ || (goog.asserts.assert(b instanceof shaka.util.Error, "Should only receive a Shaka error"), a.performingUpdate = !1, a.type == f.TEXT && this.config_.ignoreTextStreamFailures ? (b.code == shaka.util.Error.Code.BAD_HTTP_STATUS ? shaka.log.warning(e, "Text stream failed to download. Proceeding without it.") : shaka.log.warning(e, "Text stream failed to parse. Proceeding without it."),
            delete this.mediaStates_[f.TEXT]) : b.code == shaka.util.Error.Code.QUOTA_EXCEEDED_ERROR ? this.handleQuotaExceeded_(a, b) : (shaka.log.error(e, "failed fetch and append: code=" + b.code), a.hasError = !0, b.severity = shaka.util.Error.Severity.CRITICAL, this.handleStreamingError_(b)))
    }.bind(this))
};
shaka.media.StreamingEngine.prototype.retry = function () {
    if (this.destroyed_) return shaka.log.error("Unable to retry after StreamingEngine is destroyed!"), !1;
    if (this.fatalError_) return shaka.log.error("Unable to retry after StreamingEngine encountered a fatal error!"), !1;
    for (var a in this.mediaStates_) {
        var b = this.mediaStates_[a], c = shaka.media.StreamingEngine.logPrefix_(b);
        b.hasError && (shaka.log.info(c, "Retrying after failure..."), b.hasError = !1, this.scheduleUpdate_(b, .1))
    }
    return !0
};
shaka.media.StreamingEngine.prototype.handleQuotaExceeded_ = function (a, b) {
    var c = shaka.media.StreamingEngine.logPrefix_(a);
    goog.asserts.assert(this.mediaStates_, "must not be destroyed");
    if (shaka.util.MapUtils.values(this.mediaStates_).some(function (b) {
            return b != a && b.recovering
        })) shaka.log.debug(c, "MediaSource threw QuotaExceededError:", "waiting for another stream to recover..."); else {
        var d = Math.round(100 * this.bufferingGoalScale_);
        if (20 < d) this.bufferingGoalScale_ -= .2; else if (4 < d) this.bufferingGoalScale_ -=
            .04; else {
            shaka.log.error(c, "MediaSource threw QuotaExceededError too many times");
            this.fatalError_ = a.hasError = !0;
            this.playerInterface_.onError(b);
            return
        }
        shaka.log.warning(c, "MediaSource threw QuotaExceededError:", "reducing buffering goals by " + (100 - Math.round(100 * this.bufferingGoalScale_)) + "%");
        a.recovering = !0
    }
    this.scheduleUpdate_(a, 4)
};
shaka.media.StreamingEngine.prototype.initSourceBuffer_ = function (a, b, c, d) {
    if (!a.needInitSegment) return Promise.resolve();
    var e = shaka.media.StreamingEngine.logPrefix_(a);
    b = this.manifest_.periods[b].startTime - a.stream.presentationTimeOffset;
    shaka.log.v1(e, "setting timestamp offset to " + b);
    shaka.log.v1(e, "setting appstart window start to " + c);
    shaka.log.v1(e, "setting append window end to " + d);
    c = this.playerInterface_.mediaSourceEngine.setStreamProperties(a.type, b, c, d);
    if (!a.stream.initSegmentReference) return c;
    shaka.log.v1(e, "fetching init segment");
    d = this.fetch_(a.stream.initSegmentReference).then(function (b) {
        if (!this.destroyed_) return shaka.log.v1(e, "appending init segment"), this.playerInterface_.mediaSourceEngine.appendBuffer(a.type, b, null, null)
    }.bind(this))["catch"](function (b) {
        a.needInitSegment = !0;
        return Promise.reject(b)
    });
    return Promise.all([c, d])
};
shaka.media.StreamingEngine.prototype.append_ = function (a, b, c, d, e, f) {
    var g = shaka.media.StreamingEngine.logPrefix_(a);
    d.containsEmsgBoxes && (new shaka.util.Mp4Parser).fullBox("emsg", this.parseEMSG_.bind(this, c, e)).parse(f);
    return this.evict_(a, b).then(function () {
        if (!this.destroyed_) return shaka.log.v1(g, "appending media segment"), this.playerInterface_.mediaSourceEngine.appendBuffer(a.type, f, e.startTime + c.startTime, e.endTime + c.startTime)
    }.bind(this)).then(function () {
        if (!this.destroyed_) return shaka.log.v2(g,
            "appended media segment"), a.lastStream = d, a.lastSegmentReference = e, Promise.resolve()
    }.bind(this))
};
shaka.media.StreamingEngine.prototype.parseEMSG_ = function (a, b, c) {
    var d = c.reader.readTerminatedString(), e = c.reader.readTerminatedString(), f = c.reader.readUint32(),
        g = c.reader.readUint32(), h = c.reader.readUint32(), k = c.reader.readUint32();
    c = c.reader.readBytes(c.reader.getLength() - c.reader.getPosition());
    a = a.startTime + b.startTime + g / f;
    if ("urn:mpeg:dash:event:2012" == d) this.playerInterface_.onManifestUpdate(); else d = new shaka.util.FakeEvent("emsg", {
        detail: {
            startTime: a, endTime: a + h / f, schemeIdUri: d, value: e, timescale: f,
            presentationTimeDelta: g, eventDuration: h, id: k, messageData: c
        }
    }), this.playerInterface_.onEvent(d)
};
shaka.media.StreamingEngine.prototype.evict_ = function (a, b) {
    var c = shaka.media.StreamingEngine.logPrefix_(a);
    shaka.log.v2(c, "checking buffer length");
    var d = this.playerInterface_.mediaSourceEngine.bufferStart(a.type);
    if (null == d) return shaka.log.v2(c, "buffer behind okay because nothing buffered:", "playheadTime=" + b, "bufferBehind=" + this.config_.bufferBehind), Promise.resolve();
    var e = b - d, f = e - this.config_.bufferBehind;
    if (0 >= f) return shaka.log.v2(c, "buffer behind okay:", "playheadTime=" + b, "bufferedBehind=" +
        e, "bufferBehind=" + this.config_.bufferBehind, "underflow=" + -f), Promise.resolve();
    shaka.log.v1(c, "buffer behind too large:", "playheadTime=" + b, "bufferedBehind=" + e, "bufferBehind=" + this.config_.bufferBehind, "overflow=" + f);
    return this.playerInterface_.mediaSourceEngine.remove(a.type, d, d + f).then(function () {
        this.destroyed_ || shaka.log.v1(c, "evicted " + f + " seconds")
    }.bind(this))
};
shaka.media.StreamingEngine.prototype.handleStartup_ = function (a, b) {
    var c = shaka.util.Functional, d = shaka.util.MapUtils, e = shaka.util.ManifestParserUtils.ContentType;
    if (!this.startupComplete_) {
        var f = shaka.media.StreamingEngine.logPrefix_(a);
        goog.asserts.assert(this.mediaStates_, "must not be destroyed");
        d = d.values(this.mediaStates_);
        if (this.startupComplete_ = d.every(function (a) {
                return a.type == e.TEXT ? !0 : !a.waitingToClearBuffer && !a.clearingBuffer && a.lastSegmentReference
            })) {
            shaka.log.debug(f, "startup complete");
            var g = this.findPeriodContainingStream_(b);
            goog.asserts.assert(d.every(function (a) {
                return a.needPeriodIndex == g || a.needPeriodIndex == g + 1
            }), f + " expected all MediaStates to need same Period");
            this.canSwitchPeriod_[g] || this.setupPeriod_(g).then(function () {
                shaka.log.v1(f, "calling onCanSwitch()...");
                this.playerInterface_.onCanSwitch()
            }.bind(this))["catch"](c.noop);
            for (d = 0; d < this.manifest_.periods.length; ++d) this.setupPeriod_(d)["catch"](c.noop);
            this.playerInterface_.onStartupComplete && (shaka.log.v1(f, "calling onStartupComplete()..."),
                this.playerInterface_.onStartupComplete())
        }
    }
};
shaka.media.StreamingEngine.prototype.handlePeriodTransition_ = function (a) {
    var b = shaka.util.Functional, c = shaka.util.MapUtils, d = shaka.media.StreamingEngine.logPrefix_(a),
        e = shaka.util.ManifestParserUtils.ContentType, f = this.findPeriodContainingStream_(a.stream);
    if (a.needPeriodIndex != f) {
        var g = a.needPeriodIndex;
        goog.asserts.assert(this.mediaStates_, "must not be destroyed");
        var h = c.values(this.mediaStates_);
        goog.asserts.assert(h.every(function (a) {
                return a.needPeriodIndex == g || a.hasError || !shaka.media.StreamingEngine.isIdle_(a)
            }),
            "All MediaStates should need the same Period or be performing updates.");
        h.every(function (a) {
            return a.needPeriodIndex == g
        }) ? h.every(shaka.media.StreamingEngine.isIdle_) ? (shaka.log.debug(d, "all need Period " + g), this.setupPeriod_(g).then(function () {
            if (!this.destroyed_) if (h.every(function (a) {
                    var b = shaka.media.StreamingEngine.isIdle_(a), c = this.findPeriodContainingStream_(a.stream);
                    return b && a.needPeriodIndex == g && c != g
                }.bind(this))) {
                var a = this.manifest_.periods[g];
                shaka.log.v1(d, "calling onChooseStreams()...");
                var b = this.playerInterface_.onChooseStreams(a), c = {};
                b.variant && b.variant.video && (c[e.VIDEO] = b.variant.video);
                b.variant && b.variant.audio && (c[e.AUDIO] = b.variant.audio);
                b.text && (c[e.TEXT] = b.text);
                for (var f in this.mediaStates_) if (!c[f] && f != e.TEXT) {
                    shaka.log.error(d, "invalid Streams chosen: missing " + f + " Stream");
                    this.playerInterface_.onError(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STREAMING, shaka.util.Error.Code.INVALID_STREAMS_CHOSEN));
                    return
                }
                for (f in c) if (!this.mediaStates_[f]) if (f ==
                    e.TEXT) this.initStreams_({text: c[e.TEXT]}, a.startTime), delete c[f]; else {
                    shaka.log.error(d, "invalid Streams chosen: unusable " + f + " Stream");
                    this.playerInterface_.onError(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STREAMING, shaka.util.Error.Code.INVALID_STREAMS_CHOSEN));
                    return
                }
                for (f in this.mediaStates_) (a = c[f]) ? (this.switchInternal_(a, !1), this.scheduleUpdate_(this.mediaStates_[f], 0)) : (goog.asserts.assert(f == e.TEXT, "Invalid streams chosen"), delete this.mediaStates_[f]);
                shaka.log.v1(d, "calling onCanSwitch()...");
                this.playerInterface_.onCanSwitch()
            } else shaka.log.debug(d, "ignoring transition to Period", g, "since another is happening")
        }.bind(this))["catch"](b.noop)) : shaka.log.debug(d, "all MediaStates need Period " + g + ", but not all MediaStates are idle") : shaka.log.debug(d, "not all MediaStates need Period " + g)
    }
};
shaka.media.StreamingEngine.isIdle_ = function (a) {
    return !a.performingUpdate && null == a.updateTimer && !a.waitingToClearBuffer && !a.clearingBuffer
};
shaka.media.StreamingEngine.prototype.findPeriodContainingTime_ = function (a) {
    goog.asserts.assert(this.manifest_, "Must not be destroyed");
    return shaka.util.StreamUtils.findPeriodContainingTime(this.manifest_, a)
};
shaka.media.StreamingEngine.prototype.findPeriodContainingStream_ = function (a) {
    goog.asserts.assert(this.manifest_, "Must not be destroyed");
    return shaka.util.StreamUtils.findPeriodContainingStream(this.manifest_, a)
};
shaka.media.StreamingEngine.prototype.fetch_ = function (a) {
    var b = shaka.net.NetworkingEngine.RequestType.SEGMENT,
        c = shaka.net.NetworkingEngine.makeRequest(a.getUris(), this.config_.retryParameters);
    if (0 != a.startByte || null != a.endByte) {
        var d = "bytes=" + a.startByte + "-";
        null != a.endByte && (d += a.endByte);
        c.headers.Range = d
    }
    shaka.log.v2("fetching: reference=" + a);
    return this.playerInterface_.netEngine.request(b, c).then(function (a) {
        return a.data
    })
};
shaka.media.StreamingEngine.prototype.clearBuffer_ = function (a, b) {
    var c = shaka.media.StreamingEngine.logPrefix_(a);
    goog.asserts.assert(!a.performingUpdate && null == a.updateTimer, c + " unexpected call to clearBuffer_()");
    a.waitingToClearBuffer = !1;
    a.waitingToFlushBuffer = !1;
    a.clearingBuffer = !0;
    shaka.log.debug(c, "clearing buffer");
    this.playerInterface_.mediaSourceEngine.clear(a.type).then(function () {
        if (!this.destroyed_ && b) return this.playerInterface_.mediaSourceEngine.flush(a.type)
    }.bind(this)).then(function () {
        this.destroyed_ ||
        (shaka.log.debug(c, "cleared buffer"), a.lastStream = null, a.lastSegmentReference = null, a.clearingBuffer = !1, a.endOfStream = !1, this.scheduleUpdate_(a, 0))
    }.bind(this))
};
shaka.media.StreamingEngine.prototype.scheduleUpdate_ = function (a, b) {
    var c = shaka.media.StreamingEngine.logPrefix_(a);
    shaka.log.v2(c, "updating in " + b + " seconds");
    goog.asserts.assert(null == a.updateTimer, c + " did not expect update to be scheduled");
    a.updateTimer = window.setTimeout(this.onUpdate_.bind(this, a), 1E3 * b)
};
shaka.media.StreamingEngine.prototype.cancelUpdate_ = function (a) {
    null != a.updateTimer && (window.clearTimeout(a.updateTimer), a.updateTimer = null)
};
shaka.media.StreamingEngine.prototype.handleStreamingError_ = function (a) {
    this.failureCallbackBackoff_.attempt().then(function () {
        this.playerInterface_.onError(a);
        a.handled || this.config_.failureCallback(a)
    }.bind(this))
};
shaka.media.StreamingEngine.logPrefix_ = function (a) {
    return "(" + a.type + ":" + a.stream.id + ")"
};
shaka.net.HttpPlugin = function (a, b) {
    return new Promise(function (c, d) {
        var e = new XMLHttpRequest;
        e.open(b.method, a, !0);
        e.responseType = "arraybuffer";
        e.timeout = b.retryParameters.timeout;
        e.withCredentials = b.allowCrossSiteCredentials;
        e.onload = function (b) {
            b = b.target;
            goog.asserts.assert(b, "XHR onload has no target!");
            var e = b.getAllResponseHeaders().split("\r\n").reduce(function (a, b) {
                var c = b.split(": ");
                a[c[0].toLowerCase()] = c.slice(1).join(": ");
                return a
            }, {});
            if (200 <= b.status && 299 >= b.status && 202 != b.status) b.responseURL &&
            (a = b.responseURL), c({uri: a, data: b.response, headers: e, fromCache: !!e["x-shaka-from-cache"]}); else {
                var f = null;
                try {
                    f = shaka.util.StringUtils.fromBytesAutoDetect(b.response)
                } catch (l) {
                }
                shaka.log.debug("HTTP error text:", f);
                d(new shaka.util.Error(401 == b.status || 403 == b.status ? shaka.util.Error.Severity.CRITICAL : shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.BAD_HTTP_STATUS, a, b.status, f, e))
            }
        };
        e.onerror = function (b) {
            d(new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE,
                shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.HTTP_ERROR, a))
        };
        e.ontimeout = function (b) {
            d(new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.TIMEOUT, a))
        };
        for (var f in b.headers) e.setRequestHeader(f, b.headers[f]);
        e.send(b.body)
    })
};
goog.exportSymbol("shaka.net.HttpPlugin", shaka.net.HttpPlugin);
shaka.net.NetworkingEngine.registerScheme("http", shaka.net.HttpPlugin);
shaka.net.NetworkingEngine.registerScheme("https", shaka.net.HttpPlugin);
shaka.offline = {};
shaka.offline.IStorageEngine = function () {
};
shaka.offline.DBEngine = function () {
    goog.asserts.assert(shaka.offline.DBEngine.isSupported(), "DBEngine should not be called when DBEngine is not supported");
    this.db_ = null;
    this.operations_ = [];
    this.currentIdMap_ = {}
};
shaka.offline.DBEngine.DB_NAME_ = "shaka_offline_db";
shaka.offline.DBEngine.DB_VERSION_ = 1;
shaka.offline.DBEngine.isSupported = function () {
    return null != window.indexedDB
};
shaka.offline.DBEngine.deleteDatabase = function () {
    if (!window.indexedDB) return Promise.resolve();
    var a = window.indexedDB.deleteDatabase(shaka.offline.DBEngine.DB_NAME_), b = new shaka.util.PublicPromise;
    a.onsuccess = function (a) {
        goog.asserts.assert(null == a.newVersion, "Unexpected database update");
        b.resolve()
    };
    a.onerror = shaka.offline.DBEngine.onError_.bind(null, a, b);
    return b
};
shaka.offline.DBEngine.prototype.initialized = function () {
    return null != this.db_
};
shaka.offline.DBEngine.prototype.init = function (a, b) {
    goog.asserts.assert(!this.db_, "Already initialized");
    return this.createConnection_(a, b).then(function () {
        var b = Object.keys(a);
        return Promise.all(b.map(function (a) {
            return this.getNextId_(a).then(function (b) {
                this.currentIdMap_[a] = b
            }.bind(this))
        }.bind(this)))
    }.bind(this))
};
shaka.offline.DBEngine.prototype.destroy = function () {
    return Promise.all(this.operations_.map(function (a) {
        try {
            a.transaction.abort()
        } catch (b) {
        }
        return a.promise["catch"](shaka.util.Functional.noop)
    })).then(function () {
        goog.asserts.assert(0 == this.operations_.length, "All operations should have been closed");
        this.db_ && (this.db_.close(), this.db_ = null)
    }.bind(this))
};
shaka.offline.DBEngine.prototype.get = function (a, b) {
    var c;
    return this.createTransaction_(a, "readonly", function (a) {
        c = a.get(b)
    }).then(function () {
        return c.result
    })
};
shaka.offline.DBEngine.prototype.forEach = function (a, b) {
    return this.createTransaction_(a, "readonly", function (a) {
        a.openCursor().onsuccess = function (a) {
            if (a = a.target.result) b(a.value), a["continue"]()
        }
    })
};
shaka.offline.DBEngine.prototype.insert = function (a, b) {
    return this.createTransaction_(a, "readwrite", function (a) {
        a.put(b)
    })
};
shaka.offline.DBEngine.prototype.remove = function (a, b) {
    return this.createTransaction_(a, "readwrite", function (a) {
        a["delete"](b)
    })
};
shaka.offline.DBEngine.prototype.removeKeys = function (a, b, c) {
    return this.createTransaction_(a, "readwrite", function (a) {
        for (var d = 0; d < b.length; d++) a["delete"](b[d]).onsuccess = c || function (a) {
        }
    })
};
shaka.offline.DBEngine.prototype.reserveId = function (a) {
    goog.asserts.assert(a in this.currentIdMap_, "Store name must be passed to init()");
    return this.currentIdMap_[a]++
};
shaka.offline.DBEngine.prototype.getNextId_ = function (a) {
    var b = 0;
    return this.createTransaction_(a, "readonly", function (a) {
        a.openCursor(null, "prev").onsuccess = function (a) {
            (a = a.target.result) && (b = a.key + 1)
        }
    }).then(function () {
        return b
    })
};
shaka.offline.DBEngine.prototype.createTransaction_ = function (a, b, c) {
    goog.asserts.assert(this.db_, "DBEngine must not be destroyed");
    goog.asserts.assert("readonly" == b || "readwrite" == b, 'Type must be "readonly" or "readwrite"');
    var d = {transaction: this.db_.transaction([a], b), promise: new shaka.util.PublicPromise};
    d.transaction.oncomplete = function (a) {
        this.closeOperation_(d);
        d.promise.resolve()
    }.bind(this);
    d.transaction.onabort = function (a) {
        this.closeOperation_(d);
        shaka.offline.DBEngine.onError_(d.transaction,
            d.promise, a)
    }.bind(this);
    d.transaction.onerror = function (a) {
        a.preventDefault()
    }.bind(this);
    a = d.transaction.objectStore(a);
    c(a);
    this.operations_.push(d);
    return d.promise
};
shaka.offline.DBEngine.prototype.closeOperation_ = function (a) {
    a = this.operations_.indexOf(a);
    goog.asserts.assert(0 <= a, "Operation must be in the list.");
    this.operations_.splice(a, 1)
};
shaka.offline.DBEngine.prototype.createConnection_ = function (a, b) {
    var c = shaka.offline.DBEngine, d = window.indexedDB.open(c.DB_NAME_, c.DB_VERSION_), e = !1,
        f = new shaka.util.PublicPromise;
    d.onupgradeneeded = function (b) {
        e = !0;
        var c = b.target.result;
        goog.asserts.assert(0 == b.oldVersion, "Must be upgrading from version 0");
        goog.asserts.assert(0 == c.objectStoreNames.length, "Version 0 database should be empty");
        for (var d in a) c.createObjectStore(d, {keyPath: a[d]})
    };
    d.onsuccess = function (c) {
        b && !e ? (c.target.result.close(),
            shaka.log.info("Didn't get an upgrade event... trying again."), setTimeout(function () {
            this.createConnection_(a, b - 1).then(f.resolve, f.reject)
        }.bind(this), 1E3)) : (goog.asserts.assert(void 0 == b || e, "Should get upgrade event"), this.db_ = c.target.result, f.resolve())
    }.bind(this);
    d.onerror = c.onError_.bind(null, d, f);
    return f
};
shaka.offline.DBEngine.onError_ = function (a, b, c) {
    a.error ? b.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.INDEXED_DB_ERROR, a.error)) : b.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.OPERATION_ABORTED));
    c.preventDefault()
};
shaka.offline.OfflineUtils = {};
shaka.offline.OfflineUtils.DB_SCHEME = {manifest: "key", segment: "key"};
shaka.offline.OfflineUtils.getStoredContent = function (a) {
    goog.asserts.assert(0 < a.periods.length, "Must be at least one Period.");
    var b = new shaka.media.PresentationTimeline(null, 0),
        c = shaka.offline.OfflineUtils.reconstructPeriod(a.periods[0], [], b),
        b = shaka.util.StreamUtils.getVariantTracks(c, null, null), c = shaka.util.StreamUtils.getTextTracks(c, null);
    b.push.apply(b, c);
    return {
        offlineUri: "offline:" + a.key,
        originalManifestUri: a.originalManifestUri,
        duration: a.duration,
        size: a.size,
        expiration: void 0 == a.expiration ?
            Infinity : a.expiration,
        tracks: b,
        appMetadata: a.appMetadata
    }
};
shaka.offline.OfflineUtils.reconstructPeriod = function (a, b, c) {
    var d = shaka.offline.OfflineUtils, e = shaka.util.ManifestParserUtils.ContentType,
        f = a.streams.filter(function (a) {
            return a.contentType == e.TEXT
        }), g = a.streams.filter(function (a) {
            return a.contentType == e.AUDIO
        }), h = a.streams.filter(function (a) {
            return a.contentType == e.VIDEO
        });
    b = d.createVariants_(g, h, b);
    f = f.map(d.createStream_);
    a.streams.forEach(function (b) {
        b = d.getSegmentReferences_(b);
        c.notifySegments(a.startTime, b)
    });
    return {
        startTime: a.startTime,
        variants: b, textStreams: f
    }
};
shaka.offline.OfflineUtils.getSegmentReferences_ = function (a) {
    return a.segments.map(function (a, c) {
        return new shaka.media.SegmentReference(c, a.startTime, a.endTime, function () {
            return [a.uri]
        }, 0, null)
    })
};
shaka.offline.OfflineUtils.createVariants_ = function (a, b, c) {
    var d = [];
    if (!a.length && !b.length) return d;
    a.length ? b.length || (b = [null]) : a = [null];
    for (var e = shaka.offline.OfflineUtils, f = 0, g = 0; g < a.length; g++) for (var h = 0; h < b.length; h++) if (e.areCompatible_(a[g], b[h])) {
        var k = e.createVariant_(a[g], b[h], c, f++);
        d.push(k)
    }
    return d
};
shaka.offline.OfflineUtils.areCompatible_ = function (a, b) {
    if (!(a && b && a.variantIds && b.variantIds)) return !0;
    for (var c = 0; c < a.variantIds.length; c++) if (b.variantIds.some(function (b) {
            return b == a.variantIds[c]
        })) return !0;
    return !1
};
shaka.offline.OfflineUtils.createVariant_ = function (a, b, c, d) {
    return {
        id: d,
        language: a ? a.language : "",
        primary: !!a && a.primary || !!b && b.primary,
        audio: shaka.offline.OfflineUtils.createStream_(a),
        video: shaka.offline.OfflineUtils.createStream_(b),
        bandwidth: 0,
        drmInfos: c,
        allowedByApplication: !0,
        allowedByKeySystem: !0
    }
};
shaka.offline.OfflineUtils.createStream_ = function (a) {
    if (!a) return null;
    var b = shaka.offline.OfflineUtils.getSegmentReferences_(a), b = new shaka.media.SegmentIndex(b),
        c = a.initSegmentUri ? new shaka.media.InitSegmentReference(function () {
            return [a.initSegmentUri]
        }, 0, null) : null;
    return {
        id: a.id,
        createSegmentIndex: Promise.resolve.bind(Promise),
        findSegmentPosition: b.find.bind(b),
        getSegmentReference: b.get.bind(b),
        initSegmentReference: c,
        presentationTimeOffset: a.presentationTimeOffset,
        mimeType: a.mimeType,
        codecs: a.codecs,
        width: a.width || void 0,
        height: a.height || void 0,
        frameRate: a.frameRate || void 0,
        kind: a.kind,
        encrypted: a.encrypted,
        keyId: a.keyId,
        language: a.language,
        label: a.label || null,
        type: a.contentType,
        primary: a.primary,
        trickModeVideo: null,
        containsEmsgBoxes: !1,
        roles: [],
        channelsCount: null
    }
};
shaka.offline.OfflineUtils.isStorageEngineSupported = function () {
    return shaka.offline.DBEngine.isSupported()
};
shaka.offline.OfflineUtils.createStorageEngine = function () {
    return shaka.offline.DBEngine.isSupported() ? new shaka.offline.DBEngine : null
};
shaka.offline.DownloadManager = function (a, b, c, d) {
    this.segments_ = {};
    this.storedSegments_ = [];
    this.config_ = d;
    this.storageEngine_ = a;
    this.netEngine_ = b;
    this.retryParams_ = c;
    this.promise_ = this.manifest_ = null;
    this.bandwidthBytesDownloaded_ = this.bandwidthBytesTotal_ = this.givenBytesDownloaded_ = this.givenBytesTotal_ = 0
};
shaka.offline.DownloadManager.prototype.destroy = function () {
    var a = this.storageEngine_, b = this.storedSegments_, c = this.promise_ || Promise.resolve();
    b.length && (c = c.then(function () {
        return a.removeKeys("segment", b)
    }));
    this.segments_ = {};
    this.storedSegments_ = [];
    this.promise_ = this.manifest_ = this.retryParams_ = this.netEngine_ = this.storageEngine_ = this.config_ = null;
    return c
};
shaka.offline.DownloadManager.prototype.addSegment = function (a, b, c, d) {
    this.segments_[a] = this.segments_[a] || [];
    this.segments_[a].push({
        uris: b.getUris(),
        startByte: b.startByte,
        endByte: b.endByte,
        bandwidthSize: c,
        segmentDb: d
    })
};
shaka.offline.DownloadManager.prototype.downloadAndStore = function (a) {
    var b = shaka.util.MapUtils;
    this.bandwidthBytesDownloaded_ = this.bandwidthBytesTotal_ = this.givenBytesDownloaded_ = this.givenBytesTotal_ = 0;
    b.values(this.segments_).forEach(function (a) {
        a.forEach(function (a) {
            null != a.endByte ? this.givenBytesTotal_ += a.endByte - a.startByte + 1 : this.bandwidthBytesTotal_ += a.bandwidthSize
        }.bind(this))
    }.bind(this));
    this.manifest_ = a;
    this.manifest_.size = this.givenBytesTotal_;
    b = b.values(this.segments_).map(function (a) {
        var b =
            0, c = function () {
            if (!this.config_) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.OPERATION_ABORTED));
            if (b >= a.length) return Promise.resolve();
            var d = a[b++];
            return this.downloadSegment_(d).then(c)
        }.bind(this);
        return c()
    }.bind(this));
    this.segments_ = {};
    return this.promise_ = Promise.all(b).then(function () {
        return this.storageEngine_.insert("manifest", a)
    }.bind(this)).then(function () {
        this.storedSegments_ = []
    }.bind(this))
};
shaka.offline.DownloadManager.prototype.downloadSegment_ = function (a) {
    goog.asserts.assert(this.retryParams_, "DownloadManager must not be destroyed");
    var b = shaka.net.NetworkingEngine.RequestType.SEGMENT,
        c = shaka.net.NetworkingEngine.makeRequest(a.uris, this.retryParams_);
    if (0 != a.startByte || null != a.endByte) c.headers.Range = "bytes=" + a.startByte + "-" + (null == a.endByte ? "" : a.endByte);
    var d;
    return this.netEngine_.request(b, c).then(function (b) {
        if (!this.manifest_) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
            shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.OPERATION_ABORTED));
        d = b.data.byteLength;
        this.storedSegments_.push(a.segmentDb.key);
        a.segmentDb.data = b.data;
        return this.storageEngine_.insert("segment", a.segmentDb)
    }.bind(this)).then(function () {
        if (!this.manifest_) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.OPERATION_ABORTED));
        null == a.endByte ? (this.manifest_.size += d, this.bandwidthBytesDownloaded_ += a.bandwidthSize) :
            (goog.asserts.assert(d == a.endByte - a.startByte + 1, "Incorrect download size"), this.givenBytesDownloaded_ += d);
        this.updateProgress_()
    }.bind(this))
};
shaka.offline.DownloadManager.prototype.updateProgress_ = function () {
    var a = (this.givenBytesDownloaded_ + this.bandwidthBytesDownloaded_) / (this.givenBytesTotal_ + this.bandwidthBytesTotal_);
    goog.asserts.assert(this.manifest_, "Must not be destroyed");
    var b = shaka.offline.OfflineUtils.getStoredContent(this.manifest_);
    this.config_.progressCallback(b, a)
};
shaka.offline.OfflineManifestParser = function () {
    this.manifestId_ = -1
};
shaka.offline.OfflineManifestParser.prototype.configure = function (a) {
};
shaka.offline.OfflineManifestParser.prototype.start = function (a, b) {
    var c = /^offline:([0-9]+)$/.exec(a);
    if (!c) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.MALFORMED_OFFLINE_URI, a));
    var d = Number(c[1]), e = shaka.offline.OfflineUtils.createStorageEngine();
    this.manifestId_ = d;
    return e ? e.init(shaka.offline.OfflineUtils.DB_SCHEME).then(function () {
        return e.get("manifest", d)
    }).then(function (a) {
        if (!a) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
            shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.REQUESTED_ITEM_NOT_FOUND, d);
        return shaka.offline.OfflineManifestParser.reconstructManifest(a)
    }).then(function (a) {
        return e.destroy().then(function () {
            return a
        })
    }, function (a) {
        return e.destroy().then(function () {
            throw a;
        })
    }) : Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.STORAGE_NOT_SUPPORTED))
};
shaka.offline.OfflineManifestParser.prototype.stop = function () {
    return Promise.resolve()
};
shaka.offline.OfflineManifestParser.prototype.update = function () {
};
shaka.offline.OfflineManifestParser.prototype.onExpirationUpdated = function (a, b) {
    var c = shaka.offline.OfflineUtils.createStorageEngine();
    goog.asserts.assert(c, "Must support offline storage");
    c.init(shaka.offline.OfflineUtils.DB_SCHEME).then(function () {
        return c.get("manifest", this.manifestId_)
    }.bind(this)).then(function (d) {
        if (d) if (0 > d.sessionIds.indexOf(a)) shaka.log.debug("Ignoring updated expiration for unknown session"); else if (void 0 == d.expiration || d.expiration > b) return shaka.log.debug("Updating expiration for stored content"),
            d.expiration = b, c.insert("manifest", d)
    })["catch"](function (a) {
        shaka.log.error("Error updating offline manifest expiration", a)
    }).then(function () {
        return c.destroy()
    })
};
shaka.offline.OfflineManifestParser.reconstructManifest = function (a) {
    var b = new shaka.media.PresentationTimeline(null, 0);
    b.setDuration(a.duration);
    var c = a.drmInfo ? [a.drmInfo] : [];
    return {
        presentationTimeline: b,
        minBufferTime: 10,
        offlineSessionIds: a.sessionIds,
        periods: a.periods.map(function (a) {
            return shaka.offline.OfflineUtils.reconstructPeriod(a, c, b)
        })
    }
};
shaka.media.ManifestParser.registerParserByMime("application/x-offline-manifest", shaka.offline.OfflineManifestParser);
shaka.offline.OfflineScheme = function (a, b) {
    if (/^offline:([0-9]+)$/.exec(a)) {
        var c = {uri: a, data: new ArrayBuffer(0), headers: {"content-type": "application/x-offline-manifest"}};
        return Promise.resolve(c)
    }
    if (c = /^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(a)) {
        var d = Number(c[1]), c = shaka.offline.OfflineUtils.DB_SCHEME,
            e = shaka.offline.OfflineUtils.createStorageEngine();
        return e ? e.init(c).then(function () {
            return e.get("segment", d)
        }).then(function (b) {
            return e.destroy().then(function () {
                if (!b) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
                    shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.REQUESTED_ITEM_NOT_FOUND, d);
                return {uri: a, data: b.data, headers: {}}
            })
        }) : Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.STORAGE_NOT_SUPPORTED))
    }
    return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.MALFORMED_OFFLINE_URI, a))
};
goog.exportSymbol("shaka.offline.OfflineScheme", shaka.offline.OfflineScheme);
shaka.net.NetworkingEngine.registerScheme("offline", shaka.offline.OfflineScheme);
shaka.text.SimpleTextDisplayer = function (a) {
    this.textTrack_ = null;
    for (var b = 0; b < a.textTracks.length; ++b) {
        var c = a.textTracks[b];
        c.mode = "disabled";
        c.label == shaka.text.SimpleTextDisplayer.TextTrackLabel_ && (this.textTrack_ = c)
    }
    this.textTrack_ || (this.textTrack_ = a.addTextTrack("subtitles", shaka.text.SimpleTextDisplayer.TextTrackLabel_));
    this.textTrack_.mode = "hidden";
    this.textTrackCues_ = this.textTrack_.cues;
    goog.asserts.assert(this.textTrackCues_, 'Cues should be accessible when mode is set to "hidden".')
};
goog.exportSymbol("shaka.text.SimpleTextDisplayer", shaka.text.SimpleTextDisplayer);
shaka.text.SimpleTextDisplayer.prototype.remove = function (a, b) {
    if (!this.textTrack_) return !1;
    this.removeWhere_(function (c) {
        return c.startTime >= b || c.endTime <= a ? !1 : !0
    });
    return !0
};
goog.exportProperty(shaka.text.SimpleTextDisplayer.prototype, "remove", shaka.text.SimpleTextDisplayer.prototype.remove);
shaka.text.SimpleTextDisplayer.prototype.append = function (a) {
    for (var b = [], c = 0; c < a.length; c++) {
        var d = this.convertToTextTrackCue_(a[c]);
        d && b.push(d)
    }
    b.slice().sort(function (a, c) {
        return a.startTime != c.startTime ? a.startTime - c.startTime : a.endTime != c.endTime ? a.endTime - c.startTime : b.indexOf(c) - b.indexOf(a)
    }).forEach(function (a) {
        this.textTrack_.addCue(a)
    }.bind(this))
};
goog.exportProperty(shaka.text.SimpleTextDisplayer.prototype, "append", shaka.text.SimpleTextDisplayer.prototype.append);
shaka.text.SimpleTextDisplayer.prototype.destroy = function () {
    this.textTrack_ && this.removeWhere_(function (a) {
        return !0
    });
    this.textTrack_ = null;
    return Promise.resolve()
};
goog.exportProperty(shaka.text.SimpleTextDisplayer.prototype, "destroy", shaka.text.SimpleTextDisplayer.prototype.destroy);
shaka.text.SimpleTextDisplayer.prototype.isTextVisible = function () {
    return "showing" == this.textTrack_.mode
};
goog.exportProperty(shaka.text.SimpleTextDisplayer.prototype, "isTextVisible", shaka.text.SimpleTextDisplayer.prototype.isTextVisible);
shaka.text.SimpleTextDisplayer.prototype.setTextVisibility = function (a) {
    this.textTrack_.mode = a ? "showing" : "hidden"
};
goog.exportProperty(shaka.text.SimpleTextDisplayer.prototype, "setTextVisibility", shaka.text.SimpleTextDisplayer.prototype.setTextVisibility);
shaka.text.SimpleTextDisplayer.prototype.convertToTextTrackCue_ = function (a) {
    if (a.startTime >= a.endTime) return shaka.log.warning("Invalid cue times: " + a.startTime + " - " + a.endTime), null;
    var b = shaka.text.Cue, c = new VTTCue(a.startTime, a.endTime, a.payload);
    c.lineAlign = a.lineAlign;
    c.positionAlign = a.positionAlign;
    c.size = a.size;
    try {
        c.align = a.textAlign
    } catch (d) {
    }
    "center" == a.textAlign && "center" != c.align && (c.align = "middle");
    a.writingDirection == b.writingDirection.VERTICAL_LEFT_TO_RIGHT ? c.vertical = "lr" : a.writingDirection ==
        b.writingDirection.VERTICAL_RIGHT_TO_LEFT && (c.vertical = "rl");
    a.lineInterpretation == b.lineInterpretation.PERCENTAGE && (c.snapToLines = !1);
    null != a.line && (c.line = a.line);
    null != a.position && (c.position = a.position);
    window.VTTRegion && a.region && (b = new VTTRegion, b.viewportAnchorX = a.region.x, b.viewportAnchorY = a.region.y, b.width = a.region.width, b.height = a.region.height, c.region = b);
    return c
};
shaka.text.SimpleTextDisplayer.prototype.removeWhere_ = function (a) {
    for (var b = this.textTrackCues_, c = [], d = 0; d < b.length; ++d) a(b[d]) && c.push(b[d]);
    for (d = 0; d < c.length; ++d) this.textTrack_.removeCue(c[d])
};
shaka.text.SimpleTextDisplayer.TextTrackLabel_ = "Shaka Player TextTrack";
shaka.util.CancelableChain = function () {
    this.promise_ = Promise.resolve();
    this.canceled_ = this.complete_ = this.final_ = !1;
    this.cancelPromise_ = new Promise(function (a) {
        this.onCancelComplete_ = a
    }.bind(this))
};
shaka.util.CancelableChain.prototype.then = function (a) {
    goog.asserts.assert(!this.final_, "Chain should not be final!");
    this.promise_ = this.promise_.then(a).then(function (a) {
        return this.canceled_ ? (this.onCancelComplete_(), Promise.reject(this.rejectionValue_)) : Promise.resolve(a)
    }.bind(this));
    return this
};
shaka.util.CancelableChain.prototype.finalize = function () {
    this.final_ || (this.promise_ = this.promise_.then(function (a) {
        this.complete_ = !0;
        return Promise.resolve(a)
    }.bind(this), function (a) {
        this.complete_ = !0;
        return this.canceled_ ? (this.onCancelComplete_(), Promise.reject(this.rejectionValue_)) : Promise.reject(a)
    }.bind(this)));
    this.final_ = !0;
    return this.promise_
};
shaka.util.CancelableChain.prototype.cancel = function (a) {
    if (this.complete_) return Promise.resolve();
    this.canceled_ = !0;
    this.rejectionValue_ = a;
    return this.cancelPromise_
};
shaka.Player = function (a, b) {
    shaka.util.FakeEventTarget.call(this);
    this.destroyed_ = !1;
    this.video_ = a;
    this.textVisibility_ = !1;
    this.textDisplayer_ = null;
    this.eventManager_ = new shaka.util.EventManager;
    this.abrManager_ = this.manifestUri_ = this.manifest_ = this.parser_ = this.streamingEngine_ = this.playheadObserver_ = this.playhead_ = this.mediaSourceOpen_ = this.mediaSourceEngine_ = this.mediaSource_ = this.drmEngine_ = this.networkingEngine_ = null;
    this.nextExternalStreamId_ = 1E9;
    this.loadingTextStreamIds_ = [];
    this.buffering_ =
        !1;
    this.switchingPeriods_ = !0;
    this.deferredVariant_ = this.unloadChain_ = this.loadChain_ = null;
    this.deferredVariantClearBuffer_ = !1;
    this.deferredTextStream_ = null;
    this.pendingTimelineRegions_ = [];
    this.activeStreamsByPeriod_ = {};
    this.config_ = this.defaultConfig_();
    this.maxHwRes_ = {width: Infinity, height: Infinity};
    this.stats_ = this.getCleanStats_();
    this.lastTimeStatsUpdateTimestamp_ = 0;
    this.currentAudioLanguage_ = this.config_.preferredAudioLanguage;
    this.currentTextLanguage_ = this.config_.preferredTextLanguage;
    this.currentTextRole_ =
        this.currentVariantRole_ = "";
    this.infiniteRetriesForLiveStreams_ = !0;
    b && b(this);
    this.networkingEngine_ = this.createNetworkingEngine();
    this.initialize_()
};
goog.inherits(shaka.Player, shaka.util.FakeEventTarget);
goog.exportSymbol("shaka.Player", shaka.Player);
shaka.Player.prototype.cancelLoadChain_ = function () {
    if (!this.loadChain_) return Promise.resolve();
    var a = Promise.resolve();
    this.parser_ && (a = this.parser_.stop(), this.parser_ = null);
    var b = this.loadChain_.cancel(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.PLAYER, shaka.util.Error.Code.LOAD_INTERRUPTED));
    return Promise.all([a, b])
};
shaka.Player.prototype.destroy = function () {
    this.destroyed_ = !0;
    return this.cancelLoadChain_().then(function () {
        var a = Promise.all([this.unloadChain_, this.destroyStreaming_(), this.eventManager_ ? this.eventManager_.destroy() : null, this.networkingEngine_ ? this.networkingEngine_.destroy() : null]);
        this.video_ = null;
        this.textVisibility_ = !1;
        this.config_ = this.networkingEngine_ = this.abrManager_ = this.eventManager_ = null;
        return a
    }.bind(this))
};
goog.exportProperty(shaka.Player.prototype, "destroy", shaka.Player.prototype.destroy);
var GIT_VERSION = "v2.2.8";
shaka.Player.version = GIT_VERSION;
goog.exportProperty(shaka.Player, "version", shaka.Player.version);
shaka.Player.supportPlugins_ = {};
shaka.Player.registerSupportPlugin = function (a, b) {
    shaka.Player.supportPlugins_[a] = b
};
goog.exportProperty(shaka.Player, "registerSupportPlugin", shaka.Player.registerSupportPlugin);
shaka.Player.isBrowserSupported = function () {
    return !!window.Promise && !!window.Uint8Array && !!Array.prototype.forEach && shaka.media.MediaSourceEngine.isBrowserSupported() && shaka.media.DrmEngine.isBrowserSupported()
};
goog.exportProperty(shaka.Player, "isBrowserSupported", shaka.Player.isBrowserSupported);
shaka.Player.probeSupport = function () {
    goog.asserts.assert(shaka.Player.isBrowserSupported(), "Must have basic support");
    return shaka.media.DrmEngine.probeSupport().then(function (a) {
        var b = shaka.media.ManifestParser.probeSupport(), c = shaka.media.MediaSourceEngine.probeSupport();
        a = {manifest: b, media: c, drm: a};
        var b = shaka.Player.supportPlugins_, d;
        for (d in b) a[d] = b[d]();
        return a
    })
};
goog.exportProperty(shaka.Player, "probeSupport", shaka.Player.probeSupport);
shaka.Player.prototype.load = function (a, b, c) {
    var d = this.unload(), e = new shaka.util.CancelableChain;
    this.loadChain_ = e;
    this.dispatchEvent(new shaka.util.FakeEvent("loading"));
    var f = Date.now();
    return e.then(function () {
        return d
    }).then(function () {
        shaka.log.debug("Unload latency:", (Date.now() - f) / 1E3);
        this.stats_ = this.getCleanStats_();
        this.eventManager_.listen(this.video_, "playing", this.updateState_.bind(this));
        this.eventManager_.listen(this.video_, "pause", this.updateState_.bind(this));
        this.eventManager_.listen(this.video_,
            "ended", this.updateState_.bind(this));
        this.abrManager_ = new this.config_.abrFactory;
        this.configureAbrManager_();
        this.textDisplayer_ = new this.config_.textDisplayFactory;
        this.textDisplayer_.setTextVisibility(this.textVisibility_);
        goog.asserts.assert(this.networkingEngine_, "Must not be destroyed");
        return shaka.media.ManifestParser.getFactory(a, this.networkingEngine_, this.config_.manifest.retryParameters, c)
    }.bind(this)).then(function (b) {
        this.parser_ = new b;
        this.parser_.configure(this.config_.manifest);
        goog.asserts.assert(this.networkingEngine_, "Must not be destroyed");
        b = {
            networkingEngine: this.networkingEngine_,
            filterNewPeriod: this.filterNewPeriod_.bind(this),
            filterAllPeriods: this.filterAllPeriods_.bind(this),
            onTimelineRegionAdded: this.onTimelineRegionAdded_.bind(this),
            onEvent: this.onEvent_.bind(this),
            onError: this.onError_.bind(this)
        };
        return 2 < this.parser_.start.length ? (goog.asserts.assert(!1, "Old ManifestParser interface is deprecated"), shaka.log.alwaysWarn("The ManifestParser interface has changed. Please upgrade your plugin to accept the PlayerInterface structure. See the ManifestParser documentation for details."),
            this.parser_.start(a, this.networkingEngine_, b.filterNewPeriod, b.onError, b.onEvent)) : this.parser_.start(a, b)
    }.bind(this)).then(function (b) {
        b.periods.some(function (a) {
            return a.variants.some(function (a) {
                return a.video && a.audio
            })
        }) && (shaka.log.debug("Found variant with audio and video content, so filtering all periods."), b.periods.forEach(function (a) {
            a.variants = a.variants.filter(function (a) {
                return a.video && a.audio
            })
        }));
        if (0 == b.periods.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
            shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.NO_PERIODS);
        this.manifest_ = b;
        this.manifestUri_ = a;
        this.drmEngine_ = this.createDrmEngine();
        this.drmEngine_.configure(this.config_.drm);
        return this.drmEngine_.init(b, !1)
    }.bind(this)).then(function () {
        this.filterAllPeriods_(this.manifest_.periods);
        this.lastTimeStatsUpdateTimestamp_ = Date.now() / 1E3;
        this.currentAudioLanguage_ = this.config_.preferredAudioLanguage;
        this.currentTextLanguage_ = this.config_.preferredTextLanguage;
        var a = this.manifest_.presentationTimeline.getDuration(),
            b = this.config_.playRangeEnd, c = this.config_.playRangeStart;
        0 < c && (this.isLive() ? shaka.log.warning("PlayerConfiguration.playRangeStart has been configured for live content. Ignoring the setting.") : this.manifest_.presentationTimeline.setAvailabilityStart(c));
        b < a && (this.isLive() ? shaka.log.warning("PlayerConfiguration.playRangeEnd has been configured for live content. Ignoring the setting.") : this.manifest_.presentationTimeline.setDuration(b));
        return Promise.all([this.drmEngine_.attach(this.video_), this.mediaSourceOpen_])
    }.bind(this)).then(function () {
        this.abrManager_.chooseStreams ?
            (shaka.log.alwaysWarn("AbrManager API has changed. The SwitchCallback signature has changed to accept a variant instead of a map. Please update your AbrManager. The old API will be removed in v2.3."), this.abrManager_.init(this.switchV21_.bind(this))) : this.abrManager_.init(this.switch_.bind(this));
        this.playhead_ = this.createPlayhead(b);
        this.playheadObserver_ = this.createPlayheadObserver();
        this.mediaSourceEngine_ = this.createMediaSourceEngine();
        this.streamingEngine_ = this.createStreamingEngine();
        this.streamingEngine_.configure(this.config_.streaming);
        var a = new shaka.util.FakeEvent("streaming");
        this.dispatchEvent(a);
        this.chooseCodecsAndFilterManifest_();
        return this.streamingEngine_.init()
    }.bind(this)).then(function () {
        if (this.config_.streaming.startAtSegmentBoundary) {
            var a = this.adjustStartTime_(this.playhead_.getTime());
            this.playhead_.setStartTime(a)
        }
        this.manifest_.periods.forEach(this.filterNewPeriod_.bind(this));
        this.onTracksChanged_();
        this.onAdaptation_();
        var a = this.streamingEngine_.getCurrentPeriod(), b = shaka.util.StreamUtils.filterVariantsByLanguageAndRole(a,
            this.currentAudioLanguage_, this.currentVariantRole_);
        this.abrManager_.setVariants(b);
        a = a.variants.some(function (a) {
            return a.primary
        });
        this.currentAudioLanguage_ || a || shaka.log.warning("No preferred audio language set.  We will choose an arbitrary language initially");
        this.pendingTimelineRegions_.forEach(this.playheadObserver_.addTimelineRegion.bind(this.playheadObserver_));
        this.pendingTimelineRegions_ = [];
        this.eventManager_.listenOnce(this.video_, "loadeddata", function () {
            var a = (Date.now() - f) / 1E3;
            this.stats_.loadLatency =
                a;
            shaka.log.debug("Load latency:", a)
        }.bind(this));
        this.loadChain_ = null
    }.bind(this)).finalize()["catch"](function (a) {
        goog.asserts.assert(a instanceof shaka.util.Error, "Wrong error type!");
        shaka.log.debug("load() failed:", a);
        this.loadChain_ == e && (this.loadChain_ = null, this.dispatchEvent(new shaka.util.FakeEvent("unloading")));
        return Promise.reject(a)
    }.bind(this))
};
goog.exportProperty(shaka.Player.prototype, "load", shaka.Player.prototype.load);
shaka.Player.prototype.chooseCodecsAndFilterManifest_ = function () {
    function a(a) {
        var b = a.video ? a.video.codecs.split(".")[0] : "";
        a = a.audio ? a.audio.codecs.split(".")[0] : "";
        return b + "-" + a
    }

    var b = {};
    this.manifest_.periods.forEach(function (c) {
        c.variants.forEach(function (c) {
            var d = a(c);
            d in b || (b[d] = []);
            b[d].push(c)
        })
    });
    var c = null, d = Infinity;
    shaka.util.MapUtils.forEach(b, function (a, b) {
        var e = 0, f = 0;
        b.forEach(function (a) {
            e += a.bandwidth || 0;
            ++f
        });
        var k = e / f;
        shaka.log.debug("codecs", a, "avg bandwidth", k);
        k < d && (c = a,
            d = k)
    });
    goog.asserts.assert(null != c, "Should have chosen codecs!");
    goog.asserts.assert(!isNaN(d), "Bandwidth should be a number!");
    this.manifest_.periods.forEach(function (b) {
        b.variants = b.variants.filter(function (b) {
            if (a(b) == c) return !0;
            shaka.log.debug("Dropping Variant (better codec available)", b);
            return !1
        })
    })
};
shaka.Player.prototype.createDrmEngine = function () {
    goog.asserts.assert(this.networkingEngine_, "Must not be destroyed");
    var a = {
        netEngine: this.networkingEngine_,
        onError: this.onError_.bind(this),
        onKeyStatus: this.onKeyStatus_.bind(this),
        onExpirationUpdated: this.onExpirationUpdated_.bind(this),
        onEvent: this.onEvent_.bind(this)
    };
    return new shaka.media.DrmEngine(a)
};
shaka.Player.prototype.createNetworkingEngine = function () {
    return new shaka.net.NetworkingEngine(this.onSegmentDownloaded_.bind(this))
};
shaka.Player.prototype.createPlayhead = function (a) {
    goog.asserts.assert(this.manifest_, "Must have manifest");
    return new shaka.media.Playhead(this.video_, this.manifest_, this.config_.streaming, void 0 == a ? null : a, this.onSeek_.bind(this), this.onEvent_.bind(this))
};
shaka.Player.prototype.createPlayheadObserver = function () {
    goog.asserts.assert(this.manifest_, "Must have manifest");
    return new shaka.media.PlayheadObserver(this.video_, this.mediaSource_, this.manifest_, this.config_.streaming, this.onBuffering_.bind(this), this.onEvent_.bind(this), this.onChangePeriod_.bind(this))
};
shaka.Player.prototype.createMediaSource = function () {
    this.mediaSource_ = new MediaSource;
    var a = new shaka.util.PublicPromise;
    this.eventManager_.listen(this.mediaSource_, "sourceopen", a.resolve);
    this.video_.src = window.URL.createObjectURL(this.mediaSource_);
    return a
};
shaka.Player.prototype.createMediaSourceEngine = function () {
    return new shaka.media.MediaSourceEngine(this.video_, this.mediaSource_, this.textDisplayer_)
};
shaka.Player.prototype.createStreamingEngine = function () {
    goog.asserts.assert(this.playhead_ && this.playheadObserver_ && this.mediaSourceEngine_ && this.manifest_, "Must not be destroyed");
    var a = {
        playhead: this.playhead_,
        mediaSourceEngine: this.mediaSourceEngine_,
        netEngine: this.networkingEngine_,
        onChooseStreams: this.onChooseStreams_.bind(this),
        onCanSwitch: this.canSwitch_.bind(this),
        onError: this.onError_.bind(this),
        onEvent: this.onEvent_.bind(this),
        onManifestUpdate: this.onManifestUpdate_.bind(this),
        onSegmentAppended: this.onSegmentAppended_.bind(this),
        filterNewPeriod: this.filterNewPeriod_.bind(this),
        filterAllPeriods: this.filterAllPeriods_.bind(this)
    };
    return new shaka.media.StreamingEngine(this.manifest_, a)
};
shaka.Player.prototype.configure = function (a) {
    goog.asserts.assert(this.config_, "Config must not be null!");
    if (a.abr && a.abr.manager) {
        shaka.log.alwaysWarn("AbrManager configuration has changed. Please use abrFactory instead of abr.manager. The old API will be removed in v2.3.");
        var b = a.abr.manager;
        delete a.abr.manager;
        a.abrFactory = function () {
            return b
        }
    }
    a.streaming && null != a.streaming.infiniteRetriesForLiveStreams && (shaka.log.alwaysWarn("Streaming configuration has changed. Please use streaming.failureCallback instead of streaming.infiniteRetriesForLiveStreams. The old API will be removed in v2.3."),
        this.infiniteRetriesForLiveStreams_ = !!a.streaming.infiniteRetriesForLiveStreams, delete a.streaming.infiniteRetriesForLiveStreams);
    shaka.util.ConfigUtils.mergeConfigObjects(this.config_, a, this.defaultConfig_(), this.configOverrides_(), "");
    this.applyConfig_()
};
goog.exportProperty(shaka.Player.prototype, "configure", shaka.Player.prototype.configure);
shaka.Player.prototype.applyConfig_ = function () {
    this.parser_ && this.parser_.configure(this.config_.manifest);
    this.drmEngine_ && this.drmEngine_.configure(this.config_.drm);
    if (this.streamingEngine_) {
        this.streamingEngine_.configure(this.config_.streaming);
        try {
            this.manifest_.periods.forEach(this.filterNewPeriod_.bind(this))
        } catch (d) {
            this.onError_(d)
        }
        var a = this.streamingEngine_.getActiveStreams(), b = shaka.util.ManifestParserUtils.ContentType,
            c = a[b.AUDIO], b = a[b.VIDEO], a = this.streamingEngine_.getCurrentPeriod(),
            c = shaka.util.StreamUtils.getVariantByStreams(c, b, a.variants);
        c && c.allowedByApplication && c.allowedByKeySystem || (shaka.log.debug("Choosing new streams after changing configuration"), this.chooseStreamsAndSwitch_(a))
    }
    this.abrManager_ && (this.configureAbrManager_(), this.config_.abr.enabled && !this.switchingPeriods_ ? this.abrManager_.enable() : this.abrManager_.disable())
};
shaka.Player.prototype.configureAbrManager_ = function () {
    this.abrManager_.configure ? this.abrManager_.configure(this.config_.abr) : (shaka.log.alwaysWarn("AbrManager API has changed. AbrManager.setDefaultEstimate() and AbrManager.setRestrictions() are deprecated. AbrManager.configure() is used instead. Please upgrade to the new API. The old API will be removed in v2.3."), this.abrManager_.setDefaultEstimate(this.config_.abr.defaultBandwidthEstimate), this.abrManager_.setRestrictions(this.config_.abr.restrictions))
};
shaka.Player.prototype.getConfiguration = function () {
    goog.asserts.assert(this.config_, "Config must not be null!");
    var a = this.defaultConfig_();
    shaka.util.ConfigUtils.mergeConfigObjects(a, this.config_, this.defaultConfig_(), this.configOverrides_(), "");
    return a
};
goog.exportProperty(shaka.Player.prototype, "getConfiguration", shaka.Player.prototype.getConfiguration);
shaka.Player.prototype.resetConfiguration = function () {
    this.config_ = this.defaultConfig_();
    this.applyConfig_()
};
goog.exportProperty(shaka.Player.prototype, "resetConfiguration", shaka.Player.prototype.resetConfiguration);
shaka.Player.prototype.getMediaElement = function () {
    return this.video_
};
goog.exportProperty(shaka.Player.prototype, "getMediaElement", shaka.Player.prototype.getMediaElement);
shaka.Player.prototype.getNetworkingEngine = function () {
    return this.networkingEngine_
};
goog.exportProperty(shaka.Player.prototype, "getNetworkingEngine", shaka.Player.prototype.getNetworkingEngine);
shaka.Player.prototype.getManifestUri = function () {
    return this.manifestUri_
};
goog.exportProperty(shaka.Player.prototype, "getManifestUri", shaka.Player.prototype.getManifestUri);
shaka.Player.prototype.isLive = function () {
    return this.manifest_ ? this.manifest_.presentationTimeline.isLive() : !1
};
goog.exportProperty(shaka.Player.prototype, "isLive", shaka.Player.prototype.isLive);
shaka.Player.prototype.isInProgress = function () {
    return this.manifest_ ? this.manifest_.presentationTimeline.isInProgress() : !1
};
goog.exportProperty(shaka.Player.prototype, "isInProgress", shaka.Player.prototype.isInProgress);
shaka.Player.prototype.isAudioOnly = function () {
    if (!this.manifest_ || !this.manifest_.periods.length) return !1;
    var a = this.manifest_.periods[0].variants;
    return a.length ? !a[0].video : !1
};
goog.exportProperty(shaka.Player.prototype, "isAudioOnly", shaka.Player.prototype.isAudioOnly);
shaka.Player.prototype.seekRange = function () {
    var a = 0, b = 0;
    this.manifest_ && (b = this.manifest_.presentationTimeline, a = b.getSegmentAvailabilityStart(), b = b.getSeekRangeEnd());
    return {start: a, end: b}
};
goog.exportProperty(shaka.Player.prototype, "seekRange", shaka.Player.prototype.seekRange);
shaka.Player.prototype.keySystem = function () {
    return this.drmEngine_ ? this.drmEngine_.keySystem() : ""
};
goog.exportProperty(shaka.Player.prototype, "keySystem", shaka.Player.prototype.keySystem);
shaka.Player.prototype.drmInfo = function () {
    return this.drmEngine_ ? this.drmEngine_.getDrmInfo() : null
};
goog.exportProperty(shaka.Player.prototype, "drmInfo", shaka.Player.prototype.drmInfo);
shaka.Player.prototype.getExpiration = function () {
    return this.drmEngine_ ? this.drmEngine_.getExpiration() : Infinity
};
goog.exportProperty(shaka.Player.prototype, "getExpiration", shaka.Player.prototype.getExpiration);
shaka.Player.prototype.isBuffering = function () {
    return this.buffering_
};
goog.exportProperty(shaka.Player.prototype, "isBuffering", shaka.Player.prototype.isBuffering);
shaka.Player.prototype.unload = function () {
    if (this.destroyed_) return Promise.resolve();
    this.dispatchEvent(new shaka.util.FakeEvent("unloading"));
    return this.cancelLoadChain_().then(function () {
        this.unloadChain_ || (this.unloadChain_ = this.resetStreaming_().then(function () {
            this.unloadChain_ = null
        }.bind(this)));
        return this.unloadChain_
    }.bind(this))
};
goog.exportProperty(shaka.Player.prototype, "unload", shaka.Player.prototype.unload);
shaka.Player.prototype.getPlaybackRate = function () {
    return this.playhead_ ? this.playhead_.getPlaybackRate() : 0
};
goog.exportProperty(shaka.Player.prototype, "getPlaybackRate", shaka.Player.prototype.getPlaybackRate);
shaka.Player.prototype.trickPlay = function (a) {
    shaka.log.debug("Trick play rate", a);
    this.playhead_ && this.playhead_.setPlaybackRate(a);
    this.streamingEngine_ && this.streamingEngine_.setTrickPlay(1 != a)
};
goog.exportProperty(shaka.Player.prototype, "trickPlay", shaka.Player.prototype.trickPlay);
shaka.Player.prototype.cancelTrickPlay = function () {
    shaka.log.debug("Trick play canceled");
    this.playhead_ && this.playhead_.setPlaybackRate(1);
    this.streamingEngine_ && this.streamingEngine_.setTrickPlay(!1)
};
goog.exportProperty(shaka.Player.prototype, "cancelTrickPlay", shaka.Player.prototype.cancelTrickPlay);
shaka.Player.prototype.getVariantTracks = function () {
    if (!this.manifest_ || !this.playhead_) return [];
    this.assertCorrectActiveStreams_();
    var a = shaka.util.ManifestParserUtils.ContentType,
        b = shaka.util.StreamUtils.findPeriodContainingTime(this.manifest_, this.playhead_.getTime()),
        c = this.activeStreamsByPeriod_[b] || {};
    return shaka.util.StreamUtils.getVariantTracks(this.manifest_.periods[b], c[a.AUDIO], c[a.VIDEO])
};
goog.exportProperty(shaka.Player.prototype, "getVariantTracks", shaka.Player.prototype.getVariantTracks);
shaka.Player.prototype.getTextTracks = function () {
    if (!this.manifest_ || !this.playhead_) return [];
    this.assertCorrectActiveStreams_();
    var a = shaka.util.ManifestParserUtils.ContentType,
        b = shaka.util.StreamUtils.findPeriodContainingTime(this.manifest_, this.playhead_.getTime());
    return shaka.util.StreamUtils.getTextTracks(this.manifest_.periods[b], (this.activeStreamsByPeriod_[b] || {})[a.TEXT]).filter(function (a) {
        return 0 > this.loadingTextStreamIds_.indexOf(a.id)
    }.bind(this))
};
goog.exportProperty(shaka.Player.prototype, "getTextTracks", shaka.Player.prototype.getTextTracks);
shaka.Player.prototype.selectTextTrack = function (a) {
    if (this.streamingEngine_) {
        var b = shaka.util.StreamUtils, c = this.streamingEngine_.getCurrentPeriod();
        (b = b.findTextStreamForTrack(c, a)) ? (this.addTextStreamToSwitchHistory_(b, !1), this.switchTextStream_(b)) : shaka.log.error('Unable to find the track with id "' + a.id + '"; did we change Periods?')
    }
};
goog.exportProperty(shaka.Player.prototype, "selectTextTrack", shaka.Player.prototype.selectTextTrack);
shaka.Player.prototype.selectVariantTrack = function (a, b) {
    if (this.streamingEngine_) {
        this.config_.abr.enabled && shaka.log.alwaysWarn("Changing tracks while abr manager is enabled will likely result in the selected track being overriden. Consider disabling abr before calling selectVariantTrack().");
        var c = shaka.util.StreamUtils, d = this.streamingEngine_.getCurrentPeriod();
        (d = c.findVariantForTrack(d, a)) ? c.isPlayable(d) ? (this.addVariantToSwitchHistory_(d, !1), this.switchVariant_(d, b)) : shaka.log.error('Unable to switch to track with id "' +
            a.id + '" because it is restricted.') : shaka.log.error('Unable to locate track with id "' + a.id + '".')
    }
};
goog.exportProperty(shaka.Player.prototype, "selectVariantTrack", shaka.Player.prototype.selectVariantTrack);
shaka.Player.prototype.getAudioLanguages = function () {
    if (!this.streamingEngine_) return [];
    var a = shaka.util.StreamUtils, b = this.streamingEngine_.getCurrentPeriod();
    return a.getPlayableVariants(b.variants).map(function (a) {
        return a.language
    }).filter(shaka.util.Functional.isNotDuplicate)
};
goog.exportProperty(shaka.Player.prototype, "getAudioLanguages", shaka.Player.prototype.getAudioLanguages);
shaka.Player.prototype.getTextLanguages = function () {
    return this.streamingEngine_ ? this.streamingEngine_.getCurrentPeriod().textStreams.map(function (a) {
        return a.language
    }).filter(shaka.util.Functional.isNotDuplicate) : []
};
goog.exportProperty(shaka.Player.prototype, "getTextLanguages", shaka.Player.prototype.getTextLanguages);
shaka.Player.prototype.selectAudioLanguage = function (a, b) {
    if (this.streamingEngine_) {
        var c = this.streamingEngine_.getCurrentPeriod();
        this.currentAudioLanguage_ = a;
        this.currentVariantRole_ = b || "";
        this.chooseStreamsAndSwitch_(c)
    }
};
goog.exportProperty(shaka.Player.prototype, "selectAudioLanguage", shaka.Player.prototype.selectAudioLanguage);
shaka.Player.prototype.selectTextLanguage = function (a, b) {
    if (this.streamingEngine_) {
        var c = this.streamingEngine_.getCurrentPeriod();
        this.currentTextLanguage_ = a;
        this.currentTextRole_ = b || "";
        this.chooseStreamsAndSwitch_(c)
    }
};
goog.exportProperty(shaka.Player.prototype, "selectTextLanguage", shaka.Player.prototype.selectTextLanguage);
shaka.Player.prototype.isTextTrackVisible = function () {
    return this.textDisplayer_ ? this.textDisplayer_.isTextVisible() : this.textVisibility_
};
goog.exportProperty(shaka.Player.prototype, "isTextTrackVisible", shaka.Player.prototype.isTextTrackVisible);
shaka.Player.prototype.setTextTrackVisibility = function (a) {
    this.textDisplayer_ ? this.textDisplayer_.setTextVisibility(a) : this.textVisibility_ = a;
    this.onTextTrackVisibility_()
};
goog.exportProperty(shaka.Player.prototype, "setTextTrackVisibility", shaka.Player.prototype.setTextTrackVisibility);
shaka.Player.prototype.getPlayheadTimeAsDate = function () {
    if (!this.manifest_) return null;
    goog.asserts.assert(this.isLive(), "getPlayheadTimeAsDate should be called on a live stream!");
    var a = 1E3 * this.manifest_.presentationTimeline.getPresentationStartTime() + 1E3 * this.video_.currentTime;
    return new Date(a)
};
goog.exportProperty(shaka.Player.prototype, "getPlayheadTimeAsDate", shaka.Player.prototype.getPlayheadTimeAsDate);
shaka.Player.prototype.getPresentationStartTimeAsDate = function () {
    if (!this.manifest_) return null;
    goog.asserts.assert(this.isLive(), "getPresentationStartTimeAsDate should be called on a live stream!");
    var a = 1E3 * this.manifest_.presentationTimeline.getPresentationStartTime();
    return new Date(a)
};
goog.exportProperty(shaka.Player.prototype, "getPresentationStartTimeAsDate", shaka.Player.prototype.getPresentationStartTimeAsDate);
shaka.Player.prototype.getBufferedInfo = function () {
    return this.mediaSourceEngine_ ? this.mediaSourceEngine_.getBufferedInfo() : {
        total: [],
        audio: [],
        video: [],
        text: []
    }
};
goog.exportProperty(shaka.Player.prototype, "getBufferedInfo", shaka.Player.prototype.getBufferedInfo);
shaka.Player.prototype.getStats = function () {
    var a = shaka.util.ManifestParserUtils.ContentType;
    this.updateTimeStats_();
    this.updateState_();
    var b = null, c = null, d = this.video_, d = d && d.getVideoPlaybackQuality ? d.getVideoPlaybackQuality() : {};
    this.playhead_ && this.manifest_ && (b = shaka.util.StreamUtils.findPeriodContainingTime(this.manifest_, this.playhead_.getTime()), c = this.activeStreamsByPeriod_[b], c = shaka.util.StreamUtils.getVariantByStreamIds(c[a.AUDIO], c[a.VIDEO], this.manifest_.periods[b].variants), b = c.video ||
        {});
    b || (b = {});
    c || (c = {});
    a = shaka.util.ConfigUtils.cloneObject;
    return {
        width: b.width || 0,
        height: b.height || 0,
        streamBandwidth: c.bandwidth || 0,
        decodedFrames: Number(d.totalVideoFrames),
        droppedFrames: Number(d.droppedVideoFrames),
        estimatedBandwidth: this.abrManager_ ? this.abrManager_.getBandwidthEstimate() : NaN,
        loadLatency: this.stats_.loadLatency,
        playTime: this.stats_.playTime,
        bufferingTime: this.stats_.bufferingTime,
        switchHistory: a(this.stats_.switchHistory),
        stateHistory: a(this.stats_.stateHistory)
    }
};
goog.exportProperty(shaka.Player.prototype, "getStats", shaka.Player.prototype.getStats);
shaka.Player.prototype.addTextTrack = function (a, b, c, d, e, f) {
    if (!this.streamingEngine_) return shaka.log.error("Must call load() and wait for it to resolve before adding text tracks."), Promise.reject();
    for (var g = shaka.util.ManifestParserUtils.ContentType, h = this.streamingEngine_.getCurrentPeriod(), k, l = 0; l < this.manifest_.periods.length; l++) if (this.manifest_.periods[l] == h) {
        if (l == this.manifest_.periods.length - 1) {
            if (k = this.manifest_.presentationTimeline.getDuration() - h.startTime, Infinity == k) return shaka.log.error("The current Period or the presentation must have a duration to add external text tracks."),
                Promise.reject()
        } else k = this.manifest_.periods[l + 1].startTime - h.startTime;
        break
    }
    var m = {
        id: this.nextExternalStreamId_++,
        createSegmentIndex: Promise.resolve.bind(Promise),
        findSegmentPosition: function (a) {
            return 1
        },
        getSegmentReference: function (b) {
            return 1 != b ? null : new shaka.media.SegmentReference(1, 0, k, function () {
                return [a]
            }, 0, null)
        },
        initSegmentReference: null,
        presentationTimeOffset: 0,
        mimeType: d,
        codecs: e || "",
        kind: c,
        encrypted: !1,
        keyId: null,
        language: b,
        label: f || null,
        type: g.TEXT,
        primary: !1,
        trickModeVideo: null,
        containsEmsgBoxes: !1,
        roles: [],
        channelsCount: null
    };
    this.loadingTextStreamIds_.push(m.id);
    h.textStreams.push(m);
    return this.streamingEngine_.notifyNewTextStream(m).then(function () {
        if (!this.destroyed_) {
            var a = this.manifest_.periods.indexOf(h), d = this.streamingEngine_.getActiveStreams();
            d[g.TEXT] && (this.activeStreamsByPeriod_[a][g.TEXT] = d[g.TEXT].id);
            this.loadingTextStreamIds_.splice(this.loadingTextStreamIds_.indexOf(m.id), 1);
            shaka.log.debug("Choosing new streams after adding a text stream");
            this.chooseStreamsAndSwitch_(h);
            this.onTracksChanged_();
            return {
                id: m.id,
                active: !1,
                type: g.TEXT,
                bandwidth: 0,
                language: b,
                label: f || null,
                kind: c,
                width: null,
                height: null
            }
        }
    }.bind(this))
};
goog.exportProperty(shaka.Player.prototype, "addTextTrack", shaka.Player.prototype.addTextTrack);
shaka.Player.prototype.setMaxHardwareResolution = function (a, b) {
    this.maxHwRes_.width = a;
    this.maxHwRes_.height = b
};
goog.exportProperty(shaka.Player.prototype, "setMaxHardwareResolution", shaka.Player.prototype.setMaxHardwareResolution);
shaka.Player.prototype.retryStreaming = function () {
    return this.streamingEngine_ ? this.streamingEngine_.retry() : !1
};
goog.exportProperty(shaka.Player.prototype, "retryStreaming", shaka.Player.prototype.retryStreaming);
shaka.Player.prototype.getManifest = function () {
    return this.manifest_
};
goog.exportProperty(shaka.Player.prototype, "getManifest", shaka.Player.prototype.getManifest);
shaka.Player.prototype.initialize_ = function () {
    this.mediaSourceOpen_ = this.createMediaSource();
    this.eventManager_.listen(this.video_, "error", this.onVideoError_.bind(this))
};
shaka.Player.prototype.addVariantToSwitchHistory_ = function (a, b) {
    a.video && this.updateActiveStreams_(a.video);
    a.audio && this.updateActiveStreams_(a.audio);
    var c = shaka.util.ManifestParserUtils.ContentType, d = this.streamingEngine_.getActivePeriod(),
        e = this.streamingEngine_.getActiveStreams(),
        c = shaka.util.StreamUtils.getVariantByStreams(e[c.AUDIO], e[c.VIDEO], d ? d.variants : []);
    a != c && this.stats_.switchHistory.push({
        timestamp: Date.now() / 1E3,
        id: a.id,
        type: "variant",
        fromAdaptation: b,
        bandwidth: a.bandwidth
    })
};
shaka.Player.prototype.addTextStreamToSwitchHistory_ = function (a, b) {
    this.updateActiveStreams_(a);
    this.stats_.switchHistory.push({
        timestamp: Date.now() / 1E3,
        id: a.id,
        type: "text",
        fromAdaptation: b,
        bandwidth: null
    })
};
shaka.Player.prototype.updateActiveStreams_ = function (a) {
    goog.asserts.assert(this.manifest_, "Must not be destroyed");
    var b = shaka.util.StreamUtils.findPeriodContainingStream(this.manifest_, a);
    this.activeStreamsByPeriod_[b] || (this.activeStreamsByPeriod_[b] = {});
    this.activeStreamsByPeriod_[b][a.type] = a.id
};
shaka.Player.prototype.destroyStreaming_ = function () {
    this.eventManager_ && (this.eventManager_.unlisten(this.mediaSource_, "sourceopen"), this.eventManager_.unlisten(this.video_, "loadeddata"), this.eventManager_.unlisten(this.video_, "playing"), this.eventManager_.unlisten(this.video_, "pause"), this.eventManager_.unlisten(this.video_, "ended"));
    this.video_ && (this.video_.removeAttribute("src"), this.video_.load());
    var a = Promise.all([this.abrManager_ ? this.abrManager_.stop() : null, this.drmEngine_ ? this.drmEngine_.destroy() :
        null, this.mediaSourceEngine_ ? this.mediaSourceEngine_.destroy() : null, this.playhead_ ? this.playhead_.destroy() : null, this.playheadObserver_ ? this.playheadObserver_.destroy() : null, this.streamingEngine_ ? this.streamingEngine_.destroy() : null, this.parser_ ? this.parser_.stop() : null, this.textDisplayer_ ? this.textDisplayer_.destroy() : null]);
    this.mediaSource_ = this.mediaSourceOpen_ = this.manifestUri_ = this.manifest_ = this.textDisplayer_ = this.parser_ = this.streamingEngine_ = this.playheadObserver_ = this.playhead_ = this.mediaSourceEngine_ =
        this.drmEngine_ = null;
    this.pendingTimelineRegions_ = [];
    this.activeStreamsByPeriod_ = {};
    this.stats_ = this.getCleanStats_();
    return a
};
shaka.Player.prototype.resetStreaming_ = function () {
    return this.parser_ ? this.destroyStreaming_().then(function () {
        this.destroyed_ || (this.onBuffering_(!1), this.mediaSourceOpen_ = this.createMediaSource())
    }.bind(this)) : Promise.resolve()
};
shaka.Player.prototype.configOverrides_ = function () {
    return {
        ".drm.servers": "",
        ".drm.clearKeys": "",
        ".drm.advanced": {
            distinctiveIdentifierRequired: !1,
            persistentStateRequired: !1,
            videoRobustness: "",
            audioRobustness: "",
            serverCertificate: new Uint8Array(0)
        }
    }
};
shaka.Player.prototype.defaultConfig_ = function () {
    return {
        drm: {
            retryParameters: shaka.net.NetworkingEngine.defaultRetryParameters(),
            servers: {},
            clearKeys: {},
            advanced: {},
            delayLicenseRequestUntilPlayed: !1
        },
        manifest: {
            retryParameters: shaka.net.NetworkingEngine.defaultRetryParameters(),
            dash: {
                customScheme: function (a) {
                    if (a) return null
                }, clockSyncUri: "", ignoreDrmInfo: !1, xlinkFailGracefully: !1
            },
            hls: {defaultTimeOffset: 0}
        },
        streaming: {
            retryParameters: shaka.net.NetworkingEngine.defaultRetryParameters(),
            failureCallback: this.defaultStreamingFailureCallback_.bind(this),
            rebufferingGoal: 2,
            bufferingGoal: 10,
            bufferBehind: 30,
            ignoreTextStreamFailures: !1,
            startAtSegmentBoundary: !1,
            smallGapLimit: .5,
            jumpLargeGaps: !1,
            durationBackoff: 1
        },
        abrFactory: shaka.abr.SimpleAbrManager,
        textDisplayFactory: function (a) {
            return new shaka.text.SimpleTextDisplayer(a)
        }.bind(null, this.video_),
        abr: {
            enabled: !0,
            defaultBandwidthEstimate: 5E5,
            switchInterval: 8,
            bandwidthUpgradeTarget: .85,
            bandwidthDowngradeTarget: .95,
            restrictions: {
                minWidth: 0, maxWidth: Infinity, minHeight: 0, maxHeight: Infinity, minPixels: 0, maxPixels: Infinity,
                minBandwidth: 0, maxBandwidth: Infinity
            }
        },
        preferredAudioLanguage: "",
        preferredTextLanguage: "",
        restrictions: {
            minWidth: 0,
            maxWidth: Infinity,
            minHeight: 0,
            maxHeight: Infinity,
            minPixels: 0,
            maxPixels: Infinity,
            minBandwidth: 0,
            maxBandwidth: Infinity
        },
        playRangeStart: 0,
        playRangeEnd: Infinity
    }
};
shaka.Player.prototype.defaultStreamingFailureCallback_ = function (a) {
    var b = [shaka.util.Error.Code.BAD_HTTP_STATUS, shaka.util.Error.Code.HTTP_ERROR, shaka.util.Error.Code.TIMEOUT];
    this.isLive() && this.infiniteRetriesForLiveStreams_ && 0 <= b.indexOf(a.code) && (a.severity = shaka.util.Error.Severity.RECOVERABLE, shaka.log.warning("Live streaming error.  Retrying automatically..."), this.retryStreaming())
};
shaka.Player.prototype.getCleanStats_ = function () {
    return {
        width: NaN,
        height: NaN,
        streamBandwidth: NaN,
        decodedFrames: NaN,
        droppedFrames: NaN,
        estimatedBandwidth: NaN,
        loadLatency: NaN,
        playTime: 0,
        bufferingTime: 0,
        switchHistory: [],
        stateHistory: []
    }
};
shaka.Player.prototype.filterAllPeriods_ = function (a) {
    goog.asserts.assert(this.video_, "Must not be destroyed");
    var b = shaka.util.StreamUtils, c = this.streamingEngine_ ? this.streamingEngine_.getActiveStreams() : {};
    a.forEach(function (a) {
        b.filterNewPeriod(this.drmEngine_, c, a)
    }.bind(this));
    var d = 0;
    a.forEach(function (a) {
        0 < b.getPlayableVariants(a.variants).length && d++
    }.bind(this));
    if (0 == d) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.CONTENT_UNSUPPORTED_BY_BROWSER);
    if (d < a.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.UNPLAYABLE_PERIOD);
    a.forEach(function (a) {
        if (shaka.util.StreamUtils.applyRestrictions(a, this.config_.restrictions, this.maxHwRes_) && this.streamingEngine_ && this.streamingEngine_.getCurrentPeriod() == a) this.onTracksChanged_();
        if (1 > b.getPlayableVariants(a.variants).length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.RESTRICTIONS_CANNOT_BE_MET);
    }.bind(this))
};
shaka.Player.prototype.filterNewPeriod_ = function (a) {
    goog.asserts.assert(this.video_, "Must not be destroyed");
    var b = shaka.util.StreamUtils, c = this.streamingEngine_ ? this.streamingEngine_.getActiveStreams() : {};
    b.filterNewPeriod(this.drmEngine_, c, a);
    c = 0 < b.getPlayableVariants(a.variants).length;
    if (shaka.util.StreamUtils.applyRestrictions(a, this.config_.restrictions, this.maxHwRes_) && this.streamingEngine_ && this.streamingEngine_.getCurrentPeriod() == a) this.onTracksChanged_();
    a = 1 > b.getPlayableVariants(a.variants).length;
    if (!c) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
        shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.UNPLAYABLE_PERIOD);
    if (a) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.RESTRICTIONS_CANNOT_BE_MET);
};
shaka.Player.prototype.switchVariant_ = function (a, b) {
    this.switchingPeriods_ ? (this.deferredVariant_ = a, this.deferredVariantClearBuffer_ = b || !1) : this.streamingEngine_.switchVariant(a, b || !1)
};
shaka.Player.prototype.switchTextStream_ = function (a) {
    this.switchingPeriods_ ? this.deferredTextStream_ = a : this.streamingEngine_.switchTextStream(a)
};
shaka.Player.prototype.assertCorrectActiveStreams_ = function () {
    if (this.streamingEngine_ && this.manifest_ && goog.DEBUG) {
        var a = shaka.util.StreamUtils, b = shaka.util.ManifestParserUtils.ContentType,
            c = this.streamingEngine_.getActiveStreams(), d = c[b.VIDEO] || c[b.AUDIO];
        if (d && (a = a.findPeriodContainingStream(this.manifest_, d), d = this.manifest_.periods.indexOf(this.streamingEngine_.getCurrentPeriod()), !(0 > a || a != d))) {
            var a = this.activeStreamsByPeriod_[d] || {}, e;
            for (e in c) d = c[e].id, e == b.TEXT ? this.deferredTextStream_ &&
                (d = this.deferredTextStream_.id) : e == b.AUDIO ? this.deferredVariant_ && (d = this.deferredVariant_.audio.id) : e == b.VIDEO && this.deferredVariant_ && (d = this.deferredVariant_.video.id), goog.asserts.assert(d == a[e], "Inconsistent active stream")
        }
    }
};
shaka.Player.prototype.updateTimeStats_ = function () {
    if (this.manifest_) {
        var a = Date.now() / 1E3;
        this.buffering_ ? this.stats_.bufferingTime += a - this.lastTimeStatsUpdateTimestamp_ : this.stats_.playTime += a - this.lastTimeStatsUpdateTimestamp_;
        this.lastTimeStatsUpdateTimestamp_ = a
    }
};
shaka.Player.prototype.adjustStartTime_ = function (a) {
    function b(a, b) {
        if (!a) return null;
        var c = a.findSegmentPosition(b - d.startTime);
        if (null == c) return null;
        c = a.getSegmentReference(c);
        if (!c) return null;
        c = c.startTime + d.startTime;
        goog.asserts.assert(c <= b, "Segment should start before time");
        return c
    }

    var c = this.streamingEngine_.getActiveStreams(), d = this.streamingEngine_.getCurrentPeriod(),
        e = shaka.util.ManifestParserUtils.ContentType, f = b(c[e.VIDEO], a), c = b(c[e.AUDIO], a);
    return null != f && null != c ? Math.max(f, c) :
        null != f ? f : null != c ? c : a
};
shaka.Player.prototype.onSegmentDownloaded_ = function (a, b) {
    this.abrManager_ && this.abrManager_.segmentDownloaded(a, b)
};
shaka.Player.prototype.onBuffering_ = function (a) {
    this.updateTimeStats_();
    this.buffering_ = a;
    this.updateState_();
    this.playhead_ && this.playhead_.setBuffering(a);
    a = new shaka.util.FakeEvent("buffering", {buffering: a});
    this.dispatchEvent(a)
};
shaka.Player.prototype.onChangePeriod_ = function () {
    this.onTracksChanged_()
};
shaka.Player.prototype.updateState_ = function () {
    if (!this.destroyed_) {
        var a = this.buffering_ ? "buffering" : this.video_.ended ? "ended" : this.video_.paused ? "paused" : "playing";
        var b = Date.now() / 1E3;
        if (this.stats_.stateHistory.length) {
            var c = this.stats_.stateHistory[this.stats_.stateHistory.length - 1];
            c.duration = b - c.timestamp;
            if (a == c.state) return
        }
        this.stats_.stateHistory.push({timestamp: b, state: a, duration: 0})
    }
};
shaka.Player.prototype.onSeek_ = function () {
    this.playheadObserver_ && this.playheadObserver_.seeked();
    this.streamingEngine_ && this.streamingEngine_.seeked()
};
shaka.Player.prototype.chooseVariant_ = function (a) {
    goog.asserts.assert(this.config_, "Must not be destroyed");
    if (!a || !a.length) return this.onError_(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.RESTRICTIONS_CANNOT_BE_MET)), null;
    this.abrManager_.setVariants(a);
    if (this.abrManager_.chooseStreams) {
        shaka.log.alwaysWarn("AbrManager API has changed. AbrManager.chooseStreams() is deprecated. Please implement AbrManager.chooseVariant() to upgrade. The old API will be removed in v2.3.");
        var b =
            shaka.util.ManifestParserUtils.ContentType, c = this.abrManager_.chooseStreams(["video", "audio"]);
        return shaka.util.StreamUtils.getVariantByStreams(c[b.AUDIO], c[b.VIDEO], a)
    }
    return this.abrManager_.chooseVariant()
};
shaka.Player.prototype.chooseStreamsAndSwitch_ = function (a) {
    goog.asserts.assert(this.config_, "Must not be destroyed");
    var b = shaka.util.StreamUtils.filterVariantsByLanguageAndRole(a, this.currentAudioLanguage_, this.currentVariantRole_);
    a = shaka.util.StreamUtils.filterTextStreamsByLanguageAndRole(a, this.currentTextLanguage_, this.currentTextRole_);
    if (b = this.chooseVariant_(b)) this.addVariantToSwitchHistory_(b, !0), this.switchVariant_(b, !0);
    if (b = a[0]) this.addTextStreamToSwitchHistory_(b, !0), this.switchTextStream_(b);
    this.onAdaptation_()
};
shaka.Player.prototype.onChooseStreams_ = function (a) {
    shaka.log.debug("onChooseStreams_", a);
    goog.asserts.assert(this.config_, "Must not be destroyed");
    var b = shaka.util.ManifestParserUtils.ContentType, c = shaka.util.StreamUtils;
    this.switchingPeriods_ = !0;
    this.abrManager_.disable();
    shaka.log.debug("Choosing new streams after period changed");
    var d = {};
    d[b.AUDIO] = !1;
    d[b.TEXT] = !1;
    var e = c.filterVariantsByLanguageAndRole(a, this.currentAudioLanguage_, this.currentVariantRole_, d),
        f = c.filterTextStreamsByLanguageAndRole(a, this.currentTextLanguage_,
            this.currentTextRole_, d);
    shaka.log.v2("onChooseStreams_, variants and text streams: ", e, f);
    e = this.chooseVariant_(e);
    f = f[0] || null;
    shaka.log.v2("onChooseStreams_, chosen=", e, f);
    if (goog.DEBUG) {
        goog.asserts.assert(this.manifest_, "Manifest should exist!");
        if (this.deferredVariant_) {
            var g = c.findPeriodContainingVariant(this.manifest_, this.deferredVariant_);
            g = this.manifest_.periods[g];
            goog.asserts.assert(g != a, "Mistakenly ignoring deferred variant from the same period!")
        }
        this.deferredTextStream_ && (g = c.findPeriodContainingStream(this.manifest_,
            this.deferredTextStream_), g = this.manifest_.periods[g], goog.asserts.assert(g != a, "Mistakenly ignoring deferred text stream from the same period!"))
    }
    this.deferredTextStream_ = this.deferredVariant_ = null;
    e && this.addVariantToSwitchHistory_(e, !0);
    f && (this.addTextStreamToSwitchHistory_(f, !0), !this.streamingEngine_.getActivePeriod() && e && e.audio && d[b.TEXT] && f.language != e.audio.language && (this.textDisplayer_.setTextVisibility(!0), this.onTextTrackVisibility_()));
    return {variant: e, text: f}
};
shaka.Player.prototype.canSwitch_ = function () {
    shaka.log.debug("canSwitch_");
    goog.asserts.assert(this.config_, "Must not be destroyed");
    this.switchingPeriods_ = !1;
    this.config_.abr.enabled && this.abrManager_.enable();
    this.deferredVariant_ && (this.streamingEngine_.switchVariant(this.deferredVariant_, this.deferredVariantClearBuffer_), this.deferredVariant_ = null);
    this.deferredTextStream_ && (this.streamingEngine_.switchTextStream(this.deferredTextStream_), this.deferredTextStream_ = null)
};
shaka.Player.prototype.onManifestUpdate_ = function () {
    this.parser_ && this.parser_.update && this.parser_.update()
};
shaka.Player.prototype.onSegmentAppended_ = function () {
    if (this.playhead_) this.playhead_.onSegmentAppended()
};
shaka.Player.prototype.switch_ = function (a, b) {
    shaka.log.debug("switch_");
    goog.asserts.assert(this.config_.abr.enabled, "AbrManager should not call switch while disabled!");
    goog.asserts.assert(!this.switchingPeriods_, "AbrManager should not call switch while transitioning between Periods!");
    this.addVariantToSwitchHistory_(a, !0);
    this.streamingEngine_ && (this.streamingEngine_.switchVariant(a, b || !1), this.onAdaptation_())
};
shaka.Player.prototype.switchV21_ = function (a, b) {
    if (this.streamingEngine_) {
        var c = shaka.util.ManifestParserUtils.ContentType, d = this.streamingEngine_.getActivePeriod(),
            c = shaka.util.StreamUtils.getVariantByStreams(a[c.AUDIO], a[c.VIDEO], d ? d.variants : []);
        goog.asserts.assert(c, "Could not find variant to switch!");
        c && this.switch_(c, b)
    }
};
shaka.Player.prototype.onAdaptation_ = function () {
    Promise.resolve().then(function () {
        if (!this.destroyed_) {
            var a = new shaka.util.FakeEvent("adaptation");
            this.dispatchEvent(a)
        }
    }.bind(this))
};
shaka.Player.prototype.onTracksChanged_ = function () {
    Promise.resolve().then(function () {
        if (!this.destroyed_) {
            var a = new shaka.util.FakeEvent("trackschanged");
            this.dispatchEvent(a)
        }
    }.bind(this))
};
shaka.Player.prototype.onTextTrackVisibility_ = function () {
    var a = new shaka.util.FakeEvent("texttrackvisibility");
    this.dispatchEvent(a)
};
shaka.Player.prototype.onError_ = function (a) {
    if (!this.destroyed_) {
        goog.asserts.assert(a instanceof shaka.util.Error, "Wrong error type!");
        var b = new shaka.util.FakeEvent("error", {detail: a});
        this.dispatchEvent(b);
        b.defaultPrevented && (a.handled = !0)
    }
};
shaka.Player.prototype.onTimelineRegionAdded_ = function (a) {
    this.playheadObserver_ ? this.playheadObserver_.addTimelineRegion(a) : this.pendingTimelineRegions_.push(a)
};
shaka.Player.prototype.onEvent_ = function (a) {
    this.dispatchEvent(a)
};
shaka.Player.prototype.onVideoError_ = function (a) {
    if (this.video_.error && (a = this.video_.error.code, 1 != a)) {
        var b = this.video_.error.msExtendedCode;
        b && (0 > b && (b += Math.pow(2, 32)), b = b.toString(16));
        this.onError_(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MEDIA, shaka.util.Error.Code.VIDEO_ERROR, a, b, this.video_.error.message))
    }
};
shaka.Player.prototype.onKeyStatus_ = function (a) {
    var b = shaka.util.ManifestParserUtils.ContentType;
    goog.asserts.assert(this.streamingEngine_, "Should have been initialized.");
    var c = ["output-restricted", "internal-error"], d = this.streamingEngine_.getCurrentPeriod(), e = !1,
        f = 1 == Object.keys(a).length && "00" == Object.keys(a)[0];
    f && shaka.log.warning("Got a synthetic key status event, so we don't know the real key statuses. If we don't have all the keys, you'll need to set restrictions so we don't select those tracks.");
    d.variants.forEach(function (b) {
        var d = [];
        b.audio && d.push(b.audio);
        b.video && d.push(b.video);
        d.forEach(function (d) {
            var g = b.allowedByKeySystem;
            d.keyId && (d = a[f ? "00" : d.keyId], b.allowedByKeySystem = !!d && 0 > c.indexOf(d));
            g != b.allowedByKeySystem && (e = !0)
        })
    });
    var g = this.streamingEngine_.getActiveStreams();
    (b = shaka.util.StreamUtils.getVariantByStreams(g[b.AUDIO], g[b.VIDEO], d.variants)) && !b.allowedByKeySystem && (shaka.log.debug("Choosing new streams after key status changed"), this.chooseStreamsAndSwitch_(d));
    if (e) this.onTracksChanged_()
};
shaka.Player.prototype.onExpirationUpdated_ = function (a, b) {
    if (this.parser_ && this.parser_.onExpirationUpdated) this.parser_.onExpirationUpdated(a, b);
    var c = new shaka.util.FakeEvent("expirationupdated");
    this.dispatchEvent(c)
};
shaka.offline.Storage = function (a) {
    if (!a || a.constructor != shaka.Player) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.LOCAL_PLAYER_INSTANCE_REQUIRED);
    this.storageEngine_ = shaka.offline.OfflineUtils.createStorageEngine();
    this.player_ = a;
    this.config_ = this.defaultConfig_();
    this.drmEngine_ = null;
    this.storeInProgress_ = !1;
    this.firstPeriodTracks_ = null;
    this.manifestId_ = -1;
    this.duration_ = 0;
    this.manifest_ = null;
    var b = a.getNetworkingEngine();
    goog.asserts.assert(b,
        "Player must not be destroyed");
    this.downloadManager_ = new shaka.offline.DownloadManager(this.storageEngine_, b, a.getConfiguration().streaming.retryParameters, this.config_)
};
goog.exportSymbol("shaka.offline.Storage", shaka.offline.Storage);
shaka.offline.Storage.support = function () {
    return shaka.offline.OfflineUtils.isStorageEngineSupported()
};
goog.exportProperty(shaka.offline.Storage, "support", shaka.offline.Storage.support);
shaka.offline.Storage.prototype.destroy = function () {
    var a = this.storageEngine_, b = this.downloadManager_ ? this.downloadManager_.destroy()["catch"](function () {
    }).then(function () {
        if (a) return a.destroy()
    }) : Promise.resolve();
    this.config_ = this.player_ = this.downloadManager_ = this.storageEngine_ = null;
    return b
};
goog.exportProperty(shaka.offline.Storage.prototype, "destroy", shaka.offline.Storage.prototype.destroy);
shaka.offline.Storage.prototype.configure = function (a) {
    goog.asserts.assert(this.config_, "Storage must not be destroyed");
    shaka.util.ConfigUtils.mergeConfigObjects(this.config_, a, this.defaultConfig_(), {}, "")
};
goog.exportProperty(shaka.offline.Storage.prototype, "configure", shaka.offline.Storage.prototype.configure);
shaka.offline.Storage.prototype.store = function (a, b, c) {
    if (this.storeInProgress_) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.STORE_ALREADY_IN_PROGRESS));
    this.storeInProgress_ = !0;
    var d, e = null, f = function (a) {
        e = a
    };
    return this.initIfNeeded_().then(function () {
        this.checkDestroyed_();
        return this.loadInternal(a, f, c)
    }.bind(this)).then(function (c) {
        this.checkDestroyed_();
        this.manifest_ = c.manifest;
        this.drmEngine_ = c.drmEngine;
        if (this.manifest_.presentationTimeline.isLive() || this.manifest_.presentationTimeline.isInProgress()) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.CANNOT_STORE_LIVE_OFFLINE, a);
        this.filterAllPeriods_(this.manifest_.periods);
        this.manifestId_ = this.storageEngine_.reserveId("manifest");
        this.duration_ = 0;
        d = this.createOfflineManifest_(a, b || {});
        return this.downloadManager_.downloadAndStore(d)
    }.bind(this)).then(function () {
        this.checkDestroyed_();
        if (e) throw e;
        return this.cleanup_()
    }.bind(this)).then(function () {
        return shaka.offline.OfflineUtils.getStoredContent(d)
    }.bind(this))["catch"](function (a) {
        var b = shaka.util.Functional;
        return this.cleanup_()["catch"](b.noop).then(function () {
            throw a;
        })
    }.bind(this))
};
goog.exportProperty(shaka.offline.Storage.prototype, "store", shaka.offline.Storage.prototype.store);
shaka.offline.Storage.prototype.remove = function (a) {
    var b = a.offlineUri, c = /^offline:([0-9]+)$/.exec(b);
    if (!c) return Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.MALFORMED_OFFLINE_URI, b));
    var d = null, e = function (a) {
        a.code != shaka.util.Error.Code.OFFLINE_SESSION_REMOVED && (d = a)
    }, f, g, h = Number(c[1]);
    return this.initIfNeeded_().then(function () {
        this.checkDestroyed_();
        return this.storageEngine_.get("manifest", h)
    }.bind(this)).then(function (a) {
        this.checkDestroyed_();
        if (!a) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.REQUESTED_ITEM_NOT_FOUND, b);
        f = a;
        a = shaka.offline.OfflineManifestParser.reconstructManifest(f);
        var c = this.player_.getNetworkingEngine();
        goog.asserts.assert(c, "Player must not be destroyed");
        g = new shaka.media.DrmEngine({
            netEngine: c, onError: e, onKeyStatus: function () {
            }, onExpirationUpdated: function () {
            }, onEvent: function () {
            }
        });
        g.configure(this.player_.getConfiguration().drm);
        return g.init(a,
            this.config_.usePersistentLicense || !1)
    }.bind(this)).then(function () {
        return g.removeSessions(f.sessionIds)
    }.bind(this)).then(function () {
        return g.destroy()
    }.bind(this)).then(function () {
        this.checkDestroyed_();
        if (d) throw d;
        var b = shaka.util.Functional, c = f.periods.map(function (a) {
            return a.streams.map(function (a) {
                var b = a.segments.map(function (a) {
                    a = /^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(a.uri);
                    goog.asserts.assert(a, "Invalid offline URI");
                    return Number(a[1])
                });
                a.initSegmentUri && (a = /^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(a.initSegmentUri),
                    goog.asserts.assert(a, "Invalid offline URI"), b.push(Number(a[1])));
                return b
            }).reduce(b.collapseArrays, [])
        }).reduce(b.collapseArrays, []), e = 0, g = c.length, h = this.config_.progressCallback;
        return this.storageEngine_.removeKeys("segment", c, function () {
            e++;
            h(a, e / g)
        })
    }.bind(this)).then(function () {
        this.checkDestroyed_();
        this.config_.progressCallback(a, 1);
        return this.storageEngine_.remove("manifest", h)
    }.bind(this))
};
goog.exportProperty(shaka.offline.Storage.prototype, "remove", shaka.offline.Storage.prototype.remove);
shaka.offline.Storage.prototype.list = function () {
    var a = [];
    return this.initIfNeeded_().then(function () {
        this.checkDestroyed_();
        return this.storageEngine_.forEach("manifest", function (b) {
            a.push(shaka.offline.OfflineUtils.getStoredContent(b))
        })
    }.bind(this)).then(function () {
        return a
    })
};
goog.exportProperty(shaka.offline.Storage.prototype, "list", shaka.offline.Storage.prototype.list);
shaka.offline.Storage.prototype.loadInternal = function (a, b, c) {
    var d = this.player_.getNetworkingEngine(), e = this.player_.getConfiguration(), f, g, h, k = function () {
    };
    return shaka.media.ManifestParser.getFactory(a, d, e.manifest.retryParameters, c).then(function (c) {
        this.checkDestroyed_();
        h = new c;
        h.configure(e.manifest);
        c = {
            networkingEngine: d,
            filterAllPeriods: this.filterAllPeriods_.bind(this),
            filterNewPeriod: this.filterPeriod_.bind(this),
            onTimelineRegionAdded: function () {
            },
            onEvent: function () {
            },
            onError: b
        };
        return h.start(a,
            c)
    }.bind(this)).then(function (a) {
        this.checkDestroyed_();
        f = a;
        g = new shaka.media.DrmEngine({
            netEngine: d, onError: b, onKeyStatus: k, onExpirationUpdated: function () {
            }, onEvent: function () {
            }
        });
        g.configure(e.drm);
        return g.init(f, this.config_.usePersistentLicense || !1)
    }.bind(this)).then(function () {
        this.checkDestroyed_();
        return this.createSegmentIndex_(f)
    }.bind(this)).then(function () {
        this.checkDestroyed_();
        return g.createOrLoad()
    }.bind(this)).then(function () {
        this.checkDestroyed_();
        return h.stop()
    }.bind(this)).then(function () {
        this.checkDestroyed_();
        return {manifest: f, drmEngine: g}
    }.bind(this))["catch"](function (a) {
        if (h) return h.stop().then(function () {
            throw a;
        });
        throw a;
    })
};
shaka.offline.Storage.prototype.defaultTrackSelect_ = function (a) {
    for (var b = shaka.util.LanguageUtils, c = shaka.util.ManifestParserUtils.ContentType, d = [], e = b.normalize(this.player_.getConfiguration().preferredAudioLanguage), f = [b.MatchType.EXACT, b.MatchType.BASE_LANGUAGE_OKAY, b.MatchType.OTHER_SUB_LANGUAGE_OKAY], g = a.filter(function (a) {
        return "variant" == a.type
    }), f = f.map(function (a) {
        return g.filter(function (c) {
            c = b.normalize(c.language);
            return b.match(a, e, c)
        })
    }), h, k = 0; k < f.length; k++) if (f[k].length) {
        h = f[k];
        break
    }
    h || (f = g.filter(function (a) {
        return a.primary
    }), f.length && (h = f));
    h || (h = g, 1 < g.map(function (a) {
        return a.language
    }).filter(shaka.util.Functional.isNotDuplicate).length && shaka.log.warning("Could not choose a good audio track based on language preferences or primary tracks.  An arbitrary language will be stored!"));
    var l = h.filter(function (a) {
        return a.height && 480 >= a.height
    });
    l.length && (l.sort(function (a, b) {
        return b.height - a.height
    }), h = l.filter(function (a) {
        return a.height == l[0].height
    }));
    h.sort(function (a,
                     b) {
        return a.bandwidth - b.bandwidth
    });
    h.length && d.push(h[Math.floor(h.length / 2)]);
    d.push.apply(d, a.filter(function (a) {
        return a.type == c.TEXT
    }));
    return d
};
shaka.offline.Storage.prototype.defaultConfig_ = function () {
    return {
        trackSelectionCallback: this.defaultTrackSelect_.bind(this), progressCallback: function (a, b) {
            if (a || b) return null
        }, usePersistentLicense: !0
    }
};
shaka.offline.Storage.prototype.initIfNeeded_ = function () {
    return this.storageEngine_ ? this.storageEngine_.initialized() ? Promise.resolve() : this.storageEngine_.init(shaka.offline.OfflineUtils.DB_SCHEME) : Promise.reject(new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.STORAGE_NOT_SUPPORTED))
};
shaka.offline.Storage.prototype.filterAllPeriods_ = function (a) {
    a.forEach(this.filterPeriod_.bind(this))
};
shaka.offline.Storage.prototype.filterPeriod_ = function (a) {
    var b = shaka.util.StreamUtils, c = shaka.util.ManifestParserUtils.ContentType, d = {};
    if (this.firstPeriodTracks_) {
        var e = this.firstPeriodTracks_.filter(function (a) {
            return "variant" == a.type
        }), f = null;
        e.length && (f = b.findVariantForTrack(a, e[0]));
        f && (f.video && (d[c.VIDEO] = f.video), f.audio && (d[c.AUDIO] = f.audio))
    }
    b.filterNewPeriod(this.drmEngine_, d, a);
    b.applyRestrictions(a, this.player_.getConfiguration().restrictions, {width: Infinity, height: Infinity})
};
shaka.offline.Storage.prototype.cleanup_ = function () {
    var a = this.drmEngine_ ? this.drmEngine_.destroy() : Promise.resolve();
    this.manifest_ = this.drmEngine_ = null;
    this.storeInProgress_ = !1;
    this.firstPeriodTracks_ = null;
    this.manifestId_ = -1;
    return a
};
shaka.offline.Storage.prototype.createSegmentIndex_ = function (a) {
    var b = shaka.util.Functional, c = a.periods.map(function (a) {
        return a.variants
    }).reduce(b.collapseArrays, []).map(function (a) {
        var b = [];
        a.audio && b.push(a.audio);
        a.video && b.push(a.video);
        return b
    }).reduce(b.collapseArrays, []).filter(b.isNotDuplicate);
    a = a.periods.map(function (a) {
        return a.textStreams
    }).reduce(b.collapseArrays, []);
    c.push.apply(c, a);
    return Promise.all(c.map(function (a) {
        return a.createSegmentIndex()
    }))
};
shaka.offline.Storage.prototype.createOfflineManifest_ = function (a, b) {
    var c = this.manifest_.periods.map(this.createPeriod_.bind(this)), d = this.drmEngine_.getDrmInfo(),
        e = this.drmEngine_.getSessionIds();
    if (d) {
        if (!e.length) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.NO_INIT_DATA_FOR_OFFLINE, a);
        d.initData = []
    }
    return {
        key: this.manifestId_,
        originalManifestUri: a,
        duration: this.duration_,
        size: 0,
        expiration: this.drmEngine_.getExpiration(),
        periods: c,
        sessionIds: this.config_.usePersistentLicense ? e : [],
        drmInfo: d,
        appMetadata: b
    }
};
shaka.offline.Storage.prototype.createPeriod_ = function (a) {
    var b, c, d = shaka.util.StreamUtils, e = d.getVariantTracks(a, null, null), f = d.getTextTracks(a, null),
        e = e.concat(f), e = this.config_.trackSelectionCallback(e);
    null == this.firstPeriodTracks_ && (this.firstPeriodTracks_ = e, this.filterAllPeriods_(this.manifest_.periods));
    for (f = e.length - 1; 0 < f; --f) {
        var g = !1;
        for (c = f - 1; 0 <= c; --c) if (e[f].type == e[c].type && e[f].kind == e[c].kind && e[f].language == e[c].language) {
            shaka.log.warning("Multiple tracks of the same type/kind/language given.");
            g = !0;
            break
        }
        if (g) break
    }
    g = [];
    for (f = 0; f < e.length; f++) (b = d.findVariantForTrack(a, e[f])) ? (b.audio && ((c = g.filter(function (a) {
        return a.id == b.audio.id
    })[0]) ? c.variantIds.push(b.id) : (c = b.video ? b.bandwidth / 2 : b.bandwidth, g.push(this.createStream_(a, b.audio, c, b.id)))), b.video && ((c = g.filter(function (a) {
        return a.id == b.video.id
    })[0]) ? c.variantIds.push(b.id) : (c = b.audio ? b.bandwidth / 2 : b.bandwidth, g.push(this.createStream_(a, b.video, c, b.id))))) : (c = d.findTextStreamForTrack(a, e[f]), goog.asserts.assert(c, "Could not find track with id " +
        e[f].id), g.push(this.createStream_(a, c, 0)));
    return {startTime: a.startTime, streams: g}
};
shaka.offline.Storage.prototype.createStream_ = function (a, b, c, d) {
    var e = [], f = this.manifest_.presentationTimeline.getSegmentAvailabilityStart();
    var g = f;
    for (var h = b.findSegmentPosition(f), k = null != h ? b.getSegmentReference(h) : null; k;) g = this.storageEngine_.reserveId("segment"), this.downloadManager_.addSegment(b.type, k, (k.endTime - k.startTime) * c / 8, {
        key: g,
        data: null,
        manifestKey: this.manifestId_,
        streamNumber: b.id,
        segmentNumber: g
    }), e.push({
        startTime: k.startTime, endTime: k.endTime, uri: "offline:" + this.manifestId_ +
        "/" + b.id + "/" + g
    }), g = k.endTime + a.startTime, k = b.getSegmentReference(++h);
    this.duration_ = Math.max(this.duration_, g - f);
    a = null;
    b.initSegmentReference && (g = this.storageEngine_.reserveId("segment"), a = "offline:" + this.manifestId_ + "/" + b.id + "/" + g, this.downloadManager_.addSegment(b.contentType, b.initSegmentReference, 0, {
        key: g,
        data: null,
        manifestKey: this.manifestId_,
        streamNumber: b.id,
        segmentNumber: -1
    }));
    c = [];
    null != d && c.push(d);
    return {
        id: b.id,
        primary: b.primary,
        presentationTimeOffset: b.presentationTimeOffset || 0,
        contentType: b.type,
        mimeType: b.mimeType,
        codecs: b.codecs,
        frameRate: b.frameRate,
        kind: b.kind,
        language: b.language,
        label: b.label,
        width: b.width || null,
        height: b.height || null,
        initSegmentUri: a,
        encrypted: b.encrypted,
        keyId: b.keyId,
        segments: e,
        variantIds: c
    }
};
shaka.offline.Storage.prototype.checkDestroyed_ = function () {
    if (!this.player_) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.STORAGE, shaka.util.Error.Code.OPERATION_ABORTED);
};
shaka.Player.registerSupportPlugin("offline", shaka.offline.Storage.support);
shaka.polyfill = {};
shaka.polyfill.installAll = function () {
    for (var a = 0; a < shaka.polyfill.polyfills_.length; ++a) shaka.polyfill.polyfills_[a]()
};
goog.exportSymbol("shaka.polyfill.installAll", shaka.polyfill.installAll);
shaka.polyfill.polyfills_ = [];
shaka.polyfill.register = function (a) {
    shaka.polyfill.polyfills_.push(a)
};
goog.exportSymbol("shaka.polyfill.register", shaka.polyfill.register);
shaka.polyfill.Fullscreen = {};
shaka.polyfill.Fullscreen.install = function () {
    if (window.Document) {
        var a = Element.prototype;
        a.requestFullscreen = a.requestFullscreen || a.mozRequestFullScreen || a.msRequestFullscreen || a.webkitRequestFullscreen;
        a = Document.prototype;
        a.exitFullscreen = a.exitFullscreen || a.mozCancelFullScreen || a.msExitFullscreen || a.webkitExitFullscreen;
        "fullscreenElement" in document || (Object.defineProperty(document, "fullscreenElement", {
            get: function () {
                return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement
            }
        }),
            Object.defineProperty(document, "fullscreenEnabled", {
                get: function () {
                    return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled
                }
            }));
        a = shaka.polyfill.Fullscreen.proxyEvent_;
        document.addEventListener("webkitfullscreenchange", a);
        document.addEventListener("webkitfullscreenerror", a);
        document.addEventListener("mozfullscreenchange", a);
        document.addEventListener("mozfullscreenerror", a);
        document.addEventListener("MSFullscreenChange", a);
        document.addEventListener("MSFullscreenError",
            a)
    }
};
shaka.polyfill.Fullscreen.proxyEvent_ = function (a) {
    var b = a.type.replace(/^(webkit|moz|MS)/, "").toLowerCase();
    if ("function" === typeof Event) var c = new Event(b, a); else c = document.createEvent("Event"), c.initEvent(b, a.bubbles, a.cancelable);
    a.target.dispatchEvent(c)
};
shaka.polyfill.register(shaka.polyfill.Fullscreen.install);
shaka.polyfill.IndexedDB = {};
shaka.polyfill.IndexedDB.install = function () {
    shaka.log.debug("IndexedDB.install");
    var a = navigator.userAgent;
    a && 0 <= a.indexOf("CrKey") && (shaka.log.debug("Removing IndexedDB from ChromeCast"), delete window.indexedDB, goog.asserts.assert(!window.indexedDB, "Failed to override window.indexedDB"))
};
shaka.polyfill.register(shaka.polyfill.IndexedDB.install);
shaka.polyfill.InputEvent = {};
shaka.polyfill.InputEvent.install = function () {
    shaka.log.debug("InputEvent.install");
    0 > navigator.userAgent.indexOf("Trident/") || HTMLInputElement.prototype.addEventListener == shaka.polyfill.InputEvent.addEventListener_ || (shaka.log.info("Patching input event support on IE."), shaka.polyfill.InputEvent.originalAddEventListener_ = HTMLInputElement.prototype.addEventListener, HTMLInputElement.prototype.addEventListener = shaka.polyfill.InputEvent.addEventListener_)
};
shaka.polyfill.InputEvent.addEventListener_ = function (a, b, c) {
    if ("input" == a) switch (this.type) {
        case "range":
            a = "change"
    }
    shaka.polyfill.InputEvent.originalAddEventListener_.call(this, a, b, c)
};
shaka.polyfill.register(shaka.polyfill.InputEvent.install);
shaka.polyfill.MathRound = {};
shaka.polyfill.MathRound.MAX_ACCURATE_INPUT_ = 4503599627370496;
shaka.polyfill.MathRound.install = function () {
    shaka.log.debug("mathRound.install");
    var a = shaka.polyfill.MathRound.MAX_ACCURATE_INPUT_ + 1;
    if (Math.round(a) != a) {
        shaka.log.debug("polyfill Math.round");
        var b = Math.round;
        Math.round = function (a) {
            var c = a;
            a <= shaka.polyfill.MathRound.MAX_ACCURATE_INPUT_ && (c = b(a));
            return c
        }
    }
};
shaka.polyfill.register(shaka.polyfill.MathRound.install);
shaka.util.Pssh = function (a) {
    this.systemIds = [];
    this.cencKeyIds = [];
    this.dataBoundaries = [];
    (new shaka.util.Mp4Parser).fullBox("pssh", this.parseBox_.bind(this)).parse(a.buffer);
    0 == this.dataBoundaries.length && shaka.log.warning("No pssh box found!")
};
shaka.util.Pssh.prototype.parseBox_ = function (a) {
    goog.asserts.assert(null != a.version, "PSSH boxes are full boxes and must have a valid version");
    goog.asserts.assert(null != a.flags, "PSSH boxes are full boxes and must have a valid flag");
    if (1 < a.version) shaka.log.warning("Unrecognized PSSH version found!"); else {
        var b = shaka.util.Uint8ArrayUtils.toHex(a.reader.readBytes(16)), c = [];
        if (0 < a.version) for (var d = a.reader.readUint32(), e = 0; e < d; ++e) {
            var f = shaka.util.Uint8ArrayUtils.toHex(a.reader.readBytes(16));
            c.push(f)
        }
        d =
            a.reader.readUint32();
        a.reader.skip(d);
        this.cencKeyIds.push.apply(this.cencKeyIds, c);
        this.systemIds.push(b);
        this.dataBoundaries.push({start: a.start, end: a.start + a.size - 1});
        a.reader.getPosition() != a.reader.getLength() && shaka.log.warning("Mismatch between box size and data size!")
    }
};
shaka.polyfill.PatchedMediaKeysMs = {};
shaka.polyfill.PatchedMediaKeysMs.install = function () {
    shaka.log.debug("PatchedMediaKeysMs.install");
    var a = shaka.polyfill.PatchedMediaKeysMs;
    a.MediaKeyStatusMap.KEY_ID_ = (new Uint8Array([0])).buffer;
    delete HTMLMediaElement.prototype.mediaKeys;
    HTMLMediaElement.prototype.mediaKeys = null;
    HTMLMediaElement.prototype.setMediaKeys = a.setMediaKeys;
    window.MediaKeys = a.MediaKeys;
    window.MediaKeySystemAccess = a.MediaKeySystemAccess;
    navigator.requestMediaKeySystemAccess = a.requestMediaKeySystemAccess
};
shaka.polyfill.PatchedMediaKeysMs.requestMediaKeySystemAccess = function (a, b) {
    shaka.log.debug("PatchedMediaKeysMs.requestMediaKeySystemAccess");
    goog.asserts.assert(this == navigator, 'bad "this" for requestMediaKeySystemAccess');
    var c = shaka.polyfill.PatchedMediaKeysMs;
    try {
        var d = new c.MediaKeySystemAccess(a, b);
        return Promise.resolve(d)
    } catch (e) {
        return Promise.reject(e)
    }
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySystemAccess = function (a, b) {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeySystemAccess");
    this.keySystem = a;
    for (var c = !1, d = 0; d < b.length; ++d) {
        var e = b[d];
        var f = {
            audioCapabilities: [],
            videoCapabilities: [],
            persistentState: "optional",
            distinctiveIdentifier: "optional",
            initDataTypes: e.initDataTypes,
            sessionTypes: ["temporary"],
            label: e.label
        }, g = !1;
        if (e.audioCapabilities) for (var h = 0; h < e.audioCapabilities.length; ++h) {
            var k = e.audioCapabilities[h];
            if (k.contentType) {
                g = !0;
                var l =
                    k.contentType.split(";")[0];
                MSMediaKeys.isTypeSupported(this.keySystem, l) && (f.audioCapabilities.push(k), c = !0)
            }
        }
        if (e.videoCapabilities) for (h = 0; h < e.videoCapabilities.length; ++h) k = e.videoCapabilities[h], k.contentType && (g = !0, l = k.contentType.split(";")[0], MSMediaKeys.isTypeSupported(this.keySystem, l) && (f.videoCapabilities.push(k), c = !0));
        g || (c = MSMediaKeys.isTypeSupported(this.keySystem, "video/mp4"));
        "required" == e.persistentState && (c = !1);
        if (c) {
            this.configuration_ = f;
            return
        }
    }
    e = Error("Unsupported keySystem");
    e.name = "NotSupportedError";
    e.code = DOMException.NOT_SUPPORTED_ERR;
    throw e;
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySystemAccess.prototype.createMediaKeys = function () {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeySystemAccess.createMediaKeys");
    var a = new shaka.polyfill.PatchedMediaKeysMs.MediaKeys(this.keySystem);
    return Promise.resolve(a)
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySystemAccess.prototype.getConfiguration = function () {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeySystemAccess.getConfiguration");
    return this.configuration_
};
shaka.polyfill.PatchedMediaKeysMs.setMediaKeys = function (a) {
    shaka.log.debug("PatchedMediaKeysMs.setMediaKeys");
    goog.asserts.assert(this instanceof HTMLMediaElement, 'bad "this" for setMediaKeys');
    var b = shaka.polyfill.PatchedMediaKeysMs, c = this.mediaKeys;
    c && c != a && (goog.asserts.assert(c instanceof b.MediaKeys, "non-polyfill instance of oldMediaKeys"), c.setMedia(null));
    delete this.mediaKeys;
    return (this.mediaKeys = a) ? (goog.asserts.assert(a instanceof b.MediaKeys, "non-polyfill instance of newMediaKeys"), a.setMedia(this)) :
        Promise.resolve()
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeys = function (a) {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeys");
    this.nativeMediaKeys_ = new MSMediaKeys(a);
    this.eventManager_ = new shaka.util.EventManager
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeys.prototype.createSession = function (a) {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeys.createSession");
    var b = a || "temporary";
    if ("temporary" != b) throw new TypeError("Session type " + a + " is unsupported on this platform.");
    return new shaka.polyfill.PatchedMediaKeysMs.MediaKeySession(this.nativeMediaKeys_, b)
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeys.prototype.setServerCertificate = function (a) {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeys.setServerCertificate");
    return Promise.resolve(!1)
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeys.prototype.setMedia = function (a) {
    function b() {
        a.msSetMediaKeys(d.nativeMediaKeys_);
        a.removeEventListener("loadedmetadata", b)
    }

    var c = shaka.polyfill.PatchedMediaKeysMs;
    this.eventManager_.removeAll();
    if (!a) return Promise.resolve();
    this.eventManager_.listen(a, "msneedkey", c.onMsNeedKey_);
    var d = this;
    try {
        return 1 <= a.readyState ? a.msSetMediaKeys(this.nativeMediaKeys_) : a.addEventListener("loadedmetadata", b), Promise.resolve()
    } catch (e) {
        return Promise.reject(e)
    }
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession = function (a, b) {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeySession");
    shaka.util.FakeEventTarget.call(this);
    this.nativeMediaKeySession_ = null;
    this.nativeMediaKeys_ = a;
    this.updatePromise_ = this.generateRequestPromise_ = null;
    this.eventManager_ = new shaka.util.EventManager;
    this.sessionId = "";
    this.expiration = NaN;
    this.closed = new shaka.util.PublicPromise;
    this.keyStatuses = new shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap
};
goog.inherits(shaka.polyfill.PatchedMediaKeysMs.MediaKeySession, shaka.util.FakeEventTarget);
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession.prototype.generateRequest = function (a, b) {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeySession.generateRequest");
    this.generateRequestPromise_ = new shaka.util.PublicPromise;
    try {
        this.nativeMediaKeySession_ = this.nativeMediaKeys_.createSession("video/mp4", new Uint8Array(b), null), this.eventManager_.listen(this.nativeMediaKeySession_, "mskeymessage", this.onMsKeyMessage_.bind(this)), this.eventManager_.listen(this.nativeMediaKeySession_, "mskeyadded", this.onMsKeyAdded_.bind(this)),
            this.eventManager_.listen(this.nativeMediaKeySession_, "mskeyerror", this.onMsKeyError_.bind(this)), this.updateKeyStatus_("status-pending")
    } catch (c) {
        this.generateRequestPromise_.reject(c)
    }
    return this.generateRequestPromise_
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession.prototype.load = function () {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeySession.load");
    return Promise.reject(Error("MediaKeySession.load not yet supported"))
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession.prototype.update = function (a) {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeySession.update");
    this.updatePromise_ = new shaka.util.PublicPromise;
    try {
        this.nativeMediaKeySession_.update(new Uint8Array(a))
    } catch (b) {
        this.updatePromise_.reject(b)
    }
    return this.updatePromise_
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession.prototype.close = function () {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeySession.close");
    try {
        this.nativeMediaKeySession_.close(), this.closed.resolve(), this.eventManager_.removeAll()
    } catch (a) {
        this.closed.reject(a)
    }
    return this.closed
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession.prototype.remove = function () {
    shaka.log.debug("PatchedMediaKeysMs.MediaKeySession.remove");
    return Promise.reject(Error("MediaKeySession.remove is only applicable for persistent licenses, which are not supported on this platform"))
};
shaka.polyfill.PatchedMediaKeysMs.onMsNeedKey_ = function (a) {
    shaka.log.debug("PatchedMediaKeysMs.onMsNeedKey_", a);
    var b = shaka.polyfill.PatchedMediaKeysMs, c = document.createEvent("CustomEvent");
    c.initCustomEvent("encrypted", !1, !1, null);
    c.initDataType = "cenc";
    c.initData = b.NormaliseInitData_(a.initData);
    this.dispatchEvent(c)
};
shaka.polyfill.PatchedMediaKeysMs.NormaliseInitData_ = function (a) {
    if (!a) return a;
    var b = new shaka.util.Pssh(a);
    if (1 >= b.dataBoundaries.length) return a;
    for (var c = [], d = 0; d < b.dataBoundaries.length; d++) {
        var e = a.subarray(b.dataBoundaries[d].start, b.dataBoundaries[d].end + 1);
        c.push(e)
    }
    a = shaka.util.ArrayUtils.removeDuplicates(c, shaka.polyfill.PatchedMediaKeysMs.compareInitDatas_);
    for (d = b = 0; d < a.length; d++) b += a[d].length;
    b = new Uint8Array(b);
    for (d = c = 0; d < a.length; d++) b.set(a[d], c), c += a[d].length;
    return b
};
shaka.polyfill.PatchedMediaKeysMs.compareInitDatas_ = function (a, b) {
    return shaka.util.Uint8ArrayUtils.equal(a, b)
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession.prototype.onMsKeyMessage_ = function (a) {
    shaka.log.debug("PatchedMediaKeysMs.onMsKeyMessage_", a);
    goog.asserts.assert(this.generateRequestPromise_, "generateRequestPromise_ not set in onMsKeyMessage_");
    this.generateRequestPromise_ && (this.generateRequestPromise_.resolve(), this.generateRequestPromise_ = null);
    var b = void 0 == this.keyStatuses.getStatus();
    a = new shaka.util.FakeEvent("message", {
        messageType: b ? "licenserequest" : "licenserenewal",
        message: a.message.buffer
    });
    this.dispatchEvent(a)
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession.prototype.onMsKeyAdded_ = function (a) {
    shaka.log.debug("PatchedMediaKeysMs.onMsKeyAdded_", a);
    this.generateRequestPromise_ ? (shaka.log.debug("Simulating completion for a PR persistent license."), goog.asserts.assert(!this.updatePromise_, "updatePromise_ and generateRequestPromise_ set in onMsKeyAdded_"), this.updateKeyStatus_("usable"), this.generateRequestPromise_.resolve(), this.generateRequestPromise_ = null) : (goog.asserts.assert(this.updatePromise_, "updatePromise_ not set in onMsKeyAdded_"),
    this.updatePromise_ && (this.updateKeyStatus_("usable"), this.updatePromise_.resolve(), this.updatePromise_ = null))
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession.prototype.onMsKeyError_ = function (a) {
    shaka.log.debug("PatchedMediaKeysMs.onMsKeyError_", a);
    a = Error("EME PatchedMediaKeysMs key error");
    a.errorCode = this.nativeMediaKeySession_.error;
    if (null != this.generateRequestPromise_) this.generateRequestPromise_.reject(a), this.generateRequestPromise_ = null; else if (null != this.updatePromise_) this.updatePromise_.reject(a), this.updatePromise_ = null; else switch (this.nativeMediaKeySession_.error.code) {
        case MSMediaKeyError.MS_MEDIA_KEYERR_OUTPUT:
        case MSMediaKeyError.MS_MEDIA_KEYERR_HARDWARECHANGE:
            this.updateKeyStatus_("output-not-allowed");
        default:
            this.updateKeyStatus_("internal-error")
    }
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeySession.prototype.updateKeyStatus_ = function (a) {
    this.keyStatuses.setStatus(a);
    a = new shaka.util.FakeEvent("keystatuseschange");
    this.dispatchEvent(a)
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap = function () {
    this.size = 0;
    this.status_ = void 0
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.prototype.setStatus = function (a) {
    this.size = void 0 == a ? 0 : 1;
    this.status_ = a
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.prototype.getStatus = function () {
    return this.status_
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.prototype.forEach = function (a) {
    this.status_ && a(this.status_, shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.KEY_ID_)
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.prototype.get = function (a) {
    if (this.has(a)) return this.status_
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.prototype.has = function (a) {
    var b = shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.KEY_ID_;
    return this.status_ && shaka.util.Uint8ArrayUtils.equal(new Uint8Array(a), new Uint8Array(b)) ? !0 : !1
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.prototype.entries = function () {
    goog.asserts.assert(!1, "Not used!  Provided only for compiler.")
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.prototype.keys = function () {
    goog.asserts.assert(!1, "Not used!  Provided only for compiler.")
};
shaka.polyfill.PatchedMediaKeysMs.MediaKeyStatusMap.prototype.values = function () {
    goog.asserts.assert(!1, "Not used!  Provided only for compiler.")
};
shaka.polyfill.PatchedMediaKeysNop = {};
shaka.polyfill.PatchedMediaKeysNop.install = function () {
    shaka.log.debug("PatchedMediaKeysNop.install");
    var a = shaka.polyfill.PatchedMediaKeysNop;
    navigator.requestMediaKeySystemAccess = a.requestMediaKeySystemAccess;
    delete HTMLMediaElement.prototype.mediaKeys;
    HTMLMediaElement.prototype.mediaKeys = null;
    HTMLMediaElement.prototype.setMediaKeys = a.setMediaKeys;
    window.MediaKeys = a.MediaKeys;
    window.MediaKeySystemAccess = a.MediaKeySystemAccess
};
shaka.polyfill.PatchedMediaKeysNop.requestMediaKeySystemAccess = function (a, b) {
    shaka.log.debug("PatchedMediaKeysNop.requestMediaKeySystemAccess");
    goog.asserts.assert(this == navigator, 'bad "this" for requestMediaKeySystemAccess');
    return Promise.reject(Error("The key system specified is not supported."))
};
shaka.polyfill.PatchedMediaKeysNop.setMediaKeys = function (a) {
    shaka.log.debug("PatchedMediaKeysNop.setMediaKeys");
    goog.asserts.assert(this instanceof HTMLMediaElement, 'bad "this" for setMediaKeys');
    return null == a ? Promise.resolve() : Promise.reject(Error("MediaKeys not supported."))
};
shaka.polyfill.PatchedMediaKeysNop.MediaKeys = function () {
    throw new TypeError("Illegal constructor.");
};
shaka.polyfill.PatchedMediaKeysNop.MediaKeys.prototype.createSession = function () {
};
shaka.polyfill.PatchedMediaKeysNop.MediaKeys.prototype.setServerCertificate = function () {
};
shaka.polyfill.PatchedMediaKeysNop.MediaKeySystemAccess = function () {
    throw new TypeError("Illegal constructor.");
};
shaka.polyfill.PatchedMediaKeysNop.MediaKeySystemAccess.prototype.getConfiguration = function () {
};
shaka.polyfill.PatchedMediaKeysNop.MediaKeySystemAccess.prototype.createMediaKeys = function () {
};
shaka.polyfill.PatchedMediaKeysWebkit = {};
shaka.polyfill.PatchedMediaKeysWebkit.prefix_ = "";
shaka.polyfill.PatchedMediaKeysWebkit.install = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.install");
    var b = shaka.polyfill.PatchedMediaKeysWebkit;
    b.prefix_ = a;
    a = b.prefixApi_;
    goog.asserts.assert(HTMLMediaElement.prototype[a("generateKeyRequest")], "PatchedMediaKeysWebkit APIs not available!");
    b.MediaKeyStatusMap.KEY_ID_ = (new Uint8Array([0])).buffer;
    navigator.requestMediaKeySystemAccess = b.requestMediaKeySystemAccess;
    delete HTMLMediaElement.prototype.mediaKeys;
    HTMLMediaElement.prototype.mediaKeys =
        null;
    HTMLMediaElement.prototype.setMediaKeys = b.setMediaKeys;
    window.MediaKeys = b.MediaKeys;
    window.MediaKeySystemAccess = b.MediaKeySystemAccess
};
shaka.polyfill.PatchedMediaKeysWebkit.prefixApi_ = function (a) {
    var b = shaka.polyfill.PatchedMediaKeysWebkit.prefix_;
    return b ? b + a.charAt(0).toUpperCase() + a.slice(1) : a
};
shaka.polyfill.PatchedMediaKeysWebkit.requestMediaKeySystemAccess = function (a, b) {
    shaka.log.debug("PatchedMediaKeysWebkit.requestMediaKeySystemAccess");
    goog.asserts.assert(this == navigator, 'bad "this" for requestMediaKeySystemAccess');
    var c = shaka.polyfill.PatchedMediaKeysWebkit;
    try {
        var d = new c.MediaKeySystemAccess(a, b);
        return Promise.resolve(d)
    } catch (e) {
        return Promise.reject(e)
    }
};
shaka.polyfill.PatchedMediaKeysWebkit.setMediaKeys = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.setMediaKeys");
    goog.asserts.assert(this instanceof HTMLMediaElement, 'bad "this" for setMediaKeys');
    var b = shaka.polyfill.PatchedMediaKeysWebkit, c = this.mediaKeys;
    c && c != a && (goog.asserts.assert(c instanceof b.MediaKeys, "non-polyfill instance of oldMediaKeys"), c.setMedia(null));
    delete this.mediaKeys;
    if (this.mediaKeys = a) goog.asserts.assert(a instanceof b.MediaKeys, "non-polyfill instance of newMediaKeys"),
        a.setMedia(this);
    return Promise.resolve()
};
shaka.polyfill.PatchedMediaKeysWebkit.getVideoElement_ = function () {
    var a = document.getElementsByTagName("video");
    return a.length ? a[0] : document.createElement("video")
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySystemAccess = function (a, b) {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySystemAccess");
    this.internalKeySystem_ = this.keySystem = a;
    var c = !1;
    "org.w3.clearkey" == a && (this.internalKeySystem_ = "webkit-org.w3.clearkey", c = !1);
    for (var d = !1, e = shaka.polyfill.PatchedMediaKeysWebkit.getVideoElement_(), f = 0; f < b.length; ++f) {
        var g = b[f];
        var h = {
            audioCapabilities: [],
            videoCapabilities: [],
            persistentState: "optional",
            distinctiveIdentifier: "optional",
            initDataTypes: g.initDataTypes,
            sessionTypes: ["temporary"],
            label: g.label
        }, k = !1;
        if (g.audioCapabilities) for (var l = 0; l < g.audioCapabilities.length; ++l) {
            var m = g.audioCapabilities[l];
            if (m.contentType) {
                var k = !0, n = m.contentType.split(";")[0];
                e.canPlayType(n, this.internalKeySystem_) && (h.audioCapabilities.push(m), d = !0)
            }
        }
        if (g.videoCapabilities) for (l = 0; l < g.videoCapabilities.length; ++l) m = g.videoCapabilities[l], m.contentType && (k = !0, e.canPlayType(m.contentType, this.internalKeySystem_) && (h.videoCapabilities.push(m), d = !0));
        k || (d = e.canPlayType("video/mp4",
            this.internalKeySystem_) || e.canPlayType("video/webm", this.internalKeySystem_));
        "required" == g.persistentState && (c ? (h.persistentState = "required", h.sessionTypes = ["persistent-license"]) : d = !1);
        if (d) {
            this.configuration_ = h;
            return
        }
    }
    g = "Unsupported keySystem";
    if ("org.w3.clearkey" == a || "com.widevine.alpha" == a) g = "None of the requested configurations were supported.";
    g = Error(g);
    g.name = "NotSupportedError";
    g.code = DOMException.NOT_SUPPORTED_ERR;
    throw g;
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySystemAccess.prototype.createMediaKeys = function () {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySystemAccess.createMediaKeys");
    var a = new shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys(this.internalKeySystem_);
    return Promise.resolve(a)
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySystemAccess.prototype.getConfiguration = function () {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySystemAccess.getConfiguration");
    return this.configuration_
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeys");
    this.keySystem_ = a;
    this.media_ = null;
    this.eventManager_ = new shaka.util.EventManager;
    this.newSessions_ = [];
    this.sessionMap_ = {}
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys.prototype.setMedia = function (a) {
    this.media_ = a;
    this.eventManager_.removeAll();
    var b = shaka.polyfill.PatchedMediaKeysWebkit.prefix_;
    a && (this.eventManager_.listen(a, b + "needkey", this.onWebkitNeedKey_.bind(this)), this.eventManager_.listen(a, b + "keymessage", this.onWebkitKeyMessage_.bind(this)), this.eventManager_.listen(a, b + "keyadded", this.onWebkitKeyAdded_.bind(this)), this.eventManager_.listen(a, b + "keyerror", this.onWebkitKeyError_.bind(this)))
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys.prototype.createSession = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeys.createSession");
    var b = a || "temporary";
    if ("temporary" != b && "persistent-license" != b) throw new TypeError("Session type " + a + " is unsupported on this platform.");
    a = shaka.polyfill.PatchedMediaKeysWebkit;
    var c = this.media_ || document.createElement("video");
    c.src || (c.src = "about:blank");
    b = new a.MediaKeySession(c, this.keySystem_, b);
    this.newSessions_.push(b);
    return b
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys.prototype.setServerCertificate = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeys.setServerCertificate");
    return Promise.resolve(!1)
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys.prototype.onWebkitNeedKey_ = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.onWebkitNeedKey_", a);
    goog.asserts.assert(this.media_, "media_ not set in onWebkitNeedKey_");
    var b = document.createEvent("CustomEvent");
    b.initCustomEvent("encrypted", !1, !1, null);
    b.initDataType = "webm";
    b.initData = a.initData;
    this.media_.dispatchEvent(b)
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys.prototype.onWebkitKeyMessage_ = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.onWebkitKeyMessage_", a);
    var b = this.findSession_(a.sessionId);
    if (b) {
        var c = void 0 == b.keyStatuses.getStatus();
        a = new shaka.util.FakeEvent("message", {
            messageType: c ? "licenserequest" : "licenserenewal",
            message: a.message
        });
        b.generated();
        b.dispatchEvent(a)
    } else shaka.log.error("Session not found", a.sessionId)
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys.prototype.onWebkitKeyAdded_ = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.onWebkitKeyAdded_", a);
    a = this.findSession_(a.sessionId);
    goog.asserts.assert(a, "unable to find session in onWebkitKeyAdded_");
    a && a.ready()
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys.prototype.onWebkitKeyError_ = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.onWebkitKeyError_", a);
    var b = this.findSession_(a.sessionId);
    goog.asserts.assert(b, "unable to find session in onWebkitKeyError_");
    b && b.handleError(a)
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeys.prototype.findSession_ = function (a) {
    var b = this.sessionMap_[a];
    return b ? (shaka.log.debug("PatchedMediaKeysWebkit.MediaKeys.findSession_", b), b) : (b = this.newSessions_.shift()) ? (b.sessionId = a, this.sessionMap_[a] = b, shaka.log.debug("PatchedMediaKeysWebkit.MediaKeys.findSession_", b), b) : null
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession = function (a, b, c) {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySession");
    shaka.util.FakeEventTarget.call(this);
    this.media_ = a;
    this.initialized_ = !1;
    this.updatePromise_ = this.generatePromise_ = null;
    this.keySystem_ = b;
    this.type_ = c;
    this.sessionId = "";
    this.expiration = NaN;
    this.closed = new shaka.util.PublicPromise;
    this.keyStatuses = new shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap
};
goog.inherits(shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession, shaka.util.FakeEventTarget);
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.generated = function () {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySession.generated");
    this.generatePromise_ && (this.generatePromise_.resolve(), this.generatePromise_ = null)
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.ready = function () {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySession.ready");
    this.updateKeyStatus_("usable");
    this.updatePromise_ && this.updatePromise_.resolve();
    this.updatePromise_ = null
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.handleError = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySession.handleError", a);
    var b = Error("EME v0.1b key error");
    b.errorCode = a.errorCode;
    b.errorCode.systemCode = a.systemCode;
    !a.sessionId && this.generatePromise_ ? (b.method = "generateRequest", 45 == a.systemCode && (b.message = "Unsupported session type."), this.generatePromise_.reject(b), this.generatePromise_ = null) : a.sessionId && this.updatePromise_ ? (b.method = "update", this.updatePromise_.reject(b),
        this.updatePromise_ = null) : (b = a.systemCode, a.errorCode.code == MediaKeyError.MEDIA_KEYERR_OUTPUT ? this.updateKeyStatus_("output-restricted") : 1 == b ? this.updateKeyStatus_("expired") : this.updateKeyStatus_("internal-error"))
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.generate_ = function (a, b) {
    if (this.initialized_) return Promise.reject(Error("The session is already initialized."));
    this.initialized_ = !0;
    try {
        if ("persistent-license" == this.type_) {
            var c = shaka.util.StringUtils;
            if (b) var d = new Uint8Array(c.toUTF8("LOAD_SESSION|" + b)); else {
                var e = c.toUTF8("PERSISTENT|"), f = new Uint8Array(e.byteLength + a.byteLength);
                f.set(new Uint8Array(e), 0);
                f.set(new Uint8Array(a), e.byteLength);
                d = f
            }
        } else goog.asserts.assert("temporary" ==
            this.type_, "expected temporary session"), goog.asserts.assert(!b, "unexpected offline session ID"), d = new Uint8Array(a);
        goog.asserts.assert(d, "init data not set!")
    } catch (h) {
        return Promise.reject(h)
    }
    goog.asserts.assert(null == this.generatePromise_, "generatePromise_ should be null");
    this.generatePromise_ = new shaka.util.PublicPromise;
    var c = shaka.polyfill.PatchedMediaKeysWebkit.prefixApi_, g = c("generateKeyRequest");
    try {
        this.media_[g](this.keySystem_, d)
    } catch (h) {
        if ("InvalidStateError" != h.name) return this.generatePromise_ =
            null, Promise.reject(h);
        setTimeout(function () {
            try {
                this.media_[g](this.keySystem_, d)
            } catch (k) {
                this.generatePromise_.reject(k), this.generatePromise_ = null
            }
        }.bind(this), 10)
    }
    return this.generatePromise_
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.update_ = function (a, b) {
    if (this.updatePromise_) this.updatePromise_.then(this.update_.bind(this, a, b))["catch"](this.update_.bind(this, a, b)); else {
        this.updatePromise_ = a;
        if ("webkit-org.w3.clearkey" == this.keySystem_) {
            var c = shaka.util.Uint8ArrayUtils;
            var d = shaka.util.StringUtils.fromUTF8(b);
            var e = JSON.parse(d);
            "oct" != e.keys[0].kty && (this.updatePromise_.reject(Error("Response is not a valid JSON Web Key Set.")), this.updatePromise_ = null);
            d = c.fromBase64(e.keys[0].k);
            c = c.fromBase64(e.keys[0].kid)
        } else d = new Uint8Array(b), c = null;
        e = shaka.polyfill.PatchedMediaKeysWebkit.prefixApi_;
        e = e("addKey");
        try {
            this.media_[e](this.keySystem_, d, c, this.sessionId)
        } catch (f) {
            this.updatePromise_.reject(f), this.updatePromise_ = null
        }
    }
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.updateKeyStatus_ = function (a) {
    this.keyStatuses.setStatus(a);
    a = new shaka.util.FakeEvent("keystatuseschange");
    this.dispatchEvent(a)
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.generateRequest = function (a, b) {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySession.generateRequest");
    return this.generate_(b, null)
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.load = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySession.load");
    return "persistent-license" == this.type_ ? this.generate_(null, a) : Promise.reject(Error("Not a persistent session."))
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.update = function (a) {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySession.update", a);
    goog.asserts.assert(this.sessionId, "update without session ID");
    var b = new shaka.util.PublicPromise;
    this.update_(b, a);
    return b
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.close = function () {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySession.close");
    if ("persistent-license" != this.type_) {
        if (!this.sessionId) return this.closed.reject(Error("The session is not callable.")), this.closed;
        var a = shaka.polyfill.PatchedMediaKeysWebkit.prefixApi_, a = a("cancelKeyRequest");
        try {
            this.media_[a](this.keySystem_, this.sessionId)
        } catch (b) {
        }
    }
    this.closed.resolve();
    return this.closed
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeySession.prototype.remove = function () {
    shaka.log.debug("PatchedMediaKeysWebkit.MediaKeySession.remove");
    return "persistent-license" != this.type_ ? Promise.reject(Error("Not a persistent session.")) : this.close()
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap = function () {
    this.size = 0;
    this.status_ = void 0
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.prototype.setStatus = function (a) {
    this.size = void 0 == a ? 0 : 1;
    this.status_ = a
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.prototype.getStatus = function () {
    return this.status_
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.prototype.forEach = function (a) {
    this.status_ && a(this.status_, shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.KEY_ID_)
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.prototype.get = function (a) {
    if (this.has(a)) return this.status_
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.prototype.has = function (a) {
    var b = shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.KEY_ID_;
    return this.status_ && shaka.util.Uint8ArrayUtils.equal(new Uint8Array(a), new Uint8Array(b)) ? !0 : !1
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.prototype.entries = function () {
    goog.asserts.assert(!1, "Not used!  Provided only for compiler.")
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.prototype.keys = function () {
    goog.asserts.assert(!1, "Not used!  Provided only for compiler.")
};
shaka.polyfill.PatchedMediaKeysWebkit.MediaKeyStatusMap.prototype.values = function () {
    goog.asserts.assert(!1, "Not used!  Provided only for compiler.")
};
shaka.polyfill.MediaKeys = {};
shaka.polyfill.MediaKeys.install = function () {
    shaka.log.debug("MediaKeys.install");
    window.HTMLVideoElement && (navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration ? shaka.log.info("Using native EME as-is.") : HTMLMediaElement.prototype.webkitGenerateKeyRequest ? (shaka.log.info("Using webkit-prefixed EME v0.1b"), shaka.polyfill.PatchedMediaKeysWebkit.install("webkit")) : HTMLMediaElement.prototype.generateKeyRequest ? (shaka.log.info("Using nonprefixed EME v0.1b"), shaka.polyfill.PatchedMediaKeysWebkit.install("")) :
        window.MSMediaKeys ? (shaka.log.info("Using ms-prefixed EME v20140218"), shaka.polyfill.PatchedMediaKeysMs.install()) : (shaka.log.info("EME not available."), shaka.polyfill.PatchedMediaKeysNop.install()))
};
shaka.polyfill.register(shaka.polyfill.MediaKeys.install);
shaka.polyfill.MediaSource = {};
shaka.polyfill.MediaSource.install = function () {
    shaka.log.debug("MediaSource.install");
    if (window.MediaSource) if (window.cast && cast.__platform__ && cast.__platform__.canDisplayType) shaka.log.info("Patching Chromecast MSE bugs."), shaka.polyfill.MediaSource.patchCastIsTypeSupported_(); else if (navigator.vendor && 0 <= navigator.vendor.indexOf("Apple")) {
        var a = navigator.appVersion;
        shaka.polyfill.MediaSource.rejectTsContent_();
        0 <= a.indexOf("Version/8") ? (shaka.log.info("Blacklisting Safari 8 MSE."), shaka.polyfill.MediaSource.blacklist_()) :
            0 <= a.indexOf("Version/9") ? (shaka.log.info("Patching Safari 9 MSE bugs."), shaka.polyfill.MediaSource.stubAbort_()) : 0 <= a.indexOf("Version/10") ? (shaka.log.info("Patching Safari 10 MSE bugs."), shaka.polyfill.MediaSource.stubAbort_(), shaka.polyfill.MediaSource.patchEndOfStreamEvents_()) : 0 <= a.indexOf("Version/11") && (shaka.log.info("Patching Safari 11 MSE bugs."), shaka.polyfill.MediaSource.stubAbort_(), shaka.polyfill.MediaSource.patchRemovalRange_())
    } else shaka.log.info("Using native MSE as-is."); else shaka.log.info("No MSE implementation available.")
};
shaka.polyfill.MediaSource.blacklist_ = function () {
    window.MediaSource = null
};
shaka.polyfill.MediaSource.stubAbort_ = function () {
    var a = MediaSource.prototype.addSourceBuffer;
    MediaSource.prototype.addSourceBuffer = function () {
        var b = a.apply(this, arguments);
        b.abort = function () {
        };
        return b
    }
};
shaka.polyfill.MediaSource.patchRemovalRange_ = function () {
    var a = SourceBuffer.prototype.remove;
    SourceBuffer.prototype.remove = function (b, c) {
        return a.call(this, b, c - .001)
    }
};
shaka.polyfill.MediaSource.patchEndOfStreamEvents_ = function () {
    var a = MediaSource.prototype.endOfStream;
    MediaSource.prototype.endOfStream = function () {
        for (var b, c = 0, f = 0; f < this.sourceBuffers.length; ++f) b = this.sourceBuffers[f], b = b.buffered.end(b.buffered.length - 1), c = Math.max(c, b);
        if (!isNaN(this.duration) && c < this.duration) for (this.ignoreUpdateEnd_ = !0, f = 0; f < this.sourceBuffers.length; ++f) b = this.sourceBuffers[f], b.eventSuppressed_ = !1;
        return a.apply(this, arguments)
    };
    var b = !1, c = MediaSource.prototype.addSourceBuffer;
    MediaSource.prototype.addSourceBuffer = function () {
        var a = c.apply(this, arguments);
        a.mediaSource_ = this;
        a.addEventListener("updateend", shaka.polyfill.MediaSource.ignoreUpdateEnd_, !1);
        b || (this.addEventListener("sourceclose", shaka.polyfill.MediaSource.cleanUpListeners_, !1), b = !0);
        return a
    }
};
shaka.polyfill.MediaSource.ignoreUpdateEnd_ = function (a) {
    var b = a.target, c = b.mediaSource_;
    if (c.ignoreUpdateEnd_) {
        a.preventDefault();
        a.stopPropagation();
        a.stopImmediatePropagation();
        b.eventSuppressed_ = !0;
        for (a = 0; a < c.sourceBuffers.length; ++a) if (0 == c.sourceBuffers[a].eventSuppressed_) return;
        c.ignoreUpdateEnd_ = !1
    }
};
shaka.polyfill.MediaSource.cleanUpListeners_ = function (a) {
    a = a.target;
    for (var b = 0; b < a.sourceBuffers.length; ++b) a.sourceBuffers[b].removeEventListener("updateend", shaka.polyfill.MediaSource.ignoreUpdateEnd_, !1);
    a.removeEventListener("sourceclose", shaka.polyfill.MediaSource.cleanUpListeners_, !1)
};
shaka.polyfill.MediaSource.rejectTsContent_ = function () {
    var a = MediaSource.isTypeSupported;
    MediaSource.isTypeSupported = function (b) {
        return "mp2t" == b.split(/ *; */)[0].split("/")[1] ? !1 : a(b)
    }
};
shaka.polyfill.MediaSource.patchCastIsTypeSupported_ = function () {
    var a = MediaSource.isTypeSupported, b = /^dv(?:he|av)\./;
    MediaSource.isTypeSupported = function (c) {
        for (var d, e, f = c.split(/ *; */), g = f[0], h = {}, k = 1; k < f.length; ++k) d = f[k].split("="), e = d[0], d = d[1].replace(/"(.*)"/, "$1"), h[e] = d;
        d = h.codecs;
        if (!d) return a(c);
        var l = !1, m = !1;
        c = d.split(",").filter(function (a) {
            if (b.test(a)) return m = !0, !1;
            /^(hev|hvc)1\.2/.test(a) && (l = !0);
            return !0
        });
        m && (l = !1);
        h.codecs = c.join(",");
        l && (h.eotf = "smpte2084");
        for (e in h) d = h[e],
            g += "; " + e + '="' + d + '"';
        return cast.__platform__.canDisplayType(g)
    }
};
shaka.polyfill.register(shaka.polyfill.MediaSource.install);
shaka.polyfill.Promise = function (a) {
    this.thens_ = [];
    this.catches_ = [];
    this.state_ = shaka.polyfill.Promise.State.PENDING;
    if (a) try {
        a(this.resolve_.bind(this), this.reject_.bind(this))
    } catch (b) {
        this.reject_(b)
    }
};
shaka.polyfill.Promise.State = {PENDING: 0, RESOLVED: 1, REJECTED: 2};
shaka.polyfill.Promise.install = function (a) {
    window.setImmediate ? (shaka.polyfill.Promise.setImmediate_ = function (a) {
        return window.setImmediate(a)
    }, shaka.polyfill.Promise.clearImmediate_ = function (a) {
        return window.clearImmediate(a)
    }) : (shaka.polyfill.Promise.setImmediate_ = function (a) {
        return window.setTimeout(a, 0)
    }, shaka.polyfill.Promise.clearImmediate_ = function (a) {
        return window.clearTimeout(a)
    });
    window.Promise && !a ? shaka.log.info("Using native Promises.") : (shaka.log.info("Using Promises polyfill."), window.Promise =
        shaka.polyfill.Promise, window.Promise.resolve = shaka.polyfill.Promise.resolve, window.Promise.reject = shaka.polyfill.Promise.reject, window.Promise.all = shaka.polyfill.Promise.all, window.Promise.race = shaka.polyfill.Promise.race, window.Promise.prototype.then = shaka.polyfill.Promise.prototype.then, window.Promise.prototype["catch"] = shaka.polyfill.Promise.prototype["catch"])
};
shaka.polyfill.Promise.uninstall = function () {
    shaka.polyfill.Promise.nativePromise_ && (shaka.log.info("Removing Promise polyfill."), window.Promise = shaka.polyfill.Promise.nativePromise_, shaka.polyfill.Promise.q_ = [])
};
shaka.polyfill.Promise.resolve = function (a) {
    var b = new shaka.polyfill.Promise;
    b.resolve_(void 0);
    return b.then(function () {
        return a
    })
};
shaka.polyfill.Promise.reject = function (a) {
    var b = new shaka.polyfill.Promise;
    b.reject_(a);
    return b
};
shaka.polyfill.Promise.all = function (a) {
    var b = new shaka.polyfill.Promise;
    if (!a.length) return b.resolve_([]), b;
    for (var c = 0, d = Array(a.length), e = function (a, b, e) {
        goog.asserts.assert(a.state_ != shaka.polyfill.Promise.State.RESOLVED, "Invalid Promise state in Promise.all");
        a.state_ == shaka.polyfill.Promise.State.PENDING && (d[b] = e, c++, c == d.length && a.resolve_(d))
    }, f = b.reject_.bind(b), g = 0; g < a.length; ++g) a[g] && a[g].then ? a[g].then(e.bind(null, b, g), f) : e(b, g, a[g]);
    return b
};
shaka.polyfill.Promise.race = function (a) {
    for (var b = new shaka.polyfill.Promise, c = b.resolve_.bind(b), d = b.reject_.bind(b), e = 0; e < a.length; ++e) a[e] && a[e].then ? a[e].then(c, d) : c(a[e]);
    return b
};
shaka.polyfill.Promise.prototype.then = function (a, b) {
    var c = new shaka.polyfill.Promise;
    switch (this.state_) {
        case shaka.polyfill.Promise.State.RESOLVED:
            this.schedule_(c, a);
            break;
        case shaka.polyfill.Promise.State.REJECTED:
            this.schedule_(c, b);
            break;
        case shaka.polyfill.Promise.State.PENDING:
            this.thens_.push({promise: c, callback: a}), this.catches_.push({promise: c, callback: b})
    }
    return c
};
shaka.polyfill.Promise.prototype["catch"] = function (a) {
    return this.then(void 0, a)
};
shaka.polyfill.Promise.prototype.resolve_ = function (a) {
    if (this.state_ == shaka.polyfill.Promise.State.PENDING) {
        this.value_ = a;
        this.state_ = shaka.polyfill.Promise.State.RESOLVED;
        for (a = 0; a < this.thens_.length; ++a) this.schedule_(this.thens_[a].promise, this.thens_[a].callback);
        this.thens_ = [];
        this.catches_ = []
    }
};
shaka.polyfill.Promise.prototype.reject_ = function (a) {
    if (this.state_ == shaka.polyfill.Promise.State.PENDING) {
        this.value_ = a;
        this.state_ = shaka.polyfill.Promise.State.REJECTED;
        for (a = 0; a < this.catches_.length; ++a) this.schedule_(this.catches_[a].promise, this.catches_[a].callback);
        this.thens_ = [];
        this.catches_ = []
    }
};
shaka.polyfill.Promise.prototype.schedule_ = function (a, b) {
    goog.asserts.assert(this.state_ != shaka.polyfill.Promise.State.PENDING, "Invalid Promise state in Promise.schedule_");
    var c = shaka.polyfill.Promise, d = function () {
        if (b && "function" == typeof b) {
            try {
                var d = b(this.value_)
            } catch (g) {
                a.reject_(g);
                return
            }
            try {
                var f = d && d.then
            } catch (g) {
                a.reject_(g);
                return
            }
            d instanceof c ? d == a ? a.reject_(new TypeError("Chaining cycle detected")) : d.then(a.resolve_.bind(a), a.reject_.bind(a)) : f ? c.handleThenable_(d, f, a) : a.resolve_(d)
        } else this.state_ ==
        c.State.RESOLVED ? a.resolve_(this.value_) : a.reject_(this.value_)
    }.bind(this);
    c.q_.push(d);
    null == c.flushTimer_ && (c.flushTimer_ = c.setImmediate_(c.flush))
};
shaka.polyfill.Promise.handleThenable_ = function (a, b, c) {
    var d = shaka.polyfill.Promise;
    try {
        var e = !1;
        b.call(a, function (a) {
            if (!e) {
                e = !0;
                try {
                    var b = a && a.then
                } catch (h) {
                    c.reject_(h);
                    return
                }
                b ? d.handleThenable_(a, b, c) : c.resolve_(a)
            }
        }, c.reject_.bind(c))
    } catch (f) {
        c.reject_(f)
    }
};
shaka.polyfill.Promise.flush = function () {
    for (var a = shaka.polyfill.Promise; a.q_.length;) {
        null != a.flushTimer_ && (a.clearImmediate_(a.flushTimer_), a.flushTimer_ = null);
        var b = a.q_;
        a.q_ = [];
        for (var c = 0; c < b.length; ++c) b[c]()
    }
};
shaka.polyfill.Promise.setImmediate_ = function (a) {
    return 0
};
shaka.polyfill.Promise.clearImmediate_ = function (a) {
};
shaka.polyfill.Promise.flushTimer_ = null;
shaka.polyfill.Promise.q_ = [];
shaka.polyfill.Promise.nativePromise_ = window.Promise;
shaka.polyfill.register(shaka.polyfill.Promise.install);
shaka.polyfill.VideoPlayPromise = {};
shaka.polyfill.VideoPlayPromise.install = function () {
    shaka.log.debug("VideoPlayPromise.install");
    if (window.HTMLMediaElement) {
        var a = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play = function () {
            var b = a.apply(this, arguments);
            b && b["catch"](function () {
            });
            return b
        }
    }
};
shaka.polyfill.register(shaka.polyfill.VideoPlayPromise.install);
shaka.polyfill.VideoPlaybackQuality = {};
shaka.polyfill.VideoPlaybackQuality.install = function () {
    if (window.HTMLVideoElement) {
        var a = HTMLVideoElement.prototype;
        !a.getVideoPlaybackQuality && "webkitDroppedFrameCount" in a && (a.getVideoPlaybackQuality = shaka.polyfill.VideoPlaybackQuality.webkit_)
    }
};
shaka.polyfill.VideoPlaybackQuality.webkit_ = function () {
    return {
        droppedVideoFrames: this.webkitDroppedFrameCount,
        totalVideoFrames: this.webkitDecodedFrameCount,
        corruptedVideoFrames: 0,
        creationTime: NaN,
        totalFrameDelay: 0
    }
};
shaka.polyfill.register(shaka.polyfill.VideoPlaybackQuality.install);
shaka.polyfill.VTTCue = {};
shaka.polyfill.VTTCue.install = function () {
    if (window.VTTCue) shaka.log.info("Using native VTTCue."); else if (window.TextTrackCue) {
        var a = TextTrackCue.length;
        3 == a ? (shaka.log.info("Using VTTCue polyfill from 3 argument TextTrackCue."), window.VTTCue = shaka.polyfill.VTTCue.from3ArgsTextTrackCue_) : 6 == a ? (shaka.log.info("Using VTTCue polyfill from 6 argument TextTrackCue."), window.VTTCue = shaka.polyfill.VTTCue.from6ArgsTextTrackCue_) : shaka.polyfill.VTTCue.canUse3ArgsTextTrackCue_() && (shaka.log.info("Using VTTCue polyfill from 3 argument TextTrackCue."), window.VTTCue =
            shaka.polyfill.VTTCue.from3ArgsTextTrackCue_)
    } else shaka.log.error("VTTCue not available.")
};
shaka.polyfill.VTTCue.from3ArgsTextTrackCue_ = function (a, b, c) {
    return new window.TextTrackCue(a, b, c)
};
shaka.polyfill.VTTCue.from6ArgsTextTrackCue_ = function (a, b, c) {
    return new window.TextTrackCue(a + "-" + b + "-" + c, a, b, c)
};
shaka.polyfill.VTTCue.canUse3ArgsTextTrackCue_ = function () {
    try {
        return !!shaka.polyfill.VTTCue.from3ArgsTextTrackCue_(1, 2, "")
    } catch (a) {
        return !1
    }
};
shaka.polyfill.register(shaka.polyfill.VTTCue.install);
shaka.text.Cue = function (a, b, c) {
    var d = shaka.text.Cue;
    this.startTime = a;
    this.endTime = b;
    this.payload = c;
    this.region = {x: 0, y: 0, width: 100, height: 100};
    this.position = null;
    this.positionAlign = d.positionAlign.AUTO;
    this.size = 100;
    this.textAlign = d.textAlign.CENTER;
    this.writingDirection = d.writingDirection.HORIZONTAL_LEFT_TO_RIGHT;
    this.lineInterpretation = d.lineInterpretation.LINE_NUMBER;
    this.line = null;
    this.lineHeight = "";
    this.lineAlign = d.lineAlign.CENTER;
    this.displayAlign = d.displayAlign.BEFORE;
    this.fontSize = this.backgroundColor =
        this.color = "";
    this.fontWeight = d.fontWeight.NORMAL;
    this.fontStyle = d.fontStyle.NORMAL;
    this.fontFamily = "";
    this.textDecoration = [];
    this.wrapLine = !0;
    this.id = ""
};
goog.exportSymbol("shaka.text.Cue", shaka.text.Cue);
shaka.text.Cue.positionAlign = {LEFT: "line-left", RIGHT: "line-right", CENTER: "center", AUTO: "auto"};
goog.exportProperty(shaka.text.Cue, "positionAlign", shaka.text.Cue.positionAlign);
shaka.text.Cue.textAlign = {LEFT: "left", RIGHT: "right", CENTER: "center", START: "start", END: "end"};
goog.exportProperty(shaka.text.Cue, "textAlign", shaka.text.Cue.textAlign);
shaka.text.Cue.displayAlign = {BEFORE: "before", CENTER: "center", AFTER: "after"};
goog.exportProperty(shaka.text.Cue, "displayAlign", shaka.text.Cue.displayAlign);
shaka.text.Cue.writingDirection = {
    HORIZONTAL_LEFT_TO_RIGHT: 0,
    HORIZONTAL_RIGHT_TO_LEFT: 1,
    VERTICAL_LEFT_TO_RIGHT: 2,
    VERTICAL_RIGHT_TO_LEFT: 3
};
goog.exportProperty(shaka.text.Cue, "writingDirection", shaka.text.Cue.writingDirection);
shaka.text.Cue.lineInterpretation = {LINE_NUMBER: 0, PERCENTAGE: 1};
goog.exportProperty(shaka.text.Cue, "lineInterpretation", shaka.text.Cue.lineInterpretation);
shaka.text.Cue.lineAlign = {CENTER: "center", START: "start", END: "end"};
goog.exportProperty(shaka.text.Cue, "lineAlign", shaka.text.Cue.lineAlign);
shaka.text.Cue.fontWeight = {NORMAL: 400, BOLD: 700};
goog.exportProperty(shaka.text.Cue, "fontWeight", shaka.text.Cue.fontWeight);
shaka.text.Cue.fontStyle = {NORMAL: "normal", ITALIC: "italic", OBLIQUE: "oblique"};
goog.exportProperty(shaka.text.Cue, "fontStyle", shaka.text.Cue.fontStyle);
shaka.text.Cue.textDecoration = {UNDERLINE: "underline", LINE_THROUGH: "lineThrough", OVERLINE: "overline"};
goog.exportProperty(shaka.text.Cue, "textDecoration", shaka.text.Cue.textDecoration);
shaka.text.TtmlTextParser = function () {
};
shaka.text.TtmlTextParser.prototype.parseInit = function (a) {
    goog.asserts.assert(!1, "TTML does not have init segments")
};
shaka.text.TtmlTextParser.prototype.parseMedia = function (a, b) {
    var c = shaka.util.StringUtils.fromUTF8(a), d = [], e = new DOMParser, f = null;
    try {
        f = e.parseFromString(c, "text/xml")
    } catch (m) {
        throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_XML);
    }
    if (f) {
        if (e = f.getElementsByTagName("tt")[0]) {
            f = e.getAttribute("ttp:frameRate");
            var g = e.getAttribute("ttp:subFrameRate");
            var h = e.getAttribute("ttp:frameRateMultiplier");
            var k = e.getAttribute("ttp:tickRate");
            c = e.getAttribute("xml:space") || "default"
        } else throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_XML);
        if ("default" != c && "preserve" != c) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_XML);
        c = "default" == c;
        f = new shaka.text.TtmlTextParser.RateInfo_(f, g, h, k);
        g = shaka.text.TtmlTextParser.getLeafNodes_(e.getElementsByTagName("styling")[0]);
        h = shaka.text.TtmlTextParser.getLeafNodes_(e.getElementsByTagName("layout")[0]);
        e = shaka.text.TtmlTextParser.getLeafNodes_(e.getElementsByTagName("body")[0]);
        for (k = 0; k < e.length; k++) {
            var l = shaka.text.TtmlTextParser.parseCue_(e[k], b.periodStart, f, g, h, c);
            l && d.push(l)
        }
    }
    return d
};
shaka.text.TtmlTextParser.timeColonFormatFrames_ = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/;
shaka.text.TtmlTextParser.timeColonFormat_ = /^(?:(\d{2,}):)?(\d{2}):(\d{2})$/;
shaka.text.TtmlTextParser.timeColonFormatMilliseconds_ = /^(?:(\d{2,}):)?(\d{2}):(\d{2}\.\d{2,})$/;
shaka.text.TtmlTextParser.timeFramesFormat_ = /^(\d*\.?\d*)f$/;
shaka.text.TtmlTextParser.timeTickFormat_ = /^(\d*\.?\d*)t$/;
shaka.text.TtmlTextParser.timeHMSFormat_ = /^(?:(\d*\.?\d*)h)?(?:(\d*\.?\d*)m)?(?:(\d*\.?\d*)s)?(?:(\d*\.?\d*)ms)?$/;
shaka.text.TtmlTextParser.percentValues_ = /^(\d{1,2}|100)% (\d{1,2}|100)%$/;
shaka.text.TtmlTextParser.unitValues_ = /^(\d+px|\d+em)$/;
shaka.text.TtmlTextParser.textAlignToLineAlign_ = {
    left: "start",
    center: "center",
    right: "end",
    start: "start",
    end: "end"
};
shaka.text.TtmlTextParser.textAlignToPositionAlign_ = {left: "line-left", center: "center", right: "line-right"};
shaka.text.TtmlTextParser.getLeafNodes_ = function (a) {
    var b = [];
    if (!a) return b;
    for (var c = a.childNodes, d = 0; d < c.length; d++) {
        var e = "span" == c[d].nodeName && "p" == a.nodeName;
        c[d].nodeType != Node.ELEMENT_NODE || "br" == c[d].nodeName || e || (goog.asserts.assert(c[d] instanceof Element, "Node should be Element!"), e = shaka.text.TtmlTextParser.getLeafNodes_(c[d]), goog.asserts.assert(0 < e.length, "Only a null Element should return no leaves!"), b = b.concat(e))
    }
    b.length || b.push(a);
    return b
};
shaka.text.TtmlTextParser.addNewLines_ = function (a, b) {
    for (var c = a.childNodes, d = 0; d < c.length; d++) if ("br" == c[d].nodeName && 0 < d) c[d - 1].textContent += "\n"; else if (0 < c[d].childNodes.length) shaka.text.TtmlTextParser.addNewLines_(c[d], b); else if (b) {
        var e = c[d].textContent.trim(), e = e.replace(/\s+/g, " ");
        c[d].textContent = e
    }
};
shaka.text.TtmlTextParser.parseCue_ = function (a, b, c, d, e, f) {
    if (!a.hasAttribute("begin") && !a.hasAttribute("end") && /^\s*$/.test(a.textContent)) return null;
    shaka.text.TtmlTextParser.addNewLines_(a, f);
    f = shaka.text.TtmlTextParser.parseTime_(a.getAttribute("begin"), c);
    var g = shaka.text.TtmlTextParser.parseTime_(a.getAttribute("end"), c);
    c = shaka.text.TtmlTextParser.parseTime_(a.getAttribute("dur"), c);
    var h = a.textContent;
    null == g && null != c && (g = f + c);
    if (null == f || null == g) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL,
        shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_TEXT_CUE);
    b = new shaka.text.Cue(f + b, g + b, h);
    e = shaka.text.TtmlTextParser.getElementFromCollection_(a, "region", e);
    shaka.text.TtmlTextParser.addStyle_(b, a, e, d);
    return b
};
shaka.text.TtmlTextParser.addStyle_ = function (a, b, c, d) {
    var e = shaka.text.TtmlTextParser, f = shaka.text.Cue;
    "rtl" == e.getStyleAttribute_(b, c, d, "tts:direction") && (a.writingDirection = f.writingDirection.HORIZONTAL_RIGHT_TO_LEFT);
    var g = e.getStyleAttribute_(b, c, d, "tts:writingMode");
    "tb" == g || "tblr" == g ? a.writingDirection = f.writingDirection.VERTICAL_LEFT_TO_RIGHT : "tbrl" == g ? a.writingDirection = f.writingDirection.VERTICAL_RIGHT_TO_LEFT : "rltb" == g || "rl" == g ? a.writingDirection = f.writingDirection.HORIZONTAL_RIGHT_TO_LEFT :
        g && (a.writingDirection = f.writingDirection.HORIZONTAL_LEFT_TO_RIGHT);
    if (g = e.getStyleAttribute_(b, c, d, "tts:origin")) g = e.percentValues_.exec(g), null != g && (a.region.x = Number(g[1]), a.region.y = Number(g[2]));
    if (g = e.getStyleAttribute_(b, c, d, "tts:extent")) g = e.percentValues_.exec(g), null != g && (a.region.width = Number(g[1]), a.region.height = Number(g[2]));
    if (g = e.getStyleAttribute_(b, c, d, "tts:textAlign")) a.positionAlign = e.textAlignToPositionAlign_[g], a.lineAlign = e.textAlignToLineAlign_[g], goog.asserts.assert(g.toUpperCase() in
        f.textAlign, g.toUpperCase() + " Should be in Cue.textAlign values!"), a.textAlign = f.textAlign[g.toUpperCase()];
    if (g = e.getStyleAttribute_(b, c, d, "tts:displayAlign")) goog.asserts.assert(g.toUpperCase() in f.displayAlign, g.toUpperCase() + " Should be in Cue.displayAlign values!"), a.displayAlign = f.displayAlign[g.toUpperCase()];
    if (g = e.getStyleAttribute_(b, c, d, "tts:color")) a.color = g;
    if (g = e.getStyleAttribute_(b, c, d, "tts:backgroundColor")) a.backgroundColor = g;
    if (g = e.getStyleAttribute_(b, c, d, "tts:fontFamily")) a.fontFamily =
        g;
    (g = e.getStyleAttribute_(b, c, d, "tts:fontWeight")) && "bold" == g && (a.fontWeight = f.fontWeight.BOLD);
    (g = e.getStyleAttribute_(b, c, d, "tts:wrapOption")) && "noWrap" == g && (a.wrapLine = !1);
    (g = e.getStyleAttribute_(b, c, d, "tts:lineHeight")) && g.match(e.unitValues_) && (a.lineHeight = g);
    (g = e.getStyleAttribute_(b, c, d, "tts:fontSize")) && g.match(e.unitValues_) && (a.fontSize = g);
    if (g = e.getStyleAttribute_(b, c, d, "tts:fontStyle")) goog.asserts.assert(g.toUpperCase() in f.fontStyle, g.toUpperCase() + " Should be in Cue.fontStyle values!"),
        a.fontStyle = f.fontStyle[g.toUpperCase()];
    (c = e.getStyleAttributeFromRegion_(c, d, "tts:textDecoration")) && e.addTextDecoration_(a, c);
    (b = e.getStyleAttributeFromElement_(b, d, "tts:textDecoration")) && e.addTextDecoration_(a, b)
};
shaka.text.TtmlTextParser.addTextDecoration_ = function (a, b) {
    for (var c = shaka.text.Cue, d = b.split(" "), e = 0; e < d.length; e++) switch (d[e]) {
        case "underline":
            0 > a.textDecoration.indexOf(c.textDecoration.UNDERLINE) && a.textDecoration.push(c.textDecoration.UNDERLINE);
            break;
        case "noUnderline":
            0 <= a.textDecoration.indexOf(c.textDecoration.UNDERLINE) && shaka.util.ArrayUtils.remove(a.textDecoration, c.textDecoration.UNDERLINE);
            break;
        case "lineThrough":
            0 > a.textDecoration.indexOf(c.textDecoration.LINE_THROUGH) && a.textDecoration.push(c.textDecoration.LINE_THROUGH);
            break;
        case "noLineThrough":
            0 <= a.textDecoration.indexOf(c.textDecoration.LINE_THROUGH) && shaka.util.ArrayUtils.remove(a.textDecoration, c.textDecoration.LINE_THROUGH);
            break;
        case "overline":
            0 > a.textDecoration.indexOf(c.textDecoration.OVERLINE) && a.textDecoration.push(c.textDecoration.OVERLINE);
            break;
        case "noOverline":
            0 <= a.textDecoration.indexOf(c.textDecoration.OVERLINE) && shaka.util.ArrayUtils.remove(a.textDecoration, c.textDecoration.OVERLINE)
    }
};
shaka.text.TtmlTextParser.getStyleAttribute_ = function (a, b, c, d) {
    var e = shaka.text.TtmlTextParser;
    return (a = e.getStyleAttributeFromElement_(a, c, d)) ? a : e.getStyleAttributeFromRegion_(b, c, d)
};
shaka.text.TtmlTextParser.getStyleAttributeFromRegion_ = function (a, b, c) {
    for (var d = shaka.text.TtmlTextParser.getLeafNodes_(a), e = 0; e < d.length; e++) {
        var f = d[e].getAttribute(c);
        if (f) return f
    }
    return (a = shaka.text.TtmlTextParser.getElementFromCollection_(a, "style", b)) ? a.getAttribute(c) : null
};
shaka.text.TtmlTextParser.getStyleAttributeFromElement_ = function (a, b, c) {
    var d = shaka.text.TtmlTextParser.getElementFromCollection_;
    return (a = d(a, "style", b)) ? a.getAttribute(c) : null
};
shaka.text.TtmlTextParser.getElementFromCollection_ = function (a, b, c) {
    if (!a || 1 > c.length) return null;
    var d = null;
    if (a = shaka.text.TtmlTextParser.getInheritedAttribute_(a, b)) for (b = 0; b < c.length; b++) if (c[b].getAttribute("xml:id") == a) {
        d = c[b];
        break
    }
    return d
};
shaka.text.TtmlTextParser.getInheritedAttribute_ = function (a, b) {
    for (var c = null; a && !(c = a.getAttribute(b));) {
        var d = a.parentNode;
        if (d instanceof Element) a = d; else break
    }
    return c
};
shaka.text.TtmlTextParser.parseTime_ = function (a, b) {
    var c = null, d = shaka.text.TtmlTextParser;
    d.timeColonFormatFrames_.test(a) ? c = d.parseColonTimeWithFrames_(b, a) : d.timeColonFormat_.test(a) ? c = d.parseTimeFromRegex_(d.timeColonFormat_, a) : d.timeColonFormatMilliseconds_.test(a) ? c = d.parseTimeFromRegex_(d.timeColonFormatMilliseconds_, a) : d.timeFramesFormat_.test(a) ? c = d.parseFramesTime_(b, a) : d.timeTickFormat_.test(a) ? c = d.parseTickTime_(b, a) : d.timeHMSFormat_.test(a) && (c = d.parseTimeFromRegex_(d.timeHMSFormat_, a));
    return c
};
shaka.text.TtmlTextParser.parseFramesTime_ = function (a, b) {
    var c = shaka.text.TtmlTextParser.timeFramesFormat_.exec(b);
    return Number(c[1]) / a.frameRate
};
shaka.text.TtmlTextParser.parseTickTime_ = function (a, b) {
    var c = shaka.text.TtmlTextParser.timeTickFormat_.exec(b);
    return Number(c[1]) / a.tickRate
};
shaka.text.TtmlTextParser.parseColonTimeWithFrames_ = function (a, b) {
    var c = shaka.text.TtmlTextParser.timeColonFormatFrames_.exec(b), d = Number(c[1]), e = Number(c[2]),
        f = Number(c[3]), g = Number(c[4]), g = g + (Number(c[5]) || 0) / a.subFrameRate, f = f + g / a.frameRate;
    return f + 60 * e + 3600 * d
};
shaka.text.TtmlTextParser.parseTimeFromRegex_ = function (a, b) {
    var c = a.exec(b);
    return null == c || "" == c[0] ? null : (Number(c[4]) || 0) / 1E3 + (Number(c[3]) || 0) + 60 * (Number(c[2]) || 0) + 3600 * (Number(c[1]) || 0)
};
shaka.text.TtmlTextParser.RateInfo_ = function (a, b, c, d) {
    this.frameRate = Number(a) || 30;
    this.subFrameRate = Number(b) || 1;
    this.tickRate = Number(d);
    0 == this.tickRate && (this.tickRate = a ? this.frameRate * this.subFrameRate : 1);
    c && (a = /^(\d+) (\d+)$/g.exec(c)) && (this.frameRate *= a[1] / a[2])
};
shaka.text.TextEngine.registerParser("application/ttml+xml", shaka.text.TtmlTextParser);
shaka.text.Mp4TtmlParser = function () {
    this.parser_ = new shaka.text.TtmlTextParser
};
shaka.text.Mp4TtmlParser.prototype.parseInit = function (a) {
    var b = shaka.util.Mp4Parser, c = !1;
    (new b).box("moov", b.children).box("trak", b.children).box("mdia", b.children).box("minf", b.children).box("stbl", b.children).fullBox("stsd", b.sampleDescription).box("stpp", function (a) {
        c = !0
    }).parse(a);
    if (!c) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_MP4_TTML);
};
shaka.text.Mp4TtmlParser.prototype.parseMedia = function (a, b) {
    var c = shaka.util.Mp4Parser, d = !1, e = [];
    (new c).box("mdat", c.allData(function (a) {
        d = !0;
        e = e.concat(this.parser_.parseMedia(a.buffer, b))
    }.bind(this))).parse(a);
    if (!d) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_MP4_TTML);
    return e
};
shaka.text.TextEngine.registerParser('application/mp4; codecs="stpp"', shaka.text.Mp4TtmlParser);
shaka.text.TextEngine.registerParser('application/mp4; codecs="stpp.TTML.im1t"', shaka.text.Mp4TtmlParser);
shaka.text.VttTextParser = function () {
};
shaka.text.VttTextParser.prototype.parseInit = function (a) {
    goog.asserts.assert(!1, "VTT does not have init segments")
};
shaka.text.VttTextParser.prototype.parseMedia = function (a, b) {
    var c = shaka.text.VttTextParser, d = shaka.util.StringUtils.fromUTF8(a),
        d = d.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n"), d = d.split(/\n{2,}/m);
    if (!/^WEBVTT($|[ \t\n])/m.test(d[0])) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_TEXT_HEADER);
    var e = b.segmentStart;
    if (0 <= d[0].indexOf("X-TIMESTAMP-MAP")) {
        var f = d[0].match(/LOCAL:((?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3}))/m), g = d[0].match(/MPEGTS:(\d+)/m);
        f && g && (e = new shaka.util.TextParser(f[1]), e = shaka.text.VttTextParser.parseTime_(e), e = b.periodStart + (Number(g[1]) / shaka.text.VttTextParser.MPEG_TIMESCALE_ - e))
    }
    g = [];
    for (f = 1; f < d.length; f++) {
        var h = d[f].split("\n");
        (h = c.parseCue_(h, e)) && g.push(h)
    }
    return g
};
shaka.text.VttTextParser.parseCue_ = function (a, b) {
    if (1 == a.length && !a[0] || /^NOTE($|[ \t])/.test(a[0]) || "STYLE" == a[0]) return null;
    var c = null;
    0 > a[0].indexOf("--\x3e") && (c = a[0], a.splice(0, 1));
    var d = new shaka.util.TextParser(a[0]), e = shaka.text.VttTextParser.parseTime_(d),
        f = d.readRegex(/[ \t]+--\x3e[ \t]+/g), g = shaka.text.VttTextParser.parseTime_(d);
    if (null == e || null == f || null == g) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_TEXT_CUE);
    e += b;
    g += b;
    f = a.slice(1).join("\n").trim();
    e = new shaka.text.Cue(e, g, f);
    d.skipWhitespace();
    for (g = d.readWord(); g;) shaka.text.VttTextParser.parseSetting(e, g) || shaka.log.warning("VTT parser encountered an invalid VTT setting: ", g, " The setting will be ignored."), d.skipWhitespace(), g = d.readWord();
    null != c && (e.id = c);
    return e
};
shaka.text.VttTextParser.parseSetting = function (a, b) {
    var c = shaka.text.VttTextParser, d;
    if (d = /^align:(start|middle|center|end|left|right)$/.exec(b)) c.setTextAlign_(a, d[1]); else if (d = /^vertical:(lr|rl)$/.exec(b)) c.setVerticalWritingDirection_(a, d[1]); else if (d = /^size:([\d\.]+)%$/.exec(b)) a.size = Number(d[1]); else if (d = /^position:([\d\.]+)%(?:,(line-left|line-right|center|start|end))?$/.exec(b)) a.position = Number(d[1]), d[2] && c.setPositionAlign_(a, d[2]); else return c.parsedLineValueAndInterpretation_(a, b);
    return !0
};
shaka.text.VttTextParser.setTextAlign_ = function (a, b) {
    var c = shaka.text.Cue;
    "middle" == b ? a.textAlign = c.textAlign.CENTER : (goog.asserts.assert(b.toUpperCase() in c.textAlign, b.toUpperCase() + " Should be in Cue.textAlign values!"), a.textAlign = c.textAlign[b.toUpperCase()])
};
shaka.text.VttTextParser.setPositionAlign_ = function (a, b) {
    var c = shaka.text.Cue;
    a.positionAlign = "line-left" == b || "start" == b ? c.positionAlign.LEFT : "line-right" == b || "end" == b ? c.positionAlign.RIGHT : c.positionAlign.CENTER
};
shaka.text.VttTextParser.setVerticalWritingDirection_ = function (a, b) {
    var c = shaka.text.Cue;
    a.writingDirection = "lr" == b ? c.writingDirection.VERTICAL_LEFT_TO_RIGHT : c.writingDirection.VERTICAL_RIGHT_TO_LEFT
};
shaka.text.VttTextParser.parsedLineValueAndInterpretation_ = function (a, b) {
    var c = shaka.text.Cue, d;
    if (d = /^line:([\d\.]+)%(?:,(start|end|center))?$/.exec(b)) a.lineInterpretation = c.lineInterpretation.PERCENTAGE, a.line = Number(d[1]), d[2] && (goog.asserts.assert(d[2].toUpperCase() in c.lineAlign, d[2].toUpperCase() + " Should be in Cue.lineAlign values!"), a.lineAlign = c.lineAlign[d[2].toUpperCase()]); else if (d = /^line:(-?\d+)(?:,(start|end|center))?$/.exec(b)) a.lineInterpretation = c.lineInterpretation.LINE_NUMBER,
        a.line = Number(d[1]), d[2] && (goog.asserts.assert(d[2].toUpperCase() in c.lineAlign, d[2].toUpperCase() + " Should be in Cue.lineAlign values!"), a.lineAlign = c.lineAlign[d[2].toUpperCase()]); else return !1;
    return !0
};
shaka.text.VttTextParser.parseTime_ = function (a) {
    a = a.readRegex(/(?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3})/g);
    if (null == a) return null;
    var b = Number(a[2]), c = Number(a[3]);
    return 59 < b || 59 < c ? null : Number(a[4]) / 1E3 + c + 60 * b + 3600 * (Number(a[1]) || 0)
};
shaka.text.VttTextParser.MPEG_TIMESCALE_ = 9E4;
shaka.text.TextEngine.registerParser("text/vtt", shaka.text.VttTextParser);
shaka.text.TextEngine.registerParser('text/vtt; codecs="vtt"', shaka.text.VttTextParser);
shaka.text.Mp4VttParser = function () {
    this.timescale_ = null
};
shaka.text.Mp4VttParser.prototype.parseInit = function (a) {
    var b = shaka.util.Mp4Parser, c = !1;
    (new b).box("moov", b.children).box("trak", b.children).box("mdia", b.children).fullBox("mdhd", function (a) {
        goog.asserts.assert(0 == a.version || 1 == a.version, "MDHD version can only be 0 or 1");
        0 == a.version ? (a.reader.skip(4), a.reader.skip(4), this.timescale_ = a.reader.readUint32(), a.reader.skip(4)) : (a.reader.skip(8), a.reader.skip(8), this.timescale_ = a.reader.readUint32(), a.reader.skip(8));
        a.reader.skip(4)
    }.bind(this)).box("minf",
        b.children).box("stbl", b.children).fullBox("stsd", b.sampleDescription).box("wvtt", function (a) {
        c = !0
    }).parse(a);
    if (!this.timescale_) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_MP4_VTT);
    if (!c) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT, shaka.util.Error.Code.INVALID_MP4_VTT);
};
shaka.text.Mp4VttParser.prototype.parseMedia = function (a, b) {
    var c = shaka.text.Mp4VttParser, d = shaka.util.Mp4Parser, e = 0, f = [], g = [], h = [], k = !1, l = !1, m = !1,
        n = null;
    (new d).box("moof", d.children).box("traf", d.children).fullBox("tfdt", function (a) {
        k = !0;
        goog.asserts.assert(0 == a.version || 1 == a.version, "TFDT version can only be 0 or 1");
        e = 0 == a.version ? a.reader.readUint32() : a.reader.readUint64()
    }).fullBox("tfhd", function (a) {
        goog.asserts.assert(null != a.flags, "A TFHD box should have a valid flags value");
        n = c.parseTFHD_(a.flags,
            a.reader)
    }).fullBox("trun", function (a) {
        l = !0;
        goog.asserts.assert(null != a.version, "A TRUN box should have a valid version value");
        goog.asserts.assert(null != a.flags, "A TRUN box should have a valid flags value");
        f = c.parseTRUN_(a.version, a.flags, a.reader)
    }).box("vtte", function (a) {
        g.push(null)
    }).box("vttc", d.allData(function (a) {
        g.push(a.buffer)
    })).box("mdat", function (a) {
        m = !0;
        d.children(a)
    }).parse(a);
    if (!m && !k && !l) throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.TEXT,
        shaka.util.Error.Code.INVALID_MP4_VTT);
    goog.asserts.assert(f.length == g.length, "The number of presentations should equal the number of payloads");
    for (var p = e, r = 0; r < f.length; r++) {
        var q = f[r], t = g[r], w = q.duration || n;
        w ? (q = q.timeOffset ? e + q.timeOffset : p, p = q + w, t && h.push(shaka.text.Mp4VttParser.parseVTTC_(t, b.periodStart + q / this.timescale_, b.periodStart + p / this.timescale_))) : shaka.log.error("WVTT sample duration unknown, and no default found!")
    }
    return h.filter(shaka.util.Functional.isNotNull)
};
shaka.text.Mp4VttParser.parseTFHD_ = function (a, b) {
    b.skip(4);
    a & 1 && b.skip(8);
    a & 2 && b.skip(4);
    return a & 8 ? b.readUint32() : null
};
shaka.text.Mp4VttParser.parseTRUN_ = function (a, b, c) {
    var d = c.readUint32();
    b & 1 && c.skip(4);
    b & 4 && c.skip(4);
    for (var e = [], f = 0; f < d; f++) {
        var g = {duration: null, timeOffset: null};
        b & 256 && (g.duration = c.readUint32());
        b & 512 && c.skip(4);
        b & 1024 && c.skip(4);
        b & 2048 && (g.timeOffset = 0 == a ? c.readUint32() : c.readInt32());
        e.push(g)
    }
    return e
};
shaka.text.Mp4VttParser.parseVTTC_ = function (a, b, c) {
    var d, e, f;
    (new shaka.util.Mp4Parser).box("payl", shaka.util.Mp4Parser.allData(function (a) {
        d = shaka.util.StringUtils.fromUTF8(a)
    })).box("iden", shaka.util.Mp4Parser.allData(function (a) {
        e = shaka.util.StringUtils.fromUTF8(a)
    })).box("sttg", shaka.util.Mp4Parser.allData(function (a) {
        f = shaka.util.StringUtils.fromUTF8(a)
    })).parse(a);
    return d ? shaka.text.Mp4VttParser.assembleCue_(d, e, f, b, c) : null
};
shaka.text.Mp4VttParser.assembleCue_ = function (a, b, c, d, e) {
    a = new shaka.text.Cue(d, e, a);
    b && (a.id = b);
    if (c) for (b = new shaka.util.TextParser(c), c = b.readWord(); c;) shaka.text.VttTextParser.parseSetting(a, c) || shaka.log.warning("VTT parser encountered an invalid VTT setting: ", c, " The setting will be ignored."), b.skipWhitespace(), c = b.readWord();
    return a
};
shaka.text.TextEngine.registerParser('application/mp4; codecs="wvtt"', shaka.text.Mp4VttParser);
//# sourceMappingURL=shaka-player.compiled.debug.map
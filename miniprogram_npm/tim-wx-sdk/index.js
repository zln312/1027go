module.exports = (function () {
    var __MODS__ = {};
    var __DEFINE__ = function (modId, func, req) {
        var m = {
            exports: {},
            _tempexports: {}
        };
        __MODS__[modId] = {
            status: 0,
            func: func,
            req: req,
            m: m
        };
    };
    var __REQUIRE__ = function (modId, source) {
        if (!__MODS__[modId]) return require(source);
        if (!__MODS__[modId].status) {
            var m = __MODS__[modId].m;
            m._exports = m._tempexports;
            var desp = Object.getOwnPropertyDescriptor(m, "exports");
            if (desp && desp.configurable) Object.defineProperty(m, "exports", {
                set: function (val) {
                    if (typeof val === "object" && val !== m._exports) {
                        m._exports.__proto__ = val.__proto__;
                        Object.keys(val).forEach(function (k) {
                            m._exports[k] = val[k];
                        });
                    }
                    m._tempexports = val
                },
                get: function () {
                    return m._tempexports;
                }
            });
            __MODS__[modId].status = 1;
            __MODS__[modId].func(__MODS__[modId].req, m, m.exports);
        }
        return __MODS__[modId].m.exports;
    };
    var __REQUIRE_WILDCARD__ = function (obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for (var k in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k];
                }
            }
            newObj.default = obj;
            return newObj;
        }
    };
    var __REQUIRE_DEFAULT__ = function (obj) {
        return obj && obj.__esModule ? obj.default : obj;
    };
    __DEFINE__(1578395826424, function (require, module, exports) {
        ! function (e, t) {
            "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).TIM = t()
        }(this, function () {
            var e = {
                    SDK_READY: "sdkStateReady",
                    SDK_NOT_READY: "sdkStateNotReady",
                    SDK_DESTROY: "sdkDestroy",
                    MESSAGE_SENDING: "onMessageSending",
                    MESSAGE_SEND_SUCCESS: "onMessageSendSuccess",
                    MESSAGE_SEND_FAIL: "onMessageSendFail",
                    MESSAGE_RECEIVED: "onMessageReceived",
                    APPLY_ADD_FRIEND_SUCCESS: "addFriendApplySendSuccess",
                    APPLY_ADD_FRIEND_FAIL: "addFriendApplySendFail",
                    GET_PENDENCY_SUCCESS: "getPendencySuccess",
                    GET_PENDENCY_FAIL: "getPendencyFail",
                    DELETE_PENDENCY_SUCCESS: "deletePendencySuccess",
                    DELETE_PENDENCY_FAIL: "deletePendencyFail",
                    REPLY_PENDENCY_SUCCESS: "replyPendencySuccess",
                    REPLY_PENDENCY_FAIL: "replyPendencyFail",
                    CONVERSATION_LIST_UPDATED: "onConversationListUpdated",
                    GROUP_LIST_UPDATED: "onGroupListUpdated",
                    GROUP_SYSTEM_NOTICE_RECEIVED: "receiveGroupSystemNotice",
                    LOGIN_CHANGE: "loginStatusChange",
                    LOGOUT_SUCCESS: "logoutSuccess",
                    PROFILE_GET_SUCCESS: "getProfileSuccess",
                    PROFILE_GET_FAIL: "getProfileFail",
                    PROFILE_UPDATED: "onProfileUpdated",
                    PROFILE_UPDATE_MY_PROFILE_FAIL: "updateMyProfileFail",
                    FRIENDLIST_GET_SUCCESS: "getFriendListSuccess",
                    FRIENDLIST_GET_FAIL: "getFriendsFail",
                    FRIEND_DELETE_SUCCESS: "deleteFriendSuccess",
                    FRIEND_DELETE_FAIL: "deleteFriendFail",
                    BLACKLIST_ADD_SUCCESS: "addBlacklistSuccess",
                    BLACKLIST_ADD_FAIL: "addBlacklistFail",
                    BLACKLIST_GET_SUCCESS: "getBlacklistSuccess",
                    BLACKLIST_GET_FAIL: "getBlacklistFail",
                    BLACKLIST_UPDATED: "blacklistUpdated",
                    BLACKLIST_DELETE_FAIL: "deleteBlacklistFail",
                    KICKED_OUT: "kickedOut",
                    ERROR: "error"
                },
                t = {
                    JSON: {
                        TYPE: {
                            C2C: {
                                NOTICE: 1,
                                COMMON: 9,
                                EVENT: 10
                            },
                            GROUP: {
                                COMMON: 3,
                                TIP: 4,
                                SYSTEM: 5,
                                TIP2: 6
                            },
                            FRIEND: {
                                NOTICE: 7
                            },
                            PROFILE: {
                                NOTICE: 8
                            }
                        },
                        SUBTYPE: {
                            C2C: {
                                COMMON: 0,
                                READED: 92,
                                KICKEDOUT: 96
                            },
                            GROUP: {
                                COMMON: 0,
                                LOVEMESSAGE: 1,
                                TIP: 2,
                                REDPACKET: 3
                            }
                        },
                        OPTIONS: {
                            GROUP: {
                                JOIN: 1,
                                QUIT: 2,
                                KICK: 3,
                                SET_ADMIN: 4,
                                CANCEL_ADMIN: 5,
                                MODIFY_GROUP_INFO: 6,
                                MODIFY_MEMBER_INFO: 7
                            }
                        }
                    },
                    PROTOBUF: {},
                    ELEMENT_TYPES: {
                        TEXT: "TIMTextElem",
                        FACE: "TIMFaceElem",
                        SOUND: "TIMSoundElem",
                        FILE: "TIMFileElem",
                        VIDEO: "TIMVideoFileElem",
                        IMAGE: "TIMImageElem",
                        GEO: "TIMLocationElem",
                        GROUP_TIP: "TIMGroupTipElem",
                        GROUP_SYSTEM_NOTICE: "TIMGroupSystemNoticeElem",
                        CUSTOM: "TIMCustomElem"
                    },
                    IMAGE_TYPES: {
                        ORIGIN: 1,
                        LARGE: 2,
                        SMALL: 3
                    },
                    IMAGE_FORMAT: {
                        JPG: 1,
                        JPEG: 1,
                        GIF: 2,
                        PNG: 3,
                        BMP: 4,
                        UNKNOWN: 255
                    }
                },
                n = {
                    C2C: "C2C",
                    GROUP: "GROUP",
                    SYSTEM: "@TIM#SYSTEM"
                },
                r = {
                    PRIVATE: "Private",
                    PUBLIC: "Public",
                    CHATROOM: "ChatRoom",
                    AVCHATROOM: "AVChatRoom"
                },
                o = {
                    OWNER: "Owner",
                    ADMIN: "Admin",
                    MEMBER: "Member"
                },
                i = 1,
                s = 2,
                a = 3,
                u = 4,
                c = 5,
                l = 7,
                p = 8,
                h = 9,
                f = 10,
                g = 15,
                d = 255,
                _ = "mutipleAccount",
                m = "mutipleDevice",
                E = {
                    AUTO: 0,
                    SOCKET: 1,
                    XHR: 2
                },
                y = 0,
                v = 1,
                I = {
                    UNKNOWN: "Gender_Type_Unknown",
                    FEMALE: "Gender_Type_Female",
                    MALE: "Gender_Type_Male"
                },
                S = {
                    NEED_CONFIRM: "AllowType_Type_NeedConfirm",
                    ALLOW_ANY: "AllowType_Type_AllowAny",
                    DENY_ANY: "AllowType_Type_DenyAny"
                },
                T = {
                    NONE: "AdminForbid_Type_None",
                    SEND_OUT: "AdminForbid_Type_SendOut"
                },
                C = {
                    NICK: "Tag_Profile_IM_Nick",
                    GENDER: "Tag_Profile_IM_Gender",
                    BIRTHDAY: "Tag_Profile_IM_BirthDay",
                    LOCATION: "Tag_Profile_IM_Location",
                    SELFSIGNATURE: "Tag_Profile_IM_SelfSignature",
                    ALLOWTYPE: "Tag_Profile_IM_AllowType",
                    LANGUAGE: "Tag_Profile_IM_Language",
                    AVATAR: "Tag_Profile_IM_Image",
                    MESSAGESETTINGS: "Tag_Profile_IM_MsgSettings",
                    ADMINFORBIDTYPE: "Tag_Profile_IM_AdminForbidType",
                    LEVEL: "Tag_Profile_IM_Level",
                    ROLE: "Tag_Profile_IM_Role"
                },
                M = {
                    MSG_TEXT: "TIMTextElem",
                    MSG_IMAGE: "TIMImageElem",
                    MSG_SOUND: "TIMSoundElem",
                    MSG_FILE: "TIMFileElem",
                    MSG_FACE: "TIMFaceElem",
                    MSG_VIDEO: "TIMVideoElem",
                    MSG_GEO: "TIMLocationElem",
                    MSG_GRP_TIP: "TIMGroupTipElem",
                    MSG_GRP_SYS_NOTICE: "TIMGroupSystemNoticeElem",
                    MSG_CUSTOM: "TIMCustomElem",
                    CONV_C2C: "C2C",
                    CONV_GROUP: "GROUP",
                    CONV_SYSTEM: "@TIM#SYSTEM",
                    GRP_PRIVATE: "Private",
                    GRP_PUBLIC: "Public",
                    GRP_CHATROOM: "ChatRoom",
                    GRP_AVCHATROOM: "AVChatRoom",
                    GRP_MBR_ROLE_OWNER: "Owner",
                    GRP_MBR_ROLE_ADMIN: "Admin",
                    GRP_MBR_ROLE_MEMBER: "Member",
                    GRP_TIP_MBR_JOIN: 1,
                    GRP_TIP_MBR_QUIT: 2,
                    GRP_TIP_MBR_KICKED_OUT: 3,
                    GRP_TIP_MBR_SET_ADMIN: 4,
                    GRP_TIP_MBR_CANCELED_ADMIN: 5,
                    GRP_TIP_GRP_PROFILE_UPDATED: 6,
                    GRP_TIP_MBR_PROFILE_UPDATED: 7,
                    MSG_REMIND_ACPT_AND_NOTE: "AcceptAndNotify",
                    MSG_REMIND_ACPT_NOT_NOTE: "AcceptNotNotify",
                    MSG_REMIND_DISCARD: "Discard",
                    GENDER_UNKNOWN: "Gender_Type_Unknown",
                    GENDER_FEMALE: "Gender_Type_Female",
                    GENDER_MALE: "Gender_Type_Male",
                    KICKED_OUT_MULT_ACCOUNT: "mutipleAccount",
                    KICKED_OUT_MULT_DEVICE: "mutipleDevice",
                    ALLOW_TYPE_ALLOW_ANY: "AllowType_Type_AllowAny",
                    ALLOW_TYPE_NEED_CONFIRM: "AllowType_Type_NeedConfirm",
                    ALLOW_TYPE_DENY_ANY: "AllowType_Type_DenyAny",
                    FORBID_TYPE_NONE: "AdminForbid_Type_None",
                    FORBID_TYPE_SEND_OUT: "AdminForbid_Type_SendOut",
                    JOIN_OPTIONS_FREE_ACCESS: "FreeAccess",
                    JOIN_OPTIONS_NEED_PERMISSION: "NeedPermission",
                    JOIN_OPTIONS_DISABLE_APPLY: "DisableApply",
                    JOIN_STATUS_SUCCESS: "JoinedSuccess",
                    JOIN_STATUS_WAIT_APPROVAL: "WaitAdminApproval"
                };

            function D(e) {
                return (D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                } : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function A(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function N(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || 0, r.configurable = 1, "value" in r && (r.writable = 1), Object.defineProperty(e, r.key, r)
                }
            }

            function O(e, t, n) {
                return t && N(e.prototype, t), n && N(e, n), e
            }

            function L(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: 1,
                    configurable: 1,
                    writable: 1
                }) : e[t] = n, e
            }

            function R(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {},
                        r = Object.keys(n);
                    "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
                        return Object.getOwnPropertyDescriptor(n, e).enumerable
                    }))), r.forEach(function (t) {
                        L(e, t, n[t])
                    })
                }
                return e
            }

            function P(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: 1,
                        configurable: 1
                    }
                }), t && k(e, t)
            }

            function G(e) {
                return (G = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
            }

            function k(e, t) {
                return (k = Object.setPrototypeOf || function (e, t) {
                    return e.__proto__ = t, e
                })(e, t)
            }

            function w(e, t, n) {
                return (w = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return 0;
                    if (Reflect.construct.sham) return 0;
                    if ("function" == typeof Proxy) return 1;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), 1
                    } catch (e) {
                        return 0
                    }
                }() ? Reflect.construct : function (e, t, n) {
                    var r = [null];
                    r.push.apply(r, t);
                    var o = new(Function.bind.apply(e, r));
                    return n && k(o, n.prototype), o
                }).apply(null, arguments)
            }

            function b(e) {
                var t = "function" == typeof Map ? new Map : void 0;
                return (b = function (e) {
                    if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
                    var n;
                    if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== t) {
                        if (t.has(e)) return t.get(e);
                        t.set(e, r)
                    }

                    function r() {
                        return w(e, arguments, G(this).constructor)
                    }
                    return r.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: r,
                            enumerable: 0,
                            writable: 1,
                            configurable: 1
                        }
                    }), k(r, e)
                })(e)
            }

            function U(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }

            function F(e, t) {
                return !t || "object" != typeof t && "function" != typeof t ? U(e) : t
            }

            function q(e, t) {
                return function (e) {
                    if (Array.isArray(e)) return e
                }(e) || function (e, t) {
                    var n = [],
                        r = 1,
                        o = 0,
                        i = void 0;
                    try {
                        for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); r = 1);
                    } catch (u) {
                        o = 1, i = u
                    } finally {
                        try {
                            r || null == a.return || a.return()
                        } finally {
                            if (o) throw i
                        }
                    }
                    return n
                }(e, t) || function () {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }()
            }

            function x(e) {
                return function (e) {
                    if (Array.isArray(e)) {
                        for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                        return n
                    }
                }(e) || function (e) {
                    if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
                }(e) || function () {
                    throw new TypeError("Invalid attempt to spread non-iterable instance")
                }()
            }
            var H = function () {
                    function e() {
                        A(this, e), this.cache = [], this.options = null
                    }
                    return O(e, [{
                        key: "use",
                        value: function (e) {
                            if ("function" != typeof e) throw "middleware must be a function";
                            return this.cache.push(e), this
                        }
                    }, {
                        key: "next",
                        value: function (e) {
                            if (this.middlewares && this.middlewares.length > 0) return this.middlewares.shift().call(this, this.options, this.next.bind(this))
                        }
                    }, {
                        key: "run",
                        value: function (e) {
                            return this.middlewares = this.cache.map(function (e) {
                                return e
                            }), this.options = e, this.next()
                        }
                    }]), e
                }(),
                K = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

            function Y(e, t) {
                return e(t = {
                    exports: {}
                }, t.exports), t.exports
            }
            var B = Y(function (e, t) {
                    var n, r, o, i, s, a, u, c, l, p, h, f, g, d, _, m, E, y, v, I;
                    e.exports = (n = "function" == typeof Promise, r = "object" == typeof self ? self : K, o = "undefined" != typeof Symbol, i = "undefined" != typeof Map, s = "undefined" != typeof Set, a = "undefined" != typeof WeakMap, u = "undefined" != typeof WeakSet, c = "undefined" != typeof DataView, l = o && void 0 !== Symbol.iterator, p = o && void 0 !== Symbol.toStringTag, h = s && "function" == typeof Set.prototype.entries, f = i && "function" == typeof Map.prototype.entries, g = h && Object.getPrototypeOf((new Set).entries()), d = f && Object.getPrototypeOf((new Map).entries()), _ = l && "function" == typeof Array.prototype[Symbol.iterator], m = _ && Object.getPrototypeOf([][Symbol.iterator]()), E = l && "function" == typeof String.prototype[Symbol.iterator], y = E && Object.getPrototypeOf("" [Symbol.iterator]()), v = 8, I = -1, function (e) {
                        var t = typeof e;
                        if ("object" !== t) return t;
                        if (null === e) return "null";
                        if (e === r) return "global";
                        if (Array.isArray(e) && (0 == p || !(Symbol.toStringTag in e))) return "Array";
                        if ("object" == typeof window && null !== window) {
                            if ("object" == typeof window.location && e === window.location) return "Location";
                            if ("object" == typeof window.document && e === window.document) return "Document";
                            if ("object" == typeof window.navigator) {
                                if ("object" == typeof window.navigator.mimeTypes && e === window.navigator.mimeTypes) return "MimeTypeArray";
                                if ("object" == typeof window.navigator.plugins && e === window.navigator.plugins) return "PluginArray"
                            }
                            if (("function" == typeof window.HTMLElement || "object" == typeof window.HTMLElement) && e instanceof window.HTMLElement) {
                                if ("BLOCKQUOTE" === e.tagName) return "HTMLQuoteElement";
                                if ("TD" === e.tagName) return "HTMLTableDataCellElement";
                                if ("TH" === e.tagName) return "HTMLTableHeaderCellElement"
                            }
                        }
                        var o = p && e[Symbol.toStringTag];
                        if ("string" == typeof o) return o;
                        var l = Object.getPrototypeOf(e);
                        return l === RegExp.prototype ? "RegExp" : l === Date.prototype ? "Date" : n && l === Promise.prototype ? "Promise" : s && l === Set.prototype ? "Set" : i && l === Map.prototype ? "Map" : u && l === WeakSet.prototype ? "WeakSet" : a && l === WeakMap.prototype ? "WeakMap" : c && l === DataView.prototype ? "DataView" : i && l === d ? "Map Iterator" : s && l === g ? "Set Iterator" : _ && l === m ? "Array Iterator" : E && l === y ? "String Iterator" : null === l ? "Object" : Object.prototype.toString.call(e).slice(v, I)
                    })
                }),
                V = Object.prototype.hasOwnProperty,
                j = Object.prototype.toString;

            function W(e) {
                if (null == e) return 1;
                if ("boolean" == typeof e) return 0;
                if ("number" == typeof e) return 0 === e;
                if ("string" == typeof e) return 0 === e.length;
                if ("function" == typeof e) return 0 === e.length;
                if (Array.isArray(e)) return 0 === e.length;
                if (e instanceof Error) return "" === e.message;
                if (e.toString == j) switch (e.toString()) {
                    case "[object File]":
                    case "[object Map]":
                    case "[object Set]":
                        return 0 === e.size;
                    case "[object Object]":
                        for (var t in e)
                            if (V.call(e, t)) return 0;
                        return 1
                }
                return 0
            }
            var z, X, J = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
            z = "undefined" != typeof console ? console : void 0 !== J && J.console ? J.console : "undefined" != typeof window && window.console ? window.console : {};
            for (var Q = function () {}, Z = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], $ = Z.length; $--;) X = Z[$], console[X] || (z[X] = Q);
            z.methods = Z;
            var ee = z;

            function te(e, t, n) {
                if (void 0 === t) return 1;
                var r = 1;
                if ("object" === B(t).toLowerCase()) Object.keys(t).forEach(function (o) {
                    var i = 1 == e.length ? e[0][o] : void 0;
                    r = ne(i, t[o], n, o) ? r : 0
                });
                else if ("array" === B(t).toLowerCase())
                    for (var o = 0; o < t.length; o++) r = ne(e[o], t[o], n, t[o].name) ? r : 0;
                if (r) return r;
                throw new Error("Params validate failed.")
            }

            function ne(e, t, n, r) {
                if (void 0 === t) return 1;
                var o = 1;
                return t.required && W(e) && (ee.error("TIM [".concat(n, '] Missing required params: "').concat(r, '".')), o = 0), W(e) || B(e).toLowerCase() === t.type.toLowerCase() || (ee.error("TIM [".concat(n, '] Invalid params: type check failed for "').concat(r, '".Expected ').concat(t.type, ".")), o = 0), t.validator && !t.validator(e) && (ee.error("TIM [".concat(n, "] Invalid params: custom validator check failed for params.")), o = 0), o
            }
            var re = {
                    login: {
                        userID: {
                            type: "String",
                            required: 1
                        },
                        userSig: {
                            type: "String",
                            required: 1
                        }
                    },
                    addToBlacklist: {
                        userIDList: {
                            type: "Array",
                            required: 1
                        }
                    },
                    mutilParam: [{
                        name: "paramName",
                        type: "Number",
                        required: 1
                    }, {
                        name: "paramName",
                        type: "String",
                        required: 1
                    }],
                    on: [{
                        name: "eventName",
                        type: "String",
                        required: 1
                    }, {
                        name: "listener",
                        type: "Function",
                        required: 0
                    }],
                    sendMessage: [{
                        name: "message",
                        type: "Object",
                        required: 1
                    }],
                    getConversationProfile: [{
                        name: "conversationID",
                        type: "String",
                        required: 1
                    }],
                    deleteConversation: [{
                        name: "conversationID",
                        type: "String",
                        required: 1
                    }],
                    getGroupProfile: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        groupCustomFieldFilter: {
                            type: "Array"
                        },
                        memberCustomFieldFilter: {
                            type: "Array"
                        }
                    },
                    getGroupProfileAdvance: {
                        groupIDList: {
                            type: "Array",
                            required: 1
                        }
                    },
                    createGroup: {
                        name: {
                            type: "String",
                            required: 1
                        }
                    },
                    joinGroup: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        type: {
                            type: "String"
                        },
                        applyMessage: {
                            type: "String"
                        }
                    },
                    quitGroup: [{
                        name: "groupID",
                        type: "String",
                        required: 1
                    }],
                    handleApplication: {
                        message: {
                            type: "Object",
                            required: 1
                        },
                        handleAction: {
                            type: "String",
                            required: 1
                        },
                        handleMessage: {
                            type: "String"
                        }
                    },
                    changeGroupOwner: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        newOwnerID: {
                            type: "String",
                            required: 1
                        }
                    },
                    updateGroupProfile: {
                        groupID: {
                            type: "String",
                            required: 1
                        }
                    },
                    dismissGroup: [{
                        name: "groupID",
                        type: "String",
                        required: 1
                    }],
                    searchGroupByID: [{
                        name: "groupID",
                        type: "String",
                        required: 1
                    }],
                    getGroupMemberList: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        offset: {
                            type: "Number"
                        },
                        count: {
                            type: "Number"
                        }
                    },
                    addGroupMemeber: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        userIDList: {
                            type: "Array",
                            required: 1
                        }
                    },
                    setGroupMemberRole: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        userID: {
                            type: "String",
                            required: 1
                        },
                        role: {
                            type: "String",
                            required: 1
                        }
                    },
                    setGroupMemberMuteTime: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        userID: {
                            type: "String"
                        },
                        muteTime: {
                            type: "Number",
                            validator: function (e) {
                                return e >= 0
                            }
                        }
                    },
                    setGroupMemberNameCard: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        userID: {
                            type: "String"
                        },
                        nameCard: {
                            type: "String",
                            required: 1,
                            validator: function (e) {
                                return 1 == /^\s+$/.test(e) ? 0 : 1
                            }
                        }
                    },
                    setMessageRemindType: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        messageRemindType: {
                            type: "String",
                            required: 1
                        }
                    },
                    setGroupMemberCustomField: {
                        groupID: {
                            type: "String",
                            required: 1
                        },
                        userID: {
                            type: "String"
                        },
                        memberCustomField: {
                            type: "Array",
                            required: 1
                        }
                    },
                    deleteGroupMember: {
                        groupID: {
                            type: "String",
                            required: 1
                        }
                    },
                    createTextMessage: {
                        to: {
                            type: "String",
                            required: 1
                        },
                        conversationType: {
                            type: "String",
                            required: 1
                        },
                        payload: {
                            type: "Object",
                            required: 1
                        }
                    },
                    createCustomMessage: {
                        to: {
                            type: "String",
                            required: 1
                        },
                        conversationType: {
                            type: "String",
                            required: 1
                        },
                        payload: {
                            type: "Object",
                            required: 1
                        }
                    },
                    createImageMessage: {
                        to: {
                            type: "String",
                            required: 1
                        },
                        conversationType: {
                            type: "String",
                            required: 1
                        },
                        payload: {
                            type: "Object",
                            required: 1
                        }
                    },
                    createFileMessage: {
                        to: {
                            type: "String",
                            required: 1
                        },
                        conversationType: {
                            type: "String",
                            required: 1
                        },
                        payload: {
                            type: "Object",
                            required: 1
                        }
                    }
                },
                oe = {
                    login: "login",
                    logout: "logout",
                    on: "on",
                    once: "once",
                    off: "off",
                    setLogLevel: "setLogLevel",
                    downloadLog: "downloadLog",
                    registerPlugin: "registerPlugin",
                    ready: "ready",
                    destroy: "destroy",
                    createTextMessage: "createTextMessage",
                    createFileMessage: "createFileMessage",
                    createImageMessage: "createImageMessage",
                    createCustomMessage: "createCustomMessage",
                    sendMessage: "sendMessage",
                    sendTextMessage: "sendTextMessage",
                    sendImageMessage: "sendImageMessage",
                    sendCustomMessage: "sendCustomMessage",
                    sendFileMessage: "sendFileMessage",
                    resendMessage: "resendMessage",
                    getMessageList: "getMessageList",
                    setMessageRead: "setMessageRead",
                    getConversationList: "getConversationList",
                    getConversationProfile: "getConversationProfile",
                    deleteConversation: "deleteConversation",
                    getGroupList: "getGroupList",
                    getGroupProfile: "getGroupProfile",
                    getGroupProfileAdvance: "getGroupProfileAdvance",
                    createGroup: "createGroup",
                    joinGroup: "joinGroup",
                    updateGroupProfile: "updateGroupProfile",
                    quitGroup: "quitGroup",
                    dismissGroup: "dismissGroup",
                    changeGroupOwner: "changeGroupOwner",
                    searchGroupByID: "searchGroupByID",
                    setMessageRemindType: "setMessageRemindType",
                    handleGroupApplication: "handleGroupApplication",
                    getGroupMemberList: "getGroupMemberList",
                    addGroupMember: "addGroupMember",
                    deleteGroupMember: "deleteGroupMember",
                    setGroupMemberNameCard: "setGroupMemberNameCard",
                    setGroupMemberMuteTime: "setGroupMemberMuteTime",
                    setGroupMemberRole: "setGroupMemberRole",
                    setGroupMemberCustomField: "setGroupMemberCustomField",
                    getMyProfile: "getMyProfile",
                    getUserProfile: "getUserProfile",
                    updateMyProfile: "updateMyProfile",
                    addToBlacklist: "addToBlacklist",
                    applyAddFriend: "applyAddFriend",
                    removeFromBlacklist: "removeFromBlacklist",
                    deleteFriend: "deleteFriend",
                    deletePendency: "deletePendency",
                    getBlacklist: "getBlacklist",
                    getFriendList: "getFriendList",
                    getPendency: "getPendency",
                    getPendencyReport: "getPendencyReport",
                    replyPendency: "replyPendency"
                },
                ie = {
                    NO_SDKAPPID: 2e3,
                    NO_ACCOUNT_TYPE: 2001,
                    NO_IDENTIFIER: 2002,
                    NO_USERSIG: 2003,
                    NO_SDK_INSTANCE: 2004,
                    REQ_GET_ACCESS_LAYER_FAILED: 2020,
                    REQ_LOGIN_FAILED: 2021,
                    NO_TINYID: 2022,
                    NO_A2KEY: 2023,
                    MESSAGE_SEND_FAIL: 2100,
                    MESSAGE_UNKNOW_ROMA_LIST_END_FLAG_FIELD: 2101,
                    MESSAGE_ELEMENT_METHOD_UNDEFINED: 2102,
                    MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS: 2103,
                    MESSAGE_PARAMETER_MISSING_TO_ACCOUNT: 2104,
                    MESSAGE_SEND_NEED_MESSAGE_INSTANCE: 2105,
                    MESSAGE_SEND_INVALID_CONVERSATION_TYPE: 2106,
                    MESSAGE_RESEND_FILE_UNSUPPORTED: 2107,
                    MESSAGE_IMAGE_UPLOAD_FAIL: 2250,
                    MESSAGE_IMAGE_SELECT_FILE_FIRST: 2251,
                    MESSAGE_IMAGE_TYPES_LIMIT: 2252,
                    MESSAGE_IMAGE_SIZE_LIMIT: 2253,
                    MESSAGE_FILE_SELECT_FILE_FIRST: 2401,
                    MESSAGE_FILE_SIZE_LIMIT: 2402,
                    MESSAGE_FILE_URL_IS_EMPTY: 2403,
                    MESSAGE_FILE_WECHAT_MINIAPP_NOT_SUPPORT: 2404,
                    CONVERSATION_NOT_FOUND: 2500,
                    USER_OR_GROUP_NOT_FOUND: 2501,
                    CONVERSATION_UN_RECORDED_TYPE: 2502,
                    ILLEGAL_GROUP_TYPE: 2600,
                    CANNOT_JOIN_PRIVATE: 2601,
                    CANNOT_CHANGE_OWNER_IN_AVCHATROOM: 2620,
                    CANNOT_CHANGE_OWNER_TO_SELF: 2621,
                    CANNOT_DISMISS_PRIVATE: 2622,
                    JOIN_GROUP_FAIL: 2660,
                    CANNOT_ADD_MEMBER_IN_AVCHATROOM: 2661,
                    CANNOT_KICK_MEMBER_IN_AVCHATROOM: 2680,
                    NOT_OWNER: 2681,
                    CANNOT_SET_MEMBER_ROLE_IN_PRIVATE_AND_AVCHATROOM: 2682,
                    INVALID_MEMBER_ROLE: 2683,
                    CANNOT_SET_SELF_MEMBER_ROLE: 2684,
                    DEL_FRIEND_INVALID_PARAM: 2700,
                    GET_PROFILE_INVALID_PARAM: 2720,
                    UPDATE_PROFILE_INVALID_PARAM: 2721,
                    ADD_BLACKLIST_INVALID_PARAM: 2740,
                    DEL_BLACKLIST_INVALID_PARAM: 2741,
                    CANNOT_ADD_SELF_TO_BLACKLIST: 2742,
                    NETWORK_ERROR: 2800,
                    NETWORK_TIMEOUT: 2801,
                    NETWORK_BASE_OPTIONS_NO_URL: 2802,
                    NETWORK_UNDEFINED_SERVER_NAME: 2803,
                    NETWORK_PACKAGE_UNDEFINED: 2804,
                    SOCKET_NOT_SUPPORTED: 2850,
                    CONVERTOR_IRREGULAR_PARAMS: 2900,
                    NOTICE_RUNLOOP_UNEXPECTED_CONDITION: 2901,
                    NOTICE_RUNLOOP_OFFSET_LOST: 2902,
                    UNCAUGHT_ERROR: 2903,
                    SDK_IS_NOT_READY: 2999,
                    LONG_POLL_KICK_OUT: 91101
                },
                se = {
                    NO_SDKAPPID: "无 SDKAppID",
                    NO_ACCOUNT_TYPE: "无 accountType",
                    NO_IDENTIFIER: "无 userID",
                    NO_USERSIG: "无 usersig",
                    NO_SDK_INSTANCE: "无 SDK 实例",
                    REQ_GET_ACCESS_LAYER_FAILED: "获取沙箱请求失败",
                    REQ_LOGIN_FAILED: "登录请求失败",
                    NO_TINYID: "无tinyid",
                    NO_A2KEY: "无a2key",
                    MESSAGE_SEND_FAIL: "消息发送失败",
                    MESSAGE_UNKNOW_ROMA_LIST_END_FLAG_FIELD: "未知的漫游消息结束字段",
                    MESSAGE_ELEMENT_METHOD_UNDEFINED: "消息元素未创建，因为方法未定义",
                    MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS: "MessageController.constructor() 需要参数 options",
                    MESSAGE_PARAMETER_MISSING_TO_ACCOUNT: "需要 toAccount 参数",
                    MESSAGE_SEND_NEED_MESSAGE_INSTANCE: "需要 Message 的实例",
                    MESSAGE_SEND_INVALID_CONVERSATION_TYPE: 'Message.conversationType 只能为 "C2C"或"GROUP" ',
                    MESSAGE_RESEND_FILE_UNSUPPORTED: "文件类消息不能使用 SDK.resendMessage() 函数重发",
                    MESSAGE_IMAGE_UPLOAD_FAIL: "图片上传失败",
                    MESSAGE_IMAGE_SELECT_FILE_FIRST: "请先选择一个图片",
                    MESSAGE_IMAGE_TYPES_LIMIT: "图片类型受限",
                    MESSAGE_IMAGE_SIZE_LIMIT: "图片大小受限",
                    MESSAGE_FILE_SELECT_FILE_FIRST: "请先选择一个文件",
                    MESSAGE_FILE_SIZE_LIMIT: "文件大小受限 ",
                    MESSAGE_FILE_URL_IS_EMPTY: "缺少必要的参数文件 URL",
                    MESSAGE_FILE_WECHAT_MINIAPP_NOT_SUPPORT: "微信小程序暂时不支持文件选择功能",
                    CONVERSATION_NOT_FOUND: "没有找到相应的会话，请检查传入参数",
                    USER_OR_GROUP_NOT_FOUND: "没有找到相应的用户或群主，请检查传入参数",
                    CONVERSATION_UN_RECORDED_TYPE: "未记录的会话类型",
                    ILLEGAL_GROUP_TYPE: "非法的群类型，请检查传入参数",
                    CANNOT_JOIN_PRIVATE: "不能加入 Private 类型的群组",
                    CANNOT_CHANGE_OWNER_IN_AVCHATROOM: "AVChatRoom 类型的群组不能转让群主",
                    CANNOT_CHANGE_OWNER_TO_SELF: "不能把群主转让给自己",
                    CANNOT_DISMISS_PRIVATE: "不能解散 Private 类型的群组",
                    JOIN_GROUP_FAIL: "加群失败，请检查传入参数或重试",
                    CANNOT_ADD_MEMBER_IN_AVCHATROOM: "AVChatRoom 类型的群不支持邀请群成员",
                    CANNOT_KICK_MEMBER_IN_AVCHATROOM: "不能在 AVChatRoom 类型的群组踢人",
                    NOT_OWNER: "你不是群主，只有群主才有权限操作",
                    CANNOT_SET_MEMBER_ROLE_IN_PRIVATE_AND_AVCHATROOM: "不能在 Private / AVChatRoom 类型的群中设置群成员身份",
                    INVALID_MEMBER_ROLE: "不合法的群成员身份，请检查传入参数",
                    CANNOT_SET_SELF_MEMBER_ROLE: "不能设置自己的群成员身份，请检查传入参数",
                    DEL_FRIEND_INVALID_PARAM: "传入 deleteFriend 接口的参数无效",
                    GET_PROFILE_INVALID_PARAM: "传入 getUserProfile 接口的参数无效",
                    UPDATE_PROFILE_INVALID_PARAM: "传入 updateMyProfile 接口的参数无效",
                    ADD_BLACKLIST_INVALID_PARAM: "传入 addToBlacklist 接口的参数无效",
                    DEL_BLACKLIST_INVALID_PARAM: "传入 removeFromBlacklist 接口的参数无效",
                    CANNOT_ADD_SELF_TO_BLACKLIST: "不能拉黑自己",
                    NETWORK_ERROR: "网络错误",
                    NETWORK_TIMEOUT: "请求超时",
                    NETWORK_BASE_OPTIONS_NO_URL: "网络层初始化错误，缺少 URL 参数",
                    NETWORK_UNDEFINED_SERVER_NAME: "打包错误，未定义的 serverName",
                    NETWORK_PACKAGE_UNDEFINED: "未定义的 packageConfig",
                    SOCKET_NOT_SUPPORTED: "当前浏览器不支持 WebSocket",
                    CONVERTOR_IRREGULAR_PARAMS: "不规范的参数名称",
                    NOTICE_RUNLOOP_UNEXPECTED_CONDITION: "意料外的通知条件",
                    NOTICE_RUNLOOP_OFFSET_LOST: "_syncOffset 丢失",
                    UNCAUGHT_ERROR: "未经明确定义的错误",
                    SDK_IS_NOT_READY: "接口调用时机不合理，等待 SDK 处于 ready 状态后再调用（监听 TIM.EVENT.SDK_READY 事件）"
                },
                ae = function (e) {
                    function t(e) {
                        var n;
                        return A(this, t), (n = F(this, G(t).call(this))).code = e.code, n.message = e.message, n.data = e.data || {}, n
                    }
                    return P(t, b(Error)), t
                }(),
                ue = "1.7.3",
                ce = "537048168",
                le = "10",
                pe = "protobuf",
                he = "json",
                fe = {
                    HOST: {
                        TYPE: 3,
                        ACCESS_LAYER_TYPES: {
                            SANDBOX: 1,
                            TEST: 2,
                            PRODUCTION: 3
                        },
                        CURRENT: {
                            COMMON: "https://webim.tim.qq.com",
                            PIC: "https://pic.tim.qq.com",
                            COS: "https://yun.tim.qq.com"
                        },
                        PRODUCTION: {
                            COMMON: "https://webim.tim.qq.com",
                            PIC: "https://pic.tim.qq.com",
                            COS: "https://yun.tim.qq.com"
                        },
                        SANDBOX: {
                            COMMON: "https://events.tim.qq.com",
                            PIC: "https://pic.tim.qq.com",
                            COS: "https://yun.tim.qq.com"
                        },
                        TEST: {
                            COMMON: "https://test.tim.qq.com",
                            PIC: "https://pic.tim.qq.com",
                            COS: "https://yun.tim.qq.com"
                        },
                        setCurrent: function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3;
                            switch (e) {
                                case this.ACCESS_LAYER_TYPES.SANDBOX:
                                    this.CURRENT = this.SANDBOX, this.TYPE = this.ACCESS_LAYER_TYPES.SANDBOX;
                                    break;
                                case this.ACCESS_LAYER_TYPES.TEST:
                                    this.CURRENT = this.TEST, this.TYPE = this.ACCESS_LAYER_TYPES.TEST;
                                    break;
                                default:
                                    this.CURRENT = this.PRODUCTION, this.TYPE = this.ACCESS_LAYER_TYPES.PRODUCTION
                            }
                        }
                    },
                    NAME: {
                        OPEN_IM: "openim",
                        GROUP: "group_open_http_svc",
                        FRIEND: "sns",
                        PROFILE: "profile",
                        RECENT_CONTACT: "recentcontact",
                        PIC: "openpic",
                        BIG_GROUP_NO_AUTH: "group_open_http_noauth_svc",
                        BIG_GROUP_LONG_POLLING_NO_AUTH: "group_open_long_polling_http_noauth_svc",
                        IM_OPEN_STAT: "imopenstat",
                        WEB_IM: "webim",
                        IM_COS_SIGN: "im_cos_sign_svr"
                    },
                    CMD: {
                        ACCESS_LAYER: "accesslayer",
                        LOGIN: "login",
                        LOGOUT_LONG_POLL: "longpollinglogout",
                        LOGOUT_ALL: "logout",
                        PORTRAIT_GET: "portrait_get",
                        PORTRAIT_SET: "portrait_set",
                        GET_LONG_POLL_ID: "getlongpollingid",
                        LONG_POLL: "longpolling",
                        AVCHATROOM_LONG_POLL: "get_msg",
                        FRIEND_ADD: "friend_add",
                        FRIEND_GET_ALL: "friend_get_all",
                        FRIEND_DELETE: "friend_delete",
                        RESPONSE_PENDENCY: "friend_response",
                        GET_PENDENCY: "pendency_get",
                        DELETE_PENDENCY: "pendency_delete",
                        GET_BLACKLIST: "black_list_get",
                        ADD_BLACKLIST: "black_list_add",
                        DELETE_BLACKLIST: "black_list_delete",
                        CREATE_GROUP: "create_group",
                        GET_JOINED_GROUPS: "get_joined_group_list",
                        SEND_MESSAGE: "sendmsg",
                        SEND_GROUP_MESSAGE: "send_group_msg",
                        GET_GROUP_INFO: "get_group_info",
                        GET_GROUP_MEMBER_INFO: "get_group_member_info",
                        QUIT_GROUP: "quit_group",
                        CHANGE_GROUP_OWNER: "change_group_owner",
                        DESTROY_GROUP: "destroy_group",
                        ADD_GROUP_MEMBER: "add_group_member",
                        DELETE_GROUP_MEMBER: "delete_group_member",
                        SEARCH_GROUP_BY_ID: "get_group_public_info",
                        APPLY_JOIN_GROUP: "apply_join_group",
                        HANDLE_APPLY_JOIN_GROUP: "handle_apply_join_group",
                        MODIFY_GROUP_INFO: "modify_group_base_info",
                        MODIFY_GROUP_MEMBER_INFO: "modify_group_member_info",
                        DELETE_GROUP_SYSTEM_MESSAGE: "deletemsg",
                        GET_CONVERSATION_LIST: "get",
                        DELETE_CONVERSATION: "delete",
                        GET_MESSAGES: "getmsg",
                        GET_C2C_ROAM_MESSAGES: "getroammsg",
                        GET_GROUP_ROAM_MESSAGES: "group_msg_get",
                        SET_C2C_MESSAGE_READ: "msgreaded",
                        SET_GROUP_MESSAGE_READ: "msg_read_report",
                        FILE_READ_AND_WRITE_AUTHKEY: "authkey",
                        FILE_UPLOAD: "pic_up",
                        COS_SIGN: "cos"
                    },
                    CHANNEL: {
                        SOCKET: 1,
                        XHR: 2,
                        AUTO: 0
                    },
                    NAME_VERSION: {
                        openim: "v4",
                        group_open_http_svc: "v4",
                        sns: "v4",
                        profile: "v4",
                        recentcontact: "v4",
                        openpic: "v4",
                        group_open_http_noauth_svc: "v1",
                        group_open_long_polling_http_noauth_svc: "v1",
                        imopenstat: "v4",
                        im_cos_sign_svr: "v4",
                        webim: "v3"
                    }
                };
            fe.HOST.setCurrent(fe.HOST.ACCESS_LAYER_TYPES.PRODUCTION);
            var ge, de = {
                    request: {
                        toAccount: "To_Account",
                        fromAccount: "From_Account",
                        to: "To_Account",
                        from: "From_Account",
                        groupID: "GroupId",
                        avatar: "FaceUrl"
                    },
                    response: {
                        GroupId: "groupID",
                        Member_Account: "userID",
                        MsgList: "messageList",
                        SyncFlag: "syncFlag",
                        To_Account: "to",
                        From_Account: "from",
                        MsgSeq: "sequence",
                        MsgRandom: "random",
                        MsgTimeStamp: "time",
                        MsgContent: "content",
                        MsgBody: "elements",
                        MsgType: "type",
                        MsgShow: "messageShow",
                        NextMsgSeq: "nextMessageSeq",
                        FaceUrl: "avatar",
                        ProfileDataMod: "profileModify",
                        Profile_Account: "userID",
                        ValueBytes: "value",
                        ValueNum: "value",
                        NoticeSeq: "noticeSequence",
                        NotifySeq: "notifySequence",
                        Operator_Account: "operatorID",
                        OpType: "operationType",
                        ReportType: "operationType",
                        UserId: "userID",
                        User_Account: "userID",
                        List_Account: "userIDList",
                        MsgOperatorMemberExtraInfo: "operatorInfo",
                        MsgMemberExtraInfo: "memberInfoList",
                        ImageUrl: "avatar",
                        NickName: "nick",
                        MsgGroupNewInfo: "newGroupProfile",
                        Owner_Account: "ownerID",
                        GroupName: "name",
                        GroupFaceUrl: "avatar",
                        GroupIntroduction: "introduction",
                        GroupNotification: "notification",
                        GroupApplyJoinOption: "joinOption",
                        MsgKey: "messageKey",
                        GroupInfo: "groupProfile",
                        Desc: "description",
                        Ext: "extension"
                    },
                    ignoreKeyWord: ["C2C", "ID", "USP"]
                },
                _e = {
                    CONTEXT_UPDATED: "_contextWasUpdated",
                    CONTEXT_RESET: "_contextWasReset",
                    CONTEXT_A2KEY_AND_TINYID_UPDATED: "_a2KeyAndTinyIDUpdated",
                    RUNNING_STATE_CHANGE: "_runningStateChange",
                    SYNC_MESSAGE_C2C_START: "_noticeSynchronizationStart",
                    SYNC_MESSAGE_C2C_PROCESSING: "_noticeIsSynchronizing",
                    SYNC_MESSAGE_C2C_FINISHED: "_noticeIsSynchronized",
                    SYNC_MESSAGE_GROUP_SYSTEM_NOTICE_FINISHED: "_groupSystemNoticeSyncFinished",
                    MESSAGE_SENDING: "_sendingMessage",
                    MESSAGE_C2C_SEND_SUCCESS: "_sendC2CMessageSuccess",
                    MESSAGE_C2C_SEND_FAIL: "_sendC2CMessageFail",
                    MESSAGE_C2C_INSTANT_RECEIVED: "_receiveInstantMessage",
                    MESSAGE_C2C_RECEIVE_ROAMING_SUCCESS: "_receiveC2CRoamingMessageSuccess",
                    MESSAGE_C2C_RECEIVE_ROAMING_FAIL: "_receiveC2CRoamingMessageFail",
                    MESSAGE_GROUP_SEND_SUCCESS: "_sendGroupMessageSuccess",
                    MESSAGE_GROUP_SEND_FAIL: "_sendGroupMessageFail",
                    MESSAGE_GROUP_RECEIVE_ROAMING_SUCCESS: "_receiveGroupRoamingMessageSuccess",
                    MESSAGE_GROUP_RECEIVE_ROAMING_FAIL: "_receiveGroupRoamingMessageFail",
                    MESSAGE_GROUP_INSTANT_RECEIVED: "_receiveGroupInstantMessage",
                    MESSAGE_GROUP_SYSTEM_NOTICE_RECEIVED: "_receveGroupSystemNotice",
                    NOTICE_LONGPOLL_GETID_SUCCESS: "_getLongPollIDSuccess",
                    NOTICE_LONGPOLL_GETID_FAIL: "_getLongPollIDFail",
                    NOTICE_LONGPOLL_START: "_longPollStart",
                    NOTICE_LONGPOLL_IN_POLLING: "_longPollInPolling",
                    NOTICE_LONGPOLL_REQUEST_ARRIVED: "_longPollInArrived",
                    NOTICE_LONGPOLL_REQUEST_NOT_ARRIVED: "_longPollInNotArrived",
                    NOTICE_LONGPOLL_JITTER: "_longPollJitter",
                    NOTICE_LONGPOLL_SOON_RECONNECT: "_longPollSoonReconnect",
                    NOTICE_LONGPOLL_LONG_RECONNECT: "_longPollLongReconnect",
                    NOTICE_LONGPOLL_DISCONNECT: "_longpollChannelDisconnect",
                    NOTICE_LONGPOLL_STOPPED: "_longPollStopped",
                    NOTICE_LONGPOLL_KICKED_OUT: "_longPollKickedOut",
                    NOTICE_LONGPOLL_MUTIPLE_DEVICE_KICKED_OUT: "_longPollMitipuleDeviceKickedOut",
                    NOTICE_LONGPOLL_NEW_C2C_NOTICE: "_longPollGetNewC2CNotice",
                    NOTICE_LONGPOLL_NEW_C2C_MESSAGES: "_longPollGetNewC2CMessages",
                    NOTICE_LONGPOLL_NEW_GROUP_MESSAGES: "_longPollGetNewGroupMessages",
                    NOTICE_LONGPOLL_NEW_GROUP_TIPS: "_longPollGetNewGroupTips",
                    NOTICE_LONGPOLL_NEW_GROUP_NOTICE: "_longPollGetNewGroupNotice",
                    NOTICE_LONGPOLL_NEW_FRIEND_MESSAGES: "_longPollGetNewFriendMessages",
                    NOTICE_LONGPOLL_SEQUENCE_UPDATE: "_longPollNoticeSequenceUpdate",
                    NOTICE_LONGPOLL_PROFILE_MODIFIED: "_longPollProfileModified",
                    APPLY_ADD_FRIEND_SUCCESS: "_addFriendApplySendSucess",
                    APPLY_ADD_FRIEND_FAIL: "_addFriendApplySendFail",
                    APPLY_GET_PENDENCY_SUCCESS: "_applyGetPendenciesSucess",
                    APPLY_GET_PENDENCY_FAIL: "_applyGetPendenciesFail",
                    APPLY_DELETE_SUCCESS: "_applyDeletedSucess",
                    APPLY_DELETE_FAIL: "_applyDeletedFail",
                    GROUP_CREATE_SUCCESS: "_createGroupSuccess",
                    GROUP_CREATE_FAIL: "_createGroupFail",
                    GROUP_LIST_UPDATED: "_onGroupListUpdated",
                    SIGN_LOGIN_CHANGE: "_loginStatusChange",
                    SIGN_LOGIN: "_login",
                    SIGN_LOGIN_SUCCESS: "_loginSuccess",
                    SIGN_LOGIN_FAIL: "_loginFail",
                    SIGN_LOGININFO_UPDATED: "_signLoginInfoUpdated",
                    SIGN_LOGOUT_EXECUTING: "_signLogoutExcuting",
                    SIGN_LOGOUT_SUCCESS: "_logoutSuccess",
                    SIGN_GET_ACCESS_LAYER_CHANGE: "_getAccessLayerStatusChange",
                    SIGN_GET_ACCESS_LAYER_SUCCESS: "_getAccessLayerSuccess",
                    SIGN_GET_ACCESS_LAYER_FAIL: "_getAccessLayerFail",
                    ERROR_DETECTED: "_errorHasBeenDetected",
                    CONVERSATION_LIST_UPDATED: "_onConversationListUpdated",
                    CONVERSATION_LIST_PROFILE_UPDATED: "_onConversationListProfileUpdated",
                    CONVERSATION_DELETED: "_conversationDeleted",
                    PROFILE_UPDATED: "onProfileUpdated",
                    FRIEND_GET_SUCCESS: "_getFriendsSuccess",
                    FRIEND_GET_FAIL: "_getFriendsFail",
                    FRIEND_DELETE_SUCCESS: "_deleteFriendSuccess",
                    FRIEND_DELETE_FAIL: "_deleteFriendFail",
                    BLACKLIST_ADD_SUCCESS: "_addBlacklistSuccess",
                    BLACKLIST_ADD_FAIL: "_addBlacklistFail",
                    BLACKLIST_GET_SUCCESS: "_getBlacklistSuccess",
                    BLACKLIST_GET_FAIL: "_getBlacklistFail",
                    AVCHATROOM_OPTIONS_UPDATED: "_AVChatRoomOptionsUpdated",
                    AVCHATROOM_JOIN_SUCCESS: "joinAVChatRoomSuccess",
                    SDK_MEMORY_STATUS_UPDATE: "_sdkMemoryStatusUpdate",
                    SDK_READY: "_sdkStateReady"
                },
                me = "undefined" != typeof window,
                Ee = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync && "function" == typeof wx.canIUse,
                ye = me && window.navigator && window.navigator.userAgent || "",
                ve = /AppleWebKit\/([\d.]+)/i.exec(ye),
                Ie = (ve && parseFloat(ve.pop()), /iPad/i.test(ye)),
                Se = (/iPhone/i.test(ye), /iPod/i.test(ye), (ge = ye.match(/OS (\d+)_/i)) && ge[1] && ge[1], /Android/i.test(ye)),
                Te = function () {
                    var e = ye.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
                    if (!e) return null;
                    var t = e[1] && parseFloat(e[1]),
                        n = e[2] && parseFloat(e[2]);
                    return t && n ? parseFloat(e[1] + "." + e[2]) : t || null
                }(),
                Ce = (Se && /webkit/i.test(ye), /Firefox/i.test(ye), /Edge/i.test(ye)),
                Me = !Ce && /Chrome/i.test(ye),
                De = (function () {
                    var e = ye.match(/Chrome\/(\d+)/);
                    e && e[1] && parseFloat(e[1])
                }(), /MSIE/.test(ye)),
                Ae = (/MSIE\s8\.0/.test(ye), function () {
                    var e = /MSIE\s(\d+)\.\d/.exec(ye),
                        t = e && parseFloat(e[1]);
                    return !t && /Trident\/7.0/i.test(ye) && /rv:11.0/.test(ye) && (t = 11), t
                }()),
                Ne = (/Safari/i.test(ye), /TBS\/\d+/i.test(ye)),
                Oe = (function () {
                    var e = ye.match(/TBS\/(\d+)/i);
                    if (e && e[1]) e[1]
                }(), !Ne && /MQQBrowser\/\d+/i.test(ye), !Ne && / QQBrowser\/\d+/i.test(ye), /(micromessenger|webbrowser)/i.test(ye), /Windows/i.test(ye), /MAC OS X/i.test(ye), /MicroMessenger/i.test(ye), -1),
                Le = function () {
                    if (Ee) {
                        var e = wx.getSystemInfoSync().SDKVersion;
                        if (void 0 === e || void 0 === wx.getLogManager) return 0;
                        if (function (e, t) {
                                e = e.split("."), t = t.split(".");
                                var n = Math.max(e.length, t.length);
                                for (; e.length < n;) e.push("0");
                                for (; t.length < n;) t.push("0");
                                for (var r = 0; r < n; r++) {
                                    var o = parseInt(e[r]),
                                        i = parseInt(t[r]);
                                    if (o > i) return 1;
                                    if (o < i) return -1
                                }
                                return 0
                            }(e, "2.1.0") >= 0) return wx.getLogManager().log("I can use wx log. SDKVersion=" + e), 1
                    }
                    return 0
                }(),
                Re = new Map;

            function Pe() {
                var e = new Date;
                return "TIM " + e.toLocaleTimeString("en-US", {
                    hour12: 0
                }) + "." + function (e) {
                    var t;
                    switch (e.toString().length) {
                        case 1:
                            t = "00" + e;
                            break;
                        case 2:
                            t = "0" + e;
                            break;
                        default:
                            t = e
                    }
                    return t
                }(e.getMilliseconds()) + ":"
            }
            var Ge = {
                    _data: [],
                    _length: 0,
                    _visible: 0,
                    arguments2String: function (e) {
                        var t;
                        if (1 === e.length) t = Pe() + e[0];
                        else {
                            t = Pe();
                            for (var n = 0, r = e.length; n < r; n++) qe(e[n]) ? t += JSON.stringify(e[n]) + " " : t += e[n] + " "
                        }
                        return t
                    },
                    debug: function () {
                        if (Oe <= -1) {
                            var e = this.arguments2String(arguments);
                            Ge.record(e, "debug"), ee.debug(e), Le && wx.getLogManager().debug(e)
                        }
                    },
                    log: function () {
                        if (Oe <= 0) {
                            var e = this.arguments2String(arguments);
                            Ge.record(e, "log"), ee.log(e), Le && wx.getLogManager().log(e)
                        }
                    },
                    info: function () {
                        if (Oe <= 1) {
                            var e = this.arguments2String(arguments);
                            Ge.record(e, "info"), ee.info(e), Le && wx.getLogManager().info(e)
                        }
                    },
                    warn: function () {
                        if (Oe <= 2) {
                            var e = this.arguments2String(arguments);
                            Ge.record(e, "warn"), ee.warn(e), Le && wx.getLogManager().warn(e)
                        }
                    },
                    error: function () {
                        if (Oe <= 3) {
                            var e = this.arguments2String(arguments);
                            Ge.record(e, "error"), ee.error(e), Le && wx.getLogManager().warn(e)
                        }
                    },
                    time: function (e) {
                        Re.set(e, He.now())
                    },
                    timeEnd: function (e) {
                        if (Re.has(e)) {
                            var t = He.now() - Re.get(e);
                            return Re.delete(e), t
                        }
                        return ee.warn("未找到对应label: ".concat(e, ", 请在调用 logger.timeEnd 前，调用 logger.time")), 0
                    },
                    setLevel: function (e) {
                        e < 4 && ee.log(Pe() + "set level from " + Oe + " to " + e), Oe = e
                    },
                    record: function (e, t) {
                        Le || (1100 === Ge._length && (Ge._data.splice(0, 100), Ge._length = 1e3), Ge._length++, Ge._data.push("".concat(e, " [").concat(t, "] \n")))
                    },
                    getLog: function () {
                        return Ge._data
                    }
                },
                ke = function (e) {
                    return null !== e && ("number" == typeof e && !isNaN(e - 0) || "object" === D(e) && e.constructor === Number)
                },
                we = function (e) {
                    return "string" == typeof e
                },
                be = function (e) {
                    return null !== e && "object" === D(e)
                },
                Ue = function (e) {
                    return "function" == typeof Array.isArray ? Array.isArray(e) : "array" === this.getType(e)
                },
                Fe = function (e) {
                    return void 0 === e
                },
                qe = function (e) {
                    return Ue(e) || be(e)
                },
                xe = 0;
            Date.now || (Date.now = function () {
                return (new Date).getTime()
            });
            var He = {
                    now: function () {
                        0 === xe && (xe = Date.now() - 1);
                        var e = Date.now() - xe;
                        return e > 4294967295 ? (xe += 4294967295, Date.now() - xe) : e
                    },
                    utc: function () {
                        return Math.round(Date.now() / 1e3)
                    }
                },
                Ke = function e(t, n, r, o) {
                    if (!qe(t) || !qe(n)) return 0;
                    for (var i, s = 0, a = Object.keys(n), u = 0, c = a.length; u < c; u++)
                        if (i = a[u], !(Fe(n[i]) || r && r.includes(i)))
                            if (qe(t[i]) && qe(n[i])) s += e(t[i], n[i], r, o);
                            else {
                                if (o && o.includes(n[i])) continue;
                                t[i] !== n[i] && (t[i] = n[i], s += 1)
                            } return s
                },
                Ye = function (e) {
                    if (0 === e.length) return 0;
                    for (var t = 0, n = 0, r = "undefined" != typeof document && void 0 !== document.characterSet ? document.characterSet : "UTF-8"; void 0 !== e[t];) n += e[t++].charCodeAt[t] <= 255 ? 1 : 0 == r ? 3 : 2;
                    return n
                },
                Be = function (e) {
                    var t = e || 99999999;
                    return Math.round(Math.random() * t)
                },
                Ve = function (e, t) {
                    for (var n in e)
                        if (e[n] === t) return 1;
                    return 0
                },
                je = {},
                We = function (e) {
                    return e === M.GRP_PUBLIC
                },
                ze = function (e) {
                    return e === M.GRP_AVCHATROOM
                };

            function Xe(e, t) {
                var n = {};
                return Object.keys(e).forEach(function (r) {
                    n[t(e[r], r)] = e[r]
                }), n
            }

            function Je(e, t) {
                var n = {};
                return Object.keys(e).forEach(function (r) {
                    n[r] = t(e[r])
                }), n
            }

            function Qe(e, t) {
                if ("string" != typeof e && !Array.isArray(e)) throw new TypeError("Expected the input to be `string | string[]`");
                t = Object.assign({
                    pascalCase: 0
                }, t);
                var n;
                return 0 === (e = Array.isArray(e) ? e.map(function (e) {
                    return e.trim()
                }).filter(function (e) {
                    return e.length
                }).join("-") : e.trim()).length ? "" : 1 === e.length ? t.pascalCase ? e.toUpperCase() : e.toLowerCase() : (e !== e.toLowerCase() && (e = Ze(e)), e = e.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (e, t) {
                    return t.toUpperCase()
                }).replace(/\d+(\w|$)/g, function (e) {
                    return e.toUpperCase()
                }), n = e, t.pascalCase ? n.charAt(0).toUpperCase() + n.slice(1) : n)
            }
            var Ze = function (e) {
                for (var t = 0, n = 0, r = 0, o = 0; o < e.length; o++) {
                    var i = e[o];
                    t && /[a-zA-Z]/.test(i) && i.toUpperCase() === i ? (e = e.slice(0, o) + "-" + e.slice(o), t = 0, r = n, n = 1, o++) : n && r && /[a-zA-Z]/.test(i) && i.toLowerCase() === i ? (e = e.slice(0, o - 1) + "-" + e.slice(o - 1), r = n, n = 0, t = 1) : (t = i.toLowerCase() === i && i.toUpperCase() !== i, r = n, n = i.toUpperCase() === i && i.toLowerCase() !== i)
                }
                return e
            };

            function $e(e, t, n) {
                var r = [],
                    o = function e(t, n) {
                        if (Ue(t)) return t.map(function (t) {
                            return be(t) ? e(t, n) : t
                        });
                        if (be(t)) {
                            var o = Xe(t, function (e, t) {
                                if ("_" === t[0]) return t;
                                if ((s = t) !== Qe(s)) {
                                    for (var o = 1, i = 0; i < de.ignoreKeyWord.length; i++)
                                        if (t.includes(de.ignoreKeyWord[i])) {
                                            o = 0;
                                            break
                                        } o && r.push(t)
                                }
                                var s;
                                return Fe(n[t]) ? function (e) {
                                    return e[0].toUpperCase() + Qe(e).slice(1)
                                }(t) : n[t]
                            });
                            return o = Je(o, function (t) {
                                return Ue(t) || be(t) ? e(t, n) : t
                            })
                        }
                    }(e, t = R({}, de.request, t));
                return r.length > 0 && n.innerEmitter.emit(_e.ERROR_DETECTED, {
                    code: ie.CONVERTOR_IRREGULAR_PARAMS,
                    message: ie.CONVERTOR_IRREGULAR_PARAMS
                }), o
            }
            var et = function () {
                function e(t, n) {
                    var r = this;
                    if (A(this, e), void 0 === n) throw new ae({
                        code: ie.NO_SDK_INSTANCE,
                        message: se.NO_SDK_INSTANCE
                    });
                    this.tim = n, this.method = t.method || "POST", this._initializeServerMap(), this._initializeURL(t), this._initializeRequestData(t), this.callback = function (e) {
                        return function e(t, n) {
                            if (n = R({}, de.response, n), Ue(t)) return t.map(function (t) {
                                return be(t) ? e(t, n) : t
                            });
                            if (be(t)) {
                                var r = Xe(t, function (e, t) {
                                    return Fe(n[t]) ? Qe(t) : n[t]
                                });
                                return r = Je(r, function (t) {
                                    return Ue(t) || be(t) ? e(t, n) : t
                                })
                            }
                        }(e = t.decode(e), r._getResponseMap(t))
                    }
                }
                return O(e, [{
                    key: "_initializeServerMap",
                    value: function () {
                        this._serverMap = Object.create(null);
                        var e = "";
                        for (var t in fe.NAME) switch (e = fe.NAME[t]) {
                            case fe.NAME.PIC:
                                this._serverMap[e] = fe.HOST.CURRENT.PIC;
                                break;
                            case fe.NAME.IM_COS_SIGN:
                                this._serverMap[e] = fe.HOST.CURRENT.COS;
                                break;
                            default:
                                this._serverMap[e] = fe.HOST.CURRENT.COMMON
                        }
                    }
                }, {
                    key: "_getHost",
                    value: function (e) {
                        if (void 0 !== this._serverMap[e]) return this._serverMap[e];
                        throw new ae({
                            code: ie.NETWORK_UNDEFINED_SERVER_NAME,
                            message: se.NETWORK_UNDEFINED_SERVER_NAME
                        })
                    }
                }, {
                    key: "_initializeURL",
                    value: function (e) {
                        var t = e.serverName,
                            n = e.cmd,
                            r = this._getHost(t),
                            o = "".concat(r, "/").concat(fe.NAME_VERSION[t], "/").concat(t, "/").concat(n);
                        o += "?".concat(this._getQueryString(e.queryString)), this.url = o
                    }
                }, {
                    key: "getUrl",
                    value: function () {
                        return this.url.replace(/&reqtime=(\d+)/, "&reqtime=".concat(Math.ceil(+new Date / 1e3)))
                    }
                }, {
                    key: "_initializeRequestData",
                    value: function (e) {
                        var t, n = e.requestData;
                        t = this._requestDataCleaner(n), this.requestData = e.encode(t)
                    }
                }, {
                    key: "_requestDataCleaner",
                    value: function (e) {
                        var t = Array.isArray(e) ? [] : Object.create(null);
                        for (var n in e) "_" !== n[0] && null !== e[n] && 1 != this._isGetterProperty(e, n) && ("object" !== D(e[n]) ? t[n] = e[n] : t[n] = this._requestDataCleaner.bind(this)(e[n]));
                        return t
                    }
                }, {
                    key: "_isGetterProperty",
                    value: function (e, t) {
                        return "function" == typeof Object.getOwnPropertyDescriptor(e, t).get ? 1 : 0
                    }
                }, {
                    key: "_getQueryString",
                    value: function (e) {
                        var t = [];
                        for (var n in e) "function" != typeof e[n] ? t.push("".concat(n, "=").concat(e[n])) : t.push("".concat(n, "=").concat(e[n]()));
                        return t.join("&")
                    }
                }, {
                    key: "_getResponseMap",
                    value: function (e) {
                        if (e.keyMaps && e.keyMaps.response && Object.keys(e.keyMaps.response).length > 0) return e.keyMaps.response
                    }
                }]), e
            }();

            function tt(e) {
                this.mixin(e)
            }
            tt.mixin = function (e) {
                var t = e.prototype || e;
                t._isReady = 0, t.ready = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    if (e) return this._isReady ? void(t ? e.call(this) : setTimeout(e, 1)) : (this._readyQueue = this._readyQueue || [], void this._readyQueue.push(e))
                }, t.triggerReady = function () {
                    var e = this;
                    this._isReady = 1, setTimeout(function () {
                        var t = e._readyQueue;
                        e._readyQueue = [], t && t.length > 0 && t.forEach(function (e) {
                            e.call(this)
                        }, e)
                    }, 1)
                }, t.resetReady = function () {
                    this._isReady = 0, this._readyQueue = []
                }, t.isReady = function () {
                    return this._isReady
                }
            };
            var nt = function () {
                    function e(t) {
                        if (A(this, e), 0 == !!t) throw new ae({
                            code: ie.NO_SDK_INSTANCE,
                            message: se.NO_SDK_INSTANCE
                        });
                        tt.mixin(this), this.tim = t, this.innerEmitter = t.innerEmitter, this.connectionController = t.connectionController, this.packageConfig = t.packageConfig, this.packageConfig.update(t)
                    }
                    return O(e, [{
                        key: "createPackage",
                        value: function (e) {
                            var t = this.packageConfig.get(e);
                            return t ? new et(t, this.tim) : 0
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            Ge.warn(["method: IMController.reset() method must be implemented"].join())
                        }
                    }, {
                        key: "destroy",
                        value: function () {
                            Ge.warn("destory")
                        }
                    }]), e
                }(),
                rt = function () {
                    function e(t, n) {
                        A(this, e), this.data = t, this.tim = n, this.defaultData = {}, Object.assign(this.defaultData, t), this.initGetterAndSetter()
                    }
                    return O(e, [{
                        key: "initGetterAndSetter",
                        value: function () {
                            var e = this,
                                t = this.tim,
                                n = function (n, r) {
                                    Object.defineProperty(e, n, {
                                        enumerable: 1,
                                        configurable: 1,
                                        get: function () {
                                            return e.data[n]
                                        },
                                        set: function (r) {
                                            e.data[n] = r, e.onChange.bind(e)(t.context, n, r)
                                        }
                                    })
                                };
                            for (var r in e.data) n(r, e.data[r])
                        }
                    }, {
                        key: "onChange",
                        value: function (e, t, n) {
                            this.tim.innerEmitter.emit(_e.CONTEXT_UPDATED, {
                                data: {
                                    context: e,
                                    key: t,
                                    value: n
                                }
                            })
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            var e = this.tim;
                            for (var t in this.data) this.data[t] = this.defaultData.hasOwnProperty(t) ? this.defaultData[t] : null;
                            this.tim.innerEmitter.emit(_e.CONTEXT_RESET, {
                                data: e.context
                            })
                        }
                    }]), e
                }(),
                ot = {
                    SUCCESS: "JoinedSuccess",
                    WAIT_APPROVAL: "WaitAdminApproval"
                },
                it = {
                    COMMON: {
                        SUCCESS: "OK",
                        FAIL: "FAIL"
                    },
                    REQUEST: {
                        SUCCESS: 0
                    },
                    ACCESS_LAYER: {
                        PRODUCTION: 0,
                        TEST: 1
                    },
                    LOGIN: {
                        IS_LOGIN: 1,
                        IS_NOT_LOGIN: 0
                    },
                    SYNC_MESSAGE: {
                        SYNCHRONIZATION_START: 0,
                        SYNCHRONIZING: 1,
                        SYNCHRONIZED: 2
                    },
                    MESSAGE_STATUS: {
                        UNSEND: "unSend",
                        SUCCESS: "success",
                        FAIL: "fail"
                    },
                    GET_HISTORY_MESSAGE_STATUS: {
                        C2C_IS_FINISHED: 1,
                        C2C_IS_NOT_FINISHED: 0,
                        GROUP_IS_FINISHED: 1,
                        GROUP_IS_NOT_FINISHED: 0
                    },
                    ACCOUNT_STATUS: {
                        SIGN_IN: 1,
                        SIGN_OUT: 0
                    },
                    CHANNEL_STATUS: {
                        ONLINE: 1,
                        OFFLINE: 0
                    },
                    JOIN_GROUP_STATUS: ot,
                    UPLOAD: {
                        FINISHED: 1,
                        UPLOADING: 0
                    }
                },
                st = function (e) {
                    function t(e) {
                        var n;
                        return A(this, t), (n = F(this, G(t).call(this, e)))._initContext(), n._initListener(), n
                    }
                    return P(t, nt), O(t, [{
                        key: "reset",
                        value: function () {
                            this.tim.context.reset()
                        }
                    }, {
                        key: "_IAmReady",
                        value: function () {
                            this.triggerReady()
                        }
                    }, {
                        key: "_initListener",
                        value: function () {
                            this.tim.innerEmitter.on(_e.SIGN_LOGIN_SUCCESS, this._updateA2KeyAndTinyID, this)
                        }
                    }, {
                        key: "_updateA2KeyAndTinyID",
                        value: function (e) {
                            var t = e.data,
                                n = t.a2Key,
                                r = t.tinyID;
                            this.set("a2Key", n), this.set("tinyID", r), this.tim.innerEmitter.emit(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, {
                                data: {
                                    context: this.tim.context
                                }
                            }), this._IAmReady()
                        }
                    }, {
                        key: "get",
                        value: function (e) {
                            return this.tim.context[e]
                        }
                    }, {
                        key: "set",
                        value: function (e, t) {
                            this.tim.context[e] = t
                        }
                    }, {
                        key: "_initContext",
                        value: function () {
                            var e = this.tim.loginInfo;
                            this.tim.context = new rt({
                                login: it.LOGIN.IS_NOT_LOGIN,
                                SDKAppID: e.SDKAppID,
                                appIDAt3rd: null,
                                accountType: e.accountType,
                                identifier: e.identifier,
                                tinyID: null,
                                identifierNick: e.identifierNick,
                                userSig: e.userSig,
                                a2Key: null,
                                contentType: "json",
                                apn: 1
                            }, this.tim), this.tim.innerEmitter.on(_e.CONTEXT_UPDATED, this._onContextMemberChange.bind(this))
                        }
                    }, {
                        key: "_onContextMemberChange",
                        value: function (e) {
                            var t = e.data,
                                n = t.key,
                                r = t.value;
                            switch (n) {
                                case "tinyID":
                                    r.length <= 0 ? this.tim.context.login = it.LOGIN.IS_NOT_LOGIN : this.tim.context.login = null != this.tim.context.a2Key ? it.LOGIN.IS_LOGIN : it.LOGIN.IS_NOT_LOGIN;
                                    break;
                                case "a2Key":
                                    r.length <= 0 ? this.tim.context.login = it.LOGIN.IS_NOT_LOGIN : this.tim.context.login = null != this.tim.context.tinyID ? it.LOGIN.IS_LOGIN : it.LOGIN.IS_NOT_LOGIN
                            }
                        }
                    }]), t
                }(),
                at = function e(t) {
                    A(this, e), this.code = 0, this.data = t || {}
                },
                ut = null,
                ct = function (e) {
                    ut = e
                },
                lt = function (e) {
                    return e instanceof at ? (Ge.warn("IMPromise.resolve 此函数会自动用options创建IMResponse实例，调用侧不需创建，建议修改！"), Promise.resolve(e)) : Promise.resolve(new at(e))
                },
                pt = function (t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    if (t instanceof ae) return n && null != ut && ut.emit(e.ERROR, t), Promise.reject(t);
                    if (t instanceof Error) {
                        Ge.warn("IMPromise.reject options not instanceof IMError! details:", t);
                        var r = new ae({
                            code: ie.UNCAUGHT_ERROR,
                            message: t.message
                        });
                        return n && null != ut && ut.emit(e.ERROR, r), Promise.reject(r)
                    }
                    if (Fe(t) || Fe(t.code) || Fe(t.message)) Ge.error("IMPromise.reject 必须指定code(错误码)和message(错误信息)!!!");
                    else {
                        if (ke(t.code) && we(t.message)) {
                            var o = new ae(t);
                            return n && null != ut && ut.emit(e.ERROR, o), Promise.reject(o)
                        }
                        Ge.error("IMPromise.reject code(错误码)必须为数字，message(错误信息)必须为字符串!!!")
                    }
                },
                ht = "sdkReady",
                ft = "login",
                gt = "initConversationList",
                dt = "initGroupList",
                _t = "upload",
                mt = function (t) {
                    function n(e) {
                        var t;
                        return A(this, n), (t = F(this, G(n).call(this, e))).devLoginTips = 'new TIM({\n      SDKAppID: "必填",\n      accountType: "必填",\n      identifier: "必填",\n      userSig: "必填",\n      identifierNick: "可选"\n    })\n    ', t._initListener(), t
                    }
                    return P(n, nt), O(n, [{
                        key: "login",
                        value: function (e) {
                            Ge.log("SignController.login userID=", e.identifier), Ge.time(ft);
                            var t = this._checkLoginInfo(e);
                            return W(t) ? (this.tim.context.identifier = e.identifier, this.tim.context.userSig = e.userSig, this.tim.context.SDKAppID = e.SDKAppID, this.tim.context.accountType = e.accountType, this.tim.context.identifier && this.tim.context.userSig ? (this.tim.innerEmitter.emit(_e.SIGN_LOGIN), this._accessLayer()) : void 0) : pt(t)
                        }
                    }, {
                        key: "_initListener",
                        value: function () {
                            this.innerEmitter.on(_e.NOTICE_LONGPOLL_KICKED_OUT, this._onKickedOut, this), this.innerEmitter.on(_e.NOTICE_LONGPOLL_MUTIPLE_DEVICE_KICKED_OUT, this._onMultipleDeviceKickedOut, this)
                        }
                    }, {
                        key: "_accessLayer",
                        value: function () {
                            var e = this;
                            Ge.log("SignController._accessLayer.");
                            var t = this.createPackage({
                                name: "accessLayer",
                                action: "query"
                            });
                            return this.tim.connectionController.request(t).then(function (t) {
                                return Ge.log("SignController._accessLayer ok. webImAccessLayer=", t.data.webImAccessLayer), 1 === t.data.webImAccessLayer && fe.HOST.setCurrent(t.data.webImAccessLayer), e._login()
                            }).catch(function (e) {
                                return Ge.error("SignController._accessLayer error:", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "_login",
                        value: function () {
                            var t = this,
                                n = this.createPackage({
                                    name: "login",
                                    action: "query"
                                });
                            return this.connectionController.request(n).then(function (n) {
                                if (0 == !!n.data.tinyID) throw new ae({
                                    code: ie.NO_TINYID,
                                    message: se.NO_TINYID
                                });
                                if (0 == !!n.data.a2Key) throw new ae({
                                    code: ie.NO_A2KEY,
                                    message: se.NO_A2KEY
                                });
                                return Ge.log("SignController.login ok. userID=".concat(t.tim.loginInfo.identifier, " loginCost=").concat(Ge.timeEnd(ft), "ms")), t.tim.innerEmitter.emit(_e.SIGN_LOGIN_SUCCESS, {
                                    data: {
                                        a2Key: n.data.a2Key,
                                        tinyID: n.data.tinyID
                                    }
                                }), t.tim.outerEmitter.emit(e.LOGIN_SUCCESS), lt(n.data)
                            }).catch(function (e) {
                                return Ge.error("SignController.login error:", e), pt(e)
                            })
                        }
                    }, {
                        key: "logout",
                        value: function () {
                            return Ge.info("SignController.logout"), this.tim.innerEmitter.emit(_e.SIGN_LOGOUT_EXECUTING), Promise.all(this._logout(v), this._logout(y)).then(this._emitLogoutSuccess.bind(this)).catch(this._emitLogoutSuccess.bind(this))
                        }
                    }, {
                        key: "_logout",
                        value: function (e) {
                            var t = this.tim.notificationController,
                                n = e === y ? "logout" : "longPollLogout",
                                r = e === y ? {
                                    name: n,
                                    action: "query"
                                } : {
                                    name: n,
                                    action: "query",
                                    param: {
                                        longPollID: t.getLongPollID()
                                    }
                                },
                                o = this.createPackage(r);
                            return this.connectionController.request(o).catch(function (e) {
                                return Ge.error("SignController._logout error:", e), pt(e)
                            })
                        }
                    }, {
                        key: "_checkLoginInfo",
                        value: function (e) {
                            var t = 0,
                                n = "";
                            return null === e.SDKAppID ? (t = ie.NO_SDKAPPID, n = se.NO_SDKAPPID) : null === e.accountType ? (t = ie.NO_ACCOUNT_TYPE, n = se.NO_ACCOUNT_TYPE) : null === e.identifier ? (t = ie.NO_IDENTIFIER, n = se.NO_IDENTIFIER) : null === e.userSig && (t = ie.NO_USERSIG, n = se.NO_USERSIG), W(t) || W(n) ? {} : {
                                code: t,
                                message: n
                            }
                        }
                    }, {
                        key: "_emitLogoutSuccess",
                        value: function () {
                            return this.tim.innerEmitter.emit(_e.SIGN_LOGOUT_SUCCESS), lt({})
                        }
                    }, {
                        key: "_onKickedOut",
                        value: function () {
                            var t = this;
                            this.tim.logout().then(function () {
                                Ge.warn("SignController._onKickedOut kicked out.       userID=".concat(t.tim.loginInfo.identifier)), t.tim.outerEmitter.emit(e.KICKED_OUT, {
                                    type: _
                                })
                            })
                        }
                    }, {
                        key: "_onMultipleDeviceKickedOut",
                        value: function () {
                            var t = this;
                            this.tim.logout().then(function () {
                                Ge.warn("SignController._onKickedOut kicked out.       userID=".concat(t.tim.loginInfo.identifier)), t.tim.outerEmitter.emit(e.KICKED_OUT, {
                                    type: m
                                })
                            })
                        }
                    }, {
                        key: "reset",
                        value: function () {}
                    }]), n
                }(),
                Et = function (e, t) {
                    return function () {
                        for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
                        return e.apply(t, n)
                    }
                },
                yt = Object.prototype.toString;

            function vt(e) {
                return "[object Array]" === yt.call(e)
            }

            function It(e) {
                return null !== e && "object" == typeof e
            }

            function St(e) {
                return "[object Function]" === yt.call(e)
            }

            function Tt(e, t) {
                if (null != e)
                    if ("object" != typeof e && (e = [e]), vt(e))
                        for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
                    else
                        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
            }
            var Ct = {
                isArray: vt,
                isArrayBuffer: function (e) {
                    return "[object ArrayBuffer]" === yt.call(e)
                },
                isBuffer: function (e) {
                    return null != e && null != e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                },
                isFormData: function (e) {
                    return "undefined" != typeof FormData && e instanceof FormData
                },
                isArrayBufferView: function (e) {
                    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
                },
                isString: function (e) {
                    return "string" == typeof e
                },
                isNumber: function (e) {
                    return "number" == typeof e
                },
                isObject: It,
                isUndefined: function (e) {
                    return void 0 === e
                },
                isDate: function (e) {
                    return "[object Date]" === yt.call(e)
                },
                isFile: function (e) {
                    return "[object File]" === yt.call(e)
                },
                isBlob: function (e) {
                    return "[object Blob]" === yt.call(e)
                },
                isFunction: St,
                isStream: function (e) {
                    return It(e) && St(e.pipe)
                },
                isURLSearchParams: function (e) {
                    return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
                },
                isStandardBrowserEnv: function () {
                    return "undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product ? "undefined" != typeof window && "undefined" != typeof document : 0
                },
                forEach: Tt,
                merge: function e() {
                    var t = {};

                    function n(n, r) {
                        "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n
                    }
                    for (var r = 0, o = arguments.length; r < o; r++) Tt(arguments[r], n);
                    return t
                },
                deepMerge: function e() {
                    var t = {};

                    function n(n, r) {
                        "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = "object" == typeof n ? e({}, n) : n
                    }
                    for (var r = 0, o = arguments.length; r < o; r++) Tt(arguments[r], n);
                    return t
                },
                extend: function (e, t, n) {
                    return Tt(t, function (t, r) {
                        e[r] = n && "function" == typeof t ? Et(t, n) : t
                    }), e
                },
                trim: function (e) {
                    return e.replace(/^\s*/, "").replace(/\s*$/, "")
                }
            };

            function Mt(e) {
                return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
            }
            var Dt = function (e, t, n) {
                if (!t) return e;
                var r;
                if (n) r = n(t);
                else if (Ct.isURLSearchParams(t)) r = t.toString();
                else {
                    var o = [];
                    Ct.forEach(t, function (e, t) {
                        null != e && (Ct.isArray(e) ? t += "[]" : e = [e], Ct.forEach(e, function (e) {
                            Ct.isDate(e) ? e = e.toISOString() : Ct.isObject(e) && (e = JSON.stringify(e)), o.push(Mt(t) + "=" + Mt(e))
                        }))
                    }), r = o.join("&")
                }
                if (r) {
                    var i = e.indexOf("#"); - 1 !== i && (e = e.slice(0, i)), e += (-1 === e.indexOf("?") ? "?" : "&") + r
                }
                return e
            };

            function At() {
                this.handlers = []
            }
            At.prototype.use = function (e, t) {
                return this.handlers.push({
                    fulfilled: e,
                    rejected: t
                }), this.handlers.length - 1
            }, At.prototype.eject = function (e) {
                this.handlers[e] && (this.handlers[e] = null)
            }, At.prototype.forEach = function (e) {
                Ct.forEach(this.handlers, function (t) {
                    null !== t && e(t)
                })
            };
            var Nt = At,
                Ot = function (e, t, n) {
                    return Ct.forEach(n, function (n) {
                        e = n(e, t)
                    }), e
                },
                Lt = function (e) {
                    return !(!e || !e.__CANCEL__)
                };

            function Rt() {
                throw new Error("setTimeout has not been defined")
            }

            function Pt() {
                throw new Error("clearTimeout has not been defined")
            }
            var Gt = Rt,
                kt = Pt;

            function wt(e) {
                if (Gt === setTimeout) return setTimeout(e, 0);
                if ((Gt === Rt || !Gt) && setTimeout) return Gt = setTimeout, setTimeout(e, 0);
                try {
                    return Gt(e, 0)
                } catch (t) {
                    try {
                        return Gt.call(null, e, 0)
                    } catch (t) {
                        return Gt.call(this, e, 0)
                    }
                }
            }
            "function" == typeof J.setTimeout && (Gt = setTimeout), "function" == typeof J.clearTimeout && (kt = clearTimeout);
            var bt, Ut = [],
                Ft = 0,
                qt = -1;

            function xt() {
                Ft && bt && (Ft = 0, bt.length ? Ut = bt.concat(Ut) : qt = -1, Ut.length && Ht())
            }

            function Ht() {
                if (!Ft) {
                    var e = wt(xt);
                    Ft = 1;
                    for (var t = Ut.length; t;) {
                        for (bt = Ut, Ut = []; ++qt < t;) bt && bt[qt].run();
                        qt = -1, t = Ut.length
                    }
                    bt = null, Ft = 0,
                        function (e) {
                            if (kt === clearTimeout) return clearTimeout(e);
                            if ((kt === Pt || !kt) && clearTimeout) return kt = clearTimeout, clearTimeout(e);
                            try {
                                kt(e)
                            } catch (t) {
                                try {
                                    return kt.call(null, e)
                                } catch (t) {
                                    return kt.call(this, e)
                                }
                            }
                        }(e)
                }
            }

            function Kt(e, t) {
                this.fun = e, this.array = t
            }
            Kt.prototype.run = function () {
                this.fun.apply(null, this.array)
            };

            function Yt() {}
            var Bt = Yt,
                Vt = Yt,
                jt = Yt,
                Wt = Yt,
                zt = Yt,
                Xt = Yt,
                Jt = Yt;
            var Qt = J.performance || {},
                Zt = Qt.now || Qt.mozNow || Qt.msNow || Qt.oNow || Qt.webkitNow || function () {
                    return (new Date).getTime()
                };
            var $t = new Date;
            var en = {
                    nextTick: function (e) {
                        var t = new Array(arguments.length - 1);
                        if (arguments.length > 1)
                            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                        Ut.push(new Kt(e, t)), 1 !== Ut.length || Ft || wt(Ht)
                    },
                    title: "browser",
                    browser: 1,
                    env: {},
                    argv: [],
                    version: "",
                    versions: {},
                    on: Bt,
                    addListener: Vt,
                    once: jt,
                    off: Wt,
                    removeListener: zt,
                    removeAllListeners: Xt,
                    emit: Jt,
                    binding: function (e) {
                        throw new Error("process.binding is not supported")
                    },
                    cwd: function () {
                        return "/"
                    },
                    chdir: function (e) {
                        throw new Error("process.chdir is not supported")
                    },
                    umask: function () {
                        return 0
                    },
                    hrtime: function (e) {
                        var t = .001 * Zt.call(Qt),
                            n = Math.floor(t),
                            r = Math.floor(t % 1 * 1e9);
                        return e && (n -= e[0], (r -= e[1]) < 0 && (n--, r += 1e9)), [n, r]
                    },
                    platform: "browser",
                    release: {},
                    config: {},
                    uptime: function () {
                        return (new Date - $t) / 1e3
                    }
                },
                tn = function (e, t) {
                    Ct.forEach(e, function (n, r) {
                        r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r])
                    })
                },
                nn = function (e, t, n, r, o) {
                    return function (e, t, n, r, o) {
                        return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = 1, e.toJSON = function () {
                            return {
                                message: this.message,
                                name: this.name,
                                description: this.description,
                                number: this.number,
                                fileName: this.fileName,
                                lineNumber: this.lineNumber,
                                columnNumber: this.columnNumber,
                                stack: this.stack,
                                config: this.config,
                                code: this.code
                            }
                        }, e
                    }(new Error(e), t, n, r, o)
                },
                rn = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],
                on = Ct.isStandardBrowserEnv() ? function () {
                    var e, t = /(msie|trident)/i.test(navigator.userAgent),
                        n = document.createElement("a");

                    function r(e) {
                        var r = e;
                        return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
                            href: n.href,
                            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                            host: n.host,
                            search: n.search ? n.search.replace(/^\?/, "") : "",
                            hash: n.hash ? n.hash.replace(/^#/, "") : "",
                            hostname: n.hostname,
                            port: n.port,
                            pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
                        }
                    }
                    return e = r(window.location.href),
                        function (t) {
                            var n = Ct.isString(t) ? r(t) : t;
                            return n.protocol === e.protocol && n.host === e.host
                        }
                }() : function () {
                    return 1
                },
                sn = Ct.isStandardBrowserEnv() ? {
                    write: function (e, t, n, r, o, i) {
                        var s = [];
                        s.push(e + "=" + encodeURIComponent(t)), Ct.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), Ct.isString(r) && s.push("path=" + r), Ct.isString(o) && s.push("domain=" + o), 1 == i && s.push("secure"), document.cookie = s.join("; ")
                    },
                    read: function (e) {
                        var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                        return t ? decodeURIComponent(t[3]) : null
                    },
                    remove: function (e) {
                        this.write(e, "", Date.now() - 864e5)
                    }
                } : {
                    write: function () {},
                    read: function () {
                        return null
                    },
                    remove: function () {}
                },
                an = function (e) {
                    return new Promise(function (t, n) {
                        var r = e.data,
                            o = e.headers;
                        Ct.isFormData(r) && delete o["Content-Type"];
                        var i = new XMLHttpRequest;
                        if (e.auth) {
                            var s = e.auth.username || "",
                                a = e.auth.password || "";
                            o.Authorization = "Basic " + btoa(s + ":" + a)
                        }
                        if (i.open(e.method.toUpperCase(), Dt(e.url, e.params, e.paramsSerializer), 1), i.timeout = e.timeout, i.onreadystatechange = function () {
                                if (i && 4 === i.readyState && (0 !== i.status || i.responseURL && 0 === i.responseURL.indexOf("file:"))) {
                                    var r, o, s, a, u, c = "getAllResponseHeaders" in i ? (r = i.getAllResponseHeaders(), u = {}, r ? (Ct.forEach(r.split("\n"), function (e) {
                                            if (a = e.indexOf(":"), o = Ct.trim(e.substr(0, a)).toLowerCase(), s = Ct.trim(e.substr(a + 1)), o) {
                                                if (u[o] && rn.indexOf(o) >= 0) return;
                                                u[o] = "set-cookie" === o ? (u[o] ? u[o] : []).concat([s]) : u[o] ? u[o] + ", " + s : s
                                            }
                                        }), u) : u) : null,
                                        l = {
                                            data: e.responseType && "text" !== e.responseType ? i.response : i.responseText,
                                            status: i.status,
                                            statusText: i.statusText,
                                            headers: c,
                                            config: e,
                                            request: i
                                        };
                                    ! function (e, t, n) {
                                        var r = n.config.validateStatus;
                                        !r || r(n.status) ? e(n) : t(nn("Request failed with status code " + n.status, n.config, null, n.request, n))
                                    }(t, n, l), i = null
                                }
                            }, i.onabort = function () {
                                i && (n(nn("Request aborted", e, "ECONNABORTED", i)), i = null)
                            }, i.onerror = function () {
                                n(nn("Network Error", e, null, i)), i = null
                            }, i.ontimeout = function () {
                                n(nn("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", i)), i = null
                            }, Ct.isStandardBrowserEnv()) {
                            var u = sn,
                                c = (e.withCredentials || on(e.url)) && e.xsrfCookieName ? u.read(e.xsrfCookieName) : void 0;
                            c && (o[e.xsrfHeaderName] = c)
                        }
                        if ("setRequestHeader" in i && Ct.forEach(o, function (e, t) {
                                void 0 === r && "content-type" === t.toLowerCase() ? delete o[t] : i.setRequestHeader(t, e)
                            }), e.withCredentials && (i.withCredentials = 1), e.responseType) try {
                            i.responseType = e.responseType
                        } catch (l) {
                            if ("json" !== e.responseType) throw l
                        }
                        "function" == typeof e.onDownloadProgress && i.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && i.upload && i.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {
                            i && (i.abort(), n(e), i = null)
                        }), void 0 === r && (r = null), i.send(r)
                    })
                },
                un = {
                    "Content-Type": "application/x-www-form-urlencoded"
                };

            function cn(e, t) {
                !Ct.isUndefined(e) && Ct.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
            }
            var ln, pn = {
                adapter: (void 0 !== en && "[object process]" === Object.prototype.toString.call(en) ? ln = an : "undefined" != typeof XMLHttpRequest && (ln = an), ln),
                transformRequest: [function (e, t) {
                    return tn(t, "Accept"), tn(t, "Content-Type"), Ct.isFormData(e) || Ct.isArrayBuffer(e) || Ct.isBuffer(e) || Ct.isStream(e) || Ct.isFile(e) || Ct.isBlob(e) ? e : Ct.isArrayBufferView(e) ? e.buffer : Ct.isURLSearchParams(e) ? (cn(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : Ct.isObject(e) ? (cn(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
                }],
                transformResponse: [function (e) {
                    if ("string" == typeof e) try {
                        e = JSON.parse(e)
                    } catch (t) {}
                    return e
                }],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                validateStatus: function (e) {
                    return e >= 200 && e < 300
                }
            };
            pn.headers = {
                common: {
                    Accept: "application/json, text/plain, */*"
                }
            }, Ct.forEach(["delete", "get", "head"], function (e) {
                pn.headers[e] = {}
            }), Ct.forEach(["post", "put", "patch"], function (e) {
                pn.headers[e] = Ct.merge(un)
            });
            var hn = pn;

            function fn(e) {
                e.cancelToken && e.cancelToken.throwIfRequested()
            }
            var gn = function (e) {
                    var t, n, r;
                    return fn(e), e.baseURL && (r = e.url, !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(r)) && (e.url = (t = e.baseURL, (n = e.url) ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t)), e.headers = e.headers || {}, e.data = Ot(e.data, e.headers, e.transformRequest), e.headers = Ct.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), Ct.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
                        delete e.headers[t]
                    }), (e.adapter || hn.adapter)(e).then(function (t) {
                        return fn(e), t.data = Ot(t.data, t.headers, e.transformResponse), t
                    }, function (t) {
                        return Lt(t) || (fn(e), t && t.response && (t.response.data = Ot(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
                    })
                },
                dn = function (e, t) {
                    t = t || {};
                    var n = {};
                    return Ct.forEach(["url", "method", "params", "data"], function (e) {
                        void 0 !== t[e] && (n[e] = t[e])
                    }), Ct.forEach(["headers", "auth", "proxy"], function (r) {
                        Ct.isObject(t[r]) ? n[r] = Ct.deepMerge(e[r], t[r]) : void 0 !== t[r] ? n[r] = t[r] : Ct.isObject(e[r]) ? n[r] = Ct.deepMerge(e[r]) : void 0 !== e[r] && (n[r] = e[r])
                    }), Ct.forEach(["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"], function (r) {
                        void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r])
                    }), n
                };

            function _n(e) {
                this.defaults = e, this.interceptors = {
                    request: new Nt,
                    response: new Nt
                }
            }
            _n.prototype.request = function (e) {
                "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = dn(this.defaults, e)).method = e.method ? e.method.toLowerCase() : "get";
                var t = [gn, void 0],
                    n = Promise.resolve(e);
                for (this.interceptors.request.forEach(function (e) {
                        t.unshift(e.fulfilled, e.rejected)
                    }), this.interceptors.response.forEach(function (e) {
                        t.push(e.fulfilled, e.rejected)
                    }); t.length;) n = n.then(t.shift(), t.shift());
                return n
            }, _n.prototype.getUri = function (e) {
                return e = dn(this.defaults, e), Dt(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
            }, Ct.forEach(["delete", "get", "head", "options"], function (e) {
                _n.prototype[e] = function (t, n) {
                    return this.request(Ct.merge(n || {}, {
                        method: e,
                        url: t
                    }))
                }
            }), Ct.forEach(["post", "put", "patch"], function (e) {
                _n.prototype[e] = function (t, n, r) {
                    return this.request(Ct.merge(r || {}, {
                        method: e,
                        url: t,
                        data: n
                    }))
                }
            });
            var mn = _n;

            function En(e) {
                this.message = e
            }
            En.prototype.toString = function () {
                return "Cancel" + (this.message ? ": " + this.message : "")
            }, En.prototype.__CANCEL__ = 1;
            var yn = En;

            function vn(e) {
                if ("function" != typeof e) throw new TypeError("executor must be a function.");
                var t;
                this.promise = new Promise(function (e) {
                    t = e
                });
                var n = this;
                e(function (e) {
                    n.reason || (n.reason = new yn(e), t(n.reason))
                })
            }
            vn.prototype.throwIfRequested = function () {
                if (this.reason) throw this.reason
            }, vn.source = function () {
                var e;
                return {
                    token: new vn(function (t) {
                        e = t
                    }),
                    cancel: e
                }
            };
            var In = vn;

            function Sn(e) {
                var t = new mn(e),
                    n = Et(mn.prototype.request, t);
                return Ct.extend(n, mn.prototype, t), Ct.extend(n, t), n
            }
            var Tn = Sn(hn);
            Tn.Axios = mn, Tn.create = function (e) {
                return Sn(dn(Tn.defaults, e))
            }, Tn.Cancel = yn, Tn.CancelToken = In, Tn.isCancel = Lt, Tn.all = function (e) {
                return Promise.all(e)
            }, Tn.spread = function (e) {
                return function (t) {
                    return e.apply(null, t)
                }
            };
            var Cn = Tn,
                Mn = Tn;
            Cn.default = Mn;
            var Dn = Cn,
                An = Dn.create({
                    timeout: 6e3,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    }
                });
            An.interceptors.response.use(function (e) {
                var t = e.data,
                    n = t.error_code,
                    r = t.ErrorCode;
                return ke(n) && (r = n), r != it.REQUEST.SUCCESS && (e.data.ErrorCode = Number(r)), e
            }, function (e) {
                return "Network Error" === e.message && (1 == An.defaults.withCredentials && Ge.warn("Network Error, try to close `IMAxios.defaults.withCredentials` to false. (IMAxios.js)"), An.defaults.withCredentials = 0), Promise.reject(e)
            });
            var Nn = function () {
                    function e() {
                        A(this, e)
                    }
                    return O(e, [{
                        key: "request",
                        value: function (e) {
                            console.warn("请注意： ConnectionBase.request() 方法必须被派生类重写:"), console.log("参数如下：\n    * @param {String}options.url\tstring\t\t是\t开发者服务器接口地址\t\n    * @param {Any}options.data\t- string/object/ArrayBuffer\t\t否\t请求的参数\t\n    * @param {Object}options.header\tObject\t\t否\t设置请求的 header，\n    * @param {String}options.method\tstring\tGET\t否\tHTTP 请求方法\t\n    * @param {String}options.dataType\tstring\tjson\t否\t返回的数据格式\t\n    * @param {String}options.responseType\tstring\ttext\t否\t响应的数据类型\t\n    * @param {Boolean}isRetry\tstring\ttext\tfalse\t是否为重试的请求\t\n   ")
                        }
                    }, {
                        key: "_checkOptions",
                        value: function (e) {
                            if (0 == !!e.url) throw new ae({
                                code: ie.NETWORK_BASE_OPTIONS_NO_URL,
                                message: se.NETWORK_BASE_OPTIONS_NO_URL
                            })
                        }
                    }, {
                        key: "_initOptions",
                        value: function (e) {
                            e.method = ["POST", "GET", "PUT", "DELETE", "OPTION"].indexOf(e.method) >= 0 ? e.method : "POST", e.dataType = e.dataType || "json", e.responseType = e.responseType || "json"
                        }
                    }]), e
                }(),
                On = function (e) {
                    function t() {
                        var e;
                        return A(this, t), (e = F(this, G(t).call(this))).retry = 1, e
                    }
                    return P(t, Nn), O(t, [{
                        key: "request",
                        value: function (e) {
                            return this._checkOptions(e), this._initOptions(e), this._requestWithRetry({
                                url: e.url,
                                data: e.data,
                                method: e.method
                            })
                        }
                    }, {
                        key: "_requestWithRetry",
                        value: function (e) {
                            var t = this,
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                            return An(e).catch(function (r) {
                                return t.retry && n < t.retry ? t._requestWithRetry(e, ++n) : pt(r)
                            })
                        }
                    }]), t
                }(),
                Ln = [],
                Rn = [],
                Pn = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                Gn = 0;

            function kn() {
                Gn = 1;
                for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, n = e.length; t < n; ++t) Ln[t] = e[t], Rn[e.charCodeAt(t)] = t;
                Rn["-".charCodeAt(0)] = 62, Rn["_".charCodeAt(0)] = 63
            }

            function wn(e, t, n) {
                for (var r, o, i = [], s = t; s < n; s += 3) r = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2], i.push(Ln[(o = r) >> 18 & 63] + Ln[o >> 12 & 63] + Ln[o >> 6 & 63] + Ln[63 & o]);
                return i.join("")
            }

            function bn(e) {
                var t;
                Gn || kn();
                for (var n = e.length, r = n % 3, o = "", i = [], s = 0, a = n - r; s < a; s += 16383) i.push(wn(e, s, s + 16383 > a ? a : s + 16383));
                return 1 === r ? (t = e[n - 1], o += Ln[t >> 2], o += Ln[t << 4 & 63], o += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], o += Ln[t >> 10], o += Ln[t >> 4 & 63], o += Ln[t << 2 & 63], o += "="), i.push(o), i.join("")
            }

            function Un(e, t, n, r, o) {
                var i, s, a = 8 * o - r - 1,
                    u = (1 << a) - 1,
                    c = u >> 1,
                    l = -7,
                    p = n ? o - 1 : 0,
                    h = n ? -1 : 1,
                    f = e[t + p];
                for (p += h, i = f & (1 << -l) - 1, f >>= -l, l += a; l > 0; i = 256 * i + e[t + p], p += h, l -= 8);
                for (s = i & (1 << -l) - 1, i >>= -l, l += r; l > 0; s = 256 * s + e[t + p], p += h, l -= 8);
                if (0 === i) i = 1 - c;
                else {
                    if (i === u) return s ? NaN : Infinity * (f ? -1 : 1);
                    s += Math.pow(2, r), i -= c
                }
                return (f ? -1 : 1) * s * Math.pow(2, i - r)
            }

            function Fn(e, t, n, r, o, i) {
                var s, a, u, c = 8 * i - o - 1,
                    l = (1 << c) - 1,
                    p = l >> 1,
                    h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    f = r ? 0 : i - 1,
                    g = r ? 1 : -1,
                    d = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || Infinity === t ? (a = isNaN(t) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t += s + p >= 1 ? h / u : h * Math.pow(2, 1 - p)) * u >= 2 && (s++, u /= 2), s + p >= l ? (a = 0, s = l) : s + p >= 1 ? (a = (t * u - 1) * Math.pow(2, o), s += p) : (a = t * Math.pow(2, p - 1) * Math.pow(2, o), s = 0)); o >= 8; e[n + f] = 255 & a, f += g, a /= 256, o -= 8);
                for (s = s << o | a, c += o; c > 0; e[n + f] = 255 & s, f += g, s /= 256, c -= 8);
                e[n + f - g] |= 128 * d
            }
            var qn = {}.toString,
                xn = Array.isArray || function (e) {
                    return "[object Array]" == qn.call(e)
                };

            function Hn() {
                return Yn.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }

            function Kn(e, t) {
                if (Hn() < t) throw new RangeError("Invalid typed array length");
                return Yn.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = Yn.prototype : (null === e && (e = new Yn(t)), e.length = t), e
            }

            function Yn(e, t, n) {
                if (!(Yn.TYPED_ARRAY_SUPPORT || this instanceof Yn)) return new Yn(e, t, n);
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                    return jn(this, e)
                }
                return Bn(this, e, t, n)
            }

            function Bn(e, t, n, r) {
                if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, n, r) {
                    if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
                    if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                    t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r);
                    Yn.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = Yn.prototype : e = Wn(e, t);
                    return e
                }(e, t, n, r) : "string" == typeof t ? function (e, t, n) {
                    "string" == typeof n && "" !== n || (n = "utf8");
                    if (!Yn.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                    var r = 0 | Jn(t, n),
                        o = (e = Kn(e, r)).write(t, n);
                    o !== r && (e = e.slice(0, o));
                    return e
                }(e, t, n) : function (e, t) {
                    if (Xn(t)) {
                        var n = 0 | zn(t.length);
                        return 0 === (e = Kn(e, n)).length ? e : (t.copy(e, 0, 0, n), e)
                    }
                    if (t) {
                        if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? Kn(e, 0) : Wn(e, t);
                        if ("Buffer" === t.type && xn(t.data)) return Wn(e, t.data)
                    }
                    var r;
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }(e, t)
            }

            function Vn(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
                if (e < 0) throw new RangeError('"size" argument must not be negative')
            }

            function jn(e, t) {
                if (Vn(t), e = Kn(e, t < 0 ? 0 : 0 | zn(t)), !Yn.TYPED_ARRAY_SUPPORT)
                    for (var n = 0; n < t; ++n) e[n] = 0;
                return e
            }

            function Wn(e, t) {
                var n = t.length < 0 ? 0 : 0 | zn(t.length);
                e = Kn(e, n);
                for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
                return e
            }

            function zn(e) {
                if (e >= Hn()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Hn().toString(16) + " bytes");
                return 0 | e
            }

            function Xn(e) {
                return !(null == e || !e._isBuffer)
            }

            function Jn(e, t) {
                if (Xn(e)) return e.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
                "string" != typeof e && (e = "" + e);
                var n = e.length;
                if (0 === n) return 0;
                for (var r = 0;;) switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return n;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return Tr(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * n;
                    case "hex":
                        return n >>> 1;
                    case "base64":
                        return Cr(e).length;
                    default:
                        if (r) return Tr(e).length;
                        t = ("" + t).toLowerCase(), r = 1
                }
            }

            function Qn(e, t, n) {
                var r = 0;
                if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                if ((n >>>= 0) <= (t >>>= 0)) return "";
                for (e || (e = "utf8");;) switch (e) {
                    case "hex":
                        return hr(this, t, n);
                    case "utf8":
                    case "utf-8":
                        return ur(this, t, n);
                    case "ascii":
                        return lr(this, t, n);
                    case "latin1":
                    case "binary":
                        return pr(this, t, n);
                    case "base64":
                        return ar(this, t, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return fr(this, t, n);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), r = 1
                }
            }

            function Zn(e, t, n) {
                var r = e[t];
                e[t] = e[n], e[n] = r
            }

            function $n(e, t, n, r, o) {
                if (0 === e.length) return -1;
                if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
                    if (o) return -1;
                    n = e.length - 1
                } else if (n < 0) {
                    if (!o) return -1;
                    n = 0
                }
                if ("string" == typeof t && (t = Yn.from(t, r)), Xn(t)) return 0 === t.length ? -1 : er(e, t, n, r, o);
                if ("number" == typeof t) return t &= 255, Yn.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : er(e, [t], n, r, o);
                throw new TypeError("val must be string, number or Buffer")
            }

            function er(e, t, n, r, o) {
                var i, s = 1,
                    a = e.length,
                    u = t.length;
                if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    s = 2, a /= 2, u /= 2, n /= 2
                }

                function c(e, t) {
                    return 1 === s ? e[t] : e.readUInt16BE(t * s)
                }
                if (o) {
                    var l = -1;
                    for (i = n; i < a; i++)
                        if (c(e, i) === c(t, -1 === l ? 0 : i - l)) {
                            if (-1 === l && (l = i), i - l + 1 === u) return l * s
                        } else -1 !== l && (i -= i - l), l = -1
                } else
                    for (n + u > a && (n = a - u), i = n; i >= 0; i--) {
                        for (var p = 1, h = 0; h < u; h++)
                            if (c(e, i + h) !== c(t, h)) {
                                p = 0;
                                break
                            } if (p) return i
                    }
                return -1
            }

            function tr(e, t, n, r) {
                n = Number(n) || 0;
                var o = e.length - n;
                r ? (r = Number(r)) > o && (r = o) : r = o;
                var i = t.length;
                if (i % 2 != 0) throw new TypeError("Invalid hex string");
                r > i / 2 && (r = i / 2);
                for (var s = 0; s < r; ++s) {
                    var a = parseInt(t.substr(2 * s, 2), 16);
                    if (isNaN(a)) return s;
                    e[n + s] = a
                }
                return s
            }

            function nr(e, t, n, r) {
                return Mr(Tr(t, e.length - n), e, n, r)
            }

            function rr(e, t, n, r) {
                return Mr(function (e) {
                    for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
                    return t
                }(t), e, n, r)
            }

            function or(e, t, n, r) {
                return rr(e, t, n, r)
            }

            function ir(e, t, n, r) {
                return Mr(Cr(t), e, n, r)
            }

            function sr(e, t, n, r) {
                return Mr(function (e, t) {
                    for (var n, r, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) n = e.charCodeAt(s), r = n >> 8, o = n % 256, i.push(o), i.push(r);
                    return i
                }(t, e.length - n), e, n, r)
            }

            function ar(e, t, n) {
                return 0 === t && n === e.length ? bn(e) : bn(e.slice(t, n))
            }

            function ur(e, t, n) {
                n = Math.min(e.length, n);
                for (var r = [], o = t; o < n;) {
                    var i, s, a, u, c = e[o],
                        l = null,
                        p = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                    if (o + p <= n) switch (p) {
                        case 1:
                            c < 128 && (l = c);
                            break;
                        case 2:
                            128 == (192 & (i = e[o + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (l = u);
                            break;
                        case 3:
                            i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (l = u);
                            break;
                        case 4:
                            i = e[o + 1], s = e[o + 2], a = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (l = u)
                    }
                    null === l ? (l = 65533, p = 1) : l > 65535 && (l -= 65536, r.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), r.push(l), o += p
                }
                return function (e) {
                    var t = e.length;
                    if (t <= cr) return String.fromCharCode.apply(String, e);
                    var n = "",
                        r = 0;
                    for (; r < t;) n += String.fromCharCode.apply(String, e.slice(r, r += cr));
                    return n
                }(r)
            }
            Yn.TYPED_ARRAY_SUPPORT = void 0 !== J.TYPED_ARRAY_SUPPORT ? J.TYPED_ARRAY_SUPPORT : 1, Yn.poolSize = 8192, Yn._augment = function (e) {
                return e.__proto__ = Yn.prototype, e
            }, Yn.from = function (e, t, n) {
                return Bn(null, e, t, n)
            }, Yn.TYPED_ARRAY_SUPPORT && (Yn.prototype.__proto__ = Uint8Array.prototype, Yn.__proto__ = Uint8Array), Yn.alloc = function (e, t, n) {
                return function (e, t, n, r) {
                    return Vn(t), t <= 0 ? Kn(e, t) : void 0 !== n ? "string" == typeof r ? Kn(e, t).fill(n, r) : Kn(e, t).fill(n) : Kn(e, t)
                }(null, e, t, n)
            }, Yn.allocUnsafe = function (e) {
                return jn(null, e)
            }, Yn.allocUnsafeSlow = function (e) {
                return jn(null, e)
            }, Yn.isBuffer = function (e) {
                return null != e && (!!e._isBuffer || Dr(e) || function (e) {
                    return "function" == typeof e.readFloatLE && "function" == typeof e.slice && Dr(e.slice(0, 0))
                }(e))
            }, Yn.compare = function (e, t) {
                if (!Xn(e) || !Xn(t)) throw new TypeError("Arguments must be Buffers");
                if (e === t) return 0;
                for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o)
                    if (e[o] !== t[o]) {
                        n = e[o], r = t[o];
                        break
                    } return n < r ? -1 : r < n ? 1 : 0
            }, Yn.isEncoding = function (e) {
                switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 1;
                    default:
                        return 0
                }
            }, Yn.concat = function (e, t) {
                if (!xn(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return Yn.alloc(0);
                var n;
                if (void 0 === t)
                    for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
                var r = Yn.allocUnsafe(t),
                    o = 0;
                for (n = 0; n < e.length; ++n) {
                    var i = e[n];
                    if (!Xn(i)) throw new TypeError('"list" argument must be an Array of Buffers');
                    i.copy(r, o), o += i.length
                }
                return r
            }, Yn.byteLength = Jn, Yn.prototype._isBuffer = 1, Yn.prototype.swap16 = function () {
                var e = this.length;
                if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) Zn(this, t, t + 1);
                return this
            }, Yn.prototype.swap32 = function () {
                var e = this.length;
                if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) Zn(this, t, t + 3), Zn(this, t + 1, t + 2);
                return this
            }, Yn.prototype.swap64 = function () {
                var e = this.length;
                if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) Zn(this, t, t + 7), Zn(this, t + 1, t + 6), Zn(this, t + 2, t + 5), Zn(this, t + 3, t + 4);
                return this
            }, Yn.prototype.toString = function () {
                var e = 0 | this.length;
                return 0 === e ? "" : 0 === arguments.length ? ur(this, 0, e) : Qn.apply(this, arguments)
            }, Yn.prototype.equals = function (e) {
                if (!Xn(e)) throw new TypeError("Argument must be a Buffer");
                return this === e ? 1 : 0 === Yn.compare(this, e)
            }, Yn.prototype.inspect = function () {
                var e = "";
                return this.length > 0 && (e = this.toString("hex", 0, 50).match(/.{2}/g).join(" "), this.length > 50 && (e += " ... ")), "<Buffer " + e + ">"
            }, Yn.prototype.compare = function (e, t, n, r, o) {
                if (!Xn(e)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), t < 0 || n > e.length || r < 0 || o > this.length) throw new RangeError("out of range index");
                if (r >= o && t >= n) return 0;
                if (r >= o) return -1;
                if (t >= n) return 1;
                if (this === e) return 0;
                for (var i = (o >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (t >>>= 0), a = Math.min(i, s), u = this.slice(r, o), c = e.slice(t, n), l = 0; l < a; ++l)
                    if (u[l] !== c[l]) {
                        i = u[l], s = c[l];
                        break
                    } return i < s ? -1 : s < i ? 1 : 0
            }, Yn.prototype.includes = function (e, t, n) {
                return -1 !== this.indexOf(e, t, n)
            }, Yn.prototype.indexOf = function (e, t, n) {
                return $n(this, e, t, n, 1)
            }, Yn.prototype.lastIndexOf = function (e, t, n) {
                return $n(this, e, t, n, 0)
            }, Yn.prototype.write = function (e, t, n, r) {
                if (void 0 === t) r = "utf8", n = this.length, t = 0;
                else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;
                else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                }
                var o = this.length - t;
                if ((void 0 === n || n > o) && (n = o), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                for (var i = 0;;) switch (r) {
                    case "hex":
                        return tr(this, e, t, n);
                    case "utf8":
                    case "utf-8":
                        return nr(this, e, t, n);
                    case "ascii":
                        return rr(this, e, t, n);
                    case "latin1":
                    case "binary":
                        return or(this, e, t, n);
                    case "base64":
                        return ir(this, e, t, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return sr(this, e, t, n);
                    default:
                        if (i) throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(), i = 1
                }
            }, Yn.prototype.toJSON = function () {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var cr = 4096;

            function lr(e, t, n) {
                var r = "";
                n = Math.min(e.length, n);
                for (var o = t; o < n; ++o) r += String.fromCharCode(127 & e[o]);
                return r
            }

            function pr(e, t, n) {
                var r = "";
                n = Math.min(e.length, n);
                for (var o = t; o < n; ++o) r += String.fromCharCode(e[o]);
                return r
            }

            function hr(e, t, n) {
                var r = e.length;
                (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
                for (var o = "", i = t; i < n; ++i) o += Sr(e[i]);
                return o
            }

            function fr(e, t, n) {
                for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
                return o
            }

            function gr(e, t, n) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
            }

            function dr(e, t, n, r, o, i) {
                if (!Xn(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');
                if (n + r > e.length) throw new RangeError("Index out of range")
            }

            function _r(e, t, n, r) {
                t < 0 && (t = 65535 + t + 1);
                for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o) e[n + o] = (t & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o)
            }

            function mr(e, t, n, r) {
                t < 0 && (t = 4294967295 + t + 1);
                for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o) e[n + o] = t >>> 8 * (r ? o : 3 - o) & 255
            }

            function Er(e, t, n, r, o, i) {
                if (n + r > e.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("Index out of range")
            }

            function yr(e, t, n, r, o) {
                return o || Er(e, 0, n, 4), Fn(e, t, n, r, 23, 4), n + 4
            }

            function vr(e, t, n, r, o) {
                return o || Er(e, 0, n, 8), Fn(e, t, n, r, 52, 8), n + 8
            }
            Yn.prototype.slice = function (e, t) {
                var n, r = this.length;
                if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), Yn.TYPED_ARRAY_SUPPORT)(n = this.subarray(e, t)).__proto__ = Yn.prototype;
                else {
                    var o = t - e;
                    n = new Yn(o, void 0);
                    for (var i = 0; i < o; ++i) n[i] = this[i + e]
                }
                return n
            }, Yn.prototype.readUIntLE = function (e, t, n) {
                e |= 0, t |= 0, n || gr(e, t, this.length);
                for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) r += this[e + i] * o;
                return r
            }, Yn.prototype.readUIntBE = function (e, t, n) {
                e |= 0, t |= 0, n || gr(e, t, this.length);
                for (var r = this[e + --t], o = 1; t > 0 && (o *= 256);) r += this[e + --t] * o;
                return r
            }, Yn.prototype.readUInt8 = function (e, t) {
                return t || gr(e, 1, this.length), this[e]
            }, Yn.prototype.readUInt16LE = function (e, t) {
                return t || gr(e, 2, this.length), this[e] | this[e + 1] << 8
            }, Yn.prototype.readUInt16BE = function (e, t) {
                return t || gr(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, Yn.prototype.readUInt32LE = function (e, t) {
                return t || gr(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, Yn.prototype.readUInt32BE = function (e, t) {
                return t || gr(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, Yn.prototype.readIntLE = function (e, t, n) {
                e |= 0, t |= 0, n || gr(e, t, this.length);
                for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) r += this[e + i] * o;
                return r >= (o *= 128) && (r -= Math.pow(2, 8 * t)), r
            }, Yn.prototype.readIntBE = function (e, t, n) {
                e |= 0, t |= 0, n || gr(e, t, this.length);
                for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256);) i += this[e + --r] * o;
                return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i
            }, Yn.prototype.readInt8 = function (e, t) {
                return t || gr(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, Yn.prototype.readInt16LE = function (e, t) {
                t || gr(e, 2, this.length);
                var n = this[e] | this[e + 1] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, Yn.prototype.readInt16BE = function (e, t) {
                t || gr(e, 2, this.length);
                var n = this[e + 1] | this[e] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, Yn.prototype.readInt32LE = function (e, t) {
                return t || gr(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, Yn.prototype.readInt32BE = function (e, t) {
                return t || gr(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, Yn.prototype.readFloatLE = function (e, t) {
                return t || gr(e, 4, this.length), Un(this, e, 1, 23, 4)
            }, Yn.prototype.readFloatBE = function (e, t) {
                return t || gr(e, 4, this.length), Un(this, e, 0, 23, 4)
            }, Yn.prototype.readDoubleLE = function (e, t) {
                return t || gr(e, 8, this.length), Un(this, e, 1, 52, 8)
            }, Yn.prototype.readDoubleBE = function (e, t) {
                return t || gr(e, 8, this.length), Un(this, e, 0, 52, 8)
            }, Yn.prototype.writeUIntLE = function (e, t, n, r) {
                (e = +e, t |= 0, n |= 0, r) || dr(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                var o = 1,
                    i = 0;
                for (this[t] = 255 & e; ++i < n && (o *= 256);) this[t + i] = e / o & 255;
                return t + n
            }, Yn.prototype.writeUIntBE = function (e, t, n, r) {
                (e = +e, t |= 0, n |= 0, r) || dr(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                var o = n - 1,
                    i = 1;
                for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) this[t + o] = e / i & 255;
                return t + n
            }, Yn.prototype.writeUInt8 = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 1, 255, 0), Yn.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
            }, Yn.prototype.writeUInt16LE = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 2, 65535, 0), Yn.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : _r(this, e, t, 1), t + 2
            }, Yn.prototype.writeUInt16BE = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 2, 65535, 0), Yn.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : _r(this, e, t, 0), t + 2
            }, Yn.prototype.writeUInt32LE = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 4, 4294967295, 0), Yn.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : mr(this, e, t, 1), t + 4
            }, Yn.prototype.writeUInt32BE = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 4, 4294967295, 0), Yn.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : mr(this, e, t, 0), t + 4
            }, Yn.prototype.writeIntLE = function (e, t, n, r) {
                if (e = +e, t |= 0, !r) {
                    var o = Math.pow(2, 8 * n - 1);
                    dr(this, e, t, n, o - 1, -o)
                }
                var i = 0,
                    s = 1,
                    a = 0;
                for (this[t] = 255 & e; ++i < n && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;
                return t + n
            }, Yn.prototype.writeIntBE = function (e, t, n, r) {
                if (e = +e, t |= 0, !r) {
                    var o = Math.pow(2, 8 * n - 1);
                    dr(this, e, t, n, o - 1, -o)
                }
                var i = n - 1,
                    s = 1,
                    a = 0;
                for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;
                return t + n
            }, Yn.prototype.writeInt8 = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 1, 127, -128), Yn.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, Yn.prototype.writeInt16LE = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 2, 32767, -32768), Yn.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : _r(this, e, t, 1), t + 2
            }, Yn.prototype.writeInt16BE = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 2, 32767, -32768), Yn.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : _r(this, e, t, 0), t + 2
            }, Yn.prototype.writeInt32LE = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 4, 2147483647, -2147483648), Yn.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : mr(this, e, t, 1), t + 4
            }, Yn.prototype.writeInt32BE = function (e, t, n) {
                return e = +e, t |= 0, n || dr(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), Yn.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : mr(this, e, t, 0), t + 4
            }, Yn.prototype.writeFloatLE = function (e, t, n) {
                return yr(this, e, t, 1, n)
            }, Yn.prototype.writeFloatBE = function (e, t, n) {
                return yr(this, e, t, 0, n)
            }, Yn.prototype.writeDoubleLE = function (e, t, n) {
                return vr(this, e, t, 1, n)
            }, Yn.prototype.writeDoubleBE = function (e, t, n) {
                return vr(this, e, t, 0, n)
            }, Yn.prototype.copy = function (e, t, n, r) {
                if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                if (r < 0) throw new RangeError("sourceEnd out of bounds");
                r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
                var o, i = r - n;
                if (this === e && n < t && t < r)
                    for (o = i - 1; o >= 0; --o) e[o + t] = this[o + n];
                else if (i < 1e3 || !Yn.TYPED_ARRAY_SUPPORT)
                    for (o = 0; o < i; ++o) e[o + t] = this[o + n];
                else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);
                return i
            }, Yn.prototype.fill = function (e, t, n, r) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {
                        var o = e.charCodeAt(0);
                        o < 256 && (e = o)
                    }
                    if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                    if ("string" == typeof r && !Yn.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                } else "number" == typeof e && (e &= 255);
                if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
                if (n <= t) return this;
                var i;
                if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e)
                    for (i = t; i < n; ++i) this[i] = e;
                else {
                    var s = Xn(e) ? e : Tr(new Yn(e, r).toString()),
                        a = s.length;
                    for (i = 0; i < n - t; ++i) this[i + t] = s[i % a]
                }
                return this
            };
            var Ir = /[^+\/0-9A-Za-z-_]/g;

            function Sr(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function Tr(e, t) {
                var n;
                t = t || Infinity;
                for (var r = e.length, o = null, i = [], s = 0; s < r; ++s) {
                    if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {
                        if (!o) {
                            if (n > 56319) {
                                (t -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            if (s + 1 === r) {
                                (t -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            o = n;
                            continue
                        }
                        if (n < 56320) {
                            (t -= 3) > -1 && i.push(239, 191, 189), o = n;
                            continue
                        }
                        n = 65536 + (o - 55296 << 10 | n - 56320)
                    } else o && (t -= 3) > -1 && i.push(239, 191, 189);
                    if (o = null, n < 128) {
                        if ((t -= 1) < 0) break;
                        i.push(n)
                    } else if (n < 2048) {
                        if ((t -= 2) < 0) break;
                        i.push(n >> 6 | 192, 63 & n | 128)
                    } else if (n < 65536) {
                        if ((t -= 3) < 0) break;
                        i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                    } else {
                        if (!(n < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                    }
                }
                return i
            }

            function Cr(e) {
                return function (e) {
                    var t, n, r, o, i, s;
                    Gn || kn();
                    var a = e.length;
                    if (a % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    i = "=" === e[a - 2] ? 2 : "=" === e[a - 1] ? 1 : 0, s = new Pn(3 * a / 4 - i), r = i > 0 ? a - 4 : a;
                    var u = 0;
                    for (t = 0, n = 0; t < r; t += 4, n += 3) o = Rn[e.charCodeAt(t)] << 18 | Rn[e.charCodeAt(t + 1)] << 12 | Rn[e.charCodeAt(t + 2)] << 6 | Rn[e.charCodeAt(t + 3)], s[u++] = o >> 16 & 255, s[u++] = o >> 8 & 255, s[u++] = 255 & o;
                    return 2 === i ? (o = Rn[e.charCodeAt(t)] << 2 | Rn[e.charCodeAt(t + 1)] >> 4, s[u++] = 255 & o) : 1 === i && (o = Rn[e.charCodeAt(t)] << 10 | Rn[e.charCodeAt(t + 1)] << 4 | Rn[e.charCodeAt(t + 2)] >> 2, s[u++] = o >> 8 & 255, s[u++] = 255 & o), s
                }(function (e) {
                    if ((e = function (e) {
                            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                        }(e).replace(Ir, "")).length < 2) return "";
                    for (; e.length % 4 != 0;) e += "=";
                    return e
                }(e))
            }

            function Mr(e, t, n, r) {
                for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o) t[o + n] = e[o];
                return o
            }

            function Dr(e) {
                return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
            }
            var Ar = function (e) {
                    function t() {
                        var e;
                        return A(this, t), (e = F(this, G(t).call(this)))._request = e.promisify(wx.request), e
                    }
                    return P(t, Nn), O(t, [{
                        key: "request",
                        value: function (e) {
                            return this._checkOptions(e), this._initOptions(e), e = R({}, e, {
                                responseType: "text"
                            }), this._request(e).then(this._handleResolve).catch(this._handleReject)
                        }
                    }, {
                        key: "_handleResolve",
                        value: function (e) {
                            var t = e.data,
                                n = t.error_code,
                                r = t.ErrorCode;
                            return "number" == typeof n && (r = n), r !== it.REQUEST.SUCCESS && (e.data.ErrorCode = Number("".concat(r))), e
                        }
                    }, {
                        key: "_handleReject",
                        value: function (e) {
                            if (we(e.errMsg)) {
                                if (e.errMsg.includes("abort")) return lt({});
                                if (e.errMsg.includes("timeout")) return pt(new ae({
                                    code: ie.NETWORK_TIMEOUT,
                                    message: e.errMsg
                                }));
                                if (e.errMsg.includes("fail")) return pt(new ae({
                                    code: ie.NETWORK_ERROR,
                                    message: e.errMsg
                                }))
                            }
                            return pt(new ae(R({
                                code: ie.UNCAUGHT_ERROR,
                                message: e.message
                            }, e)))
                        }
                    }, {
                        key: "promisify",
                        value: function (e) {
                            return function (t) {
                                return new Promise(function (n, r) {
                                    var o = e(Object.assign({}, t, {
                                        success: n,
                                        fail: r
                                    }));
                                    t.updateAbort && t.updateAbort(function () {
                                        return o.abort()
                                    })
                                })
                            }
                        }
                    }]), t
                }(),
                Nr = function () {
                    function e() {
                        A(this, e), this.request = 0, this.success = 0, this.fail = 0, this.reportRate = 10, this.requestTimeCost = []
                    }
                    return O(e, [{
                        key: "report",
                        value: function () {
                            if (1 !== this.request) {
                                if (this.request % this.reportRate != 0) return null;
                                var e = this.avgRequestTime(),
                                    t = "runLoop reports: success=".concat(this.success, ",fail=").concat(this.fail, ",total=").concat(this.request, ",avg=").concat(e, ",cur=").concat(this.requestTimeCost[this.requestTimeCost.length - 1], ",max=").concat(Math.max.apply(null, this.requestTimeCost), ",min=").concat(Math.min.apply(null, this.requestTimeCost));
                                Ge.log(t)
                            }
                        }
                    }, {
                        key: "setRequestTime",
                        value: function (e, t) {
                            var n = Math.abs(t - e);
                            100 === this.requestTimeCost.length && this.requestTimeCost.shift(), this.requestTimeCost.push(n)
                        }
                    }, {
                        key: "avgRequestTime",
                        value: function () {
                            for (var e, t = this.requestTimeCost.length, n = 0, r = 0; r < t; r++) n += this.requestTimeCost[r];
                            return e = n / t, Math.round(100 * e) / 100
                        }
                    }]), e
                }(),
                Or = Dn.CancelToken,
                Lr = function () {
                    function e(t) {
                        A(this, e), this._initializeOptions(t), this._initializeMembers(), this.status = new Nr
                    }
                    return O(e, [{
                        key: "destructor",
                        value: function () {
                            clearTimeout(this._seedID);
                            var e = this._index();
                            for (var t in this) this[t] = null;
                            return e
                        }
                    }, {
                        key: "setIndex",
                        value: function (e) {
                            this._index = e
                        }
                    }, {
                        key: "getIndex",
                        value: function () {
                            return this._index
                        }
                    }, {
                        key: "isRunning",
                        value: function () {
                            return !this._stoped
                        }
                    }, {
                        key: "_initializeOptions",
                        value: function (e) {
                            this.options = e
                        }
                    }, {
                        key: "_initializeMembers",
                        value: function () {
                            this._index = -1, this._seedID = 0, this._requestStatus = 0, this._stoped = 0, this._intervalTime = 0, this._intervalIncreaseStep = 1e3, this._intervalDecreaseStep = 1e3, this._intervalTimeMax = 5e3, this._protectTimeout = 3e3, this._getNoticeSeq = this.options.getNoticeSeq, this._retryCount = 0, this._responseTime = Date.now(), this._responseTimeThreshold = 2e3, this.requestor = An, this.abort = null
                        }
                    }, {
                        key: "start",
                        value: function () {
                            0 == this._seedID ? (this._stoped = 0, this._send()) : Ge.log('XHRRunLoop.start(), XHRRunLoop is running now, if you want to restart runLoop , please run "stop()" first.')
                        }
                    }, {
                        key: "_reset",
                        value: function () {
                            Ge.log("XHRRunLoop._reset(), reset long poll _intervalTime", this._intervalTime), this.stop(), this.start()
                        }
                    }, {
                        key: "_intervalTimeIncrease",
                        value: function () {
                            this._intervalTime !== this._responseTimeThreshold && (this._intervalTime < this._responseTimeThreshold && (this._intervalTime += this._intervalIncreaseStep), this._intervalTime > this._responseTimeThreshold && (this._intervalTime = this._responseTimeThreshold))
                        }
                    }, {
                        key: "_intervalTimeDecrease",
                        value: function () {
                            0 !== this._intervalTime && (this._intervalTime > 0 && (this._intervalTime -= this._intervalDecreaseStep), this._intervalTime < 0 && (this._intervalTime = 0))
                        }
                    }, {
                        key: "_intervalTimeAdjustment",
                        value: function () {
                            var e = Date.now();
                            100 * Math.floor((e - this._responseTime) / 100) <= this._responseTimeThreshold ? this._intervalTimeIncrease() : this._intervalTimeDecrease(), this._responseTime = e
                        }
                    }, {
                        key: "_intervalTimeAdjustmentBaseOnResponseData",
                        value: function (e) {
                            e.ErrorCode === it.REQUEST.SUCCESS ? this._intervalTimeDecrease() : this._intervalTimeIncrease()
                        }
                    }, {
                        key: "_send",
                        value: function () {
                            var e = this;
                            if (1 != this._requestStatus) {
                                this._requestStatus = 1, this.status.request++, "function" == typeof this.options.before && this.options.before(this.options.pack.requestData);
                                var t = Date.now(),
                                    n = 0;
                                this.requestor.request({
                                    url: this.options.pack.getUrl(),
                                    data: this.options.pack.requestData,
                                    method: this.options.pack.method,
                                    cancelToken: new Or(function (t) {
                                        e.abort = t
                                    })
                                }).then(function (r) {
                                    if (e._intervalTimeAdjustmentBaseOnResponseData.bind(e)(r.data), e._retryCount > 0 && (e._retryCount = 0), e.status.success++, "function" == typeof e.options.success) try {
                                        e.options.success({
                                            pack: e.options.pack,
                                            error: 0,
                                            data: e.options.pack.callback(r.data)
                                        })
                                    } catch (o) {
                                        Ge.warn("XHRRunLoop._send(), success callback error:"), Ge.error(o)
                                    }
                                    e._requestStatus = 0, 0 == e._stoped && (e._seedID = setTimeout(e._send.bind(e), e._intervalTime)), n = Date.now(), e.status.setRequestTime(t, n), e.status.report()
                                }).catch(function (r) {
                                    if (e.status.fail++, e._retryCount++, e._intervalTimeAdjustment.bind(e)(), 0 == e._stoped && (e._seedID = setTimeout(e._send.bind(e), e._intervalTime)), e._requestStatus = 0, "function" == typeof e.options.fail && void 0 !== r.request) try {
                                        e.options.fail({
                                            pack: e.options.pack,
                                            error: r,
                                            data: 0
                                        })
                                    } catch (o) {
                                        Ge.warn("XHRRunLoop._send(), fail callback error:"), Ge.error(o)
                                    }
                                    n = Date.now(), e.status.setRequestTime(t, n), e.status.report()
                                })
                            }
                        }
                    }, {
                        key: "stop",
                        value: function () {
                            this._clearAllTimeOut(), this._stoped = 1
                        }
                    }, {
                        key: "_clearAllTimeOut",
                        value: function () {
                            clearTimeout(this._seedID), this._seedID = 0
                        }
                    }]), e
                }(),
                Rr = function () {
                    function e(t) {
                        A(this, e), this._initializeOptions(t), this._initializeMembers(), this.status = new Nr
                    }
                    return O(e, [{
                        key: "destructor",
                        value: function () {
                            clearTimeout(this._seedID);
                            var e = this._index();
                            for (var t in this) this[t] = null;
                            return e
                        }
                    }, {
                        key: "setIndex",
                        value: function (e) {
                            this._index = e
                        }
                    }, {
                        key: "isRunning",
                        value: function () {
                            return !this._stoped
                        }
                    }, {
                        key: "getIndex",
                        value: function () {
                            return this._index
                        }
                    }, {
                        key: "_initializeOptions",
                        value: function (e) {
                            this.options = e
                        }
                    }, {
                        key: "_initializeMembers",
                        value: function () {
                            this._index = -1, this._seedID = 0, this._requestStatus = 0, this._stoped = 0, this._intervalTime = 0, this._intervalIncreaseStep = 1e3, this._intervalDecreaseStep = 1e3, this._intervalTimeMax = 5e3, this._protectTimeout = 3e3, this._getNoticeSeq = this.options.getNoticeSeq, this._retryCount = 0, this._responseTime = Date.now(), this._responseTimeThreshold = 2e3, this.requestor = new Ar, this.abort = null
                        }
                    }, {
                        key: "start",
                        value: function () {
                            0 === this._seedID ? (this._stoped = 0, this._send()) : Ge.log('WXRunLoop.start(): WXRunLoop is running now, if you want to restart runLoop , please run "stop()" first.')
                        }
                    }, {
                        key: "_reset",
                        value: function () {
                            Ge.log("WXRunLoop.reset(), long poll _intervalMaxRate", this._intervalMaxRate), this.stop(), this.start()
                        }
                    }, {
                        key: "_intervalTimeIncrease",
                        value: function () {
                            this._intervalTime !== this._responseTimeThreshold && (this._intervalTime < this._responseTimeThreshold && (this._intervalTime += this._intervalIncreaseStep), this._intervalTime > this._responseTimeThreshold && (this._intervalTime = this._responseTimeThreshold))
                        }
                    }, {
                        key: "_intervalTimeDecrease",
                        value: function () {
                            0 !== this._intervalTime && (this._intervalTime > 0 && (this._intervalTime -= this._intervalDecreaseStep), this._intervalTime < 0 && (this._intervalTime = 0))
                        }
                    }, {
                        key: "_intervalTimeAdjustment",
                        value: function () {
                            var e = Date.now();
                            100 * Math.floor((e - this._responseTime) / 100) <= this._responseTimeThreshold ? this._intervalTimeIncrease() : this._intervalTimeDecrease(), this._responseTime = e
                        }
                    }, {
                        key: "_intervalTimeAdjustmentBaseOnResponseData",
                        value: function (e) {
                            e.ErrorCode === it.REQUEST.SUCCESS ? this._intervalTimeDecrease() : this._intervalTimeIncrease()
                        }
                    }, {
                        key: "_send",
                        value: function () {
                            var e = this;
                            if (1 != this._requestStatus) {
                                var t = this;
                                this._requestStatus = 1, this.status.request++, "function" == typeof this.options.before && this.options.before(t.options.pack.requestData);
                                var n = Date.now(),
                                    r = 0;
                                this.requestor.request({
                                    url: t.options.pack.getUrl(),
                                    data: t.options.pack.requestData,
                                    method: t.options.pack.method,
                                    updateAbort: function (t) {
                                        e.abort = t
                                    }
                                }).then(function (o) {
                                    if (t._intervalTimeAdjustmentBaseOnResponseData.bind(e)(o.data), t._retryCount > 0 && (t._retryCount = 0), e.status.success++, "function" == typeof t.options.success) try {
                                        e.options.success({
                                            pack: e.options.pack,
                                            error: 0,
                                            data: e.options.pack.callback(o.data)
                                        })
                                    } catch (i) {
                                        Ge.warn("WXRunLoop._send(),success callback error:"), Ge.error(i)
                                    }
                                    t._requestStatus = 0, 0 == t._stoped && (t._seedID = setTimeout(t._send.bind(t), t._intervalTime)), r = Date.now(), e.status.setRequestTime(n, r), e.status.report()
                                }).catch(function (o) {
                                    if (e.status.fail++, t._retryCount++, t._intervalTimeAdjustment.bind(e)(), 0 == t._stoped && (t._seedID = setTimeout(t._send.bind(t), t._intervalTime)), t._requestStatus = 0, "function" == typeof t.options.fail) try {
                                        e.options.fail({
                                            pack: e.options.pack,
                                            error: o,
                                            data: 0
                                        })
                                    } catch (i) {
                                        Ge.warn("WXRunLoop._send(), fail callback error:"), Ge.error(i)
                                    }
                                    r = Date.now(), e.status.setRequestTime(n, r), e.status.report()
                                })
                            }
                        }
                    }, {
                        key: "stop",
                        value: function () {
                            this._clearAllTimeOut(), this._stoped = 1
                        }
                    }, {
                        key: "_clearAllTimeOut",
                        value: function () {
                            clearTimeout(this._seedID), this._seedID = 0
                        }
                    }]), e
                }(),
                Pr = function (e) {
                    function t(e) {
                        var n;
                        return A(this, t), (n = F(this, G(t).call(this, e))).context = e.context, n.httpConnection = n._getHttpconnection(), n.keepAliveConnections = [], n
                    }
                    return P(t, nt), O(t, [{
                        key: "initializeListener",
                        value: function () {
                            this.tim.innerEmitter.on(_e.SIGN_LOGOUT_EXECUTING, this._stopAllRunLoop, this)
                        }
                    }, {
                        key: "request",
                        value: function (e) {
                            var t = {
                                url: e.url,
                                data: e.requestData,
                                method: e.method,
                                callback: e.callback
                            };
                            return this.httpConnection.request(t).then(function (t) {
                                return t.data = e.callback(t.data), t.data.errorCode !== it.REQUEST.SUCCESS ? pt(new ae({
                                    code: t.data.errorCode,
                                    message: t.data.errorInfo
                                })) : t
                            })
                        }
                    }, {
                        key: "createRunLoop",
                        value: function (e) {
                            var t = this.createKeepAliveConnection(e);
                            return t.setIndex(this.keepAliveConnections.push(t) - 1), t
                        }
                    }, {
                        key: "stopRunLoop",
                        value: function (e) {
                            e.stop()
                        }
                    }, {
                        key: "_stopAllRunLoop",
                        value: function () {
                            for (var e = this.keepAliveConnections.length, t = 0; t < e; t++) this.keepAliveConnections[t].stop()
                        }
                    }, {
                        key: "destroyRunLoop",
                        value: function (e) {
                            e.stop();
                            var t = e.destructor();
                            this.keepAliveConnections.slice(t, 1)
                        }
                    }, {
                        key: "startRunLoopExclusive",
                        value: function (e) {
                            for (var t = e.getIndex(), n = 0; n < this.keepAliveConnections.length; n++) n != t && this.keepAliveConnections[n].stop();
                            e.start()
                        }
                    }, {
                        key: "_getHttpconnection",
                        value: function () {
                            return Ee ? new Ar : new On
                        }
                    }, {
                        key: "createKeepAliveConnection",
                        value: function (e) {
                            return Ee ? new Rr(e) : this.tim.options.runLoopNetType === E.XHR ? new Lr(e) : (this.tim.options.runLoopNetType, "function" == typeof window.WebSocket && window.WebSocket.prototype.send, new Lr(e))
                        }
                    }, {
                        key: "clearAll",
                        value: function () {
                            this.conn.cancelAll()
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this.keepAliveConnections = []
                        }
                    }]), t
                }(),
                Gr = "https://cloud.tencent.com/document/product/269/1671";
            void 0 === console.table && (console.table = console.log);
            var kr = {
                    "-1": "Unknow error level",
                    1: "Note",
                    2: "Warn",
                    3: "Error",
                    4: "Fatal error"
                },
                wr = function (e, t) {
                    var n = kr[e.level];
                    Ge.warn("".concat(n, " - Code: [").concat(e.code, "]; message: ").concat(e.message)), Ge.warn("Stack\n", e.stack);
                    var r = [e.tips || "", "\n", t].join("");
                    0 == !!r && (r = 0), r && Ge.log("About IMError ".concat(e.code, ": ").concat(r))
                },
                br = {
                    f9999998: function (e) {
                        wr(e)
                    },
                    f9999999: function (e) {
                        wr(e, "在errorCode.js文件中为此错误创建一个错误码")
                    },
                    f: function (e) {
                        wr(e), "未定义的错误:".concat(e.code, " , ").concat(e.message)
                    },
                    f20000: function (e) {
                        wr(e)
                    },
                    f20001: function (e) {
                        wr(e)
                    },
                    f20002: function (e) {
                        wr(e)
                    },
                    f30000: function (e) {
                        wr(e)
                    },
                    f40004: function (e) {
                        wr(e, "new Controller(TIMSDK instance)")
                    },
                    f40005: function (e) {
                        wr(e)
                    },
                    f40006: function (e) {
                        wr(e)
                    },
                    f40007: function (e) {
                        wr(e)
                    },
                    f40008: function (e) {
                        wr(e)
                    },
                    f50070003: function (e) {
                        var t = e.code.replace("500", "");
                        wr(e, "Information about error code [".concat(t, "] : ").concat(Gr))
                    },
                    f50030001: function (e) {
                        wr(e)
                    },
                    f50070221: function (e) {
                        wr(e)
                    }
                };
            br.echo = wr;
            var Ur = function () {
                    function t(e) {
                        A(this, t), this.methods = br, this.tim = e, this._initielizeListener()
                    }
                    return O(t, [{
                        key: "_initielizeListener",
                        value: function () {
                            this.tim.innerEmitter.on(_e.ERROR_DETECTED, this._onErrorDetected, this)
                        }
                    }, {
                        key: "ask",
                        value: function (e) {
                            var t = ["f", e.code].join(""),
                                n = br.echo;
                            this.methods.hasOwnProperty(t) ? this.methods[t](e) : n(e)
                        }
                    }, {
                        key: "_onErrorDetected",
                        value: function (t) {
                            this.ask(t), this.tim.outerEmitter.emit(e.ERROR, t)
                        }
                    }]), t
                }(),
                Fr = ["jpg", "jpeg", "gif", "png"],
                qr = function () {
                    function e(t) {
                        A(this, e), W(t) || (this.userID = t.userID || "", this.nick = t.nick || "", this.gender = t.gender || "", this.birthday = t.birthday || 0, this.location = t.location || "", this.selfSignature = t.selfSignature || "", this.allowType = t.allowType || M.ALLOW_TYPE_ALLOW_ANY, this.language = t.language || 0, this.avatar = t.avatar || "", this.messageSettings = t.messageSettings || 0, this.adminForbidType = t.adminForbidType || M.FORBID_TYPE_NONE, this.level = t.level || 0, this.role = t.role || 0, this.lastUpdatedTime = 0)
                    }
                    return O(e, [{
                        key: "validate",
                        value: function (e) {
                            var t = 1,
                                n = "";
                            for (var r in W(e) && (t = 0, n = "empty options"), e)
                                if (!W(e[r]) || we(e[r]) || ke(e[r])) switch (r) {
                                    case "nick":
                                        we(e[r]) || (n = "nick should be a string", t = 0), Ye(e[r]) > 500 && (n = "nick name limited: must less than or equal to ".concat(500, " bytes, current size: ").concat(Ye(e[r]), " bytes"), t = 0);
                                        break;
                                    case "gender":
                                        Ve(I, e.gender) || (n = "key:gender, invalid value:" + e.gender, t = 0);
                                        break;
                                    case "birthday":
                                        ke(e.birthday) || (n = "birthday should be a number", t = 0);
                                        break;
                                    case "location":
                                        we(e.location) || (n = "location should be a string", t = 0);
                                        break;
                                    case "selfSignature":
                                        we(e.selfSignature) || (n = "selfSignature should be a string", t = 0);
                                        break;
                                    case "allowType":
                                        Ve(S, e.allowType) || (n = "key:allowType, invalid value:" + e.allowType, t = 0);
                                        break;
                                    case "language":
                                        ke(e.language) || (n = "language should be a number", t = 0);
                                        break;
                                    case "avatar":
                                        we(e.avatar) || (n = "avatar should be a string", t = 0);
                                        break;
                                    case "messageSettings":
                                        0 !== e.messageSettings && 1 !== e.messageSettings && (n = "messageSettings should be 0 or 1", t = 0);
                                        break;
                                    case "adminForbidType":
                                        Ve(T, e.adminForbidType) || (n = "key:adminForbidType, invalid value:" + e.adminForbidType, t = 0);
                                        break;
                                    case "level":
                                        ke(e.level) || (n = "level should be a number", t = 0);
                                        break;
                                    case "role":
                                        ke(e.role) || (n = "role should be a number", t = 0);
                                        break;
                                    default:
                                        n = "unknown key:" + r, t = 0
                                } else n = "key:" + r + ", invalid value:" + e[r], t = 0;
                            return {
                                valid: t,
                                tips: n
                            }
                        }
                    }]), e
                }(),
                xr = function () {
                    function t(e) {
                        A(this, t), this.uc = e, this.TAG = "profile", this.Actions = {
                            Q: "query",
                            U: "update"
                        }, this.accountProfileMap = new Map, this.expirationTime = 864e5
                    }
                    return O(t, [{
                        key: "setExpirationTime",
                        value: function (e) {
                            this.expirationTime = e
                        }
                    }, {
                        key: "getUserProfile",
                        value: function (t) {
                            var n = this,
                                r = this.uc.tim,
                                o = r.connectionController,
                                i = r.outerEmitter,
                                s = t.userIDList;
                            if (!Ue(s)) return Ge.error("ProfileHandler.getUserProfile options.userIDList 必需是数组"), pt({
                                code: ie.GET_PROFILE_INVALID_PARAM,
                                message: se.GET_PROFILE_INVALID_PARAM
                            });
                            t.fromAccount = this.uc.getMyAccount(), s.length > 100 && (Ge.warn("ProfileHandler.getUserProfile 获取用户资料人数不能超过100人"), s.length = 100);
                            for (var a, u = [], c = [], l = 0, p = s.length; l < p; l++) a = s[l], this.uc.isMyFriend(a) && this._containsAccount(a) ? c.push(this._getProfileFromMap(a)) : u.push(a);
                            if (0 == u.length) return i.emit(e.PROFILE_GET_SUCCESS, c), lt(c);
                            t.toAccount = u;
                            var h = t.bFromGetMyProfile || 0,
                                f = this.uc.makeCapsule(this.TAG, this.Actions.Q, t);
                            return o.request(f).then(function (t) {
                                Ge.info("ProfileHandler.getUserProfile ok");
                                var r = n._handleResponse(t).concat(c);
                                return i.emit(e.PROFILE_GET_SUCCESS, r), h ? (n.uc.onGotMyProfile(), new at(r[0])) : new at(r)
                            }).catch(function (e) {
                                return Ge.error("ProfileHandler.getUserProfile error:", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "getMyProfile",
                        value: function () {
                            var t = this.uc.getMyAccount();
                            if (Ge.log("ProfileHandler.getMyProfile myAccount=" + t), this._fillMap(), this._containsAccount(t)) {
                                var n = this._getProfileFromMap(t);
                                return Ge.debug("ProfileHandler.getMyProfile from cache, myProfile:" + JSON.stringify(n)), this.uc.tim.outerEmitter.emit(e.PROFILE_GET_SUCCESS, [n]), this.uc.onGotMyProfile(), lt(n)
                            }
                            return this.getUserProfile({
                                fromAccount: t,
                                userIDList: [t],
                                bFromGetMyProfile: 1
                            })
                        }
                    }, {
                        key: "_handleResponse",
                        value: function (e) {
                            for (var t, n, r = He.now(), o = e.data.userProfileItem, i = [], s = 0, a = o.length; s < a; s++) "@TLS#NOT_FOUND" != o[s].to && "" != o[s].to && (t = o[s].to, n = this._updateMap(t, this._getLatestProfileFromResponse(t, o[s].profileItem)), i.push(n));
                            return Ge.log("ProfileHandler._handleResponse cost " + (He.now() - r) + " ms"), i
                        }
                    }, {
                        key: "_getLatestProfileFromResponse",
                        value: function (e, t) {
                            var n = {};
                            if (n.userID = e, !W(t))
                                for (var r = 0, o = t.length; r < o; r++) switch (t[r].tag) {
                                    case C.NICK:
                                        n.nick = t[r].value;
                                        break;
                                    case C.GENDER:
                                        n.gender = t[r].value;
                                        break;
                                    case C.BIRTHDAY:
                                        n.birthday = t[r].value;
                                        break;
                                    case C.LOCATION:
                                        n.location = t[r].value;
                                        break;
                                    case C.SELFSIGNATURE:
                                        n.selfSignature = t[r].value;
                                        break;
                                    case C.ALLOWTYPE:
                                        n.allowType = t[r].value;
                                        break;
                                    case C.LANGUAGE:
                                        n.language = t[r].value;
                                        break;
                                    case C.AVATAR:
                                        n.avatar = t[r].value;
                                        break;
                                    case C.MESSAGESETTINGS:
                                        n.messageSettings = t[r].value;
                                        break;
                                    case C.ADMINFORBIDTYPE:
                                        n.adminForbidType = t[r].value;
                                        break;
                                    case C.LEVEL:
                                        n.level = t[r].value;
                                        break;
                                    case C.ROLE:
                                        n.role = t[r].value;
                                        break;
                                    default:
                                        Ge.warn("ProfileHandler._handleResponse unkown tag->", t[r].tag)
                                }
                            return n
                        }
                    }, {
                        key: "updateMyProfile",
                        value: function (t) {
                            var n = this,
                                r = this.uc.tim,
                                o = r.connectionController,
                                i = r.outerEmitter,
                                s = (new qr).validate(t);
                            if (!s.valid) return Ge.error("ProfileHandler.updateMyProfile info:" + s.tips), pt({
                                code: ie.UPDATE_PROFILE_INVALID_PARAM,
                                message: se.UPDATE_PROFILE_INVALID_PARAM
                            });
                            var a = [];
                            for (var u in t) a.push({
                                tag: C[u.toUpperCase()],
                                value: t[u]
                            });
                            var c = this.uc.makeCapsule(this.TAG, this.Actions.U, {
                                fromAccount: this.uc.getMyAccount(),
                                profileItem: a
                            });
                            return o.request(c).then(function (r) {
                                Ge.info("ProfileHandler.updateMyProfile ok");
                                var o = n._updateMap(n.uc.getMyAccount(), t);
                                return i.emit(e.PROFILE_UPDATED, [o]), lt(o)
                            }).catch(function (e) {
                                return Ge.error("ProfileHandler.updateMyProfile error:", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "onProfileModified",
                        value: function (t) {
                            var n = t.data;
                            if (!W(n)) {
                                var r, o, i = n.length;
                                Ge.info("ProfileHandler.onProfileModified length=" + i);
                                for (var s = [], a = 0; a < i; a++) r = n[a].userID, o = this._updateMap(r, this._getLatestProfileFromResponse(r, n[a].profileList)), s.push(o);
                                var u = this.uc.tim,
                                    c = u.innerEmitter,
                                    l = u.outerEmitter;
                                c.emit(_e.PROFILE_UPDATED, {
                                    data: s
                                }), l.emit(e.PROFILE_UPDATED, s)
                            }
                        }
                    }, {
                        key: "_fillMap",
                        value: function () {
                            if (0 == this.accountProfileMap.size) {
                                for (var e = this._getCachedProfiles(), t = Date.now(), n = 0, r = e.length; n < r; n++) t - e[n].lastUpdatedTime < this.expirationTime && this.accountProfileMap.set(e[n].userID, e[n]);
                                Ge.log("ProfileHandler._fillMap from chache, map.size=" + this.accountProfileMap.size)
                            }
                        }
                    }, {
                        key: "_updateMap",
                        value: function (e, t) {
                            var n, r = Date.now();
                            return this._containsAccount(e) ? (n = this._getProfileFromMap(e), Ke(n, t), n.lastUpdatedTime = r) : (n = new qr(t), (this.uc.isMyFriend(e) || e == this.uc.getMyAccount()) && (n.lastUpdatedTime = r, this.accountProfileMap.set(e, n))), this._flushMap(), n
                        }
                    }, {
                        key: "_flushMap",
                        value: function () {
                            this._cacheProfiles(x(this.accountProfileMap.values()))
                        }
                    }, {
                        key: "_containsAccount",
                        value: function (e) {
                            return this.accountProfileMap.has(e)
                        }
                    }, {
                        key: "_getProfileFromMap",
                        value: function (e) {
                            return this.accountProfileMap.get(e)
                        }
                    }, {
                        key: "_getCachedProfiles",
                        value: function () {
                            var e = this.uc.tim.storage.getItem(this.TAG);
                            return W(e) ? [] : e
                        }
                    }, {
                        key: "_cacheProfiles",
                        value: function (e) {
                            var t = this.uc.tim.storage;
                            Ge.debug("ProfileHandler._cacheProfiles length=" + e.length), t.setItem(this.TAG, e)
                        }
                    }, {
                        key: "onConversationsProfileUpdated",
                        value: function (e) {
                            for (var t, n, r, o = [], i = 0, s = e.length; i < s; i++) n = (t = e[i]).userID, this._containsAccount(n) ? (r = this._getProfileFromMap(n), Ke(r, t) > 0 && o.push(n)) : o.push(t.userID);
                            0 != o.length && (Ge.info("ProfileHandler.onConversationsProfileUpdated toAccount:", o), this.getUserProfile({
                                userIDList: o
                            }))
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this._flushMap(), this.accountProfileMap.clear()
                        }
                    }]), t
                }(),
                Hr = function () {
                    function e(t) {
                        A(this, e), this.options = t ? t.options : {
                            enablePointer: 1
                        }, this.pointsList = {}, this.reportText = {}, this.maxNameLen = 0, this.gapChar = "-", this.log = console.log, this.currentTask = ""
                    }
                    return O(e, [{
                        key: "newTask",
                        value: function (e) {
                            0 != this.options.enablePointer && (e || (e = ["task", this._timeFormat()].join("-")), this.pointsList[e] = [], this.currentTask = e, console.log("Pointer new Task : ".concat(this.currentTask)))
                        }
                    }, {
                        key: "deleteTask",
                        value: function (e) {
                            0 != this.options.enablePointer && (e || (e = this.currentTask), this.pointsList[e].length = 0, delete this.pointsList[e])
                        }
                    }, {
                        key: "dot",
                        value: function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                                t = arguments.length > 1 ? arguments[1] : void 0;
                            if (0 != this.options.enablePointer) {
                                t = t || this.currentTask;
                                var n = +new Date;
                                this.maxNameLen = this.maxNameLen < e.length ? e.length : this.maxNameLen, this.flen = this.maxNameLen + 10, this.pointsList[t].push({
                                    pointerName: e,
                                    time: n
                                })
                            }
                        }
                    }, {
                        key: "_analisys",
                        value: function (e) {
                            if (0 != this.options.enablePointer) {
                                e = e || this.currentTask;
                                for (var t = this.pointsList[e], n = t.length, r = [], o = [], i = 0; i < n; i++) 0 !== i && (o = this._analisysTowPoints(t[i - 1], t[i]), r.push(o.join("")));
                                return o = this._analisysTowPoints(t[0], t[n - 1], 1), r.push(o.join("")), r.join("")
                            }
                        }
                    }, {
                        key: "_analisysTowPoints",
                        value: function (e, t) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                            if (0 != this.options.enablePointer) {
                                var r = this.flen,
                                    o = t.time - e.time,
                                    i = o.toString(),
                                    s = e.pointerName + this.gapChar.repeat(r - e.pointerName.length),
                                    a = t.pointerName + this.gapChar.repeat(r - t.pointerName.length),
                                    u = this.gapChar.repeat(4 - i.length) + i,
                                    c = n ? ["%c", s, a, u, "ms\n%c"] : [s, a, u, "ms\n"];
                                return c
                            }
                        }
                    }, {
                        key: "report",
                        value: function (e) {
                            if (0 != this.options.enablePointer) {
                                e = e || this.currentTask;
                                var t = this._analisys(e);
                                this.pointsList = [];
                                var n = this._timeFormat(),
                                    r = "Pointer[".concat(e, "(").concat(n, ")]"),
                                    o = 4 * this.maxNameLen,
                                    i = (o - r.length) / 2;
                                console.log(["-".repeat(i), r, "-".repeat(i)].join("")), console.log("%c" + t, "color:#66a", "color:red", "color:#66a"), console.log("-".repeat(o))
                            }
                        }
                    }, {
                        key: "_timeFormat",
                        value: function () {
                            var e = new Date,
                                t = this.zeroFix(e.getMonth() + 1, 2),
                                n = this.zeroFix(e.getDate(), 2);
                            return "".concat(t, "-").concat(n, " ").concat(e.getHours(), ":").concat(e.getSeconds(), ":").concat(e.getMinutes(), "~").concat(e.getMilliseconds())
                        }
                    }, {
                        key: "zeroFix",
                        value: function (e, t) {
                            return ("000000000" + e).slice(-t)
                        }
                    }, {
                        key: "reportAll",
                        value: function () {
                            if (0 != this.options.enablePointer)
                                for (var e in this.pointsList) this.eport(e)
                        }
                    }]), e
                }(),
                Kr = function e(t, n) {
                    A(this, e), this.userID = t;
                    var r = {};
                    if (r.userID = t, !W(n))
                        for (var o = 0, i = n.length; o < i; o++) switch (n[o].tag) {
                            case C.NICK:
                                r.nick = n[o].value;
                                break;
                            case C.GENDER:
                                r.gender = n[o].value;
                                break;
                            case C.BIRTHDAY:
                                r.birthday = n[o].value;
                                break;
                            case C.LOCATION:
                                r.location = n[o].value;
                                break;
                            case C.SELFSIGNATURE:
                                r.selfSignature = n[o].value;
                                break;
                            case C.ALLOWTYPE:
                                r.allowType = n[o].value;
                                break;
                            case C.LANGUAGE:
                                r.language = n[o].value;
                                break;
                            case C.AVATAR:
                                r.avatar = n[o].value;
                                break;
                            case C.MESSAGESETTINGS:
                                r.messageSettings = n[o].value;
                                break;
                            case C.ADMINFORBIDTYPE:
                                r.adminForbidType = n[o].value;
                                break;
                            case C.LEVEL:
                                r.level = n[o].value;
                                break;
                            case C.ROLE:
                                r.role = n[o].value;
                                break;
                            default:
                                Ge.warn("snsProfileItem unkown tag->", n[o].tag)
                        }
                    this.profile = new qr(r)
                },
                Yr = function () {
                    function t(e) {
                        A(this, t), this.uc = e, this.TAG = "friend", this.Actions = {
                            G: "get",
                            D: "delete"
                        }, this.friends = new Map, this.pointer = new Hr
                    }
                    return O(t, [{
                        key: "isMyFriend",
                        value: function (e) {
                            var t = this.friends.has(e);
                            return t || Ge.debug("FriendHandler.isMyFriend " + e + " is not my friend"), t
                        }
                    }, {
                        key: "_transformFriendList",
                        value: function (e) {
                            if (!W(e) && !W(e.infoItem)) {
                                Ge.info("FriendHandler._transformFriendList friendNum=" + e.friendNum);
                                for (var t, n, r = e.infoItem, o = 0, i = r.length; o < i; o++) n = r[o].infoAccount, t = new Kr(n, r[o].snsProfileItem), this.friends.set(n, t)
                            }
                        }
                    }, {
                        key: "_friends2map",
                        value: function (e) {
                            var t = new Map;
                            for (var n in e) t.set(n, e[n]);
                            return t
                        }
                    }, {
                        key: "getFriendList",
                        value: function () {
                            var t = this,
                                n = this.uc.tim,
                                r = n.connectionController,
                                o = n.outerEmitter,
                                i = {};
                            i.fromAccount = this.uc.getMyAccount(), Ge.info("FriendHandler.getFriendList myAccount=" + i.fromAccount);
                            var s = this.uc.makeCapsule(this.TAG, this.Actions.G, i);
                            return r.request(s).then(function (n) {
                                Ge.info("FriendHandler.getFriendList ok"), t._transformFriendList(n.data);
                                var r = x(t.friends.values());
                                return o.emit(e.FRIENDLIST_GET_SUCCESS, r), lt(r)
                            }).catch(function (e) {
                                return Ge.error("FriendHandler.getFriendList error:", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "deleteFriend",
                        value: function (t) {
                            if (!Array.isArray(t.toAccount)) return Ge.error("FriendHandler.deleteFriend options.toAccount 必需是数组"), pt({
                                code: ie.DEL_FRIEND_INVALID_PARAM,
                                message: se.DEL_FRIEND_INVALID_PARAM
                            });
                            t.toAccount.length > 1e3 && (Ge.warn("FriendHandler.deleteFriend 删除好友人数不能超过1000人"), t.toAccount.length = 1e3);
                            var n = this.uc.tim,
                                r = n.connectionController,
                                o = n.outerEmitter,
                                i = this.uc.makeCapsule(this.TAG, this.Actions.D, t);
                            return r.request(i).then(function (t) {
                                return Ge.info("FriendHandler.deleteFriend ok"), o.emit(e.FRIEND_DELETE_SUCCESS), lt()
                            }).catch(function (e) {
                                return Ge.error("FriendHandler.deleteFriend error:", e), pt(e, 1)
                            })
                        }
                    }]), t
                }(),
                Br = function e(t) {
                    A(this, e), W || (this.userID = t.userID || "", this.timeStamp = t.timeStamp || 0)
                },
                Vr = function () {
                    function t(e) {
                        A(this, t), this.uc = e, this.TAG = "blacklist", this.Actions = {
                            G: "get",
                            C: "create",
                            D: "delete"
                        }, this.blacklistMap = new Map, this.startIndex = 0, this.maxLimited = 100, this.curruentSequence = 0
                    }
                    return O(t, [{
                        key: "getBlacklist",
                        value: function () {
                            var e = this,
                                t = this.uc.tim.connectionController,
                                n = {};
                            n.fromAccount = this.uc.getMyAccount(), n.maxLimited = this.maxLimited, n.startIndex = 0, n.lastSequence = this.curruentSequence;
                            var r = this.uc.makeCapsule(this.TAG, this.Actions.G, n);
                            return t.request(r).then(function (t) {
                                return Ge.info("BlacklistHandler.getBlacklist ok"), e.curruentSequence = t.data.curruentSequence, e._handleResponse(t.data.blackListItem, 1), e._onBlacklistUpdated()
                            }).catch(function (e) {
                                return Ge.error("BlacklistHandler.getBlacklist error:", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "addBlacklist",
                        value: function (e) {
                            var t = this;
                            if (!Ue(e.userIDList)) return Ge.error("BlacklistHandler.addBlacklist options.userIDList 必需是数组"), pt({
                                code: ie.ADD_BLACKLIST_INVALID_PARAM,
                                message: se.ADD_BLACKLIST_INVALID_PARAM
                            });
                            var n = this.uc.tim.loginInfo.identifier;
                            if (1 === e.userIDList.length && e.userIDList[0] === n) return Ge.error("BlacklistHandler.addBlacklist 不能把自己拉黑"), pt({
                                code: ie.CANNOT_ADD_SELF_TO_BLACKLIST,
                                message: se.CANNOT_ADD_SELF_TO_BLACKLIST
                            });
                            e.userIDList.includes(n) && (e.userIDList = e.userIDList.filter(function (e) {
                                return e !== n
                            }), Ge.warn("BlacklistHandler.addBlacklist 不能把自己拉黑，已过滤"));
                            var r = this.uc.tim.connectionController;
                            e.fromAccount = this.uc.getMyAccount(), e.toAccount = e.userIDList;
                            var o = this.uc.makeCapsule(this.TAG, this.Actions.C, e);
                            return r.request(o).then(function (e) {
                                return Ge.info("BlacklistHandler.addBlacklist ok"), t._handleResponse(e.data.resultItem, 1), t._onBlacklistUpdated()
                            }).catch(function (e) {
                                return Ge.error("BlacklistHandler.addBlacklist error:", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "_handleResponse",
                        value: function (e, t) {
                            if (!W(e))
                                for (var n, r, o, i = 0, s = e.length; i < s; i++) r = e[i].to, o = e[i].resultCode, (Fe(o) || 0 == o) && (t ? ((n = this.blacklistMap.has(r) ? this.blacklistMap.get(r) : new Br).userID = r, !W(e[i].addBlackTimeStamp) && (n.timeStamp = e[i].addBlackTimeStamp), this.blacklistMap.set(r, n)) : this.blacklistMap.has(r) && (n = this.blacklistMap.get(r), this.blacklistMap.delete(r)));
                            Ge.log("BlacklistHandler._handleResponse total=" + this.blacklistMap.size + " bAdd=" + t)
                        }
                    }, {
                        key: "deleteBlacklist",
                        value: function (e) {
                            var t = this;
                            if (!Ue(e.userIDList)) return Ge.error("BlacklistHandler.deleteBlacklist options.userIDList 必需是数组"), pt({
                                code: ie.DEL_BLACKLIST_INVALID_PARAM,
                                message: se.DEL_BLACKLIST_INVALID_PARAM
                            });
                            var n = this.uc.tim.connectionController;
                            e.fromAccount = this.uc.getMyAccount(), e.toAccount = e.userIDList;
                            var r = this.uc.makeCapsule(this.TAG, this.Actions.D, e);
                            return n.request(r).then(function (e) {
                                return Ge.info("BlacklistHandler.deleteBlacklist ok"), t._handleResponse(e.data.resultItem, 0), t._onBlacklistUpdated()
                            }).catch(function (e) {
                                return Ge.error("BlacklistHandler.deleteBlacklist error:", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "_onBlacklistUpdated",
                        value: function () {
                            var t = this.uc.tim.outerEmitter,
                                n = x(this.blacklistMap.keys());
                            return t.emit(e.BLACKLIST_UPDATED, n), lt(n)
                        }
                    }, {
                        key: "handleBlackListDelAccount",
                        value: function (t) {
                            for (var n, r = [], o = 0, i = t.length; o < i; o++) n = t[o], this.blacklistMap.has(n) && (this.blacklistMap.delete(n), r.push(n));
                            r.length > 0 && (Ge.log("BlacklistHandler.handleBlackListDelAccount delCount=" + r.length + " : " + r.join(",")), this.tim.outerEmitter.emit(e.BLACKLIST_UPDATED, x(this.blacklistMap.keys())))
                        }
                    }, {
                        key: "handleBlackListAddAccount",
                        value: function (t) {
                            for (var n, r = [], o = 0, i = t.length; o < i; o++) n = t[o], this.blacklistMap.has(n) || (this.blacklistMap.set(n, new Br({
                                userID: n
                            })), r.push(n));
                            r.length > 0 && (Ge.log("BlacklistHandler.handleBlackListAddAccount addCount=" + r.length + " : " + r.join(",")), this.tim.outerEmitter.emit(e.BLACKLIST_UPDATED, x(this.blacklistMap.keys())))
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this.blacklistMap.clear(), this.startIndex = 0, this.maxLimited = 100, this.curruentSequence = 0
                        }
                    }]), t
                }(),
                jr = function () {
                    function t(e) {
                        A(this, t), this.uc = e, this.TAG = "applyC2C", this.Actions = {
                            C: "create",
                            G: "get",
                            D: "delete",
                            U: "update"
                        }
                    }
                    return O(t, [{
                        key: "applyAddFriend",
                        value: function (t) {
                            var n = this,
                                r = this.uc.tim,
                                o = r.outerEmitter,
                                i = r.connectionController,
                                s = this.uc.makeCapsule(this.TAG, this.Actions.C, t),
                                a = i.request(s);
                            return a.then(function (t) {
                                n.uc.isActionSuccessful("applyAddFriend", n.Actions.C, t) ? o.emit(e.APPLY_ADD_FRIEND_SUCCESS, {
                                    data: t.data
                                }) : o.emit(e.APPLY_ADD_FRIEND_FAIL, {
                                    data: t.data
                                })
                            }).catch(function (t) {
                                o.emit(e.APPLY_ADD_FRIEND_FAIL, {
                                    data: t
                                })
                            }), a
                        }
                    }, {
                        key: "getPendency",
                        value: function (t) {
                            var n = this,
                                r = this.tim,
                                o = r.connectionController,
                                i = r.outerEmitter,
                                s = this.uc.makeCapsule(this.TAG, this.Actions.G, t),
                                a = o.request(s);
                            return a.then(function (t) {
                                n.uc.isActionSuccessful("getPendency", n.Actions.G, t) ? i.emit(e.GET_PENDENCY_SUCCESS, {
                                    data: t.data
                                }) : i.emit(e.GET_PENDENCY_FAIL, {
                                    data: t.data
                                })
                            }).catch(function (t) {
                                i.emit(e.GET_PENDENCY_FAIL, {
                                    data: t
                                })
                            }), a
                        }
                    }, {
                        key: "deletePendency",
                        value: function (t) {
                            var n = this,
                                r = this.tim,
                                o = r.connectionController,
                                i = r.outerEmitter,
                                s = this.uc.makeCapsule(this.TAG, this.Actions.D, t),
                                a = o.request(s);
                            return a.then(function (t) {
                                n.uc.isActionSuccessful("deletePendency", n.Actions.D, t) ? i.emit(e.DELETE_PENDENCY_SUCCESS, {
                                    data: t.data
                                }) : i.emit(e.DELETE_PENDENCY_FAIL, {
                                    data: t.data
                                })
                            }).catch(function (t) {
                                i.emit(e.DELETE_PENDENCY_FAIL, {
                                    data: t
                                })
                            }), a
                        }
                    }, {
                        key: "replyPendency",
                        value: function () {
                            var t = this,
                                n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                r = this.tim,
                                o = r.connectionController,
                                i = r.outerEmitter,
                                s = this.uc.makeCapsule(this.TAG, this.Actions.U, n),
                                a = o.request(s);
                            return a.then(function (n) {
                                t.uc.isActionSuccessful("replyPendency", t.Actions.U, n) ? i.emit(e.REPLY_PENDENCY_SUCCESS, {
                                    data: n.data
                                }) : i.emit(e.REPLY_PENDENCY_FAIL, {
                                    data: n.data
                                })
                            }).catch(function (t) {
                                i.emit(e.REPLY_PENDENCY_FAIL, {
                                    data: t
                                })
                            }), a
                        }
                    }]), t
                }(),
                Wr = function (e) {
                    function t(e) {
                        var n;
                        return A(this, t), (n = F(this, G(t).call(this, e))).profileHandler = new xr(U(n)), n.friendHandler = new Yr(U(n)), n.blacklistHandler = new Vr(U(n)), n.applyC2CHandler = new jr(U(n)), n._initializeListener(), n
                    }
                    return P(t, nt), O(t, [{
                        key: "_initializeListener",
                        value: function (e) {
                            var t = this.tim.innerEmitter;
                            t.on(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, this.onContextUpdated, this), t.on(_e.NOTICE_LONGPOLL_PROFILE_MODIFIED, this.onProfileModified, this), t.on(_e.NOTICE_LONGPOLL_NEW_FRIEND_MESSAGES, this.onNewFriendMessages, this), t.on(_e.CONVERSATION_LIST_PROFILE_UPDATED, this.onConversationsProfileUpdated, this)
                        }
                    }, {
                        key: "onContextUpdated",
                        value: function (e) {
                            var t = e.data.context;
                            0 != !!t.a2Key && 0 != !!t.tinyID && (this.profileHandler.getMyProfile(), this.friendHandler.getFriendList(), this.blacklistHandler.getBlacklist())
                        }
                    }, {
                        key: "onGotMyProfile",
                        value: function () {
                            this.triggerReady()
                        }
                    }, {
                        key: "onProfileModified",
                        value: function (e) {
                            this.profileHandler.onProfileModified(e)
                        }
                    }, {
                        key: "onNewFriendMessages",
                        value: function (e) {
                            Ge.debug("onNewFriendMessages", JSON.stringify(e.data)), W(e.data.blackListDelAccount) || this.blacklistHandler.handleBlackListDelAccount(e.data.blackListDelAccount), W(e.data.blackListAddAccount) || this.blacklistHandler.handleBlackListAddAccount(e.data.blackListAddAccount)
                        }
                    }, {
                        key: "onConversationsProfileUpdated",
                        value: function (e) {
                            this.profileHandler.onConversationsProfileUpdated(e.data)
                        }
                    }, {
                        key: "getMyAccount",
                        value: function () {
                            return this.tim.context.identifier
                        }
                    }, {
                        key: "isMyFriend",
                        value: function (e) {
                            return this.friendHandler.isMyFriend(e)
                        }
                    }, {
                        key: "makeCapsule",
                        value: function (e, t, n) {
                            return this.createPackage({
                                name: e,
                                action: t,
                                param: n
                            })
                        }
                    }, {
                        key: "getMyProfile",
                        value: function () {
                            return this.profileHandler.getMyProfile()
                        }
                    }, {
                        key: "getUserProfile",
                        value: function (e) {
                            return this.profileHandler.getUserProfile(e)
                        }
                    }, {
                        key: "updateMyProfile",
                        value: function (e) {
                            return this.profileHandler.updateMyProfile(e)
                        }
                    }, {
                        key: "getFriendList",
                        value: function () {
                            return this.friendHandler.getFriendList()
                        }
                    }, {
                        key: "deleteFriend",
                        value: function (e) {
                            return this.friendHandler.deleteFriend(e)
                        }
                    }, {
                        key: "getBlacklist",
                        value: function () {
                            return this.blacklistHandler.getBlacklist()
                        }
                    }, {
                        key: "addBlacklist",
                        value: function (e) {
                            return this.blacklistHandler.addBlacklist(e)
                        }
                    }, {
                        key: "deleteBlacklist",
                        value: function (e) {
                            return this.blacklistHandler.deleteBlacklist(e)
                        }
                    }, {
                        key: "applyAddFriend",
                        value: function (e) {
                            return this.applyC2CHandler.applyAddFriend(e)
                        }
                    }, {
                        key: "getPendency",
                        value: function (e) {
                            return this.applyC2CHandler.getPendency(e)
                        }
                    }, {
                        key: "deletePendency",
                        value: function (e) {
                            return this.applyC2CHandler.deletePendency(e)
                        }
                    }, {
                        key: "replyPendency",
                        value: function (e) {
                            return this.applyC2CHandler.replyPendency(e)
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            Ge.warn("UserController.reset"), this.resetReady(), this.profileHandler.reset(), this.blacklistHandler.reset(), this.checkTimes = 0
                        }
                    }]), t
                }(),
                zr = function () {
                    function e(n) {
                        A(this, e), this.type = t.ELEMENT_TYPES.TEXT, this.content = {
                            text: n.text || ""
                        }
                    }
                    return O(e, [{
                        key: "setText",
                        value: function (e) {
                            this.content.text = e
                        }
                    }, {
                        key: "isEmpty",
                        value: function () {
                            return 0 === this.content.text.length ? 1 : 0
                        }
                    }]), e
                }(),
                Xr = function () {
                    function e(n) {
                        A(this, e), this._imageMemoryURL = "", this._file = n.file, Ee ? this.createImageDataASURLInWXMiniApp(n.file) : this.createImageDataASURLInWeb(n.file), this._initImageInfoModel(), this.type = t.ELEMENT_TYPES.IMAGE, this._percent = 0, this.content = {
                            imageFormat: t.IMAGE_FORMAT[n.imageFormat] || t.IMAGE_FORMAT.UNKNOWN,
                            uuid: n.uuid,
                            imageInfoArray: []
                        }, this.initImageInfoArray(n.imageInfoArray), this._defaultImage = "http://imgcache.qq.com/open/qcloud/video/act/webim-images/default.jpg", this._autoFixUrl()
                    }
                    return O(e, [{
                        key: "_initImageInfoModel",
                        value: function () {
                            var e = this;
                            this._ImageInfoModel = function (t) {
                                this.instanceID = Be(9999999), this.sizeType = t.type || 0, this.size = t.size || 0, this.width = t.width || 0, this.height = t.height || 0, this.imageUrl = t.url || "", this.url = t.url || e._imageMemoryURL || e._defaultImage
                            }, this._ImageInfoModel.prototype = {
                                setSizeType: function (e) {
                                    this.sizeType = e
                                },
                                setImageUrl: function (e) {
                                    e && (this.imageUrl = e)
                                },
                                getImageUrl: function () {
                                    return this.imageUrl
                                }
                            }
                        }
                    }, {
                        key: "initImageInfoArray",
                        value: function (e) {
                            for (var t = 2, n = null, r = null; t >= 0;) r = void 0 === e || void 0 === e[t] ? {
                                type: 0,
                                size: 0,
                                width: 0,
                                height: 0,
                                url: ""
                            } : e[t], (n = new this._ImageInfoModel(r)).setSizeType(t + 1), this.addImageInfo(n), t--
                        }
                    }, {
                        key: "updateImageInfoArray",
                        value: function (e) {
                            for (var t, n = this.content.imageInfoArray.length, r = 0; r < n; r++) t = this.content.imageInfoArray[r], e.size && (t.size = e.size), e.url && t.setImageUrl(e.url), e.width && (t.width = e.width), e.height && (t.height = e.height)
                        }
                    }, {
                        key: "_autoFixUrl",
                        value: function () {
                            for (var e = this.content.imageInfoArray.length, t = "", n = "", r = ["http", "https"], o = null, i = 0; i < e; i++) this.content.imageInfoArray[i].url && "" !== (o = this.content.imageInfoArray[i]).imageUrl && (n = o.imageUrl.slice(0, o.imageUrl.indexOf("://") + 1), t = o.imageUrl.slice(o.imageUrl.indexOf("://") + 1), r.indexOf(n) < 0 && (n = "https:"), this.content.imageInfoArray[i].setImageUrl([n, t].join("")))
                        }
                    }, {
                        key: "updatePercent",
                        value: function (e) {
                            this._percent = e, this._percent > 1 && (this._percent = 1)
                        }
                    }, {
                        key: "updateImageFormat",
                        value: function (e) {
                            this.content.imageFormat = e
                        }
                    }, {
                        key: "createImageDataASURLInWeb",
                        value: function (e) {
                            void 0 !== e && e.files.length > 0 && (this._imageMemoryURL = window.URL.createObjectURL(e.files[0]))
                        }
                    }, {
                        key: "createImageDataASURLInWXMiniApp",
                        value: function (e) {
                            e && e.tempFilePaths[0] && (this._imageMemoryURL = e.tempFilePaths[0])
                        }
                    }, {
                        key: "replaceImageInfo",
                        value: function (e, t) {
                            this.content.imageInfoArray[t] instanceof this._ImageInfoModel || (this.content.imageInfoArray[t] = e)
                        }
                    }, {
                        key: "addImageInfo",
                        value: function (e) {
                            this.content.imageInfoArray.length >= 3 || this.content.imageInfoArray.push(e)
                        }
                    }, {
                        key: "isEmpty",
                        value: function () {
                            return 0 === this.content.imageInfoArray.length ? 1 : "" === this.content.imageInfoArray[0].imageUrl ? 1 : 0
                        }
                    }]), e
                }(),
                Jr = function () {
                    function e(n) {
                        A(this, e), this.type = t.ELEMENT_TYPES.FACE, this.content = n || null
                    }
                    return O(e, [{
                        key: "isEmpty",
                        value: function () {
                            return null === this.content ? 1 : 0
                        }
                    }]), e
                }(),
                Qr = function () {
                    function e(n) {
                        A(this, e), this.type = t.ELEMENT_TYPES.SOUND, this.content = {
                            downloadFlag: n.downloadFlag,
                            second: n.second,
                            size: n.size,
                            url: n.url,
                            uuid: n.uuid
                        }
                    }
                    return O(e, [{
                        key: "isEmpty",
                        value: function () {
                            return "" === this.content.url ? 1 : 0
                        }
                    }]), e
                }(),
                Zr = {
                    from: 1,
                    groupID: 1,
                    groupName: 1,
                    to: 1
                },
                $r = function () {
                    function e(n) {
                        A(this, e), this.type = t.ELEMENT_TYPES.GROUP_TIP, this.content = {}, this._initContent(n)
                    }
                    return O(e, [{
                        key: "_initContent",
                        value: function (e) {
                            var t = this;
                            Object.keys(e).forEach(function (n) {
                                switch (n) {
                                    case "remarkInfo":
                                        break;
                                    case "groupProfile":
                                        t.content.groupProfile = {}, t._initGroupProfile(e[n]);
                                        break;
                                    case "operatorInfo":
                                    case "memberInfoList":
                                        break;
                                    default:
                                        t.content[n] = e[n]
                                }
                            }), this.content.userIDList || (this.content.userIDList = [this.content.operatorID])
                        }
                    }, {
                        key: "_initGroupProfile",
                        value: function (e) {
                            for (var t = Object.keys(e), n = 0; n < t.length; n++) {
                                var r = t[n];
                                Zr[r] && (this.content.groupProfile[r] = e[r])
                            }
                        }
                    }]), e
                }(),
                eo = {
                    from: 1,
                    groupID: 1,
                    groupName: 1,
                    to: 1
                },
                to = function () {
                    function e(n) {
                        A(this, e), this.type = t.ELEMENT_TYPES.GROUP_SYSTEM_NOTICE, this.content = {}, this._initContent(n)
                    }
                    return O(e, [{
                        key: "_initContent",
                        value: function (e) {
                            var t = this;
                            Object.keys(e).forEach(function (n) {
                                switch (n) {
                                    case "memberInfoList":
                                        break;
                                    case "remarkInfo":
                                        t.content.handleMessage = e[n];
                                        break;
                                    case "groupProfile":
                                        t.content.groupProfile = {}, t._initGroupProfile(e[n]);
                                        break;
                                    default:
                                        t.content[n] = e[n]
                                }
                            })
                        }
                    }, {
                        key: "_initGroupProfile",
                        value: function (e) {
                            for (var t = Object.keys(e), n = 0; n < t.length; n++) {
                                var r = t[n];
                                eo[r] && (this.content.groupProfile[r] = e[r])
                            }
                        }
                    }]), e
                }(),
                no = function () {
                    function e(n) {
                        A(this, e);
                        var r = this._check(n);
                        if (r instanceof ae) throw r;
                        this.type = t.ELEMENT_TYPES.FILE, this._percent = 0;
                        var o = this._getFileInfo(n);
                        this.content = {
                            downloadFlag: 2,
                            fileUrl: n.url || "",
                            uuid: ["fake", Be(999), Be(9999)].join("-"),
                            fileName: o.name || "",
                            fileSize: o.size || 0
                        }
                    }
                    return O(e, [{
                        key: "_getFileInfo",
                        value: function (e) {
                            if (e.fileName && e.fileSize) return {
                                size: e.fileSize,
                                name: e.fileName
                            };
                            if (Ee) return {};
                            var t = e.file.files[0];
                            return {
                                size: t.size,
                                name: t.name,
                                type: t.type.slice(t.type.lastIndexOf("/") + 1).toUpperCase()
                            }
                        }
                    }, {
                        key: "updatePercent",
                        value: function (e) {
                            this._percent = e, this._percent > 1 && (this._percent = 1)
                        }
                    }, {
                        key: "updateFileUrl",
                        value: function (e) {
                            this.content.fileUrl = e
                        }
                    }, {
                        key: "_check",
                        value: function (e) {
                            if (e.size > 20971520) return new ae({
                                code: ie.MESSAGE_FILE_SIZE_LIMIT,
                                message: "".concat(se.MESSAGE_FILE_SIZE_LIMIT, ": ").concat(20971520, " bytes")
                            })
                        }
                    }, {
                        key: "isEmpty",
                        value: function () {
                            return "" === this.content.fileUrl ? 1 : "" === this.content.fileName ? 1 : 0 === this.content.fileSize ? 1 : 0
                        }
                    }]), e
                }(),
                ro = function () {
                    function e(n) {
                        A(this, e), this.type = t.ELEMENT_TYPES.CUSTOM, this.content = {
                            data: n.data || "",
                            description: n.description || "",
                            extension: n.extension || ""
                        }
                    }
                    return O(e, [{
                        key: "setData",
                        value: function (e) {
                            return this.content.data = e, this
                        }
                    }, {
                        key: "setDescription",
                        value: function (e) {
                            return this.content.description = e, this
                        }
                    }, {
                        key: "setExtension",
                        value: function (e) {
                            return this.content.extension = e, this
                        }
                    }, {
                        key: "isEmpty",
                        value: function () {
                            return 0 === this.content.data.length && 0 === this.content.description.length && 0 === this.content.extension.length ? 1 : 0
                        }
                    }]), e
                }(),
                oo = function e(n) {
                    A(this, e), this.type = t.ELEMENT_TYPES.VIDEO, this.content = {
                        videoFormat: n.videoFormat,
                        videoUrl: n.url,
                        downloadFlag: n.downloadFlag,
                        UUID: n.uuid
                    }
                },
                io = function () {
                    function e(t) {
                        A(this, e), this.ID = "", this.conversationID = t.conversationID || null, this.conversationType = t.conversationType || n.C2C, this.conversationSubType = t.conversationSubType, this.time = t.time || Math.ceil(Date.now() / 1e3), this.sequence = t.sequence || 0, this.clientSequence = t.clientSequence || t.sequence || 0, this.random = t.random || Be(), this.messagePriority = t.messagePriority || 0, this.elements = t.elements || null, this.isPlaceMessage = 0, this.geo = {}, this.from = t.from || null, this.to = t.to || null, this.flow = "", this.isSystemMessage = t.isSystemMessage || 0, this.protocol = t.protocol || "JSON", this.isResend = 0, this.isRead = 0, this.status = t.status || it.MESSAGE_STATUS.SUCCESS, this._error = 0, this._errorInfo = "", this.reInitialize(t.currentUser), this.extractGroupInfo(t.groupProfile || null)
                    }
                    return O(e, [{
                        key: "setError",
                        value: function (e, t) {
                            "number" == typeof e && (this._error = e), this._errorInfo = t || "message elements error!"
                        }
                    }, {
                        key: "extractGroupInfo",
                        value: function (e) {
                            if (null !== e) {
                                var t = e.messageFromAccountExtraInformation;
                                this.nick = "", "string" == typeof e.fromAccountNick && (this.nick = e.fromAccountNick), this.avatar = "", "string" == typeof e.fromAccountHeadurl && (this.avatar = e.fromAccountHeadurl), this.nameCard = "", "object" === D(t) && t.hasOwnProperty("nameCard") && (this.nameCard = t.nameCard)
                            }
                        }
                    }, {
                        key: "isError",
                        value: function () {
                            return 0 === this._error ? 0 : 1
                        }
                    }, {
                        key: "getIMError",
                        value: function () {
                            return new ae({
                                code: this._error,
                                message: this._errorInfo
                            })
                        }
                    }, {
                        key: "_initProxy",
                        value: function () {
                            if (Ee) return this.payload = this.elements[0].content, void(this.type = this.elements[0].type);
                            var e = this;
                            Object.defineProperty(this, "type", {
                                get: function () {
                                    return e.elements[0].type
                                }
                            }), Object.defineProperty(this, "payload", {
                                get: function () {
                                    return e.elements[0].content
                                }
                            })
                        }
                    }, {
                        key: "afterOperated",
                        value: function (e) {
                            this._onOperatedHandle = null, "function" == typeof e && (this._onOperatedHandle = e), 1 == this.isSendable() && this.triggerOperated()
                        }
                    }, {
                        key: "triggerOperated",
                        value: function () {
                            null !== this._onOperatedHandle && "function" == typeof this._onOperatedHandle && this._onOperatedHandle(this)
                        }
                    }, {
                        key: "reInitialize",
                        value: function (e) {
                            e && (this.status = this.from ? it.MESSAGE_STATUS.SUCCESS : it.MESSAGE_STATUS.UNSEND, !this.from && (this.from = e), this.isRead = 1), this._initFlow(e), this._initielizeSequence(e), this._concactConversationID(e), this.generateMessageID(e)
                        }
                    }, {
                        key: "isSendable",
                        value: function () {
                            return 0 === this.elements.length ? 0 : "function" != typeof this.elements[0].isEmpty ? (Ge.warn("".concat(this.elements[0].type, ' need "booleam : isEmpty()" method')), 0) : 1 == this.elements[0].isEmpty() ? 0 : 1
                        }
                    }, {
                        key: "_initTo",
                        value: function (e) {
                            this.conversationType === n.GROUP && (this.to = e.groupID)
                        }
                    }, {
                        key: "_initielizeSequence",
                        value: function (e) {
                            0 === this.clientSequence && e && (this.clientSequence = function (e) {
                                if (!e) return Ge.error("autoincrementIndex(string: key) need key parameter"), 0;
                                if (void 0 === je[e]) {
                                    var t = new Date,
                                        n = "3".concat(t.getHours()).slice(-2),
                                        r = "0".concat(t.getMinutes()).slice(-2),
                                        o = "0".concat(t.getSeconds()).slice(-2);
                                    je[e] = parseInt([n, r, o, "0001"].join("")), n = null, r = null, o = null, Ge.warn("utils.autoincrementIndex() create new sequence : ".concat(e, " = ").concat(je[e]))
                                }
                                return je[e]++
                            }(e)), 0 === this.sequence && this.conversationType === n.C2C && (this.sequence = this.clientSequence)
                        }
                    }, {
                        key: "generateMessageID",
                        value: function (e) {
                            var t = e === this.from ? 1 : 0,
                                n = this.sequence > 0 ? this.sequence : this.clientSequence;
                            this.ID = "".concat(this.conversationID, "-").concat(n, "-").concat(this.random, "-").concat(t)
                        }
                    }, {
                        key: "_initFlow",
                        value: function (e) {
                            "" !== e && (this.flow = e === this.from ? "out" : "in")
                        }
                    }, {
                        key: "_concactConversationID",
                        value: function (e) {
                            var t = this.to,
                                r = n,
                                o = "",
                                i = this.conversationType;
                            i !== r.SYSTEM ? (o = i === r.C2C ? e === this.from ? t : this.from : this.to, this.conversationID = "".concat(i).concat(o)) : this.conversationID = r.SYSTEM
                        }
                    }, {
                        key: "isElement",
                        value: function (e) {
                            return e instanceof zr || e instanceof Xr || e instanceof Jr || e instanceof Qr || e instanceof no || e instanceof $r || e instanceof to || e instanceof ro
                        }
                    }, {
                        key: "setElement",
                        value: function (e) {
                            var n = this;
                            if (this.isElement(e)) return this.elements = [e], void this._initProxy();
                            var r = function (e) {
                                switch (e.type) {
                                    case t.ELEMENT_TYPES.TEXT:
                                        n.setTextElement(e.content);
                                        break;
                                    case t.ELEMENT_TYPES.IMAGE:
                                        n.setImageElement(e.content);
                                        break;
                                    case t.ELEMENT_TYPES.SOUND:
                                        n.setSoundElement(e.content);
                                        break;
                                    case t.ELEMENT_TYPES.FILE:
                                        n.setFileElement(e.content);
                                        break;
                                    case t.ELEMENT_TYPES.VIDEO:
                                        n.setVideoElement(e.content);
                                        break;
                                    case t.ELEMENT_TYPES.CUSTOM:
                                        n.setCustomElement(e.content);
                                        break;
                                    case t.ELEMENT_TYPES.GEO:
                                        n.setGEOElement(e.content);
                                        break;
                                    case t.ELEMENT_TYPES.GROUP_TIP:
                                        n.setGroupTipElement(e.content);
                                        break;
                                    case t.ELEMENT_TYPES.GROUP_SYSTEM_NOTICE:
                                        n.setGroupSystemNoticeElement(e.content);
                                        break;
                                    case t.ELEMENT_TYPES.FACE:
                                        n.setFaceElement(e.content);
                                        break;
                                    default:
                                        Ge.warn(e.type, e.content, "no operation......")
                                }
                            };
                            if (Array.isArray(e))
                                for (var o = 0; o < e.length; o++) r(e[o]);
                            else r(e);
                            this._initProxy()
                        }
                    }, {
                        key: "setTextElement",
                        value: function (e) {
                            var t = "string" == typeof e ? e : e.text,
                                n = new zr({
                                    text: t
                                });
                            this.elements = [n]
                        }
                    }, {
                        key: "setImageElement",
                        value: function (e) {
                            var t = new Xr(e);
                            this.elements = [t]
                        }
                    }, {
                        key: "setSoundElement",
                        value: function (e) {
                            var t = new Qr(e);
                            this.elements = [t]
                        }
                    }, {
                        key: "setFileElement",
                        value: function (e) {
                            var t = new no(e);
                            this.elements = [t]
                        }
                    }, {
                        key: "setVideoElement",
                        value: function (e) {
                            var t = new oo(e);
                            this.elements = [t]
                        }
                    }, {
                        key: "setGEOElement",
                        value: function (e) {}
                    }, {
                        key: "setCustomElement",
                        value: function (e) {
                            var t = new ro(e);
                            this.elements = [t]
                        }
                    }, {
                        key: "setGroupTipElement",
                        value: function (e) {
                            var t = new $r(e);
                            this.elements = [t]
                        }
                    }, {
                        key: "setGroupSystemNoticeElement",
                        value: function (e) {
                            var t = new to(e);
                            this.elements = [t]
                        }
                    }, {
                        key: "setFaceElement",
                        value: function (e) {
                            var t = new Jr(e);
                            this.elements = [t]
                        }
                    }]), e
                }(),
                so = ["groupID", "name", "avatar", "type", "introduction", "notification", "ownerID", "selfInfo", "createTime", "infoSequence", "lastInfoTime", "lastMessage", "nextMessageSeq", "memberNum", "maxMemberNum", "memberList", "joinOption", "groupCustomField"],
                ao = function () {
                    function e(t) {
                        A(this, e), this.groupID = "", this.name = "", this.avatar = "", this.type = "", this.introduction = "", this.notification = "", this.ownerID = "", this.createTime = "", this.infoSequence = "", this.lastInfoTime = "", this.selfInfo = {
                            messageRemindType: "",
                            joinTime: "",
                            nameCard: "",
                            role: ""
                        }, this.lastMessage = {}, this.nextMessageSeq = "", this.memberNum = "", this.maxMemberNum = "", this.joinOption = "", this.groupCustomField = [], this._initGroup(t)
                    }
                    return O(e, [{
                        key: "_initGroup",
                        value: function (e) {
                            for (var t in e) so.indexOf(t) < 0 || (this[t] = e[t])
                        }
                    }, {
                        key: "updateGroup",
                        value: function (e) {
                            Ke(this, e, ["members", "errorCode"])
                        }
                    }]), e
                }(),
                uo = function (e) {
                    var n = e[0];
                    if (Fe(n)) return "";
                    switch (n.type) {
                        case t.ELEMENT_TYPES.TEXT:
                            return n.content.text;
                        case t.ELEMENT_TYPES.IMAGE:
                            return "[图片]";
                        case t.ELEMENT_TYPES.GEO:
                            return "[位置]";
                        case t.ELEMENT_TYPES.SOUND:
                            return "[语音]";
                        case t.ELEMENT_TYPES.FILE:
                            return "[文件]";
                        case t.ELEMENT_TYPES.CUSTOM:
                            return "[其他]";
                        case t.ELEMENT_TYPES.GROUP_TIP:
                            return "[群提示消息]";
                        case t.ELEMENT_TYPES.GROUP_SYSTEM_NOTICE:
                            return "[群系统通知]";
                        default:
                            return ""
                    }
                },
                co = function (e) {
                    return Fe(e) ? {
                        lastTime: 0,
                        lastSequence: 0,
                        fromAccount: 0,
                        messageForShow: "",
                        payload: null,
                        type: ""
                    } : e instanceof io ? {
                        lastTime: e.time || 0,
                        lastSequence: e.sequence || 0,
                        fromAccount: e.from || "",
                        messageForShow: uo(e.elements) || "",
                        payload: e.elements[0] ? e.elements[0].content : null,
                        type: e.elements[0] ? e.elements[0].type : ""
                    } : e
                },
                lo = function () {
                    function e(t) {
                        A(this, e), this.conversationID = t.conversationID || "", this.unreadCount = t.unreadCount || 0, this.type = t.type || "", this.subType = t.subType || "", this.lastMessage = co(t.lastMessage), this._isInfoCompleted = 0, this._initProfile(t)
                    }
                    return O(e, [{
                        key: "_initProfile",
                        value: function (e) {
                            var t = this;
                            Object.keys(e).forEach(function (n) {
                                switch (n) {
                                    case "userProfile":
                                        t.userProfile = e.userProfile;
                                        break;
                                    case "groupProfile":
                                        t.groupProfile = e.groupProfile
                                }
                            }), Fe(this.userProfile) && this.type === n.C2C ? this.userProfile = new qr({
                                userID: e.conversationID.replace("C2C", "")
                            }) : Fe(this.groupProfile) && this.type === n.GROUP && (this.groupProfile = new ao({
                                groupID: e.conversationID.replace("GROUP", "")
                            }))
                        }
                    }, {
                        key: "toAccount",
                        get: function () {
                            return this.conversationID.replace("C2C", "").replace("GROUP", "")
                        }
                    }, {
                        key: "hasProfile",
                        get: function () {
                            return !Fe(this.userProfile) || !Fe(this.groupProfile)
                        }
                    }]), e
                }(),
                po = function (t) {
                    function o(e) {
                        var t;
                        return A(this, o), (t = F(this, G(o).call(this, e))).conversationMap = new Map, t.hasLocalConversationList = 0, t.tempGroupList = [], t._initListeners(), t
                    }
                    return P(o, nt), O(o, [{
                        key: "createLocalConversation",
                        value: function (e) {
                            return this.conversationMap.has(e) ? this.conversationMap.get(e) : new lo({
                                conversationID: e,
                                type: e.slice(0, 3) === n.C2C ? n.C2C : n.GROUP
                            })
                        }
                    }, {
                        key: "hasLocalConversation",
                        value: function (e) {
                            return this.conversationMap.has(e)
                        }
                    }, {
                        key: "getConversationList",
                        value: function () {
                            var e = this,
                                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                n = !t,
                                r = this.createPackage({
                                    name: "conversation",
                                    action: "query"
                                });
                            return Ge.log("ConversationController.getConversationList."), this.tim.connectionController.request(r).then(function (r) {
                                var o = r.data.conversations,
                                    i = void 0 === o ? [] : o,
                                    s = e._getConversationOptions(i);
                                return t && e._conversationMapTreeShaking(s), e._updateLocalConversationList(s, 1), e._setStorageConversationList(), e.tempGroupList.length > 0 && (e._onUpdateConversationGroupProfile(e.tempGroupList), e.tempGroupList = []), e._isReady && e._emitConversationUpdate(n), e.triggerReady(), Ge.log("ConversationController.getConversationList ok."), lt({
                                    conversationList: e.getLocalConversationList()
                                })
                            }).catch(function (e) {
                                return Ge.error("ConversationController.getConversationList error:", e), pt(e)
                            })
                        }
                    }, {
                        key: "getConversationProfile",
                        value: function (e) {
                            var t = this.conversationMap.has(e) ? this.conversationMap.get(e) : this.createLocalConversation(e);
                            return t._isInfoCompleted || t.type === n.SYSTEM ? lt({
                                conversation: t
                            }) : (Ge.log("ConversationController.getConversationProfile. conversationID:", e), this._updateUserOrGroupProfileCompletely(t).then(function (t) {
                                return Ge.log("ConversationController.getConversationProfile ok. conversationID:", e), t
                            }).catch(function (e) {
                                return Ge.error("ConversationController.getConversationProfile error:", e), pt(e, 1)
                            }))
                        }
                    }, {
                        key: "deleteConversation",
                        value: function (e) {
                            var t = this,
                                r = {};
                            if (!this.conversationMap.has(e)) {
                                var o = new ae({
                                    code: ie.CONVERSATION_NOT_FOUND,
                                    message: se.CONVERSATION_NOT_FOUND
                                });
                                return pt(o)
                            }
                            switch (this.conversationMap.get(e).type) {
                                case n.C2C:
                                    r.type = 1, r.toAccount = e.slice(3);
                                    break;
                                case n.GROUP:
                                    r.type = 2, r.toGroupID = e.slice(5);
                                    break;
                                case n.SYSTEM:
                                    return this.tim.deleteGroupSystemNotice({
                                        messageList: this.tim.messageController.getLocalMessageList(e)
                                    }), this._deleteLocalConversation(e), lt({
                                        conversationID: e
                                    });
                                default:
                                    var i = new ae({
                                        code: ie.CONVERSATION_UN_RECORDED_TYPE,
                                        message: se.CONVERSATION_UN_RECORDED_TYPE
                                    });
                                    return pt(i)
                            }
                            Ge.log("ConversationController.deleteConversation. conversationID:", e);
                            var s = this.createPackage({
                                name: "conversation",
                                action: "delete",
                                param: r
                            });
                            return this.tim.setMessageRead({
                                conversationID: e
                            }).then(function () {
                                return t.connectionController.request(s)
                            }).then(function () {
                                return Ge.log("ConversationController.deleteConversation ok. conversationID:", e), t._deleteLocalConversation(e), lt({
                                    conversationID: e
                                })
                            }).catch(function (e) {
                                return Ge.error("ConversationController.deleteConversation error:", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "getLocalConversationLastSequence",
                        value: function (e) {
                            if (!this.hasLocalConversation(e)) return 0;
                            var t = this.conversationMap.get(e);
                            return !!t.lastMessage.lastSequence || t.type !== M.CONV_GROUP ? t.lastMessage.lastSequence : t.groupProfile.nextMessageSeq - 1
                        }
                    }, {
                        key: "getLocalConversationList",
                        value: function () {
                            return x(this.conversationMap.values())
                        }
                    }, {
                        key: "getLocalConversation",
                        value: function (e) {
                            return this.conversationMap.get(e)
                        }
                    }, {
                        key: "_initLocalConversationList",
                        value: function () {
                            Ge.time(gt), Ge.log("ConversationController._initLocalConversationList init");
                            var e = this._getStorageConversationList();
                            if (this.hasLocalConversationList = null !== e && 0 !== e.length, this.hasLocalConversationList) {
                                for (var t = 0, n = e.length; t < n; t++) this.conversationMap.set(e[t].conversationID, new lo(e[t]));
                                this._emitConversationUpdate(1, 0)
                            }
                            this.getConversationList(1).then(function () {
                                Ge.log("ConversationController._initLocalConversationList init ok. initCost=".concat(Ge.timeEnd(gt), "ms"))
                            })
                        }
                    }, {
                        key: "_getStorageConversationList",
                        value: function () {
                            return this.tim.storage.getItem("conversationMap")
                        }
                    }, {
                        key: "_setStorageConversationList",
                        value: function () {
                            var e = [];
                            this.conversationMap.forEach(function (t) {
                                var n = t.conversationID,
                                    r = t.type,
                                    o = t.subType,
                                    i = t.lastMessage,
                                    s = t.groupProfile,
                                    a = t.userProfile;
                                e.push({
                                    conversationID: n,
                                    type: r,
                                    subType: o,
                                    lastMessage: i,
                                    groupProfile: s,
                                    userProfile: a
                                })
                            }), this.tim.storage.setItem("conversationMap", e)
                        }
                    }, {
                        key: "_initListeners",
                        value: function () {
                            this.tim.innerEmitter.once(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initLocalConversationList, this), this.tim.innerEmitter.on(_e.MESSAGE_SENDING, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(_e.MESSAGE_SENDINGSEND_SUCCESS, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(_e.MESSAGE_GROUP_SEND_SUCCESS, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(_e.MESSAGE_C2C_INSTANT_RECEIVED, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(_e.MESSAGE_GROUP_INSTANT_RECEIVED, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(_e.MESSAGE_GROUP_SYSTEM_NOTICE_RECEIVED, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(_e.GROUP_LIST_UPDATED, this._onUpdateConversationGroupProfile, this), this.tim.innerEmitter.on(_e.PROFILE_UPDATED, this._onUpdateConversationUserProfile, this)
                        }
                    }, {
                        key: "_onUpdateConversationGroupProfile",
                        value: function (e) {
                            var t = this;
                            this.hasLocalConversationList || (this.tempGroupList = e), e.forEach(function (e) {
                                var n = "GROUP".concat(e.groupID);
                                if (t.conversationMap.has(n)) {
                                    var r = t.conversationMap.get(n);
                                    r.groupProfile = e, r.lastMessage.lastSequence = e.nextMessageSeq - 1, r.subType || (r.subType = e.type)
                                }
                            }), this._emitConversationUpdate(1, 0)
                        }
                    }, {
                        key: "_onUpdateConversationUserProfile",
                        value: function (e) {
                            var t = this;
                            e.data.forEach(function (e) {
                                var n = "C2C".concat(e.userID);
                                t.conversationMap.has(n) && (t.conversationMap.get(n).userProfile = e)
                            }), this._emitConversationUpdate(1, 0)
                        }
                    }, {
                        key: "_onSendOrReceiveMessage",
                        value: function (e) {
                            var t = this,
                                n = e.data.eventDataList;
                            this._isReady ? 0 !== n.length && (this._updateLocalConversationList(n, 0), this._setStorageConversationList(), this._emitConversationUpdate()) : this.ready(function () {
                                t._onSendOrReceiveMessage(e)
                            })
                        }
                    }, {
                        key: "_updateLocalConversationList",
                        value: function (e, t) {
                            var n;
                            n = this._updateTempConversations(e, t), this.conversationMap = new Map(this._sortConversations([].concat(x(n.conversations), x(this.conversationMap)))), this._updateUserOrGroupProfile(n.newerConversations)
                        }
                    }, {
                        key: "_updateTempConversations",
                        value: function (e, t) {
                            for (var n = [], r = [], o = 0, i = e.length; o < i; o++) {
                                var s = new lo(e[o]),
                                    a = this.conversationMap.get(s.conversationID);
                                if (this.conversationMap.has(s.conversationID)) {
                                    Ke(a, s, ["unreadCount", "allowType", "adminForbidType", "payload"], [null, void 0, "", 0, NaN]), a.unreadCount = this._updateUnreadCount(a, s, t), a.lastMessage.payload = e[o].lastMessage.payload, this.conversationMap.delete(a.conversationID), n.push([a.conversationID, a])
                                } else r.push(s), n.push([s.conversationID, s])
                            }
                            return {
                                conversations: n,
                                newerConversations: r
                            }
                        }
                    }, {
                        key: "_updateUnreadCount",
                        value: function (e, t, o) {
                            if ([r.CHATROOM, r.AVCHATROOM].includes(e.subType)) return 0;
                            if (o) {
                                if (e.type === n.C2C) return e.unreadCount;
                                if (e.type === n.GROUP) return t.unreadCount
                            }
                            return t.unreadCount + e.unreadCount
                        }
                    }, {
                        key: "_sortConversations",
                        value: function (e) {
                            return e.sort(function (e, t) {
                                return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime
                            })
                        }
                    }, {
                        key: "_updateUserOrGroupProfile",
                        value: function (e) {
                            var t = this,
                                r = [],
                                o = [];
                            return e.forEach(function (e) {
                                if (!e.hasProfile)
                                    if (e.type === n.C2C) r.push(e.toAccount);
                                    else if (e.type === n.GROUP) {
                                    var i = e.toAccount;
                                    t.tim.groupController.getLocalGroupProfile(i) ? e.groupProfile = t.tim.groupController.getLocalGroupProfile(i) : o.push(e.toAccount)
                                }
                            }), r.length > 0 ? this.tim.getUserProfile({
                                userIDList: r
                            }).then(function (e) {
                                var n = e.data;
                                Ue(n) ? n.forEach(function (e) {
                                    t.conversationMap.get("C2C".concat(e.userID)).userProfile = e
                                }) : t.conversationMap.get("C2C".concat(n.userID)).userProfile = n
                            }) : o.length > 0 ? this.tim.getGroupProfileAdvance({
                                groupIDList: o,
                                responseFilter: {
                                    groupBaseInfoFilter: ["Type", "Name", "FaceUrl"]
                                }
                            }).then(function (e) {
                                e.data.successGroupList.forEach(function (e) {
                                    var n = "GROUP".concat(e.groupID);
                                    if (t.conversationMap.has(n)) {
                                        var r = t.conversationMap.get(n);
                                        Ke(r.groupProfile, e, [], [null, void 0, "", 0, NaN]), !r.subType && e.type && (r.subType = e.type)
                                    }
                                })
                            }) : void 0
                        }
                    }, {
                        key: "_updateUserOrGroupProfileCompletely",
                        value: function (e) {
                            var t = this;
                            return e.type === n.C2C ? this.tim.getUserProfile({
                                userIDList: [e.toAccount]
                            }).then(function (n) {
                                var r = n.data;
                                return 0 === r.length ? pt(new ae({
                                    code: ie.USER_OR_GROUP_NOT_FOUND,
                                    message: se.USER_OR_GROUP_NOT_FOUND
                                })) : (e.userProfile = r[0], e._isInfoCompleted = 1, t._unshiftConversation(e), lt({
                                    conversation: e
                                }))
                            }) : this.tim.getGroupProfile({
                                groupID: e.toAccount
                            }).then(function (n) {
                                return e.groupProfile = n.data.group, e._isInfoCompleted = 1, t._unshiftConversation(e), lt({
                                    conversation: e
                                })
                            })
                        }
                    }, {
                        key: "_unshiftConversation",
                        value: function (e) {
                            e instanceof lo && !this.conversationMap.has(e.conversationID) && (this.conversationMap = new Map([
                                [e.conversationID, e]
                            ].concat(x(this.conversationMap))), this._setStorageConversationList(), this._emitConversationUpdate(1, 0))
                        }
                    }, {
                        key: "_deleteLocalConversation",
                        value: function (e) {
                            return this.conversationMap.delete(e), this._setStorageConversationList(), this._emitConversationUpdate(1, 0), this.conversationMap.has(e)
                        }
                    }, {
                        key: "_getConversationOptions",
                        value: function (e) {
                            var t = [],
                                n = e.map(function (e) {
                                    if (1 === e.type) {
                                        var n = {
                                            userID: e.userID,
                                            nick: e.c2CNick,
                                            avatar: e.c2CImage
                                        };
                                        return t.push(n), {
                                            conversationID: "C2C".concat(e.userID),
                                            type: "C2C",
                                            lastMessage: {
                                                lastTime: e.time,
                                                lastSequence: e.sequence,
                                                fromAccount: e.lastC2CMsgFromAccount,
                                                messageForShow: e.messageShow,
                                                type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null,
                                                payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null
                                            },
                                            userProfile: new qr(n)
                                        }
                                    }
                                    return {
                                        conversationID: "GROUP".concat(e.groupID),
                                        type: "GROUP",
                                        lastMessage: {
                                            lastTime: e.time,
                                            lastSequence: e.messageReadSeq + e.unreadCount,
                                            fromAccount: e.msgGroupFromAccount,
                                            messageForShow: e.messageShow,
                                            type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null,
                                            payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null
                                        },
                                        groupProfile: new ao({
                                            groupID: e.groupID,
                                            name: e.groupNick,
                                            avatar: e.groupImage
                                        }),
                                        unreadCount: e.unreadCount
                                    }
                                });
                            return t.length > 0 && this.tim.innerEmitter.emit(_e.CONVERSATION_LIST_PROFILE_UPDATED, {
                                data: t
                            }), n
                        }
                    }, {
                        key: "_emitConversationUpdate",
                        value: function () {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                                r = x(this.conversationMap.values());
                            n && this.tim.innerEmitter.emit(_e.CONVERSATION_LIST_UPDATED, r), t && this.tim.outerEmitter.emit(e.CONVERSATION_LIST_UPDATED, r)
                        }
                    }, {
                        key: "_conversationMapTreeShaking",
                        value: function (e) {
                            var t = this,
                                r = new Map(x(this.conversationMap));
                            e.forEach(function (e) {
                                return r.delete(e.conversationID)
                            }), r.has("@TIM#SYSTEM") && r.delete("@TIM#SYSTEM"), this.tim.groupController.AVChatRoomHandler.isJoined && r.delete("".concat(n.GROUP).concat(this.tim.groupController.AVChatRoomHandler.group.groupID)), x(r.keys()).forEach(function (e) {
                                return t.conversationMap.delete(e)
                            })
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this.conversationMap.clear(), this.hasLocalConversationList = 0, this.resetReady(), this.tim.innerEmitter.once(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initLocalConversationList, this)
                        }
                    }]), o
                }(),
                ho = function () {
                    function e(t) {
                        if (A(this, e), void 0 === t) throw new ae({
                            code: ie.MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS,
                            message: se.MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS
                        });
                        if (void 0 === t.tim) throw new ae({
                            code: ie.MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS,
                            message: "".concat(se.MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS, ".tim")
                        });
                        this.list = new Map, this.tim = t.tim, this._initializeOptions(t)
                    }
                    return O(e, [{
                        key: "getLocalOldestMessageByConversationID",
                        value: function (e) {
                            if (!e) return null;
                            if (!this.list.has(e)) return null;
                            var t = this.list.get(e).values();
                            return t ? t.next().value : null
                        }
                    }, {
                        key: "_initializeOptions",
                        value: function (e) {
                            this.options = {};
                            var t = {
                                memory: {
                                    maxDatasPerKey: 100,
                                    maxBytesPerData: 256,
                                    maxKeys: 0
                                },
                                cache: {
                                    maxDatasPerKey: 10,
                                    maxBytesPerData: 256,
                                    maxKeys: 0
                                }
                            };
                            for (var n in t)
                                if (void 0 !== e[n]) {
                                    var r = t[n];
                                    for (var o in r) void 0 !== e[n][o] ? this.options[n][o] = e[n][o] : this.options[n][o] = r[o]
                                } else this.options[n] = t[n]
                        }
                    }, {
                        key: "_parseMessageFormLikeKeyValue",
                        value: function (e) {
                            return [e.conversationID, e]
                        }
                    }, {
                        key: "pushIn",
                        value: function (e) {
                            var t = this._parseMessageFormLikeKeyValue(e),
                                n = 0;
                            return void 0 === this.list.get(t[0]) && this.list.set(t[0], new Map), this.list.has(e.conversationID) && this.list.get(e.conversationID).has(t[1].ID) && (n = 1), this.list.get(t[0]).set(t[1].ID, t[1]), n ? null : e
                        }
                    }, {
                        key: "shiftIn",
                        value: function (e) {
                            Array.isArray(e) ? 0 !== e.length && this._shiftInMultipleMessages(e) : this._shiftSingleMessage(e)
                        }
                    }, {
                        key: "_shiftSingleMessage",
                        value: function (e) {
                            var t = this._parseMessageFormLikeKeyValue(e);
                            if (void 0 === this.list.get(t[0])) return this.list.set(t[0], new Map), void this.list.get(t[0]).set(t[1].ID, t[1]);
                            var n = Array.from(this.list.get(t[0]));
                            n.unshift([t[1].ID, t[1]]), this.list.set(t[0], new Map(n))
                        }
                    }, {
                        key: "_shiftInMultipleMessages",
                        value: function (e) {
                            for (var t = e.length, n = [], r = e[0].conversationID, o = this.list.has(r) ? Array.from(this.list.get(r)) : [], i = 0; i < t; i++) n.push([e[i].ID, e[i]]);
                            this.list.set(r, new Map(n.concat(o)))
                        }
                    }, {
                        key: "remove",
                        value: function (e) {
                            var t = e.conversationID,
                                n = e.ID;
                            this.list.get(t).delete(n)
                        }
                    }]), e
                }(),
                fo = function () {
                    function e(t) {
                        A(this, e), this.tim = t
                    }
                    return O(e, [{
                        key: "setMessageRead",
                        value: function (e) {
                            var t = e.conversationID,
                                r = e.messageID,
                                o = this.tim.conversationController.getLocalConversation(t);
                            if (!o || 0 === o.unreadCount) return lt();
                            var i = r ? this.tim.messageController.getLocalMessage(t, r) : null;
                            switch (o.type) {
                                case n.C2C:
                                    return this._setC2CMessageRead({
                                        conversationID: t,
                                        lastMessageTime: i ? i.time : o.lastMessage.lastTime
                                    });
                                case n.GROUP:
                                    return this._setGroupMessageRead({
                                        conversationID: t,
                                        lastMessageSeq: i ? i.sequence : o.lastMessage.lastSequence
                                    });
                                case n.SYSTEM:
                                    return o.unreadCount = 0, lt();
                                default:
                                    return lt()
                            }
                        }
                    }, {
                        key: "_setC2CMessageRead",
                        value: function (e) {
                            var t = this,
                                n = e.conversationID,
                                r = e.lastMessageTime,
                                o = this.tim.messageController.createPackage({
                                    name: "conversation",
                                    action: "setC2CMessageRead",
                                    param: {
                                        C2CMsgReaded: {
                                            cookie: "",
                                            C2CMsgReadedItem: [{
                                                toAccount: n.replace("C2C", ""),
                                                lastMessageTime: r
                                            }]
                                        }
                                    }
                                });
                            return this._updateIsReadAfterReadReport({
                                conversationID: n,
                                lastMessageTime: r
                            }), this._updateUnreadCount(n), this.tim.connectionController.request(o).then(function () {
                                return new at
                            }).catch(function (e) {
                                return t.tim.innerEmitter.emit(_e.ERROR_DETECTED, e), Promise.reject(new at(e))
                            })
                        }
                    }, {
                        key: "_setGroupMessageRead",
                        value: function (e) {
                            var t = this,
                                n = e.conversationID,
                                r = e.lastMessageSeq,
                                o = this.tim.messageController.createPackage({
                                    name: "conversation",
                                    action: "setGroupMessageRead",
                                    param: {
                                        groupID: n.replace("GROUP", ""),
                                        messageReadSeq: r
                                    }
                                });
                            return this._updateIsReadAfterReadReport({
                                conversationID: n,
                                lastMessageSeq: r
                            }), this._updateUnreadCount(n), this.tim.connectionController.request(o).then(function () {
                                return new at
                            }).catch(function (e) {
                                return t.tim.innerEmitter.emit(_e.ERROR_DETECTED, e), Promise.reject(new at(e))
                            })
                        }
                    }, {
                        key: "_updateUnreadCount",
                        value: function (e) {
                            var t = this.tim,
                                n = t.conversationController,
                                r = t.messageController,
                                o = n.getLocalConversation(e),
                                i = r.getLocalMessageList(e);
                            o && (o.unreadCount = i.filter(function (e) {
                                return !e.isRead
                            }).length)
                        }
                    }, {
                        key: "_updateIsReadAfterReadReport",
                        value: function (e) {
                            var t = e.conversationID,
                                n = e.lastMessageSeq,
                                r = e.lastMessageTime,
                                o = this.tim.messageController.getLocalMessageList(t);
                            if (0 !== o.length)
                                for (var i = o.length - 1; i >= 0; i--) {
                                    var s = o[i];
                                    if (!(r && s.time > r || n && s.sequence > n)) {
                                        if ("in" === s.flow && s.isRead) break;
                                        s.isRead = 1
                                    }
                                }
                        }
                    }, {
                        key: "updateIsRead",
                        value: function (e) {
                            var t = this.tim,
                                r = t.conversationController,
                                o = t.messageController,
                                i = r.getLocalConversation(e),
                                s = o.getLocalMessageList(e);
                            if (i && 0 !== s.length && [n.C2C, n.GROUP].includes(i.type))
                                for (var a = 0; a < s.length - i.unreadCount && !s[a].isRead; a++) s[a].isRead = 1
                        }
                    }]), e
                }(),
                go = function () {
                    function e(t) {
                        var n = t.tim,
                            r = t.messageController;
                        A(this, e), this.tim = n, this.messageController = r, this.completedMap = new Map, this._initListener()
                    }
                    return O(e, [{
                        key: "getMessageList",
                        value: function (e) {
                            var t = this,
                                n = e.conversationID,
                                r = e.nextReqMessageID,
                                o = e.count,
                                i = void 0 === o ? 15 : o,
                                s = this._computeLeftCount({
                                    conversationID: n,
                                    nextReqMessageID: r
                                });
                            return this._needGetHistory({
                                conversationID: n,
                                leftCount: s,
                                count: i
                            }) ? this.messageController.getHistoryMessages({
                                conversationID: n,
                                count: 20
                            }).then(function () {
                                return s = t._computeLeftCount({
                                    conversationID: n,
                                    nextReqMessageID: r
                                }), new at(t._computeResult({
                                    conversationID: n,
                                    nextReqMessageID: r,
                                    count: i,
                                    leftCount: s
                                }))
                            }) : lt(this._computeResult({
                                conversationID: n,
                                nextReqMessageID: r,
                                count: i,
                                leftCount: s
                            }))
                        }
                    }, {
                        key: "setCompleted",
                        value: function (e) {
                            this.completedMap.set(e, 1)
                        }
                    }, {
                        key: "_initListener",
                        value: function () {
                            var e = this;
                            this.tim.innerEmitter.on(_e.SDK_READY, function () {
                                e.completedMap.set(n.SYSTEM, 1)
                            }), this.tim.innerEmitter.on(_e.AVCHATROOM_JOIN_SUCCESS, function (t) {
                                var r = t.data;
                                e.completedMap.set("".concat(n.GROUP).concat(r))
                            })
                        }
                    }, {
                        key: "_hasMessageList",
                        value: function (e) {
                            return this.messageController.messagesList.list.has(e)
                        }
                    }, {
                        key: "_getMessageListSize",
                        value: function (e) {
                            var t = this.messageController.messagesList.list.get(e);
                            return t ? t.size : 0
                        }
                    }, {
                        key: "_needGetHistory",
                        value: function (e) {
                            var t = e.conversationID,
                                o = e.leftCount,
                                i = e.count,
                                s = this.tim.conversationController.getLocalConversation(t),
                                a = s ? s.type === n.SYSTEM : 0,
                                u = s ? s.subType === r.AVCHATROOM : 0;
                            return a || u ? 0 : o < i && !this.completedMap.has(t)
                        }
                    }, {
                        key: "_computeResult",
                        value: function (e) {
                            var t = e.conversationID,
                                n = e.nextReqMessageID,
                                r = e.count,
                                o = e.leftCount,
                                i = this._computeMessageList({
                                    conversationID: t,
                                    nextReqMessageID: n,
                                    count: r
                                }),
                                s = this._computeIsCompleted({
                                    conversationID: t,
                                    leftCount: o,
                                    count: r
                                });
                            return {
                                messageList: i,
                                nextReqMessageID: this._computeNextReqMessageID({
                                    messageList: i,
                                    isCompleted: s,
                                    conversationID: t
                                }),
                                isCompleted: s
                            }
                        }
                    }, {
                        key: "_computeNextReqMessageID",
                        value: function (e) {
                            var t = e.messageList,
                                n = e.isCompleted,
                                r = e.conversationID;
                            if (!n) return 0 === t.length ? "" : t[0].ID;
                            var o = this.messageController.getLocalMessageList(r);
                            return 0 === o.length ? "" : o[0].ID
                        }
                    }, {
                        key: "_computeMessageList",
                        value: function (e) {
                            var t = e.conversationID,
                                n = e.nextReqMessageID,
                                r = e.count,
                                o = this.messageController.getLocalMessageList(t),
                                i = this._computeIndexEnd({
                                    nextReqMessageID: n,
                                    messageList: o
                                }),
                                s = this._computeIndexStart({
                                    indexEnd: i,
                                    count: r
                                });
                            return o.slice(s, i)
                        }
                    }, {
                        key: "_computeIndexEnd",
                        value: function (e) {
                            var t = e.messageList,
                                n = void 0 === t ? [] : t,
                                r = e.nextReqMessageID;
                            return r ? n.findIndex(function (e) {
                                return e.ID === r
                            }) : n.length
                        }
                    }, {
                        key: "_computeIndexStart",
                        value: function (e) {
                            var t = e.indexEnd,
                                n = e.count;
                            return t > n ? t - n : 0
                        }
                    }, {
                        key: "_computeLeftCount",
                        value: function (e) {
                            var t = e.conversationID,
                                n = e.nextReqMessageID;
                            return n ? this.messageController.getLocalMessageList(t).findIndex(function (e) {
                                return e.ID === n
                            }) : this._getMessageListSize(t)
                        }
                    }, {
                        key: "_computeIsCompleted",
                        value: function (e) {
                            var t = e.conversationID;
                            return e.leftCount <= e.count && this.completedMap.has(t) ? 1 : 0
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this.completedMap.clear()
                        }
                    }]), e
                }(),
                _o = new(function () {
                    function e() {
                        A(this, e), this.map = new Map, this.thresholdValue = 10
                    }
                    return O(e, [{
                        key: "push",
                        value: function (e, t) {
                            if (this.map.has(e)) {
                                var n = this.map.get(e);
                                n.push(t), this.needReport(n) && (this.report(n, e), this.map.delete(e))
                            } else this.map.set(e, [t])
                        }
                    }, {
                        key: "needReport",
                        value: function (e) {
                            return e.length === this.thresholdValue
                        }
                    }, {
                        key: "report",
                        value: function (e, t) {
                            var n = e.reduce(function (e, t) {
                                    return e + t
                                }) / e.length,
                                r = Math.min.apply(null, e),
                                o = Math.max.apply(null, e);
                            Ge.log("AverageCalculator.report ".concat(t, " count=").concat(e.length, " average=").concat(n, "ms max=").concat(o, "ms min=").concat(r, "ms"))
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this.map.clear()
                        }
                    }]), e
                }()),
                mo = function () {
                    function e(t, n) {
                        A(this, e), this.options = n || {
                            enablePointer: 1
                        }, this.taskName = t || ["task", this._timeFormat()].join("-"), this.pointsList = [], this.reportText = {}, this.maxNameLen = 0, this.gapChar = "…", this.log = console.log, this.currentTask = ""
                    }
                    return O(e, [{
                        key: "dot",
                        value: function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                            if (0 != this.options.enablePointer) {
                                var t = Date.now();
                                this.maxNameLen = this.maxNameLen < e.length ? e.length : this.maxNameLen, this.flen = this.maxNameLen + 10, this.pointsList.push({
                                    pointerName: e,
                                    time: t
                                })
                            }
                        }
                    }, {
                        key: "_analisys",
                        value: function () {
                            if (0 != this.options.enablePointer) {
                                for (var e = this.pointsList, t = e.length, n = [], r = [], o = 0; o < t; o++) 0 !== o && (r = this._analisysTowPoints(e[o - 1], e[o]), n.push(r.join("")));
                                return r = this._analisysTowPoints(e[0], e[t - 1], 1), n.push(r.join("")), n.join("")
                            }
                        }
                    }, {
                        key: "_analisysTowPoints",
                        value: function (e, t) {
                            if (0 != this.options.enablePointer) {
                                var n = (t.time - e.time).toString();
                                return ["(", e.pointerName, ")->(", t.pointerName, ")=", n, "ms;"]
                            }
                        }
                    }, {
                        key: "report",
                        value: function () {
                            0 != this.options.enablePointer && Ge.log(this.reportString())
                        }
                    }, {
                        key: "reportString",
                        value: function () {
                            var e = this._analisys();
                            this.pointsList = [];
                            var t = "".concat(this.taskName);
                            return "".concat(t, " report：").concat(e)
                        }
                    }, {
                        key: "_timeFormat",
                        value: function () {
                            var e = new Date,
                                t = this.zeroFix(e.getMonth() + 1, 2),
                                n = this.zeroFix(e.getDate(), 2);
                            return "".concat(t, "-").concat(n, " ").concat(e.getHours(), ":").concat(e.getSeconds(), ":").concat(e.getMinutes(), ".").concat(e.getMilliseconds())
                        }
                    }, {
                        key: "zeroFix",
                        value: function (e, t) {
                            return ("000000000" + e).slice(-t)
                        }
                    }]), e
                }(),
                Eo = function (e, t) {
                    return new mo(e, t)
                },
                yo = function e(t) {
                    A(this, e), this.value = t, this.next = null
                },
                vo = function () {
                    function e(t) {
                        A(this, e), this.MAX_LENGTH = t, this.pTail = null, this.pNodeToDel = null, this.map = new Map, Ge.log("SinglyLinkedList init MAX_LENGTH=".concat(this.MAX_LENGTH))
                    }
                    return O(e, [{
                        key: "pushIn",
                        value: function (e) {
                            var t = new yo(e);
                            if (this.map.size < this.MAX_LENGTH) null === this.pTail ? (this.pTail = t, this.pNodeToDel = t) : (this.pTail.next = t, this.pTail = t), this.map.set(e, 1);
                            else {
                                var n = this.pNodeToDel;
                                this.pNodeToDel = this.pNodeToDel.next, this.map.delete(n.value), n.next = null, n = null, this.pTail.next = t, this.pTail = t, this.map.set(e, 1)
                            }
                        }
                    }, {
                        key: "has",
                        value: function (e) {
                            return this.map.has(e)
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            for (var e; null !== this.pNodeToDel;) e = this.pNodeToDel, this.pNodeToDel = this.pNodeToDel.next, e.next = null, e = null;
                            this.pTail = null, this.map.clear()
                        }
                    }]), e
                }(),
                Io = function (r) {
                    function o(e) {
                        var t;
                        return A(this, o), (t = F(this, G(o).call(this, e)))._initializeMembers(), t._initializeListener(), t._initialzeHandlers(), t._IAmReady(), t
                    }
                    return P(o, nt), O(o, [{
                        key: "_IAmReady",
                        value: function () {
                            this.triggerReady()
                        }
                    }, {
                        key: "_initializeMembers",
                        value: function () {
                            this.messagesList = new ho({
                                tim: this.tim
                            }), this.currentMessageKey = {}, this.singlyLinkedList = new vo(100)
                        }
                    }, {
                        key: "_initialzeHandlers",
                        value: function () {
                            this.readReportHandler = new fo(this.tim), this.getMessageHandler = new go({
                                messageController: this,
                                tim: this.tim
                            })
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this.messagesList = null, this.messagesList = new ho({
                                tim: this.tim
                            }), this.currentMessageKey = {}, this.getMessageHandler.reset(), this.singlyLinkedList.reset()
                        }
                    }, {
                        key: "_initializeListener",
                        value: function () {
                            var e = this.tim.innerEmitter;
                            e.on(_e.NOTICE_LONGPOLL_NEW_C2C_NOTICE, this._onReceiveC2CMessage, this), e.on(_e.SYNC_MESSAGE_C2C_PROCESSING, this._onReceiveC2CMessage, this), e.on(_e.SYNC_MESSAGE_C2C_FINISHED, this._onReceiveC2CMessage, this), e.on(_e.NOTICE_LONGPOLL_NEW_GROUP_MESSAGES, this._onReceiveGroupMessage, this), e.on(_e.NOTICE_LONGPOLL_NEW_GROUP_TIPS, this._onReceiveGroupTips, this), e.on(_e.NOTICE_LONGPOLL_NEW_GROUP_NOTICE, this._onReceiveSystemNotice, this)
                        }
                    }, {
                        key: "sendMessageInstance",
                        value: function (e) {
                            var t = this,
                                r = Eo("MessageController.sendMessageInstance(), ".concat(e.ID), this.tim.options),
                                o = this.tim.innerEmitter;
                            if (1 == e.isError()) return r.dot("message error"), r.report(), pt(e.getIMError());
                            if (0 == e.isSendable()) return r.dot("message unsendable"), r.report(), pt({
                                code: ie.MESSAGE_FILE_URL_IS_EMPTY,
                                message: se.MESSAGE_FILE_URL_IS_EMPTY
                            });
                            var i = null,
                                s = null,
                                a = null;
                            switch (r.dot("innerEmitter ".concat(_e.MESSAGE_SENDING)), o.emit(_e.MESSAGE_SENDING, {
                                data: {
                                    eventDataList: [{
                                        conversationID: e.conversationID,
                                        unreadCount: 0,
                                        type: e.conversationType,
                                        subType: e.conversationSubType,
                                        lastMessage: e
                                    }]
                                }
                            }), r.dot("init handles ".concat(e.conversationType)), e.conversationType) {
                                case n.C2C:
                                    i = this._createC2CMessagePack(e), s = this._handleOnSendC2CMessageSuccess.bind(this), a = this._handleOnSendC2CMessageFail.bind(this);
                                    break;
                                case n.GROUP:
                                    i = this._createGroupMessagePack(e), s = this._handleOnSendGroupMessageSuccess.bind(this), a = this._handleOnSendGroupMessageFail.bind(this);
                                    break;
                                default:
                                    return r.dot("error ".concat(e.conversationType)), r.report(), pt(new ae({
                                        code: ie.MESSAGE_SEND_INVALID_CONVERSATION_TYPE,
                                        message: se.MESSAGE_SEND_INVALID_CONVERSATION_TYPE
                                    }))
                            }
                            return this.singlyLinkedList.pushIn(e.random), this.tim.connectionController.request(i).then(function (o) {
                                return r.dot("send success"), e.conversationType === n.GROUP && (r.dot("updateID"), e.sequence = o.data.sequence, e.time = o.data.time, e.generateMessageID(t.tim.context.identifier)), r.dot("pushIn"), t.messagesList.pushIn(e), s(e, o.data), r.report(), new at({
                                    message: e
                                })
                            }).catch(function (t) {
                                return a(e, t), r.dot("send fail"), Ge.error("MessageController.sendMessageInstance() error:", t), r.report(), pt(new ae({
                                    code: ie.MESSAGE_SEND_FAIL,
                                    message: se.MESSAGE_SEND_FAIL,
                                    data: {
                                        message: e
                                    }
                                }))
                            })
                        }
                    }, {
                        key: "resendMessage",
                        value: function (e) {
                            return 1 == this._isFileLikeMessage(e) ? (Ge.warn("MessageController.resendMessage(), file like message can not resendBy SDK.resendMessage()"), pt(new ae({
                                code: ie.MESSAGE_RESEND_FILE_UNSUPPORTED,
                                message: se.MESSAGE_RESEND_FILE_UNSUPPORTED
                            }))) : (e.isResend = 1, e.status = it.MESSAGE_STATUS.UNSEND, this.sendMessageInstance(e))
                        }
                    }, {
                        key: "_isFileLikeMessage",
                        value: function (e) {
                            var n = t.ELEMENT_TYPES,
                                r = [n.IMAGE, n.FILE, n.SOUND, n.VIDEO],
                                o = e.elements[0];
                            return r.indexOf(o.type) >= 0 ? 1 : 0
                        }
                    }, {
                        key: "_resendBinaryTypeMessage",
                        value: function () {}
                    }, {
                        key: "sendC2CMessage",
                        value: function (t) {
                            var n = this,
                                r = this.tim.outerEmitter;
                            t.currentUser = this.tim.context.identifier, t.from = this.tim.context.identifier;
                            var o = new io(t);
                            this.messagesList.pushIn(o), o.status = it.MESSAGE_STATUS.UNSEND, r.emit(e.MESSAGE_SENDING, o);
                            var i = this._createC2CMessagePack(o);
                            return this.tim.connectionController.request(i).then(function (e) {
                                n._handleOnSendC2CMessageSuccess(o, e.data)
                            }).catch(function (e) {
                                n._handleOnSendC2CMessageFail(o, e)
                            })
                        }
                    }, {
                        key: "_createC2CMessagePack",
                        value: function (e) {
                            return this.createPackage({
                                name: "c2cMessage",
                                action: "create",
                                param: {
                                    toAccount: e.to,
                                    msgBody: e.elements,
                                    msgSeq: e.sequence,
                                    msgRandom: e.random,
                                    offlinePushInfo: {
                                        desc: "offline message push",
                                        ext: "offline message push"
                                    }
                                }
                            })
                        }
                    }, {
                        key: "_handleOnSendC2CMessageSuccess",
                        value: function (t, n) {
                            var r = this.tim,
                                o = r.innerEmitter,
                                i = r.outerEmitter;
                            t.status = it.MESSAGE_STATUS.SUCCESS, t.time = n.time, o.emit(_e.MESSAGE_C2C_SEND_SUCCESS, {
                                data: {
                                    eventDataList: [{
                                        conversationID: t.conversationID,
                                        unreadCount: 0,
                                        type: t.conversationType,
                                        subType: t.conversationSubType,
                                        lastMessage: t
                                    }]
                                }
                            }), i.emit(e.MESSAGE_SEND_SUCCESS, t)
                        }
                    }, {
                        key: "_handleOnSendC2CMessageFail",
                        value: function (t, n) {
                            var r = this.tim,
                                o = r.innerEmitter,
                                i = r.outerEmitter;
                            t.status = it.MESSAGE_STATUS.FAIL, o.emit(_e.ERROR_DETECTED, n), i.emit(e.MESSAGE_SEND_FAIL, t)
                        }
                    }, {
                        key: "sendGroupMessage",
                        value: function (t) {
                            var n = this,
                                r = this.tim.outerEmitter;
                            t.currentUser = this.tim.context.identifier, t.from = this.tim.context.identifier;
                            var o = new io(t);
                            this.messagesList.pushIn(o), o.status = it.MESSAGE_STATUS.UNSEND, r.emit(e.MESSAGE_SENDING, o);
                            var i = this._createGroupMessagePack(t.groupID, o.elements);
                            return this.tim.connectionController.request(i).then(function (e) {
                                n._handleOnSendGroupMessageSuccess(o, e.data)
                            }).catch(function (e) {
                                n._handleOnSendGroupMessageFail(e, o)
                            })
                        }
                    }, {
                        key: "_createGroupMessagePack",
                        value: function (e) {
                            return this.createPackage({
                                name: "groupMessage",
                                action: "create",
                                param: {
                                    groupID: e.to,
                                    msgBody: e.elements,
                                    random: e.random,
                                    clientSequence: e.clientSequence,
                                    offlinePushInfo: {
                                        desc: "offline message push",
                                        ext: "offline message push"
                                    }
                                }
                            })
                        }
                    }, {
                        key: "_handleOnSendGroupMessageSuccess",
                        value: function (t, n) {
                            var r = this.tim,
                                o = r.innerEmitter,
                                i = r.outerEmitter;
                            t.sequence = n.sequence, t.time = n.time, t.status = it.MESSAGE_STATUS.SUCCESS, o.emit(_e.MESSAGE_GROUP_SEND_SUCCESS, {
                                data: {
                                    eventDataList: [{
                                        conversationID: t.conversationID,
                                        unreadCount: 0,
                                        type: t.conversationType,
                                        subType: t.conversationSubType,
                                        lastMessage: t
                                    }]
                                }
                            }), i.emit(e.MESSAGE_SEND_SUCCESS, t)
                        }
                    }, {
                        key: "_handleOnSendGroupMessageFail",
                        value: function (t, n) {
                            var r = this.tim,
                                o = r.innerEmitter,
                                i = r.outerEmitter;
                            t.status = it.MESSAGE_STATUS.FAIL, o.emit(_e.ERROR_DETECTED, n), i.emit(e.MESSAGE_SEND_FAIL, t)
                        }
                    }, {
                        key: "_onReceiveC2CMessage",
                        value: function (t) {
                            var r = this.tim,
                                o = r.innerEmitter,
                                i = r.outerEmitter;
                            Ge.log("MessageController._onReceiveC2CMessage(), get new messages");
                            var s = this._newC2CMessageStoredAndSummary(t.data, n.C2C),
                                a = s.eventDataList,
                                u = s.result;
                            o.emit(_e.MESSAGE_C2C_INSTANT_RECEIVED, {
                                data: {
                                    eventDataList: a,
                                    result: u
                                },
                                resource: this
                            }), u.length > 0 && i.emit(e.MESSAGE_RECEIVED, u)
                        }
                    }, {
                        key: "_onReceiveGroupMessage",
                        value: function (t) {
                            var n = this.tim,
                                r = n.outerEmitter,
                                o = n.innerEmitter,
                                i = this._newGroupMessageStoredAndSummary(t.data),
                                s = i.eventDataList,
                                a = i.result;
                            s.length > 0 && (Ge.log("MessageController._onReceiveGroupMessage()"), o.emit(_e.MESSAGE_GROUP_INSTANT_RECEIVED, {
                                data: {
                                    eventDataList: s,
                                    result: a,
                                    isGroupTip: 0
                                }
                            })), a.length > 0 && r.emit(e.MESSAGE_RECEIVED, a)
                        }
                    }, {
                        key: "_onReceiveGroupTips",
                        value: function (t) {
                            var r = this.tim,
                                o = r.outerEmitter,
                                i = r.innerEmitter,
                                s = t.data,
                                a = this._newGroupTipsStoredAndSummary(s, n.GROUP),
                                u = a.eventDataList,
                                c = a.result;
                            Ge.log("MessageController._onReceiveGroupTips()"), i.emit(_e.MESSAGE_GROUP_INSTANT_RECEIVED, {
                                data: {
                                    eventDataList: u,
                                    result: c,
                                    isGroupTip: 1
                                }
                            }), c.length > 0 && o.emit(e.MESSAGE_RECEIVED, c)
                        }
                    }, {
                        key: "_onReceiveSystemNotice",
                        value: function (t) {
                            var n = this.tim,
                                r = n.outerEmitter,
                                o = n.innerEmitter,
                                i = t.data,
                                s = i.groupSystemNotices,
                                a = i.type,
                                u = this._newSystemNoticeStoredAndSummary({
                                    notifiesList: s,
                                    type: a
                                }),
                                c = u.eventDataList,
                                l = u.result;
                            o.emit(_e.MESSAGE_GROUP_SYSTEM_NOTICE_RECEIVED, {
                                data: {
                                    eventDataList: c,
                                    result: l,
                                    type: a
                                }
                            }), l.length > 0 && r.emit(e.MESSAGE_RECEIVED, l)
                        }
                    }, {
                        key: "_pushIntoNoticeResult",
                        value: function (e, t) {
                            var n = this.messagesList.pushIn(t),
                                r = this.singlyLinkedList.has(t.random);
                            null !== n && 0 == r && e.push(t)
                        }
                    }, {
                        key: "_newC2CMessageStoredAndSummary",
                        value: function (e, t) {
                            for (var n = null, r = [], o = [], i = {}, s = 0, a = e.length; s < a; s++) {
                                var u = e[s];
                                u.currentUser = this.tim.context.identifier, u.conversationType = t, u.isSystemMessage = !!u.isSystemMessage, (n = new io(u)).setElement(u.elements[0]), this._pushIntoNoticeResult(o, n), void 0 === i[n.conversationID] ? i[n.conversationID] = r.push({
                                    conversationID: n.conversationID,
                                    unreadCount: "out" === n.flow ? 0 : 1,
                                    type: n.conversationType,
                                    subType: n.conversationSubType,
                                    lastMessage: n
                                }) - 1 : (r[i[n.conversationID]].type = n.conversationType, r[i[n.conversationID]].subType = n.conversationSubType, r[i[n.conversationID]].lastMessage = n, "in" === n.flow && r[i[n.conversationID]].unreadCount++)
                            }
                            return {
                                eventDataList: r,
                                result: o
                            }
                        }
                    }, {
                        key: "_newGroupMessageStoredAndSummary",
                        value: function (e) {
                            for (var t = null, r = [], o = {}, i = [], s = n.GROUP, a = 0, u = e.length; a < u; a++) {
                                var c = e[a];
                                c.currentUser = this.tim.context.identifier, c.conversationType = s, c.isSystemMessage = !!c.isSystemMessage, (t = new io(c)).setElement(c.elements[0]), this._pushIntoNoticeResult(i, t), void 0 === o[t.conversationID] ? o[t.conversationID] = r.push({
                                    conversationID: t.conversationID,
                                    unreadCount: "out" === t.flow ? 0 : 1,
                                    type: t.conversationType,
                                    subType: t.conversationSubType,
                                    lastMessage: t
                                }) - 1 : (r[o[t.conversationID]].type = t.conversationType, r[o[t.conversationID]].subType = t.conversationSubType, r[o[t.conversationID]].lastMessage = t, "in" === t.flow && r[o[t.conversationID]].unreadCount++)
                            }
                            return {
                                eventDataList: r,
                                result: i
                            }
                        }
                    }, {
                        key: "_newGroupTipsStoredAndSummary",
                        value: function (e, n) {
                            for (var r = null, o = [], i = [], s = {}, a = 0, u = e.length; a < u; a++) {
                                var c = e[a];
                                c.currentUser = this.tim.context.identifier, c.conversationType = n, (r = new io(c)).setElement({
                                    type: t.ELEMENT_TYPES.GROUP_TIP,
                                    content: R({}, c.elements, {
                                        groupProfile: c.groupProfile
                                    })
                                }), r.isSystemMessage = 0;
                                var l = this.messagesList.pushIn(r);
                                l && i.push(l), void 0 === s[r.conversationID] ? s[r.conversationID] = o.push({
                                    conversationID: r.conversationID,
                                    unreadCount: "out" === r.flow ? 0 : 1,
                                    type: r.conversationType,
                                    subType: r.conversationSubType,
                                    lastMessage: r
                                }) - 1 : (o[s[r.conversationID]].type = r.conversationType, o[s[r.conversationID]].subType = r.conversationSubType, o[s[r.conversationID]].lastMessage = r, "in" === r.flow && o[s[r.conversationID]].unreadCount++)
                            }
                            return {
                                eventDataList: o,
                                result: i
                            }
                        }
                    }, {
                        key: "_newSystemNoticeStoredAndSummary",
                        value: function (e) {
                            var r = e.notifiesList,
                                o = e.type,
                                i = null,
                                s = r.length,
                                a = 0,
                                u = [],
                                c = {
                                    conversationID: n.SYSTEM,
                                    unreadCount: 0,
                                    type: n.SYSTEM,
                                    subType: null,
                                    lastMessage: null
                                };
                            for (a = 0; a < s; a++) {
                                var l = r[a];
                                if (l.elements.operationType !== g) {
                                    l.currentUser = this.tim.context.identifier, l.conversationType = n.SYSTEM, l.conversationID = n.SYSTEM, (i = new io(l)).setElement({
                                        type: t.ELEMENT_TYPES.GROUP_SYSTEM_NOTICE,
                                        content: R({}, l.elements, {
                                            groupProfile: l.groupProfile
                                        })
                                    }), i.isRead = 1, i.isSystemMessage = 1;
                                    var p = this.messagesList.pushIn(i);
                                    p && (u.push(p), "poll" === o && c.unreadCount++), c.subType = i.conversationSubType
                                }
                            }
                            return c.lastMessage = u[u.length - 1], {
                                eventDataList: u.length > 0 ? [c] : [],
                                result: u
                            }
                        }
                    }, {
                        key: "_onSyncMessagesFinished",
                        value: function (e) {
                            for (var t = e.data, n = null, r = null, o = 0; o < t.length; o++)(r = t[o]).currentUser = this.tim.context.identifier, (n = new io(r)).setElement(r.elements[0]), this.messagesList.pushIn(n), n = null;
                            Ge.log("_onSyncMessagesFinished")
                        }
                    }, {
                        key: "getHistoryMessages",
                        value: function (e) {
                            if (e.conversationID === n.SYSTEM) return lt();
                            !e.count && (e.count = 15), e.count > 20 && (e.count = 20);
                            var t = this.messagesList.getLocalOldestMessageByConversationID(e.conversationID);
                            t || ((t = {}).time = 0, t.sequence = 0, 0 === e.conversationID.indexOf(n.C2C) ? (t.to = e.conversationID.replace(n.C2C, ""), t.conversationType = n.C2C) : 0 === e.conversationID.indexOf(n.GROUP) && (t.to = e.conversationID.replace(n.GROUP, ""), t.conversationType = n.GROUP));
                            var r = "";
                            switch (t.conversationType) {
                                case n.C2C:
                                    return r = e.conversationID.replace(n.C2C, ""), this.getC2CRoamMessages({
                                        conversationID: e.conversationID,
                                        peerAccount: r,
                                        count: e.count,
                                        lastMessageTime: void 0 === this.currentMessageKey[e.conversationID] ? 0 : t.time
                                    });
                                case n.GROUP:
                                    return this.getGroupRoamMessages({
                                        conversationID: e.conversationID,
                                        groupID: t.to,
                                        count: e.count,
                                        sequence: t.sequence - 1
                                    });
                                default:
                                    return lt()
                            }
                        }
                    }, {
                        key: "getC2CRoamMessages",
                        value: function (e) {
                            var t = this,
                                r = this.tim,
                                o = r.connectionController,
                                i = r.innerEmitter,
                                s = void 0 !== this.currentMessageKey[e.conversationID] ? this.currentMessageKey[e.conversationID] : "",
                                a = this.createPackage({
                                    name: "c2cMessage",
                                    action: "query",
                                    param: {
                                        peerAccount: e.peerAccount,
                                        count: e.count || 15,
                                        lastMessageTime: e.lastMessageTime || 0,
                                        messageKey: s
                                    }
                                });
                            return o.request(a).then(function (r) {
                                var o = r.data,
                                    i = o.complete,
                                    s = o.messageList;
                                1 === i && t.getMessageHandler.setCompleted(e.conversationID);
                                var a = t._roamMessageStore(s, n.C2C, e.conversationID);
                                return t.readReportHandler.updateIsRead(e.conversationID), t.currentMessageKey[e.conversationID] = r.data.messageKey, a
                            }).catch(function (e) {
                                return i.emit(_e.ERROR_DETECTED, e), Promise.reject(e)
                            })
                        }
                    }, {
                        key: "getC2CRoamMessagesSliced",
                        value: function (e) {
                            var t = this.tim.connectionController,
                                r = this;
                            return function (e) {
                                return new Promise(function (o, i) {
                                    ! function e(o, i, s) {
                                        var a = this,
                                            u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
                                            c = r.createPackage({
                                                name: "c2cMessage",
                                                action: "query",
                                                param: {
                                                    peerAccount: o.peerAccount,
                                                    count: o.count || 15,
                                                    lastMessageTime: o.lastMessageTime || 0,
                                                    messageKey: o.messageKey || ""
                                                }
                                            }),
                                            l = t.request(c).then(function (t) {
                                                var r = t.data.messageList,
                                                    c = a._roamMessageStore(r, n.C2C);
                                                u.push.apply(u, x(c)), t.data.complete === it.GET_HISTORY_MESSAGE_STATUS.C2C_IS_NOT_FINISHED ? (o.messageKey = t.data.messageKey, e(o, i, u)) : t.data.complete === it.GET_HISTORY_MESSAGE_STATUS.C2C_IS_FINISHED ? (Ge.log("getC2CRoamMessages finised..."), i(new at(u))) : s(new ae({
                                                    code: ie.MESSAGE_UNKNOW_ROMA_LIST_END_FLAG_FIELD,
                                                    message: se.MESSAGE_UNKNOW_ROMA_LIST_END_FLAG_FIELD
                                                }))
                                            }).reject(function (e) {
                                                Ge.log("getC2CRoamMessages fail..."), s(e)
                                            });
                                        return l
                                    }(e, o, i, [])
                                })
                            }(e)
                        }
                    }, {
                        key: "getGroupRoamMessages",
                        value: function (e) {
                            var t = this,
                                r = this.tim,
                                o = r.connectionController,
                                i = r.conversationController,
                                s = e.conversationID,
                                a = e.sequence >= 0 ? e.sequence : i.getLocalConversationLastSequence(s);
                            if (a < 0) return lt([]);
                            var u = this.createPackage({
                                name: "groupMessage",
                                action: "query",
                                param: {
                                    groupID: e.groupID,
                                    count: e.count,
                                    sequence: a
                                }
                            });
                            return o.request(u).then(function (r) {
                                var o = r.data.messagesList,
                                    i = "GROUP".concat(e.groupID);
                                Array.isArray(o) && o.length < e.count && t.getMessageHandler.setCompleted(i);
                                var s = t._roamMessageStore(o, n.GROUP, i);
                                return t.readReportHandler.updateIsRead(i), Ge.log("getGroupRoamMessages fnished..."), s
                            }).catch(function (e) {
                                return t.tim.exceptionController.ask(e), Ge.log("getGroupRoamMessages error..."), Promise.reject(e)
                            })
                        }
                    }, {
                        key: "_roamMessageStore",
                        value: function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                                r = arguments.length > 1 ? arguments[1] : void 0,
                                o = arguments.length > 2 ? arguments[2] : void 0,
                                i = null,
                                s = [],
                                a = 0,
                                u = e.length,
                                c = null,
                                l = r === n.GROUP,
                                p = function () {
                                    a = r === n.GROUP ? e.length - 1 : 0, u = r === n.GROUP ? 0 : e.length
                                },
                                h = function () {
                                    r === n.GROUP ? --a : ++a
                                },
                                f = function () {
                                    return r === n.GROUP ? a >= u : a < u
                                };
                            for (l && 0 === e.length && this.getMessageHandler.setCompleted(o), p(); f(); h()) 0 !== e[a].elements.length || 0 !== e[a].time ? (l && 1 === e[a].sequence && this.getMessageHandler.setCompleted(o), (i = new io(e[a])).to = e[a].to, i.isSystemMessage = !!e[a].isSystemMessage, i.conversationType = r, c = e[a].event === t.JSON.TYPE.GROUP.TIP ? {
                                type: t.ELEMENT_TYPES.GROUP_TIP,
                                content: R({}, e[a].elements, {
                                    groupProfile: e[a].groupProfile
                                })
                            } : e[a].elements[0], i.setElement(c), i.reInitialize(this.tim.context.identifier), s.push(i)) : this.getMessageHandler.setCompleted(o);
                            return this.messagesList.shiftIn(s), p = h = f = null, s
                        }
                    }, {
                        key: "getLocalMessageList",
                        value: function (e) {
                            return this.messagesList.list.has(e) ? x(this.messagesList.list.get(e).values()) : []
                        }
                    }, {
                        key: "getLocalMessage",
                        value: function (e, t) {
                            var n = this.messagesList.list.get(e);
                            if (!n) return null;
                            var r = n.get(t);
                            return r || null
                        }
                    }, {
                        key: "setMessageRead",
                        value: function (e) {
                            return this.readReportHandler.setMessageRead(e)
                        }
                    }, {
                        key: "getMessageList",
                        value: function (e) {
                            return this.getMessageHandler.getMessageList(e)
                        }
                    }, {
                        key: "createTextMessage",
                        value: function (e) {
                            e.currentUser = this.tim.context.identifier;
                            var t = new io(e),
                                n = "string" == typeof e.payload ? e.payload : e.payload.text,
                                r = new zr({
                                    text: n
                                });
                            return t.setElement(r), t
                        }
                    }, {
                        key: "createCustomMessage",
                        value: function (e) {
                            e.currentUser = this.tim.context.identifier;
                            var t = new io(e),
                                n = new ro({
                                    data: e.payload.data,
                                    description: e.payload.description,
                                    extension: e.payload.extension
                                });
                            return t.setElement(n), t
                        }
                    }, {
                        key: "createImageMessage",
                        value: function (e) {
                            var t = this.tim.uploadController;
                            e.currentUser = this.tim.context.identifier;
                            var n = new io(e),
                                r = new Xr({
                                    imageFormat: "UNKNOWN",
                                    uuid: ["fake", Be(), Be()].join("-"),
                                    file: e.payload.file
                                });
                            return t.uploadImage({
                                file: e.payload.file,
                                to: e.to,
                                onProgress: function (t) {
                                    r.updatePercent.bind(r)(t), "function" == typeof e.onProgress && e.onProgress(t)
                                }
                            }).then(function (e) {
                                var t, n = ["https://", e.location].join("");
                                return r.updateImageFormat(e.fileType), r.updateImageInfoArray({
                                    size: e.fileSize,
                                    url: n
                                }), t = r._imageMemoryURL, Ee ? new Promise(function (e, n) {
                                    wx.getImageInfo({
                                        src: t,
                                        success: function (t) {
                                            e({
                                                width: t.width,
                                                height: t.height
                                            })
                                        },
                                        fail: function () {
                                            e({
                                                width: 0,
                                                height: 0
                                            })
                                        }
                                    })
                                }) : De && 9 === Ae ? Promise.resolve({
                                    width: 0,
                                    height: 0
                                }) : new Promise(function (e, n) {
                                    var r = new Image;
                                    r.onload = function () {
                                        e({
                                            width: this.width,
                                            height: this.height
                                        }), r = null
                                    }, r.onerror = function () {
                                        e({
                                            width: 0,
                                            height: 0
                                        }), r = null
                                    }, r.src = t
                                })
                            }).then(function (e) {
                                0 !== e.width && 0 !== e.height && (Ge.log("MessageController.probeImageWidthHeight width=".concat(e.width, " height=").concat(e.height)), r.updateImageInfoArray({
                                    width: e.width,
                                    height: e.height
                                })), n.triggerOperated()
                            }).catch(function (e) {
                                n.status = it.MESSAGE_STATUS.FAIL, Ge.warn("MessageController.createImageMessage(), error:", JSON.stringify(e))
                            }), n.setElement(r), n
                        }
                    }, {
                        key: "createFileMessage",
                        value: function (e) {
                            if (Ee) return pt({
                                code: ie.MESSAGE_FILE_WECHAT_MINIAPP_NOT_SUPPORT,
                                message: se.MESSAGE_FILE_WECHAT_MINIAPP_NOT_SUPPORT
                            });
                            var t = this.tim.uploadController;
                            e.currentUser = this.tim.context.identifier;
                            var n = new io(e),
                                r = new no({
                                    uuid: ["fake", Be(), Be()].join("-"),
                                    file: e.payload.file
                                });
                            return t.uploadFile({
                                file: e.payload.file,
                                to: e.to,
                                onProgress: function (t) {
                                    r.updatePercent.bind(r)(t), "function" == typeof e.onProgress && e.onProgress(t)
                                }
                            }).then(function (e) {
                                var t = ["https://", e.location].join("");
                                r.updateFileUrl(t), Ge.log("MessageController.createFileMessage(), file upload success, URL: ".concat(t)), n.triggerOperated()
                            }).catch(function (e) {
                                n.status = it.MESSAGE_STATUS.FAIL, e.code === ie.MESSAGE_FILE_SIZE_LIMIT && n.setError(e.code, e.message), Ge.warn("MessageController.createFileMessage(), file upload fail, error response: ", e), n.triggerOperated()
                            }), n.setElement(r), n
                        }
                    }, {
                        key: "createFaceMessage",
                        value: function (e) {
                            e.currentUser = this.tim.context.identifier;
                            var t = new io(e),
                                n = "string" == typeof e.payload ? e.payload : e.payload.text,
                                r = new zr({
                                    text: n
                                });
                            return t.setElement(r), t
                        }
                    }]), o
                }(),
                So = function () {
                    function e(t) {
                        A(this, e), this.userID = "", this.avatar = "", this.nick = "", this.role = "", this.joinTime = "", this.lastSendMsgTime = "", this.nameCard = "", this.muteUntil = 0, this.memberCustomField = [], this._initMember(t)
                    }
                    return O(e, [{
                        key: "_initMember",
                        value: function (e) {
                            this.updateMember(e)
                        }
                    }, {
                        key: "updateMember",
                        value: function (e) {
                            Ke(this, e, [], [null, void 0, "", 0, NaN])
                        }
                    }, {
                        key: "updateRole",
                        value: function (e) {
                            ["Owner", "Admin", "Member"].indexOf(e) < 0 || (this.role = e)
                        }
                    }, {
                        key: "updateMemberCustomField",
                        value: function (e) {
                            Ke(this.memberCustomField, e)
                        }
                    }]), e
                }(),
                To = function () {
                    function e(t) {
                        A(this, e), this.tim = t.tim, this.groupController = t.groupController, this._initListeners()
                    }
                    return O(e, [{
                        key: "_initListeners",
                        value: function () {
                            this.tim.innerEmitter.on(_e.MESSAGE_GROUP_INSTANT_RECEIVED, this._onReceivedGroupTips, this)
                        }
                    }, {
                        key: "_onReceivedGroupTips",
                        value: function (e) {
                            var t = this,
                                n = e.data,
                                r = n.result;
                            n.isGroupTip && r.forEach(function (e) {
                                switch (e.elements[0].content.operationType) {
                                    case 1:
                                        t._onNewMemberComeIn(e);
                                        break;
                                    case 2:
                                        t._onMemberQuit(e);
                                        break;
                                    case 3:
                                        t._onMemberKickedOut(e);
                                        break;
                                    case 4:
                                        t._onMemberSetAdmin(e);
                                        break;
                                    case 5:
                                        t._onMemberCancelledAdmin(e);
                                        break;
                                    case 6:
                                        t._onGroupProfileModified(e);
                                        break;
                                    case 7:
                                        t._onMemberInfoModified(e);
                                        break;
                                    default:
                                        Ge.warn("GroupTipsHandler._onReceivedGroupTips Unhandled groupTips. operationType=", e.elements[0].content.operationType)
                                }
                            })
                        }
                    }, {
                        key: "_onNewMemberComeIn",
                        value: function (e) {
                            var t = 0,
                                n = e.elements[0].content.groupProfile.groupID,
                                r = e.elements[0].content.userIDList;
                            if (this.groupController.hasLocalGroupMemberMap(n))
                                for (var o = 0; o < r.length; o++) {
                                    var i = r[0];
                                    if (!this.groupController.getLocalGroupMemberInfo(n, i)) {
                                        t = 1;
                                        break
                                    }
                                }
                            t && this.groupController.updateGroupMemberList({
                                groupID: n
                            })
                        }
                    }, {
                        key: "_onMemberQuit",
                        value: function (e) {
                            var t = e.elements[0].content.groupProfile.groupID;
                            this.groupController._deleteLocalGroupMembers(t, e.elements[0].content.userIDList)
                        }
                    }, {
                        key: "_onMemberKickedOut",
                        value: function (e) {
                            var t = e.elements[0].content.groupProfile.groupID;
                            this.groupController._deleteLocalGroupMembers(t, e.elements[0].content.userIDList)
                        }
                    }, {
                        key: "_onMemberSetAdmin",
                        value: function (e) {
                            var t = this,
                                n = e.elements[0].content.groupProfile.groupID;
                            e.elements[0].content.userIDList.forEach(function (e) {
                                var r = t.groupController.getLocalGroupMemberInfo(n, e);
                                r && r.updateRole(o.ADMIN)
                            })
                        }
                    }, {
                        key: "_onMemberCancelledAdmin",
                        value: function (e) {
                            var t = this,
                                n = e.elements[0].content.groupProfile.groupID;
                            e.elements[0].content.userIDList.forEach(function (e) {
                                var r = t.groupController.getLocalGroupMemberInfo(n, e);
                                r && r.updateRole(o.MEMBER)
                            })
                        }
                    }, {
                        key: "_onGroupProfileModified",
                        value: function (e) {
                            var t = this,
                                n = e.elements[0].content.newGroupProfile,
                                r = e.elements[0].content.groupProfile.groupID,
                                o = this.groupController.getLocalGroupProfile(r);
                            Object.keys(n).forEach(function (e) {
                                switch (e) {
                                    case "ownerID":
                                        t._ownerChaged(o, n);
                                        break;
                                    default:
                                        o[e] = n[e]
                                }
                            }), this.groupController._emitGroupUpdate(1, 1)
                        }
                    }, {
                        key: "_ownerChaged",
                        value: function (e, t) {
                            var n = e.groupID,
                                r = this.groupController.getLocalGroupProfile(n),
                                i = this.tim.context.identifier;
                            if (i === t.ownerID) {
                                r.updateGroup({
                                    selfInfo: {
                                        role: o.OWNER
                                    }
                                });
                                var s = this.groupController.getLocalGroupMemberInfo(n, i),
                                    a = this.groupController.getLocalGroupProfile(n).ownerID,
                                    u = this.groupController.getLocalGroupMemberInfo(n, a);
                                s && s.updateRole(o.OWNER), u && u.updateRole(o.MEMBER)
                            }
                        }
                    }, {
                        key: "_onMemberInfoModified",
                        value: function (e) {
                            var t = this,
                                n = e.elements[0].content.groupProfile.groupID;
                            e.elements[0].content.msgMemberInfo.forEach(function (e) {
                                var r = t.groupController.getLocalGroupMemberInfo(n, e.userAccount);
                                r && e.shutupTime && (r.shutUpUntil = (Date.now() + 1e3 * e.shutupTime) / 1e3)
                            })
                        }
                    }]), e
                }(),
                Co = function () {
                    function t(e) {
                        A(this, t), this.groupController = e.groupController, this.tim = e.tim, this._initLiceners()
                    }
                    return O(t, [{
                        key: "_initLiceners",
                        value: function () {
                            this.tim.innerEmitter.on(_e.MESSAGE_GROUP_SYSTEM_NOTICE_RECEIVED, this._onReceivedGroupSystemNotice, this)
                        }
                    }, {
                        key: "_onReceivedGroupSystemNotice",
                        value: function (t) {
                            var n = this,
                                r = t.data,
                                o = r.result;
                            "sync" !== r.type && o.forEach(function (t) {
                                switch (t.elements[0].content.operationType) {
                                    case 1:
                                        n._onApplyGroupRequest(t);
                                        break;
                                    case 2:
                                        n._onApplyGroupRequestAgreed(t);
                                        break;
                                    case 3:
                                        n._onApplyGroupRequestRefused(t);
                                        break;
                                    case 4:
                                        n._onMemberKicked(t);
                                        break;
                                    case 5:
                                        n._onGroupDismissed(t);
                                        break;
                                    case 6:
                                        break;
                                    case 7:
                                        n._onInviteGroup(t);
                                        break;
                                    case 8:
                                        n._onQuitGroup(t);
                                        break;
                                    case 9:
                                        n._onSetManager(t);
                                        break;
                                    case 10:
                                        n._onDeleteManager(t);
                                        break;
                                    case 11:
                                    case 12:
                                    case 15:
                                        break;
                                    case 255:
                                        n.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                            groupSystemNotice: t,
                                            type: d
                                        })
                                }
                            })
                        }
                    }, {
                        key: "_onApplyGroupRequest",
                        value: function (t) {
                            this.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                message: t,
                                type: i
                            })
                        }
                    }, {
                        key: "_onApplyGroupRequestAgreed",
                        value: function (t) {
                            var n = t.elements[0].content.groupProfile.groupID;
                            this.groupController.hasLocalGroup(n) || this.groupController.getGroupList(), this.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                message: t,
                                type: s
                            })
                        }
                    }, {
                        key: "_onApplyGroupRequestRefused",
                        value: function (t) {
                            this.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                message: t,
                                type: a
                            })
                        }
                    }, {
                        key: "_onMemberKicked",
                        value: function (t) {
                            var n = t.elements[0].content.groupProfile.groupID;
                            this.groupController.hasLocalGroup(n) && (this.groupController._deleteLocalGroup(n), this.tim.conversationController._deleteLocalConversation("GROUP".concat(n))), this.groupController._emitGroupUpdate(1, 0), this.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                message: t,
                                type: u
                            })
                        }
                    }, {
                        key: "_onGroupDismissed",
                        value: function (t) {
                            var n = t.elements[0].content.groupProfile.groupID;
                            this.groupController._deleteLocalGroup(n), this.tim.conversationController._deleteLocalConversation("GROUP".concat(n)), this.groupController._emitGroupUpdate(1, 0), this.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                message: t,
                                type: c
                            })
                        }
                    }, {
                        key: "_onInviteGroup",
                        value: function (t) {
                            var n = t.elements[0].content.groupProfile.groupID;
                            this.groupController.hasLocalGroup(n) || this.groupController.getGroupList(), this.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                message: t,
                                type: l
                            })
                        }
                    }, {
                        key: "_onQuitGroup",
                        value: function (t) {
                            var n = t.elements[0].content.groupProfile.groupID;
                            this.groupController.hasLocalGroup(n) && (this.groupController._deleteLocalGroup(n), this.tim.conversationController._deleteLocalConversation("GROUP".concat(n)), this.groupController._emitGroupUpdate(1, 0)), this.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                message: t,
                                type: p
                            })
                        }
                    }, {
                        key: "_onSetManager",
                        value: function (t) {
                            var n = t.elements[0].content.groupProfile,
                                r = n.to,
                                i = n.groupID,
                                s = this.groupController.getLocalGroupMemberInfo(i, r);
                            s && s.updateRole(o.ADMIN), this.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                message: t,
                                type: h
                            })
                        }
                    }, {
                        key: "_onDeleteManager",
                        value: function (t) {
                            var n = t.elements[0].content.groupProfile,
                                r = n.to,
                                i = n.groupID,
                                s = this.groupController.getLocalGroupMemberInfo(i, r);
                            s && s.updateRole(o.MEMBER), this.tim.outerEmitter.emit(e.GROUP_SYSTEM_NOTICE_RECEIVED, {
                                message: t,
                                type: f
                            })
                        }
                    }]), t
                }(),
                Mo = function () {
                    function e(t) {
                        var n = t.tim,
                            r = t.groupController;
                        A(this, e), this.tim = n, this.groupController = r, this.AVChatRoomLoop = null, this.key = "", this.startSeq = 1, this.errorCount = 0, this.group = {}
                    }
                    return O(e, [{
                        key: "_updateProperties",
                        value: function (e) {
                            var t = this;
                            Object.keys(e).forEach(function (n) {
                                t[n] = e[n]
                            })
                        }
                    }, {
                        key: "start",
                        value: function () {
                            var e = {
                                key: this.key,
                                startSeq: this.startSeq
                            };
                            if (null === this.AVChatRoomLoop) {
                                var t = this.tim.notificationController.createPackage({
                                    name: "AVChatRoom",
                                    action: "startLongPoll",
                                    param: e
                                });
                                this.AVChatRoomLoop = this.tim.connectionController.createRunLoop({
                                    pack: t,
                                    before: this._updateRequestData.bind(this),
                                    success: this._handleSuccess.bind(this),
                                    fail: this._handleFailure.bind(this)
                                }), this.AVChatRoomLoop.start()
                            } else this.AVChatRoomLoop._stoped && this.AVChatRoomLoop.start()
                        }
                    }, {
                        key: "stop",
                        value: function () {
                            null === this.AVChatRoomLoop || this.AVChatRoomLoop._stoped || (this.AVChatRoomLoop.abort(), this.AVChatRoomLoop.stop(), this.group = {})
                        }
                    }, {
                        key: "applyJoinAVChatRoom",
                        value: function (e) {
                            return this._checkBeforeJoinGroup(e), this.tim.context.a2Key && this.tim.context.tinyID ? this._joinWithAuth(e) : this._joinWithoutAuth(e)
                        }
                    }, {
                        key: "_joinWithAuth",
                        value: function (e) {
                            var t = this;
                            return this.groupController.applyJoinGroup(e).then(function (n) {
                                return t.tim.innerEmitter.emit(_e.AVCHATROOM_JOIN_SUCCESS, {
                                    data: e.groupID
                                }), t._updateProperties({
                                    key: n.data.longPollingKey,
                                    startSeq: 1,
                                    group: t.groupController.groupMap.get(e.groupID)
                                }), t.start(), n
                            })
                        }
                    }, {
                        key: "_joinWithoutAuth",
                        value: function (e) {
                            var t = this,
                                n = this.groupController.createPackage({
                                    name: "group",
                                    action: "applyJoinAVChatRoom",
                                    param: e
                                });
                            return this.tim.connectionController.request(n).then(function (n) {
                                var r = n.data.longPollingKey;
                                return Ge.log("AVChatRoomHandler.applyJoinAVChatRoom ok. groupID:", e.groupID), t.tim.innerEmitter.emit(_e.AVCHATROOM_JOIN_SUCCESS, {
                                    data: e.groupID
                                }), t._updateProperties({
                                    key: r,
                                    startSeq: 1,
                                    group: t.groupController.getLocalGroupProfile(e.groupID)
                                }), t.start(), new at({
                                    status: ot.SUCCESS,
                                    group: t.groupController.getLocalGroupProfile(e.groupID)
                                })
                            }).catch(function (t) {
                                return Ge.error("AVChatRoomHandler.applyJoinAVChatRoom error:".concat(t.message, ". groupID:").concat(e.groupID)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "_checkBeforeJoinGroup",
                        value: function (e) {
                            if (this.isJoined) {
                                if (e.groupID === this.group.groupID) return;
                                this.group.selfInfo.role === o.OWNER ? (this.groupController._deleteLocalGroup(this.group.groupID), this.tim.conversationController._deleteLocalConversation("GROUP".concat(this.group.groupID)), this.groupController._emitGroupUpdate(1, 0)) : this.groupController.quitGroup(this.group.groupID)
                            }
                            null !== this.AVChatRoomLoop && !this.AVChatRoomLoop._stoped && this.stop()
                        }
                    }, {
                        key: "_updateRequestData",
                        value: function (e) {
                            e.StartSeq = this.startSeq, e.Key = this.key
                        }
                    }, {
                        key: "_handleSuccess",
                        value: function (e) {
                            this.startSeq = e.data.nextSeq, this.key = e.data.key, Array.isArray(e.data.rspMsgList) && e.data.rspMsgList.forEach(function (e) {
                                e.to = e.groupID
                            }), e.data.rspMsgList && e.data.rspMsgList.length > 0 && this.tim.notificationController._eachEventArray(e.data.rspMsgList)
                        }
                    }, {
                        key: "_handleFailure",
                        value: function (e) {
                            e.error && (this.errorCount++, this.errorCount >= 5 && (this.stop(), this.errorCount = 0), this.tim.innerEmitter.emit(_e.ERROR_DETECTED, e.error))
                        }
                    }, {
                        key: "isJoined",
                        get: function () {
                            return !Fe(this.group.groupID)
                        }
                    }]), e
                }(),
                Do = function (t) {
                    function i(e) {
                        var t;
                        return A(this, i), (t = F(this, G(i).call(this, e))).groupMap = new Map, t.groupMemberListMap = new Map, t.hasLocalGroupList = 0, t.groupNoticeHandler = new Co({
                            tim: e,
                            groupController: U(t)
                        }), t.groupTipsHandler = new To({
                            tim: e,
                            groupController: U(t)
                        }), t.AVChatRoomHandler = new Mo({
                            tim: e,
                            groupController: U(t)
                        }), t._initListeners(), t
                    }
                    return P(i, nt), O(i, [{
                        key: "createGroup",
                        value: function (e) {
                            var t = this;
                            if (!["Public", "Private", "ChatRoom", "AVChatRoom"].includes(e.type)) {
                                var o = new ae({
                                    code: ie.ILLEGAL_GROUP_TYPE,
                                    message: se.ILLEGAL_GROUP_TYPE
                                });
                                return pt(o, 1)
                            }
                            ze(e.type) && !Fe(e.memberList) && e.memberList.length > 0 && (Ge.warn("GroupController.createGroup 创建AVChatRoom时不能添加群成员，自动忽略该字段"), e.memberList = void 0), We(e.type) || Fe(e.joinOption) || (Ge.warn("GroupController.createGroup 创建Private/ChatRoom/AVChatRoom群时不能设置字段：joinOption，自动忽略该字段"), e.joinOption = void 0);
                            var i = this.createPackage({
                                name: "group",
                                action: "create",
                                param: e
                            });
                            return Ge.log("GroupController.createGroup."), this.tim.connectionController.request(i).then(function (o) {
                                if (Ge.log("GroupController.createGroup ok. groupID:", o.data.groupID), t._updateLocalGroupListAndGroupMemberList([R({}, e, {
                                        groupID: o.data.groupID
                                    })]), e.type !== r.AVCHATROOM) {
                                    var i = t.tim.createCustomMessage({
                                        to: o.data.groupID,
                                        conversationType: n.GROUP,
                                        payload: {
                                            data: "group_create",
                                            extension: "".concat(t.tim.context.identifier, "创建群组")
                                        }
                                    });
                                    t.tim.sendMessage(i)
                                }
                                return t._emitGroupUpdate(), t.getGroupProfile({
                                    groupID: o.data.groupID
                                })
                            }).then(function (e) {
                                var n = e.data.group.groupID;
                                return t.getLocalGroupProfile(n).selfInfo.messageRemindType = M.MSG_REMIND_ACPT_AND_NOTE, e
                            }).catch(function (e) {
                                return Ge.error("GroupController.createGroup error:", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "joinGroup",
                        value: function (e) {
                            if (e.type === r.PRIVATE) {
                                var t = new ae({
                                    code: ie.CANNOT_JOIN_PRIVATE,
                                    message: se.CANNOT_JOIN_PRIVATE
                                });
                                return this.tim.innerEmitter.emit(_e.ERROR_DETECTED, t), pt(t, 1)
                            }
                            return Ge.log("GroupController.joinGroup. groupID:", e.groupID), e.type === r.AVCHATROOM ? this.applyJoinAVChatRoom(e) : this.applyJoinGroup(e)
                        }
                    }, {
                        key: "quitGroup",
                        value: function (e) {
                            var t = this;
                            this.AVChatRoomHandler.group.groupID === e && this.AVChatRoomHandler.stop();
                            var n = this.createPackage({
                                name: "group",
                                action: "quitGroup",
                                param: {
                                    groupID: e
                                }
                            });
                            return Ge.log("GroupController.quitGroup. groupID:", e), this.tim.connectionController.request(n).then(function () {
                                return Ge.log("GroupController.quitGroup ok. groupID:", e), t._deleteLocalGroup(e), t.tim.conversationController._deleteLocalConversation("GROUP".concat(e)), t._emitGroupUpdate(1, 0), new at({
                                    groupID: e
                                })
                            }).catch(function (t) {
                                return Ge.error("GroupController.quitGroup error.  error:".concat(t, ". groupID:").concat(e)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "changeGroupOwner",
                        value: function (e) {
                            var t = this;
                            if (this.hasLocalGroup(e.groupID) && this.getLocalGroupProfile(e.groupID).type === r.AVCHATROOM) return pt(new ae({
                                code: ie.CANNOT_CHANGE_OWNER_IN_AVCHATROOM,
                                message: se.CANNOT_CHANGE_OWNER_IN_AVCHATROOM
                            }), 1);
                            if (e.newOwnerID === this.tim.loginInfo.identifier) return pt(new ae({
                                code: ie.CANNOT_CHANGE_OWNER_TO_SELF,
                                message: se.CANNOT_CHANGE_OWNER_TO_SELF
                            }), 1);
                            var n = this.createPackage({
                                name: "group",
                                action: "changeGroupOwner",
                                param: e
                            });
                            return Ge.log("GroupController.changeGroupOwner. groupID:", e.groupID), this.tim.connectionController.request(n).then(function () {
                                Ge.log("GroupController.changeGroupOwner ok. groupID:", e.groupID);
                                var n = e.groupID,
                                    r = e.newOwnerID;
                                t.groupMap.get(n).ownerID = r;
                                var o = t.groupMemberListMap.get(n);
                                if (o instanceof Map) {
                                    var i = o.get(t.tim.loginInfo.identifier);
                                    Fe(i) || (i.updateRole("Member"), t.groupMap.get(n).selfInfo.role = "Member");
                                    var s = o.get(r);
                                    Fe(s) || s.updateRole("Owner")
                                }
                                return t._emitGroupUpdate(1, 0), new at({
                                    group: t.groupMap.get(n)
                                })
                            }).catch(function (t) {
                                return Ge.error("GroupController.changeGroupOwner error:".concat(t, ". groupID:").concat(e.groupID)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "dismissGroup",
                        value: function (e) {
                            var t = this;
                            if (this.hasLocalGroup(e) && this.getLocalGroupProfile(e).type === r.PRIVATE) return pt(new ae({
                                code: ie.CANNOT_DISMISS_PRIVATE,
                                message: se.CANNOT_DISMISS_PRIVATE
                            }), 1);
                            var n = this.createPackage({
                                name: "group",
                                action: "destroyGroup",
                                param: {
                                    groupID: e
                                }
                            });
                            return Ge.log("GroupController.dismissGroup. groupID:".concat(e)), this.tim.connectionController.request(n).then(function () {
                                return Ge.log("GroupController.dismissGroup ok. groupID:".concat(e)), t._deleteLocalGroup(e), t.tim.conversationController._deleteLocalConversation("GROUP".concat(e)), t._emitGroupUpdate(1, 0), new at({
                                    groupID: e
                                })
                            }).catch(function (t) {
                                return Ge.error("GroupController.dismissGroup error:".concat(t, ". groupID:").concat(e)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "updateGroupProfile",
                        value: function (e) {
                            var t = this;
                            !this.hasLocalGroup(e.groupID) || We(this.getLocalGroupProfile(e.groupID).type) || Fe(e.joinOption) || (Ge.warn("GroupController.modifyGroup: Private/ChatRoom/AVChatRoom群不能设置字段：joinOption，自动忽略该字段"), e.joinOption = void 0);
                            var n = this.createPackage({
                                name: "group",
                                action: "updateGroupProfile",
                                param: e
                            });
                            return Ge.log("GroupController.modifyGroup. groupID:", e.groupID), this.tim.connectionController.request(n).then(function () {
                                (Ge.log("GroupController.modifyGroup ok. groupID:", e.groupID), t.hasLocalGroup(e.groupID)) && (t.groupMap.get(e.groupID).updateGroup(e), t._setLocalGroupList(t.groupMap));
                                return new at({
                                    group: t.groupMap.get(e.groupID)
                                })
                            }).catch(function (t) {
                                return Ge.log("GroupController.modifyGroup error. error:".concat(t, " groupID:").concat(e.groupID)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "setGroupMemberRole",
                        value: function (e) {
                            var t = this,
                                n = this.groupMap.get(e.groupID);
                            if (n.selfInfo.role !== o.OWNER) return pt(new ae({
                                code: ie.NOT_OWNER,
                                message: se.NOT_OWNER
                            }), 1);
                            if ([r.PRIVATE, r.AVCHATROOM].includes(n.type)) return pt(new ae({
                                code: ie.CANNOT_SET_MEMBER_ROLE_IN_PRIVATE_AND_AVCHATROOM,
                                message: se.CANNOT_SET_MEMBER_ROLE_IN_PRIVATE_AND_AVCHATROOM
                            }), 1);
                            if ([o.ADMIN, o.MEMBER].indexOf(e.role) < 0) return pt(new ae({
                                code: ie.INVALID_MEMBER_ROLE,
                                message: se.INVALID_MEMBER_ROLE
                            }), 1);
                            if (e.userID === this.tim.loginInfo.identifier) return pt(new ae({
                                code: ie.CANNOT_SET_SELF_MEMBER_ROLE,
                                message: se.CANNOT_SET_SELF_MEMBER_ROLE
                            }), 1);
                            Ge.log("GroupController.setGroupMemberRole. groupID:".concat(e.groupID, ". userID: ").concat(e.userID));
                            var i = e.groupID,
                                s = e.userID,
                                a = e.role;
                            return this._modifyGroupMemberInfo({
                                groupID: i,
                                userID: s,
                                role: a
                            }).then(function () {
                                Ge.log("GroupController.setGroupMemberRole ok. groupID:".concat(e.groupID, ". userID: ").concat(e.userID));
                                var n = t.groupMemberListMap.get(e.groupID);
                                return void 0 !== n && void 0 !== n.get(e.userID) && n.get(e.userID).updateRole(e.role), new at({
                                    group: t.groupMap.get(e.groupID)
                                })
                            }).catch(function (t) {
                                return Ge.error("GroupController.setGroupMemberRole error:".concat(t, ". groupID:").concat(e.groupID, ". userID:").concat(e.userID)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "setGroupMemberMuteTime",
                        value: function (e) {
                            var t = this;
                            Ge.log("GroupController.setGroupMemberMuteTime. groupID:".concat(e.groupID, ". userID: ").concat(e.userID));
                            var n = e.groupID,
                                r = e.userID,
                                o = e.muteTime;
                            return this._modifyGroupMemberInfo({
                                groupID: n,
                                userID: r,
                                muteTime: o
                            }).then(function () {
                                return Ge.log("GroupController.setGroupMemberMuteTime ok. groupID:".concat(e.groupID, ". userID: ").concat(e.userID)), t.updateGroupMemberList({
                                    groupID: n
                                })
                            }).then(function () {
                                return new at({
                                    group: t.groupMap.get(e.groupID)
                                })
                            }).catch(function (t) {
                                return Ge.error("GroupController.setGroupMemberMuteTime error:".concat(t, ". groupID:").concat(e.groupID, ". userID:").concat(e.userID)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "setMessageRemindType",
                        value: function (e) {
                            var t = this;
                            Ge.log("GroupController.setMessageRemindType. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || this.tim.loginInfo.identifier));
                            var n = e.groupID,
                                r = e.messageRemindType;
                            return this._modifyGroupMemberInfo({
                                groupID: n,
                                messageRemindType: r,
                                userID: this.tim.loginInfo.identifier
                            }).then(function () {
                                Ge.log("GroupController.setMessageRemindType ok. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || t.tim.loginInfo.identifier));
                                var n = t.groupMap.get(e.groupID);
                                return n.selfInfo.messageRemindType = r, new at({
                                    group: n
                                })
                            }).catch(function (n) {
                                return Ge.error("GroupController.setMessageRemindType error:".concat(n, ". groupID:").concat(e.groupID, ". userID:").concat(e.userID || t.tim.loginInfo.identifier)), pt(n, 1)
                            })
                        }
                    }, {
                        key: "setGroupMemberNameCard",
                        value: function (e) {
                            var t = this;
                            Ge.log("GroupController.setGroupMemberNameCard. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || this.tim.loginInfo.identifier));
                            var n = e.groupID,
                                r = e.userID,
                                o = void 0 === r ? this.tim.loginInfo.identifier : r,
                                i = e.nameCard;
                            return this._modifyGroupMemberInfo({
                                groupID: n,
                                userID: o,
                                nameCard: i
                            }).then(function () {
                                Ge.log("GroupController.setGroupMemberNameCard ok. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || t.tim.loginInfo.identifier));
                                var r = t.groupMemberListMap.get(n);
                                return void 0 !== r && void 0 !== r.get(o) && r.get(o).updateMember({
                                    nameCard: i
                                }), o === t.tim.loginInfo.identifier && t.hasLocalGroup(n) && (t.getLocalGroupProfile(n).selfInfo.nameCard = i), new at({
                                    group: t.groupMap.get(n)
                                })
                            }).catch(function (n) {
                                return Ge.error("GroupController.setGroupMemberNameCard error:".concat(n, ". groupID:").concat(e.groupID, ". userID:").concat(e.userID || t.tim.loginInfo.identifier)), pt(n, 1)
                            })
                        }
                    }, {
                        key: "setGroupMemberCustomField",
                        value: function (e) {
                            var t = this;
                            Ge.log("GroupController.setGroupMemberCustomField. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || this.tim.loginInfo.identifier));
                            var n = e.groupID,
                                r = e.userID,
                                o = e.memberCustomField;
                            return this._modifyGroupMemberInfo({
                                groupID: n,
                                userID: r || this.tim.loginInfo.identifier,
                                memberCustomField: o
                            }).then(function () {
                                return Ge.log("GroupController.setGroupMemberCustomField ok. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || t.tim.loginInfo.identifier)), t.groupMemberListMap.has(n) && t.groupMemberListMap.get(n).has(r) && t.groupMemberListMap.get(n).get(r).updateMemberCustomField(o), new at({
                                    group: t.groupMap.get(n)
                                })
                            }).catch(function (n) {
                                return Ge.error("GroupController.setGroupMemberCustomField error:".concat(n, ". groupID:").concat(e.groupID, ". userID:").concat(e.userID || t.tim.loginInfo.identifier)), pt(n, 1)
                            })
                        }
                    }, {
                        key: "getGroupList",
                        value: function () {
                            var e = this;
                            Ge.log("GroupController.getGroupList");
                            var t = this.createPackage({
                                name: "group",
                                action: "list",
                                param: {
                                    responseFilter: {
                                        groupBaseInfoFilter: ["Type", "Name", "FaceUrl", "NextMsgSeq"],
                                        selfInfoFilter: ["Role", "JoinTime", "MsgFlag"]
                                    }
                                }
                            });
                            return this.tim.connectionController.request(t).then(function (t) {
                                var n = t.data.groups;
                                return Ge.log("GroupController.getGroupList ok"), e._groupListTreeShaking(n), e._updateLocalGroupListAndGroupMemberList(n), e.hasLocalGroupList = 1, e.tempConversationList && (e._handleUpdateGroupLastMessage(e.tempConversationList), e.tempConversationList = null), e._emitGroupUpdate(), new at({
                                    groupList: e.getLocalGroups()
                                })
                            }).catch(function (e) {
                                return Ge.error("GroupController.getGroupList error: ", e), pt(e, 1)
                            })
                        }
                    }, {
                        key: "getGroupMemberList",
                        value: function (e) {
                            var t = this,
                                n = e.groupID,
                                r = e.offset,
                                o = void 0 === r ? 0 : r,
                                i = e.count,
                                s = void 0 === i ? 15 : i;
                            Ge.log("GroupController.getGroupMemberList groupID: ".concat(n, " offset: ").concat(o, " count: ").concat(s));
                            var a = this.createPackage({
                                    name: "group",
                                    action: "getGroupMemberList",
                                    param: {
                                        groupID: n,
                                        offset: o,
                                        limit: s > 100 ? 100 : s,
                                        memberInfoFilter: ["Account", "Role", "JoinTime", "LastSendMsgTime", "NameCard", "ShutUpUntil"]
                                    }
                                }),
                                u = [];
                            return this.connectionController.request(a).then(function (e) {
                                var r = e.data,
                                    o = r.members,
                                    i = r.memberNum;
                                return t.hasLocalGroup(n) && (t.getLocalGroupProfile(n).memberNum = i), u = t._updateLocalGroupMemberList(n, o), t.tim.getUserProfile({
                                    userIDList: o.map(function (e) {
                                        return e.userID
                                    })
                                })
                            }).then(function (e) {
                                var r = e.data.map(function (e) {
                                    return {
                                        userID: e.userID,
                                        nick: e.nick,
                                        avatar: e.avatar
                                    }
                                });
                                return t._updateLocalGroupMemberList(n, r), Ge.log("GroupController.getGroupMemberList ok."), new at({
                                    memberList: u
                                })
                            }).catch(function (e) {
                                return Ge.error("GroupController.getGroupMemberList error: ", e), pt(e)
                            })
                        }
                    }, {
                        key: "getLocalGroups",
                        value: function () {
                            return x(this.groupMap.values())
                        }
                    }, {
                        key: "getLocalGroupProfile",
                        value: function (e) {
                            return this.groupMap.get(e)
                        }
                    }, {
                        key: "hasLocalGroup",
                        value: function (e) {
                            return this.groupMap.has(e)
                        }
                    }, {
                        key: "getLocalGroupMemberInfo",
                        value: function (e, t) {
                            return this.groupMemberListMap.has(e) ? this.groupMemberListMap.get(e).get(t) : 0
                        }
                    }, {
                        key: "hasLocalGroupMember",
                        value: function (e, t) {
                            return this.groupMemberListMap.has(e) && this.groupMemberListMap.get(e).has(t)
                        }
                    }, {
                        key: "hasLocalGroupMemberMap",
                        value: function (e) {
                            return this.groupMemberListMap.has(e)
                        }
                    }, {
                        key: "getGroupProfile",
                        value: function (e) {
                            var t = this;
                            Ge.log("GroupController.getGroupProfile. groupID:", e.groupID);
                            var n = e.groupID,
                                r = e.groupCustomFieldFilter,
                                o = e.memberCustomFieldFilter,
                                i = {
                                    groupIDList: [n],
                                    responseFilter: {
                                        groupBaseInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "Owner_Account", "CreateTime", "InfoSeq", "LastInfoTime", "LastMsgTime", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "NextMsgSeq"],
                                        groupCustomFieldFilter: r,
                                        memberCustomFieldFilter: o
                                    }
                                };
                            return this.getGroupProfileAdvance(i).then(function (r) {
                                var o = r.data,
                                    i = o.successGroupList,
                                    s = o.failureGroupList;
                                if (Ge.log("GroupController.getGroupProfile ok. groupID:", e.groupID), s.length > 0) return pt(s[0], 1);
                                var a = [];
                                return t._updateLocalGroupListAndGroupMemberList(i, 1), t.groupMemberListMap.has(n) && t.groupMemberListMap.get(n).forEach(function (e) {
                                    var t = e.userID;
                                    a.push(t)
                                }), t._emitGroupUpdate(), t.tim.getUserProfile({
                                    userIDList: a,
                                    tagList: ["Tag_Profile_IM_Nick", "Tag_Profile_IM_Image"]
                                })
                            }).then(function (e) {
                                return e.data.forEach(function (e) {
                                    var r = t.getLocalGroupMemberInfo(n, e.userID);
                                    r && r.updateMember({
                                        nick: e.nick,
                                        avatar: e.avatar
                                    })
                                }), new at({
                                    group: t.groupMap.get(n)
                                })
                            }).catch(function (t) {
                                return Ge.error("GroupController.getGroupProfile error.  error:".concat(t, ". groupID:").concat(e.groupID)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "addGroupMember",
                        value: function (e) {
                            var t = this,
                                n = this.getLocalGroupProfile(e.groupID);
                            if (ze(n.type)) {
                                var r = new ae({
                                    code: ie.CANNOT_ADD_MEMBER_IN_AVCHATROOM,
                                    message: se.CANNOT_ADD_MEMBER_IN_AVCHATROOM
                                });
                                return pt(r, 1)
                            }
                            e.userIDList = e.userIDList.map(function (e) {
                                return {
                                    userID: e
                                }
                            });
                            var o = this.createPackage({
                                name: "group",
                                action: "addGroupMember",
                                param: e
                            });
                            return Ge.log("GroupController.addGroupMember. groupID:", e.groupID), this.connectionController.request(o).then(function (r) {
                                var o = r.data.members;
                                Ge.log("GroupController.addGroupMember ok. groupID:", e.groupID);
                                var i = o.filter(function (e) {
                                        return 1 === e.result
                                    }).map(function (e) {
                                        return e.userID
                                    }),
                                    s = o.filter(function (e) {
                                        return 0 === e.result
                                    }).map(function (e) {
                                        return e.userID
                                    }),
                                    a = o.filter(function (e) {
                                        return 2 === e.result
                                    }).map(function (e) {
                                        return e.userID
                                    });
                                return 0 === i.length ? new at({
                                    successUserIDList: i,
                                    failureUserIDList: s,
                                    existedUserIDList: a
                                }) : (t.updateGroupMemberList(e), new at({
                                    successUserIDList: i,
                                    failureUserIDList: s,
                                    existedUserIDList: a,
                                    group: n
                                }))
                            }).catch(function (t) {
                                return Ge.error("GroupController.addGroupMember error.  error:".concat(t, ". groupID:").concat(e.groupID)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "deleteGroupMember",
                        value: function (e) {
                            var t = this,
                                n = this.groupMap.get(e.groupID);
                            if (n.type === r.AVCHATROOM) return pt(new ae({
                                code: ie.CANNOT_KICK_MEMBER_IN_AVCHATROOM,
                                message: se.CANNOT_KICK_MEMBER_IN_AVCHATROOM
                            }), 1);
                            var o = this.createPackage({
                                name: "group",
                                action: "deleteGroupMember",
                                param: e
                            });
                            return this.connectionController.request(o).then(function () {
                                return t._deleteLocalGroupMembers(e.groupID, e.userIDList), t._emitGroupUpdate(), new at({
                                    group: n,
                                    userIDList: e.userIDList
                                })
                            }).catch(this._promiseCatch.bind(this))
                        }
                    }, {
                        key: "searchGroupByID",
                        value: function (e) {
                            var t = {
                                    groupIDList: [e]
                                },
                                n = this.createPackage({
                                    name: "group",
                                    action: "searchGroupByID",
                                    param: t
                                });
                            return Ge.log("GroupController.searchGroupByID. groupID:".concat(e)), this.connectionController.request(n).then(function (t) {
                                var n = t.data.groupProfile;
                                if (Ge.log("GroupController.searchGroupByID ok. groupID:".concat(e)), n[0].errorCode !== it.REQUEST.SUCCESS) throw new ae({
                                    code: n[0].errorCode,
                                    message: n[0].errorInfo
                                });
                                return new at({
                                    group: new ao(n[0])
                                })
                            }).catch(function (t) {
                                return Ge.error("GroupController.searchGroupByID ok. error:".concat(t, " groupID:").concat(e)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "applyJoinGroup",
                        value: function (e) {
                            var t = this,
                                n = this.createPackage({
                                    name: "group",
                                    action: "applyJoinGroup",
                                    param: e
                                });
                            return this.connectionController.request(n).then(function (n) {
                                var r = n.data,
                                    o = r.joinedStatus,
                                    i = r.longPollingKey;
                                switch (Ge.log("GroupController.joinGroup ok. groupID:", e.groupID), o) {
                                    case ot.WAIT_APPROVAL:
                                        return new at({
                                            status: ot.WAIT_APPROVAL
                                        });
                                    case ot.SUCCESS:
                                        return t.getGroupProfile({
                                            groupID: e.groupID
                                        }).then(function (e) {
                                            var t = {
                                                status: ot.SUCCESS,
                                                group: e.data.group
                                            };
                                            return Fe(i) || (t.longPollingKey = i), new at(t)
                                        });
                                    default:
                                        var s = new ae({
                                            code: ie.JOIN_GROUP_FAIL,
                                            message: se.JOIN_GROUP_FAIL
                                        });
                                        return Ge.error("GroupController.joinGroup error:".concat(s, ". groupID:").concat(e.groupID)), pt(s, 1)
                                }
                            }).catch(function (t) {
                                return Ge.error("GroupController.joinGroup error:".concat(t, ". groupID:").concat(e.groupID)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "applyJoinAVChatRoom",
                        value: function (e) {
                            return this.AVChatRoomHandler.applyJoinAVChatRoom(e)
                        }
                    }, {
                        key: "handleGroupApplication",
                        value: function (e) {
                            var t = this,
                                n = e.message.elements[0].content,
                                r = n.groupProfile.groupID,
                                o = n.authentication,
                                i = n.messageKey,
                                s = n.operatorID,
                                a = this.createPackage({
                                    name: "group",
                                    action: "handleApplyJoinGroup",
                                    param: R({}, e, {
                                        applicant: s,
                                        groupID: r,
                                        authentication: o,
                                        messageKey: i
                                    })
                                });
                            return Ge.log("GroupController.handleApplication. groupID:", r), this.connectionController.request(a).then(function () {
                                return Ge.log("GroupController.handleApplication ok. groupID:", r), t.updateGroupMemberList({
                                    groupID: r
                                })
                            }).then(function (e) {
                                return new at({
                                    group: e
                                })
                            }).catch(function (e) {
                                return Ge.error("GroupController.handleApplication error.  error:".concat(e, ". groupID:").concat(r)), pt(e, 1)
                            })
                        }
                    }, {
                        key: "deleteGroupSystemNotice",
                        value: function (e) {
                            var t = this.createPackage({
                                name: "group",
                                action: "deleteGroupSystemNotice",
                                param: {
                                    messageListToDelete: e.messageList.map(function (e) {
                                        return {
                                            from: n.SYSTEM,
                                            messageSeq: e.clientSequence,
                                            messageRandom: e.random
                                        }
                                    })
                                }
                            });
                            return this.connectionController.request(t).then(function () {
                                return new at
                            }).catch(this._promiseCatch.bind(this))
                        }
                    }, {
                        key: "updateGroupMemberList",
                        value: function (e) {
                            var t = this,
                                n = e.groupID,
                                r = e.memberCustomFieldFilter,
                                o = e.memberInfoFilter,
                                i = {
                                    groupIDList: [n],
                                    responseFilter: {
                                        memberInfoFilter: o || ["Account", "Role", "JoinTime", "LastSendMsgTime", "NameCard", "ShutUpUntil"],
                                        memberCustomFieldFilter: r
                                    }
                                };
                            return this.getGroupProfileAdvance(i).then(function (e) {
                                var r = e.data,
                                    o = r.successGroupList,
                                    i = r.failureGroupList;
                                if (i.length > 0) return pt(i[0], 1);
                                var s = [];
                                return t._updateLocalGroupMemberList(o[0].groupID, o[0].members), t.groupMemberListMap.get(n).forEach(function (e) {
                                    var t = e.userID;
                                    s.push(t)
                                }), t.tim.getUserProfile({
                                    userIDList: s,
                                    tagList: ["Tag_Profile_IM_Nick", "Tag_Profile_IM_Image"]
                                })
                            }).then(function (e) {
                                var r = e.data.map(function (e) {
                                    return {
                                        userID: e.userID,
                                        nick: e.nick,
                                        avatar: e.avatar
                                    }
                                });
                                return t._updateLocalGroupMemberList(n, r), t._emitGroupUpdate(), t.groupMap.get(n)
                            })
                        }
                    }, {
                        key: "_promiseCatch",
                        value: function (e) {
                            return pt(e, 1)
                        }
                    }, {
                        key: "getGroupProfileAdvance",
                        value: function (e) {
                            Ge.log("GroupController.getGroupProfileAdvance. groupIDList:", e.groupIDList);
                            var t = this.createPackage({
                                name: "group",
                                action: "query",
                                param: e
                            });
                            return this.tim.connectionController.request(t).then(function (e) {
                                Ge.log("GroupController.getGroupProfileAdvance ok.");
                                var t = e.data.groups,
                                    n = t.filter(function (e) {
                                        return Fe(e.errorCode) || e.errorCode === it.REQUEST.SUCCESS
                                    }),
                                    r = t.filter(function (e) {
                                        return e.errorCode && e.errorCode !== it.REQUEST.SUCCESS
                                    }).map(function (e) {
                                        return new ae({
                                            code: Number("500".concat(e.errorCode)),
                                            message: e.errorInfo,
                                            data: {
                                                groupID: e.groupID
                                            }
                                        })
                                    });
                                return new at({
                                    successGroupList: n,
                                    failureGroupList: r
                                })
                            }).catch(function (t) {
                                return Ge.error("GroupController.getGroupProfile error. groupID:".concat(e.groupID, " error:").concat(t)), pt(t, 1)
                            })
                        }
                    }, {
                        key: "_deleteLocalGroup",
                        value: function (e) {
                            return this.groupMap.delete(e), this.groupMemberListMap.delete(e), this._setLocalGroupList(this.groupMap), this.groupMap.has(e) && this.groupMemberListMap.has(e)
                        }
                    }, {
                        key: "_initGroupList",
                        value: function () {
                            var e = this;
                            (Ge.time(dt), Ge.log("GroupController._initGroupList"), this.hasLocalGroupList = this._hasLocalGroupList(), this.hasLocalGroupList) && (this._getLocalGroups().forEach(function (t) {
                                e.groupMap.set(t[0], new ao(t[1]))
                            }), this._emitGroupUpdate(1, 0));
                            this.triggerReady(), Ge.log("GroupController._initGroupList ok. initCost=".concat(Ge.timeEnd(dt), "ms")), this.getGroupList()
                        }
                    }, {
                        key: "_initListeners",
                        value: function () {
                            var e = this.tim.innerEmitter;
                            e.once(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initGroupList, this), e.on(_e.CONVERSATION_LIST_UPDATED, this._handleUpdateGroupLastMessage, this), e.on(_e.MESSAGE_GROUP_INSTANT_RECEIVED, this._handleReceivedGroupMessage, this), e.on(_e.PROFILE_UPDATED, this._handleProfileUpdated, this)
                        }
                    }, {
                        key: "_emitGroupUpdate",
                        value: function () {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                                r = this.getLocalGroups();
                            n && this.tim.innerEmitter.emit(_e.GROUP_LIST_UPDATED, r), t && this.tim.outerEmitter.emit(e.GROUP_LIST_UPDATED, r)
                        }
                    }, {
                        key: "_handleReceivedGroupMessage",
                        value: function (e) {
                            var t = this,
                                r = e.data.eventDataList;
                            Array.isArray(r) && r.forEach(function (e) {
                                var r = e.conversationID.replace(n.GROUP, "");
                                t.groupMap.has(r) && (t.groupMap.get(r).nextMessageSeq = e.lastMessage.sequence + 1)
                            })
                        }
                    }, {
                        key: "_onReceivedGroupSystemNotice",
                        value: function (e) {
                            var t = e.data;
                            this.groupNoticeHandler._onReceivedGroupNotice(t)
                        }
                    }, {
                        key: "_handleUpdateGroupLastMessage",
                        value: function (e) {
                            if (this.hasLocalGroupList) {
                                for (var t = 0, n = 0; n < e.length; n++) {
                                    var r = e[n],
                                        o = r.type === M.CONV_GROUP;
                                    if (r.conversationID && o) {
                                        var i = r.conversationID.split(/^GROUP/)[1],
                                            s = this.getLocalGroupProfile(i);
                                        s && (s.lastMessage = r.lastMessage, t = 1)
                                    }
                                }
                                t && (this.groupMap = this._sortLocalGroupList(this.groupMap), this._emitGroupUpdate(1, 0))
                            } else this.tempConversationList = e
                        }
                    }, {
                        key: "_sortLocalGroupList",
                        value: function (e) {
                            var t = x(e).filter(function (e) {
                                var t = q(e, 2);
                                t[0];
                                return !W(t[1].lastMessage)
                            });
                            return t.sort(function (e, t) {
                                return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime
                            }), new Map([].concat(x(t), x(e)))
                        }
                    }, {
                        key: "_getLocalGroups",
                        value: function () {
                            return this.tim.storage.getItem("groupMap")
                        }
                    }, {
                        key: "_hasLocalGroupList",
                        value: function () {
                            var e = this.tim.storage.getItem("groupMap");
                            return null !== e && 0 !== e.length
                        }
                    }, {
                        key: "_setLocalGroupList",
                        value: function (e) {
                            var t = [];
                            e.forEach(function (e, n) {
                                var r = e.name,
                                    o = e.avatar,
                                    i = e.type;
                                t.push([n, {
                                    groupID: n,
                                    name: r,
                                    avatar: o,
                                    type: i
                                }])
                            }), this.tim.storage.setItem("groupMap", t)
                        }
                    }, {
                        key: "_updateLocalGroupListAndGroupMemberList",
                        value: function (e, t) {
                            var n = this;
                            e.forEach(function (e) {
                                n.groupMap.has(e.groupID) ? n.groupMap.get(e.groupID).updateGroup(e) : n.groupMap.set(e.groupID, new ao(e)), n._updateLocalGroupMemberList(e.groupID, e.members || e.memberList, t)
                            }), this._setLocalGroupList(this.groupMap)
                        }
                    }, {
                        key: "_updateLocalGroupMemberList",
                        value: function (e, t) {
                            var n = this,
                                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                            if (!t) return [];
                            var o = this.groupMemberListMap.has(e) && 0 == r ? this.groupMemberListMap.get(e) : new Map,
                                i = t.map(function (t) {
                                    if (t.userID === n.tim.context.identifier) {
                                        var r = [null, void 0, "", 0, NaN],
                                            i = {
                                                role: t.role,
                                                joinTime: t.joinTime,
                                                nameCard: t.nameCard
                                            };
                                        Ke(n.groupMap.get(e).selfInfo, i, [], r)
                                    }
                                    return o.has(t.userID) ? o.get(t.userID).updateMember(t) : o.set(t.userID, new So(t)), o.get(t.userID)
                                });
                            return this.groupMemberListMap.set(e, o), i
                        }
                    }, {
                        key: "_deleteLocalGroupMembers",
                        value: function (e, t) {
                            var n = this.groupMemberListMap.get(e);
                            void 0 !== n && (t.forEach(function (e) {
                                n.delete(e)
                            }), this.groupMap.get(e).memberList = x(n.values()))
                        }
                    }, {
                        key: "_modifyGroupMemberInfo",
                        value: function (e) {
                            var t = this.createPackage({
                                name: "group",
                                action: "modifyGroupMemberInfo",
                                param: e
                            });
                            return this.tim.connectionController.request(t)
                        }
                    }, {
                        key: "_groupListTreeShaking",
                        value: function (e) {
                            for (var t = new Map(x(this.groupMap)), n = 0, r = e.length; n < r; n++) t.delete(e[n].groupID);
                            this.AVChatRoomHandler.isJoined && t.delete(this.AVChatRoomHandler.group.groupID);
                            for (var o = x(t.keys()), i = 0, s = o.length; i < s; i++) this.groupMap.delete(o[i])
                        }
                    }, {
                        key: "_handleProfileUpdated",
                        value: function (e) {
                            for (var t = this, n = e.data, r = function (e) {
                                    var r = n[e];
                                    t.groupMemberListMap.forEach(function (e) {
                                        e.has(r.userID) && e.get(r.userID).updateMember({
                                            nick: r.nick,
                                            avatar: r.avatar
                                        })
                                    })
                                }, o = 0; o < n.length; o++) r(o)
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this.groupMap.clear(), this.groupMemberListMap.clear(), this.hasLocalGroupList = 0, this.resetReady(), this.tim.innerEmitter.once(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initGroupList, this)
                        }
                    }]), i
                }(),
                Ao = function () {
                    for (var e = [], t = No(arguments), n = 0; n < arguments.length; n++) Number.isInteger(arguments[n]) ? e.push(arguments[n]) : e.push(1 == !!arguments[n] ? "1" : "0");
                    return e.join(t)
                },
                No = function (e) {
                    var t = e.length,
                        n = e[t - 1];
                    if ("string" != typeof n) return "";
                    if (n.length > 1) return "";
                    var r = e[t - 1];
                    return delete e[t - 1], e.length -= t == e.length ? 1 : 0, r
                },
                Oo = function (t) {
                    function n(e) {
                        var t;
                        return A(this, n), (t = F(this, G(n).call(this, e)))._initializeMembers(), t._initializeStatus(), t._initializeListener(), t
                    }
                    return P(n, nt), O(n, [{
                        key: "_initializeMembers",
                        value: function () {
                            this.normalTimeout = 300, this.realtimeNoticeTimeout = 11e4, this.channelMaxTimeout = 3e5, this._memoryUsed = 0, this._memoryUsedThreshold = .9, this._onMemoryWarning = null
                        }
                    }, {
                        key: "_initializeStatus",
                        value: function () {
                            this._initializeAccountStatus(), this._initializeChannelStatus()
                        }
                    }, {
                        key: "_initializeAccountStatus",
                        value: function () {
                            this.accountStatus = {
                                lastSignInTime: 0,
                                status: it.ACCOUNT_STATUS.SIGN_OUT
                            }
                        }
                    }, {
                        key: "_initializeChannelStatus",
                        value: function () {
                            this.channelStatus = {
                                startTime: 0,
                                offlineTime: 0,
                                failCount: 0,
                                lastRequestTime: 0,
                                lastJitterTime: 0,
                                jitterCount: 0,
                                jitters: [],
                                status: it.CHANNEL_STATUS.OFFLINE
                            }
                        }
                    }, {
                        key: "_onMemoryRunningLow",
                        value: function (e) {
                            Ge.warn("memory running low : ", e)
                        }
                    }, {
                        key: "getChannelStatus",
                        value: function () {
                            return this.channelStatus.status
                        }
                    }, {
                        key: "_channelStatusJittersUpdate",
                        value: function (e) {
                            this.channelStatus.jitterCount++, this.channelStatus.lastJitterTime = e, this.channelStatus.jitters.push(e), this.channelStatus.jitters.length > 5 && this.channelStatus.jitters.pop()
                        }
                    }, {
                        key: "_initializeListener",
                        value: function () {
                            var e = this.tim.innerEmitter;
                            e.on(_e.NOTICE_LONGPOLL_START, this._onChannelStart, this), e.on(_e.NOTICE_LONGPOLL_REQUEST_ARRIVED, this._onChannelRequestSuccess, this), e.on(_e.NOTICE_LONGPOLL_REQUEST_NOT_ARRIVED, this._onChannelFail, this)
                        }
                    }, {
                        key: "_onChannelStart",
                        value: function () {
                            this.channelStatus.startTime = +new Date, this.channelStatus.status = it.CHANNEL_STATUS.ONLINE
                        }
                    }, {
                        key: "_getMemoryUsed",
                        value: function () {
                            var e = "disabled",
                                t = 0;
                            return "undefined" != typeof window && void 0 !== window.performance && (t = window.performance.memory.usedJSHeapSize / window.performance.memory.jsHeapSizeLimit, this._memoryUsed = t, e = [Math.round(1e5 * this._memoryUsed) / 1e3, "%"].join("")), e
                        }
                    }, {
                        key: "_onChannelRequestSuccess",
                        value: function () {
                            var t = this.tim,
                                n = t.innerEmitter,
                                r = t.outerEmitter,
                                o = Date.now(),
                                i = o - (this.channelStatus.lastRequestTime > 0 ? this.channelStatus.lastRequestTime : Date.now() + 100),
                                s = Ao(i < this.realtimeNoticeTimeout, i < this.channelMaxTimeout);
                            switch (this.channelStatus.status = it.CHANNEL_STATUS.ONLINE, this.channelStatus.failCount = 0, s) {
                                case "11":
                                    break;
                                case "01":
                                    n.emit(_e.NOTICE_LONGPOLL_SOON_RECONNECT), r.emit(e.NOTICE_LONGPOLL_RECONNECT);
                                    break;
                                case "00":
                                    n.emit(_e.NOTICE_LONGPOLL_LONG_RECONNECT)
                            }
                            this.channelStatus.lastRequestTime = o
                        }
                    }, {
                        key: "_onChannelFail",
                        value: function (e) {
                            var t = this.tim.innerEmitter,
                                n = Date.now();
                            this.channelStatus.status = it.CHANNEL_STATUS.OFFLINE;
                            var r = n - (0 === this.channelStatus.offlineTime ? this.channelStatus.lastRequestTime : this.channelStatus.offlineTime);
                            this.channelStatus.offlineTime = n, this.channelStatus.failCount++, Ge.log("_onChannelFail count : ".concat(this.channelStatus.failCount, "  time diff: ").concat(r, ";")), this.channelStatus.failCount > 5 && r < 5e3 && (t.emit(_e.NOTICE_LONGPOLL_DISCONNECT), Ge.error("Detected notice channel offline, please check your network!"))
                        }
                    }]), n
                }();

            function Lo() {
                return null
            }
            var Ro = function () {
                    function e(t) {
                        A(this, e), this.tim = t, this.isWX = Ee, this.storageQueue = new Map, this.checkTimes = 0, this.checkTimer = setInterval(this._onCheckTimer.bind(this), 1e3), this._prefix = "", this._initListeners(), this._errorTolerantHandle()
                    }
                    return O(e, [{
                        key: "_errorTolerantHandle",
                        value: function () {
                            !this.isWX && Fe(window.localStorage) && (this.getItem = Lo, this.setItem = Lo, this.removeItem = Lo, this.clear = Lo)
                        }
                    }, {
                        key: "_onCheckTimer",
                        value: function () {
                            if (this.checkTimes++, this.checkTimes % 20 == 0) {
                                if (0 == this.storageQueue.size) return;
                                this._doFlush()
                            }
                        }
                    }, {
                        key: "_doFlush",
                        value: function () {
                            try {
                                var e = 1,
                                    t = 0,
                                    n = void 0;
                                try {
                                    for (var r, o = this.storageQueue[Symbol.iterator](); !(e = (r = o.next()).done); e = 1) {
                                        var i = q(r.value, 2),
                                            s = i[0],
                                            a = i[1];
                                        this.isWX ? wx.setStorageSync(this._getKey(s), a) : localStorage.setItem(this._getKey(s), JSON.stringify(a))
                                    }
                                } catch (u) {
                                    t = 1, n = u
                                } finally {
                                    try {
                                        e || null == o.return || o.return()
                                    } finally {
                                        if (t) throw n
                                    }
                                }
                                this.storageQueue.clear()
                            } catch (c) {
                                Ge.error("Storage._doFlush error", c)
                            }
                        }
                    }, {
                        key: "_initListeners",
                        value: function () {
                            this.tim.innerEmitter.once(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._updatePrefix, this)
                        }
                    }, {
                        key: "_updatePrefix",
                        value: function () {
                            var e = this.tim.loginInfo,
                                t = e.SDKAppID,
                                n = e.identifier;
                            this._prefix = "TIM_".concat(t, "_").concat(n, "_")
                        }
                    }, {
                        key: "getItem",
                        value: function (e) {
                            try {
                                return this.isWX ? wx.getStorageSync(this._getKey(e)) : JSON.parse(localStorage.getItem(this._getKey(e)))
                            } catch (t) {
                                Ge.error("Storage.getItem error:", t)
                            }
                        }
                    }, {
                        key: "setItem",
                        value: function (e, t) {
                            this.storageQueue.set(e, t)
                        }
                    }, {
                        key: "clear",
                        value: function () {
                            try {
                                this.isWX ? wx.clearStorageSync() : localStorage.clear()
                            } catch (e) {
                                Ge.error("Storage.clear error:", e)
                            }
                        }
                    }, {
                        key: "removeItem",
                        value: function (e) {
                            try {
                                this.isWX ? wx.removeStorageSync(this._getKey(e)) : localStorage.removeItem(this._getKey(e))
                            } catch (t) {
                                Ge.error("Storage.removeItem error:", t)
                            }
                        }
                    }, {
                        key: "getSize",
                        value: function (e) {
                            var t = this,
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "b";
                            try {
                                var r = {
                                    size: 0,
                                    limitSize: 5242880,
                                    unit: n
                                };
                                if (Object.defineProperty(r, "leftSize", {
                                        enumerable: 1,
                                        get: function () {
                                            return r.limitSize - r.size
                                        }
                                    }), this.isWX && (r.limitSize = 1024 * wx.getStorageInfoSync().limitSize), e) r.size = JSON.stringify(this.getItem(e)).length + this._getKey(e).length;
                                else if (this.isWX) {
                                    var o = wx.getStorageInfoSync(),
                                        i = o.keys;
                                    i.forEach(function (e) {
                                        r.size += JSON.stringify(wx.getStorageSync(e)).length + t._getKey(e).length
                                    })
                                } else
                                    for (var s in localStorage) localStorage.hasOwnProperty(s) && (r.size += localStorage.getItem(s).length + s.length);
                                return this._convertUnit(r)
                            } catch (a) {
                                Ge.error("Storage.getSize error:", a)
                            }
                        }
                    }, {
                        key: "_convertUnit",
                        value: function (e) {
                            var t = {},
                                n = e.unit;
                            for (var r in t.unit = n, e) "number" == typeof e[r] && ("kb" === n.toLowerCase() ? t[r] = Math.round(e[r] / 1024) : "mb" === n.toLowerCase() ? t[r] = Math.round(e[r] / 1024 / 1024) : t[r] = e[r]);
                            return t
                        }
                    }, {
                        key: "_getKey",
                        value: function (e) {
                            return "".concat(this._prefix).concat(e)
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this._doFlush(), this.checkTimes = 0, this._prefix = "", this.tim.innerEmitter.once(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._updatePrefix, this)
                        }
                    }]), e
                }(),
                Po = Y(function (e) {
                    var t = Object.prototype.hasOwnProperty,
                        n = "~";

                    function r() {}

                    function o(e, t, n) {
                        this.fn = e, this.context = t, this.once = n || 0
                    }

                    function i(e, t, r, i, s) {
                        if ("function" != typeof r) throw new TypeError("The listener must be a function");
                        var a = new o(r, i || e, s),
                            u = n ? n + t : t;
                        return e._events[u] ? e._events[u].fn ? e._events[u] = [e._events[u], a] : e._events[u].push(a) : (e._events[u] = a, e._eventsCount++), e
                    }

                    function s(e, t) {
                        0 == --e._eventsCount ? e._events = new r : delete e._events[t]
                    }

                    function a() {
                        this._events = new r, this._eventsCount = 0
                    }
                    Object.create && (r.prototype = Object.create(null), (new r).__proto__ || (n = 0)), a.prototype.eventNames = function () {
                        var e, r, o = [];
                        if (0 === this._eventsCount) return o;
                        for (r in e = this._events) t.call(e, r) && o.push(n ? r.slice(1) : r);
                        return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(e)) : o
                    }, a.prototype.listeners = function (e) {
                        var t = n ? n + e : e,
                            r = this._events[t];
                        if (!r) return [];
                        if (r.fn) return [r.fn];
                        for (var o = 0, i = r.length, s = new Array(i); o < i; o++) s[o] = r[o].fn;
                        return s
                    }, a.prototype.listenerCount = function (e) {
                        var t = n ? n + e : e,
                            r = this._events[t];
                        return r ? r.fn ? 1 : r.length : 0
                    }, a.prototype.emit = function (e, t, r, o, i, s) {
                        var a = n ? n + e : e;
                        if (!this._events[a]) return 0;
                        var u, c, l = this._events[a],
                            p = arguments.length;
                        if (l.fn) {
                            switch (l.once && this.removeListener(e, l.fn, void 0, 1), p) {
                                case 1:
                                    return l.fn.call(l.context), 1;
                                case 2:
                                    return l.fn.call(l.context, t), 1;
                                case 3:
                                    return l.fn.call(l.context, t, r), 1;
                                case 4:
                                    return l.fn.call(l.context, t, r, o), 1;
                                case 5:
                                    return l.fn.call(l.context, t, r, o, i), 1;
                                case 6:
                                    return l.fn.call(l.context, t, r, o, i, s), 1
                            }
                            for (c = 1, u = new Array(p - 1); c < p; c++) u[c - 1] = arguments[c];
                            l.fn.apply(l.context, u)
                        } else {
                            var h, f = l.length;
                            for (c = 0; c < f; c++) switch (l[c].once && this.removeListener(e, l[c].fn, void 0, 1), p) {
                                case 1:
                                    l[c].fn.call(l[c].context);
                                    break;
                                case 2:
                                    l[c].fn.call(l[c].context, t);
                                    break;
                                case 3:
                                    l[c].fn.call(l[c].context, t, r);
                                    break;
                                case 4:
                                    l[c].fn.call(l[c].context, t, r, o);
                                    break;
                                default:
                                    if (!u)
                                        for (h = 1, u = new Array(p - 1); h < p; h++) u[h - 1] = arguments[h];
                                    l[c].fn.apply(l[c].context, u)
                            }
                        }
                        return 1
                    }, a.prototype.on = function (e, t, n) {
                        return i(this, e, t, n, 0)
                    }, a.prototype.once = function (e, t, n) {
                        return i(this, e, t, n, 1)
                    }, a.prototype.removeListener = function (e, t, r, o) {
                        var i = n ? n + e : e;
                        if (!this._events[i]) return this;
                        if (!t) return s(this, i), this;
                        var a = this._events[i];
                        if (a.fn) a.fn !== t || o && !a.once || r && a.context !== r || s(this, i);
                        else {
                            for (var u = 0, c = [], l = a.length; u < l; u++)(a[u].fn !== t || o && !a[u].once || r && a[u].context !== r) && c.push(a[u]);
                            c.length ? this._events[i] = 1 === c.length ? c[0] : c : s(this, i)
                        }
                        return this
                    }, a.prototype.removeAllListeners = function (e) {
                        var t;
                        return e ? (t = n ? n + e : e, this._events[t] && s(this, t)) : (this._events = new r, this._eventsCount = 0), this
                    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = n, a.EventEmitter = a, e.exports = a
                }),
                Go = function (e) {
                    var t, n, r, o, i;
                    return W(e.context) ? (t = "", n = 0, r = 0, o = 0, i = 1) : (t = e.context.a2Key, n = e.context.tinyID, r = e.context.SDKAppID, o = e.context.contentType, i = e.context.apn), {
                        platform: le,
                        websdkappid: ce,
                        v: ue,
                        a2: t,
                        tinyid: n,
                        sdkappid: r,
                        contentType: o,
                        apn: i,
                        reqtime: function () {
                            return +new Date
                        }
                    }
                },
                ko = function () {
                    function e(t) {
                        A(this, e), this.isReady = 0, this.tim = t, this.context = t.context, this._initList(), this._updateWhenCTXIsReady()
                    }
                    return O(e, [{
                        key: "_updateWhenCTXIsReady",
                        value: function () {
                            this.tim.innerEmitter.on(_e.CONTEXT_UPDATED, this.update, this), this.tim.innerEmitter.on(_e.CONTEXT_RESET, this.reset, this)
                        }
                    }, {
                        key: "update",
                        value: function (e) {
                            var t = e.context;
                            this.context = t, this._initList()
                        }
                    }, {
                        key: "reset",
                        value: function (e) {
                            this.context = e.data, this._initList()
                        }
                    }, {
                        key: "get",
                        value: function (e) {
                            var t = e.name,
                                n = e.action,
                                r = e.param;
                            if (void 0 === this.config[t]) throw new ae({
                                code: ie.NETWORK_PACKAGE_UNDEFINED,
                                message: "".concat(se.NETWORK_PACKAGE_UNDEFINED, ": PackageConfig.").concat(t)
                            });
                            if (void 0 === this.config[t][n]) throw new ae({
                                code: ie.NETWORK_PACKAGE_UNDEFINED,
                                message: "".concat(se.NETWORK_PACKAGE_UNDEFINED, ": PackageConfig.").concat(t, ".").concat(n)
                            });
                            var o = function e(t) {
                                if (0 === Object.getOwnPropertyNames(t).length) return Object.create(null);
                                var n = Array.isArray(t) ? [] : Object.create(null),
                                    r = "";
                                for (var o in t) null !== t[o] ? void 0 !== t[o] ? (r = D(t[o]), ["string", "number", "function", "boolean"].indexOf(r) >= 0 ? n[o] = t[o] : n[o] = e(t[o])) : n[o] = void 0 : n[o] = null;
                                return n
                            }(this.config[t][n]);
                            return o.requestData = this._initRequestData(r, o), o.encode = this._initEncoder(o), o.decode = this._initDecoder(o), o
                        }
                    }, {
                        key: "set",
                        value: function (e) {
                            var t = e.key,
                                n = e.value;
                            if (0 != !!t) {
                                var r = t.split(".");
                                if (!(r.length <= 0)) {
                                    ! function e(t, n, r, o) {
                                        var i = n[r];
                                        "object" === D(t[i]) ? e(t[i], n, r + 1, o) : t[i] = o
                                    }(this.config, r, 0, n)
                                }
                            }
                        }
                    }, {
                        key: "_initList",
                        value: function () {
                            var e;
                            this.config = {}, this.config.accessLayer = (e = this.tim, {
                                create: null,
                                query: {
                                    serverName: fe.NAME.WEB_IM,
                                    cmd: fe.CMD.ACCESS_LAYER,
                                    channel: fe.CHANNEL.XHR,
                                    protocol: he,
                                    method: "POST",
                                    queryString: {
                                        platform: le,
                                        identifier: e.loginInfo.identifier,
                                        usersig: e.loginInfo.userSig,
                                        contentType: e.loginInfo.contentType,
                                        apn: null != e.context ? e.context.apn : 1,
                                        websdkappid: ce,
                                        v: ue
                                    },
                                    requestData: {}
                                },
                                update: null,
                                delete: null
                            }), this.config.login = function (e) {
                                return {
                                    create: null,
                                    query: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.LOGIN,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: {
                                            websdkappid: ce,
                                            v: ue,
                                            platform: le,
                                            identifier: e.loginInfo.identifier,
                                            usersig: e.loginInfo.userSig,
                                            sdkappid: e.loginInfo.SDKAppID,
                                            accounttype: e.loginInfo.accountType,
                                            contentType: null != e.context ? e.context.contentType : 0,
                                            apn: null != e.context ? e.context.apn : 1,
                                            reqtime: +new Date / 1e3
                                        },
                                        requestData: {
                                            state: "Online"
                                        },
                                        keyMaps: {
                                            request: {
                                                tinyID: "tinyId"
                                            },
                                            response: {
                                                TinyId: "tinyID"
                                            }
                                        }
                                    },
                                    update: null,
                                    delete: null
                                }
                            }(this.tim), this.config.logout = function (e) {
                                return {
                                    create: null,
                                    query: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.LOGOUT_ALL,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: {
                                            websdkappid: ce,
                                            v: ue,
                                            platform: le,
                                            a2: null != e.context ? e.context.a2Key : "",
                                            tinyid: null != e.context ? e.context.tinyID : "",
                                            sdkappid: null != e.loginInfo ? e.loginInfo.SDKAppID : 0,
                                            contentType: null != e.context ? e.context.contentType : 0,
                                            apn: null != e.context ? e.context.apn : "",
                                            reqtime: +new Date / 1e3
                                        },
                                        requestData: {}
                                    },
                                    update: null,
                                    delete: null
                                }
                            }(this.tim), this.config.longPollLogout = function (e) {
                                return {
                                    create: null,
                                    query: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.LOGOUT_LONG_POLL,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: {
                                            websdkappid: ce,
                                            v: ue,
                                            platform: le,
                                            a2: null != e.context ? e.context.a2Key : "",
                                            tinyid: null != e.context ? e.context.tinyID : 0,
                                            sdkappid: null != e.context ? e.context.SDKAppID : 0,
                                            contentType: null != e.context ? e.context.contentType : 0,
                                            apn: null != e.context ? e.context.apn : 1,
                                            reqtime: function () {
                                                return Date.now()
                                            }
                                        },
                                        requestData: {
                                            longPollID: ""
                                        },
                                        keyMaps: {
                                            request: {
                                                longPollID: "LongPollingId"
                                            }
                                        }
                                    },
                                    update: null,
                                    delete: null
                                }
                            }(this.tim), this.config.profile = function (e) {
                                var t = Go(e),
                                    n = fe.NAME.PROFILE,
                                    r = fe.CHANNEL.XHR,
                                    o = he,
                                    i = [];
                                for (var s in C) i.push(C[s]);
                                return {
                                    query: {
                                        serverName: n,
                                        cmd: fe.CMD.PORTRAIT_GET,
                                        channel: r,
                                        protocol: o,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            toAccount: [],
                                            tagList: i
                                        }
                                    },
                                    update: {
                                        serverName: n,
                                        cmd: fe.CMD.PORTRAIT_SET,
                                        channel: r,
                                        protocol: o,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            profileItem: [{
                                                tag: C.NICK,
                                                value: ""
                                            }, {
                                                tag: C.GENDER,
                                                value: ""
                                            }, {
                                                tag: C.ALLOWTYPE,
                                                value: ""
                                            }, {
                                                tag: C.AVATAR,
                                                value: ""
                                            }]
                                        }
                                    }
                                }
                            }(this.tim), this.config.group = function (e) {
                                var t = {
                                        websdkappid: ce,
                                        v: ue,
                                        platform: le,
                                        a2: null != e.context && e.context.a2Key ? e.context.a2Key : void 0,
                                        tinyid: null != e.context && e.context.tinyID ? e.context.tinyID : void 0,
                                        sdkappid: null != e.context ? e.context.SDKAppID : 0,
                                        contentType: null != e.context ? e.context.contentType : 0,
                                        accounttype: null != e.context ? e.context.accountType : 0
                                    },
                                    n = {
                                        request: {
                                            ownerID: "Owner_Account",
                                            userID: "Member_Account",
                                            newOwnerID: "NewOwner_Account",
                                            maxMemberNum: "MaxMemberCount",
                                            groupCustomField: "AppDefinedData",
                                            memberCustomField: "AppMemberDefinedData",
                                            groupCustomFieldFilter: "AppDefinedDataFilter_Group",
                                            memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember",
                                            messageRemindType: "MsgFlag",
                                            userIDList: "MemberList",
                                            groupIDList: "GroupIdList",
                                            applyMessage: "ApplyMsg",
                                            muteTime: "ShutUpTime",
                                            joinOption: "ApplyJoinOption"
                                        },
                                        response: {
                                            GroupIdList: "groups",
                                            MsgFlag: "messageRemindType",
                                            AppDefinedData: "groupCustomField",
                                            AppMemberDefinedData: "memberCustomField",
                                            AppDefinedDataFilter_Group: "groupCustomFieldFilter",
                                            AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter",
                                            InfoSeq: "infoSequence",
                                            MemberList: "members",
                                            GroupInfo: "groups",
                                            ShutUpUntil: "muteUntil",
                                            ApplyJoinOption: "joinOption"
                                        }
                                    };
                                return {
                                    create: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.CREATE_GROUP,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            type: r.PRIVATE,
                                            name: void 0,
                                            groupID: void 0,
                                            ownerID: e.loginInfo.identifier,
                                            introduction: void 0,
                                            notification: void 0,
                                            avatar: void 0,
                                            maxMemberNum: void 0,
                                            joinOption: void 0,
                                            memberList: void 0,
                                            groupCustomField: void 0
                                        },
                                        keyMaps: n
                                    },
                                    list: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.GET_JOINED_GROUPS,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            userID: e.loginInfo.identifier,
                                            limit: void 0,
                                            offset: void 0,
                                            groupType: void 0,
                                            responseFilter: void 0
                                        },
                                        keyMaps: n
                                    },
                                    query: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.GET_GROUP_INFO,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupIDList: void 0,
                                            responseFilter: void 0
                                        },
                                        keyMaps: n
                                    },
                                    getGroupMemberList: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.GET_GROUP_MEMBER_INFO,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0,
                                            limit: 0,
                                            offset: 0,
                                            memberRoleFilter: void 0,
                                            memberInfoFilter: void 0
                                        },
                                        keyMaps: n
                                    },
                                    quitGroup: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.QUIT_GROUP,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0
                                        }
                                    },
                                    changeGroupOwner: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.CHANGE_GROUP_OWNER,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0,
                                            newOwnerID: void 0
                                        },
                                        keyMaps: n
                                    },
                                    destroyGroup: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.DESTROY_GROUP,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0
                                        }
                                    },
                                    updateGroupProfile: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.MODIFY_GROUP_INFO,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0,
                                            name: void 0,
                                            introduction: void 0,
                                            notification: void 0,
                                            avatar: void 0,
                                            maxMemberNum: void 0,
                                            joinOption: void 0,
                                            groupCustomField: void 0
                                        },
                                        keyMaps: {
                                            request: R({}, n.request, {
                                                groupCustomField: "AppDefinedData"
                                            }),
                                            response: n.response
                                        }
                                    },
                                    modifyGroupMemberInfo: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.MODIFY_GROUP_MEMBER_INFO,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0,
                                            userID: void 0,
                                            messageRemindType: void 0,
                                            nameCard: void 0,
                                            role: void 0,
                                            memberCustomField: void 0,
                                            muteTime: void 0
                                        },
                                        keyMaps: n
                                    },
                                    addGroupMember: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.ADD_GROUP_MEMBER,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0,
                                            silence: void 0,
                                            userIDList: void 0
                                        },
                                        keyMaps: n
                                    },
                                    deleteGroupMember: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.DELETE_GROUP_MEMBER,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0,
                                            userIDList: void 0,
                                            reason: void 0
                                        },
                                        keyMaps: {
                                            request: {
                                                userIDList: "MemberToDel_Account"
                                            }
                                        }
                                    },
                                    searchGroupByID: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.SEARCH_GROUP_BY_ID,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupIDList: void 0,
                                            responseFilter: {
                                                groupBasePublicInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "CreateTime", "Owner_Account", "LastInfoTime", "LastMsgTime", "NextMsgSeq", "MemberNum", "MaxMemberNum", "ApplyJoinOption"]
                                            }
                                        },
                                        keyMaps: {
                                            request: {
                                                groupIDList: "GroupIdList"
                                            }
                                        }
                                    },
                                    applyJoinGroup: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.APPLY_JOIN_GROUP,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0,
                                            applyMessage: void 0,
                                            userDefinedField: void 0
                                        },
                                        keyMaps: n
                                    },
                                    applyJoinAVChatRoom: {
                                        serverName: fe.NAME.BIG_GROUP_NO_AUTH,
                                        cmd: fe.CMD.APPLY_JOIN_GROUP,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: {
                                            websdkappid: ce,
                                            v: ue,
                                            platform: le,
                                            sdkappid: null != e.context ? e.context.SDKAppID : 0,
                                            contentType: null != e.context ? e.context.contentType : 0,
                                            accounttype: null != e.context ? e.context.accountType : 0
                                        },
                                        requestData: {
                                            groupID: void 0,
                                            applyMessage: void 0,
                                            userDefinedField: void 0
                                        },
                                        keyMaps: n
                                    },
                                    handleApplyJoinGroup: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.HANDLE_APPLY_JOIN_GROUP,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0,
                                            applicant: void 0,
                                            handleAction: void 0,
                                            handleMessage: void 0,
                                            authentication: void 0,
                                            messageKey: void 0,
                                            userDefinedField: void 0
                                        },
                                        keyMaps: {
                                            request: {
                                                applicant: "Applicant_Account",
                                                handleAction: "HandleMsg",
                                                handleMessage: "ApprovalMsg",
                                                messageKey: "MsgKey"
                                            },
                                            response: {
                                                MsgKey: "messageKey"
                                            }
                                        }
                                    },
                                    deleteGroupSystemNotice: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.DELETE_GROUP_SYSTEM_MESSAGE,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            messageListToDelete: void 0
                                        },
                                        keyMaps: {
                                            request: {
                                                messageListToDelete: "DelMsgList",
                                                messageSeq: "MsgSeq",
                                                messageRandom: "MsgRandom"
                                            }
                                        }
                                    }
                                }
                            }(this.tim), this.config.longPollID = function (e) {
                                return {
                                    create: {},
                                    query: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.GET_LONG_POLL_ID,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        queryString: {
                                            websdkappid: ce,
                                            v: ue,
                                            platform: le,
                                            a2: null != e.context ? e.context.a2Key : "",
                                            tinyid: null != e.context ? e.context.tinyID : 0,
                                            sdkappid: null != e.context ? e.context.SDKAppID : 0,
                                            contentType: null != e.context ? e.context.contentType : 0,
                                            apn: null != e.context ? e.context.apn : 1,
                                            reqtime: +new Date / 1e3
                                        },
                                        requestData: {},
                                        keyMaps: {
                                            response: {
                                                LongPollingId: "longPollingID"
                                            }
                                        }
                                    },
                                    update: {},
                                    delete: {}
                                }
                            }(this.tim), this.config.longPoll = function (e) {
                                var t = {
                                    websdkappid: ce,
                                    v: ue,
                                    platform: le,
                                    a2: null != e.context ? e.context.a2Key : "",
                                    tinyid: null != e.context ? e.context.tinyID : 0,
                                    sdkappid: null != e.context ? e.context.SDKAppID : 0,
                                    contentType: null != e.context ? e.context.contentType : 0,
                                    accounttype: null != e.context ? e.loginInfo.accountType : 0,
                                    apn: null != e.context ? e.context.apn : 1,
                                    reqtime: Math.ceil(+new Date / 1e3)
                                };
                                return {
                                    create: {},
                                    query: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.LONG_POLL,
                                        channel: fe.CHANNEL.AUTO,
                                        protocol: he,
                                        queryString: t,
                                        requestData: {
                                            timeout: null,
                                            cookie: {
                                                notifySeq: 0,
                                                noticeSeq: 0,
                                                longPollingID: 0
                                            }
                                        },
                                        keyMaps: {
                                            response: {
                                                C2cMsgArray: "C2CMessageArray",
                                                GroupMsgArray: "groupMessageArray",
                                                GroupTips: "groupTips",
                                                C2cNotifyMsgArray: "C2CNotifyMessageArray",
                                                ClientSeq: "clientSequence",
                                                MsgPriority: "messagePriority",
                                                NoticeSeq: "noticeSequence",
                                                MsgContent: "content",
                                                MsgType: "type",
                                                MsgBody: "elements",
                                                ToGroupId: "to",
                                                Desc: "description",
                                                Ext: "extension",
                                                MsgFrom_AccountExtraInfo: "messageFromAccountExtraInformation"
                                            }
                                        }
                                    },
                                    update: {},
                                    delete: {}
                                }
                            }(this.tim), this.config.applyC2C = function (e) {
                                var t = Go(e),
                                    n = fe.NAME.FRIEND,
                                    r = fe.CHANNEL.XHR,
                                    o = he;
                                return {
                                    create: {
                                        serverName: n,
                                        cmd: fe.CMD.FRIEND_ADD,
                                        channel: r,
                                        protocol: o,
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            addFriendItem: []
                                        }
                                    },
                                    get: {
                                        serverName: n,
                                        cmd: fe.CMD.GET_PENDENCY,
                                        channel: r,
                                        protocol: o,
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            pendencyType: "Pendency_Type_ComeIn"
                                        }
                                    },
                                    update: {
                                        serverName: n,
                                        cmd: fe.CMD.RESPONSE_PENDENCY,
                                        channel: r,
                                        protocol: o,
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            responseFriendItem: []
                                        }
                                    },
                                    delete: {
                                        serverName: n,
                                        cmd: fe.CMD.DELETE_PENDENCY,
                                        channel: r,
                                        protocol: o,
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            toAccount: [],
                                            pendencyType: "Pendency_Type_ComeIn"
                                        }
                                    }
                                }
                            }(this.tim), this.config.friend = function (e) {
                                var t = Go(e),
                                    n = fe.NAME.FRIEND,
                                    r = fe.CHANNEL.XHR,
                                    o = he;
                                return {
                                    get: {
                                        serverName: n,
                                        cmd: fe.CMD.FRIEND_GET_ALL,
                                        channel: r,
                                        protocol: o,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            timeStamp: 0,
                                            startIndex: 0,
                                            getCount: 100,
                                            lastStandardSequence: 0,
                                            tagList: ["Tag_Profile_IM_Nick", "Tag_SNS_IM_Remark"]
                                        },
                                        keyMaps: {
                                            request: {},
                                            response: {}
                                        }
                                    },
                                    delete: {
                                        serverName: n,
                                        cmd: fe.CMD.FRIEND_DELETE,
                                        channel: r,
                                        protocol: o,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            toAccount: [],
                                            deleteType: "Delete_Type_Single"
                                        }
                                    }
                                }
                            }(this.tim), this.config.blacklist = function (e) {
                                var t = Go(e);
                                return {
                                    create: {
                                        serverName: fe.NAME.FRIEND,
                                        cmd: fe.CMD.ADD_BLACKLIST,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            toAccount: []
                                        }
                                    },
                                    get: {
                                        serverName: fe.NAME.FRIEND,
                                        cmd: fe.CMD.GET_BLACKLIST,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            startIndex: 0,
                                            maxLimited: 30,
                                            lastSequence: 0
                                        }
                                    },
                                    delete: {
                                        serverName: fe.NAME.FRIEND,
                                        cmd: fe.CMD.DELETE_BLACKLIST,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: "",
                                            toAccount: []
                                        }
                                    },
                                    update: {}
                                }
                            }(this.tim), this.config.c2cMessage = function (e) {
                                var t = {
                                        platform: le,
                                        websdkappid: ce,
                                        v: ue,
                                        a2: null !== e.context ? e.context.a2Key : "",
                                        tinyid: null !== e.context ? e.context.tinyID : 0,
                                        sdkappid: null !== e.context ? e.context.SDKAppID : 0,
                                        contentType: null !== e.context ? e.context.contentType : 0,
                                        apn: null !== e.context ? e.context.apn : 1,
                                        reqtime: function () {
                                            return +new Date
                                        }
                                    },
                                    n = {
                                        request: {
                                            fromAccount: "From_Account",
                                            toAccount: "To_Account",
                                            msgTimeStamp: "MsgTimeStamp",
                                            msgSeq: "MsgSeq",
                                            msgRandom: "MsgRandom",
                                            msgBody: "MsgBody",
                                            count: "MaxCnt",
                                            lastMessageTime: "LastMsgTime",
                                            messageKey: "MsgKey",
                                            peerAccount: "Peer_Account",
                                            data: "Data",
                                            description: "Desc",
                                            extension: "Ext",
                                            type: "MsgType",
                                            content: "MsgContent",
                                            sizeType: "Type",
                                            uuid: "UUID",
                                            imageUrl: "URL",
                                            fileUrl: "Url",
                                            downloadFlag: "Download_Flag"
                                        },
                                        response: {
                                            MsgContent: "content",
                                            MsgTime: "time",
                                            Data: "data",
                                            Desc: "description",
                                            Ext: "extension",
                                            MsgKey: "messageKey",
                                            MsgType: "type",
                                            MsgBody: "elements",
                                            Download_Flag: "downloadFlag"
                                        }
                                    };
                                return {
                                    create: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.SEND_MESSAGE,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: e.loginInfo.identifier,
                                            toAccount: "",
                                            msgTimeStamp: Math.ceil(+new Date / 1e3),
                                            msgSeq: 0,
                                            msgRandom: 0,
                                            msgBody: []
                                        },
                                        keyMaps: n
                                    },
                                    query: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.GET_C2C_ROAM_MESSAGES,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            peerAccount: "",
                                            count: 15,
                                            lastMessageTime: 0,
                                            messageKey: ""
                                        },
                                        keyMaps: n
                                    },
                                    update: null,
                                    delete: null
                                }
                            }(this.tim), this.config.groupMessage = function (e) {
                                var t = {
                                        platform: le,
                                        websdkappid: ce,
                                        v: ue,
                                        a2: null !== e.context ? e.context.a2Key : "",
                                        tinyid: null !== e.context ? e.context.tinyID : 0,
                                        sdkappid: null !== e.context ? e.context.SDKAppID : 0,
                                        contentType: null !== e.context ? e.context.contentType : 0,
                                        apn: null !== e.context ? e.context.apn : 1,
                                        reqtime: function () {
                                            return +new Date
                                        }
                                    },
                                    n = {
                                        request: {
                                            to: "GroupId",
                                            extension: "Ext",
                                            data: "Data",
                                            description: "Desc",
                                            random: "Random",
                                            sequence: "ReqMsgSeq",
                                            count: "ReqMsgNumber",
                                            type: "MsgType",
                                            content: "MsgContent",
                                            elements: "MsgBody",
                                            sizeType: "Type",
                                            uuid: "UUID",
                                            imageUrl: "URL",
                                            fileUrl: "Url",
                                            downloadFlag: "Download_Flag",
                                            clientSequence: "ClientSeq"
                                        },
                                        response: {
                                            Random: "random",
                                            MsgTime: "time",
                                            MsgSeq: "sequence",
                                            ReqMsgSeq: "sequence",
                                            RspMsgList: "messagesList",
                                            IsPlaceMsg: "isPlaceMessage",
                                            IsSystemMsg: "isSystemMessage",
                                            ToGroupId: "to",
                                            MsgFrom_AccountExtraInfo: "messageFromAccountExtraInformation",
                                            EnumFrom_AccountType: "fromAccountType",
                                            EnumTo_AccountType: "toAccountType",
                                            GroupCode: "groupCode",
                                            MsgFlag: "messageRemindType",
                                            MsgPriority: "messagePriority",
                                            MsgBody: "elements",
                                            MsgType: "type",
                                            MsgContent: "content",
                                            IsFinished: "complete",
                                            Download_Flag: "downloadFlag",
                                            ClientSeq: "clientSequence"
                                        }
                                    };
                                return {
                                    create: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.SEND_GROUP_MESSAGE,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            groupID: "",
                                            fromAccount: e.loginInfo.identifier,
                                            random: 0,
                                            clientSequence: 0,
                                            msgBody: []
                                        },
                                        keyMaps: n
                                    },
                                    query: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.GET_GROUP_ROAM_MESSAGES,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            groupID: "",
                                            count: 15,
                                            sequence: ""
                                        },
                                        keyMaps: n
                                    },
                                    update: null,
                                    delete: null
                                }
                            }(this.tim), this.config.conversation = function (e) {
                                var t = {
                                    platform: le,
                                    websdkappid: ce,
                                    v: ue,
                                    a2: null !== e.context ? e.context.a2Key : "",
                                    tinyid: null !== e.context ? e.context.tinyID : 0,
                                    sdkappid: null !== e.context ? e.context.SDKAppID : 0,
                                    contentType: null !== e.context ? e.context.contentType : 0,
                                    apn: null !== e.context ? e.context.apn : 1
                                };
                                return {
                                    query: {
                                        serverName: fe.NAME.RECENT_CONTACT,
                                        cmd: fe.CMD.GET_CONVERSATION_LIST,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: e.loginInfo.identifier,
                                            count: 0
                                        },
                                        keyMaps: {
                                            request: {},
                                            response: {
                                                SessionItem: "conversations",
                                                ToAccount: "groupID",
                                                To_Account: "userID",
                                                UnreadMsgCount: "unreadCount",
                                                MsgGroupReadedSeq: "messageReadSeq"
                                            }
                                        }
                                    },
                                    delete: {
                                        serverName: fe.NAME.RECENT_CONTACT,
                                        cmd: fe.CMD.DELETE_CONVERSATION,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            fromAccount: e.loginInfo.identifier,
                                            toAccount: void 0,
                                            type: 1,
                                            toGroupID: void 0
                                        },
                                        keyMaps: {
                                            request: {
                                                toGroupID: "ToGroupid"
                                            }
                                        }
                                    },
                                    setC2CMessageRead: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.SET_C2C_MESSAGE_READ,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            C2CMsgReaded: void 0
                                        },
                                        keyMaps: {
                                            request: {
                                                lastMessageTime: "LastedMsgTime"
                                            }
                                        }
                                    },
                                    setGroupMessageRead: {
                                        serverName: fe.NAME.GROUP,
                                        cmd: fe.CMD.SET_GROUP_MESSAGE_READ,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            groupID: void 0,
                                            messageReadSeq: void 0
                                        },
                                        keyMaps: {
                                            request: {
                                                messageReadSeq: "MsgReadedSeq"
                                            }
                                        }
                                    }
                                }
                            }(this.tim), this.config.syncMessage = function (e) {
                                var t = {
                                    platform: le,
                                    websdkappid: ce,
                                    v: ue,
                                    a2: null !== e.context ? e.context.a2Key : "",
                                    tinyid: null !== e.context ? e.context.tinyID : 0,
                                    sdkappid: null !== e.context ? e.context.SDKAppID : 0,
                                    contentType: null !== e.context ? e.context.contentType : 0,
                                    apn: null !== e.context ? e.context.apn : 1,
                                    reqtime: function () {
                                        return [Math.ceil(+new Date), Math.random()].join("")
                                    }
                                };
                                return {
                                    create: null,
                                    query: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.GET_MESSAGES,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            cookie: "",
                                            syncFlag: 0
                                        },
                                        keyMaps: {
                                            request: {
                                                fromAccount: "From_Account",
                                                toAccount: "To_Account",
                                                from: "From_Account",
                                                to: "To_Account",
                                                time: "MsgTimeStamp",
                                                sequence: "MsgSeq",
                                                random: "MsgRandom",
                                                elements: "MsgBody"
                                            },
                                            response: {
                                                MsgList: "messageList",
                                                SyncFlag: "syncFlag",
                                                To_Account: "to",
                                                From_Account: "from",
                                                ClientSeq: "clientSequence",
                                                MsgSeq: "sequence",
                                                NoticeSeq: "noticeSequence",
                                                NotifySeq: "notifySequence",
                                                MsgRandom: "random",
                                                MsgTimeStamp: "time",
                                                MsgContent: "content",
                                                ToGroupId: "groupID",
                                                MsgKey: "messageKey",
                                                GroupTips: "groupTips",
                                                MsgBody: "elements",
                                                MsgType: "type"
                                            }
                                        }
                                    },
                                    update: null,
                                    delete: null
                                }
                            }(this.tim), this.config.AVChatRoom = function (e) {
                                return {
                                    startLongPoll: {
                                        serverName: fe.NAME.BIG_GROUP_LONG_POLLING_NO_AUTH,
                                        cmd: fe.CMD.AVCHATROOM_LONG_POLL,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: {
                                            websdkappid: ce,
                                            v: ue,
                                            platform: le,
                                            sdkappid: e.loginInfo.SDKAppID,
                                            accounttype: "792",
                                            apn: null != e.context ? e.context.apn : 1,
                                            reqtime: function () {
                                                return +new Date
                                            }
                                        },
                                        requestData: {
                                            USP: 1,
                                            startSeq: 1,
                                            holdTime: 90,
                                            key: void 0
                                        },
                                        keyMaps: {
                                            request: {
                                                USP: "USP"
                                            },
                                            response: {
                                                ToGroupId: "groupID"
                                            }
                                        }
                                    }
                                }
                            }(this.tim), this.config.cosUpload = function (e) {
                                var t = {
                                    platform: le,
                                    websdkappid: ce,
                                    v: ue,
                                    a2: null !== e.context ? e.context.a2Key : "",
                                    tinyid: null !== e.context ? e.context.tinyID : 0,
                                    sdkappid: null !== e.context ? e.context.SDKAppID : 0,
                                    contentType: null !== e.context ? e.context.contentType : 0,
                                    apn: null !== e.context ? e.context.apn : 1,
                                    reqtime: function () {
                                        return Date.now()
                                    }
                                };
                                return {
                                    create: {
                                        serverName: fe.NAME.OPEN_IM,
                                        cmd: fe.CMD.FILE_UPLOAD,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            appVersion: "2.1",
                                            fromAccount: "",
                                            toAccount: "",
                                            sequence: 0,
                                            time: function () {
                                                return Math.ceil(Date.now() / 1e3)
                                            },
                                            random: function () {
                                                return Be()
                                            },
                                            fileStrMd5: "",
                                            fileSize: "",
                                            serverVer: 1,
                                            authKey: "",
                                            busiId: 1,
                                            pkgFlag: 1,
                                            sliceOffset: 0,
                                            sliceSize: 0,
                                            sliceData: "",
                                            contentType: "application/x-www-form-urlencoded"
                                        },
                                        keyMaps: {
                                            request: {},
                                            response: {}
                                        }
                                    },
                                    update: null,
                                    delete: null
                                }
                            }(this.tim), this.config.cosSig = function (e) {
                                var t = {
                                    sdkappid: function () {
                                        return e.loginInfo.SDKAppID
                                    },
                                    identifier: function () {
                                        return e.loginInfo.identifier
                                    },
                                    userSig: function () {
                                        return e.context.userSig
                                    }
                                };
                                return {
                                    create: null,
                                    query: {
                                        serverName: fe.NAME.IM_COS_SIGN,
                                        cmd: fe.CMD.COS_SIGN,
                                        channel: fe.CHANNEL.XHR,
                                        protocol: he,
                                        method: "POST",
                                        queryString: t,
                                        requestData: {
                                            cmd: "open_im_cos_svc",
                                            subCmd: "get_cos_token",
                                            duration: 300,
                                            version: 1
                                        },
                                        keyMaps: {
                                            request: {
                                                userSig: "usersig",
                                                subCmd: "sub_cmd",
                                                cmd: "cmd",
                                                duration: "duration",
                                                version: "version"
                                            },
                                            response: {
                                                expired_time: "expiredTime",
                                                bucket_name: "bucketName",
                                                session_token: "sessionToken",
                                                tmp_secret_id: "secretId",
                                                tmp_secret_key: "secretKey"
                                            }
                                        }
                                    },
                                    update: null,
                                    delete: null
                                }
                            }(this.tim)
                        }
                    }, {
                        key: "_initRequestData",
                        value: function (e, t) {
                            if (void 0 === e) return $e(t.requestData, this._getRequestMap(t), this.tim);
                            var n = t.requestData,
                                r = Object.create(null);
                            for (var o in n) r[o] = "function" == typeof n[o] ? n[o]() : n[o], void 0 !== e[o] && (r[o] = e[o]);
                            return r = $e(r, this._getRequestMap(t), this.tim)
                        }
                    }, {
                        key: "_getRequestMap",
                        value: function (e) {
                            if (e.keyMaps && e.keyMaps.request && Object.keys(e.keyMaps.request).length > 0) return e.keyMaps.request
                        }
                    }, {
                        key: "_initEncoder",
                        value: function (e) {
                            switch (e.protocol) {
                                case he:
                                    return function (e) {
                                        if ("string" === D(e)) try {
                                            return JSON.parse(e)
                                        } catch (t) {
                                            return e
                                        }
                                        return e
                                    }.bind(e);
                                case pe:
                                    return function (e) {
                                        return e
                                    }.bind(e);
                                default:
                                    return function (e) {
                                        return Ge.warn("PackageConfig._initEncoder(), unknow response type, data: ", JSON.stringify(e)), e
                                    }.bind(e)
                            }
                        }
                    }, {
                        key: "_initDecoder",
                        value: function (e) {
                            switch (e.protocol) {
                                case he:
                                    return function (e) {
                                        if ("string" === D(e)) try {
                                            return JSON.parse(e)
                                        } catch (t) {
                                            return e
                                        }
                                        return e
                                    }.bind(e);
                                case pe:
                                    return function (e) {
                                        return e
                                    }.bind(e);
                                default:
                                    return function (e) {
                                        return Ge.warn("PackageConfig._initDecoder(), unknow response type, data: ", e), e
                                    }.bind(e)
                            }
                        }
                    }]), e
                }(),
                wo = function (t) {
                    function n(e) {
                        var t;
                        return A(this, n), (t = F(this, G(n).call(this, e)))._initialization(), t
                    }
                    return P(n, nt), O(n, [{
                        key: "_initialization",
                        value: function () {
                            this._syncOffset = "", this._syncNoticeList = [], this._syncEventArray = [], this._syncMessagesIsRunning = 0, this._syncMessagesFinished = 0, this._isLongPoll = 0, this._longPollID = 0, this._noticeSequence = 0, this._initializeListener(), this._runLoop = null
                        }
                    }, {
                        key: "getLongPollID",
                        value: function () {
                            return this._longPollID
                        }
                    }, {
                        key: "_IAmReady",
                        value: function () {
                            this.triggerReady()
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            this._noticeSequence = 0, this._resetSync(), this._resetLongpoll()
                        }
                    }, {
                        key: "_resetSync",
                        value: function () {
                            this._syncOffset = "", this._syncNoticeList = [], this._syncEventArray = [], this._syncMessagesIsRunning = 0, this._syncMessagesFinished = 0
                        }
                    }, {
                        key: "_resetLongpoll",
                        value: function () {
                            this._longPollID = 0, this._isLongPoll = 0
                        }
                    }, {
                        key: "_setNoticeSeqInRequestData",
                        value: function (e) {
                            e.Cookie.NoticeSeq = this._noticeSequence
                        }
                    }, {
                        key: "_updatenoticeSequence",
                        value: function (e) {
                            e || this._noticeSequence++;
                            var t = e[e.length - 1].noticeSequence;
                            t || this._noticeSequence++, "number" != typeof t && this._noticeSequence++, t < this._noticeSequence && this._noticeSequence++, this._noticeSequence = t
                        }
                    }, {
                        key: "_initializeListener",
                        value: function () {
                            var e = this.tim.innerEmitter;
                            e.on(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._startSyncMessages, this), e.on(_e.SYNC_MESSAGE_C2C_FINISHED, this._realTimeNotice, this), e.on(_e.NOTICE_LONGPOLL_GETID_SUCCESS, this._onGetLongPollIDSuccess, this), e.on(_e.SIGN_LOGOUT_SUCCESS, this.stopLongPoll, this), e.on(_e.NOTICE_LONGPOLL_SOON_RECONNECT, this._onChannelReconnect, this), e.on(_e.NOTICE_LONGPOLL_DISCONNECT, this._onChannelDisconnected, this)
                        }
                    }, {
                        key: "_realTimeNotice",
                        value: function () {
                            Ge.log("NotificationController._realTimeNotice start..."), this._getLongPollID()
                        }
                    }, {
                        key: "_getLongPollID",
                        value: function () {
                            var e = this.tim,
                                t = e.innerEmitter,
                                n = e.connectionController;
                            if (0 === this._longPollID) {
                                var r = this.createPackage({
                                    name: "longPollID",
                                    action: "query"
                                });
                                n.request(r).then(function (e) {
                                    e.data.errorCode == it.REQUEST.SUCCESS ? t.emit(_e.NOTICE_LONGPOLL_GETID_SUCCESS, {
                                        data: e.data.longPollingID
                                    }) : t.emit(_e.NOTICE_LONGPOLL_GETID_FAIL, {
                                        data: e.data
                                    })
                                }).catch(function (e) {
                                    t.emit(_e.NOTICE_LONGPOLL_GETID_FAIL, e)
                                })
                            } else t.emit(_e.NOTICE_LONGPOLL_GETID_SUCCESS, {
                                data: this._longPollID
                            })
                        }
                    }, {
                        key: "_onGetLongPollIDSuccess",
                        value: function (e) {
                            this.tim.packageConfig.set({
                                key: "long_poll_logout.query.requestData.longPollingID",
                                value: e.data
                            }), this.tim.packageConfig.set({
                                key: "longPoll.query.requestData.cookie.longPollingID",
                                value: e.data
                            }), this._longPollID = e.data, this._startLongPoll(), this._IAmReady()
                        }
                    }, {
                        key: "_startLongPoll",
                        value: function () {
                            if (1 != this._isLongPoll) {
                                Ge.log("NotificationController._startLongPoll...");
                                var e = this.tim,
                                    t = e.connectionController,
                                    n = e.innerEmitter,
                                    r = this.createPackage({
                                        name: "longPoll",
                                        action: "query"
                                    });
                                this._isLongPoll = 1, n.emit(_e.NOTICE_LONGPOLL_START, {
                                    data: Date.now()
                                }), this._runLoop = t.createRunLoop({
                                    pack: r,
                                    before: this._setNoticeSeqInRequestData.bind(this),
                                    success: this._onNoticeReceived.bind(this),
                                    fail: this._onNoticeFail.bind(this)
                                }), this._runLoop.start()
                            }
                        }
                    }, {
                        key: "_onChannelReconnect",
                        value: function (e) {
                            this.stopLongPoll(), this.syncMessage()
                        }
                    }, {
                        key: "_onChannelDisconnected",
                        value: function () {}
                    }, {
                        key: "stopLongPoll",
                        value: function () {
                            Ge.log("NotificationController.stopLongPoll()"), this._runLoop.stop(), this._longPollID = 0, this._isLongPoll = 0, this.tim.innerEmitter.emit(_e.NOTICE_LONGPOLL_STOPPED), this.tim.outerEmitter.emit(e.NOTICE_LONGPOLL_STOPPED)
                        }
                    }, {
                        key: "_onNoticeReceived",
                        value: function (e) {
                            var t = this.tim,
                                n = t.innerEmitter,
                                r = t.statusController,
                                o = e.data,
                                i = !r.getChannelStatus();
                            if (n.emit(_e.NOTICE_LONGPOLL_REQUEST_ARRIVED, {
                                    data: Date.now()
                                }), o.errorCode !== it.REQUEST.SUCCESS) {
                                if (o.errorCode === ie.LONG_POLL_KICK_OUT) return n.emit(_e.NOTICE_LONGPOLL_KICKED_OUT), Ge.log("NotificationController._onNoticeReceived(), longPollingID was kicked"), void this.stopLongPoll();
                                Ge.log("NotificationController._onNoticeReceived(), error: ".concat(o.errorCode, ", errorInfo: ").concat(o.errorInfo)), n.emit(_e.ERROR_DETECTED, {
                                    code: o.errorCode,
                                    message: o.errorInfo
                                })
                            }
                            null != e.data.eventArray && 1 != i && this._eachEventArray(e.data.eventArray)
                        }
                    }, {
                        key: "_onNoticeFail",
                        value: function (e) {
                            this.tim.innerEmitter.emit(_e.ERROR_DETECTED, e.error), this.tim.innerEmitter.emit(_e.NOTICE_LONGPOLL_REQUEST_NOT_ARRIVED, {
                                data: Date.now()
                            })
                        }
                    }, {
                        key: "_eachEventArray",
                        value: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "poll",
                                n = Eo("NotificationController._eachEventArray()");
                            n.dot("start");
                            for (var r = this.tim.innerEmitter, o = null, i = 0, s = e.length; i < s; i++) {
                                o = e[i];
                                var a = this._confirmCarrierType(o);
                                n.dot("type ".concat(a));
                                var u = Ao(o.event, a, ",");
                                switch (n.dot("condition ".concat(u)), u) {
                                    case "9,1":
                                        this._updatenoticeSequence(o.C2CMessageArray), r.emit(_e.NOTICE_LONGPOLL_NEW_C2C_NOTICE, {
                                            data: o.C2CMessageArray,
                                            type: t
                                        }), n.dot("emit ".concat(_e.NOTICE_LONGPOLL_NEW_C2C_NOTICE));
                                        break;
                                    case "3,2":
                                        this._updatenoticeSequence(o.groupMessageArray), r.emit(_e.NOTICE_LONGPOLL_NEW_GROUP_MESSAGES, {
                                            data: o.groupMessageArray
                                        }), n.dot("emit ".concat(_e.NOTICE_LONGPOLL_NEW_GROUP_MESSAGES));
                                        break;
                                    case "4,3":
                                        this._updatenoticeSequence(o.groupTips), r.emit(_e.NOTICE_LONGPOLL_NEW_GROUP_TIPS, {
                                            data: o.groupTips
                                        }), n.dot("emit ".concat(_e.NOTICE_LONGPOLL_NEW_GROUP_TIPS));
                                        break;
                                    case "5,3":
                                        this._updatenoticeSequence(o.groupTips), r.emit(_e.NOTICE_LONGPOLL_NEW_GROUP_NOTICE, {
                                            data: {
                                                groupSystemNotices: o.groupTips,
                                                type: t
                                            }
                                        }), n.dot("emit ".concat(_e.NOTICE_LONGPOLL_NEW_GROUP_NOTICE));
                                        break;
                                    case "7,7":
                                        this._updatenoticeSequence(o.friendListMod), r.emit(_e.NOTICE_LONGPOLL_NEW_FRIEND_MESSAGES, {
                                            data: o.friendListMod
                                        }), n.dot("emit ".concat(_e.NOTICE_LONGPOLL_NEW_FRIEND_MESSAGES));
                                        break;
                                    case "8,6":
                                        this._updatenoticeSequence(o.profileModify), r.emit(_e.NOTICE_LONGPOLL_PROFILE_MODIFIED, {
                                            data: o.profileModify
                                        }), n.dot("emit ".concat(_e.NOTICE_LONGPOLL_PROFILE_MODIFIED));
                                        break;
                                    case "10,5":
                                        if (this._updatenoticeSequence(o.C2CNotifyMessageArray), this._isKickedoutNotice(o.C2CNotifyMessageArray)) return void r.emit(_e.NOTICE_LONGPOLL_MUTIPLE_DEVICE_KICKED_OUT);
                                        Ge.warn("NotificationController._eachEventArray() get Event condition : ".concat(u, ", only increase noticeSequence"));
                                        break;
                                    case "3,0":
                                        r.emit(_e.NOTICE_LONGPOLL_NEW_GROUP_MESSAGES, {
                                            data: [o]
                                        }), n.dot("emit ".concat(_e.NOTICE_LONGPOLL_NEW_GROUP_MESSAGES));
                                        break;
                                    case "6,0":
                                        r.emit(_e.NOTICE_LONGPOLL_NEW_GROUP_TIPS, {
                                            data: [o]
                                        }), n.dot("emit ".concat(_e.NOTICE_LONGPOLL_NEW_GROUP_TIPS));
                                        break;
                                    default:
                                        this._updatenoticeSequence(), r.emit(_e.ERROR_DETECTED, {
                                            code: ie.NOTICE_RUNLOOP_UNEXPECTED_CONDITION,
                                            message: "".concat(se.NOTICE_RUNLOOP_UNEXPECTED_CONDITION, " : ").concat(u, ", data: ").concat(JSON.stringify(o))
                                        }), n.dot("".concat(_e.ERROR_DETECTED, ":").concat(ie.NOTICE_RUNLOOP_UNEXPECTED_CONDITION))
                                }
                                n.report()
                            }
                        }
                    }, {
                        key: "_confirmCarrierType",
                        value: function (e) {
                            var t = {
                                    C2CMessageArray: 1,
                                    groupMessageArray: 2,
                                    groupTips: 3,
                                    messageList: 4,
                                    C2CNotifyMessageArray: 5,
                                    profileModify: 6,
                                    friendListMod: 7
                                },
                                n = "";
                            for (var r in e)
                                if (t.hasOwnProperty(r)) {
                                    n = r;
                                    break
                                } return "" === n ? 0 : t.hasOwnProperty(n) ? t[n] : 0
                        }
                    }, {
                        key: "_isKickedoutNotice",
                        value: function (e) {
                            return e[0].hasOwnProperty("kickoutMsgNotify") ? 1 : 0
                        }
                    }, {
                        key: "_startSyncMessages",
                        value: function (e) {
                            1 != this._syncMessagesFinished && this.syncMessage()
                        }
                    }, {
                        key: "syncMessage",
                        value: function () {
                            var e = this,
                                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                r = this.tim,
                                o = r.connectionController,
                                i = r.innerEmitter;
                            this._syncMessagesIsRunning = 1;
                            var s = this.createPackage({
                                name: "syncMessage",
                                action: "query",
                                param: {
                                    cookie: t,
                                    syncFlag: n
                                }
                            });
                            o.request(s).then(function (t) {
                                var n = t.data;
                                switch (Ao(n.cookie, n.syncFlag)) {
                                    case "00":
                                    case "01":
                                        i.emit(_e.ERROR_DETECTED, {
                                            code: ie.NOTICE_RUNLOOP_OFFSET_LOST,
                                            message: se.NOTICE_RUNLOOP_OFFSET_LOST
                                        });
                                        break;
                                    case "10":
                                    case "11":
                                        n.eventArray && e._eachEventArray(n.eventArray, "sync"), e._syncNoticeList = e._syncNoticeList.concat(n.messageList), i.emit(_e.SYNC_MESSAGE_C2C_PROCESSING, {
                                            data: n.messageList
                                        }), e._syncOffset = n.cookie, e.syncMessage(n.cookie, n.syncFlag);
                                        break;
                                    case "12":
                                        n.eventArray && e._eachEventArray(n.eventArray, "sync"), e._syncNoticeList = e._syncNoticeList.concat(n.messageList), i.emit(_e.SYNC_MESSAGE_C2C_FINISHED, {
                                            data: n.messageList
                                        }), e._syncOffset = n.cookie, e._syncNoticeList = [], e._syncMessagesIsRunning = 0, e._syncMessagesFinished = 1
                                }
                            }).catch(function (t) {
                                e._syncMessagesIsRunning = 0, Ge.error("NotificationController.syncMessage() failed, error:", JSON.stringify(t))
                            })
                        }
                    }]), n
                }(),
                bo = function (e) {
                    function t(e) {
                        var n;
                        return A(this, t), (n = F(this, G(t).call(this, e)))._initializeListener(), n
                    }
                    return P(t, nt), O(t, [{
                        key: "_initializeMembers",
                        value: function (e) {
                            this.expiredTimeLimit = 300, this.appid = e.appid || "", this.bucketName = e.bucketName || "", this.expiredTimeOut = e.expiredTimeOut || this.expiredTimeLimit, this.region = "ap-shanghai", this.cos = null, this.cosOptions = {
                                secretId: e.secretId,
                                secretKey: e.secretKey,
                                sessionToken: e.sessionToken,
                                expiredTime: e.expiredTime
                            }, this._initUploaderMethod()
                        }
                    }, {
                        key: "_expiredTimer",
                        value: function () {
                            var e = this,
                                t = setInterval(function () {
                                    Math.ceil(Date.now() / 1e3) >= e.cosOptions.expiredTime - 20 && (e._isReady = 0, e._getAuthorizationKey(), clearInterval(t))
                                }, 1e4)
                        }
                    }, {
                        key: "_initializeListener",
                        value: function () {
                            this.tim.innerEmitter.on(_e.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initialization, this)
                        }
                    }, {
                        key: "_initialization",
                        value: function () {
                            this._initCOSSDKPlugin(), this.COSSDK ? (this._initializeMembers({}), this._getAuthorizationKey()) : Ge.warn("UploadController 没有检测到上传插件，文件上传功能将无法使用")
                        }
                    }, {
                        key: "_getAuthorizationKey",
                        value: function () {
                            var e = this,
                                t = Math.ceil(Date.now() / 1e3),
                                n = this.createPackage({
                                    name: "cosSig",
                                    action: "query",
                                    param: {
                                        duration: this.expiredTimeLimit
                                    }
                                });
                            this.tim.connectionController.request(n).then(function (n) {
                                n.data.expiredTimeOut = n.data.expiredTime - t, Ge.log("UploadController._getAuthorizationKey timeout=".concat(n.data.expiredTimeOut, "s")), e._initializeMembers(n.data), e._expiredTimer(), e._initUploaderMethod()
                            }).catch(function (e) {
                                Ge.warn(e)
                            })
                        }
                    }, {
                        key: "_initCOSSDKPlugin",
                        value: function () {
                            var e = Ee ? "cos-wx-sdk" : "cos-js-sdk";
                            this.COSSDK = this.tim.getPlugin(e)
                        }
                    }, {
                        key: "_initUploaderMethod",
                        value: function () {
                            var e = this;
                            this.appid && (this.cos = Ee ? new this.COSSDK({
                                ForcePathStyle: 1,
                                getAuthorization: this._getAuthorization.bind(this)
                            }) : new this.COSSDK({
                                getAuthorization: this._getAuthorization.bind(this)
                            }), this._cosUploadMethod = Ee ? function (t, n) {
                                e.cos.postObject(t, n)
                            } : function (t, n) {
                                e.cos.uploadFiles(t, n)
                            }, this._IAmReady())
                        }
                    }, {
                        key: "_getAuthorization",
                        value: function (e, t) {
                            t({
                                TmpSecretId: this.cosOptions.secretId,
                                TmpSecretKey: this.cosOptions.secretKey,
                                XCosSecurityToken: this.cosOptions.sessionToken,
                                ExpiredTime: this.cosOptions.expiredTime
                            })
                        }
                    }, {
                        key: "_IAmReady",
                        value: function () {
                            this.triggerReady()
                        }
                    }, {
                        key: "uploadImage",
                        value: function (e) {
                            if (!e.file) return pt(new ae({
                                code: ie.MESSAGE_IMAGE_SELECT_FILE_FIRST,
                                message: se.MESSAGE_IMAGE_SELECT_FILE_FIRST
                            }));
                            var t = this._checkImageType(e.file);
                            if (1 != t) return t;
                            var n = this._checkImageMime(e.file);
                            if (1 != n) return n;
                            var r = this._checkImageSize(e.file);
                            return 1 != r ? r : this.upload(e)
                        }
                    }, {
                        key: "_checkImageType",
                        value: function (e) {
                            var t = "";
                            return t = Ee ? e.tempFiles[0].path.slice(e.tempFiles[0].path.lastIndexOf(".") + 1) : e.files[0].name.slice(e.files[0].name.lastIndexOf(".") + 1), Fr.indexOf(t.toLowerCase()) >= 0 ? 1 : pt(new ae({
                                coe: ie.MESSAGE_IMAGE_TYPES_LIMIT,
                                message: se.MESSAGE_IMAGE_TYPES_LIMIT
                            }))
                        }
                    }, {
                        key: "_checkImageMime",
                        value: function (e) {
                            return 1
                        }
                    }, {
                        key: "_checkImageSize",
                        value: function (e) {
                            return (Ee ? e.tempFiles[0].size : e.files[0].size) < 20971520 ? 1 : pt(new ae({
                                coe: ie.MESSAGE_IMAGE_SIZE_LIMIT,
                                message: "".concat(se.MESSAGE_IMAGE_SIZE_LIMIT, ": ").concat(20971520, " bytes")
                            }))
                        }
                    }, {
                        key: "uploadFile",
                        value: function (e) {
                            var t = null;
                            return e.file ? e.file.files[0].size > 20971520 ? (t = new ae({
                                code: ie.MESSAGE_FILE_SIZE_LIMIT,
                                message: "".concat(se.MESSAGE_FILE_SIZE_LIMIT, ": ").concat(20971520, " bytes")
                            }), pt(t)) : this.upload(e) : (t = new ae({
                                code: ie.MESSAGE_FILE_SELECT_FILE_FIRST,
                                message: se.MESSAGE_FILE_SELECT_FILE_FIRST
                            }), pt(t))
                        }
                    }, {
                        key: "uploadVideo",
                        value: function (e) {
                            return e.file ? this.upload(e) : pt()
                        }
                    }, {
                        key: "uploadSound",
                        value: function (e) {
                            return e.file ? this.upload(e) : pt()
                        }
                    }, {
                        key: "upload",
                        value: function (e) {
                            var t = this;
                            Ge.time(_t);
                            var n = Ee ? e.file : e.file.files[0];
                            return this._iniFileObjectMembersForWXMiniApp(n), new Promise(function (r, o) {
                                var i = Ee ? t._createCosOptionsWXMiniApp(e) : t._createCosOptionsWeb(e),
                                    s = t;
                                t._cosUploadMethod(i, function (e, i) {
                                    var a = Object.create(null);
                                    if (i) {
                                        if (t._isUploadError(i, e)) return o(i.files[0].error), void Ge.warn("UploadController.upload failed, network error:".concat(i.files[0].error.error));
                                        a.fileName = n.name, a.fileSize = n.size, a.fileType = n.type.slice(n.type.indexOf("/") + 1).toUpperCase(), a.location = Ee ? i.Location : i.files[0].data.Location;
                                        var u = Ge.timeEnd(_t),
                                            c = s._formatFileSize(n.size),
                                            l = s._formatSpeed(1e3 * n.size / u);
                                        return Ge.log("UploadController.upload success name=".concat(n.name, ",size=").concat(c, ",time=").concat(u, "ms,speed=").concat(l)), void r(a)
                                    }
                                    Ge.warn("UploadController.upload failed, error:".concat(e)), o(e)
                                })
                            })
                        }
                    }, {
                        key: "_isUploadError",
                        value: function (e, t) {
                            return Ee ? t ? 1 : 0 : null !== e.files[0].error ? 1 : 0
                        }
                    }, {
                        key: "_formatFileSize",
                        value: function (e) {
                            return e < 1024 ? e + "B" : e < 1048576 ? Math.floor(e / 1024) + "KB" : Math.floor(e / 1048576) + "MB"
                        }
                    }, {
                        key: "_formatSpeed",
                        value: function (e) {
                            return e <= 1048576 ? (e / 1024).toFixed(1) + "KB/s" : (e / 1048576).toFixed(1) + "MB/s"
                        }
                    }, {
                        key: "_iniFileObjectMembersForWXMiniApp",
                        value: function (e) {
                            Ee && (e.name = e.name ? e.name : e.tempFilePaths[0].slice(e.tempFilePaths[0].lastIndexOf("/") + 1), e.size = e.tempFiles[0].size, e.type = e.name.slice(e.name.lastIndexOf(".") + 1).toUpperCase())
                        }
                    }, {
                        key: "_createCosOptionsWeb",
                        value: function (e) {
                            var t = this.tim.context.identifier;
                            return {
                                files: [{
                                    Bucket: "".concat(this.bucketName, "-").concat(this.appid),
                                    Region: this.region,
                                    Key: "imfiles/".concat(t, "/").concat(e.to, "-").concat(Be(9999999), "-").concat(e.file.files[0].name),
                                    Body: e.file.files[0]
                                }],
                                SliceSize: 1048576,
                                onProgress: function (t) {
                                    if ("function" == typeof e.onProgress) try {
                                        e.onProgress(t.percent)
                                    } catch (n) {
                                        Ge.warn("onProgress callback error:"), Ge.error(n)
                                    }
                                },
                                onFileFinish: function (e, t, n) {}
                            }
                        }
                    }, {
                        key: "_createCosOptionsWXMiniApp",
                        value: function (e) {
                            var t = this.tim.context.identifier;
                            return {
                                Bucket: "".concat(this.bucketName, "-").concat(this.appid),
                                Region: this.region,
                                Key: "imfiles/".concat(t, "/").concat(e.to, "-").concat(e.file.name),
                                FilePath: e.file.tempFiles[0].path,
                                onProgress: function (t) {
                                    if (Ge.log(JSON.stringify(t)), "function" == typeof e.onProgress) try {
                                        e.onProgress(t.percent)
                                    } catch (n) {
                                        Ge.warn("onProgress callback error:"), Ge.error(n)
                                    }
                                }
                            }
                        }
                    }]), t
                }();
            var Uo = {
                app_id: "",
                event_id: "",
                api_base: "https://pingtas.qq.com/pingd",
                prefix: "_mta_",
                version: "1.3.9",
                stat_share_app: 0,
                stat_pull_down_fresh: 0,
                stat_reach_bottom: 0,
                stat_param: 1
            };

            function Fo() {
                try {
                    var e = "s" + qo();
                    return wx.setStorageSync(Uo.prefix + "ssid", e), e
                } catch (t) {}
            }

            function qo(e) {
                for (var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], n = 10; 1 < n; n--) {
                    var r = Math.floor(10 * Math.random()),
                        o = t[r];
                    t[r] = t[n - 1], t[n - 1] = o
                }
                for (n = r = 0; 5 > n; n++) r = 10 * r + t[n];
                return (e || "") + (r + "") + +new Date
            }

            function xo() {
                try {
                    var e = getCurrentPages(),
                        t = "/";
                    return 0 < e.length && (t = e.pop().__route__), t
                } catch (n) {
                    console.log("get current page path error:" + n)
                }
            }

            function Ho() {
                var e, t = {
                    dm: "wechat.apps.xx",
                    url: encodeURIComponent(xo() + Bo(Vo.Data.pageQuery)),
                    pvi: "",
                    si: "",
                    ty: 0
                };
                return t.pvi = ((e = function () {
                    try {
                        return wx.getStorageSync(Uo.prefix + "auid")
                    } catch (t) {}
                }()) || (e = function () {
                    try {
                        var t = qo();
                        return wx.setStorageSync(Uo.prefix + "auid", t), t
                    } catch (e) {}
                }(), t.ty = 1), e), t.si = function () {
                    var e = function () {
                        try {
                            return wx.getStorageSync(Uo.prefix + "ssid")
                        } catch (e) {}
                    }();
                    return e || (e = Fo()), e
                }(), t
            }

            function Ko() {
                var e = function () {
                    var e = wx.getSystemInfoSync();
                    return {
                        adt: encodeURIComponent(e.model),
                        scl: e.pixelRatio,
                        scr: e.windowWidth + "x" + e.windowHeight,
                        lg: e.language,
                        fl: e.version,
                        jv: encodeURIComponent(e.system),
                        tz: encodeURIComponent(e.platform)
                    }
                }();
                return function (e) {
                    wx.getNetworkType({
                        success: function (t) {
                            e(t.networkType)
                        }
                    })
                }(function (e) {
                    try {
                        wx.setStorageSync(Uo.prefix + "ntdata", e)
                    } catch (t) {}
                }), e.ct = wx.getStorageSync(Uo.prefix + "ntdata") || "4g", e
            }

            function Yo() {
                var e, t = Vo.Data.userInfo,
                    n = [];
                for (e in t) t.hasOwnProperty(e) && n.push(e + "=" + t[e]);
                return t = n.join(";"), {
                    r2: Uo.app_id,
                    r4: "wx",
                    ext: "v=" + Uo.version + (null !== t && "" !== t ? ";ui=" + encodeURIComponent(t) : "")
                }
            }

            function Bo(e) {
                if (!Uo.stat_param || !e) return "";
                e = function (e) {
                    if (1 > Uo.ignore_params.length) return e;
                    var t, n = {};
                    for (t in e) 0 <= Uo.ignore_params.indexOf(t) || (n[t] = e[t]);
                    return n
                }(e);
                var t, n = [];
                for (t in e) n.push(t + "=" + e[t]);
                return 0 < n.length ? "?" + n.join("&") : ""
            }
            var Vo = {
                    App: {
                        init: function (e) {
                            "appID" in e && (Uo.app_id = e.appID), "eventID" in e && (Uo.event_id = e.eventID), "statShareApp" in e && (Uo.stat_share_app = e.statShareApp), "statPullDownFresh" in e && (Uo.stat_pull_down_fresh = e.statPullDownFresh), "statReachBottom" in e && (Uo.stat_reach_bottom = e.statReachBottom), "ignoreParams" in e && (Uo.ignore_params = e.ignoreParams), "statParam" in e && (Uo.stat_param = e.statParam), Fo();
                            try {
                                "lauchOpts" in e && (Vo.Data.lanchInfo = e.lauchOpts, Vo.Data.lanchInfo.landing = 1)
                            } catch (t) {}
                            "autoReport" in e && e.autoReport && function () {
                                var e = Page;
                                Page = function (t) {
                                    var n = t.onLoad;
                                    t.onLoad = function (e) {
                                        n && n.call(this, e), Vo.Data.lastPageQuery = Vo.Data.pageQuery, Vo.Data.pageQuery = e, Vo.Data.lastPageUrl = Vo.Data.pageUrl, Vo.Data.pageUrl = xo(), Vo.Data.show = 0, Vo.Page.init()
                                    }, e(t)
                                }
                            }()
                        }
                    },
                    Page: {
                        init: function () {
                            var e, t = getCurrentPages()[getCurrentPages().length - 1];
                            t.onShow && (e = t.onShow, t.onShow = function () {
                                if (1 == Vo.Data.show) {
                                    var t = Vo.Data.lastPageQuery;
                                    Vo.Data.lastPageQuery = Vo.Data.pageQuery, Vo.Data.pageQuery = t, Vo.Data.lastPageUrl = Vo.Data.pageUrl, Vo.Data.pageUrl = xo()
                                }
                                Vo.Data.show = 1, Vo.Page.stat(), e.apply(this, arguments)
                            }), Uo.stat_pull_down_fresh && t.onPullDownRefresh && function () {
                                var e = t.onPullDownRefresh;
                                t.onPullDownRefresh = function () {
                                    Vo.Event.stat(Uo.prefix + "pulldownfresh", {
                                        url: t.__route__
                                    }), e.apply(this, arguments)
                                }
                            }(), Uo.stat_reach_bottom && t.onReachBottom && function () {
                                var e = t.onReachBottom;
                                t.onReachBottom = function () {
                                    Vo.Event.stat(Uo.prefix + "reachbottom", {
                                        url: t.__route__
                                    }), e.apply(this, arguments)
                                }
                            }(), Uo.stat_share_app && t.onShareAppMessage && function () {
                                var e = t.onShareAppMessage;
                                t.onShareAppMessage = function () {
                                    return Vo.Event.stat(Uo.prefix + "shareapp", {
                                        url: t.__route__
                                    }), e.apply(this, arguments)
                                }
                            }()
                        },
                        multiStat: function (e, t) {
                            if (1 == t) Vo.Page.stat(e);
                            else {
                                var n = getCurrentPages()[getCurrentPages().length - 1];
                                n.onShow && function () {
                                    var t = n.onShow;
                                    n.onShow = function () {
                                        Vo.Page.stat(e), t.call(this, arguments)
                                    }
                                }()
                            }
                        },
                        stat: function (e) {
                            if ("" != Uo.app_id) {
                                var t = [],
                                    n = Yo();
                                if (e && (n.r2 = e), e = [Ho(), n, Ko()], Vo.Data.lanchInfo) {
                                    e.push({
                                        ht: Vo.Data.lanchInfo.scene
                                    }), Vo.Data.pageQuery && Vo.Data.pageQuery._mta_ref_id && e.push({
                                        rarg: Vo.Data.pageQuery._mta_ref_id
                                    });
                                    try {
                                        1 == Vo.Data.lanchInfo.landing && (n.ext += ";lp=1", Vo.Data.lanchInfo.landing = 0)
                                    } catch (i) {}
                                }
                                e.push({
                                    rdm: "/",
                                    rurl: 0 >= Vo.Data.lastPageUrl.length ? Vo.Data.pageUrl + Bo(Vo.Data.lastPageQuery) : encodeURIComponent(Vo.Data.lastPageUrl + Bo(Vo.Data.lastPageQuery))
                                }), e.push({
                                    rand: +new Date
                                }), n = 0;
                                for (var r = e.length; n < r; n++)
                                    for (var o in e[n]) e[n].hasOwnProperty(o) && t.push(o + "=" + (void 0 === e[n][o] ? "" : e[n][o]));
                                wx.request({
                                    url: Uo.api_base + "?" + t.join("&").toLowerCase()
                                })
                            }
                        }
                    },
                    Event: {
                        stat: function (e, t) {
                            if ("" != Uo.event_id) {
                                var n = [],
                                    r = Ho(),
                                    o = Yo();
                                r.dm = "wxapps.click", r.url = e, o.r2 = Uo.event_id;
                                var i, s = void 0 === t ? {} : t,
                                    a = [];
                                for (i in s) s.hasOwnProperty(i) && a.push(encodeURIComponent(i) + "=" + encodeURIComponent(s[i]));
                                for (s = a.join(";"), o.r5 = s, s = 0, o = (r = [r, o, Ko(), {
                                        rand: +new Date
                                    }]).length; s < o; s++)
                                    for (var u in r[s]) r[s].hasOwnProperty(u) && n.push(u + "=" + (void 0 === r[s][u] ? "" : r[s][u]));
                                wx.request({
                                    url: Uo.api_base + "?" + n.join("&").toLowerCase()
                                })
                            }
                        }
                    },
                    Data: {
                        userInfo: null,
                        lanchInfo: null,
                        pageQuery: null,
                        lastPageQuery: null,
                        pageUrl: "",
                        lastPageUrl: "",
                        show: 0
                    }
                },
                jo = Vo,
                Wo = function () {
                    function e() {
                        A(this, e), this.cache = [], this.MtaWX = null, this._init()
                    }
                    return O(e, [{
                        key: "report",
                        value: function (e, t) {
                            var n = this;
                            try {
                                me ? window.MtaH5 ? (window.MtaH5.clickStat(e, t), this.cache.forEach(function (e) {
                                    var t = e.name,
                                        r = e.param;
                                    window.MtaH5.clickStat(t, r), n.cache.shift()
                                })) : this.cache.push({
                                    name: e,
                                    param: t
                                }) : Ee && (this.MtaWX ? (this.MtaWX.Event.stat(e, t), this.cache.forEach(function (e) {
                                    var t = e.name,
                                        r = e.param;
                                    n.MtaWX.stat(t, r), n.cache.shift()
                                })) : this.cache.push({
                                    name: e,
                                    param: t
                                }))
                            } catch (r) {}
                        }
                    }, {
                        key: "stat",
                        value: function () {
                            try {
                                me && window.MtaH5 ? window.MtaH5.pgv() : Ee && this.MtaWX && this.MtaWX.Page.stat()
                            } catch (e) {}
                        }
                    }, {
                        key: "_init",
                        value: function () {
                            try {
                                if (me) {
                                    window._mtac = {
                                        autoReport: 0
                                    };
                                    var e = document.createElement("script"),
                                        t = function () {
                                            if (Ee) return "https:";
                                            var e = window.location.protocol;
                                            return ["http:", "https:"].indexOf(e) < 0 && (e = "http:"), e
                                        }();
                                    e.src = "".concat(t, "//pingjs.qq.com/h5/stats.js?v2.0.4"), e.setAttribute("name", "MTAH5"), e.setAttribute("sid", "500690998"), e.setAttribute("cid", "500691017");
                                    var n = document.getElementsByTagName("script")[0];
                                    n.parentNode.insertBefore(e, n)
                                } else Ee && (this.MtaWX = jo, this.MtaWX.App.init({
                                    appID: "500690995",
                                    eventID: "500691014",
                                    autoReport: 0,
                                    statParam: 1
                                }))
                            } catch (r) {}
                        }
                    }]), e
                }(),
                zo = function (e) {
                    function t(e) {
                        var n;
                        return A(this, t), (n = F(this, G(t).call(this, e))).tim = e, n.MTA = new Wo, n._initListener(), n
                    }
                    return P(t, nt), O(t, [{
                        key: "_initListener",
                        value: function () {
                            var e = this,
                                t = this.tim.innerEmitter;
                            this._sendMessageSuccessRateReport(), this._loginSuccessRateReport(), t.on(_e.SDK_READY, function () {
                                e.MTA.report("sdkappid", {
                                    value: e.tim.context.SDKAppID
                                }), e.MTA.report("version", {
                                    value: $o.VERSION
                                }), e.MTA.stat()
                            })
                        }
                    }, {
                        key: "_sendMessageSuccessRateReport",
                        value: function () {
                            var e = this,
                                t = this.tim.innerEmitter;
                            t.on(_e.MESSAGE_SENDING, function () {
                                e.MTA.report("sendmessage", {
                                    send: 1
                                })
                            }), t.on(_e.MESSAGE_C2C_SEND_SUCCESS, function () {
                                e.MTA.report("sendmessage", {
                                    success: 1
                                })
                            }), t.on(_e.MESSAGE_C2C_SEND_FAIL, function () {
                                e.MTA.report("sendmessage", {
                                    fail: 1
                                })
                            }), t.on(_e.MESSAGE_GROUP_SEND_SUCCESS, function () {
                                e.MTA.report("sendmessage", {
                                    success: 1
                                })
                            }), t.on(_e.MESSAGE_GROUP_SEND_FAIL, function () {
                                e.MTA.report("sendmessage", {
                                    fail: 1
                                })
                            })
                        }
                    }, {
                        key: "_loginSuccessRateReport",
                        value: function () {
                            var e = this,
                                t = this.tim.innerEmitter;
                            t.on(_e.SIGN_LOGIN, function () {
                                e.MTA.report("login", {
                                    login: 1
                                })
                            }), t.on(_e.SIGN_LOGIN_SUCCESS, function () {
                                e.MTA.report("login", {
                                    success: 1
                                })
                            }), t.on(_e.SIGN_LOGIN_FAIL, function () {
                                e.MTA.report("login", {
                                    fail: 1
                                })
                            })
                        }
                    }]), t
                }(),
                Xo = function () {
                    function t(e) {
                        A(this, t), tt.mixin(this), this.setLogLevel(0), Ge.warn("SDK inWxMiniApp:".concat(Ee, ", SDKAppID:").concat(e.SDKAppID)), Ge.warn("UserAgent:".concat(ye)), this._initOptions(e), this._initMemberVariables(), this._initControllers(), this._initListener()
                    }
                    return O(t, [{
                        key: "login",
                        value: function (e) {
                            return Ge.time(ht), this.loginInfo.identifier = e.identifier || e.userID, this.loginInfo.userSig = e.userSig, this.signController.login(this.loginInfo)
                        }
                    }, {
                        key: "logout",
                        value: function () {
                            var e = this.signController.logout();
                            return this.resetSDK(), e
                        }
                    }, {
                        key: "on",
                        value: function (e, t, n) {
                            Ge.debug("on", "eventName:".concat(e)), this.outerEmitter.on(e, t, n || this)
                        }
                    }, {
                        key: "once",
                        value: function (e, t, n) {
                            Ge.debug("once", "eventName:".concat(e)), this.outerEmitter.once(e, t, n || this)
                        }
                    }, {
                        key: "off",
                        value: function (e, t, n, r) {
                            Ge.debug("off", "eventName:".concat(e)), this.outerEmitter.off(e, t, n, r)
                        }
                    }, {
                        key: "registerPlugin",
                        value: function (e) {
                            var t = this;
                            this.plugins || (this.plugins = {}), Object.keys(e).forEach(function (n) {
                                t.plugins[n] = e[n]
                            })
                        }
                    }, {
                        key: "getPlugin",
                        value: function (e) {
                            return this.plugins[e] || void 0
                        }
                    }, {
                        key: "mergeMessageList",
                        value: function (e, t) {
                            return function (e, t) {
                                for (var n = new Map, r = [].concat(x(e), x(t)), o = 0; o < r.length; o++) {
                                    var i = r[o];
                                    n.set(i.ID, i)
                                }
                                return x(n.values())
                            }(e, t)
                        }
                    }, {
                        key: "setLogLevel",
                        value: function (e) {
                            Ge.setLevel(e)
                        }
                    }, {
                        key: "getLog",
                        value: function () {
                            return Ge.getLog()
                        }
                    }, {
                        key: "downloadLog",
                        value: function () {
                            var e = document.createElement("a"),
                                t = new Date,
                                n = new Blob(this.getLog());
                            e.download = "TIM-" + t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + "-" + this.loginInfo.SDKAppID + "-" + this.context.identifier + ".txt", e.href = URL.createObjectURL(n), e.click(), URL.revokeObjectURL(n)
                        }
                    }, {
                        key: "destroy",
                        value: function () {
                            this.logout(), this.outerEmitter.emit(e.SDK_DESTROY, {
                                SDKAppID: this.loginInfo.SDKAppID
                            })
                        }
                    }, {
                        key: "createTextMessage",
                        value: function (e) {
                            return this.messageController.createTextMessage(e)
                        }
                    }, {
                        key: "createImageMessage",
                        value: function (e) {
                            return this.messageController.createImageMessage(e)
                        }
                    }, {
                        key: "createFileMessage",
                        value: function (e) {
                            return Ee ? pt({
                                code: ie.MESSAGE_FILE_WECHAT_MINIAPP_NOT_SUPPORT,
                                message: se.MESSAGE_FILE_WECHAT_MINIAPP_NOT_SUPPORT
                            }) : this.messageController.createFileMessage(e)
                        }
                    }, {
                        key: "createFaceMessage",
                        value: function (e) {
                            return this.messageController.createFaceMessage(e)
                        }
                    }, {
                        key: "createCustomMessage",
                        value: function (e) {
                            return this.messageController.createCustomMessage(e)
                        }
                    }, {
                        key: "sendMessage",
                        value: function (e) {
                            var t = this;
                            return e instanceof io ? new Promise(function (n, r) {
                                e.afterOperated(function (e) {
                                    t.messageController.sendMessageInstance(e).then(function (e) {
                                        n(e)
                                    }).catch(function (e) {
                                        r(e)
                                    })
                                })
                            }) : pt(new ae({
                                code: ie.MESSAGE_SEND_NEED_MESSAGE_INSTANCE,
                                message: se.MESSAGE_SEND_NEED_MESSAGE_INSTANCE
                            }))
                        }
                    }, {
                        key: "resendMessage",
                        value: function (e) {
                            return this.messageController.resendMessage(e)
                        }
                    }, {
                        key: "getMessageList",
                        value: function (e) {
                            return this.messageController.getMessageList(e)
                        }
                    }, {
                        key: "setMessageRead",
                        value: function (e) {
                            return this.messageController.setMessageRead(e)
                        }
                    }, {
                        key: "uploadImage",
                        value: function (e) {}
                    }, {
                        key: "getConversationList",
                        value: function () {
                            return this.conversationController.getConversationList()
                        }
                    }, {
                        key: "getConversationProfile",
                        value: function (e) {
                            return this.conversationController.getConversationProfile(e)
                        }
                    }, {
                        key: "deleteConversation",
                        value: function (e) {
                            return this.conversationController.deleteConversation(e)
                        }
                    }, {
                        key: "getPendencyReport",
                        value: function (e) {
                            return new Promise
                        }
                    }, {
                        key: "getMyProfile",
                        value: function () {
                            return this.userController.getMyProfile()
                        }
                    }, {
                        key: "getUserProfile",
                        value: function (e) {
                            return this.userController.getUserProfile(e)
                        }
                    }, {
                        key: "updateMyProfile",
                        value: function (e) {
                            return this.userController.updateMyProfile(e)
                        }
                    }, {
                        key: "applyAddFriend",
                        value: function (e) {
                            return this.userController.applyAddFriend(e)
                        }
                    }, {
                        key: "getPendency",
                        value: function (e) {
                            return this.userController.getPendency(e)
                        }
                    }, {
                        key: "deletePendency",
                        value: function (e) {
                            return this.userController.deletePendency(e)
                        }
                    }, {
                        key: "replyPendency",
                        value: function (e) {
                            return this.userController.replyPendency(e)
                        }
                    }, {
                        key: "getFriendList",
                        value: function () {
                            return this.userController.getFriendList()
                        }
                    }, {
                        key: "deleteFriend",
                        value: function (e) {
                            return this.userController.deleteFriend(e)
                        }
                    }, {
                        key: "getBlacklist",
                        value: function () {
                            return this.userController.getBlacklist()
                        }
                    }, {
                        key: "addToBlacklist",
                        value: function (e) {
                            return this.userController.addBlacklist(e)
                        }
                    }, {
                        key: "removeFromBlacklist",
                        value: function (e) {
                            return this.userController.deleteBlacklist(e)
                        }
                    }, {
                        key: "getGroupProfileAdvance",
                        value: function (e) {
                            return this.groupController.getGroupProfileAdvance(e)
                        }
                    }, {
                        key: "getGroupList",
                        value: function () {
                            return this.groupController.getGroupList()
                        }
                    }, {
                        key: "getGroupProfile",
                        value: function (e) {
                            return this.groupController.getGroupProfile(e)
                        }
                    }, {
                        key: "createGroup",
                        value: function (e) {
                            return this.groupController.createGroup(e)
                        }
                    }, {
                        key: "dismissGroup",
                        value: function (e) {
                            return this.groupController.dismissGroup(e)
                        }
                    }, {
                        key: "updateGroupProfile",
                        value: function (e) {
                            return this.groupController.updateGroupProfile(e)
                        }
                    }, {
                        key: "joinGroup",
                        value: function (e) {
                            return this.groupController.joinGroup(e)
                        }
                    }, {
                        key: "quitGroup",
                        value: function (e) {
                            return this.groupController.quitGroup(e)
                        }
                    }, {
                        key: "searchGroupByID",
                        value: function (e) {
                            return this.groupController.searchGroupByID(e)
                        }
                    }, {
                        key: "changeGroupOwner",
                        value: function (e) {
                            return this.groupController.changeGroupOwner(e)
                        }
                    }, {
                        key: "handleGroupApplication",
                        value: function (e) {
                            return this.groupController.handleGroupApplication(e)
                        }
                    }, {
                        key: "setMessageRemindType",
                        value: function (e) {
                            return this.groupController.setMessageRemindType(e)
                        }
                    }, {
                        key: "getGroupMemberList",
                        value: function (e) {
                            return this.groupController.getGroupMemberList(e)
                        }
                    }, {
                        key: "addGroupMember",
                        value: function (e) {
                            return this.groupController.addGroupMember(e)
                        }
                    }, {
                        key: "deleteGroupMember",
                        value: function (e) {
                            return this.groupController.deleteGroupMember(e)
                        }
                    }, {
                        key: "setGroupMemberMuteTime",
                        value: function (e) {
                            return this.groupController.setGroupMemberMuteTime(e)
                        }
                    }, {
                        key: "setGroupMemberRole",
                        value: function (e) {
                            return this.groupController.setGroupMemberRole(e)
                        }
                    }, {
                        key: "setGroupMemberNameCard",
                        value: function (e) {
                            return this.groupController.setGroupMemberNameCard(e)
                        }
                    }, {
                        key: "setGroupMemberCustomField",
                        value: function (e) {
                            return this.groupController.setGroupMemberCustomField(e)
                        }
                    }, {
                        key: "deleteGroupSystemNotice",
                        value: function (e) {
                            return this.groupController.deleteGroupSystemNotice(e)
                        }
                    }, {
                        key: "_initOptions",
                        value: function (e) {
                            this.plugins = {}, this.loginInfo = {
                                SDKAppID: e.SDKAppID || null,
                                accountType: Be(),
                                identifier: null,
                                userSig: null
                            };
                            var t = E;
                            this.options = {
                                runLoopNetType: e.runLoopNetType || t.XHR,
                                enablePointer: e.enablePointer || 0
                            }
                        }
                    }, {
                        key: "_initMemberVariables",
                        value: function () {
                            this.context = null, this.innerEmitter = new Po, this.outerEmitter = new Po, ct(this.outerEmitter), this.packageConfig = new ko(this), this.storage = new Ro(this), this.outerEmitter._emit = this.outerEmitter.emit, this.outerEmitter.emit = function (e, t) {
                                var n = arguments[0],
                                    r = [n, {
                                        name: arguments[0],
                                        data: arguments[1]
                                    }];
                                Ge.debug("emit ".concat(n), r[1]), this.outerEmitter._emit.apply(this.outerEmitter, r)
                            }.bind(this)
                        }
                    }, {
                        key: "_initControllers",
                        value: function () {
                            this.exceptionController = new Ur(this), this.connectionController = new Pr(this), this.contextController = new st(this), this.signController = new mt(this), this.messageController = new Io(this), this.conversationController = new po(this), this.userController = new Wr(this), this.groupController = new Do(this), this.notificationController = new wo(this), this.statusController = new Oo(this), this.uploadController = new bo(this), this.reporterController = new zo(this), this._initReadyListener()
                        }
                    }, {
                        key: "_initListener",
                        value: function () {
                            this.innerEmitter.on(_e.NOTICE_LONGPOLL_LONG_RECONNECT, this._onNoticeChannelReconnectedAfterLongTime, this)
                        }
                    }, {
                        key: "_initReadyListener",
                        value: function () {
                            for (var e = this, t = this.readyList, n = 0, r = t.length; n < r; n++) this[t[n]].ready(function () {
                                return e._readyHandle()
                            })
                        }
                    }, {
                        key: "_onNoticeChannelReconnectedAfterLongTime",
                        value: function (e) {
                            Ge.log("reconnect after long time...", e), this.notificationController.stopLongPoll(), this.resetSDK(), this.login(this.loginInfo)
                        }
                    }, {
                        key: "resetSDK",
                        value: function () {
                            var t = this;
                            this.initList.forEach(function (e) {
                                t[e].reset && t[e].reset()
                            }), this.storage.reset(), _o.reset(), this.resetReady(), this._initReadyListener(), this.outerEmitter.emit(e.SDK_NOT_READY)
                        }
                    }, {
                        key: "_readyHandle",
                        value: function () {
                            for (var t = this.readyList, n = 1, r = 0, o = t.length; r < o; r++)
                                if (!this[t[r]].isReady) {
                                    n = 0;
                                    break
                                } n && (Ge.warn("SDK is ready. cost=".concat(Ge.timeEnd(ht), "ms")), this.triggerReady(), this.innerEmitter.emit(_e.SDK_READY), this.outerEmitter.emit(e.SDK_READY))
                        }
                    }]), t
                }();
            Xo.prototype.readyList = ["conversationController"], Xo.prototype.initList = ["exceptionController", "connectionController", "signController", "contextController", "messageController", "conversationController", "userController", "groupController", "notificationController"];
            var Jo = {
                login: "login",
                on: "on",
                off: "off",
                ready: "ready",
                setLogLevel: "setLogLevel",
                joinGroup: "joinGroup",
                registerPlugin: "registerPlugin"
            };

            function Qo(e, t, n) {
                if (e || void 0 !== Jo[t]) return 1;
                n.innerEmitter.emit(_e.ERROR_DETECTED, new ae({
                    code: ie.SDK_IS_NOT_READY,
                    message: "".concat(se.SDK_IS_NOT_READY, " ").concat(t)
                }))
            }
            var Zo = {},
                $o = {};
            return $o.create = function (t) {
                if (t.SDKAppID && Zo[t.SDKAppID]) return Zo[t.SDKAppID];
                Ge.log("TIM.create");
                var n = new Xo(t);
                n.on(e.SDK_DESTROY, function (e) {
                    Zo[e.data.SDKAppID] = null, delete Zo[e.data.SDKAppID]
                });
                var r = function (e) {
                    var t = Object.create(null);
                    return Object.keys(oe).forEach(function (n) {
                        if (e[n]) {
                            var r = oe[n],
                                o = new H;
                            t[r] = function () {
                                var t = Array.from(arguments);
                                return o.use(function (t, r) {
                                    if (Qo(e.isReady(), n, e)) return r()
                                }).use(function (e, t) {
                                    if (1 == te(e, re[n], r)) return t()
                                }).use(function (t, r) {
                                    return e[n].apply(e, t)
                                }), o.run(t)
                            }
                        }
                    }), t
                }(n);
                return Zo[t.SDKAppID] = r, Ge.log("TIM.create ok"), r
            }, $o.TYPES = M, $o.EVENT = e, $o.VERSION = "2.0.9", Ge.log("TIM.VERSION: ".concat($o.VERSION)), $o
        });

    }, function (modId) {
        var map = {};
        return __REQUIRE__(map[modId], modId);
    })
    return __REQUIRE__(1578395826424);
})()
//# sourceMappingURL=index.js.map
/*
 *	jQuery Touch Optimized Sliders "R"Us 2.4.0
 *	
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	tosrus.frebsite.nl
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */
! function(s) {
    function i() {
        o = function(s) {
            return t + "-" + s
        }, d = function(s) {
            return t + "-" + s
        }, a = function(s) {
            return s + "." + t
        }, s.each([o, d, a], function(s, i) {
            i.add = function(s) {
                s = s.split(" ");
                for (var e in s) i[s[e]] = i(s[e])
            }
        }), o.add("touch desktop scale-1 scale-2 scale-3 wrapper opened opening fixed inline hover slider slide loading noanimation fastanimation"), d.add("slide anchor"), a.add("open opening close closing prev next slideTo sliding click pinch scroll resize orientationchange load loading loaded transitionend webkitTransitionEnd"), r = {
            complObject: function(i, e) {
                return s.isPlainObject(i) || (i = e), i
            },
            complBoolean: function(s, i) {
                return "boolean" != typeof s && (s = i), s
            },
            complNumber: function(i, e) {
                return s.isNumeric(i) || (i = e), i
            },
            complString: function(s, i) {
                return "string" != typeof s && (s = i), s
            },
            isPercentage: function(s) {
                return "string" == typeof s && "%" == s.slice(-1)
            },
            getPercentage: function(s) {
                return parseInt(s.slice(0, -1))
            },
            resizeRatio: function(s, i, e, t, n) {
                var o = i.width(),
                    d = i.height();
                e && o > e && (o = e), t && d > t && (d = t), n > o / d ? d = o / n : o = d * n, s.width(o).height(d)
            },
            transitionend: function(s, i, e) {
                var t = !1,
                    n = function() {
                        t || i.call(s[0]), t = !0
                    };
                s.one(a.transitionend, n), s.one(a.webkitTransitionEnd, n), setTimeout(n, 1.1 * e)
            },
            setViewportScale: function() {
                if (l.viewportScale) {
                    var s = l.viewportScale.getScale();
                    "undefined" != typeof s && (s = 1 / s, l.$body.removeClass(o["scale-1"]).removeClass(o["scale-2"]).removeClass(o["scale-3"]).addClass(o["scale-" + Math.max(Math.min(Math.round(s), 3), 1)]))
                }
            }
        }, l = {
            $wndw: s(window),
            $html: s("html"),
            $body: s("body"),
            scrollPosition: 0,
            viewportScale: null,
            viewportScaleInterval: null
        }, l.$body.addClass(s[e].support.touch ? o.touch : o.desktop), l.$wndw.on(a.scroll, function(s) {
            l.$body.hasClass(o.opened) && (window.scrollTo(0, l.scrollPosition), s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation())
        }), !l.viewportScale && s[e].support.touch && "undefined" != typeof FlameViewportScale && (l.viewportScale = new FlameViewportScale, r.setViewportScale(), l.$wndw.on(a.orientationchange + " " + a.resize, function() {
            l.viewportScaleInterval && (clearTimeout(l.viewportScaleInterval), l.viewportScaleInterval = null), l.viewportScaleInterval = setTimeout(function() {
                r.setViewportScale()
            }, 500)
        })), s[e]._c = o, s[e]._d = d, s[e]._e = a, s[e]._f = r, s[e]._g = l
    }
    var e = "tosrus",
        t = "tos",
        n = "2.4.0";
    if (!s[e]) {
        var o = {},
            d = {},
            a = {},
            r = {},
            l = {};
        s[e] = function(s, i, e) {
            return this.$node = s, this.opts = i, this.conf = e, this.vars = {}, this.nodes = {}, this.slides = {}, this._init(), this
        }, s[e].prototype = {
            _init: function() {
                var i = this;
                this._complementOptions(), this.vars.fixed = "window" == this.opts.wrapper.target, this.nodes.$wrpr = s('<div class="' + o.wrapper + '" />'), this.nodes.$sldr = s('<div class="' + o.slider + '" />').appendTo(this.nodes.$wrpr), this.nodes.$wrpr.addClass(this.vars.fixed ? o.fixed : o.inline).addClass(o("fx-" + this.opts.effect)).addClass(o(this.opts.slides.scale)).addClass(this.opts.wrapper.classes), this.nodes.$wrpr.on(a.open + " " + a.close + " " + a.prev + " " + a.next + " " + a.slideTo, function(s) {
                    arguments = Array.prototype.slice.call(arguments);
                    var s = arguments.shift(),
                        e = s.type;
                    s.stopPropagation(), "function" == typeof i[e] && i[e].apply(i, arguments)
                }).on(a.opening + " " + a.closing + " " + a.sliding + " " + a.loading + " " + a.loaded, function(s) {
                    s.stopPropagation()
                }).on(a.click, function(e) {
                    switch (e.stopPropagation(), i.opts.wrapper.onClick) {
                        case "toggleUI":
                            i.nodes.$wrpr.toggleClass(o.hover);
                            break;
                        case "close":
                            s(e.target).is("img") || i.close()
                    }
                }), this.nodes.$anchors = this._initAnchors(), this.nodes.$slides = this._initSlides(), this.slides.total = this.nodes.$slides.length, this.slides.visible = this.opts.slides.visible, this.slides.index = 0, this.vars.opened = !0;
                for (var t = 0; t < s[e].addons.length; t++) s.isFunction(this["_addon_" + s[e].addons[t]]) && this["_addon_" + s[e].addons[t]]();
                for (var n = 0; n < s[e].ui.length; n++) this.nodes.$wrpr.find("." + o[s[e].ui[n]]).length && this.nodes.$wrpr.addClass(o("has-" + s[e].ui[n]));
                "close" == this.opts.wrapper.onClick && this.nodes.$uibg.add(this.nodes.$capt || s()).add(this.nodes.$pagr || s()).on(a.click, function(s) {
                    s.stopPropagation()
                }), this.vars.fixed ? (this.nodes.$wrpr.appendTo(l.$body), this.close(!0)) : (this.nodes.$wrpr.appendTo(this.opts.wrapper.target), this.opts.show ? (this.vars.opened = !1, this.open(0, !0)) : this.close(!0))
            },
            open: function(i, e) {
                var t = this;
                this.vars.opened || (this.vars.fixed && (l.scrollPosition = l.$wndw.scrollTop(), l.$body.addClass(o.opened), r.setViewportScale()), e ? this.nodes.$wrpr.addClass(o.opening).trigger(a.opening, [i, e]) : setTimeout(function() {
                    t.nodes.$wrpr.addClass(o.opening).trigger(a.opening, [i, e])
                }, 5), this.nodes.$wrpr.addClass(o.hover).addClass(o.opened)), this.vars.opened = !0, this._loadContents(), s.isNumeric(i) && (e = e || !this.vars.opened, this.slideTo(i, e))
            },
            close: function(i) {
                this.vars.opened && (this.vars.fixed && l.$body.removeClass(o.opened), i ? this.nodes.$wrpr.removeClass(o.opened) : r.transitionend(this.nodes.$wrpr, function() {
                    s(this).removeClass(o.opened)
                }, this.conf.transitionDuration), this.nodes.$wrpr.removeClass(o.hover).removeClass(o.opening).trigger(a.closing, [this.slides.index, i])), this.vars.opened = !1
            },
            prev: function(i, e) {
                s.isNumeric(i) || (i = this.opts.slides.slide), this.slideTo(this.slides.index - i, e)
            },
            next: function(i, e) {
                s.isNumeric(i) || (i = this.opts.slides.slide), this.slideTo(this.slides.index + i, e)
            },
            slideTo: function(i, t) {
                if (!this.vars.opened) return !1;
                if (!s.isNumeric(i)) return !1;
                var n = !0;
                if (0 > i) {
                    var d = 0 == this.slides.index;
                    this.opts.infinite ? i = d ? this.slides.total - this.slides.visible : 0 : (i = 0, d && (n = !1))
                }
                if (i + this.slides.visible > this.slides.total) {
                    var l = this.slides.index + this.slides.visible >= this.slides.total;
                    this.opts.infinite ? i = l ? 0 : this.slides.total - this.slides.visible : (i = this.slides.total - this.slides.visible, l && (n = !1))
                }
                if (this.slides.index = i, this._loadContents(), n) {
                    var h = 0 - this.slides.index * this.opts.slides.width + this.opts.slides.offset;
                    this.slides.widthPercentage && (h += "%"), t && (this.nodes.$sldr.addClass(o.noanimation), r.transitionend(this.nodes.$sldr, function() {
                        s(this).removeClass(o.noanimation)
                    }, 5));
                    for (var c in s[e].effects)
                        if (c == this.opts.effect) {
                            s[e].effects[c].call(this, h, t);
                            break
                        }
                    this.nodes.$wrpr.trigger(a.sliding, [i, t])
                }
            },
            _initAnchors: function() {
                var i = this,
                    t = s();
                if (this.$node.is("a"))
                    for (var n in s[e].media) t = t.add(this.$node.filter(function() {
                        if (i.opts.media[n] && i.opts.media[n].filterAnchors) {
                            var t = i.opts.media[n].filterAnchors.call(i, s(this));
                            if ("boolean" == typeof t) return t
                        }
                        return s[e].media[n].filterAnchors.call(i, s(this))
                    }));
                return t
            },
            _initSlides: function() {
                return this[this.$node.is("a") ? "_initSlidesFromAnchors" : "_initSlidesFromContent"](), this.nodes.$sldr.children().css("width", this.opts.slides.width + (this.slides.widthPercentage ? "%" : "px"))
            },
            _initSlidesFromAnchors: function() {
                var i = this;
                this.nodes.$anchors.each(function(e) {
                    var t = s(this),
                        n = s('<div class="' + o.slide + " " + o.loading + '" />').data(d.anchor, t).appendTo(i.nodes.$sldr);
                    t.data(d.slide, n).on(a.click, function(s) {
                        s.preventDefault(), i.open(e)
                    })
                })
            },
            _initSlidesFromContent: function() {
                var i = this;
                this.$node.children().each(function() {
                    var t = s(this);
                    s('<div class="' + o.slide + '" />').append(t).appendTo(i.nodes.$sldr);
                    for (var n in s[e].media) {
                        var d = null;
                        if (i.opts.media[n] && i.opts.media[n].filterSlides && (d = i.opts.media[n].filterSlides.call(i, t)), "boolean" != typeof d && (d = s[e].media[n].filterSlides.call(i, t)), d) {
                            s[e].media[n].initSlides.call(i, t), t.parent().addClass(o(n));
                            break
                        }
                    }
                })
            },
            _loadContents: function() {
                var s = this;
                switch (this.opts.slides.load) {
                    case "all":
                        this._loadContent(0, this.slides.total);
                        break;
                    case "visible":
                        this._loadContent(this.slides.index, this.slides.index + this.slides.visible);
                        break;
                    case "near-visible":
                    default:
                        this._loadContent(this.slides.index, this.slides.index + this.slides.visible), setTimeout(function() {
                            s._loadContent(s.slides.index - s.slides.visible, s.slides.index), s._loadContent(s.slides.index + s.slides.visible, s.slides.index + 2 * s.slides.visible)
                        }, this.conf.transitionDuration)
                }
            },
            _loadContent: function(i, t) {
                var n = this;
                this.nodes.$slides.slice(i, t).each(function() {
                    var i = s(this);
                    if (0 == i.children().length) {
                        var t = i.data(d.anchor),
                            r = t.attr("href");
                        for (var l in s[e].media) {
                            var h = null;
                            if (n.opts.media[l] && n.opts.media[l].filterAnchors && (h = n.opts.media[l].filterAnchors.call(n, t)), "boolean" != typeof h && (h = s[e].media[l].filterAnchors.call(n, t)), h) {
                                s[e].media[l].initAnchors.call(n, i, r), i.addClass(o(l));
                                break
                            }
                        }
                        i.trigger(a.loading, [i.data(d.anchor)])
                    }
                })
            },
            _complementOptions: function() {
                if ("undefined" == typeof this.opts.wrapper.target && (this.opts.wrapper.target = this.$node.is("a") ? "window" : this.$node), "window" != this.opts.wrapper.target && "string" == typeof this.opts.wrapper.target && (this.opts.wrapper.target = s(this.opts.wrapper.target)), this.opts.show = r.complBoolean(this.opts.show, "window" != this.opts.wrapper.target), s.isNumeric(this.opts.slides.width)) this.slides.widthPercentage = !1, this.opts.slides.visible = r.complNumber(this.opts.slides.visible, 1);
                else {
                    var i = r.isPercentage(this.opts.slides.width) ? r.getPercentage(this.opts.slides.width) : !1;
                    this.slides.widthPercentage = !0, this.opts.slides.visible = r.complNumber(this.opts.slides.visible, i ? Math.floor(100 / i) : 1), this.opts.slides.width = i ? i : Math.ceil(1e4 / this.opts.slides.visible) / 100
                }
                this.opts.slides.slide = r.complNumber(this.opts.slides.slide, this.opts.slides.visible), this.opts.slides.offset = r.isPercentage(this.opts.slides.offset) ? r.getPercentage(this.opts.slides.offset) : r.complNumber(this.opts.slides.offset, 0)
            },
            _uniqueID: function() {
                return this.__uniqueID || (this.__uniqueID = 0), this.__uniqueID++, o("uid-" + this.__uniqueID)
            }
        }, s.fn[e] = function(t, n, o, d) {
            l.$wndw || i(), t = s.extend(!0, {}, s[e].defaults, t), t = s.extend(!0, {}, t, s[e].support.touch ? o : n), d = s.extend(!0, {}, s[e].configuration, d);
            var a = new s[e](this, t, d);
            return this.data(e, a), a.nodes.$wrpr
        }, s[e].support = {
            touch: "ontouchstart" in window.document || navigator.msMaxTouchPoints
        }, s[e].defaults = {
            infinite: !1,
            effect: "slide",
            wrapper: {
                classes: "",
                onClick: "toggleUI"
            },
            slides: {
                offset: 0,
                scale: "fit",
                load: "near-visible",
                visible: 1
            },
            media: {}
        }, s[e].configuration = {
            transitionDuration: 400
        }, s[e].constants = {}, s[e].debug = function() {}, s[e].deprecated = function(s, i) {
            "undefined" != typeof console && "undefined" != typeof console.warn && console.warn(e + ": " + s + " is deprecated, use " + i + " instead.")
        }, s[e].effects = {
            slide: function(s) {
                this.nodes.$sldr.css("left", s)
            },
            fade: function(i) {
                r.transitionend(this.nodes.$sldr, function() {
                    s(this).css("left", i).css("opacity", 1)
                }, this.conf.transitionDuration), this.nodes.$sldr.css("opacity", 0)
            }
        }, s[e].version = n, s[e].media = {}, s[e].addons = [], s[e].ui = []
    }
}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Autoplay addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(t) {
    var o, s, u, a, i, n = "tosrus",
        e = "autoplay",
        p = !1;
    t[n].prototype["_addon_" + e] = function() {
        p || (o = t[n]._c, s = t[n]._d, u = t[n]._e, a = t[n]._f, i = t[n]._g, u.add("mouseover mouseout"), p = !0);
        var r = this,
            y = this.opts[e];
        y.play && (this.opts.infinite = !0, this.nodes.$wrpr.on(u.sliding, function() {
            r.autoplay()
        }), y.pauseOnHover && this.nodes.$wrpr.on(u.mouseover, function() {
            r.autostop()
        }).on(u.mouseout, function() {
            r.autoplay()
        }), this.autoplay())
    }, t[n].prototype.autoplay = function() {
        var t = this;
        this.autostop(), this.vars.autoplay = setTimeout(function() {
            t.next()
        }, this.opts[e].timeout)
    }, t[n].prototype.autostop = function() {
        this.vars.autoplay && clearTimeout(this.vars.autoplay)
    }, t[n].defaults[e] = {
        play: !1,
        timeout: 4e3,
        pauseOnHover: !1
    }, t[n].addons.push(e)
}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Buttons addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(s) {
    function e(e, n) {
        return s('<a class="' + t[e] + n + '" href="#"><span></span></a>')
    }

    function n(s, e, n, t) {
        e.on(o.click, function(e) {
            e.preventDefault(), e.stopPropagation(), s.trigger(o[n], [t])
        })
    }
    var t, i, o, d, p, l = "tosrus",
        r = "buttons",
        a = !1;
    s[l].prototype["_addon_" + r] = function() {
        a || (t = s[l]._c, i = s[l]._d, o = s[l]._e, d = s[l]._f, p = s[l]._g, t.add("prev next close disabled"), a = !0);
        var u = this,
            h = this.opts[r];
        this.nodes.$prev = null, this.nodes.$next = null, this.nodes.$clse = null, ("boolean" == typeof h || "string" == typeof h && "inline" == h) && (h = {
            prev: h,
            next: h
        }), "undefined" == typeof h.close && (h.close = this.vars.fixed), this.nodes.$slides.length < 2 && (h.prev = !1, h.next = !1), s.each({
            prev: "prev",
            next: "next",
            close: "clse"
        }, function(i, d) {
            h[i] && ("string" == typeof h[i] && "inline" == h[i] ? u.vars.fixed && "close" != i && u.nodes.$slides.on(o.loading, function() {
                var o = e(i, " " + t.inline)["prev" == i ? "prependTo" : "appendTo"](this);
                n(u.nodes.$wrpr, o, i, 1), u.opts.infinite || ("prev" == i && s(this).is(":first-child") || "next" == i && s(this).is(":last-child")) && o.addClass(t.disabled)
            }) : ("string" == typeof h[i] && (h[i] = s(h[i])), u.nodes["$" + d] = h[i] instanceof s ? h[i] : e(i, "").appendTo(u.nodes.$wrpr), n(u.nodes.$wrpr, u.nodes["$" + d], i, null)))
        }), this.opts.infinite || (this.updateButtons(), this.nodes.$wrpr.on(o.sliding, function() {
            u.updateButtons()
        }))
    }, s[l].prototype.updateButtons = function() {
        this.nodes.$prev && this.nodes.$prev[(this.slides.index < 1 ? "add" : "remove") + "Class"](t.disabled), this.nodes.$next && this.nodes.$next[(this.slides.index >= this.slides.total - this.slides.visible ? "add" : "remove") + "Class"](t.disabled)
    }, s[l].defaults[r] = {
        prev: !s[l].support.touch,
        next: !s[l].support.touch
    }, s[l].addons.push(r), s[l].ui.push("prev"), s[l].ui.push("next"), s[l].ui.push("close")
}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Caption addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(t) {
    var i, s, a, e, d, n = "tosrus",
        r = "caption",
        o = !1;
    t[n].prototype["_addon_" + r] = function() {
        o || (i = t[n]._c, s = t[n]._d, a = t[n]._e, e = t[n]._f, d = t[n]._g, i.add("caption uibg"), s.add("caption"), o = !0);
        var p = this,
            c = this.opts[r];
        if (c.add) {
            c.attributes = c.attributes || [], "string" == typeof c.target && (c.target = t(c.target)), c.target instanceof t ? this.nodes.$capt = c.target : (this.nodes.$capt = t('<div class="' + i.caption + '" />').appendTo(this.nodes.$wrpr), this.nodes.$uibg || (this.nodes.$uibg = t('<div class="' + i.uibg + '" />').prependTo(this.nodes.$wrpr)));
            for (var h = 0, l = this.slides.visible; l > h; h++) t('<div class="' + i.caption + "-" + h + '" />').css("width", this.opts.slides.width + (this.slides.widthPercentage ? "%" : "px")).appendTo(this.nodes.$capt);
            this.nodes.$slides.each(function() {
                var i = t(this),
                    a = p.vars.fixed ? i.data(s.anchor) : i.children();
                i.data(s.caption, "");
                for (var e = 0, d = c.attributes.length; d > e; e++) {
                    var n = a.attr(c.attributes[e]);
                    if (n && n.length) {
                        i.data(s.caption, n);
                        break
                    }
                }
            }), this.nodes.$wrpr.on(a.sliding, function() {
                for (var t = 0, i = p.slides.visible; i > t; t++) p.nodes.$capt.children().eq(t).text(p.nodes.$sldr.children().eq(p.slides.index + t).data(s.caption) || "")
            })
        }
    }, t[n].defaults[r] = {
        add: !1,
        target: null,
        attributes: ["title", "alt", "rel"]
    }, t[n].addons.push(r), t[n].ui.push("caption")
}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Drag addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(e) {
    if ("function" == typeof Hammer) {
        var n, s, t, i, r, a = "tosrus",
            o = "drag",
            d = !1;
        e[a].prototype["_addon_" + o] = function() {
            d || (n = e[a]._c, s = e[a]._d, t = e[a]._e, i = e[a]._f, r = e[a]._g, d = !0);
            var l = this;
            if (this.opts[o] && "slide" == this.opts.effect) {
                if (Hammer.VERSION < 2) return e[a].deprecated("Older version of the Hammer library", "version 2 or newer"), void 0;
                if (this.nodes.$slides.length > 1) {
                    var f = 0,
                        p = !1,
                        h = !1,
                        c = new Hammer(this.nodes.$wrpr[0]);
                    c.on("panstart panleft panright panend swipeleft swiperight", function(e) {
                        e.preventDefault()
                    }).on("panstart", function() {
                        l.nodes.$sldr.addClass(n.noanimation)
                    }).on("panleft panright", function(e) {
                        switch (f = e.deltaX, h = !1, e.direction) {
                            case 2:
                                p = "left";
                                break;
                            case 4:
                                p = "right";
                                break;
                            default:
                                p = !1
                        }("left" == p && l.slides.index + l.slides.visible >= l.slides.total || "right" == p && 0 == l.slides.index) && (f /= 2.5), l.nodes.$sldr.css("margin-left", Math.round(f))
                    }).on("swipeleft swiperight", function() {
                        h = !0
                    }).on("panend", function() {
                        if (l.nodes.$sldr.removeClass(n.noanimation).addClass(n.fastanimation), i.transitionend(l.nodes.$sldr, function() {
                                l.nodes.$sldr.removeClass(n.fastanimation)
                            }, l.conf.transitionDuration / 2), l.nodes.$sldr.css("margin-left", 0), "left" == p || "right" == p) {
                            if (h) var e = l.slides.visible;
                            else var s = l.nodes.$slides.first().width(),
                                e = Math.floor((Math.abs(f) + s / 2) / s);
                            e > 0 && l.nodes.$wrpr.trigger(t["left" == p ? "next" : "prev"], [e])
                        }
                        p = !1
                    })
                }
            }
        }, e[a].defaults[o] = e[a].support.touch, e[a].addons.push(o)
    }
}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Keys addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(e) {
    var t, o, n, s, a, r = "tosrus",
        p = "keys",
        c = !1;
    e[r].prototype["_addon_" + p] = function() {
        c || (t = e[r]._c, o = e[r]._d, n = e[r]._e, s = e[r]._f, a = e[r]._g, n.add("keyup"), c = !0);
        var i = this,
            d = this.opts[p];
        if ("boolean" == typeof d && d && (d = {
                prev: !0,
                next: !0,
                close: !0
            }), e.isPlainObject(d)) {
            for (var f in e[r].constants[p]) "boolean" == typeof d[f] && d[f] && (d[f] = e[r].constants[p][f]);
            this.nodes.$slides.length < 2 && (d.prev = !1, d.next = !1), e(document).on(n.keyup, function(e) {
                if (i.vars.opened) {
                    var t = !1;
                    switch (e.keyCode) {
                        case d.prev:
                            t = n.prev;
                            break;
                        case d.next:
                            t = n.next;
                            break;
                        case d.close:
                            t = n.close
                    }
                    t && (e.preventDefault(), e.stopPropagation(), i.nodes.$wrpr.trigger(t))
                }
            })
        }
    }, e[r].defaults[p] = !1, e[r].constants[p] = {
        prev: 37,
        next: 39,
        close: 27
    }, e[r].addons.push(p)
}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Pagination addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(t) {
    var e, i, n, s, a, r = "tosrus",
        o = "pagination",
        d = !1;
    t[r].prototype["_addon_" + o] = function() {
        d || (e = t[r]._c, i = t[r]._d, n = t[r]._e, s = t[r]._f, a = t[r]._g, e.add("pagination selected uibg bullets thumbnails"), d = !0);
        var u = this,
            l = this.opts[o];
        if (this.nodes.$slides.length < 2 && (l.add = !1), l.add) {
            if ("string" == typeof l.target && (l.target = t(l.target)), l.target instanceof t ? this.nodes.$pagr = l.target : (this.nodes.$pagr = t('<div class="' + e.pagination + " " + e[l.type] + '" />').appendTo(this.nodes.$wrpr), this.nodes.$uibg || (this.nodes.$uibg = t('<div class="' + e.uibg + '" />').prependTo(this.nodes.$wrpr))), "function" != typeof l.anchorBuilder) switch (l.type) {
                case "thumbnails":
                    var h = '<a href="#" style="background-image: url(',
                        p = ');"></a>';
                    l.anchorBuilder = this.vars.fixed ? function() {
                        return h + t(this).data(i.anchor).attr("href") + p
                    } : function() {
                        return h + t(this).find("img").attr("src") + p
                    };
                    break;
                case "bullets":
                default:
                    l.anchorBuilder = function() {
                        return '<a href="#"></a>'
                    }
            }
            this.nodes.$slides.each(function(e) {
                t(l.anchorBuilder.call(this, e + 1)).appendTo(u.nodes.$pagr).on(n.click, function(t) {
                    t.preventDefault(), t.stopPropagation(), u.nodes.$wrpr.trigger(n.slideTo, [e])
                })
            }), this.updatePagination(), this.nodes.$wrpr.on(n.sliding, function() {
                u.updatePagination()
            })
        }
    }, t[r].prototype.updatePagination = function() {
        this.nodes.$pagr && this.nodes.$pagr.children().removeClass(e.selected).eq(this.slides.index).addClass(e.selected)
    }, t[r].defaults[o] = {
        add: !1,
        type: "bullets",
        target: null,
        anchorBuilder: null
    }, t[r].addons.push(o), t[r].ui.push("pagination"), t[r].ui.push("bullets"), t[r].ui.push("thumbnails")
}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * HTML media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(i) {
    var e = "tosrus",
        n = "html";
    i[e].media[n] = {
        filterAnchors: function(e) {
            var n = e.attr("href");
            return "#" == n.slice(0, 1) && i(n).is("div")
        },
        initAnchors: function(n, t) {
            i('<div class="' + i[e]._c("html") + '" />').append(i(t)).appendTo(n), n.removeClass(i[e]._c.loading).trigger(i[e]._e.loaded)
        },
        filterSlides: function(i) {
            return i.is("div")
        },
        initSlides: function() {}
    }, i[e].defaults.media[n] = {}
}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Images media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(i) {
    var e = "tosrus",
        n = "image";
    i[e].media[n] = {
        filterAnchors: function(e) {
            return i.inArray(e.attr("href").toLowerCase().split(".").pop().split("?")[0], ["jpg", "jpe", "jpeg", "gif", "png"]) > -1
        },
        initAnchors: function(n, r) {
            i('<img border="0" />').on(i[e]._e.load, function(r) {
                r.stopPropagation(), n.removeClass(i[e]._c.loading).trigger(i[e]._e.loaded)
            }).appendTo(n).attr("src", r)
        },
        filterSlides: function(i) {
            return i.is("img")
        },
        initSlides: function() {}
    }, i[e].defaults.media[n] = {}
}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Vimeo media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(i) {
    function t(t) {
        function l() {
            f.length && (f.attr("src", ""), f.attr("src", h))
        }
        c || (a = i[s]._c, e = i[s]._d, o = i[s]._e, r = i[s]._f, n = i[s]._g, e.add("ratio maxWidth maxHeight"), c = !0);
        var f = t.children(),
            m = t.data(i[s]._d.anchor) || i(),
            h = f.attr("src"),
            u = m.data(e.ratio) || this.opts[d].ratio,
            g = m.data(e.maxWidth) || this.opts[d].maxWidth,
            p = m.data(e.maxHeight) || this.opts[d].maxHeight;
        t.removeClass(a.loading).trigger(o.loaded).on(o.loading, function() {
            r.resizeRatio(f, t, g, p, u)
        }), this.nodes.$wrpr.on(o.sliding, function() {
            l()
        }).on(o.closing, function() {
            l()
        }), n.$wndw.on(o.resize, function() {
            r.resizeRatio(f, t, g, p, u)
        })
    }
    var a, e, o, r, n, s = "tosrus",
        d = "vimeo",
        c = !1;
    i[s].media[d] = {
        filterAnchors: function(i) {
            return i.attr("href").toLowerCase().indexOf("vimeo.com/") > -1
        },
        initAnchors: function(a, e) {
            var o = this._uniqueID();
            e = e.split("vimeo.com/")[1].split("?")[0] + "?api=1&player_id=" + o, i('<iframe id="' + o + '" src="http://player.vimeo.com/video/' + e + '" frameborder="0" allowfullscreen />').appendTo(a), t.call(this, a)
        },
        filterSlides: function(i) {
            return i.is("iframe") && i.attr("src") ? i.attr("src").toLowerCase().indexOf("vimeo.com/video/") > -1 : !1
        },
        initSlides: function(i) {
            t.call(this, i)
        }
    }, i[s].defaults.media[d] = {}, i[s].defaults[d] = {
        ratio: 16 / 9,
        maxWidth: !1,
        maxHeight: !1
    }
}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Youtube media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
! function(t) {
    function e(e) {
        function u(t) {
            l.length && l[0].contentWindow.postMessage('{ "event": "command", "func": "' + t + 'Video" }', "*")
        }
        c || (i = t[s]._c, o = t[s]._d, a = t[s]._e, n = t[s]._f, r = t[s]._g, o.add("ratio maxWidth maxHeight"), c = !0);
        var l = e.children(),
            m = e.data(t[s]._d.anchor) || t(),
            f = m.data(o.ratio) || this.opts[d].ratio,
            h = m.data(o.maxWidth) || this.opts[d].maxWidth,
            p = m.data(o.maxHeight) || this.opts[d].maxHeight;
        e.removeClass(i.loading).trigger(a.loaded).on(a.loading, function() {
            n.resizeRatio(l, e, h, p, f)
        }), this.nodes.$wrpr.on(a.sliding, function() {
            u("pause")
        }).on(a.closing, function() {
            u("stop")
        }), r.$wndw.on(a.resize, function() {
            n.resizeRatio(l, e, h, p, f)
        })
    }
    var i, o, a, n, r, s = "tosrus",
        d = "youtube",
        c = !1;
    t[s].media[d] = {
        filterAnchors: function(t) {
            return t.attr("href").toLowerCase().indexOf("youtube.com/watch?v=") > -1
        },
        initAnchors: function(i, o) {
            var a = o;
            o = o.split("?v=")[1].split("&")[0], this.opts[d].imageLink ? (o = "http://img.youtube.com/vi/" + o + "/0.jpg", t('<a href="' + a + '" class="' + t[s]._c("play") + '" target="_blank" />').appendTo(i), t('<img border="0" />').on(t[s]._e.load, function(e) {
                e.stopPropagation(), i.removeClass(t[s]._c.loading).trigger(t[s]._e.loaded)
            }).appendTo(i).attr("src", o)) : (t('<iframe src="http://www.youtube.com/embed/' + o + '?enablejsapi=1" frameborder="0" allowfullscreen />').appendTo(i), e.call(this, i))
        },
        filterSlides: function(t) {
            return t.is("iframe") && t.attr("src") ? t.attr("src").toLowerCase().indexOf("youtube.com/embed/") > -1 : !1
        },
        initSlides: function(t) {
            e.call(this, t)
        }
    }, t[s].defaults.media[d] = {}, t[s].defaults[d] = {
        ratio: 16 / 9,
        maxWidth: !1,
        maxHeight: !1,
        imageLink: t[s].support.touch
    }
}(jQuery);
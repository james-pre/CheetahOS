!(function e(t, n, r) {
	function o(s, a) {
		if (!n[s]) {
			if (!t[s]) {
				var l = 'function' == typeof require && require;
				if (!a && l) return l(s, !0);
				if (i) return i(s, !0);
				var c = new Error("Cannot find module '" + s + "'");
				throw ((c.code = 'MODULE_NOT_FOUND'), c);
			}
			var u = (n[s] = { exports: {} });
			t[s][0].call(
				u.exports,
				function (e) {
					return o(t[s][1][e] || e);
				},
				u,
				u.exports,
				e,
				t,
				n,
				r
			);
		}
		return n[s].exports;
	}
	for (var i = 'function' == typeof require && require, s = 0; s < r.length; s++) o(r[s]);
	return o;
})(
	{
		1: [
			function (e, t, n) {
				'use strict';
				var r = e('./utils');
				function o() {
					var e = {},
						t = 0,
						n = 0,
						r = 0;
					return {
						add: function (o, i) {
							i || ((i = o), (o = 0)), o > n ? (n = o) : o < r && (r = o), e[o] || (e[o] = []), e[o].push(i), t++;
						},
						process: function () {
							for (var t = r; t <= n; t++) for (var o = e[t], i = 0; i < o.length; i++) (0, o[i])();
						},
						size: function () {
							return t;
						},
					};
				}
				t.exports = function (e) {
					var t = (e = e || {}).reporter,
						n = r.getOption(e, 'async', !0),
						i = r.getOption(e, 'auto', !0);
					i && !n && (t && t.warn('Invalid options combination. auto=true and async=false is invalid. Setting async=true.'), (n = !0));
					var s,
						a = o(),
						l = !1;
					function c() {
						for (l = !0; a.size(); ) {
							var e = a;
							(a = o()), e.process();
						}
						l = !1;
					}
					function u() {
						s = setTimeout(c, 0);
					}
					return {
						add: function (e, t) {
							!l && i && n && 0 === a.size() && u(), a.add(e, t);
						},
						force: function (e) {
							l || (void 0 === e && (e = n), s && (clearTimeout(s), (s = null)), e ? u() : c());
						},
					};
				};
			},
			{ './utils': 2 },
		],
		2: [
			function (e, t, n) {
				'use strict';
				(t.exports = {}).getOption = function (e, t, n) {
					var r = e[t];
					return null == r && void 0 !== n ? n : r;
				};
			},
			{},
		],
		3: [
			function (e, t, n) {
				'use strict';
				var r = (t.exports = {});
				(r.isIE = function (e) {
					return !(
						(-1 === (t = navigator.userAgent.toLowerCase()).indexOf('msie') && -1 === t.indexOf('trident') && -1 === t.indexOf(' edge/')) ||
						(e &&
							e !==
								(function () {
									var e = 3,
										t = document.createElement('div'),
										n = t.getElementsByTagName('i');
									do {
										t.innerHTML = '\x3c!--[if gt IE ' + ++e + ']><i></i><![endif]--\x3e';
									} while (n[0]);
									return e > 4 ? e : void 0;
								})())
					);
					var t;
				}),
					(r.isLegacyOpera = function () {
						return !!window.opera;
					});
			},
			{},
		],
		4: [
			function (e, t, n) {
				'use strict';
				(t.exports = {}).forEach = function (e, t) {
					for (var n = 0; n < e.length; n++) {
						var r = t(e[n]);
						if (r) return r;
					}
				};
			},
			{},
		],
		5: [
			function (e, t, n) {
				'use strict';
				var r = e('../browser-detector');
				t.exports = function (e) {
					var t = (e = e || {}).reporter,
						n = e.batchProcessor,
						o = e.stateHandler.getState;
					if (!t) throw new Error('Missing required dependency: reporter.');
					function i(t) {
						var n = e.important ? ' !important; ' : '; ';
						return (t.join(n) + n).trim();
					}
					function s(e) {
						return o(e).object;
					}
					return {
						makeDetectable: function (e, s, a) {
							a || ((a = s), (s = e), (e = null)),
								(e = e || {}).debug,
								r.isIE(8)
									? a(s)
									: (function (s, a) {
											var l = i([
													'display: block',
													'position: absolute',
													'top: 0',
													'left: 0',
													'width: 100%',
													'height: 100%',
													'border: none',
													'padding: 0',
													'margin: 0',
													'opacity: 0',
													'z-index: -1000',
													'pointer-events: none',
												]),
												c = !1,
												u = window.getComputedStyle(s),
												d = s.offsetWidth,
												f = s.offsetHeight;
											function p() {
												function n() {
													if ('static' === u.position) {
														s.style.setProperty('position', 'relative', e.important ? 'important' : '');
														var n = function (t, n, r, o) {
															var i = r[o];
															'auto' !== i &&
																'0' !==
																	(function (e) {
																		return e.replace(/[^-\d\.]/g, '');
																	})(i) &&
																(t.warn(
																	'An element that is positioned static has style.' +
																		o +
																		'=' +
																		i +
																		' which is ignored due to the static positioning. The element will need to be positioned relative, so the style.' +
																		o +
																		' will be set to 0. Element: ',
																	n
																),
																n.style.setProperty(o, '0', e.important ? 'important' : ''));
														};
														n(t, s, u, 'top'), n(t, s, u, 'right'), n(t, s, u, 'bottom'), n(t, s, u, 'left');
													}
												}
												'' !== u.position && (n(), (c = !0));
												var i = document.createElement('object');
												(i.style.cssText = l),
													(i.tabIndex = -1),
													(i.type = 'text/html'),
													i.setAttribute('aria-hidden', 'true'),
													(i.onload = function () {
														c || n(),
															(function e(t, n) {
																if (!t.contentDocument) {
																	var r = o(t);
																	return (
																		r.checkForObjectDocumentTimeoutId && window.clearTimeout(r.checkForObjectDocumentTimeoutId),
																		void (r.checkForObjectDocumentTimeoutId = setTimeout(function () {
																			(r.checkForObjectDocumentTimeoutId = 0), e(t, n);
																		}, 100))
																	);
																}
																n(t.contentDocument);
															})(this, function (e) {
																a(s);
															});
													}),
													r.isIE() || (i.data = 'about:blank'),
													o(s) && (s.appendChild(i), (o(s).object = i), r.isIE() && (i.data = 'about:blank'));
											}
											(o(s).startSize = { width: d, height: f }), n ? n.add(p) : p();
										})(s, a);
						},
						addListener: function (e, t) {
							function n() {
								t(e);
							}
							if (r.isIE(8)) (o(e).object = { proxy: n }), e.attachEvent('onresize', n);
							else {
								var i = s(e);
								if (!i) throw new Error('Element is not detectable by this strategy.');
								i.contentDocument.defaultView.addEventListener('resize', n);
							}
						},
						uninstall: function (e) {
							if (o(e)) {
								var t = s(e);
								t &&
									(r.isIE(8) ? e.detachEvent('onresize', t.proxy) : e.removeChild(t),
									o(e).checkForObjectDocumentTimeoutId && window.clearTimeout(o(e).checkForObjectDocumentTimeoutId),
									delete o(e).object);
							}
						},
					};
				};
			},
			{ '../browser-detector': 3 },
		],
		6: [
			function (e, t, n) {
				'use strict';
				var r = e('../collection-utils').forEach;
				t.exports = function (e) {
					var t = (e = e || {}).reporter,
						n = e.batchProcessor,
						o = e.stateHandler.getState,
						i = (e.stateHandler.hasState, e.idHandler);
					if (!n) throw new Error('Missing required dependency: batchProcessor');
					if (!t) throw new Error('Missing required dependency: reporter.');
					var s = (function () {
							var e = document.createElement('div');
							e.style.cssText = c(['position: absolute', 'width: 1000px', 'height: 1000px', 'visibility: hidden', 'margin: 0', 'padding: 0']);
							var t = document.createElement('div');
							(t.style.cssText = c([
								'position: absolute',
								'width: 500px',
								'height: 500px',
								'overflow: scroll',
								'visibility: none',
								'top: -1500px',
								'left: -1500px',
								'visibility: hidden',
								'margin: 0',
								'padding: 0',
							])),
								t.appendChild(e),
								document.body.insertBefore(t, document.body.firstChild);
							var n = 500 - t.clientWidth,
								r = 500 - t.clientHeight;
							return document.body.removeChild(t), { width: n, height: r };
						})(),
						a = 'erd_scroll_detection_container';
					function l(e) {
						!(function (e, t, n) {
							if (!e.getElementById(t)) {
								var r = n + '_animation',
									o = '/* Created by the element-resize-detector library. */\n';
								(o += '.' + n + ' > div::-webkit-scrollbar { ' + c(['display: none']) + ' }\n\n'),
									(o +=
										'.erd_scroll_detection_container_animation_active { ' +
										c(['-webkit-animation-duration: 0.1s', 'animation-duration: 0.1s', '-webkit-animation-name: ' + r, 'animation-name: ' + r]) +
										' }\n'),
									(o += '@-webkit-keyframes ' + r + ' { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n'),
									(function (n, r) {
										r =
											r ||
											function (t) {
												e.head.appendChild(t);
											};
										var o = e.createElement('style');
										(o.innerHTML = n), (o.id = t), r(o);
									})((o += '@keyframes ' + r + ' { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }'));
							}
						})(e, 'erd_scroll_detection_scrollbar_style', a);
					}
					function c(t) {
						var n = e.important ? ' !important; ' : '; ';
						return (t.join(n) + n).trim();
					}
					function u(e, n, r) {
						if (e.addEventListener) e.addEventListener(n, r);
						else {
							if (!e.attachEvent) return t.error("[scroll] Don't know how to add event listeners.");
							e.attachEvent('on' + n, r);
						}
					}
					function d(e, n, r) {
						if (e.removeEventListener) e.removeEventListener(n, r);
						else {
							if (!e.detachEvent) return t.error("[scroll] Don't know how to remove event listeners.");
							e.detachEvent('on' + n, r);
						}
					}
					function f(e) {
						return o(e).container.childNodes[0].childNodes[0].childNodes[0];
					}
					function p(e) {
						return o(e).container.childNodes[0].childNodes[0].childNodes[1];
					}
					return (
						l(window.document),
						{
							makeDetectable: function (e, l, d) {
								function h() {
									if (e.debug) {
										var n = Array.prototype.slice.call(arguments);
										if ((n.unshift(i.get(l), 'Scroll: '), t.log.apply)) t.log.apply(null, n);
										else for (var r = 0; r < n.length; r++) t.log(n[r]);
									}
								}
								function m(e) {
									var t = o(e).container.childNodes[0],
										n = window.getComputedStyle(t);
									return !n.width || -1 === n.width.indexOf('px');
								}
								function y() {
									var e = window.getComputedStyle(l),
										t = {};
									return (
										(t.position = e.position),
										(t.width = l.offsetWidth),
										(t.height = l.offsetHeight),
										(t.top = e.top),
										(t.right = e.right),
										(t.bottom = e.bottom),
										(t.left = e.left),
										(t.widthCSS = e.width),
										(t.heightCSS = e.height),
										t
									);
								}
								function v() {
									if ((h('storeStyle invoked.'), o(l))) {
										var e = y();
										o(l).style = e;
									} else h('Aborting because element has been uninstalled');
								}
								function g(e, t, n) {
									(o(e).lastWidth = t), (o(e).lastHeight = n);
								}
								function b() {
									return 2 * s.width + 1;
								}
								function w() {
									return 2 * s.height + 1;
								}
								function _(e) {
									return e + 10 + b();
								}
								function x(e) {
									return e + 10 + w();
								}
								function k(e, t, n) {
									var r = f(e),
										o = p(e),
										i = _(t),
										s = x(n),
										a = (function (e) {
											return 2 * e + b();
										})(t),
										l = (function (e) {
											return 2 * e + w();
										})(n);
									(r.scrollLeft = i), (r.scrollTop = s), (o.scrollLeft = a), (o.scrollTop = l);
								}
								function C() {
									var e = o(l).container;
									if (!e) {
										((e = document.createElement('div')).className = a),
											(e.style.cssText = c([
												'visibility: hidden',
												'display: inline',
												'width: 0px',
												'height: 0px',
												'z-index: -1',
												'overflow: hidden',
												'margin: 0',
												'padding: 0',
											])),
											(o(l).container = e),
											(function (e) {
												e.className += ' ' + a + '_animation_active';
											})(e),
											l.appendChild(e);
										var t = function () {
											o(l).onRendered && o(l).onRendered();
										};
										u(e, 'animationstart', t), (o(l).onAnimationStart = t);
									}
									return e;
								}
								function E() {
									if ((h('Injecting elements'), o(l))) {
										!(function () {
											var n = o(l).style;
											if ('static' === n.position) {
												l.style.setProperty('position', 'relative', e.important ? 'important' : '');
												var r = function (e, t, n, r) {
													var o = n[r];
													'auto' !== o &&
														'0' !==
															(function (e) {
																return e.replace(/[^-\d\.]/g, '');
															})(o) &&
														(e.warn(
															'An element that is positioned static has style.' +
																r +
																'=' +
																o +
																' which is ignored due to the static positioning. The element will need to be positioned relative, so the style.' +
																r +
																' will be set to 0. Element: ',
															t
														),
														(t.style[r] = 0));
												};
												r(t, l, n, 'top'), r(t, l, n, 'right'), r(t, l, n, 'bottom'), r(t, l, n, 'left');
											}
										})();
										var n = o(l).container;
										n || (n = C());
										var r,
											i,
											d,
											f,
											p = s.width,
											m = s.height,
											y = c([
												'position: absolute',
												'flex: none',
												'overflow: hidden',
												'z-index: -1',
												'visibility: hidden',
												'width: 100%',
												'height: 100%',
												'left: 0px',
												'top: 0px',
											]),
											v = c(
												['position: absolute', 'flex: none', 'overflow: hidden', 'z-index: -1', 'visibility: hidden'].concat([
													'left: ' + (r = (r = -(1 + p)) ? r + 'px' : '0'),
													'top: ' + (i = (i = -(1 + m)) ? i + 'px' : '0'),
													'right: ' + (f = (f = -p) ? f + 'px' : '0'),
													'bottom: ' + (d = (d = -m) ? d + 'px' : '0'),
												])
											),
											g = c(['position: absolute', 'flex: none', 'overflow: scroll', 'z-index: -1', 'visibility: hidden', 'width: 100%', 'height: 100%']),
											b = c(['position: absolute', 'flex: none', 'overflow: scroll', 'z-index: -1', 'visibility: hidden', 'width: 100%', 'height: 100%']),
											w = c(['position: absolute', 'left: 0', 'top: 0']),
											_ = c(['position: absolute', 'width: 200%', 'height: 200%']),
											x = document.createElement('div'),
											k = document.createElement('div'),
											E = document.createElement('div'),
											j = document.createElement('div'),
											S = document.createElement('div'),
											D = document.createElement('div');
										(x.dir = 'ltr'),
											(x.style.cssText = y),
											(x.className = a),
											(k.className = a),
											(k.style.cssText = v),
											(E.style.cssText = g),
											(j.style.cssText = w),
											(S.style.cssText = b),
											(D.style.cssText = _),
											E.appendChild(j),
											S.appendChild(D),
											k.appendChild(E),
											k.appendChild(S),
											x.appendChild(k),
											n.appendChild(x),
											u(E, 'scroll', O),
											u(S, 'scroll', P),
											(o(l).onExpandScroll = O),
											(o(l).onShrinkScroll = P);
									} else h('Aborting because element has been uninstalled');
									function O() {
										var e = o(l);
										e && e.onExpand ? e.onExpand() : h('Aborting expand scroll handler: element has been uninstalled');
									}
									function P() {
										var e = o(l);
										e && e.onShrink ? e.onShrink() : h('Aborting shrink scroll handler: element has been uninstalled');
									}
								}
								function j() {
									function s(t, n, r) {
										var o = (function (e) {
												return f(e).childNodes[0];
											})(t),
											i = _(n),
											s = x(r);
										o.style.setProperty('width', i + 'px', e.important ? 'important' : ''),
											o.style.setProperty('height', s + 'px', e.important ? 'important' : '');
									}
									function a(r) {
										var a = l.offsetWidth,
											u = l.offsetHeight,
											d = a !== o(l).lastWidth || u !== o(l).lastHeight;
										h('Storing current size', a, u),
											g(l, a, u),
											n.add(0, function () {
												if (d)
													if (o(l))
														if (c()) {
															if (e.debug) {
																var n = l.offsetWidth,
																	r = l.offsetHeight;
																(n === a && r === u) || t.warn(i.get(l), 'Scroll: Size changed before updating detector elements.');
															}
															s(l, a, u);
														} else h('Aborting because element container has not been initialized');
													else h('Aborting because element has been uninstalled');
											}),
											n.add(1, function () {
												o(l)
													? c()
														? k(l, a, u)
														: h('Aborting because element container has not been initialized')
													: h('Aborting because element has been uninstalled');
											}),
											d &&
												r &&
												n.add(2, function () {
													o(l)
														? c()
															? r()
															: h('Aborting because element container has not been initialized')
														: h('Aborting because element has been uninstalled');
												});
									}
									function c() {
										return !!o(l).container;
									}
									function u() {
										h('notifyListenersIfNeeded invoked');
										var e = o(l);
										return void 0 === o(l).lastNotifiedWidth && e.lastWidth === e.startSize.width && e.lastHeight === e.startSize.height
											? h('Not notifying: Size is the same as the start size, and there has been no notification yet.')
											: e.lastWidth === e.lastNotifiedWidth && e.lastHeight === e.lastNotifiedHeight
												? h('Not notifying: Size already notified')
												: (h('Current size not notified, notifying...'),
													(e.lastNotifiedWidth = e.lastWidth),
													(e.lastNotifiedHeight = e.lastHeight),
													void r(o(l).listeners, function (e) {
														e(l);
													}));
									}
									function d() {
										h('Scroll detected.'), m(l) ? h('Scroll event fired while unrendered. Ignoring...') : a(u);
									}
									if ((h('registerListenersAndPositionElements invoked.'), o(l))) {
										(o(l).onRendered = function () {
											if ((h('startanimation triggered.'), m(l))) h('Ignoring since element is still unrendered...');
											else {
												h('Element rendered.');
												var e = f(l),
													t = p(l);
												(0 !== e.scrollLeft && 0 !== e.scrollTop && 0 !== t.scrollLeft && 0 !== t.scrollTop) ||
													(h('Scrollbars out of sync. Updating detector elements...'), a(u));
											}
										}),
											(o(l).onExpand = d),
											(o(l).onShrink = d);
										var y = o(l).style;
										s(l, y.width, y.height);
									} else h('Aborting because element has been uninstalled');
								}
								function S() {
									if ((h('finalizeDomMutation invoked.'), o(l))) {
										var e = o(l).style;
										g(l, e.width, e.height), k(l, e.width, e.height);
									} else h('Aborting because element has been uninstalled');
								}
								function D() {
									d(l);
								}
								function O() {
									var e;
									h('Installing...'),
										(o(l).listeners = []),
										(e = y()),
										(o(l).startSize = { width: e.width, height: e.height }),
										h('Element start size', o(l).startSize),
										n.add(0, v),
										n.add(1, E),
										n.add(2, j),
										n.add(3, S),
										n.add(4, D);
								}
								d || ((d = l), (l = e), (e = null)),
									(e = e || {}),
									h('Making detectable...'),
									(function (e) {
										return (
											!(function (e) {
												var t = e.getRootNode && e.getRootNode().contains(e);
												return e === e.ownerDocument.body || e.ownerDocument.body.contains(e) || t;
											})(e) || null === window.getComputedStyle(e)
										);
									})(l)
										? (h('Element is detached'),
											C(),
											h('Waiting until element is attached...'),
											(o(l).onRendered = function () {
												h('Element is now attached'), O();
											}))
										: O();
							},
							addListener: function (e, t) {
								if (!o(e).listeners.push) throw new Error('Cannot add listener to an element that is not detectable.');
								o(e).listeners.push(t);
							},
							uninstall: function (e) {
								var t = o(e);
								t &&
									(t.onExpandScroll && d(f(e), 'scroll', t.onExpandScroll),
									t.onShrinkScroll && d(p(e), 'scroll', t.onShrinkScroll),
									t.onAnimationStart && d(t.container, 'animationstart', t.onAnimationStart),
									t.container && e.removeChild(t.container));
							},
							initDocument: l,
						}
					);
				};
			},
			{ '../collection-utils': 4 },
		],
		7: [
			function (e, t, n) {
				'use strict';
				var r = e('./collection-utils').forEach,
					o = e('./element-utils'),
					i = e('./listener-handler'),
					s = e('./id-generator'),
					a = e('./id-handler'),
					l = e('./reporter'),
					c = e('./browser-detector'),
					u = e('batch-processor'),
					d = e('./state-handler'),
					f = e('./detection-strategy/object.js'),
					p = e('./detection-strategy/scroll.js');
				function h(e) {
					return Array.isArray(e) || void 0 !== e.length;
				}
				function m(e) {
					if (Array.isArray(e)) return e;
					var t = [];
					return (
						r(e, function (e) {
							t.push(e);
						}),
						t
					);
				}
				function y(e) {
					return e && 1 === e.nodeType;
				}
				function v(e, t, n) {
					var r = e[t];
					return null == r && void 0 !== n ? n : r;
				}
				t.exports = function (e) {
					var t;
					if ((e = e || {}).idHandler)
						t = {
							get: function (t) {
								return e.idHandler.get(t, !0);
							},
							set: e.idHandler.set,
						};
					else {
						var n = s(),
							g = a({ idGenerator: n, stateHandler: d });
						t = g;
					}
					var b = e.reporter;
					b || (b = l(!1 === b));
					var w = v(e, 'batchProcessor', u({ reporter: b })),
						_ = {};
					(_.callOnAdd = !!v(e, 'callOnAdd', !0)), (_.debug = !!v(e, 'debug', !1));
					var x,
						k = i(t),
						C = o({ stateHandler: d }),
						E = v(e, 'strategy', 'object'),
						j = v(e, 'important', !1),
						S = { reporter: b, batchProcessor: w, stateHandler: d, idHandler: t, important: j };
					if (
						('scroll' === E &&
							(c.isLegacyOpera()
								? (b.warn('Scroll strategy is not supported on legacy Opera. Changing to object strategy.'), (E = 'object'))
								: c.isIE(9) && (b.warn('Scroll strategy is not supported on IE9. Changing to object strategy.'), (E = 'object'))),
						'scroll' === E)
					)
						x = p(S);
					else {
						if ('object' !== E) throw new Error('Invalid strategy name: ' + E);
						x = f(S);
					}
					var D = {};
					return {
						listenTo: function (e, n, o) {
							function i(e) {
								var t = k.get(e);
								r(t, function (t) {
									t(e);
								});
							}
							function s(e, t, n) {
								k.add(t, n), e && n(t);
							}
							if ((o || ((o = n), (n = e), (e = {})), !n)) throw new Error('At least one element required.');
							if (!o) throw new Error('Listener required.');
							if (y(n)) n = [n];
							else {
								if (!h(n)) return b.error('Invalid arguments. Must be a DOM element or a collection of DOM elements.');
								n = m(n);
							}
							var a = 0,
								l = v(e, 'callOnAdd', _.callOnAdd),
								c = v(e, 'onReady', function () {}),
								u = v(e, 'debug', _.debug);
							r(n, function (e) {
								d.getState(e) || (d.initState(e), t.set(e));
								var f = t.get(e);
								if ((u && b.log('Attaching listener to element', f, e), !C.isDetectable(e)))
									return (
										u && b.log(f, 'Not detectable.'),
										C.isBusy(e)
											? (u && b.log(f, 'System busy making it detectable'),
												s(l, e, o),
												(D[f] = D[f] || []),
												void D[f].push(function () {
													++a === n.length && c();
												}))
											: (u && b.log(f, 'Making detectable...'),
												C.markBusy(e, !0),
												x.makeDetectable({ debug: u, important: j }, e, function (e) {
													if ((u && b.log(f, 'onElementDetectable'), d.getState(e))) {
														C.markAsDetectable(e), C.markBusy(e, !1), x.addListener(e, i), s(l, e, o);
														var t = d.getState(e);
														if (t && t.startSize) {
															var p = e.offsetWidth,
																h = e.offsetHeight;
															(t.startSize.width === p && t.startSize.height === h) || i(e);
														}
														D[f] &&
															r(D[f], function (e) {
																e();
															});
													} else u && b.log(f, 'Element uninstalled before being detectable.');
													delete D[f], ++a === n.length && c();
												}))
									);
								u && b.log(f, 'Already detecable, adding listener.'), s(l, e, o), a++;
							}),
								a === n.length && c();
						},
						removeListener: k.removeListener,
						removeAllListeners: k.removeAllListeners,
						uninstall: function (e) {
							if (!e) return b.error('At least one element is required.');
							if (y(e)) e = [e];
							else {
								if (!h(e)) return b.error('Invalid arguments. Must be a DOM element or a collection of DOM elements.');
								e = m(e);
							}
							r(e, function (e) {
								k.removeAllListeners(e), x.uninstall(e), d.cleanState(e);
							});
						},
						initDocument: function (e) {
							x.initDocument && x.initDocument(e);
						},
					};
				};
			},
			{
				'./browser-detector': 3,
				'./collection-utils': 4,
				'./detection-strategy/object.js': 5,
				'./detection-strategy/scroll.js': 6,
				'./element-utils': 8,
				'./id-generator': 9,
				'./id-handler': 10,
				'./listener-handler': 11,
				'./reporter': 12,
				'./state-handler': 13,
				'batch-processor': 1,
			},
		],
		8: [
			function (e, t, n) {
				'use strict';
				t.exports = function (e) {
					var t = e.stateHandler.getState;
					return {
						isDetectable: function (e) {
							var n = t(e);
							return n && !!n.isDetectable;
						},
						markAsDetectable: function (e) {
							t(e).isDetectable = !0;
						},
						isBusy: function (e) {
							return !!t(e).busy;
						},
						markBusy: function (e, n) {
							t(e).busy = !!n;
						},
					};
				};
			},
			{},
		],
		9: [
			function (e, t, n) {
				'use strict';
				t.exports = function () {
					var e = 1;
					return {
						generate: function () {
							return e++;
						},
					};
				};
			},
			{},
		],
		10: [
			function (e, t, n) {
				'use strict';
				t.exports = function (e) {
					var t = e.idGenerator,
						n = e.stateHandler.getState;
					return {
						get: function (e) {
							var t = n(e);
							return t && void 0 !== t.id ? t.id : null;
						},
						set: function (e) {
							var r = n(e);
							if (!r) throw new Error('setId required the element to have a resize detection state.');
							var o = t.generate();
							return (r.id = o), o;
						},
					};
				};
			},
			{},
		],
		11: [
			function (e, t, n) {
				'use strict';
				t.exports = function (e) {
					var t = {};
					function n(n) {
						var r = e.get(n);
						return void 0 === r ? [] : t[r] || [];
					}
					return {
						get: n,
						add: function (n, r) {
							var o = e.get(n);
							t[o] || (t[o] = []), t[o].push(r);
						},
						removeListener: function (e, t) {
							for (var r = n(e), o = 0, i = r.length; o < i; ++o)
								if (r[o] === t) {
									r.splice(o, 1);
									break;
								}
						},
						removeAllListeners: function (e) {
							var t = n(e);
							t && (t.length = 0);
						},
					};
				};
			},
			{},
		],
		12: [
			function (e, t, n) {
				'use strict';
				t.exports = function (e) {
					function t() {}
					var n = { log: t, warn: t, error: t };
					if (!e && window.console) {
						var r = function (e, t) {
							e[t] = function () {
								var e = console[t];
								if (e.apply) e.apply(console, arguments);
								else for (var n = 0; n < arguments.length; n++) e(arguments[n]);
							};
						};
						r(n, 'log'), r(n, 'warn'), r(n, 'error');
					}
					return n;
				};
			},
			{},
		],
		13: [
			function (e, t, n) {
				'use strict';
				function r(e) {
					return e._erd;
				}
				t.exports = {
					initState: function (e) {
						return (e._erd = {}), r(e);
					},
					getState: r,
					cleanState: function (e) {
						delete e._erd;
					},
				};
			},
			{},
		],
		14: [
			function (e, t, n) {
				var r, o;
				(r = window),
					(o = function () {
						return (function (e) {
							var t = {};
							function n(r) {
								if (t[r]) return t[r].exports;
								var o = (t[r] = { i: r, l: !1, exports: {} });
								return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
							}
							return (
								(n.m = e),
								(n.c = t),
								(n.d = function (e, t, r) {
									n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
								}),
								(n.r = function (e) {
									'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
										Object.defineProperty(e, '__esModule', { value: !0 });
								}),
								(n.t = function (e, t) {
									if ((1 & t && (e = n(e)), 8 & t)) return e;
									if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
									var r = Object.create(null);
									if ((n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
										for (var o in e)
											n.d(
												r,
												o,
												function (t) {
													return e[t];
												}.bind(null, o)
											);
									return r;
								}),
								(n.n = function (e) {
									var t =
										e && e.__esModule
											? function () {
													return e.default;
												}
											: function () {
													return e;
												};
									return n.d(t, 'a', t), t;
								}),
								(n.o = function (e, t) {
									return Object.prototype.hasOwnProperty.call(e, t);
								}),
								(n.p = ''),
								n((n.s = 0))
							);
						})([
							function (e, t, n) {
								'use strict';
								n.r(t);
								var r,
									o = function (e, t) {
										var n = t.x - e.x,
											r = t.y - e.y;
										return Math.sqrt(n * n + r * r);
									},
									i = function (e) {
										return e * (Math.PI / 180);
									},
									s = new Map(),
									a = function (e) {
										s.has(e) && clearTimeout(s.get(e)), s.set(e, setTimeout(e, 100));
									},
									l = function (e, t, n) {
										for (var r, o = t.split(/[ ,]+/g), i = 0; i < o.length; i += 1)
											(r = o[i]), e.addEventListener ? e.addEventListener(r, n, !1) : e.attachEvent && e.attachEvent(r, n);
									},
									c = function (e, t, n) {
										for (var r, o = t.split(/[ ,]+/g), i = 0; i < o.length; i += 1)
											(r = o[i]), e.removeEventListener ? e.removeEventListener(r, n) : e.detachEvent && e.detachEvent(r, n);
									},
									u = function (e) {
										return e.preventDefault(), e.type.match(/^touch/) ? e.changedTouches : e;
									},
									d = function () {
										return {
											x:
												void 0 !== window.pageXOffset
													? window.pageXOffset
													: (document.documentElement || document.body.parentNode || document.body).scrollLeft,
											y:
												void 0 !== window.pageYOffset
													? window.pageYOffset
													: (document.documentElement || document.body.parentNode || document.body).scrollTop,
										};
									},
									f = function (e, t) {
										t.top || t.right || t.bottom || t.left
											? ((e.style.top = t.top), (e.style.right = t.right), (e.style.bottom = t.bottom), (e.style.left = t.left))
											: ((e.style.left = t.x + 'px'), (e.style.top = t.y + 'px'));
									},
									p = function (e, t, n) {
										var r = h(e);
										for (var o in r)
											if (r.hasOwnProperty(o))
												if ('string' == typeof t) r[o] = t + ' ' + n;
												else {
													for (var i = '', s = 0, a = t.length; s < a; s += 1) i += t[s] + ' ' + n + ', ';
													r[o] = i.slice(0, -2);
												}
										return r;
									},
									h = function (e) {
										var t = {};
										return (
											(t[e] = ''),
											['webkit', 'Moz', 'o'].forEach(function (n) {
												t[n + e.charAt(0).toUpperCase() + e.slice(1)] = '';
											}),
											t
										);
									},
									m = function (e, t) {
										for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
										return e;
									},
									y = function (e, t) {
										if (e.length) for (var n = 0, r = e.length; n < r; n += 1) t(e[n]);
										else t(e);
									},
									v = !!('ontouchstart' in window),
									g = !!window.PointerEvent,
									b = !!window.MSPointerEvent,
									w = { start: 'mousedown', move: 'mousemove', end: 'mouseup' },
									_ = {};
								function x() {}
								g
									? (r = { start: 'pointerdown', move: 'pointermove', end: 'pointerup, pointercancel' })
									: b
										? (r = { start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp' })
										: v
											? ((r = { start: 'touchstart', move: 'touchmove', end: 'touchend, touchcancel' }), (_ = w))
											: (r = w),
									(x.prototype.on = function (e, t) {
										var n,
											r = e.split(/[ ,]+/g);
										this._handlers_ = this._handlers_ || {};
										for (var o = 0; o < r.length; o += 1) (n = r[o]), (this._handlers_[n] = this._handlers_[n] || []), this._handlers_[n].push(t);
										return this;
									}),
									(x.prototype.off = function (e, t) {
										return (
											(this._handlers_ = this._handlers_ || {}),
											void 0 === e
												? (this._handlers_ = {})
												: void 0 === t
													? (this._handlers_[e] = null)
													: this._handlers_[e] && this._handlers_[e].indexOf(t) >= 0 && this._handlers_[e].splice(this._handlers_[e].indexOf(t), 1),
											this
										);
									}),
									(x.prototype.trigger = function (e, t) {
										var n,
											r = this,
											o = e.split(/[ ,]+/g);
										r._handlers_ = r._handlers_ || {};
										for (var i = 0; i < o.length; i += 1)
											(n = o[i]),
												r._handlers_[n] &&
													r._handlers_[n].length &&
													r._handlers_[n].forEach(function (e) {
														e.call(r, { type: n, target: r }, t);
													});
									}),
									(x.prototype.config = function (e) {
										(this.options = this.defaults || {}),
											e &&
												(this.options = (function (e, t) {
													var n = {};
													for (var r in e) e.hasOwnProperty(r) && t.hasOwnProperty(r) ? (n[r] = t[r]) : e.hasOwnProperty(r) && (n[r] = e[r]);
													return n;
												})(this.options, e));
									}),
									(x.prototype.bindEvt = function (e, t) {
										var n = this;
										return (
											(n._domHandlers_ = n._domHandlers_ || {}),
											(n._domHandlers_[t] = function () {
												'function' == typeof n['on' + t] ? n['on' + t].apply(n, arguments) : console.warn('[WARNING] : Missing "on' + t + '" handler.');
											}),
											l(e, r[t], n._domHandlers_[t]),
											_[t] && l(e, _[t], n._domHandlers_[t]),
											n
										);
									}),
									(x.prototype.unbindEvt = function (e, t) {
										return (
											(this._domHandlers_ = this._domHandlers_ || {}),
											c(e, r[t], this._domHandlers_[t]),
											_[t] && c(e, _[t], this._domHandlers_[t]),
											delete this._domHandlers_[t],
											this
										);
									});
								var k = x;
								function C(e, t) {
									return (
										(this.identifier = t.identifier),
										(this.position = t.position),
										(this.frontPosition = t.frontPosition),
										(this.collection = e),
										(this.defaults = {
											size: 100,
											threshold: 0.1,
											color: 'white',
											fadeTime: 250,
											dataOnly: !1,
											restJoystick: !0,
											restOpacity: 0.5,
											mode: 'dynamic',
											zone: document.body,
											lockX: !1,
											lockY: !1,
											shape: 'circle',
										}),
										this.config(t),
										'dynamic' === this.options.mode && (this.options.restOpacity = 0),
										(this.id = C.id),
										(C.id += 1),
										this.buildEl().stylize(),
										(this.instance = {
											el: this.ui.el,
											on: this.on.bind(this),
											off: this.off.bind(this),
											show: this.show.bind(this),
											hide: this.hide.bind(this),
											add: this.addToDom.bind(this),
											remove: this.removeFromDom.bind(this),
											destroy: this.destroy.bind(this),
											setPosition: this.setPosition.bind(this),
											resetDirection: this.resetDirection.bind(this),
											computeDirection: this.computeDirection.bind(this),
											trigger: this.trigger.bind(this),
											position: this.position,
											frontPosition: this.frontPosition,
											ui: this.ui,
											identifier: this.identifier,
											id: this.id,
											options: this.options,
										}),
										this.instance
									);
								}
								(C.prototype = new k()),
									(C.constructor = C),
									(C.id = 0),
									(C.prototype.buildEl = function (e) {
										return (
											(this.ui = {}),
											this.options.dataOnly ||
												((this.ui.el = document.createElement('div')),
												(this.ui.back = document.createElement('div')),
												(this.ui.front = document.createElement('div')),
												(this.ui.el.className = 'nipple collection_' + this.collection.id),
												(this.ui.back.className = 'back'),
												(this.ui.front.className = 'front'),
												this.ui.el.setAttribute('id', 'nipple_' + this.collection.id + '_' + this.id),
												this.ui.el.appendChild(this.ui.back),
												this.ui.el.appendChild(this.ui.front)),
											this
										);
									}),
									(C.prototype.stylize = function () {
										if (this.options.dataOnly) return this;
										var e = this.options.fadeTime + 'ms',
											t = (function (e, t) {
												var n = h('borderRadius');
												for (var r in n) n.hasOwnProperty(r) && (n[r] = '50%');
												return n;
											})(),
											n = p('transition', 'opacity', e),
											r = {};
										return (
											(r.el = { position: 'absolute', opacity: this.options.restOpacity, display: 'block', zIndex: 999 }),
											(r.back = {
												position: 'absolute',
												display: 'block',
												width: this.options.size + 'px',
												height: this.options.size + 'px',
												marginLeft: -this.options.size / 2 + 'px',
												marginTop: -this.options.size / 2 + 'px',
												background: this.options.color,
												opacity: '.5',
											}),
											(r.front = {
												width: this.options.size / 2 + 'px',
												height: this.options.size / 2 + 'px',
												position: 'absolute',
												display: 'block',
												marginLeft: -this.options.size / 4 + 'px',
												marginTop: -this.options.size / 4 + 'px',
												background: this.options.color,
												opacity: '.5',
											}),
											m(r.el, n),
											'circle' === this.options.shape && m(r.back, t),
											m(r.front, t),
											this.applyStyles(r),
											this
										);
									}),
									(C.prototype.applyStyles = function (e) {
										for (var t in this.ui) if (this.ui.hasOwnProperty(t)) for (var n in e[t]) this.ui[t].style[n] = e[t][n];
										return this;
									}),
									(C.prototype.addToDom = function () {
										return this.options.dataOnly || document.body.contains(this.ui.el) || this.options.zone.appendChild(this.ui.el), this;
									}),
									(C.prototype.removeFromDom = function () {
										return this.options.dataOnly || !document.body.contains(this.ui.el) || this.options.zone.removeChild(this.ui.el), this;
									}),
									(C.prototype.destroy = function () {
										clearTimeout(this.removeTimeout),
											clearTimeout(this.showTimeout),
											clearTimeout(this.restTimeout),
											this.trigger('destroyed', this.instance),
											this.removeFromDom(),
											this.off();
									}),
									(C.prototype.show = function (e) {
										var t = this;
										return (
											t.options.dataOnly ||
												(clearTimeout(t.removeTimeout),
												clearTimeout(t.showTimeout),
												clearTimeout(t.restTimeout),
												t.addToDom(),
												t.restCallback(),
												setTimeout(function () {
													t.ui.el.style.opacity = 1;
												}, 0),
												(t.showTimeout = setTimeout(function () {
													t.trigger('shown', t.instance), 'function' == typeof e && e.call(this);
												}, t.options.fadeTime))),
											t
										);
									}),
									(C.prototype.hide = function (e) {
										var t = this;
										if (t.options.dataOnly) return t;
										if (
											((t.ui.el.style.opacity = t.options.restOpacity),
											clearTimeout(t.removeTimeout),
											clearTimeout(t.showTimeout),
											clearTimeout(t.restTimeout),
											(t.removeTimeout = setTimeout(function () {
												var n = 'dynamic' === t.options.mode ? 'none' : 'block';
												(t.ui.el.style.display = n), 'function' == typeof e && e.call(t), t.trigger('hidden', t.instance);
											}, t.options.fadeTime)),
											t.options.restJoystick)
										) {
											var n = t.options.restJoystick,
												r = {};
											(r.x = !0 === n || !1 !== n.x ? 0 : t.instance.frontPosition.x),
												(r.y = !0 === n || !1 !== n.y ? 0 : t.instance.frontPosition.y),
												t.setPosition(e, r);
										}
										return t;
									}),
									(C.prototype.setPosition = function (e, t) {
										var n = this;
										n.frontPosition = { x: t.x, y: t.y };
										var r = n.options.fadeTime + 'ms',
											o = {};
										o.front = p('transition', ['top', 'left'], r);
										var i = { front: {} };
										(i.front = { left: n.frontPosition.x + 'px', top: n.frontPosition.y + 'px' }),
											n.applyStyles(o),
											n.applyStyles(i),
											(n.restTimeout = setTimeout(function () {
												'function' == typeof e && e.call(n), n.restCallback();
											}, n.options.fadeTime));
									}),
									(C.prototype.restCallback = function () {
										var e = {};
										(e.front = p('transition', 'none', '')), this.applyStyles(e), this.trigger('rested', this.instance);
									}),
									(C.prototype.resetDirection = function () {
										this.direction = { x: !1, y: !1, angle: !1 };
									}),
									(C.prototype.computeDirection = function (e) {
										var t,
											n,
											r,
											o = e.angle.radian,
											i = Math.PI / 4,
											s = Math.PI / 2;
										if (
											(o > i && o < 3 * i && !e.lockX
												? (t = 'up')
												: o > -i && o <= i && !e.lockY
													? (t = 'left')
													: o > 3 * -i && o <= -i && !e.lockX
														? (t = 'down')
														: e.lockY || (t = 'right'),
											e.lockY || (n = o > -s && o < s ? 'left' : 'right'),
											e.lockX || (r = o > 0 ? 'up' : 'down'),
											e.force > this.options.threshold)
										) {
											var a,
												l = {};
											for (a in this.direction) this.direction.hasOwnProperty(a) && (l[a] = this.direction[a]);
											var c = {};
											for (a in ((this.direction = { x: n, y: r, angle: t }), (e.direction = this.direction), l)) l[a] === this.direction[a] && (c[a] = !0);
											if (c.x && c.y && c.angle) return e;
											(c.x && c.y) || this.trigger('plain', e),
												c.x || this.trigger('plain:' + n, e),
												c.y || this.trigger('plain:' + r, e),
												c.angle || this.trigger('dir dir:' + t, e);
										} else this.resetDirection();
										return e;
									});
								var E = C;
								function j(e, t) {
									(this.nipples = []),
										(this.idles = []),
										(this.actives = []),
										(this.ids = []),
										(this.pressureIntervals = {}),
										(this.manager = e),
										(this.id = j.id),
										(j.id += 1),
										(this.defaults = {
											zone: document.body,
											multitouch: !1,
											maxNumberOfNipples: 10,
											mode: 'dynamic',
											position: { top: 0, left: 0 },
											catchDistance: 200,
											size: 100,
											threshold: 0.1,
											color: 'white',
											fadeTime: 250,
											dataOnly: !1,
											restJoystick: !0,
											restOpacity: 0.5,
											lockX: !1,
											lockY: !1,
											shape: 'circle',
											dynamicPage: !1,
											follow: !1,
										}),
										this.config(t),
										('static' !== this.options.mode && 'semi' !== this.options.mode) || (this.options.multitouch = !1),
										this.options.multitouch || (this.options.maxNumberOfNipples = 1);
									var n = getComputedStyle(this.options.zone.parentElement);
									return (
										n && 'flex' === n.display && (this.parentIsFlex = !0), this.updateBox(), this.prepareNipples(), this.bindings(), this.begin(), this.nipples
									);
								}
								(j.prototype = new k()),
									(j.constructor = j),
									(j.id = 0),
									(j.prototype.prepareNipples = function () {
										var e = this.nipples;
										(e.on = this.on.bind(this)),
											(e.off = this.off.bind(this)),
											(e.options = this.options),
											(e.destroy = this.destroy.bind(this)),
											(e.ids = this.ids),
											(e.id = this.id),
											(e.processOnMove = this.processOnMove.bind(this)),
											(e.processOnEnd = this.processOnEnd.bind(this)),
											(e.get = function (t) {
												if (void 0 === t) return e[0];
												for (var n = 0, r = e.length; n < r; n += 1) if (e[n].identifier === t) return e[n];
												return !1;
											});
									}),
									(j.prototype.bindings = function () {
										this.bindEvt(this.options.zone, 'start'), (this.options.zone.style.touchAction = 'none'), (this.options.zone.style.msTouchAction = 'none');
									}),
									(j.prototype.begin = function () {
										var e = this.options;
										if ('static' === e.mode) {
											var t = this.createNipple(e.position, this.manager.getIdentifier());
											t.add(), this.idles.push(t);
										}
									}),
									(j.prototype.createNipple = function (e, t) {
										var n = this.manager.scroll,
											r = {},
											o = this.options,
											i = this.parentIsFlex ? n.x : n.x + this.box.left,
											s = this.parentIsFlex ? n.y : n.y + this.box.top;
										if (e.x && e.y) r = { x: e.x - i, y: e.y - s };
										else if (e.top || e.right || e.bottom || e.left) {
											var a = document.createElement('DIV');
											(a.style.display = 'hidden'),
												(a.style.top = e.top),
												(a.style.right = e.right),
												(a.style.bottom = e.bottom),
												(a.style.left = e.left),
												(a.style.position = 'absolute'),
												o.zone.appendChild(a);
											var l = a.getBoundingClientRect();
											o.zone.removeChild(a), (r = e), (e = { x: l.left + n.x, y: l.top + n.y });
										}
										var c = new E(this, {
											color: o.color,
											size: o.size,
											threshold: o.threshold,
											fadeTime: o.fadeTime,
											dataOnly: o.dataOnly,
											restJoystick: o.restJoystick,
											restOpacity: o.restOpacity,
											mode: o.mode,
											identifier: t,
											position: e,
											zone: o.zone,
											frontPosition: { x: 0, y: 0 },
											shape: o.shape,
										});
										return (
											o.dataOnly || (f(c.ui.el, r), f(c.ui.front, c.frontPosition)),
											this.nipples.push(c),
											this.trigger('added ' + c.identifier + ':added', c),
											this.manager.trigger('added ' + c.identifier + ':added', c),
											this.bindNipple(c),
											c
										);
									}),
									(j.prototype.updateBox = function () {
										this.box = this.options.zone.getBoundingClientRect();
									}),
									(j.prototype.bindNipple = function (e) {
										var t,
											n = this,
											r = function (e, r) {
												(t = e.type + ' ' + r.id + ':' + e.type), n.trigger(t, r);
											};
										e.on('destroyed', n.onDestroyed.bind(n)),
											e.on('shown hidden rested dir plain', r),
											e.on('dir:up dir:right dir:down dir:left', r),
											e.on('plain:up plain:right plain:down plain:left', r);
									}),
									(j.prototype.pressureFn = function (e, t, n) {
										var r = this,
											o = 0;
										clearInterval(r.pressureIntervals[n]),
											(r.pressureIntervals[n] = setInterval(
												function () {
													var n = e.force || e.pressure || e.webkitForce || 0;
													n !== o && (t.trigger('pressure', n), r.trigger('pressure ' + t.identifier + ':pressure', n), (o = n));
												}.bind(r),
												100
											));
									}),
									(j.prototype.onstart = function (e) {
										var t = this,
											n = t.options,
											r = e;
										return (
											(e = u(e)),
											t.updateBox(),
											y(e, function (o) {
												t.actives.length < n.maxNumberOfNipples
													? t.processOnStart(o)
													: r.type.match(/^touch/) &&
														(Object.keys(t.manager.ids).forEach(function (n) {
															if (
																Object.values(r.touches).findIndex(function (e) {
																	return e.identifier === n;
																}) < 0
															) {
																var o = [e[0]];
																(o.identifier = n), t.processOnEnd(o);
															}
														}),
														t.actives.length < n.maxNumberOfNipples && t.processOnStart(o));
											}),
											t.manager.bindDocument(),
											!1
										);
									}),
									(j.prototype.processOnStart = function (e) {
										var t,
											n = this,
											r = n.options,
											i = n.manager.getIdentifier(e),
											s = e.force || e.pressure || e.webkitForce || 0,
											a = { x: e.pageX, y: e.pageY },
											l = n.getOrCreate(i, a);
										l.identifier !== i && n.manager.removeIdentifier(l.identifier), (l.identifier = i);
										var c = function (t) {
											t.trigger('start', t),
												n.trigger('start ' + t.id + ':start', t),
												t.show(),
												s > 0 && n.pressureFn(e, t, t.identifier),
												n.processOnMove(e);
										};
										if (((t = n.idles.indexOf(l)) >= 0 && n.idles.splice(t, 1), n.actives.push(l), n.ids.push(l.identifier), 'semi' !== r.mode)) c(l);
										else {
											if (!(o(a, l.position) <= r.catchDistance)) return l.destroy(), void n.processOnStart(e);
											c(l);
										}
										return l;
									}),
									(j.prototype.getOrCreate = function (e, t) {
										var n,
											r = this.options;
										return /(semi|static)/.test(r.mode)
											? (n = this.idles[0])
												? (this.idles.splice(0, 1), n)
												: 'semi' === r.mode
													? this.createNipple(t, e)
													: (console.warn("Coudln't find the needed nipple."), !1)
											: (n = this.createNipple(t, e));
									}),
									(j.prototype.processOnMove = function (e) {
										var t = this.options,
											n = this.manager.getIdentifier(e),
											r = this.nipples.get(n),
											s = this.manager.scroll;
										if (
											(function (e) {
												return isNaN(e.buttons) ? 0 !== e.pressure : 0 !== e.buttons;
											})(e)
										) {
											if (!r) return console.error('Found zombie joystick with ID ' + n), void this.manager.removeIdentifier(n);
											if (t.dynamicPage) {
												var a = r.el.getBoundingClientRect();
												r.position = { x: s.x + a.left, y: s.y + a.top };
											}
											r.identifier = n;
											var l = r.options.size / 2,
												c = { x: e.pageX, y: e.pageY };
											t.lockX && (c.y = r.position.y), t.lockY && (c.x = r.position.x);
											var u,
												d,
												p,
												h,
												m,
												y,
												v,
												g,
												b,
												w,
												_ = o(c, r.position),
												x =
													((u = c),
													(p = (d = r.position).x - u.x),
													(h = d.y - u.y),
													(function (e) {
														return e * (180 / Math.PI);
													})(Math.atan2(h, p))),
												k = i(x),
												C = _ / l,
												E = { distance: _, position: c };
											if (
												('circle' === r.options.shape
													? ((m = Math.min(_, l)),
														(v = r.position),
														(g = m),
														(w = { x: 0, y: 0 }),
														(b = i((b = x))),
														(w.x = v.x - g * Math.cos(b)),
														(w.y = v.y - g * Math.sin(b)),
														(y = w))
													: ((y = (function (e, t, n) {
															return { x: Math.min(Math.max(e.x, t.x - n), t.x + n), y: Math.min(Math.max(e.y, t.y - n), t.y + n) };
														})(c, r.position, l)),
														(m = o(y, r.position))),
												t.follow)
											) {
												if (_ > l) {
													var j = c.x - y.x,
														S = c.y - y.y;
													(r.position.x += j),
														(r.position.y += S),
														(r.el.style.top = r.position.y - (this.box.top + s.y) + 'px'),
														(r.el.style.left = r.position.x - (this.box.left + s.x) + 'px'),
														(_ = o(c, r.position));
												}
											} else (c = y), (_ = m);
											var D = c.x - r.position.x,
												O = c.y - r.position.y;
											(r.frontPosition = { x: D, y: O }), t.dataOnly || f(r.ui.front, r.frontPosition);
											var P = {
												identifier: r.identifier,
												position: c,
												force: C,
												pressure: e.force || e.pressure || e.webkitForce || 0,
												distance: _,
												angle: { radian: k, degree: x },
												vector: { x: D / l, y: -O / l },
												raw: E,
												instance: r,
												lockX: t.lockX,
												lockY: t.lockY,
											};
											((P = r.computeDirection(P)).angle = { radian: i(180 - x), degree: 180 - x }),
												r.trigger('move', P),
												this.trigger('move ' + r.id + ':move', P);
										} else this.processOnEnd(e);
									}),
									(j.prototype.processOnEnd = function (e) {
										var t = this,
											n = t.options,
											r = t.manager.getIdentifier(e),
											o = t.nipples.get(r),
											i = t.manager.removeIdentifier(o.identifier);
										o &&
											(n.dataOnly ||
												o.hide(function () {
													'dynamic' === n.mode &&
														(o.trigger('removed', o),
														t.trigger('removed ' + o.id + ':removed', o),
														t.manager.trigger('removed ' + o.id + ':removed', o),
														o.destroy());
												}),
											clearInterval(t.pressureIntervals[o.identifier]),
											o.resetDirection(),
											o.trigger('end', o),
											t.trigger('end ' + o.id + ':end', o),
											t.ids.indexOf(o.identifier) >= 0 && t.ids.splice(t.ids.indexOf(o.identifier), 1),
											t.actives.indexOf(o) >= 0 && t.actives.splice(t.actives.indexOf(o), 1),
											/(semi|static)/.test(n.mode) ? t.idles.push(o) : t.nipples.indexOf(o) >= 0 && t.nipples.splice(t.nipples.indexOf(o), 1),
											t.manager.unbindDocument(),
											/(semi|static)/.test(n.mode) && (t.manager.ids[i.id] = i.identifier));
									}),
									(j.prototype.onDestroyed = function (e, t) {
										this.nipples.indexOf(t) >= 0 && this.nipples.splice(this.nipples.indexOf(t), 1),
											this.actives.indexOf(t) >= 0 && this.actives.splice(this.actives.indexOf(t), 1),
											this.idles.indexOf(t) >= 0 && this.idles.splice(this.idles.indexOf(t), 1),
											this.ids.indexOf(t.identifier) >= 0 && this.ids.splice(this.ids.indexOf(t.identifier), 1),
											this.manager.removeIdentifier(t.identifier),
											this.manager.unbindDocument();
									}),
									(j.prototype.destroy = function () {
										for (var e in (this.unbindEvt(this.options.zone, 'start'),
										this.nipples.forEach(function (e) {
											e.destroy();
										}),
										this.pressureIntervals))
											this.pressureIntervals.hasOwnProperty(e) && clearInterval(this.pressureIntervals[e]);
										this.trigger('destroyed', this.nipples), this.manager.unbindDocument(), this.off();
									});
								var S = j;
								function D(e) {
									var t = this;
									(t.ids = {}), (t.index = 0), (t.collections = []), (t.scroll = d()), t.config(e), t.prepareCollections();
									var n = function () {
										var e;
										t.collections.forEach(function (n) {
											n.forEach(function (n) {
												(e = n.el.getBoundingClientRect()), (n.position = { x: t.scroll.x + e.left, y: t.scroll.y + e.top });
											});
										});
									};
									l(window, 'resize', function () {
										a(n);
									});
									var r = function () {
										t.scroll = d();
									};
									return (
										l(window, 'scroll', function () {
											a(r);
										}),
										t.collections
									);
								}
								(D.prototype = new k()),
									(D.constructor = D),
									(D.prototype.prepareCollections = function () {
										var e = this;
										(e.collections.create = e.create.bind(e)),
											(e.collections.on = e.on.bind(e)),
											(e.collections.off = e.off.bind(e)),
											(e.collections.destroy = e.destroy.bind(e)),
											(e.collections.get = function (t) {
												var n;
												return (
													e.collections.every(function (e) {
														return !(n = e.get(t));
													}),
													n
												);
											});
									}),
									(D.prototype.create = function (e) {
										return this.createCollection(e);
									}),
									(D.prototype.createCollection = function (e) {
										var t = new S(this, e);
										return this.bindCollection(t), this.collections.push(t), t;
									}),
									(D.prototype.bindCollection = function (e) {
										var t,
											n = this,
											r = function (e, r) {
												(t = e.type + ' ' + r.id + ':' + e.type), n.trigger(t, r);
											};
										e.on('destroyed', n.onDestroyed.bind(n)),
											e.on('shown hidden rested dir plain', r),
											e.on('dir:up dir:right dir:down dir:left', r),
											e.on('plain:up plain:right plain:down plain:left', r);
									}),
									(D.prototype.bindDocument = function () {
										this.binded || (this.bindEvt(document, 'move').bindEvt(document, 'end'), (this.binded = !0));
									}),
									(D.prototype.unbindDocument = function (e) {
										(Object.keys(this.ids).length && !0 !== e) || (this.unbindEvt(document, 'move').unbindEvt(document, 'end'), (this.binded = !1));
									}),
									(D.prototype.getIdentifier = function (e) {
										var t;
										return (
											e ? void 0 === (t = void 0 === e.identifier ? e.pointerId : e.identifier) && (t = this.latest || 0) : (t = this.index),
											void 0 === this.ids[t] && ((this.ids[t] = this.index), (this.index += 1)),
											(this.latest = t),
											this.ids[t]
										);
									}),
									(D.prototype.removeIdentifier = function (e) {
										var t = {};
										for (var n in this.ids)
											if (this.ids[n] === e) {
												(t.id = n), (t.identifier = this.ids[n]), delete this.ids[n];
												break;
											}
										return t;
									}),
									(D.prototype.onmove = function (e) {
										return this.onAny('move', e), !1;
									}),
									(D.prototype.onend = function (e) {
										return this.onAny('end', e), !1;
									}),
									(D.prototype.oncancel = function (e) {
										return this.onAny('end', e), !1;
									}),
									(D.prototype.onAny = function (e, t) {
										var n,
											r = this,
											o = 'processOn' + e.charAt(0).toUpperCase() + e.slice(1);
										return (
											(t = u(t)),
											y(t, function (e) {
												(n = r.getIdentifier(e)),
													y(
														r.collections,
														function (e, t, n) {
															n.ids.indexOf(t) >= 0 && (n[o](e), (e._found_ = !0));
														}.bind(null, e, n)
													),
													e._found_ || r.removeIdentifier(n);
											}),
											!1
										);
									}),
									(D.prototype.destroy = function () {
										this.unbindDocument(!0),
											(this.ids = {}),
											(this.index = 0),
											this.collections.forEach(function (e) {
												e.destroy();
											}),
											this.off();
									}),
									(D.prototype.onDestroyed = function (e, t) {
										if (this.collections.indexOf(t) < 0) return !1;
										this.collections.splice(this.collections.indexOf(t), 1);
									});
								var O = new D();
								t.default = {
									create: function (e) {
										return O.create(e);
									},
									factory: O,
								};
							},
						]).default;
					}),
					'object' == typeof n && 'object' == typeof t
						? (t.exports = o())
						: 'function' == typeof define && define.amd
							? define('nipplejs', [], o)
							: 'object' == typeof n
								? (n.nipplejs = o())
								: (r.nipplejs = o());
			},
			{},
		],
		15: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 });
				/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
				var r,
					o = function () {
						return (
							(o =
								Object.assign ||
								function (e) {
									for (var t, n = 1, r = arguments.length; n < r; n++)
										for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
									return e;
								}),
							o.apply(this, arguments)
						);
					},
					i = (function () {
						function e(e) {
							(this.options = e), (this.listeners = {});
						}
						return (
							(e.prototype.on = function (e, t) {
								var n = this.listeners[e] || [];
								this.listeners[e] = n.concat([t]);
							}),
							(e.prototype.triggerEvent = function (e, t) {
								var n = this;
								(this.listeners[e] || []).forEach(function (e) {
									return e({ target: n, event: t });
								});
							}),
							e
						);
					})();
				((r = n.NotyfArrayEvent || (n.NotyfArrayEvent = {}))[(r.Add = 0)] = 'Add'), (r[(r.Remove = 1)] = 'Remove');
				var s,
					a = (function () {
						function e() {
							this.notifications = [];
						}
						return (
							(e.prototype.push = function (e) {
								this.notifications.push(e), this.updateFn(e, n.NotyfArrayEvent.Add, this.notifications);
							}),
							(e.prototype.splice = function (e, t) {
								var r = this.notifications.splice(e, t)[0];
								return this.updateFn(r, n.NotyfArrayEvent.Remove, this.notifications), r;
							}),
							(e.prototype.indexOf = function (e) {
								return this.notifications.indexOf(e);
							}),
							(e.prototype.onUpdate = function (e) {
								this.updateFn = e;
							}),
							e
						);
					})();
				((s = n.NotyfEvent || (n.NotyfEvent = {})).Dismiss = 'dismiss'), (s.Click = 'click');
				var l = {
						types: [
							{ type: 'success', className: 'notyf__toast--success', backgroundColor: '#3dc763', icon: { className: 'notyf__icon--success', tagName: 'i' } },
							{ type: 'error', className: 'notyf__toast--error', backgroundColor: '#ed3d3d', icon: { className: 'notyf__icon--error', tagName: 'i' } },
						],
						duration: 2e3,
						ripple: !0,
						position: { x: 'right', y: 'bottom' },
						dismissible: !1,
					},
					c = (function () {
						function e() {
							(this.notifications = []),
								(this.events = {}),
								(this.X_POSITION_FLEX_MAP = { left: 'flex-start', center: 'center', right: 'flex-end' }),
								(this.Y_POSITION_FLEX_MAP = { top: 'flex-start', center: 'center', bottom: 'flex-end' });
							var e = document.createDocumentFragment(),
								t = this._createHTMLElement({ tagName: 'div', className: 'notyf' });
							e.appendChild(t),
								document.body.appendChild(e),
								(this.container = t),
								(this.animationEndEventName = this._getAnimationEndEventName()),
								this._createA11yContainer();
						}
						return (
							(e.prototype.on = function (e, t) {
								var n;
								this.events = o(o({}, this.events), (((n = {})[e] = t), n));
							}),
							(e.prototype.update = function (e, t) {
								t === n.NotyfArrayEvent.Add ? this.addNotification(e) : t === n.NotyfArrayEvent.Remove && this.removeNotification(e);
							}),
							(e.prototype.removeNotification = function (e) {
								var t,
									n,
									r = this,
									o = this._popRenderedNotification(e);
								o &&
									((t = o.node).classList.add('notyf__toast--disappear'),
									t.addEventListener(
										this.animationEndEventName,
										(n = function (e) {
											e.target === t && (t.removeEventListener(r.animationEndEventName, n), r.container.removeChild(t));
										})
									));
							}),
							(e.prototype.addNotification = function (e) {
								var t = this._renderNotification(e);
								this.notifications.push({ notification: e, node: t }), this._announce(e.options.message || 'Notification');
							}),
							(e.prototype._renderNotification = function (e) {
								var t,
									n = this._buildNotificationCard(e),
									r = e.options.className;
								return r && (t = n.classList).add.apply(t, r.split(' ')), this.container.appendChild(n), n;
							}),
							(e.prototype._popRenderedNotification = function (e) {
								for (var t = -1, n = 0; n < this.notifications.length && t < 0; n++) this.notifications[n].notification === e && (t = n);
								if (-1 !== t) return this.notifications.splice(t, 1)[0];
							}),
							(e.prototype.getXPosition = function (e) {
								var t;
								return (null === (t = null == e ? void 0 : e.position) || void 0 === t ? void 0 : t.x) || 'right';
							}),
							(e.prototype.getYPosition = function (e) {
								var t;
								return (null === (t = null == e ? void 0 : e.position) || void 0 === t ? void 0 : t.y) || 'bottom';
							}),
							(e.prototype.adjustContainerAlignment = function (e) {
								var t = this.X_POSITION_FLEX_MAP[this.getXPosition(e)],
									n = this.Y_POSITION_FLEX_MAP[this.getYPosition(e)],
									r = this.container.style;
								r.setProperty('justify-content', n), r.setProperty('align-items', t);
							}),
							(e.prototype._buildNotificationCard = function (e) {
								var t = this,
									r = e.options,
									o = r.icon;
								this.adjustContainerAlignment(r);
								var i = this._createHTMLElement({ tagName: 'div', className: 'notyf__toast' }),
									s = this._createHTMLElement({ tagName: 'div', className: 'notyf__ripple' }),
									a = this._createHTMLElement({ tagName: 'div', className: 'notyf__wrapper' }),
									l = this._createHTMLElement({ tagName: 'div', className: 'notyf__message' });
								l.innerHTML = r.message || '';
								var c = r.background || r.backgroundColor;
								if (o) {
									var u = this._createHTMLElement({ tagName: 'div', className: 'notyf__icon' });
									if ((('string' == typeof o || o instanceof String) && (u.innerHTML = new String(o).valueOf()), 'object' == typeof o)) {
										var d = o.tagName,
											f = void 0 === d ? 'i' : d,
											p = o.className,
											h = o.text,
											m = o.color,
											y = void 0 === m ? c : m,
											v = this._createHTMLElement({ tagName: f, className: p, text: h });
										y && (v.style.color = y), u.appendChild(v);
									}
									a.appendChild(u);
								}
								if (
									(a.appendChild(l), i.appendChild(a), c && (r.ripple ? ((s.style.background = c), i.appendChild(s)) : (i.style.background = c)), r.dismissible)
								) {
									var g = this._createHTMLElement({ tagName: 'div', className: 'notyf__dismiss' }),
										b = this._createHTMLElement({ tagName: 'button', className: 'notyf__dismiss-btn' });
									g.appendChild(b),
										a.appendChild(g),
										i.classList.add('notyf__toast--dismissible'),
										b.addEventListener('click', function (r) {
											var o, i;
											null === (i = (o = t.events)[n.NotyfEvent.Dismiss]) || void 0 === i || i.call(o, { target: e, event: r }), r.stopPropagation();
										});
								}
								i.addEventListener('click', function (r) {
									var o, i;
									return null === (i = (o = t.events)[n.NotyfEvent.Click]) || void 0 === i ? void 0 : i.call(o, { target: e, event: r });
								});
								var w = 'top' === this.getYPosition(r) ? 'upper' : 'lower';
								return i.classList.add('notyf__toast--' + w), i;
							}),
							(e.prototype._createHTMLElement = function (e) {
								var t = e.tagName,
									n = e.className,
									r = e.text,
									o = document.createElement(t);
								return n && (o.className = n), (o.textContent = r || null), o;
							}),
							(e.prototype._createA11yContainer = function () {
								var e = this._createHTMLElement({ tagName: 'div', className: 'notyf-announcer' });
								e.setAttribute('aria-atomic', 'true'),
									e.setAttribute('aria-live', 'polite'),
									(e.style.border = '0'),
									(e.style.clip = 'rect(0 0 0 0)'),
									(e.style.height = '1px'),
									(e.style.margin = '-1px'),
									(e.style.overflow = 'hidden'),
									(e.style.padding = '0'),
									(e.style.position = 'absolute'),
									(e.style.width = '1px'),
									(e.style.outline = '0'),
									document.body.appendChild(e),
									(this.a11yContainer = e);
							}),
							(e.prototype._announce = function (e) {
								var t = this;
								(this.a11yContainer.textContent = ''),
									setTimeout(function () {
										t.a11yContainer.textContent = e;
									}, 100);
							}),
							(e.prototype._getAnimationEndEventName = function () {
								var e,
									t = document.createElement('_fake'),
									n = { MozTransition: 'animationend', OTransition: 'oAnimationEnd', WebkitTransition: 'webkitAnimationEnd', transition: 'animationend' };
								for (e in n) if (void 0 !== t.style[e]) return n[e];
								return 'animationend';
							}),
							e
						);
					})(),
					u = (function () {
						function e(e) {
							var t = this;
							(this.dismiss = this._removeNotification), (this.notifications = new a()), (this.view = new c());
							var r = this.registerTypes(e);
							(this.options = o(o({}, l), e)),
								(this.options.types = r),
								this.notifications.onUpdate(function (e, n) {
									return t.view.update(e, n);
								}),
								this.view.on(n.NotyfEvent.Dismiss, function (e) {
									var r = e.target,
										o = e.event;
									t._removeNotification(r), r.triggerEvent(n.NotyfEvent.Dismiss, o);
								}),
								this.view.on(n.NotyfEvent.Click, function (e) {
									var t = e.target,
										r = e.event;
									return t.triggerEvent(n.NotyfEvent.Click, r);
								});
						}
						return (
							(e.prototype.error = function (e) {
								var t = this.normalizeOptions('error', e);
								return this.open(t);
							}),
							(e.prototype.success = function (e) {
								var t = this.normalizeOptions('success', e);
								return this.open(t);
							}),
							(e.prototype.open = function (e) {
								var t =
										this.options.types.find(function (t) {
											return t.type === e.type;
										}) || {},
									n = o(o({}, t), e);
								this.assignProps(['ripple', 'position', 'dismissible'], n);
								var r = new i(n);
								return this._pushNotification(r), r;
							}),
							(e.prototype.dismissAll = function () {
								for (; this.notifications.splice(0, 1); );
							}),
							(e.prototype.assignProps = function (e, t) {
								var n = this;
								e.forEach(function (e) {
									t[e] = null == t[e] ? n.options[e] : t[e];
								});
							}),
							(e.prototype._pushNotification = function (e) {
								var t = this;
								this.notifications.push(e);
								var n = void 0 !== e.options.duration ? e.options.duration : this.options.duration;
								n &&
									setTimeout(function () {
										return t._removeNotification(e);
									}, n);
							}),
							(e.prototype._removeNotification = function (e) {
								var t = this.notifications.indexOf(e);
								-1 !== t && this.notifications.splice(t, 1);
							}),
							(e.prototype.normalizeOptions = function (e, t) {
								var n = { type: e };
								return 'string' == typeof t ? (n.message = t) : 'object' == typeof t && (n = o(o({}, n), t)), n;
							}),
							(e.prototype.registerTypes = function (e) {
								var t = ((e && e.types) || []).slice();
								return l.types
									.map(function (e) {
										var n = -1;
										t.forEach(function (t, r) {
											t.type === e.type && (n = r);
										});
										var r = -1 !== n ? t.splice(n, 1)[0] : {};
										return o(o({}, e), r);
									})
									.concat(t);
							}),
							e
						);
					})();
				(n.DEFAULT_OPTIONS = l), (n.Notyf = u), (n.NotyfArray = a), (n.NotyfNotification = i), (n.NotyfView = c);
			},
			{},
		],
		16: [
			function (e, t, n) {
				var r;
				(r = function () {
					return (function () {
						var e = {
								9662: function (e, t, n) {
									var r = n(614),
										o = n(6330),
										i = TypeError;
									e.exports = function (e) {
										if (r(e)) return e;
										throw i(o(e) + ' is not a function');
									};
								},
								9483: function (e, t, n) {
									var r = n(4411),
										o = n(6330),
										i = TypeError;
									e.exports = function (e) {
										if (r(e)) return e;
										throw i(o(e) + ' is not a constructor');
									};
								},
								6077: function (e, t, n) {
									var r = n(614),
										o = String,
										i = TypeError;
									e.exports = function (e) {
										if ('object' == typeof e || r(e)) return e;
										throw i("Can't set " + o(e) + ' as a prototype');
									};
								},
								1223: function (e, t, n) {
									var r = n(5112),
										o = n(30),
										i = n(3070).f,
										s = r('unscopables'),
										a = Array.prototype;
									null == a[s] && i(a, s, { configurable: !0, value: o(null) }),
										(e.exports = function (e) {
											a[s][e] = !0;
										});
								},
								1530: function (e, t, n) {
									'use strict';
									var r = n(8710).charAt;
									e.exports = function (e, t, n) {
										return t + (n ? r(e, t).length : 1);
									};
								},
								9670: function (e, t, n) {
									var r = n(111),
										o = String,
										i = TypeError;
									e.exports = function (e) {
										if (r(e)) return e;
										throw i(o(e) + ' is not an object');
									};
								},
								8533: function (e, t, n) {
									'use strict';
									var r = n(2092).forEach,
										o = n(9341)('forEach');
									e.exports = o
										? [].forEach
										: function (e) {
												return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
											};
								},
								8457: function (e, t, n) {
									'use strict';
									var r = n(9974),
										o = n(6916),
										i = n(7908),
										s = n(3411),
										a = n(7659),
										l = n(4411),
										c = n(6244),
										u = n(6135),
										d = n(8554),
										f = n(1246),
										p = Array;
									e.exports = function (e) {
										var t = i(e),
											n = l(this),
											h = arguments.length,
											m = h > 1 ? arguments[1] : void 0,
											y = void 0 !== m;
										y && (m = r(m, h > 2 ? arguments[2] : void 0));
										var v,
											g,
											b,
											w,
											_,
											x,
											k = f(t),
											C = 0;
										if (!k || (this === p && a(k))) for (v = c(t), g = n ? new this(v) : p(v); v > C; C++) (x = y ? m(t[C], C) : t[C]), u(g, C, x);
										else
											for (_ = (w = d(t, k)).next, g = n ? new this() : []; !(b = o(_, w)).done; C++)
												(x = y ? s(w, m, [b.value, C], !0) : b.value), u(g, C, x);
										return (g.length = C), g;
									};
								},
								1318: function (e, t, n) {
									var r = n(5656),
										o = n(1400),
										i = n(6244),
										s = function (e) {
											return function (t, n, s) {
												var a,
													l = r(t),
													c = i(l),
													u = o(s, c);
												if (e && n != n) {
													for (; c > u; ) if ((a = l[u++]) != a) return !0;
												} else for (; c > u; u++) if ((e || u in l) && l[u] === n) return e || u || 0;
												return !e && -1;
											};
										};
									e.exports = { includes: s(!0), indexOf: s(!1) };
								},
								2092: function (e, t, n) {
									var r = n(9974),
										o = n(1702),
										i = n(8361),
										s = n(7908),
										a = n(6244),
										l = n(5417),
										c = o([].push),
										u = function (e) {
											var t = 1 == e,
												n = 2 == e,
												o = 3 == e,
												u = 4 == e,
												d = 6 == e,
												f = 7 == e,
												p = 5 == e || d;
											return function (h, m, y, v) {
												for (
													var g, b, w = s(h), _ = i(w), x = r(m, y), k = a(_), C = 0, E = v || l, j = t ? E(h, k) : n || f ? E(h, 0) : void 0;
													k > C;
													C++
												)
													if ((p || C in _) && ((b = x((g = _[C]), C, w)), e))
														if (t) j[C] = b;
														else if (b)
															switch (e) {
																case 3:
																	return !0;
																case 5:
																	return g;
																case 6:
																	return C;
																case 2:
																	c(j, g);
															}
														else
															switch (e) {
																case 4:
																	return !1;
																case 7:
																	c(j, g);
															}
												return d ? -1 : o || u ? u : j;
											};
										};
									e.exports = { forEach: u(0), map: u(1), filter: u(2), some: u(3), every: u(4), find: u(5), findIndex: u(6), filterReject: u(7) };
								},
								1194: function (e, t, n) {
									var r = n(7293),
										o = n(5112),
										i = n(7392),
										s = o('species');
									e.exports = function (e) {
										return (
											i >= 51 ||
											!r(function () {
												var t = [];
												return (
													((t.constructor = {})[s] = function () {
														return { foo: 1 };
													}),
													1 !== t[e](Boolean).foo
												);
											})
										);
									};
								},
								9341: function (e, t, n) {
									'use strict';
									var r = n(7293);
									e.exports = function (e, t) {
										var n = [][e];
										return (
											!!n &&
											r(function () {
												n.call(
													null,
													t ||
														function () {
															return 1;
														},
													1
												);
											})
										);
									};
								},
								3671: function (e, t, n) {
									var r = n(9662),
										o = n(7908),
										i = n(8361),
										s = n(6244),
										a = TypeError,
										l = function (e) {
											return function (t, n, l, c) {
												r(n);
												var u = o(t),
													d = i(u),
													f = s(u),
													p = e ? f - 1 : 0,
													h = e ? -1 : 1;
												if (l < 2)
													for (;;) {
														if (p in d) {
															(c = d[p]), (p += h);
															break;
														}
														if (((p += h), e ? p < 0 : f <= p)) throw a('Reduce of empty array with no initial value');
													}
												for (; e ? p >= 0 : f > p; p += h) p in d && (c = n(c, d[p], p, u));
												return c;
											};
										};
									e.exports = { left: l(!1), right: l(!0) };
								},
								1589: function (e, t, n) {
									var r = n(1400),
										o = n(6244),
										i = n(6135),
										s = Array,
										a = Math.max;
									e.exports = function (e, t, n) {
										for (var l = o(e), c = r(t, l), u = r(void 0 === n ? l : n, l), d = s(a(u - c, 0)), f = 0; c < u; c++, f++) i(d, f, e[c]);
										return (d.length = f), d;
									};
								},
								206: function (e, t, n) {
									var r = n(1702);
									e.exports = r([].slice);
								},
								4362: function (e, t, n) {
									var r = n(1589),
										o = Math.floor,
										i = function (e, t) {
											var n = e.length,
												l = o(n / 2);
											return n < 8 ? s(e, t) : a(e, i(r(e, 0, l), t), i(r(e, l), t), t);
										},
										s = function (e, t) {
											for (var n, r, o = e.length, i = 1; i < o; ) {
												for (r = i, n = e[i]; r && t(e[r - 1], n) > 0; ) e[r] = e[--r];
												r !== i++ && (e[r] = n);
											}
											return e;
										},
										a = function (e, t, n, r) {
											for (var o = t.length, i = n.length, s = 0, a = 0; s < o || a < i; )
												e[s + a] = s < o && a < i ? (r(t[s], n[a]) <= 0 ? t[s++] : n[a++]) : s < o ? t[s++] : n[a++];
											return e;
										};
									e.exports = i;
								},
								7475: function (e, t, n) {
									var r = n(3157),
										o = n(4411),
										i = n(111),
										s = n(5112)('species'),
										a = Array;
									e.exports = function (e) {
										var t;
										return (
											r(e) && ((t = e.constructor), ((o(t) && (t === a || r(t.prototype))) || (i(t) && null === (t = t[s]))) && (t = void 0)),
											void 0 === t ? a : t
										);
									};
								},
								5417: function (e, t, n) {
									var r = n(7475);
									e.exports = function (e, t) {
										return new (r(e))(0 === t ? 0 : t);
									};
								},
								3411: function (e, t, n) {
									var r = n(9670),
										o = n(9212);
									e.exports = function (e, t, n, i) {
										try {
											return i ? t(r(n)[0], n[1]) : t(n);
										} catch (t) {
											o(e, 'throw', t);
										}
									};
								},
								7072: function (e, t, n) {
									var r = n(5112)('iterator'),
										o = !1;
									try {
										var i = 0,
											s = {
												next: function () {
													return { done: !!i++ };
												},
												return: function () {
													o = !0;
												},
											};
										(s[r] = function () {
											return this;
										}),
											Array.from(s, function () {
												throw 2;
											});
									} catch (e) {}
									e.exports = function (e, t) {
										if (!t && !o) return !1;
										var n = !1;
										try {
											var i = {};
											(i[r] = function () {
												return {
													next: function () {
														return { done: (n = !0) };
													},
												};
											}),
												e(i);
										} catch (e) {}
										return n;
									};
								},
								4326: function (e, t, n) {
									var r = n(1702),
										o = r({}.toString),
										i = r(''.slice);
									e.exports = function (e) {
										return i(o(e), 8, -1);
									};
								},
								648: function (e, t, n) {
									var r = n(1694),
										o = n(614),
										i = n(4326),
										s = n(5112)('toStringTag'),
										a = Object,
										l =
											'Arguments' ==
											i(
												(function () {
													return arguments;
												})()
											);
									e.exports = r
										? i
										: function (e) {
												var t, n, r;
												return void 0 === e
													? 'Undefined'
													: null === e
														? 'Null'
														: 'string' ==
															  typeof (n = (function (e, t) {
																	try {
																		return e[t];
																	} catch (e) {}
															  })((t = a(e)), s))
															? n
															: l
																? i(t)
																: 'Object' == (r = i(t)) && o(t.callee)
																	? 'Arguments'
																	: r;
											};
								},
								9920: function (e, t, n) {
									var r = n(2597),
										o = n(3887),
										i = n(1236),
										s = n(3070);
									e.exports = function (e, t, n) {
										for (var a = o(t), l = s.f, c = i.f, u = 0; u < a.length; u++) {
											var d = a[u];
											r(e, d) || (n && r(n, d)) || l(e, d, c(t, d));
										}
									};
								},
								4964: function (e, t, n) {
									var r = n(5112)('match');
									e.exports = function (e) {
										var t = /./;
										try {
											'/./'[e](t);
										} catch (n) {
											try {
												return (t[r] = !1), '/./'[e](t);
											} catch (e) {}
										}
										return !1;
									};
								},
								8544: function (e, t, n) {
									var r = n(7293);
									e.exports = !r(function () {
										function e() {}
										return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
									});
								},
								4994: function (e, t, n) {
									'use strict';
									var r = n(3383).IteratorPrototype,
										o = n(30),
										i = n(9114),
										s = n(8003),
										a = n(7497),
										l = function () {
											return this;
										};
									e.exports = function (e, t, n, c) {
										var u = t + ' Iterator';
										return (e.prototype = o(r, { next: i(+!c, n) })), s(e, u, !1, !0), (a[u] = l), e;
									};
								},
								8880: function (e, t, n) {
									var r = n(9781),
										o = n(3070),
										i = n(9114);
									e.exports = r
										? function (e, t, n) {
												return o.f(e, t, i(1, n));
											}
										: function (e, t, n) {
												return (e[t] = n), e;
											};
								},
								9114: function (e) {
									e.exports = function (e, t) {
										return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
									};
								},
								6135: function (e, t, n) {
									'use strict';
									var r = n(4948),
										o = n(3070),
										i = n(9114);
									e.exports = function (e, t, n) {
										var s = r(t);
										s in e ? o.f(e, s, i(0, n)) : (e[s] = n);
									};
								},
								8052: function (e, t, n) {
									var r = n(614),
										o = n(3070),
										i = n(6339),
										s = n(3072);
									e.exports = function (e, t, n, a) {
										a || (a = {});
										var l = a.enumerable,
											c = void 0 !== a.name ? a.name : t;
										if ((r(n) && i(n, c, a), a.global)) l ? (e[t] = n) : s(t, n);
										else {
											try {
												a.unsafe ? e[t] && (l = !0) : delete e[t];
											} catch (e) {}
											l ? (e[t] = n) : o.f(e, t, { value: n, enumerable: !1, configurable: !a.nonConfigurable, writable: !a.nonWritable });
										}
										return e;
									};
								},
								3072: function (e, t, n) {
									var r = n(7854),
										o = Object.defineProperty;
									e.exports = function (e, t) {
										try {
											o(r, e, { value: t, configurable: !0, writable: !0 });
										} catch (n) {
											r[e] = t;
										}
										return t;
									};
								},
								654: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(6916),
										i = n(1913),
										s = n(6530),
										a = n(614),
										l = n(4994),
										c = n(9518),
										u = n(7674),
										d = n(8003),
										f = n(8880),
										p = n(8052),
										h = n(5112),
										m = n(7497),
										y = n(3383),
										v = s.PROPER,
										g = s.CONFIGURABLE,
										b = y.IteratorPrototype,
										w = y.BUGGY_SAFARI_ITERATORS,
										_ = h('iterator'),
										x = 'keys',
										k = 'values',
										C = 'entries',
										E = function () {
											return this;
										};
									e.exports = function (e, t, n, s, h, y, j) {
										l(n, t, s);
										var S,
											D,
											O,
											P = function (e) {
												if (e === h && T) return T;
												if (!w && e in I) return I[e];
												switch (e) {
													case x:
													case k:
													case C:
														return function () {
															return new n(this, e);
														};
												}
												return function () {
													return new n(this);
												};
											},
											B = t + ' Iterator',
											M = !1,
											I = e.prototype,
											A = I[_] || I['@@iterator'] || (h && I[h]),
											T = (!w && A) || P(h),
											K = ('Array' == t && I.entries) || A;
										if (
											(K &&
												(S = c(K.call(new e()))) !== Object.prototype &&
												S.next &&
												(i || c(S) === b || (u ? u(S, b) : a(S[_]) || p(S, _, E)), d(S, B, !0, !0), i && (m[B] = E)),
											v &&
												h == k &&
												A &&
												A.name !== k &&
												(!i && g
													? f(I, 'name', k)
													: ((M = !0),
														(T = function () {
															return o(A, this);
														}))),
											h)
										)
											if (((D = { values: P(k), keys: y ? T : P(x), entries: P(C) }), j)) for (O in D) (w || M || !(O in I)) && p(I, O, D[O]);
											else r({ target: t, proto: !0, forced: w || M }, D);
										return (i && !j) || I[_] === T || p(I, _, T, { name: h }), (m[t] = T), D;
									};
								},
								7235: function (e, t, n) {
									var r = n(857),
										o = n(2597),
										i = n(6061),
										s = n(3070).f;
									e.exports = function (e) {
										var t = r.Symbol || (r.Symbol = {});
										o(t, e) || s(t, e, { value: i.f(e) });
									};
								},
								5117: function (e, t, n) {
									'use strict';
									var r = n(6330),
										o = TypeError;
									e.exports = function (e, t) {
										if (!delete e[t]) throw o('Cannot delete property ' + r(t) + ' of ' + r(e));
									};
								},
								9781: function (e, t, n) {
									var r = n(7293);
									e.exports = !r(function () {
										return (
											7 !=
											Object.defineProperty({}, 1, {
												get: function () {
													return 7;
												},
											})[1]
										);
									});
								},
								317: function (e, t, n) {
									var r = n(7854),
										o = n(111),
										i = r.document,
										s = o(i) && o(i.createElement);
									e.exports = function (e) {
										return s ? i.createElement(e) : {};
									};
								},
								7207: function (e) {
									var t = TypeError;
									e.exports = function (e) {
										if (e > 9007199254740991) throw t('Maximum allowed index exceeded');
										return e;
									};
								},
								8324: function (e) {
									e.exports = {
										CSSRuleList: 0,
										CSSStyleDeclaration: 0,
										CSSValueList: 0,
										ClientRectList: 0,
										DOMRectList: 0,
										DOMStringList: 0,
										DOMTokenList: 1,
										DataTransferItemList: 0,
										FileList: 0,
										HTMLAllCollection: 0,
										HTMLCollection: 0,
										HTMLFormElement: 0,
										HTMLSelectElement: 0,
										MediaList: 0,
										MimeTypeArray: 0,
										NamedNodeMap: 0,
										NodeList: 1,
										PaintRequestList: 0,
										Plugin: 0,
										PluginArray: 0,
										SVGLengthList: 0,
										SVGNumberList: 0,
										SVGPathSegList: 0,
										SVGPointList: 0,
										SVGStringList: 0,
										SVGTransformList: 0,
										SourceBufferList: 0,
										StyleSheetList: 0,
										TextTrackCueList: 0,
										TextTrackList: 0,
										TouchList: 0,
									};
								},
								8509: function (e, t, n) {
									var r = n(317)('span').classList,
										o = r && r.constructor && r.constructor.prototype;
									e.exports = o === Object.prototype ? void 0 : o;
								},
								8886: function (e, t, n) {
									var r = n(8113).match(/firefox\/(\d+)/i);
									e.exports = !!r && +r[1];
								},
								256: function (e, t, n) {
									var r = n(8113);
									e.exports = /MSIE|Trident/.test(r);
								},
								5268: function (e, t, n) {
									var r = n(4326),
										o = n(7854);
									e.exports = 'process' == r(o.process);
								},
								8113: function (e, t, n) {
									var r = n(5005);
									e.exports = r('navigator', 'userAgent') || '';
								},
								7392: function (e, t, n) {
									var r,
										o,
										i = n(7854),
										s = n(8113),
										a = i.process,
										l = i.Deno,
										c = (a && a.versions) || (l && l.version),
										u = c && c.v8;
									u && (o = (r = u.split('.'))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])),
										!o && s && (!(r = s.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = s.match(/Chrome\/(\d+)/)) && (o = +r[1]),
										(e.exports = o);
								},
								8008: function (e, t, n) {
									var r = n(8113).match(/AppleWebKit\/(\d+)\./);
									e.exports = !!r && +r[1];
								},
								748: function (e) {
									e.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
								},
								2109: function (e, t, n) {
									var r = n(7854),
										o = n(1236).f,
										i = n(8880),
										s = n(8052),
										a = n(3072),
										l = n(9920),
										c = n(4705);
									e.exports = function (e, t) {
										var n,
											u,
											d,
											f,
											p,
											h = e.target,
											m = e.global,
											y = e.stat;
										if ((n = m ? r : y ? r[h] || a(h, {}) : (r[h] || {}).prototype))
											for (u in t) {
												if (
													((f = t[u]),
													(d = e.dontCallGetSet ? (p = o(n, u)) && p.value : n[u]),
													!c(m ? u : h + (y ? '.' : '#') + u, e.forced) && void 0 !== d)
												) {
													if (typeof f == typeof d) continue;
													l(f, d);
												}
												(e.sham || (d && d.sham)) && i(f, 'sham', !0), s(n, u, f, e);
											}
									};
								},
								7293: function (e) {
									e.exports = function (e) {
										try {
											return !!e();
										} catch (e) {
											return !0;
										}
									};
								},
								7007: function (e, t, n) {
									'use strict';
									n(4916);
									var r = n(1702),
										o = n(8052),
										i = n(2261),
										s = n(7293),
										a = n(5112),
										l = n(8880),
										c = a('species'),
										u = RegExp.prototype;
									e.exports = function (e, t, n, d) {
										var f = a(e),
											p = !s(function () {
												var t = {};
												return (
													(t[f] = function () {
														return 7;
													}),
													7 != ''[e](t)
												);
											}),
											h =
												p &&
												!s(function () {
													var t = !1,
														n = /a/;
													return (
														'split' === e &&
															(((n = {}).constructor = {}),
															(n.constructor[c] = function () {
																return n;
															}),
															(n.flags = ''),
															(n[f] = /./[f])),
														(n.exec = function () {
															return (t = !0), null;
														}),
														n[f](''),
														!t
													);
												});
										if (!p || !h || n) {
											var m = r(/./[f]),
												y = t(f, ''[e], function (e, t, n, o, s) {
													var a = r(e),
														l = t.exec;
													return l === i || l === u.exec ? (p && !s ? { done: !0, value: m(t, n, o) } : { done: !0, value: a(n, t, o) }) : { done: !1 };
												});
											o(String.prototype, e, y[0]), o(u, f, y[1]);
										}
										d && l(u[f], 'sham', !0);
									};
								},
								2104: function (e, t, n) {
									var r = n(4374),
										o = Function.prototype,
										i = o.apply,
										s = o.call;
									e.exports =
										('object' == typeof Reflect && Reflect.apply) ||
										(r
											? s.bind(i)
											: function () {
													return s.apply(i, arguments);
												});
								},
								9974: function (e, t, n) {
									var r = n(1702),
										o = n(9662),
										i = n(4374),
										s = r(r.bind);
									e.exports = function (e, t) {
										return (
											o(e),
											void 0 === t
												? e
												: i
													? s(e, t)
													: function () {
															return e.apply(t, arguments);
														}
										);
									};
								},
								4374: function (e, t, n) {
									var r = n(7293);
									e.exports = !r(function () {
										var e = function () {}.bind();
										return 'function' != typeof e || e.hasOwnProperty('prototype');
									});
								},
								6916: function (e, t, n) {
									var r = n(4374),
										o = Function.prototype.call;
									e.exports = r
										? o.bind(o)
										: function () {
												return o.apply(o, arguments);
											};
								},
								6530: function (e, t, n) {
									var r = n(9781),
										o = n(2597),
										i = Function.prototype,
										s = r && Object.getOwnPropertyDescriptor,
										a = o(i, 'name'),
										l = a && 'something' === function () {}.name,
										c = a && (!r || (r && s(i, 'name').configurable));
									e.exports = { EXISTS: a, PROPER: l, CONFIGURABLE: c };
								},
								1702: function (e, t, n) {
									var r = n(4374),
										o = Function.prototype,
										i = o.bind,
										s = o.call,
										a = r && i.bind(s, s);
									e.exports = r
										? function (e) {
												return e && a(e);
											}
										: function (e) {
												return (
													e &&
													function () {
														return s.apply(e, arguments);
													}
												);
											};
								},
								5005: function (e, t, n) {
									var r = n(7854),
										o = n(614),
										i = function (e) {
											return o(e) ? e : void 0;
										};
									e.exports = function (e, t) {
										return arguments.length < 2 ? i(r[e]) : r[e] && r[e][t];
									};
								},
								1246: function (e, t, n) {
									var r = n(648),
										o = n(8173),
										i = n(7497),
										s = n(5112)('iterator');
									e.exports = function (e) {
										if (null != e) return o(e, s) || o(e, '@@iterator') || i[r(e)];
									};
								},
								8554: function (e, t, n) {
									var r = n(6916),
										o = n(9662),
										i = n(9670),
										s = n(6330),
										a = n(1246),
										l = TypeError;
									e.exports = function (e, t) {
										var n = arguments.length < 2 ? a(e) : t;
										if (o(n)) return i(r(n, e));
										throw l(s(e) + ' is not iterable');
									};
								},
								8173: function (e, t, n) {
									var r = n(9662);
									e.exports = function (e, t) {
										var n = e[t];
										return null == n ? void 0 : r(n);
									};
								},
								647: function (e, t, n) {
									var r = n(1702),
										o = n(7908),
										i = Math.floor,
										s = r(''.charAt),
										a = r(''.replace),
										l = r(''.slice),
										c = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
										u = /\$([$&'`]|\d{1,2})/g;
									e.exports = function (e, t, n, r, d, f) {
										var p = n + e.length,
											h = r.length,
											m = u;
										return (
											void 0 !== d && ((d = o(d)), (m = c)),
											a(f, m, function (o, a) {
												var c;
												switch (s(a, 0)) {
													case '$':
														return '$';
													case '&':
														return e;
													case '`':
														return l(t, 0, n);
													case "'":
														return l(t, p);
													case '<':
														c = d[l(a, 1, -1)];
														break;
													default:
														var u = +a;
														if (0 === u) return o;
														if (u > h) {
															var f = i(u / 10);
															return 0 === f ? o : f <= h ? (void 0 === r[f - 1] ? s(a, 1) : r[f - 1] + s(a, 1)) : o;
														}
														c = r[u - 1];
												}
												return void 0 === c ? '' : c;
											})
										);
									};
								},
								7854: function (e, t, n) {
									var r = function (e) {
										return e && e.Math == Math && e;
									};
									e.exports =
										r('object' == typeof globalThis && globalThis) ||
										r('object' == typeof window && window) ||
										r('object' == typeof self && self) ||
										r('object' == typeof n.g && n.g) ||
										(function () {
											return this;
										})() ||
										Function('return this')();
								},
								2597: function (e, t, n) {
									var r = n(1702),
										o = n(7908),
										i = r({}.hasOwnProperty);
									e.exports =
										Object.hasOwn ||
										function (e, t) {
											return i(o(e), t);
										};
								},
								3501: function (e) {
									e.exports = {};
								},
								490: function (e, t, n) {
									var r = n(5005);
									e.exports = r('document', 'documentElement');
								},
								4664: function (e, t, n) {
									var r = n(9781),
										o = n(7293),
										i = n(317);
									e.exports =
										!r &&
										!o(function () {
											return (
												7 !=
												Object.defineProperty(i('div'), 'a', {
													get: function () {
														return 7;
													},
												}).a
											);
										});
								},
								8361: function (e, t, n) {
									var r = n(1702),
										o = n(7293),
										i = n(4326),
										s = Object,
										a = r(''.split);
									e.exports = o(function () {
										return !s('z').propertyIsEnumerable(0);
									})
										? function (e) {
												return 'String' == i(e) ? a(e, '') : s(e);
											}
										: s;
								},
								9587: function (e, t, n) {
									var r = n(614),
										o = n(111),
										i = n(7674);
									e.exports = function (e, t, n) {
										var s, a;
										return i && r((s = t.constructor)) && s !== n && o((a = s.prototype)) && a !== n.prototype && i(e, a), e;
									};
								},
								2788: function (e, t, n) {
									var r = n(1702),
										o = n(614),
										i = n(5465),
										s = r(Function.toString);
									o(i.inspectSource) ||
										(i.inspectSource = function (e) {
											return s(e);
										}),
										(e.exports = i.inspectSource);
								},
								9909: function (e, t, n) {
									var r,
										o,
										i,
										s = n(8536),
										a = n(7854),
										l = n(1702),
										c = n(111),
										u = n(8880),
										d = n(2597),
										f = n(5465),
										p = n(6200),
										h = n(3501),
										m = 'Object already initialized',
										y = a.TypeError,
										v = a.WeakMap;
									if (s || f.state) {
										var g = f.state || (f.state = new v()),
											b = l(g.get),
											w = l(g.has),
											_ = l(g.set);
										(r = function (e, t) {
											if (w(g, e)) throw new y(m);
											return (t.facade = e), _(g, e, t), t;
										}),
											(o = function (e) {
												return b(g, e) || {};
											}),
											(i = function (e) {
												return w(g, e);
											});
									} else {
										var x = p('state');
										(h[x] = !0),
											(r = function (e, t) {
												if (d(e, x)) throw new y(m);
												return (t.facade = e), u(e, x, t), t;
											}),
											(o = function (e) {
												return d(e, x) ? e[x] : {};
											}),
											(i = function (e) {
												return d(e, x);
											});
									}
									e.exports = {
										set: r,
										get: o,
										has: i,
										enforce: function (e) {
											return i(e) ? o(e) : r(e, {});
										},
										getterFor: function (e) {
											return function (t) {
												var n;
												if (!c(t) || (n = o(t)).type !== e) throw y('Incompatible receiver, ' + e + ' required');
												return n;
											};
										},
									};
								},
								7659: function (e, t, n) {
									var r = n(5112),
										o = n(7497),
										i = r('iterator'),
										s = Array.prototype;
									e.exports = function (e) {
										return void 0 !== e && (o.Array === e || s[i] === e);
									};
								},
								3157: function (e, t, n) {
									var r = n(4326);
									e.exports =
										Array.isArray ||
										function (e) {
											return 'Array' == r(e);
										};
								},
								614: function (e) {
									e.exports = function (e) {
										return 'function' == typeof e;
									};
								},
								4411: function (e, t, n) {
									var r = n(1702),
										o = n(7293),
										i = n(614),
										s = n(648),
										a = n(5005),
										l = n(2788),
										c = function () {},
										u = [],
										d = a('Reflect', 'construct'),
										f = /^\s*(?:class|function)\b/,
										p = r(f.exec),
										h = !f.exec(c),
										m = function (e) {
											if (!i(e)) return !1;
											try {
												return d(c, u, e), !0;
											} catch (e) {
												return !1;
											}
										},
										y = function (e) {
											if (!i(e)) return !1;
											switch (s(e)) {
												case 'AsyncFunction':
												case 'GeneratorFunction':
												case 'AsyncGeneratorFunction':
													return !1;
											}
											try {
												return h || !!p(f, l(e));
											} catch (e) {
												return !0;
											}
										};
									(y.sham = !0),
										(e.exports =
											!d ||
											o(function () {
												var e;
												return (
													m(m.call) ||
													!m(Object) ||
													!m(function () {
														e = !0;
													}) ||
													e
												);
											})
												? y
												: m);
								},
								4705: function (e, t, n) {
									var r = n(7293),
										o = n(614),
										i = /#|\.prototype\./,
										s = function (e, t) {
											var n = l[a(e)];
											return n == u || (n != c && (o(t) ? r(t) : !!t));
										},
										a = (s.normalize = function (e) {
											return String(e).replace(i, '.').toLowerCase();
										}),
										l = (s.data = {}),
										c = (s.NATIVE = 'N'),
										u = (s.POLYFILL = 'P');
									e.exports = s;
								},
								5988: function (e, t, n) {
									var r = n(111),
										o = Math.floor;
									e.exports =
										Number.isInteger ||
										function (e) {
											return !r(e) && isFinite(e) && o(e) === e;
										};
								},
								111: function (e, t, n) {
									var r = n(614);
									e.exports = function (e) {
										return 'object' == typeof e ? null !== e : r(e);
									};
								},
								1913: function (e) {
									e.exports = !1;
								},
								7850: function (e, t, n) {
									var r = n(111),
										o = n(4326),
										i = n(5112)('match');
									e.exports = function (e) {
										var t;
										return r(e) && (void 0 !== (t = e[i]) ? !!t : 'RegExp' == o(e));
									};
								},
								2190: function (e, t, n) {
									var r = n(5005),
										o = n(614),
										i = n(7976),
										s = n(3307),
										a = Object;
									e.exports = s
										? function (e) {
												return 'symbol' == typeof e;
											}
										: function (e) {
												var t = r('Symbol');
												return o(t) && i(t.prototype, a(e));
											};
								},
								9212: function (e, t, n) {
									var r = n(6916),
										o = n(9670),
										i = n(8173);
									e.exports = function (e, t, n) {
										var s, a;
										o(e);
										try {
											if (!(s = i(e, 'return'))) {
												if ('throw' === t) throw n;
												return n;
											}
											s = r(s, e);
										} catch (e) {
											(a = !0), (s = e);
										}
										if ('throw' === t) throw n;
										if (a) throw s;
										return o(s), n;
									};
								},
								3383: function (e, t, n) {
									'use strict';
									var r,
										o,
										i,
										s = n(7293),
										a = n(614),
										l = n(30),
										c = n(9518),
										u = n(8052),
										d = n(5112),
										f = n(1913),
										p = d('iterator'),
										h = !1;
									[].keys && ('next' in (i = [].keys()) ? (o = c(c(i))) !== Object.prototype && (r = o) : (h = !0)),
										null == r ||
										s(function () {
											var e = {};
											return r[p].call(e) !== e;
										})
											? (r = {})
											: f && (r = l(r)),
										a(r[p]) ||
											u(r, p, function () {
												return this;
											}),
										(e.exports = { IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: h });
								},
								7497: function (e) {
									e.exports = {};
								},
								6244: function (e, t, n) {
									var r = n(7466);
									e.exports = function (e) {
										return r(e.length);
									};
								},
								6339: function (e, t, n) {
									var r = n(7293),
										o = n(614),
										i = n(2597),
										s = n(9781),
										a = n(6530).CONFIGURABLE,
										l = n(2788),
										c = n(9909),
										u = c.enforce,
										d = c.get,
										f = Object.defineProperty,
										p =
											s &&
											!r(function () {
												return 8 !== f(function () {}, 'length', { value: 8 }).length;
											}),
										h = String(String).split('String'),
										m = (e.exports = function (e, t, n) {
											'Symbol(' === String(t).slice(0, 7) && (t = '[' + String(t).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'),
												n && n.getter && (t = 'get ' + t),
												n && n.setter && (t = 'set ' + t),
												(!i(e, 'name') || (a && e.name !== t)) && (s ? f(e, 'name', { value: t, configurable: !0 }) : (e.name = t)),
												p && n && i(n, 'arity') && e.length !== n.arity && f(e, 'length', { value: n.arity });
											try {
												n && i(n, 'constructor') && n.constructor ? s && f(e, 'prototype', { writable: !1 }) : e.prototype && (e.prototype = void 0);
											} catch (e) {}
											var r = u(e);
											return i(r, 'source') || (r.source = h.join('string' == typeof t ? t : '')), e;
										});
									Function.prototype.toString = m(function () {
										return (o(this) && d(this).source) || l(this);
									}, 'toString');
								},
								4758: function (e) {
									var t = Math.ceil,
										n = Math.floor;
									e.exports =
										Math.trunc ||
										function (e) {
											var r = +e;
											return (r > 0 ? n : t)(r);
										};
								},
								735: function (e, t, n) {
									var r = n(133);
									e.exports = r && !!Symbol.for && !!Symbol.keyFor;
								},
								133: function (e, t, n) {
									var r = n(7392),
										o = n(7293);
									e.exports =
										!!Object.getOwnPropertySymbols &&
										!o(function () {
											var e = Symbol();
											return !String(e) || !(Object(e) instanceof Symbol) || (!Symbol.sham && r && r < 41);
										});
								},
								8536: function (e, t, n) {
									var r = n(7854),
										o = n(614),
										i = n(2788),
										s = r.WeakMap;
									e.exports = o(s) && /native code/.test(i(s));
								},
								3929: function (e, t, n) {
									var r = n(7850),
										o = TypeError;
									e.exports = function (e) {
										if (r(e)) throw o("The method doesn't accept regular expressions");
										return e;
									};
								},
								1574: function (e, t, n) {
									'use strict';
									var r = n(9781),
										o = n(1702),
										i = n(6916),
										s = n(7293),
										a = n(1956),
										l = n(5181),
										c = n(5296),
										u = n(7908),
										d = n(8361),
										f = Object.assign,
										p = Object.defineProperty,
										h = o([].concat);
									e.exports =
										!f ||
										s(function () {
											if (
												r &&
												1 !==
													f(
														{ b: 1 },
														f(
															p({}, 'a', {
																enumerable: !0,
																get: function () {
																	p(this, 'b', { value: 3, enumerable: !1 });
																},
															}),
															{ b: 2 }
														)
													).b
											)
												return !0;
											var e = {},
												t = {},
												n = Symbol(),
												o = 'abcdefghijklmnopqrst';
											return (
												(e[n] = 7),
												o.split('').forEach(function (e) {
													t[e] = e;
												}),
												7 != f({}, e)[n] || a(f({}, t)).join('') != o
											);
										})
											? function (e, t) {
													for (var n = u(e), o = arguments.length, s = 1, f = l.f, p = c.f; o > s; )
														for (var m, y = d(arguments[s++]), v = f ? h(a(y), f(y)) : a(y), g = v.length, b = 0; g > b; )
															(m = v[b++]), (r && !i(p, y, m)) || (n[m] = y[m]);
													return n;
												}
											: f;
								},
								30: function (e, t, n) {
									var r,
										o = n(9670),
										i = n(6048),
										s = n(748),
										a = n(3501),
										l = n(490),
										c = n(317),
										u = n(6200)('IE_PROTO'),
										d = function () {},
										f = function (e) {
											return '<script>' + e + '</script>';
										},
										p = function (e) {
											e.write(f('')), e.close();
											var t = e.parentWindow.Object;
											return (e = null), t;
										},
										h = function () {
											try {
												r = new ActiveXObject('htmlfile');
											} catch (e) {}
											var e, t;
											h =
												'undefined' != typeof document
													? document.domain && r
														? p(r)
														: (((t = c('iframe')).style.display = 'none'),
															l.appendChild(t),
															(t.src = String('javascript:')),
															(e = t.contentWindow.document).open(),
															e.write(f('document.F=Object')),
															e.close(),
															e.F)
													: p(r);
											for (var n = s.length; n--; ) delete h.prototype[s[n]];
											return h();
										};
									(a[u] = !0),
										(e.exports =
											Object.create ||
											function (e, t) {
												var n;
												return (
													null !== e ? ((d.prototype = o(e)), (n = new d()), (d.prototype = null), (n[u] = e)) : (n = h()), void 0 === t ? n : i.f(n, t)
												);
											});
								},
								6048: function (e, t, n) {
									var r = n(9781),
										o = n(3353),
										i = n(3070),
										s = n(9670),
										a = n(5656),
										l = n(1956);
									t.f =
										r && !o
											? Object.defineProperties
											: function (e, t) {
													s(e);
													for (var n, r = a(t), o = l(t), c = o.length, u = 0; c > u; ) i.f(e, (n = o[u++]), r[n]);
													return e;
												};
								},
								3070: function (e, t, n) {
									var r = n(9781),
										o = n(4664),
										i = n(3353),
										s = n(9670),
										a = n(4948),
										l = TypeError,
										c = Object.defineProperty,
										u = Object.getOwnPropertyDescriptor;
									t.f = r
										? i
											? function (e, t, n) {
													if ((s(e), (t = a(t)), s(n), 'function' == typeof e && 'prototype' === t && 'value' in n && 'writable' in n && !n.writable)) {
														var r = u(e, t);
														r &&
															r.writable &&
															((e[t] = n.value),
															(n = {
																configurable: 'configurable' in n ? n.configurable : r.configurable,
																enumerable: 'enumerable' in n ? n.enumerable : r.enumerable,
																writable: !1,
															}));
													}
													return c(e, t, n);
												}
											: c
										: function (e, t, n) {
												if ((s(e), (t = a(t)), s(n), o))
													try {
														return c(e, t, n);
													} catch (e) {}
												if ('get' in n || 'set' in n) throw l('Accessors not supported');
												return 'value' in n && (e[t] = n.value), e;
											};
								},
								1236: function (e, t, n) {
									var r = n(9781),
										o = n(6916),
										i = n(5296),
										s = n(9114),
										a = n(5656),
										l = n(4948),
										c = n(2597),
										u = n(4664),
										d = Object.getOwnPropertyDescriptor;
									t.f = r
										? d
										: function (e, t) {
												if (((e = a(e)), (t = l(t)), u))
													try {
														return d(e, t);
													} catch (e) {}
												if (c(e, t)) return s(!o(i.f, e, t), e[t]);
											};
								},
								1156: function (e, t, n) {
									var r = n(4326),
										o = n(5656),
										i = n(8006).f,
										s = n(1589),
										a = 'object' == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
									e.exports.f = function (e) {
										return a && 'Window' == r(e)
											? (function (e) {
													try {
														return i(e);
													} catch (e) {
														return s(a);
													}
												})(e)
											: i(o(e));
									};
								},
								8006: function (e, t, n) {
									var r = n(6324),
										o = n(748).concat('length', 'prototype');
									t.f =
										Object.getOwnPropertyNames ||
										function (e) {
											return r(e, o);
										};
								},
								5181: function (e, t) {
									t.f = Object.getOwnPropertySymbols;
								},
								9518: function (e, t, n) {
									var r = n(2597),
										o = n(614),
										i = n(7908),
										s = n(6200),
										a = n(8544),
										l = s('IE_PROTO'),
										c = Object,
										u = c.prototype;
									e.exports = a
										? c.getPrototypeOf
										: function (e) {
												var t = i(e);
												if (r(t, l)) return t[l];
												var n = t.constructor;
												return o(n) && t instanceof n ? n.prototype : t instanceof c ? u : null;
											};
								},
								7976: function (e, t, n) {
									var r = n(1702);
									e.exports = r({}.isPrototypeOf);
								},
								6324: function (e, t, n) {
									var r = n(1702),
										o = n(2597),
										i = n(5656),
										s = n(1318).indexOf,
										a = n(3501),
										l = r([].push);
									e.exports = function (e, t) {
										var n,
											r = i(e),
											c = 0,
											u = [];
										for (n in r) !o(a, n) && o(r, n) && l(u, n);
										for (; t.length > c; ) o(r, (n = t[c++])) && (~s(u, n) || l(u, n));
										return u;
									};
								},
								1956: function (e, t, n) {
									var r = n(6324),
										o = n(748);
									e.exports =
										Object.keys ||
										function (e) {
											return r(e, o);
										};
								},
								5296: function (e, t) {
									'use strict';
									var n = {}.propertyIsEnumerable,
										r = Object.getOwnPropertyDescriptor,
										o = r && !n.call({ 1: 2 }, 1);
									t.f = o
										? function (e) {
												var t = r(this, e);
												return !!t && t.enumerable;
											}
										: n;
								},
								9026: function (e, t, n) {
									'use strict';
									var r = n(1913),
										o = n(7854),
										i = n(7293),
										s = n(8008);
									e.exports =
										r ||
										!i(function () {
											if (!(s && s < 535)) {
												var e = Math.random();
												__defineSetter__.call(null, e, function () {}), delete o[e];
											}
										});
								},
								7674: function (e, t, n) {
									var r = n(1702),
										o = n(9670),
										i = n(6077);
									e.exports =
										Object.setPrototypeOf ||
										('__proto__' in {}
											? (function () {
													var e,
														t = !1,
														n = {};
													try {
														(e = r(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set))(n, []), (t = n instanceof Array);
													} catch (e) {}
													return function (n, r) {
														return o(n), i(r), t ? e(n, r) : (n.__proto__ = r), n;
													};
												})()
											: void 0);
								},
								288: function (e, t, n) {
									'use strict';
									var r = n(1694),
										o = n(648);
									e.exports = r
										? {}.toString
										: function () {
												return '[object ' + o(this) + ']';
											};
								},
								2140: function (e, t, n) {
									var r = n(6916),
										o = n(614),
										i = n(111),
										s = TypeError;
									e.exports = function (e, t) {
										var n, a;
										if ('string' === t && o((n = e.toString)) && !i((a = r(n, e)))) return a;
										if (o((n = e.valueOf)) && !i((a = r(n, e)))) return a;
										if ('string' !== t && o((n = e.toString)) && !i((a = r(n, e)))) return a;
										throw s("Can't convert object to primitive value");
									};
								},
								3887: function (e, t, n) {
									var r = n(5005),
										o = n(1702),
										i = n(8006),
										s = n(5181),
										a = n(9670),
										l = o([].concat);
									e.exports =
										r('Reflect', 'ownKeys') ||
										function (e) {
											var t = i.f(a(e)),
												n = s.f;
											return n ? l(t, n(e)) : t;
										};
								},
								857: function (e, t, n) {
									var r = n(7854);
									e.exports = r;
								},
								2626: function (e, t, n) {
									var r = n(3070).f;
									e.exports = function (e, t, n) {
										n in e ||
											r(e, n, {
												configurable: !0,
												get: function () {
													return t[n];
												},
												set: function (e) {
													t[n] = e;
												},
											});
									};
								},
								7651: function (e, t, n) {
									var r = n(6916),
										o = n(9670),
										i = n(614),
										s = n(4326),
										a = n(2261),
										l = TypeError;
									e.exports = function (e, t) {
										var n = e.exec;
										if (i(n)) {
											var c = r(n, e, t);
											return null !== c && o(c), c;
										}
										if ('RegExp' === s(e)) return r(a, e, t);
										throw l('RegExp#exec called on incompatible receiver');
									};
								},
								2261: function (e, t, n) {
									'use strict';
									var r,
										o,
										i = n(6916),
										s = n(1702),
										a = n(1340),
										l = n(7066),
										c = n(2999),
										u = n(2309),
										d = n(30),
										f = n(9909).get,
										p = n(9441),
										h = n(7168),
										m = u('native-string-replace', String.prototype.replace),
										y = RegExp.prototype.exec,
										v = y,
										g = s(''.charAt),
										b = s(''.indexOf),
										w = s(''.replace),
										_ = s(''.slice),
										x = ((o = /b*/g), i(y, (r = /a/), 'a'), i(y, o, 'a'), 0 !== r.lastIndex || 0 !== o.lastIndex),
										k = c.BROKEN_CARET,
										C = void 0 !== /()??/.exec('')[1];
									(x || C || k || p || h) &&
										(v = function (e) {
											var t,
												n,
												r,
												o,
												s,
												c,
												u,
												p = this,
												h = f(p),
												E = a(e),
												j = h.raw;
											if (j) return (j.lastIndex = p.lastIndex), (t = i(v, j, E)), (p.lastIndex = j.lastIndex), t;
											var S = h.groups,
												D = k && p.sticky,
												O = i(l, p),
												P = p.source,
												B = 0,
												M = E;
											if (
												(D &&
													((O = w(O, 'y', '')),
													-1 === b(O, 'g') && (O += 'g'),
													(M = _(E, p.lastIndex)),
													p.lastIndex > 0 &&
														(!p.multiline || (p.multiline && '\n' !== g(E, p.lastIndex - 1))) &&
														((P = '(?: ' + P + ')'), (M = ' ' + M), B++),
													(n = new RegExp('^(?:' + P + ')', O))),
												C && (n = new RegExp('^' + P + '$(?!\\s)', O)),
												x && (r = p.lastIndex),
												(o = i(y, D ? n : p, M)),
												D
													? o
														? ((o.input = _(o.input, B)), (o[0] = _(o[0], B)), (o.index = p.lastIndex), (p.lastIndex += o[0].length))
														: (p.lastIndex = 0)
													: x && o && (p.lastIndex = p.global ? o.index + o[0].length : r),
												C &&
													o &&
													o.length > 1 &&
													i(m, o[0], n, function () {
														for (s = 1; s < arguments.length - 2; s++) void 0 === arguments[s] && (o[s] = void 0);
													}),
												o && S)
											)
												for (o.groups = c = d(null), s = 0; s < S.length; s++) c[(u = S[s])[0]] = o[u[1]];
											return o;
										}),
										(e.exports = v);
								},
								7066: function (e, t, n) {
									'use strict';
									var r = n(9670);
									e.exports = function () {
										var e = r(this),
											t = '';
										return (
											e.hasIndices && (t += 'd'),
											e.global && (t += 'g'),
											e.ignoreCase && (t += 'i'),
											e.multiline && (t += 'm'),
											e.dotAll && (t += 's'),
											e.unicode && (t += 'u'),
											e.unicodeSets && (t += 'v'),
											e.sticky && (t += 'y'),
											t
										);
									};
								},
								4706: function (e, t, n) {
									var r = n(6916),
										o = n(2597),
										i = n(7976),
										s = n(7066),
										a = RegExp.prototype;
									e.exports = function (e) {
										var t = e.flags;
										return void 0 !== t || 'flags' in a || o(e, 'flags') || !i(a, e) ? t : r(s, e);
									};
								},
								2999: function (e, t, n) {
									var r = n(7293),
										o = n(7854).RegExp,
										i = r(function () {
											var e = o('a', 'y');
											return (e.lastIndex = 2), null != e.exec('abcd');
										}),
										s =
											i ||
											r(function () {
												return !o('a', 'y').sticky;
											}),
										a =
											i ||
											r(function () {
												var e = o('^r', 'gy');
												return (e.lastIndex = 2), null != e.exec('str');
											});
									e.exports = { BROKEN_CARET: a, MISSED_STICKY: s, UNSUPPORTED_Y: i };
								},
								9441: function (e, t, n) {
									var r = n(7293),
										o = n(7854).RegExp;
									e.exports = r(function () {
										var e = o('.', 's');
										return !(e.dotAll && e.exec('\n') && 's' === e.flags);
									});
								},
								7168: function (e, t, n) {
									var r = n(7293),
										o = n(7854).RegExp;
									e.exports = r(function () {
										var e = o('(?<a>b)', 'g');
										return 'b' !== e.exec('b').groups.a || 'bc' !== 'b'.replace(e, '$<a>c');
									});
								},
								4488: function (e) {
									var t = TypeError;
									e.exports = function (e) {
										if (null == e) throw t("Can't call method on " + e);
										return e;
									};
								},
								6340: function (e, t, n) {
									'use strict';
									var r = n(5005),
										o = n(3070),
										i = n(5112),
										s = n(9781),
										a = i('species');
									e.exports = function (e) {
										var t = r(e),
											n = o.f;
										s &&
											t &&
											!t[a] &&
											n(t, a, {
												configurable: !0,
												get: function () {
													return this;
												},
											});
									};
								},
								8003: function (e, t, n) {
									var r = n(3070).f,
										o = n(2597),
										i = n(5112)('toStringTag');
									e.exports = function (e, t, n) {
										e && !n && (e = e.prototype), e && !o(e, i) && r(e, i, { configurable: !0, value: t });
									};
								},
								6200: function (e, t, n) {
									var r = n(2309),
										o = n(9711),
										i = r('keys');
									e.exports = function (e) {
										return i[e] || (i[e] = o(e));
									};
								},
								5465: function (e, t, n) {
									var r = n(7854),
										o = n(3072),
										i = '__core-js_shared__',
										s = r[i] || o(i, {});
									e.exports = s;
								},
								2309: function (e, t, n) {
									var r = n(1913),
										o = n(5465);
									(e.exports = function (e, t) {
										return o[e] || (o[e] = void 0 !== t ? t : {});
									})('versions', []).push({
										version: '3.23.5',
										mode: r ? 'pure' : 'global',
										copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
										license: 'https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE',
										source: 'https://github.com/zloirock/core-js',
									});
								},
								6707: function (e, t, n) {
									var r = n(9670),
										o = n(9483),
										i = n(5112)('species');
									e.exports = function (e, t) {
										var n,
											s = r(e).constructor;
										return void 0 === s || null == (n = r(s)[i]) ? t : o(n);
									};
								},
								8710: function (e, t, n) {
									var r = n(1702),
										o = n(9303),
										i = n(1340),
										s = n(4488),
										a = r(''.charAt),
										l = r(''.charCodeAt),
										c = r(''.slice),
										u = function (e) {
											return function (t, n) {
												var r,
													u,
													d = i(s(t)),
													f = o(n),
													p = d.length;
												return f < 0 || f >= p
													? e
														? ''
														: void 0
													: (r = l(d, f)) < 55296 || r > 56319 || f + 1 === p || (u = l(d, f + 1)) < 56320 || u > 57343
														? e
															? a(d, f)
															: r
														: e
															? c(d, f, f + 2)
															: u - 56320 + ((r - 55296) << 10) + 65536;
											};
										};
									e.exports = { codeAt: u(!1), charAt: u(!0) };
								},
								6091: function (e, t, n) {
									var r = n(6530).PROPER,
										o = n(7293),
										i = n(1361);
									e.exports = function (e) {
										return o(function () {
											return !!i[e]() || '​᠎' !== '​᠎'[e]() || (r && i[e].name !== e);
										});
									};
								},
								3111: function (e, t, n) {
									var r = n(1702),
										o = n(4488),
										i = n(1340),
										s = n(1361),
										a = r(''.replace),
										l = '[' + s + ']',
										c = RegExp('^' + l + l + '*'),
										u = RegExp(l + l + '*$'),
										d = function (e) {
											return function (t) {
												var n = i(o(t));
												return 1 & e && (n = a(n, c, '')), 2 & e && (n = a(n, u, '')), n;
											};
										};
									e.exports = { start: d(1), end: d(2), trim: d(3) };
								},
								6532: function (e, t, n) {
									var r = n(6916),
										o = n(5005),
										i = n(5112),
										s = n(8052);
									e.exports = function () {
										var e = o('Symbol'),
											t = e && e.prototype,
											n = t && t.valueOf,
											a = i('toPrimitive');
										t &&
											!t[a] &&
											s(
												t,
												a,
												function (e) {
													return r(n, this);
												},
												{ arity: 1 }
											);
									};
								},
								863: function (e, t, n) {
									var r = n(1702);
									e.exports = r((1).valueOf);
								},
								1400: function (e, t, n) {
									var r = n(9303),
										o = Math.max,
										i = Math.min;
									e.exports = function (e, t) {
										var n = r(e);
										return n < 0 ? o(n + t, 0) : i(n, t);
									};
								},
								5656: function (e, t, n) {
									var r = n(8361),
										o = n(4488);
									e.exports = function (e) {
										return r(o(e));
									};
								},
								9303: function (e, t, n) {
									var r = n(4758);
									e.exports = function (e) {
										var t = +e;
										return t != t || 0 === t ? 0 : r(t);
									};
								},
								7466: function (e, t, n) {
									var r = n(9303),
										o = Math.min;
									e.exports = function (e) {
										return e > 0 ? o(r(e), 9007199254740991) : 0;
									};
								},
								7908: function (e, t, n) {
									var r = n(4488),
										o = Object;
									e.exports = function (e) {
										return o(r(e));
									};
								},
								7593: function (e, t, n) {
									var r = n(6916),
										o = n(111),
										i = n(2190),
										s = n(8173),
										a = n(2140),
										l = n(5112),
										c = TypeError,
										u = l('toPrimitive');
									e.exports = function (e, t) {
										if (!o(e) || i(e)) return e;
										var n,
											l = s(e, u);
										if (l) {
											if ((void 0 === t && (t = 'default'), (n = r(l, e, t)), !o(n) || i(n))) return n;
											throw c("Can't convert object to primitive value");
										}
										return void 0 === t && (t = 'number'), a(e, t);
									};
								},
								4948: function (e, t, n) {
									var r = n(7593),
										o = n(2190);
									e.exports = function (e) {
										var t = r(e, 'string');
										return o(t) ? t : t + '';
									};
								},
								1694: function (e, t, n) {
									var r = {};
									(r[n(5112)('toStringTag')] = 'z'), (e.exports = '[object z]' === String(r));
								},
								1340: function (e, t, n) {
									var r = n(648),
										o = String;
									e.exports = function (e) {
										if ('Symbol' === r(e)) throw TypeError('Cannot convert a Symbol value to a string');
										return o(e);
									};
								},
								6330: function (e) {
									var t = String;
									e.exports = function (e) {
										try {
											return t(e);
										} catch (e) {
											return 'Object';
										}
									};
								},
								9711: function (e, t, n) {
									var r = n(1702),
										o = 0,
										i = Math.random(),
										s = r((1).toString);
									e.exports = function (e) {
										return 'Symbol(' + (void 0 === e ? '' : e) + ')_' + s(++o + i, 36);
									};
								},
								3307: function (e, t, n) {
									var r = n(133);
									e.exports = r && !Symbol.sham && 'symbol' == typeof Symbol.iterator;
								},
								3353: function (e, t, n) {
									var r = n(9781),
										o = n(7293);
									e.exports =
										r &&
										o(function () {
											return 42 != Object.defineProperty(function () {}, 'prototype', { value: 42, writable: !1 }).prototype;
										});
								},
								6061: function (e, t, n) {
									var r = n(5112);
									t.f = r;
								},
								5112: function (e, t, n) {
									var r = n(7854),
										o = n(2309),
										i = n(2597),
										s = n(9711),
										a = n(133),
										l = n(3307),
										c = o('wks'),
										u = r.Symbol,
										d = u && u.for,
										f = l ? u : (u && u.withoutSetter) || s;
									e.exports = function (e) {
										if (!i(c, e) || (!a && 'string' != typeof c[e])) {
											var t = 'Symbol.' + e;
											a && i(u, e) ? (c[e] = u[e]) : (c[e] = l && d ? d(t) : f(t));
										}
										return c[e];
									};
								},
								1361: function (e) {
									e.exports = '\t\n\v\f\r                　\u2028\u2029\ufeff';
								},
								2222: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(7293),
										i = n(3157),
										s = n(111),
										a = n(7908),
										l = n(6244),
										c = n(7207),
										u = n(6135),
										d = n(5417),
										f = n(1194),
										p = n(5112),
										h = n(7392),
										m = p('isConcatSpreadable'),
										y =
											h >= 51 ||
											!o(function () {
												var e = [];
												return (e[m] = !1), e.concat()[0] !== e;
											}),
										v = f('concat'),
										g = function (e) {
											if (!s(e)) return !1;
											var t = e[m];
											return void 0 !== t ? !!t : i(e);
										};
									r(
										{ target: 'Array', proto: !0, arity: 1, forced: !y || !v },
										{
											concat: function (e) {
												var t,
													n,
													r,
													o,
													i,
													s = a(this),
													f = d(s, 0),
													p = 0;
												for (t = -1, r = arguments.length; t < r; t++)
													if (g((i = -1 === t ? s : arguments[t]))) for (o = l(i), c(p + o), n = 0; n < o; n++, p++) n in i && u(f, p, i[n]);
													else c(p + 1), u(f, p++, i);
												return (f.length = p), f;
											},
										}
									);
								},
								7327: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(2092).filter;
									r(
										{ target: 'Array', proto: !0, forced: !n(1194)('filter') },
										{
											filter: function (e) {
												return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
											},
										}
									);
								},
								1038: function (e, t, n) {
									var r = n(2109),
										o = n(8457);
									r(
										{
											target: 'Array',
											stat: !0,
											forced: !n(7072)(function (e) {
												Array.from(e);
											}),
										},
										{ from: o }
									);
								},
								6699: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(1318).includes,
										i = n(7293),
										s = n(1223);
									r(
										{
											target: 'Array',
											proto: !0,
											forced: i(function () {
												return !Array(1).includes();
											}),
										},
										{
											includes: function (e) {
												return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
											},
										}
									),
										s('includes');
								},
								2772: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(1702),
										i = n(1318).indexOf,
										s = n(9341),
										a = o([].indexOf),
										l = !!a && 1 / a([1], 1, -0) < 0,
										c = s('indexOf');
									r(
										{ target: 'Array', proto: !0, forced: l || !c },
										{
											indexOf: function (e) {
												var t = arguments.length > 1 ? arguments[1] : void 0;
												return l ? a(this, e, t) || 0 : i(this, e, t);
											},
										}
									);
								},
								6992: function (e, t, n) {
									'use strict';
									var r = n(5656),
										o = n(1223),
										i = n(7497),
										s = n(9909),
										a = n(3070).f,
										l = n(654),
										c = n(1913),
										u = n(9781),
										d = 'Array Iterator',
										f = s.set,
										p = s.getterFor(d);
									e.exports = l(
										Array,
										'Array',
										function (e, t) {
											f(this, { type: d, target: r(e), index: 0, kind: t });
										},
										function () {
											var e = p(this),
												t = e.target,
												n = e.kind,
												r = e.index++;
											return !t || r >= t.length
												? ((e.target = void 0), { value: void 0, done: !0 })
												: 'keys' == n
													? { value: r, done: !1 }
													: 'values' == n
														? { value: t[r], done: !1 }
														: { value: [r, t[r]], done: !1 };
										},
										'values'
									);
									var h = (i.Arguments = i.Array);
									if ((o('keys'), o('values'), o('entries'), !c && u && 'values' !== h.name))
										try {
											a(h, 'name', { value: 'values' });
										} catch (e) {}
								},
								9600: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(1702),
										i = n(8361),
										s = n(5656),
										a = n(9341),
										l = o([].join),
										c = i != Object,
										u = a('join', ',');
									r(
										{ target: 'Array', proto: !0, forced: c || !u },
										{
											join: function (e) {
												return l(s(this), void 0 === e ? ',' : e);
											},
										}
									);
								},
								1249: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(2092).map;
									r(
										{ target: 'Array', proto: !0, forced: !n(1194)('map') },
										{
											map: function (e) {
												return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
											},
										}
									);
								},
								5827: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(3671).left,
										i = n(9341),
										s = n(7392),
										a = n(5268);
									r(
										{ target: 'Array', proto: !0, forced: !i('reduce') || (!a && s > 79 && s < 83) },
										{
											reduce: function (e) {
												var t = arguments.length;
												return o(this, e, t, t > 1 ? arguments[1] : void 0);
											},
										}
									);
								},
								7042: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(3157),
										i = n(4411),
										s = n(111),
										a = n(1400),
										l = n(6244),
										c = n(5656),
										u = n(6135),
										d = n(5112),
										f = n(1194),
										p = n(206),
										h = f('slice'),
										m = d('species'),
										y = Array,
										v = Math.max;
									r(
										{ target: 'Array', proto: !0, forced: !h },
										{
											slice: function (e, t) {
												var n,
													r,
													d,
													f = c(this),
													h = l(f),
													g = a(e, h),
													b = a(void 0 === t ? h : t, h);
												if (
													o(f) &&
													((n = f.constructor),
													((i(n) && (n === y || o(n.prototype))) || (s(n) && null === (n = n[m]))) && (n = void 0),
													n === y || void 0 === n)
												)
													return p(f, g, b);
												for (r = new (void 0 === n ? y : n)(v(b - g, 0)), d = 0; g < b; g++, d++) g in f && u(r, d, f[g]);
												return (r.length = d), r;
											},
										}
									);
								},
								2707: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(1702),
										i = n(9662),
										s = n(7908),
										a = n(6244),
										l = n(5117),
										c = n(1340),
										u = n(7293),
										d = n(4362),
										f = n(9341),
										p = n(8886),
										h = n(256),
										m = n(7392),
										y = n(8008),
										v = [],
										g = o(v.sort),
										b = o(v.push),
										w = u(function () {
											v.sort(void 0);
										}),
										_ = u(function () {
											v.sort(null);
										}),
										x = f('sort'),
										k = !u(function () {
											if (m) return m < 70;
											if (!(p && p > 3)) {
												if (h) return !0;
												if (y) return y < 603;
												var e,
													t,
													n,
													r,
													o = '';
												for (e = 65; e < 76; e++) {
													switch (((t = String.fromCharCode(e)), e)) {
														case 66:
														case 69:
														case 70:
														case 72:
															n = 3;
															break;
														case 68:
														case 71:
															n = 4;
															break;
														default:
															n = 2;
													}
													for (r = 0; r < 47; r++) v.push({ k: t + r, v: n });
												}
												for (
													v.sort(function (e, t) {
														return t.v - e.v;
													}),
														r = 0;
													r < v.length;
													r++
												)
													(t = v[r].k.charAt(0)), o.charAt(o.length - 1) !== t && (o += t);
												return 'DGBEFHACIJK' !== o;
											}
										});
									r(
										{ target: 'Array', proto: !0, forced: w || !_ || !x || !k },
										{
											sort: function (e) {
												void 0 !== e && i(e);
												var t = s(this);
												if (k) return void 0 === e ? g(t) : g(t, e);
												var n,
													r,
													o = [],
													u = a(t);
												for (r = 0; r < u; r++) r in t && b(o, t[r]);
												for (
													d(
														o,
														(function (e) {
															return function (t, n) {
																return void 0 === n ? -1 : void 0 === t ? 1 : void 0 !== e ? +e(t, n) || 0 : c(t) > c(n) ? 1 : -1;
															};
														})(e)
													),
														n = o.length,
														r = 0;
													r < n;

												)
													t[r] = o[r++];
												for (; r < u; ) l(t, r++);
												return t;
											},
										}
									);
								},
								561: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(7908),
										i = n(1400),
										s = n(9303),
										a = n(6244),
										l = n(7207),
										c = n(5417),
										u = n(6135),
										d = n(5117),
										f = n(1194)('splice'),
										p = Math.max,
										h = Math.min;
									r(
										{ target: 'Array', proto: !0, forced: !f },
										{
											splice: function (e, t) {
												var n,
													r,
													f,
													m,
													y,
													v,
													g = o(this),
													b = a(g),
													w = i(e, b),
													_ = arguments.length;
												for (
													0 === _ ? (n = r = 0) : 1 === _ ? ((n = 0), (r = b - w)) : ((n = _ - 2), (r = h(p(s(t), 0), b - w))),
														l(b + n - r),
														f = c(g, r),
														m = 0;
													m < r;
													m++
												)
													(y = w + m) in g && u(f, m, g[y]);
												if (((f.length = r), n < r)) {
													for (m = w; m < b - r; m++) (v = m + n), (y = m + r) in g ? (g[v] = g[y]) : d(g, v);
													for (m = b; m > b - r + n; m--) d(g, m - 1);
												} else if (n > r) for (m = b - r; m > w; m--) (v = m + n - 1), (y = m + r - 1) in g ? (g[v] = g[y]) : d(g, v);
												for (m = 0; m < n; m++) g[m + w] = arguments[m + 2];
												return (g.length = b - r + n), f;
											},
										}
									);
								},
								8309: function (e, t, n) {
									var r = n(9781),
										o = n(6530).EXISTS,
										i = n(1702),
										s = n(3070).f,
										a = Function.prototype,
										l = i(a.toString),
										c = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,
										u = i(c.exec);
									r &&
										!o &&
										s(a, 'name', {
											configurable: !0,
											get: function () {
												try {
													return u(c, l(this))[1];
												} catch (e) {
													return '';
												}
											},
										});
								},
								8862: function (e, t, n) {
									var r = n(2109),
										o = n(5005),
										i = n(2104),
										s = n(6916),
										a = n(1702),
										l = n(7293),
										c = n(3157),
										u = n(614),
										d = n(111),
										f = n(2190),
										p = n(206),
										h = n(133),
										m = o('JSON', 'stringify'),
										y = a(/./.exec),
										v = a(''.charAt),
										g = a(''.charCodeAt),
										b = a(''.replace),
										w = a((1).toString),
										_ = /[\uD800-\uDFFF]/g,
										x = /^[\uD800-\uDBFF]$/,
										k = /^[\uDC00-\uDFFF]$/,
										C =
											!h ||
											l(function () {
												var e = o('Symbol')();
												return '[null]' != m([e]) || '{}' != m({ a: e }) || '{}' != m(Object(e));
											}),
										E = l(function () {
											return '"\\udf06\\ud834"' !== m('\udf06\ud834') || '"\\udead"' !== m('\udead');
										}),
										j = function (e, t) {
											var n = p(arguments),
												r = t;
											if ((d(t) || void 0 !== e) && !f(e))
												return (
													c(t) ||
														(t = function (e, t) {
															if ((u(r) && (t = s(r, this, e, t)), !f(t))) return t;
														}),
													(n[1] = t),
													i(m, null, n)
												);
										},
										S = function (e, t, n) {
											var r = v(n, t - 1),
												o = v(n, t + 1);
											return (y(x, e) && !y(k, o)) || (y(k, e) && !y(x, r)) ? '\\u' + w(g(e, 0), 16) : e;
										};
									m &&
										r(
											{ target: 'JSON', stat: !0, arity: 3, forced: C || E },
											{
												stringify: function (e, t, n) {
													var r = p(arguments),
														o = i(C ? j : m, null, r);
													return E && 'string' == typeof o ? b(o, _, S) : o;
												},
											}
										);
								},
								9653: function (e, t, n) {
									'use strict';
									var r = n(9781),
										o = n(7854),
										i = n(1702),
										s = n(4705),
										a = n(8052),
										l = n(2597),
										c = n(9587),
										u = n(7976),
										d = n(2190),
										f = n(7593),
										p = n(7293),
										h = n(8006).f,
										m = n(1236).f,
										y = n(3070).f,
										v = n(863),
										g = n(3111).trim,
										b = 'Number',
										w = o.Number,
										_ = w.prototype,
										x = o.TypeError,
										k = i(''.slice),
										C = i(''.charCodeAt),
										E = function (e) {
											var t = f(e, 'number');
											return 'bigint' == typeof t ? t : j(t);
										},
										j = function (e) {
											var t,
												n,
												r,
												o,
												i,
												s,
												a,
												l,
												c = f(e, 'number');
											if (d(c)) throw x('Cannot convert a Symbol value to a number');
											if ('string' == typeof c && c.length > 2)
												if (((c = g(c)), 43 === (t = C(c, 0)) || 45 === t)) {
													if (88 === (n = C(c, 2)) || 120 === n) return NaN;
												} else if (48 === t) {
													switch (C(c, 1)) {
														case 66:
														case 98:
															(r = 2), (o = 49);
															break;
														case 79:
														case 111:
															(r = 8), (o = 55);
															break;
														default:
															return +c;
													}
													for (s = (i = k(c, 2)).length, a = 0; a < s; a++) if ((l = C(i, a)) < 48 || l > o) return NaN;
													return parseInt(i, r);
												}
											return +c;
										};
									if (s(b, !w(' 0o1') || !w('0b1') || w('+0x1'))) {
										for (
											var S,
												D = function (e) {
													var t = arguments.length < 1 ? 0 : w(E(e)),
														n = this;
													return u(_, n) &&
														p(function () {
															v(n);
														})
														? c(Object(t), n, D)
														: t;
												},
												O = r
													? h(w)
													: 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range'.split(
															','
														),
												P = 0;
											O.length > P;
											P++
										)
											l(w, (S = O[P])) && !l(D, S) && y(D, S, m(w, S));
										(D.prototype = _), (_.constructor = D), a(o, b, D, { constructor: !0 });
									}
								},
								3161: function (e, t, n) {
									n(2109)({ target: 'Number', stat: !0 }, { isInteger: n(5988) });
								},
								9601: function (e, t, n) {
									var r = n(2109),
										o = n(1574);
									r({ target: 'Object', stat: !0, arity: 2, forced: Object.assign !== o }, { assign: o });
								},
								9595: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(9781),
										i = n(9026),
										s = n(9662),
										a = n(7908),
										l = n(3070);
									o &&
										r(
											{ target: 'Object', proto: !0, forced: i },
											{
												__defineGetter__: function (e, t) {
													l.f(a(this), e, { get: s(t), enumerable: !0, configurable: !0 });
												},
											}
										);
								},
								5003: function (e, t, n) {
									var r = n(2109),
										o = n(7293),
										i = n(5656),
										s = n(1236).f,
										a = n(9781),
										l = o(function () {
											s(1);
										});
									r(
										{ target: 'Object', stat: !0, forced: !a || l, sham: !a },
										{
											getOwnPropertyDescriptor: function (e, t) {
												return s(i(e), t);
											},
										}
									);
								},
								9337: function (e, t, n) {
									var r = n(2109),
										o = n(9781),
										i = n(3887),
										s = n(5656),
										a = n(1236),
										l = n(6135);
									r(
										{ target: 'Object', stat: !0, sham: !o },
										{
											getOwnPropertyDescriptors: function (e) {
												for (var t, n, r = s(e), o = a.f, c = i(r), u = {}, d = 0; c.length > d; ) void 0 !== (n = o(r, (t = c[d++]))) && l(u, t, n);
												return u;
											},
										}
									);
								},
								6210: function (e, t, n) {
									var r = n(2109),
										o = n(7293),
										i = n(1156).f;
									r(
										{
											target: 'Object',
											stat: !0,
											forced: o(function () {
												return !Object.getOwnPropertyNames(1);
											}),
										},
										{ getOwnPropertyNames: i }
									);
								},
								9660: function (e, t, n) {
									var r = n(2109),
										o = n(133),
										i = n(7293),
										s = n(5181),
										a = n(7908);
									r(
										{
											target: 'Object',
											stat: !0,
											forced:
												!o ||
												i(function () {
													s.f(1);
												}),
										},
										{
											getOwnPropertySymbols: function (e) {
												var t = s.f;
												return t ? t(a(e)) : [];
											},
										}
									);
								},
								7941: function (e, t, n) {
									var r = n(2109),
										o = n(7908),
										i = n(1956);
									r(
										{
											target: 'Object',
											stat: !0,
											forced: n(7293)(function () {
												i(1);
											}),
										},
										{
											keys: function (e) {
												return i(o(e));
											},
										}
									);
								},
								1539: function (e, t, n) {
									var r = n(1694),
										o = n(8052),
										i = n(288);
									r || o(Object.prototype, 'toString', i, { unsafe: !0 });
								},
								4603: function (e, t, n) {
									var r = n(9781),
										o = n(7854),
										i = n(1702),
										s = n(4705),
										a = n(9587),
										l = n(8880),
										c = n(8006).f,
										u = n(7976),
										d = n(7850),
										f = n(1340),
										p = n(4706),
										h = n(2999),
										m = n(2626),
										y = n(8052),
										v = n(7293),
										g = n(2597),
										b = n(9909).enforce,
										w = n(6340),
										_ = n(5112),
										x = n(9441),
										k = n(7168),
										C = _('match'),
										E = o.RegExp,
										j = E.prototype,
										S = o.SyntaxError,
										D = i(j.exec),
										O = i(''.charAt),
										P = i(''.replace),
										B = i(''.indexOf),
										M = i(''.slice),
										I = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,
										A = /a/g,
										T = /a/g,
										K = new E(A) !== A,
										L = h.MISSED_STICKY,
										R = h.UNSUPPORTED_Y;
									if (
										s(
											'RegExp',
											r &&
												(!K ||
													L ||
													x ||
													k ||
													v(function () {
														return (T[C] = !1), E(A) != A || E(T) == T || '/a/i' != E(A, 'i');
													}))
										)
									) {
										for (
											var N = function (e, t) {
													var n,
														r,
														o,
														i,
														s,
														c,
														h = u(j, this),
														m = d(e),
														y = void 0 === t,
														v = [],
														w = e;
													if (!h && m && y && e.constructor === N) return e;
													if (
														((m || u(j, e)) && ((e = e.source), y && (t = p(w))),
														(e = void 0 === e ? '' : f(e)),
														(t = void 0 === t ? '' : f(t)),
														(w = e),
														x && ('dotAll' in A) && (r = !!t && B(t, 's') > -1) && (t = P(t, /s/g, '')),
														(n = t),
														L && ('sticky' in A) && (o = !!t && B(t, 'y') > -1) && R && (t = P(t, /y/g, '')),
														k &&
															((e = (i = (function (e) {
																for (var t, n = e.length, r = 0, o = '', i = [], s = {}, a = !1, l = !1, c = 0, u = ''; r <= n; r++) {
																	if ('\\' === (t = O(e, r))) t += O(e, ++r);
																	else if (']' === t) a = !1;
																	else if (!a)
																		switch (!0) {
																			case '[' === t:
																				a = !0;
																				break;
																			case '(' === t:
																				D(I, M(e, r + 1)) && ((r += 2), (l = !0)), (o += t), c++;
																				continue;
																			case '>' === t && l:
																				if ('' === u || g(s, u)) throw new S('Invalid capture group name');
																				(s[u] = !0), (i[i.length] = [u, c]), (l = !1), (u = '');
																				continue;
																		}
																	l ? (u += t) : (o += t);
																}
																return [o, i];
															})(e))[0]),
															(v = i[1])),
														(s = a(E(e, t), h ? this : j, N)),
														(r || o || v.length) &&
															((c = b(s)),
															r &&
																((c.dotAll = !0),
																(c.raw = N(
																	(function (e) {
																		for (var t, n = e.length, r = 0, o = '', i = !1; r <= n; r++)
																			'\\' !== (t = O(e, r))
																				? i || '.' !== t
																					? ('[' === t ? (i = !0) : ']' === t && (i = !1), (o += t))
																					: (o += '[\\s\\S]')
																				: (o += t + O(e, ++r));
																		return o;
																	})(e),
																	n
																))),
															o && (c.sticky = !0),
															v.length && (c.groups = v)),
														e !== w)
													)
														try {
															l(s, 'source', '' === w ? '(?:)' : w);
														} catch (e) {}
													return s;
												},
												z = c(E),
												F = 0;
											z.length > F;

										)
											m(N, E, z[F++]);
										(j.constructor = N), (N.prototype = j), y(o, 'RegExp', N, { constructor: !0 });
									}
									w('RegExp');
								},
								4916: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(2261);
									r({ target: 'RegExp', proto: !0, forced: /./.exec !== o }, { exec: o });
								},
								9714: function (e, t, n) {
									'use strict';
									var r = n(6530).PROPER,
										o = n(8052),
										i = n(9670),
										s = n(1340),
										a = n(7293),
										l = n(4706),
										c = 'toString',
										u = RegExp.prototype.toString,
										d = a(function () {
											return '/a/b' != u.call({ source: 'a', flags: 'b' });
										}),
										f = r && u.name != c;
									(d || f) &&
										o(
											RegExp.prototype,
											c,
											function () {
												var e = i(this);
												return '/' + s(e.source) + '/' + s(l(e));
											},
											{ unsafe: !0 }
										);
								},
								2023: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(1702),
										i = n(3929),
										s = n(4488),
										a = n(1340),
										l = n(4964),
										c = o(''.indexOf);
									r(
										{ target: 'String', proto: !0, forced: !l('includes') },
										{
											includes: function (e) {
												return !!~c(a(s(this)), a(i(e)), arguments.length > 1 ? arguments[1] : void 0);
											},
										}
									);
								},
								8783: function (e, t, n) {
									'use strict';
									var r = n(8710).charAt,
										o = n(1340),
										i = n(9909),
										s = n(654),
										a = 'String Iterator',
										l = i.set,
										c = i.getterFor(a);
									s(
										String,
										'String',
										function (e) {
											l(this, { type: a, string: o(e), index: 0 });
										},
										function () {
											var e,
												t = c(this),
												n = t.string,
												o = t.index;
											return o >= n.length ? { value: void 0, done: !0 } : ((e = r(n, o)), (t.index += e.length), { value: e, done: !1 });
										}
									);
								},
								6373: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(6916),
										i = n(1702),
										s = n(4994),
										a = n(4488),
										l = n(7466),
										c = n(1340),
										u = n(9670),
										d = n(4326),
										f = n(7850),
										p = n(4706),
										h = n(8173),
										m = n(8052),
										y = n(7293),
										v = n(5112),
										g = n(6707),
										b = n(1530),
										w = n(7651),
										_ = n(9909),
										x = n(1913),
										k = v('matchAll'),
										C = 'RegExp String Iterator',
										E = _.set,
										j = _.getterFor(C),
										S = RegExp.prototype,
										D = TypeError,
										O = i(''.indexOf),
										P = i(''.matchAll),
										B =
											!!P &&
											!y(function () {
												P('a', /./);
											}),
										M = s(
											function (e, t, n, r) {
												E(this, { type: C, regexp: e, string: t, global: n, unicode: r, done: !1 });
											},
											'RegExp String',
											function () {
												var e = j(this);
												if (e.done) return { value: void 0, done: !0 };
												var t = e.regexp,
													n = e.string,
													r = w(t, n);
												return null === r
													? { value: void 0, done: (e.done = !0) }
													: e.global
														? ('' === c(r[0]) && (t.lastIndex = b(n, l(t.lastIndex), e.unicode)), { value: r, done: !1 })
														: ((e.done = !0), { value: r, done: !1 });
											}
										),
										I = function (e) {
											var t,
												n,
												r,
												o = u(this),
												i = c(e),
												s = g(o, RegExp),
												a = c(p(o));
											return (
												(t = new s(s === RegExp ? o.source : o, a)),
												(n = !!~O(a, 'g')),
												(r = !!~O(a, 'u')),
												(t.lastIndex = l(o.lastIndex)),
												new M(t, i, n, r)
											);
										};
									r(
										{ target: 'String', proto: !0, forced: B },
										{
											matchAll: function (e) {
												var t,
													n,
													r,
													i,
													s = a(this);
												if (null != e) {
													if (f(e) && ((t = c(a(p(e)))), !~O(t, 'g'))) throw D('`.matchAll` does not allow non-global regexes');
													if (B) return P(s, e);
													if ((void 0 === (r = h(e, k)) && x && 'RegExp' == d(e) && (r = I), r)) return o(r, e, s);
												} else if (B) return P(s, e);
												return (n = c(s)), (i = new RegExp(e, 'g')), x ? o(I, i, n) : i[k](n);
											},
										}
									),
										x || k in S || m(S, k, I);
								},
								4723: function (e, t, n) {
									'use strict';
									var r = n(6916),
										o = n(7007),
										i = n(9670),
										s = n(7466),
										a = n(1340),
										l = n(4488),
										c = n(8173),
										u = n(1530),
										d = n(7651);
									o('match', function (e, t, n) {
										return [
											function (t) {
												var n = l(this),
													o = null == t ? void 0 : c(t, e);
												return o ? r(o, t, n) : new RegExp(t)[e](a(n));
											},
											function (e) {
												var r = i(this),
													o = a(e),
													l = n(t, r, o);
												if (l.done) return l.value;
												if (!r.global) return d(r, o);
												var c = r.unicode;
												r.lastIndex = 0;
												for (var f, p = [], h = 0; null !== (f = d(r, o)); ) {
													var m = a(f[0]);
													(p[h] = m), '' === m && (r.lastIndex = u(o, s(r.lastIndex), c)), h++;
												}
												return 0 === h ? null : p;
											},
										];
									});
								},
								5306: function (e, t, n) {
									'use strict';
									var r = n(2104),
										o = n(6916),
										i = n(1702),
										s = n(7007),
										a = n(7293),
										l = n(9670),
										c = n(614),
										u = n(9303),
										d = n(7466),
										f = n(1340),
										p = n(4488),
										h = n(1530),
										m = n(8173),
										y = n(647),
										v = n(7651),
										g = n(5112)('replace'),
										b = Math.max,
										w = Math.min,
										_ = i([].concat),
										x = i([].push),
										k = i(''.indexOf),
										C = i(''.slice),
										E = '$0' === 'a'.replace(/./, '$0'),
										j = !!/./[g] && '' === /./[g]('a', '$0');
									s(
										'replace',
										function (e, t, n) {
											var i = j ? '$' : '$0';
											return [
												function (e, n) {
													var r = p(this),
														i = null == e ? void 0 : m(e, g);
													return i ? o(i, e, r, n) : o(t, f(r), e, n);
												},
												function (e, o) {
													var s = l(this),
														a = f(e);
													if ('string' == typeof o && -1 === k(o, i) && -1 === k(o, '$<')) {
														var p = n(t, s, a, o);
														if (p.done) return p.value;
													}
													var m = c(o);
													m || (o = f(o));
													var g = s.global;
													if (g) {
														var E = s.unicode;
														s.lastIndex = 0;
													}
													for (var j = []; ; ) {
														var S = v(s, a);
														if (null === S) break;
														if ((x(j, S), !g)) break;
														'' === f(S[0]) && (s.lastIndex = h(a, d(s.lastIndex), E));
													}
													for (var D, O = '', P = 0, B = 0; B < j.length; B++) {
														for (var M = f((S = j[B])[0]), I = b(w(u(S.index), a.length), 0), A = [], T = 1; T < S.length; T++)
															x(A, void 0 === (D = S[T]) ? D : String(D));
														var K = S.groups;
														if (m) {
															var L = _([M], A, I, a);
															void 0 !== K && x(L, K);
															var R = f(r(o, void 0, L));
														} else R = y(M, a, I, A, K, o);
														I >= P && ((O += C(a, P, I) + R), (P = I + M.length));
													}
													return O + C(a, P);
												},
											];
										},
										!!a(function () {
											var e = /./;
											return (
												(e.exec = function () {
													var e = [];
													return (e.groups = { a: '7' }), e;
												}),
												'7' !== ''.replace(e, '$<a>')
											);
										}) ||
											!E ||
											j
									);
								},
								3123: function (e, t, n) {
									'use strict';
									var r = n(2104),
										o = n(6916),
										i = n(1702),
										s = n(7007),
										a = n(7850),
										l = n(9670),
										c = n(4488),
										u = n(6707),
										d = n(1530),
										f = n(7466),
										p = n(1340),
										h = n(8173),
										m = n(1589),
										y = n(7651),
										v = n(2261),
										g = n(2999),
										b = n(7293),
										w = g.UNSUPPORTED_Y,
										_ = 4294967295,
										x = Math.min,
										k = [].push,
										C = i(/./.exec),
										E = i(k),
										j = i(''.slice);
									s(
										'split',
										function (e, t, n) {
											var i;
											return (
												(i =
													'c' == 'abbc'.split(/(b)*/)[1] ||
													4 != 'test'.split(/(?:)/, -1).length ||
													2 != 'ab'.split(/(?:ab)*/).length ||
													4 != '.'.split(/(.?)(.?)/).length ||
													'.'.split(/()()/).length > 1 ||
													''.split(/.?/).length
														? function (e, n) {
																var i = p(c(this)),
																	s = void 0 === n ? _ : n >>> 0;
																if (0 === s) return [];
																if (void 0 === e) return [i];
																if (!a(e)) return o(t, i, e, s);
																for (
																	var l,
																		u,
																		d,
																		f = [],
																		h = (e.ignoreCase ? 'i' : '') + (e.multiline ? 'm' : '') + (e.unicode ? 'u' : '') + (e.sticky ? 'y' : ''),
																		y = 0,
																		g = new RegExp(e.source, h + 'g');
																	(l = o(v, g, i)) &&
																	!(
																		(u = g.lastIndex) > y &&
																		(E(f, j(i, y, l.index)),
																		l.length > 1 && l.index < i.length && r(k, f, m(l, 1)),
																		(d = l[0].length),
																		(y = u),
																		f.length >= s)
																	);

																)
																	g.lastIndex === l.index && g.lastIndex++;
																return y === i.length ? (!d && C(g, '')) || E(f, '') : E(f, j(i, y)), f.length > s ? m(f, 0, s) : f;
															}
														: '0'.split(void 0, 0).length
															? function (e, n) {
																	return void 0 === e && 0 === n ? [] : o(t, this, e, n);
																}
															: t),
												[
													function (t, n) {
														var r = c(this),
															s = null == t ? void 0 : h(t, e);
														return s ? o(s, t, r, n) : o(i, p(r), t, n);
													},
													function (e, r) {
														var o = l(this),
															s = p(e),
															a = n(i, o, s, r, i !== t);
														if (a.done) return a.value;
														var c = u(o, RegExp),
															h = o.unicode,
															m = (o.ignoreCase ? 'i' : '') + (o.multiline ? 'm' : '') + (o.unicode ? 'u' : '') + (w ? 'g' : 'y'),
															v = new c(w ? '^(?:' + o.source + ')' : o, m),
															g = void 0 === r ? _ : r >>> 0;
														if (0 === g) return [];
														if (0 === s.length) return null === y(v, s) ? [s] : [];
														for (var b = 0, k = 0, C = []; k < s.length; ) {
															v.lastIndex = w ? 0 : k;
															var S,
																D = y(v, w ? j(s, k) : s);
															if (null === D || (S = x(f(v.lastIndex + (w ? k : 0)), s.length)) === b) k = d(s, k, h);
															else {
																if ((E(C, j(s, b, k)), C.length === g)) return C;
																for (var O = 1; O <= D.length - 1; O++) if ((E(C, D[O]), C.length === g)) return C;
																k = b = S;
															}
														}
														return E(C, j(s, b)), C;
													},
												]
											);
										},
										!!b(function () {
											var e = /(?:)/,
												t = e.exec;
											e.exec = function () {
												return t.apply(this, arguments);
											};
											var n = 'ab'.split(e);
											return 2 !== n.length || 'a' !== n[0] || 'b' !== n[1];
										}),
										w
									);
								},
								3210: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(3111).trim;
									r(
										{ target: 'String', proto: !0, forced: n(6091)('trim') },
										{
											trim: function () {
												return o(this);
											},
										}
									);
								},
								4032: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(7854),
										i = n(6916),
										s = n(1702),
										a = n(1913),
										l = n(9781),
										c = n(133),
										u = n(7293),
										d = n(2597),
										f = n(7976),
										p = n(9670),
										h = n(5656),
										m = n(4948),
										y = n(1340),
										v = n(9114),
										g = n(30),
										b = n(1956),
										w = n(8006),
										_ = n(1156),
										x = n(5181),
										k = n(1236),
										C = n(3070),
										E = n(6048),
										j = n(5296),
										S = n(8052),
										D = n(2309),
										O = n(6200),
										P = n(3501),
										B = n(9711),
										M = n(5112),
										I = n(6061),
										A = n(7235),
										T = n(6532),
										K = n(8003),
										L = n(9909),
										R = n(2092).forEach,
										N = O('hidden'),
										z = 'Symbol',
										F = L.set,
										U = L.getterFor(z),
										H = Object.prototype,
										V = o.Symbol,
										q = V && V.prototype,
										W = o.TypeError,
										G = o.QObject,
										Y = k.f,
										X = C.f,
										$ = _.f,
										J = j.f,
										Q = s([].push),
										Z = D('symbols'),
										ee = D('op-symbols'),
										te = D('wks'),
										ne = !G || !G.prototype || !G.prototype.findChild,
										re =
											l &&
											u(function () {
												return (
													7 !=
													g(
														X({}, 'a', {
															get: function () {
																return X(this, 'a', { value: 7 }).a;
															},
														})
													).a
												);
											})
												? function (e, t, n) {
														var r = Y(H, t);
														r && delete H[t], X(e, t, n), r && e !== H && X(H, t, r);
													}
												: X,
										oe = function (e, t) {
											var n = (Z[e] = g(q));
											return F(n, { type: z, tag: e, description: t }), l || (n.description = t), n;
										},
										ie = function (e, t, n) {
											e === H && ie(ee, t, n), p(e);
											var r = m(t);
											return (
												p(n),
												d(Z, r)
													? (n.enumerable
															? (d(e, N) && e[N][r] && (e[N][r] = !1), (n = g(n, { enumerable: v(0, !1) })))
															: (d(e, N) || X(e, N, v(1, {})), (e[N][r] = !0)),
														re(e, r, n))
													: X(e, r, n)
											);
										},
										se = function (e, t) {
											p(e);
											var n = h(t),
												r = b(n).concat(ue(n));
											return (
												R(r, function (t) {
													(l && !i(ae, n, t)) || ie(e, t, n[t]);
												}),
												e
											);
										},
										ae = function (e) {
											var t = m(e),
												n = i(J, this, t);
											return !(this === H && d(Z, t) && !d(ee, t)) && (!(n || !d(this, t) || !d(Z, t) || (d(this, N) && this[N][t])) || n);
										},
										le = function (e, t) {
											var n = h(e),
												r = m(t);
											if (n !== H || !d(Z, r) || d(ee, r)) {
												var o = Y(n, r);
												return !o || !d(Z, r) || (d(n, N) && n[N][r]) || (o.enumerable = !0), o;
											}
										},
										ce = function (e) {
											var t = $(h(e)),
												n = [];
											return (
												R(t, function (e) {
													d(Z, e) || d(P, e) || Q(n, e);
												}),
												n
											);
										},
										ue = function (e) {
											var t = e === H,
												n = $(t ? ee : h(e)),
												r = [];
											return (
												R(n, function (e) {
													!d(Z, e) || (t && !d(H, e)) || Q(r, Z[e]);
												}),
												r
											);
										};
									c ||
										(S(
											(q = (V = function () {
												if (f(q, this)) throw W('Symbol is not a constructor');
												var e = arguments.length && void 0 !== arguments[0] ? y(arguments[0]) : void 0,
													t = B(e),
													n = function (e) {
														this === H && i(n, ee, e), d(this, N) && d(this[N], t) && (this[N][t] = !1), re(this, t, v(1, e));
													};
												return l && ne && re(H, t, { configurable: !0, set: n }), oe(t, e);
											}).prototype),
											'toString',
											function () {
												return U(this).tag;
											}
										),
										S(V, 'withoutSetter', function (e) {
											return oe(B(e), e);
										}),
										(j.f = ae),
										(C.f = ie),
										(E.f = se),
										(k.f = le),
										(w.f = _.f = ce),
										(x.f = ue),
										(I.f = function (e) {
											return oe(M(e), e);
										}),
										l &&
											(X(q, 'description', {
												configurable: !0,
												get: function () {
													return U(this).description;
												},
											}),
											a || S(H, 'propertyIsEnumerable', ae, { unsafe: !0 }))),
										r({ global: !0, constructor: !0, wrap: !0, forced: !c, sham: !c }, { Symbol: V }),
										R(b(te), function (e) {
											A(e);
										}),
										r(
											{ target: z, stat: !0, forced: !c },
											{
												useSetter: function () {
													ne = !0;
												},
												useSimple: function () {
													ne = !1;
												},
											}
										),
										r(
											{ target: 'Object', stat: !0, forced: !c, sham: !l },
											{
												create: function (e, t) {
													return void 0 === t ? g(e) : se(g(e), t);
												},
												defineProperty: ie,
												defineProperties: se,
												getOwnPropertyDescriptor: le,
											}
										),
										r({ target: 'Object', stat: !0, forced: !c }, { getOwnPropertyNames: ce }),
										T(),
										K(V, z),
										(P[N] = !0);
								},
								1817: function (e, t, n) {
									'use strict';
									var r = n(2109),
										o = n(9781),
										i = n(7854),
										s = n(1702),
										a = n(2597),
										l = n(614),
										c = n(7976),
										u = n(1340),
										d = n(3070).f,
										f = n(9920),
										p = i.Symbol,
										h = p && p.prototype;
									if (o && l(p) && (!('description' in h) || void 0 !== p().description)) {
										var m = {},
											y = function () {
												var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : u(arguments[0]),
													t = c(h, this) ? new p(e) : void 0 === e ? p() : p(e);
												return '' === e && (m[t] = !0), t;
											};
										f(y, p), (y.prototype = h), (h.constructor = y);
										var v = 'Symbol(test)' == String(p('test')),
											g = s(h.toString),
											b = s(h.valueOf),
											w = /^Symbol\((.*)\)[^)]+$/,
											_ = s(''.replace),
											x = s(''.slice);
										d(h, 'description', {
											configurable: !0,
											get: function () {
												var e = b(this),
													t = g(e);
												if (a(m, e)) return '';
												var n = v ? x(t, 7, -1) : _(t, w, '$1');
												return '' === n ? void 0 : n;
											},
										}),
											r({ global: !0, constructor: !0, forced: !0 }, { Symbol: y });
									}
								},
								763: function (e, t, n) {
									var r = n(2109),
										o = n(5005),
										i = n(2597),
										s = n(1340),
										a = n(2309),
										l = n(735),
										c = a('string-to-symbol-registry'),
										u = a('symbol-to-string-registry');
									r(
										{ target: 'Symbol', stat: !0, forced: !l },
										{
											for: function (e) {
												var t = s(e);
												if (i(c, t)) return c[t];
												var n = o('Symbol')(t);
												return (c[t] = n), (u[n] = t), n;
											},
										}
									);
								},
								2165: function (e, t, n) {
									n(7235)('iterator');
								},
								2526: function (e, t, n) {
									n(4032), n(763), n(6620), n(8862), n(9660);
								},
								6620: function (e, t, n) {
									var r = n(2109),
										o = n(2597),
										i = n(2190),
										s = n(6330),
										a = n(2309),
										l = n(735),
										c = a('symbol-to-string-registry');
									r(
										{ target: 'Symbol', stat: !0, forced: !l },
										{
											keyFor: function (e) {
												if (!i(e)) throw TypeError(s(e) + ' is not a symbol');
												if (o(c, e)) return c[e];
											},
										}
									);
								},
								3728: function (e, t, n) {
									n(6373);
								},
								4747: function (e, t, n) {
									var r = n(7854),
										o = n(8324),
										i = n(8509),
										s = n(8533),
										a = n(8880),
										l = function (e) {
											if (e && e.forEach !== s)
												try {
													a(e, 'forEach', s);
												} catch (t) {
													e.forEach = s;
												}
										};
									for (var c in o) o[c] && l(r[c] && r[c].prototype);
									l(i);
								},
								3948: function (e, t, n) {
									var r = n(7854),
										o = n(8324),
										i = n(8509),
										s = n(6992),
										a = n(8880),
										l = n(5112),
										c = l('iterator'),
										u = l('toStringTag'),
										d = s.values,
										f = function (e, t) {
											if (e) {
												if (e[c] !== d)
													try {
														a(e, c, d);
													} catch (t) {
														e[c] = d;
													}
												if ((e[u] || a(e, u, t), o[t]))
													for (var n in s)
														if (e[n] !== s[n])
															try {
																a(e, n, s[n]);
															} catch (t) {
																e[n] = s[n];
															}
											}
										};
									for (var p in o) f(r[p] && r[p].prototype, p);
									f(i, 'DOMTokenList');
								},
							},
							t = {};
						function n(r) {
							var o = t[r];
							if (void 0 !== o) return o.exports;
							var i = (t[r] = { exports: {} });
							return e[r](i, i.exports, n), i.exports;
						}
						(n.d = function (e, t) {
							for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
						}),
							(n.g = (function () {
								if ('object' == typeof globalThis) return globalThis;
								try {
									return this || new Function('return this')();
								} catch (e) {
									if ('object' == typeof window) return window;
								}
							})()),
							(n.o = function (e, t) {
								return Object.prototype.hasOwnProperty.call(e, t);
							}),
							(n.r = function (e) {
								'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
									Object.defineProperty(e, '__esModule', { value: !0 });
							});
						var r = {};
						return (
							(function () {
								'use strict';
								function e(e) {
									return (
										(function (e) {
											if (Array.isArray(e)) return o(e);
										})(e) ||
										(function (e) {
											if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
										})(e) ||
										t(e) ||
										(function () {
											throw new TypeError(
												'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
											);
										})()
									);
								}
								function t(e, t) {
									if (e) {
										if ('string' == typeof e) return o(e, t);
										var n = Object.prototype.toString.call(e).slice(8, -1);
										return (
											'Object' === n && e.constructor && (n = e.constructor.name),
											'Map' === n || 'Set' === n ? Array.from(e) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
										);
									}
								}
								function o(e, t) {
									(null == t || t > e.length) && (t = e.length);
									for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
									return r;
								}
								function i(e) {
									return (i =
										'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
											? function (e) {
													return typeof e;
												}
											: function (e) {
													return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
												})(e);
								}
								function s(e, t) {
									for (var n = 0; n < t.length; n++) {
										var r = t[n];
										(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
									}
								}
								function a(e, t, n) {
									return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
								}
								n.r(r),
									n.d(r, {
										default: function () {
											return v;
										},
									}),
									n(3210),
									n(4916),
									n(5306),
									n(2772),
									n(8309),
									n(3123),
									n(1539),
									n(9714),
									n(561),
									n(9600),
									n(9595),
									n(7042),
									'undefined' == typeof Element ||
										'remove' in Element.prototype ||
										(Element.prototype.remove = function () {
											this.parentNode && this.parentNode.removeChild(this);
										}),
									'undefined' != typeof self &&
										'document' in self &&
										((!('classList' in document.createElement('_')) ||
											(document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g')))) &&
											(function (e) {
												if ('Element' in e) {
													var t = 'classList',
														n = e.Element.prototype,
														r = Object,
														o =
															String.prototype.trim ||
															function () {
																return this.replace(/^\s+|\s+$/g, '');
															},
														i =
															Array.prototype.indexOf ||
															function (e) {
																for (var t = 0, n = this.length; t < n; t++) if (t in this && this[t] === e) return t;
																return -1;
															},
														s = function (e, t) {
															(this.name = e), (this.code = DOMException[e]), (this.message = t);
														},
														a = function (e, t) {
															if ('' === t) throw new s('SYNTAX_ERR', 'The token must not be empty.');
															if (/\s/.test(t)) throw new s('INVALID_CHARACTER_ERR', 'The token must not contain space characters.');
															return i.call(e, t);
														},
														l = function (e) {
															for (var t = o.call(e.getAttribute('class') || ''), n = t ? t.split(/\s+/) : [], r = 0, i = n.length; r < i; r++)
																this.push(n[r]);
															this._updateClassName = function () {
																e.setAttribute('class', this.toString());
															};
														},
														c = (l.prototype = []),
														u = function () {
															return new l(this);
														};
													if (
														((s.prototype = Error.prototype),
														(c.item = function (e) {
															return this[e] || null;
														}),
														(c.contains = function (e) {
															return ~a(this, e + '');
														}),
														(c.add = function () {
															var e,
																t = arguments,
																n = 0,
																r = t.length,
																o = !1;
															do {
																(e = t[n] + ''), ~a(this, e) || (this.push(e), (o = !0));
															} while (++n < r);
															o && this._updateClassName();
														}),
														(c.remove = function () {
															var e,
																t,
																n = arguments,
																r = 0,
																o = n.length,
																i = !1;
															do {
																for (e = n[r] + '', t = a(this, e); ~t; ) this.splice(t, 1), (i = !0), (t = a(this, e));
															} while (++r < o);
															i && this._updateClassName();
														}),
														(c.toggle = function (e, t) {
															var n = this.contains(e),
																r = n ? !0 !== t && 'remove' : !1 !== t && 'add';
															return r && this[r](e), !0 === t || !1 === t ? t : !n;
														}),
														(c.replace = function (e, t) {
															var n = a(e + '');
															~n && (this.splice(n, 1, t), this._updateClassName());
														}),
														(c.toString = function () {
															return this.join(' ');
														}),
														r.defineProperty)
													) {
														var d = { get: u, enumerable: !0, configurable: !0 };
														try {
															r.defineProperty(n, t, d);
														} catch (e) {
															(void 0 !== e.number && -2146823252 !== e.number) || ((d.enumerable = !1), r.defineProperty(n, t, d));
														}
													} else r.prototype.__defineGetter__ && n.__defineGetter__(t, u);
												}
											})(self),
										(function () {
											var e = document.createElement('_');
											if ((e.classList.add('c1', 'c2'), !e.classList.contains('c2'))) {
												var t = function (e) {
													var t = DOMTokenList.prototype[e];
													DOMTokenList.prototype[e] = function (e) {
														var n,
															r = arguments.length;
														for (n = 0; n < r; n++) (e = arguments[n]), t.call(this, e);
													};
												};
												t('add'), t('remove');
											}
											if ((e.classList.toggle('c3', !1), e.classList.contains('c3'))) {
												var n = DOMTokenList.prototype.toggle;
												DOMTokenList.prototype.toggle = function (e, t) {
													return 1 in arguments && !this.contains(e) == !t ? t : n.call(this, e);
												};
											}
											'replace' in document.createElement('_').classList ||
												(DOMTokenList.prototype.replace = function (e, t) {
													var n = this.toString().split(' '),
														r = n.indexOf(e + '');
													~r && ((n = n.slice(r)), this.remove.apply(this, n), this.add(t), this.add.apply(this, n.slice(1)));
												}),
												(e = null);
										})()),
									n(7327),
									n(2222),
									n(7941),
									n(4603),
									n(3728),
									n(2707),
									n(6699),
									n(2023),
									n(4747),
									n(9601),
									n(1249),
									n(1038),
									n(8783),
									n(2526),
									n(5003),
									n(9337),
									n(1817),
									n(2165),
									n(6992),
									n(3948),
									n(3161),
									n(9653),
									n(4723),
									n(5827),
									n(6210);
								var l = (function () {
									function n(e) {
										var t = e.getOptions,
											r = e.getCaretPosition,
											o = e.getCaretPositionEnd,
											i = e.dispatch;
										!(function (e, t) {
											if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
										})(this, n),
											a(this, 'isStandardButton', function (e) {
												return e && !('{' === e[0] && '}' === e[e.length - 1]);
											}),
											(this.getOptions = t),
											(this.getCaretPosition = r),
											(this.getCaretPositionEnd = o),
											(this.dispatch = i),
											n.bindMethods(n, this);
									}
									var r, o, l;
									return (
										(r = n),
										(l = [
											{
												key: 'bindMethods',
												value: function (e, n) {
													var r,
														o = (function (e, n) {
															var r = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
															if (!r) {
																if (Array.isArray(e) || (r = t(e))) {
																	r && (e = r);
																	var o = 0,
																		i = function () {};
																	return {
																		s: i,
																		n: function () {
																			return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] };
																		},
																		e: function (e) {
																			throw e;
																		},
																		f: i,
																	};
																}
																throw new TypeError(
																	'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
																);
															}
															var s,
																a = !0,
																l = !1;
															return {
																s: function () {
																	r = r.call(e);
																},
																n: function () {
																	var e = r.next();
																	return (a = e.done), e;
																},
																e: function (e) {
																	(l = !0), (s = e);
																},
																f: function () {
																	try {
																		a || null == r.return || r.return();
																	} finally {
																		if (l) throw s;
																	}
																},
															};
														})(Object.getOwnPropertyNames(e.prototype));
													try {
														for (o.s(); !(r = o.n()).done; ) {
															var i = r.value;
															'constructor' === i || 'bindMethods' === i || (n[i] = n[i].bind(n));
														}
													} catch (e) {
														o.e(e);
													} finally {
														o.f();
													}
												},
											},
										]),
										(o = [
											{
												key: 'getButtonType',
												value: function (e) {
													return e.includes('{') && e.includes('}') && '{//}' !== e ? 'functionBtn' : 'standardBtn';
												},
											},
											{
												key: 'getButtonClass',
												value: function (e) {
													var t = this.getButtonType(e),
														n = e.replace('{', '').replace('}', ''),
														r = '';
													return 'standardBtn' !== t && (r = ' hg-button-'.concat(n)), 'hg-'.concat(t).concat(r);
												},
											},
											{
												key: 'getDefaultDiplay',
												value: function () {
													return {
														'{bksp}': 'backspace',
														'{backspace}': 'backspace',
														'{enter}': '< enter',
														'{shift}': 'shift',
														'{shiftleft}': 'shift',
														'{shiftright}': 'shift',
														'{alt}': 'alt',
														'{s}': 'shift',
														'{tab}': 'tab',
														'{lock}': 'caps',
														'{capslock}': 'caps',
														'{accept}': 'Submit',
														'{space}': ' ',
														'{//}': ' ',
														'{esc}': 'esc',
														'{escape}': 'esc',
														'{f1}': 'f1',
														'{f2}': 'f2',
														'{f3}': 'f3',
														'{f4}': 'f4',
														'{f5}': 'f5',
														'{f6}': 'f6',
														'{f7}': 'f7',
														'{f8}': 'f8',
														'{f9}': 'f9',
														'{f10}': 'f10',
														'{f11}': 'f11',
														'{f12}': 'f12',
														'{numpaddivide}': '/',
														'{numlock}': 'lock',
														'{arrowup}': '↑',
														'{arrowleft}': '←',
														'{arrowdown}': '↓',
														'{arrowright}': '→',
														'{prtscr}': 'print',
														'{scrolllock}': 'scroll',
														'{pause}': 'pause',
														'{insert}': 'ins',
														'{home}': 'home',
														'{pageup}': 'up',
														'{delete}': 'del',
														'{forwarddelete}': 'del',
														'{end}': 'end',
														'{pagedown}': 'down',
														'{numpadmultiply}': '*',
														'{numpadsubtract}': '-',
														'{numpadadd}': '+',
														'{numpadenter}': 'enter',
														'{period}': '.',
														'{numpaddecimal}': '.',
														'{numpad0}': '0',
														'{numpad1}': '1',
														'{numpad2}': '2',
														'{numpad3}': '3',
														'{numpad4}': '4',
														'{numpad5}': '5',
														'{numpad6}': '6',
														'{numpad7}': '7',
														'{numpad8}': '8',
														'{numpad9}': '9',
													};
												},
											},
											{
												key: 'getButtonDisplayName',
												value: function (e, t, n) {
													return (t = n ? Object.assign({}, this.getDefaultDiplay(), t) : t || this.getDefaultDiplay())[e] || e;
												},
											},
											{
												key: 'getUpdatedInput',
												value: function (e, t, n) {
													var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : n,
														o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
														i = this.getOptions(),
														s = [n, r, o],
														a = t;
													return (
														('{bksp}' === e || '{backspace}' === e) && a.length > 0
															? (a = this.removeAt.apply(this, [a].concat(s)))
															: ('{delete}' === e || '{forwarddelete}' === e) && a.length > 0
																? (a = this.removeForwardsAt.apply(this, [a].concat(s)))
																: '{space}' === e
																	? (a = this.addStringAt.apply(this, [a, ' '].concat(s)))
																	: '{tab}' !== e || ('boolean' == typeof i.tabCharOnTab && !1 === i.tabCharOnTab)
																		? ('{enter}' !== e && '{numpadenter}' !== e) || !i.newLineOnEnter
																			? e.includes('numpad') && Number.isInteger(Number(e[e.length - 2]))
																				? (a = this.addStringAt.apply(this, [a, e[e.length - 2]].concat(s)))
																				: '{numpaddivide}' === e
																					? (a = this.addStringAt.apply(this, [a, '/'].concat(s)))
																					: '{numpadmultiply}' === e
																						? (a = this.addStringAt.apply(this, [a, '*'].concat(s)))
																						: '{numpadsubtract}' === e
																							? (a = this.addStringAt.apply(this, [a, '-'].concat(s)))
																							: '{numpadadd}' === e
																								? (a = this.addStringAt.apply(this, [a, '+'].concat(s)))
																								: '{numpaddecimal}' === e
																									? (a = this.addStringAt.apply(this, [a, '.'].concat(s)))
																									: '{' === e || '}' === e
																										? (a = this.addStringAt.apply(this, [a, e].concat(s)))
																										: e.includes('{') ||
																											e.includes('}') ||
																											(a = this.addStringAt.apply(this, [a, e].concat(s)))
																			: (a = this.addStringAt.apply(this, [a, '\n'].concat(s)))
																		: (a = this.addStringAt.apply(this, [a, '\t'].concat(s))),
														a
													);
												},
											},
											{
												key: 'updateCaretPos',
												value: function (e) {
													var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
														n = this.updateCaretPosAction(e, t);
													this.dispatch(function (e) {
														e.setCaretPosition(n);
													});
												},
											},
											{
												key: 'updateCaretPosAction',
												value: function (e) {
													var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
														n = this.getOptions(),
														r = this.getCaretPosition();
													return null != r && (t ? r > 0 && (r -= e) : (r += e)), n.debug && console.log('Caret at:', r), r;
												},
											},
											{
												key: 'addStringAt',
												value: function (e, t) {
													var n,
														r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length,
														o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e.length,
														i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
													return (
														r || 0 === r
															? ((n = [e.slice(0, r), t, e.slice(o)].join('')), this.isMaxLengthReached() || (i && this.updateCaretPos(t.length)))
															: (n = e + t),
														n
													);
												},
											},
											{
												key: 'removeAt',
												value: function (e) {
													var t,
														n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.length,
														r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length,
														o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
													if (0 === n && 0 === r) return e;
													if (n === r) {
														var i = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;
														n && n >= 0
															? e.substring(n - 2, n).match(i)
																? ((t = e.substr(0, n - 2) + e.substr(n)), o && this.updateCaretPos(2, !0))
																: ((t = e.substr(0, n - 1) + e.substr(n)), o && this.updateCaretPos(1, !0))
															: e.slice(-2).match(i)
																? ((t = e.slice(0, -2)), o && this.updateCaretPos(2, !0))
																: ((t = e.slice(0, -1)), o && this.updateCaretPos(1, !0));
													} else
														(t = e.slice(0, n) + e.slice(r)),
															o &&
																this.dispatch(function (e) {
																	e.setCaretPosition(n);
																});
													return t;
												},
											},
											{
												key: 'removeForwardsAt',
												value: function (e) {
													var t,
														n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.length,
														r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length,
														o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
													if (null == e || !e.length || null === n) return e;
													if (n === r) {
														var i = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g,
															s = e.substring(n, n + 2),
															a = s.match(i);
														t = a ? e.substr(0, n) + e.substr(n + 2) : e.substr(0, n) + e.substr(n + 1);
													} else
														(t = e.slice(0, n) + e.slice(r)),
															o &&
																this.dispatch(function (e) {
																	e.setCaretPosition(n);
																});
													return t;
												},
											},
											{
												key: 'handleMaxLength',
												value: function (e, t) {
													var n = this.getOptions(),
														r = n.maxLength,
														o = e[n.inputName || 'default'],
														s = t.length - 1 >= r;
													if (t.length <= o.length) return !1;
													if (Number.isInteger(r))
														return (
															n.debug && console.log('maxLength (num) reached:', s),
															s ? ((this.maxLengthReached = !0), !0) : ((this.maxLengthReached = !1), !1)
														);
													if ('object' === i(r)) {
														var a = t.length - 1 >= r[n.inputName || 'default'];
														return (
															n.debug && console.log('maxLength (obj) reached:', a),
															a ? ((this.maxLengthReached = !0), !0) : ((this.maxLengthReached = !1), !1)
														);
													}
												},
											},
											{
												key: 'isMaxLengthReached',
												value: function () {
													return Boolean(this.maxLengthReached);
												},
											},
											{
												key: 'isTouchDevice',
												value: function () {
													return 'ontouchstart' in window || navigator.maxTouchPoints;
												},
											},
											{
												key: 'pointerEventsSupported',
												value: function () {
													return !!window.PointerEvent;
												},
											},
											{
												key: 'camelCase',
												value: function (e) {
													return e
														? e
																.toLowerCase()
																.trim()
																.split(/[.\-_\s]/g)
																.reduce(function (e, t) {
																	return t.length ? e + t[0].toUpperCase() + t.slice(1) : e;
																})
														: '';
												},
											},
											{
												key: 'chunkArray',
												value: function (t, n) {
													return e(Array(Math.ceil(t.length / n))).map(function (e, r) {
														return t.slice(n * r, n + n * r);
													});
												},
											},
										]) && s(r.prototype, o),
										l && s(r, l),
										Object.defineProperty(r, 'prototype', { writable: !1 }),
										n
									);
								})();
								a(l, 'noop', function () {});
								var c = l;
								var u = (function () {
									function e(t) {
										var n = t.dispatch,
											r = t.getOptions;
										!(function (e, t) {
											if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
										})(this, e),
											(this.dispatch = n),
											(this.getOptions = r),
											c.bindMethods(e, this);
									}
									var t, n;
									return (
										(t = e),
										(n = [
											{
												key: 'handleHighlightKeyDown',
												value: function (e) {
													var t = this.getOptions(),
														n = this.getSimpleKeyboardLayoutKey(e);
													this.dispatch(function (r) {
														var o,
															i,
															s = r.getButtonElement(n),
															a = r.getButtonElement('{'.concat(n, '}'));
														if (s) (o = s), (i = n);
														else {
															if (!a) return;
															(o = a), (i = '{'.concat(n, '}'));
														}
														o &&
															((o.style.backgroundColor = t.physicalKeyboardHighlightBgColor || '#dadce4'),
															(o.style.color = t.physicalKeyboardHighlightTextColor || 'black'),
															t.physicalKeyboardHighlightPress &&
																(t.physicalKeyboardHighlightPressUsePointerEvents
																	? o.onpointerdown()
																	: t.physicalKeyboardHighlightPressUseClick
																		? o.click()
																		: r.handleButtonClicked(i, e)));
													});
												},
											},
											{
												key: 'handleHighlightKeyUp',
												value: function (e) {
													var t = this.getOptions(),
														n = this.getSimpleKeyboardLayoutKey(e);
													this.dispatch(function (e) {
														var r = e.getButtonElement(n) || e.getButtonElement('{'.concat(n, '}'));
														r && r.removeAttribute && (r.removeAttribute('style'), t.physicalKeyboardHighlightPressUsePointerEvents && r.onpointerup());
													});
												},
											},
											{
												key: 'getSimpleKeyboardLayoutKey',
												value: function (e) {
													var t,
														n,
														r = e.code || e.key || this.keyCodeToKey(null == e ? void 0 : e.keyCode);
													return (n =
														(null != r && r.includes('Numpad')) ||
														(null != r && r.includes('Shift')) ||
														(null != r && r.includes('Space')) ||
														(null != r && r.includes('Backspace')) ||
														(null != r && r.includes('Control')) ||
														(null != r && r.includes('Alt')) ||
														(null != r && r.includes('Meta'))
															? e.code || ''
															: e.key || this.keyCodeToKey(null == e ? void 0 : e.keyCode) || '').length > 1
														? null === (t = n) || void 0 === t
															? void 0
															: t.toLowerCase()
														: n;
												},
											},
											{
												key: 'keyCodeToKey',
												value: function (e) {
													return {
														8: 'Backspace',
														9: 'Tab',
														13: 'Enter',
														16: 'Shift',
														17: 'Ctrl',
														18: 'Alt',
														19: 'Pause',
														20: 'CapsLock',
														27: 'Esc',
														32: 'Space',
														33: 'PageUp',
														34: 'PageDown',
														35: 'End',
														36: 'Home',
														37: 'ArrowLeft',
														38: 'ArrowUp',
														39: 'ArrowRight',
														40: 'ArrowDown',
														45: 'Insert',
														46: 'Delete',
														48: '0',
														49: '1',
														50: '2',
														51: '3',
														52: '4',
														53: '5',
														54: '6',
														55: '7',
														56: '8',
														57: '9',
														65: 'A',
														66: 'B',
														67: 'C',
														68: 'D',
														69: 'E',
														70: 'F',
														71: 'G',
														72: 'H',
														73: 'I',
														74: 'J',
														75: 'K',
														76: 'L',
														77: 'M',
														78: 'N',
														79: 'O',
														80: 'P',
														81: 'Q',
														82: 'R',
														83: 'S',
														84: 'T',
														85: 'U',
														86: 'V',
														87: 'W',
														88: 'X',
														89: 'Y',
														90: 'Z',
														91: 'Meta',
														96: 'Numpad0',
														97: 'Numpad1',
														98: 'Numpad2',
														99: 'Numpad3',
														100: 'Numpad4',
														101: 'Numpad5',
														102: 'Numpad6',
														103: 'Numpad7',
														104: 'Numpad8',
														105: 'Numpad9',
														106: 'NumpadMultiply',
														107: 'NumpadAdd',
														109: 'NumpadSubtract',
														110: 'NumpadDecimal',
														111: 'NumpadDivide',
														112: 'F1',
														113: 'F2',
														114: 'F3',
														115: 'F4',
														116: 'F5',
														117: 'F6',
														118: 'F7',
														119: 'F8',
														120: 'F9',
														121: 'F10',
														122: 'F11',
														123: 'F12',
														144: 'NumLock',
														145: 'ScrollLock',
														186: ';',
														187: '=',
														188: ',',
														189: '-',
														190: '.',
														191: '/',
														192: '`',
														219: '[',
														220: '\\',
														221: ']',
														222: "'",
													}[e];
												},
											},
										]) &&
											(function (e, t) {
												for (var n = 0; n < t.length; n++) {
													var r = t[n];
													(r.enumerable = r.enumerable || !1),
														(r.configurable = !0),
														'value' in r && (r.writable = !0),
														Object.defineProperty(e, r.key, r);
												}
											})(t.prototype, n),
										Object.defineProperty(t, 'prototype', { writable: !1 }),
										e
									);
								})();
								var d = (function () {
									function e(t) {
										var n,
											r = t.utilities;
										!(function (e, t) {
											if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
										})(this, e),
											(n = 'pageIndex') in this
												? Object.defineProperty(this, n, { value: 0, enumerable: !0, configurable: !0, writable: !0 })
												: (this[n] = 0),
											(this.utilities = r),
											c.bindMethods(e, this),
											(this.pageSize = this.utilities.getOptions().layoutCandidatesPageSize || 5);
									}
									var t, n;
									return (
										(t = e),
										(n = [
											{
												key: 'destroy',
												value: function () {
													this.candidateBoxElement && (this.candidateBoxElement.remove(), (this.pageIndex = 0));
												},
											},
											{
												key: 'show',
												value: function (e) {
													var t = this,
														n = e.candidateValue,
														r = e.targetElement,
														o = e.onSelect;
													if (n && n.length) {
														var i = this.utilities.chunkArray(n.split(' '), this.pageSize);
														this.renderPage({
															candidateListPages: i,
															targetElement: r,
															pageIndex: this.pageIndex,
															nbPages: i.length,
															onItemSelected: function (e, n) {
																o(e, n), t.destroy();
															},
														});
													}
												},
											},
											{
												key: 'renderPage',
												value: function (e) {
													var t,
														n = this,
														r = e.candidateListPages,
														o = e.targetElement,
														i = e.pageIndex,
														s = e.nbPages,
														a = e.onItemSelected;
													null === (t = this.candidateBoxElement) || void 0 === t || t.remove(),
														(this.candidateBoxElement = document.createElement('div')),
														(this.candidateBoxElement.className = 'hg-candidate-box');
													var l = document.createElement('ul');
													(l.className = 'hg-candidate-box-list'),
														r[i].forEach(function (e) {
															var t = document.createElement('li'),
																n = function () {
																	var e = new MouseEvent('click');
																	return Object.defineProperty(e, 'target', { value: t }), e;
																};
															(t.className = 'hg-candidate-box-list-item'),
																(t.textContent = e),
																(t.onclick = function () {
																	var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n();
																	return a(e, t);
																}),
																l.appendChild(t);
														});
													var c = i > 0,
														u = document.createElement('div');
													u.classList.add('hg-candidate-box-prev'),
														c && u.classList.add('hg-candidate-box-btn-active'),
														(u.onclick = function () {
															c && n.renderPage({ candidateListPages: r, targetElement: o, pageIndex: i - 1, nbPages: s, onItemSelected: a });
														}),
														this.candidateBoxElement.appendChild(u),
														this.candidateBoxElement.appendChild(l);
													var d = i < s - 1,
														f = document.createElement('div');
													f.classList.add('hg-candidate-box-next'),
														d && f.classList.add('hg-candidate-box-btn-active'),
														(f.onclick = function () {
															d && n.renderPage({ candidateListPages: r, targetElement: o, pageIndex: i + 1, nbPages: s, onItemSelected: a });
														}),
														this.candidateBoxElement.appendChild(f),
														o.prepend(this.candidateBoxElement);
												},
											},
										]) &&
											(function (e, t) {
												for (var n = 0; n < t.length; n++) {
													var r = t[n];
													(r.enumerable = r.enumerable || !1),
														(r.configurable = !0),
														'value' in r && (r.writable = !0),
														Object.defineProperty(e, r.key, r);
												}
											})(t.prototype, n),
										Object.defineProperty(t, 'prototype', { writable: !1 }),
										e
									);
								})();
								function f(e) {
									return (
										(function (e) {
											if (Array.isArray(e)) return p(e);
										})(e) ||
										(function (e) {
											if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
										})(e) ||
										(function (e, t) {
											if (e) {
												if ('string' == typeof e) return p(e, t);
												var n = Object.prototype.toString.call(e).slice(8, -1);
												return (
													'Object' === n && e.constructor && (n = e.constructor.name),
													'Map' === n || 'Set' === n
														? Array.from(e)
														: 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
															? p(e, t)
															: void 0
												);
											}
										})(e) ||
										(function () {
											throw new TypeError(
												'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
											);
										})()
									);
								}
								function p(e, t) {
									(null == t || t > e.length) && (t = e.length);
									for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
									return r;
								}
								function h(e) {
									return (h =
										'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
											? function (e) {
													return typeof e;
												}
											: function (e) {
													return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
												})(e);
								}
								function m(e, t) {
									var n = Object.keys(e);
									if (Object.getOwnPropertySymbols) {
										var r = Object.getOwnPropertySymbols(e);
										t &&
											(r = r.filter(function (t) {
												return Object.getOwnPropertyDescriptor(e, t).enumerable;
											})),
											n.push.apply(n, r);
									}
									return n;
								}
								function y(e, t, n) {
									return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
								}
								var v = (function () {
									function e(t, n) {
										var r = this;
										if (
											((function (e, t) {
												if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
											})(this, e),
											y(this, 'defaultName', 'default'),
											y(this, 'activeInputElement', null),
											y(this, 'handleParams', function (e, t) {
												var n, r, o;
												if ('string' == typeof e) (n = e.split('.').join('')), (r = document.querySelector('.'.concat(n))), (o = t);
												else if (e instanceof HTMLDivElement) {
													if (!e.className)
														throw (console.warn('Any DOM element passed as parameter must have a class.'), new Error('KEYBOARD_DOM_CLASS_ERROR'));
													(n = e.className.split(' ')[0]), (r = e), (o = t);
												} else (n = 'simple-keyboard'), (r = document.querySelector('.'.concat(n))), (o = e);
												return { keyboardDOMClass: n, keyboardDOM: r, options: o };
											}),
											y(this, 'getOptions', function () {
												return r.options;
											}),
											y(this, 'getCaretPosition', function () {
												return r.caretPosition;
											}),
											y(this, 'getCaretPositionEnd', function () {
												return r.caretPositionEnd;
											}),
											y(this, 'registerModule', function (e, t) {
												r.modules[e] || (r.modules[e] = {}), t(r.modules[e]);
											}),
											y(this, 'getKeyboardClassString', function () {
												for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
												var o = [r.keyboardDOMClass].concat(t).filter(function (e) {
													return !!e;
												});
												return o.join(' ');
											}),
											'undefined' != typeof window)
										) {
											var o = this.handleParams(t, n),
												i = o.keyboardDOMClass,
												s = o.keyboardDOM,
												a = o.options,
												l = void 0 === a ? {} : a;
											(this.utilities = new c({
												getOptions: this.getOptions,
												getCaretPosition: this.getCaretPosition,
												getCaretPositionEnd: this.getCaretPositionEnd,
												dispatch: this.dispatch,
											})),
												(this.caretPosition = null),
												(this.caretPositionEnd = null),
												(this.keyboardDOM = s),
												(this.options = (function (e) {
													for (var t = 1; t < arguments.length; t++) {
														var n = null != arguments[t] ? arguments[t] : {};
														t % 2
															? m(Object(n), !0).forEach(function (t) {
																	y(e, t, n[t]);
																})
															: Object.getOwnPropertyDescriptors
																? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
																: m(Object(n)).forEach(function (t) {
																		Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
																	});
													}
													return e;
												})(
													{
														layoutName: 'default',
														theme: 'hg-theme-default',
														inputName: 'default',
														preventMouseDownDefault: !1,
														enableLayoutCandidates: !0,
														excludeFromLayout: {},
													},
													l
												)),
												(this.keyboardPluginClasses = ''),
												c.bindMethods(e, this);
											var f = this.options.inputName,
												p = void 0 === f ? this.defaultName : f;
											if (
												((this.input = {}),
												(this.input[p] = ''),
												(this.keyboardDOMClass = i),
												(this.buttonElements = {}),
												window.SimpleKeyboardInstances || (window.SimpleKeyboardInstances = {}),
												(this.currentInstanceName = this.utilities.camelCase(this.keyboardDOMClass)),
												(window.SimpleKeyboardInstances[this.currentInstanceName] = this),
												(this.allKeyboardInstances = window.SimpleKeyboardInstances),
												(this.keyboardInstanceNames = Object.keys(window.SimpleKeyboardInstances)),
												(this.isFirstKeyboardInstance = this.keyboardInstanceNames[0] === this.currentInstanceName),
												(this.physicalKeyboard = new u({ dispatch: this.dispatch, getOptions: this.getOptions })),
												(this.candidateBox = this.options.enableLayoutCandidates ? new d({ utilities: this.utilities }) : null),
												!this.keyboardDOM)
											)
												throw (console.warn('".'.concat(i, '" was not found in the DOM.')), new Error('KEYBOARD_DOM_ERROR'));
											this.render(), (this.modules = {}), this.loadModules();
										}
									}
									var t, n;
									return (
										(t = e),
										(n = [
											{
												key: 'setCaretPosition',
												value: function (e) {
													var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e;
													(this.caretPosition = e), (this.caretPositionEnd = t);
												},
											},
											{
												key: 'getInputCandidates',
												value: function (e) {
													var t = this,
														n = this.options,
														r = n.layoutCandidates,
														o = n.layoutCandidatesCaseSensitiveMatch;
													if (!r || 'object' !== h(r)) return {};
													var i = Object.keys(r).filter(function (n) {
														var r = e.substring(0, t.getCaretPositionEnd() || 0) || e,
															i = new RegExp(''.concat(n, '$'), o ? 'g' : 'gi');
														return !!f(r.matchAll(i)).length;
													});
													if (i.length > 1) {
														var s = i.sort(function (e, t) {
															return t.length - e.length;
														})[0];
														return { candidateKey: s, candidateValue: r[s] };
													}
													if (i.length) {
														var a = i[0];
														return { candidateKey: a, candidateValue: r[a] };
													}
													return {};
												},
											},
											{
												key: 'showCandidatesBox',
												value: function (e, t, n) {
													var r = this;
													this.candidateBox &&
														this.candidateBox.show({
															candidateValue: t,
															targetElement: n,
															onSelect: function (t, n) {
																var o = r.options.layoutCandidatesCaseSensitiveMatch,
																	i = t.normalize('NFD'),
																	s = r.getInput(r.options.inputName, !0),
																	a = r.getCaretPositionEnd() || 0,
																	l = s.substring(0, a || 0) || s,
																	c = new RegExp(''.concat(e, '$'), o ? 'g' : 'gi'),
																	u = l.replace(c, i),
																	d = s.replace(l, u),
																	f = u.length - l.length,
																	p = (a || s.length) + f;
																p < 0 && (p = 0),
																	r.setInput(d, r.options.inputName, !0),
																	r.setCaretPosition(p),
																	'function' == typeof r.options.onChange && r.options.onChange(r.getInput(r.options.inputName, !0), n),
																	'function' == typeof r.options.onChangeAll && r.options.onChangeAll(r.getAllInputs(), n);
															},
														});
												},
											},
											{
												key: 'handleButtonClicked',
												value: function (e, t) {
													var n = this.options,
														r = n.inputName,
														o = void 0 === r ? this.defaultName : r,
														i = n.debug;
													if ('{//}' !== e) {
														this.input[o] || (this.input[o] = '');
														var s = this.utilities.getUpdatedInput(e, this.input[o], this.caretPosition, this.caretPositionEnd);
														if (
															this.utilities.isStandardButton(e) &&
															this.activeInputElement &&
															this.input[o] &&
															this.input[o] === s &&
															0 === this.caretPosition &&
															this.caretPositionEnd === s.length
														)
															return (
																this.setInput('', this.options.inputName, !0),
																this.setCaretPosition(0),
																(this.activeInputElement.value = ''),
																this.activeInputElement.setSelectionRange(0, 0),
																void this.handleButtonClicked(e, t)
															);
														if (
															('function' == typeof this.options.onKeyPress && this.options.onKeyPress(e, t),
															this.input[o] !== s && (!this.options.inputPattern || (this.options.inputPattern && this.inputPatternIsValid(s))))
														) {
															if (this.options.maxLength && this.utilities.handleMaxLength(this.input, s)) return;
															var a = this.utilities.getUpdatedInput(e, this.input[o], this.caretPosition, this.caretPositionEnd, !0);
															if (
																(this.setInput(a, this.options.inputName, !0),
																i && console.log('Input changed:', this.getAllInputs()),
																this.options.debug &&
																	console.log(
																		'Caret at: ',
																		this.getCaretPosition(),
																		this.getCaretPositionEnd(),
																		'('.concat(this.keyboardDOMClass, ')')
																	),
																this.options.syncInstanceInputs && this.syncInstanceInputs(),
																'function' == typeof this.options.onChange && this.options.onChange(this.getInput(this.options.inputName, !0), t),
																'function' == typeof this.options.onChangeAll && this.options.onChangeAll(this.getAllInputs(), t),
																null != t && t.target && this.options.enableLayoutCandidates)
															) {
																var l,
																	c = this.getInputCandidates(s),
																	u = c.candidateKey,
																	d = c.candidateValue;
																u && d
																	? this.showCandidatesBox(u, d, this.keyboardDOM)
																	: null === (l = this.candidateBox) || void 0 === l || l.destroy();
															}
														}
														i && console.log('Key pressed:', e);
													}
												},
											},
											{
												key: 'getMouseHold',
												value: function () {
													return this.isMouseHold;
												},
											},
											{
												key: 'setMouseHold',
												value: function (e) {
													this.options.syncInstanceInputs
														? this.dispatch(function (t) {
																t.isMouseHold = e;
															})
														: (this.isMouseHold = e);
												},
											},
											{
												key: 'handleButtonMouseDown',
												value: function (e, t) {
													var n = this;
													t &&
														(this.options.preventMouseDownDefault && t.preventDefault(),
														this.options.stopMouseDownPropagation && t.stopPropagation(),
														t.target.classList.add(this.activeButtonClass)),
														this.holdInteractionTimeout && clearTimeout(this.holdInteractionTimeout),
														this.holdTimeout && clearTimeout(this.holdTimeout),
														this.setMouseHold(!0),
														this.options.disableButtonHold ||
															(this.holdTimeout = window.setTimeout(function () {
																((n.getMouseHold() &&
																	((!e.includes('{') && !e.includes('}')) ||
																		'{delete}' === e ||
																		'{backspace}' === e ||
																		'{bksp}' === e ||
																		'{space}' === e ||
																		'{tab}' === e)) ||
																	'{arrowright}' === e ||
																	'{arrowleft}' === e ||
																	'{arrowup}' === e ||
																	'{arrowdown}' === e) &&
																	(n.options.debug && console.log('Button held:', e), n.handleButtonHold(e)),
																	clearTimeout(n.holdTimeout);
															}, 500));
												},
											},
											{
												key: 'handleButtonMouseUp',
												value: function (e, t) {
													var n = this;
													t &&
														(this.options.preventMouseUpDefault && t.preventDefault && t.preventDefault(),
														this.options.stopMouseUpPropagation && t.stopPropagation && t.stopPropagation(),
														!(
															t.target === this.keyboardDOM ||
															(t.target && this.keyboardDOM.contains(t.target)) ||
															(this.candidateBox &&
																this.candidateBox.candidateBoxElement &&
																(t.target === this.candidateBox.candidateBoxElement ||
																	(t.target && this.candidateBox.candidateBoxElement.contains(t.target))))
														) &&
															this.candidateBox &&
															this.candidateBox.destroy()),
														this.recurseButtons(function (e) {
															e.classList.remove(n.activeButtonClass);
														}),
														this.setMouseHold(!1),
														this.holdInteractionTimeout && clearTimeout(this.holdInteractionTimeout),
														e && 'function' == typeof this.options.onKeyReleased && this.options.onKeyReleased(e);
												},
											},
											{
												key: 'handleKeyboardContainerMouseDown',
												value: function (e) {
													this.options.preventMouseDownDefault && e.preventDefault();
												},
											},
											{
												key: 'handleButtonHold',
												value: function (e) {
													var t = this;
													this.holdInteractionTimeout && clearTimeout(this.holdInteractionTimeout),
														(this.holdInteractionTimeout = window.setTimeout(function () {
															t.getMouseHold() ? (t.handleButtonClicked(e), t.handleButtonHold(e)) : clearTimeout(t.holdInteractionTimeout);
														}, 100));
												},
											},
											{
												key: 'syncInstanceInputs',
												value: function () {
													var e = this;
													this.dispatch(function (t) {
														t.replaceInput(e.input), t.setCaretPosition(e.caretPosition, e.caretPositionEnd);
													});
												},
											},
											{
												key: 'clearInput',
												value: function () {
													var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.options.inputName || this.defaultName;
													(this.input[e] = ''), this.setCaretPosition(0), this.options.syncInstanceInputs && this.syncInstanceInputs();
												},
											},
											{
												key: 'getInput',
												value: function () {
													var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.options.inputName || this.defaultName,
														t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
													if ((this.options.syncInstanceInputs && !t && this.syncInstanceInputs(), this.options.rtl)) {
														var n = this.input[e].replace('‫', '').replace('‬', '');
														return '‫' + n + '‬';
													}
													return this.input[e];
												},
											},
											{
												key: 'getAllInputs',
												value: function () {
													var e = this,
														t = {};
													return (
														Object.keys(this.input).forEach(function (n) {
															t[n] = e.getInput(n, !0);
														}),
														t
													);
												},
											},
											{
												key: 'setInput',
												value: function (e) {
													var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.options.inputName || this.defaultName,
														n = arguments.length > 2 ? arguments[2] : void 0;
													(this.input[t] = e), !n && this.options.syncInstanceInputs && this.syncInstanceInputs();
												},
											},
											{
												key: 'replaceInput',
												value: function (e) {
													this.input = e;
												},
											},
											{
												key: 'setOptions',
												value: function () {
													var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
														t = this.changedOptions(e);
													(this.options = Object.assign(this.options, e)),
														t.length && (this.options.debug && console.log('changedOptions', t), this.onSetOptions(t), this.render());
												},
											},
											{
												key: 'changedOptions',
												value: function (e) {
													var t = this;
													return Object.keys(e).filter(function (n) {
														return JSON.stringify(e[n]) !== JSON.stringify(t.options[n]);
													});
												},
											},
											{
												key: 'onSetOptions',
												value: function () {
													var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
													e.includes('layoutName') && this.candidateBox && this.candidateBox.destroy(),
														(e.includes('layoutCandidatesPageSize') || e.includes('layoutCandidates')) &&
															this.candidateBox &&
															(this.candidateBox.destroy(), (this.candidateBox = new d({ utilities: this.utilities })));
												},
											},
											{
												key: 'resetRows',
												value: function () {
													this.keyboardRowsDOM && this.keyboardRowsDOM.remove(),
														(this.keyboardDOM.className = this.keyboardDOMClass),
														this.keyboardDOM.setAttribute('data-skInstance', this.currentInstanceName),
														(this.buttonElements = {});
												},
											},
											{
												key: 'dispatch',
												value: function (e) {
													if (!window.SimpleKeyboardInstances)
														throw (
															(console.warn('SimpleKeyboardInstances is not defined. Dispatch cannot be called.'), new Error('INSTANCES_VAR_ERROR'))
														);
													return Object.keys(window.SimpleKeyboardInstances).forEach(function (t) {
														e(window.SimpleKeyboardInstances[t], t);
													});
												},
											},
											{
												key: 'addButtonTheme',
												value: function (e, t) {
													var n = this;
													t &&
														e &&
														(e.split(' ').forEach(function (r) {
															t.split(' ').forEach(function (t) {
																n.options.buttonTheme || (n.options.buttonTheme = []);
																var o = !1;
																n.options.buttonTheme.map(function (e) {
																	if (null != e && e.class.split(' ').includes(t)) {
																		o = !0;
																		var n = e.buttons.split(' ');
																		n.includes(r) || ((o = !0), n.push(r), (e.buttons = n.join(' ')));
																	}
																	return e;
																}),
																	o || n.options.buttonTheme.push({ class: t, buttons: e });
															});
														}),
														this.render());
												},
											},
											{
												key: 'removeButtonTheme',
												value: function (e, t) {
													var n = this;
													if (!e && !t) return (this.options.buttonTheme = []), void this.render();
													e &&
														Array.isArray(this.options.buttonTheme) &&
														this.options.buttonTheme.length &&
														(e.split(' ').forEach(function (e) {
															var r, o;
															null === (r = n.options) ||
																void 0 === r ||
																null === (o = r.buttonTheme) ||
																void 0 === o ||
																o.map(function (r, o) {
																	if ((r && t && t.includes(r.class)) || !t) {
																		var i,
																			s,
																			a =
																				null === (i = r) || void 0 === i
																					? void 0
																					: i.buttons.split(' ').filter(function (t) {
																							return t !== e;
																						});
																		r && null != a && a.length
																			? (r.buttons = a.join(' '))
																			: (null === (s = n.options.buttonTheme) || void 0 === s || s.splice(o, 1), (r = null));
																	}
																	return r;
																});
														}),
														this.render());
												},
											},
											{
												key: 'getButtonElement',
												value: function (e) {
													var t,
														n = this.buttonElements[e];
													return n && (t = n.length > 1 ? n : n[0]), t;
												},
											},
											{
												key: 'inputPatternIsValid',
												value: function (e) {
													var t,
														n = this.options.inputPattern;
													if ((t = n instanceof RegExp ? n : n[this.options.inputName || this.defaultName]) && e) {
														var r = t.test(e);
														return this.options.debug && console.log('inputPattern ("'.concat(t, '"): ').concat(r ? 'passed' : 'did not pass!')), r;
													}
													return !0;
												},
											},
											{
												key: 'setEventListeners',
												value: function () {
													(!this.isFirstKeyboardInstance && this.allKeyboardInstances) ||
														(this.options.debug && console.log('Caret handling started ('.concat(this.keyboardDOMClass, ')')),
														document.addEventListener('keyup', this.handleKeyUp),
														document.addEventListener('keydown', this.handleKeyDown),
														document.addEventListener('mouseup', this.handleMouseUp),
														document.addEventListener('touchend', this.handleTouchEnd),
														document.addEventListener('select', this.handleSelect),
														document.addEventListener('selectionchange', this.handleSelectionChange));
												},
											},
											{
												key: 'handleKeyUp',
												value: function (e) {
													this.caretEventHandler(e), this.options.physicalKeyboardHighlight && this.physicalKeyboard.handleHighlightKeyUp(e);
												},
											},
											{
												key: 'handleKeyDown',
												value: function (e) {
													this.options.physicalKeyboardHighlight && this.physicalKeyboard.handleHighlightKeyDown(e);
												},
											},
											{
												key: 'handleMouseUp',
												value: function (e) {
													this.caretEventHandler(e);
												},
											},
											{
												key: 'handleTouchEnd',
												value: function (e) {
													this.caretEventHandler(e);
												},
											},
											{
												key: 'handleSelect',
												value: function (e) {
													this.caretEventHandler(e);
												},
											},
											{
												key: 'handleSelectionChange',
												value: function (e) {
													this.caretEventHandler(e);
												},
											},
											{
												key: 'caretEventHandler',
												value: function (e) {
													var t,
														n = this;
													e.target.tagName && (t = e.target.tagName.toLowerCase()),
														this.dispatch(function (r) {
															var o = e.target === r.keyboardDOM || (e.target && r.keyboardDOM.contains(e.target));
															n.options.syncInstanceInputs &&
																Array.isArray(e.path) &&
																(o = e.path.some(function (e) {
																	var t;
																	return null == e || null === (t = e.hasAttribute) || void 0 === t ? void 0 : t.call(e, 'data-skInstance');
																})),
																('textarea' === t || ('input' === t && ['text', 'search', 'url', 'tel', 'password'].includes(e.target.type))) &&
																!r.options.disableCaretPositioning
																	? (r.setCaretPosition(e.target.selectionStart, e.target.selectionEnd),
																		(n.activeInputElement = e.target),
																		r.options.debug &&
																			console.log(
																				'Caret at: ',
																				r.getCaretPosition(),
																				r.getCaretPositionEnd(),
																				e && e.target.tagName.toLowerCase(),
																				'('.concat(r.keyboardDOMClass, ')')
																			))
																	: (!r.options.disableCaretPositioning && o) ||
																		'selectionchange' === (null == e ? void 0 : e.type) ||
																		(r.setCaretPosition(null),
																		(n.activeInputElement = null),
																		r.options.debug &&
																			console.log('Caret position reset due to "'.concat(null == e ? void 0 : e.type, '" event'), e));
														});
												},
											},
											{
												key: 'recurseButtons',
												value: function (e) {
													var t = this;
													e &&
														Object.keys(this.buttonElements).forEach(function (n) {
															return t.buttonElements[n].forEach(e);
														});
												},
											},
											{
												key: 'destroy',
												value: function () {
													this.options.debug && console.log('Destroying simple-keyboard instance: '.concat(this.currentInstanceName)),
														document.removeEventListener('keyup', this.handleKeyUp),
														document.removeEventListener('keydown', this.handleKeyDown),
														document.removeEventListener('mouseup', this.handleMouseUp),
														document.removeEventListener('touchend', this.handleTouchEnd),
														document.removeEventListener('select', this.handleSelect),
														document.removeEventListener('selectionchange', this.handleSelectionChange),
														(document.onpointerup = null),
														(document.ontouchend = null),
														(document.ontouchcancel = null),
														(document.onmouseup = null),
														this.recurseButtons(function (e) {
															e &&
																((e.onpointerdown = null),
																(e.onpointerup = null),
																(e.onpointercancel = null),
																(e.ontouchstart = null),
																(e.ontouchend = null),
																(e.ontouchcancel = null),
																(e.onclick = null),
																(e.onmousedown = null),
																(e.onmouseup = null),
																e.remove(),
																(e = null));
														}),
														(this.keyboardDOM.onpointerdown = null),
														(this.keyboardDOM.ontouchstart = null),
														(this.keyboardDOM.onmousedown = null),
														this.resetRows(),
														this.candidateBox && (this.candidateBox.destroy(), (this.candidateBox = null)),
														(this.activeInputElement = null),
														this.keyboardDOM.removeAttribute('data-skInstance'),
														(this.keyboardDOM.innerHTML = ''),
														(window.SimpleKeyboardInstances[this.currentInstanceName] = null),
														delete window.SimpleKeyboardInstances[this.currentInstanceName],
														(this.initialized = !1);
												},
											},
											{
												key: 'getButtonThemeClasses',
												value: function (e) {
													var t = this.options.buttonTheme,
														n = [];
													return (
														Array.isArray(t) &&
															t.forEach(function (t) {
																if (t && t.class && 'string' == typeof t.class && t.buttons && 'string' == typeof t.buttons) {
																	var r = t.class.split(' ');
																	t.buttons.split(' ').includes(e) && (n = [].concat(f(n), f(r)));
																} else console.warn('Incorrect "buttonTheme". Please check the documentation.', t);
															}),
														n
													);
												},
											},
											{
												key: 'setDOMButtonAttributes',
												value: function (e, t) {
													var n = this.options.buttonAttributes;
													Array.isArray(n) &&
														n.forEach(function (n) {
															n.attribute &&
															'string' == typeof n.attribute &&
															n.value &&
															'string' == typeof n.value &&
															n.buttons &&
															'string' == typeof n.buttons
																? n.buttons.split(' ').includes(e) && t(n.attribute, n.value)
																: console.warn('Incorrect "buttonAttributes". Please check the documentation.', n);
														});
												},
											},
											{
												key: 'onTouchDeviceDetected',
												value: function () {
													this.processAutoTouchEvents(), this.disableContextualWindow();
												},
											},
											{
												key: 'disableContextualWindow',
												value: function () {
													window.oncontextmenu = function (e) {
														if (e.target.classList.contains('hg-button')) return e.preventDefault(), e.stopPropagation(), !1;
													};
												},
											},
											{
												key: 'processAutoTouchEvents',
												value: function () {
													this.options.autoUseTouchEvents &&
														((this.options.useTouchEvents = !0),
														this.options.debug && console.log('autoUseTouchEvents: Touch device detected, useTouchEvents enabled.'));
												},
											},
											{
												key: 'onInit',
												value: function () {
													this.options.debug && console.log(''.concat(this.keyboardDOMClass, ' Initialized')),
														this.setEventListeners(),
														'function' == typeof this.options.onInit && this.options.onInit(this);
												},
											},
											{
												key: 'beforeFirstRender',
												value: function () {
													this.utilities.isTouchDevice() && this.onTouchDeviceDetected(),
														'function' == typeof this.options.beforeFirstRender && this.options.beforeFirstRender(this),
														this.isFirstKeyboardInstance &&
															this.utilities.pointerEventsSupported() &&
															!this.options.useTouchEvents &&
															!this.options.useMouseEvents &&
															this.options.debug &&
															console.log('Using PointerEvents as it is supported by this browser'),
														this.options.useTouchEvents &&
															this.options.debug &&
															console.log('useTouchEvents has been enabled. Only touch events will be used.');
												},
											},
											{
												key: 'beforeRender',
												value: function () {
													'function' == typeof this.options.beforeRender && this.options.beforeRender(this);
												},
											},
											{
												key: 'onRender',
												value: function () {
													'function' == typeof this.options.onRender && this.options.onRender(this);
												},
											},
											{
												key: 'onModulesLoaded',
												value: function () {
													'function' == typeof this.options.onModulesLoaded && this.options.onModulesLoaded(this);
												},
											},
											{
												key: 'loadModules',
												value: function () {
													var e = this;
													Array.isArray(this.options.modules) &&
														(this.options.modules.forEach(function (t) {
															var n = new t(e);
															n.init && n.init(e);
														}),
														(this.keyboardPluginClasses = 'modules-loaded'),
														this.render(),
														this.onModulesLoaded());
												},
											},
											{
												key: 'getModuleProp',
												value: function (e, t) {
													return !!this.modules[e] && this.modules[e][t];
												},
											},
											{
												key: 'getModulesList',
												value: function () {
													return Object.keys(this.modules);
												},
											},
											{
												key: 'parseRowDOMContainers',
												value: function (e, t, n, r) {
													var o = this,
														i = Array.from(e.children),
														s = 0;
													return (
														i.length &&
															n.forEach(function (n, a) {
																var l = r[a];
																if (!(l && l > n)) return !1;
																var c = n - s,
																	u = l - s,
																	d = document.createElement('div');
																d.className += 'hg-button-container';
																var f = ''.concat(o.options.layoutName, '-r').concat(t, 'c').concat(a);
																d.setAttribute('data-skUID', f);
																var p = i.splice(c, u - c + 1);
																(s = u - c),
																	p.forEach(function (e) {
																		return d.appendChild(e);
																	}),
																	i.splice(c, 0, d),
																	(e.innerHTML = ''),
																	i.forEach(function (t) {
																		return e.appendChild(t);
																	}),
																	o.options.debug && console.log('rowDOMContainer', p, c, u, s + 1);
															}),
														e
													);
												},
											},
											{
												key: 'render',
												value: function () {
													var e = this;
													this.resetRows(), this.initialized || this.beforeFirstRender(), this.beforeRender();
													var t = 'hg-layout-'.concat(this.options.layoutName),
														n = this.options.layout || {
															default: [
																'` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
																'{tab} q w e r t y u i o p [ ] \\',
																"{lock} a s d f g h j k l ; ' {enter}",
																'{shift} z x c v b n m , . / {shift}',
																'.com @ {space}',
															],
															shift: [
																'~ ! @ # $ % ^ & * ( ) _ + {bksp}',
																'{tab} Q W E R T Y U I O P { } |',
																'{lock} A S D F G H J K L : " {enter}',
																'{shift} Z X C V B N M < > ? {shift}',
																'.com @ {space}',
															],
														},
														r = this.options.useTouchEvents || !1,
														o = r ? 'hg-touch-events' : '',
														i = this.options.useMouseEvents || !1,
														s = this.options.disableRowButtonContainers;
													(this.keyboardDOM.className = this.getKeyboardClassString(this.options.theme, t, this.keyboardPluginClasses, o)),
														this.keyboardDOM.setAttribute('data-skInstance', this.currentInstanceName),
														(this.keyboardRowsDOM = document.createElement('div')),
														(this.keyboardRowsDOM.className = 'hg-rows'),
														n[this.options.layoutName || this.defaultName].forEach(function (t, n) {
															var o = t.split(' ');
															e.options.excludeFromLayout &&
																e.options.excludeFromLayout[e.options.layoutName || e.defaultName] &&
																(o = o.filter(function (t) {
																	return (
																		e.options.excludeFromLayout &&
																		!e.options.excludeFromLayout[e.options.layoutName || e.defaultName].includes(t)
																	);
																}));
															var a = document.createElement('div');
															a.className += 'hg-row';
															var l = [],
																c = [];
															o.forEach(function (t, o) {
																var u,
																	d = !s && 'string' == typeof t && t.length > 1 && 0 === t.indexOf('['),
																	p = !s && 'string' == typeof t && t.length > 1 && t.indexOf(']') === t.length - 1;
																d && (l.push(o), (t = t.replace(/\[/g, ''))), p && (c.push(o), (t = t.replace(/\]/g, '')));
																var h = e.utilities.getButtonClass(t),
																	m = e.utilities.getButtonDisplayName(t, e.options.display, e.options.mergeDisplay),
																	y = e.options.useButtonTag ? 'button' : 'div',
																	v = document.createElement(y);
																(v.className += 'hg-button '.concat(h)),
																	(u = v.classList).add.apply(u, f(e.getButtonThemeClasses(t))),
																	e.setDOMButtonAttributes(t, function (e, t) {
																		v.setAttribute(e, t);
																	}),
																	(e.activeButtonClass = 'hg-activeButton'),
																	!e.utilities.pointerEventsSupported() || r || i
																		? r
																			? ((v.ontouchstart = function (n) {
																					e.handleButtonClicked(t, n), e.handleButtonMouseDown(t, n);
																				}),
																				(v.ontouchend = function (n) {
																					e.handleButtonMouseUp(t, n);
																				}),
																				(v.ontouchcancel = function (n) {
																					e.handleButtonMouseUp(t, n);
																				}))
																			: ((v.onclick = function (n) {
																					e.setMouseHold(!1), 'function' != typeof e.options.onKeyReleased && e.handleButtonClicked(t, n);
																				}),
																				(v.onmousedown = function (n) {
																					'function' != typeof e.options.onKeyReleased || e.isMouseHold || e.handleButtonClicked(t, n),
																						e.handleButtonMouseDown(t, n);
																				}),
																				(v.onmouseup = function (n) {
																					e.handleButtonMouseUp(t, n);
																				}))
																		: ((v.onpointerdown = function (n) {
																				e.handleButtonClicked(t, n), e.handleButtonMouseDown(t, n);
																			}),
																			(v.onpointerup = function (n) {
																				e.handleButtonMouseUp(t, n);
																			}),
																			(v.onpointercancel = function (n) {
																				e.handleButtonMouseUp(t, n);
																			})),
																	v.setAttribute('data-skBtn', t);
																var g = ''.concat(e.options.layoutName, '-r').concat(n, 'b').concat(o);
																v.setAttribute('data-skBtnUID', g);
																var b = document.createElement('span');
																(b.innerHTML = m),
																	v.appendChild(b),
																	e.buttonElements[t] || (e.buttonElements[t] = []),
																	e.buttonElements[t].push(v),
																	a.appendChild(v);
															}),
																(a = e.parseRowDOMContainers(a, n, l, c)),
																e.keyboardRowsDOM.appendChild(a);
														}),
														this.keyboardDOM.appendChild(this.keyboardRowsDOM),
														this.onRender(),
														this.initialized ||
															((this.initialized = !0),
															!this.utilities.pointerEventsSupported() || r || i
																? r
																	? ((document.ontouchend = function (t) {
																			return e.handleButtonMouseUp(void 0, t);
																		}),
																		(document.ontouchcancel = function (t) {
																			return e.handleButtonMouseUp(void 0, t);
																		}),
																		(this.keyboardDOM.ontouchstart = function (t) {
																			return e.handleKeyboardContainerMouseDown(t);
																		}))
																	: r ||
																		((document.onmouseup = function (t) {
																			return e.handleButtonMouseUp(void 0, t);
																		}),
																		(this.keyboardDOM.onmousedown = function (t) {
																			return e.handleKeyboardContainerMouseDown(t);
																		}))
																: ((document.onpointerup = function (t) {
																		return e.handleButtonMouseUp(void 0, t);
																	}),
																	(this.keyboardDOM.onpointerdown = function (t) {
																		return e.handleKeyboardContainerMouseDown(t);
																	})),
															this.onInit());
												},
											},
										]) &&
											(function (e, t) {
												for (var n = 0; n < t.length; n++) {
													var r = t[n];
													(r.enumerable = r.enumerable || !1),
														(r.configurable = !0),
														'value' in r && (r.writable = !0),
														Object.defineProperty(e, r.key, r);
												}
											})(t.prototype, n),
										Object.defineProperty(t, 'prototype', { writable: !1 }),
										e
									);
								})();
							})(),
							r
						);
					})();
				}),
					'object' == typeof n && 'object' == typeof t
						? (t.exports = r())
						: 'function' == typeof define && define.amd
							? define([], r)
							: 'object' == typeof n
								? (n.SimpleKeyboard = r())
								: (this.SimpleKeyboard = r());
			},
			{},
		],
		17: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.Build = void 0),
					(n.Build = { short: '0.73.9', version: '0.73.9 (2b193a42bb8728577711b215f2ee7fa1)', buildSeed: 1673510059952 });
			},
			{},
		],
		18: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.deprecatedButton = n.createButton = void 0);
				const r = e('../dom/keys'),
					o = e('../dom/pointer'),
					i = (function () {
						const e = {};
						for (const t of Object.keys(r.namedKeyCodes)) e[r.namedKeyCodes[t]] = t.substr(4, 2);
						return e;
					})();
				function s(e, t, n) {
					const r = Math.round(0.6 * n),
						i = Math.round(0.5 * n),
						s = Math.max(1, Math.round(n / 20)),
						l = h[e.toLowerCase()],
						c = void 0 === l ? e : '',
						u = a('emulator-button-touch-zone'),
						d = a('emulator-button'),
						f = a('emulator-button-text', void 0 === l ? (void 0 === c || 0 === c.length ? '□' : c.substr(0, 1).toUpperCase()) : '');
					void 0 !== l && (d.style.backgroundImage = 'url("' + l + '")'),
						(d.style.width = r + 'px'),
						(d.style.height = r + 'px'),
						(f.style.fontSize = i + 'px'),
						(u.widthPx = n - 2 * s),
						(u.heightPx = n - 2 * s),
						(u.style.width = u.widthPx + 'px'),
						(u.style.height = u.heightPx + 'px'),
						(u.style.borderWidth = s + 'px'),
						u.appendChild(d),
						u.appendChild(f);
					const p = e => {
							void 0 !== t.onDown && t.onDown(), void 0 !== t.onClick && t.onClick(), e.stopPropagation(), e.preventDefault();
						},
						m = e => {
							void 0 !== t.onUp && t.onUp(), e.stopPropagation(), e.preventDefault();
						},
						y = e => {
							e.stopPropagation(), e.preventDefault();
						},
						v = { capture: !0 };
					for (const e of o.pointer.starters) u.addEventListener(e, p, v);
					for (const e of o.pointer.enders) u.addEventListener(e, m, v);
					for (const e of o.pointer.changers) u.addEventListener(e, y, v);
					for (const e of o.pointer.leavers) u.addEventListener(e, y, v);
					for (const e of o.pointer.prevents) u.addEventListener(e, y, v);
					return u;
				}
				function a(e, t) {
					const n = document.createElement('div');
					return (n.className = e), void 0 !== t && (n.innerHTML = t), n;
				}
				function l(e) {
					return 'number' == typeof e ? i[e] : e;
				}
				function c(e, t) {
					return 'click' === e.action ? { onClick: () => t.fireKeyPress(e.mapTo) } : { onDown: () => t.fireKeyDown(e.mapTo), onUp: () => t.fireKeyUp(e.mapTo) };
				}
				(n.createButton = s),
					(n.deprecatedButton = function (e, t, n, o) {
						const i = Math.round(o / 4),
							a = [];
						for (const t of n) {
							if (t.mapTo === r.KBD_NONE) continue;
							const n = s((t.symbol || l(t.mapTo)).toUpperCase(), c(t, e), o);
							n.style.position = 'absolute';
							const u = t.style;
							if (u) for (const e of Object.keys(u)) n.style[e] = u[e];
							if (void 0 !== t.position) {
								const e = t.position.left,
									r = t.position.top,
									s = t.position.bottom,
									a = t.position.right;
								void 0 !== e && (n.style.left = i * e + o * (e - 1) + 'px'),
									void 0 !== a && (n.style.right = i * a + o * (a - 1) + 'px'),
									void 0 !== r && (n.style.top = i * r + o * (r - 1) + 'px'),
									void 0 !== s && (n.style.bottom = i * s + o * (s - 1) + 'px');
							}
							e.mouseOverlay.appendChild(n), a.push(n);
						}
						return () => {
							for (const t of a) t.parentElement === e.mouseOverlay && e.mouseOverlay.removeChild(t);
						};
					});
				const u =
						"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' fill='%23FFF' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Ctitle%3EShape%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cg id='Page-1' sketch:type='MSPage'%3E%3Cg id='Artboard-1' transform='translate(-3.000000, -1.000000)' sketch:type='MSArtboardGroup'%3E%3Cpath id='Shape' sketch:type='MSShapeGroup' d='M19,12c-0.3,0-0.5,0.1-0.7,0.3L14,16.6V3c0-0.5-0.4-1-1-1s-1,0.5-1,1v13.6 l-4.3-4.3C7.5,12.1,7.3,12,7,12c-0.5,0-1,0.4-1,1c0,0.3,0.1,0.5,0.3,0.7l6,6c0.2,0.2,0.4,0.3,0.7,0.3s0.5-0.1,0.7-0.3l6-6 c0.2-0.2,0.3-0.4,0.3-0.7C20,12.4,19.5,12,19,12L19,12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
					d =
						"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' enable-background='new 0 0 20 20' fill='%23FFF' xml:space='preserve'%3E%3Cg id='left_arrow_1_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18,9H4.41l4.29-4.29C8.89,4.53,9,4.28,9,4c0-0.55-0.45-1-1-1 C7.72,3,7.47,3.11,7.29,3.29l-6,6C1.11,9.47,1,9.72,1,10c0,0.28,0.11,0.53,0.29,0.71l6,6C7.47,16.89,7.72,17,8,17 c0.55,0,1-0.45,1-1c0-0.28-0.11-0.53-0.29-0.71L4.41,11H18c0.55,0,1-0.45,1-1C19,9.45,18.55,9,18,9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
					f =
						"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' fill='%23fff' viewBox='0 0 20 20' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Cg id='right_arrow_1_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.71,9.29l-6-6C12.53,3.11,12.28,3,12,3c-0.55,0-1,0.45-1,1 c0,0.28,0.11,0.53,0.29,0.71L15.59,9H2c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h13.59l-4.29,4.29C11.11,15.47,11,15.72,11,16 c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l6-6C18.89,10.53,19,10.28,19,10C19,9.72,18.89,9.47,18.71,9.29z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
					p =
						"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' fill='%23fff' viewBox='0 0 20 20' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Cg id='key_enter_1_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18,2c-0.55,0-1,0.45-1,1v5c0,2.21-1.79,4-4,4H4.41l2.29-2.29 C6.89,9.53,7,9.28,7,9c0-0.55-0.45-1-1-1C5.72,8,5.47,8.11,5.29,8.29l-4,4C1.11,12.47,1,12.72,1,13c0,0.28,0.11,0.53,0.29,0.71 l4,4C5.47,17.89,5.72,18,6,18c0.55,0,1-0.45,1-1c0-0.28-0.11-0.53-0.29-0.71L4.41,14H13c3.31,0,6-2.69,6-6V3C19,2.45,18.55,2,18,2 z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
					h = {
						fullscreen:
							"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cg id='maximize_1_' fill='%23FFFFFF'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.99,8.99c-0.28,0-0.53,0.11-0.71,0.29l-3.29,3.29v-1.59c0-0.55-0.45-1-1-1 s-1,0.45-1,1v4c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1s-0.45-1-1-1H3.41L6.7,10.7c0.18-0.18,0.29-0.43,0.29-0.71 C6.99,9.44,6.54,8.99,5.99,8.99z M14.99-0.01h-4c-0.55,0-1,0.45-1,1s0.45,1,1,1h1.59L9.28,5.29C9.1,5.47,8.99,5.72,8.99,5.99 c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l3.29-3.29v1.59c0,0.55,0.45,1,1,1s1-0.45,1-1v-4C15.99,0.44,15.54-0.01,14.99-0.01 z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
						save: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 18.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' fill='%23FFFFFF' xml:space='preserve'%3E%3Cg id='floppy_disk'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.71,2.29l-2-2C13.53,0.11,13.28,0,13,0h-1v6H4V0H1C0.45,0,0,0.45,0,1v14 c0,0.55,0.45,1,1,1h14c0.55,0,1-0.45,1-1V3C16,2.72,15.89,2.47,15.71,2.29z M14,15H2V9c0-0.55,0.45-1,1-1h10c0.55,0,1,0.45,1,1V15 z M11,1H9v4h2V1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A",
						options:
							"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' enable-background='new 0 0 20 20' fill='%23FFF' xml:space='preserve'%3E%3Cg id='cog_2_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19,8h-2.31c-0.14-0.46-0.33-0.89-0.56-1.3l1.7-1.7c0.39-0.39,0.39-1.02,0-1.41 l-1.41-1.41c-0.39-0.39-1.02-0.39-1.41,0l-1.7,1.7c-0.41-0.22-0.84-0.41-1.3-0.55V1c0-0.55-0.45-1-1-1H9C8.45,0,8,0.45,8,1v2.33 C7.52,3.47,7.06,3.67,6.63,3.91L5,2.28c-0.37-0.37-0.98-0.37-1.36,0L2.28,3.64C1.91,4.02,1.91,4.63,2.28,5l1.62,1.62 C3.66,7.06,3.46,7.51,3.31,8H1C0.45,8,0,8.45,0,9v2c0,0.55,0.45,1,1,1h2.31c0.14,0.46,0.33,0.89,0.56,1.3L2.17,15 c-0.39,0.39-0.39,1.02,0,1.41l1.41,1.41c0.39,0.39,1.02,0.39,1.41,0l1.7-1.7c0.41,0.22,0.84,0.41,1.3,0.55V19c0,0.55,0.45,1,1,1h2 c0.55,0,1-0.45,1-1v-2.33c0.48-0.14,0.94-0.35,1.37-0.59L15,17.72c0.37,0.37,0.98,0.37,1.36,0l1.36-1.36 c0.37-0.37,0.37-0.98,0-1.36l-1.62-1.62c0.24-0.43,0.45-0.89,0.6-1.38H19c0.55,0,1-0.45,1-1V9C20,8.45,19.55,8,19,8z M10,14 c-2.21,0-4-1.79-4-4c0-2.21,1.79-4,4-4s4,1.79,4,4C14,12.21,12.21,14,10,14z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
						keyboard:
							"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cg id='manually_entered_data_2_'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' fill-rule='evenodd' clip-rule='evenodd' d='M1,8h3.76l2-2H1C0.45,6,0,6.45,0,7C0,7.55,0.45,8,1,8z M15.49,3.99 C15.8,3.67,16,3.23,16,2.75C16,1.78,15.22,1,14.25,1c-0.48,0-0.92,0.2-1.24,0.51l-1.44,1.44l2.47,2.47L15.49,3.99z M1,4h7.76l2-2 H1C0.45,2,0,2.45,0,3C0,3.55,0.45,4,1,4z M1,10c-0.55,0-1,0.45-1,1c0,0.48,0.35,0.86,0.8,0.96L2.76,10H1z M10.95,3.57l-6.69,6.69 l2.47,2.47l6.69-6.69L10.95,3.57z M15.2,6.04L13.24,8H15c0.55,0,1-0.45,1-1C16,6.52,15.65,6.14,15.2,6.04z M2,15l3.86-1.39 l-2.46-2.44L2,15z M15,10h-3.76l-2,2H15c0.55,0,1-0.45,1-1C16,10.45,15.55,10,15,10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
						up: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' fill='%23FFF' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Ctitle%3EShape%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cg id='Page-1' sketch:type='MSPage'%3E%3Cg id='Artboard-1' transform='translate(-3.000000, -1.000000)' sketch:type='MSArtboardGroup'%3E%3Cpath id='Shape' sketch:type='MSShapeGroup' d='M19.7,8.3l-6-6C13.5,2.1,13.3,2,13,2s-0.5,0.1-0.7,0.3l-6,6C6.1,8.5,6,8.7,6,9 c0,0.6,0.5,1,1,1c0.3,0,0.5-0.1,0.7-0.3L12,5.4V19c0,0.5,0.4,1,1,1s1-0.5,1-1V5.4l4.3,4.3C18.5,9.9,18.7,10,19,10c0.5,0,1-0.4,1-1 C20,8.7,19.9,8.5,19.7,8.3L19.7,8.3z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
						down: u,
						do: u,
						dw: u,
						dwn: u,
						left: d,
						le: d,
						lft: d,
						right: f,
						ri: f,
						rght: f,
						rgh: f,
						enter: p,
						en: p,
						enr: p,
						ent: p,
						entr: p,
					};
			},
			{ '../dom/keys': 32, '../dom/pointer': 36 },
		],
		19: [
			function (e, t, n) {
				'use strict';
				function r(e, t, n) {
					return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
				}
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.getGrid = void 0),
					(n.getGrid = function (e) {
						switch (e) {
							case 'square':
								return new (class {
									constructor() {
										r(this, 'aspect', 0.625);
									}
									getConfiguration(e, t) {
										let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
										const r = this.getCols(),
											o = this.getRows(),
											i = Math.floor(r / 2),
											s = Math.floor(o / 2),
											a = (5 * e) / 100 / 2,
											l = a,
											c = ((e - 2 * a) / r) * n,
											u = ((t - 2 * l) / o) * n,
											d = Math.min(c, u),
											f = [];
										for (let n = 0; n < o; ++n) {
											const c = [];
											for (let u = 0; u < r; ++u)
												c.push({
													centerX: u < i ? a + d * (u + 0.5) : e - a - d * (r - u - 1 + 0.5),
													centerY: n < s ? l + d * (n + 0.5) : t - l - d * (o - n - 1 + 0.5),
												});
											f.push(c);
										}
										return { gridType: 'square', cells: f, columnWidth: d, rowHeight: d, columnsPadding: a, rowsPadding: l, width: e, height: t };
									}
									getCols() {
										return 10;
									}
									getRows() {
										return Math.floor(this.getCols() * this.aspect) + 1;
									}
								})();
							case 'honeycomb':
								return new (class {
									constructor() {
										r(this, 'aspect', 0.625);
									}
									getConfiguration(e, t) {
										let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
										const r = this.getCols(),
											o = this.getRows(),
											i = Math.floor(r / 2),
											s = Math.floor(o / 2),
											a = (5 * e) / 100 / 2,
											l = a,
											c = ((e - 2 * a) / r) * n,
											u = ((t - 2 * l) / o) * n,
											d = Math.min(c, u),
											f = [];
										for (let n = 0; n < o; ++n) {
											const c = [],
												u = n % 2 == 0 ? r : r - 1,
												p = n % 2 == 0 ? 0 : d / 2;
											for (let f = 0; f < u; ++f)
												c.push({
													centerX: f < i ? p + a + d * (f + 0.5) : p + e - a - d * (r - f - 1 + 0.5),
													centerY: n < s ? l + d * (n + 0.5) : t - l - d * (o - n - 1 + 0.5),
												});
											f.push(c);
										}
										return { gridType: 'honeycomb', cells: f, columnWidth: d, rowHeight: d, columnsPadding: a, rowsPadding: l, width: e, height: t };
									}
									getCols() {
										return 10;
									}
									getRows() {
										return Math.floor(this.getCols() * this.aspect) + 1;
									}
								})();
						}
						throw new Error('Unknown grid type ' + e);
					});
			},
			{},
		],
		20: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.keyboard = void 0),
					(n.keyboard = function (e, t, n) {
						const r = n || {};
						function o(e) {
							return void 0 !== r[e] ? r[e] : e;
						}
						return (
							e.setOnKeyDown(e => {
								t.sendKeyEvent(o(e), !0);
							}),
							e.setOnKeyUp(e => {
								t.sendKeyEvent(o(e), !1);
							}),
							e.setOnKeyPress(e => {
								t.simulateKeyPress(o(e));
							}),
							e.setOnKeysPress(e => {
								t.simulateKeyPress(...e);
							}),
							() => {
								e.setOnKeyDown(e => {}), e.setOnKeyUp(e => {}), e.setOnKeyPress(e => {}), e.setOnKeysPress(e => {});
							}
						);
					});
			},
			{},
		],
		21: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.extractLayersConfig = void 0),
					(n.extractLayersConfig = function (e) {
						return void 0 !== e.layersConfig
							? (1 === e.layersConfig.version &&
									(function (e) {
										for (const t of e.layers)
											for (const e of t.controls)
												if ('Key' === e.type) {
													const t = e;
													'number' == typeof t.mapTo && (t.mapTo = [t.mapTo]);
												}
									})(e.layersConfig),
								e.layersConfig)
							: void 0 !== e.layers
								? e.layers
								: null;
					});
			},
			{},
		],
		22: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.initLayersControl = void 0);
				const r = e('./grid'),
					o = e('./button'),
					i = e('./keyboard'),
					s = e('./mouse/mouse-common'),
					a = e('./options'),
					l = e('../dom/pointer'),
					c = e('nipplejs');
				n.initLayersControl = function (e, t, n, o, a, l, c) {
					let f = t.layers[0];
					if (void 0 !== c)
						for (const e of t.layers)
							if (e.title === c) {
								f = e;
								break;
							}
					return (function (e, t, n, o, a, l) {
						const c = (0, i.keyboard)(t, n),
							f = (0, s.mouse)(o.autolock, o.sensitivity, t, n),
							p = [];
						function m(i, s) {
							var c;
							for (const e of p) e();
							p.splice(0, p.length);
							const f = (0, r.getGrid)(e.grid).getConfiguration(i, s, l),
								m = new u();
							for (const t of e.controls) {
								const { row: e, column: n, type: r } = t;
								'NippleActivator' === r && h(f, e, n);
							}
							let y = -1;
							if (0 === (null === (c = t.options.optionControls) || void 0 === c ? void 0 : c.length))
								for (const t of e.controls) {
									const { row: e, type: n } = t;
									if ('Options' === n) {
										y = e;
										break;
									}
								}
							const v = {};
							if (a)
								for (const t of e.controls) {
									const { row: e } = t;
									let n = t.column;
									const r = f.cells[e].length,
										o = r / 2;
									e === y && n >= o && (n = Math.min(n + 1, r - 1)),
										void 0 === v[e] && (v[e] = { leftStart: o, leftEnd: 0, rightStart: r - 1, rightEnd: o }),
										n < o
											? ((v[e].leftStart = Math.min(v[e].leftStart, n)), (v[e].leftEnd = Math.max(v[e].leftEnd, n)))
											: ((v[e].rightStart = Math.min(v[e].rightStart, n)), (v[e].rightEnd = Math.max(v[e].rightEnd, n)));
								}
							for (const r of e.controls) {
								const e = d[r.type];
								if (void 0 === e) {
									console.error("Factory for control '" + r.type + "' is not defined");
									continue;
								}
								const i = { ...r },
									s = f.cells[r.row].length,
									l = s / 2;
								if ((y === r.row && r.column >= l && (i.column = Math.min(i.column + 1, s - 1)), a)) {
									const { leftStart: e, leftEnd: t, rightStart: n, rightEnd: r } = v[i.row],
										o = i.column < l;
									o ? (i.column += l + (l - t) - e - 1) : (i.column -= l + (n - l) - (s - r) + 1),
										i.column >= s
											? (console.error('Column', i.column, 'is out of bound', s, o ? '[leftSide]' : '[rightSide]', v), (i.column = s - 1))
											: i.column < 0 && (console.error('Column', i.column, 'is out of bound', 0, o ? '[leftSide]' : '[rightSide]', v), (i.column = 0));
								}
								const c = e(i, t, n, f, m, o);
								p.push(c);
							}
						}
						return (
							t.addOnResize(m),
							m(t.width, t.height),
							() => {
								t.removeOnResize(m), c(), f();
								for (const e of p) e();
							}
						);
					})(f, e, n, o, a, l);
				};
				class u {
					constructor() {
						var e, t;
						(t = {}), (e = 'sensors') in this ? Object.defineProperty(this, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : (this[e] = t);
					}
					activate(e, t) {
						const n = this.sensors[t + '_' + e];
						void 0 !== n && n.activate();
					}
					deactivate(e, t) {
						const n = this.sensors[t + '_' + e];
						void 0 !== n && n.deactivate();
					}
					register(e, t, n) {
						this.sensors[t + '_' + e] = n;
					}
				}
				const d = {
					Key: function (e, t, n, r, i, s) {
						const { cells: a, columnWidth: l } = r,
							{ row: c, column: u } = e,
							{ centerX: d, centerY: f } = a[c][u],
							h = {
								onDown: () => {
									for (const t of e.mapTo) n.sendKeyEvent(t, !0);
								},
								onUp: () => {
									for (const t of e.mapTo) n.sendKeyEvent(t, !1);
								},
							};
						if ((i.register(c, u, { activate: h.onDown, deactivate: h.onUp }), p(r, c, u))) return () => {};
						const m = (0, o.createButton)(e.symbol, h, l);
						return (
							(m.style.position = 'absolute'),
							(m.style.left = d - m.widthPx / 2 + 'px'),
							(m.style.top = f - m.heightPx / 2 + 'px'),
							t.mouseOverlay.appendChild(m),
							() => t.mouseOverlay.removeChild(m)
						);
					},
					Options: function (e, t, n, r, o, i) {
						var s;
						if (0 === (null === (s = t.options.optionControls) || void 0 === s ? void 0 : s.length)) return () => {};
						if (void 0 !== t.options.optionControls && 1 === t.options.optionControls.length && 'keyboard' === t.options.optionControls[0]) return f(e, t, n, r, o, i);
						const { cells: l, columnWidth: c, rowHeight: u } = r,
							{ row: d, column: p } = e,
							{ centerX: h, centerY: m } = l[d][p],
							y = m - u / 2,
							v = h - c / 2,
							g = r.width - v - c;
						return (0, a.options)(t, ['default'], () => {}, c, y, g);
					},
					Keyboard: f,
					Switch: function (e, t, n, r, i, s) {
						const { cells: a, columnWidth: l } = r,
							{ row: c, column: u } = e,
							{ centerX: d, centerY: f } = a[c][u],
							p = (0, o.createButton)(e.symbol, { onUp: () => s.setLayersConfig(s.getLayersConfig(), e.layerName) }, l);
						return (
							(p.style.position = 'absolute'),
							(p.style.left = d - p.widthPx / 2 + 'px'),
							(p.style.top = f - p.heightPx / 2 + 'px'),
							t.mouseOverlay.appendChild(p),
							() => {
								t.mouseOverlay.removeChild(p);
							}
						);
					},
					ScreenMove: function (e, t, n, r, i, s) {
						const { cells: a, columnWidth: l } = r,
							{ row: c, column: u } = e,
							{ centerX: d, centerY: f } = a[c][u];
						let h = 0.5,
							m = 0.5;
						e.direction.indexOf('up') >= 0 && (m = 0),
							e.direction.indexOf('down') >= 0 && (m = 1),
							e.direction.indexOf('left') >= 0 && (h = 0),
							e.direction.indexOf('right') >= 0 && (h = 1);
						const y = {
							onDown: () => {
								n.sendMouseMotion(h, m);
							},
							onUp: () => {
								n.sendMouseMotion(0.5, 0.5);
							},
						};
						if ((i.register(c, u, { activate: y.onDown, deactivate: y.onUp }), p(r, c, u))) return () => {};
						const v = (0, o.createButton)(e.symbol, y, l);
						return (
							(v.style.position = 'absolute'),
							(v.style.left = d - v.widthPx / 2 + 'px'),
							(v.style.top = f - v.heightPx / 2 + 'px'),
							t.mouseOverlay.appendChild(v),
							() => t.mouseOverlay.removeChild(v)
						);
					},
					PointerButton: function (e, t, n, r, i, s) {
						const { cells: a, columnWidth: l } = r,
							{ row: c, column: u, click: d } = e,
							{ centerX: f, centerY: h } = a[c][u],
							m = {
								onDown: () => {
									d ? n.sendMouseButton(e.button, !0) : (t.pointerButton = e.button);
								},
								onUp: () => {
									d ? n.sendMouseButton(e.button, !1) : (t.pointerButton = 0);
								},
							};
						if ((i.register(c, u, { activate: m.onDown, deactivate: m.onUp }), p(r, c, u))) return () => {};
						const y = (0, o.createButton)(e.symbol, m, l);
						return (
							(y.style.position = 'absolute'),
							(y.style.left = f - y.widthPx / 2 + 'px'),
							(y.style.top = h - y.heightPx / 2 + 'px'),
							t.mouseOverlay.appendChild(y),
							() => t.mouseOverlay.removeChild(y)
						);
					},
					PointerMove: function (e, t, n, r, i, s) {
						const { cells: a, columnWidth: l } = r,
							{ row: c, column: u, x: d, y: f } = e,
							{ centerX: h, centerY: m } = a[c][u],
							y = {
								onDown: () => {
									n.sendMouseMotion(d, f);
								},
								onUp: () => {
									n.sendMouseMotion(d, f);
								},
							};
						if ((i.register(c, u, { activate: y.onDown, deactivate: y.onUp }), p(r, c, u))) return () => {};
						const v = (0, o.createButton)(e.symbol, y, l);
						return (
							(v.style.position = 'absolute'),
							(v.style.left = h - v.widthPx / 2 + 'px'),
							(v.style.top = m - v.heightPx / 2 + 'px'),
							t.mouseOverlay.appendChild(v),
							() => t.mouseOverlay.removeChild(v)
						);
					},
					PointerReset: function (e, t, n, r, i, s) {
						const { cells: a, columnWidth: l } = r,
							{ row: c, column: u } = e,
							{ centerX: d, centerY: f } = a[c][u],
							h = {
								onDown: () => {
									n.sendMouseSync();
								},
							};
						if ((i.register(c, u, { activate: h.onDown, deactivate: () => {} }), p(r, c, u))) return () => {};
						const m = (0, o.createButton)(e.symbol, h, l);
						return (
							(m.style.position = 'absolute'),
							(m.style.left = d - m.widthPx / 2 + 'px'),
							(m.style.top = f - m.heightPx / 2 + 'px'),
							t.mouseOverlay.appendChild(m),
							() => t.mouseOverlay.removeChild(m)
						);
					},
					PointerToggle: function (e, t, n, r, i, s) {
						const { cells: a, columnWidth: l } = r,
							{ row: c, column: u } = e,
							{ centerX: d, centerY: f } = a[c][u],
							h = {
								onDown: () => {
									(t.pointerDisabled = !t.pointerDisabled),
										t.pointerDisabled
											? m.classList.contains('emulator-button-highlight') || m.classList.add('emulator-button-highlight')
											: m.classList.remove('emulator-button-highlight');
								},
							};
						if ((i.register(c, u, { activate: h.onDown, deactivate: () => {} }), p(r, c, u))) return () => {};
						const m = (0, o.createButton)(e.symbol, h, l);
						return (
							(m.style.position = 'absolute'),
							(m.style.left = d - m.widthPx / 2 + 'px'),
							(m.style.top = f - m.heightPx / 2 + 'px'),
							t.mouseOverlay.appendChild(m),
							() => t.mouseOverlay.removeChild(m)
						);
					},
					NippleActivator: function (e, t, n, r, o, i) {
						const { cells: s, columnWidth: a, rowHeight: u, width: d, height: f } = r,
							{ row: p, column: h } = e,
							{ centerX: m, centerY: y } = s[p][h],
							v = document.createElement('div'),
							g = 1.5,
							b = Math.max(0, m - a * g),
							w = Math.max(0, y - u * g),
							_ = Math.max(0, d - m - a * g),
							x = Math.max(0, f - y - u * g);
						(v.style.position = 'absolute'),
							(v.style.zIndex = '999'),
							(v.style.left = b + 'px'),
							(v.style.top = w + 'px'),
							(v.style.right = _ + 'px'),
							(v.style.bottom = x + 'px'),
							t.mouseOverlay.appendChild(v);
						const k = c.create({
							zone: v,
							multitouch: !1,
							maxNumberOfNipples: 1,
							mode: 'static',
							follow: !1,
							dynamicPage: !0,
							size: 1.5 * Math.max(a, u),
							position: { left: (d - _ - b) / 2 + 'px', top: (f - x - w) / 2 + 'px' },
						});
						let C = -1,
							E = -1;
						k.on('move', (e, t) => {
							if (t.distance < 10) return o.deactivate(E, C), (C = -1), void (E = -1);
							let n = -1,
								r = -1;
							const i = t.angle.degree;
							i > 22.5 && i <= 67.5
								? ((n = h + 1), (r = p - 1))
								: i > 67.5 && i <= 112.5
									? ((n = h), (r = p - 1))
									: i > 112.5 && i <= 157.5
										? ((n = h - 1), (r = p - 1))
										: i > 157.5 && i <= 202.5
											? ((n = h - 1), (r = p))
											: i > 202.5 && i <= 247.5
												? ((n = h - 1), (r = p + 1))
												: i > 247.5 && i <= 292.5
													? ((n = h), (r = p + 1))
													: i > 292.5 && i <= 337.5
														? ((n = h + 1), (r = p + 1))
														: ((n = h + 1), (r = p)),
								(C === n && E === r) || (o.deactivate(E, C), o.activate(r, n), (C = n), (E = r));
						});
						let j = !1;
						k.on('start', () => {
							j = !0;
						}),
							k.on('end', () => {
								(j = !1), o.deactivate(E, C), (E = -1), (C = -1);
							});
						const S = { capture: !0 };
						function D(e) {
							j && k.processOnEnd(e);
						}
						for (const e of l.pointer.enders) t.mouseOverlay.addEventListener(e, D, S);
						return () => {
							k.destroy(), t.mouseOverlay.removeChild(v);
							for (const e of l.pointer.enders) t.mouseOverlay.removeEventListener(e, D, S);
						};
					},
				};
				function f(e, t, n, r, i, s) {
					const { cells: a, columnWidth: l } = r,
						{ row: c, column: u } = e,
						{ centerX: d, centerY: f } = a[c][u],
						p = (0, o.createButton)('keyboard', { onUp: () => t.toggleKeyboard() }, l),
						h = e => {
							e ? p.children[0].classList.add('emulator-control-close-icon') : p.children[0].classList.remove('emulator-control-close-icon');
						};
					return (
						t.setOnKeyboardVisibility(h),
						(p.style.position = 'absolute'),
						(p.style.left = d - p.widthPx / 2 + 'px'),
						(p.style.top = f - p.heightPx / 2 + 'px'),
						t.mouseOverlay.appendChild(p),
						() => {
							t.mouseOverlay.removeChild(p), t.removeOnKeyboardVisibility(h);
						}
					);
				}
				function p(e, t, n) {
					return !0 === e.cells[t][n].hidden;
				}
				function h(e, t, n) {
					function r(r, o) {
						if ((r !== t || o !== n) && r >= 0 && r < e.cells.length) {
							const t = e.cells[r];
							o >= 0 && o < t.length && (t[o].hidden = !0);
						}
					}
					for (let e = t - 1; e <= t + 1; ++e) for (let t = n - 1; t <= n + 1; ++t) r(e, t);
				}
			},
			{ '../dom/pointer': 36, './button': 18, './grid': 19, './keyboard': 20, './mouse/mouse-common': 24, './options': 30, nipplejs: 14 },
		],
		23: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.initLegacyLayersControl = void 0);
				const r = e('./button'),
					o = e('./mouse/mouse-common'),
					i = e('./nipple'),
					s = e('./options'),
					a = e('./keyboard');
				n.initLegacyLayersControl = function (e, t, n, l) {
					var c;
					const u = Object.keys(n),
						d = { keyboard: () => {}, mouse: () => {}, gestures: () => {}, buttons: () => {} },
						f = s => {
							d.keyboard(), d.mouse(), d.gestures(), d.buttons(), (d.keyboard = () => {}), (d.mouse = () => {}), (d.gestures = () => {}), (d.buttons = () => {});
							const c = n[s];
							void 0 !== c &&
								((d.keyboard = (0, a.keyboard)(t, l, c.mapper)),
								void 0 !== c.gestures && c.gestures.length > 0
									? (d.gestures = (0, i.nipple)(t, l, c.gestures))
									: (d.mouse = (0, o.mouse)(e.autolock, e.sensitivity, t, l)),
								void 0 !== c.buttons && c.buttons.length && (d.buttons = (0, r.deprecatedButton)(t, l, c.buttons, 54)));
						},
						p = 0 === (null === (c = t.options.optionControls) || void 0 === c ? void 0 : c.length) ? () => {} : (0, s.options)(t, u, f, 54, 13.5, 0);
					return (
						f('default'),
						() => {
							d.gestures(), d.buttons(), d.mouse(), d.keyboard(), p();
						}
					);
				};
			},
			{ './button': 18, './keyboard': 20, './mouse/mouse-common': 24, './nipple': 28, './options': 30 },
		],
		24: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.mouse = n.mount = n.mapXY = void 0);
				const r = e('../../dom/pointer'),
					o = e('./mouse-swipe'),
					i = e('./mouse-not-locked'),
					s = e('./mouse-locked');
				(n.mapXY = function (e, t, n, r) {
					const o = n.width(),
						i = n.height(),
						s = r.width,
						a = r.height,
						l = o / i;
					let c = s,
						u = s / l;
					u > a && ((u = a), (c = a * l));
					const d = (a - u) / 2,
						f = (s - c) / 2;
					let p = Math.max(0, Math.min(1, (e - f) / c)),
						h = Math.max(0, Math.min(1, (t - d) / u));
					return p <= 0.01 && (p = 0), p >= 0.99 && (p = 1), h <= 0.01 && (h = 0), h >= 0.99 && (h = 1), { x: p, y: h };
				}),
					(n.mount = function (e, t, n, o, i, s) {
						let a = 0;
						const l = o => {
								if (o.target !== e) return;
								if (t.pointerDisabled) return void o.stopPropagation();
								const i = (0, r.getPointerState)(o, e);
								(a = i.button || t.pointerButton), n(i.x, i.y, a), o.stopPropagation();
							},
							c = n => {
								if (n.target !== e) return;
								if (t.pointerDisabled) return void n.stopPropagation();
								const i = (0, r.getPointerState)(n, e);
								o(i.x, i.y, i.mX, i.mY), n.stopPropagation();
							},
							u = n => {
								if (t.pointerDisabled) return void n.stopPropagation();
								const o = (0, r.getPointerState)(n, e);
								i(o.x, o.y, a), n.stopPropagation();
							},
							d = n => {
								if (n.target !== e) return;
								if (t.pointerDisabled) return void n.stopPropagation();
								const o = (0, r.getPointerState)(n, e);
								s(o.x, o.y), n.stopPropagation();
							},
							f = e => {
								e.stopPropagation();
							},
							p = { capture: !1 };
						for (const t of r.pointer.starters) e.addEventListener(t, l, p);
						for (const t of r.pointer.changers) e.addEventListener(t, c, p);
						for (const t of r.pointer.enders) e.addEventListener(t, u, p);
						for (const t of r.pointer.prevents) e.addEventListener(t, f, p);
						for (const t of r.pointer.leavers) e.addEventListener(t, d, p);
						return () => {
							for (const t of r.pointer.starters) e.removeEventListener(t, l, p);
							for (const t of r.pointer.changers) e.removeEventListener(t, c, p);
							for (const t of r.pointer.enders) e.removeEventListener(t, u, p);
							for (const t of r.pointer.prevents) e.removeEventListener(t, f, p);
							for (const t of r.pointer.leavers) e.removeEventListener(t, d, p);
						};
					}),
					(n.mouse = function (e, t, n, a) {
						return e && !r.pointer.canLock ? (0, o.mouseSwipe)(t, n, a) : e ? (0, s.mouseLocked)(t, n, a) : (0, i.mouseNotLocked)(n, a);
					});
			},
			{ '../../dom/pointer': 36, './mouse-locked': 25, './mouse-not-locked': 26, './mouse-swipe': 27 },
		],
		25: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.mouseLocked = void 0);
				const r = e('./mouse-common');
				n.mouseLocked = function (e, t, n) {
					const o = t.mouseOverlay;
					function i() {
						return document.pointerLockElement !== o;
					}
					return (0, r.mount)(
						o,
						t,
						function (e, t, r) {
							i() ? (o.requestPointerLock || o.mozRequestPointerLock || o.webkitRequestPointerLock).call(o) : n.sendMouseButton(r, !0);
						},
						function (t, r, o, s) {
							i() || (0 === o && 0 === s) || n.sendMouseRelativeMotion(o * e, s * e);
						},
						function (e, t, r) {
							i() || n.sendMouseButton(r, !1);
						},
						function (e, t) {}
					);
				};
			},
			{ './mouse-common': 24 },
		],
		26: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.mouseNotLocked = void 0);
				const r = e('./mouse-common');
				n.mouseNotLocked = function (e, t) {
					const n = e.mouseOverlay,
						o = (n, o) => (0, r.mapXY)(n, o, t, e);
					return (
						document.pointerLockElement === n && document.exitPointerLock(),
						(0, r.mount)(
							n,
							e,
							function (e, n, r) {
								const i = o(e, n);
								t.sendMouseMotion(i.x, i.y), t.sendMouseButton(r, !0);
							},
							function (e, n, r, i) {
								const s = o(e, n);
								t.sendMouseMotion(s.x, s.y);
							},
							function (e, n, r) {
								const i = o(e, n);
								t.sendMouseMotion(i.x, i.y), t.sendMouseButton(r, !1);
							},
							function (e, n) {
								const r = o(e, n);
								t.sendMouseMotion(r.x, r.y);
							}
						)
					);
				};
			},
			{ './mouse-common': 24 },
		],
		27: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.mouseSwipe = void 0);
				const r = e('./mouse-common');
				n.mouseSwipe = function (e, t, n) {
					const o = t.mouseOverlay;
					let i = -1,
						s = 0,
						a = 0,
						l = 0;
					return (0, r.mount)(
						o,
						t,
						(e, t) => {
							(i = Date.now()), (s = 0), (a = e), (l = t);
						},
						function (t, r, o, i) {
							void 0 === o && (o = t - a),
								void 0 === i && (i = r - l),
								(a = t),
								(l = r),
								(0 === o && 0 === i) || ((s += Math.abs(o) + Math.abs(i)), n.sendMouseRelativeMotion(o * e * 2, i * e * 2));
						},
						(e, r) => {
							if (Date.now() - i < 500 && s < 50) {
								const e = t.pointerButton || 0;
								n.sendMouseButton(e, !0), setTimeout(() => n.sendMouseButton(e, !1), 60);
							}
						},
						() => {}
					);
				};
			},
			{ './mouse-common': 24 },
		],
		28: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.nipple = void 0);
				const r = e('nipplejs'),
					o = e('../dom/keys');
				n.nipple = function (e, t, n) {
					const i = r.create({ zone: e.mouseOverlay, multitouch: !0, maxNumberOfNipples: 2 });
					let s = -1;
					const a = () => {
							-1 !== s && (e.fireKeyUp(s), (s = -1));
						},
						l = {},
						c = {},
						u = {};
					for (const t of n)
						'end:release' === t.event
							? (l[t.joystickId] = !0)
							: t.mapTo !== o.KBD_NONE &&
								('tap' === t.event
									? (c[t.joystickId] = t.mapTo)
									: i.on(t.event, () => {
											var n;
											(u[t.joystickId] = Date.now()), a(), (n = t.mapTo), e.fireKeyDown(n), (s = n);
										}));
					const d = {};
					return (
						i.on('start', () => {
							const e = i.ids.length - 1;
							d[e] = Date.now();
						}),
						i.on('end', () => {
							const t = i.ids.length - 1,
								n = Date.now() - d[t];
							!0 === l[t] && a(), c[t] && n < 500 && u[t] < d[t] && e.fireKeyPress(c[t]);
						}),
						() => i.destroy()
					);
				};
			},
			{ '../dom/keys': 32, nipplejs: 14 },
		],
		29: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.initNullLayersControl = void 0);
				const r = e('./keyboard'),
					o = e('./mouse/mouse-common'),
					i = e('./options');
				n.initNullLayersControl = function (e, t, n) {
					var s;
					const a = (0, r.keyboard)(t, n),
						l = (0, o.mouse)(e.autolock, e.sensitivity, t, n),
						c = 0 === (null === (s = t.options.optionControls) || void 0 === s ? void 0 : s.length) ? () => {} : (0, i.options)(t, ['default'], () => {}, 54, 13.5, 0);
					return () => {
						a(), l(), c();
					};
				};
			},
			{ './keyboard': 20, './mouse/mouse-common': 24, './options': 30 },
		],
		30: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.options = void 0);
				const r = e('./button'),
					o = e('../dom/helpers');
				function i(e, t) {
					if (e.length <= 1) return document.createElement('div');
					const n = document.createElement('select');
					n.classList.add('emulator-control-select');
					for (const t of e) {
						const e = document.createElement('option');
						(e.value = t), (e.innerHTML = t), n.appendChild(e);
					}
					return (
						(n.onchange = e => {
							const n = e.target.value;
							t(n);
						}),
						(0, o.stopPropagation)(n, !1),
						n
					);
				}
				n.options = function (e, t, n, s, a, l) {
					const c = Math.round(s / 4);
					let u = !1,
						d = !1;
					const f = () => {
							const e = u ? 'flex' : 'none';
							for (const t of h) t != m && (t.style.display = e);
						},
						p = () => {
							(u = !u), !u && d && e.toggleKeyboard(), f();
						},
						h = [
							i(t, n),
							(0, r.createButton)(
								'keyboard',
								{
									onClick: () => {
										e.toggleKeyboard(), u && !d && ((u = !1), f());
									},
								},
								s
							),
							(0, r.createButton)(
								'save',
								{
									onClick: () => {
										e.save(), u && p();
									},
								},
								s
							),
							(0, r.createButton)(
								'fullscreen',
								{
									onClick: () => {
										e.toggleFullscreen(), u && p();
									},
								},
								s
							),
							(0, r.createButton)('options', { onClick: p }, s),
						],
						m = h[h.length - 1],
						y = h[h.length - 2].children[0],
						v = h[h.length - 4].children[0],
						g = e => {
							(d = e), e ? v.classList.add('emulator-control-close-icon') : v.classList.remove('emulator-control-close-icon');
						};
					e.setOnKeyboardVisibility(g),
						g(e.keyboardVisible),
						e.setOnFullscreen(e => {
							e
								? y.classList.contains('emulator-control-exit-fullscreen-icon') || y.classList.add('emulator-control-exit-fullscreen-icon')
								: y.classList.remove('emulator-control-exit-fullscreen-icon');
						}),
						e.fullscreen && y.classList.add('emulator-control-exit-fullscreen-icon');
					const b = (0, o.createDiv)('emulator-options'),
						w = d ? 'flex' : 'none';
					for (const e of h)
						e !== m && e.classList.add('emulator-button-control'),
							(e.style.marginRight = c + 'px'),
							(e.style.marginBottom = c + 'px'),
							e !== m && (e.style.display = w),
							b.appendChild(e);
					return (
						(b.style.position = 'absolute'),
						(b.style.right = l + 'px'),
						(b.style.top = a + 'px'),
						e.mouseOverlay.appendChild(b),
						() => {
							e.mouseOverlay.removeChild(b), e.setOnFullscreen(() => {}), e.removeOnKeyboardVisibility(g);
						}
					);
				};
			},
			{ '../dom/helpers': 31, './button': 18 },
		],
		31: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.stopPropagation = n.createDiv = void 0);
				const r = e('./pointer');
				(n.createDiv = function (e, t) {
					const n = document.createElement('div');
					return (n.className = e), void 0 !== t && (n.innerHTML = t), n;
				}),
					(n.stopPropagation = function (e) {
						let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
						const n = e => {
								e.stopPropagation();
							},
							o = e => {
								e.stopPropagation(), t && e.preventDefault();
							},
							i = { capture: !1 };
						for (const t of r.pointer.starters) e.addEventListener(t, n, i);
						for (const t of r.pointer.enders) e.addEventListener(t, n, i);
						for (const t of r.pointer.prevents) e.addEventListener(t, o, i);
					});
			},
			{ './pointer': 36 },
		],
		32: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.KBD_kp0 =
						n.KBD_f12 =
						n.KBD_f11 =
						n.KBD_f10 =
						n.KBD_f9 =
						n.KBD_f8 =
						n.KBD_f7 =
						n.KBD_f6 =
						n.KBD_f5 =
						n.KBD_f4 =
						n.KBD_f3 =
						n.KBD_f2 =
						n.KBD_f1 =
						n.KBD_z =
						n.KBD_y =
						n.KBD_x =
						n.KBD_w =
						n.KBD_v =
						n.KBD_u =
						n.KBD_t =
						n.KBD_s =
						n.KBD_r =
						n.KBD_q =
						n.KBD_p =
						n.KBD_o =
						n.KBD_n =
						n.KBD_m =
						n.KBD_l =
						n.KBD_k =
						n.KBD_j =
						n.KBD_i =
						n.KBD_h =
						n.KBD_g =
						n.KBD_f =
						n.KBD_e =
						n.KBD_d =
						n.KBD_c =
						n.KBD_b =
						n.KBD_a =
						n.KBD_9 =
						n.KBD_8 =
						n.KBD_7 =
						n.KBD_6 =
						n.KBD_5 =
						n.KBD_4 =
						n.KBD_3 =
						n.KBD_2 =
						n.KBD_1 =
						n.KBD_0 =
						n.KBD_NONE =
							void 0),
					(n.KBD_up =
						n.KBD_left =
						n.KBD_pagedown =
						n.KBD_end =
						n.KBD_delete =
						n.KBD_pageup =
						n.KBD_home =
						n.KBD_insert =
						n.KBD_pause =
						n.KBD_printscreen =
						n.KBD_slash =
						n.KBD_comma =
						n.KBD_period =
						n.KBD_quote =
						n.KBD_semicolon =
						n.KBD_rightbracket =
						n.KBD_leftbracket =
						n.KBD_backslash =
						n.KBD_equals =
						n.KBD_minus =
						n.KBD_grave =
						n.KBD_numlock =
						n.KBD_scrolllock =
						n.KBD_capslock =
						n.KBD_rightshift =
						n.KBD_leftshift =
						n.KBD_rightctrl =
						n.KBD_leftctrl =
						n.KBD_rightalt =
						n.KBD_leftalt =
						n.KBD_space =
						n.KBD_enter =
						n.KBD_backspace =
						n.KBD_tab =
						n.KBD_esc =
						n.KBD_kpenter =
						n.KBD_kpplus =
						n.KBD_kpminus =
						n.KBD_kpmultiply =
						n.KBD_kpdivide =
						n.KBD_kpperiod =
						n.KBD_kp9 =
						n.KBD_kp8 =
						n.KBD_kp7 =
						n.KBD_kp6 =
						n.KBD_kp5 =
						n.KBD_kp4 =
						n.KBD_kp3 =
						n.KBD_kp2 =
						n.KBD_kp1 =
							void 0),
					(n.domToKeyCode = n.keyCodesToDom = n.namedKeyCodes = n.domToKeyCodes = n.KBD_extra_lt_gt = n.KBD_right = n.KBD_down = void 0),
					(n.KBD_NONE = 0),
					(n.KBD_0 = 48),
					(n.KBD_1 = 49),
					(n.KBD_2 = 50),
					(n.KBD_3 = 51),
					(n.KBD_4 = 52),
					(n.KBD_5 = 53),
					(n.KBD_6 = 54),
					(n.KBD_7 = 55),
					(n.KBD_8 = 56),
					(n.KBD_9 = 57),
					(n.KBD_a = 65),
					(n.KBD_b = 66),
					(n.KBD_c = 67),
					(n.KBD_d = 68),
					(n.KBD_e = 69),
					(n.KBD_f = 70),
					(n.KBD_g = 71),
					(n.KBD_h = 72),
					(n.KBD_i = 73),
					(n.KBD_j = 74),
					(n.KBD_k = 75),
					(n.KBD_l = 76),
					(n.KBD_m = 77),
					(n.KBD_n = 78),
					(n.KBD_o = 79),
					(n.KBD_p = 80),
					(n.KBD_q = 81),
					(n.KBD_r = 82),
					(n.KBD_s = 83),
					(n.KBD_t = 84),
					(n.KBD_u = 85),
					(n.KBD_v = 86),
					(n.KBD_w = 87),
					(n.KBD_x = 88),
					(n.KBD_y = 89),
					(n.KBD_z = 90),
					(n.KBD_f1 = 290),
					(n.KBD_f2 = 291),
					(n.KBD_f3 = 292),
					(n.KBD_f4 = 293),
					(n.KBD_f5 = 294),
					(n.KBD_f6 = 295),
					(n.KBD_f7 = 296),
					(n.KBD_f8 = 297),
					(n.KBD_f9 = 298),
					(n.KBD_f10 = 299),
					(n.KBD_f11 = 300),
					(n.KBD_f12 = 301),
					(n.KBD_kp0 = 320),
					(n.KBD_kp1 = 321),
					(n.KBD_kp2 = 322),
					(n.KBD_kp3 = 323),
					(n.KBD_kp4 = 324),
					(n.KBD_kp5 = 325),
					(n.KBD_kp6 = 326),
					(n.KBD_kp7 = 327),
					(n.KBD_kp8 = 328),
					(n.KBD_kp9 = 329),
					(n.KBD_kpperiod = 330),
					(n.KBD_kpdivide = 331),
					(n.KBD_kpmultiply = 332),
					(n.KBD_kpminus = 333),
					(n.KBD_kpplus = 334),
					(n.KBD_kpenter = 335),
					(n.KBD_esc = 256),
					(n.KBD_tab = 258),
					(n.KBD_backspace = 259),
					(n.KBD_enter = 257),
					(n.KBD_space = 32),
					(n.KBD_leftalt = 342),
					(n.KBD_rightalt = 346),
					(n.KBD_leftctrl = 341),
					(n.KBD_rightctrl = 345),
					(n.KBD_leftshift = 340),
					(n.KBD_rightshift = 344),
					(n.KBD_capslock = 280),
					(n.KBD_scrolllock = 281),
					(n.KBD_numlock = 282),
					(n.KBD_grave = 96),
					(n.KBD_minus = 45),
					(n.KBD_equals = 61),
					(n.KBD_backslash = 92),
					(n.KBD_leftbracket = 91),
					(n.KBD_rightbracket = 93),
					(n.KBD_semicolon = 59),
					(n.KBD_quote = 39),
					(n.KBD_period = 46),
					(n.KBD_comma = 44),
					(n.KBD_slash = 47),
					(n.KBD_printscreen = 283),
					(n.KBD_pause = 284),
					(n.KBD_insert = 260),
					(n.KBD_home = 268),
					(n.KBD_pageup = 266),
					(n.KBD_delete = 261),
					(n.KBD_end = 269),
					(n.KBD_pagedown = 267),
					(n.KBD_left = 263),
					(n.KBD_up = 265),
					(n.KBD_down = 264),
					(n.KBD_right = 262),
					(n.KBD_extra_lt_gt = 348),
					(n.domToKeyCodes = {
						8: n.KBD_backspace,
						9: n.KBD_tab,
						13: n.KBD_enter,
						16: n.KBD_leftshift,
						17: n.KBD_leftctrl,
						18: n.KBD_leftalt,
						19: n.KBD_pause,
						27: n.KBD_esc,
						32: n.KBD_space,
						33: n.KBD_pageup,
						34: n.KBD_pagedown,
						35: n.KBD_end,
						36: n.KBD_home,
						37: n.KBD_left,
						38: n.KBD_up,
						39: n.KBD_right,
						40: n.KBD_down,
						45: n.KBD_insert,
						46: n.KBD_delete,
						48: n.KBD_0,
						49: n.KBD_1,
						50: n.KBD_2,
						51: n.KBD_3,
						52: n.KBD_4,
						53: n.KBD_5,
						54: n.KBD_6,
						55: n.KBD_7,
						56: n.KBD_8,
						57: n.KBD_9,
						59: n.KBD_semicolon,
						64: n.KBD_equals,
						65: n.KBD_a,
						66: n.KBD_b,
						67: n.KBD_c,
						68: n.KBD_d,
						69: n.KBD_e,
						70: n.KBD_f,
						71: n.KBD_g,
						72: n.KBD_h,
						73: n.KBD_i,
						74: n.KBD_j,
						75: n.KBD_k,
						76: n.KBD_l,
						77: n.KBD_m,
						78: n.KBD_n,
						79: n.KBD_o,
						80: n.KBD_p,
						81: n.KBD_q,
						82: n.KBD_r,
						83: n.KBD_s,
						84: n.KBD_t,
						85: n.KBD_u,
						86: n.KBD_v,
						87: n.KBD_w,
						88: n.KBD_x,
						89: n.KBD_y,
						90: n.KBD_z,
						91: n.KBD_leftbracket,
						93: n.KBD_rightbracket,
						96: n.KBD_kp0,
						97: n.KBD_kp1,
						98: n.KBD_kp2,
						99: n.KBD_kp3,
						100: n.KBD_kp4,
						101: n.KBD_kp5,
						102: n.KBD_kp6,
						103: n.KBD_kp7,
						104: n.KBD_kp8,
						105: n.KBD_kp9,
						111: n.KBD_kpdivide,
						112: n.KBD_f1,
						113: n.KBD_f2,
						114: n.KBD_f3,
						115: n.KBD_f4,
						116: n.KBD_f5,
						117: n.KBD_f6,
						118: n.KBD_f7,
						119: n.KBD_f8,
						120: n.KBD_f9,
						121: n.KBD_f10,
						122: n.KBD_f11,
						123: n.KBD_f12,
						144: n.KBD_numlock,
						145: n.KBD_scrolllock,
						173: n.KBD_minus,
						186: n.KBD_semicolon,
						187: n.KBD_equals,
						188: n.KBD_comma,
						189: n.KBD_minus,
						190: n.KBD_period,
						191: n.KBD_slash,
						219: n.KBD_leftbracket,
						220: n.KBD_backslash,
						221: n.KBD_rightbracket,
					}),
					(n.namedKeyCodes = {
						KBD_NONE: n.KBD_NONE,
						KBD_0: n.KBD_0,
						KBD_1: n.KBD_1,
						KBD_2: n.KBD_2,
						KBD_3: n.KBD_3,
						KBD_4: n.KBD_4,
						KBD_5: n.KBD_5,
						KBD_6: n.KBD_6,
						KBD_7: n.KBD_7,
						KBD_8: n.KBD_8,
						KBD_9: n.KBD_9,
						KBD_a: n.KBD_a,
						KBD_b: n.KBD_b,
						KBD_c: n.KBD_c,
						KBD_d: n.KBD_d,
						KBD_e: n.KBD_e,
						KBD_f: n.KBD_f,
						KBD_g: n.KBD_g,
						KBD_h: n.KBD_h,
						KBD_i: n.KBD_i,
						KBD_j: n.KBD_j,
						KBD_k: n.KBD_k,
						KBD_l: n.KBD_l,
						KBD_m: n.KBD_m,
						KBD_n: n.KBD_n,
						KBD_o: n.KBD_o,
						KBD_p: n.KBD_p,
						KBD_q: n.KBD_q,
						KBD_r: n.KBD_r,
						KBD_s: n.KBD_s,
						KBD_t: n.KBD_t,
						KBD_u: n.KBD_u,
						KBD_v: n.KBD_v,
						KBD_w: n.KBD_w,
						KBD_x: n.KBD_x,
						KBD_y: n.KBD_y,
						KBD_z: n.KBD_z,
						KBD_f1: n.KBD_f1,
						KBD_f2: n.KBD_f2,
						KBD_f3: n.KBD_f3,
						KBD_f4: n.KBD_f4,
						KBD_f5: n.KBD_f5,
						KBD_f6: n.KBD_f6,
						KBD_f7: n.KBD_f7,
						KBD_f8: n.KBD_f8,
						KBD_f9: n.KBD_f9,
						KBD_f10: n.KBD_f10,
						KBD_f11: n.KBD_f11,
						KBD_f12: n.KBD_f12,
						KBD_kp0: n.KBD_kp0,
						KBD_kp1: n.KBD_kp1,
						KBD_kp2: n.KBD_kp2,
						KBD_kp3: n.KBD_kp3,
						KBD_kp4: n.KBD_kp4,
						KBD_kp5: n.KBD_kp5,
						KBD_kp6: n.KBD_kp6,
						KBD_kp7: n.KBD_kp7,
						KBD_kp8: n.KBD_kp8,
						KBD_kp9: n.KBD_kp9,
						KBD_kpperiod: n.KBD_kpperiod,
						KBD_kpdivide: n.KBD_kpdivide,
						KBD_kpmultiply: n.KBD_kpmultiply,
						KBD_kpminus: n.KBD_kpminus,
						KBD_kpplus: n.KBD_kpplus,
						KBD_kpenter: n.KBD_kpenter,
						KBD_esc: n.KBD_esc,
						KBD_tab: n.KBD_tab,
						KBD_backspace: n.KBD_backspace,
						KBD_enter: n.KBD_enter,
						KBD_space: n.KBD_space,
						KBD_leftalt: n.KBD_leftalt,
						KBD_rightalt: n.KBD_rightalt,
						KBD_leftctrl: n.KBD_leftctrl,
						KBD_rightctrl: n.KBD_rightctrl,
						KBD_leftshift: n.KBD_leftshift,
						KBD_rightshift: n.KBD_rightshift,
						KBD_capslock: n.KBD_capslock,
						KBD_scrolllock: n.KBD_scrolllock,
						KBD_numlock: n.KBD_numlock,
						KBD_grave: n.KBD_grave,
						KBD_minus: n.KBD_minus,
						KBD_equals: n.KBD_equals,
						KBD_backslash: n.KBD_backslash,
						KBD_leftbracket: n.KBD_leftbracket,
						KBD_rightbracket: n.KBD_rightbracket,
						KBD_semicolon: n.KBD_semicolon,
						KBD_quote: n.KBD_quote,
						KBD_period: n.KBD_period,
						KBD_comma: n.KBD_comma,
						KBD_slash: n.KBD_slash,
						KBD_printscreen: n.KBD_printscreen,
						KBD_pause: n.KBD_pause,
						KBD_insert: n.KBD_insert,
						KBD_home: n.KBD_home,
						KBD_pageup: n.KBD_pageup,
						KBD_delete: n.KBD_delete,
						KBD_end: n.KBD_end,
						KBD_pagedown: n.KBD_pagedown,
						KBD_left: n.KBD_left,
						KBD_up: n.KBD_up,
						KBD_down: n.KBD_down,
						KBD_right: n.KBD_right,
						KBD_extra_lt_gt: n.KBD_extra_lt_gt,
					}),
					(n.keyCodesToDom = {});
				for (const e of Object.keys(n.domToKeyCodes)) {
					const t = Number.parseInt(e, 10);
					n.keyCodesToDom[n.domToKeyCodes[t]] = t;
				}
				n.domToKeyCode = function (e) {
					return n.domToKeyCodes[e] || 0;
				};
			},
			{},
		],
		33: [
			function (e, t, n) {
				'use strict';
				function r(e, t, n) {
					return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
				}
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.Layers = n.layers = void 0);
				const o = e('notyf'),
					i = (function (e) {
						return e && e.__esModule ? e : { default: e };
					})(e('simple-keyboard')),
					s = e('./helpers'),
					a = e('./keys'),
					l = e('element-resize-detector')({});
				n.layers = function (e, t) {
					return new c(e, t || {});
				};
				class c {
					constructor(e, t) {
						r(this, 'options', void 0),
							r(this, 'root', void 0),
							r(this, 'loading', void 0),
							r(this, 'canvas', void 0),
							r(this, 'video', void 0),
							r(this, 'mouseOverlay', void 0),
							r(this, 'width', void 0),
							r(this, 'height', void 0),
							r(this, 'fullscreen', !1),
							r(this, 'keyboardVisible', !1),
							r(this, 'pointerLock', !1),
							r(this, 'pointerDisabled', !1),
							r(this, 'pointerButton', 0),
							r(this, 'notyf', new o.Notyf()),
							r(this, 'toggleKeyboard', () => !1),
							r(this, 'fullscreenElement', void 0),
							r(this, 'clickToStart', void 0),
							r(this, 'loaderText', void 0),
							r(this, 'onResize', void 0),
							r(this, 'onKeyDown', void 0),
							r(this, 'onKeyUp', void 0),
							r(this, 'onKeyPress', void 0),
							r(this, 'onKeysPress', void 0),
							r(this, 'onSave', void 0),
							r(this, 'onSaveStarted', void 0),
							r(this, 'onSaveEnded', void 0),
							r(this, 'onFullscreenChanged', []),
							r(this, 'onKeyboardChanged', []),
							(this.options = t),
							(this.root = e),
							this.root.classList.add('emulator-root'),
							(this.fullscreenElement = t.fullscreenElement || this.root),
							(this.canvas = document.createElement('canvas')),
							(this.canvas.className = 'emulator-canvas'),
							(this.video = document.createElement('video')),
							this.video.setAttribute('autoplay', ''),
							this.video.setAttribute('playsinline', ''),
							(this.video.className = 'emulator-video'),
							(this.loading = (0, s.createDiv)(
								'emulator-loading',
								"\n<div class='emulator-loading-inner'>\n<pre class='emulator-loading-pre-1'>\n        _                __\n       (_)____      ____/ /___  _____ _________  ____ ___\n      / / ___/_____/ __  / __ \\/ ___// ___/ __ \\/ __ `__ \\\n     / (__  )_____/ /_/ / /_/ (__  )/ /__/ /_/ / / / / / /\n  __/ /____/      \\__,_/\\____/____(_)___/\\____/_/ /_/ /_/\n /___/\n</pre>\n<pre class='emulator-loading-pre-2'>\n</pre>\n<div class='emulator-loader'>\n</div>\n</div>\n"
							)),
							(this.loaderText = this.loading.querySelector('.emulator-loading-pre-2')),
							(this.mouseOverlay = (0, s.createDiv)('emulator-mouse-overlay', '')),
							(this.clickToStart = (0, s.createDiv)(
								'emulator-click-to-start-overlay',
								'\n<div class="emulator-click-to-start-text">Press to start</div>\n<div class="emulator-click-to-start-icon"></div>\n'
							)),
							(this.clickToStart.onclick = () => {
								(this.clickToStart.style.display = 'none'), this.video.play();
							}),
							this.root.appendChild(this.canvas),
							this.root.appendChild(this.video),
							this.root.appendChild(this.mouseOverlay),
							this.root.appendChild(this.clickToStart),
							this.root.appendChild(this.loading),
							(this.width = e.offsetWidth),
							(this.height = e.offsetHeight),
							(this.onResize = []),
							(this.onKeyDown = () => {}),
							(this.onKeyUp = () => {}),
							(this.onKeyPress = () => {}),
							(this.onKeysPress = () => {}),
							(this.onSave = () => Promise.reject(new Error('Not implemented'))),
							(this.onSaveStarted = () => {}),
							(this.onSaveEnded = () => {}),
							l.listenTo(this.root, t => {
								if (t === e) {
									(this.width = t.offsetWidth), (this.height = t.offsetHeight);
									for (const e of this.onResize) e(this.width, this.height);
								}
							}),
							this.initKeyEvents(),
							this.initKeyboard(),
							this.preventContextMenu(),
							(this.fullscreenElement.onfullscreenchange = () => {
								if (document.fullscreenElement !== this.fullscreenElement) {
									this.fullscreen = !1;
									for (const e of this.onFullscreenChanged) e(this.fullscreen);
								}
							});
					}
					initKeyEvents() {
						const e = this.options.keyboardInputDiv ?? this.root;
						(e.style.outline = 'none'),
							(e.tabIndex && -1 !== e.tabIndex) || (e.tabIndex = 0),
							e.addEventListener('keydown', e => {
								const t = (0, a.domToKeyCode)(e.keyCode);
								this.onKeyDown(t), e.stopPropagation(), e.preventDefault();
							}),
							e.addEventListener('keyup', e => {
								const t = (0, a.domToKeyCode)(e.keyCode);
								this.onKeyUp(t), e.stopPropagation(), e.preventDefault();
							});
					}
					preventContextMenu() {
						this.root.addEventListener('contextmenu', e => (e.stopPropagation(), e.preventDefault(), !1));
					}
					addOnResize(e) {
						this.onResize.push(e);
					}
					removeOnResize(e) {
						this.onResize = this.onResize.filter(t => t !== e);
					}
					setOnKeyDown(e) {
						this.onKeyDown = e;
					}
					fireKeyDown(e) {
						this.onKeyDown(e);
					}
					setOnKeyUp(e) {
						this.onKeyUp = e;
					}
					fireKeyUp(e) {
						this.onKeyUp(e);
					}
					setOnKeyPress(e) {
						this.onKeyPress = e;
					}
					fireKeyPress(e) {
						this.onKeyPress(e);
					}
					setOnKeysPress(e) {
						this.onKeysPress = e;
					}
					fireKeysPress(e) {
						this.onKeysPress(e);
					}
					toggleFullscreen() {
						if (this.fullscreen) {
							(this.fullscreen = !1),
								this.fullscreenElement.classList.contains('emulator-fullscreen-workaround')
									? this.fullscreenElement.classList.remove('emulator-fullscreen-workaround')
									: document.exitFullscreen
										? document.exitFullscreen()
										: document.webkitExitFullscreen
											? document.webkitExitFullscreen()
											: document.mozCancelFullScreen
												? document.mozCancelFullScreen()
												: document.msExitFullscreen && document.msExitFullscreen();
							for (const e of this.onFullscreenChanged) e(!1);
						} else {
							this.fullscreen = !0;
							const e = this.fullscreenElement;
							e.requestFullscreen
								? e.requestFullscreen()
								: e.webkitRequestFullscreen
									? e.webkitRequestFullscreen()
									: e.mozRequestFullScreen
										? e.mozRequestFullScreen()
										: e.msRequestFullscreen
											? e.msRequestFullscreen()
											: e.webkitEnterFullscreen
												? e.webkitEnterFullscreen()
												: this.fullscreenElement.classList.add('emulator-fullscreen-workaround');
							for (const e of this.onFullscreenChanged) e(!0);
						}
					}
					setOnFullscreen(e) {
						this.onFullscreenChanged.push(e);
					}
					removeOnFullscreen(e) {
						this.onFullscreenChanged = this.onFullscreenChanged.filter(t => t !== e);
					}
					setOnKeyboardVisibility(e) {
						this.onKeyboardChanged.push(e);
					}
					removeOnKeyboardVisibility(e) {
						this.onKeyboardChanged = this.onKeyboardChanged.filter(t => t !== e);
					}
					save() {
						return (
							this.onSaveStarted(),
							this.onSave()
								.then(() => {
									this.notyf.success('Saved'), this.onSaveEnded();
								})
								.catch(e => {
									this.notyf.error(e.message), this.onSaveEnded();
								})
						);
					}
					setOnSave(e) {
						this.onSave = e;
					}
					getOnSave() {
						return this.onSave;
					}
					setOnSaveStarted(e) {
						this.onSaveStarted = e;
					}
					setOnSaveEnded(e) {
						this.onSaveEnded = e;
					}
					hideLoadingLayer() {
						this.loading.style.visibility = 'hidden';
					}
					showLoadingLayer() {
						this.loading.style.visibility = 'visible';
					}
					setLoadingMessage(e) {
						this.loaderText.innerHTML = e;
					}
					switchToVideo() {
						(this.video.style.display = 'block'), (this.canvas.style.display = 'none');
					}
					showClickToStart() {
						this.clickToStart.style.display = 'flex';
					}
					initKeyboard() {
						let e = !1;
						const t = [
							{
								'{esc}': '␛',
								'{bksp}': '⌫',
								'{enter}': '↵',
								'{space}': 'Space',
								'{up}': '↑',
								'{down}': '↓',
								'{left}': '←',
								'{right}': '→',
								'{shift}': '⇑',
								'{ctrl}': 'Ctrl',
								'{alt}': 'Alt',
								'{tab}': 'Tab',
							},
							{
								'{esc}': '␛',
								'{bksp}': '⌫',
								'{enter}': '↵',
								'{space}': 'Space',
								'{up}': '↑',
								'{down}': '↓',
								'{left}': '←',
								'{right}': '→',
								'{shift}': '⇑',
								'{alt}': 'Alt',
								'{ctrl}': 'Ctrl',
								'{tab}': 'Tab',
								q: 'й',
								w: 'ц',
								e: 'у',
								r: 'к',
								t: 'е',
								y: 'н',
								u: 'г',
								i: 'ш',
								o: 'щ',
								p: 'з',
								'{': 'х',
								'}': 'ъ',
								a: 'ф',
								s: 'ы',
								d: 'в',
								f: 'а',
								g: 'п',
								h: 'р',
								j: 'о',
								k: 'л',
								l: 'д',
								';': 'ж',
								"'": 'э',
								z: 'я',
								x: 'ч',
								c: 'с',
								v: 'м',
								b: 'и',
								n: 'т',
								m: 'ь',
								',': 'б',
								'.': 'ю',
							},
						];
						let n = 0;
						const r = this.options.keyboardDiv || (0, s.createDiv)('');
						r.classList.add('emulator-keyboard'), (r.style.display = 'none'), (0, s.stopPropagation)(r);
						const o = new i.default(r, {
							layout: {
								en: [
									'{esc} ` 1 2 3 4 5 6 7 8 9 0 () - = {bksp} {enter}',
									'{tab} q w e r t y u i o p { } \\ {up}',
									"{shift} {left} {right} a s d f g h j k l ; ' [ {down}",
									'⎘ {alt} {ctrl} z x c v b n m , . / ] {space}',
								],
							},
							layoutName: 'en',
							display: t[n],
							onKeyPress: e => {
								if ('⎘' === e) return;
								const t = u(e);
								for (const e of t) this.fireKeyDown(e);
							},
							onKeyReleased: e => {
								if ('⎘' === e) return (n = (n + 1) % t.length), void o.setOptions({ display: t[n] });
								const r = u(e);
								for (const e of r) this.fireKeyUp(e);
							},
							preventMouseDownDefault: !0,
							preventMouseUpDefault: !0,
							stopMouseDownPropagation: !0,
							stopMouseUpPropagation: !0,
							physicalKeyboardHighlight: !1,
							physicalKeyboardHighlightPress: !1,
							physicalKeyboardHighlightPressUseClick: !1,
							physicalKeyboardHighlightPressUsePointerEvents: !1,
						});
						(this.toggleKeyboard = () => {
							e = !e;
							const t = e ? 'block' : 'none';
							r.style.display = t;
							for (const t of this.onKeyboardChanged) t(e);
							return (this.keyboardVisible = e), e;
						}),
							this.options.keyboardDiv || this.mouseOverlay.appendChild(r);
					}
				}
				function u(e) {
					if (e.length > 1)
						return '{enter}' === e
							? [a.KBD_enter]
							: '{shift}' === e
								? [a.KBD_leftshift]
								: '{bksp}' === e
									? [a.KBD_backspace]
									: '{lock}' === e
										? [a.KBD_capslock]
										: '{tab}' === e
											? [a.KBD_tab]
											: '{space}' === e
												? [a.KBD_space]
												: '{esc}' === e
													? [a.KBD_esc]
													: '{ctrl}' === e
														? [a.KBD_leftctrl]
														: '{alt}' === e
															? [a.KBD_leftalt]
															: '{up}' === e
																? [a.KBD_up]
																: '{down}' === e
																	? [a.KBD_down]
																	: '{left}' === e
																		? [a.KBD_left]
																		: '{right}' === e
																			? [a.KBD_right]
																			: (console.warn('Unknown button', e), []);
					if (',' === e) return [a.KBD_comma];
					if ('.' === e) return [a.KBD_period];
					if ("'" === e) return [a.KBD_quote];
					if (':' === e) return [a.KBD_semicolon];
					if ('{' === e) return [a.KBD_leftshift, a.KBD_leftbracket];
					if ('}' === e) return [a.KBD_leftshift, a.KBD_rightbracket];
					const t = (0, a.domToKeyCode)(e.toUpperCase().charCodeAt(0));
					return 0 === t ? [] : [t];
				}
				n.Layers = c;
			},
			{ './helpers': 31, './keys': 32, 'element-resize-detector': 7, notyf: 15, 'simple-keyboard': 16 },
		],
		34: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.lifecycle = void 0),
					(n.lifecycle = function (e) {
						let t = '',
							n = '';
						function r() {
							document[t] ? e.pause() : e.resume();
						}
						void 0 !== document.hidden
							? ((t = 'hidden'), (n = 'visibilitychange'))
							: void 0 !== document.mozHidden
								? ((t = 'mozHidden'), (n = 'mozvisibilitychange'))
								: void 0 !== document.msHidden
									? ((t = 'msHidden'), (n = 'msvisibilitychange'))
									: void 0 !== document.webkitHidden && ((t = 'webkitHidden'), (n = 'webkitvisibilitychange')),
							document.addEventListener(n, r),
							e.events().onExit(() => {
								document.removeEventListener(n, r);
							});
					});
			},
			{},
		],
		35: [
			function (e, t, n) {
				'use strict';
				function r(e, t, n) {
					return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
				}
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.MemStorage = void 0),
					(n.MemStorage = class {
						constructor() {
							r(this, 'length', 0), r(this, 'storage', {});
						}
						setItem(e, t) {
							(this.storage[e] = t), (this.length = Object.keys(this.storage).length);
						}
						getItem(e) {
							const t = this.storage[e];
							return void 0 === t ? null : t;
						}
						removeItem(e) {
							delete this.storage[e], (this.length = Object.keys(this.storage).length);
						}
						key(e) {
							const t = Object.keys(this.storage);
							return void 0 === t[e] ? null : t[e];
						}
						clear() {
							(this.length = 0), (this.storage = {});
						}
					});
			},
			{},
		],
		36: [
			function (e, t, n) {
				'use strict';
				function r(e, t) {
					if (e.type.match(/^touch/)) {
						const n = e,
							r = t.getBoundingClientRect();
						return { x: n.targetTouches[0].clientX - r.x, y: n.targetTouches[0].clientY - r.y, mX: 0, mY: 0 };
					}
					if (e.type.match(/^pointer/)) {
						const t = e;
						return { x: t.offsetX, y: t.offsetY, mX: t.movementX, mY: t.movementY };
					}
					{
						const t = e;
						return { x: t.offsetX, y: t.offsetY, mX: t.movementX, mY: t.movementY, button: 0 === t.button ? 0 : 1 };
					}
				}
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.pointers = n.getPointerState = n.pointer = void 0),
					(n.pointer = (function () {
						const e = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
							t = e && !!('ontouchstart' in window),
							n = e && !!window.PointerEvent,
							r = e && !!window.MSPointerEvent;
						let o = !e;
						const i = [],
							s = [],
							a = [],
							l = [],
							c = [];
						return (
							n
								? (i.push('pointerdown'), a.push('pointerup', 'pointercancel'), s.push('pointermove'), c.push('touchstart', 'touchmove', 'touchend'))
								: r
									? (i.push('MSPointerDown'), s.push('MSPointerMove'), a.push('MSPointerUp'))
									: t
										? ((o = !1), i.push('touchstart', 'mousedown'), s.push('touchmove'), a.push('touchend', 'touchcancel', 'mouseup'))
										: (i.push('mousedown'), s.push('mousemove'), a.push('mouseup'), l.push('mouseleave')),
							{ mobile: e, canLock: o, starters: i, changers: s, enders: a, prevents: c, leavers: l }
						);
					})()),
					(n.getPointerState = r),
					(n.pointers = { bind: n.pointer, getPointerState: r });
			},
			{},
		],
		37: [
			function (e, t, n) {
				'use strict';
				function r(e, t, n) {
					return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
				}
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.LStorage = void 0);
				const o = e('./mem-storage');
				n.LStorage = class {
					constructor(e, t) {
						r(this, 'backend', void 0), r(this, 'length', void 0), r(this, 'prefix', void 0), (this.prefix = t);
						try {
							(this.backend = e || localStorage), this.testBackend();
						} catch (e) {
							this.backend = new o.MemStorage();
						}
						(this.length = this.backend.length),
							'function' == typeof this.backend.sync &&
								(this.sync = e => {
									this.backend.sync(e);
								});
					}
					testBackend() {
						const e = this.prefix + '.test.record';
						this.backend.setItem(e, '123');
						const t = this.backend.getItem(e);
						if ((this.backend.removeItem(e), '123' !== t || null !== this.backend.getItem(e))) throw new Error('Storage backend is not working properly');
					}
					setLocalStoragePrefix(e) {
						this.prefix = e;
					}
					clear() {
						if (!this.backend.length) return;
						const e = [];
						for (let t = 0; t < this.backend.length; ++t) {
							const n = this.backend.key(t);
							n && n.startsWith(this.prefix) && e.push(n);
						}
						for (const t of e) this.backend.removeItem(t);
						this.length = this.backend.length;
					}
					key(e) {
						return this.backend.key(e);
					}
					setItem(e, t) {
						if (!t || void 0 === t.length || 0 === t.length) return void this.writeStringToKey(e, '');
						let n = 0;
						for (; n < t.length; ) {
							let r = t.substr(n, 1024);
							(n += r.length), n < t.length && (r += '@'), this.writeStringToKey(e, r), (e += '.');
						}
					}
					getItem(e) {
						let t = this.readStringFromKey(e);
						if (null === t) return null;
						if (0 === t.length) return t;
						for (; '@' === t[t.length - 1]; ) {
							(t = t.substr(0, t.length - 1)), (e += '.');
							const n = this.readStringFromKey(e);
							t += null === n ? '' : n;
						}
						return t;
					}
					removeItem(e) {
						this.backend.removeItem(this.prefix + e), (this.length = this.backend.length);
					}
					writeStringToKey(e, t) {
						this.backend.setItem(this.prefix + e, t), (this.length = this.backend.length);
					}
					readStringFromKey(e) {
						return this.backend.getItem(this.prefix + e);
					}
				};
			},
			{ './mem-storage': 35 },
		],
		38: [
			function (e, t, n) {
				'use strict';
				function r(e, t, n) {
					return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
				}
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.EmulatorsUi = void 0);
				const o = e('./build'),
					i = e('./dom/layers'),
					s = e('./dom/lifecycle'),
					a = e('./network/xhr'),
					l = e('./graphics/_2d'),
					c = e('./graphics/webgl'),
					u = e('./graphics/video'),
					d = e('./controls/keyboard'),
					f = e('./controls/mouse/mouse-common'),
					p = e('./controls/nipple'),
					h = e('./controls/options'),
					m = e('./dom/keys'),
					y = e('./sound/audio-node'),
					v = e('./notification/notyf'),
					g = e('./persist/save-load'),
					b = e('./controls/grid'),
					w = e('./dom/pointer'),
					_ = e('./dom/storage'),
					x = e('./js-dos');
				class k {
					constructor() {
						r(this, 'build', o.Build),
							r(this, 'dom', { layers: i.layers, lifecycle: s.lifecycle, pointers: w.pointers, storage: new _.LStorage(void 0, 'emulators.ui.') }),
							r(this, 'network', { resolveBundle: a.resolveBundle }),
							r(this, 'graphics', { webGl: c.webGl, _2d: l._2d, video: u.video }),
							r(this, 'sound', { audioNode: y.audioNode }),
							r(this, 'persist', { save: g.save, load: g.load }),
							r(this, 'controls', {
								getGrid: b.getGrid,
								namedKeyCodes: m.namedKeyCodes,
								domToKeyCodes: m.domToKeyCodes,
								domToKeyCode: m.domToKeyCode,
								keyCodesToDom: m.keyCodesToDom,
								keyboard: d.keyboard,
								mouse: f.mouse,
								nipple: p.nipple,
								options: h.options,
							}),
							r(this, 'notifications', { notyf: v.notyf }),
							r(this, 'dos', (e, t) => new x.DosInstance(e, C, t || {}));
					}
				}
				n.EmulatorsUi = k;
				const C = new k();
				(window.emulatorsUi = C), (window.Dos = C.dos);
			},
			{
				'./build': 17,
				'./controls/grid': 19,
				'./controls/keyboard': 20,
				'./controls/mouse/mouse-common': 24,
				'./controls/nipple': 28,
				'./controls/options': 30,
				'./dom/keys': 32,
				'./dom/layers': 33,
				'./dom/lifecycle': 34,
				'./dom/pointer': 36,
				'./dom/storage': 37,
				'./graphics/_2d': 39,
				'./graphics/video': 40,
				'./graphics/webgl': 41,
				'./js-dos': 42,
				'./network/xhr': 43,
				'./notification/notyf': 44,
				'./persist/save-load': 46,
				'./sound/audio-node': 47,
			},
		],
		39: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n._2d = void 0),
					(n._2d = function (e, t, n) {
						const r = e.canvas,
							o = r.getContext('2d');
						if (null === o) throw new Error('Unable to create 2d context on given canvas');
						let i = e.width,
							s = e.height,
							a = 0,
							l = 0;
						const c = () => {
								const e = n ?? a / l;
								let t = i,
									o = i / e;
								o > s && ((o = s), (t = s * e)),
									(r.style.position = 'relative'),
									(r.style.top = (s - o) / 2 + 'px'),
									(r.style.left = (i - t) / 2 + 'px'),
									(r.style.width = t + 'px'),
									(r.style.height = o + 'px');
							},
							u = (e, t) => {
								(i = e), (s = t), c();
							};
						e.addOnResize(u);
						let d = new Uint8ClampedArray(0);
						const f = (e, t) => {
							(a = e), (l = t), (r.width = a), (r.height = l), (d = new Uint8ClampedArray(e * t * 4)), c();
						};
						t.events().onFrameSize(f),
							t.events().onFrame((e, t) => {
								if (null === e && null === t) return;
								const n = null !== e ? e : t;
								let r = 0,
									i = 0;
								for (; i < d.length; ) (d[i++] = n[r++]), (d[i++] = n[r++]), (d[i++] = n[r++]), (d[i++] = 255), n.length === d.length && r++;
								o.putImageData(new ImageData(d, a, l), 0, 0);
							}),
							f(t.width(), t.height()),
							t.events().onExit(() => {
								e.removeOnResize(u);
							});
					});
			},
			{},
		],
		40: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.video = void 0),
					(n.video = function (e, t) {
						e.switchToVideo(),
							t.events().onMessage((t, n) => {
								'onremotestream' === t && window.Janus.attachMediaStream(e.video, n);
							});
					});
			},
			{},
		],
		41: [
			function (e, t, n) {
				'use strict';
				function r(e, t, n) {
					const r = e.createShader(t);
					if ((e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS))) {
						const t = e.getShaderInfoLog(r);
						throw (e.deleteShader(r), new Error('An error occurred compiling the shaders: ' + t));
					}
					return r;
				}
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.webGl = void 0),
					(n.webGl = function (e, t, n) {
						const o = e.canvas,
							i = o.getContext('webgl');
						if (null === i) throw new Error('Unable to create webgl context on given canvas');
						const s = (function (e, t, n) {
								const o = r(
										e,
										e.VERTEX_SHADER,
										'\nattribute vec4 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nvarying highp vec2 vTextureCoord;\n\nvoid main(void) {\n  gl_Position = aVertexPosition;\n  vTextureCoord = aTextureCoord;\n}\n'
									),
									i = r(
										e,
										e.FRAGMENT_SHADER,
										'\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\n\nvoid main(void) {\n  highp vec4 color = texture2D(uSampler, vTextureCoord);\n  gl_FragColor = vec4(color.r, color.g, color.b, 1.0);\n}\n'
									),
									s = e.createProgram();
								if ((e.attachShader(s, o), e.attachShader(s, i), e.linkProgram(s), !e.getProgramParameter(s, e.LINK_STATUS)))
									throw new Error('Unable to initialize the shader program: ' + e.getProgramInfoLog(s));
								return s;
							})(i),
							a = i.getAttribLocation(s, 'aVertexPosition'),
							l = i.getAttribLocation(s, 'aTextureCoord'),
							c = i.getUniformLocation(s, 'uSampler');
						!(function (e, t, n) {
							const r = e.createBuffer();
							e.bindBuffer(e.ARRAY_BUFFER, r);
							e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]), e.STATIC_DRAW),
								e.vertexAttribPointer(t, 3, e.FLOAT, !1, 0, 0),
								e.enableVertexAttribArray(t);
							const o = e.createBuffer();
							e.bindBuffer(e.ARRAY_BUFFER, o);
							e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]), e.STATIC_DRAW),
								e.vertexAttribPointer(n, 2, e.FLOAT, !1, 0, 0),
								e.enableVertexAttribArray(n);
						})(i, a, l);
						const u = i.createTexture();
						i.bindTexture(i.TEXTURE_2D, u),
							i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE),
							i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE),
							i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR),
							i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR);
						const d = new Uint8Array([0, 0, 0]);
						i.texImage2D(i.TEXTURE_2D, 0, i.RGB, 1, 1, 0, i.RGB, i.UNSIGNED_BYTE, d), i.useProgram(s), i.activeTexture(i.TEXTURE0), i.uniform1i(c, 0);
						let f = e.width,
							p = e.height,
							h = 0,
							m = 0;
						const y = () => {
								const e = n ?? h / m;
								let t = f,
									r = f / e;
								r > p && ((r = p), (t = p * e)),
									(o.style.position = 'relative'),
									(o.style.top = (p - r) / 2 + 'px'),
									(o.style.left = (f - t) / 2 + 'px'),
									(o.style.width = t + 'px'),
									(o.style.height = r + 'px');
							},
							v = (e, t) => {
								(f = e), (p = t), y();
							};
						e.addOnResize(v);
						const g = (e, t) => {
							(h = e), (m = t), (o.width = h), (o.height = m), i.viewport(0, 0, h, m), y();
						};
						t.events().onFrameSize(g), g(t.width(), t.height());
						let b = null,
							w = null,
							_ = 0;
						t.events().onFrame((e, t) => {
							(w = null != e ? e : t), (_ = null != e ? i.RGB : i.RGBA), null === b && (b = requestAnimationFrame(x));
						});
						const x = () => {
							i.texImage2D(i.TEXTURE_2D, 0, _, h, m, 0, _, i.UNSIGNED_BYTE, w), i.drawArrays(i.TRIANGLES, 0, 6), (b = null), (w = null);
						};
						t.events().onExit(() => {
							e.removeOnResize(v);
						});
					});
			},
			{},
		],
		42: [
			function (e, t, n) {
				'use strict';
				function r(e, t, n) {
					return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
				}
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.DosInstance = void 0);
				const o = e('./controls/layers-config'),
					i = e('./controls/legacy-layers-control'),
					s = e('./controls/null-layers-control'),
					a = e('./controls/layers-control'),
					l = e('./dom/pointer');
				n.DosInstance = class {
					constructor(e, t, n) {
						r(this, 'emulatorsUi', void 0),
							r(this, 'emulatorFunction', void 0),
							r(this, 'createTransportLayer', void 0),
							r(this, 'layers', void 0),
							r(this, 'layersConfig', null),
							r(this, 'ciPromise', void 0),
							r(this, 'options', void 0),
							r(this, 'mobileControls', void 0),
							r(this, 'mirroredControls', void 0),
							r(this, 'scaleControls', void 0),
							r(this, 'autolock', void 0),
							r(this, 'sensitivity', void 0),
							r(this, 'storage', void 0),
							r(this, 'volume', void 0),
							r(this, 'clickToStart', void 0),
							r(this, 'unbindControls', () => {}),
							r(this, 'storedLayersConfig', null),
							r(this, 'onMobileControlsChanged', void 0),
							r(this, 'onSensitivityChanged', []),
							r(this, 'onScaleChanged', []),
							r(this, 'onVolumeChanged', []),
							r(this, 'setVolumeImplFn', () => {}),
							r(this, 'registerOnSensitivityChanged', e => {
								this.onSensitivityChanged.push(e);
							}),
							r(this, 'removeOnSensitivityChanged', e => {
								this.onSensitivityChanged = this.onSensitivityChanged.filter(t => t !== e);
							}),
							r(this, 'registerOnScaleChanged', e => {
								this.onScaleChanged.push(e);
							}),
							r(this, 'removeOnScaleChanged', e => {
								this.onScaleChanged = this.onScaleChanged.filter(t => t !== e);
							}),
							r(this, 'registerOnVolumeChanged', e => {
								this.onVolumeChanged.push(e);
							}),
							r(this, 'removeOnVolumeChanged', e => {
								this.onVolumeChanged = this.onVolumeChanged.filter(t => t !== e);
							}),
							(this.options = n),
							(this.emulatorsUi = t),
							(this.storage = t.dom.storage),
							(this.emulatorFunction = n.emulatorFunction || 'dosboxWorker'),
							(this.clickToStart = n.clickToStart || !1),
							(this.layers = this.emulatorsUi.dom.layers(e, n.layersOptions)),
							this.layers.showLoadingLayer(),
							(this.createTransportLayer = n.createTransportLayer),
							(this.mobileControls = l.pointers.bind.mobile),
							(this.autolock = !1),
							(this.mirroredControls = !0 === this.options.mirroredControls || 'true' === this.storage.getItem('mirroredControls'));
						const o = this.options.scaleControls ?? Number.parseFloat(this.storage.getItem('scaleControls') ?? '1.0');
						this.scaleControls = Number.isNaN(o) ? 1 : o;
						const i = this.options.sensitivityValue ?? Number.parseFloat(this.storage.getItem('sensitivity') ?? '1.0');
						this.sensitivity = Number.isNaN(i) ? 1 : i;
						const s = Number.parseFloat(this.storage.getItem('volume') ?? '1.0');
						if (
							((this.volume = Number.isNaN(s) ? 1 : s),
							(this.onMobileControlsChanged = () => {}),
							'backend' === this.emulatorFunction && void 0 === this.createTransportLayer)
						)
							throw new Error("Emulator function set to 'backend' but 'createTransportLayer' is not a function");
					}
					async run(e, t, n) {
						var r, i, s;
						await this.stop(), this.layers.setLoadingMessage('Starting...');
						const a = null != n && n.length > 0 ? n : e + '.changes';
						let l;
						try {
							l = await this.runBundle(e, t, a);
						} catch (e) {
							throw (
								(this.layers.setLoadingMessage('Unexpected error occured...'),
								this.layers.notyf.error({ message: "Can't start emulator look browser logs for more info" }),
								console.error(e),
								e)
							);
						}
						const c = this.emulatorsUi;
						if ('janus' === this.emulatorFunction) c.graphics.video(this.layers, l);
						else {
							c.persist.save(a, this.layers, l, emulators);
							try {
								if (!0 === this.options.noWebGL) throw new Error('WebGL is disabled by options');
								c.graphics.webGl(this.layers, l, this.options.aspect);
							} catch (e) {
								console.error('Unable to create webgl canvas, fallback to 2d rendering'), c.graphics._2d(this.layers, l, this.options.aspect);
							}
							(this.setVolumeImplFn = c.sound.audioNode(l)), this.setVolumeImplFn(this.volume);
						}
						c.dom.lifecycle(l);
						const u = await l.config();
						return (
							(this.autolock =
								!0 ===
								(null === (r = u.output) || void 0 === r || null === (i = r.options) || void 0 === i || null === (s = i.autolock) || void 0 === s
									? void 0
									: s.value)),
							await this.setLayersConfig((0, o.extractLayersConfig)(u)),
							this.mobileControls || ((this.mobileControls = !0), this.disableMobileControls()),
							this.layers.setLoadingMessage('Ready'),
							this.layers.hideLoadingLayer(),
							this.clickToStart && this.layers.showClickToStart(),
							l
						);
					}
					async stop() {
						if ((this.layers.showLoadingLayer(), void 0 === this.ciPromise)) return;
						const e = await this.ciPromise;
						delete this.ciPromise, await e.exit();
					}
					async setLayersConfig(e, t) {
						if (void 0 === this.ciPromise) return;
						const n = await this.ciPromise;
						(this.layersConfig = e),
							this.unbindControls(),
							null === e
								? (this.unbindControls = (0, s.initNullLayersControl)(this, this.layers, n))
								: void 0 === e.version
									? (this.unbindControls = (0, i.initLegacyLayersControl)(this, this.layers, e, n))
									: (this.unbindControls = (0, a.initLayersControl)(this.layers, e, n, this, this.mirroredControls, this.scaleControls, t));
					}
					getLayersConfig() {
						return this.layersConfig;
					}
					async enableMobileControls() {
						this.mobileControls ||
							((this.mobileControls = !0), await this.setLayersConfig(this.storedLayersConfig), (this.storedLayersConfig = null), this.onMobileControlsChanged(!0));
					}
					async disableMobileControls() {
						this.mobileControls &&
							((this.mobileControls = !1), (this.storedLayersConfig = this.layersConfig), await this.setLayersConfig(null), this.onMobileControlsChanged(!1));
					}
					async setMirroredControls(e) {
						this.mirroredControls !== e &&
							((this.mirroredControls = e),
							this.storage.setItem('mirroredControls', e + ''),
							e
								? this.mobileControls
									? await this.setLayersConfig(this.layersConfig)
									: await this.enableMobileControls()
								: this.mobileControls && (await this.setLayersConfig(this.layersConfig)));
					}
					async setScaleControls(e) {
						if (e !== this.scaleControls) {
							(this.scaleControls = e), this.storage.setItem('scaleControls', e + ''), this.mobileControls && (await this.setLayersConfig(this.layersConfig));
							for (const e of this.onScaleChanged) e(this.scaleControls);
						}
					}
					async setSensitivity(e) {
						if (e !== this.sensitivity) {
							(this.sensitivity = e), this.storage.setItem('sensitivity', e + ''), await this.setLayersConfig(this.layersConfig);
							for (const e of this.onSensitivityChanged) e(this.sensitivity);
						}
					}
					async setVolume(e) {
						(this.volume = e), this.storage.setItem('volume', e + ''), this.setVolumeImplFn(e);
						for (const e of this.onVolumeChanged) e(this.volume);
					}
					async setAutolock(e) {
						e !== this.autolock && ((this.autolock = e), await this.setLayersConfig(this.layersConfig));
					}
					setOnMobileControlsChanged(e) {
						this.onMobileControlsChanged = e;
					}
					async runBundle(e, t, n) {
						const r = this.emulatorsUi;
						if ('janus' === this.emulatorFunction) this.layers.setLoadingMessage('Connecting...'), (this.ciPromise = emulators.janus(e));
						else {
							this.layers.setLoadingMessage('Downloading bundle ...');
							const o = r.network.resolveBundle(e, { onprogress: e => this.layers.setLoadingMessage('Downloading bundle ' + e + '%') }),
								i = {
									onExtractProgress: (e, t, n, r) => {
										if (0 !== e) return;
										const o = Math.round((n / r) * 100),
											i = t.lastIndexOf('/'),
											s = t.substring(i + 1);
										this.layers.setLoadingMessage('Extracting ' + o + '% (' + s + ')');
									},
								};
							try {
								let e;
								e = null != t && t.length > 0 ? await r.network.resolveBundle(t, { httpCache: !1 }) : await r.persist.load(n, emulators);
								const s = await o;
								'backend' === this.emulatorFunction
									? (this.ciPromise = emulators.backend([s, e], this.createTransportLayer(), i))
									: (this.ciPromise = emulators[this.emulatorFunction]([s, e], i));
							} catch {
								const e = await o;
								'backend' === this.emulatorFunction
									? (this.ciPromise = emulators.backend([e], this.createTransportLayer(), i))
									: (this.ciPromise = emulators[this.emulatorFunction]([e], i));
							}
						}
						return this.ciPromise;
					}
				};
			},
			{ './controls/layers-config': 21, './controls/layers-control': 22, './controls/legacy-layers-control': 23, './controls/null-layers-control': 29, './dom/pointer': 36 },
		],
		43: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.resolveBundle = void 0),
					(n.resolveBundle = async function (e, t) {
						const n = null == t ? void 0 : t.onprogress,
							r = !(!1 === (null == t ? void 0 : t.httpCache));
						return new Promise((t, o) => {
							const i = new XMLHttpRequest();
							i.open('GET', e, !0),
								i.overrideMimeType('text/plain; charset=x-user-defined'),
								i.addEventListener('error', () => {
									o(new Error("Network error, can't download " + e));
								}),
								i.addEventListener(
									'abort',
									() => {
										o(new Error('Request canceled for url ' + e));
									},
									!1
								),
								(i.responseType = 'arraybuffer'),
								(i.onreadystatechange = () => {
									4 === i.readyState &&
										(200 === i.status ? (void 0 !== n && n(100), t(new Uint8Array(i.response))) : o(new Error("Network error, can't download " + e)));
								}),
								void 0 !== n &&
									(i.onprogress = e => {
										if (e.total && e.total > 0) {
											const t = Math.round((1e4 * e.loaded) / e.total) / 100;
											n(t);
										}
									}),
								!1 === r &&
									(i.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0'),
									i.setRequestHeader('Expires', 'Tue, 01 Jan 1980 1:00:00 GMT'),
									i.setRequestHeader('Pragma', 'no-cache')),
								i.send();
						});
					});
			},
			{},
		],
		44: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.notyf = void 0),
					(n.notyf = function (e, t) {
						const n = e.notyf;
						t.events().onMessage(function (e) {
							if ('error' === e) {
								for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
								n.error({ message: JSON.stringify(r) });
							}
						});
					});
			},
			{},
		],
		45: [
			function (e, t, n) {
				'use strict';
				function r(e, t, n) {
					return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
				}
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.makeCache = void 0);
				class o {
					close() {}
					put(e, t) {
						return Promise.resolve();
					}
					get(e, t) {
						return void 0 !== t ? Promise.resolve(t) : Promise.reject(new Error('Cache is not supported on this host'));
					}
					forEach(e, t) {
						t();
					}
				}
				n.makeCache = function (e, t) {
					return new Promise(n => {
						new i(e, n, e => {
							t.onErr(e), n(new o());
						});
					});
				};
				class i {
					constructor(e, t, n) {
						if (
							(r(this, 'version', void 0),
							r(this, 'storeName', 'files'),
							r(this, 'indexedDB', void 0),
							r(this, 'db', null),
							(this.version = e),
							(this.indexedDB = 'undefined' == typeof window ? void 0 : window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB),
							this.indexedDB)
						)
							try {
								const r = this.indexedDB.open('js-dos-cache (' + e + ')', 1);
								(r.onerror = e => {
									var t;
									n("Can't open cache database: " + (null === (t = r.error) || void 0 === t ? void 0 : t.message));
								}),
									(r.onsuccess = e => {
										(this.db = r.result), t(this);
									}),
									(r.onupgradeneeded = e => {
										try {
											(this.db = r.result),
												(this.db.onerror = e => {
													n("Can't upgrade cache database");
												}),
												this.db.createObjectStore(this.storeName);
										} catch (e) {
											n("Can't upgrade cache database");
										}
									});
							} catch (e) {
								n("Can't open cache database: " + e.message);
							}
						else n('Indexed db is not supported on this host');
					}
					close() {
						null !== this.db && (this.db.close(), (this.db = null));
					}
					put(e, t) {
						return new Promise(n => {
							if (null === this.db) return void n();
							const r = this.db.transaction(this.storeName, 'readwrite');
							(r.oncomplete = () => n()), r.objectStore(this.storeName).put(t, e);
						});
					}
					get(e, t) {
						return new Promise((n, r) => {
							function o(e) {
								void 0 === t ? r(new Error(e)) : n(t);
							}
							if (null === this.db) return void o('db is not initalized');
							const i = this.db.transaction(this.storeName, 'readonly').objectStore(this.storeName).get(e);
							(i.onerror = () => r(new Error("Can't read value for key '" + e + "'"))),
								(i.onsuccess = () => {
									i.result ? n(i.result) : o("Result is empty for key '" + e + "', result: " + i.result);
								});
						});
					}
					forEach(e, t) {
						if (null === this.db) return void t();
						const n = this.db.transaction(this.storeName, 'readonly').objectStore(this.storeName).openCursor();
						(n.onerror = () => t()),
							(n.onsuccess = n => {
								const r = n.target.result;
								r ? (e(r.key.toString(), r.value), r.continue()) : t();
							});
					}
				}
			},
			{},
		],
		46: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.load = n.save = void 0);
				const r = (0, e('./cache').makeCache)('emulators-ui-saves', { onErr: console.error });
				(n.save = function (e, t, n, o) {
					t.setOnSave(async () => {
						const t = await r,
							o = await n.persist();
						return t.put(e, o.buffer);
					});
				}),
					(n.load = async function (e, t) {
						return (await r).get(e).then(e => new Uint8Array(e));
					});
			},
			{ './cache': 45 },
		],
		47: [
			function (e, t, n) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }), (n.audioNode = void 0);
				class r {
					constructor() {
						var e, t;
						(t = []), (e = 'samplesQueue') in this ? Object.defineProperty(this, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : (this[e] = t);
					}
					push(e) {
						this.samplesQueue.push(e);
					}
					length() {
						let e = 0;
						for (const t of this.samplesQueue) e += t.length;
						return e;
					}
					writeTo(e, t) {
						let n = 0;
						for (; this.samplesQueue.length > 0; ) {
							const r = this.samplesQueue[0],
								o = Math.min(t - n, r.length);
							if ((o === r.length ? (e.set(r, n), this.samplesQueue.shift()) : (e.set(r.slice(0, o), n), (this.samplesQueue[0] = r.slice(o))), (n += o), n === t))
								break;
						}
						n < t && e.fill(0, n);
					}
				}
				n.audioNode = function (e) {
					const t = e.soundFrequency();
					if (0 === t) return console.warn("Can't create audio node with sampleRate === 0, ingnoring"), () => {};
					let n = null;
					if (
						('undefined' != typeof AudioContext
							? (n = new AudioContext({ sampleRate: t, latencyHint: 'interactive' }))
							: void 0 !== window.webkitAudioContext && (n = new window.webkitAudioContext({ sampleRate: t, latencyHint: 'interactive' })),
						null == n)
					)
						return () => {};
					const o = new r();
					e.events().onSoundPush(e => {
						o.length() < 6144 && o.push(e);
					});
					const i = n.createScriptProcessor(2048, 0, 1);
					let s = !1,
						a = 0;
					const l = e.directSound;
					i.onaudioprocess =
						void 0 !== e.directSound
							? e => {
									if (!s) {
										const e = l.buffer[0];
										s = Math.ceil(e[e.length - 1]) > 0;
									}
									if (!s) return;
									let t = 0,
										n = e.outputBuffer.length;
									const r = e.outputBuffer.numberOfChannels;
									let o,
										i = l.buffer[a];
									for (; n > 0 && (o = Math.ceil(i[i.length - 1])) > 0; )
										if (n >= o) {
											const s = i.subarray(0, o);
											for (let n = 0; n < r; ++n) e.outputBuffer.getChannelData(n).set(s, t);
											(t += o), (n -= o), (i[i.length - 1] = 0), (a = (a + 1) % l.ringSize), (i = l.buffer[a]);
										} else {
											const s = i.subarray(0, n);
											for (let n = 0; n < r; ++n) e.outputBuffer.getChannelData(n).set(s, t);
											(i[i.length - 1] = o - n), i.set(i.subarray(n, n + i[i.length - 1])), (n = 0);
										}
								}
							: e => {
									const t = e.outputBuffer.length,
										n = e.outputBuffer.numberOfChannels,
										r = o.length();
									if ((s || (s = r >= 2048), s))
										for (let r = 0; r < n; r++) {
											const n = e.outputBuffer.getChannelData(r);
											o.writeTo(n, t);
										}
								};
					const c = n.createGain();
					c.connect(n.destination), i.connect(c), (c.gain.value = 1);
					const u = () => {
						null !== n && 'suspended' === n.state && n.resume();
					};
					return (
						document.addEventListener('click', u, { once: !0 }),
						document.addEventListener('touchstart', u, { once: !0 }),
						document.addEventListener('keydown', u, { once: !0 }),
						e.events().onExit(() => {
							null !== n && (i.disconnect(), c.disconnect(), n.close()),
								document.removeEventListener('click', u),
								document.removeEventListener('touchstart', u),
								document.removeEventListener('keydown', u);
						}),
						e => {
							c.gain.value = e;
						}
					);
				};
			},
			{},
		],
	},
	{},
	[38]
),
	(function e(t, n, r) {
		function o(s, a) {
			if (!n[s]) {
				if (!t[s]) {
					var l = 'function' == typeof require && require;
					if (!a && l) return l(s, !0);
					if (i) return i(s, !0);
					var c = new Error("Cannot find module '" + s + "'");
					throw ((c.code = 'MODULE_NOT_FOUND'), c);
				}
				var u = (n[s] = { exports: {} });
				t[s][0].call(
					u.exports,
					function (e) {
						return o(t[s][1][e] || e);
					},
					u,
					u.exports,
					e,
					t,
					n,
					r
				);
			}
			return n[s].exports;
		}
		for (var i = 'function' == typeof require && require, s = 0; s < r.length; s++) o(r[s]);
		return o;
	})(
		{
			1: [
				function (e, t, n) {
					var r = e('../internals/is-callable'),
						o = e('../internals/try-to-string'),
						i = TypeError;
					t.exports = function (e) {
						if (r(e)) return e;
						throw i(o(e) + ' is not a function');
					};
				},
				{ '../internals/is-callable': 67, '../internals/try-to-string': 120 },
			],
			2: [
				function (e, t, n) {
					var r = e('../internals/is-constructor'),
						o = e('../internals/try-to-string'),
						i = TypeError;
					t.exports = function (e) {
						if (r(e)) return e;
						throw i(o(e) + ' is not a constructor');
					};
				},
				{ '../internals/is-constructor': 68, '../internals/try-to-string': 120 },
			],
			3: [
				function (e, t, n) {
					var r = e('../internals/is-callable'),
						o = String,
						i = TypeError;
					t.exports = function (e) {
						if ('object' == typeof e || r(e)) return e;
						throw i("Can't set " + o(e) + ' as a prototype');
					};
				},
				{ '../internals/is-callable': 67 },
			],
			4: [
				function (e, t, n) {
					var r = e('../internals/well-known-symbol'),
						o = e('../internals/object-create'),
						i = e('../internals/object-define-property').f,
						s = r('unscopables'),
						a = Array.prototype;
					null == a[s] && i(a, s, { configurable: !0, value: o(null) }),
						(t.exports = function (e) {
							a[s][e] = !0;
						});
				},
				{ '../internals/object-create': 81, '../internals/object-define-property': 83, '../internals/well-known-symbol': 127 },
			],
			5: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/string-multibyte').charAt;
					t.exports = function (e, t, n) {
						return t + (n ? r(e, t).length : 1);
					};
				},
				{ '../internals/string-multibyte': 107 },
			],
			6: [
				function (e, t, n) {
					var r = e('../internals/object-is-prototype-of'),
						o = TypeError;
					t.exports = function (e, t) {
						if (r(t, e)) return e;
						throw o('Incorrect invocation');
					};
				},
				{ '../internals/object-is-prototype-of': 88 },
			],
			7: [
				function (e, t, n) {
					var r = e('../internals/is-object'),
						o = String,
						i = TypeError;
					t.exports = function (e) {
						if (r(e)) return e;
						throw i(o(e) + ' is not an object');
					};
				},
				{ '../internals/is-object': 71 },
			],
			8: [
				function (e, t, n) {
					t.exports = 'undefined' != typeof ArrayBuffer && 'undefined' != typeof DataView;
				},
				{},
			],
			9: [
				function (e, t, n) {
					'use strict';
					var r,
						o,
						i,
						s = e('../internals/array-buffer-native'),
						a = e('../internals/descriptors'),
						l = e('../internals/global'),
						c = e('../internals/is-callable'),
						u = e('../internals/is-object'),
						d = e('../internals/has-own-property'),
						f = e('../internals/classof'),
						p = e('../internals/try-to-string'),
						h = e('../internals/create-non-enumerable-property'),
						m = e('../internals/define-built-in'),
						y = e('../internals/object-define-property').f,
						v = e('../internals/object-is-prototype-of'),
						g = e('../internals/object-get-prototype-of'),
						b = e('../internals/object-set-prototype-of'),
						w = e('../internals/well-known-symbol'),
						_ = e('../internals/uid'),
						x = e('../internals/internal-state'),
						k = x.enforce,
						C = x.get,
						E = l.Int8Array,
						j = E && E.prototype,
						S = l.Uint8ClampedArray,
						D = S && S.prototype,
						O = E && g(E),
						P = j && g(j),
						B = Object.prototype,
						M = l.TypeError,
						I = w('toStringTag'),
						A = _('TYPED_ARRAY_TAG'),
						T = s && !!b && 'Opera' !== f(l.opera),
						K = !1,
						L = { Int8Array: 1, Uint8Array: 1, Uint8ClampedArray: 1, Int16Array: 2, Uint16Array: 2, Int32Array: 4, Uint32Array: 4, Float32Array: 4, Float64Array: 8 },
						R = { BigInt64Array: 8, BigUint64Array: 8 },
						N = function (e) {
							var t = g(e);
							if (u(t)) {
								var n = C(t);
								return n && d(n, 'TypedArrayConstructor') ? n.TypedArrayConstructor : N(t);
							}
						},
						z = function (e) {
							if (!u(e)) return !1;
							var t = f(e);
							return d(L, t) || d(R, t);
						};
					for (r in L) (i = (o = l[r]) && o.prototype) ? (k(i).TypedArrayConstructor = o) : (T = !1);
					for (r in R) (i = (o = l[r]) && o.prototype) && (k(i).TypedArrayConstructor = o);
					if (
						(!T || !c(O) || O === Function.prototype) &&
						((O = function () {
							throw M('Incorrect invocation');
						}),
						T)
					)
						for (r in L) l[r] && b(l[r], O);
					if ((!T || !P || P === B) && ((P = O.prototype), T)) for (r in L) l[r] && b(l[r].prototype, P);
					if ((T && g(D) !== P && b(D, P), a && !d(P, I)))
						for (r in ((K = !0),
						y(P, I, {
							get: function () {
								return u(this) ? this[A] : void 0;
							},
						}),
						L))
							l[r] && h(l[r], A, r);
					t.exports = {
						NATIVE_ARRAY_BUFFER_VIEWS: T,
						TYPED_ARRAY_TAG: K && A,
						aTypedArray: function (e) {
							if (z(e)) return e;
							throw M('Target is not a typed array');
						},
						aTypedArrayConstructor: function (e) {
							if (c(e) && (!b || v(O, e))) return e;
							throw M(p(e) + ' is not a typed array constructor');
						},
						exportTypedArrayMethod: function (e, t, n, r) {
							if (a) {
								if (n)
									for (var o in L) {
										var i = l[o];
										if (i && d(i.prototype, e))
											try {
												delete i.prototype[e];
											} catch (n) {
												try {
													i.prototype[e] = t;
												} catch (e) {}
											}
									}
								(P[e] && !n) || m(P, e, n ? t : (T && j[e]) || t, r);
							}
						},
						exportTypedArrayStaticMethod: function (e, t, n) {
							var r, o;
							if (a) {
								if (b) {
									if (n)
										for (r in L)
											if ((o = l[r]) && d(o, e))
												try {
													delete o[e];
												} catch (e) {}
									if (O[e] && !n) return;
									try {
										return m(O, e, n ? t : (T && O[e]) || t);
									} catch (e) {}
								}
								for (r in L) !(o = l[r]) || (o[e] && !n) || m(o, e, t);
							}
						},
						getTypedArrayConstructor: N,
						isView: function (e) {
							if (!u(e)) return !1;
							var t = f(e);
							return 'DataView' === t || d(L, t) || d(R, t);
						},
						isTypedArray: z,
						TypedArray: O,
						TypedArrayPrototype: P,
					};
				},
				{
					'../internals/array-buffer-native': 8,
					'../internals/classof': 20,
					'../internals/create-non-enumerable-property': 24,
					'../internals/define-built-in': 27,
					'../internals/descriptors': 31,
					'../internals/global': 55,
					'../internals/has-own-property': 56,
					'../internals/internal-state': 64,
					'../internals/is-callable': 67,
					'../internals/is-object': 71,
					'../internals/object-define-property': 83,
					'../internals/object-get-prototype-of': 87,
					'../internals/object-is-prototype-of': 88,
					'../internals/object-set-prototype-of': 92,
					'../internals/try-to-string': 120,
					'../internals/uid': 124,
					'../internals/well-known-symbol': 127,
				},
			],
			10: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/global'),
						o = e('../internals/function-uncurry-this'),
						i = e('../internals/descriptors'),
						s = e('../internals/array-buffer-native'),
						a = e('../internals/function-name'),
						l = e('../internals/create-non-enumerable-property'),
						c = e('../internals/define-built-ins'),
						u = e('../internals/fails'),
						d = e('../internals/an-instance'),
						f = e('../internals/to-integer-or-infinity'),
						p = e('../internals/to-length'),
						h = e('../internals/to-index'),
						m = e('../internals/ieee754'),
						y = e('../internals/object-get-prototype-of'),
						v = e('../internals/object-set-prototype-of'),
						g = e('../internals/object-get-own-property-names').f,
						b = e('../internals/object-define-property').f,
						w = e('../internals/array-fill'),
						_ = e('../internals/array-slice-simple'),
						x = e('../internals/set-to-string-tag'),
						k = e('../internals/internal-state'),
						C = a.PROPER,
						E = a.CONFIGURABLE,
						j = k.get,
						S = k.set,
						D = 'ArrayBuffer',
						O = 'Wrong index',
						P = r.ArrayBuffer,
						B = P,
						M = B && B.prototype,
						I = r.DataView,
						A = I && I.prototype,
						T = Object.prototype,
						K = r.Array,
						L = r.RangeError,
						R = o(w),
						N = o([].reverse),
						z = m.pack,
						F = m.unpack,
						U = function (e) {
							return [255 & e];
						},
						H = function (e) {
							return [255 & e, (e >> 8) & 255];
						},
						V = function (e) {
							return [255 & e, (e >> 8) & 255, (e >> 16) & 255, (e >> 24) & 255];
						},
						q = function (e) {
							return (e[3] << 24) | (e[2] << 16) | (e[1] << 8) | e[0];
						},
						W = function (e) {
							return z(e, 23, 4);
						},
						G = function (e) {
							return z(e, 52, 8);
						},
						Y = function (e, t) {
							b(e.prototype, t, {
								get: function () {
									return j(this)[t];
								},
							});
						},
						X = function (e, t, n, r) {
							var o = h(n),
								i = j(e);
							if (o + t > i.byteLength) throw L(O);
							var s = j(i.buffer).bytes,
								a = o + i.byteOffset,
								l = _(s, a, a + t);
							return r ? l : N(l);
						},
						$ = function (e, t, n, r, o, i) {
							var s = h(n),
								a = j(e);
							if (s + t > a.byteLength) throw L(O);
							for (var l = j(a.buffer).bytes, c = s + a.byteOffset, u = r(+o), d = 0; d < t; d++) l[c + d] = u[i ? d : t - d - 1];
						};
					if (s) {
						var J = C && P.name !== D;
						if (
							u(function () {
								P(1);
							}) &&
							u(function () {
								new P(-1);
							}) &&
							!u(function () {
								return new P(), new P(1.5), new P(NaN), J && !E;
							})
						)
							J && E && l(P, 'name', D);
						else {
							(B = function (e) {
								return d(this, M), new P(h(e));
							}).prototype = M;
							for (var Q, Z = g(P), ee = 0; Z.length > ee; ) (Q = Z[ee++]) in B || l(B, Q, P[Q]);
							M.constructor = B;
						}
						v && y(A) !== T && v(A, T);
						var te = new I(new B(2)),
							ne = o(A.setInt8);
						te.setInt8(0, 2147483648),
							te.setInt8(1, 2147483649),
							(!te.getInt8(0) && te.getInt8(1)) ||
								c(
									A,
									{
										setInt8: function (e, t) {
											ne(this, e, (t << 24) >> 24);
										},
										setUint8: function (e, t) {
											ne(this, e, (t << 24) >> 24);
										},
									},
									{ unsafe: !0 }
								);
					} else
						(M = (B = function (e) {
							d(this, M);
							var t = h(e);
							S(this, { bytes: R(K(t), 0), byteLength: t }), i || (this.byteLength = t);
						}).prototype),
							(A = (I = function (e, t, n) {
								d(this, A), d(e, M);
								var r = j(e).byteLength,
									o = f(t);
								if (o < 0 || o > r) throw L('Wrong offset');
								if (o + (n = void 0 === n ? r - o : p(n)) > r) throw L('Wrong length');
								S(this, { buffer: e, byteLength: n, byteOffset: o }), i || ((this.buffer = e), (this.byteLength = n), (this.byteOffset = o));
							}).prototype),
							i && (Y(B, 'byteLength'), Y(I, 'buffer'), Y(I, 'byteLength'), Y(I, 'byteOffset')),
							c(A, {
								getInt8: function (e) {
									return (X(this, 1, e)[0] << 24) >> 24;
								},
								getUint8: function (e) {
									return X(this, 1, e)[0];
								},
								getInt16: function (e) {
									var t = X(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
									return (((t[1] << 8) | t[0]) << 16) >> 16;
								},
								getUint16: function (e) {
									var t = X(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
									return (t[1] << 8) | t[0];
								},
								getInt32: function (e) {
									return q(X(this, 4, e, arguments.length > 1 ? arguments[1] : void 0));
								},
								getUint32: function (e) {
									return q(X(this, 4, e, arguments.length > 1 ? arguments[1] : void 0)) >>> 0;
								},
								getFloat32: function (e) {
									return F(X(this, 4, e, arguments.length > 1 ? arguments[1] : void 0), 23);
								},
								getFloat64: function (e) {
									return F(X(this, 8, e, arguments.length > 1 ? arguments[1] : void 0), 52);
								},
								setInt8: function (e, t) {
									$(this, 1, e, U, t);
								},
								setUint8: function (e, t) {
									$(this, 1, e, U, t);
								},
								setInt16: function (e, t) {
									$(this, 2, e, H, t, arguments.length > 2 ? arguments[2] : void 0);
								},
								setUint16: function (e, t) {
									$(this, 2, e, H, t, arguments.length > 2 ? arguments[2] : void 0);
								},
								setInt32: function (e, t) {
									$(this, 4, e, V, t, arguments.length > 2 ? arguments[2] : void 0);
								},
								setUint32: function (e, t) {
									$(this, 4, e, V, t, arguments.length > 2 ? arguments[2] : void 0);
								},
								setFloat32: function (e, t) {
									$(this, 4, e, W, t, arguments.length > 2 ? arguments[2] : void 0);
								},
								setFloat64: function (e, t) {
									$(this, 8, e, G, t, arguments.length > 2 ? arguments[2] : void 0);
								},
							});
					x(B, D), x(I, 'DataView'), (t.exports = { ArrayBuffer: B, DataView: I });
				},
				{
					'../internals/an-instance': 6,
					'../internals/array-buffer-native': 8,
					'../internals/array-fill': 11,
					'../internals/array-slice-simple': 14,
					'../internals/create-non-enumerable-property': 24,
					'../internals/define-built-ins': 28,
					'../internals/descriptors': 31,
					'../internals/fails': 42,
					'../internals/function-name': 48,
					'../internals/function-uncurry-this': 49,
					'../internals/global': 55,
					'../internals/ieee754': 60,
					'../internals/internal-state': 64,
					'../internals/object-define-property': 83,
					'../internals/object-get-own-property-names': 85,
					'../internals/object-get-prototype-of': 87,
					'../internals/object-set-prototype-of': 92,
					'../internals/set-to-string-tag': 103,
					'../internals/to-index': 109,
					'../internals/to-integer-or-infinity': 111,
					'../internals/to-length': 112,
				},
			],
			11: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/to-object'),
						o = e('../internals/to-absolute-index'),
						i = e('../internals/length-of-array-like');
					t.exports = function (e) {
						for (
							var t = r(this),
								n = i(t),
								s = arguments.length,
								a = o(s > 1 ? arguments[1] : void 0, n),
								l = s > 2 ? arguments[2] : void 0,
								c = void 0 === l ? n : o(l, n);
							c > a;

						)
							t[a++] = e;
						return t;
					};
				},
				{ '../internals/length-of-array-like': 76, '../internals/to-absolute-index': 108, '../internals/to-object': 113 },
			],
			12: [
				function (e, t, n) {
					var r = e('../internals/to-indexed-object'),
						o = e('../internals/to-absolute-index'),
						i = e('../internals/length-of-array-like'),
						s = function (e) {
							return function (t, n, s) {
								var a,
									l = r(t),
									c = i(l),
									u = o(s, c);
								if (e && n != n) {
									for (; c > u; ) if ((a = l[u++]) != a) return !0;
								} else for (; c > u; u++) if ((e || u in l) && l[u] === n) return e || u || 0;
								return !e && -1;
							};
						};
					t.exports = { includes: s(!0), indexOf: s(!1) };
				},
				{ '../internals/length-of-array-like': 76, '../internals/to-absolute-index': 108, '../internals/to-indexed-object': 110 },
			],
			13: [
				function (e, t, n) {
					var r = e('../internals/function-bind-context'),
						o = e('../internals/function-uncurry-this'),
						i = e('../internals/indexed-object'),
						s = e('../internals/to-object'),
						a = e('../internals/length-of-array-like'),
						l = e('../internals/array-species-create'),
						c = o([].push),
						u = function (e) {
							var t = 1 == e,
								n = 2 == e,
								o = 3 == e,
								u = 4 == e,
								d = 6 == e,
								f = 7 == e,
								p = 5 == e || d;
							return function (h, m, y, v) {
								for (var g, b, w = s(h), _ = i(w), x = r(m, y), k = a(_), C = 0, E = v || l, j = t ? E(h, k) : n || f ? E(h, 0) : void 0; k > C; C++)
									if ((p || C in _) && ((b = x((g = _[C]), C, w)), e))
										if (t) j[C] = b;
										else if (b)
											switch (e) {
												case 3:
													return !0;
												case 5:
													return g;
												case 6:
													return C;
												case 2:
													c(j, g);
											}
										else
											switch (e) {
												case 4:
													return !1;
												case 7:
													c(j, g);
											}
								return d ? -1 : o || u ? u : j;
							};
						};
					t.exports = { forEach: u(0), map: u(1), filter: u(2), some: u(3), every: u(4), find: u(5), findIndex: u(6), filterReject: u(7) };
				},
				{
					'../internals/array-species-create': 17,
					'../internals/function-bind-context': 45,
					'../internals/function-uncurry-this': 49,
					'../internals/indexed-object': 61,
					'../internals/length-of-array-like': 76,
					'../internals/to-object': 113,
				},
			],
			14: [
				function (e, t, n) {
					var r = e('../internals/to-absolute-index'),
						o = e('../internals/length-of-array-like'),
						i = e('../internals/create-property'),
						s = Array,
						a = Math.max;
					t.exports = function (e, t, n) {
						for (var l = o(e), c = r(t, l), u = r(void 0 === n ? l : n, l), d = s(a(u - c, 0)), f = 0; c < u; c++, f++) i(d, f, e[c]);
						return (d.length = f), d;
					};
				},
				{ '../internals/create-property': 26, '../internals/length-of-array-like': 76, '../internals/to-absolute-index': 108 },
			],
			15: [
				function (e, t, n) {
					var r = e('../internals/array-slice-simple'),
						o = Math.floor,
						i = function (e, t) {
							var n = e.length,
								l = o(n / 2);
							return n < 8 ? s(e, t) : a(e, i(r(e, 0, l), t), i(r(e, l), t), t);
						},
						s = function (e, t) {
							for (var n, r, o = e.length, i = 1; i < o; ) {
								for (r = i, n = e[i]; r && t(e[r - 1], n) > 0; ) e[r] = e[--r];
								r !== i++ && (e[r] = n);
							}
							return e;
						},
						a = function (e, t, n, r) {
							for (var o = t.length, i = n.length, s = 0, a = 0; s < o || a < i; )
								e[s + a] = s < o && a < i ? (r(t[s], n[a]) <= 0 ? t[s++] : n[a++]) : s < o ? t[s++] : n[a++];
							return e;
						};
					t.exports = i;
				},
				{ '../internals/array-slice-simple': 14 },
			],
			16: [
				function (e, t, n) {
					var r = e('../internals/is-array'),
						o = e('../internals/is-constructor'),
						i = e('../internals/is-object'),
						s = e('../internals/well-known-symbol')('species'),
						a = Array;
					t.exports = function (e) {
						var t;
						return r(e) && ((t = e.constructor), ((o(t) && (t === a || r(t.prototype))) || (i(t) && null === (t = t[s]))) && (t = void 0)), void 0 === t ? a : t;
					};
				},
				{ '../internals/is-array': 66, '../internals/is-constructor': 68, '../internals/is-object': 71, '../internals/well-known-symbol': 127 },
			],
			17: [
				function (e, t, n) {
					var r = e('../internals/array-species-constructor');
					t.exports = function (e, t) {
						return new (r(e))(0 === t ? 0 : t);
					};
				},
				{ '../internals/array-species-constructor': 16 },
			],
			18: [
				function (e, t, n) {
					var r = e('../internals/well-known-symbol')('iterator'),
						o = !1;
					try {
						var i = 0,
							s = {
								next: function () {
									return { done: !!i++ };
								},
								return: function () {
									o = !0;
								},
							};
						(s[r] = function () {
							return this;
						}),
							Array.from(s, function () {
								throw 2;
							});
					} catch (e) {}
					t.exports = function (e, t) {
						if (!t && !o) return !1;
						var n = !1;
						try {
							var i = {};
							(i[r] = function () {
								return {
									next: function () {
										return { done: (n = !0) };
									},
								};
							}),
								e(i);
						} catch (e) {}
						return n;
					};
				},
				{ '../internals/well-known-symbol': 127 },
			],
			19: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = r({}.toString),
						i = r(''.slice);
					t.exports = function (e) {
						return i(o(e), 8, -1);
					};
				},
				{ '../internals/function-uncurry-this': 49 },
			],
			20: [
				function (e, t, n) {
					var r = e('../internals/to-string-tag-support'),
						o = e('../internals/is-callable'),
						i = e('../internals/classof-raw'),
						s = e('../internals/well-known-symbol')('toStringTag'),
						a = Object,
						l =
							'Arguments' ==
							i(
								(function () {
									return arguments;
								})()
							);
					t.exports = r
						? i
						: function (e) {
								var t, n, r;
								return void 0 === e
									? 'Undefined'
									: null === e
										? 'Null'
										: 'string' ==
											  typeof (n = (function (e, t) {
													try {
														return e[t];
													} catch (e) {}
											  })((t = a(e)), s))
											? n
											: l
												? i(t)
												: 'Object' == (r = i(t)) && o(t.callee)
													? 'Arguments'
													: r;
							};
				},
				{ '../internals/classof-raw': 19, '../internals/is-callable': 67, '../internals/to-string-tag-support': 118, '../internals/well-known-symbol': 127 },
			],
			21: [
				function (e, t, n) {
					var r = e('../internals/has-own-property'),
						o = e('../internals/own-keys'),
						i = e('../internals/object-get-own-property-descriptor'),
						s = e('../internals/object-define-property');
					t.exports = function (e, t, n) {
						for (var a = o(t), l = s.f, c = i.f, u = 0; u < a.length; u++) {
							var d = a[u];
							r(e, d) || (n && r(n, d)) || l(e, d, c(t, d));
						}
					};
				},
				{
					'../internals/has-own-property': 56,
					'../internals/object-define-property': 83,
					'../internals/object-get-own-property-descriptor': 84,
					'../internals/own-keys': 94,
				},
			],
			22: [
				function (e, t, n) {
					var r = e('../internals/fails');
					t.exports = !r(function () {
						function e() {}
						return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
					});
				},
				{ '../internals/fails': 42 },
			],
			23: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/iterators-core').IteratorPrototype,
						o = e('../internals/object-create'),
						i = e('../internals/create-property-descriptor'),
						s = e('../internals/set-to-string-tag'),
						a = e('../internals/iterators'),
						l = function () {
							return this;
						};
					t.exports = function (e, t, n, c) {
						var u = t + ' Iterator';
						return (e.prototype = o(r, { next: i(+!c, n) })), s(e, u, !1, !0), (a[u] = l), e;
					};
				},
				{
					'../internals/create-property-descriptor': 25,
					'../internals/iterators': 75,
					'../internals/iterators-core': 74,
					'../internals/object-create': 81,
					'../internals/set-to-string-tag': 103,
				},
			],
			24: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/object-define-property'),
						i = e('../internals/create-property-descriptor');
					t.exports = r
						? function (e, t, n) {
								return o.f(e, t, i(1, n));
							}
						: function (e, t, n) {
								return (e[t] = n), e;
							};
				},
				{ '../internals/create-property-descriptor': 25, '../internals/descriptors': 31, '../internals/object-define-property': 83 },
			],
			25: [
				function (e, t, n) {
					t.exports = function (e, t) {
						return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
					};
				},
				{},
			],
			26: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/to-property-key'),
						o = e('../internals/object-define-property'),
						i = e('../internals/create-property-descriptor');
					t.exports = function (e, t, n) {
						var s = r(t);
						s in e ? o.f(e, s, i(0, n)) : (e[s] = n);
					};
				},
				{ '../internals/create-property-descriptor': 25, '../internals/object-define-property': 83, '../internals/to-property-key': 117 },
			],
			27: [
				function (e, t, n) {
					var r = e('../internals/is-callable'),
						o = e('../internals/object-define-property'),
						i = e('../internals/make-built-in'),
						s = e('../internals/define-global-property');
					t.exports = function (e, t, n, a) {
						a || (a = {});
						var l = a.enumerable,
							c = void 0 !== a.name ? a.name : t;
						if ((r(n) && i(n, c, a), a.global)) l ? (e[t] = n) : s(t, n);
						else {
							try {
								a.unsafe ? e[t] && (l = !0) : delete e[t];
							} catch (e) {}
							l ? (e[t] = n) : o.f(e, t, { value: n, enumerable: !1, configurable: !a.nonConfigurable, writable: !a.nonWritable });
						}
						return e;
					};
				},
				{ '../internals/define-global-property': 29, '../internals/is-callable': 67, '../internals/make-built-in': 77, '../internals/object-define-property': 83 },
			],
			28: [
				function (e, t, n) {
					var r = e('../internals/define-built-in');
					t.exports = function (e, t, n) {
						for (var o in t) r(e, o, t[o], n);
						return e;
					};
				},
				{ '../internals/define-built-in': 27 },
			],
			29: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = Object.defineProperty;
					t.exports = function (e, t) {
						try {
							o(r, e, { value: t, configurable: !0, writable: !0 });
						} catch (n) {
							r[e] = t;
						}
						return t;
					};
				},
				{ '../internals/global': 55 },
			],
			30: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/export'),
						o = e('../internals/function-call'),
						i = e('../internals/is-pure'),
						s = e('../internals/function-name'),
						a = e('../internals/is-callable'),
						l = e('../internals/create-iterator-constructor'),
						c = e('../internals/object-get-prototype-of'),
						u = e('../internals/object-set-prototype-of'),
						d = e('../internals/set-to-string-tag'),
						f = e('../internals/create-non-enumerable-property'),
						p = e('../internals/define-built-in'),
						h = e('../internals/well-known-symbol'),
						m = e('../internals/iterators'),
						y = e('../internals/iterators-core'),
						v = s.PROPER,
						g = s.CONFIGURABLE,
						b = y.IteratorPrototype,
						w = y.BUGGY_SAFARI_ITERATORS,
						_ = h('iterator'),
						x = 'keys',
						k = 'values',
						C = 'entries',
						E = function () {
							return this;
						};
					t.exports = function (e, t, n, s, h, y, j) {
						l(n, t, s);
						var S,
							D,
							O,
							P = function (e) {
								if (e === h && T) return T;
								if (!w && e in I) return I[e];
								switch (e) {
									case x:
									case k:
									case C:
										return function () {
											return new n(this, e);
										};
								}
								return function () {
									return new n(this);
								};
							},
							B = t + ' Iterator',
							M = !1,
							I = e.prototype,
							A = I[_] || I['@@iterator'] || (h && I[h]),
							T = (!w && A) || P(h),
							K = ('Array' == t && I.entries) || A;
						if (
							(K &&
								(S = c(K.call(new e()))) !== Object.prototype &&
								S.next &&
								(i || c(S) === b || (u ? u(S, b) : a(S[_]) || p(S, _, E)), d(S, B, !0, !0), i && (m[B] = E)),
							v &&
								h == k &&
								A &&
								A.name !== k &&
								(!i && g
									? f(I, 'name', k)
									: ((M = !0),
										(T = function () {
											return o(A, this);
										}))),
							h)
						)
							if (((D = { values: P(k), keys: y ? T : P(x), entries: P(C) }), j)) for (O in D) (w || M || !(O in I)) && p(I, O, D[O]);
							else r({ target: t, proto: !0, forced: w || M }, D);
						return (i && !j) || I[_] === T || p(I, _, T, { name: h }), (m[t] = T), D;
					};
				},
				{
					'../internals/create-iterator-constructor': 23,
					'../internals/create-non-enumerable-property': 24,
					'../internals/define-built-in': 27,
					'../internals/export': 41,
					'../internals/function-call': 47,
					'../internals/function-name': 48,
					'../internals/is-callable': 67,
					'../internals/is-pure': 72,
					'../internals/iterators': 75,
					'../internals/iterators-core': 74,
					'../internals/object-get-prototype-of': 87,
					'../internals/object-set-prototype-of': 92,
					'../internals/set-to-string-tag': 103,
					'../internals/well-known-symbol': 127,
				},
			],
			31: [
				function (e, t, n) {
					var r = e('../internals/fails');
					t.exports = !r(function () {
						return (
							7 !=
							Object.defineProperty({}, 1, {
								get: function () {
									return 7;
								},
							})[1]
						);
					});
				},
				{ '../internals/fails': 42 },
			],
			32: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/is-object'),
						i = r.document,
						s = o(i) && o(i.createElement);
					t.exports = function (e) {
						return s ? i.createElement(e) : {};
					};
				},
				{ '../internals/global': 55, '../internals/is-object': 71 },
			],
			33: [
				function (e, t, n) {
					t.exports = {
						CSSRuleList: 0,
						CSSStyleDeclaration: 0,
						CSSValueList: 0,
						ClientRectList: 0,
						DOMRectList: 0,
						DOMStringList: 0,
						DOMTokenList: 1,
						DataTransferItemList: 0,
						FileList: 0,
						HTMLAllCollection: 0,
						HTMLCollection: 0,
						HTMLFormElement: 0,
						HTMLSelectElement: 0,
						MediaList: 0,
						MimeTypeArray: 0,
						NamedNodeMap: 0,
						NodeList: 1,
						PaintRequestList: 0,
						Plugin: 0,
						PluginArray: 0,
						SVGLengthList: 0,
						SVGNumberList: 0,
						SVGPathSegList: 0,
						SVGPointList: 0,
						SVGStringList: 0,
						SVGTransformList: 0,
						SourceBufferList: 0,
						StyleSheetList: 0,
						TextTrackCueList: 0,
						TextTrackList: 0,
						TouchList: 0,
					};
				},
				{},
			],
			34: [
				function (e, t, n) {
					var r = e('../internals/document-create-element')('span').classList,
						o = r && r.constructor && r.constructor.prototype;
					t.exports = o === Object.prototype ? void 0 : o;
				},
				{ '../internals/document-create-element': 32 },
			],
			35: [
				function (e, t, n) {
					var r = e('../internals/engine-user-agent').match(/firefox\/(\d+)/i);
					t.exports = !!r && +r[1];
				},
				{ '../internals/engine-user-agent': 37 },
			],
			36: [
				function (e, t, n) {
					var r = e('../internals/engine-user-agent');
					t.exports = /MSIE|Trident/.test(r);
				},
				{ '../internals/engine-user-agent': 37 },
			],
			37: [
				function (e, t, n) {
					var r = e('../internals/get-built-in');
					t.exports = r('navigator', 'userAgent') || '';
				},
				{ '../internals/get-built-in': 50 },
			],
			38: [
				function (e, t, n) {
					var r,
						o,
						i = e('../internals/global'),
						s = e('../internals/engine-user-agent'),
						a = i.process,
						l = i.Deno,
						c = (a && a.versions) || (l && l.version),
						u = c && c.v8;
					u && (o = (r = u.split('.'))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])),
						!o && s && (!(r = s.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = s.match(/Chrome\/(\d+)/)) && (o = +r[1]),
						(t.exports = o);
				},
				{ '../internals/engine-user-agent': 37, '../internals/global': 55 },
			],
			39: [
				function (e, t, n) {
					var r = e('../internals/engine-user-agent').match(/AppleWebKit\/(\d+)\./);
					t.exports = !!r && +r[1];
				},
				{ '../internals/engine-user-agent': 37 },
			],
			40: [
				function (e, t, n) {
					t.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
				},
				{},
			],
			41: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/object-get-own-property-descriptor').f,
						i = e('../internals/create-non-enumerable-property'),
						s = e('../internals/define-built-in'),
						a = e('../internals/define-global-property'),
						l = e('../internals/copy-constructor-properties'),
						c = e('../internals/is-forced');
					t.exports = function (e, t) {
						var n,
							u,
							d,
							f,
							p,
							h = e.target,
							m = e.global,
							y = e.stat;
						if ((n = m ? r : y ? r[h] || a(h, {}) : (r[h] || {}).prototype))
							for (u in t) {
								if (((f = t[u]), (d = e.dontCallGetSet ? (p = o(n, u)) && p.value : n[u]), !c(m ? u : h + (y ? '.' : '#') + u, e.forced) && void 0 !== d)) {
									if (typeof f == typeof d) continue;
									l(f, d);
								}
								(e.sham || (d && d.sham)) && i(f, 'sham', !0), s(n, u, f, e);
							}
					};
				},
				{
					'../internals/copy-constructor-properties': 21,
					'../internals/create-non-enumerable-property': 24,
					'../internals/define-built-in': 27,
					'../internals/define-global-property': 29,
					'../internals/global': 55,
					'../internals/is-forced': 69,
					'../internals/object-get-own-property-descriptor': 84,
				},
			],
			42: [
				function (e, t, n) {
					t.exports = function (e) {
						try {
							return !!e();
						} catch (e) {
							return !0;
						}
					};
				},
				{},
			],
			43: [
				function (e, t, n) {
					'use strict';
					e('../modules/es.regexp.exec');
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/define-built-in'),
						i = e('../internals/regexp-exec'),
						s = e('../internals/fails'),
						a = e('../internals/well-known-symbol'),
						l = e('../internals/create-non-enumerable-property'),
						c = a('species'),
						u = RegExp.prototype;
					t.exports = function (e, t, n, d) {
						var f = a(e),
							p = !s(function () {
								var t = {};
								return (
									(t[f] = function () {
										return 7;
									}),
									7 != ''[e](t)
								);
							}),
							h =
								p &&
								!s(function () {
									var t = !1,
										n = /a/;
									return (
										'split' === e &&
											(((n = {}).constructor = {}),
											(n.constructor[c] = function () {
												return n;
											}),
											(n.flags = ''),
											(n[f] = /./[f])),
										(n.exec = function () {
											return (t = !0), null;
										}),
										n[f](''),
										!t
									);
								});
						if (!p || !h || n) {
							var m = r(/./[f]),
								y = t(f, ''[e], function (e, t, n, o, s) {
									var a = r(e),
										l = t.exec;
									return l === i || l === u.exec ? (p && !s ? { done: !0, value: m(t, n, o) } : { done: !0, value: a(n, t, o) }) : { done: !1 };
								});
							o(String.prototype, e, y[0]), o(u, f, y[1]);
						}
						d && l(u[f], 'sham', !0);
					};
				},
				{
					'../internals/create-non-enumerable-property': 24,
					'../internals/define-built-in': 27,
					'../internals/fails': 42,
					'../internals/function-uncurry-this': 49,
					'../internals/regexp-exec': 96,
					'../internals/well-known-symbol': 127,
					'../modules/es.regexp.exec': 129,
				},
			],
			44: [
				function (e, t, n) {
					var r = e('../internals/function-bind-native'),
						o = Function.prototype,
						i = o.apply,
						s = o.call;
					t.exports =
						('object' == typeof Reflect && Reflect.apply) ||
						(r
							? s.bind(i)
							: function () {
									return s.apply(i, arguments);
								});
				},
				{ '../internals/function-bind-native': 46 },
			],
			45: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/a-callable'),
						i = e('../internals/function-bind-native'),
						s = r(r.bind);
					t.exports = function (e, t) {
						return (
							o(e),
							void 0 === t
								? e
								: i
									? s(e, t)
									: function () {
											return e.apply(t, arguments);
										}
						);
					};
				},
				{ '../internals/a-callable': 1, '../internals/function-bind-native': 46, '../internals/function-uncurry-this': 49 },
			],
			46: [
				function (e, t, n) {
					var r = e('../internals/fails');
					t.exports = !r(function () {
						var e = function () {}.bind();
						return 'function' != typeof e || e.hasOwnProperty('prototype');
					});
				},
				{ '../internals/fails': 42 },
			],
			47: [
				function (e, t, n) {
					var r = e('../internals/function-bind-native'),
						o = Function.prototype.call;
					t.exports = r
						? o.bind(o)
						: function () {
								return o.apply(o, arguments);
							};
				},
				{ '../internals/function-bind-native': 46 },
			],
			48: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/has-own-property'),
						i = Function.prototype,
						s = r && Object.getOwnPropertyDescriptor,
						a = o(i, 'name'),
						l = a && 'something' === function () {}.name,
						c = a && (!r || (r && s(i, 'name').configurable));
					t.exports = { EXISTS: a, PROPER: l, CONFIGURABLE: c };
				},
				{ '../internals/descriptors': 31, '../internals/has-own-property': 56 },
			],
			49: [
				function (e, t, n) {
					var r = e('../internals/function-bind-native'),
						o = Function.prototype,
						i = o.bind,
						s = o.call,
						a = r && i.bind(s, s);
					t.exports = r
						? function (e) {
								return e && a(e);
							}
						: function (e) {
								return (
									e &&
									function () {
										return s.apply(e, arguments);
									}
								);
							};
				},
				{ '../internals/function-bind-native': 46 },
			],
			50: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/is-callable'),
						i = function (e) {
							return o(e) ? e : void 0;
						};
					t.exports = function (e, t) {
						return arguments.length < 2 ? i(r[e]) : r[e] && r[e][t];
					};
				},
				{ '../internals/global': 55, '../internals/is-callable': 67 },
			],
			51: [
				function (e, t, n) {
					var r = e('../internals/classof'),
						o = e('../internals/get-method'),
						i = e('../internals/iterators'),
						s = e('../internals/well-known-symbol')('iterator');
					t.exports = function (e) {
						if (null != e) return o(e, s) || o(e, '@@iterator') || i[r(e)];
					};
				},
				{ '../internals/classof': 20, '../internals/get-method': 53, '../internals/iterators': 75, '../internals/well-known-symbol': 127 },
			],
			52: [
				function (e, t, n) {
					var r = e('../internals/function-call'),
						o = e('../internals/a-callable'),
						i = e('../internals/an-object'),
						s = e('../internals/try-to-string'),
						a = e('../internals/get-iterator-method'),
						l = TypeError;
					t.exports = function (e, t) {
						var n = arguments.length < 2 ? a(e) : t;
						if (o(n)) return i(r(n, e));
						throw l(s(e) + ' is not iterable');
					};
				},
				{
					'../internals/a-callable': 1,
					'../internals/an-object': 7,
					'../internals/function-call': 47,
					'../internals/get-iterator-method': 51,
					'../internals/try-to-string': 120,
				},
			],
			53: [
				function (e, t, n) {
					var r = e('../internals/a-callable');
					t.exports = function (e, t) {
						var n = e[t];
						return null == n ? void 0 : r(n);
					};
				},
				{ '../internals/a-callable': 1 },
			],
			54: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/to-object'),
						i = Math.floor,
						s = r(''.charAt),
						a = r(''.replace),
						l = r(''.slice),
						c = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
						u = /\$([$&'`]|\d{1,2})/g;
					t.exports = function (e, t, n, r, d, f) {
						var p = n + e.length,
							h = r.length,
							m = u;
						return (
							void 0 !== d && ((d = o(d)), (m = c)),
							a(f, m, function (o, a) {
								var c;
								switch (s(a, 0)) {
									case '$':
										return '$';
									case '&':
										return e;
									case '`':
										return l(t, 0, n);
									case "'":
										return l(t, p);
									case '<':
										c = d[l(a, 1, -1)];
										break;
									default:
										var u = +a;
										if (0 === u) return o;
										if (u > h) {
											var f = i(u / 10);
											return 0 === f ? o : f <= h ? (void 0 === r[f - 1] ? s(a, 1) : r[f - 1] + s(a, 1)) : o;
										}
										c = r[u - 1];
								}
								return void 0 === c ? '' : c;
							})
						);
					};
				},
				{ '../internals/function-uncurry-this': 49, '../internals/to-object': 113 },
			],
			55: [
				function (e, t, n) {
					(function (e) {
						(function () {
							var n = function (e) {
								return e && e.Math == Math && e;
							};
							t.exports =
								n('object' == typeof globalThis && globalThis) ||
								n('object' == typeof window && window) ||
								n('object' == typeof self && self) ||
								n('object' == typeof e && e) ||
								(function () {
									return this;
								})() ||
								Function('return this')();
						}).call(this);
					}).call(this, 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {});
				},
				{},
			],
			56: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/to-object'),
						i = r({}.hasOwnProperty);
					t.exports =
						Object.hasOwn ||
						function (e, t) {
							return i(o(e), t);
						};
				},
				{ '../internals/function-uncurry-this': 49, '../internals/to-object': 113 },
			],
			57: [
				function (e, t, n) {
					t.exports = {};
				},
				{},
			],
			58: [
				function (e, t, n) {
					var r = e('../internals/get-built-in');
					t.exports = r('document', 'documentElement');
				},
				{ '../internals/get-built-in': 50 },
			],
			59: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/fails'),
						i = e('../internals/document-create-element');
					t.exports =
						!r &&
						!o(function () {
							return (
								7 !=
								Object.defineProperty(i('div'), 'a', {
									get: function () {
										return 7;
									},
								}).a
							);
						});
				},
				{ '../internals/descriptors': 31, '../internals/document-create-element': 32, '../internals/fails': 42 },
			],
			60: [
				function (e, t, n) {
					var r = Array,
						o = Math.abs,
						i = Math.pow,
						s = Math.floor,
						a = Math.log,
						l = Math.LN2;
					t.exports = {
						pack: function (e, t, n) {
							var c,
								u,
								d,
								f = r(n),
								p = 8 * n - t - 1,
								h = (1 << p) - 1,
								m = h >> 1,
								y = 23 === t ? i(2, -24) - i(2, -77) : 0,
								v = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0,
								g = 0;
							for (
								(e = o(e)) != e || e === 1 / 0
									? ((u = e != e ? 1 : 0), (c = h))
									: ((c = s(a(e) / l)),
										e * (d = i(2, -c)) < 1 && (c--, (d *= 2)),
										(e += c + m >= 1 ? y / d : y * i(2, 1 - m)) * d >= 2 && (c++, (d /= 2)),
										c + m >= h ? ((u = 0), (c = h)) : c + m >= 1 ? ((u = (e * d - 1) * i(2, t)), (c += m)) : ((u = e * i(2, m - 1) * i(2, t)), (c = 0)));
								t >= 8;

							)
								(f[g++] = 255 & u), (u /= 256), (t -= 8);
							for (c = (c << t) | u, p += t; p > 0; ) (f[g++] = 255 & c), (c /= 256), (p -= 8);
							return (f[--g] |= 128 * v), f;
						},
						unpack: function (e, t) {
							var n,
								r = e.length,
								o = 8 * r - t - 1,
								s = (1 << o) - 1,
								a = s >> 1,
								l = o - 7,
								c = r - 1,
								u = e[c--],
								d = 127 & u;
							for (u >>= 7; l > 0; ) (d = 256 * d + e[c--]), (l -= 8);
							for (n = d & ((1 << -l) - 1), d >>= -l, l += t; l > 0; ) (n = 256 * n + e[c--]), (l -= 8);
							if (0 === d) d = 1 - a;
							else {
								if (d === s) return n ? NaN : u ? -1 / 0 : 1 / 0;
								(n += i(2, t)), (d -= a);
							}
							return (u ? -1 : 1) * n * i(2, d - t);
						},
					};
				},
				{},
			],
			61: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/fails'),
						i = e('../internals/classof-raw'),
						s = Object,
						a = r(''.split);
					t.exports = o(function () {
						return !s('z').propertyIsEnumerable(0);
					})
						? function (e) {
								return 'String' == i(e) ? a(e, '') : s(e);
							}
						: s;
				},
				{ '../internals/classof-raw': 19, '../internals/fails': 42, '../internals/function-uncurry-this': 49 },
			],
			62: [
				function (e, t, n) {
					var r = e('../internals/is-callable'),
						o = e('../internals/is-object'),
						i = e('../internals/object-set-prototype-of');
					t.exports = function (e, t, n) {
						var s, a;
						return i && r((s = t.constructor)) && s !== n && o((a = s.prototype)) && a !== n.prototype && i(e, a), e;
					};
				},
				{ '../internals/is-callable': 67, '../internals/is-object': 71, '../internals/object-set-prototype-of': 92 },
			],
			63: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/is-callable'),
						i = e('../internals/shared-store'),
						s = r(Function.toString);
					o(i.inspectSource) ||
						(i.inspectSource = function (e) {
							return s(e);
						}),
						(t.exports = i.inspectSource);
				},
				{ '../internals/function-uncurry-this': 49, '../internals/is-callable': 67, '../internals/shared-store': 105 },
			],
			64: [
				function (e, t, n) {
					var r,
						o,
						i,
						s = e('../internals/native-weak-map'),
						a = e('../internals/global'),
						l = e('../internals/function-uncurry-this'),
						c = e('../internals/is-object'),
						u = e('../internals/create-non-enumerable-property'),
						d = e('../internals/has-own-property'),
						f = e('../internals/shared-store'),
						p = e('../internals/shared-key'),
						h = e('../internals/hidden-keys'),
						m = 'Object already initialized',
						y = a.TypeError,
						v = a.WeakMap;
					if (s || f.state) {
						var g = f.state || (f.state = new v()),
							b = l(g.get),
							w = l(g.has),
							_ = l(g.set);
						(r = function (e, t) {
							if (w(g, e)) throw new y(m);
							return (t.facade = e), _(g, e, t), t;
						}),
							(o = function (e) {
								return b(g, e) || {};
							}),
							(i = function (e) {
								return w(g, e);
							});
					} else {
						var x = p('state');
						(h[x] = !0),
							(r = function (e, t) {
								if (d(e, x)) throw new y(m);
								return (t.facade = e), u(e, x, t), t;
							}),
							(o = function (e) {
								return d(e, x) ? e[x] : {};
							}),
							(i = function (e) {
								return d(e, x);
							});
					}
					t.exports = {
						set: r,
						get: o,
						has: i,
						enforce: function (e) {
							return i(e) ? o(e) : r(e, {});
						},
						getterFor: function (e) {
							return function (t) {
								var n;
								if (!c(t) || (n = o(t)).type !== e) throw y('Incompatible receiver, ' + e + ' required');
								return n;
							};
						},
					};
				},
				{
					'../internals/create-non-enumerable-property': 24,
					'../internals/function-uncurry-this': 49,
					'../internals/global': 55,
					'../internals/has-own-property': 56,
					'../internals/hidden-keys': 57,
					'../internals/is-object': 71,
					'../internals/native-weak-map': 80,
					'../internals/shared-key': 104,
					'../internals/shared-store': 105,
				},
			],
			65: [
				function (e, t, n) {
					var r = e('../internals/well-known-symbol'),
						o = e('../internals/iterators'),
						i = r('iterator'),
						s = Array.prototype;
					t.exports = function (e) {
						return void 0 !== e && (o.Array === e || s[i] === e);
					};
				},
				{ '../internals/iterators': 75, '../internals/well-known-symbol': 127 },
			],
			66: [
				function (e, t, n) {
					var r = e('../internals/classof-raw');
					t.exports =
						Array.isArray ||
						function (e) {
							return 'Array' == r(e);
						};
				},
				{ '../internals/classof-raw': 19 },
			],
			67: [
				function (e, t, n) {
					t.exports = function (e) {
						return 'function' == typeof e;
					};
				},
				{},
			],
			68: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/fails'),
						i = e('../internals/is-callable'),
						s = e('../internals/classof'),
						a = e('../internals/get-built-in'),
						l = e('../internals/inspect-source'),
						c = function () {},
						u = [],
						d = a('Reflect', 'construct'),
						f = /^\s*(?:class|function)\b/,
						p = r(f.exec),
						h = !f.exec(c),
						m = function (e) {
							if (!i(e)) return !1;
							try {
								return d(c, u, e), !0;
							} catch (e) {
								return !1;
							}
						},
						y = function (e) {
							if (!i(e)) return !1;
							switch (s(e)) {
								case 'AsyncFunction':
								case 'GeneratorFunction':
								case 'AsyncGeneratorFunction':
									return !1;
							}
							try {
								return h || !!p(f, l(e));
							} catch (e) {
								return !0;
							}
						};
					(y.sham = !0),
						(t.exports =
							!d ||
							o(function () {
								var e;
								return (
									m(m.call) ||
									!m(Object) ||
									!m(function () {
										e = !0;
									}) ||
									e
								);
							})
								? y
								: m);
				},
				{
					'../internals/classof': 20,
					'../internals/fails': 42,
					'../internals/function-uncurry-this': 49,
					'../internals/get-built-in': 50,
					'../internals/inspect-source': 63,
					'../internals/is-callable': 67,
				},
			],
			69: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/is-callable'),
						i = /#|\.prototype\./,
						s = function (e, t) {
							var n = l[a(e)];
							return n == u || (n != c && (o(t) ? r(t) : !!t));
						},
						a = (s.normalize = function (e) {
							return String(e).replace(i, '.').toLowerCase();
						}),
						l = (s.data = {}),
						c = (s.NATIVE = 'N'),
						u = (s.POLYFILL = 'P');
					t.exports = s;
				},
				{ '../internals/fails': 42, '../internals/is-callable': 67 },
			],
			70: [
				function (e, t, n) {
					var r = e('../internals/is-object'),
						o = Math.floor;
					t.exports =
						Number.isInteger ||
						function (e) {
							return !r(e) && isFinite(e) && o(e) === e;
						};
				},
				{ '../internals/is-object': 71 },
			],
			71: [
				function (e, t, n) {
					var r = e('../internals/is-callable');
					t.exports = function (e) {
						return 'object' == typeof e ? null !== e : r(e);
					};
				},
				{ '../internals/is-callable': 67 },
			],
			72: [
				function (e, t, n) {
					t.exports = !1;
				},
				{},
			],
			73: [
				function (e, t, n) {
					var r = e('../internals/get-built-in'),
						o = e('../internals/is-callable'),
						i = e('../internals/object-is-prototype-of'),
						s = e('../internals/use-symbol-as-uid'),
						a = Object;
					t.exports = s
						? function (e) {
								return 'symbol' == typeof e;
							}
						: function (e) {
								var t = r('Symbol');
								return o(t) && i(t.prototype, a(e));
							};
				},
				{ '../internals/get-built-in': 50, '../internals/is-callable': 67, '../internals/object-is-prototype-of': 88, '../internals/use-symbol-as-uid': 125 },
			],
			74: [
				function (e, t, n) {
					'use strict';
					var r,
						o,
						i,
						s = e('../internals/fails'),
						a = e('../internals/is-callable'),
						l = e('../internals/object-create'),
						c = e('../internals/object-get-prototype-of'),
						u = e('../internals/define-built-in'),
						d = e('../internals/well-known-symbol'),
						f = e('../internals/is-pure'),
						p = d('iterator'),
						h = !1;
					[].keys && ('next' in (i = [].keys()) ? (o = c(c(i))) !== Object.prototype && (r = o) : (h = !0)),
						null == r ||
						s(function () {
							var e = {};
							return r[p].call(e) !== e;
						})
							? (r = {})
							: f && (r = l(r)),
						a(r[p]) ||
							u(r, p, function () {
								return this;
							}),
						(t.exports = { IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: h });
				},
				{
					'../internals/define-built-in': 27,
					'../internals/fails': 42,
					'../internals/is-callable': 67,
					'../internals/is-pure': 72,
					'../internals/object-create': 81,
					'../internals/object-get-prototype-of': 87,
					'../internals/well-known-symbol': 127,
				},
			],
			75: [
				function (e, t, n) {
					arguments[4][57][0].apply(n, arguments);
				},
				{ dup: 57 },
			],
			76: [
				function (e, t, n) {
					var r = e('../internals/to-length');
					t.exports = function (e) {
						return r(e.length);
					};
				},
				{ '../internals/to-length': 112 },
			],
			77: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/is-callable'),
						i = e('../internals/has-own-property'),
						s = e('../internals/descriptors'),
						a = e('../internals/function-name').CONFIGURABLE,
						l = e('../internals/inspect-source'),
						c = e('../internals/internal-state'),
						u = c.enforce,
						d = c.get,
						f = Object.defineProperty,
						p =
							s &&
							!r(function () {
								return 8 !== f(function () {}, 'length', { value: 8 }).length;
							}),
						h = String(String).split('String'),
						m = (t.exports = function (e, t, n) {
							'Symbol(' === String(t).slice(0, 7) && (t = '[' + String(t).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'),
								n && n.getter && (t = 'get ' + t),
								n && n.setter && (t = 'set ' + t),
								(!i(e, 'name') || (a && e.name !== t)) && (s ? f(e, 'name', { value: t, configurable: !0 }) : (e.name = t)),
								p && n && i(n, 'arity') && e.length !== n.arity && f(e, 'length', { value: n.arity });
							try {
								n && i(n, 'constructor') && n.constructor ? s && f(e, 'prototype', { writable: !1 }) : e.prototype && (e.prototype = void 0);
							} catch (e) {}
							var r = u(e);
							return i(r, 'source') || (r.source = h.join('string' == typeof t ? t : '')), e;
						});
					Function.prototype.toString = m(function () {
						return (o(this) && d(this).source) || l(this);
					}, 'toString');
				},
				{
					'../internals/descriptors': 31,
					'../internals/fails': 42,
					'../internals/function-name': 48,
					'../internals/has-own-property': 56,
					'../internals/inspect-source': 63,
					'../internals/internal-state': 64,
					'../internals/is-callable': 67,
				},
			],
			78: [
				function (e, t, n) {
					var r = Math.ceil,
						o = Math.floor;
					t.exports =
						Math.trunc ||
						function (e) {
							var t = +e;
							return (t > 0 ? o : r)(t);
						};
				},
				{},
			],
			79: [
				function (e, t, n) {
					var r = e('../internals/engine-v8-version'),
						o = e('../internals/fails');
					t.exports =
						!!Object.getOwnPropertySymbols &&
						!o(function () {
							var e = Symbol();
							return !String(e) || !(Object(e) instanceof Symbol) || (!Symbol.sham && r && r < 41);
						});
				},
				{ '../internals/engine-v8-version': 38, '../internals/fails': 42 },
			],
			80: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/is-callable'),
						i = e('../internals/inspect-source'),
						s = r.WeakMap;
					t.exports = o(s) && /native code/.test(i(s));
				},
				{ '../internals/global': 55, '../internals/inspect-source': 63, '../internals/is-callable': 67 },
			],
			81: [
				function (e, t, n) {
					var r,
						o = e('../internals/an-object'),
						i = e('../internals/object-define-properties'),
						s = e('../internals/enum-bug-keys'),
						a = e('../internals/hidden-keys'),
						l = e('../internals/html'),
						c = e('../internals/document-create-element'),
						u = e('../internals/shared-key')('IE_PROTO'),
						d = function () {},
						f = function (e) {
							return '<script>' + e + '</script>';
						},
						p = function (e) {
							e.write(f('')), e.close();
							var t = e.parentWindow.Object;
							return (e = null), t;
						},
						h = function () {
							try {
								r = new ActiveXObject('htmlfile');
							} catch (e) {}
							var e, t;
							h =
								'undefined' != typeof document
									? document.domain && r
										? p(r)
										: (((t = c('iframe')).style.display = 'none'),
											l.appendChild(t),
											(t.src = String('javascript:')),
											(e = t.contentWindow.document).open(),
											e.write(f('document.F=Object')),
											e.close(),
											e.F)
									: p(r);
							for (var n = s.length; n--; ) delete h.prototype[s[n]];
							return h();
						};
					(a[u] = !0),
						(t.exports =
							Object.create ||
							function (e, t) {
								var n;
								return null !== e ? ((d.prototype = o(e)), (n = new d()), (d.prototype = null), (n[u] = e)) : (n = h()), void 0 === t ? n : i.f(n, t);
							});
				},
				{
					'../internals/an-object': 7,
					'../internals/document-create-element': 32,
					'../internals/enum-bug-keys': 40,
					'../internals/hidden-keys': 57,
					'../internals/html': 58,
					'../internals/object-define-properties': 82,
					'../internals/shared-key': 104,
				},
			],
			82: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/v8-prototype-define-bug'),
						i = e('../internals/object-define-property'),
						s = e('../internals/an-object'),
						a = e('../internals/to-indexed-object'),
						l = e('../internals/object-keys');
					n.f =
						r && !o
							? Object.defineProperties
							: function (e, t) {
									s(e);
									for (var n, r = a(t), o = l(t), c = o.length, u = 0; c > u; ) i.f(e, (n = o[u++]), r[n]);
									return e;
								};
				},
				{
					'../internals/an-object': 7,
					'../internals/descriptors': 31,
					'../internals/object-define-property': 83,
					'../internals/object-keys': 90,
					'../internals/to-indexed-object': 110,
					'../internals/v8-prototype-define-bug': 126,
				},
			],
			83: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/ie8-dom-define'),
						i = e('../internals/v8-prototype-define-bug'),
						s = e('../internals/an-object'),
						a = e('../internals/to-property-key'),
						l = TypeError,
						c = Object.defineProperty,
						u = Object.getOwnPropertyDescriptor;
					n.f = r
						? i
							? function (e, t, n) {
									if ((s(e), (t = a(t)), s(n), 'function' == typeof e && 'prototype' === t && 'value' in n && 'writable' in n && !n.writable)) {
										var r = u(e, t);
										r &&
											r.writable &&
											((e[t] = n.value),
											(n = {
												configurable: 'configurable' in n ? n.configurable : r.configurable,
												enumerable: 'enumerable' in n ? n.enumerable : r.enumerable,
												writable: !1,
											}));
									}
									return c(e, t, n);
								}
							: c
						: function (e, t, n) {
								if ((s(e), (t = a(t)), s(n), o))
									try {
										return c(e, t, n);
									} catch (e) {}
								if ('get' in n || 'set' in n) throw l('Accessors not supported');
								return 'value' in n && (e[t] = n.value), e;
							};
				},
				{
					'../internals/an-object': 7,
					'../internals/descriptors': 31,
					'../internals/ie8-dom-define': 59,
					'../internals/to-property-key': 117,
					'../internals/v8-prototype-define-bug': 126,
				},
			],
			84: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/function-call'),
						i = e('../internals/object-property-is-enumerable'),
						s = e('../internals/create-property-descriptor'),
						a = e('../internals/to-indexed-object'),
						l = e('../internals/to-property-key'),
						c = e('../internals/has-own-property'),
						u = e('../internals/ie8-dom-define'),
						d = Object.getOwnPropertyDescriptor;
					n.f = r
						? d
						: function (e, t) {
								if (((e = a(e)), (t = l(t)), u))
									try {
										return d(e, t);
									} catch (e) {}
								if (c(e, t)) return s(!o(i.f, e, t), e[t]);
							};
				},
				{
					'../internals/create-property-descriptor': 25,
					'../internals/descriptors': 31,
					'../internals/function-call': 47,
					'../internals/has-own-property': 56,
					'../internals/ie8-dom-define': 59,
					'../internals/object-property-is-enumerable': 91,
					'../internals/to-indexed-object': 110,
					'../internals/to-property-key': 117,
				},
			],
			85: [
				function (e, t, n) {
					var r = e('../internals/object-keys-internal'),
						o = e('../internals/enum-bug-keys').concat('length', 'prototype');
					n.f =
						Object.getOwnPropertyNames ||
						function (e) {
							return r(e, o);
						};
				},
				{ '../internals/enum-bug-keys': 40, '../internals/object-keys-internal': 89 },
			],
			86: [
				function (e, t, n) {
					n.f = Object.getOwnPropertySymbols;
				},
				{},
			],
			87: [
				function (e, t, n) {
					var r = e('../internals/has-own-property'),
						o = e('../internals/is-callable'),
						i = e('../internals/to-object'),
						s = e('../internals/shared-key'),
						a = e('../internals/correct-prototype-getter'),
						l = s('IE_PROTO'),
						c = Object,
						u = c.prototype;
					t.exports = a
						? c.getPrototypeOf
						: function (e) {
								var t = i(e);
								if (r(t, l)) return t[l];
								var n = t.constructor;
								return o(n) && t instanceof n ? n.prototype : t instanceof c ? u : null;
							};
				},
				{
					'../internals/correct-prototype-getter': 22,
					'../internals/has-own-property': 56,
					'../internals/is-callable': 67,
					'../internals/shared-key': 104,
					'../internals/to-object': 113,
				},
			],
			88: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this');
					t.exports = r({}.isPrototypeOf);
				},
				{ '../internals/function-uncurry-this': 49 },
			],
			89: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/has-own-property'),
						i = e('../internals/to-indexed-object'),
						s = e('../internals/array-includes').indexOf,
						a = e('../internals/hidden-keys'),
						l = r([].push);
					t.exports = function (e, t) {
						var n,
							r = i(e),
							c = 0,
							u = [];
						for (n in r) !o(a, n) && o(r, n) && l(u, n);
						for (; t.length > c; ) o(r, (n = t[c++])) && (~s(u, n) || l(u, n));
						return u;
					};
				},
				{
					'../internals/array-includes': 12,
					'../internals/function-uncurry-this': 49,
					'../internals/has-own-property': 56,
					'../internals/hidden-keys': 57,
					'../internals/to-indexed-object': 110,
				},
			],
			90: [
				function (e, t, n) {
					var r = e('../internals/object-keys-internal'),
						o = e('../internals/enum-bug-keys');
					t.exports =
						Object.keys ||
						function (e) {
							return r(e, o);
						};
				},
				{ '../internals/enum-bug-keys': 40, '../internals/object-keys-internal': 89 },
			],
			91: [
				function (e, t, n) {
					'use strict';
					var r = {}.propertyIsEnumerable,
						o = Object.getOwnPropertyDescriptor,
						i = o && !r.call({ 1: 2 }, 1);
					n.f = i
						? function (e) {
								var t = o(this, e);
								return !!t && t.enumerable;
							}
						: r;
				},
				{},
			],
			92: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/an-object'),
						i = e('../internals/a-possible-prototype');
					t.exports =
						Object.setPrototypeOf ||
						('__proto__' in {}
							? (function () {
									var e,
										t = !1,
										n = {};
									try {
										(e = r(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set))(n, []), (t = n instanceof Array);
									} catch (e) {}
									return function (n, r) {
										return o(n), i(r), t ? e(n, r) : (n.__proto__ = r), n;
									};
								})()
							: void 0);
				},
				{ '../internals/a-possible-prototype': 3, '../internals/an-object': 7, '../internals/function-uncurry-this': 49 },
			],
			93: [
				function (e, t, n) {
					var r = e('../internals/function-call'),
						o = e('../internals/is-callable'),
						i = e('../internals/is-object'),
						s = TypeError;
					t.exports = function (e, t) {
						var n, a;
						if ('string' === t && o((n = e.toString)) && !i((a = r(n, e)))) return a;
						if (o((n = e.valueOf)) && !i((a = r(n, e)))) return a;
						if ('string' !== t && o((n = e.toString)) && !i((a = r(n, e)))) return a;
						throw s("Can't convert object to primitive value");
					};
				},
				{ '../internals/function-call': 47, '../internals/is-callable': 67, '../internals/is-object': 71 },
			],
			94: [
				function (e, t, n) {
					var r = e('../internals/get-built-in'),
						o = e('../internals/function-uncurry-this'),
						i = e('../internals/object-get-own-property-names'),
						s = e('../internals/object-get-own-property-symbols'),
						a = e('../internals/an-object'),
						l = o([].concat);
					t.exports =
						r('Reflect', 'ownKeys') ||
						function (e) {
							var t = i.f(a(e)),
								n = s.f;
							return n ? l(t, n(e)) : t;
						};
				},
				{
					'../internals/an-object': 7,
					'../internals/function-uncurry-this': 49,
					'../internals/get-built-in': 50,
					'../internals/object-get-own-property-names': 85,
					'../internals/object-get-own-property-symbols': 86,
				},
			],
			95: [
				function (e, t, n) {
					var r = e('../internals/function-call'),
						o = e('../internals/an-object'),
						i = e('../internals/is-callable'),
						s = e('../internals/classof-raw'),
						a = e('../internals/regexp-exec'),
						l = TypeError;
					t.exports = function (e, t) {
						var n = e.exec;
						if (i(n)) {
							var c = r(n, e, t);
							return null !== c && o(c), c;
						}
						if ('RegExp' === s(e)) return r(a, e, t);
						throw l('RegExp#exec called on incompatible receiver');
					};
				},
				{ '../internals/an-object': 7, '../internals/classof-raw': 19, '../internals/function-call': 47, '../internals/is-callable': 67, '../internals/regexp-exec': 96 },
			],
			96: [
				function (e, t, n) {
					'use strict';
					var r,
						o,
						i = e('../internals/function-call'),
						s = e('../internals/function-uncurry-this'),
						a = e('../internals/to-string'),
						l = e('../internals/regexp-flags'),
						c = e('../internals/regexp-sticky-helpers'),
						u = e('../internals/shared'),
						d = e('../internals/object-create'),
						f = e('../internals/internal-state').get,
						p = e('../internals/regexp-unsupported-dot-all'),
						h = e('../internals/regexp-unsupported-ncg'),
						m = u('native-string-replace', String.prototype.replace),
						y = RegExp.prototype.exec,
						v = y,
						g = s(''.charAt),
						b = s(''.indexOf),
						w = s(''.replace),
						_ = s(''.slice),
						x = ((o = /b*/g), i(y, (r = /a/), 'a'), i(y, o, 'a'), 0 !== r.lastIndex || 0 !== o.lastIndex),
						k = c.BROKEN_CARET,
						C = void 0 !== /()??/.exec('')[1];
					(x || C || k || p || h) &&
						(v = function (e) {
							var t,
								n,
								r,
								o,
								s,
								c,
								u,
								p = this,
								h = f(p),
								E = a(e),
								j = h.raw;
							if (j) return (j.lastIndex = p.lastIndex), (t = i(v, j, E)), (p.lastIndex = j.lastIndex), t;
							var S = h.groups,
								D = k && p.sticky,
								O = i(l, p),
								P = p.source,
								B = 0,
								M = E;
							if (
								(D &&
									((O = w(O, 'y', '')),
									-1 === b(O, 'g') && (O += 'g'),
									(M = _(E, p.lastIndex)),
									p.lastIndex > 0 && (!p.multiline || (p.multiline && '\n' !== g(E, p.lastIndex - 1))) && ((P = '(?: ' + P + ')'), (M = ' ' + M), B++),
									(n = new RegExp('^(?:' + P + ')', O))),
								C && (n = new RegExp('^' + P + '$(?!\\s)', O)),
								x && (r = p.lastIndex),
								(o = i(y, D ? n : p, M)),
								D
									? o
										? ((o.input = _(o.input, B)), (o[0] = _(o[0], B)), (o.index = p.lastIndex), (p.lastIndex += o[0].length))
										: (p.lastIndex = 0)
									: x && o && (p.lastIndex = p.global ? o.index + o[0].length : r),
								C &&
									o &&
									o.length > 1 &&
									i(m, o[0], n, function () {
										for (s = 1; s < arguments.length - 2; s++) void 0 === arguments[s] && (o[s] = void 0);
									}),
								o && S)
							)
								for (o.groups = c = d(null), s = 0; s < S.length; s++) c[(u = S[s])[0]] = o[u[1]];
							return o;
						}),
						(t.exports = v);
				},
				{
					'../internals/function-call': 47,
					'../internals/function-uncurry-this': 49,
					'../internals/internal-state': 64,
					'../internals/object-create': 81,
					'../internals/regexp-flags': 97,
					'../internals/regexp-sticky-helpers': 98,
					'../internals/regexp-unsupported-dot-all': 99,
					'../internals/regexp-unsupported-ncg': 100,
					'../internals/shared': 106,
					'../internals/to-string': 119,
				},
			],
			97: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/an-object');
					t.exports = function () {
						var e = r(this),
							t = '';
						return (
							e.hasIndices && (t += 'd'),
							e.global && (t += 'g'),
							e.ignoreCase && (t += 'i'),
							e.multiline && (t += 'm'),
							e.dotAll && (t += 's'),
							e.unicode && (t += 'u'),
							e.unicodeSets && (t += 'v'),
							e.sticky && (t += 'y'),
							t
						);
					};
				},
				{ '../internals/an-object': 7 },
			],
			98: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/global').RegExp,
						i = r(function () {
							var e = o('a', 'y');
							return (e.lastIndex = 2), null != e.exec('abcd');
						}),
						s =
							i ||
							r(function () {
								return !o('a', 'y').sticky;
							}),
						a =
							i ||
							r(function () {
								var e = o('^r', 'gy');
								return (e.lastIndex = 2), null != e.exec('str');
							});
					t.exports = { BROKEN_CARET: a, MISSED_STICKY: s, UNSUPPORTED_Y: i };
				},
				{ '../internals/fails': 42, '../internals/global': 55 },
			],
			99: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/global').RegExp;
					t.exports = r(function () {
						var e = o('.', 's');
						return !(e.dotAll && e.exec('\n') && 's' === e.flags);
					});
				},
				{ '../internals/fails': 42, '../internals/global': 55 },
			],
			100: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/global').RegExp;
					t.exports = r(function () {
						var e = o('(?<a>b)', 'g');
						return 'b' !== e.exec('b').groups.a || 'bc' !== 'b'.replace(e, '$<a>c');
					});
				},
				{ '../internals/fails': 42, '../internals/global': 55 },
			],
			101: [
				function (e, t, n) {
					var r = TypeError;
					t.exports = function (e) {
						if (null == e) throw r("Can't call method on " + e);
						return e;
					};
				},
				{},
			],
			102: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/get-built-in'),
						o = e('../internals/object-define-property'),
						i = e('../internals/well-known-symbol'),
						s = e('../internals/descriptors'),
						a = i('species');
					t.exports = function (e) {
						var t = r(e),
							n = o.f;
						s &&
							t &&
							!t[a] &&
							n(t, a, {
								configurable: !0,
								get: function () {
									return this;
								},
							});
					};
				},
				{ '../internals/descriptors': 31, '../internals/get-built-in': 50, '../internals/object-define-property': 83, '../internals/well-known-symbol': 127 },
			],
			103: [
				function (e, t, n) {
					var r = e('../internals/object-define-property').f,
						o = e('../internals/has-own-property'),
						i = e('../internals/well-known-symbol')('toStringTag');
					t.exports = function (e, t, n) {
						e && !n && (e = e.prototype), e && !o(e, i) && r(e, i, { configurable: !0, value: t });
					};
				},
				{ '../internals/has-own-property': 56, '../internals/object-define-property': 83, '../internals/well-known-symbol': 127 },
			],
			104: [
				function (e, t, n) {
					var r = e('../internals/shared'),
						o = e('../internals/uid'),
						i = r('keys');
					t.exports = function (e) {
						return i[e] || (i[e] = o(e));
					};
				},
				{ '../internals/shared': 106, '../internals/uid': 124 },
			],
			105: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/define-global-property'),
						i = '__core-js_shared__',
						s = r[i] || o(i, {});
					t.exports = s;
				},
				{ '../internals/define-global-property': 29, '../internals/global': 55 },
			],
			106: [
				function (e, t, n) {
					var r = e('../internals/is-pure'),
						o = e('../internals/shared-store');
					(t.exports = function (e, t) {
						return o[e] || (o[e] = void 0 !== t ? t : {});
					})('versions', []).push({
						version: '3.23.4',
						mode: r ? 'pure' : 'global',
						copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
						license: 'https://github.com/zloirock/core-js/blob/v3.23.4/LICENSE',
						source: 'https://github.com/zloirock/core-js',
					});
				},
				{ '../internals/is-pure': 72, '../internals/shared-store': 105 },
			],
			107: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/to-integer-or-infinity'),
						i = e('../internals/to-string'),
						s = e('../internals/require-object-coercible'),
						a = r(''.charAt),
						l = r(''.charCodeAt),
						c = r(''.slice),
						u = function (e) {
							return function (t, n) {
								var r,
									u,
									d = i(s(t)),
									f = o(n),
									p = d.length;
								return f < 0 || f >= p
									? e
										? ''
										: void 0
									: (r = l(d, f)) < 55296 || r > 56319 || f + 1 === p || (u = l(d, f + 1)) < 56320 || u > 57343
										? e
											? a(d, f)
											: r
										: e
											? c(d, f, f + 2)
											: u - 56320 + ((r - 55296) << 10) + 65536;
							};
						};
					t.exports = { codeAt: u(!1), charAt: u(!0) };
				},
				{
					'../internals/function-uncurry-this': 49,
					'../internals/require-object-coercible': 101,
					'../internals/to-integer-or-infinity': 111,
					'../internals/to-string': 119,
				},
			],
			108: [
				function (e, t, n) {
					var r = e('../internals/to-integer-or-infinity'),
						o = Math.max,
						i = Math.min;
					t.exports = function (e, t) {
						var n = r(e);
						return n < 0 ? o(n + t, 0) : i(n, t);
					};
				},
				{ '../internals/to-integer-or-infinity': 111 },
			],
			109: [
				function (e, t, n) {
					var r = e('../internals/to-integer-or-infinity'),
						o = e('../internals/to-length'),
						i = RangeError;
					t.exports = function (e) {
						if (void 0 === e) return 0;
						var t = r(e),
							n = o(t);
						if (t !== n) throw i('Wrong length or index');
						return n;
					};
				},
				{ '../internals/to-integer-or-infinity': 111, '../internals/to-length': 112 },
			],
			110: [
				function (e, t, n) {
					var r = e('../internals/indexed-object'),
						o = e('../internals/require-object-coercible');
					t.exports = function (e) {
						return r(o(e));
					};
				},
				{ '../internals/indexed-object': 61, '../internals/require-object-coercible': 101 },
			],
			111: [
				function (e, t, n) {
					var r = e('../internals/math-trunc');
					t.exports = function (e) {
						var t = +e;
						return t != t || 0 === t ? 0 : r(t);
					};
				},
				{ '../internals/math-trunc': 78 },
			],
			112: [
				function (e, t, n) {
					var r = e('../internals/to-integer-or-infinity'),
						o = Math.min;
					t.exports = function (e) {
						return e > 0 ? o(r(e), 9007199254740991) : 0;
					};
				},
				{ '../internals/to-integer-or-infinity': 111 },
			],
			113: [
				function (e, t, n) {
					var r = e('../internals/require-object-coercible'),
						o = Object;
					t.exports = function (e) {
						return o(r(e));
					};
				},
				{ '../internals/require-object-coercible': 101 },
			],
			114: [
				function (e, t, n) {
					var r = e('../internals/to-positive-integer'),
						o = RangeError;
					t.exports = function (e, t) {
						var n = r(e);
						if (n % t) throw o('Wrong offset');
						return n;
					};
				},
				{ '../internals/to-positive-integer': 115 },
			],
			115: [
				function (e, t, n) {
					var r = e('../internals/to-integer-or-infinity'),
						o = RangeError;
					t.exports = function (e) {
						var t = r(e);
						if (t < 0) throw o("The argument can't be less than 0");
						return t;
					};
				},
				{ '../internals/to-integer-or-infinity': 111 },
			],
			116: [
				function (e, t, n) {
					var r = e('../internals/function-call'),
						o = e('../internals/is-object'),
						i = e('../internals/is-symbol'),
						s = e('../internals/get-method'),
						a = e('../internals/ordinary-to-primitive'),
						l = e('../internals/well-known-symbol'),
						c = TypeError,
						u = l('toPrimitive');
					t.exports = function (e, t) {
						if (!o(e) || i(e)) return e;
						var n,
							l = s(e, u);
						if (l) {
							if ((void 0 === t && (t = 'default'), (n = r(l, e, t)), !o(n) || i(n))) return n;
							throw c("Can't convert object to primitive value");
						}
						return void 0 === t && (t = 'number'), a(e, t);
					};
				},
				{
					'../internals/function-call': 47,
					'../internals/get-method': 53,
					'../internals/is-object': 71,
					'../internals/is-symbol': 73,
					'../internals/ordinary-to-primitive': 93,
					'../internals/well-known-symbol': 127,
				},
			],
			117: [
				function (e, t, n) {
					var r = e('../internals/to-primitive'),
						o = e('../internals/is-symbol');
					t.exports = function (e) {
						var t = r(e, 'string');
						return o(t) ? t : t + '';
					};
				},
				{ '../internals/is-symbol': 73, '../internals/to-primitive': 116 },
			],
			118: [
				function (e, t, n) {
					var r = {};
					(r[e('../internals/well-known-symbol')('toStringTag')] = 'z'), (t.exports = '[object z]' === String(r));
				},
				{ '../internals/well-known-symbol': 127 },
			],
			119: [
				function (e, t, n) {
					var r = e('../internals/classof'),
						o = String;
					t.exports = function (e) {
						if ('Symbol' === r(e)) throw TypeError('Cannot convert a Symbol value to a string');
						return o(e);
					};
				},
				{ '../internals/classof': 20 },
			],
			120: [
				function (e, t, n) {
					var r = String;
					t.exports = function (e) {
						try {
							return r(e);
						} catch (e) {
							return 'Object';
						}
					};
				},
				{},
			],
			121: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/export'),
						o = e('../internals/global'),
						i = e('../internals/function-call'),
						s = e('../internals/descriptors'),
						a = e('../internals/typed-array-constructors-require-wrappers'),
						l = e('../internals/array-buffer-view-core'),
						c = e('../internals/array-buffer'),
						u = e('../internals/an-instance'),
						d = e('../internals/create-property-descriptor'),
						f = e('../internals/create-non-enumerable-property'),
						p = e('../internals/is-integral-number'),
						h = e('../internals/to-length'),
						m = e('../internals/to-index'),
						y = e('../internals/to-offset'),
						v = e('../internals/to-property-key'),
						g = e('../internals/has-own-property'),
						b = e('../internals/classof'),
						w = e('../internals/is-object'),
						_ = e('../internals/is-symbol'),
						x = e('../internals/object-create'),
						k = e('../internals/object-is-prototype-of'),
						C = e('../internals/object-set-prototype-of'),
						E = e('../internals/object-get-own-property-names').f,
						j = e('../internals/typed-array-from'),
						S = e('../internals/array-iteration').forEach,
						D = e('../internals/set-species'),
						O = e('../internals/object-define-property'),
						P = e('../internals/object-get-own-property-descriptor'),
						B = e('../internals/internal-state'),
						M = e('../internals/inherit-if-required'),
						I = B.get,
						A = B.set,
						T = B.enforce,
						K = O.f,
						L = P.f,
						R = Math.round,
						N = o.RangeError,
						z = c.ArrayBuffer,
						F = z.prototype,
						U = c.DataView,
						H = l.NATIVE_ARRAY_BUFFER_VIEWS,
						V = l.TYPED_ARRAY_TAG,
						q = l.TypedArray,
						W = l.TypedArrayPrototype,
						G = l.aTypedArrayConstructor,
						Y = l.isTypedArray,
						X = 'BYTES_PER_ELEMENT',
						$ = 'Wrong length',
						J = function (e, t) {
							G(e);
							for (var n = 0, r = t.length, o = new e(r); r > n; ) o[n] = t[n++];
							return o;
						},
						Q = function (e, t) {
							K(e, t, {
								get: function () {
									return I(this)[t];
								},
							});
						},
						Z = function (e) {
							var t;
							return k(F, e) || 'ArrayBuffer' == (t = b(e)) || 'SharedArrayBuffer' == t;
						},
						ee = function (e, t) {
							return Y(e) && !_(t) && t in e && p(+t) && t >= 0;
						},
						te = function (e, t) {
							return (t = v(t)), ee(e, t) ? d(2, e[t]) : L(e, t);
						},
						ne = function (e, t, n) {
							return (
								(t = v(t)),
								!(ee(e, t) && w(n) && g(n, 'value')) ||
								g(n, 'get') ||
								g(n, 'set') ||
								n.configurable ||
								(g(n, 'writable') && !n.writable) ||
								(g(n, 'enumerable') && !n.enumerable)
									? K(e, t, n)
									: ((e[t] = n.value), e)
							);
						};
					s
						? (H || ((P.f = te), (O.f = ne), Q(W, 'buffer'), Q(W, 'byteOffset'), Q(W, 'byteLength'), Q(W, 'length')),
							r({ target: 'Object', stat: !0, forced: !H }, { getOwnPropertyDescriptor: te, defineProperty: ne }),
							(t.exports = function (e, t, n) {
								var s = e.match(/\d+$/)[0] / 8,
									l = e + (n ? 'Clamped' : '') + 'Array',
									c = 'get' + e,
									d = 'set' + e,
									p = o[l],
									v = p,
									g = v && v.prototype,
									b = {},
									_ = function (e, t) {
										K(e, t, {
											get: function () {
												return (function (e, t) {
													var n = I(e);
													return n.view[c](t * s + n.byteOffset, !0);
												})(this, t);
											},
											set: function (e) {
												return (function (e, t, r) {
													var o = I(e);
													n && (r = (r = R(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), o.view[d](t * s + o.byteOffset, r, !0);
												})(this, t, e);
											},
											enumerable: !0,
										});
									};
								H
									? a &&
										((v = t(function (e, t, n, r) {
											return (
												u(e, g),
												M(
													w(t)
														? Z(t)
															? void 0 !== r
																? new p(t, y(n, s), r)
																: void 0 !== n
																	? new p(t, y(n, s))
																	: new p(t)
															: Y(t)
																? J(v, t)
																: i(j, v, t)
														: new p(m(t)),
													e,
													v
												)
											);
										})),
										C && C(v, q),
										S(E(p), function (e) {
											e in v || f(v, e, p[e]);
										}),
										(v.prototype = g))
									: ((v = t(function (e, t, n, r) {
											u(e, g);
											var o,
												a,
												l,
												c = 0,
												d = 0;
											if (w(t)) {
												if (!Z(t)) return Y(t) ? J(v, t) : i(j, v, t);
												(o = t), (d = y(n, s));
												var f = t.byteLength;
												if (void 0 === r) {
													if (f % s) throw N($);
													if ((a = f - d) < 0) throw N($);
												} else if ((a = h(r) * s) + d > f) throw N($);
												l = a / s;
											} else (l = m(t)), (o = new z((a = l * s)));
											for (A(e, { buffer: o, byteOffset: d, byteLength: a, length: l, view: new U(o) }); c < l; ) _(e, c++);
										})),
										C && C(v, q),
										(g = v.prototype = x(W))),
									g.constructor !== v && f(g, 'constructor', v),
									(T(g).TypedArrayConstructor = v),
									V && f(g, V, l);
								var k = v != p;
								(b[l] = v), r({ global: !0, constructor: !0, forced: k, sham: !H }, b), X in v || f(v, X, s), X in g || f(g, X, s), D(l);
							}))
						: (t.exports = function () {});
				},
				{
					'../internals/an-instance': 6,
					'../internals/array-buffer': 10,
					'../internals/array-buffer-view-core': 9,
					'../internals/array-iteration': 13,
					'../internals/classof': 20,
					'../internals/create-non-enumerable-property': 24,
					'../internals/create-property-descriptor': 25,
					'../internals/descriptors': 31,
					'../internals/export': 41,
					'../internals/function-call': 47,
					'../internals/global': 55,
					'../internals/has-own-property': 56,
					'../internals/inherit-if-required': 62,
					'../internals/internal-state': 64,
					'../internals/is-integral-number': 70,
					'../internals/is-object': 71,
					'../internals/is-symbol': 73,
					'../internals/object-create': 81,
					'../internals/object-define-property': 83,
					'../internals/object-get-own-property-descriptor': 84,
					'../internals/object-get-own-property-names': 85,
					'../internals/object-is-prototype-of': 88,
					'../internals/object-set-prototype-of': 92,
					'../internals/set-species': 102,
					'../internals/to-index': 109,
					'../internals/to-length': 112,
					'../internals/to-offset': 114,
					'../internals/to-property-key': 117,
					'../internals/typed-array-constructors-require-wrappers': 122,
					'../internals/typed-array-from': 123,
				},
			],
			122: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/fails'),
						i = e('../internals/check-correctness-of-iteration'),
						s = e('../internals/array-buffer-view-core').NATIVE_ARRAY_BUFFER_VIEWS,
						a = r.ArrayBuffer,
						l = r.Int8Array;
					t.exports =
						!s ||
						!o(function () {
							l(1);
						}) ||
						!o(function () {
							new l(-1);
						}) ||
						!i(function (e) {
							new l(), new l(null), new l(1.5), new l(e);
						}, !0) ||
						o(function () {
							return 1 !== new l(new a(2), 1, void 0).length;
						});
				},
				{ '../internals/array-buffer-view-core': 9, '../internals/check-correctness-of-iteration': 18, '../internals/fails': 42, '../internals/global': 55 },
			],
			123: [
				function (e, t, n) {
					var r = e('../internals/function-bind-context'),
						o = e('../internals/function-call'),
						i = e('../internals/a-constructor'),
						s = e('../internals/to-object'),
						a = e('../internals/length-of-array-like'),
						l = e('../internals/get-iterator'),
						c = e('../internals/get-iterator-method'),
						u = e('../internals/is-array-iterator-method'),
						d = e('../internals/array-buffer-view-core').aTypedArrayConstructor;
					t.exports = function (e) {
						var t,
							n,
							f,
							p,
							h,
							m,
							y = i(this),
							v = s(e),
							g = arguments.length,
							b = g > 1 ? arguments[1] : void 0,
							w = void 0 !== b,
							_ = c(v);
						if (_ && !u(_)) for (m = (h = l(v, _)).next, v = []; !(p = o(m, h)).done; ) v.push(p.value);
						for (w && g > 2 && (b = r(b, arguments[2])), n = a(v), f = new (d(y))(n), t = 0; n > t; t++) f[t] = w ? b(v[t], t) : v[t];
						return f;
					};
				},
				{
					'../internals/a-constructor': 2,
					'../internals/array-buffer-view-core': 9,
					'../internals/function-bind-context': 45,
					'../internals/function-call': 47,
					'../internals/get-iterator': 52,
					'../internals/get-iterator-method': 51,
					'../internals/is-array-iterator-method': 65,
					'../internals/length-of-array-like': 76,
					'../internals/to-object': 113,
				},
			],
			124: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = 0,
						i = Math.random(),
						s = r((1).toString);
					t.exports = function (e) {
						return 'Symbol(' + (void 0 === e ? '' : e) + ')_' + s(++o + i, 36);
					};
				},
				{ '../internals/function-uncurry-this': 49 },
			],
			125: [
				function (e, t, n) {
					var r = e('../internals/native-symbol');
					t.exports = r && !Symbol.sham && 'symbol' == typeof Symbol.iterator;
				},
				{ '../internals/native-symbol': 79 },
			],
			126: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/fails');
					t.exports =
						r &&
						o(function () {
							return 42 != Object.defineProperty(function () {}, 'prototype', { value: 42, writable: !1 }).prototype;
						});
				},
				{ '../internals/descriptors': 31, '../internals/fails': 42 },
			],
			127: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/shared'),
						i = e('../internals/has-own-property'),
						s = e('../internals/uid'),
						a = e('../internals/native-symbol'),
						l = e('../internals/use-symbol-as-uid'),
						c = o('wks'),
						u = r.Symbol,
						d = u && u.for,
						f = l ? u : (u && u.withoutSetter) || s;
					t.exports = function (e) {
						if (!i(c, e) || (!a && 'string' != typeof c[e])) {
							var t = 'Symbol.' + e;
							a && i(u, e) ? (c[e] = u[e]) : (c[e] = l && d ? d(t) : f(t));
						}
						return c[e];
					};
				},
				{
					'../internals/global': 55,
					'../internals/has-own-property': 56,
					'../internals/native-symbol': 79,
					'../internals/shared': 106,
					'../internals/uid': 124,
					'../internals/use-symbol-as-uid': 125,
				},
			],
			128: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/to-indexed-object'),
						o = e('../internals/add-to-unscopables'),
						i = e('../internals/iterators'),
						s = e('../internals/internal-state'),
						a = e('../internals/object-define-property').f,
						l = e('../internals/define-iterator'),
						c = e('../internals/is-pure'),
						u = e('../internals/descriptors'),
						d = 'Array Iterator',
						f = s.set,
						p = s.getterFor(d);
					t.exports = l(
						Array,
						'Array',
						function (e, t) {
							f(this, { type: d, target: r(e), index: 0, kind: t });
						},
						function () {
							var e = p(this),
								t = e.target,
								n = e.kind,
								r = e.index++;
							return !t || r >= t.length
								? ((e.target = void 0), { value: void 0, done: !0 })
								: 'keys' == n
									? { value: r, done: !1 }
									: 'values' == n
										? { value: t[r], done: !1 }
										: { value: [r, t[r]], done: !1 };
						},
						'values'
					);
					var h = (i.Arguments = i.Array);
					if ((o('keys'), o('values'), o('entries'), !c && u && 'values' !== h.name))
						try {
							a(h, 'name', { value: 'values' });
						} catch (e) {}
				},
				{
					'../internals/add-to-unscopables': 4,
					'../internals/define-iterator': 30,
					'../internals/descriptors': 31,
					'../internals/internal-state': 64,
					'../internals/is-pure': 72,
					'../internals/iterators': 75,
					'../internals/object-define-property': 83,
					'../internals/to-indexed-object': 110,
				},
			],
			129: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/export'),
						o = e('../internals/regexp-exec');
					r({ target: 'RegExp', proto: !0, forced: /./.exec !== o }, { exec: o });
				},
				{ '../internals/export': 41, '../internals/regexp-exec': 96 },
			],
			130: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/function-apply'),
						o = e('../internals/function-call'),
						i = e('../internals/function-uncurry-this'),
						s = e('../internals/fix-regexp-well-known-symbol-logic'),
						a = e('../internals/fails'),
						l = e('../internals/an-object'),
						c = e('../internals/is-callable'),
						u = e('../internals/to-integer-or-infinity'),
						d = e('../internals/to-length'),
						f = e('../internals/to-string'),
						p = e('../internals/require-object-coercible'),
						h = e('../internals/advance-string-index'),
						m = e('../internals/get-method'),
						y = e('../internals/get-substitution'),
						v = e('../internals/regexp-exec-abstract'),
						g = e('../internals/well-known-symbol')('replace'),
						b = Math.max,
						w = Math.min,
						_ = i([].concat),
						x = i([].push),
						k = i(''.indexOf),
						C = i(''.slice),
						E = '$0' === 'a'.replace(/./, '$0'),
						j = !!/./[g] && '' === /./[g]('a', '$0');
					s(
						'replace',
						function (e, t, n) {
							var i = j ? '$' : '$0';
							return [
								function (e, n) {
									var r = p(this),
										i = null == e ? void 0 : m(e, g);
									return i ? o(i, e, r, n) : o(t, f(r), e, n);
								},
								function (e, o) {
									var s = l(this),
										a = f(e);
									if ('string' == typeof o && -1 === k(o, i) && -1 === k(o, '$<')) {
										var p = n(t, s, a, o);
										if (p.done) return p.value;
									}
									var m = c(o);
									m || (o = f(o));
									var g = s.global;
									if (g) {
										var E = s.unicode;
										s.lastIndex = 0;
									}
									for (var j = []; ; ) {
										var S = v(s, a);
										if (null === S) break;
										if ((x(j, S), !g)) break;
										'' === f(S[0]) && (s.lastIndex = h(a, d(s.lastIndex), E));
									}
									for (var D, O = '', P = 0, B = 0; B < j.length; B++) {
										for (var M = f((S = j[B])[0]), I = b(w(u(S.index), a.length), 0), A = [], T = 1; T < S.length; T++)
											x(A, void 0 === (D = S[T]) ? D : String(D));
										var K = S.groups;
										if (m) {
											var L = _([M], A, I, a);
											void 0 !== K && x(L, K);
											var R = f(r(o, void 0, L));
										} else R = y(M, a, I, A, K, o);
										I >= P && ((O += C(a, P, I) + R), (P = I + M.length));
									}
									return O + C(a, P);
								},
							];
						},
						!!a(function () {
							var e = /./;
							return (
								(e.exec = function () {
									var e = [];
									return (e.groups = { a: '7' }), e;
								}),
								'7' !== ''.replace(e, '$<a>')
							);
						}) ||
							!E ||
							j
					);
				},
				{
					'../internals/advance-string-index': 5,
					'../internals/an-object': 7,
					'../internals/fails': 42,
					'../internals/fix-regexp-well-known-symbol-logic': 43,
					'../internals/function-apply': 44,
					'../internals/function-call': 47,
					'../internals/function-uncurry-this': 49,
					'../internals/get-method': 53,
					'../internals/get-substitution': 54,
					'../internals/is-callable': 67,
					'../internals/regexp-exec-abstract': 95,
					'../internals/require-object-coercible': 101,
					'../internals/to-integer-or-infinity': 111,
					'../internals/to-length': 112,
					'../internals/to-string': 119,
					'../internals/well-known-symbol': 127,
				},
			],
			131: [
				function (e, t, n) {
					e('../internals/typed-array-constructor')('Float32', function (e) {
						return function (t, n, r) {
							return e(this, t, n, r);
						};
					});
				},
				{ '../internals/typed-array-constructor': 121 },
			],
			132: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/array-buffer-view-core'),
						o = e('../internals/typed-array-constructors-require-wrappers'),
						i = r.aTypedArrayConstructor;
					(0, r.exportTypedArrayStaticMethod)(
						'of',
						function () {
							for (var e = 0, t = arguments.length, n = new (i(this))(t); t > e; ) n[e] = arguments[e++];
							return n;
						},
						o
					);
				},
				{ '../internals/array-buffer-view-core': 9, '../internals/typed-array-constructors-require-wrappers': 122 },
			],
			133: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/global'),
						o = e('../internals/function-call'),
						i = e('../internals/array-buffer-view-core'),
						s = e('../internals/length-of-array-like'),
						a = e('../internals/to-offset'),
						l = e('../internals/to-object'),
						c = e('../internals/fails'),
						u = r.RangeError,
						d = r.Int8Array,
						f = d && d.prototype,
						p = f && f.set,
						h = i.aTypedArray,
						m = i.exportTypedArrayMethod,
						y = !c(function () {
							var e = new Uint8ClampedArray(2);
							return o(p, e, { length: 1, 0: 3 }, 1), 3 !== e[1];
						}),
						v =
							y &&
							i.NATIVE_ARRAY_BUFFER_VIEWS &&
							c(function () {
								var e = new d(2);
								return e.set(1), e.set('2', 1), 0 !== e[0] || 2 !== e[1];
							});
					m(
						'set',
						function (e) {
							h(this);
							var t = a(arguments.length > 1 ? arguments[1] : void 0, 1),
								n = l(e);
							if (y) return o(p, this, n, t);
							var r = this.length,
								i = s(n),
								c = 0;
							if (i + t > r) throw u('Wrong length');
							for (; c < i; ) this[t + c] = n[c++];
						},
						!y || v
					);
				},
				{
					'../internals/array-buffer-view-core': 9,
					'../internals/fails': 42,
					'../internals/function-call': 47,
					'../internals/global': 55,
					'../internals/length-of-array-like': 76,
					'../internals/to-object': 113,
					'../internals/to-offset': 114,
				},
			],
			134: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/global'),
						o = e('../internals/function-uncurry-this'),
						i = e('../internals/fails'),
						s = e('../internals/a-callable'),
						a = e('../internals/array-sort'),
						l = e('../internals/array-buffer-view-core'),
						c = e('../internals/engine-ff-version'),
						u = e('../internals/engine-is-ie-or-edge'),
						d = e('../internals/engine-v8-version'),
						f = e('../internals/engine-webkit-version'),
						p = l.aTypedArray,
						h = l.exportTypedArrayMethod,
						m = r.Uint16Array,
						y = m && o(m.prototype.sort),
						v = !(
							!y ||
							(i(function () {
								y(new m(2), null);
							}) &&
								i(function () {
									y(new m(2), {});
								}))
						),
						g =
							!!y &&
							!i(function () {
								if (d) return d < 74;
								if (c) return c < 67;
								if (u) return !0;
								if (f) return f < 602;
								var e,
									t,
									n = new m(516),
									r = Array(516);
								for (e = 0; e < 516; e++) (t = e % 4), (n[e] = 515 - e), (r[e] = e - 2 * t + 3);
								for (
									y(n, function (e, t) {
										return ((e / 4) | 0) - ((t / 4) | 0);
									}),
										e = 0;
									e < 516;
									e++
								)
									if (n[e] !== r[e]) return !0;
							});
					h(
						'sort',
						function (e) {
							return (
								void 0 !== e && s(e),
								g
									? y(this, e)
									: a(
											p(this),
											(function (e) {
												return function (t, n) {
													return void 0 !== e ? +e(t, n) || 0 : n != n ? -1 : t != t ? 1 : 0 === t && 0 === n ? (1 / t > 0 && 1 / n < 0 ? 1 : -1) : t > n;
												};
											})(e)
										)
							);
						},
						!g || v
					);
				},
				{
					'../internals/a-callable': 1,
					'../internals/array-buffer-view-core': 9,
					'../internals/array-sort': 15,
					'../internals/engine-ff-version': 35,
					'../internals/engine-is-ie-or-edge': 36,
					'../internals/engine-v8-version': 38,
					'../internals/engine-webkit-version': 39,
					'../internals/fails': 42,
					'../internals/function-uncurry-this': 49,
					'../internals/global': 55,
				},
			],
			135: [
				function (e, t, n) {
					e('../internals/typed-array-constructor')('Uint8', function (e) {
						return function (t, n, r) {
							return e(this, t, n, r);
						};
					});
				},
				{ '../internals/typed-array-constructor': 121 },
			],
			136: [
				function (e, t, n) {
					e('../internals/typed-array-constructor')(
						'Uint8',
						function (e) {
							return function (t, n, r) {
								return e(this, t, n, r);
							};
						},
						!0
					);
				},
				{ '../internals/typed-array-constructor': 121 },
			],
			137: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/dom-iterables'),
						i = e('../internals/dom-token-list-prototype'),
						s = e('../modules/es.array.iterator'),
						a = e('../internals/create-non-enumerable-property'),
						l = e('../internals/well-known-symbol'),
						c = l('iterator'),
						u = l('toStringTag'),
						d = s.values,
						f = function (e, t) {
							if (e) {
								if (e[c] !== d)
									try {
										a(e, c, d);
									} catch (t) {
										e[c] = d;
									}
								if ((e[u] || a(e, u, t), o[t]))
									for (var n in s)
										if (e[n] !== s[n])
											try {
												a(e, n, s[n]);
											} catch (t) {
												e[n] = s[n];
											}
							}
						};
					for (var p in o) f(r[p] && r[p].prototype, p);
					f(i, 'DOMTokenList');
				},
				{
					'../internals/create-non-enumerable-property': 24,
					'../internals/dom-iterables': 33,
					'../internals/dom-token-list-prototype': 34,
					'../internals/global': 55,
					'../internals/well-known-symbol': 127,
					'../modules/es.array.iterator': 128,
				},
			],
			138: [
				function (e, t, n) {
					'use strict';
					Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.Build = void 0),
						(n.Build = {
							version: '0.73.8 (e9fa466fc3c6e8f31a7c83d97c78518a)',
							buildSeed: 1665757807348,
							'wdosbox.wasm': { size: 1462485, gzSize: 499437 },
							'wdosbox.js': { size: 124967, gzSize: 32625 },
							'wlibzip.wasm': { size: 110726, gzSize: 51367 },
							'wlibzip.js': { size: 77090, gzSize: 19985 },
						});
				},
				{},
			],
			139: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					e('core-js/modules/web.dom-collections.iterator.js'),
						e('core-js/modules/es.typed-array.uint8-array.js'),
						e('core-js/modules/es.typed-array.set.js'),
						e('core-js/modules/es.typed-array.sort.js');
					Object.defineProperty(n, '__esModule', { value: !0 });
					const o = e('./dos-conf'),
						i = (function (e) {
							return e && e.__esModule ? e : { default: e };
						})(e('../../libzip/libzip')),
						s = e('../../http');
					n.default = class {
						constructor(e) {
							r(this, 'config', void 0),
								r(this, 'sources', void 0),
								r(this, 'libzipWasm', void 0),
								(this.config = (0, o.createDosConfig)()),
								(this.sources = []),
								(this.libzipWasm = e);
						}
						autoexec() {
							for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
							return (this.config.autoexec.options.script.value = t.join('\n')), this;
						}
						cycles(e) {
							return (this.config.cpu.options.cycles.value = e), this;
						}
						extract(e) {
							let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '/',
								n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'zip';
							return this.extractAll([{ url: e, path: t, type: n }]);
						}
						extractAll(e) {
							return this.sources.push(...e), this;
						}
						async toUint8Array() {
							let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
							const t = {};
							await this.libzipWasm.instantiate(t);
							const n = new i.default(t, '/home/web_user'),
								r = await (0, o.toDosboxConf)(this.config),
								l = [];
							for (const e of this.sources) {
								if ('zip' !== e.type) throw new Error('Only Zip is supported');
								const t = (0, s.httpRequest)(e.url, { responseType: 'arraybuffer' }).then(t => ({ source: e, data: new Uint8Array(t) }));
								l.push(t);
							}
							e ||
								(await n.writeFile('.jsdos/dosbox.conf', r),
								await n.writeFile('.jsdos/readme.txt', a),
								await n.writeFile('.jsdos/jsdos.json', JSON.stringify(this.config, null, 2)));
							const c = await Promise.all(l);
							for (const e of c) n.zipToFs(e.data, e.source.path);
							e &&
								(await n.writeFile('.jsdos/dosbox.conf', r),
								await n.writeFile('.jsdos/readme.txt', a),
								await n.writeFile('.jsdos/jsdos.json', JSON.stringify(this.config, null, 2)));
							const u = await n.zipFromFs();
							return n.destroy(), u;
						}
					};
					const a =
						'\nPlease visit our website:\n\n        _                __\n       (_)____      ____/ /___  _____ _________  ____ ___\n      / / ___/_____/ __  / __ \\/ ___// ___/ __ \\/ __ `__ \\\n     / (__  )_____/ /_/ / /_/ (__  )/ /__/ /_/ / / / / / /\n  __/ /____/      \\__,_/\\____/____(_)___/\\____/_/ /_/ /_/\n /___/\n';
				},
				{
					'../../http': 144,
					'../../libzip/libzip': 149,
					'./dos-conf': 140,
					'core-js/modules/es.typed-array.set.js': 133,
					'core-js/modules/es.typed-array.sort.js': 134,
					'core-js/modules/es.typed-array.uint8-array.js': 135,
					'core-js/modules/web.dom-collections.iterator.js': 137,
				},
			],
			140: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					e('core-js/modules/web.dom-collections.iterator.js'),
						Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.toDosboxConf = n.createDosConfig = n.AutoexecCategory = n.MixerCategory = n.CpuCategory = n.DosboxCategory = n.OutputCategory = void 0);
					class o {
						constructor() {
							r(this, 'name', 'sdl'),
								r(
									this,
									'description',
									'This section contains all of the low level system settings for how DOSBox interacts with your real hardware. You can define what resolutions are emulated, how DOSBox should treat errors or listen to your keyboard and mouse. You can often achieve a fair level of optimization by working with these setting, though for the most part leaving them at their default settings will create the best experience. These settings are passed on to the SDL Library which handles low level things like input and thread priority.'
								),
								r(this, 'options', {
									autolock: { name: 'autolock', description: 'Mouse will automatically lock, if you click on the screen.', value: !1, allowedValues: [!0, !1] },
								});
						}
					}
					n.OutputCategory = o;
					class i {
						constructor() {
							r(this, 'name', 'dosbox'),
								r(
									this,
									'description',
									'The [dosbox] section contains various settings that do not pertain to any other section (e.g. setting the language used in DOSBox help texts, where to store screen captures, etc.)'
								),
								r(this, 'options', {
									machine: {
										name: 'machine',
										description: 'The type of machine tries to emulate.',
										value: 'svga_s3',
										allowedValues: [
											'hercules',
											'cga',
											'tandy',
											'pcjr',
											'ega',
											'vgaonly',
											'svga_s3',
											'svga_et3000',
											'svga_et4000',
											'svga_paradise',
											'vesa_nolfb',
											'vesa_oldvbe',
										],
									},
								});
						}
					}
					n.DosboxCategory = i;
					class s {
						constructor() {
							r(this, 'name', 'cpu'),
								r(
									this,
									'description',
									'The CPU section controls how DOSBox tries to emulate the CPU, how fast the emulation should be, and to adjust it. DOSBox offers 4 different methods of CPU emulation.'
								),
								r(this, 'options', {
									core: {
										name: 'core',
										description: 'CPU Core used in emulation. auto will switch to dynamic if available and appropriate.',
										value: 'auto',
										allowedValues: ['auto', 'normal', 'simple'],
									},
									cputype: {
										name: 'cputype',
										description: 'CPU Type used in emulation. auto is the fastest choice.',
										value: 'auto',
										allowedValues: ['auto', '386', '386_slow', '486_slow', 'pentium_slow', '386_prefetch'],
									},
									cycles: {
										name: 'cycles',
										description:
											"Amount of instructions DOSBox tries to emulate each millisecond. Setting this value too high results in sound dropouts and lags.\nCycles can be set in 3 ways:\n'auto'          tries to guess what a game needs.\n                It usually works, but can fail for certain games.\n'fixed #number' will set a fixed amount of cycles. This is what you usually need if 'auto' fails.\n                (Example: fixed 4000).\n'max'           will allocate as much cycles as your computer is able to handle.\n",
										value: 'auto',
										allowedValues: ['auto', 'fixed', 'max'],
									},
								});
						}
					}
					n.CpuCategory = s;
					class a {
						constructor() {
							r(this, 'name', 'mixer'),
								r(this, 'description', 'Here you can define the quality of emulated audio.'),
								r(this, 'options', {
									rate: { name: 'rate', description: 'Frequency rate of sound', value: 44100, allowedValues: [] },
									nosound: { name: 'nosound', description: 'Enable silent mode, sound is still emulated though.', value: !1, allowedValues: [!0, !1] },
								});
						}
					}
					n.MixerCategory = a;
					class l {
						constructor() {
							r(this, 'name', 'autoexec'),
								r(this, 'description', 'Lines in this section will be run at startup'),
								r(this, 'options', { script: { name: 'lines', description: 'Use \\n to separate lines', value: '', allowedValues: [] } });
						}
					}
					function c() {
						return { output: new o(), dosbox: new i(), cpu: new s(), mixer: new a(), autoexec: new l() };
					}
					function u(e, t) {
						const n = 'sdl' === t.name ? 'output' : t.name;
						return new Promise((r, o) => {
							if (e)
								if (e.name === t.name) {
									for (const r of Object.keys(e.options)) {
										const i = e.options[r],
											s = t.options[r];
										if (void 0 === s) return void o(new Error("Unknown option '" + (i.name || r) + "' in '" + e.name + "'"));
										if (s.allowedValues.length > 0) {
											const t = i.value,
												a = s.allowedValues.find(e => e === t);
											if ('cpu' === n && 'cycles' === i.name && (t + '').startsWith('fixed ')) {
												const e = Number.parseInt(t.substr('fixed '.length), 10);
												if (isNaN(e)) return void o(new Error('Fixed value should conatain number'));
											} else if (void 0 === a)
												return void o(
													new Error(
														"Incorrect value '" +
															t +
															"' (" +
															typeof t +
															") for '" +
															e.name +
															'.' +
															(i.name || r) +
															"' allowed is " +
															JSON.stringify(s.allowedValues)
													)
												);
										}
									}
									for (const r of Object.keys(t.options)) if (!(r in e.options)) return void o(new Error("Option '" + r + "' is missed in '" + n + "'"));
									r();
								} else o(new Error("Incorrect category name '" + e.name + "' should be '" + t.name + "'"));
							else o(new Error("Category '" + n + "' is missed"));
						});
					}
					async function d(e, t) {
						if (void 0 !== e)
							for (const n of Object.keys(e.options || {})) {
								const r = e.options[n];
								if ('string' == typeof r || 'number' == typeof r || Array.isArray(r)) {
									const o = t.options[n];
									if (!o) continue;
									const i = r;
									(e.options[n] = { ...o }), (e.options[n].value = i);
								}
							}
					}
					function f(e) {
						let t = '';
						t += '['.concat(e.name, ']\n');
						for (const n of Object.keys(e.options).sort()) {
							const r = e.options[n];
							t += ''.concat(r.name, '=').concat(r.value, '\n');
						}
						return t;
					}
					(n.AutoexecCategory = l),
						(n.createDosConfig = c),
						(n.toDosboxConf = async function (e) {
							await (async function (e) {
								const t = c();
								for (const n of Object.keys(t)) await d(e[n], t[n]);
							})(e),
								await (async function (e) {
									const t = c();
									for (const n of Object.keys(t)) await u(e[n], t[n]);
								})(e);
							const t =
								f(e.output) +
								'\nfullscreen=false\nfulldouble=false\nfullresolution=original\nwindowresolution=original\noutput=surface\nsensitivity=100\nwaitonerror=true\npriority=higher,normal\nmapperfile=mapper-jsdos.map\nusescancodes=true\nvsync=false\n' +
								f(e.dosbox) +
								'\nlanguage=\ncaptures=capture\nmemsize=16\n' +
								f(e.cpu) +
								'\ncycleup=10\ncycledown=20\n' +
								f(e.mixer) +
								"\nblocksize=1024\nprebuffer=20\n\n[render]\n# frameskip: How many frames DOSBox skips before drawing one.\n#    aspect: Do aspect correction, if your output method doesn't support scaling this can slow things down!.\n#    scaler: Scaler used to enlarge/enhance low resolution modes.\n#              If 'forced' is appended, then the scaler will be used even if the result might not be desired.\n#            Possible values: none, normal2x, normal3x, advmame2x, advmame3x, advinterp2x, advinterp3x, hq2x, hq3x, 2xsai, super2xsai, supereagle, tv2x, tv3x, rgb2x, rgb3x, scan2x, scan3x.\n\nframeskip=0\naspect=false\nscaler=none\n\n[midi]\n#     mpu401: Type of MPU-401 to emulate.\n#             Possible values: intelligent, uart, none.\n# mididevice: Device that will receive the MIDI data from MPU-401.\n#             Possible values: default, win32, alsa, oss, coreaudio, coremidi, none.\n# midiconfig: Special configuration options for the device driver. This is usually the id of the device you want to use.\n#               See the README/Manual for more details.\n\nmpu401=intelligent\nmididevice=default\nmidiconfig=\n\n[sblaster]\n#  sbtype: Type of Soundblaster to emulate. gb is Gameblaster.\n#          Possible values: sb1, sb2, sbpro1, sbpro2, sb16, gb, none.\n#  sbbase: The IO address of the soundblaster.\n#          Possible values: 220, 240, 260, 280, 2a0, 2c0, 2e0, 300.\n#     irq: The IRQ number of the soundblaster.\n#          Possible values: 7, 5, 3, 9, 10, 11, 12.\n#     dma: The DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n#    hdma: The High DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n# sbmixer: Allow the soundblaster mixer to modify the DOSBox mixer.\n# oplmode: Type of OPL emulation. On 'auto' the mode is determined by sblaster type. All OPL modes are Adlib-compatible, except for 'cms'.\n#          Possible values: auto, cms, opl2, dualopl2, opl3, none.\n#  oplemu: Provider for the OPL emulation. compat might provide better quality (see oplrate as well).\n#          Possible values: default, compat, fast.\n# oplrate: Sample rate of OPL music emulation. Use 49716 for highest quality (set the mixer rate accordingly).\n#          Possible values: 44100, 49716, 48000, 32000, 22050, 16000, 11025, 8000.\n\nsbtype=sb16\nsbbase=220\nirq=7\ndma=1\nhdma=5\nsbmixer=true\noplmode=auto\noplemu=default\noplrate=44100\n\n[gus]\n#      gus: Enable the Gravis Ultrasound emulation.\n#  gusrate: Sample rate of Ultrasound emulation.\n#           Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#  gusbase: The IO base address of the Gravis Ultrasound.\n#           Possible values: 240, 220, 260, 280, 2a0, 2c0, 2e0, 300.\n#   gusirq: The IRQ number of the Gravis Ultrasound.\n#           Possible values: 5, 3, 7, 9, 10, 11, 12.\n#   gusdma: The DMA channel of the Gravis Ultrasound.\n#           Possible values: 3, 0, 1, 5, 6, 7.\n# ultradir: Path to Ultrasound directory. In this directory\n#           there should be a MIDI directory that contains\n#           the patch files for GUS playback. Patch sets used\n#           with Timidity should work fine.\n\ngus=false\ngusrate=44100\ngusbase=240\ngusirq=5\ngusdma=3\nultradir=C:\\ULTRASND\n\n[speaker]\n# pcspeaker: Enable PC-Speaker emulation.\n#    pcrate: Sample rate of the PC-Speaker sound generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#     tandy: Enable Tandy Sound System emulation. For 'auto', emulation is present only if machine is set to 'tandy'.\n#            Possible values: auto, on, off.\n# tandyrate: Sample rate of the Tandy 3-Voice generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#    disney: Enable Disney Sound Source emulation. (Covox Voice Master and Speech Thing compatible).\n\npcspeaker=true\npcrate=44100\ntandy=auto\ntandyrate=44100\ndisney=true\n\n[joystick]\n# joysticktype: Type of joystick to emulate: auto (default), none,\n#               2axis (supports two joysticks),\n#               4axis (supports one joystick, first joystick used),\n#               4axis_2 (supports one joystick, second joystick used),\n#               fcs (Thrustmaster), ch (CH Flightstick).\n#               none disables joystick emulation.\n#               auto chooses emulation depending on real joystick(s).\n#               (Remember to reset dosbox's mapperfile if you saved it earlier)\n#               Possible values: auto, 2axis, 4axis, 4axis_2, fcs, ch, none.\n#        timed: enable timed intervals for axis. Experiment with this option, if your joystick drifts (away).\n#     autofire: continuously fires as long as you keep the button pressed.\n#       swap34: swap the 3rd and the 4th axis. can be useful for certain joysticks.\n#   buttonwrap: enable button wrapping at the number of emulated buttons.\n\njoysticktype=auto\ntimed=true\nautofire=false\nswap34=false\nbuttonwrap=false\n\n[serial]\n# serial1: set type of device connected to com port.\n#          Can be disabled, dummy, modem, nullmodem, directserial.\n#          Additional parameters must be in the same line in the form of\n#          parameter:value. Parameter for all types is irq (optional).\n#          for directserial: realport (required), rxdelay (optional).\n#                           (realport:COM1 realport:ttyS0).\n#          for modem: listenport (optional).\n#          for nullmodem: server, rxdelay, txdelay, telnet, usedtr,\n#                         transparent, port, inhsocket (all optional).\n#          Example: serial1=modem listenport:5000\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial2: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial3: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial4: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n\nserial1=dummy\nserial2=dummy\nserial3=disabled\nserial4=disabled\n\n[dos]\n#            xms: Enable XMS support.\n#            ems: Enable EMS support.\n#            umb: Enable UMB support.\n# keyboardlayout: Language code of the keyboard layout (or none).\n\nxms=true\nems=true\numb=true\nkeyboardlayout=auto\n\n[ipx]\n# ipx: Enable ipx over UDP/IP emulation.\n\nipx=true\n" +
								((n = e.autoexec),
								'[autoexec]\necho off\nmount c .\nc:\n\ntype jsdos~1/readme.txt\necho on\n\n'.concat(
									n.options.script.value,
									'\n\n# Generated using https://js-dos.com\n# █▀▀▀▀▀█ █  ▄▄▄▀▀█ █▀▀▀▀▀█\n# █ ███ █ ██▄ █ ▀ ▄ █ ███ █\n# █ ▀▀▀ █ ▄██ ▀ ▀▀█ █ ▀▀▀ █\n# ▀▀▀▀▀▀▀ ▀ █▄▀▄▀ █ ▀▀▀▀▀▀▀\n# █▀▄▄█▀▀▄▄ ▀ ▀█▄▄▄▄ ▀▄█▀█▀\n# █▀ ▀ ▀▀▄ █▀ ▄ ▄▀▀▀▄ █▀█▄\n# ▄ ▄▄ █▀▀▄ ▄▀▄▀▀█  ▀▀▄▀▀█▀\n#   ▄▀▀█▀▀ █▀█▀█▀▀▄ ▀██▀█▄\n# ▀▀▀ ▀ ▀ █▄█ ▀█▄▄█▀▀▀█▀▀\n# █▀▀▀▀▀█ ▄▄▄ ▄ ▄ █ ▀ █▄▄▄▄\n# █ ███ █ ▀█▀▀▄▀▀▄████▀▀█▄█\n# █ ▀▀▀ █ ▄▀▀█▀█▀▄ ▀▀▄▄█▄█\n# ▀▀▀▀▀▀▀ ▀   ▀▀ ▀  ▀   ▀▀▀\n'
								));
							var n;
							return Promise.resolve(t);
						});
				},
				{ 'core-js/modules/web.dom-collections.iterator.js': 137 },
			],
			141: [
				function (e, t, n) {
					'use strict';
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.dosDirect = void 0);
					const r = e('../../../protocol/messages-queue');
					n.dosDirect = async function (e, t) {
						const n = new r.MessagesQueue();
						let o = n.handler.bind(n);
						const i = {
								postMessage: (e, t) => {
									o(e, t);
								},
							},
							s = e => {
								const n = e.data;
								'ws-sync-sleep' === (null == n ? void 0 : n.name) && n.props.sessionId === t && postMessage({ name: 'wc-sync-sleep', props: n.props }, '*');
							},
							a = {
								sessionId: t,
								sendMessageToServer: (e, t) => {
									i.messageHandler({ data: { name: e, props: t } });
								},
								initMessageHandler: e => {
									(o = e), n.sendTo(o);
								},
								exit: () => {
									'undefined' != typeof window && window.removeEventListener('message', s);
								},
							};
						return (a.module = i), 'undefined' != typeof window && window.addEventListener('message', s, { passive: !0 }), await e.instantiate(i), i.callMain([t]), a;
					};
				},
				{ '../../../protocol/messages-queue': 150 },
			],
			142: [
				function (e, t, n) {
					'use strict';
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.dosWorker = void 0);
					const r = e('../../../protocol/messages-queue');
					n.dosWorker = async function (e, t, n) {
						const o = new r.MessagesQueue();
						let i = o.handler.bind(o);
						const s = new Worker(e);
						(s.onerror = e => {
							i('ws-err', { type: e.type, filename: e.filename, message: e.message });
						}),
							(s.onmessage = e => {
								const t = e.data;
								void 0 !== (null == t ? void 0 : t.name) && i(t.name, t.props);
							}),
							await t.instantiate({});
						const a = {
							sessionId: n,
							sendMessageToServer: (e, t) => {
								s.postMessage({ name: e, props: t });
							},
							initMessageHandler: e => {
								(i = e), o.sendTo(i);
							},
							exit: () => {
								s.terminate();
							},
						};
						try {
							a.sendMessageToServer('wc-install', { module: t.wasmModule, sessionId: n });
						} catch (e) {
							a.sendMessageToServer('wc-install', { sessionId: n });
						}
						return a;
					};
				},
				{ '../../../protocol/messages-queue': 150 },
			],
			143: [
				function (e, t, n) {
					(function (t) {
						(function () {
							'use strict';
							Object.defineProperty(n, '__esModule', { value: !0 }), (n.NetworkType = void 0);
							const r = (function (e) {
								return e && e.__esModule ? e : { default: e };
							})(e('./impl/emulators-impl'));
							!(function (e) {
								e[(e.NETWORK_DOSBOX_IPX = 0)] = 'NETWORK_DOSBOX_IPX';
							})(n.NetworkType || (n.NetworkType = {})),
								'undefined' != typeof window && (window.emulators = r.default),
								void 0 !== t && (t.emulators = r.default);
						}).call(this);
					}).call(this, 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {});
				},
				{ './impl/emulators-impl': 146 },
			],
			144: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.httpRequest = void 0),
						(n.httpRequest = function (e, t) {
							return new Promise((n, r) => {
								new o(e, {
									...t,
									success: n,
									fail: e => {
										r(new Error(e));
									},
								});
							});
						});
					class o {
						constructor(e, t) {
							if (
								(r(this, 'resource', void 0),
								r(this, 'options', void 0),
								r(this, 'xhr', null),
								r(this, 'total', 0),
								r(this, 'loaded', 0),
								(this.resource = e),
								(this.options = t),
								(this.options.method = t.method || 'GET'),
								'GET' !== this.options.method)
							)
								throw new Error('Method ' + this.options.method + ' is not supported');
							this.makeHttpRequest();
						}
						makeHttpRequest() {
							let e, t;
							(this.xhr = new XMLHttpRequest()),
								this.xhr.open(this.options.method || 'GET', this.resource, !0),
								'POST' === this.options.method && this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
								this.xhr.overrideMimeType('text/plain; charset=x-user-defined'),
								'function' == typeof (e = this.xhr).addEventListener &&
									e.addEventListener('progress', e => {
										if (((this.total = e.total), (this.loaded = e.loaded), this.options.progress)) return this.options.progress(e.total, e.loaded);
									}),
								'function' == typeof (t = this.xhr).addEventListener &&
									t.addEventListener('error', () => {
										if (this.options.fail)
											return this.options.fail("Unalbe to download '" + this.resource + "', code: " + this.xhr.status), delete this.options.fail;
									}),
								(this.xhr.onreadystatechange = () => this.onReadyStateChange()),
								this.options.responseType && (this.xhr.responseType = this.options.responseType),
								this.xhr.send(this.options.data);
						}
						onReadyStateChange() {
							const e = this.xhr;
							if (4 === e.readyState)
								if (200 === e.status) {
									if (this.options.success) {
										const t = Math.max(this.total, this.loaded);
										return void 0 !== this.options.progress && this.options.progress(t, t), this.options.success(e.response);
									}
								} else if (this.options.fail) return this.options.fail("Unable to download '" + this.resource + "', code: " + e.status), delete this.options.fail;
						}
					}
				},
				{},
			],
			145: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					e('core-js/modules/web.dom-collections.iterator.js'),
						Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.CommandInterfaceEventsImpl = void 0),
						(n.CommandInterfaceEventsImpl = class {
							constructor() {
								var e = this;
								r(this, 'onStdoutConsumers', []),
									r(this, 'delayedStdout', []),
									r(this, 'onFrameSizeConsumers', []),
									r(this, 'onFrameConsumers', []),
									r(this, 'onSoundPushConsumers', []),
									r(this, 'onExitConsumers', []),
									r(this, 'onMessageConsumers', []),
									r(this, 'delayedMessages', []),
									r(this, 'onNetworkConnectedConsumers', []),
									r(this, 'onNetworkDisconnectedConsumers', []),
									r(this, 'onStdout', e => {
										if ((this.onStdoutConsumers.push(e), 1 === this.onStdoutConsumers.length)) {
											for (const e of this.delayedStdout) this.fireStdout(e);
											this.delayedStdout = [];
										}
									}),
									r(this, 'onFrameSize', e => {
										this.onFrameSizeConsumers.push(e);
									}),
									r(this, 'onFrame', e => {
										this.onFrameConsumers.push(e);
									}),
									r(this, 'onSoundPush', e => {
										this.onSoundPushConsumers.push(e);
									}),
									r(this, 'onExit', e => {
										this.onExitConsumers.push(e);
									}),
									r(this, 'onMessage', e => {
										if ((this.onMessageConsumers.push(e), 1 === this.onMessageConsumers.length)) {
											for (const t of this.delayedMessages) e(t.msgType, ...t.args);
											this.delayedMessages = [];
										}
									}),
									r(this, 'fireStdout', e => {
										if (0 !== this.onStdoutConsumers.length) for (const t of this.onStdoutConsumers) t(e);
										else this.delayedStdout.push(e);
									}),
									r(this, 'fireFrameSize', (e, t) => {
										for (const n of this.onFrameSizeConsumers) n(e, t);
									}),
									r(this, 'fireFrame', (e, t) => {
										for (const n of this.onFrameConsumers) n(e, t);
									}),
									r(this, 'fireSoundPush', e => {
										for (const t of this.onSoundPushConsumers) t(e);
									}),
									r(this, 'fireExit', () => {
										for (const e of this.onExitConsumers) e();
										(this.onStdoutConsumers = []),
											(this.onFrameSizeConsumers = []),
											(this.onFrameConsumers = []),
											(this.onSoundPushConsumers = []),
											(this.onExitConsumers = []),
											(this.onMessageConsumers = []);
									}),
									r(this, 'fireMessage', function (t) {
										for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
										if (0 !== e.onMessageConsumers.length) for (const n of e.onMessageConsumers) n(t, ...r);
										else e.delayedMessages.push({ msgType: t, args: r });
									}),
									r(this, 'fireNetworkConnected', (e, t, n) => {
										for (const r of this.onNetworkConnectedConsumers) r(e, t, n);
									}),
									r(this, 'fireNetworkDisconnected', e => {
										for (const t of this.onNetworkDisconnectedConsumers) t(e);
									});
							}
							onNetworkConnected(e) {
								this.onNetworkConnectedConsumers.push(e);
							}
							onNetworkDisconnected(e) {
								this.onNetworkDisconnectedConsumers.push(e);
							}
						});
				},
				{ 'core-js/modules/web.dom-collections.iterator.js': 137 },
			],
			146: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					var o = function (e) {
						return e && e.__esModule ? e : { default: e };
					};
					Object.defineProperty(n, '__esModule', { value: !0 });
					const i = e('../build'),
						s = e('./modules'),
						a = o(e('../dos/bundle/dos-bundle')),
						l = e('../dos/dosbox/ts/direct'),
						c = e('../dos/dosbox/ts/worker'),
						u = o(e('../janus/janus-impl')),
						d = e('../protocol/protocol'),
						f = new (class {
							constructor() {
								r(this, 'pathPrefix', ''), r(this, 'version', i.Build.version), r(this, 'wdosboxJs', 'wdosbox.js'), r(this, 'wasmModulesPromise', void 0);
							}
							async dosBundle() {
								const e = await this.wasmModules(),
									t = await e.libzip();
								return new a.default(t);
							}
							async dosboxNode(e, t) {
								return this.dosboxDirect(e, t);
							}
							async dosboxDirect(e, t) {
								const n = await this.wasmModules(),
									r = await n.dosbox(),
									o = await (0, l.dosDirect)(r, 'session-' + Date.now());
								return this.backend(e, o, t);
							}
							async dosboxWorker(e, t) {
								const n = await this.wasmModules(),
									r = await n.dosbox(),
									o = await (0, c.dosWorker)(this.pathPrefix + this.wdosboxJs, r, 'session-' + Date.now());
								return this.backend(e, o, t);
							}
							async janus(e) {
								return (0, u.default)(e);
							}
							async backend(e, t, n) {
								return new Promise((r, o) => {
									const i = new d.CommandInterfaceOverTransportLayer(
										Array.isArray(e) ? e : [e],
										t,
										e => {
											null !== e ? o(e) : setTimeout(() => r(i), 4);
										},
										n || {}
									);
								});
							}
							wasmModules() {
								return (
									void 0 !== this.wasmModulesPromise || (this.wasmModulesPromise = (async () => new s.WasmModulesImpl(this.pathPrefix, this.wdosboxJs))()),
									this.wasmModulesPromise
								);
							}
							async dosDirect(e) {
								return this.dosboxDirect(e);
							}
							async dosWorker(e) {
								return this.dosboxWorker(e);
							}
						})();
					n.default = f;
				},
				{
					'../build': 138,
					'../dos/bundle/dos-bundle': 139,
					'../dos/dosbox/ts/direct': 141,
					'../dos/dosbox/ts/worker': 142,
					'../janus/janus-impl': 148,
					'../protocol/protocol': 151,
					'./modules': 147,
				},
			],
			147: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					e('core-js/modules/es.typed-array.of.js'),
						e('core-js/modules/es.typed-array.uint8-array.js'),
						e('core-js/modules/es.typed-array.set.js'),
						e('core-js/modules/es.typed-array.sort.js'),
						e('core-js/modules/web.dom-collections.iterator.js'),
						Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.loadWasmModule = n.WasmModulesImpl = n.host = void 0);
					const o = e('../http');
					function i(t, r, i) {
						return 'undefined' == typeof XMLHttpRequest
							? (function (t, r, o) {
									if (void 0 !== n.host.globals.compiled[r]) return n.host.globals.compiled[r];
									const i = e(t),
										a = Promise.resolve(new s(i));
									return r && (n.host.globals.compiled[r] = a), a;
								})(t, r)
							: (function (e, t, r) {
									if (void 0 !== n.host.globals.compiled[t]) return n.host.globals.compiled[t];
									const i = (async function () {
										const i = e.lastIndexOf('/'),
											s = e.indexOf('w', i),
											l = s === i + 1 && s >= 0;
										if (!n.host.wasmSupported || !l) throw new Error('Starting from js-dos 6.22.60 js environment is not supported');
										const c = e.substr(0, e.lastIndexOf('.js')) + '.wasm',
											u = (0, o.httpRequest)(c, {
												responseType: 'arraybuffer',
												progress: (t, n) => {
													r('Resolving DosBox (' + e + ')', t, n);
												},
											}),
											d = (0, o.httpRequest)(e, {
												progress: (e, t) => {
													r('Resolving DosBox', e, t);
												},
											}),
											[f, p] = await Promise.all([u, d]),
											h = await WebAssembly.compile(f);
										return (
											eval.call(window, p),
											new a(h, n.host.globals.exports[t], (e, t) => {
												(e.env = e.env || {}), WebAssembly.instantiate(h, e).then(e => t(e, h));
											})
										);
									})();
									return t && (n.host.globals.compiled[t] = i), i;
								})(t, r, i);
					}
					(n.host = new (class {
						constructor() {
							if (
								(r(this, 'wasmSupported', !1),
								r(this, 'globals', void 0),
								(this.globals = 'undefined' == typeof window ? {} : window),
								this.globals.exports || (this.globals.exports = {}),
								this.globals.compiled || (this.globals.compiled = {}),
								'object' == typeof WebAssembly && 'function' == typeof WebAssembly.instantiate && 'function' == typeof WebAssembly.compile)
							) {
								const e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
								e instanceof WebAssembly.Module && (this.wasmSupported = new WebAssembly.Instance(e) instanceof WebAssembly.Instance);
							}
							(Math.imul && -5 === Math.imul(4294967295, 5)) ||
								(Math.imul = function (e, t) {
									const n = 65535 & e,
										r = 65535 & t;
									return (n * r + (((e >>> 16) * r + n * (t >>> 16)) << 16)) | 0;
								}),
								(Math.imul = Math.imul),
								Math.fround ||
									(Math.fround = function (e) {
										return e;
									}),
								(Math.fround = Math.fround),
								Math.clz32 ||
									(Math.clz32 = function (e) {
										e >>>= 0;
										for (let t = 0; t < 32; t++) if (e & (1 << (31 - t))) return t;
										return 32;
									}),
								(Math.clz32 = Math.clz32),
								Math.trunc ||
									(Math.trunc = function (e) {
										return e < 0 ? Math.ceil(e) : Math.floor(e);
									}),
								(Math.trunc = Math.trunc);
						}
					})()),
						(n.WasmModulesImpl = class {
							constructor(e, t) {
								r(this, 'pathPrefix', void 0),
									r(this, 'wdosboxJs', void 0),
									r(this, 'libzipPromise', void 0),
									r(this, 'dosboxPromise', void 0),
									r(this, 'wasmSupported', !1),
									e.length > 0 && '/' !== e[e.length - 1] && (e += '/'),
									(this.pathPrefix = e),
									(this.wdosboxJs = t);
							}
							libzip() {
								return void 0 !== this.libzipPromise || (this.libzipPromise = this.loadModule(this.pathPrefix + 'wlibzip.js', 'WLIBZIP')), this.libzipPromise;
							}
							dosbox() {
								return void 0 !== this.dosboxPromise || (this.dosboxPromise = this.loadModule(this.pathPrefix + this.wdosboxJs, 'WDOSBOX')), this.dosboxPromise;
							}
							loadModule(e, t) {
								return i(e, t, () => {});
							}
						}),
						(n.loadWasmModule = i);
					class s {
						constructor(e) {
							r(this, 'emModule', void 0), (this.emModule = e);
						}
						instantiate(e) {
							return new Promise(t => {
								(e.onRuntimeInitialized = () => {
									t();
								}),
									new this.emModule(e);
							});
						}
					}
					class a {
						constructor(e, t, n) {
							r(this, 'wasmModule', void 0),
								r(this, 'module', void 0),
								r(this, 'instantiateWasm', void 0),
								(this.wasmModule = e),
								(this.module = t),
								(this.instantiateWasm = n);
						}
						instantiate(e) {
							return new Promise(t => {
								(e.instantiateWasm = this.instantiateWasm),
									(e.onRuntimeInitialized = () => {
										t();
									}),
									new this.module(e);
							});
						}
					}
				},
				{
					'../http': 144,
					'core-js/modules/es.typed-array.of.js': 132,
					'core-js/modules/es.typed-array.set.js': 133,
					'core-js/modules/es.typed-array.sort.js': 134,
					'core-js/modules/es.typed-array.uint8-array.js': 135,
					'core-js/modules/web.dom-collections.iterator.js': 137,
				},
			],
			148: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					e('core-js/modules/web.dom-collections.iterator.js'),
						e('core-js/modules/es.typed-array.uint8-array.js'),
						e('core-js/modules/es.typed-array.set.js'),
						e('core-js/modules/es.typed-array.sort.js'),
						Object.defineProperty(n, '__esModule', { value: !0 });
					const o = e('../impl/ci-impl');
					function i(e, t) {
						let n = '';
						const r = o => {
							const i = o.indexOf('\n');
							if (-1 === i) n += o;
							else {
								const s = n + o.substr(0, i);
								n = '';
								try {
									e(
										(function (e) {
											const t = atob(e),
												n = new Uint8Array(t.length);
											for (let e = 0; e < n.length; e++) n[e] = t.charCodeAt(e);
											return new TextDecoder().decode(n);
										})(s)
									);
								} catch (e) {
									t(e);
								}
								r(o.substr(i + 1));
							}
						};
						return r;
					}
					class s {
						constructor(e, t) {
							r(this, 'live', !0),
								r(this, 'startedAt', Date.now()),
								r(this, 'janus', void 0),
								r(this, 'eventsImpl', void 0),
								r(this, 'exitPromise', void 0),
								r(this, 'exitResolveFn', () => {}),
								r(this, 'configPromise', void 0),
								r(this, 'configResolveFn', () => {}),
								r(this, 'opaqueId', void 0),
								r(this, 'handle', void 0),
								r(this, 'handlePromise', void 0),
								r(this, 'handleResolveFn', () => {}),
								r(this, 'keyMatrix', {}),
								r(this, 'frameWidth', 0),
								r(this, 'frameHeight', 0),
								r(this, 'eventQueue', ''),
								r(this, 'eventIntervalId', -1),
								r(this, 'rttIntervalId', -1),
								r(this, 'logIntervalId', -1),
								r(this, 'logColor', 'not set'),
								r(this, 'logWhiteMs', 0),
								r(this, 'logRedMs', 0),
								r(this, 'logYellowMs', 0),
								r(this, 'onDataMessage', e => {
									if (e.startsWith('config=')) this.configResolveFn(JSON.parse(e.substr('config='.length)));
									else if (e.startsWith('frame=')) {
										const [t, n] = e.substr('frame='.length).split('x');
										(this.frameWidth = Number.parseInt(t, 10) || 0), (this.frameHeight = Number.parseInt(n, 10) || 0);
									} else if (e.startsWith('rtt=')) {
										var t;
										const [n, r, o] = e.substr('rtt='.length).split(' '),
											i = Number.parseInt(r, 10),
											s = Number.parseInt(o, 10),
											a = Date.now(),
											l = (null === (t = this.handle) || void 0 === t ? void 0 : t.getBitrate()) || '0 kbits/sec',
											c = Number.parseInt(l.split(' ')[0], 10);
										this.sendPipeMessage('rtt-data', Date.now(), i, s, a, c),
											n === this.opaqueId && this.eventsImpl.fireStdout('rtt-data=' + (a - i) + ' ' + c);
									} else if (e.startsWith('log-visual-'))
										switch (e) {
											case 'log-visual-white':
												this.eventsImpl.fireStdout('yellow-frame:' + (Date.now() - this.logYellowMs));
												break;
											case 'log-visual-red':
												this.eventsImpl.fireStdout('white-frame:' + (Date.now() - this.logWhiteMs));
												break;
											case 'log-visual-yellow':
												this.eventsImpl.fireStdout('red-frame:' + (Date.now() - this.logRedMs));
										}
									else if (e.startsWith('log-command-'))
										switch (e) {
											case 'log-command-white':
												this.eventsImpl.fireStdout('yellow-pipe:' + (Date.now() - this.logYellowMs));
												break;
											case 'log-command-red':
												this.eventsImpl.fireStdout('white-pipe:' + (Date.now() - this.logWhiteMs));
												break;
											case 'log-command-yellow':
												this.eventsImpl.fireStdout('red-pipe:' + (Date.now() - this.logRedMs));
										}
									else this.eventsImpl.fireStdout(e);
								}),
								r(this, 'onJanusMessage', (e, t, n) => {
									null != n &&
										e.createAnswer({
											jsep: n,
											media: { audioSend: !1, videoSend: !1, data: !0 },
											success: t => {
												this.fireMessage('started'), e.send({ message: { request: 'start' }, jsep: t });
											},
											error: this.onError,
										});
								}),
								r(this, 'onError', e => {
									this.fireMessage('error', e);
								}),
								(this.eventsImpl = new o.CommandInterfaceEventsImpl()),
								(this.janus = e),
								(this.opaqueId = t),
								(this.exitPromise = new Promise(e => {
									this.exitResolveFn = e;
								})),
								(this.configPromise = new Promise(e => {
									this.configResolveFn = e;
								})),
								(this.handlePromise = new Promise((e, t) => {
									this.handleResolveFn = n => {
										(this.handle = n),
											this.live
												? (setTimeout(() => {
														this.live && n.data({ text: 'pipe ' + this.opaqueId + ' config' });
													}, 1e3),
													this.config().then(() => {
														this.live &&
															((this.eventIntervalId = setInterval(() => {
																this.sendEventsData(n);
															}, 8)),
															(this.rttIntervalId = setInterval(() => {
																this.sendPipeMessage('rtt', Date.now());
															}, 1e3)));
													}),
													e(n))
												: t(new Error('exit() was called'));
									};
								})),
								this.attach();
						}
						fireMessage(e) {
							for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
							this.eventsImpl.fireMessage(e, ...n);
						}
						attach() {
							let e;
							this.janus.attach({
								plugin: 'janus.plugin.streaming',
								opaqueId: this.opaqueId,
								error: this.onError,
								success: t => {
									(e = t), this.fireMessage('attached'), t.send({ message: { request: 'watch', id: 1 } });
								},
								onmessage: (t, n) => {
									this.onJanusMessage(e, t, n);
								},
								onremotestream: e => {
									this.fireMessage('onremotestream', e);
								},
								ondataopen: () => this.handleResolveFn(e),
								ondata: i(this.onDataMessage, this.onError),
							});
						}
						onDestroyed() {
							this.fireMessage('destroyed'), this.exitResolveFn();
						}
						async config() {
							return this.configPromise;
						}
						width() {
							return this.frameWidth;
						}
						height() {
							return this.frameHeight;
						}
						soundFrequency() {
							return 44100;
						}
						screenshot() {
							return Promise.reject(new Error('Not supported'));
						}
						simulateKeyPress() {
							const e = Date.now() - this.startedAt;
							for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
							n.forEach(t => this.addKey(t, !0, e)), n.forEach(t => this.addKey(t, !1, e + 16));
						}
						sendKeyEvent(e, t) {
							this.addKey(e, t, Date.now() - this.startedAt);
						}
						addKey(e, t, n) {
							if (
								(!0 === this.keyMatrix[e]) !== t &&
								((this.keyMatrix[e] = t), this.sendPipeMessage('k' + (t ? 'down' : 'up'), e, n), -1 !== this.logIntervalId && t)
							)
								switch (this.logColor) {
									case 'white':
										this.logWhiteMs = Date.now();
										break;
									case 'red':
										this.logRedMs = Date.now();
										break;
									case 'yellow':
										this.logYellowMs = Date.now();
								}
						}
						sendMouseMotion(e, t) {
							this.sendPipeMessage('mmove', e, t, Date.now() - this.startedAt);
						}
						sendMouseRelativeMotion(e, t) {
							throw new Error('not implemented');
						}
						sendMouseButton(e, t) {
							this.sendPipeMessage('m' + (t ? 'down' : 'up'), e, Date.now() - this.startedAt);
						}
						sendMouseSync() {
							this.sendPipeMessage('msync', Date.now() - this.startedAt);
						}
						logVisual(e) {
							this.sendPipeMessage('log-visual-on');
							const t = document.createElement('canvas'),
								n = t.getContext('2d');
							(t.width = 1),
								(t.height = 1),
								(this.logIntervalId = setInterval(async () => {
									var t;
									const r = Date.now();
									null == n || n.drawImage(e, 0, 0, 1, 1, 0, 0, 1, 1);
									const o = null == n || null === (t = n.getImageData(0, 0, 1, 1)) || void 0 === t ? void 0 : t.data,
										i = Date.now() - r;
									let s = 'not set';
									if (
										(o[0] > 200 && o[1] > 200 && o[2] > 200
											? (s = 'white')
											: o[0] > 200 && o[1] < 200 && o[2] < 200
												? (s = 'red')
												: o[0] > 200 && o[1] > 200 && o[2] < 200 && (s = 'yellow'),
										s !== this.logColor)
									) {
										switch (s) {
											case 'white':
												this.eventsImpl.fireStdout('yellow-stream:' + (Date.now() - this.logYellowMs - i));
												break;
											case 'red':
												this.eventsImpl.fireStdout('white-stream:' + (Date.now() - this.logWhiteMs - i));
												break;
											case 'yellow':
												this.eventsImpl.fireStdout('red-stream:' + (Date.now() - this.logRedMs - i));
										}
										this.logColor = s;
									}
								}, 16));
						}
						sendPipeMessage() {
							this.eventQueue += 'pipe ' + this.opaqueId;
							for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
							for (const e of t) this.eventQueue += ' ' + e;
							this.eventQueue += '\n';
						}
						async sendEventsData(e) {
							0 !== this.eventQueue.length && (e.data({ text: this.eventQueue }), (this.eventQueue = ''));
						}
						persist() {
							return Promise.reject(new Error('Not supported'));
						}
						pause() {
							console.warn('pause/resume is not implemented');
						}
						resume() {}
						mute() {
							console.warn('mute/unmute is not implemented');
						}
						unmute() {}
						exit() {
							return (
								(this.live = !1),
								clearInterval(this.logIntervalId),
								(this.logIntervalId = -1),
								clearInterval(this.eventIntervalId),
								(this.eventIntervalId = -1),
								clearInterval(this.rttIntervalId),
								(this.rttIntervalId = -1),
								this.janus.destroy(),
								this.exitPromise
							);
						}
						events() {
							return this.eventsImpl;
						}
						networkConnect(e, t, n) {
							return Promise.reject('Not supported');
						}
						networkDisconnect(e) {
							return Promise.reject('Not supported');
						}
					}
					n.default = function (e, t) {
						const n = t || window.Janus;
						return void 0 === n
							? Promise.reject(new Error('Janus is not defined, you should load janus.js before this'))
							: n.isWebrtcSupported()
								? new Promise((t, r) => {
										let o = null;
										const i = {
												error: e => {
													null === o ? r(e) : o.onError(e);
												},
												destroyed: () => {
													null !== o && o.onDestroyed();
												},
											},
											a = {
												server: e,
												success: () => {
													(o = new s(l, 'js-dos-' + n.randomString(12))), t(o);
												},
												error: i.error,
												destroyed: i.destroyed,
												destroyOnUnload: !0,
											},
											l = new n(a);
									})
								: Promise.reject(new Error('WebRTC not supported'));
					};
				},
				{
					'../impl/ci-impl': 145,
					'core-js/modules/es.typed-array.set.js': 133,
					'core-js/modules/es.typed-array.sort.js': 134,
					'core-js/modules/es.typed-array.uint8-array.js': 135,
					'core-js/modules/web.dom-collections.iterator.js': 137,
				},
			],
			149: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					e('core-js/modules/es.typed-array.uint8-array.js'),
						e('core-js/modules/es.typed-array.set.js'),
						e('core-js/modules/es.typed-array.sort.js'),
						e('core-js/modules/es.string.replace.js'),
						Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.default = class {
							constructor(e, t) {
								r(this, 'module', void 0), r(this, 'home', void 0), (this.module = e), (this.home = t), this.module.callMain([]), this.chdirToHome();
							}
							zipFromFs() {
								let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
								this.chdirToHome();
								const t = this.module._zip_from_fs(e);
								if (0 === t) return Promise.reject(new Error("Can't create zip, see more info in logs"));
								const n = this.module.HEAPU32[t / 4],
									r = this.module.HEAPU8.slice(t + 4, t + 4 + n);
								return this.module._free(t), Promise.resolve(r);
							}
							zipToFs(e) {
								let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '/';
								t = this.normalizeFilename(t);
								const n = this.normalizeFilename(t).split('/');
								this.createPath(n, 0, n.length), this.chdir(t);
								const r = new Uint8Array(e),
									o = this.module._malloc(r.length);
								this.module.HEAPU8.set(r, o);
								const i = this.module._zip_to_fs(o, r.length);
								return (
									this.module._free(o),
									this.chdirToHome(),
									0 === i ? Promise.resolve() : Promise.reject(new Error("Can't extract zip, retcode " + i + ', see more info in logs'))
								);
							}
							writeFile(e, t) {
								(e = this.normalizeFilename(e)), t instanceof ArrayBuffer && (t = new Uint8Array(t));
								const n = e.split('/');
								if (0 === n.length) throw new Error("Can't create file '" + e + "', because it's not valid file path");
								const r = n[n.length - 1].trim();
								if (0 === r.length) throw new Error("Can't create file '" + e + "', because file name is empty");
								const o = this.createPath(n, 0, n.length - 1);
								this.module.FS.writeFile(o + '/' + r, t);
							}
							async readFile(e) {
								let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'utf8';
								return (e = this.normalizeFilename(e)), this.module.FS.readFile(e, { encoding: t });
							}
							exists(e) {
								e = this.normalizeFilename(e);
								try {
									return this.module.FS.lookupPath(e), !0;
								} catch (e) {
									return !1;
								}
							}
							destroy() {
								try {
									this.module._libzip_destroy();
								} catch (e) {
									return e;
								}
							}
							normalizeFilename(e) {
								for (e = e.replace(new RegExp('^[a-zA-z]+:'), '').replace(new RegExp('\\\\', 'g'), '/'); '/' === e[0]; ) e = e.substr(1);
								return e;
							}
							createPath(e, t, n) {
								let r = '.';
								for (let o = t; o < n; ++o) {
									const t = e[o].trim();
									0 !== t.length && (this.module.FS.createPath(r, t, !0, !0), (r = r + '/' + t));
								}
								return r;
							}
							chdirToHome() {
								this.module.FS.chdir(this.home);
							}
							chdir(e) {
								this.module.FS.chdir(this.home + '/' + e);
							}
						});
				},
				{
					'core-js/modules/es.string.replace.js': 130,
					'core-js/modules/es.typed-array.set.js': 133,
					'core-js/modules/es.typed-array.sort.js': 134,
					'core-js/modules/es.typed-array.uint8-array.js': 135,
				},
			],
			150: [
				function (e, t, n) {
					'use strict';
					e('core-js/modules/web.dom-collections.iterator.js'),
						Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.MessagesQueue = void 0),
						(n.MessagesQueue = class {
							constructor() {
								var e, t;
								(t = []), (e = 'messages') in this ? Object.defineProperty(this, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : (this[e] = t);
							}
							handler(e, t) {
								this.messages.push({ name: e, props: t });
							}
							sendTo(e) {
								for (const t of this.messages) e(t.name, t.props);
								this.messages = [];
							}
						});
				},
				{ 'core-js/modules/web.dom-collections.iterator.js': 137 },
			],
			151: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					e('core-js/modules/es.typed-array.uint8-array.js'),
						e('core-js/modules/es.typed-array.set.js'),
						e('core-js/modules/es.typed-array.sort.js'),
						e('core-js/modules/web.dom-collections.iterator.js'),
						e('core-js/modules/es.typed-array.float32-array.js'),
						e('core-js/modules/es.typed-array.uint8-clamped-array.js'),
						Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.CommandInterfaceOverTransportLayer = void 0);
					const o = e('../impl/ci-impl');
					n.CommandInterfaceOverTransportLayer = class {
						constructor(e, t, n, i) {
							r(this, 'startedAt', Date.now()),
								r(this, 'frameWidth', 0),
								r(this, 'frameHeight', 0),
								r(this, 'rgb', null),
								r(this, 'rgba', null),
								r(this, 'freq', 0),
								r(this, 'bundles', void 0),
								r(this, 'transport', void 0),
								r(this, 'ready', void 0),
								r(this, 'persistPromise', void 0),
								r(this, 'persistResolve', void 0),
								r(this, 'exitPromise', void 0),
								r(this, 'exitResolve', void 0),
								r(this, 'eventsImpl', new o.CommandInterfaceEventsImpl()),
								r(this, 'keyMatrix', {}),
								r(this, 'configPromise', void 0),
								r(this, 'configResolve', () => {}),
								r(this, 'panicMessages', []),
								r(this, 'connectPromise', null),
								r(this, 'connectResolve', () => {}),
								r(this, 'connectReject', () => {}),
								r(this, 'disconnectPromise', null),
								r(this, 'disconnectResolve', () => {}),
								r(this, 'sharedMemory', void 0),
								r(this, 'directSound', void 0),
								r(this, 'options', void 0),
								(this.options = i),
								(this.bundles = e),
								(this.transport = t),
								(this.ready = n),
								(this.configPromise = new Promise(e => (this.configResolve = e))),
								this.transport.initMessageHandler(this.onServerMessage.bind(this));
						}
						sendClientMessage(e, t) {
							((t = t || {}).sessionId = t.sessionId || this.transport.sessionId), this.transport.sendMessageToServer(e, t);
						}
						onServerMessage(e, t) {
							if (!(void 0 === e || e.length < 3 || 'w' !== e[0] || 's' !== e[1] || '-' !== e[2]) && void 0 !== t && t.sessionId === this.transport.sessionId)
								switch (e) {
									case 'ws-ready':
										(this.sharedMemory = t.sharedMemory), this.sendClientMessage('wc-run', { bundles: this.bundles }), delete this.bundles;
										break;
									case 'ws-server-ready':
										this.panicMessages.length > 0
											? (void 0 !== this.transport.exit && this.transport.exit(), this.ready(new Error(JSON.stringify(this.panicMessages))))
											: this.ready(null),
											delete this.ready;
										break;
									case 'ws-frame-set-size':
										this.onFrameSize(t.width, t.height);
										break;
									case 'ws-update-lines':
										this.onFrameLines(t.lines, t.rgba);
										break;
									case 'ws-exit':
										this.onExit();
										break;
									case 'ws-log':
										this.onLog(t.tag, t.message);
										break;
									case 'ws-warn':
										this.onWarn(t.tag, t.message);
										break;
									case 'ws-err':
										this.onErr(t.tag, t.message);
										break;
									case 'ws-stdout':
										this.onStdout(t.message);
										break;
									case 'ws-persist':
										this.onPersist(t.bundle);
										break;
									case 'ws-sound-init':
										this.onSoundInit(t.freq, t.directSound);
										break;
									case 'ws-sound-push':
										this.onSoundPush(t.samples);
										break;
									case 'ws-config':
										this.onConfig(JSON.parse(t.content));
										break;
									case 'ws-sync-sleep':
										this.sendClientMessage('wc-sync-sleep', t);
										break;
									case 'ws-connected':
										this.connectResolve(),
											(this.connectPromise = null),
											(this.connectResolve = () => {}),
											(this.connectReject = () => {}),
											this.eventsImpl.fireNetworkConnected(t.networkType, t.address, t.port);
										break;
									case 'ws-disconnected':
										null !== this.connectPromise
											? (this.connectReject(), (this.connectPromise = null), (this.connectResolve = () => {}), (this.connectReject = () => {}))
											: (this.disconnectResolve(), (this.disconnectPromise = null), (this.disconnectResolve = () => {})),
											this.eventsImpl.fireNetworkDisconnected(t.networkType);
										break;
									case 'ws-extract-progress':
										this.options.onExtractProgress && this.options.onExtractProgress(t.index, t.file, t.extracted, t.count);
										break;
									default:
										console.log('Unknown server message (ws):', e);
								}
						}
						onConfig(e) {
							this.configResolve(e);
						}
						onFrameSize(e, t) {
							(this.frameWidth === e && this.frameHeight === t) ||
								((this.frameWidth = e),
								(this.frameHeight = t),
								void 0 === this.sharedMemory && (this.rgb = new Uint8Array(e * t * 3)),
								this.eventsImpl.fireFrameSize(e, t));
						}
						onFrameLines(e, t) {
							if (void 0 !== this.sharedMemory) this.rgba = new Uint8Array(this.sharedMemory, t, this.frameWidth * this.frameHeight * 4);
							else for (const t of e) this.rgb.set(t.heapu8, t.start * this.frameWidth * 3);
							this.eventsImpl.fireFrame(this.rgb, this.rgba);
						}
						onSoundInit(e, t) {
							if (((this.freq = e), (this.directSound = t), void 0 !== this.directSound))
								for (let e = 0; e < this.directSound.ringSize; ++e) this.directSound.buffer[e] = new Float32Array(this.directSound.buffer[e]);
						}
						onSoundPush(e) {
							this.eventsImpl.fireSoundPush(e);
						}
						onLog(e, t) {
							this.eventsImpl.fireMessage('log', '[' + e + ']' + t);
						}
						onWarn(e, t) {
							this.eventsImpl.fireMessage('warn', '[' + e + ']' + t);
						}
						onErr(e, t) {
							'panic' === e && (this.panicMessages.push(t), console.error('[' + e + ']' + t)), this.eventsImpl.fireMessage('error', '[' + e + ']' + t);
						}
						onStdout(e) {
							this.eventsImpl.fireStdout(e);
						}
						config() {
							return this.configPromise;
						}
						width() {
							return this.frameWidth;
						}
						height() {
							return this.frameHeight;
						}
						soundFrequency() {
							return this.freq;
						}
						screenshot() {
							if (null !== this.rgb || null !== this.rgba) {
								const e = new Uint8ClampedArray(this.frameWidth * this.frameHeight * 4),
									t = null !== this.rgb ? this.rgb : this.rgba;
								let n = 0,
									r = 0;
								for (; r < e.length; ) (e[r++] = t[n++]), (e[r++] = t[n++]), (e[r++] = t[n++]), (e[r++] = 255), t.length === e.length && n++;
								return Promise.resolve(new ImageData(e, this.frameWidth, this.frameHeight));
							}
							return Promise.reject(new Error('No frame received'));
						}
						simulateKeyPress() {
							const e = Date.now() - this.startedAt;
							for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
							n.forEach(t => this.addKey(t, !0, e)), n.forEach(t => this.addKey(t, !1, e + 16));
						}
						sendKeyEvent(e, t) {
							this.addKey(e, t, Date.now() - this.startedAt);
						}
						addKey(e, t, n) {
							(!0 === this.keyMatrix[e]) !== t && ((this.keyMatrix[e] = t), this.sendClientMessage('wc-add-key', { key: e, pressed: t, timeMs: n }));
						}
						sendMouseMotion(e, t) {
							this.sendClientMessage('wc-mouse-move', { x: e, y: t, relative: !1, timeMs: Date.now() - this.startedAt });
						}
						sendMouseRelativeMotion(e, t) {
							this.sendClientMessage('wc-mouse-move', { x: e, y: t, relative: !0, timeMs: Date.now() - this.startedAt });
						}
						sendMouseButton(e, t) {
							this.sendClientMessage('wc-mouse-button', { button: e, pressed: t, timeMs: Date.now() - this.startedAt });
						}
						sendMouseSync() {
							this.sendClientMessage('wc-mouse-sync', { timeMs: Date.now() - this.startedAt });
						}
						persist() {
							if (void 0 !== this.persistPromise) return this.persistPromise;
							const e = new Promise(e => (this.persistResolve = e));
							return (this.persistPromise = e), this.sendClientMessage('wc-pack-fs-to-bundle'), e;
						}
						onPersist(e) {
							this.persistResolve && (this.persistResolve(e), delete this.persistPromise, delete this.persistResolve);
						}
						pause() {
							this.sendClientMessage('wc-pause');
						}
						resume() {
							this.sendClientMessage('wc-resume');
						}
						mute() {
							this.sendClientMessage('wc-mute');
						}
						unmute() {
							this.sendClientMessage('wc-unmute');
						}
						exit() {
							return (
								void 0 !== this.exitPromise ||
									((this.exitPromise = new Promise(e => (this.exitResolve = e))),
									this.exitPromise.then(() => {
										this.events().fireExit();
									}),
									this.resume(),
									this.sendClientMessage('wc-exit')),
								this.exitPromise
							);
						}
						onExit() {
							void 0 !== this.transport.exit && this.transport.exit(), this.exitResolve && (this.exitResolve(), delete this.exitPromise, delete this.exitResolve);
						}
						events() {
							return this.eventsImpl;
						}
						networkConnect(e, t, n) {
							return null !== this.connectPromise || null !== this.disconnectPromise
								? Promise.reject(new Error('Already prefoming connection or disconnection...'))
								: ((this.connectPromise = new Promise((r, o) => {
										t.startsWith('wss://') || t.startsWith('ws://') || (t = ('http:' === window.location.protocol ? 'ws://' : 'wss://') + t),
											(this.connectResolve = r),
											(this.connectReject = o),
											this.sendClientMessage('wc-connect', { networkType: e, address: t, port: n });
									})),
									this.connectPromise);
						}
						networkDisconnect(e) {
							return null !== this.connectPromise || null !== this.disconnectPromise
								? Promise.reject(new Error('Already prefoming connection or disconnection...'))
								: ((this.disconnectPromise = new Promise(t => {
										(this.disconnectResolve = t), this.sendClientMessage('wc-disconnect', { networkType: e });
									})),
									this.disconnectPromise);
						}
					};
				},
				{
					'../impl/ci-impl': 145,
					'core-js/modules/es.typed-array.float32-array.js': 131,
					'core-js/modules/es.typed-array.set.js': 133,
					'core-js/modules/es.typed-array.sort.js': 134,
					'core-js/modules/es.typed-array.uint8-array.js': 135,
					'core-js/modules/es.typed-array.uint8-clamped-array.js': 136,
					'core-js/modules/web.dom-collections.iterator.js': 137,
				},
			],
		},
		{},
		[143]
	),
	(function (e, t) {
		'object' == typeof exports && 'undefined' != typeof module
			? t(exports)
			: 'function' == typeof define && define.amd
				? define(['exports'], t)
				: t(((e = 'undefined' != typeof globalThis ? globalThis : e || self).zip = {}));
	})(this, function (e) {
		'use strict';
		const t = -2,
			n = -3,
			r = -5,
			o = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535],
			i = [
				96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9,
				224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0,
				9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8,
				68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140,
				0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8,
				130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10,
				0, 8, 138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8,
				6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0,
				8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9,
				162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0,
				9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8,
				37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0,
				8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8,
				99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0,
				8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7,
				15, 0, 8, 103, 0, 8, 39, 0, 9, 174, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82,
				7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9,
				193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0,
				9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8,
				52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0,
				8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8,
				114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0,
				8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7,
				51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84,
				7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8,
				131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0,
				9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21,
				80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8,
				29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83,
				0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8,
				91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5,
				0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7,
				9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255,
			],
			s = [
				80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82, 5, 9, 90, 5, 2049,
				86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5,
				12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577,
			],
			a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
			l = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112],
			c = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
			u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
		function d() {
			let e, t, o, i, s, d;
			function f(e, t, a, l, c, u, f, p, h, m, y) {
				let v, g, b, w, _, x, k, C, E, j, S, D, O, P, B;
				(j = 0), (_ = a);
				do {
					o[e[t + j]]++, j++, _--;
				} while (0 !== _);
				if (o[0] == a) return (f[0] = -1), (p[0] = 0), 0;
				for (C = p[0], x = 1; x <= 15 && 0 === o[x]; x++);
				for (k = x, C < x && (C = x), _ = 15; 0 !== _ && 0 === o[_]; _--);
				for (b = _, C > _ && (C = _), p[0] = C, P = 1 << x; x < _; x++, P <<= 1) if ((P -= o[x]) < 0) return n;
				if ((P -= o[_]) < 0) return n;
				for (o[_] += P, d[1] = x = 0, j = 1, O = 2; 0 != --_; ) (d[O] = x += o[j]), O++, j++;
				(_ = 0), (j = 0);
				do {
					0 !== (x = e[t + j]) && (y[d[x]++] = _), j++;
				} while (++_ < a);
				for (a = d[b], d[0] = _ = 0, j = 0, w = -1, D = -C, s[0] = 0, S = 0, B = 0; k <= b; k++)
					for (v = o[k]; 0 != v--; ) {
						for (; k > D + C; ) {
							if ((w++, (D += C), (B = b - D), (B = B > C ? C : B), (g = 1 << (x = k - D)) > v + 1 && ((g -= v + 1), (O = k), x < B)))
								for (; ++x < B && !((g <<= 1) <= o[++O]); ) g -= o[O];
							if (((B = 1 << x), m[0] + B > 1440)) return n;
							(s[w] = S = m[0]),
								(m[0] += B),
								0 !== w ? ((d[w] = _), (i[0] = x), (i[1] = C), (x = _ >>> (D - C)), (i[2] = S - s[w - 1] - x), h.set(i, 3 * (s[w - 1] + x))) : (f[0] = S);
						}
						for (
							i[1] = k - D,
								j >= a ? (i[0] = 192) : y[j] < l ? ((i[0] = y[j] < 256 ? 0 : 96), (i[2] = y[j++])) : ((i[0] = u[y[j] - l] + 16 + 64), (i[2] = c[y[j++] - l])),
								g = 1 << (k - D),
								x = _ >>> D;
							x < B;
							x += g
						)
							h.set(i, 3 * (S + x));
						for (x = 1 << (k - 1); 0 != (_ & x); x >>>= 1) _ ^= x;
						for (_ ^= x, E = (1 << D) - 1; (_ & E) != d[w]; ) w--, (D -= C), (E = (1 << D) - 1);
					}
				return 0 !== P && 1 != b ? r : 0;
			}
			function p(n) {
				let r;
				for (e || ((e = []), (t = []), (o = new Int32Array(16)), (i = []), (s = new Int32Array(15)), (d = new Int32Array(16))), t.length < n && (t = []), r = 0; r < n; r++)
					t[r] = 0;
				for (r = 0; r < 16; r++) o[r] = 0;
				for (r = 0; r < 3; r++) i[r] = 0;
				s.set(o.subarray(0, 15), 0), d.set(o.subarray(0, 16), 0);
			}
			(this.inflate_trees_bits = function (o, i, s, a, l) {
				let c;
				return (
					p(19),
					(e[0] = 0),
					(c = f(o, 0, 19, 19, null, null, s, i, a, e, t)),
					c == n ? (l.msg = 'oversubscribed dynamic bit lengths tree') : (c != r && 0 !== i[0]) || ((l.msg = 'incomplete dynamic bit lengths tree'), (c = n)),
					c
				);
			}),
				(this.inflate_trees_dynamic = function (o, i, s, d, h, m, y, v, g) {
					let b;
					return (
						p(288),
						(e[0] = 0),
						(b = f(s, 0, o, 257, a, l, m, d, v, e, t)),
						0 != b || 0 === d[0]
							? (b == n ? (g.msg = 'oversubscribed literal/length tree') : -4 != b && ((g.msg = 'incomplete literal/length tree'), (b = n)), b)
							: (p(288),
								(b = f(s, o, i, 0, c, u, y, h, v, e, t)),
								0 != b || (0 === h[0] && o > 257)
									? (b == n
											? (g.msg = 'oversubscribed distance tree')
											: b == r
												? ((g.msg = 'incomplete distance tree'), (b = n))
												: -4 != b && ((g.msg = 'empty distance tree with lengths'), (b = n)),
										b)
									: 0)
					);
				});
		}
		function f() {
			const e = this;
			let r,
				i,
				s,
				a,
				l = 0,
				c = 0,
				u = 0,
				d = 0,
				f = 0,
				p = 0,
				h = 0,
				m = 0,
				y = 0,
				v = 0;
			function g(e, t, r, i, s, a, l, c) {
				let u, d, f, p, h, m, y, v, g, b, w, _, x, k, C, E;
				(y = c.next_in_index), (v = c.avail_in), (h = l.bitb), (m = l.bitk), (g = l.write), (b = g < l.read ? l.read - g - 1 : l.end - g), (w = o[e]), (_ = o[t]);
				do {
					for (; m < 20; ) v--, (h |= (255 & c.read_byte(y++)) << m), (m += 8);
					if (((u = h & w), (d = r), (f = i), (E = 3 * (f + u)), 0 !== (p = d[E])))
						for (;;) {
							if (((h >>= d[E + 1]), (m -= d[E + 1]), 0 != (16 & p))) {
								for (p &= 15, x = d[E + 2] + (h & o[p]), h >>= p, m -= p; m < 15; ) v--, (h |= (255 & c.read_byte(y++)) << m), (m += 8);
								for (u = h & _, d = s, f = a, E = 3 * (f + u), p = d[E]; ; ) {
									if (((h >>= d[E + 1]), (m -= d[E + 1]), 0 != (16 & p))) {
										for (p &= 15; m < p; ) v--, (h |= (255 & c.read_byte(y++)) << m), (m += 8);
										if (((k = d[E + 2] + (h & o[p])), (h >>= p), (m -= p), (b -= x), g >= k))
											(C = g - k),
												g - C > 0 && 2 > g - C
													? ((l.window[g++] = l.window[C++]), (l.window[g++] = l.window[C++]), (x -= 2))
													: (l.window.set(l.window.subarray(C, C + 2), g), (g += 2), (C += 2), (x -= 2));
										else {
											C = g - k;
											do {
												C += l.end;
											} while (C < 0);
											if (((p = l.end - C), x > p)) {
												if (((x -= p), g - C > 0 && p > g - C))
													do {
														l.window[g++] = l.window[C++];
													} while (0 != --p);
												else l.window.set(l.window.subarray(C, C + p), g), (g += p), (C += p), (p = 0);
												C = 0;
											}
										}
										if (g - C > 0 && x > g - C)
											do {
												l.window[g++] = l.window[C++];
											} while (0 != --x);
										else l.window.set(l.window.subarray(C, C + x), g), (g += x), (C += x), (x = 0);
										break;
									}
									if (0 != (64 & p))
										return (
											(c.msg = 'invalid distance code'),
											(x = c.avail_in - v),
											(x = m >> 3 < x ? m >> 3 : x),
											(v += x),
											(y -= x),
											(m -= x << 3),
											(l.bitb = h),
											(l.bitk = m),
											(c.avail_in = v),
											(c.total_in += y - c.next_in_index),
											(c.next_in_index = y),
											(l.write = g),
											n
										);
									(u += d[E + 2]), (u += h & o[p]), (E = 3 * (f + u)), (p = d[E]);
								}
								break;
							}
							if (0 != (64 & p))
								return 0 != (32 & p)
									? ((x = c.avail_in - v),
										(x = m >> 3 < x ? m >> 3 : x),
										(v += x),
										(y -= x),
										(m -= x << 3),
										(l.bitb = h),
										(l.bitk = m),
										(c.avail_in = v),
										(c.total_in += y - c.next_in_index),
										(c.next_in_index = y),
										(l.write = g),
										1)
									: ((c.msg = 'invalid literal/length code'),
										(x = c.avail_in - v),
										(x = m >> 3 < x ? m >> 3 : x),
										(v += x),
										(y -= x),
										(m -= x << 3),
										(l.bitb = h),
										(l.bitk = m),
										(c.avail_in = v),
										(c.total_in += y - c.next_in_index),
										(c.next_in_index = y),
										(l.write = g),
										n);
							if (((u += d[E + 2]), (u += h & o[p]), (E = 3 * (f + u)), 0 === (p = d[E]))) {
								(h >>= d[E + 1]), (m -= d[E + 1]), (l.window[g++] = d[E + 2]), b--;
								break;
							}
						}
					else (h >>= d[E + 1]), (m -= d[E + 1]), (l.window[g++] = d[E + 2]), b--;
				} while (b >= 258 && v >= 10);
				return (
					(x = c.avail_in - v),
					(x = m >> 3 < x ? m >> 3 : x),
					(v += x),
					(y -= x),
					(m -= x << 3),
					(l.bitb = h),
					(l.bitk = m),
					(c.avail_in = v),
					(c.total_in += y - c.next_in_index),
					(c.next_in_index = y),
					(l.write = g),
					0
				);
			}
			(e.init = function (e, t, n, o, l, c) {
				(r = 0), (h = e), (m = t), (s = n), (y = o), (a = l), (v = c), (i = null);
			}),
				(e.proc = function (e, b, w) {
					let _,
						x,
						k,
						C,
						E,
						j,
						S,
						D = 0,
						O = 0,
						P = 0;
					for (P = b.next_in_index, C = b.avail_in, D = e.bitb, O = e.bitk, E = e.write, j = E < e.read ? e.read - E - 1 : e.end - E; ; )
						switch (r) {
							case 0:
								if (
									j >= 258 &&
									C >= 10 &&
									((e.bitb = D),
									(e.bitk = O),
									(b.avail_in = C),
									(b.total_in += P - b.next_in_index),
									(b.next_in_index = P),
									(e.write = E),
									(w = g(h, m, s, y, a, v, e, b)),
									(P = b.next_in_index),
									(C = b.avail_in),
									(D = e.bitb),
									(O = e.bitk),
									(E = e.write),
									(j = E < e.read ? e.read - E - 1 : e.end - E),
									0 != w)
								) {
									r = 1 == w ? 7 : 9;
									break;
								}
								(u = h), (i = s), (c = y), (r = 1);
							case 1:
								for (_ = u; O < _; ) {
									if (0 === C)
										return (
											(e.bitb = D),
											(e.bitk = O),
											(b.avail_in = C),
											(b.total_in += P - b.next_in_index),
											(b.next_in_index = P),
											(e.write = E),
											e.inflate_flush(b, w)
										);
									(w = 0), C--, (D |= (255 & b.read_byte(P++)) << O), (O += 8);
								}
								if (((x = 3 * (c + (D & o[_]))), (D >>>= i[x + 1]), (O -= i[x + 1]), (k = i[x]), 0 === k)) {
									(d = i[x + 2]), (r = 6);
									break;
								}
								if (0 != (16 & k)) {
									(f = 15 & k), (l = i[x + 2]), (r = 2);
									break;
								}
								if (0 == (64 & k)) {
									(u = k), (c = x / 3 + i[x + 2]);
									break;
								}
								if (0 != (32 & k)) {
									r = 7;
									break;
								}
								return (
									(r = 9),
									(b.msg = 'invalid literal/length code'),
									(w = n),
									(e.bitb = D),
									(e.bitk = O),
									(b.avail_in = C),
									(b.total_in += P - b.next_in_index),
									(b.next_in_index = P),
									(e.write = E),
									e.inflate_flush(b, w)
								);
							case 2:
								for (_ = f; O < _; ) {
									if (0 === C)
										return (
											(e.bitb = D),
											(e.bitk = O),
											(b.avail_in = C),
											(b.total_in += P - b.next_in_index),
											(b.next_in_index = P),
											(e.write = E),
											e.inflate_flush(b, w)
										);
									(w = 0), C--, (D |= (255 & b.read_byte(P++)) << O), (O += 8);
								}
								(l += D & o[_]), (D >>= _), (O -= _), (u = m), (i = a), (c = v), (r = 3);
							case 3:
								for (_ = u; O < _; ) {
									if (0 === C)
										return (
											(e.bitb = D),
											(e.bitk = O),
											(b.avail_in = C),
											(b.total_in += P - b.next_in_index),
											(b.next_in_index = P),
											(e.write = E),
											e.inflate_flush(b, w)
										);
									(w = 0), C--, (D |= (255 & b.read_byte(P++)) << O), (O += 8);
								}
								if (((x = 3 * (c + (D & o[_]))), (D >>= i[x + 1]), (O -= i[x + 1]), (k = i[x]), 0 != (16 & k))) {
									(f = 15 & k), (p = i[x + 2]), (r = 4);
									break;
								}
								if (0 == (64 & k)) {
									(u = k), (c = x / 3 + i[x + 2]);
									break;
								}
								return (
									(r = 9),
									(b.msg = 'invalid distance code'),
									(w = n),
									(e.bitb = D),
									(e.bitk = O),
									(b.avail_in = C),
									(b.total_in += P - b.next_in_index),
									(b.next_in_index = P),
									(e.write = E),
									e.inflate_flush(b, w)
								);
							case 4:
								for (_ = f; O < _; ) {
									if (0 === C)
										return (
											(e.bitb = D),
											(e.bitk = O),
											(b.avail_in = C),
											(b.total_in += P - b.next_in_index),
											(b.next_in_index = P),
											(e.write = E),
											e.inflate_flush(b, w)
										);
									(w = 0), C--, (D |= (255 & b.read_byte(P++)) << O), (O += 8);
								}
								(p += D & o[_]), (D >>= _), (O -= _), (r = 5);
							case 5:
								for (S = E - p; S < 0; ) S += e.end;
								for (; 0 !== l; ) {
									if (
										0 === j &&
										(E == e.end && 0 !== e.read && ((E = 0), (j = E < e.read ? e.read - E - 1 : e.end - E)),
										0 === j &&
											((e.write = E),
											(w = e.inflate_flush(b, w)),
											(E = e.write),
											(j = E < e.read ? e.read - E - 1 : e.end - E),
											E == e.end && 0 !== e.read && ((E = 0), (j = E < e.read ? e.read - E - 1 : e.end - E)),
											0 === j))
									)
										return (
											(e.bitb = D),
											(e.bitk = O),
											(b.avail_in = C),
											(b.total_in += P - b.next_in_index),
											(b.next_in_index = P),
											(e.write = E),
											e.inflate_flush(b, w)
										);
									(e.window[E++] = e.window[S++]), j--, S == e.end && (S = 0), l--;
								}
								r = 0;
								break;
							case 6:
								if (
									0 === j &&
									(E == e.end && 0 !== e.read && ((E = 0), (j = E < e.read ? e.read - E - 1 : e.end - E)),
									0 === j &&
										((e.write = E),
										(w = e.inflate_flush(b, w)),
										(E = e.write),
										(j = E < e.read ? e.read - E - 1 : e.end - E),
										E == e.end && 0 !== e.read && ((E = 0), (j = E < e.read ? e.read - E - 1 : e.end - E)),
										0 === j))
								)
									return (
										(e.bitb = D),
										(e.bitk = O),
										(b.avail_in = C),
										(b.total_in += P - b.next_in_index),
										(b.next_in_index = P),
										(e.write = E),
										e.inflate_flush(b, w)
									);
								(w = 0), (e.window[E++] = d), j--, (r = 0);
								break;
							case 7:
								if (
									(O > 7 && ((O -= 8), C++, P--),
									(e.write = E),
									(w = e.inflate_flush(b, w)),
									(E = e.write),
									(j = E < e.read ? e.read - E - 1 : e.end - E),
									e.read != e.write)
								)
									return (
										(e.bitb = D),
										(e.bitk = O),
										(b.avail_in = C),
										(b.total_in += P - b.next_in_index),
										(b.next_in_index = P),
										(e.write = E),
										e.inflate_flush(b, w)
									);
								r = 8;
							case 8:
								return (
									(w = 1),
									(e.bitb = D),
									(e.bitk = O),
									(b.avail_in = C),
									(b.total_in += P - b.next_in_index),
									(b.next_in_index = P),
									(e.write = E),
									e.inflate_flush(b, w)
								);
							case 9:
								return (
									(w = n),
									(e.bitb = D),
									(e.bitk = O),
									(b.avail_in = C),
									(b.total_in += P - b.next_in_index),
									(b.next_in_index = P),
									(e.write = E),
									e.inflate_flush(b, w)
								);
							default:
								return (
									(w = t),
									(e.bitb = D),
									(e.bitk = O),
									(b.avail_in = C),
									(b.total_in += P - b.next_in_index),
									(b.next_in_index = P),
									(e.write = E),
									e.inflate_flush(b, w)
								);
						}
				}),
				(e.free = function () {});
		}
		d.inflate_trees_fixed = function (e, t, n, r) {
			return (e[0] = 9), (t[0] = 5), (n[0] = i), (r[0] = s), 0;
		};
		const p = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
		function h(e, i) {
			const s = this;
			let a,
				l = 0,
				c = 0,
				u = 0,
				h = 0;
			const m = [0],
				y = [0],
				v = new f();
			let g = 0,
				b = new Int32Array(4320);
			const w = new d();
			(s.bitk = 0),
				(s.bitb = 0),
				(s.window = new Uint8Array(i)),
				(s.end = i),
				(s.read = 0),
				(s.write = 0),
				(s.reset = function (e, t) {
					t && (t[0] = 0), 6 == l && v.free(e), (l = 0), (s.bitk = 0), (s.bitb = 0), (s.read = s.write = 0);
				}),
				s.reset(e, null),
				(s.inflate_flush = function (e, t) {
					let n, o, i;
					return (
						(o = e.next_out_index),
						(i = s.read),
						(n = (i <= s.write ? s.write : s.end) - i),
						n > e.avail_out && (n = e.avail_out),
						0 !== n && t == r && (t = 0),
						(e.avail_out -= n),
						(e.total_out += n),
						e.next_out.set(s.window.subarray(i, i + n), o),
						(o += n),
						(i += n),
						i == s.end &&
							((i = 0),
							s.write == s.end && (s.write = 0),
							(n = s.write - i),
							n > e.avail_out && (n = e.avail_out),
							0 !== n && t == r && (t = 0),
							(e.avail_out -= n),
							(e.total_out += n),
							e.next_out.set(s.window.subarray(i, i + n), o),
							(o += n),
							(i += n)),
						(e.next_out_index = o),
						(s.read = i),
						t
					);
				}),
				(s.proc = function (e, r) {
					let i, f, _, x, k, C, E, j;
					for (x = e.next_in_index, k = e.avail_in, f = s.bitb, _ = s.bitk, C = s.write, E = C < s.read ? s.read - C - 1 : s.end - C; ; ) {
						let S, D, O, P, B, M, I, A;
						switch (l) {
							case 0:
								for (; _ < 3; ) {
									if (0 === k)
										return (
											(s.bitb = f),
											(s.bitk = _),
											(e.avail_in = k),
											(e.total_in += x - e.next_in_index),
											(e.next_in_index = x),
											(s.write = C),
											s.inflate_flush(e, r)
										);
									(r = 0), k--, (f |= (255 & e.read_byte(x++)) << _), (_ += 8);
								}
								switch (((i = 7 & f), (g = 1 & i), i >>> 1)) {
									case 0:
										(f >>>= 3), (_ -= 3), (i = 7 & _), (f >>>= i), (_ -= i), (l = 1);
										break;
									case 1:
										(S = []),
											(D = []),
											(O = [[]]),
											(P = [[]]),
											d.inflate_trees_fixed(S, D, O, P),
											v.init(S[0], D[0], O[0], 0, P[0], 0),
											(f >>>= 3),
											(_ -= 3),
											(l = 6);
										break;
									case 2:
										(f >>>= 3), (_ -= 3), (l = 3);
										break;
									case 3:
										return (
											(f >>>= 3),
											(_ -= 3),
											(l = 9),
											(e.msg = 'invalid block type'),
											(r = n),
											(s.bitb = f),
											(s.bitk = _),
											(e.avail_in = k),
											(e.total_in += x - e.next_in_index),
											(e.next_in_index = x),
											(s.write = C),
											s.inflate_flush(e, r)
										);
								}
								break;
							case 1:
								for (; _ < 32; ) {
									if (0 === k)
										return (
											(s.bitb = f),
											(s.bitk = _),
											(e.avail_in = k),
											(e.total_in += x - e.next_in_index),
											(e.next_in_index = x),
											(s.write = C),
											s.inflate_flush(e, r)
										);
									(r = 0), k--, (f |= (255 & e.read_byte(x++)) << _), (_ += 8);
								}
								if (((~f >>> 16) & 65535) != (65535 & f))
									return (
										(l = 9),
										(e.msg = 'invalid stored block lengths'),
										(r = n),
										(s.bitb = f),
										(s.bitk = _),
										(e.avail_in = k),
										(e.total_in += x - e.next_in_index),
										(e.next_in_index = x),
										(s.write = C),
										s.inflate_flush(e, r)
									);
								(c = 65535 & f), (f = _ = 0), (l = 0 !== c ? 2 : 0 !== g ? 7 : 0);
								break;
							case 2:
								if (0 === k)
									return (
										(s.bitb = f),
										(s.bitk = _),
										(e.avail_in = k),
										(e.total_in += x - e.next_in_index),
										(e.next_in_index = x),
										(s.write = C),
										s.inflate_flush(e, r)
									);
								if (
									0 === E &&
									(C == s.end && 0 !== s.read && ((C = 0), (E = C < s.read ? s.read - C - 1 : s.end - C)),
									0 === E &&
										((s.write = C),
										(r = s.inflate_flush(e, r)),
										(C = s.write),
										(E = C < s.read ? s.read - C - 1 : s.end - C),
										C == s.end && 0 !== s.read && ((C = 0), (E = C < s.read ? s.read - C - 1 : s.end - C)),
										0 === E))
								)
									return (
										(s.bitb = f),
										(s.bitk = _),
										(e.avail_in = k),
										(e.total_in += x - e.next_in_index),
										(e.next_in_index = x),
										(s.write = C),
										s.inflate_flush(e, r)
									);
								if (
									((r = 0), (i = c), i > k && (i = k), i > E && (i = E), s.window.set(e.read_buf(x, i), C), (x += i), (k -= i), (C += i), (E -= i), 0 != (c -= i))
								)
									break;
								l = 0 !== g ? 7 : 0;
								break;
							case 3:
								for (; _ < 14; ) {
									if (0 === k)
										return (
											(s.bitb = f),
											(s.bitk = _),
											(e.avail_in = k),
											(e.total_in += x - e.next_in_index),
											(e.next_in_index = x),
											(s.write = C),
											s.inflate_flush(e, r)
										);
									(r = 0), k--, (f |= (255 & e.read_byte(x++)) << _), (_ += 8);
								}
								if (((u = i = 16383 & f), (31 & i) > 29 || ((i >> 5) & 31) > 29))
									return (
										(l = 9),
										(e.msg = 'too many length or distance symbols'),
										(r = n),
										(s.bitb = f),
										(s.bitk = _),
										(e.avail_in = k),
										(e.total_in += x - e.next_in_index),
										(e.next_in_index = x),
										(s.write = C),
										s.inflate_flush(e, r)
									);
								if (((i = 258 + (31 & i) + ((i >> 5) & 31)), !a || a.length < i)) a = [];
								else for (j = 0; j < i; j++) a[j] = 0;
								(f >>>= 14), (_ -= 14), (h = 0), (l = 4);
							case 4:
								for (; h < 4 + (u >>> 10); ) {
									for (; _ < 3; ) {
										if (0 === k)
											return (
												(s.bitb = f),
												(s.bitk = _),
												(e.avail_in = k),
												(e.total_in += x - e.next_in_index),
												(e.next_in_index = x),
												(s.write = C),
												s.inflate_flush(e, r)
											);
										(r = 0), k--, (f |= (255 & e.read_byte(x++)) << _), (_ += 8);
									}
									(a[p[h++]] = 7 & f), (f >>>= 3), (_ -= 3);
								}
								for (; h < 19; ) a[p[h++]] = 0;
								if (((m[0] = 7), (i = w.inflate_trees_bits(a, m, y, b, e)), 0 != i))
									return (
										(r = i) == n && ((a = null), (l = 9)),
										(s.bitb = f),
										(s.bitk = _),
										(e.avail_in = k),
										(e.total_in += x - e.next_in_index),
										(e.next_in_index = x),
										(s.write = C),
										s.inflate_flush(e, r)
									);
								(h = 0), (l = 5);
							case 5:
								for (; (i = u), !(h >= 258 + (31 & i) + ((i >> 5) & 31)); ) {
									let t, c;
									for (i = m[0]; _ < i; ) {
										if (0 === k)
											return (
												(s.bitb = f),
												(s.bitk = _),
												(e.avail_in = k),
												(e.total_in += x - e.next_in_index),
												(e.next_in_index = x),
												(s.write = C),
												s.inflate_flush(e, r)
											);
										(r = 0), k--, (f |= (255 & e.read_byte(x++)) << _), (_ += 8);
									}
									if (((i = b[3 * (y[0] + (f & o[i])) + 1]), (c = b[3 * (y[0] + (f & o[i])) + 2]), c < 16)) (f >>>= i), (_ -= i), (a[h++] = c);
									else {
										for (j = 18 == c ? 7 : c - 14, t = 18 == c ? 11 : 3; _ < i + j; ) {
											if (0 === k)
												return (
													(s.bitb = f),
													(s.bitk = _),
													(e.avail_in = k),
													(e.total_in += x - e.next_in_index),
													(e.next_in_index = x),
													(s.write = C),
													s.inflate_flush(e, r)
												);
											(r = 0), k--, (f |= (255 & e.read_byte(x++)) << _), (_ += 8);
										}
										if (
											((f >>>= i),
											(_ -= i),
											(t += f & o[j]),
											(f >>>= j),
											(_ -= j),
											(j = h),
											(i = u),
											j + t > 258 + (31 & i) + ((i >> 5) & 31) || (16 == c && j < 1))
										)
											return (
												(a = null),
												(l = 9),
												(e.msg = 'invalid bit length repeat'),
												(r = n),
												(s.bitb = f),
												(s.bitk = _),
												(e.avail_in = k),
												(e.total_in += x - e.next_in_index),
												(e.next_in_index = x),
												(s.write = C),
												s.inflate_flush(e, r)
											);
										c = 16 == c ? a[j - 1] : 0;
										do {
											a[j++] = c;
										} while (0 != --t);
										h = j;
									}
								}
								if (
									((y[0] = -1),
									(B = []),
									(M = []),
									(I = []),
									(A = []),
									(B[0] = 9),
									(M[0] = 6),
									(i = u),
									(i = w.inflate_trees_dynamic(257 + (31 & i), 1 + ((i >> 5) & 31), a, B, M, I, A, b, e)),
									0 != i)
								)
									return (
										i == n && ((a = null), (l = 9)),
										(r = i),
										(s.bitb = f),
										(s.bitk = _),
										(e.avail_in = k),
										(e.total_in += x - e.next_in_index),
										(e.next_in_index = x),
										(s.write = C),
										s.inflate_flush(e, r)
									);
								v.init(B[0], M[0], b, I[0], b, A[0]), (l = 6);
							case 6:
								if (
									((s.bitb = f),
									(s.bitk = _),
									(e.avail_in = k),
									(e.total_in += x - e.next_in_index),
									(e.next_in_index = x),
									(s.write = C),
									1 != (r = v.proc(s, e, r)))
								)
									return s.inflate_flush(e, r);
								if (
									((r = 0),
									v.free(e),
									(x = e.next_in_index),
									(k = e.avail_in),
									(f = s.bitb),
									(_ = s.bitk),
									(C = s.write),
									(E = C < s.read ? s.read - C - 1 : s.end - C),
									0 === g)
								) {
									l = 0;
									break;
								}
								l = 7;
							case 7:
								if (((s.write = C), (r = s.inflate_flush(e, r)), (C = s.write), (E = C < s.read ? s.read - C - 1 : s.end - C), s.read != s.write))
									return (
										(s.bitb = f),
										(s.bitk = _),
										(e.avail_in = k),
										(e.total_in += x - e.next_in_index),
										(e.next_in_index = x),
										(s.write = C),
										s.inflate_flush(e, r)
									);
								l = 8;
							case 8:
								return (
									(r = 1),
									(s.bitb = f),
									(s.bitk = _),
									(e.avail_in = k),
									(e.total_in += x - e.next_in_index),
									(e.next_in_index = x),
									(s.write = C),
									s.inflate_flush(e, r)
								);
							case 9:
								return (
									(r = n),
									(s.bitb = f),
									(s.bitk = _),
									(e.avail_in = k),
									(e.total_in += x - e.next_in_index),
									(e.next_in_index = x),
									(s.write = C),
									s.inflate_flush(e, r)
								);
							default:
								return (
									(r = t),
									(s.bitb = f),
									(s.bitk = _),
									(e.avail_in = k),
									(e.total_in += x - e.next_in_index),
									(e.next_in_index = x),
									(s.write = C),
									s.inflate_flush(e, r)
								);
						}
					}
				}),
				(s.free = function (e) {
					s.reset(e, null), (s.window = null), (b = null);
				}),
				(s.set_dictionary = function (e, t, n) {
					s.window.set(e.subarray(t, t + n), 0), (s.read = s.write = n);
				}),
				(s.sync_point = function () {
					return 1 == l ? 1 : 0;
				});
		}
		const m = 13,
			y = [0, 0, 255, 255];
		function v() {
			const e = this;
			function o(e) {
				return e && e.istate ? ((e.total_in = e.total_out = 0), (e.msg = null), (e.istate.mode = 7), e.istate.blocks.reset(e, null), 0) : t;
			}
			(e.mode = 0),
				(e.method = 0),
				(e.was = [0]),
				(e.need = 0),
				(e.marker = 0),
				(e.wbits = 0),
				(e.inflateEnd = function (t) {
					return e.blocks && e.blocks.free(t), (e.blocks = null), 0;
				}),
				(e.inflateInit = function (n, r) {
					return (n.msg = null), (e.blocks = null), r < 8 || r > 15 ? (e.inflateEnd(n), t) : ((e.wbits = r), (n.istate.blocks = new h(n, 1 << r)), o(n), 0);
				}),
				(e.inflate = function (e, o) {
					let i, s;
					if (!e || !e.istate || !e.next_in) return t;
					const a = e.istate;
					for (o = 4 == o ? r : 0, i = r; ; )
						switch (a.mode) {
							case 0:
								if (0 === e.avail_in) return i;
								if (((i = o), e.avail_in--, e.total_in++, 8 != (15 & (a.method = e.read_byte(e.next_in_index++))))) {
									(a.mode = m), (e.msg = 'unknown compression method'), (a.marker = 5);
									break;
								}
								if (8 + (a.method >> 4) > a.wbits) {
									(a.mode = m), (e.msg = 'invalid window size'), (a.marker = 5);
									break;
								}
								a.mode = 1;
							case 1:
								if (0 === e.avail_in) return i;
								if (((i = o), e.avail_in--, e.total_in++, (s = 255 & e.read_byte(e.next_in_index++)), ((a.method << 8) + s) % 31 != 0)) {
									(a.mode = m), (e.msg = 'incorrect header check'), (a.marker = 5);
									break;
								}
								if (0 == (32 & s)) {
									a.mode = 7;
									break;
								}
								a.mode = 2;
							case 2:
								if (0 === e.avail_in) return i;
								(i = o), e.avail_in--, e.total_in++, (a.need = ((255 & e.read_byte(e.next_in_index++)) << 24) & 4278190080), (a.mode = 3);
							case 3:
								if (0 === e.avail_in) return i;
								(i = o), e.avail_in--, e.total_in++, (a.need += ((255 & e.read_byte(e.next_in_index++)) << 16) & 16711680), (a.mode = 4);
							case 4:
								if (0 === e.avail_in) return i;
								(i = o), e.avail_in--, e.total_in++, (a.need += ((255 & e.read_byte(e.next_in_index++)) << 8) & 65280), (a.mode = 5);
							case 5:
								return 0 === e.avail_in ? i : ((i = o), e.avail_in--, e.total_in++, (a.need += 255 & e.read_byte(e.next_in_index++)), (a.mode = 6), 2);
							case 6:
								return (a.mode = m), (e.msg = 'need dictionary'), (a.marker = 0), t;
							case 7:
								if (((i = a.blocks.proc(e, i)), i == n)) {
									(a.mode = m), (a.marker = 0);
									break;
								}
								if ((0 == i && (i = o), 1 != i)) return i;
								(i = o), a.blocks.reset(e, a.was), (a.mode = 12);
							case 12:
								return 1;
							case m:
								return n;
							default:
								return t;
						}
				}),
				(e.inflateSetDictionary = function (e, n, r) {
					let o = 0,
						i = r;
					if (!e || !e.istate || 6 != e.istate.mode) return t;
					const s = e.istate;
					return i >= 1 << s.wbits && ((i = (1 << s.wbits) - 1), (o = r - i)), s.blocks.set_dictionary(n, o, i), (s.mode = 7), 0;
				}),
				(e.inflateSync = function (e) {
					let i, s, a, l, c;
					if (!e || !e.istate) return t;
					const u = e.istate;
					if ((u.mode != m && ((u.mode = m), (u.marker = 0)), 0 === (i = e.avail_in))) return r;
					for (s = e.next_in_index, a = u.marker; 0 !== i && a < 4; ) e.read_byte(s) == y[a] ? a++ : (a = 0 !== e.read_byte(s) ? 0 : 4 - a), s++, i--;
					return (
						(e.total_in += s - e.next_in_index),
						(e.next_in_index = s),
						(e.avail_in = i),
						(u.marker = a),
						4 != a ? n : ((l = e.total_in), (c = e.total_out), o(e), (e.total_in = l), (e.total_out = c), (u.mode = 7), 0)
					);
				}),
				(e.inflateSyncPoint = function (e) {
					return e && e.istate && e.istate.blocks ? e.istate.blocks.sync_point() : t;
				});
		}
		function g() {}
		g.prototype = {
			inflateInit: function (e) {
				const t = this;
				return (t.istate = new v()), e || (e = 15), t.istate.inflateInit(t, e);
			},
			inflate: function (e) {
				const n = this;
				return n.istate ? n.istate.inflate(n, e) : t;
			},
			inflateEnd: function () {
				const e = this;
				if (!e.istate) return t;
				const n = e.istate.inflateEnd(e);
				return (e.istate = null), n;
			},
			inflateSync: function () {
				const e = this;
				return e.istate ? e.istate.inflateSync(e) : t;
			},
			inflateSetDictionary: function (e, n) {
				const r = this;
				return r.istate ? r.istate.inflateSetDictionary(r, e, n) : t;
			},
			read_byte: function (e) {
				return this.next_in[e];
			},
			read_buf: function (e, t) {
				return this.next_in.subarray(e, e + t);
			},
		};
		const b = {
				chunkSize: 524288,
				maxWorkers: ('undefined' != typeof navigator && navigator.hardwareConcurrency) || 2,
				terminateWorkerTimeout: 5e3,
				useWebWorkers: !0,
				workerScripts: void 0,
			},
			w = Object.assign({}, b);
		function _(e) {
			if (
				(void 0 !== e.chunkSize && (w.chunkSize = e.chunkSize),
				void 0 !== e.maxWorkers && (w.maxWorkers = e.maxWorkers),
				void 0 !== e.terminateWorkerTimeout && (w.terminateWorkerTimeout = e.terminateWorkerTimeout),
				void 0 !== e.useWebWorkers && (w.useWebWorkers = e.useWebWorkers),
				void 0 !== e.Deflate && (w.Deflate = e.Deflate),
				void 0 !== e.Inflate && (w.Inflate = e.Inflate),
				void 0 !== e.workerScripts)
			) {
				if (e.workerScripts.deflate) {
					if (!Array.isArray(e.workerScripts.deflate)) throw new Error('workerScripts.deflate must be an array');
					w.workerScripts || (w.workerScripts = {}), (w.workerScripts.deflate = e.workerScripts.deflate);
				}
				if (e.workerScripts.inflate) {
					if (!Array.isArray(e.workerScripts.inflate)) throw new Error('workerScripts.inflate must be an array');
					w.workerScripts || (w.workerScripts = {}), (w.workerScripts.inflate = e.workerScripts.inflate);
				}
			}
		}
		const x = 'Abort error';
		function k(e, t) {
			if (e && e.aborted) throw (t.flush(), new Error(x));
		}
		async function C(e, t) {
			return t.length && (await e.writeUint8Array(t)), t.length;
		}
		const E = 'HTTP error ',
			j = 'HTTP Range not supported',
			S = 'text/plain',
			D = 'Content-Length',
			O = 'Accept-Ranges',
			P = 'HEAD',
			B = 'GET',
			M = 'bytes';
		class I {
			constructor() {
				this.size = 0;
			}
			init() {
				this.initialized = !0;
			}
		}
		class A extends I {}
		class T extends I {
			writeUint8Array(e) {
				this.size += e.length;
			}
		}
		class K extends A {
			constructor(e) {
				super(), (this.blob = e), (this.size = e.size);
			}
			async readUint8Array(e, t) {
				const n = new FileReader();
				return new Promise((r, o) => {
					(n.onload = e => r(new Uint8Array(e.target.result))), (n.onerror = () => o(n.error)), n.readAsArrayBuffer(this.blob.slice(e, e + t));
				});
			}
		}
		class L extends A {
			constructor(e, t) {
				super(),
					(this.url = e),
					(this.preventHeadRequest = t.preventHeadRequest),
					(this.useRangeHeader = t.useRangeHeader),
					(this.forceRangeRequests = t.forceRangeRequests),
					(this.options = Object.assign({}, t)),
					delete this.options.preventHeadRequest,
					delete this.options.useRangeHeader,
					delete this.options.forceRangeRequests,
					delete this.options.useXHR;
			}
			async init() {
				if ((super.init(), V(this.url) && !this.preventHeadRequest)) {
					const e = await N(P, this.url, this.options);
					if (((this.size = Number(e.headers.get(D))), !this.forceRangeRequests && this.useRangeHeader && e.headers.get(O) != M)) throw new Error(j);
					void 0 === this.size && (await R(this, this.options));
				} else await R(this, this.options);
			}
			async readUint8Array(e, t) {
				if (this.useRangeHeader) {
					const n = await N(B, this.url, this.options, Object.assign({}, this.options.headers, { HEADER_RANGE: 'bytes=' + e + '-' + (e + t - 1) }));
					if (206 != n.status) throw new Error(j);
					return new Uint8Array(await n.arrayBuffer());
				}
				return this.data || (await R(this, this.options)), new Uint8Array(this.data.subarray(e, e + t));
			}
		}
		async function R(e, t) {
			const n = await N(B, e.url, t);
			(e.data = new Uint8Array(await n.arrayBuffer())), e.size || (e.size = e.data.length);
		}
		async function N(e, t, n, r) {
			r = Object.assign({}, n.headers, r);
			const o = await fetch(t, Object.assign({}, n, { method: e, headers: r }));
			if (o.status < 400) return o;
			throw new Error(E + (o.statusText || o.status));
		}
		class z extends A {
			constructor(e, t) {
				super(),
					(this.url = e),
					(this.preventHeadRequest = t.preventHeadRequest),
					(this.useRangeHeader = t.useRangeHeader),
					(this.forceRangeRequests = t.forceRangeRequests);
			}
			async init() {
				if ((super.init(), V(this.url) && !this.preventHeadRequest))
					return new Promise((e, t) =>
						U(
							P,
							this.url,
							n => {
								(this.size = Number(n.getResponseHeader(D))),
									this.useRangeHeader
										? this.forceRangeRequests || n.getResponseHeader(O) == M
											? e()
											: t(new Error(j))
										: void 0 === this.size
											? F(this, this.url)
													.then(() => e())
													.catch(t)
											: e();
							},
							t
						)
					);
				await F(this, this.url);
			}
			async readUint8Array(e, t) {
				if (!this.useRangeHeader) return this.data || (await F(this, this.url)), new Uint8Array(this.data.subarray(e, e + t));
				if (206 != (await new Promise((n, r) => U(B, this.url, e => n(new Uint8Array(e.response)), r, [['Range', 'bytes=' + e + '-' + (e + t - 1)]]))).status)
					throw new Error(j);
			}
		}
		function F(e, t) {
			return new Promise((n, r) =>
				U(
					B,
					t,
					t => {
						(e.data = new Uint8Array(t.response)), e.size || (e.size = e.data.length), n();
					},
					r
				)
			);
		}
		function U(e, t, n, r, o = []) {
			const i = new XMLHttpRequest();
			return (
				i.addEventListener(
					'load',
					() => {
						i.status < 400 ? n(i) : r(E + (i.statusText || i.status));
					},
					!1
				),
				i.addEventListener('error', r, !1),
				i.open(e, t),
				o.forEach(e => i.setRequestHeader(e[0], e[1])),
				(i.responseType = 'arraybuffer'),
				i.send(),
				i
			);
		}
		class H extends A {
			constructor(e, t = {}) {
				super(), (this.url = e), t.useXHR ? (this.reader = new z(e, t)) : (this.reader = new L(e, t));
			}
			set size(e) {}
			get size() {
				return this.reader.size;
			}
			async init() {
				super.init(), await this.reader.init();
			}
			async readUint8Array(e, t) {
				return this.reader.readUint8Array(e, t);
			}
		}
		function V(e) {
			if ('undefined' != typeof document) {
				const t = document.createElement('a');
				return (t.href = e), 'http:' == t.protocol || 'https:' == t.protocol;
			}
			return /^https?:\/\//i.test(e);
		}
		const q = 4294967295,
			W = 33639248,
			G = 101075792,
			Y =
				'\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ '.split(
					''
				),
			X = [];
		for (let e = 0; e < 256; e++) {
			let t = e;
			for (let e = 0; e < 8; e++) 1 & t ? (t = (t >>> 1) ^ 3988292384) : (t >>>= 1);
			X[e] = t;
		}
		class $ {
			constructor(e) {
				this.crc = e || -1;
			}
			append(e) {
				let t = 0 | this.crc;
				for (let n = 0, r = 0 | e.length; n < r; n++) t = (t >>> 8) ^ X[255 & (t ^ e[n])];
				this.crc = t;
			}
			get() {
				return ~this.crc;
			}
		}
		const J = {
				concat(e, t) {
					if (0 === e.length || 0 === t.length) return e.concat(t);
					const n = e[e.length - 1],
						r = J.getPartial(n);
					return 32 === r ? e.concat(t) : J._shiftRight(t, r, 0 | n, e.slice(0, e.length - 1));
				},
				bitLength(e) {
					const t = e.length;
					if (0 === t) return 0;
					const n = e[t - 1];
					return 32 * (t - 1) + J.getPartial(n);
				},
				clamp(e, t) {
					if (32 * e.length < t) return e;
					const n = (e = e.slice(0, Math.ceil(t / 32))).length;
					return (t &= 31), n > 0 && t && (e[n - 1] = J.partial(t, e[n - 1] & (2147483648 >> (t - 1)), 1)), e;
				},
				partial: (e, t, n) => (32 === e ? t : (n ? 0 | t : t << (32 - e)) + 1099511627776 * e),
				getPartial: e => Math.round(e / 1099511627776) || 32,
				_shiftRight(e, t, n, r) {
					for (void 0 === r && (r = []); t >= 32; t -= 32) r.push(n), (n = 0);
					if (0 === t) return r.concat(e);
					for (let o = 0; o < e.length; o++) r.push(n | (e[o] >>> t)), (n = e[o] << (32 - t));
					const o = e.length ? e[e.length - 1] : 0,
						i = J.getPartial(o);
					return r.push(J.partial((t + i) & 31, t + i > 32 ? n : r.pop(), 1)), r;
				},
			},
			Q = {
				bytes: {
					fromBits(e) {
						const t = J.bitLength(e) / 8,
							n = new Uint8Array(t);
						let r;
						for (let o = 0; o < t; o++) 0 == (3 & o) && (r = e[o / 4]), (n[o] = r >>> 24), (r <<= 8);
						return n;
					},
					toBits(e) {
						const t = [];
						let n,
							r = 0;
						for (n = 0; n < e.length; n++) (r = (r << 8) | e[n]), 3 == (3 & n) && (t.push(r), (r = 0));
						return 3 & n && t.push(J.partial(8 * (3 & n), r)), t;
					},
				},
			},
			Z = {
				sha1: function (e) {
					e ? ((this._h = e._h.slice(0)), (this._buffer = e._buffer.slice(0)), (this._length = e._length)) : this.reset();
				},
			};
		Z.sha1.prototype = {
			blockSize: 512,
			reset: function () {
				const e = this;
				return (e._h = this._init.slice(0)), (e._buffer = []), (e._length = 0), e;
			},
			update: function (e) {
				const t = this;
				'string' == typeof e && (e = Q.utf8String.toBits(e));
				const n = (t._buffer = J.concat(t._buffer, e)),
					r = t._length,
					o = (t._length = r + J.bitLength(e));
				if (o > 9007199254740991) throw new Error('Cannot hash more than 2^53 - 1 bits');
				const i = new Uint32Array(n);
				let s = 0;
				for (let e = t.blockSize + r - ((t.blockSize + r) & (t.blockSize - 1)); e <= o; e += t.blockSize) t._block(i.subarray(16 * s, 16 * (s + 1))), (s += 1);
				return n.splice(0, 16 * s), t;
			},
			finalize: function () {
				const e = this;
				let t = e._buffer;
				const n = e._h;
				t = J.concat(t, [J.partial(1, 1)]);
				for (let e = t.length + 2; 15 & e; e++) t.push(0);
				for (t.push(Math.floor(e._length / 4294967296)), t.push(0 | e._length); t.length; ) e._block(t.splice(0, 16));
				return e.reset(), n;
			},
			_init: [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
			_key: [1518500249, 1859775393, 2400959708, 3395469782],
			_f: function (e, t, n, r) {
				return e <= 19 ? (t & n) | (~t & r) : e <= 39 ? t ^ n ^ r : e <= 59 ? (t & n) | (t & r) | (n & r) : e <= 79 ? t ^ n ^ r : void 0;
			},
			_S: function (e, t) {
				return (t << e) | (t >>> (32 - e));
			},
			_block: function (e) {
				const t = this,
					n = t._h,
					r = Array(80);
				for (let t = 0; t < 16; t++) r[t] = e[t];
				let o = n[0],
					i = n[1],
					s = n[2],
					a = n[3],
					l = n[4];
				for (let e = 0; e <= 79; e++) {
					e >= 16 && (r[e] = t._S(1, r[e - 3] ^ r[e - 8] ^ r[e - 14] ^ r[e - 16]));
					const n = (t._S(5, o) + t._f(e, i, s, a) + l + r[e] + t._key[Math.floor(e / 20)]) | 0;
					(l = a), (a = s), (s = t._S(30, i)), (i = o), (o = n);
				}
				(n[0] = (n[0] + o) | 0), (n[1] = (n[1] + i) | 0), (n[2] = (n[2] + s) | 0), (n[3] = (n[3] + a) | 0), (n[4] = (n[4] + l) | 0);
			},
		};
		const ee = class {
				constructor(e) {
					const t = this;
					(t._tables = [
						[[], [], [], [], []],
						[[], [], [], [], []],
					]),
						t._tables[0][0][0] || t._precompute();
					const n = t._tables[0][4],
						r = t._tables[1],
						o = e.length;
					let i,
						s,
						a,
						l = 1;
					if (4 !== o && 6 !== o && 8 !== o) throw new Error('invalid aes key size');
					for (t._key = [(s = e.slice(0)), (a = [])], i = o; i < 4 * o + 28; i++) {
						let e = s[i - 1];
						(i % o == 0 || (8 === o && i % o == 4)) &&
							((e = (n[e >>> 24] << 24) ^ (n[(e >> 16) & 255] << 16) ^ (n[(e >> 8) & 255] << 8) ^ n[255 & e]),
							i % o == 0 && ((e = (e << 8) ^ (e >>> 24) ^ (l << 24)), (l = (l << 1) ^ (283 * (l >> 7))))),
							(s[i] = s[i - o] ^ e);
					}
					for (let e = 0; i; e++, i--) {
						const t = s[3 & e ? i : i - 4];
						a[e] = i <= 4 || e < 4 ? t : r[0][n[t >>> 24]] ^ r[1][n[(t >> 16) & 255]] ^ r[2][n[(t >> 8) & 255]] ^ r[3][n[255 & t]];
					}
				}
				encrypt(e) {
					return this._crypt(e, 0);
				}
				decrypt(e) {
					return this._crypt(e, 1);
				}
				_precompute() {
					const e = this._tables[0],
						t = this._tables[1],
						n = e[4],
						r = t[4],
						o = [],
						i = [];
					let s, a, l, c;
					for (let e = 0; e < 256; e++) i[(o[e] = (e << 1) ^ (283 * (e >> 7))) ^ e] = e;
					for (let u = (s = 0); !n[u]; u ^= a || 1, s = i[s] || 1) {
						let i = s ^ (s << 1) ^ (s << 2) ^ (s << 3) ^ (s << 4);
						(i = (i >> 8) ^ (255 & i) ^ 99), (n[u] = i), (r[i] = u), (c = o[(l = o[(a = o[u])])]);
						let d = (16843009 * c) ^ (65537 * l) ^ (257 * a) ^ (16843008 * u),
							f = (257 * o[i]) ^ (16843008 * i);
						for (let n = 0; n < 4; n++) (e[n][u] = f = (f << 24) ^ (f >>> 8)), (t[n][i] = d = (d << 24) ^ (d >>> 8));
					}
					for (let n = 0; n < 5; n++) (e[n] = e[n].slice(0)), (t[n] = t[n].slice(0));
				}
				_crypt(e, t) {
					if (4 !== e.length) throw new Error('invalid aes block size');
					const n = this._key[t],
						r = n.length / 4 - 2,
						o = [0, 0, 0, 0],
						i = this._tables[t],
						s = i[0],
						a = i[1],
						l = i[2],
						c = i[3],
						u = i[4];
					let d,
						f,
						p,
						h = e[0] ^ n[0],
						m = e[t ? 3 : 1] ^ n[1],
						y = e[2] ^ n[2],
						v = e[t ? 1 : 3] ^ n[3],
						g = 4;
					for (let e = 0; e < r; e++)
						(d = s[h >>> 24] ^ a[(m >> 16) & 255] ^ l[(y >> 8) & 255] ^ c[255 & v] ^ n[g]),
							(f = s[m >>> 24] ^ a[(y >> 16) & 255] ^ l[(v >> 8) & 255] ^ c[255 & h] ^ n[g + 1]),
							(p = s[y >>> 24] ^ a[(v >> 16) & 255] ^ l[(h >> 8) & 255] ^ c[255 & m] ^ n[g + 2]),
							(v = s[v >>> 24] ^ a[(h >> 16) & 255] ^ l[(m >> 8) & 255] ^ c[255 & y] ^ n[g + 3]),
							(g += 4),
							(h = d),
							(m = f),
							(y = p);
					for (let e = 0; e < 4; e++)
						(o[t ? 3 & -e : e] = (u[h >>> 24] << 24) ^ (u[(m >> 16) & 255] << 16) ^ (u[(y >> 8) & 255] << 8) ^ u[255 & v] ^ n[g++]),
							(d = h),
							(h = m),
							(m = y),
							(y = v),
							(v = d);
					return o;
				}
			},
			te = class {
				constructor(e, t) {
					(this._prf = e), (this._initIv = t), (this._iv = t);
				}
				reset() {
					this._iv = this._initIv;
				}
				update(e) {
					return this.calculate(this._prf, e, this._iv);
				}
				incWord(e) {
					if (255 == ((e >> 24) & 255)) {
						let t = (e >> 16) & 255,
							n = (e >> 8) & 255,
							r = 255 & e;
						255 === t ? ((t = 0), 255 === n ? ((n = 0), 255 === r ? (r = 0) : ++r) : ++n) : ++t, (e = 0), (e += t << 16), (e += n << 8), (e += r);
					} else e += 1 << 24;
					return e;
				}
				incCounter(e) {
					0 === (e[0] = this.incWord(e[0])) && (e[1] = this.incWord(e[1]));
				}
				calculate(e, t, n) {
					let r;
					if (!(r = t.length)) return [];
					const o = J.bitLength(t);
					for (let o = 0; o < r; o += 4) {
						this.incCounter(n);
						const r = e.encrypt(n);
						(t[o] ^= r[0]), (t[o + 1] ^= r[1]), (t[o + 2] ^= r[2]), (t[o + 3] ^= r[3]);
					}
					return J.clamp(t, o);
				}
			},
			ne = class {
				constructor(e) {
					const t = this,
						n = (t._hash = Z.sha1),
						r = [[], []],
						o = n.prototype.blockSize / 32;
					(t._baseHash = [new n(), new n()]), e.length > o && (e = n.hash(e));
					for (let t = 0; t < o; t++) (r[0][t] = 909522486 ^ e[t]), (r[1][t] = 1549556828 ^ e[t]);
					t._baseHash[0].update(r[0]), t._baseHash[1].update(r[1]), (t._resultHash = new n(t._baseHash[0]));
				}
				reset() {
					const e = this;
					(e._resultHash = new e._hash(e._baseHash[0])), (e._updated = !1);
				}
				update(e) {
					(this._updated = !0), this._resultHash.update(e);
				}
				digest() {
					const e = this,
						t = e._resultHash.finalize(),
						n = new e._hash(e._baseHash[1]).update(t).finalize();
					return e.reset(), n;
				}
			},
			re = 'Invalid pasword',
			oe = 16,
			ie = { name: 'PBKDF2' },
			se = Object.assign({ hash: { name: 'HMAC' } }, ie),
			ae = Object.assign({ iterations: 1e3, hash: { name: 'SHA-1' } }, ie),
			le = ['deriveBits'],
			ce = [8, 12, 16],
			ue = [16, 24, 32],
			de = 10,
			fe = [0, 0, 0, 0],
			pe = Q.bytes,
			he = ee,
			me = te,
			ye = ne;
		class ve {
			constructor(e, t, n) {
				Object.assign(this, { password: e, signed: t, strength: n - 1, pendingInput: new Uint8Array(0) });
			}
			async append(e) {
				const t = this;
				if (t.password) {
					const n = xe(e, 0, ce[t.strength] + 2);
					await (async function (e, t, n) {
						await we(e, n, xe(t, 0, ce[e.strength]));
						const r = xe(t, ce[e.strength]),
							o = e.keys.passwordVerification;
						if (o[0] != r[0] || o[1] != r[1]) throw new Error(re);
					})(t, n, t.password),
						(t.password = null),
						(t.aesCtrGladman = new me(new he(t.keys.key), Array.from(fe))),
						(t.hmac = new ye(t.keys.authentication)),
						(e = xe(e, ce[t.strength] + 2));
				}
				return be(t, e, new Uint8Array(e.length - de - ((e.length - de) % oe)), 0, de, !0);
			}
			flush() {
				const e = this,
					t = e.pendingInput,
					n = xe(t, 0, t.length - de),
					r = xe(t, t.length - de);
				let o = new Uint8Array(0);
				if (n.length) {
					const t = pe.toBits(n);
					e.hmac.update(t);
					const r = e.aesCtrGladman.update(t);
					o = pe.fromBits(r);
				}
				let i = !0;
				if (e.signed) {
					const t = xe(pe.fromBits(e.hmac.digest()), 0, de);
					for (let e = 0; e < de; e++) t[e] != r[e] && (i = !1);
				}
				return { valid: i, data: o };
			}
		}
		class ge {
			constructor(e, t) {
				Object.assign(this, { password: e, strength: t - 1, pendingInput: new Uint8Array(0) });
			}
			async append(e) {
				const t = this;
				let n = new Uint8Array(0);
				t.password &&
					((n = await (async function (e, t) {
						const n = crypto.getRandomValues(new Uint8Array(ce[e.strength]));
						return await we(e, t, n), _e(n, e.keys.passwordVerification);
					})(t, t.password)),
					(t.password = null),
					(t.aesCtrGladman = new me(new he(t.keys.key), Array.from(fe))),
					(t.hmac = new ye(t.keys.authentication)));
				const r = new Uint8Array(n.length + e.length - (e.length % oe));
				return r.set(n, 0), be(t, e, r, n.length, 0);
			}
			flush() {
				const e = this;
				let t = new Uint8Array(0);
				if (e.pendingInput.length) {
					const n = e.aesCtrGladman.update(pe.toBits(e.pendingInput));
					e.hmac.update(n), (t = pe.fromBits(n));
				}
				const n = xe(pe.fromBits(e.hmac.digest()), 0, de);
				return { data: _e(t, n), signature: n };
			}
		}
		function be(e, t, n, r, o, i) {
			const s = t.length - o;
			let a;
			for (
				e.pendingInput.length &&
					((t = _e(e.pendingInput, t)),
					(n = (function (e, t) {
						if (t && t > e.length) {
							const n = e;
							(e = new Uint8Array(t)).set(n, 0);
						}
						return e;
					})(n, s - (s % oe)))),
					a = 0;
				a <= s - oe;
				a += oe
			) {
				const o = pe.toBits(xe(t, a, a + oe));
				i && e.hmac.update(o);
				const s = e.aesCtrGladman.update(o);
				i || e.hmac.update(s), n.set(pe.fromBits(s), a + r);
			}
			return (e.pendingInput = xe(t, a)), n;
		}
		async function we(e, t, n) {
			const r = new TextEncoder().encode(t),
				o = await crypto.subtle.importKey('raw', r, se, !1, le),
				i = await crypto.subtle.deriveBits(Object.assign({ salt: n }, ae), o, 8 * (2 * ue[e.strength] + 2)),
				s = new Uint8Array(i);
			e.keys = {
				key: pe.toBits(xe(s, 0, ue[e.strength])),
				authentication: pe.toBits(xe(s, ue[e.strength], 2 * ue[e.strength])),
				passwordVerification: xe(s, 2 * ue[e.strength]),
			};
		}
		function _e(e, t) {
			let n = e;
			return e.length + t.length && ((n = new Uint8Array(e.length + t.length)), n.set(e, 0), n.set(t, e.length)), n;
		}
		function xe(e, t, n) {
			return e.subarray(t, n);
		}
		class ke {
			constructor(e, t) {
				Object.assign(this, { password: e, passwordVerification: t }), Se(this, e);
			}
			append(e) {
				const t = this;
				if (t.password) {
					const n = Ee(t, e.subarray(0, 12));
					if (((t.password = null), n[11] != t.passwordVerification)) throw new Error(re);
					e = e.subarray(12);
				}
				return Ee(t, e);
			}
			flush() {
				return { valid: !0, data: new Uint8Array(0) };
			}
		}
		class Ce {
			constructor(e, t) {
				Object.assign(this, { password: e, passwordVerification: t }), Se(this, e);
			}
			append(e) {
				const t = this;
				let n, r;
				if (t.password) {
					t.password = null;
					const o = crypto.getRandomValues(new Uint8Array(12));
					(o[11] = t.passwordVerification), (n = new Uint8Array(e.length + o.length)), n.set(je(t, o), 0), (r = 12);
				} else (n = new Uint8Array(e.length)), (r = 0);
				return n.set(je(t, e), r), n;
			}
			flush() {
				return { data: new Uint8Array(0) };
			}
		}
		function Ee(e, t) {
			const n = new Uint8Array(t.length);
			for (let r = 0; r < t.length; r++) (n[r] = Oe(e) ^ t[r]), De(e, n[r]);
			return n;
		}
		function je(e, t) {
			const n = new Uint8Array(t.length);
			for (let r = 0; r < t.length; r++) (n[r] = Oe(e) ^ t[r]), De(e, t[r]);
			return n;
		}
		function Se(e, t) {
			(e.keys = [305419896, 591751049, 878082192]), (e.crcKey0 = new $(e.keys[0])), (e.crcKey2 = new $(e.keys[2]));
			for (let n = 0; n < t.length; n++) De(e, t.charCodeAt(n));
		}
		function De(e, t) {
			e.crcKey0.append([t]),
				(e.keys[0] = ~e.crcKey0.get()),
				(e.keys[1] = Be(e.keys[1] + Pe(e.keys[0]))),
				(e.keys[1] = Be(Math.imul(e.keys[1], 134775813) + 1)),
				e.crcKey2.append([e.keys[1] >>> 24]),
				(e.keys[2] = ~e.crcKey2.get());
		}
		function Oe(e) {
			const t = 2 | e.keys[2];
			return Pe(Math.imul(t, 1 ^ t) >>> 8);
		}
		function Pe(e) {
			return 255 & e;
		}
		function Be(e) {
			return 4294967295 & e;
		}
		const Me = 'inflate',
			Ie = 'Invalid signature';
		class Ae {
			constructor(e, { signature: t, password: n, signed: r, compressed: o, zipCrypto: i, passwordVerification: s, encryptionStrength: a }, { chunkSize: l }) {
				const c = Boolean(n);
				Object.assign(this, {
					signature: t,
					encrypted: c,
					signed: r,
					compressed: o,
					inflate: o && new e({ chunkSize: l }),
					crc32: r && new $(),
					zipCrypto: i,
					decrypt: c && i ? new ke(n, s) : new ve(n, r, a),
				});
			}
			async append(e) {
				const t = this;
				return (
					t.encrypted && e.length && (e = await t.decrypt.append(e)),
					t.compressed && e.length && (e = await t.inflate.append(e)),
					(!t.encrypted || t.zipCrypto) && t.signed && e.length && t.crc32.append(e),
					e
				);
			}
			async flush() {
				const e = this;
				let t,
					n = new Uint8Array(0);
				if (e.encrypted) {
					const t = e.decrypt.flush();
					if (!t.valid) throw new Error(Ie);
					n = t.data;
				}
				if ((!e.encrypted || e.zipCrypto) && e.signed) {
					const n = new DataView(new Uint8Array(4).buffer);
					if (((t = e.crc32.get()), n.setUint32(0, t), e.signature != n.getUint32(0, !1))) throw new Error(Ie);
				}
				return e.compressed && ((n = (await e.inflate.append(n)) || new Uint8Array(0)), await e.inflate.flush()), { data: n, signature: t };
			}
		}
		class Te {
			constructor(e, { encrypted: t, signed: n, compressed: r, level: o, zipCrypto: i, password: s, passwordVerification: a, encryptionStrength: l }, { chunkSize: c }) {
				Object.assign(this, {
					encrypted: t,
					signed: n,
					compressed: r,
					deflate: r && new e({ level: o || 5, chunkSize: c }),
					crc32: n && new $(),
					zipCrypto: i,
					encrypt: t && i ? new Ce(s, a) : new ge(s, l),
				});
			}
			async append(e) {
				const t = this;
				let n = e;
				return (
					t.compressed && e.length && (n = await t.deflate.append(e)),
					t.encrypted && n.length && (n = await t.encrypt.append(n)),
					(!t.encrypted || t.zipCrypto) && t.signed && e.length && t.crc32.append(e),
					n
				);
			}
			async flush() {
				const e = this;
				let t,
					n = new Uint8Array(0);
				if ((e.compressed && (n = (await e.deflate.flush()) || new Uint8Array(0)), e.encrypted)) {
					n = await e.encrypt.append(n);
					const r = e.encrypt.flush();
					t = r.signature;
					const o = new Uint8Array(n.length + r.data.length);
					o.set(n, 0), o.set(r.data, n.length), (n = o);
				}
				return (e.encrypted && !e.zipCrypto) || !e.signed || (t = e.crc32.get()), { data: n, signature: t };
			}
		}
		const Ke = 'init',
			Le = 'append',
			Re = 'flush';
		let Ne = !0;
		var ze = (e, t, n, r, o, i, s) => (
			Object.assign(e, {
				busy: !0,
				codecConstructor: t,
				options: Object.assign({}, n),
				scripts: s,
				terminate() {
					e.worker && !e.busy && (e.worker.terminate(), (e.interface = null));
				},
				onTaskFinished() {
					(e.busy = !1), o(e);
				},
			}),
			i
				? (function (e, t) {
						let n;
						const r = { type: 'module' };
						if (!e.interface) {
							if (Ne)
								try {
									e.worker = o();
								} catch (t) {
									(Ne = !1), (e.worker = o(r));
								}
							else e.worker = o(r);
							e.worker.addEventListener(
								'message',
								function (t) {
									const r = t.data;
									if (n) {
										const t = r.error,
											o = r.type;
										if (t) {
											const r = new Error(t.message);
											(r.stack = t.stack), n.reject(r), (n = null), e.onTaskFinished();
										} else if (o == Ke || o == Re || o == Le) {
											const t = r.data;
											o == Re
												? (n.resolve({ data: new Uint8Array(t), signature: r.signature }), (n = null), e.onTaskFinished())
												: n.resolve(t && new Uint8Array(t));
										}
									}
								},
								!1
							),
								(e.interface = { append: e => i({ type: Le, data: e }), flush: () => i({ type: Re }) });
						}
						return e.interface;
						function o(t = {}) {
							return new Worker(
								new URL(
									e.scripts[0],
									'undefined' == typeof document && 'undefined' == typeof location
										? new (require('url').URL)('file:' + __filename).href
										: 'undefined' == typeof document
											? location.href
											: (document.currentScript && document.currentScript.src) || new URL('zip-no-worker-inflate.min.js', document.baseURI).href
								),
								t
							);
						}
						async function i(r) {
							if (!n) {
								const n = e.options,
									r = e.scripts.slice(1);
								await s({ scripts: r, type: Ke, options: n, config: { chunkSize: t.chunkSize } });
							}
							return s(r);
						}
						function s(t) {
							const r = e.worker,
								o = new Promise((e, t) => (n = { resolve: e, reject: t }));
							try {
								if (t.data)
									try {
										(t.data = t.data.buffer), r.postMessage(t, [t.data]);
									} catch (e) {
										r.postMessage(t);
									}
								else r.postMessage(t);
							} catch (t) {
								n.reject(t), (n = null), e.onTaskFinished();
							}
							return o;
						}
					})(e, r)
				: (function (e, t) {
						const n = (function (e, t, n) {
							return t.codecType.startsWith('deflate') ? new Te(e, t, n) : t.codecType.startsWith(Me) ? new Ae(e, t, n) : void 0;
						})(e.codecConstructor, e.options, t);
						return {
							async append(t) {
								try {
									return await n.append(t);
								} catch (t) {
									throw (e.onTaskFinished(), t);
								}
							},
							async flush() {
								try {
									return await n.flush();
								} finally {
									e.onTaskFinished();
								}
							},
						};
					})(e, r)
		);
		let Fe = [],
			Ue = [];
		function He(e) {
			e.terminateTimeout && (clearTimeout(e.terminateTimeout), (e.terminateTimeout = null));
		}
		const Ve = [
			'filename',
			'rawFilename',
			'directory',
			'encrypted',
			'compressedSize',
			'uncompressedSize',
			'lastModDate',
			'rawLastModDate',
			'comment',
			'rawComment',
			'signature',
			'extraField',
			'rawExtraField',
			'bitFlag',
			'extraFieldZip64',
			'extraFieldUnicodePath',
			'extraFieldUnicodeComment',
			'extraFieldAES',
			'filenameUTF8',
			'commentUTF8',
			'offset',
			'zip64',
			'compressionMethod',
			'extraFieldNTFS',
			'lastAccessDate',
			'creationDate',
			'extraFieldExtendedTimestamp',
			'version',
			'versionMadeBy',
			'msDosCompatible',
			'internalFileAttribute',
			'externalFileAttribute',
		];
		class qe {
			constructor(e) {
				Ve.forEach(t => (this[t] = e[t]));
			}
		}
		const We = 'File format is not recognized',
			Ge = 'End of central directory not found',
			Ye = 'End of Zip64 central directory not found',
			Xe = 'End of Zip64 central directory locator not found',
			$e = 'Central directory header not found',
			Je = 'Local file header not found',
			Qe = 'Zip64 extra field not found',
			Ze = 'File contains encrypted entry',
			et = 'Encryption method not supported',
			tt = 'Compression method not supported',
			nt = 'utf-8',
			rt = ['uncompressedSize', 'compressedSize', 'offset'];
		class ot {
			constructor(e, t, n) {
				Object.assign(this, { reader: e, config: t, options: n });
			}
			async getData(e, t, n = {}) {
				const r = this,
					{ reader: o, offset: i, extraFieldAES: s, compressionMethod: a, config: l, bitFlag: c, signature: u, rawLastModDate: d, compressedSize: f } = r,
					p = (r.localDirectory = {});
				o.initialized || (await o.init());
				let h = await vt(o, i, 30);
				const m = yt(h);
				let y = lt(r, n, 'password');
				if (((y = y && y.length && y), s && 99 != s.originalCompressionMethod)) throw new Error(tt);
				if (0 != a && 8 != a) throw new Error(tt);
				if (67324752 != ht(m, 0)) throw new Error(Je);
				it(p, m, 4),
					(h = await vt(o, i, 30 + p.filenameLength + p.extraFieldLength)),
					(p.rawExtraField = h.subarray(30 + p.filenameLength)),
					st(r, p, m, 4),
					(t.lastAccessDate = p.lastAccessDate),
					(t.creationDate = p.creationDate);
				const v = r.encrypted && p.encrypted,
					g = v && !s;
				if (v) {
					if (!g && void 0 === s.strength) throw new Error(et);
					if (!y) throw new Error(Ze);
				}
				const b = await (function (e, t, n) {
					const r = !(!t.compressed && !t.signed && !t.encrypted) && (t.useWebWorkers || (void 0 === t.useWebWorkers && n.useWebWorkers)),
						o = r && n.workerScripts ? n.workerScripts[t.codecType] : [];
					if (Fe.length < n.maxWorkers) {
						const s = {};
						return Fe.push(s), ze(s, e, t, n, i, r, o);
					}
					{
						const s = Fe.find(e => !e.busy);
						return s ? (He(s), ze(s, e, t, n, i, r, o)) : new Promise(n => Ue.push({ resolve: n, codecConstructor: e, options: t, webWorker: r, scripts: o }));
					}
					function i(e) {
						if (Ue.length) {
							const [{ resolve: t, codecConstructor: r, options: o, webWorker: s, scripts: a }] = Ue.splice(0, 1);
							t(ze(e, r, o, n, i, s, a));
						} else
							e.worker
								? (He(e),
									Number.isFinite(n.terminateWorkerTimeout) &&
										n.terminateWorkerTimeout >= 0 &&
										(e.terminateTimeout = setTimeout(() => {
											(Fe = Fe.filter(t => t != e)), e.terminate();
										}, n.terminateWorkerTimeout)))
								: (Fe = Fe.filter(t => t != e));
					}
				})(
					l.Inflate,
					{
						codecType: Me,
						password: y,
						zipCrypto: g,
						encryptionStrength: s && s.strength,
						signed: lt(r, n, 'checkSignature'),
						passwordVerification: g && (c.dataDescriptor ? (d >>> 8) & 255 : (u >>> 24) & 255),
						signature: u,
						compressed: 0 != a,
						encrypted: v,
						useWebWorkers: lt(r, n, 'useWebWorkers'),
					},
					l
				);
				e.initialized || (await e.init());
				const w = lt(r, n, 'signal'),
					_ = i + 30 + p.filenameLength + p.extraFieldLength;
				return (
					await (async function (e, t, n, r, o, i, s) {
						const a = Math.max(i.chunkSize, 64);
						return (async function i(l = 0, c = 0) {
							const u = s.signal;
							if (l < o) {
								k(u, e);
								const d = await t.readUint8Array(l + r, Math.min(a, o - l)),
									f = d.length;
								k(u, e);
								const p = await e.append(d);
								if ((k(u, e), (c += await C(n, p)), s.onprogress))
									try {
										s.onprogress(l + f, o);
									} catch (e) {}
								return i(l + a, c);
							}
							{
								const t = await e.flush();
								return (c += await C(n, t.data)), { signature: t.signature, length: c };
							}
						})();
					})(b, o, e, _, f, l, { onprogress: n.onprogress, signal: w }),
					e.getData()
				);
			}
		}
		function it(e, t, n) {
			const r = (e.rawBitFlag = pt(t, n + 2)),
				o = 1 == (1 & r),
				i = ht(t, n + 6);
			Object.assign(e, {
				encrypted: o,
				version: pt(t, n),
				bitFlag: { level: (6 & r) >> 1, dataDescriptor: 8 == (8 & r), languageEncodingFlag: 2048 == (2048 & r) },
				rawLastModDate: i,
				lastModDate: ut(i),
				filenameLength: pt(t, n + 22),
				extraFieldLength: pt(t, n + 24),
			});
		}
		function st(e, t, n, r) {
			const o = t.rawExtraField,
				i = (t.extraField = new Map()),
				s = yt(new Uint8Array(o));
			let a = 0;
			try {
				for (; a < o.length; ) {
					const e = pt(s, a),
						t = pt(s, a + 2);
					i.set(e, { type: e, data: o.slice(a + 4, a + 4 + t) }), (a += 4 + t);
				}
			} catch (e) {}
			const l = pt(n, r + 4);
			(t.signature = ht(n, r + 10)), (t.uncompressedSize = ht(n, r + 18)), (t.compressedSize = ht(n, r + 14));
			const c = i.get(1);
			c &&
				((function (e, t) {
					t.zip64 = !0;
					const n = yt(e.data);
					e.values = [];
					for (let t = 0; t < Math.floor(e.data.length / 8); t++) e.values.push(mt(n, 0 + 8 * t));
					const r = rt.filter(e => t[e] == q);
					for (let t = 0; t < r.length; t++) e[r[t]] = e.values[t];
					rt.forEach(n => {
						if (t[n] == q) {
							if (void 0 === e[n]) throw new Error(Qe);
							t[n] = e[n];
						}
					});
				})(c, t),
				(t.extraFieldZip64 = c));
			const u = i.get(28789);
			u && (at(u, 'filename', 'rawFilename', t, e), (t.extraFieldUnicodePath = u));
			const d = i.get(25461);
			d && (at(d, 'comment', 'rawComment', t, e), (t.extraFieldUnicodeComment = d));
			const f = i.get(39169);
			f
				? ((function (e, t, n) {
						const r = yt(e.data);
						(e.vendorVersion = ft(r, 0)), (e.vendorId = ft(r, 2));
						const o = ft(r, 4);
						(e.strength = o), (e.originalCompressionMethod = n), (t.compressionMethod = e.compressionMethod = pt(r, 5));
					})(f, t, l),
					(t.extraFieldAES = f))
				: (t.compressionMethod = l);
			const p = i.get(10);
			p &&
				((function (e, t) {
					const n = yt(e.data);
					let r,
						o = 4;
					try {
						for (; o < e.data.length && !r; ) {
							const t = pt(n, o),
								i = pt(n, o + 2);
							1 == t && (r = e.data.slice(o + 4, o + 4 + i)), (o += 4 + i);
						}
					} catch (e) {}
					try {
						if (r && 24 == r.length) {
							const n = yt(r),
								o = n.getBigUint64(0, !0),
								i = n.getBigUint64(8, !0),
								s = n.getBigUint64(16, !0);
							Object.assign(e, { rawLastModDate: o, rawLastAccessDate: i, rawCreationDate: s });
							const a = dt(o),
								l = { lastModDate: a, lastAccessDate: dt(i), creationDate: dt(s) };
							Object.assign(e, l), Object.assign(t, l);
						}
					} catch (e) {}
				})(p, t),
				(t.extraFieldNTFS = p));
			const h = i.get(21589);
			h &&
				((function (e, t) {
					const n = yt(e.data),
						r = ft(n, 0),
						o = [],
						i = [];
					1 == (1 & r) && (o.push('lastModDate'), i.push('rawLastModDate')),
						2 == (2 & r) && (o.push('lastAccessDate'), i.push('rawLastAccessDate')),
						4 == (4 & r) && (o.push('creationDate'), i.push('rawCreationDate'));
					let s = 1;
					o.forEach((r, o) => {
						if (e.data.length >= s + 4) {
							const a = ht(n, s);
							t[r] = e[r] = new Date(1e3 * a);
							const l = i[o];
							e[l] = a;
						}
						s += 4;
					});
				})(h, t),
				(t.extraFieldExtendedTimestamp = h));
		}
		function at(e, t, n, r, o) {
			const i = yt(e.data);
			(e.version = ft(i, 0)), (e.signature = ht(i, 1));
			const s = new $();
			s.append(o[n]);
			const a = yt(new Uint8Array(4));
			a.setUint32(0, s.get(), !0),
				(e[t] = new TextDecoder().decode(e.data.subarray(5))),
				(e.valid = !o.bitFlag.languageEncodingFlag && e.signature == ht(a, 0)),
				e.valid && ((r[t] = e[t]), (r[t + 'UTF8'] = !0));
		}
		function lt(e, t, n) {
			return void 0 === t[n] ? e.options[n] : t[n];
		}
		function ct(e, t) {
			return t && 'cp437' != t.trim().toLowerCase()
				? new TextDecoder(t).decode(e)
				: (e => {
						let t = '';
						for (let n = 0; n < e.length; n++) t += Y[e[n]];
						return t;
					})(e);
		}
		function ut(e) {
			const t = (4294901760 & e) >> 16,
				n = 65535 & e;
			try {
				return new Date(1980 + ((65024 & t) >> 9), ((480 & t) >> 5) - 1, 31 & t, (63488 & n) >> 11, (2016 & n) >> 5, 2 * (31 & n), 0);
			} catch (e) {}
		}
		function dt(e) {
			return new Date(Number(e / BigInt(1e4) - BigInt(116444736e5)));
		}
		function ft(e, t) {
			return e.getUint8(t);
		}
		function pt(e, t) {
			return e.getUint16(t, !0);
		}
		function ht(e, t) {
			return e.getUint32(t, !0);
		}
		function mt(e, t) {
			return Number(e.getBigUint64(t, !0));
		}
		function yt(e) {
			return new DataView(e.buffer);
		}
		function vt(e, t, n) {
			return e.readUint8Array(t, n);
		}
		_({
			Inflate: function (e) {
				const t = new g(),
					n = e && e.chunkSize ? Math.floor(2 * e.chunkSize) : 131072,
					o = new Uint8Array(n);
				let i = !1;
				t.inflateInit(),
					(t.next_out = o),
					(this.append = function (e, s) {
						const a = [];
						let l,
							c,
							u = 0,
							d = 0,
							f = 0;
						if (0 !== e.length) {
							(t.next_in_index = 0), (t.next_in = e), (t.avail_in = e.length);
							do {
								if (((t.next_out_index = 0), (t.avail_out = n), 0 !== t.avail_in || i || ((t.next_in_index = 0), (i = !0)), (l = t.inflate(0)), i && l === r)) {
									if (0 !== t.avail_in) throw new Error('inflating: bad input');
								} else if (0 !== l && 1 !== l) throw new Error('inflating: ' + t.msg);
								if ((i || 1 === l) && t.avail_in === e.length) throw new Error('inflating: bad input');
								t.next_out_index && (t.next_out_index === n ? a.push(new Uint8Array(o)) : a.push(o.slice(0, t.next_out_index))),
									(f += t.next_out_index),
									s && t.next_in_index > 0 && t.next_in_index != u && (s(t.next_in_index), (u = t.next_in_index));
							} while (t.avail_in > 0 || 0 === t.avail_out);
							return (
								a.length > 1
									? ((c = new Uint8Array(f)),
										a.forEach(function (e) {
											c.set(e, d), (d += e.length);
										}))
									: (c = a[0] || new Uint8Array(0)),
								c
							);
						}
					}),
					(this.flush = function () {
						t.inflateEnd();
					});
			},
		}),
			(e.BlobReader = K),
			(e.BlobWriter = class extends T {
				constructor(e) {
					super(), (this.offset = 0), (this.contentType = e), (this.blob = new Blob([], { type: e }));
				}
				async writeUint8Array(e) {
					super.writeUint8Array(e), (this.blob = new Blob([this.blob, e.buffer], { type: this.contentType })), (this.offset = this.blob.size);
				}
				getData() {
					return this.blob;
				}
			}),
			(e.Data64URIReader = class extends A {
				constructor(e) {
					super(), (this.dataURI = e);
					let t = e.length;
					for (; '=' == e.charAt(t - 1); ) t--;
					(this.dataStart = e.indexOf(',') + 1), (this.size = Math.floor(0.75 * (t - this.dataStart)));
				}
				async readUint8Array(e, t) {
					const n = new Uint8Array(t),
						r = 4 * Math.floor(e / 3),
						o = atob(this.dataURI.substring(r + this.dataStart, 4 * Math.ceil((e + t) / 3) + this.dataStart)),
						i = e - 3 * Math.floor(r / 4);
					for (let e = i; e < i + t; e++) n[e - i] = o.charCodeAt(e);
					return n;
				}
			}),
			(e.Data64URIWriter = class extends T {
				constructor(e) {
					super(), (this.data = 'data:' + (e || '') + ';base64,'), (this.pending = []);
				}
				async writeUint8Array(e) {
					super.writeUint8Array(e);
					let t = 0,
						n = this.pending;
					const r = this.pending.length;
					for (this.pending = '', t = 0; t < 3 * Math.floor((r + e.length) / 3) - r; t++) n += String.fromCharCode(e[t]);
					for (; t < e.length; t++) this.pending += String.fromCharCode(e[t]);
					n.length > 2 ? (this.data += btoa(n)) : (this.pending = n);
				}
				getData() {
					return this.data + btoa(this.pending);
				}
			}),
			(e.ERR_ABORT = x),
			(e.ERR_BAD_FORMAT = We),
			(e.ERR_CENTRAL_DIRECTORY_NOT_FOUND = $e),
			(e.ERR_ENCRYPTED = Ze),
			(e.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = Xe),
			(e.ERR_EOCDR_NOT_FOUND = Ge),
			(e.ERR_EOCDR_ZIP64_NOT_FOUND = Ye),
			(e.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = Qe),
			(e.ERR_HTTP_RANGE = j),
			(e.ERR_INVALID_PASSWORD = re),
			(e.ERR_INVALID_SIGNATURE = Ie),
			(e.ERR_LOCAL_FILE_HEADER_NOT_FOUND = Je),
			(e.ERR_UNSUPPORTED_COMPRESSION = tt),
			(e.ERR_UNSUPPORTED_ENCRYPTION = et),
			(e.HttpRangeReader = class extends H {
				constructor(e, t = {}) {
					(t.useRangeHeader = !0), super(e, t);
				}
			}),
			(e.HttpReader = H),
			(e.Reader = A),
			(e.TextReader = class extends A {
				constructor(e) {
					super(), (this.blobReader = new K(new Blob([e], { type: S })));
				}
				async init() {
					super.init(), this.blobReader.init(), (this.size = this.blobReader.size);
				}
				async readUint8Array(e, t) {
					return this.blobReader.readUint8Array(e, t);
				}
			}),
			(e.TextWriter = class extends T {
				constructor(e) {
					super(), (this.encoding = e), (this.blob = new Blob([], { type: S }));
				}
				async writeUint8Array(e) {
					super.writeUint8Array(e), (this.blob = new Blob([this.blob, e.buffer], { type: S }));
				}
				getData() {
					const e = new FileReader();
					return new Promise((t, n) => {
						(e.onload = e => t(e.target.result)), (e.onerror = () => n(e.error)), e.readAsText(this.blob, this.encoding);
					});
				}
			}),
			(e.Uint8ArrayReader = class extends A {
				constructor(e) {
					super(), (this.array = e), (this.size = e.length);
				}
				async readUint8Array(e, t) {
					return this.array.slice(e, e + t);
				}
			}),
			(e.Uint8ArrayWriter = class extends T {
				constructor() {
					super(), (this.array = new Uint8Array(0));
				}
				async writeUint8Array(e) {
					super.writeUint8Array(e);
					const t = this.array;
					(this.array = new Uint8Array(t.length + e.length)), this.array.set(t), this.array.set(e, t.length);
				}
				getData() {
					return this.array;
				}
			}),
			(e.Writer = T),
			(e.ZipReader = class {
				constructor(e, t = {}) {
					Object.assign(this, { reader: e, options: t, config: w });
				}
				async getEntries(e = {}) {
					const t = this,
						n = t.reader;
					if ((n.initialized || (await n.init()), n.size < 22)) throw new Error(We);
					const r = await (async function (e, t, n, r, o) {
						const i = new Uint8Array(4);
						!(function (e, t, n) {
							e.setUint32(0, 101010256, !0);
						})(yt(i));
						return (await s(22)) || (await s(Math.min(1048582, n)));
						async function s(t) {
							const r = n - t,
								o = await vt(e, r, t);
							for (let e = o.length - 22; e >= 0; e--)
								if (o[e] == i[0] && o[e + 1] == i[1] && o[e + 2] == i[2] && o[e + 3] == i[3]) return { offset: r + e, buffer: o.slice(e, e + 22).buffer };
						}
					})(n, 0, n.size);
					if (!r) throw new Error(Ge);
					const o = yt(r);
					let i = ht(o, 12),
						s = ht(o, 16),
						a = pt(o, 8),
						l = 0;
					if (s == q || 65535 == a) {
						const e = yt(await vt(n, r.offset - 20, 20));
						if (117853008 != ht(e, 0)) throw new Error(Ye);
						s = mt(e, 8);
						let t = await vt(n, s, 56),
							o = yt(t);
						const c = r.offset - 20 - 56;
						if (ht(o, 0) != G && s != c) {
							const e = s;
							(s = c), (l = s - e), (t = await vt(n, s, 56)), (o = yt(t));
						}
						if (ht(o, 0) != G) throw new Error(Xe);
						(a = mt(o, 24)), (i = ht(e, 4)), (s -= mt(o, 40));
					}
					if (s < 0 || s >= n.size) throw new Error(We);
					let c = 0,
						u = await vt(n, s, n.size - s),
						d = yt(u);
					const f = r.offset - i;
					if (ht(d, c) != W && s != f) {
						const e = s;
						(s = f), (l = s - e), (u = await vt(n, s, n.size - s)), (d = yt(u));
					}
					if (s < 0 || s >= n.size) throw new Error(We);
					const p = [];
					for (let r = 0; r < a; r++) {
						const o = new ot(n, t.config, t.options);
						if (ht(d, c) != W) throw new Error($e);
						it(o, d, c + 6);
						const i = Boolean(o.bitFlag.languageEncodingFlag),
							s = c + 46,
							f = s + o.filenameLength,
							h = f + o.extraFieldLength,
							m = pt(d, c + 4),
							y = 0 == (0 & m);
						Object.assign(o, {
							versionMadeBy: m,
							msDosCompatible: y,
							compressedSize: 0,
							uncompressedSize: 0,
							commentLength: pt(d, c + 32),
							directory: y && 16 == (16 & ft(d, c + 38)),
							offset: ht(d, c + 42) + l,
							internalFileAttribute: ht(d, c + 34),
							externalFileAttribute: ht(d, c + 38),
							rawFilename: u.subarray(s, f),
							filenameUTF8: i,
							commentUTF8: i,
							rawExtraField: u.subarray(f, h),
						});
						const v = h + o.commentLength;
						(o.rawComment = u.subarray(h, v)),
							(o.filename = ct(o.rawFilename, o.filenameUTF8 ? nt : lt(t, e, 'filenameEncoding'))),
							(o.comment = ct(o.rawComment, o.commentUTF8 ? nt : lt(t, e, 'commentEncoding'))),
							!o.directory && o.filename.endsWith('/') && (o.directory = !0),
							st(o, o, d, c + 6);
						const g = new qe(o);
						if (((g.getData = (e, t) => o.getData(e, g, t)), p.push(g), (c = v), e.onprogress))
							try {
								e.onprogress(r + 1, a, new qe(o));
							} catch (e) {}
					}
					return p;
				}
				async close() {}
			}),
			(e.configure = _),
			(e.getMimeType = function () {
				return 'application/octet-stream';
			}),
			Object.defineProperty(e, '__esModule', { value: !0 });
	}),
	(function e(t, n, r) {
		function o(s, a) {
			if (!n[s]) {
				if (!t[s]) {
					var l = 'function' == typeof require && require;
					if (!a && l) return l(s, !0);
					if (i) return i(s, !0);
					var c = new Error("Cannot find module '" + s + "'");
					throw ((c.code = 'MODULE_NOT_FOUND'), c);
				}
				var u = (n[s] = { exports: {} });
				t[s][0].call(
					u.exports,
					function (e) {
						return o(t[s][1][e] || e);
					},
					u,
					u.exports,
					e,
					t,
					n,
					r
				);
			}
			return n[s].exports;
		}
		for (var i = 'function' == typeof require && require, s = 0; s < r.length; s++) o(r[s]);
		return o;
	})(
		{
			1: [
				function (e, t, n) {
					'use strict';
					(n.byteLength = function (e) {
						var t = c(e),
							n = t[0],
							r = t[1];
						return (3 * (n + r)) / 4 - r;
					}),
						(n.toByteArray = function (e) {
							var t,
								n,
								r = c(e),
								s = r[0],
								a = r[1],
								l = new i(
									(function (e, t, n) {
										return (3 * (t + n)) / 4 - n;
									})(0, s, a)
								),
								u = 0,
								d = a > 0 ? s - 4 : s;
							for (n = 0; n < d; n += 4)
								(t = (o[e.charCodeAt(n)] << 18) | (o[e.charCodeAt(n + 1)] << 12) | (o[e.charCodeAt(n + 2)] << 6) | o[e.charCodeAt(n + 3)]),
									(l[u++] = (t >> 16) & 255),
									(l[u++] = (t >> 8) & 255),
									(l[u++] = 255 & t);
							2 === a && ((t = (o[e.charCodeAt(n)] << 2) | (o[e.charCodeAt(n + 1)] >> 4)), (l[u++] = 255 & t));
							1 === a &&
								((t = (o[e.charCodeAt(n)] << 10) | (o[e.charCodeAt(n + 1)] << 4) | (o[e.charCodeAt(n + 2)] >> 2)), (l[u++] = (t >> 8) & 255), (l[u++] = 255 & t));
							return l;
						}),
						(n.fromByteArray = function (e) {
							for (var t, n = e.length, o = n % 3, i = [], s = 16383, a = 0, l = n - o; a < l; a += s) i.push(u(e, a, a + s > l ? l : a + s));
							1 === o
								? ((t = e[n - 1]), i.push(r[t >> 2] + r[(t << 4) & 63] + '=='))
								: 2 === o && ((t = (e[n - 2] << 8) + e[n - 1]), i.push(r[t >> 10] + r[(t >> 4) & 63] + r[(t << 2) & 63] + '='));
							return i.join('');
						});
					for (
						var r = [],
							o = [],
							i = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
							s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
							a = 0,
							l = s.length;
						a < l;
						++a
					)
						(r[a] = s[a]), (o[s.charCodeAt(a)] = a);
					function c(e) {
						var t = e.length;
						if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
						var n = e.indexOf('=');
						return -1 === n && (n = t), [n, n === t ? 0 : 4 - (n % 4)];
					}
					function u(e, t, n) {
						for (var o, i, s = [], a = t; a < n; a += 3)
							(o = ((e[a] << 16) & 16711680) + ((e[a + 1] << 8) & 65280) + (255 & e[a + 2])),
								s.push(r[((i = o) >> 18) & 63] + r[(i >> 12) & 63] + r[(i >> 6) & 63] + r[63 & i]);
						return s.join('');
					}
					(o['-'.charCodeAt(0)] = 62), (o['_'.charCodeAt(0)] = 63);
				},
				{},
			],
			2: [
				function (e, t, n) {
					var r = e('../internals/is-callable'),
						o = e('../internals/try-to-string'),
						i = TypeError;
					t.exports = function (e) {
						if (r(e)) return e;
						throw i(o(e) + ' is not a function');
					};
				},
				{ '../internals/is-callable': 56, '../internals/try-to-string': 108 },
			],
			3: [
				function (e, t, n) {
					var r = e('../internals/is-callable'),
						o = String,
						i = TypeError;
					t.exports = function (e) {
						if ('object' == typeof e || r(e)) return e;
						throw i("Can't set " + o(e) + ' as a prototype');
					};
				},
				{ '../internals/is-callable': 56 },
			],
			4: [
				function (e, t, n) {
					var r = e('../internals/well-known-symbol'),
						o = e('../internals/object-create'),
						i = e('../internals/object-define-property').f,
						s = r('unscopables'),
						a = Array.prototype;
					null == a[s] && i(a, s, { configurable: !0, value: o(null) }),
						(t.exports = function (e) {
							a[s][e] = !0;
						});
				},
				{ '../internals/object-create': 72, '../internals/object-define-property': 74, '../internals/well-known-symbol': 113 },
			],
			5: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/string-multibyte').charAt;
					t.exports = function (e, t, n) {
						return t + (n ? r(e, t).length : 1);
					};
				},
				{ '../internals/string-multibyte': 97 },
			],
			6: [
				function (e, t, n) {
					var r = e('../internals/object-is-prototype-of'),
						o = TypeError;
					t.exports = function (e, t) {
						if (r(t, e)) return e;
						throw o('Incorrect invocation');
					};
				},
				{ '../internals/object-is-prototype-of': 79 },
			],
			7: [
				function (e, t, n) {
					var r = e('../internals/is-object'),
						o = String,
						i = TypeError;
					t.exports = function (e) {
						if (r(e)) return e;
						throw i(o(e) + ' is not an object');
					};
				},
				{ '../internals/is-object': 59 },
			],
			8: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/function-bind-context'),
						o = e('../internals/function-call'),
						i = e('../internals/to-object'),
						s = e('../internals/call-with-safe-iteration-closing'),
						a = e('../internals/is-array-iterator-method'),
						l = e('../internals/is-constructor'),
						c = e('../internals/length-of-array-like'),
						u = e('../internals/create-property'),
						d = e('../internals/get-iterator'),
						f = e('../internals/get-iterator-method'),
						p = Array;
					t.exports = function (e) {
						var t = i(e),
							n = l(this),
							h = arguments.length,
							m = h > 1 ? arguments[1] : void 0,
							y = void 0 !== m;
						y && (m = r(m, h > 2 ? arguments[2] : void 0));
						var v,
							g,
							b,
							w,
							_,
							x,
							k = f(t),
							C = 0;
						if (!k || (this === p && a(k))) for (v = c(t), g = n ? new this(v) : p(v); v > C; C++) (x = y ? m(t[C], C) : t[C]), u(g, C, x);
						else for (_ = (w = d(t, k)).next, g = n ? new this() : []; !(b = o(_, w)).done; C++) (x = y ? s(w, m, [b.value, C], !0) : b.value), u(g, C, x);
						return (g.length = C), g;
					};
				},
				{
					'../internals/call-with-safe-iteration-closing': 12,
					'../internals/create-property': 20,
					'../internals/function-bind-context': 37,
					'../internals/function-call': 39,
					'../internals/get-iterator': 44,
					'../internals/get-iterator-method': 43,
					'../internals/is-array-iterator-method': 55,
					'../internals/is-constructor': 57,
					'../internals/length-of-array-like': 65,
					'../internals/to-object': 103,
				},
			],
			9: [
				function (e, t, n) {
					var r = e('../internals/to-indexed-object'),
						o = e('../internals/to-absolute-index'),
						i = e('../internals/length-of-array-like'),
						s = function (e) {
							return function (t, n, s) {
								var a,
									l = r(t),
									c = i(l),
									u = o(s, c);
								if (e && n != n) {
									for (; c > u; ) if ((a = l[u++]) != a) return !0;
								} else for (; c > u; u++) if ((e || u in l) && l[u] === n) return e || u || 0;
								return !e && -1;
							};
						};
					t.exports = { includes: s(!0), indexOf: s(!1) };
				},
				{ '../internals/length-of-array-like': 65, '../internals/to-absolute-index': 99, '../internals/to-indexed-object': 100 },
			],
			10: [
				function (e, t, n) {
					var r = e('../internals/to-absolute-index'),
						o = e('../internals/length-of-array-like'),
						i = e('../internals/create-property'),
						s = Array,
						a = Math.max;
					t.exports = function (e, t, n) {
						for (var l = o(e), c = r(t, l), u = r(void 0 === n ? l : n, l), d = s(a(u - c, 0)), f = 0; c < u; c++, f++) i(d, f, e[c]);
						return (d.length = f), d;
					};
				},
				{ '../internals/create-property': 20, '../internals/length-of-array-like': 65, '../internals/to-absolute-index': 99 },
			],
			11: [
				function (e, t, n) {
					var r = e('../internals/array-slice-simple'),
						o = Math.floor,
						i = function (e, t) {
							var n = e.length,
								l = o(n / 2);
							return n < 8 ? s(e, t) : a(e, i(r(e, 0, l), t), i(r(e, l), t), t);
						},
						s = function (e, t) {
							for (var n, r, o = e.length, i = 1; i < o; ) {
								for (r = i, n = e[i]; r && t(e[r - 1], n) > 0; ) e[r] = e[--r];
								r !== i++ && (e[r] = n);
							}
							return e;
						},
						a = function (e, t, n, r) {
							for (var o = t.length, i = n.length, s = 0, a = 0; s < o || a < i; )
								e[s + a] = s < o && a < i ? (r(t[s], n[a]) <= 0 ? t[s++] : n[a++]) : s < o ? t[s++] : n[a++];
							return e;
						};
					t.exports = i;
				},
				{ '../internals/array-slice-simple': 10 },
			],
			12: [
				function (e, t, n) {
					var r = e('../internals/an-object'),
						o = e('../internals/iterator-close');
					t.exports = function (e, t, n, i) {
						try {
							return i ? t(r(n)[0], n[1]) : t(n);
						} catch (t) {
							o(e, 'throw', t);
						}
					};
				},
				{ '../internals/an-object': 7, '../internals/iterator-close': 62 },
			],
			13: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = r({}.toString),
						i = r(''.slice);
					t.exports = function (e) {
						return i(o(e), 8, -1);
					};
				},
				{ '../internals/function-uncurry-this': 41 },
			],
			14: [
				function (e, t, n) {
					var r = e('../internals/to-string-tag-support'),
						o = e('../internals/is-callable'),
						i = e('../internals/classof-raw'),
						s = e('../internals/well-known-symbol')('toStringTag'),
						a = Object,
						l =
							'Arguments' ==
							i(
								(function () {
									return arguments;
								})()
							);
					t.exports = r
						? i
						: function (e) {
								var t, n, r;
								return void 0 === e
									? 'Undefined'
									: null === e
										? 'Null'
										: 'string' ==
											  typeof (n = (function (e, t) {
													try {
														return e[t];
													} catch (e) {}
											  })((t = a(e)), s))
											? n
											: l
												? i(t)
												: 'Object' == (r = i(t)) && o(t.callee)
													? 'Arguments'
													: r;
							};
				},
				{ '../internals/classof-raw': 13, '../internals/is-callable': 56, '../internals/to-string-tag-support': 106, '../internals/well-known-symbol': 113 },
			],
			15: [
				function (e, t, n) {
					var r = e('../internals/has-own-property'),
						o = e('../internals/own-keys'),
						i = e('../internals/object-get-own-property-descriptor'),
						s = e('../internals/object-define-property');
					t.exports = function (e, t, n) {
						for (var a = o(t), l = s.f, c = i.f, u = 0; u < a.length; u++) {
							var d = a[u];
							r(e, d) || (n && r(n, d)) || l(e, d, c(t, d));
						}
					};
				},
				{
					'../internals/has-own-property': 48,
					'../internals/object-define-property': 74,
					'../internals/object-get-own-property-descriptor': 75,
					'../internals/own-keys': 85,
				},
			],
			16: [
				function (e, t, n) {
					var r = e('../internals/fails');
					t.exports = !r(function () {
						function e() {}
						return (e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype;
					});
				},
				{ '../internals/fails': 34 },
			],
			17: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/iterators-core').IteratorPrototype,
						o = e('../internals/object-create'),
						i = e('../internals/create-property-descriptor'),
						s = e('../internals/set-to-string-tag'),
						a = e('../internals/iterators'),
						l = function () {
							return this;
						};
					t.exports = function (e, t, n, c) {
						var u = t + ' Iterator';
						return (e.prototype = o(r, { next: i(+!c, n) })), s(e, u, !1, !0), (a[u] = l), e;
					};
				},
				{
					'../internals/create-property-descriptor': 19,
					'../internals/iterators': 64,
					'../internals/iterators-core': 63,
					'../internals/object-create': 72,
					'../internals/set-to-string-tag': 93,
				},
			],
			18: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/object-define-property'),
						i = e('../internals/create-property-descriptor');
					t.exports = r
						? function (e, t, n) {
								return o.f(e, t, i(1, n));
							}
						: function (e, t, n) {
								return (e[t] = n), e;
							};
				},
				{ '../internals/create-property-descriptor': 19, '../internals/descriptors': 26, '../internals/object-define-property': 74 },
			],
			19: [
				function (e, t, n) {
					t.exports = function (e, t) {
						return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
					};
				},
				{},
			],
			20: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/to-property-key'),
						o = e('../internals/object-define-property'),
						i = e('../internals/create-property-descriptor');
					t.exports = function (e, t, n) {
						var s = r(t);
						s in e ? o.f(e, s, i(0, n)) : (e[s] = n);
					};
				},
				{ '../internals/create-property-descriptor': 19, '../internals/object-define-property': 74, '../internals/to-property-key': 105 },
			],
			21: [
				function (e, t, n) {
					var r = e('../internals/make-built-in'),
						o = e('../internals/object-define-property');
					t.exports = function (e, t, n) {
						return n.get && r(n.get, t, { getter: !0 }), n.set && r(n.set, t, { setter: !0 }), o.f(e, t, n);
					};
				},
				{ '../internals/make-built-in': 66, '../internals/object-define-property': 74 },
			],
			22: [
				function (e, t, n) {
					var r = e('../internals/is-callable'),
						o = e('../internals/object-define-property'),
						i = e('../internals/make-built-in'),
						s = e('../internals/define-global-property');
					t.exports = function (e, t, n, a) {
						a || (a = {});
						var l = a.enumerable,
							c = void 0 !== a.name ? a.name : t;
						if ((r(n) && i(n, c, a), a.global)) l ? (e[t] = n) : s(t, n);
						else {
							try {
								a.unsafe ? e[t] && (l = !0) : delete e[t];
							} catch (e) {}
							l ? (e[t] = n) : o.f(e, t, { value: n, enumerable: !1, configurable: !a.nonConfigurable, writable: !a.nonWritable });
						}
						return e;
					};
				},
				{ '../internals/define-global-property': 24, '../internals/is-callable': 56, '../internals/make-built-in': 66, '../internals/object-define-property': 74 },
			],
			23: [
				function (e, t, n) {
					var r = e('../internals/define-built-in');
					t.exports = function (e, t, n) {
						for (var o in t) r(e, o, t[o], n);
						return e;
					};
				},
				{ '../internals/define-built-in': 22 },
			],
			24: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = Object.defineProperty;
					t.exports = function (e, t) {
						try {
							o(r, e, { value: t, configurable: !0, writable: !0 });
						} catch (n) {
							r[e] = t;
						}
						return t;
					};
				},
				{ '../internals/global': 47 },
			],
			25: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/export'),
						o = e('../internals/function-call'),
						i = e('../internals/is-pure'),
						s = e('../internals/function-name'),
						a = e('../internals/is-callable'),
						l = e('../internals/create-iterator-constructor'),
						c = e('../internals/object-get-prototype-of'),
						u = e('../internals/object-set-prototype-of'),
						d = e('../internals/set-to-string-tag'),
						f = e('../internals/create-non-enumerable-property'),
						p = e('../internals/define-built-in'),
						h = e('../internals/well-known-symbol'),
						m = e('../internals/iterators'),
						y = e('../internals/iterators-core'),
						v = s.PROPER,
						g = s.CONFIGURABLE,
						b = y.IteratorPrototype,
						w = y.BUGGY_SAFARI_ITERATORS,
						_ = h('iterator'),
						x = 'keys',
						k = 'values',
						C = 'entries',
						E = function () {
							return this;
						};
					t.exports = function (e, t, n, s, h, y, j) {
						l(n, t, s);
						var S,
							D,
							O,
							P = function (e) {
								if (e === h && T) return T;
								if (!w && e in I) return I[e];
								switch (e) {
									case x:
									case k:
									case C:
										return function () {
											return new n(this, e);
										};
								}
								return function () {
									return new n(this);
								};
							},
							B = t + ' Iterator',
							M = !1,
							I = e.prototype,
							A = I[_] || I['@@iterator'] || (h && I[h]),
							T = (!w && A) || P(h),
							K = ('Array' == t && I.entries) || A;
						if (
							(K &&
								(S = c(K.call(new e()))) !== Object.prototype &&
								S.next &&
								(i || c(S) === b || (u ? u(S, b) : a(S[_]) || p(S, _, E)), d(S, B, !0, !0), i && (m[B] = E)),
							v &&
								h == k &&
								A &&
								A.name !== k &&
								(!i && g
									? f(I, 'name', k)
									: ((M = !0),
										(T = function () {
											return o(A, this);
										}))),
							h)
						)
							if (((D = { values: P(k), keys: y ? T : P(x), entries: P(C) }), j)) for (O in D) (w || M || !(O in I)) && p(I, O, D[O]);
							else r({ target: t, proto: !0, forced: w || M }, D);
						return (i && !j) || I[_] === T || p(I, _, T, { name: h }), (m[t] = T), D;
					};
				},
				{
					'../internals/create-iterator-constructor': 17,
					'../internals/create-non-enumerable-property': 18,
					'../internals/define-built-in': 22,
					'../internals/export': 33,
					'../internals/function-call': 39,
					'../internals/function-name': 40,
					'../internals/is-callable': 56,
					'../internals/is-pure': 60,
					'../internals/iterators': 64,
					'../internals/iterators-core': 63,
					'../internals/object-get-prototype-of': 78,
					'../internals/object-set-prototype-of': 83,
					'../internals/set-to-string-tag': 93,
					'../internals/well-known-symbol': 113,
				},
			],
			26: [
				function (e, t, n) {
					var r = e('../internals/fails');
					t.exports = !r(function () {
						return (
							7 !=
							Object.defineProperty({}, 1, {
								get: function () {
									return 7;
								},
							})[1]
						);
					});
				},
				{ '../internals/fails': 34 },
			],
			27: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/is-object'),
						i = r.document,
						s = o(i) && o(i.createElement);
					t.exports = function (e) {
						return s ? i.createElement(e) : {};
					};
				},
				{ '../internals/global': 47, '../internals/is-object': 59 },
			],
			28: [
				function (e, t, n) {
					t.exports = {
						CSSRuleList: 0,
						CSSStyleDeclaration: 0,
						CSSValueList: 0,
						ClientRectList: 0,
						DOMRectList: 0,
						DOMStringList: 0,
						DOMTokenList: 1,
						DataTransferItemList: 0,
						FileList: 0,
						HTMLAllCollection: 0,
						HTMLCollection: 0,
						HTMLFormElement: 0,
						HTMLSelectElement: 0,
						MediaList: 0,
						MimeTypeArray: 0,
						NamedNodeMap: 0,
						NodeList: 1,
						PaintRequestList: 0,
						Plugin: 0,
						PluginArray: 0,
						SVGLengthList: 0,
						SVGNumberList: 0,
						SVGPathSegList: 0,
						SVGPointList: 0,
						SVGStringList: 0,
						SVGTransformList: 0,
						SourceBufferList: 0,
						StyleSheetList: 0,
						TextTrackCueList: 0,
						TextTrackList: 0,
						TouchList: 0,
					};
				},
				{},
			],
			29: [
				function (e, t, n) {
					var r = e('../internals/document-create-element')('span').classList,
						o = r && r.constructor && r.constructor.prototype;
					t.exports = o === Object.prototype ? void 0 : o;
				},
				{ '../internals/document-create-element': 27 },
			],
			30: [
				function (e, t, n) {
					var r = e('../internals/get-built-in');
					t.exports = r('navigator', 'userAgent') || '';
				},
				{ '../internals/get-built-in': 42 },
			],
			31: [
				function (e, t, n) {
					var r,
						o,
						i = e('../internals/global'),
						s = e('../internals/engine-user-agent'),
						a = i.process,
						l = i.Deno,
						c = (a && a.versions) || (l && l.version),
						u = c && c.v8;
					u && (o = (r = u.split('.'))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])),
						!o && s && (!(r = s.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = s.match(/Chrome\/(\d+)/)) && (o = +r[1]),
						(t.exports = o);
				},
				{ '../internals/engine-user-agent': 30, '../internals/global': 47 },
			],
			32: [
				function (e, t, n) {
					t.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
				},
				{},
			],
			33: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/object-get-own-property-descriptor').f,
						i = e('../internals/create-non-enumerable-property'),
						s = e('../internals/define-built-in'),
						a = e('../internals/define-global-property'),
						l = e('../internals/copy-constructor-properties'),
						c = e('../internals/is-forced');
					t.exports = function (e, t) {
						var n,
							u,
							d,
							f,
							p,
							h = e.target,
							m = e.global,
							y = e.stat;
						if ((n = m ? r : y ? r[h] || a(h, {}) : (r[h] || {}).prototype))
							for (u in t) {
								if (((f = t[u]), (d = e.dontCallGetSet ? (p = o(n, u)) && p.value : n[u]), !c(m ? u : h + (y ? '.' : '#') + u, e.forced) && void 0 !== d)) {
									if (typeof f == typeof d) continue;
									l(f, d);
								}
								(e.sham || (d && d.sham)) && i(f, 'sham', !0), s(n, u, f, e);
							}
					};
				},
				{
					'../internals/copy-constructor-properties': 15,
					'../internals/create-non-enumerable-property': 18,
					'../internals/define-built-in': 22,
					'../internals/define-global-property': 24,
					'../internals/global': 47,
					'../internals/is-forced': 58,
					'../internals/object-get-own-property-descriptor': 75,
				},
			],
			34: [
				function (e, t, n) {
					t.exports = function (e) {
						try {
							return !!e();
						} catch (e) {
							return !0;
						}
					};
				},
				{},
			],
			35: [
				function (e, t, n) {
					'use strict';
					e('../modules/es.regexp.exec');
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/define-built-in'),
						i = e('../internals/regexp-exec'),
						s = e('../internals/fails'),
						a = e('../internals/well-known-symbol'),
						l = e('../internals/create-non-enumerable-property'),
						c = a('species'),
						u = RegExp.prototype;
					t.exports = function (e, t, n, d) {
						var f = a(e),
							p = !s(function () {
								var t = {};
								return (
									(t[f] = function () {
										return 7;
									}),
									7 != ''[e](t)
								);
							}),
							h =
								p &&
								!s(function () {
									var t = !1,
										n = /a/;
									return (
										'split' === e &&
											(((n = {}).constructor = {}),
											(n.constructor[c] = function () {
												return n;
											}),
											(n.flags = ''),
											(n[f] = /./[f])),
										(n.exec = function () {
											return (t = !0), null;
										}),
										n[f](''),
										!t
									);
								});
						if (!p || !h || n) {
							var m = r(/./[f]),
								y = t(f, ''[e], function (e, t, n, o, s) {
									var a = r(e),
										l = t.exec;
									return l === i || l === u.exec ? (p && !s ? { done: !0, value: m(t, n, o) } : { done: !0, value: a(n, t, o) }) : { done: !1 };
								});
							o(String.prototype, e, y[0]), o(u, f, y[1]);
						}
						d && l(u[f], 'sham', !0);
					};
				},
				{
					'../internals/create-non-enumerable-property': 18,
					'../internals/define-built-in': 22,
					'../internals/fails': 34,
					'../internals/function-uncurry-this': 41,
					'../internals/regexp-exec': 87,
					'../internals/well-known-symbol': 113,
					'../modules/es.regexp.exec': 115,
				},
			],
			36: [
				function (e, t, n) {
					var r = e('../internals/function-bind-native'),
						o = Function.prototype,
						i = o.apply,
						s = o.call;
					t.exports =
						('object' == typeof Reflect && Reflect.apply) ||
						(r
							? s.bind(i)
							: function () {
									return s.apply(i, arguments);
								});
				},
				{ '../internals/function-bind-native': 38 },
			],
			37: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/a-callable'),
						i = e('../internals/function-bind-native'),
						s = r(r.bind);
					t.exports = function (e, t) {
						return (
							o(e),
							void 0 === t
								? e
								: i
									? s(e, t)
									: function () {
											return e.apply(t, arguments);
										}
						);
					};
				},
				{ '../internals/a-callable': 2, '../internals/function-bind-native': 38, '../internals/function-uncurry-this': 41 },
			],
			38: [
				function (e, t, n) {
					var r = e('../internals/fails');
					t.exports = !r(function () {
						var e = function () {}.bind();
						return 'function' != typeof e || e.hasOwnProperty('prototype');
					});
				},
				{ '../internals/fails': 34 },
			],
			39: [
				function (e, t, n) {
					var r = e('../internals/function-bind-native'),
						o = Function.prototype.call;
					t.exports = r
						? o.bind(o)
						: function () {
								return o.apply(o, arguments);
							};
				},
				{ '../internals/function-bind-native': 38 },
			],
			40: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/has-own-property'),
						i = Function.prototype,
						s = r && Object.getOwnPropertyDescriptor,
						a = o(i, 'name'),
						l = a && 'something' === function () {}.name,
						c = a && (!r || (r && s(i, 'name').configurable));
					t.exports = { EXISTS: a, PROPER: l, CONFIGURABLE: c };
				},
				{ '../internals/descriptors': 26, '../internals/has-own-property': 48 },
			],
			41: [
				function (e, t, n) {
					var r = e('../internals/function-bind-native'),
						o = Function.prototype,
						i = o.bind,
						s = o.call,
						a = r && i.bind(s, s);
					t.exports = r
						? function (e) {
								return e && a(e);
							}
						: function (e) {
								return (
									e &&
									function () {
										return s.apply(e, arguments);
									}
								);
							};
				},
				{ '../internals/function-bind-native': 38 },
			],
			42: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/is-callable'),
						i = function (e) {
							return o(e) ? e : void 0;
						};
					t.exports = function (e, t) {
						return arguments.length < 2 ? i(r[e]) : r[e] && r[e][t];
					};
				},
				{ '../internals/global': 47, '../internals/is-callable': 56 },
			],
			43: [
				function (e, t, n) {
					var r = e('../internals/classof'),
						o = e('../internals/get-method'),
						i = e('../internals/iterators'),
						s = e('../internals/well-known-symbol')('iterator');
					t.exports = function (e) {
						if (null != e) return o(e, s) || o(e, '@@iterator') || i[r(e)];
					};
				},
				{ '../internals/classof': 14, '../internals/get-method': 45, '../internals/iterators': 64, '../internals/well-known-symbol': 113 },
			],
			44: [
				function (e, t, n) {
					var r = e('../internals/function-call'),
						o = e('../internals/a-callable'),
						i = e('../internals/an-object'),
						s = e('../internals/try-to-string'),
						a = e('../internals/get-iterator-method'),
						l = TypeError;
					t.exports = function (e, t) {
						var n = arguments.length < 2 ? a(e) : t;
						if (o(n)) return i(r(n, e));
						throw l(s(e) + ' is not iterable');
					};
				},
				{
					'../internals/a-callable': 2,
					'../internals/an-object': 7,
					'../internals/function-call': 39,
					'../internals/get-iterator-method': 43,
					'../internals/try-to-string': 108,
				},
			],
			45: [
				function (e, t, n) {
					var r = e('../internals/a-callable');
					t.exports = function (e, t) {
						var n = e[t];
						return null == n ? void 0 : r(n);
					};
				},
				{ '../internals/a-callable': 2 },
			],
			46: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/to-object'),
						i = Math.floor,
						s = r(''.charAt),
						a = r(''.replace),
						l = r(''.slice),
						c = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
						u = /\$([$&'`]|\d{1,2})/g;
					t.exports = function (e, t, n, r, d, f) {
						var p = n + e.length,
							h = r.length,
							m = u;
						return (
							void 0 !== d && ((d = o(d)), (m = c)),
							a(f, m, function (o, a) {
								var c;
								switch (s(a, 0)) {
									case '$':
										return '$';
									case '&':
										return e;
									case '`':
										return l(t, 0, n);
									case "'":
										return l(t, p);
									case '<':
										c = d[l(a, 1, -1)];
										break;
									default:
										var u = +a;
										if (0 === u) return o;
										if (u > h) {
											var f = i(u / 10);
											return 0 === f ? o : f <= h ? (void 0 === r[f - 1] ? s(a, 1) : r[f - 1] + s(a, 1)) : o;
										}
										c = r[u - 1];
								}
								return void 0 === c ? '' : c;
							})
						);
					};
				},
				{ '../internals/function-uncurry-this': 41, '../internals/to-object': 103 },
			],
			47: [
				function (e, t, n) {
					(function (e) {
						(function () {
							var n = function (e) {
								return e && e.Math == Math && e;
							};
							t.exports =
								n('object' == typeof globalThis && globalThis) ||
								n('object' == typeof window && window) ||
								n('object' == typeof self && self) ||
								n('object' == typeof e && e) ||
								(function () {
									return this;
								})() ||
								Function('return this')();
						}).call(this);
					}).call(this, 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {});
				},
				{},
			],
			48: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/to-object'),
						i = r({}.hasOwnProperty);
					t.exports =
						Object.hasOwn ||
						function (e, t) {
							return i(o(e), t);
						};
				},
				{ '../internals/function-uncurry-this': 41, '../internals/to-object': 103 },
			],
			49: [
				function (e, t, n) {
					t.exports = {};
				},
				{},
			],
			50: [
				function (e, t, n) {
					var r = e('../internals/get-built-in');
					t.exports = r('document', 'documentElement');
				},
				{ '../internals/get-built-in': 42 },
			],
			51: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/fails'),
						i = e('../internals/document-create-element');
					t.exports =
						!r &&
						!o(function () {
							return (
								7 !=
								Object.defineProperty(i('div'), 'a', {
									get: function () {
										return 7;
									},
								}).a
							);
						});
				},
				{ '../internals/descriptors': 26, '../internals/document-create-element': 27, '../internals/fails': 34 },
			],
			52: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/fails'),
						i = e('../internals/classof-raw'),
						s = Object,
						a = r(''.split);
					t.exports = o(function () {
						return !s('z').propertyIsEnumerable(0);
					})
						? function (e) {
								return 'String' == i(e) ? a(e, '') : s(e);
							}
						: s;
				},
				{ '../internals/classof-raw': 13, '../internals/fails': 34, '../internals/function-uncurry-this': 41 },
			],
			53: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/is-callable'),
						i = e('../internals/shared-store'),
						s = r(Function.toString);
					o(i.inspectSource) ||
						(i.inspectSource = function (e) {
							return s(e);
						}),
						(t.exports = i.inspectSource);
				},
				{ '../internals/function-uncurry-this': 41, '../internals/is-callable': 56, '../internals/shared-store': 95 },
			],
			54: [
				function (e, t, n) {
					var r,
						o,
						i,
						s = e('../internals/native-weak-map'),
						a = e('../internals/global'),
						l = e('../internals/function-uncurry-this'),
						c = e('../internals/is-object'),
						u = e('../internals/create-non-enumerable-property'),
						d = e('../internals/has-own-property'),
						f = e('../internals/shared-store'),
						p = e('../internals/shared-key'),
						h = e('../internals/hidden-keys'),
						m = 'Object already initialized',
						y = a.TypeError,
						v = a.WeakMap;
					if (s || f.state) {
						var g = f.state || (f.state = new v()),
							b = l(g.get),
							w = l(g.has),
							_ = l(g.set);
						(r = function (e, t) {
							if (w(g, e)) throw new y(m);
							return (t.facade = e), _(g, e, t), t;
						}),
							(o = function (e) {
								return b(g, e) || {};
							}),
							(i = function (e) {
								return w(g, e);
							});
					} else {
						var x = p('state');
						(h[x] = !0),
							(r = function (e, t) {
								if (d(e, x)) throw new y(m);
								return (t.facade = e), u(e, x, t), t;
							}),
							(o = function (e) {
								return d(e, x) ? e[x] : {};
							}),
							(i = function (e) {
								return d(e, x);
							});
					}
					t.exports = {
						set: r,
						get: o,
						has: i,
						enforce: function (e) {
							return i(e) ? o(e) : r(e, {});
						},
						getterFor: function (e) {
							return function (t) {
								var n;
								if (!c(t) || (n = o(t)).type !== e) throw y('Incompatible receiver, ' + e + ' required');
								return n;
							};
						},
					};
				},
				{
					'../internals/create-non-enumerable-property': 18,
					'../internals/function-uncurry-this': 41,
					'../internals/global': 47,
					'../internals/has-own-property': 48,
					'../internals/hidden-keys': 49,
					'../internals/is-object': 59,
					'../internals/native-weak-map': 70,
					'../internals/shared-key': 94,
					'../internals/shared-store': 95,
				},
			],
			55: [
				function (e, t, n) {
					var r = e('../internals/well-known-symbol'),
						o = e('../internals/iterators'),
						i = r('iterator'),
						s = Array.prototype;
					t.exports = function (e) {
						return void 0 !== e && (o.Array === e || s[i] === e);
					};
				},
				{ '../internals/iterators': 64, '../internals/well-known-symbol': 113 },
			],
			56: [
				function (e, t, n) {
					t.exports = function (e) {
						return 'function' == typeof e;
					};
				},
				{},
			],
			57: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/fails'),
						i = e('../internals/is-callable'),
						s = e('../internals/classof'),
						a = e('../internals/get-built-in'),
						l = e('../internals/inspect-source'),
						c = function () {},
						u = [],
						d = a('Reflect', 'construct'),
						f = /^\s*(?:class|function)\b/,
						p = r(f.exec),
						h = !f.exec(c),
						m = function (e) {
							if (!i(e)) return !1;
							try {
								return d(c, u, e), !0;
							} catch (e) {
								return !1;
							}
						},
						y = function (e) {
							if (!i(e)) return !1;
							switch (s(e)) {
								case 'AsyncFunction':
								case 'GeneratorFunction':
								case 'AsyncGeneratorFunction':
									return !1;
							}
							try {
								return h || !!p(f, l(e));
							} catch (e) {
								return !0;
							}
						};
					(y.sham = !0),
						(t.exports =
							!d ||
							o(function () {
								var e;
								return (
									m(m.call) ||
									!m(Object) ||
									!m(function () {
										e = !0;
									}) ||
									e
								);
							})
								? y
								: m);
				},
				{
					'../internals/classof': 14,
					'../internals/fails': 34,
					'../internals/function-uncurry-this': 41,
					'../internals/get-built-in': 42,
					'../internals/inspect-source': 53,
					'../internals/is-callable': 56,
				},
			],
			58: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/is-callable'),
						i = /#|\.prototype\./,
						s = function (e, t) {
							var n = l[a(e)];
							return n == u || (n != c && (o(t) ? r(t) : !!t));
						},
						a = (s.normalize = function (e) {
							return String(e).replace(i, '.').toLowerCase();
						}),
						l = (s.data = {}),
						c = (s.NATIVE = 'N'),
						u = (s.POLYFILL = 'P');
					t.exports = s;
				},
				{ '../internals/fails': 34, '../internals/is-callable': 56 },
			],
			59: [
				function (e, t, n) {
					var r = e('../internals/is-callable');
					t.exports = function (e) {
						return 'object' == typeof e ? null !== e : r(e);
					};
				},
				{ '../internals/is-callable': 56 },
			],
			60: [
				function (e, t, n) {
					t.exports = !1;
				},
				{},
			],
			61: [
				function (e, t, n) {
					var r = e('../internals/get-built-in'),
						o = e('../internals/is-callable'),
						i = e('../internals/object-is-prototype-of'),
						s = e('../internals/use-symbol-as-uid'),
						a = Object;
					t.exports = s
						? function (e) {
								return 'symbol' == typeof e;
							}
						: function (e) {
								var t = r('Symbol');
								return o(t) && i(t.prototype, a(e));
							};
				},
				{ '../internals/get-built-in': 42, '../internals/is-callable': 56, '../internals/object-is-prototype-of': 79, '../internals/use-symbol-as-uid': 110 },
			],
			62: [
				function (e, t, n) {
					var r = e('../internals/function-call'),
						o = e('../internals/an-object'),
						i = e('../internals/get-method');
					t.exports = function (e, t, n) {
						var s, a;
						o(e);
						try {
							if (!(s = i(e, 'return'))) {
								if ('throw' === t) throw n;
								return n;
							}
							s = r(s, e);
						} catch (e) {
							(a = !0), (s = e);
						}
						if ('throw' === t) throw n;
						if (a) throw s;
						return o(s), n;
					};
				},
				{ '../internals/an-object': 7, '../internals/function-call': 39, '../internals/get-method': 45 },
			],
			63: [
				function (e, t, n) {
					'use strict';
					var r,
						o,
						i,
						s = e('../internals/fails'),
						a = e('../internals/is-callable'),
						l = e('../internals/object-create'),
						c = e('../internals/object-get-prototype-of'),
						u = e('../internals/define-built-in'),
						d = e('../internals/well-known-symbol'),
						f = e('../internals/is-pure'),
						p = d('iterator'),
						h = !1;
					[].keys && ('next' in (i = [].keys()) ? (o = c(c(i))) !== Object.prototype && (r = o) : (h = !0)),
						null == r ||
						s(function () {
							var e = {};
							return r[p].call(e) !== e;
						})
							? (r = {})
							: f && (r = l(r)),
						a(r[p]) ||
							u(r, p, function () {
								return this;
							}),
						(t.exports = { IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: h });
				},
				{
					'../internals/define-built-in': 22,
					'../internals/fails': 34,
					'../internals/is-callable': 56,
					'../internals/is-pure': 60,
					'../internals/object-create': 72,
					'../internals/object-get-prototype-of': 78,
					'../internals/well-known-symbol': 113,
				},
			],
			64: [
				function (e, t, n) {
					arguments[4][49][0].apply(n, arguments);
				},
				{ dup: 49 },
			],
			65: [
				function (e, t, n) {
					var r = e('../internals/to-length');
					t.exports = function (e) {
						return r(e.length);
					};
				},
				{ '../internals/to-length': 102 },
			],
			66: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/is-callable'),
						i = e('../internals/has-own-property'),
						s = e('../internals/descriptors'),
						a = e('../internals/function-name').CONFIGURABLE,
						l = e('../internals/inspect-source'),
						c = e('../internals/internal-state'),
						u = c.enforce,
						d = c.get,
						f = Object.defineProperty,
						p =
							s &&
							!r(function () {
								return 8 !== f(function () {}, 'length', { value: 8 }).length;
							}),
						h = String(String).split('String'),
						m = (t.exports = function (e, t, n) {
							'Symbol(' === String(t).slice(0, 7) && (t = '[' + String(t).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'),
								n && n.getter && (t = 'get ' + t),
								n && n.setter && (t = 'set ' + t),
								(!i(e, 'name') || (a && e.name !== t)) && (s ? f(e, 'name', { value: t, configurable: !0 }) : (e.name = t)),
								p && n && i(n, 'arity') && e.length !== n.arity && f(e, 'length', { value: n.arity });
							try {
								n && i(n, 'constructor') && n.constructor ? s && f(e, 'prototype', { writable: !1 }) : e.prototype && (e.prototype = void 0);
							} catch (e) {}
							var r = u(e);
							return i(r, 'source') || (r.source = h.join('string' == typeof t ? t : '')), e;
						});
					Function.prototype.toString = m(function () {
						return (o(this) && d(this).source) || l(this);
					}, 'toString');
				},
				{
					'../internals/descriptors': 26,
					'../internals/fails': 34,
					'../internals/function-name': 40,
					'../internals/has-own-property': 48,
					'../internals/inspect-source': 53,
					'../internals/internal-state': 54,
					'../internals/is-callable': 56,
				},
			],
			67: [
				function (e, t, n) {
					var r = Math.ceil,
						o = Math.floor;
					t.exports =
						Math.trunc ||
						function (e) {
							var t = +e;
							return (t > 0 ? o : r)(t);
						};
				},
				{},
			],
			68: [
				function (e, t, n) {
					var r = e('../internals/engine-v8-version'),
						o = e('../internals/fails');
					t.exports =
						!!Object.getOwnPropertySymbols &&
						!o(function () {
							var e = Symbol();
							return !String(e) || !(Object(e) instanceof Symbol) || (!Symbol.sham && r && r < 41);
						});
				},
				{ '../internals/engine-v8-version': 31, '../internals/fails': 34 },
			],
			69: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/well-known-symbol'),
						i = e('../internals/is-pure'),
						s = o('iterator');
					t.exports = !r(function () {
						var e = new URL('b?a=1&b=2&c=3', 'http://a'),
							t = e.searchParams,
							n = '';
						return (
							(e.pathname = 'c%20d'),
							t.forEach(function (e, r) {
								t.delete('b'), (n += r + e);
							}),
							(i && !e.toJSON) ||
								!t.sort ||
								'http://a/c%20d?a=1&c=3' !== e.href ||
								'3' !== t.get('c') ||
								'a=1' !== String(new URLSearchParams('?a=1')) ||
								!t[s] ||
								'a' !== new URL('https://a@b').username ||
								'b' !== new URLSearchParams(new URLSearchParams('a=b')).get('a') ||
								'xn--e1aybc' !== new URL('http://тест').host ||
								'#%D0%B1' !== new URL('http://a#б').hash ||
								'a1c3' !== n ||
								'x' !== new URL('http://x', void 0).host
						);
					});
				},
				{ '../internals/fails': 34, '../internals/is-pure': 60, '../internals/well-known-symbol': 113 },
			],
			70: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/is-callable'),
						i = e('../internals/inspect-source'),
						s = r.WeakMap;
					t.exports = o(s) && /native code/.test(i(s));
				},
				{ '../internals/global': 47, '../internals/inspect-source': 53, '../internals/is-callable': 56 },
			],
			71: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/descriptors'),
						o = e('../internals/function-uncurry-this'),
						i = e('../internals/function-call'),
						s = e('../internals/fails'),
						a = e('../internals/object-keys'),
						l = e('../internals/object-get-own-property-symbols'),
						c = e('../internals/object-property-is-enumerable'),
						u = e('../internals/to-object'),
						d = e('../internals/indexed-object'),
						f = Object.assign,
						p = Object.defineProperty,
						h = o([].concat);
					t.exports =
						!f ||
						s(function () {
							if (
								r &&
								1 !==
									f(
										{ b: 1 },
										f(
											p({}, 'a', {
												enumerable: !0,
												get: function () {
													p(this, 'b', { value: 3, enumerable: !1 });
												},
											}),
											{ b: 2 }
										)
									).b
							)
								return !0;
							var e = {},
								t = {},
								n = Symbol(),
								o = 'abcdefghijklmnopqrst';
							return (
								(e[n] = 7),
								o.split('').forEach(function (e) {
									t[e] = e;
								}),
								7 != f({}, e)[n] || a(f({}, t)).join('') != o
							);
						})
							? function (e, t) {
									for (var n = u(e), o = arguments.length, s = 1, f = l.f, p = c.f; o > s; )
										for (var m, y = d(arguments[s++]), v = f ? h(a(y), f(y)) : a(y), g = v.length, b = 0; g > b; )
											(m = v[b++]), (r && !i(p, y, m)) || (n[m] = y[m]);
									return n;
								}
							: f;
				},
				{
					'../internals/descriptors': 26,
					'../internals/fails': 34,
					'../internals/function-call': 39,
					'../internals/function-uncurry-this': 41,
					'../internals/indexed-object': 52,
					'../internals/object-get-own-property-symbols': 77,
					'../internals/object-keys': 81,
					'../internals/object-property-is-enumerable': 82,
					'../internals/to-object': 103,
				},
			],
			72: [
				function (e, t, n) {
					var r,
						o = e('../internals/an-object'),
						i = e('../internals/object-define-properties'),
						s = e('../internals/enum-bug-keys'),
						a = e('../internals/hidden-keys'),
						l = e('../internals/html'),
						c = e('../internals/document-create-element'),
						u = e('../internals/shared-key'),
						d = u('IE_PROTO'),
						f = function () {},
						p = function (e) {
							return '<script>' + e + '</' + 'script>';
						},
						h = function (e) {
							e.write(p('')), e.close();
							var t = e.parentWindow.Object;
							return (e = null), t;
						},
						m = function () {
							try {
								r = new ActiveXObject('htmlfile');
							} catch (e) {}
							var e, t;
							m =
								'undefined' != typeof document
									? document.domain && r
										? h(r)
										: (((t = c('iframe')).style.display = 'none'),
											l.appendChild(t),
											(t.src = String('javascript:')),
											(e = t.contentWindow.document).open(),
											e.write(p('document.F=Object')),
											e.close(),
											e.F)
									: h(r);
							for (var n = s.length; n--; ) delete m.prototype[s[n]];
							return m();
						};
					(a[d] = !0),
						(t.exports =
							Object.create ||
							function (e, t) {
								var n;
								return null !== e ? ((f.prototype = o(e)), (n = new f()), (f.prototype = null), (n[d] = e)) : (n = m()), void 0 === t ? n : i.f(n, t);
							});
				},
				{
					'../internals/an-object': 7,
					'../internals/document-create-element': 27,
					'../internals/enum-bug-keys': 32,
					'../internals/hidden-keys': 49,
					'../internals/html': 50,
					'../internals/object-define-properties': 73,
					'../internals/shared-key': 94,
				},
			],
			73: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/v8-prototype-define-bug'),
						i = e('../internals/object-define-property'),
						s = e('../internals/an-object'),
						a = e('../internals/to-indexed-object'),
						l = e('../internals/object-keys');
					n.f =
						r && !o
							? Object.defineProperties
							: function (e, t) {
									s(e);
									for (var n, r = a(t), o = l(t), c = o.length, u = 0; c > u; ) i.f(e, (n = o[u++]), r[n]);
									return e;
								};
				},
				{
					'../internals/an-object': 7,
					'../internals/descriptors': 26,
					'../internals/object-define-property': 74,
					'../internals/object-keys': 81,
					'../internals/to-indexed-object': 100,
					'../internals/v8-prototype-define-bug': 111,
				},
			],
			74: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/ie8-dom-define'),
						i = e('../internals/v8-prototype-define-bug'),
						s = e('../internals/an-object'),
						a = e('../internals/to-property-key'),
						l = TypeError,
						c = Object.defineProperty,
						u = Object.getOwnPropertyDescriptor,
						d = 'enumerable',
						f = 'configurable',
						p = 'writable';
					n.f = r
						? i
							? function (e, t, n) {
									if ((s(e), (t = a(t)), s(n), 'function' == typeof e && 'prototype' === t && 'value' in n && p in n && !n.writable)) {
										var r = u(e, t);
										r &&
											r.writable &&
											((e[t] = n.value),
											(n = { configurable: f in n ? n.configurable : r.configurable, enumerable: d in n ? n.enumerable : r.enumerable, writable: !1 }));
									}
									return c(e, t, n);
								}
							: c
						: function (e, t, n) {
								if ((s(e), (t = a(t)), s(n), o))
									try {
										return c(e, t, n);
									} catch (e) {}
								if ('get' in n || 'set' in n) throw l('Accessors not supported');
								return 'value' in n && (e[t] = n.value), e;
							};
				},
				{
					'../internals/an-object': 7,
					'../internals/descriptors': 26,
					'../internals/ie8-dom-define': 51,
					'../internals/to-property-key': 105,
					'../internals/v8-prototype-define-bug': 111,
				},
			],
			75: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/function-call'),
						i = e('../internals/object-property-is-enumerable'),
						s = e('../internals/create-property-descriptor'),
						a = e('../internals/to-indexed-object'),
						l = e('../internals/to-property-key'),
						c = e('../internals/has-own-property'),
						u = e('../internals/ie8-dom-define'),
						d = Object.getOwnPropertyDescriptor;
					n.f = r
						? d
						: function (e, t) {
								if (((e = a(e)), (t = l(t)), u))
									try {
										return d(e, t);
									} catch (e) {}
								if (c(e, t)) return s(!o(i.f, e, t), e[t]);
							};
				},
				{
					'../internals/create-property-descriptor': 19,
					'../internals/descriptors': 26,
					'../internals/function-call': 39,
					'../internals/has-own-property': 48,
					'../internals/ie8-dom-define': 51,
					'../internals/object-property-is-enumerable': 82,
					'../internals/to-indexed-object': 100,
					'../internals/to-property-key': 105,
				},
			],
			76: [
				function (e, t, n) {
					var r = e('../internals/object-keys-internal'),
						o = e('../internals/enum-bug-keys').concat('length', 'prototype');
					n.f =
						Object.getOwnPropertyNames ||
						function (e) {
							return r(e, o);
						};
				},
				{ '../internals/enum-bug-keys': 32, '../internals/object-keys-internal': 80 },
			],
			77: [
				function (e, t, n) {
					n.f = Object.getOwnPropertySymbols;
				},
				{},
			],
			78: [
				function (e, t, n) {
					var r = e('../internals/has-own-property'),
						o = e('../internals/is-callable'),
						i = e('../internals/to-object'),
						s = e('../internals/shared-key'),
						a = e('../internals/correct-prototype-getter'),
						l = s('IE_PROTO'),
						c = Object,
						u = c.prototype;
					t.exports = a
						? c.getPrototypeOf
						: function (e) {
								var t = i(e);
								if (r(t, l)) return t[l];
								var n = t.constructor;
								return o(n) && t instanceof n ? n.prototype : t instanceof c ? u : null;
							};
				},
				{
					'../internals/correct-prototype-getter': 16,
					'../internals/has-own-property': 48,
					'../internals/is-callable': 56,
					'../internals/shared-key': 94,
					'../internals/to-object': 103,
				},
			],
			79: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this');
					t.exports = r({}.isPrototypeOf);
				},
				{ '../internals/function-uncurry-this': 41 },
			],
			80: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/has-own-property'),
						i = e('../internals/to-indexed-object'),
						s = e('../internals/array-includes').indexOf,
						a = e('../internals/hidden-keys'),
						l = r([].push);
					t.exports = function (e, t) {
						var n,
							r = i(e),
							c = 0,
							u = [];
						for (n in r) !o(a, n) && o(r, n) && l(u, n);
						for (; t.length > c; ) o(r, (n = t[c++])) && (~s(u, n) || l(u, n));
						return u;
					};
				},
				{
					'../internals/array-includes': 9,
					'../internals/function-uncurry-this': 41,
					'../internals/has-own-property': 48,
					'../internals/hidden-keys': 49,
					'../internals/to-indexed-object': 100,
				},
			],
			81: [
				function (e, t, n) {
					var r = e('../internals/object-keys-internal'),
						o = e('../internals/enum-bug-keys');
					t.exports =
						Object.keys ||
						function (e) {
							return r(e, o);
						};
				},
				{ '../internals/enum-bug-keys': 32, '../internals/object-keys-internal': 80 },
			],
			82: [
				function (e, t, n) {
					'use strict';
					var r = {}.propertyIsEnumerable,
						o = Object.getOwnPropertyDescriptor,
						i = o && !r.call({ 1: 2 }, 1);
					n.f = i
						? function (e) {
								var t = o(this, e);
								return !!t && t.enumerable;
							}
						: r;
				},
				{},
			],
			83: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/an-object'),
						i = e('../internals/a-possible-prototype');
					t.exports =
						Object.setPrototypeOf ||
						('__proto__' in {}
							? (function () {
									var e,
										t = !1,
										n = {};
									try {
										(e = r(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set))(n, []), (t = n instanceof Array);
									} catch (e) {}
									return function (n, r) {
										return o(n), i(r), t ? e(n, r) : (n.__proto__ = r), n;
									};
								})()
							: void 0);
				},
				{ '../internals/a-possible-prototype': 3, '../internals/an-object': 7, '../internals/function-uncurry-this': 41 },
			],
			84: [
				function (e, t, n) {
					var r = e('../internals/function-call'),
						o = e('../internals/is-callable'),
						i = e('../internals/is-object'),
						s = TypeError;
					t.exports = function (e, t) {
						var n, a;
						if ('string' === t && o((n = e.toString)) && !i((a = r(n, e)))) return a;
						if (o((n = e.valueOf)) && !i((a = r(n, e)))) return a;
						if ('string' !== t && o((n = e.toString)) && !i((a = r(n, e)))) return a;
						throw s("Can't convert object to primitive value");
					};
				},
				{ '../internals/function-call': 39, '../internals/is-callable': 56, '../internals/is-object': 59 },
			],
			85: [
				function (e, t, n) {
					var r = e('../internals/get-built-in'),
						o = e('../internals/function-uncurry-this'),
						i = e('../internals/object-get-own-property-names'),
						s = e('../internals/object-get-own-property-symbols'),
						a = e('../internals/an-object'),
						l = o([].concat);
					t.exports =
						r('Reflect', 'ownKeys') ||
						function (e) {
							var t = i.f(a(e)),
								n = s.f;
							return n ? l(t, n(e)) : t;
						};
				},
				{
					'../internals/an-object': 7,
					'../internals/function-uncurry-this': 41,
					'../internals/get-built-in': 42,
					'../internals/object-get-own-property-names': 76,
					'../internals/object-get-own-property-symbols': 77,
				},
			],
			86: [
				function (e, t, n) {
					var r = e('../internals/function-call'),
						o = e('../internals/an-object'),
						i = e('../internals/is-callable'),
						s = e('../internals/classof-raw'),
						a = e('../internals/regexp-exec'),
						l = TypeError;
					t.exports = function (e, t) {
						var n = e.exec;
						if (i(n)) {
							var c = r(n, e, t);
							return null !== c && o(c), c;
						}
						if ('RegExp' === s(e)) return r(a, e, t);
						throw l('RegExp#exec called on incompatible receiver');
					};
				},
				{ '../internals/an-object': 7, '../internals/classof-raw': 13, '../internals/function-call': 39, '../internals/is-callable': 56, '../internals/regexp-exec': 87 },
			],
			87: [
				function (e, t, n) {
					'use strict';
					var r,
						o,
						i = e('../internals/function-call'),
						s = e('../internals/function-uncurry-this'),
						a = e('../internals/to-string'),
						l = e('../internals/regexp-flags'),
						c = e('../internals/regexp-sticky-helpers'),
						u = e('../internals/shared'),
						d = e('../internals/object-create'),
						f = e('../internals/internal-state').get,
						p = e('../internals/regexp-unsupported-dot-all'),
						h = e('../internals/regexp-unsupported-ncg'),
						m = u('native-string-replace', String.prototype.replace),
						y = RegExp.prototype.exec,
						v = y,
						g = s(''.charAt),
						b = s(''.indexOf),
						w = s(''.replace),
						_ = s(''.slice),
						x = ((o = /b*/g), i(y, (r = /a/), 'a'), i(y, o, 'a'), 0 !== r.lastIndex || 0 !== o.lastIndex),
						k = c.BROKEN_CARET,
						C = void 0 !== /()??/.exec('')[1];
					(x || C || k || p || h) &&
						(v = function (e) {
							var t,
								n,
								r,
								o,
								s,
								c,
								u,
								p = this,
								h = f(p),
								E = a(e),
								j = h.raw;
							if (j) return (j.lastIndex = p.lastIndex), (t = i(v, j, E)), (p.lastIndex = j.lastIndex), t;
							var S = h.groups,
								D = k && p.sticky,
								O = i(l, p),
								P = p.source,
								B = 0,
								M = E;
							if (
								(D &&
									((O = w(O, 'y', '')),
									-1 === b(O, 'g') && (O += 'g'),
									(M = _(E, p.lastIndex)),
									p.lastIndex > 0 && (!p.multiline || (p.multiline && '\n' !== g(E, p.lastIndex - 1))) && ((P = '(?: ' + P + ')'), (M = ' ' + M), B++),
									(n = new RegExp('^(?:' + P + ')', O))),
								C && (n = new RegExp('^' + P + '$(?!\\s)', O)),
								x && (r = p.lastIndex),
								(o = i(y, D ? n : p, M)),
								D
									? o
										? ((o.input = _(o.input, B)), (o[0] = _(o[0], B)), (o.index = p.lastIndex), (p.lastIndex += o[0].length))
										: (p.lastIndex = 0)
									: x && o && (p.lastIndex = p.global ? o.index + o[0].length : r),
								C &&
									o &&
									o.length > 1 &&
									i(m, o[0], n, function () {
										for (s = 1; s < arguments.length - 2; s++) void 0 === arguments[s] && (o[s] = void 0);
									}),
								o && S)
							)
								for (o.groups = c = d(null), s = 0; s < S.length; s++) c[(u = S[s])[0]] = o[u[1]];
							return o;
						}),
						(t.exports = v);
				},
				{
					'../internals/function-call': 39,
					'../internals/function-uncurry-this': 41,
					'../internals/internal-state': 54,
					'../internals/object-create': 72,
					'../internals/regexp-flags': 88,
					'../internals/regexp-sticky-helpers': 89,
					'../internals/regexp-unsupported-dot-all': 90,
					'../internals/regexp-unsupported-ncg': 91,
					'../internals/shared': 96,
					'../internals/to-string': 107,
				},
			],
			88: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/an-object');
					t.exports = function () {
						var e = r(this),
							t = '';
						return (
							e.hasIndices && (t += 'd'),
							e.global && (t += 'g'),
							e.ignoreCase && (t += 'i'),
							e.multiline && (t += 'm'),
							e.dotAll && (t += 's'),
							e.unicode && (t += 'u'),
							e.unicodeSets && (t += 'v'),
							e.sticky && (t += 'y'),
							t
						);
					};
				},
				{ '../internals/an-object': 7 },
			],
			89: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/global').RegExp,
						i = r(function () {
							var e = o('a', 'y');
							return (e.lastIndex = 2), null != e.exec('abcd');
						}),
						s =
							i ||
							r(function () {
								return !o('a', 'y').sticky;
							}),
						a =
							i ||
							r(function () {
								var e = o('^r', 'gy');
								return (e.lastIndex = 2), null != e.exec('str');
							});
					t.exports = { BROKEN_CARET: a, MISSED_STICKY: s, UNSUPPORTED_Y: i };
				},
				{ '../internals/fails': 34, '../internals/global': 47 },
			],
			90: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/global').RegExp;
					t.exports = r(function () {
						var e = o('.', 's');
						return !(e.dotAll && e.exec('\n') && 's' === e.flags);
					});
				},
				{ '../internals/fails': 34, '../internals/global': 47 },
			],
			91: [
				function (e, t, n) {
					var r = e('../internals/fails'),
						o = e('../internals/global').RegExp;
					t.exports = r(function () {
						var e = o('(?<a>b)', 'g');
						return 'b' !== e.exec('b').groups.a || 'bc' !== 'b'.replace(e, '$<a>c');
					});
				},
				{ '../internals/fails': 34, '../internals/global': 47 },
			],
			92: [
				function (e, t, n) {
					var r = TypeError;
					t.exports = function (e) {
						if (null == e) throw r("Can't call method on " + e);
						return e;
					};
				},
				{},
			],
			93: [
				function (e, t, n) {
					var r = e('../internals/object-define-property').f,
						o = e('../internals/has-own-property'),
						i = e('../internals/well-known-symbol')('toStringTag');
					t.exports = function (e, t, n) {
						e && !n && (e = e.prototype), e && !o(e, i) && r(e, i, { configurable: !0, value: t });
					};
				},
				{ '../internals/has-own-property': 48, '../internals/object-define-property': 74, '../internals/well-known-symbol': 113 },
			],
			94: [
				function (e, t, n) {
					var r = e('../internals/shared'),
						o = e('../internals/uid'),
						i = r('keys');
					t.exports = function (e) {
						return i[e] || (i[e] = o(e));
					};
				},
				{ '../internals/shared': 96, '../internals/uid': 109 },
			],
			95: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/define-global-property'),
						i = '__core-js_shared__',
						s = r[i] || o(i, {});
					t.exports = s;
				},
				{ '../internals/define-global-property': 24, '../internals/global': 47 },
			],
			96: [
				function (e, t, n) {
					var r = e('../internals/is-pure'),
						o = e('../internals/shared-store');
					(t.exports = function (e, t) {
						return o[e] || (o[e] = void 0 !== t ? t : {});
					})('versions', []).push({
						version: '3.23.5',
						mode: r ? 'pure' : 'global',
						copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
						license: 'https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE',
						source: 'https://github.com/zloirock/core-js',
					});
				},
				{ '../internals/is-pure': 60, '../internals/shared-store': 95 },
			],
			97: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = e('../internals/to-integer-or-infinity'),
						i = e('../internals/to-string'),
						s = e('../internals/require-object-coercible'),
						a = r(''.charAt),
						l = r(''.charCodeAt),
						c = r(''.slice),
						u = function (e) {
							return function (t, n) {
								var r,
									u,
									d = i(s(t)),
									f = o(n),
									p = d.length;
								return f < 0 || f >= p
									? e
										? ''
										: void 0
									: (r = l(d, f)) < 55296 || r > 56319 || f + 1 === p || (u = l(d, f + 1)) < 56320 || u > 57343
										? e
											? a(d, f)
											: r
										: e
											? c(d, f, f + 2)
											: u - 56320 + ((r - 55296) << 10) + 65536;
							};
						};
					t.exports = { codeAt: u(!1), charAt: u(!0) };
				},
				{
					'../internals/function-uncurry-this': 41,
					'../internals/require-object-coercible': 92,
					'../internals/to-integer-or-infinity': 101,
					'../internals/to-string': 107,
				},
			],
			98: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/function-uncurry-this'),
						o = 2147483647,
						i = /[^\0-\u007E]/,
						s = /[.\u3002\uFF0E\uFF61]/g,
						a = 'Overflow: input needs wider integers to process',
						l = RangeError,
						c = r(s.exec),
						u = Math.floor,
						d = String.fromCharCode,
						f = r(''.charCodeAt),
						p = r([].join),
						h = r([].push),
						m = r(''.replace),
						y = r(''.split),
						v = r(''.toLowerCase),
						g = function (e) {
							return e + 22 + 75 * (e < 26);
						},
						b = function (e, t, n) {
							var r = 0;
							for (e = n ? u(e / 700) : e >> 1, e += u(e / t); e > 455; ) (e = u(e / 35)), (r += 36);
							return u(r + (36 * e) / (e + 38));
						},
						w = function (e) {
							var t = [];
							e = (function (e) {
								for (var t = [], n = 0, r = e.length; n < r; ) {
									var o = f(e, n++);
									if (o >= 55296 && o <= 56319 && n < r) {
										var i = f(e, n++);
										56320 == (64512 & i) ? h(t, ((1023 & o) << 10) + (1023 & i) + 65536) : (h(t, o), n--);
									} else h(t, o);
								}
								return t;
							})(e);
							var n,
								r,
								i = e.length,
								s = 128,
								c = 0,
								m = 72;
							for (n = 0; n < e.length; n++) (r = e[n]) < 128 && h(t, d(r));
							var y = t.length,
								v = y;
							for (y && h(t, '-'); v < i; ) {
								var w = o;
								for (n = 0; n < e.length; n++) (r = e[n]) >= s && r < w && (w = r);
								var _ = v + 1;
								if (w - s > u((o - c) / _)) throw l(a);
								for (c += (w - s) * _, s = w, n = 0; n < e.length; n++) {
									if ((r = e[n]) < s && ++c > o) throw l(a);
									if (r == s) {
										for (var x = c, k = 36; ; ) {
											var C = k <= m ? 1 : k >= m + 26 ? 26 : k - m;
											if (x < C) break;
											var E = x - C,
												j = 36 - C;
											h(t, d(g(C + (E % j)))), (x = u(E / j)), (k += 36);
										}
										h(t, d(g(x))), (m = b(c, _, v == y)), (c = 0), v++;
									}
								}
								c++, s++;
							}
							return p(t, '');
						};
					t.exports = function (e) {
						var t,
							n,
							r = [],
							o = y(m(v(e), s, '.'), '.');
						for (t = 0; t < o.length; t++) (n = o[t]), h(r, c(i, n) ? 'xn--' + w(n) : n);
						return p(r, '.');
					};
				},
				{ '../internals/function-uncurry-this': 41 },
			],
			99: [
				function (e, t, n) {
					var r = e('../internals/to-integer-or-infinity'),
						o = Math.max,
						i = Math.min;
					t.exports = function (e, t) {
						var n = r(e);
						return n < 0 ? o(n + t, 0) : i(n, t);
					};
				},
				{ '../internals/to-integer-or-infinity': 101 },
			],
			100: [
				function (e, t, n) {
					var r = e('../internals/indexed-object'),
						o = e('../internals/require-object-coercible');
					t.exports = function (e) {
						return r(o(e));
					};
				},
				{ '../internals/indexed-object': 52, '../internals/require-object-coercible': 92 },
			],
			101: [
				function (e, t, n) {
					var r = e('../internals/math-trunc');
					t.exports = function (e) {
						var t = +e;
						return t != t || 0 === t ? 0 : r(t);
					};
				},
				{ '../internals/math-trunc': 67 },
			],
			102: [
				function (e, t, n) {
					var r = e('../internals/to-integer-or-infinity'),
						o = Math.min;
					t.exports = function (e) {
						return e > 0 ? o(r(e), 9007199254740991) : 0;
					};
				},
				{ '../internals/to-integer-or-infinity': 101 },
			],
			103: [
				function (e, t, n) {
					var r = e('../internals/require-object-coercible'),
						o = Object;
					t.exports = function (e) {
						return o(r(e));
					};
				},
				{ '../internals/require-object-coercible': 92 },
			],
			104: [
				function (e, t, n) {
					var r = e('../internals/function-call'),
						o = e('../internals/is-object'),
						i = e('../internals/is-symbol'),
						s = e('../internals/get-method'),
						a = e('../internals/ordinary-to-primitive'),
						l = e('../internals/well-known-symbol'),
						c = TypeError,
						u = l('toPrimitive');
					t.exports = function (e, t) {
						if (!o(e) || i(e)) return e;
						var n,
							l = s(e, u);
						if (l) {
							if ((void 0 === t && (t = 'default'), (n = r(l, e, t)), !o(n) || i(n))) return n;
							throw c("Can't convert object to primitive value");
						}
						return void 0 === t && (t = 'number'), a(e, t);
					};
				},
				{
					'../internals/function-call': 39,
					'../internals/get-method': 45,
					'../internals/is-object': 59,
					'../internals/is-symbol': 61,
					'../internals/ordinary-to-primitive': 84,
					'../internals/well-known-symbol': 113,
				},
			],
			105: [
				function (e, t, n) {
					var r = e('../internals/to-primitive'),
						o = e('../internals/is-symbol');
					t.exports = function (e) {
						var t = r(e, 'string');
						return o(t) ? t : t + '';
					};
				},
				{ '../internals/is-symbol': 61, '../internals/to-primitive': 104 },
			],
			106: [
				function (e, t, n) {
					var r = {};
					(r[e('../internals/well-known-symbol')('toStringTag')] = 'z'), (t.exports = '[object z]' === String(r));
				},
				{ '../internals/well-known-symbol': 113 },
			],
			107: [
				function (e, t, n) {
					var r = e('../internals/classof'),
						o = String;
					t.exports = function (e) {
						if ('Symbol' === r(e)) throw TypeError('Cannot convert a Symbol value to a string');
						return o(e);
					};
				},
				{ '../internals/classof': 14 },
			],
			108: [
				function (e, t, n) {
					var r = String;
					t.exports = function (e) {
						try {
							return r(e);
						} catch (e) {
							return 'Object';
						}
					};
				},
				{},
			],
			109: [
				function (e, t, n) {
					var r = e('../internals/function-uncurry-this'),
						o = 0,
						i = Math.random(),
						s = r((1).toString);
					t.exports = function (e) {
						return 'Symbol(' + (void 0 === e ? '' : e) + ')_' + s(++o + i, 36);
					};
				},
				{ '../internals/function-uncurry-this': 41 },
			],
			110: [
				function (e, t, n) {
					var r = e('../internals/native-symbol');
					t.exports = r && !Symbol.sham && 'symbol' == typeof Symbol.iterator;
				},
				{ '../internals/native-symbol': 68 },
			],
			111: [
				function (e, t, n) {
					var r = e('../internals/descriptors'),
						o = e('../internals/fails');
					t.exports =
						r &&
						o(function () {
							return 42 != Object.defineProperty(function () {}, 'prototype', { value: 42, writable: !1 }).prototype;
						});
				},
				{ '../internals/descriptors': 26, '../internals/fails': 34 },
			],
			112: [
				function (e, t, n) {
					var r = TypeError;
					t.exports = function (e, t) {
						if (e < t) throw r('Not enough arguments');
						return e;
					};
				},
				{},
			],
			113: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/shared'),
						i = e('../internals/has-own-property'),
						s = e('../internals/uid'),
						a = e('../internals/native-symbol'),
						l = e('../internals/use-symbol-as-uid'),
						c = o('wks'),
						u = r.Symbol,
						d = u && u.for,
						f = l ? u : (u && u.withoutSetter) || s;
					t.exports = function (e) {
						if (!i(c, e) || (!a && 'string' != typeof c[e])) {
							var t = 'Symbol.' + e;
							a && i(u, e) ? (c[e] = u[e]) : (c[e] = l && d ? d(t) : f(t));
						}
						return c[e];
					};
				},
				{
					'../internals/global': 47,
					'../internals/has-own-property': 48,
					'../internals/native-symbol': 68,
					'../internals/shared': 96,
					'../internals/uid': 109,
					'../internals/use-symbol-as-uid': 110,
				},
			],
			114: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/to-indexed-object'),
						o = e('../internals/add-to-unscopables'),
						i = e('../internals/iterators'),
						s = e('../internals/internal-state'),
						a = e('../internals/object-define-property').f,
						l = e('../internals/define-iterator'),
						c = e('../internals/is-pure'),
						u = e('../internals/descriptors'),
						d = 'Array Iterator',
						f = s.set,
						p = s.getterFor(d);
					t.exports = l(
						Array,
						'Array',
						function (e, t) {
							f(this, { type: d, target: r(e), index: 0, kind: t });
						},
						function () {
							var e = p(this),
								t = e.target,
								n = e.kind,
								r = e.index++;
							return !t || r >= t.length
								? ((e.target = void 0), { value: void 0, done: !0 })
								: 'keys' == n
									? { value: r, done: !1 }
									: 'values' == n
										? { value: t[r], done: !1 }
										: { value: [r, t[r]], done: !1 };
						},
						'values'
					);
					var h = (i.Arguments = i.Array);
					if ((o('keys'), o('values'), o('entries'), !c && u && 'values' !== h.name))
						try {
							a(h, 'name', { value: 'values' });
						} catch (e) {}
				},
				{
					'../internals/add-to-unscopables': 4,
					'../internals/define-iterator': 25,
					'../internals/descriptors': 26,
					'../internals/internal-state': 54,
					'../internals/is-pure': 60,
					'../internals/iterators': 64,
					'../internals/object-define-property': 74,
					'../internals/to-indexed-object': 100,
				},
			],
			115: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/export'),
						o = e('../internals/regexp-exec');
					r({ target: 'RegExp', proto: !0, forced: /./.exec !== o }, { exec: o });
				},
				{ '../internals/export': 33, '../internals/regexp-exec': 87 },
			],
			116: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/string-multibyte').charAt,
						o = e('../internals/to-string'),
						i = e('../internals/internal-state'),
						s = e('../internals/define-iterator'),
						a = 'String Iterator',
						l = i.set,
						c = i.getterFor(a);
					s(
						String,
						'String',
						function (e) {
							l(this, { type: a, string: o(e), index: 0 });
						},
						function () {
							var e,
								t = c(this),
								n = t.string,
								o = t.index;
							return o >= n.length ? { value: void 0, done: !0 } : ((e = r(n, o)), (t.index += e.length), { value: e, done: !1 });
						}
					);
				},
				{ '../internals/define-iterator': 25, '../internals/internal-state': 54, '../internals/string-multibyte': 97, '../internals/to-string': 107 },
			],
			117: [
				function (e, t, n) {
					'use strict';
					var r = e('../internals/function-apply'),
						o = e('../internals/function-call'),
						i = e('../internals/function-uncurry-this'),
						s = e('../internals/fix-regexp-well-known-symbol-logic'),
						a = e('../internals/fails'),
						l = e('../internals/an-object'),
						c = e('../internals/is-callable'),
						u = e('../internals/to-integer-or-infinity'),
						d = e('../internals/to-length'),
						f = e('../internals/to-string'),
						p = e('../internals/require-object-coercible'),
						h = e('../internals/advance-string-index'),
						m = e('../internals/get-method'),
						y = e('../internals/get-substitution'),
						v = e('../internals/regexp-exec-abstract'),
						g = e('../internals/well-known-symbol')('replace'),
						b = Math.max,
						w = Math.min,
						_ = i([].concat),
						x = i([].push),
						k = i(''.indexOf),
						C = i(''.slice),
						E = '$0' === 'a'.replace(/./, '$0'),
						j = !!/./[g] && '' === /./[g]('a', '$0');
					s(
						'replace',
						function (e, t, n) {
							var i = j ? '$' : '$0';
							return [
								function (e, n) {
									var r = p(this),
										i = null == e ? void 0 : m(e, g);
									return i ? o(i, e, r, n) : o(t, f(r), e, n);
								},
								function (e, o) {
									var s = l(this),
										a = f(e);
									if ('string' == typeof o && -1 === k(o, i) && -1 === k(o, '$<')) {
										var p = n(t, s, a, o);
										if (p.done) return p.value;
									}
									var m = c(o);
									m || (o = f(o));
									var g = s.global;
									if (g) {
										var E = s.unicode;
										s.lastIndex = 0;
									}
									for (var j = []; ; ) {
										var S = v(s, a);
										if (null === S) break;
										if ((x(j, S), !g)) break;
										'' === f(S[0]) && (s.lastIndex = h(a, d(s.lastIndex), E));
									}
									for (var D, O = '', P = 0, B = 0; B < j.length; B++) {
										for (var M = f((S = j[B])[0]), I = b(w(u(S.index), a.length), 0), A = [], T = 1; T < S.length; T++)
											x(A, void 0 === (D = S[T]) ? D : String(D));
										var K = S.groups;
										if (m) {
											var L = _([M], A, I, a);
											void 0 !== K && x(L, K);
											var R = f(r(o, void 0, L));
										} else R = y(M, a, I, A, K, o);
										I >= P && ((O += C(a, P, I) + R), (P = I + M.length));
									}
									return O + C(a, P);
								},
							];
						},
						!!a(function () {
							var e = /./;
							return (
								(e.exec = function () {
									var e = [];
									return (e.groups = { a: '7' }), e;
								}),
								'7' !== ''.replace(e, '$<a>')
							);
						}) ||
							!E ||
							j
					);
				},
				{
					'../internals/advance-string-index': 5,
					'../internals/an-object': 7,
					'../internals/fails': 34,
					'../internals/fix-regexp-well-known-symbol-logic': 35,
					'../internals/function-apply': 36,
					'../internals/function-call': 39,
					'../internals/function-uncurry-this': 41,
					'../internals/get-method': 45,
					'../internals/get-substitution': 46,
					'../internals/is-callable': 56,
					'../internals/regexp-exec-abstract': 86,
					'../internals/require-object-coercible': 92,
					'../internals/to-integer-or-infinity': 101,
					'../internals/to-length': 102,
					'../internals/to-string': 107,
					'../internals/well-known-symbol': 113,
				},
			],
			118: [
				function (e, t, n) {
					var r = e('../internals/global'),
						o = e('../internals/dom-iterables'),
						i = e('../internals/dom-token-list-prototype'),
						s = e('../modules/es.array.iterator'),
						a = e('../internals/create-non-enumerable-property'),
						l = e('../internals/well-known-symbol'),
						c = l('iterator'),
						u = l('toStringTag'),
						d = s.values,
						f = function (e, t) {
							if (e) {
								if (e[c] !== d)
									try {
										a(e, c, d);
									} catch (t) {
										e[c] = d;
									}
								if ((e[u] || a(e, u, t), o[t]))
									for (var n in s)
										if (e[n] !== s[n])
											try {
												a(e, n, s[n]);
											} catch (t) {
												e[n] = s[n];
											}
							}
						};
					for (var p in o) f(r[p] && r[p].prototype, p);
					f(i, 'DOMTokenList');
				},
				{
					'../internals/create-non-enumerable-property': 18,
					'../internals/dom-iterables': 28,
					'../internals/dom-token-list-prototype': 29,
					'../internals/global': 47,
					'../internals/well-known-symbol': 113,
					'../modules/es.array.iterator': 114,
				},
			],
			119: [
				function (e, t, n) {
					'use strict';
					e('../modules/es.array.iterator');
					var r = e('../internals/export'),
						o = e('../internals/global'),
						i = e('../internals/function-call'),
						s = e('../internals/function-uncurry-this'),
						a = e('../internals/descriptors'),
						l = e('../internals/native-url'),
						c = e('../internals/define-built-in'),
						u = e('../internals/define-built-ins'),
						d = e('../internals/set-to-string-tag'),
						f = e('../internals/create-iterator-constructor'),
						p = e('../internals/internal-state'),
						h = e('../internals/an-instance'),
						m = e('../internals/is-callable'),
						y = e('../internals/has-own-property'),
						v = e('../internals/function-bind-context'),
						g = e('../internals/classof'),
						b = e('../internals/an-object'),
						w = e('../internals/is-object'),
						_ = e('../internals/to-string'),
						x = e('../internals/object-create'),
						k = e('../internals/create-property-descriptor'),
						C = e('../internals/get-iterator'),
						E = e('../internals/get-iterator-method'),
						j = e('../internals/validate-arguments-length'),
						S = e('../internals/well-known-symbol'),
						D = e('../internals/array-sort'),
						O = S('iterator'),
						P = 'URLSearchParams',
						B = 'URLSearchParamsIterator',
						M = p.set,
						I = p.getterFor(P),
						A = p.getterFor(B),
						T = Object.getOwnPropertyDescriptor,
						K = function (e) {
							if (!a) return o[e];
							var t = T(o, e);
							return t && t.value;
						},
						L = K('fetch'),
						R = K('Request'),
						N = K('Headers'),
						z = R && R.prototype,
						F = N && N.prototype,
						U = o.RegExp,
						H = o.TypeError,
						V = o.decodeURIComponent,
						q = o.encodeURIComponent,
						W = s(''.charAt),
						G = s([].join),
						Y = s([].push),
						X = s(''.replace),
						$ = s([].shift),
						J = s([].splice),
						Q = s(''.split),
						Z = s(''.slice),
						ee = /\+/g,
						te = Array(4),
						ne = function (e) {
							return te[e - 1] || (te[e - 1] = U('((?:%[\\da-f]{2}){' + e + '})', 'gi'));
						},
						re = function (e) {
							try {
								return V(e);
							} catch (t) {
								return e;
							}
						},
						oe = function (e) {
							var t = X(e, ee, ' '),
								n = 4;
							try {
								return V(t);
							} catch (e) {
								for (; n; ) t = X(t, ne(n--), re);
								return t;
							}
						},
						ie = /[!'()~]|%20/g,
						se = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+' },
						ae = function (e) {
							return se[e];
						},
						le = function (e) {
							return X(q(e), ie, ae);
						},
						ce = f(
							function (e, t) {
								M(this, { type: B, iterator: C(I(e).entries), kind: t });
							},
							'Iterator',
							function () {
								var e = A(this),
									t = e.kind,
									n = e.iterator.next(),
									r = n.value;
								return n.done || (n.value = 'keys' === t ? r.key : 'values' === t ? r.value : [r.key, r.value]), n;
							},
							!0
						),
						ue = function (e) {
							(this.entries = []),
								(this.url = null),
								void 0 !== e && (w(e) ? this.parseObject(e) : this.parseQuery('string' == typeof e ? ('?' === W(e, 0) ? Z(e, 1) : e) : _(e)));
						};
					ue.prototype = {
						type: P,
						bindURL: function (e) {
							(this.url = e), this.update();
						},
						parseObject: function (e) {
							var t,
								n,
								r,
								o,
								s,
								a,
								l,
								c = E(e);
							if (c)
								for (n = (t = C(e, c)).next; !(r = i(n, t)).done; ) {
									if (((s = (o = C(b(r.value))).next), (a = i(s, o)).done || (l = i(s, o)).done || !i(s, o).done)) throw H('Expected sequence with length 2');
									Y(this.entries, { key: _(a.value), value: _(l.value) });
								}
							else for (var u in e) y(e, u) && Y(this.entries, { key: u, value: _(e[u]) });
						},
						parseQuery: function (e) {
							if (e)
								for (var t, n, r = Q(e, '&'), o = 0; o < r.length; )
									(t = r[o++]).length && ((n = Q(t, '=')), Y(this.entries, { key: oe($(n)), value: oe(G(n, '=')) }));
						},
						serialize: function () {
							for (var e, t = this.entries, n = [], r = 0; r < t.length; ) (e = t[r++]), Y(n, le(e.key) + '=' + le(e.value));
							return G(n, '&');
						},
						update: function () {
							(this.entries.length = 0), this.parseQuery(this.url.query);
						},
						updateURL: function () {
							this.url && this.url.update();
						},
					};
					var de = function () {
							h(this, fe);
							var e = arguments.length > 0 ? arguments[0] : void 0;
							M(this, new ue(e));
						},
						fe = de.prototype;
					if (
						(u(
							fe,
							{
								append: function (e, t) {
									j(arguments.length, 2);
									var n = I(this);
									Y(n.entries, { key: _(e), value: _(t) }), n.updateURL();
								},
								delete: function (e) {
									j(arguments.length, 1);
									for (var t = I(this), n = t.entries, r = _(e), o = 0; o < n.length; ) n[o].key === r ? J(n, o, 1) : o++;
									t.updateURL();
								},
								get: function (e) {
									j(arguments.length, 1);
									for (var t = I(this).entries, n = _(e), r = 0; r < t.length; r++) if (t[r].key === n) return t[r].value;
									return null;
								},
								getAll: function (e) {
									j(arguments.length, 1);
									for (var t = I(this).entries, n = _(e), r = [], o = 0; o < t.length; o++) t[o].key === n && Y(r, t[o].value);
									return r;
								},
								has: function (e) {
									j(arguments.length, 1);
									for (var t = I(this).entries, n = _(e), r = 0; r < t.length; ) if (t[r++].key === n) return !0;
									return !1;
								},
								set: function (e, t) {
									j(arguments.length, 1);
									for (var n, r = I(this), o = r.entries, i = !1, s = _(e), a = _(t), l = 0; l < o.length; l++)
										(n = o[l]).key === s && (i ? J(o, l--, 1) : ((i = !0), (n.value = a)));
									i || Y(o, { key: s, value: a }), r.updateURL();
								},
								sort: function () {
									var e = I(this);
									D(e.entries, function (e, t) {
										return e.key > t.key ? 1 : -1;
									}),
										e.updateURL();
								},
								forEach: function (e) {
									for (var t, n = I(this).entries, r = v(e, arguments.length > 1 ? arguments[1] : void 0), o = 0; o < n.length; )
										r((t = n[o++]).value, t.key, this);
								},
								keys: function () {
									return new ce(this, 'keys');
								},
								values: function () {
									return new ce(this, 'values');
								},
								entries: function () {
									return new ce(this, 'entries');
								},
							},
							{ enumerable: !0 }
						),
						c(fe, O, fe.entries, { name: 'entries' }),
						c(
							fe,
							'toString',
							function () {
								return I(this).serialize();
							},
							{ enumerable: !0 }
						),
						d(de, P),
						r({ global: !0, constructor: !0, forced: !l }, { URLSearchParams: de }),
						!l && m(N))
					) {
						var pe = s(F.has),
							he = s(F.set),
							me = function (e) {
								if (w(e)) {
									var t,
										n = e.body;
									if (g(n) === P)
										return (
											(t = e.headers ? new N(e.headers) : new N()),
											pe(t, 'content-type') || he(t, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8'),
											x(e, { body: k(0, _(n)), headers: k(0, t) })
										);
								}
								return e;
							};
						if (
							(m(L) &&
								r(
									{ global: !0, enumerable: !0, dontCallGetSet: !0, forced: !0 },
									{
										fetch: function (e) {
											return L(e, arguments.length > 1 ? me(arguments[1]) : {});
										},
									}
								),
							m(R))
						) {
							var ye = function (e) {
								return h(this, z), new R(e, arguments.length > 1 ? me(arguments[1]) : {});
							};
							(z.constructor = ye), (ye.prototype = z), r({ global: !0, constructor: !0, dontCallGetSet: !0, forced: !0 }, { Request: ye });
						}
					}
					t.exports = { URLSearchParams: de, getState: I };
				},
				{
					'../internals/an-instance': 6,
					'../internals/an-object': 7,
					'../internals/array-sort': 11,
					'../internals/classof': 14,
					'../internals/create-iterator-constructor': 17,
					'../internals/create-property-descriptor': 19,
					'../internals/define-built-in': 22,
					'../internals/define-built-ins': 23,
					'../internals/descriptors': 26,
					'../internals/export': 33,
					'../internals/function-bind-context': 37,
					'../internals/function-call': 39,
					'../internals/function-uncurry-this': 41,
					'../internals/get-iterator': 44,
					'../internals/get-iterator-method': 43,
					'../internals/global': 47,
					'../internals/has-own-property': 48,
					'../internals/internal-state': 54,
					'../internals/is-callable': 56,
					'../internals/is-object': 59,
					'../internals/native-url': 69,
					'../internals/object-create': 72,
					'../internals/set-to-string-tag': 93,
					'../internals/to-string': 107,
					'../internals/validate-arguments-length': 112,
					'../internals/well-known-symbol': 113,
					'../modules/es.array.iterator': 114,
				},
			],
			120: [
				function (e, t, n) {
					e('../modules/web.url-search-params.constructor');
				},
				{ '../modules/web.url-search-params.constructor': 119 },
			],
			121: [
				function (e, t, n) {
					'use strict';
					e('../modules/es.string.iterator');
					var r,
						o = e('../internals/export'),
						i = e('../internals/descriptors'),
						s = e('../internals/native-url'),
						a = e('../internals/global'),
						l = e('../internals/function-bind-context'),
						c = e('../internals/function-uncurry-this'),
						u = e('../internals/define-built-in'),
						d = e('../internals/define-built-in-accessor'),
						f = e('../internals/an-instance'),
						p = e('../internals/has-own-property'),
						h = e('../internals/object-assign'),
						m = e('../internals/array-from'),
						y = e('../internals/array-slice-simple'),
						v = e('../internals/string-multibyte').codeAt,
						g = e('../internals/string-punycode-to-ascii'),
						b = e('../internals/to-string'),
						w = e('../internals/set-to-string-tag'),
						_ = e('../internals/validate-arguments-length'),
						x = e('../modules/web.url-search-params.constructor'),
						k = e('../internals/internal-state'),
						C = k.set,
						E = k.getterFor('URL'),
						j = x.URLSearchParams,
						S = x.getState,
						D = a.URL,
						O = a.TypeError,
						P = a.parseInt,
						B = Math.floor,
						M = Math.pow,
						I = c(''.charAt),
						A = c(/./.exec),
						T = c([].join),
						K = c((1).toString),
						L = c([].pop),
						R = c([].push),
						N = c(''.replace),
						z = c([].shift),
						F = c(''.split),
						U = c(''.slice),
						H = c(''.toLowerCase),
						V = c([].unshift),
						q = 'Invalid scheme',
						W = 'Invalid host',
						G = 'Invalid port',
						Y = /[a-z]/i,
						X = /[\d+-.a-z]/i,
						$ = /\d/,
						J = /^0x/i,
						Q = /^[0-7]+$/,
						Z = /^\d+$/,
						ee = /^[\da-f]+$/i,
						te = /[\0\t\n\r #%/:<>?@[\\\]^|]/,
						ne = /[\0\t\n\r #/:<>?@[\\\]^|]/,
						re = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g,
						oe = /[\t\n\r]/g,
						ie = function (e) {
							var t, n, r, o;
							if ('number' == typeof e) {
								for (t = [], n = 0; n < 4; n++) V(t, e % 256), (e = B(e / 256));
								return T(t, '.');
							}
							if ('object' == typeof e) {
								for (
									t = '',
										r = (function (e) {
											for (var t = null, n = 1, r = null, o = 0, i = 0; i < 8; i++)
												0 !== e[i] ? (o > n && ((t = r), (n = o)), (r = null), (o = 0)) : (null === r && (r = i), ++o);
											return o > n && ((t = r), (n = o)), t;
										})(e),
										n = 0;
									n < 8;
									n++
								)
									(o && 0 === e[n]) || (o && (o = !1), r === n ? ((t += n ? ':' : '::'), (o = !0)) : ((t += K(e[n], 16)), n < 7 && (t += ':')));
								return '[' + t + ']';
							}
							return e;
						},
						se = {},
						ae = h({}, se, { ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1 }),
						le = h({}, ae, { '#': 1, '?': 1, '{': 1, '}': 1 }),
						ce = h({}, le, { '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1 }),
						ue = function (e, t) {
							var n = v(e, 0);
							return n > 32 && n < 127 && !p(t, e) ? e : encodeURIComponent(e);
						},
						de = { ftp: 21, file: null, http: 80, https: 443, ws: 80, wss: 443 },
						fe = function (e, t) {
							var n;
							return 2 == e.length && A(Y, I(e, 0)) && (':' == (n = I(e, 1)) || (!t && '|' == n));
						},
						pe = function (e) {
							var t;
							return e.length > 1 && fe(U(e, 0, 2)) && (2 == e.length || '/' === (t = I(e, 2)) || '\\' === t || '?' === t || '#' === t);
						},
						he = function (e) {
							return '.' === e || '%2e' === H(e);
						},
						me = {},
						ye = {},
						ve = {},
						ge = {},
						be = {},
						we = {},
						_e = {},
						xe = {},
						ke = {},
						Ce = {},
						Ee = {},
						je = {},
						Se = {},
						De = {},
						Oe = {},
						Pe = {},
						Be = {},
						Me = {},
						Ie = {},
						Ae = {},
						Te = {},
						Ke = function (e, t, n) {
							var r,
								o,
								i,
								s = b(e);
							if (t) {
								if ((o = this.parse(s))) throw O(o);
								this.searchParams = null;
							} else {
								if ((void 0 !== n && (r = new Ke(n, !0)), (o = this.parse(s, null, r)))) throw O(o);
								(i = S(new j())).bindURL(this), (this.searchParams = i);
							}
						};
					Ke.prototype = {
						type: 'URL',
						parse: function (e, t, n) {
							var o,
								i,
								s,
								a,
								l,
								c = this,
								u = t || me,
								d = 0,
								f = '',
								h = !1,
								v = !1,
								g = !1;
							for (
								e = b(e),
									t ||
										((c.scheme = ''),
										(c.username = ''),
										(c.password = ''),
										(c.host = null),
										(c.port = null),
										(c.path = []),
										(c.query = null),
										(c.fragment = null),
										(c.cannotBeABaseURL = !1),
										(e = N(e, re, ''))),
									e = N(e, oe, ''),
									o = m(e);
								d <= o.length;

							) {
								switch (((i = o[d]), u)) {
									case me:
										if (!i || !A(Y, i)) {
											if (t) return q;
											u = ve;
											continue;
										}
										(f += H(i)), (u = ye);
										break;
									case ye:
										if (i && (A(X, i) || '+' == i || '-' == i || '.' == i)) f += H(i);
										else {
											if (':' != i) {
												if (t) return q;
												(f = ''), (u = ve), (d = 0);
												continue;
											}
											if (
												t &&
												(c.isSpecial() != p(de, f) || ('file' == f && (c.includesCredentials() || null !== c.port)) || ('file' == c.scheme && !c.host))
											)
												return;
											if (((c.scheme = f), t)) return void (c.isSpecial() && de[c.scheme] == c.port && (c.port = null));
											(f = ''),
												'file' == c.scheme
													? (u = De)
													: c.isSpecial() && n && n.scheme == c.scheme
														? (u = ge)
														: c.isSpecial()
															? (u = xe)
															: '/' == o[d + 1]
																? ((u = be), d++)
																: ((c.cannotBeABaseURL = !0), R(c.path, ''), (u = Ie));
										}
										break;
									case ve:
										if (!n || (n.cannotBeABaseURL && '#' != i)) return q;
										if (n.cannotBeABaseURL && '#' == i) {
											(c.scheme = n.scheme), (c.path = y(n.path)), (c.query = n.query), (c.fragment = ''), (c.cannotBeABaseURL = !0), (u = Te);
											break;
										}
										u = 'file' == n.scheme ? De : we;
										continue;
									case ge:
										if ('/' != i || '/' != o[d + 1]) {
											u = we;
											continue;
										}
										(u = ke), d++;
										break;
									case be:
										if ('/' == i) {
											u = Ce;
											break;
										}
										u = Me;
										continue;
									case we:
										if (((c.scheme = n.scheme), i == r))
											(c.username = n.username), (c.password = n.password), (c.host = n.host), (c.port = n.port), (c.path = y(n.path)), (c.query = n.query);
										else if ('/' == i || ('\\' == i && c.isSpecial())) u = _e;
										else if ('?' == i)
											(c.username = n.username),
												(c.password = n.password),
												(c.host = n.host),
												(c.port = n.port),
												(c.path = y(n.path)),
												(c.query = ''),
												(u = Ae);
										else {
											if ('#' != i) {
												(c.username = n.username),
													(c.password = n.password),
													(c.host = n.host),
													(c.port = n.port),
													(c.path = y(n.path)),
													c.path.length--,
													(u = Me);
												continue;
											}
											(c.username = n.username),
												(c.password = n.password),
												(c.host = n.host),
												(c.port = n.port),
												(c.path = y(n.path)),
												(c.query = n.query),
												(c.fragment = ''),
												(u = Te);
										}
										break;
									case _e:
										if (!c.isSpecial() || ('/' != i && '\\' != i)) {
											if ('/' != i) {
												(c.username = n.username), (c.password = n.password), (c.host = n.host), (c.port = n.port), (u = Me);
												continue;
											}
											u = Ce;
										} else u = ke;
										break;
									case xe:
										if (((u = ke), '/' != i || '/' != I(f, d + 1))) continue;
										d++;
										break;
									case ke:
										if ('/' != i && '\\' != i) {
											u = Ce;
											continue;
										}
										break;
									case Ce:
										if ('@' == i) {
											h && (f = '%40' + f), (h = !0), (s = m(f));
											for (var w = 0; w < s.length; w++) {
												var _ = s[w];
												if (':' != _ || g) {
													var x = ue(_, ce);
													g ? (c.password += x) : (c.username += x);
												} else g = !0;
											}
											f = '';
										} else if (i == r || '/' == i || '?' == i || '#' == i || ('\\' == i && c.isSpecial())) {
											if (h && '' == f) return 'Invalid authority';
											(d -= m(f).length + 1), (f = ''), (u = Ee);
										} else f += i;
										break;
									case Ee:
									case je:
										if (t && 'file' == c.scheme) {
											u = Pe;
											continue;
										}
										if (':' != i || v) {
											if (i == r || '/' == i || '?' == i || '#' == i || ('\\' == i && c.isSpecial())) {
												if (c.isSpecial() && '' == f) return W;
												if (t && '' == f && (c.includesCredentials() || null !== c.port)) return;
												if ((a = c.parseHost(f))) return a;
												if (((f = ''), (u = Be), t)) return;
												continue;
											}
											'[' == i ? (v = !0) : ']' == i && (v = !1), (f += i);
										} else {
											if ('' == f) return W;
											if ((a = c.parseHost(f))) return a;
											if (((f = ''), (u = Se), t == je)) return;
										}
										break;
									case Se:
										if (!A($, i)) {
											if (i == r || '/' == i || '?' == i || '#' == i || ('\\' == i && c.isSpecial()) || t) {
												if ('' != f) {
													var k = P(f, 10);
													if (k > 65535) return G;
													(c.port = c.isSpecial() && k === de[c.scheme] ? null : k), (f = '');
												}
												if (t) return;
												u = Be;
												continue;
											}
											return G;
										}
										f += i;
										break;
									case De:
										if (((c.scheme = 'file'), '/' == i || '\\' == i)) u = Oe;
										else {
											if (!n || 'file' != n.scheme) {
												u = Me;
												continue;
											}
											if (i == r) (c.host = n.host), (c.path = y(n.path)), (c.query = n.query);
											else if ('?' == i) (c.host = n.host), (c.path = y(n.path)), (c.query = ''), (u = Ae);
											else {
												if ('#' != i) {
													pe(T(y(o, d), '')) || ((c.host = n.host), (c.path = y(n.path)), c.shortenPath()), (u = Me);
													continue;
												}
												(c.host = n.host), (c.path = y(n.path)), (c.query = n.query), (c.fragment = ''), (u = Te);
											}
										}
										break;
									case Oe:
										if ('/' == i || '\\' == i) {
											u = Pe;
											break;
										}
										n && 'file' == n.scheme && !pe(T(y(o, d), '')) && (fe(n.path[0], !0) ? R(c.path, n.path[0]) : (c.host = n.host)), (u = Me);
										continue;
									case Pe:
										if (i == r || '/' == i || '\\' == i || '?' == i || '#' == i) {
											if (!t && fe(f)) u = Me;
											else if ('' == f) {
												if (((c.host = ''), t)) return;
												u = Be;
											} else {
												if ((a = c.parseHost(f))) return a;
												if (('localhost' == c.host && (c.host = ''), t)) return;
												(f = ''), (u = Be);
											}
											continue;
										}
										f += i;
										break;
									case Be:
										if (c.isSpecial()) {
											if (((u = Me), '/' != i && '\\' != i)) continue;
										} else if (t || '?' != i)
											if (t || '#' != i) {
												if (i != r && ((u = Me), '/' != i)) continue;
											} else (c.fragment = ''), (u = Te);
										else (c.query = ''), (u = Ae);
										break;
									case Me:
										if (i == r || '/' == i || ('\\' == i && c.isSpecial()) || (!t && ('?' == i || '#' == i))) {
											if (
												('..' === (l = H((l = f))) || '%2e.' === l || '.%2e' === l || '%2e%2e' === l
													? (c.shortenPath(), '/' == i || ('\\' == i && c.isSpecial()) || R(c.path, ''))
													: he(f)
														? '/' == i || ('\\' == i && c.isSpecial()) || R(c.path, '')
														: ('file' == c.scheme && !c.path.length && fe(f) && (c.host && (c.host = ''), (f = I(f, 0) + ':')), R(c.path, f)),
												(f = ''),
												'file' == c.scheme && (i == r || '?' == i || '#' == i))
											)
												for (; c.path.length > 1 && '' === c.path[0]; ) z(c.path);
											'?' == i ? ((c.query = ''), (u = Ae)) : '#' == i && ((c.fragment = ''), (u = Te));
										} else f += ue(i, le);
										break;
									case Ie:
										'?' == i ? ((c.query = ''), (u = Ae)) : '#' == i ? ((c.fragment = ''), (u = Te)) : i != r && (c.path[0] += ue(i, se));
										break;
									case Ae:
										t || '#' != i
											? i != r && ("'" == i && c.isSpecial() ? (c.query += '%27') : (c.query += '#' == i ? '%23' : ue(i, se)))
											: ((c.fragment = ''), (u = Te));
										break;
									case Te:
										i != r && (c.fragment += ue(i, ae));
								}
								d++;
							}
						},
						parseHost: function (e) {
							var t, n, r;
							if ('[' == I(e, 0)) {
								if (']' != I(e, e.length - 1)) return W;
								if (
									((t = (function (e) {
										var t,
											n,
											r,
											o,
											i,
											s,
											a,
											l = [0, 0, 0, 0, 0, 0, 0, 0],
											c = 0,
											u = null,
											d = 0,
											f = function () {
												return I(e, d);
											};
										if (':' == f()) {
											if (':' != I(e, 1)) return;
											(d += 2), (u = ++c);
										}
										for (; f(); ) {
											if (8 == c) return;
											if (':' != f()) {
												for (t = n = 0; n < 4 && A(ee, f()); ) (t = 16 * t + P(f(), 16)), d++, n++;
												if ('.' == f()) {
													if (0 == n) return;
													if (((d -= n), c > 6)) return;
													for (r = 0; f(); ) {
														if (((o = null), r > 0)) {
															if (!('.' == f() && r < 4)) return;
															d++;
														}
														if (!A($, f())) return;
														for (; A($, f()); ) {
															if (((i = P(f(), 10)), null === o)) o = i;
															else {
																if (0 == o) return;
																o = 10 * o + i;
															}
															if (o > 255) return;
															d++;
														}
														(l[c] = 256 * l[c] + o), (2 != ++r && 4 != r) || c++;
													}
													if (4 != r) return;
													break;
												}
												if (':' == f()) {
													if ((d++, !f())) return;
												} else if (f()) return;
												l[c++] = t;
											} else {
												if (null !== u) return;
												d++, (u = ++c);
											}
										}
										if (null !== u) for (s = c - u, c = 7; 0 != c && s > 0; ) (a = l[c]), (l[c--] = l[u + s - 1]), (l[u + --s] = a);
										else if (8 != c) return;
										return l;
									})(U(e, 1, -1))),
									!t)
								)
									return W;
								this.host = t;
							} else if (this.isSpecial()) {
								if (((e = g(e)), A(te, e))) return W;
								if (
									((t = (function (e) {
										var t,
											n,
											r,
											o,
											i,
											s,
											a,
											l = F(e, '.');
										if ((l.length && '' == l[l.length - 1] && l.length--, (t = l.length) > 4)) return e;
										for (n = [], r = 0; r < t; r++) {
											if ('' == (o = l[r])) return e;
											if (((i = 10), o.length > 1 && '0' == I(o, 0) && ((i = A(J, o) ? 16 : 8), (o = U(o, 8 == i ? 1 : 2))), '' === o)) s = 0;
											else {
												if (!A(10 == i ? Z : 8 == i ? Q : ee, o)) return e;
												s = P(o, i);
											}
											R(n, s);
										}
										for (r = 0; r < t; r++)
											if (((s = n[r]), r == t - 1)) {
												if (s >= M(256, 5 - t)) return null;
											} else if (s > 255) return null;
										for (a = L(n), r = 0; r < n.length; r++) a += n[r] * M(256, 3 - r);
										return a;
									})(e)),
									null === t)
								)
									return W;
								this.host = t;
							} else {
								if (A(ne, e)) return W;
								for (t = '', n = m(e), r = 0; r < n.length; r++) t += ue(n[r], se);
								this.host = t;
							}
						},
						cannotHaveUsernamePasswordPort: function () {
							return !this.host || this.cannotBeABaseURL || 'file' == this.scheme;
						},
						includesCredentials: function () {
							return '' != this.username || '' != this.password;
						},
						isSpecial: function () {
							return p(de, this.scheme);
						},
						shortenPath: function () {
							var e = this.path,
								t = e.length;
							!t || ('file' == this.scheme && 1 == t && fe(e[0], !0)) || e.length--;
						},
						serialize: function () {
							var e = this,
								t = e.scheme,
								n = e.username,
								r = e.password,
								o = e.host,
								i = e.port,
								s = e.path,
								a = e.query,
								l = e.fragment,
								c = t + ':';
							return (
								null !== o
									? ((c += '//'), e.includesCredentials() && (c += n + (r ? ':' + r : '') + '@'), (c += ie(o)), null !== i && (c += ':' + i))
									: 'file' == t && (c += '//'),
								(c += e.cannotBeABaseURL ? s[0] : s.length ? '/' + T(s, '/') : ''),
								null !== a && (c += '?' + a),
								null !== l && (c += '#' + l),
								c
							);
						},
						setHref: function (e) {
							var t = this.parse(e);
							if (t) throw O(t);
							this.searchParams.update();
						},
						getOrigin: function () {
							var e = this.scheme,
								t = this.port;
							if ('blob' == e)
								try {
									return new Le(e.path[0]).origin;
								} catch (e) {
									return 'null';
								}
							return 'file' != e && this.isSpecial() ? e + '://' + ie(this.host) + (null !== t ? ':' + t : '') : 'null';
						},
						getProtocol: function () {
							return this.scheme + ':';
						},
						setProtocol: function (e) {
							this.parse(b(e) + ':', me);
						},
						getUsername: function () {
							return this.username;
						},
						setUsername: function (e) {
							var t = m(b(e));
							if (!this.cannotHaveUsernamePasswordPort()) {
								this.username = '';
								for (var n = 0; n < t.length; n++) this.username += ue(t[n], ce);
							}
						},
						getPassword: function () {
							return this.password;
						},
						setPassword: function (e) {
							var t = m(b(e));
							if (!this.cannotHaveUsernamePasswordPort()) {
								this.password = '';
								for (var n = 0; n < t.length; n++) this.password += ue(t[n], ce);
							}
						},
						getHost: function () {
							var e = this.host,
								t = this.port;
							return null === e ? '' : null === t ? ie(e) : ie(e) + ':' + t;
						},
						setHost: function (e) {
							this.cannotBeABaseURL || this.parse(e, Ee);
						},
						getHostname: function () {
							var e = this.host;
							return null === e ? '' : ie(e);
						},
						setHostname: function (e) {
							this.cannotBeABaseURL || this.parse(e, je);
						},
						getPort: function () {
							var e = this.port;
							return null === e ? '' : b(e);
						},
						setPort: function (e) {
							this.cannotHaveUsernamePasswordPort() || ('' == (e = b(e)) ? (this.port = null) : this.parse(e, Se));
						},
						getPathname: function () {
							var e = this.path;
							return this.cannotBeABaseURL ? e[0] : e.length ? '/' + T(e, '/') : '';
						},
						setPathname: function (e) {
							this.cannotBeABaseURL || ((this.path = []), this.parse(e, Be));
						},
						getSearch: function () {
							var e = this.query;
							return e ? '?' + e : '';
						},
						setSearch: function (e) {
							'' == (e = b(e)) ? (this.query = null) : ('?' == I(e, 0) && (e = U(e, 1)), (this.query = ''), this.parse(e, Ae)), this.searchParams.update();
						},
						getSearchParams: function () {
							return this.searchParams.facade;
						},
						getHash: function () {
							var e = this.fragment;
							return e ? '#' + e : '';
						},
						setHash: function (e) {
							'' != (e = b(e)) ? ('#' == I(e, 0) && (e = U(e, 1)), (this.fragment = ''), this.parse(e, Te)) : (this.fragment = null);
						},
						update: function () {
							this.query = this.searchParams.serialize() || null;
						},
					};
					var Le = function (e) {
							var t = f(this, Re),
								n = _(arguments.length, 1) > 1 ? arguments[1] : void 0,
								r = C(t, new Ke(e, !1, n));
							i ||
								((t.href = r.serialize()),
								(t.origin = r.getOrigin()),
								(t.protocol = r.getProtocol()),
								(t.username = r.getUsername()),
								(t.password = r.getPassword()),
								(t.host = r.getHost()),
								(t.hostname = r.getHostname()),
								(t.port = r.getPort()),
								(t.pathname = r.getPathname()),
								(t.search = r.getSearch()),
								(t.searchParams = r.getSearchParams()),
								(t.hash = r.getHash()));
						},
						Re = Le.prototype,
						Ne = function (e, t) {
							return {
								get: function () {
									return E(this)[e]();
								},
								set:
									t &&
									function (e) {
										return E(this)[t](e);
									},
								configurable: !0,
								enumerable: !0,
							};
						};
					if (
						(i &&
							(d(Re, 'href', Ne('serialize', 'setHref')),
							d(Re, 'origin', Ne('getOrigin')),
							d(Re, 'protocol', Ne('getProtocol', 'setProtocol')),
							d(Re, 'username', Ne('getUsername', 'setUsername')),
							d(Re, 'password', Ne('getPassword', 'setPassword')),
							d(Re, 'host', Ne('getHost', 'setHost')),
							d(Re, 'hostname', Ne('getHostname', 'setHostname')),
							d(Re, 'port', Ne('getPort', 'setPort')),
							d(Re, 'pathname', Ne('getPathname', 'setPathname')),
							d(Re, 'search', Ne('getSearch', 'setSearch')),
							d(Re, 'searchParams', Ne('getSearchParams')),
							d(Re, 'hash', Ne('getHash', 'setHash'))),
						u(
							Re,
							'toJSON',
							function () {
								return E(this).serialize();
							},
							{ enumerable: !0 }
						),
						u(
							Re,
							'toString',
							function () {
								return E(this).serialize();
							},
							{ enumerable: !0 }
						),
						D)
					) {
						var ze = D.createObjectURL,
							Fe = D.revokeObjectURL;
						ze && u(Le, 'createObjectURL', l(ze, D)), Fe && u(Le, 'revokeObjectURL', l(Fe, D));
					}
					w(Le, 'URL'), o({ global: !0, constructor: !0, forced: !s, sham: !i }, { URL: Le });
				},
				{
					'../internals/an-instance': 6,
					'../internals/array-from': 8,
					'../internals/array-slice-simple': 10,
					'../internals/define-built-in': 22,
					'../internals/define-built-in-accessor': 21,
					'../internals/descriptors': 26,
					'../internals/export': 33,
					'../internals/function-bind-context': 37,
					'../internals/function-uncurry-this': 41,
					'../internals/global': 47,
					'../internals/has-own-property': 48,
					'../internals/internal-state': 54,
					'../internals/native-url': 69,
					'../internals/object-assign': 71,
					'../internals/set-to-string-tag': 93,
					'../internals/string-multibyte': 97,
					'../internals/string-punycode-to-ascii': 98,
					'../internals/to-string': 107,
					'../internals/validate-arguments-length': 112,
					'../modules/es.string.iterator': 116,
					'../modules/web.url-search-params.constructor': 119,
				},
			],
			122: [
				function (e, t, n) {
					e('../modules/web.url.constructor');
				},
				{ '../modules/web.url.constructor': 121 },
			],
			123: [
				function (e, t, n) {
					var r, o, i;
					(r = function (e, t, n, o) {
						var i;
						t[0] = 0;
						for (var s = 1; s < t.length; s++) {
							var a = t[s++],
								l = t[s] ? ((t[0] |= a ? 1 : 2), n[t[s++]]) : t[++s];
							3 === a
								? (o[0] = l)
								: 4 === a
									? (o[1] = Object.assign(o[1] || {}, l))
									: 5 === a
										? ((o[1] = o[1] || {})[t[++s]] = l)
										: 6 === a
											? (o[1][t[++s]] += l + '')
											: a
												? ((i = e.apply(l, r(e, l, n, ['', null]))), o.push(i), l[0] ? (t[0] |= 2) : ((t[s - 2] = 0), (t[s] = i)))
												: o.push(l);
						}
						return o;
					}),
						(o = new Map()),
						(i = function (e) {
							var t = o.get(this);
							return (
								t || ((t = new Map()), o.set(this, t)),
								(t = r(
									this,
									t.get(e) ||
										(t.set(
											e,
											(t = (function (e) {
												for (
													var t,
														n,
														r = 1,
														o = '',
														i = '',
														s = [0],
														a = function (e) {
															1 === r && (e || (o = o.replace(/^\s*\n\s*|\s*\n\s*$/g, '')))
																? s.push(0, e, o)
																: 3 === r && (e || o)
																	? (s.push(3, e, o), (r = 2))
																	: 2 === r && '...' === o && e
																		? s.push(4, e, 0)
																		: 2 === r && o && !e
																			? s.push(5, 0, !0, o)
																			: r >= 5 &&
																				((o || (!e && 5 === r)) && (s.push(r, 0, o, n), (r = 6)), e && (s.push(r, e, 0, n), (r = 6))),
																(o = '');
														},
														l = 0;
													l < e.length;
													l++
												) {
													l && (1 === r && a(), a(l));
													for (var c = 0; c < e[l].length; c++)
														(t = e[l][c]),
															1 === r
																? '<' === t
																	? (a(), (s = [s]), (r = 3))
																	: (o += t)
																: 4 === r
																	? '--' === o && '>' === t
																		? ((r = 1), (o = ''))
																		: (o = t + o[0])
																	: i
																		? t === i
																			? (i = '')
																			: (o += t)
																		: '"' === t || "'" === t
																			? (i = t)
																			: '>' === t
																				? (a(), (r = 1))
																				: r &&
																					('=' === t
																						? ((r = 5), (n = o), (o = ''))
																						: '/' === t && (r < 5 || '>' === e[l][c + 1])
																							? (a(), 3 === r && (s = s[0]), (r = s), (s = s[0]).push(2, 0, r), (r = 0))
																							: ' ' === t || '\t' === t || '\n' === t || '\r' === t
																								? (a(), (r = 2))
																								: (o += t)),
															3 === r && '!--' === o && ((r = 4), (s = s[0]));
												}
												return a(), s;
											})(e))
										),
										t),
									arguments,
									[]
								)).length > 1
									? t
									: t[0]
							);
						}),
						void 0 !== t ? (t.exports = i) : (self.htm = i);
				},
				{},
			],
			124: [
				function (e, t, n) {
					t.exports = {
						nanoid: (e = 21) => {
							let t = '',
								n = e;
							for (; n--; ) t += 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'[(64 * Math.random()) | 0];
							return t;
						},
						customAlphabet:
							(e, t = 21) =>
							(n = t) => {
								let r = '',
									o = n;
								for (; o--; ) r += e[(Math.random() * e.length) | 0];
								return r;
							},
					};
				},
				{},
			],
			125: [
				function (e, t, n) {
					var r,
						o,
						i,
						s,
						a,
						l,
						c,
						u = {},
						d = [],
						f = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
					function p(e, t) {
						for (var n in t) e[n] = t[n];
						return e;
					}
					function h(e) {
						var t = e.parentNode;
						t && t.removeChild(e);
					}
					function m(e, t, n) {
						var o,
							i,
							s,
							a = {};
						for (s in t) 'key' == s ? (o = t[s]) : 'ref' == s ? (i = t[s]) : (a[s] = t[s]);
						if ((arguments.length > 2 && (a.children = arguments.length > 3 ? r.call(arguments, 2) : n), 'function' == typeof e && null != e.defaultProps))
							for (s in e.defaultProps) void 0 === a[s] && (a[s] = e.defaultProps[s]);
						return y(e, a, o, i, null);
					}
					function y(e, t, n, r, s) {
						var a = {
							type: e,
							props: t,
							key: n,
							ref: r,
							__k: null,
							__: null,
							__b: 0,
							__e: null,
							__d: void 0,
							__c: null,
							__h: null,
							constructor: void 0,
							__v: null == s ? ++i : s,
						};
						return null == s && null != o.vnode && o.vnode(a), a;
					}
					function v(e) {
						return e.children;
					}
					function g(e, t) {
						(this.props = e), (this.context = t);
					}
					function b(e, t) {
						if (null == t) return e.__ ? b(e.__, e.__.__k.indexOf(e) + 1) : null;
						for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
						return 'function' == typeof e.type ? b(e) : null;
					}
					function w(e) {
						var t, n;
						if (null != (e = e.__) && null != e.__c) {
							for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
								if (null != (n = e.__k[t]) && null != n.__e) {
									e.__e = e.__c.base = n.__e;
									break;
								}
							return w(e);
						}
					}
					function _(e) {
						((!e.__d && (e.__d = !0) && a.push(e) && !x.__r++) || l !== o.debounceRendering) && ((l = o.debounceRendering) || setTimeout)(x);
					}
					function x() {
						for (var e; (x.__r = a.length); )
							(e = a.sort(function (e, t) {
								return e.__v.__b - t.__v.__b;
							})),
								(a = []),
								e.some(function (e) {
									var t, n, r, o, i, s;
									e.__d &&
										((i = (o = (t = e).__v).__e),
										(s = t.__P) &&
											((n = []),
											((r = p({}, o)).__v = o.__v + 1),
											P(s, o, r, t.__n, void 0 !== s.ownerSVGElement, null != o.__h ? [i] : null, n, null == i ? b(o) : i, o.__h),
											B(n, o),
											o.__e != i && w(o)));
								});
					}
					function k(e, t, n, r, o, i, s, a, l, c) {
						var f,
							p,
							h,
							m,
							g,
							w,
							_,
							x = (r && r.__k) || d,
							k = x.length;
						for (n.__k = [], f = 0; f < t.length; f++)
							if (
								null !=
								(m = n.__k[f] =
									null == (m = t[f]) || 'boolean' == typeof m
										? null
										: 'string' == typeof m || 'number' == typeof m || 'bigint' == typeof m
											? y(null, m, null, null, m)
											: Array.isArray(m)
												? y(v, { children: m }, null, null, null)
												: m.__b > 0
													? y(m.type, m.props, m.key, null, m.__v)
													: m)
							) {
								if (((m.__ = n), (m.__b = n.__b + 1), null === (h = x[f]) || (h && m.key == h.key && m.type === h.type))) x[f] = void 0;
								else
									for (p = 0; p < k; p++) {
										if ((h = x[p]) && m.key == h.key && m.type === h.type) {
											x[p] = void 0;
											break;
										}
										h = null;
									}
								P(e, m, (h = h || u), o, i, s, a, l, c),
									(g = m.__e),
									(p = m.ref) && h.ref != p && (_ || (_ = []), h.ref && _.push(h.ref, null, m), _.push(p, m.__c || g, m)),
									null != g
										? (null == w && (w = g),
											'function' == typeof m.type && m.__k === h.__k ? (m.__d = l = C(m, l, e)) : (l = E(e, m, h, x, g, l)),
											'function' == typeof n.type && (n.__d = l))
										: l && h.__e == l && l.parentNode != e && (l = b(h));
							}
						for (n.__e = w, f = k; f--; )
							null != x[f] && ('function' == typeof n.type && null != x[f].__e && x[f].__e == n.__d && (n.__d = b(r, f + 1)), A(x[f], x[f]));
						if (_) for (f = 0; f < _.length; f++) I(_[f], _[++f], _[++f]);
					}
					function C(e, t, n) {
						for (var r, o = e.__k, i = 0; o && i < o.length; i++) (r = o[i]) && ((r.__ = e), (t = 'function' == typeof r.type ? C(r, t, n) : E(n, r, r, o, r.__e, t)));
						return t;
					}
					function E(e, t, n, r, o, i) {
						var s, a, l;
						if (void 0 !== t.__d) (s = t.__d), (t.__d = void 0);
						else if (null == n || o != i || null == o.parentNode)
							e: if (null == i || i.parentNode !== e) e.appendChild(o), (s = null);
							else {
								for (a = i, l = 0; (a = a.nextSibling) && l < r.length; l += 2) if (a == o) break e;
								e.insertBefore(o, i), (s = i);
							}
						return void 0 !== s ? s : o.nextSibling;
					}
					function j(e, t, n) {
						'-' === t[0] ? e.setProperty(t, n) : (e[t] = null == n ? '' : 'number' != typeof n || f.test(t) ? n : n + 'px');
					}
					function S(e, t, n, r, o) {
						var i;
						e: if ('style' === t)
							if ('string' == typeof n) e.style.cssText = n;
							else {
								if (('string' == typeof r && (e.style.cssText = r = ''), r)) for (t in r) (n && t in n) || j(e.style, t, '');
								if (n) for (t in n) (r && n[t] === r[t]) || j(e.style, t, n[t]);
							}
						else if ('o' === t[0] && 'n' === t[1])
							(i = t !== (t = t.replace(/Capture$/, ''))),
								(t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2)),
								e.l || (e.l = {}),
								(e.l[t + i] = n),
								n ? r || e.addEventListener(t, i ? O : D, i) : e.removeEventListener(t, i ? O : D, i);
						else if ('dangerouslySetInnerHTML' !== t) {
							if (o) t = t.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's');
							else if ('href' !== t && 'list' !== t && 'form' !== t && 'tabIndex' !== t && 'download' !== t && t in e)
								try {
									e[t] = null == n ? '' : n;
									break e;
								} catch (e) {}
							'function' == typeof n || (null != n && (!1 !== n || ('a' === t[0] && 'r' === t[1])) ? e.setAttribute(t, n) : e.removeAttribute(t));
						}
					}
					function D(e) {
						this.l[e.type + !1](o.event ? o.event(e) : e);
					}
					function O(e) {
						this.l[e.type + !0](o.event ? o.event(e) : e);
					}
					function P(e, t, n, r, i, s, a, l, c) {
						var u,
							d,
							f,
							h,
							m,
							y,
							b,
							w,
							_,
							x,
							C,
							E,
							j,
							S = t.type;
						if (void 0 !== t.constructor) return null;
						null != n.__h && ((c = n.__h), (l = t.__e = n.__e), (t.__h = null), (s = [l])), (u = o.__b) && u(t);
						try {
							e: if ('function' == typeof S) {
								if (
									((w = t.props),
									(_ = (u = S.contextType) && r[u.__c]),
									(x = u ? (_ ? _.props.value : u.__) : r),
									n.__c
										? (b = (d = t.__c = n.__c).__ = d.__E)
										: ('prototype' in S && S.prototype.render ? (t.__c = d = new S(w, x)) : ((t.__c = d = new g(w, x)), (d.constructor = S), (d.render = T)),
											_ && _.sub(d),
											(d.props = w),
											d.state || (d.state = {}),
											(d.context = x),
											(d.__n = r),
											(f = d.__d = !0),
											(d.__h = [])),
									null == d.__s && (d.__s = d.state),
									null != S.getDerivedStateFromProps && (d.__s == d.state && (d.__s = p({}, d.__s)), p(d.__s, S.getDerivedStateFromProps(w, d.__s))),
									(h = d.props),
									(m = d.state),
									f)
								)
									null == S.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount(),
										null != d.componentDidMount && d.__h.push(d.componentDidMount);
								else {
									if (
										(null == S.getDerivedStateFromProps && w !== h && null != d.componentWillReceiveProps && d.componentWillReceiveProps(w, x),
										(!d.__e && null != d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(w, d.__s, x)) || t.__v === n.__v)
									) {
										(d.props = w),
											(d.state = d.__s),
											t.__v !== n.__v && (d.__d = !1),
											(d.__v = t),
											(t.__e = n.__e),
											(t.__k = n.__k),
											t.__k.forEach(function (e) {
												e && (e.__ = t);
											}),
											d.__h.length && a.push(d);
										break e;
									}
									null != d.componentWillUpdate && d.componentWillUpdate(w, d.__s, x),
										null != d.componentDidUpdate &&
											d.__h.push(function () {
												d.componentDidUpdate(h, m, y);
											});
								}
								if (((d.context = x), (d.props = w), (d.__v = t), (d.__P = e), (C = o.__r), (E = 0), 'prototype' in S && S.prototype.render))
									(d.state = d.__s), (d.__d = !1), C && C(t), (u = d.render(d.props, d.state, d.context));
								else
									do {
										(d.__d = !1), C && C(t), (u = d.render(d.props, d.state, d.context)), (d.state = d.__s);
									} while (d.__d && ++E < 25);
								(d.state = d.__s),
									null != d.getChildContext && (r = p(p({}, r), d.getChildContext())),
									f || null == d.getSnapshotBeforeUpdate || (y = d.getSnapshotBeforeUpdate(h, m)),
									(j = null != u && u.type === v && null == u.key ? u.props.children : u),
									k(e, Array.isArray(j) ? j : [j], t, n, r, i, s, a, l, c),
									(d.base = t.__e),
									(t.__h = null),
									d.__h.length && a.push(d),
									b && (d.__E = d.__ = null),
									(d.__e = !1);
							} else null == s && t.__v === n.__v ? ((t.__k = n.__k), (t.__e = n.__e)) : (t.__e = M(n.__e, t, n, r, i, s, a, c));
							(u = o.diffed) && u(t);
						} catch (e) {
							(t.__v = null), (c || null != s) && ((t.__e = l), (t.__h = !!c), (s[s.indexOf(l)] = null)), o.__e(e, t, n);
						}
					}
					function B(e, t) {
						o.__c && o.__c(t, e),
							e.some(function (t) {
								try {
									(e = t.__h),
										(t.__h = []),
										e.some(function (e) {
											e.call(t);
										});
								} catch (e) {
									o.__e(e, t.__v);
								}
							});
					}
					function M(e, t, n, o, i, s, a, l) {
						var c,
							d,
							f,
							p = n.props,
							m = t.props,
							y = t.type,
							v = 0;
						if (('svg' === y && (i = !0), null != s))
							for (; v < s.length; v++)
								if ((c = s[v]) && 'setAttribute' in c == !!y && (y ? c.localName === y : 3 === c.nodeType)) {
									(e = c), (s[v] = null);
									break;
								}
						if (null == e) {
							if (null === y) return document.createTextNode(m);
							(e = i ? document.createElementNS('http://www.w3.org/2000/svg', y) : document.createElement(y, m.is && m)), (s = null), (l = !1);
						}
						if (null === y) p === m || (l && e.data === m) || (e.data = m);
						else {
							if (((s = s && r.call(e.childNodes)), (d = (p = n.props || u).dangerouslySetInnerHTML), (f = m.dangerouslySetInnerHTML), !l)) {
								if (null != s) for (p = {}, v = 0; v < e.attributes.length; v++) p[e.attributes[v].name] = e.attributes[v].value;
								(f || d) && ((f && ((d && f.__html == d.__html) || f.__html === e.innerHTML)) || (e.innerHTML = (f && f.__html) || ''));
							}
							if (
								((function (e, t, n, r, o) {
									var i;
									for (i in n) 'children' === i || 'key' === i || i in t || S(e, i, null, n[i], r);
									for (i in t)
										(o && 'function' != typeof t[i]) ||
											'children' === i ||
											'key' === i ||
											'value' === i ||
											'checked' === i ||
											n[i] === t[i] ||
											S(e, i, t[i], n[i], r);
								})(e, m, p, i, l),
								f)
							)
								t.__k = [];
							else if (
								((v = t.props.children), k(e, Array.isArray(v) ? v : [v], t, n, o, i && 'foreignObject' !== y, s, a, s ? s[0] : n.__k && b(n, 0), l), null != s)
							)
								for (v = s.length; v--; ) null != s[v] && h(s[v]);
							l ||
								('value' in m &&
									void 0 !== (v = m.value) &&
									(v !== e.value || ('progress' === y && !v) || ('option' === y && v !== p.value)) &&
									S(e, 'value', v, p.value, !1),
								'checked' in m && void 0 !== (v = m.checked) && v !== e.checked && S(e, 'checked', v, p.checked, !1));
						}
						return e;
					}
					function I(e, t, n) {
						try {
							'function' == typeof e ? e(t) : (e.current = t);
						} catch (e) {
							o.__e(e, n);
						}
					}
					function A(e, t, n) {
						var r, i;
						if ((o.unmount && o.unmount(e), (r = e.ref) && ((r.current && r.current !== e.__e) || I(r, null, t)), null != (r = e.__c))) {
							if (r.componentWillUnmount)
								try {
									r.componentWillUnmount();
								} catch (e) {
									o.__e(e, t);
								}
							r.base = r.__P = null;
						}
						if ((r = e.__k)) for (i = 0; i < r.length; i++) r[i] && A(r[i], t, 'function' != typeof e.type);
						n || null == e.__e || h(e.__e), (e.__e = e.__d = void 0);
					}
					function T(e, t, n) {
						return this.constructor(e, n);
					}
					function K(e, t, n) {
						var i, s, a;
						o.__ && o.__(e, t),
							(s = (i = 'function' == typeof n) ? null : (n && n.__k) || t.__k),
							(a = []),
							P(
								t,
								(e = ((!i && n) || t).__k = m(v, null, [e])),
								s || u,
								u,
								void 0 !== t.ownerSVGElement,
								!i && n ? [n] : s ? null : t.firstChild ? r.call(t.childNodes) : null,
								a,
								!i && n ? n : s ? s.__e : t.firstChild,
								i
							),
							B(a, e);
					}
					(r = d.slice),
						(o = {
							__e: function (e, t, n, r) {
								for (var o, i, s; (t = t.__); )
									if ((o = t.__c) && !o.__)
										try {
											if (
												((i = o.constructor) && null != i.getDerivedStateFromError && (o.setState(i.getDerivedStateFromError(e)), (s = o.__d)),
												null != o.componentDidCatch && (o.componentDidCatch(e, r || {}), (s = o.__d)),
												s)
											)
												return (o.__E = o);
										} catch (t) {
											e = t;
										}
								throw e;
							},
						}),
						(i = 0),
						(s = function (e) {
							return null != e && void 0 === e.constructor;
						}),
						(g.prototype.setState = function (e, t) {
							var n;
							(n = null != this.__s && this.__s !== this.state ? this.__s : (this.__s = p({}, this.state))),
								'function' == typeof e && (e = e(p({}, n), this.props)),
								e && p(n, e),
								null != e && this.__v && (t && this.__h.push(t), _(this));
						}),
						(g.prototype.forceUpdate = function (e) {
							this.__v && ((this.__e = !0), e && this.__h.push(e), _(this));
						}),
						(g.prototype.render = v),
						(a = []),
						(x.__r = 0),
						(c = 0),
						(n.render = K),
						(n.hydrate = function e(t, n) {
							K(t, n, e);
						}),
						(n.createElement = m),
						(n.h = m),
						(n.Fragment = v),
						(n.createRef = function () {
							return { current: null };
						}),
						(n.isValidElement = s),
						(n.Component = g),
						(n.cloneElement = function (e, t, n) {
							var o,
								i,
								s,
								a = p({}, e.props);
							for (s in t) 'key' == s ? (o = t[s]) : 'ref' == s ? (i = t[s]) : (a[s] = t[s]);
							return arguments.length > 2 && (a.children = arguments.length > 3 ? r.call(arguments, 2) : n), y(e.type, a, o || e.key, i || e.ref, null);
						}),
						(n.createContext = function (e, t) {
							var n = {
								__c: (t = '__cC' + c++),
								__: e,
								Consumer: function (e, t) {
									return e.children(t);
								},
								Provider: function (e) {
									var n, r;
									return (
										this.getChildContext ||
											((n = []),
											((r = {})[t] = this),
											(this.getChildContext = function () {
												return r;
											}),
											(this.shouldComponentUpdate = function (e) {
												this.props.value !== e.value && n.some(_);
											}),
											(this.sub = function (e) {
												n.push(e);
												var t = e.componentWillUnmount;
												e.componentWillUnmount = function () {
													n.splice(n.indexOf(e), 1), t && t.call(e);
												};
											})),
										e.children
									);
								},
							};
							return (n.Provider.__ = n.Consumer.contextType = n);
						}),
						(n.toChildArray = function e(t, n) {
							return (
								(n = n || []),
								null == t ||
									'boolean' == typeof t ||
									(Array.isArray(t)
										? t.some(function (t) {
												e(t, n);
											})
										: n.push(t)),
								n
							);
						}),
						(n.options = o);
				},
				{},
			],
			126: [
				function (e, t, n) {
					var r,
						o,
						i,
						s,
						a = e('preact'),
						l = 0,
						c = [],
						u = [],
						d = a.options.__b,
						f = a.options.__r,
						p = a.options.diffed,
						h = a.options.__c,
						m = a.options.unmount;
					function y(e, t) {
						a.options.__h && a.options.__h(o, e, l || t), (l = 0);
						var n = o.__H || (o.__H = { __: [], __h: [] });
						return e >= n.__.length && n.__.push({ __V: u }), n.__[e];
					}
					function v(e) {
						return (l = 1), g(j, e);
					}
					function g(e, t, n) {
						var i = y(r++, 2);
						return (
							(i.t = e),
							i.__c ||
								((i.__ = [
									n ? n(t) : j(void 0, t),
									function (e) {
										var t = i.t(i.__[0], e);
										i.__[0] !== t && ((i.__ = [t, i.__[1]]), i.__c.setState({}));
									},
								]),
								(i.__c = o)),
							i.__
						);
					}
					function b(e, t) {
						var n = y(r++, 4);
						!a.options.__s && E(n.__H, t) && ((n.__ = e), (n.u = t), o.__h.push(n));
					}
					function w(e, t) {
						var n = y(r++, 7);
						return E(n.__H, t) ? ((n.__V = e()), (n.u = t), (n.__h = e), n.__V) : n.__;
					}
					function _() {
						for (var e; (e = c.shift()); )
							if (e.__P)
								try {
									e.__H.__h.forEach(k), e.__H.__h.forEach(C), (e.__H.__h = []);
								} catch (t) {
									(e.__H.__h = []), a.options.__e(t, e.__v);
								}
					}
					(a.options.__b = function (e) {
						(o = null), d && d(e);
					}),
						(a.options.__r = function (e) {
							f && f(e), (r = 0);
							var t = (o = e.__c).__H;
							t &&
								(i === o
									? ((t.__h = []),
										(o.__h = []),
										t.__.forEach(function (e) {
											(e.__V = u), (e.u = void 0);
										}))
									: (t.__h.forEach(k), t.__h.forEach(C), (t.__h = []))),
								(i = o);
						}),
						(a.options.diffed = function (e) {
							p && p(e);
							var t = e.__c;
							t &&
								t.__H &&
								(t.__H.__h.length &&
									((1 !== c.push(t) && s === a.options.requestAnimationFrame) ||
										(
											(s = a.options.requestAnimationFrame) ||
											function (e) {
												var t,
													n = function () {
														clearTimeout(r), x && cancelAnimationFrame(t), setTimeout(e);
													},
													r = setTimeout(n, 100);
												x && (t = requestAnimationFrame(n));
											}
										)(_)),
								t.__H.__.forEach(function (e) {
									e.u && (e.__H = e.u), e.__V !== u && (e.__ = e.__V), (e.u = void 0), (e.__V = u);
								})),
								(i = o = null);
						}),
						(a.options.__c = function (e, t) {
							t.some(function (e) {
								try {
									e.__h.forEach(k),
										(e.__h = e.__h.filter(function (e) {
											return !e.__ || C(e);
										}));
								} catch (n) {
									t.some(function (e) {
										e.__h && (e.__h = []);
									}),
										(t = []),
										a.options.__e(n, e.__v);
								}
							}),
								h && h(e, t);
						}),
						(a.options.unmount = function (e) {
							m && m(e);
							var t,
								n = e.__c;
							n &&
								n.__H &&
								(n.__H.__.forEach(function (e) {
									try {
										k(e);
									} catch (e) {
										t = e;
									}
								}),
								t && a.options.__e(t, n.__v));
						});
					var x = 'function' == typeof requestAnimationFrame;
					function k(e) {
						var t = o,
							n = e.__c;
						'function' == typeof n && ((e.__c = void 0), n()), (o = t);
					}
					function C(e) {
						var t = o;
						(e.__c = e.__()), (o = t);
					}
					function E(e, t) {
						return (
							!e ||
							e.length !== t.length ||
							t.some(function (t, n) {
								return t !== e[n];
							})
						);
					}
					function j(e, t) {
						return 'function' == typeof t ? t(e) : t;
					}
					(n.useState = v),
						(n.useReducer = g),
						(n.useEffect = function (e, t) {
							var n = y(r++, 3);
							!a.options.__s && E(n.__H, t) && ((n.__ = e), (n.u = t), o.__H.__h.push(n));
						}),
						(n.useLayoutEffect = b),
						(n.useRef = function (e) {
							return (
								(l = 5),
								w(function () {
									return { current: e };
								}, [])
							);
						}),
						(n.useImperativeHandle = function (e, t, n) {
							(l = 6),
								b(
									function () {
										return 'function' == typeof e
											? (e(t()),
												function () {
													return e(null);
												})
											: e
												? ((e.current = t()),
													function () {
														return (e.current = null);
													})
												: void 0;
									},
									null == n ? n : n.concat(e)
								);
						}),
						(n.useMemo = w),
						(n.useCallback = function (e, t) {
							return (
								(l = 8),
								w(function () {
									return e;
								}, t)
							);
						}),
						(n.useContext = function (e) {
							var t = o.context[e.__c],
								n = y(r++, 9);
							return (n.c = e), t ? (null == n.__ && ((n.__ = !0), t.sub(o)), t.props.value) : e.__;
						}),
						(n.useDebugValue = function (e, t) {
							a.options.useDebugValue && a.options.useDebugValue(t ? t(e) : e);
						}),
						(n.useErrorBoundary = function (e) {
							var t = y(r++, 10),
								n = v();
							return (
								(t.__ = e),
								o.componentDidCatch ||
									(o.componentDidCatch = function (e) {
										t.__ && t.__(e), n[1](e);
									}),
								[
									n[0],
									function () {
										n[1](void 0);
									},
								]
							);
						});
				},
				{ preact: 125 },
			],
			127: [
				function (e, t, n) {
					'use strict';
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.getAutoRegion = void 0);
					const r = e('../v7/v7-config'),
						o = (e, t, n) =>
							new Promise(r => {
								const o = setTimeout(() => {
									console.error('Timeout while latency check for ', t), r();
								}, n);
								e()
									.then(() => {
										clearTimeout(o), r();
									})
									.catch(e => {
										console.error('Error while latency check for ', t, e), clearTimeout(o), r();
									});
							});
					async function i(e) {
						const t = e.ok;
						if (-1 === t.indexOf(e.name)) throw new Error('okUrl ' + t + ' does not contain region ' + e);
						return (async () => {
							const e = Date.now();
							return await fetch(t + '?time=' + e, { method: 'GET', mode: 'cors', cache: 'no-cache' }).then(e => e.text()), Date.now() - e;
						})();
					}
					n.getAutoRegion = async function (e) {
						const t = [...r.awsRegions],
							n = (() => {
								const e = {};
								for (const { name: t } of r.awsRegions) e[t] = [];
								return e;
							})(),
							l = [];
						for (const r of t) {
							const t = async () => {
								const t = r.name;
								for (let o = 0; o < 5; ++o) n[t].push(await i(r)), e(t + '#' + (o + 1) + ' (' + n[t][0] + ' ms)');
							};
							l.push(o(t, r.name, 15e3));
						}
						await Promise.all(l);
						try {
							const e = /execute-api\.([^.]+)\.amazonaws.com\/dev\/ok/;
							if ('undefined' != typeof performance && void 0 !== performance.getEntriesByType) {
								const t = performance.getEntriesByType('resource');
								for (const r of t)
									if (void 0 !== r.name && void 0 !== r.duration) {
										const t = e.exec(r.name);
										null !== t && void 0 !== t[1] && n[t[1]].push(Math.round(r.duration));
									}
							}
						} catch (e) {
							console.error("Can't use performance data", e);
						}
						let c = 'eu-central-1',
							u = -1,
							d = '';
						const f = {};
						for (const e of Object.keys(n)) {
							const t = a(n[e]);
							t > 0 && (-1 === u || u > t) && ((c = e), (u = t));
							const r = s(n[e]);
							(f[e] = r), (d += (e + '         ').substring(0, 14) + ': [' + r.join(', ') + ']\n');
						}
						return console.log('Latency estimation:\n' + d), console.log('Auto region:', c, ', latency: ' + u), { region: c, regionLatency: u, estimation: f };
					};
					const s = e => e.sort((e, t) => e - t),
						a = e => (0 === e.length ? 0 : s(e)[0]);
				},
				{ '../v7/v7-config': 129, 'core-js/modules/web.dom-collections.iterator.js': 118 },
			],
			128: [
				function (e, t, n) {
					'use strict';
					e('core-js/modules/web.dom-collections.iterator.js'),
						Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.putPersonalBundle = n.getPersonalBundleUrl = void 0);
					const r = e('../../../v7-services/src/personal'),
						o = e('../../xhr'),
						i = e('./v7-config');
					(n.getPersonalBundleUrl = function (e, t, n) {
						return (0, r.getPersonalBundleUrl)(e, t, n, void 0);
					}),
						(n.putPersonalBundle = async function (e, t, n, r) {
							const s = await (async function (e) {
								const t = new zip.ZipReader(new zip.Uint8ArrayReader(e), { useWebWorkers: !1 }),
									n = await t.getEntries();
								let r = !0;
								for (const e of n) if (((r = !0 === e.directory), !r)) break;
								return t.close(), r;
							})(r);
							if (s) return void console.warn('Ignore empty changes archive');
							const a = await (0, o.postObject)(i.personalPut + '?namespace=' + e + '&id=' + t + '&bundleUrl=' + encodeURIComponent(n));
							if (!a.success) throw new Error('Unable to put personal bundle');
							const l = JSON.parse(a.payload),
								c = l.signature,
								u = l.url;
							if (
								((c['x-amz-content-sha256'] = 'UNSIGNED-PAYLOAD'),
								await (0, o.send)('put', u, 'text', r.buffer, void 0, c),
								!(await (0, o.postObject)(i.personalAcl + '?namespace=' + e + '&id=' + t + '&bundleUrl=' + n)).success)
							)
								throw new Error("Can't set ACL to personal bundle");
						});
				},
				{ '../../../v7-services/src/personal': 158, '../../xhr': 157, './v7-config': 129, 'core-js/modules/web.dom-collections.iterator.js': 118 },
			],
			129: [
				function (e, t, n) {
					'use strict';
					Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.awsRegions =
							n.checkoutEndpoint =
							n.checkoutCreateTokenEndpoint =
							n.stopIpx =
							n.startIpx =
							n.addFreeTimeTierEndpoint =
							n.tokeInfoGetEndpoint =
							n.createTokenEndpoint =
							n.personalAcl =
							n.personalPut =
							n.endpointBase =
								void 0),
						(n.endpointBase = 'https://kdhkdsv558.execute-api.eu-central-1.amazonaws.com/dev'),
						(n.personalPut = n.endpointBase + '/personal/put'),
						(n.personalAcl = n.endpointBase + '/personal/acl'),
						(n.createTokenEndpoint = n.endpointBase + '/token/create'),
						(n.tokeInfoGetEndpoint = n.endpointBase + '/token/info/get'),
						(n.addFreeTimeTierEndpoint = n.endpointBase + '/token/add/free'),
						(n.startIpx = n.endpointBase + '/token/ipx/start'),
						(n.stopIpx = n.endpointBase + '/token/ipx/stop'),
						(n.checkoutCreateTokenEndpoint = n.endpointBase + '/checkout/token/create'),
						(n.checkoutEndpoint = 'https://js-dos.com/checkout/index.html'),
						(n.awsRegions = [
							{ label: 'US East (N. Virginia)', name: 'us-east-1', ok: 'https://387k8l2vgf.execute-api.us-east-1.amazonaws.com/dev/ok' },
							{ label: 'US East (Ohio)', name: 'us-east-2', ok: 'https://q32vlaa5ji.execute-api.us-east-2.amazonaws.com/dev/ok' },
							{ label: 'US West (N. California)', name: 'us-west-1', ok: 'https://zittdd8vr2.execute-api.us-west-1.amazonaws.com/dev/ok' },
							{ label: 'US West (Oregon)', name: 'us-west-2', ok: 'https://aw3gj5315i.execute-api.us-west-2.amazonaws.com/dev/ok' },
							{ label: 'Europe (Frankfurt)', name: 'eu-central-1', ok: 'https://pdxnceto92.execute-api.eu-central-1.amazonaws.com/dev/ok' },
							{ label: 'Europe (Ireland)', name: 'eu-west-1', ok: 'https://yjm6n35ii4.execute-api.eu-west-1.amazonaws.com/dev/ok' },
							{ label: 'Europe (London)', name: 'eu-west-2', ok: 'https://u8k6qhll5d.execute-api.eu-west-2.amazonaws.com/dev/ok' },
							{ label: 'Europe (Milan)', name: 'eu-south-1', ok: 'https://hn4uxbiro0.execute-api.eu-south-1.amazonaws.com/dev/ok' },
							{ label: 'Europe (Paris)', name: 'eu-west-3', ok: 'https://oce5khcznd.execute-api.eu-west-3.amazonaws.com/dev/ok' },
							{ label: 'Europe (Stockholm)', name: 'eu-north-1', ok: 'https://f3j2j43580.execute-api.eu-north-1.amazonaws.com/dev/ok' },
							{ label: 'Asia Pacific (Hong Kong)', name: 'ap-east-1', ok: 'https://2dji6qhipb.execute-api.ap-east-1.amazonaws.com/dev/ok' },
							{ label: 'Asia Pacific (Mumbai)', name: 'ap-south-1', ok: 'https://0htlj8u1m9.execute-api.ap-south-1.amazonaws.com/dev/ok' },
							{ label: 'Asia Pacific (Osaka)', name: 'ap-northeast-3', ok: 'https://4z9rh02y37.execute-api.ap-northeast-3.amazonaws.com/dev/ok' },
							{ label: 'Asia Pacific (Seoul)', name: 'ap-northeast-2', ok: 'https://dv8crqb5j6.execute-api.ap-northeast-2.amazonaws.com/dev/ok' },
							{ label: 'Asia Pacific (Singapore)', name: 'ap-southeast-1', ok: 'https://e0w35dr520.execute-api.ap-southeast-1.amazonaws.com/dev/ok' },
							{ label: 'Asia Pacific (Sydney)', name: 'ap-southeast-2', ok: 'https://a2bnpow0ul.execute-api.ap-southeast-2.amazonaws.com/dev/ok' },
							{ label: 'Asia Pacific (Tokyo)', name: 'ap-northeast-1', ok: 'https://snvzlstk05.execute-api.ap-northeast-1.amazonaws.com/dev/ok' },
							{ label: 'Canada', name: 'ca-central-1', ok: 'https://wqwl5he8y7.execute-api.ca-central-1.amazonaws.com/dev/ok' },
							{ label: 'Middle East (Bahrain)', name: 'me-south-1', ok: 'https://g480v58gnk.execute-api.me-south-1.amazonaws.com/dev/ok' },
							{ label: 'South America (São Paulo)', name: 'sa-east-1', ok: 'https://wvhym3rtc1.execute-api.sa-east-1.amazonaws.com/dev/ok' },
							{ label: 'Africa (Cape Town)', name: 'af-south-1', ok: 'https://r0atydfi7k.execute-api.af-south-1.amazonaws.com/dev/ok' },
						]);
				},
				{},
			],
			130: [
				function (e, t, n) {
					'use strict';
					var r, o, i, s, a;
					function l(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.ActionBar = void 0);
					const c = e('../dom'),
						u = e('../icons'),
						d = e('./controls');
					function f(e) {
						if (!0 === e.options().noSocialLinks || !0 !== e.options().noSideBar) return null;
						return (0, c.html)(
							o ||
								(o = l([
									'\n        <div class="h-5 w-5 my-4 text-pink-400 cursor-pointer" onClick=',
									'>\n            <',
									' class="h-5 w-5" />\n        </div>\n    ',
								])),
							function () {
								e.options().windowOpen('https://dos.zone/', '_blank');
							},
							u.Icons.Plus
						);
					}
					function p(e) {
						if (!0 === e.options().noSideBar) return null;
						function t() {
							e.sideBar ? e.closeSideBar() : e.openSideBar();
						}
						return !0 !== e.options().withNetworkingApi
							? (0, c.html)(
									i ||
										(i = l([
											'\n        <div class="h-6 w-6 my-4 text-gray-600 cursor-pointer" onClick=',
											'>\n            <',
											' class="h-6 w-6" />\n        </div>\n    ',
										])),
									t,
									u.Icons.DotsHorizontal
								)
							: e.ipxConnected
								? (0, c.html)(
										s ||
											(s = l([
												'\n        <div class="h-6 w-6 my-4 text-green-400 cursor-pointer" onClick=',
												'>\n            <',
												' class="h-6 w-6" />\n        </div>\n    ',
											])),
										t,
										u.Icons.Online
									)
								: (0, c.html)(
										a ||
											(a = l([
												'\n            <div class="h-6 w-6 my-4 relative text-red-800 cursor-pointer" onClick=',
												'>\n                <',
												' class="h-6 w-6" />\n                <span class="animate-ping absolute inline-flex top-0 left-0\n                    h-full w-full rounded-full bg-red-400 opacity-75"></span>\n            </div>\n        ',
											])),
										t,
										u.Icons.Offline
									);
					}
					n.ActionBar = function (e) {
						if (!e.actionBar) return null;
						const t = !0 === e.options().noSideBar && !0 === e.options().noSocialLinks;
						return (0, c.html)(
							r ||
								(r = l([
									'\n    <div class="bg-gray-200 shadow w-10 h-full overflow-hidden flex flex-col items-center">\n        <',
									' ...',
									' />\n        <',
									' ...',
									' />\n        <',
									' column="true" class="flex-grow \n            ',
									'" \n            portal=',
									' ...',
									' />\n    </div>\n    ',
								])),
							p,
							e,
							f,
							e,
							d.Controls,
							t ? '' : ' border-t-2 border-gray-400',
							!0,
							e
						);
					};
				},
				{ '../dom': 151, '../icons': 153, './controls': 134 },
			],
			131: [
				function (e, t, n) {
					'use strict';
					var r;
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.ActionHide = void 0);
					const o = e('../dom'),
						i = e('../icons');
					n.ActionHide = function (e) {
						return (0, o.html)(
							r ||
								((t = [
									'\n    <div class="filter transition-opacity duration-1000\n                        bg-gray-200 ',
									'\n                        w-5 h-12\n                        rounded-r-md cursor-pointer" onClick=',
									'>\n        <div class="h-4 w-4 my-4">\n            <',
									' class="h-4 w-4" />\n        </div>\n    </div>\n    ',
								]),
								n || (n = t.slice(0)),
								(r = Object.freeze(Object.defineProperties(t, { raw: { value: Object.freeze(n) } })))),
							e.class,
							() => e.setActionBar(!e.actionBar),
							e.actionBar ? i.Icons.ChevronLeft : i.Icons.ChevronRight
						);
						var t, n;
					};
				},
				{ '../dom': 151, '../icons': 153 },
			],
			132: [
				function (e, t, n) {
					'use strict';
					var r;
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.ActionSaveOrExit = void 0);
					const o = e('preact/hooks'),
						i = e('../dom'),
						s = e('../icons');
					n.ActionSaveOrExit = function (e) {
						const t = e.options().onExit,
							[n, a] = (0, o.useState)(!1),
							[l, c] = (0, o.useState)(!1),
							u = 'function' == typeof t;
						return (
							(0, o.useEffect)(() => {
								const t = e.options().preventUnload;
								if (!l && u && !1 !== t)
									return (
										window.addEventListener('beforeunload', n),
										() => {
											window.removeEventListener('beforeunload', n);
										}
									);
								function n(t) {
									if (void 0 === e.player().ciPromise) return;
									const n = u ? 'Please use close button to save progress before closing!' : 'Please use save button to save progress before closing!';
									setTimeout(() => {
										e.player().layers.notyf.error(n), a(!0);
									}, 16),
										t.preventDefault(),
										(t.returnValue = n);
								}
							}, [a, e.player, l, t, u]),
							l
								? null
								: (0, i.html)(
										r ||
											((d = [
												'\n    <div class="',
												' flex items-center justify-center \n        filter transition-opacity duration-1000\n        bg-gray-200 ',
												'\n        cursor-pointer" onClick=',
												'>\n        <div class="h-6 w-6">\n            <',
												' class="h-6 w-6" />\n        </div>\n    </div>\n    ',
											]),
											f || (f = d.slice(0)),
											(r = Object.freeze(Object.defineProperties(d, { raw: { value: Object.freeze(f) } })))),
										e.class ? e.class : '',
										n ? ' text-red-500 animate-pulse' : '',
										async function () {
											try {
												a(!1), c(!0);
												const o = e.player();
												o.layers.notyf.success('Saving, please wait...');
												try {
													await o.layers.save();
												} catch (e) {
													console.error(e), o.layers.notyf.error(e.message);
												}
												if (u) {
													try {
														var n, r;
														await (null === (n = (r = e.options()).onBeforeExit) || void 0 === n ? void 0 : n.call(r)), await o.stop();
													} catch (e) {
														console.error(e), o.layers.notyf.error(e.message);
													}
													t();
												}
											} finally {
												c(!1);
											}
										},
										u ? s.Icons.XCircle : s.Icons.FloppyDisk
									)
						);
						var d, f;
					};
				},
				{ '../dom': 151, '../icons': 153, 'core-js/modules/web.dom-collections.iterator.js': 118, 'preact/hooks': 126 },
			],
			133: [
				function (e, t, n) {
					'use strict';
					var r, o;
					function i(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.Client = void 0);
					const s = e('preact/hooks'),
						a = e('../dom'),
						l = e('../icons'),
						c = e('../dom');
					n.Client = function (e) {
						const [t, n] = (0, s.useState)(!1);
						if (void 0 === e.requestClientId && null === e.clientId) return null;
						if (null === e.clientId) {
							const o = () => {
								void 0 !== e.requestClientId &&
									(n(!0),
									e
										.requestClientId(!0)
										.then(t => {
											n(!1), e.setClientId(t);
										})
										.catch(e => {
											n(!1), console.error(e);
										}));
							};
							return (0, a.html)(
								r ||
									(r = i([
										'\n            <div class="flex flex-row justify-center items-center ',
										'">\n                <div class="h-6 w-6 text-red-800 animate-pulse mr-2">\n                    <',
										' class="h-6 w-6" />\n                </div>\n                <div class="border-2 rounded px-4\n                    ',
										' \n                    cursor-pointer" onClick=',
										'>\n                    Login\n                </div>\n            </div>\n        ',
									])),
								e.class,
								l.Icons.UserCircle,
								t ? ' text-gray-400 border-gray-400' : 'text-blue-400 border-blue-400',
								o
							);
						}
						const u = e.clientId.id;
						return (0, a.html)(
							o ||
								(o = i([
									'\n        <div class="flex flex-row justify-center ',
									'">\n            <div class="h-6 w-6 text-green-400 mr-2">\n                <',
									' class="h-6 w-6" />\n            </div>\n            <div class="flex-shrink overflow-hidden overflow-ellipsis">',
									'</div>\n            <div class="h-6 w-6 ml-2 cursor-pointer" onClick=',
									'>\n                <',
									' class="h-6 w-6" />\n            </div>\n        </div>\n    ',
								])),
							e.class,
							l.Icons.UserCircle,
							u,
							async function () {
								e.closeSideBar();
								const t = e.player();
								try {
									await (async function (e) {
										if (!e.ciPromise) return;
										const t = await e.ciPromise,
											n = await t.persist();
										(0, c.downloadFile)(n, 'saves.zip', 'application/zip');
									})(t);
								} catch (e) {
									t.layers.notyf.error('Unexpected error'), console.error(e);
								}
							},
							l.Icons.Download
						);
					};
				},
				{ '../dom': 151, '../icons': 153, 'core-js/modules/web.dom-collections.iterator.js': 118, 'preact/hooks': 126 },
			],
			134: [
				function (e, t, n) {
					'use strict';
					var r, o, i;
					function s(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.Controls = void 0);
					const a = e('preact/hooks'),
						l = e('../dom'),
						c = e('../icons');
					function u(e) {
						const [t, n] = (0, a.useState)(!1);
						async function r(r, o) {
							r.stopPropagation(), await e.setAutolock(o), t && n(!1);
						}
						return (0, l.html)(
							o ||
								(o = s([
									'\n        <div class="menu-button h-6 w-6 text-green-400 cursor-pointer" onClick=',
									'>\n            <',
									' class="h-6 w-6" />\n            <div class="',
									' absolute z-50 \n                        bg-gray-200 -mt-7 h-8 left-10 flex flex-row items-center\n                         rounded-r-md cursor-pointer" onClick=',
									'>\n                <div class="flex flex-row ',
									'">\n                    <div class="h-6 w-6 mx-2 \n                        ',
									'"\n                        onClick=',
									'>\n                        <',
									' class="h-6 w-6" />\n                    </div>\n                    <div class="h-6 w-6 mx-2 \n                        ',
									'"\n                        onClick=',
									'>\n                        <',
									' class="h-6 w-6" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    ',
								])),
							async function (o) {
								o.target.classList.contains('sensitivity') ||
									(e.portal
										? n(!t)
										: await (async function (t) {
												await r(t, !e.autolock);
											})(o),
									o.preventDefault(),
									o.stopPropagation());
							},
							e.autolock ? c.Icons.CursorClick : c.Icons.Cursor,
							e.portal ? '' : 'hidden',
							() => {},
							t ? '' : 'hidden',
							e.autolock ? 'text-black' : 'text-green-400',
							e => r(e, !1),
							c.Icons.Cursor,
							e.autolock ? 'text-green-400' : 'text-black',
							e => r(e, !0),
							c.Icons.CursorClick
						);
					}
					function d(e) {
						const [t, n] = (0, a.useState)(!1);
						return (0, l.html)(
							i ||
								(i = s([
									'\n    <div class="h-6 w-6 text-green-400 cursor-pointer" onClick=',
									'>\n            <',
									' class="h-6 w-6" />\n            <div class="',
									' absolute z-50 bg-gray-200 -mt-7 h-8 left-10 flex flex-row items-center\n                             rounded-r-md cursor-pointer" onClick=',
									'>\n                <div class="h-6 w-6 mx-2 \n                    ',
									'"\n                    onClick=',
									'>\n                    <',
									' class="h-6 w-6" />\n                </div>\n                <div class="h-6 w-6 mx-2 \n                    ',
									'"\n                    onClick=',
									'>\n                    <',
									' class="h-6 w-6" />\n                </div>\n                <div class="h-6 w-6 mx-2  ',
									'"\n                    onClick=',
									'>\n                    <',
									' class="h-6 w-6" />\n                </div>\n            </div>\n        </div>\n    ',
								])),
							function () {
								e.portal ? n(!t) : e.setMobileControls(!e.mobileControls);
							},
							e.mirroredControls ? c.Icons.SwithcHorizontal : e.mobileControls ? c.Icons.Mobile : c.Icons.EyeOff,
							t ? '' : 'hidden',
							() => {},
							e.mobileControls || e.mirroredControls ? 'text-black' : 'text-green-400',
							async function (t) {
								await e.setMirroredControls(!1), await e.setMobileControls(!1), n(!1), t.stopPropagation();
							},
							c.Icons.EyeOff,
							!e.mirroredControls && e.mobileControls ? 'text-green-400' : 'text-black',
							async function (t) {
								await e.setMobileControls(!0), await e.setMirroredControls(!1), n(!1), t.stopPropagation();
							},
							c.Icons.Mobile,
							e.mirroredControls ? 'text-green-400' : 'text-black',
							async function (t) {
								await e.setMirroredControls(!0), n(!1), t.stopPropagation();
							},
							c.Icons.SwithcHorizontal
						);
					}
					n.Controls = function (e) {
						return (0, l.html)(
							r ||
								(r = s([
									'\n    <div class="flex ',
									' justify-evenly ',
									'">\n        <',
									' ...',
									' />\n        <',
									' ...',
									' />\n        <div class="h-6 w-6 ',
									' cursor-pointer"\n            onClick=',
									'>\n            <',
									' class="h-6 w-6" />\n        </div>\n        <div class="h-6 w-6 ',
									' cursor-pointer" onClick=',
									'>\n            <',
									' class="h-6 w-6" />\n        </div>\n        <div class="h-6 w-6 ',
									' cursor-pointer" onClick=',
									'>\n            <',
									' class="h-6 w-6" />\n        </div>\n        <div class="h-6 w-6 ',
									' \n        ',
									' cursor-pointer" onClick=',
									'>\n            <',
									' class="h-6 w-6" />\n        </div>\n    </div>\n    ',
								])),
							e.column ? ' flex-col' : 'flex-row',
							e.class,
							u,
							e,
							d,
							e,
							e.pause ? ' text-red-400 animate-pulse' : 'font-bold',
							function () {
								e.setPause(!e.pause), e.closeSideBar();
							},
							e.pause ? c.Icons.Play : c.Icons.Pause,
							e.mute ? ' text-green-400' : '',
							function () {
								e.setMute(!e.mute), e.closeSideBar();
							},
							e.mute ? c.Icons.VolumeOff : c.Icons.VolumeUp,
							e.keyboard ? ' text-green-400' : '',
							function () {
								e.toggleKeyboard(), e.closeSideBar();
							},
							c.Icons.PencilAlt,
							e.fullscreen ? ' text-green-400' : '',
							!0 === e.options().noFullscreen ? 'hidden' : '',
							function () {
								e.toggleFullscreen(), e.closeSideBar();
							},
							c.Icons.ArrowsExpand
						);
					};
				},
				{ '../dom': 151, '../icons': 153, 'core-js/modules/web.dom-collections.iterator.js': 118, 'preact/hooks': 126 },
			],
			135: [
				function (e, t, n) {
					'use strict';
					var r;
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.SideBarCpuControl = void 0);
					const o = e('../dom'),
						i = e('../icons'),
						s = e('./horizontal-slider');
					n.SideBarCpuControl = function (e) {
						return (0, o.html)(
							r ||
								((t = [
									'\n        <',
									' minValue=',
									' maxValue=',
									'\n            maxLabel="max"\n            initialValue=',
									' \n            onChange=',
									'\n            icon=',
									'\n            registerListner=',
									'\n            removeListener=',
									'\n            />\n    ',
								]),
								n || (n = t.slice(0)),
								(r = Object.freeze(Object.defineProperties(t, { raw: { value: Object.freeze(n) } })))),
							s.HorizontalSlider,
							100,
							5e3,
							5e3,
							e => {},
							i.Icons.VolumeUp,
							() => {},
							() => {}
						);
						var t, n;
					};
				},
				{ '../dom': 151, '../icons': 153, './horizontal-slider': 136 },
			],
			136: [
				function (e, t, n) {
					'use strict';
					var r;
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.HorizontalSlider = void 0);
					const o = e('preact/hooks'),
						i = e('../dom');
					n.HorizontalSlider = function (e) {
						const { minValue: t, maxValue: n, initialValue: s, onChange: a, icon: l } = e,
							c = n - t,
							u = (0, o.useRef)(null),
							[d, f] = (0, o.useState)(s),
							[p, h] = (0, o.useState)(0);
						(0, o.useEffect)(() => {
							if (null === u || null === u.current) return;
							let t = !1;
							const n = u.current,
								r = e => {
									const t = n.getBoundingClientRect(),
										r = (e.clientX - t.left) / t.width;
									return Math.max(Math.min(1, r), 0) * c;
								},
								o = e => {
									e.target !== n || t || ((t = !0), h(80), f(r(e)), e.stopPropagation(), e.preventDefault());
								},
								i = e => {
									if (!t) return;
									const n = r(e);
									f(n), a(n), e.stopPropagation(), e.preventDefault();
								},
								s = e => {
									if (!t) return;
									(t = !1), h(0);
									const n = r(e);
									f(n), a(n), e.stopPropagation(), e.preventDefault();
								};
							return (
								window.addEventListener('pointerdown', o),
								window.addEventListener('pointermove', i),
								window.addEventListener('pointerup', s),
								window.addEventListener('pointercancel', s),
								n.addEventListener('pointerup', s),
								n.addEventListener('pointercancel', s),
								e.registerListner(f),
								() => {
									e.removeListener(f),
										window.removeEventListener('pointerdown', o),
										window.removeEventListener('pointermove', i),
										window.removeEventListener('pointerup', s),
										window.removeEventListener('pointercancel', s),
										n.removeEventListener('pointerup', s),
										n.removeEventListener('pointercancel', s);
								}
							);
						}, [u]);
						const m = Math.max(0, Math.min(100, Math.round((d / c) * 100))) + '%';
						let y = Math.round(10 * (t + d)) / 10 + '';
						return (
							t + d === n && void 0 !== e.maxLabel && (y = e.maxLabel),
							(0, i.html)(
								r ||
									((v = [
										'\n        <div class="h-full flex flex-row py-0 items-center">\n            <div class="bg-gray-200 rounded flex items-center justify-center h-6 w-5 lt-4 text-gray-600">\n                <',
										' class="h-4 w-4" />\n            </div>\n            <div class="cursor-pointer flex-grow px-4 py-2" ref=',
										'>\n                <div class=',
										'>\n                    <div class="flex flex-row items-center absolute -mt-3" style=',
										'>\n                        <div class="bg-gray-600 -ml-2 flex-shrink-0 w-6 h-6 rounded-full"></div>\n                        <div class="bg-green-100 ml-2 py-1 px-2 rounded z-50 ',
										'">\n                            ',
										'\n                        </div>\n                    </div>    \n                </div>\n            </div>\n        </div>\n    ',
									]),
									g || (g = v.slice(0)),
									(r = Object.freeze(Object.defineProperties(v, { raw: { value: Object.freeze(g) } })))),
								l,
								u,
								'pointer-events-none relative sensitivity rounded-2xl bg-gray-400 h-2 w-full' + (e.class ? e.class : ''),
								{ left: m },
								'opacity-' + p,
								y
							)
						);
						var v, g;
					};
				},
				{ '../dom': 151, 'core-js/modules/web.dom-collections.iterator.js': 118, 'preact/hooks': 126 },
			],
			137: [
				function (e, t, n) {
					'use strict';
					var r;
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.Region = void 0);
					const o = e('../dom'),
						i = e('../icons');
					n.Region = function (e) {
						let t = e.region;
						return (
							null !== t && null !== e.latencyInfo && (t += ' (' + e.latencyInfo.regionLatency + ' ms)'),
							(0, o.html)(
								r ||
									((n = [
										'\n        <div class="flex flex-row justify-between items-center ',
										'">\n            <div class="text-gray-600">Region</div>\n            <div class="px-4 overflow-hidden overflow-ellipsis whitespace-nowrap flex-shrink">\n                ',
										'\n            </div>\n            <div class="h-6 w-6 ',
										'" \n                onClick=',
										'>\n                <',
										' class="h-6 w-6" />\n            </div>\n        </div>\n    ',
									]),
									s || (s = n.slice(0)),
									(r = Object.freeze(Object.defineProperties(n, { raw: { value: Object.freeze(s) } })))),
								e.class,
								t || e.estimatingRegion || 'Connecting...',
								null === e.region ? 'animate-reverse-spin' : 'cursor-pointer',
								function () {
									null !== e.region && e.setRegion(null);
								},
								i.Icons.Refresh
							)
						);
						var n, s;
					};
				},
				{ '../dom': 151, '../icons': 153 },
			],
			138: [
				function (e, t, n) {
					'use strict';
					var r, o;
					function i(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.SideBarScaleControl = n.ActionBarScaleControl = void 0);
					const s = e('../dom'),
						a = e('../icons'),
						l = e('./vertical-slider'),
						c = e('./horizontal-slider');
					(n.ActionBarScaleControl = function (e) {
						return e.mobileControls || e.mirroredControls
							? (0, s.html)(
									r ||
										(r = i([
											'\n        <',
											' minValue=',
											' maxValue=',
											'\n            initialValue=',
											' \n            onChange=',
											'\n            icon=',
											'\n            registerListner=',
											'\n            removeListener=',
											'\n            />\n    ',
										])),
									l.VerticalSlider,
									0.8,
									2.5,
									e.player().scaleControls,
									t => e.player().setScaleControls(t),
									e.mirroredControls ? a.Icons.SwithcHorizontal : a.Icons.Mobile,
									e.player().registerOnScaleChanged,
									e.player().removeOnScaleChanged
								)
							: null;
					}),
						(n.SideBarScaleControl = function (e) {
							return (0, s.html)(
								o ||
									(o = i([
										'\n        <',
										' minValue=',
										' maxValue=',
										'\n            initialValue=',
										' \n            onChange=',
										'\n            icon=',
										'\n            registerListner=',
										'\n            removeListener=',
										'\n            />\n    ',
									])),
								c.HorizontalSlider,
								0.8,
								2.5,
								e.player().scaleControls,
								t => e.player().setScaleControls(t),
								e.mirroredControls ? a.Icons.SwithcHorizontal : a.Icons.Mobile,
								e.player().registerOnScaleChanged,
								e.player().removeOnScaleChanged
							);
						});
				},
				{ '../dom': 151, '../icons': 153, './horizontal-slider': 136, './vertical-slider': 149 },
			],
			139: [
				function (e, t, n) {
					'use strict';
					var r, o;
					function i(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.SideBarSensitivityControl = n.ActionBarSensitivityControl = void 0);
					const s = e('../dom'),
						a = e('../icons'),
						l = e('./vertical-slider'),
						c = e('./horizontal-slider');
					(n.ActionBarSensitivityControl = function (e) {
						return e.autolock
							? (0, s.html)(
									r ||
										(r = i([
											'\n        <',
											' minValue=',
											' maxValue=',
											'\n            initialValue=',
											' \n            onChange=',
											'\n            icon=',
											'\n            registerListner=',
											'\n            removeListener=',
											'\n            />\n    ',
										])),
									l.VerticalSlider,
									0.1,
									4,
									e.player().sensitivity,
									t => e.player().setSensitivity(t),
									a.Icons.CursorClick,
									e.player().registerOnSensitivityChanged,
									e.player().removeOnSensitivityChanged
								)
							: null;
					}),
						(n.SideBarSensitivityControl = function (e) {
							return (0, s.html)(
								o ||
									(o = i([
										'\n        <',
										' minValue=',
										' maxValue=',
										'\n            initialValue=',
										' \n            onChange=',
										'\n            icon=',
										'\n            registerListner=',
										'\n            removeListener=',
										'\n            />\n    ',
									])),
								c.HorizontalSlider,
								0.1,
								4,
								e.player().sensitivity,
								t => e.player().setSensitivity(t),
								a.Icons.CursorClick,
								e.player().registerOnSensitivityChanged,
								e.player().removeOnSensitivityChanged
							);
						});
				},
				{ '../dom': 151, '../icons': 153, './horizontal-slider': 136, './vertical-slider': 149 },
			],
			140: [
				function (e, t, n) {
					'use strict';
					var r, o, i;
					function s(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.SideBar = void 0);
					const a = e('preact/hooks'),
						l = e('../dom'),
						c = e('../icons'),
						u = e('./sidebar/main'),
						d = e('./sidebar/latency-info'),
						f = e('./sidebar/networking'),
						p = e('../backend/v7/latency');
					function h(e) {
						if (!0 === e.options().noSocialLinks) return null;
						function t() {
							e.options().windowOpen('https://discord.com/invite/hMVYEbG', '_blank');
						}
						function n() {
							e.options().windowOpen('https://t.me/doszonechat', '_blank');
						}
						return !0 === ('networking' === e.sideBarPage)
							? (0, l.html)(
									o ||
										(o = s([
											'\n        <div class="flex flex-row justify-around items-center">\n            <div class="font-bold text-purple-600">Matchmaking:</div>\n            <div class="h-6 w-6 text-gray-600 cursor-pointer" onClick=',
											'>\n                <',
											' class="h-6 w-6" />\n            </div>\n            <div class="h-4 w-4 mt-0.5 text-gray-600 cursor-poiner" onClick=',
											'>\n                <',
											' class="h-4 w-4" />\n            </div>\n        </div>\n    ',
										])),
									t,
									c.Icons.Discord,
									n,
									c.Icons.Telegram
								)
							: (0, l.html)(
									i ||
										(i = s([
											'\n        <div class="flex flex-row justify-around">\n            <div class="h-6 w-6 -mt-1 text-gray-600 cursor-pointer" onClick=',
											'>\n                <',
											' class="h-6 w-6" />\n            </div>\n            <div class="h-4 w-4 text-gray-600 cursor-pointer" onClick=',
											'>\n                <',
											' class="h-4 w-4" />\n            </div>\n            <div class="h-4 w-4 text-gray-600 cursor-pointer" onClick=',
											'>\n                <',
											' class="h-4 w-4" />\n            </div>\n            <div class="h-6 w-6 -mt-1 text-gray-600 cursor-pointer" onClick=',
											'>\n                <',
											' class="h-6 w-6" />\n            </div>\n        </div>\n    ',
										])),
									t,
									c.Icons.Discord,
									n,
									c.Icons.Telegram,
									function () {
										e.options().windowOpen('https://twitter.com/intent/user?screen_name=doszone_db', '_blank');
									},
									c.Icons.Twitter,
									function () {
										e.options().windowOpen('https://dos.zone/donate/', '_blank');
									},
									c.Icons.CurrencyDollar
								);
					}
					n.SideBar = function (e) {
						if (!e.sideBar) return null;
						(0, a.useEffect)(() => {
							e.options().withNetworkingApi &&
								null === e.region &&
								(0, p.getAutoRegion)(e.setEstimatingRegion)
									.then(t => {
										e.setLatencyInfo(t), e.setRegion(t.region);
									})
									.catch(console.error);
						}, [e.region]);
						const t = 'networking' === e.sideBarPage;
						return (0, l.html)(
							r ||
								(r = s([
									'\n    <div class="flex flex-col filter absolute z-50 top-0 bottom-0 right-0 px-8 pt-6\n                w-full sm:w-80 rounded-l-lg drop-shadow-lg bg-white overflow-y-auto overflow-x-hidden pb-4">\n        <div class="transform absolute text-gray-400 hover:text-gray-800\n                            top-2 left-2 cursor-pointer hover:scale-125" onClick=',
									'>\n            <',
									' class="h-6 w-6" />\n        </div>\n        <div class="transform absolute text-gray-400 hover:text-gray-800\n                             top-2 right-2 cursor-pointer hover:scale-125\n                             ',
									'" onClick=',
									'>\n            <',
									' class="h-6 w-6" />\n        </div>\n    \n    \n        <',
									' ...',
									' />\n        <',
									' ...',
									' />\n        <',
									' ...',
									' />\n\n        <div class="flex-grow"></div>\n    \n        <',
									' ...',
									' />\n    </div>\n    ',
								])),
							function () {
								'main' === e.sideBarPage ? e.closeSideBar() : e.setSideBarPage('main');
							},
							'main' === e.sideBarPage ? c.Icons.XCircle : c.Icons.ArrowsCircleLeft,
							t ? 'text-purple-400' : '',
							function () {
								t ? e.options().windowOpen('https://youtu.be/XEoWLQmU168', '_blank') : (e.setShowTips(!0), e.closeSideBar());
							},
							c.Icons.QuestionMarkCircle,
							u.Main,
							e,
							d.LatencyInfo,
							e,
							f.Networking,
							e,
							h,
							e
						);
					};
				},
				{
					'../backend/v7/latency': 127,
					'../dom': 151,
					'../icons': 153,
					'./sidebar/latency-info': 141,
					'./sidebar/main': 142,
					'./sidebar/networking': 143,
					'preact/hooks': 126,
				},
			],
			141: [
				function (e, t, n) {
					'use strict';
					var r, o, i, s, a;
					function l(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.LatencyInfo = void 0);
					const c = e('../../dom'),
						u = e('../../icons');
					n.LatencyInfo = function (e) {
						if (null === e.latencyInfo) return null;
						const t = t => {
							e.setSideBarPage('latency-info'), t.stopPropagation(), t.preventDefault();
						};
						if (!0 === e.asButton && 'main' === e.sideBarPage)
							return (0, c.html)(
								r ||
									(r = l([
										'\n        <div class="flex flex-row justify-between items-center cursor-pointer ',
										' my-2"\n            onClick=',
										'>\n            <div class="">\n                Show latency\n            </div>\n            <div>\n                <',
										' class="text-green-400 h-6 -w-6" />\n            </div>\n        </div>\n        ',
									])),
								e.class,
								t,
								u.Icons.ArrowsCircleRight
							);
						if ('latency-info' !== e.sideBarPage) return null;
						const n = [];
						for (const t of Object.keys(e.latencyInfo.estimation)) {
							const r = [];
							r.push((0, c.html)(o || (o = l(['<div class="text-xs w-24 font-bold whitespace-nowrap break-words">', '</div>'])), t));
							for (let n = 0; n < 4; ++n)
								r.push(
									(0, c.html)(
										i ||
											(i = l([
												'\n                <div class="text-xs text-gray-600 text-right">\n                    ',
												'\n                </div>\n            ',
											])),
										e.latencyInfo.estimation[t][n]
									)
								);
							n.push((0, c.html)(s || (s = l(['<div class="flex flex-row flex-wrap justify-between">', '</div>'])), r));
						}
						return (0, c.html)(
							a || (a = l(['\n        <div class="sidebar-header">Latency</div>\n        <div class="flex flex-col">\n            ', '\n        </div>\n    '])),
							n
						);
					};
				},
				{ '../../dom': 151, '../../icons': 153, 'core-js/modules/web.dom-collections.iterator.js': 118 },
			],
			142: [
				function (e, t, n) {
					'use strict';
					var r, o, i, s, a, l, c;
					function u(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.Main = void 0);
					const d = e('../../dom'),
						f = e('../client'),
						p = e('../controls'),
						h = e('../region'),
						m = e('./latency-info'),
						y = e('../../icons'),
						v = (e('../cpu-control'), e('../scale-control')),
						g = e('../volume-control'),
						b = e('../sensitivity-control');
					function w(e) {
						return (0, d.html)(
							l ||
								(l = u([
									'<div class="flex flex-row items-center justify-center my-2">\n        <div class="w-20 text-sm overflow-hidden overflow-ellipsis">',
									'</div>\n        <div class="flex-grow"><',
									' ...',
									' /></div>\n    </div>',
								])),
							e.label,
							e.slideBar,
							e.appProps
						);
					}
					function _(e) {
						return null === e.region
							? null
							: (0, d.html)(
									c ||
										(c = u([
											'\n        <div class="flex flex-row justify-between items-center cursor-pointer ',
											'"\n                onClick=',
											'>\n            <div class="">\n                ',
											'\n            </div>\n            <div>\n                <',
											' class="text-green-400 h-6 -w-6" />\n            </div>\n        </div>\n    ',
										])),
									e.class,
									() => e.setSideBarPage('networking'),
									e.ipxConnected ? 'IPX [Connected]' : 'Configure networks',
									y.Icons.ArrowsCircleRight
								);
					}
					n.Main = function (e) {
						if ('main' !== e.sideBarPage) return null;
						const t = !0 === e.options().withNetworkingApi;
						return (0, d.html)(
							r ||
								(r = u([
									'\n        <',
									' class="mt-2 mb-2 pb-2 border-b-2 border-green-200" ...',
									' />\n        <',
									' class="mt-2" portal=',
									' ...',
									' />\n        \n        ',
									'\n        ',
									'\n        ',
									'\n        ',
									'\n\n        <div class="sidebar-header mt-8">Configuration</div>\n        ',
									'\n        <',
									' label="Volume" slideBar=',
									' appProps=',
									' />\n        <',
									' label="Sensitivity" slideBar=',
									' appProps=',
									' />\n        <',
									' label="Scale" slideBar=',
									' appProps=',
									' />\n    ',
								])),
							f.Client,
							e,
							p.Controls,
							!1,
							e,
							t && (0, d.html)(o || (o = u(['<div class="sidebar-header mt-8">Networking</div>']))),
							t && (0, d.html)(i || (i = u(['<', ' class="mt-2" ...', ' />'])), h.Region, e),
							t && (0, d.html)(s || (s = u(['<', ' ...', ' class="mt-4" asButton=', ' />'])), m.LatencyInfo, e, !0),
							t && (0, d.html)(a || (a = u(['<', ' ...', ' class="mt-2" />'])), _, e),
							!1,
							w,
							g.SideBarVolumeControl,
							e,
							w,
							b.SideBarSensitivityControl,
							e,
							w,
							v.SideBarScaleControl,
							e
						);
					};
				},
				{
					'../../dom': 151,
					'../../icons': 153,
					'../client': 133,
					'../controls': 134,
					'../cpu-control': 135,
					'../region': 137,
					'../scale-control': 138,
					'../sensitivity-control': 139,
					'../volume-control': 150,
					'./latency-info': 141,
				},
			],
			143: [
				function (e, t, n) {
					'use strict';
					var r;
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.Networking = void 0);
					const o = e('../../dom'),
						i = e('./token/token');
					n.Networking = function (e) {
						return 'networking' !== e.sideBarPage
							? null
							: (0, o.html)(
									r ||
										((t = ['\n        <', ' ...', ' />\n    ']),
										n || (n = t.slice(0)),
										(r = Object.freeze(Object.defineProperties(t, { raw: { value: Object.freeze(n) } })))),
									i.TokenConfiguration,
									e
								);
						var t, n;
					};
				},
				{ '../../dom': 151, './token/token': 146 },
			],
			144: [
				function (e, t, n) {
					'use strict';
					var r, o, i, s, a;
					function l(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.TokenAddTime = void 0);
					const c = e('preact/hooks'),
						u = e('../../../backend/v7/v7-config'),
						d = e('../../../dom'),
						f = e('../../../icons'),
						p = e('../../../request'),
						h = 1800;
					n.TokenAddTime = function (e) {
						const [t, n] = (0, c.useState)(null),
							[m, y] = (0, c.useState)(!1),
							[v, g] = (0, c.useState)(h),
							[b, w] = (0, c.useState)(null),
							[_, x] = (0, c.useState)(!1),
							k = m || (v !== h && null === b);
						return (0, d.html)(
							r || (r = l(['\n        <div class="font-bold">Add time:</div>\n        ', '\n        \n        ', '\n      \n    '])),
							_
								? (0, d.html)(
										o ||
											(o = l([
												'\n            <div class="cursor-pointer underline text-green-600 font-bold" onClick=',
												'>\n                check payment\n            </div> \n        ',
											])),
										e.update
									)
								: (0, d.html)(
										i ||
											(i = l([
												'\n            <div class="flex flex-row">\n                <select disabled=',
												' class="w-14 flex-grow mr-2 \n                    ',
												' "\n                    name="select" onChange=',
												'>\n                    <option value=',
												' selected>FREE</option>\n                    <option value="259200">+3 Days</option>\n                    <option value="864000">+10 Days</option>\n                    <option value="2592000">+30 Days</option>\n                </select>\n                ',
												'\n            </div>\n        ',
											])),
										m,
										m ? 'border-gray-400 disabled:bg-gray-200' : '',
										async function (t) {
											const n = Number.parseInt(t.currentTarget.value);
											try {
												y(!0),
													w(null),
													g(n),
													n !== h &&
														w(
															await (async function (e, t) {
																var n;
																const r = null !== (n = t.clientId) && void 0 !== n ? n : t.anonymousClientId;
																return (
																	await (0, p.request)(
																		u.checkoutCreateTokenEndpoint,
																		'POST',
																		JSON.stringify({ id: r.id, namespace: r.namespace, product: e, token: t.networkToken })
																	)
																).token;
															})('t_' + n, e)
														);
											} finally {
												y(!1);
											}
										},
										h,
										k
											? f.Icons.Refresh({ class: 'h-6 w-6 animate-reverse-spin' })
											: (0, d.html)(
													s ||
														(s = l([
															'\n                    <div class="h-6 w-6 cursor-pointer text-green-400 hover:text-green-600"\n                        onClick=',
															'>\n                        <',
															' class="h-6 w-6" />\n                    </div>\n                ',
														])),
													async function (t) {
														if ((t.stopPropagation(), !m)) {
															n(null), y(!0);
															try {
																if (v === h)
																	await (0, p.request)(u.addFreeTimeTierEndpoint, 'POST', JSON.stringify({ token: e.networkToken })), e.update();
																else {
																	if (null === b) throw new Error('accessToken is null');
																	!(function (e, t) {
																		t(u.checkoutEndpoint + '?token=' + e, '_blank');
																	})(b, e.options().windowOpen),
																		setTimeout(() => {
																			x(!0);
																		}, 300);
																}
															} catch (t) {
																n(
																	(function (e) {
																		if ('30-min-required' === e) return 'Only 30 minutes interval are enabled';
																		if ('free-soft-limit' === e) return 'This token reached free time limit, please use paid time';
																		if ('free-hard-limit' === e) return 'All free time of today is used, please use paid time';
																		if ('not-found' === e) return 'Token not found';
																		if ('too-early' === e) return 'You can add free time only if TTL less then 5 minutes';
																		return e;
																	})(t.message)
																);
															} finally {
																y(!1);
															}
														}
													},
													f.Icons.Plus
												)
									),
							t ? (0, d.html)(a || (a = l(['\n            <div class="font-bold text-red-400 col-span-2">*', '</div>\n        '])), t) : null
						);
					};
				},
				{
					'../../../backend/v7/v7-config': 129,
					'../../../dom': 151,
					'../../../icons': 153,
					'../../../request': 156,
					'core-js/modules/web.dom-collections.iterator.js': 118,
					'preact/hooks': 126,
				},
			],
			145: [
				function (e, t, n) {
					'use strict';
					var r, o, i, s;
					function a(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.TokenSelect = void 0);
					const l = e('../../../backend/v7/v7-config'),
						c = e('preact/hooks'),
						u = e('../../../request'),
						d = e('../../../dom'),
						f = e('../../../icons');
					n.TokenSelect = function (e) {
						var t;
						const [n, p] = (0, c.useState)(null !== (t = e.networkToken) && void 0 !== t ? t : ''),
							[h, m] = (0, c.useState)(null),
							[y, v] = (0, c.useState)(!1),
							g = n === e.networkToken || '' === n;
						function b(e) {
							var t;
							p((null !== (t = e.currentTarget.value) && void 0 !== t ? t : '').toLowerCase().trim());
						}
						async function w() {
							v(!0);
							try {
								if (g)
									return void (
										(null !== e.networkToken && !0 !== window.confirm('Are you sure want to create token?')) ||
										(await (async function () {
											var t;
											if (y || null === e.region) return void m('region is not selected');
											m(null), v(!0);
											const n = null !== (t = e.clientId) && void 0 !== t ? t : e.anonymousClientId;
											try {
												const t = await (0, u.request)(
													l.createTokenEndpoint,
													'POST',
													JSON.stringify({ namespace: n.namespace, id: n.id, region: e.region })
												);
												e.setNetworkToken(t.token);
											} catch (e) {
												m(e.message);
											} finally {
												v(!1);
											}
										})())
									);
								const t = 0 === n.length ? null : n;
								if (t === e.networkToken) return;
								!0 === window.confirm(null === t ? 'Are you sure want to reset?' : 'Are you sure want to switch token?') &&
									(null !== t &&
										(await (async function (e) {
											await (0, u.request)(l.tokeInfoGetEndpoint + '?token=' + e);
										})(t)),
									e.setNetworkToken(n));
							} catch (e) {
								m('Token error: ' + e.message);
							} finally {
								v(!1);
							}
						}
						return (0, d.html)(
							r || (r = a(['\n        <div class="font-bold">Token:</div>\n\n        ', '\n        \n        ', '\n    '])),
							y
								? (0, d.html)(
										o ||
											(o = a([
												'\n            <div class="col-span-2">\n                <',
												' class="w-6 h-6 animate-reverse-spin" />\n            </div>\n        ',
											])),
										f.Icons.Refresh
									)
								: (0, d.html)(
										i ||
											(i = a([
												'\n        <div class="flex flex-row">\n            <input class="rounded border ',
												' \n                px-2 w-14 flex-grow mr-2" type="text" value=',
												' \n                onChange=',
												' onKeyUp=',
												' onKeyDown=',
												' />\n            <div class="h-6 w-6 cursor-pointer ',
												'" \n                onClick=',
												'>\n                <',
												' \n                    class="h-6 w-6" />\n            </div>\n        </div>\n        ',
											])),
										'' === n ? 'border-red-600' : 'border-green-200',
										n,
										b,
										function (e) {
											b(e), 'Enter' === e.key && w(), e.stopPropagation();
										},
										function (e) {
											e.stopPropagation();
										},
										g ? 'text-green-400 hover:text-green-600' : '',
										w,
										g ? f.Icons.Plus : f.Icons.SwithcHorizontal
									),
							h ? (0, d.html)(s || (s = a(['\n            <div class="text-red-400 col-span-2">', '</div>\n        '])), h) : null
						);
					};
				},
				{
					'../../../backend/v7/v7-config': 129,
					'../../../dom': 151,
					'../../../icons': 153,
					'../../../request': 156,
					'core-js/modules/web.dom-collections.iterator.js': 118,
					'preact/hooks': 126,
				},
			],
			146: [
				function (e, t, n) {
					'use strict';
					var r, o, i, s, a, l, c, u, d, f, p, h;
					function m(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					e('core-js/modules/web.dom-collections.iterator.js'),
						e('core-js/modules/es.string.replace.js'),
						Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.TokenConfiguration = void 0);
					const y = e('preact/hooks'),
						v = e('../../../backend/v7/v7-config'),
						g = e('../../../dom'),
						b = e('../../../icons'),
						w = e('../../../xhr'),
						_ = e('../../../request'),
						x = e('./token-select'),
						k = e('./token-add-time');
					function C(e) {
						const [t, n] = (0, y.useState)(e.endTime - Date.now());
						return (
							(0, y.useEffect)(() => {
								if (t <= 0) return;
								const r = setInterval(() => {
									const t = Math.max(0, e.endTime - Date.now());
									0 === t && (e.update(), clearInterval(r)), n(t);
								}, 1e4);
								return () => clearInterval(r);
							}, [e.endTime]),
							(0, g.html)(
								l ||
									(l = m([
										'\n        <div class="font-bold">TTL:</div>\n        <div class="',
										' cursor-pointer underline"\n            onClick=',
										'>\n            ',
										'\n        </div>\n    ',
									])),
								t < 3e5 ? ' text-red-400' : 'text-gray-400',
								e.update,
								(function (e) {
									if (e > 86400) {
										const t = Math.round((e / 24 / 60 / 60) * 10) / 10;
										return t + (1 === t ? ' Day' : ' Days');
									}
									if (e > 3600) {
										const t = Math.round((e / 60 / 60) * 10) / 10;
										return t + (1 === t ? ' Hour' : ' Hrs');
									}
									return Math.round((e / 60) * 10) / 10 + ' Min';
								})(t / 1e3)
							)
						);
					}
					function E(e) {
						const [t, n] = (0, y.useState)(!1),
							[r, o] = (0, y.useState)(null);
						function i() {
							n(!0),
								(0, w.postObject)(v.stopIpx + '?token='.concat(e.networkToken, '&arn=').concat(e.ipx.arn))
									.then(() => {
										n(!1), e.ipx.setAddress(null), e.ipx.setAwaitingAddress(!1);
									})
									.catch(e => {
										var t;
										console.error("Can't stop ipx", e), o(null !== (t = e.errorCode) && void 0 !== t ? t : e.message), n(!1);
									});
						}
						if (null !== r) return (0, g.html)(c || (c = m(['\n            <div class="text-red-400 col-span-2">', '</div>\n        '])), r);
						if (t) return (0, g.html)(u || (u = m(['\n            <', ' class="w-6 h-6 col-span-2 animate-reverse-spin" />\n        '])), b.Icons.Refresh);
						if (null !== e.ipx.address) {
							const t = e.ipxConnected ? 'Disconnect' : e.ipx.awaitingConnection ? 'Connecting...' : 'Connect',
								n = () => {
									e.ipx.awaitingConnection ||
										(function () {
											var t;
											const n = !e.ipxConnected,
												r = e.ipx.address;
											r &&
												(null === (t = e.player().ciPromise) ||
													void 0 === t ||
													t
														.then(t =>
															n
																? (e.ipx.setAwaitingConnection(!0),
																	'http:' === location.protocol && void 0 === e.options().hardware && r.endsWith('.jj.dos.zone')
																		? t.networkConnect(0, 'ws://' + r.substring(0, r.length - '.jj.dos.zone'.length).replace(/_/g, '.'), 1901)
																		: t.networkConnect(0, r, 1901))
																: t.networkDisconnect(0)
														)
														.then(() => {
															e.ipx.setAwaitingConnection(!1),
																e.setIpxConnected(n),
																n && (e.player().layers.notyf.success('Connected'), e.closeSideBar());
														})
														.catch(t => {
															e.ipx.setAwaitingConnection(!1), console.error(t), o(t.message);
														}));
										})();
								};
							return (0, g.html)(
								d ||
									(d = m([
										'\n            <div class="font-bold">IPX:</div>\n            <div class="font-bold text-gray-400 text-xs break-all -mx-6 text-center">',
										'</div>\n            <div class=""></div>\n            <div class="',
										'\n                cursor-pointer rounded uppercase text-center px-2 py-1"\n                onClick=',
										'>',
										'</div>\n            <div class="',
										'"></div>\n            <div class="',
										'\n                bg-gray-200 cursor-pointer rounded uppercase text-center px-4 py-1"\n                onClick=',
										'>Stop</div>\n        ',
									])),
								e.ipx.address,
								e.ipxConnected ? ' bg-red-200' : 'bg-green-200',
								n,
								t,
								e.ipxConnected ? 'hidden' : '',
								e.ipxConnected ? 'hidden' : 'none',
								i
							);
						}
						return e.ipx.awaitingAddress
							? (0, g.html)(
									f ||
										(f = m([
											'\n            <div class="font-bold">IPX:</div>\n            <',
											' />\n            <div class=""></div>\n            <div class="bg-gray-200 cursor-pointer rounded uppercase text-center px-4 py-1" onClick=',
											'>Stop</div>\n        ',
										])),
									j,
									i
								)
							: (0, g.html)(
									p ||
										(p = m([
											'\n        <div class="font-bold">IPX:</div>\n        <div class="bg-green-200 cursor-pointer rounded uppercase text-center px-4 py-1" onClick=',
											'>Start</div>\n    ',
										])),
									function () {
										n(!0),
											(0, w.getObject)(v.startIpx + '?token='.concat(e.networkToken))
												.then(t => {
													n(!1), e.ipx.setArn(t.arn), e.ipx.setAwaitingAddress(!0);
												})
												.catch(e => {
													var t;
													console.error("Can't start ipx", e), o(null !== (t = e.errorCode) && void 0 !== t ? t : e.message), n(!1);
												});
									}
								);
					}
					function j() {
						const [e, t] = (0, y.useState)(30);
						return (
							(0, y.useEffect)(() => {
								if (0 === e) return;
								const n = setTimeout(() => {
									t(e - 1);
								}, 1e3);
								return () => clearTimeout(n);
							}, [e]),
							(0, g.html)(
								h ||
									(h = m([
										'\n        <div class="text-gray-400 flex flex-row">\n            <',
										' class="w-6 h-6 animate-reverse-spin mr-2" />\n            ',
										'\n        </div>\n    ',
									])),
								b.Icons.Refresh,
								e > 0 ? e + ' sec' : ''
							)
						);
					}
					n.TokenConfiguration = function (e) {
						const [t, n] = (0, y.useState)(null),
							[l, c] = (0, y.useState)(!0),
							[u, d] = (0, y.useState)(Date.now()),
							[f, p] = (0, y.useState)(null),
							[h, w] = (0, y.useState)(null),
							[j, S] = (0, y.useState)(!1),
							[D, O] = (0, y.useState)(!1),
							P = { arn: f, setArn: p, address: h, setAddress: w, awaitingAddress: j, setAwaitingAddress: S, awaitingConnection: D, setAwaitingConnection: O },
							B = { ...e, ipx: P, update: M };
						async function M() {
							if ((p(null), w(null), S(!1), c(!0), null === e.networkToken)) return n(null), void c(!1);
							(0, _.request)(v.tokeInfoGetEndpoint + '?token='.concat(e.networkToken))
								.then(e => {
									n(e),
										c(!1),
										d(Date.now() + 1e3 * e.ttlSec),
										void 0 !== e.ipxArn && p(e.ipxArn),
										void 0 !== e.ipxAddress ? w(e.ipxAddress) : void 0 !== e.ipxArn && S(!0);
								})
								.catch(t => {
									console.error("Can't get a token", e.networkToken, t), n(null), c(!1);
								});
						}
						if (
							((0, y.useEffect)(() => {
								M();
							}, [e.networkToken]),
							(0, y.useEffect)(() => {
								if (null === e.networkToken || u < Date.now()) return;
								const t = setInterval(() => {
									(0, _.request)(v.tokeInfoGetEndpoint + '?token='.concat(e.networkToken)).then(e => {
										e.ipxArn || (e.ipxArn = null), e.ipxAddress || (e.ipxAddress = null), f === e.ipxArn ? e.ipxAddress !== h && (w(e.ipxAddress), S(!1)) : M();
									});
								}, 5e3);
								return () => {
									clearInterval(t);
								};
							}, [e.networkToken, u, f, h]),
							l)
						)
							return (0, g.html)(
								r ||
									(r = m([
										'\n            <div class="sidebar-header">Configuration</div>\n            <div class="grid grid-cols-2 gap-4">\n                <',
										' class="w-6 h-6 animate-reverse-spin" />\n            </div>\n    ',
									])),
								b.Icons.Refresh
							);
						if (null === t)
							return (0, g.html)(
								o ||
									(o = m([
										'\n            <div class="sidebar-header">Configuration</div>\n            <div class="grid grid-cols-2 gap-4">\n                <',
										' ...',
										' networkToken=',
										' />\n            </div>\n        ',
									])),
								x.TokenSelect,
								e,
								null
							);
						const I = (0, g.html)(
							i ||
								(i = m([
									'\n        <div class="sidebar-header flex flex-row justify-center items-center">\n            Configuration\n            <div onClick=',
									' >\n                <',
									' class="h-4 w-4 ml-2 cursor-pointer" />\n            </div>\n        </div>\n    ',
								])),
							M,
							b.Icons.Refresh
						);
						return u < Date.now()
							? (0, g.html)(
									s ||
										(s = m([
											'\n            ',
											'\n            <div class="grid grid-cols-2 gap-4">\n                <',
											' ...',
											' />\n                <div class="font-bold">Region:</div>\n                <div class="text-gray-400">',
											'</div>\n                <div class="font-bold">TTL:</div>\n                <div class="text-red-400">0 Min</div>\n                <',
											' ...',
											' />\n            </div>\n        ',
										])),
									I,
									x.TokenSelect,
									e,
									t.region,
									k.TokenAddTime,
									B
								)
							: (0, g.html)(
									a ||
										(a = m([
											'\n        ',
											'\n        <div class="grid grid-cols-2 gap-4">\n            <',
											' ...',
											' />\n            <div class="font-bold">Region:</div>\n            <div class="text-gray-400">',
											'</div>\n            <',
											' endTime=',
											' update=',
											' />\n            <',
											' ...',
											' />\n            <',
											' ...',
											' />\n        </div>\n    ',
										])),
									I,
									x.TokenSelect,
									e,
									t.region,
									C,
									u,
									M,
									k.TokenAddTime,
									B,
									E,
									B
								);
					};
				},
				{
					'../../../backend/v7/v7-config': 129,
					'../../../dom': 151,
					'../../../icons': 153,
					'../../../request': 156,
					'../../../xhr': 157,
					'./token-add-time': 144,
					'./token-select': 145,
					'core-js/modules/es.string.replace.js': 117,
					'core-js/modules/web.dom-collections.iterator.js': 118,
					'preact/hooks': 126,
				},
			],
			147: [
				function (e, t, n) {
					'use strict';
					var r;
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.SyncMouseControl = void 0);
					const o = e('../dom'),
						i = e('../icons');
					n.SyncMouseControl = function (e) {
						var t, n;
						if (!e.autolock)
							return (0, o.html)(
								r ||
									((t = [
										'\n        <div class="flex flex-col items-center bg-gray-200 my-2 py-2 rounded">\n            <div class="text-gray-400 h-6 w-4 border-b border-gray-400">\n                <',
										' class="h-4 w-4" />\n            </div>\n            <div class="cursor-pointer h-6 w-6 mt-2" onClick=',
										'>\n                <',
										' class="h-6 w-6" />\n            </div>\n        </div>\n    ',
									]),
									n || (n = t.slice(0)),
									(r = Object.freeze(Object.defineProperties(t, { raw: { value: Object.freeze(n) } })))),
								i.Icons.Cursor,
								function (t) {
									var n;
									null === (n = e.player().ciPromise) ||
										void 0 === n ||
										n.then(e => {
											e.sendMouseSync();
										}),
										t.stopPropagation(),
										t.preventDefault();
								},
								i.Icons.Refresh
							);
					};
				},
				{ '../dom': 151, '../icons': 153 },
			],
			148: [
				function (e, t, n) {
					'use strict';
					var r, o, i, s, a, l, c, u;
					function d(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.Tips = void 0);
					const f = e('preact/hooks'),
						p = e('../dom'),
						h = e('../icons'),
						m = {
							mouseLockMobile: {
								title: 'Mouse lock',
								tip: (0, p.html)(
									r ||
										(r = d([
											'\n        <div>\n            <div class="flex flex-col">\n                <p class=""> \n                    <strong>This game is controlled by gestures.</strong>\n                </p>\n                <p class="pt-2">\n                    When you tap on the screen, the DOS game will receive click events without\n                    mouse coordinates. <b>The click will be simulated in place where game cursor \n                    is, without moving it.</b>\n                </p>\n                <p class="pt-2">\n                    <strong>To move the game cursor</strong>, you need to put your finger on the screen and move it in\n                    the wanted direction until the game cursor reaches the desired position. After that,\n                    you can release your finger.\n                </p>\n                <p class="pt-2">\n                    You can <strong>change sensitivity</strong> of the mouse inside the\n                    submenu of icon <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />.\n                </p>\n            </div>\n        </div>\n        ',
										])),
									h.Icons.CursorClick
								),
							},
							mouseLockDesktop: {
								title: 'Mouse lock',
								tip: (0, p.html)(
									o ||
										(o = d([
											'\n        <div>\n            <div class="flex flex-col">\n                <p class=""> \n                    <strong>The game will lock the browser cursor.</strong>\n                </p>\n                <p class="pt-2">\n                    When the mouse is locked, the DOS game exclusively controls the mouse and\n                    the cursor can\'t leave the game screen. \n                </p>\n                <p class="pt-2">\n                    You can <strong>change sensitivity</strong> of the mouse inside the\n                    submenu of icon <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />.\n                </p>\n                <p class="pt-2">\n                    To exit from lock mode, please use the <strong>Escape</strong> key.\n                </p>\n            </div>\n        </div>\n        ',
										])),
									h.Icons.CursorClick
								),
							},
							lockSwitch: {
								title: 'Mouse Locking',
								tip: (0, p.html)(
									i ||
										(i = d([
											'\n        <div class="flex flex-col">\n            <p class="">\n                By clicking on the pointer icon, you can switch between <b>regular mouse emulation</b> and \n                <b>lock mode</b>.\n            </p>\n            <div class="mt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    - In regular mouse emulation mode, the game will receive\n                    browser pointer coordinates. If the browser pointer and game pointer are out of sync, use the\n                </p>\n                <',
											' class="h-4 w-4 text-green-600 mx-2 inline-block" />\n                <p class="inline">\n                    refresh control to synchronize DOS and browser pointer position.\n                </p>\n            </div>\n            <div class="mt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    - lock mouse emulation mode.\n                </p>\n            </div>\n            <div class="mt-2">\n                <strong>On desktop</strong>, the DOS game exclusively controls the mouse and\n                the cursor can\'t leave the game screen.\n            </div>\n            <div class="mt-2">\n                <strong>On mobile</strong>, the DOS game will be controlled by gestures.\n            </div>\n        </div>\n        ',
										])),
									h.Icons.Cursor,
									h.Icons.Refresh,
									h.Icons.CursorClick
								),
							},
							mobile: {
								title: 'Mobile Controls',
								tip: (0, p.html)(
									s ||
										(s = d([
											'\n        <div class="flex flex-col">\n            <p>\n                You can change the visibility of mobile controls by pressing one of these buttons:\n            </p>\n            <div class="pt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  shows the mobile controls if they are provided by the game.\n                </p>\n            </div>\n            <div class="pt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  shows the mobile controls but <strong>mirrored</strong>.\n                </p>\n            </div>\n            <div class="pt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  completely hide the mobile controls.\n                </p>\n            </div>\n            <p class="pt-2">\n                You can <b>change size</b> of mobile controls inside the submenu.\n            </p>\n        </div>\n        ',
										])),
									h.Icons.Mobile,
									h.Icons.SwithcHorizontal,
									h.Icons.EyeOff
								),
							},
							sidebar: {
								title: 'Sidebar',
								tip: (0, p.html)(
									a ||
										(a = d([
											'\n        <div class="flex flex-col">\n            <div>\n                On the left side of the screen, you will see a sidebar; it has a set of useful controls.\n                You can hide it at any time by pressing on the arrow in the middle.\n            </div>\n            <div class="pt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  pause/resume game,\n                </p>\n            </div>\n            <div class="pt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  mute/unmute sound,\n                </p>\n            </div>\n            <div class="pt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  toggle soft keyboard,\n                </p>\n            </div>\n            <div class="pt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  toggle fullscreen,\n                </p>\n            </div>\n            <div class="pt-2">\n                <',
											' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  will open the settings sidebar, where you can change additional\n                    settings of js-dos, like networking.\n                </p>\n            </div>\n        </div>\n        ',
										])),
									h.Icons.Pause,
									h.Icons.VolumeUp,
									h.Icons.PencilAlt,
									h.Icons.ArrowsExpand,
									h.Icons.DotsHorizontal
								),
							},
							saveLoad: {
								title: 'Save/Load',
								tip: (0, p.html)(
									l ||
										(l = d([
											'\n        <div>\n            <div class="flex flex-col">\n                <p class=""> \n                    js-dos supports saving and restoring game progress. You can play a game from time to time \n                    without losing progress. This works automatically or by pressing the\n                    <',
											' class="h-4 w-4 text-green-600 mx-1 -mt-1 inline-block" />\n                    icon.\n                </p>\n                <p class="pt-2">\n                    However, it works only if the DOS game itself supports save and load commands.\n                    <strong> You need to save your progress in the DOS game before stopping the emulator.</strong>\n                </p>\n            </div>\n        </div>\n        ',
										])),
									h.Icons.FloppyDisk
								),
							},
						},
						y = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())
							? ['mouseLockMobile', 'mobile', 'sidebar', 'saveLoad', 'lockSwitch']
							: ['mouseLockDesktop', 'sidebar', 'saveLoad', 'lockSwitch'];
					n.Tips = function (e) {
						const t = e.showTips,
							[n, r] = (0, f.useState)(0);
						if (
							((0, f.useEffect)(() => {
								t && r(e.player().autolock ? 0 : 1);
							}, [t]),
							!t)
						)
							return null;
						const o = m[y[n]],
							i = n === y.length - 1;
						return (0, p.html)(
							c ||
								(c = d([
									'\n    <div class="absolute bg-gray-500 bg-opacity-80 left-0 top-0 right-0 bottom-0 \n        flex flex-col items-center justify-center z-50">\n        <div class="rounded bg-gray-200 shadow-lg w-3/4 sm:w-1/2 p-2 border-b border-gray-800 overflow-auto">\n            <div class="flex row justify-between mb-2">\n                <div class="h-6 w-6 text-gray-400">\n                    <',
									' class="h-6 w-6" />\n                </div>\n                <div class="text-lg font-bold">',
									'</div>\n                <div class="h-6 w-6 cursor-pointer" onClick=',
									'>\n                    <',
									' class="h-6 w-6" />\n                </div>\n            </div>\n            <div class="text-sm px-2 overflow-hidden max-h-72">\n                ',
									'\n            </div>\n            <div class="flex flex-row justify-center mt-2" onClick=',
									'>\n                <p class="uppercase cursor-pointer text-blue-900 mr-2">',
									'</p>\n                ',
									'\n            </div>\n        </div>\n    </div>\n    ',
								])),
							h.Icons.InformationCircle,
							o.title,
							() => e.setShowTips(!1),
							h.Icons.XCircle,
							o.tip,
							function (t) {
								i ? e.setShowTips(!1) : r((n + 1) % y.length), t.stopPropagation(), t.preventDefault();
							},
							i ? 'Close' : 'Next',
							!i &&
								(0, p.html)(
									u ||
										(u = d([
											'\n                    <div class="h-6 w-6 cursor-pointer text-blue-900">\n                        <',
											' class="h-6 w-6" />\n                    </div>',
										])),
									h.Icons.ArrowsCircleRight
								)
						);
					};
				},
				{ '../dom': 151, '../icons': 153, 'core-js/modules/web.dom-collections.iterator.js': 118, 'preact/hooks': 126 },
			],
			149: [
				function (e, t, n) {
					'use strict';
					var r;
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.VerticalSlider = void 0);
					const o = e('preact/hooks'),
						i = e('../dom');
					n.VerticalSlider = function (e) {
						const { minValue: t, maxValue: n, initialValue: s, onChange: a, icon: l } = e,
							c = n - t,
							u = (0, o.useRef)(null),
							[d, f] = (0, o.useState)(s),
							[p, h] = (0, o.useState)(0);
						(0, o.useEffect)(() => {
							if (null === u || null === u.current) return;
							let t = !1;
							const n = u.current,
								r = e => {
									const t = n.getBoundingClientRect(),
										r = 1 - (e.clientY - t.top) / t.height;
									return Math.max(Math.min(1, r), 0) * c;
								},
								o = e => {
									e.target !== n || t || ((t = !0), h(80), f(r(e)), e.stopPropagation(), e.preventDefault());
								},
								i = e => {
									if (!t) return;
									const n = r(e);
									f(n), a(n), e.stopPropagation(), e.preventDefault();
								},
								s = e => {
									if (!t) return;
									(t = !1), h(0);
									const n = r(e);
									f(n), a(n), e.stopPropagation(), e.preventDefault();
								};
							return (
								window.addEventListener('pointerdown', o),
								window.addEventListener('pointermove', i),
								window.addEventListener('pointerup', s),
								window.addEventListener('pointercancel', s),
								n.addEventListener('pointerup', s),
								n.addEventListener('pointercancel', s),
								e.registerListner(f),
								() => {
									e.removeListener(f),
										window.removeEventListener('pointerdown', o),
										window.removeEventListener('pointermove', i),
										window.removeEventListener('pointerup', s),
										window.removeEventListener('pointercancel', s),
										n.removeEventListener('pointerup', s),
										n.removeEventListener('pointercancel', s);
								}
							);
						}, [u]);
						const m = 100 - Math.max(0, Math.min(100, Math.round((d / c) * 100))) + '%';
						return (0, i.html)(
							r ||
								((y = [
									'\n        <div class="h-full flex flex-col py-0 items-center">\n            <div class="bg-gray-200 rounded flex items-center justify-center h-6 w-5 mt-4 text-gray-600">\n                <',
									' class="h-4 w-4" />\n            </div>\n            <div class="cursor-pointer flex-grow py-4 px-2" ref=',
									'>\n                <div class=',
									'>\n                    <div class="flex flex-row items-center absolute -mt-3" style=',
									'>\n                        <div class="bg-gray-600 -ml-2 flex-shrink-0 w-6 h-6 rounded-full"></div>\n                        <div class="bg-green-100 ml-2 py-1 px-2 rounded z-50 ',
									'">\n                            ',
									'\n                        </div>\n                    </div>    \n                </div>\n            </div>\n        </div>\n    ',
								]),
								v || (v = y.slice(0)),
								(r = Object.freeze(Object.defineProperties(y, { raw: { value: Object.freeze(v) } })))),
							l,
							u,
							'pointer-events-none relative sensitivity rounded-2xl bg-gray-400 w-2 h-full' + (e.class ? e.class : ''),
							{ top: m },
							'opacity-' + p,
							Math.round(10 * (t + d)) / 10
						);
						var y, v;
					};
				},
				{ '../dom': 151, 'core-js/modules/web.dom-collections.iterator.js': 118, 'preact/hooks': 126 },
			],
			150: [
				function (e, t, n) {
					'use strict';
					var r, o;
					function i(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.SideBarVolumeControl = n.ActionBarVolumeControl = void 0);
					const s = e('../dom'),
						a = e('../icons'),
						l = e('./vertical-slider'),
						c = e('./horizontal-slider');
					(n.ActionBarVolumeControl = function (e) {
						return e.mobileControls || e.mirroredControls
							? null
							: (0, s.html)(
									r ||
										(r = i([
											'\n        <',
											' minValue=',
											' maxValue=',
											'\n            initialValue=',
											' \n            onChange=',
											'\n            icon=',
											'\n            registerListner=',
											'\n            removeListener=',
											'\n            />\n    ',
										])),
									l.VerticalSlider,
									0,
									1,
									e.player().volume,
									t => e.player().setVolume(t),
									a.Icons.VolumeUp,
									e.player().registerOnVolumeChanged,
									e.player().removeOnVolumeChanged
								);
					}),
						(n.SideBarVolumeControl = function (e) {
							return (0, s.html)(
								o ||
									(o = i([
										'\n        <',
										' minValue=',
										' maxValue=',
										'\n            initialValue=',
										' \n            onChange=',
										'\n            icon=',
										'\n            registerListner=',
										'\n            removeListener=',
										'\n            />\n    ',
									])),
								c.HorizontalSlider,
								0,
								1,
								e.player().volume,
								t => e.player().setVolume(t),
								a.Icons.VolumeUp,
								e.player().registerOnVolumeChanged,
								e.player().removeOnVolumeChanged
							);
						});
				},
				{ '../dom': 151, '../icons': 153, './horizontal-slider': 136, './vertical-slider': 149 },
			],
			151: [
				function (e, t, n) {
					'use strict';
					e('core-js/modules/web.dom-collections.iterator.js'), e('core-js/modules/web.url.js'), e('core-js/modules/web.url-search-params.js');
					var r = function (e) {
						return e && e.__esModule ? e : { default: e };
					};
					Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.downloadFile = n.click = n.createDiv = n.activeClass = n.primaryClass = n.disabledClass = n.goneClass = n.html = void 0);
					const o = e('preact'),
						i = r(e('htm'));
					(n.html = i.default.bind(o.h)),
						(n.goneClass = 'jsdos-player-gone'),
						(n.disabledClass = 'jsdos-player-button-disabled'),
						(n.primaryClass = 'jsdos-player-button-primary'),
						(n.activeClass = 'jsdos-player-button-active'),
						(n.createDiv = function (e, t) {
							const n = document.createElement('div');
							if ('string' == typeof e) n.className = e;
							else for (const t of e) n.classList.add(t);
							return void 0 !== t && (n.innerHTML = t), n;
						}),
						(n.click = function (e, t) {
							for (const n of emulatorsUi.dom.pointers.bind.enders)
								e.addEventListener(n, () => {
									e.classList.contains('jsdos-player-button-disabled') || t(e);
								});
						});
					let s = null;
					n.downloadFile = function (e, t, n) {
						const r = new Blob([e], { type: n });
						null !== s && window.URL.revokeObjectURL(s), (s = window.URL.createObjectURL(r));
						const o = document.createElement('a');
						(o.href = s), (o.download = t), (o.style.display = 'none'), document.body.appendChild(o), o.click(), o.remove();
					};
				},
				{
					'core-js/modules/web.dom-collections.iterator.js': 118,
					'core-js/modules/web.url-search-params.js': 120,
					'core-js/modules/web.url.js': 122,
					htm: 123,
					preact: 125,
				},
			],
			152: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n) {
						return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
					}
					e('core-js/modules/es.string.replace.js');
					var o = Object.create
							? function (e, t, n, r) {
									void 0 === r && (r = n);
									var o = Object.getOwnPropertyDescriptor(t, n);
									(o && !('get' in o ? !t.__esModule : o.writable || o.configurable)) ||
										(o = {
											enumerable: !0,
											get: function () {
												return t[n];
											},
										}),
										Object.defineProperty(e, r, o);
								}
							: function (e, t, n, r) {
									void 0 === r && (r = n), (e[r] = t[n]);
								},
						i = Object.create
							? function (e, t) {
									Object.defineProperty(e, 'default', { enumerable: !0, value: t });
								}
							: function (e, t) {
									e.default = t;
								},
						s = function (e) {
							if (e && e.__esModule) return e;
							var t = {};
							if (null != e) for (var n in e) 'default' !== n && Object.prototype.hasOwnProperty.call(e, n) && o(t, e, n);
							return i(t, e), t;
						};
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.hardwareTransportLayerFactory = n.HardwareTransportLayerFactory = void 0);
					const a = s(e('base64-js')),
						l = new TextDecoder();
					class c {
						constructor(e) {
							r(this, 'sessionId', Date.now() + ''),
								r(this, 'hardware', void 0),
								r(this, 'alive', !0),
								r(this, 'frameWidth', 0),
								r(this, 'frameHeight', 0),
								r(this, 'handler', () => {}),
								(this.hardware = e);
						}
						callMain() {
							this.hardware.sendMessage('wc-install\n' + this.sessionId + '\n'), requestAnimationFrame(this.update.bind(this));
						}
						async sendMessageToServer(e, t) {
							if (void 0 !== t && (null == t ? void 0 : t.sessionId) === this.sessionId)
								switch (e) {
									case 'wc-run':
										{
											let e = d(this.hardware, 'bundle_0.zip', t.bundles[0]);
											if (e.length > 0) throw (console.error(e), new Error(e));
											if (void 0 !== t.bundles[1] && ((e = d(this.hardware, 'bundle_1.zip', t.bundles[1])), e.length > 0))
												throw (console.error(e), new Error(e));
											const n = 'wc-run\n';
											this.hardware.sendMessage(n);
										}
										break;
									case 'wc-add-key':
										this.hardware.addKey(t.key, t.pressed ? 1 : 0, t.timeMs);
										break;
									case 'wc-pause':
										this.hardware.sendMessage('wc-pause\n' + this.sessionId + '\n');
										break;
									case 'wc-resume':
										this.hardware.sendMessage('wc-resume\n' + this.sessionId + '\n');
										break;
									case 'wc-mute':
										this.hardware.sendMessage('wc-mute\n' + this.sessionId + '\n');
										break;
									case 'wc-unmute':
										this.hardware.sendMessage('wc-unmute\n' + this.sessionId + '\n');
										break;
									case 'wc-exit':
										(this.alive = !1), this.hardware.sendMessage('wc-exit\n' + this.sessionId + '\n');
										break;
									case 'wc-mouse-move':
										this.hardware.mouseMove(t.x, t.y, t.relative, t.timeMs);
										break;
									case 'wc-mouse-button':
										this.hardware.mouseButton(t.button, t.pressed ? 1 : 0, t.timeMs);
										break;
									case 'wc-pack-fs-to-bundle':
										this.hardware.sendMessage('wc-pack-fs-to-bundle\n' + this.sessionId + '\n');
										break;
									case 'wc-connect':
										this.hardware.sendMessage(
											'wc-connect\n' +
												this.sessionId +
												'\n' +
												t.networkType +
												'\n' +
												t.address.replace('ws://', '').replace('wss://', '') +
												'\n' +
												(t.port - 1) +
												'\n'
										);
										break;
									case 'wc-disconnect':
										this.hardware.sendMessage('wc-disconnect\n' + this.sessionId + '\n' + t.networkType + '\n');
										break;
									default:
										console.log('Unhandled client message (wc):', e, t);
								}
						}
						initMessageHandler(e) {
							this.handler = e;
						}
						exit() {
							this.alive = !1;
						}
						async onServerMessage(e, t) {
							const n = t || {};
							switch (e) {
								case 'ws-server-ready':
									{
										const e = this.hardware.readConfig();
										this.handler('ws-config', { sessionId: this.sessionId, content: e });
									}
									break;
								case 'ws-sound-init':
									this.handler(e, n), this.handler('ws-server-ready', { sessionId: this.sessionId });
									break;
								case 'ws-frame-set-size':
									(this.frameWidth = n.width), (this.frameHeight = n.height), this.handler(e, n);
									break;
								case 'ws-sound-push':
								case 'ws-update-lines':
								default:
									this.handler(e, n);
									break;
								case 'ws-persist':
									(n.bundle = f(n.bundle)), this.handler(e, n);
									break;
								case 'ws-log':
								case 'ws-warn':
								case 'ws-err':
								case 'ws-stdout':
									void 0 !== n.message && null !== n.message && n.message.length > 0 && (n.message = l.decode(f(n.message))), this.handler(e, n);
							}
						}
						update() {
							this.alive && requestAnimationFrame(this.update.bind(this)), this.updateFrame();
						}
						updateFrame() {
							if (0 === this.frameWidth || 0 === this.frameHeight) return;
							const e = this.hardware.getFramePayload();
							if (0 === e.length) return;
							const t = f(e);
							if (0 === t.length) return;
							const n = [],
								r = 3 * this.frameWidth;
							let o = this.frameHeight,
								i = -1;
							for (let e = 0; e < this.frameHeight; ++e) {
								const s = e === this.frameHeight - 1;
								if (1 === t[e] && -1 === i) i = e;
								else if ((s || 0 === t[e]) && -1 !== i) {
									const s = ((1 === t[e] ? e : e - 1) - i + 1) * r,
										a = t.slice(o, o + s);
									n.push({ start: i, heapu8: a }), (o += s), (i = -1);
								}
							}
							this.handler('ws-update-lines', { sessionId: this.sessionId, lines: n });
						}
					}
					class u {
						constructor() {
							r(this, 'serverMessageHandler', () => {}),
								(window.serverMessage = e => {
									if ('string' == typeof e) {
										const t = '{' + l.decode(f(e)).slice(0, -1) + '}';
										try {
											const e = JSON.parse(t);
											this.serverMessageHandler(e.name, e);
										} catch (e) {
											throw (console.error("Can't parse", t, e), e);
										}
									} else this.serverMessageHandler(e.name, e);
								}),
								(this.createTransportLayer = this.createTransportLayer.bind(this));
						}
						createTransportLayer(e) {
							const t = new c(e);
							return (this.serverMessageHandler = t.onServerMessage.bind(t)), t.callMain(), t;
						}
					}
					function d(e, t, n) {
						if (void 0 !== e.writeFile) return e.writeFile(t, p(n));
						let r = e.createFile(t);
						if (r.length > 0) return r;
						let o = 0;
						for (; o < n.length; ) {
							const t = Math.min(4194304, n.length - o),
								i = n.subarray(o, o + t);
							if (((r = e.appendFile(p(i))), r.length > 0)) return r;
							o += t;
						}
						return (r = e.closeFile()), r;
					}
					function f(e) {
						return a.toByteArray(e);
					}
					function p(e) {
						return a.fromByteArray(e);
					}
					(n.HardwareTransportLayerFactory = u), (n.hardwareTransportLayerFactory = new u());
				},
				{ 'base64-js': 1, 'core-js/modules/es.string.replace.js': 117 },
			],
			153: [
				function (e, t, n) {
					'use strict';
					var r, o, i, s, a, l, c, u, d, f, p, h, m, y, v, g, b, w, _, x, k, C, E, j, S, D, O, P, B, M, I;
					function A(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.Icons = void 0);
					const T = e('./dom');
					n.Icons = {
						XCircle: e =>
							(0, T.html)(
								r ||
									(r = A([
										'\n    <svg fill="none" class=',
										' viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n',
									])),
								e.class
							),
						UserCircle: e =>
							(0, T.html)(
								o ||
									(o = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n',
									])),
								e.class
							),
						Mobile: e =>
							(0, T.html)(
								i ||
									(i = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />\n    </svg>\n',
									])),
								e.class
							),
						SwithcHorizontal: e =>
							(0, T.html)(
								s ||
									(s = A([
										'\n    <svg class="',
										'" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />\n    </svg>\n',
									])),
								e.class
							),
						EyeOff: e =>
							(0, T.html)(
								a ||
									(a = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />\n    </svg>\n',
									])),
								e.class
							),
						Pause: e =>
							(0, T.html)(
								l ||
									(l = A([
										'\n    <svg className=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}\n            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n',
									])),
								e.class
							),
						Play: e =>
							(0, T.html)(
								c ||
									(c = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n',
									])),
								e.class
							),
						VolumeUp: e =>
							(0, T.html)(
								u ||
									(u = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />\n    </svg>\n',
									])),
								e.class
							),
						VolumeOff: e =>
							(0, T.html)(
								d ||
									(d = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"\n            clip-rule="evenodd" />\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />\n    </svg>\n',
									])),
								e.class
							),
						PencilAlt: e =>
							(0, T.html)(
								f ||
									(f = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />\n    </svg>\n',
									])),
								e.class
							),
						ArrowsExpand: e =>
							(0, T.html)(
								g ||
									(g = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />\n    </svg>\n',
									])),
								e.class
							),
						ArrowsCircleLeft: e =>
							(0, T.html)(
								b ||
									(b = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />\n    </svg>\n',
									])),
								e.class
							),
						ArrowsCircleRight: e =>
							(0, T.html)(
								w ||
									(w = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}\n            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n',
									])),
								e.class
							),
						ChevronLeft: e =>
							(0, T.html)(
								p ||
									(p = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />\n    </svg>\n',
									])),
								e.class
							),
						ChevronRight: e =>
							(0, T.html)(
								h ||
									(h = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />\n    </svg>\n',
									])),
								e.class
							),
						DotsHorizontal: e =>
							(0, T.html)(
								m ||
									(m = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />\n    </svg>\n',
									])),
								e.class
							),
						Download: e =>
							(0, T.html)(
								y ||
									(y = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />\n    </svg>\n',
									])),
								e.class
							),
						Upload: e =>
							(0, T.html)(
								v ||
									(v = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />\n    </svg>\n',
									])),
								e.class
							),
						Plus: e =>
							(0, T.html)(
								_ ||
									(_ = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />\n    </svg>\n',
									])),
								e.class
							),
						CursorClick: e =>
							(0, T.html)(
								x ||
									(x = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />\n    </svg>\n',
									])),
								e.class
							),
						Cursor: e =>
							(0, T.html)(
								k ||
									(k = A([
										'\n    <svg class=',
										' fill="currentColor" viewBox="0 0 24 24">\n        <path\n            d="M 7 2 L 7 18.5 L 11.09375 14.605469 L 14.300781 22 L 16.5 21 L 13.195312 13.701172 L 13.199219 13.699219 L 19 13.199219 L 7 2 z M 9 6.6015625 L 14.347656 11.59375 L 13.029297 11.707031 L 12.708984 11.734375 L 12.412109 11.861328 L 10.3125 12.761719 L 9.9824219 12.904297 L 9.7226562 13.152344 L 9 13.837891 L 9 6.6015625 z" />\n    </svg>\n',
									])),
								e.class
							),
						Refresh: e =>
							(0, T.html)(
								C ||
									(C = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />\n    </svg>\n',
									])),
								e.class
							),
						CurrencyDollar: e =>
							(0, T.html)(
								E ||
									(E = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n',
									])),
								e.class
							),
						QuestionMarkCircle: e =>
							(0, T.html)(
								j ||
									(j = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n',
									])),
								e.class
							),
						Discord: e =>
							(0, T.html)(
								S ||
									(S = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 245 240" stroke="currentColor">\n        <style>.st0{fill:#5c7080;}</style>\n        <path class="st0" d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/><path class="st0" d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/>\n    </svg>\n',
									])),
								e.class
							),
						Telegram: e =>
							(0, T.html)(
								O ||
									(O = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 240 240" stroke="currentColor">\n        <defs>\n            <linearGradient id="A" x1="160.01" x2="100.01" y1="40.008" y2="180" gradientUnits="userSpaceOnUse">\n                <stop stop-color="#758599" offset="0"/>\n                <stop stop-color="#556559" offset="1"/>\n            </linearGradient>\n        </defs>\n        <circle fill="url(#A)" r="120" cy="120" cx="120"/><path d="M49.942 118.96l80.81-33.295c7.977-3.468 35.03-14.566 35.03-14.566s12.486-4.855 11.445 6.936c-.347 4.855-3.12 21.85-5.896 40.23l-8.67 54.45s-.694 7.977-6.6 9.364-15.607-4.855-17.34-6.243c-1.387-1.04-26.012-16.647-35.03-24.277-2.428-2.08-5.202-6.243.347-11.098 12.486-11.445 27.4-25.665 36.416-34.682 4.162-4.162 8.324-13.873-9.017-2.08l-48.902 32.948s-5.55 3.468-15.954.347-22.543-7.283-22.543-7.283-8.324-5.202 5.896-10.75z" fill="#fff"/>\n    </svg>\n',
									])),
								e.class
							),
						Twitter: e =>
							(0, T.html)(
								D ||
									(D = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 400 400" stroke="currentColor">\n        <style type="text/css">\n            .st0{fill:#5c7080;}\n        </style>\n        <path class="st0" d="M400,200c0,110.5-89.5,200-200,200S0,310.5,0,200S89.5,0,200,0S400,89.5,400,200z M163.4,305.5\n            c88.7,0,137.2-73.5,137.2-137.2c0-2.1,0-4.2-0.1-6.2c9.4-6.8,17.6-15.3,24.1-25c-8.6,3.8-17.9,6.4-27.7,7.6\n            c10-6,17.6-15.4,21.2-26.7c-9.3,5.5-19.6,9.5-30.6,11.7c-8.8-9.4-21.3-15.2-35.2-15.2c-26.6,0-48.2,21.6-48.2,48.2\n            c0,3.8,0.4,7.5,1.3,11c-40.1-2-75.6-21.2-99.4-50.4c-4.1,7.1-6.5,15.4-6.5,24.2c0,16.7,8.5,31.5,21.5,40.1c-7.9-0.2-15.3-2.4-21.8-6\n            c0,0.2,0,0.4,0,0.6c0,23.4,16.6,42.8,38.7,47.3c-4,1.1-8.3,1.7-12.7,1.7c-3.1,0-6.1-0.3-9.1-0.9c6.1,19.2,23.9,33.1,45,33.5\n            c-16.5,12.9-37.3,20.6-59.9,20.6c-3.9,0-7.7-0.2-11.5-0.7C110.8,297.5,136.2,305.5,163.4,305.5"/>\n    </svg>\n',
									])),
								e.class
							),
						FloppyDisk: e =>
							(0, T.html)(
								P ||
									(P = A([
										'\n    <svg class=',
										' style="padding-left: 2px; padding-top: 4px" fill="none" viewBox="0 0 20 20" stroke="currentColor">\n        <g id="floppy_disk">\n            <g>\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.71,2.29l-2-2C13.53,0.11,13.28,0,13,0h-1v6H4V0H1C0.45,0,0,0.45,0,1v14\n                    c0,0.55,0.45,1,1,1h14c0.55,0,1-0.45,1-1V3C16,2.72,15.89,2.47,15.71,2.29z M14,15H2V9c0-0.55,0.45-1,1-1h10c0.55,0,1,0.45,1,1V15\n                    z M11,1H9v4h2V1z"/>\n            </g>\n        </g>\n    </svg>\n',
									])),
								e.class
							),
						Online: e =>
							(0, T.html)(
								M ||
									(M = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n        <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />\n    </svg>\n',
									])),
								e.class
							),
						Offline: e =>
							(0, T.html)(
								B ||
									(B = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />\n    </svg>\n',
									])),
								e.class
							),
						InformationCircle: e =>
							(0, T.html)(
								I ||
									(I = A([
										'\n    <svg class=',
										' fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n',
									])),
								e.class
							),
					};
				},
				{ './dom': 151 },
			],
			154: [
				function (e, t, n) {
					'use strict';
					var r, o, i;
					function s(e, t) {
						return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
					}
					e('core-js/modules/web.dom-collections.iterator.js'), Object.defineProperty(n, '__esModule', { value: !0 }), (n.createPlayerApp = n.PlayerApp = void 0);
					const a = e('preact'),
						l = e('preact/hooks'),
						c = e('./dom'),
						u = e('./components/action-hide'),
						d = e('./components/action-bar'),
						f = e('./components/action-save-or-exit'),
						p = e('./components/sidebar'),
						h = e('./components/tip'),
						m = e('nanoid/non-secure'),
						y = e('./components/sensitivity-control'),
						v = e('./components/scale-control'),
						g = e('./components/volume-control'),
						b = e('./components/sync-control'),
						w = 'client.id',
						_ = 'network.token',
						x = 'network.region',
						k = 'ui.tipsV2',
						C = 'ui.autolockTipsV2';
					function E(e) {
						const t = !0 !== e.options().withNetworkingApi,
							n = emulatorsUi.dom.storage,
							i = e.options().clientId,
							a = 'function' == typeof i ? e => i(e) : void 0,
							[E, j] = (0, l.useState)(null),
							[S, D] = (0, l.useState)(!1),
							[O, P] = (0, l.useState)(e.player().mobileControls),
							[B, M] = (0, l.useState)(e.player().mirroredControls),
							[I, A] = (0, l.useState)(e.player().autolock),
							[T, K] = (0, l.useState)(e.player().layers.keyboardVisible),
							[L, R] = (0, l.useState)(!1),
							[N, z] = (0, l.useState)(!1),
							[F, U] = (0, l.useState)(e.player().layers.fullscreen),
							[H, V] = (0, l.useState)(!t),
							[q, W] = (0, l.useState)(n.getItem(x)),
							[G, Y] = (0, l.useState)(null),
							[X, $] = (0, l.useState)(!1),
							[J, Q] = (0, l.useState)(null),
							[Z, ee] = (0, l.useState)('main'),
							[te] = (0, l.useState)(() => {
								const e = n.getItem(w),
									t = null != e ? e : (0, m.nanoid)();
								return null === e && n.setItem(w, t), { namespace: encodeURIComponent('local (' + location.href + ')'), id: t };
							}),
							[ne, re] = (0, l.useState)(n.getItem(_)),
							[oe, ie] = (0, l.useState)(!1);
						(0, l.useEffect)(() => {
							const e = e => {
								var t;
								'jsdos-get-network-token' == e.data.message &&
									(null === (t = e.source) || void 0 === t || t.postMessage({ message: 'jsdos-network-token', token: ne }, '*'));
							};
							return window.addEventListener('message', e), () => window.removeEventListener('message', e);
						}, [ne]),
							(0, l.useEffect)(() => {
								void 0 !== a && a(!1).then(j).catch(console.error);
							}, [i, j]),
							(0, l.useEffect)(
								() => (
									e.setOnRun(() => {
										const t = e.player().autolock,
											r = 'false' !== n.getItem(k),
											o = t && 'false' !== n.getItem(C);
										(r || o) && ae.setShowTips(!0), A(t);
									}),
									() => e.setOnRun(() => {})
								),
								[e.setOnRun]
							),
							(0, l.useEffect)(() => {
								const e = () => {
									const e = null !== document.fullscreenElement;
									U(e), e || V(!0);
								};
								return (
									document.addEventListener('fullscreenchange', e),
									() => {
										document.removeEventListener('fullscreenchange', e);
									}
								);
							}, [F, U]);
						const se = t => {
								var n;
								null === (n = e.player().ciPromise) ||
									void 0 === n ||
									n
										.then(e => {
											t ? e.pause() : e.resume(), R(t);
										})
										.catch(console.error);
							},
							ae = {
								player: e.player,
								options: e.options,
								clientId: E,
								setClientId: j,
								requestClientId: a,
								anonymousClientId: te,
								networkToken: ne,
								setNetworkToken: e => {
									null === e ? n.removeItem(_) : n.setItem(_, e), re(e);
								},
								mobileControls: O,
								setMobileControls: async t => {
									t ? e.player().enableMobileControls() : e.player().disableMobileControls(), P(t);
								},
								mirroredControls: B,
								setMirroredControls: async e => {
									ae.player().setMirroredControls(e), M(e);
								},
								autolock: I,
								setAutolock: async e => {
									ae.player().setAutolock(e), A(e);
								},
								keyboard: T,
								toggleKeyboard: () => {
									K(!e.player().layers.keyboardVisible), e.player().layers.toggleKeyboard();
								},
								fullscreen: F,
								toggleFullscreen: () => {
									e.player().layers.toggleFullscreen();
								},
								pause: L,
								setPause: se,
								mute: N,
								setMute: t => {
									var n;
									null === (n = e.player().ciPromise) ||
										void 0 === n ||
										n
											.then(e => {
												t ? e.mute() : e.unmute(), z(t);
											})
											.catch(console.error);
								},
								actionBar: H,
								setActionBar: V,
								sideBar: S,
								openSideBar: () => D(!0),
								closeSideBar: () => D(!1),
								region: q,
								setRegion: function (e) {
									e !== q && (null !== e && n.setItem(x, e), W(e), Y(null));
								},
								estimatingRegion: G,
								setEstimatingRegion: Y,
								showTips: X,
								setShowTips: t => {
									n.setItem(k, t + ''),
										ae.player().autolock && n.setItem(C, t + ''),
										setTimeout(() => {
											se(t), $(t), t && 'hidden' !== e.options().style && V(!0);
										}, 500);
								},
								latencyInfo: J,
								setLatencyInfo: Q,
								sideBarPage: Z,
								setSideBarPage: ee,
								ipxConnected: oe,
								setIpxConnected: ie,
							};
						return !1 === ae.actionBar
							? (0, c.html)(
									r ||
										(r = s([
											'<div>\n            <',
											' ...',
											' class="absolute left-0 top-0 rounded-br-md z-50 w-8 h-8" />\n            <',
											' ...',
											' class="absolute left-0 opacity-80 top-1/2 z-50 -mt-6" />\n        </div>',
										])),
									f.ActionSaveOrExit,
									ae,
									u.ActionHide,
									ae
								)
							: (0, c.html)(
									o ||
										(o = s([
											'\n    <div class="h-full flex flex-row">\n        <',
											' ...',
											' />\n        <',
											' ...',
											' />\n        <div class="h-full">\n            <',
											' ...',
											' />\n        </div>\n        <div class="bg-gray-300 w-8 h-full flex flex-col items-center">\n            <div class="flex-grow flex flex-col items-center">\n                <',
											' ...',
											' class="rounded mt-1" />\n                <',
											' ...',
											' />\n                <',
											' ...',
											' />\n            </div>\n            <',
											' ...',
											' class="self-start" />\n            <div class="flex-grow">\n                <',
											' ...',
											' />\n                <',
											' ...',
											' />\n            </div>\n        </div>\n    </div>\n    ',
										])),
									p.SideBar,
									ae,
									h.Tips,
									ae,
									d.ActionBar,
									ae,
									f.ActionSaveOrExit,
									ae,
									b.SyncMouseControl,
									ae,
									y.ActionBarSensitivityControl,
									ae,
									u.ActionHide,
									ae,
									v.ActionBarScaleControl,
									ae,
									g.ActionBarVolumeControl,
									ae
								);
					}
					(n.PlayerApp = E),
						(n.createPlayerApp = function (e, t, n, r) {
							(0, a.render)(
								(0, c.html)(
									i || (i = s(['<', ' player=', ' options=', ' setOnRun=', ' />'])),
									E,
									() => t,
									() => n,
									r
								),
								e
							);
						});
				},
				{
					'./components/action-bar': 130,
					'./components/action-hide': 131,
					'./components/action-save-or-exit': 132,
					'./components/scale-control': 138,
					'./components/sensitivity-control': 139,
					'./components/sidebar': 140,
					'./components/sync-control': 147,
					'./components/tip': 148,
					'./components/volume-control': 150,
					'./dom': 151,
					'core-js/modules/web.dom-collections.iterator.js': 118,
					'nanoid/non-secure': 124,
					preact: 125,
					'preact/hooks': 126,
				},
			],
			155: [
				function (e, t, n) {
					'use strict';
					Object.defineProperty(n, '__esModule', { value: !0 }), (n.DosPlayer = void 0);
					const r = e('./dom'),
						o = e('./hardware-transport-layer'),
						i = e('./backend/v7/personal'),
						s = e('./player-app'),
						a = Dos;
					function l(e, t) {
						const n = t || {};
						if (
							(void 0 === n.windowOpen &&
								('object' == typeof window
									? (n.windowOpen = window.open.bind(window))
									: (n.windowOpen = () => {
											throw new Error('window.open is not defined');
										})),
							'none' === n.style)
						)
							return console.warn("If you don't need the jsdos services, please use emulatros + emulators-ui instead"), a(e, n);
						e.classList.add('flex'), e.classList.add('flex-row'), e.classList.add('relative'), e.classList.add('overflow-hidden');
						const l = (0, r.createDiv)([
								'hidden',
								'flex-col',
								'absolute',
								'left-0',
								'top-0',
								'bottom-0',
								'right-0',
								'items-center',
								'justify-center',
								'z-50',
								'bg-gray-800',
								'opacity-95',
							]),
							c = (0, r.createDiv)(['text-2xl', 'font-bold', 'font-mono', 'animate-pulse', 'text-green-600']);
						l.appendChild(c);
						const u = (0, r.createDiv)(['flex', 'flex-col', 'flex-grow', 'overflow-hidden']),
							d = (0, r.createDiv)('flex-grow'),
							f = (0, r.createDiv)('flex-grow-0'),
							p = (0, r.createDiv)('flex-grow-0'),
							h = e;
						function m(e) {
							(c.innerHTML = e), l.classList.remove('hidden'), l.classList.add('flex');
						}
						u.appendChild(d),
							u.appendChild(p),
							e.appendChild(f),
							e.appendChild(u),
							e.appendChild(l),
							(n.layersOptions = n.layersOptions || {}),
							(n.layersOptions.keyboardDiv = p),
							(n.layersOptions.keyboardInputDiv = h),
							(n.layersOptions.fullscreenElement = e),
							(n.layersOptions.optionControls = []);
						const y = n.hardware;
						null != y && ((n.createTransportLayer = () => o.hardwareTransportLayerFactory.createTransportLayer(y)), (n.emulatorFunction = 'backend'));
						const v = a(d, n);
						let g = () => {};
						(0, s.createPlayerApp)(f, v, n, e => (g = e)), (v.bundleUrl = null);
						const b = v.run;
						v.run = async (e, t, r) => {
							l.classList.remove('flex'), l.classList.add('hidden');
							const o = () => (void 0 !== (null == n ? void 0 : n.clientId) ? n.clientId(!1) : null),
								s = await o();
							void 0 === t && void 0 === r && null !== s && (t = (0, i.getPersonalBundleUrl)(s.namespace, s.id, e) + '?dt=' + Date.now());
							const a = await b.call(v, e, t, r);
							v.bundleUrl = e;
							const u = v.layers.getOnSave();
							return (
								v.layers.setOnSave(async () => {
									const t = 'function' == typeof (null == n ? void 0 : n.onExit),
										r = t;
									t && a.mute();
									const s = await o();
									if (null !== s) {
										r && m('Saving [1/2]: collecting changes');
										const t = await a.persist();
										r && m('Saving [2/2]: sending to cloud'), await (0, i.putPersonalBundle)(s.namespace, s.id, e, t);
									} else r && m('Saving [1/1]: collecting changes'), await u.call(v.layers);
									t && r && (m('Saved. Now you can close the window'), c.classList.remove('animate-pulse'));
								}),
								g(),
								a
							);
						};
						const w = v.stop;
						return (v.stop = () => ((v.bundleUrl = null), w.call(v))), v;
					}
					(n.DosPlayer = l), (window.Dos = l);
				},
				{ './backend/v7/personal': 128, './dom': 151, './hardware-transport-layer': 152, './player-app': 154 },
			],
			156: [
				function (e, t, n) {
					'use strict';
					Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.request = void 0),
						(n.request = async function (e) {
							let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'GET',
								n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
							const r = await fetch(e, { method: t, body: n, headers: new Headers({ 'content-type': 'application/json' }) }).then(e => e.json());
							var o;
							if (200 !== r.code) throw new Error(null !== (o = r.message) && void 0 !== o ? o : 'code: ' + r.code);
							return r;
						});
				},
				{},
			],
			157: [
				function (e, t, n) {
					'use strict';
					function r(e, t, n, r, o, i) {
						return new Promise((s, a) => {
							const l = new XMLHttpRequest();
							if (
								((l.responseType = n),
								l.open(e, t, !0),
								l.addEventListener(
									'load',
									() => {
										200 !== l.status
											? a(new Error('Wrong status code ' + l.status))
											: 'text' === n
												? s(l.responseText)
												: 'arraybuffer' === n
													? s(l.response)
													: a(new Error('Unsupported responseType ' + n));
									},
									!1
								),
								l.addEventListener(
									'error',
									() => {
										a(new Error('HTTP GET failed for url ' + t));
									},
									!1
								),
								l.addEventListener(
									'abort',
									() => {
										a(new Error('HTTP GET canceled for url ' + t));
									},
									!1
								),
								void 0 !== o &&
									(l.onprogress = e => {
										if (e.loaded && e.total && e.total > 0) {
											const t = Math.round((1e4 * e.loaded) / e.total) / 100;
											o(t);
										}
									}),
								void 0 !== i)
							)
								for (const e of Object.keys(i)) l.setRequestHeader(e, i[e]);
							l.send(r);
						});
					}
					function o(e, t, n) {
						return r('post', e, t, n);
					}
					e('core-js/modules/web.dom-collections.iterator.js'),
						Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.post = n.getObject = n.postObject = n.send = void 0),
						(n.send = r),
						(n.postObject = async function (e, t) {
							const n = JSON.parse(await o(e, 'text', t));
							if (n.success) return n;
							if (void 0 !== n.errorCode) throw new Error(n.errorCode);
							throw new Error('POST Object request failed:\n Payload:\n' + JSON.stringify(n.body, null, 2));
						}),
						(n.getObject = async function (e) {
							const t = JSON.parse(await r('get', e, 'text'));
							if (t.success) return t;
							if (void 0 !== t.errorCode) throw new Error(t.errorCode);
							throw new Error('GET Object request failed:\n Payload:\n' + JSON.stringify(t, null, 2));
						}),
						(n.post = o);
				},
				{ 'core-js/modules/web.dom-collections.iterator.js': 118 },
			],
			158: [
				function (e, t, n) {
					'use strict';
					Object.defineProperty(n, '__esModule', { value: !0 }),
						(n.getPersonalBundleUrl = n.getPersonalBundleKey = n.uploadsS3Bucket = void 0),
						(n.uploadsS3Bucket = 'doszone-uploads');
					const r = 'https://doszone-uploads.s3.dualstack.eu-central-1.amazonaws.com';
					function o(e, t, n, o) {
						if (void 0 !== o && n.startsWith(r)) return n.substring(r.length + 1);
						const i = n.lastIndexOf('/'),
							s = n.substr(i + 1);
						return 'doszone' === e ? 'personal/' + t + '/' + s : 'personal-v2/' + e + '/' + t + '/' + s;
					}
					(n.getPersonalBundleKey = o),
						(n.getPersonalBundleUrl = function (e, t, n, i) {
							const s = o(e, t, n, i);
							return r + '/' + s;
						});
				},
				{},
			],
		},
		{},
		[155]
	);
//# sourceMappingURL=js-dos.js.map

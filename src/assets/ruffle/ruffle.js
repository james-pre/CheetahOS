(() => {
	'use strict';
	var e,
		n,
		t = {
			791: (e, n, t) => {
				e.exports = t.p + '318626a8878622d4730e.wasm';
			},
			797: (e, n, t) => {
				e.exports = t.p + '42f8dbf7f8b1cca631d0.wasm';
			},
		},
		a = {};
	function r(e) {
		var n = a[e];
		if (void 0 !== n) return n.exports;
		var o = (a[e] = { id: e, loaded: !1, exports: {} });
		return t[e](o, o.exports, r), (o.loaded = !0), o.exports;
	}
	(r.m = t),
		(r.d = (e, n) => {
			for (var t in n) r.o(n, t) && !r.o(e, t) && Object.defineProperty(e, t, { enumerable: !0, get: n[t] });
		}),
		(r.f = {}),
		(r.e = e => Promise.all(Object.keys(r.f).reduce((n, t) => (r.f[t](e, n), n), []))),
		(r.u = e => 'core.ruffle.' + { 69: 'e88cc385ca3824332d82', 655: '199108ce0aa8adfdc8f0' }[e] + '.js'),
		(r.g = (function () {
			if ('object' == typeof globalThis) return globalThis;
			try {
				return this || new Function('return this')();
			} catch (e) {
				if ('object' == typeof window) return window;
			}
		})()),
		(r.hmd = e => (
			(e = Object.create(e)).children || (e.children = []),
			Object.defineProperty(e, 'exports', {
				enumerable: !0,
				set: () => {
					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + e.id);
				},
			}),
			e
		)),
		(r.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n)),
		(e = {}),
		(n = 'ruffle-selfhosted:'),
		(r.l = (t, a, o, i) => {
			if (e[t]) e[t].push(a);
			else {
				var l, s;
				if (void 0 !== o)
					for (var u = document.getElementsByTagName('script'), c = 0; c < u.length; c++) {
						var d = u[c];
						if (d.getAttribute('src') == t || d.getAttribute('data-webpack') == n + o) {
							l = d;
							break;
						}
					}
				l ||
					((s = !0),
					((l = document.createElement('script')).charset = 'utf-8'),
					(l.timeout = 120),
					r.nc && l.setAttribute('nonce', r.nc),
					l.setAttribute('data-webpack', n + o),
					(l.src = t)),
					(e[t] = [a]);
				var f = (n, a) => {
						(l.onerror = l.onload = null), clearTimeout(m);
						var r = e[t];
						if ((delete e[t], l.parentNode && l.parentNode.removeChild(l), r && r.forEach(e => e(a)), n)) return n(a);
					},
					m = setTimeout(f.bind(null, void 0, { type: 'timeout', target: l }), 12e4);
				(l.onerror = f.bind(null, l.onerror)), (l.onload = f.bind(null, l.onload)), s && document.head.appendChild(l);
			}
		}),
		(r.r = e => {
			'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
				Object.defineProperty(e, '__esModule', { value: !0 });
		}),
		(r.p = ''),
		(() => {
			r.b = document.baseURI || self.location.href;
			var e = { 792: 0 };
			r.f.j = (n, t) => {
				var a = r.o(e, n) ? e[n] : void 0;
				if (0 !== a)
					if (a) t.push(a[2]);
					else {
						var o = new Promise((t, r) => (a = e[n] = [t, r]));
						t.push((a[2] = o));
						var i = r.p + r.u(n),
							l = new Error();
						r.l(
							i,
							t => {
								if (r.o(e, n) && (0 !== (a = e[n]) && (e[n] = void 0), a)) {
									var o = t && ('load' === t.type ? 'missing' : t.type),
										i = t && t.target && t.target.src;
									(l.message = 'Loading chunk ' + n + ' failed.\n(' + o + ': ' + i + ')'), (l.name = 'ChunkLoadError'), (l.type = o), (l.request = i), a[1](l);
								}
							},
							'chunk-' + n,
							n
						);
					}
			};
			var n = (n, t) => {
					var a,
						o,
						[i, l, s] = t,
						u = 0;
					if (i.some(n => 0 !== e[n])) {
						for (a in l) r.o(l, a) && (r.m[a] = l[a]);
						if (s) s(r);
					}
					for (n && n(t); u < i.length; u++) (o = i[u]), r.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
				},
				t = (self.webpackChunkruffle_selfhosted = self.webpackChunkruffle_selfhosted || []);
			t.forEach(n.bind(null, 0)), (t.push = n.bind(null, t.push.bind(t)));
		})(),
		(() => {
			class e {
				constructor(e, n, t, a, r) {
					(this.major = e), (this.minor = n), (this.patch = t), (this.prIdent = a), (this.buildIdent = r);
				}
				static fromSemver(n) {
					const t = n.split('+'),
						a = t[0].split('-'),
						r = a[0].split('.'),
						o = parseInt(r[0], 10);
					let i = 0,
						l = 0,
						s = null,
						u = null;
					return (
						void 0 !== r[1] && (i = parseInt(r[1], 10)),
						void 0 !== r[2] && (l = parseInt(r[2], 10)),
						void 0 !== a[1] && (s = a[1].split('.')),
						void 0 !== t[1] && (u = t[1].split('.')),
						new e(o, i, l, s, u)
					);
				}
				isCompatibleWith(e) {
					return (
						(0 !== this.major && this.major === e.major) ||
						(0 === this.major && 0 === e.major && 0 !== this.minor && this.minor === e.minor) ||
						(0 === this.major && 0 === e.major && 0 === this.minor && 0 === e.minor && 0 !== this.patch && this.patch === e.patch)
					);
				}
				hasPrecedenceOver(e) {
					if (this.major > e.major) return !0;
					if (this.major < e.major) return !1;
					if (this.minor > e.minor) return !0;
					if (this.minor < e.minor) return !1;
					if (this.patch > e.patch) return !0;
					if (this.patch < e.patch) return !1;
					if (null === this.prIdent && null !== e.prIdent) return !0;
					if (null !== this.prIdent && null === e.prIdent) return !1;
					if (null !== this.prIdent && null !== e.prIdent) {
						const n = /^[0-9]*$/;
						for (let t = 0; t < this.prIdent.length && t < e.prIdent.length; t += 1) {
							const a = n.test(e.prIdent[t]),
								r = n.test(this.prIdent[t]);
							if (!r && a) return !0;
							if (r && a) {
								const n = parseInt(this.prIdent[t], 10),
									a = parseInt(e.prIdent[t], 10);
								if (n > a) return !0;
								if (n < a) return !1;
							} else {
								if (r && !a) return !1;
								if (!r && !a) {
									if (this.prIdent[t] > e.prIdent[t]) return !0;
									if (this.prIdent[t] < e.prIdent[t]) return !1;
								}
							}
						}
						if (this.prIdent.length > e.prIdent.length) return !0;
						if (this.prIdent.length < e.prIdent.length) return !1;
					}
					if (null !== this.buildIdent && null === e.buildIdent) return !0;
					if (null === this.buildIdent && null !== e.buildIdent) return !1;
					if (null !== this.buildIdent && null !== e.buildIdent) {
						const n = /^[0-9]*$/;
						for (let t = 0; t < this.buildIdent.length && t < e.buildIdent.length; t += 1) {
							const a = n.test(this.buildIdent[t]),
								r = n.test(e.buildIdent[t]);
							if (!a && r) return !0;
							if (a && r) {
								const n = parseInt(this.buildIdent[t], 10),
									a = parseInt(e.buildIdent[t], 10);
								if (n > a) return !0;
								if (n < a) return !1;
							} else {
								if (a && !r) return !1;
								if (!a && !r) {
									if (this.buildIdent[t] > e.buildIdent[t]) return !0;
									if (this.buildIdent[t] < e.buildIdent[t]) return !1;
								}
							}
						}
						return this.buildIdent.length > e.buildIdent.length;
					}
					return !1;
				}
				isEqual(e) {
					return this.major === e.major && this.minor === e.minor && this.patch === e.patch;
				}
				isStableOrCompatiblePrerelease(e) {
					return null === e.prIdent || (this.major === e.major && this.minor === e.minor && this.patch === e.patch);
				}
			}
			class n {
				constructor(e) {
					this.requirements = e;
				}
				satisfiedBy(e) {
					for (const n of this.requirements) {
						let t = !0;
						for (const { comparator: a, version: r } of n)
							(t = t && r.isStableOrCompatiblePrerelease(e)),
								'' === a || '=' === a
									? (t = t && r.isEqual(e))
									: '>' === a
										? (t = t && e.hasPrecedenceOver(r))
										: '>=' === a
											? (t = t && (e.hasPrecedenceOver(r) || r.isEqual(e)))
											: '<' === a
												? (t = t && r.hasPrecedenceOver(e))
												: '<=' === a
													? (t = t && (r.hasPrecedenceOver(e) || r.isEqual(e)))
													: '^' === a && (t = t && r.isCompatibleWith(e));
						if (t) return !0;
					}
					return !1;
				}
				static fromRequirementString(t) {
					const a = t.split(' ');
					let r = [];
					const o = [];
					for (const n of a)
						if ('||' === n) r.length > 0 && (o.push(r), (r = []));
						else if (n.length > 0) {
							const t = /[0-9]/.exec(n);
							if (t) {
								const a = n.slice(0, t.index).trim(),
									o = e.fromSemver(n.slice(t.index).trim());
								r.push({ comparator: a, version: o });
							}
						}
					return r.length > 0 && o.push(r), new n(o);
				}
			}
			const t = async () =>
					WebAssembly.validate(
						new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])
					),
				a = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11])),
				o = async () =>
					WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11])),
				i = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11])),
				l = async () =>
					WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
			function s(e) {
				const n = 'function' == typeof Function.prototype.toString ? Function.prototype.toString() : null;
				return 'string' == typeof n && n.indexOf('[native code]') >= 0 && Function.prototype.toString.call(e).indexOf('[native code]') >= 0;
			}
			function u() {
				('function' == typeof Array.prototype.reduce && s(Array.prototype.reduce)) ||
					Object.defineProperty(Array.prototype, 'reduce', {
						value(...e) {
							if (0 === e.length && window.Prototype && window.Prototype.Version && window.Prototype.Version < '1.6.1') return this.length > 1 ? this : this[0];
							const n = e[0];
							if (null === this) throw new TypeError('Array.prototype.reduce called on null or undefined');
							if ('function' != typeof n) throw new TypeError(`${n} is not a function`);
							const t = Object(this),
								a = t.length >>> 0;
							let r,
								o = 0;
							if (e.length >= 2) r = e[1];
							else {
								for (; o < a && !(o in t); ) o++;
								if (o >= a) throw new TypeError('Reduce of empty array with no initial value');
								r = t[o++];
							}
							for (; o < a; ) o in t && (r = n(r, t[o], o, t)), o++;
							return r;
						},
					}),
					('function' == typeof Window && s(Window)) || ('function' == typeof window.constructor && s(window.constructor) && (window.Window = window.constructor)),
					(void 0 !== window.Reflect && null !== window.Reflect) || (window.Reflect = {}),
					'function' != typeof Reflect.get && Object.defineProperty(Reflect, 'get', { value: (e, n) => e[n] }),
					'function' != typeof Reflect.set &&
						Object.defineProperty(Reflect, 'set', {
							value(e, n, t) {
								e[n] = t;
							},
						}),
					'function' != typeof Reflect.has && Object.defineProperty(Reflect, 'has', { value: (e, n) => n in e }),
					'function' != typeof Reflect.ownKeys &&
						Object.defineProperty(Reflect, 'ownKeys', { value: e => [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)] });
			}
			let c = null,
				d = !1;
			try {
				if (void 0 !== document.currentScript && null !== document.currentScript && 'src' in document.currentScript && '' !== document.currentScript.src) {
					let e = document.currentScript.src;
					e.endsWith('.js') || e.endsWith('/') || (e += '/'), (c = new URL('.', e)), (d = c.protocol.includes('extension'));
				}
			} catch (e) {
				console.warn('Unable to get currentScript URL');
			}
			function f(e) {
				var n;
				let t = null !== (n = null == c ? void 0 : c.href) && void 0 !== n ? n : '';
				return !d && 'publicPath' in e && null !== e.publicPath && void 0 !== e.publicPath && (t = e.publicPath), '' === t || t.endsWith('/') || (t += '/'), t;
			}
			let m = null;
			async function p(e, n) {
				null === m &&
					(m = (async function (e, n) {
						var s;
						u();
						const c = (await Promise.all([t(), l(), o(), i(), a()])).every(Boolean);
						c || console.log('Some WebAssembly extensions are NOT available, falling back to the vanilla WebAssembly module');
						try {
							r.p = f(e);
						} catch (e) {}
						const { default: d, RuffleInstanceBuilder: m, ZipWriter: p } = await (c ? r.e(69).then(r.bind(r, 69)) : r.e(655).then(r.bind(r, 655)));
						let h;
						const v = c ? new URL(r(791), r.b) : new URL(r(797), r.b),
							b = await fetch(v),
							g = 'function' == typeof ReadableStreamDefaultController;
						if (n && g) {
							const e = (null === (s = null == b ? void 0 : b.headers) || void 0 === s ? void 0 : s.get('content-length')) || '';
							let t = 0;
							const a = parseInt(e);
							h = new Response(
								new ReadableStream({
									async start(e) {
										var r;
										const o = null === (r = b.body) || void 0 === r ? void 0 : r.getReader();
										if (!o) throw 'Response had no body';
										for (n(t, a); ; ) {
											const { done: r, value: i } = await o.read();
											if (r) break;
											(null == i ? void 0 : i.byteLength) && (t += null == i ? void 0 : i.byteLength), e.enqueue(i), n(t, a);
										}
										e.close();
									},
								}),
								b
							);
						} else h = b;
						return await d(h), [m, p];
					})(e, n));
				const s = await m;
				return [new s[0](), () => new s[1]()];
			}
			class h {
				constructor(e) {
					this.value = e;
				}
				valueOf() {
					return this.value;
				}
			}
			class v extends h {
				constructor(e = '???') {
					super(e);
				}
				toString(e) {
					return `{${this.value}}`;
				}
			}
			class b extends h {
				constructor(e, n = {}) {
					super(e), (this.opts = n);
				}
				toString(e) {
					try {
						return e.memoizeIntlObject(Intl.NumberFormat, this.opts).format(this.value);
					} catch (n) {
						return e.reportError(n), this.value.toString(10);
					}
				}
			}
			class g extends h {
				constructor(e, n = {}) {
					super(e), (this.opts = n);
				}
				toString(e) {
					try {
						return e.memoizeIntlObject(Intl.DateTimeFormat, this.opts).format(this.value);
					} catch (n) {
						return e.reportError(n), new Date(this.value).toISOString();
					}
				}
			}
			const w = 100,
				k = '\u2068',
				y = '\u2069';
			function R(e, n, t) {
				if (t === n) return !0;
				if (t instanceof b && n instanceof b && t.value === n.value) return !0;
				if (n instanceof b && 'string' == typeof t) {
					if (t === e.memoizeIntlObject(Intl.PluralRules, n.opts).select(n.value)) return !0;
				}
				return !1;
			}
			function x(e, n, t) {
				return n[t] ? E(e, n[t].value) : (e.reportError(new RangeError('No default')), new v());
			}
			function z(e, n) {
				const t = [],
					a = Object.create(null);
				for (const r of n) 'narg' === r.type ? (a[r.name] = S(e, r.value)) : t.push(S(e, r));
				return { positional: t, named: a };
			}
			function S(e, n) {
				switch (n.type) {
					case 'str':
						return n.value;
					case 'num':
						return new b(n.value, { minimumFractionDigits: n.precision });
					case 'var':
						return (function (e, { name: n }) {
							let t;
							if (e.params) {
								if (!Object.prototype.hasOwnProperty.call(e.params, n)) return new v(`$${n}`);
								t = e.params[n];
							} else {
								if (!e.args || !Object.prototype.hasOwnProperty.call(e.args, n))
									return e.reportError(new ReferenceError(`Unknown variable: $${n}`)), new v(`$${n}`);
								t = e.args[n];
							}
							if (t instanceof h) return t;
							switch (typeof t) {
								case 'string':
									return t;
								case 'number':
									return new b(t);
								case 'object':
									if (t instanceof Date) return new g(t.getTime());
								default:
									return e.reportError(new TypeError(`Variable type not supported: $${n}, ${typeof t}`)), new v(`$${n}`);
							}
						})(e, n);
					case 'mesg':
						return (function (e, { name: n, attr: t }) {
							const a = e.bundle._messages.get(n);
							if (!a) return e.reportError(new ReferenceError(`Unknown message: ${n}`)), new v(n);
							if (t) {
								const r = a.attributes[t];
								return r ? E(e, r) : (e.reportError(new ReferenceError(`Unknown attribute: ${t}`)), new v(`${n}.${t}`));
							}
							if (a.value) return E(e, a.value);
							return e.reportError(new ReferenceError(`No value: ${n}`)), new v(n);
						})(e, n);
					case 'term':
						return (function (e, { name: n, attr: t, args: a }) {
							const r = `-${n}`,
								o = e.bundle._terms.get(r);
							if (!o) return e.reportError(new ReferenceError(`Unknown term: ${r}`)), new v(r);
							if (t) {
								const n = o.attributes[t];
								if (n) {
									e.params = z(e, a).named;
									const t = E(e, n);
									return (e.params = null), t;
								}
								return e.reportError(new ReferenceError(`Unknown attribute: ${t}`)), new v(`${r}.${t}`);
							}
							e.params = z(e, a).named;
							const i = E(e, o.value);
							return (e.params = null), i;
						})(e, n);
					case 'func':
						return (function (e, { name: n, args: t }) {
							let a = e.bundle._functions[n];
							if (!a) return e.reportError(new ReferenceError(`Unknown function: ${n}()`)), new v(`${n}()`);
							if ('function' != typeof a) return e.reportError(new TypeError(`Function ${n}() is not callable`)), new v(`${n}()`);
							try {
								let n = z(e, t);
								return a(n.positional, n.named);
							} catch (t) {
								return e.reportError(t), new v(`${n}()`);
							}
						})(e, n);
					case 'select':
						return (function (e, { selector: n, variants: t, star: a }) {
							let r = S(e, n);
							if (r instanceof v) return x(e, t, a);
							for (const n of t) {
								if (R(e, r, S(e, n.key))) return E(e, n.value);
							}
							return x(e, t, a);
						})(e, n);
					default:
						return new v();
				}
			}
			function j(e, n) {
				if (e.dirty.has(n)) return e.reportError(new RangeError('Cyclic reference')), new v();
				e.dirty.add(n);
				const t = [],
					a = e.bundle._useIsolating && n.length > 1;
				for (const r of n)
					if ('string' != typeof r) {
						if ((e.placeables++, e.placeables > w)) throw (e.dirty.delete(n), new RangeError(`Too many placeables expanded: ${e.placeables}, max allowed is ${w}`));
						a && t.push(k), t.push(S(e, r).toString(e)), a && t.push(y);
					} else t.push(e.bundle._transform(r));
				return e.dirty.delete(n), t.join('');
			}
			function E(e, n) {
				return 'string' == typeof n ? e.bundle._transform(n) : j(e, n);
			}
			class C {
				constructor(e, n, t) {
					(this.dirty = new WeakSet()), (this.params = null), (this.placeables = 0), (this.bundle = e), (this.errors = n), (this.args = t);
				}
				reportError(e) {
					if (!(this.errors && e instanceof Error)) throw e;
					this.errors.push(e);
				}
				memoizeIntlObject(e, n) {
					let t = this.bundle._intls.get(e);
					t || ((t = {}), this.bundle._intls.set(e, t));
					let a = JSON.stringify(n);
					return t[a] || (t[a] = new e(this.bundle.locales, n)), t[a];
				}
			}
			function A(e, n) {
				const t = Object.create(null);
				for (const [a, r] of Object.entries(e)) n.includes(a) && (t[a] = r.valueOf());
				return t;
			}
			const F = [
				'unitDisplay',
				'currencyDisplay',
				'useGrouping',
				'minimumIntegerDigits',
				'minimumFractionDigits',
				'maximumFractionDigits',
				'minimumSignificantDigits',
				'maximumSignificantDigits',
			];
			function q(e, n) {
				let t = e[0];
				if (t instanceof v) return new v(`NUMBER(${t.valueOf()})`);
				if (t instanceof b) return new b(t.valueOf(), { ...t.opts, ...A(n, F) });
				if (t instanceof g) return new b(t.valueOf(), { ...A(n, F) });
				throw new TypeError('Invalid argument to NUMBER');
			}
			const D = [
				'dateStyle',
				'timeStyle',
				'fractionalSecondDigits',
				'dayPeriod',
				'hour12',
				'weekday',
				'era',
				'year',
				'month',
				'day',
				'hour',
				'minute',
				'second',
				'timeZoneName',
			];
			function I(e, n) {
				let t = e[0];
				if (t instanceof v) return new v(`DATETIME(${t.valueOf()})`);
				if (t instanceof g) return new g(t.valueOf(), { ...t.opts, ...A(n, D) });
				if (t instanceof b) return new g(t.valueOf(), { ...A(n, D) });
				throw new TypeError('Invalid argument to DATETIME');
			}
			const P = new Map();
			class $ {
				constructor(e, { functions: n, useIsolating: t = !0, transform: a = e => e } = {}) {
					(this._terms = new Map()),
						(this._messages = new Map()),
						(this.locales = Array.isArray(e) ? e : [e]),
						(this._functions = { NUMBER: q, DATETIME: I, ...n }),
						(this._useIsolating = t),
						(this._transform = a),
						(this._intls = (function (e) {
							const n = Array.isArray(e) ? e.join(' ') : e;
							let t = P.get(n);
							return void 0 === t && ((t = new Map()), P.set(n, t)), t;
						})(e));
				}
				hasMessage(e) {
					return this._messages.has(e);
				}
				getMessage(e) {
					return this._messages.get(e);
				}
				addResource(e, { allowOverrides: n = !1 } = {}) {
					const t = [];
					for (let a = 0; a < e.body.length; a++) {
						let r = e.body[a];
						if (r.id.startsWith('-')) {
							if (!1 === n && this._terms.has(r.id)) {
								t.push(new Error(`Attempt to override an existing term: "${r.id}"`));
								continue;
							}
							this._terms.set(r.id, r);
						} else {
							if (!1 === n && this._messages.has(r.id)) {
								t.push(new Error(`Attempt to override an existing message: "${r.id}"`));
								continue;
							}
							this._messages.set(r.id, r);
						}
					}
					return t;
				}
				formatPattern(e, n = null, t = null) {
					if ('string' == typeof e) return this._transform(e);
					let a = new C(this, t, n);
					try {
						return j(a, e).toString(a);
					} catch (e) {
						if (a.errors && e instanceof Error) return a.errors.push(e), new v().toString(a);
						throw e;
					}
				}
			}
			const O = /^(-?[a-zA-Z][\w-]*) *= */gm,
				M = /\.([a-zA-Z][\w-]*) *= */y,
				W = /\*?\[/y,
				L = /(-?[0-9]+(?:\.([0-9]+))?)/y,
				T = /([a-zA-Z][\w-]*)/y,
				N = /([$-])?([a-zA-Z][\w-]*)(?:\.([a-zA-Z][\w-]*))?/y,
				U = /^[A-Z][A-Z0-9_-]*$/,
				_ = /([^{}\n\r]+)/y,
				B = /([^\\"\n\r]*)/y,
				J = /\\([\\"])/y,
				V = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{6})/y,
				H = /^\n+/,
				Z = / +$/,
				K = / *\r?\n/g,
				G = /( *)$/,
				Y = /{\s*/y,
				Q = /\s*}/y,
				X = /\[\s*/y,
				ee = /\s*] */y,
				ne = /\s*\(\s*/y,
				te = /\s*->\s*/y,
				ae = /\s*:\s*/y,
				re = /\s*,?\s*/y,
				oe = /\s+/y;
			class ie {
				constructor(e) {
					(this.body = []), (O.lastIndex = 0);
					let n = 0;
					for (;;) {
						let t = O.exec(e);
						if (null === t) break;
						n = O.lastIndex;
						try {
							this.body.push(l(t[1]));
						} catch (e) {
							if (e instanceof SyntaxError) continue;
							throw e;
						}
					}
					function t(t) {
						return (t.lastIndex = n), t.test(e);
					}
					function a(t, a) {
						if (e[n] === t) return n++, !0;
						if (a) throw new a(`Expected ${t}`);
						return !1;
					}
					function r(e, a) {
						if (t(e)) return (n = e.lastIndex), !0;
						if (a) throw new a(`Expected ${e.toString()}`);
						return !1;
					}
					function o(t) {
						t.lastIndex = n;
						let a = t.exec(e);
						if (null === a) throw new SyntaxError(`Expected ${t.toString()}`);
						return (n = t.lastIndex), a;
					}
					function i(e) {
						return o(e)[1];
					}
					function l(e) {
						let n = s(),
							a = (function () {
								let e = Object.create(null);
								for (; t(M); ) {
									let n = i(M),
										t = s();
									if (null === t) throw new SyntaxError('Expected attribute value');
									e[n] = t;
								}
								return e;
							})();
						if (null === n && 0 === Object.keys(a).length) throw new SyntaxError('Expected message value or attributes');
						return { id: e, value: n, attributes: a };
					}
					function s() {
						let a;
						if ((t(_) && (a = i(_)), '{' === e[n] || '}' === e[n])) return u(a ? [a] : [], 1 / 0);
						let r = b();
						return r ? (a ? u([a, r], r.length) : ((r.value = g(r.value, H)), u([r], r.length))) : a ? g(a, Z) : null;
					}
					function u(a = [], r) {
						for (;;) {
							if (t(_)) {
								a.push(i(_));
								continue;
							}
							if ('{' === e[n]) {
								a.push(c());
								continue;
							}
							if ('}' === e[n]) throw new SyntaxError('Unbalanced closing brace');
							let o = b();
							if (!o) break;
							a.push(o), (r = Math.min(r, o.length));
						}
						let o = a.length - 1,
							l = a[o];
						'string' == typeof l && (a[o] = g(l, Z));
						let s = [];
						for (let e of a) e instanceof le && (e = e.value.slice(0, e.value.length - r)), e && s.push(e);
						return s;
					}
					function c() {
						r(Y, SyntaxError);
						let e = d();
						if (r(Q)) return e;
						if (r(te)) {
							let n = (function () {
								let e,
									n = [],
									r = 0;
								for (; t(W); ) {
									a('*') && (e = r);
									let t = m(),
										o = s();
									if (null === o) throw new SyntaxError('Expected variant value');
									n[r++] = { key: t, value: o };
								}
								if (0 === r) return null;
								if (void 0 === e) throw new SyntaxError('Expected default variant');
								return { variants: n, star: e };
							})();
							return r(Q, SyntaxError), { type: 'select', selector: e, ...n };
						}
						throw new SyntaxError('Unclosed placeable');
					}
					function d() {
						if ('{' === e[n]) return c();
						if (t(N)) {
							let [, t, a, i = null] = o(N);
							if ('$' === t) return { type: 'var', name: a };
							if (r(ne)) {
								let o = (function () {
									let t = [];
									for (;;) {
										switch (e[n]) {
											case ')':
												return n++, t;
											case void 0:
												throw new SyntaxError('Unclosed argument list');
										}
										t.push(f()), r(re);
									}
								})();
								if ('-' === t) return { type: 'term', name: a, attr: i, args: o };
								if (U.test(a)) return { type: 'func', name: a, args: o };
								throw new SyntaxError('Function names must be all upper-case');
							}
							return '-' === t ? { type: 'term', name: a, attr: i, args: [] } : { type: 'mesg', name: a, attr: i };
						}
						return p();
					}
					function f() {
						let e = d();
						return 'mesg' !== e.type ? e : r(ae) ? { type: 'narg', name: e.name, value: p() } : e;
					}
					function m() {
						let e;
						return r(X, SyntaxError), (e = t(L) ? h() : { type: 'str', value: i(T) }), r(ee, SyntaxError), e;
					}
					function p() {
						if (t(L)) return h();
						if ('"' === e[n])
							return (function () {
								a('"', SyntaxError);
								let t = '';
								for (;;) {
									if (((t += i(B)), '\\' !== e[n])) {
										if (a('"')) return { type: 'str', value: t };
										throw new SyntaxError('Unclosed string literal');
									}
									t += v();
								}
							})();
						throw new SyntaxError('Invalid expression');
					}
					function h() {
						let [, e, n = ''] = o(L),
							t = n.length;
						return { type: 'num', value: parseFloat(e), precision: t };
					}
					function v() {
						if (t(J)) return i(J);
						if (t(V)) {
							let [, e, n] = o(V),
								t = parseInt(e || n, 16);
							return t <= 55295 || 57344 <= t ? String.fromCodePoint(t) : '\ufffd';
						}
						throw new SyntaxError('Unknown escape sequence');
					}
					function b() {
						let t = n;
						switch ((r(oe), e[n])) {
							case '.':
							case '[':
							case '*':
							case '}':
							case void 0:
								return !1;
							case '{':
								return w(e.slice(t, n));
						}
						return ' ' === e[n - 1] && w(e.slice(t, n));
					}
					function g(e, n) {
						return e.replace(n, '');
					}
					function w(e) {
						let n = e.replace(K, '\n'),
							t = G.exec(e)[1].length;
						return new le(n, t);
					}
				}
			}
			class le {
				constructor(e, n) {
					(this.value = e), (this.length = n);
				}
			}
			const se = new RegExp('^([a-z]{2,3}|\\*)(?:-([a-z]{4}|\\*))?(?:-([a-z]{2}|\\*))?(?:-(([0-9][a-z0-9]{3}|[a-z0-9]{5,8})|\\*))?$', 'i');
			class ue {
				constructor(e) {
					const n = se.exec(e.replace(/_/g, '-'));
					if (!n) return void (this.isWellFormed = !1);
					let [, t, a, r, o] = n;
					t && (this.language = t.toLowerCase()),
						a && (this.script = a[0].toUpperCase() + a.slice(1)),
						r && (this.region = r.toUpperCase()),
						(this.variant = o),
						(this.isWellFormed = !0);
				}
				isEqual(e) {
					return this.language === e.language && this.script === e.script && this.region === e.region && this.variant === e.variant;
				}
				matches(e, n = !1, t = !1) {
					return (
						(this.language === e.language || (n && void 0 === this.language) || (t && void 0 === e.language)) &&
						(this.script === e.script || (n && void 0 === this.script) || (t && void 0 === e.script)) &&
						(this.region === e.region || (n && void 0 === this.region) || (t && void 0 === e.region)) &&
						(this.variant === e.variant || (n && void 0 === this.variant) || (t && void 0 === e.variant))
					);
				}
				toString() {
					return [this.language, this.script, this.region, this.variant].filter(e => void 0 !== e).join('-');
				}
				clearVariants() {
					this.variant = void 0;
				}
				clearRegion() {
					this.region = void 0;
				}
				addLikelySubtags() {
					const e = (function (e) {
						if (Object.prototype.hasOwnProperty.call(ce, e)) return new ue(ce[e]);
						const n = new ue(e);
						if (n.language && de.includes(n.language)) return (n.region = n.language.toUpperCase()), n;
						return null;
					})(this.toString().toLowerCase());
					return !!e && ((this.language = e.language), (this.script = e.script), (this.region = e.region), (this.variant = e.variant), !0);
				}
			}
			const ce = {
					ar: 'ar-arab-eg',
					'az-arab': 'az-arab-ir',
					'az-ir': 'az-arab-ir',
					be: 'be-cyrl-by',
					da: 'da-latn-dk',
					el: 'el-grek-gr',
					en: 'en-latn-us',
					fa: 'fa-arab-ir',
					ja: 'ja-jpan-jp',
					ko: 'ko-kore-kr',
					pt: 'pt-latn-br',
					sr: 'sr-cyrl-rs',
					'sr-ru': 'sr-latn-ru',
					sv: 'sv-latn-se',
					ta: 'ta-taml-in',
					uk: 'uk-cyrl-ua',
					zh: 'zh-hans-cn',
					'zh-hant': 'zh-hant-tw',
					'zh-hk': 'zh-hant-hk',
					'zh-mo': 'zh-hant-mo',
					'zh-tw': 'zh-hant-tw',
					'zh-gb': 'zh-hant-gb',
					'zh-us': 'zh-hant-us',
				},
				de = ['az', 'bg', 'cs', 'de', 'es', 'fi', 'fr', 'hu', 'it', 'lt', 'lv', 'nl', 'pl', 'ro', 'ru'];
			function fe(e, n, { strategy: t = 'filtering', defaultLocale: a } = {}) {
				const r = (function (e, n, t) {
					const a = new Set(),
						r = new Map();
					for (let e of n) new ue(e).isWellFormed && r.set(e, new ue(e));
					e: for (const n of e) {
						const e = n.toLowerCase(),
							o = new ue(e);
						if (void 0 !== o.language) {
							for (const n of r.keys())
								if (e === n.toLowerCase()) {
									if ((a.add(n), r.delete(n), 'lookup' === t)) return Array.from(a);
									if ('filtering' === t) continue;
									continue e;
								}
							for (const [e, n] of r.entries())
								if (n.matches(o, !0, !1)) {
									if ((a.add(e), r.delete(e), 'lookup' === t)) return Array.from(a);
									if ('filtering' === t) continue;
									continue e;
								}
							if (o.addLikelySubtags())
								for (const [e, n] of r.entries())
									if (n.matches(o, !0, !1)) {
										if ((a.add(e), r.delete(e), 'lookup' === t)) return Array.from(a);
										if ('filtering' === t) continue;
										continue e;
									}
							o.clearVariants();
							for (const [e, n] of r.entries())
								if (n.matches(o, !0, !0)) {
									if ((a.add(e), r.delete(e), 'lookup' === t)) return Array.from(a);
									if ('filtering' === t) continue;
									continue e;
								}
							if ((o.clearRegion(), o.addLikelySubtags()))
								for (const [e, n] of r.entries())
									if (n.matches(o, !0, !1)) {
										if ((a.add(e), r.delete(e), 'lookup' === t)) return Array.from(a);
										if ('filtering' === t) continue;
										continue e;
									}
							o.clearRegion();
							for (const [e, n] of r.entries())
								if (n.matches(o, !0, !0)) {
									if ((a.add(e), r.delete(e), 'lookup' === t)) return Array.from(a);
									if ('filtering' === t) continue;
									continue e;
								}
						}
					}
					return Array.from(a);
				})(Array.from(null != e ? e : []).map(String), Array.from(null != n ? n : []).map(String), t);
				if ('lookup' === t) {
					if (void 0 === a) throw new Error('defaultLocale cannot be undefined for strategy `lookup`');
					0 === r.length && r.push(a);
				} else a && !r.includes(a) && r.push(a);
				return r;
			}
			const me = {
					'ar-SA': {
						'context_menu.ftl':
							'context-menu-download-swf = \u062a\u062d\u0645\u064a\u0644 .swf\ncontext-menu-copy-debug-info = \u0646\u0633\u062e \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0635\u062d\u064a\u062d\ncontext-menu-open-save-manager = \u0641\u062a\u062d \u0645\u062f\u064a\u0631 \u0627\u0644\u062d\u0641\u0638\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] \u062d\u0648\u0644 \u0645\u0644\u062d\u0642 Ruffle ({ $version })\n       *[other] \u062d\u0648\u0644 Ruffle ({ $version })\n    }\ncontext-menu-hide = \u0625\u062e\u0641\u0627\u0621 \u0647\u0630\u0647 \u0627\u0644\u0642\u0627\u0626\u0645\u0629\ncontext-menu-exit-fullscreen = \u0627\u0644\u062e\u0631\u0648\u062c \u0645\u0646 \u0648\u0636\u0639\u064a\u0629 \u0627\u0644\u0634\u0627\u0634\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629\ncontext-menu-enter-fullscreen = \u062a\u0641\u0639\u064a\u0644 \u0648\u0636\u0639\u064a\u0629 \u0627\u0644\u0634\u0627\u0634\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629\ncontext-menu-volume-controls = \u0627\u0644\u062a\u062d\u0643\u0645 \u0628\u0627\u0644\u0635\u0648\u062a\n',
						'messages.ftl':
							'message-cant-embed =\n    \u0644\u0645 \u064a\u0643\u0646 Ruffle \u0642\u0627\u062f\u0631 \u0639\u0644\u0649 \u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0641\u0644\u0627\u0634 \u0627\u0644\u0645\u0636\u0645\u0646\u0629 \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629.\n    \u064a\u0645\u0643\u0646\u0643 \u0645\u062d\u0627\u0648\u0644\u0629 \u0641\u062a\u062d \u0627\u0644\u0645\u0644\u0641 \u0641\u064a \u0639\u0644\u0627\u0645\u0629 \u062a\u0628\u0648\u064a\u0628 \u0645\u0646\u0641\u0635\u0644\u0629 \u0644\u062a\u062c\u0627\u0648\u0632 \u0647\u0630\u0647 \u0627\u0644\u0645\u0634\u0643\u0644\u0629.\npanic-title = \u0644\u0642\u062f \u062d\u062f\u062b \u062e\u0637\u0623 \u0645\u0627 :(\nmore-info = \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0623\u0643\u062b\u0631\nrun-anyway = \u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0639\u0644\u0649 \u0623\u064a \u062d\u0627\u0644\ncontinue = \u0627\u0644\u0627\u0633\u062a\u0645\u0631\u0627\u0631\nreport-bug = \u0625\u0628\u0644\u0627\u063a \u0639\u0646 \u062e\u0644\u0644\nupdate-ruffle = \u062a\u062d\u062f\u064a\u062b \u0631\u0641\u0644\nruffle-demo = \u0648\u064a\u0628 \u0627\u0644\u062a\u062c\u0631\u064a\u0628\u064a\nruffle-desktop = \u0628\u0631\u0646\u0627\u0645\u062c \u0633\u0637\u062d \u0627\u0644\u0645\u0643\u062a\u0628\nruffle-wiki = \u0639\u0631\u0636 \u0648\u064a\u0643\u064a Ruffle\nenable-hardware-acceleration = \u064a\u0628\u062f\u0648 \u0623\u0646 \u062a\u0633\u0627\u0631\u0639 \u0627\u0644\u0623\u062c\u0647\u0632\u0629 \u063a\u064a\u0631 \u0645\u0641\u0639\u0644. \u0628\u064a\u0646\u0645\u0627 \u0642\u062f \u064a\u0639\u0645\u0644 Ruffle\u060c \u0642\u062f \u064a\u0643\u0648\u0646 \u0628\u0637\u064a\u0626\u0627\u064b \u0628\u0634\u0643\u0644 \u063a\u064a\u0631 \u0645\u0639\u0642\u0648\u0644. \u064a\u0645\u0643\u0646\u0643 \u0645\u0639\u0631\u0641\u0629 \u0643\u064a\u0641\u064a\u0629 \u062a\u0645\u0643\u064a\u0646 \u062a\u0633\u0627\u0631\u0639 \u0627\u0644\u0623\u062c\u0647\u0632\u0629 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0645\u062a\u0627\u0628\u0639\u0629 \u0647\u0630\u0627 \u0627\u0644\u0631\u0627\u0628\u0637.\nview-error-details = \u0639\u0631\u0636 \u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u062e\u0637\u0623\nopen-in-new-tab = \u0641\u062a\u062d \u0641\u064a \u0639\u0644\u0627\u0645\u0629 \u062a\u0628\u0648\u064a\u0628 \u062c\u062f\u064a\u062f\u0629\nclick-to-unmute = \u0627\u0646\u0642\u0631 \u0644\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0643\u062a\u0645\nerror-file-protocol =\n    \u064a\u0628\u062f\u0648 \u0623\u0646\u0643 \u062a\u0642\u0648\u0645 \u0628\u062a\u0634\u063a\u064a\u0644 Ruffle \u0639\u0644\u0649 \u0628\u0631\u0648\u062a\u0648\u0643\u0648\u0644 "\u0627\u0644\u0645\u0644\u0641:".\n    \u0647\u0630\u0627 \u0644\u0646 \u064a\u0639\u0645\u0644 \u0644\u0623\u0646 \u0627\u0644\u0645\u062a\u0635\u0641\u062d\u0627\u062a \u062a\u0645\u0646\u0639 \u0627\u0644\u0639\u062f\u064a\u062f \u0645\u0646 \u0627\u0644\u0645\u064a\u0632\u0627\u062a \u0645\u0646 \u0627\u0644\u0639\u0645\u0644 \u0644\u0623\u0633\u0628\u0627\u0628 \u0623\u0645\u0646\u064a\u0629.\n    \u0628\u062f\u0644\u0627\u064b \u0645\u0646 \u0630\u0644\u0643\u060c \u0646\u062f\u0639\u0648\u0643 \u0625\u0644\u0649 \u0625\u0639\u062f\u0627\u062f \u062e\u0627\u062f\u0645 \u0645\u062d\u0644\u064a \u0623\u0648 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0639\u0631\u0636 \u0627\u0644\u0648\u064a\u0628 \u0623\u0648 \u062a\u0637\u0628\u064a\u0642 \u0633\u0637\u062d \u0627\u0644\u0645\u0643\u062a\u0628.\nerror-javascript-config =\n    \u062a\u0639\u0631\u0636 Ruffle \u0625\u0644\u0649 \u0645\u0634\u0643\u0644\u0629 \u0643\u0628\u064a\u0631\u0629 \u0628\u0633\u0628\u0628 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u062e\u0627\u0637\u0626\u0629 \u0644\u0644\u062c\u0627\u0641\u0627 \u0633\u0643\u0631\u064a\u0628\u062a.\n    \u0625\u0630\u0627 \u0643\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062e\u0627\u062f\u0645\u060c \u0646\u062d\u0646 \u0646\u062f\u0639\u0648\u0643 \u0625\u0644\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u062e\u0637\u0623 \u0644\u0645\u0639\u0631\u0641\u0629 \u0633\u0628\u0628 \u0627\u0644\u0645\u0634\u0643\u0644\u0629.\n    \u064a\u0645\u0643\u0646\u0643 \u0623\u064a\u0636\u0627 \u0627\u0644\u0631\u062c\u0648\u0639 \u0625\u0644\u0649 \u0648\u064a\u0643\u064a Ruffle \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629.\nerror-wasm-not-found =\n    \u0641\u0634\u0644 Ruffle \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0645\u0643\u0648\u0646 \u0627\u0644\u0645\u0644\u0641 ".wasm" \u0627\u0644\u0645\u0637\u0644\u0648\u0628.\n    \u0625\u0630\u0627 \u0643\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062e\u0627\u062f\u0645\u060c \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0623\u0643\u062f \u0645\u0646 \u0623\u0646 \u0627\u0644\u0645\u0644\u0641 \u0642\u062f \u062a\u0645 \u062a\u062d\u0645\u064a\u0644\u0647 \u0628\u0634\u0643\u0644 \u0635\u062d\u064a\u062d.\n    \u0625\u0630\u0627 \u0627\u0633\u062a\u0645\u0631\u062a \u0627\u0644\u0645\u0634\u0643\u0644\u0629\u060c \u0642\u062f \u062a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0625\u0639\u062f\u0627\u062f\u0627\u062a "\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0639\u0627\u0645": \u0627\u0644\u0631\u062c\u0627\u0621 \u0645\u0631\u0627\u062c\u0639\u0629 \u0648\u064a\u0643\u064a Ruffle \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629.\nerror-wasm-mime-type =\n    \u0648\u0627\u062c\u0647 Ruffle \u0645\u0634\u0643\u0644\u0629 \u0643\u0628\u064a\u0631\u0629 \u0623\u062b\u0646\u0627\u0621 \u0645\u062d\u0627\u0648\u0644\u0629 \u0627\u0644\u062a\u0647\u064a\u0626\u0629.\n    \u062e\u0627\u062f\u0645 \u0627\u0644\u0648\u064a\u0628 \u0647\u0630\u0627 \u0644\u0627 \u064a\u062e\u062f\u0645 \u0645\u0644\u0641\u0627\u062a ". wasm" \u0645\u0639 \u0646\u0648\u0639 MIME \u0627\u0644\u0635\u062d\u064a\u062d.\n    \u0625\u0630\u0627 \u0643\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062e\u0627\u062f\u0645\u060c \u064a\u0631\u062c\u0649 \u0645\u0631\u0627\u062c\u0639\u0629 \u0648\u064a\u0643\u064a Ruffle \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629.\nerror-invalid-swf =\n    \u0644\u0627 \u064a\u0645\u0643\u0646 \u0644\u0640 Ruffle \u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628.\n    \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u0623\u0643\u062b\u0631 \u0625\u062d\u062a\u0645\u0627\u0644\u0627\u064b \u0647\u0648 \u0623\u0646 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0644\u064a\u0633 \u0635\u0627\u0644\u062d\u0627.\nerror-swf-fetch =\n    \u0641\u0634\u0644 Ruffle \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0645\u0644\u0641 \u0641\u0644\u0627\u0634 SWF.\n    \u0627\u0644\u0633\u0628\u0628 \u0627\u0644\u0623\u0643\u062b\u0631 \u0627\u062d\u062a\u0645\u0627\u0644\u0627\u064b \u0647\u0648 \u0623\u0646 \u0627\u0644\u0645\u0644\u0641 \u0644\u0645 \u064a\u0639\u062f \u0645\u0648\u062c\u0648\u062f\u060c \u0644\u0630\u0644\u0643 \u0644\u0627 \u064a\u0648\u062c\u062f \u0634\u064a\u0621 \u0644\u064a\u062d\u0645\u0644\u0647 \u0631\u0641\u0644.\n    \u062d\u0627\u0648\u0644 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u0648\u0642\u0639 \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629.\nerror-swf-cors =\n    \u0641\u0634\u0644 Ruffle \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0645\u0644\u0641 \u0641\u0644\u0627\u0634 SWF.\n    \u0645\u0646 \u0627\u0644\u0645\u062d\u062a\u0645\u0644 \u0623\u0646 \u062a\u0645 \u062d\u0638\u0631 \u0625\u062d\u0636\u0627\u0631 \u0627\u0644\u0645\u0644\u0641 \u0628\u0648\u0627\u0633\u0637\u0629 \u0633\u064a\u0627\u0633\u0629 CORS.\n    \u0625\u0630\u0627 \u0643\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062e\u0627\u062f\u0645\u060c \u064a\u0631\u062c\u0649 \u0645\u0631\u0627\u062c\u0639\u0629 \u0631\u0641\u0644 \u0648\u064a\u0643\u064a \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629.\nerror-wasm-cors =\n    \u0641\u0634\u0644 Ruffle \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0645\u0643\u0648\u0646 \u0645\u0644\u0641 ".wasm" \u0627\u0644\u0645\u0637\u0644\u0648\u0628.\n    \u0645\u0646 \u0627\u0644\u0645\u062d\u062a\u0645\u0644 \u0623\u0646 \u062a\u0645 \u062d\u0638\u0631 \u0625\u062d\u0636\u0627\u0631 \u0627\u0644\u0645\u0644\u0641 \u0628\u0648\u0627\u0633\u0637\u0629 \u0633\u064a\u0627\u0633\u0629 CORS.\n    \u0625\u0630\u0627 \u0643\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062e\u0627\u062f\u0645\u060c \u064a\u0631\u062c\u0649 \u0645\u0631\u0627\u062c\u0639\u0629 \u0631\u0641\u0644 \u0648\u064a\u0643\u064a \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629.\nerror-wasm-invalid =\n    \u0648\u0627\u062c\u0647 Ruffle \u0645\u0634\u0643\u0644\u0629 \u0643\u0628\u064a\u0631\u0629 \u0623\u062b\u0646\u0627\u0621 \u0645\u062d\u0627\u0648\u0644\u0629 \u0627\u0644\u062a\u0647\u064a\u0626\u0629.\n    \u064a\u0628\u062f\u0648 \u0623\u0646 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 \u062a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u0645\u0644\u0641\u0627\u062a \u0645\u0641\u0642\u0648\u062f\u0629 \u0623\u0648 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d\u0629 \u0644\u062a\u0634\u063a\u064a\u0644 Ruffle.\n    \u0625\u0630\u0627 \u0643\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062e\u0627\u062f\u0645\u060c \u064a\u0631\u062c\u0649 \u0645\u0631\u0627\u062c\u0639\u0629 \u0648\u064a\u0643\u064a Ruffle \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629.\nerror-wasm-download =\n    \u0648\u0627\u062c\u0647 Ruffle \u0645\u0634\u0643\u0644\u0629 \u0643\u0628\u064a\u0631\u0629 \u0623\u062b\u0646\u0627\u0621 \u0645\u062d\u0627\u0648\u0644\u062a\u0647\u0627 \u0627\u0644\u062a\u0647\u064a\u0626\u0629.\n    \u0647\u0630\u0627 \u064a\u0645\u0643\u0646 \u0623\u0646 \u064a\u062d\u0644 \u0646\u0641\u0633\u0647 \u0641\u064a \u0643\u062b\u064a\u0631 \u0645\u0646 \u0627\u0644\u0623\u062d\u064a\u0627\u0646\u060c \u0644\u0630\u0644\u0643 \u064a\u0645\u0643\u0646\u0643 \u0645\u062d\u0627\u0648\u0644\u0629 \u0625\u0639\u0627\u062f\u0629 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0635\u0641\u062d\u0629.\n    \u0648\u0625\u0644\u0627 \u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0645\u062f\u064a\u0631 \u0627\u0644\u0645\u0648\u0642\u0639.\nerror-wasm-disabled-on-edge =\n    \u0641\u0634\u0644 Ruffle \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0645\u0643\u0648\u0646 \u0627\u0644\u0645\u0644\u0641 ".wasm" \u0627\u0644\u0645\u0637\u0644\u0648\u0628.\n    \u0644\u0625\u0635\u0644\u0627\u062d \u0647\u0630\u0647 \u0627\u0644\u0645\u0634\u0643\u0644\u0629\u060c \u062d\u0627\u0648\u0644 \u0641\u062a\u062d \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0645\u062a\u0635\u0641\u062d \u0627\u0644\u062e\u0627\u0635 \u0628\u0643\u060c \u0627\u0646\u0642\u0631 \u0641\u0648\u0642 "\u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629\u060c \u0627\u0644\u0628\u062d\u062b\u060c \u0627\u0644\u062e\u062f\u0645\u0627\u062a"\u060c \u0648\u0627\u0644\u062a\u0645\u0631\u064a\u0631 \u0644\u0623\u0633\u0641\u0644\u060c \u0648\u0625\u064a\u0642\u0627\u0641 "\u062a\u0639\u0632\u064a\u0632 \u0623\u0645\u0627\u0646\u0643 \u0639\u0644\u0649 \u0627\u0644\u0648\u064a\u0628".\n    \u0647\u0630\u0627 \u0633\u064a\u0633\u0645\u062d \u0644\u0644\u0645\u062a\u0635\u0641\u062d \u0627\u0644\u062e\u0627\u0635 \u0628\u0643 \u0628\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0644\u0641\u0627\u062a ".wasm" \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629.\n    \u0625\u0630\u0627 \u0627\u0633\u062a\u0645\u0631\u062a \u0627\u0644\u0645\u0634\u0643\u0644\u0629\u060c \u0642\u062f \u062a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0645\u062a\u0635\u0641\u062d \u0623\u062e\u0631.\nerror-javascript-conflict =\n    \u0648\u0627\u062c\u0647 Ruffle \u0645\u0634\u0643\u0644\u0629 \u0643\u0628\u064a\u0631\u0629 \u0623\u062b\u0646\u0627\u0621 \u0645\u062d\u0627\u0648\u0644\u0629 \u0627\u0644\u062a\u0647\u064a\u0626\u0629.\n    \u064a\u0628\u062f\u0648 \u0623\u0646 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 \u062a\u0633\u062a\u062e\u062f\u0645 \u0643\u0648\u062f JavaScript \u0627\u0644\u0630\u064a \u064a\u062a\u0639\u0627\u0631\u0636 \u0645\u0639 Ruffle.\n    \u0625\u0630\u0627 \u0643\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062e\u0627\u062f\u0645\u060c \u0641\u0625\u0646\u0646\u0627 \u0646\u062f\u0639\u0648\u0643 \u0625\u0644\u0649 \u0645\u062d\u0627\u0648\u0644\u0629 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0644\u0641 \u0639\u0644\u0649 \u0635\u0641\u062d\u0629 \u0641\u0627\u0631\u063a\u0629.\nerror-javascript-conflict-outdated = \u064a\u0645\u0643\u0646\u0643 \u0623\u064a\u0636\u064b\u0627 \u0645\u062d\u0627\u0648\u0644\u0629 \u062a\u062d\u0645\u064a\u0644 \u0646\u0633\u062e\u0629 \u0623\u062d\u062f\u062b \u0645\u0646 \u0631\u0641\u0644 \u0627\u0644\u062a\u064a \u0642\u062f \u062a\u062d\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 (\u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0642\u062f\u064a\u0645\u0629: { $buildDate }).\nerror-csp-conflict =\n    \u0648\u0627\u062c\u0647 Ruffle \u0645\u0634\u0643\u0644\u0629 \u0643\u0628\u064a\u0631\u0629 \u0623\u062b\u0646\u0627\u0621 \u0645\u062d\u0627\u0648\u0644\u0629 \u0627\u0644\u062a\u0647\u064a\u0626\u0629.\n    \u0644\u0627 \u062a\u0633\u0645\u062d \u0633\u064a\u0627\u0633\u0629 \u0623\u0645\u0627\u0646 \u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0644\u062e\u0627\u062f\u0645 \u0627\u0644\u0648\u064a\u0628 \u0647\u0630\u0627 \u0628\u062a\u0634\u063a\u064a\u0644 \u0645\u0643\u0648\u0646 ".wasm" \u0627\u0644\u0645\u0637\u0644\u0648\u0628.\n    \u0625\u0630\u0627 \u0643\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062e\u0627\u062f\u0645\u060c \u064a\u0631\u062c\u0649 \u0627\u0644\u0631\u062c\u0648\u0639 \u0625\u0644\u0649 \u0648\u064a\u0643\u064a Ruffle \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629.\nerror-unknown =\n    \u0648\u0627\u062c\u0647 Ruffle \u0645\u0634\u0643\u0644\u0629 \u0643\u0628\u064a\u0631\u0629 \u0623\u062b\u0646\u0627\u0621 \u0645\u062d\u0627\u0648\u0644\u0629 \u0639\u0631\u0636 \u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u0641\u0644\u0627\u0634 \u0647\u0630\u0627.\n    { $outdated ->\n        [true] \u0625\u0630\u0627 \u0643\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u062e\u0627\u062f\u0645\u060c \u0627\u0644\u0631\u062c\u0627\u0621 \u0645\u062d\u0627\u0648\u0644\u0629 \u062a\u062d\u0645\u064a\u0644 \u0625\u0635\u062f\u0627\u0631 \u0623\u062d\u062f\u062b \u0645\u0646 Ruffle (\u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0642\u062f\u064a\u0645\u0629: { $buildDate }).\n       *[false] \u0644\u064a\u0633 \u0645\u0646 \u0627\u0644\u0645\u0641\u062a\u0631\u0636 \u0623\u0646 \u064a\u062d\u062f\u062b \u0647\u0630\u0627\u060c \u0644\u0630\u0644\u0643 \u0646\u062d\u0646 \u0646\u0642\u062f\u0631 \u062d\u0642\u064b\u0627 \u0625\u0630\u0627 \u0642\u0645\u062a \u0628\u0627\u0644\u062a\u0628\u0644\u064a\u063a \u0639\u0646 \u0627\u0644\u062e\u0637\u0623!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = \u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0623\u0646\u0643 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0645\u0644\u0641 \u0627\u0644\u062d\u0641\u0638 \u0647\u0630\u0627\u061f\nsave-reload-prompt =\n    \u0627\u0644\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u0648\u062d\u064a\u062f\u0629 \u0644\u0640 { $action ->\n        [delete] \u062d\u0630\u0641\n       *[replace] \u0627\u0633\u062a\u0628\u062f\u0627\u0644\n    } \u0647\u0630\u0627 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u062d\u0641\u0638 \u062f\u0648\u0646 \u062a\u0639\u0627\u0631\u0636 \u0645\u062d\u062a\u0645\u0644 \u0647\u064a \u0644\u0625\u0639\u0627\u062f\u0629 \u062a\u062d\u0645\u064a\u0644 \u0647\u0630\u0627 \u0627\u0644\u0645\u062d\u062a\u0648\u0649. \u0647\u0644 \u062a\u0631\u063a\u0628 \u0641\u064a \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0639\u0644\u0649 \u0623\u064a \u062d\u0627\u0644\u061f\nsave-download = \u062a\u062d\u0645\u064a\u0644\nsave-replace = \u0627\u0633\u062a\u0628\u062f\u0627\u0644\nsave-delete = \u062d\u0630\u0641\nsave-backup-all = \u062a\u062d\u0645\u064a\u0644 \u062c\u0645\u064a\u0639 \u0645\u0644\u0641\u0627\u062a \u0627\u0644\u062d\u0641\u0638\n',
						'volume-controls.ftl':
							'volume-controls = \u0627\u0644\u062a\u062d\u0643\u0645 \u0628\u0627\u0644\u0635\u0648\u062a\nvolume-controls-mute = \u0643\u062a\u0645\nvolume-controls-volume = \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0635\u0648\u062a\n',
					},
					'ca-ES': {
						'context_menu.ftl':
							"context-menu-download-swf = Baixa el fitxer .swf\ncontext-menu-copy-debug-info = Copia la informaci\xf3 de depuraci\xf3\ncontext-menu-open-save-manager = Obre el gestor d'emmagatzematge\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Quant a l'extensi\xf3 de Ruffle ({ $version })\n       *[other] Quant a Ruffle ({ $version })\n    }\ncontext-menu-hide = Amaga aquest men\xfa\ncontext-menu-exit-fullscreen = Surt de la pantalla completa\ncontext-menu-enter-fullscreen = Pantalla completa\ncontext-menu-volume-controls = Controls de volum\n",
						'messages.ftl':
							"message-cant-embed =\n    Ruffle no ha pogut executar el contingut Flash incrustat en aquesta p\xe0gina.\n    Podeu provar d'obrir el fitxer en una pestanya a part per evitar aquest problema.\npanic-title = Alguna cosa ha fallat :(\nmore-info = M\xe9s informaci\xf3\nrun-anyway = Reprodueix igualment\ncontinue = Continua\nreport-bug = Informa d'un error\nupdate-ruffle = Actualitza Ruffle\nruffle-demo = Demostraci\xf3 web\nruffle-desktop = Aplicaci\xf3 d'escriptori\nruffle-wiki = Obre la wiki de Ruffle\nenable-hardware-acceleration = Sembla que l'acceleraci\xf3 per maquinari no est\xe0 activada. Tot i que Ruffle podria funcionar, \xe9s probable que ho faci molt lentament. Pots trobar informaci\xf3 sobre com activar l'acceleraci\xf3 per maquinari al seg\xfcent enlla\xe7.\nview-error-details = Mostra detalls de l'error\nopen-in-new-tab = Obre en una pestanya nova\nclick-to-unmute = Feu clic per activar el so\nerror-file-protocol =\n    Sembla que esteu executant Ruffle al protocol \"file:\".\n    Aix\xf2 no funcionar\xe0 perqu\xe8 els navegadors bloquegen moltes caracter\xedstiques per raons de seguretat. En comptes d'aix\xf2, us suggerim que configureu un servidor local o b\xe9 utilitzeu la demostraci\xf3 web o l'aplicaci\xf3 d'escriptori.\nerror-javascript-config =\n    Ruffle ha topat amb un problema greu a causa d'una configuraci\xf3 JavaScript err\xf2nia.\n    Si sou l'administrador del servidor, us suggerim que comproveu els detalls de l'error per determinar el par\xe0metre culpable.\n    Tamb\xe9 podeu consultar la wiki del Ruffle per obtenir ajuda.\nerror-wasm-not-found =\n    Ruffle no ha pogut carregar el component de fitxer \".wasm\" necessari.\n    Si sou l'administrador del servidor, si us plau, comproveu que el fitxer ha estat carregat correctament.\n    Si el problema continua, \xe9s possible que h\xe0giu d'utilitzar el par\xe1metre \"publicPath\": us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-wasm-mime-type =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Aquest servidor no est\xe0 servint els fitxers \".wasm\" amb el tipus MIME adequat.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-invalid-swf =\n    Ruffle no ha pogut llegir el fitxer sol\xb7licitat.\n    La ra\xf3 m\xe9s probable \xe9s que no sigui un fitxer SWF v\xe0lid.\nerror-swf-fetch =\n    Ruffle no ha pogut carregar el fitxer SWF Flash.\n    La ra\xf3 m\xe9s probable \xe9s que el fitxer ja no existeixi, aix\xed que no hi ha res que el Ruffle pugui carregar.\n    Proveu de contactar a l'administrador del lloc per obtenir ajuda.\nerror-swf-cors =\n    Ruffle no ha pogut carregar el fitxer SWF Flash.\n    \xc9s probable que l'acc\xe9s a la c\xe0rrega hagi estat denegat per una pol\xedtica CORS.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki del Ruffle per obtenir ajuda.\nerror-wasm-cors =\n    Ruffle no ha pogut carregar el component de fitxer \".wasm\" necessari.\n    \xc9s probable que l'acc\xe9s a la c\xe0rrega hagi estat denegat per una pol\xedtica CORS.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki del Ruffle per obtenir ajuda.\nerror-wasm-invalid =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Sembla que a aquest lloc li manquen fitxers o aquests no s\xf3n v\xe0lids per a l'execuci\xf3 de Ruffle.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-wasm-download =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Aix\xf2 sovint aix\xf2 pot resoldre's sol, aix\xed que podeu provar de recarregar la p\xe0gina.\n    En cas contrari, us preguem que contacteu l'administrador del lloc.\nerror-wasm-disabled-on-edge =\n    Ruffle no ha pogut carregar el component de fitxer \".wasm\" necessari.\n    Per a arreglar-ho, proveu d'obrir els par\xe0metres del navegador, feu clic sobre \"Privadesa, cerca i serveis\", i desactiveu \"Prevenci\xf3 de seguiment\".\n    Aix\xf2 permetr\xe0 que el vostre navegador carregui els fitxers \".wasm\" necessaris.\n    Si el problema continua, possiblement haureu d'utilitzar un altre navegador.\nerror-javascript-conflict =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Sembla que aquest lloc fa servir codi JavaScript que entra en conflicte amb Ruffle.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-javascript-conflict-outdated = Tamb\xe9 podeu provar de carregar una versi\xf3 m\xe9s recent de Ruffle que podria resoldre el problema (la compilaci\xf3 actual est\xe0 desactualitzada: { $buildDate }).\nerror-csp-conflict =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    La pol\xedtica de seguretat del contingut (CSP) no permet l'execuci\xf3 del component \".wasm\" necessari.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-unknown =\n    Ruffle ha topat amb un problema greu mentre provava de mostrar aquest contingut Flash.\n    { $outdated ->\n        [true] Si sou l'administrador del servidor, us preguem que proveu de carregar una versi\xf3 m\xe9s recent de Ruffle (la compilaci\xf3 actual est\xe0 desactualitzada: { $buildDate }).\n       *[false] Aix\xf2 no hauria d'haver passat, aix\xed que us agrair\xedem molt que n'inform\xe9ssiu l'error!\n    }\n",
						'save-manager.ftl':
							"save-delete-prompt = Segur que vols esborrar aquest fitxer desat?\nsave-reload-prompt =\n    L'\xfanica forma d{ $action ->\n        [delete] 'eliminar\n       *[replace] e substituir\n    } aquest fitxer desat sense crear un potencial conflicte \xe9s recarregant el contingut. Voleu continuar igualment?\nsave-download = Baixa\nsave-replace = Substitueix\nsave-delete = Elimina\nsave-backup-all = Baixa tots els fitxers desats\n",
						'volume-controls.ftl': 'volume-controls = Controls de volum\nvolume-controls-mute = Silenci\nvolume-controls-volume = Volum\n',
					},
					'cs-CZ': {
						'context_menu.ftl':
							'context-menu-download-swf = St\xe1hnout .swf\ncontext-menu-copy-debug-info = Zkop\xedrovat debug info\ncontext-menu-open-save-manager = Otev\u0159\xedt spr\xe1vce ulo\u017een\xed\ncontext-menu-about-ruffle =\n    { $flavor ->\n         [extension] O Ruffle roz\u0161\xed\u0159en\xed ({ $version })\n        *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Skr\xfdt menu\ncontext-menu-exit-fullscreen = Ukon\u010dit re\u017eim cel\xe9 obrazovky\ncontext-menu-enter-fullscreen = P\u0159ej\xedt do re\u017eimu cel\xe9 obrazovky\ncontext-menu-volume-controls = Ovl\xe1d\xe1n\xed hlasitosti\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle nemohl spustit Flash vlo\u017een\xfd na t\xe9to str\xe1nce.\n    M\u016f\u017eete se pokusit otev\u0159\xedt soubor na samostatn\xe9 kart\u011b, abyste se vyhnuli tomuto probl\xe9mu.\npanic-title = N\u011bco se pokazilo :(\nmore-info = Dal\u0161\xed informace\nrun-anyway = P\u0159esto spustit\ncontinue = Pokra\u010dovat\nreport-bug = Nahl\xe1sit chybu\nupdate-ruffle = Aktualizovat Ruffle\nruffle-demo = Web Demo\nruffle-desktop = Desktopov\xe1 aplikace\nruffle-wiki = Zobrazit Ruffle Wiki\nenable-hardware-acceleration = Zd\xe1 se, \u017ee hardwarov\xe1 akcelerace nen\xed povolena. I kdy\u017e Ruffle funguje spr\xe1vn\u011b, m\u016f\u017ee b\xfdt nep\u0159im\u011b\u0159en\u011b pomal\xfd. Jak povolit hardwarovou akceleraci zjist\xedte na tomto odkazu.\nview-error-details = Zobrazit podrobnosti o chyb\u011b\nopen-in-new-tab = Otev\u0159\xedt na nov\xe9 kart\u011b\nclick-to-unmute = Kliknut\xedm zru\u0161\xedte ztlumen\xed\nerror-file-protocol =\n    Zd\xe1 se, \u017ee pou\u017e\xedv\xe1te Ruffle na protokolu "file:".\n    To nen\xed mo\u017en\xe9, proto\u017ee prohl\xed\u017ee\u010de blokuj\xed fungov\xe1n\xed mnoha funkc\xed z bezpe\u010dnostn\xedch d\u016fvod\u016f.\n    Nam\xedsto toho v\xe1m doporu\u010dujeme nastavit lok\xe1ln\xed server nebo pou\u017e\xedt web demo \u010di desktopovou aplikaci.\nerror-javascript-config =\n    Ruffle narazil na probl\xe9m v d\u016fsledku nespr\xe1vn\xe9 konfigurace JavaScriptu.\n    Pokud jste spr\xe1vcem serveru, doporu\u010dujeme v\xe1m zkontrolovat podrobnosti o chyb\u011b, abyste zjistili, kter\xfd parametr je vadn\xfd.\n    Pomoc m\u016f\u017eete z\xedskat tak\xe9 na wiki Ruffle.\nerror-wasm-not-found =\n    Ruffle se nepoda\u0159ilo na\u010d\xedst po\u017eadovanou komponentu souboru \u201e.wasm\u201c.\n    Pokud jste spr\xe1vcem serveru, zkontrolujte, zda byl soubor spr\xe1vn\u011b nahr\xe1n.\n    Pokud probl\xe9m p\u0159etrv\xe1v\xe1, mo\u017en\xe1 budete muset pou\u017e\xedt nastaven\xed \u201epublicPath\u201c: pomoc naleznete na wiki Ruffle.\nerror-wasm-mime-type =\n    Ruffle narazil na probl\xe9m p\u0159i pokusu o inicializaci.\n    Tento webov\xfd server neposkytuje soubory \u201e.wasm\u201c se spr\xe1vn\xfdm typem MIME.\n    Pokud jste spr\xe1vcem serveru, n\xe1pov\u011bdu najdete na Ruffle wiki.\nerror-invalid-swf =\n    Ruffle nem\u016f\u017ee zpracovat po\u017eadovan\xfd soubor.\n    Nejpravd\u011bpodobn\u011bj\u0161\xedm d\u016fvodem je, \u017ee po\u017eadovan\xfd soubor nen\xed platn\xfdm souborem SWF.\nerror-swf-fetch =\n    Ruffle se nepoda\u0159ilo na\u010d\xedst SWF soubor Flash.\n    Nejpravd\u011bpodobn\u011bj\u0161\xedm d\u016fvodem je, \u017ee soubor ji\u017e neexistuje, tak\u017ee Ruffle nem\xe1 co na\u010d\xedst.\n    Zkuste po\u017e\xe1dat o pomoc spr\xe1vce webu.\nerror-swf-cors =\n    Ruffle se nepoda\u0159ilo na\u010d\xedst SWF soubor Flash.\n    P\u0159\xedstup k na\u010d\xedt\xe1n\xed byl pravd\u011bpodobn\u011b zablokov\xe1n politikou CORS.\n    Pokud jste spr\xe1vcem serveru, n\xe1pov\u011bdu najdete na Ruffle wiki.\nerror-wasm-cors =\n    Ruffle se nepoda\u0159ilo na\u010d\xedst po\u017eadovanou komponentu souboru \u201e.wasm\u201c.\n    P\u0159\xedstup k na\u010d\xedt\xe1n\xed byl pravd\u011bpodobn\u011b zablokov\xe1n politikou CORS.\n    Pokud jste spr\xe1vcem serveru, n\xe1pov\u011bdu najdete na Ruffle wiki.\nerror-wasm-invalid =\n    Ruffle narazil na probl\xe9m p\u0159i pokusu o inicializaci.\n    Zd\xe1 se, \u017ee na t\xe9to str\xe1nce chyb\xed nebo jsou neplatn\xe9 soubory ke spu\u0161t\u011bn\xed Ruffle.\n    Pokud jste spr\xe1vcem serveru, n\xe1pov\u011bdu najdete na Ruffle wiki.\nerror-wasm-download =\n    Ruffle narazil na probl\xe9m p\u0159i pokusu o inicializaci.\n    Probl\xe9m se m\u016f\u017ee vy\u0159e\u0161it i s\xe1m, tak\u017ee m\u016f\u017eete zkusit str\xe1nku na\u010d\xedst znovu.\n    V opa\u010dn\xe9m p\u0159\xedpad\u011b kontaktujte administr\xe1tora str\xe1nky.\nerror-wasm-disabled-on-edge =\n    Ruffle se nepoda\u0159ilo na\u010d\xedst po\u017eadovanou komponentu souboru \u201e.wasm\u201c.\n    Chcete-li tento probl\xe9m vy\u0159e\u0161it, zkuste otev\u0159\xedt nastaven\xed prohl\xed\u017ee\u010de, klikn\u011bte na polo\u017eku \u201eOchrana osobn\xedch \xfadaj\u016f, vyhled\xe1v\xe1n\xed a slu\u017eby\u201c, p\u0159ejd\u011bte dol\u016f a vypn\u011bte mo\u017enost \u201eZvy\u0161te svou bezpe\u010dnost na webu\u201c.\n    Va\u0161emu prohl\xed\u017ee\u010di to umo\u017en\xed na\u010d\xedst po\u017eadovan\xe9 soubory \u201e.wasm\u201c.\n    Pokud probl\xe9m p\u0159etrv\xe1v\xe1, budete mo\u017en\xe1 muset pou\u017e\xedt jin\xfd prohl\xed\u017ee\u010d.\nerror-javascript-conflict =\n    Ruffle narazil na probl\xe9m p\u0159i pokusu o inicializaci.\n    Zd\xe1 se, \u017ee tato str\xe1nka pou\u017e\xedv\xe1 k\xf3d JavaScript, kter\xfd je v konfliktu s Ruffle.\n    Pokud jste spr\xe1vcem serveru, doporu\u010dujeme v\xe1m zkusit na\u010d\xedst soubor na pr\xe1zdnou str\xe1nku.\nerror-javascript-conflict-outdated = M\u016f\u017eete se tak\xe9 pokusit nahr\xe1t nov\u011bj\u0161\xed verzi Ruffle, kter\xe1 m\u016f\u017ee dan\xfd probl\xe9m vy\u0159e\u0161it (aktu\xe1ln\xed build je zastaral\xfd: { $buildDate }).\nerror-csp-conflict =\n    Ruffle narazil na probl\xe9m p\u0159i pokusu o inicializaci.\n    Z\xe1sady zabezpe\u010den\xed obsahu tohoto webov\xe9ho serveru nepovoluj\xed spu\u0161t\u011bn\xed po\u017eadovan\xe9 komponenty \u201e.wasm\u201c.\n    Pokud jste spr\xe1vcem serveru, n\xe1pov\u011bdu najdete na Ruffle wiki.\nerror-unknown =\n    Ruffle narazil na probl\xe9m p\u0159i pokusu zobrazit tento Flash obsah.\n    { $outdated ->\n          [true] Pokud jste spr\xe1vcem serveru, zkuste nahr\xe1t nov\u011bj\u0161\xed verzi Ruffle (aktu\xe1ln\xed build je zastaral\xfd: { $buildDate }).\n         *[false] Toto by se nem\u011blo st\xe1t, tak\u017ee bychom opravdu ocenili, kdybyste mohli nahl\xe1sit chybu!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Opravdu chcete odstranit tento soubor s ulo\u017een\xfdmi pozicemi?\nsave-reload-prompt =\n    Jedin\xfd zp\u016fsob, jak { $action ->\n          [delete] vymazat\n         *[replace] nahradit\n    } tento soubor s ulo\u017een\xfdmi pozicemi bez potenci\xe1ln\xedho konfliktu je op\u011btovn\xe9 na\u010dten\xed tohoto obsahu. Chcete p\u0159esto pokra\u010dovat?\nsave-download = St\xe1hnout\nsave-replace = Nahradit\nsave-delete = Vymazat\nsave-backup-all = St\xe1hnout v\u0161echny soubory s ulo\u017een\xfdmi pozicemi\n',
						'volume-controls.ftl': 'volume-controls = Ovl\xe1d\xe1n\xed hlasitosti\nvolume-controls-mute = Ztlumit\nvolume-controls-volume = Hlasitost\n',
					},
					'de-DE': {
						'context_menu.ftl':
							'context-menu-download-swf = .swf herunterladen\ncontext-menu-copy-debug-info = Debug-Info kopieren\ncontext-menu-open-save-manager = Dateimanager \xf6ffnen\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] \xdcber Ruffle Erweiterung ({ $version })\n       *[other] \xdcber Ruffle ({ $version })\n    }\ncontext-menu-hide = Men\xfc ausblenden\ncontext-menu-exit-fullscreen = Vollbild verlassen\ncontext-menu-enter-fullscreen = Vollbildmodus aktivieren\ncontext-menu-volume-controls = Lautst\xe4rke einstellen\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle konnte den Flash in dieser Seite nicht ausf\xfchren.\n    Du kannst versuchen, die Datei in einem separaten Tab zu \xf6ffnen, um dieses Problem zu umgehen.\npanic-title = Etwas ist schief gelaufen\nmore-info = Weitere Informationen\nrun-anyway = Trotzdem ausf\xfchren\ncontinue = Fortfahren\nreport-bug = Fehler melden\nupdate-ruffle = Ruffle aktuallisieren\nruffle-demo = Web-Demo\nruffle-desktop = Desktop-Anwendung\nruffle-wiki = Ruffle-Wiki anzeigen\nenable-hardware-acceleration = Es scheint, als w\xe4re die Hardwarebeschleunigung nicht aktiv. Zwar wird Ruffle funktionieren, jedoch unn\xf6tig langsam. \xdcber den Link kannst du erfahren, wie man die Hardwarebeschleunigung aktiviert.\nview-error-details = Fehlerdetails anzeigen\nopen-in-new-tab = In einem neuen Tab \xf6ffnen\nclick-to-unmute = Klicke zum Entmuten\nerror-file-protocol =\n    Es scheint, dass Sie Ruffle auf dem "file:"-Protokoll ausf\xfchren.\n    Jedoch werden aus Sicherheitsgr\xfcnden viele Funktionen vom Browser blockiert, weswegen die Datei nicht geladen werden kann.\n    Setzen Sie stattdessen einen lokalen Server auf, verwenden Sie die Webdemo oder die Desktop-Anwendung.\nerror-javascript-config =\n    Ruffle ist aufgrund einer falschen JavaScript-Konfiguration auf ein Problem gesto\xdfen.\n    Wenn du der Server-Administrator bist, laden wir dich ein, die Fehlerdetails zu \xfcberpr\xfcfen, um herauszufinden, welcher Parameter fehlerhaft ist.\n    Sie k\xf6nnen auch das Ruffle-Wiki f\xfcr Hilfe konsultieren.\nerror-wasm-not-found =\n    Ruffle konnte die erforderliche ".wasm"-Datei-Komponente nicht laden.\n    Wenn Sie der Server-Administrator sind, stellen Sie bitte sicher, dass die Datei korrekt hochgeladen wurde.\n    Wenn das Problem weiterhin besteht, m\xfcssen Sie unter Umst\xe4nden die "publicPath"-Einstellung verwenden: Bitte konsultieren Sie das Ruffle-Wiki f\xfcr Hilfe.\nerror-wasm-mime-type =\n    Ruffle ist auf ein Fehler beim Initialisieren gesto\xdfen.\n    Dieser Webserver dient nicht ". asm"-Dateien mit dem korrekten MIME-Typ.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki f\xfcr Hilfe.\nerror-invalid-swf =\n    Ruffle konnte die angegebene Datei nicht lesen.\n    Am wahrscheinlichsten ist die angegebene Datei keine g\xfcltige SWF.\nerror-swf-fetch =\n    Ruffle konnte die Flash-SWF-Datei nicht laden.\n    Der wahrscheinlichste Grund ist, dass die Datei nicht mehr existiert, so dass Ruffle nicht geladen werden kann.\n    Kontaktieren Sie den Website-Administrator f\xfcr Hilfe.\nerror-swf-cors =\n    Ruffle konnte die Flash-SWF-Datei nicht laden.\n    Der Zugriff auf den Abruf wurde wahrscheinlich durch die CORS-Richtlinie blockiert.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki f\xfcr Hilfe.\nerror-wasm-cors =\n    Ruffle konnte die Flash-SWF-Datei nicht laden.\n    Der Zugriff auf den Abruf wurde wahrscheinlich durch die CORS-Richtlinie blockiert.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki f\xfcr Hilfe.\nerror-wasm-invalid =\n    Ruffle ist auf ein Fehler beim Initialisieren gesto\xdfen.\n    Dieser Webserver dient nicht ". asm"-Dateien mit dem korrekten MIME-Typ.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki f\xfcr Hilfe.\nerror-wasm-download =\n    Ruffle ist auf ein Fehler beim Initialisieren gesto\xdfen.\n    Dies kann sich oft selbst beheben, so dass Sie versuchen k\xf6nnen, die Seite neu zu laden.\n    Andernfalls kontaktieren Sie bitte den Website-Administrator.\nerror-wasm-disabled-on-edge =\n    Ruffle konnte die erforderliche ".wasm"-Datei-Komponente nicht laden.\n    Um dies zu beheben, versuche die Einstellungen deines Browsers zu \xf6ffnen, klicke auf "Privatsph\xe4re, Suche und Dienste", scrollen nach unten und schalte "Verbessere deine Sicherheit im Web" aus.\n    Dies erlaubt Ihrem Browser die erforderlichen ".wasm"-Dateien zu laden.\n    Wenn das Problem weiterhin besteht, m\xfcssen Sie m\xf6glicherweise einen anderen Browser verwenden.\nerror-javascript-conflict =\n    Ruffle ist auf ein Fehler beim Initialisieren gesto\xdfen.\n    Es scheint, als ob diese Seite JavaScript-Code verwendet, der mit Ruffle kollidiert.\n    Wenn Sie der Server-Administrator sind, laden wir Sie ein, die Datei auf einer leeren Seite zu laden.\nerror-javascript-conflict-outdated = Du kannst auch versuchen, eine neuere Version von Ruffle hochzuladen, die das Problem umgehen k\xf6nnte (aktuelle Version ist veraltet: { $buildDate }).\nerror-csp-conflict =\n    Ruffle ist auf ein Fehler beim Initialisieren gesto\xdfen.\n    Dieser Webserver dient nicht ". asm"-Dateien mit dem korrekten MIME-Typ.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki f\xfcr Hilfe.\nerror-unknown =\n    Bei dem Versuch, diesen Flash-Inhalt anzuzeigen, ist Ruffle auf ein gro\xdfes Problem gesto\xdfen.\n    { $outdated ->\n        [true] Wenn Sie der Server-Administrator sind, Bitte versuchen Sie, eine neuere Version von Ruffle hochzuladen (aktuelle Version ist veraltet: { $buildDate }).\n       *[false] Dies soll nicht passieren, deshalb w\xfcrden wir uns sehr dar\xfcber freuen, wenn Sie einen Fehler melden k\xf6nnten!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Sind Sie sicher, dass Sie diese Speicherdatei l\xf6schen m\xf6chten?\nsave-reload-prompt =\n    Der einzige Weg zu { $action ->\n        [delete] l\xf6schen\n       *[replace] ersetzen\n    } diese Speicherdatei ohne m\xf6glichen Konflikt ist das erneute Laden dieses Inhalts. M\xf6chten Sie trotzdem fortfahren?\nsave-download = Herunterladen\nsave-replace = Ersetzen\nsave-delete = L\xf6schen\nsave-backup-all = Alle gespeicherten Dateien herunterladen\n',
						'volume-controls.ftl': 'volume-controls = Lautst\xe4rkeeinstellungen\nvolume-controls-mute = Stummschalten\nvolume-controls-volume = Lautst\xe4rke\n',
					},
					'en-US': {
						'context_menu.ftl':
							'context-menu-download-swf = Download .swf\ncontext-menu-copy-debug-info = Copy debug info\ncontext-menu-open-save-manager = Open Save Manager\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] About Ruffle Extension ({$version})\n        *[other] About Ruffle ({$version})\n    }\ncontext-menu-hide = Hide this menu\ncontext-menu-exit-fullscreen = Exit fullscreen\ncontext-menu-enter-fullscreen = Enter fullscreen\ncontext-menu-volume-controls = Volume controls\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle wasn\'t able to run the Flash embedded in this page.\n    You can try to open the file in a separate tab, to sidestep this issue.\npanic-title = Something went wrong :(\nmore-info = More info\nrun-anyway = Run anyway\ncontinue = Continue\nreport-bug = Report Bug\nupdate-ruffle = Update Ruffle\nruffle-demo = Web Demo\nruffle-desktop = Desktop Application\nruffle-wiki = View Ruffle Wiki\nenable-hardware-acceleration = It looks like hardware acceleration is not enabled. While Ruffle may work, it could be unreasonably slow. You can find out how to enable hardware acceleration by following this link.\nview-error-details = View Error Details\nopen-in-new-tab = Open in a new tab\nclick-to-unmute = Click to unmute\nerror-file-protocol =\n    It appears you are running Ruffle on the "file:" protocol.\n    This doesn\'t work as browsers block many features from working for security reasons.\n    Instead, we invite you to setup a local server or either use the web demo or the desktop application.\nerror-javascript-config =\n    Ruffle has encountered a major issue due to an incorrect JavaScript configuration.\n    If you are the server administrator, we invite you to check the error details to find out which parameter is at fault.\n    You can also consult the Ruffle wiki for help.\nerror-wasm-not-found =\n    Ruffle failed to load the required ".wasm" file component.\n    If you are the server administrator, please ensure the file has correctly been uploaded.\n    If the issue persists, you may need to use the "publicPath" setting: please consult the Ruffle wiki for help.\nerror-wasm-mime-type =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    This web server is not serving ".wasm" files with the correct MIME type.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-invalid-swf =\n    Ruffle cannot parse the requested file.\n    The most likely reason is that the requested file is not a valid SWF.\nerror-swf-fetch =\n    Ruffle failed to load the Flash SWF file.\n    The most likely reason is that the file no longer exists, so there is nothing for Ruffle to load.\n    Try contacting the website administrator for help.\nerror-swf-cors =\n    Ruffle failed to load the Flash SWF file.\n    Access to fetch has likely been blocked by CORS policy.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-wasm-cors =\n    Ruffle failed to load the required ".wasm" file component.\n    Access to fetch has likely been blocked by CORS policy.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-wasm-invalid =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    It seems like this page has missing or invalid files for running Ruffle.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-wasm-download =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    This can often resolve itself, so you can try reloading the page.\n    Otherwise, please contact the website administrator.\nerror-wasm-disabled-on-edge =\n    Ruffle failed to load the required ".wasm" file component.\n    To fix this, try opening your browser\'s settings, clicking "Privacy, search, and services", scrolling down, and turning off "Enhance your security on the web".\n    This will allow your browser to load the required ".wasm" files.\n    If the issue persists, you might have to use a different browser.\nerror-javascript-conflict =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    It seems like this page uses JavaScript code that conflicts with Ruffle.\n    If you are the server administrator, we invite you to try loading the file on a blank page.\nerror-javascript-conflict-outdated = You can also try to upload a more recent version of Ruffle that may circumvent the issue (current build is outdated: {$buildDate}).\nerror-csp-conflict =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    This web server\'s Content Security Policy does not allow the required ".wasm" component to run.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-unknown =\n    Ruffle has encountered a major issue whilst trying to display this Flash content.\n    {$outdated ->\n        [true] If you are the server administrator, please try to upload a more recent version of Ruffle (current build is outdated: {$buildDate}).\n        *[false] This isn\'t supposed to happen, so we\'d really appreciate if you could file a bug!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Are you sure you want to delete this save file?\nsave-reload-prompt =\n    The only way to {$action ->\n    [delete] delete\n    *[replace] replace\n    } this save file without potential conflict is to reload this content. Do you wish to continue anyway?\nsave-download = Download\nsave-replace = Replace\nsave-delete = Delete\nsave-backup-all = Download all save files',
						'volume-controls.ftl': 'volume-controls = Volume controls\nvolume-controls-mute = Mute\nvolume-controls-volume = Volume\n',
					},
					'es-ES': {
						'context_menu.ftl':
							'context-menu-download-swf = Descargar .swf\ncontext-menu-copy-debug-info = Copiar Informaci\xf3n de depuraci\xf3n\ncontext-menu-open-save-manager = Abrir gestor de guardado\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Sobre la extensi\xf3n de Ruffle ({ $version })\n       *[other] Sobre Ruffle ({ $version })\n    }\ncontext-menu-hide = Ocultar este men\xfa\ncontext-menu-exit-fullscreen = Salir de pantalla completa\ncontext-menu-enter-fullscreen = Entrar a pantalla completa\ncontext-menu-volume-controls = Controles de volumen\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle no pudo ejecutar el Flash incrustado en esta p\xe1gina.\n    Puedes intentar abrir el archivo en una pesta\xf1a aparte, para evitar este problema.\npanic-title = Algo sali\xf3 mal :(\nmore-info = M\xe1s info\nrun-anyway = Ejecutar de todos modos\ncontinue = Continuar\nreport-bug = Reportar un Error\nupdate-ruffle = Actualizar Ruffle\nruffle-demo = Demostraci\xf3n de web\nruffle-desktop = Aplicaci\xf3n de Desktop\nruffle-wiki = Ver la p\xe1gina wiki\nenable-hardware-acceleration = Al parecer, la aceleraci\xf3n de hardware no esta habilitada. Puede que Ruffle funcione, pero ser\xe1 extremadamente lento. Puedes averiguar como habilitar la aceleraci\xf3n de hardware al entrar al enlace.\nview-error-details = Ver los detalles del error\nopen-in-new-tab = Abrir en una pesta\xf1a nueva\nclick-to-unmute = Haz clic para dejar de silenciar\nerror-file-protocol =\n    Parece que est\xe1 ejecutando Ruffle en el protocolo "archivo:".\n    Esto no funciona porque los navegadores bloquean que muchas caracter\xedsticas funcionen por razones de seguridad.\n    En su lugar, le invitamos a configurar un servidor local o bien usar la demostraci\xf3n web o la aplicaci\xf3n de desktop.\nerror-javascript-config =\n    Ruffle ha encontrado un problema cr\xedtico debido a una configuraci\xf3n JavaScript incorrecta.\n    Si usted es el administrador del servidor, le invitamos a comprobar los detalles del error para averiguar qu\xe9 par\xe1metro est\xe1 en falta.\n    Tambi\xe9n puedes consultar la wiki de Ruffle para obtener ayuda.\nerror-wasm-not-found =\n    Ruffle no pudo cargar el componente de archivo ".wasm" requerido.\n    Si usted es el administrador del servidor, aseg\xfarese de que el archivo ha sido subido correctamente.\n    Si el problema persiste, puede que necesite usar la configuraci\xf3n "publicPath": por favor consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-mime-type =\n    Ruffle ha encontrado un problema cr\xedtico al intentar inicializar.\n    Este servidor web no est\xe1 sirviendo archivos wasm" con el tipo MIME correcto.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-invalid-swf = Ruffle no puede analizar el archivo solicitado. La raz\xf3n m\xe1s probable es que no es un archivo v\xe1lido SWF.\nerror-swf-fetch =\n    Ruffle no pudo cargar el archivo Flash SWF.\n    La raz\xf3n m\xe1s probable es que el archivo ya no existe, as\xed que no hay nada para cargar Ruffle.\n    Intente ponerse en contacto con el administrador del sitio web para obtener ayuda.\nerror-swf-cors =\n    Ruffle no pudo cargar el archivo Flash SWF.\n    Es probable que el acceso a la b\xfasqueda haya sido bloqueado por la pol\xedtica CORS.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-cors =\n    Ruffle no pudo cargar el archivo ".wasm."\n    Es probable que el acceso a la b\xfasqueda o la llamada a la funci\xf3n fetch haya sido bloqueado por la pol\xedtica CORS.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-invalid =\n    Ruffle ha encontrado un problema cr\xedtico al intentar inicializar.\n    Este servidor web no est\xe1 sirviendo archivos wasm" con el tipo Mime correcto.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-download =\n    Ruffle ha encontrado un problema cr\xedtico mientras intentaba inicializarse.\n    Esto a menudo puede resolverse por s\xed mismo, as\xed que puede intentar recargar la p\xe1gina.\n    De lo contrario, p\xf3ngase en contacto con el administrador del sitio web.\nerror-wasm-disabled-on-edge =\n    Ruffle no pudo cargar el componente de archivo ".wasm" requerido.\n    Para solucionar esto, intenta abrir la configuraci\xf3n de tu navegador, haciendo clic en "Privacidad, b\xfasqueda y servicios", desplaz\xe1ndote y apagando "Mejore su seguridad en la web".\n    Esto permitir\xe1 a su navegador cargar los archivos ".wasm" necesarios.\n    Si el problema persiste, puede que tenga que utilizar un navegador diferente.\nerror-javascript-conflict =\n    Ruffle ha encontrado un problema cr\xedtico mientras intentaba inicializarse.\n    Parece que esta p\xe1gina utiliza c\xf3digo JavaScript que entra en conflicto con Ruffle.\n    Si usted es el administrador del servidor, le invitamos a intentar cargar el archivo en una p\xe1gina en blanco.\nerror-javascript-conflict-outdated = Tambi\xe9n puedes intentar subir una versi\xf3n m\xe1s reciente de Ruffle que puede eludir el problema (la versi\xf3n actual est\xe1 desactualizada: { $buildDate }).\nerror-csp-conflict =\n    Ruffle encontr\xf3 un problema al intentar inicializarse.\n    La Pol\xedtica de Seguridad de Contenido de este servidor web no permite el componente requerido ".wasm". \n    Si usted es el administrador del servidor, por favor consulta la wiki de Ruffle para obtener ayuda.\nerror-unknown =\n    Ruffle ha encontrado un problema al tratar de mostrar el contenido Flash.\n    { $outdated ->\n        [true] Si usted es el administrador del servidor, intenta cargar una version m\xe1s reciente de Ruffle (la version actual esta desactualizada: { $buildDate }).\n       *[false] Esto no deberia suceder! apreciariamos que reportes el error!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = \xbfEst\xe1 seguro de querer eliminar este archivo de guardado?\nsave-reload-prompt =\n    La \xfanica forma de { $action ->\n        [delete] eliminar\n       *[replace] sobreescribir\n    } este archivo de guardado sin conflictos potenciales es reiniciando el contenido. \xbfDesea continuar de todos modos?\nsave-download = Descargar\nsave-replace = Sobreescribir\nsave-delete = Borrar\nsave-backup-all = Borrar todos los archivos de guardado\n',
						'volume-controls.ftl': 'volume-controls = Controles de volumen\nvolume-controls-mute = Silenciar\nvolume-controls-volume = Volumen\n',
					},
					'fr-FR': {
						'context_menu.ftl':
							"context-menu-download-swf = T\xe9l\xe9charger en tant que .swf\ncontext-menu-copy-debug-info = Copier les infos de d\xe9bogage\ncontext-menu-open-save-manager = Ouvrir le gestionnaire de stockage\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] \xc0 propos de l'Extension Ruffle ({ $version })\n       *[other] \xc0 propos de Ruffle ({ $version })\n    }\ncontext-menu-hide = Masquer ce menu\ncontext-menu-exit-fullscreen = Sortir du mode plein \xe9cran\ncontext-menu-enter-fullscreen = Afficher en plein \xe9cran\ncontext-menu-volume-controls = Contr\xf4les du volume\n",
						'messages.ftl':
							"message-cant-embed =\n    Ruffle n'a pas \xe9t\xe9 en mesure de lire le fichier Flash int\xe9gr\xe9 dans cette page.\n    Vous pouvez essayer d'ouvrir le fichier dans un onglet isol\xe9, pour contourner le probl\xe8me.\npanic-title = Une erreur est survenue :(\nmore-info = Plus d'infos\nrun-anyway = Ex\xe9cuter quand m\xeame\ncontinue = Continuer\nreport-bug = Signaler le bug\nupdate-ruffle = Mettre \xe0 jour Ruffle\nruffle-demo = D\xe9mo en ligne\nruffle-desktop = Application de bureau\nruffle-wiki = Wiki de Ruffle\nenable-hardware-acceleration = Il semblerait que l'acc\xe9l\xe9ration mat\xe9rielle ne soit pas activ\xe9e. Cela n'emp\xeache g\xe9n\xe9ralement pas Ruffle de fonctionner, mais il peut \xeatre beaucoup plus lent. Vous pouvez trouver comment activer l'acc\xe9l\xe9ration mat\xe9rielle en suivant ce lien.\nview-error-details = D\xe9tails de l'erreur\nopen-in-new-tab = Ouvrir dans un nouvel onglet\nclick-to-unmute = Cliquez pour activer le son\nerror-file-protocol =\n    Il semblerait que vous ex\xe9cutiez Ruffle sur le protocole \"file:\".\n    Cela ne fonctionne pas car les navigateurs bloquent de nombreuses fonctionnalit\xe9s pour des raisons de s\xe9curit\xe9.\n    Nous vous invitons soit \xe0 configurer un serveur local, soit \xe0 utiliser la d\xe9mo en ligne ou l'application de bureau.\nerror-javascript-config =\n    Ruffle a rencontr\xe9 un probl\xe8me majeur en raison d'une configuration JavaScript incorrecte.\n    Si vous \xeates l'administrateur du serveur, nous vous invitons \xe0 v\xe9rifier les d\xe9tails de l'erreur pour savoir quel est le param\xe8tre en cause.\n    Vous pouvez \xe9galement consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-not-found =\n    Ruffle n'a pas r\xe9ussi \xe0 charger son fichier \".wasm\".\n    Si vous \xeates l'administrateur du serveur, veuillez vous assurer que ce fichier a bien \xe9t\xe9 mis en ligne.\n    Si le probl\xe8me persiste, il vous faudra peut-\xeatre utiliser le param\xe8tre \"publicPath\" : veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-mime-type =\n    Ruffle a rencontr\xe9 un probl\xe8me majeur durant sa phase d'initialisation.\n    Ce serveur web ne renvoie pas le bon type MIME pour les fichiers \".wasm\".\n    Si vous \xeates l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-invalid-swf =\n    Ruffle n'a pas \xe9t\xe9 en mesure de lire le fichier demand\xe9.\n    La raison la plus probable est que ce fichier n'est pas un SWF valide.\nerror-swf-fetch =\n    Ruffle n'a pas r\xe9ussi \xe0 charger le fichier Flash.\n    La raison la plus probable est que le fichier n'existe pas ou plus.\n    Vous pouvez essayer de prendre contact avec l'administrateur du site pour obtenir plus d'informations.\nerror-swf-cors =\n    Ruffle n'a pas r\xe9ussi \xe0 charger le fichier Flash.\n    La requ\xeate a probablement \xe9t\xe9 rejet\xe9e en raison de la configuration du CORS.\n    Si vous \xeates l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-cors =\n    Ruffle n'a pas r\xe9ussi \xe0 charger son fichier \".wasm\".\n    La requ\xeate a probablement \xe9t\xe9 rejet\xe9e en raison de la configuration du CORS.\n    Si vous \xeates l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-invalid =\n    Ruffle a rencontr\xe9 un probl\xe8me majeur durant sa phase d'initialisation.\n    Il semblerait que cette page comporte des fichiers manquants ou invalides pour ex\xe9cuter Ruffle.\n    Si vous \xeates l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-download =\n    Ruffle a rencontr\xe9 un probl\xe8me majeur durant sa phase d'initialisation.\n    Le probl\xe8me d\xe9tect\xe9 peut souvent se r\xe9soudre de lui-m\xeame, donc vous pouvez essayer de recharger la page.\n    Si le probl\xe8me persiste, veuillez prendre contact avec l'administrateur du site.\nerror-wasm-disabled-on-edge =\n    Ruffle n'a pas r\xe9ussi \xe0 charger son fichier \".wasm\".\n    Pour r\xe9soudre ce probl\xe8me, essayez d'ouvrir les param\xe8tres de votre navigateur et de cliquer sur \"Confidentialit\xe9, recherche et services\". Puis, vers le bas de la page, d\xe9sactivez l'option \"Am\xe9liorez votre s\xe9curit\xe9 sur le web\".\n    Cela permettra \xe0 votre navigateur de charger les fichiers \".wasm\".\n    Si le probl\xe8me persiste, vous devrez peut-\xeatre utiliser un autre navigateur.\nerror-javascript-conflict =\n    Ruffle a rencontr\xe9 un probl\xe8me majeur durant sa phase d'initialisation.\n    Il semblerait que cette page contienne du code JavaScript qui entre en conflit avec Ruffle.\n    Si vous \xeates l'administrateur du serveur, nous vous invitons \xe0 essayer de charger le fichier dans une page vide.\nerror-javascript-conflict-outdated = Vous pouvez \xe9galement essayer de mettre en ligne une version plus r\xe9cente de Ruffle qui pourrait avoir corrig\xe9 le probl\xe8me (la version que vous utilisez est obsol\xe8te : { $buildDate }).\nerror-csp-conflict =\n    Ruffle a rencontr\xe9 un probl\xe8me majeur durant sa phase d'initialisation.\n    La strat\xe9gie de s\xe9curit\xe9 du contenu (CSP) de ce serveur web n'autorise pas l'ex\xe9cution de fichiers \".wasm\".\n    Si vous \xeates l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-unknown =\n    Ruffle a rencontr\xe9 un probl\xe8me majeur durant l'ex\xe9cution de ce contenu Flash.\n    { $outdated ->\n        [true] Si vous \xeates l'administrateur du serveur, veuillez essayer de mettre en ligne une version plus r\xe9cente de Ruffle (la version que vous utilisez est obsol\xe8te : { $buildDate }).\n       *[false] Cela n'est pas cens\xe9 se produire, donc nous vous serions reconnaissants si vous pouviez nous signaler ce bug !\n    }\n",
						'save-manager.ftl':
							'save-delete-prompt = Voulez-vous vraiment supprimer ce fichier de sauvegarde ?\nsave-reload-prompt =\n    La seule fa\xe7on de { $action ->\n        [delete] supprimer\n       *[replace] remplacer\n    } ce fichier de sauvegarde sans conflit potentiel est de recharger ce contenu. Souhaitez-vous quand m\xeame continuer ?\nsave-download = T\xe9l\xe9charger\nsave-replace = Remplacer\nsave-delete = Supprimer\nsave-backup-all = T\xe9l\xe9charger tous les fichiers de sauvegarde\n',
						'volume-controls.ftl': 'volume-controls = Contr\xf4les du volume\nvolume-controls-mute = Muet\nvolume-controls-volume = Volume\n',
					},
					'he-IL': {
						'context_menu.ftl':
							'context-menu-download-swf = \u05d4\u05d5\u05e8\u05d3\u05ea \u05e7\u05d5\u05d1\u05e5 \u05d4swf.\ncontext-menu-copy-debug-info = \u05d4\u05e2\u05ea\u05e7\u05ea \u05e0\u05ea\u05d5\u05e0\u05d9 \u05e0\u05d9\u05e4\u05d5\u05d9 \u05e9\u05d2\u05d9\u05d0\u05d5\u05ea\ncontext-menu-open-save-manager = \u05e4\u05ea\u05d7 \u05d0\u05ea \u05de\u05e0\u05d4\u05dc \u05d4\u05e9\u05de\u05d9\u05e8\u05d5\u05ea\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] \u05d0\u05d5\u05d3\u05d5\u05ea \u05d4\u05ea\u05d5\u05e1\u05e3 Ruffle ({ $version })\n       *[other] \u05d0\u05d5\u05d3\u05d5\u05ea Ruffle ({ $version })\n    }\ncontext-menu-hide = \u05d4\u05e1\u05ea\u05e8 \u05ea\u05e4\u05e8\u05d9\u05d8 \u05d6\u05d4\ncontext-menu-exit-fullscreen = \u05d9\u05e6\u05d9\u05d0\u05d4 \u05de\u05de\u05e1\u05da \u05de\u05dc\u05d0\ncontext-menu-enter-fullscreen = \u05de\u05e1\u05da \u05de\u05dc\u05d0\ncontext-menu-volume-controls = \u05d1\u05e7\u05e8\u05ea \u05e2\u05d5\u05e6\u05de\u05ea \u05e7\u05d5\u05dc\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle \u05dc\u05d0 \u05d4\u05e6\u05dc\u05d9\u05d7 \u05dc\u05d4\u05e8\u05d9\u05e5 \u05d0\u05ea \u05ea\u05d5\u05db\u05df \u05d4\u05e4\u05dc\u05d0\u05e9 \u05d4\u05de\u05d5\u05d8\u05de\u05e2 \u05d1\u05d3\u05e3 \u05d6\u05d4.\n    \u05d0\u05ea\u05d4 \u05d9\u05db\u05d5\u05dc \u05dc\u05e4\u05ea\u05d5\u05d7 \u05d0\u05ea \u05d4\u05e7\u05d5\u05d1\u05e5 \u05d1\u05dc\u05e9\u05d5\u05e0\u05d9\u05ea \u05e0\u05e4\u05e8\u05d3\u05ea, \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05e2\u05e7\u05d5\u05e3 \u05d1\u05e2\u05d9\u05d4 \u05d6\u05d5.\npanic-title = \u05de\u05e9\u05d4\u05d5 \u05d4\u05e9\u05ea\u05d1\u05e9 :(\nmore-info = \u05de\u05d9\u05d3\u05e2 \u05e0\u05d5\u05e1\u05e3\nrun-anyway = \u05d4\u05e4\u05e2\u05dc \u05d1\u05db\u05dc \u05d6\u05d0\u05ea\ncontinue = \u05d4\u05de\u05e9\u05da\nreport-bug = \u05d3\u05d5\u05d5\u05d7 \u05e2\u05dc \u05ea\u05e7\u05dc\u05d4\nupdate-ruffle = \u05e2\u05d3\u05db\u05df \u05d0\u05ea Ruffle\nruffle-demo = \u05d4\u05d3\u05d2\u05de\u05d4\nruffle-desktop = \u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d9\u05ea \u05e9\u05d5\u05dc\u05d7\u05df \u05e2\u05d1\u05d5\u05d3\u05d4\nruffle-wiki = \u05e8\u05d0\u05d4 \u05d0\u05ea Ruffle wiki\nenable-hardware-acceleration = \u05e0\u05e8\u05d0\u05d4 \u05e9\u05d4\u05d0\u05e6\u05ea \u05d4\u05d7\u05d5\u05de\u05e8\u05d4 \u05e9\u05dc\u05da \u05dc\u05d0 \u05de\u05d5\u05e4\u05e2\u05dc\u05ea. \u05d1\u05e2\u05d5\u05d3 \u05e9\u05e8\u05d0\u05e4\u05dc \u05e2\u05e9\u05d5\u05d9 \u05dc\u05e2\u05d1\u05d5\u05d3, \u05d4\u05d5\u05d0 \u05d9\u05db\u05d5\u05dc \u05dc\u05d4\u05d9\u05d5\u05ea \u05d0\u05d9\u05d8\u05d9. \u05ea\u05d5\u05db\u05dc \u05dc\u05e8\u05d0\u05d5\u05ea \u05db\u05d9\u05e6\u05d3 \u05dc\u05d4\u05e4\u05e2\u05d9\u05dc \u05ea\u05db\u05d5\u05e0\u05d4 \u05d6\u05d5 \u05d1\u05dc\u05d7\u05d9\u05e6\u05d4 \u05e2\u05dc \u05d4\u05dc\u05d9\u05e0\u05e7 \u05d4\u05d6\u05d4.\nview-error-details = \u05e8\u05d0\u05d4 \u05e4\u05e8\u05d8\u05d9 \u05e9\u05d2\u05d9\u05d0\u05d4\nopen-in-new-tab = \u05e4\u05ea\u05d7 \u05d1\u05db\u05e8\u05d8\u05d9\u05e1\u05d9\u05d9\u05d4 \u05d7\u05d3\u05e9\u05d4\nclick-to-unmute = \u05dc\u05d7\u05e5 \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05d1\u05d8\u05dc \u05d4\u05e9\u05ea\u05e7\u05d4\nerror-file-protocol =\n    \u05e0\u05d3\u05de\u05d4 \u05e9\u05d0\u05ea\u05d4 \u05de\u05e8\u05d9\u05e5 \u05d0\u05ea Ruffle \u05ea\u05d7\u05ea \u05e4\u05e8\u05d5\u05d8\u05d5\u05e7\u05d5\u05dc "file:".\n    \u05d6\u05d4 \u05dc\u05d0 \u05d9\u05e2\u05d1\u05d5\u05d3 \u05de\u05db\u05d9\u05d5\u05d5\u05df \u05e9\u05d3\u05e4\u05d3\u05e4\u05e0\u05d9\u05dd \u05d7\u05d5\u05e1\u05de\u05d9\u05dd \u05d0\u05e4\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea \u05e8\u05d1\u05d5\u05ea \u05de\u05dc\u05e2\u05d1\u05d5\u05d3 \u05e2\u05e7\u05d1 \u05e1\u05d9\u05d1\u05d5\u05ea \u05d0\u05d1\u05d8\u05d7\u05d4.\n    \u05d1\u05de\u05e7\u05d5\u05dd \u05d6\u05d4, \u05d0\u05e0\u05d5 \u05de\u05d6\u05de\u05d9\u05e0\u05d9\u05dd \u05d0\u05d5\u05ea\u05da \u05dc\u05d0\u05d7\u05e1\u05df \u05d0\u05ea\u05e8 \u05d6\u05d4 \u05ea\u05d7\u05ea \u05e9\u05e8\u05ea \u05de\u05e7\u05d5\u05de\u05d9 \u05d0\u05d5 \u05d4\u05d3\u05d2\u05de\u05d4 \u05d1\u05e8\u05e9\u05ea \u05d0\u05d5 \u05d3\u05e8\u05da \u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d9\u05ea \u05e9\u05d5\u05dc\u05d7\u05df \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4.\nerror-javascript-config =\n    Ruffle \u05e0\u05ea\u05e7\u05dc \u05d1\u05ea\u05e7\u05dc\u05d4 \u05d7\u05de\u05d5\u05e8\u05d4 \u05e2\u05e7\u05d1 \u05d4\u05d2\u05d3\u05e8\u05ea JavaScript \u05e9\u05d2\u05d5\u05d9\u05d4.\n    \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8, \u05d0\u05e0\u05d5 \u05de\u05d6\u05de\u05d9\u05e0\u05d9\u05dd \u05d0\u05d5\u05ea\u05da \u05dc\u05d1\u05d3\u05d5\u05e7 \u05d0\u05ea \u05e4\u05e8\u05d8\u05d9 \u05d4\u05e9\u05d2\u05d9\u05d0\u05d4 \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05de\u05e6\u05d5\u05d0 \u05d0\u05d9\u05d6\u05d4 \u05e4\u05e8\u05de\u05d8\u05e8 \u05d4\u05d5\u05d0 \u05e9\u05d2\u05d5\u05d9.\n    \u05d0\u05ea\u05d4 \u05d9\u05db\u05d5\u05dc \u05dc\u05e2\u05d9\u05d9\u05df \u05d5\u05dc\u05d4\u05d5\u05e2\u05e5 \u05d1wiki \u05e9\u05dc Ruffle \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05e7\u05d1\u05dc \u05e2\u05d6\u05e8\u05d4.\nerror-wasm-not-found =\n    Ruffle \u05e0\u05db\u05e9\u05dc \u05dc\u05d8\u05e2\u05d5\u05df \u05d0\u05ea \u05e7\u05d5\u05d1\u05e5 \u05d4"wasm." \u05d4\u05d3\u05e8\u05d5\u05e9.\n    \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8, \u05d0\u05e0\u05d0 \u05d5\u05d5\u05d3\u05d0 \u05db\u05d9 \u05d4\u05e7\u05d5\u05d1\u05e5 \u05d4\u05d5\u05e2\u05dc\u05d4 \u05db\u05e9\u05d5\u05e8\u05d4.\n    \u05d0\u05dd \u05d4\u05d1\u05e2\u05d9\u05d4 \u05de\u05de\u05e9\u05d9\u05db\u05d4, \u05d9\u05d9\u05ea\u05db\u05df \u05d5\u05ea\u05e6\u05d8\u05e8\u05da \u05dc\u05d4\u05e9\u05ea\u05de\u05e9 \u05d1\u05d4\u05d2\u05d3\u05e8\u05ea "publicPath": \u05d0\u05e0\u05d0 \u05e2\u05d9\u05d9\u05df \u05d5\u05d4\u05d5\u05e2\u05e5 \u05d1wiki \u05e9\u05dc Ruffle \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05e7\u05d1\u05dc \u05e2\u05d6\u05e8\u05d4.\nerror-wasm-mime-type =\n    Ruffle \u05e0\u05ea\u05e7\u05dc \u05d1\u05d1\u05e2\u05d9\u05d4 \u05d7\u05de\u05d5\u05e8\u05d4 \u05ea\u05d5\u05da \u05db\u05d3\u05d9 \u05e0\u05d9\u05e1\u05d9\u05d5\u05df \u05dc\u05d0\u05ea\u05d7\u05dc.\n    \u05e9\u05e8\u05ea\u05d5 \u05e9\u05dc \u05d0\u05ea\u05e8 \u05d6\u05d4 \u05dc\u05d0 \u05de\u05e9\u05d9\u05d9\u05da \u05e7\u05d1\u05e6\u05d9 ".wasm" \u05e2\u05dd \u05e1\u05d5\u05d2 \u05d4MIME \u05d4\u05e0\u05db\u05d5\u05df.\n    \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8, \u05d0\u05e0\u05d0 \u05e2\u05d9\u05d9\u05df \u05d5\u05d4\u05d5\u05e2\u05e5 \u05d1wiki \u05e9\u05dc Ruffle \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05e7\u05d1\u05dc \u05e2\u05d6\u05e8\u05d4.\nerror-invalid-swf =\n    Ruffle \u05dc\u05d0 \u05d9\u05db\u05d5\u05dc \u05dc\u05e0\u05ea\u05d7 \u05d0\u05ea \u05d4\u05e7\u05d5\u05d1\u05e5 \u05d4\u05de\u05d1\u05d5\u05e7\u05e9.\n    \u05d4\u05e1\u05d9\u05d1\u05d4 \u05d4\u05e1\u05d1\u05d9\u05e8\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8 \u05dc\u05d1\u05e2\u05d9\u05d4 \u05d6\u05d5 \u05d4\u05d9\u05d0 \u05d1\u05d2\u05dc\u05dc \u05e9\u05d4\u05e7\u05d5\u05d1\u05e5 \u05d4\u05de\u05d1\u05d5\u05e7\u05e9 \u05d0\u05d9\u05e0\u05d5 SWF \u05d7\u05d5\u05e7\u05d9.\nerror-swf-fetch =\n    Ruffle \u05e0\u05db\u05e9\u05dc \u05dc\u05d8\u05e2\u05d5\u05df \u05d0\u05ea \u05e7\u05d5\u05d1\u05e5 \u05d4\u05e4\u05dc\u05d0\u05e9/swf. .\n    \u05d6\u05d4 \u05e0\u05d5\u05d1\u05e2 \u05db\u05db\u05dc \u05d4\u05e0\u05e8\u05d0\u05d4 \u05de\u05db\u05d9\u05d5\u05d5\u05df \u05d5\u05d4\u05e7\u05d5\u05d1\u05e5 \u05dc\u05d0 \u05e7\u05d9\u05d9\u05dd \u05d9\u05d5\u05ea\u05e8, \u05d0\u05d6 \u05d0\u05d9\u05df \u05dcRuffle \u05de\u05d4 \u05dc\u05d8\u05e2\u05d5\u05df.\n    \u05e0\u05e1\u05d4 \u05dc\u05d9\u05e6\u05d5\u05e8 \u05e7\u05e9\u05e8 \u05e2\u05dd \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8 \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05e7\u05d1\u05dc \u05e2\u05d6\u05e8\u05d4.\nerror-swf-cors =\n    Ruffle \u05e0\u05db\u05e9\u05dc \u05dc\u05d8\u05e2\u05d5\u05df \u05d0\u05ea \u05e7\u05d5\u05d1\u05e5 \u05d4\u05e4\u05dc\u05d0\u05e9/swf. .\n    \u05d2\u05d9\u05e9\u05d4 \u05dcfetch \u05db\u05db\u05dc \u05d4\u05e0\u05e8\u05d0\u05d4 \u05e0\u05d7\u05e1\u05de\u05d4 \u05e2\u05dc \u05d9\u05d3\u05d9 \u05de\u05d3\u05d9\u05e0\u05d9\u05d5\u05ea CORS.\n    \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8, \u05d0\u05e0\u05d0 \u05e2\u05d9\u05d9\u05df \u05d5\u05d4\u05d5\u05e2\u05e5 \u05d1wiki \u05e9\u05dc Ruffle \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05e7\u05d1\u05dc \u05e2\u05d6\u05e8\u05d4.\nerror-wasm-cors =\n    Ruffle \u05e0\u05db\u05e9\u05dc \u05dc\u05d8\u05e2\u05d5\u05df \u05d0\u05ea \u05e7\u05d5\u05d1\u05e5 \u05d4".wasm" \u05d4\u05d3\u05e8\u05d5\u05e9.\n    \u05d2\u05d9\u05e9\u05d4 \u05dcfetch \u05db\u05db\u05dc \u05d4\u05e0\u05e8\u05d0\u05d4 \u05e0\u05d7\u05e1\u05de\u05d4 \u05e2\u05dc \u05d9\u05d3\u05d9 \u05de\u05d3\u05d9\u05e0\u05d9\u05d5\u05ea CORS.\n    \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8, \u05d0\u05e0\u05d0 \u05e2\u05d9\u05d9\u05df \u05d5\u05d4\u05d5\u05e2\u05e5 \u05d1wiki \u05e9\u05dc Ruffle \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05e7\u05d1\u05dc \u05e2\u05d6\u05e8\u05d4.\nerror-wasm-invalid =\n    Ruffle \u05e0\u05ea\u05e7\u05dc \u05d1\u05d1\u05e2\u05d9\u05d4 \u05d7\u05de\u05d5\u05e8\u05d4 \u05ea\u05d5\u05da \u05db\u05d3\u05d9 \u05e0\u05d9\u05e1\u05d9\u05d5\u05df \u05dc\u05d0\u05ea\u05d7\u05dc.\n    \u05e0\u05d3\u05de\u05d4 \u05db\u05d9 \u05d1\u05d3\u05e3 \u05d6\u05d4 \u05d7\u05e1\u05e8\u05d9\u05dd \u05d0\u05d5 \u05dc\u05d0 \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd \u05db\u05e8\u05d0\u05d5\u05d9 \u05e7\u05d1\u05e6\u05d9\u05dd \u05d0\u05e9\u05e8 \u05de\u05e9\u05de\u05e9\u05d9\u05dd \u05d0\u05ea Ruffle \u05db\u05d3\u05d9 \u05dc\u05e4\u05e2\u05d5\u05dc\n    \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8, \u05d0\u05e0\u05d0 \u05e2\u05d9\u05d9\u05df \u05d5\u05d4\u05d5\u05e2\u05e5 \u05d1wiki \u05e9\u05dc Ruffle \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05e7\u05d1\u05dc \u05e2\u05d6\u05e8\u05d4.\nerror-wasm-download =\n    Ruffle \u05e0\u05ea\u05e7\u05dc \u05d1\u05d1\u05e2\u05d9\u05d4 \u05d7\u05de\u05d5\u05e8\u05d4 \u05ea\u05d5\u05da \u05db\u05d3\u05d9 \u05e0\u05d9\u05e1\u05d9\u05d5\u05df \u05dc\u05d0\u05ea\u05d7\u05dc.\n    \u05dc\u05e2\u05d9\u05ea\u05d9\u05dd \u05d1\u05e2\u05d9\u05d4 \u05d6\u05d5 \u05d9\u05db\u05d5\u05dc\u05d4 \u05dc\u05e4\u05ea\u05d5\u05e8 \u05d0\u05ea \u05e2\u05e6\u05de\u05d4, \u05d0\u05d6 \u05d0\u05ea\u05d4 \u05d9\u05db\u05d5\u05dc \u05dc\u05e0\u05e1\u05d5\u05ea \u05dc\u05d8\u05e2\u05d5\u05df \u05de\u05d7\u05d3\u05e9 \u05d0\u05ea \u05d4\u05d3\u05e3 \u05d6\u05d4.\n    \u05d0\u05dd \u05dc\u05d0, \u05d0\u05e0\u05d0 \u05e4\u05e0\u05d4 \u05dc\u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8.\nerror-wasm-disabled-on-edge =\n    Ruffle \u05e0\u05db\u05e9\u05dc \u05dc\u05d8\u05e2\u05d5\u05df \u05d0\u05ea \u05e7\u05d5\u05d1\u05e5 \u05d4".wasm" \u05d4\u05d3\u05e8\u05d5\u05e9.\n    \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05ea\u05e7\u05df \u05d1\u05e2\u05d9\u05d4 \u05d6\u05d5, \u05e0\u05e1\u05d4 \u05dc\u05e4\u05ea\u05d5\u05d7 \u05d0\u05ea \u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d4\u05d3\u05e4\u05d3\u05e4\u05df \u05e9\u05dc\u05da, \u05dc\u05d7\u05e5 \u05e2\u05dc "\u05d0\u05d1\u05d8\u05d7\u05d4, \u05d7\u05d9\u05e4\u05d5\u05e9 \u05d5\u05e9\u05d9\u05e8\u05d5\u05ea",\n    \u05d2\u05dc\u05d5\u05dc \u05de\u05d8\u05d4, \u05d5\u05db\u05d1\u05d4 \u05d0\u05ea "\u05d4\u05d2\u05d1\u05e8 \u05d0\u05ea \u05d4\u05d0\u05d1\u05d8\u05d7\u05d4 \u05e9\u05dc\u05da \u05d1\u05e8\u05e9\u05ea".\n    \u05d6\u05d4 \u05d9\u05d0\u05e4\u05e9\u05e8 \u05dc\u05d3\u05e4\u05d3\u05e4\u05df \u05e9\u05dc\u05da \u05dc\u05d8\u05e2\u05d5\u05df \u05d0\u05ea \u05e7\u05d5\u05d1\u05e5 \u05d4".wasm" \u05d4\u05d3\u05e8\u05d5\u05e9.\n    \u05d0\u05dd \u05d4\u05d1\u05e2\u05d9\u05d4 \u05de\u05de\u05e9\u05d9\u05db\u05d4, \u05d9\u05d9\u05ea\u05db\u05df \u05d5\u05e2\u05dc\u05d9\u05da \u05dc\u05d4\u05e9\u05ea\u05de\u05e9 \u05d1\u05d3\u05e4\u05d3\u05e4\u05df \u05d0\u05d7\u05e8.\nerror-javascript-conflict =\n    Ruffle \u05e0\u05ea\u05e7\u05dc \u05d1\u05d1\u05e2\u05d9\u05d4 \u05d7\u05de\u05d5\u05e8\u05d4 \u05ea\u05d5\u05da \u05db\u05d3\u05d9 \u05e0\u05d9\u05e1\u05d9\u05d5\u05df \u05dc\u05d0\u05ea\u05d7\u05dc.\n    \u05e0\u05d3\u05de\u05d4 \u05db\u05d9 \u05d3\u05e3 \u05d6\u05d4 \u05de\u05e9\u05ea\u05de\u05e9 \u05d1\u05e7\u05d5\u05d3 JavaScript \u05d0\u05e9\u05e8 \u05de\u05ea\u05e0\u05d2\u05e9 \u05e2\u05dd Ruffle.\n    \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8, \u05d0\u05e0\u05d5 \u05de\u05d6\u05de\u05d9\u05e0\u05d9\u05dd \u05d0\u05d5\u05ea\u05da \u05dc\u05e0\u05e1\u05d5\u05ea \u05dc\u05d8\u05e2\u05d5\u05df \u05d0\u05ea \u05d4\u05d3\u05e3 \u05ea\u05d7\u05ea \u05e2\u05de\u05d5\u05d3 \u05e8\u05d9\u05e7.\nerror-javascript-conflict-outdated = \u05d1\u05e0\u05d5\u05e1\u05e3, \u05d0\u05ea\u05d4 \u05d9\u05db\u05d5\u05dc \u05dc\u05e0\u05e1\u05d5\u05ea \u05d5\u05dc\u05d4\u05e2\u05dc\u05d5\u05ea \u05d2\u05e8\u05e1\u05d0\u05d5\u05ea \u05e2\u05d3\u05db\u05e0\u05d9\u05d5\u05ea \u05e9\u05dc Ruffle \u05d0\u05e9\u05e8 \u05e2\u05dc\u05d5\u05dc\u05d9\u05dd \u05dc\u05e2\u05e7\u05d5\u05e3 \u05d1\u05e2\u05d9\u05d4 \u05d6\u05d5 (\u05d2\u05e8\u05e1\u05d4 \u05d6\u05d5 \u05d4\u05d9\u05e0\u05d4 \u05de\u05d9\u05d5\u05e9\u05e0\u05ea : { $buildDate }).\nerror-csp-conflict =\n    Ruffle \u05e0\u05ea\u05e7\u05dc \u05d1\u05d1\u05e2\u05d9\u05d4 \u05d7\u05de\u05d5\u05e8\u05d4 \u05ea\u05d5\u05da \u05db\u05d3\u05d9 \u05e0\u05d9\u05e1\u05d9\u05d5\u05df \u05dc\u05d0\u05ea\u05d7\u05dc.\n    \u05de\u05d3\u05d9\u05e0\u05d9\u05d5\u05ea \u05d0\u05d1\u05d8\u05d7\u05ea \u05d4\u05ea\u05d5\u05db\u05df \u05e9\u05dc \u05e9\u05e8\u05ea\u05d5 \u05e9\u05dc \u05d0\u05ea\u05e8 \u05d6\u05d4 \u05d0\u05d9\u05e0\u05d4 \u05de\u05d0\u05e4\u05e9\u05e8\u05ea \u05dc\u05e7\u05d5\u05d1\u05e5 \u05d4"wasm." \u05d4\u05d3\u05e8\u05d5\u05e9 \u05dc\u05e4\u05e2\u05d5\u05dc.\n    \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8, \u05d0\u05e0\u05d0 \u05e2\u05d9\u05d9\u05df \u05d5\u05d4\u05d5\u05e2\u05e5 \u05d1wiki \u05e9\u05dc Ruffle \u05e2\u05dc \u05de\u05e0\u05ea \u05dc\u05e7\u05d1\u05dc \u05e2\u05d6\u05e8\u05d4.\nerror-unknown =\n    Ruffle \u05e0\u05ea\u05e7\u05dc \u05d1\u05d1\u05e2\u05d9\u05d4 \u05d7\u05de\u05d5\u05e8\u05d4 \u05d1\u05e0\u05d9\u05e1\u05d9\u05d5\u05df \u05dc\u05d4\u05e6\u05d9\u05d2 \u05d0\u05ea \u05ea\u05d5\u05db\u05df \u05e4\u05dc\u05d0\u05e9 \u05d6\u05d4.\n    { $outdated ->\n        [true] \u05d0\u05dd \u05d0\u05ea\u05d4 \u05de\u05e0\u05d4\u05dc \u05d4\u05d0\u05ea\u05e8, \u05d0\u05e0\u05d0 \u05e0\u05e1\u05d4 \u05dc\u05d4\u05e2\u05dc\u05d5\u05ea \u05d2\u05e8\u05e1\u05d4 \u05e2\u05d3\u05db\u05e0\u05d9\u05ea \u05d9\u05d5\u05ea\u05e8 \u05e9\u05dc Ruffle (\u05d2\u05e8\u05e1\u05d4 \u05d6\u05d5 \u05d4\u05d9\u05e0\u05d4 \u05de\u05d9\u05d5\u05e9\u05e0\u05ea:  { $buildDate }).\n       *[false] \u05d6\u05d4 \u05dc\u05d0 \u05d0\u05de\u05d5\u05e8 \u05dc\u05e7\u05e8\u05d5\u05ea, \u05e0\u05e9\u05de\u05d7 \u05d0\u05dd \u05ea\u05d5\u05db\u05dc \u05dc\u05e9\u05ea\u05e3 \u05ea\u05e7\u05dc\u05d4 \u05d6\u05d5!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = \u05d4\u05d0\u05dd \u05d0\u05ea\u05d4 \u05d1\u05d8\u05d5\u05d7 \u05e9\u05d1\u05e8\u05e6\u05d5\u05e0\u05da \u05dc\u05de\u05d7\u05d5\u05e7 \u05d0\u05ea \u05e7\u05d5\u05d1\u05e5 \u05e9\u05de\u05d9\u05e8\u05d4 \u05d6\u05d4?\nsave-reload-prompt =\n    \u05d4\u05d3\u05e8\u05da \u05d4\u05d9\u05d7\u05d9\u05d3\u05d4 { $action ->\n        [delete] \u05dc\u05de\u05d7\u05d5\u05e7\n       *[replace] \u05dc\u05d4\u05d7\u05dc\u05d9\u05e3\n    } \u05d0\u05ea \u05e7\u05d5\u05d1\u05e5 \u05d4\u05e9\u05de\u05d9\u05e8\u05d4 \u05d4\u05d6\u05d4 \u05de\u05d1\u05dc\u05d9 \u05dc\u05d2\u05e8\u05d5\u05dd \u05dc\u05d5 \u05dc\u05d4\u05ea\u05e0\u05d2\u05e9 \u05d4\u05d9\u05d0 \u05dc\u05d8\u05e2\u05d5\u05df \u05de\u05d7\u05d3\u05e9 \u05d0\u05ea \u05ea\u05d5\u05db\u05df \u05d6\u05d4. \u05d4\u05d0\u05dd \u05d0\u05ea\u05d4 \u05e8\u05d5\u05e6\u05d4 \u05dc\u05d4\u05de\u05e9\u05d9\u05da \u05d1\u05db\u05dc \u05d6\u05d0\u05ea?\nsave-download = \u05d4\u05d5\u05e8\u05d3\u05d4\nsave-replace = \u05d4\u05d7\u05dc\u05e4\u05d4\nsave-delete = \u05de\u05d7\u05d9\u05e7\u05d4\nsave-backup-all = \u05d4\u05d5\u05e8\u05d3\u05ea \u05db\u05dc \u05e7\u05d1\u05e6\u05d9 \u05d4\u05e9\u05de\u05d9\u05e8\u05d4\n',
						'volume-controls.ftl':
							'volume-controls = \u05d1\u05e7\u05e8\u05ea \u05e2\u05d5\u05e6\u05de\u05ea \u05e7\u05d5\u05dc\nvolume-controls-mute = \u05d4\u05e9\u05ea\u05e7\nvolume-controls-volume = \u05e2\u05d5\u05e6\u05de\u05ea \u05e7\u05d5\u05dc\n',
					},
					'hu-HU': {
						'context_menu.ftl':
							'context-menu-download-swf = .swf f\xe1jl let\xf6lt\xe9se\ncontext-menu-copy-debug-info = Hibakeres\xe9si inform\xe1ci\xf3k m\xe1sol\xe1sa\ncontext-menu-open-save-manager = Ment\xe9skezel\u0151 megnyit\xe1sa\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] A Ruffle kieg\xe9sz\xedt\u0151 ({ $version }) n\xe9vjegye\n       *[other] A Ruffle ({ $version }) n\xe9vjegye\n    }\ncontext-menu-hide = Ezen men\xfc elrejt\xe9se\ncontext-menu-exit-fullscreen = Kil\xe9p\xe9s a teljes k\xe9perny\u0151b\u0151l\ncontext-menu-enter-fullscreen = V\xe1lt\xe1s teljes k\xe9perny\u0151re\ncontext-menu-volume-controls = Hanger\u0151szab\xe1lyz\xf3\n',
						'messages.ftl':
							'message-cant-embed =\n    A Ruffle nem tudta futtatni az oldalba \xe1gyazott Flash tartalmat.\n    A probl\xe9ma kiker\xfcl\xe9s\xe9hez megpr\xf3b\xe1lhatod megnyitni a f\xe1jlt egy k\xfcl\xf6n lapon.\npanic-title = Valami baj t\xf6rt\xe9nt :(\nmore-info = Tov\xe1bbi inform\xe1ci\xf3\nrun-anyway = Futtat\xe1s m\xe9gis\ncontinue = Folytat\xe1s\nreport-bug = Hiba jelent\xe9se\nupdate-ruffle = Ruffle friss\xedt\xe9se\nruffle-demo = Webes dem\xf3\nruffle-desktop = Asztali alkalmaz\xe1s\nruffle-wiki = Ruffle Wiki megnyit\xe1sa\nenable-hardware-acceleration = \xdagy t\u0171nik, a hardveres gyors\xedt\xe1s nincs enged\xe9lyezve. B\xe1r a Ruffle m\u0171k\xf6dhet, nagyon lass\xfa lehet. Ezt a hivatkoz\xe1st k\xf6vetve megtudhatod, hogyan enged\xe9lyezd a hardveres gyors\xedt\xe1st.\nview-error-details = Hiba r\xe9szletei\nopen-in-new-tab = Megnyit\xe1s \xfaj lapon\nclick-to-unmute = Kattints a n\xe9m\xedt\xe1s felold\xe1s\xe1hoz\nerror-file-protocol =\n    \xdagy t\u0171nik, a Ruffle-t a "file:" protokollon futtatod.\n    Ez nem m\u0171k\xf6dik, mivel \xedgy a b\xf6ng\xe9sz\u0151k biztons\xe1gi okokb\xf3l sz\xe1mos funkci\xf3 m\u0171k\xf6d\xe9s\xe9t letiltj\xe1k.\n    Ehelyett azt aj\xe1nljuk hogy ind\xedts egy helyi kiszolg\xe1l\xf3t, vagy haszn\xe1ld a webes dem\xf3t vagy az asztali alkalmaz\xe1st.\nerror-javascript-config =\n    A Ruffle komoly probl\xe9m\xe1ba \xfctk\xf6z\xf6tt egy helytelen JavaScript-konfigur\xe1ci\xf3 miatt.\n    Ha a szerver rendszergazd\xe1ja vagy, k\xe9rj\xfck, ellen\u0151rizd a hiba r\xe9szleteit, hogy megtudd, melyik param\xe9ter a hib\xe1s.\n    A Ruffle wikiben is tal\xe1lhatsz ehhez seg\xedts\xe9get.\nerror-wasm-not-found =\n    A Ruffle nem tudta bet\xf6lteni a sz\xfcks\xe9ges ".wasm" \xf6sszetev\u0151t.\n    Ha a szerver rendszergazd\xe1ja vagy, k\xe9rj\xfck ellen\u0151rizd, hogy a f\xe1jl megfelel\u0151en lett-e felt\xf6ltve.\n    Ha a probl\xe9ma tov\xe1bbra is fenn\xe1ll, el\u0151fordulhat, hogy a "publicPath" be\xe1ll\xedt\xe1st kell haszn\xe1lnod: seg\xedts\xe9g\xe9rt keresd fel a Ruffle wikit.\nerror-wasm-mime-type =\n    A Ruffle komoly probl\xe9m\xe1ba \xfctk\xf6z\xf6tt az inicializ\xe1l\xe1s sor\xe1n.\n    Ez a webszerver a ".wasm" f\xe1jlokat nem a megfelel\u0151 MIME-t\xedpussal szolg\xe1lja ki.\n    Ha a szerver rendszergazd\xe1ja vagy, k\xe9rj\xfck, keresd fel a Ruffle wikit seg\xedts\xe9g\xe9rt.\nerror-invalid-swf =\n    A Ruffle nem tudta \xe9rtelmezni a k\xe9rt f\xe1jlt.\n    Ennek a legval\xf3sz\xedn\u0171bb oka az, hogy a k\xe9rt f\xe1jl nem \xe9rv\xe9nyes SWF.\nerror-swf-fetch =\n    A Ruffle nem tudta bet\xf6lteni a Flash SWF f\xe1jlt.\n    A legval\xf3sz\xedn\u0171bb ok az, hogy a f\xe1jl m\xe1r nem l\xe9tezik, \xedgy a Ruffle sz\xe1m\xe1ra nincs mit bet\xf6lteni.\n    Pr\xf3b\xe1ld meg felvenni a kapcsolatot a webhely rendszergazd\xe1j\xe1val seg\xedts\xe9g\xe9rt.\nerror-swf-cors =\n    A Ruffle nem tudta bet\xf6lteni a Flash SWF f\xe1jlt.\n    A lek\xe9r\xe9shez val\xf3 hozz\xe1f\xe9r\xe9st val\xf3sz\xedn\u0171leg letiltotta a CORS-h\xe1zirend.\n    Ha a szerver rendszergazd\xe1ja vagy, k\xe9rj\xfck, keresd fel a Ruffle wikit seg\xedts\xe9g\xe9rt.\nerror-wasm-cors =\n    A Ruffle nem tudta bet\xf6lteni a sz\xfcks\xe9ges ".wasm" \xf6sszetev\u0151t.\n    A lek\xe9r\xe9shez val\xf3 hozz\xe1f\xe9r\xe9st val\xf3sz\xedn\u0171leg letiltotta a CORS-h\xe1zirend.\n    Ha a szerver rendszergazd\xe1ja vagy, k\xe9rj\xfck keresd fel a Ruffle wikit seg\xedts\xe9g\xe9rt.\nerror-wasm-invalid =\n    A Ruffle komoly probl\xe9m\xe1ba \xfctk\xf6z\xf6tt az inicializ\xe1l\xe1s sor\xe1n.\n    \xdagy t\u0171nik, hogy ezen az oldalon hi\xe1nyoznak vagy hib\xe1sak a Ruffle futtat\xe1s\xe1hoz sz\xfcks\xe9ges f\xe1jlok.\n    Ha a szerver rendszergazd\xe1ja vagy, k\xe9rj\xfck keresd fel a Ruffle wikit seg\xedts\xe9g\xe9rt.\nerror-wasm-download =\n    A Ruffle komoly probl\xe9m\xe1ba \xfctk\xf6z\xf6tt az inicializ\xe1l\xe1s sor\xe1n.\n    Ez gyakran mag\xe1t\xf3l megold\xf3dik, ez\xe9rt megpr\xf3b\xe1lhatod \xfajrat\xf6lteni az oldalt.\n    Ellenkez\u0151 esetben fordulj a webhely rendszergazd\xe1j\xe1hoz.\nerror-wasm-disabled-on-edge =\n    A Ruffle nem tudta bet\xf6lteni a sz\xfcks\xe9ges ".wasm" \xf6sszetev\u0151t.\n    A probl\xe9ma megold\xe1s\xe1hoz nyisd meg a b\xf6ng\xe9sz\u0151 be\xe1ll\xedt\xe1sait, kattints az \u201eAdatv\xe9delem, keres\xe9s \xe9s szolg\xe1ltat\xe1sok\u201d elemre, g\xf6rgess le, \xe9s kapcsold ki a \u201eFokozott biztons\xe1g a weben\u201d opci\xf3t.\n    Ez lehet\u0151v\xe9 teszi a b\xf6ng\xe9sz\u0151 sz\xe1m\xe1ra, hogy bet\xf6ltse a sz\xfcks\xe9ges ".wasm" f\xe1jlokat.\n    Ha a probl\xe9ma tov\xe1bbra is fenn\xe1ll, lehet, hogy m\xe1sik b\xf6ng\xe9sz\u0151t kell haszn\xe1lnod.\nerror-javascript-conflict =\n    A Ruffle komoly probl\xe9m\xe1ba \xfctk\xf6z\xf6tt az inicializ\xe1l\xe1s sor\xe1n.\n    \xdagy t\u0171nik, ez az oldal olyan JavaScript-k\xf3dot haszn\xe1l, amely \xfctk\xf6zik a Ruffle-lel.\n    Ha a kiszolg\xe1l\xf3 rendszergazd\xe1ja vagy, k\xe9rj\xfck, pr\xf3b\xe1ld meg a f\xe1jlt egy \xfcres oldalon bet\xf6lteni.\nerror-javascript-conflict-outdated = Megpr\xf3b\xe1lhatod tov\xe1bb\xe1 felt\xf6lteni a Ruffle egy \xfajabb verzi\xf3j\xe1t is, amely megker\xfclheti a probl\xe9m\xe1t (a jelenlegi elavult: { $buildDate }).\nerror-csp-conflict =\n    A Ruffle komoly probl\xe9m\xe1ba \xfctk\xf6z\xf6tt az inicializ\xe1l\xe1s sor\xe1n.\n    A kiszolg\xe1l\xf3 tartalombiztons\xe1gi h\xe1zirendje nem teszi lehet\u0151v\xe9 a sz\xfcks\xe9ges \u201e.wasm\u201d \xf6sszetev\u0151k futtat\xe1s\xe1t.\n    Ha a szerver rendszergazd\xe1ja vagy, k\xe9rj\xfck, keresd fel a Ruffle wikit seg\xedts\xe9g\xe9rt.\nerror-unknown =\n    A Ruffle komoly probl\xe9m\xe1ba \xfctk\xf6z\xf6tt, mik\xf6zben megpr\xf3b\xe1lta megjelen\xedteni ezt a Flash-tartalmat.\n    { $outdated ->\n        [true] Ha a szerver rendszergazd\xe1ja vagy, k\xe9rj\xfck, pr\xf3b\xe1ld meg felt\xf6lteni a Ruffle egy \xfajabb verzi\xf3j\xe1t (a jelenlegi elavult: { $buildDate }).\n       *[false] Ennek nem lett volna szabad megt\xf6rt\xe9nnie, ez\xe9rt nagyon h\xe1l\xe1sak lenn\xe9nk, ha jelezn\xe9d a hib\xe1t!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Biztosan t\xf6r\xf6lni akarod ezt a ment\xe9st?\nsave-reload-prompt =\n    Ennek a ment\xe9snek az esetleges konfliktus n\xe9lk\xfcli { $action ->\n        [delete] t\xf6rl\xe9s\xe9hez\n       *[replace] cser\xe9j\xe9hez\n    } \xfajra kell t\xf6lteni a tartalmat. M\xe9gis szeretn\xe9d folytatni?\nsave-download = Let\xf6lt\xe9s\nsave-replace = Csere\nsave-delete = T\xf6rl\xe9s\nsave-backup-all = Az \xf6sszes f\xe1jl let\xf6lt\xe9se\n',
						'volume-controls.ftl': 'volume-controls = Hanger\u0151szab\xe1lyz\xf3\nvolume-controls-mute = N\xe9m\xedt\xe1s\nvolume-controls-volume = Hanger\u0151\n',
					},
					'id-ID': {
						'context_menu.ftl':
							'context-menu-download-swf = Unduh .swf\ncontext-menu-copy-debug-info = Salin info debug\ncontext-menu-open-save-manager = Buka Manager Save\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Tentang Ekstensi Ruffle ({ $version })\n       *[other] Tentang Ruffle ({ $version })\n    }\ncontext-menu-hide = Sembunyikan Menu ini\ncontext-menu-exit-fullscreen = Keluar dari layar penuh\ncontext-menu-enter-fullscreen = Masuk mode layar penuh\ncontext-menu-volume-controls = Pengaturan Volume\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle tidak dapat menjalankan Flash yang disematkan di halaman ini.\n    Anda dapat mencoba membuka file di tab terpisah, untuk menghindari masalah ini.\npanic-title = Terjadi kesalahan :(\nmore-info = Info lebih lanjut\nrun-anyway = Jalankan\ncontinue = Lanjutkan\nreport-bug = Laporkan Bug\nupdate-ruffle = Perbarui Ruffle\nruffle-demo = Demo Web\nruffle-desktop = Aplikasi Desktop\nruffle-wiki = Kunjungi Wiki Ruffle\nenable-hardware-acceleration = Sepertinya akselerasi perangkat keras tidak aktif. Ruffle tetap akan bekerja, Namun dapat bekerja dengan sangat lambat. Anda dapat mengaktifkan akselerasi perangkat keras dengan menggunakan link berikut.\nview-error-details = Tunjukan Detail Error\nopen-in-new-tab = Buka di Tab Baru\nclick-to-unmute = Tekan untuk menyalakan suara\nerror-file-protocol =\n    Sepertinya anda menjalankan Ruffle di protokol "file:". \n    Ini tidak berfungsi karena browser memblokir fitur ini dengan alasan keamanan.\n    Sebagai gantinya, kami mengajak anda untuk membuat server lokal, menggunakan demo web atau aplikasi desktop.\nerror-javascript-config =\n    Ruffle mengalami masalah besar karena konfigurasi JavaScript yang salah.\n    Jika Anda adalah administrator server ini, kami mengajak Anda untuk memeriksa detail kesalahan untuk mengetahui parameter mana yang salah.\n    Anda juga dapat membaca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-not-found =\n    Ruffle gagal memuat komponen file ".wasm" yang diperlukan.\n    Jika Anda adalah administrator server ini, pastikan file telah diunggah dengan benar.\n    Jika masalah terus berlanjut, Anda mungkin perlu menggunakan pengaturan "publicPath": silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-mime-type =\n    Ruffle mengalami masalah ketika mencoba melakukan inisialisasi.\n    Server web ini tidak melayani file ".wasm" dengan tipe MIME yang benar.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-swf-fetch =\n    Ruffle gagal memuat file SWF Flash.\n    Kemungkinan file tersebut sudah tidak ada, sehingga tidak dapat dimuat oleh Ruffle.\n    Coba hubungi administrator situs web ini untuk mendapatkan bantuan.\nerror-swf-cors =\n    Ruffle gagal memuat file SWF Flash.\n    Akses untuk memuat kemungkinan telah diblokir oleh kebijakan CORS.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-cors =\n    Ruffle gagal memuat komponen file ".wasm" yang diperlukan.\n    Akses untuk mengambil kemungkinan telah diblokir oleh kebijakan CORS.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-invalid =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Sepertinya halaman ini memiliki file yang hilang atau tidak valid untuk menjalankan Ruffle.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-download =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Hal ini sering kali dapat teratasi dengan sendirinya, sehingga Anda dapat mencoba memuat ulang halaman.\n    Jika tidak, silakan hubungi administrator situs web ini.\nerror-wasm-disabled-on-edge =\n    Ruffle gagal memuat komponen file ".wasm" yang diperlukan.\n    Untuk mengatasinya, coba buka pengaturan peramban Anda, klik "Privasi, pencarian, dan layanan", turun ke bawah, dan matikan "Tingkatkan keamanan Anda di web".\n    Ini akan memungkinkan browser Anda memuat file ".wasm" yang diperlukan.\n    Jika masalah berlanjut, Anda mungkin harus menggunakan browser yang berbeda.\nerror-javascript-conflict =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Sepertinya situs web ini menggunakan kode JavaScript yang bertentangan dengan Ruffle.\n    Jika Anda adalah administrator server ini, kami mengajak Anda untuk mencoba memuat file pada halaman kosong.\nerror-javascript-conflict-outdated = Anda juga dapat mencoba mengunggah versi Ruffle yang lebih baru yang mungkin dapat mengatasi masalah ini (versi saat ini sudah kedaluwarsa: { $buildDate }).\nerror-csp-conflict =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Kebijakan Keamanan Konten server web ini tidak mengizinkan komponen ".wasm" yang diperlukan untuk dijalankan.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-unknown =\n    Ruffle telah mengalami masalah besar saat menampilkan konten Flash ini.\n    { $outdated ->\n        [true] Jika Anda administrator server ini, cobalah untuk mengganti versi Ruffle yang lebih baru (versi saat ini sudah kedaluwarsa: { $buildDate }).\n       *[false] Hal ini seharusnya tidak terjadi, jadi kami sangat menghargai jika Anda dapat melaporkan bug ini!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Anda yakin ingin menghapus berkas ini?\nsave-reload-prompt =\n    Satu-satunya cara untuk { $action ->\n        [delete] menghapus\n       *[replace] mengganti\n    } berkas penyimpanan ini tanpa potensi konflik adalah dengan memuat ulang konten ini. Apakah Anda ingin melanjutkannya?\nsave-download = Unduh\nsave-replace = Ganti\nsave-delete = Hapus\nsave-backup-all = Unduh semua berkas penyimpanan\n',
						'volume-controls.ftl': 'volume-controls = Pengaturan Volume\nvolume-controls-mute = Bisukan\nvolume-controls-volume = Volume\n',
					},
					'it-IT': {
						'context_menu.ftl':
							'context-menu-download-swf = Scarica .swf\ncontext-menu-copy-debug-info = Copia informazioni di debug\ncontext-menu-open-save-manager = Apri Gestione salvataggi\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Informazioni su Ruffle Extension ({ $version })\n       *[other] Informazioni su Ruffle ({ $version })\n    }\ncontext-menu-hide = Nascondi questo menu\ncontext-menu-exit-fullscreen = Esci dallo schermo intero\ncontext-menu-enter-fullscreen = Entra a schermo intero\ncontext-menu-volume-controls = Controlli volume\n',
						'messages.ftl':
							"message-cant-embed =\n    Ruffle non \xe8 stato in grado di eseguire il Flash incorporato in questa pagina.\n    Puoi provare ad aprire il file in una scheda separata, per evitare questo problema.\npanic-title = Qualcosa \xe8 andato storto :(\nmore-info = Maggiori informazioni\nrun-anyway = Esegui comunque\ncontinue = Continua\nreport-bug = Segnala Un Bug\nupdate-ruffle = Aggiorna Ruffle\nruffle-demo = Demo Web\nruffle-desktop = Applicazione Desktop\nruffle-wiki = Visualizza Ruffle Wiki\nenable-hardware-acceleration = Sembra che l'accelerazione hardware non sia abilitata. Sebbene Ruffle possa funzionare, potrebbe essere irragionevolmente lento. Puoi scoprire come abilitare l'accelerazione hardware seguendo questo collegamento.\nview-error-details = Visualizza Dettagli Errore\nopen-in-new-tab = Apri in una nuova scheda\nclick-to-unmute = Clicca per riattivare l'audio\nerror-file-protocol =\n    Sembra che tu stia eseguendo Ruffle sul protocollo \"file:\".\n    Questo non funziona come browser blocca molte funzionalit\xe0 di lavoro per motivi di sicurezza.\n    Invece, ti invitiamo a configurare un server locale o a utilizzare la demo web o l'applicazione desktop.\nerror-javascript-config =\n    Ruffle ha incontrato un problema importante a causa di una configurazione JavaScript non corretta.\n    Se sei l'amministratore del server, ti invitiamo a controllare i dettagli dell'errore per scoprire quale parametro \xe8 in errore.\n    Puoi anche consultare il wiki Ruffle per aiuto.\nerror-wasm-not-found =\n    Ruffle non \xe8 riuscito a caricare il componente di file \".wasm\".\n    Se sei l'amministratore del server, assicurati che il file sia stato caricato correttamente.\n    Se il problema persiste, potrebbe essere necessario utilizzare l'impostazione \"publicPath\": si prega di consultare il wiki Ruffle per aiuto.\nerror-wasm-mime-type =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzazione.\n    Questo server web non serve \". asm\" file con il tipo MIME corretto.\n    Se sei l'amministratore del server, consulta la wiki Ruffle per aiuto.\nerror-swf-fetch =\n    Ruffle non \xe8 riuscito a caricare il file Flash SWF.\n    La ragione pi\xf9 probabile \xe8 che il file non esiste pi\xf9, quindi non c'\xe8 nulla che Ruffle possa caricare.\n    Prova a contattare l'amministratore del sito web per aiuto.\nerror-swf-cors =\n    Ruffle non \xe8 riuscito a caricare il file SWF Flash.\n    L'accesso al recupero probabilmente \xe8 stato bloccato dalla politica CORS.\n    Se sei l'amministratore del server, consulta la wiki Ruffle per ricevere aiuto.\nerror-wasm-cors =\n    Ruffle non \xe8 riuscito a caricare il componente di file \".wasm\".\n    L'accesso al recupero probabilmente \xe8 stato bloccato dalla politica CORS.\n    Se sei l'amministratore del server, consulta la wiki Ruffle per ricevere aiuto.\nerror-wasm-invalid =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzazione.\n    Sembra che questa pagina abbia file mancanti o non validi per l'esecuzione di Ruffle.\n    Se sei l'amministratore del server, consulta la wiki Ruffle per ricevere aiuto.\nerror-wasm-download =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzazione.\n    Questo pu\xf2 spesso risolversi da solo, quindi puoi provare a ricaricare la pagina.\n    Altrimenti, contatta l'amministratore del sito.\nerror-wasm-disabled-on-edge =\n    Ruffle non ha caricato il componente di file \".wasm\" richiesto.\n    Per risolvere il problema, prova ad aprire le impostazioni del tuo browser, facendo clic su \"Privacy, search, and services\", scorrendo verso il basso e disattivando \"Migliora la tua sicurezza sul web\".\n    Questo permetter\xe0 al tuo browser di caricare i file \".wasm\" richiesti.\n    Se il problema persiste, potresti dover usare un browser diverso.\nerror-javascript-conflict =\n    Ruffle ha riscontrato un problema importante durante il tentativo di inizializzazione.\n    Sembra che questa pagina utilizzi il codice JavaScript che \xe8 in conflitto con Ruffle.\n    Se sei l'amministratore del server, ti invitiamo a provare a caricare il file su una pagina vuota.\nerror-javascript-conflict-outdated = Puoi anche provare a caricare una versione pi\xf9 recente di Ruffle che potrebbe aggirare il problema (l'attuale build \xe8 obsoleta: { $buildDate }).\nerror-csp-conflict =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzare.\n    La Politica di Sicurezza dei Contenuti di questo server web non consente l'impostazione richiesta\". asm\" componente da eseguire.\n    Se sei l'amministratore del server, consulta la Ruffle wiki per aiuto.\nerror-unknown =\n    Ruffle ha incontrato un problema importante durante il tentativo di visualizzare questo contenuto Flash.\n    { $outdated ->\n        [true] Se sei l'amministratore del server, prova a caricare una versione pi\xf9 recente di Ruffle (la versione attuale \xe8 obsoleta: { $buildDate }).\n       *[false] Questo non dovrebbe accadere, quindi ci piacerebbe molto se si potesse inviare un bug!\n    }\n",
						'save-manager.ftl':
							"save-delete-prompt = Sei sicuro di voler eliminare questo file di salvataggio?\nsave-reload-prompt =\n    L'unico modo per { $action ->\n        [delete] delete\n       *[replace] replace\n    } questo salvataggio file senza potenziali conflitti \xe8 quello di ricaricare questo contenuto. Volete continuare comunque?\nsave-download = Scarica\nsave-replace = Sostituisci\nsave-delete = Elimina\nsave-backup-all = Scarica tutti i file di salvataggio\n",
						'volume-controls.ftl': 'volume-controls = Controlli volume\nvolume-controls-mute = Silenzia\nvolume-controls-volume = Volume\n',
					},
					'ja-JP': {
						'context_menu.ftl':
							'context-menu-download-swf = .swf\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\ncontext-menu-copy-debug-info = \u30c7\u30d0\u30c3\u30b0\u60c5\u5831\u3092\u30b3\u30d4\u30fc\ncontext-menu-open-save-manager = \u30bb\u30fc\u30d6\u30de\u30cd\u30fc\u30b8\u30e3\u30fc\u3092\u958b\u304f\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle\u62e1\u5f35\u6a5f\u80fd\u306b\u3064\u3044\u3066 ({ $version })\n       *[other] Ruffle\u306b\u3064\u3044\u3066 ({ $version })\n    }\ncontext-menu-hide = \u30e1\u30cb\u30e5\u30fc\u3092\u96a0\u3059\ncontext-menu-exit-fullscreen = \u30d5\u30eb\u30b9\u30af\u30ea\u30fc\u30f3\u3092\u7d42\u4e86\ncontext-menu-enter-fullscreen = \u30d5\u30eb\u30b9\u30af\u30ea\u30fc\u30f3\u306b\u3059\u308b\ncontext-menu-volume-controls = \u97f3\u91cf\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle\u306f\u3053\u306e\u30da\u30fc\u30b8\u306b\u57cb\u3081\u8fbc\u307e\u308c\u305f Flash \u3092\u5b9f\u884c\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\n    \u5225\u306e\u30bf\u30d6\u3067\u30d5\u30a1\u30a4\u30eb\u3092\u958b\u304f\u3053\u3068\u3067\u3001\u3053\u306e\u554f\u984c\u3092\u89e3\u6c7a\u3067\u304d\u308b\u304b\u3082\u3057\u308c\u307e\u305b\u3093\u3002\npanic-title = \u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f :(\nmore-info = \u8a73\u7d30\u60c5\u5831\nrun-anyway = \u3068\u306b\u304b\u304f\u5b9f\u884c\u3059\u308b\ncontinue = \u7d9a\u884c\nreport-bug = \u30d0\u30b0\u3092\u5831\u544a\nupdate-ruffle = Ruffle\u3092\u66f4\u65b0\nruffle-demo = Web\u30c7\u30e2\nruffle-desktop = \u30c7\u30b9\u30af\u30c8\u30c3\u30d7\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\nruffle-wiki = Ruffle Wiki\u3092\u8868\u793a\nenable-hardware-acceleration = \u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u30a2\u30af\u30bb\u30e9\u30ec\u30fc\u30b7\u30e7\u30f3\u304c\u6709\u52b9\u306b\u306a\u3063\u3066\u3044\u306a\u3044\u3088\u3046\u3067\u3059\u3002Ruffle\u304c\u52d5\u4f5c\u3057\u306a\u3044\u304b\u3001\u52d5\u4f5c\u304c\u9045\u304f\u306a\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002 \u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u30a2\u30af\u30bb\u30e9\u30ec\u30fc\u30b7\u30e7\u30f3\u3092\u6709\u52b9\u306b\u3059\u308b\u65b9\u6cd5\u306b\u3064\u3044\u3066\u306f\u3001\u3053\u3061\u3089\u306e\u30ea\u30f3\u30af\u3092\u53c2\u7167\u3057\u3066\u304f\u3060\u3055\u3044\u3002\nview-error-details = \u30a8\u30e9\u30fc\u306e\u8a73\u7d30\u3092\u8868\u793a\nopen-in-new-tab = \u65b0\u3057\u3044\u30bf\u30d6\u3067\u958b\u304f\nclick-to-unmute = \u30af\u30ea\u30c3\u30af\u3067\u30df\u30e5\u30fc\u30c8\u3092\u89e3\u9664\nerror-file-protocol =\n    Ruffle\u3092"file:"\u30d7\u30ed\u30c8\u30b3\u30eb\u3067\u4f7f\u7528\u3057\u3066\u3044\u308b\u3088\u3046\u3067\u3059\u3002\n    \u30d6\u30e9\u30a6\u30b6\u306f\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u4e0a\u306e\u7406\u7531\u304b\u3089\u6b86\u3069\u306e\u6a5f\u80fd\u3092\u5236\u9650\u3057\u3066\u3044\u308b\u305f\u3081\u3001\u6b63\u3057\u304f\u52d5\u4f5c\u3057\u307e\u305b\u3093\u3002\n    \u30ed\u30fc\u30ab\u30eb\u30b5\u30fc\u30d0\u30fc\u3092\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7\u3059\u308b\u304b\u3001\u30a6\u30a7\u30d6\u30c7\u30e2\u307e\u305f\u306f\u30c7\u30b9\u30af\u30c8\u30c3\u30d7\u30a2\u30d7\u30ea\u3092\u3054\u5229\u7528\u304f\u3060\u3055\u3044\u3002\nerror-javascript-config =\n    JavaScript\u306e\u8a2d\u5b9a\u304c\u6b63\u3057\u304f\u306a\u3044\u305f\u3081\u3001Ruffle\u3067\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\n    \u30b5\u30fc\u30d0\u30fc\u7ba1\u7406\u8005\u306e\u65b9\u306f\u3001\u30a8\u30e9\u30fc\u306e\u8a73\u7d30\u304b\u3089\u3001\u3069\u306e\u30d1\u30e9\u30e1\u30fc\u30bf\u30fc\u306b\u554f\u984c\u304c\u3042\u308b\u306e\u304b\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002\n    Ruffle\u306ewiki\u3092\u53c2\u7167\u3059\u308b\u3053\u3068\u3067\u3001\u89e3\u6c7a\u65b9\u6cd5\u304c\u898b\u3064\u304b\u308b\u304b\u3082\u3057\u308c\u307e\u305b\u3093\u3002\nerror-wasm-not-found =\n    Ruffle\u306e\u521d\u671f\u5316\u6642\u306b\u91cd\u5927\u306a\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\n    \u3053\u306eWeb\u30b5\u30fc\u30d0\u30fc\u306e\u30b3\u30f3\u30c6\u30f3\u30c4\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u30dd\u30ea\u30b7\u30fc\u304c\u3001\u5b9f\u884c\u306b\u5fc5\u8981\u3068\u306a\u308b\u300c.wasm\u300d\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u306e\u5b9f\u884c\u3092\u8a31\u53ef\u3057\u3066\u3044\u307e\u305b\u3093\u3002\u30b5\u30fc\u30d0\u30fc\u306e\u7ba1\u7406\u8005\u306e\u5834\u5408\u306f\u3001\u30d5\u30a1\u30a4\u30eb\u304c\u6b63\u3057\u304f\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3055\u308c\u3066\u3044\u308b\u304b\u78ba\u8a8d\u3092\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u3053\u306e\u554f\u984c\u304c\u89e3\u6c7a\u3057\u306a\u3044\u5834\u5408\u306f\u3001\u300cpublicPath\u300d\u306e\u8a2d\u5b9a\u3092\u4f7f\u7528\u3059\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002\n    \u30b5\u30fc\u30d0\u30fc\u306e\u7ba1\u7406\u8005\u306f\u3001Ruffle\u306ewiki\u3092\u53c2\u7167\u3057\u3066\u304f\u3060\u3055\u3044\u3002\nerror-wasm-mime-type =\n    Ruffle\u306e\u521d\u671f\u5316\u306b\u5931\u6557\u3059\u308b\u5927\u304d\u306a\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\n    \u3053\u306eWeb\u30b5\u30fc\u30d0\u30fc\u306f\u6b63\u3057\u3044MIME\u30bf\u30a4\u30d7\u306e\u300c.wasm\u300d\u30d5\u30a1\u30a4\u30eb\u3092\u63d0\u4f9b\u3057\u3066\u3044\u307e\u305b\u3093\u3002\n    \u30b5\u30fc\u30d0\u30fc\u306e\u7ba1\u7406\u8005\u306f\u3001Ruffle\u306ewiki\u3092\u53c2\u7167\u3057\u3066\u304f\u3060\u3055\u3044\u3002\nerror-invalid-swf =\n    Ruffle \u306f\u8981\u6c42\u3055\u308c\u305f\u30d5\u30a1\u30a4\u30eb\u3092\u89e3\u6790\u3067\u304d\u307e\u305b\u3093\u3002\n    \u6700\u3082\u8003\u3048\u3089\u308c\u308b\u539f\u56e0\u306f\u3001\u8981\u6c42\u3055\u308c\u305f\u30d5\u30a1\u30a4\u30eb\u304c\u6709\u52b9\u306a SWF \u3067\u306a\u3044\u3053\u3068\u3067\u3059\u3002\nerror-swf-fetch =\n    Ruffle\u304cFlash SWF\u30d5\u30a1\u30a4\u30eb\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\n    \u6700\u3082\u8003\u3048\u3089\u308c\u308b\u539f\u56e0\u306f\u3001SWF\u30d5\u30a1\u30a4\u30eb\u304c\u65e2\u306b\u5b58\u5728\u3057\u306a\u3044\u4e8b\u3067Ruffle\u304c\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3059\u308b\u3068\u3044\u3046\u554f\u984c\u3067\u3059\u3002\n    Web\u30b5\u30a4\u30c8\u306e\u7ba1\u7406\u8005\u306b\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002\nerror-swf-cors =\n    Ruffle\u306fSWF\u30d5\u30a1\u30a4\u30eb\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\n    CORS\u30dd\u30ea\u30b7\u30fc\u306e\u8a2d\u5b9a\u306b\u3088\u308a\u3001fetch\u3078\u306e\u30a2\u30af\u30bb\u30b9\u304c\u30d6\u30ed\u30c3\u30af\u3055\u308c\u3066\u3044\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002\n    \u30b5\u30fc\u30d0\u30fc\u7ba1\u7406\u8005\u306e\u65b9\u306f\u3001Ruffle\u306ewiki\u3092\u53c2\u7167\u3057\u3066\u304f\u3060\u3055\u3044\u3002\nerror-wasm-cors =\n    Ruffle\u306b\u5fc5\u8981\u3068\u306a\u308b\u300c.wasm\u300d\u30d5\u30a1\u30a4\u30eb\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\n    CORS\u30dd\u30ea\u30b7\u30fc\u306b\u3088\u3063\u3066fetch\u3078\u306e\u30a2\u30af\u30bb\u30b9\u304c\u30d6\u30ed\u30c3\u30af\u3055\u308c\u3066\u3044\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002\n    \u30b5\u30fc\u30d0\u30fc\u306e\u7ba1\u7406\u8005\u306f\u3001Ruffle wiki\u3092\u53c2\u7167\u3057\u3066\u304f\u3060\u3055\u3044\u3002\nerror-wasm-invalid =\n    Ruffle\u306e\u521d\u671f\u5316\u6642\u306b\u91cd\u5927\u306a\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\n    \u3053\u306e\u30da\u30fc\u30b8\u306b\u306fRuffle\u3092\u5b9f\u884c\u3059\u308b\u305f\u3081\u306e\u30d5\u30a1\u30a4\u30eb\u304c\u5b58\u5728\u3057\u306a\u3044\u304b\u3001\u7121\u52b9\u306a\u30d5\u30a1\u30a4\u30eb\u304c\u3042\u308b\u304b\u3082\u3057\u308c\u307e\u305b\u3093\u3002\n    \u30b5\u30fc\u30d0\u30fc\u306e\u7ba1\u7406\u8005\u306f\u3001Ruffle\u306ewiki\u3092\u53c2\u7167\u3057\u3066\u304f\u3060\u3055\u3044\u3002\nerror-wasm-download =\n    Ruffle\u306e\u521d\u671f\u5316\u6642\u306b\u91cd\u5927\u306a\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\n    \u3053\u306e\u554f\u984c\u306f\u30da\u30fc\u30b8\u3092\u518d\u8aad\u307f\u8fbc\u307f\u3059\u308b\u4e8b\u3067\u5927\u62b5\u306f\u89e3\u6c7a\u3059\u308b\u306f\u305a\u306a\u306e\u3067\u884c\u306a\u3063\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002\n    \u3082\u3057\u3082\u89e3\u6c7a\u3057\u306a\u3044\u5834\u5408\u306f\u3001Web\u30b5\u30a4\u30c8\u306e\u7ba1\u7406\u8005\u306b\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002\nerror-wasm-disabled-on-edge =\n    Ruffle\u306b\u5fc5\u8981\u3068\u306a\u308b\u300c.wasm\u300d\u30d5\u30a1\u30a4\u30eb\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\n    \u3053\u306e\u554f\u984c\u3092\u89e3\u6c7a\u3059\u308b\u306b\u306f\u30d6\u30e9\u30a6\u30b6\u30fc\u306e\u8a2d\u5b9a\u3092\u958b\u304d\u3001\u300c\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u3001\u691c\u7d22\u3001\u30b5\u30fc\u30d3\u30b9\u300d\u3092\u30af\u30ea\u30c3\u30af\u3057\u3001\u4e0b\u306b\u30b9\u30af\u30ed\u30fc\u30eb\u3067\u300cWeb\u4e0a\u306e\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u3092\u5f37\u5316\u3059\u308b\u300d\u3092\u30aa\u30d5\u306b\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002\n    \u3053\u308c\u3067\u5fc5\u8981\u3068\u306a\u308b\u300c.wasm\u300d\u30d5\u30a1\u30a4\u30eb\u304c\u8aad\u307f\u8fbc\u307e\u308c\u308b\u3088\u3046\u306b\u306a\u308a\u307e\u3059\u3002\n    \u305d\u308c\u3067\u3082\u554f\u984c\u304c\u89e3\u6c7a\u3057\u306a\u3044\u5834\u5408\u3001\u5225\u306e\u30d6\u30e9\u30a6\u30b6\u30fc\u3092\u4f7f\u7528\u3059\u308b\u5fc5\u8981\u304c\u3042\u308b\u304b\u3082\u3057\u308c\u307e\u305b\u3093\u3002\nerror-javascript-conflict =\n    Ruffle\u306e\u521d\u671f\u5316\u6642\u306b\u91cd\u5927\u306a\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\n    \u3053\u306e\u30da\u30fc\u30b8\u3067\u306fRuffle\u3068\u7af6\u5408\u3059\u308bJavaScript\u30b3\u30fc\u30c9\u304c\u4f7f\u7528\u3055\u308c\u3066\u3044\u308b\u304b\u3082\u3057\u308c\u307e\u305b\u3093\u3002\n    \u30b5\u30fc\u30d0\u30fc\u306e\u7ba1\u7406\u8005\u306f\u3001\u7a7a\u767d\u306e\u30da\u30fc\u30b8\u3067\u30d5\u30a1\u30a4\u30eb\u3092\u8aad\u307f\u8fbc\u307f\u3057\u76f4\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002\nerror-javascript-conflict-outdated = \u65b0\u3057\u3044\u30d0\u30fc\u30b8\u30e7\u30f3\u306eRuffle\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3059\u308b\u3053\u3068\u3067\u3001\u3053\u306e\u554f\u984c\u3092\u56de\u907f\u3067\u304d\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002(\u73fe\u5728\u306e\u30d3\u30eb\u30c9\u306f\u53e4\u3044\u7269\u3067\u3059:{ $buildDate })\nerror-csp-conflict =\n    Ruffle\u306e\u521d\u671f\u5316\u6642\u306b\u91cd\u5927\u306a\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\n    \u3053\u306eWeb\u30b5\u30fc\u30d0\u30fc\u306e\u30b3\u30f3\u30c6\u30f3\u30c4\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u30dd\u30ea\u30b7\u30fc\u304c\u5b9f\u884c\u306b\u5fc5\u8981\u3068\u306a\u308b\u300c.wasm\u300d\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u306e\u5b9f\u884c\u3092\u8a31\u53ef\u3057\u3066\u3044\u307e\u305b\u3093\u3002\n    \u30b5\u30fc\u30d0\u30fc\u306e\u7ba1\u7406\u8005\u306f\u3001Ruffle\u306ewiki\u3092\u53c2\u7167\u3057\u3066\u304f\u3060\u3055\u3044\u3002\nerror-unknown =\n    Flash\u30b3\u30f3\u30c6\u30f3\u30c4\u3092\u8868\u793a\u3059\u308b\u969b\u306bRuffle\u3067\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\n    { $outdated ->\n        [true] \u73fe\u5728\u4f7f\u7528\u3057\u3066\u3044\u308b\u30d3\u30eb\u30c9\u306f\u6700\u65b0\u3067\u306f\u306a\u3044\u305f\u3081\u3001\u30b5\u30fc\u30d0\u30fc\u7ba1\u7406\u8005\u306e\u65b9\u306f\u3001\u6700\u65b0\u7248\u306eRuffle\u306b\u66f4\u65b0\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044(\u73fe\u5728\u5229\u7528\u4e2d\u306e\u30d3\u30eb\u30c9: { $buildDate })\u3002\n       *[false] \u60f3\u5b9a\u5916\u306e\u554f\u984c\u306a\u306e\u3067\u3001\u30d0\u30b0\u3068\u3057\u3066\u5831\u544a\u3057\u3066\u3044\u305f\u3060\u3051\u308b\u3068\u5b09\u3057\u3044\u3067\u3059!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = \u3053\u306e\u30bb\u30fc\u30d6\u30d5\u30a1\u30a4\u30eb\u3092\u524a\u9664\u3057\u3066\u3082\u3088\u308d\u3057\u3044\u3067\u3059\u304b?\nsave-reload-prompt =\n    \u30bb\u30fc\u30d6\u30d5\u30a1\u30a4\u30eb\u3092\u7af6\u5408\u306e\u53ef\u80fd\u6027\u306a\u304f { $action ->\n        [delete] \u524a\u9664\u3059\u308b\n       *[replace] \u7f6e\u304d\u63db\u3048\u308b\n    } \u305f\u3081\u306b\u3001\u3053\u306e\u30b3\u30f3\u30c6\u30f3\u30c4\u3092\u518d\u8aad\u307f\u8fbc\u307f\u3059\u308b\u3053\u3068\u3092\u63a8\u5968\u3057\u307e\u3059\u3002\u7d9a\u884c\u3057\u307e\u3059\u304b\uff1f\nsave-download = \u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\nsave-replace = \u7f6e\u304d\u63db\u3048\nsave-delete = \u524a\u9664\nsave-backup-all = \u3059\u3079\u3066\u306e\u30bb\u30fc\u30d6\u30d5\u30a1\u30a4\u30eb\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\n',
						'volume-controls.ftl': 'volume-controls = \u97f3\u91cf\nvolume-controls-mute = \u6d88\u97f3\nvolume-controls-volume = \u97f3\u91cf\n',
					},
					'ko-KR': {
						'context_menu.ftl':
							'context-menu-download-swf = .swf \ub2e4\uc6b4\ub85c\ub4dc\ncontext-menu-copy-debug-info = \ub514\ubc84\uadf8 \uc815\ubcf4 \ubcf5\uc0ac\ncontext-menu-open-save-manager = \uc800\uc7a5 \uad00\ub9ac\uc790 \uc5f4\uae30\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle \ud655\uc7a5 \ud504\ub85c\uadf8\ub7a8 \uc815\ubcf4 ({ $version })\n       *[other] Ruffle \uc815\ubcf4 ({ $version })\n    }\ncontext-menu-hide = \uc774 \uba54\ub274 \uc228\uae30\uae30\ncontext-menu-exit-fullscreen = \uc804\uccb4\ud654\uba74 \ub098\uac00\uae30\ncontext-menu-enter-fullscreen = \uc804\uccb4\ud654\uba74\uc73c\ub85c \uc5f4\uae30\ncontext-menu-volume-controls = \uc74c\ub7c9 \uc870\uc808\n',
						'messages.ftl':
							'message-cant-embed = Ruffle\uc774 \uc774 \ud398\uc774\uc9c0\uc5d0 \ud3ec\ud568\ub41c \ud50c\ub798\uc2dc\ub97c \uc2e4\ud589\ud560 \uc218 \uc5c6\uc5c8\uc2b5\ub2c8\ub2e4. \ubcc4\ub3c4\uc758 \ud0ed\uc5d0\uc11c \ud30c\uc77c\uc744 \uc5f4\uc5b4\ubd04\uc73c\ub85c\uc11c \uc774 \ubb38\uc81c\ub97c \ud574\uacb0\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\npanic-title = \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4 :(\nmore-info = \ucd94\uac00 \uc815\ubcf4\nrun-anyway = \uadf8\ub798\ub3c4 \uc2e4\ud589\ud558\uae30\ncontinue = \uacc4\uc18d\ud558\uae30\nreport-bug = \ubc84\uadf8 \uc81c\ubcf4\nupdate-ruffle = Ruffle \uc5c5\ub370\uc774\ud2b8\nruffle-demo = \uc6f9 \ub370\ubaa8\nruffle-desktop = \ub370\uc2a4\ud06c\ud1b1 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\nruffle-wiki = Ruffle \uc704\ud0a4 \ubcf4\uae30\nenable-hardware-acceleration = \ud558\ub4dc\uc6e8\uc5b4 \uac00\uc18d\uc774 \ud65c\uc131\ud654\ub418\uc9c0 \uc54a\uc740 \uac83 \uac19\uc2b5\ub2c8\ub2e4. Ruffle\uc740 \uacc4\uc18d \uc791\ub3d9\ud558\uc9c0\ub9cc \uc2e4\ud589 \uc18d\ub3c4\uac00 \ub9e4\uc6b0 \ub290\ub9b4 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ud558\ub4dc\uc6e8\uc5b4 \uac00\uc18d\uc744 \ud65c\uc131\ud654\ud558\ub294 \ubc29\ubc95\uc744 \uc54c\uc544\ubcf4\ub824\uba74 \ub2e4\uc74c \ub9c1\ud06c\ub97c \ucc38\uace0\ud574\ubcf4\uc138\uc694.\nview-error-details = \uc624\ub958 \uc138\ubd80 \uc815\ubcf4 \ubcf4\uae30\nopen-in-new-tab = \uc0c8 \ud0ed\uc5d0\uc11c \uc5f4\uae30\nclick-to-unmute = \ud074\ub9ad\ud558\uc5ec \uc74c\uc18c\uac70 \ud574\uc81c\nerror-file-protocol =\n    Ruffle\uc744 "file:" \ud504\ub85c\ud1a0\ucf5c\uc5d0\uc11c \uc2e4\ud589\ud558\uace0 \uc788\ub294 \uac83\uc73c\ub85c \ubcf4\uc785\ub2c8\ub2e4.\n    \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c\ub294 \uc774 \ud504\ub85c\ud1a0\ucf5c\uc744 \ubcf4\uc548\uc0c1\uc758 \uc774\uc720\ub85c \ub9ce\uc740 \uae30\ub2a5\uc744 \uc791\ub3d9\ud558\uc9c0 \uc54a\uac8c \ucc28\ub2e8\ud558\ubbc0\ub85c \uc774 \ubc29\ubc95\uc740 \uc791\ub3d9\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.\n    \ub300\uc2e0, \ub85c\uceec \uc11c\ubc84\ub97c \uc9c1\uc811 \uc5f4\uc5b4\uc11c \uc124\uc815\ud558\uac70\ub098 \uc6f9 \ub370\ubaa8 \ub610\ub294 \ub370\uc2a4\ud06c\ud1b1 \uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc744 \uc0ac\uc6a9\ud558\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4.\nerror-javascript-config =\n    \uc798\ubabb\ub41c \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \uc124\uc815\uc73c\ub85c \uc778\ud574 Ruffle\uc5d0\uc11c \uc911\ub300\ud55c \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.\n    \ub9cc\uc57d \ub2f9\uc2e0\uc774 \uc11c\ubc84 \uad00\ub9ac\uc790\uc778 \uacbd\uc6b0, \uc624\ub958 \uc138\ubd80\uc0ac\ud56d\uc744 \ud655\uc778\ud558\uc5ec \uc5b4\ub5a4 \ub9e4\uac1c\ubcc0\uc218\uac00 \uc798\ubabb\ub418\uc5c8\ub294\uc9c0 \uc54c\uc544\ubcf4\uc138\uc694.\n    \ub610\ub294 Ruffle \uc704\ud0a4\ub97c \ud1b5\ud574 \ub3c4\uc6c0\uc744 \ubc1b\uc544 \ubcfc \uc218\ub3c4 \uc788\uc2b5\ub2c8\ub2e4.\nerror-wasm-not-found =\n    Ruffle\uc774 ".wasm" \ud544\uc218 \ud30c\uc77c \uad6c\uc131\uc694\uc18c\ub97c \ub85c\ub4dc\ud558\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.\n    \ub9cc\uc57d \ub2f9\uc2e0\uc774 \uc11c\ubc84 \uad00\ub9ac\uc790\ub77c\uba74 \ud30c\uc77c\uc774 \uc62c\ubc14\ub974\uac8c \uc5c5\ub85c\ub4dc\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud558\uc138\uc694.\n    \ubb38\uc81c\uac00 \uc9c0\uc18d\ub41c\ub2e4\uba74 "publicPath" \uc635\uc158\uc744 \uc0ac\uc6a9\ud574\uc57c \ud560 \uc218\ub3c4 \uc788\uc2b5\ub2c8\ub2e4: Ruffle \uc704\ud0a4\ub97c \ucc38\uc870\ud558\uc5ec \ub3c4\uc6c0\uc744 \ubc1b\uc73c\uc138\uc694.\nerror-wasm-mime-type =\n    Ruffle\uc774 \ucd08\uae30\ud654\ub97c \uc2dc\ub3c4\ud558\ub294 \ub3d9\uc548 \uc911\ub300\ud55c \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.\n    \uc774 \uc6f9 \uc11c\ubc84\ub294 \uc62c\ubc14\ub978 MIME \uc720\ud615\uc758 ".wasm" \ud30c\uc77c\uc744 \uc81c\uacf5\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.\n    \ub9cc\uc57d \ub2f9\uc2e0\uc774 \uc11c\ubc84 \uad00\ub9ac\uc790\ub77c\uba74 Ruffle \uc704\ud0a4\ub97c \ud1b5\ud574 \ub3c4\uc6c0\uc744 \ubc1b\uc73c\uc138\uc694.\nerror-invalid-swf =\n    Ruffle\uc774 \uc694\uccad\ud55c \ud30c\uc77c\uc744 \ubd84\uc11d\ud558\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.\n    \uc694\uccad\ud55c \ud30c\uc77c\uc774 \uc720\ud6a8\ud55c SWF \ud30c\uc77c\uc774 \uc544\ub2d0 \uac00\ub2a5\uc131\uc774 \ub192\uc2b5\ub2c8\ub2e4.\nerror-swf-fetch =\n    Ruffle\uc774 \ud50c\ub798\uc2dc SWF \ud30c\uc77c\uc744 \ub85c\ub4dc\ud558\ub294 \ub370 \uc2e4\ud328\ud558\uc600\uc2b5\ub2c8\ub2e4.\n    \uc774\ub294 \uc8fc\ub85c \ud30c\uc77c\uc774 \ub354 \uc774\uc0c1 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc544 Ruffle\uc774 \ub85c\ub4dc\ud560 \uc218 \uc788\ub294 \uac83\uc774 \uc5c6\uc744 \uac00\ub2a5\uc131\uc774 \ub192\uc2b5\ub2c8\ub2e4.\n    \uc6f9\uc0ac\uc774\ud2b8 \uad00\ub9ac\uc790\uc5d0\uac8c \ubb38\uc758\ud558\uc5ec \ub3c4\uc6c0\uc744 \ubc1b\uc544\ubcf4\uc138\uc694.\nerror-swf-cors =\n    Ruffle\uc774 \ud50c\ub798\uc2dc SWF \ud30c\uc77c\uc744 \ub85c\ub4dc\ud558\ub294 \ub370 \uc2e4\ud328\ud558\uc600\uc2b5\ub2c8\ub2e4.\n    CORS \uc815\ucc45\uc5d0 \uc758\ud574 \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\uc5d0 \ub300\ud55c \uc561\uc138\uc2a4\uac00 \ucc28\ub2e8\ub418\uc5c8\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\n    \ub9cc\uc57d \ub2f9\uc2e0\uc774 \uc11c\ubc84 \uad00\ub9ac\uc790\ub77c\uba74 Ruffle \uc704\ud0a4\ub97c \ucc38\uc870\ud558\uc5ec \ub3c4\uc6c0\uc744 \ubc1b\uc544\ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4.\nerror-wasm-cors =\n    Ruffle\uc774 ".wasm" \ud544\uc218 \ud30c\uc77c \uad6c\uc131\uc694\uc18c\ub97c \ub85c\ub4dc\ud558\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.\n    CORS \uc815\ucc45\uc5d0 \uc758\ud574 \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\uc5d0 \ub300\ud55c \uc561\uc138\uc2a4\uac00 \ucc28\ub2e8\ub418\uc5c8\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\n    \ub9cc\uc57d \ub2f9\uc2e0\uc774 \uc11c\ubc84 \uad00\ub9ac\uc790\ub77c\uba74 Ruffle \uc704\ud0a4\ub97c \ucc38\uc870\ud558\uc5ec \ub3c4\uc6c0\uc744 \ubc1b\uc544\ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4.\nerror-wasm-invalid =\n    Ruffle\uc774 \ucd08\uae30\ud654\ub97c \uc2dc\ub3c4\ud558\ub294 \ub3d9\uc548 \uc911\ub300\ud55c \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.\n    \uc774 \ud398\uc774\uc9c0\uc5d0 Ruffle\uc744 \uc2e4\ud589\ud558\uae30 \uc704\ud55c \ud30c\uc77c\uc774 \ub204\ub77d\ub418\uc5c8\uac70\ub098 \uc798\ubabb\ub41c \uac83 \uac19\uc2b5\ub2c8\ub2e4.\n    \ub9cc\uc57d \ub2f9\uc2e0\uc774 \uc11c\ubc84 \uad00\ub9ac\uc790\ub77c\uba74 Ruffle \uc704\ud0a4\ub97c \ucc38\uc870\ud558\uc5ec \ub3c4\uc6c0\uc744 \ubc1b\uc544\ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4.\nerror-wasm-download =\n    Ruffle\uc774 \ucd08\uae30\ud654\ub97c \uc2dc\ub3c4\ud558\ub294 \ub3d9\uc548 \uc911\ub300\ud55c \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.\n    \uc774 \ubb38\uc81c\ub294 \ub54c\ub54c\ub85c \ubc14\ub85c \ud574\uacb0\ub420 \uc218 \uc788\uc73c\ubbc0\ub85c \ud398\uc774\uc9c0\ub97c \uc0c8\ub85c\uace0\uce68\ud558\uc5ec \ub2e4\uc2dc \uc2dc\ub3c4\ud574\ubcf4\uc138\uc694.\n    \uadf8\ub798\ub3c4 \ubb38\uc81c\uac00 \uc9c0\uc18d\ub41c\ub2e4\uba74, \uc6f9\uc0ac\uc774\ud2b8 \uad00\ub9ac\uc790\uc5d0\uac8c \ubb38\uc758\ud574\uc8fc\uc138\uc694.\nerror-wasm-disabled-on-edge =\n    Ruffle\uc774 ".wasm" \ud544\uc218 \ud30c\uc77c \uad6c\uc131\uc694\uc18c\ub97c \ub85c\ub4dc\ud558\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.\n    \uc774\ub97c \ud574\uacb0\ud558\ub824\uba74 \ube0c\ub77c\uc6b0\uc800 \uc124\uc815\uc5d0\uc11c "\uac1c\uc778 \uc815\ubcf4, \uac80\uc0c9 \ubc0f \uc11c\ube44\uc2a4"\ub97c \ud074\ub9ad\ud55c \ud6c4, \ud558\ub2e8\uc73c\ub85c \uc2a4\ud06c\ub864\ud558\uc5ec "\uc6f9\uc5d0\uc11c \ubcf4\uc548 \uac15\ud654" \uae30\ub2a5\uc744 \uaebc\uc57c \ud569\ub2c8\ub2e4.\n    \uc774\ub294 \ud544\uc694\ud55c ".wasm" \ud30c\uc77c\uc744 \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \ub85c\ub4dc\ud560 \uc218 \uc788\ub3c4\ub85d \ud5c8\uc6a9\ud569\ub2c8\ub2e4.\n    \uc774 \ubb38\uc81c\uac00 \uc9c0\uc18d\ub420 \uacbd\uc6b0 \ub2e4\ub978 \ube0c\ub77c\uc6b0\uc800\ub97c \uc0ac\uc6a9\ud574\uc57c \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\nerror-javascript-conflict =\n    Ruffle\uc774 \ucd08\uae30\ud654\ub97c \uc2dc\ub3c4\ud558\ub294 \ub3d9\uc548 \uc911\ub300\ud55c \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.\n    \uc774 \ud398\uc774\uc9c0\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \ucf54\ub4dc\uac00 Ruffle\uacfc \ucda9\ub3cc\ud558\ub294 \uac83\uc73c\ub85c \ubcf4\uc785\ub2c8\ub2e4.\n    \ub9cc\uc57d \ub2f9\uc2e0\uc774 \uc11c\ubc84 \uad00\ub9ac\uc790\ub77c\uba74 \ube48 \ud398\uc774\uc9c0\uc5d0\uc11c \ud30c\uc77c\uc744 \ub85c\ub4dc\ud574\ubcf4\uc138\uc694.\nerror-javascript-conflict-outdated = \ub610\ud55c Ruffle\uc758 \ucd5c\uc2e0 \ubc84\uc804\uc744 \uc5c5\ub85c\ub4dc\ud558\ub294 \uac83\uc744 \uc2dc\ub3c4\ud558\uc5ec \ubb38\uc81c\ub97c \uc6b0\ud68c\ud574\ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4. (\ud604\uc7ac \ube4c\ub4dc\uac00 \uc624\ub798\ub418\uc5c8\uc2b5\ub2c8\ub2e4: { $buildDate }).\nerror-csp-conflict =\n    Ruffle\uc774 \ucd08\uae30\ud654\ub97c \uc2dc\ub3c4\ud558\ub294 \ub3d9\uc548 \uc911\ub300\ud55c \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.\n    \uc774 \uc6f9 \uc11c\ubc84\uc758 CSP(Content Security Policy) \uc815\ucc45\uc774 ".wasm" \ud544\uc218 \uad6c\uc131\uc694\uc18c\ub97c \uc2e4\ud589\ud558\ub294 \uac83\uc744 \ud5c8\uc6a9\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.\n    \ub9cc\uc57d \ub2f9\uc2e0\uc774 \uc11c\ubc84 \uad00\ub9ac\uc790\ub77c\uba74 Ruffle \uc704\ud0a4\ub97c \ucc38\uc870\ud558\uc5ec \ub3c4\uc6c0\uc744 \ubc1b\uc544\ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4.\nerror-unknown =\n    Ruffle\uc774 \ud50c\ub798\uc2dc \ucf58\ud150\uce20\ub97c \ud45c\uc2dc\ud558\ub824\uace0 \uc2dc\ub3c4\ud558\ub294 \ub3d9\uc548 \uc911\ub300\ud55c \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.\n    { $outdated ->\n        [true] \ub9cc\uc57d \ub2f9\uc2e0\uc774 \uc11c\ubc84 \uad00\ub9ac\uc790\ub77c\uba74, Ruffle\uc758 \ucd5c\uc2e0 \ubc84\uc804\uc744 \uc5c5\ub85c\ub4dc\ud558\uc5ec \ub2e4\uc2dc \uc2dc\ub3c4\ud574\ubcf4\uc138\uc694. (\ud604\uc7ac \ube4c\ub4dc\uac00 \uc624\ub798\ub418\uc5c8\uc2b5\ub2c8\ub2e4: { $buildDate }).\n       *[false] \uc774\ub7f0 \ud604\uc0c1\uc774 \ubc1c\uc0dd\ud574\uc11c\ub294 \uc548\ub418\ubbc0\ub85c, \ubc84\uadf8\ub97c \uc81c\ubcf4\ud574\uc8fc\uc2e0\ub2e4\uba74 \uac10\uc0ac\ud558\uaca0\uc2b5\ub2c8\ub2e4!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = \uc815\ub9d0\ub85c \uc774 \uc138\uc774\ube0c \ud30c\uc77c\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?\nsave-reload-prompt =\n    \b\uc774 \ud30c\uc77c\uc744 \uc7a0\uc7ac\uc801\uc778 \ucda9\ub3cc \uc5c6\uc774 { $action ->\n        [delete] \uc0ad\uc81c\n       *[replace] \uad50\uccb4\n    }\ud558\ub824\uba74 \ucf58\ud150\uce20\ub97c \ub2e4\uc2dc \ub85c\ub4dc\ud574\uc57c \ud569\ub2c8\ub2e4. \uadf8\ub798\ub3c4 \uacc4\uc18d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?\nsave-download = \ub2e4\uc6b4\ub85c\ub4dc\nsave-replace = \uad50\uccb4\nsave-delete = \uc0ad\uc81c\nsave-backup-all = \ubaa8\ub4e0 \uc800\uc7a5 \ud30c\uc77c \ub2e4\uc6b4\ub85c\ub4dc\n',
						'volume-controls.ftl': 'volume-controls = \uc74c\ub7c9 \uc870\uc808\nvolume-controls-mute = \uc74c\uc18c\uac70\nvolume-controls-volume = \uc74c\ub7c9\n',
					},
					'nl-NL': {
						'context_menu.ftl':
							'context-menu-download-swf = .swf downloaden\ncontext-menu-copy-debug-info = Kopieer debuginformatie\ncontext-menu-open-save-manager = Open opgeslagen-data-manager\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Over Ruffle Uitbreiding ({ $version })\n       *[other] Over Ruffle ({ $version })\n    }\ncontext-menu-hide = Verberg dit menu\ncontext-menu-exit-fullscreen = Verlaat volledig scherm\ncontext-menu-enter-fullscreen = Naar volledig scherm\ncontext-menu-volume-controls = Geluidsniveaus\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle kon de Flash-inhoud op de pagina niet draaien.\n    Je kan proberen het bestand in een apart tabblad te openen, om hier omheen te werken.\npanic-title = Er ging iets mis :(\nmore-info = Meer informatie\nrun-anyway = Toch starten\ncontinue = Doorgaan\nreport-bug = Bug rapporteren\nupdate-ruffle = Ruffle updaten\nruffle-demo = Web Demo\nruffle-desktop = Desktopapplicatie\nruffle-wiki = Bekijk de Ruffle Wiki\nenable-hardware-acceleration = Het lijkt erop dat hardwareversnelling niet beschikbaar is. Ruffle zal werken, maar gaat waarschijnlijk erg traag zijn. Je kan lezen hoe hardwareversnelling in te schakelen is door deze link te volgen.\nview-error-details = Foutdetails tonen\nopen-in-new-tab = Openen in een nieuw tabblad\nclick-to-unmute = Klik om te ontdempen\nerror-file-protocol =\n    Het lijkt erop dat je Ruffle gebruikt met het "file" protocol.\n    De meeste browsers blokkeren dit om veiligheidsredenen, waardoor het niet werkt.\n    In plaats hiervan raden we aan om een lokale server te draaien, de web demo te gebruiken, of de desktopapplicatie.\nerror-javascript-config =\n    Ruffle heeft een groot probleem ondervonden vanwege een onjuiste JavaScript configuratie.\n    Als je de serverbeheerder bent, kijk dan naar de foutdetails om te zien wat er verkeerd is.\n    Je kan ook in de Ruffle wiki kijken voor hulp.\nerror-wasm-not-found =\n    Ruffle kon het vereiste ".wasm" bestandscomponent niet laden.\n    Als je de serverbeheerder bent, controleer dan of het bestaand juist is ge\xfcpload.\n    Mocht het probleem blijven voordoen, moet je misschien de "publicPath" instelling gebruiken: zie ook de Ruffle wiki voor hulp.\nerror-wasm-mime-type =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Deze webserver serveert ".wasm" bestanden niet met het juiste MIME type.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-invalid-swf =\n    Ruffle kon het gevraagde bestand niet verwerken.\n    Waarschijnlijk is het geen geldig SWF bestand.\nerror-swf-fetch =\n    Ruffle kon het Flash SWF bestand niet inladen.\n    De meest waarschijnlijke reden is dat het bestand niet langer bestaat, en er dus niets is om in te laden.\n    Probeer contact op te nemen met de websitebeheerder voor hulp.\nerror-swf-cors =\n    Ruffle kon het Flash SWD bestand niet inladen.\n    Toegang is waarschijnlijk geblokeerd door het CORS beleid.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-wasm-cors =\n    Ruffle kon het vereiste ".wasm" bestandscomponent niet laden.\n    Toegang is waarschijnlijk geblokeerd door het CORS beleid.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-wasm-invalid =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Het lijkt erop dat de Ruffle bestanden ontbreken of ongeldig zijn.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-wasm-download =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Dit lost zichzelf vaak op als je de bladzijde opnieuw inlaadt.\n    Zo niet, neem dan contact op met de websitebeheerder.\nerror-wasm-disabled-on-edge =\n    Ruffle kon het vereiste ".wasm" bestandscomponent niet laden.\n    Om dit op te lossen, ga naar je browserinstellingen, klik op "Privacy, zoeken en diensten", scroll omlaag, en schakel "Verbeter je veiligheid op he web" uit.\n    Dan kan je browser wel de vereiste ".wasm" bestanden inladen.\n    Als het probleem zich blijft voordoen, moet je misschien een andere browser gebruiken.\nerror-javascript-conflict =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Het lijkt erop dat deze pagina JavaScript code gebruikt die conflicteert met Ruffle.\n    Als je de serverbeheerder bent, raden we aan om het bestand op een lege pagina te proberen in te laden.\nerror-javascript-conflict-outdated = Je kan ook proberen een nieuwe versie van Ruffle te installeren, om om het probleem heen te werken (huidige versie is oud: { $buildDate }).\nerror-csp-conflict =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Het CSP-beleid staat niet toe dat het vereiste ".wasm" component kan draaien.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-unknown =\n    Ruffle heeft een groot probleem onderbonden tijdens het weergeven van deze Flash-inhoud.\n    { $outdated ->\n        [true] Als je de serverbeheerder bent, upload dan een nieuwe versie van Ruffle (huidige versie is oud: { $buildDate }).\n       *[false] Dit hoort niet te gebeuren, dus we stellen het op prijs als je de fout aan ons rapporteert!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Weet je zeker dat je deze opgeslagen data wilt verwijderen?\nsave-reload-prompt =\n    De enige manier om deze opgeslagen data te { $action ->\n        [delete] verwijderen\n       *[replace] vervangen\n    } zonder potenti\xeble problemen is door de inhoud opnieuw te laden. Toch doorgaan?\nsave-download = Downloaden\nsave-replace = Vervangen\nsave-delete = Verwijderen\nsave-backup-all = Download alle opgeslagen data\n',
						'volume-controls.ftl': 'volume-controls = Geluidsniveaus\nvolume-controls-mute = Dempen\nvolume-controls-volume = Volume\n',
					},
					'pl-PL': {
						'context_menu.ftl':
							'context-menu-download-swf = Pobierz .swf\ncontext-menu-copy-debug-info = Kopiuj informacje debugowania\ncontext-menu-open-save-manager = Otw\xf3rz Menad\u017cer Zapis\xf3w\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] O Rozszerzeniu Ruffle ({ $version })\n       *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Ukryj to menu\ncontext-menu-exit-fullscreen = Zamknij pe\u0142ny ekran\ncontext-menu-enter-fullscreen = Pe\u0142ny ekran\ncontext-menu-volume-controls = Sterowanie g\u0142o\u015bno\u015bci\u0105\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle nie by\u0142o w stanie uruchomi\u0107 zawarto\u015bci Flash w tej stronie.\n    Mo\u017cesz spr\xf3bowa\u0107 otworzy\u0107 plik w nowej karcie, aby unikn\u0105\u0107 tego problemu.\npanic-title = Co\u015b posz\u0142o nie tak :(\nmore-info = Wi\u0119cej informacji\nrun-anyway = Uruchom mimo tego\ncontinue = Kontynuuj\nreport-bug = Zg\u0142o\u015b b\u0142\u0105d\nupdate-ruffle = Zaktualizuj Ruffle\nruffle-desktop = Aplikacja na komputer\nruffle-wiki = Zobacz Wiki Ruffle\nenable-hardware-acceleration = Wygl\u0105da na to, \u017ce akceleracja sprz\u0119towa nie jest w\u0142\u0105czona. Chocia\u017c Ruffle mo\u017ce dzia\u0142a\u0107, mo\u017ce by\u0107 nieproporcjonalnie wolna. Mo\u017cesz dowiedzie\u0107 si\u0119, jak w\u0142\u0105czy\u0107 akceleracj\u0119 sprz\u0119tow\u0105, pod\u0105\u017caj\u0105c za tym linkiem.\nview-error-details = Zobacz szczeg\xf3\u0142y b\u0142\u0119du\nopen-in-new-tab = Otw\xf3rz w nowej karcie\nclick-to-unmute = Kliknij aby wy\u0142\u0105czy\u0107 wyciszenie\nerror-file-protocol =\n    Wygl\u0105da na to, \u017ce u\u017cywasz Ruffle w protokole "plik:".\n    To nie dzia\u0142a poniewa\u017c przegl\u0105darka blokuje wiele funkcji przed dzia\u0142aniem ze wzgl\u0119d\xf3w bezpiecze\u0144stwa.\n    Zamiast tego zapraszamy do konfiguracji serwera lokalnego lub u\u017cycia aplikacji demo lub desktopowej.\nerror-javascript-config =\n    Ruffle napotka\u0142 powa\u017cny problem z powodu nieprawid\u0142owej konfiguracji JavaScript.\n    Je\u015bli jeste\u015b administratorem serwera, prosimy o sprawdzenie szczeg\xf3\u0142\xf3w b\u0142\u0119du, aby dowiedzie\u0107 si\u0119, kt\xf3ry parametr jest b\u0142\u0119dny.\n    Mo\u017cesz r\xf3wnie\u017c zapozna\u0107 si\u0119 z wiki Ruffle po pomoc.\nerror-wasm-not-found =\n    Ruffle nie uda\u0142o si\u0119 za\u0142adowa\u0107 wymaganego komponentu pliku ".wasm".\n    Je\u015bli jeste\u015b administratorem serwera, upewnij si\u0119, \u017ce plik zosta\u0142 poprawnie przes\u0142any.\n    Je\u015bli problem b\u0119dzie si\u0119 powtarza\u0142, by\u0107 mo\u017ce b\u0119dziesz musia\u0142 u\u017cy\u0107 ustawienia "publicPath": zapoznaj si\u0119 z wiki Ruffle aby uzyska\u0107 pomoc.\nerror-wasm-mime-type =\n    Ruffle napotka\u0142 powa\u017cny problem podczas pr\xf3by zainicjowania.\n    Ten serwer internetowy nie obs\u0142uguje ". asm" pliki z poprawnym typem MIME.\n    Je\u015bli jeste\u015b administratorem serwera, zapoznaj si\u0119 z wiki Ruffle aby uzyska\u0107 pomoc.\nerror-invalid-swf =\n    Ruffle nie mo\u017ce przetworzy\u0107 \u017c\u0105danego pliku.\n    Prawdopodobnie to nie jest poprawny plik SWF.\nerror-swf-fetch =\n    Ruffle nie uda\u0142o si\u0119 za\u0142adowa\u0107 pliku Flash SWF.\n    Najbardziej prawdopodobnym powodem jest to, \u017ce plik ju\u017c nie istnieje, wi\u0119c Ruffle nie ma nic do za\u0142adowania.\n    Spr\xf3buj skontaktowa\u0107 si\u0119 z administratorem witryny, aby uzyska\u0107 pomoc.\nerror-swf-cors =\n    Ruffle nie uda\u0142o si\u0119 za\u0142adowa\u0107 pliku Flash SWF.\n    Dost\u0119p do pobierania zosta\u0142 prawdopodobnie zablokowany przez polityk\u0119 CORS.\n    Je\u015bli jeste\u015b administratorem serwera, prosimy o pomoc z wiki Ruffle.\nerror-wasm-cors =\n    Ruffle nie uda\u0142o si\u0119 za\u0142adowa\u0107 wymaganego komponentu pliku ".wasm".\n    Dost\u0119p do pobierania zosta\u0142 prawdopodobnie zablokowany przez polityk\u0119 CORS.\n    Je\u015bli jeste\u015b administratorem serwera, prosimy o pomoc z wiki Ruffle.\nerror-wasm-invalid =\n    Ruffle napotka\u0142 powa\u017cny problem podczas pr\xf3by zainicjowania.\n    Wygl\u0105da na to, \u017ce ta strona ma brakuj\u0105ce lub nieprawid\u0142owe pliki do uruchomienia Ruffle.\n    Je\u015bli jeste\u015b administratorem serwera, prosimy o pomoc z wiki Ruffle.\nerror-wasm-download =\n    Ruffle napotka\u0142 powa\u017cny problem podczas pr\xf3by zainicjowania.\n    Mo\u017ce to cz\u0119sto rozwi\u0105za\u0107 siebie, wi\u0119c mo\u017cesz spr\xf3bowa\u0107 od\u015bwie\u017cy\u0107 stron\u0119.\n    W przeciwnym razie skontaktuj si\u0119 z administratorem witryny.\nerror-wasm-disabled-on-edge =\n    Ruffle nie uda\u0142o si\u0119 za\u0142adowa\u0107 wymaganego komponentu pliku ".wasm".\n    Aby to naprawi\u0107, spr\xf3buj otworzy\u0107 ustawienia przegl\u0105darki, klikaj\u0105c "Prywatno\u015b\u0107, wyszukiwanie i us\u0142ugi", przewijaj\u0105c w d\xf3\u0142 i wy\u0142\u0105czaj\u0105c "Zwi\u0119ksz bezpiecze\u0144stwo w sieci".\n    Pozwoli to przegl\u0105darce za\u0142adowa\u0107 wymagane pliki ".wasm".\n    Je\u015bli problem b\u0119dzie si\u0119 powtarza\u0142, by\u0107 mo\u017ce b\u0119dziesz musia\u0142 u\u017cy\u0107 innej przegl\u0105darki.\nerror-javascript-conflict =\n    Ruffle napotka\u0142 powa\u017cny problem podczas pr\xf3by zainicjowania.\n    Wygl\u0105da na to, \u017ce ta strona u\u017cywa kodu JavaScript, kt\xf3ry koliduje z Ruffle.\n    Je\u015bli jeste\u015b administratorem serwera, zapraszamy Ci\u0119 do \u0142adowania pliku na pustej stronie.\nerror-javascript-conflict-outdated = Mo\u017cesz r\xf3wnie\u017c spr\xf3bowa\u0107 przes\u0142a\u0107 nowsz\u0105 wersj\u0119 Ruffle, kt\xf3ra mo\u017ce omin\u0105\u0107 problem (obecna wersja jest przestarza\u0142a: { $buildDate }).\nerror-csp-conflict =\n    Ruffle napotka\u0142 powa\u017cny problem podczas pr\xf3by zainicjowania.\n    Polityka bezpiecze\u0144stwa zawarto\u015bci tego serwera nie zezwala na wymagany ". wasm" komponent do uruchomienia.\n    Je\u015bli jeste\u015b administratorem serwera, zapoznaj si\u0119 z wiki Ruffle po pomoc.\nerror-unknown =\n    Ruffle napotka\u0142 powa\u017cny problem podczas pr\xf3by wy\u015bwietlenia tej zawarto\u015bci Flash.\n    { $outdated ->\n        [true] Je\u015bli jeste\u015b administratorem serwera, spr\xf3buj przes\u0142a\u0107 nowsz\u0105 wersj\u0119 Ruffle (obecna wersja jest przestarza\u0142a: { $buildDate }).\n       *[false] To nie powinno si\u0119 wydarzy\u0107, wi\u0119c byliby\u015bmy wdzi\u0119czni, gdyby\u015b m\xf3g\u0142 zg\u0142osi\u0107 b\u0142\u0105d!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Czy na pewno chcesz skasowa\u0107 ten plik zapisu?\nsave-reload-prompt =\n    Jedyn\u0105 opcj\u0105, aby { $action ->\n        [delete] usun\u0105\u0107\n       *[replace] zamieni\u0107\n    } ten plik zapisu bez potencjalnych konflikt\xf3w jest prze\u0142adowanie zawarto\u015bci. Czy chcesz kontynuowa\u0107?\nsave-download = Pobierz\nsave-replace = Zamie\u0144\nsave-delete = Usu\u0144\nsave-backup-all = Pobierz wszystkie pliki zapisu\n',
						'volume-controls.ftl':
							'volume-controls = Sterowanie g\u0142o\u015bno\u015bci\u0105\nvolume-controls-mute = Wycisz\nvolume-controls-volume = G\u0142o\u015bno\u015b\u0107\n',
					},
					'pt-BR': {
						'context_menu.ftl':
							'context-menu-download-swf = Baixar .swf\ncontext-menu-copy-debug-info = Copiar informa\xe7\xe3o de depura\xe7\xe3o\ncontext-menu-open-save-manager = Abrir o Gerenciador de Salvamento\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Sobre a extens\xe3o do Ruffle ({ $version })\n       *[other] Sobre o Ruffle ({ $version })\n    }\ncontext-menu-hide = Esconder este menu\ncontext-menu-exit-fullscreen = Sair da tela cheia\ncontext-menu-enter-fullscreen = Entrar em tela cheia\ncontext-menu-volume-controls = Controles de volume\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle n\xe3o conseguiu executar o Flash incorporado nesta p\xe1gina.\n    Voc\xea pode tentar abrir o arquivo em uma guia separada para evitar esse problema.\npanic-title = Algo deu errado :(\nmore-info = Mais informa\xe7\xe3o\nrun-anyway = Executar mesmo assim\ncontinue = Continuar\nreport-bug = Reportar Bug\nupdate-ruffle = Atualizar Ruffle\nruffle-demo = Demo Web\nruffle-desktop = Aplicativo de Desktop\nruffle-wiki = Ver Wiki do Ruffle\nenable-hardware-acceleration = Parece que a acelera\xe7\xe3o de hardware n\xe3o est\xe1 habilitada. Embora o Ruffle possa funcionar, pode ser excessivamente lento. Voc\xea pode descobrir como ativar a acelera\xe7\xe3o de hardware seguindo este link.\nview-error-details = Ver detalhes do erro\nopen-in-new-tab = Abrir em uma nova guia\nclick-to-unmute = Clique para ativar o som\nerror-file-protocol =\n    Parece que voc\xea est\xe1 executando o Ruffle no protocolo "file:".\n    Isto n\xe3o funciona como navegadores bloqueiam muitos recursos de funcionar por raz\xf5es de seguran\xe7a.\n    Ao inv\xe9s disso, convidamos voc\xea a configurar um servidor local ou a usar a demonstra\xe7\xe3o da web, ou o aplicativo de desktop.\nerror-javascript-config =\n    O Ruffle encontrou um grande problema devido a uma configura\xe7\xe3o incorreta do JavaScript.\n    Se voc\xea for o administrador do servidor, convidamos voc\xea a verificar os detalhes do erro para descobrir qual par\xe2metro est\xe1 com falha.\n    Voc\xea tamb\xe9m pode consultar o wiki do Ruffle para obter ajuda.\nerror-wasm-not-found =\n    Ruffle falhou ao carregar o componente de arquivo ".wasm" necess\xe1rio.\n    Se voc\xea \xe9 o administrador do servidor, por favor, certifique-se de que o arquivo foi carregado corretamente.\n    Se o problema persistir, voc\xea pode precisar usar a configura\xe7\xe3o "publicPath": por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-mime-type =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Este servidor de web n\xe3o est\xe1 servindo ".wasm" arquivos com o tipo MIME correto.\n    Se voc\xea \xe9 o administrador do servidor, por favor consulte o wiki do Ruffle para obter ajuda.\nerror-invalid-swf =\n    Ruffle n\xe3o pode analisar o arquivo solicitado.\n    O motivo prov\xe1vel \xe9 que o arquivo solicitado n\xe3o seja um SWF v\xe1lido.\nerror-swf-fetch =\n    Ruffle falhou ao carregar o arquivo Flash SWF.\n    A raz\xe3o prov\xe1vel \xe9 que o arquivo n\xe3o existe mais, ent\xe3o n\xe3o h\xe1 nada para o Ruffle carregar.\n    Tente contatar o administrador do site para obter ajuda.\nerror-swf-cors =\n    Ruffle falhou ao carregar o arquivo Flash SWF.\n    O acesso para fetch provavelmente foi bloqueado pela pol\xedtica CORS.\n    Se voc\xea for o administrador do servidor, consulte o wiki do Ruffle para obter ajuda.\nerror-wasm-cors =\n    Ruffle falhou ao carregar o componente de arquivo ".wasm" necess\xe1rio.\n    O acesso para fetch foi provavelmente bloqueado pela pol\xedtica CORS.\n    Se voc\xea \xe9 o administrador do servidor, por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-invalid =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Parece que esta p\xe1gina tem arquivos ausentes ou inv\xe1lidos para executar o Ruffle.\n    Se voc\xea for o administrador do servidor, consulte o wiki do Ruffle para obter ajuda.\nerror-wasm-download =\n    O Ruffle encontrou um grande problema ao tentar inicializar.\n    Muitas vezes isso pode se resolver sozinho, ent\xe3o voc\xea pode tentar recarregar a p\xe1gina.\n    Caso contr\xe1rio, contate o administrador do site.\nerror-wasm-disabled-on-edge =\n    O Ruffle falhou ao carregar o componente de arquivo ".wasm" necess\xe1rio.\n    Para corrigir isso, tente abrir configura\xe7\xf5es do seu navegador, clicando em "Privacidade, pesquisa e servi\xe7os", rolando para baixo e desativando "Melhore sua seguran\xe7a na web".\n    Isso permitir\xe1 que seu navegador carregue os arquivos ".wasm" necess\xe1rios.\n    Se o problema persistir, talvez seja necess\xe1rio usar um navegador diferente.\nerror-javascript-conflict =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Parece que esta p\xe1gina usa c\xf3digo JavaScript que entra em conflito com o Ruffle.\n    Se voc\xea for o administrador do servidor, convidamos voc\xea a tentar carregar o arquivo em uma p\xe1gina em branco.\nerror-javascript-conflict-outdated = Voc\xea tamb\xe9m pode tentar fazer o upload de uma vers\xe3o mais recente do Ruffle que pode contornar o problema (a compila\xe7\xe3o atual est\xe1 desatualizada: { $buildDate }).\nerror-csp-conflict =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    A pol\xedtica de seguran\xe7a de conte\xfado deste servidor da web n\xe3o permite a execu\xe7\xe3o do componente ".wasm" necess\xe1rio.\n    Se voc\xea for o administrador do servidor, consulte o wiki do Ruffle para obter ajuda.\nerror-unknown =\n    O Ruffle encontrou um grande problema enquanto tentava exibir este conte\xfado em Flash.\n    { $outdated ->\n        [true] Se voc\xea \xe9 o administrador do servidor, por favor tente fazer o upload de uma vers\xe3o mais recente do Ruffle (a compila\xe7\xe3o atual est\xe1 desatualizada: { $buildDate }).\n       *[false] Isso n\xe3o deveria acontecer, ent\xe3o apreciar\xedamos muito se voc\xea pudesse arquivar um bug!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Tem certeza que deseja excluir este arquivo de salvamento?\nsave-reload-prompt =\n    A \xfanica maneira de { $action ->\n        [delete] excluir\n       *[replace] substituir\n    } este arquivo sem potencial conflito \xe9 recarregar este conte\xfado. Deseja continuar mesmo assim?\nsave-download = Baixar\nsave-replace = Substituir\nsave-delete = Excluir\nsave-backup-all = Baixar todos os arquivos de salvamento\n',
						'volume-controls.ftl': 'volume-controls = Controles de volume\nvolume-controls-mute = Silenciar\nvolume-controls-volume = Volume\n',
					},
					'pt-PT': {
						'context_menu.ftl':
							'context-menu-download-swf = Descarga.swf\ncontext-menu-copy-debug-info = Copiar informa\xe7\xf5es de depura\xe7\xe3o\ncontext-menu-open-save-manager = Abrir Gestor de Grava\xe7\xf5es\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Sobre a extens\xe3o do Ruffle ({ $version })\n       *[other] Sobre o Ruffle ({ $version })\n    }\ncontext-menu-hide = Esconder este menu\ncontext-menu-exit-fullscreen = Fechar Ecr\xe3 Inteiro\ncontext-menu-enter-fullscreen = Abrir Ecr\xe3 Inteiro\ncontext-menu-volume-controls = Controlos de volume\n',
						'messages.ftl':
							'message-cant-embed =\n    O Ruffle n\xe3o conseguiu abrir o Flash integrado nesta p\xe1gina.\n    Para tentar resolver o problema, pode abrir o ficheiro num novo separador.\npanic-title = Algo correu mal :(\nmore-info = Mais informa\xe7\xf5es\nrun-anyway = Executar mesmo assim\ncontinue = Continuar\nreport-bug = Reportar falha\nupdate-ruffle = Atualizar o Ruffle\nruffle-demo = Demonstra\xe7\xe3o na Web\nruffle-desktop = Aplica\xe7\xe3o para Desktop\nruffle-wiki = Ver a Wiki do Ruffle\nenable-hardware-acceleration = Parece que a acelera\xe7\xe3o de hardware n\xe3o est\xe1 ativada. Mesmo que o Ruffle funcione, pode estar excessivamente lento. Descubra como ativar a acelera\xe7\xe3o de hardware seguindo este link.\nview-error-details = Ver detalhes do erro\nopen-in-new-tab = Abrir num novo separador\nclick-to-unmute = Clique para ativar o som\nerror-file-protocol =\n    Parece que executa o Ruffle no protocolo "file:".\n    Isto n\xe3o funciona, j\xe1 que os navegadores bloqueiam muitas funcionalidades por raz\xf5es de seguran\xe7a.\n    Em vez disto, recomendados configurar um servidor local ou usar a demonstra\xe7\xe3o na web, ou a aplica\xe7\xe3o para desktop.\nerror-javascript-config =\n    O Ruffle encontrou um problema maior devido a uma configura\xe7\xe3o de JavaScript incorreta.\n    Se \xe9 o administrador do servidor, convidamo-lo a verificar os detalhes do erro para descobrir o par\xe2metro problem\xe1tico.\n    Pode ainda consultar a wiki do Ruffle para obter ajuda.\nerror-wasm-not-found =\n    O Ruffle falhou ao carregar o componente de ficheiro ".wasm" necess\xe1rio.\n    Se \xe9 o administrador do servidor, por favor certifique-se de que o ficheiro foi devidamente carregado.\n    Se o problema persistir, poder\xe1 querer usar a configura\xe7\xe3o "publicPath": consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-mime-type =\n    O Ruffle encontrou um problema maior ao tentar inicializar.\n    Este servidor de web n\xe3o suporta ficheiros ".wasm" com o tipo MIME correto.\n    Se \xe9 o administrador do servidor, por favor consulte o wiki do Ruffle para obter ajuda.\nerror-swf-fetch =\n    Ruffle falhou ao carregar o arquivo SWF do Flash\n    A raz\xe3o mais prov\xe1vel \xe9 que o arquivo n\xe3o existe mais, ent\xe3o n\xe3o h\xe1 nada para o Ruffle carregar.\n    Tente contactar o administrador do site para obter ajuda.\nerror-swf-cors =\n    O Ruffle falhou ao carregar o ficheiro Flash SWF.\n    Acesso a buscar foi provavelmente bloqueado pela pol\xedtica de CORS.\n    Se \xe9 o administrador do servidor, por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-cors =\n    O Ruffle falhou ao carregar o componente de ficheiro ".wasm" necess\xe1rio.\n    O acesso a buscar foi provavelmente bloqueado pela pol\xedtica CORS.\n    Se \xe9 o administrador do servidor, por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-invalid =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Parece que esta p\xe1gina est\xe1 ausente ou arquivos inv\xe1lidos para executar o Ruffle.\n    Se voc\xea \xe9 o administrador do servidor, por favor consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-download =\n    O Ruffle encontrou um problema maior ao tentar inicializar.\n    Isto frequentemente resolve-se sozinho, portanto experimente recarregar a p\xe1gina.\n    Caso contr\xe1rio, por favor contacte o administrador do site.\nerror-wasm-disabled-on-edge =\n    O Ruffle falhou ao carregar o componente de ficheiro ".wasm" necess\xe1rio.\n    Para corrigir isso, tente abrir as op\xe7\xf5es do seu navegador, clicando em "Privacidade, pesquisa e servi\xe7os", rolando para baixo e desativando "Melhore a sua seguran\xe7a na web".\n    Isto permitir\xe1 ao seu navegador carregar os ficheiros ".wasm" necess\xe1rios.\n    Se o problema persistir, talvez seja necess\xe1rio usar um navegador diferente.\nerror-javascript-conflict =\n    O Ruffle encontrou um problema maior ao tentar inicializar.\n    Parece que esta p\xe1gina usa c\xf3digo JavaScript que entra em conflito com o Ruffle.\n    Se \xe9 o administrador do servidor, convidamo-lo a tentar carregar o ficheiro em numa p\xe1gina em branco.\nerror-javascript-conflict-outdated = Pode ainda tentar carregar uma vers\xe3o mais recente do Ruffle que talvez contorne o problema (a compila\xe7\xe3o atual est\xe1 desatualizada: { $buildDate }).\nerror-csp-conflict =\n    O Ruffle encontrou um problema maior ao tentar inicializar.\n    A Pol\xedtica de Seguran\xe7a de Conte\xfado deste servidor n\xe3o permite que o componente ".wasm" necess\xe1rio seja executado.\n    Se \xe9 o administrador do servidor, por favor consulte o wiki do Ruffle para obter ajuda.\nerror-unknown =\n    O Ruffle encontrou um problema maior enquanto tentava mostrar este conte\xfado em Flash.\n    { $outdated ->\n        [true] Se \xe9 o administrador do servidor, por favor tente carregar uma vers\xe3o mais recente do Ruffle (a compila\xe7\xe3o atual est\xe1 desatualizada: { $buildDate }).\n       *[false] N\xe3o era suposto isto ter acontecido, por isso agradecer\xedamos muito se pudesse reportar a falha!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Tem a certeza de que quer apagar esta grava\xe7\xe3o?\nsave-reload-prompt =\n    A \xfanica forma de { $action ->\n        [delete] apagar\n       *[replace] substituir\n    } esta grava\xe7\xe3o sem um potencial conflito \xe9 recarregar este conte\xfado. Deseja continuar mesmo assim?\nsave-download = Descarregar\nsave-replace = Substituir\nsave-delete = Apagar\nsave-backup-all = Descarregar todas as grava\xe7\xf5es\n',
						'volume-controls.ftl': 'volume-controls = Controlos de volume\nvolume-controls-mute = Silenciar\nvolume-controls-volume = Volume\n',
					},
					'ro-RO': {
						'context_menu.ftl':
							'context-menu-download-swf = Descarc\u0103 .swf\ncontext-menu-copy-debug-info = Copiaz\u0103 informa\u021biile de depanare\ncontext-menu-open-save-manager = Deschide managerul de salv\u0103ri\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Despre extensia Ruffle ({ $version })\n       *[other] Despre Ruffle ({ $version })\n    }\ncontext-menu-hide = Ascunde acest meniu\ncontext-menu-exit-fullscreen = Ie\u0219i din ecranul complet\ncontext-menu-enter-fullscreen = Intr\u0103 \xeen ecran complet\ncontext-menu-volume-controls = Comenzi pentru volum\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle nu a putut s\u0103 ruleze Flash \xeencorporat \xeen aceast\u0103 pagin\u0103.\n    Po\u021bi \xeencerca s\u0103 deschizi fi\u0219ierul \xeentr-o fil\u0103 separat\u0103, pentru a evita aceast\u0103 problem\u0103.\npanic-title = Ceva a mers prost :(\nmore-info = Mai multe informa\u021bii\nrun-anyway = Ruleaz\u0103 oricum\ncontinue = Continu\u0103\nreport-bug = Raporteaz\u0103 un bug\nupdate-ruffle = Actualizeaz\u0103 Ruffle\nruffle-demo = Demo web\nruffle-desktop = Aplica\u021bie desktop\nruffle-wiki = Vezi wikiul Ruffle\nview-error-details = Vezi detaliile erorii\nopen-in-new-tab = Deschide \xeentr-o fil\u0103 nou\u0103\nclick-to-unmute = D\u0103 click pentru a dezmu\u021bi\nerror-file-protocol =\n    Se pare c\u0103 rulezi Ruffle pe protocolul \u201efile:\u201d.\n    Acesta nu func\u021bioneaz\u0103, deoarece browserele blocheaz\u0103 func\u021bionarea multor func\u021bii din motive de securitate.\n    \xcen schimb, te invit\u0103m s\u0103 configurezi un server local sau s\u0103 folose\u0219ti fie demoul web, fie aplica\u021bia desktop.\nerror-javascript-config =\n    Ruffle a \xeent\xe2mpinat o problem\u0103 major\u0103 din cauza unei configur\u0103ri incorecte a JavaScript.\n    Dac\u0103 e\u0219ti administratorul serverului, te invit\u0103m s\u0103 verifici detaliile erorii pentru a afla care parametru este defect.\n    De asemenea, po\u021bi consulta wikiul Ruffle pentru ajutor.\nerror-wasm-not-found =\n    Ruffle a e\u0219uat la \xeenc\u0103rcarea componentei de fi\u0219ier \u201e.wasm\u201d.\n    Dac\u0103 e\u0219ti administratorul serverului, te rug\u0103m s\u0103 te asiguri c\u0103 fi\u0219ierul a fost \xeenc\u0103rcat corect.\n    Dac\u0103 problema persist\u0103, poate fi necesar s\u0103 folose\u0219ti setarea \u201epublicPath\u201d: te rug\u0103m s\u0103 consul\u021bi wikiul Ruffle pentru ajutor.\nerror-wasm-mime-type =\n    Ruffle a \xeent\xe2mpinat o problem\u0103 major\u0103 \xeen timp ce \xeencerca s\u0103 se ini\u021bializeze.\n    Acest server web nu serve\u0219te fi\u0219iere \u201e.wasm\u201d cu tipul MIME corect.\n    Dac\u0103 e\u0219ti administratorul serverului, te rug\u0103m s\u0103 consul\u021bi wikiul Ruffle pentru ajutor.\nerror-swf-fetch =\n    Ruffle a e\u0219uat la \xeenc\u0103rcarea fi\u0219ierului SWF.\n    Motivul cel mai probabil este c\u0103 fi\u0219ierul nu mai exist\u0103, deci Ruffle nu mai are ce s\u0103 \xeencarce.\n    \xcencearc\u0103 s\u0103 contactezi administratorul site-ului web pentru ajutor.\nerror-swf-cors =\n    Ruffle a e\u0219uat la \xeenc\u0103rcarea fi\u0219ierului SWF.\n    Accesul de preluare a fost probabil blocat de politica CORS.\n    Dac\u0103 e\u0219ti administratorul serverului, te rug\u0103m s\u0103 consul\u021bi wikiul Ruffle pentru ajutor.\nerror-wasm-cors =\n    Ruffle a e\u0219uat la \xeenc\u0103rcarea componentei de fi\u0219ier \u201e.wasm\u201d.\n    Accesul de preluare a fost probabil blocat de politica CORS.\n    Dac\u0103 e\u0219ti administratorul serverului, te rug\u0103m s\u0103 consul\u021bi wikiul Ruffle pentru ajutor.\nerror-wasm-invalid =\n    Ruffle a \xeent\xe2mpinat o problem\u0103 major\u0103 \xeen timp ce \xeencerca s\u0103 se ini\u021bializeze.\n    Se pare c\u0103 aceast\u0103 pagin\u0103 are fi\u0219iere lips\u0103 sau nevalide pentru a rula Ruffle.\n    Dac\u0103 e\u0219ti administratorul serverului, te rug\u0103m s\u0103 consul\u021bi wikiul Ruffle pentru ajutor.\nerror-wasm-download =\n    Ruffle a \xeent\xe2mpinat o problem\u0103 major\u0103 \xeen timp ce \xeencerca s\u0103 ini\u021bializeze.\n    Acest lucru se poate rezolva adesea de la sine, a\u0219a c\u0103 po\u021bi \xeencerca s\u0103 re\xeencarci pagina.\n    \xcen caz contrar, te rug\u0103m s\u0103 contactezi administratorul site-ului web.\nerror-wasm-disabled-on-edge =\n    Ruffle a e\u0219uat la \xeenc\u0103rcarea componentei de fi\u0219ier \u201e.wasm\u201d.\n    Pentru a remedia acest lucru, \xeencearc\u0103 s\u0103 deschizi set\u0103rile browserului, s\u0103 faci clic pe \u201eConfiden\u021bialitate, c\u0103utare \u0219i servicii\u201d, s\u0103 derulezi \xeen jos \u0219i s\u0103 dezactivezi \u201e\xcembun\u0103t\u0103\u021bi\u021bi-v\u0103 securitatea pe web\u201d.\n    Acest lucru va permite browserului s\u0103 \xeencarce fi\u0219ierele \u201e.wasm\u201d necesare.\n    Dac\u0103 problema persist\u0103, este posibil s\u0103 trebuiasc\u0103 s\u0103 folose\u0219ti un alt browser.\nerror-javascript-conflict =\n    Ruffle a \xeent\xe2mpinat o problem\u0103 major\u0103 \xeen timp ce \xeencerca s\u0103 se ini\u021bializeze.\n    Se pare c\u0103 aceast\u0103 pagin\u0103 folose\u0219te cod JavaScript care intr\u0103 \xeen conflict cu Ruffle.\n    Dac\u0103 e\u0219ti administratorul serverului, te invit\u0103m s\u0103 \xeencerci \xeenc\u0103rcarea fi\u0219ierului pe o pagin\u0103 goal\u0103.\nerror-javascript-conflict-outdated = De asemenea, po\u021bi \xeencerca s\u0103 \xeencarci o versiune mai recent\u0103 de Ruffle care ar putea ocoli problema (versiunea actual\u0103 este \xeenvechit\u0103: { $buildDate }).\nerror-csp-conflict =\n    Ruffle a \xeent\xe2mpinat o problem\u0103 major\u0103 \xeen timp ce \xeencerca s\u0103 se ini\u021bializeze.\n    Politica de securitate a con\u021binutului a acestui server web nu permite rularea componentei \u201e.wasm\u201d necesare.\n    Dac\u0103 e\u0219ti administratorul serverului, te rug\u0103m s\u0103 consul\u021bi wikiul Ruffle pentru ajutor.\nerror-unknown =\n    Ruffle a \xeent\xe2mpinat o problem\u0103 major\u0103 \xeen timp ce \xeencerca s\u0103 afi\u0219eze acest con\u021binut Flash.\n    { $outdated ->\n        [true] Dac\u0103 e\u0219ti administratorul serverului, te rug\u0103m s\u0103 \xeencerci s\u0103 \xeencarci o versiune mai recent\u0103 de Ruffle (versiunea actual\u0103 este \xeenvechit\u0103: { $buildDate }).\n       *[false] Acest lucru nu ar trebui s\u0103 se \xeent\xe2mple, a\u0219a c\u0103 am aprecia foarte mult dac\u0103 ai putea trimite un bug!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Sigur vrei s\u0103 \u0219tergi acest fi\u0219ier de salvare?\nsave-reload-prompt =\n    Singura cale de a { $action ->\n        [delete] \u0219terge\n       *[replace] \xeenlocui\n    } acest fi\u0219ier de salvare f\u0103r\u0103 un conflict poten\u021bial este de a re\xeenc\u0103rca acest con\u021binut. Dore\u0219ti s\u0103 continui oricum?\nsave-download = Descarc\u0103\nsave-replace = \xcenlocuie\u0219te\nsave-delete = \u0218terge\n',
						'volume-controls.ftl': 'volume-controls = Comenzi pentru volum\nvolume-controls-volume = Volum\n',
					},
					'ru-RU': {
						'context_menu.ftl':
							'context-menu-download-swf = \u0421\u043a\u0430\u0447\u0430\u0442\u044c .swf\ncontext-menu-copy-debug-info = \u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043e\u0442\u043b\u0430\u0434\u043e\u0447\u043d\u0443\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e\ncontext-menu-open-save-manager = \u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0439\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] \u041e \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043d\u0438\u0438 Ruffle ({ $version })\n       *[other] \u041e Ruffle ({ $version })\n    }\ncontext-menu-hide = \u0421\u043a\u0440\u044b\u0442\u044c \u044d\u0442\u043e \u043c\u0435\u043d\u044e\ncontext-menu-exit-fullscreen = \u041e\u043a\u043e\u043d\u043d\u044b\u0439 \u0440\u0435\u0436\u0438\u043c\ncontext-menu-enter-fullscreen = \u041f\u043e\u043b\u043d\u043e\u044d\u043a\u0440\u0430\u043d\u043d\u044b\u0439 \u0440\u0435\u0436\u0438\u043c\ncontext-menu-volume-controls = \u0413\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u044c\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle \u043d\u0435 \u0441\u043c\u043e\u0433 \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c Flash, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c\u044b\u0439 \u043d\u0430 \u044d\u0442\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435.\n    \u0427\u0442\u043e\u0431\u044b \u043e\u0431\u043e\u0439\u0442\u0438 \u044d\u0442\u0443 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0443, \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u0444\u0430\u0439\u043b \u0432 \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u043e\u0439 \u0432\u043a\u043b\u0430\u0434\u043a\u0435.\npanic-title = \u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a :(\nmore-info = \u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435\nrun-anyway = \u0412\u0441\u0451 \u0440\u0430\u0432\u043d\u043e \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c\ncontinue = \u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c\nreport-bug = \u0421\u043e\u043e\u0431\u0449\u0438\u0442\u044c \u043e\u0431 \u043e\u0448\u0438\u0431\u043a\u0435\nupdate-ruffle = \u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c Ruffle\nruffle-demo = \u0412\u0435\u0431-\u0434\u0435\u043c\u043e\nruffle-desktop = \u041d\u0430\u0441\u0442\u043e\u043b\u044c\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435\nruffle-wiki = \u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432\u0438\u043a\u0438 Ruffle\nenable-hardware-acceleration = \u041f\u043e\u0445\u043e\u0436\u0435, \u0447\u0442\u043e \u0430\u043f\u043f\u0430\u0440\u0430\u0442\u043d\u043e\u0435 \u0443\u0441\u043a\u043e\u0440\u0435\u043d\u0438\u0435 \u043d\u0435 \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u043e. \u0425\u043e\u0442\u044c Ruffle \u0438 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c, \u043e\u043d \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043d\u0435\u043e\u043f\u0440\u0430\u0432\u0434\u0430\u043d\u043d\u043e \u043c\u0435\u0434\u043b\u0435\u043d\u043d\u044b\u043c. \u041e \u0442\u043e\u043c, \u043a\u0430\u043a \u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0430\u043f\u043f\u0430\u0440\u0430\u0442\u043d\u043e\u0435 \u0443\u0441\u043a\u043e\u0440\u0435\u043d\u0438\u0435, \u043c\u043e\u0436\u043d\u043e \u0443\u0437\u043d\u0430\u0442\u044c, \u043f\u0435\u0440\u0435\u0439\u0434\u044f \u043f\u043e \u0441\u0441\u044b\u043b\u043a\u0435.\nview-error-details = \u0421\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u043e\u0431 \u043e\u0448\u0438\u0431\u043a\u0435\nopen-in-new-tab = \u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432 \u043d\u043e\u0432\u043e\u0439 \u0432\u043a\u043b\u0430\u0434\u043a\u0435\nclick-to-unmute = \u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0437\u0432\u0443\u043a\nerror-file-protocol =\n    \u041f\u043e\u0445\u043e\u0436\u0435, \u0447\u0442\u043e \u0432\u044b \u0437\u0430\u043f\u0443\u0441\u043a\u0430\u0435\u0442\u0435 Ruffle \u043f\u043e \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u0443 "file:".\n    \u042d\u0442\u043e \u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442, \u043f\u043e\u0441\u043a\u043e\u043b\u044c\u043a\u0443 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u044b \u0431\u043b\u043e\u043a\u0438\u0440\u0443\u044e\u0442 \u0440\u0430\u0431\u043e\u0442\u0443 \u043c\u043d\u043e\u0433\u0438\u0445 \u0444\u0443\u043d\u043a\u0446\u0438\u0439 \u043f\u043e \u0441\u043e\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f\u043c \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438.\n    \u0412\u043c\u0435\u0441\u0442\u043e \u044d\u0442\u043e\u0433\u043e \u043c\u044b \u043f\u0440\u0435\u0434\u043b\u0430\u0433\u0430\u0435\u043c \u0432\u0430\u043c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043d\u0430\u0441\u0442\u043e\u043b\u044c\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435, \u0432\u0435\u0431-\u0434\u0435\u043c\u043e \u0438\u043b\u0438 \u043d\u0430\u0441\u0442\u0440\u043e\u0438\u0442\u044c \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u0435\u0440\u0432\u0435\u0440.\nerror-javascript-config =\n    \u0412\u043e\u0437\u043d\u0438\u043a\u043b\u0430 \u0441\u0435\u0440\u044c\u0451\u0437\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430 \u0438\u0437-\u0437\u0430 \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0439 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 JavaScript.\n    \u0415\u0441\u043b\u0438 \u0432\u044b \u044f\u0432\u043b\u044f\u0435\u0442\u0435\u0441\u044c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u043e\u043c \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043c\u044b \u043f\u0440\u0435\u0434\u043b\u0430\u0433\u0430\u0435\u043c \u0432\u0430\u043c \u043f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c \u0434\u0435\u0442\u0430\u043b\u0438 \u043e\u0448\u0438\u0431\u043a\u0438, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u044f\u0441\u043d\u0438\u0442\u044c, \u043a\u0430\u043a\u043e\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440 \u0434\u0430\u043b \u0441\u0431\u043e\u0439.\n    \u0412\u044b \u0442\u0430\u043a\u0436\u0435 \u043c\u043e\u0436\u0435\u0442\u0435 \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u044c\u0441\u044f \u0437\u0430 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a \u0432\u0438\u043a\u0438 Ruffle.\nerror-wasm-not-found =\n    Ruffle \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u0439 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442 \u0444\u0430\u0439\u043b\u0430 ".wasm".\n    \u0415\u0441\u043b\u0438 \u0432\u044b \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0443\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044c, \u0447\u0442\u043e \u0444\u0430\u0439\u043b \u0431\u044b\u043b \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e.\n    \u0415\u0441\u043b\u0438 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430 \u043d\u0435 \u0443\u0441\u0442\u0440\u0430\u043d\u044f\u0435\u0442\u0441\u044f, \u0432\u0430\u043c \u043c\u043e\u0436\u0435\u0442 \u043f\u043e\u0442\u0440\u0435\u0431\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0443 "publicPath": \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u043a \u0432\u0438\u043a\u0438 Ruffle.\nerror-wasm-mime-type =\n    Ruffle \u0441\u0442\u043e\u043b\u043a\u043d\u0443\u043b\u0441\u044f \u0441 \u0441\u0435\u0440\u044c\u0451\u0437\u043d\u043e\u0439 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u043e\u0439 \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438.\n    \u042d\u0442\u043e\u0442 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0435\u0440 \u043d\u0435 \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0444\u0430\u0439\u043b\u044b ".wasm" \u0441 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u043c \u0442\u0438\u043f\u043e\u043c MIME.\n    \u0415\u0441\u043b\u0438 \u0432\u044b \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0437\u0430 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a \u0432\u0438\u043a\u0438 Ruffle.\nerror-invalid-swf =\n    Ruffle \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c \u0437\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u0435\u043c\u044b\u0439 \u0444\u0430\u0439\u043b.\n    \u0412\u0435\u0440\u043e\u044f\u0442\u043d\u0435\u0435 \u0432\u0441\u0435\u0433\u043e, \u0434\u0430\u043d\u043d\u044b\u0439 SWF \u043f\u043e\u0432\u0440\u0435\u0436\u0434\u0451\u043d \u0438\u043b\u0438 \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0442\u0430\u043a\u043e\u0432\u044b\u043c.\nerror-swf-fetch =\n    Ruffle \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c SWF-\u0444\u0430\u0439\u043b Flash.\n    \u0412\u0435\u0440\u043e\u044f\u0442\u043d\u0435\u0435 \u0432\u0441\u0435\u0433\u043e, \u0444\u0430\u0439\u043b \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442, \u043f\u043e\u044d\u0442\u043e\u043c\u0443 Ruffle \u043d\u0435\u0447\u0435\u0433\u043e \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0442\u044c.\n    \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f \u0441 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u043e\u043c \u0441\u0430\u0439\u0442\u0430 \u0434\u043b\u044f \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u043f\u043e\u043c\u043e\u0449\u0438.\nerror-swf-cors =\n    Ruffle \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c SWF-\u0444\u0430\u0439\u043b Flash.\n    \u0421\u043a\u043e\u0440\u0435\u0435 \u0432\u0441\u0435\u0433\u043e, \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0444\u0430\u0439\u043b\u0443 \u0431\u044b\u043b \u0437\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d \u043f\u043e\u043b\u0438\u0442\u0438\u043a\u043e\u0439 CORS.\n    \u0415\u0441\u043b\u0438 \u0432\u044b \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0437\u0430 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a \u0432\u0438\u043a\u0438 Ruffle.\nerror-wasm-cors =\n    Ruffle \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u0439 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442 \u0444\u0430\u0439\u043b\u0430 ".wasm".\n    \u0421\u043a\u043e\u0440\u0435\u0435 \u0432\u0441\u0435\u0433\u043e, \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0444\u0430\u0439\u043b\u0443 \u0431\u044b\u043b \u0437\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d \u043f\u043e\u043b\u0438\u0442\u0438\u043a\u043e\u0439 CORS.\n    \u0415\u0441\u043b\u0438 \u0432\u044b \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0437\u0430 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a \u0432\u0438\u043a\u0438 Ruffle.\nerror-wasm-invalid =\n    Ruffle \u0441\u0442\u043e\u043b\u043a\u043d\u0443\u043b\u0441\u044f \u0441 \u0441\u0435\u0440\u044c\u0451\u0437\u043d\u043e\u0439 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u043e\u0439 \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438.\n    \u041f\u043e\u0445\u043e\u0436\u0435, \u0447\u0442\u043e \u043d\u0430 \u044d\u0442\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044e\u0442 \u0444\u0430\u0439\u043b\u044b \u0434\u043b\u044f \u0437\u0430\u043f\u0443\u0441\u043a\u0430 Ruffle \u0438\u043b\u0438 \u043e\u043d\u0438 \u043d\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u044b.\n    \u0415\u0441\u043b\u0438 \u0432\u044b \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0437\u0430 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a \u0432\u0438\u043a\u0438 Ruffle.\nerror-wasm-download =\n    Ruffle \u0441\u0442\u043e\u043b\u043a\u043d\u0443\u043b\u0441\u044f \u0441 \u0441\u0435\u0440\u044c\u0451\u0437\u043d\u043e\u0439 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u043e\u0439 \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438.\n    \u0427\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043e \u044d\u0442\u0430 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430 \u0443\u0441\u0442\u0440\u0430\u043d\u044f\u0435\u0442\u0441\u044f \u0441\u0430\u043c\u0430 \u0441\u043e\u0431\u043e\u044e, \u043f\u043e\u044d\u0442\u043e\u043c\u0443 \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u0440\u043e\u0441\u0442\u043e \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443.\n    \u0415\u0441\u043b\u0438 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0435\u0442 \u043f\u043e\u044f\u0432\u043b\u044f\u0442\u044c\u0441\u044f, \u0441\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u043e\u043c \u0441\u0430\u0439\u0442\u0430.\nerror-wasm-disabled-on-edge =\n    Ruffle \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u0439 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442 \u0444\u0430\u0439\u043b\u0430 ".wasm".\n    \u0427\u0442\u043e\u0431\u044b \u0438\u0441\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u044d\u0442\u0443 \u043e\u0448\u0438\u0431\u043a\u0443, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043e\u0442\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0432 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430\u0445 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0443\u044e \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c. \u042d\u0442\u043e \u043f\u043e\u0437\u0432\u043e\u043b\u0438\u0442 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0443 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u0435 WASM-\u0444\u0430\u0439\u043b\u044b.\n    \u0415\u0441\u043b\u0438 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430 \u043e\u0441\u0442\u0430\u043b\u0430\u0441\u044c, \u0432\u0430\u043c \u043c\u043e\u0436\u0435\u0442 \u043f\u043e\u0442\u0440\u0435\u0431\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u0434\u0440\u0443\u0433\u043e\u0439 \u0431\u0440\u0430\u0443\u0437\u0435\u0440.\nerror-javascript-conflict =\n    Ruffle \u0441\u0442\u043e\u043b\u043a\u043d\u0443\u043b\u0441\u044f \u0441 \u0441\u0435\u0440\u044c\u0451\u0437\u043d\u043e\u0439 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u043e\u0439 \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438.\n    \u041f\u043e\u0445\u043e\u0436\u0435, \u0447\u0442\u043e \u044d\u0442\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442 \u043a\u043e\u043d\u0444\u043b\u0438\u043a\u0442\u0443\u044e\u0449\u0438\u0439 \u0441 Ruffle \u043a\u043e\u0434 JavaScript.\n    \u0415\u0441\u043b\u0438 \u0432\u044b \u044f\u0432\u043b\u044f\u0435\u0442\u0435\u0441\u044c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u043e\u043c \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043c\u044b \u043f\u0440\u0435\u0434\u043b\u0430\u0433\u0430\u0435\u043c \u0432\u0430\u043c \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0444\u0430\u0439\u043b \u043d\u0430 \u043f\u0443\u0441\u0442\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435.\nerror-javascript-conflict-outdated = \u0412\u044b \u0442\u0430\u043a\u0436\u0435 \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u044e\u044e \u0432\u0435\u0440\u0441\u0438\u044e Ruffle, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u043c\u043e\u0436\u0435\u0442 \u043e\u0431\u043e\u0439\u0442\u0438 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0443 (\u0442\u0435\u043a\u0443\u0449\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f \u0443\u0441\u0442\u0430\u0440\u0435\u043b\u0430: { $buildDate }).\nerror-csp-conflict =\n    Ruffle \u0441\u0442\u043e\u043b\u043a\u043d\u0443\u043b\u0441\u044f \u0441 \u0441\u0435\u0440\u044c\u0451\u0437\u043d\u043e\u0439 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u043e\u0439 \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438.\n    \u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u0433\u043e \u044d\u0442\u043e\u0433\u043e \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043d\u0435 \u043f\u043e\u0437\u0432\u043e\u043b\u044f\u0435\u0442 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0442\u0440\u0435\u0431\u0443\u0435\u043c\u044b\u0435 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442\u044b \u0434\u043b\u044f \u0437\u0430\u043f\u0443\u0441\u043a\u0430 ".wasm".\n    \u0415\u0441\u043b\u0438 \u0432\u044b \u044f\u0432\u043b\u044f\u0435\u0442\u0435\u0441\u044c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u043e\u043c \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0437\u0430 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a \u0432\u0438\u043a\u0438 Ruffle.\nerror-unknown =\n    Ruffle \u0441\u0442\u043e\u043b\u043a\u043d\u0443\u043b\u0441\u044f \u0441 \u0441\u0435\u0440\u044c\u0451\u0437\u043d\u043e\u0439 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u043e\u0439 \u043f\u0440\u0438 \u043f\u043e\u043f\u044b\u0442\u043a\u0435 \u043e\u0442\u043e\u0431\u0440\u0430\u0437\u0438\u0442\u044c \u044d\u0442\u043e\u0442 Flash-\u043a\u043e\u043d\u0442\u0435\u043d\u0442.\n    { $outdated ->\n        [true] \u0415\u0441\u043b\u0438 \u0432\u044b \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0431\u043e\u043b\u0435\u0435 \u043d\u043e\u0432\u0443\u044e \u0432\u0435\u0440\u0441\u0438\u044e Ruffle (\u0442\u0435\u043a\u0443\u0449\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f \u0443\u0441\u0442\u0430\u0440\u0435\u043b\u0430: { $buildDate }).\n       *[false] \u042d\u0442\u043e\u0433\u043e \u043d\u0435 \u0434\u043e\u043b\u0436\u043d\u043e \u043f\u0440\u043e\u0438\u0441\u0445\u043e\u0434\u0438\u0442\u044c, \u043f\u043e\u044d\u0442\u043e\u043c\u0443 \u043c\u044b \u0431\u0443\u0434\u0435\u043c \u043e\u0447\u0435\u043d\u044c \u043f\u0440\u0438\u0437\u043d\u0430\u0442\u0435\u043b\u044c\u043d\u044b, \u0435\u0441\u043b\u0438 \u0432\u044b \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u0435 \u043d\u0430\u043c \u043e\u0431 \u043e\u0448\u0438\u0431\u043a\u0435!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = \u0423\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e\u0442 \u0444\u0430\u0439\u043b \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f?\nsave-reload-prompt =\n    \u0415\u0434\u0438\u043d\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u0441\u043f\u043e\u0441\u043e\u0431 { $action ->\n        [delete] \u0443\u0434\u0430\u043b\u0438\u0442\u044c\n       *[replace] \u0437\u0430\u043c\u0435\u043d\u0438\u0442\u044c\n    } \u044d\u0442\u043e\u0442 \u0444\u0430\u0439\u043b \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f \u0431\u0435\u0437 \u043f\u043e\u0442\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u043a\u043e\u043d\u0444\u043b\u0438\u043a\u0442\u0430 \u2013 \u043f\u0435\u0440\u0435\u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0437\u0430\u043f\u0443\u0449\u0435\u043d\u043d\u044b\u0439 \u043a\u043e\u043d\u0442\u0435\u043d\u0442. \u0412\u0441\u0451 \u0440\u0430\u0432\u043d\u043e \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c?\nsave-download = \u0421\u043a\u0430\u0447\u0430\u0442\u044c\nsave-replace = \u0417\u0430\u043c\u0435\u043d\u0438\u0442\u044c\nsave-delete = \u0423\u0434\u0430\u043b\u0438\u0442\u044c\nsave-backup-all = \u0421\u043a\u0430\u0447\u0430\u0442\u044c \u0432\u0441\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f\n',
						'volume-controls.ftl':
							'volume-controls = \u0420\u0435\u0433\u0443\u043b\u0438\u0440\u043e\u0432\u043a\u0430 \u0433\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u0438\nvolume-controls-mute = \u0411\u0435\u0437 \u0437\u0432\u0443\u043a\u0430\nvolume-controls-volume = \u0413\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u044c\n',
					},
					'sk-SK': {
						'context_menu.ftl':
							'context-menu-download-swf = Stiahnu\u0165 .swf\ncontext-menu-copy-debug-info = Skop\xedrova\u0165 debug info\ncontext-menu-open-save-manager = Otvori\u0165 spr\xe1vcu ulo\u017een\xed\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] O Ruffle roz\u0161\xedren\xed ({ $version })\n       *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Skry\u0165 menu\ncontext-menu-exit-fullscreen = Ukon\u010di\u0165 re\u017eim celej obrazovky\ncontext-menu-enter-fullscreen = Prejs\u0165 do re\u017eimu celej obrazovky\ncontext-menu-volume-controls = Ovl\xe1danie hlasitosti\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle nemohol spusti\u0165 Flash vlo\u017een\xfd na tejto str\xe1nke.\n    M\xf4\u017eete sa pok\xfasi\u0165 otvori\u0165 s\xfabor na samostatnej karte, aby ste sa vyhli tomuto probl\xe9mu.\npanic-title = Nie\u010do sa pokazilo :(\nmore-info = Viac inform\xe1ci\xed\nrun-anyway = Spusti\u0165 aj tak\ncontinue = Pokra\u010dova\u0165\nreport-bug = Nahl\xe1si\u0165 chybu\nupdate-ruffle = Aktualizova\u0165 Ruffle\nruffle-demo = Web Demo\nruffle-desktop = Desktopov\xe1 aplik\xe1cia\nruffle-wiki = Zobrazi\u0165 Ruffle Wiki\nenable-hardware-acceleration = Zd\xe1 sa, \u017ee hardv\xe9rov\xe1 akceler\xe1cia nie je povolen\xe1. Aj ke\u010f Ruffle funguje spr\xe1vne, m\xf4\u017ee by\u0165 neprimerane pomal\xfd. Ako povoli\u0165 hardv\xe9rov\xfa akceler\xe1ciu zist\xedte na tomto odkaze.\nview-error-details = Zobrazi\u0165 podrobnosti o chybe\nopen-in-new-tab = Otvori\u0165 na novej karte\nclick-to-unmute = Kliknut\xedm zapnete zvuk\nerror-file-protocol =\n    Zd\xe1 sa, \u017ee pou\u017e\xedvate Ruffle na protokole "file:".\n    To nie je mo\u017en\xe9, preto\u017ee prehliada\u010de blokuj\xfa fungovanie mnoh\xfdch funkci\xed z bezpe\u010dnostn\xfdch d\xf4vodov.\n    Namiesto toho v\xe1m odpor\xfa\u010dame nastavi\u0165 lok\xe1lny server alebo pou\u017ei\u0165 web demo \u010di desktopov\xfa aplik\xe1ciu.\nerror-javascript-config =\n    Ruffle narazil na probl\xe9m v d\xf4sledku nespr\xe1vnej konfigur\xe1cie JavaScriptu.\n    Ak ste spr\xe1vcom servera, odpor\xfa\u010dame v\xe1m skontrolova\u0165 podrobnosti o chybe, aby ste zistili, ktor\xfd parameter je chybn\xfd.\n    Pomoc m\xf4\u017eete z\xedska\u0165 aj na wiki Ruffle.\nerror-wasm-not-found =\n    Ruffle sa nepodarilo na\u010d\xedta\u0165 po\u017eadovan\xfd komponent s\xfaboru \u201e.wasm\u201c.\n    Ak ste spr\xe1vcom servera, skontrolujte, \u010di bol s\xfabor spr\xe1vne nahran\xfd.\n    Ak probl\xe9m pretrv\xe1va, mo\u017eno budete musie\u0165 pou\u017ei\u0165 nastavenie \u201epublicPath\u201c: pomoc n\xe1jdete na wiki Ruffle.\nerror-wasm-mime-type =\n    Ruffle narazil na probl\xe9m pri pokuse o inicializ\xe1ciu.\n    Tento webov\xfd server neposkytuje s\xfabory \u201e.wasm\u201c so spr\xe1vnym typom MIME.\n    Ak ste spr\xe1vcom servera, pomoc n\xe1jdete na Ruffle wiki.\nerror-invalid-swf =\n    Ruffle nem\xf4\u017ee spracova\u0165 po\u017eadovan\xfd s\xfabor.\n    Najpravdepodobnej\u0161\xedm d\xf4vodom je, \u017ee po\u017eadovan\xfd s\xfabor nie je platn\xfdm s\xfaborom SWF.\nerror-swf-fetch =\n    Ruffle sa nepodarilo na\u010d\xedta\u0165 SWF s\xfabor Flash.\n    Najpravdepodobnej\u0161\xedm d\xf4vodom je, \u017ee s\xfabor u\u017e neexistuje, tak\u017ee Ruffle nem\xe1 \u010do na\u010d\xedta\u0165.\n    Sk\xfaste po\u017eiada\u0165 o pomoc spr\xe1vcu webovej lokality.\nerror-swf-cors =\n    Ruffle sa nepodarilo na\u010d\xedta\u0165 SWF s\xfabor Flash.\n    Pr\xedstup k na\u010d\xedtaniu bol pravdepodobne zablokovan\xfd politikou CORS.\n    Ak ste spr\xe1vcom servera, pomoc n\xe1jdete na Ruffle wiki.\nerror-wasm-cors =\n    Ruffle sa nepodarilo na\u010d\xedta\u0165 po\u017eadovan\xfd komponent s\xfaboru \u201e.wasm\u201c.\n    Pr\xedstup k na\u010d\xedtaniu bol pravdepodobne zablokovan\xfd politikou CORS.\n    Ak ste spr\xe1vcom servera, pomoc n\xe1jdete na Ruffle wiki.\nerror-wasm-invalid =\n    Ruffle narazil na probl\xe9m pri pokuse o inicializ\xe1ciu.\n    Zd\xe1 sa, \u017ee na tejto str\xe1nke ch\xfdbaj\xfa alebo s\xfa neplatn\xe9 s\xfabory na spustenie Ruffle.\n    Ak ste spr\xe1vcom servera, pomoc n\xe1jdete na Ruffle wiki.\nerror-wasm-download =\n    Ruffle narazil na probl\xe9m pri pokuse o inicializ\xe1ciu.\n    Probl\xe9m sa m\xf4\u017ee vyrie\u0161i\u0165 aj s\xe1m, tak\u017ee m\xf4\u017eete sk\xfasi\u0165 str\xe1nku na\u010d\xedta\u0165 znova.\n    V opa\u010dnom pr\xedpade kontaktujte administr\xe1tora str\xe1nky.\nerror-wasm-disabled-on-edge =\n    Ruffle sa nepodarilo na\u010d\xedta\u0165 po\u017eadovan\xfd komponent s\xfaboru \u201e.wasm\u201c.\n    Ak chcete tento probl\xe9m vyrie\u0161i\u0165, sk\xfaste otvori\u0165 nastavenia prehliada\u010da, kliknite na polo\u017eku \u201eOchrana osobn\xfdch \xfadajov, vyh\u013ead\xe1vanie a slu\u017eby\u201c, prejdite nadol a vypnite mo\u017enos\u0165 \u201eZv\xfd\u0161te svoju bezpe\u010dnos\u0165 na webe\u201c.\n    V\xe1\u0161mu prehliada\u010du to umo\u017en\xed na\u010d\xedta\u0165 po\u017eadovan\xe9 s\xfabory \u201e.wasm\u201c.\n    Ak probl\xe9m pretrv\xe1va, mo\u017eno budete musie\u0165 pou\u017ei\u0165 in\xfd prehliada\u010d.\nerror-javascript-conflict =\n    Ruffle narazil na probl\xe9m pri pokuse o inicializ\xe1ciu.\n    Zd\xe1 sa, \u017ee t\xe1to str\xe1nka pou\u017e\xedva k\xf3d JavaScript, ktor\xfd je v konflikte s Ruffle.\n    Ak ste spr\xe1vcom servera, odpor\xfa\u010dame v\xe1m sk\xfasi\u0165 na\u010d\xedta\u0165 s\xfabor na pr\xe1zdnu str\xe1nku.\nerror-javascript-conflict-outdated = M\xf4\u017eete sa tie\u017e pok\xfasi\u0165 nahra\u0165 nov\u0161iu verziu Ruffle, ktor\xe1 m\xf4\u017ee dan\xfd probl\xe9m vyrie\u0161i\u0165 (aktu\xe1lny build je zastaran\xfd: { $buildDate }).\nerror-csp-conflict =\n    Ruffle narazil na probl\xe9m pri pokuse o inicializ\xe1ciu.\n    Z\xe1sady zabezpe\u010denia obsahu tohto webov\xe9ho servera nepovo\u013euj\xfa spustenie po\u017eadovan\xe9ho komponentu \u201e.wasm\u201c.\n    Ak ste spr\xe1vcom servera, pomoc n\xe1jdete na Ruffle wiki.\nerror-unknown =\n    Ruffle narazil na probl\xe9m pri pokuse zobrazi\u0165 tento Flash obsah.\n    { $outdated ->\n         [true] Ak ste spr\xe1vcom servera, sk\xfaste nahra\u0165 nov\u0161iu verziu Ruffle (aktu\xe1lny build je zastaran\xfd: { $buildDate }).\n        *[false] Toto by sa nemalo sta\u0165, tak\u017ee by sme naozaj ocenili, keby ste mohli nahl\xe1si\u0165 chybu!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Naozaj chcete odstr\xe1ni\u0165 tento s\xfabor s ulo\u017een\xfdmi poz\xedciami?\nsave-reload-prompt =\n    Jedin\xfd sp\xf4sob, ako { $action ->\n         [delete] vymaza\u0165\n        *[replace] nahradi\u0165\n    } tento s\xfabor s ulo\u017een\xfdmi poz\xedciami bez potenci\xe1lneho konfliktu je op\xe4tovn\xe9 na\u010d\xedtanie tohto obsahu. Chcete napriek tomu pokra\u010dova\u0165?\nsave-download = Stiahnu\u0165\nsave-replace = Nahradi\u0165\nsave-delete = Vymaza\u0165\nsave-backup-all = Stiahnu\u0165 v\u0161etky s\xfabory s ulo\u017een\xfdmi poz\xedciami\n',
						'volume-controls.ftl': 'volume-controls = Ovl\xe1danie hlasitosti\nvolume-controls-mute = Stlmi\u0165\nvolume-controls-volume = Hlasitos\u0165\n',
					},
					'sv-SE': {
						'context_menu.ftl':
							'context-menu-download-swf = Ladda ner .swf\ncontext-menu-copy-debug-info = Kopiera fels\xf6kningsinfo\ncontext-menu-open-save-manager = \xd6ppna Sparhanteraren\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Om Ruffle-till\xe4gget ({ $version })\n       *[other] Om Ruffle ({ $version })\n    }\ncontext-menu-hide = D\xf6lj denna meny\ncontext-menu-exit-fullscreen = Avsluta helsk\xe4rm\ncontext-menu-enter-fullscreen = Helsk\xe4rm\ncontext-menu-volume-controls = Ljudkontroller\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle kunde inte k\xf6ra det inb\xe4ddade Flashinneh\xe5llet p\xe5 denna sida.\n    Du kan f\xf6rs\xf6ka \xf6ppna filen i en separat flik f\xf6r att kringg\xe5 problemet.\npanic-title = N\xe5got gick fel :(\nmore-info = Mer info\nrun-anyway = K\xf6r \xe4nd\xe5\ncontinue = Forts\xe4tt\nreport-bug = Rapportera Bugg\nupdate-ruffle = Uppdatera Ruffle\nruffle-demo = Webbdemo\nruffle-desktop = Skrivbordsprogram\nruffle-wiki = Se Ruffle-wiki\nenable-hardware-acceleration = Det verkar som att h\xe5rdvaruacceleration inte \xe4r p\xe5. Ruffle kan fortfarande fungera men kan vara orimligt l\xe5ngsam. Du kan ta reda p\xe5 hur man s\xe4tter p\xe5 h\xe5rdvaruacceleration genom att f\xf6lja denna l\xe4nk.\nview-error-details = Visa Felinformation\nopen-in-new-tab = \xd6ppna i en ny flik\nclick-to-unmute = Klicka f\xf6r ljud\nerror-file-protocol =\n    Det verkar som att du k\xf6r Ruffle p\xe5 "fil:"-protokollet.\n    Detta fungerar inte eftersom webbl\xe4sare blockerar m\xe5nga funktioner fr\xe5n att fungera av s\xe4kerhetssk\xe4l.\n    Ist\xe4llet bjuder vi in dig att s\xe4tta upp en lokal server eller antingen anv\xe4nda webbdemon eller skrivbordsprogrammet.\nerror-javascript-config =\n    Ruffle har st\xf6tt p\xe5 ett stort fel p\xe5 grund av en felaktig JavaScript-konfiguration.\n    Om du \xe4r serveradministrat\xf6ren bjuder vi in dig att kontrollera feldetaljerna f\xf6r att ta reda p\xe5 vilken parameter som \xe4r felaktig.\n    Du kan ocks\xe5 konsultera Ruffle-wikin f\xf6r hj\xe4lp.\nerror-wasm-not-found =\n    Ruffle misslyckades ladda ".wasm"-filkomponenten.\n    Om du \xe4r serveradministrat\xf6ren se till att filen har laddats upp korrekt.\n    Om problemet kvarst\xe5r kan du beh\xf6va anv\xe4nda inst\xe4llningen "publicPath": konsultera v\xe4nligen Ruffle-wikin f\xf6r hj\xe4lp.\nerror-wasm-mime-type =\n    Ruffle har st\xf6tt p\xe5 ett stort fel under initialiseringen.\n    Denna webbserver serverar inte ".wasm"-filer med korrekt MIME-typ.\n    Om du \xe4r serveradministrat\xf6ren konsultera v\xe4nligen Ruffle-wikin f\xf6r hj\xe4lp.\nerror-invalid-swf =\n    Ruffle kan inte l\xe4sa den beg\xe4rda filen.\n    Det mest sannolika sk\xe4let \xe4r att den beg\xe4rda filen inte \xe4r en giltig SWF.\nerror-swf-fetch =\n    Ruffle misslyckades ladda SWF-filen.\n    Det mest sannolika sk\xe4let \xe4r att filen inte l\xe4ngre existerar, s\xe5 det finns inget f\xf6r Ruffle att k\xf6ra.\n    F\xf6rs\xf6k att kontakta webbplatsadministrat\xf6ren f\xf6r hj\xe4lp.\nerror-swf-cors =\n    Ruffle misslyckades ladda SWF-filen.\n    \xc5tkomst att h\xe4mta har sannolikt blockerats av CORS-policy.\n    Om du \xe4r serveradministrat\xf6ren konsultera v\xe4nligen Ruffle-wikin f\xf6r hj\xe4lp.\nerror-wasm-cors =\n    Ruffle misslyckades ladda ".wasm"-filkomponenten.\n    \xc5tkomst att h\xe4mta har sannolikt blockerats av CORS-policy.\n    Om du \xe4r serveradministrat\xf6ren konsultera v\xe4nligen Ruffle-wikin f\xf6r hj\xe4lp.\nerror-wasm-invalid =\n    Ruffle har st\xf6tt p\xe5 ett stort fel under initialiseringen.\n    Det verkar som att den h\xe4r sidan har saknade eller ogiltiga filer f\xf6r att k\xf6ra Ruffle.\n    Om du \xe4r serveradministrat\xf6ren konsultera v\xe4nligen Ruffle-wikin f\xf6r hj\xe4lp.\nerror-wasm-download =\n    Ruffle har st\xf6tt p\xe5 ett stort fel under initialiseringen.\n    Detta kan ofta l\xf6sas av sig sj\xe4lv s\xe5 du kan prova att ladda om sidan.\n    Kontakta annars v\xe4nligen webbplatsens administrat\xf6r.\nerror-wasm-disabled-on-edge =\n    Ruffle misslyckades ladda ".wasm"-filkomponenten.\n    F\xf6r att \xe5tg\xe4rda detta f\xf6rs\xf6k att \xf6ppna webbl\xe4sarens inst\xe4llningar, klicka p\xe5 "Sekretess, s\xf6kning och tj\xe4nster", bl\xe4ddra ner och st\xe4ng av "F\xf6rb\xe4ttra s\xe4kerheten p\xe5 webben".\n    Detta till\xe5ter din webbl\xe4sare att ladda ".wasm"-filerna.\n    Om problemet kvarst\xe5r kan du beh\xf6va anv\xe4nda en annan webbl\xe4sare.\nerror-javascript-conflict =\n    Ruffle har st\xf6tt p\xe5 ett stort fel under initialiseringen.\n    Det verkar som att den h\xe4r sidan anv\xe4nder JavaScript-kod som st\xf6r Ruffle.\n    Om du \xe4r serveradministrat\xf6ren bjuder vi in dig att f\xf6rs\xf6ka k\xf6ra filen p\xe5 en blank sida.\nerror-javascript-conflict-outdated = Du kan ocks\xe5 f\xf6rs\xf6ka ladda upp en nyare version av Ruffle, vilket kan kringg\xe5 problemet (nuvarande version \xe4r utdaterad: { $buildDate }).\nerror-csp-conflict =\n    Ruffle har st\xf6tt p\xe5 ett stort fel under initialiseringen.\n    Webbserverns Content Security Policy till\xe5ter inte ".wasm"-komponenten att k\xf6ra.\n    Om du \xe4r serveradministrat\xf6ren konsultera v\xe4nligen Ruffle-wikin f\xf6r hj\xe4lp.\nerror-unknown =\n    Ruffle har st\xf6tt p\xe5 ett stort fel medan den f\xf6rs\xf6kte visa Flashinneh\xe5llet.\n    { $outdated ->\n        [true] Om du \xe4r serveradministrat\xf6ren f\xf6rs\xf6k att ladda upp en nyare version av Ruffle (nuvarande version \xe4r utdaterad: { $buildDate }).\n       *[false] Detta \xe4r inte t\xe4nkt att h\xe4nda s\xe5 vi skulle verkligen uppskatta om du kunde rapportera in en bugg!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = \xc4r du s\xe4ker p\xe5 att du vill radera sparfilen?\nsave-reload-prompt =\n    Det enda s\xe4ttet att { $action ->\n        [delete] radera\n       *[replace] ers\xe4tta\n    } denna sparfil utan potentiell konflikt \xe4r att ladda om inneh\xe5llet. Vill du forts\xe4tta \xe4nd\xe5?\nsave-download = Ladda ner\nsave-replace = Ers\xe4tt\nsave-delete = Radera\nsave-backup-all = Ladda ner alla sparfiler\n',
						'volume-controls.ftl': 'volume-controls = Ljudkontroller\nvolume-controls-mute = St\xe4ng av ljud\nvolume-controls-volume = Volym\n',
					},
					'tr-TR': {
						'context_menu.ftl':
							'context-menu-download-swf = \u0130ndir .swf\ncontext-menu-copy-debug-info = Hata ay\u0131klama bilgisini kopyala\ncontext-menu-open-save-manager = Kay\u0131t Y\xf6neticisini A\xe7\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle Uzant\u0131s\u0131 Hakk\u0131nda ({ $version })\n       *[other] Ruffle Hakk\u0131nda ({ $version })\n    }\ncontext-menu-hide = Bu men\xfcy\xfc gizle\ncontext-menu-exit-fullscreen = Tam ekrandan \xe7\u0131k\ncontext-menu-enter-fullscreen = Tam ekran yap\ncontext-menu-volume-controls = Ses kontrolleri\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle, bu sayfaya g\xf6m\xfcl\xfc Flash\'\u0131 \xe7al\u0131\u015ft\u0131ramad\u0131.\n    Bu sorunu ortadan kald\u0131rmak i\xe7in dosyay\u0131 ayr\u0131 bir sekmede a\xe7may\u0131 deneyebilirsiniz.\npanic-title = Bir \u015feyler yanl\u0131\u015f gitti :(\nmore-info = Daha fazla bilgi\nrun-anyway = Yine de \xe7al\u0131\u015ft\u0131r\ncontinue = Devam et\nreport-bug = Hata Bildir\nupdate-ruffle = Ruffle\'\u0131 G\xfcncelle\nruffle-demo = A\u011f Demosu\nruffle-desktop = Masa\xfcst\xfc Uygulamas\u0131\nruffle-wiki = Ruffle Wiki\'yi G\xf6r\xfcnt\xfcle\nenable-hardware-acceleration = G\xf6r\xfcn\xfc\u015fe g\xf6re donan\u0131m h\u0131zland\u0131rma etkin de\u011fil. Ruffle \xe7al\u0131\u015fabilir ancak fazlas\u0131yla yava\u015f olabilir. Donan\u0131m h\u0131zland\u0131rmay\u0131 nas\u0131l etkinle\u015ftirebilice\u011finiz hakk\u0131nda bu linkten bilgi edinebilirsiniz.\nview-error-details = Hata Ayr\u0131nt\u0131lar\u0131n\u0131 G\xf6r\xfcnt\xfcle\nopen-in-new-tab = Yeni sekmede a\xe7\nclick-to-unmute = Sesi a\xe7mak i\xe7in t\u0131klay\u0131n\nerror-file-protocol =\n    G\xf6r\xfcn\xfc\u015fe g\xf6re Ruffle\'\u0131 "dosya:" protokol\xfcnde \xe7al\u0131\u015ft\u0131r\u0131yorsunuz.\n    Taray\u0131c\u0131lar g\xfcvenlik nedenleriyle bir\xe7ok \xf6zelli\u011fin \xe7al\u0131\u015fmas\u0131n\u0131 engelledi\u011finden bu i\u015fe yaramaz.\n    Bunun yerine, sizi yerel bir sunucu kurmaya veya a\u011f\u0131n demosunu ya da masa\xfcst\xfc uygulamas\u0131n\u0131 kullanmaya davet ediyoruz.\nerror-javascript-config =\n    Ruffle, yanl\u0131\u015f bir JavaScript yap\u0131land\u0131rmas\u0131 nedeniyle \xf6nemli bir sorunla kar\u015f\u0131la\u015ft\u0131.\n    Sunucu y\xf6neticisiyseniz, hangi parametrenin hatal\u0131 oldu\u011funu bulmak i\xe7in sizi hata ayr\u0131nt\u0131lar\u0131n\u0131 kontrol etmeye davet ediyoruz.\n    Yard\u0131m i\xe7in Ruffle wiki\'sine de ba\u015fvurabilirsiniz.\nerror-wasm-not-found =\n    Ruffle gerekli ".wasm" dosya bile\u015fenini y\xfckleyemedi.\n    Sunucu y\xf6neticisi iseniz, l\xfctfen dosyan\u0131n do\u011fru bir \u015fekilde y\xfcklendi\u011finden emin olun.\n    Sorun devam ederse, "publicPath" ayar\u0131n\u0131 kullanman\u0131z gerekebilir: yard\u0131m i\xe7in l\xfctfen Ruffle wiki\'sine ba\u015fvurun.\nerror-wasm-mime-type =\n    Ruffle, ba\u015flatmaya \xe7al\u0131\u015f\u0131rken \xf6nemli bir sorunla kar\u015f\u0131la\u015ft\u0131.\n    Bu web sunucusu, do\u011fru MIME tipinde ".wasm" dosyalar\u0131 sunmuyor.\n    Sunucu y\xf6neticisiyseniz, yard\u0131m i\xe7in l\xfctfen Ruffle wiki\'sine ba\u015fvurun.\nerror-invalid-swf =\n    Ruffle istenen dosyay\u0131 ayr\u0131\u015ft\u0131ram\u0131yor.\n    Bunun en olas\u0131 nedeni, istenen dosyan\u0131n ge\xe7erli bir SWF olmamas\u0131d\u0131r.\nerror-swf-fetch =\n    Ruffle, Flash SWF dosyas\u0131n\u0131 y\xfckleyemedi.\n    Bunun en olas\u0131 nedeni, dosyan\u0131n art\u0131k mevcut olmamas\u0131 ve bu nedenle Ruffle\'\u0131n y\xfckleyece\u011fi hi\xe7bir \u015feyin olmamas\u0131d\u0131r.\n    Yard\u0131m i\xe7in web sitesi y\xf6neticisiyle ileti\u015fime ge\xe7meyi deneyin.\nerror-swf-cors =\n    Ruffle, Flash SWF dosyas\u0131n\u0131 y\xfckleyemedi.\n    Getirme eri\u015fimi muhtemelen CORS politikas\u0131 taraf\u0131ndan engellenmi\u015ftir.\n    Sunucu y\xf6neticisiyseniz, yard\u0131m i\xe7in l\xfctfen Ruffle wiki\'sine ba\u015fvurun.\nerror-wasm-cors =\n    Ruffle gerekli ".wasm" dosya bile\u015fenini y\xfckleyemedi.\n    Getirme eri\u015fimi muhtemelen CORS politikas\u0131 taraf\u0131ndan engellenmi\u015ftir.\n    Sunucu y\xf6neticisiyseniz, yard\u0131m i\xe7in l\xfctfen Ruffle wiki\'sine ba\u015fvurun.\nerror-wasm-invalid =\n    Ruffle, ba\u015flatmaya \xe7al\u0131\u015f\u0131rken \xf6nemli bir sorunla kar\u015f\u0131la\u015ft\u0131.\n    G\xf6r\xfcn\xfc\u015fe g\xf6re bu sayfada Ruffle\'\u0131 \xe7al\u0131\u015ft\u0131rmak i\xe7in eksik veya ge\xe7ersiz dosyalar var.\n    Sunucu y\xf6neticisiyseniz, yard\u0131m i\xe7in l\xfctfen Ruffle wiki\'sine ba\u015fvurun.\nerror-wasm-download =\n    Ruffle, ba\u015flatmaya \xe7al\u0131\u015f\u0131rken \xf6nemli bir sorunla kar\u015f\u0131la\u015ft\u0131.\n    Bu genellikle kendi kendine \xe7\xf6z\xfclebilir, bu nedenle sayfay\u0131 yeniden y\xfcklemeyi deneyebilirsiniz.\n    Aksi takdirde, l\xfctfen site y\xf6neticisiyle ileti\u015fime ge\xe7in.\nerror-wasm-disabled-on-edge =\n    Ruffle gerekli ".wasm" dosya bile\u015fenini y\xfckleyemedi.\n    Bunu d\xfczeltmek i\xe7in taray\u0131c\u0131n\u0131z\u0131n ayarlar\u0131n\u0131 a\xe7\u0131n, "Gizlilik, arama ve hizmetler"i t\u0131klay\u0131n, a\u015fa\u011f\u0131 kayd\u0131r\u0131n ve "Web\'de g\xfcvenli\u011finizi art\u0131r\u0131n"\u0131 kapatmay\u0131 deneyin.\n    Bu, taray\u0131c\u0131n\u0131z\u0131n gerekli ".wasm" dosyalar\u0131n\u0131 y\xfcklemesine izin verecektir.\n    Sorun devam ederse, farkl\u0131 bir taray\u0131c\u0131 kullanman\u0131z gerekebilir.\nerror-javascript-conflict =\n    Ruffle, ba\u015flatmaya \xe7al\u0131\u015f\u0131rken \xf6nemli bir sorunla kar\u015f\u0131la\u015ft\u0131.\n    G\xf6r\xfcn\xfc\u015fe g\xf6re bu sayfa, Ruffle ile \xe7ak\u0131\u015fan JavaScript kodu kullan\u0131yor.\n    Sunucu y\xf6neticisiyseniz, sizi dosyay\u0131 bo\u015f bir sayfaya y\xfcklemeyi denemeye davet ediyoruz.\nerror-javascript-conflict-outdated = Ayr\u0131ca sorunu giderebilecek daha yeni bir Ruffle s\xfcr\xfcm\xfc y\xfcklemeyi de deneyebilirsiniz (mevcut yap\u0131m eskimi\u015f: { $buildDate }).\nerror-csp-conflict =\n    Ruffle, ba\u015flatmaya \xe7al\u0131\u015f\u0131rken \xf6nemli bir sorunla kar\u015f\u0131la\u015ft\u0131.\n    Bu web sunucusunun \u0130\xe7erik G\xfcvenli\u011fi Politikas\u0131, gerekli ".wasm" bile\u015feninin \xe7al\u0131\u015fmas\u0131na izin vermiyor.\n    Sunucu y\xf6neticisiyseniz, yard\u0131m i\xe7in l\xfctfen Ruffle wiki\'sine bak\u0131n.\nerror-unknown =\n    Ruffle, bu Flash i\xe7eri\u011fini g\xf6r\xfcnt\xfclemeye \xe7al\u0131\u015f\u0131rken \xf6nemli bir sorunla kar\u015f\u0131la\u015ft\u0131.\n    { $outdated ->\n        [true] Sunucu y\xf6neticisiyseniz, l\xfctfen Ruffle\'\u0131n daha yeni bir s\xfcr\xfcm\xfcn\xfc y\xfcklemeyi deneyin (mevcut yap\u0131m eskimi\u015f: { $buildDate }).\n       *[false] Bunun olmamas\u0131 gerekiyor, bu y\xfczden bir hata bildirebilirseniz \xe7ok memnun oluruz!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = Bu kay\u0131t dosyas\u0131n\u0131 silmek istedi\u011finize emin misiniz?\nsave-reload-prompt =\n    Bu kaydetme dosyas\u0131n\u0131 potansiyel \xe7ak\u0131\u015fma olmadan { $action ->\n        [delete] silmenin\n       *[replace] de\u011fi\u015ftirmenin\n    } tek yolu, bu i\xe7eri\u011fi yeniden y\xfcklemektir. Yine de devam etmek istiyor musunuz?\nsave-download = \u0130ndir\nsave-replace = De\u011fi\u015ftir\nsave-delete = Sil\nsave-backup-all = T\xfcm kay\u0131t dosyalar\u0131n\u0131 indir\n',
						'volume-controls.ftl': 'volume-controls = Ses kontrolleri\nvolume-controls-mute = Sustur\nvolume-controls-volume = Ses\n',
					},
					'zh-CN': {
						'context_menu.ftl':
							'context-menu-download-swf = \u4e0b\u8f7d .swf\ncontext-menu-copy-debug-info = \u590d\u5236\u8c03\u8bd5\u4fe1\u606f\ncontext-menu-open-save-manager = \u6253\u5f00\u5b58\u6863\u7ba1\u7406\u5668\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] \u5173\u4e8e Ruffle \u6269\u5c55 ({ $version })\n       *[other] \u5173\u4e8e Ruffle ({ $version })\n    }\ncontext-menu-hide = \u9690\u85cf\u6b64\u83dc\u5355\ncontext-menu-exit-fullscreen = \u9000\u51fa\u5168\u5c4f\ncontext-menu-enter-fullscreen = \u8fdb\u5165\u5168\u5c4f\ncontext-menu-volume-controls = \u97f3\u91cf\u63a7\u5236\n',
						'messages.ftl':
							'message-cant-embed =\n    Ruffle \u65e0\u6cd5\u8fd0\u884c\u5d4c\u5165\u5728\u6b64\u9875\u9762\u4e2d\u7684 Flash\u3002\n    \u60a8\u53ef\u4ee5\u5c1d\u8bd5\u5728\u5355\u72ec\u7684\u6807\u7b7e\u9875\u4e2d\u6253\u5f00\u8be5\u6587\u4ef6\uff0c\u4ee5\u56de\u907f\u6b64\u95ee\u9898\u3002\npanic-title = \u51fa\u4e86\u4e9b\u95ee\u9898 :(\nmore-info = \u66f4\u591a\u4fe1\u606f\nrun-anyway = \u4ecd\u7136\u8fd0\u884c\ncontinue = \u7ee7\u7eed\nreport-bug = \u53cd\u9988\u95ee\u9898\nupdate-ruffle = \u66f4\u65b0 Ruffle\nruffle-demo = \u7f51\u9875\u6f14\u793a\nruffle-desktop = \u684c\u9762\u5e94\u7528\u7a0b\u5e8f\nruffle-wiki = \u67e5\u770b Ruffle Wiki\nenable-hardware-acceleration = \u770b\u8d77\u6765\u786c\u4ef6\u52a0\u901f\u672a\u542f\u7528\u3002\u867d\u7136 Ruffle \u53ef\u80fd\u8fd0\u884c\uff0c\u4f46\u53ef\u80fd\u4f1a\u975e\u5e38\u6162\u3002\u60a8\u53ef\u4ee5\u901a\u8fc7\u6b64\u94fe\u63a5\u4e86\u89e3\u542f\u7528\u786c\u4ef6\u52a0\u901f\u7684\u65b9\u6cd5\u3002\nview-error-details = \u67e5\u770b\u9519\u8bef\u8be6\u60c5\nopen-in-new-tab = \u5728\u65b0\u6807\u7b7e\u9875\u4e2d\u6253\u5f00\nclick-to-unmute = \u70b9\u51fb\u53d6\u6d88\u9759\u97f3\nerror-file-protocol =\n    \u770b\u6765\u60a8\u6b63\u5728 "file:" \u534f\u8bae\u4e0a\u4f7f\u7528 Ruffle\u3002\n    \u7531\u4e8e\u6d4f\u89c8\u5668\u4ee5\u5b89\u5168\u539f\u56e0\u963b\u6b62\u8bb8\u591a\u529f\u80fd\uff0c\u56e0\u6b64\u8fd9\u4e0d\u8d77\u4f5c\u7528\u3002\n    \u76f8\u53cd\u6211\u4eec\u9080\u8bf7\u60a8\u8bbe\u7f6e\u672c\u5730\u670d\u52a1\u5668\u6216\u4f7f\u7528\u7f51\u9875\u6f14\u793a\u6216\u684c\u9762\u5e94\u7528\u7a0b\u5e8f\u3002\nerror-javascript-config =\n    \u7531\u4e8e\u9519\u8bef\u7684 JavaScript \u914d\u7f6e\uff0cRuffle \u9047\u5230\u4e86\u4e00\u4e2a\u91cd\u5927\u95ee\u9898\u3002\n    \u5982\u679c\u60a8\u662f\u670d\u52a1\u5668\u7ba1\u7406\u5458\uff0c\u6211\u4eec\u9080\u8bf7\u60a8\u68c0\u67e5\u9519\u8bef\u8be6\u7ec6\u4fe1\u606f\uff0c\u4ee5\u627e\u51fa\u54ea\u4e2a\u53c2\u6570\u6709\u6545\u969c\u3002\n    \u60a8\u4e5f\u53ef\u4ee5\u67e5\u9605 Ruffle \u7684 Wiki \u83b7\u53d6\u5e2e\u52a9\u3002\nerror-wasm-not-found =\n    Ruffle \u65e0\u6cd5\u52a0\u8f7d\u6240\u9700\u7684 \u201c.wasm\u201d \u6587\u4ef6\u7ec4\u4ef6\u3002\n    \u5982\u679c\u60a8\u662f\u670d\u52a1\u5668\u7ba1\u7406\u5458\uff0c\u8bf7\u786e\u4fdd\u6587\u4ef6\u5df2\u6b63\u786e\u4e0a\u4f20\u3002\n    \u5982\u679c\u95ee\u9898\u4ecd\u7136\u5b58\u5728\uff0c\u60a8\u53ef\u80fd\u9700\u8981\u4f7f\u7528 \u201cpublicPath\u201d \u8bbe\u7f6e\uff1a\u8bf7\u67e5\u770b Ruffle \u7684 Wiki \u83b7\u53d6\u5e2e\u52a9\u3002\nerror-wasm-mime-type =\n    Ruffle \u5728\u8bd5\u56fe\u521d\u59cb\u5316\u65f6\u9047\u5230\u4e86\u4e00\u4e2a\u91cd\u5927\u95ee\u9898\u3002\n    \u8be5\u7f51\u7ad9\u670d\u52a1\u5668\u6ca1\u6709\u63d0\u4f9b ".asm\u201d \u6587\u4ef6\u6b63\u786e\u7684 MIME \u7c7b\u578b\u3002\n    \u5982\u679c\u60a8\u662f\u670d\u52a1\u5668\u7ba1\u7406\u5458\uff0c\u8bf7\u67e5\u9605 Ruffle Wiki \u83b7\u53d6\u5e2e\u52a9\u3002\nerror-invalid-swf =\n    Ruffle\u65e0\u6cd5\u89e3\u6790\u8bf7\u6c42\u7684\u6587\u4ef6\u3002\n    \u6700\u6709\u53ef\u80fd\u7684\u539f\u56e0\u662f\u8be5\u8bf7\u6c42\u6587\u4ef6\u4e0d\u662f\u4e00\u4e2a\u5408\u6cd5\u7684SWF\u6587\u4ef6\u3002\nerror-swf-fetch =\n    Ruffle \u65e0\u6cd5\u52a0\u8f7d Flash SWF \u6587\u4ef6\u3002\n    \u6700\u53ef\u80fd\u7684\u539f\u56e0\u662f\u6587\u4ef6\u4e0d\u518d\u5b58\u5728\u6240\u4ee5 Ruffle \u6ca1\u6709\u8981\u52a0\u8f7d\u7684\u5185\u5bb9\u3002\n    \u8bf7\u5c1d\u8bd5\u8054\u7cfb\u7f51\u7ad9\u7ba1\u7406\u5458\u5bfb\u6c42\u5e2e\u52a9\u3002\nerror-swf-cors =\n    Ruffle \u65e0\u6cd5\u52a0\u8f7d Flash SWF \u6587\u4ef6\u3002\n    \u83b7\u53d6\u6743\u9650\u53ef\u80fd\u88ab CORS \u7b56\u7565\u963b\u6b62\u3002\n    \u5982\u679c\u60a8\u662f\u670d\u52a1\u5668\u7ba1\u7406\u5458\uff0c\u8bf7\u53c2\u8003 Ruffle Wiki \u83b7\u53d6\u5e2e\u52a9\u3002\nerror-wasm-cors =\n    Ruffle \u65e0\u6cd5\u52a0\u8f7d\u6240\u9700\u7684\u201c.wasm\u201d\u6587\u4ef6\u7ec4\u4ef6\u3002\n    \u83b7\u53d6\u6743\u9650\u53ef\u80fd\u88ab CORS \u7b56\u7565\u963b\u6b62\u3002\n    \u5982\u679c\u60a8\u662f\u670d\u52a1\u5668\u7ba1\u7406\u5458\uff0c\u8bf7\u67e5\u9605 Ruffle Wiki \u83b7\u53d6\u5e2e\u52a9\u3002\nerror-wasm-invalid =\n    Ruffle \u5728\u8bd5\u56fe\u521d\u59cb\u5316\u65f6\u9047\u5230\u4e86\u4e00\u4e2a\u91cd\u5927\u95ee\u9898\u3002\n    \u8fd9\u4e2a\u9875\u9762\u4f3c\u4e4e\u7f3a\u5c11\u6587\u4ef6\u6765\u8fd0\u884c Curl\u3002\n    \u5982\u679c\u60a8\u662f\u670d\u52a1\u5668\u7ba1\u7406\u5458\uff0c\u8bf7\u67e5\u9605 Ruffle Wiki \u83b7\u53d6\u5e2e\u52a9\u3002\nerror-wasm-download =\n    Ruffle \u5728\u8bd5\u56fe\u521d\u59cb\u5316\u65f6\u9047\u5230\u4e86\u4e00\u4e2a\u91cd\u5927\u95ee\u9898\u3002\n    \u8fd9\u901a\u5e38\u53ef\u4ee5\u81ea\u884c\u89e3\u51b3\uff0c\u56e0\u6b64\u60a8\u53ef\u4ee5\u5c1d\u8bd5\u91cd\u65b0\u52a0\u8f7d\u9875\u9762\u3002\n    \u5426\u5219\u8bf7\u8054\u7cfb\u7f51\u7ad9\u7ba1\u7406\u5458\u3002\nerror-wasm-disabled-on-edge =\n    Ruffle \u65e0\u6cd5\u52a0\u8f7d\u6240\u9700\u7684 \u201c.wasm\u201d \u6587\u4ef6\u7ec4\u4ef6\u3002\n    \u8981\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\uff0c\u8bf7\u5c1d\u8bd5\u6253\u5f00\u60a8\u7684\u6d4f\u89c8\u5668\u8bbe\u7f6e\uff0c\u5355\u51fb"\u9690\u79c1\u3001\u641c\u7d22\u548c\u670d\u52a1"\uff0c\u5411\u4e0b\u6eda\u52a8\u5e76\u5173\u95ed"\u589e\u5f3a Web \u5b89\u5168\u6027"\u3002\n    \u8fd9\u5c06\u5141\u8bb8\u60a8\u7684\u6d4f\u89c8\u5668\u52a0\u8f7d\u6240\u9700\u7684 \u201c.wasm\u201d \u6587\u4ef6\u3002\n    \u5982\u679c\u95ee\u9898\u4ecd\u7136\u5b58\u5728\uff0c\u60a8\u53ef\u80fd\u5fc5\u987b\u4f7f\u7528\u4e0d\u540c\u7684\u6d4f\u89c8\u5668\u3002\nerror-javascript-conflict =\n    Ruffle \u5728\u8bd5\u56fe\u521d\u59cb\u5316\u65f6\u9047\u5230\u4e86\u4e00\u4e2a\u91cd\u5927\u95ee\u9898\u3002\n    \u8fd9\u4e2a\u9875\u9762\u4f3c\u4e4e\u4f7f\u7528\u4e86\u4e0e Ruffle \u51b2\u7a81\u7684 JavaScript \u4ee3\u7801\u3002\n    \u5982\u679c\u60a8\u662f\u670d\u52a1\u5668\u7ba1\u7406\u5458\uff0c\u6211\u4eec\u5efa\u8bae\u60a8\u5c1d\u8bd5\u5728\u7a7a\u767d\u9875\u9762\u4e0a\u52a0\u8f7d\u6587\u4ef6\u3002\nerror-javascript-conflict-outdated = \u60a8\u8fd8\u53ef\u4ee5\u5c1d\u8bd5\u4e0a\u4f20\u53ef\u80fd\u89c4\u907f\u8be5\u95ee\u9898\u7684\u6700\u65b0\u7248\u672c\u7684 (\u5f53\u524d\u6784\u5efa\u5df2\u8fc7\u65f6: { $buildDate })\u3002\nerror-csp-conflict =\n    Ruffle \u5728\u8bd5\u56fe\u521d\u59cb\u5316\u65f6\u9047\u5230\u4e86\u4e00\u4e2a\u91cd\u5927\u95ee\u9898\u3002\n    \u8be5\u7f51\u7ad9\u670d\u52a1\u5668\u7684\u5185\u5bb9\u5b89\u5168\u7b56\u7565\u4e0d\u5141\u8bb8\u8fd0\u884c\u6240\u9700\u7684 \u201c.wasm\u201d \u7ec4\u4ef6\u3002\n    \u5982\u679c\u60a8\u662f\u670d\u52a1\u5668\u7ba1\u7406\u5458\uff0c\u8bf7\u67e5\u9605 Ruffle Wiki \u83b7\u53d6\u5e2e\u52a9\u3002\nerror-unknown =\n    Ruffle \u5728\u8bd5\u56fe\u663e\u793a\u6b64 Flash \u5185\u5bb9\u65f6\u9047\u5230\u4e86\u4e00\u4e2a\u91cd\u5927\u95ee\u9898\u3002\n    { $outdated ->\n        [true] \u5982\u679c\u60a8\u662f\u670d\u52a1\u5668\u7ba1\u7406\u5458\uff0c\u8bf7\u5c1d\u8bd5\u4e0a\u4f20\u66f4\u65b0\u7684 Ruffle \u7248\u672c (\u5f53\u524d\u7248\u672c\u5df2\u8fc7\u65f6: { $buildDate }).\n       *[false] \u8fd9\u4e0d\u5e94\u8be5\u53d1\u751f\uff0c\u56e0\u6b64\u5982\u679c\u60a8\u53ef\u4ee5\u62a5\u544a\u9519\u8bef\uff0c\u6211\u4eec\u5c06\u975e\u5e38\u611f\u8c22\uff01\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = \u786e\u5b9a\u8981\u5220\u9664\u6b64\u5b58\u6863\u5417\uff1f\nsave-reload-prompt =\n    \u4e3a\u4e86\u907f\u514d\u6f5c\u5728\u7684\u51b2\u7a81\uff0c{ $action ->\n        [delete] \u5220\u9664\n       *[replace] \u66ff\u6362\n    } \u6b64\u5b58\u6863\u6587\u4ef6\u9700\u8981\u91cd\u65b0\u52a0\u8f7d\u5f53\u524d\u5185\u5bb9\u3002\u662f\u5426\u4ecd\u7136\u7ee7\u7eed\uff1f\nsave-download = \u4e0b\u8f7d\nsave-replace = \u66ff\u6362\nsave-delete = \u5220\u9664\nsave-backup-all = \u4e0b\u8f7d\u6240\u6709\u5b58\u6863\u6587\u4ef6\n',
						'volume-controls.ftl': 'volume-controls = \u97f3\u91cf\u63a7\u5236\nvolume-controls-mute = \u9759\u97f3\nvolume-controls-volume = \u97f3\u91cf\n',
					},
					'zh-TW': {
						'context_menu.ftl':
							'context-menu-download-swf = \u4e0b\u8f09SWF\u6a94\u6848\ncontext-menu-copy-debug-info = \u8907\u88fd\u9664\u932f\u8cc7\u8a0a\ncontext-menu-open-save-manager = \u958b\u555f\u5b58\u6a94\u7ba1\u7406\u5668\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] \u95dc\u65bcRuffle\u64f4\u5145\u529f\u80fd ({ $version })\n       *[other] \u95dc\u65bcRuffle ({ $version })\n    }\ncontext-menu-hide = \u96b1\u85cf\u83dc\u55ae\ncontext-menu-exit-fullscreen = \u9000\u51fa\u5168\u87a2\u5e55\ncontext-menu-enter-fullscreen = \u9032\u5165\u5168\u87a2\u5e55\ncontext-menu-volume-controls = \u97f3\u91cf\u63a7\u5236\n',
						'messages.ftl':
							'message-cant-embed =\n    \u76ee\u524dRuffle\u6c92\u8fa6\u6cd5\u57f7\u884c\u5d4c\u5165\u5f0fFlash\u3002\n    \u4f60\u53ef\u4ee5\u5728\u65b0\u5206\u9801\u4e2d\u958b\u555f\u4f86\u89e3\u6c7a\u9019\u500b\u554f\u984c\u3002\npanic-title = \u5b8c\u86cb\uff0c\u51fa\u554f\u984c\u4e86 :(\nmore-info = \u66f4\u591a\u8cc7\u8a0a\nrun-anyway = \u76f4\u63a5\u57f7\u884c\ncontinue = \u7e7c\u7e8c\nreport-bug = \u56de\u5831BUG\nupdate-ruffle = \u66f4\u65b0Ruffle\nruffle-demo = \u7db2\u9801\u5c55\u793a\nruffle-desktop = \u684c\u9762\u61c9\u7528\u7a0b\u5f0f\nruffle-wiki = \u67e5\u770bRuffle Wiki\nenable-hardware-acceleration =\n    \u770b\u8d77\u4f86\u4f60\u7684\u786c\u9ad4\u52a0\u901f\u6c92\u6709\u958b\u555f\uff0c\u96d6\u7136Ruffle\u9084\u53ef\u4ee5\u57f7\u884c\uff0c\u4f46\u662f\u4f60\u6703\u611f\u89ba\u5230\u6703\u5f88\u6162\u3002\n    \u4f60\u53ef\u4ee5\u5728\u4e0b\u65b9\u9023\u7d50\u627e\u5230\u5982\u4f55\u958b\u555f\u786c\u9ad4\u52a0\u901f\u3002\nview-error-details = \u6aa2\u8996\u932f\u8aa4\u8a73\u7d30\u8cc7\u6599\nopen-in-new-tab = \u958b\u555f\u65b0\u589e\u5206\u9801\nclick-to-unmute = \u9ede\u64ca\u4ee5\u53d6\u6d88\u975c\u97f3\nerror-file-protocol =\n    \u770b\u8d77\u4f86\u4f60\u60f3\u8981\u7528Ruffle\u4f86\u57f7\u884c"file:"\u7684\u5354\u8b70\u3002\n    \u56e0\u70ba\u700f\u89bd\u5668\u7981\u4e86\u5f88\u591a\u529f\u80fd\u4ee5\u8cc7\u5b89\u7684\u7406\u7531\u4f86\u8b1b\u3002\n    \u6211\u5011\u5efa\u8b70\u4f60\u5efa\u7acb\u672c\u5730\u4f3a\u670d\u5668\u6216\u8457\u76f4\u63a5\u4f7f\u7528\u7db2\u9801\u5c55\u793a\u6216\u684c\u9762\u61c9\u7528\u7a0b\u5f0f\u3002\nerror-javascript-config =\n    \u76ee\u524dRuffle\u9047\u5230\u4e0d\u6b63\u78ba\u7684JavaScript\u914d\u7f6e\u3002\n    \u5982\u679c\u4f60\u662f\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\uff0c\u6211\u5011\u5efa\u8b70\u4f60\u6aa2\u67e5\u54ea\u500b\u74b0\u7bc0\u51fa\u932f\u3002\n    \u6216\u8457\u4f60\u53ef\u4ee5\u67e5\u8a62Ruffle wiki\u5f97\u5230\u9700\u6c42\u5e6b\u52a9\u3002\nerror-wasm-not-found =\n    \u76ee\u524dRuffle\u627e\u4e0d\u5230".wasm"\u6a94\u6848\u3002\n    \u5982\u679c\u4f60\u662f\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\uff0c\u78ba\u4fdd\u6a94\u6848\u662f\u5426\u653e\u5c0d\u4f4d\u7f6e\u3002\n    \u5982\u679c\u9084\u662f\u6709\u554f\u984c\u7684\u8a71\uff0c\u4f60\u8981\u7528"publicPath"\u4f86\u8a2d\u5b9a: \u6216\u8457\u67e5\u8a62Ruffle wiki\u5f97\u5230\u9700\u6c42\u5e6b\u52a9\u3002\nerror-wasm-mime-type =\n    \u76ee\u524dRuffle\u521d\u59cb\u5316\u6642\u9047\u5230\u91cd\u5927\u554f\u984c\u3002\n    \u9019\u7db2\u9801\u4f3a\u670d\u5668\u4e26\u6c92\u6709\u670d\u52d9".wasm"\u6a94\u6848\u6216\u6b63\u78ba\u7684\u7db2\u969b\u7db2\u8def\u5a92\u9ad4\u985e\u578b\u3002\n    \u5982\u679c\u4f60\u662f\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\uff0c\u8acb\u67e5\u8a62Ruffle wiki\u5f97\u5230\u9700\u6c42\u5e6b\u52a9\u3002\nerror-invalid-swf =\n    \u76ee\u524dRuffle\u7121\u6cd5\u8b80\u53d6Flash\u7684SWF\u6a94\u6848\u3002\n    \u5f88\u6709\u53ef\u80fd\u8981\u8b80\u53d6\u7684\u6a94\u6848\u4e26\u4e00\u500b\u4e0d\u662f\u6709\u6548\u7684SWF\u3002\nerror-swf-fetch =\n    \u76ee\u524dRuffle\u7121\u6cd5\u8b80\u53d6Flash\u7684SWF\u6a94\u6848\u3002\n    \u5f88\u6709\u53ef\u80fd\u8981\u8b80\u53d6\u7684\u6a94\u6848\u4e0d\u5b58\u5728\uff0c\u6240\u4ee5Ruffle\u8b80\u4e0d\u5230\u6771\u897f\u3002\n    \u8acb\u5617\u8a66\u6e9d\u901a\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\u5f97\u5230\u9700\u6c42\u5e6b\u52a9\u3002\nerror-swf-cors =\n    \u76ee\u524dRuffle\u7121\u6cd5\u8b80\u53d6Flash\u7684SWF\u6a94\u6848\u3002\n    \u770b\u8d77\u4f86\u662f\u4f7f\u7528\u6b0a\u88ab\u8de8\u4f86\u6e90\u8cc7\u6e90\u5171\u7528\u6a5f\u5236\u88ab\u64cb\u5230\u4e86\u3002\n    \u5982\u679c\u4f60\u662f\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\uff0c\u8acb\u67e5\u8a62Ruffle wiki\u5f97\u5230\u9700\u6c42\u5e6b\u52a9\u3002\nerror-wasm-cors =\n    \u76ee\u524dRuffle\u7121\u6cd5\u8b80\u53d6".wasm"\u6a94\u6848\u3002\n    \u770b\u8d77\u4f86\u662f\u4f7f\u7528\u6b0a\u88ab\u8de8\u4f86\u6e90\u8cc7\u6e90\u5171\u7528\u6a5f\u5236\u88ab\u64cb\u5230\u4e86\u3002\n    \u5982\u679c\u4f60\u662f\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\uff0c\u8acb\u67e5\u8a62Ruffle wiki\u5f97\u5230\u9700\u6c42\u5e6b\u52a9\u3002\nerror-wasm-invalid =\n    \u76ee\u524dRuffle\u521d\u59cb\u5316\u6642\u9047\u5230\u91cd\u5927\u554f\u984c\u3002\n    \u770b\u8d77\u4f86\u9019\u7db2\u9801\u6709\u7f3a\u5931\u6a94\u6848\u5c0e\u81f4Ruffle\u7121\u6cd5\u904b\u884c\u3002\n    \u5982\u679c\u4f60\u662f\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\uff0c\u8acb\u67e5\u8a62Ruffle wiki\u5f97\u5230\u9700\u6c42\u5e6b\u52a9\u3002\nerror-wasm-download =\n    \u76ee\u524dRuffle\u521d\u59cb\u5316\u6642\u9047\u5230\u91cd\u5927\u554f\u984c\u3002\n    \u9019\u53ef\u4ee5\u4f60\u81ea\u5df1\u89e3\u6c7a\uff0c\u4f60\u53ea\u8981\u91cd\u65b0\u6574\u7406\u5c31\u597d\u4e86\u3002\n    \u5426\u5247\uff0c\u8acb\u5617\u8a66\u6e9d\u901a\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\u5f97\u5230\u9700\u6c42\u5e6b\u52a9\u3002\nerror-wasm-disabled-on-edge =\n    \u76ee\u524dRuffle\u7121\u6cd5\u8b80\u53d6".wasm"\u6a94\u6848\u3002\n    \u8981\u4fee\u6b63\u7684\u8a71\uff0c\u6253\u958b\u4f60\u7684\u700f\u89bd\u5668\u8a2d\u5b9a\uff0c\u9ede\u9078"\u96b1\u79c1\u6b0a\u3001\u641c\u5c0b\u8207\u670d\u52d9"\uff0c\u628a"\u9632\u6b62\u8ffd\u8e64"\u7d66\u95dc\u6389\u3002\n    \u9019\u6a23\u4e00\u4f86\u4f60\u7684\u700f\u89bd\u5668\u6703\u8b80\u53d6\u9700\u8981\u7684".wasm"\u6a94\u6848\u3002\n    \u5982\u679c\u554f\u984c\u4e00\u76f4\u9084\u5728\u7684\u8a71\uff0c\u4f60\u5fc5\u9808\u8981\u63db\u700f\u89bd\u5668\u4e86\u3002\nerror-javascript-conflict =\n    \u76ee\u524dRuffle\u521d\u59cb\u5316\u6642\u9047\u5230\u91cd\u5927\u554f\u984c\u3002\n    \u770b\u8d77\u4f86\u9019\u7db2\u9801\u4f7f\u7528\u7684JavaScript\u6703\u8ddfRuffle\u8d77\u885d\u7a81\u3002\n    \u5982\u679c\u4f60\u662f\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\uff0c\u6211\u5011\u5efa\u8b70\u4f60\u958b\u500b\u7a7a\u767d\u9801\u4f86\u6e2c\u8a66\u3002\nerror-javascript-conflict-outdated = \u4f60\u4e5f\u53ef\u4ee5\u4e0a\u50b3\u6700\u65b0\u7248\u7684Ruffle\uff0c\u8aaa\u4e0d\u5b9a\u4f60\u8981\u8aaa\u7684\u7684\u554f\u984c\u5df2\u7d93\u4e0d\u898b\u4e86(\u73fe\u5728\u4f7f\u7528\u7684\u7248\u672c\u5df2\u7d93\u904e\u6642: { $buildDate })\u3002\nerror-csp-conflict =\n    \u76ee\u524dRuffle\u521d\u59cb\u5316\u6642\u9047\u5230\u91cd\u5927\u554f\u984c\u3002\n    \u9019\u7db2\u9801\u4f3a\u670d\u5668\u88ab\u8de8\u4f86\u6e90\u8cc7\u6e90\u5171\u7528\u6a5f\u5236\u7981\u6b62\u8b80\u53d6".wasm"\u6a94\u6848\u3002\n    \u5982\u679c\u4f60\u662f\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\uff0c\u8acb\u67e5\u8a62Ruffle wiki\u5f97\u5230\u9700\u6c42\u5e6b\u52a9\u3002\nerror-unknown =\n    \u76ee\u524dRuffle\u521d\u59cb\u5316\u8981\u8b80\u53d6Flash\u5167\u5bb9\u6642\u9047\u5230\u91cd\u5927\u554f\u984c\n    { $outdated ->\n        [true] \u5982\u679c\u4f60\u662f\u4f3a\u670d\u5668\u7ba1\u7406\u54e1\uff0c \u8acb\u4e0a\u50b3\u6700\u65b0\u7248\u7684Ruffle(\u73fe\u5728\u4f7f\u7528\u7684\u7248\u672c\u5df2\u7d93\u904e\u6642: { $buildDate }).\n       *[false] \u9019\u4e0d\u61c9\u8a72\u767c\u751f\u7684\uff0c\u6211\u5011\u4e5f\u5f88\u9ad8\u8208\u4f60\u544a\u77e5bug!\n    }\n',
						'save-manager.ftl':
							'save-delete-prompt = \u4f60\u78ba\u5b9a\u8981\u522a\u9664\u9019\u500b\u5b58\u6a94\u55ce\uff1f\nsave-reload-prompt =\n    \u552f\u4e00\u65b9\u6cd5\u53ea\u6709 { $action ->\n        [delete] \u522a\u9664\n       *[replace] \u53d6\u4ee3\n    } \u9019\u500b\u5b58\u6a94\u4e0d\u6703\u5b8c\u5168\u53d6\u4ee3\u76f4\u5230\u91cd\u65b0\u555f\u52d5. \u4f60\u9700\u8981\u7e7c\u7e8c\u55ce?\nsave-download = \u4e0b\u8f09\nsave-replace = \u53d6\u4ee3\nsave-delete = \u522a\u9664\nsave-backup-all = \u4e0b\u8f09\u6240\u6709\u5b58\u6a94\u6a94\u6848\u3002\n',
						'volume-controls.ftl': 'volume-controls = \u97f3\u91cf\u63a7\u5236\nvolume-controls-mute = \u975c\u97f3\nvolume-controls-volume = \u97f3\u91cf\n',
					},
				},
				pe = {};
			for (const [e, n] of Object.entries(me)) {
				const t = new $(e);
				if (n) for (const [a, r] of Object.entries(n)) if (r) for (const n of t.addResource(new ie(r))) console.error(`Error in text for ${e} ${a}: ${n}`);
				pe[e] = t;
			}
			function he(e, n, t) {
				const a = pe[e];
				if (void 0 !== a) {
					const e = a.getMessage(n);
					if (void 0 !== e && e.value) return a.formatPattern(e.value, t);
				}
				return null;
			}
			function ve(e, n) {
				const t = fe(navigator.languages, Object.keys(pe), { defaultLocale: 'en-US' });
				for (const a in t) {
					const r = he(t[a], e, n);
					if (r) return r;
				}
				return console.error(`Unknown text key '${e}'`), e;
			}
			function be(e, n) {
				const t = document.createElement('div');
				return (
					ve(e, n)
						.split('\n')
						.forEach(e => {
							const n = document.createElement('p');
							(n.innerText = e), t.appendChild(n);
						}),
					t
				);
			}
			function ge(e, n, t, a, r) {
				const o = r ? document.createElementNS(r, e) : document.createElement(e);
				if ((n && (o.id = n), t && r ? o.classList.add(t) : t && (o.className = t), a)) for (const [e, n] of Object.entries(a)) o.setAttribute(e, n);
				return o;
			}
			function we(e, n, t, a, r) {
				const o = ge('input', n);
				return (o.type = e), t && (o.min = t), a && (o.max = a), r && (o.step = r), o;
			}
			function ke(e, n) {
				const t = ge('label', e);
				return (t.htmlFor = n), t;
			}
			function ye(e, n) {
				e.appendChild(n);
			}
			const Re = document.createElement('template'),
				xe = 'http://www.w3.org/2000/svg',
				ze = ge('style', 'static-styles'),
				Se = ge('style', 'dynamic-styles'),
				je = ge('div', 'container'),
				Ee = ge('div', 'play-button'),
				Ce = ge('div', void 0, 'icon'),
				Ae = ge(
					'svg',
					void 0,
					void 0,
					{ xmlns: xe, 'xmlns:xlink': 'http://www.w3.org/1999/xlink', preserveAspectRatio: 'xMidYMid', viewBox: '0 0 250 250', width: '100%', height: '100%' },
					xe
				),
				Fe = ge('defs', void 0, void 0, void 0, xe),
				qe = ge('linearGradient', 'a', void 0, { gradientUnits: 'userSpaceOnUse', x1: '125', y1: '0', x2: '125', y2: '250', spreadMethod: 'pad' }, xe),
				De = ge('stop', void 0, void 0, { offset: '0%', 'stop-color': '#FDA138' }, xe),
				Ie = ge('stop', void 0, void 0, { offset: '100%', 'stop-color': '#FD3A40' }, xe),
				Pe = ge('g', 'b', void 0, void 0, xe),
				$e = ge(
					'path',
					void 0,
					void 0,
					{ fill: 'url(#a)', d: 'M250 125q0-52-37-88-36-37-88-37T37 37Q0 73 0 125t37 88q36 37 88 37t88-37q37-36 37-88M87 195V55l100 70-100 70z' },
					xe
				),
				Oe = ge('path', void 0, void 0, { fill: '#FFF', d: 'M87 55v140l100-70L87 55z' }, xe),
				Me = document.createElementNS(xe, 'use');
			Me.href.baseVal = '#b';
			const We = ge('div', 'unmute-overlay'),
				Le = ge('div', void 0, 'background'),
				Te = ge('div', void 0, 'icon'),
				Ne = ge(
					'svg',
					'unmute-overlay-svg',
					void 0,
					{
						xmlns: xe,
						'xmlns:xlink': 'http://www.w3.org/1999/xlink',
						preserveAspectRatio: 'xMidYMid',
						viewBox: '0 0 512 584',
						width: '100%',
						height: '100%',
						scale: '0.8',
					},
					xe
				),
				Ue = ge(
					'path',
					void 0,
					void 0,
					{
						fill: '#FFF',
						stroke: '#FFF',
						d: 'm457.941 256 47.029-47.029c9.372-9.373 9.372-24.568 0-33.941-9.373-9.373-24.568-9.373-33.941 0l-47.029 47.029-47.029-47.029c-9.373-9.373-24.568-9.373-33.941 0-9.372 9.373-9.372 24.568 0 33.941l47.029 47.029-47.029 47.029c-9.372 9.373-9.372 24.568 0 33.941 4.686 4.687 10.827 7.03 16.97 7.03s12.284-2.343 16.971-7.029l47.029-47.03 47.029 47.029c4.687 4.687 10.828 7.03 16.971 7.03s12.284-2.343 16.971-7.029c9.372-9.373 9.372-24.568 0-33.941z',
					},
					xe
				),
				_e = ge(
					'path',
					void 0,
					void 0,
					{ fill: '#FFF', stroke: '#FFF', d: 'm99 160h-55c-24.301 0-44 19.699-44 44v104c0 24.301 19.699 44 44 44h55c2.761 0 5-2.239 5-5v-182c0-2.761-2.239-5-5-5z' },
					xe
				),
				Be = ge(
					'path',
					void 0,
					void 0,
					{
						fill: '#FFF',
						stroke: '#FFF',
						d: 'm280 56h-24c-5.269 0-10.392 1.734-14.578 4.935l-103.459 79.116c-1.237.946-1.963 2.414-1.963 3.972v223.955c0 1.557.726 3.026 1.963 3.972l103.459 79.115c4.186 3.201 9.309 4.936 14.579 4.936h23.999c13.255 0 24-10.745 24-24v-352.001c0-13.255-10.745-24-24-24z',
					},
					xe
				),
				Je = ge('text', 'unmute-text', void 0, { x: '256', y: '560', 'text-anchor': 'middle', 'font-size': '60px', fill: '#FFF', stroke: '#FFF' }, xe),
				Ve = ge('input', 'virtual-keyboard', void 0, { type: 'text', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off' }),
				He = ge('div', 'splash-screen', 'hidden'),
				Ze = ge('svg', void 0, 'logo', { xmlns: xe, 'xmlns:xlink': 'http://www.w3.org/1999/xlink', preserveAspectRatio: 'xMidYMid', viewBox: '0 0 380 150' }, xe),
				Ke = ge('g', void 0, void 0, void 0, xe),
				Ge = ge(
					'path',
					void 0,
					void 0,
					{
						fill: '#966214',
						d: 'M58.75 85.6q.75-.1 1.5-.35.85-.25 1.65-.75.55-.35 1.05-.8.5-.45.95-1 .5-.5.75-1.2-.05.05-.15.1-.1.15-.25.25l-.1.2q-.15.05-.25.1-.4 0-.8.05-.5-.25-.9-.5-.3-.1-.55-.3l-.6-.6-4.25-6.45-1.5 11.25h3.45m83.15-.2h3.45q.75-.1 1.5-.35.25-.05.45-.15.35-.15.65-.3l.5-.3q.25-.15.5-.35.45-.35.9-.75.45-.35.75-.85l.1-.1q.1-.2.2-.35.2-.3.35-.6l-.3.4-.15.15q-.5.15-1.1.1-.25 0-.4-.05-.5-.15-.8-.4-.15-.1-.25-.25-.3-.3-.55-.6l-.05-.05v-.05l-4.25-6.4-1.5 11.25m-21.15-3.95q-.3-.3-.55-.6l-.05-.05v-.05l-4.25-6.4-1.5 11.25h3.45q.75-.1 1.5-.35.85-.25 1.6-.75.75-.5 1.4-1.1.45-.35.75-.85.35-.5.65-1.05l-.45.55q-.5.15-1.1.1-.9 0-1.45-.7m59.15.3q-.75-.5-1.4-1-3.15-2.55-3.5-6.4l-1.5 11.25h21q-3.1-.25-5.7-.75-5.6-1.05-8.9-3.1m94.2 3.85h3.45q.6-.1 1.2-.3.4-.1.75-.2.35-.15.65-.3.7-.35 1.35-.8.75-.55 1.3-1.25.1-.15.25-.3-2.55-.25-3.25-1.8l-4.2-6.3-1.5 11.25m-45.3-4.85q-.5-.4-.9-.8-2.3-2.35-2.6-5.6l-1.5 11.25h21q-11.25-.95-16-4.85m97.7 4.85q-.3-.05-.6-.05-10.8-1-15.4-4.8-3.15-2.55-3.5-6.35l-1.5 11.2h21Z',
					},
					xe
				),
				Ye = ge(
					'path',
					void 0,
					void 0,
					{
						fill: 'var(--ruffle-orange)',
						d: 'M92.6 54.8q-1.95-1.4-4.5-1.4H60.35q-1.35 0-2.6.45-1.65.55-3.15 1.8-2.75 2.25-3.25 5.25l-1.65 12h.05v.3l5.85 1.15h-9.5q-.5.05-1 .15-.5.15-1 .35-.5.2-.95.45-.5.3-.95.7-.45.35-.85.8-.35.4-.65.85-.3.45-.5.9-.15.45-.3.95l-5.85 41.6H50.3l5-35.5 1.5-11.25 4.25 6.45.6.6q.25.2.55.3.4.25.9.5.4-.05.8-.05.1-.05.25-.1l.1-.2q.15-.1.25-.25.1-.05.15-.1l.3-1.05 1.75-12.3h11.15L75.8 82.6h16.5l2.3-16.25h-.05l.8-5.7q.4-2.45-1-4.2-.35-.4-.75-.8-.25-.25-.55-.5-.2-.2-.45-.35m16.2 18.1h.05l-.05.3 5.85 1.15H105.2q-.5.05-1 .15-.5.15-1 .35-.5.2-.95.45-.5.3-1 .65-.4.4-.8.85-.25.3-.55.65-.05.1-.15.2-.25.45-.4.9-.2.45-.3.95-.1.65-.2 1.25-.2 1.15-.4 2.25l-4.3 30.6q-.25 3 1.75 5.25 1.6 1.8 4 2.15.6.1 1.25.1h27.35q3.25 0 6-2.25.35-.35.7-.55l.3-.2q2-2 2.25-4.5l1.65-11.6q.05-.05.1-.05l1.65-11.35h.05l.7-5.2 1.5-11.25 4.25 6.4v.05l.05.05q.25.3.55.6.1.15.25.25.3.25.8.4.15.05.4.05.6.05 1.1-.1l.15-.15.3-.4.3-1.05 1.3-9.05h-.05l.7-5.05h-.05l.15-1.25h-.05l1.65-11.7h-16.25l-2.65 19.5h.05v.2l-.05.1h.05l5.8 1.15H132.7q-.5.05-1 .15-.5.15-1 .35-.15.05-.3.15-.3.1-.55.25-.05 0-.1.05-.5.3-1 .65-.4.35-.7.7-.55.7-.95 1.45-.35.65-.55 1.4-.15.7-.25 1.4v.05q-.15 1.05-.35 2.05l-1.2 8.75v.1l-2.1 14.7H111.4l2.25-15.55h.05l.7-5.2 1.5-11.25 4.25 6.4v.05l.05.05q.25.3.55.6.55.7 1.45.7.6.05 1.1-.1l.45-.55.3-1.05 1.3-9.05h-.05l.7-5.05h-.05l.15-1.25h-.05l1.65-11.7h-16.25l-2.65 19.5m106.5-41.75q-2.25-2.25-5.5-2.25h-27.75q-3 0-5.75 2.25-1.3.95-2.05 2.1-.45.6-.7 1.2-.2.5-.35 1-.1.45-.15.95l-4.15 29.95h-.05l-.7 5.2h-.05l-.2 1.35h.05l-.05.3 5.85 1.15h-9.45q-2.1.05-3.95 1.6-1.9 1.55-2.25 3.55l-.5 3.5h-.05l-5.3 38.1h16.25l5-35.5 1.5-11.25q.35 3.85 3.5 6.4.65.5 1.4 1 3.3 2.05 8.9 3.1 2.6.5 5.7.75l1.75-11.25h-12.2l.4-2.95h-.05l.7-5.05h-.05q.1-.9.3-1.9.1-.75.2-1.6.85-5.9 2.15-14.9 0-.15.05-.25l.1-.9q.2-1.55.45-3.15h11.25l-3.1 20.8h16.5l4.1-28.05q.15-1.7-.4-3.15-.5-1.1-1.35-2.1m46.65 44.15q-.5.3-1 .65-.4.4-.8.85-.35.4-.7.85-.25.45-.45.9-.15.45-.3.95l-5.85 41.6h16.25l5-35.5 1.5-11.25 4.2 6.3q.7 1.55 3.25 1.8l.05-.1q.25-.4.35-.85l.3-1.05 1.8-14.05v-.05l5.35-37.45h-16.25l-6.15 44.3 5.85 1.15h-9.45q-.5.05-1 .15-.5.15-1 .35-.5.2-.95.45m5.4-38.9q.15-1.7-.4-3.15-.5-1.1-1.35-2.1-2.25-2.25-5.5-2.25h-27.75q-2.3 0-4.45 1.35-.65.35-1.3.9-1.3.95-2.05 2.1-.45.6-.7 1.2-.4.9-.5 1.95l-4.15 29.95h-.05l-.7 5.2h-.05l-.2 1.35h.05l-.05.3 5.85 1.15h-9.45q-2.1.05-3.95 1.6-1.9 1.55-2.25 3.55l-.5 3.5h-.05l-1.2 8.75v.1l-4.1 29.25h16.25l5-35.5 1.5-11.25q.3 3.25 2.6 5.6.4.4.9.8 4.75 3.9 16 4.85l1.75-11.25h-12.2l.4-2.95h-.05l.7-5.05h-.05q.15-.9.3-1.9.1-.75.25-1.6.15-1.25.35-2.65v-.05q.95-6.7 2.35-16.5h11.25l-3.1 20.8h16.5l4.1-28.05M345 66.35h-.05l1.15-8.2q.5-3-1.75-5.25-1.25-1.25-3-1.75-1-.5-2.25-.5h-27.95q-.65 0-1.3.1-2.5.35-4.7 2.15-2.75 2.25-3.25 5.25l-1.95 14.7v.05l-.05.3 5.85 1.15h-9.45q-1.9.05-3.6 1.35-.2.1-.35.25-1.9 1.55-2.25 3.55l-4.85 34.1q-.25 3 1.75 5.25 1.25 1.4 3 1.95 1.05.3 2.25.3H320q3.25 0 6-2.25 2.75-2 3.25-5l2.75-18.5h-16.5l-1.75 11H302.5l2.1-14.75h.05l.85-6 1.5-11.2q.35 3.8 3.5 6.35 4.6 3.8 15.4 4.8.3 0 .6.05h15.75L345 66.35m-16.4-.95-1.25 8.95h-11.3l.4-2.95h-.05l.7-5.05h-.1l.15-.95h11.45Z',
					},
					xe
				),
				Qe = ge('svg', void 0, 'loading-animation', { xmlns: xe, viewBox: '0 0 66 66' }, xe),
				Xe = ge('circle', void 0, 'spinner', { fill: 'none', 'stroke-width': '6', 'stroke-linecap': 'round', cx: '33', cy: '33', r: '30' }, xe),
				en = ge('div', void 0, 'loadbar'),
				nn = ge('div', void 0, 'loadbar-inner'),
				tn = ge('div', 'save-manager', 'modal hidden'),
				an = ge('div', 'modal-area', 'modal-area'),
				rn = ge('span', void 0, 'close-modal');
			rn.textContent = '\xd7';
			const on = ge('div', void 0, 'general-save-options'),
				ln = ge('span', 'backup-saves', 'save-option'),
				sn = ge('table', 'local-saves'),
				un = ge('div', 'volume-controls-modal', 'modal hidden'),
				cn = ge('div', void 0, 'modal-area'),
				dn = ge('span', void 0, 'close-modal');
			dn.textContent = '\xd7';
			const fn = ge('div', 'volume-controls'),
				mn = ge('h2', 'volume-controls-heading'),
				pn = ke('mute-checkbox-label', 'mute-checkbox'),
				hn = we('checkbox', 'mute-checkbox'),
				vn = ge('div', void 0, 'slider-container'),
				bn = ke('volume-slider-label', 'volume-slider'),
				gn = we('range', 'volume-slider', '0', '100', '1'),
				wn = ge('span', 'volume-slider-text'),
				kn = ge('div', 'video-modal', 'modal hidden'),
				yn = ge('div', void 0, 'modal-area'),
				Rn = ge('span', void 0, 'close-modal');
			Rn.textContent = '\xd7';
			const xn = ge('div', 'video-holder'),
				zn = ge('div', 'hardware-acceleration-modal', 'modal hidden'),
				Sn = ge('div', void 0, 'modal-area'),
				jn = ge('span', void 0, 'close-modal');
			jn.textContent = '\xd7';
			const En = document.createElement('a');
			(En.href = 'https://github.com/ruffle-rs/ruffle/wiki/Frequently-Asked-Questions-For-Users#chrome-hardware-acceleration'),
				(En.target = '_blank'),
				(En.className = 'acceleration-link'),
				(En.textContent = ve('enable-hardware-acceleration'));
			const Cn = ge('div', 'context-menu-overlay', 'hidden'),
				An = ge('ul', 'context-menu');
			ye(Re.content, ze),
				ye(Re.content, Se),
				ye(Re.content, je),
				ye(je, Ee),
				ye(Ee, Ce),
				ye(Ce, Ae),
				ye(Ae, Fe),
				ye(Fe, qe),
				ye(qe, De),
				ye(qe, Ie),
				ye(Fe, Pe),
				ye(Pe, $e),
				ye(Pe, Oe),
				ye(Ae, Me),
				ye(je, We),
				ye(We, Le),
				ye(We, Te),
				ye(Te, Ne),
				ye(Ne, Ue),
				ye(Ne, _e),
				ye(Ne, Be),
				ye(Ne, Je),
				ye(je, Ve),
				ye(Re.content, He),
				ye(He, Ze),
				ye(Ze, Ke),
				ye(Ke, Ge),
				ye(Ke, Ye),
				ye(He, Qe),
				ye(Qe, Xe),
				ye(He, en),
				ye(en, nn),
				ye(Re.content, tn),
				ye(tn, an),
				ye(an, rn),
				ye(an, on),
				ye(on, ln),
				ye(an, sn),
				ye(Re.content, un),
				ye(un, cn),
				ye(cn, dn),
				ye(cn, fn),
				ye(fn, mn),
				ye(fn, pn),
				ye(fn, hn),
				ye(fn, vn),
				ye(vn, bn),
				ye(vn, gn),
				ye(vn, wn),
				ye(Re.content, kn),
				ye(kn, yn),
				ye(yn, Rn),
				ye(yn, xn),
				ye(Re.content, zn),
				ye(zn, Sn),
				ye(Sn, jn),
				ye(Sn, En),
				ye(Re.content, Cn),
				ye(Cn, An);
			const Fn = {};
			function qn(e, n) {
				const t = Fn[e];
				if (void 0 !== t) {
					if (t.class !== n) throw new Error('Internal naming conflict on ' + e);
					return t.name;
				}
				let a = 0;
				if (void 0 !== window.customElements)
					for (; a < 999; ) {
						let t = e;
						if ((a > 0 && (t = t + '-' + a), void 0 === window.customElements.get(t)))
							return window.customElements.define(t, n), (Fn[e] = { class: n, name: t, internalName: e }), t;
						a += 1;
					}
				throw new Error('Failed to assign custom element ' + e);
			}
			var Dn, In, Pn, $n, On, Mn, Wn, Ln, Tn, Nn;
			!(function (e) {
				(e.On = 'on'), (e.Off = 'off'), (e.Auto = 'auto');
			})(Dn || (Dn = {})),
				(function (e) {
					(e.Off = 'off'), (e.Fullscreen = 'fullscreen'), (e.On = 'on');
				})(In || (In = {})),
				(function (e) {
					(e.Visible = 'visible'), (e.Hidden = 'hidden');
				})(Pn || (Pn = {})),
				(function (e) {
					(e.Error = 'error'), (e.Warn = 'warn'), (e.Info = 'info'), (e.Debug = 'debug'), (e.Trace = 'trace');
				})($n || ($n = {})),
				(function (e) {
					(e.Window = 'window'), (e.Opaque = 'opaque'), (e.Transparent = 'transparent'), (e.Direct = 'direct'), (e.Gpu = 'gpu');
				})(On || (On = {})),
				(function (e) {
					(e.WebGpu = 'webgpu'), (e.WgpuWebgl = 'wgpu-webgl'), (e.Webgl = 'webgl'), (e.Canvas = 'canvas');
				})(Mn || (Mn = {})),
				(function (e) {
					(e.On = 'on'), (e.RightClickOnly = 'rightClickOnly'), (e.Off = 'off');
				})(Wn || (Wn = {})),
				(function (e) {
					(e.AIR = 'air'), (e.FlashPlayer = 'flashPlayer');
				})(Ln || (Ln = {})),
				(function (e) {
					(e.Allow = 'allow'), (e.Confirm = 'confirm'), (e.Deny = 'deny');
				})(Tn || (Tn = {})),
				(function (e) {
					(e.All = 'all'), (e.Internal = 'internal'), (e.None = 'none');
				})(Nn || (Nn = {}));
			const Un = {
					allowScriptAccess: !1,
					parameters: {},
					autoplay: Dn.Auto,
					backgroundColor: null,
					letterbox: In.Fullscreen,
					unmuteOverlay: Pn.Visible,
					upgradeToHttps: !0,
					compatibilityRules: !0,
					favorFlash: !0,
					warnOnUnsupportedContent: !0,
					logLevel: $n.Error,
					showSwfDownload: !1,
					contextMenu: Wn.On,
					preloader: !0,
					splashScreen: !0,
					maxExecutionDuration: 15,
					base: null,
					menu: !0,
					allowFullscreen: !1,
					salign: '',
					forceAlign: !1,
					quality: 'high',
					scale: 'showAll',
					forceScale: !1,
					frameRate: null,
					wmode: On.Window,
					publicPath: null,
					polyfills: !0,
					playerVersion: null,
					preferredRenderer: null,
					openUrlMode: Tn.Allow,
					allowNetworking: Nn.All,
					openInNewTab: null,
					socketProxy: [],
					fontSources: [],
					defaultFonts: {},
					credentialAllowList: [],
					playerRuntime: Ln.FlashPlayer,
				},
				_n = 'application/x-shockwave-flash',
				Bn = 'application/futuresplash',
				Jn = 'application/x-shockwave-flash2-preview',
				Vn = 'application/vnd.adobe.flash.movie';
			function Hn(e, n) {
				const t = (function (e) {
					let n = '';
					try {
						n = new URL(e, 'https://example.com').pathname;
					} catch (e) {}
					if (n && n.length >= 4) {
						const e = n.slice(-4).toLowerCase();
						if ('.swf' === e || '.spl' === e) return !0;
					}
					return !1;
				})(e);
				return n
					? (function (e, n) {
							switch ((e = e.toLowerCase())) {
								case _n.toLowerCase():
								case Bn.toLowerCase():
								case Jn.toLowerCase():
								case Vn.toLowerCase():
									return !0;
								default:
									if (n)
										switch (e) {
											case 'application/octet-stream':
											case 'binary/octet-stream':
												return !0;
										}
							}
							return !1;
						})(n, t)
					: t;
			}
			const Zn = {
				versionNumber: '0.1.0',
				versionName: 'nightly 2024-06-14',
				versionChannel: 'nightly',
				buildDate: '2024-06-14T00:05:36.625Z',
				commitHash: '22c73e9536d5ce3651da093a6995140b13977a91',
			};
			function Kn(e) {
				return null != e;
			}
			function Gn(e, n) {
				if (
					(Kn(n.allowScriptAccess) && e.setAllowScriptAccess(n.allowScriptAccess),
					Kn(n.backgroundColor) &&
						e.setBackgroundColor(
							(function (e) {
								e.startsWith('#') && (e = e.substring(1));
								if (e.length < 6) return;
								let n = 0;
								for (let t = 0; t < 6; t++) {
									const a = parseInt(e[t], 16);
									isNaN(a) ? (n <<= 4) : (n = (n << 4) | a);
								}
								return n;
							})(n.backgroundColor)
						),
					Kn(n.upgradeToHttps) && e.setUpgradeToHttps(n.upgradeToHttps),
					Kn(n.compatibilityRules) && e.setCompatibilityRules(n.compatibilityRules),
					Kn(n.letterbox) && e.setLetterbox(n.letterbox.toLowerCase()),
					Kn(n.base) && e.setBaseUrl(n.base),
					Kn(n.menu) && e.setShowMenu(n.menu),
					Kn(n.allowFullscreen) && e.setAllowFullscreen(n.allowFullscreen),
					Kn(n.salign) && e.setStageAlign(n.salign.toLowerCase()),
					Kn(n.forceAlign) && e.setForceAlign(n.forceAlign),
					Kn(n.quality)
						? e.setQuality(n.quality.toLowerCase())
						: void 0 !== window.orientation && (console.log('Running on a mobile device; defaulting to low quality'), e.setQuality('low')),
					Kn(n.scale) && e.setScale(n.scale.toLowerCase()),
					Kn(n.forceScale) && e.setForceScale(n.forceScale),
					Kn(n.frameRate) && e.setFrameRate(n.frameRate),
					Kn(n.wmode) && e.setWmode(n.wmode),
					Kn(n.logLevel) && e.setLogLevel(n.logLevel),
					Kn(n.maxExecutionDuration) &&
						e.setMaxExecutionDuration(
							(function (e) {
								if ('number' == typeof e) return e;
								return e.secs;
							})(n.maxExecutionDuration)
						),
					Kn(n.playerVersion) && e.setPlayerVersion(n.playerVersion),
					Kn(n.preferredRenderer) && e.setPreferredRenderer(n.preferredRenderer),
					Kn(n.openUrlMode) && e.setOpenUrlMode(n.openUrlMode.toLowerCase()),
					Kn(n.allowNetworking) && e.setAllowNetworking(n.allowNetworking.toLowerCase()),
					Kn(n.credentialAllowList) && e.setCredentialAllowList(n.credentialAllowList),
					Kn(n.playerRuntime) && e.setPlayerRuntime(n.playerRuntime),
					Kn(n.socketProxy))
				)
					for (const t of n.socketProxy) e.addSocketProxy(t.host, t.port, t.proxyUrl);
			}
			const Yn = 'https://ruffle.rs',
				Qn = /^\s*(\d+(\.\d+)?(%)?)/;
			let Xn = !1;
			var et, nt;
			function tt(e) {
				if (null == e) return {};
				e instanceof URLSearchParams || (e = new URLSearchParams(e));
				const n = {};
				for (const [t, a] of e) n[t] = a.toString();
				return n;
			}
			!(function (e) {
				(e[(e.Unknown = 0)] = 'Unknown'),
					(e[(e.CSPConflict = 1)] = 'CSPConflict'),
					(e[(e.FileProtocol = 2)] = 'FileProtocol'),
					(e[(e.InvalidWasm = 3)] = 'InvalidWasm'),
					(e[(e.JavascriptConfiguration = 4)] = 'JavascriptConfiguration'),
					(e[(e.JavascriptConflict = 5)] = 'JavascriptConflict'),
					(e[(e.WasmCors = 6)] = 'WasmCors'),
					(e[(e.WasmDownload = 7)] = 'WasmDownload'),
					(e[(e.WasmMimeType = 8)] = 'WasmMimeType'),
					(e[(e.WasmNotFound = 9)] = 'WasmNotFound'),
					(e[(e.WasmDisabledMicrosoftEdge = 10)] = 'WasmDisabledMicrosoftEdge'),
					(e[(e.InvalidSwf = 11)] = 'InvalidSwf'),
					(e[(e.SwfFetchError = 12)] = 'SwfFetchError'),
					(e[(e.SwfCors = 13)] = 'SwfCors');
			})(et || (et = {}));
			class at {
				constructor(e, n) {
					(this.x = e), (this.y = n);
				}
				distanceTo(e) {
					const n = e.x - this.x,
						t = e.y - this.y;
					return Math.sqrt(n * n + t * t);
				}
			}
			class rt {
				constructor(e = '#', n = ve('view-error-details')) {
					(this.url = e), (this.label = n);
				}
			}
			class ot extends HTMLElement {
				get readyState() {
					return this._readyState;
				}
				get metadata() {
					return this._metadata;
				}
				constructor() {
					super(),
						(this.contextMenuForceDisabled = !1),
						(this.isTouch = !1),
						(this.contextMenuSupported = !1),
						(this.panicked = !1),
						(this.rendererDebugInfo = ''),
						(this.longPressTimer = null),
						(this.pointerDownPosition = null),
						(this.pointerMoveMaxDistance = 0),
						(this.config = {}),
						(this.shadow = this.attachShadow({ mode: 'open' })),
						this.shadow.appendChild(Re.content.cloneNode(!0)),
						(this.dynamicStyles = this.shadow.getElementById('dynamic-styles')),
						(this.staticStyles = this.shadow.getElementById('static-styles')),
						(this.container = this.shadow.getElementById('container')),
						(this.playButton = this.shadow.getElementById('play-button')),
						this.playButton.addEventListener('click', () => this.play()),
						(this.unmuteOverlay = this.shadow.getElementById('unmute-overlay')),
						(this.splashScreen = this.shadow.getElementById('splash-screen')),
						(this.virtualKeyboard = this.shadow.getElementById('virtual-keyboard')),
						this.virtualKeyboard.addEventListener('input', this.virtualKeyboardInput.bind(this)),
						(this.saveManager = this.shadow.getElementById('save-manager')),
						(this.videoModal = this.shadow.getElementById('video-modal')),
						(this.hardwareAccelerationModal = this.shadow.getElementById('hardware-acceleration-modal')),
						(this.volumeControls = this.shadow.getElementById('volume-controls-modal')),
						this.addModalJavaScript(this.saveManager),
						this.addModalJavaScript(this.volumeControls),
						this.addModalJavaScript(this.videoModal),
						this.addModalJavaScript(this.hardwareAccelerationModal),
						(this.volumeSettings = new ft(!1, 100)),
						this.addVolumeControlsJavaScript(this.volumeControls);
					const e = this.saveManager.querySelector('#backup-saves');
					e && (e.addEventListener('click', this.backupSaves.bind(this)), (e.innerText = ve('save-backup-all')));
					const n = this.unmuteOverlay.querySelector('#unmute-overlay-svg');
					if (n) {
						n.querySelector('#unmute-text').textContent = ve('click-to-unmute');
					}
					(this.contextMenuOverlay = this.shadow.getElementById('context-menu-overlay')),
						(this.contextMenuElement = this.shadow.getElementById('context-menu')),
						document.documentElement.addEventListener('pointerdown', this.checkIfTouch.bind(this)),
						this.addEventListener('contextmenu', this.showContextMenu.bind(this)),
						this.container.addEventListener('pointerdown', this.pointerDown.bind(this)),
						this.container.addEventListener('pointermove', this.checkLongPressMovement.bind(this)),
						this.container.addEventListener('pointerup', this.checkLongPress.bind(this)),
						this.container.addEventListener('pointercancel', this.clearLongPressTimer.bind(this)),
						this.addEventListener('fullscreenchange', this.fullScreenChange.bind(this)),
						this.addEventListener('webkitfullscreenchange', this.fullScreenChange.bind(this)),
						(this.instance = null),
						(this.newZipWriter = null),
						(this.onFSCommand = null),
						(this._readyState = nt.HaveNothing),
						(this._metadata = null),
						(this.lastActivePlayingState = !1),
						this.setupPauseOnTabHidden();
				}
				addModalJavaScript(e) {
					const n = e.querySelector('#video-holder');
					this.container.addEventListener('click', () => {
						e.classList.add('hidden'), n && (n.textContent = '');
					});
					const t = e.querySelector('.modal-area');
					t && t.addEventListener('click', e => e.stopPropagation());
					const a = e.querySelector('.close-modal');
					a &&
						a.addEventListener('click', () => {
							e.classList.add('hidden'), n && (n.textContent = '');
						});
				}
				addVolumeControlsJavaScript(e) {
					const n = e.querySelector('#mute-checkbox'),
						t = e.querySelector('#volume-slider'),
						a = e.querySelector('#volume-slider-text'),
						r = e.querySelector('#volume-controls-heading'),
						o = e.querySelector('#mute-checkbox-label'),
						i = e.querySelector('#volume-slider-label');
					(r.textContent = ve('volume-controls')),
						(o.textContent = ve('volume-controls-mute')),
						(i.textContent = ve('volume-controls-volume')),
						(n.checked = this.volumeSettings.isMuted),
						(t.disabled = n.checked),
						(t.valueAsNumber = this.volumeSettings.volume),
						(i.style.color = n.checked ? 'grey' : 'black'),
						(a.style.color = n.checked ? 'grey' : 'black'),
						(a.textContent = String(this.volumeSettings.volume)),
						n.addEventListener('change', () => {
							var e;
							(t.disabled = n.checked),
								(i.style.color = n.checked ? 'grey' : 'black'),
								(a.style.color = n.checked ? 'grey' : 'black'),
								(this.volumeSettings.isMuted = n.checked),
								null === (e = this.instance) || void 0 === e || e.set_volume(this.volumeSettings.get_volume());
						}),
						t.addEventListener('input', () => {
							var e;
							(a.textContent = t.value),
								(this.volumeSettings.volume = t.valueAsNumber),
								null === (e = this.instance) || void 0 === e || e.set_volume(this.volumeSettings.get_volume());
						});
				}
				setupPauseOnTabHidden() {
					document.addEventListener(
						'visibilitychange',
						() => {
							this.instance &&
								(document.hidden && ((this.lastActivePlayingState = this.instance.is_playing()), this.instance.pause()),
								document.hidden || !0 !== this.lastActivePlayingState || this.instance.play());
						},
						!1
					);
				}
				get height() {
					return this.getAttribute('height') || '';
				}
				set height(e) {
					this.setAttribute('height', e);
				}
				get width() {
					return this.getAttribute('width') || '';
				}
				set width(e) {
					this.setAttribute('width', e);
				}
				get type() {
					return this.getAttribute('type') || '';
				}
				set type(e) {
					this.setAttribute('type', e);
				}
				connectedCallback() {
					this.updateStyles(),
						(function (e) {
							if (!e.sheet) return;
							const n = [
								':host {\n            all: initial;\n            pointer-events: inherit;\n\n            --ruffle-blue: #37528c;\n            --ruffle-orange: #ffad33;\n\n            display: inline-block;\n            position: relative;\n            /* Default width/height; this will get overridden by user styles/attributes. */\n            width: 550px;\n            height: 400px;\n            font-family: Arial, sans-serif;\n            letter-spacing: 0.4px;\n            touch-action: none;\n            user-select: none;\n            -webkit-user-select: none;\n            -webkit-tap-highlight-color: transparent;\n        }',
								':host(:-webkit-full-screen) {\n            display: block;\n            width: 100% !important;\n            height: 100% !important;\n        }',
								'.hidden {\n            display: none !important;\n        }',
								'#container,\n        #play-button,\n        #unmute-overlay,\n        #unmute-overlay .background,\n        #panic,\n        #splash-screen,\n        #message-overlay {\n            position: absolute;\n            top: 0;\n            bottom: 0;\n            left: 0;\n            right: 0;\n        }',
								'#container {\n            overflow: hidden;\n        }',
								'#container canvas {\n            width: 100%;\n            height: 100%;\n        }',
								'#play-button,\n        #unmute-overlay {\n            cursor: pointer;\n            display: none;\n        }',
								'#unmute-overlay .background {\n            background: black;\n            opacity: 0.7;\n        }',
								'#play-button .icon,\n        #unmute-overlay .icon {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            width: 50%;\n            height: 50%;\n            max-width: 384px;\n            max-height: 384px;\n            transform: translate(-50%, -50%);\n            opacity: 0.8;\n        }',
								'#play-button:hover .icon,\n        #unmute-overlay:hover .icon {\n            opacity: 1;\n        }',
								'#panic {\n            font-size: 20px;\n            text-align: center;\n            background: linear-gradient(180deg, #fd3a40 0%, #fda138 100%);\n            color: white;\n            display: flex;\n            flex-flow: column;\n            justify-content: space-around;\n        }',
								'#panic a {\n            color: var(--ruffle-blue);\n            font-weight: bold;\n        }',
								'#panic-title {\n            font-size: xxx-large;\n            font-weight: bold;\n        }',
								'#panic-body.details {\n            flex: 0.9;\n            margin: 0 10px;\n        }',
								'#panic-body textarea {\n            width: 100%;\n            height: 100%;\n            resize: none;\n        }',
								'#panic ul {\n            padding: 0;\n            display: flex;\n            list-style-type: none;\n            justify-content: space-evenly;\n        }',
								'#message-overlay {\n            position: absolute;\n            background: var(--ruffle-blue);\n            color: var(--ruffle-orange);\n            opacity: 1;\n            z-index: 2;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            overflow: auto;\n        }',
								'#message-overlay .message {\n            text-align: center;\n            max-height: 100%;\n            max-width: 100%;\n            padding: 5%;\n            font-size: 20px;\n        }',
								'#message-overlay p {\n            margin: 0.5em 0;\n        }',
								'#message-overlay .message div {\n            display: flex;\n            justify-content: center;\n            flex-wrap: wrap;\n            column-gap: 1em;\n        }',
								'#message-overlay a, #message-overlay button {\n            cursor: pointer;\n            background: var(--ruffle-blue);\n            color: var(--ruffle-orange);\n            border: 2px solid var(--ruffle-orange);\n            font-weight: bold;\n            font-size: 1.25em;\n            border-radius: 0.6em;\n            padding: 10px;\n            text-decoration: none;\n            margin: 2% 0;\n        }',
								'#message-overlay a:hover, #message-overlay button:hover {\n            background: #ffffff4c;\n        }',
								'#continue-btn {\n             cursor: pointer;\n             background: var(--ruffle-blue);\n             color: var(--ruffle-orange);\n             border: 2px solid var(--ruffle-orange);\n             font-weight: bold;\n             font-size: 20px;\n             border-radius: 20px;\n             padding: 10px;\n        }',
								'#continue-btn:hover {\n            background: #ffffff4c;\n        }',
								'#context-menu-overlay {\n            width: 100%;\n            height: 100%;\n            z-index: 1;\n            position: absolute;\n        }',
								'#context-menu {\n            color: black;\n            background: #fafafa;\n            border: 1px solid gray;\n            box-shadow: 0px 5px 10px -5px black;\n            position: absolute;\n            font-size: 14px;\n            text-align: left;\n            list-style: none;\n            padding: 0;\n            margin: 0;\n        }',
								'#context-menu .menu-item {\n            padding: 5px 10px;\n            cursor: pointer;\n            color: black;\n        }',
								'#context-menu .menu-item.disabled {\n            cursor: default;\n            color: gray;\n        }',
								'#context-menu .menu-item:not(.disabled):hover {\n            background: lightgray;\n        }',
								'#context-menu .menu-separator hr {\n            border: none;\n            border-bottom: 1px solid lightgray;\n            margin: 2px;\n        }',
								'#splash-screen {\n            display: flex;\n            flex-direction: column;\n            background: var(--splash-screen-background, var(--preloader-background, var(--ruffle-blue)));\n            align-items: center;\n            justify-content: center;\n        }',
								'.loadbar {\n            width: 100%;\n            max-width: 316px;\n            max-height: 10px;\n            height: 20%;\n            background: #253559;\n        }',
								'.loadbar-inner {\n            width: 0px;\n            max-width: 100%;\n            height: 100%;\n            background: var(--ruffle-orange);\n        }',
								'.logo {\n            display: var(--logo-display, block);\n            max-width: 380px;\n            max-height: 150px;\n        }',
								'.loading-animation {\n            max-width: 28px;\n            max-height: 28px;\n            margin-bottom: 2%;\n            width: 10%;\n            aspect-ratio: 1;\n        }',
								'.spinner {\n            stroke-dasharray: 180;\n            stroke-dashoffset: 135;\n            stroke: var(--ruffle-orange);\n            transform-origin: 50% 50%;\n            animation: rotate 1.5s linear infinite;\n        }',
								'@keyframes rotate {\n            to {\n                transform: rotate(360deg);\n            }\n        }',
								'#virtual-keyboard {\n            position: absolute;\n            opacity: 0;\n            top: -100px;\n            width: 1px;\n            height: 1px;\n        }',
								'.modal {\n            height: inherit;\n            user-select: text;\n        }',
								'.modal-area {\n            position: sticky;\n            background: white;\n            width: fit-content;\n            padding: 16px 28px 16px 16px;\n            border: 3px solid black;\n            margin: auto;\n        }',
								'#modal-area {\n            height: 500px;\n            max-height: calc(100% - 38px);\n            min-height: 80px;\n        }',
								'#restore-save {\n            display: none;\n        }',
								'.replace-save {\n            display: none;\n        }',
								'.save-option {\n            display: inline-block;\n            padding: 3px 10px;\n            margin: 5px 2px;\n            cursor: pointer;\n            border-radius: 50px;\n            background-color: var(--ruffle-blue);\n            color: white;\n        }',
								'.close-modal {\n            position: absolute;\n            top: 5px;\n            right: 10px;\n            cursor: pointer;\n            font-size: x-large;\n        }',
								'.general-save-options {\n            text-align: center;\n            padding-bottom: 8px;\n            border-bottom: 2px solid #888;\n        }',
								'#local-saves {\n            border-collapse: collapse;\n            overflow-y: auto;\n            display: block;\n            padding-right: 16px;\n            height: calc(100% - 45px);\n            min-height: 30px;\n        }',
								'#local-saves td {\n            border-bottom: 1px solid #bbb;\n            height: 30px;\n        }',
								'#local-saves tr td:nth-child(1) {\n            padding-right: 1em;\n            word-break: break-all;\n        }',
								'#local-saves tr:nth-child(even) {\n            background-color: #f2f2f2;\n        }',
								'#video-holder {\n            padding-top: 20px;\n        }',
								'#video-holder video {\n            max-width: 100%;\n            height: calc(100% - 58px);\n        }',
								'.slider-container {\n            margin-top: 10px;\n            display: flex;\n            align-items: center;\n        }',
								'#volume-slider {\n            margin-left: 10px;\n            margin-right: 10px;\n        }',
								'#volume-slider-text {\n            text-align: right;\n            width: 28px;\n        }',
								'.acceleration-link {\n            color: var(--ruffle-blue);\n            text-decoration: none;\n        }',
								'.acceleration-link:hover {\n            text-decoration: underline;\n        }',
							];
							!(function (e, n) {
								for (const t of n)
									try {
										e.insertRule(t);
									} catch (e) {}
							})(e.sheet, n);
						})(this.staticStyles);
				}
				static get observedAttributes() {
					return ['width', 'height'];
				}
				attributeChangedCallback(e, n, t) {
					('width' !== e && 'height' !== e) || this.updateStyles();
				}
				disconnectedCallback() {
					this.destroy();
				}
				updateStyles() {
					if (this.dynamicStyles.sheet) {
						if (this.dynamicStyles.sheet.cssRules) for (let e = this.dynamicStyles.sheet.cssRules.length - 1; e >= 0; e--) this.dynamicStyles.sheet.deleteRule(e);
						const e = this.attributes.getNamedItem('width');
						if (null != e) {
							const n = ot.htmlDimensionToCssDimension(e.value);
							null !== n && this.dynamicStyles.sheet.insertRule(`:host { width: ${n}; }`);
						}
						const n = this.attributes.getNamedItem('height');
						if (null != n) {
							const e = ot.htmlDimensionToCssDimension(n.value);
							null !== e && this.dynamicStyles.sheet.insertRule(`:host { height: ${e}; }`);
						}
					}
				}
				isUnusedFallbackObject() {
					const e = (function (e) {
						const n = Fn[e];
						return void 0 !== n ? { internalName: e, name: n.name, class: n.class } : null;
					})('ruffle-object');
					if (null !== e) {
						let n = this.parentNode;
						for (; n !== document && null !== n; ) {
							if (n.nodeName === e.name) return !0;
							n = n.parentNode;
						}
					}
					return !1;
				}
				async ensureFreshInstance() {
					var e, n, t;
					this.destroy(),
						this.loadedConfig && !1 !== this.loadedConfig.splashScreen && !1 !== this.loadedConfig.preloader && this.showSplashScreen(),
						this.loadedConfig &&
							!1 === this.loadedConfig.preloader &&
							console.warn('The configuration option preloader has been replaced with splashScreen. If you own this website, please update the configuration.'),
						this.loadedConfig &&
							this.loadedConfig.maxExecutionDuration &&
							'number' != typeof this.loadedConfig.maxExecutionDuration &&
							console.warn(
								"Configuration: An obsolete format for duration for 'maxExecutionDuration' was used, please use a single number indicating seconds instead. For instance '15' instead of '{secs: 15, nanos: 0}'."
							),
						this.loadedConfig &&
							'boolean' == typeof this.loadedConfig.contextMenu &&
							console.warn('The configuration option contextMenu no longer takes a boolean. Use "on", "off", or "rightClickOnly".');
					const [a, r] = await p(this.loadedConfig || {}, this.onRuffleDownloadProgress.bind(this)).catch(e => {
						if ((console.error(`Serious error loading Ruffle: ${e}`), 'file:' === window.location.protocol)) e.ruffleIndexError = et.FileProtocol;
						else {
							e.ruffleIndexError = et.WasmNotFound;
							const n = String(e.message).toLowerCase();
							n.includes('mime')
								? (e.ruffleIndexError = et.WasmMimeType)
								: n.includes('networkerror') || n.includes('failed to fetch')
									? (e.ruffleIndexError = et.WasmCors)
									: n.includes('disallowed by embedder')
										? (e.ruffleIndexError = et.CSPConflict)
										: 'CompileError' === e.name
											? (e.ruffleIndexError = et.InvalidWasm)
											: n.includes('could not download wasm module') && 'TypeError' === e.name
												? (e.ruffleIndexError = et.WasmDownload)
												: 'TypeError' === e.name
													? (e.ruffleIndexError = et.JavascriptConflict)
													: navigator.userAgent.includes('Edg') &&
														n.includes('webassembly is not defined') &&
														(e.ruffleIndexError = et.WasmDisabledMicrosoftEdge);
						}
						throw (this.panic(e), e);
					});
					if (
						((this.newZipWriter = r),
						Gn(a, this.loadedConfig || {}),
						a.setVolume(this.volumeSettings.get_volume()),
						null === (e = this.loadedConfig) || void 0 === e ? void 0 : e.fontSources)
					)
						for (const e of this.loadedConfig.fontSources)
							try {
								const n = await fetch(e);
								a.addFont(e, new Uint8Array(await n.arrayBuffer()));
							} catch (n) {
								console.warn(`Couldn't download font source from ${e}`, n);
							}
					for (const e in null === (n = this.loadedConfig) || void 0 === n ? void 0 : n.defaultFonts) {
						const n = this.loadedConfig.defaultFonts[e];
						n && a.setDefaultFont(e, n);
					}
					(this.instance = await a.build(this.container, this).catch(e => {
						throw (console.error(`Serious error loading Ruffle: ${e}`), this.panic(e), e);
					})),
						(this.rendererDebugInfo = this.instance.renderer_debug_info()),
						this.rendererDebugInfo.includes('Adapter Device Type: Cpu') &&
							this.container.addEventListener('mouseover', this.openHardwareAccelerationModal.bind(this), { once: !0 });
					const o = this.instance.renderer_name(),
						i = this.instance.constructor;
					if (
						(console.log(
							'%cNew Ruffle instance created (Version: ' +
								Zn.versionName +
								' | WebAssembly extensions: ' +
								(i.is_wasm_simd_used() ? 'ON' : 'OFF') +
								' | Used renderer: ' +
								(null != o ? o : '') +
								')',
							'background: #37528C; color: #FFAD33'
						),
						'running' !== this.audioState() &&
							((this.container.style.visibility = 'hidden'),
							await new Promise(e => {
								window.setTimeout(() => {
									e();
								}, 200);
							}),
							(this.container.style.visibility = '')),
						this.unmuteAudioContext(),
						navigator.userAgent.toLowerCase().includes('android') && this.container.addEventListener('click', () => this.virtualKeyboard.blur()),
						!this.loadedConfig || this.loadedConfig.autoplay === Dn.On || (this.loadedConfig.autoplay !== Dn.Off && 'running' === this.audioState()))
					) {
						if ((this.play(), 'running' !== this.audioState())) {
							(this.loadedConfig && this.loadedConfig.unmuteOverlay === Pn.Hidden) || (this.unmuteOverlay.style.display = 'block'),
								this.container.addEventListener('click', this.unmuteOverlayClicked.bind(this), { once: !0 });
							const e = null === (t = this.instance) || void 0 === t ? void 0 : t.audio_context();
							e &&
								(e.onstatechange = () => {
									'running' === e.state && this.unmuteOverlayClicked(), (e.onstatechange = null);
								});
						}
					} else this.playButton.style.display = 'block';
				}
				onRuffleDownloadProgress(e, n) {
					const t = this.splashScreen.querySelector('.loadbar-inner'),
						a = this.splashScreen.querySelector('.loadbar');
					Number.isNaN(n) ? a && (a.style.display = 'none') : (t.style.width = (e / n) * 100 + '%');
				}
				destroy() {
					this.instance &&
						(this.instance.destroy(), (this.instance = null), (this._metadata = null), (this._readyState = nt.HaveNothing), console.log('Ruffle instance destroyed.'));
				}
				checkOptions(e) {
					if ('string' == typeof e) return { url: e };
					const n = (e, n) => {
						if (!e) {
							const e = new TypeError(n);
							throw ((e.ruffleIndexError = et.JavascriptConfiguration), this.panic(e), e);
						}
					};
					return (
						n(null !== e && 'object' == typeof e, 'Argument 0 must be a string or object'),
						n('url' in e || 'data' in e, 'Argument 0 must contain a `url` or `data` key'),
						n(!('url' in e) || 'string' == typeof e.url, '`url` must be a string'),
						e
					);
				}
				async reload() {
					if (!this.loadedConfig) throw new Error("Cannot reload if load wasn't first called");
					await this.load(this.loadedConfig);
				}
				async load(e, n = !1) {
					var t, a;
					if (((e = this.checkOptions(e)), this.isConnected && !this.isUnusedFallbackObject())) {
						if (!dt(this))
							try {
								(this.loadedConfig = Object.assign(
									Object.assign(
										Object.assign(
											Object.assign(Object.assign({}, Un), n && 'url' in e ? { allowScriptAccess: lt('samedomain', e.url) } : {}),
											null !== (a = null === (t = window.RufflePlayer) || void 0 === t ? void 0 : t.config) && void 0 !== a ? a : {}
										),
										this.config
									),
									e
								)),
									this.loadedConfig.backgroundColor &&
										this.loadedConfig.wmode !== On.Transparent &&
										(this.container.style.backgroundColor = this.loadedConfig.backgroundColor),
									await this.ensureFreshInstance(),
									'url' in e
										? (console.log(`Loading SWF file ${e.url}`),
											(this.swfUrl = new URL(e.url, document.baseURI)),
											this.instance.stream_from(this.swfUrl.href, tt(e.parameters)))
										: 'data' in e &&
											(console.log('Loading SWF data'),
											delete this.swfUrl,
											this.instance.load_data(new Uint8Array(e.data), tt(e.parameters), e.swfFileName || 'movie.swf'));
							} catch (e) {
								console.error(`Serious error occurred loading SWF file: ${e}`);
								const n = new Error(e);
								throw (n.message.includes('Error parsing config') && (n.ruffleIndexError = et.JavascriptConfiguration), this.panic(n), n);
							}
					} else console.warn('Ignoring attempt to play a disconnected or suspended Ruffle element');
				}
				play() {
					this.instance && (this.instance.play(), (this.playButton.style.display = 'none'));
				}
				get isPlaying() {
					return !!this.instance && this.instance.is_playing();
				}
				get volume() {
					return this.instance ? this.instance.volume() : 1;
				}
				set volume(e) {
					this.instance && this.instance.set_volume(e);
				}
				get fullscreenEnabled() {
					return !(!document.fullscreenEnabled && !document.webkitFullscreenEnabled);
				}
				get isFullscreen() {
					return (document.fullscreenElement || document.webkitFullscreenElement) === this;
				}
				setFullscreen(e) {
					this.fullscreenEnabled && e !== this.isFullscreen && (e ? this.enterFullscreen() : this.exitFullscreen());
				}
				enterFullscreen() {
					const e = { navigationUI: 'hide' };
					this.requestFullscreen
						? this.requestFullscreen(e)
						: this.webkitRequestFullscreen
							? this.webkitRequestFullscreen(e)
							: this.webkitRequestFullScreen && this.webkitRequestFullScreen(e);
				}
				exitFullscreen() {
					document.exitFullscreen
						? document.exitFullscreen()
						: document.webkitExitFullscreen
							? document.webkitExitFullscreen()
							: document.webkitCancelFullScreen && document.webkitCancelFullScreen();
				}
				fullScreenChange() {
					var e;
					null === (e = this.instance) || void 0 === e || e.set_fullscreen(this.isFullscreen);
				}
				saveFile(e, n) {
					const t = URL.createObjectURL(e),
						a = document.createElement('a');
					(a.href = t), (a.download = n), a.click(), URL.revokeObjectURL(t);
				}
				checkIfTouch(e) {
					this.isTouch = 'touch' === e.pointerType || 'pen' === e.pointerType;
				}
				base64ToArray(e) {
					const n = atob(e),
						t = new Uint8Array(n.length);
					for (let e = 0; e < n.length; e++) t[e] = n.charCodeAt(e);
					return t;
				}
				base64ToBlob(e, n) {
					const t = this.base64ToArray(e);
					return new Blob([t], { type: n });
				}
				isB64SOL(e) {
					try {
						return 'TCSO' === atob(e).slice(6, 10);
					} catch (e) {
						return !1;
					}
				}
				confirmReloadSave(e, n, t) {
					if (this.isB64SOL(n) && localStorage[e]) {
						if (!t) {
							if (!confirm(ve('save-delete-prompt'))) return;
						}
						const a = this.swfUrl ? this.swfUrl.pathname : '',
							r = this.swfUrl ? this.swfUrl.hostname : document.location.hostname,
							o = e.split('/').slice(1, -1).join('/');
						if (a.includes(o) && e.startsWith(r)) {
							return void (
								confirm(ve('save-reload-prompt', { action: t ? 'replace' : 'delete' })) &&
								this.loadedConfig &&
								(this.destroy(),
								t ? localStorage.setItem(e, n) : localStorage.removeItem(e),
								this.reload(),
								this.populateSaves(),
								this.saveManager.classList.add('hidden'))
							);
						}
						t ? localStorage.setItem(e, n) : localStorage.removeItem(e), this.populateSaves(), this.saveManager.classList.add('hidden');
					}
				}
				replaceSOL(e, n) {
					const t = e.target,
						a = new FileReader();
					a.addEventListener('load', () => {
						if (a.result && 'string' == typeof a.result) {
							const e = new RegExp('data:.*;base64,'),
								t = a.result.replace(e, '');
							this.confirmReloadSave(n, t, !0);
						}
					}),
						t && t.files && t.files.length > 0 && t.files[0] && a.readAsDataURL(t.files[0]);
				}
				deleteSave(e) {
					const n = localStorage.getItem(e);
					n && this.confirmReloadSave(e, n, !1);
				}
				populateSaves() {
					const e = this.saveManager.querySelector('#local-saves');
					if (e) {
						try {
							if (null === localStorage) return;
						} catch (e) {
							return;
						}
						(e.textContent = ''),
							Object.keys(localStorage).forEach(n => {
								const t = n.split('/').pop(),
									a = localStorage.getItem(n);
								if (t && a && this.isB64SOL(a)) {
									const r = document.createElement('TR'),
										o = document.createElement('TD');
									(o.textContent = t), (o.title = n);
									const i = document.createElement('TD'),
										l = document.createElement('SPAN');
									(l.textContent = ve('save-download')),
										(l.className = 'save-option'),
										l.addEventListener('click', () => {
											const e = this.base64ToBlob(a, 'application/octet-stream');
											this.saveFile(e, t + '.sol');
										}),
										i.appendChild(l);
									const s = document.createElement('TD'),
										u = document.createElement('INPUT');
									(u.type = 'file'), (u.accept = '.sol'), (u.className = 'replace-save'), (u.id = 'replace-save-' + n);
									const c = document.createElement('LABEL');
									(c.htmlFor = 'replace-save-' + n),
										(c.textContent = ve('save-replace')),
										(c.className = 'save-option'),
										u.addEventListener('change', e => this.replaceSOL(e, n)),
										s.appendChild(u),
										s.appendChild(c);
									const d = document.createElement('TD'),
										f = document.createElement('SPAN');
									(f.textContent = ve('save-delete')),
										(f.className = 'save-option'),
										f.addEventListener('click', () => this.deleteSave(n)),
										d.appendChild(f),
										r.appendChild(o),
										r.appendChild(i),
										r.appendChild(s),
										r.appendChild(d),
										e.appendChild(r);
								}
							});
					}
				}
				async backupSaves() {
					const e = this.newZipWriter(),
						n = [];
					Object.keys(localStorage).forEach(t => {
						let a = String(t.split('/').pop());
						const r = localStorage.getItem(t);
						if (r && this.isB64SOL(r)) {
							const t = this.base64ToArray(r),
								o = n.filter(e => e === a).length;
							n.push(a), o > 0 && (a += ` (${o + 1})`), e.addFile(a + '.sol', t);
						}
					});
					const t = new Blob([e.save()], { type: 'application/zip' });
					this.saveFile(t, 'saves.zip');
				}
				openHardwareAccelerationModal() {
					this.hardwareAccelerationModal.classList.remove('hidden');
				}
				openSaveManager() {
					this.saveManager.classList.remove('hidden');
				}
				openVolumeControls() {
					this.volumeControls.classList.remove('hidden');
				}
				async downloadSwf() {
					try {
						if (this.swfUrl) {
							console.log('Downloading SWF: ' + this.swfUrl);
							const e = await fetch(this.swfUrl.href);
							if (!e.ok) return void console.error('SWF download failed');
							const n = await e.blob();
							this.saveFile(
								n,
								(function (e) {
									const n = e.pathname;
									return n.substring(n.lastIndexOf('/') + 1);
								})(this.swfUrl)
							);
						} else console.error('SWF download failed');
					} catch (e) {
						console.error('SWF download failed');
					}
				}
				virtualKeyboardInput() {
					const e = this.virtualKeyboard,
						n = e.value;
					for (const e of n) for (const n of ['keydown', 'keyup']) this.dispatchEvent(new KeyboardEvent(n, { key: e, bubbles: !0 }));
					e.value = '';
				}
				openVirtualKeyboard() {
					navigator.userAgent.toLowerCase().includes('android')
						? setTimeout(() => {
								this.virtualKeyboard.focus({ preventScroll: !0 });
							}, 100)
						: this.virtualKeyboard.focus({ preventScroll: !0 });
				}
				isVirtualKeyboardFocused() {
					return this.shadow.activeElement === this.virtualKeyboard;
				}
				contextMenuItems() {
					const e = String.fromCharCode(10003),
						n = [],
						t = () => {
							n.length > 0 && null !== n[n.length - 1] && n.push(null);
						};
					if (this.instance && this.isPlaying) {
						this.instance.prepare_context_menu().forEach((a, r) => {
							a.separatorBefore && t(),
								n.push({
									text: a.caption + (a.checked ? ` (${e})` : ''),
									onClick: () => {
										var e;
										return null === (e = this.instance) || void 0 === e ? void 0 : e.run_context_menu_callback(r);
									},
									enabled: a.enabled,
								});
						}),
							t();
					}
					this.fullscreenEnabled &&
						(this.isFullscreen
							? n.push({ text: ve('context-menu-exit-fullscreen'), onClick: () => this.setFullscreen(!1) })
							: n.push({ text: ve('context-menu-enter-fullscreen'), onClick: () => this.setFullscreen(!0) })),
						n.push({
							text: ve('context-menu-volume-controls'),
							onClick: () => {
								this.openVolumeControls();
							},
						}),
						this.instance &&
							this.swfUrl &&
							this.loadedConfig &&
							!0 === this.loadedConfig.showSwfDownload &&
							(t(), n.push({ text: ve('context-menu-download-swf'), onClick: this.downloadSwf.bind(this) })),
						navigator.clipboard &&
							window.isSecureContext &&
							n.push({ text: ve('context-menu-copy-debug-info'), onClick: () => navigator.clipboard.writeText(this.getPanicData()) }),
						this.populateSaves();
					const a = this.saveManager.querySelector('#local-saves');
					return (
						a && '' !== a.textContent && n.push({ text: ve('context-menu-open-save-manager'), onClick: this.openSaveManager.bind(this) }),
						t(),
						n.push({
							text: ve('context-menu-about-ruffle', { flavor: d ? 'extension' : '', version: Zn.versionName }),
							onClick() {
								window.open(Yn, '_blank');
							},
						}),
						this.isTouch && (t(), n.push({ text: ve('context-menu-hide'), onClick: () => (this.contextMenuForceDisabled = !0) })),
						n
					);
				}
				pointerDown(e) {
					(this.pointerDownPosition = new at(e.pageX, e.pageY)), (this.pointerMoveMaxDistance = 0), this.startLongPressTimer();
				}
				clearLongPressTimer() {
					this.longPressTimer && (clearTimeout(this.longPressTimer), (this.longPressTimer = null));
				}
				startLongPressTimer() {
					this.clearLongPressTimer(), (this.longPressTimer = setTimeout(() => this.clearLongPressTimer(), 800));
				}
				checkLongPressMovement(e) {
					if (null !== this.pointerDownPosition) {
						const n = new at(e.pageX, e.pageY),
							t = this.pointerDownPosition.distanceTo(n);
						t > this.pointerMoveMaxDistance && (this.pointerMoveMaxDistance = t);
					}
				}
				checkLongPress(e) {
					this.longPressTimer
						? this.clearLongPressTimer()
						: !this.contextMenuSupported && 'mouse' !== e.pointerType && this.pointerMoveMaxDistance < 15 && this.showContextMenu(e);
				}
				showContextMenu(e) {
					var n, t, a;
					const r = Array.from(this.shadow.querySelectorAll('.modal')).some(e => !e.classList.contains('hidden'));
					if (this.panicked || r) return;
					if (
						(e.preventDefault(),
						'contextmenu' === e.type
							? ((this.contextMenuSupported = !0), document.documentElement.addEventListener('click', this.hideContextMenu.bind(this), { once: !0 }))
							: (document.documentElement.addEventListener('pointerup', this.hideContextMenu.bind(this), { once: !0 }), e.stopPropagation()),
						[!1, Wn.Off].includes(null !== (t = null === (n = this.loadedConfig) || void 0 === n ? void 0 : n.contextMenu) && void 0 !== t ? t : Wn.On) ||
							(this.isTouch && (null === (a = this.loadedConfig) || void 0 === a ? void 0 : a.contextMenu) === Wn.RightClickOnly) ||
							this.contextMenuForceDisabled)
					)
						return;
					for (; this.contextMenuElement.firstChild; ) this.contextMenuElement.removeChild(this.contextMenuElement.firstChild);
					for (const e of this.contextMenuItems())
						if (null === e) {
							const e = document.createElement('li');
							e.className = 'menu-separator';
							const n = document.createElement('hr');
							e.appendChild(n), this.contextMenuElement.appendChild(e);
						} else {
							const { text: n, onClick: t, enabled: a } = e,
								r = document.createElement('li');
							(r.className = 'menu-item'),
								(r.textContent = n),
								this.contextMenuElement.appendChild(r),
								!1 !== a ? r.addEventListener(this.contextMenuSupported ? 'click' : 'pointerup', t) : r.classList.add('disabled');
						}
					(this.contextMenuElement.style.left = '0'), (this.contextMenuElement.style.top = '0'), this.contextMenuOverlay.classList.remove('hidden');
					const o = this.getBoundingClientRect(),
						i = e.clientX - o.x,
						l = e.clientY - o.y,
						s = o.width - this.contextMenuElement.clientWidth - 1,
						u = o.height - this.contextMenuElement.clientHeight - 1;
					(this.contextMenuElement.style.left = Math.floor(Math.min(i, s)) + 'px'), (this.contextMenuElement.style.top = Math.floor(Math.min(l, u)) + 'px');
				}
				hideContextMenu() {
					var e;
					null === (e = this.instance) || void 0 === e || e.clear_custom_menu_items(), this.contextMenuOverlay.classList.add('hidden');
				}
				pause() {
					this.instance && (this.instance.pause(), (this.playButton.style.display = 'block'));
				}
				audioState() {
					if (this.instance) {
						const e = this.instance.audio_context();
						return (e && e.state) || 'running';
					}
					return 'suspended';
				}
				unmuteOverlayClicked() {
					if (this.instance) {
						if ('running' !== this.audioState()) {
							const e = this.instance.audio_context();
							e && e.resume();
						}
						this.unmuteOverlay.style.display = 'none';
					}
				}
				unmuteAudioContext() {
					Xn ||
						(navigator.maxTouchPoints < 1
							? (Xn = !0)
							: this.container.addEventListener(
									'click',
									() => {
										var e;
										if (Xn) return;
										const n = null === (e = this.instance) || void 0 === e ? void 0 : e.audio_context();
										if (!n) return;
										const t = new Audio();
										(t.src = (() => {
											const e = new ArrayBuffer(10),
												t = new DataView(e),
												a = n.sampleRate;
											t.setUint32(0, a, !0), t.setUint32(4, a, !0), t.setUint16(8, 1, !0);
											return `data:audio/wav;base64,UklGRisAAABXQVZFZm10IBAAAAABAAEA${window.btoa(String.fromCharCode(...new Uint8Array(e))).slice(0, 13)}AgAZGF0YQcAAACAgICAgICAAAA=`;
										})()),
											t.load(),
											t
												.play()
												.then(() => {
													Xn = !0;
												})
												.catch(e => {
													console.warn(`Failed to play dummy sound: ${e}`);
												});
									},
									{ once: !0 }
								));
				}
				copyElement(e) {
					if (e) {
						for (const n of e.attributes)
							if (n.specified) {
								if ('title' === n.name && 'Adobe Flash Player' === n.value) continue;
								try {
									this.setAttribute(n.name, n.value);
								} catch (e) {
									console.warn(`Unable to set attribute ${n.name} on Ruffle instance`);
								}
							}
						for (const n of Array.from(e.children)) this.appendChild(n);
					}
				}
				static htmlDimensionToCssDimension(e) {
					if (e) {
						const n = e.match(Qn);
						if (n) {
							let e = n[1];
							return n[3] || (e += 'px'), e;
						}
					}
					return null;
				}
				onCallbackAvailable(e) {
					const n = this.instance;
					this[e] = (...t) => (null == n ? void 0 : n.call_exposed_callback(e, t));
				}
				getObjectId() {
					return this.getAttribute('name');
				}
				set traceObserver(e) {
					var n;
					null === (n = this.instance) || void 0 === n || n.set_trace_observer(e);
				}
				getPanicData() {
					let e = '\n# Player Info\n';
					if (
						((e += `Allows script access: ${!!this.loadedConfig && this.loadedConfig.allowScriptAccess}\n`),
						(e += `${this.rendererDebugInfo}\n`),
						(e += this.debugPlayerInfo()),
						(e += '\n# Page Info\n'),
						(e += `Page URL: ${document.location.href}\n`),
						this.swfUrl && (e += `SWF URL: ${this.swfUrl}\n`),
						(e += '\n# Browser Info\n'),
						(e += `User Agent: ${window.navigator.userAgent}\n`),
						(e += `Platform: ${window.navigator.platform}\n`),
						(e += `Has touch support: ${window.navigator.maxTouchPoints > 0}\n`),
						(e += '\n# Ruffle Info\n'),
						(e += `Version: ${Zn.versionNumber}\n`),
						(e += `Name: ${Zn.versionName}\n`),
						(e += `Channel: ${Zn.versionChannel}\n`),
						(e += `Built: ${Zn.buildDate}\n`),
						(e += `Commit: ${Zn.commitHash}\n`),
						(e += `Is extension: ${d}\n`),
						(e += '\n# Metadata\n'),
						this.metadata)
					)
						for (const [n, t] of Object.entries(this.metadata)) e += `${n}: ${t}\n`;
					return e;
				}
				createErrorFooter(e) {
					const n = document.createElement('ul');
					for (const t of e) {
						const e = document.createElement('li'),
							a = document.createElement('a');
						(a.href = t.url), (a.textContent = t.label), '#' === t.url ? (a.id = 'panic-view-details') : (a.target = '_top'), e.appendChild(a), n.appendChild(e);
					}
					return n;
				}
				panic(e) {
					var n;
					if (this.panicked) return;
					if (((this.panicked = !0), this.hideSplashScreen(), e instanceof Error && ('AbortError' === e.name || e.message.includes('AbortError')))) return;
					const t = null !== (n = null == e ? void 0 : e.ruffleIndexError) && void 0 !== n ? n : et.Unknown,
						a = Object.assign([], { stackIndex: -1, avmStackIndex: -1 });
					if ((a.push('# Error Info\n'), e instanceof Error)) {
						if ((a.push(`Error name: ${e.name}\n`), a.push(`Error message: ${e.message}\n`), e.stack)) {
							const n = a.push(`Error stack:\n\`\`\`\n${e.stack}\n\`\`\`\n`) - 1;
							if (e.avmStack) {
								const n = a.push(`AVM2 stack:\n\`\`\`\n    ${e.avmStack.trim().replace(/\t/g, '    ')}\n\`\`\`\n`) - 1;
								a.avmStackIndex = n;
							}
							a.stackIndex = n;
						}
					} else a.push(`Error: ${e}\n`);
					a.push(this.getPanicData());
					const r = a.join(''),
						o = new Date(Zn.buildDate),
						i = new Date();
					i.setMonth(i.getMonth() - 6);
					const l = i > o;
					let s, u, c;
					if (l) s = new rt(Yn + '/downloads#desktop-app', ve('update-ruffle'));
					else {
						let e;
						(e = document.location.protocol.includes('extension') && this.swfUrl ? this.swfUrl.href : document.location.href), (e = e.split(/[?#]/, 1)[0]);
						let n = `https://github.com/ruffle-rs/ruffle/issues/new?title=${encodeURIComponent(`Error on ${e}`)}&template=error_report.md&labels=error-report&body=`,
							t = encodeURIComponent(r);
						a.stackIndex > -1 &&
							String(n + t).length > 8195 &&
							((a[a.stackIndex] = null), a.avmStackIndex > -1 && (a[a.avmStackIndex] = null), (t = encodeURIComponent(a.join('')))),
							(n += t),
							(s = new rt(n, ve('report-bug')));
					}
					switch (t) {
						case et.FileProtocol:
							(u = be('error-file-protocol')),
								(c = this.createErrorFooter([new rt(Yn + '/demo', ve('ruffle-demo')), new rt(Yn + '/downloads#desktop-app', ve('ruffle-desktop'))]));
							break;
						case et.JavascriptConfiguration:
							(u = be('error-javascript-config')),
								(c = this.createErrorFooter([new rt('https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#javascript-api', ve('ruffle-wiki')), new rt()]));
							break;
						case et.WasmNotFound:
							(u = be('error-wasm-not-found')),
								(c = this.createErrorFooter([new rt('https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configuration-options', ve('ruffle-wiki')), new rt()]));
							break;
						case et.WasmMimeType:
							(u = be('error-wasm-mime-type')),
								(c = this.createErrorFooter([
									new rt('https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configure-webassembly-mime-type', ve('ruffle-wiki')),
									new rt(),
								]));
							break;
						case et.InvalidSwf:
							(u = be('error-invalid-swf')), (c = this.createErrorFooter([new rt()]));
							break;
						case et.SwfFetchError:
							(u = be('error-swf-fetch')), (c = this.createErrorFooter([new rt()]));
							break;
						case et.SwfCors:
							(u = be('error-swf-cors')),
								(c = this.createErrorFooter([new rt('https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configure-cors-header', ve('ruffle-wiki')), new rt()]));
							break;
						case et.WasmCors:
							(u = be('error-wasm-cors')),
								(c = this.createErrorFooter([new rt('https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configure-cors-header', ve('ruffle-wiki')), new rt()]));
							break;
						case et.InvalidWasm:
							(u = be('error-wasm-invalid')),
								(c = this.createErrorFooter([
									new rt('https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#addressing-a-compileerror', ve('ruffle-wiki')),
									new rt(),
								]));
							break;
						case et.WasmDownload:
							(u = be('error-wasm-download')), (c = this.createErrorFooter([new rt()]));
							break;
						case et.WasmDisabledMicrosoftEdge:
							(u = be('error-wasm-disabled-on-edge')),
								(c = this.createErrorFooter([
									new rt('https://github.com/ruffle-rs/ruffle/wiki/Frequently-Asked-Questions-For-Users#edge-webassembly-error', ve('more-info')),
									new rt(),
								]));
							break;
						case et.JavascriptConflict:
							(u = be('error-javascript-conflict')),
								l && u.appendChild(be('error-javascript-conflict-outdated', { buildDate: Zn.buildDate })),
								(c = this.createErrorFooter([s, new rt()]));
							break;
						case et.CSPConflict:
							(u = be('error-csp-conflict')),
								(c = this.createErrorFooter([new rt('https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#configure-wasm-csp', ve('ruffle-wiki')), new rt()]));
							break;
						default:
							(u = be('error-unknown', { buildDate: Zn.buildDate, outdated: String(l) })), (c = this.createErrorFooter([s, new rt()]));
					}
					const d = document.createElement('div');
					d.id = 'panic';
					const f = document.createElement('div');
					(f.id = 'panic-title'), (f.textContent = ve('panic-title')), d.appendChild(f);
					const m = document.createElement('div');
					(m.id = 'panic-body'), m.appendChild(u), d.appendChild(m);
					const p = document.createElement('div');
					(p.id = 'panic-footer'), p.appendChild(c), d.appendChild(p), (this.container.textContent = ''), this.container.appendChild(d);
					const h = this.container.querySelector('#panic-view-details');
					h &&
						(h.onclick = () => {
							const e = this.container.querySelector('#panic-body');
							e.classList.add('details');
							const n = document.createElement('textarea');
							return (n.readOnly = !0), (n.value = r), e.replaceChildren(n), !1;
						}),
						this.destroy();
				}
				displayRootMovieDownloadFailedMessage(e) {
					var n, t, a, r;
					const o = null === (n = this.loadedConfig) || void 0 === n ? void 0 : n.openInNewTab;
					if (o && this.swfUrl && window.location.origin !== this.swfUrl.origin) {
						const e = new URL(this.swfUrl);
						if (null === (t = this.loadedConfig) || void 0 === t ? void 0 : t.parameters) {
							const n = tt(null === (a = this.loadedConfig) || void 0 === a ? void 0 : a.parameters);
							Object.entries(n).forEach(([n, t]) => {
								e.searchParams.set(n, t);
							});
						}
						this.hideSplashScreen();
						const n = document.createElement('div');
						n.id = 'message-overlay';
						const r = document.createElement('div');
						(r.className = 'message'), r.appendChild(be('message-cant-embed'));
						const i = document.createElement('div'),
							l = document.createElement('a');
						(l.innerText = ve('open-in-new-tab')), (l.onclick = () => o(e)), i.appendChild(l), r.appendChild(i), n.appendChild(r), this.container.prepend(n);
					} else {
						const n = new Error('Failed to fetch: ' + this.swfUrl);
						this.swfUrl && !this.swfUrl.protocol.includes('http')
							? (n.ruffleIndexError = et.FileProtocol)
							: e
								? (n.ruffleIndexError = et.InvalidSwf)
								: window.location.origin === (null === (r = this.swfUrl) || void 0 === r ? void 0 : r.origin) || window.location.protocol.includes('extension')
									? (n.ruffleIndexError = et.SwfFetchError)
									: (n.ruffleIndexError = et.SwfCors),
							this.panic(n);
					}
				}
				displayMessage(e) {
					const n = document.createElement('div');
					n.id = 'message-overlay';
					const t = document.createElement('div');
					t.className = 'message';
					const a = document.createElement('p');
					(a.textContent = e), t.appendChild(a);
					const r = document.createElement('div'),
						o = document.createElement('button');
					(o.id = 'continue-btn'),
						(o.textContent = ve('continue')),
						r.appendChild(o),
						t.appendChild(r),
						n.appendChild(t),
						this.container.prepend(n),
						(this.container.querySelector('#continue-btn').onclick = () => {
							n.parentNode.removeChild(n);
						});
				}
				displayUnsupportedVideo(e) {
					const n = this.videoModal.querySelector('#video-holder');
					if (n) {
						const t = document.createElement('video');
						t.addEventListener('contextmenu', e => e.stopPropagation()),
							(t.src = e),
							(t.autoplay = !0),
							(t.controls = !0),
							(n.textContent = ''),
							n.appendChild(t),
							this.videoModal.classList.remove('hidden');
					}
				}
				debugPlayerInfo() {
					return '';
				}
				hideSplashScreen() {
					this.splashScreen.classList.add('hidden'), this.container.classList.remove('hidden');
				}
				showSplashScreen() {
					this.splashScreen.classList.remove('hidden'), this.container.classList.add('hidden');
				}
				setMetadata(e) {
					(this._metadata = e),
						(this._readyState = nt.Loaded),
						this.hideSplashScreen(),
						this.dispatchEvent(new CustomEvent(ot.LOADED_METADATA)),
						this.dispatchEvent(new CustomEvent(ot.LOADED_DATA));
				}
				PercentLoaded() {
					return this._readyState === nt.Loaded ? 100 : 0;
				}
			}
			function it(e) {
				switch (null == e ? void 0 : e.toLowerCase()) {
					case 'true':
						return !0;
					case 'false':
						return !1;
					default:
						return null;
				}
			}
			function lt(e, n) {
				switch (null == e ? void 0 : e.toLowerCase()) {
					case 'always':
						return !0;
					case 'never':
						return !1;
					case 'samedomain':
						try {
							return new URL(window.location.href).origin === new URL(n, window.location.href).origin;
						} catch (e) {
							return !1;
						}
					default:
						return null;
				}
			}
			function st(e, n) {
				const t = { url: e },
					a = n('allowNetworking');
				null !== a && (t.allowNetworking = a);
				const r = lt(n('allowScriptAccess'), e);
				null !== r && (t.allowScriptAccess = r);
				const o = n('bgcolor');
				null !== o && (t.backgroundColor = o);
				const i = n('base');
				if (null !== i)
					if ('.' === i) {
						const n = new URL(e, document.baseURI);
						t.base = new URL(i, n).href;
					} else t.base = i;
				const l = it(n('menu'));
				null !== l && (t.menu = l);
				const s = it(n('allowFullScreen'));
				null !== s && (t.allowFullscreen = s);
				const u = n('flashvars');
				null !== u && (t.parameters = u);
				const c = n('quality');
				null !== c && (t.quality = c);
				const d = n('salign');
				null !== d && (t.salign = d);
				const f = n('scale');
				null !== f && (t.scale = f);
				const m = n('wmode');
				return null !== m && (t.wmode = m), t;
			}
			function ut(e) {
				if (e) {
					let n = '',
						t = '';
					try {
						const a = new URL(e, Yn);
						(n = a.pathname), (t = a.hostname);
					} catch (e) {}
					if (n.startsWith('/v/') && /^(?:(?:www\.|m\.)?youtube(?:-nocookie)?\.com)|(?:youtu\.be)$/i.test(t)) return !0;
				}
				return !1;
			}
			function ct(e, n) {
				var t, a;
				const r = e.getAttribute(n),
					o = null !== (a = null === (t = window.RufflePlayer) || void 0 === t ? void 0 : t.config) && void 0 !== a ? a : {};
				if (r)
					try {
						const t = new URL(r);
						'http:' !== t.protocol ||
							'https:' !== window.location.protocol ||
							('upgradeToHttps' in o && !1 === o.upgradeToHttps) ||
							((t.protocol = 'https:'), e.setAttribute(n, t.toString()));
					} catch (e) {}
			}
			function dt(e) {
				let n = e.parentElement;
				for (; null !== n; ) {
					switch (n.tagName) {
						case 'AUDIO':
						case 'VIDEO':
							return !0;
					}
					n = n.parentElement;
				}
				return !1;
			}
			(ot.LOADED_METADATA = 'loadedmetadata'),
				(ot.LOADED_DATA = 'loadeddata'),
				(function (e) {
					(e[(e.HaveNothing = 0)] = 'HaveNothing'), (e[(e.Loading = 1)] = 'Loading'), (e[(e.Loaded = 2)] = 'Loaded');
				})(nt || (nt = {}));
			class ft {
				constructor(e, n) {
					(this.isMuted = e), (this.volume = n);
				}
				get_volume() {
					return this.isMuted ? 0 : this.volume / 100;
				}
			}
			class mt extends ot {
				constructor() {
					super();
				}
				connectedCallback() {
					super.connectedCallback();
					const e = this.attributes.getNamedItem('src');
					if (e) {
						const n = e => {
								var n, t;
								return null !== (t = null === (n = this.attributes.getNamedItem(e)) || void 0 === n ? void 0 : n.value) && void 0 !== t ? t : null;
							},
							t = st(e.value, n);
						this.load(t, !0);
					}
				}
				get nodeName() {
					return 'EMBED';
				}
				get src() {
					var e;
					return null === (e = this.attributes.getNamedItem('src')) || void 0 === e ? void 0 : e.value;
				}
				set src(e) {
					if (e) {
						const n = document.createAttribute('src');
						(n.value = e), this.attributes.setNamedItem(n);
					} else this.attributes.removeNamedItem('src');
				}
				static get observedAttributes() {
					return ['src', 'width', 'height'];
				}
				attributeChangedCallback(e, n, t) {
					if ((super.attributeChangedCallback(e, n, t), this.isConnected && 'src' === e)) {
						const e = this.attributes.getNamedItem('src');
						if (e) {
							const n = e => {
									var n, t;
									return null !== (t = null === (n = this.attributes.getNamedItem(e)) || void 0 === n ? void 0 : n.value) && void 0 !== t ? t : null;
								},
								t = st(e.value, n);
							this.load(t, !0);
						}
					}
				}
				static isInterdictable(e) {
					const n = e.getAttribute('src'),
						t = e.getAttribute('type');
					return !!n && !dt(e) && (ut(n) ? (ct(e, 'src'), !1) : Hn(n, t));
				}
				static fromNativeEmbedElement(e) {
					const n = qn('ruffle-embed', mt),
						t = document.createElement(n);
					return t.copyElement(e), t;
				}
			}
			function pt(e) {
				var n, t;
				const a = {};
				for (const r of e.children)
					if (r instanceof HTMLParamElement) {
						const e = null === (n = r.attributes.getNamedItem('name')) || void 0 === n ? void 0 : n.value,
							o = null === (t = r.attributes.getNamedItem('value')) || void 0 === t ? void 0 : t.value;
						e && o && (a[e] = o);
					}
				return a;
			}
			class ht extends ot {
				constructor() {
					super(), (this.params = {});
				}
				connectedCallback() {
					var e;
					super.connectedCallback(), (this.params = pt(this));
					let n = null;
					if (
						(this.attributes.getNamedItem('data')
							? (n = null === (e = this.attributes.getNamedItem('data')) || void 0 === e ? void 0 : e.value)
							: this.params.movie && (n = this.params.movie),
						n)
					) {
						const e = ['allowNetworking', 'base', 'bgcolor', 'flashvars'],
							t = st(n, n =>
								(function (e, n, t) {
									n = n.toLowerCase();
									for (const [t, a] of Object.entries(e)) if (t.toLowerCase() === n) return a;
									return t;
								})(this.params, n, e.includes(n) ? this.getAttribute(n) : null)
							);
						this.load(t, !0);
					}
				}
				debugPlayerInfo() {
					var e;
					let n = 'Player type: Object\n',
						t = null;
					return (
						this.attributes.getNamedItem('data')
							? (t = null === (e = this.attributes.getNamedItem('data')) || void 0 === e ? void 0 : e.value)
							: this.params.movie && (t = this.params.movie),
						(n += `SWF URL: ${t}\n`),
						Object.keys(this.params).forEach(e => {
							n += `Param ${e}: ${this.params[e]}\n`;
						}),
						Object.keys(this.attributes).forEach(e => {
							var t;
							n += `Attribute ${e}: ${null === (t = this.attributes.getNamedItem(e)) || void 0 === t ? void 0 : t.value}\n`;
						}),
						n
					);
				}
				get nodeName() {
					return 'OBJECT';
				}
				get data() {
					return this.getAttribute('data');
				}
				set data(e) {
					if (e) {
						const n = document.createAttribute('data');
						(n.value = e), this.attributes.setNamedItem(n);
					} else this.attributes.removeNamedItem('data');
				}
				static isInterdictable(e) {
					var n, t, a, r;
					if (dt(e)) return !1;
					if (e.getElementsByTagName('ruffle-object').length > 0 || e.getElementsByTagName('ruffle-embed').length > 0) return !1;
					const o = null === (n = e.attributes.getNamedItem('data')) || void 0 === n ? void 0 : n.value.toLowerCase(),
						i = null !== (a = null === (t = e.attributes.getNamedItem('type')) || void 0 === t ? void 0 : t.value) && void 0 !== a ? a : null,
						l = pt(e);
					let s;
					if (o) {
						if (ut(o)) return ct(e, 'data'), !1;
						s = o;
					} else {
						if (!l || !l.movie) return !1;
						if (ut(l.movie)) {
							const n = e.querySelector("param[name='movie']");
							if (n) {
								ct(n, 'value');
								const t = n.getAttribute('value');
								t && e.setAttribute('data', t);
							}
							return !1;
						}
						s = l.movie;
					}
					const u = null === (r = e.attributes.getNamedItem('classid')) || void 0 === r ? void 0 : r.value.toLowerCase();
					return u === 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'.toLowerCase()
						? !Array.from(e.getElementsByTagName('object')).some(ht.isInterdictable) && !Array.from(e.getElementsByTagName('embed')).some(mt.isInterdictable)
						: !u && Hn(s, i);
				}
				static fromNativeObjectElement(e) {
					const n = qn('ruffle-object', ht),
						t = document.createElement(n);
					for (const n of Array.from(e.getElementsByTagName('embed'))) mt.isInterdictable(n) && n.remove();
					for (const n of Array.from(e.getElementsByTagName('object'))) ht.isInterdictable(n) && n.remove();
					return t.copyElement(e), t;
				}
			}
			class vt {
				constructor(e) {
					if (((this.__mimeTypes = []), (this.__namedMimeTypes = {}), e)) for (let n = 0; n < e.length; n++) this.install(e[n]);
				}
				install(e) {
					const n = this.__mimeTypes.length;
					this.__mimeTypes.push(e), (this.__namedMimeTypes[e.type] = e), (this[e.type] = e), (this[n] = e);
				}
				item(e) {
					return this.__mimeTypes[e >>> 0];
				}
				namedItem(e) {
					return this.__namedMimeTypes[e];
				}
				get length() {
					return this.__mimeTypes.length;
				}
				[Symbol.iterator]() {
					return this.__mimeTypes[Symbol.iterator]();
				}
			}
			class bt {
				constructor(e) {
					(this.__plugins = []), (this.__namedPlugins = {});
					for (let n = 0; n < e.length; n++) this.install(e[n]);
				}
				install(e) {
					const n = this.__plugins.length;
					this.__plugins.push(e), (this.__namedPlugins[e.name] = e), (this[e.name] = e), (this[n] = e);
				}
				item(e) {
					return this.__plugins[e >>> 0];
				}
				namedItem(e) {
					return this.__namedPlugins[e];
				}
				refresh() {}
				[Symbol.iterator]() {
					return this.__plugins[Symbol.iterator]();
				}
				get length() {
					return this.__plugins.length;
				}
			}
			const gt = new (class extends vt {
				constructor(e, n, t) {
					super(), (this.name = e), (this.description = n), (this.filename = t);
				}
			})('Shockwave Flash', 'Shockwave Flash 32.0 r0', 'ruffle.js');
			var wt, kt;
			gt.install({ type: Bn, description: 'Shockwave Flash', suffixes: 'spl', enabledPlugin: gt }),
				gt.install({ type: _n, description: 'Shockwave Flash', suffixes: 'swf', enabledPlugin: gt }),
				gt.install({ type: Jn, description: 'Shockwave Flash', suffixes: 'swf', enabledPlugin: gt }),
				gt.install({ type: Vn, description: 'Shockwave Flash', suffixes: 'swf', enabledPlugin: gt });
			const yt = null !== (kt = null === (wt = window.RufflePlayer) || void 0 === wt ? void 0 : wt.config) && void 0 !== kt ? kt : {},
				Rt = f(yt) + 'ruffle.js';
			let xt, zt, St, jt;
			function Et() {
				var e, n;
				return (
					(!('favorFlash' in yt) || !1 !== yt.favorFlash) &&
					'ruffle.js' !==
						(null !== (n = null === (e = navigator.plugins.namedItem('Shockwave Flash')) || void 0 === e ? void 0 : e.filename) && void 0 !== n ? n : 'ruffle.js')
				);
			}
			function Ct() {
				try {
					(xt = null != xt ? xt : document.getElementsByTagName('object')), (zt = null != zt ? zt : document.getElementsByTagName('embed'));
					for (const e of Array.from(xt))
						if (ht.isInterdictable(e)) {
							const n = ht.fromNativeObjectElement(e);
							e.replaceWith(n);
						}
					for (const e of Array.from(zt))
						if (mt.isInterdictable(e)) {
							const n = mt.fromNativeEmbedElement(e);
							e.replaceWith(n);
						}
				} catch (e) {
					console.error(`Serious error encountered when polyfilling native Flash elements: ${e}`);
				}
			}
			function At() {
				(St = null != St ? St : document.getElementsByTagName('iframe')),
					(jt = null != jt ? jt : document.getElementsByTagName('frame')),
					[St, jt].forEach(e => {
						for (const n of e) {
							if (void 0 !== n.dataset.rufflePolyfilled) continue;
							n.dataset.rufflePolyfilled = '';
							const e = n.contentWindow,
								t = `Couldn't load Ruffle into ${n.tagName}[${n.src}]: `;
							try {
								'complete' === e.document.readyState && Ft(e, t);
							} catch (e) {
								d || console.warn(t + e);
							}
							n.addEventListener(
								'load',
								() => {
									Ft(e, t);
								},
								!1
							);
						}
					});
			}
			async function Ft(e, n) {
				var t;
				let a;
				await new Promise(e => {
					window.setTimeout(() => {
						e();
					}, 100);
				});
				try {
					if (((a = e.document), !a)) return;
				} catch (e) {
					return void (d || console.warn(n + e));
				}
				if (d || void 0 === a.documentElement.dataset.ruffleOptout)
					if (d)
						e.RufflePlayer || (e.RufflePlayer = {}),
							(e.RufflePlayer.config = Object.assign(Object.assign({}, yt), null !== (t = e.RufflePlayer.config) && void 0 !== t ? t : {}));
					else if (!e.RufflePlayer) {
						const n = a.createElement('script');
						n.setAttribute('src', Rt),
							(n.onload = () => {
								(e.RufflePlayer = {}), (e.RufflePlayer.config = yt);
							}),
							a.head.appendChild(n);
					}
			}
			function qt() {
				Et() ||
					(function (e) {
						('install' in navigator.plugins && navigator.plugins.install) ||
							Object.defineProperty(navigator, 'plugins', { value: new bt(navigator.plugins), writable: !1 }),
							navigator.plugins.install(e),
							!(e.length > 0) ||
								('install' in navigator.mimeTypes && navigator.mimeTypes.install) ||
								Object.defineProperty(navigator, 'mimeTypes', { value: new vt(navigator.mimeTypes), writable: !1 });
						const n = navigator.mimeTypes;
						for (let t = 0; t < e.length; t += 1) n.install(e[t]);
					})(gt);
			}
			function Dt() {
				Et() ||
					(Ct(),
					At(),
					new MutationObserver(function (e) {
						e.some(e =>
							Array.from(e.addedNodes).some(e => ['EMBED', 'OBJECT'].includes(e.nodeName) || (e instanceof Element && null !== e.querySelector('embed, object')))
						) && (Ct(), At());
					}).observe(document, { childList: !0, subtree: !0 }));
			}
			const It = {
				version: Zn.versionNumber + '+' + Zn.buildDate.substring(0, 10),
				polyfill() {
					Dt();
				},
				pluginPolyfill() {
					qt();
				},
				createPlayer() {
					const e = qn('ruffle-player', ot);
					return document.createElement(e);
				},
			};
			class Pt {
				constructor(e) {
					var n;
					(this.sources = (null == e ? void 0 : e.sources) || {}),
						(this.config = (null == e ? void 0 : e.config) || {}),
						(this.invoked = (null == e ? void 0 : e.invoked) || !1),
						(this.newestName = (null == e ? void 0 : e.newestName) || null),
						null === (n = null == e ? void 0 : e.superseded) || void 0 === n || n.call(e),
						'loading' === document.readyState ? document.addEventListener('readystatechange', this.init.bind(this)) : window.setTimeout(this.init.bind(this), 0);
				}
				get version() {
					return '0.1.0';
				}
				registerSource(e) {
					this.sources[e] = It;
				}
				newestSourceName() {
					let n = null,
						t = e.fromSemver('0.0.0');
					for (const a in this.sources)
						if (Object.prototype.hasOwnProperty.call(this.sources, a)) {
							const r = e.fromSemver(this.sources[a].version);
							r.hasPrecedenceOver(t) && ((n = a), (t = r));
						}
					return n;
				}
				init() {
					if (!this.invoked) {
						if (((this.invoked = !0), (this.newestName = this.newestSourceName()), null === this.newestName)) throw new Error('No registered Ruffle source!');
						!1 !== (!('polyfills' in this.config) || this.config.polyfills) && this.sources[this.newestName].polyfill();
					}
				}
				newest() {
					const e = this.newestSourceName();
					return null !== e ? this.sources[e] : null;
				}
				satisfying(t) {
					const a = n.fromRequirementString(t);
					let r = null;
					for (const n in this.sources)
						if (Object.prototype.hasOwnProperty.call(this.sources, n)) {
							const t = e.fromSemver(this.sources[n].version);
							a.satisfiedBy(t) && (r = this.sources[n]);
						}
					return r;
				}
				localCompatible() {
					return void 0 !== this.sources.local ? this.satisfying('^' + this.sources.local.version) : this.newest();
				}
				local() {
					return void 0 !== this.sources.local ? this.satisfying('=' + this.sources.local.version) : this.newest();
				}
				superseded() {
					this.invoked = !0;
				}
				static negotiate(e, n) {
					let t;
					if (((t = e instanceof Pt ? e : new Pt(e)), void 0 !== n)) {
						t.registerSource(n);
						!1 !== (!('polyfills' in t.config) || t.config.polyfills) && It.pluginPolyfill();
					}
					return t;
				}
			}
			window.RufflePlayer = Pt.negotiate(window.RufflePlayer, 'local');
		})();
})();
//# sourceMappingURL=ruffle.js.map

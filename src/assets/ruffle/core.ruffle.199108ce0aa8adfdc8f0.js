'use strict';
(self.webpackChunkruffle_selfhosted = self.webpackChunkruffle_selfhosted || []).push([
	[655],
	{
		693: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
			function copyToAudioBuffer(e, n, _) {
				if (n) {
					e.getChannelData(0).set(n);
				}
				if (_) {
					e.getChannelData(1).set(_);
				}
			}
			function getAudioOutputTimestamp(e) {
				return e.currentTime - e.baseLatency;
			}
			function copyToAudioBufferInterleaved(e, n) {
				const _ = e.length,
					t = e.getChannelData(0),
					r = e.getChannelData(1);
				let b = 0,
					c = 0;
				for (; c < _; ) (t[c] = n[b]), (r[c] = n[b + 1]), c++, (b += 2);
			}
			function callExternalInterface(name, args) {
				return eval(`(${name})(...args)`);
			}
			__webpack_require__.d(__webpack_exports__, { AU: () => copyToAudioBufferInterleaved, VK: () => callExternalInterface });
		},
		655: (e, n, _) => {
			_.r(n),
				_.d(n, {
					IntoUnderlyingByteSource: () => $,
					IntoUnderlyingSink: () => J,
					IntoUnderlyingSource: () => Z,
					RuffleHandle: () => ne,
					RuffleInstanceBuilder: () => te,
					ZipWriter: () => be,
					default: () => ue,
					global_init: () => V,
					initSync: () => ae,
				});
			var t = _(693);
			e = _.hmd(e);
			const r = 'undefined' != typeof AudioContext ? AudioContext : 'undefined' != typeof webkitAudioContext ? webkitAudioContext : void 0;
			let b;
			const c = new Array(128).fill(void 0);
			function f(e) {
				return c[e];
			}
			c.push(void 0, null, !0, !1);
			let a = c.length;
			function i(e) {
				const n = f(e);
				return (
					(function (e) {
						e < 132 || ((c[e] = a), (a = e));
					})(e),
					n
				);
			}
			function u(e) {
				a === c.length && c.push(c.length + 1);
				const n = a;
				return (a = c[n]), (c[n] = e), n;
			}
			let o = 0,
				g = null;
			function w() {
				return (null !== g && 0 !== g.byteLength) || (g = new Uint8Array(b.memory.buffer)), g;
			}
			const d =
					'undefined' != typeof TextEncoder
						? new TextEncoder('utf-8')
						: {
								encode: () => {
									throw Error('TextEncoder not available');
								},
							},
				s =
					'function' == typeof d.encodeInto
						? function (e, n) {
								return d.encodeInto(e, n);
							}
						: function (e, n) {
								const _ = d.encode(e);
								return n.set(_), { read: e.length, written: _.length };
							};
			function l(e, n, _) {
				if (void 0 === _) {
					const _ = d.encode(e),
						t = n(_.length, 1) >>> 0;
					return (
						w()
							.subarray(t, t + _.length)
							.set(_),
						(o = _.length),
						t
					);
				}
				let t = e.length,
					r = n(t, 1) >>> 0;
				const b = w();
				let c = 0;
				for (; c < t; c++) {
					const n = e.charCodeAt(c);
					if (n > 127) break;
					b[r + c] = n;
				}
				if (c !== t) {
					0 !== c && (e = e.slice(c)), (r = _(r, t, (t = c + 3 * e.length), 1) >>> 0);
					const n = w().subarray(r + c, r + t);
					(c += s(e, n).written), (r = _(r, t, c, 1) >>> 0);
				}
				return (o = c), r;
			}
			function m(e) {
				return null == e;
			}
			let p = null;
			function y() {
				return (null !== p && 0 !== p.byteLength) || (p = new Int32Array(b.memory.buffer)), p;
			}
			const h =
				'undefined' != typeof TextDecoder
					? new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 })
					: {
							decode: () => {
								throw Error('TextDecoder not available');
							},
						};
			function x(e, n) {
				return (e >>>= 0), h.decode(w().subarray(e, e + n));
			}
			'undefined' != typeof TextDecoder && h.decode();
			let S = null;
			function v() {
				return (null !== S && 0 !== S.byteLength) || (S = new Float64Array(b.memory.buffer)), S;
			}
			function A(e) {
				const n = typeof e;
				if ('number' == n || 'boolean' == n || null == e) return `${e}`;
				if ('string' == n) return `"${e}"`;
				if ('symbol' == n) {
					const n = e.description;
					return null == n ? 'Symbol' : `Symbol(${n})`;
				}
				if ('function' == n) {
					const n = e.name;
					return 'string' == typeof n && n.length > 0 ? `Function(${n})` : 'Function';
				}
				if (Array.isArray(e)) {
					const n = e.length;
					let _ = '[';
					n > 0 && (_ += A(e[0]));
					for (let t = 1; t < n; t++) _ += ', ' + A(e[t]);
					return (_ += ']'), _;
				}
				const _ = /\[object ([^\]]+)\]/.exec(toString.call(e));
				let t;
				if (!(_.length > 1)) return toString.call(e);
				if (((t = _[1]), 'Object' == t))
					try {
						return 'Object(' + JSON.stringify(e) + ')';
					} catch (e) {
						return 'Object';
					}
				return e instanceof Error ? `${e.name}: ${e.message}\n${e.stack}` : t;
			}
			const B =
				'undefined' == typeof FinalizationRegistry
					? { register: () => {}, unregister: () => {} }
					: new FinalizationRegistry(e => {
							b.__wbindgen_export_2.get(e.dtor)(e.a, e.b);
						});
			function P(e, n, _, t) {
				const r = { a: e, b: n, cnt: 1, dtor: _ },
					c = (...e) => {
						r.cnt++;
						const n = r.a;
						r.a = 0;
						try {
							return t(n, r.b, ...e);
						} finally {
							0 == --r.cnt ? (b.__wbindgen_export_2.get(r.dtor)(n, r.b), B.unregister(r)) : (r.a = n);
						}
					};
				return (c.original = r), B.register(c, r, r), c;
			}
			function I(e, n, _) {
				b._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h23f5a9f9b0a872dd(e, n, u(_));
			}
			function T(e, n) {
				b._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7607e4cf66d044d8(e, n);
			}
			function D(e, n, _) {
				b._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h04005efd60695594(e, n, _);
			}
			function k(e, n) {
				b._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__ha24c3a7432b3327c(e, n);
			}
			function C(e, n) {
				b._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hab891c48cff0b000(e, n);
			}
			function R(e, n, _) {
				b._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h14ea9f3a02aa4dfa(e, n, u(_));
			}
			function F(e, n, _) {
				b._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd7c3d3131fc509f9(e, n, u(_));
			}
			function E(e, n, _) {
				b._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hba6f28a2fce47385(e, n, u(_));
			}
			function M(e, n) {
				try {
					return e.apply(this, n);
				} catch (e) {
					b.__wbindgen_exn_store(u(e));
				}
			}
			let L = null;
			function O() {
				return (null !== L && 0 !== L.byteLength) || (L = new Uint32Array(b.memory.buffer)), L;
			}
			function W(e, n) {
				const _ = n(4 * e.length, 4) >>> 0,
					t = O();
				for (let n = 0; n < e.length; n++) t[_ / 4 + n] = u(e[n]);
				return (o = e.length), _;
			}
			function V() {
				b.global_init();
			}
			function G(e, n) {
				const _ = n(1 * e.length, 1) >>> 0;
				return w().set(e, _ / 1), (o = e.length), _;
			}
			function U(e, n) {
				return (e >>>= 0), w().subarray(e / 1, e / 1 + n);
			}
			let q = null;
			function z(e, n) {
				return (e >>>= 0), ((null !== q && 0 !== q.byteLength) || (q = new Float32Array(b.memory.buffer)), q).subarray(e / 4, e / 4 + n);
			}
			function H(e, n) {
				return (e >>>= 0), O().subarray(e / 4, e / 4 + n);
			}
			function j(e, n) {
				return (e >>>= 0), y().subarray(e / 4, e / 4 + n);
			}
			let Q = null;
			function N(e, n) {
				return (e >>>= 0), ((null !== Q && 0 !== Q.byteLength) || (Q = new Uint8ClampedArray(b.memory.buffer)), Q).subarray(e / 1, e / 1 + n);
			}
			const K =
				'undefined' == typeof FinalizationRegistry
					? { register: () => {}, unregister: () => {} }
					: new FinalizationRegistry(e => b.__wbg_intounderlyingbytesource_free(e >>> 0));
			class $ {
				__destroy_into_raw() {
					const e = this.__wbg_ptr;
					return (this.__wbg_ptr = 0), K.unregister(this), e;
				}
				free() {
					const e = this.__destroy_into_raw();
					b.__wbg_intounderlyingbytesource_free(e);
				}
				get type() {
					let e, n;
					try {
						const r = b.__wbindgen_add_to_stack_pointer(-16);
						b.intounderlyingbytesource_type(r, this.__wbg_ptr);
						var _ = y()[r / 4 + 0],
							t = y()[r / 4 + 1];
						return (e = _), (n = t), x(_, t);
					} finally {
						b.__wbindgen_add_to_stack_pointer(16), b.__wbindgen_free(e, n, 1);
					}
				}
				get autoAllocateChunkSize() {
					return b.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr) >>> 0;
				}
				start(e) {
					b.intounderlyingbytesource_start(this.__wbg_ptr, u(e));
				}
				pull(e) {
					return i(b.intounderlyingbytesource_pull(this.__wbg_ptr, u(e)));
				}
				cancel() {
					const e = this.__destroy_into_raw();
					b.intounderlyingbytesource_cancel(e);
				}
			}
			const Y =
				'undefined' == typeof FinalizationRegistry ? { register: () => {}, unregister: () => {} } : new FinalizationRegistry(e => b.__wbg_intounderlyingsink_free(e >>> 0));
			class J {
				__destroy_into_raw() {
					const e = this.__wbg_ptr;
					return (this.__wbg_ptr = 0), Y.unregister(this), e;
				}
				free() {
					const e = this.__destroy_into_raw();
					b.__wbg_intounderlyingsink_free(e);
				}
				write(e) {
					return i(b.intounderlyingsink_write(this.__wbg_ptr, u(e)));
				}
				close() {
					const e = this.__destroy_into_raw();
					return i(b.intounderlyingsink_close(e));
				}
				abort(e) {
					const n = this.__destroy_into_raw();
					return i(b.intounderlyingsink_abort(n, u(e)));
				}
			}
			const X =
				'undefined' == typeof FinalizationRegistry
					? { register: () => {}, unregister: () => {} }
					: new FinalizationRegistry(e => b.__wbg_intounderlyingsource_free(e >>> 0));
			class Z {
				__destroy_into_raw() {
					const e = this.__wbg_ptr;
					return (this.__wbg_ptr = 0), X.unregister(this), e;
				}
				free() {
					const e = this.__destroy_into_raw();
					b.__wbg_intounderlyingsource_free(e);
				}
				pull(e) {
					return i(b.intounderlyingsource_pull(this.__wbg_ptr, u(e)));
				}
				cancel() {
					const e = this.__destroy_into_raw();
					b.intounderlyingsource_cancel(e);
				}
			}
			const ee =
				'undefined' == typeof FinalizationRegistry ? { register: () => {}, unregister: () => {} } : new FinalizationRegistry(e => b.__wbg_rufflehandle_free(e >>> 0));
			class ne {
				static __wrap(e) {
					e >>>= 0;
					const n = Object.create(ne.prototype);
					return (n.__wbg_ptr = e), ee.register(n, n.__wbg_ptr, n), n;
				}
				__destroy_into_raw() {
					const e = this.__wbg_ptr;
					return (this.__wbg_ptr = 0), ee.unregister(this), e;
				}
				free() {
					const e = this.__destroy_into_raw();
					b.__wbg_rufflehandle_free(e);
				}
				stream_from(e, n) {
					try {
						const t = b.__wbindgen_add_to_stack_pointer(-16),
							r = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
							c = o;
						b.rufflehandle_stream_from(t, this.__wbg_ptr, r, c, u(n));
						var _ = y()[t / 4 + 0];
						if (y()[t / 4 + 1]) throw i(_);
					} finally {
						b.__wbindgen_add_to_stack_pointer(16);
					}
				}
				load_data(e, n, _) {
					try {
						const r = b.__wbindgen_add_to_stack_pointer(-16),
							c = l(_, b.__wbindgen_malloc, b.__wbindgen_realloc),
							f = o;
						b.rufflehandle_load_data(r, this.__wbg_ptr, u(e), u(n), c, f);
						var t = y()[r / 4 + 0];
						if (y()[r / 4 + 1]) throw i(t);
					} finally {
						b.__wbindgen_add_to_stack_pointer(16);
					}
				}
				play() {
					b.rufflehandle_play(this.__wbg_ptr);
				}
				pause() {
					b.rufflehandle_pause(this.__wbg_ptr);
				}
				is_playing() {
					return 0 !== b.rufflehandle_is_playing(this.__wbg_ptr);
				}
				volume() {
					return b.rufflehandle_volume(this.__wbg_ptr);
				}
				set_volume(e) {
					b.rufflehandle_set_volume(this.__wbg_ptr, e);
				}
				renderer_debug_info() {
					return i(b.rufflehandle_renderer_debug_info(this.__wbg_ptr));
				}
				renderer_name() {
					return i(b.rufflehandle_renderer_name(this.__wbg_ptr));
				}
				prepare_context_menu() {
					return i(b.rufflehandle_prepare_context_menu(this.__wbg_ptr));
				}
				run_context_menu_callback(e) {
					b.rufflehandle_run_context_menu_callback(this.__wbg_ptr, e);
				}
				set_fullscreen(e) {
					b.rufflehandle_set_fullscreen(this.__wbg_ptr, e);
				}
				clear_custom_menu_items() {
					b.rufflehandle_clear_custom_menu_items(this.__wbg_ptr);
				}
				destroy() {
					b.rufflehandle_destroy(this.__wbg_ptr);
				}
				call_exposed_callback(e, n) {
					const _ = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						t = o,
						r = W(n, b.__wbindgen_malloc),
						c = o;
					return i(b.rufflehandle_call_exposed_callback(this.__wbg_ptr, _, t, r, c));
				}
				set_trace_observer(e) {
					b.rufflehandle_set_trace_observer(this.__wbg_ptr, u(e));
				}
				audio_context() {
					return i(b.rufflehandle_audio_context(this.__wbg_ptr));
				}
				static is_wasm_simd_used() {
					return 0 !== b.rufflehandle_is_wasm_simd_used();
				}
			}
			const _e =
				'undefined' == typeof FinalizationRegistry
					? { register: () => {}, unregister: () => {} }
					: new FinalizationRegistry(e => b.__wbg_ruffleinstancebuilder_free(e >>> 0));
			class te {
				toJSON() {
					return {};
				}
				toString() {
					return JSON.stringify(this);
				}
				__destroy_into_raw() {
					const e = this.__wbg_ptr;
					return (this.__wbg_ptr = 0), _e.unregister(this), e;
				}
				free() {
					const e = this.__destroy_into_raw();
					b.__wbg_ruffleinstancebuilder_free(e);
				}
				constructor() {
					const e = b.ruffleinstancebuilder_new();
					return (this.__wbg_ptr = e >>> 0), this;
				}
				setAllowScriptAccess(e) {
					b.ruffleinstancebuilder_setAllowScriptAccess(this.__wbg_ptr, e);
				}
				setBackgroundColor(e) {
					b.ruffleinstancebuilder_setBackgroundColor(this.__wbg_ptr, !m(e), m(e) ? 0 : e);
				}
				setUpgradeToHttps(e) {
					b.ruffleinstancebuilder_setUpgradeToHttps(this.__wbg_ptr, e);
				}
				setCompatibilityRules(e) {
					b.ruffleinstancebuilder_setCompatibilityRules(this.__wbg_ptr, e);
				}
				setLetterbox(e) {
					const n = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setLetterbox(this.__wbg_ptr, n, _);
				}
				setBaseUrl(e) {
					var n = m(e) ? 0 : l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setBaseUrl(this.__wbg_ptr, n, _);
				}
				setShowMenu(e) {
					b.ruffleinstancebuilder_setShowMenu(this.__wbg_ptr, e);
				}
				setAllowFullscreen(e) {
					b.ruffleinstancebuilder_setAllowFullscreen(this.__wbg_ptr, e);
				}
				setStageAlign(e) {
					const n = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setStageAlign(this.__wbg_ptr, n, _);
				}
				setForceAlign(e) {
					b.ruffleinstancebuilder_setForceAlign(this.__wbg_ptr, e);
				}
				setQuality(e) {
					const n = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setQuality(this.__wbg_ptr, n, _);
				}
				setScale(e) {
					const n = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setScale(this.__wbg_ptr, n, _);
				}
				setForceScale(e) {
					b.ruffleinstancebuilder_setForceScale(this.__wbg_ptr, e);
				}
				setFrameRate(e) {
					b.ruffleinstancebuilder_setFrameRate(this.__wbg_ptr, !m(e), m(e) ? 0 : e);
				}
				setWmode(e) {
					var n = m(e) ? 0 : l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setWmode(this.__wbg_ptr, n, _);
				}
				setLogLevel(e) {
					const n = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setLogLevel(this.__wbg_ptr, n, _);
				}
				setMaxExecutionDuration(e) {
					b.ruffleinstancebuilder_setMaxExecutionDuration(this.__wbg_ptr, e);
				}
				setPlayerVersion(e) {
					b.ruffleinstancebuilder_setPlayerVersion(this.__wbg_ptr, m(e) ? 16777215 : e);
				}
				setPreferredRenderer(e) {
					var n = m(e) ? 0 : l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setPreferredRenderer(this.__wbg_ptr, n, _);
				}
				setOpenUrlMode(e) {
					const n = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setOpenUrlMode(this.__wbg_ptr, n, _);
				}
				setAllowNetworking(e) {
					const n = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setAllowNetworking(this.__wbg_ptr, n, _);
				}
				addSocketProxy(e, n, _) {
					const t = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						r = o,
						c = l(_, b.__wbindgen_malloc, b.__wbindgen_realloc),
						f = o;
					b.ruffleinstancebuilder_addSocketProxy(this.__wbg_ptr, t, r, n, c, f);
				}
				setCredentialAllowList(e) {
					const n = W(e, b.__wbindgen_malloc),
						_ = o;
					b.ruffleinstancebuilder_setCredentialAllowList(this.__wbg_ptr, n, _);
				}
				setPlayerRuntime(e) {
					const n = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						_ = o;
					b.ruffleinstancebuilder_setPlayerRuntime(this.__wbg_ptr, n, _);
				}
				setVolume(e) {
					b.ruffleinstancebuilder_setVolume(this.__wbg_ptr, e);
				}
				addFont(e, n) {
					const _ = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						t = o,
						r = G(n, b.__wbindgen_malloc),
						c = o;
					b.ruffleinstancebuilder_addFont(this.__wbg_ptr, _, t, r, c);
				}
				setDefaultFont(e, n) {
					const _ = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						t = o,
						r = W(n, b.__wbindgen_malloc),
						c = o;
					b.ruffleinstancebuilder_setDefaultFont(this.__wbg_ptr, _, t, r, c);
				}
				build(e, n) {
					return i(b.ruffleinstancebuilder_build(this.__wbg_ptr, u(e), u(n)));
				}
			}
			const re = 'undefined' == typeof FinalizationRegistry ? { register: () => {}, unregister: () => {} } : new FinalizationRegistry(e => b.__wbg_zipwriter_free(e >>> 0));
			class be {
				__destroy_into_raw() {
					const e = this.__wbg_ptr;
					return (this.__wbg_ptr = 0), re.unregister(this), e;
				}
				free() {
					const e = this.__destroy_into_raw();
					b.__wbg_zipwriter_free(e);
				}
				constructor() {
					const e = b.zipwriter_new();
					return (this.__wbg_ptr = e >>> 0), this;
				}
				addFile(e, n) {
					const _ = l(e, b.__wbindgen_malloc, b.__wbindgen_realloc),
						t = o,
						r = G(n, b.__wbindgen_malloc),
						c = o;
					b.zipwriter_addFile(this.__wbg_ptr, _, t, r, c);
				}
				save() {
					try {
						const r = b.__wbindgen_add_to_stack_pointer(-16);
						b.zipwriter_save(r, this.__wbg_ptr);
						var e = y()[r / 4 + 0],
							n = y()[r / 4 + 1],
							_ = y()[r / 4 + 2];
						if (y()[r / 4 + 3]) throw i(_);
						var t = U(e, n).slice();
						return b.__wbindgen_free(e, 1 * n, 1), t;
					} finally {
						b.__wbindgen_add_to_stack_pointer(16);
					}
				}
			}
			function ce() {
				const n = { wbg: {} };
				return (
					(n.wbg.__wbindgen_object_drop_ref = function (e) {
						i(e);
					}),
					(n.wbg.__wbindgen_cb_drop = function (e) {
						const n = i(e).original;
						if (1 == n.cnt--) return (n.a = 0), !0;
						return !1;
					}),
					(n.wbg.__wbindgen_object_clone_ref = function (e) {
						return u(f(e));
					}),
					(n.wbg.__wbg_setMetadata_128bd20648a12d07 = function (e, n) {
						f(e).setMetadata(i(n));
					}),
					(n.wbg.__wbindgen_string_get = function (e, n) {
						const _ = f(n),
							t = 'string' == typeof _ ? _ : void 0;
						var r = m(t) ? 0 : l(t, b.__wbindgen_malloc, b.__wbindgen_realloc),
							c = o;
						(y()[e / 4 + 1] = c), (y()[e / 4 + 0] = r);
					}),
					(n.wbg.__wbg_onCallbackAvailable_d54d3847055a0720 = function (e, n, _) {
						f(e).onCallbackAvailable(x(n, _));
					}),
					(n.wbg.__wbg_getObjectId_7207b50ecb002a1f = function (e, n) {
						const _ = f(n).getObjectId();
						var t = m(_) ? 0 : l(_, b.__wbindgen_malloc, b.__wbindgen_realloc),
							r = o;
						(y()[e / 4 + 1] = r), (y()[e / 4 + 0] = t);
					}),
					(n.wbg.__wbg_onFSCommand_68fd9326a1eb7ff5 = function () {
						return M(function (e, n, _, t, r) {
							return f(e).onFSCommand(x(n, _), x(t, r));
						}, arguments);
					}),
					(n.wbg.__wbg_panic_52092d3d09d11787 = function (e, n) {
						f(e).panic(f(n));
					}),
					(n.wbg.__wbg_displayRootMovieDownloadFailedMessage_ed4ad3ae9522c8a3 = function (e, n) {
						f(e).displayRootMovieDownloadFailedMessage(0 !== n);
					}),
					(n.wbg.__wbg_displayMessage_6b8a0011f836541f = function (e, n, _) {
						f(e).displayMessage(x(n, _));
					}),
					(n.wbg.__wbg_setFullscreen_85ac797b8823b727 = function () {
						return M(function (e, n) {
							f(e).setFullscreen(0 !== n);
						}, arguments);
					}),
					(n.wbg.__wbg_openVirtualKeyboard_e0659b8d0c7b81ed = function (e) {
						f(e).openVirtualKeyboard();
					}),
					(n.wbg.__wbg_isVirtualKeyboardFocused_1719ab4ec034b0ab = function (e) {
						return f(e).isVirtualKeyboardFocused();
					}),
					(n.wbg.__wbg_displayUnsupportedVideo_619cdc62d232655a = function (e, n, _) {
						f(e).displayUnsupportedVideo(x(n, _));
					}),
					(n.wbg.__wbindgen_string_new = function (e, n) {
						return u(x(e, n));
					}),
					(n.wbg.__wbg_rufflehandle_new = function (e) {
						return u(ne.__wrap(e));
					}),
					(n.wbg.__wbindgen_add = function (e, n) {
						return u(f(e) + f(n));
					}),
					(n.wbg.__wbg_callExternalInterface_71616285357f98c8 = function () {
						return M(function (e, n, _, r) {
							var c = (function (e, n) {
								e >>>= 0;
								const _ = O().subarray(e / 4, e / 4 + n),
									t = [];
								for (let e = 0; e < _.length; e++) t.push(i(_[e]));
								return t;
							})(_, r).slice();
							b.__wbindgen_free(_, 4 * r, 4);
							return u((0, t.VK)(x(e, n), c));
						}, arguments);
					}),
					(n.wbg.__wbindgen_number_get = function (e, n) {
						const _ = f(n),
							t = 'number' == typeof _ ? _ : void 0;
						(v()[e / 8 + 1] = m(t) ? 0 : t), (y()[e / 4 + 0] = !m(t));
					}),
					(n.wbg.__wbindgen_boolean_get = function (e) {
						const n = f(e);
						return 'boolean' == typeof n ? (n ? 1 : 0) : 2;
					}),
					(n.wbg.__wbindgen_is_null = function (e) {
						return null === f(e);
					}),
					(n.wbg.__wbindgen_number_new = function (e) {
						return u(e);
					}),
					(n.wbg.__wbindgen_is_function = function (e) {
						return 'function' == typeof f(e);
					}),
					(n.wbg.__wbindgen_error_new = function (e, n) {
						return u(new Error(x(e, n)));
					}),
					(n.wbg.__wbg_copyToAudioBufferInterleaved_efb71b16faf5adb2 = function (e, n, _) {
						(0, t.AU)(f(e), z(n, _));
					}),
					(n.wbg.__wbg_new_abda76e883ba8a5f = function () {
						return u(new Error());
					}),
					(n.wbg.__wbg_stack_658279fe44541cf6 = function (e, n) {
						const _ = l(f(n).stack, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_error_f851667af71bcfc6 = function (e, n) {
						let _, t;
						try {
							(_ = e), (t = n), console.error(x(e, n));
						} finally {
							b.__wbindgen_free(_, t, 1);
						}
					}),
					(n.wbg.__wbindgen_is_object = function (e) {
						const n = f(e);
						return 'object' == typeof n && null !== n;
					}),
					(n.wbg.__wbg_set_f975102236d3c502 = function (e, n, _) {
						f(e)[i(n)] = i(_);
					}),
					(n.wbg.__wbg_getReader_ab94afcb5cb7689a = function () {
						return M(function (e) {
							return u(f(e).getReader());
						}, arguments);
					}),
					(n.wbg.__wbg_done_2ffa852272310e47 = function (e) {
						return f(e).done;
					}),
					(n.wbg.__wbg_value_9f6eeb1e2aab8d96 = function (e) {
						return u(f(e).value);
					}),
					(n.wbg.__wbindgen_is_string = function (e) {
						return 'string' == typeof f(e);
					}),
					(n.wbg.__wbg_log_c9486ca5d8e2cbe8 = function (e, n) {
						let _, t;
						try {
							(_ = e), (t = n), console.log(x(e, n));
						} finally {
							b.__wbindgen_free(_, t, 1);
						}
					}),
					(n.wbg.__wbg_log_aba5996d9bde071f = function (e, n, _, t, r, c, f, a) {
						let i, u;
						try {
							(i = e), (u = n), console.log(x(e, n), x(_, t), x(r, c), x(f, a));
						} finally {
							b.__wbindgen_free(i, u, 1);
						}
					}),
					(n.wbg.__wbg_mark_40e050a77cc39fea = function (e, n) {
						performance.mark(x(e, n));
					}),
					(n.wbg.__wbg_measure_aa7a73f17813f708 = function () {
						return M(function (e, n, _, t) {
							let r, c, f, a;
							try {
								(r = e), (c = n), (f = _), (a = t), performance.measure(x(e, n), x(_, t));
							} finally {
								b.__wbindgen_free(r, c, 1), b.__wbindgen_free(f, a, 1);
							}
						}, arguments);
					}),
					(n.wbg.__wbg_crypto_1d1f22824a6a080c = function (e) {
						return u(f(e).crypto);
					}),
					(n.wbg.__wbg_process_4a72847cc503995b = function (e) {
						return u(f(e).process);
					}),
					(n.wbg.__wbg_versions_f686565e586dd935 = function (e) {
						return u(f(e).versions);
					}),
					(n.wbg.__wbg_node_104a2ff8d6ea03a2 = function (e) {
						return u(f(e).node);
					}),
					(n.wbg.__wbg_require_cca90b1a94a0255b = function () {
						return M(function () {
							return u(e.require);
						}, arguments);
					}),
					(n.wbg.__wbg_msCrypto_eb05e62b530a1508 = function (e) {
						return u(f(e).msCrypto);
					}),
					(n.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function () {
						return M(function (e, n) {
							f(e).randomFillSync(i(n));
						}, arguments);
					}),
					(n.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function () {
						return M(function (e, n) {
							f(e).getRandomValues(f(n));
						}, arguments);
					}),
					(n.wbg.__wbg_performance_a1b8bde2ee512264 = function (e) {
						return u(f(e).performance);
					}),
					(n.wbg.__wbindgen_is_undefined = function (e) {
						return void 0 === f(e);
					}),
					(n.wbg.__wbg_now_abd80e969af37148 = function (e) {
						return f(e).now();
					}),
					(n.wbg.__wbg_instanceof_GpuDeviceLostInfo_0e70d1a0cfb82565 = function (e) {
						let n;
						try {
							n = f(e) instanceof GPUDeviceLostInfo;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_error_57d6c3ab7cc664a4 = function (e) {
						return u(f(e).error);
					}),
					(n.wbg.__wbg_reason_596372ea0d8b6154 = function (e) {
						return u(f(e).reason);
					}),
					(n.wbg.__wbg_message_83c28f06fc155312 = function (e, n) {
						const _ = l(f(n).message, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_end_986f2e7b2e086e45 = function (e) {
						f(e).end();
					}),
					(n.wbg.__wbg_executeBundles_367d166dd1f39304 = function (e, n) {
						f(e).executeBundles(f(n));
					}),
					(n.wbg.__wbg_setBlendConstant_59453617149c6189 = function (e, n) {
						f(e).setBlendConstant(f(n));
					}),
					(n.wbg.__wbg_setScissorRect_2ce51d9f66d0da5a = function (e, n, _, t, r) {
						f(e).setScissorRect(n >>> 0, _ >>> 0, t >>> 0, r >>> 0);
					}),
					(n.wbg.__wbg_setStencilReference_a6b99f58204d333b = function (e, n) {
						f(e).setStencilReference(n >>> 0);
					}),
					(n.wbg.__wbg_setViewport_c7784ff412a3f741 = function (e, n, _, t, r, b, c) {
						f(e).setViewport(n, _, t, r, b, c);
					}),
					(n.wbg.__wbg_setBindGroup_58f4d6540abc3a8c = function (e, n, _) {
						f(e).setBindGroup(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_setBindGroup_8548bffe3aac2384 = function (e, n, _, t, r, b, c) {
						f(e).setBindGroup(n >>> 0, f(_), H(t, r), b, c >>> 0);
					}),
					(n.wbg.__wbg_draw_1266952f19030532 = function (e, n, _, t, r) {
						f(e).draw(n >>> 0, _ >>> 0, t >>> 0, r >>> 0);
					}),
					(n.wbg.__wbg_drawIndexed_bc2247be7d403907 = function (e, n, _, t, r, b) {
						f(e).drawIndexed(n >>> 0, _ >>> 0, t >>> 0, r, b >>> 0);
					}),
					(n.wbg.__wbg_drawIndexedIndirect_ae6843ded857a7a0 = function (e, n, _) {
						f(e).drawIndexedIndirect(f(n), _);
					}),
					(n.wbg.__wbg_drawIndirect_dcfdac9179a6eece = function (e, n, _) {
						f(e).drawIndirect(f(n), _);
					}),
					(n.wbg.__wbg_setIndexBuffer_a5a577434653cf20 = function (e, n, _, t) {
						f(e).setIndexBuffer(f(n), i(_), t);
					}),
					(n.wbg.__wbg_setIndexBuffer_3813572ed0aed847 = function (e, n, _, t, r) {
						f(e).setIndexBuffer(f(n), i(_), t, r);
					}),
					(n.wbg.__wbg_setPipeline_433cc46f3c74bd87 = function (e, n) {
						f(e).setPipeline(f(n));
					}),
					(n.wbg.__wbg_setVertexBuffer_cbb485ac3f4bbebe = function (e, n, _, t) {
						f(e).setVertexBuffer(n >>> 0, f(_), t);
					}),
					(n.wbg.__wbg_setVertexBuffer_d93e85c8e63ee680 = function (e, n, _, t, r) {
						f(e).setVertexBuffer(n >>> 0, f(_), t, r);
					}),
					(n.wbg.__wbg_label_11db1ff6a0c2b04a = function (e, n) {
						const _ = l(f(n).label, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_beginComputePass_cde9db452d8454d3 = function (e, n) {
						return u(f(e).beginComputePass(f(n)));
					}),
					(n.wbg.__wbg_beginRenderPass_3c26df111c9aa06a = function (e, n) {
						return u(f(e).beginRenderPass(f(n)));
					}),
					(n.wbg.__wbg_clearBuffer_eef39f7aca353d3b = function (e, n, _) {
						f(e).clearBuffer(f(n), _);
					}),
					(n.wbg.__wbg_clearBuffer_d8565fd58408fecc = function (e, n, _, t) {
						f(e).clearBuffer(f(n), _, t);
					}),
					(n.wbg.__wbg_copyBufferToBuffer_ebaf981920d421ff = function (e, n, _, t, r, b) {
						f(e).copyBufferToBuffer(f(n), _, f(t), r, b);
					}),
					(n.wbg.__wbg_copyBufferToTexture_5586daea57d79a1b = function (e, n, _, t) {
						f(e).copyBufferToTexture(f(n), f(_), f(t));
					}),
					(n.wbg.__wbg_copyTextureToBuffer_e033973f9cb8a789 = function (e, n, _, t) {
						f(e).copyTextureToBuffer(f(n), f(_), f(t));
					}),
					(n.wbg.__wbg_copyTextureToTexture_d330e7079cb1e5df = function (e, n, _, t) {
						f(e).copyTextureToTexture(f(n), f(_), f(t));
					}),
					(n.wbg.__wbg_finish_3ebfaf95c1cb1f62 = function (e) {
						return u(f(e).finish());
					}),
					(n.wbg.__wbg_finish_9d3296fd7f05b8be = function (e, n) {
						return u(f(e).finish(f(n)));
					}),
					(n.wbg.__wbg_resolveQuerySet_cc94108081626a85 = function (e, n, _, t, r, b) {
						f(e).resolveQuerySet(f(n), _ >>> 0, t >>> 0, f(r), b >>> 0);
					}),
					(n.wbg.__wbg_instanceof_GpuCanvasContext_49aff6e71a577ca8 = function (e) {
						let n;
						try {
							n = f(e) instanceof GPUCanvasContext;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_gpu_637ebb4a318a815f = function (e) {
						return u(f(e).gpu);
					}),
					(n.wbg.__wbg_configure_e9b57f53a5e90ceb = function (e, n) {
						f(e).configure(f(n));
					}),
					(n.wbg.__wbg_getCurrentTexture_ca7aca992bcbc91a = function (e) {
						return u(f(e).getCurrentTexture());
					}),
					(n.wbg.__wbg_instanceof_GpuAdapter_4ef715661989ec5f = function (e) {
						let n;
						try {
							n = f(e) instanceof GPUAdapter;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_instanceof_GpuValidationError_810143a72fa54cc9 = function (e) {
						let n;
						try {
							n = f(e) instanceof GPUValidationError;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_features_0d652946b430d280 = function (e) {
						return u(f(e).features);
					}),
					(n.wbg.__wbg_limits_46b036fb3e7d97ce = function (e) {
						return u(f(e).limits);
					}),
					(n.wbg.__wbg_requestDevice_54ad28aad4c2485d = function (e, n) {
						return u(f(e).requestDevice(f(n)));
					}),
					(n.wbg.__wbg_getBindGroupLayout_842350d31781afdc = function (e, n) {
						return u(f(e).getBindGroupLayout(n >>> 0));
					}),
					(n.wbg.__wbg_message_dc5f63756746fa21 = function (e, n) {
						const _ = l(f(n).message, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_finish_43826c0e085a9105 = function (e) {
						return u(f(e).finish());
					}),
					(n.wbg.__wbg_finish_874e37ba756dbb34 = function (e, n) {
						return u(f(e).finish(f(n)));
					}),
					(n.wbg.__wbg_setBindGroup_b61d1e50cd875ea0 = function (e, n, _) {
						f(e).setBindGroup(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_setBindGroup_2b6c8643f4fac448 = function (e, n, _, t, r, b, c) {
						f(e).setBindGroup(n >>> 0, f(_), H(t, r), b, c >>> 0);
					}),
					(n.wbg.__wbg_draw_a609897c83c44f7d = function (e, n, _, t, r) {
						f(e).draw(n >>> 0, _ >>> 0, t >>> 0, r >>> 0);
					}),
					(n.wbg.__wbg_drawIndexed_196c69d7af0a85d0 = function (e, n, _, t, r, b) {
						f(e).drawIndexed(n >>> 0, _ >>> 0, t >>> 0, r, b >>> 0);
					}),
					(n.wbg.__wbg_drawIndexedIndirect_06c1d3991251bca9 = function (e, n, _) {
						f(e).drawIndexedIndirect(f(n), _);
					}),
					(n.wbg.__wbg_drawIndirect_f781c54ff4148cae = function (e, n, _) {
						f(e).drawIndirect(f(n), _);
					}),
					(n.wbg.__wbg_setIndexBuffer_358f835d6ad82757 = function (e, n, _, t) {
						f(e).setIndexBuffer(f(n), i(_), t);
					}),
					(n.wbg.__wbg_setIndexBuffer_39644914be2c14ea = function (e, n, _, t, r) {
						f(e).setIndexBuffer(f(n), i(_), t, r);
					}),
					(n.wbg.__wbg_setPipeline_2996b930cd949244 = function (e, n) {
						f(e).setPipeline(f(n));
					}),
					(n.wbg.__wbg_setVertexBuffer_a6e1dc59bc210f43 = function (e, n, _, t) {
						f(e).setVertexBuffer(n >>> 0, f(_), t);
					}),
					(n.wbg.__wbg_setVertexBuffer_422eb55665e6c9b9 = function (e, n, _, t, r) {
						f(e).setVertexBuffer(n >>> 0, f(_), t, r);
					}),
					(n.wbg.__wbg_instanceof_GpuOutOfMemoryError_6c7f324bb78cf6ec = function (e) {
						let n;
						try {
							n = f(e) instanceof GPUOutOfMemoryError;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_has_008b08c39bba4437 = function (e, n, _) {
						return f(e).has(x(n, _));
					}),
					(n.wbg.__wbg_maxTextureDimension1D_9c334fdf6dfd544c = function (e) {
						return f(e).maxTextureDimension1D;
					}),
					(n.wbg.__wbg_maxTextureDimension2D_fbbde599f79dcd43 = function (e) {
						return f(e).maxTextureDimension2D;
					}),
					(n.wbg.__wbg_maxTextureDimension3D_dfbef6596f9c05a9 = function (e) {
						return f(e).maxTextureDimension3D;
					}),
					(n.wbg.__wbg_maxTextureArrayLayers_15be24cd453440ec = function (e) {
						return f(e).maxTextureArrayLayers;
					}),
					(n.wbg.__wbg_maxBindGroups_92a90bd4185f5481 = function (e) {
						return f(e).maxBindGroups;
					}),
					(n.wbg.__wbg_maxBindingsPerBindGroup_b980d76dd4c9b848 = function (e) {
						return f(e).maxBindingsPerBindGroup;
					}),
					(n.wbg.__wbg_maxDynamicUniformBuffersPerPipelineLayout_acb80dbc6fd9967a = function (e) {
						return f(e).maxDynamicUniformBuffersPerPipelineLayout;
					}),
					(n.wbg.__wbg_maxDynamicStorageBuffersPerPipelineLayout_a6a49e1648ff252b = function (e) {
						return f(e).maxDynamicStorageBuffersPerPipelineLayout;
					}),
					(n.wbg.__wbg_maxSampledTexturesPerShaderStage_05b0cc69fc222741 = function (e) {
						return f(e).maxSampledTexturesPerShaderStage;
					}),
					(n.wbg.__wbg_maxSamplersPerShaderStage_ea57f96a1a5a129d = function (e) {
						return f(e).maxSamplersPerShaderStage;
					}),
					(n.wbg.__wbg_maxStorageBuffersPerShaderStage_ca0c480c2d5e3b24 = function (e) {
						return f(e).maxStorageBuffersPerShaderStage;
					}),
					(n.wbg.__wbg_maxStorageTexturesPerShaderStage_a480e1eb32139565 = function (e) {
						return f(e).maxStorageTexturesPerShaderStage;
					}),
					(n.wbg.__wbg_maxUniformBuffersPerShaderStage_384462775693e66f = function (e) {
						return f(e).maxUniformBuffersPerShaderStage;
					}),
					(n.wbg.__wbg_maxUniformBufferBindingSize_4ab7aa97239acb81 = function (e) {
						return f(e).maxUniformBufferBindingSize;
					}),
					(n.wbg.__wbg_maxStorageBufferBindingSize_e30d1d44161f8f9d = function (e) {
						return f(e).maxStorageBufferBindingSize;
					}),
					(n.wbg.__wbg_maxVertexBuffers_6b20abf43db8f36c = function (e) {
						return f(e).maxVertexBuffers;
					}),
					(n.wbg.__wbg_maxBufferSize_39af530942677f77 = function (e) {
						return f(e).maxBufferSize;
					}),
					(n.wbg.__wbg_maxVertexAttributes_72a430d340faa981 = function (e) {
						return f(e).maxVertexAttributes;
					}),
					(n.wbg.__wbg_maxVertexBufferArrayStride_0de74dfc20292044 = function (e) {
						return f(e).maxVertexBufferArrayStride;
					}),
					(n.wbg.__wbg_minUniformBufferOffsetAlignment_e93d45acf2ef5d63 = function (e) {
						return f(e).minUniformBufferOffsetAlignment;
					}),
					(n.wbg.__wbg_minStorageBufferOffsetAlignment_eb9629ef3e2dbef1 = function (e) {
						return f(e).minStorageBufferOffsetAlignment;
					}),
					(n.wbg.__wbg_maxInterStageShaderComponents_0ae69f52037abda6 = function (e) {
						return f(e).maxInterStageShaderComponents;
					}),
					(n.wbg.__wbg_maxColorAttachments_31204c1e29979bdf = function (e) {
						return f(e).maxColorAttachments;
					}),
					(n.wbg.__wbg_maxColorAttachmentBytesPerSample_aa174250fe7fe24a = function (e) {
						return f(e).maxColorAttachmentBytesPerSample;
					}),
					(n.wbg.__wbg_maxComputeWorkgroupStorageSize_67379db914442ac4 = function (e) {
						return f(e).maxComputeWorkgroupStorageSize;
					}),
					(n.wbg.__wbg_maxComputeInvocationsPerWorkgroup_afd42f2a68b5a5bb = function (e) {
						return f(e).maxComputeInvocationsPerWorkgroup;
					}),
					(n.wbg.__wbg_maxComputeWorkgroupSizeX_8f7d39166ed839fa = function (e) {
						return f(e).maxComputeWorkgroupSizeX;
					}),
					(n.wbg.__wbg_maxComputeWorkgroupSizeY_1032d9f1d0756947 = function (e) {
						return f(e).maxComputeWorkgroupSizeY;
					}),
					(n.wbg.__wbg_maxComputeWorkgroupSizeZ_9dd79fb8395caee7 = function (e) {
						return f(e).maxComputeWorkgroupSizeZ;
					}),
					(n.wbg.__wbg_maxComputeWorkgroupsPerDimension_ea45bed25666045f = function (e) {
						return f(e).maxComputeWorkgroupsPerDimension;
					}),
					(n.wbg.__wbg_queue_a81a3accf7985493 = function (e) {
						return u(f(e).queue);
					}),
					(n.wbg.__wbg_getMappedRange_7f6439ca92c29adf = function (e, n, _) {
						return u(f(e).getMappedRange(n, _));
					}),
					(n.wbg.__wbg_Window_c57eeb318aede548 = function (e) {
						return u(f(e).Window);
					}),
					(n.wbg.__wbg_WorkerGlobalScope_c217f74ea14f96ef = function (e) {
						return u(f(e).WorkerGlobalScope);
					}),
					(n.wbg.__wbg_requestAdapter_83566b2b75a979fe = function (e, n) {
						return u(f(e).requestAdapter(f(n)));
					}),
					(n.wbg.__wbg_getPreferredCanvasFormat_97680f173a3ec7d9 = function (e) {
						return u(f(e).getPreferredCanvasFormat());
					}),
					(n.wbg.__wbg_features_9d128ae848ff640c = function (e) {
						return u(f(e).features);
					}),
					(n.wbg.__wbg_limits_c1a0d81c6dcd9f25 = function (e) {
						return u(f(e).limits);
					}),
					(n.wbg.__wbg_createShaderModule_6e60c33e30139f42 = function (e, n) {
						return u(f(e).createShaderModule(f(n)));
					}),
					(n.wbg.__wbg_createBindGroupLayout_4684e26bb3fbd7c7 = function (e, n) {
						return u(f(e).createBindGroupLayout(f(n)));
					}),
					(n.wbg.__wbg_createBindGroup_242c3e450116a6e6 = function (e, n) {
						return u(f(e).createBindGroup(f(n)));
					}),
					(n.wbg.__wbg_createPipelineLayout_f0c3bd2b0618423b = function (e, n) {
						return u(f(e).createPipelineLayout(f(n)));
					}),
					(n.wbg.__wbg_createRenderPipeline_f1c8c845d4fb7c4f = function (e, n) {
						return u(f(e).createRenderPipeline(f(n)));
					}),
					(n.wbg.__wbg_createComputePipeline_f892dfa170161d71 = function (e, n) {
						return u(f(e).createComputePipeline(f(n)));
					}),
					(n.wbg.__wbg_createBuffer_cba4e3b488b0b151 = function (e, n) {
						return u(f(e).createBuffer(f(n)));
					}),
					(n.wbg.__wbg_createTexture_3268d758edd2443f = function (e, n) {
						return u(f(e).createTexture(f(n)));
					}),
					(n.wbg.__wbg_createSampler_6bd031fe21c5baa3 = function (e, n) {
						return u(f(e).createSampler(f(n)));
					}),
					(n.wbg.__wbg_createQuerySet_409fe5789e547982 = function (e, n) {
						return u(f(e).createQuerySet(f(n)));
					}),
					(n.wbg.__wbg_createCommandEncoder_738bb1e31052fa09 = function (e, n) {
						return u(f(e).createCommandEncoder(f(n)));
					}),
					(n.wbg.__wbg_createRenderBundleEncoder_f3fbca1e2533bc18 = function (e, n) {
						return u(f(e).createRenderBundleEncoder(f(n)));
					}),
					(n.wbg.__wbg_destroy_7a907fc8e85d55bd = function (e) {
						f(e).destroy();
					}),
					(n.wbg.__wbg_lost_8b38f6b11ee6fc7a = function (e) {
						return u(f(e).lost);
					}),
					(n.wbg.__wbg_setonuncapturederror_0be5de64e7007c74 = function (e, n) {
						f(e).onuncapturederror = f(n);
					}),
					(n.wbg.__wbg_pushErrorScope_9d2efa96f1284dc5 = function (e, n) {
						f(e).pushErrorScope(i(n));
					}),
					(n.wbg.__wbg_popErrorScope_ad424d89092f73bc = function (e) {
						return u(f(e).popErrorScope());
					}),
					(n.wbg.__wbg_mapAsync_a4db4d81e3b0e24b = function (e, n, _, t) {
						return u(f(e).mapAsync(n >>> 0, _, t));
					}),
					(n.wbg.__wbg_unmap_611bf1cbd5f97c38 = function (e) {
						f(e).unmap();
					}),
					(n.wbg.__wbg_createView_b7dd472e0c5be5b1 = function (e, n) {
						return u(f(e).createView(f(n)));
					}),
					(n.wbg.__wbg_destroy_8d61225b18a45189 = function (e) {
						f(e).destroy();
					}),
					(n.wbg.__wbg_destroy_fe38f4df8ac7f974 = function (e) {
						f(e).destroy();
					}),
					(n.wbg.__wbg_getBindGroupLayout_9f115a1647bfeade = function (e, n) {
						return u(f(e).getBindGroupLayout(n >>> 0));
					}),
					(n.wbg.__wbg_end_6b84044f8e94cab1 = function (e) {
						f(e).end();
					}),
					(n.wbg.__wbg_writeBuffer_e90d5d11db4eab3d = function (e, n, _, t, r, b) {
						f(e).writeBuffer(f(n), _, f(t), r, b);
					}),
					(n.wbg.__wbg_usage_6a86f0d1b227b2d9 = function (e) {
						return f(e).usage;
					}),
					(n.wbg.__wbg_size_3267237df19a7c75 = function (e) {
						return f(e).size;
					}),
					(n.wbg.__wbg_writeTexture_838556a4e982ad58 = function (e, n, _, t, r) {
						f(e).writeTexture(f(n), f(_), f(t), f(r));
					}),
					(n.wbg.__wbg_copyExternalImageToTexture_991efbf06f7e65cc = function (e, n, _, t) {
						f(e).copyExternalImageToTexture(f(n), f(_), f(t));
					}),
					(n.wbg.__wbg_setPipeline_866ee4cb30c2e7d0 = function (e, n) {
						f(e).setPipeline(f(n));
					}),
					(n.wbg.__wbg_setBindGroup_de385e8d90051649 = function (e, n, _) {
						f(e).setBindGroup(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_setBindGroup_0a86b4467e20e8fb = function (e, n, _, t, r, b, c) {
						f(e).setBindGroup(n >>> 0, f(_), H(t, r), b, c >>> 0);
					}),
					(n.wbg.__wbg_dispatchWorkgroups_0cf698fce26bed01 = function (e, n, _, t) {
						f(e).dispatchWorkgroups(n >>> 0, _ >>> 0, t >>> 0);
					}),
					(n.wbg.__wbg_dispatchWorkgroupsIndirect_287883a1c1af6dff = function (e, n, _) {
						f(e).dispatchWorkgroupsIndirect(f(n), _);
					}),
					(n.wbg.__wbg_submit_45411deaf663460c = function (e, n) {
						f(e).submit(f(n));
					}),
					(n.wbg.__wbg_queueMicrotask_481971b0d87f3dd4 = function (e) {
						queueMicrotask(f(e));
					}),
					(n.wbg.__wbg_queueMicrotask_3cbae2ec6b6cd3d6 = function (e) {
						return u(f(e).queueMicrotask);
					}),
					(n.wbg.__wbg_instanceof_WebGl2RenderingContext_6b8f92d566ced9e1 = function (e) {
						let n;
						try {
							n = f(e) instanceof WebGL2RenderingContext;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_beginQuery_3d6bb95151ccc499 = function (e, n, _) {
						f(e).beginQuery(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_bindBufferRange_e7b7d4cd65a6f94d = function (e, n, _, t, r, b) {
						f(e).bindBufferRange(n >>> 0, _ >>> 0, f(t), r, b);
					}),
					(n.wbg.__wbg_bindSampler_065f0bdf49888ff1 = function (e, n, _) {
						f(e).bindSampler(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_bindVertexArray_239574d42dbbd203 = function (e, n) {
						f(e).bindVertexArray(f(n));
					}),
					(n.wbg.__wbg_blitFramebuffer_4d77c70dcb183e0c = function (e, n, _, t, r, b, c, a, i, u, o) {
						f(e).blitFramebuffer(n, _, t, r, b, c, a, i, u >>> 0, o >>> 0);
					}),
					(n.wbg.__wbg_bufferData_194f0914aaada840 = function (e, n, _, t) {
						f(e).bufferData(n >>> 0, _, t >>> 0);
					}),
					(n.wbg.__wbg_bufferData_c787516945ba48c2 = function (e, n, _, t) {
						f(e).bufferData(n >>> 0, f(_), t >>> 0);
					}),
					(n.wbg.__wbg_bufferSubData_7f5ddd4fdc628963 = function (e, n, _, t) {
						f(e).bufferSubData(n >>> 0, _, f(t));
					}),
					(n.wbg.__wbg_clearBufferiv_519fe97abe38622e = function (e, n, _, t, r) {
						f(e).clearBufferiv(n >>> 0, _, j(t, r));
					}),
					(n.wbg.__wbg_clearBufferuiv_1ae6df4bc96ffe37 = function (e, n, _, t, r) {
						f(e).clearBufferuiv(n >>> 0, _, H(t, r));
					}),
					(n.wbg.__wbg_clientWaitSync_8f9f625ae9a42de6 = function (e, n, _, t) {
						return f(e).clientWaitSync(f(n), _ >>> 0, t >>> 0);
					}),
					(n.wbg.__wbg_compressedTexSubImage2D_f77856eab95e8671 = function (e, n, _, t, r, b, c, a, i, u) {
						f(e).compressedTexSubImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i, u);
					}),
					(n.wbg.__wbg_compressedTexSubImage2D_87d89d4b3f413805 = function (e, n, _, t, r, b, c, a, i) {
						f(e).compressedTexSubImage2D(n >>> 0, _, t, r, b, c, a >>> 0, f(i));
					}),
					(n.wbg.__wbg_compressedTexSubImage3D_b69e67d3cd62b756 = function (e, n, _, t, r, b, c, a, i, u, o, g) {
						f(e).compressedTexSubImage3D(n >>> 0, _, t, r, b, c, a, i, u >>> 0, o, g);
					}),
					(n.wbg.__wbg_compressedTexSubImage3D_ff8eceb18a7ea2d6 = function (e, n, _, t, r, b, c, a, i, u, o) {
						f(e).compressedTexSubImage3D(n >>> 0, _, t, r, b, c, a, i, u >>> 0, f(o));
					}),
					(n.wbg.__wbg_copyBufferSubData_db2c040cc06be689 = function (e, n, _, t, r, b) {
						f(e).copyBufferSubData(n >>> 0, _ >>> 0, t, r, b);
					}),
					(n.wbg.__wbg_copyTexSubImage3D_0a3f60d0ee6409c7 = function (e, n, _, t, r, b, c, a, i, u) {
						f(e).copyTexSubImage3D(n >>> 0, _, t, r, b, c, a, i, u);
					}),
					(n.wbg.__wbg_createQuery_576d391ec549ed5e = function (e) {
						const n = f(e).createQuery();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createSampler_49de055e495fedf8 = function (e) {
						const n = f(e).createSampler();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createVertexArray_4f450ed4d4a69acf = function (e) {
						const n = f(e).createVertexArray();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_deleteQuery_9aaca8e15da5bc9c = function (e, n) {
						f(e).deleteQuery(f(n));
					}),
					(n.wbg.__wbg_deleteSampler_93e35dc696f633c9 = function (e, n) {
						f(e).deleteSampler(f(n));
					}),
					(n.wbg.__wbg_deleteSync_80326e1fc23a1016 = function (e, n) {
						f(e).deleteSync(f(n));
					}),
					(n.wbg.__wbg_deleteVertexArray_67635c7fe59aa660 = function (e, n) {
						f(e).deleteVertexArray(f(n));
					}),
					(n.wbg.__wbg_drawArraysInstanced_3f02ae8708f8c4c7 = function (e, n, _, t, r) {
						f(e).drawArraysInstanced(n >>> 0, _, t, r);
					}),
					(n.wbg.__wbg_drawBuffers_6d32a0c370b9cb7f = function (e, n) {
						f(e).drawBuffers(f(n));
					}),
					(n.wbg.__wbg_drawElementsInstanced_981861e70f6f9991 = function (e, n, _, t, r, b) {
						f(e).drawElementsInstanced(n >>> 0, _, t >>> 0, r, b);
					}),
					(n.wbg.__wbg_endQuery_f256667aaa2e9fac = function (e, n) {
						f(e).endQuery(n >>> 0);
					}),
					(n.wbg.__wbg_fenceSync_f9c8da648fd4e444 = function (e, n, _) {
						const t = f(e).fenceSync(n >>> 0, _ >>> 0);
						return m(t) ? 0 : u(t);
					}),
					(n.wbg.__wbg_framebufferTextureLayer_45cb5a2978de4939 = function (e, n, _, t, r, b) {
						f(e).framebufferTextureLayer(n >>> 0, _ >>> 0, f(t), r, b);
					}),
					(n.wbg.__wbg_getBufferSubData_7f31bd9ec3682832 = function (e, n, _, t) {
						f(e).getBufferSubData(n >>> 0, _, f(t));
					}),
					(n.wbg.__wbg_getIndexedParameter_ad00bfb1210dbb28 = function () {
						return M(function (e, n, _) {
							return u(f(e).getIndexedParameter(n >>> 0, _ >>> 0));
						}, arguments);
					}),
					(n.wbg.__wbg_getQueryParameter_ea4da47c69182e79 = function (e, n, _) {
						return u(f(e).getQueryParameter(f(n), _ >>> 0));
					}),
					(n.wbg.__wbg_getSyncParameter_295178259afc15d8 = function (e, n, _) {
						return u(f(e).getSyncParameter(f(n), _ >>> 0));
					}),
					(n.wbg.__wbg_getUniformBlockIndex_091bee5be624ff21 = function (e, n, _, t) {
						return f(e).getUniformBlockIndex(f(n), x(_, t));
					}),
					(n.wbg.__wbg_invalidateFramebuffer_99c0131e9e958f49 = function () {
						return M(function (e, n, _) {
							f(e).invalidateFramebuffer(n >>> 0, f(_));
						}, arguments);
					}),
					(n.wbg.__wbg_readBuffer_c02ab6ce6d95c99b = function (e, n) {
						f(e).readBuffer(n >>> 0);
					}),
					(n.wbg.__wbg_readPixels_40ba392d7aaf6ac0 = function () {
						return M(function (e, n, _, t, r, b, c, a) {
							f(e).readPixels(n, _, t, r, b >>> 0, c >>> 0, f(a));
						}, arguments);
					}),
					(n.wbg.__wbg_readPixels_db02ea1a888b611a = function () {
						return M(function (e, n, _, t, r, b, c, a) {
							f(e).readPixels(n, _, t, r, b >>> 0, c >>> 0, a);
						}, arguments);
					}),
					(n.wbg.__wbg_renderbufferStorageMultisample_37c0b1b9e8a4f342 = function (e, n, _, t, r, b) {
						f(e).renderbufferStorageMultisample(n >>> 0, _, t >>> 0, r, b);
					}),
					(n.wbg.__wbg_samplerParameterf_f60306a8facede3e = function (e, n, _, t) {
						f(e).samplerParameterf(f(n), _ >>> 0, t);
					}),
					(n.wbg.__wbg_samplerParameteri_da5225ffbb653046 = function (e, n, _, t) {
						f(e).samplerParameteri(f(n), _ >>> 0, t);
					}),
					(n.wbg.__wbg_texImage2D_2558a70047650d54 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u) {
							f(e).texImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, f(u));
						}, arguments);
					}),
					(n.wbg.__wbg_texImage2D_f807cf3bdc044190 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u, o) {
							f(e).texImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, 0 === u ? void 0 : U(u, o));
						}, arguments);
					}),
					(n.wbg.__wbg_texImage3D_7987a4b692d91b21 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u, o) {
							f(e).texImage3D(n >>> 0, _, t, r, b, c, a, i >>> 0, u >>> 0, f(o));
						}, arguments);
					}),
					(n.wbg.__wbg_texStorage2D_0fff70234489e5a8 = function (e, n, _, t, r, b) {
						f(e).texStorage2D(n >>> 0, _, t >>> 0, r, b);
					}),
					(n.wbg.__wbg_texStorage3D_7d322e9790add281 = function (e, n, _, t, r, b, c) {
						f(e).texStorage3D(n >>> 0, _, t >>> 0, r, b, c);
					}),
					(n.wbg.__wbg_texSubImage2D_b4ac5eac47418cc5 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u) {
							f(e).texSubImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, f(u));
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage2D_b962ba533b866161 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u) {
							f(e).texSubImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, u);
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage2D_0b72a7308c3e78d3 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u) {
							f(e).texSubImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, f(u));
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage2D_8f2db7871647d37a = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u) {
							f(e).texSubImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, f(u));
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage2D_defc51298c31c0e3 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u) {
							f(e).texSubImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, f(u));
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage3D_bd2fd28608206fe5 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u, o, g) {
							f(e).texSubImage3D(n >>> 0, _, t, r, b, c, a, i, u >>> 0, o >>> 0, g);
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage3D_895cc20d45e04909 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u, o, g) {
							f(e).texSubImage3D(n >>> 0, _, t, r, b, c, a, i, u >>> 0, o >>> 0, f(g));
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage3D_f75ab42a48d9b789 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u, o, g) {
							f(e).texSubImage3D(n >>> 0, _, t, r, b, c, a, i, u >>> 0, o >>> 0, f(g));
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage3D_2b48a701e63f042e = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u, o, g) {
							f(e).texSubImage3D(n >>> 0, _, t, r, b, c, a, i, u >>> 0, o >>> 0, f(g));
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage3D_f983428ce1099b7f = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u, o, g) {
							f(e).texSubImage3D(n >>> 0, _, t, r, b, c, a, i, u >>> 0, o >>> 0, f(g));
						}, arguments);
					}),
					(n.wbg.__wbg_uniform1ui_71145d62b7bd13f4 = function (e, n, _) {
						f(e).uniform1ui(f(n), _ >>> 0);
					}),
					(n.wbg.__wbg_uniform2fv_4bd352337ccc4530 = function (e, n, _, t) {
						f(e).uniform2fv(f(n), z(_, t));
					}),
					(n.wbg.__wbg_uniform2iv_829bd2f635ddf819 = function (e, n, _, t) {
						f(e).uniform2iv(f(n), j(_, t));
					}),
					(n.wbg.__wbg_uniform2uiv_6ae4fe2845703965 = function (e, n, _, t) {
						f(e).uniform2uiv(f(n), H(_, t));
					}),
					(n.wbg.__wbg_uniform3fv_3d2854c81603e498 = function (e, n, _, t) {
						f(e).uniform3fv(f(n), z(_, t));
					}),
					(n.wbg.__wbg_uniform3iv_71333eb685ad9616 = function (e, n, _, t) {
						f(e).uniform3iv(f(n), j(_, t));
					}),
					(n.wbg.__wbg_uniform3uiv_998cd5452e009d35 = function (e, n, _, t) {
						f(e).uniform3uiv(f(n), H(_, t));
					}),
					(n.wbg.__wbg_uniform4fv_39cdcce4b1acc767 = function (e, n, _, t) {
						f(e).uniform4fv(f(n), z(_, t));
					}),
					(n.wbg.__wbg_uniform4iv_f54116c4cfdcd96e = function (e, n, _, t) {
						f(e).uniform4iv(f(n), j(_, t));
					}),
					(n.wbg.__wbg_uniform4uiv_c1b79c253aa0271f = function (e, n, _, t) {
						f(e).uniform4uiv(f(n), H(_, t));
					}),
					(n.wbg.__wbg_uniformBlockBinding_52117c1104e3ac8a = function (e, n, _, t) {
						f(e).uniformBlockBinding(f(n), _ >>> 0, t >>> 0);
					}),
					(n.wbg.__wbg_uniformMatrix2fv_756ddcf41f02aa75 = function (e, n, _, t, r) {
						f(e).uniformMatrix2fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix2x3fv_b11505178375085e = function (e, n, _, t, r) {
						f(e).uniformMatrix2x3fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix2x4fv_9a96ca1263d07814 = function (e, n, _, t, r) {
						f(e).uniformMatrix2x4fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix3fv_f26b98137276fd3d = function (e, n, _, t, r) {
						f(e).uniformMatrix3fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix3x2fv_8e447d81dfee8f45 = function (e, n, _, t, r) {
						f(e).uniformMatrix3x2fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix3x4fv_0b4125c5150e9ebc = function (e, n, _, t, r) {
						f(e).uniformMatrix3x4fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix4fv_5d8e0e047546456b = function (e, n, _, t, r) {
						f(e).uniformMatrix4fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix4x2fv_15b6f3535fd4ce98 = function (e, n, _, t, r) {
						f(e).uniformMatrix4x2fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix4x3fv_5550b8543a32bbbd = function (e, n, _, t, r) {
						f(e).uniformMatrix4x3fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_vertexAttribDivisor_8479e8b81c913ed6 = function (e, n, _) {
						f(e).vertexAttribDivisor(n >>> 0, _ >>> 0);
					}),
					(n.wbg.__wbg_vertexAttribIPointer_69f2f4bd74cf0bcb = function (e, n, _, t, r, b) {
						f(e).vertexAttribIPointer(n >>> 0, _, t >>> 0, r, b);
					}),
					(n.wbg.__wbg_activeTexture_d42cec3a26e47a5b = function (e, n) {
						f(e).activeTexture(n >>> 0);
					}),
					(n.wbg.__wbg_attachShader_2112634b3ffa9e9f = function (e, n, _) {
						f(e).attachShader(f(n), f(_));
					}),
					(n.wbg.__wbg_bindAttribLocation_e05596ff4f5413c3 = function (e, n, _, t, r) {
						f(e).bindAttribLocation(f(n), _ >>> 0, x(t, r));
					}),
					(n.wbg.__wbg_bindBuffer_90d4fb91538001d5 = function (e, n, _) {
						f(e).bindBuffer(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_bindFramebuffer_4f950b884dc4be83 = function (e, n, _) {
						f(e).bindFramebuffer(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_bindRenderbuffer_1e0b14f526ed7a9d = function (e, n, _) {
						f(e).bindRenderbuffer(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_bindTexture_75a698c47a923814 = function (e, n, _) {
						f(e).bindTexture(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_blendColor_7d3bf5e5214b44f7 = function (e, n, _, t, r) {
						f(e).blendColor(n, _, t, r);
					}),
					(n.wbg.__wbg_blendEquation_6ca8e567e79464a4 = function (e, n) {
						f(e).blendEquation(n >>> 0);
					}),
					(n.wbg.__wbg_blendEquationSeparate_34aa4cecd02882ab = function (e, n, _) {
						f(e).blendEquationSeparate(n >>> 0, _ >>> 0);
					}),
					(n.wbg.__wbg_blendFunc_cffe61957c92e9ac = function (e, n, _) {
						f(e).blendFunc(n >>> 0, _ >>> 0);
					}),
					(n.wbg.__wbg_blendFuncSeparate_3c342f57887c2900 = function (e, n, _, t, r) {
						f(e).blendFuncSeparate(n >>> 0, _ >>> 0, t >>> 0, r >>> 0);
					}),
					(n.wbg.__wbg_clear_8e2508724944df18 = function (e, n) {
						f(e).clear(n >>> 0);
					}),
					(n.wbg.__wbg_clearColor_480962bfac4e1cbd = function (e, n, _, t, r) {
						f(e).clearColor(n, _, t, r);
					}),
					(n.wbg.__wbg_clearDepth_f5b4a73c4b8050eb = function (e, n) {
						f(e).clearDepth(n);
					}),
					(n.wbg.__wbg_clearStencil_1e4bb9932be75fce = function (e, n) {
						f(e).clearStencil(n);
					}),
					(n.wbg.__wbg_colorMask_21a93d0180bcbffa = function (e, n, _, t, r) {
						f(e).colorMask(0 !== n, 0 !== _, 0 !== t, 0 !== r);
					}),
					(n.wbg.__wbg_compileShader_f40e0c51a7a836fd = function (e, n) {
						f(e).compileShader(f(n));
					}),
					(n.wbg.__wbg_copyTexSubImage2D_65140521b061c61b = function (e, n, _, t, r, b, c, a, i) {
						f(e).copyTexSubImage2D(n >>> 0, _, t, r, b, c, a, i);
					}),
					(n.wbg.__wbg_createBuffer_7f57647465d111f0 = function (e) {
						const n = f(e).createBuffer();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createFramebuffer_8ebfde8c77472024 = function (e) {
						const n = f(e).createFramebuffer();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createProgram_7759fb2effb5d9b3 = function (e) {
						const n = f(e).createProgram();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createRenderbuffer_340b1c428d564bfd = function (e) {
						const n = f(e).createRenderbuffer();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createShader_b474ef421ec0f80b = function (e, n) {
						const _ = f(e).createShader(n >>> 0);
						return m(_) ? 0 : u(_);
					}),
					(n.wbg.__wbg_createTexture_18b4a88c14cb086e = function (e) {
						const n = f(e).createTexture();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_cullFace_fe427cdf8d0ea4e2 = function (e, n) {
						f(e).cullFace(n >>> 0);
					}),
					(n.wbg.__wbg_deleteBuffer_fca5d765302c9a4e = function (e, n) {
						f(e).deleteBuffer(f(n));
					}),
					(n.wbg.__wbg_deleteFramebuffer_da681ed1dfa6d543 = function (e, n) {
						f(e).deleteFramebuffer(f(n));
					}),
					(n.wbg.__wbg_deleteProgram_a06d69620332cc70 = function (e, n) {
						f(e).deleteProgram(f(n));
					}),
					(n.wbg.__wbg_deleteRenderbuffer_5dcdde247a392125 = function (e, n) {
						f(e).deleteRenderbuffer(f(n));
					}),
					(n.wbg.__wbg_deleteShader_138a810cc0ca9986 = function (e, n) {
						f(e).deleteShader(f(n));
					}),
					(n.wbg.__wbg_deleteTexture_eae7abcfa3015f09 = function (e, n) {
						f(e).deleteTexture(f(n));
					}),
					(n.wbg.__wbg_depthFunc_5527d3ee35e25a8d = function (e, n) {
						f(e).depthFunc(n >>> 0);
					}),
					(n.wbg.__wbg_depthMask_9120207d491c649a = function (e, n) {
						f(e).depthMask(0 !== n);
					}),
					(n.wbg.__wbg_depthRange_d8d5ad00fd133fc0 = function (e, n, _) {
						f(e).depthRange(n, _);
					}),
					(n.wbg.__wbg_disable_f0ef6e9a7ac6ddd7 = function (e, n) {
						f(e).disable(n >>> 0);
					}),
					(n.wbg.__wbg_disableVertexAttribArray_e4f458e34e54fe78 = function (e, n) {
						f(e).disableVertexAttribArray(n >>> 0);
					}),
					(n.wbg.__wbg_drawArrays_5bf0d92947e472af = function (e, n, _, t) {
						f(e).drawArrays(n >>> 0, _, t);
					}),
					(n.wbg.__wbg_enable_8b3019da8846ce76 = function (e, n) {
						f(e).enable(n >>> 0);
					}),
					(n.wbg.__wbg_enableVertexAttribArray_9d7b7e199f86e09b = function (e, n) {
						f(e).enableVertexAttribArray(n >>> 0);
					}),
					(n.wbg.__wbg_framebufferRenderbuffer_0144c6e35e2edb19 = function (e, n, _, t, r) {
						f(e).framebufferRenderbuffer(n >>> 0, _ >>> 0, t >>> 0, f(r));
					}),
					(n.wbg.__wbg_framebufferTexture2D_a6ad7148f7983ae6 = function (e, n, _, t, r, b) {
						f(e).framebufferTexture2D(n >>> 0, _ >>> 0, t >>> 0, f(r), b);
					}),
					(n.wbg.__wbg_frontFace_41ab8e7ce3e48cae = function (e, n) {
						f(e).frontFace(n >>> 0);
					}),
					(n.wbg.__wbg_getError_d02c89917f45dd5e = function (e) {
						return f(e).getError();
					}),
					(n.wbg.__wbg_getExtension_bef4112494c87f34 = function () {
						return M(function (e, n, _) {
							const t = f(e).getExtension(x(n, _));
							return m(t) ? 0 : u(t);
						}, arguments);
					}),
					(n.wbg.__wbg_getParameter_aa9af66884d2b210 = function () {
						return M(function (e, n) {
							return u(f(e).getParameter(n >>> 0));
						}, arguments);
					}),
					(n.wbg.__wbg_getProgramInfoLog_4d189135f8d5a2de = function (e, n, _) {
						const t = f(n).getProgramInfoLog(f(_));
						var r = m(t) ? 0 : l(t, b.__wbindgen_malloc, b.__wbindgen_realloc),
							c = o;
						(y()[e / 4 + 1] = c), (y()[e / 4 + 0] = r);
					}),
					(n.wbg.__wbg_getProgramParameter_7b04ca71a79d9047 = function (e, n, _) {
						return u(f(e).getProgramParameter(f(n), _ >>> 0));
					}),
					(n.wbg.__wbg_getShaderInfoLog_d5de3e4eab06fc46 = function (e, n, _) {
						const t = f(n).getShaderInfoLog(f(_));
						var r = m(t) ? 0 : l(t, b.__wbindgen_malloc, b.__wbindgen_realloc),
							c = o;
						(y()[e / 4 + 1] = c), (y()[e / 4 + 0] = r);
					}),
					(n.wbg.__wbg_getShaderParameter_4ddb51279bb1500b = function (e, n, _) {
						return u(f(e).getShaderParameter(f(n), _ >>> 0));
					}),
					(n.wbg.__wbg_getSupportedExtensions_7a174085f9e1983a = function (e) {
						const n = f(e).getSupportedExtensions();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_getUniformLocation_51ec30e3755e574d = function (e, n, _, t) {
						const r = f(e).getUniformLocation(f(n), x(_, t));
						return m(r) ? 0 : u(r);
					}),
					(n.wbg.__wbg_linkProgram_eabc664217816e72 = function (e, n) {
						f(e).linkProgram(f(n));
					}),
					(n.wbg.__wbg_pixelStorei_162a23ba7872b886 = function (e, n, _) {
						f(e).pixelStorei(n >>> 0, _);
					}),
					(n.wbg.__wbg_polygonOffset_9f20aa27db3ea0a2 = function (e, n, _) {
						f(e).polygonOffset(n, _);
					}),
					(n.wbg.__wbg_renderbufferStorage_ff5740fb95ecf231 = function (e, n, _, t, r) {
						f(e).renderbufferStorage(n >>> 0, _ >>> 0, t, r);
					}),
					(n.wbg.__wbg_scissor_726eea865bbd6809 = function (e, n, _, t, r) {
						f(e).scissor(n, _, t, r);
					}),
					(n.wbg.__wbg_shaderSource_7943d06f24862a3b = function (e, n, _, t) {
						f(e).shaderSource(f(n), x(_, t));
					}),
					(n.wbg.__wbg_stencilFuncSeparate_c16750a621e43580 = function (e, n, _, t, r) {
						f(e).stencilFuncSeparate(n >>> 0, _ >>> 0, t, r >>> 0);
					}),
					(n.wbg.__wbg_stencilMask_9abfc669d9c2a893 = function (e, n) {
						f(e).stencilMask(n >>> 0);
					}),
					(n.wbg.__wbg_stencilMaskSeparate_a1f8f805de62aac5 = function (e, n, _) {
						f(e).stencilMaskSeparate(n >>> 0, _ >>> 0);
					}),
					(n.wbg.__wbg_stencilOpSeparate_2f2cc25254360270 = function (e, n, _, t, r) {
						f(e).stencilOpSeparate(n >>> 0, _ >>> 0, t >>> 0, r >>> 0);
					}),
					(n.wbg.__wbg_texParameteri_8f70dffce11d7da1 = function (e, n, _, t) {
						f(e).texParameteri(n >>> 0, _ >>> 0, t);
					}),
					(n.wbg.__wbg_uniform1f_9b9e5339e7560722 = function (e, n, _) {
						f(e).uniform1f(f(n), _);
					}),
					(n.wbg.__wbg_uniform1i_bdcd75be097285e6 = function (e, n, _) {
						f(e).uniform1i(f(n), _);
					}),
					(n.wbg.__wbg_uniform4f_b143081575a3bb56 = function (e, n, _, t, r, b) {
						f(e).uniform4f(f(n), _, t, r, b);
					}),
					(n.wbg.__wbg_useProgram_757fab437af29c20 = function (e, n) {
						f(e).useProgram(f(n));
					}),
					(n.wbg.__wbg_vertexAttribPointer_4416f0325c02aa13 = function (e, n, _, t, r, b, c) {
						f(e).vertexAttribPointer(n >>> 0, _, t >>> 0, 0 !== r, b, c);
					}),
					(n.wbg.__wbg_viewport_7414e7e2a83afc72 = function (e, n, _, t, r) {
						f(e).viewport(n, _, t, r);
					}),
					(n.wbg.__wbg_instanceof_Window_f401953a2cf86220 = function (e) {
						let n;
						try {
							n = f(e) instanceof Window;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_document_5100775d18896c16 = function (e) {
						const n = f(e).document;
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_location_2951b5ee34f19221 = function (e) {
						return u(f(e).location);
					}),
					(n.wbg.__wbg_navigator_6c8fa55c5cc8796e = function (e) {
						return u(f(e).navigator);
					}),
					(n.wbg.__wbg_devicePixelRatio_efc553b59506f64c = function (e) {
						return f(e).devicePixelRatio;
					}),
					(n.wbg.__wbg_localStorage_e381d34d0c40c761 = function () {
						return M(function (e) {
							const n = f(e).localStorage;
							return m(n) ? 0 : u(n);
						}, arguments);
					}),
					(n.wbg.__wbg_confirm_5c66cecc6cf673d1 = function () {
						return M(function (e, n, _) {
							return f(e).confirm(x(n, _));
						}, arguments);
					}),
					(n.wbg.__wbg_focus_ca436824e14c8128 = function () {
						return M(function (e) {
							f(e).focus();
						}, arguments);
					}),
					(n.wbg.__wbg_open_cc82b8aaf0c296c1 = function () {
						return M(function (e, n, _, t, r) {
							const b = f(e).open(x(n, _), x(t, r));
							return m(b) ? 0 : u(b);
						}, arguments);
					}),
					(n.wbg.__wbg_cancelAnimationFrame_111532f326e480af = function () {
						return M(function (e, n) {
							f(e).cancelAnimationFrame(n);
						}, arguments);
					}),
					(n.wbg.__wbg_requestAnimationFrame_549258cfa66011f0 = function () {
						return M(function (e, n) {
							return f(e).requestAnimationFrame(f(n));
						}, arguments);
					}),
					(n.wbg.__wbg_fetch_c4b6afebdb1f918e = function (e, n) {
						return u(f(e).fetch(f(n)));
					}),
					(n.wbg.__wbg_body_edb1908d3ceff3a1 = function (e) {
						const n = f(e).body;
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createElement_8bae7856a4bb7411 = function () {
						return M(function (e, n, _) {
							return u(f(e).createElement(x(n, _)));
						}, arguments);
					}),
					(n.wbg.__wbg_createElementNS_556a62fb298be5a2 = function () {
						return M(function (e, n, _, t, r) {
							return u(f(e).createElementNS(0 === n ? void 0 : x(n, _), x(t, r)));
						}, arguments);
					}),
					(n.wbg.__wbg_querySelector_a5f74efc5fa193dd = function () {
						return M(function (e, n, _) {
							const t = f(e).querySelector(x(n, _));
							return m(t) ? 0 : u(t);
						}, arguments);
					}),
					(n.wbg.__wbg_querySelectorAll_4e0fcdb64cda2cd5 = function () {
						return M(function (e, n, _) {
							return u(f(e).querySelectorAll(x(n, _)));
						}, arguments);
					}),
					(n.wbg.__wbg_setid_37bacc3f09f555aa = function (e, n, _) {
						f(e).id = x(n, _);
					}),
					(n.wbg.__wbg_clientWidth_7ea3915573b64350 = function (e) {
						return f(e).clientWidth;
					}),
					(n.wbg.__wbg_clientHeight_d24efa25aa66e844 = function (e) {
						return f(e).clientHeight;
					}),
					(n.wbg.__wbg_setinnerHTML_26d69b59e1af99c7 = function (e, n, _) {
						f(e).innerHTML = x(n, _);
					}),
					(n.wbg.__wbg_querySelector_4007461b1978a9eb = function () {
						return M(function (e, n, _) {
							const t = f(e).querySelector(x(n, _));
							return m(t) ? 0 : u(t);
						}, arguments);
					}),
					(n.wbg.__wbg_releasePointerCapture_188077a2b7bc54b4 = function () {
						return M(function (e, n) {
							f(e).releasePointerCapture(n);
						}, arguments);
					}),
					(n.wbg.__wbg_setAttribute_3c9f6c303b696daa = function () {
						return M(function (e, n, _, t, r) {
							f(e).setAttribute(x(n, _), x(t, r));
						}, arguments);
					}),
					(n.wbg.__wbg_setAttributeNS_b4f4460edccac457 = function () {
						return M(function (e, n, _, t, r, b, c) {
							f(e).setAttributeNS(0 === n ? void 0 : x(n, _), x(t, r), x(b, c));
						}, arguments);
					}),
					(n.wbg.__wbg_setPointerCapture_0fdaad7a916c8486 = function () {
						return M(function (e, n) {
							f(e).setPointerCapture(n);
						}, arguments);
					}),
					(n.wbg.__wbg_remove_49b0a5925a04b955 = function (e) {
						f(e).remove();
					}),
					(n.wbg.__wbg_clipboardData_0427b2003659865a = function (e) {
						const n = f(e).clipboardData;
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_instanceof_HtmlElement_3bcc4ff70cfdcba5 = function (e) {
						let n;
						try {
							n = f(e) instanceof HTMLElement;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_setinnerText_087b7e3f90d97466 = function (e, n, _) {
						f(e).innerText = x(n, _);
					}),
					(n.wbg.__wbg_style_c3fc3dd146182a2d = function (e) {
						return u(f(e).style);
					}),
					(n.wbg.__wbg_setonclick_4fd9bd8531d33a17 = function (e, n) {
						f(e).onclick = f(n);
					}),
					(n.wbg.__wbg_click_897b305b2e10b9cf = function (e) {
						f(e).click();
					}),
					(n.wbg.__wbg_instanceof_HtmlFormElement_ec8cd1ecba7bc422 = function (e) {
						let n;
						try {
							n = f(e) instanceof HTMLFormElement;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_setaction_98bd0ddfb099827a = function (e, n, _) {
						f(e).action = x(n, _);
					}),
					(n.wbg.__wbg_setmethod_1a26807588aa8d2b = function (e, n, _) {
						f(e).method = x(n, _);
					}),
					(n.wbg.__wbg_settarget_20556ede8aed95b6 = function (e, n, _) {
						f(e).target = x(n, _);
					}),
					(n.wbg.__wbg_submit_aca30dd0ce2229aa = function () {
						return M(function (e) {
							f(e).submit();
						}, arguments);
					}),
					(n.wbg.__wbg_width_ddb5e7bb9fbdd107 = function (e) {
						return f(e).width;
					}),
					(n.wbg.__wbg_height_2c4b892494a113f4 = function (e) {
						return f(e).height;
					}),
					(n.wbg.__wbg_newwithsw_674074f998dc34a4 = function () {
						return M(function (e, n) {
							return u(new ImageData(e >>> 0, n >>> 0));
						}, arguments);
					}),
					(n.wbg.__wbg_newwithu8clampedarray_ae824147b27925fc = function () {
						return M(function (e, n, _) {
							return u(new ImageData(N(e, n), _ >>> 0));
						}, arguments);
					}),
					(n.wbg.__wbg_href_706b235ecfe6848c = function () {
						return M(function (e, n) {
							const _ = l(f(n).href, b.__wbindgen_malloc, b.__wbindgen_realloc),
								t = o;
							(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
						}, arguments);
					}),
					(n.wbg.__wbg_protocol_b7292c581cfe1e5c = function () {
						return M(function (e, n) {
							const _ = l(f(n).protocol, b.__wbindgen_malloc, b.__wbindgen_realloc),
								t = o;
							(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
						}, arguments);
					}),
					(n.wbg.__wbg_assign_ab4a69a994878ad9 = function () {
						return M(function (e, n, _) {
							f(e).assign(x(n, _));
						}, arguments);
					}),
					(n.wbg.__wbg_baseURI_cb29fa8ab9af8494 = function () {
						return M(function (e, n) {
							const _ = f(n).baseURI;
							var t = m(_) ? 0 : l(_, b.__wbindgen_malloc, b.__wbindgen_realloc),
								r = o;
							(y()[e / 4 + 1] = r), (y()[e / 4 + 0] = t);
						}, arguments);
					}),
					(n.wbg.__wbg_parentElement_347524db59fc2976 = function (e) {
						const n = f(e).parentElement;
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_appendChild_580ccb11a660db68 = function () {
						return M(function (e, n) {
							return u(f(e).appendChild(f(n)));
						}, arguments);
					}),
					(n.wbg.__wbg_removeChild_96bbfefd2f5a0261 = function () {
						return M(function (e, n) {
							return u(f(e).removeChild(f(n)));
						}, arguments);
					}),
					(n.wbg.__wbg_get_8cd5eba00ab6304f = function (e, n) {
						const _ = f(e)[n >>> 0];
						return m(_) ? 0 : u(_);
					}),
					(n.wbg.__wbg_get_4087ef212be53c31 = function () {
						return M(function (e, n, _, t) {
							const r = f(n)[x(_, t)];
							var c = m(r) ? 0 : l(r, b.__wbindgen_malloc, b.__wbindgen_realloc),
								a = o;
							(y()[e / 4 + 1] = a), (y()[e / 4 + 0] = c);
						}, arguments);
					}),
					(n.wbg.__wbg_set_2ff617abddd9098d = function () {
						return M(function (e, n, _, t, r) {
							f(e)[x(n, _)] = x(t, r);
						}, arguments);
					}),
					(n.wbg.__wbg_delete_808f42904ec49124 = function () {
						return M(function (e, n, _) {
							delete f(e)[x(n, _)];
						}, arguments);
					}),
					(n.wbg.__wbg_setbuffer_1793c076d39c6617 = function (e, n) {
						f(e).buffer = f(n);
					}),
					(n.wbg.__wbg_setonended_ad220d8d48b1642c = function (e, n) {
						f(e).onended = f(n);
					}),
					(n.wbg.__wbg_start_07ac75070dcdd1a2 = function () {
						return M(function (e, n) {
							f(e).start(n);
						}, arguments);
					}),
					(n.wbg.__wbg_setProperty_ea7d15a2b591aa97 = function () {
						return M(function (e, n, _, t, r) {
							f(e).setProperty(x(n, _), x(t, r));
						}, arguments);
					}),
					(n.wbg.__wbg_platform_8564d910286ea6e5 = function () {
						return M(function (e, n) {
							const _ = l(f(n).platform, b.__wbindgen_malloc, b.__wbindgen_realloc),
								t = o;
							(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
						}, arguments);
					}),
					(n.wbg.__wbg_language_64a5be2885d1c412 = function (e, n) {
						const _ = f(n).language;
						var t = m(_) ? 0 : l(_, b.__wbindgen_malloc, b.__wbindgen_realloc),
							r = o;
						(y()[e / 4 + 1] = r), (y()[e / 4 + 0] = t);
					}),
					(n.wbg.__wbg_pointerId_e030fa156647fedd = function (e) {
						return f(e).pointerId;
					}),
					(n.wbg.__wbg_headers_abb199c3be8d817c = function (e) {
						return u(f(e).headers);
					}),
					(n.wbg.__wbg_newwithstrandinit_3fd6fba4083ff2d0 = function () {
						return M(function (e, n, _) {
							return u(new Request(x(e, n), f(_)));
						}, arguments);
					}),
					(n.wbg.__wbg_instanceof_Response_849eb93e75734b6e = function (e) {
						let n;
						try {
							n = f(e) instanceof Response;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_url_5f6dc4009ac5f99d = function (e, n) {
						const _ = l(f(n).url, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_redirected_1a9130cafa803002 = function (e) {
						return f(e).redirected;
					}),
					(n.wbg.__wbg_status_61a01141acd3cf74 = function (e) {
						return f(e).status;
					}),
					(n.wbg.__wbg_ok_38d7c30bbc66719e = function (e) {
						return f(e).ok;
					}),
					(n.wbg.__wbg_statusText_1e41a5e3986992cd = function (e, n) {
						const _ = l(f(n).statusText, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_headers_9620bfada380764a = function (e) {
						return u(f(e).headers);
					}),
					(n.wbg.__wbg_body_9545a94f397829db = function (e) {
						const n = f(e).body;
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_arrayBuffer_29931d52c7206b02 = function () {
						return M(function (e) {
							return u(f(e).arrayBuffer());
						}, arguments);
					}),
					(n.wbg.__wbg_deltaY_032e327e216f2b2b = function (e) {
						return f(e).deltaY;
					}),
					(n.wbg.__wbg_deltaMode_294b2eaf54047265 = function (e) {
						return f(e).deltaMode;
					}),
					(n.wbg.__wbg_navigator_56803b85352a0575 = function (e) {
						return u(f(e).navigator);
					}),
					(n.wbg.__wbg_connect_186433827476e7d8 = function () {
						return M(function (e, n) {
							return u(f(e).connect(f(n)));
						}, arguments);
					}),
					(n.wbg.__wbg_wasClean_8222e9acf5c5ad07 = function (e) {
						return f(e).wasClean;
					}),
					(n.wbg.__wbg_code_5ee5dcc2842228cd = function (e) {
						return f(e).code;
					}),
					(n.wbg.__wbg_reason_5ed6709323849cb1 = function (e, n) {
						const _ = l(f(n).reason, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_newwitheventinitdict_c939a6b964db4d91 = function () {
						return M(function (e, n, _) {
							return u(new CloseEvent(x(e, n), f(_)));
						}, arguments);
					}),
					(n.wbg.__wbg_instanceof_HtmlButtonElement_534f7aa847dae46f = function (e) {
						let n;
						try {
							n = f(e) instanceof HTMLButtonElement;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_instanceof_HtmlTextAreaElement_7963188e191245be = function (e) {
						let n;
						try {
							n = f(e) instanceof HTMLTextAreaElement;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_setvalue_090972231f0a4f6f = function (e, n, _) {
						f(e).value = x(n, _);
					}),
					(n.wbg.__wbg_select_ee58216227b1aff8 = function (e) {
						f(e).select();
					}),
					(n.wbg.__wbg_createObjectURL_ad8244759309f204 = function () {
						return M(function (e, n) {
							const _ = l(URL.createObjectURL(f(n)), b.__wbindgen_malloc, b.__wbindgen_realloc),
								t = o;
							(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
						}, arguments);
					}),
					(n.wbg.__wbg_revokeObjectURL_16a2051ee9d99da9 = function () {
						return M(function (e, n) {
							URL.revokeObjectURL(x(e, n));
						}, arguments);
					}),
					(n.wbg.__wbg_framebufferTextureMultiviewOVR_a4eb1a11052508f4 = function (e, n, _, t, r, b, c) {
						f(e).framebufferTextureMultiviewOVR(n >>> 0, _ >>> 0, f(t), r, b, c);
					}),
					(n.wbg.__wbg_instanceof_WebGlRenderingContext_d48361eb1e636d9a = function (e) {
						let n;
						try {
							n = f(e) instanceof WebGLRenderingContext;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_drawingBufferWidth_bf7074fcb9fa2661 = function (e) {
						return f(e).drawingBufferWidth;
					}),
					(n.wbg.__wbg_drawingBufferHeight_b3c922278dc48514 = function (e) {
						return f(e).drawingBufferHeight;
					}),
					(n.wbg.__wbg_bufferData_bb9321e8fa042bac = function (e, n, _, t) {
						f(e).bufferData(n >>> 0, _, t >>> 0);
					}),
					(n.wbg.__wbg_bufferData_5d1e6b8eaa7d23c8 = function (e, n, _, t) {
						f(e).bufferData(n >>> 0, f(_), t >>> 0);
					}),
					(n.wbg.__wbg_bufferData_d37ea06bddbb0e15 = function (e, n, _, t, r) {
						f(e).bufferData(n >>> 0, U(_, t), r >>> 0);
					}),
					(n.wbg.__wbg_bufferSubData_a6cea5e056662bd7 = function (e, n, _, t) {
						f(e).bufferSubData(n >>> 0, _, f(t));
					}),
					(n.wbg.__wbg_compressedTexSubImage2D_db8b170a99900aff = function (e, n, _, t, r, b, c, a, i) {
						f(e).compressedTexSubImage2D(n >>> 0, _, t, r, b, c, a >>> 0, f(i));
					}),
					(n.wbg.__wbg_readPixels_551d0505625c865b = function () {
						return M(function (e, n, _, t, r, b, c, a) {
							f(e).readPixels(n, _, t, r, b >>> 0, c >>> 0, f(a));
						}, arguments);
					}),
					(n.wbg.__wbg_texImage2D_a14a3c7863e25c89 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u) {
							f(e).texImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, f(u));
						}, arguments);
					}),
					(n.wbg.__wbg_texImage2D_e7b9786b49257799 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u, o) {
							f(e).texImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, 0 === u ? void 0 : U(u, o));
						}, arguments);
					}),
					(n.wbg.__wbg_texSubImage2D_55a407e48f3a5cb4 = function () {
						return M(function (e, n, _, t, r, b, c, a, i, u) {
							f(e).texSubImage2D(n >>> 0, _, t, r, b, c, a >>> 0, i >>> 0, f(u));
						}, arguments);
					}),
					(n.wbg.__wbg_uniform1fv_c8526e876e1ab4cb = function (e, n, _, t) {
						f(e).uniform1fv(f(n), z(_, t));
					}),
					(n.wbg.__wbg_uniform2fv_dcb8b73e2637092a = function (e, n, _, t) {
						f(e).uniform2fv(f(n), z(_, t));
					}),
					(n.wbg.__wbg_uniform2iv_fc73855d9dec793a = function (e, n, _, t) {
						f(e).uniform2iv(f(n), j(_, t));
					}),
					(n.wbg.__wbg_uniform3fv_3e32c897d3ed1eaa = function (e, n, _, t) {
						f(e).uniform3fv(f(n), z(_, t));
					}),
					(n.wbg.__wbg_uniform3iv_2b3fa9d97dff01a2 = function (e, n, _, t) {
						f(e).uniform3iv(f(n), j(_, t));
					}),
					(n.wbg.__wbg_uniform4fv_980ce05d950ee599 = function (e, n, _, t) {
						f(e).uniform4fv(f(n), z(_, t));
					}),
					(n.wbg.__wbg_uniform4iv_f112dcc4401f5469 = function (e, n, _, t) {
						f(e).uniform4iv(f(n), j(_, t));
					}),
					(n.wbg.__wbg_uniformMatrix2fv_4417ed4d88a140be = function (e, n, _, t, r) {
						f(e).uniformMatrix2fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix3fv_d46553a1248946b5 = function (e, n, _, t, r) {
						f(e).uniformMatrix3fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_uniformMatrix4fv_cd46ed81bccb0cb2 = function (e, n, _, t, r) {
						f(e).uniformMatrix4fv(f(n), 0 !== _, z(t, r));
					}),
					(n.wbg.__wbg_activeTexture_5f084e1b3f14853e = function (e, n) {
						f(e).activeTexture(n >>> 0);
					}),
					(n.wbg.__wbg_attachShader_6397dc4fd87343d3 = function (e, n, _) {
						f(e).attachShader(f(n), f(_));
					}),
					(n.wbg.__wbg_bindAttribLocation_7ab87f5815dce9f0 = function (e, n, _, t, r) {
						f(e).bindAttribLocation(f(n), _ >>> 0, x(t, r));
					}),
					(n.wbg.__wbg_bindBuffer_1e5043751efddd4f = function (e, n, _) {
						f(e).bindBuffer(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_bindFramebuffer_c301d73a2c2842bb = function (e, n, _) {
						f(e).bindFramebuffer(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_bindRenderbuffer_8ec7d02bd60bdfb2 = function (e, n, _) {
						f(e).bindRenderbuffer(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_bindTexture_772f5eb022019d87 = function (e, n, _) {
						f(e).bindTexture(n >>> 0, f(_));
					}),
					(n.wbg.__wbg_blendColor_f25a274ecd388a1e = function (e, n, _, t, r) {
						f(e).blendColor(n, _, t, r);
					}),
					(n.wbg.__wbg_blendEquation_a442d97b5c6efedb = function (e, n) {
						f(e).blendEquation(n >>> 0);
					}),
					(n.wbg.__wbg_blendEquationSeparate_721f30ba584a5233 = function (e, n, _) {
						f(e).blendEquationSeparate(n >>> 0, _ >>> 0);
					}),
					(n.wbg.__wbg_blendFunc_fc4b298f39801a9c = function (e, n, _) {
						f(e).blendFunc(n >>> 0, _ >>> 0);
					}),
					(n.wbg.__wbg_blendFuncSeparate_abe2ad4272c8365e = function (e, n, _, t, r) {
						f(e).blendFuncSeparate(n >>> 0, _ >>> 0, t >>> 0, r >>> 0);
					}),
					(n.wbg.__wbg_clear_f9731a47df2e70d8 = function (e, n) {
						f(e).clear(n >>> 0);
					}),
					(n.wbg.__wbg_clearColor_42707553c40e0e0f = function (e, n, _, t, r) {
						f(e).clearColor(n, _, t, r);
					}),
					(n.wbg.__wbg_clearDepth_42ac48f2ab25c419 = function (e, n) {
						f(e).clearDepth(n);
					}),
					(n.wbg.__wbg_clearStencil_0f906e2d8b61aa7a = function (e, n) {
						f(e).clearStencil(n);
					}),
					(n.wbg.__wbg_colorMask_03aa359acc86fd70 = function (e, n, _, t, r) {
						f(e).colorMask(0 !== n, 0 !== _, 0 !== t, 0 !== r);
					}),
					(n.wbg.__wbg_compileShader_3af4719dfdb508e3 = function (e, n) {
						f(e).compileShader(f(n));
					}),
					(n.wbg.__wbg_copyTexSubImage2D_0e21b1e1089c410a = function (e, n, _, t, r, b, c, a, i) {
						f(e).copyTexSubImage2D(n >>> 0, _, t, r, b, c, a, i);
					}),
					(n.wbg.__wbg_createBuffer_34e01f5c10929b41 = function (e) {
						const n = f(e).createBuffer();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createFramebuffer_49ca64e9e1c6f5eb = function (e) {
						const n = f(e).createFramebuffer();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createProgram_9affbfa62b7b2608 = function (e) {
						const n = f(e).createProgram();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createRenderbuffer_375d7f4004bc49bd = function (e) {
						const n = f(e).createRenderbuffer();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_createShader_55ca04b44164bd41 = function (e, n) {
						const _ = f(e).createShader(n >>> 0);
						return m(_) ? 0 : u(_);
					}),
					(n.wbg.__wbg_createTexture_c13c31b2b132c17f = function (e) {
						const n = f(e).createTexture();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_cullFace_af37bb1c2d22ab73 = function (e, n) {
						f(e).cullFace(n >>> 0);
					}),
					(n.wbg.__wbg_deleteBuffer_96df38349e3487d2 = function (e, n) {
						f(e).deleteBuffer(f(n));
					}),
					(n.wbg.__wbg_deleteFramebuffer_417b62b6156d4894 = function (e, n) {
						f(e).deleteFramebuffer(f(n));
					}),
					(n.wbg.__wbg_deleteProgram_641402f7551587d8 = function (e, n) {
						f(e).deleteProgram(f(n));
					}),
					(n.wbg.__wbg_deleteRenderbuffer_d3aedb394b1ea546 = function (e, n) {
						f(e).deleteRenderbuffer(f(n));
					}),
					(n.wbg.__wbg_deleteShader_e5c778f25b722e68 = function (e, n) {
						f(e).deleteShader(f(n));
					}),
					(n.wbg.__wbg_deleteTexture_f89d8e417b156960 = function (e, n) {
						f(e).deleteTexture(f(n));
					}),
					(n.wbg.__wbg_depthFunc_1ee4bf1e0127bf7f = function (e, n) {
						f(e).depthFunc(n >>> 0);
					}),
					(n.wbg.__wbg_depthMask_dd6cd8a9aff90e5c = function (e, n) {
						f(e).depthMask(0 !== n);
					}),
					(n.wbg.__wbg_depthRange_7e521414b51cf5de = function (e, n, _) {
						f(e).depthRange(n, _);
					}),
					(n.wbg.__wbg_disable_5dd8c3842de93e92 = function (e, n) {
						f(e).disable(n >>> 0);
					}),
					(n.wbg.__wbg_disableVertexAttribArray_12bc9adefa738796 = function (e, n) {
						f(e).disableVertexAttribArray(n >>> 0);
					}),
					(n.wbg.__wbg_drawArrays_f619a26a53ab5ab3 = function (e, n, _, t) {
						f(e).drawArrays(n >>> 0, _, t);
					}),
					(n.wbg.__wbg_drawElements_0861624300587fcd = function (e, n, _, t, r) {
						f(e).drawElements(n >>> 0, _, t >>> 0, r);
					}),
					(n.wbg.__wbg_enable_7abe812a71c76206 = function (e, n) {
						f(e).enable(n >>> 0);
					}),
					(n.wbg.__wbg_enableVertexAttribArray_6d44444aa994f42a = function (e, n) {
						f(e).enableVertexAttribArray(n >>> 0);
					}),
					(n.wbg.__wbg_framebufferRenderbuffer_e1c9c64aea848b39 = function (e, n, _, t, r) {
						f(e).framebufferRenderbuffer(n >>> 0, _ >>> 0, t >>> 0, f(r));
					}),
					(n.wbg.__wbg_framebufferTexture2D_66e1968fd5b7b3e3 = function (e, n, _, t, r, b) {
						f(e).framebufferTexture2D(n >>> 0, _ >>> 0, t >>> 0, f(r), b);
					}),
					(n.wbg.__wbg_frontFace_bb8a1ded6f52865e = function (e, n) {
						f(e).frontFace(n >>> 0);
					}),
					(n.wbg.__wbg_getAttribLocation_0a3d71a11394d043 = function (e, n, _, t) {
						return f(e).getAttribLocation(f(n), x(_, t));
					}),
					(n.wbg.__wbg_getExtension_cb7fb87e4bca59c7 = function () {
						return M(function (e, n, _) {
							const t = f(e).getExtension(x(n, _));
							return m(t) ? 0 : u(t);
						}, arguments);
					}),
					(n.wbg.__wbg_getParameter_a77768abe8a51f24 = function () {
						return M(function (e, n) {
							return u(f(e).getParameter(n >>> 0));
						}, arguments);
					}),
					(n.wbg.__wbg_getProgramInfoLog_bf1fba8fa90667c7 = function (e, n, _) {
						const t = f(n).getProgramInfoLog(f(_));
						var r = m(t) ? 0 : l(t, b.__wbindgen_malloc, b.__wbindgen_realloc),
							c = o;
						(y()[e / 4 + 1] = c), (y()[e / 4 + 0] = r);
					}),
					(n.wbg.__wbg_getProgramParameter_10c8a43809fb8c2e = function (e, n, _) {
						return u(f(e).getProgramParameter(f(n), _ >>> 0));
					}),
					(n.wbg.__wbg_getShaderInfoLog_0262cb299092ce92 = function (e, n, _) {
						const t = f(n).getShaderInfoLog(f(_));
						var r = m(t) ? 0 : l(t, b.__wbindgen_malloc, b.__wbindgen_realloc),
							c = o;
						(y()[e / 4 + 1] = c), (y()[e / 4 + 0] = r);
					}),
					(n.wbg.__wbg_getShaderParameter_60b69083e8d662ce = function (e, n, _) {
						return u(f(e).getShaderParameter(f(n), _ >>> 0));
					}),
					(n.wbg.__wbg_getUniformLocation_6eedfb513ccce732 = function (e, n, _, t) {
						const r = f(e).getUniformLocation(f(n), x(_, t));
						return m(r) ? 0 : u(r);
					}),
					(n.wbg.__wbg_linkProgram_af5fed9dc3f1cdf9 = function (e, n) {
						f(e).linkProgram(f(n));
					}),
					(n.wbg.__wbg_pixelStorei_054e50b5fdc17824 = function (e, n, _) {
						f(e).pixelStorei(n >>> 0, _);
					}),
					(n.wbg.__wbg_polygonOffset_2927e355350d4327 = function (e, n, _) {
						f(e).polygonOffset(n, _);
					}),
					(n.wbg.__wbg_renderbufferStorage_f41b3c99f6a8f25e = function (e, n, _, t, r) {
						f(e).renderbufferStorage(n >>> 0, _ >>> 0, t, r);
					}),
					(n.wbg.__wbg_scissor_75ba2245d4db0eaf = function (e, n, _, t, r) {
						f(e).scissor(n, _, t, r);
					}),
					(n.wbg.__wbg_shaderSource_7891a1fcb69a0023 = function (e, n, _, t) {
						f(e).shaderSource(f(n), x(_, t));
					}),
					(n.wbg.__wbg_stencilFunc_9980bd97f7a51bcc = function (e, n, _, t) {
						f(e).stencilFunc(n >>> 0, _, t >>> 0);
					}),
					(n.wbg.__wbg_stencilFuncSeparate_a3699f92e69c1494 = function (e, n, _, t, r) {
						f(e).stencilFuncSeparate(n >>> 0, _ >>> 0, t, r >>> 0);
					}),
					(n.wbg.__wbg_stencilMask_c5ad44ea27c5f169 = function (e, n) {
						f(e).stencilMask(n >>> 0);
					}),
					(n.wbg.__wbg_stencilMaskSeparate_a7830b1e1eabf5bd = function (e, n, _) {
						f(e).stencilMaskSeparate(n >>> 0, _ >>> 0);
					}),
					(n.wbg.__wbg_stencilOp_f851ac834ef05b40 = function (e, n, _, t) {
						f(e).stencilOp(n >>> 0, _ >>> 0, t >>> 0);
					}),
					(n.wbg.__wbg_stencilOpSeparate_321604240216c55c = function (e, n, _, t, r) {
						f(e).stencilOpSeparate(n >>> 0, _ >>> 0, t >>> 0, r >>> 0);
					}),
					(n.wbg.__wbg_texParameteri_d1035ed45d6c5655 = function (e, n, _, t) {
						f(e).texParameteri(n >>> 0, _ >>> 0, t);
					}),
					(n.wbg.__wbg_uniform1f_8914cb45b3ad5887 = function (e, n, _) {
						f(e).uniform1f(f(n), _);
					}),
					(n.wbg.__wbg_uniform1i_badd5ff70c0d30bf = function (e, n, _) {
						f(e).uniform1i(f(n), _);
					}),
					(n.wbg.__wbg_uniform4f_fb56c7f4de64dd4c = function (e, n, _, t, r, b) {
						f(e).uniform4f(f(n), _, t, r, b);
					}),
					(n.wbg.__wbg_useProgram_c637e43f9cd4c07a = function (e, n) {
						f(e).useProgram(f(n));
					}),
					(n.wbg.__wbg_vertexAttribPointer_c25e4c5ed17f8a1d = function (e, n, _, t, r, b, c) {
						f(e).vertexAttribPointer(n >>> 0, _, t >>> 0, 0 !== r, b, c);
					}),
					(n.wbg.__wbg_viewport_221ade2aef6032c8 = function (e, n, _, t, r) {
						f(e).viewport(n, _, t, r);
					}),
					(n.wbg.__wbg_getSupportedProfiles_904a0392ad42295b = function (e) {
						const n = f(e).getSupportedProfiles();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_drawBuffersWEBGL_4c663e042e093892 = function (e, n) {
						f(e).drawBuffersWEBGL(f(n));
					}),
					(n.wbg.__wbg_newwithu8arraysequence_9d62f79f4425e877 = function () {
						return M(function (e) {
							return u(new Blob(f(e)));
						}, arguments);
					}),
					(n.wbg.__wbg_newwithbuffersourcesequenceandoptions_2f418b8a5c38beae = function () {
						return M(function (e, n) {
							return u(new Blob(f(e), f(n)));
						}, arguments);
					}),
					(n.wbg.__wbg_newwithu8arraysequenceandoptions_366f462e1b363808 = function () {
						return M(function (e, n) {
							return u(new Blob(f(e), f(n)));
						}, arguments);
					}),
					(n.wbg.__wbg_setTransform_be6b3b0d175ff4eb = function (e, n) {
						f(e).setTransform(f(n));
					}),
					(n.wbg.__wbg_name_f35eb93a73d94973 = function (e, n) {
						const _ = l(f(n).name, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_lastModified_e774a1d2d0384c3b = function (e) {
						return f(e).lastModified;
					}),
					(n.wbg.__wbg_instanceof_HtmlCanvasElement_46bdbf323b0b18d1 = function (e) {
						let n;
						try {
							n = f(e) instanceof HTMLCanvasElement;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_width_aee8b8809b033b05 = function (e) {
						return f(e).width;
					}),
					(n.wbg.__wbg_setwidth_080107476e633963 = function (e, n) {
						f(e).width = n >>> 0;
					}),
					(n.wbg.__wbg_height_80053d3c71b338e0 = function (e) {
						return f(e).height;
					}),
					(n.wbg.__wbg_setheight_dc240617639f1f51 = function (e, n) {
						f(e).height = n >>> 0;
					}),
					(n.wbg.__wbg_getContext_df50fa48a8876636 = function () {
						return M(function (e, n, _) {
							const t = f(e).getContext(x(n, _));
							return m(t) ? 0 : u(t);
						}, arguments);
					}),
					(n.wbg.__wbg_getContext_fec464290556673c = function () {
						return M(function (e, n, _, t) {
							const r = f(e).getContext(x(n, _), f(t));
							return m(r) ? 0 : u(r);
						}, arguments);
					}),
					(n.wbg.__wbg_ctrlKey_bb5b6fef87339703 = function (e) {
						return f(e).ctrlKey;
					}),
					(n.wbg.__wbg_shiftKey_5911baf439ab232b = function (e) {
						return f(e).shiftKey;
					}),
					(n.wbg.__wbg_metaKey_6bf4ae4e83a11278 = function (e) {
						return f(e).metaKey;
					}),
					(n.wbg.__wbg_key_dccf9e8aa1315a8e = function (e, n) {
						const _ = l(f(n).key, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_code_3b0c3912a2351163 = function (e, n) {
						const _ = l(f(n).code, b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbg_data_3ce7c145ca4fbcdc = function (e) {
						return u(f(e).data);
					}),
					(n.wbg.__wbg_width_6aa39fc77f088914 = function (e) {
						return f(e).width;
					}),
					(n.wbg.__wbg_setwidth_83d936c4b04dcbec = function (e, n) {
						f(e).width = n >>> 0;
					}),
					(n.wbg.__wbg_height_05a87854adf24d83 = function (e) {
						return f(e).height;
					}),
					(n.wbg.__wbg_setheight_6025ba0d58e6cc8c = function (e, n) {
						f(e).height = n >>> 0;
					}),
					(n.wbg.__wbg_getContext_c102f659d540d068 = function () {
						return M(function (e, n, _) {
							const t = f(e).getContext(x(n, _));
							return m(t) ? 0 : u(t);
						}, arguments);
					}),
					(n.wbg.__wbg_getContext_c9fc178d1fa6f8fe = function () {
						return M(function (e, n, _, t) {
							const r = f(e).getContext(x(n, _), f(t));
							return m(r) ? 0 : u(r);
						}, arguments);
					}),
					(n.wbg.__wbg_byobRequest_72fca99f9c32c193 = function (e) {
						const n = f(e).byobRequest;
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_close_184931724d961ccc = function () {
						return M(function (e) {
							f(e).close();
						}, arguments);
					}),
					(n.wbg.__wbg_view_7f0ce470793a340f = function (e) {
						const n = f(e).view;
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_respond_b1a43b2e3a06d525 = function () {
						return M(function (e, n) {
							f(e).respond(n >>> 0);
						}, arguments);
					}),
					(n.wbg.__wbg_addColorStop_9269a253957ed919 = function () {
						return M(function (e, n, _, t) {
							f(e).addColorStop(n, x(_, t));
						}, arguments);
					}),
					(n.wbg.__wbg_a_ae07e15d70011ff4 = function (e) {
						return f(e).a;
					}),
					(n.wbg.__wbg_seta_1b8e789b7e959570 = function (e, n) {
						f(e).a = n;
					}),
					(n.wbg.__wbg_b_2a5a1e5466f8ec20 = function (e) {
						return f(e).b;
					}),
					(n.wbg.__wbg_c_e5c4523680ed9b14 = function (e) {
						return f(e).c;
					}),
					(n.wbg.__wbg_d_71d292584fb21901 = function (e) {
						return f(e).d;
					}),
					(n.wbg.__wbg_setd_24937ff575ff586d = function (e, n) {
						f(e).d = n;
					}),
					(n.wbg.__wbg_e_0508dddc79383d06 = function (e) {
						return f(e).e;
					}),
					(n.wbg.__wbg_f_39f55a15c93b60f8 = function (e) {
						return f(e).f;
					}),
					(n.wbg.__wbg_new_da7bca45fac67ab7 = function () {
						return M(function () {
							return u(new DOMMatrix());
						}, arguments);
					}),
					(n.wbg.__wbg_newwitharray64_a2724c33a31a299f = function () {
						return M(function (e, n) {
							var _, t;
							return u(new DOMMatrix(((_ = e), (t = n), (_ >>>= 0), v().subarray(_ / 8, _ / 8 + t))));
						}, arguments);
					}),
					(n.wbg.__wbg_result_77ceeec1e3a16df7 = function () {
						return M(function (e) {
							return u(f(e).result);
						}, arguments);
					}),
					(n.wbg.__wbg_setonload_0af77109dbfaa065 = function (e, n) {
						f(e).onload = f(n);
					}),
					(n.wbg.__wbg_new_c1e4a76f0b5c28b8 = function () {
						return M(function () {
							return u(new FileReader());
						}, arguments);
					}),
					(n.wbg.__wbg_readAsArrayBuffer_4f4ed73c7dc0ce42 = function () {
						return M(function (e, n) {
							f(e).readAsArrayBuffer(f(n));
						}, arguments);
					}),
					(n.wbg.__wbg_close_a994f9425dab445c = function () {
						return M(function (e) {
							f(e).close();
						}, arguments);
					}),
					(n.wbg.__wbg_enqueue_ea194723156c0cc2 = function () {
						return M(function (e, n) {
							f(e).enqueue(f(n));
						}, arguments);
					}),
					(n.wbg.__wbg_readyState_1c157e4ea17c134a = function (e) {
						return f(e).readyState;
					}),
					(n.wbg.__wbg_setbinaryType_b0cf5103cd561959 = function (e, n) {
						f(e).binaryType = i(n);
					}),
					(n.wbg.__wbg_new_6c74223c77cfabad = function () {
						return M(function (e, n) {
							return u(new WebSocket(x(e, n)));
						}, arguments);
					}),
					(n.wbg.__wbg_close_acd9532ff5c093ea = function () {
						return M(function (e) {
							f(e).close();
						}, arguments);
					}),
					(n.wbg.__wbg_close_60cd40b788995cd7 = function () {
						return M(function (e, n) {
							f(e).close(n);
						}, arguments);
					}),
					(n.wbg.__wbg_close_52033153a6a5ad44 = function () {
						return M(function (e, n, _, t) {
							f(e).close(n, x(_, t));
						}, arguments);
					}),
					(n.wbg.__wbg_send_70603dff16b81b66 = function () {
						return M(function (e, n, _) {
							f(e).send(x(n, _));
						}, arguments);
					}),
					(n.wbg.__wbg_send_5fcd7bab9777194e = function () {
						return M(function (e, n, _) {
							f(e).send(U(n, _));
						}, arguments);
					}),
					(n.wbg.__wbg_destination_0014df38da590ed6 = function (e) {
						return u(f(e).destination);
					}),
					(n.wbg.__wbg_sampleRate_cdf1236f1a6eed86 = function (e) {
						return f(e).sampleRate;
					}),
					(n.wbg.__wbg_currentTime_9bc85e1579050a3f = function (e) {
						return f(e).currentTime;
					}),
					(n.wbg.__wbg_new_2f044fe84595e924 = function () {
						return M(function () {
							return u(new r());
						}, arguments);
					}),
					(n.wbg.__wbg_close_72f0f505a65b831b = function () {
						return M(function (e) {
							return u(f(e).close());
						}, arguments);
					}),
					(n.wbg.__wbg_suspend_b65437c60ec02e40 = function () {
						return M(function (e) {
							return u(f(e).suspend());
						}, arguments);
					}),
					(n.wbg.__wbg_createBuffer_2db05bc15a2e2745 = function () {
						return M(function (e, n, _, t) {
							return u(f(e).createBuffer(n >>> 0, _ >>> 0, t));
						}, arguments);
					}),
					(n.wbg.__wbg_createBufferSource_0d65cd58ccd38511 = function () {
						return M(function (e) {
							return u(f(e).createBufferSource());
						}, arguments);
					}),
					(n.wbg.__wbg_resume_cda1a6cb84e7cf47 = function () {
						return M(function (e) {
							return u(f(e).resume());
						}, arguments);
					}),
					(n.wbg.__wbg_instanceof_CanvasRenderingContext2d_20bf99ccc051643b = function (e) {
						let n;
						try {
							n = f(e) instanceof CanvasRenderingContext2D;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_setglobalAlpha_d73578e4c446b8b4 = function (e, n) {
						f(e).globalAlpha = n;
					}),
					(n.wbg.__wbg_setglobalCompositeOperation_f235ea3f166f1172 = function () {
						return M(function (e, n, _) {
							f(e).globalCompositeOperation = x(n, _);
						}, arguments);
					}),
					(n.wbg.__wbg_setstrokeStyle_c79ba6bc36a7f302 = function (e, n) {
						f(e).strokeStyle = f(n);
					}),
					(n.wbg.__wbg_setfillStyle_4de94b275f5761f2 = function (e, n) {
						f(e).fillStyle = f(n);
					}),
					(n.wbg.__wbg_setfilter_f0f66caa5d2dc498 = function (e, n, _) {
						f(e).filter = x(n, _);
					}),
					(n.wbg.__wbg_setimageSmoothingEnabled_a844cce2d0dec741 = function (e, n) {
						f(e).imageSmoothingEnabled = 0 !== n;
					}),
					(n.wbg.__wbg_setlineWidth_ea4c8cb72d8cdc31 = function (e, n) {
						f(e).lineWidth = n;
					}),
					(n.wbg.__wbg_setlineCap_561c8efd4e48949c = function (e, n, _) {
						f(e).lineCap = x(n, _);
					}),
					(n.wbg.__wbg_setlineJoin_c2f314b5744d240f = function (e, n, _) {
						f(e).lineJoin = x(n, _);
					}),
					(n.wbg.__wbg_setmiterLimit_d1ca0274cb45b371 = function (e, n) {
						f(e).miterLimit = n;
					}),
					(n.wbg.__wbg_drawImage_26ad546f3bb64a22 = function () {
						return M(function (e, n, _, t) {
							f(e).drawImage(f(n), _, t);
						}, arguments);
					}),
					(n.wbg.__wbg_clip_8aea785aa9d13fb9 = function (e, n, _) {
						f(e).clip(f(n), i(_));
					}),
					(n.wbg.__wbg_fill_9ea24dede17d0003 = function (e, n, _) {
						f(e).fill(f(n), i(_));
					}),
					(n.wbg.__wbg_stroke_98acc75a72e3ec2a = function (e, n) {
						f(e).stroke(f(n));
					}),
					(n.wbg.__wbg_createLinearGradient_c6e8705fffba9558 = function (e, n, _, t, r) {
						return u(f(e).createLinearGradient(n, _, t, r));
					}),
					(n.wbg.__wbg_createPattern_f88dd375094c94dc = function () {
						return M(function (e, n, _, t) {
							const r = f(e).createPattern(f(n), x(_, t));
							return m(r) ? 0 : u(r);
						}, arguments);
					}),
					(n.wbg.__wbg_createRadialGradient_72dd3cd4393b5c5d = function () {
						return M(function (e, n, _, t, r, b, c) {
							return u(f(e).createRadialGradient(n, _, t, r, b, c));
						}, arguments);
					}),
					(n.wbg.__wbg_putImageData_044c08ad889366e1 = function () {
						return M(function (e, n, _, t) {
							f(e).putImageData(f(n), _, t);
						}, arguments);
					}),
					(n.wbg.__wbg_clearRect_05de681275dda635 = function (e, n, _, t, r) {
						f(e).clearRect(n, _, t, r);
					}),
					(n.wbg.__wbg_fillRect_b5c8166281bac9df = function (e, n, _, t, r) {
						f(e).fillRect(n, _, t, r);
					}),
					(n.wbg.__wbg_restore_b0b630dcf5875c16 = function (e) {
						f(e).restore();
					}),
					(n.wbg.__wbg_save_b2ec4f4afd250d50 = function (e) {
						f(e).save();
					}),
					(n.wbg.__wbg_resetTransform_69a6c2187d17b61f = function () {
						return M(function (e) {
							f(e).resetTransform();
						}, arguments);
					}),
					(n.wbg.__wbg_setTransform_73631293eb78bf95 = function () {
						return M(function (e, n, _, t, r, b, c) {
							f(e).setTransform(n, _, t, r, b, c);
						}, arguments);
					}),
					(n.wbg.__wbg_transform_6d8ac1b7078a98cf = function () {
						return M(function (e, n, _, t, r, b, c) {
							f(e).transform(n, _, t, r, b, c);
						}, arguments);
					}),
					(n.wbg.__wbg_get_0ebaad3318b38f2a = function () {
						return M(function (e, n, _, t) {
							const r = f(n).get(x(_, t));
							var c = m(r) ? 0 : l(r, b.__wbindgen_malloc, b.__wbindgen_realloc),
								a = o;
							(y()[e / 4 + 1] = a), (y()[e / 4 + 0] = c);
						}, arguments);
					}),
					(n.wbg.__wbg_set_cb0e7a5c2dd66afd = function () {
						return M(function (e, n, _, t, r) {
							f(e).set(x(n, _), x(t, r));
						}, arguments);
					}),
					(n.wbg.__wbg_instanceof_HtmlDocument_99148bb8629488f7 = function (e) {
						let n;
						try {
							n = f(e) instanceof HTMLDocument;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_execCommand_c57046ee133b2517 = function () {
						return M(function (e, n, _) {
							return f(e).execCommand(x(n, _));
						}, arguments);
					}),
					(n.wbg.__wbg_width_0e2f1c393242f16e = function (e) {
						return f(e).width;
					}),
					(n.wbg.__wbg_height_d6c8a3041eff461a = function (e) {
						return f(e).height;
					}),
					(n.wbg.__wbg_new_3ae8baa6e8d1d865 = function () {
						return M(function () {
							return u(new Path2D());
						}, arguments);
					}),
					(n.wbg.__wbg_addPath_3171f2b2266decc6 = function (e, n, _) {
						f(e).addPath(f(n), f(_));
					}),
					(n.wbg.__wbg_bezierCurveTo_5b4fce1e47fa53c3 = function (e, n, _, t, r, b, c) {
						f(e).bezierCurveTo(n, _, t, r, b, c);
					}),
					(n.wbg.__wbg_closePath_2d71ac65b1c70157 = function (e) {
						f(e).closePath();
					}),
					(n.wbg.__wbg_lineTo_af53288a87b10303 = function (e, n, _) {
						f(e).lineTo(n, _);
					}),
					(n.wbg.__wbg_moveTo_1d88044fab6765bd = function (e, n, _) {
						f(e).moveTo(n, _);
					}),
					(n.wbg.__wbg_quadraticCurveTo_6d88d10b5bd739c2 = function (e, n, _, t, r) {
						f(e).quadraticCurveTo(n, _, t, r);
					}),
					(n.wbg.__wbg_rect_e23a507cac338b5a = function (e, n, _, t, r) {
						f(e).rect(n, _, t, r);
					}),
					(n.wbg.__wbg_read_e7d0f8a49be01d86 = function (e) {
						return u(f(e).read());
					}),
					(n.wbg.__wbg_releaseLock_5c49db976c08b864 = function (e) {
						f(e).releaseLock();
					}),
					(n.wbg.__wbg_length_575d760485311fb8 = function (e) {
						return f(e).length;
					}),
					(n.wbg.__wbg_inverse_6c1f512d68a4d217 = function (e) {
						return u(f(e).inverse());
					}),
					(n.wbg.__wbg_currentTarget_43dc1faf7b3e3402 = function (e) {
						const n = f(e).currentTarget;
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_preventDefault_b1a4aafc79409429 = function (e) {
						f(e).preventDefault();
					}),
					(n.wbg.__wbg_addEventListener_53b787075bd5e003 = function () {
						return M(function (e, n, _, t) {
							f(e).addEventListener(x(n, _), f(t));
						}, arguments);
					}),
					(n.wbg.__wbg_addEventListener_4283b15b4f039eb5 = function () {
						return M(function (e, n, _, t, r) {
							f(e).addEventListener(x(n, _), f(t), f(r));
						}, arguments);
					}),
					(n.wbg.__wbg_dispatchEvent_63c0c01600a98fd2 = function () {
						return M(function (e, n) {
							return f(e).dispatchEvent(f(n));
						}, arguments);
					}),
					(n.wbg.__wbg_removeEventListener_92cb9b3943463338 = function () {
						return M(function (e, n, _, t) {
							f(e).removeEventListener(x(n, _), f(t));
						}, arguments);
					}),
					(n.wbg.__wbg_removeEventListener_5d31483804421bfa = function () {
						return M(function (e, n, _, t, r) {
							f(e).removeEventListener(x(n, _), f(t), 0 !== r);
						}, arguments);
					}),
					(n.wbg.__wbg_length_4db38705d5c8ba2f = function (e) {
						return f(e).length;
					}),
					(n.wbg.__wbg_get_58f6d5f6aee3f846 = function (e, n) {
						const _ = f(e)[n >>> 0];
						return m(_) ? 0 : u(_);
					}),
					(n.wbg.__wbg_instanceof_HtmlAnchorElement_5fc0eb2fbc8672d8 = function (e) {
						let n;
						try {
							n = f(e) instanceof HTMLAnchorElement;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_setdownload_65ac7e7c800d764e = function (e, n, _) {
						f(e).download = x(n, _);
					}),
					(n.wbg.__wbg_sethref_b0712139dd35e2fd = function (e, n, _) {
						f(e).href = x(n, _);
					}),
					(n.wbg.__wbg_offsetX_1a40c03298c0d8b6 = function (e) {
						return f(e).offsetX;
					}),
					(n.wbg.__wbg_offsetY_f75e8c25b9d9b679 = function (e) {
						return f(e).offsetY;
					}),
					(n.wbg.__wbg_button_367cdc7303e3cf9b = function (e) {
						return f(e).button;
					}),
					(n.wbg.__wbg_drawArraysInstancedANGLE_6afae595a484db93 = function (e, n, _, t, r) {
						f(e).drawArraysInstancedANGLE(n >>> 0, _, t, r);
					}),
					(n.wbg.__wbg_drawElementsInstancedANGLE_f175a178d553357e = function (e, n, _, t, r, b) {
						f(e).drawElementsInstancedANGLE(n >>> 0, _, t >>> 0, r, b);
					}),
					(n.wbg.__wbg_vertexAttribDivisorANGLE_b258d7388e466921 = function (e, n, _) {
						f(e).vertexAttribDivisorANGLE(n >>> 0, _ >>> 0);
					}),
					(n.wbg.__wbg_getData_35c5974f5cd7e02c = function () {
						return M(function (e, n, _, t) {
							const r = l(f(n).getData(x(_, t)), b.__wbindgen_malloc, b.__wbindgen_realloc),
								c = o;
							(y()[e / 4 + 1] = c), (y()[e / 4 + 0] = r);
						}, arguments);
					}),
					(n.wbg.__wbg_instanceof_HtmlInputElement_307512fe1252c849 = function (e) {
						let n;
						try {
							n = f(e) instanceof HTMLInputElement;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_setaccept_e9aecafb8dbc1efa = function (e, n, _) {
						f(e).accept = x(n, _);
					}),
					(n.wbg.__wbg_files_8b6e6eff43af0f6d = function (e) {
						const n = f(e).files;
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_setmultiple_df7c9f1022e04575 = function (e, n) {
						f(e).multiple = 0 !== n;
					}),
					(n.wbg.__wbg_setname_a923ceb29d249376 = function (e, n, _) {
						f(e).name = x(n, _);
					}),
					(n.wbg.__wbg_settype_12715bd23e119883 = function (e, n, _) {
						f(e).type = x(n, _);
					}),
					(n.wbg.__wbg_setvalue_78cb4f1fef58ae98 = function (e, n, _) {
						f(e).value = x(n, _);
					}),
					(n.wbg.__wbg_videoWidth_f0b751704b53672c = function (e) {
						return f(e).videoWidth;
					}),
					(n.wbg.__wbg_videoHeight_e75550285bbbfdab = function (e) {
						return f(e).videoHeight;
					}),
					(n.wbg.__wbg_bindVertexArrayOES_abe2fd389c6a2f56 = function (e, n) {
						f(e).bindVertexArrayOES(f(n));
					}),
					(n.wbg.__wbg_createVertexArrayOES_886be8a08db32ce6 = function (e) {
						const n = f(e).createVertexArrayOES();
						return m(n) ? 0 : u(n);
					}),
					(n.wbg.__wbg_deleteVertexArrayOES_153f352862874f30 = function (e, n) {
						f(e).deleteVertexArrayOES(f(n));
					}),
					(n.wbg.__wbg_get_bd8e338fbd5f5cc8 = function (e, n) {
						return u(f(e)[n >>> 0]);
					}),
					(n.wbg.__wbg_length_cd7af8117672b8b8 = function (e) {
						return f(e).length;
					}),
					(n.wbg.__wbg_new_16b304a2cfa7ff4a = function () {
						return u(new Array());
					}),
					(n.wbg.__wbg_newnoargs_e258087cd0daa0ea = function (e, n) {
						return u(new Function(x(e, n)));
					}),
					(n.wbg.__wbg_next_196c84450b364254 = function () {
						return M(function (e) {
							return u(f(e).next());
						}, arguments);
					}),
					(n.wbg.__wbg_done_298b57d23c0fc80c = function (e) {
						return f(e).done;
					}),
					(n.wbg.__wbg_value_d93c65011f51a456 = function (e) {
						return u(f(e).value);
					}),
					(n.wbg.__wbg_get_e3c254076557e348 = function () {
						return M(function (e, n) {
							return u(Reflect.get(f(e), f(n)));
						}, arguments);
					}),
					(n.wbg.__wbg_call_27c0f87801dedf93 = function () {
						return M(function (e, n) {
							return u(f(e).call(f(n)));
						}, arguments);
					}),
					(n.wbg.__wbg_new_72fb9a18b5ae2624 = function () {
						return u(new Object());
					}),
					(n.wbg.__wbg_self_ce0dbfc45cf2f5be = function () {
						return M(function () {
							return u(self.self);
						}, arguments);
					}),
					(n.wbg.__wbg_window_c6fb939a7f436783 = function () {
						return M(function () {
							return u(window.window);
						}, arguments);
					}),
					(n.wbg.__wbg_globalThis_d1e6af4856ba331b = function () {
						return M(function () {
							return u(globalThis.globalThis);
						}, arguments);
					}),
					(n.wbg.__wbg_global_207b558942527489 = function () {
						return M(function () {
							return u(_.g.global);
						}, arguments);
					}),
					(n.wbg.__wbg_set_d4638f722068f043 = function (e, n, _) {
						f(e)[n >>> 0] = i(_);
					}),
					(n.wbg.__wbg_includes_310a37f41280ae42 = function (e, n, _) {
						return f(e).includes(f(n), _);
					}),
					(n.wbg.__wbg_isArray_2ab64d95e09ea0ae = function (e) {
						return Array.isArray(f(e));
					}),
					(n.wbg.__wbg_of_4a2b313a453ec059 = function (e) {
						return u(Array.of(f(e)));
					}),
					(n.wbg.__wbg_of_647f9238b4d5407a = function (e, n) {
						return u(Array.of(f(e), f(n)));
					}),
					(n.wbg.__wbg_push_a5b05aedc7234f9f = function (e, n) {
						return f(e).push(f(n));
					}),
					(n.wbg.__wbg_instanceof_ArrayBuffer_836825be07d4c9d2 = function (e) {
						let n;
						try {
							n = f(e) instanceof ArrayBuffer;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_values_839f3396d5aac002 = function (e) {
						return u(f(e).values());
					}),
					(n.wbg.__wbg_instanceof_Error_e20bb56fd5591a93 = function (e) {
						let n;
						try {
							n = f(e) instanceof Error;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_new_28c511d9baebfa89 = function (e, n) {
						return u(new Error(x(e, n)));
					}),
					(n.wbg.__wbg_message_5bf28016c2b49cfb = function (e) {
						return u(f(e).message);
					}),
					(n.wbg.__wbg_name_e7429f0dda6079e2 = function (e) {
						return u(f(e).name);
					}),
					(n.wbg.__wbg_toString_ffe4c9ea3b3532e9 = function (e) {
						return u(f(e).toString());
					}),
					(n.wbg.__wbg_call_b3ca7c6051f9bec1 = function () {
						return M(function (e, n, _) {
							return u(f(e).call(f(n), f(_)));
						}, arguments);
					}),
					(n.wbg.__wbg_getTime_2bc4375165f02d15 = function (e) {
						return f(e).getTime();
					}),
					(n.wbg.__wbg_getTimezoneOffset_38257122e236c190 = function (e) {
						return f(e).getTimezoneOffset();
					}),
					(n.wbg.__wbg_new_cf3ec55744a78578 = function (e) {
						return u(new Date(f(e)));
					}),
					(n.wbg.__wbg_new0_7d84e5b2cd9fdc73 = function () {
						return u(new Date());
					}),
					(n.wbg.__wbg_instanceof_Object_71ca3c0a59266746 = function (e) {
						let n;
						try {
							n = f(e) instanceof Object;
						} catch (e) {
							n = !1;
						}
						return n;
					}),
					(n.wbg.__wbg_entries_95cc2c823b285a09 = function (e) {
						return u(Object.entries(f(e)));
					}),
					(n.wbg.__wbg_fromEntries_c9d8ec8925e677a8 = function () {
						return M(function (e) {
							return u(Object.fromEntries(f(e)));
						}, arguments);
					}),
					(n.wbg.__wbg_is_010fdc0f4ab96916 = function (e, n) {
						return Object.is(f(e), f(n));
					}),
					(n.wbg.__wbg_valueOf_a0b7c836f68a054b = function (e) {
						return u(f(e).valueOf());
					}),
					(n.wbg.__wbg_new_81740750da40724f = function (e, n) {
						try {
							var _ = { a: e, b: n };
							const t = new Promise((e, n) => {
								const t = _.a;
								_.a = 0;
								try {
									return (function (e, n, _, t) {
										b.wasm_bindgen__convert__closures__invoke2_mut__h07d07bb823c8def9(e, n, u(_), u(t));
									})(t, _.b, e, n);
								} finally {
									_.a = t;
								}
							});
							return u(t);
						} finally {
							_.a = _.b = 0;
						}
					}),
					(n.wbg.__wbg_resolve_b0083a7967828ec8 = function (e) {
						return u(Promise.resolve(f(e)));
					}),
					(n.wbg.__wbg_then_0c86a60e8fcfe9f6 = function (e, n) {
						return u(f(e).then(f(n)));
					}),
					(n.wbg.__wbg_then_a73caa9a87991566 = function (e, n, _) {
						return u(f(e).then(f(n), f(_)));
					}),
					(n.wbg.__wbg_buffer_12d079cc21e14bdb = function (e) {
						return u(f(e).buffer);
					}),
					(n.wbg.__wbg_newwithbyteoffsetandlength_41559f654c4e743c = function (e, n, _) {
						return u(new Int8Array(f(e), n >>> 0, _ >>> 0));
					}),
					(n.wbg.__wbg_newwithbyteoffsetandlength_4bea9f904a7e0aef = function (e, n, _) {
						return u(new Int16Array(f(e), n >>> 0, _ >>> 0));
					}),
					(n.wbg.__wbg_newwithbyteoffsetandlength_425360430a1c8206 = function (e, n, _) {
						return u(new Int32Array(f(e), n >>> 0, _ >>> 0));
					}),
					(n.wbg.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb = function (e, n, _) {
						return u(new Uint8Array(f(e), n >>> 0, _ >>> 0));
					}),
					(n.wbg.__wbg_new_63b92bc8671ed464 = function (e) {
						return u(new Uint8Array(f(e)));
					}),
					(n.wbg.__wbg_set_a47bac70306a19a7 = function (e, n, _) {
						f(e).set(f(n), _ >>> 0);
					}),
					(n.wbg.__wbg_length_c20a40f15020d68a = function (e) {
						return f(e).length;
					}),
					(n.wbg.__wbg_newwithbyteoffsetandlength_9fd64654bc0b0817 = function (e, n, _) {
						return u(new Uint16Array(f(e), n >>> 0, _ >>> 0));
					}),
					(n.wbg.__wbg_newwithbyteoffsetandlength_3125852e5a7fbcff = function (e, n, _) {
						return u(new Uint32Array(f(e), n >>> 0, _ >>> 0));
					}),
					(n.wbg.__wbg_newwithbyteoffsetandlength_4a659d079a1650e0 = function (e, n, _) {
						return u(new Float32Array(f(e), n >>> 0, _ >>> 0));
					}),
					(n.wbg.__wbg_newwithlength_e9b4878cebadb3d3 = function (e) {
						return u(new Uint8Array(e >>> 0));
					}),
					(n.wbg.__wbg_buffer_dd7f74bc60f1faab = function (e) {
						return u(f(e).buffer);
					}),
					(n.wbg.__wbg_subarray_a1f73cd4b5b42fe1 = function (e, n, _) {
						return u(f(e).subarray(n >>> 0, _ >>> 0));
					}),
					(n.wbg.__wbg_byteLength_58f7b4fab1919d44 = function (e) {
						return f(e).byteLength;
					}),
					(n.wbg.__wbg_byteOffset_81d60f7392524f62 = function (e) {
						return f(e).byteOffset;
					}),
					(n.wbg.__wbg_has_0af94d20077affa2 = function () {
						return M(function (e, n) {
							return Reflect.has(f(e), f(n));
						}, arguments);
					}),
					(n.wbg.__wbg_ownKeys_658942b7f28d1fe9 = function () {
						return M(function (e) {
							return u(Reflect.ownKeys(f(e)));
						}, arguments);
					}),
					(n.wbg.__wbg_set_1f9b04f170055d33 = function () {
						return M(function (e, n, _) {
							return Reflect.set(f(e), f(n), f(_));
						}, arguments);
					}),
					(n.wbg.__wbindgen_debug_string = function (e, n) {
						const _ = l(A(f(n)), b.__wbindgen_malloc, b.__wbindgen_realloc),
							t = o;
						(y()[e / 4 + 1] = t), (y()[e / 4 + 0] = _);
					}),
					(n.wbg.__wbindgen_throw = function (e, n) {
						throw new Error(x(e, n));
					}),
					(n.wbg.__wbindgen_memory = function () {
						return u(b.memory);
					}),
					(n.wbg.__wbindgen_closure_wrapper1082 = function (e, n, _) {
						return u(P(e, n, 181, I));
					}),
					(n.wbg.__wbindgen_closure_wrapper1083 = function (e, n, _) {
						return u(P(e, n, 181, I));
					}),
					(n.wbg.__wbindgen_closure_wrapper1084 = function (e, n, _) {
						return u(P(e, n, 181, I));
					}),
					(n.wbg.__wbindgen_closure_wrapper1085 = function (e, n, _) {
						return u(P(e, n, 181, T));
					}),
					(n.wbg.__wbindgen_closure_wrapper1086 = function (e, n, _) {
						return u(P(e, n, 181, I));
					}),
					(n.wbg.__wbindgen_closure_wrapper1087 = function (e, n, _) {
						return u(P(e, n, 181, I));
					}),
					(n.wbg.__wbindgen_closure_wrapper1089 = function (e, n, _) {
						return u(P(e, n, 181, D));
					}),
					(n.wbg.__wbindgen_closure_wrapper3008 = function (e, n, _) {
						return u(P(e, n, 1411, k));
					}),
					(n.wbg.__wbindgen_closure_wrapper3186 = function (e, n, _) {
						return u(P(e, n, 1486, C));
					}),
					(n.wbg.__wbindgen_closure_wrapper3188 = function (e, n, _) {
						return u(P(e, n, 1486, R));
					}),
					(n.wbg.__wbindgen_closure_wrapper3190 = function (e, n, _) {
						return u(P(e, n, 1486, R));
					}),
					(n.wbg.__wbindgen_closure_wrapper3192 = function (e, n, _) {
						return u(P(e, n, 1486, R));
					}),
					(n.wbg.__wbindgen_closure_wrapper14422 = function (e, n, _) {
						return u(P(e, n, 6340, F));
					}),
					(n.wbg.__wbindgen_closure_wrapper14424 = function (e, n, _) {
						return u(P(e, n, 6340, F));
					}),
					(n.wbg.__wbindgen_closure_wrapper16882 = function (e, n, _) {
						return u(P(e, n, 7407, E));
					}),
					n
				);
			}
			function fe(e, n) {
				return (b = e.exports), (ie.__wbindgen_wasm_module = n), (q = null), (S = null), (p = null), (L = null), (g = null), (Q = null), b.__wbindgen_start(), b;
			}
			function ae(e) {
				if (void 0 !== b) return b;
				const n = ce();
				e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e));
				return fe(new WebAssembly.Instance(e, n), e);
			}
			async function ie(e) {
				if (void 0 !== b) return b;
				void 0 === e && (e = new URL(_(797), _.b));
				const n = ce();
				('string' == typeof e || ('function' == typeof Request && e instanceof Request) || ('function' == typeof URL && e instanceof URL)) && (e = fetch(e));
				const { instance: t, module: r } = await (async function (e, n) {
					if ('function' == typeof Response && e instanceof Response) {
						if ('function' == typeof WebAssembly.instantiateStreaming)
							try {
								return await WebAssembly.instantiateStreaming(e, n);
							} catch (n) {
								if ('application/wasm' == e.headers.get('Content-Type')) throw n;
								console.warn(
									'`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
									n
								);
							}
						const _ = await e.arrayBuffer();
						return await WebAssembly.instantiate(_, n);
					}
					{
						const _ = await WebAssembly.instantiate(e, n);
						return _ instanceof WebAssembly.Instance ? { instance: _, module: e } : _;
					}
				})(await e, n);
				return fe(t, r);
			}
			const ue = ie;
		},
	},
]);
//# sourceMappingURL=core.ruffle.199108ce0aa8adfdc8f0.js.map

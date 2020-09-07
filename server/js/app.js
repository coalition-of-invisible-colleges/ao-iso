/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ef8afeb2a5e2646794c5";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js?!./app/css/styles.scss":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js??ref--5-2!../node_modules/postcss-loader/src??ref--5-3!../node_modules/sass-loader/dist/cjs.js??ref--5-4!./app/css/styles.scss ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./app/css/styles.scss?../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js??ref--5-2!../node_modules/postcss-loader/src??ref--5-3!../node_modules/sass-loader/dist/cjs.js??ref--5-4");

/***/ }),

/***/ "./app/calculations.ts":
/*!*****************************!*\
  !*** ./app/calculations.ts ***!
  \*****************************/
/*! exports provided: crawlerHash, crawler, shortName, cardColorCSS, blankCard, blankGrid, safeMerge, cadToSats, satsToCad, getMeridienTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module, Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"crawlerHash\", function() { return crawlerHash; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"crawler\", function() { return crawler; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shortName\", function() { return shortName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cardColorCSS\", function() { return cardColorCSS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blankCard\", function() { return blankCard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blankGrid\", function() { return blankGrid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"safeMerge\", function() { return safeMerge; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cadToSats\", function() { return cadToSats; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"satsToCad\", function() { return satsToCad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMeridienTime\", function() { return getMeridienTime; });\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"../node_modules/@babel/runtime/helpers/toConsumableArray.js\");\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"../node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crypto */ \"./app/crypto.tsx\");\n\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\nvar satsPerBtc = 100000000; // one hundred million per btc\n\nfunction crawlerHash(tasks, taskId) {\n  return Object(_crypto__WEBPACK_IMPORTED_MODULE_2__[\"createHash\"])(Buffer.from(crawler(tasks, taskId)));\n}\nfunction crawler(tasks, taskId) {\n  var history = [];\n  tasks.forEach(function (task) {\n    if (task.taskId === taskId) {\n      var _crawler = [taskId];\n\n      var _loop = function _loop() {\n        var newCards = [];\n\n        _crawler.forEach(function (t) {\n          if (history.indexOf(t) >= 0) return;\n          history.push(t);\n          var subTask = tasks.filter(function (pst) {\n            return pst.taskId === t;\n          })[0];\n\n          if (subTask) {\n            newCards = newCards.concat(subTask.subTasks).concat(subTask.priorities).concat(subTask.completed);\n          }\n        });\n\n        _crawler = newCards;\n      };\n\n      do {\n        _loop();\n      } while (_crawler.length > 0);\n    }\n  });\n  return history;\n}\nfunction shortName(name) {\n  var limit = 280;\n  var shortened = name.substring(0, limit);\n\n  if (name.length > limit) {\n    shortened += '…';\n  }\n\n  return shortened;\n}\nfunction cardColorCSS(color) {\n  return {\n    redwx: color == 'red',\n    bluewx: color == 'blue',\n    greenwx: color == 'green',\n    yellowwx: color == 'yellow',\n    purplewx: color == 'purple',\n    blackwx: color == 'black'\n  };\n}\nfunction blankCard(taskId, name, color, created) {\n  var deck = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];\n  var parents = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];\n  var height = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;\n  var width = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : undefined;\n  var newCard = {\n    taskId: taskId,\n    color: color,\n    deck: deck,\n    name: name.trim(),\n    address: '',\n    bolt11: '',\n    book: {},\n    boost: 0,\n    priorities: [],\n    subTasks: [],\n    completed: [],\n    parents: parents,\n    claimed: [],\n    passed: [],\n    guild: false,\n    created: created,\n    lastClaimed: 0,\n    completeValue: 0,\n    payment_hash: '',\n    highlights: [],\n    seen: [],\n    time: [],\n    grid: height >= 1 && width >= 1 ? blankGrid(height, width) : false\n  };\n  return newCard;\n}\nfunction blankGrid() {\n  var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;\n  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;\n  var newGrid = {\n    height: height,\n    width: width,\n    rows: {}\n  };\n  return newGrid;\n}\n\nfunction isString(x) {\n  return Object.prototype.toString.call(x) === '[object String]';\n}\n\nfunction safeMerge(cardA, cardZ) {\n  // grids are not merged yet\n  if (!cardA || !cardZ) {\n    console.log('attempt to merge nonexistent card');\n    return;\n  }\n\n  if (!cardZ.taskId || !isString(cardZ.taskId)) {\n    console.log('attempt to merge card with a missing or invalid taskId');\n    return;\n  }\n\n  if (!cardZ.color) {\n    console.log('attempt to merge card without a color');\n    return;\n  }\n\n  if (isString(cardZ.color) && !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(cardZ.color.trim())) {\n    cardA.color = cardZ.color;\n  }\n\n  if (isString(cardZ.guild) && !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(cardZ.guild.trim())) {\n    cardA.guild = cardZ.guild;\n  }\n\n  var filterNull = function filterNull(tasks) {\n    return tasks.filter(function (task) {\n      return task !== null && task !== undefined;\n    });\n  };\n\n  cardA.book = cardZ.guild;\n  cardA.address = cardZ.guild;\n  cardA.bolt11 = cardZ.guild;\n  cardA.priorities = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set(cardA.priorities.concat(filterNull(cardZ.priorities))));\n  cardA.subTasks = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set(cardA.subTasks.concat(filterNull(cardZ.subTasks))));\n  cardA.completed = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set(cardA.completed.concat(filterNull(cardZ.completed))));\n  cardA.passed = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set(cardA.passed.concat(filterNull(cardZ.passed)))); // XXX only add in merge for now\n  // XXX bolt11 / address need to clearly indicate origin ao\n  // XXX book should be a list?\n}\nfunction cadToSats(cadAmt, spot) {\n  var sats = parseFloat(cadAmt) / parseFloat(spot) * satsPerBtc;\n  return parseInt(sats);\n}\nfunction satsToCad(sats, spot) {\n  var cad = sats * (spot / satsPerBtc);\n  return cad.toFixed(2);\n}\n\nfunction calculateMsThisMonth() {\n  var today = new Date();\n  var daysThisMonth = new Date(today.getYear(), today.getMonth(), 0).getDate();\n  return daysThisMonth * 24 * 60 * 60 * 1000;\n}\n\nfunction getMeridienTime(ts) {\n  var d = new Date(parseInt(ts));\n  var hour24 = d.getHours();\n  var rollover = 0;\n\n  if (hour24 >= 24) {\n    rollover = 1;\n    hour24 %= 24;\n  }\n\n  var hour, meridien;\n\n  if (hour24 > 12) {\n    meridien = 'pm';\n    hour = hour24 - 12;\n  } else {\n    meridien = 'am';\n    hour = hour24;\n  }\n\n  var date = d.getDate() + rollover;\n  var month = d.getMonth() + 1;\n  var minute = d.getMinutes();\n  var year = d.getFullYear();\n  var weekday = d.toString().slice(0, 3);\n  return {\n    weekday: weekday,\n    year: year,\n    month: month,\n    date: date,\n    hour: hour,\n    minute: minute,\n    meridien: meridien\n  };\n}\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(satsPerBtc, \"satsPerBtc\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(crawlerHash, \"crawlerHash\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(crawler, \"crawler\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(shortName, \"shortName\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(cardColorCSS, \"cardColorCSS\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(blankCard, \"blankCard\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(blankGrid, \"blankGrid\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(isString, \"isString\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(safeMerge, \"safeMerge\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(cadToSats, \"cadToSats\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(satsToCad, \"satsToCad\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(calculateMsThisMonth, \"calculateMsThisMonth\", \"/usr/src/app/src/app/calculations.ts\");\n  reactHotLoader.register(getMeridienTime, \"getMeridienTime\", \"/usr/src/app/src/app/calculations.ts\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module), __webpack_require__(/*! ./../../node_modules/buffer/index.js */ \"../node_modules/buffer/index.js\").Buffer))\n\n//# sourceURL=webpack:///./app/calculations.ts?");

/***/ }),

/***/ "./app/card.tsx":
/*!**********************!*\
  !*** ./app/card.tsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AoCard; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"../node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"../node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"../node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"../node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-helmet */ \"../node_modules/react-helmet/es/Helmet.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ \"./app/store.ts\");\n\n\n\n\n\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\nvar RenderCard = /*#__PURE__*/function (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RenderCard, _React$Component);\n\n  var _super = _createSuper(RenderCard);\n\n  function RenderCard(props) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RenderCard);\n\n    return _super.call(this, props);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RenderCard, [{\n    key: \"render\",\n    value: function render() {\n      var aoStore = _store__WEBPACK_IMPORTED_MODULE_7__[\"default\"].store;\n      var taskId = this.props.taskId;\n      var card = aoStore.hashMap.get(taskId);\n      var cardText = '';\n\n      if (card.name === taskId) {\n        cardText = aoStore.memberById.get(taskId).name;\n      } else if (card.guild) {\n        cardText = card.guild;\n      } else {\n        cardText = card.name;\n      }\n\n      if (cardText.length > 12) {\n        cardText = cardText.substring(0, 12) + '…';\n      }\n\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_6__[\"Helmet\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"title\", null, cardText, \" - \", aoStore.state.cash.alias)));\n    }\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return RenderCard;\n}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);\n\nvar AoCard = /*#__PURE__*/function (_React$Component2) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(AoCard, _React$Component2);\n\n  var _super2 = _createSuper(AoCard);\n\n  function AoCard(props) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AoCard);\n\n    _this = _super2.call(this, props);\n    var aoStore = _store__WEBPACK_IMPORTED_MODULE_7__[\"default\"].store;\n    var card = aoStore.hashMap.get(_this.props.match.params.taskId);\n    aoStore.setCurrentCard(_this.props.match.params.taskId);\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AoCard, [{\n    key: \"render\",\n    value: function render() {\n      var aoStore = _store__WEBPACK_IMPORTED_MODULE_7__[\"default\"].store;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(RenderCard, {\n        taskId: aoStore.currentCard\n      });\n    }\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return AoCard;\n}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);\n\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(RenderCard, \"RenderCard\", \"/usr/src/app/src/app/card.tsx\");\n  reactHotLoader.register(AoCard, \"AoCard\", \"/usr/src/app/src/app/card.tsx\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./app/card.tsx?");

/***/ }),

/***/ "./app/crypto.tsx":
/*!************************!*\
  !*** ./app/crypto.tsx ***!
  \************************/
/*! exports provided: createHash, hmacHex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createHash\", function() { return createHash; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hmacHex\", function() { return hmacHex; });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"../node_modules/crypto-browserify/index.js\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\nfunction createHash(payload) {\n  var sha256 = crypto__WEBPACK_IMPORTED_MODULE_0___default.a.createHash('sha256');\n  sha256.update(payload);\n  return sha256.digest('hex');\n}\nfunction hmacHex(data, signingKey) {\n  var hmac = crypto__WEBPACK_IMPORTED_MODULE_0___default.a.createHmac('sha256', signingKey);\n  hmac.update(data);\n  return hmac.digest('hex');\n}\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(createHash, \"createHash\", \"/usr/src/app/src/app/crypto.tsx\");\n  reactHotLoader.register(hmacHex, \"hmacHex\", \"/usr/src/app/src/app/crypto.tsx\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./app/crypto.tsx?");

/***/ }),

/***/ "./app/css/styles.scss":
/*!*****************************!*\
  !*** ./app/css/styles.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var refs = 0;\n    var css = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js??ref--5-2!../../../node_modules/postcss-loader/src??ref--5-3!../../../node_modules/sass-loader/dist/cjs.js??ref--5-4!./styles.scss */ \"../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js?!./app/css/styles.scss\");\n    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/insertCss.js */ \"../node_modules/isomorphic-style-loader/insertCss.js\");\n    var content = typeof css === 'string' ? [[module.i, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if ( true && typeof window !== 'undefined' && window.document) {\n      var removeCss = function() {};\n      module.hot.accept(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js??ref--5-2!../../../node_modules/postcss-loader/src??ref--5-3!../../../node_modules/sass-loader/dist/cjs.js??ref--5-4!./styles.scss */ \"../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js?!./app/css/styles.scss\", function() {\n        css = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js??ref--5-2!../../../node_modules/postcss-loader/src??ref--5-3!../../../node_modules/sass-loader/dist/cjs.js??ref--5-4!./styles.scss */ \"../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js?!./app/css/styles.scss\");\n        content = typeof css === 'string' ? [[module.i, css, '']] : css;\n        removeCss = insertCss(content, { replace: true });\n      });\n      module.hot.dispose(function() { removeCss(); });\n    }\n  \n\n//# sourceURL=webpack:///./app/css/styles.scss?");

/***/ }),

/***/ "./app/index.tsx":
/*!***********************!*\
  !*** ./app/index.tsx ***!
  \***********************/
/*! exports provided: KEY_AUTH_DATA, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KEY_AUTH_DATA\", function() { return KEY_AUTH_DATA; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"../node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"../node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"../node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login */ \"./app/login.tsx\");\n/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hot-loader/root */ \"../node_modules/react-hot-loader/root.js\");\n/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mobx-react */ \"../node_modules/mobx-react/dist/mobxreact.esm.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ \"./app/store.ts\");\n/* harmony import */ var _member__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./member */ \"./app/member.tsx\");\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./card */ \"./app/card.tsx\");\n\n\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\n\n\nvar KEY_AUTH_DATA = 'KEY_AUTH_DATA';\n\nvar ProtectedRoute = function ProtectedRoute(_ref) {\n  var Comp = _ref.component,\n      loggedIn = _ref.loggedIn,\n      path = _ref.path,\n      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, [\"component\", \"loggedIn\", \"path\"]);\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n    path: path\n  }, rest, {\n    render: function render(props) {\n      return loggedIn ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Comp, props) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Redirect\"], {\n        to: \"/login\"\n      });\n    }\n  }));\n};\n\nvar App = Object(mobx_react__WEBPACK_IMPORTED_MODULE_6__[\"observer\"])(__signature__(function () {\n  var aoStore = _store__WEBPACK_IMPORTED_MODULE_7__[\"default\"].store;\n  console.log(\"App state: \", aoStore.state);\n  Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useEffect\"])(function () {\n    return document.body.classList.add('theme-1');\n  });\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Switch\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], {\n    path: \"/login\",\n    component: _login__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ProtectedRoute, {\n    path: \"/task/:taskId\",\n    component: _card__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n    loggedIn: aoStore.state.loggedIn\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ProtectedRoute, {\n    path: \"/\",\n    component: _member__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n    loggedIn: aoStore.state.loggedIn,\n    exact: true\n  }));\n}, \"useEffect{}\"));\n\nvar _default = Object(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_5__[\"hot\"])(App);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(KEY_AUTH_DATA, \"KEY_AUTH_DATA\", \"/usr/src/app/src/app/index.tsx\");\n  reactHotLoader.register(ProtectedRoute, \"ProtectedRoute\", \"/usr/src/app/src/app/index.tsx\");\n  reactHotLoader.register(App, \"App\", \"/usr/src/app/src/app/index.tsx\");\n  reactHotLoader.register(_default, \"default\", \"/usr/src/app/src/app/index.tsx\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./app/index.tsx?");

/***/ }),

/***/ "./app/login.tsx":
/*!***********************!*\
  !*** ./app/login.tsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"../node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"../node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../client/api */ \"./client/api.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ \"./app/store.ts\");\n\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\nvar Login = function Login() {\n  var aoStore = _store__WEBPACK_IMPORTED_MODULE_4__[\"default\"].store;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(''),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),\n      user = _useState2[0],\n      setUser = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(''),\n      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),\n      pass = _useState4[0],\n      setPass = _useState4[1];\n\n  var onClick = function onClick(e) {\n    _client_api__WEBPACK_IMPORTED_MODULE_3__[\"default\"].createSession(user, pass).then(_client_api__WEBPACK_IMPORTED_MODULE_3__[\"default\"].fetchState).then(function (res) {\n      if (!res) {\n        setUser('');\n      }\n    });\n  };\n\n  var onKeyDown = function onKeyDown(e) {\n    if (e.key === 'Enter') {\n      e.preventDefault();\n      onClick(e);\n    }\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"](\"div\", null, !aoStore.state.loggedIn && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"](\"form\", {\n    onSubmit: onKeyDown\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"](\"div\", null, \"Username:\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"](\"input\", {\n    value: user,\n    type: \"text\",\n    onChange: function onChange(e) {\n      return setUser(e.target.value);\n    },\n    onKeyDown: onKeyDown\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"](\"div\", null, \"Password:\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"](\"input\", {\n    value: pass,\n    type: \"password\",\n    onChange: function onChange(e) {\n      return setPass(e.target.value);\n    },\n    onKeyDown: onKeyDown\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"](\"button\", {\n    type: \"button\",\n    onClick: onClick\n  }, \"Login\")), aoStore.state.loggedIn && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Redirect\"], {\n    to: \"/\"\n  }));\n};\n\n__signature__(Login, \"useState{[user, setUser]('')}\\nuseState{[pass, setPass]('')}\");\n\nvar _default = Login;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Login, \"Login\", \"/usr/src/app/src/app/login.tsx\");\n  reactHotLoader.register(_default, \"default\", \"/usr/src/app/src/app/login.tsx\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./app/login.tsx?");

/***/ }),

/***/ "./app/member.tsx":
/*!************************!*\
  !*** ./app/member.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./app/store.ts\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"../node_modules/react-router-dom/esm/react-router-dom.js\");\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\nvar AoMember = function AoMember() {\n  var aoStore = _store__WEBPACK_IMPORTED_MODULE_1__[\"default\"].store;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Redirect\"], {\n    to: '/task/' + aoStore.member.memberId\n  });\n};\n\nvar _default = AoMember;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(AoMember, \"AoMember\", \"/usr/src/app/src/app/member.tsx\");\n  reactHotLoader.register(_default, \"default\", \"/usr/src/app/src/app/member.tsx\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./app/member.tsx?");

/***/ }),

/***/ "./app/mutations.tsx":
/*!***************************!*\
  !*** ./app/mutations.tsx ***!
  \***************************/
/*! exports provided: applyEvent, setCurrent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"applyEvent\", function() { return applyEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setCurrent\", function() { return setCurrent; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"../node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"../node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _calculations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calculations */ \"./app/calculations.ts\");\n\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\nfunction aoMuts(aos, ev) {\n  switch (ev.type) {\n    case 'ao-linked':\n      aos.forEach(function (ao, i) {\n        if (ao.address === ev.address) {\n          ao.links.push(ev.taskId);\n        }\n      });\n      break;\n\n    case 'ao-inbound-connected':\n      var inAddressConnect = aos.some(function (a) {\n        if (a.address === ev.address) {\n          a.inboundSecret = ev.secret;\n          a.lastContact = Date.now();\n          return true;\n        }\n      });\n\n      if (!inAddressConnect) {\n        var newEv = {\n          address: ev.address,\n          outboundSecret: false,\n          inboundSecret: ev.secret,\n          lastContact: Date.now(),\n          links: []\n        };\n        aos.push(newEv);\n      }\n\n      break;\n\n    case 'ao-outbound-connected':\n      var outAddressConnect = aos.some(function (a) {\n        if (a.address === ev.address) {\n          a.outboundSecret = ev.secret;\n          a.lastContact = Date.now();\n          return true;\n        }\n      });\n\n      if (!outAddressConnect) {\n        var _newEv = {\n          address: ev.address,\n          outboundSecret: ev.secret,\n          inboundSecret: false,\n          lastContact: Date.now(),\n          links: []\n        };\n        aos.push(_newEv);\n      }\n\n      break;\n\n    case 'ao-disconnected':\n      aos.forEach(function (ao, i) {\n        if (ao.address === ev.address) {\n          aos.splice(i, 1);\n        }\n      });\n      break;\n  }\n}\n\nfunction cashMuts(cash, ev) {\n  switch (ev.type) {\n    case 'ao-named':\n      cash.alias = ev.alias;\n      break;\n\n    case 'spot-updated':\n      cash.spot = ev.spot;\n      break;\n\n    case 'currency-switched':\n      cash.currency = ev.currency;\n      break;\n\n    case 'rent-set':\n      cash.rent = parseFloat(ev.amount);\n      break;\n\n    case 'cap-set':\n      cash.cap = ev.amount;\n      break;\n\n    case 'funds-set':\n      cash.outputs = ev.outputs;\n      cash.channels = ev.channels;\n      break;\n\n    case 'task-boosted':\n      cash.usedTxIds.push(ev.txid);\n      break;\n\n    case 'task-boosted-lightning':\n      cash.pay_index = ev.pay_index;\n      break;\n\n    case 'get-node-info':\n      cash.info = ev.info;\n      break;\n  }\n}\n\nfunction membersMuts(members, ev) {\n  switch (ev.type) {\n    case 'ao-outbound-connected':\n      break;\n\n    case 'ao-disconnected':\n      break;\n\n    case 'member-created':\n      ev.lastUsed = ev.timestamp;\n      ev.muted = true;\n      members.push(ev);\n      break;\n\n    case 'member-activated':\n      members.forEach(function (member) {\n        if (member.memberId === ev.memberId) {\n          if (member.active < 0) {\n            member.active = -1 * member.active;\n          } else {\n            member.active++;\n          }\n        }\n      });\n      break;\n\n    case 'task-boosted':\n      members.forEach(function (member) {\n        if (member.memberId === ev.taskId) {\n          if (member.active < 0) {\n            member.active = -1 * member.active;\n          } else {\n            member.active++;\n          }\n        }\n      });\n      break;\n\n    case 'task-boosted-lightning':\n      members.forEach(function (member) {\n        if (member.memberId === ev.taskId) {\n          if (member.active < 0) {\n            member.active = -1 * member.active;\n          } else {\n            member.active++;\n          }\n        }\n      });\n      break;\n\n    case 'member-deactivated':\n      members.forEach(function (member) {\n        if (member.memberId === ev.memberId) {\n          if (member.active >= 0) {\n            member.active = -1 * member.active - 1;\n          }\n        }\n      });\n      break;\n\n    case 'member-purged':\n      for (var i = members.length - 1; i >= 0; i--) {\n        var member = members[i];\n\n        if (member.memberId === ev.memberId) {\n          members.splice(i, 1);\n        }\n      }\n\n      break;\n\n    case 'resource-used':\n      members.forEach(function (member) {\n        if (member.memberId === ev.memberId) {\n          member.lastUsed = ev.timestamp;\n        }\n      });\n      break;\n\n    case 'member-field-updated':\n      members.forEach(function (member) {\n        if (member.memberId === ev.memberId) {\n          member[ev.field] = ev.newfield;\n        }\n      });\n      break;\n\n    case 'member-ticker-set':\n      members.forEach(function (member) {\n        if (member.memberId === ev.memberId) {\n          if (!member.tickers) {\n            member.tickers = [];\n          }\n\n          if (!ev.symbol || ev.symbol.trim().length < 1) {\n            member.tickers.splice(ev.index, 1);\n          } else {\n            member.tickers[ev.index] = ev.symbol.trim().toLowerCase();\n          }\n        }\n      });\n      break;\n\n    case 'doge-barked':\n      members.forEach(function (member) {\n        // this should only bump up for mutual doges\n        if (member.memberId === ev.memberId) {\n          member.lastUsed = ev.timestamp; // then bark\n        }\n      });\n      break;\n\n    case 'doge-muted':\n      members.forEach(function (member) {\n        if (member.memberId === ev.memberId) {\n          member.muted = true;\n        }\n      });\n      break;\n\n    case 'doge-unmuted':\n      members.forEach(function (member) {\n        if (member.memberId === ev.memberId) {\n          member.muted = false;\n        }\n      });\n      break;\n  }\n}\n\nfunction resourcesMuts(resources, ev) {\n  switch (ev.type) {\n    case 'resource-created':\n      var resourceIds = resources.map(function (r) {\n        return r.resourceId;\n      });\n\n      if (resourceIds.indexOf(ev.resourceId) === -1) {\n        resources.push(ev);\n      } else {\n        console.log('BAD data duplicate resource rejected in mutation, dup resource task likely created');\n      }\n\n      break;\n\n    case 'resource-used':\n      resources.forEach(function (resource) {\n        if (resource.resourceId == ev.resourceId) {\n          resource.stock -= parseInt(ev.amount);\n        }\n      });\n      break;\n\n    case 'resource-purged':\n      resources.forEach(function (r, i) {\n        if (r.resourceId === ev.resourceId) {\n          resources.splice(i, 1);\n        }\n      });\n      break;\n\n    case 'resource-stocked':\n      resources.forEach(function (resource) {\n        if (resource.resourceId == ev.resourceId) {\n          resource.stock += parseInt(ev.amount);\n        }\n      });\n      break;\n\n    case 'channel-created':\n      resources.forEach(function (r, i) {\n        if (r.resourceId == ev.resourceId) {\n          r.pubkey = ev.pubkey;\n        }\n      });\n      break;\n  }\n}\n\nfunction memesMuts(memes, ev) {\n  switch (ev.type) {\n    case 'meme-added':\n      var fileHash = ev.data;\n\n      if (!memes.some(function (file) {\n        return file.hash === ev.hash;\n      })) {\n        memes.push({\n          memeId: ev.taskId,\n          filename: ev.filename,\n          hash: ev.hash,\n          filetype: ev.filetype\n        });\n        console.log('added meme file: ', ev.filename);\n      } else {\n        console.log('meme file already in state: ', ev.filename);\n      }\n\n      break;\n  }\n}\n\nfunction sessionsMuts(sessions, ev) {\n  switch (ev.type) {\n    case 'session-created':\n      var idHasSession = sessions.some(function (session) {\n        // replace that sessions creds,\n        var match = false;\n\n        if (session.ownerId === ev.ownerId) {\n          match = true;\n\n          lodash__WEBPACK_IMPORTED_MODULE_1___default.a.merge(session, ev);\n        }\n\n        return match; // true terminates the some loop & idHasSession->true too\n      });\n\n      if (idHasSession) {// edited in session\n      } else {\n        // id didn't previously have session\n        sessions.push(ev);\n      }\n\n      break;\n\n    case 'session-killed':\n      sessions.forEach(function (s, i) {\n        if (s.session == ev.session) {\n          lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pullAt(sessions, i);\n        }\n      });\n      break;\n\n    case 'ao-outbound-connected':\n      sessions.push({\n        ownerId: ev.address,\n        token: ev.secret,\n        session: ev.address\n      });\n      break;\n  }\n}\n\nfunction tasksMuts(tasks, ev) {\n  switch (ev.type) {\n    case 'highlighted':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          var didUpdateInline = false;\n          task.highlights.forEach(function (h, i) {\n            if (h.memberId === ev.memberId) {\n              didUpdateInline = true;\n\n              if (h.valence === ev.valence) {\n                task.highlights.splice(i, 1);\n              } else {\n                h.valence = ev.valence;\n              }\n            }\n          });\n\n          if (!didUpdateInline) {\n            task.highlights.push({\n              memberId: ev.memberId,\n              valence: ev.valence\n            });\n          }\n        }\n      });\n      break;\n\n    case 'ao-outbound-connected':\n      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankCard\"](ev.address, ev.address, 'purple', ev.timestamp));\n      break;\n\n    case 'ao-disconnected':\n      break;\n\n    case 'resource-created':\n      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankCard\"](ev.resourceId, ev.resourceId, 'red', ev.timestamp));\n      break;\n\n    case 'member-created':\n      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankCard\"](ev.memberId, ev.memberId, 'blue', ev.timestamp));\n      break;\n\n    case 'member-purged':\n      break;\n\n    case 'meme-added':\n      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankCard\"](ev.taskId, ev.filename, 'yellow', ev.timestamp));\n      break;\n\n    case 'task-created':\n      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankCard\"](ev.taskId, ev.name, ev.color, ev.timestamp, ev.deck, ev.inId ? [ev.inId] : []));\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.inId) {\n          if (ev.prioritized) {\n            task.priorities = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {\n              return tId !== ev.taskId;\n            });\n            task.priorities.push(ev.taskId);\n          } else {\n            task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {\n              return tId !== ev.taskId;\n            });\n            task.subTasks.push(ev.taskId);\n          }\n        }\n      });\n      break;\n\n    case 'address-updated':\n      tasks.forEach(function (t) {\n        if (t.taskId === ev.taskId) {\n          t.address = ev.address;\n        }\n      });\n      break;\n\n    case 'task-passed':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          var pass = [ev.fromMemberId, ev.toMemberId];\n\n          if (!task.passed.some(function (p) {\n            return p[0] === pass[0] && p[1] === pass[1];\n          })) {\n            task.passed.push(pass);\n          }\n        }\n      });\n      break;\n\n    case 'task-grabbed':\n      // First make sure they have a valid member card to grab with,\n      // since it will show up on the \"Where is this card\" list\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {\n            return d[1] !== ev.memberId;\n          });\n\n          if (task.deck.indexOf(ev.memberId) === -1) {\n            if (ev.taskId !== ev.memberId && ev.memberId) {\n              task.deck.push(ev.memberId);\n            }\n          }\n        }\n      });\n      break;\n\n    case 'task-seen':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          if (!task.seen) {\n            task.seen = [];\n          }\n\n          if (!task.seen.some(function (t) {\n            return t.memberId === ev.memberId;\n          })) {\n            task.seen.push({\n              memberId: ev.memberId,\n              timestamp: Date.now()\n            });\n          }\n        }\n      });\n      break;\n\n    case 'task-time-clocked':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          var found = task.time.find(function (t) {\n            return t.memberId === ev.memberId;\n          });\n\n          if (!found) {\n            task.time.push({\n              memberId: ev.memberId,\n              timelog: [ev.seconds],\n              date: [ev.date]\n            });\n          } else {\n            if (!found.timelog) {\n              found.timelog = [];\n            }\n\n            if (!found.date) {\n              found.date = [];\n\n              if (found.timelog.length > found.date.length) {\n                var count = found.timelog.length - found.date.length;\n\n                while (count > 0) {\n                  found.date.push(null);\n                  count--;\n                }\n              }\n            }\n\n            found.timelog.push(ev.seconds);\n            found.date.push(ev.date);\n          }\n        }\n      });\n      break;\n\n    case 'pile-grabbed':\n      if (!ev.memberId) {\n        break;\n      }\n\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          (function () {\n            task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {\n              return d[1] !== ev.memberId;\n            });\n            var crawler = [ev.taskId];\n            var history = [];\n            var newCards = [];\n\n            do {\n              newCards = [];\n              crawler.forEach(function (t) {\n                if (history.indexOf(t) >= 0) return;\n                var subTask = tasks.filter(function (pst) {\n                  return pst.taskId === t;\n                });\n\n                if (subTask.length < 1) {\n                  // console.log(\n                  //   'missing subtask, this is messy. parent task name: ',\n                  //   task.name\n                  // )\n                  return;\n                }\n\n                if (subTask.length > 1) {\n                  console.log('duplicate task found, this is very bad');\n                }\n\n                subTask = subTask[0];\n\n                if (subTask === undefined || subTask.subTasks === undefined || subTask.priorities === undefined || subTask.completed === undefined) {\n                  console.log('invalid task data found, this is very bad');\n                  return;\n                }\n\n                history.push(t);\n\n                if (subTask.deck.indexOf(ev.memberId) === -1 && ev.taskId !== ev.memberId) {\n                  subTask.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(subTask.passed, function (d) {\n                    return d[1] !== ev.memberId;\n                  });\n                  subTask.deck.push(ev.memberId);\n                }\n\n                newCards = newCards.concat(subTask.subTasks).concat(subTask.priorities).concat(subTask.completed);\n              });\n              crawler = newCards;\n            } while (crawler.length > 0);\n          })();\n        }\n      });\n      break;\n\n    case 'task-dropped':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          task.deck = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.deck, function (d) {\n            return d !== ev.memberId;\n          });\n        }\n      });\n      break;\n\n    case 'pile-dropped':\n      if (!ev.memberId) {\n        break;\n      }\n\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          (function () {\n            task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {\n              return d[1] !== ev.memberId;\n            });\n            var crawler = [ev.taskId];\n            var history = [];\n            var newCards = [];\n\n            do {\n              newCards = [];\n              crawler.forEach(function (t) {\n                if (history.indexOf(t) >= 0) return;\n                var subTask = tasks.filter(function (pst) {\n                  return pst.taskId === t;\n                });\n\n                if (subTask.length < 1) {\n                  console.log('missing subtask, this is messy');\n                  return;\n                }\n\n                if (subTask.length > 1) {\n                  console.log('duplicate task found, this is very bad');\n                }\n\n                subTask = subTask[0];\n\n                if (subTask === undefined || subTask.subTasks === undefined || subTask.priorities === undefined || subTask.completed === undefined) {\n                  console.log('invalid task data found, this is very bad');\n                  return;\n                }\n\n                history.push(t);\n\n                if (subTask.deck.indexOf(ev.memberId) >= 0 && ev.taskId !== ev.memberId) {\n                  subTask.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(subTask.passed, function (d) {\n                    return d[1] !== ev.memberId;\n                  });\n                  subTask.deck = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(subTask.deck, function (d) {\n                    return d !== ev.memberId;\n                  });\n                }\n\n                newCards = newCards.concat(subTask.subTasks).concat(subTask.priorities).concat(subTask.completed);\n              });\n              crawler = newCards;\n            } while (crawler.length > 0);\n          })();\n        }\n      });\n      break;\n\n    case 'member-purged':\n      for (var i = tasks.length - 1; i >= 0; i--) {\n        var _task = tasks[i];\n\n        if (_task.taskId === ev.memberId) {\n          tasks.splice(i, 1);\n        }\n      }\n\n      tasks.forEach(function (t, j) {\n        t.subTasks = t.subTasks.filter(function (st) {\n          return st !== ev.memberId;\n        });\n        t.priorities = t.priorities.filter(function (st) {\n          return st !== ev.memberId;\n        });\n        t.completed.filter(function (st) {\n          return st !== ev.memberId;\n        });\n        t.claimed = t.claimed.filter(function (st) {\n          return st !== ev.memberId;\n        });\n        t.deck = t.deck.filter(function (st) {\n          return st !== ev.memberId;\n        });\n        t.passed = t.passed.filter(function (p) {\n          return !(p[0] === ev.memberId || p[1] === ev.memberId);\n        });\n\n        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(t, 'grid.rows')) {\n          Object.entries(t.grid.rows).forEach(function (_ref) {\n            var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 2),\n                y = _ref2[0],\n                row = _ref2[1];\n\n            Object.entries(row).forEach(function (_ref3) {\n              var _ref4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref3, 2),\n                  x = _ref4[0],\n                  cell = _ref4[1];\n\n              if (cell === ev.memberId) {\n                delete tasks[j].grid.rows[y][x];\n              }\n            });\n\n            if (row.length === 0) {\n              delete tasks[j].grid.rows[y];\n            }\n          });\n        }\n      });\n      break;\n\n    case 'task-removed':\n      for (var _i = tasks.length - 1; _i >= 0; _i--) {\n        var _task2 = tasks[_i];\n\n        if (_task2.taskId === ev.taskId) {\n          tasks.splice(_i, 1);\n        }\n      }\n\n      tasks.forEach(function (t, i) {\n        t.subTasks = t.subTasks.filter(function (st) {\n          return st !== ev.taskId;\n        });\n        t.priorities = t.priorities.filter(function (st) {\n          return st !== ev.taskId;\n        });\n        t.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(t.completed, function (st) {\n          return st !== ev.taskId;\n        });\n\n        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(t, 'grid.rows')) {\n          Object.entries(t.grid.rows).forEach(function (_ref5) {\n            var _ref6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref5, 2),\n                y = _ref6[0],\n                row = _ref6[1];\n\n            Object.entries(row).forEach(function (_ref7) {\n              var _ref8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref7, 2),\n                  x = _ref8[0],\n                  cell = _ref8[1];\n\n              if (cell === ev.taskId) {\n                delete tasks[i].grid.rows[y][x];\n              }\n            });\n\n            if (row.length === 0) {\n              delete tasks[i].grid.rows[y];\n            }\n          });\n        }\n      });\n      break;\n\n    case 'tasks-removed':\n      for (var _i2 = tasks.length - 1; _i2 >= 0; _i2--) {\n        var _task3 = tasks[_i2];\n\n        if (ev.taskIds.includes(_task3.taskId)) {\n          tasks.splice(_i2, 1);\n        }\n      }\n\n      tasks.forEach(function (t, i) {\n        t.subTasks = t.subTasks.filter(function (st) {\n          return !ev.taskIds.includes(st);\n        });\n        t.priorities = t.priorities.filter(function (st) {\n          return !ev.taskIds.includes(st);\n        });\n        t.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(t.completed, function (st) {\n          return !ev.taskIds.includes(st);\n        });\n\n        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(t, 'grid.rows')) {\n          Object.entries(t.grid.rows).forEach(function (_ref9) {\n            var _ref10 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref9, 2),\n                y = _ref10[0],\n                row = _ref10[1];\n\n            Object.entries(row).forEach(function (_ref11) {\n              var _ref12 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref11, 2),\n                  x = _ref12[0],\n                  cell = _ref12[1];\n\n              if (ev.taskIds.includes(cell)) {\n                delete tasks[i].grid.rows[y][x];\n              }\n            });\n\n            if (row.length === 0) {\n              delete tasks[i].grid.rows[y];\n            }\n          });\n        }\n      });\n      break;\n\n    case 'task-prioritized':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.inId) {\n          task.priorities = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.priorities, function (taskId) {\n            return taskId !== ev.taskId;\n          });\n          task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (taskId) {\n            return taskId !== ev.taskId;\n          });\n          task.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.completed, function (taskId) {\n            return taskId !== ev.taskId;\n          }); // if (ev.position) {\n          //   task.priorities = task.priorities.splice(ev.position, 0, ev.taskId)\n          // } else {\n          // console.log('task-prioritized position is ', ev.position)\n\n          task.priorities.push(ev.taskId); // }\n        }\n\n        if (task.taskId === ev.taskId) {\n          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'parents') || !Array.isArray(task.parents)) {\n            task.parents = [];\n          }\n\n          if (!task.parents.some(function (pId) {\n            return pId === ev.inId;\n          })) {\n            task.parents.push(ev.inId);\n          }\n        }\n      });\n      break;\n\n    case 'pile-prioritized':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.inId) {\n          task.priorities = task.priorities.concat(task.subTasks);\n          task.subTasks = [];\n        }\n      });\n      break;\n\n    case 'task-refocused':\n      var claimed;\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          claimed = task.claimed;\n        }\n      });\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.inId) {\n          task.priorities = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.priorities, function (taskId) {\n            return taskId !== ev.taskId;\n          });\n          task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (taskId) {\n            return taskId !== ev.taskId;\n          });\n\n          if (claimed && claimed.length >= 1) {\n            if (!task.completed.some(function (tId) {\n              return tId === ev.taskId;\n            })) {\n              task.completed.push(ev.taskId);\n            }\n          } else if (claimed !== undefined) {\n            task.subTasks.push(ev.taskId);\n          }\n        }\n      });\n      break;\n\n    case 'pile-refocused':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.inId) {\n          task.priorities.forEach(function (stId) {\n            tasks.forEach(function (st) {\n              if (st.taskId === stId) {\n                if (st.claimed && st.claimed.length >= 1) {\n                  task.completed.push(stId);\n                } else {\n                  task.subTasks.push(stId);\n                }\n              }\n            });\n            task.priorities = [];\n          });\n        }\n      });\n      break;\n\n    case 'task-sub-tasked':\n      // I think the spec is only run on event creation, not load from database,\n      // so make sure the task exists before linking to it from another card\n      var taskExists = false;\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.subTask) {\n          taskExists = true;\n          task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {\n            return d[1] !== ev.memberId;\n          });\n\n          if (ev.memberId && task.deck.indexOf(ev.memberId) === -1) {\n            if (ev.subTask !== ev.memberId) {\n              task.deck.push(ev.memberId);\n            }\n          }\n\n          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'parents') || !Array.isArray(task.parents)) {\n            console.log('Task with missing parents found in task-sub-tasked. This should never happen.');\n            task.parents = [];\n          }\n\n          if (!task.parents.some(function (pId) {\n            return pId === ev.taskId;\n          })) {\n            task.parents.push(ev.taskId);\n          }\n        }\n      });\n\n      if (taskExists) {\n        tasks.forEach(function (task) {\n          if (task.taskId === ev.taskId) {\n            task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {\n              return tId !== ev.subTask;\n            });\n            task.subTasks.push(ev.subTask);\n          }\n        });\n      }\n      /*else { */\n      // console.log(\n      //   'A task with references to subTasks that are missing was found in an event in the database. This should have been filtered before storing.'\n      // )\n      // }\n\n\n      break;\n\n    case 'task-de-sub-tasked':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {\n            return d[1] !== ev.memberId;\n          });\n          task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {\n            return tId !== ev.subTask;\n          });\n          task.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.completed, function (tId) {\n            return tId !== ev.subTask;\n          });\n        }\n\n        if (task.taskId === ev.subTask) {\n          task.parents = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.parents, function (tId) {\n            return tId !== ev.taskId;\n          });\n        }\n      });\n      break;\n\n    case 'task-guilded':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          task.guild = ev.guild;\n        }\n      });\n      break;\n\n    case 'task-valued':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          task.completeValue = Number(ev.value);\n        }\n      });\n      break;\n\n    case 'task-colored':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          task.color = ev.color;\n        }\n\n        if (ev.inId && task.taskId === ev.inId) {\n          task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {\n            return tId !== ev.taskId;\n          });\n          task.subTasks.push(ev.taskId);\n        }\n      });\n      break;\n\n    case 'task-claimed':\n      var bounty = 0;\n      tasks.forEach(function (task) {\n        // let found = false\n        if (task.taskId === ev.memberId) {\n          task.boost += parseFloat(ev.paid);\n        } // task.priorities.some(taskId => {\n        //   if (taskId !== ev.taskId) {\n        //     return false\n        //   } else {\n        //     found = true\n        //     return true\n        //   }\n        // })\n        // task.subTasks.some(taskId => {\n        //   if (taskId !== ev.taskId) {\n        //     return false\n        //   } else {\n        //     found = true\n        //     return true\n        //   }\n        // })\n        // if (found) {\n        //   if (task.priorities.indexOf(ev.taskId) === -1) {\n        //     task.subTasks = _.filter(task.subTasks, tId => tId !== ev.subTask)\n        //     task.completed = _.filter(task.completed, tId => tId !== ev.subTask)\n        //     task.completed.push(ev.taskId)\n        //   }\n        // }\n\n\n        if (task.taskId === ev.taskId) {\n          task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {\n            return d[1] !== ev.memberId;\n          });\n\n          if (task.deck.indexOf(ev.memberId) === -1) {\n            if (ev.taskId !== ev.memberId && ev.memberId) {\n              task.deck.push(ev.memberId);\n            }\n          }\n\n          if (task.claimed.indexOf(ev.memberId) === -1) {\n            task.claimed.push(ev.memberId);\n          }\n\n          task.lastClaimed = ev.timestamp;\n        }\n      });\n      break;\n\n    case 'task-unclaimed':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          task.claimed = task.claimed.filter(function (mId) {\n            return mId !== ev.memberId;\n          });\n\n          if (task.claimed.length < 1) {\n            tasks.forEach(function (p) {\n              if (p.priorities.indexOf(ev.taskId) === -1 && p.completed.indexOf(ev.taskId) > -1) {\n                p.completed = p.completed.filter(function (taskId) {\n                  return taskId !== ev.taskId;\n                });\n                p.subTasks = p.subTasks.filter(function (taskId) {\n                  return taskId !== ev.taskId;\n                });\n                p.subTasks.push(ev.taskId);\n              }\n            });\n          }\n        }\n      });\n      break;\n\n    case 'task-boosted':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          var amount = parseFloat(ev.amount);\n          var boost = parseFloat(task.boost);\n\n          if (amount > 0) {\n            task.boost = amount + boost;\n            task.address = '';\n          }\n        }\n      });\n      break;\n\n    case 'task-boosted-lightning':\n      tasks.forEach(function (task) {\n        if (task.payment_hash === ev.payment_hash) {\n          var amount = parseFloat(ev.amount);\n          var boost = parseFloat(task.boost);\n\n          if (amount > 0) {\n            task.boost = amount + boost;\n            task.bolt11 = '';\n            task.payment_hash = '';\n          }\n        }\n      });\n      break;\n\n    case 'resource-booked':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.resourceId) {\n          task.book = ev;\n        }\n      });\n      break;\n\n    case 'resource-used':\n      tasks.forEach(function (task) {\n        var charged = parseFloat(ev.charged);\n\n        if (charged > 0) {\n          if (task.taskId === ev.memberId) {\n            task.boost -= charged;\n          }\n\n          if (task.taskId === ev.resourceId) {\n            task.boost += charged;\n          }\n        }\n      });\n      break;\n\n    case 'invoice-created':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.taskId) {\n          task.payment_hash = ev.payment_hash;\n          task.bolt11 = ev.bolt11;\n        }\n      });\n      break;\n\n    case 'task-swapped':\n      var task;\n      tasks.forEach(function (t) {\n        if (t.taskId === ev.taskId) {\n          task = t;\n        }\n      });\n\n      if (task) {\n        var originalIndex = task.subTasks.indexOf(ev.swapId1);\n        var swapIndex = task.subTasks.indexOf(ev.swapId2);\n        var originalIndexCompleted = task.completed.indexOf(ev.swapId1);\n        var swapIndexCompleted = task.completed.indexOf(ev.swapId2);\n\n        if (originalIndex > -1 && swapIndex > -1) {\n          var newST = task.subTasks.slice();\n          newST[originalIndex] = ev.swapId2;\n          newST[swapIndex] = ev.swapId1;\n          task.subTasks = newST;\n        }\n\n        if (originalIndexCompleted > -1 && swapIndexCompleted > -1) {\n          var newCompleted = task.completed.slice();\n          newCompleted[originalIndexCompleted] = ev.swapId2;\n          newCompleted[swapIndexCompleted] = ev.swapId1;\n          task.completed = newCompleted;\n        }\n      }\n\n      break;\n\n    case 'task-bumped':\n      var taskB;\n      tasks.forEach(function (t) {\n        if (t.taskId === ev.taskId) {\n          taskB = t;\n        }\n      });\n\n      if (taskB) {\n        var _originalIndex = taskB.subTasks.indexOf(ev.bumpId);\n\n        var _originalIndexCompleted = taskB.completed.indexOf(ev.bumpId);\n\n        if (_originalIndex === taskB.subTasks.length - 1 && ev.direction === -1) {\n          var _newST = [ev.bumpId];\n          _newST = _newST.concat(taskB.subTasks.slice(0, taskB.subTasks.length - 1));\n          taskB.subTasks = _newST;\n        }\n\n        if (_originalIndex === 0 && ev.direction === 1) {\n          var _newST2 = taskB.subTasks.slice(1);\n\n          _newST2.push(ev.bumpId);\n\n          taskB.subTasks = _newST2;\n        }\n      }\n\n      break;\n\n    case 'tasks-received':\n      var startLength = tasks.length;\n      var changedIndexes = [];\n      ev.tasks.forEach(function (newT) {\n        if (!tasks.some(function (cur, i) {\n          if (cur.taskId === newT.taskId) {\n            _calculations__WEBPACK_IMPORTED_MODULE_2__[\"safeMerge\"](cur, newT);\n            changedIndexes.push(i);\n            return true;\n          }\n        })) {\n          var safeClone = _calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankCard\"](newT.taskId, newT.name, newT.color, newT.timestamp, newT.parents, newT.height);\n          _calculations__WEBPACK_IMPORTED_MODULE_2__[\"safeMerge\"](safeClone, newT);\n          tasks.push(safeClone);\n          changedIndexes.push(tasks.length - 1);\n        }\n      }); // Loop through the new cards and remove invalid references to cards that don't exist on this server\n\n      changedIndexes.forEach(function (tId) {\n        var t = tasks[tId];\n        var beforeLength = t.subTasks.length;\n        var filtered = [];\n        t.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(t.subTasks, function (stId) {\n          if (tasks.some(function (sst) {\n            return sst.taskId === stId;\n          })) {\n            filtered.push(stId);\n            return true;\n          }\n\n          return false;\n        });\n        t.priorities = t.priorities.filter(function (stId) {\n          return tasks.some(function (sst) {\n            return sst.taskId === stId;\n          });\n        });\n        t.completed = t.completed.filter(function (stId) {\n          return tasks.some(function (sst) {\n            return sst.taskId === stId;\n          });\n        });\n        t.deck = t.deck.filter(function (stId) {\n          return tasks.some(function (sst) {\n            return sst.taskId === stId && sst.taskId === sst.name;\n          });\n        }); // Grids are not received yet (because they did not exist when p2p AO was previously implemented)\n        // so they do not need to be checked for valid references to other cards (yet)\n      });\n      break;\n\n    case 'member-charged':\n      tasks.forEach(function (task) {\n        if (task.taskId === ev.memberId) {\n          task.boost -= parseFloat(ev.charged);\n\n          if (task.boost < 0) {\n            task.boost = 0;\n          }\n        }\n      });\n      break;\n\n    case 'grid-created':\n      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankCard\"](ev.taskId, ev.name, ev.color, ev.timestamp, ev.deck, ev.height, ev.width));\n      break;\n\n    case 'grid-added':\n      tasks.forEach(function (task, i) {\n        if (task.taskId === ev.taskId) {\n          task.grid = _calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankGrid\"](ev.height, ev.width);\n        }\n      });\n      break;\n\n    case 'grid-resized':\n      tasks.forEach(function (task, i) {\n        if (task.taskId === ev.taskId) {\n          if (!task.grid) {\n            task.grid = _calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankGrid\"](ev.height, ev.width);\n          }\n\n          task.grid.height = ev.height;\n          task.grid.width = ev.width;\n          Object.entries(task.grid.rows).forEach(function (_ref13) {\n            var _ref14 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref13, 2),\n                y = _ref14[0],\n                row = _ref14[1];\n\n            Object.entries(row).forEach(function (_ref15) {\n              var _ref16 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref15, 2),\n                  x = _ref16[0],\n                  cell = _ref16[1];\n\n              if (x >= ev.width || y >= ev.height) {\n                tasks.forEach(function (st) {\n                  if (st.taskId === cell) {\n                    task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (taskId) {\n                      return taskId !== cell;\n                    });\n                    task.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.completed, function (taskId) {\n                      return taskId !== cell;\n                    });\n\n                    if (st.claimed && st.claimed.length >= 1) {\n                      task.completed.push(cell);\n                    } else {\n                      task.subTasks.unshift(cell);\n                    }\n                  }\n                });\n                delete tasks[i].grid.rows[y][x];\n              }\n            });\n\n            if (row.length === 0) {\n              delete tasks[i].grid.rows[y];\n            }\n          });\n        }\n      });\n      break;\n\n    case 'grid-pin':\n      tasks.forEach(function (task, i) {\n        if (task.taskId === ev.inId) {\n          if (!task.grid) {\n            task.grid = _calculations__WEBPACK_IMPORTED_MODULE_2__[\"blankGrid\"]();\n          }\n\n          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'grid.rows.' + ev.y)) {\n            tasks[i].grid.rows[ev.y] = {};\n          }\n\n          tasks[i].grid.rows[ev.y][ev.x] = ev.taskId;\n        } // Same as task-sub-tasked: Grab the card and removed the pass from it, if any. And add parents.\n\n\n        if (task.taskId === ev.taskId) {\n          // task.passed = _.filter(task.passed, d => d[1] !== ev.memberId)\n          // if (ev.memberId && task.deck.indexOf(ev.memberId) === -1) {\n          //   if (ev.taskId !== ev.memberId) {\n          //     task.deck.push(ev.memberId)\n          //   }\n          // }\n          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'parents') || !Array.isArray(task.parents)) {\n            task.parents = [];\n          }\n\n          if (!task.parents.some(function (pId) {\n            return pId === ev.inId;\n          })) {\n            task.parents.push(ev.inId);\n          }\n        }\n\n        task.subTasks = task.subTasks.filter(function (st) {\n          return st !== ev.taskId;\n        });\n      });\n      break;\n\n    case 'grid-unpin':\n      tasks.some(function (task, i) {\n        if (task.taskId == ev.inId) {\n          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'grid.rows.' + ev.y)) {\n            return false;\n          }\n\n          var gridTaskId = tasks[i].grid.rows[ev.y][ev.x];\n          delete tasks[i].grid.rows[ev.y][ev.x];\n\n          if (task.grid.rows[ev.y].length == 0) {\n            delete tasks[i].grid.rows[ev.y];\n          }\n\n          if (tasks.some(function (t) {\n            return t.taskId === gridTaskId;\n          })) {\n            task.subTasks = task.subTasks.filter(function (st) {\n              return st !== gridTaskId;\n            });\n            task.subTasks.unshift(gridTaskId);\n          }\n\n          return true;\n        }\n      });\n      break;\n  }\n}\n\nfunction applyEvent(state, ev) {\n  cashMuts(state.cash, ev);\n  membersMuts(state.members, ev);\n  resourcesMuts(state.resources, ev);\n  memesMuts(state.memes, ev);\n  sessionsMuts(state.sessions, ev);\n  tasksMuts(state.tasks, ev);\n  aoMuts(state.ao, ev);\n}\n\nfunction setCurrentCash(cash, current) {\n  cash.alias = current.cash.alias;\n  cash.address = current.cash.address;\n  cash.spot = current.cash.spot;\n  cash.currency = current.cash.currency;\n  cash.rent = current.cash.rent;\n  cash.cap = current.cash.cap;\n  cash.usedTxIds = current.cash.usedTxIds;\n  cash.outputs = current.cash.outputs;\n  cash.channels = current.cash.channels;\n  cash.info = current.cash.info;\n  cash.pay_index = current.cash.pay_index;\n}\n\nfunction setCurrentTasks(tasks, current) {\n  tasks.forEach(function (task, i) {\n    delete tasks[i];\n  });\n  tasks.length = 0;\n  current.tasks.forEach(function (task) {\n    tasks.push(task); // _.assign(tasks[index].grid, task.grid) // does not solve the +grid not rerendering glitch... or does it?\n  });\n}\n\nfunction setCurrentSessions(sessions, current) {\n  sessions.length = 0;\n  current.sessions.forEach(function (session) {\n    sessions.push(session);\n  });\n}\n\nfunction setCurrentAO(aos, current) {\n  aos.length = 0;\n  current.ao.forEach(function (a) {\n    aos.push(a);\n  });\n}\n\nfunction setCurrentMembers(members, current) {\n  members.length = 0;\n  current.members.forEach(function (member) {\n    members.push(member);\n  });\n}\n\nfunction setCurrentResources(resources, current) {\n  resources.length = 0;\n  current.resources.forEach(function (resource) {\n    resources.push(resource);\n  });\n}\n\nfunction setCurrentMemes(memes, current) {\n  memes.length = 0;\n\n  if (!current.memes) {\n    current.memes = [];\n  }\n\n  current.memes.forEach(function (meme) {\n    memes.push(meme);\n  });\n}\n\nfunction setCurrent(state, current) {\n  setCurrentCash(state.cash, current);\n  setCurrentTasks(state.tasks, current);\n  setCurrentSessions(state.sessions, current);\n  setCurrentAO(state.ao, current);\n  setCurrentMembers(state.members, current);\n  setCurrentResources(state.resources, current);\n  setCurrentMemes(state.memes, current);\n}\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(aoMuts, \"aoMuts\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(cashMuts, \"cashMuts\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(membersMuts, \"membersMuts\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(resourcesMuts, \"resourcesMuts\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(memesMuts, \"memesMuts\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(sessionsMuts, \"sessionsMuts\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(tasksMuts, \"tasksMuts\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(applyEvent, \"applyEvent\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(setCurrentCash, \"setCurrentCash\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(setCurrentTasks, \"setCurrentTasks\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(setCurrentSessions, \"setCurrentSessions\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(setCurrentAO, \"setCurrentAO\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(setCurrentMembers, \"setCurrentMembers\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(setCurrentResources, \"setCurrentResources\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(setCurrentMemes, \"setCurrentMemes\", \"/usr/src/app/src/app/mutations.tsx\");\n  reactHotLoader.register(setCurrent, \"setCurrent\", \"/usr/src/app/src/app/mutations.tsx\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./app/mutations.tsx?");

/***/ }),

/***/ "./app/store.ts":
/*!**********************!*\
  !*** ./app/store.ts ***!
  \**********************/
/*! exports provided: serverState, pubState, AoStore, applyBackup, removeSensitive, default, createAoStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serverState\", function() { return serverState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pubState\", function() { return pubState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AoStore\", function() { return AoStore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"applyBackup\", function() { return applyBackup; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeSensitive\", function() { return removeSensitive; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createAoStore\", function() { return createAoStore; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"../node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"../node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/applyDecoratedDescriptor */ \"../node_modules/@babel/runtime/helpers/applyDecoratedDescriptor.js\");\n/* harmony import */ var _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mobx */ \"../node_modules/mobx/lib/mobx.module.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ \"../node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mutations */ \"./app/mutations.tsx\");\n\n\n\n\n\nvar _dec, _dec2, _dec3, _class, _temp;\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\nvar serverState = {\n  ao: [],\n  sessions: [],\n  members: [],\n  tasks: [],\n  resources: [],\n  memes: [],\n  cash: {\n    address: '',\n    alias: '',\n    currency: 'CAD',\n    spot: 0,\n    rent: 0,\n    cap: 75,\n    pay_index: 0,\n    usedTxIds: [],\n    outputs: [],\n    channels: [],\n    info: {}\n  }\n};\nvar pubState = {\n  ao: [],\n  sessions: [],\n  members: [],\n  tasks: [],\n  resources: [],\n  memes: [],\n  cash: {\n    address: '',\n    alias: '',\n    currency: 'CAD',\n    spot: 0,\n    rent: 0,\n    cap: 75,\n    pay_index: 0,\n    usedTxIds: [],\n    outputs: [],\n    channels: [],\n    info: {}\n  }\n};\n\nvar defaultState = _objectSpread({\n  session: '',\n  token: '',\n  user: '',\n  loggedIn: false\n}, pubState);\n\nvar AoStore = (_dec = mobx__WEBPACK_IMPORTED_MODULE_4__[\"action\"].bound, _dec2 = mobx__WEBPACK_IMPORTED_MODULE_4__[\"action\"].bound, _dec3 = mobx__WEBPACK_IMPORTED_MODULE_4__[\"action\"].bound, (_class = (_temp = /*#__PURE__*/function () {\n  function AoStore(state) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AoStore);\n\n    this.state = defaultState;\n    this.state = Object(mobx__WEBPACK_IMPORTED_MODULE_4__[\"observable\"])(state);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AoStore, [{\n    key: \"initializeState\",\n    value: function initializeState(state) {\n      var _this = this;\n\n      Object.keys(state).forEach(function (key) {\n        return Object.assign(_this.state[key], state[key]);\n      });\n    }\n  }, {\n    key: \"applyEvent\",\n    value: function applyEvent(ev) {\n      Object(_mutations__WEBPACK_IMPORTED_MODULE_6__[\"applyEvent\"])(this.state, ev);\n    }\n  }, {\n    key: \"setCurrentCard\",\n    value: function setCurrentCard(taskId) {\n      this.currentCard = taskId;\n    }\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }, {\n    key: \"member\",\n    get: function get() {\n      var _this2 = this;\n\n      var loggedInMember;\n      this.state.sessions.forEach(function (session) {\n        if (_this2.state.session === session.session) {\n          console.log('found existing session');\n          var memberId = session.ownerId;\n\n          _this2.state.members.forEach(function (m) {\n            if (m.memberId === memberId) {\n              loggedInMember = m;\n            }\n          });\n        }\n      });\n      return loggedInMember;\n    }\n  }, {\n    key: \"hashMap\",\n    get: function get() {\n      var hashMap = new Map();\n      this.state.tasks.forEach(function (t) {\n        hashMap.set(t.taskId, t);\n      });\n      return hashMap;\n    }\n  }]);\n\n  return AoStore;\n}(), _temp), (_babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, \"member\", [mobx__WEBPACK_IMPORTED_MODULE_4__[\"computed\"]], Object.getOwnPropertyDescriptor(_class.prototype, \"member\"), _class.prototype), _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, \"hashMap\", [mobx__WEBPACK_IMPORTED_MODULE_4__[\"computed\"]], Object.getOwnPropertyDescriptor(_class.prototype, \"hashMap\"), _class.prototype), _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, \"initializeState\", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, \"initializeState\"), _class.prototype), _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, \"applyEvent\", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, \"applyEvent\"), _class.prototype), _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, \"setCurrentCard\", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, \"setCurrentCard\"), _class.prototype)), _class));\nfunction applyBackup(backup) {\n  console.log(\"backup:\", backup);\n  var server = Object.assign({}, backup);\n  Object(_mutations__WEBPACK_IMPORTED_MODULE_6__[\"setCurrent\"])(serverState, server);\n  backup.memes = backup.memes && backup.memes.length > 0 ? backup.memes.map(removeSensitive) : [];\n  backup.resources = backup.resources.map(removeSensitive);\n  backup.members = backup.members.map(removeSensitive);\n  backup.ao = backup.ao.map(removeSensitive);\n  backup.tasks = backup.tasks.map(removeSensitive);\n  Object(_mutations__WEBPACK_IMPORTED_MODULE_6__[\"setCurrent\"])(pubState, backup);\n}\nfunction removeSensitive(value) {\n  var secretStuff = ['fob', 'secret', 'token', 'email', 'payment_hash', 'inboundSecret', 'outboundSecret'];\n\n  if (value.type === 'member-field-updated') {\n    ['fob', 'secret', 'email'].forEach(function (str) {\n      if (value.field === str) {\n        secretStuff.push('newfield');\n      }\n    });\n  }\n\n  return lodash__WEBPACK_IMPORTED_MODULE_5___default.a.omit(value, secretStuff);\n}\nvar aoStore = {};\nvar _default = aoStore;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\nfunction createAoStore(state) {\n  aoStore.store = new AoStore(state);\n}\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(serverState, \"serverState\", \"/usr/src/app/src/app/store.ts\");\n  reactHotLoader.register(pubState, \"pubState\", \"/usr/src/app/src/app/store.ts\");\n  reactHotLoader.register(defaultState, \"defaultState\", \"/usr/src/app/src/app/store.ts\");\n  reactHotLoader.register(AoStore, \"AoStore\", \"/usr/src/app/src/app/store.ts\");\n  reactHotLoader.register(applyBackup, \"applyBackup\", \"/usr/src/app/src/app/store.ts\");\n  reactHotLoader.register(removeSensitive, \"removeSensitive\", \"/usr/src/app/src/app/store.ts\");\n  reactHotLoader.register(aoStore, \"aoStore\", \"/usr/src/app/src/app/store.ts\");\n  reactHotLoader.register(createAoStore, \"createAoStore\", \"/usr/src/app/src/app/store.ts\");\n  reactHotLoader.register(_default, \"default\", \"/usr/src/app/src/app/store.ts\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./app/store.ts?");

/***/ }),

/***/ "./client/api.ts":
/*!***********************!*\
  !*** ./client/api.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"../node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"../node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"../node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"../node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ \"../node_modules/socket.io-client/lib/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! superagent */ \"../node_modules/superagent/lib/client.js\");\n/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ \"../node_modules/uuid/dist/esm-browser/index.js\");\n/* harmony import */ var _app_crypto__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../app/crypto */ \"./app/crypto.tsx\");\n/* harmony import */ var _app_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../app/store */ \"./app/store.ts\");\n\n\n\n\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\nvar AoApi = /*#__PURE__*/function () {\n  function AoApi(socket) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, AoApi);\n\n    this.socket = socket;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(AoApi, [{\n    key: \"startSocketListeners\",\n    value: function startSocketListeners() {\n      var _this = this;\n\n      var aoStore = _app_store__WEBPACK_IMPORTED_MODULE_8__[\"default\"].store;\n      this.socket.connect();\n      this.socket.on('connect', function () {\n        console.log('socket connected');\n        var _aoStore$state = aoStore.state,\n            session = _aoStore$state.session,\n            token = _aoStore$state.token;\n        console.log(\"Session and token: \", session, token);\n\n        _this.socket.emit('authentication', {\n          session: session,\n          token: token\n        });\n      });\n      this.socket.on('authenticated', function () {\n        console.log('authenticated');\n\n        _this.socket.on('eventstream', function (ev) {\n          console.log('event', ev);\n          aoStore.applyEvent(ev);\n        });\n      });\n      this.socket.on('disconnect', function (reason) {\n        console.log('disconnected');\n\n        _this.socket.connect();\n      });\n    }\n  }, {\n    key: \"createSession\",\n    value: function () {\n      var _createSession = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(user, pass) {\n        var session, sessionKey, token;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                session = Object(uuid__WEBPACK_IMPORTED_MODULE_6__[\"v1\"])();\n                sessionKey = Object(_app_crypto__WEBPACK_IMPORTED_MODULE_7__[\"createHash\"])(session + Object(_app_crypto__WEBPACK_IMPORTED_MODULE_7__[\"createHash\"])(pass));\n                token = Object(_app_crypto__WEBPACK_IMPORTED_MODULE_7__[\"hmacHex\"])(session, sessionKey);\n                return _context.abrupt(\"return\", superagent__WEBPACK_IMPORTED_MODULE_5___default.a.post('/session').set('authorization', token).set('session', session).set('name', user).on('error', function () {\n                  return false;\n                }).then(function (res) {\n                  aoStore.state.token = token;\n                  aoStore.state.session = session;\n                  aoStore.state.user = user;\n                  window.localStorage.setItem('user', user);\n                  window.localStorage.setItem('token', token);\n                  window.localStorage.setItem('session', session);\n                  return true;\n                }));\n\n              case 4:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }));\n\n      function createSession(_x, _x2) {\n        return _createSession.apply(this, arguments);\n      }\n\n      return createSession;\n    }()\n  }, {\n    key: \"fetchState\",\n    value: function () {\n      var _fetchState = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {\n        var session, token, user;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                session = window.localStorage.getItem('session');\n                token = window.localStorage.getItem('token');\n                user = window.localStorage.getItem('user');\n                return _context2.abrupt(\"return\", superagent__WEBPACK_IMPORTED_MODULE_5___default.a.post('/state').set('Authorization', token).set('session', session).set('name', user).then(function (res) {\n                  aoStore.state.session = session;\n                  aoStore.state.token = token;\n                  aoStore.state.user = user;\n                  aoStore.state.loggedIn = true;\n                  aoStore.initializeState(res.body);\n                  return true;\n                }).catch(function () {\n                  return false;\n                }));\n\n              case 4:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2);\n      }));\n\n      function fetchState() {\n        return _fetchState.apply(this, arguments);\n      }\n\n      return fetchState;\n    }()\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return AoApi;\n}();\n\nvar socket = socket_io_client__WEBPACK_IMPORTED_MODULE_4___default.a.connect('/', {\n  autoConnect: false\n});\nvar api = new AoApi(socket);\nvar _default = api;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(AoApi, \"AoApi\", \"/usr/src/app/src/client/api.ts\");\n  reactHotLoader.register(socket, \"socket\", \"/usr/src/app/src/client/api.ts\");\n  reactHotLoader.register(api, \"api\", \"/usr/src/app/src/client/api.ts\");\n  reactHotLoader.register(_default, \"default\", \"/usr/src/app/src/client/api.ts\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./client/api.ts?");

/***/ }),

/***/ "./index.tsx":
/*!*******************!*\
  !*** ./index.tsx ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"../node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"../node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ \"../node_modules/@hot-loader/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"../node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! isomorphic-style-loader/StyleContext */ \"../node_modules/isomorphic-style-loader/StyleContext.js\");\n/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! isomorphic-style-loader/withStyles */ \"../node_modules/isomorphic-style-loader/withStyles.js\");\n/* harmony import */ var isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _app_css_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app/css/styles */ \"./app/css/styles.scss\");\n/* harmony import */ var _app_css_styles__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_app_css_styles__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app */ \"./app/index.tsx\");\n/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./client/api */ \"./client/api.ts\");\n/* harmony import */ var _app_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app/store */ \"./app/store.ts\");\n\n\n\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\n\n\n\nObject(_app_store__WEBPACK_IMPORTED_MODULE_10__[\"createAoStore\"])(window.__PRELOADED_STATE__);\n_client_api__WEBPACK_IMPORTED_MODULE_9__[\"default\"].startSocketListeners();\n\nvar Routes = function Routes() {\n  Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useEffect\"])(function () {\n    function fetchState() {\n      return _fetchState.apply(this, arguments);\n    }\n\n    function _fetchState() {\n      _fetchState = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _client_api__WEBPACK_IMPORTED_MODULE_9__[\"default\"].fetchState();\n\n              case 1:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }));\n      return _fetchState.apply(this, arguments);\n    }\n\n    fetchState();\n  });\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"BrowserRouter\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null));\n};\n\n__signature__(Routes, \"useEffect{}\");\n\nvar insertCss = function insertCss() {\n  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {\n    styles[_key] = arguments[_key];\n  }\n\n  var removeCss = styles.map(function (style) {\n    return style._insertCss();\n  });\n  return function () {\n    return removeCss.forEach(function (dispose) {\n      return dispose();\n    });\n  };\n};\n\nvar StyledRoutes = isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_6___default()(_app_css_styles__WEBPACK_IMPORTED_MODULE_7___default.a)(Routes);\nObject(react_dom__WEBPACK_IMPORTED_MODULE_3__[\"hydrate\"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_5___default.a.Provider, {\n  value: {\n    insertCss: insertCss\n  }\n}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledRoutes, null)), document.getElementById('root'));\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Routes, \"Routes\", \"/usr/src/app/src/index.tsx\");\n  reactHotLoader.register(insertCss, \"insertCss\", \"/usr/src/app/src/index.tsx\");\n  reactHotLoader.register(StyledRoutes, \"StyledRoutes\", \"/usr/src/app/src/index.tsx\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"../node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./index.tsx?");

/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./index.tsx webpack-hot-middleware/client ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./index.tsx */\"./index.tsx\");\nmodule.exports = __webpack_require__(/*! webpack-hot-middleware/client */\"../node_modules/webpack-hot-middleware/client.js\");\n\n\n//# sourceURL=webpack:///multi_./index.tsx_webpack-hot-middleware/client?");

/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///ws_(ignored)?");

/***/ }),

/***/ 10:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 11:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 12:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 13:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 14:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 15:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 16:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 5:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 6:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 7:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 8:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///crypto_(ignored)?");

/***/ }),

/***/ 9:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ })

/******/ });
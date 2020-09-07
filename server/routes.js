module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "7e1623e33a72e5df4c35";
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
/******/ 			var chunkId = "routes";
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/server/routes.tsx")(__webpack_require__.s = "./src/server/routes.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/app/calculations.ts":
/*!*********************************!*\
  !*** ./src/app/calculations.ts ***!
  \*********************************/
/*! exports provided: crawlerHash, crawler, shortName, cardColorCSS, blankCard, blankGrid, safeMerge, cadToSats, satsToCad, getMeridienTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crawlerHash", function() { return crawlerHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crawler", function() { return crawler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shortName", function() { return shortName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cardColorCSS", function() { return cardColorCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blankCard", function() { return blankCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blankGrid", function() { return blankGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeMerge", function() { return safeMerge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cadToSats", function() { return cadToSats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "satsToCad", function() { return satsToCad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMeridienTime", function() { return getMeridienTime; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crypto */ "./src/app/crypto.tsx");


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



var satsPerBtc = 100000000; // one hundred million per btc

function crawlerHash(tasks, taskId) {
  return Object(_crypto__WEBPACK_IMPORTED_MODULE_2__["createHash"])(Buffer.from(crawler(tasks, taskId)));
}
function crawler(tasks, taskId) {
  var history = [];
  tasks.forEach(function (task) {
    if (task.taskId === taskId) {
      var _crawler = [taskId];

      var _loop = function _loop() {
        var newCards = [];

        _crawler.forEach(function (t) {
          if (history.indexOf(t) >= 0) return;
          history.push(t);
          var subTask = tasks.filter(function (pst) {
            return pst.taskId === t;
          })[0];

          if (subTask) {
            newCards = newCards.concat(subTask.subTasks).concat(subTask.priorities).concat(subTask.completed);
          }
        });

        _crawler = newCards;
      };

      do {
        _loop();
      } while (_crawler.length > 0);
    }
  });
  return history;
}
function shortName(name) {
  var limit = 280;
  var shortened = name.substring(0, limit);

  if (name.length > limit) {
    shortened += '…';
  }

  return shortened;
}
function cardColorCSS(color) {
  return {
    redwx: color == 'red',
    bluewx: color == 'blue',
    greenwx: color == 'green',
    yellowwx: color == 'yellow',
    purplewx: color == 'purple',
    blackwx: color == 'black'
  };
}
function blankCard(taskId, name, color, created) {
  var deck = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var parents = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  var height = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;
  var width = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : undefined;
  var newCard = {
    taskId: taskId,
    color: color,
    deck: deck,
    name: name.trim(),
    address: '',
    bolt11: '',
    book: {},
    boost: 0,
    priorities: [],
    subTasks: [],
    completed: [],
    parents: parents,
    claimed: [],
    passed: [],
    guild: false,
    created: created,
    lastClaimed: 0,
    completeValue: 0,
    payment_hash: '',
    highlights: [],
    seen: [],
    time: [],
    grid: height >= 1 && width >= 1 ? blankGrid(height, width) : false
  };
  return newCard;
}
function blankGrid() {
  var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var newGrid = {
    height: height,
    width: width,
    rows: {}
  };
  return newGrid;
}

function isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

function safeMerge(cardA, cardZ) {
  // grids are not merged yet
  if (!cardA || !cardZ) {
    console.log('attempt to merge nonexistent card');
    return;
  }

  if (!cardZ.taskId || !isString(cardZ.taskId)) {
    console.log('attempt to merge card with a missing or invalid taskId');
    return;
  }

  if (!cardZ.color) {
    console.log('attempt to merge card without a color');
    return;
  }

  if (isString(cardZ.color) && !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(cardZ.color.trim())) {
    cardA.color = cardZ.color;
  }

  if (isString(cardZ.guild) && !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(cardZ.guild.trim())) {
    cardA.guild = cardZ.guild;
  }

  var filterNull = function filterNull(tasks) {
    return tasks.filter(function (task) {
      return task !== null && task !== undefined;
    });
  };

  cardA.book = cardZ.guild;
  cardA.address = cardZ.guild;
  cardA.bolt11 = cardZ.guild;
  cardA.priorities = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set(cardA.priorities.concat(filterNull(cardZ.priorities))));
  cardA.subTasks = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set(cardA.subTasks.concat(filterNull(cardZ.subTasks))));
  cardA.completed = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set(cardA.completed.concat(filterNull(cardZ.completed))));
  cardA.passed = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set(cardA.passed.concat(filterNull(cardZ.passed)))); // XXX only add in merge for now
  // XXX bolt11 / address need to clearly indicate origin ao
  // XXX book should be a list?
}
function cadToSats(cadAmt, spot) {
  var sats = parseFloat(cadAmt) / parseFloat(spot) * satsPerBtc;
  return parseInt(sats);
}
function satsToCad(sats, spot) {
  var cad = sats * (spot / satsPerBtc);
  return cad.toFixed(2);
}

function calculateMsThisMonth() {
  var today = new Date();
  var daysThisMonth = new Date(today.getYear(), today.getMonth(), 0).getDate();
  return daysThisMonth * 24 * 60 * 60 * 1000;
}

function getMeridienTime(ts) {
  var d = new Date(parseInt(ts));
  var hour24 = d.getHours();
  var rollover = 0;

  if (hour24 >= 24) {
    rollover = 1;
    hour24 %= 24;
  }

  var hour, meridien;

  if (hour24 > 12) {
    meridien = 'pm';
    hour = hour24 - 12;
  } else {
    meridien = 'am';
    hour = hour24;
  }

  var date = d.getDate() + rollover;
  var month = d.getMonth() + 1;
  var minute = d.getMinutes();
  var year = d.getFullYear();
  var weekday = d.toString().slice(0, 3);
  return {
    weekday: weekday,
    year: year,
    month: month,
    date: date,
    hour: hour,
    minute: minute,
    meridien: meridien
  };
}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(satsPerBtc, "satsPerBtc", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(crawlerHash, "crawlerHash", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(crawler, "crawler", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(shortName, "shortName", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(cardColorCSS, "cardColorCSS", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(blankCard, "blankCard", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(blankGrid, "blankGrid", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(isString, "isString", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(safeMerge, "safeMerge", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(cadToSats, "cadToSats", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(satsToCad, "satsToCad", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(calculateMsThisMonth, "calculateMsThisMonth", "/usr/src/app/src/app/calculations.ts");
  reactHotLoader.register(getMeridienTime, "getMeridienTime", "/usr/src/app/src/app/calculations.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/card.tsx":
/*!**************************!*\
  !*** ./src/app/card.tsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AoCard; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-helmet */ "react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ "./src/app/store.ts");






(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





var RenderCard = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(RenderCard, _React$Component);

  var _super = _createSuper(RenderCard);

  function RenderCard(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RenderCard);

    return _super.call(this, props);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RenderCard, [{
    key: "render",
    value: function render() {
      var aoStore = _store__WEBPACK_IMPORTED_MODULE_7__["default"].store;
      var taskId = this.props.taskId;
      var card = aoStore.hashMap.get(taskId);
      var cardText = '';

      if (card.name === taskId) {
        cardText = aoStore.memberById.get(taskId).name;
      } else if (card.guild) {
        cardText = card.guild;
      } else {
        cardText = card.name;
      }

      if (cardText.length > 12) {
        cardText = cardText.substring(0, 12) + '…';
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_6__["Helmet"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("title", null, cardText, " - ", aoStore.state.cash.alias)));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return RenderCard;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

var AoCard = /*#__PURE__*/function (_React$Component2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(AoCard, _React$Component2);

  var _super2 = _createSuper(AoCard);

  function AoCard(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AoCard);

    _this = _super2.call(this, props);
    var aoStore = _store__WEBPACK_IMPORTED_MODULE_7__["default"].store;
    var card = aoStore.hashMap.get(_this.props.match.params.taskId);
    aoStore.setCurrentCard(_this.props.match.params.taskId);
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AoCard, [{
    key: "render",
    value: function render() {
      var aoStore = _store__WEBPACK_IMPORTED_MODULE_7__["default"].store;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(RenderCard, {
        taskId: aoStore.currentCard
      });
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return AoCard;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RenderCard, "RenderCard", "/usr/src/app/src/app/card.tsx");
  reactHotLoader.register(AoCard, "AoCard", "/usr/src/app/src/app/card.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/crypto.tsx":
/*!****************************!*\
  !*** ./src/app/crypto.tsx ***!
  \****************************/
/*! exports provided: createHash, hmacHex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHash", function() { return createHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hmacHex", function() { return hmacHex; });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


function createHash(payload) {
  var sha256 = crypto__WEBPACK_IMPORTED_MODULE_0___default.a.createHash('sha256');
  sha256.update(payload);
  return sha256.digest('hex');
}
function hmacHex(data, signingKey) {
  var hmac = crypto__WEBPACK_IMPORTED_MODULE_0___default.a.createHmac('sha256', signingKey);
  hmac.update(data);
  return hmac.digest('hex');
}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(createHash, "createHash", "/usr/src/app/src/app/crypto.tsx");
  reactHotLoader.register(hmacHex, "hmacHex", "/usr/src/app/src/app/crypto.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/index.tsx":
/*!***************************!*\
  !*** ./src/app/index.tsx ***!
  \***************************/
/*! exports provided: KEY_AUTH_DATA, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_AUTH_DATA", function() { return KEY_AUTH_DATA; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "@babel/runtime/helpers/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login */ "./src/app/login.tsx");
/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hot-loader/root */ "react-hot-loader/root");
/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mobx-react */ "mobx-react");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mobx_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ "./src/app/store.ts");
/* harmony import */ var _member__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./member */ "./src/app/member.tsx");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./card */ "./src/app/card.tsx");



(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};









var KEY_AUTH_DATA = 'KEY_AUTH_DATA';

var ProtectedRoute = function ProtectedRoute(_ref) {
  var Comp = _ref.component,
      loggedIn = _ref.loggedIn,
      path = _ref.path,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["component", "loggedIn", "path"]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    path: path
  }, rest, {
    render: function render(props) {
      return loggedIn ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Comp, props) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
        to: "/login"
      });
    }
  }));
};

var App = Object(mobx_react__WEBPACK_IMPORTED_MODULE_6__["observer"])(__signature__(function () {
  var aoStore = _store__WEBPACK_IMPORTED_MODULE_7__["default"].store;
  console.log("App state: ", aoStore.state);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    return document.body.classList.add('theme-1');
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/login",
    component: _login__WEBPACK_IMPORTED_MODULE_4__["default"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ProtectedRoute, {
    path: "/task/:taskId",
    component: _card__WEBPACK_IMPORTED_MODULE_9__["default"],
    loggedIn: aoStore.state.loggedIn
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ProtectedRoute, {
    path: "/",
    component: _member__WEBPACK_IMPORTED_MODULE_8__["default"],
    loggedIn: aoStore.state.loggedIn,
    exact: true
  }));
}, "useEffect{}"));

var _default = Object(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_5__["hot"])(App);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(KEY_AUTH_DATA, "KEY_AUTH_DATA", "/usr/src/app/src/app/index.tsx");
  reactHotLoader.register(ProtectedRoute, "ProtectedRoute", "/usr/src/app/src/app/index.tsx");
  reactHotLoader.register(App, "App", "/usr/src/app/src/app/index.tsx");
  reactHotLoader.register(_default, "default", "/usr/src/app/src/app/index.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/login.tsx":
/*!***************************!*\
  !*** ./src/app/login.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../client/api */ "./src/client/api.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ "./src/app/store.ts");


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







var Login = function Login() {
  var aoStore = _store__WEBPACK_IMPORTED_MODULE_4__["default"].store;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      user = _useState2[0],
      setUser = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      pass = _useState4[0],
      setPass = _useState4[1];

  var onClick = function onClick(e) {
    _client_api__WEBPACK_IMPORTED_MODULE_3__["default"].createSession(user, pass).then(_client_api__WEBPACK_IMPORTED_MODULE_3__["default"].fetchState).then(function (res) {
      if (!res) {
        setUser('');
      }
    });
  };

  var onKeyDown = function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClick(e);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, !aoStore.state.loggedIn && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("form", {
    onSubmit: onKeyDown
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, "Username:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", {
    value: user,
    type: "text",
    onChange: function onChange(e) {
      return setUser(e.target.value);
    },
    onKeyDown: onKeyDown
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, "Password:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("input", {
    value: pass,
    type: "password",
    onChange: function onChange(e) {
      return setPass(e.target.value);
    },
    onKeyDown: onKeyDown
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("button", {
    type: "button",
    onClick: onClick
  }, "Login")), aoStore.state.loggedIn && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], {
    to: "/"
  }));
};

__signature__(Login, "useState{[user, setUser]('')}\nuseState{[pass, setPass]('')}");

var _default = Login;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Login, "Login", "/usr/src/app/src/app/login.tsx");
  reactHotLoader.register(_default, "default", "/usr/src/app/src/app/login.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/member.tsx":
/*!****************************!*\
  !*** ./src/app/member.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/app/store.ts");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





var AoMember = function AoMember() {
  var aoStore = _store__WEBPACK_IMPORTED_MODULE_1__["default"].store;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], {
    to: '/task/' + aoStore.member.memberId
  });
};

var _default = AoMember;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AoMember, "AoMember", "/usr/src/app/src/app/member.tsx");
  reactHotLoader.register(_default, "default", "/usr/src/app/src/app/member.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/mutations.tsx":
/*!*******************************!*\
  !*** ./src/app/mutations.tsx ***!
  \*******************************/
/*! exports provided: applyEvent, setCurrent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyEvent", function() { return applyEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCurrent", function() { return setCurrent; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _calculations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calculations */ "./src/app/calculations.ts");


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




function aoMuts(aos, ev) {
  switch (ev.type) {
    case 'ao-linked':
      aos.forEach(function (ao, i) {
        if (ao.address === ev.address) {
          ao.links.push(ev.taskId);
        }
      });
      break;

    case 'ao-inbound-connected':
      var inAddressConnect = aos.some(function (a) {
        if (a.address === ev.address) {
          a.inboundSecret = ev.secret;
          a.lastContact = Date.now();
          return true;
        }
      });

      if (!inAddressConnect) {
        var newEv = {
          address: ev.address,
          outboundSecret: false,
          inboundSecret: ev.secret,
          lastContact: Date.now(),
          links: []
        };
        aos.push(newEv);
      }

      break;

    case 'ao-outbound-connected':
      var outAddressConnect = aos.some(function (a) {
        if (a.address === ev.address) {
          a.outboundSecret = ev.secret;
          a.lastContact = Date.now();
          return true;
        }
      });

      if (!outAddressConnect) {
        var _newEv = {
          address: ev.address,
          outboundSecret: ev.secret,
          inboundSecret: false,
          lastContact: Date.now(),
          links: []
        };
        aos.push(_newEv);
      }

      break;

    case 'ao-disconnected':
      aos.forEach(function (ao, i) {
        if (ao.address === ev.address) {
          aos.splice(i, 1);
        }
      });
      break;
  }
}

function cashMuts(cash, ev) {
  switch (ev.type) {
    case 'ao-named':
      cash.alias = ev.alias;
      break;

    case 'spot-updated':
      cash.spot = ev.spot;
      break;

    case 'currency-switched':
      cash.currency = ev.currency;
      break;

    case 'rent-set':
      cash.rent = parseFloat(ev.amount);
      break;

    case 'cap-set':
      cash.cap = ev.amount;
      break;

    case 'funds-set':
      cash.outputs = ev.outputs;
      cash.channels = ev.channels;
      break;

    case 'task-boosted':
      cash.usedTxIds.push(ev.txid);
      break;

    case 'task-boosted-lightning':
      cash.pay_index = ev.pay_index;
      break;

    case 'get-node-info':
      cash.info = ev.info;
      break;
  }
}

function membersMuts(members, ev) {
  switch (ev.type) {
    case 'ao-outbound-connected':
      break;

    case 'ao-disconnected':
      break;

    case 'member-created':
      ev.lastUsed = ev.timestamp;
      ev.muted = true;
      members.push(ev);
      break;

    case 'member-activated':
      members.forEach(function (member) {
        if (member.memberId === ev.memberId) {
          if (member.active < 0) {
            member.active = -1 * member.active;
          } else {
            member.active++;
          }
        }
      });
      break;

    case 'task-boosted':
      members.forEach(function (member) {
        if (member.memberId === ev.taskId) {
          if (member.active < 0) {
            member.active = -1 * member.active;
          } else {
            member.active++;
          }
        }
      });
      break;

    case 'task-boosted-lightning':
      members.forEach(function (member) {
        if (member.memberId === ev.taskId) {
          if (member.active < 0) {
            member.active = -1 * member.active;
          } else {
            member.active++;
          }
        }
      });
      break;

    case 'member-deactivated':
      members.forEach(function (member) {
        if (member.memberId === ev.memberId) {
          if (member.active >= 0) {
            member.active = -1 * member.active - 1;
          }
        }
      });
      break;

    case 'member-purged':
      for (var i = members.length - 1; i >= 0; i--) {
        var member = members[i];

        if (member.memberId === ev.memberId) {
          members.splice(i, 1);
        }
      }

      break;

    case 'resource-used':
      members.forEach(function (member) {
        if (member.memberId === ev.memberId) {
          member.lastUsed = ev.timestamp;
        }
      });
      break;

    case 'member-field-updated':
      members.forEach(function (member) {
        if (member.memberId === ev.memberId) {
          member[ev.field] = ev.newfield;
        }
      });
      break;

    case 'member-ticker-set':
      members.forEach(function (member) {
        if (member.memberId === ev.memberId) {
          if (!member.tickers) {
            member.tickers = [];
          }

          if (!ev.symbol || ev.symbol.trim().length < 1) {
            member.tickers.splice(ev.index, 1);
          } else {
            member.tickers[ev.index] = ev.symbol.trim().toLowerCase();
          }
        }
      });
      break;

    case 'doge-barked':
      members.forEach(function (member) {
        // this should only bump up for mutual doges
        if (member.memberId === ev.memberId) {
          member.lastUsed = ev.timestamp; // then bark
        }
      });
      break;

    case 'doge-muted':
      members.forEach(function (member) {
        if (member.memberId === ev.memberId) {
          member.muted = true;
        }
      });
      break;

    case 'doge-unmuted':
      members.forEach(function (member) {
        if (member.memberId === ev.memberId) {
          member.muted = false;
        }
      });
      break;
  }
}

function resourcesMuts(resources, ev) {
  switch (ev.type) {
    case 'resource-created':
      var resourceIds = resources.map(function (r) {
        return r.resourceId;
      });

      if (resourceIds.indexOf(ev.resourceId) === -1) {
        resources.push(ev);
      } else {
        console.log('BAD data duplicate resource rejected in mutation, dup resource task likely created');
      }

      break;

    case 'resource-used':
      resources.forEach(function (resource) {
        if (resource.resourceId == ev.resourceId) {
          resource.stock -= parseInt(ev.amount);
        }
      });
      break;

    case 'resource-purged':
      resources.forEach(function (r, i) {
        if (r.resourceId === ev.resourceId) {
          resources.splice(i, 1);
        }
      });
      break;

    case 'resource-stocked':
      resources.forEach(function (resource) {
        if (resource.resourceId == ev.resourceId) {
          resource.stock += parseInt(ev.amount);
        }
      });
      break;

    case 'channel-created':
      resources.forEach(function (r, i) {
        if (r.resourceId == ev.resourceId) {
          r.pubkey = ev.pubkey;
        }
      });
      break;
  }
}

function memesMuts(memes, ev) {
  switch (ev.type) {
    case 'meme-added':
      var fileHash = ev.data;

      if (!memes.some(function (file) {
        return file.hash === ev.hash;
      })) {
        memes.push({
          memeId: ev.taskId,
          filename: ev.filename,
          hash: ev.hash,
          filetype: ev.filetype
        });
        console.log('added meme file: ', ev.filename);
      } else {
        console.log('meme file already in state: ', ev.filename);
      }

      break;
  }
}

function sessionsMuts(sessions, ev) {
  switch (ev.type) {
    case 'session-created':
      var idHasSession = sessions.some(function (session) {
        // replace that sessions creds,
        var match = false;

        if (session.ownerId === ev.ownerId) {
          match = true;

          lodash__WEBPACK_IMPORTED_MODULE_1___default.a.merge(session, ev);
        }

        return match; // true terminates the some loop & idHasSession->true too
      });

      if (idHasSession) {// edited in session
      } else {
        // id didn't previously have session
        sessions.push(ev);
      }

      break;

    case 'session-killed':
      sessions.forEach(function (s, i) {
        if (s.session == ev.session) {
          lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pullAt(sessions, i);
        }
      });
      break;

    case 'ao-outbound-connected':
      sessions.push({
        ownerId: ev.address,
        token: ev.secret,
        session: ev.address
      });
      break;
  }
}

function tasksMuts(tasks, ev) {
  switch (ev.type) {
    case 'highlighted':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          var didUpdateInline = false;
          task.highlights.forEach(function (h, i) {
            if (h.memberId === ev.memberId) {
              didUpdateInline = true;

              if (h.valence === ev.valence) {
                task.highlights.splice(i, 1);
              } else {
                h.valence = ev.valence;
              }
            }
          });

          if (!didUpdateInline) {
            task.highlights.push({
              memberId: ev.memberId,
              valence: ev.valence
            });
          }
        }
      });
      break;

    case 'ao-outbound-connected':
      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__["blankCard"](ev.address, ev.address, 'purple', ev.timestamp));
      break;

    case 'ao-disconnected':
      break;

    case 'resource-created':
      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__["blankCard"](ev.resourceId, ev.resourceId, 'red', ev.timestamp));
      break;

    case 'member-created':
      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__["blankCard"](ev.memberId, ev.memberId, 'blue', ev.timestamp));
      break;

    case 'member-purged':
      break;

    case 'meme-added':
      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__["blankCard"](ev.taskId, ev.filename, 'yellow', ev.timestamp));
      break;

    case 'task-created':
      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__["blankCard"](ev.taskId, ev.name, ev.color, ev.timestamp, ev.deck, ev.inId ? [ev.inId] : []));
      tasks.forEach(function (task) {
        if (task.taskId === ev.inId) {
          if (ev.prioritized) {
            task.priorities = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {
              return tId !== ev.taskId;
            });
            task.priorities.push(ev.taskId);
          } else {
            task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {
              return tId !== ev.taskId;
            });
            task.subTasks.push(ev.taskId);
          }
        }
      });
      break;

    case 'address-updated':
      tasks.forEach(function (t) {
        if (t.taskId === ev.taskId) {
          t.address = ev.address;
        }
      });
      break;

    case 'task-passed':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          var pass = [ev.fromMemberId, ev.toMemberId];

          if (!task.passed.some(function (p) {
            return p[0] === pass[0] && p[1] === pass[1];
          })) {
            task.passed.push(pass);
          }
        }
      });
      break;

    case 'task-grabbed':
      // First make sure they have a valid member card to grab with,
      // since it will show up on the "Where is this card" list
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {
            return d[1] !== ev.memberId;
          });

          if (task.deck.indexOf(ev.memberId) === -1) {
            if (ev.taskId !== ev.memberId && ev.memberId) {
              task.deck.push(ev.memberId);
            }
          }
        }
      });
      break;

    case 'task-seen':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          if (!task.seen) {
            task.seen = [];
          }

          if (!task.seen.some(function (t) {
            return t.memberId === ev.memberId;
          })) {
            task.seen.push({
              memberId: ev.memberId,
              timestamp: Date.now()
            });
          }
        }
      });
      break;

    case 'task-time-clocked':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          var found = task.time.find(function (t) {
            return t.memberId === ev.memberId;
          });

          if (!found) {
            task.time.push({
              memberId: ev.memberId,
              timelog: [ev.seconds],
              date: [ev.date]
            });
          } else {
            if (!found.timelog) {
              found.timelog = [];
            }

            if (!found.date) {
              found.date = [];

              if (found.timelog.length > found.date.length) {
                var count = found.timelog.length - found.date.length;

                while (count > 0) {
                  found.date.push(null);
                  count--;
                }
              }
            }

            found.timelog.push(ev.seconds);
            found.date.push(ev.date);
          }
        }
      });
      break;

    case 'pile-grabbed':
      if (!ev.memberId) {
        break;
      }

      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          (function () {
            task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {
              return d[1] !== ev.memberId;
            });
            var crawler = [ev.taskId];
            var history = [];
            var newCards = [];

            do {
              newCards = [];
              crawler.forEach(function (t) {
                if (history.indexOf(t) >= 0) return;
                var subTask = tasks.filter(function (pst) {
                  return pst.taskId === t;
                });

                if (subTask.length < 1) {
                  // console.log(
                  //   'missing subtask, this is messy. parent task name: ',
                  //   task.name
                  // )
                  return;
                }

                if (subTask.length > 1) {
                  console.log('duplicate task found, this is very bad');
                }

                subTask = subTask[0];

                if (subTask === undefined || subTask.subTasks === undefined || subTask.priorities === undefined || subTask.completed === undefined) {
                  console.log('invalid task data found, this is very bad');
                  return;
                }

                history.push(t);

                if (subTask.deck.indexOf(ev.memberId) === -1 && ev.taskId !== ev.memberId) {
                  subTask.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(subTask.passed, function (d) {
                    return d[1] !== ev.memberId;
                  });
                  subTask.deck.push(ev.memberId);
                }

                newCards = newCards.concat(subTask.subTasks).concat(subTask.priorities).concat(subTask.completed);
              });
              crawler = newCards;
            } while (crawler.length > 0);
          })();
        }
      });
      break;

    case 'task-dropped':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          task.deck = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.deck, function (d) {
            return d !== ev.memberId;
          });
        }
      });
      break;

    case 'pile-dropped':
      if (!ev.memberId) {
        break;
      }

      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          (function () {
            task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {
              return d[1] !== ev.memberId;
            });
            var crawler = [ev.taskId];
            var history = [];
            var newCards = [];

            do {
              newCards = [];
              crawler.forEach(function (t) {
                if (history.indexOf(t) >= 0) return;
                var subTask = tasks.filter(function (pst) {
                  return pst.taskId === t;
                });

                if (subTask.length < 1) {
                  console.log('missing subtask, this is messy');
                  return;
                }

                if (subTask.length > 1) {
                  console.log('duplicate task found, this is very bad');
                }

                subTask = subTask[0];

                if (subTask === undefined || subTask.subTasks === undefined || subTask.priorities === undefined || subTask.completed === undefined) {
                  console.log('invalid task data found, this is very bad');
                  return;
                }

                history.push(t);

                if (subTask.deck.indexOf(ev.memberId) >= 0 && ev.taskId !== ev.memberId) {
                  subTask.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(subTask.passed, function (d) {
                    return d[1] !== ev.memberId;
                  });
                  subTask.deck = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(subTask.deck, function (d) {
                    return d !== ev.memberId;
                  });
                }

                newCards = newCards.concat(subTask.subTasks).concat(subTask.priorities).concat(subTask.completed);
              });
              crawler = newCards;
            } while (crawler.length > 0);
          })();
        }
      });
      break;

    case 'member-purged':
      for (var i = tasks.length - 1; i >= 0; i--) {
        var _task = tasks[i];

        if (_task.taskId === ev.memberId) {
          tasks.splice(i, 1);
        }
      }

      tasks.forEach(function (t, j) {
        t.subTasks = t.subTasks.filter(function (st) {
          return st !== ev.memberId;
        });
        t.priorities = t.priorities.filter(function (st) {
          return st !== ev.memberId;
        });
        t.completed.filter(function (st) {
          return st !== ev.memberId;
        });
        t.claimed = t.claimed.filter(function (st) {
          return st !== ev.memberId;
        });
        t.deck = t.deck.filter(function (st) {
          return st !== ev.memberId;
        });
        t.passed = t.passed.filter(function (p) {
          return !(p[0] === ev.memberId || p[1] === ev.memberId);
        });

        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(t, 'grid.rows')) {
          Object.entries(t.grid.rows).forEach(function (_ref) {
            var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 2),
                y = _ref2[0],
                row = _ref2[1];

            Object.entries(row).forEach(function (_ref3) {
              var _ref4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref3, 2),
                  x = _ref4[0],
                  cell = _ref4[1];

              if (cell === ev.memberId) {
                delete tasks[j].grid.rows[y][x];
              }
            });

            if (row.length === 0) {
              delete tasks[j].grid.rows[y];
            }
          });
        }
      });
      break;

    case 'task-removed':
      for (var _i = tasks.length - 1; _i >= 0; _i--) {
        var _task2 = tasks[_i];

        if (_task2.taskId === ev.taskId) {
          tasks.splice(_i, 1);
        }
      }

      tasks.forEach(function (t, i) {
        t.subTasks = t.subTasks.filter(function (st) {
          return st !== ev.taskId;
        });
        t.priorities = t.priorities.filter(function (st) {
          return st !== ev.taskId;
        });
        t.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(t.completed, function (st) {
          return st !== ev.taskId;
        });

        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(t, 'grid.rows')) {
          Object.entries(t.grid.rows).forEach(function (_ref5) {
            var _ref6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref5, 2),
                y = _ref6[0],
                row = _ref6[1];

            Object.entries(row).forEach(function (_ref7) {
              var _ref8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref7, 2),
                  x = _ref8[0],
                  cell = _ref8[1];

              if (cell === ev.taskId) {
                delete tasks[i].grid.rows[y][x];
              }
            });

            if (row.length === 0) {
              delete tasks[i].grid.rows[y];
            }
          });
        }
      });
      break;

    case 'tasks-removed':
      for (var _i2 = tasks.length - 1; _i2 >= 0; _i2--) {
        var _task3 = tasks[_i2];

        if (ev.taskIds.includes(_task3.taskId)) {
          tasks.splice(_i2, 1);
        }
      }

      tasks.forEach(function (t, i) {
        t.subTasks = t.subTasks.filter(function (st) {
          return !ev.taskIds.includes(st);
        });
        t.priorities = t.priorities.filter(function (st) {
          return !ev.taskIds.includes(st);
        });
        t.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(t.completed, function (st) {
          return !ev.taskIds.includes(st);
        });

        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(t, 'grid.rows')) {
          Object.entries(t.grid.rows).forEach(function (_ref9) {
            var _ref10 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref9, 2),
                y = _ref10[0],
                row = _ref10[1];

            Object.entries(row).forEach(function (_ref11) {
              var _ref12 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref11, 2),
                  x = _ref12[0],
                  cell = _ref12[1];

              if (ev.taskIds.includes(cell)) {
                delete tasks[i].grid.rows[y][x];
              }
            });

            if (row.length === 0) {
              delete tasks[i].grid.rows[y];
            }
          });
        }
      });
      break;

    case 'task-prioritized':
      tasks.forEach(function (task) {
        if (task.taskId === ev.inId) {
          task.priorities = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.priorities, function (taskId) {
            return taskId !== ev.taskId;
          });
          task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (taskId) {
            return taskId !== ev.taskId;
          });
          task.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.completed, function (taskId) {
            return taskId !== ev.taskId;
          }); // if (ev.position) {
          //   task.priorities = task.priorities.splice(ev.position, 0, ev.taskId)
          // } else {
          // console.log('task-prioritized position is ', ev.position)

          task.priorities.push(ev.taskId); // }
        }

        if (task.taskId === ev.taskId) {
          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'parents') || !Array.isArray(task.parents)) {
            task.parents = [];
          }

          if (!task.parents.some(function (pId) {
            return pId === ev.inId;
          })) {
            task.parents.push(ev.inId);
          }
        }
      });
      break;

    case 'pile-prioritized':
      tasks.forEach(function (task) {
        if (task.taskId === ev.inId) {
          task.priorities = task.priorities.concat(task.subTasks);
          task.subTasks = [];
        }
      });
      break;

    case 'task-refocused':
      var claimed;
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          claimed = task.claimed;
        }
      });
      tasks.forEach(function (task) {
        if (task.taskId === ev.inId) {
          task.priorities = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.priorities, function (taskId) {
            return taskId !== ev.taskId;
          });
          task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (taskId) {
            return taskId !== ev.taskId;
          });

          if (claimed && claimed.length >= 1) {
            if (!task.completed.some(function (tId) {
              return tId === ev.taskId;
            })) {
              task.completed.push(ev.taskId);
            }
          } else if (claimed !== undefined) {
            task.subTasks.push(ev.taskId);
          }
        }
      });
      break;

    case 'pile-refocused':
      tasks.forEach(function (task) {
        if (task.taskId === ev.inId) {
          task.priorities.forEach(function (stId) {
            tasks.forEach(function (st) {
              if (st.taskId === stId) {
                if (st.claimed && st.claimed.length >= 1) {
                  task.completed.push(stId);
                } else {
                  task.subTasks.push(stId);
                }
              }
            });
            task.priorities = [];
          });
        }
      });
      break;

    case 'task-sub-tasked':
      // I think the spec is only run on event creation, not load from database,
      // so make sure the task exists before linking to it from another card
      var taskExists = false;
      tasks.forEach(function (task) {
        if (task.taskId === ev.subTask) {
          taskExists = true;
          task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {
            return d[1] !== ev.memberId;
          });

          if (ev.memberId && task.deck.indexOf(ev.memberId) === -1) {
            if (ev.subTask !== ev.memberId) {
              task.deck.push(ev.memberId);
            }
          }

          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'parents') || !Array.isArray(task.parents)) {
            console.log('Task with missing parents found in task-sub-tasked. This should never happen.');
            task.parents = [];
          }

          if (!task.parents.some(function (pId) {
            return pId === ev.taskId;
          })) {
            task.parents.push(ev.taskId);
          }
        }
      });

      if (taskExists) {
        tasks.forEach(function (task) {
          if (task.taskId === ev.taskId) {
            task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {
              return tId !== ev.subTask;
            });
            task.subTasks.push(ev.subTask);
          }
        });
      }
      /*else { */
      // console.log(
      //   'A task with references to subTasks that are missing was found in an event in the database. This should have been filtered before storing.'
      // )
      // }


      break;

    case 'task-de-sub-tasked':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {
            return d[1] !== ev.memberId;
          });
          task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {
            return tId !== ev.subTask;
          });
          task.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.completed, function (tId) {
            return tId !== ev.subTask;
          });
        }

        if (task.taskId === ev.subTask) {
          task.parents = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.parents, function (tId) {
            return tId !== ev.taskId;
          });
        }
      });
      break;

    case 'task-guilded':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          task.guild = ev.guild;
        }
      });
      break;

    case 'task-valued':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          task.completeValue = Number(ev.value);
        }
      });
      break;

    case 'task-colored':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          task.color = ev.color;
        }

        if (ev.inId && task.taskId === ev.inId) {
          task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (tId) {
            return tId !== ev.taskId;
          });
          task.subTasks.push(ev.taskId);
        }
      });
      break;

    case 'task-claimed':
      var bounty = 0;
      tasks.forEach(function (task) {
        // let found = false
        if (task.taskId === ev.memberId) {
          task.boost += parseFloat(ev.paid);
        } // task.priorities.some(taskId => {
        //   if (taskId !== ev.taskId) {
        //     return false
        //   } else {
        //     found = true
        //     return true
        //   }
        // })
        // task.subTasks.some(taskId => {
        //   if (taskId !== ev.taskId) {
        //     return false
        //   } else {
        //     found = true
        //     return true
        //   }
        // })
        // if (found) {
        //   if (task.priorities.indexOf(ev.taskId) === -1) {
        //     task.subTasks = _.filter(task.subTasks, tId => tId !== ev.subTask)
        //     task.completed = _.filter(task.completed, tId => tId !== ev.subTask)
        //     task.completed.push(ev.taskId)
        //   }
        // }


        if (task.taskId === ev.taskId) {
          task.passed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.passed, function (d) {
            return d[1] !== ev.memberId;
          });

          if (task.deck.indexOf(ev.memberId) === -1) {
            if (ev.taskId !== ev.memberId && ev.memberId) {
              task.deck.push(ev.memberId);
            }
          }

          if (task.claimed.indexOf(ev.memberId) === -1) {
            task.claimed.push(ev.memberId);
          }

          task.lastClaimed = ev.timestamp;
        }
      });
      break;

    case 'task-unclaimed':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          task.claimed = task.claimed.filter(function (mId) {
            return mId !== ev.memberId;
          });

          if (task.claimed.length < 1) {
            tasks.forEach(function (p) {
              if (p.priorities.indexOf(ev.taskId) === -1 && p.completed.indexOf(ev.taskId) > -1) {
                p.completed = p.completed.filter(function (taskId) {
                  return taskId !== ev.taskId;
                });
                p.subTasks = p.subTasks.filter(function (taskId) {
                  return taskId !== ev.taskId;
                });
                p.subTasks.push(ev.taskId);
              }
            });
          }
        }
      });
      break;

    case 'task-boosted':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          var amount = parseFloat(ev.amount);
          var boost = parseFloat(task.boost);

          if (amount > 0) {
            task.boost = amount + boost;
            task.address = '';
          }
        }
      });
      break;

    case 'task-boosted-lightning':
      tasks.forEach(function (task) {
        if (task.payment_hash === ev.payment_hash) {
          var amount = parseFloat(ev.amount);
          var boost = parseFloat(task.boost);

          if (amount > 0) {
            task.boost = amount + boost;
            task.bolt11 = '';
            task.payment_hash = '';
          }
        }
      });
      break;

    case 'resource-booked':
      tasks.forEach(function (task) {
        if (task.taskId === ev.resourceId) {
          task.book = ev;
        }
      });
      break;

    case 'resource-used':
      tasks.forEach(function (task) {
        var charged = parseFloat(ev.charged);

        if (charged > 0) {
          if (task.taskId === ev.memberId) {
            task.boost -= charged;
          }

          if (task.taskId === ev.resourceId) {
            task.boost += charged;
          }
        }
      });
      break;

    case 'invoice-created':
      tasks.forEach(function (task) {
        if (task.taskId === ev.taskId) {
          task.payment_hash = ev.payment_hash;
          task.bolt11 = ev.bolt11;
        }
      });
      break;

    case 'task-swapped':
      var task;
      tasks.forEach(function (t) {
        if (t.taskId === ev.taskId) {
          task = t;
        }
      });

      if (task) {
        var originalIndex = task.subTasks.indexOf(ev.swapId1);
        var swapIndex = task.subTasks.indexOf(ev.swapId2);
        var originalIndexCompleted = task.completed.indexOf(ev.swapId1);
        var swapIndexCompleted = task.completed.indexOf(ev.swapId2);

        if (originalIndex > -1 && swapIndex > -1) {
          var newST = task.subTasks.slice();
          newST[originalIndex] = ev.swapId2;
          newST[swapIndex] = ev.swapId1;
          task.subTasks = newST;
        }

        if (originalIndexCompleted > -1 && swapIndexCompleted > -1) {
          var newCompleted = task.completed.slice();
          newCompleted[originalIndexCompleted] = ev.swapId2;
          newCompleted[swapIndexCompleted] = ev.swapId1;
          task.completed = newCompleted;
        }
      }

      break;

    case 'task-bumped':
      var taskB;
      tasks.forEach(function (t) {
        if (t.taskId === ev.taskId) {
          taskB = t;
        }
      });

      if (taskB) {
        var _originalIndex = taskB.subTasks.indexOf(ev.bumpId);

        var _originalIndexCompleted = taskB.completed.indexOf(ev.bumpId);

        if (_originalIndex === taskB.subTasks.length - 1 && ev.direction === -1) {
          var _newST = [ev.bumpId];
          _newST = _newST.concat(taskB.subTasks.slice(0, taskB.subTasks.length - 1));
          taskB.subTasks = _newST;
        }

        if (_originalIndex === 0 && ev.direction === 1) {
          var _newST2 = taskB.subTasks.slice(1);

          _newST2.push(ev.bumpId);

          taskB.subTasks = _newST2;
        }
      }

      break;

    case 'tasks-received':
      var startLength = tasks.length;
      var changedIndexes = [];
      ev.tasks.forEach(function (newT) {
        if (!tasks.some(function (cur, i) {
          if (cur.taskId === newT.taskId) {
            _calculations__WEBPACK_IMPORTED_MODULE_2__["safeMerge"](cur, newT);
            changedIndexes.push(i);
            return true;
          }
        })) {
          var safeClone = _calculations__WEBPACK_IMPORTED_MODULE_2__["blankCard"](newT.taskId, newT.name, newT.color, newT.timestamp, newT.parents, newT.height);
          _calculations__WEBPACK_IMPORTED_MODULE_2__["safeMerge"](safeClone, newT);
          tasks.push(safeClone);
          changedIndexes.push(tasks.length - 1);
        }
      }); // Loop through the new cards and remove invalid references to cards that don't exist on this server

      changedIndexes.forEach(function (tId) {
        var t = tasks[tId];
        var beforeLength = t.subTasks.length;
        var filtered = [];
        t.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(t.subTasks, function (stId) {
          if (tasks.some(function (sst) {
            return sst.taskId === stId;
          })) {
            filtered.push(stId);
            return true;
          }

          return false;
        });
        t.priorities = t.priorities.filter(function (stId) {
          return tasks.some(function (sst) {
            return sst.taskId === stId;
          });
        });
        t.completed = t.completed.filter(function (stId) {
          return tasks.some(function (sst) {
            return sst.taskId === stId;
          });
        });
        t.deck = t.deck.filter(function (stId) {
          return tasks.some(function (sst) {
            return sst.taskId === stId && sst.taskId === sst.name;
          });
        }); // Grids are not received yet (because they did not exist when p2p AO was previously implemented)
        // so they do not need to be checked for valid references to other cards (yet)
      });
      break;

    case 'member-charged':
      tasks.forEach(function (task) {
        if (task.taskId === ev.memberId) {
          task.boost -= parseFloat(ev.charged);

          if (task.boost < 0) {
            task.boost = 0;
          }
        }
      });
      break;

    case 'grid-created':
      tasks.push(_calculations__WEBPACK_IMPORTED_MODULE_2__["blankCard"](ev.taskId, ev.name, ev.color, ev.timestamp, ev.deck, ev.height, ev.width));
      break;

    case 'grid-added':
      tasks.forEach(function (task, i) {
        if (task.taskId === ev.taskId) {
          task.grid = _calculations__WEBPACK_IMPORTED_MODULE_2__["blankGrid"](ev.height, ev.width);
        }
      });
      break;

    case 'grid-resized':
      tasks.forEach(function (task, i) {
        if (task.taskId === ev.taskId) {
          if (!task.grid) {
            task.grid = _calculations__WEBPACK_IMPORTED_MODULE_2__["blankGrid"](ev.height, ev.width);
          }

          task.grid.height = ev.height;
          task.grid.width = ev.width;
          Object.entries(task.grid.rows).forEach(function (_ref13) {
            var _ref14 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref13, 2),
                y = _ref14[0],
                row = _ref14[1];

            Object.entries(row).forEach(function (_ref15) {
              var _ref16 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref15, 2),
                  x = _ref16[0],
                  cell = _ref16[1];

              if (x >= ev.width || y >= ev.height) {
                tasks.forEach(function (st) {
                  if (st.taskId === cell) {
                    task.subTasks = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.subTasks, function (taskId) {
                      return taskId !== cell;
                    });
                    task.completed = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(task.completed, function (taskId) {
                      return taskId !== cell;
                    });

                    if (st.claimed && st.claimed.length >= 1) {
                      task.completed.push(cell);
                    } else {
                      task.subTasks.unshift(cell);
                    }
                  }
                });
                delete tasks[i].grid.rows[y][x];
              }
            });

            if (row.length === 0) {
              delete tasks[i].grid.rows[y];
            }
          });
        }
      });
      break;

    case 'grid-pin':
      tasks.forEach(function (task, i) {
        if (task.taskId === ev.inId) {
          if (!task.grid) {
            task.grid = _calculations__WEBPACK_IMPORTED_MODULE_2__["blankGrid"]();
          }

          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'grid.rows.' + ev.y)) {
            tasks[i].grid.rows[ev.y] = {};
          }

          tasks[i].grid.rows[ev.y][ev.x] = ev.taskId;
        } // Same as task-sub-tasked: Grab the card and removed the pass from it, if any. And add parents.


        if (task.taskId === ev.taskId) {
          // task.passed = _.filter(task.passed, d => d[1] !== ev.memberId)
          // if (ev.memberId && task.deck.indexOf(ev.memberId) === -1) {
          //   if (ev.taskId !== ev.memberId) {
          //     task.deck.push(ev.memberId)
          //   }
          // }
          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'parents') || !Array.isArray(task.parents)) {
            task.parents = [];
          }

          if (!task.parents.some(function (pId) {
            return pId === ev.inId;
          })) {
            task.parents.push(ev.inId);
          }
        }

        task.subTasks = task.subTasks.filter(function (st) {
          return st !== ev.taskId;
        });
      });
      break;

    case 'grid-unpin':
      tasks.some(function (task, i) {
        if (task.taskId == ev.inId) {
          if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(task, 'grid.rows.' + ev.y)) {
            return false;
          }

          var gridTaskId = tasks[i].grid.rows[ev.y][ev.x];
          delete tasks[i].grid.rows[ev.y][ev.x];

          if (task.grid.rows[ev.y].length == 0) {
            delete tasks[i].grid.rows[ev.y];
          }

          if (tasks.some(function (t) {
            return t.taskId === gridTaskId;
          })) {
            task.subTasks = task.subTasks.filter(function (st) {
              return st !== gridTaskId;
            });
            task.subTasks.unshift(gridTaskId);
          }

          return true;
        }
      });
      break;
  }
}

function applyEvent(state, ev) {
  cashMuts(state.cash, ev);
  membersMuts(state.members, ev);
  resourcesMuts(state.resources, ev);
  memesMuts(state.memes, ev);
  sessionsMuts(state.sessions, ev);
  tasksMuts(state.tasks, ev);
  aoMuts(state.ao, ev);
}

function setCurrentCash(cash, current) {
  cash.alias = current.cash.alias;
  cash.address = current.cash.address;
  cash.spot = current.cash.spot;
  cash.currency = current.cash.currency;
  cash.rent = current.cash.rent;
  cash.cap = current.cash.cap;
  cash.usedTxIds = current.cash.usedTxIds;
  cash.outputs = current.cash.outputs;
  cash.channels = current.cash.channels;
  cash.info = current.cash.info;
  cash.pay_index = current.cash.pay_index;
}

function setCurrentTasks(tasks, current) {
  tasks.forEach(function (task, i) {
    delete tasks[i];
  });
  tasks.length = 0;
  current.tasks.forEach(function (task) {
    tasks.push(task); // _.assign(tasks[index].grid, task.grid) // does not solve the +grid not rerendering glitch... or does it?
  });
}

function setCurrentSessions(sessions, current) {
  sessions.length = 0;
  current.sessions.forEach(function (session) {
    sessions.push(session);
  });
}

function setCurrentAO(aos, current) {
  aos.length = 0;
  current.ao.forEach(function (a) {
    aos.push(a);
  });
}

function setCurrentMembers(members, current) {
  members.length = 0;
  current.members.forEach(function (member) {
    members.push(member);
  });
}

function setCurrentResources(resources, current) {
  resources.length = 0;
  current.resources.forEach(function (resource) {
    resources.push(resource);
  });
}

function setCurrentMemes(memes, current) {
  memes.length = 0;

  if (!current.memes) {
    current.memes = [];
  }

  current.memes.forEach(function (meme) {
    memes.push(meme);
  });
}

function setCurrent(state, current) {
  setCurrentCash(state.cash, current);
  setCurrentTasks(state.tasks, current);
  setCurrentSessions(state.sessions, current);
  setCurrentAO(state.ao, current);
  setCurrentMembers(state.members, current);
  setCurrentResources(state.resources, current);
  setCurrentMemes(state.memes, current);
}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(aoMuts, "aoMuts", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(cashMuts, "cashMuts", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(membersMuts, "membersMuts", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(resourcesMuts, "resourcesMuts", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(memesMuts, "memesMuts", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(sessionsMuts, "sessionsMuts", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(tasksMuts, "tasksMuts", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(applyEvent, "applyEvent", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(setCurrentCash, "setCurrentCash", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(setCurrentTasks, "setCurrentTasks", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(setCurrentSessions, "setCurrentSessions", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(setCurrentAO, "setCurrentAO", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(setCurrentMembers, "setCurrentMembers", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(setCurrentResources, "setCurrentResources", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(setCurrentMemes, "setCurrentMemes", "/usr/src/app/src/app/mutations.tsx");
  reactHotLoader.register(setCurrent, "setCurrent", "/usr/src/app/src/app/mutations.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/store.ts":
/*!**************************!*\
  !*** ./src/app/store.ts ***!
  \**************************/
/*! exports provided: serverState, pubState, AoStore, applyBackup, removeSensitive, default, createAoStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverState", function() { return serverState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pubState", function() { return pubState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoStore", function() { return AoStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyBackup", function() { return applyBackup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSensitive", function() { return removeSensitive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAoStore", function() { return createAoStore; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/applyDecoratedDescriptor */ "@babel/runtime/helpers/applyDecoratedDescriptor");
/* harmony import */ var _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mobx */ "mobx");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mutations */ "./src/app/mutations.tsx");





var _dec, _dec2, _dec3, _class, _temp;

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




var serverState = {
  ao: [],
  sessions: [],
  members: [],
  tasks: [],
  resources: [],
  memes: [],
  cash: {
    address: '',
    alias: '',
    currency: 'CAD',
    spot: 0,
    rent: 0,
    cap: 75,
    pay_index: 0,
    usedTxIds: [],
    outputs: [],
    channels: [],
    info: {}
  }
};
var pubState = {
  ao: [],
  sessions: [],
  members: [],
  tasks: [],
  resources: [],
  memes: [],
  cash: {
    address: '',
    alias: '',
    currency: 'CAD',
    spot: 0,
    rent: 0,
    cap: 75,
    pay_index: 0,
    usedTxIds: [],
    outputs: [],
    channels: [],
    info: {}
  }
};

var defaultState = _objectSpread({
  session: '',
  token: '',
  user: '',
  loggedIn: false
}, pubState);

var AoStore = (_dec = mobx__WEBPACK_IMPORTED_MODULE_4__["action"].bound, _dec2 = mobx__WEBPACK_IMPORTED_MODULE_4__["action"].bound, _dec3 = mobx__WEBPACK_IMPORTED_MODULE_4__["action"].bound, (_class = (_temp = /*#__PURE__*/function () {
  function AoStore(state) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AoStore);

    this.state = defaultState;
    this.state = Object(mobx__WEBPACK_IMPORTED_MODULE_4__["observable"])(state);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AoStore, [{
    key: "initializeState",
    value: function initializeState(state) {
      var _this = this;

      Object.keys(state).forEach(function (key) {
        return Object.assign(_this.state[key], state[key]);
      });
    }
  }, {
    key: "applyEvent",
    value: function applyEvent(ev) {
      Object(_mutations__WEBPACK_IMPORTED_MODULE_6__["applyEvent"])(this.state, ev);
    }
  }, {
    key: "setCurrentCard",
    value: function setCurrentCard(taskId) {
      this.currentCard = taskId;
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }, {
    key: "member",
    get: function get() {
      var _this2 = this;

      var loggedInMember;
      this.state.sessions.forEach(function (session) {
        if (_this2.state.session === session.session) {
          console.log('found existing session');
          var memberId = session.ownerId;

          _this2.state.members.forEach(function (m) {
            if (m.memberId === memberId) {
              loggedInMember = m;
            }
          });
        }
      });
      return loggedInMember;
    }
  }, {
    key: "hashMap",
    get: function get() {
      var hashMap = new Map();
      this.state.tasks.forEach(function (t) {
        hashMap.set(t.taskId, t);
      });
      return hashMap;
    }
  }]);

  return AoStore;
}(), _temp), (_babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, "member", [mobx__WEBPACK_IMPORTED_MODULE_4__["computed"]], Object.getOwnPropertyDescriptor(_class.prototype, "member"), _class.prototype), _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, "hashMap", [mobx__WEBPACK_IMPORTED_MODULE_4__["computed"]], Object.getOwnPropertyDescriptor(_class.prototype, "hashMap"), _class.prototype), _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, "initializeState", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "initializeState"), _class.prototype), _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, "applyEvent", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "applyEvent"), _class.prototype), _babel_runtime_helpers_applyDecoratedDescriptor__WEBPACK_IMPORTED_MODULE_2___default()(_class.prototype, "setCurrentCard", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "setCurrentCard"), _class.prototype)), _class));
function applyBackup(backup) {
  console.log("backup:", backup);
  var server = Object.assign({}, backup);
  Object(_mutations__WEBPACK_IMPORTED_MODULE_6__["setCurrent"])(serverState, server);
  backup.memes = backup.memes && backup.memes.length > 0 ? backup.memes.map(removeSensitive) : [];
  backup.resources = backup.resources.map(removeSensitive);
  backup.members = backup.members.map(removeSensitive);
  backup.ao = backup.ao.map(removeSensitive);
  backup.tasks = backup.tasks.map(removeSensitive);
  Object(_mutations__WEBPACK_IMPORTED_MODULE_6__["setCurrent"])(pubState, backup);
}
function removeSensitive(value) {
  var secretStuff = ['fob', 'secret', 'token', 'email', 'payment_hash', 'inboundSecret', 'outboundSecret'];

  if (value.type === 'member-field-updated') {
    ['fob', 'secret', 'email'].forEach(function (str) {
      if (value.field === str) {
        secretStuff.push('newfield');
      }
    });
  }

  return lodash__WEBPACK_IMPORTED_MODULE_5___default.a.omit(value, secretStuff);
}
var aoStore = {};
var _default = aoStore;
/* harmony default export */ __webpack_exports__["default"] = (_default);
function createAoStore(state) {
  aoStore.store = new AoStore(state);
}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(serverState, "serverState", "/usr/src/app/src/app/store.ts");
  reactHotLoader.register(pubState, "pubState", "/usr/src/app/src/app/store.ts");
  reactHotLoader.register(defaultState, "defaultState", "/usr/src/app/src/app/store.ts");
  reactHotLoader.register(AoStore, "AoStore", "/usr/src/app/src/app/store.ts");
  reactHotLoader.register(applyBackup, "applyBackup", "/usr/src/app/src/app/store.ts");
  reactHotLoader.register(removeSensitive, "removeSensitive", "/usr/src/app/src/app/store.ts");
  reactHotLoader.register(aoStore, "aoStore", "/usr/src/app/src/app/store.ts");
  reactHotLoader.register(createAoStore, "createAoStore", "/usr/src/app/src/app/store.ts");
  reactHotLoader.register(_default, "default", "/usr/src/app/src/app/store.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/api.ts":
/*!***************************!*\
  !*** ./src/client/api.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ "socket.io-client");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! superagent */ "superagent");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _app_crypto__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../app/crypto */ "./src/app/crypto.tsx");
/* harmony import */ var _app_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../app/store */ "./src/app/store.ts");





(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







var AoApi = /*#__PURE__*/function () {
  function AoApi(socket) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, AoApi);

    this.socket = socket;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(AoApi, [{
    key: "startSocketListeners",
    value: function startSocketListeners() {
      var _this = this;

      var aoStore = _app_store__WEBPACK_IMPORTED_MODULE_8__["default"].store;
      this.socket.connect();
      this.socket.on('connect', function () {
        console.log('socket connected');
        var _aoStore$state = aoStore.state,
            session = _aoStore$state.session,
            token = _aoStore$state.token;
        console.log("Session and token: ", session, token);

        _this.socket.emit('authentication', {
          session: session,
          token: token
        });
      });
      this.socket.on('authenticated', function () {
        console.log('authenticated');

        _this.socket.on('eventstream', function (ev) {
          console.log('event', ev);
          aoStore.applyEvent(ev);
        });
      });
      this.socket.on('disconnect', function (reason) {
        console.log('disconnected');

        _this.socket.connect();
      });
    }
  }, {
    key: "createSession",
    value: function () {
      var _createSession = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(user, pass) {
        var session, sessionKey, token;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                session = Object(uuid__WEBPACK_IMPORTED_MODULE_6__["v1"])();
                sessionKey = Object(_app_crypto__WEBPACK_IMPORTED_MODULE_7__["createHash"])(session + Object(_app_crypto__WEBPACK_IMPORTED_MODULE_7__["createHash"])(pass));
                token = Object(_app_crypto__WEBPACK_IMPORTED_MODULE_7__["hmacHex"])(session, sessionKey);
                return _context.abrupt("return", superagent__WEBPACK_IMPORTED_MODULE_5___default.a.post('/session').set('authorization', token).set('session', session).set('name', user).on('error', function () {
                  return false;
                }).then(function (res) {
                  aoStore.state.token = token;
                  aoStore.state.session = session;
                  aoStore.state.user = user;
                  window.localStorage.setItem('user', user);
                  window.localStorage.setItem('token', token);
                  window.localStorage.setItem('session', session);
                  return true;
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createSession(_x, _x2) {
        return _createSession.apply(this, arguments);
      }

      return createSession;
    }()
  }, {
    key: "fetchState",
    value: function () {
      var _fetchState = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var session, token, user;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                session = window.localStorage.getItem('session');
                token = window.localStorage.getItem('token');
                user = window.localStorage.getItem('user');
                return _context2.abrupt("return", superagent__WEBPACK_IMPORTED_MODULE_5___default.a.post('/state').set('Authorization', token).set('session', session).set('name', user).then(function (res) {
                  aoStore.state.session = session;
                  aoStore.state.token = token;
                  aoStore.state.user = user;
                  aoStore.state.loggedIn = true;
                  aoStore.initializeState(res.body);
                  return true;
                }).catch(function () {
                  return false;
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function fetchState() {
        return _fetchState.apply(this, arguments);
      }

      return fetchState;
    }()
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return AoApi;
}();

var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_4___default.a.connect('/', {
  autoConnect: false
});
var api = new AoApi(socket);
var _default = api;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AoApi, "AoApi", "/usr/src/app/src/client/api.ts");
  reactHotLoader.register(socket, "socket", "/usr/src/app/src/client/api.ts");
  reactHotLoader.register(api, "api", "/usr/src/app/src/client/api.ts");
  reactHotLoader.register(_default, "default", "/usr/src/app/src/client/api.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/server/api.ts":
/*!***************************!*\
  !*** ./src/server/api.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/store */ "./src/app/store.ts");
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.post('/state', function (req, res) {
  res.json(_app_store__WEBPACK_IMPORTED_MODULE_1__["pubState"]);
});
var _default = router;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/usr/src/app/src/server/api.ts");
  reactHotLoader.register(_default, "default", "/usr/src/app/src/server/api.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/server/auth/api.ts":
/*!********************************!*\
  !*** ./src/server/auth/api.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/store */ "./src/app/store.ts");
/* harmony import */ var _app_crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/crypto */ "./src/app/crypto.tsx");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events */ "./src/server/events.ts");
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






function getIdSecret(identifier) {
  var ownerId, secret;
  identifier = identifier && identifier.toLowerCase();
  _app_store__WEBPACK_IMPORTED_MODULE_1__["serverState"].members.forEach(function (member) {
    if (member.name.toLowerCase() === identifier || member.memberId === identifier) {
      ownerId = member.memberId;
      secret = member.secret;
    }
  });
  _app_store__WEBPACK_IMPORTED_MODULE_1__["serverState"].resources.forEach(function (resource) {
    if (resource.name === identifier || resource.resourceId === identifier) {
      ownerId = resource.resourceId;
      secret = resource.secret;
    }
  });
  return {
    ownerId: ownerId,
    secret: secret
  };
}

function authorized(req) {
  if (_app_store__WEBPACK_IMPORTED_MODULE_1__["serverState"].sessions.map(function (session) {
    return session.token;
  }).includes(req.headers.authorization)) {
    return true;
  }

  return false;
}

function endpoint() {
  return function (req, res) {
    if (authorized(req)) {
      return res.status(404).end('not found');
    }

    var _getIdSecret = getIdSecret(req.headers.name),
        ownerId = _getIdSecret.ownerId,
        secret = _getIdSecret.secret;

    if (secret && req.headers.authorization && req.headers.session) {
      var sessionKey = Object(_app_crypto__WEBPACK_IMPORTED_MODULE_2__["createHash"])(req.headers.session + secret);
      var token = Object(_app_crypto__WEBPACK_IMPORTED_MODULE_2__["hmacHex"])(req.headers.session, sessionKey);

      if (token === req.headers.authorization) {
        // client able to create the token, must have secret
        _events__WEBPACK_IMPORTED_MODULE_3__["default"].sessionCreated(ownerId, req.headers.session, token, function (err, dbResponse) {
          if (err) {
            res.status(500).send(err);
          } else {
            req.session.token = token;
            req.session.name = req.headers.name;
            req.session.session = req.headers.session;
            res.status(201).send(dbResponse);
          }
        });
      } else {
        res.status(401).end('unauthorized');
      }
    } else {
      res.status(401).end('unauthorized');
    }
  };
}

function middleware() {
  return function (req, res, next) {
    if (req.url.startsWith('/js')) {
      return next();
    }

    if (req.url === "/__webpack_hmr") {
      return next();
    }

    if (/[0-9a-f]+\.hot-update.js/.test(req.url)) {
      return next();
    }

    if (req.url.startsWith('/css')) {
      return next();
    }

    if (authorized(req)) {
      return next();
    }

    res.status(401).end('unauthorized');
  };
}

var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.post('/session', endpoint());
router.use(middleware());
var _default = router;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getIdSecret, "getIdSecret", "/usr/src/app/src/server/auth/api.ts");
  reactHotLoader.register(authorized, "authorized", "/usr/src/app/src/server/auth/api.ts");
  reactHotLoader.register(endpoint, "endpoint", "/usr/src/app/src/server/auth/api.ts");
  reactHotLoader.register(middleware, "middleware", "/usr/src/app/src/server/auth/api.ts");
  reactHotLoader.register(router, "router", "/usr/src/app/src/server/auth/api.ts");
  reactHotLoader.register(_default, "default", "/usr/src/app/src/server/auth/api.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/server/auth/socket.ts":
/*!***********************************!*\
  !*** ./src/server/auth/socket.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return authenticate; });
/* harmony import */ var _app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/store */ "./src/app/store.ts");
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


function authenticate(_socket, data, callback) {
  var authorized;
  _app_store__WEBPACK_IMPORTED_MODULE_0__["serverState"].sessions.forEach(function (session) {
    if (session.token === data.token) {
      authorized = true;
    }
  });
  console.log('socket auth triggered:', authorized);
  callback(null, authorized);
}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(authenticate, "authenticate", "/usr/src/app/src/server/auth/socket.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/server/db.ts":
/*!**************************!*\
  !*** ./src/server/db.ts ***!
  \**************************/
/*! exports provided: eventEmitter, shadowEmitter, changeFeed, shadowFeed, default, startDB, recover, getAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventEmitter", function() { return eventEmitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shadowEmitter", function() { return shadowEmitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFeed", function() { return changeFeed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shadowFeed", function() { return shadowFeed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startDB", function() { return startDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recover", function() { return recover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAll", function() { return getAll; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! better-sqlite3 */ "better-sqlite3");
/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var kefir__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! kefir */ "kefir");
/* harmony import */ var kefir__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(kefir__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_crypto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app/crypto */ "./src/app/crypto.tsx");



(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





var eventEmitter, shadowEmitter;
var changeFeed = Object(kefir__WEBPACK_IMPORTED_MODULE_4__["stream"])(function (e) {
  eventEmitter = e;
});
var shadowFeed = Object(kefir__WEBPACK_IMPORTED_MODULE_4__["stream"])(function (e) {
  shadowEmitter = e;
});

var DB = /*#__PURE__*/function () {
  function DB() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DB);

    this.conn = null;
    this.preparedStmts = {};
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DB, [{
    key: "startDb",
    value: function startDb(path) {
      this.conn = better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default()(path, {});
      var checkTable = this.conn.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='events'");

      if (checkTable.all().length == 0) {
        this.initializeSqlite();
      } else {
        this.createStatements();
      }
    }
  }, {
    key: "initializeSqlite",
    value: function initializeSqlite() {
      var err;
      var initDb = this.conn.prepare('CREATE TABLE `events` ( `document` BLOB NOT NULL, `timestamp` INTEGER UNIQUE, PRIMARY KEY(`timestamp`) )');
      var initBackups = this.conn.prepare('CREATE TABLE `backups` ( `document` BLOB NOT NULL, `timestamp` INTEGER UNIQUE, PRIMARY KEY(`timestamp`) )');
      initDb.run();
      initBackups.run();
      this.createStatements();
      this.insertEvent({
        type: 'member-created',
        name: 'dctrl',
        fob: '0000000000',
        secret: Object(_app_crypto__WEBPACK_IMPORTED_MODULE_5__["createHash"])('dctrl'),
        // init user-password is dctrl
        memberId: Object(uuid__WEBPACK_IMPORTED_MODULE_3__["v1"])(),
        address: '2Mz6BQSTkmK4WHCntwNfvdSfWHddTqQX4vu',
        active: 1,
        balance: 0,
        badges: [],
        info: {}
      });
      this.startFeed();
    }
  }, {
    key: "createStatements",
    value: function createStatements() {
      this.conn.function('eventFeed', function (doc) {
        eventEmitter.emit(JSON.parse(doc));
      });
      this.preparedStmts.getAll = this.conn.prepare('SELECT document FROM events WHERE (timestamp > ?) ORDER BY timestamp'); // WHERE (timestamp > ?)

      this.preparedStmts.insertEvent = this.conn.prepare('INSERT INTO events VALUES (?, ?)');
      this.preparedStmts.insertBackup = this.conn.prepare('INSERT INTO backups VALUES (?, ?)');
      this.preparedStmts.recover = this.conn.prepare('SELECT document from backups ORDER BY timestamp DESC LIMIT 1');
    }
  }, {
    key: "recover",
    value: function recover() {
      var events = [];

      var _iterator = _createForOfIteratorHelper(this.preparedStmts.recover.iterate()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var event = _step.value;
          events.push(JSON.parse(event.document));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return events;
    }
  }, {
    key: "getAll",
    value: function getAll(timestamp) {
      var events = [];

      var _iterator2 = _createForOfIteratorHelper(this.preparedStmts.getAll.iterate(timestamp)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var event = _step2.value;
          events.push(JSON.parse(event.document));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return events;
    }
  }, {
    key: "startFeed",
    value: function startFeed() {
      this.conn.function('eventFeed', function (doc) {
        eventEmitter.emit(JSON.parse(doc));
      });
      this.conn.prepare('CREATE TRIGGER updateHook AFTER INSERT ON events BEGIN SELECT eventFeed(NEW.document); END').run();
    }
  }, {
    key: "insertEvent",
    value: function insertEvent(ev) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      console.log('insertEvent ev is ', ev);
      if (!this.conn) return callback('No db connection');

      if (!ev.timestamp) {
        ev.timestamp = Date.now();
      }

      var err = null;
      var result = null;
      result = this.preparedStmts.insertEvent.run(JSON.stringify(ev), ev.timestamp);

      if (callback) {
        callback(err, {
          event: ev,
          result: result
        });
      }
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return DB;
}();

var aodb = new DB();
var _default = aodb;
/* harmony default export */ __webpack_exports__["default"] = (_default); // gotta figure out why the functions weren't included with the object in the above export.

function startDB(path) {
  aodb.startDb(path);
}
function recover() {
  return aodb.recover();
}
function getAll(timestamp) {
  return aodb.getAll(timestamp);
}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(eventEmitter, "eventEmitter", "/usr/src/app/src/server/db.ts");
  reactHotLoader.register(shadowEmitter, "shadowEmitter", "/usr/src/app/src/server/db.ts");
  reactHotLoader.register(changeFeed, "changeFeed", "/usr/src/app/src/server/db.ts");
  reactHotLoader.register(shadowFeed, "shadowFeed", "/usr/src/app/src/server/db.ts");
  reactHotLoader.register(DB, "DB", "/usr/src/app/src/server/db.ts");
  reactHotLoader.register(aodb, "aodb", "/usr/src/app/src/server/db.ts");
  reactHotLoader.register(startDB, "startDB", "/usr/src/app/src/server/db.ts");
  reactHotLoader.register(recover, "recover", "/usr/src/app/src/server/db.ts");
  reactHotLoader.register(getAll, "getAll", "/usr/src/app/src/server/db.ts");
  reactHotLoader.register(_default, "default", "/usr/src/app/src/server/db.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/server/events.ts":
/*!******************************!*\
  !*** ./src/server/events.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ "./src/server/db.ts");



(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



var Events = /*#__PURE__*/function () {
  function Events() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Events);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Events, [{
    key: "sessionCreated",
    value: function sessionCreated(ownerId, session, token, callback) {
      var newEvent = {
        type: 'session-created',
        session: session,
        token: token,
        ownerId: ownerId
      };
      _db__WEBPACK_IMPORTED_MODULE_2__["default"].insertEvent(newEvent, callback);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Events;
}();

var _default = new Events();

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Events, "Events", "/usr/src/app/src/server/events.ts");
  reactHotLoader.register(_default, "default", "/usr/src/app/src/server/events.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/server/routes.tsx":
/*!*******************************!*\
  !*** ./src/server/routes.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var _backup$;

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

var express = __webpack_require__(/*! express */ "express");

var Server = __webpack_require__(/*! socket.io */ "socket.io");

var React = __webpack_require__(/*! react */ "react");

var _require = __webpack_require__(/*! react-dom/server */ "react-dom/server"),
    renderToString = _require.renderToString;

var _require2 = __webpack_require__(/*! react-router-dom */ "react-router-dom"),
    StaticRouter = _require2.StaticRouter;

var _require3 = __webpack_require__(/*! react-router */ "react-router"),
    Route = _require3.Route,
    Switch = _require3.Switch;

var Kefir = __webpack_require__(/*! kefir */ "kefir");

var StyleContext = __webpack_require__(/*! isomorphic-style-loader/StyleContext */ "isomorphic-style-loader/StyleContext");

var authenticateSocket = __webpack_require__(/*! socketio-auth */ "socketio-auth");

var _require4 = __webpack_require__(/*! ./auth/socket */ "./src/server/auth/socket.ts"),
    authSocket = _require4.default;

var _require5 = __webpack_require__(/*! ./db */ "./src/server/db.ts"),
    changeFeed = _require5.changeFeed,
    shadowFeed = _require5.shadowFeed;

var _require6 = __webpack_require__(/*! ./template */ "./src/server/template.ts"),
    buildHtml = _require6.default;

var _require7 = __webpack_require__(/*! ./auth/api */ "./src/server/auth/api.ts"),
    authApi = _require7.default;

var _require8 = __webpack_require__(/*! ./api */ "./src/server/api.ts"),
    api = _require8.default;

var _require9 = __webpack_require__(/*! ../app */ "./src/app/index.tsx"),
    App = _require9.default,
    KEY_AUTH_DATA = _require9.KEY_AUTH_DATA;

var _require10 = __webpack_require__(/*! ./db */ "./src/server/db.ts"),
    startDB = _require10.startDB,
    recover = _require10.recover,
    getAll = _require10.getAll;

var _require11 = __webpack_require__(/*! ../app/store */ "./src/app/store.ts"),
    store = _require11.default,
    createAoStore = _require11.createAoStore,
    serverState = _require11.serverState,
    pubState = _require11.pubState,
    applyBackup = _require11.applyBackup,
    removeSensitive = _require11.removeSensitive;

var _require12 = __webpack_require__(/*! ../app/mutations */ "./src/app/mutations.tsx"),
    applyEvent = _require12.applyEvent;

startDB('database.sqlite3');
var backup = recover();

if (backup.length > 0) {
  applyBackup(backup[0]);
}

var events = getAll(((_backup$ = backup[0]) === null || _backup$ === void 0 ? void 0 : _backup$.timestamp) || 0);
events.forEach(function (event, i) {
  applyEvent(serverState, Object.assign({}, event));
  applyEvent(pubState, removeSensitive(Object.assign({}, event)));

  if (i > 0 && i % 10000 === 0) {
    console.log('applied ', i, '/', events.length, ' events...');
  }
});
console.log('applied ', events.length, ' events from the database');
createAoStore(pubState);
var aoStore = store.store;

function reactions(event) {
  process.nextTick(function (err) {
    switch (event.type) {
      case 'task-boosted':
      case 'task-boosted-lightning':
        var optionList = [];
        var defaultPrice;
        var resourceId;
        var resourceList = serverState.resources.map(function (r) {
          return r.resourceId;
        });
        var amount = parseFloat(event.amount);
        serverState.tasks.some(function (t) {
          if (resourceList.indexOf(t.taskId) > -1 && t.priorities.indexOf(event.taskId) > -1) {
            resourceId = t.taskId;
            return true;
          }
        });
        console.log('got resourceId', resourceId);
        serverState.resources.some(function (r) {
          if (r.resourceId === resourceId) {
            defaultPrice = r.charge;
            return true;
          }
        });
        serverState.tasks.some(function (t) {
          if (event.taskId === t.taskId) {
            var str = t.name;
            var cashTagLocation = str.search(/\$/);
            var customPrice = parseFloat(str.slice(cashTagLocation + 1, cashTagLocation + 5));

            if (customPrice > 0) {
              console.log('using custom price, ', customPrice);
              defaultPrice = customPrice;
            }

            if (defaultPrice > 0 && amount > 0) {
              amount = amount / defaultPrice;
            }

            var hopper = t.name.slice(0, 1);
            events.resourceUsed(resourceId, '', amount, 0, hopper, console.log);
            return true;
          }
        });
        break;

      case 'member-field-updated':
        break;

      case 'member-paid':
        break;

      case 'resource-stocked':
        events.memberActivated(event.memberId);
        break;

      case 'resource-stocked':
        break;

      case 'member-address-updated':
        break;

      case 'member-created':
        break;

      case 'resource-created':
        break;
    }
  });
}

changeFeed.onValue(function (ev) {
  applyEvent(serverState, ev);
}).onValue(reactions);
var filteredStream = changeFeed.map(removeSensitive);
var fullEvStream = Kefir.merge([filteredStream, shadowFeed]);
var loaded = false;

module.exports = function routes(_options) {
  var router = express.Router();
  router.use(function (req, _res, next) {
    if (!loaded) {
      loaded = true;
      var server = req.socket.server;
      var io = new Server(server);
      authenticateSocket(io, {
        authenticate: authSocket,
        timeout: 2000
      });
      fullEvStream.onValue(function (ev) {
        applyEvent(pubState, ev);
        io.emit('eventstream', ev);
        console.log('emitting:', ev);
      });
    }

    if (aoStore) {
      aoStore.state.session = null;
      aoStore.state.token = null;
      aoStore.state.user = null;
      aoStore.state.loggedIn = false;
    }

    next();
  });
  router.use(function (req, res, next) {
    if (aoStore && req.session.token && serverState.sessions.map(function (session) {
      return session.token;
    }).includes(req.session.token)) {
      aoStore.state.session = req.session.session;
      aoStore.state.token = req.session.token;
      aoStore.state.user = req.session.name;
      aoStore.state.loggedIn = true;
    }

    var css = new Set();

    var insertCss = function insertCss() {
      for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
        styles[_key] = arguments[_key];
      }

      return styles.forEach(function (style) {
        return css.add(style._getCss());
      });
    };

    var context = {};
    var components = renderToString( /*#__PURE__*/React.createElement(StyleContext.Provider, {
      value: {
        insertCss: insertCss
      }
    }, /*#__PURE__*/React.createElement(StaticRouter, {
      location: req.url,
      context: context
    }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(App, null)))));

    if (context.url) {
      res.redirect(301, context.url);
    } else if (components === '') {
      next();
    } else {
      res.status(200).send(buildHtml(req, components,
      /*[...css].join('')*/
      '', aoStore.state));
    }
  }); // Backend

  router.use(authApi);
  router.use(api);
  return router;
};

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(backup, "backup", "/usr/src/app/src/server/routes.tsx");
  reactHotLoader.register(events, "events", "/usr/src/app/src/server/routes.tsx");
  reactHotLoader.register(aoStore, "aoStore", "/usr/src/app/src/server/routes.tsx");
  reactHotLoader.register(reactions, "reactions", "/usr/src/app/src/server/routes.tsx");
  reactHotLoader.register(filteredStream, "filteredStream", "/usr/src/app/src/server/routes.tsx");
  reactHotLoader.register(fullEvStream, "fullEvStream", "/usr/src/app/src/server/routes.tsx");
  reactHotLoader.register(loaded, "loaded", "/usr/src/app/src/server/routes.tsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/server/template.ts":
/*!********************************!*\
  !*** ./src/server/template.ts ***!
  \********************************/
/*! exports provided: loadTemplateBlocking, render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTemplateBlocking", function() { return loadTemplateBlocking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return buildHtml; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


 //

var isDev = "development" === 'development';
var SITE_TITLE = '%SITE_TITLE%';
var SITE_URL = '%SITE_URL%';
var SITE_COVER_IMG_URL = '%SITE_COVER_IMG_URL%';
var SITE_DESCRIPTION = '%SITE_DESCRIPTION%';
var SITE_CSS = '/*SITE_CSS*/';
var APP_HTML = 'APP_HTML';
var SITE_PRELOADED_STATE = 'SITE_PRELOADED_STATE';
var SITE_SCRIPTS = '<!-- SITE_SCRIPTS -->';
var DEV_SCRIPTS = "<script type='text/javascript' src='/js/vendor.js'></script><script type='text/javascript' src='/js/app.js'></script>";
var loadTemplateBlocking = function loadTemplateBlocking() {
  try {
    var htmlPath = isDev ? Object(path__WEBPACK_IMPORTED_MODULE_2__["join"])(__dirname, '../public/template.html') : Object(path__WEBPACK_IMPORTED_MODULE_2__["join"])(__dirname, './dist/template.html');

    if (!fs__WEBPACK_IMPORTED_MODULE_1___default.a.existsSync(htmlPath)) {
      console.log("".concat(htmlPath, " does not exists, loadTemplate failed"));
      return process.exit();
    }

    var html = fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFileSync(htmlPath, 'utf8');

    if (!html) {
      console.log("".concat(htmlPath, " does not exists, file empty"));
      return process.exit();
    }

    return isDev ? html.replace(SITE_SCRIPTS, DEV_SCRIPTS) : html;
  } catch (e) {
    console.error(e);
    process.exit();
  }
};

function replace(str, mapObj) {
  var re = new RegExp(Object.keys(mapObj).map(function (key) {
    return escapeRegExp(key);
  }).join('|'), 'gi');
  return str.replace(re, function (matched) {
    return mapObj[matched];
  });
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function render(_ref) {
  var _replace;

  var html = _ref.html,
      css = _ref.css,
      preloadedState = _ref.preloadedState,
      siteUrl = _ref.siteUrl,
      title = _ref.title,
      coverImg = _ref.coverImg,
      description = _ref.description;
  var htmlTemplate = global.htmlTemplate;
  return replace(htmlTemplate, (_replace = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_replace, SITE_TITLE, title), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_replace, SITE_URL, siteUrl), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_replace, SITE_COVER_IMG_URL, coverImg), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_replace, SITE_DESCRIPTION, description), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_replace, SITE_PRELOADED_STATE, JSON.stringify(preloadedState).replace(/</g, "\\u003c")), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_replace, APP_HTML, html), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_replace, SITE_CSS, css), _replace));
}

function getProtocol(req) {
  // @ts-ignore
  var proto = req.connection.encrypted ? 'https' : 'http'; // only do this if you trust the proxy

  var forwarded = req.headers['x-forwarded-proto'];
  if (forwarded) proto = forwarded.toString();
  return proto.split(/\s*,\s*/)[0];
}

function buildHtml(req, components, css) {
  var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var baseUrl = "".concat(getProtocol(req), "://").concat(req.get('host'));
  return render({
    html: components,
    css: css,
    preloadedState: state,
    siteUrl: baseUrl + req.originalUrl,
    title: 'untitled',
    coverImg: '',
    description: ''
  });
}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(isDev, "isDev", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(SITE_TITLE, "SITE_TITLE", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(SITE_URL, "SITE_URL", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(SITE_COVER_IMG_URL, "SITE_COVER_IMG_URL", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(SITE_DESCRIPTION, "SITE_DESCRIPTION", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(SITE_CSS, "SITE_CSS", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(APP_HTML, "APP_HTML", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(SITE_PRELOADED_STATE, "SITE_PRELOADED_STATE", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(SITE_SCRIPTS, "SITE_SCRIPTS", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(DEV_SCRIPTS, "DEV_SCRIPTS", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(loadTemplateBlocking, "loadTemplateBlocking", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(replace, "replace", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(escapeRegExp, "escapeRegExp", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(render, "render", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(getProtocol, "getProtocol", "/usr/src/app/src/server/template.ts");
  reactHotLoader.register(buildHtml, "buildHtml", "/usr/src/app/src/server/template.ts");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "@babel/runtime/helpers/applyDecoratedDescriptor":
/*!******************************************************************!*\
  !*** external "@babel/runtime/helpers/applyDecoratedDescriptor" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/applyDecoratedDescriptor");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/extends":
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),

/***/ "@babel/runtime/helpers/objectWithoutProperties":
/*!*****************************************************************!*\
  !*** external "@babel/runtime/helpers/objectWithoutProperties" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutProperties");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("better-sqlite3");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "isomorphic-style-loader/StyleContext":
/*!*******************************************************!*\
  !*** external "isomorphic-style-loader/StyleContext" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/StyleContext");

/***/ }),

/***/ "kefir":
/*!************************!*\
  !*** external "kefir" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("kefir");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "mobx":
/*!***********************!*\
  !*** external "mobx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ }),

/***/ "mobx-react":
/*!*****************************!*\
  !*** external "mobx-react" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mobx-react");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ "react-hot-loader/root":
/*!****************************************!*\
  !*** external "react-hot-loader/root" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader/root");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),

/***/ "socketio-auth":
/*!********************************!*\
  !*** external "socketio-auth" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socketio-auth");

/***/ }),

/***/ "superagent":
/*!*****************************!*\
  !*** external "superagent" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ });
//# sourceMappingURL=routes.js.map
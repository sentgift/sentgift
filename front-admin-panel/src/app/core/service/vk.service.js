"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var Observable_1 = require("rxjs/Observable");
var VK;
var VkService = (function () {
    function VkService() {
        var _this = this;
        this.data = { user: {} };
        this.appPermissions = 134397343;
        VK = window.VK;
        VK.init({ apiId: environment_1.environment.appId, status: true });
        this.getLoginStatus().subscribe(function (response) {
            if (!response.session) {
                _this.login(function () {
                });
            }
        });
    }
    VkService.prototype.login = function (callback) {
        function authInfo(response) {
            if (response.session) {
                this.data.user = response.session.user;
                callback(this.data.user);
            }
            else {
                alert('Авторизоваться не удалось!');
            }
        }
        VK.Auth.login(authInfo.bind(this), this.appPermissions);
    };
    VkService.prototype.performCall = function (method, params) {
        return Observable_1.Observable.create(function (subscriber) {
            VK.api(method, params, function (response) {
                subscriber.next(response);
            });
        });
    };
    VkService.prototype.getMyId = function () {
        if (VK && VK._Session) {
            return VK._session.mid;
        }
        return null;
    };
    VkService.prototype.getLoginStatus = function () {
        return Observable_1.Observable.create(function (subscriber) {
            VK.Auth.getLoginStatus(function (response) {
                subscriber.next(response);
            });
        });
    };
    VkService.prototype.getModeratedGroups = function () {
        return this.performCall('groups.get', {
            filter: 'moder',
            count: 1000,
            extended: 1,
            fields: 'description'
        }).map(function (response) { return response.response.slice(1); });
    };
    VkService.prototype.getMyProfile = function () {
        return this.performCall('users.get', { fields: 'photo_50' }).map((function (response) { return response.response[0]; }));
    };
    VkService.prototype.getOrders = function (gid) {
        return this.performCall('market.search', {
            owner_id: -gid,
            extended: 1
        }).map(function (response) { return response.response && response.response instanceof Array ? response.response.slice(1) : response; });
    };
    VkService.prototype.getOrdersByGroupId = function (gid) {
        return this.performCall('market.get', {
            owner_id: -gid,
            extended: 1
        }).map(function (response) { return response.response && response.response instanceof Array ? response.response.slice(1) : response; });
    };
    VkService.prototype.getOrderById = function (gid) {
        return this.performCall('market.getById', {
            owner_id: -gid,
            extended: 1
        }).map(function (response) { return response.response && response.response instanceof Array ? response.response.slice(1) : response; });
    };
    VkService.prototype.isInitialized = function () {
        return VK._session && VK._session.mid;
    };
    return VkService;
}());
VkService = __decorate([
    core_1.Injectable()
], VkService);
exports.VkService = VkService;

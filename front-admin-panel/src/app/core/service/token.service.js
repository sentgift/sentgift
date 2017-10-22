"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TOKEN_STORAGE_NAME = 'oauth2Token';
var REFRESH_TOKEN_STORAGE_NAME = 'refreshToken';
var TokenService = (function () {
    function TokenService() {
    }
    TokenService.prototype.getToken = function () {
        return window.localStorage[TOKEN_STORAGE_NAME];
    };
    TokenService.prototype.saveToken = function (token) {
        window.localStorage[TOKEN_STORAGE_NAME] = token;
    };
    TokenService.prototype.destroyToken = function () {
        window.localStorage.removeItem(TOKEN_STORAGE_NAME);
        window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_NAME);
    };
    TokenService.prototype.clearLocalStorage = function () {
        window.localStorage.clear();
    };
    TokenService.prototype.getRefreshToken = function () {
        return window.localStorage[REFRESH_TOKEN_STORAGE_NAME];
    };
    TokenService.prototype.saveRefreshToken = function (token) {
        window.localStorage[REFRESH_TOKEN_STORAGE_NAME] = token;
    };
    return TokenService;
}());
TokenService = __decorate([
    core_1.Injectable()
], TokenService);
exports.TokenService = TokenService;

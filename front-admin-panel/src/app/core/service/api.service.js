"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var authorization_type_1 = require("../utils/authorization-type");
var environment_1 = require("../../../environments/environment");
var Observable_1 = require("rxjs/Observable");
var querystring_1 = require("querystring");
var ApiService = (function () {
    function ApiService(http, tokenService, router, notificationService) {
        this.http = http;
        this.tokenService = tokenService;
        this.router = router;
        this.notificationService = notificationService;
    }
    ApiService.prototype.getHeaders = function (authorizationType, isFormData) {
        if (isFormData === void 0) { isFormData = false; }
        var headersConfig = {
            'Content-Type': isFormData ? undefined : 'application/json',
            'Accept': 'application/json',
        };
        if (authorizationType === authorization_type_1.AuthorizationType.BASIC) {
            headersConfig['Authorization'] = "Basic " + environment_1.environment.oauth_basic_token;
            headersConfig['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
        }
        if (authorizationType === authorization_type_1.AuthorizationType.BEARER) {
            headersConfig['Authorization'] = "Bearer " + this.tokenService.getToken();
        }
        return new http_1.Headers(headersConfig);
    };
    ApiService.prototype.catchError = function (error) {
        if (error.status === 401) {
            this.tokenService.destroyToken();
            this.router.navigate(['login']);
        }
        else if (error.status === 406) {
        }
        else if (error.status !== 400) {
        }
        else if (error.status !== 400 && error.startTime !== 404) {
            this.notificationService.showError('Ошибка сервера', 'Пожалуйста, обратитесь к администратору с описанием проблемы. Код ошибки: ' + error.status);
        }
        return Observable_1.Observable.throw(error);
    };
    ApiService.prototype.get = function (path, authorizationType, params) {
        if (params === void 0) { params = new URLSearchParams(); }
        return this.http.get(environment_1.environment.base_url + "api/" + path, {
            headers: this.getHeaders(authorizationType),
            search: querystring_1.unescape(params.toString()),
        })
            .catch(this.catchError.bind(this))
            .map(function (res) { return res.json(); });
    };
    ApiService.prototype.filter = function (path, authorizationType, params) {
        return this.http.get(environment_1.environment.base_url + "api/" + path, {
            headers: this.getHeaders(authorizationType),
            search: JSON.stringify(params),
        })
            .catch(this.catchError.bind(this))
            .map(function (res) { return res.json(); });
    };
    ApiService.prototype.post = function (path, authorizationType, body) {
        if (body === void 0) { body = {}; }
        return this.http.post(environment_1.environment.base_url + "api/" + path, authorizationType !== authorization_type_1.AuthorizationType.BASIC ? JSON.stringify(body) : body, { headers: this.getHeaders(authorizationType) })
            .catch(this.catchError.bind(this))
            .map(function (res) { return res.json(); });
    };
    ApiService.prototype.put = function (path, authorizationType, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = new URLSearchParams(); }
        return this.http.put("" + environment_1.environment.base_url + path + "?" + params.toString(), authorizationType !== authorization_type_1.AuthorizationType.BASIC ? JSON.stringify(body) : body, { headers: this.getHeaders(authorizationType), params: params })
            .catch(this.catchError.bind(this))
            .map(function (res) { return res.json(); });
    };
    ApiService.prototype.patch = function (path, authorizationType, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = new URLSearchParams(); }
        return this.http.patch("" + environment_1.environment.base_url + path, authorizationType !== authorization_type_1.AuthorizationType.BASIC ? JSON.stringify(body) : body, { headers: this.getHeaders(authorizationType), search: params })
            .catch(this.catchError.bind(this))
            .map(function (res) { return res.json(); });
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable()
], ApiService);
exports.ApiService = ApiService;

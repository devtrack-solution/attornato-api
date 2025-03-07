"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootTestModule = void 0;
const common_1 = require("@nestjs/common");
const infrastructure_module_1 = require("../src/infrastructure/infrastructure.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const idempotency_save_interceptor_1 = require("../src/presentation/iterceptors/idempotency-save.interceptor");
const core_module_1 = require("../src/core/core.module");
let RootTestModule = class RootTestModule {
};
exports.RootTestModule = RootTestModule;
exports.RootTestModule = RootTestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRootAsync({
                inject: [],
                useFactory: () => ({
                    throttlers: [
                        {
                            ttl: 60,
                            limit: 10,
                        },
                    ],
                }),
            }),
            infrastructure_module_1.InfrastructureModule,
            core_module_1.CoreModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: idempotency_save_interceptor_1.IdempotencySaveInterceptor,
            },
        ],
        exports: [],
    })
], RootTestModule);
//# sourceMappingURL=root-test.module.js.map
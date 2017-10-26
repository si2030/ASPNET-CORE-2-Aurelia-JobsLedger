import { PLATFORM } from 'aurelia-framework';
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.configureRouter = function (config, router) {
        config.title = 'Aurelia';
        config.map([{
                route: ['', 'home'],
                name: 'home',
                settings: { icon: 'home' },
                moduleId: PLATFORM.moduleName('../website/home/home'),
                nav: true,
                title: 'Home'
            }, {
                route: 'counter',
                name: 'counter',
                settings: { icon: 'education' },
                moduleId: PLATFORM.moduleName('../website/counter/counter'),
                nav: true,
                title: 'Counter'
            }, {
                route: 'fetch-data',
                name: 'fetchdata',
                settings: { icon: 'th-list' },
                moduleId: PLATFORM.moduleName('../website/fetchdata/fetchdata'),
                nav: true,
                title: 'Fetch data'
            }]);
        this.router = router;
    };
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map
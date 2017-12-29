var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PLATFORM, autoinject } from "aurelia-framework";
//import { test } from '../components/administration/user/listUsers/listUsers'
var Menu = /** @class */ (function () {
    function Menu() {
        this.userMenuList = new Array();
    }
    Menu.prototype.userMenu = function (userName, userRole) {
        var subLevelRoutes = Array();
        var test = Array();
        var firstLevelNode = Array();
        var secondLevelNode = Array();
        var thirdLevelNode = Array();
        var subSubNav = Array();
        var forthLevelNodes = Array();
        console.log("MENU LENGTH: ", this.menuList().length);
        for (var firstLevel = 0; firstLevel < this.menuList().length; firstLevel++) {
            if (this.menuList()[firstLevel].settings.nav) {
                for (var secondLevel = 0; secondLevel < this.menuList()[firstLevel].settings.nav.length; secondLevel++) {
                    if (this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav) {
                        for (var thirdLevel = 0; thirdLevel < this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav.length; thirdLevel++) {
                            subSubNav = [];
                            if (this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.subSubNav) {
                                for (var forthLevel = 0; forthLevel < this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.subSubNav.length; forthLevel++) {
                                    if (this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.subSubNav[forthLevel].subSubNavSettings.roles.includes(userRole)) {
                                        subSubNav.push(this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.subSubNav[forthLevel]);
                                        if (!this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.subSubNav[forthLevel].subSubNavSettings.divider) {
                                            subLevelRoutes.push(this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.subSubNav[forthLevel]);
                                        }
                                    }
                                }
                                console.log("subSubNav after: ", subSubNav);
                                console.log("subLevelRoutes: ", subLevelRoutes);
                            }
                            else {
                                if (this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.roles.includes(userRole)) {
                                    if (!this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.divider)
                                        subLevelRoutes.push(this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel]);
                                }
                            }
                        }
                    }
                    else {
                        if (this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.roles.includes(userRole)) {
                            if (!this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.divider) {
                                subLevelRoutes.push(this.menuList()[firstLevel].settings.nav[secondLevel]);
                            }
                        }
                    }
                }
                // build the node here and add it to userMenuList.
            }
            if (this.menuList()[firstLevel].settings.roles.includes(userRole)) {
                this.userMenuList.push(this.menuList()[firstLevel]);
            }
        }
        for (var nodeCount = 0; nodeCount < subLevelRoutes.length; nodeCount++) {
            this.userMenuList.push(subLevelRoutes[nodeCount]);
        }
        //console.log("SecondLevelNode: ", secondLevelNode);
        // console.log("thirdLevelNode: ", thirdLevelNode);
        //console.log("forthLevelNode: ", forthLevelNode);
        //this.userMenuList.push(secondLevelNode);
        // this.userMenuList.push(thirdLevelNode);
        // this.userMenuList.push(forthLevelNode);
        //console.log("userMenuList: ", this.userMenuList);
        return this.userMenuList;
    };
    Menu.prototype.addLowerLevelRoutes = function (userMenuList, nodes) {
        if (userMenuList === void 0) { userMenuList = new Array(); }
        if (nodes === void 0) { nodes = new Array(); }
        for (var nodeCount = 0; nodeCount < nodes.length; nodeCount++) {
        }
    };
    Menu.prototype.testForRole = function (arrayMember, userRole) {
        return arrayMember.filter(function (r) { return r.settings.roles && r.settings.roles.includes(userRole); });
    };
    Menu.prototype.menuList = function () {
        return [
            // SCHEDULER
            {
                route: ["", "scheduler"],
                name: "scheduler",
                moduleId: PLATFORM.moduleName("../components/scheduler/scheduler"),
                title: "scheduler",
                nav: true,
                settings: {
                    icon: "user",
                    roles: ["Employee", "Admin"],
                    pos: "left"
                }
            },
            // CLIENTS
            {
                route: "clients",
                name: "clients",
                moduleId: PLATFORM.moduleName("../components/clients/clientList/clientList"),
                title: "Clients",
                nav: true,
                settings: {
                    icon: "user",
                    roles: ["Employee", "Admin"],
                    pos: "left",
                    nav: [
                        {
                            route: "clients/ClientsList",
                            name: "clientList",
                            moduleId: PLATFORM.moduleName("../components/clients/clientList/clientList"),
                            href: "#clients/clientsList",
                            title: "Client List",
                            navSettings: {
                                icon: "list",
                                roles: ["Employee", "Admin"],
                            }
                        },
                        {
                            navSettings: {
                                roles: ["Employee", "Admin"],
                                divider: true,
                            }
                        },
                        {
                            route: "clients/create",
                            name: "newClient",
                            moduleId: PLATFORM.moduleName("../components/clients/newClient/newClient"),
                            href: "#clients/Create",
                            title: "Create Client",
                            navSettings: {
                                icon: "user",
                                roles: ["Employee", "Admin"],
                            }
                        }
                    ]
                }
            },
            // JOBS
            {
                route: "jobs",
                name: "jobs",
                moduleId: PLATFORM.moduleName("../components/jobs/jobsList"),
                title: "Jobs",
                nav: true,
                settings: {
                    icon: "list",
                    roles: ["Employee", "Admin"],
                    pos: "left"
                },
            },
            // ACCOUNTING
            // Accounting - 1st level route WITH SUBROUTES
            {
                route: "accounting",
                name: "accounting",
                moduleId: PLATFORM.moduleName("../components/accounting/ledgerEnquiry/ledgerEnquiry"),
                title: "Accounting",
                nav: true,
                settings: {
                    icon: "usd",
                    roles: ["Employee", "Admin"],
                    pos: "left",
                    nav: [
                        {
                            title: "Creditor Cost Invoices",
                            icon: "tasks",
                            nav: true,
                            roles: ["Employee", "Admin"],
                            navSettings: {
                                subNav: [
                                    {
                                        title: 'Creditor Payments',
                                        icon: 'usd',
                                        roles: ["Employee", "Admin"],
                                        subNavSettings: {
                                            subSubNav: [
                                                {
                                                    route: "accounting/creditorCostInvoices/payments/paymentsRegister",
                                                    name: "paymentsRegister",
                                                    moduleId: PLATFORM.moduleName("../components/accounting/creditorCostInvoices/payments/paymentsRegister/paymentsRegister"),
                                                    href: '#accounting/creditorCostInvoices/payments/paymentsRegister',
                                                    title: 'Payments Register',
                                                    subSubNavSettings: {
                                                        icon: 'list',
                                                        roles: ["Employee", "Admin"]
                                                    }
                                                },
                                                {
                                                    subSubNavSettings: {
                                                        roles: ["Employee", "Admin"],
                                                        divider: true,
                                                    }
                                                },
                                                {
                                                    route: "accounting/creditorCostInvoices/payments/creditorPromptPayments",
                                                    name: "promptPayments",
                                                    moduleId: PLATFORM.moduleName("../components/accounting/creditorCostInvoices/payments/creditorPromptPayments/creditorPromptPayments"),
                                                    href: '#accounting/creditorCostInvoices/payments/creditorPromptPayments',
                                                    title: 'Creditor Prompt Payments',
                                                    subSubNavSettings: {
                                                        icon: 'usd',
                                                        roles: ["Employee", "Admin"]
                                                    }
                                                },
                                                {
                                                    route: "accounting/creditorCostInvoices/payments/payOutstandingCreditorInvoices",
                                                    name: "payments",
                                                    moduleId: PLATFORM.moduleName("../components/accounting/creditorCostInvoices/payments/payOutstandingCreditorInvoices/payOutstandingCreditorInvoices"),
                                                    href: '#accounting/creditorCostInvoices/payments/payOutstandingCreditorInvoices',
                                                    title: 'Pay Outstanding Creditor Invoices',
                                                    subSubNavSettings: {
                                                        icon: 'edit',
                                                        roles: ["Employee" /*, "Admin"*/]
                                                    }
                                                },
                                            ],
                                        }
                                    },
                                    {
                                        subNavSettings: {
                                            roles: ["Employee", "Admin"],
                                            divider: true,
                                        }
                                    },
                                    {
                                        route: "accounting/creditorCostInvoices/listCreditorCostInvoices",
                                        name: "listCreditorCostInvoices",
                                        moduleId: PLATFORM.moduleName("../components/accounting/creditorCostInvoices/listCreditorCostInvoices/listCreditorCostInvoices"),
                                        href: '#accounting/creditorCostInvoices/listCreditorCostInvoices',
                                        title: 'List - Creditor Cost Invoices',
                                        subNavSettings: {
                                            icon: 'list',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                    {
                                        route: "accounting/creditorCostInvoices/newCreditorCostInvoices",
                                        name: "newCreditorCostInvoices",
                                        moduleId: PLATFORM.moduleName("../components/accounting/creditorCostInvoices/newCreditorCostInvoice/newCreditorCostInvoice"),
                                        href: '#accounting/creditorCostInvoices/newCreditorCostInvoices',
                                        title: 'New - Creditor Cost Invoices',
                                        subNavSettings: {
                                            icon: 'edit',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                ],
                            }
                        },
                        {
                            title: "Deposits",
                            icon: "piggy-bank",
                            roles: ["Employee", "Admin"],
                            navSettings: {
                                subNav: [
                                    {
                                        route: "accounting/deposits/depositsRegister",
                                        name: "depositsRegister",
                                        moduleId: PLATFORM.moduleName("../components/accounting/deposits/depositsRegister/depositsRegister"),
                                        href: '#accounting/deposits/depositsRegister',
                                        title: 'Deposits Register',
                                        subNavSettings: {
                                            icon: 'list',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                    {
                                        route: "accounting/deposits/newDeposits",
                                        name: "listDeposits",
                                        moduleId: PLATFORM.moduleName("../components/accounting/deposits/newDeposit/newDeposit"),
                                        href: '#accounting/deposits/newDeposits',
                                        title: 'New - Deposits',
                                        subNavSettings: {
                                            icon: 'edit',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                ],
                            }
                        },
                        {
                            navSettings: {
                                roles: ["Employee", "Admin"],
                                divider: true,
                            }
                        },
                        {
                            title: "General Journals",
                            icon: "education",
                            nav: true,
                            roles: ["Employee", "Admin"],
                            navSettings: {
                                subNav: [
                                    {
                                        route: "accounting/generalJournals/generalJournalRegister",
                                        name: "generalJournalRegister",
                                        moduleId: PLATFORM.moduleName("../components/accounting/generalJournals/generalJournalRegister/generalJournalRegister"),
                                        href: '#accounting/generalJournals/generalJournalRegister',
                                        title: 'General Journal Register',
                                        subNavSettings: {
                                            icon: 'list',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                    {
                                        route: "accounting/generalJournals/newGeneralJournal",
                                        name: "newGeneralJournal",
                                        moduleId: PLATFORM.moduleName("../components/accounting/generalJournals/newGeneralJournal/newGeneralJournal"),
                                        href: '#accounting/generalJournals/newGeneralJournal',
                                        title: 'New General Journal',
                                        subNavSettings: {
                                            icon: 'edit',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                ],
                            }
                        },
                        {
                            navSettings: {
                                roles: ["Employee", "Admin"],
                                divider: true,
                            }
                        },
                        {
                            route: "accounting/bankReconciliation",
                            name: "paymentRegister",
                            moduleId: PLATFORM.moduleName("../components/accounting/bankReconciliation/bankReconciliation"),
                            href: "#accounting/bankReconciliation",
                            title: "Bank Reconciliation",
                            navSettings: {
                                icon: "piggy-bank",
                                roles: ["Employee", "Admin"],
                            }
                        },
                        {
                            route: "accounting/BAS",
                            name: "BAS",
                            moduleId: PLATFORM.moduleName("../components/accounting/BAS/BAS"),
                            href: "#accounting/BAS",
                            title: "BAS Statement",
                            navSettings: {
                                icon: "piggy-bank",
                                roles: ["Employee", "Admin"],
                            }
                        },
                        {
                            navSettings: {
                                roles: ["Employee", "Admin"],
                                divider: true,
                            }
                        },
                        {
                            route: "accounting/ledgerEnquiry",
                            name: "ledgerEnquiry",
                            moduleId: PLATFORM.moduleName("../components/accounting/ledgerEnquiry/ledgerEnquiry"),
                            href: "#accounting/ledgerEnquiry",
                            title: "Ledger Enquiry",
                            navSettings: {
                                icon: "filter",
                                roles: ["Employee", "Admin"],
                            }
                        },
                        // account maintenance
                        {
                            navSettings: {
                                roles: ["Employee", "Admin"],
                                divider: true,
                            }
                        },
                        {
                            title: "Chart of Accounts",
                            navSettings: {
                                subNav: [
                                    {
                                        title: 'Account Maintenance',
                                        icon: 'usd',
                                        nav: true,
                                        roles: ["Employee", "Admin"],
                                        subNavSettings: {
                                            subSubNav: [
                                                {
                                                    route: "accounting/chartOfAccounts/accountMaintenance/chartOfAccountsRegister",
                                                    name: "generalJournalRegister",
                                                    moduleId: PLATFORM.moduleName("../components/accounting/chartOfAccounts/accountMaintenance/chartOfAccountsRegister/chartOfAccountsRegister"),
                                                    href: '#accounting/chartOfAccounts/AccountMaintenance/chartOfAccountsRegister',
                                                    title: 'Chart Of Accounts Register',
                                                    subSubNavSettings: {
                                                        icon: 'list',
                                                        roles: ["Employee" /*, "Admin"*/]
                                                    }
                                                },
                                                {
                                                    route: "accounting/chartOfAccounts/accountMaintenance/newAccount",
                                                    name: "newAccount",
                                                    moduleId: PLATFORM.moduleName("../components/accounting/chartOfAccounts/accountMaintenance/newAccount/newAccount"),
                                                    href: '#accounting/chartOfAccounts/AccountMaintenance/newAccount',
                                                    title: 'New Account',
                                                    subSubNavSettings: {
                                                        icon: 'usd',
                                                        roles: ["Employee", "Admin"]
                                                    }
                                                },
                                            ],
                                        }
                                    },
                                    {
                                        route: "accounting/chartOfAccounts/controlAccounts",
                                        name: "controlAccounts",
                                        moduleId: PLATFORM.moduleName("../components/accounting/chartOfAccounts/controlAccounts/controlAccounts"),
                                        href: 'accounting/chartOfAccounts/controlAccounts',
                                        title: 'Control Account Management',
                                        subNavSettings: {
                                            icon: 'list',
                                            nav: true,
                                            roles: ["Employee" /*, "Admin"*/]
                                        }
                                    },
                                ],
                                icon: "tasks",
                                nav: true,
                                roles: ["Employee", "Admin"],
                            }
                        },
                    ],
                }
            },
            // ADMINISTRAION
            {
                route: "companyDetail",
                name: "companyDetail",
                moduleId: PLATFORM.moduleName("../components/administration/companyDetail/companyDetail"),
                nav: true,
                title: "Company Detail",
                settings: {
                    icon: "list",
                    roles: ["Employee", "Admin"],
                    pos: "left"
                },
            },
            {
                route: "user",
                name: "user",
                moduleId: PLATFORM.moduleName("../components/administration/user/user"),
                nav: true,
                title: "User",
                settings: {
                    icon: "user",
                    roles: ["Employee", "Admin"],
                    pos: "right"
                },
            },
            {
                route: "notFound",
                name: "notFound",
                moduleId: PLATFORM.moduleName("../components/notFound/notFound"),
                nav: false,
                title: "Not Found",
                settings: { auth: false, roles: ["Employee", "Admin"] },
            }
        ];
    };
    Menu = __decorate([
        autoinject,
        __metadata("design:paramtypes", [])
    ], Menu);
    return Menu;
}());
export { Menu };
//# sourceMappingURL=menu1.js.map
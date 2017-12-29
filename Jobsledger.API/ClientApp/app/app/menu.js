var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { PLATFORM, autoinject } from "aurelia-framework";
var Menu = /** @class */ (function () {
    function Menu() {
        this.routeMenuItems = Array();
    }
    Menu.prototype.userMenu = function (userName, userRole) {
        var finishedRoleCheckedMenu = Array();
        var userMenuElements = Array();
        var returnedElement = {};
        for (var key in this.menuList()) {
            returnedElement = this.processElement(this.menuList()[key], userRole);
            if (returnedElement !== 'undefined') {
                userMenuElements.push(returnedElement);
            }
        }
        for (var count = 0; count < this.routeMenuItems.length; count++) {
            if (!this.routeMenuItems[count].settings.divider) {
                userMenuElements.push(this.routeMenuItems[count]);
            }
        }
        return userMenuElements;
    };
    Menu.prototype.processElement = function (element, userRole) {
        var testedElement = {};
        var settingsElement = {};
        var navElements = Array();
        var navElement = {};
        if (element.settings.roles.includes(userRole)) {
            for (var key in element) {
                if (key === "settings") {
                    for (var settingsKey in element[key]) {
                        if (settingsKey === "nav") {
                            for (var navKey in element[key][settingsKey]) {
                                navElement = this.processElement(element[key][settingsKey][navKey], userRole); // recursive call.
                                if (navElement !== 'undefined') {
                                    if (navElement.route) {
                                        this.routeMenuItems.push(navElement); // For adding the total routes at the end.
                                    }
                                    navElements.push(navElement);
                                }
                            }
                            if (navElements.length > 0) {
                                settingsElement[settingsKey] = navElements;
                            }
                        }
                        else {
                            settingsElement[settingsKey] = element[key][settingsKey];
                        }
                    }
                    testedElement[key] = settingsElement;
                }
                else {
                    testedElement[key] = element[key];
                }
            }
            return testedElement;
        }
        else {
            return 'undefined';
        }
    };
    Menu.prototype.menuList = function () {
        return [
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
            // CLIENT MENU DROPDOWN
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
                            settings: {
                                icon: "list",
                                roles: ["Employee", "Admin"],
                            }
                        },
                        {
                            settings: {
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
                            settings: {
                                icon: "user",
                                roles: ["Employee", "Admin"],
                            }
                        }
                    ]
                }
            },
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
            // ACCOUNTING MENU DROPDOWN
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
                            settings: {
                                icon: "tasks",
                                roles: ["Employee", "Admin"],
                                nav: [
                                    {
                                        title: 'Creditor Payments',
                                        settings: {
                                            icon: 'usd',
                                            roles: ["Employee", "Admin"],
                                            nav: [
                                                {
                                                    route: "accounting/creditorCostInvoices/payments/paymentsRegister",
                                                    name: "paymentsRegister",
                                                    moduleId: PLATFORM.moduleName("../components/accounting/creditorCostInvoices/payments/paymentsRegister/paymentsRegister"),
                                                    href: '#accounting/creditorCostInvoices/payments/paymentsRegister',
                                                    title: 'Payments Register',
                                                    settings: {
                                                        icon: 'list',
                                                        roles: ["Employee", "Admin"]
                                                    }
                                                },
                                                {
                                                    settings: {
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
                                                    settings: {
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
                                                    settings: {
                                                        icon: 'edit',
                                                        roles: ["Employee", "Admin"]
                                                    }
                                                },
                                            ],
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            title: "Deposits",
                            settings: {
                                icon: "piggy-bank",
                                roles: ["Employee", "Admin"],
                                nav: [
                                    {
                                        route: "accounting/deposits/depositsRegister",
                                        name: "depositsRegister",
                                        moduleId: PLATFORM.moduleName("../components/accounting/deposits/depositsRegister/depositsRegister"),
                                        href: '#accounting/deposits/depositsRegister',
                                        title: 'Deposits Register',
                                        settings: {
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
                                        settings: {
                                            icon: 'edit',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                ],
                            }
                        },
                        {
                            settings: {
                                roles: ["Employee", "Admin"],
                                divider: true,
                            }
                        },
                        {
                            title: "General Journals",
                            settings: {
                                icon: "education",
                                roles: ["Employee", "Admin"],
                                nav: [
                                    {
                                        route: "accounting/generalJournals/generalJournalRegister",
                                        name: "generalJournalRegister",
                                        moduleId: PLATFORM.moduleName("../components/accounting/generalJournals/generalJournalRegister/generalJournalRegister"),
                                        href: '#accounting/generalJournals/generalJournalRegister',
                                        title: 'General Journal Register',
                                        settings: {
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
                                        settings: {
                                            icon: 'edit',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                ],
                            }
                        },
                        {
                            settings: {
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
                            settings: {
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
                            settings: {
                                icon: "piggy-bank",
                                roles: ["Employee", "Admin"],
                            }
                        },
                        {
                            settings: {
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
                            settings: {
                                icon: "filter",
                                roles: ["Employee", "Admin"],
                            }
                        },
                        {
                            settings: {
                                roles: ["Employee", "Admin"],
                                divider: true,
                            }
                        },
                        // Account Maintenance
                        {
                            title: "Chart of Accounts",
                            settings: {
                                icon: "tasks",
                                roles: ["Employee", "Admin"],
                                nav: [
                                    {
                                        title: 'Account Maintenance',
                                        settings: {
                                            icon: 'usd',
                                            roles: ["Employee", "Admin"],
                                            nav: [
                                                {
                                                    route: "accounting/chartOfAccounts/accountMaintenance/chartOfAccountsRegister",
                                                    name: "generalJournalRegister",
                                                    moduleId: PLATFORM.moduleName("../components/accounting/chartOfAccounts/accountMaintenance/chartOfAccountsRegister/chartOfAccountsRegister"),
                                                    href: '#accounting/chartOfAccounts/AccountMaintenance/chartOfAccountsRegister',
                                                    title: 'Chart Of Accounts Register',
                                                    settings: {
                                                        icon: 'list',
                                                        roles: ["Employee", "Admin"]
                                                    }
                                                },
                                                {
                                                    route: "accounting/chartOfAccounts/accountMaintenance/newAccount",
                                                    name: "newAccount",
                                                    moduleId: PLATFORM.moduleName("../components/accounting/chartOfAccounts/accountMaintenance/newAccount/newAccount"),
                                                    href: '#accounting/chartOfAccounts/AccountMaintenance/newAccount',
                                                    title: 'New Account',
                                                    settings: {
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
                                        settings: {
                                            icon: 'list',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                ],
                            }
                        },
                    ]
                }
            },
            // ADMINISTRATION MENU DROPDOWN
            {
                route: "administration",
                name: "administration",
                moduleId: PLATFORM.moduleName("../components/administration/companyDetail/companyDetail"),
                title: "Administration",
                nav: true,
                settings: {
                    icon: "cog",
                    roles: ["Employee", "Admin"],
                    pos: "left",
                    nav: [
                        {
                            route: "administration/companyDetail",
                            name: "companyDetail",
                            moduleId: PLATFORM.moduleName("../components/administration/companyDetail/companyDetail"),
                            href: "#administration/companyDetail",
                            title: "Company Detail",
                            settings: {
                                icon: "book",
                                roles: ["Employee", "Admin"],
                            }
                        },
                        {
                            settings: {
                                roles: ["Employee", "Admin"],
                                divider: true,
                            }
                        },
                        {
                            title: "Users",
                            settings: {
                                icon: "user",
                                roles: ["Employee", "Admin"],
                                nav: [
                                    {
                                        route: "administration/users/listUsers/userList",
                                        name: "depositsRegister",
                                        moduleId: PLATFORM.moduleName("../components/administration/user/listUsers/listUsers"),
                                        href: '#administration/users/listUsers/userList',
                                        title: 'Users Register',
                                        settings: {
                                            icon: 'list',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                    {
                                        route: "administration/users/newUser/newUser",
                                        name: "newUser",
                                        moduleId: PLATFORM.moduleName("../components/administration/user/newUser/newUser"),
                                        href: '#administration/users/newUser/newUser',
                                        title: 'New - User',
                                        settings: {
                                            icon: 'edit',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                ],
                            }
                        },
                    ]
                }
            }
        ];
    };
    Menu = __decorate([
        autoinject
    ], Menu);
    return Menu;
}());
export { Menu };
//# sourceMappingURL=menu.js.map
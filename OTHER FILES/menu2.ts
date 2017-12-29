
import { Aurelia, PLATFORM, autoinject } from "aurelia-framework";
//import { test } from '../components/accounting/generalJournals/newGeneralJournal/newGeneralJournal'

@autoinject
export class Menu {
    roleBasedArray: any;
    userMenuList = new Array();

    constructor() { }

    public userMenu2(userName: string, userRole: string): any {

        var subLevelRoutes = Array();

        var test = Array();

        var firstLevelNode = Array();
        var secondLevelNode = Array();
        var thirdLevelNode = Array();

        var subSubNav = Array();
        var forthLevelNodes = Array();
        console.log("MENU LENGTH: ", this.menuList().length);

        for (var firstLevel = 0; firstLevel < this.menuList().length; firstLevel++) {  // FIRST LEVEL

            if (this.menuList()[firstLevel].settings.nav) {
                for (var secondLevel = 0; secondLevel < this.menuList()[firstLevel].settings.nav.length; secondLevel++) { // SECOND LEVEL

                    if (this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav) {
                        for (var thirdLevel = 0; thirdLevel < this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav.length; thirdLevel++) {  // THIRD LEVEL

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






                                //    subSubNav.push(this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.subSubNav.filter(r => r.subSubNavSettings.roles.includes(userRole)));

                                //    test = subSubNav.filter(r => {

                                //        console.log("test", r.subSubNavSettings)
                                //        r.subSubNavSettings.includes("divider");
                                //}); // For the routes
                                //    console.log("test:", test);


                            } else { // No forth level at this node.
                                if (this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.roles.includes(userRole)) {

                                    if (!this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel].subNavSettings.divider)
                                        subLevelRoutes.push(this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.subNav[thirdLevel])
                                }
                            }
                        }
                    } else {
                        if (this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.roles.includes(userRole)) {

                            if (!this.menuList()[firstLevel].settings.nav[secondLevel].navSettings.divider) {
                                subLevelRoutes.push(this.menuList()[firstLevel].settings.nav[secondLevel])
                            }
                        }
                    }
                }
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
    }

    addLowerLevelRoutes(userMenuList = new Array(), nodes = new Array()) {
        for (var nodeCount = 0; nodeCount < nodes.length; nodeCount++) {


        }
    }


    testForRole1(arrayMember: any, userRole: string) {
        return arrayMember.filter(r => r.settings.roles && r.settings.roles.includes(userRole))
    }

    //public userMenu(userName: string, userRole: string): any {

    //    const requiredElements = ["route", "name", "moduleId", "title", "nav"];

    //    const filteredArray = this.menuList().filter(function (itm) {
    //        return requiredElements.every(function (key) {
    //            return itm.hasOwnProperty(key);
    //        });
    //    });
    //        console.log("FilteredArray", filteredArray)
    //}
    public userMenu1(userName: string, userRole: string): any {
        this.processMenuElements1(this.menuList(), userRole)
    }

    //public processMenuElements(array: any, userRole: string): any {
    //    var userMenuList = Array();
    //    var subLevelRoutes = Array();

    //for (var count = 0; count < array.length; count++) {  
    //    if (array[count].settings.roles.includes(userRole)) {
    //        if (array[count].settings.nav) {
    //            userMenuList.push(this.processSubRoutes(array[count]));
    //        }
    //        userMenuList.push(array[count]);
    //    }
    //}

    //    //test it:
    //    console.log("userMenuList:", userMenuList)
    //}

    processMenuElements1(elements: any, userRole: string) {
        let userMenuList = Array();

        for (const key of Object.keys(elements)) {
            if (elements[key].settings.roles.includes(userRole)) {
                if (elements[key].settings.nav) {
                    console.log("TOP ELEMENT WITH NAV: ", elements[key].settings.nav)
                    userMenuList.push(this.processNavRoutes1(elements[key].settings.nav, userRole));
                } else {
                    userMenuList.push(elements[key]);
                }
            }
        }
        console.log("userMenuList: ", userMenuList)
    }


    processNavRoutes1(element: any, userRole: string) {
        let nav = Array();
        let settings = Array();

        console.log("OUR element: ", element)

        for (const key of Object.keys(element)) {

            console.log("OUTERKEY: ", key, ", OUTERVALUE: ", element[key])
            console.log("Settings - outer: ", element[key].settings)
            if (element[key].settings.nav) {

                for (const innerKey of Object.keys(element[key])) {
                    console.log("INNERKEY: ", innerKey, ", INNERVALUE: ", element[key][innerKey])

                }
            } else {
                nav.push(element[key])
            }


        }
        // build nav


        console.log("Nav: ", nav);
        //console.log("Settings: ", settings);
        return nav;
    }


    public userMenu(userName: string, userRole: string): any {
        //console.log("full MENU: ", this.menuList())
        let x = this.processElements(this.menuList(), userRole)
        //console.log("x: ", x)
        return x;
    }

    //processElements(elements: any, userRole: string) {
    //    let testedElements = Array();
    //    let navIncElements = Array();
    //    console.log("PROCESS ELEMENTS - elements:", elements)
    //    for (const key of Object.keys(elements)) {
    //        console.log("KEY: ", key, "elements[key]", elements[key]);
    //        if (elements[key].settings.roles.includes(userRole)) {
    //            if (elements[key].settings.nav) {
    //                console.log("TOP ELEMENT WITH NAV: ", elements[key])
    //                navIncElements = this.processNavElements(elements[key], userRole);
    //                console.log("KEY: ", key, ", navIncElements: ", navIncElements)
    //                testedElements[key] = navIncElements;
    //                console.log("testedElement[key]: ", testedElements[key])
    //                console.log("testedElement: ", testedElements)
    //                //testedElements.push(navIncElements);
    //            } else {
    //                testedElements.push(elements[key]);
    //            }
    //        }
    //    }
    //    console.log("testedElements:", testedElements)
    //    return testedElements;
    //}

    //processNavElements(element: any, userRole: string) {
    //    let elementWithNav = {} as any; //needs to be object!!
    //    let settings = {} as any;
    //    let nav = Array();
    //    console.log("ELEMENT: ", element)

    //    for (const key in element) {
    //        console.log("key: ", key, ", element[key]: ", element[key])

    //        if (key === "settings") {
    //            for (const innerKey of Object.keys(element[key])) {
    //                if (innerKey !== "nav") {
    //                    settings[innerKey] = element[key][innerKey];
    //                } else {
    //                    console.log("HERE!")
    //                    console.log("INNER KEY: ", innerKey, ", VALUE: ", element[key][innerKey]);
    //                    let t = this.processElements(element[key][innerKey], userRole)
    //                    settings[innerKey] = t;
    //                }
    //            }
    //            console.log("elementWithNav before: ", key)
    //            console.log("tempSettings: ", settings)
    //            elementWithNav[key] = settings;
    //            console.log("elementWithNav after: ", elementWithNav)
    //            settings = [];
    //        } else {

    //            elementWithNav[key] = element[key]
    //        }
    //    }
    //    console.log("Built element:", elementWithNav)
    //    return elementWithNav;
    //}

    //public userMenu(userName: string, userRole: string): any {
    //    return this.processElements(this.menuList(), userRole);
    //}

    processElements(elements: any, userRole: string) {
        let testedElements = Array();
        let navIncElements = {} as any;
        for (const key of Object.keys(elements)) {

            if (elements[key].name == "paymentsRegister") {
            //console.log("ELEMENTS[KEY]: ", elements[key])
            }


            if (elements[key].settings.roles.includes(userRole)) {
                if (elements[key].settings.nav) {
                    navIncElements = this.processNavElements(elements[key], userRole);
                    //testedElements.push(navIncElements);
                    testedElements[key] = navIncElements;
                } else {
                    testedElements[key] = elements[key];
                    //testedElements.push(elements[key]);
                }
            }
        }
        return testedElements;
    }

    processNavElements(element: any, userRole: string) {
        let elementWithNav = {} as any; //needs to be object!!
        let settings = Array();
        let nav = {} as any;
        for (const key in element) {
            if(element[key]){  // probably dont need this
            if (key === "settings") {
                for (const innerKey of Object.keys(element[key])) {
                    if (innerKey !== "nav") {
                        settings[innerKey] = element[key][innerKey];
                    } else {
                        settings[innerKey] = this.processElements(element[key][innerKey], userRole);
                    }
                }
                elementWithNav[key] = settings;
                settings = [];
            } else {
                elementWithNav[key] = element[key];
            }
        }
        }
        return elementWithNav;
    }


    public menuList(): any {
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

            //// CLIENTS
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
            //        ]
            //    }
            //}


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
                            settings: {
                                roles: ["Employee", "Admin"],
                                nav: [
                                    {
                                        title: 'Creditor Payments',
                                        icon: 'usd',
                                        settings: {
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
                                                        roles: ["Employee"/*, "Admin"*/]
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
                                                        roles: ["Employee"/*, "Admin"*/]
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
                                        route: "accounting/creditorCostInvoices/listCreditorCostInvoices",
                                        name: "listCreditorCostInvoices",
                                        moduleId: PLATFORM.moduleName("../components/accounting/creditorCostInvoices/listCreditorCostInvoices/listCreditorCostInvoices"),
                                        href: '#accounting/creditorCostInvoices/listCreditorCostInvoices',
                                        title: 'List - Creditor Cost Invoices',
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
                                        route: "accounting/creditorCostInvoices/newCreditorCostInvoices",
                                        name: "newCreditorCostInvoices",
                                        moduleId: PLATFORM.moduleName("../components/accounting/creditorCostInvoices/newCreditorCostInvoice/newCreditorCostInvoice"),
                                        href: '#accounting/creditorCostInvoices/newCreditorCostInvoices',
                                        title: 'New - Creditor Cost Invoices',
                                        settings: {
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
                            settings: {
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
                            title: "General Journals",
                            icon: "education",
                            nav: true,
                            settings: {
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
                        // account maintenance
                        {
                            settings: {
                                roles: ["Employee", "Admin"],
                                divider: true,
                            }
                        },
                        {
                            title: "Chart of Accounts",
                            settings: {
                                icon: "tasks",
                                roles: ["Employee", "Admin"],
                                nav: [
                                    {
                                        title: 'Account Maintenance',
                                        icon: 'usd',
                                        nav: true,
                                        settings: {
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
            }
        ]
    }
}
            //            {
            //                settings: {
            //                    roles: ["Employee", "Admin"],
            //                    divider: true,
            //                }
            //            },
            //            {
            //                title: "General Journals",
            //                icon: "education",
            //                nav: true,
            //                roles: ["Employee", "Admin"],
            //                settings: {
            //                    nav: [
            //                        {
            //                            route: "accounting/generalJournals/generalJournalRegister",
            //                            name: "generalJournalRegister",
            //                            moduleId: PLATFORM.moduleName("../components/accounting/generalJournals/generalJournalRegister/generalJournalRegister"),
            //                            href: '#accounting/generalJournals/generalJournalRegister',
            //                            title: 'General Journal Register',
            //                            settings: {
            //                                icon: 'list',
            //                                roles: ["Employee", "Admin"]
            //                            }
            //                        },
            //                        {
            //                            route: "accounting/generalJournals/newGeneralJournal",
            //                            name: "newGeneralJournal",
            //                            moduleId: PLATFORM.moduleName("../components/accounting/generalJournals/newGeneralJournal/newGeneralJournal"),
            //                            href: '#accounting/generalJournals/newGeneralJournal',
            //                            title: 'New General Journal',
            //                            settings: {
            //                                icon: 'edit',
            //                                roles: ["Employee", "Admin"]
            //                            }
            //                        },
            //                    ],
            //                }
            //            },
            //            {
            //                settings: {
            //                    roles: ["Employee", "Admin"],
            //                    divider: true,
            //                }
            //            },
            //            {
            //                route: "accounting/bankReconciliation",
            //                name: "paymentRegister",
            //                moduleId: PLATFORM.moduleName("../components/accounting/bankReconciliation/bankReconciliation"),
            //                href: "#accounting/bankReconciliation",
            //                title: "Bank Reconciliation",
            //                settings: {
            //                    icon: "piggy-bank",
            //                    roles: ["Employee", "Admin"],
            //                }
            //            },
            //            {
            //                route: "accounting/BAS",
            //                name: "BAS",
            //                moduleId: PLATFORM.moduleName("../components/accounting/BAS/BAS"),
            //                href: "#accounting/BAS",
            //                title: "BAS Statement",
            //                settings: {
            //                    icon: "piggy-bank",
            //                    roles: ["Employee", "Admin"],
            //                }
            //            },
            //            {
            //                settings: {
            //                    roles: ["Employee", "Admin"],
            //                    divider: true,
            //                }
            //            },
            //            {
            //                route: "accounting/ledgerEnquiry",
            //                name: "ledgerEnquiry",
            //                moduleId: PLATFORM.moduleName("../components/accounting/ledgerEnquiry/ledgerEnquiry"),
            //                href: "#accounting/ledgerEnquiry",
            //                title: "Ledger Enquiry",
            //                settings: {
            //                    icon: "filter",
            //                    roles: ["Employee", "Admin"],
            //                }
            //            },
            //            // account maintenance
            //            {
            //                settings: {
            //                    roles: ["Employee", "Admin"],
            //                    divider: true,
            //                }
            //            },
            //            {
            //                title: "Chart of Accounts",
            //                settings: {
            //                    nav: [
            //                        {
            //                            title: 'Account Maintenance',
            //                            icon: 'usd',
            //                            nav: true,
            //                            roles: ["Employee", "Admin"],
            //                            settings: {
            //                                nav: [
            //                                    {
            //                                        route: "accounting/chartOfAccounts/accountMaintenance/chartOfAccountsRegister",
            //                                        name: "generalJournalRegister",
            //                                        moduleId: PLATFORM.moduleName("../components/accounting/chartOfAccounts/accountMaintenance/chartOfAccountsRegister/chartOfAccountsRegister"),
            //                                        href: '#accounting/chartOfAccounts/AccountMaintenance/chartOfAccountsRegister',
            //                                        title: 'Chart Of Accounts Register',
            //                                        settings: {
            //                                            icon: 'list',
            //                                            roles: ["Employee"/*, "Admin"*/]
            //                                        }
            //                                    },
            //                                    {
            //                                        route: "accounting/chartOfAccounts/accountMaintenance/newAccount",
            //                                        name: "newAccount",
            //                                        moduleId: PLATFORM.moduleName("../components/accounting/chartOfAccounts/accountMaintenance/newAccount/newAccount"),
            //                                        href: '#accounting/chartOfAccounts/AccountMaintenance/newAccount',
            //                                        title: 'New Account',
            //                                        settings: {
            //                                            icon: 'usd',
            //                                            roles: ["Employee", "Admin"]
            //                                        }
            //                                    },
            //                                ],
            //                            }
            //                        },
            //                        {
            //                            route: "accounting/chartOfAccounts/controlAccounts",
            //                            name: "controlAccounts",
            //                            moduleId: PLATFORM.moduleName("../components/accounting/chartOfAccounts/controlAccounts/controlAccounts"),
            //                            href: 'accounting/chartOfAccounts/controlAccounts',
            //                            title: 'Control Account Management',
            //                            settings: {
            //                                icon: 'list',
            //                                nav: true,
            //                                roles: ["Employee"/*, "Admin"*/]
            //                            }
            //                        },
            //                    ],
            //                    icon: "tasks",
            //                    roles: ["Employee", "Admin"],
            //                }
            //            },
            //        ],
            //    }
            //},


            // ADMINISTRAION
            //{
            //    route: "companyDetail",
            //    name: "companyDetail",
            //    moduleId: PLATFORM.moduleName("../components/administration/companyDetail/companyDetail"),
            //    nav: true,
            //    title: "Company Detail",
            //    settings: {
            //        icon: "list",
            //        roles: ["Employee", "Admin"],
            //        pos: "left"
            //    },
            //},
            //{
            //    route: "user",
            //    name: "user",
            //    moduleId: PLATFORM.moduleName("../components/administration/user/user"),
            //    nav: true,
            //    title: "User",
            //    settings: {
            //        icon: "user",
            //        roles: ["Employee", "Admin"],
            //        pos: "right"
            //    },
            //},
            //{
            //    route: "notFound",
            //    name: "notFound",
            //    moduleId: PLATFORM.moduleName("../components/notFound/notFound"),
            //    nav: false,
            //    title: "Not Found",
            //    settings: { auth: false, roles: ["Employee", "Admin"] },
            //}
//        ];
//    }
//}

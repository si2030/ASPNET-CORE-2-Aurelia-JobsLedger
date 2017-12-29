 {
                route: "accounting",
                name: "accounting",
                moduleId: PLATFORM.moduleName("../components/accounting/ledgerEnquiry/ledgerEnquiry"),
                title: "Accounting",
                nav: true,
                settings: {
                    nav: [
                        {
                            title: "Creditor Cost Invoices",
                            navSettings: {
                                subNav: [
                                    {
                                        title: 'Creditor Payments',
                                        subNavSettings: {
                                            subSubNav: [
                                                {
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
                                                    href: '#accounting/creditorCostInvoices/payments/creditorPromptPayments',
                                                    title: 'Creditor Prompt Payments',
                                                    subSubNavSettings: {
                                                        icon: 'usd',
                                                        roles: ["Employee", "Admin"]
                                                    }
                                                },
                                                {
                                                    href: '#accounting/creditorCostInvoices/payments/payOutstandingCreditorInvoices',
                                                    title: 'Pay Outstanding Creditor Invoices',
                                                    subSubNavSettings: {
                                                        icon: 'edit',
                                                        roles: ["Employee", "Admin"]
                                                    }
                                                },
                                            ],
                                            icon: 'usd',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                    {
                                        subNavSettings: {
                                            roles: ["Employee", "Admin"],
                                            divider: true,
                                        }
                                    },
                                    {
                                        href: '#accounting/creditorCostInvoices/listCreditorCostInvoices',
                                        title: 'List - Creditor Cost Invoices',
                                        subNavSettings: {
                                            icon: 'list',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                    {
                                        href: '#accounting/creditorCostInvoices/newCreditorCostInvoices',
                                        title: 'New - Creditor Cost Invoices',
                                        subNavSettings: {
                                            icon: 'edit',
                                            roles: ["Employee", "Admin"]
                                        }
                                    },
                                ],
                                icon: "tasks",
                                roles: ["Employee", "Admin"],
                            }
                        },
                        {
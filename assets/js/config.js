'use strict';

window.AEGIS_SITE_CONFIG = {
    company: {
        name: 'AegisHome',
        logoMain: 'Aegis',
        logoAccent: 'Home',
        companyId: 'AH-SEC-2048',
        address: 'USA Service Area',
        serviceArea: 'Independent home security provider matching across selected areas in the United States'
    },

    contact: {
        phoneRaw: '+18885550198',
        phoneDisplay: '(888) 555-0198',
        phoneButtonText: 'Call AegisHome',
        phoneAria: 'Call AegisHome',
        email: 'support@aegishome.com',
        emailLabel: 'support@aegishome.com'
    },

    footer: {
        description:
            'AegisHome is an independent home security provider-matching platform that helps homeowners compare local provider options for security systems, cameras, alarms, smart locks, entry sensors, and connected smart home protection.',
        copyright: 'All rights reserved.',
        companyLinePrefix: 'Independent provider-matching platform'
    },

    legal: {
        disclaimer:
            'Disclaimer: AegisHome is an independent home security provider-matching platform. AegisHome does not directly install, sell, monitor, inspect, repair, or guarantee security systems or provider work. Homeowners choose whether to contact or hire any provider.',
        affiliateDisclosure:
            'AegisHome may receive compensation from partner networks or service providers when users submit requests or interact with matched provider options. This does not change that homeowners remain responsible for reviewing providers and making their own hiring decisions.',
        cookieNotice:
            'AegisHome uses cookies to improve site experience and understand general platform usage.'
    },

  
    legacyReplacements: {
        'AegisHome': 'company.name',
        'Aegis': 'company.logoMain',
        'Home': 'company.logoAccent',
        'support@aegishome.com': 'contact.email',
        '+18885550198': 'contact.phoneRaw',
        '(888) 555-0198': 'contact.phoneDisplay',
        'Call AegisHome': 'contact.phoneButtonText',
        'AH-SEC-2048': 'company.companyId',
        'USA Service Area': 'company.address'
    }
};
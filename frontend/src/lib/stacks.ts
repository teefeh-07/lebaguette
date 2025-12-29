
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
    showConnect({
        appDetails: {
            name: 'Le Baguette',
            icon: window.location.origin + '/vite.svg',
        },
        redirectTo: '/',
        onFinish: () => {
            window.location.reload();
        },
        userSession,
    });
}

export function getUserData() {
    if (userSession.isUserSignedIn()) {
        return userSession.loadUserData();
    }
    return null;
}

export function signout() {
    userSession.signUserOut();
    window.location.reload();
}

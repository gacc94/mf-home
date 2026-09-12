import { shareAll, withNativeFederation } from '@angular-architects/native-federation/config';

export default withNativeFederation({
    name: 'mf-home',

    // Contrato federado: expone el archivo de rutas que consumirá el Shell
    exposes: {
        './Routes': './src/app/remote.routes.ts',
    },

    // Dependencias compartidas en singleton estricto
    shared: {
        ...shareAll({
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            build: 'package',
        }),
    },

    // Módulos que no requieren compartirse
    skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
});

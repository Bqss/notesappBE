import * as Hapi from '@hapi/hapi'
import * as dot from 'dotenv'
import route from './routes.js';
const {env} = process;

dot.config()

const init = async () => {
    const server = Hapi.server({
        port: env.port,
        host: env.NODE_ENV === "production" ? "0.0.0.0":"localhost",
        routes: {
            cors: {
            origin: ["*"],
            },
        },
    });

    server.route(route);

    await server.start();
    console.log("server running on %s",server.info.uri)
}

init();




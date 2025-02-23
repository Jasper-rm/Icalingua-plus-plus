import oicqAdapter from './adapters/oicqAdapter'
import { config, userConfig } from './providers/configManager'
import { init as initSocketIo } from './providers/socketIoProvider'
import onebotAdapter from './adapters/onebotAdapter'

process.on('unhandledRejection', error => {
    console.error('UnhandledException: ', error);
});

let adapter: typeof oicqAdapter

if (config.onebot) {
    adapter = onebotAdapter
} else {
    adapter = oicqAdapter
}

initSocketIo(adapter)

if (userConfig.account.autologin) adapter.createBot(userConfig.account)

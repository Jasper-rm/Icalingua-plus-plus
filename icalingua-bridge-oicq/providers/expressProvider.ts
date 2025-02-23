import express from 'express'
import sendImgTokenManager from '../utils/sendImgTokenManager'
import type oicqAdapter from '../adapters/oicqAdapter'
import { json } from 'body-parser'
import path from 'path'

export const app = express()
const parser = json({
    limit: '100mb',
})

export const initExpress = (adapter: typeof oicqAdapter) => {
    app.post('/api/:token/sendMessage', parser, (req, res) => {
        if (req.params.token && sendImgTokenManager.verify(req.params.token)) {
            adapter.sendMessage(req.body)
            res.sendStatus(202).end()
        } else res.sendStatus(403).end()
    })
}

app.use('/file-manager', express.static(path.join(__dirname, '../static/file-manager')))
app.use('/records', express.static(path.join(require.main ? require.main.path : process.cwd(), 'data', 'records')))
app.get('/ping', (req, res) => {
    res.json({
        code: '200',
        status: 'success',
        data: 'pong',
    })
})

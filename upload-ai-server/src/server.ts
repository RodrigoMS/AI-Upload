import { fastify } from 'fastify'

const app = fastify()

app.get('/', () => {
    return 'Olá mundo'
})

app.listen({
    port: 3000,
}).then(() => {
    console.log('HTTP Server Running')
})
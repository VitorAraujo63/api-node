// const fastify = require('fastify')
// const crypto = require('crypto')

import { fastifySwagger } from '@fastify/swagger'
import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCoursesRoute } from './routes/create-courses.ts'
import { getCoursesByIdRoute } from './routes/get-courses-by-id.ts'
import { getCoursesRoute } from './routes/get-courses.ts'
import scalarAPIReference from '@scalar/fastify-api-reference'
import { loginRoute } from './routes/login.ts'


const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid, hostname',
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>()

if(process.env.NODE_ENV == 'development') {
    server.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Desafio Node.js',
            version: '1.0.0',
        }
    },
        transform: jsonSchemaTransform,
    })

    server.register(scalarAPIReference, {
    routePrefix: '/docs',
    
    })
}

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)


server.register(createCoursesRoute)
server.register(getCoursesByIdRoute)
server.register(getCoursesRoute)
server.register(loginRoute)

export { server }
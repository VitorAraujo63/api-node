import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course.ts'
import { makeAuthenticationUser } from '../tests/factories/make-user.ts'

test('Get course by id', async () => {
    await server.ready()

    const { token } = await makeAuthenticationUser('manager')
    const course = await makeCourse()

    const response = await request(server.server)
        .get(`/courses/${course.id}`)
        .set('Authorization', token)

        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            course: {
                id: expect.any(String),
                title: expect.any(String),
                description: null,
            }
        })
})

test('return 404 for non existing courses', async () => {
    await server.ready()

    const { token } = await makeAuthenticationUser('manager')

    const response = await request(server.server)
        .get(`/courses/f611cd39-b926-4424-a880-f350558aba9a`)
        .set('Authorization', token)

    expect(response.status).toEqual(404)
})
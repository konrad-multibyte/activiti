import { describe, test, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'
import { fetch } from '@nuxt/test-utils'


describe('Response Test', async () => {
    await setup({
    // test context options
    })

    test('/ 200 OK', async () => {
        const res = await fetch('/')
        const { body, headers } = res
        expect(res.status).toBe(200)
    })
})
const request = require('supertest')
let server
const reportModel = require('../../model/reportModel')

describe('/api/report' , ()=>{
    beforeEach(()=>{ server = require('../../app'); })
    afterEach(async ()=> {
        server.close();
        await reportModel.deleteMany({})
        
    })

    describe('GET /', ()=> {
        it('should return 401 if user is not logged in', async () => {
            const res = await request(server).get('/api/report')

            expect(res.status).toBe(401)

        })
        
        // it('should return all reports', async ()=>{
        //     await reportModel.collection.insertMany([
        //         {title: "Bad Road"},
        //         {title: "Bad Electricity"}
        //     ])
        //     const res = await request(server).get('/api/report')
        //     expect(res.status).toBe(200)
        //     expect(res.body.length).toBe(2)
        //     expect(res.body.some(r => r.title === 'Bad Road')).toBeTruthy()

        // })
    })
})
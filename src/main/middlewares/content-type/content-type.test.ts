import request from 'supertest'
import app from '../../config/app'
describe('Content Type Middleware', () => {
  test('should have default content-type', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
  test('should return html content type if forced', async () => {
    app.get('/test_content_type_html', (req, res) => {
      res.type('.html')
      res.send()
    })

    await request(app)
      .get('/test_content_type_html')
      .expect('content-type', /html/)
  })
})

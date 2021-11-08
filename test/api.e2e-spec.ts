import * as request from 'supertest';
import { app, db } from './setup';
import { dbDocuments } from '../src/sample-data/index';
import { ObjectID } from 'mongodb';

describe('APIController (e2e)', () => {
  beforeAll(async () => {
    await db.collection('data').insertMany(dbDocuments);
  });

  afterAll(async () => {
    await db.collection('data').drop();
  });

  // it('/ (getSubTrees): It should return all ancestors of a given node', async () => {
  //   const id = new ObjectID('5da9aef00b5e8d41605d12fd');
  //   const parentInfo = await db.collection('tree').findOne({ _id: id });
  //   const results = await db.collection('tree')
  //     .find({ ancestors: parentInfo.name })
  //     .sort({ height: 1 })
  //     .toArray();
  //   const mongoStreamingCompatibleResult = results.map(res => (
  //     {
  //       ...res,
  //       _id: (res._id).toString(),
  //       parentId: (res.parentId).toString()
  //     }))
  //   await request(app.getHttpServer())
  //     .get('/tree/search5da9aef00b5e8d41605d12fd')
  //     .expect(200)
  //     .expect({ status: 200, res: mongoStreamingCompatibleResult })
  // });

  // it('/ (getSubTrees): Bad Request with invalid request param', async () => {
  //   await request(app.getHttpServer())
  //     .get('/tree/search5da9aef00b5e8d41605d12fg')
  //     .expect({ status: 404, res: [] })
  // });

  it('/ (takeWebData): It should persist a web data into the database', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '20200208',
        sender: 'first-e2e-user',
        message: {
          foo: 'bar',
          baz: 'bang',
        },
        send_from_ip: '19.117.63.126',
        priority: 4
      })
      .expect(201)
      .set('created', 'application/json');
    expect(response.body).toEqual({});
  });

  it('/ (takeWebData): It should persist another web data into the database', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '2020-02-08T0',
        sender: 'second-e2e-user',
        message: {
          foo: 'foo without baz',
        },
        send_from_ip: '19.117.63.126',
        priority: 4
      })
      .expect(201)
      .set('created', 'application/json');
    expect(response.body).toEqual({});
  });

  it('/ (takeWebData): It should be rejected, because message should have at least one field', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '20200208',
        sender: 'first-e2e-user',
        send_from_ip: '19.117.63.126',
        priority: 4,
      })
      .expect(400)
      .set('created', 'application/json');
  });

  it('/ (takeWebData): It should be rejected, because send_from_ip is `Ipv6` NOT `Ipv4`', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '20200208',
        sender: 'first-e2e-user',
        message: {
          foo: 'bar',
          baz: 'bang',
        },
        send_from_ip: '684D:1111:222:3333:4444:5555:6:77',
        priority: 4,
      })
      .expect(400)
      .set('created', 'application/json');
  });

  it('/ (takeWebData): It should be rejected, because of non-whitelisted property', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '20200208',
        sender: 'first-e2e-user',
        message: {
          foo: 'bar',
          baz: 'bang',
        },
        send_from_ip: '19.117.63.126',
        priority: 4,
        non_whitelisted: 'Poor field, pity!',
      })
      .expect(400)
      .set('created', 'application/json');
  });
});

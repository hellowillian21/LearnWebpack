module.exports = {
  'GET /user': { name: 'willian' },
  'POST /login': (req, res) => {
    const { password, username } = req.body
    if (password === '123123' && username === 'admin') {
      return res.send({
        status: 'ok',
        code: 0,
        token: '1234567',
        data: { id: 1, name: 'willian' }
      })
    } else {
      return res.send({ status: 'error', code: 403 })
    }
  }
}
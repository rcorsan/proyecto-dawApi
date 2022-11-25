
async function authenticateUser(req, res, next) {
  // Missing discord id or access token
  if(req.method === "POST"){
    if (!req.body || !req.body.name || !req.body.password) {
      res.status(400).send({ error: "Bad request missing name || password" });
      return;
    }
  }else if (req.method === "GET"){
    if (!req.query || !req.query.name || !req.query.password) {
      res.status(400).send({ error: "Bad request missing name || password" });
      return;
    }
  }

  const name = req.method === "GET" ? req.query.name : req.body.name;
  const pass = req.method === "GET" ? req.query.password : req.body.password;
  const user = await User().findOne({name: name});
    if (!user) {
        res.status(404).send({ error: "Not found" });
        return;
    }
    if (!bcrypt.compareSync(pass, user.password)) {
        res.status(401).send({ error: "Unauthorized" });
        return; 
    }
    // Pasar el usario a la siguiente función si todo está bien
    req.user = user;
    next();
}
export default authenticateUser;

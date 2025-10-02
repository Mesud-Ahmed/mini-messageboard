const express = require("express");
const router = express.Router();

const messages = [
  { text: "Hi there!", user: "Amando", added: new Date() },
  { text: "Hello World!", user: "Charles", added: new Date() },
];

router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

router.post("/new", (req, res) => {
  const messageUser = req.body.username && req.body.username.trim();
  const messageText = req.body.messageText && req.body.messageText.trim();

  if (!messageUser || !messageText) {
    return res.redirect("/new");
  }

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });
  res.redirect("/");
});

router.get('/messages/:id',(req,res) => {
    const id = Number(req.params.id)
    const message = messages[id]

    if(!message){
        return res.status(404).send('Message not found')
    }
    res.render('message',{title:'Message Details',message: message, id: id})
})

module.exports = router;

const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(403).json({msg:"You must Login"})
  }
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(403).json({msg:"You must Login"})
  } 
  try {
    const postData = await Post.update({
      title: req.body.title,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    }
    );

  if (!postData) {
    res.status(404).json({ message: 'This ID not found' });
    return;
  }

  res.status(200).json(postData);
} catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(403).json({msg:"You must Login"})
  }
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'This ID not found' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

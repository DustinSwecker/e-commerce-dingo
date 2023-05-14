const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//all tags
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }],
    });
    return res.status(200).json(tagsData);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//get one tag by id
router.get('/:id', async (req, res) => {
  try {
    
    const oneTag = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
    });
  
    if (!oneTag) {
    res.status(404).json({message: 'No tag by that id!'});
    return;
    }

    return res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
};
});

//create a new tag
router.post('/', async (req, res) => {
  try {
    const tagPostData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update an existing tag
router.put('/:id', async (req, res) => {
  try {
    const tagUpdateData = await Tag.update({
      tag: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagUpdateData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json('Category deleted');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

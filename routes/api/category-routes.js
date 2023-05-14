const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    
    const categoryForOneData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
    });
  
    if (!categoryForOneData) {
    res.status(404).json({message: 'No category by that id!'});
    return;
    }

    res.status(200).json(categoryForOneData);
  } catch (err) {
    res.status(500).json(err);
};
})

router.post('/', async (req, res) => {
  try {
    const categoryPostData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryUpdateData = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryUpdateData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({
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

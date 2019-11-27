/* eslint-disable no-underscore-dangle */

// External Dependencies
const mongoose = require('mongoose');

// Internal Dependencies
const {
  Account,
  AccountGifTag,
  Gif,
  Tag,
} = require('../models');

// Local Variables
const { ObjectId } = mongoose.Types;

// Renames id from giphy data to avoid issues
const gifFromGiphyData = ({ id, ...giphyData }) => new Gif({
  giphyId: id,
  ...giphyData,
});

const handleError = errorMessage =>
  (error) => {
    if (error) {
      throw new Error(errorMessage);
    }
  };

// Endpoint Function Definitions
exports.postGifToAccount = async (req, res) => {
  const { accountid } = req.params;
  const {
    giphyData,
    tags,
  } = req.body;

  try {
    // Get account
    const account = await Account.findById(new ObjectId(accountid));

    // Get gif, add to db if it doesn't exist
    const gifs = await Gif.find({ giphyId: giphyData.id });

    let gif;
    if (!gifs.length) {
      console.log(`Saving new gif ${giphyData.id}`);
      gif = gifFromGiphyData(giphyData);
      gif.save(handleError('Error saving gif to db'));
    } else {
      // eslint-disable-next-line prefer-destructuring
      gif = gifs[0];
    }

    // Get tags, add them to db if they don't exist
    let tagModels = [];
    const matchingTags = await Tag.find({ description: { $in: tags } });
    const matchingTagNames = matchingTags.map(t => t.description);
    const newTags = tags.filter(t => !matchingTagNames.includes(t));

    newTags.forEach((tagName) => {
      console.log(`Saving new tag ${tagName}`);
      const currentTagModel = new Tag({ description: tagName });

      tagModels.push(currentTagModel);
      currentTagModel.save(handleError(`Error saving tag ${tagName} to db`));
    });

    tagModels = tagModels.concat(matchingTags);

    // Update/create link between tags, gif, and account
    const accountGifTags = new AccountGifTag({
      accountId: account._id,
      gifId: gif._id,
      tagIds: tagModels,
    });

    accountGifTags.save(handleError('Error saving AccountGifTag'));

    // Save gif to account
    account.gifs.push(gif);
    account.save(handleError('Error saving account changes to db'));
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }

  res.status(200).end();
};

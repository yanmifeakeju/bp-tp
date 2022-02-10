import asyncHandler from '../../../helpers/async-handler';

const create = asyncHandler(async (req, res) => {
  res.send('Hello');
});

export default create;

export const showData = (req, res) => {
  res.status(200).send(req.params.data);
};

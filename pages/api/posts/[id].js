// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import posts from '../../../database.json';

export default function handler(req, res) {
  res.status(200).json(posts.find(item => item.id == req.query.id));
}

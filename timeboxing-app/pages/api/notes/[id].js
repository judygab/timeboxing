import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const note = await Note.findById(id);

        if (!note) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: note });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const note = await Note.findByIdAndUpdate({
          new: true,
          runValidators: true
        });

        if (!note) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: note });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedNote = await Note.deletedOne({ _id: id });

        if(!deletedNote) {
          return res.status(400).json({ success: false });
        }

        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(400).json({ success: false});
      }
      break;
    default:
      return res.status(400).json({ success: false});
      break;
  }
}

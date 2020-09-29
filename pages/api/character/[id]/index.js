import mongoConnect from '../../../../utils/mongoConnect';
import DeletedCharacter from '../../../../models/Deleted';

mongoConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const d_character = await DeletedCharacter.find({});
                res.status(200).json({ success: true, data: d_character })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const d_character = await DeletedCharacter.create(req.body);
                res.status(201).json({ success: true, data: d_character })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const d_character = await DeletedCharacter.deleteOne(req.body);
                res.status(201).json({ success: true, data: d_character })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
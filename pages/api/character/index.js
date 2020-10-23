import mongoConnect from '../../../utils/mongoConnect';
import Character from '../../../models/Character';

mongoConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const character = await Character.find({});
                res.status(200).json({ success: true, data: character })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST': 
            try {
                const character = await Character.create(req.body);
                res.status(201).json({ success: true, data: character })
            } catch (error) {
                console.log (error)
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const character = await Character.deleteOne(req.body);
                res.status(201).json({ success: true, data: character })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
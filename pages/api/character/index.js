import mongoConnect from '../../../utils/mongoConnect';
import Character from '../../../models/Character';

mongoConnect();

export default async (req, res) => {
    const { method } = req;
    console.log("api/character method: ", method)
    switch (method) {
        case 'GET':
        console.log("api/character GET: ")
            try {
                //const character = await Character.find({ $type : "object" });
                //findOne({}
                const character = await Character.findOne({});
                console.log("api GET response : ")
                console.log(response)
                //character = character || []
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
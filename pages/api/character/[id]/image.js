import mongoConnect from '../../../../utils/mongoConnect';
import Image from '../../../../models/Image';

mongoConnect();

export default async (req, res) => {
    const {
        query: { id, name},
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                console.log ("api/character/[id]/image.js GET, name = ", name);
                const image = await Image.findOne({name:name});
                if (image) {
                    console.log("image at GET found")
                    //return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: null });
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}
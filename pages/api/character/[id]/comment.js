import mongoConnect from '../../../../utils/mongoConnect';
import Comment from '../../../../models/Comment';

mongoConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const comment = await Comment.findById(id);
                if (!comment) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: comment });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            console.log("at api/[id].comment.js POST")
            console.log(req.body)
            try {
                const comment = await Comment.create(req.body);
                res.status(201).json({ success: true, data: comment })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const comment = await Comment.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!comment) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: comment });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedComment = await Comment.deleteOne({ id: id });
                if (!deletedComment) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}
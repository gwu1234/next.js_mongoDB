import mongoConnect from '../../../../utils/mongoConnect';
import Comment from '../../../../models/Comment';

mongoConnect();

export default async (req, res) => {
    const {
        query: { _id, id },
        method
    } = req;

    console.log ("id at api = ", id);
    console.log ("method = ", method);
    console.log ("_id = ", _id);

    switch (method) {
        case 'GET':
            try {
                console.log("at api/[id].comment.js GET")
                //const comment = await Comment.findById({id: parseInt(id)});
                const comment = await Comment.find();
                if (!comment) {
                    console.log("not found")
                    return res.status(400).json({ success: false });
                }
                //console.log(comment)
                res.status(200).json({ success: true, data: comment });
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            console.log("at api/[id].comment.js POST")
            console.log(req.body)
            try {
                const comment = await Comment.create(req.body);
                console.log (comment)
                res.status(201).json({ success: true, data: comment })
            } catch (error) {
                console.log (error)
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                console.log("at api/[id].comment.js PUT")
                const comment = await Comment.findByIdAndUpdate(_id, req.body, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                });

                if (!comment) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: comment });
            } catch (error) {
                console.log (error)
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
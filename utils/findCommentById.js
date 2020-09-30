const findCommentById = (id, allComments)=> {
    //console.log("findCommentById")
    //console.log(id)
    let comments = []
    for (var com of allComments) {
        console.log(com.id)
         if (parseInt(id) === parseInt(com.id)) {
            return com
         }
    }
    return {};
}

export default findCommentById;
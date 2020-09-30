const findCommentById = (id, allComments)=> {
    for (var com of allComments) {
        console.log(com.id)
         if (parseInt(id) === parseInt(com.id)) {
            return com
         }
    }
    return null;
}

export default findCommentById;
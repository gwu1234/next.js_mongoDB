const isDeleted = (character, deleteds)=> {
    for (var del of deleteds) {
         if (del.id === character.id) {
             return true
         }
    }
    return false;
}

export default isDeleted;
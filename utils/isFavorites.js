const isFavorite = (character, favorites)=> {
    for (var favorite of favorites) {
         if (favorite.id === character.id) {
             return true
         }
    }
    return false;
}

export default isFavorite;
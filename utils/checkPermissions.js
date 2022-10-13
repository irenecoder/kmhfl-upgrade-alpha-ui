/*
* @params(
    searchTerm RegExp
    permissions Array<Strings>
    )

* @return (
    boolean
 ) 
*
*/

const hasPermission = (searchTerm, permissions) => {

    const found = permissions ? permissions.filter(permission => permission.match(searchTerm) !== null) : []

    console.log({found})
    return found.length > 0
}



export {
    hasPermission,
}
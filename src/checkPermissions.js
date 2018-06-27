import { findRole } from "./createRole";

function matchParams( permissionEndPoint, endPoint ){
    let params = permissionEndPoint.split('/').filter( pt => !!pt )
    let values = endPoint.split('/').filter( pt => !!pt )
    let paramsObj = {}
    for (let i = 0; i < params.length; i++) {
        let param = params[i], value = values[i]
        if ( param.charAt(0)===':' ){
            Object.assign( paramsObj, { [param.slice(1)]: value } )
        }
    }
    return paramsObj
}

function checkIfParamsAccepted( params ) {
    const { role, permission, permissionParams, verb } = this
    const testCondition = permission.getCondition(verb)
    return testCondition(params,permissionParams)
}

function checkIfEndPointExits( endPoint ){
    const { role, verb } = this
    const permission = role.getPermission( endPoint )
    if( permission.error ) return ({ error: `endpoint '${endPoint}' doesn't exist`})
    const permissionParams = matchParams( permission.endPoint, endPoint )
    const hasParams = Object.keys(permissionParams).length;
    if ( hasParams ){
        return { role, permission, permissionParams, verb, when: checkIfParamsAccepted }
    }
    return permission.hasAccessMethodTo( verb, endPoint )
}

function checkIfHasAccessMethod( verb ){
    const { role } = this
    return { role, verb, to: checkIfEndPointExits, from: checkIfEndPointExits }
}

function checkIfRoleExists( roleName ){
    const role = findRole( roleName )
    return (
        !!role
        ? { role: role.role, can: checkIfHasAccessMethod }
        : false
    )
} 

export default {
    if: checkIfRoleExists
}
import { can } from './grantPermissions';

/**
 * store created access roles
 */
export const accessRoles = (function (){

    /**
     * roles
     * @private
     */
    const roles = { /** ACCESS ROLES REGISTER */ }

    return {

        /**
         * @param {AccessRole} role add new role
         */
        add: function ( role ){
            Object.assign( roles, {[ role.roleName ]: role } )
        },
        
        /**
         * @param {AccessRole} role add new role
         */
        get: function ( roleName ){
            return roles.hasOwnProperty( roleName )
            ? roles[ roleName ]
            : null
        }
        
    }
})();


/**
 * Access Role Constructor Class
 */
export class AccessRole {

    constructor( roleName ){
        this.roleName = roleName
        this.permissions = { /** USER PERMISSIONS */ }
    }

    grantPermission( permission ){
        return this.permissions[ permission.endPoint ] = permission
    }

    getPermission( endPoint ){
        
        for (let key in this.permissions) {
            let permission = this.permissions[key]
            if ( permission.hasEndPoint( endPoint ) ) return permission
        }

        return ({ error: `Couldn't find permission '${endPoint}'` })
    }

}


/**
 * 
 * @param {string} roleName creates access role instance
 */
export function createRole( roleName ){

    const role = new AccessRole( roleName )

    accessRoles.add( role )
    
    return {
        value: role,
        message: `Role '${roleName}' was created successfully`
    }

}

/**
 * 
 * @param {string} roleName find role by name
 */
export function findRole( roleName ){

    let role = accessRoles.get( roleName )
    
    return (
        role
        ? { role, can }
        : { error: `Couldn't find role '${roleName}'`}
    )
}
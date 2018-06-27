function normalizeVerb( verb ){
    return 'CAN_' + verb.toUpperCase()
}

const accessMethods = {
    "CAN_GET"   : 2 ** 0,   // 00000001
    "CAN_POST"  : 2 ** 1,   // 00000010
    "CAN_DELETE": 2 ** 2,   // 00000100
    "CAN_PATCH" : 2 ** 3,   // 00001000
    "CAN_PUT"   : 2 ** 4    // 00010000
}

function generateMatchExpression( endPoint ){
    let regexStr = endPoint.split('/').map( pt => pt.charAt(0) === ':' ? '[^\/)]+' : pt ).join('/')
    return new RegExp( '^' + regexStr + '$', 'g' )
}


class Permission {
    /**
     * 
     * @param {string} endPoint end
     * @param {EndPoint} endPoint end point matcher
     */
    constructor( endPoint ){
        this.grantedMethods = 0
        this.endPoint = endPoint
        this.conditions = {}
        this.matchExpression = generateMatchExpression( endPoint )
    }

    grantAccessMethod( verb ){
        let methodId = normalizeVerb( verb )
        this.grantedMethods |= accessMethods[methodId]
    }

    hasEndPoint( endPoint ){
        return !!endPoint.match( this.matchExpression )
    }

    hasAccessMethodTo( verb, endPoint ){
        let method = normalizeVerb( verb )
        const methodGranted = this.grantedMethods & accessMethods[method]
        const endpointExists = this.hasEndPoint( endPoint )
        return methodGranted && endpointExists
    }

    addCondition( condition, verb ){
        return this.conditions[verb] = condition
    }

    getCondition( verb ){
        return this.conditions[verb]
    }
}

function when( condition ){
    const { role, permission, verb } = this
    return permission.addCondition( condition, verb )    
}

function to( endPoint ){
    let { role, verb } = this
    let permission = new Permission( endPoint )
    permission.grantAccessMethod( verb )
    role.grantPermission( permission )
    return { role, permission, verb, when }
}

export function can( verb ){
    let { role } = this
    return { role, verb, to, from: to }
}
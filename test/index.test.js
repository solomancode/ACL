import test from 'ava';
import acl, { a, an, check } from '../dist/bundle';

/**
 * SHARED TEST OBJECTS
 */
const get = 'get'
const post = 'post'

const admin = 'admin'
const user = 'user'

const endPoint1 = '/users/:userId/articles'
const endPoint2 = '/articles'

const adminRole = acl.createRole(admin).value
const userRole = acl.createRole(user).value

const testCondition = ( params, data ) => (params.userId === data.userId );

an(admin).can(get).from(endPoint1)
an(admin).can(post).to(endPoint1).when(testCondition);
a(user).can(get).from(endPoint2)


/**
 * TESTS
 */
test('create new access role', t => {
    t.true( adminRole.roleName === admin )    
})

test('select access role', t => {
    t.true( an(admin).role.roleName === admin )
})

test('check if role has an access verb to a static end point', t => {    
    t.true( check.if(user).can(get).from(endPoint2) )
})

test('check if role has an access verb to a conditional end point', t => {    
    const endPointExample = '/users/16/articles'
    t.true( check.if(admin).can(post).to(endPointExample).when({ userId: '16' }) )
})
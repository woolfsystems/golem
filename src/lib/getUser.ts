
import { createAuth0Client, Auth0ClientOptions, PopupTimeoutError, User } from '@auth0/auth0-spa-js'

export const getUser = (config: Auth0ClientOptions): Promise<User> =>
    new Promise((resolve,reject)=>{
        createAuth0Client(config).then((auth0)=>{
            auth0.isAuthenticated().then((hasAuth)=>{
                if(hasAuth){
                    resolve(auth0.getUser())
                    return
                }
                try {
                    auth0.loginWithPopup().then(()=>
                        auth0.getUser()
                    ).then((user)=>{
                        if(user!==undefined)
                            resolve(user)
                        else
                            reject(new Error('Invalid user from Auth0'))
                    }).catch((login_error)=>{
                        console.error(login_error)
                        throw "Auth0 login failed"
                        reject(login_error)
                    })
                } catch (error){
                    if (error instanceof PopupTimeoutError) {
                        // custom logic to inform user to retry
                        error.popup.close()
                        reject(error)
                    }
                }
            })
        })
    })

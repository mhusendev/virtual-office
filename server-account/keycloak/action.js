var axios = require('axios');
const { json } = require('body-parser');
var qs = require('qs');
var config_keycloak = {
    account_client_id: 'virtual-office',
    account_client_secret: '35H5KJB87E8ftY9b0qf2bYmDLFlBH3hI',
    admin_client_id:'admin-cli',
    admin_client_secret: 'lMOE5VQdPGa9H9ceZtZOAbZ0v6NHNKCu'
}
var URL_PARAM = {
    MASTER: 'https://keycloak.cws.co.id/realms/master',
    ADMIN: 'https://keycloak.cws.co.id/admin/realms/virtual-office',
    CLIENT:'https://keycloak.cws.co.id/realms/virtual-office'
}



const authKeycloack = async (token) => {
    var value;
    var data = qs.stringify({
        'token': token,
        'client_id': config_keycloak.account_client_id,
        'client_secret': config_keycloak.account_client_secret
    });
    var config = {
        method: 'post',
        url: URL_PARAM.CLIENT + '/protocol/openid-connect/token/introspect',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    await axios(config)
        .then((response) => {
            let hasil = response.data;

            if (hasil.active == false) {
                value = false
                // console.log(value)
            } else {
                // console.log(hasil)
                value = true

            }
        })
        .catch((error) => {
            console.log("data eror");
            value = false
            //   res.sendStatus(401)
        });

    return value
}
const getToken = async (req,reftoken) => {
//    let session = await req.session
    var value;
    // console.log(reftoken)
    var data = qs.stringify({
        'refresh_token': reftoken,
        'client_id': config_keycloak.account_client_id,
        'client_secret': config_keycloak.account_client_secret,
        'grant_type': 'refresh_token'
    });
    var config = {
        method: 'post',
        url: URL_PARAM.CLIENT + '/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
    // console.log(JSON.stringify(config))
    await axios(config)
        .then((response) => {
            
            // console.log(response)
            let token = response.data
             
            // console.log(response.status)
            //    console.log(token)
            if (response.status == 400) {
                value ={status: false, session: req.session }
            } else {
                //   console.log("ini sesi"+session)
                // console.log(response.data)
                
                req.session = {
                    passport: {
                        user: {
                            access_token: token.access_token,
                            refresh_token: token.refresh_token,
                            date: new Date()
                        }
                    }
                }
                 session_to_b = {
                    passport: {
                        user: {
                            access_token: token.access_token,
                            refresh_token: token.refresh_token,
                           
                        }
                    }
                 }
                if(!req.session.hasOwnProperty('passport')) {
                    value = {status: true, session: session_to_b}
           
                }
                else {
     
                    value ={status: true, session: session_to_b }
                }
               
                // console.log(JSON.stringify(req.session))
            }

        })
        .catch((error) => {

            //   res.sendStatus(401)
            value ={status: false, session: req.session }
            // console.log(error)
        });

    return value
}



const getInfo = async (access_token) => {
    var value;
    //    console.log(reftoken)
 
        var config = {
            method: 'GET',
            url: URL_PARAM.CLIENT + '/protocol/openid-connect/userinfo',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },

        };

        await axios(config)
            .then((response) => {


                value = response
                // console.log(response)

            })
            .catch((error) => {
                // console.log(error);
                // console.log(error)
                value = error.response
            });

    


    return value
}

const logOut = async (refToken) => {
    var value;
    var data = qs.stringify({
        'refresh_token': refToken,
        'client_id': config_keycloak.account_client_id,
        'client_secret': config_keycloak.account_client_secret
    });
    var config = {
        method: 'post',
        url: URL_PARAM.CLIENT + '/protocol/openid-connect/logout',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
    await axios(config)
        .then((response) => {
            value = response.status
        })
        .catch((error) => {
            console.log(error)
            //   res.sendStatus(401)
        });

    return value

}


const update_password = async (data) => {
    var value ;
    var tokenadmin = await token_admin();
    var sendata = {
        credentials: data.credentials,

    }
    var config = {
        method: 'put',
        url: URL_PARAM.ADMIN+ '/users/'+data.id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenadmin
        },
        data: sendata
    }
    await axios(config)
    .then((response) => {
        value = response
    })
    .catch((error) => {
        // console.log(error)
        value = error.response
    });

return value
}
const token_admin = async () => {
    var value;
    var data = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': config_keycloak.admin_client_id,
        'client_secret': config_keycloak.admin_client_secret
    });
    var config = {
        method: 'post',
        url: URL_PARAM.MASTER+'/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

        },
        data: data
    }

    await axios(config)
        .then((response) => {
            value = response.data.access_token
        })
        .catch((error) => {
            console.log("eror get tokenadmin");
            //   res.sendStatus(401)
        });

    return value
}

const register = async (data) => {
    var tokenadmin = await token_admin();
    var value
   
    var sendata = {
        enabled: data.enabled,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        credentials: data.credentials,
        groups: [],
        attributes: {
            birth: JSON.stringify(data.attributes.birth),
            phone: data.attributes.phone,
            gender:data.attributes.gender,
            image:JSON.stringify({baseurl:"",file_name:"", ext_file:""}),
            job_title:data.attributes.job_title,
            current_position:data.attributes.current_position
          
        }
    }
    // console.log(sendata)
    var config = {
        method: 'post',
        url: URL_PARAM.ADMIN+ '/users',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenadmin
        },
        data: sendata
    }
    await axios(config)
        .then((response) => {
            value = response
            // console.log(response)
        })
        .catch((error) => {
            // console.log(error)
            value = error.response
        });

    return value
}

const update_attribute = async (data) => {
    var tokenadmin = await token_admin();
    var value
    var sendata
    if (data != null) {
        if (data.hasOwnProperty('attr')) {
            sendata = {
                attributes: {
                    alamat_info: JSON.stringify(data.attr.alamat_info),
                    birth: JSON.stringify(data.attr.birth),
                    phone: data.attr.phone,
                    image:JSON.stringify(data.attr.image),
                    gender: data.attr.gender,
                }
            }

        } else {
            sendata = data
        }

        var config = {
            method: 'put',
            url: URL_PARAM.ADMIN+ '/users/' + data.id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenadmin
            },
            data: sendata
        }
        await axios(config)
            .then((response) => {
                value = response
            })
            .catch((error) => {
                // console.log("eror di update")
                // console.log(error)
                value = error.response
            });
    } else {
        value = { status: 405, message: 'invalid parameter' }
    }
    return value
}

const SearchEmail = async (email) => {
    var tokenadmin = await token_admin();
    var value
   
    
    // console.log(sendata)
    var config = {
        method: 'GET',
        url: URL_PARAM.ADMIN+ '/users?email='+email,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenadmin
        }
    }
    await axios(config)
        .then((response) => {
            value = response
       
        })
        .catch((error) => {
            // console.log(error)
            value = error.response
        });

    return value
}
const find_Email_token_valid = async (email,token) => {
    var tokenadmin = await token;
    var value
   
    
    // console.log(sendata)
    var config = {
        method: 'GET',
        url: URL_PARAM.ADMIN+ '/users?email='+email,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenadmin
        }
    }
    await axios(config)
        .then((response) => {
            value = response
       
        })
        .catch((error) => {
            // console.log(error)
            value = error.response
        });

    return value
}

module.exports = { 
    update_password,
    authKeycloack, 
    token_admin,
    register, 
    logOut, 
    getInfo, 
    update_attribute,
    getToken,
    find_Email_token_valid,
    SearchEmail }
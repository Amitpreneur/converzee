const axios = require("axios");
const User = require("../models/user");

const switch_responder = ( apiJson, action, responder ) => {
    switch(responder){
        case 'MAILCHIMP':
            return Mailchimp( apiJson, action );
        break;
        case 'AWEBER':
            return Aweber( apiJson, action, responder );
        break;
        case 'ACTIVE_CAMPAIGN':
            return ActiveCampaign( apiJson, action );
        break;
        case 'CONSTANT_CONTACT' :
            return ConstantContact( apiJson, action );
        break;
        case 'CONVERT_KIT':
            return ConvertKit( apiJson, action );
        break;
        case 'INFUSION_SOFT':
            return InfusionSoft( apiJson, action );
        break;
        case 'SENDIIO':
            return Sendiio( apiJson, action );
        break;
        case 'MAILVIO':
            return Mailvio( apiJson, action );
        break;
        case 'GETRESPONSE':
            return GetResponse( apiJson, action );
        break;
        case 'SENDLANE': 
            return Sendlane( apiJson, action );
        break; 
    }
}

async function Mailchimp( apiJson, action ){
    const Mailchimp = require('mailchimp-api-v3');
    let result = {} , sl = [];
    
    if(action === "getList") {
        try {
            var mailchimp = new Mailchimp(apiJson["apikey"]);
          
            let retval = await mailchimp.get('/lists?count=100');
            if(retval.lists) {
                if(retval.lists.length) {
                    for(let i=0; i<retval.lists.length; i++) {
                        sl.push({
                            "id" : retval.lists[i].id,
                            "name" : retval.lists[i].name
                        });
                    }
                    result['lists'] = sl ;
                } else {
                    result['error'] = 'There is no list in your account.';
                }
            } else {
                result['error'] = 'Error occur may be somethig wrong.';
            }
        } catch(err) {
            result['error'] = 'Invalid credentials please check and retry.';
        }
    }

    if(action === "subscribe") {
        const { name, email, apikey, uid } = apiJson;
        var md5 = require("md5");
        var mailchimp = new Mailchimp(apikey);

        await mailchimp.post(`/lists/${uid}/members`, {
            email_address : email,
            status : 'subscribed'
        })
        .then(async function(resp) {
            if(resp) {
                if(name) {
                    name = name.split(" ");
                    let subscriber_hash = md5(email);
                    let members = await mailchimp.patch(`/lists/${uid}/members/${subscriber_hash}`, {
                        'merge_fields' : { "FNAME" : name[0], "LNAME" : name[1] ? name[1] : "" }
                    });
                }
                result["message"] = 'Thank you, for your subscription.';
            }
        })
        .catch(function (err) {
            if(err.statusCode == 400) {
                result['error'] =  err.detail;
            }
        });
        
    }

    return result;
}


async function Aweber( apiJson, action ){
    let result = {} , sl = [];
    
    if(action === "getList") {
        const { clientId, clientSecret, refresh_token, userId } = apiJson
        // get access token 
        let params = new URLSearchParams({
            refresh_token: refresh_token,
            grant_type: "refresh_token"
        })
        
        let query = params.toString();
        let auth = clientId+":"+clientSecret;
        // convert clientId and clientSecret to base64 encode.
        let buff = new Buffer(auth);
        let base64data = buff.toString('base64');
        
        // await getAccessToken("https://auth.aweber.com/oauth2/token?", query, base64data);

        await axios.post(`https://auth.aweber.com/oauth2/token?${query}`,{},{
            headers : {
                Authorization : `Basic ${base64data}`
            }
        }).then(async response => {
            if(response.data) {
                apiJson["refresh_token"] = response.data.refresh_token;

                // get account Id 
                let getAccountId = await axios.get(`https://api.aweber.com/1.0/accounts`, {
                    headers : {
                        "Accept": "application/json",
                        "User-Agent": "AWeber-Node-code-sample/1.0",
                        "Authorization": `Bearer ${response.data.access_token}`
                    }
                })

                if(getAccountId.data) {
                    let accountId = getAccountId.data.entries[0].id;
                    let getLists = await axios.get(`https://api.aweber.com/1.0/accounts/${accountId}/lists/`, {
                        headers : {
                            "Accept": "application/json",
                            "User-Agent": "AWeber-Node-code-sample/1.0",
                            "Authorization": `Bearer ${response.data.access_token}`
                        }
                    })
                    
                    if(getLists.data.entries) {
                        if(getLists.data.entries.length) {
                            for(let i=0; i<getLists.data.entries.length; i++) {
                                sl.push({
                                    "id" : getLists.data.entries[i].id,
                                    "name" : getLists.data.entries[i].name
                                });
                            }
                            result['lists'] = sl ;
                        } else {
                            result['error'] = 'There is no list in your account.';
                        }
                    } else {
                        result['error'] = 'Error occur may be somethig wrong.';
                    }
                } else {
                    result['error'] = 'Error occur may be somethig wrong.';
                }
                updateUserData(userId, apiJson);
            }
        }).catch(err => {
            // console.log("err", err);
            result['error'] = 'Error occur may be somethig wrong.';
        });
    }

    if(action === "subscribe") {
        const { clientId, clientSecret, refresh_token, userId, name, email, uid } = apiJson
        // get access token 
        let params = new URLSearchParams({
            refresh_token: refresh_token,
            grant_type: "refresh_token"
        })
        
        let query = params.toString();
        let auth = clientId+":"+clientSecret;
        // convert clientId and clientSecret to base64 encode.
        let buff = new Buffer(auth);
        let base64data = buff.toString('base64');
        
        await axios.post(`https://auth.aweber.com/oauth2/token?${query}`,{},{
            headers : {
                Authorization : `Basic ${base64data}`
            }
        }).then(async response => {
            if(response.data) {
                apiJson["refresh_token"] = response.data.refresh_token;

                // get account Id 
                let getAccountId = await axios.get(`https://api.aweber.com/1.0/accounts`, {
                    headers : {
                        "Accept": "application/json",
                        "User-Agent": "AWeber-Node-code-sample/1.0",
                        "Authorization": `Bearer ${response.data.access_token}`
                    }
                })

                if(getAccountId.data) {
                    let accountId = getAccountId.data.entries[0].id;
                    var qs = require('qs');
                    var postdata = qs.stringify({
                        "name": name,
                        "email": email,
                        "strict_custom_fields": true,
                        "tags": ["slow", "fast", "lightspeed"]
                    });

                    var config = {
                        method: 'post',
                        url: `https://api.aweber.com/1.0/accounts/${accountId}/lists/${uid}/subscribers`,
                        headers: { 
                          'Content-Type': 'application/x-www-form-urlencoded', 
                          'Accept': 'application/json', 
                          'Authorization': 'Bearer '+response.data.access_token
                        },
                        data : postdata
                      };
                      
                    await axios(config)
                    .then(function (resp) {
                        if(resp.data) {
                            result["message"] = 'Thank you, for your subscription.';
                        }
                    })
                    .catch(function (error) {
                        if(error.response.data) {
                            result["error"] = error.response.data.error_message;
                        } else {
                            result["error"] = "Subscribe was unsuccessful. Please try again in 15 minutes..."
                        }
                    });
                } else {
                    result['error'] = 'Error occur may be somethig wrong.';
                }
                updateUserData(userId, apiJson);
            }
        }).catch(err => {
            // console.log("err", err);
            result['error'] = 'Error occur may be somethig wrong.';
        });
    }
    return result;
}

async function ActiveCampaign( apiJson, action ){
    let result = {} , sl = [];
    
    if(action === "getList") {
        try {
            const { apikey, url } = apiJson;
            let params = new URLSearchParams({
                'api_key'     : apikey,
                'api_action'  : 'list_paginator',
                'api_output'  : 'json',
                'somethingthatwillneverbeused': '',
                'sort'        : '',
                'offset'      : 0,
                'limit'       : 20,
                'filter'      : 0,
                'public'      : 0
            })
            
            let query = params.toString();
            let getLists = await axios.get(`${url}/admin/api.php?${query}`)
            if(getLists.data.rows) {
                if(getLists.data.rows.length) {
                    for(let i=0; i<getLists.data.rows.length; i++) {
                        sl.push({
                            "id" : getLists.data.rows[i].id,
                            "name" : getLists.data.rows[i].name
                        });
                    }
                    result['lists'] = sl ;
                } else {
                    result['error'] = 'There is no list in your account.';
                }
            } else {
                result['error'] = 'Error occur may be somethig wrong.';
            }
        } catch (err) {
            result['error'] = 'Invalid credentials please check and retry.';
        }
    }

    if(action === 'subscribe'){
        const { apikey, url, uid, email, name } = apiJson;
        
        let params = new URLSearchParams({
            'api_key'     : apikey,
            'api_action'  : 'contact_add',
            'api_output'  : 'json'
        })
        
        let query = params.toString();

        let data = new URLSearchParams({
            'email'     : email,
            'name'  : name,
            'tags'  : 'api',
            'p[1]'  : uid,
            'status[1]': 1,
            'instantresponders[123]': 1
        })

        let postData = data.toString();
        let retval = await axios.post(`${url}/admin/api.php?${query}`, postData);
        if( retval.result_code != 0) {
            result["message"] = 'Thank you, for your subscription.';
        } else {
            result["error"] = 'Subscribe was unsuccessful. Please try again in 15 minutes...';
        }
    }

    return result;
}

async function ConstantContact( apiJson, action ){
    let result = {} , sl = [];

    if(action === 'getList'){
        const { clientId, clientSecret, refresh_token, userId } = apiJson
        // get access token 
        let params = new URLSearchParams({
            refresh_token: refresh_token,
            grant_type: "refresh_token"
        })
        
        let query = params.toString();
        let auth = clientId+":"+clientSecret;
        // convert clientId and clientSecret to base64 encode.
        let buff = new Buffer(auth);
        let base64data = buff.toString('base64');
        
        await axios.post(`https://idfed.constantcontact.com/as/token.oauth2?${query}`,{},{
            headers : {
                Authorization : `Basic ${base64data}`
            }
        }).then(async response => {
            if(response.data) {
                apiJson["refresh_token"] = response.data.refresh_token;

                let params = new URLSearchParams({
                    'api_key'  : clientId,
                    'limit'    : 50,
                    'include_count': false,
                    'include_membership_count': 'active'
                })
                
                let query = params.toString();
                let getLists = await axios.get(`https://api.cc.email/v3/contact_lists?${query}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+response.data.access_token
                      }
                })
                if(getLists.data.lists) {
                    if(getLists.data.lists.length) {
                        for(let i=0; i<getLists.data.lists.length; i++) {
                            sl.push({
                                "id" : getLists.data.lists[i].list_id,
                                "name" : getLists.data.lists[i].name
                            });
                        }
                        result['lists'] = sl ;
                    } else {
                        result['error'] = 'There is no list in your account.';
                    }
                } else {
                    result['error'] = 'Error occur may be somethig wrong.';
                }
                updateUserData(userId, apiJson);
            }
        }).catch(err => {
            // console.log("err", err);
            result['error'] = 'Error occur may be somethig wrong.';
        });

    }

    if(action === 'subscribe') {
        const { clientId, clientSecret, refresh_token, email, name, uid, userId } = apiJson
        
        // get access token 
        let params = new URLSearchParams({
            refresh_token: refresh_token,
            grant_type: "refresh_token"
        })

        let query = params.toString();
        let auth = clientId+":"+clientSecret;
        // convert clientId and clientSecret to base64 encode.
        let buff = new Buffer(auth);
        let base64data = buff.toString('base64');

        await axios.post(`https://idfed.constantcontact.com/as/token.oauth2?${query}`,{},{
            headers : {
                Authorization : `Basic ${base64data}`
            }
        }).then(async response => {
            if(response.data) {
                apiJson["refresh_token"] = response.data.refresh_token;

                let postData = {
                    "email_address": {
                        "address": email,
                        "permission_to_send": "implicit"
                    },
                    "first_name": name,
                    "create_source": "Account",
                    "list_memberships": [ uid ]
                }

                await axios.post(`https://api.cc.email/v3/contacts?api_key=${clientId}`, JSON.stringify(postData), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+response.data.access_token
                    }
                }).then((resp) => {
                    if(resp.data.contact_id) {
                        result["message"] = 'Thank you, for your subscription.';
                    }
                }).catch(err => {
                    if(err.response.data) {
                        result["error"] = err.response.data.error_message;
                    } else {
                        result["error"] = "Subscribe was unsuccessful. Please try again in 15 minutes..."
                    }
                });
                updateUserData(userId, apiJson);
            }
        }).catch(err => {
            // console.log("err", err);
            result['error'] = 'Error occur may be somethig wrong.';
        });
    }
    return result;
}

async function ConvertKit( apiJson, action ){
    let result = {} , sl = [];

    
    if(action === "getList") {
        try {
            const { apikey, apiSecret } = apiJson;
            let retval = await axios.get(`https://api.convertkit.com/v3/forms?api_key=${apikey}`);
            if(retval.data.forms) {
                if(retval.data.forms.length) {
                    for(let i=0; i<retval.data.forms.length; i++) {
                        sl.push({
                            "id" : retval.data.forms[i].id,
                            "name" : retval.data.forms[i].name
                        });
                    }
                    result['lists'] = sl ;
                } else {
                    result['error'] = 'There is no list in your account.';
                }
            } else {
                result['error'] = 'Error occur may be somethig wrong.';
            }
        } catch (err) {
            result['error'] = err.response.data.message || "Invalid credentials please check and retry.";
        }
    }

    if(action === "subscribe") {
        const { name, email, apiSecret, uid } = apiJson;
        let params = new URLSearchParams({
            "api_secret" : apiSecret,
            "email"      : email
        })

        let query = params.toString();
        let retval = await axios.post(`https://api.convertkit.com/v3/forms/${uid}/subscribe`, query);
        
        if(retval['subscription']){
            result["message"] = 'Thank you, for your subscription.';	
        }else{
            result["error"] = 'Subscribe was unsuccessful. Please try again in 15 minutes...';
        }
    }
    return result;
}

async function InfusionSoft( apiJson, action ){
    let result = {} , sl = [];
    
    if(action === "getList") {
        const { refresh_token, clientId, clientSecret, userId } = apiJson;
        // get access token 
        let params = new URLSearchParams({
            'client_id'     : clientId,
            'client_secret' : clientSecret,
            'grant_type'    : 'refresh_token',
            'refresh_token' : refresh_token,
        })
        
        let query = params.toString();
        await axios.post(`https://api.infusionsoft.com/token`, query, {
            headers: {
              "Content-type" : "application/x-www-form-urlencoded",
            }
        }).then(async response => {
            if(response.data) {
                apiJson["refresh_token"] = response.data.refresh_token;

                let retval = await axios.get(`https://api.infusionsoft.com/crm/rest/v1/companies`, {
                    headers : {
                        "cache-control": "no-cache",
                        "content-type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${response.data.access_token}`,
                    }
                });
                
                if(retval.data.companies) {
                    if(retval.data.companies.length) {
                        for(let i=0; i<retval.data.companies.length; i++) {
                            sl.push({
                                "id" : retval.data.companies[i].id,
                                "name" : retval.data.companies[i].company_name
                            });
                        }
                        result['lists'] = sl ;
                    } else {
                        result['error'] = 'There is no list in your account.';
                    }
                } else {
                    result['error'] = 'Error occur may be somethig wrong.';
                }
                updateUserData(userId, apiJson);
            }
        }).catch(err => console.log(err));
    }

    if(action === "subscribe") {
        const { refresh_token, clientId, clientSecret, userId, name, email, uid } = apiJson;
        // get access token 
        let params = new URLSearchParams({
            'client_id'     : clientId,
            'client_secret' : clientSecret,
            'grant_type'    : 'refresh_token',
            'refresh_token' : refresh_token,
        })
        
        let query = params.toString();
        await axios.post(`https://api.infusionsoft.com/token`, query, {
            headers: {
              "Content-type" : "application/x-www-form-urlencoded",
            }
        }).then(async response => {
            if(response.data) {
                apiJson["refresh_token"] = response.data.refresh_token;

                var data = JSON.stringify({
                    "company": {
                    "id": 7
                    },
                    "email_addresses": [
                    {
                        "field": "EMAIL1",
                        "email": email
                    }
                    ],
                    "given_name": name
                });
                
                var config = {
                    method: 'post',
                    url: 'https://api.infusionsoft.com/crm/rest/v1/contacts',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json', 
                        'Authorization': 'Bearer '+ access_token, 
                    },
                    data : data
                };
                
                axios(config)
                .then(function (response) {
                    if(response.data.id) {
                        result["message"] = 'Thank you, for your subscription.'
                    } else {
                        reGenerateRefreshToken( apiJson, action );
                    }
                })
                .catch(function (error) {
                    result["error"] = 'Something went wrong.'
                });
                updateUserData(userId, apiJson);
            }
        }).catch(err => console.log(err));
    }
    return result;
}

async function Sendiio( apiJson, action ){
    let result = {} , sl = [], sendiio_user_id;

    
    if(action === "getList") {
        try {
            const { apiToken, apiSecret } = apiJson;
            let isAuthorized = await axios.post(`https://sendiio.com/api/v1/auth/check`,{
                token: apiToken,
                secret: apiSecret
            });
            let data = isAuthorized.data
            if(data.error === 0) {
                sendiio_user_id = data['data']['user_id']
                if(sendiio_user_id) {
                    let retval = await axios.get(`https://sendiio.com/api/v1/lists/email`, {
                        headers : {
                            'token' : apiToken,
                            'secret' : apiSecret
                        }
                    });
                    retval = retval.data;
                    if(retval.data.lists) {
                        if(retval.data.lists.length) {
                            for(let i=0; i<retval.data.lists.length; i++) {
                                sl.push({
                                    "id" : retval.data.lists[i].id,
                                    "name" : retval.data.lists[i].name
                                });
                            }
                            result['lists'] = sl ;
                        } else {
                            result['error'] = 'There is no list in your account.';
                        }
                    } else {
                        result['error'] = 'Error occur may be somethig wrong.';
                    }
                }
            } else {
                result['error'] = data['data']['errors'][0];
            }
        } catch(err) {
            result['error'] = err.response.data.errors || "Invalid credentials please check and retry.";
        }
    }

    if( action == 'subscribe'){
        const { uid, email, name } = apiJson;

        let params = new URLSearchParams({
            "email_list_id": uid,
            "email"        : email,
            "name"         : name
        })
        
        let query = params.toString();
        
        let retval = await axios.post(`https://sendiio.com/api/v1/lists/subscribe/json`, query);
        
        if(retval.data['error']==0){
            result["message"] = 'Thank you, for your subscription.';	
        }else{
            result["error"] = 'Subscribe was unsuccessful. Please try again in 15 minutes...';
        }
        
        
    }
    return result;
}

async function Mailvio( apiJson, action ){
    let result = {} , sl = [];

    const { apikey } = apiJson;
      
    if(action === "getList") {
        try {
            let getLists = await axios.get(`https://apiv2.mailvio.com/group`, {
                headers: {
                    'x-access-token': apikey, 
                    'Content-Type': 'application/json', 
                    'Cache-Control': 'no-cache'
                }
            });
            if(getLists.data.Groups) {
                if(getLists.data.Groups.length) {
                    for(let i=0; i<getLists.data.Groups.length; i++) {
                        sl.push({
                            "id" : getLists.data.Groups[i].id,
                            "name" : getLists.data.Groups[i].groupName
                        });
                    }
                    result['lists'] = sl ;
                } else {
                    result['error'] = 'There is no list in your account.';
                }
            } else {
                result['error'] = 'Error occur may be somethig wrong.';
            }
        } catch(err) {
            result['error'] = err.response.data.error || "Invalid credentials please check and retry.";
        }
    } 
    
    if(action === "subscribe") { 
        const { email, name, uid, apikey } = apiJson;
        let params = new URLSearchParams({
            "emailAddress": email,
            "active" : true,
        })
        let query = params.toString();

        var config = {
            method: 'post',
            url: `https://apiv2.mailvio.com/group/${uid}/subscriber`,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded', 
              'Cache-Control': 'no-cache', 
              'x-access-token': apikey
            },
            data : query
        };
          
        await axios(config)
        .then(function (response) {
            if(response.data.subscriberId) {
                result["message"] = 'We\'ve received your message! We\'ll get back to you soon.';
            }
        })
        .catch(function (error) {
            if(error.response.data) {
                result["error"] = error.response.data.error;
            } else {
                result["error"] = "Your api is not working.";
            }
        });
    }
    return result;
}

async function GetResponse( apiJson, action ){
    let result = {} , sl = [];

    
    if(action === "getList") {
        try {
            const { apikey } = apiJson;
            let retval = await axios.get(`https://api.getresponse.com/v3/campaigns`, {
                headers: {
                    'X-Auth-Token': `api-key ${apikey}`
                }
            });
            if(retval.data.length) {
                for(let i=0; i<retval.data.length; i++) {
                    sl.push({
                        "id" : retval.data[i].campaignId,
                        "name" : retval.data[i].name
                    });
                }
                result['lists'] = sl ;
            } else {
                result['error'] = 'There is no list in your account.';
            }
        } catch(err) {
            result['error'] =  err.response.data.errors || "Invalid credentials please check and retry.";
        }
    }

    if(action === "subscribe") {
        try{
            const { apikey, uid, email, name } = apiJson;

            let params = {
                'campaign': {'campaignId' : uid},
                'email'   : email,
                'dayOfCycle': 0,
                'name'    : name
            }
            
            let retval = await axios.post(`https://api.getresponse.com/v3/contacts`, params, {
                headers: {
                    'X-Auth-Token': `api-key ${apikey}`,
                    'Content-Type': 'application/json',                                                                                
                    // 'Content-Length': params.length 
                }
            });
            
            if (retval.statusText === "Accepted"){
                result["message"] = 'Thank you, for your subscription.';
            }
        } catch (err) { 
            result["error"] = 'Subscribe was unsuccessful. Please try again in 15 minutes...';
        }
    }
    return result;
}

async function Sendlane( apiJson, action ){
    var qs = require('qs');
    let result = {} , sl = [];

    
    if(action === "getList") {
        try {
            const { apikey, apiUrl, hashkey } = apiJson;
            let url = `${apiUrl}/api/v1/lists`;
            var data = qs.stringify({
                'api': apikey, 
                'hash': hashkey
            });
            var config = {
                method: 'post',
                url: 'http://'+url,
                headers: { 
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
            };
            let retval = await axios(config);
            if(retval.data.length) {
                for(let i=0; i<retval.data.length; i++) {
                    sl.push({
                        "id" : retval.data[i].list_id,
                        "name" : retval.data[i].list_name
                    });
                }
                result['lists'] = sl ;
            } else {
                result['error'] = 'There is no list in your account.';
            }
        } catch(err) {
            result['error'] =  err.response.data.errors || "Invalid credentials please check and retry.";
        }
    }

    if(action === "subscribe") {
        const { apikey, apiUrl, hashkey, uid, email, name } = apiJson;
        var data = qs.stringify({
            'api': apikey, 
            'hash': hashkey,
            'email': `${name}<${email}>`,
            'list_id': uid 
        });
        
        let url = `${apiUrl}/api/v1/list-subscribers-add`;

        var config = {
            method: 'post',
            url: 'http://'+url,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        let retval = await axios(config);
        
        if (retval.data.success){
            result["message"] = 'A confirmation request has been sent to your email, please confirm.';
        } else {
            result["error"] = 'Subscribe was unsuccessful. Please try again in 15 minutes...';
        }

    }
    return result;
}

async function reGenerateRefreshToken( apiJson, action ){
    const { clientId, clientSecret, refresh_token, userId } = apiJson;
    let result = {};
    
    // Setup the Fields we are going to post. 
    let params = new URLSearchParams({
        'client_id'     : clientId,
        'client_secret' : clientSecret,
        'grant_type'    : 'refresh_token',
        'refresh_token' : refresh_token,
    })
    
    let query = params.toString();
    await axios.post(`https://api.infusionsoft.com/token`, query, {
        headers: {
          "Content-type" : "application/x-www-form-urlencoded",
        }
    }).then(result => {
        if(result.data.access_token) {
            apiJson["access_token"] = result.data.access_token;
            apiJson["refresh_token"] = result.data.refresh_token;
        
            User.findByIdAndUpdate(userId, { autoResponder: autoResponder }, async (err, doc1) => {
            console.log("doc1",doc1);
            if (doc1) {
                result["message"] = await InfusionSoft( apiJson, action );
            } else {
                result["error"] = "Something went wrong.";
            }
            });
        }
    })
    .catch(error => result["error"] = "Something went wrong.")

    return result;
}

async function updateUserData(id, data) {
    User.findById(id, async(err, doc) => {
        if(doc) {
            let checkAR = doc.autoResponder;
            if(checkAR.length) {
                checkAR.filter( (el, i) => {
                    if(el.mailServer === data.mailServer) {
                        filtered = i;
                    }
                })
        
                if(filtered !== "") {
                    Object.keys(data).map(keys => {
                        if(keys !== "mailServer") {
                        checkAR[filtered] = data;
                        }
                    }) 
                } else {
                    checkAR.push(data);
                }
            }
            User.findByIdAndUpdate(id, { autoResponder: checkAR }, (err, doc1) => {
                if(err) console.log("user not updated.")
                console.log("user data updated.");
            });
        }
    });
}

// async function getAccessToken(url, query, base64data) {
//     return new Promise(async(resolve, reject)=> {
//         await axios.post(`${url}${query}`,{},{
//                 headers : {
//                     Authorization : `Basic ${base64data}`
//                 }
//             }).then(async response => {
//                 resolve(response);
//             }).catch(err => {
//                 // console.log("err", err);
//                 reject(error)
//             });
//     })
// }

module.exports  = switch_responder ;


